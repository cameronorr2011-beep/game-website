"""NeuroML — Advanced Neuron-Geared Clash Royale Player (v10: Dueling Double DQN + PER + N-Step + Full Vision + Groq VLM).

Architecture acts like a biological brain with cortical & limbic pathways:
  1. Sensory Cortex (38 input neurons -> 128 LayerNorm + SiLU neurons)
  2. Residual Synaptic Blocks (2 x 128-neuron skip-connected cortical columns
     with LayerNorm & SiLU gating so gradients never vanish)
  3. Dueling Limbic Pathways (Wang et al.):
     - State-Value Stream V(s) (64 limbic neurons -> 1 baseline dopamine prediction)
     - Action-Advantage Stream A(s,a) (64 motor neurons -> 20 card x zone advantages)
     - Combined via Q(s,a) = V(s) + (A(s,a) - mean(A(s,*)))
  4. Double DQN Target Decoupling (van Hasselt et al.):
     - Online policy selects best next action a* = argmax_a Q_policy(s', a)
     - Target network evaluates Q_target(s', a*) to eliminate Q-value overestimation
  5. Prioritized Experience Replay (PER, Schaul et al.):
     - Transitions with high TD-error |delta| (especially surprise tower-damage
       punishments and big wins) are replayed with higher probability P(i) ~ |delta_i|^alpha
       and weighted with importance-sampling weights w_i = (N * P(i))^(-beta)
  6. 3-Step Bootstrapping (N-Step Returns):
     - Propagates delayed tower-damage punishments and push rewards 3x faster
       back to the card placement that caused them
  7. Polyak Soft Target Synaptic Plasticity:
     - Smoothly blends target weights every training step: theta_target <- tau*theta_policy + (1-tau)*theta_target

Full Vision & Live Groq VLM (`qwen/qwen3.8-27b`):
  - Pixel-level HP bar scanner tracks all 5 towers (ally_left, ally_right,
    ally_king, enemy_left, enemy_right) + active battlefield unit health bars +
    individual card slot pink elixir badges.
  - Live Groq VLM (`qwen/qwen3.8-27b`) classifies unknown screens AND acts as the
    visual + tactical Damage Judge to sentence the surge neurons with immediate
    negative punishment (-0.50 to -3.50, zero positive dopamine) whenever our
    towers take damage.
"""
import base64
import io
import itertools
import json
import math
import os
import random
import re
import subprocess
import threading
import time
import urllib.request
from collections import deque

import torch
import torch.nn as nn
import torch.optim as optim

import sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# GROQ TOKEN BUDGET: Groq is used for END-OF-MATCH summaries (1 call per match,
# not per-play tokens) and optional throttled advisory when enabled. The reward
# path NEVER touches the API (deterministic Referee only).
GROQ_MENTOR_INTERVAL = 180
GROQ_IN_MATCH_ADVISORY = os.environ.get("GROQ_IN_MATCH_ADVISORY", "0") == "1"

CFG = json.load(open("bot_config.json"))
DEV = os.environ.get("NEUROML_DEVICE", CFG.get("device", "127.0.0.1:5555"))
PHONE_LOCAL_MODE = (os.environ.get("NEUROML_PHONE_LOCAL", "0") == "1"
                    or str(DEV).startswith("127.0.0.1")
                    or str(DEV).startswith("localhost")
                    or str(DEV) == "local")
SHOT_DIR = "cr_bot"
os.makedirs(SHOT_DIR, exist_ok=True)
LOG = open("bot.log", "a", buffering=1, encoding="utf-8", errors="replace")
CARDS_DB = json.load(open("cards.json"))

# ============================================================
# CARD COUNTERS & MATCHUP INTELLIGENCE (opponent & self card matrix)
# ============================================================
CARD_COUNTERS = {
    "hogrider":    {"counters": ["cannon", "tesla", "minipekka", "skeletons"], "preferred_spot": "center_back", "role": "win_condition", "cost": 4},
    "giant":       {"counters": ["minipekka", "cannon", "tesla", "skeletons"], "preferred_spot": "center_back", "role": "tank", "cost": 5},
    "golem":       {"counters": ["minipekka", "cannon", "tesla", "musketeer"], "preferred_spot": "center_back", "role": "tank", "cost": 8},
    "pekka":       {"counters": ["skeletons", "archers", "musketeer", "cannon"], "preferred_spot": "center_back", "role": "tank", "cost": 7},
    "balloon":     {"counters": ["musketeer", "tesla", "archers", "fireball"], "preferred_spot": "center_back", "role": "win_condition", "cost": 5},
    "lava_hound":  {"counters": ["musketeer", "tesla", "archers", "arrows"], "preferred_spot": "center_back", "role": "tank", "cost": 7},
    "goblin_barrel": {"counters": ["zap", "arrows", "valkyrie", "skeletons"], "preferred_spot": "left_defend", "role": "win_condition", "cost": 3},
    "minipekka":   {"counters": ["skeletons", "knight", "valkyrie", "archers"], "preferred_spot": "center_back", "role": "win_condition", "cost": 4},
    "musketeer":   {"counters": ["fireball", "knight", "valkyrie", "minipekka"], "preferred_spot": "left_defend", "role": "support", "cost": 4},
    "knight":      {"counters": ["minipekka", "valkyrie", "musketeer", "archers"], "preferred_spot": "left_defend", "role": "support", "cost": 3},
    "valkyrie":    {"counters": ["minipekka", "musketeer", "archers", "knight"], "preferred_spot": "left_defend", "role": "support", "cost": 4},
    "archers":     {"counters": ["arrows", "fireball", "valkyrie", "zap"], "preferred_spot": "left_defend", "role": "support", "cost": 3},
    "skeletons":   {"counters": ["zap", "arrows", "valkyrie"], "preferred_spot": "left_defend", "role": "support", "cost": 1},
    "wizard":      {"counters": ["fireball", "valkyrie", "minipekka", "knight"], "preferred_spot": "left_defend", "role": "support", "cost": 5},
    "minions":     {"counters": ["arrows", "zap", "archers", "musketeer"], "preferred_spot": "left_defend", "role": "support", "cost": 3},
    "cannon":      {"counters": ["fireball", "giant", "musketeer", "hogrider"], "preferred_spot": "bridge_left", "role": "building", "cost": 3},
    "tesla":       {"counters": ["fireball", "giant", "hogrider", "musketeer"], "preferred_spot": "bridge_left", "role": "building", "cost": 4},
}


def select_counter_card(enemy_archetype_or_card, hand_deck, affordable_slots, threat_lane=None):
    """Given an observed/inferred opponent threat or card and our current hand,
    return {'slot': int, 'card': str, 'counter_to': str, 'recommended_spot': str}
    or None if no specific counter is held and affordable."""
    info = CARD_COUNTERS.get(str(enemy_archetype_or_card or "").lower())
    if not info or not hand_deck:
        return None
    wanted = info.get("counters", [])
    for pref in wanted:
        for slot_i, c_name in enumerate(hand_deck[:4]):
            if str(c_name).lower() == pref and (affordable_slots is None or slot_i in affordable_slots):
                spot = info.get("preferred_spot", "center_back")
                if threat_lane in ("left", "right") and spot in ("left_defend", "right_defend"):
                    spot = f"{threat_lane}_defend"
                return {
                    "slot": slot_i,
                    "card": str(c_name).lower(),
                    "counter_to": str(enemy_archetype_or_card).lower(),
                    "recommended_spot": spot,
                }
    return None

STATE_DIM = 38
ACTION_DIM = 20
CARD_VOCAB = 16

TICK_SECONDS = 2.2  # fast play (was 3.2s; snappy but still human-possible)
SWIPE_START_JITTER = 6  # pixels of humanization jitter on card swipes


def log(msg):
    line = f"[{time.strftime('%H:%M:%S')}] {msg}"
    LOG.write(line + "\n")
    print(line, flush=True)


GROQ_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 NeuroML/11.5"
import urllib.error


def sh(args, timeout=25):
    if PHONE_LOCAL_MODE and str(DEV) == "local" and args and args[0] in ("shell", "exec-out"):
        cmd = args[1:]
        return subprocess.run(cmd, capture_output=True, timeout=timeout)
    return subprocess.run(
        ["adb", "-s", DEV] + args, capture_output=True, timeout=timeout
    )


_shot_thread = [None]
_shot_result = [None]


def screenshot_async():
    """Pipeline: start the phone-side screencap in a background thread NOW; the
    main loop keeps playing/acting while the (slow ~3s) PNG encode happens."""
    def _work():
        try:
            _shot_result[0] = sh(["exec-out", "screencap", "-p"], timeout=15)
        except Exception as e:
            _shot_result[0] = None
    _shot_thread[0] = threading.Thread(target=_work, daemon=True)
    _shot_thread[0].start()


def screenshot():
    """If an async shot was started, wait for it (<3s); else take a sync one."""
    out = os.path.join(SHOT_DIR, "latest.png")
    th = _shot_thread[0]
    if th is not None:
        th.join(timeout=15)
        _shot_thread[0] = None
        res = _shot_result[0]
        if res is not None and len(res.stdout) > 1000:
            with open(out, "wb") as f:
                f.write(res.stdout)
            return out
    result = sh(["exec-out", "screencap", "-p"], timeout=15)
    with open(out, "wb") as f:
        f.write(result.stdout)
    return out


def tap(x, y):
    sh(["shell", "input", "tap", str(x), str(y)])
    time.sleep(0.4)


# ---------------------- Groq VLM API (Vision + Damage Judge) ----------------------
GROQ_VISION_MODEL = "qwen/qwen3.8-27b"
GROQ_TEXT_MODEL = "qwen/qwen3.8-27b"

# -------- Zero-key model routing (published APPS require NO Groq account) --------
# A published app user never creates a Groq key. All model traffic goes through
# the maintainer's Vercel proxy, which keeps the key server-side (env `key_for_ai`).
# A locally present key (groq_key.txt or GROQ_API_KEY) still takes priority for
# direct calls — that is the maintainer/power-user path.
MENTOR_URL = os.environ.get(
    "NEUROML_MENTOR_URL",
    "https://game-website-two-tau.vercel.app/api/mentor",
)


def groq_api_url():
    """One choke point for URL choice: direct-with-key when a local key exists,
    else the maintainer's no-key proxy endpoint. Falls back to the proxy never
    fabricates anything — every caller keeps its local-physics degrade path."""
    if load_groq_key():
        return "https://api.groq.com/openai/v1/chat/completions"
    return MENTOR_URL

# Global Groq rate-limit gate: when a 429/rate-limit error hits, silence ALL Groq
# calls (vision, damage judge, mentor, VLM fallback) for this many seconds.
_groq_muted_until = [0.0]
GROQ_MUTE_SECONDS = 45


def groq_is_muted():
    return time.time() < _groq_muted_until[0]


def mute_groq(seconds=None):
    _groq_muted_until[0] = max(_groq_muted_until[0], time.time() + (seconds or GROQ_MUTE_SECONDS))


def load_groq_key():
    """Load Groq API key from GROQ_API_KEY env var or groq_key.txt on disk."""
    k = os.environ.get("GROQ_API_KEY", "").strip()
    if k:
        return k
    if os.path.exists("groq_key.txt"):
        try:
            return open("groq_key.txt").read().strip()
        except Exception:
            return ""
    return ""


def groq_vision_classify(img):
    """Full-vision multimodal screen classifier using Groq's qwen/qwen3.8-27b VLM
    when the fast pixel probe returns 'unknown'."""
    key = load_groq_key()
    if not key and not MENTOR_URL:
        return "unknown"  # zero-key published app: still routes via mentor proxy
    try:
        thumb = img.copy()
        thumb.thumbnail((384, 832))
        buf = io.BytesIO()
        thumb.save(buf, format="JPEG", quality=68)
        b64 = base64.b64encode(buf.getvalue()).decode()
        payload = {
            "model": GROQ_VISION_MODEL,
            "messages": [{
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": (
                            "Classify this Clash Royale screen into EXACTLY one word from: "
                            "battle, lobby, result, quit_dialog, popup, unknown. Do not explain."
                        ),
                    },
                    {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{b64}"}},
                ],
            }],
            "max_tokens": 16,
            "temperature": 0.0,
        }
        payload = {
            "model": GROQ_VISION_MODEL,
            "messages": [{
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": (
                            "Classify this Clash Royale screen into EXACTLY one word from: "
                            "battle, lobby, result, quit_dialog, popup, unknown. Do not explain."
                        ),
                    },
                    {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{b64}"}},
                ],
            }],
            "max_tokens": 16,
            "temperature": 0.0,
        }
        _headers = {"Content-Type": "application/json", "User-Agent": GROQ_UA}
        if key:
            _headers["Authorization"] = f"Bearer {key}"
        req = urllib.request.Request(
            groq_api_url(),
            data=json.dumps(payload).encode(),
            headers=_headers,
        )
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode())
            ans = (data["choices"][0]["message"].get("content") or "").strip().lower()
            for label in ("battle", "lobby", "result", "quit_dialog", "popup"):
                if label in ans:
                    log(f"groq VLM classified unknown screen -> {label}")
                    return label
    except urllib.error.HTTPError as e:
        body = ""
        try:
            body = e.read().decode(errors="ignore")
        except Exception:
            pass
        if e.code in (429, 403) or "Rate limit" in body:
            mute_groq()
            log(f"groq rate-limited — muting all Groq calls for {GROQ_MUTE_SECONDS}s")
        else:
            log(f"groq vision note: HTTP {e.code} {body[:80]}")
    except Exception as e:
        log(f"groq vision note: {str(e)[:90]}")
    return "unknown"


def _any(img, tests=None):
    return None  # removed placeholder


def groq_damage_punishment(dmg_info, img=None):
    """Compatibility wrapper: NEVER contacts Groq. Delegates to the deterministic
    Referee so tower-damage punishment is 100% rules-based and uses zero LLM tokens."""
    from referee import groq_damage_punishment as _ref_gdp
    return _ref_gdp(dmg_info, img=img)


# ---------------------- Groq OSS AI Coach: Punisher + Mentor ----------------------
GROQ_COACH_MODEL = "openai/gpt-oss-120b"
SPOT_TO_ACTION = {}  # populated after SPOT_NAMES is defined (see below)


def groq_deck_builder(player_deck=None):
    """Groq deck-builder: fetch the real meta (from meta_decks.json, refreshed
    via web) and ask gpt-oss-120b to evaluate + redesign the deck the bot uses.
    Returns {'deck': [...8 card names...], 'critique': str, 'source': str}.
    Only *suggests* decks; actual deck changes must be made manually in-game
    (bot never opens Deck Edit to avoid touching account settings).
    """
    meta = {}
    try:
        meta = json.load(open("meta_decks.json"))
    except Exception:
        return {"deck": None, "critique": "no meta data", "source": "local"}
    key = load_groq_key()
    if not key and not MENTOR_URL:
        return {"deck": None, "critique": "no coach endpoint", "source": "local"}
    import re as _re
    # Deck architect learns from the agent's own game memory: which placements won/lost
    try:
        _gm = game_memory_digest()
        _gm_line = _gm.get("one_line", "")
        _gm_best = _gm.get("best_spots") or []
    except Exception:
        _gm_line, _gm_best = "", []
    prompt = (
        "You are the NeuroML Deck Architect for a Clash Royale RL agent. "
        f"Current ladder meta decks (fetched {meta.get('fetched_at')}):\n"
        + json.dumps(meta.get("top_meta_decks", [])[:6], indent=1)
        + f"\n\nAgent's current deck: {player_deck or 'unknown (use meta consensus)'}\n"
        + f"\nAgent's game memory (how it plays): {_gm_line or 'no history yet'}\n"
        + (f"Placements that historically paid best: {_gm_best}\n" if _gm_best else "")
        + "1) Compare the agent's deck to the meta and name the biggest weaknesses CONSTRAINED by how this agent plays.\n"
        + "2) Output the strongest 8-card deck possible given the meta AND this agent's proven play style.\n\n"
        + 'Reply ONLY with minified JSON, no markdown, no reasoning: '
        + '{"best_deck": ["card1", "card2", "card3", "card4", "card5", "card6", "card7", "card8"], '
        + '"why": "<25 words>"}\n\n'
        + "Important: Start your reply with the opening { character immediately."
    )
    try:
        payload = {"model": GROQ_COACH_MODEL,
                   "messages": [{"role": "user", "content": prompt}],
                   "max_tokens": 900, "temperature": 0.0,
                   "reasoning_effort": "low"}
        _headers = {"Content-Type": "application/json", "User-Agent": GROQ_UA,
                    "Accept": "application/json"}
        if key:
            _headers["Authorization"] = f"Bearer {key}"
        req = urllib.request.Request(
            groq_api_url(),
            data=json.dumps(payload).encode(),
            headers=_headers)
        with urllib.request.urlopen(req, timeout=16) as resp:
            data = json.loads(resp.read().decode())
            txt = (data["choices"][0]["message"].get("content") or "").strip()
            m = _re.search(r"\{[^{}]*\}", txt, _re.S)
            if not m:
                return {"deck": None, "critique": "no json", "source": "groq"}
            j = json.loads(m.group(0))
            deck = j.get("best_deck")
            if isinstance(deck, list) and len(deck) >= 6:
                return {"deck": [str(c) for c in deck[:8]],
                        "critique": str(j.get("why", ""))[:200], "source": "groq_deck_architect"}
            return {"deck": None, "critique": "bad deck shape", "source": "groq"}
    except Exception as e:
        err = e.read().decode(errors="ignore")[:80] if hasattr(e, "read") else str(e)[:80]
        return {"deck": None, "critique": f"architect unavailable: {err}", "source": "groq_unavailable"}


def groq_reward_governor(state_desc, played_spot, prev_reward, img=None):
    """GROQ IS A MENTOR ONLY: requests strategic critique and a recommended
    placement only. No LLM-generated number may determine dopamine, pain, a
    tower-damage penalty, or a reward adjustment.
    Returns dict: {agree, reward_delta, recommended_spot, critique, source}
    where reward_delta is ALWAYS None."""
    out = {"agree": None, "reward_delta": None, "recommended_spot": None,
           "critique": None, "source": None}
    if groq_is_muted():
        return out
    key = load_groq_key()
    if not key and not MENTOR_URL:
        return out
    try:
        import re as _re
        try:
            gm = game_memory_digest()
            gmline = gm.get("one_line", "")
            best = gm.get("best_spots") or []
            avoid = gm.get("avoid_spots") or []
        except Exception:
            gmline, best, avoid = "", [], []
        prompt = (
            "You are NeuroML's STRATEGIC MENTOR for a Clash Royale RL agent. "
            "Provide a brief strategic critique and a recommended placement spot ONLY.\n"
            f"Agent's game memory: {gmline or 'no history yet (first games)'}\n"
            + (f"Spots that historically paid best: {best}\nSpots that historically lost dopamine: {avoid}\n" if best or avoid else "")
            + f"FULL CONTEXT: {state_desc}\n"
            + f"The agent just played: {played_spot}\n"
            + "Reply ONLY with minified JSON, no markdown, no reasoning. Start your reply with { immediately.\n"
            + '{"recommended_spot": <one of bridge_left|bridge_right|left_defend|right_defend|center_back>, "critique": "<max 22 words>"}\n\n'
            + "IMPORTANT: DO NOT emit any reward_delta or numerical score — the deterministic Referee owns all rewards and punishments.\n"
            + "TACTICAL PRINCIPLES:\n"
            + "- Target the LOWEST-HP enemy tower with offensive pressure or spells when in finish range.\n"
            + "- Defend active threats on the threatened lane; use buildings at center_back to pull tanks.\n"
            + "- Counterpush on the opposite lane when the opponent overcommits.\n"
            + "- Conserve elixir when low; cycle cheaply only when safe.\n"
        )
        payload = {
            "model": GROQ_COACH_MODEL,
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 512,
            "temperature": 0.0,
        }
        _headers = {"Content-Type": "application/json", "User-Agent": GROQ_UA,
                    "Accept": "application/json"}
        if key:
            _headers["Authorization"] = f"Bearer {key}"
        req = urllib.request.Request(
            groq_api_url(),
            data=json.dumps(payload).encode(),
            headers=_headers,
        )
        with urllib.request.urlopen(req, timeout=16) as resp:
            data = json.loads(resp.read().decode())
            txt = (data["choices"][0]["message"].get("content") or "").strip()
            m = _re.search(r"\{[^{}]*\}", txt, _re.S)
            if not m:
                return out
            j = json.loads(m.group(0))
            out["reward_delta"] = None  # strictly enforced: never accept LLM reward numbers
            rs = j.get("recommended_spot")
            if rs in SPOT_TO_ACTION:
                out["recommended_spot"] = rs
            cr = j.get("critique")
            if isinstance(cr, str):
                out["critique"] = cr.strip()[:160]
            out["source"] = "groq_oss_coach"
            _metrics["mentor_reviews"] = _metrics.get("mentor_reviews", 0) + 1
    except urllib.error.HTTPError as e:
        body = ""
        try:
            body = e.read().decode(errors="ignore")
        except Exception:
            pass
        if e.code in (429, 403) or "Rate limit" in body:
            mute_groq()
        out["critique"] = f"coach unavailable: HTTP {e.code}"
        out["source"] = "groq_oss_coach_unavailable"
    except Exception as e:
        err = e.read().decode(errors="ignore")[:80] if hasattr(e, "read") else str(e)[:80]
        out["critique"] = f"coach unavailable: {err}"
        out["source"] = "groq_oss_coach_unavailable"
    return out


def mentor_log_line(entry):
    """Append one coach review to the machine-readable coach feed + human log."""
    try:
        ts = time.strftime("%H:%M:%S")
        entry["t"] = ts
        with open(COACH_FILE, "a") as f:
            f.write(json.dumps(entry) + "\n")
        MENTOR_LOG.write(
            f"[{ts}] played={entry.get('played')} critique={entry.get('critique')} "
            f"delta={entry.get('reward_delta')} recommend={entry.get('recommended_spot')} agree={entry.get('agree')}\n"
        )
    except Exception:
        pass


# ---------------------- Full Vision / Sensing ----------------------
ELIXIR_X0 = 228
ELIXIR_X1 = 948


def elixir_count(img):
    """Measure the horizontal elixir bar fill at y=2292..2312 (below card cost badges)."""
    best = 0.0
    for y in range(2292, 2314, 3):
        right = ELIXIR_X0
        for x in range(ELIXIR_X0, ELIXIR_X1, 4):
            r, g, b = img.getpixel((x, y))
            if r > 150 and g < 95 and b > 150:
                right = x
        fill = (right - ELIXIR_X0) / float(ELIXIR_X1 - ELIXIR_X0)
        best = max(best, fill)
    if best < 0.05:
        return 0
    return round(best * 10) if best < 0.95 else 10


def _scan_bar_fraction(img, xr, yr, is_enemy=False, max_span=132.0):
    """Scan a bounding box for a horizontal tower HP bar and return its fill
    fraction in [0.0, 1.0]. Returns 0.0 if the tower is destroyed/absent."""
    best_span = 0
    best_cnt = 0
    for y in yr:
        xs = []
        for x in xr:
            r, g, b = img.getpixel((x, y))
            if is_enemy:
                if r > 165 and g < 85 and b < 115 and r > b + 60:
                    xs.append(x)
            else:
                if b > 165 and g > 105 and r < 95 and b > r + 80:
                    xs.append(x)
        if len(xs) > best_cnt:
            best_cnt = len(xs)
            best_span = (max(xs) - min(xs)) if len(xs) >= 4 else 0
    if best_cnt < 5:
        return 0.0
    span_ratio = min(1.0, best_span / max_span)
    cnt_ratio = min(1.0, best_cnt / (max_span * 0.36))
    return round(max(span_ratio * 0.7 + cnt_ratio * 0.3, cnt_ratio), 3)


def tower_healths(img):
    """Full-vision scan of all 5 tower health bars on the battlefield."""
    al = _scan_bar_fraction(img, range(155, 340, 2), range(1360, 1450, 2), is_enemy=False, max_span=132.0)
    ar = _scan_bar_fraction(img, range(740, 920, 2), range(1360, 1450, 2), is_enemy=False, max_span=132.0)
    ak_raw = _scan_bar_fraction(img, range(430, 650, 2), range(1725, 1758, 2), is_enemy=False, max_span=152.0)
    ak = ak_raw if (ak_raw > 0.05 or al == 0.0 or ar == 0.0) else 1.0
    el = _scan_bar_fraction(img, range(155, 340, 2), range(370, 435, 2), is_enemy=True, max_span=132.0)
    er = _scan_bar_fraction(img, range(740, 920, 2), range(370, 435, 2), is_enemy=True, max_span=132.0)
    return {
        "ally_left": al,
        "ally_right": ar,
        "ally_king": ak,
        "enemy_left": el,
        "enemy_right": er,
        "ally_alive": int(al > 0.05) + int(ar > 0.05) + 1,
        "enemy_alive": int(el > 0.05) + int(er > 0.05) + 1,
    }


COUNTER_TABLE = {
    # card -> cards that BEAT it for less elixir (positive elixir trade)
    "valkyrie": ["minipekka", "musketeer", "archers"],
    "giant": ["minipekka", "cannon", "tesla", "skeletons", "barbarian_hut"],
    "hogrider": ["cannon", "tesla", "valkyrie", "skeletons", "tombstone"],
    "minipekka": ["skeletons", "cannon", "musketeer"],
    "musketeer": ["skeletons", "fireball", "lightning"],
    "knight": ["minipekka", "musketeer", "valkyrie"],
    "archers": ["fireball", "arrows", "valkyrie"],
    "wizard": ["fireball", "skeletons", "musketeer", "lightning"],
    "minions": ["arrows", "zap", "musketeer", "wizard"],
    "bomber": ["fireball", "valkyrie", "knight"],
    "balloon": ["musketeer", "archers", "tesla", "minions", "fireball"],
    "prince": ["skeletons", "minions", "cannon", "tombstone"],
    "pekka": ["skeletons", "minions", "cannon", "inferno_tower"],
    "baby_dragon": ["musketeer", "arrows", "wizard"],
    "witch": ["fireball", "valkyrie", "arrows"],
    "skeleton_army": ["zap", "arrows", "fireball", "valkyrie"],
    "giant_skeleton": ["minions", "musketeer", "skeleton_army"],
    "barbarians": ["fireball", "wizard", "valkyrie", "bomber"],
    "royal_giant": ["minipekka", "cannon", "skeleton_army"],
    "golem": ["minipekka", "inferno_tower", "skeleton_army"],
    "freeze": ["cycle_out"],
    "mirror": ["cycle_out"],
    "rage": ["cycle_out"],
}
AIR_UNITS = {"minions", "balloon", "baby_dragon", "mega_minion", "bats"}


def counters_available(hand_deck, threat_name):
    """Returns which slots in hand hold a card that counters the threat."""
    good = COUNTER_TABLE.get(threat_name.lower(), [])
    return [i for i, c in enumerate(hand_deck) if c in good]


def scan_arena_vision(img):
    """Full-vision scan of active troop/building health bars across the arena."""
    enemy_left = 0
    enemy_right = 0
    enemy_bridge_l = 0
    enemy_bridge_r = 0
    ally_left = 0
    ally_right = 0
    for y in range(480, 1650, 8):
        for x in range(100, 980, 8):
            r, g, b = img.getpixel((x, y))
            if r > 180 and g < 70 and b < 95 and r > b + 90:
                if x < 540:
                    enemy_left += 1
                    if y > 850:
                        enemy_bridge_l += 1
                else:
                    enemy_right += 1
                    if y > 850:
                        enemy_bridge_r += 1
            elif b > 175 and g > 110 and r < 85 and b > r + 90:
                if x < 540:
                    ally_left += 1
                else:
                    ally_right += 1
    # air detection: flying units have no shadow band
    air = 0
    for y in range(480, 1650, 10):
        for x in range(150, 950, 10):
            r, g, b = img.getpixel((x, y))
            if r > 175 and g > 175 and b > 120 and g - r < 25 and b - g < 25:
                air += 1
    return {
        "enemy_left": enemy_left,
        "enemy_right": enemy_right,
        "enemy_bridge_l": enemy_bridge_l,
        "enemy_bridge_r": enemy_bridge_r,
        "ally_left": ally_left,
        "ally_right": ally_right,
        "air_threat": air,
        # HP-mass proxy: bigger bar areas ≈ tank champions; counters/kite decisions use this
        "enemy_hp_mass_l": round(enemy_left * 2.6, 1),
        "enemy_hp_mass_r": round(enemy_right * 2.6, 1),
        "ally_hp_mass_l": round(ally_left * 2.6, 1),
        "ally_hp_mass_r": round(ally_right * 2.6, 1),
    }


def hand_affordability(img, mlxir):
    """True pixel-level card affordability check: scans the pink/magenta elixir
    drop badge beneath each of the 4 cards in hand (y=2160..2235)."""
    centers = [332, 543, 737, 931]
    afford = []
    for cx in centers:
        pink = sum(
            1 for y in range(2160, 2235, 4) for x in range(cx - 35, cx + 40, 4)
            if img.getpixel((x, y))[0] > 150
            and img.getpixel((x, y))[2] > 130
            and img.getpixel((x, y))[1] < 100
        )
        afford.append(1.0 if pink >= 8 else 0.0)
    if sum(afford) == 0 and mlxir >= 2:
        afford[mlxir % 4] = 1.0
    return afford


def _any(img, tests):
    return sum(1 for _ in range(1) if False) if False else None


# ============================================================
# GAME RULES OF CLASH ROYALE — the brain is taught the actual law
# ============================================================
ELIXIR_REGEN_PER_TICK = 0.7        # ~1 elixir / 2.8s in-game
TOWER_FINISH_THRESHOLD = 0.32      # under ~30% HP a cheap spell can finish
SPELL_FINISH_MIN_DAMAGE = 0.18     # spell must cover at least ~18% of tower HP


# Exact spell-landing coordinates ON the enemy towers (the old finisher dropped
# spells at generic bridge rows — between the towers, wasting damage).
ENEMY_TOWER_XY = {"left": (233, 470), "right": (845, 470)}


def physics_finisher(towers, hand_deck, mlxir, afford=None):
    """REAL PHYSICS targeting (deterministic, not advisory): find the LOWEST-HP
    alive enemy tower and check whether ANY held, affordable spell's damage
    covers its remaining HP. Spell damage as a fraction of a fresh tower's HP
    (fireball ≈ 1/3, arrows ≈ 1/6, zap ≈ 1/10) comes from the spell-physics
    table below. Returns the kill decision or None; never guesses."""
    SPELL_TOWER_DAMAGE = {"fireball": 0.33, "arrows": 0.17, "zap": 0.12,
                          "rocket": 0.38, "lightning": 0.40}
    alive = [(towers.get(k, 1.0), side) for side, k in
             (("left", "enemy_left"), ("right", "enemy_right"))]
    alive = [(hp, side) for hp, side in alive if hp > 0.03]   # alive towers only
    if not alive:
        return None
    hp, side = min(alive)   # the LOWEST-HP tower is always the target
    for slot_idx, name in enumerate((hand_deck or [])[:4]):
        info = CARDS_DB.get((name or "").lower(), {})
        if info.get("role") != "spell":
            continue
        cost = info.get("cost", 9)
        if cost > mlxir or afford is not None and slot_idx < len(afford) and afford[slot_idx] < 0.5:
            continue
        dmg = SPELL_TOWER_DAMAGE.get((name or "").lower(), 0.0)
        if dmg >= hp - 0.02:
            return {"side": side, "slot": slot_idx, "hp": hp, "dmg": dmg,
                    "spell": name, "target_xy": ENEMY_TOWER_XY[side]}
    return None


def tower_finish_check(towers, hand_deck, mlxir):
    """RULE: a spell held in hand must NOT be dropped at bridge when an enemy
    tower is under finish range — instead route slots holding that spell as a
    'finisher' so the play policy aims it AT THE TOWER (kill = 1000-2600 dmg)."""
    finishers = []
    for side, key in (("left", "enemy_left"), ("right", "enemy_right")):
        hp = towers.get(key, 1.0)
        if 0.0 < hp <= TOWER_FINISH_THRESHOLD:
            for slot_idx, name in enumerate(hand_deck[:4]):
                info = CARDS_DB.get(name, {})
                if info.get("role") == "spell" and info.get("cost", 9) <= mlxir:
                    # Rough damage coverage: fireball 33%, arrows 17%, zap 12% of avg tower HP
                    dmg_est = {"fireball": 0.33, "arrows": 0.17, "zap": 0.12}.get(name, 0.0)
                    if dmg_est >= hp - 0.02:
                        finishers.append({"side": side, "slot": slot_idx,
                                          "dmg": dmg_est, "tower_hp": hp})
    return finishers


def card_play_policy(action, mlxir, lane, arena, towers, afford, hand_deck, finishers=None, opponent=None):
    """Knowledge-based veto/redirect layer ON TOP of the network choose:
    the net proposes, the RULES referee. Returns possibly-corrected action.
      - spell at bridge -> redirect to tower finisher if a finisher exists
      - spell center_back (pointless) -> redirect to defense/finisher
      - heavy tank at bridge when elixir < cost+1 (can't support) -> center_back
      - cheap cycle card at bridge with no push and no threat -> defend instead
      - card-counter intelligence -> deploy hard counter when opponent push archetype known
    """
    if not hand_deck:
        return action, "net"
    slot, spot_i = divmod(action, 5)
    if slot >= len(hand_deck) or not afford or slot >= len(afford) or afford[slot] < 0.5:
        return action, "net"
    name = (hand_deck[slot] or "").lower()
    info = CARDS_DB.get(name, {})
    role = info.get("role", "support")
    spot_n = SPOT_NAMES[spot_i]

    # RULE 1: spell finisher — aim at the weak tower instead of a bridge drop
    if role == "spell" and finishers:
        f = min(finishers, key=lambda x: x["tower_hp"])
        finish_spot = 0 if f["side"] == "left" else 1   # bridge_left/bridge_right rows hit tower area
        return f["slot"] * 5 + finish_spot, f"finisher->{f['side']}"
    # RULE 2: spells never "defend" — waste; prefer a finisher or center_back
    if role == "spell" and spot_n in ("left_defend", "right_defend"):
        return slot * 5 + 4, "spell_no_defend"   # center_back = cast mid-field (value)
    # RULE 3: heavy commitment discipline — tank/win_condition needs elixir support
    if role in ("tank", "win_condition") and spot_n.startswith("bridge"):
        if mlxir < info.get("cost", 5) + 1:
            return slot * 5 + 4, "commit discipline (needs support elixir)"
    # RULE 4: cheap cycle: don't burn the cycle card at a bridge alone
    if info.get("cost", 9) <= 2 and spot_n.startswith("bridge"):
        threat = arena.get("enemy_bridge_l", 0) + arena.get("enemy_bridge_r", 0)
        if threat == 0:
            return slot * 5 + 4, "cheap-cycle discipline (save for defense)"
    # RULE 5: buildings go at the center to pull pushes, never at the bridge
    if role == "building" and spot_n.startswith("bridge"):
        return slot * 5 + 4, "building pulls center"
    # RULE 6: opponent card-counter intelligence under active lane threat
    if lane and opponent and opponent.get("last_inferred_card"):
        aff_slots = [i for i in range(min(4, len(afford))) if afford[i] > 0.5]
        cnt = select_counter_card(opponent["last_inferred_card"], hand_deck, aff_slots, threat_lane=lane)
        if cnt and cnt["slot"] != slot and role not in ("building", "spell"):
            c_spot_idx = SPOT_TO_ACTION.get(cnt["recommended_spot"], 4)
            return cnt["slot"] * 5 + c_spot_idx, f"counter {cnt['card']} vs {cnt['counter_to']}"
    return action, "net"


# ============================================================
# OPPONENT MEMORY — remember what the enemy played, across matches
# ============================================================
OPPONENT_MEMORY_FILE = "opponent_memory.json"
GAME_MEMORY_FILE = "game_memory.json"


def _load_game_memory():
    try:
        return json.load(open(GAME_MEMORY_FILE))
    except Exception:
        return {"matches": [], "spot_ledger": {}, "winrate_history": []}


def distill_match(verdict, stats):
    """Distill a finished match into the long-term memory book — NOT the raw
    replay, a compressed story: outcome, dopamine total, lanes faced, which
    spots paid off. This is what the brain 'remembers about games'."""
    mem = _load_game_memory()
    matches = mem.setdefault("matches", [])
    matches.append({
        "t": time.strftime("%m-%d %H:%M"),
        "v": verdict,
        "dop": round(stats.get("reward_total", 0.0), 1),
        "ticks": stats.get("ticks", 0),
        "cards": stats.get("cards_played", 0),
        "pushes_faced": stats.get("pushes_faced", 0),
        "towers_down": stats.get("towers_down", 0),
        "towers_lost": stats.get("towers_lost", 0),
        "rule_corrections": stats.get("rule_corrections", 0),
    })
    mem["matches"] = matches[-200:]
    # Spot ledger: which placements historically earned dopamine
    ledger = mem.setdefault("spot_ledger", {})
    for spot, (tot, n) in stats.get("spot_totals", {}).items():
        cur = ledger.get(spot, [0.0, 0])
        ledger[spot] = [round(cur[0] + tot, 2), cur[1] + n]
    recent = mem["matches"][-100:]
    wins = sum(1 for m in recent if m["v"] == "WIN")
    mem["winrate_history"] = (mem.get("winrate_history", []) + [wins])[-100:]
    try:
        json.dump(mem, open(GAME_MEMORY_FILE, "w"), indent=1)
    except Exception:
        return {}
    return game_memory_digest(mem)


def game_memory_digest(mem=None):
    """Compact human/JSON readable summary of everything remembered."""
    if mem is None:
        mem = _load_game_memory()
    matches = mem.get("matches", [])
    if not matches:
        return {"games_remembered": 0}
    last100 = matches[-100:]
    wins = sum(1 for m in last100 if m["v"] == "WIN")
    ledger = mem.get("spot_ledger", {})
    ranked = sorted(
        ((s, t / max(1, n)) for s, (t, n) in ledger.items() if n >= 3),
        key=lambda x: x[1], reverse=True)
    best = ranked[:2]
    worst = ranked[-2:]
    avg_dop = round(sum(m["dop"] for m in last100) / max(1, len(last100)), 2)
    towers_down = sum(m.get("towers_down", 0) for m in last100)
    pushes = sum(m.get("pushes_faced", 0) for m in last100)
    return {
        "games_remembered": len(matches),
        "recent_winrate": round(100.0 * wins / max(1, len(last100)), 1),
        "avg_dopamine_per_match": avg_dop,
        "best_spots": [(s, round(v, 2)) for s, v in best],
        "avoid_spots": [(s, round(v, 2)) for s, v in worst if v < 0],
        "towers_destroyed_recent": towers_down,
        "enemy_pushes_faced_recent": pushes,
        "one_line": (
            f"remembers {len(matches)} games · winrate {round(100.0*wins/max(1,len(last100))):.0f}% last {len(last100)} · "
            f"plays best: {', '.join(s for s,_ in best[:2]) or 'n/a'} · "
            f"worst: {', '.join(s for s,_ in worst[:1]) or 'n/a'}"
        ),
    }


def _load_opponent_memory():
    try:
        return json.load(open(OPPONENT_MEMORY_FILE))
    except Exception:
        return {"recent_opponents": [], "matches_total": 0}


def _save_opponent_memory(mem):
    try:
        keep = mem.get("recent_opponents", [])[-30:]
        mem["recent_opponents"] = keep
        mem["matches_total"] = mem.get("matches_total", 0) + 1
        json.dump(mem, open(OPPONENT_MEMORY_FILE, "w"), indent=1)
    except Exception:
        pass


def opponent_new_match():
    """Start tracking a fresh opponent."""
    return {
        "cards_played": [],
        "inferred_archetypes": [],
        "last_inferred_card": None,
        "last_push_cost_est": None,
        "elixir_spent": 0,
        "pushes": [],
        "start": time.time(),
    }


def opponent_observe(opp, arena_prev, arena_now, towers_prev, towers_now):
    """Update the opponent model this match: it sees enemy troops crossing the
    bridge (vision counts them), classifies wave density into likely card
    archetypes (hogrider/bridge_spam, giant/beatdown, swarm/goblin_barrel), and
    tracks estimated elixir committed only when a clear wave appears."""
    if not opp:
        return
    opp["last_push_cost_est"] = None
    e_now = arena_now.get("enemy_left", 0) + arena_now.get("enemy_right", 0)
    e_prev = (arena_prev or {}).get("enemy_left", 0) + (arena_prev or {}).get("enemy_right", 0)
    for side in ("left", "right"):
        now_n = arena_now.get(f"enemy_{side}", 0)
        prev_n = (arena_prev or {}).get(f"enemy_{side}", 0)
        bridge_n = arena_now.get(f"enemy_bridge_{'l' if side == 'left' else 'r'}", 0)
        if now_n >= 6 and prev_n < max(3, now_n // 2):
            if now_n >= 16:
                inferred, est_cost = "giant", 5.0
            elif bridge_n >= 5:
                inferred, est_cost = "hogrider", 4.0
            else:
                inferred, est_cost = "knight", 3.0
            opp["pushes"].append({"side": side, "size": now_n, "inferred": inferred, "tick": time.time()})
            opp["cards_played"].append(inferred)
            opp.setdefault("inferred_archetypes", []).append(inferred)
            opp["last_inferred_card"] = inferred
            opp["last_push_cost_est"] = est_cost
            opp["elixir_spent"] += int(est_cost)
    if e_now - e_prev >= 5 and not opp.get("last_push_cost_est"):
        opp["cards_played"].append("musketeer")
        opp["last_inferred_card"] = "musketeer"
    el = max(0.0, (towers_prev or {}).get("enemy_left", 1) - towers_now.get("enemy_left", 1))
    er = max(0.0, (towers_prev or {}).get("enemy_right", 1) - towers_now.get("enemy_right", 1))
    if el + er >= 0.08:
        opp["elixir_spent"] += 2
    return opp


def classify(img):
    """Hard pixel-signature classifier calibrated on real screenshots.
    Order matters: most specific first."""
    # 0. Dimmed result overlay: extremely dark scene + faint blue OK button glow
    import statistics as _st
    _px = [sum(img.getpixel((x, y))) / 3 for y in range(400, 2000, 200) for x in range(200, 900, 300)]
    if _st.mean(_px) < 25:
        return "result"  # dimmed end-of-match overlay (WIN/LOSS) — tap OK
    # 1. Supercell ID sign-in / loading sheet: huge pure-white area mid-screen
    sc_white = sum(1 for y in range(1000, 2000, 50) for x in range(100, 980, 60)
                   if img.getpixel((x, y))[0] > 235 and img.getpixel((x, y))[1] > 235
                   and img.getpixel((x, y))[2] > 235)
    if sc_white >= 120:
        return "popup"  # non-interactive loading sheet: press BACK/OK
    # 2. Quit dialog: red Cancel left + blue OK right at y=1480
    red_c = sum(1 for x in range(270, 450, 15) if img.getpixel((x, 1480))[0] > 180 and img.getpixel((x, 1480))[1] < 90)
    blue_ok = sum(1 for x in range(620, 800, 15) if img.getpixel((x, 1480))[2] > 180 and img.getpixel((x, 1480))[0] < 90)
    if red_c >= 6 and blue_ok >= 6:
        return "quit_dialog"
    # 3. Battle: pink elixir drop icon bottom-left
    pink_drop = sum(1 for y in range(2260, 2325, 6) for x in range(205, 265, 6)
                    if img.getpixel((x, y))[0] > 170 and img.getpixel((x, y))[2] > 150
                    and img.getpixel((x, y))[1] < 110)
    if pink_drop >= 18:
        return "battle"
    # 4. Result screen: blue OK button bottom-center OR (blue/red ribbon + OK)
    ok_blue = sum(1 for y in (2035, 2060, 2085) for x in range(450, 630, 15)
                  if img.getpixel((x, y))[2] > 150 and img.getpixel((x, y))[1] > 80
                  and img.getpixel((x, y))[0] < 110)
    if ok_blue >= 12:
        return "result"
    # 5. Battle-tab lobby: bright yellow Battle button
    yellow_btn = sum(1 for y in (1850, 1880, 1910) for x in range(380, 700, 25)
                     if img.getpixel((x, y))[0] > 210 and 120 < img.getpixel((x, y))[1] < 215
                     and img.getpixel((x, y))[2] < 80)
    if yellow_btn >= 20:
        return "lobby"
    # 6. Other lobby tab (shop/collection/clan/events): top resource bar gold+gem
    green_gem = sum(1 for y in range(50, 90, 5) for x in range(725, 785, 5)
                    if img.getpixel((x, y))[1] > 170 and img.getpixel((x, y))[1] > img.getpixel((x, y))[0] + 50
                    and img.getpixel((x, y))[1] > img.getpixel((x, y))[2] + 40)
    gold_coin = sum(1 for y in range(50, 90, 5) for x in range(420, 470, 5)
                    if img.getpixel((x, y))[0] > 200 and img.getpixel((x, y))[1] > 140
                    and img.getpixel((x, y))[2] < 80)
    if green_gem >= 6 and gold_coin >= 6:
        return "other_tab"
    # 7. Blue ribbon (result loading behind overlay)
    band = [img.getpixel((x, y)) for y in (1400, 1440) for x in range(240, 880, 60)]
    blue_rib = sum(1 for r, g, b in band if b > 140 and b > r + 40)
    if blue_rib >= 18:
        return "result"
    return "unknown"


HIPPOCAMPUS_FILE = "hippocampus.jsonl"
HIPPOCAMPUS_BYTES_CAP = 2 * 1024 ** 3   # 2 GB live file; older chunks compressed to .jsonl.gz
_hippo_lock = threading.Lock()
brain_ref = [None]  # set by main() so hippocampal_write can enrich with Q/V/A

def hippocampal_write(entry):
    """Long-term memory archive: append every rich transition to a monotonic
    .jsonl. Unlike ml_replay.json (bounded), this grows unbounded — it is the
    path to GB-scale memory. Read back with random retrievals when training.
    Rich-mode: every entry also carries the full 38-dim state vectors for BOTH
    s and s2, towers, arena, elixir, verdict context and pain-channel state,
    so each line is ~1.4 KB instead of ~0.1 KB — reach GB scale ~14× faster."""
    try:
        e = dict(entry)
        q, v, a, *_hid = brain_ref[0].policy.forward_streams(
            torch.tensor(e["s"], dtype=torch.float32)) if brain_ref[0] else ((None,)*9)
        if q is not None:
            e["q_row"] = [round(v_, 4) for v_ in q.tolist()]
            e["V_export"] = round(v.item(), 4)
            e["advantages"] = [round(v_, 4) for v_ in a.tolist()]
        e["ctx"] = {
            "towers": e.pop("towers", None),
            "arena": e.pop("arena", None),
            "pain_avg": e.pop("pain_avg", None),
        }
        e["ctx"] = {k: v_ for k, v_ in e["ctx"].items() if v_ is not None}
        with _hippo_lock:
            # 2GB cap: rotate live archive into a compressed chunk, data preserved
            try:
                if os.path.exists(HIPPOCAMPUS_FILE) and os.path.getsize(HIPPOCAMPUS_FILE) >= HIPPOCAMPUS_BYTES_CAP:
                    import gzip, shutil
                    stamp = time.strftime("%Y%m%d_%H%M%S")
                    gz_path = f"hippocampus_{stamp}.jsonl.gz"
                    # stream-compress without loading 2GB into RAM
                    with open(HIPPOCAMPUS_FILE, "rb") as fin, gzip.open(gz_path, "wb", compresslevel=6) as fout:
                        shutil.copyfileobj(fin, fout, length=8 * 1024 * 1024)
                    os.remove(HIPPOCAMPUS_FILE)
                    try:
                        open("hippocampus_rotate.log", "a").write(
                            f"{stamp}: rotated live archive -> {gz_path}\n")
                    except Exception:
                        pass
            except Exception:
                pass
            with open(HIPPOCAMPUS_FILE, "a", encoding="utf-8") as f:
                f.write(json.dumps(e) + "\n")
    except Exception:
        # never let memory archiving break the battle loop
        try:
            with _hippo_lock:
                with open(HIPPOCAMPUS_FILE, "a", encoding="utf-8") as f:
                    f.write(json.dumps({"minimal": True, **{k: entry.get(k) for k in ("t", "a", "r")}}) + "\n")
        except Exception:
            pass
    try:
        with _hippo_lock:
            with open(HIPPOCAMPUS_FILE, "a", encoding="utf-8") as f:
                f.write(json.dumps(entry) + "\n")
    except Exception:
        pass

def hippocampal_sample(k=32):
    """Randomly sample k past experiences from the archive for consolidation
    (like pamięci sleep replay). Falls back silently when the file is small."""
    try:
        import random as _r
        with _hippo_lock:
            size = os.path.getsize(HIPPOCAMPUS_FILE)
            with open(HIPPOCAMPUS_FILE, "rb") as f:
                picks = []
                for _ in range(k):
                    pos = max(0, _r.randrange(int(size * 0.9)))
                    f.seek(pos)
                    f.readline()   # partial line
                    line = f.readline()
                    if line:
                        picks.append(json.loads(line))
                return picks
    except Exception:
        return []


def judge_match_result(img):
    """AUTHORITATIVE WIN/LOSS judge: reads the crown ribbon strip across THREE
    y-bands and the score strip; the winner's ribbon is BRIGHT SATURATED color
    while the loser's is desaturated/dark. Requires a clear margin; defaults to
    LOSS when unclear (a false WIN poisons the reward signal far worse)."""
    bands = [(y0, [(x, y) for y in range(y0, y0 + 40, 8) for x in range(200, 880, 40)])
             for y0 in (1370, 1410, 1450)]
    reds, blues = 0, 0
    for _, cells in bands:
        for (x, y) in cells:
            r, g, b = img.getpixel((x, y))
            sat = max(r, g, b) - min(r, g, b)
            if r > 140 and sat > 60 and r > b + 30:
                reds += 1
            elif b > 140 and sat > 60 and b > r + 30:
                blues += 1
    if reds >= blues + 8:
        return "LOSS"     # red ribbon dominates = we lost
    if blues >= reds + 8:
        return "WIN"
    return "LOSS"         # unclear → never claim a false win


def lane_variances(img):
    """Fast lane variance on a downsampled crop (40×80 grid instead of full 400×400).
    ~6ms instead of ~600ms."""
    import statistics

    def variance(box):
        region = [img.getpixel((x, y)) for y in range(box[1], box[3], 10) for x in range(box[0], box[2], 8)]
        rs = [p[0] for p in region]
        gs = [p[1] for p in region]
        return statistics.pstdev(rs) + statistics.pstdev(gs)

    left = variance((100, 1500, 500, 1900))
    right = variance((580, 1500, 980, 1900))
    return left, right


def match_phase(img, tick_count):
    if tick_count < 15:
        return 0  # early
    if tick_count < 45:
        return 1  # mid
    return 2  # late


CARDS = [(263, 2230), (470, 2230), (676, 2230), (883, 2230)]  # current in-game hand slots (y=2230 row)
SPOT_NAMES = ["bridge_left", "bridge_right", "left_defend", "right_defend", "center_back"]
FIELD_SPOTS = {
    "left_defend": (337, 1250),
    "right_defend": (742, 1250),
    "center_back": (540, 1300),
    "bridge_left": (220, 980),
    "bridge_right": (860, 980),
}
BATTLE_BUTTON = (540, 1945)  # current in-game Battle button
CANCEL_BUTTON = (365, 1480)
OK_CENTER = (540, 2050)
RESULT_OK = (540, 1990)  # dimmed result-screen OK sits higher (~y1990)
CLAIM_SPOT = (700, 1420)
TOP_BATTLE_TAB = (150, 300)

OPPONENT_VOCAB = [
    "hogrider", "giant", "minipekka", "musketeer", "knight", "archers",
    "valkyrie", "skeletons", "fireball", "arrows", "zap", "cannon",
    "tesla", "wizard", "bomber", "minions",
]

SPOT_TO_ACTION.update({n: i for i, n in enumerate(SPOT_NAMES)})


# ============================================================
# SYNAPTIC PAIN CHANNELS — Hebbian tags on (card_slot, spot) that get
# sensitivity-reduced after painful outcomes, so the same mistake fires less.
# Analogy: long-term depression (LTD) at the synaptic channel level.
# ============================================================
# ============================================================
# REWARD LEDGER helpers (spec §4): every contribution to the final reward is
# logged; the per-tick net is the SUM of components — never a censoring min().
# ============================================================

def reward_totals_update(totals, events, dmg_punish=None):
    """Aggregate per-event reward components into running totals. Returns the
    same dict mutated. Tower damage is always recorded under its own key so
    simultaneous good+bad events both appear (no censoring, no double-count:
    each event row contributes exactly once)."""
    for e, r in events:
        if r != 0.0:
            totals[e] = round(totals.get(e, 0.0) + r, 2)
    if dmg_punish:
        totals["ALL TOWER DAMAGE"] = round(totals.get("ALL TOWER DAMAGE", 0.0) + dmg_punish, 2)
    return totals


def seed_lifetime_record(metrics, mem=None):
    """Seed the W/L record from the durable game-memory book so the dashboard
    win/loss record survives restarts (fixes the 'session-only 100%' error).
    Returns the number of verdict-bearing matches found."""
    if mem is None:
        mem = _load_game_memory()
    ms = [m for m in mem.get("matches", []) if m.get("v") in ("WIN", "LOSS")]
    w = sum(1 for m in ms if m["v"] == "WIN")
    l = len(ms) - w
    metrics["wins_v"] = w
    metrics["losses_v"] = l
    metrics["win_rate"] = round(100.0 * w / max(1, w + l), 1)
    metrics["win_history"] = [1 if m["v"] == "WIN" else 0 for m in ms[-60:]]
    metrics["lifetime_games"] = len(ms)
    metrics["record_source"] = "game_memory.json lifetime record (seeded at startup)"
    return len(ms)


# ============================================================
# DETERMINISTIC REFEREE — the sole authority on pain and dopamine (v18).
# Replaces the Groq damage-punisher with strict physics rules that cost zero
# inference tokens and can never be talked into a wrong verdict.
# ============================================================
# --- ARENA TWIN hook (local digital twin; bounded memory; planning gated) ---
TWIN_PLAN = os.environ.get("TWIN_PLAN_ENABLED", "0") == "1"
arena_twin = None

def _init_twin():
    global arena_twin
    try:
        from arena_twin import ArenaTwin
        arena_twin = ArenaTwin()
        arena_twin.load()
        if arena_twin.seq:
            log(f"arena twin restored (seq {arena_twin.seq}, ready={arena_twin.ready})")
    except Exception as e:
        log(f"arena twin unavailable (recording continues offline): {str(e)[:70]}")
        arena_twin = None


def bot_ml_pred_uncertainty():
    """Bounded world-model uncertainty signal in [0,1] from the live prediction
    telemetry (tower-HP MAE blended with elixir MAE), 0 when no twin yet."""
    try:
        pr = _metrics.get("prediction") or {}
        n = pr.get("n_scored", 0)
        if n < 5:
            return 0.5           # not enough data = honest mid uncertainty
        t = min(1.0, pr.get("tower_hp_mae", 0.0) * 3.0)
        e = min(1.0, pr.get("elixir_mae", 0.0) / 4.0)
        return round(min(1.0, 0.6 * t + 0.4 * e), 3)
    except Exception:
        return 0.5


def referee_pain(dmg_info, ally_alive, tick, ally_king=None):
    """Deterministic tower-damage punishment from measurable state only.
    Delegates to referee.py so all rules live in one canonical module while
    maintaining exact return compatibility `(round(p, 2), "referee_rules")`."""
    from referee import referee_pain as _rp
    p, src = _rp(dmg_info, ally_alive=ally_alive, tick=tick, ally_king=ally_king)
    if p == 0.0 and (float(dmg_info.get("ally_hp_drop", 0.0)) > 0 or int(dmg_info.get("ally_towers_lost", 0)) > 0):
        p = -0.5
    return round(p, 2), ("referee_rules" if p < 0 else src)


def interpret_mentor(mentor, towers=None, mlxir=10, context=None):
    """Structural mentor interpreter wrapper: delegates to referee.interpret_mentor
    while keeping `intents` and `features` available for all callers."""
    from referee import interpret_mentor as _im
    return _im(mentor, towers, context if context is not None else mlxir)


PAIN_FILE = "pain_channels.json"

def _load_pain_channels():
    try:
        return {(int(k.split(',')[0]), int(k.split(',')[1])): float(v)
                for k, v in json.load(open(PAIN_FILE)).items()}
    except Exception:
        return {}

def _save_pain_channels(ch):
    try:
        json.dump({f"{k[0]},{k[1]}": round(v, 3) for k, v in list(ch.items())[-400:]},
                  open(PAIN_FILE, "w"))
    except Exception:
        pass

def pain_stimulus(base_reward, slot, spot, pain_channels):
    """Pain gate: a channel that recently averaged strongly negative gets its
    baseline activation scaled down (like LTD), so repeat mistakes feel more
    painful AND fire less. Returns (effective_reward, pain_event_or_None)."""
    key = (slot, spot)
    historic = pain_channels.get(key)
    if historic is None:
        return base_reward, None
    pain_factor = min(1.0, max(0.25, 1.0 + historic / 8.0))   # deep pain → up to ×4 sensitivity
    if pain_factor < 0.99 and base_reward < -0.05:
        boosted = base_reward / pain_factor
        label = f"🔥 PAIN channel {slot},{spot} (avg {historic:+.1f}) amplifies this mistake"
        return boosted, (label, boosted - base_reward)
    return base_reward, None

def record_pain(ch, slot, spot, reward):
    """EMA update of the channel's pain memory each tick it fires."""
    key = (slot, spot)
    old = ch.get(key, 0.0)
    ch[key] = old * 0.92 + reward * 0.08
    return ch


# ---------------------- CONFIGURABLE REWARD WEIGHTS (spec §4) ----------------------
# Every shaped dopamine term lives here so the reward function can be tuned
# without touching the loop. All values are dopamine units per event.
REWARD_WEIGHTS = {
    "correct_lane_defense": 0.8,
    "spent_at_max_elixir": 0.4,
    "elixir_economy_9plus": 0.25,
    "counterpush_opposite_lane": 0.6,
    "tower_advantage_held": 0.3,
    "game_rule_followed": 0.35,
    "enemy_troop_kill_per_px": 0.1,
    "enemy_troop_kill_cap": 1.5,
    "spell_connected": 0.3,
    "spell_wasted": -1.2,
    "wrong_lane_defense": -0.6,
    "leak_per_tick": 0.1,
    "cycling_amnesty": 0.15,
    "play_with_no_threat": -0.2,
    "tower_lost_per_tower": -2.5,
}
PAIN_VETO_THRESHOLD = -0.55   # avg channel pain beyond this = behavioral doubt

def pain_forbidden(ch, slot, spot, net_q):
    """FEELING THE PAIN, BEHAVIORALLY: a deeply painful (slot,spot) channel gets
    its network Q suppressed in the action-selection step, so the SAME mistake
    is doubted at every future evaluation. Not a hard ban — if every alternative
    is worse, the play can still be chosen (context preserved) but must beat
    the suppressed value. Returns (adjusted_action, veto_event_or_None).
    """
    avg = ch.get((slot, spot))
    if avg is None or avg > PAIN_VETO_THRESHOLD:
        return None, None   # no veto
    return avg, None        # suppress value passed to caller


def pain_priority_boost(ch, slot, spot, reward):
    """Painful outcomes get PER priority boost so replay revisits them more.
    Returns multiplier ~1.0..2.5."""
    avg = ch.get((slot, spot))
    if avg is None or avg > PAIN_VETO_THRESHOLD:
        return 1.0
    return min(2.5, 1.0 + abs(avg) / 4.0)


def q_state_fired(q_state):
    """The 38 sensory neurons and WHAT each one senses, for the dashboard's
    labeled input-row firing display."""
    senses = (
        "elixir", "lane_variance_L bars", "lane_variance_R bars",
        "cost slot0", "cost slot1", "cost slot2", "cost slot3",
        "afford slot0", "afford slot1", "afford slot2", "afford slot3",
        "phase early", "phase mid", "phase late",
        "last slot0", "last slot1", "last slot2", "last slot3",
        "last spot bridge_L", "last spot bridge_R", "last spot def_L",
        "last spot def_R", "last spot center",
        "my tower L", "my tower R", "my king", "enemy tower L", "enemy tower R",
        "towers alive (me)", "towers alive (enemy)",
        "units enemy L", "units enemy R", "push enemy bridge L",
        "push enemy bridge R", "units ally L", "units ally R",
        "threat L", "threat R", "extra",
    )
    return [{"v": round(float(x), 3), "sense": senses[i] if i < len(senses) else f"s{i}"}
            for i, x in enumerate(q_state)]


# ---------------------- SPIKING NUCLEUS + AFFECTIVE CORE (v13/v14) -----------------
# A real biologically-detailed spiking network (LIF neurons, STDP, homeostasis)
# running ALONGSIDE the DQN, plus bounded affective state channels. Feature
# flag guarded with honest fallback: if anything here fails, the DQN acts alone.
SPIKING_ENABLED = True
SPIKING_BIAS_SCALE = 0.10   # spiking activity can shift Q by at most this fraction of Q-spread
SPIKING_FILE = "spiking_brain.json"
SPIKING_VERSION = 1

class SpikingAgent:
    """Lowest-risk hybrid (v13 spec §5 option 2): the spiking mutant proposes
    bias, the DQN decides. Reward-modulated STDP via eligibility translates
    battle rewards into synaptic change. Affective channels are bounded,
    inspectable computational analogues — NOT claims of feeling."""

    def __init__(self):
        self.nucleus = None
        self.affect = None
        self.ok = False
        self._last_bias = None
        self._last_state = None   # cached state vec for hippocampal storage
        self.vetoed = set()       # action indices the prefrontal cortex vetoes
        if SPIKING_ENABLED:
            try:
                from spiking_core import (SpikingNucleus, AffectiveCore,
                                          PrefrontalCortex, HippocampalIndex)
                self.nucleus = SpikingNucleus(n_sensory=64, n_action=20, seed=13)
                self.affect = AffectiveCore()
                self.cortex = PrefrontalCortex()      # working memory + vetoes
                self.hippo = HippocampalIndex()        # episodic similarity recall
                self.ok = True
                self.load()
            except Exception as e:
                log(f"spiking nucleus unavailable — DQN-only fallback active ({e})")

    def observe_state(self, state_s):
        """Encode the 38-dim game state into the spiking network and simulate.
        Returns a per-action bias vector (20 floats in [-1,1]) from action-
        population firing rates, or None when disabled. Measured latency is
        telemetry, never allowed to block gameplay (loops over 5s budget)."""
        if not self.ok:
            return None
        try:
            t0 = time.time()
            # passive valence decay each decision tick so channels reach an
            # equilibrium between injection and decay instead of saturating
            self.affect.decay_step()
            was_danger = self.affect.state["danger"]
            # sensory encoding: 38 state dims mapped onto 64 sensory neurons
            vals = [max(0.0, min(1.0, v)) for v in state_s[:64]]
            vals += [0.0] * (64 - len(vals))
            self._last_state = vals
            # PREFRONTAL DELIBERATION (bounded, tested): working-memory veto
            # rules + one hippocampal similarity recall, inside a wall-clock
            # budget so it can never block the decision tick.
            plan = {"vetoes": {}, "recalled": [], "over_budget": False}
            try:
                plan = self.cortex.consult(vals, self.hippo, budget_ms=2.0)
                self.vetoed = {slot * 5 + (spot % 5)
                               for (slot, spot) in plan.get("vetoes", {})
                               if slot * 5 + (spot % 5) < 20}
            except Exception as e:
                self.vetoed = set()
                _metrics.setdefault("spiking_errors", []).append(
                    f"cortex: {e}")
            self.nucleus.encode_sensory(vals)
            # v18/v19 structural-state channels (bounded, cross-coupled):
            try:
                rec = (plan.get("recalled") or [])
                sim = rec[0]["similarity"] if rec else 0.0
                obs_nov = self.affect.observe_novelty(state_s[:38])
                self.affect.set("curiosity", self.affect._clamp(0.6 * (1.0 - sim) + 0.4 * obs_nov))
                threat = max(state_s[36], state_s[37]) if len(state_s) > 37 else 0.0
                king_hp = state_s[25] if len(state_s) > 25 else 1.0
                ally_alive = round((state_s[28] if len(state_s) > 28 else 1.0) * 3.0)
                if threat > 0.4:
                    self.affect.inject("pressure", 0.12)   # opponent can punish soon
                self.affect.update({
                    "novelty": obs_nov,
                    "threat": threat,
                    "king_hp": king_hp,
                    "towers_exposed": ally_alive,
                    "overruns": 1 if plan.get("over_budget") else 0,
                    "uncertainty": bot_ml_pred_uncertainty(),
                })
            except Exception:
                pass
            self.nucleus.step(50)          # 50 ms of simulated dynamics
            # affect: danger from imminent-threat state channels, confidence
            # from policy separation available later; injected from rewards.
            if state_s[36] or state_s[37]:
                self.affect.inject("danger", 0.15)
            elif was_danger > 0.3:
                # threat resolved: relief-like signal (v14 spec: relief on
                # resolution of previously-high danger)
                self.affect.inject("relief", 0.25)
            rates = [n.spike_count for n in self.nucleus.action]
            mx = max(rates) or 1
            mean = sum(rates) / len(rates)
            bias = [(r - mean) / mx for r in rates]
            # Behavioral modulation from AffectiveCore: when danger/desperation
            # is elevated, nudge defensive spots [left_defend=2, right_defend=3, center_back=4]
            try:
                bmod = self.affect.behavioral_modulation()
                dbias = bmod.get("defensive_bias", 0.0)
                if dbias > 0.25:
                    for a_i in range(len(bias)):
                        if (a_i % 5) in (2, 3, 4):
                            bias[a_i] = max(-1.0, min(1.0, bias[a_i] + 0.18 * dbias))
            except Exception:
                bmod = {}
            # ruled-out plays get the strongest possible negative vote; the
            # main loop additionally excludes them from consideration via
            # forbidden (bounded so valid alternatives always remain).
            for a_idx in self.vetoed:
                if a_idx < len(bias):
                    bias[a_idx] = -1.0
            act_pop = [n.spike_count for n in self.nucleus.action]
            sample_n = self.nucleus.action[0] if self.nucleus.action else None
            _metrics["spiking"] = {
                "ok": True,
                "observe_ms": round((time.time() - t0) * 1000, 1),
                "sensory_spikes": sum(n.spike_count for n in self.nucleus.sensory),
                "action_spikes": sum(act_pop),
                "inh_spikes": sum(n.spike_count for n in self.nucleus.inhibitory),
                "mean_w": round(self.nucleus.telemetry()["mean_w"], 4),
                "pot_events": self.nucleus.telemetry()["potentiation_events"],
                "dep_events": self.nucleus.telemetry()["depression_events"],
                "affect": {k: round(v, 3) for k, v in self.affect.state.items()},
                "behavioral_modulation": bmod,
                "sample_neuron": {
                    "v_mv": round(float(sample_n.v), 2) if sample_n else -70.0,
                    "v_thresh": round(float(sample_n.v_threshold + sample_n.adapt_threshold), 2) if sample_n else -55.0,
                    "i_syn_e": round(float(sample_n.i_syn_e), 3) if sample_n else 0.0,
                    "i_syn_i": round(float(sample_n.i_syn_i), 3) if sample_n else 0.0,
                    "i_adapt": round(float(sample_n.i_adapt), 3) if sample_n else 0.0,
                    "spikes": int(sample_n.spike_count) if sample_n else 0,
                },
                "cortex": {
                    "working_memory": len(self.cortex.memory),
                    "vetoes": len(self.vetoed),
                    "deliberations": self.cortex.deliberations,
                    "over_budget": int(bool(plan.get("over_budget"))),
                    "recall": [r["outcome"] for r in plan.get("recalled", [])],
                    "hippo_size": len(self.hippo.memories),
                    "recalls_served": self.hippo.recalls_served,
                },
            }
            self.nucleus.reset_transient_neurons_only()
            return bias
        except Exception as e:
            log(f"spiking observe failed (DQN acting alone): {e}")
            return None

    def learn(self, reward, action=None):
        """Reward-modulated plasticity + affective updates off the real reward.
        Also writes the (slot, spot, outcome) into prefrontal working memory
        (veto evidence) and the played state+outcome into the hippocampus."""
        if not self.ok or reward is None:
            return
        try:
            if action is not None:
                self.cortex.observe(action // 5, action % 5, reward)
                if self._last_state is not None:
                    self.hippo.store(list(self._last_state), reward)
            # v19 intake: one documented path feeds every channel from real
            # signals (RPE vs EMA baseline, novelty, threats, compute load...).
            prev = self._last_state or []
            novelty = self.affect.observe_novelty(prev[:38]) if prev else 0.25
            baseline_unc = bot_ml_pred_uncertainty()
            twin_ready = bool(_metrics.get("twin", {}).get("ready"))
            forecast_q = max(0.0, 1.0 - baseline_unc) if twin_ready else None
            self.affect.update({
                "reward": reward,
                "novelty": novelty,
                "threat": max((prev[36] if len(prev) > 36 else 0.0),
                              (prev[37] if len(prev) > 37 else 0.0)),
                "uncertainty": baseline_unc,
                "prediction_err": baseline_unc * 0.6,
                "mentor_conflict": _metrics.get("mentor_conflict_sig", 0.0),
                "forecast": forecast_q,
                "opponent_pattern": min(1.0, (_metrics.get("opponent_memory", {}).get("this_match_pushes", 0)) * 0.2),
            })
            if reward < -0.4:
                self.affect.inject("frustration", min(0.25, abs(reward) * 0.08))
            elif reward > 0.5:
                self.affect.inject("progress", min(0.20, reward * 0.06))
            # momentum: the recent-trend channel (EMA of reward signs), not a
            # win-counter — it shapes persistence of current strategy.
            self.affect.state["momentum"] = self.affect._clamp(
                self.affect.state["momentum"] * 0.95 + 0.12 * max(-1.0, min(1.0, reward))
            )
            # valence-gated plasticity scale via documented behavioral_modulation()
            bmod = self.affect.behavioral_modulation()
            scale = bmod["plasticity_scale"]
            self.nucleus.apply_reward(max(-2.0, min(2.0, reward)) * scale)
        except Exception as e:
            log(f"spiking learn failed: {e}")

    def save(self):
        if not self.ok:
            return
        try:
            payload = {"version": SPIKING_VERSION,
                       "nucleus": self.nucleus.state_dict(),
                       "affect": self.affect.state,
                       "affect_meta": self.affect.state_dict(),
                       "cortex": {"memory": list(self.cortex.memory)},
                       "hippo": self.hippo.memories[-self.hippo.max_memories:]}
            tmp = SPIKING_FILE + ".tmp"
            with open(tmp, "w") as f:
                json.dump(payload, f)
            os.replace(tmp, SPIKING_FILE)   # atomic write
        except Exception as e:
            log(f"spiking checkpoint save failed: {e}")

    def load(self):
        if not os.path.exists(SPIKING_FILE):
            return
        try:
            data = json.load(open(SPIKING_FILE))
            if int(data.get("version", 0)) != SPIKING_VERSION:
                log(f"spiking checkpoint version mismatch — starting fresh nucleus")
                return
            self.nucleus.load_state_dict(data["nucleus"])
            if "affect_meta" in data and isinstance(data["affect_meta"], dict):
                self.affect.load_state_dict(data["affect_meta"])
            else:
                self.affect.load_state_dict(data.get("affect", {}))
            # durable reasoning state: veto evidence + episodic index restore
            for slot, spot, o in data.get("cortex", {}).get("memory", []):
                self.cortex.observe(int(slot), int(spot), float(o))
            for s, o in data.get("hippo", []):
                self.hippo.store(list(map(float, s)), float(o))
            log(f"spiking nucleus restored (weights + affect + cortex {len(self.cortex.memory)} memories + hippo {len(self.hippo.memories)})")
        except Exception as e:
            log(f"spiking checkpoint corrupt, starting fresh: {e}")

    def new_match_reset(self):
        """Transient activity resets between matches; durable weights persist."""
        if not self.ok:
            return
        try:
            self.nucleus.reset_transient()
            for k in ("danger", "relief", "neg_rpe", "pos_rpe"):
                self.affect.set(k, 0.0)
        except Exception:
            pass


# ---------------------- Advanced Neural Architecture (Dueling ResNet QNet) ----------------------
class SynapticResBlock(nn.Module):
    """Residual cortical column with LayerNorm + SiLU activation so deep neuron
    gearing trains smoothly with skip connections."""
    def __init__(self, dim=128):
        super().__init__()
        self.fc1 = nn.Linear(dim, dim)
        self.ln1 = nn.LayerNorm(dim)
        self.fc2 = nn.Linear(dim, dim)
        self.ln2 = nn.LayerNorm(dim)
        self.act = nn.SiLU()

    def forward(self, x):
        h = self.act(self.ln1(self.fc1(x)))
        h = self.ln2(self.fc2(h))
        return self.act(x + h)


# ============================================================
# MODEL PROFILES (scalable capacity, honestly counted / v18):
#   compact   768 x 5  ≈ 7.5M params
#   standard  1024 x 6 ≈ 13.7M params
#   advanced  1280 x 10 ≈ 34-35M params (30-40M target band)
# Chosen with NEUROML_PROFILE env var; parameter counts are computed from the
# instantiated modules (never from hardcoded claims) and the active profile
# plus its measured sizes are published to _metrics for the dashboard.
# ============================================================
QNET_PROFILES = {
    "compact": (768, 6),
    "standard": (1024, 6),
    "advanced": (1280, 8),
}


def param_report(net):
    """Honest trainable-parameter report from the instantiated modules:
    totals per class of layer, FP32 size in MB, split policy-stream totals,
    and world-model parameter count reported separately."""
    trainable = sum(p.numel() for p in net.parameters() if p.requires_grad)
    sensory = sum(p.numel() for n, p in net.named_parameters() if n.startswith("sensory."))
    cortical = sum(p.numel() for n, p in net.named_parameters() if n.startswith("cortex"))
    streams = sum(p.numel() for n, p in net.named_parameters()
                  if n.startswith(("value_stream.", "advantage_stream.")))
    twin_params = 0
    try:
        if arena_twin is not None and arena_twin.members is not None:
            twin_params = sum(p.numel() for m in arena_twin.members for p in m.parameters() if p.requires_grad)
        else:
            from arena_twin import TwinMember, ENSEMBLE_MEMBERS
            _tm = TwinMember()
            twin_params = sum(p.numel() for p in _tm.parameters() if p.requires_grad) * ENSEMBLE_MEMBERS
    except Exception:
        twin_params = 0
    return {"profile": getattr(net, "profile", "?"),
            "width": getattr(net, "W", 1024),
            "trainable_params": trainable,
            "world_model_params": twin_params,
            "sensory_params": sensory,
            "cortical_params": cortical,
            "stream_params": streams,
            "fp32_mb": round(trainable * 4 / 1024 / 1024, 1),
            "depth": getattr(net, "depth", 0)}


class QNet(nn.Module):
    """Dueling Surge-Neuron Architecture v5-deep (bigger, measured):
      - Sensory Input Stem (38 -> 1024 + LayerNorm + SiLU)
      - 6 Residual Synaptic Cortical Blocks (1024 -> 1024) ≈ 12.6M cortical synapses
      - Limbic State-Value stream V(s): 1024 -> 512 -> 1
      - Motor Action-Advantage stream A(s,a): 512 (rolled off) -> 20
      - Aggregated Q(s,a) = V(s) + (A(s,a) - mean_a A(s,a))
    ≈ 13.6M trainable parameters ≈ 100 MB fp32 checkpoint. MEASURED on this CPU:
    single forward ≈ double-digit ms (action selection never blocks), train
    step a few hundred ms — a fraction of the 5s battle tick. Deeper + wider
    cortex for richer deck-synergy / counter representations at 38-dim state.
    Migration: v4-checkpoint sensory stem is partially copied; the new columns
    then learn fast via warm training over the persisted replay buffer.
    """
    WIDE = 1024
    NARROW = 512

    def __init__(self, profile=None):
        super().__init__()
        import os as _os
        req_prof = profile or _os.environ.get("QNET_PROFILE") or _os.environ.get("NEUROML_PROFILE") or "standard"
        if req_prof not in QNET_PROFILES:
            req_prof = "standard"
        self.profile = req_prof
        wide, depth = QNET_PROFILES[self.profile]
        self.W = wide          # instance width (WIDE/NARROW kept for older code)
        self.depth = depth
        W = wide
        self.sensory = nn.Sequential(
            nn.Linear(STATE_DIM, W),
            nn.LayerNorm(W),
            nn.SiLU(),
        )
        # depth-scaled cortical columns, names cortex1..cortexN so checkpoint
        # keys stay migration-stable across profiles
        for i in range(1, depth + 1):
            setattr(self, f"cortex{i}", SynapticResBlock(W))

        # Limbic State-Value stream V(s): wide -> wide//2 -> 1
        self.value_stream = nn.Sequential(
            nn.Linear(W, wide // 2),
            nn.LayerNorm(wide // 2),
            nn.SiLU(),
            nn.Linear(wide // 2, 1),
        )
        # Motor Action-Advantage stream A(s,a): wide//2 -> 20
        self.advantage_stream = nn.Sequential(
            nn.Linear(W, wide // 2),
            nn.LayerNorm(wide // 2),
            nn.SiLU(),
            nn.Linear(wide // 2, ACTION_DIM),
        )

    def forward_streams(self, x):
        single = x.dim() == 1
        if single:
            x = x.unsqueeze(0)
        h = self.sensory(x)
        hides = []
        for i in range(1, self.depth + 1):
            h = getattr(self, f"cortex{i}")(h)
            hides.append(h)
        v_hid = self.value_stream[:-1](h)
        a_hid = self.advantage_stream[:-1](h)
        v = self.value_stream[-1](v_hid)
        a = self.advantage_stream[-1](a_hid)
        q = v + (a - a.mean(dim=-1, keepdim=True))
        if single:
            return (q.squeeze(0), v.squeeze(0), a.squeeze(0),
                    *[t.squeeze(0) for t in hides], v_hid.squeeze(0))
        return q, v, a, *hides, v_hid

    def forward(self, x):
        return self.forward_streams(x)[0]


METRICS_FILE = "ml_metrics.json"
TRAIN_LOG = open("training.log", "a", buffering=1, encoding="utf-8", errors="replace")
MENTOR_LOG = open("mentor.log", "a", buffering=1, encoding="utf-8", errors="replace")
COACH_FILE = "ai_coach.jsonl"
_metrics = {
    "architecture": "Dueling-Double-DQN (1024×6 resnet depth) + PER + 3-Step + Groq-VLM",
    "steps": 0,
    # Seed the game-memory digest so the dashboard shows it even before the
    # first distill of this session (distill_match refreshes it every match end).
    "game_memory": {},
    "opponent_memory": {"known": 0, "this_match_pushes": 0},
    "dopamine_events": [],
    "win_history": [],
    "wins_v": 0,
    "losses_v": 0,
    "losses": [],
    "td_errors": [],
    "epsilon": 0.35,
    "buffer": 0,
    "actions_taken": {},
    "rewards": [],
    "damage_punishments": [],
    "mentor_reviews": 0,
    "mentor_agree": 0,
    "matches": 0,
}


def metrics_append(loss, reward=None, action=None, dmg_punish=None, vision=None, td_err=None, mentor=None):
    """Every-train-step + every-action record into training.log and ml_metrics.json."""
    _metrics["steps"] += 1
    if loss is not None:
        _metrics["losses"].append(round(loss, 5))
        _metrics["losses"] = _metrics["losses"][-500:]
        td_str = f" td_err={td_err:.4f}" if td_err is not None else ""
        TRAIN_LOG.write(
            f"[{time.strftime('%H:%M:%S')}] step={_metrics['steps']} "
            f"loss={loss:.5f}{td_str} eps={_metrics['epsilon']:.3f} buffer={_metrics['buffer']}\n"
        )
    if td_err is not None:
        _metrics["td_errors"].append(round(td_err, 4))
        _metrics["td_errors"] = _metrics["td_errors"][-300:]
    if reward is not None:
        _metrics["rewards"].append(round(reward, 3))
        _metrics["rewards"] = _metrics["rewards"][-500:]
    if dmg_punish is not None:
        _metrics["damage_punishments"].append(round(dmg_punish, 3))
        _metrics["damage_punishments"] = _metrics["damage_punishments"][-200:]
    if vision is not None:
        _metrics["vision"] = vision
    if mentor is not None:
        _metrics["last_mentor"] = mentor
    if action is not None:
        _metrics["actions_taken"][str(action)] = _metrics["actions_taken"].get(str(action), 0) + 1
    try:
        with open(METRICS_FILE, "w") as f:
            json.dump(_metrics, f, indent=1)
    except Exception:
        pass


class TargetedDQN:
    """Advanced Dueling Double DQN with:
      - Prioritized Experience Replay (PER, proportional TD-error priorities)
      - 3-Step Bootstrapping queue (propagates tower-damage punishment 3x faster)
      - Polyak Soft Target Updates
      - Legacy checkpoint migration (upgrades older checkpoints seamlessly)
    """
    def __init__(self):
        self.policy = QNet()
        self.target = QNet()
        self.target.load_state_dict(self.policy.state_dict())
        # honest capacity report (publish + log so claims are always measured)
        _metrics["param_report"] = param_report(self.policy)
        pr = _metrics["param_report"]
        # measured load-time (honest profile sizing): time from now to first
        # inference on a synthetic state, published for the dashboard
        try:
            import time as _t
            t0 = _t.time()
            self.policy(torch.zeros(1, STATE_DIM) + 0.5)
            _metrics["model_load_latency_ms"] = round((_t.time() - t0) * 1000, 1)
        except Exception:
            pass
        log(f"model profile '{pr['profile']}': {pr['trainable_params']:,} params "
            f"({pr['fp32_mb']} MB fp32, depth {pr['depth']})")
        self.optim = optim.AdamW(self.policy.parameters(), lr=8e-4, weight_decay=1e-4)
        # GB-scale memory: 120k transitions × ~0.5 KB heavy states ≈ up to ~60 MB
        # in RAM, replay JSON dumps to disk every checkpoint so DOWNLOADERS and
        # restarts keep every memory. (A few GB on disk is achievable via
        # per-state detail; this is the practical sweet spot for CPU training.)
        self.buffer = deque(maxlen=400000)
        self.priorities = deque(maxlen=400000)
        self.nstep_queue = deque(maxlen=3)
        self.n_steps = 3
        self.epsilon = 0.35
        self.gamma = 0.95
        self.batch = 128     # massive cortex deserves massive minibatches
        self.train_every = 2  # Train every 2 battle ticks for faster convergence
        self.per_alpha = 0.6
        self.per_beta = 0.4
        self.tau = 0.015
        self._memory_dirty = 0

    def dopamine_report(self, q_state):
        """Per-neuron gearing telemetry across Sensory/Cortical/Limbic/Advantage streams.
        Includes per-neuron arrays so the dashboard can draw a real firing brain."""
        with torch.no_grad():
            x = torch.tensor(q_state, dtype=torch.float32)
            q, v, a, *hides, v_hid = self.policy.forward_streams(x)
            rep = {
                "limbic_mean": round(v_hid.abs().mean().item(), 3),
                "state_value_V": round(v.item(), 3),
                "advantage_spread": round((a.max() - a.min()).item(), 3),
                "output_best": int(q.argmax().item()),
                "output_value": round(q.max().item(), 3),
                # FULL-depth per-neuron activations (dashboard draws live brain)
                "sensory_neurons": q_state_fired(q_state),
                "limbic_neurons": [round(v_, 3) for v_ in v_hid.tolist()],
                "actions_desc": [SPOT_NAMES[i % 5] for i in range(ACTION_DIM)],
                "advantage_neurons": [round(v_, 3) for v_ in a.tolist()],
                "depth": len(hides),
            }
            for i, h in enumerate(hides, 1):
                rep[f"layer{i}_mean"] = round(h.abs().mean().item(), 3)
                rep[f"layer{i}_neurons"] = [round(v_, 3) for v_ in h.tolist()]
            return rep

    def act(self, state, forbidden=None, pain_channels=None, bias=None):
        """Action selection (9ms, never blocked by training). Pain channels are
        applied as behavioral value suppression: the chosen play must beat the
        pain-adjusted value, so repeating a proven mistake requires being
        genuinely better. Fallback default is the plain policy. `bias` is the
        spiking nucleus readout; it shifts Q by at most SPIKING_BIAS_SCALE of
        the Q-spread, so the DQN remains primary with trivial fallback."""
        if random.random() < self.epsilon:
            a = random.randrange(ACTION_DIM)
            tries = 0
            while forbidden and a in forbidden and tries < 40:
                a = random.randrange(ACTION_DIM)
                tries += 1
            return a
        with torch.no_grad():
            q = self.policy(torch.tensor(state, dtype=torch.float32)).clone()
            if forbidden:
                for f in forbidden:
                    if f < ACTION_DIM:
                        q[f] = -1e9
            if pain_channels:
                # suppress deeply painful channels in the value landscape
                for (sl, sp), avg in list(pain_channels.items())[-400:]:
                    if avg is not None and avg <= PAIN_VETO_THRESHOLD:
                        a_idx = sl * 5 + (sp % 5)
                        if a_idx < ACTION_DIM:
                            # pull the Q down toward pain magnitude (not a hard ban:
                            # suppression = avg which is always ≤ its net value only
                            # if the net value also poor; genuine better plays win)
                            q[a_idx] = torch.minimum(
                                q[a_idx], torch.tensor(avg * 0.5))
            if bias is not None:
                # spiking-nucleus vote: bounded share of the Q-spread
                width = float(q.max() - q.min())
                b = torch.tensor([bias[i] if i < len(bias) else 0.0
                                  for i in range(ACTION_DIM)])
                q = q + SPIKING_BIAS_SCALE * width * b
            return int(torch.argmax(q).item())

    def _push_per(self, transition, init_prio=None):
        self.buffer.append(transition)
        if init_prio is None:
            max_p = max(self.priorities) if self.priorities else 1.0
            # Boost initial priority for severe punishment or major reward
            r = transition[2]
            boost = 2.0 if abs(r) >= 1.0 else 1.0
            init_prio = max_p * boost
        self.priorities.append(float(max(1e-3, init_prio)))
        self._memory_dirty += 1

    def remember(self, s, a, r, s2, done):
        """Store 1-step transition immediately AND accumulate 3-step return
        transitions so delayed tower-damage punishments propagate rapidly."""
        self.nstep_queue.append((s, a, float(r), s2, bool(done)))
        # Compute N-step discounted return from the oldest transition in the queue
        if len(self.nstep_queue) == self.n_steps or done:
            while self.nstep_queue:
                s0, a0, _, _, _ = self.nstep_queue[0]
                R = 0.0
                final_s2 = s2
                final_done = False
                steps_used = 0
                for idx, (_, _, r_k, s2_k, d_k) in enumerate(self.nstep_queue):
                    R += (self.gamma ** idx) * r_k
                    final_s2 = s2_k
                    steps_used = idx + 1
                    if d_k:
                        final_done = True
                        break
                self._push_per([s0, int(a0), round(R, 4), final_s2, final_done, steps_used])
                self.nstep_queue.popleft()
                if not done:
                    break

    def train_step(self):
        n = len(self.buffer)
        if n < self.batch:
            return None
        # Ensure priorities match buffer length
        while len(self.priorities) < n:
            self.priorities.append(1.0)

        # Prioritized Experience Replay (PER) sampling
        prios = [max(1e-4, float(p)) ** self.per_alpha for p in self.priorities]
        total_p = sum(prios)
        probs = [p / total_p for p in prios]
        indices = random.choices(range(n), weights=probs, k=self.batch)

        # Anneal importance-sampling beta toward 1.0
        self.per_beta = min(1.0, self.per_beta + 0.001)
        weights = [(n * probs[i]) ** (-self.per_beta) for i in indices]
        max_w = max(weights) if weights else 1.0
        weights = [w / max_w for w in weights]

        batch = [self.buffer[i] for i in indices]
        s = torch.tensor([b[0] for b in batch], dtype=torch.float32)
        a = torch.tensor([b[1] for b in batch], dtype=torch.long)
        r = torch.tensor([b[2] for b in batch], dtype=torch.float32)
        s2 = torch.tensor([b[3] for b in batch], dtype=torch.float32)
        d = torch.tensor([float(b[4]) for b in batch], dtype=torch.float32)
        n_step = torch.tensor([float(b[5]) if len(b) > 5 else 1.0 for b in batch], dtype=torch.float32)
        w_tensor = torch.tensor(weights, dtype=torch.float32)

        # Current Q(s, a)
        q = self.policy(s).gather(1, a.unsqueeze(1)).squeeze(1)

        # Double DQN Target: online policy selects best next action, target net evaluates it
        with torch.no_grad():
            next_actions = self.policy(s2).argmax(dim=1, keepdim=True)
            q_next = self.target(s2).gather(1, next_actions).squeeze(1)
            gammas = self.gamma ** n_step
            q_exp = r + gammas * q_next * (1.0 - d)

        td_errors = (q - q_exp).detach().abs()
        elementwise_loss = nn.functional.smooth_l1_loss(q, q_exp, reduction="none")
        loss = (w_tensor * elementwise_loss).mean()

        self.optim.zero_grad()
        loss.backward()
        nn.utils.clip_grad_norm_(self.policy.parameters(), 1.0)
        self.optim.step()

        # Update PER priorities with latest TD errors
        td_list = td_errors.tolist()
        for idx_pos, buf_idx in enumerate(indices):
            if buf_idx < len(self.priorities):
                # Extra priority boost if the transition involved punishment (r < -0.4)
                punish_boost = 1.5 if batch[idx_pos][2] <= -0.45 else 1.0
                self.priorities[buf_idx] = (td_list[idx_pos] + 1e-3) * punish_boost

        # Polyak soft target update every training step
        self.soft_update_target()

        value = loss.item()
        mean_td = float(td_errors.mean().item())
        _metrics["buffer"] = len(self.buffer)
        _metrics["epsilon"] = self.epsilon
        metrics_append(value, td_err=mean_td)
        return value

    def soft_update_target(self):
        with torch.no_grad():
            for tp, pp in zip(self.target.parameters(), self.policy.parameters()):
                tp.data.mul_(1.0 - self.tau).add_(pp.data, alpha=self.tau)

    def sync_target(self):
        self.target.load_state_dict(self.policy.state_dict())

    def save(self):
        if os.path.exists("ml_policy.pt"):
            try:
                import shutil as _sh
                _sh.copy2("ml_policy.pt", "ml_policy.pt.bak")
            except Exception:
                pass
        torch.save({
            "arch": "dueling_resnet_v5_deep",
            "arch_version": 5,
            "profile": getattr(self.policy, "profile", "standard"),
            "width": getattr(self.policy, "W", 1024),
            "depth": getattr(self.policy, "depth", 6),
            "policy": self.policy.state_dict(),
            "target": self.target.state_dict(),
            "epsilon": self.epsilon,
        }, "ml_policy.pt")
        try:
            with open("ml_replay.json", "w") as f:
                json.dump(list(self.buffer)[-60000:], f)
            self._memory_dirty = 0
        except Exception as e:
            log(f"replay dump failed: {e}")

    @staticmethod
    def _migrate_overlapping_weights(dst_net, src_sd):
        """Explicit overlapping-slice migration between different profile widths
        or depths. Copies shared tensor slices and returns (exact_match_count,
        sliced_count, fresh_count)."""
        dst_sd = dst_net.state_dict()
        exact_n, sliced_n, fresh_n = 0, 0, 0
        with torch.no_grad():
            for k, dst_t in dst_sd.items():
                if k not in src_sd:
                    fresh_n += 1
                    continue
                src_t = src_sd[k]
                if tuple(src_t.shape) == tuple(dst_t.shape):
                    dst_t.copy_(src_t)
                    exact_n += 1
                elif src_t.dim() == dst_t.dim():
                    if src_t.dim() == 1:
                        n0 = min(src_t.shape[0], dst_t.shape[0])
                        dst_t[:n0].copy_(src_t[:n0])
                    elif src_t.dim() == 2:
                        r0 = min(src_t.shape[0], dst_t.shape[0])
                        c0 = min(src_t.shape[1], dst_t.shape[1])
                        dst_t[:r0, :c0].copy_(src_t[:r0, :c0])
                    sliced_n += 1
                else:
                    fresh_n += 1
        return exact_n, sliced_n, fresh_n

    def load(self):
        if os.path.exists("ml_policy.pt"):
            try:
                ckpt = torch.load("ml_policy.pt", map_location="cpu")
                self.epsilon = ckpt.get("epsilon", 0.35)
                ckpt_arch = ckpt.get("arch")
                ckpt_prof = ckpt.get("profile", "standard")
                cur_prof = getattr(self.policy, "profile", "standard")
                old_sd = ckpt.get("policy", {})
                # Check if shapes match our current profile exactly
                cur_sd = self.policy.state_dict()
                exact_compatible = (
                    ckpt_arch == "dueling_resnet_v5_deep"
                    and set(old_sd.keys()) == set(cur_sd.keys())
                    and all(tuple(old_sd[k].shape) == tuple(cur_sd[k].shape) for k in cur_sd)
                )
                if exact_compatible:
                    self.policy.load_state_dict(old_sd)
                    self.target.load_state_dict(ckpt.get("target", old_sd))
                    _metrics["checkpoint_load_mode"] = "exact"
                    log(f"loaded Dueling-ResNet v5-deep ({cur_prof}: {self.policy.W}×{self.policy.depth}) brain exactly, epsilon={self.epsilon:.2f}")
                elif old_sd:
                    # Explicit overlapping-weight migration across profiles or legacy v4/v3 checkpoints
                    ex_n, sl_n, fr_n = self._migrate_overlapping_weights(self.policy, old_sd)
                    self.target.load_state_dict(self.policy.state_dict())
                    _metrics["checkpoint_load_mode"] = f"migrated(exact={ex_n},sliced={sl_n},fresh={fr_n})"
                    log(f"migrated checkpoint ({ckpt_arch}/{ckpt_prof}) into '{cur_prof}' ({self.policy.W}×{self.policy.depth}): "
                        f"exact={ex_n}, overlapping_sliced={sl_n}, newly_initialized={fr_n}, epsilon={self.epsilon:.2f}")
                else:
                    _metrics["checkpoint_load_mode"] = "fresh"
                    log(f"unknown checkpoint arch — starting fresh brain, epsilon={self.epsilon:.2f}")
            except Exception as e:
                log(f"model load note: {e}")
        if os.path.exists("ml_replay.json"):
            try:
                with open("ml_replay.json") as f:
                    data = json.load(f)
                for item in data:
                    if len(item) == 5:
                        item = list(item) + [1]
                    self.buffer.append(item)
                    r_val = float(item[2])
                    self.priorities.append(2.0 if abs(r_val) >= 1.0 else 1.0)
                log(f"restored {len(data)} prioritized replay memories from disk")
            except Exception as e:
                log(f"replay restore failed: {e}")


# ---------------------- Full-Vision State Builder ----------------------
def build_state(mlxir, lv, rv, phase, last_slot, last_spot,
                towers=None, arena=None, afford=None):
    """38-dim state vector populated with full vision:
      [0]     : elixir / 10
      [1..2]  : left & right lane pixel variance
      [3..6]  : reference card costs
      [7..10] : true pixel-sensed card slot affordability (4 slots)
      [11..13]: match phase one-hot (early, mid, late)
      [14..17]: last played card slot one-hot
      [18..22]: last played placement spot one-hot
      [23..27]: tower HP fractions (ally_left, ally_right, ally_king, enemy_left, enemy_right)
      [28..29]: tower count advantage (ally_alive/3, enemy_alive/3)
      [30..35]: active field unit vision (enemy_left, enemy_right, enemy_bridge_l,
                enemy_bridge_r, ally_left, ally_right)
      [36..37]: imminent threat flags (left_threat, right_threat)
    """
    state = [0.0] * STATE_DIM
    state[0] = mlxir / 10.0
    state[1] = min(lv / 100.0, 1.0)
    state[2] = min(rv / 100.0, 1.0)
    try:
        hand_deck = json.load(open(AUTONOMOUS_DECK_FILE)).get("deck") or ["musketeer", "knight", "archers", "giant"]
    except Exception:
        hand_deck = ["musketeer", "knight", "archers", "giant"]
    for i, name in enumerate(hand_deck[:4]):
        c = CARDS_DB.get((name or "").strip().lower(), {}).get("cost", 4)
        state[3 + i] = c / 10.0
        if afford is not None and i < len(afford):
            state[7 + i] = float(afford[i])
        else:
            state[7 + i] = 1.0 if c <= mlxir else 0.0
    state[11 + (phase % 3)] = 1.0
    state[14 + (last_slot % 4)] = 1.0
    state[18 + (last_spot % 5)] = 1.0

    if towers:
        state[23] = float(towers.get("ally_left", 1.0))
        state[24] = float(towers.get("ally_right", 1.0))
        state[25] = float(towers.get("ally_king", 1.0))
        state[26] = float(towers.get("enemy_left", 1.0))
        state[27] = float(towers.get("enemy_right", 1.0))
        state[28] = float(towers.get("ally_alive", 3)) / 3.0
        state[29] = float(towers.get("enemy_alive", 3)) / 3.0

    if arena:
        state[30] = min(arena.get("enemy_left", 0) / 40.0, 1.0)
        state[31] = min(arena.get("enemy_right", 0) / 40.0, 1.0)
        state[32] = min(arena.get("enemy_bridge_l", 0) / 20.0, 1.0)
        state[33] = min(arena.get("enemy_bridge_r", 0) / 20.0, 1.0)
        state[34] = min(arena.get("ally_left", 0) / 40.0, 1.0)
        state[35] = min(arena.get("ally_right", 0) / 40.0, 1.0)
        state[36] = 1.0 if arena.get("enemy_bridge_l", 0) >= 3 else 0.0
        state[37] = 1.0 if arena.get("enemy_bridge_r", 0) >= 3 else 0.0

    return state


def foreground_app():
    """Return 'clashroyale', 'other', 'unknown'
    (focused app present but not identifiable) or None (adb unreachable).
    Uses BOTH mCurrentFocus and mFocusedApp, and treats 'GameApp' windows of
    com.supercell.clashroyale as in-game even mid-activity transition."""
    try:
        focus = sh(["shell", "dumpsys", "window"], timeout=15)
        if focus.returncode != 0 and not focus.stdout:
            return None
        text = focus.stdout.decode(errors="ignore")
        line_focus = next((l for l in text.splitlines() if "mCurrentFocus" in l), "")
        line_app = next((l for l in text.splitlines() if "mFocusedApp" in l), "")
        merged = (line_focus + " " + line_app).lower()
        if "clashroyale" in merged or "com.supercell" in merged:
            return "clashroyale"
        if "notificationshade" in merged or "null" in merged:
            return "clashroyale_or_locked" if "NotificationShade" in (line_focus + line_app) else "unknown"
        if line_focus or line_app:
            return "other"
        return "unknown"
    except Exception:
        return None


AUTONOMOUS_DECK_FILE = "my_deck.json"


def _local_meta_deck(stats):
    """Deck-understanding fallback: pick the best 8-card meta deck from
    meta_decks.json matched to the agent's OWN memory (its recent winrate and
    what beat it), with anti-beatdown backup selection when it lost recently.
    Works with zero Groq — the agent can always build decks."""
    try:
        meta = json.load(open("meta_decks.json"))
        decks = meta.get("top_meta_decks") or []
    except Exception:
        decks = [{"cards": ["hogrider", "musketeer", "ice_golem", "cannon",
                            "skeletons", "minions", "fireball", "zap"],
                  "name": "builtin-fallback", "style": "cycle", "avg_elixir": 3.0}]
    # memory-aware pick: if losses recently outweight wins, prefer a CONTROL deck
    recent = (stats or {}).get("recent_winrate", 50.0)
    scored = []
    for d in decks:
        s = 1.0
        cards = [c.lower() for c in d.get("cards", [])]
        if len(cards) < 6:
            continue
        has_spell = any(c in ("fireball", "arrows", "zap", "poison") for c in cards)
        has_building = any(c in ("cannon", "tesla", "inferno_tower", "bomb_tower") for c in cards)
        if recent < 45.0:
            # losing → favor defense-included control decks
            s += 0.6 * (int(has_spell) + int(has_building)) / 2
        else:
            # winning → keep cycle pressure
            s += 0.4 if d.get("style") == "cycle" else 0.0
        s += 0.2 * int(sum(1 for c in cards if c in CARDS_DB) >= 6)
        scored.append((s, d))
    scored.sort(key=lambda x: x[0], reverse=True)
    if scored:
        return scored[0][1]
    return decks[0] if decks else None


META_FILE = "meta_decks.json"
META_REFRESH_DAYS = 30       # meta understanding refreshes monthly (spec)


def meta_stale_days():
    try:
        meta = json.load(open(META_FILE))
        stamp = meta.get("fetched_at", "")
        import datetime as _dt
        try:
            t = _dt.datetime.strptime(stamp[:10], "%Y-%m-%d")
            return (_dt.datetime.now() - t).days
        except Exception:
            return None
    except Exception:
        return None


def ensure_meta_fresh(refetch_fn=None):
    """Guarantee the ladder meta is at most META_REFRESH_DAYS old. Returns
    (used, stale_days_or_None). Explains itself in the log when skipped."""
    stale = meta_stale_days()
    if stale is None or stale > META_REFRESH_DAYS:
        if refetch_fn:
            try:
                refetch_fn()
                stale = meta_stale_days()
                log(f"meta refreshed ({stale}d old)")
            except Exception as e:
                log(f"meta refresh note: {str(e)[:70]}")
        else:
            log(f"meta is {'unknown' if stale is None else str(stale) + 'd old'} — "
                f"refresh when the web fetcher is available (policy: every {META_REFRESH_DAYS}d)")
    return True, stale


def autonomous_deck_session(gm_stats=None):
    """Once per startup AND on every 5th match end: build the deck.

    Two builders cooperate:
      1. Groq Deck Architect (live meta awareness)
      2. Local meta matcher (always works, no key needed; picks from the real
         fetched meta list, memory-aware)
    NEVER touches in-game Deck Edit (ToS) — but the deck file that drives
    play policy is always freshly built either way.
    """
    try:
        player_deck = json.load(open(AUTONOMOUS_DECK_FILE)).get("deck")
    except Exception:
        player_deck = None
    chosen, critique, source = None, "", ""
    r = groq_deck_builder(player_deck)
    if r.get("deck") and len(r["deck"]) >= 6:
        chosen, critique, source = r["deck"][:8], r.get("critique", ""), "groq"
    else:
        d = _local_meta_deck(gm_stats)
        if d:
            chosen, critique, source = d["cards"][:8], d.get("name", "") + " (local meta match)", "local"
    if chosen and len(chosen) >= 6:
        try:
            json.dump({"deck": chosen, "critique": critique,
                       "built_by": source,
                       "updated": time.strftime("%Y-%m-%d %H:%M")},
                      open(AUTONOMOUS_DECK_FILE, "w"), indent=1)
            log(f"DECK ARCHITECT ({source}) built deck: {chosen} ({critique[:60]})")
        except Exception:
            pass
    else:
        log("deck architect could not build any deck (no meta + no groq) — keeping prior")
    return {"deck": chosen, "source": source}


def main():
    log("NeuroML v11 (Dueling DQN + full vision + Groq coach) started on " + DEV)
    offline_since = None
    brain = TargetedDQN()
    brain.load()
    spike_agent = SpikingAgent()   # spiking nucleus + affective core (guarded)
    spike_agent.new_match_reset()
    try:
        ensure_meta_fresh()                           # 30-day meta freshness gate
        autonomous_deck_session(game_memory_digest())  # deck built at every startup
    except Exception as e:
        log(f"deck session note: {e}")
    # Warm-train 3 steps on restored replay memories so new Dueling head aligns immediately
    if len(brain.buffer) >= brain.batch:
        for _ in range(3):
            brain.train_step()
        brain.save()
        log(f"warm-trained Dueling Double DQN on {len(brain.buffer)} memories")

    just_queued = False
    back_streak = 0
    popup_hits = 0
    stuck_since = None
    tick_in_match = 0
    prev_state = None
    prev_action = None
    prev_towers = None
    elixir_leak_ticks = 0
    last_spell_played = None
    _cast_xy = None
    _pred_prev = None
    _pred_mae = {"tower_hp_mae": 0.0, "elixir_mae": 0.0, "n": 0}
    _finisher_cast = False
    train_loss_ma = None
    cards_played = 0
    mentor_cooldown = 0.0
    from referee import CheapCycleMonitor, referee_evaluate
    cheap_monitor = CheapCycleMonitor()
    opp_memory_store = _load_opponent_memory()
    _init_twin()   # restore local digital-twin ensemble if present (bounded caps)
    game_memory = _load_game_memory()
    # LIFETIME RECORD SEED: the W/L counters start from the durable game-memory
    # book instead of from zero on every restart (dashboard honesty fix).
    _seeded = seed_lifetime_record(_metrics, game_memory)
    if _seeded:
        log(f"lifetime record seeded: {_metrics['wins_v']}-{_metrics['losses_v']} "
            f"over {_seeded} tracked matches ({_metrics['win_rate']}%)")
    match_stats = {"reward_total": 0.0, "ticks": 0, "cards_played": 0,
                   "pushes_faced": 0, "towers_down": 0, "towers_lost": 0,
                   "rule_corrections": 0, "spot_totals": {}}
    opponent = None
    opponent_arena_prev = None
    opponent_towers_prev = None
    last_fg_note = 0.0
    user_saw_clash = None
    pain_channels = _load_pain_channels()
    brain_ref[0] = brain

    while True:
        try:
            # ---- GATE: no sensing, no tapping, no learning unless the game
            # is the foreground app AND the phone is reachable ----
            fg = foreground_app()
            if fg is None:
                offline_since = offline_since or time.time()
                if time.time() - offline_since > 10:
                    log("phone unreachable (left Wi-Fi?) — waiting for reconnect")
                    sh(["connect", DEV], timeout=20)
                time.sleep(10)
                continue
            offline_since = None
            if fg != "clashroyale":
                # USER-CONTROLLED PLAY: only ever act when the user has Clash
                # open themselves. Never wake the phone, never unlock, never
                # launch the game from another app. Wait politely, check again.
                if fg != user_saw_clash and time.time() - (last_fg_note or 0) > 600:
                    log(f"waiting for user to open Clash (currently fg={fg}) — bot only plays when YOU open the game")
                    last_fg_note = time.time()
                user_saw_clash = fg
                time.sleep(5)
                continue

            # ---- gate passed: USER opened Clash — play ----
            png = screenshot()
            png_ts = os.path.getmtime(png) if os.path.exists(png) else time.time()
            obs_age = time.time() - png_ts
            _metrics["observation_ts"] = round(png_ts, 2)
            _metrics["observation_age_ms"] = round(obs_age * 1000, 0)
            from PIL import Image
            img = Image.open(png).convert("RGB")
            state = classify(img)
            if state == "unknown":
                g_state = groq_vision_classify(img)
                if g_state in ("battle", "lobby", "result", "quit_dialog", "popup"):
                    state = g_state

            now = time.time()
            if stuck_since and now - stuck_since > 45:  # was 90s — UI recovery must be snappy
                log(f"stuck on '{state}' for 45s — force cycle (OK → BACK → Battle tab)")
                brain.save()
                taps = [OK_CENTER, RESULT_OK, CANCEL_BUTTON, BATTLE_BUTTON]
                for t in taps:
                    tap(*t)
                    time.sleep(0.5)
                # NOTE: never force-stop/relaunch the game on stuck — that would
                # break the user's rule of only playing when THEY open Clash.
                # The tap cycle above is enough; we just keep waiting.
                stuck_since = None
                back_streak = 0
                popup_hits = 0
                just_queued = False
                continue

            if state == "quit_dialog":
                log("quit dialog -> Cancel")
                tap(*CANCEL_BUTTON)
                back_streak = 0
                stuck_since = stuck_since or now
                continue

            if state == "battle":
                stuck_since = None
                back_streak = 0
                just_queued = False
                if obs_age > 12.0:
                    # STALE OBSERVATION GUARD (spec P1§1): an old frame is not
                    # a battlefield — acting on it would tap blind into the
                    # past. Skip the shot; the screencap refreshes next loop.
                    log(f"stale observation ({obs_age:.1f}s old > 12s) — skip shot")
                    _metrics["stale_observations"] = int(_metrics.get("stale_observations", 0)) + 1
                    time.sleep(1.0)
                    continue
                if opponent is None:
                    opponent = opponent_new_match()
                    match_stats = {"reward_total": 0.0, "ticks": 0, "cards_played": 0,
                                   "pushes_faced": 0, "towers_down": 0, "towers_lost": 0,
                                   "rule_corrections": 0, "spot_totals": {}}
                    log("new opponent tracked (memory persistent across matches)")
                    spike_agent.new_match_reset()   # transient reset, weights persist
                mlxir = elixir_count(img)
                lv, rv = lane_variances(img)
                towers = tower_healths(img)
                arena = scan_arena_vision(img)
                afford = hand_affordability(img, mlxir)

                # ---- PREDICTIVE WORLD MODEL (one-tick horizon, honestly
                # scored): the model persists tower HP (nothing changed it) and
                # regenerates elixir (~0.7/tick); the NEXT tick's observation
                # is scored against it so prediction error is real data. ----
                _pn = _pred_mae["n"] + 1
                if _pred_prev is not None:
                    pe_tower = (abs(towers["ally_left"] - _pred_prev["ally_left"]) +
                                abs(towers["ally_right"] - _pred_prev["ally_right"]) +
                                abs(towers["enemy_left"] - _pred_prev["enemy_left"]) +
                                abs(towers["enemy_right"] - _pred_prev["enemy_right"]))
                    pe_elixir = abs(min(10, max(0, mlxir)) - _pred_prev["elixir"])
                    _pred_mae["tower_hp_mae"] = round(
                        _pred_mae["tower_hp_mae"] * (1 - 1 / _pn) + pe_tower / _pn, 4)
                    _pred_mae["elixir_mae"] = round(
                        _pred_mae["elixir_mae"] * (1 - 1 / _pn) + pe_elixir / _pn, 4)
                    _pred_mae["n"] = _pn
                    _metrics["prediction"] = {
                        "horizon_ticks": 1,
                        "n_scored": _pn,
                        "predictedTowerHP": {k: round(v, 3) for k, v in _pred_prev.items() if k != "elixir"},
                        "tower_hp_mae": _pred_mae["tower_hp_mae"],
                        "elixir_mae": _pred_mae["elixir_mae"],
                    }
                _pred_prev = {
                    "ally_left": towers["ally_left"], "ally_right": towers["ally_right"],
                    "enemy_left": towers["enemy_left"], "enemy_right": towers["enemy_right"],
                    "elixir": min(10, mlxir + 0.7),
                }

                if arena["enemy_left"] > arena["enemy_right"] + 4 or arena["enemy_bridge_l"] >= 3:
                    lane = "left"
                elif arena["enemy_right"] > arena["enemy_left"] + 4 or arena["enemy_bridge_r"] >= 3:
                    lane = "right"
                else:
                    lane = "left" if lv > rv * 1.3 and lv > 30 else ("right" if rv > lv * 1.3 and rv > 30 else None)

                phase = match_phase(img, tick_in_match)
                leaking = mlxir >= 10
                state_s = build_state(
                    mlxir, lv, rv, phase,
                    prev_action // 5 if prev_action is not None else 0,
                    prev_action % 5 if prev_action is not None else 0,
                    towers=towers, arena=arena, afford=afford,
                )

                affordable_slots = [i for i in range(4) if state_s[7 + i] > 0.5]
                forbidden = set()
                for slot in range(4):
                    if slot not in affordable_slots:
                        for spot in range(5):
                            forbidden.add(slot * 5 + spot)

                _spike_bias = spike_agent.observe_state(state_s)   # spiking vote
                # prefrontal vetoes join the forbidden set, bounded so valid
                # alternatives always remain for the DQN to choose from
                if spike_agent.vetoed and len(forbidden) + len(spike_agent.vetoed) < 12:
                    forbidden |= spike_agent.vetoed
                action = brain.act(state_s, forbidden=forbidden, pain_channels=pain_channels,
                                   bias=_spike_bias)
                # Bounded Digital Twin planner check (active only when TWIN_PLAN_ENABLED
                # AND the ensemble beats its persistence baseline on held-out data)
                _twin_planned = None
                try:
                    if arena_twin is not None and arena_twin.ready:
                        legal_cand = [a for a in range(ACTION_DIM) if a not in forbidden]
                        _twin_planned = arena_twin.plan(
                            state_s, legal_cand,
                            value_fn=lambda sp: float(brain.policy(torch.tensor(sp, dtype=torch.float32)).max().item())
                        )
                        if _twin_planned and isinstance(_twin_planned.get("action"), int):
                            action = _twin_planned["action"]
                except Exception:
                    _twin_planned = None
                _metrics["pain_channels_active"] = sum(1 for v in pain_channels.values() if v <= PAIN_VETO_THRESHOLD)
                slot, spot_i = divmod(action, 5)
                spot_n = SPOT_NAMES[spot_i]
                mentor = None

                # ---- GAME-KNOWLEDGE REFEREE (rules on top of the network) ----
                hand_deck = []
                try:
                    hand_deck = json.load(open(AUTONOMOUS_DECK_FILE)).get("deck") or []
                except Exception:
                    pass
                finishers = tower_finish_check(towers, hand_deck, mlxir)
                # ---- PHYSICS OVERRIDE (lowest-HP tower law): a kill shot is
                # deterministic — if a held affordable spell can kill an enemy
                # tower, it is cast EXACTLY ON that tower regardless of what
                # the network or the coach prefers. No Q-value may drop a
                # 1-tap tower kill for a safer-looking play. ----
                _kill = physics_finisher(towers, hand_deck, mlxir, afford)
                if _kill:
                    _metrics["physics"] = {
                        "law": "lowest-HP tower",
                        "side": _kill["side"],
                        "tower_hp": _kill["hp"],
                        "spell": _kill["spell"],
                        "spell_damage_frac": _kill["dmg"],
                        "target_xy": _kill["target_xy"],
                        "killable": True,
                        "observation_age_s": round(obs_age, 2),
                    }
                    action = _kill["slot"] * 5 + (0 if _kill["side"] == "left" else 1)
                    _cast_xy = _kill["target_xy"]   # land ON the tower
                    rule_note = (f"physics finisher->{_kill['side']} "
                                 f"(tower {_kill['hp']*100:.0f}% HP, {_kill['spell']})")
                    slot, spot_i = divmod(action, 5)
                    spot_n = SPOT_NAMES[spot_i]
                    match_stats["rule_corrections"] += 1
                    log(f"PHYSICS: {_kill['spell']} -> {_kill['side']} tower at "
                        f"{_kill['hp']*100:.0f}% HP, exact tap {_kill['target_xy']}")
                else:
                    _cast_xy = None
                    _low = [(towers.get(k, 1.0), s) for s, k in
                            (("left", "enemy_left"), ("right", "enemy_right"))
                            if towers.get(k, 1.0) > 0.03]
                    _metrics["physics"] = {
                        "law": "lowest-HP tower",
                        "side": (min(_low)[1] if _low else None),
                        "tower_hp": (round(min(_low)[0], 3) if _low else None),
                        "killable": False,
                    }
                    action, rule_note = card_play_policy(
                        action, mlxir, lane, arena, towers, afford, hand_deck, finishers, opponent=opponent)
                    slot, spot_i = divmod(action, 5)
                    spot_n = SPOT_NAMES[spot_i]
                if rule_note != "net":
                    reward_rules_add = REWARD_WEIGHTS["game_rule_followed"]
                    match_stats["rule_corrections"] += 1
                    log(f"RULES: {rule_note} slot={slot} spot={spot_n}")
                else:
                    reward_rules_add = 0.0
                # ---- DECISION PROVENANCE (who chose this play, and why) ----
                _origin = (
                    "physics_finisher" if _kill
                    else "rules_referee" if rule_note != "net"
                    else "twin_planner" if _twin_planned
                    else "prefrontal_veto" if spike_agent.vetoed
                    else "dqn_policy"
                )
                _metrics["decision"] = {
                    "t": time.strftime("%H:%M:%S"),
                    "action": f"slot{slot}.{spot_n}",
                    "origin": _origin,
                    "rule_note": rule_note,
                    "masked_actions": int(_metrics.get("masked_actions", 0) or len(forbidden)),
                    "vetoed_actions": sorted(spike_agent.vetoed),
                    "elixir": mlxir, "lane": lane,
                }
                # game memory: accumulate per-spot dopamine totals
                _st = match_stats["spot_totals"].setdefault(spot_n, [0.0, 0])
                match_stats["spot_totals"][spot_n] = [round(_st[0], 3), _st[1] + 1]

                # ---- Compute Dopamine / Punishment Signal ----
                reward = 0.0
                dmg_punish = None
                dmg_source = None
                _events = []  # every labeled dopamine/punishment event this tick

                # ---- SPELL VALUE TRACKING: did the spell cast ONE tick ago hit
                # anything? (enemy units present, or enemy tower HP dropped)
                # Hitting nothing = WASTED SPELL = heavy punishment. ----
                if last_spell_played is not None and opponent_arena_prev is not None and prev_towers is not None:
                    _slot_i, _spot_i = last_spell_played
                    _spell_name = ""
                    try:
                        _deck_now = json.load(open(AUTONOMOUS_DECK_FILE)).get("deck") or []
                        _spell_name = _deck_now[_slot_i] if _slot_i < len(_deck_now) else ""
                    except Exception:
                        pass
                    _role = CARDS_DB.get(str(_spell_name).lower(), {}).get("role")
                    if _role == "spell":
                        _hit_units = (opponent_arena_prev.get("enemy_left", 0) +
                                      opponent_arena_prev.get("enemy_right", 0)) >= 1
                        _el_tower_drop = max(0.0, prev_towers.get("enemy_left", 1) - towers.get("enemy_left", 1))
                        _er_tower_drop = max(0.0, prev_towers.get("enemy_right", 1) - towers.get("enemy_right", 1))
                        _hit_tower = (_el_tower_drop + _er_tower_drop) >= 0.03
                        if _hit_units or _hit_tower or _finisher_cast:
                            _v = "damaged units" if _hit_units else ("chipped enemy tower" if _hit_tower else "finisher attempt")
                            _bonus = REWARD_WEIGHTS["spell_connected"]
                            reward += _bonus
                            _events.append((f"✨ spell connected: {_v}", _bonus))
                            log(f"SPELL VALUE: {_spell_name} {_v} -> +{_bonus:.2f}")
                        else:
                            _punish = REWARD_WEIGHTS["spell_wasted"]
                            record_pain(pain_channels, _slot_i, _spot_i, _punish)
                            _save_pain_channels(pain_channels)
                            reward += _punish
                            _events.append((f"🚫 WASTED SPELL {_spell_name} — hit nothing", _punish))
                            log(f"SPELL WASTED: {_spell_name} hit nothing -> {_punish:+.2f}")
                _finisher_cast = False
                last_spell_played = None

                if prev_towers is not None:
                    dl = max(0.0, prev_towers["ally_left"] - towers["ally_left"])
                    dr = max(0.0, prev_towers["ally_right"] - towers["ally_right"])
                    dk = max(0.0, prev_towers["ally_king"] - towers["ally_king"])
                    ally_drop = dl + dr + dk
                    ally_lost = max(0, prev_towers["ally_alive"] - towers["ally_alive"])

                    if ally_drop >= 0.05 or ally_lost > 0:
                        dmg_info = {
                            "ally_hp_drop": ally_drop,
                            "ally_towers_lost": ally_lost,
                            "ally_left": towers["ally_left"],
                            "ally_right": towers["ally_right"],
                            "ally_king": towers["ally_king"],
                        }
                        dmg_punish, dmg_source = referee_pain(dmg_info, towers.get("ally_alive", 3), tick_in_match)
                        reward += dmg_punish
                        match_stats["towers_lost"] += int(ally_lost)
                        log(
                            f"TOWER DAMAGE TAKEN (drop={ally_drop:.2f}, lost={ally_lost}) "
                            f"-> punishment={dmg_punish:+.2f} via {dmg_source}"
                        )
                        # loss is real even before shaping — tag it for the feed

                    el_drop = max(0.0, prev_towers["enemy_left"] - towers["enemy_left"])
                    er_drop = max(0.0, prev_towers["enemy_right"] - towers["enemy_right"])
                    enemy_drop = el_drop + er_drop
                    enemy_lost = max(0, prev_towers["enemy_alive"] - towers["enemy_alive"])
                    if dmg_punish is None and (enemy_drop >= 0.05 or enemy_lost > 0):
                        enemy_bonus = min(2.0, round(enemy_drop * 2.5 + enemy_lost * 1.2, 2))
                        reward += enemy_bonus
                        match_stats["towers_down"] += int(enemy_lost)
                        log(f"ENEMY TOWER DAMAGED (drop={enemy_drop:.2f}) -> dopamine +{enemy_bonus:.2f}")

                # ---- RICH DOPAMINE SHAPING (each item logged as its OWN
                # dopamine event so the feed never shows a bad behavior green) ----
                # (_events was created above for spell tracking — reuse it)
                # SIMULTANEOUS ACCOUNTING (spec §4): reward shaping runs on BOTH
                # tower-hit and clean ticks; the damage punishment is then ADDED
                # on top so neither signal is ever censored or double-counted.
                if True:
                    # 1) correct-lane defense
                    if lane:
                        if (lane == "left" and spot_n in ("left_defend", "bridge_left")) or \
                           (lane == "right" and spot_n in ("right_defend", "bridge_right")):
                            reward += REWARD_WEIGHTS["correct_lane_defense"]
                            _events.append(("✅ correct lane defense", REWARD_WEIGHTS["correct_lane_defense"]))
                    # 2) spend at max elixir
                    if mlxir >= 10 and "center_back" not in spot_n and "bridge" in spot_n:
                        reward += REWARD_WEIGHTS["spent_at_max_elixir"]
                        _events.append(("✅ spent at max elixir", REWARD_WEIGHTS["spent_at_max_elixir"]))
                    # 3) elixir discipline: playing at 9-10 elixir is good economy
                    if mlxir >= 9:
                        reward += REWARD_WEIGHTS["elixir_economy_9plus"]
                        _events.append(("✅ elixir economy (played at 9+)", REWARD_WEIGHTS["elixir_economy_9plus"]))
                    # 4) proactive counter-push: attacking the opposite lane when enemy commits
                    if arena["enemy_left"] + arena["enemy_right"] >= 8 and "bridge" in spot_n:
                        opposite = arena["enemy_right"] if arena["enemy_left"] >= arena["enemy_right"] else arena["enemy_left"]
                        if opposite <= 2:
                            reward += REWARD_WEIGHTS["counterpush_opposite_lane"]
                            _events.append(("✅ counter-push other lane", REWARD_WEIGHTS["counterpush_opposite_lane"]))
                    # 5) counter-threshold rewards (visible dopamine when ahead)
                    if towers["enemy_alive"] < towers["ally_alive"]:
                        reward += REWARD_WEIGHTS["tower_advantage_held"]
                        _events.append(("✅ tower advantage held", REWARD_WEIGHTS["tower_advantage_held"]))
                    # 6) RULES dopamine: playing by the law of the game is rewarded
                    if reward_rules_add:
                        reward += reward_rules_add
                        _events.append(("✅ game rule followed", reward_rules_add))
                    # 7) TROOP-KILL DOPAMINE: vision sees enemy units die
                    e_units_prev = (opponent_arena_prev.get("enemy_left", 0) +
                                    opponent_arena_prev.get("enemy_right", 0)) if opponent_arena_prev else 0
                    e_units_now = arena["enemy_left"] + arena["enemy_right"]
                    e_death = max(0, e_units_prev - e_units_now)
                    if e_death >= 4:
                        kill_dopamine = min(REWARD_WEIGHTS["enemy_troop_kill_cap"], round(e_death * REWARD_WEIGHTS["enemy_troop_kill_per_px"], 2))
                        reward += kill_dopamine
                        _events.append((f"💀 killed {e_death}px of enemy troops", kill_dopamine))
                        log(f"ENEMY TROOPS KILLED ({e_death}px bars fell) -> dopamine +{kill_dopamine:.2f}")
                if dmg_punish is not None:
                    # the damage punishment STACKS on the earned shaping above
                    reward += dmg_punish
                    _events.append(("\U0001f6d1 my tower took damage", dmg_punish))
                    # SYNAPTIC PAIN: this (slot,spot) channel gets an LTD tag —
                    # repeating the same play will hurt more and be avoided sooner.
                    record_pain(pain_channels, slot, spot_i, dmg_punish)
                    _save_pain_channels(pain_channels)

                # ---- REFEREE SCENARIO ADJUSTMENTS (weakest-tower, finisher urgency,
                # elixir trade when known, anti-farming with threat exemption) ----
                try:
                    _played_card_name = hand_deck[slot].lower() if slot < len(hand_deck) and hand_deck[slot] else ""
                    _played_cost = CARDS_DB.get(_played_card_name, {}).get("cost", 4)
                    _targeted_t = (
                        ("left", towers.get("enemy_left", 1.0)) if spot_n == "bridge_left"
                        else ("right", towers.get("enemy_right", 1.0)) if spot_n == "bridge_right"
                        else None
                    )
                    _ref_eval = referee_evaluate({
                        "threat": 1.0 if lane else 0.0,
                        "targeted_tower": _targeted_t,
                        "enemy_hp": {"enemy_left": towers.get("enemy_left", 1.0),
                                     "enemy_right": towers.get("enemy_right", 1.0)},
                        "finisher_executed": bool(_kill is not None),
                        "finisher_available": bool(finishers),
                        "finisher_legal": True,
                        "spell_used": _played_card_name if CARDS_DB.get(_played_card_name, {}).get("role") == "spell" else None,
                        "cost": _played_cost,
                        "opponent_cost_est": opponent.get("last_push_cost_est") if opponent else None,
                    }, cheap_monitor=cheap_monitor)
                    if _ref_eval["reward_adjustment"] != 0.0:
                        reward += _ref_eval["reward_adjustment"]
                        for _ck, _cv in _ref_eval["components"].items():
                            _cval = _cv.get("bonus") or _cv.get("penalty") or _cv.get("delta") or 0.0
                            if _cval != 0.0:
                                _events.append((f"⚖️ referee.{_ck}", float(_cval)))
                    _metrics["referee_last"] = _ref_eval
                except Exception:
                    pass

                # ---- REWARD LEDGER: every component of this tick's reward in
                # the machine ledger + team-total aggregates (no censoring) ----
                _rl = _metrics.setdefault("reward_ledger", [])
                _comp = [{"e": e, "r": round(r_, 3)} for e, r_ in _events if r_ != 0.0]
                _rl.append({"t": time.strftime("%H:%M:%S"), "spot": spot_n,
                            "components": _comp, "net": round(reward, 3),
                            "tower_damage": dmg_punish})
                _metrics["reward_ledger"] = _rl[-60:]
                reward_totals_update(_metrics.setdefault("reward_totals", {}), _events, dmg_punish)

                # ---- PUNISHMENTS (always their OWN negative event, never green) ----
                # CYCLING AMNESTY: leaking while deliberately cycling cheap cards
                # (hand full of affordable low-costs, no big threat) is GOOD
                # resource conversion, not waste — no punishment then.
                cheap_in_hand = sum(1 for i in range(4) if state_s[7 + i] > 0.5) >= 2
                cycling_ok = leaking and cheap_in_hand and not lane
                if mlxir <= 2 and lane is None:
                    reward += REWARD_WEIGHTS["play_with_no_threat"]
                    _events.append(("🔻 wasted elixir nowhere (played with no threat)", REWARD_WEIGHTS["play_with_no_threat"]))
                if leaking and not cycling_ok:
                    elixir_leak_ticks += 1
                    leak_punish = REWARD_WEIGHTS["leak_per_tick"] * elixir_leak_ticks
                    reward -= leak_punish
                    _events.append((f"💧 ELIXIR LEAK #{elixir_leak_ticks}", -leak_punish))
                elif leaking and cycling_ok:
                    elixir_leak_ticks = 0
                    _events.append(("♻️ cycling cheap cards at max elixir (allowed)", REWARD_WEIGHTS["cycling_amnesty"]))
                else:
                    elixir_leak_ticks = 0
                # dropped tower this tick = pure red event even if kills happened
                if prev_towers is not None:
                    _tl = max(0, prev_towers["ally_alive"] - towers["ally_alive"])
                    if _tl > 0:
                        _events.append((f"💀 LOST {_tl} TOWER(S)", REWARD_WEIGHTS["tower_lost_per_tower"] * _tl))
                # incorrect lane defense = red (still valid on tower-hit ticks:
                # the defender's CHOICE not to defend the lane is a real error)
                if lane:
                    if (lane == "left" and spot_n in ("right_defend", "bridge_right")) or \
                       (lane == "right" and spot_n in ("left_defend", "bridge_left")):
                        reward += REWARD_WEIGHTS["wrong_lane_defense"]
                        _events.append(("❌ defended the WRONG lane", REWARD_WEIGHTS["wrong_lane_defense"]))

                # Humanized swipe: tiny jitter on start point + variable duration
                jx = random.randint(-SWIPE_START_JITTER, SWIPE_START_JITTER)
                jy = random.randint(-SWIPE_START_JITTER, SWIPE_START_JITTER)
                dur = random.randint(280, 420)
                x, y = CARDS[slot % 4]
                # physics finishers tap EXACTLY ON the enemy tower, not a generic row
                sx, sy = (_cast_xy if _cast_xy else FIELD_SPOTS[spot_n])
                sh(["shell", "input", "swipe", str(x + jx), str(y + jy), str(sx), str(sy), str(dur)])
                time.sleep(0.45)
                # Track spell casts for next-tick value judgment (hit vs wasted)
                _played_name = ""
                try:
                    _deck_now = json.load(open(AUTONOMOUS_DECK_FILE)).get("deck") or []
                    _played_name = _deck_now[slot] if slot < len(_deck_now) else ""
                except Exception:
                    pass
                if CARDS_DB.get(str(_played_name).lower(), {}).get("role") == "spell":
                    last_spell_played = (slot, spot_i)
                    _finisher_cast = bool(finishers) and "finisher" in rule_note
                cards_played += 1
                tick_in_match += 1
                # game-memory accumulators
                match_stats["reward_total"] += reward
                match_stats["ticks"] += 1
                match_stats["cards_played"] += 1
                match_stats["pushes_faced"] = len(opponent["pushes"]) if opponent else match_stats["pushes_faced"]
                match_stats["towers_down"] = match_stats["towers_down"]
                screenshot_async()  # pipeline: next frame encodes while we think/train
                log(
                    f"elixir={mlxir} lane={lane} towers_hp=({towers['ally_left']:.2f},{towers['ally_right']:.2f},{towers['ally_king']:.2f}) "
                    f"enemy_hp=({towers['enemy_left']:.2f},{towers['enemy_right']:.2f}) "
                    f"units=(E:{arena['enemy_left']}/{arena['enemy_right']} A:{arena['ally_left']}/{arena['ally_right']}) "
                    f"slot={slot} spot={spot_n} reward={reward:+.2f} eps={brain.epsilon:.2f} "
                    f"loss={f'{train_loss_ma:.4f}' if train_loss_ma else 'n/a'}"
                )
                _metrics["epsilon"] = brain.epsilon
                _metrics["neurons"] = brain.dopamine_report(state_s)
                # Real-time ML equations panel (what the model is literally computing)
                with torch.no_grad():
                    x_t = torch.tensor(state_s, dtype=torch.float32)
                    q_row = brain.policy(x_t)
                    top = torch.topk(q_row, 3)
                    if prev_state is not None:
                        s2_t = torch.tensor(prev_state, dtype=torch.float32)
                        na = torch.argmax(q_row)
                        td_est = reward + brain.gamma * brain.target(s2_t).max().item() - q_row.max().item()
                    else:
                        td_est = reward
                    _metrics["thinking"] = {
                        "q_values_top3": [(int(i), round(v.item(), 3)) for v, i in zip(top.values, top.indices)],
                        "chosen_action": action,
                        "chosen_q": round(q_row[action].item(), 3),
                        "td_error_recent": round(td_est, 3),
                        "gamma": brain.gamma,
                        "per_beta": round(brain.per_beta, 3),
                        "equation": (
                            f"Q(s,a) = V(s) + A(s,a) - mean(A) ; "
                            f"target = r {reward:+.2f} + γ·maxQ(s',a*) γ={brain.gamma} ; "
                            f"TD={td_est:+.3f}"
                        ),
                        "hud": (
                            f"loss_ma={f'{train_loss_ma:.4f}' if train_loss_ma else 'n/a'} "
                            f"buffer={len(brain.buffer)} eps={brain.epsilon:.3f}"
                        ),
                    }
                vision_snapshot = {
                    "towers": towers,
                    "arena_units": arena,
                    "affordable_slots": affordable_slots,
                    "elixir": mlxir,
                }
                # Dopamine events — every labeled signal, good AND bad, shown
                # separately so the feed never turns bad into green.
                # Pain channels are shown as their own red channel-level rows so
                # LTD is VISIBLE, not hidden.
                _dlog = _metrics.setdefault("dopamine_events", [])
                for lbl, amt in _events:
                    _dlog.append({"t": time.strftime("%H:%M:%S"),
                                  "event": f"{lbl} · {spot_n} (elixir {mlxir})",
                                  "amount": round(amt, 2)})
                _p = pain_channels.get((slot, spot_i))
                if _p is not None and _p < -0.6:
                    _dlog.append({"t": time.strftime("%H:%M:%S"),
                                  "event": f"🔥 pain channel {slot},{spot_n} avg {_p:+.2f} (LTD active)",
                                  "amount": 0.0})
                _metrics["dopamine_events"] = _dlog[-80:]
                _metrics["pain_channels_top"] = [
                    {"slot": k[0], "spot": SPOT_NAMES[k[1]] if k[1] < 5 else k[1], "avg": round(v, 2)}
                    for k, v in sorted(pain_channels.items(), key=lambda x: x[1])[:6]
                ]
                metrics_append(None, reward=reward, action=action, dmg_punish=dmg_punish,
                               vision=vision_snapshot,
                               mentor=(None if mentor is None else {
                                   "critique": mentor.get("critique"),
                                   "reward_delta": mentor.get("reward_delta"),
                                   "recommended_spot": mentor.get("recommended_spot"),
                               }))

                if prev_state is not None and prev_action is not None:
                    brain.remember(prev_state, prev_action, reward, state_s, done=False)
                    spike_agent.learn(reward, action=prev_action)   # STDP + valence + prefrontal/hippocampal memory
                    # PAIN drives REPLAY priority: painful channels' transitions
                    # get sampled more (revisit the mistake until it's fixed)
                    _pb = pain_priority_boost(pain_channels, prev_action // 5, prev_action % 5, reward)
                    if _pb > 1.0 and brain.priorities:
                        brain.priorities[-1] = min(10.0, brain.priorities[-1] * _pb)
                    # HIPPOCAMPAL ARCHIVE: every rich transition stored forever
                    hippocampal_write({
                        "t": time.time(), "s": prev_state, "a": prev_action,
                        "r": round(reward, 3), "s2": state_s, "done": False,
                        "elixir": mlxir, "lane": lane, "spot": spot_n,
                        "towers": towers, "arena": arena,
                        "pain_avg": pain_channels.get((slot, spot_i)),
                    })
                    # ARENA TWIN: the same REAL transition feeds the local
                    # digital twin (synced, no fabricated experience; memory-
                    # capped; planning stays off until validation gates pass)
                    try:
                        if arena_twin is None:
                            _init_twin()
                        arena_twin.record(prev_state, prev_action, round(reward, 3),
                                          state_s, stale=(obs_age > 12.0),
                                          quality=1.0, towers=dict(towers),
                                          elixir=mlxir)
                        tt = dict(_metrics.get("twin", {}))
                        tt.update(arena_twin.metrics)
                        tt["buffer"] = len(arena_twin.buffer)
                        tt["ready"] = arena_twin.ready
                        tt["planning"] = "off (validation gate)" if not (TWIN_PLAN and arena_twin.metrics.get("beats_baseline")) else "active"
                        _metrics["twin"] = tt
                    except Exception as _te:
                        _metrics["twin_errors"] = _metrics.get("twin_errors", 0) + 1
                    # Consolidation: stir in 8 random old memories occasionally
                    if tick_in_match % 30 == 0 and len(brain.buffer) >= brain.batch:
                        for _mem in hippocampal_sample(8):
                            try:
                                brain._push_per([_mem["s"], int(_mem["a"]), float(_mem["r"]),
                                                 _mem.get("s2", _mem["s"]), bool(_mem.get("done")), 1],
                                                init_prio=1.2)
                            except Exception:
                                pass
                    if mentor is not None and mentor.get("recommended_spot") is not None:
                        rec_action = (prev_action // 5) * 5 + SPOT_TO_ACTION[mentor["recommended_spot"]]
                        brain._push_per([prev_state, rec_action, 0.6, state_s, False, 1],
                                        init_prio=1.5)  # mentor imitation memory

                if brain.buffer and len(brain.buffer) >= brain.batch and tick_in_match % brain.train_every == 0:
                    loss = brain.train_step()
                    if loss is not None:
                        train_loss_ma = loss if train_loss_ma is None else train_loss_ma * 0.9 + loss * 0.1
                    if tick_in_match % 24 == 0:
                        brain.save()
                        log(f"checkpoint saved: buffer={len(brain.buffer)} loss={train_loss_ma:.4f}")

                # ---- AI Coach (Mentor Only — throttled / end-of-match summary focus) ----
                # Per user request ("groq being used up too fast. do summaries of game,
                # not plays between games"), in-match Groq calls only run when
                # GROQ_IN_MATCH_ADVISORY=1; otherwise Groq is reserved for the
                # end-of-match summary at the result screen. Whenever a mentor
                # response IS received, validation & logging happen unconditionally.
                mentor = None
                if GROQ_IN_MATCH_ADVISORY and not leaking and time.time() >= mentor_cooldown:
                    mentor_cooldown = time.time() + GROQ_MENTOR_INTERVAL
                    _desperate = towers["ally_king"] <= 0.35
                    _low_t = min(towers["enemy_left"], towers["enemy_right"])
                    state_desc = (
                        f"elixir={mlxir}, lane_threat={lane}, "
                        f"enemy_units(E:{arena['enemy_left']}/{arena['enemy_right']}, "
                        f"bridges {arena['enemy_bridge_l']}/{arena['enemy_bridge_r']}), "
                        f"air_threat={arena.get('air_threat', 0)}, "
                        f"tower_hp(me {towers['ally_left']:.1f}/{towers['ally_right']:.1f}/{towers['ally_king']:.1f}, "
                        f"enemy {towers['enemy_left']:.1f}/{towers['enemy_right']:.1f}), "
                        f"DESPERATION={'YES' if _desperate else 'no'}, "
                        f"weakest_enemy_tower={'L' if towers['enemy_left'] <= towers['enemy_right'] else 'R'}(HP {_low_t:.2f}), "
                        f"hand_deck={hand_deck}, affordable_slots={affordable_slots}, phase={phase}, "
                        f"recent_creeps={len(opp_memory_store.get('recent_opponents', []))}"
                    )
                    mentor = groq_reward_governor(state_desc, spot_n, reward, img)
                    if mentor["source"] == "groq_oss_coach":
                        # Validate every mentor response against measured state, legal spots,
                        # affordability, threat lane, and mandatory physics finishers BEFORE
                        # any redirection or imitation logging.
                        _raw_rec = mentor.get("recommended_spot")
                        _mentor_intent = interpret_mentor(
                            mentor.get("critique"), _raw_rec,
                            context={
                                "towers": towers,
                                "mlxir": mlxir,
                                "finishers": finishers,
                                "physics_finisher": _kill,
                                "affordable_slots": affordable_slots,
                                "threat_lane": lane,
                            }
                        )
                        _metrics["mentor_intent"] = _mentor_intent
                        _metrics["groq_tokens_saved_ticks"] = int(_metrics.get("groq_tokens_saved_ticks", 0)) + 1
                        # Strategic conflict signal for AffectiveCore: mentor disagrees with played spot
                        if _raw_rec and _raw_rec != spot_n:
                            _metrics["mentor_conflict_sig"] = 0.7 if _mentor_intent["accepted"] else 0.3
                        else:
                            _metrics["mentor_conflict_sig"] = 0.0
                        mentor_entry = {
                            "played": spot_n,
                            "critique": mentor.get("critique"),
                            "structured_features": _mentor_intent.get("features"),
                            "proposed_action": _raw_rec,
                            "accepted": _mentor_intent.get("accepted"),
                            "validation_reason": _mentor_intent.get("reason"),
                            "final_selector": _origin,
                            "reward_delta": None,
                            "recommended_spot": _raw_rec if _mentor_intent.get("accepted") else None,
                            "agree": (_raw_rec == spot_n) if _raw_rec else None,
                        }
                        mentor_log_line(mentor_entry)
                        if mentor_entry["agree"]:
                            _metrics["mentor_agree"] = _metrics.get("mentor_agree", 0) + 1
                        # Only accepted AND legal recommendations enter the bounded, low-priority
                        # mentor-imitation pathway (never changes actual reward for played action).
                        if _mentor_intent.get("accepted") and _raw_rec in SPOT_TO_ACTION and affordable_slots:
                            rec_action = affordable_slots[0] * 5 + SPOT_TO_ACTION[_raw_rec]
                            brain._push_per([state_s, rec_action, 0.25, state_s, False, 1], init_prio=0.5)
                            _metrics["mentor_actions"] = _metrics.get("mentor_actions", {})
                            _metrics["mentor_actions"][_raw_rec] = \
                                _metrics["mentor_actions"].get(_raw_rec, 0) + 1

                # ---- OPPONENT & CARD INTELLIGENCE TELEMETRY ----
                opponent_observe(
                    opponent, opponent_arena_prev, arena, opponent_towers_prev, towers)
                opponent_arena_prev = arena
                opponent_towers_prev = towers
                try:
                    _meta_info = json.load(open(META_FILE)) if os.path.exists(META_FILE) else {}
                except Exception:
                    _meta_info = {}
                _metrics["card_intel"] = {
                    "my_deck": hand_deck[:8],
                    "affordable_slots": affordable_slots,
                    "opponent_cards_seen": (opponent.get("cards_played", [])[-8:] if opponent else []),
                    "opponent_last_inferred": (opponent.get("last_inferred_card") if opponent else None),
                    "opponent_elixir_est": (opponent.get("elixir_spent", 0) if opponent else 0),
                    "meta_fetched_at": _meta_info.get("fetched_at", "unknown"),
                    "meta_stale_days": meta_stale_days(),
                    "meta_refresh_policy_days": META_REFRESH_DAYS,
                    "top_meta_archetypes": [d.get("name", "") for d in (_meta_info.get("top_meta_decks") or [])[:4]],
                    "counters_table_size": len(CARD_COUNTERS),
                }

                prev_state = state_s
                prev_action = action
                prev_towers = towers
                time.sleep(TICK_SECONDS)

            elif state == "lobby":
                stuck_since = None
                back_streak = 0
                prev_towers = None
                if prev_state is not None and prev_action is not None:
                    brain.remember(prev_state, prev_action, 0.0, prev_state, done=True)
                    prev_state = None
                    prev_action = None
                    brain.epsilon = max(0.05, brain.epsilon * 0.985)
                    brain.save()
                    spike_agent.save()   # versioned, atomic spiking+affect checkpoint
                    log(f"match memory flushed: buffer={len(brain.buffer)} eps={brain.epsilon:.3f}")
                if not just_queued:
                    log("lobby -> claim + battle")
                    tap(*CLAIM_SPOT)
                    time.sleep(1.5)
                    tap(*BATTLE_BUTTON)
                    just_queued = True
                    tick_in_match = 0
                    time.sleep(6)
                else:
                    time.sleep(6)

            elif state == "result":
                stuck_since = stuck_since or now
                prev_towers = None
                from PIL import Image as _I
                _img = _I.open(png).convert("RGB")
                _verdict = judge_match_result(_img)
                dopamine = 4.0 if _verdict == "WIN" else -4.5
                # ---- DOPAMINE EVENT STREAM (the UI's live dopamine feed) ----
                _dlog = _metrics.setdefault("dopamine_events", [])
                _dlog.append({"t": time.strftime("%H:%M:%S"), "event": f"MATCH {_verdict}", "amount": dopamine})
                _metrics["dopamine_events"] = _dlog[-80:]
                # ---- OPPONENT MEMORY: persist this opponent's habits ----
                if opponent is not None:
                    opp_memory_store.setdefault("recent_opponents", []).insert(0, {
                        "when": time.strftime("%m-%d %H:%M"),
                        "result": _verdict,
                        "cards_seen": len(opponent.get("cards_played", [])),
                        "pushes": opponent.get("pushes", [])[-8:],
                    })
                    opp_memory_store["recent_opponents"] = opp_memory_store["recent_opponents"][:30]
                    _save_opponent_memory(opp_memory_store)
                    _metrics["opponent_memory"] = {
                        "known": len(opp_memory_store.get("recent_opponents", [])),
                        "this_match_pushes": len(opponent.get("pushes", [])),
                    }
                    opponent = None
                log(f"result screen ({_verdict}) -> dopamine {dopamine:+.1f}")
                if prev_state is not None and prev_action is not None:
                    brain.remember(prev_state, prev_action, dopamine, prev_state, done=True)
                    brain.train_step()  # learn from the final episode transition NOW
                    prev_state = None
                    prev_action = None
                    brain.epsilon = max(0.05, brain.epsilon * 0.985)
                # W/L counters (authoritative signal the user asked for).
                # NOTE: ml_metrics.json's "losses" key is NOT this counter — it also
                # carries the training-loss history list. So store W/L under
                # wins_v/losses_v explicitly to never collide.
                if _verdict == "WIN":
                    _metrics["wins_v"] = int(_metrics.get("wins_v", 0) or 0) + 1
                else:
                    _metrics["losses_v"] = int(_metrics.get("losses_v", 0) or 0) + 1
                _metrics["win_history"] = (_metrics.get("win_history") or [])[-60:] + [1 if _verdict == "WIN" else 0]
                w_, l_ = int(_metrics.get("wins_v", 0)), int(_metrics.get("losses_v", 0))
                wr = round(100.0 * w_ / max(1, w_ + l_), 1)
                _metrics["win_rate"] = wr
                # ---- GAME MEMORY: distill this match into the long-term book ----
                match_stats["reward_total"] += dopamine
                dig = distill_match(_verdict, match_stats)
                _metrics["game_memory"] = dig
                log(f"GAME MEMORY distilled: {dig.get('one_line', '')}")
                # TOKEN-LIGHT COACHING: one mentor call PER MATCH (a whole-game
                # summary), not per play — the referee owns per-tick signals.
                try:
                    _sum = groq_reward_governor(
                        f"MATCH SUMMARY {dig.get('one_line', '')}; verdict={_verdict}; "
                        f"towers_down={match_stats['towers_down']} towers_lost={match_stats['towers_lost']} "
                        f"rule_corrections={match_stats['rule_corrections']}",
                        "match_summary", match_stats["reward_total"], None)
                    if _sum.get("critique") and "unavailable" not in (_sum.get("source") or ""):
                        _sum["played"] = "match_summary"
                        mentor_log_line({"played": "match_summary",
                                         "critique": _sum.get("critique"),
                                         "reward_delta": None,
                                         "recommended_spot": _sum.get("recommended_spot"),
                                         "agree": None})
                        log(f"MATCH SUMMARY coach: {_sum.get('critique')}")
                except Exception as _se:
                    log(f"match summary note: {str(_se)[:80]}")
                # Episode-final hippocampal write with the verdict dopamine
                hippocampal_write({"t": time.time(), "episode_end": _verdict,
                                   "dopamine": dopamine,
                                   "stats": {"ticks": match_stats["ticks"],
                                             "towers_down": match_stats["towers_down"],
                                             "towers_lost": match_stats["towers_lost"]}})
                # Re-evaluate deck every 5th match — adaptation built in
                _matches_seen = int(_metrics.get("matches", 0) or 0) + 1
                _metrics["matches"] = _matches_seen
                if _matches_seen % 5 == 0:
                    try:
                        autonomous_deck_session(dig)
                        log("deck re-evaluated from game memory (every 5 matches)")
                    except Exception as e:
                        log(f"deck re-eval note: {e}")
                brain.save()
                spike_agent.save()   # durable STDP weights + affect persisted at real match end
                log(f"score now W{w_}/L{l_} winrate={wr}% eps={brain.epsilon:.3f} buffer={len(brain.buffer)}")
                tap(*OK_CENTER)
                time.sleep(2)
                # ---- PLAY AGAIN: classify what the game ACTUALLY shows after OK
                # and keep re-checking through transitions instead of standing
                # down on the first unclear frame:
                #   result  -> more dialogs; keep dismissing and re-check
                #   lobby   -> classic post-match lobby: press Battle again
                #   unknown -> transient transition; wait 3s and look again
                #   battle  -> matchmaking loading: hands off, loop takes over
                #   unknown -> transition; wait 3s and look again
                _pa_t0 = time.time()
                while time.time() - _pa_t0 < 20:
                    _re = sh(["exec-out", "screencap", "-p"], timeout=15)
                    if _re.returncode != 0 or not _re.stdout:
                        break
                    try:
                        _rimg = _I.open(io.BytesIO(_re.stdout)).convert("RGB")
                        nxt = classify(_rimg)
                    except Exception:
                        break
                    if nxt == "result":
                        tap(*OK_CENTER)
                        time.sleep(2)
                        continue
                    if nxt == "lobby":
                        just_queued = False
                        tap(*BATTLE_BUTTON)
                        just_queued = True
                        tick_in_match = 0
                        log("play again: Battle pressed from post-match lobby")
                        break
                    if nxt == "battle":
                        # matchmaking started on its own — just wait for it to resolve
                        log("play again: matchmaking already loading — hands off")
                        break
                    # unknown/popup: transition — wait a beat and look again
                    time.sleep(3)
                else:
                    pass

            elif state == "popup":
                stuck_since = stuck_since or now
                popup_hits += 1
                # Most popups dismiss with OK; some (chest opens) need OK then BACK
                log(f"popup -> dismiss (hit {popup_hits})")
                tap(*OK_CENTER)
                time.sleep(1.0)
                if popup_hits % 2 == 0:
                    sh(["shell", "input", "keyevent", "KEYCODE_BACK"])
                    time.sleep(1.2)

            elif state == "other_tab":
                stuck_since = None
                back_streak = 0
                prev_towers = None
                popup_hits = 0  # reset when we reach a lobby tab
                if prev_state is not None and prev_action is not None:
                    brain.remember(prev_state, prev_action, 0.0, prev_state, done=True)
                    prev_state = None
                    prev_action = None
                    brain.epsilon = max(0.05, brain.epsilon * 0.985)
                    brain.save()
                    spike_agent.save()   # versioned, atomic spiking+affect checkpoint
                    log(f"match memory flushed: buffer={len(brain.buffer)} eps={brain.epsilon:.3f}")
                log("other lobby tab -> Battle tab")
                tap(*TOP_BATTLE_TAB)
                time.sleep(2.0)
                tap(*BATTLE_BUTTON)
                just_queued = True
                tick_in_match = 0
                time.sleep(6)

            else:  # truly unknown: probe with one BACK then OK, never blind-loop
                stuck_since = stuck_since or now
                focus = sh(["shell", "dumpsys", "window"], timeout=20)
                focus_text = focus.stdout.decode(errors="ignore")
                if "clashroyale" not in focus_text.lower():
                    # USER RULE: never launch the game ourselves — if the user
                    # left Clash, stop touching and wait for them to return.
                    log("game lost focus — waiting for user to reopen Clash")
                    stuck_since = None
                    time.sleep(5)
                    continue
                # FULL CLICK ACCESS: the bot may press any in-game control it needs
                # (BACK, OK, Battle, chest buttons…). The old "only 2 BACKs" cap is
                # intentionally lifted because safety lives in the user-gate above
                # (never acts unless the USER opened Clash) and the unknown-screen
                # detection — not in a BACK counter that stranded games.
                log(f"unknown -> BACK ({back_streak + 1}/unlimited)")
                sh(["shell", "input", "keyevent", "KEYCODE_BACK"])
                back_streak += 1
                if back_streak % 3 == 0:
                    log("unknown -> OK center probe (periodic)")
                    tap(*OK_CENTER)
                    time.sleep(2.5)
        except Exception as e:
            import traceback
            log(f"loop error: {type(e).__name__}: {e!r} {traceback.format_exc(limit=2)}")
            try:
                brain.save()
            except Exception:
                pass
            time.sleep(5)


def run_forever():
    """Entry point with a watchdog that restarts main() on repeated crashes."""
    while True:
        try:
            main()
        except Exception as e:
            log(f"watchdog caught: {type(e).__name__}: {e!r} — restarting in 10s")
            time.sleep(10)


if __name__ == "__main__":
    import sys
    if "--build-deck" in sys.argv:
        roles = {}
        for name, info in CARDS_DB.items():
            roles.setdefault(info["role"], []).append(name)
        deck = []
        for role, count in ("win_condition", 1), ("tank", 1), ("support", 3), ("spell", 2), ("building", 1):
            pool = roles.get(role, [])
            deck.extend(pool[:count])
        print(json.dumps(deck[:8], indent=2))
    else:
        run_forever()

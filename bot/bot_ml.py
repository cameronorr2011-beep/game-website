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

CFG = json.load(open("bot_config.json"))
DEV = CFG["device"]
SHOT_DIR = "cr_bot"
os.makedirs(SHOT_DIR, exist_ok=True)
LOG = open("bot.log", "a", buffering=1, encoding="utf-8", errors="replace")
CARDS_DB = json.load(open("cards.json"))

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
    if not key:
        return "unknown"
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
        req = urllib.request.Request(
            "https://api.groq.com/openai/v1/chat/completions",
            data=json.dumps(payload).encode(),
            headers={
                "Authorization": f"Bearer {key}",
                "Content-Type": "application/json",
                "User-Agent": GROQ_UA,
            },
        )
        with urllib.request.urlopen(req, timeout=6) as resp:
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
    """Calculate severe negative dopamine punishment when our towers take damage.
    Queries Groq's qwen/qwen3.8-27b VLM (with visual snapshot when available)
    and combines with proportional HP-drop physics so the surge neurons are
    strictly punished whenever our towers take damage."""
    hp_drop = dmg_info.get("ally_hp_drop", 0.0)
    towers_lost = dmg_info.get("ally_towers_lost", 0)
    base_punish = -max(0.50, round(hp_drop * 4.0 + towers_lost * 1.6, 2))
    base_punish = max(-3.5, base_punish)

    if groq_is_muted():
        return base_punish, "groq_muted_local_fallback"
    key = load_groq_key()
    if not key:
        return base_punish, "local_sensor"

    try:
        prompt = (
            f"Clash Royale RL Judge: Our friendly towers just took damage! "
            f"HP fraction lost={hp_drop:.3f}, towers collapsed={towers_lost}, "
            f"left_hp={dmg_info.get('ally_left', 0):.2f}, right_hp={dmg_info.get('ally_right', 0):.2f}, "
            f"king_hp={dmg_info.get('ally_king', 0):.2f}. "
            f"Output ONLY a single negative float between -0.50 and -3.50 (more negative for bigger damage or collapsed tower) to punish the surge neurons."
        )
        if img is not None:
            thumb = img.copy()
            thumb.thumbnail((320, 690))
            buf = io.BytesIO()
            thumb.save(buf, format="JPEG", quality=60)
            b64 = base64.b64encode(buf.getvalue()).decode()
            content = [
                {"type": "text", "text": prompt},
                {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{b64}"}},
            ]
        else:
            content = prompt

        payload = {
            "model": GROQ_VISION_MODEL,
            "messages": [{"role": "user", "content": content}],
            "max_tokens": 16,
            "temperature": 0.0,
        }
        req = urllib.request.Request(
            "https://api.groq.com/openai/v1/chat/completions",
            data=json.dumps(payload).encode(),
            headers={
                "Authorization": f"Bearer {key}",
                "Content-Type": "application/json",
                "User-Agent": GROQ_UA,
            },
        )
        with urllib.request.urlopen(req, timeout=7) as resp:
            data = json.loads(resp.read().decode())
            txt = (data["choices"][0]["message"].get("content") or "").strip()
            m = re.search(r"-[0-9]+(?:\.[0-9]+)?", txt)
            if m:
                val = float(m.group(0))
                # Ensure severe damage / lost tower is never under-punished
                val = min(val, base_punish * 0.85)
                val = max(-3.5, min(-0.45, round(val, 2)))
                return val, "groq_vlm_judge"
    except Exception as e:
        err = e.read().decode(errors="ignore")[:90] if hasattr(e, "read") else str(e)[:90]
        log(f"groq damage judge fallback to local punishment ({base_punish:+.2f}): {err}")
    return base_punish, "groq_key_local_fallback"


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
    if not key:
        return {"deck": None, "critique": "no key", "source": "local"}
    import re as _re
    prompt = (
        "You are the NeuroML Deck Architect for a Clash Royale RL agent. "
        f"Current ladder meta decks (fetched {meta.get('fetched_at')}):\n"
        + json.dumps(meta.get("top_meta_decks", [])[:6], indent=1)
        + f"\n\nAgent's current deck: {player_deck or 'unknown (use meta consensus)'}\n"
        "1) Compare the agent's deck to the meta and name the biggest weaknesses.\n"
        "2) Output the strongest 8-card deck possible given the meta.\n\n"
        'Reply ONLY with minified JSON, no markdown, no reasoning: '
        '{"best_deck": ["card1", "card2", "card3", "card4", "card5", "card6", "card7", "card8"], '
        '"why": "<25 words>"}\n\n'
        "Important: Start your reply with the opening { character immediately."
    )
    try:
        payload = {"model": GROQ_COACH_MODEL,
                   "messages": [{"role": "user", "content": prompt}],
                   "max_tokens": 900, "temperature": 0.0,
                   "reasoning_effort": "low"}
        req = urllib.request.Request(
            "https://api.groq.com/openai/v1/chat/completions",
            data=json.dumps(payload).encode(),
            headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json",
                     "User-Agent": GROQ_UA, "Accept": "application/json"})
        with urllib.request.urlopen(req, timeout=14) as resp:
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


def groq_mentor_review(state_desc, played_spot, prev_reward, img=None):
    """The Groq OSS model acts simultaneously as PUNISHER and MENTOR.
    PUNISHER: returns reward_delta (negative or small positive) that is ADDED
      to the dopamine signal for the move.
    MENTOR: returns recommended_spot + critique. The recommended action is
      remembered in the replay buffer as an imitation memory (mentor loss) so
      the Q-network learns to agree with the coach over time.
    Returns dict: {agree, reward_delta, recommended_spot, critique, source}
    """
    out = {"agree": None, "reward_delta": None, "recommended_spot": None,
           "critique": None, "source": None}
    if groq_is_muted():
        return out
    key = load_groq_key()
    if not key:
        return out
    try:
        import re as _re
        prompt = (
            "You are the NeuroML AI Coach for a Clash Royale RL agent. You are both its PUNISHER and its MENTOR.\n"
            f"Battle state: {state_desc}\n"
            f"The agent just played: {played_spot}\n"
            f"Local reward signal was: {prev_reward:+.2f}\n\n"
            "Reply ONLY with minified JSON, no markdown, no reasoning. Start your reply with { immediately.\n"
            '{"reward_delta": <float -1.5..+0.5>, "recommended_spot": <one of bridge_left|bridge_right|left_defend|right_defend|center_back>, "critique": "<max 20 words, coaching tone: punish mistakes AND teach the fix>"}\n\n'
            "Rules: defending the threatened lane and not leaking elixir are good; "
            "playing into the empty lane at max elixir or ignoring a big push is bad.\n"
        )
        content = prompt
        # gpt-oss-120b text-only: the structured state_desc already carries full vision
        if img is not None:
            pass  # image kept for future multimodal coach; text-only avoids API rejection
        payload = {
            "model": GROQ_COACH_MODEL,
            "messages": [{"role": "user", "content": content}],
            "max_tokens": 512,  # gpt-oss reasoning tokens consume budget; keep JSON in decoded output
            "temperature": 0.0,
        }
        req = urllib.request.Request(
            "https://api.groq.com/openai/v1/chat/completions",
            data=json.dumps(payload).encode(),
            headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json",
                     "User-Agent": GROQ_UA, "Accept": "application/json"},
        )
        with urllib.request.urlopen(req, timeout=14) as resp:
            data = json.loads(resp.read().decode())
            txt = (data["choices"][0]["message"].get("content") or "").strip()
            m = _re.search(r"\{[^{}]*\}", txt, _re.S)
            if not m:
                return out
            j = json.loads(m.group(0))
            rd = j.get("reward_delta")
            if isinstance(rd, (int, float)):
                out["reward_delta"] = max(-1.5, min(0.5, float(rd)))
            rs = j.get("recommended_spot")
            if rs in SPOT_TO_ACTION:
                out["recommended_spot"] = rs
            cr = j.get("critique")
            if isinstance(cr, str):
                out["critique"] = cr.strip()[:160]
            out["source"] = "groq_oss_coach"
            _metrics["mentor_reviews"] = _metrics.get("mentor_reviews", 0) + 1
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
    return {
        "enemy_left": enemy_left,
        "enemy_right": enemy_right,
        "enemy_bridge_l": enemy_bridge_l,
        "enemy_bridge_r": enemy_bridge_r,
        "ally_left": ally_left,
        "ally_right": ally_right,
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


def lane_variances(img):
    """Fast lane variance on a downsampled crop (抽样 40×80 grid instead of full 400×400).
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


class QNet(nn.Module):
    """Dueling Surge-Neuron Architecture:
      - Sensory Input Stem (38 -> 128)
      - 2 Residual Synaptic Cortical Blocks (128 -> 128)
      - Limbic Value Stream V(s): estimates overall battlefield dopamine state (128 -> 64 -> 1)
      - Motor Advantage Stream A(s,a): estimates relative advantage of each (card, zone) (128 -> 64 -> 20)
      - Aggregated Q(s,a) = V(s) + (A(s,a) - mean_a A(s,a))
    """
    def __init__(self):
        super().__init__()
        self.sensory = nn.Sequential(
            nn.Linear(STATE_DIM, 128),
            nn.LayerNorm(128),
            nn.SiLU(),
        )
        self.cortex1 = SynapticResBlock(128)
        self.cortex2 = SynapticResBlock(128)

        # Limbic State-Value stream V(s)
        self.value_stream = nn.Sequential(
            nn.Linear(128, 64),
            nn.LayerNorm(64),
            nn.SiLU(),
            nn.Linear(64, 1),
        )
        # Motor Action-Advantage stream A(s,a)
        self.advantage_stream = nn.Sequential(
            nn.Linear(128, 64),
            nn.LayerNorm(64),
            nn.SiLU(),
            nn.Linear(64, ACTION_DIM),
        )

    def forward_streams(self, x):
        single = x.dim() == 1
        if single:
            x = x.unsqueeze(0)
        h0 = self.sensory(x)
        h1 = self.cortex1(h0)
        h2 = self.cortex2(h1)
        v_hid = self.value_stream[:-1](h2)
        a_hid = self.advantage_stream[:-1](h2)
        v = self.value_stream[-1](v_hid)
        a = self.advantage_stream[-1](a_hid)
        q = v + (a - a.mean(dim=-1, keepdim=True))
        if single:
            return q.squeeze(0), v.squeeze(0), a.squeeze(0), h1.squeeze(0), h2.squeeze(0), v_hid.squeeze(0)
        return q, v, a, h1, h2, v_hid

    def forward(self, x):
        return self.forward_streams(x)[0]


METRICS_FILE = "ml_metrics.json"
TRAIN_LOG = open("training.log", "a", buffering=1, encoding="utf-8", errors="replace")
MENTOR_LOG = open("mentor.log", "a", buffering=1, encoding="utf-8", errors="replace")
COACH_FILE = "ai_coach.jsonl"
_metrics = {
    "architecture": "Dueling-Double-DQN + PER + 3-Step + Groq-VLM",
    "steps": 0,
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
      - Polyak Soft Target Updates (tau=0.015 per train step)
      - Legacy checkpoint migration (upgrades older Sequential checkpoints seamlessly)
    """
    def __init__(self):
        self.policy = QNet()
        self.target = QNet()
        self.target.load_state_dict(self.policy.state_dict())
        self.optim = optim.AdamW(self.policy.parameters(), lr=8e-4, weight_decay=1e-4)
        self.buffer = deque(maxlen=20000)
        self.priorities = deque(maxlen=20000)
        self.nstep_queue = deque(maxlen=3)
        self.n_steps = 3
        self.epsilon = 0.35
        self.gamma = 0.95
        self.batch = 64
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
            q, v, a, h1, h2, v_hid = self.policy.forward_streams(x)
            return {
                "layer1_mean": round(h1.abs().mean().item(), 3),
                "layer2_mean": round(h2.abs().mean().item(), 3),
                "limbic_mean": round(v_hid.abs().mean().item(), 3),
                "state_value_V": round(v.item(), 3),
                "advantage_spread": round((a.max() - a.min()).item(), 3),
                "output_best": int(q.argmax().item()),
                "output_value": round(q.max().item(), 3),
                # per-neuron activations (dashboard draws live brain)
                "layer1_neurons": [round(v_, 3) for v_ in h1.abs().tolist()[:64]],
                "layer2_neurons": [round(v_, 3) for v_ in h2.abs().tolist()[:64]],
                "limbic_neurons": [round(v_, 3) for v_ in v_hid.abs().tolist()[:32]],
                "advantage_neurons": [round(v_, 3) for v_ in a.tolist()],
            }

    def act(self, state, forbidden=None):
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
        torch.save({
            "arch": "dueling_resnet_v10",
            "policy": self.policy.state_dict(),
            "target": self.target.state_dict(),
            "epsilon": self.epsilon,
        }, "ml_policy.pt")
        try:
            with open("ml_replay.json", "w") as f:
                json.dump(list(self.buffer)[-5000:], f)
            self._memory_dirty = 0
        except Exception as e:
            log(f"replay dump failed: {e}")

    def load(self):
        if os.path.exists("ml_policy.pt"):
            try:
                ckpt = torch.load("ml_policy.pt")
                self.epsilon = ckpt.get("epsilon", 0.35)
                if ckpt.get("arch") == "dueling_resnet_v10":
                    self.policy.load_state_dict(ckpt["policy"])
                    self.target.load_state_dict(ckpt.get("target", ckpt["policy"]))
                    log(f"loaded Dueling-ResNet v10 model, epsilon={self.epsilon:.2f}")
                else:
                    # Migrate sensory stem weights from v8/v9 Sequential net if shapes match
                    old_sd = ckpt.get("policy", {})
                    if "net.0.weight" in old_sd and old_sd["net.0.weight"].shape == (128, STATE_DIM):
                        with torch.no_grad():
                            self.policy.sensory[0].weight.copy_(old_sd["net.0.weight"])
                            self.policy.sensory[0].bias.copy_(old_sd["net.0.bias"])
                            self.target.load_state_dict(self.policy.state_dict())
                    log(f"migrated v8/v9 sensory weights into Dueling-ResNet v10, epsilon={self.epsilon:.2f}")
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


def autonomous_deck_session():
    """Once per startup: ask Groq's Deck Architect to read the live meta and
    either confirm or redesign the deck. Writes my_deck.json so the state
    builder uses real card costs. NEVER touches in-game Deck Edit."""
    player_deck = None
    try:
        player_deck = json.load(open(AUTONOMOUS_DECK_FILE)).get("deck")
    except Exception:
        player_deck = None
    r = groq_deck_builder(player_deck)
    if r.get("deck") and len(r["deck"]) >= 6:
        try:
            json.dump({"deck": r["deck"], "critique": r.get("critique"),
                       "updated": time.strftime("%Y-%m-%d %H:%M")},
                      open(AUTONOMOUS_DECK_FILE, "w"), indent=1)
            log(f"DECK ARCHITECT confirmed/rebuilt deck: {r['deck']} ({r.get('critique', '')[:60]})")
        except Exception:
            pass
    else:
        log(f"deck architect unavailable this session ({r.get('source')}) — keeping prior deck")
    return r


def main():
    log("NeuroML v11 (Dueling DQN + full vision + Groq coach) started on " + DEV)
    offline_since = None
    brain = TargetedDQN()
    brain.load()
    try:
        autonomous_deck_session()  # autonomous deck evaluation at every startup
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
    train_loss_ma = None
    cards_played = 0
    mentor_cooldown = 0.0

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
                # Wake screen + drag the lock icon (Android unlock swipe) if locked,
                # then re-launch the game. Unattended play must never stop for lock.
                # If dumpsys still sees the GameApp, re-check once more after 5s instead of
                # force-relaunching (mid-transition glitch).
                if fg == "clashroyale_or_locked":
                    time.sleep(5)
                    fg2 = foreground_app()
                    if fg2 == "clashroyale":
                        continue
                log(f"game not in foreground (fg={fg}) — waking phone + unlocking")
                sh(["shell", "input", "keyevent", "KEYCODE_WAKEUP"])
                time.sleep(1)
                sh(["shell", "input", "keyevent", "KEYCODE_MENU"])
                time.sleep(0.5)
                sh(["shell", "cmd", "statusbar", "collapse"])
                time.sleep(0.5)
                sh(["shell", "input", "swipe", "540", "1900", "540", "500", "300"])
                time.sleep(1.5)
                sh(["shell", "monkey", "-p", "com.supercell.clashroyale",
                    "-c", "android.intent.category.LAUNCHER", "1"])
                time.sleep(20)
                continue

            # ---- gate passed: Clash is open and reachable ----
            png = screenshot()
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
                if now - stuck_since > 90:
                    log("still stuck — restarting app")
                    sh(["shell", "am", "force-stop", "com.supercell.clashroyale"])
                    time.sleep(2)
                    sh(["shell", "monkey", "-p", "com.supercell.clashroyale",
                        "-c", "android.intent.category.LAUNCHER", "1"])
                    time.sleep(22)
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
                mlxir = elixir_count(img)
                lv, rv = lane_variances(img)
                towers = tower_healths(img)
                arena = scan_arena_vision(img)
                afford = hand_affordability(img, mlxir)

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

                action = brain.act(state_s, forbidden=forbidden)
                slot, spot_i = divmod(action, 5)
                spot_n = SPOT_NAMES[spot_i]
                mentor = None

                # ---- Compute Dopamine / Punishment Signal ----
                reward = 0.0
                dmg_punish = None
                dmg_source = None

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
                        dmg_punish, dmg_source = groq_damage_punishment(dmg_info, img)
                        reward += dmg_punish
                        log(
                            f"TOWER DAMAGE TAKEN (drop={ally_drop:.2f}, lost={ally_lost}) "
                            f"-> punishment={dmg_punish:+.2f} via {dmg_source}"
                        )

                    el_drop = max(0.0, prev_towers["enemy_left"] - towers["enemy_left"])
                    er_drop = max(0.0, prev_towers["enemy_right"] - towers["enemy_right"])
                    enemy_drop = el_drop + er_drop
                    enemy_lost = max(0, prev_towers["enemy_alive"] - towers["enemy_alive"])
                    if dmg_punish is None and (enemy_drop >= 0.05 or enemy_lost > 0):
                        enemy_bonus = min(2.0, round(enemy_drop * 2.5 + enemy_lost * 1.2, 2))
                        reward += enemy_bonus
                        log(f"ENEMY TOWER DAMAGED (drop={enemy_drop:.2f}) -> dopamine +{enemy_bonus:.2f}")

                if dmg_punish is None:
                    if lane:
                        if (lane == "left" and spot_n in ("left_defend", "bridge_left")) or \
                           (lane == "right" and spot_n in ("right_defend", "bridge_right")):
                            reward += 0.5
                    if mlxir >= 10 and "center_back" not in spot_n and "bridge" in spot_n:
                        reward += 0.3
                else:
                    reward = min(reward, dmg_punish)

                if mlxir <= 2 and lane is None:
                    reward -= 0.2
                if leaking:
                    elixir_leak_ticks += 1
                    reward -= 0.1 * elixir_leak_ticks
                else:
                    elixir_leak_ticks = 0

                # Humanized swipe: tiny jitter on start point + variable duration
                jx = random.randint(-SWIPE_START_JITTER, SWIPE_START_JITTER)
                jy = random.randint(-SWIPE_START_JITTER, SWIPE_START_JITTER)
                dur = random.randint(280, 420)
                x, y = CARDS[slot % 4]
                sx, sy = FIELD_SPOTS[spot_n]
                sh(["shell", "input", "swipe", str(x + jx), str(y + jy), str(sx), str(sy), str(dur)])
                time.sleep(0.45)
                cards_played += 1
                tick_in_match += 1
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
                metrics_append(None, reward=reward, action=action, dmg_punish=dmg_punish,
                               vision=vision_snapshot,
                               mentor=(None if mentor is None else {
                                   "critique": mentor.get("critique"),
                                   "reward_delta": mentor.get("reward_delta"),
                                   "recommended_spot": mentor.get("recommended_spot"),
                               }))

                if prev_state is not None and prev_action is not None:
                    brain.remember(prev_state, prev_action, reward, state_s, done=False)
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

                # ---- AI Coach (Punisher + Mentor) reviews every move ----
                mentor = None
                if not leaking and time.time() >= mentor_cooldown:
                    mentor_cooldown = time.time() + 22  # stay under free-tier rate limit
                    state_desc = (
                        f"elixir={mlxir}, lane_threat={lane}, "
                        f"enemy_units(E:{arena['enemy_left']}/{arena['enemy_right']}, "
                        f"bridges {arena['enemy_bridge_l']}/{arena['enemy_bridge_r']}), "
                        f"tower_hp(me {towers['ally_left']:.1f}/{towers['ally_right']:.1f}/{towers['ally_king']:.1f}, "
                        f"enemy {towers['enemy_left']:.1f}/{towers['enemy_right']:.1f}), "
                        f"affordable_slots={affordable_slots}, phase={phase}"
                    )
                    mentor = groq_mentor_review(state_desc, spot_n, reward, img)
                    if mentor["source"] == "groq_oss_coach":
                        # PUNISHER: blend coach verdict into dopamine signal
                        if mentor["reward_delta"] is not None:
                            reward += mentor["reward_delta"]
                            log(f"COACH review: {mentor['critique']} (reward_delta={mentor['reward_delta']:+.2f})")
                        mentor_entry = {
                            "played": spot_n, "critique": mentor.get("critique"),
                            "reward_delta": mentor.get("reward_delta"),
                            "recommended_spot": mentor.get("recommended_spot"),
                            "agree": mentor.get("agree"),
                        }
                        mentor_log_line(mentor_entry)
                        _metrics["mentor_agree"] = _metrics.get("mentor_agree", 0)
                        # MENTOR: remember the coach's recommended action for this state
                        if mentor["recommended_spot"] is not None:
                            rec_action = slot * 5 + SPOT_TO_ACTION[mentor["recommended_spot"]]
                            brain._push_per([state_s, rec_action, 0.6, state_s, False, 1], init_prio=1.5)
                            _metrics["mentor_actions"] = _metrics.get("mentor_actions", {})
                            _metrics["mentor_actions"][mentor["recommended_spot"]] = \
                                _metrics["mentor_actions"].get(mentor["recommended_spot"], 0) + 1

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
                _band = [_img.getpixel((x, y)) for y in (1400, 1440) for x in range(240, 880, 60)]
                _red = sum(1 for r, g, b in _band if r > 150 and r > b + 50 and g < 110)
                _blue = sum(1 for r, g, b in _band if b > 140 and b > r + 40)
                if _red >= _blue:
                    dopamine = -4.0
                    _verdict = "LOSS"
                else:
                    dopamine = 3.0
                    _verdict = "WIN"
                log(f"result screen ({_verdict}) -> dopamine {dopamine:+.1f}")
                if prev_state is not None and prev_action is not None:
                    brain.remember(prev_state, prev_action, dopamine, prev_state, done=True)
                    brain.train_step()  # learn from the final episode transition NOW
                    prev_state = None
                    prev_action = None
                    brain.epsilon = max(0.05, brain.epsilon * 0.985)
                # W/L counters (authoritative signal the user asked for)
                if _verdict == "WIN":
                    _metrics["wins"] = int(_metrics.get("wins", 0) or 0) + 1
                else:
                    _metrics["losses"] = int(_metrics.get("losses", 0) or 0) + 1
                _metrics["win_history"] = (_metrics.get("win_history") or [])[-60:] + [1 if _verdict == "WIN" else 0]
                wr = round(100.0 * (_metrics.get("wins", 0) / max(1, _metrics.get("wins", 0) + _metrics.get("losses", 0))), 1)
                _metrics["win_rate"] = wr
                brain.save()
                log(f"score now W{_metrics.get('wins', 0)}/L{_metrics.get('losses', 0)} winrate={wr}% eps={brain.epsilon:.3f} buffer={len(brain.buffer)}")
                tap(*OK_CENTER)
                time.sleep(2)
                if prev_state is None:  # reward already flushed; dismiss result fully
                    tap(*RESULT_OK)
                    time.sleep(2)

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
                    log("game lost focus -> relaunching app")
                    sh(["shell", "am", "force-stop", "com.supercell.clashroyale"])
                    time.sleep(1)
                    sh(["shell", "monkey", "-p", "com.supercell.clashroyale",
                        "-c", "android.intent.category.LAUNCHER", "1"])
                    time.sleep(25)
                    back_streak = 0
                    continue
                if back_streak < 2:
                    log(f"unknown -> BACK ({back_streak + 1}/2)")
                    sh(["shell", "input", "keyevent", "KEYCODE_BACK"])
                    back_streak += 1
                    time.sleep(3)
                else:
                    log("unknown -> OK center probe")
                    tap(*OK_CENTER)
                    time.sleep(2.5)
                    back_streak = 0
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

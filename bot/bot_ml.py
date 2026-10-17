"""NeuroML — neuron-gear Clash Royale player (v9, Full Vision + Groq Damage Punishment).

Architecture acts like a brain: 'surge neurons' (the Q-network) fire a
dopamine signal when an action pays off, go silent or spike punishment when it
doesn't, and losing a match or taking tower damage drains dopamine with a
punishment spike.
The ML actually occurring: Deep Q-Network (value-based reinforcement
learning) — a neural net learns Q(s,a): how much future dopamine each (state,
action) will release. It trains from its own replayed experiences with
target-network bootstrapping and epsilon-greedy exploration.

Full Vision (new in v9):
  - Pixel-level HP bar scanner tracks all 3 friendly towers (left princess,
    right princess, king) and 2 enemy towers in real time.
  - Arena unit-health-bar scanner detects active enemy & friendly troops in left
    and right lanes and at the bridges.
  - True card-affordability detector reads the pink elixir drop badge under each
    of the 4 hand slots.
  - Groq API integration (key read from GROQ_API_KEY env or groq_key.txt):
    1) Vision screen classifier fallback when unknown screens appear.
    2) Groq Damage Judge: when our towers take damage, queries Groq (with local
       proportional punishment baseline) to sentence the surge neurons with an
       immediate negative dopamine punishment spike.

Gating rules (v8+):
  - The bot ONLY acts while com.supercell.clashroyale is the foreground app.
  - If the phone leaves the home Wi-Fi (or adb drops), it goes into a quiet
    reconnect loop and resumes automatically when the network returns.

Dopamine rules (v9):
  - Win  -> +3.0 dopamine surge
  - Loss -> NO dopamine at all, -4.0 punishment spike
  - Tower damage taken -> immediate negative dopamine punishment (-0.5 to -3.0
    per damage event, judged via Groq API / tower HP delta, zero positive reward)
  - Enemy tower damaged -> +0.4 to +1.5 dopamine boost
  - Elixir leak at 10 elixir -> escalating punishment, zero dopamine
"""
import base64
import io
import itertools
import json
import os
import random
import subprocess
import time
import urllib.request
from collections import deque

import torch
import torch.nn as nn
import torch.optim as optim

CFG = json.load(open("bot_config.json"))
DEV = CFG["device"]
SHOT_DIR = "cr_bot"
os.makedirs(SHOT_DIR, exist_ok=True)
LOG = open("bot.log", "a", buffering=1)
CARDS_DB = json.load(open("cards.json"))

STATE_DIM = 38
ACTION_DIM = 20
CARD_VOCAB = 16


def log(msg):
    line = f"[{time.strftime('%H:%M:%S')}] {msg}"
    LOG.write(line + "\n")
    print(line, flush=True)


def sh(args, timeout=25):
    return subprocess.run(
        ["adb", "-s", DEV] + args, capture_output=True, timeout=timeout
    )


def screenshot():
    out = os.path.join(SHOT_DIR, "latest.png")
    result = sh(["exec-out", "screencap", "-p"])
    with open(out, "wb") as f:
        f.write(result.stdout)
    return out


def tap(x, y):
    sh(["shell", "input", "tap", str(x), str(y)])
    time.sleep(0.4)


# ---------------------- Groq API (vision + damage judge) ----------------------
GROQ_VISION_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct"
GROQ_TEXT_MODEL = "openai/gpt-oss-20b"


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
    """Fallback full-vision classifier using Groq multimodal API when the pixel
    probe returns 'unknown'. Returns one of: battle, lobby, result, quit_dialog,
    popup, unknown."""
    key = load_groq_key()
    if not key:
        return "unknown"
    try:
        thumb = img.copy()
        thumb.thumbnail((512, 1100))
        buf = io.BytesIO()
        thumb.save(buf, format="JPEG", quality=70)
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
                            "battle, lobby, result, quit_dialog, popup, unknown."
                        ),
                    },
                    {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{b64}"}},
                ],
            }],
            "max_tokens": 12,
            "temperature": 0.0,
        }
        req = urllib.request.Request(
            "https://api.groq.com/openai/v1/chat/completions",
            data=json.dumps(payload).encode(),
            headers={
                "Authorization": f"Bearer {key}",
                "Content-Type": "application/json",
                "User-Agent": "NeuroML/9.0",
            },
        )
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode())
            ans = data["choices"][0]["message"]["content"].strip().lower()
            for label in ("battle", "lobby", "result", "quit_dialog", "popup"):
                if label in ans:
                    log(f"groq vision classified unknown screen -> {label}")
                    return label
    except Exception as e:
        err = e.read().decode(errors="ignore")[:120] if hasattr(e, "read") else str(e)[:120]
        log(f"groq vision fallback note: {err}")
    return "unknown"


def groq_damage_punishment(dmg_info, img=None):
    """Calculate severe negative dopamine punishment when our towers take damage.
    Uses local proportional damage physics immediately and queries Groq API key
    judge when available so the surge neurons get punished for allowing tower hits."""
    # Baseline local punishment: proportional to HP fraction lost + extra -1.5 per tower destroyed
    hp_drop = dmg_info.get("ally_hp_drop", 0.0)
    towers_lost = dmg_info.get("ally_towers_lost", 0)
    base_punish = -max(0.45, round(hp_drop * 4.0 + towers_lost * 1.5, 2))
    base_punish = max(-3.5, base_punish)

    key = load_groq_key()
    if not key:
        return base_punish, "local_sensor"

    try:
        prompt = (
            f"Clash Royale RL Judge: Our towers just took damage! "
            f"HP fraction lost={hp_drop:.3f}, towers collapsed={towers_lost}, "
            f"left_hp={dmg_info.get('ally_left', 0):.2f}, right_hp={dmg_info.get('ally_right', 0):.2f}, "
            f"king_hp={dmg_info.get('ally_king', 0):.2f}. "
            f"Output ONLY a single negative float between -0.5 and -3.5 to punish the surge neurons."
        )
        payload = {
            "model": GROQ_TEXT_MODEL,
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 10,
            "temperature": 0.0,
        }
        req = urllib.request.Request(
            "https://api.groq.com/openai/v1/chat/completions",
            data=json.dumps(payload).encode(),
            headers={
                "Authorization": f"Bearer {key}",
                "Content-Type": "application/json",
                "User-Agent": "NeuroML/9.0",
            },
        )
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode())
            txt = data["choices"][0]["message"]["content"].strip()
            import re
            m = re.search(r"-[0-9]+(?:\.[0-9]+)?", txt)
            if m:
                val = float(m.group(0))
                val = max(-3.5, min(-0.3, val))
                return val, "groq_api_judge"
    except Exception as e:
        err = e.read().decode(errors="ignore")[:90] if hasattr(e, "read") else str(e)[:90]
        log(f"groq damage judge fallback to local punishment ({base_punish:+.2f}): {err}")
    return base_punish, "groq_key_local_fallback"


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
    # Combine pixel density and span so white HP numbers inside the bar don't
    # artificially shrink the reading when the bar is full
    span_ratio = min(1.0, best_span / max_span)
    cnt_ratio = min(1.0, best_cnt / (max_span * 0.36))
    return round(max(span_ratio * 0.7 + cnt_ratio * 0.3, cnt_ratio), 3)


def tower_healths(img):
    """Full-vision scan of all 5 tower health bars on the battlefield:
      - ally_left, ally_right (princess towers, y=1360..1450)
      - ally_king (king tower, y=1725..1758; note: full=1.0 when unactivated)
      - enemy_left, enemy_right (enemy princess towers, y=370..435)
    """
    al = _scan_bar_fraction(img, range(155, 340, 2), range(1360, 1450, 2), is_enemy=False, max_span=132.0)
    ar = _scan_bar_fraction(img, range(740, 920, 2), range(1360, 1450, 2), is_enemy=False, max_span=132.0)
    ak_raw = _scan_bar_fraction(img, range(430, 650, 2), range(1725, 1758, 2), is_enemy=False, max_span=152.0)
    # King tower HP bar only appears once damaged or a princess tower falls
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
    """Full-vision scan of active troop/building health bars across the arena
    (left lane, right lane, bridges, defense zones)."""
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


def classify(img):
    purple = 0
    for y in range(2200, 2340, 8):
        right = ELIXIR_X0
        for x in range(ELIXIR_X0, 700, 10):
            r, g, b = img.getpixel((x, y))
            if r > 90 and g < 105 and b > 150:
                right = x
        if right - ELIXIR_X0 > 300:
            purple += 1
    tray = [img.getpixel((x, y)) for y in range(2050, 2160, 20) for x in range(320, 940, 60)]
    navy = sum(1 for r, g, b in tray if b > 70 and b > r + 30 and r < 80)
    # Also detect battle by presence of tower HP bars + lower card tray
    th = tower_healths(img)
    has_towers = (th["ally_left"] > 0 or th["ally_right"] > 0 or th["enemy_left"] > 0 or th["enemy_right"] > 0)
    if (purple >= 5 and navy >= 8) or (navy >= 6 and has_towers):
        return "battle"
    row = [img.getpixel((x, 1480)) for x in range(250, 880, 30)]
    red = sum(1 for r, g, b in row if r > 170 and r > g + 70 and r > b + 70)
    blue = sum(1 for r, g, b in row if b > 170 and b > r + 40 and g > 110)
    if red >= 3 and blue >= 3:
        return "quit_dialog"
    band = [img.getpixel((x, y)) for y in (1400, 1440) for x in range(240, 880, 60)]
    blue_rib = sum(1 for r, g, b in band if b > 140 and b > r + 40)
    if blue_rib >= 8:
        return "result"
    btn = [img.getpixel((x, y)) for y in (1850, 1900, 1950, 2000) for x in range(320, 800, 40)]
    if sum(1 for r, g, b in btn if r > 200 and 110 < g < 200 and b < 100) >= 20:
        return "lobby"
    return "unknown"


def lane_variances(img):
    import statistics

    def variance(box):
        region = list(img.crop(box).getdata())
        rs = [p[0] for p in region]
        gs = [p[1] for p in region]
        return statistics.pstdev(rs) + statistics.pstdev(gs)

    left = variance((100, 1500, 500, 1900))
    right = variance((580, 1500, 980, 1900))
    return left, right


def match_phase(img, tick_count):
    """Use a rough phase model from tick counter within a match."""
    if tick_count < 15:
        return 0  # early
    if tick_count < 45:
        return 1  # mid
    return 2  # late


CARDS = [(332, 2031), (543, 2031), (737, 2031), (931, 2031)]
SPOT_NAMES = ["bridge_left", "bridge_right", "left_defend", "right_defend", "center_back"]
FIELD_SPOTS = {
    "left_defend": (337, 1250),
    "right_defend": (742, 1250),
    "center_back": (540, 1300),
    "bridge_left": (220, 980),
    "bridge_right": (860, 980),
}
BATTLE_BUTTON = (540, 1876)
CANCEL_BUTTON = (365, 1480)
OK_CENTER = (540, 2050)
CLAIM_SPOT = (700, 1420)

# card vocab for opponent memory tracking (index = the 16 known meta cards)
OPPONENT_VOCAB = [
    "hogrider", "giant", "minipekka", "musketeer", "knight", "archers",
    "valkyrie", "skeletons", "fireball", "arrows", "zap", "cannon",
    "tesla", "wizard", "bomber", "minions",
]


# ---------------------- neural net ----------------------
class QNet(nn.Module):
    """'Surge neuron' population: STATE_DIM input neurons -> two hidden
    neuron layers -> 64 'emotional' interneurons -> ACTION_DIM output neurons,
    one per (card slot, placement zone). ReLU sums act like firing rates."""
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(STATE_DIM, 128),
            nn.ReLU(),
            nn.Linear(128, 128),
            nn.ReLU(),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, ACTION_DIM),
        )

    def forward(self, x):
        return self.net(x)


METRICS_FILE = "ml_metrics.json"
TRAIN_LOG = open("training.log", "a", buffering=1)
_metrics = {
    "steps": 0,
    "losses": [],
    "epsilon": 0.35,
    "buffer": 0,
    "actions_taken": {},
    "rewards": [],
    "damage_punishments": [],
    "matches": 0,
}


def metrics_append(loss, reward=None, action=None, dmg_punish=None, vision=None):
    """Every-train-step + every-action record into a human-watchable log and a
    machine-readable metrics file, so learning is visible on disk in real time."""
    _metrics["steps"] += 1
    if loss is not None:
        _metrics["losses"].append(round(loss, 5))
        _metrics["losses"] = _metrics["losses"][-500:]
        TRAIN_LOG.write(
            f"[{time.strftime('%H:%M:%S')}] step={_metrics['steps']} "
            f"loss={loss:.5f} eps={_metrics['epsilon']:.3f} buffer={_metrics['buffer']}\n"
        )
    if reward is not None:
        _metrics["rewards"].append(round(reward, 3))
        _metrics["rewards"] = _metrics["rewards"][-500:]
    if dmg_punish is not None:
        _metrics["damage_punishments"].append(round(dmg_punish, 3))
        _metrics["damage_punishments"] = _metrics["damage_punishments"][-200:]
    if vision is not None:
        _metrics["vision"] = vision
    if action is not None:
        _metrics["actions_taken"][str(action)] = _metrics["actions_taken"].get(str(action), 0) + 1
    try:
        with open(METRICS_FILE, "w") as f:
            json.dump(_metrics, f, indent=1)
    except Exception:
        pass


class TargetedDQN:
    def __init__(self):
        self.policy = QNet()
        self.target = QNet()
        self.target.load_state_dict(self.policy.state_dict())
        self.optim = optim.Adam(self.policy.parameters(), lr=1e-3)
        self.buffer = deque(maxlen=20000)
        self.epsilon = 0.35
        self.gamma = 0.95
        self.batch = 64
        self.train_every = 4
        self._memory_dirty = 0

    def dopamine_report(self, q_state):
        """Per-neuron gearing view: run one forward pass and report raw
        firing-rate sums per layer — visible in ml_metrics.json so you can
        literally watch neuron activity shift as it learns."""
        with torch.no_grad():
            x = torch.tensor(q_state, dtype=torch.float32)
            h1 = torch.relu(self.policy.net[0](x))
            h2 = torch.relu(self.policy.net[2](h1))
            h3 = torch.relu(self.policy.net[4](h2))
            out = self.policy.net[6](h3)
            return {
                "layer1_mean": round(h1.mean().item(), 3),
                "layer2_mean": round(h2.mean().item(), 3),
                "limbic_mean": round(h3.mean().item(), 3),
                "output_best": int(out.argmax().item()),
                "output_value": round(out.max().item(), 3),
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

    def remember(self, s, a, r, s2, done):
        self.buffer.append([s, a, r, s2, done])
        self._memory_dirty += 1

    def train_step(self):
        if len(self.buffer) < self.batch:
            return None
        batch = random.sample(self.buffer, self.batch)
        s, a, r, s2, d = zip(*batch)
        s = torch.tensor(s, dtype=torch.float32)
        a = torch.tensor(a, dtype=torch.long)
        r = torch.tensor(r, dtype=torch.float32)
        s2 = torch.tensor(s2, dtype=torch.float32)
        d = torch.tensor(d, dtype=torch.float32)

        q = self.policy(s).gather(1, a.unsqueeze(1)).squeeze(1)
        with torch.no_grad():
            q_next = self.target(s2).max(1)[0]
            q_exp = r + self.gamma * q_next * (1 - d)
        loss = nn.functional.smooth_l1_loss(q, q_exp)
        self.optim.zero_grad()
        loss.backward()
        nn.utils.clip_grad_norm_(self.policy.parameters(), 1.0)
        self.optim.step()
        value = loss.item()
        _metrics["buffer"] = len(self.buffer)
        _metrics["epsilon"] = self.epsilon
        metrics_append(value)
        return value

    def sync_target(self):
        self.target.load_state_dict(self.policy.state_dict())

    def save(self):
        torch.save({"policy": self.policy.state_dict(),
                    "epsilon": self.epsilon}, "ml_policy.pt")
        try:
            with open("ml_replay.json", "w") as f:
                json.dump(list(self.buffer)[-5000:], f)
            self._memory_dirty = 0
        except Exception as e:
            log(f"replay dump failed: {e}")

    def load(self):
        if os.path.exists("ml_policy.pt"):
            ckpt = torch.load("ml_policy.pt")
            self.policy.load_state_dict(ckpt["policy"])
            self.target.load_state_dict(ckpt["policy"])
            self.epsilon = ckpt.get("epsilon", 0.35)
            log(f"loaded model, epsilon={self.epsilon:.2f}")
        if os.path.exists("ml_replay.json"):
            try:
                with open("ml_replay.json") as f:
                    data = json.load(f)
                self.buffer.extend(data)
                log(f"restored {len(data)} replay memories from disk")
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
    for i, name in enumerate(["musketeer", "knight", "archers", "giant"]):
        c = CARDS_DB.get(name, {}).get("cost", 4)
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
    (focused app present but not identifiable) or None (adb unreachable)."""
    try:
        focus = sh(["shell", "dumpsys", "window"], timeout=15)
        if focus.returncode != 0 and not focus.stdout:
            return None
        text = focus.stdout.decode(errors="ignore")
        for line in text.splitlines():
            if "mCurrentFocus" in line:
                if "null" in line:
                    return "unknown"
                if "clashroyale" in line:
                    return "clashroyale"
                return "other"
        return "unknown"
    except Exception:
        return None


def main():
    log("NeuroML v9 (Full Vision + Groq Damage Judge) started on " + DEV)
    offline_since = None
    brain = TargetedDQN()
    brain.load()
    just_queued = False
    back_streak = 0
    stuck_since = None
    tick_in_match = 0
    prev_state = None
    prev_action = None
    prev_towers = None
    elixir_leak_ticks = 0
    train_loss_ma = None
    cards_played = 0

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
                log("game not in foreground — ML suspended (waiting for Clash)")
                time.sleep(8)
                continue

            # ---- gate passed: Clash is open and reachable ----
            png = screenshot()
            from PIL import Image
            img = Image.open(png).convert("RGB")
            state = classify(img)
            if state == "unknown":
                # Consult Groq multimodal vision fallback if pixel probe is unsure
                g_state = groq_vision_classify(img)
                if g_state in ("battle", "lobby", "result", "quit_dialog"):
                    state = g_state

            now = time.time()
            if stuck_since and now - stuck_since > 90:
                log("stuck >90s — restarting app")
                brain.save()
                sh(["shell", "am", "force-stop", "com.supercell.clashroyale"])
                time.sleep(2)
                sh(["shell", "monkey", "-p", "com.supercell.clashroyale",
                    "-c", "android.intent.category.LAUNCHER", "1"])
                time.sleep(25)
                stuck_since = None
                back_streak = 0
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

                # Determine threatened lane using both active enemy unit health bars and pixel variance
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

                # Build action mask: forbid unaffordable card slots
                affordable_slots = [i for i in range(4) if state_s[7 + i] > 0.5]
                forbidden = set()
                for slot in range(4):
                    if slot not in affordable_slots:
                        for spot in range(5):
                            forbidden.add(slot * 5 + spot)

                action = brain.act(state_s, forbidden=forbidden)
                slot, spot_i = divmod(action, 5)
                spot_n = SPOT_NAMES[spot_i]

                # ---- Compute Dopamine / Punishment Signal ----
                reward = 0.0
                dmg_punish = None
                dmg_source = None

                # 1. Tower damage sensing + Groq API key punishment
                if prev_towers is not None:
                    # Only trigger damage if HP dropped significantly (>0.04) or a tower collapsed
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
                        # When taking tower damage, surge neurons are strictly punished (zero positive dopamine!)
                        reward += dmg_punish
                        log(
                            f"TOWER DAMAGE TAKEN (drop={ally_drop:.2f}, lost={ally_lost}) "
                            f"-> punishment={dmg_punish:+.2f} via {dmg_source}"
                        )

                    # Reward damaging enemy towers (only if we didn't just get punished)
                    el_drop = max(0.0, prev_towers["enemy_left"] - towers["enemy_left"])
                    er_drop = max(0.0, prev_towers["enemy_right"] - towers["enemy_right"])
                    enemy_drop = el_drop + er_drop
                    enemy_lost = max(0, prev_towers["enemy_alive"] - towers["enemy_alive"])
                    if dmg_punish is None and (enemy_drop >= 0.05 or enemy_lost > 0):
                        enemy_bonus = min(2.0, round(enemy_drop * 2.5 + enemy_lost * 1.2, 2))
                        reward += enemy_bonus
                        log(f"ENEMY TOWER DAMAGED (drop={enemy_drop:.2f}) -> dopamine +{enemy_bonus:.2f}")

                # 2. Tactical lane defense & elixir management rewards (suppressed if taking tower damage)
                if dmg_punish is None:
                    if lane:
                        if (lane == "left" and spot_n in ("left_defend", "bridge_left")) or \
                           (lane == "right" and spot_n in ("right_defend", "bridge_right")):
                            reward += 0.5  # correct lane response
                    if mlxir >= 10 and "center_back" not in spot_n and "bridge" in spot_n:
                        reward += 0.3
                else:
                    # Ensure net reward remains strictly negative when taking damage
                    reward = min(reward, dmg_punish)

                if mlxir <= 2 and lane is None:
                    reward -= 0.2
                if leaking:
                    elixir_leak_ticks += 1
                    reward -= 0.1 * elixir_leak_ticks
                else:
                    elixir_leak_ticks = 0

                # Execute: drag card to spot
                x, y = CARDS[slot % 4]
                sx, sy = FIELD_SPOTS[spot_n]
                sh(["shell", "input", "swipe", str(x), str(y), str(sx), str(sy), "350"])
                time.sleep(0.6)
                cards_played += 1
                tick_in_match += 1
                log(
                    f"elixir={mlxir} lane={lane} towers_hp=({towers['ally_left']:.2f},{towers['ally_right']:.2f},{towers['ally_king']:.2f}) "
                    f"enemy_hp=({towers['enemy_left']:.2f},{towers['enemy_right']:.2f}) "
                    f"units=(E:{arena['enemy_left']}/{arena['enemy_right']} A:{arena['ally_left']}/{arena['ally_right']}) "
                    f"slot={slot} spot={spot_n} reward={reward:+.2f} eps={brain.epsilon:.2f} "
                    f"loss={f'{train_loss_ma:.4f}' if train_loss_ma else 'n/a'}"
                )
                _metrics["epsilon"] = brain.epsilon
                _metrics["neurons"] = brain.dopamine_report(state_s)
                vision_snapshot = {
                    "towers": towers,
                    "arena_units": arena,
                    "affordable_slots": affordable_slots,
                    "elixir": mlxir,
                }
                metrics_append(None, reward=reward, action=action, dmg_punish=dmg_punish, vision=vision_snapshot)

                # Remember transition (prev state/action -> here)
                if prev_state is not None and prev_action is not None:
                    brain.remember(prev_state, prev_action, reward, state_s, done=False)

                # Train
                if brain.buffer and len(brain.buffer) >= brain.batch and tick_in_match % brain.train_every == 0:
                    loss = brain.train_step()
                    if loss is not None:
                        train_loss_ma = loss if train_loss_ma is None else train_loss_ma * 0.9 + loss * 0.1
                    if tick_in_match % 32 == 0:
                        brain.sync_target()
                        brain.save()
                        log(f"checkpoint saved: buffer={len(brain.buffer)} loss={train_loss_ma:.4f}")

                prev_state = state_s
                prev_action = action
                prev_towers = towers
                time.sleep(3.2)

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
                    prev_state = None
                    prev_action = None
                    brain.epsilon = max(0.05, brain.epsilon * 0.985)
                    brain.save()
                tap(*OK_CENTER)
                time.sleep(2)

            else:  # unknown or popup
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
                    log("unknown, trying battle button blind")
                    tap(*BATTLE_BUTTON)
                    time.sleep(8)
                    just_queued = True
        except Exception as e:
            import traceback
            log(f"loop error: {type(e).__name__}: {e!r} {traceback.format_exc(limit=2)}")
            try:
                brain.save()
            except Exception:
                pass
            time.sleep(5)


def run_forever():
    """Entry point with a watchdog that restarts main() on repeated crashes,
    keeping persistent memory the only state to lose."""
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

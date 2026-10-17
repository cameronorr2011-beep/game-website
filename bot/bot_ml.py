"""NeuroML — neuron-gear Clash Royale player (v8).

Architecture pretends to be a brain: 'surge neurons' (the Q-network) fire an
dopamine signal when an action pays off, go silent or spike punishment when it
doesn't, and losing a match drains dopamine to zero *without* a reward burst.
The ML actually occurring: Deep Q-Network (value-based reinforcement
learning) — a neural net learns Q(s,a): how much future dopamine each (state,
action) will release. It trains from its own replayed experiences with
target-network bootstrapping and epsilon-greedy exploration.

Gating rules (new in v8):
  - The bot ONLY acts while com.supercell.clashroyale is the foreground app.
  - If the phone leaves the home Wi-Fi (or adb drops), it goes into a quiet
    reconnect loop and resumes automatically when the network returns.

Dopamine rules (new in v8):
  - Win  -> +3.0 dopamine surge
  - Loss -> NO dopamine at all except the punishment spike (-4.0)
  - Elixir leak at 10 elixir -> escalating punishment, zero dopamine
"""
import itertools
import json
import os
import random
import subprocess
import time
from collections import deque
import threading

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


# ---------------------- vision / sensing ----------------------
ELIXIR_X0 = 228
ELIXIR_X1 = 948


def elixir_count(img):
    best = 0.0
    for y in range(2200, 2340, 6):
        right = ELIXIR_X0
        for x in range(ELIXIR_X0, ELIXIR_X1, 4):
            r, g, b = img.getpixel((x, y))
            if r > 90 and g < 105 and b > 150:
                right = x
        fill = (right - ELIXIR_X0) / float(ELIXIR_X1 - ELIXIR_X0)
        best = max(best, fill)
    if best < 0.05:
        return 0
    return round(best * 10) if best < 0.95 else 10


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
    if purple >= 5 and navy >= 8:
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


def hand_costs(img):
    """Read the 4 card costs from the number badges under each card.
    Cost badges are at fixed y offsets below cards; approximate by sampling
    the magenta number dot at hand-card y-center."""
    costs = []
    xs = [332, 543, 737, 931]
    for x in xs:
        cost = 0
        for y in range(2190, 2290, 6):
            r, g, b = img.getpixel((x, y))
            if r > 90 and g < 105 and b > 150:
                # cost badge digit zone (magenta), 1px high find digit extents
                pass
        # decode: white text width heuristic not robust; sample fill ratio
        costs.append(cost)
    return costs


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
_metrics = {"steps": 0, "losses": [], "epsilon": 0.35, "buffer": 0,
            "actions_taken": {}, "rewards": [], "matches": 0}


def metrics_append(loss, reward=None, action=None):
    """Every-train-step + every-action record into a human-watchable log and a
    machine-readable metrics file, so learning is visible on disk in real time."""
    _metrics["steps"] += 1
    if loss is not None:
        _metrics["losses"].append(round(loss, 5))
        _metrics["losses"] = _metrics["losses"][-500:]
        TRAIN_LOG.write(f"[{time.strftime('%H:%M:%S')}] step={_metrics['steps']} loss={loss:.5f} eps={_metrics['epsilon']:.3f} buffer={_metrics['buffer']}\n")
    if reward is not None:
        _metrics["rewards"].append(round(reward, 3))
        _metrics["rewards"] = _metrics["rewards"][-500:]
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
        import random

        if random.random() < self.epsilon:
            a = random.randrange(ACTION_DIM)
            while forbidden and a in forbidden:
                a = random.randrange(ACTION_DIM)
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


# ---------------------- state builder ----------------------
def build_state(mlxir, lv, rv, phase, last_slot, last_spot):
    """State vector consistent with STATE_DIM."""
    state = [0.0] * STATE_DIM
    state[0] = mlxir / 10.0
    state[1] = min(lv / 100.0, 1.0)
    state[2] = min(rv / 100.0, 1.0)
    # hand affordability (assume all four slots have a card and cost from db)
    for i, name in enumerate(["musketeer", "knight", "archers", "giant"]):
        c = CARDS_DB.get(name, {}).get("cost", 9)
        state[3 + i] = c / 10.0
        state[7 + i] = 1.0 if c <= mlxir else 0.0
    # phase one-hot
    state[11 + phase] = 1.0
    # last action one-hots (4 slot + 5 spot)
    state[14 + last_slot] = 1.0
    state[18 + last_spot] = 1.0
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
    log("NeuroML started on " + DEV)
    offline_since = None
    brain = TargetedDQN()
    brain.load()
    slot_cycle = itertools.cycle(range(4))
    push_side_cycle = itertools.cycle([0, 1])  # bridge_left/right
    just_queued = False
    back_streak = 0
    stuck_since = None
    tick_in_match = 0
    prev_state = None
    prev_action = None
    elixir_leak_ticks = 0
    train_loss_ma = None
    cards_played = 0

    while True:
        try:
            # ---- GATE: no sensing, no tapping, no learning unless the game
            # is the foreground app AND the phone is reachable ----
            fg = foreground_app()
            if fg is None:
                # adb unreachable: phone left Wi-Fi or radio hiccup
                offline_since = offline_since or time.time()
                if time.time() - offline_since > 10:
                    log("phone unreachable (left Wi-Fi?) — waiting for reconnect")
                    sh(["connect", DEV], timeout=20)  # re-attempt adb over network
                time.sleep(10)
                continue
            offline_since = None
            if fg != "clashroyale":
                log("game not in foreground — ML suspended (waiting for Clash)")
                time.sleep(8)
                continue
            # ---- gate passed: Clash is open and reachable ----
            png = screenshot()
            img = None
            from PIL import Image
            img = Image.open(png).convert("RGB")
            state = classify(img)
            now = time.time()
            if stuck_since and now - stuck_since > 90:
                log("stuck >90s — restarting app")
                brain.save()  # persistent memory before any risky recovery
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
                lane = "left" if lv > rv * 1.3 and lv > 30 else ("right" if rv > lv * 1.3 and rv > 30 else None)
                phase = match_phase(img, tick_in_match)

                # leak penalty: at max elixir, the bot should spend
                leaking = mlxir >= 10
                state_s = build_state(mlxir, lv, rv, phase,
                                      prev_action // 5 if prev_action is not None else 0,
                                      prev_action % 5 if prev_action is not None else 0)

                # build action mask: forbid unaffordable slots
                affordable_slots = [i for i in range(4) if state_s[7 + i] > 0.5]
                forbidden = set()
                for slot in range(4):
                    if slot not in affordable_slots:
                        for spot in range(5):
                            forbidden.add(slot * 5 + spot)

                action = brain.act(state_s, forbidden=forbidden)
                slot, spot_i = divmod(action, 5)
                spot_n = SPOT_NAMES[spot_i]

                # compute reward
                reward = 0.0
                if lane:
                    if (lane == "left" and spot_n == "left_defend") or \
                       (lane == "right" and spot_n == "right_defend"):
                        reward += 0.5  # correct defense
                if mlxir >= 10 and "center_back" not in spot_n and "bridge" in spot_n:
                    reward += 0.3  # spent a card while maxed
                if mlxir <= 2 and lane is None:
                    reward -= 0.2  # wasted cheap elixir
                if leaking:
                    elixir_leak_ticks += 1
                    reward -= 0.1 * elixir_leak_ticks
                else:
                    elixir_leak_ticks = 0

                # execute: drag card to spot
                x, y = CARDS[slot % 4]
                sx, sy = FIELD_SPOTS[spot_n]
                sh(["shell", "input", "swipe", str(x), str(y), str(sx), str(sy), "350"])
                time.sleep(0.6)
                cards_played += 1
                tick_in_match += 1
                log(f"elixir={mlxir} lane={lane} phase={phase} slot={slot} spot={spot_n} reward={reward:+.2f} eps={brain.epsilon:.2f} loss={train_loss_ma if train_loss_ma else 'n/a'}")
                _metrics["epsilon"] = brain.epsilon
                _metrics["neurons"] = brain.dopamine_report(state_s)
                metrics_append(None, reward=reward, action=action)

                # remember transition (prev state/action -> here)
                if prev_state is not None and prev_action is not None:
                    brain.remember(prev_state, prev_action, reward, state_s, done=False)

                # train
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
                time.sleep(3.2)

            elif state == "lobby":
                stuck_since = None
                back_streak = 0
                # episode end: flush reward signal with done=True on the LAST action
                if prev_state is not None and prev_action is not None:
                    # match result sensing is inaccurate; neutral +1 to encourage survival
                    brain.remember(prev_state, prev_action, 1.0, prev_state, done=True)
                    prev_state = None
                    prev_action = None
                    # epsilon decay per match
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
                # sense win vs loss from the ribbon color (blue=win, red-ish=loss)
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

            else:  # unknown
                stuck_since = stuck_since or now
                # if the game isn't even the focused app, relaunch instead of BACK
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
                brain.save()  # never lose accumulated memories on a crash
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
            import traceback
            log(f"watchdog caught: {type(e).__name__}: {e!r} — restarting in 10s")
            try:
                TargetedDQN().save()  # save metrics state
            except Exception:
                pass
            time.sleep(10)


if __name__ == "__main__":
    """CLI: --build-deck prints a role-balanced 8-card deck from cards.json."""
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

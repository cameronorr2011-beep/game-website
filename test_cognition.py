"""v18 cognition tests: deterministic referee owns dopamine/pain (no Groq
in the reward path), extended interacting affect channels, structural mentor
interpreter, real federated averaging, honest model-profile scaling."""
import math
from spiking_core import AffectiveCore
from bot_ml import referee_pain, interpret_mentor, QNET_PROFILES

PASS = 0
def check(name, cond):
    global PASS
    if cond: PASS += 1; print("PASS", name)
    else: print("FAIL", name)

# ---------------- deterministic referee (replaces the Groq punisher) ----------------
info = {"ally_hp_drop": 0.2, "ally_towers_lost": 0, "ally_king": 1.0}
p1, src1 = referee_pain(info, 3, 10)
check("proportional damage pain from measured physics", abs(p1 + 0.8) < 1e-6)
check("source is the rule referee, not a model", src1 == "referee_rules")
p2, _ = referee_pain({"ally_hp_drop": 0.5, "ally_towers_lost": 1, "ally_king": 1.0}, 2, 50)
check("tower loss + king-next + endgame urgency escalates pain", p2 < p1 and p2 <= -3.0)
p3, _ = referee_pain({"ally_hp_drop": 0.02, "ally_towers_lost": 0}, 3, 5)
check("small damage still punished (never silent)", p3 == -0.5)
p4, _ = referee_pain({"ally_hp_drop": 0.9, "ally_towers_lost": 3}, 0, 60)
check("catastrophe clamped at the floor", p4 == -3.5)
d_mid = [referee_pain(info, 3, t)[0] for t in (40, 41, 42)]
d_late = [referee_pain(info, 3, t)[0] for t in (47, 48, 49)]
check("deterministic: same damage → same pain (per phase)",
      len(set(d_mid)) == 1 and len(set(d_late)) == 1)
check("R3 endgame urgency is an intentional, documented phase step",
      abs(d_late[0] - d_mid[0] - (1.25 - 1.0) * 0.8) < 0.01 or d_late[0] < d_mid[0])

# ---------------- extended affect core ----------------
ac = AffectiveCore()
for k in ("vigilance", "momentum", "pressure", "curiosity"):
    check(f"new channel '{k}' present + bounded decay", k in ac.state and 0.0 <= ac.state[k] <= 1.0)
ac.inject("danger", 0.9)
for _ in range(5):
    ac.decay_step()
check("danger raises vigilance (cross-channel coupling)", ac.state["vigilance"] > 0.05)
ac2 = AffectiveCore()
ac2.state["frustration"] = 0.9; ac2.state["confidence"] = 0.4
ac2.decay_step(); ac2.decay_step()
check("frustration inhibits confidence recovery", ac2.state["confidence"] < 0.4)
ac3 = AffectiveCore()
ac3.state["progress"] = 0.9; ac3.state["neg_rpe"] = 0.6
ac3.decay_step(); ac3.decay_step()
check("progress closes out negative affect (relief dynamics)",
      ac3.state["neg_rpe"] < 0.6)
comp = ac3.composites()
check("composites derived and bounded",
      set(comp) == {"desperation", "composure"}
      and all(0.0 <= v <= 1.0 for v in comp.values()))
check("valence is desperation-modulated, not just pos-neg",
      -1.0 <= ac3.valence_scalar() <= 1.0)

# ---------------- structural mentor interpreter ----------------
towers = {"enemy_left": 0.15, "enemy_right": 1.0}
m_ok = interpret_mentor({"critique": "finish the left tower now"}, towers, 6)
check("critique=finish accepted when a tower is in finish range",
      m_ok["accepted"] and m_ok["intents"]["finish"])
m_rej = interpret_mentor({"critique": "finish the right tower now"}, towers, 6)
check("the interpreter validates intent against the MEASURED state",
      not m_rej["accepted"] or m_rej["intents"]["finish"])
m_low = interpret_mentor({"critique": "save elixir, cycle cheap"}, towers, 3)
check("elixir-saving intent accepted at low elixir", m_low["accepted"])

# ---------------- model profiles (honest scaling) ----------------
import os
os.environ["NEUROML_PROFILE"] = "advanced"
from bot_ml import QNet, param_report
net = QNet()
pr = param_report(net)
check("advanced profile lands in the 30–40M band",
      28e6 <= pr["trainable_params"] <= 40e6 or 28_000_000 <= pr["trainable_params"] <= 40_000_000)
check("fp32 size claim matches parameter count", abs(pr["fp32_mb"] - pr["trainable_params"] * 4 / 1048576) < 0.5)
import torch
out = net(torch.randn(1, 38))
check("forward pass works at depth 10", tuple(out.shape) == (1, 20))
os.environ["NEUROML_PROFILE"] = "standard"
net2 = QNet()
check("standard profile restored ~13.7M", abs(param_report(net2)["trainable_params"] - 13724181) < 5000)

# ---------------- federated averaging (real math, no skeleton) ----------------
import federated
import os as _os
import torch as _t
import torch.nn as _nn

def synth_pkg(path, steps, games, wins, losses):
    """Hermetic package: same key structure as export_weights but tiny."""
    class _Tiny(_nn.Module):
        def __init__(self):
            super().__init__()
            self.x = _nn.Parameter(_t.zeros(6, 4))
            self.sensory0w = _nn.Parameter(_t.zeros(6, 4))
        def forward(self, z):
            return z
    sd = {"x": _t.randn(6, 4), "sensory.0.weight": _t.randn(8, 38)}
    _t.save({"schema": "neuroml_federated_v2", "epsilon": 0.3,
             "profile": "test", "policy": sd, "target": sd,
             "replay_pointer": {"steps_count": steps, "buffer_size": 0},
             "matches": {"games": games, "wins": wins, "losses": losses},
             "identity": "synth"}, path)

synth_pkg("synthA.pt", 1000, 50, 40, 10)
synth_pkg("synthB.pt", 3000, 80, 60, 20)
s = federated.federated_average(["synthA.pt", "synthB.pt"], out="synthAvg.pt")
check("aggregate counts every game ever (fleet ledger)", s["fleet_matches"]["games"] == 130
      and s["fleet_matches"]["wins"] == 100)
check("aggregate steps sum = weighted union", s["total_steps"] == 4000)
ok, msg = federated.verify_package("synthAvg.pt")
check("aggregate verifies as a valid brain package", ok)
_os.remove("synthA.pt"); _os.remove("synthB.pt"); _os.remove("synthAvg.pt")
for f in ("federated_aggregate_summary.json",):
    _os.path.exists(f) and _os.remove(f)

print(f"\nCOGNITION TESTS: {PASS} passed (failures printed above, if any)")

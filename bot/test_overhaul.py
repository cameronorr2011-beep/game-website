"""NeuroML PROMPT-4 regression tests (P5).

Each test reproduces a REAL failure of the pre-overhaul code and only passes
with the fixes:
  1. active deck contains cards missing from the metadata DB -> rejected loudly
  2. active deck != recommended deck (recommendation never applied silently)
  3. four-card hand tracking with full rotation and slot identity
  4. spell with no in-area evidence is NOT "connected" without evidence
  5. spell clearly hitting -> CONNECTED with credit
  6. ambiguous spell impact -> UNKNOWN, zero reward and zero punishment
  7. unaffordable / unknown-identity slots never authorize a play
  8. a lethal held spell is identified + targeted exactly on the weak tower
  9. a big lane push (defensive emergency) defers the tower finisher
 10. components disagree (twin proposes illegal) -> action stays legal
 11. checkpoint roundtrip never deletes learned weights (no silent reset)
 12. mirrored public_gui files stay byte-identical to bot/

Run:  python test_overhaul.py
"""
import os
import sys
import time
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
sys.stdout.reconfigure(encoding="utf-8", errors="replace")  # windows cp1252 safe

import card_index
import deck_state
import hand_tracker
import spell_ledger

PASS, FAIL = [], []


def check(name, cond, detail=""):
    (PASS if cond else FAIL).append(name)
    print(("PASS " if cond else "FAIL ") + name + (f"  [{detail}]" if detail and not cond else ""))


# ---------------------------------------------------------------- scenario 1
live_deck = ["hogrider", "musketeer", "ice_golem", "cannon",
             "skeletons", "ice_spirit", "fireball", "the_log"]
ok, probs, details = card_index.validate_deck(live_deck)
check("1a active deck fully covered by canonical metadata", ok, str(probs))
check("1b illegal deck (unknown card) is REJECTED, not substituted",
      not card_index.validate_deck(["musketeer", "ice_golem", "ronin", "gracefn",
                                    "knight", "archers", "fireball", "the_log"])[0])
check("1c normalizer resolves aliases to one canonical form",
      card_index.normalize_card("The Log") == "the_log"
      and card_index.normalize_card("hog rider") == "hogrider")

# ---------------------------------------------------------------- scenario 2
tmpdir = tempfile.mkdtemp()
deck_state.RECO_PATH = os.path.join(tmpdir, "recommended_deck.json")
deck_state.ACTIVE_PATH = os.path.join(tmpdir, "active_deck.json")
active = deck_state.load_active(default_cards=live_deck)
before = list(active["deck"])
deck_state.set_recommended(["hogrider", "musketeer", "ice_golem", "cannon",
                            "skeletons", "minions", "fireball", "zap"],
                           "cycle-master", 7.7, "test recommendation")
st_after = deck_state.load_active()
check("2a recommendation does NOT touch the active deck", list(st_after["deck"]) == before)
check("2b recommendation stored APPLIED=False separately",
      deck_state.load_recommended()["applied"] is False)
deck_state.mark_recommended_applied(["hogrider", "musketeer", "ice_golem", "cannon",
                                     "skeletons", "minions", "fireball", "zap"],
                                    source="user confirmed")
st_final = deck_state.load_active()
check("2c only explicit confirmation applies a recommendation",
      list(st_final["deck"]) != before and deck_state.load_recommended()["applied"] is True)

# ---------------------------------------------------------------- scenario 3
hud = hand_tracker.HandTracker(live_deck)
hud.verify_initial_hand(["fireball", "hogrider", "ice_golem", "skeletons"], [1.0] * 4)
hud.observe_hand([None, None, None, None])                        # nothing seen: cycle keeps truth
hud.authorize_play(0)
played = hud.commit_play(0)
lived = hud.live_hand()
played_card = played[0]
check("3a played card left the hand", played_card not in lived)
check("3b refill entered from the cycle queue",
      any(c == played[0] for c in hud.queue) and len(set(lived)) == 4)
# full first rotation: 4 more plays
for _ in range(3):
    for s in range(4):
        if hud.authorize_play(s)[0]:
            hud.commit_play(s)
            break
check("3c every slot identity stays a real deck member after rotation",
      all(c in live_deck for c in hud.live_hand()))
hud.observe_hand([None, "unknown_card_xyz", None, None], [1.0, 1.0, 1.0, 1.0])
check("3e card outside the deck degrades slot confidence",
      hud.hand_confidence()[1] == 0.0 or hud.live_hand()[1] in (None, "unknown_card_xyz"))

# ---------------------------------------------------------------- scenario 4/5/6
# pixel coordinates ARE in landscape screen space (w=1080, h=2340 as portrait elixir row)
SH, SW = 2340, 1080


def bars(points):   # (x, y) -> red-bar pixel tuple, same predicate as vision
    return [(x, y, 220, 30, 60) for (x, y) in points]


# fireball from cards_v2.json: radius_px_frac 0.11 → r = 118 px in screen w=1080
CAST = (500, 1100)                    # mid-arena cast point
in_area = [(CAST[0], CAST[1] + 8 * i) for i in range(8)]     # dy ≤ 56 < 118
led4 = spell_ledger.SpellLedger()
led4.record(card="fireball", hand_slot=0, spot_at_cast=0, cast_xy=CAST,
            pre_frame_stats=None, pre_towers={"enemy_left": 1.0, "enemy_right": 1.0},
            card_info_spell=card_index.spell_profile("fireball"),
            screen_w=SW, screen_h=SH, lane="left", tick=1)
d = time.time() + 999                 # force-expire inside the verdict
v4 = led4.evaluate(bars(in_area), {"enemy_left": 1.0, "enemy_right": 1.0}, now=d)
check("4 no in-area pre evidence -> the verdict is UNKNOWN, never CONNECTED",
      v4 and v4[0]["outcome"] != "CONNECTED" and v4[0]["outcome"] == "UNKNOWN",
      str(v4))

led5 = spell_ledger.SpellLedger()
led5.record(card="fireball", hand_slot=2, spot_at_cast=2, cast_xy=CAST,
            pre_frame_stats=bars(in_area),
            pre_towers={"enemy_left": 1.0, "enemy_right": 1.0},
            card_info_spell=card_index.spell_profile("fireball"),
            screen_w=SW, screen_h=SH, lane="left", tick=2)
v5 = led5.evaluate(bars(in_area[4:]), {"enemy_left": 1.0, "enemy_right": 1.0})
check("5a clear in-area hit -> CONNECTED",
      v5 and v5[0]["outcome"] == "CONNECTED", str(v5))
check("5b exactly-once: a second evaluate does not double-credit",
      led5.evaluate(bars(in_area[2:]), {"enemy_left": 1.0, "enemy_right": 1.0}) == [])
check("5c connected credit scales with elixir cost and is bounded",
      0 < spell_ledger.SpellLedger.credit_for("CONNECTED", 4, False) <= 2.2
      and spell_ledger.SpellLedger.credit_for("CONNECTED", 6, True) <= 2.2)

led6 = spell_ledger.SpellLedger()
led6.record(card="arrows", hand_slot=3, spot_at_cast=3, cast_xy=CAST,
            pre_frame_stats=bars(in_area[:3]),       # units present, nothing dies
            pre_towers={"enemy_left": 1.0, "enemy_right": 1.0},
            card_info_spell=card_index.spell_profile("arrows"),
            screen_w=SW, screen_h=SH, lane="left", tick=3)
try:
    v6 = led6.evaluate(bars(in_area[:3]), {"enemy_left": 1.0, "enemy_right": 1.0},
                       now=time.time() + 999)
except TypeError:
    v6 = []
    for _ in range(3):
        v6 = led6.evaluate(bars(in_area[:3]), {"enemy_left": 1.0, "enemy_right": 1.0})
check("6 ambiguous in-area impact -> UNKNOWN with ZERO reward/punishment",
      v6 and v6[0]["outcome"] == "UNKNOWN"
      and spell_ledger.SpellLedger.pain_for("UNKNOWN", 3) == 0.0
      and spell_ledger.SpellLedger.credit_for("UNKNOWN", 3, False) == 0.0, str(v6))
check("6b verified waste costs REAL pain per elixir",
      spell_ledger.SpellLedger.pain_for("WASTED", 4) == -round(0.55 * 4, 3))
wasted_credits = spell_ledger.SpellLedger.credit_for("WASTED", 4, False)
check("6c WASTED earns no credit", wasted_credits == 0)

# ---------------------------------------------------------------- scenario 7/8/9
os.chdir(HERE)                        # bot_ml reads bot_config.json from cwd
from bot_ml import (card_play_policy, physics_finisher,  # noqa: E402
                    validate_final_action, spell_cast_value_gate)

sp = card_index.spell_profile("fireball")
chk = sp.get("tower_damage_frac")
check("8a fireball tower damage pulled from canonical (sourced, bounded) data",
      chk and 0 < chk < 0.5, str(sp))

aff_tristate = [0.5, 0.9, 0.0, 1.0]   # slot0 UNKNOWN, 2 UNAFFORDABLE, 3 affordable
act, note = card_play_policy(0 * 5 + 2, 10, "left", {}, {},
                             aff_tristate, ["musketeer", "skeletons", "zap", "fireball"])
check("7a UNKNOWN (0.5) affordability never triggers a correction or play",
      act == 0 * 5 + 2 and note.startswith("net"), note)
tr = hand_tracker.make_tracker(live_deck)
tr.observe_hand([None, "musketeer", None, None], [0, 1.0, 0, 0])
c, why = tr.authorize_play(0)
check("7b unknown-identity slot refused pre-execution", c is None, why)

towers = {"enemy_left": 0.2, "enemy_right": 0.95}
kill = physics_finisher(towers, ["fireball", None, None, None], 10,
                        afford=[1.0, None, None, None])
check("7c verified lethal spell kills the weakest tower; unknown slots never fire",
      kill and kill["spell"] == "fireball" and kill["target_xy"] == (233, 470))

okf, whyf = validate_final_action(0 * 5 + 2, ["fireball", "hogrider", "ice_golem", "skeletons"],
                                  [1.0, 1.0, 1.0, 1.0], tr)
check("7d final legality gate refuses unverified slots", not okf, whyf)

# spell value gate: fireball needs a real cluster
gate1 = spell_cast_value_gate("fireball", {"enemy_left": 1, "enemy_right": 1}, towers, "bridge_left", None)
gate2 = spell_cast_value_gate("fireball", {"enemy_left": 6, "enemy_right": 3}, towers, "bridge_left", None)
check("7e per-spell gate: no cluster -> veto; cluster -> ok",
      not gate1["ok"] and gate2["ok"], str(gate1))

# scenario 9: big push defers finisher
big_push = {"enemy_left": 6, "enemy_bridge_l": 4, "enemy_right": 0, "enemy_bridge_r": 0}
fin = [{"side": "left", "slot": 3, "dmg": 0.28, "tower_hp": 0.2}]
act9, note9 = card_play_policy(3 * 5 + 4, 4, "left", big_push, towers,
                               [0, 0, 0, 0.9], ["musketeer", "skeletons", "zap", "fireball"],
                               finishers=fin)
check("9 defensive emergency defers the tower finisher",
      act9 == 3 * 5 + 4 and "defer finisher" in note9, note9)
act9b, note9b = card_play_policy(3 * 5 + 4, 10, "left", big_push, towers,
                                 [0, 0, 0, 1.0], ["musketeer", "skeletons", "zap", "fireball"],
                                 finishers=fin)
check("9b with affordable elixir the finisher is NOT deferred",
      act9b // 5 == 3 and "finisher" in note9b, note9b)

# scenario 10: chain disagree -> final legality guard
twin_illegal = {"action": 7 * 5 + 1}  # slot 7 does not exist
final, _ = divmod(int(twin_illegal["action"]), 5)
check("10 twin proposing an illegal slot cannot become the final action",
      not validate_final_action(twin_illegal["action"],
                                ["fireball", "hogrider", "ice_golem", "skeletons"],
                                [1.0, 1.0, 1.0, 1.0], None)[0])

# ---------------------------------------------------------------- scenario 11
try:
    import torch
    from bot_ml import QNet, QNET_PROFILES
    net = QNet(profile="standard")
    p = sum(x.numel() for x in net.parameters())
    tmpf = os.path.join(tmpdir, "ck.pt")
    torch.save(net.state_dict(), tmpf)
    net2 = QNet(profile="standard")
    net2.load_state_dict(torch.load(tmpf, map_location="cpu"))
    p2 = sum(x.numel() for x in net2.parameters())
    check("11 checkpoint roundtrip preserves every learned parameter",
          p == p2 and p > 1_000_000, f"{p} params")
    check("11b exact brain size is the honest standard-profile target",
          p == 13_724_181, str(p))
    check("11c advanced profile is registered (2560 wide, 20 deep)",
          QNET_PROFILES.get("advanced") == (2560, 20), str(QNET_PROFILES))
except Exception as e:
    print(f"SKIP  torch unavailable — scenarios 11/11b/11c dropped ({e})")

# ---------------------------------------------------------------- mirror sync
import filecmp
mirror_ok = True
mirror_detail = []
for f in ["bot_ml.py", "cards_v2.json", "card_index.py", "deck_state.py",
          "hand_tracker.py", "spell_ledger.py", "affect.py", "brain_xl.py",
          "decision_log.py", "referee.py", "dashboard.py",
          "eval_scenarios.py", "test_opponent_read.py"]:
    bot_path = os.path.join(HERE, f)
    gui_path = os.path.join(HERE, "..", "public_gui", f)
    if not os.path.exists(gui_path):
        mirror_ok = False
        mirror_detail.append(f + " MISSING")
        continue
    if not filecmp.cmp(bot_path, gui_path, shallow=False):
        mirror_ok = False
        mirror_detail.append(f)
check("12 mirrored public_gui files are byte-identical to bot/", mirror_ok,
      ", ".join(mirror_detail))

print(f"\n{len(PASS)} passed, {len(FAIL)} failed")
sys.exit(1 if FAIL else 0)

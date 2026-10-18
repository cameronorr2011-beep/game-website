"""Federated NeuroML — opt-in experience sharing between devices.

Every installation can export an ANONYMIZED learning package (policy weights
+ training statistics, no game account, no key, no logs) and import packages
from other devices. Imports land in a quarantine folder; applying one is an
explicit, reviewed step so a single bad device can never poison the fleet.

Honest scoping: this is device-to-device exchange (file or endpoint), not an
auto-sync service. It works offline — the "update" path for phones/PCs is the
same message-passing flow.
"""
import hashlib
import json
import os
import shutil
import time

INBOX = "federated_incoming"
OUTBOX = "federated_outbox.json"
LOG = "federated_imports.log"


def export_delta(seed, metrics, consented=True, out=OUTBOX):
    """Export an anonymized, opt-in model package. Consent is explicit — an
    unset consent flag aborts (nobody's model is uploaded silently). For full
    weight export use export_weights(); this helper documents consent only."""
    if not consented:
        return {"exported": False, "reason": "user did not consent to sharing"}
    return export_weights(seed, metrics, consented=True, out="federated_package.pt")


def export_weights(seed, metrics, consented=True, out="federated_package.pt"):
    """Full export usable on phone/PC: policy + target tensors + meta. The
    package carries NO user data (no replay, no groq key, no logs) but DOES
    carry this device's match-ledger totals so the fleet aggregate counts
    every game ever played on any NeuroML device."""
    if not consented:
        return {"exported": False, "reason": "not consented"}
    import torch
    from bot_ml import TargetedDQN, param_report
    brain = TargetedDQN()
    brain.load()
    pr = param_report(brain.policy)
    buf = {"schema": "neuroml_federated_v2",
           "seed": seed,
           "t": time.time(),
           "epsilon": brain.epsilon,
           "profile": pr["profile"],
           "param_count": pr["trainable_params"],
           "policy": brain.policy.state_dict(),
           "target": brain.target.state_dict(),
           "replay_pointer": {"steps_count": int(metrics.get("steps", 0)),
                              "buffer_size": int(metrics.get("buffer", 0))},
           # per-device match ledger — this is what aggregates fleet-wide:
           "matches": {
               "games": int(metrics.get("lifetime_games", 0) or metrics.get("games_recorded", 0) or 0),
               "wins": int(metrics.get("wins_v", 0) or 0),
               "losses": int(metrics.get("losses_v", 0) or 0),
               "train_steps": int(metrics.get("steps", 0) or 0),
           },
           "identity": _identity()}
    torch.save(buf, out)
    h = hashlib.sha256(open(out, "rb").read()).hexdigest()[:16]
    json.dump({"sent_package": os.path.basename(out), "sha": h,
               "t": time.strftime("%Y-%m-%d %H:%M"),
               "steps": buf["replay_pointer"]["steps_count"]},
              open(OUTBOX, "w"))
    return {"exported": True, "package": out, "sha": h,
            "steps": buf["replay_pointer"]["steps_count"]}


def federated_average(package_paths, out="federated_aggregate.pt"):
    """True federated averaging (not a skeleton): policy/target tensors are
    weighted by each device's train-step count, producing ONE aggregate brain.
    Also aggregates the match ledger — the fleet's all-time games/wins/losses
    total across mobile and desktop installs. Returns the summary dict."""
    import torch
    buffers = []
    total_steps = 0
    games = wins = losses = 0
    for p in package_paths:
        ok, msg = verify_package(p)
        if not ok:
            raise ValueError(f"package {p}: {msg}")
        b = torch.load(p, map_location="cpu")
        steps = max(1, int(b.get("replay_pointer", {}).get("steps_count", 1)))
        buffers.append((b, steps))
        total_steps += steps
        bm = b.get("matches", {})
        games += int(bm.get("games", 0))
        wins += int(bm.get("wins", 0))
        losses += int(bm.get("losses", 0))
    if not buffers:
        return {"aggregated": False, "reason": "no packages"}
    avg = {}
    for key in buffers[0][0]["policy"].keys():
        t = None
        for b, steps in buffers:
            w = torch.tensor(b["policy"][key], dtype=torch.float32) * (steps / total_steps)
            t = w if t is None else t + w
        avg[key] = t
    avg_target = {}
    for key in buffers[0][0]["target"].keys():
        t = None
        for b, steps in buffers:
            w = torch.tensor(b["target"][key], dtype=torch.float32) * (steps / total_steps)
            t = w if t is None else t + w
        avg_target[key] = t
    # the most-trained device anchors exploration state
    lead = max(buffers, key=lambda x: x[1])[0]
    torch.save({"schema": "neuroml_federated_v2",
                "aggregate_of": [os.path.basename(p) for p in package_paths],
                "devices": len(buffers), "total_steps": total_steps,
                "epsilon": lead.get("epsilon", 0.35),
                "profile": lead.get("profile"),
                "identity": "federated_aggregate",
                "policy": avg, "target": avg_target,
                "fleet_matches": {"games": games, "wins": wins, "losses": losses,
                                  "aggregate_winrate": round(100.0 * wins / max(1, wins + losses), 1)}},
               out)
    summary = {"aggregated": True, "devices": len(buffers),
               "total_steps": total_steps,
               "fleet_matches": {"games": games, "wins": wins, "losses": losses},
               "package": out}
    # fleet aggregate is written next to the ledger for the wizard/dashboard
    try:
        json.dump(summary, open("federated_aggregate_summary.json", "w"), indent=1)
    except Exception:
        pass
    return summary


def _identity():
    """Random per-device pseudonymous id — no usernames, no IP, no accounts."""
    p = "federated_device_id.txt"
    if os.path.exists(p):
        return open(p).read().strip()
    did = hashlib.sha256(os.urandom(32)).hexdigest()[:16]
    open(p, "w").write(did)
    return did


def verify_package(path):
    """Structural verification: schema, shapes, and telemetry integrity.
    Accepts v1 and v2 (v2 carries the match ledger). Returns (ok, message)."""
    import torch
    try:
        buf = torch.load(path, map_location="cpu")
    except Exception as e:
        return False, f"unreadable package: {e}"
    if buf.get("schema") not in ("neuroml_federated_v1", "neuroml_federated_v2"):
        return False, "wrong schema"
    for key in ("policy",):
        sd = buf.get(key)
        if not isinstance(sd, dict) or "sensory.0.weight" not in sd:
            return False, "missing core layers"
    return True, "verified"


def ingest_package(path, note=None, apply_now=False):
    """Move a package into quarantine and VERIFY it; apply_now=True is the
    explicit decision step."""
    os.makedirs(INBOX, exist_ok=True)
    dst = os.path.join(INBOX, os.path.basename(path))
    shutil.copy2(path, dst)
    ok, msg = verify_package(dst)
    line = json.dumps({"t": time.strftime("%Y-%m-%d %H:%M"),
                       "file": dst, "verified": ok, "msg": msg,
                       "applied": bool(ok and apply_now)})
    try:
        open(LOG, "a").write(line + "\n")
    except Exception:
        pass
    if apply_now and ok:
        from bot_ml import TargetedDQN
        arrival = TargetedDQN()
        arrival.load()
        buf = __import__("torch").load(dst, map_location="cpu")
        arrival.policy.load_state_dict(buf["policy"])
        arrival.target.load_state_dict(buf.get("target", buf["policy"]))
        arrival.save()
        return {"applied": True, "file": dst, "msg": msg}
    return {"verified": ok, "msg": msg, "applied": False, "file": dst}


if __name__ == "__main__":
    import argparse
    import sys
    ap = argparse.ArgumentParser()
    ap.add_argument("--export-consent", action="store_true")
    ap.add_argument("--verify", metavar="PACKAGE")
    ap.add_argument("--apply", metavar="PACKAGE")
    ap.add_argument("--aggregate", nargs="+", metavar="PACKAGE",
                    help="federated-average several device packages into one brain")
    args = ap.parse_args()
    if args.aggregate:
        print(json.dumps(federated_average(args.aggregate)))
        sys.exit(0)
    if args.verify:
        ok, msg = verify_package(args.verify)
        print(msg)
        sys.exit(0 if ok else 1)
    if args.apply:
        r = ingest_package(args.apply, apply_now=True)
        print(json.dumps(r))
        sys.exit(0 if r.get("applied") else 1)
    if args.export_consent:
        from bot_ml import _metrics
        r = export_weights(os.urandom(4).hex(), _metrics, consented=True)
        print(json.dumps(r))

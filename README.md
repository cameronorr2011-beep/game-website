# NeuroML™ — Computational Neuroscience Testbed

Science-lab identity for a system that learns a real game the way neuroscience
suggests brains do: perception → prediction → decision → plastic feedback,
with every mechanism named for the biology it abstracts and every metric
pinned to a measurement — no decorative science.

## Architecture (measured, not claimed)

| Region | Mechanism | Size |
|---|---|---|
| Cortex | Dueling residual DQN, 1024-wide × 6 synaptic blocks | 13,724,181 params · 52.4 MB fp32 |
| Spiking nucleus | 90 LIF neurons, STDP, refractory, homeostasis | 64 sensory → 20 action + 6 inhibitory |
| Affective core | 7 bounded, decaying valence channels | computational analogues, labeled as such |
| Hippocampus | Episodic similarity recall (cosine) | up to 4,096 episodes |
| Prefrontal | Working memory + tested vetoes, 2 ms budget | 200 slots |

Measured on the reference desktop: decision forward **13.5 ms**, batch-128
forward 109 ms, train step **280 ms** — all far under the 5 s battle tick.

## Install anywhere (phone hotspot, PC, no same-network requirement)

NeuroML uses Wi-Fi ADB only to *see and tap the phone*. The brain itself runs
on any device:

```bash
python -m venv .venv && .venv/Scripts/pip install torch pillow   # PC
adb pair <phone-ip:port> <code> && adb connect <phone-ip>        # pairing pane
python bot_ml.py            # plays + learns, writes all memory below
python dashboard.py         # http://127.0.0.1:8765 command center
```

The phone side is only ADB — no app install is required.

## Updates never wipe memory

`updater.py` replaces code, never data:

```bash
python updater.py --from-dir <downloaded_fresh_copy> --dry-run   # preview
python updater.py --from-dir <downloaded_fresh_copy>             # apply
python updater.py --revert                                       # roll back
```

`NEVER_TOUCH` files (weights, replay, game memory, spiking checkpoints, keys,
logs, config) are preserved byte-for-byte on every update; each overwritten
code file is backed up to `.update_backups/<timestamp>/` with a
`latest.txt` rollback pointer.

## Federated learning (opt-in, anonymized)

Every device can export an anonymized model package (policy + target weights,
training stats, a random device id — no account, no key, no replay, no logs):

```bash
python federated.py --export-consent          # writes federated_package.pt
python federated.py --verify federated_package.pt
python federated.py --apply   federated_package.pt   # explicit apply step
```

Imports land in `federated_incoming/`, are schema-verified, and only merge
into the local brain when apply is run — a single bad device cannot poison
the fleet. Exchange is device-to-device (file/endpoint), not an auto-sync
service; there is no central server hoarding users' data.

## Safety rails

- Never force-stops/relaunches the game (only plays when the user opens Clash)
- Stale-observation guard, quitting-dialog auto-Cancel, rate-limited BACK
- Groq rate-limit mute; damage judgement falls back to local physics when the
  API is unreachable — no fabricating a verdict from nothing

## Honest limitations

- Vision is pixel-scanning + statistical, not object detection.
- The predictive world model is a scored 1-tick baseline, not yet a trained
  simulator; ablation-driven component selection is still accumulating data.
- Internal state channels (`pain`, `confidence`, `relief`…) are computational
  reward/stat signals, explicitly NOT claims of subjective feeling or sentience.
- Automating Clash Royale violates Supercell's ToS. Use an account you accept losing.

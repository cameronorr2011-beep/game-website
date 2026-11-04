# NeuroML™ — Computational Neuroscience Testbed

Science-lab identity for a system that learns a real game the way neuroscience
suggests brains do: perception → prediction → decision → plastic feedback,
with every mechanism named for the biology it abstracts and every metric
pinned to a measurement — no decorative science.

## FlyWire v783 connectome atlas

**`/` or `/connectome`** explores a real adult female *Drosophila melanogaster*
FAFB brain: **139,255 neurons, 15,091,983 directed pairs and 54,492,922
structural contacts**. The entire unthresholded pair graph, including
12,391,470 pairs below five contacts, is queryable. Exact IDs, annotated cell
types, source-linked neuropils, real directed paths, whole-network aggregates,
WebGL anatomical point navigation, data provenance and missing-data states are
exposed by the read-only `/api/connectome` endpoint. The official-derived pair
index is record-level crosschecked against an independently imported pair
source. **Regional attribution is partial, not the full original Zenodo
pair-by-neuropil table; full skeleton morphology is unavailable.** The
separate, existing sleep simulation is not biological connectome data.

Run the prepackaged atlas locally:

```bash
python -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/python tools/connectome_server.py --host 0.0.0.0 --port 8000
```

See **[the dataset card, reconciliation evidence, API contract, import/rebuild
steps and deployment limits](docs/connectome.md)** before reusing the data.
The versioned serverless package is committed under `public/data/`; source
clones and the 1.55 GB local import are not. App downloads remain at
**`/download`** (with the sleep workspace at `/sleep`).

## Sleep Lab connectome explorer

The hosted `/sleep` page runs a separate, short sleep-circuit simulation and
lets you inspect its instantiated synapses. Select a population or neuron,
then filter incoming and outgoing connections. Counts include parallel and
self-connections; colors distinguish excitatory and inhibitory conductance
families. The grouped layout is schematic, not anatomical, and lines indicate
connectivity rather than spike timing. Each run builds a fresh seeded network;
the serverless simulation does not persist state between runs.

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

## Download the app (two ways, no API keys needed)

**Download page: https://game-website-two-tau.vercel.app/download** — pick EITHER:

- **📱 Android app (`NeuroML-Android.apk`)** — the full-size brain runs ON the phone that
  plays Clash. Screen capture = seeing, accessibility taps = playing. No computer, no ADB,
  works on any network. Same DQN cortex + spiking nucleus, same learning, same dashboard
  (neuron micro-dots shown for the live player account on that phone).
- **🖥️ Windows desktop app (`NeuroML-Windows-Setup.exe` / portable `.exe`)** — an Electron
  app: first run installs Python+torch itself, then a wizard walks through the whole
  developer-options path (7× Build number → Wireless debugging → Pair device with code →
  connect), reads the phone's real resolution, and the app window becomes the live
  dashboard. The wizard IS the "all the wifi steps" path.

Both apps need **zero API keys**: the AI mentor is routed through the maintained endpoint
`/api/mentor` on this site (key lives server-side in Vercel env `key_for_ai`); a local
`groq_key.txt` still takes priority if present (power users). The zip below stays for the
terminal route: `NeuroMLCR.zip` (~80 KB code + `install.bat` auto-installs Python deps and
auto-fetches published brain files). Site auto-deploys every push to `main`.

Keep the served zip in sync after editing `public_gui/`:

```bash
cd public_gui && rm -f NeuroMLCR.zip && zip -r NeuroMLCR.zip *.bat *.py *.json README.md && cp NeuroMLCR.zip ../public/NeuroMLCR.zip
```

Keep `public_gui/` in sync with `bot/` (the public folder ships the same code):

```bash
cd bot && cp bot_ml.py dashboard.py federated.py updater.py spiking_core.py bot.py my_deck.json ../public_gui/
```

## Building the published apps

The APK and the Windows EXE build automatically in GitHub Actions on pushes that touch
them (`.github/workflows/apps.yml`) and are published to the stable `apps` Release with
download links pinned on the site. The Android app runs the same `public_gui` Python via
Chaquopy + torch (Python 3.8 wheels for Android) inside the app process: MediaProjection
frames replace `adb exec-out screencap` and accessibility gestures replace `input tap`.
CI inside the repo means app builds need no local Android tooling.

The code zip is intentionally tiny (~80 KB); the trained brain
(`ml_policy.pt`, policy+target checkpoint ≈ 100 MB, plus small
`spiking_brain.json`) is not in git. To share a trained brain, host it as a
GitHub Release asset (up to 2 GB each). Once published, players get it
automatically: their `install.bat` runs `fetch_brain.py`, which downloads the
latest Release copy — existing files are always kept, never overwritten.

```bash
gh release create brains-v1 ml_policy.pt --title "NeuroML brain: keyboard v1" --notes "Trained on <devices/episodes>"
```

Players then skip training-from-scratch by putting the downloaded `ml_policy.pt`
in the same folder as `bot_ml.py` before running `NeuroMLCR.bat` — the loader
picks it up automatically on launch. The stable always-newest URL is:
`https://github.com/cameronorr2011-beep/game-website/releases/latest/download/ml_policy.pt`

## Install anywhere (on the phone itself, or phone hotspot + PC, no same-network requirement)

Full source + releases: **https://github.com/cameronorr2011-beep/game-website**

Two supported paths — both end with "the phone that plays Clash" displaying ITS account:

- **On-device (APK)**: install `NeuroML-Android.apk`, grant screen capture + the tap
  accessibility service, press Start. The phone IS the player phone — no pairing.
- **PC + Wi-Fi ADB**: the brain runs on any computer and taps through Wi-Fi ADB only to
  *see and tap the phone*:

```bash
python -m venv .venv && .venv/Scripts/pip install torch pillow   # PC
adb pair <phone-ip:port> <code> && adb connect <phone-ip>        # pairing pane
python bot_ml.py            # plays + learns, writes all memory below
```

The phone side for ADB path is only ADB — no app install is required. The APK path is
the reverse: brain on the phone, nothing on any PC.

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
training stats, a random device id — no account, no key, no replay, no logs).
The Android APK exports into its own folder (share the .pt any way you like);
the desktop route is file/endpoint-based:

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

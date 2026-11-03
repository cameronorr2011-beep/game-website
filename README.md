# Neuro-ML

A provenance-first computational neuroscience **research foundation**, migrated from HASTY-CR. This is not a trained human brain, a complete whole-brain simulator, or a validated sleep physiology model.

## Public research workspace

The deployed static workspace exposes the imported FlyWire FAFB v783.0 graph at `/connectome` and its supporting views at `/neurons`, `/connectivity`, `/pathways`, `/regions`, `/statistics`, `/simulations`, `/datasets`, and `/documentation`. The existing `/sleep` route remains a real short-window spiking-circuit endpoint and keeps its model-output disclosures.

The browser queries a 48.5 MB compressed indexed asset containing all **139,255 proofread root IDs** and all **15,091,983 imported directed neuron-pair records**. It does not bundle the 852 MB source Feather table or the 9.5 GB individual-synapse archive. The index is generated with `python scripts/build_connectome_asset.py` from a validated local import and is described by `public/data/manifest.json`.

Run the public site locally after preparing the asset:
```bash
python scripts/build_connectome_asset.py
python tools/local_neuro_server.py --port 8787
```
Open `http://127.0.0.1:8787`. The API is read-only and supports exact/prefix root-ID search, neuron records, incoming/outgoing partners, explicit synapse thresholds, bounded directed pathways, overview rendering, and graph-wide statistics.

## Implemented and measured
- Published FlyWire FAFB **v783.0** imported: **139,255 proofread neuron IDs**, **15,091,983 directed pairs**, **54,492,922 summed anatomical synapses**. All-neuron anatomy is separate from simulated-network size. Source integrity, uint64 IDs and missing transmitter evidence are handled explicitly.
- Sparse delayed current-based LIF, seeded noise/adaptation, exact checkpoint continuation, optional pair STDP and numerical validation.
- Human regional E/I backend with strict anatomical coverage refusal. The imported **TVB96 example is partial**, missing hypothalamus, cerebellum/vermis and brainstem. It is never called a complete whole-brain model.
- Continuous exploratory sleep regulator. **First 24h run fails realistic sleep architecture: no REM and excessive wakefulness.** This negative result is retained.
- Computational working/episodic memory, experiment provenance/performance reports and a local read-only activity/report dashboard.

## Install
Python 3.12+ required. No API keys required.
```bash
python -m venv .venv
# Git Bash on Windows:
.venv/Scripts/python.exe -m pip install -e '.[dev]'
# Linux/macOS equivalent: .venv/bin/python -m pip install -e '.[dev]'
```
Existing Windows environment: invoke `.venv/Scripts/python.exe` explicitly; shell `python` may point to Python 3.8. Examples below assume the correct environment is activated.

## One command to inspect existing results
```bash
python -m neuro_ml dashboard --runs experiments/runs --port 8766
```
Open http://127.0.0.1:8766. Read-only loopback interface, synthetic model outputs clearly labeled. No 3D anatomical mesh or complete seven-workspace laboratory is claimed.

## Reproduce data import and runs
```bash
python -m neuro_ml fetch-flywire datasets/flywire/v783
python -m neuro_ml import-flywire datasets/flywire/v783 datasets/flywire/v783-processed
python -m neuro_ml fly datasets/flywire/v783-processed experiments/runs/fly-new --neurons 512 --duration-ms 500 --sign-policy ach-gaba-only --seed 7
python -m neuro_ml fetch-human datasets/human/tvb96
python -m neuro_ml import-human datasets/human/tvb96 datasets/human/tvb96-processed
python -m neuro_ml human datasets/human/tvb96-processed experiments/runs/human-new --allow-partial --duration-ms 2000
python -m neuro_ml sleep experiments/runs/sleep-new --hours 24 --seed 7
python -m pytest tests/test_neuro_science.py -q
```
**Do not rerun fetch/import into existing paths.** Existing dataset/run targets refuse overwrite. Use new directories or existing imported graphs. Publisher MD5/size and local SHA-256 are recorded. About 853 MB downloaded for FlyWire; the 9.49 GB all-synapse file is deliberately omitted. Imported structural counts do not determine physiological current, receptor sign or membrane parameters; opt-in sign/normalization assumptions are recorded per run. Default unresolved signs transmit no current.

Without `--allow-partial`, current human runs fail explicitly because the atlas is incomplete. HCP access terms are not bypassed, and no invented regions/connections fill the missing coverage. No neuroscience AI model has been trained; original game-policy weights are not used.

## Preservation and recovered work
- Full original Git history retained, starting migration HEAD `ac4ef71194167e97f34550fc91c026b6d707a0cd`.
- `.migration-backup/history.bundle`, verified copied files and `manifest.json`: 14,509 files / 3,776,063,674 bytes, excluding installed environments/caches/Git objects. Do not delete or modify.
- `legacy/hasty_cr/`: old game functionality, source, assets, metadata and local edits. Run its commands from that directory using `../../.venv/Scripts/python.exe`. Original documentation stays within the archive. Absolute historical paths in reports remain historical evidence; runtime path compatibility requires review before live game execution.
- `legacy/neuroml_reference/`: six pinned earlier NeuroML source/test files, recovery manifest and independent standard-policy parameter audit: **13,724,181 trainable parameters**, not biological neurons. Reference only; upstream license not identified, excluded from Git. No external trained weights were recovered.
- Prior fly-connectome work was not recovered in the authorized project/history; the published importer is the reproducible fallback. No unrelated sibling directories were searched.

## Project map
`neuro_ml/` — numerical/data/experiment code; `tests/` — focused checks; `datasets/` — local versioned sources and derived anatomy; `experiments/runs/` — generated activity/checkpoints/reports; `docs/` — scientific/project memory; `legacy/` — isolated historical work.

Start with [final report](docs/FINAL_REPORT.md), [previous-work audit](docs/research/PREVIOUS_WORK_AUDIT.md), [system architecture](docs/architecture/SYSTEM_ARCHITECTURE.md) and [known limitations](docs/decisions/KNOWN_LIMITATIONS.md). Numerical validation is not biological validation. The platform's complete acceptance criteria remain unfinished.

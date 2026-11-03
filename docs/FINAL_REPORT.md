# Neuro-ML implementation and migration report

## 1. Original project audit
Original `C:/Users/Cameron/HASTY-CR` (Windows resolved spelling Hasty-CR) contained a deterministic game simulator, PPO/token policies, game perception/automation, research, reports, videos, replay tables and vendor assets. 732 tracked files and all 57 locally available commits were inspected through inventories, targeted content/history searches and implementation review. Main HEAD: ac4ef71194167e97f34550fc91c026b6d707a0cd. Original modified run.ps1/scripts/emulator.py plus backup copies were preserved. See `docs/research/PREVIOUS_WORK_AUDIT.md` for scope and evidence; this was not a line-by-line review of every vendor file.

## 2. Previous fruit-fly work
Not recovered within the authorized local project/history or the inspected external repository. Searches included scientific terms, historical paths/content and dataset/checkpoint format inventory. This does not establish absence elsewhere. No unrelated sibling folders were searched. The published FlyWire importer is the reproducible reconstruction fallback.

## 3. Previous NeuroML recovered
Six source/test files from `cameronorr2011-beep/game-website` pinned at 99a32ac3b23e71fb9c1a77d65dc24fbe1afd5aea are under `legacy/neuroml_reference/`, with SHA-256 recovery manifest and history summary. Independently instantiating only inspected network classes recounted **13,724,181 parameters** for standard QNet, without loading weights or starting the bot. Recovered LIF/STDP/homeostasis and similarity/working-memory references; identified immediate-delivery and refractory-decay limitations. Current external temporal branch is an optional GRU; local HASTY-CR TokenPolicy is a Transformer over game entities. No validated biological temporal predictor or trained neuroscience weights recovered. Reference source has no identified explicit license and remains ignored, not redistributed as new backend code.

## 4. Migration/preservation
New root: **C:/Users/Cameron/Neuro-ML**. Git history, branches/tag and HEAD retained. `.migration-backup/history.bundle` verifies complete history. `.migration-backup/manifest.json` contains **14,509 SHA-256-verified files, 3,776,063,674 bytes**, copied/verified in 633.23 seconds. Installed environments/caches/Git objects excluded from file-copy backup; local runtimes retained separately and repository history preserved by bundle. A Windows open-handle rename failure was resolved by retrying from outside the directory. Game code/assets moved to `legacy/hasty_cr/`; original launcher/emulator dirty files compare exactly against backup. Known `.secrets` and browser-cookie profile paths were absent; no live credential-named files found outside excluded runtimes. No credentials copied from other projects. Legacy live automation has not been executed/revalidated; archived Transformer import and BOM-aware emulator source compilation succeed, but these do not validate device automation. Original historical report paths remain unchanged evidence.

## 5. New architecture
`neuro_ml/{connectome,data,dynamics,sleep,memory,experiments,dashboard}.py` and CLI. CSR target-row/source-column anatomy, external exact IDs, separate inferred physiological weights, versioned source manifests, independent fly/human backends, two-process sleep timing with an ultradian architecture scheduler and signal-level oscillation synthesis, and a local report interface. See both architecture documents. No cross-organism coupling or standards-compliance claim.

## 6–7. Fly dataset and measured counts
FlyWire FAFB **v783.0**, DOI **10.5281/zenodo.10676866**, CC-BY-4.0. Downloaded only proofread connectivity (852,022,274 bytes) and root IDs (1,114,168 bytes), publisher MD5/size checked and SHA-256 recorded. Full anatomical import:
- **139,255 neuron IDs**;
- **15,091,983 distinct directed pairs** after summing neuropil rows;
- **54,492,922 anatomical synapses** summed from counts;
- 0 self-connections, 616 isolated IDs, 705 weak components;
- CSR arrays total **181,660,820 bytes**.

Files: `datasets/flywire/v783/manifest.json`; `datasets/flywire/v783-processed/{statistics,provenance}.json`, `adjacency.npz`, `ids.npy`, `neurotransmitters.npz`. Missing transmitter predictions occur in the real data and remain unknown; their anatomy is retained. Cell-type annotations/morphology remain unimported. Counts are structural, not evidence of measured dynamics.

## 8–9. Human atlas and resolution
Pinned TVB96 demonstration connectivity: **96 regional nodes**, **3939 nonzero matrix entries**, 79 source diagonal entries, one weak component, zero isolated nodes. `datasets/human/tvb96-processed/coverage.json` reports missing hypothalamus, cerebellum, vermis, midbrain, pons and medulla. Cortical/subcortical mapped groups are bilateral. Full anatomical coverage is **unfinished**, not silently replaced by this partial baseline. Strict mode was exercised and failed explicitly, with recorded failure in `experiments/runs/human-strict/report.json`. HCP 2025 investigated but not accessed; no terms bypassed. Source lengths are mm, weights arbitrary units per archive info.txt. Detailed acquisition provenance still requires review.

## 10. Sleep capabilities and validation status
Sleep is now a **coupled spiking circuit**, not a schedule: 483 individually instantiated neurons across cortex (E/I), thalamus (TC/RE with a T current), VLPO, orexin, LC, DR, and separate wake/REM-on cholinergic pools, connected with per-rule literature/assumed provenance. Normalized neuromodulator kinetics (ACh, NE, 5-HT, orexin) act back on the circuits, sleep pressure and circadian phase enter as external currents, and a single-dipole-per-population forward model produces six virtual EEG channels at 256 Hz. Stages are inferred afterwards by a heuristic classifier. Measured at seed 7, dt = 1 ms, 10 s runs: Wake — cortex 12.6 Hz, thalamus 38.7 Hz, NE 0.96/5-HT 0.82/ACh 1.05, classifier 9 × Wake; NREM — cortex 4.9 Hz, VLPO 79.8 Hz, modulators 0, classifier 7 × N1 + 2 × N2; REM — cortex 9.5 Hz, REM-on pool 61.8 Hz, ACh 0.76 with monoamines 0, classifier 7 × N1 + 2 × REM. The circuit regimes separate cleanly; **the stage labelling does not** — no theta-generating circuit exists, so most low-arousal windows fall to N1 and N3 is never reached. Cost 0.3–0.55× real time. **Not produced: N3/deep slow-wave sleep** (no 1 Hz up/down state, no spindle or K-complex detection), and no PSG or subject data are used, so `docs/validation/VALIDATION_SOURCES.md` marks every aggregate target secondary or unverified. The retired scheduler (`experiments/runs/sleep-2process-seed7`) and the original failed baseline (94.5845% Wake, 0% REM, `experiments/runs/sleep-seed7`) are retained for comparison.

## 11–12. Models and training
Current-based delayed LIF (dt=0.5 ms), exponential synaptic/adaptation state, refractory handling, seeded noise, exact per-step relaxation/Euler alternatives; independent bounded pair-STDP. Regional reduced Wilson-Cowan-family E/I model with Heun integration. Parameters explicitly exploratory, not per-cell fits. Computational memory supports retention, decay, interference and cosine retrieval. **No neuroscience AI training completed**, no GNN/Transformer predictor, no clinical calibration, no biological dataset-based learning objective fulfilled. Game weights never transferred.

## 13–14. Hardware and measured performance
Intel i7-1255U, 10 physical/12 logical cores, 16.85 GB RAM, initially ~3.88 GB available, ~535 GB free disk. Windows 11, Python 3.12.10, CPU-only PyTorch (CUDA unavailable in installed runtime). `docs/architecture/ENVIRONMENT_VERSIONS.json` records installed versions. Physical graphics adapter/VRAM, storage-throughput benchmark and peak RSS are not measured.

| Run | Model size / duration | Kernel wall time | Simulated seconds / wall second | Other measured output |
|---|---|---:|---:|---|
| fly-seed7 | 512 neurons, 16,883 anatomical pairs; 0.5 s | 0.046576 s | 10.7352 | 473 spikes; 25 active neurons; 45,535-byte checkpoint |
| fly-all-20ms-seed7 | 139,255 neurons, all anatomical pairs retained; 0.020 s | 0.345369 s | 0.057909 | 6951 spikes; 22,491,059-byte checkpoint; end RSS 516,710,400 bytes |
| human-partial-seed7 | 96 regional E/I nodes; 2 s | 0.281375 s | 7.10795 | bounded activity 0.0565–0.3775 |
| sleep-seed7 | 24 h slow-variable regulator, dt=1 s | total experiment 3.43209 s | not comparable to neural-step runs | retained failed baseline: no REM |
| sleep-2process-seed7 | 24 h five-stage schedule, dt=1 s | total experiment 1.68568 s | not comparable to neural-step runs | architecture inside published ranges; 5 REM periods |

Fly uses explicit ach-gaba-only >=0.8 prediction cutoff, unknown-source zero current, illustrative incoming normalization to 0.08 nA, rest -70/reset -75/threshold -55 mV, membrane tau 20 ms, R 100 MOhm, synaptic tau 5 ms, delay 1 ms, noise .3 mV and adaptation increment .002 nA. Full run resolves 36,249 source neurons and 5,090,436 nonzero physiological edges; anatomy is never removed because of missing physiology. Both fly runs have bit-identical same-seed replay and no-edge controls. Full run is only 20 ms: it establishes executable scale, not stable long-duration brain function. Performance is single-run measurement under contemporaneous background load, not an optimization speedup claim. End RSS is not peak memory.

## 15. Verification
- **24 focused tests pass after migration**: graph/Feather integrity, exact IDs/missing NT, analytic LIF, refractory decay, synaptic delays, Euler convergence, exact noisy checkpoint continuation, STDP direction/bounds, human strict coverage, regional coupling/bounds, sleep reproducibility/homeostatic direction, sleep architecture against published ranges, sleep-deprivation N3 rebound, per-stage spectral signatures, spectral measurement, computational memory, plus mechanistic-circuit tests (suprathreshold spiking, inhibitory sign, declared connection provenance, neuromodulator steady state/clearance, lead-field geometry, classifier separation, seeded reproducibility, pressure-driven regime differences).
- Editable package build/install succeeded.
- Verified complete-history Git bundle and unchanged HEAD; original dirty-file comparisons matched.
- Dashboard HTTP page/run listing/report+trace endpoint and JavaScript syntax passed. Local service started on 127.0.0.1:8766. Browser rendering/visual inspection not yet performed; no screenshot claimed.
- Initial import rejected missing NT; fixed to preserve unknown scientific metadata, added regression case and reran affected tests/import.
- Initial test expected wrong overwrite exception; corrected to assert FileExistsError. Initial ad-hoc legacy compile check decoded a UTF-8 BOM incorrectly; rerunning with UTF-8-sig passed, without editing the preserved source.
- Legacy broad game suite, Docker image build, biological validation and empirical model fitting were not run.

## 16–18. Limitations, outstanding work and priorities
1. Obtain a licensed, provenance-complete human connectivity/atlas pairing with measured hypothalamic, cerebellar/vermis and brainstem coverage. Do not invent nodes/edges.
2. Replace the phenomenological sleep scheduler with a published coupled-population model and its parameter tables, then add an EEG forward model and validate against appropriately licensed PSG with subject-disjoint splits; keep both current baselines for comparison.
3. Import pinned FlyWire cell-type/neuropil annotations and morphology, validate published circuit phenomena, resolve receptor uncertainty and perform longer full-network stability/sensitivity tests.
4. Define measurable neuroscience prediction/learning objectives, subject-disjoint data splits, baselines and ablations before training temporal/GNN models.
5. Extend experiment sweeps, statistical inference, all-backend checkpoint recovery, anatomical visualization, validated synaptic models and scientifically defined hybrid coupling.

## Reproducible local commands
From `C:/Users/Cameron/Neuro-ML` using the existing runtime:
```bash
.venv/Scripts/python.exe -m pytest tests/test_neuro_science.py -q
.venv/Scripts/python.exe -m neuro_ml fly datasets/flywire/v783-processed experiments/runs/fly-reproduce --neurons 512 --duration-ms 500 --sign-policy ach-gaba-only --seed 7
.venv/Scripts/python.exe -m neuro_ml human datasets/human/tvb96-processed experiments/runs/human-reproduce --allow-partial --duration-ms 2000 --seed 7
.venv/Scripts/python.exe -m neuro_ml sleep experiments/runs/sleep-reproduce --hours 24 --seed 7
.venv/Scripts/python.exe -m neuro_ml dashboard --runs experiments/runs --port 8766
```
Use fresh output names. Existing datasets/runs refuse silent replacement. See README for installation and download commands. No Git commit, push, deployment or public data upload was performed. **Overall status: migrated and implemented working foundations with real fly anatomy and an aggregate-validated sleep architecture; complete human whole-brain coverage, emergent/EEG-validated sleep physiology and AI learning objectives remain unfinished.**

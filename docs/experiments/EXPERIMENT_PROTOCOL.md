# Experiment protocol

Every experiment creates a new nonexisting directory. `report.json` records research question, hypothesis, dataset provenance, seed, explicit configuration, hardware, start/end UTC, code SHA-256, Git HEAD, status/failures, wall/CPU time and end process RSS. Reports are atomically replaced within that run. `activity.npz` stores labeled model arrays. LIF `checkpoint.npz` records voltage, current, adaptation, refractory, pending delay queue, RNG state, step counter, weights and complete configuration. Pickle is not used.

## Current commands
```bash
python -m neuro_ml fly datasets/flywire/v783-processed experiments/runs/fly-seed7 --neurons 512 --duration-ms 500 --sign-policy ach-gaba-only --seed 7
python -m neuro_ml human datasets/human/tvb96-processed experiments/runs/human-partial-seed7 --allow-partial --duration-ms 2000 --seed 7
python -m neuro_ml sleep experiments/runs/sleep-seed7 --hours 24 --seed 7
python -m neuro_ml dashboard --runs experiments/runs --port 8766
```

Change output directory names on repeated runs. Seeds enable deterministic same-environment reproduction; cross-library/platform bit equivalence is not guaranteed. Report exact dependency versions separately. Existing outputs are never silently overwritten.

## Planned comparisons
Fly: resolved-sign versus unknown-zero, no-edge control, current scale/dt/subset sensitivity, different seeds. Current fly run automatically does seeded replay and a no-edge control. STDP remains off until a specified learning hypothesis and ablation are defined.
Human: baseline versus sleep modulation, regional parameter sensitivity, fitted versus unfitted model. Partial anatomy must never enter a complete-whole-brain result table.
Sleep: independently reproduce a published model before tuning exploratory stage thresholds. Use subject-disjoint train/validation/test if fitting biological data; record license, baseline, confidence intervals and negative findings.

A generic parameter-sweep scheduler, interrupted experiment continuation, human/sleep model checkpoint recovery, ML training and automated statistical inference are unfinished. LIF continuation is supported and tested; this is not a claim that every experiment can resume.

# Validation target provenance audit

Every quantitative target the project compares against is listed here with its source
status. **Unverified targets are excluded from any claim of validated performance.**
"Aggregate" means the target describes a distribution or percentage over a population,
not a matched measurement from the same preparation.

## Status legend

- **verified** — the primary source was read and the definition, units and population
  were confirmed.
- **secondary** — the value is widely repeated in review literature and matches the
  conventional definition, but the primary text was not read in this session.
- **unverified** — no traceable source was confirmed; excluded from claims.

## Sleep architecture targets

Used by `ARCHITECTURE_PROFILE` in `neuro_ml/sleep.py` and by `check_architecture`.

| Target | Value used | Status | Note |
|---|---|---|---|
| N1 fraction of total sleep time | 2–10 % | secondary | Conventional adult range; primary meta-analysis not read here |
| N2 fraction | 35–60 % | secondary | Same |
| N3 fraction | 8–25 % | secondary | Stage nomenclature differs between R&K and AASM; definition must be fixed before comparison |
| REM fraction | 15–28 % | secondary | Same |
| REM latency | 60–140 min | secondary | Depends on sleep-onset definition |
| REM periods per night | 4–6 | secondary | Same |
| First-night slow-wave dominance | qualitative | secondary | Direction is robust; magnitude not quantified here |

These targets are **aggregate** and were used to calibrate the retired two-process
scheduler. They are not independent evidence for the mechanistic circuit, whose states
are labelled by a heuristic classifier rather than scored against PSG.

## Mechanistic-circuit targets

| Target | Status | Note |
|---|---|---|
| VLPO ↔ wake-nucleus mutual inhibition | secondary | Sign documented in the sleep/wake flip-flop literature; weights assumed |
| Orexin excitation of wake nuclei | secondary | Sign documented; weight assumed |
| Serotonergic/noradrenergic inhibition of REM-on cholinergic cells | secondary | Sign documented; weight assumed |
| Thalamocortical loop sign structure | secondary | TC→cortex excitatory, RE→TC inhibitory; weights assumed |
| T-current form for thalamic cells | secondary | Destexhe-type form; parameter values not fitted |
| Cortical adaptation producing slow alternation | unverified | **Not demonstrated**: no 1 Hz up/down state measured |
| Spindle (12–16 Hz) and K-complex generation | unverified | **Not implemented** as detections |
| Neuromodulator clearance time constants | secondary | Order-of-magnitude values only |
| Normalized modulator concentrations | unverified | No extracellular measurements exist for this preparation |

## Empirical recordings

No PSG, EEG, MEG or subject dataset is bundled, downloaded or used by any test. The
project therefore makes **no empirical comparison claim**. Adding data requires a
documented licence, channel map, annotation source and subject-disjoint split; the
comparison must be recorded in the experiment report with the dataset checksum.

## Rules applied

1. A target that is not `verified` cannot be cited as validation of the model.
2. Aggregate agreement is reported as aggregate agreement, never as reproduction of
   the biological process.
3. Any parameter set on synthetic or self-generated data is labelled as such.
4. Failed targets stay in the report.

# Validation methods

## Automated numerical checks
`python -m pytest tests/test_neuro_science.py -q`

Thirteen focused tests cover: canonical graph validation/roundtrip/no-overwrite; Feather batch aggregation with exact large uint64 IDs and invalid-reference rejection; analytic passive LIF response; spike/refractory behavior and current decay during refractory; explicit synaptic delay; exact continuation of noisy delayed state after checkpoint recovery; Euler step convergence and coarse-step refusal; causal/anti-causal STDP and bounds; strict human coverage refusal; regional boundedness/reproducibility/coupling ablation; seeded continuous sleep bounds and pressure direction; known-frequency Welch measurement; bounded memory retention/retrieval/decay/interference. Fixture graphs are synthetic and not passed off as biological datasets.

## Source integrity and anatomical validation
FlyWire downloads require exact publisher byte size and MD5 then record SHA-256. Every endpoint must occur in the source proofread uint64 list. Counts must be positive integers; neurotransmitter probabilities finite and between zero and one. Count aggregation across neuropils is explicit. Self-connections are reported, not silently deleted; unique directed pairs and anatomical synapse counts are reported separately. No fixed neuron count assertion is substituted for computed source counts.

Human metadata order must exactly match connectivity IDs. Strict coverage checks require the listed bilateral cortical/subcortical/cerebellar groups, vermis, midbrain, pons and medulla, valid connectivity, no isolated nodes and one weak component. This is necessary but not sufficient biological validation. It does not establish detailed nucleus coverage, correct coordinate registration, appropriate directionality or calibrated pathway strength.

## Experiments
Fly: same seed/config replay must match all recorded output arrays; no-edge control measures whether anatomical transmission changes activity. Store all-neuron anatomical counts separately from the simulated subset.
Human: report partial coverage, bounded rate dynamics and coupling behavior. Strict incomplete-atlas run must fail and record the reason.
Sleep: report stage fractions, actual transition counts/bout distributions and missing stages. First default run fails realistic sleep architecture; no REM observed.

## Not yet validated
No published cell-type circuit benchmark, physiological fly recordings, subject-level human FC/EEG/MEG fit or licensed sleep reference recording comparison has been completed. Matching analytic equations/tests establishes numerical behavior, NOT biological fidelity. No diagnostic accuracy, sentience or reconstructed recorded activity claim is permitted.

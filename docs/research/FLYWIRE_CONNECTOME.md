# FlyWire anatomical backend

Selected source: FAFB FlyWire v783.0, DOI 10.5281/zenodo.10676866, CC-BY-4.0. Download only proofread_connections_783.feather (852,022,274 bytes) and proofread_root_ids_783.npy (1,114,168 bytes). Publisher MD5 values are checked before final filenames become available, and SHA-256 recorded locally. Do not fetch the 9.49 GB all-synapse file for this workload.

Importer reads Feather IPC record batches. It validates uint64 IDs against the complete proofread root list, positive integral counts and probability bounds. Sum by target/source over neuropils produces CSR counts. Retain original files for neuropil-level rows. Per-source synapse-weighted neurotransmitter probabilities are saved separately; this summary is NOT a cell-type annotation. Neuropil count summary is saved in provenance. Missing cell types, per-cell morphology, receptor information, delay measurements and intrinsic physiology remain unknown.

All-neuron anatomical import is distinct from simulated subset size. Initial experiments use a deterministic highest-strength induced subgraph to fit laptop resources. This loses external inputs and is not a whole-fly-brain dynamics claim. No generated edge is added. Root IDs with no retained edges remain in the full anatomical graph. Multiple neuropil rows legitimately collapse onto one directed pair; aggregated pairs are not individual synapses.

Reproducible workflow:
```bash
python -m neuro_ml fetch-flywire datasets/flywire/v783
python -m neuro_ml import-flywire datasets/flywire/v783 datasets/flywire/v783-processed
python -m neuro_ml fly datasets/flywire/v783-processed experiments/runs/fly-seed7 --neurons 512 --duration-ms 500 --sign-policy ach-gaba-only --seed 7
```
Directories are never silently overwritten. Unknown physiology defaults to zero transmission; opt-in ACh/GABA polarity policy and count normalization are exploratory. Structural statistics and numerical checks do not constitute published circuit-physiology validation. Results and exact imported counts belong in generated statistics.json and experiment report.json, not an assumed hardcoded neuron count.

BANC v888 was investigated but not selected: it spans a distinct animal's brain and ventral nerve cord, and requires a separate importer and provenance. Source-reported larger counts are not evidence of an imported Neuro-ML model.

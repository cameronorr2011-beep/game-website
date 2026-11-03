# Neuro-ML system architecture

Status: functioning research foundation, NOT the completed platform described in the project brief.

## Organism separation
`neuro_ml/connectome.py` defines a sparse anatomical graph with immutable external IDs, target-row/source-column convention, nonnegative anatomical weights and JSON provenance. Fly neuron IDs are uint64 (never floating point). Human labels are strings. `validate_human` refuses nonhuman anatomy and incomplete major anatomical groups in strict mode. No fly-human anatomical coupling is implemented or permitted.

## Modules
- `data.py`: bounded downloads, publisher integrity checks for FlyWire, local SHA-256, source licenses and versioned manifests. No credentials or cloud services required.
- `connectome.py`: Feather IPC record batches, proofread ID validation, neuropil aggregation, probability summaries, CSR serialization and coverage validation.
- `dynamics.py`: current-based delayed LIF network, optional pair STDP, Wilson-Cowan-family regional E/I dynamics.
- `sleep.py`: continuous exploratory sleep/wake/REM variables, homeostatic pressure, circadian forcing, stochastic fluctuations, five threshold readouts and spectral analysis.
- `memory.py`: explicitly computational bounded episodic retrieval and leaky working context.
- `experiments.py`: hypotheses, seeds, dataset provenance, code checksums, hardware, failures, timing, activity NPZ and complete LIF continuation checkpoints.
- `dashboard.py`: loopback-only, read-only experiment report and decimated signal explorer. No external CDN or developer service.
- `__main__.py`: reproducible CLI.

## Data flow
Published versioned source → checksummed manifest → validated canonical anatomy → separately declared physiological assumptions → seeded backend → experiment directory → measured reports and visualization.

Source arrays are never overwritten. Existing target directories cause explicit errors. Dataset downloads retain incomplete `.partial` files on failure, never import them as valid data. Legacy source/weights never enter the scientific package import graph.

## Deliberate exclusions
No full physiology reconstruction, human cellular model, standards-compliance claim, hybrid multiscale mapping, trained AI predictor, clinical classifier or consciousness claim. A general plugin framework and every requested data format are not implemented. Current concrete formats are CSV-compatible metadata concepts, Feather input, NumPy/NPZ/CSR and JSON. TVB ZIP input is supported. Other formats remain future work.

# Known limitations — completion checklist

Neuro-ML is unfinished. Do not promote the dashboard or a checkpoint into evidence of a complete brain.

- Prior fly-connectome work was not recovered in the authorized directories/history. Searches elsewhere need explicit paths. A published FlyWire reimport is the recovery fallback.
- FlyWire anatomy is real; per-cell physiology, receptor signs, conduction delays, cell types and morphologies are incomplete. Initial dynamics run an induced subset, not all-neuron whole-fly physiology. Published circuit/recording validation is outstanding.
- LIF and a reduced regional E/I family are implemented. AdEx, Hodgkin-Huxley, Izhikevich, Jansen-Rit, Wong-Wang and hybrid circuit/region mappings are not.
- Pair STDP is optional and tested separately; no automatic learning policy, short-term plasticity, structural plasticity or validated homeostatic optimization is claimed.
- Human TVB96 anatomy is partial and lacks cerebellum, vermis, hypothalamus and brainstem. Strict mode refuses it. Complete regional coverage is unfinished. Cellular-resolution human simulation is not built.
- Imported tract lengths do not yet drive regional conduction delays. Human model constants are exploratory, not fitted. EEG/MEG/BOLD observation models and empirical FC fitting are absent.
- Sleep is now simulated by a coupled spiking circuit (483 neurons: cortex, thalamus, VLPO, orexin, LC, DR, wake and REM-on cholinergic pools) with normalized neuromodulator kinetics and a single-dipole-per-population EEG forward model. Wake, NREM-like and REM-like regimes emerge from the wiring under different drives; no stage schedule exists. **However: N3/deep slow-wave sleep is not produced, no 1 Hz cortical up/down state or spindle/K-complex detector exists, weights are assumed rather than fitted, and no PSG or subject data are used.** The EEG is uncalibrated model output, not microvolts of recorded signal. Classifier agreement is weak: in a 10 s NREM run only 2 of 9 windows reached N2 and none reached N3, and REM was certified in 2 of 9 windows because no theta-generating circuit exists. Pause stops the loop between 0.5 s chunks, so up to one chunk may complete after the request. The retired scheduler and the original failed baseline remain in `experiments/runs/sleep-2process-seed7` and `experiments/runs/sleep-seed7` for comparison.
- Memory mechanisms are computational analogues. Neuroscience AI training, temporal prediction, GNN classification, generalization checks and learned checkpoints do not exist yet.
- Experiments record timing and end RSS, not a full peak-memory/GPU-utilization profiler. CPU-only environment was measured; absence of CUDA in installed PyTorch is not proof that no physical GPU exists.
- Dashboard is a read-only local report/signal explorer, not the complete seven-workspace interactive 3D scientific laboratory. No arbitrary simulation launch API or 3D anatomical mesh is implemented.
- Only concrete needed input/output formats are supported; no NWB/BIDS/SONATA/NeuroML2 compliance or all-format compatibility is claimed.
- No commits, pushes, releases, deployments or restricted-data uploads are performed in this task.

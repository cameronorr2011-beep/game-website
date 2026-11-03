# Model architecture and units

## Fly current LIF
`dV/dt = (V_rest - V + R_m (I_external + I_syn - I_adapt))/tau_m`.
V is mV; R is MOhm; I is nA; time is ms. Defaults: rest -70 mV, reset -75 mV, threshold -55 mV, tau_m 20 ms, R 100 MOhm, synaptic tau 5 ms, refractory 2 ms, adaptation tau 200 ms. Defaults are illustrative model assumptions, not measured per-FlyWire-cell values. They retain useful concepts from the old spiking implementation while correcting immediate delivery and refractory decay behavior. No source code from the unlicensed external repository is incorporated into the backend.

Integration: Euler or exact membrane relaxation for piecewise-constant per-step current, exponential synaptic/adaptation decay, grid-timed threshold crossings, uniform explicit delay queue. Exact refers to the per-step membrane relaxation, not an exact solution of all coupled dynamics. dt must be <= one fifth of the smallest time constant. Noise is seeded and diffusion-consistent with passive Ornstein-Uhlenbeck stationary variance. All refractory neurons continue current/adaptation decay.

Anatomical count matrices remain nonnegative. Dynamics use a separate signed current matrix. Default unknown-zero disables unresolved transmission. Opt-in ach-gaba-only uses source-cell synapse-weighted probability >=0.8: ACh positive, GABA negative; this is a simplified receptor assumption, not measured physiology. Glutamate and modulators stay unresolved. Incoming counts are normalized to an exploratory 0.08 nA scale. This normalization and universal time constants require sensitivity analysis; neither represents data-derived conductance.

Pair STDP is an independently tested optional rule, not automatically enabled on the anatomical simulation. Pre/post exponential traces, causal potentiation, anti-causal depression and hard magnitude bounds. No same-bin causal pairing. No validated FlyWire learning rule is claimed.

## Regional E/I backend
Wilson-Cowan-family reduction:
`tau_E dE/dt=-E+(1-E) sigmoid(w_EE E - w_EI I + G W E + P - 3)`;
`tau_I dI/dt=-I+(1-I) sigmoid(w_IE E - w_II I - 3)`.
Heun integration, row-normalized long-range structural coupling, bounded rates. Parameters (tau_E=10 ms, tau_I=20 ms, 12/10/10/0 local weights, G=0.5, P=1.5) are exploratory and not a fit to human observations. Original model family: Wilson & Cowan 1972, https://pubmed.ncbi.nlm.nih.gov/4332108/. No source-specific parameter justification beyond model-family structure yet. Imported tract lengths are preserved; conduction delays are not applied. No EEG, MEG or BOLD forward model.

## Cognitive/AI scope
Bounded event store uses normalized cosine retrieval, age decay and similarity-dependent interference. Working memory is leaky context retention. Both are computational engineering mechanisms, not biological reconstructions. No neuroscience Transformer or GNN has been trained. Historical game model parameter sizes are not target neuroscience architectures. The old Transformer encodes game entities rather than an independently validated temporal neural predictor.

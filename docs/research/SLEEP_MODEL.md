# Sleep simulator — coupled spiking circuit with an EEG forward model

The scheduled two-process hypnogram has been **retired as the principal mode**. Sleep
states are now produced by integrating a spiking network forward; the stage label is
computed afterwards by a separate measurement layer. The previous scheduler remains
runnable for comparison (`python -m neuro_ml sleep`), and its recorded runs stay in
`experiments/runs/`.

## 1. Instantiated circuits

`neuro_ml/sleep_circuit.py` builds every population from `neuro_ml/circuits.py`, where
each neuron has its own membrane potential, four synaptic conductance pools, a
calcium-dependent adaptation conductance, a refractory clock, and — for thalamic
cells — a low-threshold Ca²⁺ current with an inactivation variable.

| Population | Cells | Cell class | Role |
|---|---:|---|---|
| `cortex_e` | 260 | conductance-based LIF, strong adaptation | cortical excitatory |
| `cortex_i` | 65 | fast-spiking LIF | cortical inhibition |
| `tc` | 30 | LIF + T current | thalamic relay |
| `re` | 24 | LIF + T current, GABAergic | thalamic reticular |
| `vlpo` | 20 | GABAergic LIF | preoptic sleep-promoting |
| `orexin` | 20 | excitatory LIF | hypothalamic wake-promoting |
| `lc` | 16 | excitatory LIF | noradrenergic |
| `dr` | 16 | excitatory LIF | serotonergic |
| `ach_wake` | 16 | excitatory LIF | basal-forebrain cholinergic (wake) |
| `ach_rem` | 16 | excitatory LIF | pontine cholinergic (REM-on) |

Total **483 spiking neurons**. Coupling includes cortical recurrence, the
thalamocortical loop (TC→cortex, cortex→TC, cortex→RE, RE→TC), reciprocal
VLPO↔wake-nucleus inhibition, orexin excitation of the wake nuclei, ascending
cholinergic/monoaminergic excitation of cortex and thalamus, and serotonergic and
noradrenergic inhibition of the pontine REM-on pool. Every rule records
`literature` (documented sign and existence) or `assumed` (synthetic wiring); weights
are model parameters in nS and are **not** measured conductances.

## 2. What replaces the stage schedule

There is no schedule. The simulation integrates the network and applies:

- **Homeostatic pressure** `P` with separate rise/decay time constants (18.2 h / 6 h),
  driven by measured noradrenergic + orexinergic tone, not by the classifier.
- **Circadian phase** as an explicit external current on the wake nuclei.
- **Accumulated REM propensity** (`rem_drive_pa`) as an experimental initial condition
  for the pontine REM-on pool.

Because pressure, circadian phase and REM propensity enter as *currents*, changing them
changes which regime the network settles into. Some runs never leave one regime; those
outcomes are recorded rather than corrected.

## 3. Neuromodulator kinetics

`neuro_ml/neuromod.py` integrates normalized concentrations

```
dm/dt = (r_source(t) / r_reference - m) / tau_clearance
```

for acetylcholine (τ 2 s, 40 Hz reference), noradrenaline (τ 3 s, 50 Hz), serotonin
(τ 5 s, 50 Hz) and orexin (τ 10 s, 20 Hz). `r_source` is the measured firing rate of the
releasing population. The state is a **normalized concentration, not a measured nM
value**. The concentrations act on the circuits: cholinergic and noradrenergic tone
depolarize cortex and thalamus, noradrenaline inhibits VLPO, serotonin and
noradrenaline inhibit the REM-on pool, and orexin excites the wake nuclei. Effects
saturate at 1.0 so a silent or silent-adjacent nucleus cannot produce unbounded drive.

## 4. EEG forward model

`neuro_ml/eeg.py` computes one equivalent dipole per population (mean net synaptic
current, a pA-like quantity) and projects it to six virtual 10-20 electrodes with

```
gain[sensor, population] = (n_orientation · n_sensor-direction) / distance²
```

then resamples with polyphase filtering to 256 Hz. This is a **single-dipole-per-population
spherical approximation**: no skull/scalp conductivity, no cortical folding, no CSF
shunts. Output is in arbitrary model units and is **not calibrated to microvolts**.
Deep sources (thalamus, brainstem) project weakly and polarity-inverted, which is why
their contribution to surface channels is small.

## 5. Measurement layer

`classify_stage` observes only the simulated signal and modulator state: REM requires
ACh > 0.55 with monoaminergic tone < 0.35 and theta > delta; Wake requires
monoaminergic tone > 0.55 with delta fraction < 0.12; otherwise N3 (delta ≥ 0.30),
N2 (delta ≥ 0.12) or N1. Thresholds are heuristic and explicitly not a clinical
scorer. The classifier never sets neural state.

## 6. Measured regimes (10 s each, dt = 1 ms, seed 7)

| Condition | Cortical rate | Thalamic rate | VLPO | REM-on pool | NE / 5-HT / ACh | Delta / theta | Classifier output |
|---|---:|---:|---:|---:|---|---:|---|
| Wake (`P`=0.20) | 12.6 Hz | 38.7 Hz | 0 Hz | 0 Hz | 0.96 / 0.82 / 1.05 | 0.014 / 0.009 | 9 × Wake |
| NREM (`P`=0.92) | 4.9 Hz | 14.7 Hz | 79.8 Hz | 0 Hz | 0.00 / 0.00 / 0.00 | 0.054 / 0.174 | 7 × N1, 2 × N2 |
| REM (`P`=0.92, drive 260) | 9.5 Hz | 29.2 Hz | 79.8 Hz | 61.8 Hz | 0.00 / 0.00 / 0.76 | 0.026 / 0.025 | 7 × N1, 2 × REM |

The neural differences are emergent consequences of the circuit under different drives:
sleep pressure silences the wake nuclei and produces slow, low-rate cortical activity;
adding REM-on drive while monoamines are already silent activates the pontine pool and
restores cortical activation through the cholinergic pathway.

**The classifier does not agree with that physiological picture.** Most low-arousal
windows are labelled N1 rather than N2/N3, and REM is certified in only 2 of 9 windows
because the model produces no theta-dominant rhythm — cortical activation here is
tonic, with no septohippocampal theta generator — so the `theta > delta` gate usually
fails. The state of the *circuit* is clear; the *stage label* is not. Wall-clock cost was
**0.3–0.55× real time** at dt = 1 ms on the CPU-only host.

## 7. Known failures and omissions

- **N3 is not produced, and the classifier mostly reports N1.** Under high pressure
  cortical output falls to ~5 Hz but the delta fraction fluctuates between ~0.05 and
  ~0.16 across runs; 1 Hz cortical up/down states have not been demonstrated and no
  spindle or K-complex detector exists. Consequently only 2 of 9 NREM windows reached
  an N2 label and none reached N3.
- **REM labelling is unstable** (2 of 9 windows) because the model lacks a
theta-generating circuit, so the theta criterion is decided by noise.
- **Pause granularity:** pausing halts the loop between 0.5 s advance chunks, so up to
  one additional 0.5 s chunk may complete after the request (observed 0.034 s of
  additional simulated time), and the reported state is `paused` throughout.
- Transition *timing* across a night is untested: 8 s runs cannot show ultradian
  cycling, and pressure changes negligibly in that window.
- Connection weights were set for stable dynamics and are assumed, not fitted.
  Literature status applies to the sign and existence of each pathway only.
- No PSG or subject data enter the simulation; the forward model is uncalibrated, and
  no clinical claim is made. See `docs/validation/VALIDATION_SOURCES.md` for the
  provenance status of every target the project compares against.
- The classifier thresholds were adjusted during development; any performance figure
  obtained on the same runs used to set them is not independent validation.
- The Vercel site (`outputDirectory: public`) is static and **cannot** run this Python
  backend. The lab is served by `python -m neuro_ml dashboard`, and the deployment
  requirement is documented rather than claimed as online.

## 8. Next steps

1. Add a spindle/K-complex detector and test whether spindle-like thalamic bursts
   appear in the model; report the result either way.
2. Fit the assumed weights against published firing-rate ranges with subject/recording
   disjoint evaluation, and keep unfitted weights labelled.
3. Run longer simulations (minutes to hours) to test ultradian cycling and pressure
   dynamics, reporting the measured cost per simulated hour.
4. Add a head model with documented conductivities before any amplitude comparison.

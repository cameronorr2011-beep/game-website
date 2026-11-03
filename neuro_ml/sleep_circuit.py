"""Coupled sleep-regulatory circuit: emergent wake/NREM/REM-like regimes.

Architecture (all populations are individually instantiated spiking neurons):

    cortex_e / cortex_i     recurrent cortical excitation and inhibition
    tc / re                 thalamic relay and reticular nucleus (T-current cells)
    vlpo                    preoptic sleep-promoting GABAergic population
    orexin                  hypothalamic wake-promoting population
    lc / dr / ach           brainstem and pontine arousal nuclei (NA, 5-HT, ACh)

Coupling signs follow the documented sleep/wake flip-flop: VLPO inhibits the wake
nuclei, the wake nuclei inhibit VLPO, orexin excites the wake nuclei, and thalamus
and cortex are reciprocally coupled. Every rule records whether its sign is
literature-documented or assumed.

**No stage schedule exists.** The simulation integrates the network forward; sleep
pressure and circadian phase enter as external currents, and the sleep stage is
estimated afterwards by :func:`neuro_ml.eeg.classify_stage` from signal features and
modulator state. Runs may fail to transition, oscillate, or stay in one regime —
those outcomes are recorded as measurements rather than corrected.
"""
from dataclasses import dataclass, asdict, field
import time
import numpy as np
from .circuits import CircuitNetwork
from .eeg import SENSORS, EEGBuffer, band_power, classify_stage, lead_field
from .neuromod import NeuromodulatorState, SPECS

STAGE_INDEX = {'Wake': 0, 'N1': 1, 'N2': 2, 'N3': 3, 'REM': 4}
STAGES = tuple(STAGE_INDEX)


@dataclass(frozen=True)
class SleepCircuitConfig:
    dt_ms: float = .5
    cortex_e: int = 260
    cortex_i: int = 65
    tc: int = 30
    re: int = 24
    vlpo: int = 20
    orexin: int = 20
    lc: int = 16
    dr: int = 16
    ach: int = 16
    ach_rem: int = 16
    duration_s: float = 20.
    window_s: float = 2.
    seed: int = 7
    start_hour_h: float = 8.
    circadian_phase_h: float = 15.5
    initial_pressure: float = .25
    arousal_drive_pa: float = 260.
    circadian_drive_pa: float = 110.
    pressure_drive_pa: float = 300.
    pressure_inhibition_pa: float = 120.
    #: Stationary standard deviation of the Ornstein-Uhlenbeck background input (pA).
    #: White per-step noise would be too small by sqrt(dt/tau) to drive sparse firing.
    background_pa: float = 45.
    background_tau_ms: float = 20.
    #: Tonic cortical excitation from unmodelled subcortical afferents. Declared as an
    #: experimental constant, not a measured conductance.
    cortical_tone_pa: float = 160.
    #: Accumulated REM propensity exciting the pontine REM-on pool (hypothesis).
    rem_drive_pa: float = 0.
    eeg_sample_hz: float = 250.

    def __post_init__(self):
        if not 0 < self.dt_ms <= 1.0 or self.duration_s <= 0 or self.window_s <= 0:
            raise ValueError('Invalid timing parameters (dt_ms must be <= 1.0 ms)')
        for name in ('cortex_e', 'cortex_i', 'tc', 're', 'vlpo', 'orexin', 'lc', 'dr', 'ach', 'ach_rem'):
            if getattr(self, name) < 1:
                raise ValueError('Every population needs at least one neuron')
        if not 0 <= self.initial_pressure <= 1:
            raise ValueError('Pressure must lie in [0, 1]')
        if self.eeg_sample_hz <= 0 or self.eeg_sample_hz > 1000. / self.dt_ms:
            raise ValueError('EEG sampling must not exceed the simulation rate')


def build_sleep_circuit(config):
    """Instantiate the coupled network with documented coupling signs."""
    net = CircuitNetwork(dt_ms=config.dt_ms, seed=config.seed)
    net.add_population('cortex_e', config.cortex_e, 'cortical_e', 'cortical excitatory',
                       'pyramidal-type cortical neurons')
    net.add_population('cortex_i', config.cortex_i, 'cortical_i', 'cortical inhibitory',
                       'fast-spiking cortical interneurons')
    net.add_population('tc', config.tc, 'thalamic_tc', 'thalamic relay',
                       'thalamocortical relay cells with low-threshold Ca current')
    net.add_population('re', config.re, 'thalamic_re', 'thalamic reticular',
                       'GABAergic reticular nucleus cells with T current')
    net.add_population('vlpo', config.vlpo, 'inhibitory', 'sleep-promoting',
                       'ventrolateral preoptic GABAergic neurons')
    net.add_population('orexin', config.orexin, 'excitatory', 'wake-promoting',
                       'hypothalamic orexin/hypocretin neurons')
    net.add_population('lc', config.lc, 'excitatory', 'noradrenergic',
                       'locus coeruleus noradrenergic neurons')
    net.add_population('dr', config.dr, 'excitatory', 'serotonergic',
                       'dorsal raphe serotonergic neurons')
    net.add_population('ach_wake', config.ach, 'excitatory', 'cholinergic wake',
                       'basal forebrain cholinergic neurons active in wakefulness')
    net.add_population('ach_rem', config.ach_rem, 'excitatory', 'cholinergic REM-on',
                       'pontine cholinergic neurons active in REM sleep')

    # Cortex: recurrent AMPA excitation and GABAergic feedback (sign literature, weights assumed).
    net.connect('cortex_e', 'cortex_e', weight_ns=.22, prob=.08, delay_ms=2., provenance='literature')
    net.connect('cortex_e', 'cortex_i', weight_ns=.55, prob=.20, delay_ms=2., provenance='literature')
    net.connect('cortex_i', 'cortex_e', weight_ns=1.30, prob=.20, delay_ms=2., synapse='gaba',
                provenance='literature')
    net.connect('cortex_i', 'cortex_i', weight_ns=.50, prob=.15, delay_ms=2., synapse='gaba',
                provenance='literature')
    # Thalamocortical loop.
    net.connect('tc', 'cortex_e', weight_ns=.40, prob=.12, delay_ms=3., provenance='literature')
    net.connect('cortex_e', 'tc', weight_ns=.28, prob=.08, delay_ms=3., provenance='literature')
    net.connect('cortex_e', 're', weight_ns=.35, prob=.12, delay_ms=3., provenance='literature')
    net.connect('re', 'tc', weight_ns=1.60, prob=.25, delay_ms=2., synapse='gaba',
                provenance='literature')
    net.connect('tc', 're', weight_ns=.18, prob=.15, delay_ms=2., provenance='literature')
    net.connect('re', 're', weight_ns=.45, prob=.15, delay_ms=2., synapse='gaba', provenance='literature')
    # Sleep/wake flip-flop: mutual inhibition (sign literature, weights assumed).
    for wake in ('orexin', 'lc', 'dr', 'ach_wake'):
        net.connect('vlpo', wake, weight_ns=2.2, prob=.5, delay_ms=3., synapse='gaba',
                    provenance='literature', note='VLPO inhibits wake-promoting nuclei')
        net.connect(wake, 'vlpo', weight_ns=1.6, prob=.4, delay_ms=3., synapse='gaba',
                    provenance='literature', note='wake nuclei inhibit VLPO (simplified direct GABA)')
    # Orexin excites the other wake nuclei.
    for target in ('lc', 'dr', 'ach_wake'):
        net.connect('orexin', target, weight_ns=.9, prob=.4, delay_ms=2., provenance='literature')
    # Cholinergic and monoaminergic ascending activation of cortex and thalamus.
    for source in ('ach_wake', 'ach_rem'):
        net.connect(source, 'cortex_e', weight_ns=.14, prob=.08, delay_ms=3., provenance='literature')
        net.connect(source, 'tc', weight_ns=.10, prob=.10, delay_ms=3., provenance='literature')
    net.connect('lc', 'cortex_e', weight_ns=.10, prob=.06, delay_ms=3., provenance='assumed',
                note='fast component of a predominantly modulatory projection')
    net.connect('dr', 'ach_rem', weight_ns=1.1, prob=.35, delay_ms=3., synapse='gaba',
                provenance='literature', note='serotonin inhibits the cholinergic REM-on pool')
    net.connect('lc', 'ach_rem', weight_ns=.9, prob=.35, delay_ms=3., synapse='gaba',
                provenance='literature', note='noradrenaline inhibits the cholinergic REM-on pool')
    return net.build()


class SleepCircuitSimulation:
    """Step-wise simulation with live measurement (rates, modulators, EEG, stage)."""

    def __init__(self, config=None, seed=None):
        self.config = config or SleepCircuitConfig()
        c = self.config
        self.seed = int(c.seed if seed is None else seed)
        self.net = build_sleep_circuit(c)
        self.mod = NeuromodulatorState()
        self.rng = np.random.default_rng(self.seed)
        self.pressure = float(c.initial_pressure)
        self.time_s = 0.
        self.sensor_names, self.field = lead_field(list(self.net.populations))
        self.eeg_sample_hz = min(c.eeg_sample_hz, 1000. / c.dt_ms)
        self._eeg_every = int(round((1000. / c.dt_ms) / self.eeg_sample_hz))
        self.eeg = EEGBuffer(self.eeg_sample_hz, tuple(self.sensor_names))
        self.steps_per_sample = int(round((1. / self.eeg_sample_hz) / (c.dt_ms / 1000.)))
        self.trace = {'time_s': [], 'rates': {k: [] for k in self.net.populations},
                      'modulators': {k: [] for k in self.mod.names}, 'pressure': [],
                      'eeg_rms': []}
        self.hypnogram = []
        self.history = []
        self._next_trace_s = 0.
        self._next_classify_s = c.window_s
        self._eeg_counter = 0
        self._noise = np.zeros(self.net.n)
        self._noise_decay = float(np.exp(-c.dt_ms / c.background_tau_ms))
        self._mod_counter = 0.0
        self.neuron_spikes = np.zeros(self.net.n, dtype=np.int64)
        self.health = {'nonfinite': False}

    # -- drives -------------------------------------------------------------
    def _external_currents(self):
        c = self.config
        n = self.net.n
        external = np.zeros(n)
        hour = (c.start_hour_h + self.time_s / 3600.) % 24
        circadian = float(np.cos(2 * np.pi * (hour - c.circadian_phase_h) / 24))
        pop = self.net.populations
        sl = lambda name: slice(pop[name].start, pop[name].start + pop[name].n)
        # Circadian alerting signal and experimental arousal drive act on wake nuclei.
        wake_drive = c.arousal_drive_pa + c.circadian_drive_pa * circadian
        wake_drive -= c.pressure_inhibition_pa * self.pressure
        for name in ('orexin', 'lc', 'dr', 'ach_wake'):
            external[sl(name)] += wake_drive
        # Homeostatic sleep pressure excites the preoptic sleep-promoting population.
        external[sl('vlpo')] += c.pressure_drive_pa * self.pressure
        # Neuromodulator receptor effects (normalized concentration -> pA bias).
        ach = self.mod.value['acetylcholine']
        ne = self.mod.value['noradrenaline']
        ser = self.mod.value['serotonin']
        orx = self.mod.value['orexin']
        sat = lambda x: float(np.clip(x, 0., 1.))
        external[sl('ach_wake')] += .6 * wake_drive + 90. * sat(orx)
        external[sl('ach_rem')] += c.rem_drive_pa + 30. - 140. * sat(ser) - 70. * sat(ne)
        external[sl('lc')] += 60. * sat(orx)
        external[sl('dr')] += 50. * sat(orx)
        external[sl('orexin')] += -50. * sat(ne)
        # Clamp the receptor effects of normalized concentrations to a saturating range.
        ach, ne, ser, orx = sat(ach), sat(ne), sat(ser), sat(orx)
        external[sl('cortex_e')] += c.cortical_tone_pa + 50. * ach + 40. * ne + 10. * ser
        external[sl('cortex_i')] += .5 * c.cortical_tone_pa + 30. * ach + 20. * ne
        external[sl('tc')] += 90. + 40. * ach + 30. * ne - 20. * ser
        external[sl('vlpo')] += -60. * ne
        if c.background_pa > 0:
            sigma = c.background_pa * np.sqrt(2. * c.dt_ms / c.background_tau_ms)
            self._noise = self._noise * self._noise_decay + self.rng.normal(0., sigma, n)
            external += self._noise
        self._last_circadian = circadian
        return external

    def _update_pressure(self, dt_s):
        arousal = np.clip(self.mod.value['noradrenaline'] + self.mod.value['orexin'], 0., 1.)
        tau_wake, tau_sleep = 18.2 * 3600., 6. * 3600.
        self.pressure += dt_s * ((1. - self.pressure) / tau_wake * arousal
                                 - self.pressure / tau_sleep * (1. - arousal))
        self.pressure = float(np.clip(self.pressure, 0., 1.))

    def _record_trace(self):
        rates = self.net.rates()
        self.trace['time_s'].append(round(self.time_s, 3))
        for k, v in rates.items():
            self.trace['rates'][k].append(round(v, 3))
        for k, v in self.mod.value.items():
            self.trace['modulators'][k].append(round(float(v), 4))
        self.trace['pressure'].append(round(self.pressure, 4))
        self.trace['eeg_rms'].append(float(np.sqrt(np.mean(self.eeg.data[-1] ** 2))) if len(self.eeg.data) else 0.)

    def _classify(self):
        window = int(self.config.window_s * self.eeg_sample_hz)
        if len(self.eeg.data) < window:
            return
        data = self.eeg.decimate_to(256.)
        segment = data[-int(self.config.window_s * 256.):, 1] if data.shape[1] > 1 else data[:, 0]
        stage, features = classify_stage(segment, 256., self.mod.value)
        self.hypnogram.append({'t_s': round(self.time_s, 3), 'stage': stage,
                               'index': STAGE_INDEX[stage],
                               'features': {k: round(v, 4) for k, v in features.items()},
                               'demand': round(self.demand(), 4)})
        self.history.append(stage)

    def demand(self):
        """Dimensionless sleep demand combining pressure and circadian phase."""
        return float(np.clip(self.pressure - .25 * max(self._last_circadian, 0.), 0., 1.5))

    # -- main loop ----------------------------------------------------------
    def advance(self, seconds=None, progress=None):
        c = self.config
        target = c.duration_s if seconds is None else min(c.duration_s, self.time_s + seconds)
        target_steps = int(round(target / (c.dt_ms / 1000.)))
        dt_s = c.dt_ms / 1000.
        while self.net.steps < target_steps:
            external = self._external_currents()
            spikes = self.net.step(external)
            self.neuron_spikes += spikes
            self.time_s = self.net.steps * dt_s
            # EEG source projection at the decimated sampling rate.
            self._eeg_counter += 1
            if self._eeg_counter % self._eeg_every == 0:
                dipoles = self.net.synaptic_dipoles()
                q = np.array([dipoles[p] for p in dipoles])
                self.eeg.data = np.vstack([self.eeg.data, (self.field.T @ q)[None, :]])
            # Modulator kinetics at 20 Hz.
            self._mod_counter += dt_s
            if self._mod_counter >= .05:
                rates = self.net.rates()
                rates['ach'] = .5 * (rates['ach_wake'] + rates['ach_rem'])
                self.mod.step(rates, self._mod_counter)
                self._update_pressure(self._mod_counter)
                self._mod_counter = 0.
            if self.time_s >= self._next_trace_s:
                self._record_trace()
                self._next_trace_s += .1
            if self.time_s >= self._next_classify_s:
                self._classify()
                self._next_classify_s += 1.
            if progress and int(self.time_s * 4) % 40 == 0:
                progress(self.progress())
        return self.snapshot()

    def progress(self):
        return {'time_s': round(self.time_s, 2), 'duration_s': self.config.duration_s,
                'fraction': round(min(1., self.time_s / self.config.duration_s), 4),
                'stage': self.hypnogram[-1]['stage'] if self.hypnogram else None}

    def snapshot(self, include_eeg=True):
        payload = {
            'config': asdict(self.config),
            'network': self.net.summary(),
            'connections': self.net.connection_report(),
            'trace': self.trace,
            'hypnogram': self.hypnogram,
            'modulators': self.mod.report(),
            'pressure': round(self.pressure, 4),
            'time_s': round(self.time_s, 3),
            'labels': {'signal': 'synthetic model output, not recorded EEG',
                       'modulators': 'normalized concentration state, not measured nM'},
        }
        if include_eeg and len(self.eeg.data):
            decimated = self.eeg.decimate_to(256.)
            stride = max(1, len(decimated) // 4000)
            payload['eeg'] = {'channels': list(self.sensor_names),
                              'sample_rate_hz': 256., 'source_sample_rate_hz': self.eeg_sample_hz,
                              'samples': np.round(decimated[::stride], 4).tolist(),
                              'stride': stride, 'decimated_from_hz': self.eeg_sample_hz}
        return payload

    def result(self):
        stages = [h['stage'] for h in self.hypnogram]
        occupancy = {s: (stages.count(s) / len(stages) if stages else 0.) for s in STAGES}
        transitions = {}
        for a, b in zip(stages[:-1], stages[1:]):
            transitions[a + '->' + b] = transitions.get(a + '->' + b, 0) + 1
        payload = self.snapshot()
        payload['metrics'] = {
            'simulated_s': round(self.time_s, 3),
            'steps': self.net.steps,
            'stage_occupancy': occupancy,
            'estimates': len(stages),
            'transitions': transitions,
            'rates_hz': {k: round(float(np.mean(v)), 3) for k, v in self.trace['rates'].items() if v},
            'stage_schedule_forced': False,
            'classifier': 'threshold classifier on delta/theta fractions and modulator state',
            'validation_status': 'no empirical PSG comparison in this run; see docs/validation',
        }
        return payload


def run_sleep_circuit(output=None, config=None, progress=None):
    """Run a mechanistic sleep simulation and optionally record a JSON experiment."""
    from pathlib import Path
    import json
    cfg = config or SleepCircuitConfig()
    started = time.perf_counter()
    sim = SleepCircuitSimulation(cfg)
    result = sim.advance(progress=progress)
    result['metrics']['wall_seconds'] = time.perf_counter() - started
    result['metrics']['realtime_factor'] = result['metrics']['simulated_s'] / max(
        result['metrics']['wall_seconds'], 1e-9)
    result['metrics']['neuron_steps_per_second'] = int(
        result['metrics']['steps'] * sim.net.n / max(result['metrics']['wall_seconds'], 1e-9))
    if output:
        path = Path(output)
        path.mkdir(parents=True, exist_ok=False)
        (path / 'report.json').write_text(json.dumps(result, indent=2, allow_nan=False), encoding='utf-8')
        sim.net.save(path / 'network.json')
    return result

"""Mechanistic-circuit tests: neurons, synapses, modulators, EEG, emergence, API contract."""
import numpy as np
import pytest
from neuro_ml.circuits import CircuitNetwork
from neuro_ml.eeg import SENSORS, band_power, classify_stage, lead_field
from neuro_ml.neuromod import NeuromodulatorState, SPECS
from neuro_ml.sleep_circuit import (STAGE_INDEX, SleepCircuitConfig, SleepCircuitSimulation,
                                    build_sleep_circuit)


def _small(**overrides):
    base = dict(dt_ms=1., duration_s=2., cortex_e=120, cortex_i=30, tc=12, re=8,
                vlpo=8, orexin=8, lc=8, dr=8, ach=8, ach_rem=8)
    base.update(overrides)
    return SleepCircuitConfig(**base)


def test_single_neuron_needs_suprathreshold_input():
    net = CircuitNetwork(dt_ms=.5, seed=3)
    net.add_population('cell', 20, 'cortical_e')
    net.build()
    silent = net.__class__(dt_ms=.5, seed=3)
    silent.add_population('cell', 20, 'cortical_e')
    silent.build()
    silent_count = np.zeros(20, dtype=int)
    for _ in range(2000):
        silent_count += silent.step(np.zeros(20))
    assert silent_count.sum() == 0
    count = np.zeros(20, dtype=int)
    for _ in range(2000):
        count += net.step(np.full(20, 400.))
    assert count.sum() > 0
    assert 0 < net.rates()['cell'] < 1000


def test_inhibitory_synapse_reduces_target_rate():
    def build(synapse, weight):
        net = CircuitNetwork(dt_ms=.5, seed=5)
        net.add_population('drive', 10, 'excitatory')
        net.add_population('target', 10, 'cortical_e')
        net.connect('drive', 'target', weight_ns=weight, prob=1., delay_ms=1., synapse=synapse)
        net.build()
        return net
    excit = build('ampa', .8)
    inhib = build('gaba', .8)
    for _ in range(4000):
        excit.step(np.full(excit.n, 400.))
        inhib.step(np.full(inhib.n, 400.))
    assert excit.rates()['target'] > inhib.rates()['target']
    assert inhib.rates()['target'] < 5


def test_circuit_structure_and_provenance():
    cfg = _small()
    net = build_sleep_circuit(cfg)
    summary = net.summary()
    assert summary['neurons'] == sum(summary['cells'].values())
    assert summary['connections'] > 0 and summary['connection_rules'] > 10
    assert summary['literature_rules'] > 0 and summary['assumed_rules'] > 0
    rules = net.connection_report()
    assert all(r['provenance'] in {'literature', 'assumed'} for r in rules)
    assert all(r['synapse'] in {'ampa', 'nmda', 'gaba', 'gaba_slow'} for r in rules)
    # The configuration must not contain any forced stage schedule.
    assert not any('schedule' in name or 'stage' in name for name in vars(cfg))


def test_neuromodulator_steady_state_and_clearance():
    state = NeuromodulatorState()
    for _ in range(1200):
        state.step({'ach': 40., 'lc': 50., 'dr': 50., 'orexin': 20.}, .1)
    for name in state.value:
        assert state.value[name] == pytest.approx(1., abs=5e-3)
    released = state.value['acetylcholine']
    state.step({'ach': 0., 'lc': 0., 'dr': 0., 'orexin': 0.}, SPECS['acetylcholine'].clearance_tau_s)
    assert state.value['acetylcholine'] < released
    with pytest.raises(ValueError):
        state.step({'ach': -1.}, .1)
    with pytest.raises(ValueError):
        NeuromodulatorState(names=('dopamine',))


def test_lead_field_geometry_is_declared_and_deterministic():
    names, matrix = lead_field(['cortex_e', 'tc', 'lc'])
    assert names == list(SENSORS)
    assert matrix.shape == (3, len(SENSORS))
    assert np.isfinite(matrix).all()
    again = lead_field(['cortex_e', 'tc', 'lc'])[1]
    assert np.array_equal(matrix, again)
    # A deep source must project less strongly to the scalp than a cortical one.
    assert np.abs(matrix[0]).mean() > np.abs(matrix[2]).mean()
    with pytest.raises(ValueError):
        lead_field(['not_a_population'])


def test_classifier_separates_stages_from_signal_features():
    fs = 256.
    t = np.arange(int(fs * 8)) / fs
    delta = np.sin(2 * np.pi * 1.2 * t)
    theta = np.sin(2 * np.pi * 6. * t)
    awake = {'acetylcholine': 1.0, 'noradrenaline': 1.0, 'serotonin': 1.0, 'orexin': 1.0}
    asleep = {'acetylcholine': .1, 'noradrenaline': .1, 'serotonin': .1, 'orexin': .1}
    rem = {'acetylcholine': 1.0, 'noradrenaline': .05, 'serotonin': .05, 'orexin': .05}
    assert classify_stage(delta, fs, asleep)[0] in {'N2', 'N3'}
    assert classify_stage(theta, fs, rem)[0] == 'REM'
    assert classify_stage(theta, fs, awake)[0] == 'Wake'
    assert band_power(delta, fs)['delta'] > band_power(delta, fs)['theta']


def test_simulation_is_reproducible_and_reports_no_forced_schedule():
    a = SleepCircuitSimulation(_small(initial_pressure=.2), seed=11)
    b = SleepCircuitSimulation(_small(initial_pressure=.2), seed=11)
    a.advance(); b.advance()
    assert np.array_equal(a.neuron_spikes, b.neuron_spikes)
    payload = a.result()
    assert payload['metrics']['stage_schedule_forced'] is False
    assert payload['network']['neurons'] > 0
    assert set(payload['metrics']['stage_occupancy']) == set(STAGE_INDEX)
    assert payload['labels']['signal'].startswith('synthetic')


def test_pressure_drives_distinct_cortical_regimes():
    """Higher sleep pressure must reduce cortical output: an emergent, not scheduled, difference."""
    wake = SleepCircuitSimulation(_small(initial_pressure=.2), seed=4)
    sleep = SleepCircuitSimulation(_small(initial_pressure=.95), seed=4)
    wake.advance(); sleep.advance()
    wake_rate = wake.net.rates()['cortex_e']
    sleep_rate = sleep.net.rates()['cortex_e']
    assert wake_rate > sleep_rate
    assert wake.net.rates()['lc'] > sleep.net.rates()['lc']
    assert sleep.net.rates()['vlpo'] > 0
    # REM requires low monoamines plus the pontine REM-on drive, never a scheduled transition.
    rem = SleepCircuitSimulation(_small(initial_pressure=.95, rem_drive_pa=300.), seed=4)
    rem.advance()
    assert rem.net.rates()['ach_rem'] > 5
    assert rem.mod.value['noradrenaline'] < .2

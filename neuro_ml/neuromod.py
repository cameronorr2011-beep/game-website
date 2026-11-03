"""Normalized neuromodulator kinetics driven by explicit neural source populations.

Each modulator is an ordinary differential equation for a **normalized
concentration** ``m`` in [0, ~1.5]:

    dm/dt = (r_source(t) / r_reference - m) / tau_clearance

with ``r_source`` the measured firing rate of the population that releases it (Hz),
``r_reference`` the rate at which the steady state equals 1.0, and ``tau_clearance``
the combined reuptake/degradation time constant. This is the simplest defensible
kinetic model given that no extracellular concentration measurements are available
for this preparation: it is explicitly a normalized state, **not a measured
concentration in nM**, and the docstrings and reports must say so.

Release rates and clearance constants are assumed values in documented ranges
(acetylcholine and noradrenaline clear within seconds; serotonin within tens of
seconds). Receptor effects are implemented in :mod:`neuro_ml.sleep_circuit` with
their signs cited per target, so the modulator state does something to the
simulated circuits rather than only being plotted.
"""
from dataclasses import dataclass, asdict
import numpy as np


@dataclass(frozen=True)
class ModulatorSpec:
    name: str
    source: str
    reference_hz: float
    clearance_tau_s: float
    units: str = 'normalized concentration (steady state 1.0 at reference firing rate)'
    receptor_effects: str = ''


#: Assumed kinetics. ``reference_hz`` is the source firing rate that holds the
#: normalized concentration at 1.0; clearance taus are documented orders of magnitude.
SPECS = {
    'acetylcholine': ModulatorSpec(
        'acetylcholine', 'ach', 40., 2.0,
        receptor_effects='depolarizes cortex and thalamus; suppresses slow-wave synchrony'),
    'noradrenaline': ModulatorSpec(
        'noradrenaline', 'lc', 50., 3.0,
        receptor_effects='excitatory bias on cortex; inhibitory bias on VLPO'),
    'serotonin': ModulatorSpec(
        'serotonin', 'dr', 50., 5.0,
        receptor_effects='inhibits the pontine cholinergic REM-on pool; cortical excitation'),
    'orexin': ModulatorSpec(
        'orexin', 'orexin', 20., 10.0,
        receptor_effects='excitatory drive to wake nuclei and cortex; inhibited by VLPO'),
}


class NeuromodulatorState:
    """Vectorized first-order kinetics for the implemented modulators."""

    def __init__(self, names=tuple(SPECS), initial=None):
        unknown = set(names) - set(SPECS)
        if unknown:
            raise ValueError('Unknown modulator: ' + ', '.join(sorted(unknown)))
        self.names = tuple(names)
        self.specs = [SPECS[n] for n in self.names]
        self.value = {n: 0. if initial is None else float(initial.get(n, 0.)) for n in self.names}
        for name, value in self.value.items():
            if value < 0 or not np.isfinite(value):
                raise ValueError('Modulator states must be finite and nonnegative')

    def step(self, rates_hz, dt_s):
        if dt_s <= 0 or not np.isfinite(dt_s):
            raise ValueError('Positive timestep required')
        for spec in self.specs:
            rate = float(rates_hz.get(spec.source, 0.))
            if not np.isfinite(rate) or rate < 0:
                raise ValueError('Source firing rates must be finite and nonnegative')
            target = rate / spec.reference_hz
            gain = 1. - np.exp(-dt_s / spec.clearance_tau_s)
            self.value[spec.name] += gain * (target - self.value[spec.name])
        return dict(self.value)

    def as_dict(self):
        return dict(self.value)

    def report(self):
        return [asdict(s) | {'value': self.value[s.name]} for s in self.specs]

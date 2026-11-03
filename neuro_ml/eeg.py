"""EEG forward model: population synaptic currents projected to virtual sensors.

Documented approximation
------------------------
Each modelled population contributes one equivalent current dipole whose moment is
the mean net synaptic current of its neurons (sum of conductance x driving force,
i.e. a pA-like quantity). Dipoles are placed at declared centroids with declared
orientations, and projected to virtual electrodes on a unit sphere with

    gain[sensor, population] = (n_orientation . n_sensor-direction) / distance^2

This is a **single-dipole-per-population spherical-head approximation**. It omits
skull/scalp conductivities, cortical folding, gyral geometry, cerebrospinal fluid
shunts, and volume-conduction anisotropy. Output is in arbitrary model units
proportional to pA x gain and is **not calibrated to microvolts**. Synthetic signals
produced here are never recorded EEG, and reports must label them as model output.
"""
from dataclasses import dataclass
import numpy as np

#: Approximate 10-20 unit-sphere coordinates (x right, y anterior, z superior).
SENSORS = {
    'Fz': (0., .719, .695), 'Cz': (0., 0., 1.), 'Pz': (0., -.719, .695),
    'Oz': (0., -.951, .309), 'C3': (-.719, 0., .695), 'C4': (.719, 0., .695),
}

#: Population centroid and orientation. Deep structures point away from the scalp,
#: which is why their contribution to surface sensors is small and polarity-inverted.
SOURCES = {
    'cortex_e': ((0., 0., .70), (0., 0., 1.)),
    'cortex_i': ((0., 0., .68), (0., 0., 1.)),
    'tc': ((0., 0., .05), (0., 0., 1.)),
    're': ((0., 0., .05), (0., 0., 1.)),
    'vlpo': ((0., .1, .05), (0., 1., 0.)),
    'orexin': ((0., .05, 0.), (0., 1., 0.)),
    'lc': ((0., -.05, -.45), (0., -1., 0.)),
    'dr': ((0., -.05, -.45), (0., -1., 0.)),
    'ach_wake': ((0., .02, -.15), (0., 1., 0.)),
    'ach_rem': ((0., -.02, -.35), (0., -1., 0.)),
}


def _unit(vector):
    vector = np.asarray(vector, dtype=float)
    return vector / np.linalg.norm(vector)


def lead_field(populations, sensors=SENSORS, sources=SOURCES):
    """Return (sensor names, matrix[population, sensor]) with documented geometry."""
    names = [p for p in populations if p in sources]
    missing = [p for p in populations if p not in sources]
    if missing:
        raise ValueError('No declared EEG source for: ' + ', '.join(missing))
    matrix = np.zeros((len(names), len(sensors)))
    sensor_names = list(sensors)
    for i, pop in enumerate(names):
        centroid, orientation = sources[pop]
        centroid = np.asarray(centroid, dtype=float)
        direction = _unit(orientation)
        for j, sensor in enumerate(sensor_names):
            position = _unit(sensors[sensor])
            offset = position - centroid
            distance = float(np.linalg.norm(offset))
            projection = float(direction @ _unit(offset))
            matrix[i, j] = projection / max(distance ** 2, 1e-6)
    return sensor_names, matrix


@dataclass
class EEGBuffer:
    """Ring-free accumulator sampled at the simulation rate, then decimated."""
    sample_rate_hz: float
    channels: tuple
    max_seconds: float = 600.

    def __post_init__(self):
        self.data = np.zeros((0, len(self.channels)))

    def append(self, values, every=1, counter=0):
        if counter % every == 0:
            self.data = np.vstack([self.data, np.asarray(values, dtype=float)[None, :]])
            limit = int(self.max_seconds * self.sample_rate_hz / every)
            if len(self.data) > limit:
                self.data = self.data[-limit:]

    def decimate_to(self, target_hz, lowpass_hz=45.):
        """Resample with polyphase filtering (scipy), preserving relative amplitude."""
        from scipy.signal import resample_poly
        if len(self.data) == 0:
            raise ValueError('No samples buffered')
        source = self.sample_rate_hz
        up = int(round(target_hz))
        down = int(round(source))
        from math import gcd
        divisor = gcd(up, down)
        signal = np.nan_to_num(self.data)
        return resample_poly(signal, up // divisor, down // divisor, axis=0)


def band_power(signal, sample_rate_hz, bands=None):
    from scipy.signal import welch
    signal = np.asarray(signal, dtype=float)
    if signal.ndim != 1 or len(signal) < 32 or sample_rate_hz <= 0:
        raise ValueError('One-dimensional signal of adequate length and positive sampling rate required')
    frequency, power = welch(signal, fs=sample_rate_hz, nperseg=min(len(signal), int(sample_rate_hz * 4)))
    bands = bands or {'delta': (.5, 4.), 'theta': (4., 8.), 'alpha': (8., 12.),
                      'sigma': (12., 16.), 'beta': (16., 30.), 'gamma': (30., 45.)}
    out = {}
    for name, (low, high) in bands.items():
        mask = (frequency >= low) & (frequency < high)
        out[name] = float(np.trapezoid(power[mask], frequency[mask])) if mask.sum() > 1 else 0.
    out['total'] = float(np.trapezoid(power[(frequency >= .5) & (frequency < 45.)],
                                     frequency[(frequency >= .5) & (frequency < 45.)]))
    return out


def classify_stage(channel, sample_rate_hz, modulators, config=None):
    """Measurement layer: infer a stage from signal features and modulator state.

    The classifier only *observes* the simulation. It never sets neural state. The
    thresholds below are heuristic and documented as such; they were set so the
    categories reproduce conventional descriptions (low-voltage mixed frequency,
    delta dominance, theta with cholinergic dominance and monoaminergic silence)
    and are not a clinical scorer.
    """
    #: Heuristic thresholds. Wake is keyed on monoaminergic tone rather than cholinergic
    #: tone so that a cholinergic-dominant, monoamine-silent state is not mislabelled
    #: as wakefulness. Delta fractions are fractions of 0.5-45 Hz power in the window.
    rules = {'delta_fraction': .30, 'n2_fraction': .12, 'wake_monoamine': .55,
             'rem_ach': .55, 'rem_monoamine': .35}
    if config:
        rules.update(config)
    power = band_power(channel, sample_rate_hz)
    total = max(power['total'], 1e-12)
    delta = power['delta'] / total
    theta = power['theta'] / total
    monoamines = (float(modulators.get('noradrenaline', 0.))
                  + float(modulators.get('serotonin', 0.))
                  + float(modulators.get('orexin', 0.)))
    arousal = monoamines
    if (modulators.get('acetylcholine', 0.) > rules['rem_ach']
            and monoamines < rules['rem_monoamine'] and theta > delta):
        return 'REM', {'delta': delta, 'theta': theta, 'arousal': arousal}
    if arousal > rules['wake_monoamine'] and delta < rules['n2_fraction']:
        return 'Wake', {'delta': delta, 'theta': theta, 'arousal': arousal}
    if delta >= rules['delta_fraction']:
        return 'N3', {'delta': delta, 'theta': theta, 'arousal': arousal}
    if delta >= rules['n2_fraction']:
        return 'N2', {'delta': delta, 'theta': theta, 'arousal': arousal}
    return 'N1', {'delta': delta, 'theta': theta, 'arousal': arousal}

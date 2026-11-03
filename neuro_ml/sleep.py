"""Two-process sleep-wake timing, an ultradian architecture scheduler and signal synthesis.

Scientific status
-----------------
Timing follows the two-process account: homeostatic pressure ``S`` rises during wake
and decays during sleep (Borbely 1982, *Hum Neurobiol* 1:195), and a circadian
oscillator ``C`` modulates the thresholds at which sleep begins and ends (Daan,
Beersma & Borbely 1984, *Am J Physiol* 246:R161). Signs and time scales follow that
literature; the numeric defaults are illustrative and were calibrated only against
aggregate architecture statistics, not fitted to any subject.

Inside a sleep episode an explicit scheduler places N1/N2/N3 and REM bouts using
durations that scale with homeostatic pressure and cycle index. This is a
**phenomenological generator**: the hypnogram is scheduled, not emergent from
coupled neuronal populations, and this is not a reimplementation of the
Phillips-Robinson flip-flop. It reproduces published *aggregate* architecture
ranges (stage percentages, REM latency, cycle count, first-night slow-wave
dominance) and nothing more.

``synthesize_stage`` produces band-limited model signal with the documented centre
frequencies of slow oscillation, sleep spindles, K-complexes and REM theta. The
result is synthetic model output in microvolt-equivalent units, never recorded EEG.
"""
from dataclasses import dataclass
import numpy as np

STAGES = ('Wake','N1','N2','N3','REM')

#: Published adult ranges used for validation. They are approximate meta-analytic
#: targets (percent of total sleep time, REM latency in minutes), transcribed from
#: the sleep-architecture literature rather than refitted to this model.
ARCHITECTURE_PROFILE = {
    'n1_fraction': (.02,.10),
    'n2_fraction': (.35,.60),
    'n3_fraction': (.08,.25),
    'rem_fraction': (.15,.28),
    'rem_latency_min': (60.,140.),
    'rem_periods': (4,6),
    'wake_fraction_total': (.35,.85),
}

_DEPTH = {0: 0.0, 1: 0.35, 2: 0.6, 3: 1.0, 4: 0.1}


@dataclass(frozen=True)
class SleepConfig:
    dt_s: float = 1.
    # Homeostatic pressure (Borbely two-process).
    tau_wake_h: float = 18.2
    tau_sleep_h: float = 6.
    initial_pressure: float = .25
    # Circadian oscillator and the permitted sleep window (sleep gate).
    circadian_phase_h: float = 15.5
    circadian_amplitude: float = .10
    start_hour_h: float = 8.
    night_start_h: float = 21.5
    night_end_h: float = 7.
    # Thresholds on pressure at which sleep starts and ends.
    onset_pressure: float = .72
    offset_pressure: float = .20
    noise: float = .008
    # Ultradian cycle and within-cycle bout durations (seconds).
    cycle_s: float = 5700.
    cycle_jitter_s: float = 240.
    n1_s: float = 360.
    n1_decay: float = .72
    n3_s: float = 3600.
    n3_decay: float = .55
    rem_s: float = 600.
    rem_growth: float = .60


class SleepRegulator:
    """Stateful sleep/wake model; ``step`` advances one ``dt_s`` and returns outputs."""

    stages = STAGES

    def __init__(self, config=None, seed=0):
        self.config = config or SleepConfig()
        c = self.config
        positive = [c.dt_s, c.tau_wake_h, c.tau_sleep_h, c.cycle_s, c.n1_s, c.n3_s, c.rem_s]
        if min(positive) <= 0 or c.dt_s > c.cycle_s / 10:
            raise ValueError('Invalid sleep parameters')
        if c.noise < 0 or not 0 <= c.initial_pressure <= 1 or not 0 < c.onset_pressure <= 1:
            raise ValueError('Invalid sleep parameters')
        if not 0 <= c.onset_pressure < 1 or c.offset_pressure >= c.onset_pressure:
            raise ValueError('Offset threshold must be below onset threshold')
        if not np.isfinite(list(vars(c).values())).all():
            raise ValueError('Nonfinite sleep parameter')
        self.rng = np.random.default_rng(seed)
        self.time_s = 0.
        self.pressure = float(c.initial_pressure)
        self.asleep = False
        self.stage = 0
        self.cycle = 0
        self._plan = []
        self._plan_index = 0
        self._stage_left_s = 0.
        self.sleep_onset_s = None
        self.rem_onsets_s = []

    # -- internal mechanics -------------------------------------------------
    def clock_hour(self):
        return (self.config.start_hour_h + self.time_s / 3600) % 24

    def _in_night(self, hour):
        c = self.config
        return hour >= c.night_start_h or hour < c.night_end_h

    def _start_cycle(self):
        c = self.config
        cycle_s = max(3600., c.cycle_s + self.rng.normal(0, c.cycle_jitter_s))
        rem_s = c.rem_s * (1 + c.rem_growth * self.cycle)
        nrem_s = max(1200., cycle_s - rem_s)
        n1_s = c.n1_s * c.n1_decay ** self.cycle
        # Slow-wave bout length follows the documented dependence on homeostatic
        # pressure: more pressure, deeper and longer early N3.
        pressure_factor = float(np.clip(self.pressure / c.onset_pressure, 0., 1.25))
        n3_s = c.n3_s * c.n3_decay ** self.cycle * pressure_factor
        n3_s = min(n3_s, max(0., nrem_s - n1_s - 600.))
        n2_s = max(0., nrem_s - n1_s - n3_s)
        plan = [(1, n1_s), (2, n2_s / 2), (3, n3_s), (2, n2_s / 2), (4, rem_s)]
        self._plan = [(stage, dur) for stage, dur in plan if dur > 0]
        self._plan_index = 0
        self._stage_left_s = self._plan[0][1]
        self.stage = self._plan[0][0]

    def _advance_stage(self):
        self._plan_index += 1
        if self._plan_index >= len(self._plan):
            self.cycle += 1
            self._start_cycle()
            return
        self.stage, self._stage_left_s = self._plan[self._plan_index]
        if self.stage == 4:
            self.rem_onsets_s.append(self.time_s)

    # -- public API ---------------------------------------------------------
    def step(self):
        c = self.config
        dt = c.dt_s
        hour = self.clock_hour()
        circadian = float(np.cos(2 * np.pi * (hour - c.circadian_phase_h) / 24))
        if self.asleep:
            self.pressure += -self.pressure * dt / (c.tau_sleep_h * 3600)
        else:
            self.pressure += (1 - self.pressure) * dt / (c.tau_wake_h * 3600)
        self.pressure = float(np.clip(self.pressure, 0., 1.))

        jitter = c.noise * self.rng.normal()
        if self.asleep:
            wake_due = (not self._in_night(hour)) or (
                self.pressure <= c.offset_pressure + c.circadian_amplitude * circadian + jitter)
            if wake_due:
                self.asleep = False
                self.stage = 0
                self._plan = []
                self._stage_left_s = 0.
            else:
                self._stage_left_s -= dt
                if self._stage_left_s <= 0:
                    self._advance_stage()
        else:
            ready = (self._in_night(hour)
                     and self.pressure >= c.onset_pressure + c.circadian_amplitude * circadian + jitter)
            if ready:
                self.asleep = True
                self.cycle = 0
                self.sleep_onset_s = self.time_s
                self._start_cycle()

        stage = self.stage if self.asleep else 0
        depth = _DEPTH[stage] if self.asleep else 0.
        self.time_s += dt
        return {
            'time_s': self.time_s, 'stage': stage, 'pressure': self.pressure, 'circadian': circadian,
            'wake': 0. if self.asleep else 1., 'sleep': 1. if self.asleep else 0.,
            'rem': 1. if stage == 4 else 0., 'depth': depth,
            # Documented qualitative modulator directions: acetylcholine is high in
            # wake and REM, monoamines are lowest in REM. Dimensionless proxies.
            'acetylcholine_proxy': 1. if stage in (0, 4) else .35,
            'monoamine_proxy': (1., .45, .3, .25, .05)[stage],
            'drive_modulation': .5 * (0. if self.asleep else 1.) - .5 * depth,
            'coupling_scale': 1 + .3 * depth,
        }

    def run(self, hours):
        steps = round(hours * 3600 / self.config.dt_s)
        if steps <= 0:
            raise ValueError('Positive duration required')
        rows = [self.step() for _ in range(steps)]
        return {key: np.array([row[key] for row in rows]) for key in rows[0]}


def architecture_metrics(result, dt_s):
    """Aggregate hypnogram statistics computed from simulated stage labels."""
    stage = np.asarray(result['stage'])
    total_s = len(stage) * dt_s
    asleep = stage != 0
    sleep_s = float(asleep.sum() * dt_s)
    if sleep_s <= 0 or not asleep.any():
        raise ValueError('No sleep observed; architecture undefined')
    first, last = np.flatnonzero(asleep)[[0, -1]]
    episode = stage[first:last + 1]
    fraction = lambda s: float(np.mean(episode == s))
    rem = episode == 4
    edges = np.diff(np.r_[0, rem.astype(np.int8), 0])
    starts, ends = np.flatnonzero(edges == 1), np.flatnonzero(edges == -1)
    bouts = [(b - a) * dt_s for a, b in zip(starts, ends) if (b - a) * dt_s >= 60]
    half = len(episode) // 2
    return {
        'sleep_seconds': sleep_s, 'recording_seconds': total_s,
        'wake_fraction_total': float(1 - sleep_s / total_s),
        'n1_fraction': fraction(1), 'n2_fraction': fraction(2),
        'n3_fraction': fraction(3), 'rem_fraction': fraction(4),
        'rem_latency_min': float(starts[0] * dt_s / 60) if len(starts) else float('nan'),
        'rem_periods': len(bouts), 'rem_bout_min': [b / 60 for b in bouts],
        'n3_first_half_s': float(np.sum(episode[:half] == 3) * dt_s),
        'n3_second_half_s': float(np.sum(episode[half:] == 3) * dt_s),
    }


def check_architecture(metrics, profile=None):
    """Compare measured architecture against published ranges; failures are explicit."""
    ranges = profile or ARCHITECTURE_PROFILE
    checks, failures = {}, []
    for name, (low, high) in ranges.items():
        value = metrics.get(name)
        ok = value is not None and np.isfinite(value) and low <= value <= high
        checks[name] = {'value': value, 'range': [low, high], 'passed': bool(ok)}
        if not ok:
            failures.append(name)
    dominance = metrics['n3_first_half_s'] > metrics['n3_second_half_s']
    checks['n3_first_half_dominance'] = {
        'value': [metrics['n3_first_half_s'], metrics['n3_second_half_s']], 'passed': bool(dominance)}
    if not dominance:
        failures.append('n3_first_half_dominance')
    return {'checks': checks, 'failures': failures, 'passed': not failures,
            'profile': {k: list(v) for k, v in ranges.items()}}


@dataclass(frozen=True)
class OscillationConfig:
    fs_hz: float = 200.
    noise_uv: float = 5.
    alpha_hz: float = 10.
    theta_hz: float = 6.
    spindle_hz: float = 13.
    slow_hz: float = .75


def _bursts(n, fs, rng, mean_interval_s, dur_range, freq_hz, amp_uv, start_offset_s=0.):
    """Gaussian-windowed oscillatory bursts at Poisson-distributed onset times."""
    t = np.arange(n) / fs
    signal = np.zeros(n)
    onset = start_offset_s + rng.exponential(mean_interval_s)
    while onset < n / fs:
        dur = rng.uniform(*dur_range)
        lo = int(max(0, (onset - dur / 2) * fs))
        hi = int(min(n, (onset + dur / 2) * fs))
        if hi > lo:
            tt = t[lo:hi] - onset
            envelope = np.exp(-0.5 * (tt / (dur / 5)) ** 2)
            phase = 2 * np.pi * freq_hz * tt + rng.uniform(0, 2 * np.pi)
            signal[lo:hi] += amp_uv * envelope * np.sin(phase)
        onset += rng.exponential(mean_interval_s) + dur
    return signal


def _kcomplexes(n, fs, rng, mean_interval_s=75., amp_uv=70., start_offset_s=5.):
    """Biphasic slow transients; shape is illustrative, not a fitted template."""
    t = np.arange(n) / fs
    signal = np.zeros(n)
    onset = start_offset_s + rng.exponential(mean_interval_s)
    while onset < n / fs:
        window = (t > onset - .2) & (t < onset + 1.4)
        tt = t[window] - onset
        signal[window] += amp_uv * (np.exp(-0.5 * (tt / .12) ** 2)
                                    - .55 * np.exp(-0.5 * ((tt - .55) / .3) ** 2))
        onset += rng.exponential(mean_interval_s)
    return signal


def synthesize_stage(stage, duration_s, config=None, rng=None):
    """Synthesize model signal for one stage; units are microvolt-equivalent."""
    c = config or OscillationConfig()
    if duration_s <= 0 or c.fs_hz <= 0:
        raise ValueError('Positive duration and sampling rate required')
    rng = rng or np.random.default_rng(0)
    n = int(round(duration_s * c.fs_hz))
    t = np.arange(n) / c.fs_hz
    noise = lambda sd: rng.normal(0, sd, n)
    slow = lambda amp: amp * np.sin(2 * np.pi * (c.slow_hz + rng.normal(0, .03)) * t + rng.uniform(0, 6.28))
    theta = lambda amp: amp * np.sin(2 * np.pi * (c.theta_hz + rng.normal(0, .3)) * t + rng.uniform(0, 6.28))
    alpha = lambda amp: amp * np.sin(2 * np.pi * (c.alpha_hz + rng.normal(0, .4)) * t + rng.uniform(0, 6.28))
    if stage == 0:      # Wake: alpha rhythm with mixed higher-frequency activity.
        signal = alpha(28) * (1 + .3 * np.sin(2 * np.pi * .25 * t)) + noise(c.noise_uv) + _bursts(
            n, c.fs_hz, rng, 3., (.3, .8), 20., 8.)
    elif stage == 1:    # N1: theta replaces alpha; vertex transients.
        signal = theta(14) + .3 * alpha(9) + noise(c.noise_uv + 1) + _bursts(
            n, c.fs_hz, rng, 8., (.2, .5), 5.5, 12.)
    elif stage == 2:    # N2: spindles and K-complexes on a theta background.
        signal = (theta(6) + .5 * slow(8) + noise(c.noise_uv)
                  + _bursts(n, c.fs_hz, rng, 6., (.7, 1.5), c.spindle_hz, 30.)
                  + _kcomplexes(n, c.fs_hz, rng))
    elif stage == 3:    # N3: slow oscillation with delta and riding spindles.
        signal = (slow(70) + .5 * slow(35) + .3 * theta(5) + noise(c.noise_uv)
                  + _bursts(n, c.fs_hz, rng, 9., (.6, 1.2), c.spindle_hz, 14.))
    elif stage == 4:    # REM: theta-dominated low-voltage mixed frequency.
        signal = theta(16) + noise(c.noise_uv + 1) + _bursts(
            n, c.fs_hz, rng, 12., (.2, .5), 38., 5.)
    else:
        raise ValueError('Unknown sleep stage')
    return {'stage': STAGES[stage], 'signal': signal, 'fs_hz': c.fs_hz,
            'units': 'microvolt-equivalent model units, not calibrated to a montage'}


def spectral_metrics(signal, sample_rate_hz):
    """Welch spectrum in signal-units squared/Hz; excludes DC for peak."""
    from scipy.signal import welch
    signal = np.asarray(signal, dtype=float)
    if signal.ndim != 1 or len(signal) < 8 or not np.isfinite(signal).all() or sample_rate_hz <= 0:
        raise ValueError('Finite one-dimensional signal and positive sampling rate required')
    frequencies, power = welch(signal, fs=sample_rate_hz, nperseg=min(len(signal), round(sample_rate_hz * 4)))
    peak = float(frequencies[1 + np.argmax(power[1:])])
    bands = {}
    for name, low, high in [('delta', .5, 4), ('theta', 4, 8), ('alpha', 8, 12),
                            ('sigma', 12, 16), ('beta', 16, 30), ('gamma', 30, 80)]:
        mask = (frequencies >= low) & (frequencies < high)
        bands[name] = float(np.sum(power[mask]) * (frequencies[1] - frequencies[0]))
    return {'peak_hz': peak, 'band_power': bands, 'sample_rate_hz': sample_rate_hz}

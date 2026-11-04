"""Neuro-ML Sleep Lab — Vercel Python endpoint.

Runs a *real* spiking-circuit simulation for each request. Nothing is cached, replayed
or fabricated: the JSON returned is computed by integrating the network below.

This is the numpy-only deployment of the model in `neuro_ml/` (the research package
uses SciPy sparse matrices). The equations, population sizes, weight rules and
provenance labels are the same; only the linear-algebra backend differs. Because a
serverless invocation is stateless and time-limited, each request simulates a short
window (1-4 s) and there is no cross-request state: the browser cannot pause or resume
a biological night here. Long runs belong on an always-on host.

Limitations that the UI repeats to the user:
  * simulated EEG is model output of a single-dipole-per-population forward model,
    not recorded EEG, and is not calibrated to microvolts;
  * stages come from a heuristic classifier, not a clinical scorer;
  * weights are assumed model parameters, not measured conductances.
"""
import json
import time
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

import numpy as np

DT_MS = 1.0
STAGES = ('Wake', 'N1', 'N2', 'N3', 'REM')
STAGE_INDEX = {name: i for i, name in enumerate(STAGES)}

#: Cell classes. Conductances nS, capacitance pF, potentials mV, times ms.
CELLS = {
    'ce': dict(cm=200., gl=10., el=-70., vt=-50., vr=-62., tref=2., ta=150., inc=.30, gmax=14., gt=0., eca=120., th=85.),
    'ci': dict(cm=100., gl=10., el=-70., vt=-47., vr=-60., tref=1., ta=40., inc=.02, gmax=2., gt=0., eca=120., th=85.),
    'tc': dict(cm=200., gl=10., el=-65., vt=-55., vr=-70., tref=2., ta=80., inc=.05, gmax=4., gt=2.2, eca=120., th=85.),
    're': dict(cm=120., gl=10., el=-70., vt=-55., vr=-72., tref=2., ta=60., inc=.08, gmax=4., gt=1.6, eca=120., th=60.),
    'exc': dict(cm=180., gl=10., el=-65., vt=-50., vr=-65., tref=2., ta=100., inc=.06, gmax=4., gt=0., eca=120., th=85.),
    'inh': dict(cm=120., gl=10., el=-65., vt=-50., vr=-65., tref=2., ta=80., inc=.08, gmax=4., gt=0., eca=120., th=85.),
}

POPULATIONS = [
    ('cortex_e', 180, 'ce', 'cortical excitatory'),
    ('cortex_i', 45, 'ci', 'cortical inhibitory'),
    ('tc', 20, 'tc', 'thalamic relay (T current)'),
    ('re', 16, 're', 'thalamic reticular (T current)'),
    ('vlpo', 14, 'inh', 'preoptic sleep-promoting'),
    ('orexin', 14, 'exc', 'hypothalamic wake-promoting'),
    ('lc', 10, 'exc', 'noradrenergic (LC)'),
    ('dr', 10, 'exc', 'serotonergic (DR)'),
    ('ach_wake', 10, 'exc', 'basal-forebrain cholinergic'),
    ('ach_rem', 10, 'exc', 'pontine REM-on cholinergic'),
]

#: (source, target, weight nS, probability, delay ms, synapse, provenance, note)
RULES = [
    ('cortex_e', 'cortex_e', .22, .08, 2., 'ampa', 'literature', 'recurrent cortical excitation'),
    ('cortex_e', 'cortex_i', .55, .20, 2., 'ampa', 'literature', 'cortical E->I'),
    ('cortex_i', 'cortex_e', 1.30, .20, 2., 'gaba', 'literature', 'cortical feedback inhibition'),
    ('cortex_i', 'cortex_i', .50, .15, 2., 'gaba', 'literature', 'interneuron inhibition'),
    ('tc', 'cortex_e', .40, .12, 3., 'ampa', 'literature', 'thalamocortical relay'),
    ('cortex_e', 'tc', .28, .08, 3., 'ampa', 'literature', 'corticothalamic feedback'),
    ('cortex_e', 're', .35, .12, 3., 'ampa', 'literature', 'cortex excites reticular nucleus'),
    ('re', 'tc', 1.60, .25, 2., 'gaba', 'literature', 'reticular inhibition of relay cells'),
    ('tc', 're', .18, .15, 2., 'ampa', 'literature', 'relay collaterals to reticular'),
    ('re', 're', .45, .15, 2., 'gaba', 'literature', 'reticular mutual inhibition'),
    ('vlpo', 'orexin', 2.2, .5, 3., 'gaba', 'literature', 'VLPO inhibits wake nuclei'),
    ('vlpo', 'lc', 2.2, .5, 3., 'gaba', 'literature', 'VLPO inhibits wake nuclei'),
    ('vlpo', 'dr', 2.2, .5, 3., 'gaba', 'literature', 'VLPO inhibits wake nuclei'),
    ('vlpo', 'ach_wake', 2.2, .5, 3., 'gaba', 'literature', 'VLPO inhibits wake nuclei'),
    ('orexin', 'vlpo', 1.6, .4, 3., 'gaba', 'literature', 'wake nuclei inhibit VLPO (simplified)'),
    ('lc', 'vlpo', 1.6, .4, 3., 'gaba', 'literature', 'wake nuclei inhibit VLPO (simplified)'),
    ('dr', 'vlpo', 1.6, .4, 3., 'gaba', 'literature', 'wake nuclei inhibit VLPO (simplified)'),
    ('ach_wake', 'vlpo', 1.6, .4, 3., 'gaba', 'literature', 'wake nuclei inhibit VLPO (simplified)'),
    ('orexin', 'lc', .9, .4, 2., 'ampa', 'literature', 'orexin excites wake nuclei'),
    ('orexin', 'dr', .9, .4, 2., 'ampa', 'literature', 'orexin excites wake nuclei'),
    ('orexin', 'ach_wake', .9, .4, 2., 'ampa', 'literature', 'orexin excites wake nuclei'),
    ('ach_wake', 'cortex_e', .14, .08, 3., 'ampa', 'literature', 'cholinergic cortical activation'),
    ('ach_wake', 'tc', .10, .10, 3., 'ampa', 'literature', 'cholinergic thalamic activation'),
    ('ach_rem', 'cortex_e', .14, .08, 3., 'ampa', 'literature', 'cholinergic cortical activation'),
    ('ach_rem', 'tc', .10, .10, 3., 'ampa', 'literature', 'cholinergic thalamic activation'),
    ('lc', 'cortex_e', .10, .06, 3., 'ampa', 'assumed', 'fast component of a modulatory projection'),
    ('dr', 'ach_rem', 1.1, .35, 3., 'gaba', 'literature', 'serotonin inhibits REM-on pool'),
    ('lc', 'ach_rem', .9, .35, 3., 'gaba', 'literature', 'noradrenaline inhibits REM-on pool'),
]

FAMILY = {'ampa': ('e1', 5.), 'nmda': ('e2', 80.), 'gaba': ('i1', 9.), 'gaba_slow': ('i2', 40.)}
REVERSAL = {'e1': 0., 'e2': 0., 'i1': -82., 'i2': -82.}

SENSORS = {'Fz': (0., .719, .695), 'Cz': (0., 0., 1.), 'Pz': (0., -.719, .695),
           'Oz': (0., -.951, .309), 'C3': (-.719, 0., .695), 'C4': (.719, 0., .695)}
SOURCES = {
    'cortex_e': ((0., 0., .70), (0., 0., 1.)), 'cortex_i': ((0., 0., .68), (0., 0., 1.)),
    'tc': ((0., 0., .05), (0., 0., 1.)), 're': ((0., 0., .05), (0., 0., 1.)),
    'vlpo': ((0., .1, .05), (0., 1., 0.)), 'orexin': ((0., .05, 0.), (0., 1., 0.)),
    'lc': ((0., -.05, -.45), (0., -1., 0.)), 'dr': ((0., -.05, -.45), (0., -1., 0.)),
    'ach_wake': ((0., .02, -.15), (0., 1., 0.)), 'ach_rem': ((0., -.02, -.35), (0., -1., 0.)),
}

MOD_SPECS = {'acetylcholine': ('ach', 40., 2.0), 'noradrenaline': ('lc', 50., 3.0),
             'serotonin': ('dr', 50., 5.0), 'orexin': ('orexin', 20., 10.0)}


def _unit(v):
    v = np.asarray(v, dtype=float)
    return v / np.linalg.norm(v)


def _lead_field(names):
    sensors = list(SENSORS)
    matrix = np.zeros((len(names), len(sensors)))
    for i, pop in enumerate(names):
        centroid, orientation = SOURCES[pop]
        centroid = np.asarray(centroid, dtype=float)
        direction = _unit(orientation)
        for j, sensor in enumerate(sensors):
            offset = _unit(SENSORS[sensor]) - centroid
            distance = max(float(np.linalg.norm(offset)), 1e-6)
            matrix[i, j] = float(direction @ _unit(offset)) / distance ** 2
    return sensors, matrix


def build(seed=7):
    rng = np.random.default_rng(seed)
    offsets, params, n_total = {}, {}, 0
    for name, count, cell, _role in POPULATIONS:
        offsets[name] = (n_total, n_total + count)
        params[name] = CELLS[cell]
        n_total += count
    n = n_total
    p = {k: np.zeros(n) for k in ('cm', 'gl', 'el', 'vt', 'vr', 'tref', 'ta', 'inc', 'gmax', 'gt', 'eca', 'th')}
    v = np.zeros(n)
    for name, _count, _cell, _role in POPULATIONS:
        a, b = offsets[name]
        cfg = params[name]
        for key in p:
            p[key][a:b] = cfg[key]
        v[a:b] = cfg['el']
    h_t = 1. / (1. + np.exp((v + 80.) / 5.))
    groups = {}
    for src, dst, weight, prob, delay, synapse, _prov, _note in RULES:
        s0, s1 = offsets[src]
        d0, d1 = offsets[dst]
        ns, nd = s1 - s0, d1 - d0
        count = max(1, int(round(ns * nd * prob)))
        local_src = rng.integers(0, ns, count)
        local_dst = rng.integers(0, nd, count)
        fam = FAMILY[synapse][0]
        key = (fam, int(round(delay / DT_MS)))
        if key not in groups:
            groups[key] = ([], [], [])
        groups[key][0].append(np.full(count, weight))
        groups[key][1].append(local_src + s0)
        groups[key][2].append(local_dst + d0)
    edges = []
    for (fam, delay), (w, s, d) in groups.items():
        edges.append({'family': fam, 'delay': delay,
                      'w': np.concatenate(w), 'src': np.concatenate(s), 'dst': np.concatenate(d)})
    return {'n': n, 'offsets': offsets, 'p': p, 'v': v, 'h': h_t, 'edges': edges,
            'synapses': int(sum(len(e['w']) for e in edges)), 'seed': seed}


def simulate(pressure=0.25, rem_drive=0.0, seconds=2.0, seed=7):
    started = time.perf_counter()
    net = build(seed)
    n, p = net['n'], net['p']
    rng = np.random.default_rng(seed + 1)
    v = net['v'].copy()
    h_t = net['h'].copy()
    g = {fam: np.zeros(n) for fam in REVERSAL}
    w_adapt = np.zeros(n)
    refr = np.zeros(n)
    rate = np.zeros(n)
    spikes_total = np.zeros(n, dtype=int)
    tau = {'e1': 5., 'e2': 80., 'i1': 9., 'i2': 40.}
    max_delay = max(e['delay'] for e in net['edges'])
    queue = {fam: np.zeros((max_delay + 1, n)) for fam in REVERSAL}
    noise = np.zeros(n)
    noise_decay = float(np.exp(-DT_MS / 20.))
    mods = {name: 0.0 for name in MOD_SPECS}
    steps = int(seconds * 1000. / DT_MS)
    eeg_every = max(1, int(round((1000. / DT_MS) / 250.)))
    sensors, field = _lead_field([pop[0] for pop in POPULATIONS])
    eeg = {s: [] for s in sensors}
    trace_t, trace_rates, trace_mods, trace_pressure = [], [], [], []
    hypnogram = []
    rate_snapshot = {}
    next_trace = 0.0
    next_classify = 1.0

    def clamp(x):
        return float(min(max(x, 0.), 1.))

    for step in range(steps):
        t_s = step * DT_MS / 1000.
        slot = step % (max_delay + 1)
        for fam in REVERSAL:
            g[fam] += queue[fam][slot]
            queue[fam][slot].fill(0.)
        total = p['gl'] * (v - p['el'])
        for fam, cond in g.items():
            total = total + cond * (v - REVERSAL[fam])
        total = total + w_adapt * (v + 90.)
        mask = p['gt'] > 0
        if mask.any():
            vv = v[mask]
            m_inf = 1. / (1. + np.exp(-(vv + 59.) / 6.2))
            total[mask] += p['gt'][mask] * m_inf ** 2 * h_t[mask] * (vv - p['eca'][mask])
            h_inf = 1. / (1. + np.exp((vv + 80.) / 5.))
            h_t[mask] += DT_MS * (h_inf - h_t[mask]) / p['th'][mask]
        ext = np.zeros(n)
        hour = (8. + t_s / 3600.) % 24
        circadian = float(np.cos(2 * np.pi * (hour - 15.5) / 24))
        wake_drive = 260. + 110. * circadian - 120. * pressure
        ach, ne, ser, orx = mods['acetylcholine'], mods['noradrenaline'], mods['serotonin'], mods['orexin']
        for name in ('orexin', 'lc', 'dr', 'ach_wake'):
            a, b = net['offsets'][name]
            ext[a:b] += wake_drive
        a, b = net['offsets']['vlpo']
        ext[a:b] += 300. * pressure - 60. * clamp(ne)
        a, b = net['offsets']['ach_wake']
        ext[a:b] += .6 * wake_drive + 90. * clamp(orx)
        a, b = net['offsets']['ach_rem']
        ext[a:b] += rem_drive + 30. - 140. * clamp(ser) - 70. * clamp(ne)
        for name, gain in (('lc', 60.), ('dr', 50.)):
            a, b = net['offsets'][name]
            ext[a:b] += gain * clamp(orx)
        a, b = net['offsets']['orexin']
        ext[a:b] += -50. * clamp(ne)
        ach, ne, ser = clamp(ach), clamp(ne), clamp(ser)
        a, b = net['offsets']['cortex_e']
        ext[a:b] += 160. + 50. * ach + 40. * ne + 10. * ser
        a, b = net['offsets']['cortex_i']
        ext[a:b] += 80. + 30. * ach + 20. * ne
        a, b = net['offsets']['tc']
        ext[a:b] += 90. + 40. * ach + 30. * ne - 20. * ser
        noise = noise * noise_decay + rng.normal(0., 45. * np.sqrt(2. * DT_MS / 20.), n)
        ext += noise
        active = refr <= 0.
        dv = -total / p['cm'] + ext / p['cm']
        v[active] += DT_MS * dv[active]
        v[~active] = p['vr'][~active]
        refr = np.maximum(0., refr - DT_MS)
        spikes = active & (v >= p['vt'])
        if spikes.any():
            v[spikes] = p['vr'][spikes]
            refr[spikes] = p['tref'][spikes]
            w_adapt[spikes] += p['inc'][spikes]
            spikes_total[spikes] += 1
        w_adapt *= np.exp(-DT_MS / p['ta'])
        np.minimum(w_adapt, p['gmax'], out=w_adapt)
        for fam in REVERSAL:
            g[fam] *= np.exp(-DT_MS / tau[fam])
        for edge in net['edges']:
            src, dst = edge['src'], edge['dst']
            arrive = (step + edge['delay']) % (max_delay + 1)
            if src.size:
                queue[edge['family']][arrive] += np.bincount(dst, weights=edge['w'] * spikes[src],
                                                             minlength=n)
        rate += spikes.astype(float) - rate * (DT_MS / 1000.)
        if step % eeg_every == 0:
            q = np.zeros(len(POPULATIONS))
            for i, (name, _c, _cell, _role) in enumerate(POPULATIONS):
                a, b = net['offsets'][name]
                q[i] = float((g['e1'][a:b] * (v[a:b] - 0.) + g['i1'][a:b] * (v[a:b] + 82.)).mean())
            signal = field.T @ q
            for i, s in enumerate(sensors):
                eeg[s].append(float(signal[i]))
        if t_s >= next_trace:
            trace_t.append(round(t_s, 2))
            pops = {name: round(float(rate[a:b].mean()), 2) for name, _c, _cell, _role in POPULATIONS
                    for a, b in [net['offsets'][name]]}
            trace_rates.append(pops)
            trace_mods.append({k: round(x, 3) for k, x in mods.items()})
            trace_pressure.append(round(pressure, 3))
            rate_snapshot = pops
            next_trace += .1
        if t_s >= next_classify:
            # 0.5 s cadence over up to 2 s of signal. A 1 s window is the minimum that can
            # resolve the 0.5-4 Hz delta band the heuristic depends on; the first window is
            # still the network's own warm-up from its initial condition, not an artefact of
            # the classifier, and later windows supersede it.
            next_classify += .5
            available = len(eeg['Cz'])
            window = np.asarray(eeg['Cz'][-min(500, available):]) if available >= 250 else None
            if window is not None:
                freqs, power = _spectrum(window, 250.)
                band = _bands(freqs, power)
                total = max(band['total'], 1e-9)
                delta, theta = band['delta'] / total, band['theta'] / total
                mono = mods['noradrenaline'] + mods['serotonin'] + mods['orexin']
                if mods['acetylcholine'] > .55 and mono < .35 and theta > delta:
                    stage = 'REM'
                elif mono > .55 and delta < .12:
                    stage = 'Wake'
                elif delta >= .30:
                    stage = 'N3'
                elif delta >= .12:
                    stage = 'N2'
                else:
                    stage = 'N1'
                hypnogram.append({'t_s': round(t_s, 2), 'stage': stage, 'index': STAGE_INDEX[stage],
                                  'delta': round(delta, 4), 'theta': round(theta, 4)})
        # modulator kinetics every 50 ms
        if step % 50 == 0:
            rates_now = {'ach': .5 * (rate[slice(*net['offsets']['ach_wake'])].mean()
                                      + rate[slice(*net['offsets']['ach_rem'])].mean()),
                         'lc': rate[slice(*net['offsets']['lc'])].mean(),
                         'dr': rate[slice(*net['offsets']['dr'])].mean(),
                         'orexin': rate[slice(*net['offsets']['orexin'])].mean()}
            for name, (source, reference, tau_s) in MOD_SPECS.items():
                target = rates_now[source] / reference
                mods[name] += (1. - np.exp(-.05 / tau_s)) * (target - mods[name])

    wall = time.perf_counter() - started
    # ---- package -----------------------------------------------------------
    cx, cy = [], []
    angle = np.linspace(0, 2 * np.pi, len(POPULATIONS) + 1)[:-1]
    for i, (name, count, _cell, _role) in enumerate(POPULATIONS):
        a, b = net['offsets'][name]
        centre = np.array([np.cos(angle[i]), np.sin(angle[i])]) * .62
        jitter = rng.normal(0, .045, (count, 2))
        cx.append(centre[0] + jitter[:, 0])
        cy.append(centre[1] + jitter[:, 1])
    cx, cy = np.concatenate(cx), np.concatenate(cy)
    neurons = []
    for i, (name, count, cell, role) in enumerate(POPULATIONS):
        a, b = net['offsets'][name]
        for j in range(a, b):
            neurons.append({'id': int(j), 'pop': name, 'cell': cell,
                            'x': round(float(cx[j]), 4), 'y': round(float(cy[j]), 4),
                            'spikes': int(spikes_total[j]), 'rate': round(float(rate[j]), 2)})
    freqs, power = _spectrum(np.asarray(eeg['Cz']), 250.)
    band = _bands(freqs, power)
    stride = max(1, len(eeg['Cz']) // 600)
    samples = [[round(eeg[s][k], 3) for k in range(0, len(eeg[s]), stride)] for s in sensors]
    stage_counts = {s: sum(1 for h in hypnogram if h['stage'] == s) for s in STAGES}
    occupancy = {s: round(c / max(len(hypnogram), 1), 3) for s, c in stage_counts.items()}
    peaks = dict(zip(freqs.round(2).tolist(), power.round(6).tolist()))
    return {
        'meta': {'neurons': n, 'synapses': net['synapses'], 'populations': len(POPULATIONS),
                 'connection_rules': len(RULES),
                 'literature_rules': sum(1 for r in RULES if r[6] == 'literature'),
                 'assumed_rules': sum(1 for r in RULES if r[6] == 'assumed'),
                 'dt_ms': DT_MS, 'simulated_s': round(steps * DT_MS / 1000., 3),
                 'wall_seconds': round(wall, 3),
                 'realtime_factor': round((steps * DT_MS / 1000.) / max(wall, 1e-9), 3),
                 'pressure': pressure, 'rem_drive': rem_drive, 'seed': seed},
        'neurons': neurons,
        # Compact triples preserve every instantiated synapse, including parallel
        # edges and self-connections. Family is the simulated conductance family.
        'synapses': [[int(src), int(dst), edge['family']]
                     for edge in net['edges']
                     for src, dst in zip(edge['src'], edge['dst'])],
        'populations': [{'name': name, 'n': count, 'role': role, 'cell': cell,
                         'rate_hz': rate_snapshot.get(name, 0.)}
                        for name, count, cell, role in POPULATIONS],
        'connections': [{'source': r[0], 'target': r[1], 'weight_ns': r[2], 'prob': r[3],
                         'delay_ms': r[4], 'synapse': r[5], 'provenance': r[6], 'note': r[7]}
                        for r in RULES],
        'trace': {'time_s': trace_t, 'rates': trace_rates, 'modulators': trace_mods,
                  'pressure': trace_pressure},
        'hypnogram': hypnogram,
        'eeg': {'channels': sensors, 'sample_rate_hz': 250., 'samples': samples,
                'stride': stride},
        'psd': {'freqs': [round(float(f), 2) for f in freqs], 'power': [round(float(p), 8) for p in power],
                'bands': {k: round(v, 4) for k, v in band.items()}},
        'modulators': {k: round(v, 4) for k, v in mods.items()},
        'metrics': {'stage_occupancy': occupancy, 'estimates': len(hypnogram),
                    'peak_hz': float(freqs[int(np.argmax(power[1:])) + 1]) if len(power) > 2 else 0.},
        'labels': {'eeg': 'synthetic model output from a single-dipole forward model — not recorded EEG, not microvolts',
                   'stages': 'heuristic classifier over simulated signal, not a clinical scorer',
                   'weights': 'assumed model parameters (nS), not measured conductances',
                   'scope': 'stateless short window per request; no cross-request state or full-night run'},
    }


def _spectrum(signal, fs):
    signal = np.asarray(signal, dtype=float)
    if signal.size < 32:
        return np.zeros(2), np.zeros(2)
    signal = signal - signal.mean()
    window = np.hanning(signal.size)
    spectrum = np.abs(np.fft.rfft(signal * window)) ** 2
    freqs = np.fft.rfftfreq(signal.size, 1. / fs)
    return freqs, spectrum


def _bands(freqs, power):
    bands = {'delta': (.5, 4.), 'theta': (4., 8.), 'alpha': (8., 12.),
             'sigma': (12., 16.), 'beta': (16., 30.), 'gamma': (30., 45.)}
    out = {}
    for name, (low, high) in bands.items():
        mask = (freqs >= low) & (freqs < high)
        out[name] = float(power[mask].sum()) if mask.any() else 0.
    mask = (freqs >= .5) & (freqs < 45.)
    out['total'] = float(power[mask].sum())
    return out


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        try:
            if parsed.path not in ('/api/sleep', '/api/sleep/'):
                self.send_error(404, 'Not found')
                return
            query = parse_qs(parsed.query)
            def number(key, default, low, high):
                try:
                    value = float(query.get(key, [default])[0])
                except (TypeError, ValueError):
                    raise ValueError(f'{key} must be a number')
                if not low <= value <= high:
                    raise ValueError(f'{key} must be within [{low}, {high}]')
                return value
            pressure = number('pressure', .25, 0., 1.)
            rem_drive = number('rem', 0., 0., 400.)
            seconds = number('seconds', 2., .5, 4.)
            seed = int(number('seed', 7, 0, 10 ** 6))
            payload = json.dumps(simulate(pressure, rem_drive, seconds, seed),
                                 allow_nan=False).encode()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(payload)))
            self.send_header('Cache-Control', 'no-store')
            self.end_headers()
            self.wfile.write(payload)
        except Exception as error:  # surfaced to the UI, never disguised
            body = json.dumps({'error': f'{type(error).__name__}: {error}'}).encode()
            self.send_response(400)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)

"""Explicit conductance-based point neurons with delayed sparse synapses.

Every neuron carries its own state: membrane potential, fast/slow excitatory and
inhibitory synaptic conductances, a calcium-dependent adaptation conductance, and
— where configured — a low-threshold calcium current with an inactivation variable
for thalamic burst behaviour. Spikes are produced by threshold crossing and
delivered through an explicit delay queue over a sparse connection matrix, so no
part of this module is a population rate model.

Parameter provenance
--------------------
Membrane and synaptic ranges follow qualitative values used for cortical
integrate-and-fire and thalamic relay/reticular models in the computational
neuroscience literature (Destexhe et al. 1996 for the T-current form). **These
specific numbers are not a fit to any recorded cell.** Every connection records
whether its sign and existence are literature-documented (``literature``) or
synthetically assumed (``assumed``); weights are model parameters in nS, never
measured conductances.
"""
from dataclasses import dataclass, field
from pathlib import Path
import json
import numpy as np
from scipy import sparse

#: Synapse family -> (kinetic class, decay tau in ms, reversal mV).
FAMILIES = {
    'ampa': ('e_fast', 5., 0.),
    'nmda': ('e_slow', 80., 0.),
    'gaba': ('i_fast', 9., -82.),
    'gaba_slow': ('i_slow', 40., -82.),
}
E_REV = {'e_fast': 0., 'e_slow': 0., 'i_fast': -82., 'i_slow': -82.}
TAU = {'e_fast': 5., 'e_slow': 80., 'i_fast': 9., 'i_slow': 40.}

#: Cell-class defaults. Conductances nS, capacitance pF, potentials mV, times ms.
#: Only the T-current shape and the broad ranges are literature-motivated; the rest
#: are assumed values chosen for stable integration at dt <= 0.5 ms.
CELLS = {
    # Calcium-activated K+ adaptation is what lets a cortical population alternate between
    # active and silent phases; the increment is assumed, not fitted.
    'cortical_e': dict(cm=200., g_leak=10., e_leak=-70., v_th=-50., v_reset=-62., t_ref=2.,
                       tau_adapt=150., adapt_inc=.30, g_adapt_max=14., g_t=0., e_ca=120., tau_h=85.),
    'cortical_i': dict(cm=100., g_leak=10., e_leak=-70., v_th=-47., v_reset=-60., t_ref=1.,
                       tau_adapt=40., adapt_inc=.02, g_adapt_max=2., g_t=0., e_ca=120., tau_h=85.),
    'thalamic_tc': dict(cm=200., g_leak=10., e_leak=-65., v_th=-55., v_reset=-70., t_ref=2.,
                        tau_adapt=80., adapt_inc=.05, g_adapt_max=4., g_t=2.2, e_ca=120., tau_h=85.),
    'thalamic_re': dict(cm=120., g_leak=10., e_leak=-70., v_th=-55., v_reset=-72., t_ref=2.,
                        tau_adapt=60., adapt_inc=.08, g_adapt_max=4., g_t=1.6, e_ca=120., tau_h=60.),
    'excitatory': dict(cm=180., g_leak=10., e_leak=-65., v_th=-50., v_reset=-65., t_ref=2.,
                       tau_adapt=100., adapt_inc=.06, g_adapt_max=4., g_t=0., e_ca=120., tau_h=85.),
    'inhibitory': dict(cm=120., g_leak=10., e_leak=-65., v_th=-50., v_reset=-65., t_ref=2.,
                       tau_adapt=80., adapt_inc=.08, g_adapt_max=4., g_t=0., e_ca=120., tau_h=85.),
}
E_K = -90.


@dataclass
class Population:
    name: str
    start: int
    n: int
    cell: str
    role: str
    description: str = ''

    @property
    def slice(self):
        return slice(self.start, self.start + self.n)


class CircuitNetwork:
    """Sparse conductance-based spiking network with explicit connectivity provenance."""

    def __init__(self, dt_ms=.25, seed=0):
        if not 0 < dt_ms <= 1.0:
            raise ValueError('dt_ms must be within (0, 1.0] ms: the fastest kinetic (AMPA, 5 ms) '
                             'requires at least five steps per time constant')
        self.dt = float(dt_ms)
        self.rng = np.random.default_rng(seed)
        self.populations = {}
        self._edges = []
        self._built = False
        self.steps = 0
        self.max_delay = 1

    # -- construction -------------------------------------------------------
    def add_population(self, name, n, cell, role='', description=''):
        if self._built:
            raise RuntimeError('Network already built')
        if name in self.populations or n <= 0 or cell not in CELLS:
            raise ValueError('Unique population name, positive size and known cell class required')
        start = sum(p.n for p in self.populations.values())
        pop = Population(name, start, int(n), cell, role, description)
        self.populations[name] = pop
        return pop

    def connect(self, source, target, *, weight_ns, prob=1., delay_ms=1., synapse='ampa',
                provenance='assumed', note=''):
        if self._built:
            raise RuntimeError('Network already built')
        if synapse not in FAMILIES:
            raise ValueError('Unknown synapse family: ' + str(synapse))
        if weight_ns < 0 or not 0 < prob <= 1 or delay_ms < self.dt or provenance not in {'literature', 'assumed'}:
            raise ValueError('Invalid connection parameters')
        self._edges.append({'source': source, 'target': target, 'synapse': synapse,
                            'weight_ns': float(weight_ns), 'prob': float(prob),
                            'delay_ms': float(delay_ms), 'provenance': provenance, 'note': note})

    def build(self):
        if self._built:
            raise RuntimeError('Already built')
        missing = {e['source'] for e in self._edges} | {e['target'] for e in self._edges}
        missing -= set(self.populations)
        if missing:
            raise ValueError('Connections reference unknown populations: ' + ', '.join(sorted(missing)))
        n = sum(p.n for p in self.populations.values())
        if n == 0:
            raise ValueError('Empty network')
        self.n = n
        self.v = np.zeros(n)
        self.g = {fam: np.zeros(n) for fam in TAU}
        self.w_adapt = np.zeros(n)
        self.h_t = np.zeros(n)
        self.refr = np.zeros(n)
        self.spikes = np.zeros(n, dtype=bool)
        self.last_spike_ms = np.full(n, -1e9)
        self.rate = np.zeros(n)
        p = {k: np.zeros(n) for k in ('cm', 'g_leak', 'e_leak', 'v_th', 'v_reset', 't_ref',
                                      'tau_adapt', 'adapt_inc', 'g_adapt_max', 'g_t', 'e_ca', 'tau_h')}
        for pop in self.populations.values():
            sl = slice(pop.start, pop.start + pop.n)
            defaults = CELLS[pop.cell]
            for key in p:
                p[key][sl] = defaults[key]
            self.v[sl] = defaults['e_leak']
            self.h_t[sl] = 1. / (1. + np.exp((defaults['e_leak'] + 80.) / 5.))
        self.p = p
        groups = {}
        for edge in self._edges:
            src, dst = self.populations[edge['source']], self.populations[edge['target']]
            if edge['prob'] >= 1.:
                rows = np.repeat(np.arange(dst.n), src.n)
                cols = np.tile(np.arange(src.n), dst.n)
            else:
                count = max(1, int(round(dst.n * src.n * edge['prob'])))
                rows = self.rng.integers(0, dst.n, count)
                cols = self.rng.integers(0, src.n, count)
            block = sparse.csr_matrix((np.full(len(rows), edge['weight_ns']), (rows, cols)),
                                      shape=(dst.n, src.n))
            block.sum_duplicates()
            if block.nnz == 0:
                continue
            delay = int(round(edge['delay_ms'] / self.dt))
            fam = FAMILIES[edge['synapse']][0]
            key = (fam, delay)
            coo = block.tocoo()
            add = sparse.csr_matrix((coo.data, (dst.start + coo.row, src.start + coo.col)), shape=(n, n))
            groups[key] = add if key not in groups else groups[key] + add
            self.max_delay = max(self.max_delay, delay)
        self._groups = [(fam, d, m.tocsr()) for (fam, d), m in sorted(groups.items())]
        self.queue = {fam: np.zeros((self.max_delay + 1, n)) for fam in TAU}
        self.edge_count = int(sum(m.nnz for _, _, m in self._groups))
        self._built = True
        return self

    # -- simulation ---------------------------------------------------------
    def step(self, external_pa=None):
        if not self._built:
            raise RuntimeError('Call build() first')
        dt, p = self.dt, self.p
        slot = self.steps % (self.max_delay + 1)
        for fam in TAU:
            self.g[fam] += self.queue[fam][slot]
            self.queue[fam][slot].fill(0.)
        v = self.v
        total = p['g_leak'] * (v - p['e_leak'])
        for fam, g in self.g.items():
            total = total + g * (v - E_REV[fam])
        total = total + self.w_adapt * (v - E_K)
        if p['g_t'].any():
            mask = p['g_t'] > 0
            vv = v[mask]
            m_inf = 1. / (1. + np.exp(-(vv + 59.) / 6.2))
            i_t = p['g_t'][mask] * m_inf ** 2 * self.h_t[mask] * (vv - p['e_ca'][mask])
            h_inf = 1. / (1. + np.exp((vv + 80.) / 5.))
            self.h_t[mask] += dt * (h_inf - self.h_t[mask]) / p['tau_h'][mask]
            total[mask] += i_t
        active = self.refr <= 0.
        dv = -total / p['cm']
        if external_pa is not None:
            dv = dv + np.asarray(external_pa, dtype=float) / p['cm']
        v[active] += dt * dv[active]
        v[~active] = p['v_reset'][~active]
        self.refr = np.maximum(0., self.refr - dt)
        spikes = active & (v >= p['v_th'])
        if spikes.any():
            v[spikes] = p['v_reset'][spikes]
            self.refr[spikes] = p['t_ref'][spikes]
            self.w_adapt[spikes] += p['adapt_inc'][spikes]
            self.last_spike_ms[spikes] = self.steps * dt
        self.w_adapt *= np.exp(-dt / p['tau_adapt'])
        np.minimum(self.w_adapt, p['g_adapt_max'], out=self.w_adapt)
        for fam in TAU:
            self.g[fam] *= np.exp(-dt / TAU[fam])
        for fam, delay, matrix in self._groups:
            self.queue[fam][(self.steps + delay) % (self.max_delay + 1)] += matrix @ spikes
        # Exponentially smoothed firing rate in Hz: each spike adds 1, decay time constant 1 s.
        self.rate += spikes.astype(float) - self.rate * (dt / 1000.)
        self.spikes = spikes
        self.steps += 1
        if not np.isfinite(v).all():
            raise FloatingPointError('Non-finite membrane potential')
        return spikes

    # -- measurement --------------------------------------------------------
    def rates(self):
        return {name: float(self.rate[pop.start:pop.start + pop.n].mean())
                for name, pop in self.populations.items()}

    def synaptic_dipoles(self):
        """Mean net synaptic current per population (pA-like), the EEG source proxy."""
        out = {}
        for name, pop in self.populations.items():
            sl = slice(pop.start, pop.start + pop.n)
            current = np.zeros(pop.n)
            for fam, g in self.g.items():
                current += g[sl] * (self.v[sl] - E_REV[fam])
            out[name] = float(current.mean())
        return out

    def connection_report(self):
        return [dict(e) for e in self._edges]

    def summary(self):
        return {'neurons': self.n, 'populations': len(self.populations),
                'connections': self.edge_count,
                'connection_rules': len(self._edges),
                'literature_rules': sum(e['provenance'] == 'literature' for e in self._edges),
                'assumed_rules': sum(e['provenance'] == 'assumed' for e in self._edges),
                'dt_ms': self.dt, 'cells': {k: p.n for k, p in self.populations.items()}}

    def save(self, path):
        Path(path).write_text(json.dumps({'dt_ms': self.dt, 'steps': self.steps,
                                          'populations': {k: {'n': p.n, 'cell': p.cell, 'role': p.role}
                                                          for k, p in self.populations.items()},
                                          'connections': self._edges}, indent=2), encoding='utf-8')

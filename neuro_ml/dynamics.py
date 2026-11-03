"""Explicitly parameterized numerical research models, not fitted physiology."""
from dataclasses import dataclass, asdict
from pathlib import Path
import json
import numpy as np
from scipy import sparse


@dataclass(frozen=True)
class LIFConfig:
    dt_ms: float = 0.5
    tau_m_ms: float = 20.0
    tau_syn_ms: float = 5.0
    rest_mv: float = -70.0
    reset_mv: float = -75.0
    threshold_mv: float = -55.0
    refractory_ms: float = 2.0
    resistance_mohm: float = 100.0
    tau_adapt_ms: float = 200.0
    adaptation_na: float = 0.0
    noise_mv: float = 0.0
    delay_ms: float = 1.0
    integrator: str = 'exact'

    def __post_init__(self):
        values = [v for v in asdict(self).values() if isinstance(v,(int,float))]
        if not np.isfinite(values).all():
            raise ValueError('Parameters must be finite')
        if min(self.dt_ms,self.tau_m_ms,self.tau_syn_ms,self.tau_adapt_ms,self.resistance_mohm) <= 0:
            raise ValueError('Time constants, timestep and resistance must be positive')
        if self.dt_ms > min(self.tau_m_ms,self.tau_syn_ms,self.tau_adapt_ms)/5:
            raise ValueError('Timestep too coarse for documented accuracy bound')
        if self.refractory_ms < 0 or self.noise_mv < 0 or self.adaptation_na < 0:
            raise ValueError('Refractory, noise and adaptation must be nonnegative')
        if self.threshold_mv <= max(self.reset_mv,self.rest_mv):
            raise ValueError('Threshold must exceed rest and reset')
        if self.delay_ms < self.dt_ms or not np.isclose(self.delay_ms/self.dt_ms,round(self.delay_ms/self.dt_ms)):
            raise ValueError('Delay must be a positive integer number of timesteps')
        if self.integrator not in {'exact','euler'}:
            raise ValueError('Unknown integrator')


class LIFNetwork:
    """Current-based LIF. weights[target,source] in nA/spike.

    Exact membrane solution assumes piecewise constant current within a step;
    synaptic and adaptation currents decay exponentially, including refractory.
    Grid-based spike timing and uniform delay are modeling assumptions.
    """
    def __init__(self, weights, config=None, seed=0):
        self.config = config or LIFConfig()
        self.weights = sparse.csr_matrix(weights,dtype=float)
        if self.weights.shape[0] != self.weights.shape[1] or not np.isfinite(self.weights.data).all():
            raise ValueError('Weights must be square and finite')
        self.rng = np.random.default_rng(seed)
        n = self.weights.shape[0]
        self.v = np.full(n,self.config.rest_mv)
        self.current = np.zeros(n)
        self.adaptation = np.zeros(n)
        self.refractory = np.zeros(n)
        self.delay_steps = round(self.config.delay_ms/self.config.dt_ms)
        self.queue = np.zeros((self.delay_steps+1,n))
        self.steps = 0

    def step(self, external_na=0.0):
        c = self.config
        external = np.broadcast_to(np.asarray(external_na,dtype=float),self.v.shape)
        if not np.isfinite(external).all():
            raise ValueError('External current must be finite')
        slot = self.steps % len(self.queue)
        self.current += self.queue[slot]
        self.queue[slot].fill(0)
        active = self.refractory <= 1e-10
        equilibrium = c.rest_mv+c.resistance_mohm*(external+self.current-self.adaptation)
        factor = 1-np.exp(-c.dt_ms/c.tau_m_ms) if c.integrator=='exact' else c.dt_ms/c.tau_m_ms
        self.v[active] += (equilibrium[active]-self.v[active])*factor
        if c.noise_mv:
            self.v[active] += self.rng.normal(0,c.noise_mv*np.sqrt(1-np.exp(-2*c.dt_ms/c.tau_m_ms)),active.sum())
        self.v[~active] = c.reset_mv
        self.current *= np.exp(-c.dt_ms/c.tau_syn_ms)
        self.adaptation *= np.exp(-c.dt_ms/c.tau_adapt_ms)
        self.refractory = np.maximum(0,self.refractory-c.dt_ms)
        spikes = active & (self.v >= c.threshold_mv)
        self.v[spikes] = c.reset_mv
        self.refractory[spikes] = c.refractory_ms
        self.adaptation[spikes] += c.adaptation_na
        if spikes.any():
            arrival = (self.steps+self.delay_steps) % len(self.queue)
            self.queue[arrival] += self.weights @ spikes.astype(float)
        self.steps += 1
        if not np.isfinite(self.v).all():
            raise FloatingPointError('Nonfinite membrane state')
        return spikes

    def run(self, duration_ms, external_na=0.0, record_indices=None, sample_every=1):
        count = round(duration_ms/self.config.dt_ms)
        if count <= 0 or not np.isclose(count*self.config.dt_ms,duration_ms) or sample_every < 1:
            raise ValueError('Duration must be a positive integral number of steps; sampling must be positive')
        indices = np.arange(min(16,len(self.v))) if record_indices is None else np.asarray(record_indices,dtype=int)
        events=[]; traces=[]; times=[]; counts=np.zeros(len(self.v),dtype=np.int64)
        for i in range(count):
            fired=self.step(external_na)
            neurons=np.flatnonzero(fired); counts+=fired
            if len(neurons): events.append(np.column_stack((np.full(len(neurons),self.steps*self.config.dt_ms),neurons)))
            if i % sample_every == 0:
                traces.append(self.v[indices].copy());times.append(self.steps*self.config.dt_ms)
        return {'spikes':np.concatenate(events) if events else np.empty((0,2)), 'voltage_mv':np.array(traces),
                'time_ms':np.array(times),'record_indices':indices,'rate_hz':counts/(duration_ms/1000)}

    def save(self,path):
        path=Path(path)
        with path.open('xb') as f:
            np.savez_compressed(f,v=self.v,current=self.current,adaptation=self.adaptation,refractory=self.refractory,
                queue=self.queue,steps=np.array(self.steps),config=np.array(json.dumps(asdict(self.config))),
                rng=np.array(json.dumps(self.rng.bit_generator.state)),data=self.weights.data,
                indices=self.weights.indices,indptr=self.weights.indptr,shape=np.array(self.weights.shape))

    @classmethod
    def load(cls,path):
        with np.load(path,allow_pickle=False) as d:
            matrix=sparse.csr_matrix((d['data'],d['indices'],d['indptr']),shape=tuple(d['shape']))
            model=cls(matrix,LIFConfig(**json.loads(str(d['config']))))
            for name in ['v','current','adaptation','refractory','queue']: setattr(model,name,d[name].copy())
            model.steps=int(d['steps']);model.rng.bit_generator.state=json.loads(str(d['rng']))
        return model


class PairSTDP:
    """All-to-all exponential pair rule, dimensionless positive magnitudes.

    Same-bin spikes do not form causal pairs. Sign is fixed externally, not
    learned. Off by default: not a FlyWire-measured learning rule.
    """
    def __init__(self, pre, post, weights, neurons, tau_ms=20., a_plus=.005, a_minus=.00525, maximum=1.):
        self.pre=np.asarray(pre,dtype=int);self.post=np.asarray(post,dtype=int)
        self.w=np.asarray(weights,dtype=float).copy()
        if self.pre.shape != self.post.shape or self.w.shape != self.pre.shape or self.w.ndim != 1:
            raise ValueError('STDP edge arrays must have matching one-dimensional shapes')
        if neurons <= 0 or tau_ms<=0 or maximum<=0 or min(a_plus,a_minus)<0:
            raise ValueError('Invalid STDP parameters')
        if ((self.pre<0)|(self.pre>=neurons)|(self.post<0)|(self.post>=neurons)).any():
            raise ValueError('Invalid STDP neuron reference')
        if not np.isfinite(self.w).all() or ((self.w<0)|(self.w>maximum)).any():
            raise ValueError('STDP magnitude outside bounds')
        self.pre_trace=np.zeros(neurons);self.post_trace=np.zeros(neurons)
        self.tau=tau_ms;self.ap=a_plus;self.am=a_minus;self.maximum=maximum

    def step(self,spikes,dt_ms):
        if dt_ms<=0: raise ValueError('Timestep must be positive')
        spikes=np.asarray(spikes,dtype=bool)
        if spikes.shape != self.pre_trace.shape: raise ValueError('Spike shape mismatch')
        decay=np.exp(-dt_ms/self.tau);self.pre_trace*=decay;self.post_trace*=decay
        self.w+=self.ap*self.pre_trace[self.pre]*spikes[self.post]-self.am*self.post_trace[self.post]*spikes[self.pre]
        np.clip(self.w,0,self.maximum,out=self.w)
        self.pre_trace+=spikes;self.post_trace+=spikes
        return self.w.copy()


@dataclass(frozen=True)
class RegionalConfig:
    dt_ms: float = .5
    tau_e_ms: float = 10.
    tau_i_ms: float = 20.
    wee: float = 12.
    wei: float = 10.
    wie: float = 10.
    wii: float = 0.
    coupling: float = .5
    drive: float = 1.5


class WilsonCowan:
    """Reduced E/I rate model; sigmoid response, dimensionless activity.

    Wilson & Cowan (1972) supplies the model family, NOT these fitted constants.
    Defaults are explicitly exploratory. No EEG/BOLD observation model claimed.
    """
    def __init__(self, adjacency, config=None, seed=0):
        self.config=config or RegionalConfig();c=self.config
        if not np.isfinite(list(asdict(c).values())).all() or min(c.dt_ms,c.tau_e_ms,c.tau_i_ms)<=0 or c.dt_ms>min(c.tau_e_ms,c.tau_i_ms)/5:
            raise ValueError('Invalid or inaccurate regional timestep')
        a=sparse.csr_matrix(adjacency,dtype=float)
        if a.shape[0]!=a.shape[1] or not np.isfinite(a.data).all() or (a.data<0).any():
            raise ValueError('Regional anatomy must be square, finite and nonnegative')
        strength=np.asarray(a.sum(1)).ravel()
        self.weights=sparse.diags(np.divide(1.,strength,out=np.zeros_like(strength),where=strength>0))@a
        rng=np.random.default_rng(seed);self.e=rng.uniform(.05,.1,a.shape[0]);self.i=np.full(a.shape[0],.05)

    def step(self, drive_modulation=0., coupling_scale=1.):
        c=self.config
        sigmoid=lambda x: 1/(1+np.exp(-np.clip(x,-60,60)))
        def derivative(e,i):
            se=sigmoid(c.wee*e-c.wei*i+c.coupling*coupling_scale*(self.weights@e)+c.drive+drive_modulation-3.)
            si=sigmoid(c.wie*e-c.wii*i-3.)
            return (-e+(1-e)*se)/c.tau_e_ms,(-i+(1-i)*si)/c.tau_i_ms
        de,di=derivative(self.e,self.i)
        pe,pi=self.e+c.dt_ms*de,self.i+c.dt_ms*di
        de2,di2=derivative(pe,pi)
        self.e+=c.dt_ms*(de+de2)/2;self.i+=c.dt_ms*(di+di2)/2
        if not np.isfinite(self.e).all() or ((self.e<0)|(self.e>1)|(self.i<0)|(self.i>1)).any():
            raise FloatingPointError('Regional state out of physical rate bounds')
        return self.e.copy(),self.i.copy()

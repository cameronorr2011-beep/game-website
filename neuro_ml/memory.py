"""Computational retention/retrieval, not claims of biological memory."""
from dataclasses import dataclass
import numpy as np


@dataclass
class MemoryEvent:
    vector: np.ndarray
    time_s: float
    strength: float
    label: str


class EpisodicMemory:
    """Bounded cosine retrieval with explicit age decay and duplicate interference."""
    def __init__(self,dimensions,capacity=256,decay_tau_s=3600.):
        if dimensions<=0 or capacity<=0 or decay_tau_s<=0: raise ValueError('Positive dimensions, capacity and decay required')
        self.dimensions=dimensions;self.capacity=capacity;self.tau=decay_tau_s;self.events=[]

    def _vector(self,vector):
        vector=np.asarray(vector,dtype=float)
        if vector.shape!=(self.dimensions,) or not np.isfinite(vector).all() or np.linalg.norm(vector)==0:
            raise ValueError('Finite nonzero vector with configured dimensions required')
        return vector/np.linalg.norm(vector)

    def encode(self,vector,time_s,label=''):
        vector=self._vector(vector)
        if not np.isfinite(time_s) or (self.events and time_s<self.events[-1].time_s):
            raise ValueError('Memory timestamps must be finite and chronological')
        # Similar new traces interfere with prior traces, an engineering hypothesis.
        for event in self.events:
            event.strength*=1-.1*max(0.,float(event.vector@vector))
        self.events.append(MemoryEvent(vector,float(time_s),1.,str(label)))
        if len(self.events)>self.capacity: self.events.pop(0)

    def recall(self,query,time_s,limit=5):
        query=self._vector(query)
        if not np.isfinite(time_s) or limit<=0 or any(event.time_s>time_s for event in self.events):
            raise ValueError('Invalid retrieval time or limit')
        results=[]
        for event in self.events:
            similarity=float(query@event.vector)
            score=similarity*event.strength*np.exp(-(time_s-event.time_s)/self.tau)
            results.append({'label':event.label,'time_s':event.time_s,'similarity':similarity,'score':float(score)})
        return sorted(results,key=lambda r:r['score'],reverse=True)[:limit]


class WorkingMemory:
    """Leaky context vector with bounded capacity in vector dimensions."""
    def __init__(self,dimensions,tau_s=10.):
        if dimensions<=0 or tau_s<=0: raise ValueError('Positive dimensions/time constant required')
        self.value=np.zeros(dimensions);self.tau=tau_s

    def update(self,stimulus,dt_s,gain=1.):
        stimulus=np.asarray(stimulus,dtype=float)
        if stimulus.shape!=self.value.shape or not np.isfinite(stimulus).all() or dt_s<=0 or not 0<=gain<=1:
            raise ValueError('Invalid memory update')
        decay=np.exp(-dt_s/self.tau)
        self.value=decay*self.value+gain*(1-decay)*stimulus
        return self.value.copy()

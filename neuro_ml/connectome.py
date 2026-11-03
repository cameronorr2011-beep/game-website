"""Versioned sparse anatomical graphs; rows=target, columns=source.

Synapse counts are anatomical multiplicities, never measured conductances.
Unknown transmitter/receptor physiology remains explicit.
"""
from dataclasses import dataclass
from pathlib import Path
import json
import numpy as np
from scipy import sparse
from scipy.sparse.csgraph import connected_components


@dataclass
class Connectome:
    ids: np.ndarray
    adjacency: sparse.csr_matrix
    provenance: dict

    def __post_init__(self):
        self.ids = np.asarray(self.ids)
        self.adjacency = sparse.csr_matrix(self.adjacency, dtype=np.float64)
        n = len(self.ids)
        if self.ids.ndim != 1 or len(np.unique(self.ids)) != n:
            raise ValueError('Neuron identifiers must be unique and one dimensional')
        if self.adjacency.shape != (n, n):
            raise ValueError('Adjacency dimensions do not match identifiers')
        if not np.isfinite(self.adjacency.data).all() or (self.adjacency.data < 0).any():
            raise ValueError('Anatomical weights must be finite and nonnegative')
        self.adjacency.sum_duplicates()
        self.adjacency.eliminate_zeros()

    def statistics(self):
        a = self.adjacency
        incoming = np.diff(a.indptr)
        outgoing = np.diff(a.tocsc().indptr)
        return {'organism': self.provenance.get('organism'), 'neurons': len(self.ids),
                'directed_pairs': a.nnz, 'anatomical_weight_sum': float(a.sum()),
                'self_connections': int(np.count_nonzero(a.diagonal())),
                'isolated_neurons': int(np.sum((incoming + outgoing) == 0)),
                'weak_components': int(connected_components(a, directed=True, connection='weak')[0]),
                'mean_in_degree': float(incoming.mean()), 'max_in_degree': int(incoming.max(initial=0)),
                'max_out_degree': int(outgoing.max(initial=0)), 'sparse_bytes': int(a.data.nbytes+a.indices.nbytes+a.indptr.nbytes)}

    def subset(self, indices):
        indices = np.asarray(indices, dtype=int)
        return Connectome(self.ids[indices], self.adjacency[indices][:, indices],
                          {**self.provenance, 'subset': {'parent_nodes': len(self.ids), 'selected': len(indices)}})

    def save(self, directory):
        directory = Path(directory)
        directory.mkdir(parents=True, exist_ok=False)
        np.save(directory/'ids.npy', self.ids, allow_pickle=False)
        sparse.save_npz(directory/'adjacency.npz', self.adjacency)
        (directory/'provenance.json').write_text(json.dumps(self.provenance, indent=2), encoding='utf-8')

    @classmethod
    def load(cls, directory):
        directory = Path(directory)
        return cls(np.load(directory/'ids.npy', allow_pickle=False), sparse.load_npz(directory/'adjacency.npz'),
                   json.loads((directory/'provenance.json').read_text(encoding='utf-8')))


def import_flywire(connections, root_ids, output, source_manifest):
    """Read Feather IPC record batches, not a full pandas table.

    Accumulates pair counts over neuropils, preserving the original source file
    and a per-source transmitter/neuropil summary. IDs are uint64 throughout.
    Transmitter predictions are not assigned an automatic physiological sign.
    """
    import pyarrow as pa
    import pyarrow.ipc as ipc
    ids = np.sort(np.load(root_ids, allow_pickle=False).astype(np.uint64))
    if len(ids) != len(np.unique(ids)):
        raise ValueError('Duplicate proofread root IDs')
    n = len(ids)
    graph = sparse.csr_matrix((n, n), dtype=np.float64)
    nt_names = ['gaba', 'ach', 'glut', 'oct', 'ser', 'da']
    nt_sum = np.zeros((n, 6), dtype=np.float64)
    nt_weight = np.zeros((n, 6))
    missing_nt_rows = np.zeros(6, dtype=np.int64)
    neuropils = {}
    rows = 0
    with pa.memory_map(str(connections), 'r') as mapped:
        reader = ipc.open_file(mapped)
        required = ['pre_pt_root_id', 'post_pt_root_id', 'syn_count', 'neuropil'] + [x+'_avg' for x in nt_names]
        if not set(required).issubset(reader.schema.names):
            raise ValueError('FlyWire v783 required columns missing')
        for k in range(reader.num_record_batches):
            batch = reader.get_batch(k)
            columns = {name: batch.column(batch.schema.get_field_index(name)) for name in required}
            if any(columns[name].null_count for name in ['pre_pt_root_id','post_pt_root_id','syn_count']):
                raise ValueError('Null endpoint or synapse count')
            pre = columns['pre_pt_root_id'].to_numpy().astype(np.uint64)
            post = columns['post_pt_root_id'].to_numpy().astype(np.uint64)
            counts = columns['syn_count'].to_numpy().astype(float)
            if not np.isfinite(counts).all() or (counts <= 0).any() or (counts != np.floor(counts)).any():
                raise ValueError('Invalid synapse multiplicity')
            src, dst = np.searchsorted(ids, pre), np.searchsorted(ids, post)
            if (src >= n).any() or (dst >= n).any() or not np.array_equal(ids[src], pre) or not np.array_equal(ids[dst], post):
                raise ValueError('Connection references a non-proofread neuron')
            graph += sparse.coo_matrix((counts, (dst, src)), shape=(n,n)).tocsr()
            for j,name in enumerate(nt_names):
                probability = columns[name+'_avg'].to_numpy(zero_copy_only=False)
                valid = np.isfinite(probability)
                if np.isinf(probability).any() or (probability[valid] < 0).any() or (probability[valid] > 1).any():
                    raise ValueError('Invalid transmitter probability')
                missing_nt_rows[j] += int((~valid).sum())
                np.add.at(nt_sum[:,j], src[valid], probability[valid]*counts[valid])
                np.add.at(nt_weight[:,j], src[valid], counts[valid])
            for name,count in zip(columns['neuropil'].to_pylist(),counts):
                key = 'unknown' if name is None else name
                neuropils[key] = neuropils.get(key,0)+int(count)
            rows += len(batch)
    provenance = {**source_manifest, 'organism':'Drosophila melanogaster', 'release':'783.0',
                  'source_rows':rows, 'units':'synapse counts', 'processing':['uint64 endpoint validation',
                  'sum counts over neuropils per directed pair', 'synapse-weighted presynaptic NT probability summary'],
                  'physiology':'unknown; anatomical counts are not conductances', 'neuropil_synapses':neuropils,
                  'annotations':'not imported', 'morphology':'not imported',
                  'missing_nt_rows':dict(zip(nt_names,missing_nt_rows.tolist())),
                  'missing_nt_policy':'preserve anatomy; omit unknown probabilities from weighted summaries; zero evidence remains NaN'}
    result = Connectome(ids,graph,provenance)
    result.save(output)
    mean = np.divide(nt_sum,nt_weight,out=np.full_like(nt_sum,np.nan),where=nt_weight>0)
    np.savez_compressed(Path(output)/'neurotransmitters.npz', probabilities=mean, classes=np.array(nt_names), synapse_weights=nt_weight)
    (Path(output)/'statistics.json').write_text(json.dumps(result.statistics(),indent=2),encoding='utf-8')
    return result


REQUIRED_GROUPS = {'frontal','parietal','temporal','occipital','insula','cingulate',
                   'thalamus','hypothalamus','caudate','putamen','pallidum','hippocampus','amygdala',
                   'cerebellum','vermis','midbrain','pons','medulla'}


def validate_human(graph, regions, strict=True):
    if graph.provenance.get('organism') != 'Homo sapiens':
        raise ValueError('Human backend requires Homo sapiens anatomy')
    if len(regions) != len(graph.ids) or [str(r['id']) for r in regions] != [str(x) for x in graph.ids]:
        raise ValueError('Region metadata order does not match connectivity IDs')
    present = {r['group'] for r in regions}
    missing = sorted(REQUIRED_GROUPS-present)
    hemispheres = {r.get('hemisphere') for r in regions}
    bilateral_missing = sorted(g for g in REQUIRED_GROUPS-{'vermis','midbrain','pons','medulla'}
                               if {r.get('hemisphere') for r in regions if r['group']==g} != {'L','R'})
    connected = (np.asarray(graph.adjacency.sum(0)).ravel()+np.asarray(graph.adjacency.sum(1)).ravel())>0
    isolated = [str(graph.ids[i]) for i in np.flatnonzero(~connected)]
    components = graph.statistics()['weak_components']
    report = {'missing_groups':missing,'bilateral_coverage_missing':bilateral_missing,
              'hemispheres':sorted(str(h) for h in hemispheres),'isolated_regions':isolated,
              'weak_components':components, 'whole_brain':not missing and not bilateral_missing and not isolated and components==1}
    if strict and not report['whole_brain']:
        raise ValueError('Incomplete whole-brain coverage: '+json.dumps(report))
    return report

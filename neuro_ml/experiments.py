"""Reproducible experiments with explicit hypotheses, failures and measurements."""
from pathlib import Path
from datetime import datetime,timezone
from dataclasses import asdict
import json
import os
import platform
import subprocess
import time
import traceback
import numpy as np
from scipy import sparse
from .connectome import Connectome,validate_human
from .dynamics import LIFNetwork,LIFConfig,WilsonCowan,RegionalConfig
from .sleep import (SleepRegulator,ARCHITECTURE_PROFILE,OscillationConfig,architecture_metrics,
                    check_architecture,spectral_metrics,synthesize_stage)


def hardware():
    import psutil
    return {'os':platform.platform(),'cpu':platform.processor(),'physical_cores':psutil.cpu_count(logical=False),
            'logical_cores':os.cpu_count(),'ram_bytes':psutil.virtual_memory().total,
            'available_ram_bytes':psutil.virtual_memory().available,'python':platform.python_version(),
            'disk_free_bytes':__import__('shutil').disk_usage('.').free}


class Experiment:
    def __init__(self,directory,question,hypothesis,configuration,seed,dataset):
        self.path=Path(directory);self.path.mkdir(parents=True,exist_ok=False)
        self.record={'schema_version':1,'question':question,'hypothesis':hypothesis,'configuration':configuration,
                     'seed':seed,'dataset':dataset,'hardware':hardware(),
                     'start_utc':datetime.now(timezone.utc).isoformat(),'status':'running',
                     'classification':'simulation, not measured neural activity',
                     'git_head':subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip(),
                     'source_checksums':{p.name:__import__('neuro_ml.data',fromlist=['sha256']).sha256(p)
                                         for p in Path(__file__).parent.glob('*.py')}}
        self.start=time.perf_counter();self.cpu=time.process_time()
        self.flush()

    def flush(self):
        temp=self.path/'report.json.partial'
        temp.write_text(json.dumps(self.record,indent=2,allow_nan=False),encoding='utf-8')
        os.replace(temp,self.path/'report.json')

    def __enter__(self): return self

    def __exit__(self,kind,error,tb):
        import psutil
        self.record.update(end_utc=datetime.now(timezone.utc).isoformat(),wall_seconds=time.perf_counter()-self.start,
                           cpu_seconds=time.process_time()-self.cpu,rss_end_bytes=psutil.Process().memory_info().rss,
                           status='failed' if error else 'completed')
        self.record['cpu_utilization_percent_one_core']=100*self.record['cpu_seconds']/self.record['wall_seconds']
        if error: self.record['failure']=''.join(traceback.format_exception(kind,error,tb))
        self.flush()
        return False


def fly_experiment(graph_path,output,neurons=512,duration_ms=500.,seed=7,sign_policy='unknown-zero'):
    graph=Connectome.load(graph_path)
    # Deterministic highest total anatomical strength induced subset, no invented edges.
    strength=np.asarray(graph.adjacency.sum(0)).ravel()+np.asarray(graph.adjacency.sum(1)).ravel()
    selected=np.argsort(-strength,kind='stable')[:min(neurons,len(graph.ids))]
    sub=graph.subset(selected)
    config=LIFConfig(noise_mv=.3,adaptation_na=.002)
    if sign_policy not in {'unknown-zero','ach-gaba-only'}: raise ValueError('Explicit physiology policy required')
    signs=np.zeros(len(selected))
    nt_file=Path(graph_path)/'neurotransmitters.npz'
    if sign_policy=='ach-gaba-only':
        with np.load(nt_file,allow_pickle=False) as data:
            probs=data['probabilities'][selected]
            # Conservative .8 posterior cutoff; glutamate remains unknown because
            # receptor-dependent polarity cannot be inferred from NT identity alone.
            signs[np.isfinite(probs[:,1]) & (probs[:,1]>=.8)]=1
            signs[np.isfinite(probs[:,0]) & (probs[:,0]>=.8)]=-1
    # Preserve structural counts; apply distinct explicitly inferred dynamics matrix.
    incoming=np.asarray(sub.adjacency.sum(1)).ravel()
    scaling=np.divide(.08,incoming,out=np.zeros_like(incoming),where=incoming>0)
    weights=sparse.diags(scaling)@sub.adjacency@sparse.diags(signs)
    drive=np.zeros(len(selected));drive[:max(1,len(selected)//20)]=.25
    with Experiment(output,'Does injected current propagate over a published anatomical subgraph?',
                    'Driven neurons spike; resolved-sign edges can affect downstream membrane states.',
                    {'model':'current LIF','lif':asdict(config),'subset':'highest strength induced',
                     'duration_ms':duration_ms,'external_na':.25,'sign_policy':sign_policy,
                     'weight_policy':'incoming count normalization to 0.08 nA; exploratory, not measured',
                     'unknown_sign_connections':'zero physiological current; anatomical graph retained'},seed,graph.provenance) as exp:
        exp.record['full_graph']=graph.statistics();exp.record['simulated_graph']=sub.statistics()
        exp.record['resolved_source_neurons']=int(np.count_nonzero(signs))
        exp.record['nonzero_physiological_edges']=int(weights.nnz)
        model=LIFNetwork(weights,config,seed)
        started=time.perf_counter();result=model.run(duration_ms,drive,sample_every=2)
        runtime=time.perf_counter()-started
        model.save(exp.path/'checkpoint.npz')
        np.savez_compressed(exp.path/'activity.npz',**result,neuron_ids=sub.ids)
        exp.record['metrics']={'spikes':len(result['spikes']),'active_neurons':int(np.count_nonzero(result['rate_hz'])),
            'mean_rate_hz':float(result['rate_hz'].mean()),'simulation_wall_seconds':runtime,
            'simulated_seconds_per_wall_second':duration_ms/1000/runtime,
            'checkpoint_bytes':(exp.path/'checkpoint.npz').stat().st_size,
            'biological_validation':'not performed; numerical/anatomical validation only'}
        # Re-run from identical seed/config to verify all recorded activity.
        repeat=LIFNetwork(weights,config,seed).run(duration_ms,drive,sample_every=2)
        if not all(np.array_equal(result[k],repeat[k]) for k in result):
            raise AssertionError('Seeded replay differs')
        exp.record['metrics']['seeded_replay_identical']=True
        # Same drive/seed without edges: distinguishes propagation from common drive.
        control=LIFNetwork(sparse.csr_matrix(weights.shape),config,seed).run(duration_ms,drive,sample_every=2)
        exp.record['metrics']['edge_ablation_voltage_rmse_mv']=float(np.sqrt(np.mean((result['voltage_mv']-control['voltage_mv'])**2)))
        exp.record['metrics']['edge_ablation_spike_count']=len(control['spikes'])
    return exp.record


def human_experiment(graph_path,output,duration_ms=1000.,seed=7,allow_partial=False):
    graph=Connectome.load(graph_path)
    regions=json.loads((Path(graph_path)/'regions.json').read_text(encoding='utf-8'))
    config=RegionalConfig()
    with Experiment(output,'Can regional E/I dynamics run stably on imported anatomy?',
                    'Connected regional dynamics stay finite and within bounded rate states.',
                    {'regional':asdict(config),'duration_ms':duration_ms,'allow_partial':allow_partial,
                     'conduction_delays':'not implemented','sleep_coupling':'exploratory global modulation'},seed,graph.provenance) as exp:
        exp.record['coverage']=validate_human(graph,regions,strict=not allow_partial)
        model=WilsonCowan(graph.adjacency,config,seed)
        sleep=SleepRegulator(seed=seed)
        sleep_state=sleep.step()
        values=[]
        start=time.perf_counter()
        steps=round(duration_ms/config.dt_ms)
        if steps<=0: raise ValueError('Duration must be positive')
        for k in range(steps):
            if k and k % round(1000/config.dt_ms)==0: sleep_state=sleep.step()
            e,i=model.step(sleep_state['drive_modulation'],sleep_state['coupling_scale'])
            if k%4==0: values.append(e)
        runtime=time.perf_counter()-start
        np.savez_compressed(exp.path/'activity.npz',excitatory=np.array(values),
                            time_ms=(np.arange(len(values))*4+1)*config.dt_ms,region_ids=graph.ids)
        exp.record['metrics']={'regional_nodes':len(graph.ids),'connections':graph.adjacency.nnz,
            'simulation_wall_seconds':runtime,'simulated_seconds_per_wall_second':duration_ms/1000/runtime,
            'min_activity':float(np.min(values)),'max_activity':float(np.max(values)),
            'biological_validation':'not performed; exploratory partial atlas only'}
    return exp.record


def sleep_experiment(output,hours=24.,seed=7):
    model=SleepRegulator(seed=seed)
    with Experiment(output,'Does two-process timing plus an ultradian scheduler reproduce published architecture ranges?',
                    'A scheduled night keeps N1/N2/N3/REM occupancy inside reported adult ranges, shows first-night '
                    'slow-wave dominance, and reaches the first REM period 60-140 min after sleep onset.',
                    {'sleep':asdict(model.config),'hours':hours,'validation_profile':ARCHITECTURE_PROFILE,
                     'oscillation':asdict(OscillationConfig()),
                     'parameter_status':'illustrative constants calibrated to aggregate architecture, not fitted to subjects'},
                    seed,None) as exp:
        result=model.run(hours)
        np.savez_compressed(exp.path/'activity.npz',**result)
        labels=result['stage'];transitions=np.zeros((5,5),dtype=int)
        np.add.at(transitions,(labels[:-1],labels[1:]),1)
        metrics=architecture_metrics(result,model.config.dt_s)
        exp.record['metrics']={'architecture':metrics,'architecture_checks':check_architecture(metrics),
                               'stage_fraction_of_recording':{name:float(np.mean(labels==i)) for i,name in enumerate(model.stages)},
                               'transition_counts':transitions.tolist(),
                               'oscillation_spectra':{},'biological_validation':'aggregate architecture ranges only; '
                               'synthesized signal is not EEG and no subject data were used'}
        # Spectra of synthesized model signal per stage (120 s windows, fixed seeds).
        for stage in range(5):
            signal=synthesize_stage(stage,120.,OscillationConfig(),np.random.default_rng(seed+stage))
            exp.record['metrics']['oscillation_spectra'][model.stages[stage]]=spectral_metrics(signal['signal'],signal['fs_hz'])
        np.savez_compressed(exp.path/'spectra.npz',**{model.stages[s]:synthesize_stage(
            s,120.,OscillationConfig(),np.random.default_rng(seed+s))['signal'] for s in range(5)})
    return exp.record

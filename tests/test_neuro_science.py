"""Numerical and provenance checks; fixtures are explicitly synthetic."""
import json
import numpy as np
import pytest
from scipy import sparse
from neuro_ml.connectome import Connectome,import_flywire,validate_human
from neuro_ml.dynamics import LIFNetwork,LIFConfig,PairSTDP,WilsonCowan,RegionalConfig
from neuro_ml.sleep import (SleepRegulator,SleepConfig,spectral_metrics,architecture_metrics,
                            check_architecture,synthesize_stage,OscillationConfig)


def test_graph_validation_and_roundtrip(tmp_path):
    graph=Connectome(np.array([1,2],dtype=np.uint64),sparse.csr_matrix([[0,2],[3,0]]),{'organism':'synthetic fixture'})
    graph.save(tmp_path/'graph');loaded=Connectome.load(tmp_path/'graph')
    assert loaded.statistics()['directed_pairs']==2
    assert loaded.statistics()['anatomical_weight_sum']==5
    assert np.array_equal(loaded.ids,graph.ids)
    with pytest.raises(ValueError): Connectome([1,1],np.zeros((2,2)),{})
    with pytest.raises(ValueError): Connectome([1,2],[[0,-1],[0,0]],{})
    with pytest.raises(FileExistsError): graph.save(tmp_path/'graph')


def test_flywire_exact_ids_and_neuropil_aggregation(tmp_path):
    import pyarrow as pa
    import pyarrow.feather as feather
    ids=np.array([720575940600000001,720575940600000002],dtype=np.uint64)
    np.save(tmp_path/'ids.npy',ids)
    columns={'pre_pt_root_id':pa.array([int(ids[0]),int(ids[0])],type=pa.uint64()),
             'post_pt_root_id':pa.array([int(ids[1]),int(ids[1])],type=pa.uint64()),
             'neuropil':['A','B'],'syn_count':[2,3]}
    columns.update({name+'_avg':[None,.5] for name in ['gaba','ach','glut','oct','ser','da']})
    feather.write_feather(pa.table(columns),tmp_path/'edges.feather',chunksize=1)
    graph=import_flywire(tmp_path/'edges.feather',tmp_path/'ids.npy',tmp_path/'out',{'fixture':True})
    assert graph.adjacency[1,0]==5
    assert graph.ids[0]==ids[0]
    assert graph.provenance['source_rows']==2
    assert graph.provenance['missing_nt_rows']['ach']==1
    with np.load(tmp_path/'out/neurotransmitters.npz',allow_pickle=False) as nt:
        assert nt['probabilities'][0,1]==pytest.approx(.5)
        assert np.isnan(nt['probabilities'][1,1])
    columns['post_pt_root_id']=pa.array([999,999],type=pa.uint64())
    feather.write_feather(pa.table(columns),tmp_path/'invalid.feather')
    with pytest.raises(ValueError,match='non-proofread'):
        import_flywire(tmp_path/'invalid.feather',tmp_path/'ids.npy',tmp_path/'bad',{})


def test_passive_lif_matches_analytic_solution():
    c=LIFConfig()
    model=LIFNetwork(np.zeros((1,1)),c)
    result=model.run(40.,external_na=.05)
    expected=c.rest_mv+c.resistance_mohm*.05*(1-np.exp(-40/c.tau_m_ms))
    assert model.v[0]==pytest.approx(expected,abs=1e-10)
    assert len(result['spikes'])==0


def test_refractory_and_decay():
    c=LIFConfig(refractory_ms=3.)
    model=LIFNetwork(np.zeros((1,1)),c)
    result=model.run(100.,external_na=1.)
    assert len(result['spikes'])>2
    assert np.diff(result['spikes'][:,0]).min()>=c.refractory_ms
    model.refractory[0]=3.;model.current[0]=1.;model.adaptation[0]=.5
    model.step()
    assert model.current[0]==pytest.approx(np.exp(-c.dt_ms/c.tau_syn_ms))
    assert model.adaptation[0]<.5


def test_synapse_delay_not_immediate():
    c=LIFConfig(delay_ms=2.)
    model=LIFNetwork([[0,0],[.1,0]],c)
    model.v[0]=c.threshold_mv
    assert model.step([.5,0])[0]
    for _ in range(3):
        model.step();assert model.v[1]==c.rest_mv
    model.step()
    assert model.v[1]>c.rest_mv


def test_checkpoint_resumes_noise_and_delay_exactly(tmp_path):
    model=LIFNetwork([[0,.01],[-.02,0]],LIFConfig(noise_mv=.3),seed=13)
    model.run(20.,.3);model.save(tmp_path/'state.npz')
    recovered=LIFNetwork.load(tmp_path/'state.npz')
    a=model.run(30.,.3);b=recovered.run(30.,.3)
    for name in a: assert np.array_equal(a[name],b[name])
    with pytest.raises(FileExistsError): model.save(tmp_path/'state.npz')


def test_integrators_converge_and_reject_coarse_steps():
    expected=-70+5*(1-np.exp(-2))
    errors=[]
    for dt in [1.,.5,.25]:
        model=LIFNetwork([[0]],LIFConfig(dt_ms=dt,integrator='euler'))
        model.run(40,.05);errors.append(abs(model.v[0]-expected))
    assert errors[2]<errors[1]<errors[0]
    with pytest.raises(ValueError): LIFConfig(dt_ms=5.)
    with pytest.raises(ValueError): LIFConfig(delay_ms=.3)


def test_stdp_causality_and_bounds():
    causal=PairSTDP([0],[1],[.5],2)
    causal.step([1,0],1);causal.step([0,1],1)
    anti=PairSTDP([0],[1],[.5],2)
    anti.step([0,1],1);anti.step([1,0],1)
    assert causal.w[0]>.5>anti.w[0]
    for _ in range(2000): causal.step([1,0],1);causal.step([0,1],1)
    assert 0<=causal.w[0]<=1


def test_human_strict_fails_missing_anatomy_and_disconnected():
    graph=Connectome(np.array(['A','B']),[[0,1],[1,0]],{'organism':'Homo sapiens'})
    regions=[{'id':'A','group':'frontal','hemisphere':'L'},{'id':'B','group':'frontal','hemisphere':'R'}]
    with pytest.raises(ValueError,match='Incomplete whole-brain'):validate_human(graph,regions)
    report=validate_human(graph,regions,False)
    assert 'cerebellum' in report['missing_groups'] and 'pons' in report['missing_groups']


def test_regional_bounded_reproducible_and_coupling_effect():
    a=np.array([[0,1],[1,0]])
    model=WilsonCowan(a,seed=4);replica=WilsonCowan(a,seed=4)
    control=WilsonCowan(np.zeros((2,2)),seed=4)
    for _ in range(2000):
        e,i=model.step();er,ir=replica.step();ec,ic=control.step()
        assert np.isfinite(e).all() and ((e>=0)&(e<=1)).all()
        assert np.array_equal(e,er)
    assert not np.allclose(e,ec)
    with pytest.raises(ValueError): WilsonCowan(a,RegionalConfig(dt_ms=5))


def test_sleep_bounded_seeded_and_pressure_direction():
    a=SleepRegulator(seed=12).run(24);b=SleepRegulator(seed=12).run(24)
    for key in a: assert np.array_equal(a[key],b[key])
    for key in ['wake','sleep','rem','depth','pressure']: assert ((a[key]>=0)&(a[key]<=1)).all()
    assert set(a['stage'])==set(range(5))
    awake=SleepRegulator(SleepConfig(noise=0));before=awake.pressure;awake.step()
    assert awake.pressure>before
    asleep=SleepRegulator(SleepConfig(noise=0));asleep.asleep=True;asleep._start_cycle()
    before=asleep.pressure;asleep.step();assert asleep.pressure<before


def test_sleep_architecture_matches_published_ranges():
    model=SleepRegulator(seed=12);metrics=architecture_metrics(model.run(24),model.config.dt_s)
    checks=check_architecture(metrics)
    assert checks['passed'],checks['failures']
    # First-night slow-wave dominance and REM latency are documented properties, checked separately.
    assert metrics['n3_first_half_s']>metrics['n3_second_half_s']
    assert metrics['rem_periods']>=4


def test_sleep_deprivation_rebounds_slow_wave_sleep():
    rested=SleepRegulator(SleepConfig(initial_pressure=.25),seed=3)
    deprived=SleepRegulator(SleepConfig(initial_pressure=.88),seed=3)
    rested_metrics=architecture_metrics(rested.run(24),rested.config.dt_s)
    deprived_metrics=architecture_metrics(deprived.run(24),deprived.config.dt_s)
    assert deprived_metrics['n3_fraction']>rested_metrics['n3_fraction']
    assert not check_architecture(rested_metrics)['failures']


def test_stage_signatures_in_synthesized_spectra():
    def power(stage,name):
        x=synthesize_stage(stage,120.,OscillationConfig(),np.random.default_rng(stage))
        m=spectral_metrics(x['signal'],x['fs_hz']);assert np.isfinite(x['signal']).all()
        return m['band_power'][name]
    # Slow-wave sleep is delta dominated; spindles distinguish N2; REM is theta dominated.
    assert power(3,'delta')>4*power(3,'sigma')
    assert power(2,'sigma')>power(2,'beta') and power(2,'sigma')>power(4,'sigma')
    assert power(4,'theta')>2*power(4,'delta')
    assert power(0,'alpha')>power(0,'delta')
    with pytest.raises(ValueError): synthesize_stage(9,1.)


def test_spectrum_measures_signal_not_stage_labels():
    fs=200;t=np.arange(0,10,1/fs)
    result=spectral_metrics(np.sin(2*np.pi*13*t),fs)
    assert result['peak_hz']==pytest.approx(13,abs=.3)
    assert result['band_power']['sigma']>10*result['band_power']['delta']


def test_computational_memory_retention_retrieval_interference():
    from neuro_ml.memory import EpisodicMemory,WorkingMemory
    memory=EpisodicMemory(2,capacity=2,decay_tau_s=100)
    memory.encode([1,0],0,'first');memory.encode([0,1],1,'second')
    assert memory.recall([1,0],2)[0]['label']=='first'
    before=memory.recall([1,0],2)[0]['score']
    assert memory.recall([1,0],200)[0]['score']<before
    memory.encode([1,0],3,'third')
    assert len(memory.events)==2 and all(e.label!='first' for e in memory.events)
    wm=WorkingMemory(2)
    retained=wm.update([1,0],1)
    forgotten=wm.update([0,0],10)
    assert 0<forgotten[0]<retained[0]
    with pytest.raises(ValueError): memory.encode([0,0],4)

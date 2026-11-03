"""Run `python -m neuro_ml --help` for local scientific workflows."""
import argparse
import json
from pathlib import Path


def main():
    parser=argparse.ArgumentParser(description='Neuro-ML: explicit provenance and honest model limitations')
    commands=parser.add_subparsers(dest='command',required=True)
    for name in ['fetch-flywire','fetch-human']:
        p=commands.add_parser(name);p.add_argument('directory')
    p=commands.add_parser('import-flywire');p.add_argument('directory');p.add_argument('output')
    p=commands.add_parser('import-human');p.add_argument('directory');p.add_argument('output')
    p=commands.add_parser('fly');p.add_argument('graph');p.add_argument('output');p.add_argument('--neurons',type=int,default=512)
    p.add_argument('--duration-ms',type=float,default=500);p.add_argument('--sign-policy',choices=['unknown-zero','ach-gaba-only'],default='unknown-zero')
    p.add_argument('--seed',type=int,default=7)
    p=commands.add_parser('human');p.add_argument('graph');p.add_argument('output');p.add_argument('--allow-partial',action='store_true')
    p.add_argument('--duration-ms',type=float,default=1000);p.add_argument('--seed',type=int,default=7)
    p=commands.add_parser('sleep');p.add_argument('output');p.add_argument('--hours',type=float,default=24);p.add_argument('--seed',type=int,default=7)
    p=commands.add_parser('sleep-circuit',help='mechanistic spiking sleep circuit with EEG forward model')
    p.add_argument('output',nargs='?');p.add_argument('--duration-s',type=float,default=20)
    p.add_argument('--dt-ms',type=float,default=1.0);p.add_argument('--pressure',type=float,default=.25)
    p.add_argument('--rem-drive',type=float,default=0.);p.add_argument('--arousal',type=float,default=260.)
    p.add_argument('--seed',type=int,default=7)
    commands.add_parser('hardware')
    p=commands.add_parser('dashboard');p.add_argument('--runs',default='experiments/runs');p.add_argument('--port',type=int,default=8766)
    args=parser.parse_args()
    if args.command=='fetch-flywire':
        from .data import fetch_flywire
        result=fetch_flywire(args.directory)
    elif args.command=='fetch-human':
        from .data import fetch_tvb
        result=fetch_tvb(args.directory)
    elif args.command=='import-flywire':
        from .connectome import import_flywire
        directory=Path(args.directory)
        result=import_flywire(directory/'proofread_connections_783.feather',directory/'proofread_root_ids_783.npy',args.output,
                             json.loads((directory/'manifest.json').read_text(encoding='utf-8'))).statistics()
    elif args.command=='import-human':
        from .data import import_tvb
        result=import_tvb(args.directory,args.output).statistics()
    elif args.command=='fly':
        from .experiments import fly_experiment
        if args.neurons<=0: parser.error('--neurons must be positive')
        result=fly_experiment(args.graph,args.output,args.neurons,args.duration_ms,args.seed,args.sign_policy)
    elif args.command=='human':
        from .experiments import human_experiment
        result=human_experiment(args.graph,args.output,args.duration_ms,args.seed,args.allow_partial)
    elif args.command=='sleep':
        from .experiments import sleep_experiment
        result=sleep_experiment(args.output,args.hours,args.seed)
    elif args.command=='sleep-circuit':
        from .sleep_circuit import SleepCircuitConfig,run_sleep_circuit
        config=SleepCircuitConfig(duration_s=args.duration_s,dt_ms=args.dt_ms,
            initial_pressure=args.pressure,rem_drive_pa=args.rem_drive,
            arousal_drive_pa=args.arousal,seed=args.seed)
        result=run_sleep_circuit(args.output,config)
    elif args.command=='hardware':
        from .experiments import hardware
        result=hardware()
    else:
        from .dashboard import serve
        serve(args.runs,args.port)
        return
    print(json.dumps(result,indent=2,allow_nan=False))


if __name__=='__main__': main()

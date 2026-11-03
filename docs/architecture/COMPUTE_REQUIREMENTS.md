# Measured compute environment and execution choices

Machine: Windows 11 (10.0.26300), Intel Core i7-1255U, 10 physical/12 logical cores, 16,849,293,312 bytes RAM. At reconnaissance about 3.88 GB RAM was available; other programs were using the remainder. Disk: approximately 999 GB total and 535 GB initially free. Python runtime: existing project .venv, 3.12.10. Default shell python was 3.8 and is not suitable; invoke the project interpreter explicitly.

Existing PyTorch 2.14.1+cpu, CUDA runtime None, torch.cuda.is_available() False. No CUDA devices were exposed by this runtime; this does not establish absence of an integrated/other physical graphics adapter. No GPU model/VRAM/throughput has been measured yet. CPU sparse execution selected. Installed additions: SciPy 1.18.1 and PyArrow 23.0.1. Existing NumPy, psutil, pytest and matplotlib available. Reproducibility lock/version report should capture the actual final environment.

Memory budget: batch-read the 852 MB Feather table instead of whole-pandas materialization. Accumulate CSR anatomical counts; retain original source file for detailed rows. Derived graph construction can still need multiple sparse copies. Start dynamics with an induced 512-neuron subgraph; never confuse this with full-network physiological execution. Track matrix bytes and process RSS. The full proofread ID graph is anatomical coverage only until all-neuron simulation is measured.

First human partial run: 96 nodes, 3939 nonzero structural matrix entries, dt=0.5 ms, 2 simulated seconds; simulation kernel took 0.281375 s, 7.10795 simulated seconds/wall second. Total experiment including output was ~0.321 s. This is a measured single local run under background backup/download load, not a general benchmark or speedup claim.

First sleep run: 24 simulated hours with 1-second macro steps completed in ~3.43 wall seconds including reporting. This is a slow-variable regulator, not millisecond full-brain or EEG simulation, and it failed realistic sleep architecture.

No storage throughput benchmark, CPU/GPU utilization trace, full-brain fly timing, neural training throughput or peak RSS profile is yet established. End RSS and process CPU/wall timing are recorded per experiment. Legacy verified-copy elapsed time is backup I/O, not a controlled disk benchmark. Hardware snapshots are taken per run; performance reports must cite the exact run and model size.

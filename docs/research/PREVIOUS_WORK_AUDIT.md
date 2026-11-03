# Previous work audit

## Scope and evidence
Read-only reconnaissance on 2026-11-02 covered the complete directory filename/size inventory (excluding installed environments, Git objects and caches), 732 tracked files, ignored dataset/checkpoint paths, all local branches and 57 commits. Main is ac4ef71; origin/main is available. Working-tree changes: run.ps1 and scripts/emulator.py; untracked backup copies run.ps1.bak, run.ps1.before-phone, scripts/emulator.py.bak-phone and .venv/. Do not discard these.

The asset inventory totals approximately 3.776 GB excluding installed environments. It includes game videos/tracks, APKs, CSV game tables, 53 Parquet replay files, 151 PTH files, three PT files, NumPy game/recognition arrays and one vendor notebook. Checkpoints at the root are game-policy metadata. No serialized checkpoint was deserialized: legacy pickle-based formats are untrusted and are not needed for the scientific model.

Searches included FlyWire, Drosophila, connectome, fruit fly, LIF, STDP, episodic and NeuroML across current tracked/ignored files, historical paths, commit messages and historical content in the project-owned tree. Vendor source and asset paths were inventoried and current scientific terms searched. No previous fruit-fly connectome or physiological sleep simulator was recovered within these authorized paths. This is a bounded negative finding, not proof that work never existed elsewhere. No unrelated sibling directories were searched.

## Components and migration decisions
| Component | Evidence / condition | Scientific relevance / decision |
|---|---|---|
| HASTY-CR deterministic simulator | sim/, tests/, research/, reports/ | Game physics, not neural dynamics; archive intact, no imports from scientific package. |
| HASTY-CR PPO and token models | sim/model_tokens.py, sim/token_agent.py, training/evaluation scripts | Reproducibility and profiling patterns only; retain game features, rewards and weights solely in legacy. |
| Experience and opponent state | scripts/brain/experience.py, opponent.py | Task-specific memory; retain as legacy, do not relabel as biological memory. |
| Pipeline protocols | src/hastycr/ports.py | General separation-of-concerns pattern is useful; not anatomical validation. |
| Game datasets and checkpoints | data/, checkpoints/, tmp/, vendor/ | Preserve byte-for-byte; never use as biological training data. |
| Local launch/capture changes | run.ps1, scripts/emulator.py and backup copies | Preserve without committing or overwriting. |
| External NeuroML DQN | github.com/cameronorr2011-beep/game-website, bot/bot_ml.py | Dueling residual game-policy architecture; standard profile independently recounted at exactly 13,724,181 parameters using only inspected class definitions, without weights or bot startup; this is not a neuron count. Archive pinned source/history; no biological weight transfer. |
| External spiking nucleus | bot/spiking_core.py; classes LIFNeuron, STDPSynapse, HomeostaticController, SpikingNucleus | Recover for reference and targeted tests. LIF uses Euler with diffusion-scaled jitter. Important defects/limitations: delay_ms is stored but delivery is immediate; synaptic/adaptation decay is skipped during refractory early return; _soft_bound is not used by pre/post updates; eligibility increments on isolated spikes. Reimplement explicit units/delays rather than copy blindly. |
| Affective state | same file, AffectiveCore | Current revision expands seven historical channels to 21 computational channels. Game analogues, not emotions or measured neuromodulators; archive only. |
| Episodic/working memory | HippocampalIndex, PrefrontalCortex | Similarity retrieval and bounded outcome history; computational analogues, not biological validation. |
| Temporal Transformer | HASTY-CR sim/model_tokens.py TokenPolicy uses TransformerEncoder over game entities; recovered external QNet has optional GRU temporal branch | Preserve both game architectures; no scientific sequence model recovered or trained. |

## Safety
No live .env, PEM, credential or private-key file was found by the non-environment filename scan; vendor/CRBot-public/.env.example is a template. Never inspect credential values. Installed environments and caches are reproducible runtime artifacts, not scientific assets. Preserve them locally but do not include them in source-control staging. A verified source/assets backup and Git bundle must precede migration. Nested vendor instructions apply if editing vendor code; no such edits are planned.

## External repository
GitHub API access succeeded, main branch only was listed. Recovered evidence includes historical commits 90fd24fe61 (LIF/STDP), 45a767605d (memory), b519e674e2 (historical 13.7M policy), fb4917b317 (profiles), and current bot/brain_xl.py. Downloaded source will be pinned by commit and checksummed. Remote release weights have not been recovered or executed.

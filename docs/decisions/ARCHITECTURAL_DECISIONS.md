# Architectural decisions

1. Preserve the full HASTY-CR history, local changes and scientific-relevant assets using a verified Git bundle plus SHA-256 copied-file manifest before rename. Keep an immutable original-path backup. Environments/caches are excluded from the backup but retained locally across rename; they are reproducible runtimes, not research assets.
2. Separate legacy game package/source from the new `neuro_ml` import graph. No game encodings, rewards or trained game weights in neuroscience models. External unlicensed reference files stay local and ignored.
3. Use NumPy/SciPy sparse CPU numerical backends. Existing CPU-only PyTorch is not a reason to train a large policy model. Add only SciPy and PyArrow needed for actual workloads; use existing NumPy/psutil/testing stack. Avoid adding every simulator framework.
4. Pin the inspectable FlyWire v783 proofread release. Do not fetch the much larger all-synapse file. Keep original count anatomy distinct from inferred current strengths; unresolved signs default to no physiological transmission. ACh/GABA sign policy is explicit opt-in.
5. Retain every source proofread ID, including isolated nodes. Aggregate source pair/neuropil rows correctly. Use uint64, never float IDs.
6. Human strict mode must fail on missing coverage; do not fabricate missing anatomy to pass a test. TVB96 is an explicitly partial research baseline, not fulfillment of the complete regional model objective.
7. Sleep continuous state dynamics are exploratory and their failed biological benchmark is retained. Five defined labels alone do not count as valid sleep architecture. No decorative EEG generator.
8. Local read-only dashboard uses the standard library and browser canvas, no new hosted service, remote API or credentials. Interactive 3D anatomy and run controls are deferred until their data/backend contracts exist.
9. No new Git commit or push was requested. Do not commit the preexisting dirty edits, environments, large assets, backup or downloaded datasets by accident. Publication/release and third-party source licensing need independent review.

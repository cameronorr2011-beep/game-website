# Neuro-ML project memory

## Identity and scope
Neuro-ML is a computational neuroscience research foundation, not a trained human brain. FlyWire anatomy, human regional models and sleep dynamics are distinct subsystems. Never connect fly neurons to human anatomy or transfer game observations/rewards/checkpoints into biological claims.

## Entry points
`python -m neuro_ml --help`; numerical checks: `python -m pytest tests/test_neuro_science.py -q`.
Use Python >=3.12. Local Windows interpreter: `.venv/Scripts/python.exe`; shell default Python may be 3.8. Installation instructions are in README.md.

## Evidence and invariants
- Preserve source datasets, checkpoints and legacy local edits; never silently overwrite a run/dataset directory.
- IDs remain exact uint64 for FlyWire; matrix rows are targets and columns sources.
- Anatomical counts are not conductances; inferred weights/signs must be separately labeled.
- Missing transmitter predictions preserve anatomy and remain unknown. Do not invent physiology, annotations or morphology.
- Strict human whole-brain mode fails on missing groups, hemispheric coverage, isolated nodes or disconnected anatomy. TVB96 is partial; do not call it complete.
- First 24h sleep baseline fails realistic architecture (no REM, excessive wake). Read docs/research/SLEEP_MODEL.md before changes. Do not force a plausible hypnogram to hide the failure.
- No subjective experience, reconstructed recorded activity, clinical accuracy or NeuroML2 compliance claims.
- No biological validation has yet been completed; numerical tests are distinct.

## Preservation
Original HASTY-CR HEAD ac4ef71194167e97f34550fc91c026b6d707a0cd, one local main branch, 57 commits. Original dirty launch/emulator edits and backups retained. `.migration-backup/` holds verified original files/manifest and history.bundle; do not modify/delete it. `legacy/hasty_cr/` is archived game code. Local `.venv` and `.venvs` are not source assets; exclude from Git. `legacy/neuroml_reference/` holds six pinned external source/test files; no explicit upstream license identified, reference only, ignored in Git. No scientific runtime imports legacy.

## Documentation
Read docs/research/PREVIOUS_WORK_AUDIT.md, docs/architecture/SYSTEM_ARCHITECTURE.md, docs/decisions/KNOWN_LIMITATIONS.md and docs/FINAL_REPORT.md. Generated dataset manifests, graph statistics and experiment reports are authoritative for actual counts/timing. Code is a functioning but incomplete research baseline. Do not mark the user's complete-platform acceptance criteria satisfied.

## Security and publication
No credentials in code, documents, source archives or chat. Never read secret values. Never publish data or checkpoints without checking terms. Git history is preserved but no commit/push/deploy is authorized by this task. Existing game/vendor licenses and external reference permissions need review before redistribution. Keep .migration-backup, downloaded data, model outputs, runtimes and reference source ignored.

"""Finish layout only after the verified preservation copy and root rename."""
from pathlib import Path
import json
import shutil

ROOT=Path(__file__).resolve().parents[1]

def main():
    if ROOT.name!='Neuro-ML': raise RuntimeError('Rename must finish first')
    manifest=json.loads((ROOT/'.migration-backup/manifest.json').read_text(encoding='utf-8'))
    legacy=ROOT/'legacy/hasty_cr';legacy.mkdir(parents=True,exist_ok=True)
    # Only original archived paths determine layout moves, never newly added science.
    originals={Path(f['path']).parts[0] for f in manifest['files']}
    keep={'LICENSE','docs','tests','scripts','.gitignore','pyproject.toml','README.md'}
    for name in sorted(originals-keep):
        source=ROOT/name
        if not source.exists(): continue
        target=legacy/name
        if target.exists(): raise FileExistsError(target)
        shutil.move(str(source),str(target))
    for name in ['README.md','pyproject.toml','.gitignore']:
        shutil.copy2(ROOT/'.migration-backup/files'/name,legacy/name)
    # Move only preexisting docs/tests/scripts, leave new additions at root.
    for directory in ['docs','tests','scripts']:
        original_files=[Path(f['path']) for f in manifest['files'] if Path(f['path']).parts[0]==directory]
        for relative in original_files:
            # Our migration helper/audit were added before backup: retain them at root.
            if relative.as_posix() in {'scripts/neuro_migrate.py','docs/research/PREVIOUS_WORK_AUDIT.md'}: continue
            source=ROOT/relative;target=legacy/relative
            target.parent.mkdir(parents=True,exist_ok=True)
            if target.exists(): raise FileExistsError(target)
            shutil.move(str(source),str(target))
    # Keep local runtimes at root; they were not scientific assets and were excluded from source backup.
    (legacy/'ARCHIVE.md').write_text('Archived HASTY-CR game simulator. Run commands from this directory.\n'
        'Original source/assets and dirty changes preserved. Root .venv remains local; use ../../.venv/Scripts/python.exe.\n'
        'Original absolute paths/checksums are in ../../.migration-backup/manifest.json. No scientific package imports this archive.\n',encoding='utf-8')
    print('Legacy layout complete:',legacy)

if __name__=='__main__': main()

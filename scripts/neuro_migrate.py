"""One-shot local preservation migration. Never stages, commits or pushes files."""
from pathlib import Path
import hashlib
import json
import os
import re
import shutil
import subprocess
import time

ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT.with_name('Neuro-ML')
BACKUP = ROOT / '.migration-backup'
SKIP = {'.git', '.venv', '.venvs', '__pycache__', '.pytest_cache', 'node_modules', '.migration-backup'}
SECRET = re.compile(r'(^\.env($|\.)|credential|secret|(?:api|groq|openai|access)[_-]?key|\.pem$|\.key$|keystore$)', re.I)

def digest(path):
    h = hashlib.sha256()
    with path.open('rb') as stream:
        for chunk in iter(lambda: stream.read(4 * 1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()

def main():
    if ROOT.name.lower() != 'hasty-cr' or TARGET.exists() or BACKUP.exists():
        raise RuntimeError('Unexpected source, existing target or backup: refusing overwrite')
    files = []
    for folder, dirs, names in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in SKIP]
        for name in names:
            if name == 'migration-progress.log':
                continue
            path = Path(folder) / name
            if SECRET.search(name) and not name.endswith(('.example', '.sample', '.template')):
                raise RuntimeError('Credential-like path found; migration requires manual separation: ' + str(path.relative_to(ROOT)))
            files.append(path)
    BACKUP.mkdir()
    subprocess.run(['git', 'bundle', 'create', str(BACKUP / 'history.bundle'), '--all'], cwd=ROOT, check=True)
    subprocess.run(['git', 'bundle', 'verify', str(BACKUP / 'history.bundle')], cwd=ROOT, check=True)
    (BACKUP / 'working-tree.patch').write_bytes(subprocess.check_output(['git', 'diff', 'HEAD', '--binary'], cwd=ROOT))
    manifest = []
    started = time.perf_counter()
    for i, path in enumerate(files):
        relative = path.relative_to(ROOT)
        destination = BACKUP / 'files' / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, destination)
        original = digest(path)
        if original != digest(destination):
            raise RuntimeError('Backup verification failed: ' + str(relative))
        manifest.append({'path': relative.as_posix(), 'bytes': path.stat().st_size, 'sha256': original})
        if i % 500 == 0:
            print('verified', i, '/', len(files), flush=True)
    (BACKUP / 'manifest.json').write_text(json.dumps({'files': manifest, 'seconds': time.perf_counter()-started,
        'excluded': sorted(SKIP), 'credentials': 'no live credential-named files found outside excluded runtimes'}, indent=2), encoding='utf-8')
    head = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT).decode().strip()
    # Native rename after handles have closed, retaining the entire .git and local environments.
    os.chdir(ROOT.parent)
    ROOT.rename(TARGET)
    if subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=TARGET).decode().strip() != head:
        raise RuntimeError('HEAD changed across rename')
    print('MIGRATED', TARGET, 'verified_files', len(files), 'HEAD', head, flush=True)

if __name__ == '__main__':
    main()

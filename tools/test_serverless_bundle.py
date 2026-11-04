"""Cold-start the real Vercel API handler in an isolated, bundle-like copy.

There is intentionally NO data/connectome.sqlite or import cache in this copy.
This catches accidental reliance on a developer's 1.55 GB local database,
missing Python modules, missing bundled assets, wrong route/header handling,
and invalid/not-configured error semantics before deployment.
"""
from __future__ import annotations

import json
import os
from pathlib import Path
import select
import shutil
import subprocess
import sys
import tempfile
import time
from urllib.error import HTTPError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
CHILD = """
from http.server import ThreadingHTTPServer
from api.connectome import handler
server=ThreadingHTTPServer(('127.0.0.1', 0), handler)
print(server.server_port, flush=True)
server.serve_forever()
"""


def get(url: str, method: str = "GET"):
    request = Request(url, method=method)
    try:
        with urlopen(request, timeout=30) as response:
            return response.status, response.headers, response.read()
    except HTTPError as exc:
        return exc.code, exc.headers, exc.read()


def main():
    with tempfile.TemporaryDirectory(prefix="neuroml-serverless-") as work:
        root = Path(work)
        (root / "api").mkdir()
        (root / "connectome").mkdir()
        for name in ("api/connectome.py", "connectome/service.py", "connectome/portable.py", "connectome/__init__.py"):
            path = ROOT / name
            if path.is_file():
                shutil.copyfile(path, root / name)
        shutil.copytree(ROOT / "public/data", root / "public/data")
        (root / "tmp").mkdir()  # force a genuinely empty cold-start extraction cache
        assert not (root / "data/connectome.sqlite").exists()
        env = {**os.environ, "PYTHONPATH": str(root), "TMPDIR": str(root / "tmp")}
        env.pop("NEUROML_DB_PATH", None)
        env.pop("NEUROML_FORCE_PORTABLE", None)
        env.pop("NEUROML_UPSTREAM", None)
        child = subprocess.Popen([sys.executable, "-c", CHILD], cwd=root, env=env,
                                 stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        try:
            started = time.monotonic()
            if not select.select([child.stdout], [], [], 25)[0]:
                raise RuntimeError("Isolated API handler did not start in 25 seconds")
            line = child.stdout.readline().strip()
            if not line.isdecimal():
                detail = child.stderr.read() if child.poll() is not None else "handler printed an unexpected readiness line"
                raise RuntimeError("Isolated API failed to start: " + line + " " + detail[:400])
            base = f"http://127.0.0.1:{line}/api/connectome"
            code, _, body = get(base + "?resource=status")
            data = json.loads(body)
            assert code == 200 and data["active"]["storage"] == "portable-index", data
            assert data["active"]["neurons"] == 139255 and data["active"]["directed_pairs"] == 15091983
            assert data["active"]["official_pair_asset_crosschecked"] is True
            print("PASS: real Vercel handler cold-started without the local SQLite file in",
                  round(time.monotonic() - started, 2), "seconds")
            code, _, body = get(base + "?resource=integrity")
            integrity = json.loads(body)["data"]
            assert code == 200 and integrity["synaptic_contacts"] == 54492922
            assert integrity["official_pair_asset_crosscheck"]["matched"] is True
            assert integrity["canonical_zenodo_verified"] is False
            code, _, body = get(base + "?resource=search&q=LPLC2&limit=5")
            hits = json.loads(body)
            assert code == 200 and hits["total"] > 0 and hits["results"]
            code, _, body = get(base + "?resource=filter-count&min_synapses=5")
            assert code == 200 and json.loads(body)["hidden_pairs"] == 12391470
            first = "720575940596125868"
            code, _, body = get(base + f"?resource=outgoing&id={first}&limit=1")
            outgoing = json.loads(body)
            assert code == 200 and outgoing["total"] > 0
            connection = outgoing["connections"][0]
            code, _, body = get(base + f"?resource=edge&source={first}&target={connection['target']}")
            assert code == 200 and json.loads(body)["synapse_count"] == connection["synapse_count"]
            code, _, body = get(base + f"?resource=trace&source={first}&target={connection['target']}&max_hops=1")
            assert code == 200 and json.loads(body)["found"] is True
            code, headers, body = get(base + "?resource=region-mask&region=EB")
            assert code == 200 and len(body) == 139255 and int(headers["X-Neurons-In-Region"]) > 0
            code, headers, body = get(base + "?resource=overview")
            assert code == 200 and len(body) == 3342128 and body[:4] == b"NML1"
            assert headers["Content-Type"] == "application/octet-stream"
            print("PASS: real ID, FTS, all-pair count, paged adjacency, edge, path, region mask and binary overview")
            code, _, body = get(base + "?resource=neuron&id=not-an-id")
            assert code == 400 and json.loads(body)["status"] == 400
            code, _, body = get(base + "?resource=neuron&id=720575940611111111")
            assert code == 404 and json.loads(body)["status"] == 404
            code, _, body = get(base, "POST")
            assert code == 405 and json.loads(body)["error"] == "Read-only API"
            print("PASS: bad IDs, unknown records and write attempts fail closed")
            print("SERVERLESS_BUNDLE_OK")
        finally:
            child.terminate()
            try:
                child.wait(timeout=8)
            except subprocess.TimeoutExpired:
                child.kill()
                child.wait(timeout=8)


if __name__ == "__main__":
    main()

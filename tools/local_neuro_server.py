"""Small local server for browser QA of the static site and real APIs."""
from __future__ import annotations

import json
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import sys
from urllib.parse import parse_qs, urlparse

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from neuro_ml.connectome_service import graph


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PUBLIC), **kwargs)

    def _json(self, value, status=200):
        body = json.dumps(value, allow_nan=False).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):  # noqa: N802
        parsed = urlparse(self.path)
        if parsed.path in {"/api/connectome", "/api/connectome/"}:
            query = parse_qs(parsed.query)
            op = query.get("op", ["manifest"])[0]
            try:
                data = graph()
                if op == "manifest": result = data.manifest
                elif op == "search": result = data.search(query.get("q", [""])[0], int(query.get("limit", [40])[0]))
                elif op == "neuron": result = data.neuron(query["id"][0], int(query.get("limit", [20])[0]))
                elif op == "connections": result = data.connections(query["id"][0], query.get("direction", ["outgoing"])[0], int(query.get("threshold", [1])[0]), int(query.get("limit", [100])[0]))
                elif op == "overview": result = data.overview(int(query.get("nodes", [240])[0]))
                elif op == "pathway": result = data.pathway(query["source"][0], query["target"][0], int(query.get("threshold", [1])[0]), int(query.get("max_hops", [8])[0]))
                elif op == "statistics": result = data.statistics()
                else: raise ValueError(f"unknown operation: {op}")
                self._json(result)
            except Exception as error:
                self._json({"error": str(error)}, 400)
            return
        if parsed.path in {"/api/sleep", "/api/sleep/"}:
            try:
                from api.sleep import simulate
                query = parse_qs(parsed.query)
                payload = simulate(
                    float(query.get("pressure", [0.25])[0]),
                    float(query.get("rem", [0.0])[0]),
                    float(query.get("seconds", [2.0])[0]),
                    int(query.get("seed", [7])[0]),
                )
                self._json(payload)
            except Exception as error:
                self._json({"error": str(error)}, 400)
            return
        if parsed.path.startswith("/api/"):
            self._json({"error": "local server only implements connectome queries"}, 404)
            return
        if parsed.path in {"/", "/connectome", "/neurons", "/connectivity", "/pathways", "/regions", "/statistics", "/simulations", "/datasets", "/documentation", "/about", "/downloads", "/sleep"}:
            candidate = PUBLIC / ("index.html" if parsed.path == "/" else parsed.path.strip("/") + ".html")
            if candidate.exists():
                self.path = "/" + candidate.relative_to(PUBLIC).as_posix()
        super().do_GET()

    def log_message(self, format, *args):
        print(format % args)


def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8787)
    args = parser.parse_args()
    server = ThreadingHTTPServer(("127.0.0.1", args.port), Handler)
    print(f"Neuro-ML local site: http://127.0.0.1:{args.port}", flush=True)
    try:
        server.serve_forever()
    finally:
        server.server_close()


if __name__ == "__main__":
    main()

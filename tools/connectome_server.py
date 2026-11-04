"""Same-origin local/persistent production server: static UI + read-only API.

python tools/connectome_server.py --host 0.0.0.0 --port 8000
Set NEUROML_DB_PATH and (for a public upstream) CONNECTOME_SERVER_TOKEN.
"""
import argparse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os
from pathlib import Path
import sys
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
from connectome.service import dispatch, json_bytes  # noqa: E402
from api.sleep import handler as SleepHandler  # noqa: E402 — reuse the existing working endpoint


class Site(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT / "public"), **kwargs)

    def do_HEAD(self):
        path = urlsplit(self.path).path
        for alias, page in (("download", "download.html"), ("sleep", "sleep.html"),
                            ("connectome", "index.html")):
            if path in (f"/{alias}", f"/{alias}/"):
                self.path = f"/{page}"
                break
        return super().do_HEAD()

    def do_GET(self):
        path = urlsplit(self.path).path
        if path.rstrip("/") == "/api/connectome":
            token = os.getenv("CONNECTOME_SERVER_TOKEN")
            if token and self.headers.get("X-Internal-Token") != token:
                self.api_response(json_bytes({"error": "Upstream authentication required"}), 403,
                                  {"Content-Type": "application/json"})
                return
            body, code, headers = dispatch(urlsplit(self.path).query)
            self.api_response(body, code, headers)
            return
        if path.rstrip("/") == "/api/sleep":
            SleepHandler.do_GET(self)
            return
        if path in ("/datasets", "/datasets/"):
            self.send_response(302)
            self.send_header("Location", "/#integrity")
            self.send_header("Content-Length", "0")
            self.end_headers()
            return
        if path in ("/download", "/download/"):
            self.path = "/download.html"
        elif path in ("/sleep", "/sleep/"):
            self.path = "/sleep.html"
        elif path in ("/connectome", "/connectome/"):
            self.path = "/index.html"
        return super().do_GET()

    def api_response(self, body, code, headers):
        self.send_response(code)
        for name, value in headers.items():
            self.send_header(name, value)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("X-Content-Type-Options", "nosniff")
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--host", default="0.0.0.0")
    parser.add_argument("--port", type=int, default=int(os.getenv("PORT", "8000")))
    args = parser.parse_args()
    server = ThreadingHTTPServer((args.host, args.port), Site)
    print(f"NeuroML connectome server on {args.host}:{args.port}", flush=True)
    server.serve_forever()

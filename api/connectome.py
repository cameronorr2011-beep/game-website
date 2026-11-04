"""Vercel-compatible, read-only connectome API.

By default, query the committed checksum-verified compact pair/metadata package:
no 1.5 GB SQLite file or separate service is required on the serverless host.
An operator can optionally override it with NEUROML_UPSTREAM (and a shared
NEUROML_UPSTREAM_TOKEN / CONNECTOME_SERVER_TOKEN). Browser requests remain
same-origin at /api/connectome; failures are reported, never mocked.
"""
from http.server import BaseHTTPRequestHandler
import os
from urllib.parse import urlsplit
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

from connectome.service import dispatch, json_bytes


class handler(BaseHTTPRequestHandler):  # Vercel Python runtime entry point
    def do_GET(self):
        parsed = urlsplit(self.path)
        if parsed.path.rstrip("/") != "/api/connectome":
            self.respond(json_bytes({"error": "Not found"}), 404, {"Content-Type": "application/json"})
            return
        upstream = os.getenv("NEUROML_UPSTREAM")
        if upstream:
            if not upstream.startswith("https://") and os.getenv("NEUROML_ALLOW_HTTP_UPSTREAM") != "1":
                self.respond(json_bytes({"error": "Upstream must use HTTPS"}), 503, {"Content-Type": "application/json"})
                return
            url = upstream.rstrip("/") + "/api/connectome" + ("?" + parsed.query if parsed.query else "")
            headers = {"X-Internal-Token": os.getenv("NEUROML_UPSTREAM_TOKEN", "")}
            try:
                with urlopen(Request(url, headers=headers), timeout=26) as res:
                    response_headers = {"Content-Type": res.headers.get("Content-Type", "application/octet-stream"),
                                        "Cache-Control": "no-store"}
                    if res.headers.get("X-Neurons-In-Region"):
                        response_headers["X-Neurons-In-Region"] = res.headers["X-Neurons-In-Region"]
                    self.respond(res.read(), res.status, response_headers)
            except HTTPError as exc:
                self.respond(exc.read(), exc.code, {"Content-Type": exc.headers.get("Content-Type", "application/json")})
            except (OSError, URLError) as exc:
                self.respond(json_bytes({"error": "Configured connectome upstream is unavailable", "detail": str(exc)}),
                             503, {"Content-Type": "application/json"})
            return
        body, status, headers = dispatch(parsed.query)
        self.respond(body, status, headers)

    def do_POST(self):
        self.respond(json_bytes({"error": "Read-only API"}), 405, {"Content-Type": "application/json"})

    def respond(self, body, status, headers):
        self.send_response(status)
        for key, value in headers.items():
            self.send_header(key, value)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("X-Content-Type-Options", "nosniff")
        self.end_headers()
        self.wfile.write(body)

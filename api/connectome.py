"""Vercel-compatible read-only API for the complete FAFB v783 graph index."""
from __future__ import annotations

import json
from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse

from neuro_ml.connectome_service import graph


def _payload(handler: BaseHTTPRequestHandler, value: object, status: int = 200, content_type: str = "application/json"):
    body = json.dumps(value, allow_nan=False, separators=(",", ":")).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", content_type)
    handler.send_header("Content-Length", str(len(body)))
    handler.send_header("Cache-Control", "no-store")
    handler.send_header("X-Content-Type-Options", "nosniff")
    handler.end_headers()
    handler.wfile.write(body)


class handler(BaseHTTPRequestHandler):
    def do_GET(self):  # noqa: N802 - Vercel's Python runtime discovers this class.
        parsed = urlparse(self.path)
        if parsed.path not in {"/api/connectome", "/api/connectome/"}:
            _payload(self, {"error": "not found"}, 404)
            return
        query = parse_qs(parsed.query)
        op = query.get("op", ["manifest"])[0]
        try:
            data = graph()
            if op == "manifest":
                result = data.manifest
            elif op == "search":
                result = data.search(query.get("q", [""])[0], int(query.get("limit", [40])[0]))
            elif op == "neuron":
                result = data.neuron(query["id"][0], int(query.get("limit", [20])[0]))
            elif op == "connections":
                result = data.connections(query["id"][0], query.get("direction", ["outgoing"])[0], int(query.get("threshold", [1])[0]), int(query.get("limit", [100])[0]))
            elif op == "overview":
                result = data.overview(int(query.get("nodes", [240])[0]))
            elif op == "pathway":
                result = data.pathway(query["source"][0], query["target"][0], int(query.get("threshold", [1])[0]), int(query.get("max_hops", [8])[0]))
            elif op == "statistics":
                result = data.statistics()
            elif op == "region":
                name = query.get("name", [""])[0]
                regions = data.manifest.get("neuropil_synapses", {})
                result = {"name": name, "synapses": regions.get(name), "available": sorted(regions), "note": "Aggregate neuropil counts are source-derived; per-neuron neuropil membership was not imported."}
            else:
                _payload(self, {"error": f"unknown operation: {op}"}, 400)
                return
            _payload(self, result)
        except (KeyError, ValueError, IndexError) as error:
            _payload(self, {"error": str(error)}, 400)
        except Exception as error:  # surfaced as a real error, never a mock result
            _payload(self, {"error": f"connectome service failure: {type(error).__name__}: {error}"}, 500)

    def log_message(self, *_args):
        return

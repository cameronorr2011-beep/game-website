"""The optional same-origin upstream path must preserve binary metadata and fail closed."""
from http.server import ThreadingHTTPServer
import json
import os
import threading
import unittest
from unittest import mock
from urllib.error import HTTPError
from urllib.request import urlopen

from api.connectome import handler as Proxy
from tools.connectome_server import Site


class QuietSite(Site):
    def log_message(self, *_args):
        pass


class QuietProxy(Proxy):
    def log_message(self, *_args):
        pass


def request(url):
    try:
        with urlopen(url, timeout=20) as response:
            return response.status, response.headers, response.read()
    except HTTPError as exc:
        return exc.code, exc.headers, exc.read()


class ProxyTests(unittest.TestCase):
    def test_authenticated_upstream_preserves_region_header_and_rejects_failover(self):
        original = os.environ.pop("NEUROML_DB_PATH", None)
        with mock.patch.dict(os.environ, {"NEUROML_FORCE_PORTABLE": "1", "CONNECTOME_SERVER_TOKEN": "test-only-secret",
                                           "NEUROML_UPSTREAM_TOKEN": "test-only-secret", "NEUROML_ALLOW_HTTP_UPSTREAM": "1"}):
            origin = ThreadingHTTPServer(("127.0.0.1", 0), QuietSite)
            thread = threading.Thread(target=origin.serve_forever, daemon=True)
            thread.start()
            os.environ["NEUROML_UPSTREAM"] = f"http://127.0.0.1:{origin.server_port}"
            proxy = ThreadingHTTPServer(("127.0.0.1", 0), QuietProxy)
            thread2 = threading.Thread(target=proxy.serve_forever, daemon=True)
            thread2.start()
            try:
                code, headers, mask = request(f"http://127.0.0.1:{proxy.server_port}/api/connectome?resource=region-mask&region=EB")
                self.assertEqual(code, 200)
                self.assertEqual(len(mask), 139255)
                self.assertGreater(int(headers["X-Neurons-In-Region"]), 0)
                code, _, body = request(f"http://127.0.0.1:{proxy.server_port}/api/connectome?resource=status")
                self.assertEqual(code, 200)
                self.assertTrue(json.loads(body)["active"]["official_pair_asset_crosschecked"])
                code, _, _ = request(f"http://127.0.0.1:{origin.server_port}/api/connectome?resource=status")
                self.assertEqual(code, 403)  # the upstream itself requires the server-side token
                os.environ["NEUROML_UPSTREAM"] = "http://127.0.0.1:1"
                code, _, body = request(f"http://127.0.0.1:{proxy.server_port}/api/connectome?resource=status")
                self.assertEqual(code, 503)
                self.assertIn("unavailable", json.loads(body)["error"])
                os.environ.pop("NEUROML_ALLOW_HTTP_UPSTREAM")
                code, _, body = request(f"http://127.0.0.1:{proxy.server_port}/api/connectome?resource=status")
                self.assertEqual(code, 503)
                self.assertIn("HTTPS", json.loads(body)["error"])
            finally:
                proxy.shutdown(); proxy.server_close(); origin.shutdown(); origin.server_close()
                thread.join(timeout=2); thread2.join(timeout=2)
        if original is not None:
            os.environ["NEUROML_DB_PATH"] = original


if __name__ == "__main__":
    unittest.main()

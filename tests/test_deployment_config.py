"""Guard the Vercel routing and bundle settings used by the live preview."""
import json
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]


class DeploymentConfigTests(unittest.TestCase):
    def test_versioned_assets_and_existing_routes_are_deployable(self):
        config = json.loads((ROOT / "vercel.json").read_text())
        self.assertEqual(config["outputDirectory"], "public")
        self.assertEqual(config["functions"]["api/connectome.py"]["includeFiles"], "public/data/**")
        self.assertGreaterEqual(config["functions"]["api/connectome.py"]["memory"], 1024)
        self.assertIn("api/sleep.py", config["functions"])
        # Vercel's outputDirectory clean-URL routing did not honor a rewrite to
        # /index.html in its real preview; a redirect to / DOES work.
        redirects = {item["source"]: item["destination"] for item in config["redirects"]}
        self.assertEqual(redirects["/connectome"], "/")
        self.assertEqual(redirects["/datasets"], "/#integrity")
        files = json.loads((ROOT / "public/data/portable-manifest.json").read_text())
        for name in ("graph", "metadata", "overview"):
            path = ROOT / "public/data" / files[name]["file"]
            self.assertEqual(path.stat().st_size, files[name]["bytes"])


if __name__ == "__main__":
    unittest.main()

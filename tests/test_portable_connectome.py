"""Compare two storage backends on the same explicitly synthetic test fixtures.

The real packaged-data test below uses only actual v783 IDs; no fixture is
exposed in the user-facing atlas or its bundled serverless assets.
"""
from contextlib import contextmanager, redirect_stdout
import gzip
import io
import json
import os
from pathlib import Path
import shutil
import sqlite3
import tempfile
import unittest
from unittest import mock

import numpy as np

from connectome import portable, service
from connectome.ingest import main
from test_connectome import IDS, write_sources


@contextmanager
def portable_backend(folder, missing_db):
    previous = os.environ.pop("NEUROML_DB_PATH", None)
    os.environ.pop("NEUROML_FORCE_PORTABLE", None)
    try:
        with mock.patch.object(portable, "PORTABLE_DIR", folder), mock.patch.object(service, "DEFAULT_DB", missing_db):
            portable.manifest.cache_clear()
            portable.metadata_path.cache_clear()
            portable.graph.cache_clear()
            yield
    finally:
        portable.graph.cache_clear()
        portable.metadata_path.cache_clear()
        portable.manifest.cache_clear()
        if previous is not None:
            os.environ["NEUROML_DB_PATH"] = previous


def result(query):
    body, code, _ = service.dispatch(query)
    return (json.loads(body) if body[:4] != b"NML1" and "resource=region-mask" not in query else body), code


class PortableFixtureTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp = tempfile.TemporaryDirectory()
        cls.folder = Path(cls.temp.name)
        cls.package = cls.folder / "package"
        cls.package.mkdir()
        nodes, edges, annotations, regions = write_sources(cls.folder)
        cls.db = cls.folder / "test.sqlite"
        with redirect_stdout(io.StringIO()):
            main(["import", "--mode", "shiu", "--db", str(cls.db), "--neurons", str(nodes),
                  "--edges", str(edges), "--regions", str(regions), "--annotations", str(annotations),
                  "--allow-unverified"])
        with sqlite3.connect(cls.db) as conn:
            rows = conn.execute("SELECT pre,post,syn_count FROM edges ORDER BY pre,post").fetchall()
            source = sqlite3.connect(cls.package / "raw-meta.sqlite")
            conn.backup(source)
            source.execute("DROP TABLE edges")
            source.execute("DROP INDEX IF EXISTS region_by_region_pre")
            source.execute("DROP INDEX IF EXISTS region_by_region_post")
            source.commit()
            source.execute("VACUUM")
            source.close()
        ids = np.array(IDS, dtype=np.uint64)
        pointer = np.array([0,2,3,4,4], dtype=np.int64)
        positions = {value: index for index, value in enumerate(IDS)}
        np.savez_compressed(cls.package / "flywire-v783.npz", ids=ids, out_indptr=pointer,
                            out_indices=np.asarray([positions[post] for _, post, _ in rows], dtype=np.int32),
                            out_data=np.asarray([weight for _, _, weight in rows], dtype=np.int32),
                            shape=np.array([4, 4], dtype=np.int64))
        shutil.copyfile(cls.folder / "overview.bin", cls.package / "overview.bin")
        with open(cls.package / "raw-meta.sqlite", "rb") as inp, gzip.open(cls.package / "portable-meta.sqlite.gz", "wb") as out:
            shutil.copyfileobj(inp, out)
        graph_sha = portable.digest(cls.package / "flywire-v783.npz")
        (cls.package / "original-asset-manifest.json").write_text(json.dumps({"asset": {"sha256": graph_sha}}))
        def file_info(name):
            path = cls.package / name
            return {"file": name, "bytes": path.stat().st_size, "sha256": portable.digest(path)}
        doc = {"graph": file_info("flywire-v783.npz"), "metadata": file_info("portable-meta.sqlite.gz"),
               "overview": file_info("overview.bin"),
               "counts": {"neurons": 4, "directed_pairs": 4, "synaptic_contacts": 10}}
        doc["metadata"].update(sqlite_bytes=(cls.package / "raw-meta.sqlite").stat().st_size,
                               sqlite_sha256=portable.digest(cls.package / "raw-meta.sqlite"))
        (cls.package / "portable-manifest.json").write_text(json.dumps(doc))

    @classmethod
    def tearDownClass(cls):
        cls.temp.cleanup()

    def test_identical_query_results_on_full_and_portable_indices(self):
        queries = ["resource=search&q=KC", "resource=search&q=9999999999999999999",
                   "resource=search&connected_to=9999999999999999999", "resource=neurons&class=sensory&side=left",
                   f"resource=search&connected_to={IDS[1]}", f"resource=neuron&id={IDS[1]}",
                   f"resource=outgoing&id={IDS[0]}&limit=1&offset=1",
                   f"resource=incoming&id={IDS[3]}&min_synapses=5",
                   f"resource=outgoing&id={IDS[2]}&region=MB_R",
                   f"resource=incoming&id={IDS[3]}&region=MB_R",
                   f"resource=edge&source={IDS[2]}&target={IDS[3]}",
                   f"resource=edge&source={IDS[3]}&target={IDS[2]}",
                   f"resource=trace&source={IDS[0]}&target={IDS[3]}&min_synapses=2",
                   f"resource=neighborhood&id={IDS[0]}",
                   "resource=filter-count&min_synapses=1", "resource=filter-count&min_synapses=5",
                   "resource=region-mask&region=MB_R", "resource=overview"]
        os.environ["NEUROML_DB_PATH"] = str(self.db)
        try:
            expected = {query: result(query) for query in queries}
            with portable_backend(self.package, self.folder / "no-full-db.sqlite"):
                status, code = result("resource=status")
                self.assertEqual(code, 200)
                self.assertEqual(status["active"]["storage"], "portable-index")
                for query in queries:
                    with self.subTest(query=query):
                        self.assertEqual(result(query), expected[query])
                self.assertEqual(portable.graph().weight(IDS[0], IDS[1]), 1)
                self.assertIsNone(portable.graph().weight(IDS[3], IDS[1]))
                self.assertEqual([portable.graph().resolve(id_) for id_ in IDS], list(range(4)))
        finally:
            os.environ.pop("NEUROML_DB_PATH", None)

    def test_corrupt_package_fails_closed(self):
        compressed = self.package / "portable-meta.sqlite.gz"
        original = compressed.read_bytes()
        try:
            compressed.write_bytes(original + b"tampered")
            with portable_backend(self.package, self.folder / "no-full-db.sqlite"):
                status, _ = result("resource=status")
                self.assertEqual(status["stage"], "failed")
                self.assertIsNone(status["active"])
                error, code = result("resource=neuron&id=" + str(IDS[0]))
                self.assertEqual(code, 503)
                self.assertIn("portable", error["error"])
        finally:
            compressed.write_bytes(original)

    def test_corrupt_graph_checksum_fails_closed(self):
        asset = self.package / "flywire-v783.npz"
        original = asset.read_bytes()
        try:
            asset.write_bytes(original + b"changed")
            with portable_backend(self.package, self.folder / "no-full-db.sqlite"):
                status, _ = result("resource=status")
                self.assertEqual(status["stage"], "failed")
                self.assertIsNone(status["active"])
                error, code = result("resource=filter-count&min_synapses=1")
                self.assertEqual(code, 503)
                self.assertIn("portable", error["error"])
        finally:
            asset.write_bytes(original)

    def test_missing_override_does_not_fall_back(self):
        with portable_backend(self.package, self.folder / "no-full-db.sqlite"):
            os.environ["NEUROML_DB_PATH"] = str(self.folder / "explicitly-missing.sqlite")
            try:
                status, _ = result("resource=status")
                self.assertEqual(status["stage"], "not_configured")
                self.assertIsNone(status["active"])
            finally:
                os.environ.pop("NEUROML_DB_PATH", None)


class PublishedPackageTests(unittest.TestCase):
    def test_real_package_is_accessible_without_the_full_local_database(self):
        if not portable.available():
            self.skipTest("Versioned production assets not available")
        with portable_backend(portable.PORTABLE_DIR, Path(tempfile.gettempdir()) / "neuroml-missing-full-db.sqlite"):
            status, code = result("resource=status")
            self.assertEqual(code, 200)
            self.assertEqual(status["active"]["neurons"], 139255)
            self.assertTrue(status["active"]["official_pair_asset_crosschecked"])
            self.assertFalse(status["active"]["canonical_zenodo_verified"])
            integrity, _ = result("resource=integrity")
            self.assertEqual(integrity["data"]["source_record_fingerprint"], "e013c235acd22a36713544780763e71b")
            self.assertEqual(integrity["data"]["missing_connection_rows"], 0)
            self.assertEqual(result("resource=filter-count&min_synapses=5")[0]["hidden_pairs"], 12391470)
            first = "720575940596125868"
            neuron, _ = result(f"resource=neuron&id={first}")
            self.assertEqual(neuron["id"], first)
            outgoing, _ = result(f"resource=outgoing&id={first}&limit=200")
            self.assertEqual(outgoing["total"], neuron["out_degree"])
            self.assertGreater(outgoing["total"], 0)
            target = outgoing["connections"][0]["target"]
            edge, code = result(f"resource=edge&source={first}&target={target}")
            self.assertEqual(code, 200)
            self.assertEqual(edge["synapse_count"], outgoing["connections"][0]["synapse_count"])
            reverse, _ = result(f"resource=incoming&id={target}")
            self.assertGreater(reverse["total"], 0)
            path, _ = result(f"resource=trace&source={first}&target={target}&max_hops=1")
            self.assertEqual(path["path"], [first, target])
            search, _ = result("resource=search&q=LPLC2")
            self.assertGreater(search["total"], 0)
            self.assertIn("LPLC2", search["results"][0]["cell_type"])


if __name__ == "__main__":
    unittest.main()

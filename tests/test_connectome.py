"""Small, explicitly SYNTHETIC fixtures test the importer; never served as biology."""
import csv
import gzip
import json
import os
from pathlib import Path
import struct
import tempfile
import unittest

import pyarrow as pa
import pyarrow.feather as feather
import pyarrow.parquet as pq
import numpy as np

from connectome.ingest import main
from connectome.service import dispatch

IDS = [720575940600000001, 720575940600000002, 720575940600000003, 720575940600000004]


def write_sources(path, official=False, duplicate=False):
    path = Path(path)
    if official:
        neurons = path / "ids.npy"
        np.save(neurons, np.asarray(IDS, dtype=np.int64))
        edges = path / "connections.feather"
        data = {"pre_pt_root_id": [IDS[0], IDS[1], IDS[2], IDS[0]],
                "post_pt_root_id": [IDS[1], IDS[2], IDS[3], IDS[3]],
                "neuropil": ["AL_L", "AL_L", "MB_R", "AL_L"],
                "syn_count": [1, 2, 6, 1]}
        if duplicate:
            for k in data:
                data[k].append(data[k][0])
        feather.write_feather(pa.table(data), edges)
        region = None
    else:
        neurons = path / "neurons.csv.gz"
        with gzip.open(neurons, "wt") as f:
            w = csv.writer(f); w.writerow(["root_id", "group", "nt_type", "nt_type_score"])
            for id_ in IDS:
                w.writerow([id_, "AL", "ACH", "0.8"])
        edges = path / "pairs.parquet"
        data = {"Presynaptic_ID": [IDS[0], IDS[1], IDS[2], IDS[0]],
                "Postsynaptic_ID": [IDS[1], IDS[2], IDS[3], IDS[3]],
                "Connectivity": [1, 2, 6, 1]}
        if duplicate:
            for k in data:
                data[k].append(data[k][0])
        pq.write_table(pa.table(data), edges)
        region = path / "regions.csv.gz"
        with gzip.open(region, "wt") as f:
            w = csv.writer(f); w.writerow(["pre_root_id", "post_root_id", "neuropil", "syn_count"])
            w.writerow([IDS[2], IDS[3], "MB_R", 6])
    annotation = path / "annotations.tsv"
    with annotation.open("w") as f:
        w = csv.writer(f, delimiter="\t"); w.writerow(["root_id", "cell_type", "super_class", "side", "pos_x", "pos_y", "pos_z", "soma_x", "soma_y", "soma_z"])
        w.writerow([IDS[0], "ORN", "sensory", "left", 10, 20, 30, "", "", ""])
        w.writerow([IDS[1], "KC", "intrinsic", "right", 11, 21, 31, 9, 19, 29])
        w.writerow([IDS[2], "PN", "intrinsic", "left", 12, 22, 32, "", "", ""])
        w.writerow([IDS[3], "MBON", "output", "right", 13, 23, 33, "", "", ""])
    return neurons, edges, annotation, region


class ConnectomeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp = tempfile.TemporaryDirectory()
        cls.path = Path(cls.temp.name)
        cls.neurons, cls.edges, cls.annotation, cls.region = write_sources(cls.path)
        cls.db = cls.path / "atlas.sqlite"
        main(["import", "--mode", "shiu", "--db", str(cls.db), "--neurons", str(cls.neurons),
              "--edges", str(cls.edges), "--regions", str(cls.region), "--annotations", str(cls.annotation),
              "--allow-unverified"])
        os.environ["NEUROML_DB_PATH"] = str(cls.db)

    @classmethod
    def tearDownClass(cls):
        os.environ.pop("NEUROML_DB_PATH", None)
        cls.temp.cleanup()

    def api(self, **params):
        from urllib.parse import urlencode
        body, code, _ = dispatch(urlencode(params))
        return json.loads(body), code

    def test_integrity_and_unverified_provenance(self):
        data, code = self.api(resource="integrity")
        i = data["data"]
        self.assertEqual(code, 200)
        self.assertTrue(i["validated"])
        self.assertFalse(i["canonical_zenodo_verified"])
        self.assertFalse(i["source_files_checksum_verified"])
        self.assertEqual((i["source_neurons"], i["imported_neurons"], i["unique_neuron_ids"]), (4, 4, 4))
        self.assertEqual((i["source_connection_rows"], i["directed_pairs"], i["synaptic_contacts"]), (4, 4, 10))
        self.assertEqual(i["pairs_below_five_synapses"], 3)
        self.assertEqual(i["region_attributed_pairs"], 1)
        self.assertEqual(i["missing_connection_rows"], 0)
        self.assertEqual(i["missing_neuron_references"], 0)
        self.assertTrue(i["record_fingerprint_match"])
        self.assertTrue(i["regional_record_fingerprint_match"])
        self.assertEqual(i["source_record_fingerprint"], i["imported_record_fingerprint"])

    def test_search_inspector_and_coordinates(self):
        data, code = self.api(resource="search", q="KC")
        self.assertEqual(code, 200)
        self.assertEqual(data["total"], 1)
        self.assertEqual(data["results"][0]["id"], str(IDS[1]))
        details, _ = self.api(resource="neuron", id=str(IDS[1]))
        self.assertEqual(details["x_nm"], 44)
        self.assertEqual(details["soma_z_nm"], 1160)
        self.assertIsNone(details["presynaptic_sites"])
        self.assertEqual(details["in_degree"], 1)
        self.assertEqual(details["out_degree"], 1)
        self.assertFalse(details["morphology_available"])
        self.assertEqual(self.api(resource="neuron", id="not-an-id")[1], 400)
        self.assertEqual(self.api(resource="neuron", id="720575940611111111")[1], 404)
        self.assertEqual(self.api(resource="search", connected_to=str(IDS[1]))[0]["total"], 2)

    def test_edges_and_paths_use_real_direction_and_weights(self):
        out, _ = self.api(resource="outgoing", id=str(IDS[0]), limit=2)
        self.assertEqual(out["total"], 2)
        self.assertEqual({e["target"] for e in out["connections"]}, {str(IDS[1]), str(IDS[3])})
        incoming, _ = self.api(resource="incoming", id=str(IDS[3]), min_synapses=5)
        self.assertEqual(incoming["total"], 1)
        self.assertEqual(incoming["connections"][0]["source"], str(IDS[2]))
        self.assertEqual(self.api(resource="edge", source=str(IDS[2]), target=str(IDS[3]))[0]["neuropils"],
                         [{"neuropil": "MB_R", "synapses": 6}])
        path, _ = self.api(resource="trace", source=str(IDS[0]), target=str(IDS[3]), max_hops=4)
        self.assertTrue(path["found"])
        self.assertEqual(path["hops"], 1)
        self.assertEqual(path["connections"][0]["synapse_count"], 1)
        path, _ = self.api(resource="trace", source=str(IDS[0]), target=str(IDS[3]), max_hops=4, min_synapses=2)
        self.assertFalse(path["found"])
        path, _ = self.api(resource="trace", source=str(IDS[1]), target=str(IDS[3]), max_hops=4)
        self.assertTrue(path["found"])
        self.assertEqual(path["hops"], 2)
        path, _ = self.api(resource="trace", source=str(IDS[3]), target=str(IDS[0]), max_hops=4)
        self.assertFalse(path["found"])
        self.assertFalse(path["incomplete"])

    def test_real_filters_analytics_and_binary(self):
        data, _ = self.api(resource="neurons", region="MB_R")
        self.assertEqual(data["total"], 2)
        data, _ = self.api(resource="neurons", **{"class": "sensory", "side": "left"})
        self.assertEqual(data["total"], 1)
        result, _ = self.api(resource="analytics")
        self.assertEqual(result["measured"]["directed_pairs"], 4)
        self.assertEqual(result["calculated"]["class_aggregated_pairs"], 4)
        self.assertEqual(sum(x["count"] for x in result["weight_distribution"]), 4)
        body, code, _ = dispatch("resource=overview")
        self.assertEqual(code, 200)
        self.assertEqual(body[:4], b"NML1")
        self.assertEqual(struct.unpack_from("<I", body, 4)[0], 4)
        self.assertEqual(struct.unpack_from("<Q", body, 8)[0], IDS[0])
        mask, code, _ = dispatch("resource=region-mask&region=MB_R")
        self.assertEqual(code, 200)
        self.assertEqual(list(mask), [0, 0, 1, 1])

    def test_previous_active_survives_failed_reimport(self):
        with tempfile.TemporaryDirectory() as tmp:
            db = Path(tmp) / "atlas.sqlite"
            with db.open("wb") as out, self.db.open("rb") as source:
                out.write(source.read())
            nodes, edges, annotations, region = write_sources(tmp, duplicate=True)
            with self.assertRaises(ValueError):
                main(["import", "--mode", "shiu", "--db", str(db), "--neurons", str(nodes),
                      "--edges", str(edges), "--annotations", str(annotations), "--regions", str(region),
                      "--allow-unverified", "--reset"])
            os.environ["NEUROML_DB_PATH"] = str(db)
            result, code = self.api(resource="integrity")
            self.assertEqual(code, 200)
            self.assertTrue(result["data"]["validated"])
            self.assertEqual(result["status"]["stage"], "partially_available")
            os.environ["NEUROML_DB_PATH"] = str(self.db)

    def test_same_count_same_sum_but_changed_edge_identity_is_detected(self):
        import sqlite3
        from connectome.ingest import verify
        with tempfile.TemporaryDirectory() as tmp:
            db = Path(tmp) / "corrupt.sqlite"
            with db.open("wb") as out, self.db.open("rb") as source:
                out.write(source.read())
            with sqlite3.connect(db) as con:
                con.execute("UPDATE edges SET syn_count=3 WHERE pre=? AND post=?", (IDS[1], IDS[2]))
                con.execute("UPDATE edges SET syn_count=5 WHERE pre=? AND post=?", (IDS[2], IDS[3]))
            with self.assertRaisesRegex(ValueError, "record fingerprint mismatch"):
                verify(db)

    def test_changed_neuropil_identity_is_detected_after_import(self):
        import sqlite3
        from connectome.ingest import verify
        with tempfile.TemporaryDirectory() as tmp:
            db = Path(tmp) / "corrupt-region.sqlite"
            with db.open("wb") as out, self.db.open("rb") as source:
                out.write(source.read())
            with sqlite3.connect(db) as con:
                con.execute("UPDATE region_edges SET region='AL_R' WHERE pre=? AND post=? AND region='MB_R'",
                            (IDS[2], IDS[3]))
            with self.assertRaisesRegex(ValueError, "neuropil record fingerprint mismatch"):
                verify(db)

    def test_official_feather_mode_does_not_claim_canonical_without_checksum(self):
        with tempfile.TemporaryDirectory() as tmp:
            nodes, edges, annotations, _ = write_sources(tmp, official=True)
            db = Path(tmp) / "official.sqlite"
            main(["import", "--mode", "zenodo", "--db", str(db), "--neurons", str(nodes),
                  "--edges", str(edges), "--annotations", str(annotations), "--allow-unverified"])
            os.environ["NEUROML_DB_PATH"] = str(db)
            result, code = self.api(resource="integrity")
            self.assertEqual(code, 200)
            self.assertTrue(result["data"]["validated"])
            self.assertFalse(result["data"]["canonical_zenodo_verified"])
            self.assertEqual(result["data"]["source_connection_rows"], 4)
            self.assertEqual(result["data"]["imported_region_rows"], 4)
            os.environ["NEUROML_DB_PATH"] = str(self.db)


if __name__ == "__main__":
    unittest.main()

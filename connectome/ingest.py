"""Resumable, source-reconciled FlyWire FAFB v783 importer.

Usage: python -m connectome.ingest fetch-mirrors
       python -m connectome.ingest import --mode shiu --cache data/raw/github
       python -m connectome.ingest import --mode zenodo --neurons <.npy> --edges <.feather> ...

Large source files and the SQLite database are deliberately NOT checked into Git.
An existing validated database remains readable while its replacement is staged.
No threshold is imposed on synapse counts, including 1-contact pairs.
"""
from __future__ import annotations

import argparse
import csv
import gzip
import hashlib
import json
import math
import os
from pathlib import Path
import re
import sqlite3
import struct
import subprocess
import sys
import time
from datetime import datetime, timezone

from .sources import DATASET, EXPECTED_SHIU, MIRRORS, OFFICIAL_MD5

DEFAULT_DB = Path(__file__).resolve().parent.parent / "data" / "connectome.sqlite"
BATCH = 50000
FINGERPRINT_MOD = 1 << 128


def record_fingerprint(row):
    """Order-independent 128-bit digest per source row (IDs, direction, weight, region).

    SHA-256 pins the source file; the commutative sum of BLAKE2b row digests
    independently reconciles every source record with the indexed database,
    regardless of the physical row order. Count/sum/unique constraints also apply.
    """
    if len(row) == 3:
        pre, post, weight = row
        packed = struct.pack("<QQQ", pre, post, weight)
    else:
        pre, post, region, weight = row
        code = region.encode("utf-8")
        packed = struct.pack("<QQQI", pre, post, weight, len(code)) + code
    return int.from_bytes(hashlib.blake2b(packed, digest_size=16, person=b"NeuroML v783").digest(), "little")


def fingerprint_table(db, table, update=None, total=None):
    columns = "pre,post,syn_count" if table == "edges" else "pre,post,region,syn_count"
    result = 0
    rows_seen = 0
    for row in db.execute(f"SELECT {columns} FROM {table}"):
        result += record_fingerprint(tuple(row))
        rows_seen += 1
        if update and rows_seen % (BATCH * 10) == 0:
            update(rows_seen, total)
    if update:
        update(rows_seen, total)
    return f"{result % FINGERPRINT_MOD:032x}"


def utcnow():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def digest(path, algorithm="sha256"):
    h = hashlib.new(algorithm)
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(4 * 1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def atomic_json(path, value):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_suffix(path.suffix + ".tmp")
    temp.write_text(json.dumps(value, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    os.replace(temp, path)


def connect(path):
    db = sqlite3.connect(path, timeout=60)
    db.row_factory = sqlite3.Row
    db.execute("PRAGMA journal_mode=DELETE")  # staging is not served to readers
    db.execute("PRAGMA synchronous=NORMAL")
    db.execute("PRAGMA cache_size=-65536")
    db.execute("PRAGMA temp_store=FILE")
    return db


def put(db, key, value):
    db.execute("INSERT OR REPLACE INTO meta(key,value) VALUES (?,?)", (key, json.dumps(value)))


def get(db, key, default=None):
    row = db.execute("SELECT value FROM meta WHERE key=?", (key,)).fetchone()
    return json.loads(row[0]) if row else default


def schema(db):
    db.executescript("""
    CREATE TABLE IF NOT EXISTS meta(key TEXT PRIMARY KEY, value TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS neurons(
      idx INTEGER PRIMARY KEY, root_id INTEGER NOT NULL UNIQUE,
      group_name TEXT, flow TEXT, super_class TEXT, cell_class TEXT,
      sub_class TEXT, cell_type TEXT, hemibrain_type TEXT, synonyms TEXT,
      side TEXT, nt_type TEXT, nt_conf REAL, fbbt_id TEXT, vfb_id TEXT,
      x_nm REAL, y_nm REAL, z_nm REAL, soma_x_nm REAL, soma_y_nm REAL,
      soma_z_nm REAL, position_source TEXT, annotation_source TEXT
    );
    CREATE TABLE IF NOT EXISTS edges(
      pre INTEGER NOT NULL, post INTEGER NOT NULL, syn_count INTEGER NOT NULL CHECK(syn_count>0),
      PRIMARY KEY(pre,post)
    ) WITHOUT ROWID;
    CREATE TABLE IF NOT EXISTS region_edges(
      pre INTEGER NOT NULL, post INTEGER NOT NULL, region TEXT NOT NULL,
      syn_count INTEGER NOT NULL CHECK(syn_count>0),
      PRIMARY KEY(pre,post,region)
    ) WITHOUT ROWID;
    CREATE TABLE IF NOT EXISTS degrees(
      root_id INTEGER PRIMARY KEY, in_degree INTEGER NOT NULL DEFAULT 0,
      out_degree INTEGER NOT NULL DEFAULT 0, in_synapses INTEGER NOT NULL DEFAULT 0,
      out_synapses INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS neuron_regions(
      root_id INTEGER NOT NULL, region TEXT NOT NULL,
      pre_syn INTEGER NOT NULL DEFAULT 0, post_syn INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY(root_id,region)
    ) WITHOUT ROWID;
    """)
    db.commit()


def open_csv(path, **kw):
    opener = gzip.open if str(path).endswith(".gz") else open
    return opener(path, "rt", encoding="utf-8-sig", newline="", **kw)


def optional_int(value):
    try:
        return int(value) if value not in (None, "", "NA", "nan") else None
    except (TypeError, ValueError):
        return None


def optional_float(value):
    try:
        v = float(value)
        return v if math.isfinite(v) else None
    except (TypeError, ValueError):
        return None


def text(value):
    return value.strip() if isinstance(value, str) and value.strip() else None


def anchor(row, prefix, voxel=True):
    values = [optional_float(row.get(prefix + suffix)) for suffix in ("_x", "_y", "_z")]
    if any(v is None for v in values):
        return None
    # Schlegel/FlyWire annotation coordinates are 4 x 4 x 40 nm voxels.
    return tuple(v * scale for v, scale in zip(values, (4, 4, 40) if voxel else (1, 1, 1)))


def read_optional_table(path, sep=","):
    if not path:
        return {}
    result = {}
    with open_csv(path) as f:
        for row in csv.DictReader(f, delimiter=sep):
            id_ = optional_int(row.get("root_id"))
            if id_ is None or id_ in result:
                raise ValueError(f"Duplicate or invalid root_id in {path}: {row.get('root_id')}")
            result[id_] = row
    return result


def coordinates(path):
    if not path:
        return {}
    result = {}
    with open_csv(path) as f:
        for row in csv.DictReader(f):
            id_ = optional_int(row.get("root_id"))
            if id_ is None or id_ in result:
                continue  # Codex supplies multiple representative points per cell; first is stable.
            xyz = re.findall(r"-?\d+(?:\.\d+)?", row.get("position", ""))
            if len(xyz) == 3:
                result[id_] = tuple(float(v) for v in xyz)  # Codex coordinates are nm.
    return result


def source_files(args):
    paths = {k: Path(getattr(args, k)).resolve() for k in
             ("neurons", "edges", "annotations", "classification", "coordinates", "regions")
             if getattr(args, k, None)}
    if not all(k in paths for k in ("neurons", "edges")):
        raise ValueError("Neuron ID file and edge file are both required")
    records = []
    for role, path in paths.items():
        if not path.is_file():
            raise FileNotFoundError(path)
        sha = digest(path)
        expected = None
        if args.mode == "shiu":
            for mirror in MIRRORS.values():
                if role in mirror["files"]:
                    expected = mirror["files"][role][1]
                    break
        else:
            if role in OFFICIAL_MD5:
                expected = OFFICIAL_MD5[role]
                actual_md5 = digest(path, "md5")
                if actual_md5 != expected and not args.allow_unverified:
                    raise ValueError(f"Official {role} MD5 mismatch: {actual_md5} != {expected}")
        verified = (sha == expected) if args.mode == "shiu" and expected else (
            digest(path, "md5") == expected if args.mode == "zenodo" and role in OFFICIAL_MD5 else
            sha == next((m["files"][role][1] for m in MIRRORS.values() if role in m["files"]), ""))
        if args.mode == "shiu" and expected and not verified and not args.allow_unverified:
            raise ValueError(f"Pinned {role} SHA-256 mismatch: {sha} != {expected}")
        records.append({"role": role, "filename": path.name, "size_bytes": path.stat().st_size,
                        "sha256": sha, "expected_digest": expected, "checksum_verified": verified})
    return paths, records


def import_neurons(db, paths, mode, state, update):
    if state["phase"] != "neurons":
        return state
    annotations = read_optional_table(paths.get("annotations"), "\t")
    classes = read_optional_table(paths.get("classification"))
    positions = coordinates(paths.get("coordinates"))
    if mode == "zenodo":
        import numpy as np
        ids = np.load(paths["neurons"], allow_pickle=False).tolist()
        if not isinstance(ids, list):
            raise ValueError("Official root-ID file must be a one-dimensional NumPy array")
        node_rows = ((int(i), {}) for i in ids)
        source_total = len(ids)
    else:
        f = open_csv(paths["neurons"])
        reader = csv.DictReader(f)
        if "root_id" not in (reader.fieldnames or ()):
            raise ValueError("Codex neuron file requires root_id column")
        node_rows = ((int(r["root_id"]), r) for r in reader)
        source_total = EXPECTED_SHIU["neurons"] if not state.get("allow_unverified") else None
    state.update(stage="importing", operation="neurons", completed=0, total=source_total)
    update(state)
    seen = set()
    inserts = []
    duplicates = 0
    for id_, row in node_rows:
        if id_ in seen:
            duplicates += 1
            continue
        seen.add(id_)
        a = annotations.get(id_, {})
        c = classes.get(id_, {})
        coord = anchor(a, "pos")
        pos_source = "Schlegel et al. annotation anchor (4×4×40 nm voxels)" if coord else None
        if coord is None:
            coord = positions.get(id_)
            pos_source = "Codex representative position (nm; first provided point)" if coord else None
        soma = anchor(a, "soma")
        # These are annotations, never inferred from adjacency, coordinate or morphology.
        inserts.append((len(seen) - 1, id_, text(row.get("group")), text(a.get("flow")) or text(c.get("flow")),
                        text(a.get("super_class")) or text(c.get("super_class")),
                        text(a.get("cell_class")) or text(c.get("class")),
                        text(a.get("cell_sub_class")) or text(c.get("sub_class")),
                        text(a.get("cell_type")), text(a.get("hemibrain_type")), text(a.get("synonyms")),
                        text(a.get("side")) or text(c.get("side")),
                        text(a.get("top_nt")) or text(row.get("nt_type")),
                        optional_float(a.get("top_nt_conf")) or optional_float(row.get("nt_type_score")),
                        text(a.get("fbbt_id")), text(a.get("vfb_id")),
                        *(coord or (None, None, None)), *(soma or (None, None, None)), pos_source,
                        "Schlegel et al. supplemental file 1" if a else "Codex classification / neuron record"))
        if len(inserts) >= BATCH:
            db.executemany("INSERT INTO neurons VALUES (" + ",".join("?" for _ in range(23)) + ")", inserts)
            inserts.clear()
            state["completed"] = len(seen) + duplicates
            update(state)
    if inserts:
        db.executemany("INSERT INTO neurons VALUES (" + ",".join("?" for _ in range(23)) + ")", inserts)
    if mode == "shiu":
        f.close()
    state.update(phase="edges", completed=len(seen) + duplicates, total=source_total,
                 source_neurons=len(seen) + duplicates, imported_neurons=len(seen),
                 duplicate_neurons=duplicates,
                 annotation_rows=len(annotations), annotation_outside_nodes=len(set(annotations) - seen),
                 neurons_without_annotation=len(seen - set(annotations)),
                 neurons_without_position=sum(1 for r in db.execute("SELECT x_nm FROM neurons") if r[0] is None),
                 source_classification_rows=len(classes))
    update(state)
    return state


def edge_batches(path, mode):
    if mode == "shiu":
        import pyarrow.parquet as pq
        p = pq.ParquetFile(path)
        required = {"Presynaptic_ID", "Postsynaptic_ID", "Connectivity"}
        if not required.issubset(p.schema_arrow.names):
            raise ValueError(f"Shiu parquet missing columns: {required - set(p.schema_arrow.names)}")
        for batch in p.iter_batches(batch_size=BATCH, columns=list(sorted(required))):
            cols = batch.to_pydict()
            yield batch.num_rows, zip(cols["Presynaptic_ID"], cols["Postsynaptic_ID"], cols["Connectivity"])
    else:
        import pyarrow as pa
        with pa.memory_map(str(path), "r") as f:
            reader = pa.ipc.open_file(f)
            required = {"pre_pt_root_id", "post_pt_root_id", "neuropil", "syn_count"}
            if not required.issubset(reader.schema.names):
                raise ValueError(f"Official feather missing columns: {required - set(reader.schema.names)}")
            for i in range(reader.num_record_batches):
                batch = reader.get_batch(i).select(list(sorted(required)))
                for start in range(0, batch.num_rows, BATCH):
                    part = batch.slice(start, BATCH)
                    cols = part.to_pydict()
                    yield part.num_rows, zip(cols["pre_pt_root_id"], cols["post_pt_root_id"],
                                             cols["neuropil"], cols["syn_count"])


def import_edges(db, paths, mode, state, update):
    if state["phase"] != "edges":
        return state
    if mode == "shiu":
        import pyarrow.parquet as pq
        total = pq.ParquetFile(paths["edges"]).metadata.num_rows
    else:
        total = None  # counted from actual Feather batches; no invented percentage
    offset = state.get("edge_offset", 0)
    state.update(stage="importing", operation="directed connections", completed=offset, total=total)
    update(state)
    skipped = 0
    for batch_size, rows in edge_batches(paths["edges"], mode):
        if skipped + batch_size <= offset:
            skipped += batch_size
            continue
        start = max(0, offset - skipped)
        skipped += batch_size
        if start:
            from itertools import islice
            rows = islice(rows, start, None)
        valid = []
        invalid = 0
        fingerprint = 0
        for row in rows:
            try:
                if mode == "shiu":
                    pre, post, count = row
                    item = (int(pre), int(post), int(count))
                else:
                    pre, post, region, count = row
                    if not region or not str(region).strip():
                        raise ValueError("empty neuropil")
                    item = (int(pre), int(post), str(region).strip(), int(count))
                if item[-1] <= 0:
                    raise ValueError("nonpositive synapse count")
                valid.append(item)
                fingerprint += record_fingerprint(item)
            except (TypeError, ValueError):
                invalid += 1
        before = db.total_changes
        if mode == "shiu":
            db.executemany("INSERT OR IGNORE INTO edges(pre,post,syn_count) VALUES (?,?,?)", valid)
        else:
            db.executemany("INSERT OR IGNORE INTO region_edges(pre,post,region,syn_count) VALUES (?,?,?,?)", valid)
        inserted = db.total_changes - before
        state["edge_offset"] = skipped
        state["edge_fingerprint"] = f"{(int(state.get('edge_fingerprint', '0'), 16) + fingerprint) % FINGERPRINT_MOD:032x}"
        state["edge_imported"] = state.get("edge_imported", 0) + inserted
        state["duplicate_edges"] = state.get("duplicate_edges", 0) + len(valid) - inserted
        state["invalid_edges"] = state.get("invalid_edges", 0) + invalid
        state.update(completed=skipped, total=total)
        update(state)
    state["source_connection_rows"] = skipped
    if mode == "zenodo":
        # Keep all 1-contact regional rows. Only aggregate after importing all rows.
        db.execute("INSERT INTO edges(pre,post,syn_count) SELECT pre,post,SUM(syn_count) "
                   "FROM region_edges GROUP BY pre,post")
        update(state)
    state.update(phase="regions" if mode == "shiu" and paths.get("regions") else "indexing",
                 completed=skipped, total=total)
    update(state)
    return state


def import_regions(db, paths, state, update):
    if state["phase"] != "regions":
        return state
    offset = state.get("region_offset", 0)
    state.update(stage="importing", operation="partial Codex neuropil attribution", completed=offset, total=None)
    update(state)
    with open_csv(paths["regions"]) as f:
        reader = csv.DictReader(f)
        required = {"pre_root_id", "post_root_id", "neuropil", "syn_count"}
        if not required.issubset(reader.fieldnames or ()):
            raise ValueError("Codex regional table missing required columns")
        from itertools import islice
        for _ in islice(reader, offset):
            pass
        chunk = []
        invalid = 0
        fingerprint = 0
        for row in reader:
            try:
                item = (int(row["pre_root_id"]), int(row["post_root_id"]), row["neuropil"],
                        int(row["syn_count"]))
                if not item[2] or item[3] <= 0:
                    raise ValueError("invalid region/count")
                chunk.append(item)
                fingerprint += record_fingerprint(item)
            except (ValueError, TypeError):
                invalid += 1
            if len(chunk) + invalid >= BATCH:
                before = db.total_changes
                db.executemany("INSERT OR IGNORE INTO region_edges VALUES (?,?,?,?)", chunk)
                inserted = db.total_changes - before
                state["region_offset"] = state.get("region_offset", 0) + len(chunk) + invalid
                state["region_imported"] = state.get("region_imported", 0) + inserted
                state["region_fingerprint"] = f"{(int(state.get('region_fingerprint', '0'), 16) + fingerprint) % FINGERPRINT_MOD:032x}"
                state["duplicate_regions"] = state.get("duplicate_regions", 0) + len(chunk) - inserted
                state["invalid_regions"] = state.get("invalid_regions", 0) + invalid
                chunk.clear(); invalid = 0; fingerprint = 0
                state["completed"] = state["region_offset"]
                update(state)
        if chunk or invalid:
            before = db.total_changes
            db.executemany("INSERT OR IGNORE INTO region_edges VALUES (?,?,?,?)", chunk)
            inserted = db.total_changes - before
            state["region_offset"] = state.get("region_offset", 0) + len(chunk) + invalid
            state["region_imported"] = state.get("region_imported", 0) + inserted
            state["region_fingerprint"] = f"{(int(state.get('region_fingerprint', '0'), 16) + fingerprint) % FINGERPRINT_MOD:032x}"
            state["duplicate_regions"] = state.get("duplicate_regions", 0) + len(chunk) - inserted
            state["invalid_regions"] = state.get("invalid_regions", 0) + invalid
    state.update(phase="indexing", stage="indexing", operation="building query indexes",
                 source_region_rows=state.get("region_offset", 0), completed=None, total=None)
    update(state)
    return state


def index_database(db, state, update):
    if state["phase"] != "indexing":
        return state
    state.update(stage="indexing", operation="building source and target indexes", completed=None, total=None)
    update(state)
    db.executescript("""
    CREATE INDEX IF NOT EXISTS edges_pre_weight ON edges(pre,syn_count DESC);
    CREATE INDEX IF NOT EXISTS edges_post_weight ON edges(post,syn_count DESC);
    CREATE INDEX IF NOT EXISTS region_by_region_pre ON region_edges(region,pre);
    CREATE INDEX IF NOT EXISTS region_by_region_post ON region_edges(region,post);
    CREATE INDEX IF NOT EXISTS neurons_by_type ON neurons(cell_type);
    CREATE INDEX IF NOT EXISTS neurons_by_class ON neurons(super_class);
    CREATE INDEX IF NOT EXISTS neurons_by_group ON neurons(group_name);
    CREATE INDEX IF NOT EXISTS neurons_by_side ON neurons(side);
    CREATE INDEX IF NOT EXISTS neuron_regions_by_region ON neuron_regions(region,root_id);
    CREATE INDEX IF NOT EXISTS degree_in ON degrees(in_degree);
    CREATE INDEX IF NOT EXISTS degree_out ON degrees(out_degree);
    """)
    state["operation"] = "calculating actual in/out degree and synapse totals"
    update(state)
    db.execute("INSERT OR IGNORE INTO degrees(root_id) SELECT root_id FROM neurons")
    db.execute("CREATE TEMP TABLE out_totals AS SELECT pre AS root_id, COUNT(*) AS degree, "
               "SUM(syn_count) AS syn FROM edges GROUP BY pre")
    db.execute("UPDATE degrees SET out_degree=t.degree, out_synapses=t.syn FROM out_totals t "
               "WHERE degrees.root_id=t.root_id")
    db.execute("DROP TABLE out_totals")
    db.execute("CREATE TEMP TABLE in_totals AS SELECT post AS root_id, COUNT(*) AS degree, "
               "SUM(syn_count) AS syn FROM edges GROUP BY post")
    db.execute("UPDATE degrees SET in_degree=t.degree, in_synapses=t.syn FROM in_totals t "
               "WHERE degrees.root_id=t.root_id")
    db.execute("DROP TABLE in_totals")
    db.commit()
    state["operation"] = "indexing per-neuropil populations"
    update(state)
    db.execute("INSERT OR IGNORE INTO neuron_regions(root_id,region,pre_syn) "
               "SELECT pre,region,SUM(syn_count) FROM region_edges GROUP BY pre,region")
    db.execute("INSERT INTO neuron_regions(root_id,region,post_syn) "
               "SELECT post,region,SUM(syn_count) FROM region_edges WHERE true GROUP BY post,region "
               "ON CONFLICT(root_id,region) DO UPDATE SET post_syn=excluded.post_syn")
    db.commit()
    state["operation"] = "building annotation search index"
    update(state)
    db.execute("CREATE VIRTUAL TABLE IF NOT EXISTS neurons_fts USING fts5("
               "root_id UNINDEXED, cell_type, hemibrain_type, synonyms, group_name, flow, "
               "super_class, cell_class, sub_class, side, nt_type, fbbt_id, vfb_id)")
    if db.execute("SELECT COUNT(*) FROM neurons_fts").fetchone()[0] == 0:
        db.execute("INSERT INTO neurons_fts(rowid,root_id,cell_type,hemibrain_type,synonyms,group_name,"
                   "flow,super_class,cell_class,sub_class,side,nt_type,fbbt_id,vfb_id) "
                   "SELECT idx+1, CAST(root_id AS TEXT),cell_type,hemibrain_type,synonyms,group_name,"
                   "flow,super_class,cell_class,sub_class,side,nt_type,fbbt_id,vfb_id FROM neurons")
    db.commit()
    state.update(phase="validating", stage="validating", operation="reconciling source and import counts")
    update(state)
    return state


def count(db, sql, args=()):
    return db.execute(sql, args).fetchone()[0]


def histogram(db, table, field, breaks):
    sql = "SELECT " + ",".join(f"SUM(CASE WHEN {field} {predicate} THEN 1 ELSE 0 END)" for _, predicate in breaks)
    values = db.execute(sql + " FROM " + table).fetchone()
    return [{"label": label, "count": v or 0} for (label, _), v in zip(breaks, values)]


def calculate(db, state, mode, files, update=None):
    n = count(db, "SELECT COUNT(*) FROM neurons")
    edge_n, synapses, low, self_edges = db.execute(
        "SELECT COUNT(*),COALESCE(SUM(syn_count),0),"
        "SUM(CASE WHEN syn_count<5 THEN 1 ELSE 0 END),"
        "SUM(CASE WHEN pre=post THEN 1 ELSE 0 END) FROM edges").fetchone()
    region_n, region_syn = db.execute("SELECT COUNT(*),COALESCE(SUM(syn_count),0) FROM region_edges").fetchone()
    dangling_pre = count(db, "SELECT COUNT(*) FROM edges e LEFT JOIN neurons n ON n.root_id=e.pre WHERE n.root_id IS NULL")
    dangling_post = count(db, "SELECT COUNT(*) FROM edges e LEFT JOIN neurons n ON n.root_id=e.post WHERE n.root_id IS NULL")
    source_rows = state.get("source_connection_rows", 0)
    imported_source = edge_n if mode == "shiu" else region_n
    regional_mismatches = 0
    region_pairs = 0
    if region_n and mode == "shiu":
        region_pairs, regional_mismatches = db.execute(
            "SELECT COUNT(*), SUM(CASE WHEN e.syn_count IS NULL OR e.syn_count!=r.weight "
            "THEN 1 ELSE 0 END) FROM (SELECT pre,post,SUM(syn_count) weight FROM region_edges "
            "GROUP BY pre,post) r LEFT JOIN edges e ON e.pre=r.pre AND e.post=r.post").fetchone()
    elif region_n:
        region_pairs = edge_n  # derived from the same complete regional table
    missing_rows = max(0, source_rows - imported_source)
    if update:
        state.update(operation="reconciling record-level source fingerprints", completed=0,
                     total=imported_source + (region_n if mode == "shiu" else 0))
        update(state)
    fingerprint_progress = 0
    def report(done, total):
        if update:
            state["completed"] = fingerprint_progress + done
            update(state)
    imported_fingerprint = fingerprint_table(
        db, "edges" if mode == "shiu" else "region_edges", report if update else None,
        imported_source)
    fingerprint_progress += imported_source
    region_fingerprint = None
    if mode == "shiu" and region_n:
        region_fingerprint = fingerprint_table(db, "region_edges", report if update else None, region_n)
    source_fingerprint = state.get("edge_fingerprint")
    fingerprint_match = bool(source_fingerprint and source_fingerprint == imported_fingerprint)
    regional_fingerprint_match = (mode == "zenodo" or not region_n or
                                  bool(state.get("region_fingerprint") and
                                       state["region_fingerprint"] == region_fingerprint))
    sources_verified = all(r["checksum_verified"] for r in files if r["role"] in ("neurons", "edges"))
    expected_ok = True
    if mode == "shiu" and sources_verified:
        expected_ok = (n == EXPECTED_SHIU["neurons"] and edge_n == EXPECTED_SHIU["pairs"]
                       and synapses == EXPECTED_SHIU["synapses"]
                       and low == EXPECTED_SHIU["pairs_below_five"])
        if state.get("source_region_rows"):
            expected_ok = expected_ok and region_n == EXPECTED_SHIU["region_rows"] and region_pairs == EXPECTED_SHIU["region_pairs"] and region_syn == EXPECTED_SHIU["region_synapses"]
    valid = (n == state.get("source_neurons") == state.get("imported_neurons")
             and state.get("duplicate_neurons", 0) == 0 and state.get("duplicate_edges", 0) == 0
             and state.get("invalid_edges", 0) == 0 and state.get("duplicate_regions", 0) == 0
             and state.get("invalid_regions", 0) == 0 and missing_rows == 0
             and dangling_pre == 0 and dangling_post == 0 and regional_mismatches == 0
             and state.get("source_region_rows", region_n) == region_n and expected_ok
             and fingerprint_match and regional_fingerprint_match)
    integrity = {
        "validated": bool(valid), "source_files_checksum_verified": sources_verified,
        "canonical_zenodo_verified": bool(mode == "zenodo" and sources_verified),
        "scope": "Zenodo proofread pair-by-neuropil source" if mode == "zenodo" else
                 "Shiu v783 unthresholded directed-pair source; canonical Zenodo comparison not performed",
        "source_neurons": state.get("source_neurons"), "imported_neurons": n,
        "unique_neuron_ids": count(db, "SELECT COUNT(DISTINCT root_id) FROM neurons"),
        "source_connection_rows": source_rows, "imported_connection_rows": imported_source,
        "directed_pairs": edge_n, "synaptic_contacts": synapses,
        "pairs_below_five_synapses": low or 0, "self_pairs": self_edges or 0,
        "duplicate_neuron_records": state.get("duplicate_neurons", 0),
        "duplicate_connection_records": state.get("duplicate_edges", 0),
        "invalid_connection_records": state.get("invalid_edges", 0),
        "missing_neuron_references": (dangling_pre or 0) + (dangling_post or 0),
        "missing_connection_rows": missing_rows if fingerprint_match else None,
        "record_fingerprint_match": fingerprint_match,
        "source_record_fingerprint": source_fingerprint,
        "imported_record_fingerprint": imported_fingerprint,
        "regional_record_fingerprint_match": regional_fingerprint_match,
        "source_region_rows": state.get("source_region_rows", region_n),
        "imported_region_rows": region_n, "region_attributed_pairs": region_pairs,
        "unattributed_pairs": edge_n - region_pairs,
        "region_attributed_contacts": region_syn,
        "regional_pair_weight_mismatches": regional_mismatches or 0,
        "duplicate_regional_records": state.get("duplicate_regions", 0),
        "annotation_rows": state.get("annotation_rows", 0),
        "annotation_rows_outside_neuron_list": state.get("annotation_outside_nodes", 0),
        "neurons_without_cell_annotation": state.get("neurons_without_annotation", n),
        "neurons_without_representative_position": state.get("neurons_without_position", n),
        "file_import_fraction": imported_source / source_rows if source_rows else None,
        "files": files, "checked_at": utcnow(),
    }
    return integrity


def build_analytics(db, integrity, mode):
    n = integrity["imported_neurons"]
    e = integrity["directed_pairs"]
    density_edges = e - integrity["self_pairs"]
    degree_bins = [("0", "=0"), ("1–4", "BETWEEN 1 AND 4"), ("5–19", "BETWEEN 5 AND 19"),
                   ("20–99", "BETWEEN 20 AND 99"), ("100–499", "BETWEEN 100 AND 499"),
                   ("500–999", "BETWEEN 500 AND 999"), ("1,000+", ">=1000")]
    weight_bins = [("1", "=1"), ("2–4", "BETWEEN 2 AND 4"), ("5–9", "BETWEEN 5 AND 9"),
                   ("10–49", "BETWEEN 10 AND 49"), ("50–99", "BETWEEN 50 AND 99"),
                   ("100–499", "BETWEEN 100 AND 499"), ("500+", ">=500")]
    classes = [dict(name=r[0] or "Unannotated", neurons=r[1]) for r in db.execute(
        "SELECT super_class,COUNT(*) FROM neurons GROUP BY super_class ORDER BY COUNT(*) DESC")]
    regions = [dict(name=r[0], neurons=r[1], presynaptic_contacts=r[2], postsynaptic_contacts=r[3])
               for r in db.execute("SELECT region,COUNT(*),SUM(pre_syn),SUM(post_syn) "
                                   "FROM neuron_regions GROUP BY region ORDER BY COUNT(*) DESC")]
    top = [dict(id=str(r[0]), cell_type=r[1], super_class=r[2], in_degree=r[3],
                out_degree=r[4], in_synapses=r[5], out_synapses=r[6])
           for r in db.execute("SELECT n.root_id,n.cell_type,n.super_class,d.in_degree,d.out_degree,"
                               "d.in_synapses,d.out_synapses FROM degrees d JOIN neurons n "
                               "USING(root_id) ORDER BY d.out_degree DESC LIMIT 20")]
    # Aggregation across ALL pairs, including weights 1–4. Never an edge sample.
    links = [dict(source=r[0] or "Unannotated", target=r[1] or "Unannotated", pairs=r[2], contacts=r[3])
             for r in db.execute("SELECT a.super_class,b.super_class,COUNT(*),SUM(e.syn_count) "
                                 "FROM edges e JOIN neurons a ON a.root_id=e.pre "
                                 "JOIN neurons b ON b.root_id=e.post "
                                 "GROUP BY a.super_class,b.super_class")]
    centres = [dict(name=r[0] or "Unannotated", x=r[1], y=r[2], z=r[3], neurons=r[4])
               for r in db.execute("SELECT super_class,AVG(x_nm),AVG(y_nm),AVG(z_nm),COUNT(*) "
                                   "FROM neurons GROUP BY super_class")]
    if sum(r["pairs"] for r in links) != e or sum(r["contacts"] for r in links) != integrity["synaptic_contacts"]:
        raise ValueError("Whole-graph class aggregation did not reconcile with raw edge table")
    analytics = {
        "measured": {"neurons": n, "directed_pairs": e, "synaptic_contacts": integrity["synaptic_contacts"]},
        "calculated": {"mean_in_degree": e / n if n else None,
                       "mean_out_degree": e / n if n else None,
                       "density": density_edges / (n * (n - 1)) if n > 1 else None,
                       "density_definition": "Directed non-self pairs / [N × (N − 1)]; one pair regardless of weight.",
                       "class_aggregated_pairs": sum(r["pairs"] for r in links)},
        "unavailable": {"centrality": "Not computed; degree is shown separately, not called centrality.",
                        "components": "Not computed in this import.",
                        "path_length_distribution": "Not computed; only requested bounded paths are traced."},
        "degree_in": histogram(db, "degrees", "in_degree", degree_bins),
        "degree_out": histogram(db, "degrees", "out_degree", degree_bins),
        "weight_distribution": histogram(db, "edges", "syn_count", weight_bins),
        "classes": classes, "regions": regions, "highly_connected": top,
        "class_links": links, "class_centres": centres,
        "regional_scope": "Complete proofread neuropil table" if mode == "zenodo" else
                         "Only Codex thresholded-pair subset has neuropil attribution; other connections remain in graph.",
    }
    return analytics


def write_overview(db, path, classes):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    palette = {r["name"]: i for i, r in enumerate(classes)}
    if len(palette) > 255:
        raise ValueError("Too many classes for overview binary format")
    missing = 0
    with open(path, "wb") as out:
        out.write(b"NML1")
        out.write(struct.pack("<I", count(db, "SELECT COUNT(*) FROM neurons")))
        for row in db.execute("SELECT root_id,x_nm,y_nm,z_nm,super_class FROM neurons ORDER BY idx"):
            if any(v is None for v in row[1:4]):
                missing += 1
                xyz = (math.nan,) * 3  # rendering handles unplaced neurons separately
            else:
                xyz = row[1:4]
            out.write(struct.pack("<QfffB3x", row[0], *xyz, palette[row[4] or "Unannotated"]))
    return missing


def fetch_mirrors(cache, db_path=DEFAULT_DB):
    cache = Path(cache)
    cache.mkdir(parents=True, exist_ok=True)
    status_file = Path(db_path).resolve().parent / "import_status.json"
    atomic_json(status_file, {"stage": "discovery", "operation": "checking pinned v783 sources",
                              "completed": 0, "total": len(MIRRORS), "updated_at": utcnow()})
    paths = {}
    try:
        for index, (name, mirror) in enumerate(MIRRORS.items()):
            target = cache / name
            atomic_json(status_file, {"stage": "downloading", "operation": f"fetching/verifying {name}",
                                      "completed": index, "total": len(MIRRORS), "updated_at": utcnow()})
            if not target.exists():
                subprocess.run(["git", "clone", "--quiet", "--depth", "1", mirror["url"], str(target)], check=True)
            commit = subprocess.check_output(["git", "-C", str(target), "rev-parse", "HEAD"], text=True).strip()
            if commit != mirror["commit"]:
                raise ValueError(f"{name} revision changed ({commit}); expected {mirror['commit']}. Do not silently update the source.")
            for role, (relative, sha) in mirror["files"].items():
                file = target / relative
                actual = digest(file)
                if actual != sha:
                    raise ValueError(f"{name}/{relative} checksum mismatch: {actual}")
                paths[role] = str(file)
                print(f"verified {role}: {file.name} ({file.stat().st_size:,} bytes)", flush=True)
            atomic_json(status_file, {"stage": "downloading", "operation": f"verified {name}",
                                      "completed": index + 1, "total": len(MIRRORS), "updated_at": utcnow()})
        atomic_json(cache / "source-paths.json", paths)
        atomic_json(status_file, {"stage": "partially_available", "operation": "source files verified; import not yet run",
                                  "completed": len(MIRRORS), "total": len(MIRRORS), "updated_at": utcnow()})
        return paths
    except Exception as exc:
        atomic_json(status_file, {"stage": "failed", "operation": "source download/checksum",
                                  "error": str(exc), "completed": len(paths), "updated_at": utcnow()})
        raise


def run_import(args):
    active = Path(args.db).resolve()
    active.parent.mkdir(parents=True, exist_ok=True)
    staging = Path(str(active) + ".staging")
    status_file = active.parent / "import_status.json"
    overview = active.parent / "overview.bin"
    if args.cache and not args.neurons:
        defaults = json.loads((Path(args.cache) / "source-paths.json").read_text())
        for key, value in defaults.items():
            if not getattr(args, key, None):
                setattr(args, key, value)
    if args.reset and staging.exists():
        staging.unlink()  # explicit reset of incomplete staging only; active remains untouched
    atomic_json(status_file, {"stage": "discovery", "operation": "checking provided source files", "updated_at": utcnow()})
    paths, files = source_files(args)
    signature = {r["role"]: r["sha256"] for r in files}
    if active.exists() and not staging.exists() and not args.reset:
        with sqlite3.connect(active) as db:
            row = db.execute("SELECT value FROM meta WHERE key='manifest'").fetchone()
            if row and json.loads(row[0]).get("signature") == signature:
                print("The active dataset already matches these source files; use --reset to reimport.")
                atomic_json(status_file, {"stage": "ready", "operation": "active source already imported", "updated_at": utcnow()})
                return
    db = connect(staging)
    try:
        schema(db)
        state = get(db, "progress")
        if state and state.get("signature") != signature:
            raise ValueError("Staging data belongs to different files. Supply the original files or pass --reset.")
        if not state:
            state = {"phase": "neurons", "stage": "importing", "operation": "neurons",
                     "signature": signature, "mode": args.mode, "started_at": utcnow(),
                     "allow_unverified": args.allow_unverified}
        def update(s):
            s["updated_at"] = utcnow()
            put(db, "progress", s)
            db.commit()
            atomic_json(status_file, {k: v for k, v in s.items() if k != "signature"})
            if s.get("completed") is None or s.get("completed") == s.get("total") or s.get("completed", 0) % (BATCH * 20) == 0:
                print(f"{s['stage']}: {s['operation']} {s.get('completed') or 0:,} / {s.get('total') or '?'}", flush=True)
        update(state)
        state = import_neurons(db, paths, args.mode, state, update)
        state = import_edges(db, paths, args.mode, state, update)
        if args.mode == "shiu" and paths.get("regions"):
            state = import_regions(db, paths, state, update)
        state = index_database(db, state, update)
        if state["phase"] != "validating":
            raise RuntimeError(f"Importer stopped unexpectedly at {state['phase']}")
        integrity = calculate(db, state, args.mode, files, update)
        put(db, "integrity", integrity)
        db.commit()
        if not integrity["validated"]:
            state.update(stage="partially_available", operation="integrity validation failed",
                         integrity=integrity)
            update(state)
            raise ValueError("Source-to-database reconciliation failed. See import_status.json; active database was not changed.")
        state.update(stage="validating", operation="computing whole-graph statistics", completed=None, total=None)
        update(state)
        analytics = build_analytics(db, integrity, args.mode)
        put(db, "analytics", analytics)
        manifest = {**DATASET, "mode": args.mode, "signature": signature,
                    "imported_at": utcnow(), "source_files": files,
                    "connectivity_resolution": "directed neuron-neuron pair plus neuropil" if args.mode == "zenodo" else
                    "directed neuron-neuron pair (neuropil only for separately matched thresholded Codex subset)",
                    "canonical_completeness": args.mode == "zenodo" and integrity["canonical_zenodo_verified"],
                    "source_file_completeness": True,
                    "source_note": "Checksum-verified official Zenodo v783 proofread table." if args.mode == "zenodo" else
                    "Checksum-verified Shiu v783 unthresholded pair table and Codex neuron mirror; not independently reconciled against Zenodo's complete neuropil table.",
                    "regional_note": analytics["regional_scope"],
                    "morphology_note": "No neuron skeletons in these source tables. An operator can provide version-matched SWC files separately."}
        put(db, "manifest", manifest)
        missing_positions = write_overview(db, Path(str(overview) + ".staging"), analytics["classes"])
        if missing_positions != integrity["neurons_without_representative_position"]:
            raise ValueError("Overview did not account for all neurons without coordinates")
        state.update(phase="ready", stage="ready", operation="validated and indexed", completed=None, total=None)
        update(state)
        db.execute("PRAGMA optimize")
        db.commit()
        db.close()
        if active.exists():
            os.replace(active, str(active) + ".previous")
        os.replace(staging, active)
        os.replace(str(overview) + ".staging", overview)
        atomic_json(status_file, {"stage": "ready", "operation": "validated and indexed",
                                  "updated_at": utcnow(), "source_file_complete": True,
                                  "canonical_zenodo_verified": integrity["canonical_zenodo_verified"]})
        print(json.dumps({"integrity": {k: v for k, v in integrity.items() if k != "files"},
                          "db_bytes": active.stat().st_size}, indent=2), flush=True)
    except Exception as exc:
        try:
            if db:
                db.rollback()
                db.close()
        except sqlite3.Error:
            pass
        previous = json.loads(status_file.read_text()) if status_file.exists() else {}
        if previous.get("stage") not in ("partially_available", "ready"):
            previous.update(stage="failed", error=str(exc), updated_at=utcnow())
            atomic_json(status_file, previous)
        raise


def verify(path):
    path = Path(path).resolve()
    if not path.is_file():
        raise FileNotFoundError(f"No validated connectome database at {path}")
    with sqlite3.connect(f"file:{path}?mode=ro", uri=True) as db:
        db.row_factory = sqlite3.Row
        integrity = get(db, "integrity")
        if not integrity:
            raise ValueError("No completed integrity manifest")
        actual = (count(db, "SELECT COUNT(*) FROM neurons"), count(db, "SELECT COUNT(*) FROM edges"),
                  count(db, "SELECT COALESCE(SUM(syn_count),0) FROM edges"),
                  count(db, "SELECT COUNT(*) FROM region_edges"),
                  count(db, "SELECT COUNT(*) FROM neurons_fts"))
        expected = (integrity["imported_neurons"], integrity["directed_pairs"],
                    integrity["synaptic_contacts"], integrity["imported_region_rows"],
                    integrity["imported_neurons"])
        if actual != expected:
            raise ValueError(f"DB changed since validation: {actual} != {expected}")
        manifest = get(db, "manifest")
        imported = fingerprint_table(db, "edges" if manifest["mode"] == "shiu" else "region_edges")
        if imported != integrity.get("source_record_fingerprint"):
            raise ValueError("Source-to-database connection record fingerprint mismatch")
        if manifest["mode"] == "shiu" and actual[3]:
            regional = fingerprint_table(db, "region_edges")
            if regional != get(db, "progress").get("region_fingerprint"):
                raise ValueError("Source-to-database neuropil record fingerprint mismatch")
        print(json.dumps({"verified": True, "counts": actual, "record_fingerprint": imported,
                          "canonical_zenodo_verified": integrity["canonical_zenodo_verified"]}, indent=2))


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)
    fetch = sub.add_parser("fetch-mirrors", help="Git-clone pinned, checksum-verified public mirrors")
    fetch.add_argument("--cache", default="data/raw/github")
    fetch.add_argument("--db", default=str(DEFAULT_DB), help="Location whose import_status.json tracks real fetch progress")
    imp = sub.add_parser("import", help="Stage, reconcile and activate a complete source-file import")
    imp.add_argument("--mode", choices=("shiu", "zenodo"), default="shiu")
    imp.add_argument("--cache", help="Path to fetch-mirrors cache (fills unspecified paths)")
    imp.add_argument("--db", default=str(DEFAULT_DB))
    for field in ("neurons", "edges", "annotations", "classification", "coordinates", "regions"):
        imp.add_argument("--" + field)
    imp.add_argument("--reset", action="store_true", help="Discard only incomplete staging; preserve active validated DB")
    imp.add_argument("--allow-unverified", action="store_true", help="Explicitly accept checksum-unknown files; never claim canonical verification")
    check = sub.add_parser("verify", help="Recalculate core counts from an active database")
    check.add_argument("--db", default=str(DEFAULT_DB))
    args = parser.parse_args(argv)
    if args.command == "fetch-mirrors":
        fetch_mirrors(args.cache, args.db)
    elif args.command == "verify":
        verify(args.db)
    else:
        run_import(args)


if __name__ == "__main__":
    main()

"""Reproducibly package a validated local import for read-only serverless queries.

Usage: python -m connectome.export_portable --db data/connectome.sqlite
Requires public/data/flywire-v783.npz and original-asset-manifest.json from
repository commit 66e9e267afceaf4e12ecd83dd001adc7c6c8e705. Never exports
an index whose 15M exact directed pair identities and weights differ from the
checksum-verified local import. The official pair-by-neuropil table itself is
NOT in this package; Codex neuropil coverage is explicitly partial.
"""
from __future__ import annotations

import argparse
from contextlib import closing
from datetime import datetime, timezone
import gzip
import json
import os
from pathlib import Path
import shutil
import sqlite3
import struct

import numpy as np

from .ingest import FINGERPRINT_MOD, get, put, record_fingerprint, verify
from .portable import PORTABLE_DIR, digest
from .sources import OFFICIAL_MD5

ORIGIN_COMMIT = "66e9e267afceaf4e12ecd83dd001adc7c6c8e705"


def export(db_path: Path, output: Path = PORTABLE_DIR, overview: Path | None = None) -> dict:
    db_path = db_path.resolve()
    output.mkdir(parents=True, exist_ok=True)
    overview = overview or db_path.parent / "overview.bin"
    verify(db_path)  # Recompute source-to-import fingerprints; counts alone do not suffice.
    published = json.loads((output / "original-asset-manifest.json").read_text(encoding="utf-8"))
    if (published["source_files"][0]["publisher_md5"] != OFFICIAL_MD5["edges"] or
            published["source_files"][1]["publisher_md5"] != OFFICIAL_MD5["neurons"]):
        raise ValueError("Original official-source manifest differs from pinned Zenodo checksums")
    asset = output / "flywire-v783.npz"
    asset_sha = digest(asset)
    if asset_sha != published["asset"]["sha256"]:
        raise ValueError("Original official-derived pair index failed SHA-256")
    with closing(sqlite3.connect(f"file:{db_path}?mode=ro", uri=True)) as db:
        db.row_factory = sqlite3.Row
        integrity, source_manifest = get(db, "integrity"), get(db, "manifest")
        if not integrity["validated"] or not integrity["source_files_checksum_verified"]:
            raise ValueError("Export requires a validated, checksum-verified full import")
        if source_manifest["mode"] != "shiu":
            raise ValueError("This export crosscheck requires the unthresholded v783 pair import")
        if (integrity["imported_neurons"] != published["counts"]["neurons"] or
                integrity["directed_pairs"] != published["counts"]["directed_pairs"] or
                integrity["synaptic_contacts"] != published["counts"]["anatomical_synapses"]):
            raise ValueError("Original official-derived pair index and local import counts differ")
        with np.load(asset, allow_pickle=False) as packed:
            ids, ptr, targets, weights = (packed[k] for k in ("ids", "out_indptr", "out_indices", "out_data"))
            if (len(ids) != integrity["imported_neurons"] or len(targets) != integrity["directed_pairs"] or
                    len(weights) != len(targets) or len(ptr) != len(ids) + 1 or
                    tuple(packed["shape"]) != (len(ids), len(ids)) or int(ptr[-1]) != len(targets) or
                    int(weights.sum()) != integrity["synaptic_contacts"] or
                    np.any(ids[1:] <= ids[:-1]) or np.any(np.diff(ptr) < 0) or
                    np.any(targets < 0) or np.any(targets >= len(ids)) or np.any(weights < 1)):
                raise ValueError("Official-derived pair index is structurally invalid")
            for (root_id, _idx), expected_id in zip(
                    db.execute("SELECT root_id,idx FROM neurons ORDER BY idx"), ids, strict=True):
                if root_id != int(expected_id):
                    raise ValueError("Official-derived index has different neuron IDs or order")
            fingerprint = 0
            for index, pre in enumerate(ids):
                start, end = int(ptr[index]), int(ptr[index + 1])
                if np.any(np.diff(targets[start:end]) <= 0):
                    raise ValueError("Official-derived index has unsorted or duplicate directed pairs")
                for offset in range(start, end):
                    fingerprint += record_fingerprint((int(pre), int(ids[targets[offset]]), int(weights[offset])))
            matched = f"{fingerprint % FINGERPRINT_MOD:032x}"
            if matched != integrity["source_record_fingerprint"] or matched != integrity["imported_record_fingerprint"]:
                raise ValueError("Official-derived asset does not match every local source connection record")
    crosscheck = {
        "matched": True, "matched_directed_pairs": integrity["directed_pairs"],
        "matched_neurons": integrity["imported_neurons"], "record_fingerprint": matched,
        "official_derived_asset_sha256": asset_sha, "original_asset_commit": ORIGIN_COMMIT,
        "original_feather_sha256_reported": published["source_files"][0]["sha256"],
        "publisher_md5_recorded_by_original_import": published["source_files"][0]["publisher_md5"],
        "original_feather_reopened_in_this_export": False,
        "meaning": "All pair identities, directions and weights in the separately published official-derived index match the independently checksum-verified Shiu pair import. Original pair-by-neuropil rows were not reimported here.",
    }
    staging = output / ".portable-meta.staging.sqlite"
    staging.unlink(missing_ok=True)
    with closing(sqlite3.connect(f"file:{db_path}?mode=ro", uri=True)) as source, closing(sqlite3.connect(staging)) as target:
        source.backup(target)
        integrity["official_pair_asset_crosscheck"] = crosscheck
        integrity["scope"] = "Shiu v783 complete unthresholded pair import, crosschecked against the official-Zenodo-derived pair index; neuropil annotations remain a partial Codex subset"
        source_manifest["official_pair_asset_crosscheck"] = crosscheck
        source_manifest["source_note"] = "Checksum-verified Shiu v783 all-pair table crosschecked record-for-record against the original official-Zenodo-derived pair index. Neuropil attribution is partial Codex coverage, not the full Zenodo neuropil table."
        put(target, "integrity", integrity)
        put(target, "manifest", source_manifest)
        target.execute("DROP TABLE edges")
        target.execute("DROP INDEX IF EXISTS region_by_region_pre")
        target.execute("DROP INDEX IF EXISTS region_by_region_post")
        target.commit()
        target.execute("VACUUM")
        target.execute("PRAGMA optimize")
        target.commit()
    with closing(sqlite3.connect(f"file:{staging}?mode=ro", uri=True)) as check:
        if (check.execute("PRAGMA quick_check").fetchone()[0] != "ok" or
                check.execute("SELECT COUNT(*) FROM region_edges").fetchone()[0] != integrity["imported_region_rows"] or
                check.execute("SELECT COUNT(*) FROM neurons").fetchone()[0] != integrity["imported_neurons"]):
            raise ValueError("Portable metadata failed SQLite integrity or coverage checks")
    overview_size = overview.stat().st_size
    with overview.open("rb") as buffer:
        header = buffer.read(8)
    if overview_size != 8 + 24 * integrity["imported_neurons"] or header != b"NML1" + struct.pack("<I", integrity["imported_neurons"]):
        raise ValueError("Anatomical overview is missing or has the wrong neuron count")
    compressed = output / ".portable-meta.staging.sqlite.gz"
    with staging.open("rb") as inp, compressed.open("wb") as raw:
        with gzip.GzipFile(fileobj=raw, mode="wb", filename="", mtime=0, compresslevel=6) as gz:
            shutil.copyfileobj(inp, gz, 4 * 1024 * 1024)
    sqlite_sha, sqlite_bytes = digest(staging), staging.stat().st_size
    if (asset.stat().st_size + compressed.stat().st_size + overview_size) > 125_000_000:
        raise ValueError("Portable asset budget exceeds 125 MB; reduce packaging before publishing")
    os.replace(compressed, output / "portable-meta.sqlite.gz")
    staging.unlink()
    if overview.resolve() != (output / "overview.bin").resolve():
        shutil.copyfile(overview, output / "overview.bin")
    doc = {
        "schema_version": 1, "exported_utc": datetime.now(timezone.utc).isoformat(),
        "counts": {"neurons": integrity["imported_neurons"], "directed_pairs": integrity["directed_pairs"],
                   "synaptic_contacts": integrity["synaptic_contacts"], "regional_rows": integrity["imported_region_rows"]},
        "graph": {"file": "flywire-v783.npz", "bytes": asset.stat().st_size, "sha256": asset_sha},
        "metadata": {"file": "portable-meta.sqlite.gz", "bytes": (output / "portable-meta.sqlite.gz").stat().st_size,
                     "sha256": digest(output / "portable-meta.sqlite.gz"), "sqlite_bytes": sqlite_bytes,
                     "sqlite_sha256": sqlite_sha},
        "overview": {"file": "overview.bin", "bytes": overview_size, "sha256": digest(output / "overview.bin")},
        "crosscheck": crosscheck,
        "scope": "All 15,091,983 official-matched directed neuron pairs; Codex neuropil attribution is partial; representative points only, no skeleton morphology",
    }
    staged_manifest = output / ".portable-manifest.staging.json"
    staged_manifest.write_text(json.dumps(doc, indent=2) + "\n", encoding="utf-8")
    os.replace(staged_manifest, output / "portable-manifest.json")
    return doc


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--db", type=Path, default=Path("data/connectome.sqlite"))
    parser.add_argument("--output", type=Path, default=PORTABLE_DIR)
    parser.add_argument("--overview", type=Path, default=None)
    args = parser.parse_args()
    print(json.dumps(export(args.db, args.output, args.overview), indent=2))


if __name__ == "__main__":
    main()

"""Read-only deployment index for the *same* validated v783 import.

The committed compact graph is the existing repository's official-Zenodo-derived
pair index. Metadata, FTS, regional annotations and measured aggregates live in
a compressed SQLite database that excludes the redundant 15M-row edge table.
The compressed file is verified and atomically expanded to ephemeral /tmp on a
serverless cold start. No source rows or display thresholds are invented here.
"""
from __future__ import annotations

from functools import lru_cache
import gzip
import hashlib
import json
import os
from pathlib import Path
import shutil
import tempfile

import numpy as np

PORTABLE_DIR = Path(__file__).resolve().parents[1] / "public" / "data"


def digest(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(4 * 1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def available() -> bool:
    return all((PORTABLE_DIR / name).is_file() for name in (
        "portable-manifest.json", "portable-meta.sqlite.gz", "flywire-v783.npz", "overview.bin"))


@lru_cache(maxsize=1)
def manifest() -> dict:
    """Refuse a partial, stale or tampered packaged dataset."""
    doc = json.loads((PORTABLE_DIR / "portable-manifest.json").read_text(encoding="utf-8"))
    for key in ("graph", "metadata", "overview"):
        item = doc[key]
        path = PORTABLE_DIR / item["file"]
        if not path.is_file() or path.stat().st_size != item["bytes"] or digest(path) != item["sha256"]:
            raise ValueError(f"Packaged {key} does not match the validated portable manifest")
    if doc["graph"]["sha256"] != json.loads(
            (PORTABLE_DIR / "original-asset-manifest.json").read_text(encoding="utf-8"))["asset"]["sha256"]:
        raise ValueError("Official-derived pair asset differs from its original manifest")
    return doc


@lru_cache(maxsize=1)
def metadata_path() -> Path:
    """Unpack a hashed, read-only SQLite file without bundling the 1.5 GB import."""
    doc = manifest()
    item = doc["metadata"]
    source = PORTABLE_DIR / item["file"]
    target = Path(tempfile.gettempdir()) / f"neuroml-{item['sqlite_sha256'][:24]}.sqlite"
    if target.is_file() and target.stat().st_size == item["sqlite_bytes"] and digest(target) == item["sqlite_sha256"]:
        return target
    target.parent.mkdir(parents=True, exist_ok=True)
    fd, name = tempfile.mkstemp(prefix="neuroml-unpacking-", suffix=".sqlite", dir=target.parent)
    try:
        with os.fdopen(fd, "wb") as out, gzip.open(source, "rb") as inp:
            shutil.copyfileobj(inp, out, 4 * 1024 * 1024)
        extracted = Path(name)
        if extracted.stat().st_size != item["sqlite_bytes"] or digest(extracted) != item["sqlite_sha256"]:
            raise ValueError("Portable metadata failed extracted SQLite checksum verification")
        os.replace(extracted, target)
    finally:
        Path(name).unlink(missing_ok=True)
    return target


class Graph:
    """All directed, unthresholded pair weights; transposes lazily for incoming queries."""

    def __init__(self):
        doc = manifest()
        with np.load(PORTABLE_DIR / doc["graph"]["file"], allow_pickle=False) as packed:
            self.ids = packed["ids"]
            self.out_indices = packed["out_indices"]
            self.out_indptr = packed["out_indptr"]
            self.out_data = packed["out_data"]
            shape = tuple(int(v) for v in packed["shape"])
        n, e = len(self.ids), len(self.out_indices)
        if (shape != (n, n) or n != doc["counts"]["neurons"] or
                e != doc["counts"]["directed_pairs"] or len(self.out_data) != e or
                len(self.out_indptr) != n + 1 or int(self.out_indptr[0]) != 0 or
                int(self.out_indptr[-1]) != e or not np.all(np.diff(self.out_indptr) >= 0) or
                not np.all(self.ids[1:] > self.ids[:-1]) or not np.all(self.out_data >= 1) or
                int(self.out_data.sum()) != doc["counts"]["synaptic_contacts"]):
            raise ValueError("Packaged pair index dimensions, ordering or totals are invalid")
        if np.any(self.out_indices < 0) or np.any(self.out_indices >= n):
            raise ValueError("Packaged pair index contains a missing neuron reference")
        self._inbound = None
        self._histogram = None

    def resolve(self, root_id: int) -> int:
        # Never allow NumPy to coerce a Python 18-digit int to float64: that
        # silently rounds FlyWire root IDs beyond JavaScript's safe range.
        index = int(np.searchsorted(self.ids, np.uint64(root_id)))
        if index >= len(self.ids) or int(self.ids[index]) != root_id:
            raise KeyError(root_id)
        return index

    def row(self, index: int, forward: bool = True):
        if forward:
            ptr, indices, values = self.out_indptr, self.out_indices, self.out_data
        else:
            ptr, indices, values = self.inbound()
        start, end = int(ptr[index]), int(ptr[index + 1])
        return indices[start:end], values[start:end]

    def inbound(self):
        if self._inbound is None:
            # The published asset has a source index. Build the exact target index
            # only when needed; SciPy is deliberately not a runtime dependency.
            sources = np.repeat(np.arange(len(self.ids), dtype=np.int32), np.diff(self.out_indptr))
            order = np.argsort(self.out_indices, kind="stable")
            counts = np.bincount(self.out_indices, minlength=len(self.ids))
            ptr = np.empty(len(self.ids) + 1, dtype=np.int64)
            ptr[0] = 0
            np.cumsum(counts, out=ptr[1:])
            self._inbound = (ptr, sources[order], self.out_data[order])
        return self._inbound

    def weight(self, pre: int, post: int) -> int | None:
        try:
            source, target = self.resolve(pre), self.resolve(post)
        except KeyError:
            return None
        indices, values = self.row(source)
        offset = int(np.searchsorted(indices, target))
        return int(values[offset]) if offset < len(indices) and int(indices[offset]) == target else None

    def partners(self, root_id: int) -> list[int]:
        try:
            index = self.resolve(root_id)
        except KeyError:
            return []
        outgoing, _ = self.row(index)
        incoming, _ = self.row(index, forward=False)
        return [int(self.ids[i]) for i in np.union1d(outgoing, incoming)]

    def filter_count(self, minimum: int) -> tuple[int, int]:
        if self._histogram is None:
            counts = np.bincount(self.out_data)
            self._histogram = (counts, np.cumsum(counts[::-1], dtype=np.int64)[::-1],
                               np.cumsum((counts * np.arange(len(counts)))[::-1], dtype=np.int64)[::-1])
        counts, visible, contacts = self._histogram
        return (int(visible[minimum]), int(contacts[minimum])) if minimum < len(counts) else (0, 0)


@lru_cache(maxsize=1)
def graph() -> Graph:
    return Graph()

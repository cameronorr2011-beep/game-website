"""Read-only query service for the compact, complete FAFB v783 graph asset.

The deployed asset is a lossless index of the imported proofread pair table. It
contains exact uint64 root IDs, every proofread directed pair and its summed
anatomical synapse count. It intentionally does not invent cell types,
morphology, neuropil membership per neuron, or physiological sign.
"""
from __future__ import annotations

from collections import deque
from pathlib import Path
import json
from typing import Any

import numpy as np
from scipy import sparse


ROOT = Path(__file__).resolve().parents[1]
ASSET = ROOT / "public" / "data" / "flywire-v783.npz"
MANIFEST = ROOT / "public" / "data" / "manifest.json"
_GRAPH: "CompactConnectome | None" = None


def _uvarint(buffer: bytes, position: int) -> tuple[int, int]:
    value = 0
    shift = 0
    while True:
        if position >= len(buffer):
            raise ValueError("truncated connectome varint")
        byte = buffer[position]
        position += 1
        value |= (byte & 0x7F) << shift
        if not byte & 0x80:
            return value, position
        shift += 7
        if shift > 63:
            raise ValueError("connectome varint exceeds uint64")


def _id(value: np.uint64 | int) -> str:
    return str(int(value))


class CompactConnectome:
    """A complete source-column index with a transposed target index."""

    def __init__(self, asset: Path = ASSET, manifest: Path = MANIFEST):
        with np.load(asset, allow_pickle=False) as packed:
            self.ids = packed["ids"].astype(np.uint64, copy=True)
            shape = tuple(int(value) for value in packed["shape"])
            stored = sparse.csc_matrix(
                (packed["data"].astype(np.float64), packed["indices"], packed["indptr"]),
                shape=shape,
            )
        if stored.shape != (len(self.ids), len(self.ids)):
            raise ValueError("connectome asset dimensions do not match IDs")
        # The source import stores rows=targets and columns=sources. Keep both
        # orientations explicit so API direction cannot be accidentally flipped.
        self.incoming = stored.tocsr()
        self.outgoing = stored.transpose().tocsr()
        self.id_to_index = {int(value): index for index, value in enumerate(self.ids)}
        self.out_degree = np.diff(self.outgoing.indptr)
        self.in_degree = np.diff(self.incoming.indptr)
        self.total_degree = self.out_degree + self.in_degree
        self.manifest = json.loads(manifest.read_text(encoding="utf-8"))

    @property
    def n(self) -> int:
        return len(self.ids)

    def resolve(self, value: str) -> int:
        text = str(value).strip()
        if not text.isdigit():
            raise ValueError("neuron ID must be an unsigned decimal root ID")
        index = self.id_to_index.get(int(text))
        if index is None:
            raise KeyError("neuron ID is not present in FAFB v783")
        return index

    def _row(self, matrix: sparse.csr_matrix, index: int, limit: int, threshold: int) -> list[dict[str, Any]]:
        start, end = int(matrix.indptr[index]), int(matrix.indptr[index + 1])
        indices = matrix.indices[start:end]
        values = matrix.data[start:end]
        keep = values >= threshold
        indices, values = indices[keep], values[keep]
        order = np.argsort(values, kind="stable")[::-1][:limit]
        return [
            {"neuron_id": _id(self.ids[int(indices[i])]), "synapse_count": int(values[i])}
            for i in order
        ]

    def neuron(self, value: str, limit: int = 20) -> dict[str, Any]:
        index = self.resolve(value)
        limit = max(1, min(int(limit), 100))
        outgoing = self._row(self.outgoing, index, limit, 1)
        incoming = self._row(self.incoming, index, limit, 1)
        return {
            "id": _id(self.ids[index]),
            "index": index,
            "dataset": self.manifest["dataset"],
            "degree": {"in": int(self.in_degree[index]), "out": int(self.out_degree[index])},
            "anatomical_synapses": {
                "in": int(self.incoming.data[self.incoming.indptr[index]:self.incoming.indptr[index + 1]].sum()),
                "out": int(self.outgoing.data[self.outgoing.indptr[index]:self.outgoing.indptr[index + 1]].sum()),
            },
            "annotations": {
                "cell_type": None,
                "class": None,
                "subclass": None,
                "neuropil": None,
                "hemisphere": None,
                "neurotransmitter": None,
            },
            "annotation_status": "not imported in this deployment asset; no values are inferred",
            "incoming": incoming,
            "outgoing": outgoing,
            "provenance": {
                "release": self.manifest["dataset"]["version"],
                "source": self.manifest["dataset"]["source"],
                "connection_definition": self.manifest["dataset"]["connection_definition"],
            },
        }

    def search(self, query: str = "", limit: int = 40) -> dict[str, Any]:
        query = str(query).strip()
        limit = max(1, min(int(limit), 100))
        if not query:
            indexes = np.argsort(self.total_degree, kind="stable")[::-1][:limit]
            note = "Showing highest-degree proofread IDs; this release has no imported text annotations."
        elif query.isdigit():
            exact = self.id_to_index.get(int(query))
            if exact is not None:
                indexes = np.array([exact], dtype=np.int64)
            else:
                indexes = np.flatnonzero(np.char.startswith(self.ids.astype(str), query))[:limit]
            note = "Exact or prefix root-ID search."
        else:
            indexes = np.array([], dtype=np.int64)
            note = "Text annotations are unavailable in this imported release; search by exact or prefix root ID."
        rows = [
            {
                "id": _id(self.ids[int(index)]),
                "in_degree": int(self.in_degree[index]),
                "out_degree": int(self.out_degree[index]),
                "total_degree": int(self.total_degree[index]),
                "cell_type": None,
                "region": None,
            }
            for index in indexes[:limit]
        ]
        return {"query": query, "results": rows, "note": note, "total_matching": len(indexes)}

    def connections(self, value: str, direction: str, threshold: int, limit: int) -> dict[str, Any]:
        index = self.resolve(value)
        if direction not in {"incoming", "outgoing"}:
            raise ValueError("direction must be incoming or outgoing")
        threshold = max(1, min(int(threshold), 10_000))
        limit = max(1, min(int(limit), 1_000))
        matrix = self.outgoing if direction == "outgoing" else self.incoming
        rows = self._row(matrix, index, limit, threshold)
        records = []
        for row in rows:
            if direction == "outgoing":
                source, target = _id(self.ids[index]), row["neuron_id"]
            else:
                source, target = row["neuron_id"], _id(self.ids[index])
            records.append({
                "source": source,
                "target": target,
                "synapse_count": row["synapse_count"],
                "neuropil": None,
                "neurotransmitter": None,
                "provenance": "FAFB v783 proofread pair table; neuropil rows aggregated",
            })
        return {
            "source_id": _id(self.ids[index]),
            "direction": direction,
            "minimum_synapses": threshold,
            "records": records,
            "truncated": len(rows) >= limit,
            "total_matching": int(np.count_nonzero(matrix.data[matrix.indptr[index]:matrix.indptr[index + 1]] >= threshold)),
        }

    def overview(self, nodes: int = 240) -> dict[str, Any]:
        nodes = max(24, min(int(nodes), 900))
        indexes = np.argsort(self.total_degree, kind="stable")[::-1][:nodes]
        selected = set(int(x) for x in indexes)
        node_rows = []
        for index in indexes:
            value = int(self.ids[index])
            angle = (value % 1000003) / 1000003 * np.pi * 2
            radius = 0.18 + ((value // 1000003) % 1000) / 1000 * 0.72
            node_rows.append({
                "id": _id(self.ids[index]),
                "x": round(float(np.cos(angle) * radius), 5),
                "y": round(float(np.sin(angle) * radius), 5),
                "degree": int(self.total_degree[index]),
            })
        edges = []
        for source in indexes:
            start, end = int(self.outgoing.indptr[source]), int(self.outgoing.indptr[source + 1])
            targets = self.outgoing.indices[start:end]
            weights = self.outgoing.data[start:end]
            order = np.argsort(weights, kind="stable")[::-1]
            count = 0
            for offset in order:
                target = int(targets[offset])
                if target in selected:
                    edges.append({"source": _id(self.ids[source]), "target": _id(self.ids[target]), "weight": int(weights[offset])})
                    count += 1
                    if count >= 6:
                        break
        return {"nodes": node_rows, "edges": edges, "total_nodes": self.n, "rendered_nodes": len(node_rows), "rendered_edges": len(edges),
                "layout": "deterministic topological overview of highest-degree real nodes; coordinates are not anatomy"}

    def pathway(self, source: str, target: str, threshold: int = 1, max_hops: int = 8) -> dict[str, Any]:
        start = self.resolve(source)
        goal = self.resolve(target)
        threshold = max(1, min(int(threshold), 10_000))
        max_hops = max(1, min(int(max_hops), 10))
        if start == goal:
            path = [start]
        else:
            queue: deque[tuple[int, int]] = deque([(start, 0)])
            parents: dict[int, int | None] = {start: None}
            while queue and goal not in parents:
                current, depth = queue.popleft()
                if depth >= max_hops:
                    continue
                begin, end = int(self.outgoing.indptr[current]), int(self.outgoing.indptr[current + 1])
                candidates = [(int(self.outgoing.indices[i]), int(self.outgoing.data[i]))
                              for i in range(begin, end) if self.outgoing.data[i] >= threshold]
                candidates.sort(key=lambda item: item[1], reverse=True)
                for neighbor, _weight in candidates[:5000]:
                    if neighbor not in parents:
                        parents[neighbor] = current
                        queue.append((neighbor, depth + 1))
                        if neighbor == goal:
                            break
                if len(parents) > 100_000:
                    break
            if goal not in parents:
                return {"found": False, "source": _id(self.ids[start]), "target": _id(self.ids[goal]),
                        "threshold": threshold, "max_hops": max_hops,
                        "note": "No directed path was found within the requested hop and traversal bounds."}
            path = []
            cursor = goal
            while cursor is not None:
                path.append(cursor)
                cursor = parents[cursor]
            path.reverse()
        edges = []
        for left, right in zip(path, path[1:]):
            begin, end = int(self.outgoing.indptr[left]), int(self.outgoing.indptr[left + 1])
            match = np.flatnonzero(self.outgoing.indices[begin:end] == right)
            weight = int(self.outgoing.data[begin + int(match[0])]) if match.size else None
            edges.append({"source": _id(self.ids[left]), "target": _id(self.ids[right]), "synapse_count": weight})
        return {"found": True, "source": _id(self.ids[start]), "target": _id(self.ids[goal]),
                "threshold": threshold, "max_hops": max_hops, "objective": "fewest directed edges; ties expand stronger edges first",
                "path": [_id(self.ids[index]) for index in path], "edges": edges}

    def statistics(self) -> dict[str, Any]:
        degree_bins = [0, 1, 10, 50, 100, 250, 500, 1_000, 2_500, 5_000, 10_000, int(self.total_degree.max(initial=0)) + 1]
        histogram = []
        for low, high in zip(degree_bins, degree_bins[1:]):
            histogram.append({"min": low, "max_exclusive": high, "neurons": int(np.count_nonzero((self.total_degree >= low) & (self.total_degree < high)))})
        return {
            "dataset": self.manifest["dataset"],
            "counts": self.manifest["counts"],
            "degree": {"mean_in": float(self.in_degree.mean()), "mean_out": float(self.out_degree.mean()), "max_in": int(self.in_degree.max(initial=0)), "max_out": int(self.out_degree.max(initial=0)), "histogram": histogram},
            "annotation_coverage": self.manifest["annotation_coverage"],
            "neuropil_synapses": self.manifest.get("neuropil_synapses", {}),
            "validation": self.manifest["validation"],
        }


def graph() -> CompactConnectome:
    global _GRAPH
    if _GRAPH is None:
        _GRAPH = CompactConnectome()
    return _GRAPH

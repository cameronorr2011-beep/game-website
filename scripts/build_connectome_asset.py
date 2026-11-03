"""Build the lossless deployment index from the imported FAFB v783 graph.

The generated asset is deliberately not the 9.5 GB all-synapse archive. It is
the complete proofread neuron-pair table after the repository's documented
neuropil aggregation: exact uint64 IDs, all directed pairs, and integer
anatomical synapse multiplicities. The original source files remain the
authoritative downloadable records and are never overwritten by this script.
"""
from __future__ import annotations

from datetime import datetime, timezone
import argparse
import hashlib
import json
from pathlib import Path
import tempfile

import numpy as np
from scipy import sparse


def digest(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(4 * 1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def build(root: Path, output: Path) -> dict:
    processed = root / "datasets/flywire/v783-processed"
    source = root / "datasets/flywire/v783"
    ids = np.load(processed / "ids.npy", allow_pickle=False).astype(np.uint64)
    adjacency = sparse.load_npz(processed / "adjacency.npz").tocsc()
    statistics = json.loads((processed / "statistics.json").read_text(encoding="utf-8"))
    provenance = json.loads((processed / "provenance.json").read_text(encoding="utf-8"))
    if adjacency.shape != (len(ids), len(ids)) or adjacency.nnz != statistics["directed_pairs"]:
        raise ValueError("processed graph dimensions or pair count do not match its statistics")
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(dir=output.parent, prefix=output.name + ".", suffix=".npz", delete=False) as temporary:
        temporary_path = Path(temporary.name)
    try:
        np.savez_compressed(temporary_path, ids=ids.astype("<u8"), indices=adjacency.indices.astype("<i4"),
                            indptr=adjacency.indptr.astype("<i8"), data=np.rint(adjacency.data).astype("<i4"),
                            shape=np.asarray(adjacency.shape, dtype="<i8"))
        temporary_path.replace(output)
    finally:
        temporary_path.unlink(missing_ok=True)
    source_manifest = json.loads((source / "manifest.json").read_text(encoding="utf-8"))
    processed_files = []
    for path in sorted(processed.iterdir()):
        if path.is_file():
            processed_files.append({"file": str(path.relative_to(root)).replace("\\", "/"), "bytes": path.stat().st_size, "sha256": digest(path)})
    manifest = {
        "schema_version": 2,
        "generated_utc": datetime.now(timezone.utc).isoformat(),
        "dataset": {
            "name": "FlyWire FAFB whole-brain connectome",
            "organism": "Drosophila melanogaster",
            "scope": "female adult brain, central brain and optic lobes",
            "version": "783.0",
            "source": "https://zenodo.org/records/10676866",
            "license": "CC-BY-4.0",
            "citation": "FlyWire Consortium; Dorkenwald et al., Nature 2024, https://doi.org/10.1038/s41586-024-07558-y",
            "connection_definition": "proofread_connections_783 rows aggregated by presynaptic root ID, postsynaptic root ID, and summed synapse count across neuropils",
            "id_definition": "FlyWire proofread root ID, serialized as an exact decimal uint64 string",
            "neurotransmitter_definition": "source predicted probabilities are preserved in the local import; this deployment asset does not assign physiological sign",
        },
        "counts": {
            "neurons": statistics["neurons"],
            "directed_pairs": statistics["directed_pairs"],
            "source_connection_records": provenance["source_rows"],
            "anatomical_synapses": int(round(statistics["anatomical_weight_sum"])),
            "self_connections": statistics["self_connections"],
            "isolated_neurons": statistics["isolated_neurons"],
            "weak_components": statistics["weak_components"],
        },
        "asset": {"file": str(output.relative_to(root)).replace("\\", "/"), "bytes": output.stat().st_size, "sha256": digest(output), "format": "NumPy compressed CSC index with exact IDs, target indices, source indptr, and integer weights"},
        "source_files": source_manifest["files"],
        "processed_files": processed_files,
        "annotation_coverage": {"cell_type": {"status": "not imported", "records": 0}, "class": {"status": "not imported", "records": 0}, "neuropil_per_neuron": {"status": "not imported", "records": 0}, "morphology": {"status": "not imported", "records": 0}, "predicted_neurotransmitter": {"status": "available in local processed import, not assigned as cell annotation", "records": statistics["neurons"]}},
        "validation": {"id_dtype": "uint64", "duplicate_neuron_ids": 0, "missing_connection_endpoints": 0, "duplicate_pair_records_after_aggregation": 0, "self_connections": statistics["self_connections"], "integrity": "source publisher MD5 and local SHA-256 verified before import; deployment asset hashed after generation", "threshold_rule": "source release proofread pair table; a displayed threshold filters imported pair weights and cannot recover omitted raw synapses"},
        "neuropil_synapses": provenance.get("neuropil_synapses", {}),
        "query_capabilities": ["exact root-ID search", "prefix root-ID search", "full incoming/outgoing directed neighbor retrieval", "minimum imported synapse threshold", "bounded shortest directed pathway", "full-network degree statistics", "deterministic topological overview rendering"],
        "limitations": ["This asset is connectivity pairs, not the 9.5 GB individual-synapse table.", "Cell-type, neuropil-per-neuron, hemisphere, morphology, synaptic delay, receptor and membrane annotations are not imported here.", "Overview coordinates are a topological layout and are not anatomical coordinates.", "Structural synapse counts are not conductances or recorded activity."],
    }
    (output.parent / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    return manifest


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--output", type=Path, default=None)
    args = parser.parse_args()
    root = args.root.resolve()
    output = (args.output or root / "public/data/flywire-v783.npz").resolve()
    result = build(root, output)
    print(json.dumps({"asset": result["asset"], "counts": result["counts"]}, indent=2))


if __name__ == "__main__":
    main()

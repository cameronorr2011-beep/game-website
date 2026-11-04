"""Pinned provenance for the FAFB v783 import. Data are NOT vendored in this repo.

The Shiu table is a *directed-pair* aggregation without a synapse threshold;
the Codex regions mirror is a separately thresholded anatomical attribution
only. Neither is silently substituted for the canonical Zenodo Feather file.
"""

DATASET = {
    "name": "FlyWire FAFB — adult female brain",
    "version": "783",
    "organism": "Drosophila melanogaster (adult female)",
    "coverage": "Both brain hemispheres and optic lobes; not the ventral nerve cord",
    "snapshot": "October 2023 (v783); annotations may have been updated subsequently",
    "release": "FlyWire v783 public release, 2024; Zenodo connectivity record published 2024-06-02",
    "license": "FlyWire public release: CC BY-NC 4.0 (flywire.ai/guidelines). Zenodo connectivity record 10676866 lists CC BY 4.0; follow the more restrictive FlyWire guidance unless clarified by the rights holder.",
    "citation": "Dorkenwald et al., Nature 634, 124–138 (2024), doi:10.1038/s41586-024-07558-y; Schlegel et al., Nature 634, 139–152 (2024); Shiu et al., Nature 634, 210–219 (2024).",
    "official_connectivity": "https://zenodo.org/records/10676866",
    "official_annotations": "https://github.com/flyconnectome/flywire_annotations",
    "codex": "https://codex.flywire.ai/api/download?dataset=fafb",
    "limitations": [
        "EM-derived, algorithmically detected chemical synapses and proofread segmentation; not measurements of firing, conductance or function.",
        "Only proofread neuron-to-neuron connections are represented. Unassigned segments, low-confidence synapses excluded by the source, and the nerve cord are outside this graph.",
        "Representative coordinates are points on neurons, not full neuronal morphology. Soma is only shown when separately annotated.",
        "Cell-type and neurotransmitter annotations are source-provided labels/predictions; missing annotations are not inferred.",
    ],
}

MIRRORS = {
    "shiu": {
        "url": "https://github.com/philshiu/Drosophila_brain_model.git",
        "commit": "91bdd1e7dcf193f3e7ca5a8933497fcef63b7960",
        "files": {"edges": ("Connectivity_783.parquet", "efeb23fb99098e9c390f6869969b2a121a2ee92c833cfc45ecb2c1d8e1af0347")},
    },
    "codex-mirror": {
        "url": "https://github.com/snedea/flybrain.git",
        "commit": "9191824d17871b7851645782d53d23f213ddb938",
        "files": {
            "neurons": ("data/neurons.csv.gz", "6a6b3759e635f0f35a677d169052362131ec61d95f55919298b55c43fce4e719"),
            "classification": ("data/classification.csv.gz", "e946b552f4056dfc977707be0674609832c3f64332a22d69dc0d9615e7aae663"),
            "coordinates": ("data/coordinates.csv.gz", "14337121f451f98c2576cee72c24409ada5aaf7948b7c7ca8de9040296840e05"),
            "regions": ("data/connections.csv.gz", "d49dd692e59e153aa3c83f5257bfc0eff51247b86d7bb183386c6d1622c70fc9"),
        },
    },
    "annotations": {
        "url": "https://github.com/flyconnectome/flywire_annotations.git",
        "commit": "a83b2776d60d5764cef36b927f5f9679c16c47a2",
        "files": {"annotations": ("supplemental_files/Supplemental_file1_neuron_annotations.tsv", "b214970b55d2fbe0853bba536fdcb9e28730f4eb7ab06f600491df795da683cd")},
    },
}

# The official Zenodo checksum authenticates the exact file, not merely its name.
OFFICIAL_MD5 = {
    "neurons": "e0e6c19732fd8c7a4e39a2d170105421",  # proofread_root_ids_783.npy
    "edges": "f48f972d262323a102aed49af1396b8a",  # proofread_connections_783.feather
}

EXPECTED_SHIU = {"neurons": 139255, "pairs": 15091983, "synapses": 54492922,
                 "pairs_below_five": 12391470, "region_rows": 3869878,
                 "region_pairs": 2700513, "region_synapses": 34153566}

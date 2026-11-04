# FlyWire FAFB v783 atlas: data contract, provenance and operations

This is an **adult female *Drosophila melanogaster* brain** explorer (central
brain and optic lobes, **not** the ventral nerve cord). The atlas at `/` and
`/connectome` is distinct from the pre-existing, synthetic **sleep simulation**
at `/sleep`; the app downloads remain at `/download`. Sleep-circuit numbers must
never be interpreted as measurements from this connectome.

## Dataset card and scope

| Item | What is actually available |
|---|---|
| Release | FlyWire FAFB public v783, October 2023 snapshot, published in 2024. [Official connectivity release](https://zenodo.org/records/10676866); Dorkenwald *et al.*, *Nature* 634, 124–138 (2024), doi:10.1038/s41586-024-07558-y. |
| Proofread roster | **139,255 unique root IDs**, including neurons with no observed connections; exact decimal IDs serialized as strings in JSON. |
| Graph | **15,091,983 directed neuron-to-neuron pairs**, **54,492,922 detected contacts**. No importer threshold: **12,391,470 pairs with 1–4 contacts are retained**. Weights are structural contact counts, not conductance, activity, or physiological sign. |
| Regional attribution | Separately mirrored Codex regional data: **3,869,878 pair-by-neuropil rows / 2,700,513 pairs / 34,153,566 contacts**. **12,391,470 other pairs have no region in this import**, but remain in every unfiltered graph query. These regional rows are a thresholded subset; a cell's `group` is not a measured synapse location. |
| Cell annotations | Pinned [FlyWire annotations](https://github.com/flyconnectome/flywire_annotations) plus [Codex mirror](https://github.com/snedea/flybrain) classification, group, side, predicted transmitter and representative coordinates where supplied. 139,248 annotation rows; seven refer to IDs outside the proofread roster and 14 roster neurons lack an annotation. All 139,255 roster neurons have a representative point. Anchor voxel coordinates (4×4×40 nm) are converted to nm; separately provided soma coordinates are labeled and never inferred from anchors. |
| Morphology | **Not imported.** A representative point is not an arbor/skeleton. `morphology` explicitly reports unavailable unless an operator configures version-matched SWC files. No SWC is silently joined across reconstructions. |
| License | Zenodo's connectivity record lists CC BY 4.0; [FlyWire public-release guidance](https://flywire.ai/guidelines) says CC BY-NC 4.0. Treat the data as **CC BY-NC 4.0 pending rights-holder clarification**, preserve source citations, and review before commercial reuse. The original asset manifest is retained unmodified for audit; its older license field must not supersede this caution. |

**No claim of 100% of all fly neurons, all EM synapses, complete regional
attribution or full morphology is made.** The graph covers the **proofread
neuron-pair release**; unassigned segments, nerve cord, and source-excluded
contacts are out of scope. The original Zenodo table has 16,847,997
pair-by-neuropil rows according to its earlier checksum-verified import; that
full regional table was **not** reimported for this packaged atlas.

## How the graph was reconciled

1. `connectome/sources.py` pins SHA-256 and Git commit for each mirrored input:
   [Shiu v783 all-pair parquet](https://github.com/philshiu/Drosophila_brain_model)
   (`91bdd1e7dcf193f3e7ca5a8933497fcef63b7960`),
   [Codex roster/classification/coordinates/regions mirror](https://github.com/snedea/flybrain)
   (`9191824d17871b7851645782d53d23f213ddb938`), and
   [FlyWire annotation TSV](https://github.com/flyconnectome/flywire_annotations)
   (`a83b2776d60d5764cef36b927f5f9679c16c47a2`). The all-pair parquet
   SHA-256 is `efeb23fb99098e9c390f6869969b2a121a2ee92c833cfc45ecb2c1d8e1af0347`.
2. The importer rejects duplicate neuron/pair records, invalid counts,
   missing endpoint IDs and regional weight conflicts. Source/import row counts,
   contact totals and **order-independent 128-bit hashes of each complete
   `(source ID,target ID,weight)` record** reconcile. It separately checks
   regional `(source ID,target ID,region,weight)` record hashes. Both source and
   SQLite pair hashes equal `e013c235acd22a36713544780763e71b`; no missing
   pair rows, duplicated IDs/pairs or dangling endpoints were found. `verify`
   recomputes the database fingerprints independently of stored counts.
3. This repository's pre-existing, separately published `neuro-ml` asset
   (`public/data/flywire-v783.npz`) was created from the official Zenodo
   Feather/root-ID files by the original import in commit
   `66e9e267afceaf4e12ecd83dd001adc7c6c8e705`. Its recorded official
   Feather SHA-256 is
   `24f960ae3e7d4f8cd30db3b62e99fb5179cc3d1e76d8c155bfb441e9737d3faf`
   and publisher MD5 is `f48f972d262323a102aed49af1396b8a`;
   `public/data/original-asset-manifest.json` retains the original source
   checksums, statistics and build provenance. The packaged asset itself has
   SHA-256 `ddf717f5c53883da1a131e7a2d71fbde3f900a2202ab087e796bcd2059632e5b`.
   `connectome/export_portable.py` **rehashes the asset, verifies the original
   recorded publisher checksums, compares every root ID, rejects duplicate
   index entries, and computes the same row fingerprint across every one of
   its 15,091,983 pairs and weights**. This fingerprint equals the independently
   imported Shiu source and SQLite fingerprints. The code did **not** download
   or reopen the 852 MB original Feather during this new export, so the status
   says `official_pair_asset_crosschecked=true` and
   `canonical_zenodo_verified=false`, rather than asserting full original
   pair-by-neuropil validation.
4. `public/data/portable-meta.sqlite.gz` contains the exact validated neuron
   records, annotations, regional subset, FTS5 search, computed degrees and
   reconciled whole-network aggregates, **without** the redundant 15M-row
   `edges` table. A readonly compressed asset plus the separately published
   indexed graph serves the same API; `tests/test_portable_connectome.py`
   compares both backends endpoint-by-endpoint. The anatomical point buffer
   `public/data/overview.bin` has one record per imported neuron; no topology
   is inferred from its coordinates. See `portable-manifest.json` for checksums
   of every shipped asset and the extracted SQLite file.

### Counts and omissions visible to users

The integrity view shows the actual source/import count comparison, record
fingerprints, attribution coverage, off-roster annotations and absent
morphology. It never treats `2,700,513` thresholded regional pairs as the whole
network. At a display threshold of five, the API reports **2,700,513 visible
pairs and 12,391,470 hidden pairs**, without removing hidden records. Whole
network class-to-class flow overlays **aggregate all 15,091,983 directed pairs**;
they do not pretend to draw 15 million separate lines. Selecting a neuron
returns actual, paged directed inputs/outputs, including one-contact pairs.
Neuropil filters only match records with explicit source-attributed synapses.

## Use the prepackaged atlas

Python 3.11+ and NumPy 2 are sufficient for the read-only API (no PyArrow or
SciPy at runtime). From this repository root:

```bash
python -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/python tools/connectome_server.py --host 0.0.0.0 --port 8000
# Browse http://localhost:8000/ , /connectome , /download , or /sleep
```

The server prefers a validated `data/connectome.sqlite` if present; otherwise
it uses the shipped compact package. `NEUROML_FORCE_PORTABLE=1` tests the
serverless backend even when a local full database exists. If
`NEUROML_DB_PATH` is explicitly set, **only that database** is used; a missing
or invalid override does not silently switch datasets. Import state is tracked
in `data/import_status.json`; an incomplete replacement is staged separately
while an earlier validated import remains available. A corrupt or missing
packaged asset is an explicit failure/not-configured state, never a demo brain.

### Rebuild or update (explicit provenance required)

```bash
.venv/bin/pip install -r requirements-ingest.txt
.venv/bin/python -m connectome.ingest fetch-mirrors --cache data/raw/github
.venv/bin/python -m connectome.ingest import --mode shiu --cache data/raw/github
.venv/bin/python -m connectome.ingest verify --db data/connectome.sqlite
.venv/bin/python -m connectome.export_portable --db data/connectome.sqlite
```

The importer hashes every source file against pinned digests, streams into a
staging SQLite file, calculates degree/analytics/overview, checks source and
indexed row fingerprints and regional records, then atomically activates the
new database and buffer **only after validation**. Interrupted stages may be
resumed; `--reset` discards incomplete staging, not the validated active DB.
`--allow-unverified` accepts explicitly identified unknown checksums for local
investigation and **never** reports canonical certification; the portable
export deliberately refuses an unverified import. Do not check raw inputs,
`data/connectome.sqlite` (~1.55 GB), staging files or source clones into Git.
The committed production package is **106,455,400 bytes** in three data files
(plus small manifests): graph 48,560,472, compressed metadata 54,552,800,
overview 3,342,128 bytes. The 206 MB SQLite metadata is expanded into
serverless `/tmp` after both compressed and extracted checksums match.

For the *full official pair-by-neuropil* reconstruction, manually obtain
`proofread_root_ids_783.npy` and `proofread_connections_783.feather` from the
[Zenodo release](https://zenodo.org/records/10676866) and run:

```bash
.venv/bin/python -m connectome.ingest import --mode zenodo \
  --neurons /path/to/proofread_root_ids_783.npy \
  --edges /path/to/proofread_connections_783.feather \
  --annotations /path/to/Supplemental_file1_neuron_annotations.tsv
.venv/bin/python -m connectome.ingest verify
```

The importer checks the publisher MD5 (`e0e6c19732fd8c7a4e39a2d170105421`
for roots; `f48f972d262323a102aed49af1396b8a` for Feather) and does not
silently mix pair-by-neuropil rows with the thresholded Codex regional subset.
If additional annotation/coordinate sources are provided, their revisions and
checksums must be recorded; do not infer missing labels. The default packaged
release **does not claim to have completed this full regional import**.

## Same-origin backend API

`GET /api/connectome?resource=...` returns JSON unless noted. IDs are **exact
base-10 strings**; do not parse them as JavaScript `Number`. Requests are
read-only and share the site's origin. An invalid parameter returns 400, an
unknown neuron/edge/region returns 404, and unconfigured/invalid data returns
503. Bounds are enforced (list page ≤100, connections page ≤200, 4 trace
hops). A bounded traversal that hits its safety limit returns `incomplete:true`
with a reason, not a fabricated `found:false` result.

| Resource | Parameters and result |
|---|---|
| `status` | Stage, active dataset/storage mode, validation and official-pair-index crosscheck, optional pending import. No invented progress. |
| `metadata`, `integrity`, `analytics`, `regions` | Dataset card/source file digests, audit statistics, complete whole-graph aggregates and available **partial** source neuropil summaries. |
| `overview` | Binary `NML1` + little-endian `uint32` count + **24 bytes per neuron**: little-endian `uint64` root ID, three `float32` nanometre coordinates, `uint8` class code and three padding bytes. Sorted by stable neuron index; count must match `integrity.imported_neurons`. |
| `region-mask` | `region=CODE`; binary byte array aligned to overview index, where 1 means an explicitly source-linked neuron. `X-Neurons-In-Region` gives the number of flagged records. |
| `neurons`, `search` | Optional `q`, `class`, `cell_type`, `side`, `group`, `flow`, `region`, `connected_to`, `min_in`, `min_out`, `page`, `limit`. Exact ID, FTS5 annotation prefix search, indexed filters, exact totals and pages (not a 220-node sample). |
| `neuron` | `id`; one real record, annotations, soma/representative position when provided, degree, contact totals and available regional synapse participation. |
| `morphology` | `id`; explicit `available:false` unless `NEUROML_SWC_DIR` has a matching SWC. The SWC is operator-supplied, must be version-matched, is validated and capped at 100,000 vertices. |
| `incoming`, `outgoing` | `id`, `min_synapses` (default **1**), `region`, `offset`, `limit`. Actual directed pairs ranked by contact count, partner annotations, total matching count and explicit filtering notice. No threshold is applied to storage. |
| `edge` | `source`, `target`; exact directed pair weight, separately available neuropil rows and explicitly **unattributed** contacts. No fake region is assigned. |
| `trace` | `source`, `target`, `max_hops` (1–4), `min_synapses` (default 1). Bidirectional bounded shortest-hop search of real directed pairs; 500,000-edge, 80,000-node and nine-second budgets. |
| `neighborhood` | `id`, `direction=in\|out`, `hops` (1–2), `min_synapses`. Exact reached-neuron counts for completed expansions, sample IDs labeled truncated, and a 100,000-edge safety budget. |
| `filter-count` | `min_synapses`; exact visible/hidden pair and visible contact counts against the full graph. View-only. |

Example:

```bash
curl 'http://localhost:8000/api/connectome?resource=search&q=LPLC2&limit=10'
curl 'http://localhost:8000/api/connectome?resource=outgoing&id=720575940596125868&min_synapses=1&limit=40'
curl 'http://localhost:8000/api/connectome?resource=filter-count&min_synapses=5'
```

### Production hosting, failure and verification

`vercel.json` includes `public/data/**` in the Python API bundle, assigns the
connectome function 1 GB / 60 seconds, and keeps `/connectome` and `/datasets`
links valid. The function uses only the versioned, checked read-only assets and
an ephemeral `/tmp` extraction; it does **not** depend on a persistent SQLite
volume or a browser-visible localhost API. An optional `NEUROML_UPSTREAM`
**HTTPS** URL makes the same-origin Vercel function proxy an operator-managed
server with a full import; `NEUROML_UPSTREAM_TOKEN` on Vercel must match
`CONNECTOME_SERVER_TOKEN` on that server. No token is sent to the browser.
Without an override, the bundled package is used; an unreachable configured
upstream returns 503 rather than silently switching datasets.

```bash
.venv/bin/python -m unittest discover -s tests -p 'test_*.py' -v
npm ci && npm run check:js && npm run test:browser
npm run test:browser:portable  # exercises real packaged data without the 1.55 GB edge DB
.venv/bin/python tools/test_serverless_bundle.py  # isolated cold-start of actual Vercel handler
.venv/bin/python -m connectome.ingest verify --db data/connectome.sqlite  # if imported
```

The tests include synthetic **test-only** importer fixtures, changed-identity
integrity detection, direct equivalence of full/portable API behavior, a
packaged real-ID smoke test, and Chromium desktop/mobile WebGL/inspector/search/
trace tests. Test fixtures are never shipped as biological data. A real Vercel
build and cold deployment should be rechecked after merging; the repository
cannot itself certify that the hosting provider's bundle quotas or routing
will remain unchanged. If that build rejects the bundle, host the same
validated import on a persistent server and use the documented upstream
override instead of substituting a fake or partial graph.

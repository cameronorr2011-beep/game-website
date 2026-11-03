# Dataset catalog

| Dataset | Version | Source/license | Local location | Status |
|---|---|---|---|---|
| FlyWire proofread FAFB | 783.0 | DOI 10.5281/zenodo.10676866; CC-BY-4.0 | datasets/flywire/v783/ | Download/import status is authoritative in manifest.json and processed statistics.json. |
| FlyWire canonical graph | derived from 783.0 | Same attribution; declared aggregation | datasets/flywire/v783-processed/ | CSR counts, uint64 IDs, provenance, predicted NT summaries. |
| TVB demonstration connectivity | f1a3e7dc5370158df721f206c9c9bfad55d98172 | TVB repository GPL-3.0-or-later, source license retained | datasets/human/tvb96/ | 96 regions; partial anatomy. Source acquisition metadata needs review. |
| TVB canonical graph | same pinned source | Same source terms | datasets/human/tvb96-processed/ | 3939 nonzero matrix entries, source centers/tract lengths, explicit failed coverage report. |
| HCP Young Adult | 2025 | Access agreement required | not downloaded | Investigated, no agreement bypass. |
| BANC | v888 investigated | Review individual deposit terms before import | not downloaded | Distinct specimen; no identity merge with FAFB. |
| External NeuroML reference source | 99a32ac3b23e71fb9c1a77d65dc24fbe1afd5aea | No explicit license recovered; reference-only | legacy/neuroml_reference/ | Six pinned files, SHA-256 recovery manifest; no model weights recovered. |
| HASTY-CR game assets | ac4ef71 plus preserved local changes | Mixed upstream game/vendor terms; original research license notes retained | legacy/hasty_cr/ after migration | Archive only; never biological training data. |

Manifest fields: organism, release, source, license/citation, download UTC, file dimensions/units, quality caveats, preprocessing and SHA-256. Imported anatomy adds computed dimensions and exact counts. Source files/checkpoints remain ignored in Git. Never publish licensed/restricted data, unlicensed reference source or runtime credentials. Numerical test fixtures are synthetic and explicitly labeled; they never count as imported biological data.

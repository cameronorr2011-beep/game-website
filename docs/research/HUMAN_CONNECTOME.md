# Human regional connectivity and coverage gap

HCP Young Adult 2025 is a reprocessing release, not a new cohort. It provides processed imaging for 1071 subjects and unprocessed imaging for 1113, with subsets for MEG and 7T. Data-use agreement/access is required; no access requirement was bypassed. HCP is not an off-the-shelf atlas that automatically includes every requested brainstem nucleus.

The implemented public alternative is the TVB 96-region demonstration archive, pinned at f1a3e7dc5370158df721f206c9c9bfad55d98172. The source license and original info.txt are retained. Region labels and tract lengths are preserved; conservative label mapping identifies bilateral cortical groups, thalamic groups, caudate, putamen, pallidum, hippocampal and amygdala regions. Source abbreviations remain names rather than invented full anatomical labels.

**This is not a complete whole-brain atlas.** Missing groups: hypothalamus, cerebellum, vermis, midbrain, pons and medulla. Strict mode fails explicitly. `--allow-partial` is an opt-in exploratory experiment, never a substitute for fulfilling the coverage requirement. No invented cerebellar/brainstem nodes or edges are added.

The imported archive has 96 nodes, 3939 nonzero directed matrix entries, 79 source-supplied diagonal entries, no isolated nodes and one weak component. These are locally computed matrix statistics, not a count of axons or synapses. Dataset acquisition/provenance must be reviewed before treating the demonstration weights as a calibrated subject-level tractography connectome. We retain weights unchanged in anatomy and normalize only in the separate dynamics engine.

```bash
python -m neuro_ml fetch-human datasets/human/tvb96
python -m neuro_ml import-human datasets/human/tvb96 datasets/human/tvb96-processed
# Expected to fail: required anatomy is absent.
python -m neuro_ml human datasets/human/tvb96-processed experiments/runs/human-strict
# Clearly labeled exploratory partial-atlas run:
python -m neuro_ml human datasets/human/tvb96-processed experiments/runs/human-partial --allow-partial
```

Candidate next atlases: AAL3 (more subcortical coverage but still verify brainstem/cerebellar definitions), HCP multimodal cortex plus independently registered non-cortical atlas, or a properly sourced extended whole-brain connectome. A cortical-only Schaefer or Desikan-Killiany matrix cannot satisfy strict mode. Combining atlases requires consistent coordinates, nonoverlapping region definitions and measured connectivity mapped to exactly those regions; listing anatomy alone is insufficient. Complete regional coverage remains unfinished.

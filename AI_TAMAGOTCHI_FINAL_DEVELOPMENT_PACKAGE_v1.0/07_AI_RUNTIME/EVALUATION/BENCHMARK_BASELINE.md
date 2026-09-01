# BENCHMARK BASELINE

The existing readiness workbook `AI_Tamagotchi_Development_Readiness_Workbook_v0.1.xlsx`, sheet `Benchmark`, is the Stage-8 baseline.

Known source-backed properties:
- 100 cases;
- `BC-001..BC-100`;
- intentionally balanced: 20 cases each for C1/C2/C3/C4/C5;
- columns: CaseID, RawInput, ExpectedComplexity, Category, Tools, ClarificationRequired, ExpectedClarification, Rationale, Tags;
- dataset tag: `balanced-gold-v0.1`.

This balanced set is for regression/confusion analysis and **must not** be treated as expected production class distribution.

## Exact-copy rule

The workbook is indexed/read in the project source set but its raw XLSX bytes are not mounted in the current artifact runtime. Stage 8 therefore does not fabricate a replacement CSV.

The implementation/evaluation runner must consume:
1. the exact workbook copy packaged under input sources at final packaging, or
2. a lossless extracted CSV/JSONL generated from that exact workbook.

Any generated substitute with re-authored RawInput rows is invalid.

## Future production-grade extension

After organizational/security approval:
- add anonymized real pilot cases;
- separate development/tuning data from locked holdout;
- use at least two knowledgeable annotators;
- adjudicate disagreement;
- keep dataset version and annotation protocol with each result.

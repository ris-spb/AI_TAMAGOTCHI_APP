# DUPLICATES AND DEPRECATED — Stage 0 (restart)

**Scope:** forensic classification. No source file is deleted or rewritten.

## 1. Product duplicates / older variants

- `TZ_AI_Tamagotchi_v1.0 (1).docx` (2026-08-31) — **current supplied Product TZ instance**.
- `TZ_AI_Tamagotchi_v1.0.docx` (2026-08-27 09:04) — historical duplicate instance.
- `TZ_AI_Tamagotchi_v1.0.docx` (2026-08-27 08:04) — historical duplicate instance.
- `AI_Tamagochi_TZ_v1.0.docx` (2026-08-26) — older Product-spec variant/draft.

No byte-level duplicate assertion is made because those DOCX bytes are not available to the sandbox for hashing.

## 2. Design TZ duplicates

Three indexed instances of `TZ_Design_Lyuboznayka_Pulkovo_v1.0.docx` exist. The 09:04Z instance on 2026-08-27 is the latest retrieved copy. The 08:04Z and 08:00Z copies are historical instances.

## 3. Visual Production TZ duplicate instance

Two indexed instances of `TZ_Visual_Production_Package_v1.0.md` exist:

- 2026-08-27 09:54:34Z — latest indexed instance;
- 2026-08-27 09:52:31Z — historical duplicate instance.

## 4. Visual package legacy → current mappings

`CURRENT_SOURCE_MAP_v2.0.md` is the explicit mapping authority for legacy visual files. Historical files remain valid audit evidence but are not current when a mapped v2.0 replacement exists.

Confirmed classes include:

- `Visual_Principles.md` → `Visual_Principles_v2.0.md`;
- `OPEN_DECISIONS_v1.1.md` → `OPEN_DECISIONS_v2.0.md`;
- `CURRENT_PROJECT_APPROVAL_STATUS_v1.2.md` → `CURRENT_PROJECT_APPROVAL_STATUS_v2.0.md`;
- `MASTER_ASSET_PLAN.xlsx` → `MASTER_ASSET_PLAN_v2.0.xlsx`;
- `REQUIREMENT_TRACEABILITY_MATRIX.xlsx` → `REQUIREMENT_TRACEABILITY_MATRIX_v2.0.xlsx`;
- v1 mascot Character Bible / proportions / master-source specifications → v2 variants;
- v1 Pulkovo reference/environment/modeling/lighting/camera specifications → current v2 variants where mapped;
- v1 fallback/responsive/export/QA/rights matrices → v2 variants where mapped.

Stage 1 must use the current mapping file rather than “highest-looking filename” heuristics.

## 5. Open-decisions lineage

There are several generations of open-decision material:

- `OPEN_DECISIONS.md` — early Stage-0 register;
- `OPEN_DECISIONS_v1.1.md` — historical revision;
- `OPEN_DECISIONS_v2.0.md` — v2 remediation register;
- `OPEN_DECISIONS_FINAL.md` — later Stage-21 final-audit snapshot.

`OPEN_DECISIONS_FINAL.md` reports 10 resolved/resolved-baseline, 3 waived non-blocking, and 19 still open. It explicitly says major Home/navigation/canonical/runtime-coordinate conflicts must not be reopened. Stage 1 must merge this final snapshot with the owner override chain rather than treating old `OPEN` statuses as current.

## 6. Screen State Matrix forensic status

The current canonical handoff filename is `09_DEVELOPER_HANDOFF/Screen_State_Matrix.xlsx`, and Stage-20 manifest gives it a current SHA-256. However its internal Stage-10 summary still contains historical statements that OD-001..007 were open and Home/navigation were not frozen.

Classification:

- matrix **state rows** remain a current handoff input;
- its old Stage-10 gate-status prose is **historical/stale relative to later v2 owner/remediation files**;
- Stage 1 must apply later source precedence rather than resurrect the historical gate state.

## 7. Component Matrix forensic status

Current canonical `Component_Matrix.xlsx` has 29 components. Some rows still carry old open-decision tags/provisional source-component language. Those row-level historical tags are not automatically current project blockers; Stage 1 must cross-check them against current v2 resolution status.

## 8. Asset Manifest lineage

The package contains multiple generations including `Asset_Manifest_v2.0.xlsx`, `Asset_Manifest_v2.1.xlsx`, and canonical Stage-20 `Asset_Manifest.xlsx`.

Stage-20 `HANDOFF_INDEX_v2.0.md` explicitly instructs developers to consume the unsuffixed `Asset_Manifest.xlsx`. Therefore:

- `Asset_Manifest.xlsx` — **current canonical handoff filename**;
- versioned manifests — lineage/audit companions;
- do not select current manifest by filename suffix alone.

## 9. Design Tokens alias/version drift

Canonical Stage-20 filename is `09_DEVELOPER_HANDOFF/Design_Tokens.json`.

The final missing-assets audit identifies a stale alias/path expectation around `Design_Tokens_v2.0.json`. The canonical current handoff path is the unsuffixed file named by `HANDOFF_INDEX_v2.0.md`.

## 10. Motion / 3D / Developer Notes byte-equivalent companions

Stage-20 hashes show these pairs are byte-equivalent at handoff time:

- `Motion_Specification.md` = `Motion_Specification_v2.0.md`;
- `3D_Specification.md` = `3D_Specification_v2.0.md`;
- `Developer_Notes.md` = `Developer_Notes_v2.0.md`.

Canonical developer consumption paths remain the unsuffixed files.

## 11. Historical SVG paths

Final visual audit reports **35 superseded historical paths with replacements**. In particular, many old v1.0 SVG icon paths have v1.1 physical replacements. They must be classified as version drift/deprecated paths, not as current missing runtime assets.

## 12. Old mascot fallbacks

Old schematic Stage-14 Happy/Coma mascot fallbacks are deprecated and must not return to production. v2 canonical-derived fallbacks are the current production fallback line.

## 13. 3D proxy assets vs production assets

Package contains 9 `.glb` files from Stage-16 technical feasibility/spike work. They are **technical proxy assets**, not final realtime production exports.

Final visual audit states final production GLB = 0. Therefore the 9 `.glb` files must never be promoted merely because they physically exist.

## 14. Historical manifest vs final physical audit discrepancy

At least one historical stage manifest states certain motion/readme artifacts were created, while the Stage-21 `MISSING_ASSETS_REPORT.md` lists them as physically absent in the final package (examples previously identified include `README_Motion_System.md` and `Mascot_Reactions_v1.0.md`).

Classification: `FORENSIC_DISCREPANCY — FINAL PHYSICAL AUDIT WINS FOR CURRENT PRESENCE`.

The historical manifest remains audit evidence of the earlier claim; it is not proof of current file presence.

## 15. ZIP-state discrepancy is not a product conflict

Internal Stage-21 manifest says `zip_created=false`; Stage-22 says ready for ZIP after Asset Index verification. The owner has now supplied a ZIP container. This means only that a delivered archive exists now; it does not retroactively change the historical Stage-21/22 process records.

## 16. Preliminary readiness artifacts

`openapi_preliminary_v0.1.yaml`, readiness API tables, readiness architecture/ERD artifacts and AI schema are **preliminary inputs**, not deprecated garbage and not final contracts.

## 17. Prior Development-Package Stage 0 output

The previous generated Stage-0 output under `/mnt/data/stage0_stage_output/...` is **SUPERSEDED BY THIS CLEAN RESTART** and is not treated as a project source.

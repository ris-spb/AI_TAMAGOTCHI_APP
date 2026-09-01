# SOURCE VERSION MAP — Stage 0 (restart)

**Project:** AI‑Тамагочи / Любознайка  
**Stage:** 0 — Input Intake & Forensic Inventory  
**Revision:** clean restart after direct review of current visual package  
**Status:** `PASS_WITH_NONBLOCKING_GAPS`

This document records **what exists, version lineage and apparent current status only**. It intentionally does not normalize product requirements; that is Stage 1.

## 1. Governing Development Package inputs

Current direct uploads:

1. `PROMPT_AI_Development_Package_Generator_v1.0.md` — governing master prompt v1.0.
2. `TZ_AI_Development_Package_Generator_v1.0.md` — governing Development Package TZ v1.0.
3. `README_USE.md` — usage/read-order instruction.

Stage 1 must apply the precedence defined by the master prompt:

1. latest explicit owner decision;
2. latest current approval/remediation status;
3. current visual developer handoff;
4. Product Specification;
5. Design Specification;
6. Development Readiness recommendation;
7. preliminary artifacts.

## 2. Product Specification lineage

| Instance | Timestamp | Stage-0 classification |
|---|---|---|
| `TZ_AI_Tamagotchi_v1.0 (1).docx` | 2026-08-31 10:52Z | **CURRENT PRODUCT INPUT INSTANCE** |
| `TZ_AI_Tamagotchi_v1.0.docx` | 2026-08-27 09:04Z | historical duplicate instance |
| `TZ_AI_Tamagotchi_v1.0.docx` | 2026-08-27 08:04Z | historical duplicate instance |
| `AI_Tamagochi_TZ_v1.0.docx` | 2026-08-26 13:59Z | older variant/draft |

Logical product version remains **v1.0**. Byte-equivalence of old DOCX copies is not claimed because their bytes are not exposed to the sandbox.

## 3. Design Specification lineage

Three indexed instances of `TZ_Design_Lyuboznayka_Pulkovo_v1.0.docx` exist:

- 2026-08-27 09:04Z — **latest indexed Design TZ instance**;
- 2026-08-27 08:04Z — historical duplicate instance;
- 2026-08-27 08:00Z — historical duplicate instance.

Design v1.0 remains a source for visual/interaction semantics **except where a later approved owner/remediation source explicitly overrides it**.

## 4. Visual-package upstream lineage

- `PROMPT_AI_Visual_Package_Generator_v1.0.md` — upstream package-generation rules, 2026-08-27 09:54Z.
- `TZ_Visual_Production_Package_v1.0.md` — v1.0 visual production/handoff specification. Latest indexed instance: 2026-08-27 09:54:34Z; an earlier 09:52:31Z instance is historical.

These are upstream construction sources, not the latest project state.

## 5. Current Visual Package

**Package:** `AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0`  
**Current override:** `v2.0`  
**Package stage:** `22 / 22`  
**Final indexed path count:** `700`  
**Readiness:** `84.3 / 100`  
**Status:** `DEVELOPER-READY / EXTERNAL 3D PRODUCTION REQUIRED`  
**Full Production Freeze:** `NOT COMPLETE`

### Complete package inventory anchors

- `00_README/ALL_FILES.txt` — authoritative 700-path list.
- `00_README/PROJECT_FILE_TREE_v2.1.md` — 700-file tree.
- `00_README/FILE_COUNTS_BY_CATEGORY.md` — counts by top-level folder and extension.
- `00_README/ASSET_INDEX.xlsx` — package inventory/status/size/hash index; self-row uses `SELF_DYNAMIC`.

Top-level counts total exactly 700:

| Category | Files |
|---|---:|
| `00_README` | 153 |
| `01_FIGMA` | 81 |
| `02_DESIGN_SYSTEM` | 137 |
| `03_MASCOT_LYUBOZNAYKA` | 25 |
| `04_PULKOVO_WORLD` | 53 |
| `05_UI_ASSETS` | 25 |
| `06_MOTION` | 13 |
| `07_RESPONSIVE` | 19 |
| `08_PRODUCTION_EXPORTS` | 63 |
| `09_DEVELOPER_HANDOFF` | 61 |
| `10_QA_REFERENCE` | 49 |
| `11_RIGHTS_AND_APPROVALS` | 20 |
| root | 1 |

## 6. Current visual decision/status chain

For Stage 1, the current visual chain identified during intake is:

1. `00_README/PROJECT_DECISION_OVERRIDE_v2.0.md` — latest explicit visual project override.
2. `00_README/CURRENT_PROJECT_APPROVAL_STATUS_v2.0.md` — current approval/remediation status.
3. `00_README/CURRENT_SOURCE_MAP_v2.0.md` — legacy → current mapping.
4. `00_README/SPEC_DECISION_ADDENDUM_v2.0.md` — explicit Product/Design conflict resolutions.
5. `00_README/stage_manifest_retroactive_remediation_v2.0.json` — verifies 25/25 required current files, 17 Golden v2 screens, current fallback set, and hashes.
6. `09_DEVELOPER_HANDOFF/HANDOFF_INDEX_v2.0.md` + canonical Stage-20 handoff files.
7. `00_README/OPEN_DECISIONS_FINAL.md` / Stage-21 final audit for the latest snapshot of what remains open for full Production Freeze.
8. Stage-22 package README/manifest/self-audit for packaging status.

Stage 0 only records this chain. Stage 1 will apply it to normalize requirements and decisions.

## 7. Verified current visual facts (existence/status only)

The current v2 files support the following intake findings:

- canonical Lyuboznayka exists: `MSC_Lyuboznayka_Canonical_UserApproved_v1.0.jpeg`;
- canonical Pulkovo interior/composition exists: `REF_PULKOVO_Interior_Composition_UserApproved_v2.0.png`;
- Home/navigation conflict group has later v2 resolution material;
- Hybrid 3D is the current baseline;
- Three.js/WebGL2-capable + glTF 2.0 / GLB baseline is current;
- unit convention 1 m, right-handed glTF, Y-up is current;
- legal/brand/license/provenance workflow is recorded as `WAIVED_NON_BLOCKING` for development progression, not as independent legal clearance;
- physical-device Stage-16 validation is `WAIVED_NON_BLOCKING`; no fabricated measured performance is claimed;
- v2 production fallbacks and 17 v2 Golden Screens are current.

## 8. Current developer handoff

`HANDOFF_INDEX_v2.0.md` reports 9 mandatory deliverables present. Canonical consumption filenames include:

- `Design_Tokens.json`;
- `Component_Matrix.xlsx`;
- `Screen_State_Matrix.xlsx`;
- `Asset_Manifest.xlsx`;
- `Motion_Specification.md`;
- `3D_Specification.md`;
- `Developer_Notes.md`;
- `Visual_QA_Checklist.xlsx`;
- `CHANGELOG.xlsx`.

Stage-20 manifest reports current physical runtime visual set = **56 files (51 SVG + 5 WebP)**.

Important forensic rule: version suffix alone is not enough to choose a current handoff file. Stage-20 `HANDOFF_INDEX_v2.0.md` explicitly names unsuffixed canonical consumption files even where versioned companions also exist.

## 9. 3D file status

The final package contains **9 `.glb` files**, but they are Stage-16 technical/proxy spike assets. Final visual audit explicitly reports:

- final production GLB = **0**;
- KTX2 = **0**;
- final mascot/world realtime 3D remains `EXTERNAL_PRODUCTION_REQUIRED`.

Therefore package extension count must never be interpreted as production 3D readiness.

## 10. Final visual-audit snapshot

Stage-21 final audit reports:

- developer handoff ready: YES;
- full production freeze ready: NO;
- product traceability in visual package: 53/60 complete/resolved;
- design traceability: 52/60 complete/resolved;
- semantic screens: 37;
- state rows: 231;
- Golden Screens v2: 17;
- physical runtime assets: 56;
- true missing declared source/reference files: 46;
- historical superseded paths with replacement: 35;
- stale manifest aliases: 1;
- open decisions: 19;
- waived non-blocking decisions: 3.

`OPEN_DECISIONS_FINAL.md` distinguishes open implementation-baselined items from items relevant to full Production Freeze. Stage 1 must not treat every `OPEN` row as an application-development blocker.

## 11. Readiness / preliminary engineering lineage

| Artifact | Status in Stage 0 |
|---|---|
| `AI_Tamagotchi_Development_Readiness_Pack_v0.1.docx` | PRESENT / READ |
| `AI_Tamagotchi_Development_Readiness_Workbook_v0.1.xlsx` | PRESENT / READ |
| `ai_processing_schema.json` | PRESENT / INDEPENDENTLY RETRIEVED / READ |
| `openapi_preliminary_v0.1.yaml` | PRESENT / READ / explicitly preliminary |
| `erd.mmd` | listed in Pack Artifact Index; separate file not independently retrieved |
| `architecture.mmd` | listed in Pack Artifact Index; architecture content present/read in Pack; separate mmd not independently retrieved |
| `ux_flow.mmd` | listed in Pack Artifact Index; separate file not independently retrieved |

Workbook inputs confirmed: benchmark 100, taxonomy 81 rows, AI tools 36, preliminary API 50 endpoints, Figma states 61, backlog 55 stories, KPI dictionary 35.

## 12. Stage-0 conclusion

The source set is sufficient to start **Stage 1 — Source of Truth & Requirements Normalization**. Remaining forensic limitations are explicitly non-blocking and are listed in `INPUT_GAPS.md`.

# SOURCE OF TRUTH — AI‑Тамагочи / Любознайка

**Stage:** 1 — Source of Truth & Requirements Normalization  
**Status:** `CURRENT NORMATIVE DEVELOPMENT-PACKAGE BASIS`  
**Generated:** 2026-08-31T12:10:17.096159+00:00

A lower-precedence source may fill a gap, but it may not override a higher-precedence explicit decision.

## 1. Formal precedence

| Rank | Source class | Current examples |
|---:|---|---|
| 1 | Latest explicit Project Owner decision | AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/PROJECT_DECISION_OVERRIDE_v2.0.md |
| 2 | Latest current approval/remediation/final decision | AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/CURRENT_PROJECT_APPROVAL_STATUS_v2.0.md, AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/00_README/OPEN_DECISIONS_FINAL.md |
| 3 | Current visual developer handoff | AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0/09_DEVELOPER_HANDOFF/HANDOFF_INDEX_v2.0.md, Design_Tokens.json, Component_Matrix.xlsx, Screen_State_Matrix.xlsx, Asset_Manifest.xlsx |
| 4 | Product Specification | TZ_AI_Tamagotchi_v1.0 (1).docx |
| 5 | Design Specification | TZ_Design_Lyuboznayka_Pulkovo_v1.0.docx |
| 6 | Development Readiness recommendation | AI_Tamagotchi_Development_Readiness_Pack_v0.1.docx, AI_Tamagotchi_Development_Readiness_Workbook_v0.1.xlsx |
| 7 | Preliminary technical artifacts | openapi_preliminary_v0.1.yaml, ai_processing_schema.json, erd.mmd / architecture.mmd / ux_flow.mmd where available |

**Never authoritative:** model assumptions, generic industry convention, historical `OPEN` state superseded by a later owner resolution, or a file selected only because its filename has a larger-looking version suffix.

## 2. Domain authority

- **Business logic / data semantics / scoring / roles / HP / streak / evolution / goals / ranking / privacy / audit:** Product Specification v1.0 unless an explicit rank 1–3 source overrides the relevant point.
- **Visual / interaction:** current v2 visual package and current Stage-20 handoff. Design Specification v1.0 fills only non-conflicting gaps.
- **Developer visual consumption:** use canonical Stage-20 filenames named by `HANDOFF_INDEX_v2.0.md`.
- **Development Readiness Pack:** advisory engineering/discovery material; its `Proposed` / `Requires approval` items are not silently promoted.
- **Preliminary OpenAPI/ERD/architecture:** inputs for later stages, never final contracts.

## 3. Current owner-approved overrides

1. AI-задача = completed AI-assisted work case; no future to-do lifecycle.
2. Mobile navigation = `Главная / История / Рейтинг / Профиль`.
3. Home CTA = `Добавить AI-задачу`.
4. Annual Score/rank is not persistent on Home.
5. Evolution XP is not persistent on Home.
6. Home shows compact Monthly Goals progress only.
7. Canonical Lyuboznayka = `03_MASCOT_LYUBOZNAYKA/01_References/MSC_Lyuboznayka_Canonical_UserApproved_v1.0.jpeg`.
8. Canonical Pulkovo environment = `04_PULKOVO_WORLD/01_Approved_References/REF_PULKOVO_Interior_Composition_UserApproved_v2.0.png`.
9. 3D planning/runtime baseline = HYBRID + Three.js + WebGL2-capable web/PWA + glTF 2.0/GLB.
10. Coordinates = 1 unit = 1 m, right-handed glTF, Y-up.
11. Legal/brand/license/provenance = `WAIVED_NON_BLOCKING` as workflow gate; this is not independent legal clearance.
12. Physical-device Stage-16 validation = `WAIVED_NON_BLOCKING`; no measured performance claim may be invented.

## 4. Current visual handoff consumption

Canonical Stage-20 developer files:
- `09_DEVELOPER_HANDOFF/Developer_Notes.md`
- `09_DEVELOPER_HANDOFF/Design_Tokens.json`
- `09_DEVELOPER_HANDOFF/Component_Matrix.xlsx`
- `09_DEVELOPER_HANDOFF/Screen_State_Matrix.xlsx`
- `09_DEVELOPER_HANDOFF/Asset_Manifest.xlsx`
- `09_DEVELOPER_HANDOFF/Motion_Specification.md`
- `09_DEVELOPER_HANDOFF/3D_Specification.md`
- `10_QA_REFERENCE/Visual_QA_Checklist.xlsx`
- `00_README/CHANGELOG.xlsx`

Direct production visual runtime files are consumed only from `08_PRODUCTION_EXPORTS/`.
The current visual handoff reports 56 physical runtime files (51 SVG + 5 WebP). Existing package GLBs are technical proxy/spike files, not final production GLBs.

## 5. Normalized conflict map

| Conflict | Earlier conflict | Current normalized rule | Decision |
|---|---|---|---|
| AI-task semantics | Completed AI-use case in Product; legacy visual text sometimes used task-manager semantics. | Completed AI-assisted work case; no future to-do lifecycle. | OD-001 |
| Mobile navigation | Product/Design had incompatible 4/5-tab candidates. | Главная / История / Рейтинг / Профиль. | OD-002 |
| Home CTA | Multiple older CTA variants. | Exact CTA: Добавить AI-задачу. | OD-003 |
| Home Score/rank | Product core-loop placed Score/rank on Home; Design removed score HUD. | Score/rank mechanics remain; persistent Home placement is removed. | OD-004 |
| Home Evolution XP | Product core-loop placed XP on Home; Design removed XP/levels from Home. | XP mechanic remains; persistent Home placement is removed. | OD-005 |
| Home Monthly Goals | Product could imply all goals on Home; Design wanted minimal Home. | Compact progress on Home; full Goals view elsewhere. | OD-006 |
| Offline | Product says online-only; visual audit allowed cached shell. | Mutations remain online-only; static/cached shell cannot mutate. | OD-007 |
| Sound | Product excludes sound; Design contains sound direction. | MVP has no sound dependency. | OD-008 |
| Pet interaction | Product allowed interaction; Design forbids game-button clutter. | No permanent game-button row; lightweight reactions cannot alter core rules. | OD-010 |
| Home HP | Product requires pet state; Design forbids status-bar clutter. | Mascot state + detail-on-demand; no persistent HP bar. | OD-011 |
| Lighting | Design defines multiple time states. | Day is baseline; other states are derivatives, non-blocking. | OD-012 |
| Canonical mascot | Historical stages recorded missing canonical reference. | Exact approved JPEG is canonical. | OD-013 |
| Pulkovo | Historical stages used generic/unapproved environment assumptions. | Approved interior composition is canonical. | OD-014 |
| Legal/provenance gating | Historical stages treated rights as blockers. | Workflow waived non-blocking; not independent legal clearance. | OD-015/032 |
| 3D runtime/coordinates | Earlier proposal/open state. | HYBRID + Three.js/WebGL2/glTF2/GLB; 1m, RH glTF, Y-up. | OD-019/020 |
| Physical-device testing | Earlier visual gates required real-device closure. | Waived non-blocking; do not fabricate measured results. | OD-024 |

## 6. Product mechanics that remain normative

No later owner source changes these mechanics:
- task score C1/C2/C3/C4/C5 = `1 / 5 / 15 / 40 / 100`;
- at most 3 clarifications, then trust employee and continue;
- no manual Complexity/Score override;
- HP/coma/vacation/streak baseline rules;
- Evolution XP accounting and current working thresholds;
- Monthly Goal selection/matching/reward baseline;
- employee/directorate ranking and historical directorate attribution;
- privacy/RBAC semantics;
- taxonomy/tools rules;
- audit/versioning and indefinite historical retention.

Where Product marks values as balance parameters, Stage 1 preserves them exactly as the current baseline. Stage 1 does not tune balance.

## 7. Open items are not automatically blockers

Latest final visual audit retains **19 OPEN** items. They are normalized as `DEFERRED_NONBLOCKING` because current safe implementation baselines exist. Six (OD-007..012) do not affect Full Production Freeze; thirteen affect later Full Production Freeze but do not block Stage 2.

## 8. External dependency boundary

Stage 1 does not invent:
- Personnel DB protocol/base URL/auth/unique employee key/sync contract;
- production SSO/auth details beyond current Product MVP rule;
- LLM/STT vendor endpoints/credentials/final model;
- final mascot/Pulkovo production GLBs;
- optional final KTX2 pipeline;
- final logo/font/release art;
- evidence-backed numeric device performance budgets.

## 9. Stable requirement IDs

Normalized requirement IDs are frozen in `PRODUCT_REQUIREMENTS_NORMALIZED.md` and `REQUIREMENTS_TRACEABILITY.csv`.
Stage 2 may assign release priority/scope, but must not renumber Stage-1 IDs.

## 10. Gate

- Business-critical conflicts unresolved: **0**
- Human decisions required before Stage 2: **0**
- Result: `PASS_WITH_NONBLOCKING_GAPS`

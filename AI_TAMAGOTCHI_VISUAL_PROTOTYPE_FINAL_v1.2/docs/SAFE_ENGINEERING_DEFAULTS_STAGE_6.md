# SAFE ENGINEERING DEFAULTS — PROTOTYPE STAGE 6

Date: 2026-09-01
Scope: History / Rating / Profile / Goals employee surfaces only.

These decisions are reversible prototype details and do not change Product/Game semantics or final API schemas.

## SED-06-01 — Deterministic synthetic employee dataset

All names, employee IDs, directorates, task texts, scores and analytics values are synthetic fixtures. No real personnel data is used.

## SED-06-02 — Final OpenAPI query parameters are used for filters

Prototype filter controls map only to existing final API query parameters:
- History: `search`, `complexity`;
- Employee rating: `search`, `directorate_id`;
- Directorate rating: `sort`;
- Company analytics: `period_from`, `period_to`.

No prototype-only filter fields are added to production DTOs.

## SED-06-03 — Deterministic analytics period presets

The UI offers current month / previous month / current year presets. In the deterministic prototype these resolve to fixed 2026 date ranges and are transmitted through the existing `period_from` / `period_to` API parameters. This is a demo convenience, not a new product rule.

## SED-06-04 — Task edit preserves server authority

Owner editing changes raw input through the existing `TaskEditRequest`, creates a new version and sends the current `expected_version_no`. Normalized Description, Complexity and Score are not directly editable or copied as authoritative client values.

## SED-06-05 — Soft-delete only

The prototype DELETE mutation removes an AI-case from ordinary current-history mock projections while retaining immutable version/audit semantics in the mock design. No hard-delete behavior is introduced.

## SED-06-06 — Achievement content remains explicitly non-final

The package does not freeze the final achievement/cosmetic release catalog. Earned-item fixtures use `DEMO_CONTENT_PLACEHOLDER_*` codes and neutral titles. Unearned achievements are never shown.

This avoids inventing production achievement names, conditions, art or rewards.

## SED-06-07 — Peer public profile is a privacy projection

Closed / standard / open fixtures expose only fields allowed by the final PublicProfile contract. Raw input, clarification log and links are never part of peer-facing fixtures.

## SED-06-08 — Dependency-free preview is QA-only

`docs/STAGE_6_EMPLOYEE_SECTIONS_PREVIEW.html` is a standalone clickable QA artifact for environments without npm dependencies. It is not represented as the React/Vite application and is not Playwright evidence.

# SAFE ENGINEERING DEFAULTS — PROTOTYPE STAGE 1

Date: 2026-09-01
Scope: repository + mock architecture only.

These decisions are technical, reversible, and do not change Product or visual semantics.

## SED-01 — Separate prototype repository

`prototype/` is a standalone React/Vite repository rather than a copy of the production monorepo.

Reason: PROMPT/TZ explicitly request a separate runnable prototype repository. The frontend technology families remain aligned with the Development Package.

Product impact: none.

## SED-02 — Local Vite mock middleware

The Stage-1 mock foundation uses a development-only Vite middleware endpoint under `__prototype`.

Reason: the prototype must not call real Personnel/LLM/STT/Object Storage systems, and the Stage-1 health probe is not a production API operation.

Guardrail: future business mocks must implement the shapes of `openapi_final_v1.yaml`; this diagnostic health endpoint is deliberately outside `/v1` so it cannot be confused with a final OpenAPI operation.

Product impact: none.

## SED-03 — Deterministic fixture clock/value

The mock health fixture has a fixed timestamp and fixed response body.

Reason: deterministic demos/tests are required; a real clock is unnecessary for Stage 1.

Product impact: none.

## SED-04 — Exact dependency pins

Stage-1 `package.json` pins exact versions within the frozen technology families instead of ranges.

Reason: Development Package requires exact versions to be resolved and pinned during repository bootstrap. Version pins are engineering/toolchain values, not Product requirements.

Product impact: none.

## SED-05 — Offline verification harness

`scripts/stage1-offline-server.mjs` and `scripts/stage1-offline-smoke.mjs` exist only to validate the repository/mock-health contract when the execution environment cannot install npm packages.

They are explicitly **not** the React/Vite application, not a production server, and not evidence that Vite/React tests passed.

Product impact: none.

## SED-06 — No Stage-2 styling

The Stage-1 infrastructure probe uses minimal diagnostic CSS only. It is not a design-system implementation and is not a visual interpretation of the final product.

Product impact: none.

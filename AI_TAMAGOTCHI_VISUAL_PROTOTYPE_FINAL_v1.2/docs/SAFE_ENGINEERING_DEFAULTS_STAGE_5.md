# SAFE ENGINEERING DEFAULTS — PROTOTYPE STAGE 5

Date: 2026-09-01
Scope: AI-case flow only.

These decisions are reversible prototype implementation details. They do not alter Product/Game semantics or final API schemas.

## SED-05-01 — Prototype scenario controls stay outside final DTOs

The deterministic mock receives development scenario selectors through `X-Prototype-*` headers:
- clarification target `0..3`;
- result Complexity `C1..C5`;
- controlled STT/processing/network scenario.

The headers are explicitly demo-only. `TaskCreateRequest`, `ProcessingState`, `TaskResult` and other `/v1` JSON bodies remain shaped like `openapi_final_v1.yaml`.

## SED-05-02 — Stable demo idempotency keys

A client-only flow store provides stable per-demo-run Idempotency-Key strings. Processing retry reuses the same task mutation key so the mock cannot demonstrate accidental duplicate creation.

Production idempotency persistence remains a backend concern.

## SED-05-03 — Ephemeral mock audio

No browser microphone bytes are persisted in the prototype. The voice screen creates transient in-memory demo bytes solely to exercise the `AudioUpload -> TranscriptionResponse` boundary, after which they are discarded.

This is a mock STT implementation, not a claim of real media capture/provider behavior.

## SED-05-04 — No invented HP field in TaskResult

The final `TaskResult` schema contains Score, Complexity, normalized description, Evolution XP, goal contributions and tools, but no HP delta. The prototype therefore does not append HP to the result response or compute it in UI.

HP remains backend-authoritative via the existing Home/Pet contract. This preserves the final API rather than inventing a convenience field.

## SED-05-05 — Deterministic synthetic AI-case fixture

The demo case describes a fictitious passenger-traffic analysis. It contains no real employee, account, phone or corporate task data. The deterministic C1-C5 result selector is a developer control; the UI never manually edits Score.

## SED-05-06 — Result detail handoff

The exact `Подробнее` action routes to the existing `/ai-cases/:taskId` semantic screen rather than inventing another result-only category/taxonomy payload. The full task/version detail surface belongs to Prototype Stage 6.

## SED-05-07 — Standalone QA preview

`docs/STAGE_5_AI_CASE_PREVIEW.html` is dependency-free, manually clickable and contains a built-in deterministic self-test for 0/1/2/3 clarification branches and the fixed score map.

It is a QA/demo artifact only and is not represented as the React/Vite application or as executed Playwright evidence.

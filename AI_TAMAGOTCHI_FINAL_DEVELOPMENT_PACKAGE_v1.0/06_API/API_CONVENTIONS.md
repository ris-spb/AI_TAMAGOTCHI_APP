# API CONVENTIONS

**Stage:** 6 — Production API Contract  
**Authority:** `openapi_final_v1.yaml`  
**OpenAPI:** 3.0.3

## Authority
`openapi_final_v1.yaml` supersedes `openapi_preliminary_v0.1.yaml`; preliminary schemas are lineage only.

## Transport and naming
- `/v1` production prefix; provider-neutral relative server origin.
- JSON fields use `snake_case`.
- UUID IDs; RFC3339 timestamps; ISO dates.
- Product business dates are server-side Saint Petersburg / `Europe/Moscow`.
- Core request/response objects reject unknown fields (`additionalProperties: false`).

## Authentication and authorization
`BearerSession` is a `SAFE_ENGINEERING_DEFAULT`: an opaque bearer/session token issued after current MVP personnel verification. JWT is not implied. Token lifecycle and real SSO hardening belong to Stage 9. Every protected operation declares `security`, `x-roles`, and `x-scope`; backend object authorization is mandatory.

## Async tasks
Create/edit/clarification may return `202 Accepted`. Accepted raw input is durable before AI processing. Poll `getTaskProcessingState`; final data comes from `getTaskResult`.

## Deterministic authority
Clients cannot submit numerical Score, HP, XP, Goal completion, leaderboard points or streak. LLM does not own numerical business results.

## Concurrency
Task edit/delete carries `expected_version_no`; stale callers receive `409 VERSION_CONFLICT`. This is separate from Idempotency-Key duplicate protection.

## Status semantics
200 synchronous success; 201 resource created; 202 asynchronous accepted; 204 success/no representation; 400 validation; 401 authentication; 403 role/object scope; 404 authorized not-found; 409 state/version/idempotency conflict; 422 domain-state ineligible; 429 rate limit; 500 internal; 503 dependency unavailable.

## Cross-contract extensions
Each operation includes DB refs, Screen IDs, requirement IDs, validation, retry, pagination/sort/filter and idempotency metadata. Stage 10 expands screen-state mapping. Stage 14 selects concrete telemetry/rate-limit thresholds.

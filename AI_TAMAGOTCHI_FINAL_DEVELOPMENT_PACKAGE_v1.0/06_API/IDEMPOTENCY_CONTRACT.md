# IDEMPOTENCY CONTRACT

**Persistence:** Stage-5 `api_idempotency_records`.

## Header
Duplicate-sensitive operations require:
`Idempotency-Key: <opaque 8..128 chars>`.

## Key scope
Conceptual key:
`authenticated scope + operationId + Idempotency-Key`.

Server stores a normalized request fingerprint.

## Same key, same request
Return/reference the original committed result. Never duplicate:
- task/version creation;
- STT request;
- clarification answer;
- goal selection;
- admin mutation;
- export request.

## Same key, different request
Return `409 IDEMPOTENCY_KEY_REUSED`.

## Version concurrency
Idempotency and optimistic version checks solve different problems.
Task edit/delete also checks `expected_version_no`.
Mismatch returns `409 VERSION_CONFLICT`.

## Expiry
No arbitrary duration is invented at Stage 6.
Operational cleanup is Stage 13/14/16 and must preserve safe retry/audit behavior.

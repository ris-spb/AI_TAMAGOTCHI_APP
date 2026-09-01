# ADR-005 — Use contract-first OpenAPI for REST API

**Status:** ACCEPTED  
**Stage:** 3 — Tech Stack Freeze

## Context
The master prompt requires a strict final `openapi_final_v1.yaml` and forbids treating the preliminary API as final. Frontend and backend must stay traceable to one external contract.

## Decision
Use REST with OpenAPI 3.x as the Stage-6 contract source. Generate frontend/client types using openapi-typescript and a thin openapi-fetch transport. Lint/parse OpenAPI in CI and run backend contract tests against the final document.

## Consequences
Avoids hand-maintained duplicate frontend DTOs and makes API changes auditable. Backend implementation can remain NestJS without making framework decorators the only API source of truth.

## Alternatives considered
GraphQL is not source-required and would introduce a second schema/runtime model. Code-first-only Nest Swagger was rejected as the authoritative contract because the Development Package explicitly requires a standalone final OpenAPI artifact.

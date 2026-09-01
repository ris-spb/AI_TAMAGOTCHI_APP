# ADR-003 — Use NestJS modular monolith with API and worker entrypoints

**Status:** ACCEPTED  
**Stage:** 3 — Tech Stack Freeze

## Context
The product has rich backend domain rules, RBAC, versioning, ledgers, AI orchestration, exports and scheduled day-close work. Master requirements explicitly prefer a modular monolith evaluation and warn against unnecessary distributed architecture.

## Decision
Use NestJS with Fastify adapter. Keep one server codebase with API and worker/scheduler bootstraps. Domain modules remain inside one deployable logical application; asynchronous execution is handled through jobs rather than service decomposition.

## Consequences
Clear module boundaries, dependency injection for provider interfaces and one transactional database remain available without microservice coordination cost. Worker scaling can be independent at process/container level while retaining one codebase.

## Alternatives considered
FastAPI/Python and raw Fastify were considered. FastAPI adds a second language; raw Fastify reduces framework overhead but gives the coding AI fewer structural guardrails for this domain-heavy application.

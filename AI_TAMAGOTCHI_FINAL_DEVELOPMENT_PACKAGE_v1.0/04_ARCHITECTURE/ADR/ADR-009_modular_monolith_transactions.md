# ADR-009 — Keep critical business consistency inside one PostgreSQL modular monolith

**Status:** ACCEPTED  
**Stage:** 4 — Solution Architecture Freeze

## Context
The product combines versioned task processing, deterministic scoring/game state, goals, audit and reversible edits/deletes. Partial cross-service commits would create product-invalid states. Stage 3 already selected NestJS modular monolith.

## Decision
Keep write-side business modules in one modular monolith and one PostgreSQL transactional boundary. Cross-domain application orchestration may call multiple module interfaces inside one transaction for critical finalization/reversal/admin invariants. No microservice split for MVP.

## Consequences
Critical invariants can be atomic without distributed transactions. Module ownership remains logical and testable. API and worker can scale separately as process roles while sharing the same codebase/domain.

## Alternatives considered
Microservices were rejected for MVP because they add distributed consistency/outbox choreography without a source-backed need. A single unstructured monolith was rejected because it loses module ownership and coding-AI traceability.

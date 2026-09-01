# ADR-004 — Use PostgreSQL + Drizzle + Redis/BullMQ

**Status:** ACCEPTED  
**Stage:** 3 — Tech Stack Freeze

## Context
The product requires immutable history, ledgers, versioning, analytics, idempotency and background work. Stage 5 requires executable SQL, not an ORM-only model.

## Decision
Use PostgreSQL as durable source of truth. Use Drizzle as typed TypeScript data-access/query mapping while keeping Stage-5 SQL schema/migrations explicit. Use Redis + BullMQ for queues/jobs/caching only; Redis is not authoritative business storage.

## Consequences
Relational constraints and transactions remain explicit. Typed query access supports the TypeScript stack. BullMQ supports AI processing, exports and scheduled work while Stage 4 can still define outbox/idempotency semantics.

## Alternatives considered
Prisma was considered but rejected as the default because this package explicitly requires SQL-first executable schema/migrations and audit/reporting may need transparent SQL. Microservice queues/event brokers are unnecessary for MVP.

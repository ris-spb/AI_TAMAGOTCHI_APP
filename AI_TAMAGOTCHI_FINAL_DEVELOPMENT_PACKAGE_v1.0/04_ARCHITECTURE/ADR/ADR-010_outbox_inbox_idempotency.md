# ADR-010 — Use transactional outbox + durable consumer idempotency for asynchronous effects

**Status:** ACCEPTED  
**Stage:** 4 — Solution Architecture Freeze

## Context
Accepted task data must survive downstream AI/queue failure, while BullMQ and external networks are at-least-once/failure-prone. Daily/monthly jobs and edits/deletes must not double-apply points or progress.

## Decision
Write outbox records in the same PostgreSQL transaction as committed domain changes. Use stable event IDs, BullMQ transport, and a persisted inbox/processed-message or equivalent consumer-idempotency record committed with side effects. Use separate API idempotency records for duplicate-sensitive commands.

## Consequences
Redis outage cannot lose DB-accepted work. Duplicate queue delivery is safe. Scheduled jobs converge to one business result. The architecture promises exactly-once business effects where implemented, not exactly-once transport.

## Alternatives considered
Direct DB-then-queue dual writes were rejected because they can lose work. Queue-only durability was rejected because Redis is not business source of truth. Distributed exactly-once messaging was rejected as unnecessary/unsafe to claim.

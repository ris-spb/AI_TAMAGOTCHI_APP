# ADR-013 — Isolate external providers and classify critical vs degradable failures

**Status:** ACCEPTED  
**Stage:** 4 — Solution Architecture Freeze

## Context
Personnel, LLM, STT, weather and object-storage contracts are incomplete or external. The master prompt requires adapters/mocks and forbids invented endpoints.

## Decision
All external systems are invoked through provider interfaces. Personnel verification and AI/STT may block their specific workflow safely; weather is non-critical and degrades to no ambient context; object-storage failure affects export only. Provider SDKs do not leak into domain modules.

## Consequences
Core product remains testable with mocks, vendor-neutral, and failure containment is explicit.

## Alternatives considered
Direct vendor calls from domain/application code were rejected because they create lock-in and make missing real contracts a hidden blocker.

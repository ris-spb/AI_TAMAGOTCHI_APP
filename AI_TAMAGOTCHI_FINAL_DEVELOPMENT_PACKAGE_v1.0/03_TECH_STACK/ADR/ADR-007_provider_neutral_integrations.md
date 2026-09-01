# ADR-007 — Use provider interfaces for external systems

**Status:** ACCEPTED  
**Stage:** 3 — Tech Stack Freeze

## Context
Personnel, LLM, STT, weather, object storage and future notification contracts are incomplete or vendor-unspecified. The master prompt forbids fabricated external APIs.

## Decision
Define provider interfaces in the backend. Build mock/local implementations where required and real adapter templates later. No vendor-specific SDK may leak into domain modules. Object storage uses an S3-compatible abstraction, not a selected production vendor.

## Consequences
Core development can proceed without real endpoints/credentials. Vendor changes remain isolated and testable. External dependencies remain visible rather than encoded as fake success.

## Alternatives considered
Direct vendor SDK calls in domain services were rejected because they create hidden lock-in and contradict the required adapter/mock strategy.

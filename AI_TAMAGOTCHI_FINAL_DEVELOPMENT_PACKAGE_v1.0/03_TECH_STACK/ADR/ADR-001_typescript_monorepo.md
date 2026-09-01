# ADR-001 — Use TypeScript end-to-end monorepo

**Status:** ACCEPTED  
**Stage:** 3 — Tech Stack Freeze

## Context
The MVP spans PWA UI, 3D runtime, backend domain logic, workers, provider adapters and extensive automated tests. The future coding AI benefits from one primary language and one dependency graph. No source mandates a corporate language.

## Decision
Use TypeScript strict mode across frontend/backend/worker/tooling in a pnpm-workspace monorepo. Use Turborepo only for task orchestration/caching; it does not define application architecture.

## Consequences
Shared compile-time types become practical, repository/tooling context is reduced, and package boundaries can be statically enforced. Runtime validation remains mandatory because TypeScript types disappear at runtime.

## Alternatives considered
React + FastAPI/Python was evaluated but rejected as the default because it creates a second language without a source-required local-ML need. Next.js full-stack was rejected because it couples web rendering and backend lifecycle too tightly for this queue/job-heavy modular monolith.

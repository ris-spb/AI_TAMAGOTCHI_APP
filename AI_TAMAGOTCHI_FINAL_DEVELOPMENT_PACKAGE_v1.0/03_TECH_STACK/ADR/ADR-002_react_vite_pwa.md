# ADR-002 — Use React/Vite for mobile-first PWA

**Status:** ACCEPTED  
**Stage:** 3 — Tech Stack Freeze

## Context
The product is mobile-first PWA with dedicated desktop layouts and a client-heavy Three.js experience. Data mutation is online-only; service-worker behavior must not create offline business semantics.

## Decision
Use React with Vite, React Router, TanStack Query, Zustand for limited client-only state, React Hook Form + Zod, CSS Modules and token-driven CSS variables. PWA service worker caches install/static assets only; no offline mutation replay.

## Consequences
Keeps the UI client-centric, compatible with Three.js and independent from backend deployment. Prevents accidental server-rendering coupling and preserves the approved static fallback path.

## Alternatives considered
Next.js was rejected as the baseline because server-rendering/serverless lifecycle is not required and adds coupling. A native mobile framework is out of Product MVP scope.

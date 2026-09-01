# CODING STANDARDS

## 1. TypeScript

- strict TypeScript across application packages;
- avoid `any`; isolate unavoidable vendor SDK types inside adapters and narrow them immediately;
- prefer explicit domain types and discriminated unions;
- exhaustive handling for state/enums;
- no silent `as unknown as` contract bypasses;
- generated OpenAPI DTO/client types are authoritative at frontend API boundary.

## 2. Repository / module boundaries

- monorepo boundaries follow Stage-3/4 architecture;
- domain/application modules do not import vendor SDKs directly;
- provider adapters do not write domain DB tables directly;
- frontend never imports backend persistence/domain internals;
- no cross-module DB mutations through ad-hoc SQL.

## 3. Backend

- NestJS/Fastify modular-monolith semantics;
- controllers thin;
- application services own workflows;
- domain/game calculations deterministic;
- repositories own persistence access;
- use transactions for authoritative multi-write workflows;
- use outbox/idempotency patterns already frozen;
- return typed errors consistent with OpenAPI.

## 4. Database

- PostgreSQL is truth;
- application-generated UUIDs;
- `TIMESTAMPTZ` for instants, server `Europe/Moscow` business date where required;
- migrations explicit and reviewed;
- no auto-migration race on every API startup;
- history/audit/ledger rows are not destructively rewritten;
- use constraints for invariants that belong in DB;
- no floating-point arithmetic for Score/HP/XP/counts.

## 5. Game/business logic

- implement pure/testable functions where possible;
- no LLM-generated numeric Score/HP/XP/Goals/ranking;
- no frontend authoritative recalculation;
- rules read versioned approved config;
- historical recalculation is deterministic/idempotent;
- do not alter game balance in refactors.

## 6. AI/providers

- validate all provider output with current schema;
- bounded retries only according to provider policy;
- max 3 clarifications enforced by backend state machine;
- no task URL crawling;
- no provider credential in source/logs;
- mock provider required for deterministic CI;
- record safe provider/version metadata.

## 7. Authentication/security

- opaque bearer session only for current MVP;
- raw token never stored/logged;
- authorization repeated server-side for every protected action;
- object scope checked, not just role;
- default deny;
- secrets only by runtime injection/reference;
- structured logs follow Stage-14 redaction matrix.

## 8. Frontend

- React 19/Vite/React Router;
- TanStack Query = server state;
- Zustand only for small client-only UI state;
- React Hook Form + Zod forms;
- CSS Modules + semantic CSS variables;
- no divergent handwritten API DTO layer;
- UI formats backend business values; it does not recalculate them;
- all data-backed views have loading/empty/error/forbidden states;
- Russian MVP strings externalized;
- exact Home CTA/nav values preserved.

## 9. Accessibility

- semantic HTML first;
- keyboard/focus support;
- ≥44×44 interactive targets;
- reduced motion;
- critical state not color-only;
- chart text/table equivalent;
- 3D never required to operate the application.

## 10. 3D / assets

- only approved current runtime assets;
- never promote `SPK_*` technical proxy to production;
- never fabricate GLB/KTX2;
- scene lifecycle disposes resources;
- context-loss/failure -> approved fallback;
- scene has no business-authority calculation.

## 11. Testing

- every coding item references its Stage-17/Stage-15 IDs in test title or metadata;
- deterministic clock/fixtures;
- no real employee data in committed fixtures;
- core CI no real provider/internet dependency;
- test negative authorization/error/idempotency paths, not only happy path;
- never mark unexecuted tests PASS.

## 12. Code review

Reject changes that:
- expand MVP scope without a source decision;
- bypass OpenAPI/schema;
- weaken RBAC/privacy;
- alter game constants;
- add provider-specific coupling to domain;
- add secrets or sensitive logs;
- add hidden offline mutation behavior;
- use final-asset claims without evidence.

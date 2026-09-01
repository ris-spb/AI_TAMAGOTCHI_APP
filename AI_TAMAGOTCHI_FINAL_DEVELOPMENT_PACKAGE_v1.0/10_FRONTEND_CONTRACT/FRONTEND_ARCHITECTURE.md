# FRONTEND ARCHITECTURE

**Stage:** 10 — Frontend Development Contract  
**Status:** `IMPLEMENTATION_CONTRACT_FROZEN_WITH_NONBLOCKING_VISUAL_TUNING_GAPS`  
**Frontend baseline:** React 19 + Vite SPA/PWA + TypeScript strict.

## 1. Authority boundary

Frontend is a presentation/orchestration client.

It must **not** calculate or authoritatively decide:
- Complexity/Score;
- HP;
- Evolution XP;
- Streak;
- Monthly Goal matching/rewards;
- leaderboard rank;
- employee/directorate aggregates that the API already owns;
- authorization from client-supplied role data.

The backend/API is authoritative for business/game data.

## 2. Source hierarchy for frontend

1. latest owner decisions / `SOURCE_OF_TRUTH`;
2. current canonical visual developer handoff;
3. final Stage-6 OpenAPI;
4. Stage-9 authorization contract;
5. Stage-3/4 technical architecture.

Historical state/component rows with old `OD-* OPEN` labels do not re-open later resolved owner decisions.

## 3. Module layout contract

Recommended repository structure:

```text
apps/web/src/
  app/
    bootstrap/
    router/
    providers/
    error-boundary/
  screens/
  features/
    auth/
    onboarding/
    ai-case/
    goals/
    history/
    rating/
    profile/
    notifications/
    director/
    executive/
    admin/
    exports/
  entities/
    employee/
    task/
    goal/
    rating/
    notification/
  shared/
    api/
      generated/
      client/
      query-keys/
      errors/
    auth/
    ui/
    forms/
    i18n/
    accessibility/
    pwa/
    visual/
    utils/
  scene/
    SceneHostBoundary.tsx
```

This is a `SAFE_ENGINEERING_DEFAULT` layout. Semantic screen IDs, API contracts and authorization rules are the stable contract; directory names can change only without changing those contracts.

## 4. Application provider order

```text
Browser
→ AppBootstrap
→ FatalBootstrapBoundary
→ LocalizationProvider
→ QueryClientProvider
→ SessionContext / session transport
→ RouterProvider
→ RouteGate
→ Screen
→ ScreenStateBoundary
→ visual components / feature components
→ optional SceneHostBoundary
```

3D runtime is lazy and isolated. `SceneHostBoundary` cannot own routes, API business state or game calculations.

## 5. State ownership

### Server state — TanStack Query
Use for:
- `/v1/me`;
- Home;
- tasks/history;
- processing/result;
- goals;
- ratings/analytics;
- notifications;
- management/admin data;
- exports.

Do not duplicate these as authoritative Zustand state.

### Form state — React Hook Form + Zod
Use for:
- login;
- AI-case add/edit;
- transcript;
- clarification answer;
- Goal setup;
- privacy;
- vacation;
- Admin CRUD;
- export request.

### Small client-only UI state — Zustand
Allowed examples:
- currently open non-route modal/sheet;
- transient shell UI;
- local visual preference such as reduced-motion bridge when derived from browser preference;
- ephemeral draft metadata not yet persisted;
- 3D technical readiness/fallback flag.

Forbidden in client store:
- authoritative Score/HP/XP;
- rank;
- goal reward calculation;
- role grants;
- task result calculation.

### URL state
Use search parameters for visible list/search/filter/sort state when it improves navigation/history.
Opaque API cursors do not need to become user-editable URL parameters.

## 6. View-model boundary

API DTOs may be mapped to presentation view-models to:
- hide fields intentionally not displayed on a screen;
- format labels/date values;
- apply privacy-projected responses;
- convert technical enum names into localized labels.

View-model mapping must not derive new business values.

### Home-specific invariant
Even if a reusable backend DTO contains Evolution XP, `SCR_HOME` must not render Evolution XP persistently.

`SCR_HOME` also must not render:
- persistent Annual Score/rank;
- persistent numeric HP bar;
- permanent game-action row.

Home renders:
- mascot semantic state;
- streak;
- AI-case count/today context;
- compact Monthly Goal progress;
- real notification attention;
- exact CTA `Добавить AI-задачу`;
- current approved navigation.

## 7. Route composition

- semantic screen IDs are attached to route modules;
- frontend route guards are UX/navigation controls, **not security controls**;
- backend RBAC/object authorization remains mandatory;
- onboarding/Goal setup are data gates, not roles;
- route URLs are Stage-10 `SAFE_ENGINEERING_DEFAULT` and can be changed later without changing screen semantics.

## 8. Error boundaries

Three levels:
1. bootstrap fatal boundary — application cannot initialize;
2. route/screen boundary — page rendering failure;
3. feature/data boundary — API loading/error/empty states.

A 3D failure is **never** a route-level fatal error.

## 9. Lazy loading

Route-level lazy loading is recommended for:
- management dashboards;
- Admin;
- analytics;
- achievements;
- 3D runtime.

Employee core shell and Home functional UI must load independently of 3D.

## 10. Styling contract

- CSS Modules for component scoping;
- CSS Custom Properties generated/consumed from canonical semantic Design Tokens;
- no palette-only ad hoc variables;
- no per-screen duplicate magic colors/radii;
- missing/final-unfrozen token values are not silently replaced with a claimed final design value.

## 11. Generated API types

`openapi_final_v1.yaml` is the only final HTTP schema source.

Generate:
- TypeScript types;
- typed operations;
- thin API client.

No handwritten duplicate DTO hierarchy when it can drift from OpenAPI.

## 12. Definition of frontend contract compliance

A screen is implementation-ready when:
- route/role gate is known;
- canonical states are referenced;
- loading/error/empty behavior is explicit;
- component boundary is known;
- canonical tokens/assets are referenced;
- API operations are known;
- test contract ID exists;
- no business calculation moved into frontend.

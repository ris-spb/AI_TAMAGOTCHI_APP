
## Home visual update v2.2

The owner-approved Home visual is a layered static composition: **one approved Pulkovo background + six separate owner-approved mascot state files**. The Demo Control swaps only the mascot for `happy / normal / bored / tired / very_weak / coma`; the background remains unchanged. All six mascot states now use the approved generated source bytes; the earlier temporary `very_weak` substitution is retired. See `docs/HOME_VISUAL_LAYERED_UPDATE_v2.2.md` and `docs/HOME_VISUAL_ASSET_REGISTER_v2.2.json`.

# AI-Тамагочи — Working Visual Prototype

Current implementation stage: **PROTOTYPE STAGE 10 — Demo delivery**.

## One-click visual demo

For ordinary visual evaluation, npm libraries are **not required**.

- Windows: double-click `START_AI_TAMAGOTCHI.bat`
- macOS: open `START_AI_TAMAGOTCHI.command`
- Linux: run `./START_AI_TAMAGOTCHI.sh`
- Universal one-click: open `START_AI_TAMAGOTCHI.html`
- Fallback: open `delivery/index.html`

Synthetic demo entry: `DEMO-001` / `+7 900 000-00-01`.

The one-click surface is a dependency-free delivery fallback built from the completed prototype QA/demo surfaces. The full React/Vite/TypeScript source repository remains the authoritative implementation source. Real Personnel/LLM/STT/Object Storage integrations are never called.

See `docs/STAGE_10_DEMO_INSTRUCTIONS.md` and `docs/PROTOTYPE_VS_FINAL.md`.


This repository is a demonstration prototype. It is not a production backend and does not call real Personnel, LLM, STT or Object Storage systems.

## Toolchain contract

- Node.js `24.19.0` (package Development Package baseline: Node 24 LTS)
- pnpm `10.15.1`
- React 19 family + Vite
- React Router
- TanStack Query
- Zustand for client-only demo/UI state only
- React Hook Form + Zod
- CSS Modules / CSS Custom Properties
- Vitest + Testing Library
- Playwright

Exact package versions are pinned in `package.json`. Major upgrades require explicit engineering review; no floating `^`/`~` ranges are used.

## Normal local setup

```bash
corepack enable
pnpm install
pnpm dev
```

Open `http://127.0.0.1:4173`.

## Validation

```bash
pnpm validate
pnpm test:e2e
```

## Mock architecture

Stage 1 uses a **deterministic Vite middleware mock layer**. It is deliberately separate from final `/v1` business operations so a prototype-only health endpoint cannot be confused with the final OpenAPI.

Prototype-only endpoint:

```text
GET /__prototype/mock-health
```

Supported diagnostic query parameters:

```text
?latency=80
?scenario=success|error|forbidden|empty
```

Business endpoints implemented in later stages must use the final OpenAPI request/response shapes. Business/game values must come from mock-backend fixtures, never from UI arithmetic.

## Demo state foundation

`src/demo-controls/store.ts` contains client-only demo switches. Stage 4 adds a visible **DEV-ONLY Demo Control Panel** for role, Home data state, HP/mascot state, goals, streak, 3D requested mode, reduced motion and viewport presets. These controls are explicitly non-production and never authoritative business state.

## Current environment limitation

The execution container used to build this stage has Node 22 and no DNS access to the npm registry. Therefore dependencies cannot be installed here and the real React/Vite toolchain cannot be executed inside this container yet. A dependency-free offline smoke harness is included only to verify repository structure and deterministic mock-health behavior; it is explicitly **not** a substitute for the React/Vite app.

Run the environment-independent verification with:

```bash
node scripts/stage1-offline-smoke.mjs
```

The full Stage-1 gate must still run `pnpm install`, formatter, ESLint, TypeScript, Vitest and the Vite app under the pinned Node 24 runtime when registry access is available.

## Stage 2 — Design System

- React component gallery route (development mode, after dependencies are installed): `http://127.0.0.1:4173/__prototype/design-system`.
- Dependency-free offline reference/QA artifact: `docs/STAGE_2_COMPONENT_GALLERY.html`.
- The standalone HTML is a validation artifact only; the React/CSS Module implementation under `src/design-system/` is the prototype source.
- Approved production SVG icons are not recreated when their binary bytes are unavailable.
- In this execution environment, package-manager validation is recorded as `NOT_EXECUTED_ENVIRONMENT`, never as PASS.


## Stage 3 — App shell + navigation

- Product route contract: **36 active semantic screens**.
- Exact mobile primary navigation: `Главная / История / Рейтинг / Профиль`.
- Home CTA is not a navigation tab: `Добавить AI-задачу` → `/ai-cases/new`.
- Responsive shell includes Employee mobile bottom navigation and desktop navigation containers.
- Role-aware UX guards cover Employee / Director / Executive / Admin; production authorization must still come from server-backed session/RBAC.
- Bootstrap, screen/route and data-state boundaries are separated.
- Every current product route has at least a Stage-3 structural skeleton.
- Dependency-free shell QA preview: `docs/STAGE_3_SHELL_PREVIEW.html`.
- Offline checks: `node scripts/stage3-static-audit.mjs` and `node scripts/stage3-route-smoke.mjs`.


## Stage 4 — Home + mascot/fallback

- `/` now renders the first content-complete product surface: Home.
- Exact CTA: `Добавить AI-задачу`.
- Home permanently omits Annual Score/rank, Evolution XP and numeric HP. Exact HP is available only in the on-demand pet-state dialog.
- Compact Monthly Goals, Streak/today context and real unread-notification attention are bound to an OpenAPI-shaped deterministic `GET /v1/home` mock.
- Home supports happy / normal / bored / tired / very_weak / coma plus loading / empty / error / forbidden demo states.
- 3D is isolated from functional UI. `on` is explicitly `DEMO_NONPRODUCTION` because final GLB is external; `off/error` use the approved fallback contract.
- Only exact approved production-export filenames are referenced. No proxy mascot/Pulkovo raster or fake GLB is created.
- Stage 8 imported the exact audited `08_PRODUCTION_EXPORTS/` runtime binaries from the additionally attached Visual ZIP used strictly as a binary/reference source: 51 SVG + 5 WebP. No Golden Screen or proxy GLB is runtime-imported.
- Dependency-free structural preview: `docs/STAGE_4_HOME_PREVIEW.html`.
- Offline checks: `node scripts/stage4-static-audit.mjs` and `node scripts/stage4-html-audit.mjs`.

## Stage 5 — AI-case flow

- Employee critical flow is implemented on the contract routes:
  - `/ai-cases/new` — completed-work text entry + optional URL strings;
  - `/ai-cases/new/voice` — controlled voice-recording UI + mock STT;
  - `/ai-cases/new/transcript` — editable transcript preview;
  - `/ai-cases/:taskId/processing` — async processing/retry state;
  - `/ai-cases/:taskId/clarify` — one clarification at a time, hard maximum 3;
  - `/ai-cases/:taskId/result` — server-shaped C1-C5/Score/normalized description/XP/goal contribution result.
- Mock business endpoints follow the final OpenAPI shapes. Prototype-only scenario control is passed through `X-Prototype-*` headers and is never a production DTO field.
- Task mutations use a stable demo `Idempotency-Key`; retry reuses the same key.
- Links are stored as strings only and are never fetched by the mock server.
- Voice uses transient in-memory demo bytes; source audio is not persisted.
- `TaskResult` is not extended with an invented HP field. HP remains server-authoritative through the existing Home/Pet contract because the final Result DTO does not expose HP delta.
- DEV-ONLY Demo Control Panel can switch clarification count `0/1/2/3`, result `C1..C5`, and controlled AI/STT/network scenarios.
- Dependency-free clickable QA preview: `docs/STAGE_5_AI_CASE_PREVIEW.html`.
- Offline checks:
  - `node scripts/stage5-static-audit.mjs`
  - `node scripts/stage5-flow-smoke.mjs`
  - `node scripts/stage5-html-audit.mjs`
  - `node scripts/stage5-syntax-audit.mjs`

Playwright source exists at `tests/e2e/stage5-critical-flow.spec.ts`; execution remains `NOT_EXECUTED_ENVIRONMENT` until the pinned npm dependencies and browser tooling are available.

## Stage 6 — History / Rating / Profile / Goals

- `/history` and `/history/events` are content-complete prototype surfaces with search/filter, empty/error/forbidden states, task detail, immutable version history, owner edit and soft-delete semantics.
- `/goals` renders the active three-goal cycle plus goal history. One goal is system-assigned in the deterministic fixture; over-fulfilment is visually capped and vacation does not prorate thresholds.
- `/rating`, `/rating/directorates`, `/rating/analytics` and `/rating/directorates/:directorateId` are contentful and use final OpenAPI query semantics for employee search/directorate filter, directorate sort, and analytics period filters.
- `/profiles/:employeeId` demonstrates closed / standard / open peer privacy projections without exposing raw input, clarifications or links.
- `/profile`, `/profile/privacy`, `/profile/vacation`, `/profile/achievements`, `/profile/scoring`, and `/notifications` are contentful deterministic mock surfaces.
- Achievement titles are explicit `DEMO_CONTENT_PLACEHOLDER_*` fixtures because the final achievement catalog is not frozen in the package; unearned achievements are not shown.
- All Stage-6 business data comes from the mock API layer using final OpenAPI-shaped DTOs. UI does not override Complexity/Score or mutate historical versions.
- Dependency-free clickable QA preview: `docs/STAGE_6_EMPLOYEE_SECTIONS_PREVIEW.html`.
- Offline checks:
  - `node scripts/stage6-static-audit.mjs`
  - `node scripts/stage6-fixture-audit.mjs`
  - `node scripts/stage6-html-audit.mjs`
  - `tsc -p tsconfig.offline-core.json --pretty false`

Playwright and Vitest sources exist for Stage 6. Execution remains `NOT_EXECUTED_ENVIRONMENT` until pinned npm dependencies can be installed.


## Stage 7 — Director / Executive / Admin

- `/director` is content-complete for the prototype and is constrained to the Director's own directorate. Employee drill-down uses the privileged Director endpoint; technical scoring trace is not exposed.
- `/executive` is content-complete for company-wide analytics and drill-down. Executive has no Admin settings routes.
- `/admin` is a shell-only landing screen, matching the frontend contract. Content screens are `/admin/users`, `/admin/org`, `/admin/calendar`, `/admin/taxonomy`, `/admin/tools`, `/admin/audit` and `/exports`.
- Admin mock mutations cover employee role/status/profile-hidden update, directorate create/update, calendar updates, taxonomy version/category/subcategory lifecycle, AI Tools create/update/deactivate, and export lifecycle.
- `GET /v1/admin/tasks/{taskId}/scoring-trace` is Admin-only and read-only. There is no UI or AdminEmployeePatch field for manual Complexity/Score override.
- Management export is role-derived: Director is restricted to `directorate`; Executive/Admin may use company scope.
- The final OpenAPI has no `POST /v1/admin/employees`, so the prototype does **not** invent a manual employee-creation endpoint. User editing remains supported through the final `PATCH /v1/admin/employees/{employeeId}` contract.
- The DEV-ONLY Demo Control Panel role switch exposes Employee / Director / Executive / Admin and controlled loading/empty/error/forbidden states.
- Dependency-free clickable QA preview: `docs/STAGE_7_MANAGEMENT_PREVIEW.html`.
- Offline checks:
  - `node scripts/stage7-static-audit.mjs`
  - `node scripts/stage7-html-audit.mjs`
  - `python scripts/stage7-package-crosscheck.py`
  - `tsc -p tsconfig.offline-core.json --pretty false`

Vitest and Playwright Stage-7 test sources are included. Execution remains `NOT_EXECUTED_ENVIRONMENT` until the pinned npm dependencies/browser tooling can be installed.


## Stage 8 — Motion / 3D / ambient polish

- Stage-20 motion baselines are wired through existing semantic tokens: navigation 200 ms, fast navigation 180 ms, button press 140 ms, AI-case completion 360 ms, mascot reaction 600/700/900 ms, major achievement 1600 ms, modal enter/exit 240/200 ms.
- Navigation/content transitions use opacity-first functional motion; AI-case Result uses the 360 ms completion baseline. Modal/health-detail enter uses the 240 ms baseline.
- Reduced Motion removes spatial/bounce behavior and preserves only restrained opacity/tonal feedback; the DEV-only reduced-motion switch applies the same policy for manual QA.
- `src/three/runtimeContract.ts` implements the Stage-11 lifecycle/tier vocabulary. Because verified final GLB/KTX2 binaries are absent, `FINAL_PRODUCTION_3D_AVAILABLE` remains false and realtime request degrades to Tier F approved fallback rather than pretending the scene is live.
- Home exposes scene lifecycle/tier diagnostics only in development. Core CTA, goals, notifications and navigation are ordinary DOM and never depend on scene readiness.
- Current production visual runtime bytes are now physically included under `public/production-assets/08_PRODUCTION_EXPORTS/`: 51 SVG + 5 WebP. GLB=0, KTX2=0.
- The physical Day fallback was visually audited and is a composite that already contains the healthy mascot. Stage 8 therefore does not overlay the standalone Happy raster on top of it; coma/weak states never reuse the healthy composite.
- Ambient polish is deliberately restrained: a static daylight overlay using existing semantic colors plus one synthetic server-shaped ambient message. There is no continuous invented character animation and no sound dependency.
- Dependency-free Stage-8 preview: `docs/STAGE_8_MOTION_3D_PREVIEW.html`.
- Offline checks:
  - `node scripts/stage8-static-audit.mjs`
  - `python scripts/stage8-asset-audit.py`
  - `node scripts/stage8-fallback-semantic-audit.mjs`
  - `python scripts/stage8-package-crosscheck.py`
  - `tsc -p tsconfig.offline-core.json --pretty false`

Vitest/Playwright Stage-8 test sources are included. Their execution remains `NOT_EXECUTED_ENVIRONMENT` until pinned npm dependencies/browser tooling are available.


## Stage 9 — Visual QA / responsive / accessibility

- QA viewport matrix: `360`, `390×844`, `430`, and desktop around `1280×900`.
- All **36 active screens** now have content implementations; Stage 9 repaired `SCR_AUTH_LOGIN`, `SCR_ONBOARDING`, and `SCR_GOAL_SETUP`, which had remained Stage-3 skeletons.
- Login follows `POST /v1/auth/verify`; onboarding follows `/v1/me/onboarding`; Monthly Goal Setup follows `/v1/goals/setup` with five options, exactly two employee selections, and a mock-server-assigned third goal.
- Accessibility remediation includes >=44×44 targets, visible focus, keyboard skip link, safe-area handling, modal focus trap/Escape/focus restoration, live regions for result/export state, and non-color-only status feedback.
- Responsive source contracts pass for 360 / 390×844 / 430 / 1280×900. Management tables use contained horizontal scrolling rather than root clipping.
- Production visual runtime remains **56 audited assets (51 SVG + 5 WebP)** with no proxy GLB/KTX2.
- The full Visual Package is now physically available for QA. **17/17 current Golden v2 references** were verified against their index by filename, byte size, SHA-256 and image dimensions. Golden files remain reference-only, never runtime assets.
- System Chromium + Python Playwright successfully renders the dependency-free Stage-9 QA fixture. Browser checks confirm measured 360/390/430 frames, >=52px CTA, >=44px navigation targets, no 1440px overflow and reduced-motion behavior.
- Actual React/Vite Playwright execution and Golden pixel diff remain `NOT_EXECUTED_REACT_RUNTIME_UNAVAILABLE` because the pinned npm dependencies cannot be installed in this execution container. They are not represented as PASS.
- Dependency-free QA artifact: `docs/STAGE_9_QA_PREVIEW.html`.
- Browser screenshots/audit: `docs/stage9_browser/`.
- Offline checks: `stage9-static-audit.mjs`, `stage9-responsive-audit.mjs`, `stage9-entry-flow-smoke.mjs`, `stage9-contrast-audit.py`, `stage9-package-crosscheck.py`, `stage9-browser-preview-audit.py`.

PROTOTYPE STAGE 4 — HOME + MASCOT/FALLBACK

STATUS:
PASS_WITH_NONBLOCKING_GAPS

CREATED:
- src/assets/productionAssets.ts
- src/fixtures/home.ts
- src/features/home/ApprovedAssetImage.tsx + CSS Module
- src/features/home/SceneHostBoundary.tsx + CSS Module
- src/features/home/HomeScreen.tsx + CSS Module
- src/demo-controls/DemoControlPanel.tsx + CSS Module
- public/production-assets/README.md
- tests/unit/stage4-home.test.tsx
- tests/e2e/stage4-home.spec.ts
- scripts/stage4-static-audit.mjs
- scripts/stage4-html-audit.mjs
- docs/STAGE_4_HOME_PREVIEW.html
- docs/STAGE_4_ASSET_BINDING.md
- docs/SAFE_ENGINEERING_DEFAULTS_STAGE_4.md
- docs/STAGE_4_VALIDATION.log

UPDATED:
- mock-server/viteMockApiPlugin.ts — deterministic OpenAPI-shaped GET /v1/home mock
- src/mock-api/contracts.ts — Home/Pet/Goal/Error contract subset
- src/mock-api/schema.ts — Zod validation for Home and ErrorResponse
- src/mock-api/client.ts — Home transport and typed prototype errors
- src/demo-controls/store.ts — Stage-4 dev switches including reduced motion and viewport presets
- src/app/App.tsx — dev-only Demo Control Panel host
- src/app/shell/AppShell.tsx + CSS — Home shell, mobile viewport simulation, reduced-motion simulation
- src/app/shell/ScreenStateBoundary.tsx — Home owns its own server-data states
- src/app/shell/MobileBottomNavigation.tsx + CSS — approved runtime icon paths with no proxy fallback
- src/routes/router.tsx — SCR_HOME now renders HomeScreen
- tests/e2e/stage1-smoke.spec.ts — infrastructure smoke moved to its dev diagnostic route
- tsconfig.offline-core.json
- package.json
- README.md

PACKAGE CONTRACTS USED:
- PROMPT_01_WORKING_VISUAL_PROTOTYPE.md
- TZ_01_WORKING_VISUAL_PROTOTYPE.md
- SOURCE_OF_TRUTH.md / current owner Home override
- 10_FRONTEND_CONTRACT route/state/Home contracts
- openapi_final_v1.yaml: GET /v1/home, HomeResponse, PetState, GoalSummary, ErrorResponse
- 11_3D_RUNTIME/FALLBACK_MAPPING.md
- 11_3D_RUNTIME/3D_Specification.md
- current Stage-20 production asset manifest/index
- current Design Tokens / component/navigation baseline

VALIDATION:
- formatter — N_A / NOT_EXECUTED_ENVIRONMENT
- lint — N_A / NOT_EXECUTED_ENVIRONMENT
- typecheck — PASS for dependency-free strict Home contracts/fixtures; full React typecheck N_A / NOT_EXECUTED_ENVIRONMENT
- unit/component — test source CREATED; N_A / NOT_EXECUTED_ENVIRONMENT
- E2E/visual — static/HTML contract audits PASS; Playwright/browser screenshot N_A / NOT_EXECUTED_ENVIRONMENT
- Stage 1 regression smoke — PASS
- Stage 2 static regression — PASS
- Stage 2 TS/TSX syntax audit — PASS (45 files)
- Stage 3 route/shell regression — PASS
- Stage 4 static contract audit — PASS
- Stage 4 standalone Home HTML audit — PASS
- Stage 4 Home fixture runtime for happy/normal/bored/tired/very_weak/coma — PASS
- empty Home fixture runtime — PASS
- approved fallback-path audit — PASS
- forbidden persistent Home metrics audit — PASS
- WebGL-independent functional UI static audit — PASS
- Demo Control Panel contract audit — PASS

VISUAL DIFFERENCES FROM FINAL:
- Exact approved SVG/WebP bytes are manifest-confirmed but not mounted into the execution filesystem. Current execution copy therefore shows a truthful visual-asset-unavailable surface instead of the approved art until exact binaries are copied to the documented mount point.
- Final mascot/world GLB and KTX2 are external production dependencies; no live final 3D is claimed.
- Exact pixel/screenshot comparison against current Golden Screens cannot be executed in this environment. Headless Chromium timed out because of container/DBus constraints.
- No proxy mascot, proxy Pulkovo scene, old v1 mascot fallback or fake final GLB was created.

DEMO-ONLY IMPLEMENTATION:
- DEV-ONLY Demo Control Panel.
- Synthetic Home values and goal copy.
- Controlled /v1/home success/loading/empty/error/forbidden selection.
- requested 3D mode switch; `on` is explicitly DEMO_NONPRODUCTION while final GLB remains external.
- viewport emulation 390x844 / 430 mobile / desktop and reduced-motion simulation.
- docs/STAGE_4_HOME_PREVIEW.html is a QA preview, not the React production surface.

OPEN QUESTIONS:
- none

NONBLOCKING EXTERNAL/ENVIRONMENT GAPS:
- exact approved visual binary bytes unavailable in current execution mount
- npm registry unavailable / node_modules absent / pnpm unavailable
- execution Node is 22 while frozen runtime is Node 24
- Playwright/Chromium visual run unavailable in this container
- final production GLB/KTX2 remain external by package design

GATE:
PASS

Gate rationale: Home product/interaction contract, state-safe fallback routing, deterministic Home mock, exact CTA/navigation, forbidden-metric absence and WebGL independence are implemented and offline-validated. Exact asset rendering/pixel comparison remains a documented nonblocking environment/external-asset gap and is not represented as completed visual QA.

NEXT STAGE:
5 — AI-case flow

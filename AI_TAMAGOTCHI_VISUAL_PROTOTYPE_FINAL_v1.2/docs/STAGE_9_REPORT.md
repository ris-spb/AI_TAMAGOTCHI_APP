# PROTOTYPE STAGE 9 — VISUAL QA / RESPONSIVE / ACCESSIBILITY

STATUS: `PASS_WITH_NONBLOCKING_GAPS`

GATE: `PASS`

NEXT STAGE: `10 — Demo delivery`

## Stage objective

Stage 9 validates and remediates the runnable prototype against the current responsive, accessibility, screen-state and visual-reference contracts without changing product/business semantics.

## CREATED

- content-complete `SCR_AUTH_LOGIN`;
- content-complete five-step `SCR_ONBOARDING`;
- content-complete `SCR_GOAL_SETUP` with five server-shaped options, exactly two user selections and one server-assigned third goal;
- Stage-9 accessibility/unit/E2E test source;
- dependency-free Stage-9 QA viewport artifact;
- real Chromium browser-rendered QA screenshots for 360 / 390×844 / 430 and management reference;
- current v2 Golden integrity/reference audit;
- Home Golden-reference comparison artifact;
- Stage-9 package cross-check and full validation log.

## UPDATED / REMEDIATED

- public/login shell now has the same keyboard skip-link access as authenticated shell;
- all key interactive targets audited/remediated to the 44×44 minimum;
- semantic success/error colors are decorative cues rather than failing small text;
- exact-HP dialog now traps focus, supports Escape and restores focus;
- asynchronous result/export feedback has live-region semantics;
- the 430px QA fixture now physically renders at 430px instead of inheriting the 390px cap;
- Home composition was remediated after physical comparison with current v2 Golden references: full-height approved scene, overlay state/context, compact Monthly Goals and exact CTA remain above the scene, with bottom navigation independent in DOM;
- Home still omits persistent Annual Score/rank, Evolution XP and numeric HP.

## PACKAGE / REFERENCE CONTRACTS USED

- `10_FRONTEND_CONTRACT/RESPONSIVE_CONTRACT.md`
- `10_FRONTEND_CONTRACT/ACCESSIBILITY_CONTRACT.md`
- `10_FRONTEND_CONTRACT/SCREEN_CONTRACT_MATRIX.csv`
- `10_FRONTEND_CONTRACT/SCREEN_STATE_POLICY.md`
- `10_FRONTEND_CONTRACT/ROUTE_MAP.csv`
- `10_FRONTEND_CONTRACT/SCREEN_TO_API_MATRIX.csv`
- `15_QA/FRONTEND_E2E_AND_ACCESSIBILITY.md`
- `15_QA/VISUAL_REGRESSION_TESTS.md`
- `15_QA/SCREEN_TEST_MATRIX.csv`
- `15_QA/QA_GATES.md`
- Visual Package current v2 Golden Screens **only as the PROMPT-permitted visual/reference source**.

## SCREEN COMPLETENESS

Stage 9 detected that three active semantic screens were still Stage-3 skeletons and treated this as a real blocker rather than hiding it in QA reporting:

- `SCR_AUTH_LOGIN`
- `SCR_ONBOARDING`
- `SCR_GOAL_SETUP`

They were implemented from current final contracts. Static route/content audit now reports:

```text
ACTIVE_SEMANTIC_SCREENS=36
CONTENT_IMPLEMENTED=36/36
```

## RESPONSIVE QA

Required/checked reference sizes:

- 360px mobile;
- 390×844 primary mobile reference;
- 430px mobile;
- desktop around 1280×900.

Static responsive audit checks safe areas, root overflow policy, touch target token, four-column navigation, management table strategy and desktop/mobile branches.

Real Chromium render of the dependency-free QA artifact measured mobile frames exactly:

```text
360 / 390 / 430
CTA heights = 52 / 52 / 52 px
bottom-nav target height = 67 px
horizontal overflow at 1440 = none
```

The browser-rendered fixture is supporting QA evidence only; it is not presented as an actual React/Vite screenshot.

## ACCESSIBILITY QA

Current audit status:

- all 36 active screens are marked accessibility-required in final QA matrix;
- minimum interactive target = 44×44;
- visible `:focus-visible` baseline;
- skip link on public/login and authenticated shells;
- explicit labels/validation associations retained for forms;
- modal focus trap / Escape / focus restore;
- reduced-motion native + DEV simulation;
- state/result/export announcements via live regions;
- semantic success/error is not conveyed by color alone.

Measured contrast:

```text
text-primary/surface=13.90:1
text-secondary/surface=5.29:1
text-primary/action=5.94:1
known semantic success/surface=4.03:1 -> DECORATION_ONLY
known semantic error/surface=4.12:1 -> DECORATION_ONLY
```

## GOLDEN SCREEN QA

The full current Visual ZIP became physically available during Stage 9. The current v2 Golden set was therefore checked directly rather than only through a manifest.

```text
GOLDEN_V2_VERIFIED=17/17
MOBILE=15 at 390×844
DESKTOP=2 at 1280×900
filename/bytes/SHA-256/dimensions=PASS 17/17
```

Golden Screens remain static QA references and are **not copied into runtime production assets**.

A direct side-by-side visual reference artifact was produced for Home Healthy using:

- left: current approved Golden Home Healthy v2.0;
- right: real Chromium rendering of the Stage-9 dependency-free Home QA fixture using actual runtime WebP/SVG assets.

This review exposed and led to remediation of the earlier short/cropped Home scene composition.

Important source-priority rule: if example text/numbers inside a Golden conflict with current final Source of Truth/OpenAPI/game contracts, the prototype retains the current contract semantics. Golden images govern visual reference direction, not business-rule overrides.

## VALIDATION

All available offline/regression gates Stage 1–9 pass:

- Stage 1 offline smoke — `PASS`
- Stage 2 static + TS syntax — `PASS`
- Stage 3 shell/routes — `PASS`
- Stage 4 Home invariants — `PASS`
- Stage 5 AI-case flow 0/1/2/3 clarification branches — `PASS`
- Stage 6 employee surfaces/fixtures — `PASS`
- Stage 7 management/RBAC/package cross-check — `PASS`
- Stage 8 motion/assets/fallback/package cross-check — `PASS`
- Stage 9 static audit — `PASS 32/32`
- Stage 9 responsive audit — `PASS 10/10`
- Stage 9 contrast audit — `PASS`
- Stage 9 entry flow smoke — `PASS 11/11`
- Stage 9 package/Golden cross-check — `PASS`
- Stage 9 real Chromium QA-fixture audit — `PASS 6/6`
- offline strict TypeScript core — `PASS`

## NPM-BASED VALIDATION

The previously agreed execution-container limitation remains:

```text
formatter=N_A / NOT_EXECUTED_ENVIRONMENT
lint=N_A / NOT_EXECUTED_ENVIRONMENT
full React typecheck=N_A / NOT_EXECUTED_ENVIRONMENT
Vitest=N_A / NOT_EXECUTED_ENVIRONMENT
Playwright React E2E=N_A / NOT_EXECUTED_ENVIRONMENT
actual React-runtime screenshot diff=N_A / NOT_EXECUTED_ENVIRONMENT
```

These checks are not represented as PASS.

The environment does contain a Python Playwright package and system Chromium. Since normal URL navigation is restricted, Stage 9 successfully uses `page.set_content()` to perform a real browser layout/render check of the dependency-free QA fixture. This does not remove the need to rerun the actual React test suite in a full Node 24/npm-capable environment.

## CRITICAL VISUAL DEFECTS

`0` remaining within the observable Stage-9 contract/reference scope after remediation.

The most important Stage-9 visual defect found and fixed was the Home composition mismatch exposed after current Golden binaries became available.

## CRITICAL ACCESSIBILITY BLOCKERS

`0` remaining within the observable Stage-9 scope after remediation.

## VISUAL DIFFERENCES FROM FINAL

- final production mascot/world GLB binaries remain external/not present;
- KTX2 remains absent;
- Tier-F approved static fallback remains the truthful current scene mode;
- final realtime camera/light/material calibration cannot be validated without final DCC assets;
- actual React/Vite pixel regression is still pending the full build environment;
- final licensed font/color calibration qualifications from visual handoff remain outside prototype invention scope.

## DEMO-ONLY IMPLEMENTATION

- synthetic login identity;
- deterministic onboarding state;
- deterministic Monthly Goal Setup fixture;
- DEV role/state/viewport/reduced-motion controls;
- dependency-free browser QA fixture and screenshots;
- no demo-only value is represented as production corporate data or final 3D.

## OPEN QUESTIONS

`none`

## GATE

`PASS`

Interpretation: Stage 9 is accepted under the execution-environment exception explicitly agreed by the owner. All defects observable through current source contracts, physical runtime assets, physical v2 Golden references, offline audits and the available real Chromium QA fixture have been remediated. Actual React-runtime npm/Playwright validation remains explicitly unexecuted and is carried to Stage 10 final difference register rather than silently converted to PASS.

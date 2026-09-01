PROTOTYPE STAGE 8 — MOTION / 3D / AMBIENT POLISH

STATUS:
PASS_WITH_NONBLOCKING_GAPS

CREATED:
- src/features/home/AmbientLayer.tsx
- src/features/home/AmbientLayer.module.css
- src/features/home/ApprovedAssetImage.tsx
- src/features/home/ApprovedAssetImage.module.css
- tests/unit/stage8-motion-3d.test.ts
- tests/e2e/stage8-motion-fallback.spec.ts
- scripts/stage8-static-audit.mjs
- scripts/stage8-fallback-semantic-audit.mjs
- scripts/stage8-asset-audit.py
- scripts/stage8-package-crosscheck.py
- docs/STAGE_8_MOTION_3D_PREVIEW.html
- docs/STAGE_8_ASSET_IMPORT.md
- docs/STAGE_8_PACKAGE_CROSSCHECK.md
- docs/SAFE_ENGINEERING_DEFAULTS_STAGE_8.md
- docs/STAGE_8_VALIDATION.log
- public/production-assets/08_PRODUCTION_EXPORTS/ (current runtime visual export set)

UPDATED:
- src/design-system/tokens.css — current Stage-20 motion baselines
- src/design-system/components/Button.module.css — press motion / reduced-motion behavior
- src/design-system/components/Chip.module.css — press motion / reduced-motion behavior
- src/app/shell/AppShell.module.css — route transition + DEV reduced-motion branch
- src/app/shell/MobileBottomNavigation.tsx — approved production navigation SVG binding
- src/app/shell/MobileBottomNavigation.module.css — navigation transition
- src/features/ai-case/AiCaseFlow.module.css — AI-case completion motion
- src/features/home/HomeScreen.tsx / .module.css — ambient/modal/reduced-motion integration
- src/features/home/SceneHostBoundary.tsx / .module.css — lifecycle/tier/fallback/state-safe visual integration
- src/assets/productionAssets.ts — current production asset runtime paths
- src/three/runtimeContract.ts — Stage-11 lifecycle/Tier-F contract
- README.md

PACKAGE CONTRACTS USED:
- 10_FRONTEND_CONTRACT/VISUAL_INTEGRATION.md
- 11_3D_RUNTIME/3D_RUNTIME_FINAL.md
- 11_3D_RUNTIME/ANIMATION_STATE_MAPPING.md
- 11_3D_RUNTIME/PERFORMANCE_TIERS.md
- 11_3D_RUNTIME/FALLBACK_MAPPING.md
- 11_3D_RUNTIME/ASSET_LOADING_ORDER.md
- 15_QA/PWA_AND_3D_TESTS.md
- current Stage-20 Motion_Specification.md / 3D_Specification.md as referenced by the Development Package
- 08_PRODUCTION_EXPORTS/ as binary/reference source only

VALIDATION:
- formatter — N_A / NOT_EXECUTED_ENVIRONMENT
- lint — N_A / NOT_EXECUTED_ENVIRONMENT
- typecheck — PASS for dependency-free strict core; full React typecheck NOT_EXECUTED_ENVIRONMENT
- unit/component — source CREATED; Vitest NOT_EXECUTED_ENVIRONMENT
- E2E/visual — Playwright source CREATED; execution NOT_EXECUTED_ENVIRONMENT; standalone Stage-8 preview + HTML/static/asset audits PASS
- Stage 1–7 offline regression — PASS
- Stage 8 static contract audit — PASS, 30 assertions
- fallback semantic audit — PASS, 6 checks
- production runtime asset audit — PASS, 51 SVG + 5 WebP; GLB 0; KTX2 0; SHA-256 56/56
- direct package cross-check — PASS

VISUAL DIFFERENCES FROM FINAL:
- final realtime mascot GLB is not supplied;
- final realtime Pulkovo core GLB is not supplied;
- final KTX2 textures are not supplied;
- therefore current runtime remains Tier F static fallback rather than live 3D;
- exact live camera/light/color calibration cannot be represented without final DCC assets;
- continuous ambient character/world animation is intentionally not invented;
- the double-mascot integration defect found during physical WebP inspection is fixed: the healthy Day fallback is an indivisible composite and is never layered with the standalone Happy raster;
- measured device performance is not claimed.

DEMO-ONLY IMPLEMENTATION:
- DEV lifecycle/tier diagnostic badge;
- DEV reduced-motion simulation;
- DEMO_NONPRODUCTION realtime-request mode that intentionally resolves to Tier F while final GLB is external;
- standalone QA preview exposes a loading state to inspect static-preview equivalence;
- deterministic ambient text and static daylight polish.

OPEN QUESTIONS:
- none for prototype Stage 8.
- final GLB/KTX2 remain external production dependencies already classified as non-blocking for the visual prototype.

GATE:
PASS

NEXT STAGE:
9 — Visual QA / responsive / accessibility

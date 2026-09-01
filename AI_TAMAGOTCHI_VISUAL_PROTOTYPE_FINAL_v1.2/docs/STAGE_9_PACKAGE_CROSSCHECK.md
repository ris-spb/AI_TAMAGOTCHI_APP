# Stage 9 — Direct Package Cross-check

Authoritative files checked from the physically unpacked Development Package:

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

Visual binary/reference source checked from the physically mounted Visual Package:

- `10_QA_REFERENCE/Golden_Screens/Golden_Screen_Index_v2.0.json`
- all 17 current `*_v2.0.png` Golden Screens
- runtime `08_PRODUCTION_EXPORTS/` asset set remains separate from Golden reference material.

## Result

```text
STAGE9_PACKAGE_CROSSCHECK=PASS
ACTIVE_SCREENS=36
A11Y_REQUIRED=36
VISUAL_REGRESSION_REQUIRED=34
VIEWPORTS=360|390x844|430|1280x900
RUNTIME_ASSETS=56
GOLDEN_V2_VERIFIED=17/17
GOLDEN_MOBILE=15
GOLDEN_DESKTOP=2
GOLDEN_RUNTIME_USAGE=REFERENCE_ONLY
GOLDEN_PIXEL_DIFF_ACTUAL_REACT=NOT_EXECUTED_REACT_RUNTIME_UNAVAILABLE
```

## Interpretation

- All 36 active semantic screens remain represented in the route contract and prototype route map.
- All 36 are accessibility-required in the QA matrix; 34 are visual-regression-required.
- Responsive coverage is 360 px, 390×844, 430 px, and desktop around 1280×900.
- 56 approved runtime visual assets remain physically present: 51 SVG + 5 WebP.
- The current v2 Golden set is now physically available and verified **17/17 by filename, byte size, SHA-256 and image dimensions** against `Golden_Screen_Index_v2.0.json`.
- Golden files remain **reference-only** and are not copied into runtime production assets.
- Actual React/Vite screenshot pixel diff cannot be executed because npm dependencies remain unavailable. Stage 9 therefore uses: source-contract audit + physical Golden integrity audit + manual reference review + actual Chromium rendering of the dependency-free QA fixture. This limitation is not reported as a PASS for React pixel regression.

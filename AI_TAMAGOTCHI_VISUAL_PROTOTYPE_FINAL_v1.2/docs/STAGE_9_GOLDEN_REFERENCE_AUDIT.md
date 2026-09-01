# Stage 9 — Golden Reference Audit

The current Visual Package is used only as an allowed **reference/binary-asset source**. Golden Screens remain QA references and are not runtime production assets.

## Integrity

- current set: **17/17 v2.0**
- mobile: **15** at 390×844
- desktop: **2** at 1280×900
- filename / bytes / SHA-256 / dimensions: **PASS 17/17** against `Golden_Screen_Index_v2.0.json`

## Reference review

| Golden reference | Dimensions | Status | Stage-9 note |
|---|---:|---|---|
| `GOLDEN_AddCase_Default_390x844_v2.0.png` | 390×844 | PASS_REFERENCE_REVIEW | Visual reference physically verified; React pixel diff pending full runtime. |
| `GOLDEN_Admin_Overview_1280x900_v2.0.png` | 1280×900 | PASS_REFERENCE_REVIEW | Desktop information hierarchy/sidebar/card/table direction reviewed; actual React screenshot pending. |
| `GOLDEN_Clarification_Q1_390x844_v2.0.png` | 390×844 | PASS_REFERENCE_REVIEW | Visual reference physically verified; React pixel diff pending full runtime. |
| `GOLDEN_Director_Default_1280x900_v2.0.png` | 1280×900 | PASS_REFERENCE_REVIEW | Desktop information hierarchy/sidebar/card/table direction reviewed; actual React screenshot pending. |
| `GOLDEN_Goals_Active_390x844_v2.0.png` | 390×844 | PASS_REFERENCE_REVIEW | Visual reference physically verified; React pixel diff pending full runtime. |
| `GOLDEN_History_Default_390x844_v2.0.png` | 390×844 | PASS_REFERENCE_REVIEW | Visual reference physically verified; React pixel diff pending full runtime. |
| `GOLDEN_Home_Coma_390x844_v2.0.png` | 390×844 | PASS_REFERENCE_REVIEW | State reference physically reviewed; runtime uses approved state-safe fallback logic; React screenshot pending. |
| `GOLDEN_Home_Healthy_390x844_v2.0.png` | 390×844 | PASS_REFERENCE_REVIEW | Direct side-by-side review performed against real Chromium-rendered Stage-9 Home QA fixture; full-height Home composition remediated. |
| `GOLDEN_Home_Vacation_390x844_v2.0.png` | 390×844 | PASS_REFERENCE_REVIEW | State reference physically reviewed; runtime uses approved state-safe fallback logic; React screenshot pending. |
| `GOLDEN_Home_Weak_390x844_v2.0.png` | 390×844 | PASS_REFERENCE_REVIEW | State reference physically reviewed; runtime uses approved state-safe fallback logic; React screenshot pending. |
| `GOLDEN_Processing_Default_390x844_v2.0.png` | 390×844 | PASS_REFERENCE_REVIEW | Visual reference physically verified; React pixel diff pending full runtime. |
| `GOLDEN_Profile_Default_390x844_v2.0.png` | 390×844 | PASS_REFERENCE_REVIEW | Visual reference physically verified; React pixel diff pending full runtime. |
| `GOLDEN_Rating_Employees_390x844_v2.0.png` | 390×844 | PASS_REFERENCE_REVIEW | Visual reference physically verified; React pixel diff pending full runtime. |
| `GOLDEN_Result_C1_390x844_v2.0.png` | 390×844 | PASS_REFERENCE_REVIEW | Visual reference physically verified; React pixel diff pending full runtime. |
| `GOLDEN_Result_C3_390x844_v2.0.png` | 390×844 | PASS_REFERENCE_REVIEW | Visual reference physically verified; React pixel diff pending full runtime. |
| `GOLDEN_Result_C5_390x844_v2.0.png` | 390×844 | PASS_REFERENCE_REVIEW | Visual reference physically verified; React pixel diff pending full runtime. |
| `GOLDEN_STT_Recording_390x844_v2.0.png` | 390×844 | PASS_REFERENCE_REVIEW | Visual reference physically verified; React pixel diff pending full runtime. |

## Important source-priority rule

Golden Screens are visual references. They are **not allowed to override** current Source of Truth, final OpenAPI, game configuration or screen contracts. If example numbers/text inside a Golden conflict with the current final contract, the prototype keeps the final contract semantics and uses the Golden only for composition, hierarchy, spacing and visual language.

## Actual screenshot limitation

A real system-Chromium render was executed for the dependency-free Stage-9 QA fixture and compared side-by-side with Home Healthy v2.0. The actual React/Vite application cannot be booted in this execution container because npm dependencies cannot be installed; therefore automated pixel diff of the React runtime remains `NOT_EXECUTED_ENVIRONMENT`, not PASS.

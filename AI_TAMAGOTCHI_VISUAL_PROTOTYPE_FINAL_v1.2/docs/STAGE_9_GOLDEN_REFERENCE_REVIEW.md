# Stage 9 — Golden v2 Reference Review

The current Visual Package exposes 17 active Golden v2 PNG references. They are QA/reference material only and are **not** copied into runtime production assets.

Integrity verification is performed by `scripts/stage9-package-crosscheck.py` against `Golden_Screen_Index_v2.0.json` and currently passes **17/17** by filename, byte size, SHA-256 and image dimensions.

## Reference-to-prototype coverage

| Golden v2 reference | Prototype surface/state | Stage-9 status |
|---|---|---|
| `GOLDEN_AddCase_Default_390x844_v2.0.png` | `/ai-cases/new` | contract/source implemented; React pixel diff pending |
| `GOLDEN_Admin_Overview_1280x900_v2.0.png` | Admin desktop overview/surfaces | contract/source implemented; React pixel diff pending |
| `GOLDEN_Clarification_Q1_390x844_v2.0.png` | `/ai-cases/:taskId/clarify` | 0–3 clarification flow implemented; React pixel diff pending |
| `GOLDEN_Director_Default_1280x900_v2.0.png` | `/director` | contract/source implemented; React pixel diff pending |
| `GOLDEN_Goals_Active_390x844_v2.0.png` | `/goals` | contract/source implemented; React pixel diff pending |
| `GOLDEN_History_Default_390x844_v2.0.png` | `/history` | contract/source implemented; React pixel diff pending |
| `GOLDEN_Home_Coma_390x844_v2.0.png` | Home `coma` | approved Coma fallback + DOM overlay; React pixel diff pending |
| `GOLDEN_Home_Healthy_390x844_v2.0.png` | Home `happy` | approved Day composite + DOM overlay; React pixel diff pending |
| `GOLDEN_Home_Vacation_390x844_v2.0.png` | Home vacation overlay | contract/source implemented; React pixel diff pending |
| `GOLDEN_Home_Weak_390x844_v2.0.png` | Home weak states | state-neutral approved fallback + DOM cue; React pixel diff pending |
| `GOLDEN_Processing_Default_390x844_v2.0.png` | `/ai-cases/:taskId/processing` | contract/source implemented; React pixel diff pending |
| `GOLDEN_Profile_Default_390x844_v2.0.png` | `/profile` | contract/source implemented; React pixel diff pending |
| `GOLDEN_Rating_Employees_390x844_v2.0.png` | `/rating` | contract/source implemented; React pixel diff pending |
| `GOLDEN_Result_C1_390x844_v2.0.png` | Result C1 | deterministic C1 branch implemented; React pixel diff pending |
| `GOLDEN_Result_C3_390x844_v2.0.png` | Result C3 | deterministic C3 branch implemented; React pixel diff pending |
| `GOLDEN_Result_C5_390x844_v2.0.png` | Result C5 | deterministic C5 branch implemented; React pixel diff pending |
| `GOLDEN_STT_Recording_390x844_v2.0.png` | voice/STT recording | deterministic STT flow implemented; React pixel diff pending |

## Visual findings applied during Stage 9

1. The current Home Golden references confirm a full-height airport/mascot scene with functional UI overlaid in DOM. The Home composition was adjusted to preserve the full-height approved fallback rather than cropping it into a short scene.
2. The approved `IMG_Home_Fallback_Day_390x844_v2.0.webp` already contains the healthy mascot; no second Happy mascot is overlaid.
3. Golden examples do not override current Source of Truth, API or game semantics when example text/business values differ.
4. Golden images remain test/reference inputs only; runtime continues to use the audited `08_PRODUCTION_EXPORTS` set.

## Limitation

Actual Playwright screenshot comparison of the **React/Vite runtime** cannot be executed in the current container because pinned npm dependencies are unavailable. This is recorded as:

`GOLDEN_PIXEL_DIFF_ACTUAL_REACT=NOT_EXECUTED_REACT_RUNTIME_UNAVAILABLE`

The Stage-9 browser evidence that *is* executable uses the dependency-free QA fixture and verifies viewport width, overflow, target sizes and reduced-motion behavior; it is not a substitute for React pixel regression.

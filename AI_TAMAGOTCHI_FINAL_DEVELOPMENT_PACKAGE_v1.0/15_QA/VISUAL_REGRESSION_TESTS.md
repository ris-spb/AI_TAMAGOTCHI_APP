# VISUAL REGRESSION TESTS

Canonical visual source inputs:
- Design_Tokens.json
- Component_Matrix.xlsx
- Screen_State_Matrix.xlsx
- Asset_Manifest.xlsx
- Motion_Specification.md
- 3D_Specification.md
- Developer_Notes.md
- Visual_QA_Checklist.xlsx
- current Golden Screens v2

Known current source coverage:
- 231 screen-state rows;
- 55/55 critical visual states mapped;
- 17 Golden v2 references;
- 29 components.

These source files live in the current visual package/File Library; Stage 15 does not fabricate replacement images/workbooks when bytes are not mounted here.

Playwright screenshot tests use deterministic fixtures/viewports and compare only where a current Golden exists.

Critical visual checks:
- four-tab nav;
- exact Home CTA;
- no deprecated Tasks/Add tabs;
- no Home persistent Score/rank/XP/numeric HP bar;
- canonical mascot;
- approved Pulkovo fallback/composition;
- only approved production-export runtime assets;
- proxy GLB rejected as production;
- same functional overlay on loading/live/fallback;
- 360/390/430 safe area;
- desktop management layout;
- focus/error/loading/disabled/reduced-motion states.

Passing fallback tests do not claim missing final GLB/font/art/tuning exists.

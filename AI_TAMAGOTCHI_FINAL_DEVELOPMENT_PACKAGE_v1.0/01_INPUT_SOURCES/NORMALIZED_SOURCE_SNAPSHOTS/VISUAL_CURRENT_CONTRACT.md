# VISUAL INTEGRATION CONTRACT

## 1. Canonical handoff inputs

Frontend must consume the current unsuffixed canonical developer handoff:

- `09_DEVELOPER_HANDOFF/Design_Tokens.json`
- `09_DEVELOPER_HANDOFF/Component_Matrix.xlsx`
- `09_DEVELOPER_HANDOFF/Screen_State_Matrix.xlsx`
- `09_DEVELOPER_HANDOFF/Asset_Manifest.xlsx`
- `09_DEVELOPER_HANDOFF/Motion_Specification.md`
- `09_DEVELOPER_HANDOFF/3D_Specification.md`
- `09_DEVELOPER_HANDOFF/Developer_Notes.md`
- `10_QA_REFERENCE/Visual_QA_Checklist.xlsx`
- current `CHANGELOG.xlsx`

Versioned companions are lineage/audit material unless the current handoff explicitly promotes them.

## 2. Runtime asset rule

Application runtime may directly consume visual production files only from:

`08_PRODUCTION_EXPORTS/`

Do not runtime-import:
- a source SVG merely because it exists under design-system source folders;
- Stage-16 `SPK_*` technical GLBs;
- deprecated Stage-14 mascot fallbacks;
- archived pre-Stage20 assets;
- fake KTX2/GLB.

For an icon/image, resolve `Asset_Manifest.xlsx → Runtime File`.

## 3. Token rule

Consume semantic names such as:
- `color-background-primary`;
- `color-surface-primary`;
- `color-text-primary`;
- `color-action-primary`;
- `color-state-success`;
- `color-state-error`;
- `spacing-*`;
- `radius-*`.

Do not create product code around palette names like `orange-1`/`grey-3`.

Current token values carry statuses. `PROVISIONAL` does not become `APPROVED_FINAL` by being compiled into CSS.

## 4. Component rule

`Component_Matrix.xlsx` is the visual component inventory.

Frontend may create engineering wrappers/compositions, but it must not:
- silently redesign component states;
- invent per-screen radii/colors for the same semantic component;
- reactivate historical navigation candidates;
- treat old `OD-*` tags in component rows as current blockers when later owner decisions resolved them.

## 5. Screen State Matrix normalization

The current matrix's **state rows** remain a required implementation source.

Historical internal notes are superseded as follows:

| Historical topic | Current implementation |
|---|---|
| task/to-do ambiguity | AI-case = completed AI-assisted work case |
| 4/5-tab conflict | `Главная / История / Рейтинг / Профиль` |
| Home CTA conflict | `Добавить AI-задачу` |
| Annual Score/rank on Home | not persistent |
| Evolution XP on Home | not persistent |
| Monthly Goals on Home | compact progress only |
| offline conflict | no offline mutations/product mode; shell/fallback may render network state |
| canonical mascot absent | current canonical owner-approved mascot reference governs |

`SCR_TASKS_DESIGN_CANDIDATE` is not part of Stage-10 routes.

## 6. Home composition contract

Persistent Home functional overlay may contain:
- Streak;
- AI-case count/today context;
- compact Monthly Goal progress;
- real notification attention;
- one primary CTA `Добавить AI-задачу`;
- four-tab mobile navigation.

Do not persist:
- Annual Score/rank;
- Evolution XP;
- numeric HP bar;
- feed/play/learn/rest action row;
- individual task list on Home.

Mascot state remains the principal health feedback.

## 7. 3D/fallback

Frontend integrates a `SceneHostBoundary`.

The same functional UI must work over:
1. static preview;
2. 3D loading;
3. live 3D;
4. approved static fallback;
5. unsupported/context-loss/failure state.

Stage 11 owns runtime camera/assets/performance details.

## 8. Visual regression

Use current Golden Screens where available.

Stage 10 does not fabricate new Golden files.

Stage 15/implementation will compare:
- key screen states with current Golden references;
- component state contracts;
- responsive/safe area behavior;
- reduced motion;
- fallback/live-overlay equivalence.

## 9. Current external visual gaps

Non-blocking for frontend contract:
- final production realtime GLBs;
- optional KTX2;
- final runtime font/license freeze;
- some final scene color/camera/lighting tuning;
- final achievement/evolution art inventory.

Where final art is absent, use the current approved fallback/generic component path specified by the handoff; never invent a production asset file.

# FRONTEND E2E & ACCESSIBILITY

Stage-10 test contracts: 38 `FE-T-*`.

`SCREEN_TEST_MATRIX.csv` covers 36 active semantic screens.

Critical E2E:
- login → onboarding → Goal setup → Home;
- text task and voice/STT/transcript;
- processing/clarifications/result;
- edit/version history/delete;
- Goals/History/Rating/Profile/notifications;
- Director own-directorate;
- Executive company drilldown without settings;
- Admin modules;
- export authorization/download.

Home persistent:
- mascot state;
- Streak;
- AI-case context;
- compact Goals;
- real notification attention;
- CTA `Добавить AI-задачу`;
- nav `Главная / История / Рейтинг / Профиль`.

Home must not persist Score/rank, Evolution XP, numeric HP bar or game-action row.

Accessibility per applicable screen:
- keyboard;
- visible focus;
- labels/errors;
- modal focus;
- ≥44×44 touch target;
- reduced motion;
- no color-only critical semantics;
- chart text/table alternative;
- product usable without 3D.

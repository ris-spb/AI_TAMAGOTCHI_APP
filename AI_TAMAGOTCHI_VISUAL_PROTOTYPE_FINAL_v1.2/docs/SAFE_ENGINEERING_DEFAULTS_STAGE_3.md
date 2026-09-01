# SAFE_ENGINEERING_DEFAULTS — PROTOTYPE STAGE 3

The following implementation choices are technical, reversible and do not change Product semantics.

1. **Route implementation uses the frozen Stage-10 semantic screen IDs and current SAFE_ENGINEERING_DEFAULT URLs.** Screen IDs, role scopes and navigation semantics remain authoritative; URL internals can be refactored later only without changing those contracts.
2. **Prototype role source is the existing dev-only Zustand demo store.** This is not production authorization. Production role/session truth must come from `/v1/me`; backend RBAC/object authorization remains mandatory.
3. **Mobile bottom navigation is rendered only for Employee primary/self shell surfaces.** Exact four items are `Главная / История / Рейтинг / Профиль`. No `Добавить` or `Задачи` tab is introduced.
4. **Desktop navigation is a responsive shell aid derived only from already named contract screens.** It contains no new Product module or permission.
5. **No replacement navigation pictograms are invented.** The shell preserves 22x22 icon layout slots but leaves them visually empty until approved production SVG binaries are available.
6. **Skeleton screens contain structural placeholders only.** They must not be interpreted as final screen composition; content implementation remains owned by later prototype stages.
7. **Loading/error/empty demo scenarios are driven by existing client-only prototype scenario state.** This is a demonstration mechanism, not server state authority.
8. **Dependency-free `STAGE_3_SHELL_PREVIEW.html` is a QA/demo artifact only.** It does not replace the React/Vite implementation and is not a production deliverable.
9. **Known execution-container exception remains in force.** npm-dependent formatter/lint/full typecheck/Vitest/Playwright/Vite boot are recorded as `NOT_EXECUTED_ENVIRONMENT`, never as PASS.

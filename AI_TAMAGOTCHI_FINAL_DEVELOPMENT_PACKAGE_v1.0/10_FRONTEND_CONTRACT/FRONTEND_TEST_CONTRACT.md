# FRONTEND TEST CONTRACT

Stage 10 defines stable acceptance/test **contract IDs**. Stage 15 owns executable test-suite implementation and the final global `test_ref` mapping.

| Contract ID | Acceptance intent |
|---|---|
| `FE-T-AUTH` | Login verification states; no registration/password/SMS; non-enumerating failure. |
| `FE-T-ONBOARDING` | First-login onboarding gate and resume/error behavior. |
| `FE-T-ROUTE-RBAC` | Role routes hidden/guarded in frontend and backend rejection handled safely. |
| `FE-T-GOAL-SETUP` | Exactly two of five selected; third assigned by server; gate behavior. |
| `FE-T-HOME` | Owner-approved Home content; no Score/rank/XP/HP bar; CTA/nav exact. |
| `FE-T-HOME-3D` | UI usable during 3D loading/failure/static fallback. |
| `FE-T-CASE-TEXT` | Completed AI-use-case text flow; URL strings; no attachment/backdate/manual score. |
| `FE-T-CASE-VOICE` | Record→STT→transcript edit; microphone/STT/network errors; no audio retention UI. |
| `FE-T-PROCESSING` | Processing polling/error/retry without duplicate business effects. |
| `FE-T-CLARIFICATION` | Questions 1/2/3; fourth impossible; answer retry semantics. |
| `FE-T-CASE-RESULT` | C1–C5 result rendering uses server response only. |
| `FE-T-CASE-DETAIL` | Role/object scoped task detail; historical version; permission state. |
| `FE-T-CASE-EDIT` | Owner-only versioned edit; conflict; no manual score/complexity. |
| `FE-T-HISTORY` | History loading/empty/filter/no-result/deleted-excluded/version detail. |
| `FE-T-GOALS` | Current/history/month-close/new-cycle states from server. |
| `FE-T-RATING` | Employee/directorate ratings, filters/search, own-rank affordance. |
| `FE-T-ANALYTICS` | Anonymous company analytics with no employee-identifying raw data. |
| `FE-T-PRIVACY` | Closed/standard/open peer projection; privileged management unaffected. |
| `FE-T-PROFILE` | Personal dashboard and self routes. |
| `FE-T-VACATION` | Vacation toggle only; no retroactive date UI. |
| `FE-T-ACHIEVEMENTS` | Earned items only; generic fallback when art absent. |
| `FE-T-SCORING-INFO` | Scoring information presentation; no client scoring. |
| `FE-T-NOTIFICATIONS` | In-app list/read states; real attention only. |
| `FE-T-DIRECTOR` | Own-directorate dashboard/drilldown; no technical scoring trace. |
| `FE-T-EXECUTIVE` | Company drilldown; no system settings/technical trace. |
| `FE-T-ADMIN` | Admin shell and authorized modules; no manual score override. |
| `FE-T-ADMIN-USERS` | Admin user/role/status CRUD states + conflict. |
| `FE-T-ADMIN-ORG` | Organization CRUD and errors. |
| `FE-T-ADMIN-CALENDAR` | Calendar CRUD/validation/conflict. |
| `FE-T-ADMIN-TAXONOMY` | Versioned taxonomy; activation; no historical auto-reclassification. |
| `FE-T-ADMIN-TOOLS` | AI tools CRUD/deactivate + unrecognized queue. |
| `FE-T-ADMIN-AUDIT` | Audit + technical scoring trace Admin-only. |
| `FE-T-EXPORT` | Director own scope; Executive/Admin company; download re-authorization. |
| `FE-T-PWA` | Installable/static shell; no offline mutation/background replay/API SW cache. |
| `FE-T-A11Y` | Keyboard/focus/labels/44px/reduced-motion/non-color-only. |
| `FE-T-I18N` | Russian resources externalized; exact nav/CTA strings. |
| `FE-T-RESPONSIVE` | 360–430 + 390×844 reference; safe areas; dedicated desktop IA. |
| `FE-T-VISUAL` | Canonical tokens/components/runtime assets; no deprecated/proxy assets. |

## Rule

A Stage-10 `FE-T-*` ID is not evidence that an automated test already exists. Stage 15 must bind each required contract to executable unit/integration/E2E/visual/accessibility tests.

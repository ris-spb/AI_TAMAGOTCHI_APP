# ROUTE MAP

**URL status:** `SAFE_ENGINEERING_DEFAULT`.  
**Stable identity:** semantic `SCR_*` screen ID.

## Global route guards

1. Public route: `/login`.
2. Protected route: require valid server-backed session.
3. Resolve current actor from `/v1/me`; never trust a route/client role claim.
4. Apply onboarding/data gates returned by server.
5. Apply role UX guard.
6. Backend repeats role + object authorization for every API call.

## Mobile primary navigation

| Label | Route | Screen |
|---|---|---|
| `Главная` | `/` | `SCR_HOME` |
| `История` | `/history` | `SCR_HISTORY_TASKS` |
| `Рейтинг` | `/rating` | `SCR_RATING_EMPLOYEES` |
| `Профиль` | `/profile` | `SCR_PROFILE_SELF` |

Home primary CTA: **`Добавить AI-задачу` → `/ai-cases/new`**.

There is no persistent `Tasks` or `Add` bottom-navigation tab.
`SCR_TASKS_DESIGN_CANDIDATE` is historical/deprecated and is not routed.

## Route table

| Screen | Route | Roles | Class | Platform |
|---|---|---|---|---|
| `SCR_AUTH_LOGIN` | `/login` | public | `PUBLIC` | Mobile/Web |
| `SCR_ONBOARDING` | `/onboarding` | authenticated | `AUTH_GATE` | Mobile/Web |
| `SCR_GOAL_SETUP` | `/goals/setup` | employee | `DATA_GATE` | Mobile/Web |
| `SCR_HOME` | `/` | employee | `PRIMARY_TAB` | Mobile primary / responsive web |
| `SCR_CASE_ADD` | `/ai-cases/new` | employee | `FLOW` | Mobile/Web |
| `SCR_CASE_VOICE` | `/ai-cases/new/voice` | employee | `FLOW` | Mobile primary |
| `SCR_CASE_TRANSCRIPT` | `/ai-cases/new/transcript` | employee | `FLOW_EPHEMERAL` | Mobile/Web |
| `SCR_CASE_PROCESSING` | `/ai-cases/:taskId/processing` | employee | `FLOW` | Mobile/Web |
| `SCR_CASE_CLARIFY` | `/ai-cases/:taskId/clarify` | employee | `FLOW` | Mobile/Web |
| `SCR_CASE_RESULT` | `/ai-cases/:taskId/result` | employee | `FLOW` | Mobile/Web |
| `SCR_CASE_DETAIL` | `/ai-cases/:taskId` | employee;director;executive;admin | `OBJECT_SCOPED` | Mobile/Web |
| `SCR_CASE_EDIT` | `/ai-cases/:taskId/edit` | employee | `OWNER_ONLY` | Mobile/Web |
| `SCR_HISTORY_TASKS` | `/history` | employee | `PRIMARY_TAB` | Mobile/Web |
| `SCR_HISTORY_EVENTS` | `/history/events` | employee | `SUBROUTE` | Mobile/Web |
| `SCR_GOALS` | `/goals` | employee | `SUBROUTE` | Mobile/Web |
| `SCR_RATING_EMPLOYEES` | `/rating` | employee;director;executive;admin | `PRIMARY_TAB` | Mobile/Web |
| `SCR_RATING_DIRECTORATES` | `/rating/directorates` | employee;director;executive;admin | `SUBROUTE` | Mobile/Web |
| `SCR_COMPANY_ANALYTICS` | `/rating/analytics` | employee;director;executive;admin | `SUBROUTE` | Web/Mobile |
| `SCR_DIRECTORATE_CARD` | `/rating/directorates/:directorateId` | employee;director;executive;admin | `OBJECT_SCOPED` | Mobile/Web |
| `SCR_PUBLIC_PROFILE` | `/profiles/:employeeId` | employee;director;executive;admin | `OBJECT_SCOPED` | Mobile/Web |
| `SCR_PROFILE_SELF` | `/profile` | employee;director;executive;admin | `PRIMARY_OR_SELF` | Mobile/Web |
| `SCR_PRIVACY` | `/profile/privacy` | employee;director;executive;admin | `SELF` | Mobile/Web |
| `SCR_VACATION` | `/profile/vacation` | employee;director;executive;admin | `SELF` | Mobile/Web |
| `SCR_ACHIEVEMENTS` | `/profile/achievements` | employee;director;executive;admin | `SELF` | Mobile/Web |
| `SCR_SCORING_INFO` | `/profile/scoring` | employee;director;executive;admin | `AUTHENTICATED` | Mobile/Web |
| `SCR_NOTIFICATIONS` | `/notifications` | employee;director;executive;admin | `SELF` | Mobile/Web |
| `SCR_DIRECTOR_DASH` | `/director` | director | `ROLE_DIRECTOR` | Desktop/Web primary |
| `SCR_EXEC_DASH` | `/executive` | executive | `ROLE_EXECUTIVE` | Desktop/Web primary |
| `SCR_ADMIN_PANEL` | `/admin` | admin | `ROLE_ADMIN_SHELL` | Desktop/Web primary |
| `SCR_ADMIN_USERS` | `/admin/users` | admin | `ROLE_ADMIN` | Desktop/Web |
| `SCR_ADMIN_ORG` | `/admin/org` | admin | `ROLE_ADMIN` | Desktop/Web |
| `SCR_ADMIN_CALENDAR` | `/admin/calendar` | admin | `ROLE_ADMIN` | Desktop/Web |
| `SCR_ADMIN_TAXONOMY` | `/admin/taxonomy` | admin | `ROLE_ADMIN` | Desktop/Web |
| `SCR_ADMIN_TOOLS` | `/admin/tools` | admin | `ROLE_ADMIN` | Desktop/Web |
| `SCR_ADMIN_AUDIT` | `/admin/audit` | admin | `ROLE_ADMIN` | Desktop/Web |
| `SCR_ADMIN_EXPORT` | `/exports` | director;executive;admin | `ROLE_SCOPED` | Desktop/Web |

## Redirect/guard rules

- unauthenticated protected route → `/login`;
- successful login → resolve onboarding/Goal gate from server before normal destination;
- unauthorized role route → do not render privileged data; use permission/not-found-safe UI;
- object scope is not inferred from URL IDs;
- blocked/terminated session is handled by auth contract and returns to the login/access-denied path;
- route guards do not replace backend RBAC.

## Unsaved transient route data

`/ai-cases/new/transcript` may contain an ephemeral transcript before task creation. A page reload must not fabricate persistence. If the transcript has not yet been durably submitted, losing it on hard reload is preferable to inventing an offline/durable draft product mechanic.

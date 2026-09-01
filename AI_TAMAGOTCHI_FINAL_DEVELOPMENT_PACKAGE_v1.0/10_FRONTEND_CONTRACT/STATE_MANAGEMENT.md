# FRONTEND STATE MANAGEMENT CONTRACT

## 1. Ownership matrix

| State class | Owner | Persistence | Examples |
|---|---|---|---|
| server/domain data | TanStack Query cache | memory / library cache | Home, task, goals, rating, profile |
| authenticated identity view | TanStack Query + session transport | server session authoritative | `/v1/me` |
| form draft | React Hook Form | in-memory by default | login, case input, Goal setup |
| transient UI | Zustand | memory | modal/sheet, shell UI, local visual state |
| navigation/filter | React Router URL/search params | URL | rating/history filters |
| 3D technical state | isolated scene bridge | memory | loading/ready/fallback/context-loss |
| game/business truth | backend only | PostgreSQL | Score/HP/XP/Streak/goals |

## 2. TanStack Query invariants

- query keys are resource-oriented and centralized;
- mutation success invalidates/refetches affected authoritative queries;
- no optimistic write may invent Score/HP/XP/rank/reward;
- safe optimistic UI is limited to reversible presentation-only facts when exact server outcome is not business-derived;
- API errors remain typed.

Suggested query-key families:

```text
me
home
tasks.history(filters)
task.detail(taskId)
task.processing(taskId)
task.result(taskId)
goals.current
goals.history
goals.setup
ratings.employees(filters)
ratings.directorates(filters)
analytics.company(filters)
notifications(filters)
director.dashboard(period)
executive.dashboard(period)
admin.*
exports.*
```

## 3. Mutation invalidation examples

### Create/edit AI-case
On accepted command:
- task processing/detail;
- history;
- Home;
- goals;
- profile/dashboard;
- rating only after server-side result changes and relevant refetch.

Frontend does not predict final Score.

### Delete
After server confirms:
- remove/refetch ordinary history;
- task detail;
- Home;
- goals/profile/rating as server recalculations become available.

Do not locally reverse ledger math.

### Privacy
On success:
- self profile;
- public profile cache entries that may be affected.

### Vacation
On success:
- self profile;
- Home/pet state.

## 4. Zustand limits

Zustand is not a second Redux/domain database.

Allowed:
- UI panel state;
- local dismissible visual feedback;
- one-session draft helpers;
- scene availability state.

Forbidden:
- business ledgers;
- derived scores;
- authorization grants;
- server entity collections copied indefinitely from Query cache.

## 5. Session state

Raw bearer token storage/persistence mechanism is **not** frozen here.

Frontend uses a `SessionTransport` abstraction supplied by auth/security implementation.
Constraints:
- never put token in URL;
- never put token in analytics/log state;
- no unreviewed persistent `localStorage` default;
- role/status come from current server-side identity state.

## 6. Business time

Do not use browser clock/locale to decide:
- working day;
- day close;
- streak;
- annual Score period;
- Monthly Goal cycle.

Frontend may format timestamps for display. Server decides business dates.

# EVENT AND JOB MODEL

**Stage:** 4  
**Delivery guarantee:** asynchronous delivery is `AT_LEAST_ONCE`; business effects are persisted idempotently.

## 1. Event envelope

Every durable outbox/domain integration event uses a versioned envelope conceptually containing:

- `event_id` — stable globally unique identity;
- `event_type`;
- `event_version`;
- `aggregate_type`;
- `aggregate_id`;
- `aggregate_version` where applicable;
- `occurred_at` UTC;
- `business_date_spb` when calendar semantics matter;
- `actor_id` / system actor reference where applicable;
- `correlation_id`;
- `causation_id`;
- payload containing IDs/minimum facts required by the consumer.

Do not copy raw task text, phone numbers or unnecessary sensitive content into queue payloads. Prefer identifiers; consumer re-reads authorized server-side data.

## 2. Outbox publication

1. Business transaction writes domain change + outbox row.
2. Dispatcher claims unpublished rows.
3. Dispatcher submits BullMQ job using stable event ID as transport identity where supported.
4. Dispatcher records publication status.
5. Consumer checks durable processed-message identity before applying side effects.

Crash between publish and mark may duplicate delivery; consumer idempotency is mandatory.

## 3. Inbox / processed-message behavior

Async consumer:
1. start DB transaction;
2. test whether `(consumer, event_id)` was already committed;
3. if yes, return success/no-op;
4. apply business/projection side effect;
5. write processed-message record;
6. commit.

This provides one committed business effect even if delivery repeats.

## 4. Core domain events

| Event | Producer | Typical consumers | Notes |
|---|---|---|---|
| `TaskVersionAccepted` | Case Workflow / Task | AI-processing job dispatcher | raw input already durable |
| `TaskClarificationRequested` | AI Processing | Web read state / notification optional | no score yet |
| `TaskAssessmentCommitted` | Case Workflow | Notifications, Analytics projection | emitted after deterministic finalization transaction |
| `TaskVersionSuperseded` | Case Workflow | Analytics/notification projections | old history remains |
| `TaskSoftDeleted` | Case Workflow | Analytics/notification projections | reversals already committed |
| `ScoreLedgerChanged` | Progression | Rankings, Analytics, Notifications | payload uses IDs/delta metadata, not raw task |
| `HealthStateChanged` | Progression | Notifications, Analytics | meaningful transition |
| `StreakMilestoneReached` | Progression | Notifications, Analytics | one-time milestone semantics |
| `EvolutionStageChanged` | Progression | Notifications, Profile/Pet timeline projection | irreversible progression |
| `AchievementEarned` | Progression | Notifications, Collection projection | earned-only surface |
| `GoalProgressChanged` | Goals | Notifications, Analytics | projection event |
| `GoalCompleted` | Goals | Progression/Notifications/Analytics | reward application itself stays transactional/idempotent |
| `VacationChanged` | Profile/Progression workflow | Analytics/notifications where appropriate | no retroactive rewrite |
| `PersonnelStateChanged` | Personnel sync/admin | Auth/read models | current-state event |
| `DirectorateTransferRecorded` | Personnel | Rankings/Analytics | historical task attribution unchanged |
| `ExportRequested` | Exports | Export worker | authorization snapshot/reference stored server-side |
| `ExportCompleted` | Exports | Notifications | download re-authorized |
| `ExportFailed` | Exports | Notifications/operations | retry/manual recovery possible |

Exact payload schemas are Stage 6/12; exact tables are Stage 5.

## 5. Job catalog

### `job.ai.process-task-version`
**Key:** processing run ID.  
**Durable prerequisite:** raw input + processing run already in PostgreSQL.  
**On duplicate:** no double finalization; persisted processing/finalization state wins.

### `job.export.generate`
**Key:** export request ID.  
**Behavior:** page/stream data, generate XLSX/CSV, store through ObjectStorageProvider, mark terminal state.  
**Failure:** interactive application remains available.

### `job.outbox.dispatch`
Transport task to publish durable outbox records. Failure leaves rows pending.

### `job.notifications.materialize`
Transforms eligible committed events into in-app notifications. Duplicate event = no duplicate notification.

### `job.analytics.project`
Optional/rebuildable read-projection refresh. Failure/lag never changes business truth.

### `job.personnel.sync`
Runs provider sync/import semantics. Real provider contract remains external. Changes current org/personnel state only through Personnel module.

### `job.daily-close.coordinate`
Determines relevant Saint Petersburg business day and fans out idempotent per-employee processing.

### `job.daily-close.employee`
Applies/recalculates Product daily close semantics once for `(employee, business_date)`.

### `job.month-close.coordinate`
Determines Product-defined month-close/first-working-day rollover.

### `job.month-close.employee`
Finalizes previous goals/rewards/recap and establishes new setup gate once for `(employee, goal_period)`.

### `job.annual-rollover`
Opens new annual Score/ranking period while preserving lifetime history.

### `job.ambient-weather.refresh`
Optional non-critical cached context. Provider outage degrades to no weather context.

## 6. Retry classification

### Retryable
- network timeout to external provider;
- transient provider 5xx;
- Redis transport interruption;
- object-storage transient error;
- deadlock/serialization retry condition where transaction semantics permit;
- temporary telemetry failure must not fail unrelated business transaction.

### Non-retryable without corrected input/config
- schema-invalid LLM structured response after terminal policy;
- forbidden authorization;
- invalid/changed idempotency-key payload;
- unsupported/deactivated taxonomy value when no allowed normalization path exists;
- malformed user request.

Exact retry counts/backoff are runtime configuration decided in later implementation/operations stages, not hidden in Stage 4.

## 7. Failed-job handling

A failed transport job is not the authoritative business status.

For durable business workflows:
- processing/export request state is stored in PostgreSQL;
- technical attempt metadata is retained;
- user-visible retry/recovery reads persisted workflow state;
- operations can re-enqueue from persisted state without inventing new business effects.

## 8. Correlation

HTTP request → application command → DB transaction → outbox event → BullMQ job → provider call all propagate correlation IDs.

Provider request/attempt metadata links back to the processing/export workflow but sensitive credentials/content are not emitted to logs.

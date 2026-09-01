# FAILURE MODES

**Stage:** 4  
**Principle:** fail safe, preserve accepted source data, avoid partial deterministic business effects, degrade non-critical capabilities.

| Failure | Required behavior | User/business impact | Recovery |
|---|---|---|---|
| PostgreSQL unavailable before mutation commit | Do not report success | write action unavailable | retry after DB recovery |
| Redis/BullMQ unavailable after task acceptance | Accepted raw task remains in DB/outbox; processing stays pending | delayed AI processing | dispatcher publishes after Redis recovery |
| Worker process unavailable | queued/pending workflows remain durable | delayed AI/export/notifications | restart/scale workers |
| LLM timeout/transient error | no score/game finalization; preserve processing run/raw input | processing delayed/failed state | bounded retry/manual retry path |
| LLM returns malformed structured output | reject provider result; do not silently coerce into score | clarification/failure/retry according Stage 8 | new valid attempt |
| LLM prompt injection in raw text | treat task text as untrusted data; structured schema/domain checks still apply | no privilege/business-rule bypass | log safe metadata, continue/reject result |
| STT failure | do not create fabricated transcript; let user retry or use text | voice path unavailable | retry provider / manual text |
| STT source-audio cleanup fails | mark cleanup/ops event; prevent long-term unintended retention | security/retention risk | privileged cleanup retry; no normal user exposure |
| Personnel provider unavailable at new verification/sync | do not invent personnel result | new login/sync may be blocked | retry provider/mock only in non-prod development |
| Weather provider unavailable | omit weather ambient context | cosmetic degradation only | refresh later |
| Object storage unavailable | export remains failed/pending; core app remains healthy | export delayed | retry generation/upload |
| 3D asset missing/invalid | switch to approved static fallback | visual degradation only | later valid asset deployment |
| WebGL context loss | dispose/reinitialize once policy allows, otherwise fallback | visual degradation only | reload scene/fallback |
| 3D memory/performance capability insufficient | use lower/degraded/static path; no measured claim | visual degradation only | capability path |
| Duplicate HTTP command | persisted idempotency returns same outcome or rejects key reuse mismatch | no double business effect | no-op/original response |
| Duplicate BullMQ delivery | processed-message/idempotent business key prevents second effect | none | no-op |
| Outbox crash after publish before mark | event may be re-published | none if consumer is idempotent | duplicate-safe retry |
| Crash during finalization transaction | DB rollback prevents partial score/goals/game state | processing remains retryable | re-run finalization |
| Task edit arrives while old processing run is active | only eligible/current version may become effective; stale result cannot overwrite newer version | old run becomes stale/superseded | ignore/mark stale |
| Task soft-delete after scoring | deterministic reversal/supersession required; history retained | current totals update | retry idempotent reversal |
| Daily-close job runs twice | deterministic business key makes second execution no-op/recalculation to same result | none | no-op |
| Month-close job runs twice | one period/user close result | none | no-op |
| Annual rollover runs twice | one annual-period opening/reset semantic | none | no-op |
| Analytics projection lag | show source-consistent transactional data where required; derived dashboard may lag | temporary stale aggregate | projection catches up/rebuild |
| Analytics cache corrupted/lost | never affects score/game source truth | slower reads | rebuild from PostgreSQL |
| Notification worker failure | originating business change remains committed | notification delayed/missed until retry | re-materialize event |
| Audit write fails for required audited mutation | rollback critical mutation | operation fails safely | retry mutation |
| Telemetry backend unavailable | business path continues; local structured logs/buffer per later ops policy | reduced observability | telemetry recovers |
| Client loses network after successful POST | retry with same idempotency key | response uncertainty only | original result returned |
| Client clock/timezone wrong | server business calendar remains authoritative | display only | server values win |
| External provider returns unexpected employee/tool/model identity | validate/mapping layer rejects or quarantines unknown; never invent canonical identity | workflow may require correction | admin/provider mapping |
| Secret missing/misconfigured | provider integration fails closed | affected integration unavailable | correct environment secret |
| Backup/restore process failure | production readiness gate fails | release/operations blocker later | remediate before production |
| Final corporate SSO/cloud constraint conflicts with frozen stack | do not silently adapt after coding starts | architecture change request | reopen Stage 3/4 explicitly |

## Failure-state rule

A UI `success` state is shown only after its corresponding durable server state has committed.

For asynchronous flows, `accepted/pending` is distinct from `completed`.

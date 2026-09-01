# DATA LIFECYCLE

## Durable Product history

Indefinite under current Product baseline: task/version history, historical directorate attribution, score/XP ledger, goal contribution history, earned progression, audit records required for traceability.

## Soft deletion

Task delete marks the logical task deleted and preserves all versions/ledger/audit. Employee termination/hiding never rewrites historical attribution.

## Raw task and AI data

Accepted raw task input is persisted before downstream AI processing. AI runs, model/rule/prompt/schema versions and clarification history are retained for reproducibility. Operational logs/traces must not duplicate raw prompt/task content by default.

## Voice

Source audio is transient only. STT transcript may be stored; audio must be removed after recognition/preview transport. `stt_runs.source_audio_deleted_at` records cleanup state where applicable.

## Exports/object storage

Generated export artifacts use a configured expiry policy. The DB keeps export job/audit metadata; exact production artifact TTL is not source-defined.

## Redis/queues

Redis/BullMQ is non-authoritative. Durable outbox/inbox/idempotency records in PostgreSQL protect business state from queue loss/replay.

## Technical retention

Session, provider-attempt, idempotency, outbox and telemetry retention windows are production configuration/governance parameters; this document does not invent durations.

## Backup

Stage‑14 requires encrypted backups and tested restoration. RPO/RTO/cadence remain production values to be supplied without changing domain semantics.

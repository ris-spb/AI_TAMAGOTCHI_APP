# INDEX STRATEGY

Stage‑5 remediation keeps indexes focused on current P0 access paths and does not invent partitioning/search extensions without volume evidence.

- Personnel/auth: personnel number unique; current directorate/status; one open history/assignment row; session employee/expiry access.
- Task/history: employee+SPB date, historical directorate+date, one current version, assessed complexity/category, links/tags/tools.
- AI/STT: version/status/run lookups, clarification run/sequence, evidence by processing run.
- Score/game/goals: employee/date, historical directorate/date, source/reversal, pet events, daily activity, monthly cycles/options/goals/matches, lifetime milestone uniqueness.
- Ranking/notifications/exports/audit: snapshot rank, unread notifications, request status, audit entity/actor.
- Infrastructure: provider correlation, unpublished outbox, aggregate ordering, idempotency result lookup, scheduled-job status.

Explicit Stage‑5 index statements: **47**. PostgreSQL PK/UNIQUE constraints create additional implicit indexes and are not double-counted here.

Partitioning/BRIN/trigram/full-text indexes remain evidence-driven implementation tuning, not a Product semantic dependency.

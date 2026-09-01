# ADR-012 — Allow rebuildable asynchronous projections for analytics/ranking/notifications

**Status:** ACCEPTED  
**Stage:** 4 — Solution Architecture Freeze

## Context
Dashboards, rankings, notifications and exports can be expensive, but their latency must not weaken scoring/game consistency. Product also targets responsive Home/leaderboard/dashboard reads.

## Decision
Keep task/version/ledger/goal/personnel records authoritative in PostgreSQL. Allow rebuildable projections/caches for analytics/ranking/notification reads, updated from committed events. No deterministic business decision may read an eventually consistent projection as its authority.

## Consequences
Read paths can be optimized independently and rebuilt after cache/projection loss. Temporary projection lag does not corrupt product state.

## Alternatives considered
Using only synchronous cross-domain joins for every dashboard was not frozen because it may not meet scale/performance needs. Making projections authoritative was rejected because lag/rebuild would change product semantics.

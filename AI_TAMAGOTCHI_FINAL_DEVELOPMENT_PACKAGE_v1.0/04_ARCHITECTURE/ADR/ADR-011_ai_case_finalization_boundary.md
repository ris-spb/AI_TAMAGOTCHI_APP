# ADR-011 — Separate probabilistic AI processing from deterministic case finalization

**Status:** ACCEPTED  
**Stage:** 4 — Solution Architecture Freeze

## Context
The Product permits AI classification/evidence extraction but forbids LLM numerical scoring and manual arbitrary score changes. A failed or stale AI run must not partially mutate game state.

## Decision
MOD-AI produces a typed, schema-validated assessment/evidence result only. MOD-CASE-WORKFLOW checks run/version eligibility and invokes Task, Goals and Progression deterministic services inside one DB transaction. LLM/STT providers never write DB state directly.

## Consequences
Prompt/model changes cannot silently alter backend formulas. Stale runs can be rejected. Reprocess/delete can use explicit reversal semantics. AI provider failure preserves accepted raw input.

## Alternatives considered
Putting scoring/game writes in the LLM worker was rejected. Client-side scoring was rejected. Fully synchronous LLM processing in the submission request was rejected because it couples accepted-input durability and latency to provider availability.

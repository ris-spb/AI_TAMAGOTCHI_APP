# CAPABILITY KNOWLEDGE CONTRACT

## Purpose

Plausibility checking requires versioned knowledge about AI-tool capabilities without permanently hardcoding volatile statements into prompts or application code.

## Record semantics

A capability-knowledge version is an immutable released snapshot referenced by AI processing metadata.

Each fact should support:
- canonical tool ID;
- capability key/statement;
- support status such as `supported`, `unsupported`, `conditional`, `unknown`;
- effective/reviewed time metadata;
- evidence/source reference managed by the organization;
- notes/conditions;
- version identity.

Exact physical table design follows Stage 5; this document defines runtime behavior.

## Runtime rules

1. Load only the active released snapshot selected by trusted backend configuration.
2. Do not let LLM invent capability records.
3. Missing knowledge means **unknown**, not unsupported.
4. `unsupported`/`conditional` knowledge may lead to `capability_conflict` or clarification, never an accusation.
5. Capability uncertainty never directly subtracts Score.
6. Historical processing keeps the version identity that was active then.
7. A changed knowledge snapshot requires a new version; do not mutate historical facts in place.

## Seed policy

Stage 8 does **not** invent a capability matrix for the 36 starter tools. A curated corporate/current dataset remains a non-blocking content dependency. Until a fact is known, runtime follows the `unknown → clarify when useful → trust employee after limit` path.

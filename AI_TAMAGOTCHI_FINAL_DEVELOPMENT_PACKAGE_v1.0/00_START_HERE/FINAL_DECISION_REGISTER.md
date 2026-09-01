# FINAL DECISION REGISTER

**Stage:** 1  
**Entries:** 44  
Historical OPEN states do not override later owner/remediation resolutions.

| ID | Topic | Source status | Normalized status | Current decision/baseline | Freeze impact | Owner action |
|---|---|---|---|---|---|---|
| GOV-001 | Source hierarchy | `CURRENT` | `RESOLVED_FROM_SOURCE` | Precedence: latest explicit owner decision → latest current approval/remediation/final decision → current visual developer handoff → Product Specification → Design Specification → Development Readiness recommendation → preliminary artifacts. Model assumptions are never requirements. | NO | NONE |
| OD-001 | AI-case semantics | `RESOLVED` | `RESOLVED_BY_OWNER` | Completed AI-assisted work case; no future to-do lifecycle. | NO | NONE |
| OD-002 | Mobile navigation | `RESOLVED` | `RESOLVED_BY_OWNER` | Главная / История / Рейтинг / Профиль. | NO | NONE |
| OD-003 | Home CTA | `RESOLVED` | `RESOLVED_BY_OWNER` | Добавить AI-задачу. | NO | NONE |
| OD-004 | Home Score/rank | `RESOLVED` | `RESOLVED_BY_OWNER` | Annual Score/rank is not persistent on Home; use Rating/Profile. | NO | NONE |
| OD-005 | Home Evolution XP | `RESOLVED` | `RESOLVED_BY_OWNER` | Evolution XP is not persistent on Home; use Profile/Evolution/result. | NO | NONE |
| OD-006 | Home Goals | `RESOLVED` | `RESOLVED_BY_OWNER` | Compact Monthly Goals progress summary only on Home. | NO | NONE |
| OD-013 | Canonical mascot | `RESOLVED` | `RESOLVED_BY_OWNER` | Exact user-approved Lyuboznayka JPEG is canonical. | NO | NONE |
| OD-014 | Pulkovo environment | `RESOLVED` | `RESOLVED_BY_OWNER` | Approved Pulkovo interior/composition image is canonical environment reference. | NO | NONE |
| OD-015 | Legal/brand review | `WAIVED_NON_BLOCKING` | `RESOLVED_BY_OWNER` | Legal/brand review does not block project sequence; this is not independent legal clearance. | NO | NONE |
| OD-019 | 3D runtime | `RESOLVED_BASELINE` | `RESOLVED_BY_OWNER` | HYBRID + Three.js + WebGL2-capable web/PWA + glTF2/GLB. | NO | NONE |
| OD-020 | 3D coordinates | `RESOLVED` | `RESOLVED_BY_OWNER` | 1m units; right-handed glTF; Y-up. | NO | NONE |
| OD-024 | Physical-device validation | `WAIVED_NON_BLOCKING` | `RESOLVED_BY_OWNER` | Stage-16 physical-device testing is waived/non-blocking; no measured claims may be invented. | NO | NONE |
| OD-032 | License/provenance gating | `WAIVED_NONBLOCKING` | `RESOLVED_BY_OWNER` | License/provenance workflow is retained for traceability but does not block sequence. | NO | NONE |
| OD-007 | Online-only vs offline shell | `OPEN` | `DEFERRED_NONBLOCKING` | Online-only mutations; static/cached shell may render without changing data. | NO | DEFER_UNTIL_RELEVANT_GATE |
| OD-008 | Sound scope | `OPEN` | `DEFERRED_NONBLOCKING` | MVP has no sound dependency. | NO | DEFER_UNTIL_RELEVANT_GATE |
| OD-009 | Ambient mascot text | `OPEN` | `DEFERRED_NONBLOCKING` | No persistent Home speech bubble; ambient copy may be deferred. | NO | DEFER_UNTIL_RELEVANT_GATE |
| OD-010 | Pet-interaction UX | `OPEN` | `DEFERRED_NONBLOCKING` | No permanent game-button row on Home. | NO | DEFER_UNTIL_RELEVANT_GATE |
| OD-011 | Home HP presentation | `OPEN` | `DEFERRED_NONBLOCKING` | Mascot state + detail-on-demand; no persistent HP bar. | NO | DEFER_UNTIL_RELEVANT_GATE |
| OD-012 | Four lighting states release scope | `OPEN` | `DEFERRED_NONBLOCKING` | Day baseline; morning/evening/night remain derivative states. | NO | DEFER_UNTIL_RELEVANT_GATE |
| OD-016 | Final app identity/logo | `OPEN` | `DEFERRED_NONBLOCKING` | Do not invent final app logo; use neutral identity until supplied. | YES | DEFER_UNTIL_RELEVANT_GATE |
| OD-017 | Final runtime font family/license | `OPEN` | `DEFERRED_NONBLOCKING` | Inter + system fallbacks as replaceable Stage-20 baseline. | YES | DEFER_UNTIL_RELEVANT_GATE |
| OD-018 | Final scene-level color calibration | `OPEN` | `DEFERRED_NONBLOCKING` | Use current token palette; final scene tuning may adjust approved values. | YES | DEFER_UNTIL_RELEVANT_GATE |
| OD-021 | Evidence-backed LOD budgets | `OPEN` | `DEFERRED_NONBLOCKING` | Use proxy LOD guidance only; no benchmark-certified numbers. | YES | DEFER_UNTIL_RELEVANT_GATE |
| OD-022 | Memory/file-size budgets | `OPEN` | `DEFERRED_NONBLOCKING` | Use lazy-load/dispose/fallback policy; no measured numeric budget claimed. | YES | DEFER_UNTIL_RELEVANT_GATE |
| OD-023 | KTX2 pipeline | `OPEN` | `DEFERRED_NONBLOCKING` | Keep compatible non-KTX2 path; KTX2 optional until validated. | YES | DEFER_UNTIL_RELEVANT_GATE |
| OD-025 | Numeric camera/FOV/safe zones | `OPEN` | `DEFERRED_NONBLOCKING` | Use responsive framing specs; numeric tuning remains open. | YES | DEFER_UNTIL_RELEVANT_GATE |
| OD-026 | Numeric runtime lighting | `OPEN` | `DEFERRED_NONBLOCKING` | Use directional lighting specs; numeric tuning remains open. | YES | DEFER_UNTIL_RELEVANT_GATE |
| OD-027 | Final animation tuning | `OPEN` | `DEFERRED_NONBLOCKING` | Use current Stage-20 motion implementation values. | YES | DEFER_UNTIL_RELEVANT_GATE |
| OD-028 | Achievement/cosmetic release art | `OPEN` | `DEFERRED_NONBLOCKING` | Use generic badge/icon fallback; do not invent release-specific art. | YES | DEFER_UNTIL_RELEVANT_GATE |
| OD-029 | Evolution branch visual art | `OPEN` | `DEFERRED_NONBLOCKING` | Do not invent final branch-specific art. | YES | DEFER_UNTIL_RELEVANT_GATE |
| OD-030 | Live Figma workspace/master link | `OPEN` | `DEFERRED_NONBLOCKING` | Use file-based handoff; no live Figma link is available. | YES | DEFER_UNTIL_RELEVANT_GATE |
| OD-031 | Named approvers/freeze date | `OPEN` | `DEFERRED_NONBLOCKING` | Role ownership exists; named production approvers/freeze date remain unset. | YES | DEFER_UNTIL_RELEVANT_GATE |
| PROD-D-001 | Task score mapping | `SOURCE` | `RESOLVED_FROM_SOURCE` | C1/C2/C3/C4/C5 = 1/5/15/40/100; AI chooses C-level only, backend supplies number. | NO | NONE |
| PROD-D-002 | Manual score override | `SOURCE` | `RESOLVED_FROM_SOURCE` | No role can manually change task Complexity/Score. | NO | NONE |
| PROD-D-003 | Clarification limit | `SOURCE` | `RESOLVED_FROM_SOURCE` | Maximum three questions total per task version; after limit trust employee and continue. | NO | NONE |
| PROD-D-004 | HP inactive-day baseline | `SOURCE` | `RESOLVED_FROM_SOURCE` | Current baseline = -30 HP per inactive working day; balance-calibratable but not silently changeable. | NO | NONE |
| PROD-D-005 | HP recovery baseline | `SOURCE` | `RESOLVED_FROM_SOURCE` | C1/C2/C3/C4/C5 = +10/+15/+25/+35/+45 HP; +2 per additional valid task. | NO | NONE |
| PROD-D-006 | Streak Shield | `SOURCE` | `RESOLVED_FROM_SOURCE` | Streak Shield is excluded. | NO | NONE |
| PROD-D-007 | Monthly Goal selection | `SOURCE` | `RESOLVED_FROM_SOURCE` | Generate 5; employee selects 2; system assigns immutable third goal. | NO | NONE |
| PROD-D-008 | Goal reward baseline | `SOURCE` | `RESOLVED_FROM_SOURCE` | Annual Score +15/goal +15 all-three; Evolution XP +10/goal +10 all-three. | NO | NONE |
| PROD-D-009 | Historical directorate attribution | `SOURCE` | `RESOLVED_FROM_SOURCE` | Task/version retains directorate attribution at task time; transfer does not move historical points. | NO | NONE |
| PROD-D-010 | Historical retention | `SOURCE` | `RESOLVED_FROM_SOURCE` | Task versions/deletions/system events are retained indefinitely. | NO | NONE |
| READINESS-D-001 | Readiness proposal authority | `PROPOSED/REQUIRES APPROVAL` | `RESOLVED_FROM_SOURCE` | Development Readiness v0.1 recommendations are advisory unless independently confirmed by a higher-precedence current source. | NO | NONE |

## Interpretation
- `RESOLVED_BY_OWNER`: do not reopen unless the Project Owner explicitly changes it later.
- `RESOLVED_FROM_SOURCE`: current normative source rule.
- `DEFERRED_NONBLOCKING`: preserve the current implementation baseline and keep the item visible until its later gate.
- A legal/performance waiver is a workflow decision, not evidence that the waived review/test occurred.
- Readiness Pack proposals remain advisory unless separately confirmed.

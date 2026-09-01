# FEATURE FLAGS BASELINE

**Stage:** 2  
**Purpose:** define rollout/degradation switches without allowing flags to violate normative product invariants.

## 1. Flag classes

- `RUNTIME` — a controlled runtime capability may be enabled/disabled without changing stored business semantics.
- `DEPENDENCY_AVAILABILITY` — indicates whether an external/final asset is physically available; fallback remains required.
- `HARD_DISABLED_MVP` — explicit out-of-scope feature. It must default `false` and must not be enabled in an MVP build.
- `NOT_A_FLAG` — core product invariant; coding must implement it directly.

## 2. MVP runtime/dependency baseline

| Key | Class | MVP default | Contract |
|---|---|---:|---|
| `ff.realtime3d` | RUNTIME | `true` | Attempt approved Hybrid realtime path when capable; automatic approved fallback on load/runtime failure. Functional UI never depends on success. |
| `ff.dynamicLightingVariants` | RUNTIME | `false` | Day is baseline. Morning/evening/night remain deferred derivatives. |
| `ff.ktx2` | RUNTIME | `false` | Optional only; non-KTX2 path must remain valid. |
| `ff.voiceStt` | RUNTIME | `true` | Voice flow is MVP; provider is replaceable. |
| `ff.inAppNotifications` | RUNTIME | `true` | In-app notification center/events are MVP. |
| `ff.ambientContext` | RUNTIME | `true` | Max 1–2/day; Saint Petersburg-only context; no news/politics/complex search. |
| `dep.weatherProviderAvailable` | DEPENDENCY_AVAILABILITY | `false` | Realtime weather is optional; ambient layer must remain valid without a weather provider. |
| `ff.petLightInteractions` | RUNTIME | `true` | Lightweight visual interactions; no gameplay benefit, no sound, no permanent game-action row. |
| `ff.exports` | RUNTIME | `true` | XLSX/CSV within role scope. |
| `asset.evolutionBranchArtAvailable` | DEPENDENCY_AVAILABILITY | `false` | Branch mechanics remain enabled; canonical/base visual treatment until final branch art exists. |
| `content.achievementInventoryFrozen` | DEPENDENCY_AVAILABILITY | `false` | ~20–30 is a planning orientation only; do not invent final achievement inventory before content freeze. |
| `asset.releaseSpecificAchievementArtAvailable` | DEPENDENCY_AVAILABILITY | `false` | Earned-item mechanics remain; use generic approved badge/icon fallback. |
| `asset.finalBrandIdentityAvailable` | DEPENDENCY_AVAILABILITY | `false` | Do not invent final logo; neutral/text identity until supplied. |
| `asset.finalProduction3dAvailable` | DEPENDENCY_AVAILABILITY | `false` | Final production mascot/world GLBs are external; static fallback remains canonical runtime safety path. |

## 3. Hard-disabled MVP capabilities

| Key | Default | Reason |
|---|---:|---|
| `ff.nativeApps` | `false` | Native apps out of MVP. |
| `ff.offlineMutation` | `false` | Online-only mutation/auth. |
| `ff.externalNotificationChannels` | `false` | Push/email/Telegram/Teams out of MVP. |
| `ff.taskAttachments` | `false` | File attachments out of MVP. |
| `ff.taskUrlFetch` | `false` | URLs are stored only; no crawler/preview/analysis. |
| `ff.socialFeatures` | `false` | No likes/comments/follows/social feed. |
| `ff.currencyShop` | `false` | No internal currency/shop. |
| `ff.sound` | `false` | Sound out of MVP. |
| `ff.backdatedTasks` | `false` | Task date = registration date. |
| `ff.historicalAutoReclassification` | `false` | Historical versions retain their taxonomy/version semantics. |
| `ff.streakShield` | `false` | Explicitly excluded. |
| `ff.scoringRetrainingLoop` | `false` | Future unscheduled. |
| `ff.flexibleRetentionPolicy` | `false` | Future unscheduled; current MVP retains indefinitely. |
| `ff.publicDirectorateBreakdown` | `false` | Requires separate future product decision. |
| `ff.productionSso` | `false` | SSO/Entra ID/2FA is future unscheduled; current MVP auth remains. |
| `ff.hrVacationSync` | `false` | Automatic HR vacation integration is future unscheduled. |
| `ff.resourceAnalysis` | `false` | Automatic external/attached-resource analysis is future unscheduled. |
| `ff.advancedMaturityAnalytics` | `false` | Advanced maturity analytics is future unscheduled. |
| `ff.additionalMascots` | `false` | Additional pets/mascots are future unscheduled. |

These are scope guards, not invitations to ship disabled code paths that have not been designed/tested.

## 4. Core invariants that MUST NOT be feature flags

The following must not be switchable at runtime in the MVP:

- AI-case = completed AI-assisted work use case;
- maximum 3 clarification questions;
- C1–C5 numerical mapping `1 / 5 / 15 / 40 / 100`;
- no manual Score/Complexity override;
- backend RBAC/object authorization/privacy;
- task versioning / soft delete / audit trail;
- deterministic Score/HP/XP/Goal calculations;
- historical directorate attribution;
- indefinite retention under current Product rule;
- no peer raw-input/clarification/link access;
- Streak Shield absent;
- four current mobile nav destinations;
- exact Home CTA `Добавить AI-задачу`;
- TLS / encryption-at-rest / rate limiting / secrets handling / backup-restore;
- accepted-raw-input durability and idempotency invariants.

If a production emergency requires disabling a write path, that is an operational kill switch designed in later architecture/operations stages, not a product feature flag.

## 5. Flag persistence and governance boundary

Stage 2 does not choose the flag service, configuration store or deployment mechanism.  
Stage 3/4 must implement a provider-neutral configuration approach that:
- has explicit defaults;
- is auditable for production changes;
- cannot enable `HARD_DISABLED_MVP` items accidentally;
- separates external-asset availability from business semantics;
- supports deterministic test fixtures.

No feature-flag vendor is selected in Stage 2.

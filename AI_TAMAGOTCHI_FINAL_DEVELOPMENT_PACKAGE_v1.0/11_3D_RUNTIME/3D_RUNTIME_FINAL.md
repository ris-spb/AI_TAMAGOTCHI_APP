# 3D RUNTIME FINAL — HYBRID CONTRACT

**Stage:** 11 — 3D Runtime  
**Status:** `IMPLEMENTABLE_WITH_APPROVED_FALLBACKS / FINAL_REALTIME_BINARIES_EXTERNAL`  
**Authority:** current Source of Truth + current unsuffixed Stage-20 visual handoff.

## 1. Purpose

This document freezes the application-side Hybrid 3D runtime contract. It does **not** manufacture missing DCC assets and does not convert Stage-16 technical spike GLBs into production art.

The 3D layer is an optional visual subsystem of Home. Functional application behavior must remain available before the scene loads, while it loads, after it loads, and if it fails permanently.

## 2. Frozen runtime baseline

| Topic | Contract | Status |
|---|---|---|
| Architecture | Hybrid realtime + static fallback | `RESOLVED_BY_OWNER` |
| Engine | Three.js; R3F allowed only inside isolated 3D boundary | `RESOLVED_FROM_SOURCE` |
| Browser capability | WebGL2-capable web/PWA path | `RESOLVED_BY_OWNER` |
| Runtime interchange | glTF 2.0 / GLB | `RESOLVED_BY_OWNER` |
| Coordinates | right-handed glTF, Y-up, 1 unit = 1 meter | `RESOLVED_BY_OWNER` |
| Forward convention | local camera/asset -Z where applicable | `RESOLVED_FROM_SOURCE` |
| Runtime production source | only `08_PRODUCTION_EXPORTS/` | `RESOLVED_FROM_SOURCE` |
| KTX2 | optional; non-KTX2 compatible path mandatory | `DEFERRED_NONBLOCKING` |
| Device performance evidence | no measured claims; physical tests waived | `RESOLVED_BY_OWNER` |
| Numeric camera/light tuning | not frozen; live profile is configuration/external tuning | `DEFERRED_NONBLOCKING` |

Canonical visual references remain:
- mascot: `03_MASCOT_LYUBOZNAYKA/01_References/MSC_Lyuboznayka_Canonical_UserApproved_v1.0.jpeg`;
- Pulkovo: `04_PULKOVO_WORLD/01_Approved_References/REF_PULKOVO_Interior_Composition_UserApproved_v2.0.png`.


## 3. Runtime package boundary

`packages/3d-runtime` (or equivalent monorepo package defined by the repository blueprint) owns:
- Three.js scene creation and disposal;
- GLB/texture loading;
- camera/framing application;
- animation mixer and visual event arbitration;
- capability detection and runtime tier selection;
- WebGL context loss/recovery handling;
- fallback selection signal;
- resource disposal.

It does **not** own:
- HP, Streak, Score, XP, Goals, achievements or ranking calculations;
- authoritative pet/business state;
- task mutation;
- persistence;
- permissions;
- backend API truth.

The React application owns the DOM UI, navigation, CTA, accessibility text and business-state presentation. The 3D subsystem consumes semantic visual inputs only.

## 4. `SceneHostBoundary` contract

### Inputs

The host may pass only already-authoritative semantic values/events, for example:
- `petHealthState`: `happy | normal | bored | tired | very_weak | coma`;
- `isVacation`: boolean;
- `evolutionStageId`: server-derived E1–E5 identifier;
- `visualEvent`: semantic event such as `case_success_short`, `case_success_strong`, `streak_milestone`, `goal_complete`, `achievement_awarded`, `pet_interaction`, `ambient_reaction`;
- `prefersReducedMotion`;
- viewport + safe-area geometry;
- realtime feature/capability flags;
- validated camera/light runtime profile when live 3D is enabled.

The 3D package never derives HP or XP from numeric inputs and never decides whether a reward has been earned.

### Lifecycle states

`uninitialized → preview → loading_core → live`

Alternative/degradation states:
- `unsupported` — WebGL2 path unavailable;
- `degraded` — live scene remains usable at a lower tier;
- `context_lost` — renderer context lost and recovery policy is active;
- `fallback` — static production fallback is authoritative visual layer;
- `disposed` — scene resources released.

These lifecycle labels are `SAFE_ENGINEERING_DEFAULT` implementation vocabulary; they do not alter product state.

### Outputs

The boundary may expose:
- lifecycle state;
- selected runtime tier `A | B | C | F`;
- safe asset-load diagnostics/telemetry;
- `isLiveSceneReady`;
- `fallbackReason` as a technical code.

It must not emit Score/HP/XP mutations or business events.

## 5. Home composition invariants

- Lyuboznayka is the emotional focus.
- Mascot target visual height is approximately 30–45% of usable Home viewport.
- Face/eyes are a no-overlay/no-critical-crop zone.
- Functional UI/readability has priority over decorative 3D.
- Wider viewports reveal more terminal context rather than scaling the mascot linearly.
- Persistent Home remains limited to the approved UI contract; 3D must not reintroduce Score/rank, Evolution XP, numeric HP bar or a game-action row.
- Day is the baseline lighting state.

## 6. Production-asset gate

A file may be loaded as production visual content only if all are true:
1. its runtime path resolves under `08_PRODUCTION_EXPORTS/`;
2. it is current in the canonical handoff/Asset Manifest;
3. it is not a Stage-16 `SPK_*` technical proxy;
4. its status permits runtime use;
5. the file physically exists in the build input.

A documentation reference is never proof that a binary exists.

## 7. Current physical reality

Current visual handoff reports:
- physical runtime visual set: **56** files = **51 SVG + 5 WebP fallbacks**;
- final production GLB: **0**;
- final KTX2: **0**;
- package GLBs outside production exports are technical proxy/spike assets only.

Therefore Stage 11 freezes an executable integration contract and fallback path, not a claim that realtime production art is already materialized.

## 8. Error and isolation policy

- Any 3D exception is contained by `SceneHostBoundary`.
- 3D errors must not unmount the application shell.
- Route changes, task entry, History, Rating and Profile remain functional.
- Secondary world asset failure degrades only that layer.
- Core load failure selects a static fallback rather than blocking Home.
- WebGL context loss is handled centrally; repeated/unrecoverable loss leads to Tier F without changing business state.
- Exiting the heavy scene disposes unused GPU resources.

No exact retry counts/timing are frozen here; Stage 13 runtime config and Stage 15 tests own executable values/gates.

## 9. Reduced Motion

`prefers-reduced-motion: reduce` must:
- remove bounce and substantial squash/stretch;
- suppress nonessential ambient motion;
- retain state recognition and functional feedback;
- use restrained fade/static pose where needed.

Reduced Motion is accessibility behavior, not a business-state change.

## 10. Dependencies on later stages

- Stage 12: other external adapters only; does not own final DCC production.
- Stage 13: numeric camera/light/performance-protection runtime config slots.
- Stage 14: 3D telemetry/logging/security boundaries.
- Stage 15: executable visual/fallback/context-loss/performance contract tests.
- Stage 17: implementation tasks.

## 11. Gate

Stage 11 is complete when the runtime can be coded against this contract **without inventing final GLB/KTX2 files or measured device performance**. External realtime binaries remain explicit non-blocking production dependencies because approved static fallbacks preserve the functional MVP.

# ANIMATION STATE MAPPING

**Stage:** 11  
**Rule:** animation reflects already-committed business state; it never calculates or awards gameplay value.

## 1. Current clip-name contract

Current developer handoff recommends these clip bindings for the final mascot asset:
- `MSC_IDLE_BASE`
- `MSC_IDLE_BORED`
- `MSC_TIRED`
- `MSC_VERY_WEAK`
- `MSC_COMA_LOOP`
- `MSC_RECOVERY`
- `MSC_REACT_SUCCESS_SHORT`
- `MSC_REACT_SUCCESS_STRONG`
- `MSC_STREAK_MILESTONE`
- `MSC_GOAL_COMPLETE`

These are runtime binding names/spec expectations, **not proof that animation binaries currently exist**.

## 2. Persistent health-state mapping

| Server/game state | Primary clip | Priority | Loop |
|---|---|---:|---|
| `coma` | `MSC_COMA_LOOP` | 100 | yes |
| recovery active/event | `MSC_RECOVERY` | 95 | source-dependent |
| `very_weak` | `MSC_VERY_WEAK` | 90 | yes/idle |
| `tired` | `MSC_TIRED` | 80 | yes/idle |
| `bored` | `MSC_IDLE_BORED` | 70 | yes |
| `normal` | `MSC_IDLE_BASE` | 60 | yes |
| `happy` | `MSC_IDLE_BASE` | 60 | yes |

Priority numbers are local `SAFE_ENGINEERING_DEFAULT` arbitration weights, not game balance.

## 3. Event mapping

| Semantic event received from application | Preferred clip | Notes |
|---|---|---|
| `case_success_short` | `MSC_REACT_SUCCESS_SHORT` | event intensity is supplied by business/UI layer; 3D does not inspect Score |
| `case_success_strong` | `MSC_REACT_SUCCESS_STRONG` | same rule |
| `streak_milestone` | `MSC_STREAK_MILESTONE` | event already earned by Stage-7 engine |
| `goal_complete` | `MSC_GOAL_COMPLETE` | event already earned by Stage-7 engine |
| `achievement_awarded` | `MSC_REACT_SUCCESS_STRONG` | generic current fallback; release-specific art/clip not invented |
| `pet_interaction` | dedicated final clip if supplied; otherwise non-3D/UI feedback | P0 logical interaction remains, final dedicated clip binding is external production |
| `ambient_reaction` | compatible idle/head-look behavior only if present in final asset | frequency/copy cap is controlled outside 3D |

The runtime must not derive `case_success_strong` from complexity/points on its own.

## 4. Arbitration

Ordering:
1. coma/recovery safety state;
2. persistent health state;
3. committed milestone/goal/success/achievement event;
4. user pet interaction;
5. ambient reaction.

Rules:
- higher-priority health/coma/recovery interrupts lower-priority reactions;
- reward animation may be interrupted after the underlying business transaction is already committed;
- renderer recovery must not replay a previously consumed reward event;
- event IDs must be deduplicated by the UI/runtime boundary so remount/retry does not produce duplicate visual celebration;
- ambient motion yields immediately to Reduced Motion or performance degradation.

## 5. Evolution/branch visuals

Evolution stage and branch remain authoritative business state, but final branch-specific art is not frozen.

Until approved branch variants exist:
- use the canonical/base mascot representation;
- do not invent recolors, appendages, outfits or branch geometry;
- do not regress/advance evolution because a visual asset is unavailable;
- branch selection remains functional outside the 3D art dependency.

## 6. Streak mapping

The 3D layer receives only `streak_milestone` events. It must not:
- determine active working days;
- reset/increment streak;
- compute milestone XP;
- infer vacation/non-working-day semantics.

Those rules remain solely in Stage 7.

## 7. Reduced Motion

When Reduced Motion is enabled:
- suppress bounce and material squash/stretch;
- health state may use static pose/first safe frame;
- reward state uses restrained fade/state accent rather than large motion;
- coma/critical semantics remain perceivable without motion;
- no gameplay event is lost merely because animation is suppressed.

## 8. Timing

Source timing orientation remains:
- mascot/reaction: 400–1200 ms;
- major achievement: up to about 1.5–2.0 s;
- Stage-20 current implementation values may be used as replaceable baseline;
- final per-clip tuning remains `OD-027` and is not silently converted to source truth.

`PRD-PETACT-001` explicitly requires a short **2–3 second** interaction. The interaction duration is product-level, but its final 3D clip is external; UI fallback must preserve the short interaction even if the dedicated 3D clip is absent.

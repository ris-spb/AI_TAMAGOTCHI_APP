# MISSING EXTERNAL 3D ASSETS

**Stage:** 11  
**Classification:** explicit external production gaps; do not fabricate.

## 1. Current critical realtime gaps

| Severity | Asset ID | Required output | Runtime requirement | Fallback / degradation |
|---|---|---|---|---|
| CRITICAL | `MSC-EXT-001` | final canonical Lyuboznayka runtime GLB | required for live mascot | current state-safe WebP/UI fallback |
| CRITICAL | `WLD-EXT-001` | final Pulkovo Terminal Core GLB | required for live core environment | current Home Day / 3D Unavailable fallback |
| HIGH | `WLD-EXT-002` | Terminal Background GLB | secondary | omit/lazy; core can remain live |
| MEDIUM | `WLD-EXT-003` | Furniture GLB | secondary | omit/lazy |
| MEDIUM | `WLD-EXT-004` | Signage GLB | optional/eligibility-sensitive | omit unapproved/ineligible signage |
| LOW | `WLD-EXT-005` | Background Characters GLB | ambient only | disable actors |
| OPTIONAL | `TEX-EXT-001` | KTX2 texture set | optional compressed path | non-KTX2 compatible textures |

## 2. Animation materialization gap

The final mascot GLB must carry or accompany the current runtime clip contract. Documentation names clips but does not prove animation tracks are physically present.

Current logical bindings expected where applicable:
`MSC_IDLE_BASE`, `MSC_IDLE_BORED`, `MSC_TIRED`, `MSC_VERY_WEAK`, `MSC_COMA_LOOP`, `MSC_RECOVERY`, `MSC_REACT_SUCCESS_SHORT`, `MSC_REACT_SUCCESS_STRONG`, `MSC_STREAK_MILESTONE`, `MSC_GOAL_COMPLETE`.

Dedicated pet-interaction/ambient gaze animation materialization is not fully frozen. Runtime must preserve UI/non-3D feedback instead of inventing a binary.

## 3. Current production fallbacks that *are* available

Current final visual handoff reports five production WebP fallbacks in `08_PRODUCTION_EXPORTS/FALLBACK/`:
- Loading Preview;
- 3D Unavailable;
- Home Day v2;
- canonical-derived Happy mascot v2;
- canonical-derived Coma mascot v2.

These assets make missing realtime binaries non-blocking for functional MVP implementation, but they do not make Full Realtime Production Freeze complete.

## 4. Missing/unfinished freeze data — non-binary

The following remain `DEFERRED_NONBLOCKING` rather than owner blockers:
- `OD-021`: evidence-backed final LOD budgets;
- `OD-022`: memory/file-size numeric budgets;
- `OD-023`: validated KTX2 pipeline;
- `OD-025`: numeric camera/FOV/safe-zone values;
- `OD-026`: numeric runtime lighting;
- `OD-027`: final animation tuning;
- `OD-029`: final evolution-branch visual art.

Current baselines are sufficient to code the interfaces and fallback behavior.

## 5. Acceptance rule for later delivery

A later external asset may be integrated only when:
1. it traces to the current canonical mascot/Pulkovo source;
2. it is placed/promoted into `08_PRODUCTION_EXPORTS/` by the visual production workflow;
3. the Asset Manifest/runtime index marks it eligible;
4. proxy/spike status is not present;
5. GLB parsing/coordinates/scale/clip bindings pass Stage-15 tests;
6. the existing fallback continues to work if the new asset fails.

## 6. Explicit prohibition

Do not:
- rename Stage-16 `SPK_*` GLBs to production names;
- synthesize empty `.glb`, `.blend` or `.ktx2` placeholders;
- claim measured FPS/memory/load performance without executed evidence;
- make KTX2 mandatory;
- make UI availability conditional on external DCC delivery.

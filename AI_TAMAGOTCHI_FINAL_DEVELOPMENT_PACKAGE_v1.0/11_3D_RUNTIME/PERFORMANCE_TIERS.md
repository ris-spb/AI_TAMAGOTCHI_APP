# PERFORMANCE TIERS — CAPABILITY/DEGRADATION CONTRACT

**Stage:** 11  
**Important:** no measured FPS, memory, file-size or device-whitelist claim is made. Physical-device validation was explicitly waived.

## 1. Tier definitions

### Tier A — capable
- mascot + core terminal;
- best available approved fur treatment;
- dynamic lighting within approved profile;
- bounded ambient actors;
- higher available LOD/material quality.

### Tier B — standard
- mascot + core terminal;
- simplified fur/shadows;
- reduced ambient actors;
- stable default live target when capability is known but benchmark certification is absent.

### Tier C — degraded
- LOD2/simplified material path;
- no expensive fur/dynamic effects;
- minimal/no actors;
- Day baseline preserved where possible.

### Tier F — fallback
- current production WebP fallback layer;
- fully functional DOM UI;
- no realtime 3D dependency.

## 2. Selection policy

Tier selection is based on capability/runtime health, not a hardcoded device model whitelist.

`SAFE_ENGINEERING_DEFAULT`:
- no WebGL2 / realtime feature disabled → F;
- successful live core with conservative features → B;
- A may be enabled only when capability/runtime policy permits it; A is not assumed merely because WebGL2 exists;
- protection/degradation signal → C;
- unrecoverable/repeated context loss or core-load failure → F;
- within one SceneHost mount, automatic tier changes should avoid quality oscillation; re-evaluation may occur on a new mount/session.

Exact degradation thresholds are Stage-13/15 runtime configuration/testing values, not Stage-11 product facts.

## 3. Proxy LOD reference — not a budget

Stage-16 technical proxy geometry is retained only as engineering context:

| Asset | Proxy LOD0 | Proxy LOD1 | Proxy LOD2 |
|---|---:|---:|---:|
| Mascot | 19,572 tris | 5,120 | 2,236 |
| Pulkovo Core | 24,156 tris | 7,964 | 2,660 |

These values are **not benchmark-certified acceptance budgets**. Final DCC assets should provide at least LOD0/LOD1/LOD2 and document justified deviations; no Stage-11 acceptance test may fail solely because a final asset differs from the proxy counts.

## 4. Fur degradation

Quality reduction order:
1. preserve eyes/face/silhouette;
2. reduce decorative fur complexity;
3. reduce shadows/reflections/ambient actors;
4. simplify materials/LOD;
5. fallback if core stability cannot be maintained.

Lowest live tier may use baked/material fur approximation rather than strand/geometric fur.

## 5. KTX2

KTX2/Basis is optional and must be capability-gated. A compatible non-KTX2 texture path is mandatory. Texture transcode must never block functional UI.

## 6. Resource lifecycle

- load only core Home assets initially;
- lazy-load secondary world/actors;
- dispose geometry/materials/textures/render targets that are no longer used;
- centralize renderer/context disposal in the 3D runtime package;
- retain static fallback at all times.

No numeric memory/file-size budget is invented.

## 7. Runtime protection signals

Stage 11 defines semantic signals only:
- `core_load_failure`;
- `secondary_asset_failure`;
- `context_lost` / `context_restored`;
- `runtime_degrade_requested`;
- `asset_contract_violation`;
- `camera_profile_invalid`;
- `unsupported_capability`.

Numeric thresholds/retry counts are deferred to configuration and QA stages.

## 8. Accessibility and power sensitivity

Reduced Motion and visibility/background state may reduce/suspend nonessential animation and ambient work. This is a safe runtime optimization; it must not change server state or award/withhold gameplay value.

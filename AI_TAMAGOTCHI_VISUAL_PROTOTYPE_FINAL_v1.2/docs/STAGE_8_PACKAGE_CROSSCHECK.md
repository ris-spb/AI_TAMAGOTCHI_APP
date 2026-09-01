# Stage 8 — Direct Package Cross-check

Directly checked against the physically extracted Development Package:

- `10_FRONTEND_CONTRACT/VISUAL_INTEGRATION.md`
- `11_3D_RUNTIME/3D_RUNTIME_FINAL.md`
- `11_3D_RUNTIME/ANIMATION_STATE_MAPPING.md`
- `11_3D_RUNTIME/PERFORMANCE_TIERS.md`
- `11_3D_RUNTIME/FALLBACK_MAPPING.md`
- `11_3D_RUNTIME/ASSET_LOADING_ORDER.md`
- `15_QA/PWA_AND_3D_TESTS.md`

Reference/binary source additionally checked, as permitted by PROMPT 01:

- current `09_DEVELOPER_HANDOFF/Motion_Specification.md`
- current `09_DEVELOPER_HANDOFF/3D_Specification.md`
- `08_PRODUCTION_EXPORTS/Production_Export_Index_v2.0.json`

## Cross-check result

| Contract | Prototype Stage 8 |
|---|---|
| Hybrid realtime + fallback | PASS |
| Functional UI independent of 3D | PASS |
| Final GLB/KTX2 not fabricated | PASS |
| Tier F when current final binaries are external | PASS |
| Loading preview available | PASS |
| Unsupported/error fallback available | PASS |
| State-safe fallback | PASS |
| Reduced Motion branch | PASS |
| Motion baselines | PASS |
| Ambient subordinate/non-blocking | PASS |
| Scene does not calculate Score/HP/XP/Goals | PASS |
| No measured device-performance claim | PASS |
| Runtime visual files only from `08_PRODUCTION_EXPORTS/` | PASS |
| Runtime binaries physically imported | PASS — 56/56 hashes |

## External production dependency retained

The Development Package and current Visual handoff both report:

- final production mascot GLB: absent / external production required;
- final production Pulkovo core GLB: absent / external production required;
- final KTX2 set: absent / optional external pipeline.

This is not filled with Stage-16 technical proxy assets.

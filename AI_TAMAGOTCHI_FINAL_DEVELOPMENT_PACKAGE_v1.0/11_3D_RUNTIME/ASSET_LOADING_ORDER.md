# ASSET LOADING ORDER

**Stage:** 11  
**Rule:** functional UI always wins over realtime-scene readiness.

## 1. Frozen order

1. **Application shell + navigation + functional Home UI** becomes usable.
2. `IMG_Loading_Preview_390x844_v1.0.webp` is available as the early visual layer.
3. Capability gate checks realtime feature enablement and WebGL2 support.
4. Load the **minimum viable mascot/core 3D set** when final production assets exist.
5. Load **Pulkovo Terminal Core**.
6. Apply better available mascot/world LOD/materials within current tier.
7. Lazy-load secondary terminal background/furniture.
8. Load approved signage only when eligible; otherwise omit it.
9. Load bounded background characters/ambient only in a tier that permits them.

The loading order is progressive; it is not a single all-or-nothing Promise.

## 2. Readiness gates

### `ui_ready`
DOM shell, CTA and navigation can be used. This gate does not depend on 3D.

### `preview_ready`
Production loading preview is rendered behind/with the same semantic UI overlay.

### `core_live_ready`
May become true only when:
- required final production GLB assets are physically available;
- manifest/runtime source check passes;
- camera profile is valid;
- required GLB(s) parse successfully;
- at least the mascot/core scene can render without violating safe-zone invariants.

### `full_live_ready`
Optional. Secondary world/actors do not gate functional Home or `core_live_ready`.

## 3. Current asset IDs and priority

| Priority | Asset ID | Role | Required for live core | Current status |
|---|---|---|---|---|
| P0 | `MSC-EXT-001` | Lyuboznayka runtime GLB | YES | `EXTERNAL_PRODUCTION_REQUIRED` |
| P0 | `WLD-EXT-001` | Pulkovo Terminal Core GLB | YES | `EXTERNAL_PRODUCTION_REQUIRED` |
| P1 | `WLD-EXT-002` | Terminal Background | NO | external/lazy |
| P2 | `WLD-EXT-003` | Furniture | NO | external/lazy |
| P2 | `WLD-EXT-004` | Signage | NO | omit if not eligible/approved |
| P3 | `WLD-EXT-005` | Background Characters | NO | external/lowest priority |
| optional | `TEX-EXT-001` | KTX2 texture set | NO | optional/unvalidated |

Here P0/P1/P2/P3 are loading criticality labels local to this document, not Product backlog priorities.

## 4. Concurrency and cancellation

`SAFE_ENGINEERING_DEFAULT`:
- secondary loads may execute concurrently after core loading has begun, but they never delay the UI shell;
- route/navigation away from Home cancels or ignores stale scene-completion callbacks;
- disposed scene resources must not be reattached by late promises;
- an asset generation/version key must be checked before applying loaded content.

Exact concurrency limits, retry delays and network timeouts are runtime configuration, not frozen Product values.

## 5. Failure handling

- preview failure → render `IMG_3D_Unavailable_390x844_v1.0.webp` or plain functional UI if the raster itself is unavailable;
- mascot/core load failure → Tier F;
- Terminal Background/Furniture/Actors failure → keep core scene;
- Signage failure or ineligibility → omit signage;
- KTX2 failure/unsupported → use compatible non-KTX2 textures; do not block UI;
- context loss → central recovery path; unrecoverable/repeated loss → Tier F.

## 6. Caching

The application may cache static production fallbacks/PWA shell according to Stage 10 PWA rules. Caching must not create offline mutations or make 3D authoritative. Exact cache quotas/expiry are not frozen here.

# Stage 8 — Production Asset Import Register

## Source boundary

The original Product/Visual material is not used as a competing requirements source. Under PROMPT 01 it is used only as a **reference / binary-asset source** when consistent with the Development Package.

Imported binary source:

`AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0(3).zip → 08_PRODUCTION_EXPORTS/`

Runtime destination:

`prototype/public/production-assets/08_PRODUCTION_EXPORTS/`

## Imported runtime set

- SVG: 51
- WebP: 5
- final production GLB: 0
- KTX2: 0
- total runtime visual binaries: 56

All 56 SVG/WebP SHA-256 hashes match `Production_Export_Index_v2.0.json` exactly.

Not imported as runtime assets:
- Golden Screens;
- source references;
- Stage-16/SPK technical proxy GLB;
- any invented GLB/KTX2;
- generic replacement icon set.

## Verified fallback semantics

Physical visual inspection of `IMG_Home_Fallback_Day_390x844_v2.0.webp` shows that it is a **composite Home raster that already contains the healthy mascot**. Stage 8 therefore treats it as an indivisible healthy-state visual composition.

Consequences implemented in `SceneHostBoundary`:
- `happy` + realtime requested/final GLB external → use the Day composite, **do not overlay** the standalone Happy raster;
- `coma` → do not reuse the healthy Day composite; use the 3D-unavailable visual layer plus the approved Coma mascot raster and semantic DOM cue;
- `normal / bored / tired / very_weak` → no fake Happy/Coma emotional raster; use the approved unavailable/state-neutral layer + semantic DOM cue;
- `off/error` → approved 3D-unavailable layer + functional DOM UI;
- loading → approved loading preview + functional DOM UI.

This resolves a prototype-only integration defect that could otherwise have displayed two mascots or a healthy mascot during coma.

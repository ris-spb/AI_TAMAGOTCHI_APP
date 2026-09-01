# SAFE_ENGINEERING_DEFAULTS — PROTOTYPE STAGE 8

These choices are technical, reversible, prototype-only, and do not change Product/Game semantics.

1. **No live R3F/Three Canvas without final production GLB.** `FINAL_PRODUCTION_3D_AVAILABLE=false`; a request for realtime 3D resolves to Tier F rather than loading technical proxy GLBs.
2. **Static ambient polish only.** The Pulkovo daylight layer is a restrained, non-interactive CSS light treatment. No unsourced continuous character/world animation cadence is invented.
3. **Motion uses only frozen Stage-20 baselines.** Navigation 200 ms; fast navigation 180 ms; button press 140 ms; AI-case completion 360 ms; mascot 600/700/900 ms; major achievement 1600 ms; modal 240/200 ms.
4. **Reduced Motion removes spatial feedback.** Native `prefers-reduced-motion` and the DEV-only simulation keep state recognition while suppressing bounce/travel/squash-stretch.
5. **Fallback asset semantics are based on physical binaries.** The Day WebP is treated as a healthy composite because the actual audited file contains the mascot; it is not combined with another Happy raster.
6. **Standalone Stage-8 HTML preview may expose `loading` as a QA state.** This does not expand the app's Demo Control Panel contract (`on/off/error`); it exists only to inspect loading-preview equivalence without the unavailable React runtime.
7. **No sound.** No audio dependency is introduced.
8. **No measured performance claims.** Runtime tiers are semantic contract states only; no FPS, GPU memory or device whitelist is asserted.

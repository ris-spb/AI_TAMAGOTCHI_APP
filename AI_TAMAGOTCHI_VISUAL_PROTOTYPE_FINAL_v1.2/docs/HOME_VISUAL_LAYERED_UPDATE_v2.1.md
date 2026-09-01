# HOME VISUAL LAYERED UPDATE v2.1

Status: owner-approved visual update after Stage 10 delivery.

## Decision
- Home is now composed as three independent layers: `Background → Mascot → Functional UI`.
- One approved Pulkovo background is reused for every pet health state.
- Only the mascot file changes for `happy / normal / bored / tired / very_weak / coma`.
- Old composite Happy fallback and generic 3D-unavailable image are no longer used as state substitutes in the one-click Home demo.
- No GLB is created or represented as production 3D.

## Approved runtime assets
- Background master: `BG_Home_Pulkovo_Default_1024x1536_v2.1.webp`
- `happy` → `MSC_Lyuboznayka_Happy_1254_v2.1.webp` — `approved_user_generated`
- `normal` → `MSC_Lyuboznayka_Normal_1254_v2.1.webp` — `approved_user_generated`
- `bored` → `MSC_Lyuboznayka_Bored_1254_v2.1.webp` — `approved_user_generated`
- `tired` → `MSC_Lyuboznayka_Tired_1254_v2.1.webp` — `approved_user_generated`
- `very_weak` → `MSC_Lyuboznayka_VeryWeak_1254_v2.1.webp` — `temporary_package_fallback_due_missing_approved_byte`
- `coma` → `MSC_Lyuboznayka_Coma_1254_v2.1.webp` — `approved_user_generated`

## Known asset exception
- The execution filesystem retained 5 of the newly approved state images. One approved `very_weak` generation was lost because two generated outputs were mounted under the same filename/path.
- To keep the approved six-state architecture complete without inventing a new character treatment, `very_weak` temporarily uses the compatible pre-existing package mascot fallback as its own separately normalized state file.
- This is the only current visual substitution in the six-state pack and should be replaced by the exact approved `very_weak` binary if/when it is re-uploaded.

## Integration
- React source: `src/assets/productionAssets.ts`, `src/features/home/SceneHostBoundary.tsx`, `SceneHostBoundary.module.css`.
- Dependency-free delivery: `delivery/index.html` and `demo/index.html`.
- Demo Control switches the mascot only; the background source remains unchanged.

## QA
- All mascot runtime files normalized to a common 1254×1254 transparent canvas.
- Common visual baseline/centering applied without changing character artwork.
- Background kept as a separate 1024×1536 master plus a 390×844 QA/mobile crop.
- Static compositing QA contact sheet: `docs/home_visual_v2_qa/HOME_STATES_CONTACT_SHEET_780x1560.jpg`.

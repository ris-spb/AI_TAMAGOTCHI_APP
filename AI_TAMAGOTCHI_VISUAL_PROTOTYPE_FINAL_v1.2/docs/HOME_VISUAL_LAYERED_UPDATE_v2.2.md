# HOME VISUAL LAYERED UPDATE v2.2

Status: OWNER-APPROVED VISUAL UPDATE

## Final layering

- One fixed Pulkovo background is used for every pet health state.
- Only the mascot layer changes when `health_state` changes.
- All mascot files use transparent 1254×1254 canvases, consistent subject scale and common floor alignment.
- No composite Happy screenshot is used as the Home background.
- No generic 3D-unavailable/coma image is used as a substitute for another health state.

## Runtime assets

- Background master: `BG_Home_Pulkovo_Default_1024x1536_v2.2.webp`
- Background mobile: `BG_Home_Pulkovo_Default_390x844_v2.2.webp`
- `happy` → `MSC_Lyuboznayka_Happy_1254_v2.2.webp` — `owner_approved_generated_asset`
- `normal` → `MSC_Lyuboznayka_Normal_1254_v2.2.webp` — `owner_approved_generated_asset`
- `bored` → `MSC_Lyuboznayka_Bored_1254_v2.2.webp` — `owner_approved_generated_asset`
- `tired` → `MSC_Lyuboznayka_Tired_1254_v2.2.webp` — `owner_approved_generated_asset`
- `very_weak` → `MSC_Lyuboznayka_VeryWeak_1254_v2.2.webp` — `owner_approved_generated_asset`
- `coma` → `MSC_Lyuboznayka_Coma_1254_v2.2.webp` — `owner_approved_generated_asset`

## State mapping

| HP state | UI label | Mascot file |
|---|---|---|
| happy | Бодрый | MSC_Lyuboznayka_Happy_1254_v2.2.webp |
| normal | Нормальный | MSC_Lyuboznayka_Normal_1254_v2.2.webp |
| bored | Скучает | MSC_Lyuboznayka_Bored_1254_v2.2.webp |
| tired | Уставший | MSC_Lyuboznayka_Tired_1254_v2.2.webp |
| very_weak | Очень слабый | MSC_Lyuboznayka_VeryWeak_1254_v2.2.webp |
| coma | Кома | MSC_Lyuboznayka_Coma_1254_v2.2.webp |

## Integration

- React runtime: `src/features/home/SceneHostBoundary.tsx` uses the constant background from `productionAssets.approvedHome.background` and looks up mascot by health state.
- Dependency-free delivery: `delivery/index.html` keeps `ASSETS.bg` fixed and replaces only `sceneMascot.src` from the state map.
- Demo Control exposes all six states.
- Approved legacy package fallbacks remain in the repository only for audit/history and technical fallback contexts.

## Production boundary

- These are approved static prototype assets, not final production GLB/KTX2.
- No proxy GLB has been created or relabelled as final.

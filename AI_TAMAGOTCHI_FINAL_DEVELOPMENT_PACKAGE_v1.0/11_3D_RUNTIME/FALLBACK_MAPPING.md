# FALLBACK MAPPING — CURRENT PRODUCTION SET

**Stage:** 11  
**Invariant:** fallback is a visual representation layer only. It cannot alter HP, Streak, XP, Goals, Score or business events.

## 1. Current production fallback files

Only these current runtime paths are used by this Stage-11 contract:

| Purpose | Runtime path | Rule |
|---|---|---|
| progressive loading | `08_PRODUCTION_EXPORTS/FALLBACK/IMG_Loading_Preview_390x844_v1.0.webp` | show while live scene is not ready |
| realtime unavailable/failure | `08_PRODUCTION_EXPORTS/FALLBACK/IMG_3D_Unavailable_390x844_v1.0.webp` | fully functional UI remains above it |
| Pulkovo day scene | `08_PRODUCTION_EXPORTS/FALLBACK/IMG_Home_Fallback_Day_390x844_v2.0.webp` | current Day baseline |
| healthy/happy mascot | `08_PRODUCTION_EXPORTS/FALLBACK/MSC_Lyuboznayka_Happy_Fallback_512_v2.0.webp` | only for compatible happy/healthy state |
| coma mascot | `08_PRODUCTION_EXPORTS/FALLBACK/MSC_Lyuboznayka_Coma_Fallback_512_v2.0.webp` | only for `coma` |

Old v1 schematic mascot fallbacks are prohibited.

## 2. State-safe mapping

| Authoritative pet state | Preferred live representation | Static fallback rule |
|---|---|---|
| `happy` | `MSC_IDLE_BASE` | Day background + Happy fallback may be used |
| `normal` | `MSC_IDLE_BASE` | Day scene only if visually state-neutral; otherwise 3D Unavailable + DOM state cue; no forced Happy overlay |
| `bored` | `MSC_IDLE_BORED` | 3D Unavailable + DOM state cue by default; Day scene only if QA confirms state-neutral; no fake Happy/Coma overlay |
| `tired` | `MSC_TIRED` | 3D Unavailable + DOM state cue by default; Day scene only if QA confirms state-neutral; no fake Happy/Coma overlay |
| `very_weak` | `MSC_VERY_WEAK` | 3D Unavailable + DOM state cue by default; Day scene only if QA confirms state-neutral; no fake Happy/Coma overlay |
| `coma` | `MSC_COMA_LOOP` | Coma fallback has priority |
| recovery overlay/event | `MSC_RECOVERY` | 3D Unavailable + DOM recovery cue unless a truthful recovery raster exists later; Day scene only if state-neutral |
| vacation | preserve server health semantics; nonessential reactions suppressed | state-neutral Day scene or 3D Unavailable + vacation UI; no invented vacation mascot raster |

No current production raster provides a dedicated truthful bored/tired/very-weak/recovery/vacation expression. The runtime therefore prefers `IMG_3D_Unavailable` plus semantic DOM state cues unless current visual QA explicitly confirms that the Home Day fallback is state-neutral for the requested state.

## 3. Failure decision tree

1. Realtime disabled/unsupported before load → `IMG_3D_Unavailable` + functional UI.
2. Scene booting → `IMG_Loading_Preview` + functional UI.
3. Core world unavailable but Day raster is valid → `IMG_Home_Fallback_Day`.
4. Mascot 3D unavailable:
   - `happy` → optional Happy overlay;
   - `coma` → Coma overlay;
   - all other states → no false emotional overlay; expose state through functional UI.
5. Secondary 3D asset failure → keep the core scene if healthy.
6. Renderer recovery does not replay a business reward animation.

## 4. Layering

Static fallback art contains the visual scene/mascot only. DOM UI stays the same contract above live, preview and fallback modes:
- Streak context;
- today AI-case count/context;
- compact Monthly Goals progress;
- notifications when real;
- CTA `Добавить AI-задачу`;
- mobile navigation `Главная / История / Рейтинг / Профиль`.

Fallback must not reintroduce persistent Annual Score/rank, Evolution XP or a numeric HP bar.

## 5. Future replacement

When an approved new production fallback is supplied, replacement requires:
- current Asset Manifest status/path;
- physical file under `08_PRODUCTION_EXPORTS/`;
- state-semantic compatibility;
- Stage-15 visual/fallback regression coverage.

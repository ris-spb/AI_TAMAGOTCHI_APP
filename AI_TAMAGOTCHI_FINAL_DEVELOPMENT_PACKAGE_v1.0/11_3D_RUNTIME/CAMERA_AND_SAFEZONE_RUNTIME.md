# CAMERA AND SAFE-ZONE RUNTIME

**Stage:** 11  
**Status:** composition rules frozen; numeric camera/light values remain `DEFERRED_NONBLOCKING`.

## 1. Reference viewport family

- narrow mobile: **360×800**;
- primary mobile: **390×844**;
- wide/tall mobile: **430×932**;
- web/desktop width references: **1024 / 1280 / 1440**.

Mobile safe areas must include iOS notches/Dynamic Island, Android status/system regions and gesture areas.

## 2. Composition invariants

1. Lyuboznayka remains primary emotional focus.
2. Mascot visual height target is approximately **30–45%** of usable Home viewport.
3. Face/eyes are highest-priority no-overlay/no-critical-crop zone.
4. Ground/contact relationship remains readable where the pose requires it.
5. CTA and bottom navigation must not cover face/eyes.
6. Environment may crop before mascot identity is sacrificed.
7. Wider viewports reveal more terminal context rather than scaling the mascot linearly.
8. Preserve identity cues of the approved Pulkovo composition: bright terminal volume, warm faceted/golden ceiling, supports, glazing/daylight and reflective/light floor.
9. Functional UI has precedence when visual and interaction constraints conflict.

## 3. Coordinate contract

- glTF right-handed coordinate system;
- Y-up;
- one scene unit = one meter;
- local camera/asset forward convention = -Z where applicable;
- mascot root uses ground/contact reference;
- environment origin is stable and documented;
- no arbitrary runtime rescale after DCC approval.

## 4. Camera profile interface

Production live 3D requires a validated configuration profile containing at minimum:
- projection mode expected by final DCC handoff;
- FOV when perspective projection is used;
- near/far clipping values;
- camera transform/target;
- per-reference-viewport framing/safe-zone parameters;
- optional tier-specific adjustments that preserve composition invariants.

**No numeric FOV/near/far/transform is invented by Stage 11.** These values remain `OD-025` implementation/DCC tuning and should be placed in Stage-13 runtime configuration.

If production live assets exist but a required camera profile is missing/invalid, the app must stay on the approved fallback rather than activate an unvalidated composition.

Non-production development may use clearly marked replaceable engineering camera values solely to exercise the runtime, but they must not be copied into a Production Freeze claim.

## 5. Safe-zone computation

`SAFE_ENGINEERING_DEFAULT` implementation method:
- UI layer publishes actual occupied rectangles for top HUD, CTA, bottom navigation and system safe insets;
- 3D layer receives those rectangles in CSS pixels plus viewport/device-pixel-ratio metadata;
- final mascot face/eyes/body bounding anchors are supplied by the production asset/DCC contract;
- camera/framing chooses the current profile/crop so the face/eyes exclusion zone does not intersect critical UI;
- if no valid fit is possible, prefer environment crop or Tier F fallback over covering the mascot face.

This method freezes the algorithmic responsibility without inventing final numeric camera values.

## 6. Lighting contract

Day baseline:
- bright natural terminal daylight;
- warm faceted/golden ceiling surfaces;
- soft neutral floor reflections;
- readable UI/mascot contrast.

Morning/evening/night are derivative states and do not block MVP acceptance. Exact exposure, temperature, intensity and shadow numerics remain `OD-026` runtime tuning.

## 7. Resize/orientation

- recompute safe-area geometry on viewport/orientation changes;
- do not linearly scale the mascot to fill width;
- do not rebuild business state on resize;
- if resize produces an invalid camera profile, keep UI active and use the static fallback until a valid profile is available.

# SAFE ENGINEERING DEFAULTS — PROTOTYPE STAGE 4

These choices are reversible implementation details. They do not alter product/game rules or claim new visual approval.

## SED-4.1 — Production asset browser mount

**Choice:** browser runtime paths preserve the package subtree under `/production-assets/08_PRODUCTION_EXPORTS/...`.

**Reason:** exact approved filenames are known, but raw binary bytes are not mounted in the current execution container. A stable mount boundary lets the exact files be copied later without renaming or changing Home components.

**Constraint:** no placeholder/proxy image may be saved at an approved filename.

## SED-4.2 — No invented non-happy/non-coma mascot raster

`normal`, `bored`, `tired`, `very_weak` and recovery-compatible paths use the approved `3D unavailable` visual boundary plus semantic DOM state cue when realtime 3D cannot render. Only `happy` and `coma` may request their current state-specific v2 fallback raster.

## SED-4.3 — `3D on` means requested live capability, not fake live content

Because final production GLB is an external dependency, the dev `on` switch is explicitly labelled `DEMO_NONPRODUCTION` and resolves to the approved static fallback until real assets exist. No Stage-16 proxy GLB is promoted.

## SED-4.4 — Home mock values are server/mock supplied

The deterministic `/v1/home` mock supplies HP, Streak, task count, goals and notification count. Home components do not calculate authoritative game values. Client arithmetic is limited to presentation-only progress-bar width.

## SED-4.5 — No invented ambient copy

The default deterministic Home fixture returns `ambient_message: null`. Ambient/weather copy is deferred rather than invented at Stage 4.

## SED-4.6 — Desktop presentation containment

Home remains mobile-first and is contained rather than stretched across the full desktop workspace. Exact final desktop pixel calibration remains a later visual-QA concern because approved raster/reference bytes are not mounted in this environment.

## SED-4.7 — Environment exception

The user explicitly authorized continuing despite execution-container package/network restrictions. Checks requiring unavailable npm dependencies remain `NOT_EXECUTED_ENVIRONMENT`, never `PASS`.

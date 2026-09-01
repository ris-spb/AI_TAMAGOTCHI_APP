# ADR-006 — Isolate Three.js/R3F behind a 3D runtime boundary

**Status:** ACCEPTED  
**Stage:** 3 — Tech Stack Freeze

## Context
Owner-approved visual architecture requires Hybrid 3D, Three.js/WebGL2/glTF2/GLB and a functional UI that never depends on realtime 3D. Final production GLBs are external.

## Decision
Use Three.js as engine. React Three Fiber may be used only inside `packages/3d-runtime`/SceneHost. Expose lifecycle/state events to the UI; never let the 3D package own authoritative business state. Always support approved static fallback.

## Consequences
The scene can fail/load/unload independently of routes/forms. Final GLBs can replace fallbacks without changing core product modules. WebGL context loss, reduced motion and disposal can be handled centrally.

## Alternatives considered
Direct ad-hoc Three.js inside Home components was rejected because it couples scene lifecycle to functional UI. A non-Three engine was rejected because Three.js is already owner-approved.

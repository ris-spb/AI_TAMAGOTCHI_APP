# PWA & 3D TESTS

PWA:
- installable/static shell;
- static asset caching allowed;
- authenticated API responses not generic offline cache;
- no offline auth;
- no queued offline mutations;
- explicit network error;
- stale data never represented as newly confirmed business truth.

3D loading:
static preview → functional UI → mascot/core → terminal → ambient → live transition.

Inject live WebGL, degraded mode, asset failure, unsupported WebGL and context loss.

In every case:
- functional UI remains usable;
- forms/nav/CTA remain accessible;
- fallback works;
- scene calculates no Score/HP/XP/Goals.

No measured device FPS/memory claim is produced.

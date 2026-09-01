# PWA CONTRACT

## 1. Scope

MVP is an online product delivered as mobile-first web/PWA.

PWA capabilities:
- installable shell;
- versioned static asset caching;
- fast reload of application shell;
- static visual fallback availability where assets were previously fetched.

PWA does **not** create an offline business mode.

## 2. Service worker

Workbox-compatible Vite PWA implementation may cache:
- hashed JS/CSS;
- app shell;
- fonts/assets allowed by the visual manifest;
- approved static fallback assets.

Do not generically cache:
- authenticated API responses;
- task raw input;
- Personnel data;
- session tokens;
- mutation requests.

## 3. Offline/network-loss behavior

When offline:
- app shell may render;
- current static fallback may render;
- clearly indicate network is required for live data/actions;
- disable/reject API mutations;
- never queue create/edit/delete/Goal/privacy/vacation commands for background replay;
- never claim stale values are current.

No offline authentication.

## 4. Update behavior

`SAFE_ENGINEERING_DEFAULT`:
- version assets by build hash;
- do not force a mid-form reload;
- activate a new shell at safe reload/navigation boundary;
- surface update-required state if a breaking client/API mismatch is detected.

Exact update prompt presentation is not a Product mechanic and may use the current UI feedback system.

## 5. Storage

Do not persist sensitive business data in browser storage solely to support offline mode.

Any browser storage introduced later must be reviewed by Stage 14 security policy.

## 6. 3D boundary

Stage 10 only defines the shell boundary:
- static preview/UI first;
- 3D lazy;
- 3D cache/load specifics are Stage 11;
- functional UI remains available if 3D is absent or fails.

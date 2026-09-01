# PROTOTYPE VS FINAL — Difference Register

Status: Stage 10 delivery register

This document separates the working visual prototype from the future production application. Items below are deliberate prototype substitutions or unresolved production dependencies; they are not silently represented as final implementation.

## 1. Runtime / build delivery

### Prototype
- Full React 19 / Vite / TypeScript source repository is included.
- A dependency-free offline delivery shell (`demo/index.html`) is included so the owner can open and traverse the visual prototype without installing npm libraries.
- Windows/macOS/Linux launchers open the offline demo surface directly.

### Final / full developer runtime
- The pinned Node 24 + pnpm dependency graph still needs one successful `pnpm install` in an npm-capable environment.
- The execution container used during prototype development cannot access npm, therefore no truthful React/Vite `dist/` build was produced here.
- Formatter, ESLint, full React typecheck, Vitest and React Playwright must be rerun in that environment.

## 2. Backend and data

### Prototype
- Deterministic synthetic fixtures only.
- Vite mock middleware follows the final OpenAPI shapes for implemented business endpoints.
- No real employee identity, phone number, task content or corporate data is present.

### Final
- Real Personnel DB integration.
- Persistent database/event ledger/audit storage.
- Production authorization and object-level access controls.
- Production job processing, observability, backup/restore, rate limits and secret management.

## 3. AI / STT integrations

### Prototype
- LLM processing is deterministic mock behavior.
- Voice/STT is simulated; source audio is not retained.
- Plausibility/clarification/scoring examples are deterministic prototype scenarios.

### Final
- Versioned LLM processing pipeline.
- Production Speech-to-Text provider.
- Versioned capability knowledge and scoring/model rules.

## 4. Mascot / 3D

### Prototype
- Current audited package runtime visual set remains included: 51 SVG + 5 WebP.
- In addition, owner-approved Home v2.2 uses a layered static composition: one separate Pulkovo background + one separate mascot asset per health state (`happy / normal / bored / tired / very_weak / coma`).
- The background is constant across states; only the mascot layer changes.
- All six state binaries use the owner-approved generated/canonical source images. Mascot files are normalized to one transparent 1254×1254 canvas with consistent subject scale and floor alignment; no state uses the old generic/coma fallback as a substitute.
- Old composite Happy and generic 3D-unavailable images are retained for audit/history but are no longer used as state substitutes in the one-click Home demo.
- `DEMO_NONPRODUCTION` realtime-request mode never pretends a proxy model is final.

### Final
- Final production mascot GLB is not supplied in source materials.
- Final Pulkovo/world GLB is not supplied.
- KTX2 textures are not supplied.
- Final camera/light/material/performance calibration therefore remains external.

## 5. Ambient context

### Prototype
- Deterministic Saint Petersburg-oriented ambient demo text/visual state.
- No live weather call is required for the offline demo.

### Final
- Optional live Weather API may supply current Saint Petersburg context under the product rules.

## 6. Authentication / onboarding

### Prototype
- Synthetic demo identity (`DEMO-001`, fake phone number).
- Login verification, onboarding state and Monthly Goal setup are deterministic mocks.

### Final
- Personnel DB-backed verification and persisted onboarding/goal-cycle state.

## 7. Monthly Goals / achievements / cosmetics

### Prototype
- Goal generation/matching uses deterministic examples that respect final DTO semantics.
- Achievement/cosmetic names/art not fixed by final contracts are marked demo placeholders and only earned items are shown.

### Final
- Production goal generator and persisted goal matching.
- Final approved achievement/cosmetic catalog/art when separately supplied.

## 8. Admin

### Prototype
- Existing employees can be demonstrated through final `PATCH`-shaped admin flows.
- The prototype does not invent a manual employee-create endpoint.

### Final-contract gap
- Product specification mentions manual creation of an employee as an exception, but final OpenAPI has no `POST /v1/admin/employees` contract. This remains unresolved rather than invented.

## 9. Export

### Prototype
- Export request/status lifecycle is mocked according to contract behavior.

### Final
- Real XLSX/CSV generation, storage and secure download handling.

## 10. Performance / production operations

### Prototype
- No production SLA, p95 latency, FPS, capacity or scalability claim is made.
- Browser QA covers the dependency-free visual surface and current assets.

### Final
- Performance, observability, security, resilience and data-retention requirements must be validated in the production architecture/environment.

## 11. PWA / offline semantics

### Prototype
- Visual demo can be opened locally for evaluation.
- Business mutations remain conceptually online-only; the offline delivery shell is only a packaging convenience and is not an offline business-data mode.

### Final
- Mobile-first PWA remains online-only for product operations per the Source of Truth.

## 12. DEV-only controls

The following are prototype-only and must not ship as production user features:
- role switcher;
- mascot/HP state switcher;
- loading/error/empty/forbidden switcher;
- goals/streak controls;
- 3D on/off/error switcher;
- viewport presets;
- reduced-motion manual simulation;
- diagnostic scene/tier badges;
- `X-Prototype-*` headers and mock scenario controls.

## Conclusion

The delivery is suitable for visual/product evaluation and clickable scenario walkthrough. It is not evidence of a production backend, a verified full React build in this restricted execution container, final realtime 3D, or completed production infrastructure.

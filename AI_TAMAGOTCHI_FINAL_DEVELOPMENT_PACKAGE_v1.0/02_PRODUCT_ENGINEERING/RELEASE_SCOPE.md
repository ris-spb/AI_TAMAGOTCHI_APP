# RELEASE SCOPE — MVP IMPLEMENTATION TARGET

**Stage:** 2 — Release Scope & Implementation Target  
**Status:** `PASS_WITH_NONBLOCKING_GAPS`  
**Normative release designation:** `MVP`  
**Current stable requirement corpus:** `274` requirements

## 1. Release designation

The coding AI shall build the **Product v1.0 MVP**.

`Pilot` is treated as a validation/calibration phase for configurable balance/content parameters before industrial rollout, **not** as a smaller feature scope.  
No authoritative source defines a separate mandatory `R1`, `R1.1`, `P1` or `P2` release schedule. Development Readiness priority/release labels remain advisory and do not override Product v1.0.

Therefore:
- every source-defined MVP requirement is `P0` for this implementation target;
- source-defined exclusions are `OUT_OF_SCOPE_MVP`;
- explicit future items are `FUTURE_UNSCHEDULED`;
- visual/external items with a safe current baseline stay in MVP with a fallback/dependency boundary;
- no feature is silently postponed merely because an older readiness backlog labeled it P1/P2.

## 2. Product form and platforms

### Primary employee experience
- **Mobile-first PWA**.
- Source-defined mobile range: **360–430 logical px**.
- Primary visual reference: **390×844**.
- Runtime safe areas come from the actual browser/platform; fixed notch/Dynamic-Island pixels are not frozen.
- No native iOS/Android application is part of MVP.

### Desktop/web
- Desktop web is an additional first-class interface, especially for analytics and administration.
- Reference widths: **1024 / 1280 / 1440**.
- Desktop layouts are composed separately; mobile UI must not simply be stretched.
- Director / Executive / Admin analytical work is desktop/web-primary while preserving role authorization.

### Browser/device support boundary
`SAFE_ENGINEERING_DEFAULT` for Stage 2:
- standards-capable **current/evergreen mobile and desktop browser classes** that support the selected PWA baseline;
- realtime 3D is attempted only on a capable runtime path and must never be required for functional UI;
- exact named browser versions, OS versions and certified physical-device list are **not source-frozen** and are deferred to the tech-stack/QA compatibility matrix;
- tablet is responsive web/PWA behavior, not a separately source-defined product edition.

This does not require an owner decision before Stage 3 because it does not change Product semantics or release surface.

## 3. P0 MVP functional scope

### Entry, identity and onboarding
- no self-registration;
- personnel number + phone verification against corporate Personnel source;
- onboarding on first verified login;
- required Monthly Goal setup may gate entry to the main interface;
- current MVP auth method remains an acknowledged security limitation until a separate production SSO/2FA decision exists.

### AI-case registration
- completed AI-assisted work-use-case semantics;
- unlimited text input;
- voice recording → STT → editable transcript → submit;
- source audio not retained;
- one or more URLs may be stored as strings only; no crawling/preview/content analysis;
- raw input persists before AI processing;
- edit creates a new task version;
- delete is soft and audit-safe.

### AI processing
- extraction, plausibility, clarification, normalization, taxonomy, tool mapping, Complexity classification and goal matching;
- at most **3** clarifications total per task version;
- after the limit, trust the employee and continue without penalty;
- LLM/classifier selects C1–C5 only; deterministic backend applies `1 / 5 / 15 / 40 / 100`;
- no role can manually override task Complexity/Score.

### Game/business engine
- HP 0–100, health states, daily close, coma and recovery;
- vacation;
- current/best streak with no Streak Shield;
- irreversible Evolution XP and stages;
- evolution branch mechanics remain in MVP;
- current Product balance values are implementation baselines and remain configurable where Product marks them for calibration;
- final branch-specific art is not required to block the functional branch mechanic.

### Monthly Goals
- exactly five generated options;
- employee selects two;
- system assigns immutable third goal;
- machine-readable matching rule;
- real-time progress;
- Product v1.0 reward baseline and month-close semantics.

### Rating / privacy / profiles
- current-year employee leaderboard;
- directorate ranking;
- historical directorate attribution;
- Closed / Standard / Open peer privacy;
- peers never receive raw input, clarification log or task links;
- Personal Dashboard, public profile and authorized drilldowns.

### Analytics and management
- employee-facing company analytics: aggregate/anonymous only;
- Director: own directorate analytics + authorized employee/task drilldown, no technical scoring trace;
- Executive: whole-company analytics + company → directorate → employee → task drilldown, no system-settings administration;
- Admin: users/roles/org, calendar, taxonomy, AI tools/unrecognized tools, profile status, technical scoring trace, audit and exports;
- no invented standalone Director “risk/attention” module.

### History / collection
- separate Tasks and Events history;
- task search/filter/detail/version semantics;
- meaningful progress events without routine daily HP noise;
- Achievements / Collection shows only earned items;
- exact release-specific achievement/cosmetic art can use approved generic fallback until final inventory exists.

### Notifications
- **in-app only**;
- health, goals, streak, progress and limited personally meaningful leaderboard events;
- no push/email/Telegram/Teams in MVP.

### Ambient mascot
- limited to 1–2 ambient reactions/copy instances per day;
- Saint Petersburg context only: weather/temperature/precipitation, season, time/day, official holidays;
- no news/politics/complex information search;
- lightweight pet/play/call visual interactions with no gameplay advantage and no sound;
- no permanent Feed/Play/Learn/Rest-style action row on Home.

### Export
- XLSX/CSV within authorized role scope;
- large-period export must not block the interactive UI;
- export remains auditable.

## 4. Current approved Home / navigation scope

Mobile bottom navigation:
`Главная / История / Рейтинг / Профиль`

Home:
- mascot/Pulkovo remain visual focus;
- exact primary CTA: `Добавить AI-задачу`;
- Annual Score/rank is **not persistent on Home**;
- Evolution XP is **not persistent on Home**;
- compact Monthly Goals progress only;
- health is communicated by mascot state + detail-on-demand rather than a persistent numeric HP bar;
- one primary CTA, no permanent game-action row.

These are presentation decisions only; Score, Evolution XP, HP and Goals mechanics remain fully in MVP.

## 5. Realtime / Hybrid 3D implementation target

- Approved planning/runtime baseline: **HYBRID + Three.js + WebGL2-capable web/PWA + glTF 2.0/GLB**.
- Coordinate convention: **1 unit = 1 m, right-handed glTF, Y-up**.
- Functional UI must work before, during and after 3D loading and if realtime 3D is unavailable.
- Same semantic UI overlay must work over live 3D, loading preview and approved static fallback.
- Direct production visual runtime assets come only from `08_PRODUCTION_EXPORTS/`.
- Existing package GLBs are Stage-16 proxy/spike assets and are not final production assets.
- Final mascot/Pulkovo production GLBs are external production dependencies.
- **Day** is the release baseline lighting state.
- Morning/evening/night are derivative refinements, not required to block MVP completion.
- KTX2 is optional/unvalidated and is not required for MVP acceptance.
- No measured FPS/memory/load claim may be invented from the waived physical-device gate.

## 6. Offline behavior

MVP is **online-only for data mutation and authentication**:
- no offline task creation;
- no offline scoring;
- no offline auth;
- no offline edit/delete;
- no background mutation replay that changes product semantics.

A cached/static shell or visual fallback may render without network, but it is non-mutating and must make unavailable actions explicit.

## 7. External integration boundary

Required MVP capability with unresolved real external contract:
1. **Personnel source** — real protocol/base URL/auth/unique employee key/sync/SLA are unknown. Later implementation must provide a provider interface + mock and isolate the real contract.
2. **LLM provider** — production vendor/model/endpoint/credentials are not frozen.
3. **STT provider** — production vendor/model/endpoint/credentials are not frozen.
4. **Ambient weather/holiday data**, if needed by implementation — provider choice is not frozen and must not expand ambient content beyond Product §19.2.
5. **Final 3D production GLBs** — integrate when delivered; approved fallbacks are mandatory now.

No missing endpoint, credential, employee identifier or production asset may be fabricated.

## 8. Non-functional release baseline

P0:
- Russian UI with localization-ready strings;
- readable contrast, scalable text, adequate touch targets, labels and keyboard support for web;
- mandatory reduced-motion behavior from current visual handoff;
- backend-enforced RBAC/object authorization/privacy;
- indefinite historical retention under current Product semantics;
- structured logs, metrics and tracing for the task pipeline with error/latency/backlog observability;
- large exports must not block interactive use;
- Saint Petersburg / Europe-Moscow calendar semantics where Product uses working-day logic;
- acceptance criteria must remain testable.

Exact stack, deployment environment, named browser versions, numeric capacity budget and production SSO remain later-stage decisions.

## 9. Priority model

Stage 2 intentionally does **not** invent a P1/P2 roadmap.

Current classification:
```json
{
  "P0": 241,
  "OUT_OF_SCOPE_MVP": 11,
  "P0_RISK_WITH_FUTURE_HARDENING": 1,
  "P0_BASELINE_DEFERRED_FREEZE": 14,
  "P0_EXTERNAL_INTEGRATION": 2,
  "P0_EXTERNAL_ASSET_WITH_FALLBACK": 1,
  "DEFERRED_OPTIONAL": 1,
  "FUTURE_UNSCHEDULED": 3
}
```

Interpretation:
- `P0` and `P0_*`: coding AI must build the current MVP behavior or its explicit provider/fallback boundary.
- `P0_BASELINE_DEFERRED_FREEZE`: implement the current approved baseline; do not invent missing final visual tuning/art.
- `DEFERRED_OPTIONAL`: not required for MVP acceptance.
- `OUT_OF_SCOPE_MVP`: explicitly prohibited from MVP.
- `FUTURE_UNSCHEDULED`: source-defined future capability with no inferred date or priority.

## 10. Human gate conclusion

No owner-level scope choice is required before Stage 3.

**Release target:** `MVP`  
**Human decisions required now:** `none`  
**Files sufficient for Stage 3:** `YES`

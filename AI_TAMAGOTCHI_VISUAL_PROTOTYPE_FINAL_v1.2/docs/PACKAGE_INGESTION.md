# PACKAGE INGESTION — Working Visual Prototype

**Prototype:** AI-Тамагочи / «Любознайка»  
**Stage:** PROTOTYPE STAGE 0 — Package ingestion  
**Status:** PASS_WITH_NONBLOCKING_GAPS  
**Gate:** PASS  
**Next stage:** PROTOTYPE STAGE 1 — Repository + mock architecture  

## 1. Scope and source policy

This Stage 0 uses only:

1. `AI_TAMAGOTCHI_FINAL_DEVELOPMENT_PACKAGE_v1.0.zip` — normative development package;
2. `PROMPT_01_WORKING_VISUAL_PROTOTYPE.md` — execution procedure;
3. `TZ_01_WORKING_VISUAL_PROTOTYPE.md` — prototype stage contract.

Other uploaded Product/Visual files are intentionally not used as independent requirements.

The Development Package remains read-only. No application code is created in Stage 0.

### Ingestion transport note

The uploaded ZIP was not exposed as a directly readable file in the execution container at its declared sandbox path. Its indexed package artifacts were available individually and were used to ingest the canonical contracts required by PROMPT 01. Therefore product/frontend/game/API/visual/3D requirements are usable, but this Stage 0 does **not** claim a fresh byte-level re-unzip, archive checksum verification, or physical-copy validation of the uploaded ZIP itself.

This is a technical ingestion limitation, not a product ambiguity. It does not change any requirement or authorize an assumption.

## 2. Source precedence frozen for the prototype

Current package hierarchy:

1. latest explicit Project Owner decision;
2. latest approval/remediation/final decision;
3. current visual developer handoff;
4. Product Specification;
5. Design Specification;
6. Development Readiness recommendations;
7. preliminary artifacts;
8. model assumptions — never requirements.

Prototype behavior must follow the current final contracts, not older blocked/deprecated artifacts that may coexist in the package history.

### Important version-selection example

The current `08_GAME_ENGINE/game_config.json` is the later patched/frozen version with:

- `status = BASELINE_FROZEN`;
- `hp.initial_hp = 100`;
- `hp.initial_health_state = happy`;
- owner decision `DEC-H-002` applied.

An earlier historical `game_config.json` with `initial_hp = null` / `BLOCKED_PENDING_OWNER_DECISION` is superseded and must not drive prototype behavior.

## 3. Product/UI invariants that cannot be changed

- AI-задача is a **completed AI-assisted work case**, not a future to-do.
- Mobile bottom navigation is exactly: `Главная / История / Рейтинг / Профиль`.
- Home CTA is exactly: `Добавить AI-задачу`.
- No persistent Annual Score/rank on Home.
- No persistent Evolution XP on Home.
- No persistent numeric HP bar on Home.
- No permanent row of game actions on Home.
- Home contains compact Monthly Goals progress.
- Primary UI language is Russian.
- Mutations are online-only.
- 3D/mascot rendering never blocks functional UI.
- No manual Complexity/Score override for any role.
- Max clarifications per task version = 3.

## 4. Frontend/technical contract map

Prototype stack required by PROMPT/TZ:

- React 19 family;
- Vite;
- TypeScript strict;
- React Router;
- TanStack Query;
- Zustand only for client-only demo/UI state;
- React Hook Form + Zod;
- CSS Modules + CSS Custom Properties/tokens;
- Three.js / React Three Fiber only inside isolated 3D boundary;
- Vitest + Testing Library;
- Playwright for critical demo flow.

### Frontend responsibility split

- Query/server state: TanStack Query.
- Client-only demo/UI controls: Zustand.
- Forms/validation: RHF + Zod.
- Business/game values: mock API responses, never UI arithmetic.
- 3D: presentation-only `SceneHostBoundary`; no Score/HP/XP/Streak/Goals/ranking authority.
- Route guards: UX only; mock API still models role/object authorization behavior.

## 5. API contract map

Final OpenAPI baseline:

- OpenAPI: 3.0.3;
- paths: 58;
- operationIds: 64 unique;
- component schemas: 100;
- idempotency-required operations: 21;
- cursor-paginated operations: 14.

Prototype mock API must preserve final response/request shapes and typed failure behavior for implemented flows.

Required deterministic scenario classes:

- success;
- controlled latency/loading;
- empty;
- validation/error;
- network/API error;
- forbidden/object-scope denial;
- provider failure where applicable.

No real Personnel, LLM, STT or Object Storage systems are called.

## 6. Game/business contract map

Current frozen baseline used by prototype fixtures/mock responses:

| Rule | Current value |
|---|---|
| Initial HP/state | 100 / `happy` |
| C1/C2/C3/C4/C5 Score | 1 / 5 / 15 / 40 / 100 |
| HP state ranges | happy 80–100; normal 60–79; bored 40–59; tired 20–39; very_weak 1–19; coma 0 |
| Inactive working day | −30 HP |
| Daily max-C HP gain | +10 / +15 / +25 / +35 / +45 |
| Additional valid task | +2 HP |
| Coma exit | 2 active working days; no instant C5 exit |
| Streak increment | max +1 per active working day |
| Streak Shield | disabled / excluded |
| Evolution stages | 0 / 250 / 750 / 2000 / 5000 XP |
| Goal setup | 5 options → employee selects 2 + system assigns immutable third |
| Goal Annual Score reward | +15 each +15 all-three |
| Goal Evolution XP reward | +10 each +10 all-three |

Authoritative calculations belong to backend/domain logic in production; in the prototype these values are supplied by deterministic mock-backend fixtures.

## 7. Active screen inventory — 36 screens

`SCR_TASKS_DESIGN_CANDIDATE` is legacy/deprecated and is not an active route.

| # | Screen ID | Screen | Route | Roles |
|---:|---|---|---|---|
| 1 | SCR_AUTH_LOGIN | First Login / Personnel Verification | `/login` | public |
| 2 | SCR_ONBOARDING | Onboarding | `/onboarding` | authenticated |
| 3 | SCR_GOAL_SETUP | Monthly Goal Setup | `/goals/setup` | employee |
| 4 | SCR_HOME | Home | `/` | employee |
| 5 | SCR_CASE_ADD | Add AI Case — Text | `/ai-cases/new` | employee |
| 6 | SCR_CASE_VOICE | Voice Recording / STT | `/ai-cases/new/voice` | employee |
| 7 | SCR_CASE_TRANSCRIPT | Transcript Preview / Edit | `/ai-cases/new/transcript` | employee |
| 8 | SCR_CASE_PROCESSING | AI Processing | `/ai-cases/:taskId/processing` | employee |
| 9 | SCR_CASE_CLARIFY | Clarification 1–3 | `/ai-cases/:taskId/clarify` | employee |
| 10 | SCR_CASE_RESULT | Task Result | `/ai-cases/:taskId/result` | employee |
| 11 | SCR_CASE_DETAIL | AI Case Detail | `/ai-cases/:taskId` | employee/director/executive/admin |
| 12 | SCR_CASE_EDIT | Edit AI Case | `/ai-cases/:taskId/edit` | employee |
| 13 | SCR_HISTORY_TASKS | History — Tasks | `/history` | employee |
| 14 | SCR_HISTORY_EVENTS | History — Events | `/history/events` | employee |
| 15 | SCR_GOALS | Monthly Goals — Active | `/goals` | employee |
| 16 | SCR_RATING_EMPLOYEES | Rating — Employees | `/rating` | employee/director/executive/admin |
| 17 | SCR_RATING_DIRECTORATES | Rating — Directorates | `/rating/directorates` | employee/director/executive/admin |
| 18 | SCR_COMPANY_ANALYTICS | Rating — Analytics | `/rating/analytics` | employee/director/executive/admin |
| 19 | SCR_DIRECTORATE_CARD | Directorate Card | `/rating/directorates/:directorateId` | employee/director/executive/admin |
| 20 | SCR_PUBLIC_PROFILE | Public Employee Profile | `/profiles/:employeeId` | employee/director/executive/admin |
| 21 | SCR_PROFILE_SELF | Profile / Personal Dashboard | `/profile` | employee/director/executive/admin |
| 22 | SCR_PRIVACY | Privacy Settings | `/profile/privacy` | employee/director/executive/admin |
| 23 | SCR_VACATION | Vacation Settings | `/profile/vacation` | employee/director/executive/admin |
| 24 | SCR_ACHIEVEMENTS | Achievements / Collection | `/profile/achievements` | employee/director/executive/admin |
| 25 | SCR_SCORING_INFO | How Scoring Works | `/profile/scoring` | employee/director/executive/admin |
| 26 | SCR_NOTIFICATIONS | Notifications | `/notifications` | employee/director/executive/admin |
| 27 | SCR_DIRECTOR_DASH | Director Dashboard | `/director` | director |
| 28 | SCR_EXEC_DASH | Executive Dashboard | `/executive` | executive |
| 29 | SCR_ADMIN_PANEL | Admin Panel | `/admin` | admin |
| 30 | SCR_ADMIN_USERS | Admin — Users & Roles | `/admin/users` | admin |
| 31 | SCR_ADMIN_ORG | Admin — Org Structure | `/admin/org` | admin |
| 32 | SCR_ADMIN_CALENDAR | Admin — Corporate Calendar | `/admin/calendar` | admin |
| 33 | SCR_ADMIN_TAXONOMY | Admin — Taxonomy | `/admin/taxonomy` | admin |
| 34 | SCR_ADMIN_TOOLS | Admin — AI Tools Directory | `/admin/tools` | admin |
| 35 | SCR_ADMIN_AUDIT | Admin — Audit / Technical Trace | `/admin/audit` | admin |
| 36 | SCR_ADMIN_EXPORT | Management Export | `/exports` | director/executive/admin |

### Core flow map

```text
/login
  → /onboarding
  → /goals/setup (when required)
  → /

/ai-cases/new
  ├─ text → processing
  └─ voice → voice → transcript → processing
processing → clarification 0..3 → result → detail

/history ↔ /history/events
/history → case detail → edit / soft-delete flow

/rating → public profile
/rating/directorates → directorate card → public profile
/rating → analytics

/profile → privacy / vacation / achievements / scoring

/director → employee → task
/executive → directorate → employee → task
/admin → users / org / calendar / taxonomy / tools / audit / exports
```

## 8. Screen-state policy

Every data-backed screen must explicitly support applicable states rather than silently blanking:

- loading;
- populated/default;
- empty/no-result;
- validation error;
- API/network error;
- permission/forbidden;
- processing/submitting;
- edge/conflict where specified.

Mutation flow is non-optimistic:

`idle → client validation → submitting → server/mock success OR typed failure`.

3D failure is not a Home failure.

## 9. Visual and asset contract

### Canonical references

- Mascot reference: `03_MASCOT_LYUBOZNAYKA/01_References/MSC_Lyuboznayka_Canonical_UserApproved_v1.0.jpeg`.
- Pulkovo environment reference: `04_PULKOVO_WORLD/01_Approved_References/REF_PULKOVO_Interior_Composition_UserApproved_v2.0.png`.

### Runtime production asset source

Only assets listed current in `Asset_Manifest.xlsx` and physically under `08_PRODUCTION_EXPORTS/` may be treated as production runtime assets.

Current runtime set reported by package:

- 51 approved SVG UI icons;
- 5 approved WebP fallback assets;
- final production GLB: 0;
- final KTX2: 0.

The 51 SVGs cover the current UI icon system, including AI-case, actions, admin, forms, goals, history, navigation, status/streak/notification and related current component affordances. Exact filenames/paths are governed by `Asset_Manifest.xlsx` and must be copied from its Runtime File column in implementation, not guessed.

### Exact current WebP fallback assets

1. `08_PRODUCTION_EXPORTS/FALLBACK/IMG_Loading_Preview_390x844_v1.0.webp`
2. `08_PRODUCTION_EXPORTS/FALLBACK/IMG_3D_Unavailable_390x844_v1.0.webp`
3. `08_PRODUCTION_EXPORTS/FALLBACK/IMG_Home_Fallback_Day_390x844_v2.0.webp`
4. `08_PRODUCTION_EXPORTS/FALLBACK/MSC_Lyuboznayka_Happy_Fallback_512_v2.0.webp`
5. `08_PRODUCTION_EXPORTS/FALLBACK/MSC_Lyuboznayka_Coma_Fallback_512_v2.0.webp`

### Missing final realtime assets

Not present as production runtime binaries:

- final Lyuboznayka production GLB;
- final Pulkovo Terminal Core GLB;
- final Pulkovo background/environment GLBs;
- final furniture/signage/secondary-character GLBs;
- final KTX2 texture set;
- final branch-specific evolution art;
- final release achievement/cosmetic art catalog.

Existing SPK/technical GLBs in historical/source areas are proxy/spike files and must not be promoted, renamed, or represented as final production assets.

## 10. State-safe mascot/fallback plan

| Pet state | Prototype visual baseline when final realtime GLB is unavailable |
|---|---|
| happy | Day background + approved Happy fallback allowed |
| normal | state-neutral Day scene if valid, otherwise 3D-unavailable + semantic DOM cue; never fake Happy overlay |
| bored | 3D-unavailable + semantic DOM cue by default |
| tired | 3D-unavailable + semantic DOM cue by default |
| very_weak | 3D-unavailable + semantic DOM cue by default |
| coma | approved Coma fallback has priority |
| recovery | 3D-unavailable + DOM recovery cue unless truthful production raster is later supplied |
| vacation | state-neutral Day scene or 3D-unavailable + vacation UI; no invented vacation mascot art |

Reduced-motion is presentation-only and never changes business state.

## 11. Demo-only substitutions authorized for later stages

These are planned substitutions only; none are implemented in Stage 0.

| Production dependency | Prototype treatment | Constraint |
|---|---|---|
| Personnel DB | deterministic synthetic mock | no real employee/phone data; match/no-match/failure states |
| LLM processing | deterministic mock scenarios | returns structured classification/results; no UI numerical authority |
| STT | simulated record/STT flow | transcript preview/edit preserved; no real audio service |
| Object Storage / export delivery | mock job/artifact boundary | no real storage/provider success claim |
| Realtime 3D final art | approved static fallback as default | no fake final GLB; UI remains complete without WebGL |
| Optional demo 3D | only if later implemented as `DEMO_NONPRODUCTION` | isolated; cannot replace approved fallback contract or alter business state |
| Weather/ambient provider | disabled or deterministic non-authoritative fixture if needed by a later screen state | weather is non-critical; must not block core UI |

## 12. Required demo state matrix for the prototype

The later repository must be able to demonstrate:

- mascot: happy / normal / bored / tired / very_weak / coma;
- loading;
- empty;
- API error;
- forbidden;
- reduced-motion;
- 3D unavailable/fallback;
- roles: Employee / Director / Executive / Admin;
- Monthly Goals progress;
- Streak variations;
- 3D on/off/error control state;
- viewports: 390×844 / 430 mobile / desktop; QA also checks 360 px and ~1280×900.

Dev-only Demo Control Panel is not part of final product UI.

## 13. QA/acceptance contracts carried into the prototype

Package QA baseline identifies:

- 36 active Stage-10 screens;
- 38 frontend test contracts;
- 64/64 final API operations mapped;
- 294/294 requirements with test IDs;
- critical P0/P0-* mapping 274/274.

Prototype-specific acceptance later must cover at minimum:

- login → onboarding → required goals → Home;
- text AI-case flow;
- voice/STT simulation → transcript → processing;
- clarification count 0–3 and never 4;
- result/detail/edit/version/delete flow;
- History / Rating / Profile / Goals / Notifications;
- Director / Executive / Admin role views;
- mock forbidden/error/empty states;
- fallback without WebGL;
- keyboard/focus/labels;
- reduced motion;
- 360 / 390 / 430 mobile and desktop responsive checks.

## 14. Open/non-blocking items — no owner decision required for prototype Stage 1

The package explicitly marks current production-freeze items as non-blocking where safe baselines exist. Relevant prototype consequences:

- no final app logo → do not invent one; neutral current identity only;
- final font family/license not frozen → use current package baseline (Inter + system fallback) only;
- final scene color calibration open → use current tokens; no creative retuning;
- camera/FOV/light numeric tuning open → do not invent production calibration claims;
- performance budgets not evidence-backed → no measured-performance claims;
- final animation tuning depends on final GLB → use current motion contract/fallback only;
- achievement/evolution final art not frozen → generic current approved fallback only;
- live Figma link absent → file-based handoff remains source.

These items do not create product ambiguity for the clickable prototype because the package supplies implementation baselines or explicit fallbacks.

## 15. Stage 0 engineering decisions

### SAFE_ENGINEERING_DEFAULT

- Prototype files will live under a separate `prototype/` root.
- Stage 1 will use a deterministic mock API layer matching final OpenAPI shapes.
- Historical/deprecated visual candidates will not be imported into active routes.
- No production-like claim will be made for demo provider success, performance, or realtime 3D art.

These defaults are reversible and do not change product behavior.

### HUMAN_DECISION_REQUIRED

None for entering PROTOTYPE STAGE 1.

## 16. Stage 0 gate evaluation

| Gate check | Result |
|---|---|
| Source precedence understood | PASS |
| Current final game baseline resolved | PASS |
| Active screen/route set identified | PASS — 36 |
| Product/Home/navigation invariants identified | PASS |
| API contract identified | PASS — 64 operations |
| Visual runtime source boundary identified | PASS |
| Available runtime assets identified | PASS — 51 SVG + 5 WebP |
| Missing final 3D assets identified | PASS |
| Truthful fallback behavior identified | PASS |
| Mock boundaries identified | PASS |
| Blocking product ambiguity | 0 |
| Owner decision required before Stage 1 | 0 |
| App code written in Stage 0 | NO |
| Byte-level revalidation of uploaded ZIP | NOT_EXECUTED_NONBLOCKING — direct ZIP mount unavailable |

**PROTOTYPE STAGE 0 GATE: PASS**

Proceed to Stage 1 only after explicit owner approval.

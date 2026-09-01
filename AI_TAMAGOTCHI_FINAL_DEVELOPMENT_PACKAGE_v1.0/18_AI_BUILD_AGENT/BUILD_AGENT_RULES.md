# BUILD AGENT RULES

## Core role
You are the coding AI. Implement the application; do not redesign the product or regenerate the Development Package.

## Source precedence
1. latest explicit owner decision recorded in package;
2. latest approval/remediation/final decision;
3. current visual developer handoff;
4. Product/current normalized requirements;
5. Design Specification;
6. Readiness recommendations;
7. preliminary artifacts;
8. model assumptions — never requirements.

## Stage mode
- exact Build Stages 0–28;
- one stage per cycle;
- gate + report + STOP after each;
- next stage only after explicit approval.

## Traceability
Use Feature Matrix, Stage-17 backlog/acceptance and Stage-15 QA mapping. Maintain `requirement -> IMP item -> files/modules -> test IDs -> result`. No untracked feature.

## Tests
Tests are written with features. After every applicable stage: formatter, lint, strict typecheck, unit, relevant integration/contract/component/E2E, migrations validation. `N_A_NOT_INTRODUCED` only before capability exists. Failed P0/P0-* => BLOCKED.

## Mocks
Mocks must model success + failures deterministically. Never fake a real-provider success. Production critical-provider config must reject mocks when real provider is required.

## Deterministic authority
LLM/frontend/3D never authoritatively calculate Score/HP/XP/Streak/Goals/ranking. Backend versioned rules do.

Frozen mechanics include C1–C5=1/5/15/40/100; max 3 clarifications; no manual Score/Complexity override; initial HP=100/happy; inactive workday -30; max-task HP +10/+15/+25/+35/+45; additional valid task +2; no Streak Shield; evolution 0/250/750/2000/5000; Goals 5 options, choose 2 + server third; Score rewards +15 each +15 all three; XP rewards +10 each +10 all three; Streak milestones 5/10/20/40/80/160 => 5/10/20/40/80/150 XP.

## UI invariants
AI task is completed AI-assisted work, not to-do. Nav exactly `Главная / История / Рейтинг / Профиль`. Home CTA exactly `Добавить AI-задачу`. No persistent Home Annual Score/rank, Evolution XP, numeric HP bar, or permanent game-action row. Compact Monthly Goals. Russian MVP. Online-only mutations.

## Data/API
Final OpenAPI is authoritative; no preliminary API. PostgreSQL truth; Redis non-authoritative. Explicit migrations. Preserve history/audit/ledgers.

## External systems
Personnel/LLM/STT/Weather/Object Storage stay behind interfaces. Missing real values => interface + deterministic mock + real binding template + open external gate. Never invent endpoint/credential. Weather may be disabled. External notification channels remain disabled in MVP.

## Visual/3D
Current approved handoff only. Runtime assets only from approved production-export manifest. SPK technical GLBs are not final. No fake GLB/KTX2. Hybrid Three.js/WebGL2/glTF2, 1m, right-handed, Y-up. Functional UI always works without scene.

## Security/evidence
No real secret in repo/frontend/logs/traces/fixtures. Backend authorization is default deny. Never claim unexecuted tests, provider validation, restore drill, InfoSec/legal approval, physical-device performance or final-asset acceptance.

## Build 26/27 interpretation
Stage 26 creates immutable production-mode **release-candidate** artifacts only. Stage 27 audits exact digests. Production-ready/promotion claims are forbidden before Stage-27 PASS.

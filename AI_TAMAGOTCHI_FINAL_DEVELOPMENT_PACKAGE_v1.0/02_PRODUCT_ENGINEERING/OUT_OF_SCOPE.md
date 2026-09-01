# OUT OF SCOPE — MVP

**Stage:** 2  
**Rule:** Items below are not to be implemented as hidden, experimental or “nice-to-have” MVP behavior unless a later explicit owner decision changes scope.

## 1. Explicit Product v1.0 MVP exclusions

1. **Native iOS/Android apps** — the product target is mobile-first PWA + desktop web.
2. **Offline mutation/work mode** — no offline create/edit/delete/scoring/auth. A static/cached non-mutating shell is allowed only as fallback.
3. **External notification channels** — no push, email, Telegram or Teams notifications.
4. **Task file attachments**.
5. **Automatic URL fetching, crawling, previewing or content analysis** — task URLs are stored as strings only.
6. **Social network mechanics** — no likes, comments, follows/subscriptions or social feed.
7. **Internal currency and cosmetics shop**.
8. **Sound**.
9. **Backdated/retrospective task dates**.
10. **Automatic reclassification of historical task versions after taxonomy changes**.
11. **Streak Shield / freeze counter**.

## 2. Source-defined future scope — unscheduled

These are explicitly not assigned P1/P2 or a release date:

- SSO / Entra ID / 2FA replacing the current static personnel verification;
- HR-system integration for automatic vacation;
- automatic analysis of attached/external resources under a separate security model;
- advanced AI maturity analytics;
- additional pets/mascots beyond canonical Lyuboznayka;
- automated scoring-model retraining/evaluation loop;
- flexible retention policy replacing the current indefinite-retention product rule;
- public employee-facing company analytics broken down by directorates without a separate product decision.

`FUTURE_UNSCHEDULED` means “not in current MVP and not scheduled”, not “implicitly next release”.

## 3. Not required for MVP acceptance, but preserved as later freeze/refinement inputs

- KTX2 production pipeline;
- morning/evening/night lighting variants beyond Day baseline;
- benchmark-certified numeric LOD, memory and file-size budgets;
- final numeric camera/FOV/safe-zone values;
- final numeric runtime-lighting values;
- final animation tuning values beyond the current Stage-20 baseline;
- final brand identity/logo;
- final licensed runtime font family replacing current baseline;
- final scene-level color calibration;
- release-specific achievement/cosmetic art inventory;
- final branch-specific evolution art;
- live Figma workspace/master link;
- named production approvers and formal Full Production Freeze date.

These do **not** remove the associated MVP mechanics. Coding must use the current safe baseline/fallback.

## 4. 3D-specific exclusions

- Stage-16 proxy/spike GLBs must not be shipped as if they were approved final production mascot/Pulkovo assets.
- Realtime 3D must not become a single point of failure for Home or any functional flow.
- No fabricated FPS, memory, file-size or load-time result.
- KTX2 must not be made mandatory before validation.
- No invented final GLB/DCC asset.

## 5. Product behavior that must not be added

- arbitrary manual Score/Complexity override;
- fourth clarification question;
- scoring based on employee role, project prestige or description verbosity;
- denial of points solely because two tasks are similar after employee confirms separate execution;
- permanent pet death;
- retroactive vacation;
- automatic historical-point transfer after directorate change;
- peer access to raw task text, clarification logs or task links;
- Director access to technical scoring trace;
- Executive access to Admin system-settings management;
- social/casino-style gamification or reward economy.

## 6. Roadmap rule

Stage 2 creates **no artificial P1/P2 backlog**.  
Anything not in MVP but not explicitly future-scoped remains an open future product decision rather than a coding-AI assumption.

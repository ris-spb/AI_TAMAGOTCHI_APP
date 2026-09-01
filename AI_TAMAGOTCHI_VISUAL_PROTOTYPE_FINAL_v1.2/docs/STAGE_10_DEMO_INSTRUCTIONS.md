# Stage 10 — Demo Instructions

## Fastest start

### Windows
Double-click:

`START_AI_TAMAGOTCHI.bat`

### macOS
Open:

`START_AI_TAMAGOTCHI.command`

If Gatekeeper blocks the script, open `delivery/index.html` directly in Safari/Chrome.

### Linux
Run:

`./START_AI_TAMAGOTCHI.sh`

### Universal fallback
Open `delivery/index.html` directly in any modern browser.

## Demo entry data

- Personnel number: `DEMO-001`
- Phone: `+7 900 000-00-01`

Both are synthetic prototype values.

## Recommended walkthrough

1. `Первый запуск` — Login → five onboarding screens → select exactly two Monthly Goals → system-assigned third goal.
2. `Главная` — approved Home/fallback scene, pet state, goals, notifications, motion/reduced-motion and 3D fallback controls.
3. `Добавить AI-задачу` — text or voice/STT simulation → processing → 0–3 clarifications → result.
4. `История · Рейтинг · Профиль` — primary employee sections, privacy/goals/version semantics.
5. `Director · Executive · Admin` — switch roles and verify scoped management/admin surfaces and 403 behavior.
6. `QA / responsive` — inspect 360 / 390 / 430 / desktop QA references.

## Full React source

The same archive includes the full React/Vite/TypeScript repository. When Node 24 and npm access are available:

```bash
corepack enable
pnpm install
pnpm dev
```

Then open `http://127.0.0.1:4173`.

The offline demo launcher does not replace the source repository; it exists so visual evaluation does not depend on locally installed npm libraries.

# Stage 9 — Accessibility & Visual Remediation

This document records defects found during Stage 9 and the remediation applied without changing product semantics.

## 1. Interactive target size

**Finding:** several DEV/admin/inline controls were below the 44×44 minimum target specified by the accessibility/responsive contracts.

**Remediation:** minimum hit areas were raised to at least 44px for:

- DEV Demo Control Panel controls;
- Home Monthly Goals surface;
- segmented navigation links;
- management header actions and table links;
- muted inline actions;
- mobile bottom navigation.

## 2. Small semantic status text contrast

**Finding:** provisional success/error semantic colors against the warm surface measure approximately 4.03:1 and 4.12:1. This is below the 4.5:1 AA threshold for ordinary small text and is explicitly warned about in the package accessibility contract.

**Remediation:** semantic green/red is retained as border/decorative feedback only. Readable status/error text uses approved primary text. Feedback no longer relies on color alone.

```text
text-primary/surface=13.90:1 target>=4.5
text-secondary/surface=5.29:1 target>=4.5
text-primary/action=5.94:1 target>=4.5
known-semantic-success/surface=4.03:1 DECORATION_ONLY
known-semantic-error/surface=4.12:1 DECORATION_ONLY
STAGE9_CONTRAST_AUDIT=PASS
```

## 3. Keyboard entry and focus visibility

- Added visible-on-focus `Перейти к основному содержимому` skip link to authenticated **and public/login** shells.
- Added/retained `#main-content` target.
- Added a global `:focus-visible` baseline with offset.
- Retained explicit labels and associated validation feedback for forms.

## 4. Pet health dialog

The exact-HP detail dialog now has:

- `role=dialog`, `aria-modal` and description relationship;
- initial focus placement;
- Tab/Shift+Tab focus trap;
- Escape close;
- focus restoration to the opening control.

## 5. Live announcements

Polite live regions exist for meaningful asynchronous outcomes, including:

- AI-case result;
- export state;
- entry/setup feedback where state changes require visible status.

Loading/error/forbidden states remain text-readable and do not depend on icon/color alone.

## 6. Reduced motion

- Native `prefers-reduced-motion` remains supported.
- DEV-only reduced-motion simulation remains available.
- Spatial scale/bounce effects are suppressed; restrained opacity/tonal feedback remains.
- The real Chromium Stage-9 QA fixture confirmed no animation under emulated reduced motion.

## 7. Screen completeness defect found during QA

Stage 9 found that three active routes were still Stage-3 skeletons:

- `SCR_AUTH_LOGIN`
- `SCR_ONBOARDING`
- `SCR_GOAL_SETUP`

They were implemented from final screen/API contracts before the Stage-9 gate was re-run. All 36 active semantic screens now have content implementations.

## 8. Responsive viewport fixture defect

**Finding:** the initial Stage-9 QA fixture labelled `430 px` still rendered at 390px because of a shared max-width rule.

**Remediation:** the 430 preset was given an explicit 430px width. Real Chromium now measures the three mobile fixtures at **360 / 390 / 430** exactly.

## 9. Home visual-reference defect

Physical access to the current v2 Golden Screens exposed a meaningful visual mismatch in the earlier Home QA composition: the approved 390×844 Day fallback was being cropped into a short scene with a separate content block below it.

**Remediation:** Home was adjusted toward the current Golden composition while preserving current product contracts:

- full-height approved Pulkovo/mascot fallback scene;
- top compact `Серия / Сегодня` status;
- state/context surface over the scene;
- compact Monthly Goals surface;
- exact `Добавить AI-задачу` CTA over the scene;
- bottom navigation remains independent DOM UI;
- no persistent Annual Score/rank, Evolution XP or numeric HP.

The Golden remains a reference only. Any example business values/text inside Golden references do **not** override current Source of Truth/API/game semantics.

## Residual environment limitations

- Current v2 Golden reference binaries are now physically available and verified **17/17** by hash/dimensions.
- Real system Chromium successfully renders the dependency-free Stage-9 QA fixture through Python Playwright `page.set_content()`.
- The actual React/Vite application still cannot be booted in this container because npm dependencies cannot be installed. Therefore React-runtime Playwright E2E and React-runtime pixel diff remain `NOT_EXECUTED_ENVIRONMENT`, not PASS.

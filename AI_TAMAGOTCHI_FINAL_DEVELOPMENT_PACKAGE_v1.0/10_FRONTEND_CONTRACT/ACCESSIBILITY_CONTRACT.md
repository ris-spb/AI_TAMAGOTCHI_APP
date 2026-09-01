# ACCESSIBILITY CONTRACT

## 1. Baseline

Frontend must support:
- semantic HTML/control roles;
- keyboard operation on web;
- visible focus;
- scalable text;
- minimum 44×44 px interactive target;
- adequate contrast;
- non-color-only critical feedback;
- reduced motion.

WCAG AA is the current accessibility implementation baseline already used in the visual token audit. Passing must be verified again in Stage 15 against the actual implementation.

## 2. Known token limitation

Current Design Tokens contain provisional values, and prior visual audit found that some provisional semantic colors are not sufficient for ordinary-size text against light surfaces.

Therefore:
- do not use a failing semantic color as small standalone text merely because a token exists;
- use it for non-text semantic decoration only where contrast requirements remain satisfied;
- final scene/token contrast remains a non-blocking visual freeze item;
- do not invent a new "approved final" palette in code.

## 3. Focus and keyboard

Every interactive web control:
- reachable by keyboard;
- has visible focus;
- follows logical DOM order;
- does not require hover;
- preserves focus when route/modal state changes.

Modal/sheet implementations must:
- trap focus only while genuinely modal;
- restore focus on close;
- support Escape where appropriate;
- expose accessible title/description.

## 4. Screen state announcements

Use polite/assertive live regions selectively for:
- form validation summary;
- AI processing status changes;
- STT state;
- export completion/failure;
- significant task result completion.

Do not continuously announce ambient 3D motion.

## 5. 3D accessibility

3D is not required to operate the product.

- core actions exist in semantic DOM;
- mascot/business state has a textual semantic equivalent;
- failed/unsupported WebGL leaves the same functional controls;
- decorative animation is hidden from accessibility tree when it adds no information;
- reduced motion reaches both UI and scene bridge.

## 6. Data visualizations

Charts/tables:
- provide accessible title/summary;
- key numeric information is also available in text/table form;
- hover is not the only way to retrieve data;
- do not encode C1–C5 or status only by color.

## 7. Forms

- explicit labels;
- input purpose where applicable;
- error association via `aria-describedby`/equivalent;
- preserve user data after validation/network failure;
- disabled and loading states are distinguishable.

## 8. Motion

When `prefers-reduced-motion: reduce`:
- remove large bounce/squash/spatial travel;
- retain restrained fade/scale where useful;
- do not remove necessary state feedback.

## 9. Stage-15 verification handoff

Stage 15 must add executable:
- keyboard tests;
- automated accessibility scan;
- focus-flow checks;
- target-size checks;
- reduced-motion checks;
- critical contrast/visual checks.

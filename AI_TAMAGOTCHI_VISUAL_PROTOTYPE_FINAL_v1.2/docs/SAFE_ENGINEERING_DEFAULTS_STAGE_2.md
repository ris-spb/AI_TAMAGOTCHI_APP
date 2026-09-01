# SAFE ENGINEERING DEFAULTS — PROTOTYPE STAGE 2

These defaults are reversible implementation choices used only where the recovered current Development Package defines semantics/direction but does not expose a final scalar in the mounted execution environment.

1. **Browser-native focus outline**
   - Reason: current Stage-20 handoff requires visible focus but the recovered token set does not expose an exact focus-ring geometry token.
   - Decision: keep browser-native `outline: auto`; do not invent a new focus color/width token.
   - Product impact: none.

2. **ResponsiveGrid technical minimum column (260 px)**
   - Reason: Stage 2 requires a reusable responsive primitive; screen-specific grid geometry is Stage 3+ composition scope.
   - Decision: `260px` is a reversible component-gallery/layout primitive default and MUST NOT be interpreted as a final screen contract.
   - Product impact: none; route/screen composition may override it.

3. **ModalPreview gallery frame (420 px max modal width / 260 px stage)**
   - Reason: only a component-gallery demonstration surface is needed at Stage 2.
   - Decision: values are DEV/GALLERY ONLY, not a final runtime modal size contract.
   - Product impact: none.

4. **Approved icon binaries unavailable in the execution container**
   - Decision: retain token-correct 22px navigation icon slots and exact approved labels, but draw NO proxy pictograms.
   - Replacement: use actual `08_PRODUCTION_EXPORTS/SVG/ICO_Nav_*` binaries when mounted.
   - Product impact: none; avoids inventing visual assets.

5. **Loading feedback without invented spinner motion**
   - Reason: current component contract requires a loading state, but no spinner-specific animation is frozen in the recovered handoff.
   - Decision: use semantic `aria-busy` / loading copy and an amber static marker rather than inventing a repeating animation.
   - Product impact: none.

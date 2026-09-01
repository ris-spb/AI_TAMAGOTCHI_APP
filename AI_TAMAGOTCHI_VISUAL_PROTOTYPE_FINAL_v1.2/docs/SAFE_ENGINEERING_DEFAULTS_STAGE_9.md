# SAFE_ENGINEERING_DEFAULTS — Stage 9

Only reversible technical defaults that do not alter product/business semantics were used.

1. **Focus outline:** browser-native `outline: auto` with 2px offset. This supplies visible keyboard focus without inventing a new brand color.
2. **Semantic status contrast:** approved semantic success/error colors remain decorative borders, while approved primary text is used for readable status copy. No palette token is redefined.
3. **Dense management tables:** contained horizontal scrolling is allowed inside the table region rather than clipping or shrinking text. Root-level `overflow-x:hidden` is not used to mask defects.
4. **Mobile viewport simulation:** DEV viewport presets keep bottom navigation inside the simulated frame rather than fixing it to the physical desktop browser viewport.
5. **Entry-screen fixtures:** login identity, onboarding progress and goal options are deterministic synthetic data only and follow final API shapes.
6. **Golden reference handling:** current v2 Golden binaries are used only as QA/reference material. They are not runtime assets and do not override Source of Truth/API/game semantics when example content differs.
7. **Browser QA fallback:** because React/Vite cannot boot without npm dependencies, a dependency-free QA fixture may be rendered in system Chromium through Python Playwright `page.set_content()` for layout/viewport evidence. It is explicitly labelled as supporting QA evidence, not React-runtime E2E.
8. **Home visual remediation:** the approved full-height Day fallback is preserved as a full Home scene at mobile reference sizes; functional overlays remain DOM and are not baked into a replacement raster.

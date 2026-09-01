# RESPONSIVE FRONTEND CONTRACT

## 1. Mobile baseline

Primary range:
- 360–430 px logical width;
- reference viewport 390×844 px.

Respect:
- iOS safe areas;
- Android gesture areas;
- notch/dynamic island;
- varying aspect ratios.

## 2. Layout

Use semantic layout primitives and current token spacing.

Source-guided spacing family:
`4 / 8 / 12 / 16 / 24 / 32`.

Standard mobile outer margins follow current design guidance (16–20 px range); do not invent a different final spacing scale.

## 3. Touch

Interactive hit area:
**minimum 44×44 px**.

Visible icon may be smaller while hit target remains ≥44×44.

## 4. Desktop

Desktop/admin is a dedicated information architecture:
- do not stretch the mobile layout;
- use tables/panels/denser management composition where current handoff allows;
- preserve the same API/RBAC semantics.

## 5. Home / 3D framing

Responsive Home:
- preserves mascot face/eyes and core silhouette;
- preserves CTA/navigation safe zones;
- does not linearly scale mascot by viewport width;
- does not make functional overlay depend on realtime 3D;
- uses the same semantic overlay on live scene/loading/static fallback.

Exact numeric camera/FOV/safe-zone values remain Stage-11/external tuning items.

## 6. Content overflow

- no horizontal clipping of Russian text;
- long employee/task labels wrap/truncate accessibly;
- tables provide responsive strategy without hiding required data;
- filters may move between inline/panel/sheet presentation without changing semantics.

## 7. Text scaling

UI must tolerate browser/OS text scaling without:
- covering primary CTA;
- covering navigation;
- losing submit/error controls;
- requiring 3D interaction to access content.

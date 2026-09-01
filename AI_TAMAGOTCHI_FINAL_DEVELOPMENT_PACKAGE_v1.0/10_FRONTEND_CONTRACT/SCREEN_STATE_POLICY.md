# SCREEN STATE POLICY

## 1. Canonical source

`Screen_State_Matrix.xlsx` is the canonical visual-state catalogue.

Frontend code must map each `SCR_*` screen to its matrix rows and must not silently omit:
- loading;
- error;
- network;
- permission;
- processing;
- empty/no-result;
- edge states that are applicable to that screen.

## 2. Precedence patch

The matrix contains historical Stage-10-era text that still calls some owner decisions `OPEN`.

Those labels are metadata drift, not current product state.

Frontend must apply current `SOURCE_OF_TRUTH` to matrix rows.

## 3. State rendering

Every data-backed screen has a `ScreenStateBoundary` or equivalent composition with explicit render branches.

Do not use one generic full-screen error for all cases.

Examples:
- validation error preserves form draft;
- network error offers only a safe retry;
- permission state reveals no object data;
- empty and no-filter-result are different when the source matrix differentiates them;
- processing is not rendered as success;
- 3D failure is not a Home failure.

## 4. Stale-while-refresh

A screen may preserve last confirmed data while refreshing if:
- the UI marks/behaves consistently;
- it does not claim a stale business result is newly confirmed;
- it does not violate privacy/account status;
- the canonical state matrix does not require blocking replacement.

## 5. Mutation state

For mutation forms:
`idle → client validation → submitting → server success | typed failure`.

Do not locally mark success before the server accepts the command.

## 6. No invented visual state

Where the canonical matrix does not specify exact overlay presentation:
- use current reusable feedback components;
- keep semantics explicit;
- do not invent a new product mechanic or persistent decorative state.

Presentation can be refined later without changing state semantics.

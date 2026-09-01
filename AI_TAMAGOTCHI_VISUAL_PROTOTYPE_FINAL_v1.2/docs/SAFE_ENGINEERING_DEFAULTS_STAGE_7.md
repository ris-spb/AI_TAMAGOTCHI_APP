# SAFE_ENGINEERING_DEFAULTS — PROTOTYPE STAGE 7

These defaults are technical, reversible, prototype-only choices. They do not alter product/game rules.

1. **Deterministic role header for local mocks**  
   `X-Prototype-Role` is used only by the Vite mock layer to demonstrate Director / Executive / Admin authorization. It is not a production authentication design.

2. **Server-side mock authorization in addition to UI route guards**  
   The mock server re-checks role and object scope so a manually-entered protected URL cannot be treated as authorized merely because the UI is hidden.

3. **Director object scope**  
   Director mock access is restricted to the deterministic own-directorate ID. This implements the final role semantics without inventing cross-directorate privileges.

4. **Executive drill-down**  
   Executive uses the final privileged Executive endpoints for directorate/employee drill-down rather than peer public-profile projections.

5. **Admin scoring trace is read-only**  
   The technical trace can be inspected only by Admin. No mutation route/control for Score or Complexity exists.

6. **Export job simulation**  
   Export jobs are deterministic in-memory prototype jobs. Director scope is fixed to `directorate`; Executive/Admin can use company scope. Generated file content is clearly demo-only.

7. **No invented employee-create endpoint**  
   The final OpenAPI lacks `POST /v1/admin/employees`; Stage 7 intentionally omits manual employee creation rather than deriving a new DTO/endpoint from the older product description.

8. **In-memory Admin mutations**  
   Employee patch, org, calendar, taxonomy and tools changes exist only for the current dev session and are reset on server restart.

9. **Controlled latency/error states**  
   Loading/empty/error/forbidden are mock states and do not represent measured production performance or reliability.

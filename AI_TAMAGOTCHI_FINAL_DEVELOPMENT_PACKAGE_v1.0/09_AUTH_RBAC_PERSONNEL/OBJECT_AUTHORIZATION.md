# OBJECT AUTHORIZATION

Authorization order for every protected object request:
1. validate opaque server-backed session;
2. require current `account_status=active`;
3. load current app role and current organizational scope;
4. identify target object owner/current-or-historical directorate as required by the endpoint;
5. apply object rule from RBAC matrix;
6. apply privacy projection only after privileged/raw-data checks;
7. emit required audit event for privileged/mutating actions;
8. return only authorized projection.

## Scope rules

Employee: self/owned tasks. Director: management detail only for employees/tasks in own current directorate, while historical task attribution remains immutable. Executive: company management/analytics scope but no system settings. Admin: company-wide system administration and technical trace.

Peer privacy never grants raw input, clarification log or task links. `profile_hidden` may suppress public/peer profile without deleting history.

Exports are re-authorized at create, status and download. A stored object key is never authorization proof.

IDs from request parameters are untrusted. Every endpoint must prevent IDOR/BOLA by resolving the object then applying server-side scope before serialization.

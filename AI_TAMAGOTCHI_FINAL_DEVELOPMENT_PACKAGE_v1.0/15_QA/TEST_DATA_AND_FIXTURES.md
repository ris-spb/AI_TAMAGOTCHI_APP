# TEST DATA & FIXTURES

All committed fixtures are synthetic.

Required fixture families:
- roles: employee/director/executive/admin, blocked/terminated, transfer A→B;
- AI cases: C1–C5, ambiguous, three clarifications, duplicate-like, edits, delete, provider failures;
- game calendar: working/non-working/vacation, HP boundary values, coma recovery, streak/year boundary;
- goals: five options, 2 selections + server third, progress/close/retry;
- rating/privacy: multi-directorate, transfer, zero-headcount, terminated employee;
- security: IDOR, XSS-like text, spreadsheet formula prefixes, invalid tokens, malformed schema, prompt injection;
- providers: success/no-match/timeout/rate-limit/invalid response/checksum mismatch;
- 3D: WebGL live/failure/context loss/fallback/reduced motion, 360/390/430 viewports.

Business timezone baseline: `Europe/Moscow`.

Final external GLBs and real employee/provider credentials are never fabricated as fixtures.

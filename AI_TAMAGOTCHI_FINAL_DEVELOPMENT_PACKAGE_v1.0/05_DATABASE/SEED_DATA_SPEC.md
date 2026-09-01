# SEED DATA SPEC

Seed data is deterministic and contains no real employee/phone/credential data.

Required development/test seed groups:
- current game rule version key `game_rules_v1.0-baseline.stage7`;
- AI prompt/schema/rubric version registry entries used by mocks/tests;
- synthetic directorates/employees with non-real personnel numbers and phones;
- all four roles (`employee`, `director`, `executive`, `admin`) represented by fixtures;
- corporate-calendar deterministic test dates including workday/weekend/override cases;
- taxonomy/tool fixture subset sufficient for test scenarios;
- mock Personnel identities consistent with Stage‑9 MockPersonnelProvider;
- task/history/goal/score fixtures created only through test helpers when domain behavior is under test.

Do not seed:
- production credentials/endpoints;
- real employee data;
- fake final production 3D assets;
- fabricated final achievement/cosmetic catalog;
- historical backdated production data.

Production deployment may seed only approved system versions/reference catalogs and must not auto-create user identities from development fixtures.

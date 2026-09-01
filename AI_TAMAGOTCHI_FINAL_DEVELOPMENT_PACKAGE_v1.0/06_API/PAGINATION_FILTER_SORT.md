# PAGINATION / FILTER / SORT CONTRACT

## Cursor pagination
Growing collections use:
- `cursor` opaque, optional;
- `page_size` 1..100, default 20.

The page-size bounds are a reversible `SAFE_ENGINEERING_DEFAULT`.

Response:
`items[] + next_cursor`.

The cursor is server-issued, opaque and bound to authorization/filter/sort state.
Invalid cursor -> `400 INVALID_CURSOR`.

## Task History filters
- date period
- Complexity
- tool
- category/subcategory
- goal
- current status
- search

Sort:
- registration time asc/desc
- score asc/desc

## Progress events
Filters:
- period
- event type

Sort:
- created_at asc/desc

## Rating
Employee rating:
- employee search
- directorate filter
- rank / annual_score / name sort

Directorate rating:
- rank / average_score / total_score / name sort

## Admin
Employees:
- search
- directorate
- role
- account status

Tools:
- search
- active

Audit:
- actor
- entity
- period

## No generic query language
No arbitrary SQL-like filtering or user-provided sort expression is exposed.
Every supported filter/sort is enumerated in OpenAPI.

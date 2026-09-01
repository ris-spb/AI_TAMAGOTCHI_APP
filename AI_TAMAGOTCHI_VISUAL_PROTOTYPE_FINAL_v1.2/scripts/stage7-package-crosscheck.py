from pathlib import Path
import csv, yaml

root=Path('/mnt/data/ai_tamagotchi_pkg/AI_TAMAGOTCHI_FINAL_DEVELOPMENT_PACKAGE_v1.0')
if not root.exists():
    print('STAGE7_PACKAGE_CROSSCHECK=SKIP package_not_mounted')
    raise SystemExit(0)

screen_ids={
'SCR_DIRECTOR_DASH','SCR_EXEC_DASH','SCR_ADMIN_PANEL','SCR_ADMIN_USERS','SCR_ADMIN_ORG','SCR_ADMIN_CALENDAR','SCR_ADMIN_TAXONOMY','SCR_ADMIN_TOOLS','SCR_ADMIN_AUDIT','SCR_ADMIN_EXPORT'
}
with (root/'10_FRONTEND_CONTRACT'/'SCREEN_CONTRACT_MATRIX.csv').open(encoding='utf-8-sig') as f:
    rows={r['screen_id']:r for r in csv.DictReader(f)}
missing=screen_ids-set(rows)
if missing: raise SystemExit(f'missing screens {sorted(missing)}')
expected_roles={
'SCR_DIRECTOR_DASH':'director','SCR_EXEC_DASH':'executive','SCR_ADMIN_PANEL':'admin','SCR_ADMIN_USERS':'admin','SCR_ADMIN_ORG':'admin','SCR_ADMIN_CALENDAR':'admin','SCR_ADMIN_TAXONOMY':'admin','SCR_ADMIN_TOOLS':'admin','SCR_ADMIN_AUDIT':'admin','SCR_ADMIN_EXPORT':'director;executive;admin'}
for sid,roles in expected_roles.items():
    if rows[sid]['roles']!=roles: raise SystemExit(f'{sid} roles mismatch {rows[sid]["roles"]}')

api=yaml.safe_load((root/'06_API'/'openapi_final_v1.yaml').read_text(encoding='utf-8'))
paths=api['paths']
required_methods={
'/v1/director/dashboard': {'get'},
'/v1/director/employees': {'get'},
'/v1/director/employees/{employeeId}': {'get'},
'/v1/executive/dashboard': {'get'},
'/v1/executive/directorates/{directorateId}': {'get'},
'/v1/executive/employees/{employeeId}': {'get'},
'/v1/admin/employees': {'get'},
'/v1/admin/employees/{employeeId}': {'patch'},
'/v1/admin/directorates': {'get','post'},
'/v1/admin/directorates/{directorateId}': {'patch'},
'/v1/admin/calendar': {'get'},
'/v1/admin/calendar/{date}': {'put'},
'/v1/admin/taxonomy/versions': {'get','post'},
'/v1/admin/taxonomy/versions/{taxonomyVersionId}': {'get'},
'/v1/admin/taxonomy/versions/{taxonomyVersionId}/activate': {'post'},
'/v1/admin/taxonomy/versions/{taxonomyVersionId}/categories': {'post'},
'/v1/admin/taxonomy/versions/{taxonomyVersionId}/categories/{categoryId}': {'patch'},
'/v1/admin/taxonomy/versions/{taxonomyVersionId}/subcategories': {'post'},
'/v1/admin/taxonomy/versions/{taxonomyVersionId}/subcategories/{subcategoryId}': {'patch'},
'/v1/admin/tools': {'get','post'},
'/v1/admin/tools/{toolId}': {'patch'},
'/v1/admin/unrecognized-tools': {'get'},
'/v1/admin/audit': {'get'},
'/v1/admin/tasks/{taskId}/scoring-trace': {'get'},
'/v1/exports': {'post'},
'/v1/exports/{exportId}': {'get'},
'/v1/exports/{exportId}/download': {'get'},
}
for p, expected in required_methods.items():
    if p not in paths: raise SystemExit(f'missing api path {p}')
    actual={m for m in paths[p] if m.lower() in {'get','post','patch','put','delete'}}
    if not expected.issubset(actual): raise SystemExit(f'{p} methods mismatch expected={sorted(expected)} actual={sorted(actual)}')

# Final API deliberately has no manual employee-create operation. Do not invent it in the prototype.
if 'post' in paths['/v1/admin/employees']:
    raise SystemExit('unexpected POST /v1/admin/employees appeared; re-review prototype contract')

patch=api['components']['schemas']['AdminEmployeePatch']['properties']
if 'score' in patch or 'complexity_level' in patch: raise SystemExit('manual score override leaked into AdminEmployeePatch')
trace=api['components']['schemas']['ScoringTrace']['properties']
if trace['score'].get('enum')!=[1,5,15,40,100]: raise SystemExit('ScoringTrace fixed score mismatch')

print(f'STAGE7_PACKAGE_CROSSCHECK=PASS screens={len(screen_ids)}/{len(screen_ids)} api_paths={len(required_methods)}/{len(required_methods)} methods=PASS admin_override=absent manual_employee_post=absent')

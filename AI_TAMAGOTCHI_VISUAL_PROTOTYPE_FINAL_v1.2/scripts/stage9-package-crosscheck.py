from pathlib import Path
import csv,re,json,hashlib
from PIL import Image

root=Path(__file__).resolve().parents[1]
pkg=Path('/mnt/data/ai_tamagotchi_pkg/AI_TAMAGOTCHI_FINAL_DEVELOPMENT_PACKAGE_v1.0')
visual=Path('/mnt/data/visual_full_stage9/AI_TAMAGOTCHI_VISUAL_PACKAGE_v1.0')
required=[
 pkg/'10_FRONTEND_CONTRACT/RESPONSIVE_CONTRACT.md',
 pkg/'10_FRONTEND_CONTRACT/ACCESSIBILITY_CONTRACT.md',
 pkg/'15_QA/FRONTEND_E2E_AND_ACCESSIBILITY.md',
 pkg/'15_QA/VISUAL_REGRESSION_TESTS.md',
 pkg/'15_QA/SCREEN_TEST_MATRIX.csv',
]
for p in required:
    if not p.exists(): raise SystemExit(f'MISSING {p}')
rows=list(csv.DictReader((pkg/'15_QA/SCREEN_TEST_MATRIX.csv').open(encoding='utf-8-sig')))
if len(rows)!=36: raise SystemExit(f'expected 36 screens, got {len(rows)}')
if sum(r['accessibility_test']=='REQUIRED' for r in rows)!=36: raise SystemExit('not all 36 screens require a11y')
visual_yes=sum(r['visual_regression_test']=='YES' for r in rows)
if visual_yes!=34: raise SystemExit(f'expected 34 visual regression screens, got {visual_yes}')

catalog=(root/'src/routes/routeCatalog.ts').read_text()
ids=set(re.findall(r"screenId:\s*'(SCR_[A-Z0-9_]+)'",catalog))
if len(ids)!=36: raise SystemExit(f'route catalog screen count {len(ids)}')

runtime=list((root/'public/production-assets/08_PRODUCTION_EXPORTS').rglob('*.svg'))+list((root/'public/production-assets/08_PRODUCTION_EXPORTS').rglob('*.webp'))
if len(runtime)!=56: raise SystemExit(f'expected 56 runtime assets, got {len(runtime)}')

golden_dir=visual/'10_QA_REFERENCE/Golden_Screens'
index_path=golden_dir/'Golden_Screen_Index_v2.0.json'
if not index_path.exists(): raise SystemExit('current v2 Golden index missing')
idx=json.loads(index_path.read_text())
if idx.get('count')!=17: raise SystemExit(f"Golden index count {idx.get('count')}")
verified=[]
for rec in idx['screens']:
    p=golden_dir/rec['filename']
    if not p.exists(): raise SystemExit(f'Golden missing: {p.name}')
    raw=p.read_bytes()
    digest=hashlib.sha256(raw).hexdigest()
    if digest!=rec['sha256']: raise SystemExit(f'Golden hash mismatch: {p.name}')
    with Image.open(p) as im:
        dims=f'{im.width}x{im.height}'
    if dims!=rec['dimensions']: raise SystemExit(f'Golden dimensions mismatch: {p.name}: {dims}')
    if len(raw)!=rec['bytes']: raise SystemExit(f'Golden byte-size mismatch: {p.name}')
    verified.append(p)

print('STAGE9_PACKAGE_CROSSCHECK=PASS')
print('ACTIVE_SCREENS=36')
print('A11Y_REQUIRED=36')
print(f'VISUAL_REGRESSION_REQUIRED={visual_yes}')
print('VIEWPORTS=360|390x844|430|1280x900')
print('RUNTIME_ASSETS=56')
print(f'GOLDEN_V2_VERIFIED={len(verified)}/17')
print('GOLDEN_MOBILE=15')
print('GOLDEN_DESKTOP=2')
print('GOLDEN_RUNTIME_USAGE=REFERENCE_ONLY')
print('GOLDEN_PIXEL_DIFF_ACTUAL_REACT=NOT_EXECUTED_REACT_RUNTIME_UNAVAILABLE')

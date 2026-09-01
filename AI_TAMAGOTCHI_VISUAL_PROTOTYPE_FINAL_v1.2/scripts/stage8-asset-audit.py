from pathlib import Path
import hashlib, json
from PIL import Image

root = Path('public/production-assets/08_PRODUCTION_EXPORTS')
files = [p for p in root.rglob('*') if p.is_file()]
svg = [p for p in files if p.suffix.lower() == '.svg']
webp = [p for p in files if p.suffix.lower() == '.webp']
glb = [p for p in files if p.suffix.lower() == '.glb']
ktx = [p for p in files if p.suffix.lower() == '.ktx2']
assert len(svg) == 51, f'SVG count {len(svg)}'
assert len(webp) == 5, f'WebP count {len(webp)}'
assert len(glb) == 0, f'GLB count {len(glb)}'
assert len(ktx) == 0, f'KTX2 count {len(ktx)}'

required = [
    'FALLBACK/IMG_Home_Fallback_Day_390x844_v2.0.webp',
    'FALLBACK/IMG_Loading_Preview_390x844_v1.0.webp',
    'FALLBACK/IMG_3D_Unavailable_390x844_v1.0.webp',
    'FALLBACK/MSC_Lyuboznayka_Happy_Fallback_512_v2.0.webp',
    'FALLBACK/MSC_Lyuboznayka_Coma_Fallback_512_v2.0.webp',
    'SVG/ICO_Nav_Home_Active_Outline_v1.0.svg',
    'SVG/ICO_Nav_History_Active_Outline_v1.1.svg',
    'SVG/ICO_Nav_Rating_Active_Outline_v1.1.svg',
    'SVG/ICO_Nav_Profile_Active_Outline_v1.1.svg',
]
for rel in required:
    p = root / rel
    assert p.is_file() and p.stat().st_size > 0, rel

# The imported bytes must match the audited Production Export Index v2.0 exactly.
index = json.loads((root / 'Production_Export_Index_v2.0.json').read_text())
indexed = {item['path'].removeprefix('08_PRODUCTION_EXPORTS/'): item for item in index['runtime_files']}
for p in svg + webp:
    rel = p.relative_to(root).as_posix()
    assert rel in indexed, f'not indexed: {rel}'
    actual = hashlib.sha256(p.read_bytes()).hexdigest()
    expected = indexed[rel]['sha256']
    assert actual == expected, f'hash mismatch: {rel}'


expected_dims = {
    'FALLBACK/IMG_Home_Fallback_Day_390x844_v2.0.webp': (390, 844),
    'FALLBACK/IMG_Loading_Preview_390x844_v1.0.webp': (390, 844),
    'FALLBACK/IMG_3D_Unavailable_390x844_v1.0.webp': (390, 844),
    'FALLBACK/MSC_Lyuboznayka_Happy_Fallback_512_v2.0.webp': (512, 512),
    'FALLBACK/MSC_Lyuboznayka_Coma_Fallback_512_v2.0.webp': (512, 512),
}
for rel, expected in expected_dims.items():
    with Image.open(root / rel) as im:
        assert im.format == 'WEBP', f'format mismatch: {rel} => {im.format}'
        assert im.size == expected, f'dimension mismatch: {rel} => {im.size}, expected {expected}'

assert len(indexed) == 56, f'index runtime count {len(indexed)}'
print(f'STAGE8_ASSET_AUDIT=PASS runtime_assets={len(svg)+len(webp)} svg={len(svg)} webp={len(webp)} glb={len(glb)} ktx2={len(ktx)} hashes=56/56 webp_dimensions=5/5')

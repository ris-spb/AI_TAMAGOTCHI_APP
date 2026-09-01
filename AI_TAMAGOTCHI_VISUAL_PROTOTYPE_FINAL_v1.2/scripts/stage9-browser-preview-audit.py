from pathlib import Path
import base64, json, re, sys

try:
    from playwright.sync_api import sync_playwright
except Exception as exc:
    print(f'STAGE9_BROWSER_PREVIEW_AUDIT=NOT_EXECUTED playwright_import={exc}')
    raise SystemExit(2)

root = Path(__file__).resolve().parents[1]
preview = root / 'docs/STAGE_9_QA_PREVIEW.html'
out = root / 'docs/stage9_browser'
out.mkdir(exist_ok=True)

html = preview.read_text(encoding='utf-8')
asset_pattern = re.compile(r'\.\./public/(production-assets/[^\"\')]+)')
for relative in sorted(set(asset_pattern.findall(html))):
    file_path = root / 'public' / relative
    suffix = file_path.suffix.lower()
    mime = {'.webp': 'image/webp', '.svg': 'image/svg+xml', '.png': 'image/png'}.get(suffix, 'application/octet-stream')
    uri = f'data:{mime};base64,' + base64.b64encode(file_path.read_bytes()).decode('ascii')
    html = html.replace('../public/' + relative, uri)

results = {'renderer': 'system Chromium via Python Playwright page.set_content', 'artifact': 'dependency-free Stage-9 QA preview', 'checks': {}}

def ok(name, value):
    results['checks'][name] = bool(value)
    print(('PASS ' if value else 'FAIL ') + name)
    return bool(value)

with sync_playwright() as p:
    browser = p.chromium.launch(
        executable_path='/usr/bin/chromium',
        headless=True,
        args=['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--disable-background-networking'],
    )
    page = browser.new_page(viewport={'width': 1440, 'height': 1600})
    page.set_content(html, wait_until='load', timeout=10000)

    ok('document title', page.title() == 'AI-Тамагочи — Stage 9 QA Matrix')
    ok('no 1440 horizontal overflow', page.evaluate('document.documentElement.scrollWidth <= document.documentElement.clientWidth'))
    frames = page.locator('.matrix .frame')
    widths = []
    for i in range(3):
        box = frames.nth(i).bounding_box()
        widths.append(round(box['width']) if box else None)
    ok('mobile frame widths 360/390/430', widths == [360, 390, 430])

    cta_heights = []
    nav_heights = []
    for i in range(3):
        cta = page.locator('.matrix .cta').nth(i).bounding_box()
        nav = page.locator('.matrix .nav span').nth(i * 4).bounding_box()
        cta_heights.append(round(cta['height']) if cta else 0)
        nav_heights.append(round(nav['height']) if nav else 0)
    ok('mobile CTA >=52px', all(x >= 52 for x in cta_heights))
    ok('mobile navigation targets >=44px', all(x >= 44 for x in nav_heights))

    page.emulate_media(reduced_motion='reduce')
    motion = page.locator('.cta').first.evaluate("el => ({animation:getComputedStyle(el).animationName,transition:getComputedStyle(el).transitionDuration})")
    ok('reduced motion has no animation', motion['animation'] == 'none')

    page.screenshot(path=str(out / 'STAGE_9_QA_PREVIEW_1440.png'), full_page=True)
    names = ['HOME_360', 'HOME_390x844', 'HOME_430']
    for i, name in enumerate(names):
        frames.nth(i).screenshot(path=str(out / f'{name}.png'))
    page.locator('section.case > .frame.desktop').screenshot(path=str(out / 'MANAGEMENT_1280_REFERENCE.png'))
    browser.close()

results['observed_mobile_widths'] = widths
results['cta_heights'] = cta_heights
results['nav_target_heights'] = nav_heights
(results_path := out / 'browser_audit.json').write_text(json.dumps(results, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
failed = [k for k, v in results['checks'].items() if not v]
if failed:
    print('STAGE9_BROWSER_PREVIEW_AUDIT=FAIL ' + ','.join(failed))
    raise SystemExit(1)
print('STAGE9_BROWSER_PREVIEW_AUDIT=PASS checks=' + str(len(results['checks'])))
print('NOTE=Browser check renders dependency-free QA artifact, not React/Vite runtime.')

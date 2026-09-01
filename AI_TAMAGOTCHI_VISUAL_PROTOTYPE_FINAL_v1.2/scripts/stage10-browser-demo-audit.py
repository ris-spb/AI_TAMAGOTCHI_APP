from pathlib import Path
import base64, json, re
try:
    from playwright.sync_api import sync_playwright
except Exception as exc:
    print(f'STAGE10_BROWSER_DEMO_AUDIT=NOT_EXECUTED playwright_import={exc}')
    raise SystemExit(2)
root=Path(__file__).resolve().parents[1]
out=root/'docs'/'stage10_screenshots'; out.mkdir(exist_ok=True)
html=(root/'delivery/index.html').read_text(encoding='utf-8')
# Container policy blocks URL navigation. Inline exact local delivery assets for browser QA only.
for rel in sorted(set(re.findall(r"(?:assets|qa)/[^\"'`)]+\.(?:webp|png|svg)", html))):
    p=root/'delivery'/rel
    if not p.is_file(): continue
    mime={'.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml'}[p.suffix.lower()]
    uri='data:'+mime+';base64,'+base64.b64encode(p.read_bytes()).decode('ascii')
    html=html.replace(rel,uri)
results={'renderer':'system Chromium via Python Playwright page.set_content','artifact':'self-contained dependency-free Stage-10 delivery','checks':{}}
def ok(n,v): results['checks'][n]=bool(v); print(('PASS ' if v else 'FAIL ')+n); return bool(v)
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--disable-background-networking'])
    page=browser.new_page(viewport={'width':1440,'height':1000}); page.set_content(html,wait_until='load',timeout=15000)
    ok('delivery title',page.title()=='AI-Тамагочи · Финальный визуальный прототип')
    ok('no desktop overflow',page.evaluate('document.documentElement.scrollWidth <= document.documentElement.clientWidth'))
    ok('login visible',page.get_by_text('Вход в AI-Тамагочи').is_visible()); page.screenshot(path=str(out/'01_START_LOGIN_1440.png'),full_page=True)
    page.get_by_role('button',name='Продолжить').click(); ok('onboarding step 1',page.get_by_text('1 / 5').is_visible()); page.screenshot(path=str(out/'02_ONBOARDING_1440.png'),full_page=True)
    for _ in range(4): page.get_by_role('button',name='Далее').click()
    page.get_by_role('button',name='Завершить onboarding').click(); ok('goal setup visible',page.get_by_text('Выберите 2 Monthly Goals').is_visible())
    cs=page.locator('input[type="checkbox"]'); cs.nth(0).check(); cs.nth(1).check(); ok('exactly two goals selected',page.locator('input[type="checkbox"]:checked').count()==2)
    page.get_by_role('button',name='Подтвердить 2 цели').click(); ok('system goal visible',page.get_by_text('Системная цель',exact=False).count()>=1); page.screenshot(path=str(out/'03_GOALS_SETUP_1440.png'),full_page=True)
    page.get_by_role('button',name='Перейти на главную').click(); page.wait_for_timeout(150); ok('home CTA visible',page.locator('#addCaseBtn').is_visible()); ok('home approved scene image present',page.locator('#sceneBg').count()==1); page.screenshot(path=str(out/'04_HOME_1440.png'),full_page=True)
    page.locator('#addCaseBtn').click(); ok('ai-case entry visible',page.get_by_text('Что вы уже сделали с помощью ИИ?').is_visible()); page.screenshot(path=str(out/'05_AI_CASE_1440.png'),full_page=True)
    page.get_by_role('button',name='Отправить AI-кейс').click(); page.wait_for_timeout(700); ok('clarification flow reached',page.get_by_text('Уточнение 1 из 2').is_visible()); page.get_by_role('button',name='Ответить').click(); page.wait_for_timeout(650); page.get_by_role('button',name='Ответить').click(); page.wait_for_timeout(650); ok('result reached',page.get_by_text('AI-кейс зарегистрирован').is_visible())
    page.locator('#desktopNav').get_by_role('button',name='История · Рейтинг · Профиль').click(); ok('history visible',page.get_by_role('heading',name='История').is_visible()); page.screenshot(path=str(out/'06_EMPLOYEE_1440.png'),full_page=True)
    page.locator('#desktopNav').get_by_role('button',name='Director · Executive · Admin').click(); ok('admin panel visible',page.get_by_role('heading',name='Admin Panel').is_visible()); page.get_by_role('button',name='Employee').click(); ok('employee management forbidden',page.get_by_text('Management недоступен').is_visible()); page.screenshot(path=str(out/'07_MANAGEMENT_1440.png'),full_page=True)
    page.locator('#desktopNav').get_by_role('button',name='QA / responsive').click(); ok('qa matrix visible',page.get_by_role('heading',name='Viewport matrix').is_visible()); page.screenshot(path=str(out/'08_QA_1440.png'),full_page=True)
    mobile=browser.new_page(viewport={'width':390,'height':844}); mobile.set_content(html,wait_until='load',timeout=15000)
    ok('mobile no horizontal overflow',mobile.evaluate('document.documentElement.scrollWidth <= document.documentElement.clientWidth')); ok('mobile nav visible',mobile.locator('#mobileNav').is_visible()); ok('mobile primary >=44',(mobile.get_by_role('button',name='Продолжить').bounding_box() or {'height':0})['height']>=44); mobile.screenshot(path=str(out/'09_START_390x844.png'),full_page=True); mobile.close(); browser.close()
failed=[k for k,v in results['checks'].items() if not v]
(out/'browser_audit.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
if failed: print('STAGE10_BROWSER_DEMO_AUDIT=FAIL '+','.join(failed)); raise SystemExit(1)
print('STAGE10_BROWSER_DEMO_AUDIT=PASS checks='+str(len(results['checks'])))
print('NOTE=This validates the self-contained offline visual delivery, not the unavailable npm-built React runtime.')

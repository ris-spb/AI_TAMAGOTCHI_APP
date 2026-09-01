from pathlib import Path
import json, sys, re
root=Path(__file__).resolve().parents[1]
checks={}
def ck(name,cond): checks[name]=bool(cond); print(('PASS ' if cond else 'FAIL ')+name)
required=['delivery/index.html','delivery/assets/IMG_Home_Fallback_Day_390x844_v2.0.webp','delivery/assets/IMG_3D_Unavailable_390x844_v1.0.webp','delivery/assets/MSC_Lyuboznayka_Coma_Fallback_512_v2.0.webp','delivery/qa/STAGE_9_QA_PREVIEW_1440.png','START_AI_TAMAGOTCHI.html','START_AI_TAMAGOTCHI.bat','START_AI_TAMAGOTCHI.command','START_AI_TAMAGOTCHI.sh','QUICK_START_RU.txt','README.md','docs/PROTOTYPE_VS_FINAL.md','docs/STAGE_10_DEMO_INSTRUCTIONS.md']
for rel in required: ck('exists '+rel,(root/rel).is_file())
html=(root/'delivery/index.html').read_text(encoding='utf-8')
for token in ['Первый запуск','Главная','Добавить AI-задачу','История · Рейтинг · Профиль','Director · Executive · Admin','QA / responsive']: ck('delivery nav '+token,token in html)
for token in ['DEMO-001','+7 900 000-00-01','Завершить onboarding','Подтвердить 2 цели','Перейти на главную','Уточнение ${clarAnswered+1} из ${clarCount}','AI-кейс зарегистрирован']: ck('critical flow '+token,token in html)
ck('no external web dependencies',not re.search(r'(?:src|href)=["\']https?://',html))
ck('no iframe dependency','<iframe' not in html.lower())
ck('react source retained',(root/'src/main.tsx').is_file() and (root/'package.json').is_file())
ck('difference register declares npm build gap','pnpm install' in (root/'docs/PROTOTYPE_VS_FINAL.md').read_text(encoding='utf-8'))
ck('launcher points to delivery','delivery\\index.html' in (root/'START_AI_TAMAGOTCHI.bat').read_text())
failed=[k for k,v in checks.items() if not v]
(root/'docs/stage10_static_audit.json').write_text(json.dumps({'checks':checks,'failed':failed},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
if failed: print('STAGE10_STATIC_AUDIT=FAIL count='+str(len(failed))); sys.exit(1)
print('STAGE10_STATIC_AUDIT=PASS checks='+str(len(checks)))

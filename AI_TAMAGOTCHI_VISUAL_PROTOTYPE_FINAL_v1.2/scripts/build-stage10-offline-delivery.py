from pathlib import Path
import shutil
root=Path(__file__).resolve().parents[1]
src=root/'demo'/'index.html'
out=root/'delivery'
if out.exists(): shutil.rmtree(out)
(out/'assets').mkdir(parents=True)
(out/'qa').mkdir(parents=True)
html=src.read_text(encoding='utf-8')
assets=[
 'IMG_Home_Fallback_Day_390x844_v2.0.webp',
 'IMG_3D_Unavailable_390x844_v1.0.webp',
 'MSC_Lyuboznayka_Coma_Fallback_512_v2.0.webp',
]
for name in assets:
    source=root/'public'/'production-assets'/'08_PRODUCTION_EXPORTS'/'FALLBACK'/name
    target=out/'assets'/name
    shutil.copy2(source,target)
    old='../public/production-assets/08_PRODUCTION_EXPORTS/FALLBACK/'+name
    html=html.replace(old,'assets/'+name)
qa='STAGE_9_QA_PREVIEW_1440.png'
shutil.copy2(root/'docs'/'stage9_browser'/qa,out/'qa'/qa)
html=html.replace('../docs/stage9_browser/'+qa,'qa/'+qa)
(out/'index.html').write_text(html,encoding='utf-8')
(out/'README.txt').write_text('AI-Tamagotchi dependency-free offline demo delivery. Open index.html in a modern browser. Synthetic mock data only.\n',encoding='utf-8')
print('STAGE10_OFFLINE_DELIVERY_BUILD=PASS files='+str(sum(1 for p in out.rglob('*') if p.is_file())))

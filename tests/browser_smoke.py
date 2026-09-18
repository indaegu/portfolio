"""Offline smoke tests using the exact built HTML/CSS/JS embedded in Chromium.
Network navigation is intentionally not tested. External fonts are excluded.
Run npm run build first. pip install playwright; playwright install chromium.
"""
from pathlib import Path
import os,json,re,shutil
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1];DIST=ROOT/'dist';OUT=ROOT/'test-results';OUT.mkdir(exist_ok=True)
results=[]
def check(name,value,detail=None):
    results.append({'name':name,'passed':bool(value),'details':detail})
    if not value:raise AssertionError(name+': '+str(detail))
def document(path='index.html',script=True,before=''):
    html=(DIST/path).read_text(encoding='utf-8')
    html=re.sub(r'<link[^>]+>','',html)
    html=re.sub(r'<script[^>]+src=[^>]+></script>','',html)
    html=html.replace('</head>','<style>'+(DIST/'assets/site.css').read_text(encoding='utf-8')+'</style></head>')
    if script:html=html.replace('</body>','<script>'+before+(DIST/'assets/site.js').read_text(encoding='utf-8')+'</script></body>')
    return html
with sync_playwright() as p:
    executable=os.environ.get('CHROMIUM_PATH') or shutil.which('chromium')
    b=p.chromium.launch(headless=True,args=['--no-sandbox'],**({'executable_path':executable} if executable else {}))
    def context(width=1440,height=1000,**kwargs):return b.new_context(viewport={'width':width,'height':height},**kwargs)
    cases=sorted(DIST.glob('projects/*/index.html'))
    for width in [320,390,768,1024,1440]:
        c=context(width,reduced_motion='reduce');page=c.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)));page.set_content(document())
        size=page.evaluate('({viewport:innerWidth,scroll:document.documentElement.scrollWidth})')
        check(f'home no overflow at {width}',size['scroll']<=size['viewport'],size)
        check(f'navigation named at {width}',all(page.get_by_role('navigation',name='주요 메뉴').get_by_role('link',name=n,exact=True).count()==1 for n in ['프로젝트','소개','연락하기']))
        check(f'no script error at {width}',not errors,errors);c.close()
    for width in [320,1440]:
        c=context(width,reduced_motion='reduce')
        for case in cases:
            page=c.new_page();page.set_content(document(str(case.relative_to(DIST))))
            check(f'{case.parent.name} no overflow at {width}',page.evaluate('document.documentElement.scrollWidth<=innerWidth'));page.close()
        c.close()
    c=context(390,844);page=c.new_page();page.set_content(document())
    page.wait_for_function('document.getAnimations().filter(a=>a.timeline===document.timeline && a.playState==="running").length===0',timeout=7000)
    check('finite entry animations end',page.evaluate('document.getAnimations().filter(a=>a.timeline===document.timeline && a.playState==="running").length')==0)
    page.emulate_media(reduced_motion='reduce');page.wait_for_function('document.documentElement.dataset.motion==="off"')
    check('live OS preference',page.locator('html').get_attribute('data-motion')=='off')
    check('OS preference blocks override',page.get_by_role('button',name='동작 줄이기 적용').is_disabled())
    check('reduced motion cancels animations',page.evaluate('document.getAnimations().length')==0)
    page.emulate_media(reduced_motion='no-preference');page.get_by_role('button',name='모션 끄기').click()
    check('manual motion toggle',page.locator('html').get_attribute('data-motion')=='off')
    page.get_by_role('link',name='본문 바로가기').focus();page.keyboard.press('Enter')
    check('skip link focuses main',page.evaluate('document.activeElement.id')=='main')
    page.keyboard.press('Tab');check('Tab continues within main',page.evaluate('document.getElementById("main").contains(document.activeElement)'))
    page.get_by_role('navigation',name='주요 메뉴').get_by_role('link',name='프로젝트',exact=True).click()
    check('native hash updated',page.evaluate('location.hash')=='#projects')
    page.locator('.archive summary').click();check('native archive disclosure',page.locator('#more-work').get_attribute('open') is not None)
    check('nine project links',page.locator('.project-info h3 a,.archive-list>a').count()==9);c.close()
    c=context(390,844,java_script_enabled=False);page=c.new_page();page.set_content(document(script=False))
    check('no JS content visible',page.locator('h1').is_visible() and page.locator('.project-card').count()==4)
    check('no JS optional controls hidden',page.locator('[data-motion-toggle]').is_hidden());c.close()
    c=context(390,844);page=c.new_page();page.set_content(document(before='throw new Error("Injected failure");'))
    check('failed initialization keeps content visible',page.locator('h1').is_visible() and page.locator('.project-card').first.is_visible());c.close()
    for success in [True,False]:
        c=context(390,844,reduced_motion='reduce');page=c.new_page()
        before='Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async(text)=>{'+('window.__copied=text;' if success else 'throw new Error("denied");')+'}}});'
        page.set_content(document(before=before));page.locator('[data-copy-email]').click();page.wait_for_function('document.querySelector("[data-copy-status]").textContent.length>0')
        text=page.locator('[data-copy-status]').inner_text();check('mock clipboard '+('success' if success else 'denial'),('복사했습니다' if success else '권한이 없습니다') in text,text);c.close()
    for label,width,height in [('desktop',1440,1000),('mobile',390,844)]:
        c=context(width,height,reduced_motion='reduce');page=c.new_page();page.set_content(document())
        page.screenshot(path=str(OUT/f'{label}-hero.png'));page.screenshot(path=str(OUT/f'{label}-full.png'),full_page=True)
        page.locator('#projects').scroll_into_view_if_needed();page.screenshot(path=str(OUT/f'{label}-work.png'))
        page.set_content(document('projects/mydata-auth/index.html'));page.screenshot(path=str(OUT/f'{label}-case.png'),full_page=True);c.close()
    b.close()
report={'result':'PASS','checks':len(results),'environment':'Chromium, generated HTML/CSS/JS embedded in about:blank; external fonts excluded','limitations':['No browser HTTP navigation / actual deployment test','No physical iOS/Android / screen reader test','Clipboard branches mocked','Not a Lighthouse or WCAG assessment'],'results':results}
(OUT/'browser-smoke.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8');print(json.dumps({'result':'PASS','checks':len(results)}))

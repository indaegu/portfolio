"""Offline rendering regression tests for the actual build (no network required).
Run: npm run build && python tests/performance_browser.py
Requires Playwright and Chromium. This tests delayed JS, not real network throughput
or the end user's GPU. Existing browser_smoke.py remains the navigation/E2E suite.
"""
import json
import re
import shutil
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
OUTPUT = ROOT / '.test-output'
OUTPUT.mkdir(exist_ok=True)
HTML = (DIST / 'index.html').read_text(encoding='utf-8')
CSS = (DIST / 'assets/site.css').read_text(encoding='utf-8')
JS = (DIST / 'assets/site.js').read_text(encoding='utf-8')

def fixture(html: str, css: str) -> str:
    html = re.sub(r'<link\b[^>]*rel="stylesheet"[^>]*>', '', html)
    html = re.sub(r'<script\b[^>]*src="[^"]*"[^>]*></script>', '', html)
    return html.replace('</head>', f'<style>{css}</style></head>')

SNAPSHOT = """() => {
 const e=document.querySelector('.orbit-set'), s=getComputedStyle(e);
 return {width:s.width,height:s.height,transform:s.transform,opacity:s.opacity,
         animations:e.getAnimations().length, font:getComputedStyle(document.querySelector('h1')).fontSize,
         overflow:document.documentElement.scrollWidth-innerWidth};
}"""
results = []
with sync_playwright() as pw:
    executable = shutil.which('chromium') or shutil.which('google-chrome')
    browser = pw.chromium.launch(headless=True, **({'executable_path': executable} if executable else {}))
    for width in [320, 390, 560, 768, 1024, 1440, 1920]:
        context = browser.new_context(viewport={'width': width, 'height': 900})
        page = context.new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.set_content(fixture(HTML, CSS))
        before = page.evaluate(SNAPSHOT)
        assert before['width'] == before['height'] == '470px', before
        assert before['overflow'] == 0, before
        assert before['opacity'] == '1' and before['animations'] == 0, before
        # The complete stage is already visible while the optional JS is withheld.
        page.wait_for_timeout(150)
        page.add_script_tag(content=JS)
        page.wait_for_timeout(80)
        after = page.evaluate(SNAPSHOT)
        assert (after['width'], after['height'], after['transform'], after['opacity']) == (
            before['width'], before['height'], before['transform'], before['opacity']), (before, after)
        assert after['animations'] == 0
        page.evaluate("document.querySelector('#projects').scrollIntoView({behavior:'instant'})")
        page.wait_for_timeout(100)
        assert page.evaluate("document.getAnimations().filter(a=>a.effect.target.closest('.project-card') && !a.effect.target.matches('.project-info')).length") == 0
        assert page.evaluate("getComputedStyle(document.querySelector('.site-header')).backdropFilter") == 'none'
        assert page.evaluate("document.querySelector('.orbit-set').style.transform") == ''
        page.locator('[data-motion-toggle]').click()
        assert page.evaluate('document.documentElement.dataset.motion') == 'off'
        page.locator('[data-motion-toggle]').click()
        assert page.evaluate('document.documentElement.dataset.motion') == 'on'
        page.emulate_media(reduced_motion='reduce')
        page.wait_for_function("document.documentElement.dataset.motion === 'off'")
        assert page.evaluate('document.documentElement.dataset.motion') == 'off'
        assert page.locator('[data-motion-toggle]').is_disabled()
        page.emulate_media(reduced_motion='no-preference')
        page.wait_for_function("document.documentElement.dataset.motion === 'on'")
        assert page.evaluate('document.documentElement.dataset.motion') == 'on'
        assert not errors, errors
        results.append({'width': width, 'result': 'PASS', 'orbit': [after['width'], after['height']], 'headline': after['font']})
        if width in [390, 1440]:
            page.evaluate("window.scrollTo({top:0,behavior:'instant'})")
            page.screenshot(path=str(OUTPUT / f'after-{width}.png'))
        context.close()
    # Stronger delayed-script check and root/case rendering, still wholly offline.
    context = browser.new_context(viewport={'width': 1440, 'height': 900})
    page = context.new_page()
    page.set_content(fixture(HTML, CSS))
    before = page.evaluate(SNAPSHOT)
    page.wait_for_timeout(2000)
    page.add_script_tag(content=JS)
    page.wait_for_timeout(100)
    after = page.evaluate(SNAPSHOT)
    assert before['transform'] == after['transform'] and after['animations'] == 0
    results.append({'delayed_js_ms': 2000, 'result': 'PASS', 'orbit_unchanged': True})
    for path in sorted((DIST/'projects').glob('*/index.html')):
        page = context.new_page()
        page.set_content(fixture(path.read_text(encoding='utf-8'), CSS))
        page.add_script_tag(content=JS)
        assert page.locator('h1').count() == 1
        assert page.evaluate('document.documentElement.scrollWidth-innerWidth') == 0
        page.close()
    context.close()
    browser.close()
print(json.dumps({'result': 'PASS', 'mode': 'offline rendered build, JS delayed; not a network/GPU benchmark', 'cases': 9, 'checks': results}, ensure_ascii=False, indent=2))

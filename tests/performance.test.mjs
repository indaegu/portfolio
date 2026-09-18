import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {homePage, projectPage} from '../src/templates.mjs';
import {projects} from '../src/content/portfolio.mjs';
import {headline, featuredOrder, projectHighlights, strengths} from '../src/content/positioning.mjs';
const css=await readFile(new URL('../src/styles/performance.css',import.meta.url),'utf8');
const js=await readFile(new URL('../src/scripts/site.js',import.meta.url),'utf8');
test('requested headline is readable without JavaScript',()=>{
 const html=homePage('/portfolio');
 for(const line of headline)assert.ok(html.includes(line));
 assert.doesNotMatch(html,/<h1[^>]*data-hero-title/);
 assert.match(css,/\.hero h1\{font-size:clamp\(36px,3\.8vw,54px\)/);
});
test('orbit geometry is reserved and the complete pose has no startup animation',()=>{
 const html=homePage('/portfolio');
 assert.equal((html.match(/class="orbit"/g)||[]).length,12);
 assert.match(css,/flex:0 0 470px;min-width:470px;width:470px;height:470px/);
 assert.doesNotMatch(js,/animate\(orbit|rotateX\(62deg\)/);
});
test('large card subtrees cannot be entrance animation targets',()=>{
 const html=homePage('/portfolio');
 assert.doesNotMatch(html,/<article class="project-card[^>]*data-enter/);
 assert.doesNotMatch(html,/<h2 id="projects-title"[^>]*data-enter/);
 assert.match(js,/closest\('\.project-card,\.hero'\)/);
 assert.match(css,/backdrop-filter:none/);
});
test('HTML has no remote font or script dependency',()=>{
 for(const html of [homePage('/portfolio'),projectPage(projects[0],'/portfolio')]){
  assert.doesNotMatch(html,/<link[^>]+(?:rel="stylesheet"[^>]+href="https?:|href="https?:[^>]+rel="stylesheet")/);
  assert.doesNotMatch(html,/<script[^>]+src="https?:/);
  assert.doesNotMatch(html,/cdn\.jsdelivr\.net/);
 }
});
test('highlights only reference existing cases and preserve real experience boundaries',()=>{
 const slugs=new Set(projects.map(p=>p.slug));
 for(const slug of [...featuredOrder,...Object.keys(projectHighlights),...strengths.map(s=>s.project)])assert.ok(slugs.has(slug),slug);
 assert.match(projectHighlights['sbom-platform'],/사내 CoP.*개발 중/);
 assert.match(projectHighlights.mulsigye,/개인 프로젝트/);
 assert.match(homePage(''),/Vue 2·Spring Boot 기반 금융 서비스/);
});
test('featured sequence and visible numbering remain consistent',()=>{
 const html=homePage('/portfolio');
 const ids=[...html.matchAll(/<article class="project-card[^>]*id="([^"]+)"/g)].map(m=>m[1]);
 assert.deepEqual(ids,featuredOrder);
 for(let i=1;i<=4;i++)assert.ok(html.includes(`0${i} / 04`));
});

test('local CSS-only progress has a safe unsupported-browser fallback',()=>{
 assert.doesNotMatch(js,/boot\('progress'|scrollHeight|refreshProgress|scrollFrame/);
 assert.match(css,/@supports\(animation-timeline:scroll\(root\)\)/);
 assert.match(css,/@supports not \(animation-timeline:scroll\(root\)\)\{\.reading-progress\{display:none\}\}/);
 assert.match(css,/\.cover-art\{transition:none;will-change:auto\}/);
});
test('local lightweight project-info entrances remain separate from artwork',()=>{
 const html=homePage('/portfolio');
 assert.equal((html.match(/class="project-info" data-enter/g)||[]).length,4);
 assert.doesNotMatch(html,/<article class="project-card[^>]*data-enter/);
 assert.match(js,/el\.matches\('\.project-info'\)/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {profile,projects} from '../src/content/portfolio.mjs';
import {headline,projectHighlights} from '../src/content/positioning.mjs';
import {escape,homePage,projectPage} from '../src/templates.mjs';
// Copy-only regression guard. Review/update the digest when the underlying experience changes.
// Snapshot: main 9d317abc; identity, project facts and full case paragraphs are unchanged.
test('copy edits preserve the original experience and case evidence',()=>{
 const {intro,...identity}=profile;
 const evidence={profile:identity,projects:projects.map(({title,summary,takeaway,sections,...facts})=>({...facts,sections:sections.map(({body})=>body)}))};
 assert.equal(createHash('sha256').update(JSON.stringify(evidence)).digest('hex'),'8bc9cb2ad72fb643301987aa43e90affd144924192da579ec3c9894792acd2d4');
});
test('cards, case lead and search metadata share one project summary',()=>{
 for(const p of projects){
  assert.equal(projectHighlights[p.slug],p.summary);
  const html=projectPage(p,'/portfolio');
  assert.ok(html.includes('<p class="case-lead">'+escape(p.summary)+'</p>'));
  assert.ok(html.includes('<meta name="description" content="'+escape(p.summary)+'">'));
 }
});
test('the requested personal headline is retained',()=>{
 assert.deepEqual(headline,['“원래 이렇게 해요”를','그냥 넘기지 않는 개발자','성창민입니다.']);
});
test('new homepage copy uses the concrete work descriptions',()=>{
 const html=homePage('/portfolio');
 for(const text of ['빌드가 왜 느린지부터 확인했습니다.','인증 화면과 서버를 함께 맡았습니다.','같은 내용을 세 번 등록하지 않도록','채용 제안이나 프로젝트에 관한 질문은'])assert.ok(html.includes(text));
 for(const text of ['경계를 연결했습니다','책임과 실패 경로를 설계했습니다','더 나은 경험을,','경험으로 설명하는'])assert.ok(!html.includes(text));
});

import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {profile,workSections} from '../dist/profile-data.js';
import {portfolio} from '../dist/portfolio-data.js';
import {practiceRoute,practiceStop,practiceFrame} from '../dist/practice-motion.js';
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url)));
const audit=read('../content/content-map.json'),word=read('../content/word-paragraphs.json'),inventory=read('../content/source-inventory.json');
assert.equal(audit.links.length,10);
const folderIds=new Set(inventory.folders.map(f=>f.id));
for(const link of audit.links){assert.ok(folderIds.has(link.driveId)||portfolio.media.some(a=>a.sourceId===link.driveId));assert.ok(word.find(p=>p.i===link.wordParagraph).links.some(l=>l.url===link.url));}
assert.equal(profile.bio,word.find(p=>p.i===4).text);
assert.equal(profile.name,'Ong Thị Đức');assert.equal(profile.skills.length,5);
assert.equal(workSections.length,9);
const ids=workSections.flatMap(s=>s.items);assert.equal(ids.length,51);assert.equal(new Set(ids).size,51);
for(const section of workSections){
 assert.ok(audit.links.some(l=>l.url===section.sourceUrl));
 for(const paragraph of section.paragraphs){assert.ok(section.sourceParagraphs.some(i=>word.find(p=>p.i===i).text.includes(paragraph)),`Unmatched source text in ${section.key}`);}
 for(const [id,detail] of Object.entries(section.details||{})){assert.ok(section.items.includes(Number(id)));assert.ok(section.sourceParagraphs.some(i=>word.find(p=>p.i===i).text.includes(detail)));}
 for(const id of section.items)assert.equal(portfolio.media.find(a=>a.id===id).sectionKey,section.key);
 for(let i=0;i<section.items.length;i++){const p=practiceStop(i,section.items.length);assert.ok(Math.abs(practiceRoute(p,section.items.length)-i)<1e-9);for(const [w,h] of [[1440,900],[390,844]]){const f=practiceFrame(p,i,section.items.length,w,h);assert.ok(f.interactive&&f.visible);assert.ok(Math.abs(f.x)+Math.abs(f.y)+Math.abs(f.z)<1e-7);}}
}
for(const project of portfolio.projects)assert.ok(project.items.every(id=>id>=13&&id<=30),'Concept dossiers must not mix event, sales or video evidence');
assert.equal(workSections.find(s=>s.key==='video').items.length,5);
assert.equal(workSections.find(s=>s.key==='training').items.length,7);
const cv=readFileSync(new URL('../content/cv-2026-10.txt',import.meta.url),'utf8').replace(/\s+/g,' ');
assert.equal(profile.experience.reduce((n,e)=>n+e.bullets.length,0),16);
for(const experience of profile.experience){
 assert.ok(cv.includes(experience.company));
 assert.ok(cv.includes(experience.role));
 for(const bullet of experience.bullets)assert.ok(cv.includes(bullet),`CV wording differs: ${bullet}`);
}
const html=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
assert.ok(!html.includes('id="library"')&&!html.includes('href="#library"'));
for(const e of profile.experience)for(const bullet of e.bullets)assert.ok(html.includes(bullet));
console.log('Content alignment: 10 Word hyperlinks, all 51 work assets, verbatim copy, concept scopes, CV identity and responsive evidence stops passed.');

import assert from 'node:assert/strict';
import {statSync,readFileSync} from 'node:fs';
import {portfolio} from '../dist/portfolio-data.js';
const items=portfolio.media;
assert.equal(items.length,52);
assert.equal(new Set(items.map(x=>x.id)).size,52);
assert.deepEqual(['image','video','pdf'].map(t=>items.filter(x=>x.type===t).length),[43,7,2]);
let files=0;
for(const item of items){
 assert.ok(item.title&&item.folder&&item.originalName);
 assert.match(item.sourceUrl,/^https:\/\/drive\.google\.com\/file\/d\//);
 for(const key of ['src','thumb','preview'])if(item[key]){
  assert.ok(!item[key].includes('..'));
  const stat=statSync(new URL('../dist/'+item[key],import.meta.url));
  assert.ok(stat.size>0&&stat.size<24*1024*1024,`${item[key]} exceeds asset budget`);files++;
 }
 if(item.type==='video')assert.ok(item.duration>10&&item.preview);
 if(item.type==='image')assert.ok(item.width>0&&item.height>0);
}
const ids=new Set(items.map(x=>x.id));
assert.equal(portfolio.projects.length,3);
for(const project of portfolio.projects){assert.ok(ids.has(project.cover));assert.ok(project.items.every(id=>ids.has(id)));if(project.coverSrc)statSync(new URL('../dist/'+project.coverSrc,import.meta.url));}
assert.ok(portfolio.films.every(id=>items.find(x=>x.id===id)?.type==='video'));
const inventory=JSON.parse(readFileSync(new URL('../content/source-inventory.json',import.meta.url)));
assert.ok(inventory);
console.log(`Portfolio: all 52 entries, ${files} media paths, project references and per-file budgets passed.`);

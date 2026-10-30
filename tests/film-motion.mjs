import assert from 'node:assert/strict';
import {filmRoute,filmFrame,filmStopProgress,filmReveal} from '../dist/film-motion.js';
for(let index=0;index<5;index++){
 const p=filmStopProgress(index);assert.equal(filmRoute(p),index);
 for(const [w,h] of [[1440,900],[768,1024],[390,844]]){const f=filmFrame(p,index,w,h);assert.ok(f.interactive&&f.visible);assert.ok(Math.abs(f.x)<1e-6&&Math.abs(f.y)<1e-6&&Math.abs(f.z)<1e-6,'Selected film must settle at its responsive anchor');}
}
let previous=filmRoute(0);
for(let step=1;step<=5000;step++){
 const p=step/5000,r=filmRoute(p);assert.ok(r>=previous&&r-previous<.012,'Forward motion must be continuous and monotonic');previous=r;
 for(let i=0;i<5;i++){const f=filmFrame(p,i,390,844);assert.ok(Number.isFinite(f.x+f.y+f.z+f.scale));assert.ok(f.opacity>=0&&f.opacity<=1);assert.ok(f.scale>0);}
}
assert.equal(filmRoute(0),0);assert.equal(filmRoute(1),4);
assert.equal(filmReveal(.15,1),1);
assert.equal(filmFrame(.99,4,1440,900).route,4,'Exit keeps the final film without snapping to the first');
console.log('Film route: five settled stops, continuous handoffs, responsive anchors and final-film exit passed.');

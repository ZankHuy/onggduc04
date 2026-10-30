import assert from 'node:assert/strict';
import {PORTAL,portalLayout,portalFrame,portalPoint,portalExit,choosePortalRenderer,portalCopyScale} from '../dist/portal-motion.js';
let checks=0,maxLogStep=0;
for(const [w,h] of [[1440,900],[768,1024],[390,844],[375,560]]){
 const layout=portalLayout(w,h);
 for(let i=0;i<PORTAL.count;i++){
  let previous;
  for(let step=0;step<=1000;step++){
   const p=step/1000,s=portalFrame(p,i,layout);
   const cssScale=layout.focal/(layout.focal-s.cssZ);
   const gpuRadius=layout.worldRadius*layout.focal/(PORTAL.cameraDistance-s.worldZ);
   assert(Math.abs(cssScale-s.scale)<1e-9,'CSS must use the shared perspective scale');
   assert(Math.abs(gpuRadius-layout.radius*s.scale)<1e-7,'GPU and CSS must project the same radius');
   assert(s.distance>.05&&s.distance<600,'No camera near-plane or far-plane crossing');
   if(previous){assert(Math.abs(s.angle-previous.angle)<.0034,'Twist must remain continuous');assert(Math.abs(s.opacity-previous.opacity)<.004,'Depth shading must remain continuous');const delta=Math.abs(Math.log(s.scale/previous.scale));maxLogStep=Math.max(maxLogStep,delta);assert(delta<.0035,'No sudden projected growth between neighboring scroll samples')}
   if(!s.visible)assert(layout.radius*PORTAL.innerRadius*PORTAL.radialMinimum*s.scale>Math.hypot(w,h)/2+39.9,'Only cull a ring whose complete inner edge is beyond the viewport');
   previous=s;checks+=5;
  }
 }
}
for(const p of [0,.05,.2,.5,.8,.95,1]){
 const layout=portalLayout(1440,900);
 for(let i=1;i<PORTAL.count;i++){
  const a=portalFrame(p,i-1,layout),b=portalFrame(p,i,layout);
  assert(Math.abs(Math.log(a.scale/b.scale)-PORTAL.spacing)<1e-10,'Ring spacing must remain continuous');checks++;
 }
}
for(let i=0;i<128;i++){
 const a=i/128*Math.PI*2,outer=portalPoint(a),inner=portalPoint(a,PORTAL.innerRadius);
 assert(Math.abs(Math.hypot(inner.x,inner.y)/Math.hypot(outer.x,outer.y)-PORTAL.innerRadius)<1e-10);checks++;
}
assert.equal(choosePortalRenderer({ready:true,alreadyVisible:true,reduced:false}),'css3d','A late WebGL load cannot replace a visible scene');
assert.equal(choosePortalRenderer({ready:true,alreadyVisible:false,reduced:false}),'webgl');
assert.equal(choosePortalRenderer({ready:false,alreadyVisible:false,reduced:false}),'css3d');
assert.equal(choosePortalRenderer({ready:true,alreadyVisible:false,reduced:true}),'css3d');
assert.equal(portalExit(.78),0);assert.equal(portalExit(1),1);
assert(portalExit(.8)<.01&&portalExit(.98)>.99,'Exit must start and finish gently');
console.log(`${checks+7} checks passed; maximum scale growth per 0.1% scroll sample: ${(Math.expm1(maxLogStep)*100).toFixed(3)}%.`);

// Preserve the expressive vortex that motivated the design, not only zoom.
const layout=portalLayout(1440,900);
assert(portalFrame(0,10,layout).angle-portalFrame(0,0,layout).angle>1.3,'Different depths must produce a visible spiral');
assert(portalFrame(1,10,layout).angle-portalFrame(0,10,layout).angle>1.4,'Scrolling must visibly rotate the vortex');
const radii=Array.from({length:512},(_,i)=>{const p=portalPoint(i/512*Math.PI*2);return Math.hypot(p.x,p.y)});
assert(Math.max(...radii)-Math.min(...radii)>.11,'Retain the pronounced organic wave profile');
assert(portalFrame(0,17,layout).opacity<.6,'Distant rings must recede into blue');
assert(portalFrame(.7,17,layout).opacity>portalFrame(0,17,layout).opacity,'Rings should gain definition as they approach');
console.log('Expressive spiral, organic wave, and depth-shading regressions passed.');

// Text must visibly approach with the same eased depth phase, without a jump.
const copyStart=portalCopyScale(0),copyEnd=portalCopyScale(1);
assert(copyStart>=.3&&copyEnd/copyStart>3,'Retain visible small-to-large typography');
assert(copyEnd>=1,'The late headline must reach its full readable size');
let previousCopy=copyStart;
for(let n=0;n<=1000;n++){
 const p=n/1000,copy=portalCopyScale(p),ring=portalFrame(p,0,layout);
 assert(copy>=previousCopy&&copy-previousCopy<.003,'Copy zoom must be continuous and monotonic');
 assert(Math.abs(Math.log(copy/copyStart)/Math.log(copyEnd/copyStart)-Math.log(ring.scale)/PORTAL.travel)<1e-9,'Type and rings must share the same zoom phase');
 previousCopy=copy;
}
console.log('Portal typography: synchronized small-to-large zoom and full late reading size passed.');

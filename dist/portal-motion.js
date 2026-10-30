// Both renderers use this one projection and one scroll curve. No per-ring
// recycling, opacity cut, camera-plane crossing, or renderer-dependent zoom.
export const PORTAL = Object.freeze({count:18,spacing:.185,travel:1.85,innerRadius:.905,cameraDistance:10,fov:48,radialMinimum:.936,artExtent:1.08});
const clamp=x=>Math.max(0,Math.min(1,x));
export const smoother=x=>{x=clamp(x);if(x===0||x===1)return x;return clamp(x*x*x*(x*(x*6-15)+10))};
export function portalLayout(width,height){
 const focal=height/(2*Math.tan(PORTAL.fov*Math.PI/360));
 const radius=Math.hypot(width,height)*.82;
 return {width,height,focal,radius,worldRadius:radius*PORTAL.cameraDistance/focal};
}
export function portalFrame(progress,index,layout){
 const turn=smoother(progress);
 const zoom=PORTAL.travel*turn;
 const scale=Math.exp(zoom-index*PORTAL.spacing);
 const distance=PORTAL.cameraDistance/scale;
 return {
  scale,
  cssZ:layout.focal*(1-1/scale),
  worldZ:PORTAL.cameraDistance-distance,
  distance,
  // Depth-dependent phase forms a real visible spiral. It winds further as
  // the visitor advances, instead of merely enlarging near-concentric rings.
  angle:index*(.14+.035*turn)+1.15*turn,
  opacity:1-.50*smoother((Math.log(distance/PORTAL.cameraDistance)-1.15)/2.1),
  // The complete inner edge is already outside every viewport corner here.
  // Culling cannot produce a visible opacity change or foreground flash.
  visible:layout.radius*PORTAL.innerRadius*PORTAL.radialMinimum*scale<Math.hypot(layout.width,layout.height)/2+40
 };
}
export function portalPoint(angle,radius=1){
 const wave=1+.052*Math.sin(angle*8)+.012*Math.cos(angle*3);
 return {x:Math.cos(angle)*wave*radius,y:Math.sin(angle)*wave*radius};
}
export function portalPath(){
 let d='';
 const tangent=(a,r)=>{
  const wave=1+.052*Math.sin(a*8)+.012*Math.cos(a*3);
  const slope=.416*Math.cos(a*8)-.036*Math.sin(a*3);
  return {x:r*(slope*Math.cos(a)-wave*Math.sin(a)),y:r*(slope*Math.sin(a)+wave*Math.cos(a))};
 };
 for(const [radius,direction] of [[100,1],[100*PORTAL.innerRadius,-1]]){
  const start=portalPoint(0,radius);d+=`M${start.x},${start.y}`;
  const delta=direction*Math.PI*2/128;
  for(let j=0;j<128;j++){
   const a=j*delta,b=(j+1)*delta,p=portalPoint(a,radius),q=portalPoint(b,radius),u=tangent(a,radius),v=tangent(b,radius);
   d+=`C${p.x+u.x*delta/3},${p.y+u.y*delta/3} ${q.x-v.x*delta/3},${q.y-v.y*delta/3} ${q.x},${q.y}`;
  }
  d+='Z';
 }
 return d;
}
export function choosePortalRenderer({ready,alreadyVisible,reduced}){
 // A late GPU load never replaces a tunnel the visitor can already see.
 return ready&&!alreadyVisible&&!reduced?'webgl':'css3d';
}
export const portalExit=progress=>smoother((progress-.78)/.22);

// Typography travels forward with the tunnel's eased logarithmic zoom.
// Keep the final reading size large and retain full opacity through the exit.
export const portalCopyScale=progress=>.34*Math.exp(Math.log(1.1/.34)*smoother(progress));

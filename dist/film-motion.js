const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const ease=(a,b,v)=>{const t=clamp((v-a)/(b-a));return t*t*(3-2*t)};
export const FILM_TIMELINE={start:.14,end:.90,count:5};
// Each stop has a reading/viewing hold, then a smooth overlapping handoff.
export function filmRoute(progress){
 const raw=clamp((progress-FILM_TIMELINE.start)/(FILM_TIMELINE.end-FILM_TIMELINE.start))*4;
 if(raw>=4)return 4;
 const stop=Math.floor(raw);return stop+ease(.34,.78,raw-stop);
}
export const filmStopProgress=index=>FILM_TIMELINE.start+clamp(index,0,4)/4*(FILM_TIMELINE.end-FILM_TIMELINE.start);
export function filmFrame(progress,index,width,height){
 const route=filmRoute(progress),d=index-route,depth=Math.abs(d),mobile=width<=600,entry=ease(0,.13,progress),exit=ease(.94,1,progress);
 return {distance:d,visible:depth<1.42,interactive:depth<=.53,
  x:depth*width*(mobile?.16:.105)+(1-entry)*width*.08,
  y:d*height*(mobile?.31:.40)+(1-entry)*height*.19-exit*height*.12,
  z:-depth*(mobile?160:260)-(1-entry)*250,
  rx:-d*10+(1-entry)*12,ry:-d*14-(1-entry)*17,rz:d*7+(1-entry)*8,
  scale:1-Math.min(depth,2)*.055-(1-entry)*.15+exit*.04,
  opacity:(1-ease(.48,1.42,depth))*(.3+.7*entry)*(1-exit*.6),
  entry,exit,route};
}
export const filmReveal=(progress,line)=>ease(-.025+line*.025,.055+line*.035,progress);

const clamp=v=>Math.max(0,Math.min(1,v));
const ease=(a,b,v)=>{const t=clamp((v-a)/(b-a));return t*t*(3-2*t)};
export function practiceRoute(p,count){if(count<2)return 0;const raw=clamp((p-.10)/.80)*(count-1),i=Math.floor(raw);return Math.min(count-1,i+ease(.32,.82,raw-i))}
export const practiceStop=(index,count)=>.10+(count>1?index/(count-1):0)*.80;
export function practiceFrame(p,index,count,w,h){const route=practiceRoute(p,count),d=index-route,a=Math.abs(d),entry=ease(0,.09,p);return {distance:d,route,visible:a<1.4,interactive:a<.54,x:a*w*.075,y:d*h*(w<=600?.17:.28)+(1-entry)*45,z:-a*220,rx:-d*6,ry:d*-12,rz:d*5,scale:1-a*.045-(1-entry)*.08,opacity:(1-ease(.42,1.4,a))*(.55+.45*entry)}}

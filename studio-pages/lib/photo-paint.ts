export type WallMask={width:number;height:number;alpha:Uint8ClampedArray};
type Point=[number,number];
export function containsPoint([x,y]:Point,polygon:Point[]):boolean{
 let inside=false;
 for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){
  const [ax,ay]=polygon[i],[bx,by]=polygon[j];
  if((ay>y)!==(by>y)&&x<(bx-ax)*(y-ay)/(by-ay)+ax)inside=!inside;
 }
 return inside;
}
/** Reject degenerate or crossing outlines before creating a paintable surface. */
export function validPolygon(p:Point[]):boolean{
 if(p.length<3||p.some(v=>v.some(n=>!Number.isFinite(n)||n<0||n>1)))return false;
 const cross=(a:Point,b:Point,c:Point)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
 let area=0;
 for(let i=0;i<p.length;i++){
  const a=p[i],b=p[(i+1)%p.length];area+=a[0]*b[1]-b[0]*a[1];
  for(let j=i+2;j<p.length;j++){
   if(i===0&&j===p.length-1)continue;
   const c=p[j],d=p[(j+1)%p.length];
   if(cross(a,b,c)*cross(a,b,d)<=0&&cross(c,d,a)*cross(c,d,b)<=0)return false;
  }
 }
 return Math.abs(area)>.0001;
}
/** Connected, seed-relative colour selection. A user chooses the wall; this is not AI segmentation. */
export function selectWall(data:Uint8ClampedArray,width:number,height:number,x:number,y:number):WallMask{
 const sx=Math.max(0,Math.min(width-1,Math.floor(x))),sy=Math.max(0,Math.min(height-1,Math.floor(y))),seed=sy*width+sx;
 const alpha=new Uint8ClampedArray(width*height),seen=new Uint8Array(width*height),queue=new Int32Array(width*height);let head=0,tail=1;queue[0]=seed;seen[seed]=1;
 const distance=(a:number,b:number)=>Math.hypot(data[a*4]-data[b*4],data[a*4+1]-data[b*4+1],data[a*4+2]-data[b*4+2]);
 while(head<tail){const p=queue[head++];alpha[p]=255;const px=p%width,py=Math.floor(p/width);for(const n of [px>0?p-1:-1,px<width-1?p+1:-1,py>0?p-width:-1,py<height-1?p+width:-1]){if(n<0||seen[n]||data[n*4+3]===0)continue;if(distance(n,seed)>70){seen[n]=1;continue}if(distance(n,p)>38)continue;seen[n]=1;queue[tail++]=n}}
 return{width,height,alpha};
}
/** Paint only selected pixels, retaining the photograph's luminance variation. */
export function paintPixels(original:Uint8ClampedArray,out:Uint8ClampedArray,mask:Uint8ClampedArray,hex:string){
 if(!/^#[\da-f]{6}$/i.test(hex))return;
 const lums:number[]=[];for(let i=0;i<mask.length;i+=64)if(mask[i+3]>127)lums.push(original[i]*.2126+original[i+1]*.7152+original[i+2]*.0722);
 lums.sort((a,b)=>a-b);const reference=Math.max(30,lums[Math.floor(lums.length*.65)]||200),rgb=hex.slice(1).match(/../g)!.map(x=>parseInt(x,16));
 for(let i=0;i<out.length;i+=4){if(!mask[i+3])continue;const lum=(original[i]*.2126+original[i+1]*.7152+original[i+2]*.0722)/reference,a=mask[i+3]/255;for(let j=0;j<3;j++)out[i+j]=out[i+j]*(1-a)+Math.min(255,rgb[j]*lum)*a}
}

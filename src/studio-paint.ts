export function paintPixels(original:Uint8ClampedArray,out:Uint8ClampedArray,mask:Uint8ClampedArray,hex:string){
 if(!/^#[\da-f]{6}$/i.test(hex))return;
 const lums:number[]=[];for(let i=0;i<mask.length;i+=64)if(mask[i+3]>127)lums.push(original[i]*.2126+original[i+1]*.7152+original[i+2]*.0722);
 lums.sort((a,b)=>a-b);const reference=Math.max(30,lums[Math.floor(lums.length*.65)]||200),rgb=hex.slice(1).match(/../g)!.map(x=>parseInt(x,16));
 for(let i=0;i<out.length;i+=4){if(!mask[i+3])continue;const lum=(original[i]*.2126+original[i+1]*.7152+original[i+2]*.0722)/reference,a=mask[i+3]/255;for(let j=0;j<3;j++)out[i+j]=out[i+j]*(1-a)+Math.min(255,rgb[j]*lum)*a}
}

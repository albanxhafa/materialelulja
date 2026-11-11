// Keep only the connected mask containing the requested wall click.
export function chooseMask(data,width,height,scores,point,variant=0){
 const size=width*height,sx=Math.min(width-1,Math.max(0,Math.floor(point.x*width))),sy=Math.min(height-1,Math.max(0,Math.floor(point.y*height))),seed=sy*width+sx;
 const choices=[];
 for(let k=0;k<scores.length;k++){
  const offset=k*size;if(!data[offset+seed])continue;
  const alpha=new Uint8ClampedArray(size),queue=new Int32Array(size);let head=0,tail=1;queue[0]=seed;alpha[seed]=255;
  while(head<tail){const p=queue[head++],x=p%width,y=Math.floor(p/width);for(const n of [x?p-1:-1,x<width-1?p+1:-1,y?p-width:-1,y<height-1?p+width:-1])if(n>=0&&!alpha[n]&&data[offset+n]){alpha[n]=255;queue[tail++]=n}}
  const ratio=tail/size;
  if(ratio<.001||ratio>.85||!Number.isFinite(scores[k])||scores[k]<.55)continue;
  choices.push({alpha,score:scores[k],area:tail});
 }
 choices.sort((a,b)=>b.score-a.score);
 if(!choices.length)throw new Error('Nuk u gjet kufi i besueshëm. Kliko më në mes të murit.');
 const index=variant%choices.length;return{width,height,...choices[index],alternatives:choices.length,index};
}

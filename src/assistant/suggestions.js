import {PROJECTS} from '../../site/data/projects.js';
const normalize = text => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const shades = [
  [/gri|gr[ae]y/, [145,145,145]], [/kafe|brown/, [127,89,64]],
  [/bezh|beige/, [202,185,151]], [/bardh|white/, [245,244,236]],
  [/gjelb|jeshil|green/, [100,134,100]], [/blu|kalter|blue/, [88,123,160]],
  [/kuq|\bred\b/, [162,70,65]], [/verdhe|yellow/, [225,196,106]],
  [/roze|pink/, [208,152,160]], [/zez|black/, [52,52,49]]
];
let loading;
function colours(){
  loading ??= fetch('/studio-data/suggestions.bin').then(async response=>{
    if(!response.ok)throw new Error('Katalogu nuk u hap.');
    return new Response(response.body.pipeThrough(new DecompressionStream('gzip'))).json();
  }).catch(error=>{ loading=undefined; throw error });
  return loading;
}
export async function suggestColour(message,brand){
  const query=normalize(message), reference=shades.find(([pattern])=>pattern.test(query));
  let rows=(await colours()).filter(row=>!brand||brand==='all'||row.brand===brand);
  if(reference){
    const light=/celet|light|pak drite/.test(query)?0.42:/erret|dark/.test(query)?-0.32:0;
    const warm=/ngroht|warm/.test(query)?[9,1,-9]:[0,0,0];
    const target=reference[1].map((v,i)=>v+warm[i]+(light>=0?(255-v)*light:v*light));
    const distance=row=>row.hex.slice(1).match(/../g).reduce((d,h,i)=>d+(parseInt(h,16)-target[i])**2,0);
    rows=rows.map(row=>[distance(row),row]).sort((a,b)=>a[0]-b[0]).map(entry=>entry[1]);
  }else{
    rows=rows.filter(row=>[row.colour_code,row.colour_name].some(value=>value && query.includes(normalize(value))));
  }
  const seen=new Set();
  const results=rows.filter(row=>!seen.has(row.hex)&&seen.add(row.hex)).slice(0,3);
  return {colours:results,answer:results.length?'Nuancat e gjetura në katalog.':'Përshkruaj ngjyrën me një familje si gri, kafe ose bezhë, ose shkruaj kodin.'};
}
export function suggestProject(message){
  const query=normalize(message);
  const tokens=query.match(/[a-z]{4,}/g)||[];
  const intent=[[/lyej|lyaj|lyerj|paint/,'lyerje'],[/rubinet/,'rubinet'],[/ballkon/,'ballkon'],[/pllaka/,'pllaka']];
  const ranked=PROJECTS.map(p=>{
    const title=normalize(p.title+' '+p.category);
    const score=tokens.reduce((n,t)=>n+Number(title.includes(t.slice(0,5))),0);
    const bonus=intent.find(([pattern])=>pattern.test(query));
    return {p,score:score+(bonus && p.id.includes(bonus[1])?8:0)};
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);
  const projects=ranked.slice(0,1).map(({p})=>({...p,url:'/projekte/#'+p.id,product_url:p.link}));
  return {projects,answer:projects.length?'Materialet dhe veglat sipas udhëzuesit të punimit.':'Shkruaj punimin që ke në mendje, p.sh. lyerje muri ose shtrim pllakash.'};
}
export const brandNames=['BENJAMIN MOORE','DULUX','NCS','VITEX','VIVECHROM'];

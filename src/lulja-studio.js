import {paintPixels} from './studio-paint.ts';
const el=id=>document.getElementById(id);
const dir='/lulja-studio/';
const canvas=el('surface'), ctx=canvas.getContext('2d');
const painted=document.createElement('canvas'), paint=painted.getContext('2d');
let original, scene, demo, worker, job=0, photoVersion=0, points=[], regions=[], active=-1;
let rows=[], selected, limit=45, excluding=false;
const status=text=>{el('status').textContent=text};
function redraw(){
 if(!original)return;
 const result=new ImageData(new Uint8ClampedArray(original.data),canvas.width,canvas.height);
 for(const r of regions)paintPixels(original.data,result.data,r.rgba,r.hex);
 paint.putImageData(result,0,0);ctx.putImageData(result,0,0);
 const width=Math.round(canvas.width*Number(el('split').value)/100);
 if(width)ctx.putImageData(original,0,0,0,0,width,canvas.height);
}
function select(row){
 selected=row;el('chosen').textContent=[row.brand,row.colour_code,row.colour_name].filter(Boolean).join(' · ');
 if(active>=0){regions[active].hex=row.hex;el('split').value=0;redraw()}
}
const targets={gri:[130,130,130],kafe:[116,76,49],grey:[130,130,130],brown:[116,76,49]};
function distance(hex,target){return hex.slice(1).match(/../g).reduce((sum,v,i)=>sum+(parseInt(v,16)-target[i])**2,0)}
function list(){
 const q=el('query').value.trim().toLowerCase(), brand=el('brand').value,target=targets[q];
 let found=rows.filter(r=>(!brand||r.brand===brand)&&(target||[r.colour_code,r.colour_name,r.collection,r.brand].join(' ').toLowerCase().includes(q)));
 if(target)found.sort((a,b)=>distance(a.hex,target)-distance(b.hex,target));
 el('swatches').replaceChildren();el('count').textContent=target?'Nuancat më të afërta':found.length+' ngjyra';
 for(const r of found.slice(0,limit)){const b=document.createElement('button'),i=document.createElement('i');i.style.background=r.hex;b.append(i,document.createTextNode(r.colour_code+' · '+(r.colour_name||r.brand)));b.onclick=()=>select(r);el('swatches').append(b)}
 el('more').hidden=found.length<=limit;
}
function stop(){job++;worker?.terminate();worker=null;excluding=false;el('exclude').disabled=true;el('exclude').setAttribute('aria-pressed','false')}
async function loadPhoto(url,isDemo){
 const version=++photoVersion;stop();const image=new Image();image.src=url;
 try{await image.decode();if(version!==photoVersion)return;
 const scale=Math.min(1,950/Math.max(image.width,image.height));
 canvas.width=painted.width=Math.max(1,Math.round(image.width*scale));canvas.height=painted.height=Math.max(1,Math.round(image.height*scale));
 ctx.drawImage(image,0,0,canvas.width,canvas.height);original=ctx.getImageData(0,0,canvas.width,canvas.height);
 demo=isDemo;regions=[];active=-1;points=[];redraw();status('Kliko faqen e murit që dëshiron të ngjyrosësh.');
 }catch{if(version===photoVersion)status('Fotografia nuk u hap. Provo një tjetër.')}finally{if(url.startsWith('blob:'))URL.revokeObjectURL(url)}
}
function addMask(rgba,replace){
 const region={rgba,hex:selected.hex,points:points.slice()};
 if(replace)regions[active]=region;else{regions.push(region);active=regions.length-1}
 el('split').value=0;redraw();status('Ngjyra u aplikua. Zgjidh një nuancë tjetër ose kliko një mur tjetër.');
}
function exampleMask(x,y){
 const mask=document.createElement('canvas');mask.width=canvas.width;mask.height=canvas.height;const m=mask.getContext('2d');
 const polygon=pts=>{m.beginPath();pts.forEach(([u,v],i)=>i?m.lineTo(u*mask.width,v*mask.height):m.moveTo(u*mask.width,v*mask.height));m.closePath();m.fill()};
 for(const reg of scene.regions){m.clearRect(0,0,mask.width,mask.height);m.globalCompositeOperation='source-over';[reg.points,...(reg.parts||[])].forEach(polygon);m.globalCompositeOperation='destination-out';(reg.holes||[]).forEach(polygon);const pixels=m.getImageData(0,0,mask.width,mask.height).data;if(pixels[(Math.floor(y*mask.height)*mask.width+Math.floor(x*mask.width))*4+3])return pixels}
}
canvas.onclick=event=>{
 if(!original||!selected)return;
 const rect=canvas.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width,y=(event.clientY-rect.top)/rect.height;
 if(demo){const mask=exampleMask(x,y);if(mask)addMask(mask,false);else status('Kliko në një sipërfaqe muri.');return}
 const replace=excluding&&active>=0;
 points=replace?[...regions[active].points,{x,y,label:0}]:[{x,y,label:1}];
 const id=++job;
 worker??=new Worker(dir+'wall-worker.js',{type:'module'});
 worker.onerror=()=>{stop();status('Modeli nuk u ngarkua. Kontrollo lidhjen dhe kliko përsëri.')};
 worker.onmessage=({data})=>{if(id!==job||data.id!==id)return;if(data.status){status(data.status);return}if(data.error){stop();status(data.error);return}
 const rgba=new Uint8ClampedArray(original.data.length);data.mask.alpha.forEach((a,i)=>{rgba[4*i+3]=a});addMask(rgba,replace);excluding=false;el('exclude').disabled=false;el('exclude').setAttribute('aria-pressed','false')};
 status('Po përzgjidhet muri. Herën e parë shkarkohet modeli.');worker.postMessage({id,photoKey:photoVersion,width:canvas.width,height:canvas.height,pixels:original.data,points});
};
el('exclude').onclick=()=>{excluding=!excluding;el('exclude').setAttribute('aria-pressed',String(excluding));status(excluding?'Kliko objektin për ta përjashtuar.':'Kliko murin.')};
el('photo').onchange=e=>{const f=e.target.files[0];if(f)loadPhoto(URL.createObjectURL(f),false);e.target.value=''};
el('split').oninput=redraw;el('reset').onclick=()=>{stop();regions=[];points=[];active=-1;redraw();status('Kliko murin.')};
el('save').onclick=()=>{if(!original)return;painted.toBlob(blob=>{if(!blob)return;const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='LULJA-ngjyra.png';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)})};
el('query').oninput=el('brand').onchange=()=>{limit=45;list()};el('more').onclick=()=>{limit+=45;list()};
async function init(){
 const json=async name=>{const r=await fetch(dir+name);if(!r.ok)throw Error();return r.json()};
 [rows,scene]=await Promise.all([json('colors.json'),json('scene.json')]);
 for(const brand of new Set(rows.map(r=>r.brand)))el('brand').add(new Option(brand,brand));
 list();select(rows[0]);await loadPhoto(dir+'living.jpg',true);
}
init().catch(()=>status('Katalogu nuk u hap. Rifresko faqen për të provuar përsëri.'));

import {brandNames,suggestColour,suggestProject} from './suggestions.js';
const root=document.querySelector('[data-assistant]');
if(root){
 const mode=root.dataset.assistant,form=root.querySelector('form'),input=root.querySelector('textarea'),submit=root.querySelector('[type=submit]'),status=root.querySelector('.la-status'),answer=root.querySelector('.la-answer'),brand=root.querySelector('select');
 let history=[],controller=null,requestId=0;
 const el=(tag,text,className)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(className)n.className=className;return n;};
 function link(text,url){const a=el('a',text);a.href=url;return a;}
 function safeSource(value){try{const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password?url.href:null;}catch{return null;}}
 function pending(on){submit.disabled=on;answer.setAttribute('aria-busy',String(on));root.querySelectorAll('[data-example]').forEach(b=>b.disabled=on);}
 function reset(){requestId++;controller?.abort();history=[];answer.replaceChildren();input.value='';status.textContent='';pending(false);input.focus();}
 root.querySelector('.la-reset').addEventListener('click',reset);
 root.querySelectorAll('[data-example]').forEach(b=>b.addEventListener('click',()=>{input.value=b.dataset.example;input.focus();}));
 if(brand)for(const name of brandNames)brand.add(new Option(name,name));
 function render(data,message){
  answer.replaceChildren(el('p',message,'la-user'),el('h3','Sugjerimi për ty'),el('p',data.answer,'la-copy'));
  if(data.colours?.length){const grid=el('div',undefined,'la-colours');data.colours.forEach(c=>{
   const card=el('article',undefined,'la-colour');const swatch=el('div',undefined,'la-swatch');if(/^#[0-9a-f]{6}$/i.test(c.hex))swatch.style.backgroundColor=c.hex;
   swatch.setAttribute('aria-label',c.colour_name||c.colour_code);card.append(swatch,el('small',c.brand+' · '+(c.collection||'')),el('h4',c.colour_code),el('p',c.colour_name||''),el('p',c.reason,'la-reason'));
   if(c.verification_status!=='verified')card.append(el('small','Referencë që kërkon verifikim të mëtejshëm.'));
   const src=safeSource(c.source_url);if(src){const a=link('Burimi i katalogut ↗',src);a.target='_blank';a.rel='noopener noreferrer';card.append(a);}
   const button=el('button','Provoje në ambient');button.type='button';button.addEventListener('click',()=>{const frame=document.querySelector('#lulja-studio');if(frame){frame.contentWindow.postMessage({type:'lulja-select-colour',id:c.id},location.origin);frame.scrollIntoView({behavior:'smooth',block:'start'});}});card.append(button);grid.append(card);
  });answer.append(grid);}
  if(data.projects?.length){for(const p of data.projects){const section=el('section',undefined,'la-project');section.append(el('h4',p.title));for(const [label,items] of [['Materialet',p.materials],['Veglat & mbrojtja',p.tools]]){if(!items.length)continue;section.append(el('h5',label));const ul=el('ul');for(const item of items){const li=el('li');li.append(el('strong',item.name),el('p',item.why));ul.append(li);}section.append(ul);}section.append(el('p',p.before,'la-before'),link('Udhëzuesi i plotë →',p.url),link('Shiko kategorinë e produkteve →',p.product_url));answer.append(section);}}
  if(data.questions?.length){answer.append(el('h4','Për ta përshtatur më mirë'));const ul=el('ul',undefined,'la-questions');data.questions.forEach(q=>ul.append(el('li',q)));answer.append(ul);}
  if(data.note)answer.append(el('p',data.note,'la-footnote'));
 }
 form.addEventListener('submit',async e=>{
  e.preventDefault();if(submit.disabled||!form.reportValidity())return;
  const message=input.value.trim();if(message.length<3)return;
  const id=++requestId;controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),100000);
  pending(true);status.textContent='Po përgatitet sugjerimi…';
  try{
   const data=mode==='colours'?await suggestColour(message,brand?.value):suggestProject(message);
   if(id!==requestId)return;
   render(data,message);
   const context=[data.answer,...(data.questions||[]),...(data.colours||[]).map(c=>`${c.brand} ${c.colour_code} ${c.hex}: ${c.reason}`),...(data.projects||[]).map(p=>p.title+': '+[...p.materials,...p.tools].map(i=>i.name).join(', '))].join('\n').slice(0,2400);
   history=[...history,{role:'user',content:message},{role:'assistant',content:context}].slice(-6);
   input.value='';input.placeholder='Shto detaje ose kërko një ndryshim…';status.textContent='Sugjerimi është gati. Mund të vazhdosh bisedën më poshtë ose me të njëjtën fushë.';
  }catch(err){if(id===requestId)status.textContent=err.name==='AbortError'?'Kërkesa zgjati shumë. Provo përsëri.':err.message;}
  finally{clearTimeout(timeout);if(id===requestId)pending(false);}
 });
}

import { matchesProject } from './filter.js';
const sections=[...document.querySelectorAll('[data-project-detail]')];
const cards=[...document.querySelectorAll('[data-project]')];
const search=document.querySelector('#pc-search');
const category=document.querySelector('#pc-category');
function filter(){
 let count=0;
 cards.forEach(card=>{card.hidden=!matchesProject(card.dataset.search,card.dataset.category,search.value,category.value);if(!card.hidden)count++;});
 document.querySelector('#pc-results').textContent=`${count} nga ${cards.length} projekte`;
 document.querySelector('#pc-empty').hidden=count!==0;
}
search.addEventListener('input',filter);
category.addEventListener('change',filter);
document.querySelector('#pc-clear').addEventListener('click',()=>{search.value='';category.value='';filter();search.focus();});
// Reveal the chosen panel before the anchor's default scroll, including repeat clicks.
cards.forEach(card=>card.addEventListener('click',()=>{
 const active=sections.find(section=>section.id===card.dataset.project);
 sections.forEach(section=>section.hidden=section!==active);
 active.querySelector('h2').focus({preventScroll:true});
}));
function select(focus=false){const id=location.hash.slice(1);const active=sections.find(s=>s.id===id)||sections[0];sections.forEach(s=>s.hidden=s!==active);cards.forEach(c=>{if(c.dataset.project===active.id)c.setAttribute('aria-current','true');else c.removeAttribute('aria-current');});if(focus)active.querySelector('h2').focus({preventScroll:true});}
sections.forEach(section=>{
 section.addEventListener('click',event=>{const button=event.target.closest('[data-action]');if(!button)return;const action=button.dataset.action;
 if(action==='print')window.print();
 if(action==='download'){const lines=['LULJA — '+section.querySelector('h2').textContent,'',...Array.from(section.querySelectorAll('.pc-row'),label=>`• ${label.querySelector('strong').textContent}\n    ${label.querySelector('small').textContent}`),'','Para se të blesh: '+section.querySelector('.pc-note p').textContent,'','Sasitë dhe aplikimi: ndiq fletën teknike të produktit.'];const url=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=`LULJA-${section.id}-materialet.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 });
});
window.addEventListener('hashchange',()=>select(true));select();

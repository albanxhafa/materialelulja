import {renderAssistant} from './assistant.js';
import {renderDocument} from '../layout.js';
export function renderColorStudio(){return renderDocument({head:{title:'Provo ngjyrat — LULJA Color Studio',description:'Ngarko ambientin tënd, zgjidh ngjyrën nga katalogu dhe krahaso para e pas.',path:'/color-studio/'},active:'color-studio',body:`
<section class="bg-zinc-50 border-b border-zinc-200"><div class="max-w-7xl mx-auto px-5 py-5 flex flex-wrap items-center justify-between gap-3"><p class="text-sm text-zinc-600"><a href="/">Kryefaqja</a> / <a href="/bojera/">Bojëra</a> / <strong>Color Studio</strong></p></div></section>
${renderAssistant('colours')}
<iframe id="lulja-studio" title="LULJA — provo ngjyrat në ambientin tënd" src="/studio-workspace/" style="width:100%;height:1400px;border:0;display:block" allow="clipboard-write"></iframe>
<script>const studioFrame=document.getElementById('lulja-studio');window.addEventListener('message',event=>{if(event.origin!==location.origin||event.source!==studioFrame.contentWindow||event.data?.type!=='lulja-studio-height')return;const height=Number(event.data.height);if(Number.isFinite(height))studioFrame.style.height=Math.min(30000,Math.max(700,height))+'px';});</script>`})}

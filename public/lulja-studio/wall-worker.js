import {SamModel,AutoProcessor,RawImage,Tensor,env} from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.2/dist/transformers.web.min.js';
import {chooseMask} from './mask-choice.mjs';
env.allowLocalModels=false;
env.backends.onnx.wasm.numThreads=1;
let modelPromise,processorPromise,photoKey,processed,embeddings;
const MODEL='Xenova/slimsam-77-uniform',REVISION='5850ab45f587c112167512ffef949107115e26a0';
self.onmessage=async({data:d})=>{
 const status=text=>self.postMessage({id:d.id,status:text});
 try{
  if(!modelPromise){status('Po shkarkohet modeli i përzgjedhjes…');modelPromise=SamModel.from_pretrained(MODEL,{revision:REVISION,dtype:'q8',device:'wasm',progress_callback:e=>{if(e.status==='progress'&&Number.isFinite(e.progress))status('Po shkarkohet modeli… '+Math.round(e.progress)+'%')}});processorPromise=AutoProcessor.from_pretrained(MODEL,{revision:REVISION});}
  const [model,processor]=await Promise.all([modelPromise,processorPromise]);
  if(photoKey!==d.photoKey){
   status('Po dallohen sipërfaqet e fotos…');
   if(embeddings)for(const tensor of Object.values(embeddings))tensor.dispose?.();
   processed=await processor(new RawImage(new Uint8ClampedArray(d.pixels),d.width,d.height,4));
   embeddings=await model.get_image_embeddings(processed);photoKey=d.photoKey;
  }
  status('Po përzgjidhet muri…');
  const [h,w]=processed.reshaped_input_sizes[0],points=d.points;
  const input_points=new Tensor('float32',points.flatMap(p=>[p.x*w,p.y*h]),[1,1,points.length,2]);
  const input_labels=new Tensor('int64',points.map(p=>BigInt(p.label)),[1,1,points.length]);
  const out=await model({...embeddings,input_points,input_labels});
  const masks=await processor.post_process_masks(out.pred_masks,processed.original_sizes,processed.reshaped_input_sizes);
  const mask=chooseMask(masks[0].data,d.width,d.height,Array.from(out.iou_scores.data),points[0],d.variant||0);
  out.pred_masks.dispose?.();out.iou_scores.dispose?.();input_points.dispose?.();input_labels.dispose?.();
  self.postMessage({id:d.id,mask},[mask.alpha.buffer]);
 }catch(e){self.postMessage({id:d.id,error:e.message?.startsWith('Nuk u gjet')?e.message:'Modeli nuk u ngarkua ose fotoja nuk u përpunua. Kontrollo internetin dhe provo përsëri.'});}
};

/* Gesicherte SkPictures lesen. Wiedergeben ist Diagnose, keine kalte GPU-Abnahme. */
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {start}=require('./lib');
const root=path.join(os.tmpdir(),'paket-d-ursachen-messung-1791033304233/0/zeitgleiche-pictures');
const index=JSON.parse(fs.readFileSync(path.join(root,'index.json'),'utf8'));
(async()=>{const b=await start();try{
 const ctx=await b.newContext(),p=await ctx.newPage(),cdp=await ctx.newCDPSession(p);
 await cdp.send('LayerTree.enable');
 for(const item of index.pictures){let snapshotId;
  try{
   ({snapshotId}=await cdp.send('LayerTree.loadSnapshot',JSON.parse(fs.readFileSync(path.join(root,item.file),'utf8'))));
   const log=await cdp.send('LayerTree.snapshotCommandLog',{snapshotId});
   fs.writeFileSync(path.join(root,item.file.replace('.json','-befehle.json')),JSON.stringify(log,null,2));
   const {dataURL}=await cdp.send('LayerTree.replaySnapshot',{snapshotId,scale:1});
   fs.writeFileSync(path.join(root,item.file.replace('.json','.png')),Buffer.from(dataURL.split(',')[1],'base64'));
   const counts={};for(const c of log.commandLog)counts[c.method]=(counts[c.method]||0)+1;
   console.log(item.file,item.params.layer_rect,item.relative_flush_ms,counts);
  }finally{if(snapshotId)await cdp.send('LayerTree.releaseSnapshot',{snapshotId});}
 }
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

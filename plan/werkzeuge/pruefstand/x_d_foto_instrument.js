/* Optionale D12/D13-Diagnose: dieselbe Fotofolge und unveränderte Assertion.
   DOM, Animationen und GPU-Spur vor/nach jedem Bild; auch bei Rot sichern. */
const fs=require('node:fs'),path=require('node:path');
const states=new WeakMap();let lauf=0;
async function start(p,ziel){
  const dir=path.join(ziel,'diagnose',String(lauf++));fs.mkdirSync(dir,{recursive:true});
  const cdp=await p.context().newCDPSession(p),layers=[];
  cdp.on('LayerTree.layerTreeDidChange',e=>layers.push({zeit:Date.now(),...e}));
  await cdp.send('LayerTree.enable');await cdp.send('Performance.enable');
  await cdp.send('Tracing.start',{categories:process.env.D_GPU_KATEGORIEN||'toplevel,devtools.timeline,disabled-by-default-devtools.timeline,cc,gpu,viz',transferMode:'ReturnAsStream'});
  states.set(p,{dir,cdp,layers,namen:[]});
  fs.writeFileSync(path.join(dir,'browser.json'),JSON.stringify({browser:await cdp.send('Browser.getVersion'),quelle:process.env.D_FOTO_QUELLE||'Arbeitsbaum'},null,2));
}
async function daten(p,name,phase){
  const s=states.get(p);s.namen.push({name,phase});
  const dom=await p.evaluate(({name,phase})=>{
    console.timeStamp(name+' '+phase);
    const props=['display','visibility','opacity','transform','filter','backdrop-filter','outline','box-shadow','background-color','color','animation','transition','content'];
    const stil=(e,pseudo)=>Object.fromEntries(props.map(k=>[k,getComputedStyle(e,pseudo).getPropertyValue(k)]));
    return {name,phase,timeOrigin:performance.timeOrigin,zeit:performance.now(),scrollY,viewport:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio},active:document.activeElement?.outerHTML,
      animationen:document.getAnimations().map(a=>({name:a.animationName,time:a.currentTime,state:a.playState,target:a.effect?.target?.outerHTML,timing:a.effect?.getComputedTiming()})),
      elemente:[...document.querySelectorAll('body *')].map(e=>({html:e.outerHTML.slice(0,800),rect:e.getBoundingClientRect().toJSON(),stil:stil(e),vor:stil(e,'::before'),nach:stil(e,'::after')}))};
  },{name,phase});
  fs.writeFileSync(path.join(s.dir,name+'-'+phase+'.json'),JSON.stringify(dom));
  fs.writeFileSync(path.join(s.dir,name+'-'+phase+'-domsnapshot.json'),JSON.stringify(await s.cdp.send('DOMSnapshot.captureSnapshot',{computedStyles:['opacity','transform','background-color','box-shadow'],includePaintOrder:true,includeDOMRects:true})));
  // Diagnose erst NACH dem unverändert streng verglichenen Foto: Raster-
  // Displaylisten dürfen dessen ersten Aufnahmeweg nicht vorab erwärmen.
  if(phase==='nach'&&process.env.D_RASTER_ZIEL&&name.includes(process.env.D_RASTER_ZIEL)){
    const raster=[];
    for(const layer of s.layers.at(-1)?.layers||[]){
      if(!layer.drawsContent)continue;
      const entry={layer};let snapshotId;
      try{
        entry.gruende=await s.cdp.send('LayerTree.compositingReasons',{layerId:layer.layerId});
        ({snapshotId}=await s.cdp.send('LayerTree.makeSnapshot',{layerId:layer.layerId}));
        entry.befehle=await s.cdp.send('LayerTree.snapshotCommandLog',{snapshotId});
        const {dataURL}=await s.cdp.send('LayerTree.replaySnapshot',{snapshotId,scale:1});
        fs.writeFileSync(path.join(s.dir,name+'-raster-'+layer.layerId+'.png'),Buffer.from(dataURL.split(',')[1],'base64'));
      }catch(e){entry.fehler=e.message;}finally{if(snapshotId)await s.cdp.send('LayerTree.releaseSnapshot',{snapshotId});}
      raster.push(entry);
    }
    fs.writeFileSync(path.join(s.dir,name+'-raster.json'),JSON.stringify(raster));
  }
}
async function ende(p){
  const s=states.get(p);if(!s)return;
  const fertig=new Promise(resolve=>s.cdp.once('Tracing.tracingComplete',resolve));await s.cdp.send('Tracing.end');
  const {stream}=await fertig;
  const fd=fs.openSync(path.join(s.dir,'trace.json'),'wx');
  try{for(;;){const r=await s.cdp.send('IO.read',{handle:stream});fs.writeSync(fd,r.base64Encoded?Buffer.from(r.data,'base64'):r.data);if(r.eof)break;}}finally{fs.closeSync(fd);await s.cdp.send('IO.close',{handle:stream});}
  fs.writeFileSync(path.join(s.dir,'layers.json'),JSON.stringify(s.layers));
  fs.writeFileSync(path.join(s.dir,'metrics.json'),JSON.stringify(await s.cdp.send('Performance.getMetrics')));
  fs.writeFileSync(path.join(s.dir,'bilder.json'),JSON.stringify(s.namen));
  console.log('DOM/Animationen/GPU gesichert: '+s.dir+' ('+s.namen.filter(x=>x.phase==='vor').length+' Fotos)');
  states.delete(p);
}
async function fehler(p,name){
  const s=states.get(p);
  for(let i=0;i<3;i++){
    await daten(p,name,'kontrolle-'+i);
    await p.screenshot({path:path.join(s.dir,name+'-kontrolle-'+i+'.png'),fullPage:true});
  }
}
module.exports={start,daten,ende,fehler};

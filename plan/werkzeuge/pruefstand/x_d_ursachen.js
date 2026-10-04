/* D12/D15: Diagnose an gesicherten Quellen, keine Produktänderung. */
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {start,neueSeite,aktion,GERAETE}=require('./lib');
const root=path.join(os.tmpdir(),'paket-d-ursachen-messung-'+Date.now());fs.mkdirSync(root);
const basis=JSON.parse(fs.readFileSync(path.join(os.tmpdir(),'paket-d-fotos/d12-20261003-stand1/vor/stand.json')));
const modus=process.argv[2]||'foto';
async function stabil(p){await p.evaluate(async()=>{await document.fonts.ready;for(const a of document.getAnimations()){if(a.effect.getComputedTiming().endTime!==Infinity)a.finish();else {a.pause();a.currentTime=0;}}});await p.waitForTimeout(800);}
async function daten(p){return p.evaluate(()=>({scrollY,active:document.activeElement?.outerHTML,animationen:document.getAnimations().map(a=>({name:a.animationName,time:a.currentTime,state:a.playState,target:a.effect.target?.outerHTML,timing:a.effect.getComputedTiming()})),elemente:[...document.querySelectorAll('#app *,.nav')].map(e=>({tag:e.tagName,klasse:e.className,rect:e.getBoundingClientRect().toJSON(),stil:['opacity','transform','filter','backdrop-filter','outline','background-color'].map(k=>[k,getComputedStyle(e).getPropertyValue(k)]),vor:getComputedStyle(e,'::before').content,nach:getComputedStyle(e,'::after').content}))}));}
(async()=>{console.log(root);const b=await start();try{
const base=root;
for(const [lauf,quelle] of (modus==='boot'?Array(Number(process.env.D_BOOT_LAEUFE||3)).fill('paket-d-d15-zweiter-versuch-20261003'):['paket-d-d12-vor-20261003','paket-d-d12-abgelehnt-20261003']).entries()){
const root=path.join(base,String(lauf));fs.mkdirSync(root);
const dir=path.join(os.tmpdir(),quelle),frames=[];
if(process.env.D_BOOT_DIAGNOSE_CSS){
fs.writeFileSync(path.join(root,'diagnose-css.json'),JSON.stringify({quelle,css:process.env.D_BOOT_DIAGNOSE_CSS,frage:process.env.D_BOOT_DIAGNOSE_FRAGE||'Entfaellt der kalte Flush bei dieser einzelnen CSS-Gegenprobe? Keine Produktkorrektur.'},null,2));
}
const {p,ctx}=await neueSeite(b,GERAETE.handy,{warte:1,store:basis.leer,ls:{'adrabic-thema':'dunkel'},vorher:async c=>{
await c.addInitScript(({zeit,boot})=>{
navigator.serviceWorker.register=()=>Promise.reject(new Error('Diagnose ohne Worker'));
const Echt=Date,offset=zeit-Echt.now();window.Date=class extends Echt {constructor(...a){super(...(a.length?a:[Echt.now()+offset]));}static now(){return Echt.now()+offset;}};
if(boot){window.__mess=[];let ende=performance.now()+5000;function bild(t){let e=document.querySelector('.boot')||document.querySelector('#app > .view');__mess.push({t,now:performance.now(),art:e?.className,op:e?getComputedStyle(e).opacity:null,animationen:e?.getAnimations().map(a=>({time:a.currentTime,state:a.playState,timing:a.effect.getComputedTiming()}))});if(t<ende)requestAnimationFrame(bild);}requestAnimationFrame(bild);}
},{zeit:basis.zeitMs,boot:modus==='boot'});
for(const f of ['app.js','styles.css'])await c.route(u=>u.hostname==='127.0.0.1'&&u.pathname.endsWith('/'+f),r=>r.fulfill({body:fs.readFileSync(path.join(dir,f),'utf8')+(f==='styles.css'&&modus==='boot'&&process.env.D_BOOT_DIAGNOSE_CSS?'\n'+process.env.D_BOOT_DIAGNOSE_CSS:''),contentType:f.endsWith('.js')?'text/javascript':'text/css'}));
}});
try{
if(modus==='boot'){
const cdp=await ctx.newCDPSession(p);await cdp.send('Performance.enable');
const layers=[];
if(process.env.D_BOOT_RASTER){cdp.on('LayerTree.layerTreeDidChange',e=>layers.push({zeit:Date.now(),...e}));await cdp.send('LayerTree.enable');}
const cats=process.env.D_GPU_KATEGORIEN||'toplevel,devtools.timeline,disabled-by-default-devtools.timeline,blink,cc,gpu,viz';
await cdp.send('Tracing.start',{...(process.env.D_BOOT_TRACE_KB?{traceConfig:{recordMode:'recordUntilFull',traceBufferSizeInKb:Number(process.env.D_BOOT_TRACE_KB),includedCategories:cats.split(',')}}:{categories:cats}),transferMode:'ReturnAsStream'});
await p.evaluate(()=>console.timeStamp('D15 Bildfolge vor'));
cdp.on('Page.screencastFrame',async e=>{frames.push({t:e.metadata.timestamp,data:e.data});await cdp.send('Page.screencastFrameAck',{sessionId:e.sessionId});});
await cdp.send('Page.startScreencast',{format:'png',everyNthFrame:1});
await p.waitForTimeout(5000);await cdp.send('Page.stopScreencast');
await p.evaluate(()=>console.timeStamp('D15 Bildfolge nach'));
fs.writeFileSync(path.join(root,'boot-raf.json'),JSON.stringify(await p.evaluate(()=>__mess),null,2));
fs.writeFileSync(path.join(root,'boot-origin.json'),JSON.stringify(await p.evaluate(()=>({timeOrigin:performance.timeOrigin})),null,2));
fs.writeFileSync(path.join(root,'boot-metrics.json'),JSON.stringify(await cdp.send('Performance.getMetrics'),null,2));
frames.forEach((f,i)=>fs.writeFileSync(path.join(root,'boot-'+i+'.png'),Buffer.from(f.data,'base64')));fs.writeFileSync(path.join(root,'boot-framezeiten.json'),JSON.stringify(frames.map(({t})=>t)));
const fertig=new Promise(resolve=>cdp.once('Tracing.tracingComplete',resolve));await cdp.send('Tracing.end');const {stream}=await fertig;let trace='';for(;;){const r=await cdp.send('IO.read',{handle:stream});trace+=r.data;if(r.eof)break;}await cdp.send('IO.close',{handle:stream});fs.writeFileSync(path.join(root,'boot-trace.json'),trace);
console.log('Boot: '+frames.length+' echte Bilder, rAF und Trace gesichert');
if(process.env.D_BOOT_RASTER){
  fs.writeFileSync(path.join(root,'boot-layers.json'),JSON.stringify(layers));
  fs.writeFileSync(path.join(root,'boot-domsnapshot.json'),JSON.stringify(await cdp.send('DOMSnapshot.captureSnapshot',{computedStyles:['background','opacity','transform','box-shadow','filter','border'],includePaintOrder:true,includeDOMRects:true})));
  const raster=[];
  for(const l of layers.at(-1)?.layers||[]){
    if(!l.drawsContent||!l.backendNodeId)continue;
    const r={layer:l};let snapshotId;
    try{r.node=await cdp.send('DOM.describeNode',{backendNodeId:l.backendNodeId});({snapshotId}=await cdp.send('LayerTree.makeSnapshot',{layerId:l.layerId}));r.befehle=await cdp.send('LayerTree.snapshotCommandLog',{snapshotId});}catch(e){r.fehler=e.message;}finally{if(snapshotId)await cdp.send('LayerTree.releaseSnapshot',{snapshotId});}
    raster.push(r);
  }
  fs.writeFileSync(path.join(root,'boot-raster.json'),JSON.stringify(raster));
  console.log('DOM-Ziele und Raster-Displaylisten nach der kalten Bildfolge gesichert');
}
}else{
await p.waitForTimeout(1400);await stabil(p);await p.screenshot({fullPage:true});await aktion(p,'tab-fortschritt');await stabil(p);await p.screenshot({fullPage:true});const ids=await p.locator('[data-action="fort-seite"]').evaluateAll(es=>[...new Set(es.map(e=>e.dataset.id))]);
for(const id of ids){await aktion(p,'fort-seite',id);await stabil(p);await p.screenshot({fullPage:true});await aktion(p,'seite-zu');}
await aktion(p,'tab-verwalten');await stabil(p);await p.screenshot({fullPage:true});await aktion(p,'karte-neu');await stabil(p);await p.screenshot({fullPage:true});await p.keyboard.press('Escape');await p.waitForTimeout(300);await aktion(p,'einstellungen');
for(let i=0;i<6;i++){await stabil(p);fs.writeFileSync(path.join(root,quelle+'-'+i+'.json'),JSON.stringify(await daten(p)));await p.screenshot({path:path.join(root,quelle+'-'+i+'.png'),fullPage:true});}
await p.evaluate(()=>document.activeElement.blur());await stabil(p);await p.screenshot({path:path.join(root,quelle+'-blur.png'),fullPage:true});console.log(quelle+' Fotos und DOM gesichert');
}
}finally{await ctx.close();}
}
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

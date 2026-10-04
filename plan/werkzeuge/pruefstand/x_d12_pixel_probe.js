/* Diagnose aus gesicherten Quads: Pixel 546/112 liegt nur auf bg-glow.
   A/B/A: Kopfleiste vorhanden/entfernt/vorhanden oder Vorab-Höhe.
   D_PIXEL_HOEHE=1: physische Höhe 2240/1136/2240, sonst Kopfleiste.
   D_PIXEL_MIN_HEIGHT: GPU-Mindesthöhe nur in B; Kopfleiste stets vorhanden.
   D_PIXEL_OHNE_VORAB: nur B ohne physische Vorab-Fläche.
   D_PIXEL_VIEWPORT: B nur Viewportfoto, A ganze Seite; nur gemeinsamer
   Bildbereich auswerten, keine historische App-Fotoabnahme.
   D_PIXEL_DOKUMENT: B Dokumenthöhe 568 statt 1120.421875, bg-glow gleich.
   Isolierte Fläche,
   keine App-Abnahme. Gleiche Original-CSS, DPR und Vorab-Fläche in allen. */
const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {createHash}=require('node:crypto');
const out=path.join(os.tmpdir(),'paket-d-pixel-probe-'+Date.now());fs.mkdirSync(out);console.log(out);
const source=path.join(os.tmpdir(),'paket-d-d12-abgelehnt-20261003/styles.css');
const css=fs.readFileSync(source,'utf8');
fs.writeFileSync(path.join(out,'source.json'),JSON.stringify({source,sha256:createHash('sha256').update(css).digest('hex')},null,2));
(async()=>{
 const variants=process.env.D_PIXEL_DOKUMENT?[
  {header:true,height:2240},{header:true,height:1136,shortDocument:true},{header:true,height:2240}
 ]:process.env.D_PIXEL_VIEWPORT?[
  {header:true,height:1136},{header:true,height:1136,viewportOnly:true},{header:true,height:1136}
 ]:process.env.D_PIXEL_OHNE_VORAB?[
  {header:true,height:2240},{header:true,height:0},{header:true,height:2240}
 ]:process.env.D_PIXEL_MIN_HEIGHT?[
  {header:true,height:2240},{header:true,height:2240,minHeight:Number(process.env.D_PIXEL_MIN_HEIGHT)},{header:true,height:2240}
 ]:process.env.D_PIXEL_HOEHE?[
  {header:true,height:2240},{header:true,height:1136},{header:true,height:2240}
 ]:[{header:true,height:2242},{header:false,height:2242},{header:true,height:2242}];
 for(const [index,{header,height,minHeight,viewportOnly,shortDocument}] of variants.entries()){
  const dir=path.join(out,String(index));fs.mkdirSync(dir);
  const args=minHeight?['--min-height-for-gpu-raster-tile='+minHeight]:[];
  const b=await chromium.launch({executablePath:process.env.CHROMIUM,args});
  try{
   const ctx=await b.newContext({viewport:{width:320,height:568},deviceScaleFactor:2,isMobile:true,hasTouch:true,colorScheme:'dark'});
   const p=await ctx.newPage(),cdp=await ctx.newCDPSession(p);
   await p.setContent('<html data-thema="dunkel"><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>'+css+'</style><style>body{height:'+(shortDocument?'568':'1120.421875')+'px;min-height:0;padding:0}.bg-glow{will-change:transform}</style></head><body><div class="bg-glow"></div>'+(header?'<header class="appbar"></header>':'')+'</body></html>');
   await p.waitForTimeout(800);
   const read=()=>p.evaluate(()=>({width:innerWidth,height:innerHeight,dpr:devicePixelRatio,scrollY,background:getComputedStyle(document.querySelector('.bg-glow')).background,rect:document.querySelector('.bg-glow').getBoundingClientRect().toJSON(),animations:document.getAnimations().map(a=>({name:a.animationName,state:a.playState,time:a.currentTime}))}));
   const before=await read();
   await cdp.send('Tracing.start',{categories:'toplevel,devtools.timeline,cc,gpu,viz,disabled-by-default-viz.quads,disabled-by-default-cc.debug',transferMode:'ReturnAsStream',traceBufferSizeInKb:131072});
   if(height)await cdp.send('Emulation.setVisibleSize',{width:640,height});await p.waitForTimeout(200);
   fs.writeFileSync(path.join(dir,'dom.json'),JSON.stringify({header,height,args,viewportOnly:!!viewportOnly,before,after:await read(),version:await cdp.send('Browser.getVersion')},null,2));
   await p.evaluate(()=>console.timeStamp('pixel vor'));
   await p.screenshot({path:path.join(dir,'first.png'),fullPage:!viewportOnly});
   await p.evaluate(()=>console.timeStamp('pixel nach'));
   const done=new Promise(r=>cdp.once('Tracing.tracingComplete',r));await cdp.send('Tracing.end');const {stream}=await done;
   const fd=fs.openSync(path.join(dir,'trace.json'),'wx');
   try{for(;;){const r=await cdp.send('IO.read',{handle:stream});fs.writeSync(fd,r.base64Encoded?Buffer.from(r.data,'base64'):r.data);if(r.eof)break;}}
   finally{fs.closeSync(fd);await cdp.send('IO.close',{handle:stream});}
   console.log(index+' first saved, header '+header);
  }finally{await b.close();}
 }
})().catch(e=>{console.error(e);process.exitCode=1;});

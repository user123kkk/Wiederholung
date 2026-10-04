/* Isolierte D12-Gegenprobe: nur originaler Hintergrundverlauf.
   Einzige Variable: GPU-Mindestkachelhöhe. Keine Produkt-/Abnahmeänderung. */
const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const root=path.join(os.tmpdir(),'paket-d-gradient-kacheln-'+Date.now());fs.mkdirSync(root);console.log(root);
const css=fs.readFileSync(path.join(os.tmpdir(),'paket-d-d12-abgelehnt-20261003/styles.css'),'utf8');
(async()=>{
 for(const h of [256,448]){
  const dir=path.join(root,String(h));fs.mkdirSync(dir);
  const b=await chromium.launch({executablePath:process.env.CHROMIUM,args:['--min-height-for-gpu-raster-tile='+h]});
  try{
   const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true,colorScheme:'light'});
   const p=await ctx.newPage(),cdp=await ctx.newCDPSession(p);
   await p.setContent('<html data-thema="hell"><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>'+css+'</style><style>.bg-glow{will-change:transform}</style></head><body><div class="bg-glow"></div></body></html>');
   await p.waitForTimeout(500);
   fs.writeFileSync(path.join(dir,'dom.json'),JSON.stringify(await p.evaluate(()=>({width:innerWidth,height:innerHeight,dpr:devicePixelRatio,farbe:getComputedStyle(document.body).background,verlauf:getComputedStyle(document.querySelector('.bg-glow')).background,rect:document.querySelector('.bg-glow').getBoundingClientRect().toJSON()}))));
   await cdp.send('Tracing.start',{categories:'cc,gpu,viz,disabled-by-default-viz.quads,disabled-by-default-cc.debug',transferMode:'ReturnAsStream'});
   await p.screenshot({path:path.join(dir,'gradient.png'),fullPage:true});
   await p.waitForTimeout(100);
   const end=new Promise(r=>cdp.once('Tracing.tracingComplete',r));await cdp.send('Tracing.end');const {stream}=await end;
   const fd=fs.openSync(path.join(dir,'trace.json'),'wx');try{for(;;){const r=await cdp.send('IO.read',{handle:stream});fs.writeSync(fd,r.data);if(r.eof)break;}}finally{fs.closeSync(fd);await cdp.send('IO.close',{handle:stream});}
   console.log('Kachelhöhe '+h+' gesichert');
  }finally{await b.close();}
 }
})().catch(e=>{console.error(e);process.exitCode=1;});

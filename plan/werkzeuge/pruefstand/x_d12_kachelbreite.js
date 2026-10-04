/* D12-Diagnose: Aufnahme-Reihenfolge bei gleichem DOM/Animationen/Pixelskala.
   A/B/A, frischer Prozess je Probe. Keine Produkt- oder Fotoabnahme. */
const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const out=path.join(os.tmpdir(),'paket-d-kachelbreite-probe-'+Date.now());
fs.mkdirSync(out);console.log(out);
const source=path.join(os.tmpdir(),'paket-d-d12-abgelehnt-20261003/styles.css');
const css=fs.readFileSync(source,'utf8');
const {createHash}=require('node:crypto');
fs.writeFileSync(path.join(out,'quelle.json'),JSON.stringify({source,sha256:createHash('sha256').update(css).digest('hex')},null,2));
(async()=>{
  const variants=process.env.D_KACHEL_VARIANTEN?JSON.parse(process.env.D_KACHEL_VARIANTEN):['original','flaeche-vorab','original'];
  for(const [index,variant] of variants.entries()){
    const args=variant==='single-thread'?['--disable-threaded-compositing']:[];
    const dir=path.join(out,String(index));fs.mkdirSync(dir);
    const browser=await chromium.launch({executablePath:process.env.CHROMIUM,args:['--enable-automation',...args]});
    try{
      const ctx=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true,colorScheme:'light'});
      const p=await ctx.newPage(),cdp=await ctx.newCDPSession(p);
      fs.writeFileSync(path.join(dir,'browser.json'),JSON.stringify({variant,args,version:await cdp.send('Browser.getVersion'),command:await cdp.send('Browser.getBrowserCommandLine')},null,2));
      await p.setContent('<html data-thema="hell"><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>'+css+'</style><style>.bg-glow{will-change:transform}</style></head><body><div class="bg-glow"></div></body></html>');
      await p.waitForTimeout(800);
      const dom=()=>p.evaluate(()=>({html:document.documentElement.outerHTML,viewport:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio},background:getComputedStyle(document.querySelector('.bg-glow')).background,rect:document.querySelector('.bg-glow').getBoundingClientRect().toJSON(),animations:document.getAnimations().map(a=>({name:a.animationName,state:a.playState,time:a.currentTime}))}));
      fs.writeFileSync(path.join(dir,'vor.json'),JSON.stringify(await dom()));
      await cdp.send('Tracing.start',{categories:'toplevel,devtools.timeline,cc,gpu,viz,disabled-by-default-viz.quads,disabled-by-default-cc.debug',transferMode:'ReturnAsStream',traceBufferSizeInKb:131072});
      if(variant==='flaeche-vorab'){
        await p.evaluate(()=>console.timeStamp('flaeche vor'));
        await cdp.send('Emulation.setVisibleSize',{width:780,height:1688});
        await p.waitForTimeout(200);
        fs.writeFileSync(path.join(dir,'flaeche.json'),JSON.stringify(await dom()));
      }
      await p.evaluate(()=>console.timeStamp('aufnahme vor'));
      try{
        await p.screenshot({path:path.join(dir,'gradient.png'),fullPage:true,...(variant==='ohne-ganze-aufzeichnung'?{captureBeyondViewport:false}:{})});
      }catch(e){fs.writeFileSync(path.join(dir,'fehler.txt'),e.stack);console.log(index+' Aufnahmefehler '+e.message);}
      await p.evaluate(()=>console.timeStamp('aufnahme nach'));
      fs.writeFileSync(path.join(dir,'nach.json'),JSON.stringify(await dom()));
      const complete=new Promise(r=>cdp.once('Tracing.tracingComplete',r));
      await cdp.send('Tracing.end');const {stream}=await complete;
      const fd=fs.openSync(path.join(dir,'trace.json'),'wx');
      try{for(;;){const r=await cdp.send('IO.read',{handle:stream});fs.writeSync(fd,r.base64Encoded?Buffer.from(r.data,'base64'):r.data);if(r.eof)break;}}
      finally{fs.closeSync(fd);await cdp.send('IO.close',{handle:stream});}
      console.log(index+' Aufnahmeversuch gesichert '+variant);
    }finally{await browser.close();}
  }
})().catch(e=>{console.error(e);process.exitCode=1;});

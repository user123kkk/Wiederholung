/* D12: feste Aufnahme-Pixelskala gegen die Umskalierung pro Screenshot.
   Nach dem unveränderten Antwortfoto, nur Diagnose; keine Abnahmeänderung. */
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const instrument=require('./x_d_foto_instrument'),daten=instrument.daten;
const out=path.join(os.tmpdir(),'paket-d-capture-probe-'+Date.now());fs.mkdirSync(out);
console.log('Aufnahme-Gegenprobe: '+out);
instrument.daten=async(p,name,phase)=>{
 await daten(p,name,phase);if(phase!=='nach'||!name.endsWith('-antwort'))return;
 const cdp=await p.context().newCDPSession(p);
 const dom=()=>p.evaluate(()=>({width:innerWidth,height:innerHeight,dpr:devicePixelRatio,scrollY,elemente:[...document.querySelectorAll('body *')].map(e=>({klasse:e.className,rect:e.getBoundingClientRect().toJSON(),stil:Object.fromEntries(['opacity','transform','background','filter','backdrop-filter','color'].map(k=>[k,getComputedStyle(e).getPropertyValue(k)]))}))}));
 const report={vor:await dom(),aufnahmen:[]};
 const capture=async(id,raw)=>{
   await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>requestAnimationFrame(r)))));
   console.log('Aufnahme '+id);
   const buffer=raw?Buffer.from((await cdp.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false})).data,'base64'):await p.screenshot({fullPage:true});
   fs.writeFileSync(path.join(out,id+'.png'),buffer);report.aufnahmen.push({id,dom:await dom()});
 };
 await capture('playwright-vor',false);await capture('cdp-ohne-clip',true);
 const metrics={width:390,height:844,deviceScaleFactor:2,mobile:true,screenWidth:390,screenHeight:844};
 await cdp.send('Emulation.setDeviceMetricsOverride',{...metrics,viewport:{x:0,y:0,width:390,height:844,scale:2}});
 await capture('feste-skala-1',true);await capture('feste-skala-2',true);
 await cdp.send('Emulation.setDeviceMetricsOverride',metrics);
 await capture('playwright-wiederhergestellt',false);
 fs.writeFileSync(path.join(out,'gegenprobe.json'),JSON.stringify(report,null,2));
 console.log('Aufnahme-Gegenprobe gesichert: '+out);
};
require('./x_paket_d_fotos');

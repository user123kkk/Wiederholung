/* D12-Diagnose: Halten beendete Animationen GPU-Ebenen mit anderen Pixeln?
   Nur Messung nach einem unveränderten Foto, keine Produktkorrektur. */
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const instrument=require('./x_d_foto_instrument');
const daten=instrument.daten;
const out=path.join(os.tmpdir(),'paket-d-animationsebenen-'+Date.now());
fs.mkdirSync(out);console.log('Gegenprobe: '+out);
const dom=p=>p.evaluate(()=>[...document.querySelectorAll('body *')].map(e=>({tag:e.tagName,klasse:e.className,rect:e.getBoundingClientRect().toJSON(),stil:Object.fromEntries(['opacity','transform','filter','background','box-shadow','color'].map(k=>[k,getComputedStyle(e).getPropertyValue(k)]))})));
const raf=p=>p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>requestAnimationFrame(r)))));
const gemessen=new WeakSet();
async function probe(p,name){
  if(gemessen.has(p))return;gemessen.add(p);
  const cdp=await p.context().newCDPSession(p);
  const report={name,vor:await dom(p),schritte:[]};
  const capture=async id=>{
    await raf(p);
    const bild=await p.screenshot({path:path.join(out,id+'.png'),fullPage:true});
    report.schritte.push({id,dom:await dom(p),sha256:require('node:crypto').createHash('sha256').update(bild).digest('hex')});
  };
  await capture('gehalten');
  const raw=await cdp.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
  fs.writeFileSync(path.join(out,'cdp-ohne-clip.png'),Buffer.from(raw.data,'base64'));
  report.animationen=await p.evaluate(()=>{
    window.__dAnimProbe=[];
    for(const a of document.getAnimations()){
      if(a.playState!=='finished'||a.effect.getComputedTiming().progress!==1)continue;
      const e=a.effect.target;
      __dAnimProbe.push({a,e,stil:e.getAttribute('style'),time:a.currentTime});
    }
    const info=__dAnimProbe.map(({a,e,time})=>({name:a.animationName,target:e.outerHTML,time}));
    for(const {a} of __dAnimProbe){a.commitStyles();a.cancel();}
    return info;
  });
  await capture('beendete-freigegeben');
  await p.evaluate(()=>{for(const {a,e,stil,time} of __dAnimProbe){if(stil===null)e.removeAttribute('style');else e.setAttribute('style',stil);a.play();a.currentTime=time;a.finish();}});
  await capture('wieder-gehalten');
  fs.writeFileSync(path.join(out,'gegenprobe.json'),JSON.stringify(report,null,2));
  console.log('Animations-Ebenen-Gegenprobe gesichert: '+out);
}
instrument.daten=async(p,name,phase)=>{
  await daten(p,name,phase);
  if(phase==='nach'&&name.endsWith(process.env.D_ANIM_ZIEL||'-ende'))await probe(p,name);
};
const fehler=instrument.fehler;
instrument.fehler=async(p,name)=>{await probe(p,name);await fehler(p,name);};
require('./x_paket_d_fotos');

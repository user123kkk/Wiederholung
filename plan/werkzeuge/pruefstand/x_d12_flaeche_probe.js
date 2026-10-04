/* Nur Diagnose: physische Aufnahmefläche vorab setzen, ohne Pixelskala,
   DOM oder gehaltene Animationen zu ändern. Strenge historische Fotos bleiben.
   D_FOTO_FILTER begrenzt Diagnose; kein Gesamtfoto-Erfolg daraus ableiten. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const instrument=require('./x_d_foto_instrument');
const daten=instrument.daten,states=new WeakMap();
instrument.daten=async(p,name,phase)=>{
  if(phase==='vor'){
    await daten(p,name,phase);
    const cdp=await p.context().newCDPSession(p);
    const read=()=>p.evaluate(()=>({width:innerWidth,height:innerHeight,dpr:devicePixelRatio,scrollY,
      elements:[...document.querySelectorAll('body *')].map(e=>({html:e.outerHTML,rect:e.getBoundingClientRect().toJSON(),style:getComputedStyle(e).cssText,
        opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform,background:getComputedStyle(e).background})),
      animations:document.getAnimations().map(a=>({name:a.animationName,time:a.currentTime,state:a.playState,timing:a.effect.getComputedTiming()}))}));
    const before=await read();
    const size=await p.evaluate(()=>({width:Math.max(document.documentElement.scrollWidth,document.body.scrollWidth,innerWidth),height:Math.max(document.documentElement.scrollHeight,document.body.scrollHeight,innerHeight),dpr:devicePixelRatio}));
    await p.evaluate(()=>console.timeStamp('flaeche vor'));
    await cdp.send('Emulation.setVisibleSize',{width:Math.round(size.width*size.dpr),height:Math.round(size.height*size.dpr)});
    await p.waitForTimeout(200);
    const after=await read();
    const dir=path.join(process.env.TEMP,'paket-d-fotos',process.argv[3],process.env.D_FOTO_NACH,'flaechen');fs.mkdirSync(dir,{recursive:true});
    fs.writeFileSync(path.join(dir,name+'.json'),JSON.stringify({before,after,size},null,2));
    assert.deepEqual(after,before,'Vorab-Fläche verändert DOM/Animationen '+name);
    states.set(p,{cdp,before});
  }else{
    await daten(p,name,phase);
    if(phase==='nach'){
      const state=states.get(p);
      await state.cdp.send('Emulation.setVisibleSize',{width:state.before.width,height:state.before.height});
      await state.cdp.detach();states.delete(p);
    }
  }
};
require('./x_paket_d_fotos');

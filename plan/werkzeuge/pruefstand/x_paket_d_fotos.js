/* D12/D13: stabilisierte Vorher-/Nachher-Fotos. Erst aufnehmen, dann ändern.
   node x_paket_d_fotos.js aufnehmen <eindeutiger-Tag>
   node x_paket_d_fotos.js vergleichen <derselbe-Tag>
   Bilder bleiben in TEMP; kein Löschen oder Überschreiben des Vorstands. */
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const assert=require('node:assert/strict');
const {createHash}=require('node:crypto');
const {start,neueSeite,aktion,GERAETE,vollerStore}=require('./lib');
const diagnose=process.env.D_FOTO_DIAGNOSE?require('./x_d_foto_instrument'):null;
const [modus,tag]=process.argv.slice(2);
assert.ok(['aufnehmen','vergleichen'].includes(modus)&&/^[a-zA-Z0-9-]+$/.test(tag||''),'Modus und eindeutiger Tag erforderlich');
const repo=path.resolve(__dirname,'../../..'),root=path.join(os.tmpdir(),'paket-d-fotos',tag);
const ziel=path.join(root,modus==='aufnehmen'?'vor':(process.env.D_FOTO_NACH||'nach'));
assert.ok(!fs.existsSync(ziel),'Bilderordner existiert bereits: '+ziel);
if(modus==='vergleichen')assert.ok(fs.existsSync(path.join(root,'vor','stand.json')),'Vorstand fehlt');
fs.mkdirSync(ziel,{recursive:true});
const basis=modus==='aufnehmen'?{zeitMs:Date.now(),voll:vollerStore(),leer:vollerStore({leer:true})}:JSON.parse(fs.readFileSync(path.join(root,'vor','stand.json'),'utf8'));
const quelle=process.env.D_FOTO_QUELLE||repo;
const app=fs.readFileSync(path.join(quelle,'app.js'),'utf8'),css=fs.readFileSync(path.join(quelle,'styles.css'),'utf8');
const hash=createHash('sha256').update(app).update(css).digest('hex');
fs.writeFileSync(path.join(ziel,'stand.json'),JSON.stringify({...basis,hash,modus,zeit:new Date().toISOString()},null,2));
async function seite(b,vp,opt){
  const result=await neueSeite(b,vp,{...opt,vorher:async ctx=>{
    await ctx.addInitScript(zeitMs=>{
      navigator.serviceWorker.register=()=>Promise.reject(new Error('Foto ohne Worker'));
      // Derselbe Lerntag/Gruß und dieselben Daten; die Boot-Uhr läuft weiter.
      const Echt=Date,offset=zeitMs-Echt.now();
      window.Date=class extends Echt {constructor(...a){super(...(a.length?a:[Echt.now()+offset]));}static now(){return Echt.now()+offset;}};
      let seed=7;Math.random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
    },basis.zeitMs);
    for(const [datei,body,type] of [['app.js',app,'text/javascript'],['styles.css',css,'text/css']])
      await ctx.route(u=>u.hostname==='127.0.0.1'&&u.pathname.endsWith('/'+datei),r=>r.fulfill({body,contentType:type}));
  }});
  if(diagnose)await diagnose.start(result.p,ziel);
  return result;
}
async function foto(p,name){
  await p.evaluate(async()=>{
    await document.fonts.ready;
    for(const a of document.getAnimations()){
      if(a.effect.getComputedTiming().endTime!==Infinity)a.finish();
      else {a.pause();a.currentTime=0;}
    }
  });
  await p.waitForTimeout(800); // Auch JS-Zahlen und sanftes Scrollen auslaufen lassen.
  await p.evaluate(()=>new Promise(resolve=>{
    let letzte=scrollY,gleich=0;
    function bild(){const y=scrollY;gleich=y===letzte?gleich+1:0;letzte=y;if(gleich>=3)resolve();else requestAnimationFrame(bild);}requestAnimationFrame(bild);
  }));
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Querüberlauf '+name);
  if(diagnose)await diagnose.daten(p,name,'vor');
  const bild=await p.screenshot({path:path.join(ziel,name+'.png'),fullPage:true});
  if(diagnose)await diagnose.daten(p,name,'nach');
  if(modus==='vergleichen'){
    const gleich=bild.equals(fs.readFileSync(path.join(root,'vor',name+'.png')));
    if(!gleich&&diagnose)await diagnose.fehler(p,name);
    assert.ok(gleich,'Foto verändert: '+name);
  }
}
(async()=>{const b=await start();try{
  for(const vp of [GERAETE.handy,{...GERAETE.handy,width:320,height:568},GERAETE.ipad])
  for(const thema of ['hell','dunkel'])for(const ruhig of [false,true])for(const leer of [false,true]){
    const store=JSON.parse(JSON.stringify(leer?basis.leer:basis.voll));store['users/u1'].settings.thema=thema;
    const {p,ctx}=await seite(b,vp,{thema,ruhig,leer,store,ls:{'adrabic-thema':thema}});
    const prefix=[vp.width,thema,ruhig?'ruhig':'bewegt',leer?'leer':'voll'].join('-');
    if(process.env.D_FOTO_FILTER&&!prefix.includes(process.env.D_FOTO_FILTER)){if(diagnose)await diagnose.ende(p);await ctx.close();continue;}
    try{
      await foto(p,prefix+'-lernen');
      await aktion(p,'tab-fortschritt');await foto(p,prefix+'-fortschritt');
      const fortSeiten=await p.locator('[data-action="fort-seite"]').evaluateAll(es=>[...new Set(es.map(e=>e.dataset.id))]);
      for(const id of fortSeiten){await aktion(p,'fort-seite',id);await foto(p,prefix+'-fort-'+id);await aktion(p,'seite-zu');}
      await aktion(p,'tab-verwalten');await foto(p,prefix+'-verwalten');
      await aktion(p,'karte-neu');await foto(p,prefix+'-kartenblatt');
      await p.keyboard.press('Escape');await p.waitForTimeout(300);
      if(!leer){
        await aktion(p,'open-drill');await foto(p,prefix+'-ueben');
        await aktion(p,'close-drill');
      }
      await aktion(p,'einstellungen');await foto(p,prefix+'-einstellungen');
      const einstSeiten=await p.locator('[data-action="einst-seite"]').evaluateAll(es=>[...new Set(es.map(e=>e.dataset.id))]);
      for(const id of einstSeiten){await aktion(p,'einst-seite',id);await foto(p,prefix+'-einst-'+id);await aktion(p,'seite-zu');}
      await aktion(p,'einstellungen-zu');await aktion(p,'tab-lernen');
      if(!leer){
        await aktion(p,'start-session');await foto(p,prefix+'-runde');
        await p.keyboard.press('Space');await p.waitForTimeout(700);await foto(p,prefix+'-antwort');
        for(let i=0;i<40&&!(await p.locator('#app .ende').count());i++){
          await p.keyboard.press('3');await p.waitForTimeout(400);
          if(!(await p.locator('#app .ende').count())){await p.keyboard.press('Space');await p.waitForTimeout(600);}
        }
        await p.waitForSelector('#app .ende');await foto(p,prefix+'-ende');
      }
      assert.deepEqual(p.fehler,[]);console.log(prefix+' '+modus+' grün');
    }finally{if(diagnose)await diagnose.ende(p);await ctx.close();}
  }
  for(const vp of [GERAETE.handy,{...GERAETE.handy,width:320,height:568},GERAETE.ipad])
  for(const thema of ['hell','dunkel'])for(const ruhig of [false,true]){
    const {p,ctx}=await seite(b,vp,{user:null,store:{},thema,ruhig,ls:{'adrabic-thema':thema}});
    const prefix=[vp.width,thema,ruhig?'ruhig':'bewegt','gast'].join('-');
    if(process.env.D_FOTO_FILTER&&!prefix.includes(process.env.D_FOTO_FILTER)){if(diagnose)await diagnose.ende(p);await ctx.close();continue;}
    try{
      await foto(p,prefix+'-einstieg-0');await aktion(p,'einstieg-weiter');
      await aktion(p,'einstieg-ziel','kurs');await foto(p,prefix+'-einstieg-1');await aktion(p,'einstieg-weiter');
      await aktion(p,'einstieg-huerde','keine');await foto(p,prefix+'-einstieg-2');await aktion(p,'einstieg-weiter');
      await foto(p,prefix+'-einstieg-3a');await aktion(p,'einstieg-aufdecken');await foto(p,prefix+'-einstieg-3b');
      await aktion(p,'einstieg-bewerten','Sicher');await foto(p,prefix+'-einstieg-3c');await aktion(p,'einstieg-weiter');
      await foto(p,prefix+'-einstieg-4');await aktion(p,'einstieg-schrift');await aktion(p,'einstieg-weiter');
      await foto(p,prefix+'-einstieg-5');await aktion(p,'einstieg-runde');await aktion(p,'einstieg-weiter');
      await foto(p,prefix+'-einstieg-6');await aktion(p,'einstieg-anker');await aktion(p,'einstieg-weiter');
      await p.waitForTimeout(7000);await foto(p,prefix+'-einstieg-7');
      await aktion(p,'einstieg-fertig');await foto(p,prefix+'-konto');
      await aktion(p,'mode-login');await foto(p,prefix+'-anmelden');
      await aktion(p,'mode-reset');await foto(p,prefix+'-passwort');
      assert.deepEqual(p.fehler,[]);console.log(prefix+' '+modus+' grün');
    }finally{if(diagnose)await diagnose.ende(p);await ctx.close();}
  }
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

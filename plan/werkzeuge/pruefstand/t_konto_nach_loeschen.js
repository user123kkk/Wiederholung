/* G-098: Nach erfolgreichem Konto-Loeschen muss ein anderes Konto ohne
   Seiten-Reload laden koennen. Nur Test-Store/Firebase-Attrappe. */
const {start,neueSeite,vollerStore,GERAETE}=require('./lib');
const assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const path=require('node:path');
const gegenprobe=process.argv.includes('--gegenprobe');
const alt=gegenprobe?execFileSync('git',['show','c3a6aec:app.js'],{cwd:path.join(__dirname,'../../..'),encoding:'utf8'}):null;
(async()=>{
  const b=await start();
  try{
    const store=vollerStore();for(const[k,v]of Object.entries({...store}))store[k.replace('users/u1','users/u2')]=structuredClone(v);
    const {p}=await neueSeite(b,GERAETE.handy,{store,vorher:async ctx=>{
      await ctx.route('**/app.js?*',async r=>{const s=alt||await(await r.fetch()).text();await r.fulfill({contentType:'text/javascript',body:s+'\nwindow.__PRUEF={loeschen:async()=>{await kontoDatenLoeschen();await kontoAuthLoeschen();},bereit:()=>bereiche!==null,gesperrt:()=>kontoWirdGeloescht};'});});
    }});
    await p.waitForFunction(()=>window.__PRUEF?.bereit());
    await p.evaluate(()=>window.__PRUEF.loeschen());
    await p.waitForFunction(()=>window.__FB.user===null);
    assert.equal(await p.evaluate(()=>[...window.__FB.store.keys()].some(k=>k.startsWith('users/u1'))),false,'Altes Konto nicht geloescht');
    await p.evaluate(()=>{const s=window.__FB;s.user={uid:'u2',emailVerified:true,email:'zwei@example.com',getIdToken:()=>Promise.resolve('tok')};for(const cb of s.authListeners)cb(s.user);});
    await p.waitForTimeout(650);
    const zustand=await p.evaluate(()=>({bereit:window.__PRUEF.bereit(),gesperrt:window.__PRUEF.gesperrt()}));
    if(gegenprobe)assert.deepEqual(zustand,{bereit:false,gesperrt:true},'Altstand muss nach Loeschen beim folgenden Konto gesperrt bleiben');
    else assert.deepEqual(zustand,{bereit:true,gesperrt:false},'Neues Konto bleibt nach erfolgreichem Loeschen am Boot haengen');
    assert.deepEqual(p.fehler,[],'JavaScript-/Konsolenfehler');
    console.log(gegenprobe?'OK  Gegenprobe: neues Konto bleibt durch alte Loeschsperre am Boot.':'OK  Konto A geloescht; Konto B laedt ohne Seiten-Reload.');
  }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

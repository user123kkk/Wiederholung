/* Nachpruefung: ein vor dem Kontowechsel geoeffneter Loeschdialog darf
   keine gleichnamige/gleich-ID Sammlung im neuen Konto loeschen. */
const {start,neueSeite,vollerStore,GERAETE,aktion}=require('./lib');
const assert=require('node:assert/strict');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const gegenprobe=process.argv.includes('--gegenprobe');
const alt=gegenprobe?execFileSync('git',['show','5de6969:app.js'],{cwd:path.join(__dirname,'../../..'),encoding:'utf8'}):null;
(async()=>{
 const b=await start();
 try{
  const store=vollerStore();store['users/u1/bereiche/b2']={name:'Zweiter Bereich',order:1,sets:{}};
  for(const[k,v]of Object.entries({...store}))store[k.replace('users/u1','users/u2')]=structuredClone(v);
  store['users/u2/bereiche/b1'].name='Bereich von B';
  const {p,ctx}=await neueSeite(b,GERAETE.handy,{store,vorher:async ctx=>{
   await ctx.route('**/app.js?*',async r=>{const source=alt||await(await r.fetch()).text();await r.fulfill({contentType:'text/javascript',body:source+'\nwindow.__PRUEF={bereit:()=>bereiche!==null,loeschen:()=>deleteBereich().then(()=>{window.__LOESCHFERTIG=true;})};'});});
  }});
  await p.waitForFunction(()=>window.__PRUEF?.bereit());
  await p.evaluate(()=>{void window.__PRUEF.loeschen();});await p.waitForSelector('#dlg-input');
  await p.evaluate(()=>{const s=window.__FB;s.user={uid:'u2',email:'b@example.com',emailVerified:true,getIdToken:()=>Promise.resolve('tok')};for(const cb of s.authListeners)cb(s.user);});
  await p.waitForFunction(()=>window.__PRUEF.bereit());
  await p.waitForFunction(()=>!document.querySelector('.boot'));
  if(gegenprobe)assert.equal(await p.locator('#dlg-input').count(),1,'Alter Dialog muss nach fertigem Konto-Laden wirklich bedienbar sein');
  if(await p.locator('#dlg-input').count()){
   await p.fill('#dlg-input','Medina Buch 1');
   await aktion(p,'dlg-ok',null,700);
   await p.waitForFunction(()=>window.__LOESCHFERTIG,null,{timeout:5000});
  }
  await p.waitForFunction(()=>window.__LOESCHFERTIG,null,{timeout:5000});
  const stand=await p.evaluate(()=>({bereich:window.__FB.store.has('users/u2/bereiche/b1'),karten:[...window.__FB.store.keys()].filter(k=>k.startsWith('users/u2/karten/')).length}));
  if(gegenprobe)assert.deepEqual(stand,{bereich:false,karten:0},'Altdialog muss Bereich/Karten von B loeschen');
  else assert.deepEqual(stand,{bereich:true,karten:40},'Dialog des alten Kontos loescht neues Konto');
  assert.deepEqual(p.fehler,[]);console.log(gegenprobe?'OK  Gegenprobe: alter Dialog loescht Bereich und 40 Karten von B.':'OK  Alter Dialog bleibt ohne Wirkung auf B.');
  await ctx.close();
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

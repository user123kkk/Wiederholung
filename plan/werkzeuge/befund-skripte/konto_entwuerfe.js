/* Echte App: private Entwuerfe/Blattzustand muessen zum Konto gehoeren.
   --befund belegt bestehenden Uebertrag, --gegenprobe fest vor Runde 14. */
const {start,vollerStore}=require('../pruefstand/lib');
const {APP,AUTH,FS}=require('../pruefstand/stubs');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const repo=path.join(__dirname,'../../..'),alt=process.argv.includes('--befund')||process.argv.includes('--gegenprobe');
const source=process.argv.includes('--gegenprobe')?execFileSync('git',['show','c4a2ccf:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
(async()=>{
 const browser=await start();try{for(const fall of ['neue-karte','bearbeitung','idee','auswahl']){
  const store=vollerStore();for(const[k,v]of Object.entries({...store}))if(k.startsWith('users/u1'))store[k.replace('users/u1','users/u2')]=structuredClone(v);
  const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'}),p=await ctx.newPage(),errors=[];
  p.on('pageerror',e=>errors.push(e.message));
  await p.addInitScript(s=>{window.__START_STORE=s;window.__START_USER={uid:'u1',email:'a@example.com',emailVerified:true};},store);
  await p.route('**/www.gstatic.com/**',r=>r.fulfill({contentType:'text/javascript',body:r.request().url().includes('auth')?AUTH:r.request().url().includes('firestore')?FS:APP}));
  await p.route('**/app.js?*',r=>r.fulfill({contentType:'text/javascript',body:source+`
   window.__PRUEF={bereit:()=>bereiche!==null&&!document.querySelector('.boot'),
    oeffnen:fall=>{
     if(fall==='idee'){ui.einstellungen=true;ui.seite='feedback';ui.feedbackForm=true;feedbackEntwurf={text:'Private Idee A',beschreibung:'Noch nicht eingereicht A'};}
     else if(fall==='auswahl'){ui.tab='verwalten';ui.selectMode=true;ui.selectedIds=new Set(['k0']);}
     else{ui.tab='verwalten';ui.karteSheet=true;ui.editId=fall==='bearbeitung'?'k0':null;formDraft={wort:'Private Karte A',ueb:'Privater Inhalt A',extra:'A'};}
     render();
    },ideeInB:()=>{ui.einstellungen=true;ui.seite='feedback';ui.feedbackForm=true;render();},
    speichern:()=>submitCardForm(),stand:()=>({edit:ui.editId,karte:ui.karteSheet,idee:ui.feedbackForm,auswahl:ui.selectMode,ids:[...ui.selectedIds],schreibFehler})};`}));
  await p.goto('http://127.0.0.1:'+(process.env.PRUEF_PORT||8099)+'/index.html');await p.waitForFunction(()=>window.__PRUEF?.bereit());
  await p.evaluate(f=>window.__PRUEF.oeffnen(f),fall);
  const feld=fall==='idee'?'#fb-text':'#f-wort';if(fall!=='auswahl')assert.equal(await p.locator(feld).inputValue(),fall==='idee'?'Private Idee A':'Private Karte A');
  await p.evaluate(()=>{const s=window.__FB;s.user={uid:'u2',email:'b@example.com',emailVerified:true,getIdToken:()=>Promise.resolve('tok'),reload:()=>Promise.resolve()};s.authListeners.forEach(cb=>cb(s.user));});
  await p.waitForFunction(()=>window.__PRUEF.bereit());
  // Auth schliesst die Einstellungen, loescht aber nicht automatisch den
  // Entwurf. Sichtbar wird der Ideen-Entwurf erst beim Oeffnen unter B.
  if(fall==='idee')await p.evaluate(()=>window.__PRUEF.ideeInB());
  if(fall==='auswahl'){
   const stand=await p.evaluate(()=>window.__PRUEF.stand());
   assert.equal(stand.auswahl,alt);assert.deepEqual(stand.ids,alt?['k0']:[]);
   assert.deepEqual(errors,[]);console.log(JSON.stringify({fall,stand,alt}));await ctx.close();continue;
  }
  const sichtbar=await p.locator(feld).count(),stand=await p.evaluate(()=>window.__PRUEF.stand());
  const privaterEntwurfInB=sichtbar===1&&(await p.locator(feld).inputValue()).startsWith('Private');
  if(alt){
   assert.equal(sichtbar,1,'Alter Konto-Entwurf muss sichtbar in B bleiben');
   assert.equal(await p.locator(feld).inputValue(),fall==='idee'?'Private Idee A':'Private Karte A');
   if(fall!=='idee'){
    assert.equal(stand.edit,null,'Bearbeiten wurde unbemerkt zur Neuanlage');
    await p.evaluate(()=>window.__PRUEF.speichern());
    await p.waitForFunction(()=>[...window.__FB.store.entries()].some(([k,v])=>k.startsWith('users/u2/karten/')&&v.wort==='Private Karte A'));
   }
  }else{if(fall==='idee'){assert.equal(sichtbar,1);assert.equal(await p.locator(feld).inputValue(),'','Keine private A-Idee im neuen B-Formular');}
   else{assert.equal(sichtbar,0,'Kein privater A-Entwurf im Folgekonto');assert.equal(stand.karte,false);}}
  assert.deepEqual(errors,[]);console.log(JSON.stringify({fall,privaterEntwurfInB,stand,alt}));await ctx.close();
 }}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

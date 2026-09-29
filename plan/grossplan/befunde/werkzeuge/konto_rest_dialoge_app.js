/* Verbliebene Bearbeitungsdialoge: nach bereits aufgeloester Antwort kommt
   Auth B vor der Microtask. Tatsachliche SDK-Bootstrap-Luecke beibehalten:
   kein kuenstlich synchron geladener B-Bestand, kein B-Datenverlust behauptet.
   --befund erwartet die alte TypeError-Fortsetzung; --gegenprobe fest .56. */
const {start,vollerStore}=require('../../../werkzeuge/pruefstand/lib');
const {APP,AUTH,FS}=require('../../../werkzeuge/pruefstand/stubs');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const repo=path.join(__dirname,'../../../..'),alt=process.argv.includes('--befund')||process.argv.includes('--gegenprobe');
const source=process.argv.includes('--gegenprobe')?require('node:child_process').execFileSync('git',['show','a4b5677:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
(async()=>{const b=await start();try{for(const fall of ['karte','duplikat','auswahl','bereich-neu','bereich-name','reihenfolge','set-neu','set-name','set-loeschen']){
 const store=vollerStore();for(const[k,v]of Object.entries({...store}))if(k.startsWith('users/u1'))store[k.replace('users/u1','users/u2')]=structuredClone(v);
 const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'}),p=await ctx.newPage(),errors=[];
 p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(s=>{window.__START_STORE=s;window.__START_USER={uid:'u1',email:'a@example.com',emailVerified:true};},store);
 await p.route('**/www.gstatic.com/**',r=>r.fulfill({contentType:'text/javascript',body:r.request().url().includes('auth')?AUTH:r.request().url().includes('firestore')?FS:APP}));
 await p.route('**/app.js?*',r=>r.fulfill({contentType:'text/javascript',body:source+`
  window.__PRUEF={bereit:uid=>currentUser?.uid===uid&&bereiche!==null&&!document.querySelector('.boot'),
   starten:fall=>{
    ui.tab='verwalten';ui.selectedIds=new Set(['k0']);
    if(fall==='duplikat'){ui.karteSheet=true;ui.editId=null;formDraft={wort:findCard('k0').wort,ueb:'Privater Text A',extra:''};}
    render();
    const f={karte:()=>deleteCard('k0'),duplikat:()=>submitCardForm(),auswahl:()=>deleteSelectedCards(),
     'bereich-neu':()=>addBereich(),'bereich-name':()=>renameBereich(),reihenfolge:()=>reverseOrder(),
     'set-neu':()=>saveSelectedToSet('__new__'),'set-name':()=>renameSet('s5'),'set-loeschen':()=>deleteSet('s5')}[fall];
    f().then(()=>window.__JOB_END=true).catch(e=>{window.__JOB_ERROR={name:e.name,text:e.message};window.__JOB_END=true;});
   },bestaetigenUndWechsel:()=>{
    const d=ui.dialog;if(d.kind==='prompt')d.value='Neuer Name A';d.resolve(dialogResult(d,true));
    const s=window.__FB;s.user={uid:'u2',email:'b@example.com',emailVerified:true,getIdToken:()=>Promise.resolve('tok'),reload:()=>Promise.resolve()};s.authListeners.forEach(cb=>cb(s.user));
   }};` }));
 await p.goto('http://127.0.0.1:8099/index.html');await p.waitForFunction(()=>window.__PRUEF?.bereit('u1'));
 const datenB=()=>p.evaluate(()=>[...window.__FB.store.entries()].filter(([k])=>k.startsWith('users/u2/karten/')||k.startsWith('users/u2/bereiche/')));
 const vorher=await datenB();await p.evaluate(f=>window.__PRUEF.starten(f),fall);await p.waitForSelector('.dlg');
 await p.evaluate(()=>window.__PRUEF.bestaetigenUndWechsel());await p.waitForFunction(()=>window.__JOB_END===true);
 await p.waitForFunction(()=>window.__PRUEF.bereit('u2'));
 const fehler=await p.evaluate(()=>window.__JOB_ERROR||null);
 if(alt)assert.equal(fehler?.name,'TypeError');else assert.equal(fehler,null);
 assert.deepEqual(await datenB(),vorher,'Keine B-Datenmutation behaupten');assert.deepEqual(errors,[]);
 console.log(JSON.stringify({fall,fehler,bDatenErhalten:true,alt}));await ctx.close();
}}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

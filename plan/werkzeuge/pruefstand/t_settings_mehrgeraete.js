/* A12/A6: echte SDK-Schreibvorgaenge, zwei getrennte Offline-Caches,
   ausschliesslich demo-adrabic-pruefung auf 127.0.0.1:8081.
   Feste Gegenprobe c4b1c30. Emulator mit Repo-Regeln vorher starten. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {execFileSync}=require('node:child_process');
const {start,vollerStore}=require('./lib');
const {AUTH}=require('./stubs');
const alt=process.argv.includes('--gegenprobe');
const PROJECT='demo-adrabic-pruefung';
const ROOT=`http://127.0.0.1:8081/v1/projects/${PROJECT}/databases/(default)/documents`;
const SDK='https://www.gstatic.com/firebasejs/10.14.1/';
const repo=path.join(__dirname,'../../..');
const quelle=alt?execFileSync('git',['show','c4b1c30:app.js'],{cwd:repo,encoding:'utf8',maxBuffer:1<<25}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
function wert(v){
  if(v===null)return{nullValue:null};
  if(typeof v==='string')return{stringValue:v};
  if(typeof v==='boolean')return{booleanValue:v};
  if(typeof v==='number')return{integerValue:String(v)};
  if(Array.isArray(v))return{arrayValue:{values:v.map(wert)}};
  return{mapValue:{fields:Object.fromEntries(Object.entries(v).map(([k,x])=>[k,wert(x)]))}};
}
function lesen(v){
  if('mapValue'in v)return Object.fromEntries(Object.entries(v.mapValue.fields||{}).map(([k,x])=>[k,lesen(x)]));
  if('arrayValue'in v)return(v.arrayValue.values||[]).map(lesen);
  if('integerValue'in v)return Number(v.integerValue);
  if('nullValue'in v)return null;
  return v.stringValue??v.booleanValue??v.timestampValue;
}
async function rest(url,opt={}){const r=await fetch(url,{...opt,headers:{Authorization:'Bearer owner','Content-Type':'application/json'}});assert.ok(r.ok,`${r.status}: ${await r.clone().text()}`);return r;}
async function cloud(){return lesen({mapValue:{fields:(await(await rest(ROOT+'/users/u1')).json()).fields}});}
async function seed(){
  await rest(`http://127.0.0.1:8081/emulator/v1/projects/${PROJECT}/databases/(default)/documents`,{method:'DELETE'});
  const store=vollerStore();store['users/u1'].settings={thema:'dunkel',sitzungsLimit:'alle',arabGroesse:'normal',lastBackup:'2026-09-01'};
  store['feedback/a6-offen']={text:'Neutrale Testidee',erstelltAm:'2026-09-01',votes:2,status:'offen'};
  store['feedback/a6-entfernt']={text:'',erstelltAm:'2026-09-01',votes:2,status:'entfernt'};
  for(const id of ['a6-offen','a6-entfernt'])for(const uid of ['u1','u2'])store[`feedback/${id}/votes/${uid}`]={};
  const writes=Object.entries(store).map(([p,v])=>({update:{name:`projects/${PROJECT}/databases/(default)/documents/${p}`,fields:wert(v).mapValue.fields}}));
  await rest(ROOT+':commit',{method:'POST',body:JSON.stringify({writes})});
}
async function seite(b,sources){
  const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'}),p=await ctx.newPage();
  p.fehler=[];p.on('pageerror',e=>p.fehler.push(e.message));
  await p.addInitScript(()=>{window.__START_USER={uid:'u1',email:'test@example.com',emailVerified:true,displayName:'Test'};});
  await p.route('**/www.gstatic.com/firebasejs/10.14.1/*',r=>{
    const u=new URL(r.request().url()),name=u.pathname.split('/').pop();
    if(name==='firebase-auth.js')return r.fulfill({contentType:'text/javascript',body:AUTH});
    if(u.searchParams.has('original'))return r.fulfill({contentType:'text/javascript',body:sources[name]});
    const original=SDK+name+'?original=1';
    let body=`export * from ${JSON.stringify(original)}; import * as core from ${JSON.stringify(original)};`;
    if(name==='firebase-app.js')body+=`export function initializeApp(c){return core.initializeApp({...c,projectId:${JSON.stringify(PROJECT)}});}`;
    if(name==='firebase-firestore.js')body+=`export function initializeFirestore(a,o){const db=core.initializeFirestore(a,o);core.connectFirestoreEmulator(db,'127.0.0.1',8081,{mockUserToken:{sub:'u1',email:'test@example.com',email_verified:true}});window.__SDK=core;window.__DB=db;return db;}`;
    return r.fulfill({contentType:'text/javascript',body});
  });
  await p.route('**/app.js?*',r=>r.fulfill({contentType:'text/javascript',body:quelle+`
    window.__PRUEF={bereit:()=>cloudDocExists&&bereiche!==null,theme:setThema,limit:setSitzungsLimit,grosse:setArabGroesse,
      backup:()=>exportBackup(false),settings:()=>({...settings}),fehler:()=>schreibFehler,loeschen:kontoDatenLoeschen};`}));
  await p.goto('http://127.0.0.1:'+(process.env.PRUEF_PORT||8099)+'/index.html');
  await p.waitForFunction(()=>window.__PRUEF?.bereit(),null,{timeout:15000});
  await p.waitForFunction(()=>!document.querySelector('.boot'));
  return p;
}
async function fertig(p){await p.evaluate(()=>Promise.race([window.__SDK.waitForPendingWrites(window.__DB),new Promise((_,nein)=>setTimeout(()=>nein(new Error('Schreibvorgaenge nach 30s offen')),30000))]));}
(async()=>{
  const sources={};for(const name of ['firebase-app.js','firebase-firestore.js']){const r=await fetch(SDK+name);assert.ok(r.ok);sources[name]=await r.text();}
  await seed();const b=await start();
  try{
    const a=await seite(b,sources),c=await seite(b,sources);
    await c.evaluate(()=>window.__SDK.disableNetwork(window.__DB));
    await c.evaluate(()=>window.__PRUEF.limit(20));
    await a.evaluate(()=>{window.__PRUEF.theme('hell');window.__PRUEF.backup();});await fertig(a);
    const backup=(await cloud()).settings.lastBackup;
    await c.evaluate(()=>window.__SDK.enableNetwork(window.__DB));await fertig(c);
    const s=(await cloud()).settings;
    assert.equal(s.thema,alt?'dunkel':'hell');assert.equal(s.sitzungsLimit,20);
    assert.equal(s.lastBackup,alt?'2026-09-01':backup);
    console.log('OK '+(alt?'Gegenprobe: Offline-Geraet ueberschreibt Thema und Backupdatum':'Zwei Geraete behalten Thema, Rundengroesse und aktuelles Backupdatum'));
    if(alt)return;
    await a.waitForFunction(()=>window.__PRUEF.settings().sitzungsLimit===20);
    await rest(ROOT+'/users/u1?updateMask.fieldPaths=settings.alt',{method:'PATCH',body:JSON.stringify({fields:{settings:wert({alt:'historisches Feld'})}})});
    await a.evaluate(()=>window.__PRUEF.grosse('gross'));await fertig(a);
    // waitForPendingWrites umfasst noch nicht die erst nach der Ablehnung
    // gestartete Reparatur-Transaktion. Deren bestaetigten Serverstand lesen.
    let nach;
    for(let i=0;i<150;i++){
      nach=(await cloud()).settings;
      if(nach.arabGroesse==='gross'&&!('alt'in nach))break;
      await a.waitForTimeout(100);
    }
    assert.equal(await a.evaluate(()=>window.__PRUEF.fehler()),null);
    assert.equal(nach.arabGroesse,'gross');assert.equal(nach.thema,'hell');assert.equal(nach.sitzungsLimit,20);assert.equal(nach.lastBackup,backup);assert.ok(!('alt'in nach));
    console.log('OK Altfeld: einmalige bereinigte Map bewahrt aktuelle Werte des anderen Geraets.');
    await c.context().close();
    await a.evaluate(()=>window.__PRUEF.loeschen());
    for(const id of ['a6-offen','a6-entfernt']){
      const d=await(await rest(ROOT+'/feedback/'+id)).json();assert.equal(Number(d.fields.votes.integerValue),1);
      assert.equal((await fetch(ROOT+`/feedback/${id}/votes/u1`,{headers:{Authorization:'Bearer owner'}})).status,404);
      assert.equal((await fetch(ROOT+`/feedback/${id}/votes/u2`,{headers:{Authorization:'Bearer owner'}})).status,200);
    }
    assert.deepEqual(a.fehler,[]);
    console.log('OK echte Kontodaten-Loeschung: offene und entfernte Idee -1, eigene Merker weg, fremde bleiben.');
  }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

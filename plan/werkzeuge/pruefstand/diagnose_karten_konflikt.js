/* Diagnose: gleiche Karte / Offline / altes Undo. KEINE Schutzabnahme.
   Eigener Demo-Emulator 8082 mit Repo-Regeln; Auth-Attrappe, echter Firestore-SDK. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {start,vollerStore,aktion} = require('./lib');
const {AUTH} = require('./stubs');
const PROJECT='demo-adrabic-karten-audit';
const ROOT=`http://127.0.0.1:8082/v1/projects/${PROJECT}/databases/(default)/documents`;
const SDK='https://www.gstatic.com/firebasejs/10.14.1/';
const SOURCE_COMMIT=process.argv.includes('--gegenprobe')?'7142b93':null;
const APP_SOURCE=SOURCE_COMMIT?require('node:child_process').execFileSync('git',['show',SOURCE_COMMIT+':app.js'],{encoding:'utf8',cwd:path.join(__dirname,'../../..')}):fs.readFileSync(path.join(__dirname,'../../../app.js'),'utf8');
function wert(v){
  if(v===null)return{nullValue:null};
  if(typeof v==='string')return{stringValue:v};
  if(typeof v==='boolean')return{booleanValue:v};
  if(typeof v==='number')return{integerValue:String(v)};
  if(Array.isArray(v))return{arrayValue:{values:v.map(wert)}};
  return{mapValue:{fields:Object.fromEntries(Object.entries(v).map(([k,x])=>[k,wert(x)]))}};
}
async function rest(url,opt={}){
  const r=await fetch(url,{...opt,headers:{Authorization:'Bearer owner','Content-Type':'application/json',...opt.headers}});
  assert.ok(r.ok,`${r.status}: ${await r.clone().text()}`);return r;
}
async function seed(){
  await rest(`http://127.0.0.1:8082/emulator/v1/projects/${PROJECT}/databases/(default)/documents`,{method:'DELETE'});
  const store=vollerStore();store['users/u1'].streak={sockel:0,sockelBis:'2000-01-01',beste:0};store['users/u1'].verlauf={};
  const writes=Object.entries(store).map(([p,v])=>({update:{name:`projects/${PROJECT}/databases/(default)/documents/${p}`,fields:wert(v).mapValue.fields}}));
  await rest(ROOT+':commit',{method:'POST',body:JSON.stringify({writes})});
}
async function seite(b,sources,ctx){
  // Der Service Worker ist Gegenstand eigener Tests. Er wuerde beim Neustart
  // die unveraenderte App statt unserer SDK-Emulator-Umleitung liefern.
  ctx=ctx||await b.newContext({viewport:{width:414,height:896},isMobile:true,hasTouch:true,serviceWorkers:'block'});
  const p=await ctx.newPage();p.fehler=[];p.on('pageerror',e=>p.fehler.push(e.message));
  await p.addInitScript(()=>{window.__START_USER={uid:'u1',email:'test@example.com',emailVerified:true,displayName:'Test'};});
  await p.route('**/www.gstatic.com/firebasejs/10.14.1/*',r=>{
    const u=new URL(r.request().url()),name=u.pathname.split('/').pop();
    if(name==='firebase-auth.js')return r.fulfill({contentType:'text/javascript',body:AUTH});
    if(u.searchParams.has('original'))return r.fulfill({contentType:'text/javascript',body:sources[name]});
    const original=SDK+name+'?original=1';
    let body=`export * from ${JSON.stringify(original)}; import * as core from ${JSON.stringify(original)};`;
    if(name==='firebase-app.js')body+=`export function initializeApp(c){return core.initializeApp({...c,projectId:${JSON.stringify(PROJECT)}});}`;
    if(name==='firebase-firestore.js')body+=`export function initializeFirestore(a,o){const db=core.initializeFirestore(a,o);core.connectFirestoreEmulator(db,'127.0.0.1',8082,{mockUserToken:{sub:'u1',email:'test@example.com',email_verified:true}});window.__PRUEF_DB=db;window.__PRUEF_SDK=core;return db;}
      export function updateDoc(ref,...args){if(window.__PRUEF_ABLEHNEN&&ref.path==='users/u1'&&args[0] instanceof core.FieldPath)args.push(new core.FieldPath('__pruef_verboten'),true);if(window.__PRUEF_RESET_ABLEHNEN&&ref.path==='users/u1'&&args[0]?.verlauf)args[0]={...args[0],__pruef_verboten:true};return core.updateDoc(ref,...args);}`;
    return r.fulfill({contentType:'text/javascript',body});
  });
  await p.route('**/app.js?*',r=>r.fulfill({contentType:'text/javascript',body:APP_SOURCE+`
    window.__PRUEF={bereit:()=>cloudDocExists&&bereiche!==null,heute:todayStr,
      starten:()=>{startSession();ui.session.queue=["k4","k5"];ui.session.revealed=true;},
      bewerten:kind=>{ui.session.revealed=true;gradeCard(kind);},
      karte:()=>JSON.parse(JSON.stringify(findCard("k4"))),
      zaehle:verlaufZaehle,flush:()=>{verlaufJetztSchreiben();persistVerlauf();},
      nachholen:abgelehntesNachholen,verlauf:()=>JSON.parse(JSON.stringify(verlauf)),
      offen:()=>JSON.parse(JSON.stringify(typeof verlaufOffen==='undefined'?{}:verlaufOffen)),
      fehler:()=>schreibFehler,gesehen:lernAbhaken,gesehenZurueck:lernRueckgaengig,
      undo:undoLastGrade,reset:verlaufZuruecksetzen,zeichnen:()=>startDrillWithCards(currentBereich().karten,'Pruefung',true)};`}));
  await p.route('**/verses.quran.foundation/**',r=>r.abort());
  await p.goto('http://127.0.0.1:'+(process.env.PRUEF_PORT||8099)+'/index.html');
  await p.waitForFunction(()=>window.__PRUEF?.bereit(),null,{timeout:15000});
  await p.waitForFunction(()=>!document.querySelector('.boot'));
  return p;
}
async function zaehle(p,n,art='w'){
  await p.evaluate(([n,art])=>{for(let i=0;i<n;i++)window.__PRUEF.zaehle(art);window.__PRUEF.flush();},[n,art]);
}
async function fertig(p){
  await p.evaluate(()=>Promise.race([window.__PRUEF_SDK.waitForPendingWrites(window.__PRUEF_DB),new Promise((_,nein)=>setTimeout(()=>nein(new Error('SDK-Schreibvorgaenge nach 30s noch offen')),30000))]));
}
async function cloud(tag){
  const d=await(await rest(ROOT+'/users/u1')).json();
  const e=d.fields.verlauf?.mapValue.fields?.[tag]?.mapValue.fields||{};
  return Object.fromEntries(['w','n','u'].map(k=>[k,Number(e[k]?.integerValue||0)]));
}
(async()=>{
  const sources={};for(const name of ['firebase-app.js','firebase-firestore.js']){
    const r=await fetch(SDK+name);assert.ok(r.ok);sources[name]=await r.text();
  }
  console.log('Quelle '+(SOURCE_COMMIT||'Arbeitsbaum')+', app.js SHA256 '+require('node:crypto').createHash('sha256').update(APP_SOURCE.replace(/\r\n/g,'\n')).digest('hex'));
  console.log('firestore.rules SHA256 '+require('node:crypto').createHash('sha256').update(fs.readFileSync(path.join(__dirname,'../../../firestore.rules'),'utf8').replace(/\r\n/g,'\n')).digest('hex'));
  await seed();const b=await start();
  const fields=k=>Object.fromEntries(['stufe','nextReview','ersteBewertung','rueckfaelle','maxStufe'].map(x=>[x,k[x]]));
  async function server(){
    const d=await(await rest(ROOT+'/users/u1/karten/k4')).json();
    return Object.fromEntries(Object.entries(d.fields).map(([k,v])=>[k,v.stringValue??(v.integerValue!==undefined?Number(v.integerValue):null)]));
  }
  try{
    const a=await seite(b,sources),c=await seite(b,sources);
    await a.evaluate(()=>window.__PRUEF.starten());
    await a.evaluate(()=>window.__PRUEF.bewerten('known'));await fertig(a);
    const first=fields(await server());
    // Kontrollfall: eine andere Karte bleibt beim Bewerten unveraendert.
    const other=await(await rest(ROOT+'/users/u1/karten/k6')).json();
    const expectedOther=vollerStore()['users/u1/karten/k6'];
    assert.deepEqual(other.fields,wert(expectedOther).mapValue.fields);
    console.log('KONTROLLE andere Karte k6 bleibt vollstaendig unveraendert.');
    await c.waitForFunction(s=>window.__PRUEF.karte().stufe===s,first.stufe);
    await c.evaluate(()=>window.__PRUEF.starten());
    await c.evaluate(()=>window.__PRUEF.bewerten('unknown'));await fertig(c);
    const newer=fields(await server());assert.notDeepEqual(first,newer);
    await a.waitForFunction(s=>window.__PRUEF.karte().stufe===s,newer.stufe);
    await a.evaluate(()=>window.__PRUEF.undo());await fertig(a);
    const undo=fields(await server());
    assert.equal(undo.stufe,1,'Diagnose erwartet Wiederherstellung des alten Standes 1');
    assert.notDeepEqual(undo,newer,'Diagnose: neuer fremder Stand wurde wirklich ersetzt');
    console.log('BEFUND altes Undo ersetzt neuere fremde Bewertung: '+JSON.stringify({first,newer,undo}));

    await a.evaluate(()=>window.__PRUEF_SDK.disableNetwork(window.__PRUEF_DB));
    await a.evaluate(()=>window.__PRUEF.bewerten('known'));
    const offline=fields(await a.evaluate(()=>window.__PRUEF.karte()));
    await c.waitForFunction(s=>window.__PRUEF.karte().stufe===s,undo.stufe);
    await c.evaluate(()=>window.__PRUEF.starten());
    await c.evaluate(()=>window.__PRUEF.bewerten('unknown'));await fertig(c);
    const online=fields(await server());assert.notDeepEqual(offline,online);
    await a.evaluate(()=>window.__PRUEF_SDK.enableNetwork(window.__PRUEF_DB));await fertig(a);
    const after=fields(await server());assert.deepEqual(after,offline);
    assert.notDeepEqual(after,online);
    console.log('BEFUND alte Offline-Bewertung ersetzt neuere Online-Bewertung: '+JSON.stringify({offline,online,after}));
    assert.deepEqual(a.fehler,[]);assert.deepEqual(c.fehler,[]);
    assert.equal(await a.evaluate(()=>window.__PRUEF.fehler()),null);
    assert.equal(await c.evaluate(()=>window.__PRUEF.fehler()),null);
    console.log('BEFUND beide Konflikte ohne Speicherfehlermeldung.');
    if(process.argv.includes('--schutz')) {
      const lost=[];
      if(JSON.stringify(undo)!==JSON.stringify(newer))lost.push('Altes Undo ersetzt fremde Bewertung');
      if(JSON.stringify(after)!==JSON.stringify(online))lost.push('Offline-Nachholen ersetzt neuere Online-Bewertung');
      assert.deepEqual(lost,[],'Schutzpruefung rot: '+lost.join('; '));
    }
    console.log('Diagnose reproduziert beide Konflikte. Kein gruener Schutztest.');
  }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

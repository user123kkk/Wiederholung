/* G-075: echte App + Firebase-SDK 10.14.1 gegen lokalen Firestore-Emulator.
   Keine Produktivdaten: nur demo-adrabic-pruefung, 127.0.0.1:8081.
   Emulator mit Repo-Regeln starten; CHROMIUM setzen; dann dieses Skript.
   Zwei getrennte Browser-Kontexte sind zwei Geraete mit eigenen Offline-Caches. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {start,vollerStore,aktion} = require('./lib');
const {AUTH} = require('./stubs');
const PROJECT='demo-adrabic-pruefung';
const ROOT=`http://127.0.0.1:8081/v1/projects/${PROJECT}/databases/(default)/documents`;
const SDK='https://www.gstatic.com/firebasejs/10.14.1/';
const APP_SOURCE=fs.readFileSync(path.join(__dirname,'../../../app.js'),'utf8');
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
  await rest(`http://127.0.0.1:8081/emulator/v1/projects/${PROJECT}/databases/(default)/documents`,{method:'DELETE'});
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
    if(name==='firebase-firestore.js')body+=`export function initializeFirestore(a,o){const db=core.initializeFirestore(a,o);core.connectFirestoreEmulator(db,'127.0.0.1',8081,{mockUserToken:{sub:'u1',email:'test@example.com',email_verified:true}});window.__PRUEF_DB=db;window.__PRUEF_SDK=core;return db;}
      export function updateDoc(ref,...args){if(window.__PRUEF_ABLEHNEN&&ref.path==='users/u1'&&args[0] instanceof core.FieldPath)args.push(new core.FieldPath('__pruef_verboten'),true);if(window.__PRUEF_RESET_ABLEHNEN&&ref.path==='users/u1'&&args[0]?.verlauf)args[0]={...args[0],__pruef_verboten:true};return core.updateDoc(ref,...args);}`;
    return r.fulfill({contentType:'text/javascript',body});
  });
  await p.route('**/app.js?*',r=>r.fulfill({contentType:'text/javascript',body:APP_SOURCE+`
    window.__PRUEF={bereit:()=>cloudDocExists&&bereiche!==null,heute:todayStr,
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
  await seed();const b=await start();
  try{
    let a=await seite(b,sources);const c=await seite(b,sources);
    const heute=await a.evaluate(()=>window.__PRUEF.heute());
    await a.evaluate(()=>window.__PRUEF_SDK.disableNetwork(window.__PRUEF_DB));
    await zaehle(a,5);await zaehle(c,3);await fertig(c);
    await a.waitForFunction(t=>window.__PRUEF.verlauf()[t]?.w===5,heute);
    assert.deepEqual(await cloud(heute),{w:3,n:0,u:0},'Offline-Geraet darf noch nichts auf dem Server schreiben');
    await a.evaluate(()=>window.__PRUEF_SDK.enableNetwork(window.__PRUEF_DB));await fertig(a);await fertig(c);
    assert.deepEqual(await cloud(heute),{w:8,n:0,u:0},'5 offline + 3 online muessen 8 ergeben');
    await a.waitForFunction(t=>window.__PRUEF.verlauf()[t]?.w===8,heute);
    await c.waitForFunction(t=>window.__PRUEF.verlauf()[t]?.w===8,heute);
    console.log('OK  Zwei Geraete: 5 offline + 3 online = 8, beide Anzeigen gleich.');
    await Promise.all([zaehle(a,4,'n'),zaehle(c,2,'u')]);await fertig(a);await fertig(c);
    assert.deepEqual(await cloud(heute),{w:8,n:4,u:2},'Antwortarten duerfen einander nicht ueberschreiben');
    console.log('OK  w/n/u werden getrennt und atomar addiert.');

    // Offline beenden, gleicher Geraete-Cache nach Neustart. Noch einmal
    // flush/nachholen darf einen bereits im SDK liegenden Increment nicht duplizieren.
    const ctx=a.context();await a.evaluate(()=>window.__PRUEF_SDK.disableNetwork(window.__PRUEF_DB));
    await zaehle(a,2);await a.waitForFunction(t=>window.__PRUEF.verlauf()[t]?.w===10,heute);
    await a.close();a=await seite(b,sources,ctx);await fertig(a);
    assert.deepEqual(await cloud(heute),{w:10,n:4,u:2},'Offline-Neustart verliert oder verdoppelt Antworten');
    await a.evaluate(()=>{window.__PRUEF.flush();window.__PRUEF.nachholen();});await fertig(a);
    assert.deepEqual(await cloud(heute),{w:10,n:4,u:2},'Bereits uebertragene Differenzen erneut gesendet');
    console.log('OK  Offline-Neustart und wiederholtes Nachholen: keine verlorenen/doppelten Antworten.');

    // Wirkliche Kartenbewertung mit gleichzeitigem Beitrag des anderen Geraets.
    const vorher=await cloud(heute);
    await aktion(a,'start-session',null,800);await aktion(a,'reveal',null,600);
    await aktion(a,'grade-known',null,300);await zaehle(c,2);await fertig(a);await fertig(c);
    await aktion(a,'undo-grade',null,300);await fertig(a);
    assert.deepEqual(await cloud(heute),{...vorher,w:vorher.w+2},'Rueckgaengig darf den Beitrag des anderen Geraets nicht loeschen');
    console.log('OK  Echte Bewertung/Rueckgaengig bewahrt fremde Antworten.');

    if(process.argv.includes('--reset-undo')){
      await a.waitForTimeout(700);
      const vorReset=await cloud(heute);
      await aktion(a,'grade-known',null,700);await a.evaluate(()=>window.__PRUEF.flush());await fertig(a);
      assert.equal((await cloud(heute)).w,vorReset.w+1,'Bewertung vor Reset wurde wirklich geschrieben');
      await a.evaluate(()=>window.__PRUEF_SDK.disableNetwork(window.__PRUEF_DB));
      await c.evaluate(()=>{void window.__PRUEF.reset();});await c.waitForSelector('[data-action="dlg-ok"]');
      await aktion(c,'dlg-ok',null,300);await fertig(c);
      console.log('Offline vor Undo: '+JSON.stringify(await a.evaluate(()=>window.__PRUEF.verlauf())));
      await a.evaluate(()=>{window.__PRUEF.undo();window.__PRUEF.flush();});
      console.log('Offline nach Undo: '+JSON.stringify(await a.evaluate(()=>window.__PRUEF.verlauf())));
      await a.evaluate(()=>window.__PRUEF_SDK.enableNetwork(window.__PRUEF_DB));await fertig(a);
      console.log('Reset/Offline-Undo, Server: '+JSON.stringify(await cloud(heute)));
      assert.deepEqual(await cloud(heute),{w:0,n:0,u:0},'Offline-Undo nach fremdem Reset erzeugt negative Zaehler');
      await zaehle(c,1);await fertig(c);
      assert.deepEqual(await cloud(heute),{w:1,n:0,u:0},'Negative Alt-Differenz verschluckt eine neue Antwort');
      console.log('OK  Fremder Reset/Offline-Undo: keine negativen Werte, neue Antwort zaehlt.');

      await a.waitForTimeout(700);
      await aktion(a,'grade-known',null,700);await a.evaluate(()=>window.__PRUEF.flush());await fertig(a);
      assert.equal((await cloud(heute)).w,2,'Zweite echte Bewertung vor Reset bestaetigt');
      await c.evaluate(()=>{void window.__PRUEF.reset();});
      await c.waitForSelector('[data-action="dlg-ok"]');await aktion(c,'dlg-ok',null,300);await fertig(c);
      await zaehle(c,3);await fertig(c);
      await a.waitForFunction(t=>window.__PRUEF.verlauf()[t]?.w===3,heute);
      await a.evaluate(()=>{window.__PRUEF.undo();window.__PRUEF.flush();});await fertig(a);
      assert.deepEqual(await cloud(heute),{w:3,n:0,u:0},'Alte Undo-Aktion zieht eine Antwort des neuen Verlaufs ab');
      console.log('OK  Altes Undo nach empfangenem Reset laesst neue Antworten unveraendert.');

      const cache=a.context();
      await a.evaluate(()=>window.__PRUEF_SDK.disableNetwork(window.__PRUEF_DB));
      await zaehle(a,2);await a.close();
      await c.evaluate(()=>{void window.__PRUEF.reset();});
      await c.waitForSelector('[data-action="dlg-ok"]');await aktion(c,'dlg-ok',null,300);await fertig(c);
      a=await seite(b,sources,cache);await fertig(a);
      assert.deepEqual(await cloud(heute),{w:0,n:0,u:0},'Alte persistente Offline-Antworten beleben geloeschten Verlauf wieder');
      await zaehle(a,1);await fertig(a);
      assert.deepEqual(await cloud(heute),{w:1,n:0,u:0},'Neustart nach Reset kann nicht wieder zaehlen');
      console.log('OK  Alter SDK-Offline-Cache nach Reset verworfen; neue Antwort nach Neustart zaehlt.');
      await a.context().close();await c.context().close();return;
    }

    // Rueckgaengig auf der anderen Seite des Lerntags (04:00). Date wird
    // nur im Testfenster verschoben, die erwarteten Cloud-Schluessel bleiben fest.
    await aktion(a,'grade-known',null,300);await fertig(a);
    await a.evaluate(()=>{const Echt=Date;window.__ECHT_DATE=Echt;window.Date=class extends Echt{constructor(...x){super(...(x.length?x:[Echt.now()+86400000]));}static now(){return Echt.now()+86400000;}};window.__PRUEF.undo();window.Date=Echt;});
    await fertig(a);assert.deepEqual(await cloud(heute),{...vorher,w:vorher.w+2},'Rueckgaengig nach Tageswechsel muss den Ursprungstag korrigieren');
    await aktion(a,'end-session',null,300);
    await a.evaluate(()=>window.__PRUEF.gesehen('k0'));await fertig(a);
    await a.evaluate(()=>{const Echt=Date;window.Date=class extends Echt{constructor(...x){super(...(x.length?x:[Echt.now()+86400000]));}static now(){return Echt.now()+86400000;}};window.__PRUEF.gesehenZurueck();window.Date=Echt;});
    await fertig(a);assert.deepEqual(await cloud(heute),{...vorher,w:vorher.w+2},'Gesehen/Rueckgaengig nach Tageswechsel muss den Ursprungstag korrigieren');
    console.log('OK  Beide Rueckgaengig-Wege korrigieren auch nach Tageswechsel den alten Tag.');

    // Tatsachliche Ablehnung durch die Repo-Regeln, inklusive lokalem SDK-
    // Rollback. Das Testfeld ist nicht erlaubt. Automatische Ausweis-Erneuerung
    // anhalten, damit der ausstehende Zustand vor dem erneuten Senden messbar ist.
    const vorAblehnung=await cloud(heute);
    await a.evaluate(()=>{window.__PRUEF_ABLEHNEN=true;window.__FB.user.getIdToken=()=>new Promise(()=>{});});
    await zaehle(a,2);
    await a.waitForFunction(t=>window.__PRUEF.fehler()==='permission-denied'&&window.__PRUEF.offen()[t]?.w===2,heute);
    assert.deepEqual(await cloud(heute),vorAblehnung,'Abgelehnte Differenz wurde trotzdem gespeichert');
    assert.equal(await a.evaluate(t=>window.__PRUEF.verlauf()[t].w,heute),vorAblehnung.w+2,'SDK-Rollback verliert lokale abgelehnte Antworten');
    await a.evaluate(()=>{window.__PRUEF_ABLEHNEN=false;window.__PRUEF.nachholen();});await fertig(a);
    await a.waitForFunction(t=>window.__PRUEF.verlauf()[t]?.w===14,heute);
    assert.deepEqual(await cloud(heute),{...vorAblehnung,w:vorAblehnung.w+2},'Abgelehnte Differenz muss genau einmal nachgeschickt werden');
    await a.evaluate(()=>window.__PRUEF.nachholen());await fertig(a);
    assert.deepEqual(await cloud(heute),{...vorAblehnung,w:vorAblehnung.w+2},'Nachholen dupliziert bestaetigte Differenz');
    console.log('OK  Regeln-Ablehnung/SDK-Rollback/erneutes Senden: jede Antwort genau einmal.');
    await a.evaluate(()=>window.__PRUEF.zeichnen());
    await a.waitForSelector('#hw-canvas');
    await a.evaluate(()=>{window.__PRUEF_CANVAS=document.getElementById('hw-canvas');window.__PRUEF_KARTE=document.querySelector('.study-flaeche');});
    await zaehle(a,1,'u');await fertig(a);
    assert.equal(await a.evaluate(()=>window.__PRUEF_CANVAS===document.getElementById('hw-canvas')),true,'Tageszaehler-Snapshot ersetzt die laufende Zeichenflaeche');
    assert.equal(await a.evaluate(()=>window.__PRUEF_KARTE===document.querySelector('.study-flaeche')),true,'Tageszaehler-Snapshot ersetzt die laufende Karte');
    console.log('OK  Zaehler-Snapshots erhalten Karte und Zeichenflaeche in der laufenden Runde.');
    await aktion(a,'end-session',null,300);
    const vorReset=await cloud(heute);
    assert.equal(await a.evaluate(()=>window.__PRUEF.fehler()),null,'Vor Reset muss der alte Speicherfehler geloescht sein');
    await a.evaluate(()=>{window.__PRUEF_RESET_ABLEHNEN=true;window.__PRUEF.reset();});
    await a.waitForSelector('[data-action="dlg-ok"]');await aktion(a,'dlg-ok',null,300);await fertig(a);
    assert.deepEqual(await cloud(heute),vorReset,'Abgelehntes Zuruecksetzen darf keine Daten loeschen');
    assert.equal(await a.evaluate(()=>window.__PRUEF.fehler()),'permission-denied','Abgelehntes Zuruecksetzen bleibt ohne Fehlermeldung');
    assert.equal(await a.locator('#dlg-title').textContent(),'Nicht gespeichert','Reset-Ablehnung braucht sichtbare Rueckmeldung');
    await aktion(a,'dlg-ok',null,300);
    await a.evaluate(()=>{window.__PRUEF_RESET_ABLEHNEN=false;window.__PRUEF.reset();});
    await a.waitForSelector('[data-action="dlg-ok"]');await aktion(a,'dlg-ok',null,300);await fertig(a);
    assert.deepEqual(await cloud(heute),{w:0,n:0,u:0},'Bestaetigtes Zuruecksetzen muss wirklich leeren');
    await c.waitForFunction(()=>Object.keys(window.__PRUEF.verlauf()).length===0);
    await a.evaluate(()=>{window.__PRUEF.flush();window.__PRUEF.nachholen();});await fertig(a);
    assert.deepEqual(await cloud(heute),{w:0,n:0,u:0},'Nachholen darf geloeschtes Protokoll nicht wiederherstellen');
    await Promise.all([zaehle(a,1,'n'),zaehle(c,2,'w')]);await fertig(a);await fertig(c);
    assert.deepEqual(await cloud(heute),{w:2,n:1,u:0},'Nach Zuruecksetzen duerfen nur neue Antworten zaehlen');
    console.log('OK  Reset: Ablehnung sichtbar, beide Geraete leer, anschliessend nur neue Antworten.');
    assert.deepEqual(a.fehler,[],'JavaScript-Fehler auf Geraet A');assert.deepEqual(c.fehler,[],'JavaScript-Fehler auf Geraet B');
    await a.context().close();await c.context().close();
  }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

/* Dateilesen bewusst erst nach Kontowechsel freigeben; lokaler App-Code.
   --befund belegt den offenen Fehler, ohne Schalter spaetere Abnahme. */
const {start,vollerStore}=require('../../../werkzeuge/pruefstand/lib');
const {APP,AUTH,FS}=require('../../../werkzeuge/pruefstand/stubs');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const gegenprobe=process.argv.includes('--gegenprobe');
const source=gegenprobe?require('node:child_process').execFileSync('git',['show','5de6969:app.js'],{cwd:path.join(__dirname,'../../../..'),encoding:'utf8'}):fs.readFileSync(path.join(__dirname,'../../../../app.js'),'utf8');
assert.ok(FS.includes('export function getDoc(ref){'),'SDK-Haltepunkt muss vorhanden sein');
const sdk=FS.replace('export function getDoc(ref){','function originalGetDoc(ref){')+`
export function getDoc(ref){
 const lauf=originalGetDoc(ref);
 if(window.__HALT_CODE&&ref.path.startsWith('geteilteLektionen/')){
  window.__HALT_CODE=false;return new Promise((ok,nein)=>{window.__FREIGABE=()=>lauf.then(ok,nein);});
 }return lauf;
}`;
(async()=>{
 const browser=await start();try{for(const fall of ['datei','code','mehrere']){
  const store=vollerStore();
  if(fall==='mehrere')Object.assign(store['users/u1/bereiche/b1'],{gefuehrt:true,satzId:'bekannt',satzVersion:1});
  for(const[k,v]of Object.entries({...store}))if(k.startsWith('users/u1'))store[k.replace('users/u1','users/u2')]=structuredClone(v);
  store['geteilteLektionen/ABCDE-FGHJK']={ownerUid:'anderer',inhalt:{bereiche:[{name:'Private Datei A',karten:[{wort:'Text A',uebersetzung:'Inhalt A'}],sets:[]}]}};
  const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
  const p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.addInitScript(s=>{window.__START_STORE=s;window.__START_USER={uid:'u1',email:'a@example.com',emailVerified:true};
   const lesen=FileReader.prototype.readAsText;
   FileReader.prototype.readAsText=function(...args){window.__FREIGABE=()=>lesen.apply(this,args);};
  },store);
  await p.route('**/www.gstatic.com/**',r=>r.fulfill({contentType:'text/javascript',body:r.request().url().includes('auth')?AUTH:r.request().url().includes('firestore')?sdk:APP}));
  await p.route('**/app.js?*',r=>r.fulfill({contentType:'text/javascript',body:source+`
   window.__PRUEF={bereit:()=>bereiche!==null,starten:fall=>{
    const data={bereiche:[{id:'privat-a',name:'Private Datei A',karten:[{id:'a1',wort:'Text A',uebersetzung:'Inhalt A'}],sets:[]}]};
    let lauf;
    if(fall==='datei')importBackupFile(new File([JSON.stringify(data)],'backup-a.json',{type:'application/json'}));
    else if(fall==='code'){
     dlgConfirm=()=>{window.__NEUER_DIALOG=true;return Promise.resolve(true);};
     window.__HALT_CODE=true;lauf=codeEinloesen('ABCDE-FGHJK');
    }else{
     dlgConfirm=()=>new Promise(ok=>{window.__FREIGABE=()=>ok(false);});
     data.bereiche.push({name:'Neue Ausgabe A',gefuehrt:true,satzId:'bekannt',satzVersion:2,karten:[{wort:'Neu A',uebersetzung:'A'}],sets:[]});
     lauf=verarbeiteImportDaten(data);
    }
    if(lauf)lauf.then(()=>window.__FERTIG=true,e=>{window.__FEHLER=String(e);window.__FERTIG=true;});
   }};`}));
  await p.goto('http://127.0.0.1:8099/index.html');await p.waitForFunction(()=>window.__PRUEF?.bereit());
  await p.evaluate(f=>window.__PRUEF.starten(f),fall);await p.waitForFunction(()=>typeof window.__FREIGABE==='function');
  await p.evaluate(()=>{const s=window.__FB;s.user={uid:'u2',email:'b@example.com',emailVerified:true,getIdToken:()=>Promise.resolve('tok')};s.authListeners.forEach(cb=>cb(s.user));});
  await p.waitForFunction(()=>window.__PRUEF.bereit());
  const bestand=()=>p.evaluate(()=>[...window.__FB.store.entries()].filter(([k])=>k.startsWith('users/u2/')));
  const vorher=await bestand();await p.evaluate(()=>window.__FREIGABE());await p.waitForTimeout(900);const nachher=await bestand();
  assert.deepEqual(errors,[]);
  assert.equal(await p.evaluate(()=>window.__FEHLER),undefined);
  if(fall!=='datei')assert.equal(await p.evaluate(()=>window.__FERTIG),true,'Importauftrag muss beendet sein');
  if(gegenprobe||process.argv.includes('--befund'))assert.ok(nachher.some(([k,v])=>k.includes('/bereiche/')&&v.name==='Private Datei A'),'Befund muss Datei-Inhalt im neuen Konto beweisen');
  else {assert.deepEqual(nachher,vorher,'Import von A hat B veraendert');if(fall==='code')assert.equal(await p.evaluate(()=>!!window.__NEUER_DIALOG),false,'Alte Code-Antwort oeffnet neuen Dialog in B');}
  console.log(JSON.stringify({fall,vorher:vorher.length,nachher:nachher.length,importInB:nachher.filter(([k,v])=>k.includes('/bereiche/')&&v.name==='Private Datei A')}));
  await ctx.close();
 }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

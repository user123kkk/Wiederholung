/* Nachpruefung: bestaetigter Auftrag von A, SDK-Antwort erst nach Wechsel.
   Nur lokale SDK-Attrappe. --befund erwartet den noch offenen Fehler.
   Ohne Schalter ist dies die spaetere Abnahme: B muss unveraendert bleiben. */
const {start,vollerStore}=require('../../../werkzeuge/pruefstand/lib');
const {APP,AUTH,FS}=require('../../../werkzeuge/pruefstand/stubs');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const gegenprobe=process.argv.includes('--gegenprobe');
const source=gegenprobe?require('node:child_process').execFileSync('git',['show','5de6969:app.js'],{cwd:path.join(__dirname,'../../../..'),encoding:'utf8'}):fs.readFileSync(path.join(__dirname,'../../../../app.js'),'utf8');
const befund=gegenprobe||process.argv.includes('--befund');
for(const marker of ['export function setDoc(','export function updateDoc(','export function deleteDoc('])assert.ok(FS.includes(marker),'SDK-Haltepunkt fehlt: '+marker);
const sdk=FS.replace('export function setDoc(','function originalSetDoc(')
 .replace('export function updateDoc(','function originalUpdateDoc(')
 .replace('export function deleteDoc(','function originalDeleteDoc(')+`
function angehalten(ref,lauf){
 if(window.__HALT_TEIL&&ref.path.startsWith('geteilteLektionen/')){
  window.__HALT_TEIL=false;return new Promise((ok,nein)=>{window.__FREIGABE=()=>lauf.then(ok,nein);});
 }return lauf;
}
export function setDoc(ref,...args){return angehalten(ref,originalSetDoc(ref,...args));}
export function updateDoc(ref,...args){return angehalten(ref,originalUpdateDoc(ref,...args));}
export function deleteDoc(ref,...args){return angehalten(ref,originalDeleteDoc(ref,...args));}
`;
(async()=>{
 const browser=await start();
 try{for(const fall of ['erzeugen','freigeben','beenden']){
  const store=vollerStore();
  if(fall!=='erzeugen'){
   Object.assign(store['users/u1/bereiche/b1'],{teilCode:'ABCDE-FGHJK',teilFreigabe:1});
   store['geteilteLektionen/ABCDE-FGHJK']={ownerUid:'u1',freigabe:{offenBis:1},inhalt:{bereiche:[]}};
  }
  for(const[k,v]of Object.entries({...store}))if(k.startsWith('users/u1'))store[k.replace('users/u1','users/u2')]=structuredClone(v);
  Object.assign(store['users/u2/bereiche/b1'],{teilCode:'22222-33333',teilFreigabe:1});
  const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
  const p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.addInitScript(s=>{window.__START_STORE=s;window.__START_USER={uid:'u1',email:'a@example.com',emailVerified:true};},store);
  await p.route('**/www.gstatic.com/**',r=>r.fulfill({contentType:'text/javascript',body:r.request().url().includes('auth')?AUTH:r.request().url().includes('firestore')?sdk:APP}));
  await p.route('**/app.js?*',r=>r.fulfill({contentType:'text/javascript',body:source+`
   window.__PRUEF={bereit:()=>bereiche!==null,starten:fall=>{
    dlgConfirm=()=>Promise.resolve(true);window.__HALT_TEIL=true;
    const lauf=fall==='erzeugen'?teileLektionCode('lehrer'):fall==='freigeben'?lehrerFreigeben():beendeTeilenCode();
    lauf.then(()=>window.__FERTIG=true,e=>{window.__FEHLER=String(e);window.__FERTIG=true;});
   }};`}));
  await p.goto('http://127.0.0.1:8099/index.html');await p.waitForFunction(()=>window.__PRUEF?.bereit());
  // Beim Erzeugen braucht A noch keinen aktiven Code.
  await p.evaluate(f=>window.__PRUEF.starten(f),fall);await p.waitForFunction(()=>typeof window.__FREIGABE==='function');
  await p.evaluate(()=>{const s=window.__FB;s.user={uid:'u2',email:'b@example.com',emailVerified:true,getIdToken:()=>Promise.resolve('tok')};s.authListeners.forEach(cb=>cb(s.user));});
  await p.waitForFunction(()=>window.__PRUEF.bereit());
  const vorher=await p.evaluate(()=>structuredClone(window.__FB.store.get('users/u2/bereiche/b1')));
  await p.evaluate(()=>window.__FREIGABE());await p.waitForFunction(()=>window.__FERTIG);
  await p.waitForTimeout(600);
  const nachher=await p.evaluate(()=>({bereich:structuredClone(window.__FB.store.get('users/u2/bereiche/b1')),fehler:window.__FEHLER}));
  assert.equal(nachher.fehler,undefined);assert.deepEqual(errors,[]);
  if(befund)assert.notDeepEqual(nachher.bereich,vorher,'Befund muss tatsaechliche Dokumentaenderung beweisen');
  else assert.deepEqual(nachher.bereich,vorher,'Alte Weitergabe-Antwort hat Konto B veraendert');
  console.log(JSON.stringify({fall,vorher:{code:vorher.teilCode,freigabe:vorher.teilFreigabe},nachher:{code:nachher.bereich.teilCode,freigabe:nachher.bereich.teilFreigabe},befund}));
  await ctx.close();
 }}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

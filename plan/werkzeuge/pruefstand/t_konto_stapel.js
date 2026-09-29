/* Kontowechsel waehrend mehrstufiger Writes: echter App-Code, kontrollierte
   SDK-Antwort. --gegenprobe erwartet Fehler im festen Stand 5de6969. */
const {start,vollerStore}=require('./lib');
const {APP,AUTH,FS}=require('./stubs');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const repo=path.join(__dirname,'../../..');
const gegenprobe=process.argv.includes('--gegenprobe');
const source=gegenprobe?execFileSync('git',['show','5de6969:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
assert.ok(FS.includes('export function setDoc(')&&FS.includes('export function writeBatch('),'SDK-Instrumentierung passt nicht');
const sdk=FS.replace('export function setDoc(','function originalSetDoc(').replace('export function writeBatch(','function originalWriteBatch(')+`
export function setDoc(ref,...args){
 const result=originalSetDoc(ref,...args);
 if(window.__HALT_USER&&ref.path==='users/u1'){
   window.__HALT_USER=false;return new Promise(ok=>{window.__FREIGABE=()=>ok(result);});
 }return result;
}
export function writeBatch(...args){
 const batch=originalWriteBatch(...args),commit=batch.commit;
 for(const method of ['set','update','delete']){const original=batch[method];batch[method]=function(ref,...data){
   (window.__WEGE||(window.__WEGE=[])).push(method+':'+ref.path);return original.call(this,ref,...data);
 };}
 batch.commit=function(){const result=commit.call(this);
   if(window.__HALT_BATCH){window.__HALT_BATCH=false;return new Promise(ok=>{window.__FREIGABE=()=>ok(result);});}
   return result;
 };return batch;
}`;
(async()=>{
 const browser=await start();
 try{
  for(const fall of ['vollschreiben','bereich-loeschen']){
   const store=vollerStore();for(const[k,v]of Object.entries({...store}))store[k.replace('users/u1','users/u2')]=structuredClone(v);
   const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
   const p=await ctx.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
   await p.addInitScript(s=>{window.__START_STORE=s;window.__START_USER={uid:'u1',email:'a@example.com',emailVerified:true};},store);
   await p.route('**/www.gstatic.com/**',r=>r.fulfill({contentType:'text/javascript',body:r.request().url().includes('auth')?AUTH:r.request().url().includes('firestore')?sdk:APP}));
   await p.route('**/app.js?*',r=>r.fulfill({contentType:'text/javascript',body:source+`
    window.__PRUEF={bereit:()=>bereiche!==null,
     starten:fall=>{window.__HALT_USER=fall==='vollschreiben';window.__HALT_BATCH=fall==='bereich-loeschen';
      const lauf=fall==='vollschreiben'?persistAllAusfuehren():patchDoc({'bereiche.b1':LOESCHEN});
      lauf.then(()=>{window.__FERTIG=true;},e=>{window.__FEHLER=String(e);window.__FERTIG=true;});
     }};`}));
   await p.goto('http://127.0.0.1:8099/index.html');await p.waitForFunction(()=>window.__PRUEF?.bereit());
   await p.evaluate(f=>window.__PRUEF.starten(f),fall);await p.waitForFunction(()=>typeof window.__FREIGABE==='function');
   await p.evaluate(()=>{const s=window.__FB;s.user={uid:'u2',email:'b@example.com',emailVerified:true,getIdToken:()=>Promise.resolve('tok')};for(const cb of s.authListeners)cb(s.user);});
   await p.waitForFunction(()=>window.__PRUEF.bereit());
   await p.evaluate(()=>{window.__WEGE=[];window.__FREIGABE();});await p.waitForFunction(()=>window.__FERTIG);
   const result=await p.evaluate(()=>({wege:window.__WEGE.filter(x=>x.includes('users/u2/')),karten:[...window.__FB.store.keys()].filter(k=>k.startsWith('users/u2/karten/')).length,fehler:window.__FEHLER}));
   assert.equal(result.fehler,undefined,'Unerwarteter Testfehler');assert.deepEqual(errors,[]);
   if(gegenprobe){
    assert.ok(result.wege.length>0,'Gegenprobe muss Fortsetzung im falschen Konto beweisen');
    if(fall==='bereich-loeschen')assert.equal(result.karten,0,'Gegenprobe muss Karten des neuen Kontos loeschen');
   }else{
    assert.deepEqual(result.wege,[],'Alte Stapel-Fortsetzung trifft neues Konto');assert.equal(result.karten,40,'Karten des neuen Kontos wurden geloescht');
   }
   console.log('OK  '+(gegenprobe?'Gegenprobe bestaetigt':'Konto-Fortsetzung isoliert')+': '+fall+'.');
   await ctx.close();
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

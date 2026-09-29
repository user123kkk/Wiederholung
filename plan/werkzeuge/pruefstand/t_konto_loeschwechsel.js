/* G-098: alte Konto-Loeschung nach Auth-Wechsel darf B nie treffen.
   Echte Funktionen; die erste Sammlung-Abfrage von A wird angehalten. */
const {start,vollerStore}=require('./lib');
const {APP,AUTH,FS}=require('./stubs');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const repo=path.join(__dirname,'../../..');
const gegenprobe=process.argv.includes('--gegenprobe');
const source=gegenprobe?execFileSync('git',['show','5de6969:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
assert.ok(FS.includes('export function getDocs('),'SDK-Instrumentierung fehlt');
const sdk=FS.replace('export function getDocs(','function originalGetDocs(')+`
export function getDocs(q){const result=originalGetDocs(q);
 if(window.__HALT_QUERY&&q.path==='users/u1/bereiche'){
  window.__HALT_QUERY=false;return new Promise(ok=>{window.__FREIGABE=()=>ok(result);});
 }return result;
}`;
(async()=>{
 const b=await start();
 try{
  const store=vollerStore();for(const[k,v]of Object.entries({...store}))store[k.replace('users/u1','users/u2')]=structuredClone(v);
  const ctx=await b.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});
  const p=await ctx.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.addInitScript(s=>{window.__START_STORE=s;window.__START_USER={uid:'u1',email:'a@example.com',emailVerified:true};},store);
  await p.route('**/www.gstatic.com/**',r=>r.fulfill({contentType:'text/javascript',body:r.request().url().includes('auth')?AUTH:r.request().url().includes('firestore')?sdk:APP}));
  await p.route('**/app.js?*',r=>r.fulfill({contentType:'text/javascript',body:source+`
   window.__PRUEF={bereit:()=>bereiche!==null,start:()=>{
    window.__HALT_QUERY=true;const konto=typeof kontoLoeschKontext==='function'?kontoLoeschKontext():undefined;
    (async()=>{await kontoDatenLoeschen(konto);await kontoAuthLoeschen(konto);})().then(()=>{window.__FERTIG=true;},e=>{window.__ABBRUCH=e.code;window.__FERTIG=true;});
   }};`}));
  await p.goto('http://127.0.0.1:'+(process.env.PRUEF_PORT||8099)+'/index.html');await p.waitForFunction(()=>window.__PRUEF?.bereit());
  await p.evaluate(()=>window.__PRUEF.start());await p.waitForFunction(()=>typeof window.__FREIGABE==='function');
  await p.evaluate(()=>{const s=window.__FB;s.user={uid:'u2',email:'b@example.com',emailVerified:true,getIdToken:()=>Promise.resolve('tok')};for(const cb of s.authListeners)cb(s.user);});
  await p.evaluate(()=>window.__FREIGABE());await p.waitForFunction(()=>window.__FERTIG);await p.waitForTimeout(100);
  const stand=await p.evaluate(()=>({uid:window.__FB.user?.uid||null,dokument:window.__FB.store.has('users/u2'),karten:[...window.__FB.store.keys()].filter(k=>k.startsWith('users/u2/karten/')).length,abbruch:window.__ABBRUCH||null}));
  if(gegenprobe){assert.equal(stand.uid,null,'Altstand muss irrtuemlich Auth von B loeschen');assert.equal(stand.dokument,false,'Altstand muss Nutzer-Dokument von B loeschen');}
  else assert.deepEqual(stand,{uid:'u2',dokument:true,karten:40,abbruch:'konto-gewechselt'},'Alter Loeschauftrag trifft B');
  assert.deepEqual(errors,[]);console.log(gegenprobe?'OK  Gegenprobe: alte Loeschfortsetzung loescht Nutzer-Dokument/Auth von B.':'OK  Alte Loeschfortsetzung abgebrochen; Nutzer-Dokument/Auth/40 Karten von B erhalten.');
  await ctx.close();
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

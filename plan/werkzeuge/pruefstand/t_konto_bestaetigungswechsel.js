/* Vollstaendige App: Auth-Wechsel entsperrt B, alte Fortsetzung darf einen
   inzwischen gestarteten B-Auftrag nicht entsperren. Nur lokale SDK-Attrappe. */
const {start,vollerStore}=require('./lib');
const {APP,AUTH,FS}=require('./stubs');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const repo=path.join(__dirname,'../../..'),alt=process.argv.includes('--gegenprobe');
const source=alt?execFileSync('git',['show','c4a2ccf:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
assert.ok(AUTH.includes('export function sendEmailVerification(){'),'Versand-Haltepunkt fehlt');
const sdkAuth=AUTH.replace('export function sendEmailVerification(){','function originalSendEmailVerification(){')+`
export function sendEmailVerification(user){
 if(window.__HALT_MAIL){return new Promise(ok=>{window.__MAIL_ANTWORTEN=window.__MAIL_ANTWORTEN||{};window.__MAIL_ANTWORTEN[user.uid]=ok;});}
 return originalSendEmailVerification();
}`;
(async()=>{
 const browser=await start();try{for(const fall of ['knopf','still','senden']){
  const store=vollerStore();for(const[k,v]of Object.entries({...store}))if(k.startsWith('users/u1'))store[k.replace('users/u1','users/u2')]=structuredClone(v);
  const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
  const p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.addInitScript(s=>{window.__START_STORE=s;window.__START_USER={uid:'u1',email:'a@example.com',emailVerified:false};},store);
  await p.route('**/www.gstatic.com/**',r=>r.fulfill({contentType:'text/javascript',body:r.request().url().includes('auth')?sdkAuth:r.request().url().includes('firestore')?FS:APP}));
  await p.route('**/app.js?*',r=>r.fulfill({contentType:'text/javascript',body:source+`
   window.__PRUEF={bereit:()=>!!userDocRef&&currentUser?.uid,
    stand:()=>({konto:currentUser?.uid,busy:ui.authBusy,still:bestaetigungLaeuft,info:ui.authInfo}),
    starten:fall=>{window.__HALT_MAIL=true;currentUser.reload=()=>new Promise(ok=>{window.__RELOAD_ANTWORTEN=window.__RELOAD_ANTWORTEN||{};window.__RELOAD_ANTWORTEN[currentUser.uid]=ok;});
     const lauf=fall==='knopf'?pruefeBestaetigung():fall==='still'?bestaetigungStillPruefen():doResendVerification();
     const uid=currentUser.uid;lauf.then(()=>{window.__FERTIG=window.__FERTIG||{};window.__FERTIG[uid]=true;});
    }};`}));
  await p.goto('http://127.0.0.1:'+(process.env.PRUEF_PORT||8099)+'/index.html');await p.waitForFunction(()=>window.__PRUEF?.bereit()==='u1');
  await p.evaluate(f=>window.__PRUEF.starten(f),fall);
  await p.waitForFunction(f=>typeof (f==='senden'?window.__MAIL_ANTWORTEN?.u1:window.__RELOAD_ANTWORTEN?.u1)==='function',fall);
  await p.evaluate(()=>{const s=window.__FB;s.user={uid:'u2',email:'b@example.com',emailVerified:false,getIdToken:()=>Promise.resolve('tok'),reload:()=>Promise.resolve()};s.authListeners.forEach(cb=>cb(s.user));});
  const nachWechsel=await p.evaluate(()=>window.__PRUEF.stand());
  if(alt){assert.ok(fall==='still'?nachWechsel.still:nachWechsel.busy,'Gegenprobe muss alten Busy-Merker belegen');}
  else {
   assert.equal(nachWechsel.busy,false);assert.equal(nachWechsel.still,false);
   await p.evaluate(f=>window.__PRUEF.starten(f),fall);
   await p.waitForFunction(f=>typeof (f==='senden'?window.__MAIL_ANTWORTEN?.u2:window.__RELOAD_ANTWORTEN?.u2)==='function',fall);
  }
  await p.evaluate(f=>(f==='senden'?window.__MAIL_ANTWORTEN.u1:window.__RELOAD_ANTWORTEN.u1)(),fall);
  await p.waitForFunction(()=>window.__FERTIG?.u1===true);
  if(!alt){
   const wartend=await p.evaluate(()=>window.__PRUEF.stand());
   assert.ok(fall==='still'?wartend.still:wartend.busy,'Alte Antwort darf B-Auftrag nicht entsperren');
   assert.equal(await p.evaluate(()=>!!window.__FERTIG?.u2),false);
   await p.evaluate(f=>(f==='senden'?window.__MAIL_ANTWORTEN.u2:window.__RELOAD_ANTWORTEN.u2)(),fall);
   await p.waitForFunction(()=>window.__FERTIG?.u2===true);
   const fertig=await p.evaluate(()=>window.__PRUEF.stand());assert.equal(fertig.busy,false);assert.equal(fertig.still,false);
   if(fall==='senden')assert.equal(fertig.info,'Neue Bestätigungs-E-Mail ist unterwegs.');
  }
  assert.deepEqual(errors,[]);console.log('OK',fall,alt?'Gegenprobe c4a2ccf: B durch alten Busy-Merker blockiert':'B kann beginnen, bleibt bis eigener Antwort gesperrt und beendet normal');
  await ctx.close();
 }}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

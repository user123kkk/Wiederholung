/* Vollstaendige App + SDK-Attrappe: A-Antwort waehrend B erst einen von
   zwei Migrationsstapeln bestaetigt hat. Nur lokale Testkonten. */
const {start}=require('../pruefstand/lib');
const {APP,AUTH,FS}=require('../pruefstand/stubs');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const repo=path.join(__dirname,'../../..'),gegenprobe=process.argv.includes('--gegenprobe');
const source=gegenprobe?require('node:child_process').execFileSync('git',['show','5de6969:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
assert.ok(FS.includes('export function writeBatch(){'),'SDK-Haltepunkt fehlt');
const sdk=FS.replace('export function writeBatch(){','function originalWriteBatch(){')+`
export function writeBatch(){
 const b=originalWriteBatch(),commit=b.commit.bind(b);
 b.commit=()=>{
  const uid=S.user.uid,lauf=commit();
  if(window.__HALT_UMZUG&&!window.__GEHALTEN?.[uid]){
   window.__GEHALTEN=window.__GEHALTEN||{};window.__GEHALTEN[uid]=true;
   return new Promise((ok,nein)=>{window.__FREIGABEN=window.__FREIGABEN||{};window.__FREIGABEN[uid]=()=>lauf.then(ok,nein);});
  }return lauf;
 };return b;
}`;
const alt=gegenprobe||process.argv.includes('--befund');
const legacy=(name,n)=>({name,schemaVersion:1,settings:{thema:'dunkel'},streak:{},bereiche:[
 {id:'b1',name,karten:Array.from({length:n},(_,i)=>({id:'k'+i,wort:name+' '+i,uebersetzung:'Inhalt '+i,stufe:1})),sets:[]}]});
(async()=>{
 const browser=await start();try{for(const fall of ['normal','wechsel']){
  const store={'users/u1':legacy('Altdaten A',fall==='normal'?500:1),'users/u2':legacy('Altdaten B',500)};
  const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
  const p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.addInitScript(({store,halt})=>{window.__START_STORE=store;window.__START_USER={uid:'u1',email:'a@example.com',emailVerified:true};window.__HALT_UMZUG=halt;},{store,halt:fall==='wechsel'});
  await p.route('**/www.gstatic.com/**',r=>r.fulfill({contentType:'text/javascript',body:r.request().url().includes('auth')?AUTH:r.request().url().includes('firestore')?sdk:APP}));
  await p.route('**/app.js?*',r=>r.fulfill({contentType:'text/javascript',body:source+`
   window.__PRUEF={zustand:()=>({konto:currentUser?.uid,umzug:!!ui.umzug,karten:bereiche&&bereiche.reduce((n,b)=>n+b.karten.length,0)})};`}));
  await p.goto('http://127.0.0.1:'+(process.env.PRUEF_PORT||8099)+'/index.html');
  if(fall==='normal'){
   await p.waitForFunction(()=>window.__PRUEF?.zustand().karten===500);
   assert.equal(await p.evaluate(()=>window.__FB.store.get('users/u1').schemaVersion),2);
   assert.equal(await p.evaluate(()=>window.__PRUEF.zustand().umzug),false);
  }else{
   await p.waitForFunction(()=>typeof window.__FREIGABEN?.u1==='function');
   await p.evaluate(()=>{const s=window.__FB;s.user={uid:'u2',email:'b@example.com',emailVerified:true,getIdToken:()=>Promise.resolve('tok')};s.authListeners.forEach(cb=>cb(s.user));});
   await p.waitForFunction(()=>typeof window.__FREIGABEN?.u2==='function');
   await p.evaluate(()=>window.__FREIGABEN.u1());await p.waitForTimeout(250);
   const stand=await p.evaluate(()=>({schema:window.__FB.store.get('users/u2').schemaVersion,kopiert:[...window.__FB.store.keys()].filter(k=>k.startsWith('users/u2/karten/')).length,ui:window.__PRUEF.zustand()}));
   assert.ok(stand.kopiert<500,'B muss noch auf seinen zweiten Stapel warten');
   if(alt){assert.equal(stand.schema,2);assert.equal(stand.ui.umzug,false);}
   else {
    assert.equal(stand.schema,1,'A darf B nicht vorzeitig migriert markieren');assert.equal(stand.ui.umzug,true);
    await p.evaluate(()=>window.__FREIGABEN.u2());
    await p.waitForFunction(()=>window.__PRUEF.zustand().karten===500&&!window.__PRUEF.zustand().umzug);
    assert.equal(await p.evaluate(()=>window.__FB.store.get('users/u2').schemaVersion),2);
   }
   console.log(JSON.stringify({fall,...stand,alt}));
  }
  assert.deepEqual(errors,[],'JavaScript-Fehler beim Umzug');
  if(fall==='normal')console.log('OK normaler Umzug: 500 Karten, zwei Stapel, Schema 2.');
  await ctx.close();
 }}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

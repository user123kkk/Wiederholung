/* G-107: echte App/Auth-Callbacks, alte Antworten nach A -> B und A -> B -> A.
   --gegenprobe: fest c4a2ccf, erwartet jeweils den konkreten alten Fehler. */
const {start,vollerStore}=require('../pruefstand/lib');
const {APP,AUTH,FS}=require('../pruefstand/stubs');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const repo=path.join(__dirname,'../../..'),alt=process.argv.includes('--gegenprobe');
const source=alt?require('node:child_process').execFileSync('git',['show','c4a2ccf:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
let sdk=AUTH;
for(const name of ['signInWithEmailAndPassword','signInWithPopup','sendPasswordResetEmail','updateProfile','deleteUser']){
 const von='export function '+name+'(';
 assert.ok(sdk.includes(von),'SDK-Grenze fehlt: '+name);
 sdk=sdk.replace(von,'function original_'+name+'(');
 sdk+=`\nexport function ${name}(...args){
  if('${name}'==='deleteUser'&&window.__DELETE_ACK_MS)return original_${name}(...args).then(()=>new Promise(ok=>setTimeout(ok,window.__DELETE_ACK_MS)));
  if(window.__HALTE_ART==='${name}')return new Promise((ok,nein)=>{window.__HALTE_ANTWORT={ok,nein};});
  return original_${name}(...args);
 }`;
}
(async()=>{const browser=await start();try{
 for(const aba of [false,true])for(const fall of ['token','registrierung','reset','adresse','login','google','apple']){
  // Der Altbeleg reicht fuer A -> B; A -> B -> A ist eine zusaetzliche
  // Abnahme des Auftragsmerkers, kein behaupteter Altfehler fuer alle Pfade.
  if(alt&&aba)continue;
  const store=vollerStore();for(const[k,v]of Object.entries({...store}))if(k.startsWith('users/u1'))store[k.replace('users/u1','users/u2')]=structuredClone(v);
  const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'}),p=await ctx.newPage(),errors=[];
  let navigation=0;p.on('framenavigated',f=>{if(f===p.mainFrame())navigation++;});p.on('pageerror',e=>errors.push(e.message));
  const gast=['registrierung','reset','login','google','apple'].includes(fall);
  await p.addInitScript(([s,gast])=>{window.__START_STORE=s;window.__START_USER=gast?null:{uid:'u1',email:'a@example.com',displayName:'A',emailVerified:false};},[store,gast]);
  await p.route('**/www.gstatic.com/**',r=>r.fulfill({contentType:'text/javascript',body:r.request().url().includes('auth')?sdk:r.request().url().includes('firestore')?FS:APP}));
  await p.route('**/app.js?*',r=>r.fulfill({contentType:'text/javascript',body:source+`
   window.__PRUEF={bereit:()=>auth&&window.__FB.authListeners.length>0,
    starten:fall=>{
     if(['registrierung','reset','login','google','apple'].includes(fall)){
      ui.einstieg=null;ui.authGewaehlt=true;ui.authMode=fall==='registrierung'?'register':fall==='reset'?'reset':'login';
      ui.authEingabe={name:'Name A',email:'a@example.com',pass:'passwort'};render();
     }
     const art={registrierung:'updateProfile',reset:'sendPasswordResetEmail',adresse:'deleteUser',login:'signInWithEmailAndPassword',google:'signInWithPopup',apple:'signInWithPopup'}[fall];
     window.__HALTE_ART=art;
     if(fall==='token'){
      currentUser.emailVerified=true;currentUser.getIdToken=()=>new Promise(ok=>window.__HALTE_ANTWORT={ok});
      ausweisErneuernUndNeuLaden();window.__LAUF_FERTIG=true;
     }else{
      const fn={registrierung:doRegister,reset:doReset,adresse:kontoVertipptNeuAnfangen,login:doLogin,google:doGoogleLogin,apple:doAppleLogin}[fall];
      fn().then(()=>window.__LAUF_FERTIG=true);
      if(fall==='adresse')ui.dialog.resolve(dialogResult(ui.dialog,true));
     }
    },
    wechseln:aba=>{
     const a=currentUser,s=window.__FB;
     const melden=u=>{s.user=u;s.authListeners.forEach(cb=>cb(u));};
     melden({uid:'u2',email:'b@example.com',displayName:'B',emailVerified:true,getIdToken:()=>Promise.resolve('tok'),reload:()=>Promise.resolve()});
     if(aba)melden(a);
     ui.authBusy=true;ui.authInfo='Neuer Auftrag wartet';ui.authError=null;render();
    },
    stand:()=>({busy:ui.authBusy,info:ui.authInfo,fehler:ui.authError,mail:window.__FB.sendEmailVerificationCalls||0,dialog:!!ui.dialog})};` }));
  await p.goto('http://127.0.0.1:8099/index.html');await p.waitForFunction(()=>window.__PRUEF?.bereit());await p.waitForTimeout(80);
  await p.evaluate(f=>window.__PRUEF.starten(f),fall);await p.waitForFunction(()=>!!window.__HALTE_ANTWORT);
  // Registrierung: den normalen eigenen Auth-Callback vor dem Fremdwechsel
  // wirklich laufen lassen. Damit prueft dies mehr als die isolierte VM.
  await p.waitForTimeout(80);await p.evaluate(a=>window.__PRUEF.wechseln(a),aba);
  const navVor=navigation;
  await p.evaluate(f=>{
   if(['adresse','login','google','apple'].includes(f))window.__HALTE_ANTWORT.nein({code:f==='adresse'?'auth/requires-recent-login':'auth/network-request-failed'});
   else window.__HALTE_ANTWORT.ok();
  },fall);
  if(alt&&fall==='adresse')await p.waitForSelector('.dlg');
  else if(fall!=='token')await p.waitForFunction(()=>window.__LAUF_FERTIG===true);
  await p.waitForTimeout(100);
  if(alt&&fall==='token'){assert.ok(navigation>navVor,'Alter Token muss B neu laden');console.log(JSON.stringify({fall,alt,reloads:navigation-navVor}));}
  else{
   const st=await p.evaluate(()=>window.__PRUEF.stand());
   if(alt){
    if(fall==='adresse')assert.equal(st.dialog,true,'Alter Auftrag muss B zur Reauth fragen');
    else{assert.equal(st.busy,false);if(fall==='registrierung')assert.equal(st.mail,1);else if(fall==='reset')assert.notEqual(st.info,'Neuer Auftrag wartet');else assert.ok(st.fehler);}
   }else{assert.equal(navigation,navVor);assert.equal(st.busy,true);assert.equal(st.info,'Neuer Auftrag wartet');assert.equal(st.fehler,null);assert.equal(st.mail,0);assert.equal(st.dialog,false);}
   console.log(JSON.stringify({fall,aba,alt,st}));
  }
  assert.deepEqual(errors,[]);await ctx.close();
 }
 if(!alt)for(const quittung of [0,25]){
  const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'}),p=await ctx.newPage(),errors=[];
  p.on('pageerror',e=>errors.push(e.message));
  await p.addInitScript(ms=>{window.__DELETE_ACK_MS=ms;window.__START_STORE={};window.__START_USER={uid:'u1',email:'vertippt@example.com',displayName:'Name A',emailVerified:false};},quittung);
  await p.route('**/www.gstatic.com/**',r=>r.fulfill({contentType:'text/javascript',body:r.request().url().includes('auth')?sdk:r.request().url().includes('firestore')?FS:APP}));
  await p.route('**/app.js?*',r=>r.fulfill({contentType:'text/javascript',body:source+`
   window.__PRUEF={bereit:()=>currentUser?.uid==='u1'&&!!userDocRef,
    loeschen:()=>{kontoVertipptNeuAnfangen().then(()=>window.__LAUF_FERTIG=true);ui.dialog.resolve(dialogResult(ui.dialog,true));},
    stand:()=>({busy:ui.authBusy,user:currentUser?.uid||null,modus:ui.authMode,gewaehlt:ui.authGewaehlt})};` }));
  await p.goto('http://127.0.0.1:8099/index.html');await p.waitForFunction(()=>window.__PRUEF?.bereit());
  await p.evaluate(()=>window.__PRUEF.loeschen());await p.waitForFunction(()=>window.__LAUF_FERTIG===true);
  await p.locator('#a-name').waitFor({state:'visible'});
  const st=await p.evaluate(()=>window.__PRUEF.stand());
  assert.deepEqual(st,{busy:false,user:null,modus:'register',gewaehlt:true});
  assert.equal(await p.locator('#a-name').inputValue(),'Name A');assert.equal(await p.locator('#a-email').inputValue(),'');
  assert.equal(await p.evaluate(()=>window.__FB.geloescht),true);assert.deepEqual(errors,[]);
  console.log(JSON.stringify({fall:'eigene-adressloeschung',quittung,st}));await ctx.close();
 }
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

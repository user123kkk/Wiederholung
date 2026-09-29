/* Nach Netzwerkfehler gehoert der spaete Registrierungsnachtrag nur zum
   angeforderten Konto. --befund aktuell, --gegenprobe fest c4a2ccf. */
const {start,vollerStore}=require('../../../werkzeuge/pruefstand/lib');
const {APP,AUTH,FS}=require('../../../werkzeuge/pruefstand/stubs');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const repo=path.join(__dirname,'../../../..'),alt=process.argv.includes('--befund')||process.argv.includes('--gegenprobe');
const source=process.argv.includes('--gegenprobe')?require('node:child_process').execFileSync('git',['show','c4a2ccf:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
assert.ok(AUTH.includes('export function createUserWithEmailAndPassword(a, email){'),'SDK-Grenze fehlt');
const sdk=AUTH.replace('export function createUserWithEmailAndPassword(a, email){','function originalCreateUser(a, email){')
 .replace('export function updateProfile(u, p){','function originalProfile(u, p){')+`
export function createUserWithEmailAndPassword(a,email){if(window.__REG_FAIL)return Promise.reject({code:'auth/network-request-failed'});return originalCreateUser(a,email);}
export function updateProfile(u,p){const r=originalProfile(u,p);return window.__PROFILE_HALT?r.then(()=>new Promise(ok=>window.__PROFILE_QUITTUNG=ok)):r;}`;
(async()=>{const browser=await start();try{for(const fall of ['fremd','aba']){
 const store=vollerStore();for(const[k,v]of Object.entries({...store}))if(k.startsWith('users/u1'))store[k.replace('users/u1','users/u2')]=structuredClone(v);
 const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'}),p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(s=>{window.__START_STORE=s;window.__START_USER=null;},store);
 await p.route('**/www.gstatic.com/**',r=>r.fulfill({contentType:'text/javascript',body:r.request().url().includes('auth')?sdk:r.request().url().includes('firestore')?FS:APP}));
 await p.route('**/app.js?*',r=>r.fulfill({contentType:'text/javascript',body:source+`
 window.__PRUEF={starten:()=>{ui.einstieg=null;ui.authGewaehlt=true;ui.authMode='register';ui.authEingabe={name:'Privater Name A',email:'a@example.com',pass:'passwort'};render();if(!document.getElementById('a-name'))throw Error('Registrierformular fehlt');window.__REG_FAIL=true;doRegister().then(()=>window.__REG_FERTIG=true);},
 wechsel:eigen=>{const s=window.__FB;window.__PROFILE_HALT=eigen;s.user={uid:eigen?'neu1':'u2',email:eigen?'a@example.com':'b@example.com',displayName:'',emailVerified:true,getIdToken:()=>Promise.resolve('tok'),reload:()=>Promise.resolve()};s.authListeners.forEach(cb=>cb(s.user));},
 aba:()=>{const s=window.__FB,a=s.user;a.displayName='Neuer Name A';s.user={uid:'u2',email:'b@example.com',emailVerified:true};s.authListeners.forEach(cb=>cb(s.user));s.user=a;s.authListeners.forEach(cb=>cb(a));},
 neueAnzeige:()=>{displayName='Neuer Name A';},anzeige:()=>displayName,
 marker:()=>ui.registrierungZeitlimit};` }));
 await p.goto('http://127.0.0.1:8099/index.html');await p.waitForFunction(()=>window.__PRUEF&&window.__FB?.authListeners?.length>0);await p.waitForTimeout(40);
 await p.evaluate(()=>window.__PRUEF.starten());await p.waitForFunction(()=>window.__REG_FERTIG===true);assert.equal(await p.evaluate(()=>window.__PRUEF.marker()),true);
 await p.evaluate(e=>window.__PRUEF.wechsel(e),fall==='aba');await p.waitForTimeout(50);
 if(fall==='aba'){
  await p.waitForFunction(()=>!!window.__PROFILE_QUITTUNG);
  await p.evaluate(()=>window.__PRUEF.aba());await p.waitForTimeout(80);
  await p.evaluate(()=>{window.__PRUEF.neueAnzeige();window.__PROFILE_QUITTUNG();});await p.waitForTimeout(50);
 }
 const stand=await p.evaluate(()=>({user:window.__FB.user.uid,name:window.__FB.user.displayName,mail:window.__FB.sendEmailVerificationCalls||0,profil:window.__FB.updateProfileCalls||0}));
 if(fall==='fremd'){assert.equal(stand.user,'u2');assert.equal(stand.name,alt?'Privater Name A':'');assert.equal(stand.mail,alt?1:0);assert.equal(stand.profil,alt?1:0);}
 else{assert.equal(stand.user,'neu1');assert.equal(stand.name,'Neuer Name A');assert.equal(stand.mail,1);assert.equal(stand.profil,1);assert.equal(await p.evaluate(()=>window.__PRUEF.anzeige()),alt?'Privater Name A':'Neuer Name A');}
 assert.deepEqual(errors,[]);console.log(JSON.stringify({fall,stand,alt}));await ctx.close();
 }}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

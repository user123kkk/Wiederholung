/* Nach Netzwerkfehler gehoert der spaete Registrierungsnachtrag nur zum
   angeforderten Konto. --befund aktuell, --gegenprobe fest c4a2ccf. */
const {start,vollerStore}=require('../../../werkzeuge/pruefstand/lib');
const {APP,AUTH,FS}=require('../../../werkzeuge/pruefstand/stubs');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const repo=path.join(__dirname,'../../../..'),alt=process.argv.includes('--befund')||process.argv.includes('--gegenprobe');
const source=process.argv.includes('--gegenprobe')?require('node:child_process').execFileSync('git',['show','c4a2ccf:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
assert.ok(AUTH.includes('export function createUserWithEmailAndPassword(a, email){'),'SDK-Grenze fehlt');
const sdk=AUTH.replace('export function createUserWithEmailAndPassword(a, email){','function originalCreateUser(a, email){')+`
export function createUserWithEmailAndPassword(a,email){if(window.__REG_FAIL)return Promise.reject({code:'auth/network-request-failed'});return originalCreateUser(a,email);}`;
(async()=>{const browser=await start();try{
 const store=vollerStore();for(const[k,v]of Object.entries({...store}))if(k.startsWith('users/u1'))store[k.replace('users/u1','users/u2')]=structuredClone(v);
 const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'}),p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(s=>{window.__START_STORE=s;window.__START_USER=null;},store);
 await p.route('**/www.gstatic.com/**',r=>r.fulfill({contentType:'text/javascript',body:r.request().url().includes('auth')?sdk:r.request().url().includes('firestore')?FS:APP}));
 await p.route('**/app.js?*',r=>r.fulfill({contentType:'text/javascript',body:source+`
 window.__PRUEF={starten:()=>{ui.einstieg=null;ui.authGewaehlt=true;ui.authMode='register';ui.authEingabe={name:'Privater Name A',email:'a@example.com',pass:'passwort'};render();if(!document.getElementById('a-name'))throw Error('Registrierformular fehlt');window.__REG_FAIL=true;doRegister().then(()=>window.__REG_FERTIG=true);},
 wechsel:()=>{const s=window.__FB;s.user={uid:'u2',email:'b@example.com',displayName:'',emailVerified:true,getIdToken:()=>Promise.resolve('tok'),reload:()=>Promise.resolve()};s.authListeners.forEach(cb=>cb(s.user));},
 marker:()=>ui.registrierungZeitlimit};` }));
 await p.goto('http://127.0.0.1:8099/index.html');await p.waitForFunction(()=>window.__PRUEF&&window.__FB?.authListeners?.length>0);await p.waitForTimeout(40);
 await p.evaluate(()=>window.__PRUEF.starten());await p.waitForFunction(()=>window.__REG_FERTIG===true);assert.equal(await p.evaluate(()=>window.__PRUEF.marker()),true);
 await p.evaluate(()=>window.__PRUEF.wechsel());await p.waitForTimeout(50);
 const stand=await p.evaluate(()=>({user:window.__FB.user.uid,name:window.__FB.user.displayName,mail:window.__FB.sendEmailVerificationCalls||0,profil:window.__FB.updateProfileCalls||0}));
 assert.equal(stand.user,'u2');assert.equal(stand.name,alt?'Privater Name A':'');assert.equal(stand.mail,alt?1:0);assert.equal(stand.profil,alt?1:0);assert.deepEqual(errors,[]);
 console.log(JSON.stringify({stand,alt}));await ctx.close();
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

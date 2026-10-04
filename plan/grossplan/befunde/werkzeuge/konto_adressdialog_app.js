/* Vollstaendige App + SDK-Attrappe: bestaetigte Auth-Dialog-Fortsetzung.
   --befund aktueller Fehler, --gegenprobe fest c4a2ccf. Kein echtes Konto. */
const {start,vollerStore}=require('../../../werkzeuge/pruefstand/lib');
const {APP,AUTH,FS}=require('../../../werkzeuge/pruefstand/stubs');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const repo=path.join(__dirname,'../../../..'),alt=process.argv.includes('--befund')||process.argv.includes('--gegenprobe');
const source=process.argv.includes('--gegenprobe')?require('node:child_process').execFileSync('git',['show','c4a2ccf:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
assert.ok(AUTH.includes('export function deleteUser(')&&AUTH.includes('export function signOut('),'SDK-Haltepunkte fehlen');
const sdk=AUTH.replace('export function deleteUser(','function originalDeleteUser(').replace('export function signOut(','function originalSignOut(')+`
export function deleteUser(user){S.deleteUids=S.deleteUids||[];S.deleteUids.push(user.uid);return originalDeleteUser(user);}
export function signOut(auth){S.signOutUids=S.signOutUids||[];S.signOutUids.push(S.user?.uid);return originalSignOut();}`;
(async()=>{const browser=await start();try{for(const fall of ['adresse','abmelden','abmelden-sdk']){
 const store=vollerStore();for(const[k,v]of Object.entries({...store}))if(k.startsWith('users/u1'))store[k.replace('users/u1','users/u2')]=structuredClone(v);
 const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'}),p=await ctx.newPage(),errors=[];
 p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(([s,fall])=>{window.__START_STORE=s;window.__START_USER={uid:'u1',email:'a@example.com',displayName:'A',emailVerified:fall!=='adresse'};},[store,fall]);
 await p.route('**/www.gstatic.com/**',r=>r.fulfill({contentType:'text/javascript',body:r.request().url().includes('auth')?sdk:r.request().url().includes('firestore')?FS:APP}));
 await p.route('**/app.js?*',r=>r.fulfill({contentType:'text/javascript',body:source+`
 window.__PRUEF={bereit:()=>currentUser?.uid==='u1'&&!!userDocRef,
 starten:fall=>{(fall==='adresse'?kontoVertipptNeuAnfangen():doLogout()).then(()=>window.__DIALOG_FERTIG=true);},
 bestaetigenUndWechsel:nurSDK=>{const d=ui.dialog;d.resolve(dialogResult(d,true));
  const s=window.__FB;s.user={uid:'u2',email:'b@example.com',displayName:'B',emailVerified:true,getIdToken:()=>Promise.resolve('tok'),reload:()=>Promise.resolve()};if(!nurSDK)s.authListeners.forEach(cb=>cb(s.user));}};` }));
 await p.goto('http://127.0.0.1:8099/index.html');await p.waitForFunction(()=>window.__PRUEF?.bereit());
 await p.evaluate(f=>window.__PRUEF.starten(f),fall);await p.waitForSelector('.dlg');
 await p.evaluate(n=>window.__PRUEF.bestaetigenUndWechsel(n),fall==='abmelden-sdk');await p.waitForFunction(()=>window.__DIALOG_FERTIG===true);
 const stand=await p.evaluate(()=>({user:window.__FB.user?.uid||null,geloescht:window.__FB.deleteUids||[],abgemeldet:window.__FB.signOutUids||[]}));
 assert.deepEqual(stand.geloescht,alt&&fall==='adresse'?['u2']:[]);assert.deepEqual(stand.abgemeldet,alt&&fall!=='adresse'?['u2']:[]);
 assert.equal(stand.user,alt?null:'u2');assert.deepEqual(errors,[]);console.log(JSON.stringify({fall,stand,alt}));await ctx.close();
 }}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

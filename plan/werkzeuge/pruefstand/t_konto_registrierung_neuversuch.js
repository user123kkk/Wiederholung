/* Runde 15, Claude-Gegenpruefung (F1): Registrieren mit Adresse A laeuft ins
   Zeitlimit, die Person korrigiert auf Adresse B und registriert erneut.
   Waehrend createUser(B) laeuft, meldet sich das doch noch angelegte Konto A
   per Auth-Callback. Das Konto B muss trotzdem Namen und Bestaetigungs-Mail
   bekommen; A bekommt keinen Nachtrag.
   Gegenprobe: dieselbe app.js ohne die Uebernahme-Zeile in doRegister (Stand
   des Codex-Entwurfs 3.17.57 vor der Pruefung) - dort bleibt B ohne Mail. */
const {start,vollerStore}=require('./lib');
const {APP,AUTH,FS}=require('./stubs');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const repo=path.join(__dirname,'../../..');
const aktuell=fs.readFileSync(path.join(repo,'app.js'),'utf8');
const UEBERNAHME='if (ui.authAuftrag === null && auth.currentUser === cred.user && !kontoWirdGeloescht) { ui.authAuftrag = auftrag; ui.authBusy = true; }';
assert.ok(aktuell.includes(UEBERNAHME),'Uebernahme-Zeile in doRegister nicht gefunden');
const ohneUebernahme=aktuell.replace(UEBERNAHME,'');
const VON='export function createUserWithEmailAndPassword(a, email){';
assert.ok(AUTH.includes(VON),'SDK-Grenze fehlt');
const sdk=AUTH.replace(VON,'function originalCreateUser(a, email){')+`
export function createUserWithEmailAndPassword(a,email){
 if(window.__REG_FAIL)return Promise.reject({code:'auth/network-request-failed'});
 if(window.__HALTE_B)return new Promise(ok=>{window.__FREIGABE_B=()=>ok(originalCreateUser(a,email));});
 return originalCreateUser(a,email);
}`;
async function fall(browser,quelle){
 const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
 try{
  const p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.addInitScript(s=>{window.__START_STORE=s;window.__START_USER=null;},vollerStore({leer:true}));
  await p.route('**/www.gstatic.com/**',r=>r.fulfill({contentType:'text/javascript',body:r.request().url().includes('auth')?sdk:r.request().url().includes('firestore')?FS:APP}));
  await p.route('**/app.js?*',r=>r.fulfill({contentType:'text/javascript',body:quelle+`
   window.__PRUEF={
    registrieren:(name,email)=>{ui.einstieg=null;ui.authGewaehlt=true;ui.authMode='register';ui.authBusy=false;
     ui.authEingabe={name,email,pass:'passwort'};render();
     if(!document.getElementById('a-name'))throw Error('Registrierformular fehlt');
     // render() uebernimmt vorher die Felder aus dem DOM - deshalb die Felder selbst setzen
     document.getElementById('a-name').value=name;document.getElementById('a-email').value=email;
     document.getElementById('a-pass').value='passwort';
     return doRegister();},
    spaetA:()=>{const s=window.__FB;s.user={uid:'spaetA',email:'a@example.com',displayName:'',emailVerified:false,getIdToken:()=>Promise.resolve('t'),reload:()=>Promise.resolve()};s.authListeners.forEach(cb=>cb(s.user));},
    stand:()=>({user:window.__FB.user&&window.__FB.user.email,name:window.__FB.user&&window.__FB.user.displayName,
     mail:window.__FB.sendEmailVerificationCalls||0,profil:window.__FB.updateProfileCalls||0,busy:ui.authBusy,info:ui.authInfo})};`}));
  await p.goto('http://127.0.0.1:'+(process.env.PRUEF_PORT||8099)+'/index.html');
  await p.waitForFunction(()=>window.__PRUEF&&window.__FB?.authListeners?.length>0);await p.waitForTimeout(60);
  // 1. Versuch mit A: Zeitlimit (Netzwerkfehler)
  await p.evaluate(()=>{window.__REG_FAIL=true;return window.__PRUEF.registrieren('Name A','a@example.com');});
  // 2. Versuch mit korrigierter Adresse B; createUser(B) haengt noch
  await p.evaluate(()=>{window.__REG_FAIL=false;window.__HALTE_B=true;window.__FERTIG_B=false;
   window.__PRUEF.registrieren('Name B','b@example.com').then(()=>window.__FERTIG_B=true);});
  await p.waitForFunction(()=>!!window.__FREIGABE_B);
  // Das Konto A entsteht doch noch und meldet sich per Callback
  await p.evaluate(()=>window.__PRUEF.spaetA());await p.waitForTimeout(40);
  // Jetzt antwortet createUser(B)
  await p.evaluate(()=>window.__FREIGABE_B());
  await p.waitForFunction(()=>window.__FERTIG_B===true);await p.waitForTimeout(80);
  const st=await p.evaluate(()=>window.__PRUEF.stand());
  assert.deepEqual(errors,[]);
  return st;
 }finally{await ctx.close();}
}
(async()=>{const browser=await start();try{
 const neu=await fall(browser,aktuell);
 console.log('aktuell',JSON.stringify(neu));
 assert.equal(neu.user,'b@example.com');
 assert.equal(neu.name,'Name B','B bekommt seinen Namen');
 assert.equal(neu.mail,1,'genau eine Bestaetigungs-Mail, fuer B');
 assert.equal(neu.profil,1,'genau ein Profil-Write, fuer B');
 assert.equal(neu.busy,false,'kein haengender Busy');
 assert.equal(neu.info,'Konto angelegt.');
 const alt=await fall(browser,ohneUebernahme);
 console.log('gegenprobe',JSON.stringify(alt));
 assert.equal(alt.mail,0,'Gegenprobe muss den Fehler zeigen (B ohne Mail)');
 console.log('OK: F1 behoben, Gegenprobe rot wie erwartet');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

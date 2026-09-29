/* Nachpruefung: bisher nicht gebundene Auth-Fortsetzungen. --befund erwartet
   den Fehler; --gegenprobe verwendet den festen Stand vor Runde 14. */
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const repo=path.join(__dirname,'../../../..'),alt=process.argv.includes('--befund')||process.argv.includes('--gegenprobe');
const source=process.argv.includes('--gegenprobe')?require('node:child_process').execFileSync('git',['show','c4a2ccf:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
function lesen(von,bis){const a=source.indexOf(von),b=source.indexOf(bis,a);assert.ok(a>=0&&b>a);return source.slice(a,b);}
(async()=>{for(const fall of ['lese-token','registrierung','reset','adresse-neu','login','google','apple']){
 let ok,nein,seiten=0,reauthB=0,mailA=0;const userA={uid:'a',displayName:'A',emailVerified:true,getIdToken:()=>new Promise(resolve=>ok=resolve)},ctx=vm.createContext({console,currentUser:userA,userDocRef:{},kontoWirdGeloescht:false,
  ui:{authBusy:false,authEingabe:{}},displayName:'A',auth:{get currentUser(){return ctx.currentUser;}},authEingabeNameNachtrag:null,
  val:id=>id==='a-name'?'A':id==='a-email'?'a@example.com':'passwort',document:{getElementById:()=>({focus(){}})},
  render(){},ansagen(){},authErrorText:()=> 'Alter Auth-Fehler',fehlerKlartext:()=> 'Alter Auth-Fehler',mitZeitlimit:p=>p,
  TOKEN_ERNEUERT_KEY:'test',sessionStorage:{getItem:()=>null,setItem(){}},location:{reload:()=>seiten++},
  dlgConfirm:async()=>true,kontoNeuAnmelden:async()=>{if(ctx.currentUser.uid==='b')reauthB++;return false;},
  fb:{createUserWithEmailAndPassword:async()=>({user:userA}),updateProfile:()=>new Promise(resolve=>ok=resolve),
   sendEmailVerification:async(user)=>{if(user.uid==='a')mailA++;},sendPasswordResetEmail:()=>new Promise(resolve=>ok=resolve),
   deleteUser:()=>new Promise((resolve,reject)=>nein=reject),
   signInWithEmailAndPassword:()=>new Promise((resolve,reject)=>nein=reject),signInWithPopup:()=>new Promise((resolve,reject)=>nein=reject),
   GoogleAuthProvider:class{},OAuthProvider:class{addScope(){}}}});
 const code=fall==='lese-token'?lesen('function ausweisErneuernUndNeuLaden()','/* 17.09.2026:'):
  fall==='registrierung'?lesen('async function doRegister()','/* 2.11.4:'):
  fall==='reset'?lesen('async function doReset()','/* 3.12.0: Abmelden'):
  fall==='login'?lesen('async function doLogin()','/* Offene Frage 13'):
  fall==='google'?lesen('async function doGoogleLogin()','async function doAppleLogin()'):
  fall==='apple'?lesen('async function doAppleLogin()','/* Beobachtung des Betreibers'):
  lesen('async function kontoVertipptNeuAnfangen()','async function doReset()');
 const helfer=source.includes('function authAuftragStarten(')?lesen('function authAuftragStarten(','async function doLogin()'):'';
 vm.runInContext(helfer+code,ctx);
 const lauf=fall==='lese-token'?ctx.ausweisErneuernUndNeuLaden():fall==='registrierung'?ctx.doRegister():fall==='reset'?ctx.doReset():fall==='login'?ctx.doLogin():fall==='google'?ctx.doGoogleLogin():fall==='apple'?ctx.doAppleLogin():ctx.kontoVertipptNeuAnfangen();
 const ablehnung=['adresse-neu','login','google','apple'].includes(fall);
 await new Promise(resolve=>setImmediate(resolve));assert.equal(typeof(ablehnung?nein:ok),'function','Haltepunkt fehlt');
 ctx.currentUser={uid:'b',emailVerified:true};ctx.userDocRef={};ctx.displayName='B';ctx.ui={authBusy:true,authInfo:'B wartet',authMode:'login',authGewaehlt:false};
 if(ablehnung)nein({code:fall==='adresse-neu'?'auth/requires-recent-login':'auth/network-request-failed'});else ok();
 if(fall!=='lese-token')await lauf;await new Promise(resolve=>setImmediate(resolve));
 if(alt){if(fall==='lese-token')assert.equal(seiten,1);else if(fall==='adresse-neu')assert.equal(reauthB,1);else if(['login','google','apple'].includes(fall)){assert.equal(ctx.ui.authError,'Alter Auth-Fehler');assert.equal(ctx.ui.authBusy,false);}else{assert.notEqual(ctx.ui.authInfo,'B wartet');assert.equal(ctx.ui.authBusy,false);}}
 else{assert.equal(seiten,0);assert.equal(reauthB,0);assert.equal(ctx.ui.authInfo,'B wartet');assert.equal(ctx.ui.authBusy,true);assert.equal(mailA,0,'Nach Kontowechsel keine neue Mail-Fortsetzung');}
 console.log(JSON.stringify({fall,seiten,reauthB,mailA,info:ctx.ui.authInfo,fehler:ctx.ui.authError,busy:ctx.ui.authBusy}));
}})().catch(e=>{console.error(e);process.exitCode=1;});

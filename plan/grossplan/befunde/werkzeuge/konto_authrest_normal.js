/* G-107: normale Auth-Fortsetzungen bleiben erhalten. Originalfunktionen,
   kontrollierte SDK-Antworten; keine Produktionsverbindung. */
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const source=fs.readFileSync(path.join(__dirname,'../../../../app.js'),'utf8');
function lesen(von,bis){const a=source.indexOf(von),b=source.indexOf(bis,a);assert.ok(a>=0&&b>a);return source.slice(a,b);}
(async()=>{for(const fall of ['token','token-fehler','register','register-vor-auth','profil-fehler','mail-fehler','register-fehler','reset','reset-fehler','adresse-neu','adresse-reauth','adresse-abbruch','login','login-fehler','google','google-abbruch','apple','apple-fehler']){
 let reload=0,mail=0,profil=0,geloescht=0,reauth=0,anmelden=0;
 const user={uid:'a',displayName:'A',emailVerified:true,getIdToken:async()=>{if(fall==='token-fehler')throw Error('alt');return 'tok';}};
 let sdkUser=fall.includes('register')||fall==='profil-fehler'||fall==='mail-fehler'?null:user;
 const ctx=vm.createContext({console,currentUser:sdkUser,userDocRef:null,kontoWirdGeloescht:false,displayName:'',auth:{get currentUser(){return sdkUser;}},authEingabeNameNachtrag:null,
  ui:{authBusy:false,authEingabe:{}},val:id=>id==='a-name'?'Name A':id==='a-email'?'a@example.com':'passwort',
  document:{getElementById:()=>({focus(){}})},render(){},ansagen(){},authErrorText:()=> 'Auth-Fehler',fehlerKlartext:()=> 'Auth-Fehler',mitZeitlimit:p=>p,
  TOKEN_ERNEUERT_KEY:'test',sessionStorage:{getItem:()=>null,setItem(){}},location:{reload:()=>reload++},dlgConfirm:async()=>true,
  kontoNeuAnmelden:async()=>{reauth++;return fall!=='adresse-abbruch';},
  fb:{createUserWithEmailAndPassword:async()=>{if(fall==='register-fehler')throw Error('alt');sdkUser=user;const melden=()=>{ctx.currentUser=user;ctx.userDocRef={};};if(fall==='register-vor-auth')setTimeout(melden,5);else melden();return {user};},
   updateProfile:async()=>{profil++;if(fall==='register-vor-auth')await new Promise(r=>setTimeout(r,15));if(fall==='profil-fehler')throw Error('alt');},
   sendEmailVerification:async()=>{mail++;if(fall==='mail-fehler')throw Error('alt');},
   sendPasswordResetEmail:async()=>{if(fall==='reset-fehler')throw Error('alt');},
   signInWithEmailAndPassword:async()=>{anmelden++;if(fall==='login-fehler')throw Error('alt');return {user};},
   signInWithPopup:async()=>{anmelden++;if(fall==='google-abbruch')throw {code:'auth/popup-closed-by-user'};if(fall==='apple-fehler')throw Error('alt');return {user};},
   GoogleAuthProvider:class{},OAuthProvider:class{addScope(){}},
   deleteUser:async()=>{geloescht++;if(geloescht===1&&fall!=='adresse-neu')throw {code:'auth/requires-recent-login'};sdkUser=null;ctx.currentUser=null;ctx.userDocRef=null;ctx.ui.authEingabe={name:ctx.ui.authAuftrag?.name||ctx.authEingabeNameNachtrag};ctx.authEingabeNameNachtrag=null;}}});
 const istRegister=['register','register-vor-auth','profil-fehler','mail-fehler','register-fehler'].includes(fall),istToken=fall.startsWith('token'),istReset=fall.startsWith('reset'),istLogin=fall.startsWith('login'),istGoogle=fall.startsWith('google'),istApple=fall.startsWith('apple');
 if(source.includes('function authAuftragStarten('))vm.runInContext(lesen('function authAuftragStarten(','async function doLogin()'),ctx);
 vm.runInContext(istToken?lesen('function ausweisErneuernUndNeuLaden()','/* 17.09.2026:'):istRegister?lesen('async function doRegister()','/* 2.11.4:'):istReset?lesen('async function doReset()','/* 3.12.0: Abmelden'):istLogin?lesen('async function doLogin()','/* Offene Frage 13'):istGoogle?lesen('async function doGoogleLogin()','async function doAppleLogin()'):istApple?lesen('async function doAppleLogin()','/* Beobachtung des Betreibers'):lesen('async function kontoVertipptNeuAnfangen()','async function doReset()'),ctx);
 if(istToken){assert.equal(ctx.ausweisErneuernUndNeuLaden(),true);await new Promise(r=>setImmediate(r));assert.equal(reload,fall==='token'?1:0);}
 else if(istRegister){await ctx.doRegister();const erfolgreich=fall==='register'||fall==='register-vor-auth';assert.equal(ctx.ui.authBusy,false);assert.equal(profil,fall==='register-fehler'?0:1);assert.equal(mail,fall==='register-fehler'||fall==='profil-fehler'?0:1);assert.equal(ctx.ui.authInfo,erfolgreich?'Konto angelegt.':null);assert.equal(ctx.ui.authError,erfolgreich?null:'Auth-Fehler');}
 else if(istReset){await ctx.doReset();assert.equal(ctx.ui.authBusy,false);assert.equal(ctx.ui.authError,fall==='reset'?null:'Auth-Fehler');assert.equal(!!ctx.ui.authInfo,fall==='reset');}
 else if(istLogin||istGoogle||istApple){await (istLogin?ctx.doLogin():istGoogle?ctx.doGoogleLogin():ctx.doAppleLogin());assert.equal(anmelden,1);assert.equal(ctx.ui.authBusy,false);assert.equal(ctx.ui.authError,fall.endsWith('fehler')?'Auth-Fehler':null);}
 else{await ctx.kontoVertipptNeuAnfangen();assert.equal(ctx.ui.authBusy,false);assert.equal(geloescht,fall==='adresse-reauth'?2:1);assert.equal(reauth,fall==='adresse-neu'?0:1);if(fall==='adresse-abbruch')assert.equal(ctx.currentUser,user);else{assert.equal(ctx.currentUser,null);assert.equal(ctx.ui.authMode,'register');assert.equal(ctx.ui.authGewaehlt,true);assert.equal(ctx.ui.authEingabe.name,'A');}}
 console.log(JSON.stringify({fall,reload,profil,mail,geloescht,reauth,anmelden,busy:ctx.ui.authBusy}));
}})().catch(e=>{console.error(e);process.exitCode=1;});

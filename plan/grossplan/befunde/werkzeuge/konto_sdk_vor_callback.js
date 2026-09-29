/* SDK ist schon B, App-Auth-Callback noch A: alte Token-Antwort darf keine
   Navigation ausloesen. Kontrollierte Reihenfolge, Originalfunktionen;
   --befund aktuell, --gegenprobe fest a4b5677. Normale Navigation bleibt. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const repo=path.join(__dirname,'../../../..'),alt=process.argv.includes('--befund')||process.argv.includes('--gegenprobe');
const source=process.argv.includes('--gegenprobe')?require('node:child_process').execFileSync('git',['show','a4b5677:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
function lesen(a,b){const x=source.indexOf(a),y=source.indexOf(b,x);assert.ok(x>=0&&y>x);return source.slice(x,y);}
(async()=>{for(const wechsel of [false,true])for(const fall of ['lese-token','manuell','still']){
 let quittung,neuLaden=0;
 const a={uid:'a',emailVerified:fall==='lese-token',reload:async()=>{a.emailVerified=true;},getIdToken:()=>new Promise(ok=>quittung=ok)};
 let sdkUser=a;
 const ctx=vm.createContext({currentUser:a,userDocRef:{},kontoWirdGeloescht:false,bestaetigungLaeuft:false,
  auth:{get currentUser(){return sdkUser;}},ui:{authBusy:false,authError:null,authInfo:null},
  TOKEN_ERNEUERT_KEY:'test',sessionStorage:{getItem:()=>null,setItem(){}},mitZeitlimit:p=>p,
  location:{reload:()=>neuLaden++},render(){},authErrorText:()=> 'Fehler',document:{visibilityState:'visible'}});
 vm.runInContext(fall==='lese-token'?lesen('function ausweisErneuernUndNeuLaden()','/* 17.09.2026:'):
  fall==='manuell'?lesen('async function pruefeBestaetigung()','async function doResendVerification()'):
  lesen('async function bestaetigungStillPruefen()','function bestaetigungBeobachten()'),ctx);
 const lauf=fall==='lese-token'?ctx.ausweisErneuernUndNeuLaden():fall==='manuell'?ctx.pruefeBestaetigung():ctx.bestaetigungStillPruefen();
 await new Promise(r=>setImmediate(r));assert.equal(typeof quittung,'function');
 if(wechsel)sdkUser={uid:'b'};
 quittung();if(fall!=='lese-token')await lauf;await new Promise(r=>setImmediate(r));
 assert.equal(neuLaden,!wechsel||alt?1:0);assert.equal(ctx.currentUser.uid,'a','App-Callback wurde bewusst noch nicht geliefert');
 console.log(JSON.stringify({fall,wechsel,sdk:sdkUser.uid,app:ctx.currentUser.uid,neuLaden,alt}));
}})().catch(e=>{console.error(e);process.exitCode=1;});

/* Spaete Bestaetigungspruefung von A darf B weder neu laden noch UI aendern. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const repo=path.join(__dirname,'../../..'),gegenprobe=process.argv.includes('--gegenprobe');
const source=gegenprobe?require('node:child_process').execFileSync('git',['show','5de6969:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
const start=source.indexOf('async function pruefeBestaetigung()');
const code=source.slice(start,source.indexOf('/* 3.17.38 (G-054, KONTO-15)',start))+
 source.slice(source.indexOf('async function bestaetigungStillPruefen()'),source.indexOf('function bestaetigungBeobachten()'));
for(const name of ['pruefeBestaetigung','doResendVerification','bestaetigungStillPruefen'])assert.ok(code.includes('async function '+name+'()'),'Echte Funktion fehlt: '+name);
(async()=>{for(const fall of ['still','knopf','senden']){
 let antwort,neuLaden=0,tokenB=0;const userA={uid:'a',emailVerified:false,reload:()=>new Promise(ok=>antwort=ok)};
 const userB={uid:'b',emailVerified:true,getIdToken:async()=>{tokenB++;}};
 const ctx=vm.createContext({console,kontoWirdGeloescht:false,currentUser:userA,userDocRef:{},
  ui:{authBusy:false},bestaetigungLaeuft:false,document:{visibilityState:'visible'},
  mitZeitlimit:x=>x,location:{reload:()=>neuLaden++},render(){},ansagen(){},authErrorText:()=> 'Fehler',
  fb:{sendEmailVerification:()=>new Promise(ok=>antwort=ok)}});
 const lauf=vm.runInContext(code+(fall==='still'?';bestaetigungStillPruefen()':fall==='knopf'?';pruefeBestaetigung()':';doResendVerification()'),ctx);
 ctx.currentUser=userB;ctx.userDocRef={};ctx.ui={authBusy:false,authInfo:'Neue Sitzung B'};
 antwort();await lauf;
 const alt=gegenprobe||process.argv.includes('--befund');
 if(alt){if(fall==='senden')assert.notEqual(ctx.ui.authInfo,'Neue Sitzung B');else{assert.equal(neuLaden,1);assert.equal(tokenB,1);}}
 else{assert.equal(neuLaden,0);assert.equal(tokenB,0);assert.equal(ctx.ui.authInfo,'Neue Sitzung B');}
 console.log(JSON.stringify({fall,neuLaden,tokenB,info:ctx.ui.authInfo}));
}})().catch(e=>{console.error(e);process.exitCode=1;});

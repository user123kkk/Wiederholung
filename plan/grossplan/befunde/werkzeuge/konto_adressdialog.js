/* Dialog war schon bestaetigt, seine Fortsetzung laeuft erst nach Auth-
   Wechsel. --befund aktuell, --gegenprobe fest vor Runde 14. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const repo=path.join(__dirname,'../../../..'),alt=process.argv.includes('--befund')||process.argv.includes('--gegenprobe');
const source=process.argv.includes('--gegenprobe')?require('node:child_process').execFileSync('git',['show','c4a2ccf:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
(async()=>{for(const fall of ['adresse','abmelden']){
 const von=fall==='adresse'?'async function kontoVertipptNeuAnfangen()':'async function doLogout()',bis=fall==='adresse'?'async function doReset()':'/* ---------- Konto loeschen';
 const a=source.indexOf(von),b=source.indexOf(bis,a);assert.ok(a>=0&&b>a);
 let bestaetigen;const geloescht=[],abgemeldet=[];
 const ctx=vm.createContext({console,currentUser:{uid:'a',emailVerified:fall==='abmelden',displayName:'A'},userDocRef:{},kontoWirdGeloescht:false,offline:false,auth:{},authEingabeNameNachtrag:null,
  ui:{authBusy:false,authEingabe:{}},dlgConfirm:()=>new Promise(ok=>bestaetigen=ok),render(){},verlaufJetztSchreiben(){},fehlerKlartext:()=> 'Fehler',
  fb:{deleteUser:async user=>geloescht.push(user.uid),signOut:async()=>abgemeldet.push(ctx.currentUser.uid)}});
 vm.runInContext(source.slice(a,b),ctx);
 const lauf=fall==='adresse'?ctx.kontoVertipptNeuAnfangen():ctx.doLogout();assert.equal(typeof bestaetigen,'function');
 // Aufloesen legt die Fortsetzung in die Microtask-Warteschlange. Ein
 // synchroner Kontowechsel kommt zuvor; Dialogabbruch ist jetzt zu spaet.
 bestaetigen(true);ctx.currentUser={uid:'b',emailVerified:true,displayName:'B'};ctx.userDocRef={};ctx.ui.authInfo='B wartet';ctx.ui.authBusy=true;
 await lauf;
 assert.deepEqual(geloescht,alt&&fall==='adresse'?['b']:[]);assert.deepEqual(abgemeldet,alt&&fall==='abmelden'?['b']:[]);
 if(!alt){assert.equal(ctx.ui.authInfo,'B wartet');assert.equal(ctx.ui.authBusy,true);}
 console.log(JSON.stringify({fall,geloescht,abgemeldet,alt}));
}})().catch(e=>{console.error(e);process.exitCode=1;});

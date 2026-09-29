/* Echter Funktionscode, kontrollierte Antworten: normales Ende, Fehler und
   Konto-Wechsel auch waehrend Token-Retry/Moderation. Keine Produktivdaten.
   Die Alt-Gegenproben liegen separat in konto_*.js (fester Commit). */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(path.join(__dirname,'../../../../app.js'),'utf8');
function lesen(von,bis){const a=source.indexOf(von),b=source.indexOf(bis,a);assert.ok(a>=0&&b>a,'Funktionsgrenzen fehlen: '+von);return source.slice(a,b);}
const teilen=lesen('async function teileLektionCode(modus)','async function codeEinloesenStart()');
const board=lesen('async function feedbackEinreichen()','/* ---------- Das Wahl-Blatt');
const bestaetigung=lesen('async function pruefeBestaetigung()','/* 3.17.38 (G-054, KONTO-15)')+
 lesen('async function bestaetigungStillPruefen()','function bestaetigungBeobachten()');
const tick=()=>new Promise(ok=>setImmediate(ok));
const fehler={code:'permission-denied'};
function grund(){return {console,Blob,Date,Math,Set,Object,kontoWirdGeloescht:false,
 userDocRef:{path:'users/a'},currentUser:{uid:'a'},db:{},ui:{authBusy:false},
 render(){},ansagen(){},fuehlbar(){},mitZeitlimit:p=>p,fehlerKlartext:()=> 'Ablehnung',authErrorText:()=> 'Ablehnung'};}
function wechsel(ctx){ctx.userDocRef={path:'users/b'};ctx.currentUser={uid:'b',emailVerified:true,getIdToken:async()=>{throw new Error('Fremder Token-Aufruf');}};}
(async()=>{
 let n=0;
 for(const art of ['erzeugen','freigeben','beenden'])for(const fall of ['normal','fehler','dialog-wechsel','write-wechsel','fehler-wechsel',...(art==='erzeugen'?['token-wechsel','kollision']:[])]){
  let antwort,tokenAntwort,codes=0,tokens=0,erneuert=false;const patches=[],meldungen=[],writes=[];
  const b={id:'b1',name:'A',satzVersion:1,teilCode:art==='erzeugen'?null:'AAAAA-BBBBB',teilFreigabe:1};
  const ctx=grund();Object.assign(ctx,{currentBereich:()=>b,weitergabeMoeglich:async()=>true,
   lektionenVon:()=>[{name:'Erste'},{name:'Zweite'}],weitergabeBestaetigung:()=> 'Bestaetigen',
   baueWeitergabeBereich:()=>({}),slugName:()=> 'a',genId:()=> 'id',genTeilCode:()=> 'CODE-'+(++codes),
   pfadBereich:()=> 'b.b1',patchDoc:p=>patches.push(p),LOESCHEN:{},zeigeTeileCode:()=>meldungen.push('code'),
   dlgConfirm:()=>fall==='dialog-wechsel'?new Promise(ok=>antwort=ok):Promise.resolve(true),
   dlgAlert:async x=>meldungen.push(x),ausweisErneuernFuerSchreiben:()=>{if(erneuert)return false;erneuert=true;return true;},
   geteiltLoeschen:()=>schreiben()});
  ctx.currentUser.getIdToken=()=>{tokens++;return fall==='token-wechsel'?new Promise(ok=>tokenAntwort=ok):Promise.resolve('tok');};
  function schreiben(){writes.push(ctx.currentUser.uid);if(fall==='write-wechsel'||fall==='fehler-wechsel')return new Promise((ok,nein)=>antwort=fall==='write-wechsel'?ok:nein);
   if(fall==='fehler'||(fall==='token-wechsel'&&writes.length===1)||(fall==='kollision'&&writes.length<3))return Promise.reject(fehler);return Promise.resolve();}
  ctx.fb={doc:()=>({}),setDoc:schreiben,updateDoc:schreiben};vm.createContext(ctx);vm.runInContext(teilen,ctx);
  const lauf=art==='erzeugen'?ctx.teileLektionCode('lehrer'):art==='freigeben'?ctx.lehrerFreigeben():ctx.beendeTeilenCode();
  await tick();
  if(fall.endsWith('wechsel')){
   const freigabe=fall==='token-wechsel'?tokenAntwort:antwort;assert.equal(typeof freigabe,'function',fall+' Haltepunkt fehlt');
   wechsel(ctx);freigabe(fall==='fehler-wechsel'?fehler:true);
  }
  await lauf;
  if(fall.endsWith('wechsel')){assert.deepEqual(patches,[]);assert.deepEqual(meldungen,[]);assert.ok(writes.every(uid=>uid==='a'));}
  else if(fall==='fehler'){assert.equal(patches.length,0);assert.equal(meldungen.length,1);assert.equal(b.teilFreigabe,1);}
  else {assert.equal(patches.length,1);if(art==='erzeugen'){assert.equal(b.teilCode,'CODE-'+codes);assert.equal(meldungen.length,1);}else if(art==='freigeben')assert.equal(b.teilFreigabe,2);else assert.equal(b.teilCode,null);}
  if(fall==='token-wechsel'){assert.equal(tokens,1);assert.equal(writes.length,1,'kein Retry nach Token-Antwort in B');}
  if(fall==='kollision'){assert.equal(tokens,1);assert.equal(codes,2);assert.equal(writes.length,3,'ein Token-Retry, dann genau ein neuer Code');}
  console.log('OK Teilen',art,fall);n++;
 }
 for(const art of ['einreichen','abstimmen','status','entfernen'])for(const fall of ['normal','fehler','wechsel','fehler-wechsel',...(art==='entfernen'?['dialog-wechsel']:[])]){
  let antwort;const meldungen=[],ctx=grund(),liste=[{id:'i1',votes:2,status:'offen'}];
  Object.assign(ctx,{feedbackListe:liste,feedbackEigeneVotes:new Set(),feedbackEinreichtWird:false,
   feedbackEntwurf:{text:'A',beschreibung:''},feedbackFormFehler:false,ui:{feedbackForm:true},
   document:{getElementById:()=>({value:'Idee A'})},zeichneIdeen(){},feedbackLaden:async()=>{},
   dlgAlert:x=>meldungen.push(x),zeigeToast:x=>meldungen.push(x),
   dlgConfirm:()=>fall==='dialog-wechsel'?new Promise(ok=>antwort=ok):Promise.resolve(true)});
  function schreiben(){if(fall==='wechsel'||fall==='fehler-wechsel')return new Promise((ok,nein)=>antwort=fall==='wechsel'?ok:nein);return fall==='fehler'?Promise.reject(fehler):Promise.resolve({id:'neu-a'});}
  ctx.fb={serverTimestamp:()=>({}),collection:()=>({}),doc:()=>({}),increment:n=>({n}),addDoc:schreiben,updateDoc:schreiben,
   writeBatch:()=>({set(){},update(){},delete(){},commit:schreiben})};vm.createContext(ctx);vm.runInContext(board,ctx);
  const lauf=art==='einreichen'?ctx.feedbackEinreichen():art==='abstimmen'?ctx.feedbackAbstimmen('i1',true):art==='status'?ctx.feedbackStatusAendern('i1','geplant'):ctx.feedbackLoeschen('i1');
  await tick();const bListe=[{id:'i1',votes:8,status:'offen'}],entwurfB={text:'B',beschreibung:'B'};
  if(fall.includes('wechsel')){assert.equal(typeof antwort,'function');wechsel(ctx);ctx.feedbackListe=bListe;ctx.feedbackEntwurf=entwurfB;ctx.feedbackEigeneVotes=new Set(['i1']);ctx.feedbackEinreichtWird=false;ctx.ui.feedbackForm=true;antwort(fall==='fehler-wechsel'?fehler:{id:'neu-a'});}
  await lauf;
  if(fall.includes('wechsel')){assert.equal(ctx.feedbackListe,bListe);assert.equal(bListe[0].status,'offen');assert.equal(ctx.feedbackEntwurf,entwurfB);assert.equal(ctx.ui.feedbackForm,true);assert.equal(ctx.feedbackEigeneVotes.has('i1'),true);assert.equal(ctx.feedbackEinreichtWird,false);assert.deepEqual(meldungen,[]);}
  else if(fall==='fehler'){assert.equal(meldungen.length,1);if(art==='abstimmen'){assert.equal(liste[0].votes,2);assert.equal(ctx.feedbackEigeneVotes.has('i1'),false);}if(art==='einreichen')assert.equal(ctx.feedbackEinreichtWird,false);}
  else if(art==='einreichen'){assert.equal(ctx.ui.feedbackForm,false);assert.equal(ctx.feedbackEntwurf.text,'');assert.equal(ctx.feedbackEinreichtWird,false);assert.equal(ctx.feedbackListe[0].id,'neu-a');}
  else if(art==='abstimmen'){assert.equal(liste[0].votes,3);assert.equal(ctx.feedbackEigeneVotes.has('i1'),true);}
  else if(art==='status')assert.equal(liste[0].status,'geplant');else assert.equal(ctx.feedbackListe.length,0);
  console.log('OK Board',art,fall);n++;
 }
 for(const art of ['knopf','still','senden'])for(const fall of ['normal','unbestaetigt','fehler','reload-wechsel','fehler-wechsel',...(art!=='senden'?['token-wechsel']:[])]){
  let antwort,tokenAntwort,tokens=0,seiten=0;const ctx=grund();
  const user={uid:'a',emailVerified:fall!=='unbestaetigt',reload:()=>lesenAntwort(),getIdToken:()=>{tokens++;return fall==='token-wechsel'?new Promise(ok=>tokenAntwort=ok):Promise.resolve('tok');}};
  function lesenAntwort(){if(fall==='reload-wechsel'||fall==='fehler-wechsel')return new Promise((ok,nein)=>antwort=fall==='reload-wechsel'?ok:nein);return fall==='fehler'?Promise.reject(fehler):Promise.resolve();}
  Object.assign(ctx,{currentUser:user,bestaetigungLaeuft:false,document:{visibilityState:'visible'},
   location:{reload:()=>seiten++},fb:{sendEmailVerification:lesenAntwort}});vm.createContext(ctx);vm.runInContext(bestaetigung,ctx);
  const lauf=art==='knopf'?ctx.pruefeBestaetigung():art==='still'?ctx.bestaetigungStillPruefen():ctx.doResendVerification();await tick();
  if(fall.endsWith('wechsel')){const freigabe=fall==='token-wechsel'?tokenAntwort:antwort;assert.equal(typeof freigabe,'function');wechsel(ctx);ctx.ui={authBusy:true,authInfo:'B wartet'};ctx.bestaetigungLaeuft=true;freigabe(fall==='fehler-wechsel'?fehler:true);}
  await lauf;
  if(fall.endsWith('wechsel')){assert.equal(seiten,0);assert.equal(ctx.ui.authInfo,'B wartet');assert.equal(ctx.ui.authBusy,true);assert.equal(ctx.bestaetigungLaeuft,true,'alter finally darf B-Pruefung nicht entsperren');if(fall==='token-wechsel')assert.equal(tokens,1);else assert.equal(tokens,0);}
  else {assert.equal(ctx.bestaetigungLaeuft,false);if(art==='senden'){assert.equal(seiten,0);assert.equal(ctx.ui.authBusy,false);assert.ok(fall==='fehler'?ctx.ui.authError:ctx.ui.authInfo);}else if(fall==='normal'){assert.equal(tokens,1);assert.equal(seiten,1);}else{assert.equal(seiten,0);if(art==='knopf'){assert.equal(ctx.ui.authBusy,false);assert.ok(ctx.ui.authError);}}}
  console.log('OK Bestaetigung',art,fall);n++;
 }
 console.log('OK',n,'Fortsetzungsfaelle; normale Abschluesse, Fehler und fremde UI erhalten.');
})().catch(e=>{console.error(e);process.exitCode=1;});

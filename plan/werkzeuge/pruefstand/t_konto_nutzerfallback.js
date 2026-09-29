/* G-097: echter Funktionsquelltext, kontrollierte Promise-Antworten.
   Kein Firebase/Browser erforderlich: der Fehler ist die globale Referenz
   nach await. --gegenprobe prueft den Altstand c3a6aec und erwartet den Fehler. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {execFileSync}=require('node:child_process');
const repo=path.join(__dirname,'../../..');
const gegenprobe=process.argv.includes('--gegenprobe');
const source=gegenprobe?execFileSync('git',['show','c3a6aec:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
const von=source.indexOf('async function schreibeInsNutzerdokument(patch) {');
const bis=source.indexOf('/* ---------- Streak:',von);
assert.ok(von>=0&&bis>von,'Funktionsquelle fehlt');
(async()=>{
  for(const fall of ['not-found','spaeter-fallback','spaeter-erfolg','spaeter-fehler']){
  const a={path:'users/a'},b={path:'users/b'},writes=[],meldungen=[];
  let fertig;
  const sandbox={userDocRef:a,currentUser:{uid:'a'},kontoWirdGeloescht:false,displayName:'A',SCHEMA_VERSION:2,
    fb:{updateDoc(ref,data){writes.push({path:ref?.path,data});if(writes.length===1){
        if(fall==='spaeter-fallback')return Promise.reject({code:'not-found'});
        return new Promise((ok,nein)=>{fertig=fall==='spaeter-erfolg'?ok:()=>nein({code:fall==='spaeter-fehler'?'permission-denied':'not-found'});});
      }return Promise.resolve();},
      setDoc(ref,data){writes.push({path:ref?.path,data});if(fall==='spaeter-fallback')return new Promise(ok=>{fertig=ok;});return Promise.resolve();}},
    schreibErfolg(){meldungen.push('erfolg');},saveFehler(e){meldungen.push(e?.code);}};
  vm.createContext(sandbox);vm.runInContext(source.slice(von,bis),sandbox);
  const lauf=sandbox.schreibeInsNutzerdokument({settings:{thema:'hell'}});
  // VM-Promise und Test-Promise haben unterschiedliche Realms; deren
  // verschachtelte Fortsetzungen vor dem Kontowechsel vollständig abwarten.
  await new Promise(setImmediate);
  sandbox.userDocRef=b;sandbox.currentUser={uid:'b'};sandbox.displayName='B';
  assert.equal(typeof fertig,'function','Schreibantwort wurde nicht angehalten');fertig();await lauf;
  const fremd=writes.filter(w=>w.path===b.path);
  if(gegenprobe){
    if(fall==='not-found')assert.equal(fremd.length,2,'Gegenprobe muss Neuanlage und alten Patch im Konto B reproduzieren');
    if(fall==='spaeter-fallback')assert.equal(fremd.length,1,'Gegenprobe muss alten Patch nach Neuanlage im Konto B reproduzieren');
    if(fall==='spaeter-erfolg')assert.deepEqual(meldungen,['erfolg'],'Gegenprobe muss alte Erfolgsmeldung in B reproduzieren');
    if(fall==='spaeter-fehler')assert.deepEqual(meldungen,['permission-denied'],'Gegenprobe muss alte Fehlermeldung in B reproduzieren');
  }
  else {assert.deepEqual(fremd,[],'Altes Nutzer-Update schreibt nach Kontowechsel ins neue Konto');assert.deepEqual(meldungen,[],'Alte Rueckmeldung beeinflusst das neue Konto');}
  console.log(`OK  ${gegenprobe?'Gegenprobe: alter Konto-Fehler bestaetigt':'Nutzer-Write am Ursprungskonto isoliert'}: ${fall}.`);
  }
})().catch(e=>{console.error(e);process.exitCode=1;});

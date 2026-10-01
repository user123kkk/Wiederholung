/* A12: Reparatur-Transaktion nach Ablehnung gehoert zum Ursprungskonto;
   Ablehnungen ohne Altfeld werden nicht mit einem Ganz-Schreiben umgangen. */
const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../../../app.js'),'utf8');
const von=source.indexOf('async function schreibeInsNutzerdokument(patch) {');
const bis=source.indexOf('/* ---------- Streak:',von);assert.ok(von>=0&&bis>von);
(async()=>{
  for(const fall of ['wechsel','ohne-altfeld','aktuell']){
    const a={path:'users/a'},b={path:'users/b'},writes=[],meldungen=[];
    let fertig;
    const ctx={userDocRef:a,kontoWirdGeloescht:false,displayName:'A',db:{},SCHEMA_VERSION:2,
      normSettings:s=>Object.fromEntries(['thema','sitzungsLimit','arabGroesse','lastBackup'].map(k=>[k,s[k]])),
      fb:{updateDoc:()=>Promise.reject({code:'permission-denied'}),runTransaction:async(_db,fn)=>fn({
        get:ref=>{assert.equal(ref,a);return new Promise(ok=>{fertig=()=>ok({exists:()=>true,data:()=>({settings:{thema:'hell',sitzungsLimit:30,arabGroesse:'normal',lastBackup:'2026-10-01',...(fall==='ohne-altfeld'?{}:{alt:true})}})});});},
        update:(ref,data)=>writes.push({ref,data})})},
      schreibErfolg:()=>meldungen.push('ok'),saveFehler:e=>meldungen.push(e.code)};
    vm.createContext(ctx);vm.runInContext(source.slice(von,bis),ctx);
    const lauf=ctx.schreibeInsNutzerdokument({'settings.arabGroesse':'gross'});
    await new Promise(setImmediate);assert.equal(typeof fertig,'function');
    if(fall==='wechsel')ctx.userDocRef=b;
    fertig();await lauf;
    if(fall==='wechsel'){assert.deepEqual(writes,[]);assert.deepEqual(meldungen,[]);}
    else if(fall==='ohne-altfeld'){assert.deepEqual(writes,[]);assert.deepEqual(meldungen,['permission-denied']);}
    else{assert.equal(writes.length,1);assert.equal(writes[0].ref,a);assert.deepEqual(JSON.parse(JSON.stringify(writes[0].data)),{settings:{thema:'hell',sitzungsLimit:30,arabGroesse:'gross',lastBackup:'2026-10-01'}});assert.deepEqual(meldungen,['ok']);}
    console.log('OK Einstellungs-Reparatur: '+fall);
  }
})().catch(e=>{console.error(e);process.exitCode=1;});

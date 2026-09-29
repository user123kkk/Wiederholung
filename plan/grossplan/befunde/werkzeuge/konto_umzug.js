/* Echter Umzugscode mit kontrollierten SDK-Antworten; kein Produktionszugriff.
   B wartet auf seinen eigenen Umzug, wenn der alte Stapel von A bestaetigt wird. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const gegenprobe=process.argv.includes('--gegenprobe');
const repo=path.join(__dirname,'../../../..');
const source=gegenprobe?require('node:child_process').execFileSync('git',['show','5de6969:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
const code=source.slice(source.indexOf('async function umzugStarten()'),source.indexOf('/* 3.12.0: Der Bestaetigungs-Bildschirm'));
(async()=>{
 const refA={path:'users/a'},refB={path:'users/b'},writes=[],callbacks=[];
 const bereich={id:'b1',name:'A',karten:[{id:'k1',wort:'A'}],sets:[]};
 const ctx=vm.createContext({console,Set,Math,SCHEMA_VERSION:2,kontoWirdGeloescht:false,
  currentUser:{uid:'a'},userDocRef:refA,bereicheColRef:{path:'users/a/bereiche'},kartenColRef:{path:'users/a/karten'},
  ui:{umzug:{laeuft:false}},umzugBereiche:[bereich],db:{},
  genId:()=> 'neu',bereichFelder:b=>({name:b.name,order:0,sets:{}}),kartenFelder:c=>({...c}),
  bereichRef:id=>({path:'users/a/bereiche/'+id}),karteRef:id=>({path:'users/a/karten/'+id}),
  render(){},sammlungenStarten(){},fehlerKlartext:()=> 'Fehler',
  fb:{writeBatch:()=>({set(){},commit:()=>new Promise(ok=>callbacks.push(ok))}),
   updateDoc:async(ref,patch)=>{writes.push({path:ref.path,patch});}}
 });
 const lauf=vm.runInContext(code+';umzugStarten()',ctx);
 assert.equal(callbacks.length,1,'A muss bereits auf seine SDK-Antwort warten');
 ctx.userDocRef=refB;ctx.currentUser={uid:'b'};
 ctx.bereicheColRef={path:'users/b/bereiche'};ctx.kartenColRef={path:'users/b/karten'};
 const umzugB={laeuft:true,fertig:0,gesamt:2};ctx.ui.umzug=umzugB;
 const bestandB=[{id:'b1',name:'Private Altdaten B',karten:[{id:'kb',wort:'B'}],sets:[]}];ctx.umzugBereiche=bestandB;
 callbacks.shift()();await lauf;
 if(gegenprobe||process.argv.includes('--befund')){
  assert.ok(writes.some(w=>w.path==='users/b'&&w.patch.schemaVersion===2),'Altfehler muss B faelschlich als umgezogen markieren');
  assert.equal(ctx.umzugBereiche,null,'Alter Auftrag verwirft den laufenden B-Umzug');
 }else{
  assert.deepEqual(writes,[],'A darf B nicht als umgezogen markieren');
  assert.equal(ctx.ui.umzug,umzugB);assert.equal(ctx.umzugBereiche,bestandB);
 }
 console.log(JSON.stringify({writes,alterAuftragHatBVerworfen:ctx.umzugBereiche===null}));
})().catch(e=>{console.error(e);process.exitCode=1;});

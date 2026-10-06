/* Gleicher Lehrer-Code in zwei Konten: alte Abfrage darf B nicht veraendern. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const repo=path.join(__dirname,'../../..'),gegenprobe=process.argv.includes('--gegenprobe');
const source=gegenprobe?require('node:child_process').execFileSync('git',['show','5de6969:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
const code=source.slice(source.indexOf('async function lehrerStandAktualisieren(b)'),source.indexOf('function lehrerStaendeAktualisieren()'));
(async()=>{for(const fall of ['gleiches-konto','wechsel','abgemeldet']){
 let antwort;const refA={},refB={},bA={id:'b1',lehrerCode:'ABCDE-FGHJK',lehrerOffenBis:1},bB={...bA},writes=[];
 const ctx=vm.createContext({console,Date,LEHRER_ABFRAGE_ABSTAND_MS:60000,LEHRER_STAND_MAX:100,
  lehrerLetzteAbfrage:new Map(),offline:false,db:{},kontoWirdGeloescht:false,userDocRef:refA,bereiche:[bA],
  lehrerGesteuert:()=>true,render(){},pfadBereich:id=>'b.'+id,patchDoc:p=>writes.push(p),
  fb:{doc:()=>({}),getDoc:()=>new Promise(ok=>antwort=ok)}});
 const lauf=vm.runInContext(code+';lehrerStandAktualisieren(bereiche[0])',ctx);
 if(fall!=='gleiches-konto'){ctx.userDocRef=fall==='wechsel'?refB:null;ctx.bereiche=fall==='wechsel'?[bB]:null;}
 antwort({exists:()=>true,data:()=>({freigabe:{offenBis:3}})});await lauf;
 const alt=gegenprobe||process.argv.includes('--befund');
 if(fall==='gleiches-konto')assert.equal(bA.lehrerOffenBis,3,'Normale Aktualisierung bleibt erhalten');
 else if(fall==='wechsel'&&alt)assert.equal(bB.lehrerOffenBis,3,'Altfehler muss B trotz anderer Referenz aendern');
 else {assert.equal(bB.lehrerOffenBis,1);assert.deepEqual(writes,[]);}
 console.log(JSON.stringify({fall,A:bA.lehrerOffenBis,B:bB.lehrerOffenBis,writes}));
}})().catch(e=>{console.error(e);process.exitCode=1;});

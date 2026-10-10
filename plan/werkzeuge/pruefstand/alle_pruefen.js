/* Alle t_*.js einzeln ausfuehren, Ausgaben bewahren. Ein Exit 0 ersetzt
   nicht das Lesen beschreibender Messungen/Gegenproben. Keine Produktivdaten.
   --fortsetzen uebernimmt nur bestandene Laeufe mit identischem Quellstand. */
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {spawn,execFileSync}=require('node:child_process');
const {createHash}=require('node:crypto');
const repo=path.join(__dirname,'../../..');
const alle=fs.readdirSync(__dirname).filter(f=>/^t_.*\.js$/.test(f)).sort();
const rundenQuelle=fs.readFileSync(path.join(__dirname,'abnahme_runde.js'),'utf8');
const runde=[...rundenQuelle.matchAll(/^\s*\['(t_[^']+\.js)'/gm)].map(m=>m[1]);
if(runde.length!==13)throw new Error('Rundenliste nicht vollstaendig erkannt');
// Nur zusammen mit einer separat ausgefuehrten frischen abnahme_runde.js
// verwenden. Dieser Lauf behauptet dann ausdruecklich keine Gesamtabnahme.
const dateien=process.argv.includes('--ohne-runde')?alle.filter(f=>!runde.includes(f)):alle;
const relevant=['app.js','index.html','styles.css','sw.js','firestore.rules',
 'plan/werkzeuge/pruefstand/lib.js','plan/werkzeuge/pruefstand/stubs.js',
 'plan/werkzeuge/pruefstand/diagnose_karten_konflikt.js'];
const stand=createHash('sha256');for(const f of relevant)stand.update(f).update(fs.readFileSync(path.join(repo,f)));
const kennung=stand.digest('hex');
const ordner=path.join(os.tmpdir(),'adrabic-pruefstand-gesamt',kennung.slice(0,16));
fs.mkdirSync(ordner,{recursive:true});
const datei=path.join(ordner,'stand.json');
const ergebnisse=process.argv.includes('--fortsetzen')&&fs.existsSync(datei)?JSON.parse(fs.readFileSync(datei,'utf8')):{kennung,tests:{}};
if(ergebnisse.kennung!==kennung)throw new Error('Pruefstand gehoert zu anderem Quellstand');
let aktiv=null;
// Uebernommener runde15-Wrapper: sein Quellstand umfasst alle Hilfsproben.
function quellHash(f){
 const quelle=fs.readFileSync(path.join(__dirname,f));
 const hash=createHash('sha256').update(quelle);
 if(f==='t_tagesantworten_sdk.js')hash.update('diagnose_karten_konflikt.js').update(fs.readFileSync(path.join(__dirname,'diagnose_karten_konflikt.js')));
 if(f==='t_paket_d.js')hash.update('css_struktur.mjs').update(fs.readFileSync(path.join(__dirname,'../css_struktur.mjs')));
 if(f==='t_konto_fortsetzungen.js'){
  const namen=[...new Set([...quelle.toString().matchAll(/\['(konto_[^']+\.js)'/g)].map(m=>m[1]))].sort();
  for(const name of namen)hash.update(name).update(fs.readFileSync(path.join(__dirname,'../befund-skripte',name)));
 }
 return hash.digest('hex');
}
function stoppen(child){
 if(!child||child.exitCode!==null)return;
 if(process.platform==='win32'){
  try{execFileSync('taskkill',['/PID',String(child.pid),'/T','/F'],{windowsHide:true,stdio:'ignore'});}catch(_){child.kill();}
 }else child.kill('SIGKILL');
}
process.on('SIGINT',()=>{stoppen(aktiv);process.exit(130);});
async function lauf(f){
 const log=path.join(ordner,f+'.log'),strom=fs.createWriteStream(log);
 const t=Date.now();let zeitlimit=false;
 const child=spawn(process.execPath,['--require',path.join(__dirname,'pruef_cleanup.js'),f],{cwd:__dirname,env:process.env,windowsHide:true});aktiv=child;
 child.stdout.pipe(strom,{end:false});child.stderr.pipe(strom,{end:false});
 // Paket C/D/E pruefen viele Aufgaben mit Zustandsmatrizen in einer
 // Datei. Nur das Prozess-Zeitlimit muss deren Gesamtumfang abdecken;
 // Assertions, Messgrenzen und Wartebedingungen bleiben unveraendert.
 const limit=f==='t_paket_c_weiter.js'?3600000:(f==='t_paket_d.js'||f==='t_paket_e.js')?1800000:f==='t_paket_c_verw.js'?1200000:600000;
 const timer=setTimeout(()=>{zeitlimit=true;stoppen(child);},limit);
 let fehler=null;child.on('error',e=>{fehler=e.message;});
 const ende=await new Promise(ok=>child.on('close',(code,signal)=>ok({code,signal})));
 clearTimeout(timer);aktiv=null;await new Promise(ok=>strom.end(ok));
 const result={...ende,zeitlimit,fehler,sekunden:Math.round((Date.now()-t)/1000),quelltext:quellHash(f)};
 fs.appendFileSync(log,'\nProzess: '+JSON.stringify(result)+'\n');
 ergebnisse.tests[f]=result;fs.writeFileSync(datei,JSON.stringify(ergebnisse,null,2));
 console.log(`${ende.code===0&&!zeitlimit?'EXIT 0':'ROT'} ${f} (${result.sekunden}s)${zeitlimit?' ZEITLIMIT':''}`);
 if(ende.code!==0||zeitlimit)console.log(fs.readFileSync(log,'utf8').split('\n').filter(x=>/Error|FEHL|ROT|Prozess/.test(x)).slice(0,5).join('\n'));
}
(async()=>{
 console.log('Quellstand: '+kennung+'\nLogs: '+ordner+'\nTests: '+dateien.length);
 if(process.argv.includes('--ohne-runde'))console.log('13 Runden-Tests ausgelassen: separat mit abnahme_runde.js pruefen.');
 for(const f of dateien){
  const alt=ergebnisse.tests[f],hash=quellHash(f);
  if(process.argv.includes('--fortsetzen')&&alt?.code===0&&!alt.zeitlimit&&alt.quelltext===hash){console.log('BEWAHRT '+f);continue;}
  await lauf(f);
 }
 const rot=dateien.filter(f=>ergebnisse.tests[f]?.code!==0||ergebnisse.tests[f]?.zeitlimit);
 console.log(`\n${dateien.length-rot.length}/${dateien.length} Exit 0; ${rot.length} rot. Ausgaben noch lesen: ${ordner}`);
 process.exitCode=rot.length?1:0;
})().catch(e=>{console.error(e);stoppen(aktiv);process.exitCode=1;});

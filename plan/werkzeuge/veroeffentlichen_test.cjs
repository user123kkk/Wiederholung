/* G-117: echter Git-Fetch/Export und Windows PowerShell 5.1; Firebase ist
   ausschliesslich eine private Test-CLI. Kein Login/Hosting-Deploy.
   Lauf: node plan/werkzeuge/veroeffentlichen_test.cjs */
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const cp=require('node:child_process'),assert=require('node:assert/strict'),crypto=require('node:crypto');
if(process.platform!=='win32')throw Error('Dieser Test braucht Windows PowerShell/cmd.');
const repo=path.resolve(__dirname,'../..');
const root=fs.mkdtempSync(path.join(os.tmpdir(),'adrabic-bat-test-'));
const source=path.join(root,'Quelle mit Leerzeichen'),remote=path.join(root,'remote.git'),work=path.join(root,'Arbeitsordner'),bin=path.join(root,'bin');
const ps=path.join(process.env.SystemRoot,'System32/WindowsPowerShell/v1.0/powershell.exe');
const logfile=path.join(root,'firebase.jsonl');
const helper=path.join(__dirname,'veroeffentlichen.ps1');
const run=(cmd,args,cwd=repo,env=process.env)=>cp.spawnSync(cmd,args,{cwd,env,encoding:'utf8',input:'\n',windowsHide:true,windowsVerbatimArguments:/^cmd(?:\.exe)?$/i.test(path.basename(cmd)),timeout:120000});
function git(args,cwd=repo){const r=run('git',args,cwd);assert.equal(r.status,0,r.stderr||r.error?.message);return r.stdout.trim();}
function commit(cwd,message){git(['add','--all'],cwd);git(['-c','user.name=Pruefstand','-c','user.email=pruefung@example.invalid','-c','commit.gpgsign=false','commit','-m',message],cwd);}
const calls=()=>fs.existsSync(logfile)?fs.readFileSync(logfile,'utf8').trim().split('\n').filter(Boolean).map(JSON.parse):[];
const checks=[];
try{
 fs.mkdirSync(source);fs.mkdirSync(bin);
 const zip=path.join(root,'main.zip');git(['archive','--format=zip','--output='+zip,'origin/main']);
 const expand=run(ps,['-NoProfile','-Command','Expand-Archive -LiteralPath $env:ADRABIC_TEST_ZIP -DestinationPath $env:ADRABIC_TEST_SOURCE'],repo,{...process.env,ADRABIC_TEST_ZIP:zip,ADRABIC_TEST_SOURCE:source});
 assert.equal(expand.status,0,expand.stderr);
 git(['init','--initial-branch=main'],source);commit(source,'Ausgang');
 git(['clone','--bare',source,remote]);git(['clone',remote,work]);
 const freigegeben=git(['rev-parse','HEAD'],work);
 const fixtureVersion=fs.readFileSync(path.join(work,'app.js'),'utf8').match(/const APP_VERSION = "([^"]+)"/)[1];
 // Auch der lokale HEAD ist neuer als origin/main; er darf nicht erscheinen.
 fs.appendFileSync(path.join(work,'app.js'),'\n// NICHT_VERÖFFENTLICHTER_LOKALER_COMMIT\n');commit(work,'Nur lokal');
 fs.appendFileSync(path.join(work,'index.html'),'\n<!-- PRIVATER_ENTWURF -->\n');
 fs.writeFileSync(path.join(work,'privat.txt'),'nicht hochladen');
 fs.copyFileSync(path.join(repo,'veroeffentlichen.bat'),path.join(work,'veroeffentlichen.bat'));
 fs.copyFileSync(helper,path.join(work,'plan/werkzeuge/veroeffentlichen.ps1'));
 const vorher=()=>({head:git(['rev-parse','HEAD'],work),status:git(['status','--porcelain'],work),
  dateien:['app.js','index.html','privat.txt'].map(f=>crypto.createHash('sha256').update(fs.readFileSync(path.join(work,f))).digest('hex'))});
 const unveraendert=vorher();
 fs.writeFileSync(path.join(bin,'firebase.cmd'),'@echo off\r\n"'+process.execPath+'" "%~dp0firebase-mock.cjs" %*\r\nexit /b %ERRORLEVEL%\r\n');
 fs.writeFileSync(path.join(bin,'firebase-mock.cjs'),String.raw`const fs=require('node:fs'),path=require('node:path');
 const app=fs.readFileSync('app.js','utf8'),html=fs.readFileSync('index.html','utf8');
 fs.appendFileSync(process.env.ADRABIC_TEST_LOG,JSON.stringify({cwd:process.cwd(),args:process.argv.slice(2),version:app.match(/const APP_VERSION = "([^"]+)"/)[1],privat:fs.existsSync('privat.txt'),entwurf:html.includes('PRIVATER_ENTWURF'),lokalerCommit:app.includes('NICHT_VERÖFFENTLICHTER_LOKALER_COMMIT')})+'\n');
 process.exit(Number(process.env.ADRABIC_TEST_EXIT||0));`);
 const env={...process.env,PATH:bin+path.delimiter+process.env.PATH,ADRABIC_TEST_LOG:logfile};
 function pruef(name,extra=[],other={}){
  const r=run(ps,['-NoLogo','-NoProfile','-ExecutionPolicy','Bypass','-File',helper,'-RepoPath',work,...extra],root,{...env,...other});
  assert.ok(!r.error,r.error?.message);assert.deepEqual(vorher(),unveraendert,'Arbeitsordner veraendert: '+name);
  const last=calls().at(-1);if(last)assert.equal(fs.existsSync(path.dirname(last.cwd)),false,'Temp-Kopie muss entfernt sein');
  checks.push(name+': Exit '+r.status);return r;
 }
 let r=pruef('schmutziger Arbeitsbaum und lokaler Commit');assert.equal(r.status,0,r.stdout+r.stderr);
 assert.match(r.stdout,/Fertig!/);assert.match(r.stdout,new RegExp(freigegeben.slice(0,8)));
 let c=calls();assert.equal(c.length,1);assert.deepEqual(c[0].args,['deploy','--only','hosting','--project','lernkarte-925c2']);
 assert.equal(c[0].version,fixtureVersion);assert.equal(c[0].privat,false);assert.equal(c[0].entwurf,false);assert.equal(c[0].lokalerCommit,false);
 r=pruef('nur pruefen',['-NurPruefen']);assert.equal(r.status,0,r.stdout+r.stderr);assert.equal(calls().length,1);assert.match(r.stdout,/Es wurde nichts veroeffentlicht/);
 const wrapper=run('cmd.exe',['/d','/c','call "'+path.join(work,'veroeffentlichen.bat')+'" -NurPruefen'],root,env);
 assert.equal(wrapper.status,0,wrapper.stdout+wrapper.stderr);assert.match(wrapper.stdout,/Pruefung bestanden/);assert.equal(calls().length,1);assert.deepEqual(vorher(),unveraendert);
 checks.push('Batch-Aufruf aus fremdem Ordner: Exit 0');
 r=pruef('Firebase scheitert',[],{ADRABIC_TEST_EXIT:'17'});assert.equal(r.status,1);assert.doesNotMatch(r.stdout,/Fertig!/);assert.match(r.stdout,/Der Upload wurde gestartet/);assert.equal(calls().length,2);
 function neuerRemoteStand(datei,inhalt){fs.writeFileSync(path.join(source,datei),inhalt);commit(source,'Kontrollierter Fehler');git(['push','--force',remote,'main'],source);}
 const sw=fs.readFileSync(path.join(source,'sw.js'),'utf8');
 neuerRemoteStand('sw.js',sw.replace('const CACHE_NAME = "adrabic-'+fixtureVersion+'"','const CACHE_NAME = "adrabic-falsch"'));
 r=pruef('Versionsfehler stoppt vor Firebase');assert.equal(r.status,1);assert.equal(calls().length,2);assert.match(r.stdout,/Standpruefung ist fehlgeschlagen/);
 git(['reset','--hard',freigegeben],source); // nur private Fixture, nie Betreiber-Repo
 const config=JSON.parse(fs.readFileSync(path.join(source,'firebase.json'),'utf8'));config.hosting[0].public='..';
 neuerRemoteStand('firebase.json',JSON.stringify(config));
 r=pruef('Header-Aenderung ohne index stoppt');assert.equal(r.status,1);assert.equal(calls().length,2);assert.match(r.stdout,/firebase.json ohne index.html/);
 // index mitzaehlen, damit die Pfadschutz-Probe wirklich ihren Guard erreicht.
 fs.appendFileSync(path.join(source,'index.html'),'\n<!-- Test der Pfadgrenze -->\n');commit(source,'Pfadgrenze');git(['push',remote,'main'],source);
 r=pruef('Hosting ausserhalb der Kopie stoppt');assert.equal(r.status,1);assert.equal(calls().length,2);assert.match(r.stdout,/ausserhalb der geprueften Kopie/);
 git(['remote','set-url','origin',path.join(root,'nicht-vorhanden.git')],work);
 r=pruef('Fetch-Fehler nimmt keinen alten Stand');assert.equal(r.status,1);assert.equal(calls().length,2);assert.match(r.stdout,/main konnte nicht geholt werden/);
 // Feste alte Batchdatei belegt die urspruengliche Blockade am selben Bestand.
 const alt=git(['show','8ae1bdd:veroeffentlichen.bat']);fs.writeFileSync(path.join(work,'alt.bat'),alt.replace(/\n/g,'\r\n'));
 git(['--git-dir='+remote,'update-ref','refs/heads/main',freigegeben]);
 git(['remote','set-url','origin',remote],work);
 const gegen=run('cmd.exe',['/d','/c','call "'+path.join(work,'alt.bat')+'" --aus-temp "'+work+'"'],root,env);
 assert.notEqual(gegen.status,null);assert.match(gegen.stdout,/Loeschen oder verschieben/);assert.equal(calls().length,2);
 checks.push('feste Gegenprobe: alter Knopf blockiert, kein Firebase-Aufruf');
 console.log(checks.join('\n')+'\n9/9 Nachweise bestanden. Kein echter Deploy.');
}finally{
 const resolved=path.resolve(root),base=path.resolve(os.tmpdir());
 assert.equal(path.dirname(resolved).toLowerCase(),base.toLowerCase());assert.match(path.basename(resolved),/^adrabic-bat-test-/);
 // Node loescht ausschliesslich seine zuvor gepruefte private Test-Fixture.
 fs.rmSync(resolved,{recursive:true,force:true});
}

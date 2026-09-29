/* Lokale Diagnose: Produktdateien bleiben unveraendert. Originaltest,
   Originalgrenze; nur die gelieferte App-Quelle wird kontrolliert ersetzt. */
const fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),assert=require('node:assert/strict');
const repo=path.join(__dirname,'../../../..'),datei=path.join(repo,'plan/werkzeuge/pruefstand/t_bestand_tempo.js');
let quelle=fs.readFileSync(path.join(repo,'app.js'),'utf8');
if(process.argv.includes('--stand-47'))quelle=require('node:child_process').execFileSync('git',['show','a5ea99c:app.js'],{cwd:repo,encoding:'utf8',maxBuffer:1<<24});
function ersetze(alt,neu){assert.equal(quelle.split(alt).length,2,'Experimentstelle nicht eindeutig');quelle=quelle.replace(alt,neu);}
const art=process.argv[2];
if(art==='modebar'){
  ersetze('const altNav = app.querySelector(":scope > .nav");','const altNav = app.querySelector(":scope > .nav");\n  const altModus = app.querySelector(":scope > .modebar");');
  ersetze('huelleBehalten(altNav, ":scope > .nav");','huelleBehalten(altNav, ":scope > .nav");\n  huelleBehalten(altModus, ":scope > .modebar");');
}else if(art==='viewport-raf'){
  ersetze('if (typeof syncViewportGap === "function") syncViewportGap();','if (typeof syncViewportGap === "function") requestAnimationFrame(syncViewportGap);');
}else if(art==='viewport-stable'){
  ersetze('app.innerHTML = html;\n  huelleBehalten(altBar', 'const festeKarteVorher = !!app.querySelector(".view--modus > .study-card:not(.study-card--schreiben)");\n  app.innerHTML = html;\n  huelleBehalten(altBar');
  ersetze('if (typeof syncViewportGap === "function") syncViewportGap();','if (typeof syncViewportGap === "function" && !(festeKarteVorher && !overlayIstOffen && app.querySelector(".view--modus > .study-card:not(.study-card--schreiben)"))) syncViewportGap();');
}else if(art!=='original'&&art!=='trace')throw Error('Unbekannte Diagnosevariante');
let test=fs.readFileSync(datei,'utf8');
const anfang=test.indexOf('const quelle = '),ende=test.indexOf('// Separat messen:',anfang);
assert.ok(anfang>=0&&ende>anfang);
test=test.slice(0,anfang)+'const quelle = '+JSON.stringify(quelle)+';\n'+test.slice(ende);
process.env.PRUEF_KARTEN='3000';
if(art==='trace'||process.argv.includes('--trace')){
  const vor="await p.keyboard.press('3'); await p.waitForTimeout(1200);";
  assert.equal(test.split(vor).length,2);
  test=test.replace(vor,`const events=[];cdp.on('Tracing.dataCollected',e=>events.push(...e.value));
    await cdp.send('Tracing.start',{categories:'devtools.timeline,disabled-by-default-devtools.timeline',transferMode:'ReportEvents'});
    await p.keyboard.press('3'); await p.waitForTimeout(1200);
    const fertig=new Promise(r=>cdp.once('Tracing.tracingComplete',r));await cdp.send('Tracing.end');await fertig;
    fs.writeFileSync(path.join(require('node:os').tmpdir(),'adrabic-g037-trace.json'),JSON.stringify(events));
    console.log('TRACE lange Ereignisse',JSON.stringify(events.filter(e=>e.ph==='X'&&e.dur>15000).map(e=>({name:e.name,ms:e.dur/1000,args:e.args})).sort((a,b)=>b.ms-a.ms).slice(0,30)));`);
}
console.log('Diagnosevariante '+art+(process.argv.includes('--stand-47')?' / fest a5ea99c':'')+', originale Grenze 100 ms; keine Produktaenderung.');
const lauf=new Module(datei,module);lauf.filename=datei;lauf.paths=Module._nodeModulePaths(path.dirname(datei));lauf._compile(test,datei);

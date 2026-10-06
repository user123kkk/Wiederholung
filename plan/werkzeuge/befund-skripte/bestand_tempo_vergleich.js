/* Unveraenderter G-037-Test, nur App-Quelle aus festem Vergleichscommit.
   Keine andere Grenze, Attrappe oder Produktdatei. Nach Gesamtfolge seriell:
   node plan/werkzeuge/befund-skripte/bestand_tempo_vergleich.js */
const fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const repo=path.join(__dirname,'../../..'),datei=path.join(repo,'plan/werkzeuge/pruefstand/t_bestand_tempo.js');
const quelle=execFileSync('git',['show','c4a2ccf:app.js'],{cwd:repo,encoding:'utf8',maxBuffer:1<<24});
let test=fs.readFileSync(datei,'utf8');
const anfang=test.indexOf('const quelle = '),ende=test.indexOf('// Separat messen:',anfang);
assert.ok(anfang>=0&&ende>anfang,'Quellenaustausch nicht eindeutig gefunden');
test=test.slice(0,anfang)+'const quelle = '+JSON.stringify(quelle)+';\n'+test.slice(ende);
console.log('Fester Altvergleich c4a2ccf / 3.17.55, originale G-037-Grenze 100 ms.');
const lauf=new Module(datei,module);lauf.filename=datei;lauf.paths=Module._nodeModulePaths(path.dirname(datei));lauf._compile(test,datei);

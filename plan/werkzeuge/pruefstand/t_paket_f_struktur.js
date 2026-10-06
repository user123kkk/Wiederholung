/* Paket F: Befundkontrollen, Altstand fest 5af78a0. Keine Testgrenze geändert. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const root=path.join(__dirname,'../../..');
const read=f=>process.argv.includes('--gegenprobe')?execFileSync('git',['show','5af78a0:'+f],{cwd:root,encoding:'utf8'}):fs.readFileSync(path.join(root,f),'utf8');
const app=read('app.js'),css=read('styles.css');
const task=process.argv.find(x=>/^F\d+$/.test(x));
const checks={
 F2(){for(const n of ['rename-bereich','delete-bereich','edit-card','cancel-edit','delete-card','reverse-order','grade-weiter','streak-fortsetzen'])assert(!app.includes('case "'+n+'"'),n);for(const n of ['streakFortsetzen','streakRissZurueckliegtInTagen'])assert(!app.includes(n),n);assert(!css.includes('.karte-geist--weiter'));assert(app.includes('"gerissenAm", "vorher"'));assert(app.includes('if (false &&'));},
 F3(){assert(!app.includes('statsScope'));assert(!/\.pills?\b/.test(css));},
 F4(){assert(!/waehleStufe\(|startDrill\(|renderVerification\(|teilLinkPruefen|leseTeilLinkAusHash|Ueberspringen auf jedem/.test(app));},
 F11(){assert(!/drillVon|drillBis|drillAnker|setzeVollenStufenBereich|stufenBereichName/.test(app));},
};
for(const t of task?[task]:Object.keys(checks)){if(!checks[t])throw new Error('Unbekannte Aufgabe');checks[t]();console.log(t+' Struktur grün');}

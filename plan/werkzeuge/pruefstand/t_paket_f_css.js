/* F12: feste Klassenliste aus CODE-12; kein Toleranzwert. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'../../..');
const css=(process.argv.includes('--gegenprobe')?require('node:child_process').execFileSync('git',['show','5af78a0:styles.css'],{cwd:root,encoding:'utf8'}):fs.readFileSync(path.join(root,'styles.css'),'utf8')).replace(/\/\*[\s\S]*?\*\//g,'');
const names=['stack','stack-tight','rule','done-box','emoji','anim-fade','stat-kennzahl','stat-kennzahlen','on-surface','pill','pills','wahl-reihe','card--raised','card--accent','card--flush','positiv','negativ','progress-note','weiter-hinweis','sub','drill-banner','lern-kopf','card-tags-inline','legende-erklaerung','serie-klein','skeleton-zeile','topbar','who','sync-dot','einstieg-frage-klein','karte-geist--weiter'];
for(const name of names)assert(!new RegExp('\\.'+name+'(?![\\w-])').test(css),'Toter Selektor: '+name);
assert(/hr\s*\{/.test(css),'hr erhalten');
assert(css.includes('.study-flaeche--zurueck-weiter'),'lebende Rückkehrklasse erhalten');
console.log('F12: '+names.length+' tote Klassen entfernt; lebende Nachbarregeln erhalten.');

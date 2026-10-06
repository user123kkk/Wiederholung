// F12-Gegenprüfung: Wird eine der entfernten Klassen irgendwo erzeugt?
// Sucht den Namen als ganzes Klassenwort in allen ausgelieferten JS/HTML-Dateien
// (Kommentare in JS entfernt) und zeigt jede Fundzeile zum Lesen.
import fs from 'node:fs';
const names=['stack','stack-tight','rule','done-box','emoji','anim-fade','on-surface','wahl-reihe','card--raised','card--accent','card--flush','positiv','negativ','progress-note','weiter-hinweis','sub','drill-banner','lern-kopf','card-tags-inline','skeleton-zeile','topbar','who','sync-dot','einstieg-frage-klein'];
const files=fs.readdirSync('.').filter(f=>/\.(js|html)$/.test(f));
let treffer=0;
for(const f of files){
  let src=fs.readFileSync(f,'utf8');
  if(f.endsWith('.js'))src=src.replace(/\/\*[\s\S]*?\*\//g,m=>m.replace(/[^\n]/g,' ')).replace(/(^|[^:'"`\\])\/\/[^\n]*/g,(m,a)=>a);
  const zeilen=src.split('\n');
  for(const name of names){
    const re=new RegExp('(?<![\\w-])'+name.replace(/-/g,'\\-')+'(?![\\w-])');
    zeilen.forEach((z,i)=>{if(re.test(z)){treffer++;console.log(f+':'+(i+1)+' ['+name+'] '+z.trim().slice(0,160));}});
  }
}
console.log('Dateien: '+files.join(', ')+'\nFundzeilen gesamt: '+treffer);

// F12: ausschließlich die im CODE-12-Befund benannten unbenutzten Klassen.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {cssStruktur} from '../werkzeuge/css_struktur.mjs';
const names=['stack','stack-tight','rule','done-box','emoji','anim-fade','stat-kennzahl','stat-kennzahlen','on-surface','wahl-reihe','card--raised','card--accent','card--flush','positiv','negativ','progress-note','weiter-hinweis','sub','drill-banner','lern-kopf','card-tags-inline','legende-erklaerung','serie-klein','skeleton-zeile','topbar','who','sync-dot','einstieg-frage-klein'];
const pattern=new RegExp('\\.(?:'+names.join('|')+')(?![\\w-])');
const src=fs.readFileSync('styles.css','utf8');
assert.deepEqual(cssStruktur(src),[]);
const edits=[],stack=[];let boundary=0,quote='',comment=false;
for(let i=0;i<src.length;i++){
 const c=src[i],next=src[i+1];
 if(comment){if(c==='*'&&next==='/'){comment=false;i++;}continue;}
 if(quote){if(c==='\\'){i++;continue;}if(c===quote)quote='';continue;}
 if(c==='/'&&next==='*'){comment=true;i++;continue;}
 if(c==='"'||c==="'"){quote=c;continue;}
 if(c==='{'){if(stack.length)stack.at(-1).children=true;stack.push({start:boundary,brace:i,children:false});boundary=i+1;}
 else if(c==='}'){
  const rule=stack.pop();if(!rule)throw new Error('Ungepaarte Klammer');
  if(!rule.children){
   const head=src.slice(rule.start,rule.brace);
   const lead=head.match(/^(?:\s|\/\*[\s\S]*?\*\/)*/)[0];
   const selector=head.slice(lead.length).trim();
   if(!selector.startsWith('@')&&pattern.test(selector)){
    const selectors=selector.replaceAll(':not(.card--flush)','').split(',').map(s=>s.trim()).filter(s=>!pattern.test(s));
    edits.push({start:rule.start,end:i+1,text:lead+(selectors.length?selectors.join(',\n')+' '+src.slice(rule.brace,i+1):'')});
    console.log(selector+' => '+(selectors.join(', ')||'[entfernt]'));
   }
  }boundary=i+1;
 }else if(c===';')boundary=i+1;
}
let result=src;for(const e of edits.reverse())result=result.slice(0,e.start)+e.text+result.slice(e.end);
assert.deepEqual(cssStruktur(result),[]);assert(!pattern.test(result.replace(/\/\*[\s\S]*?\*\//g,'')));
const dest='plan/zyklus-2/paket-f-belege/styles-vor-f12.css';
if(fs.existsSync(dest))throw new Error('F12-Vorstand bereits gesichert');
fs.writeFileSync(dest,src);fs.writeFileSync('styles.css',result);
console.log('F12: '+edits.length+' Regelblöcke bereinigt, Struktur grün.');

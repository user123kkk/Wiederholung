// F13: verfolgte Dateien umziehen; Zielpfade prüfen und Verweise mitnehmen.
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root=process.cwd();
const moves=[
 ['plan/phase-1-datenzugriff/regeln-pruefung.mjs','plan/werkzeuge/regeln/regeln-pruefung.mjs'],
 ['plan/grossplan/befunde/werkzeuge','plan/werkzeuge/befund-skripte'],
 ...fs.readdirSync('plan',{withFileTypes:true}).filter(d=>d.isDirectory()&&d.name.startsWith('phase-')).map(d=>['plan/'+d.name,'plan/archiv/'+d.name]),
 ...['audit','redesign-oberflaeche','feedback-board'].map(d=>['plan/'+d,'plan/archiv/'+d]),
 ...['lehrer-modus','monetarisierung','analytics','landing-page-strategie'].map(d=>['plan/'+d,'plan/ideen/'+d]),
 ['plan/beobachtungen-lernwerkzeug.md','plan/archiv/beobachtungen-lernwerkzeug.md'],
 ...['CHATGPT-HANDOFF-2026-09-27.md','CLAUDE-HANDOFF-2026-09-29.md'].map(f=>['plan/onboarding/'+f,'plan/archiv/onboarding/'+f]),
 ['flower-isolated.png','plan/archiv/bilder/flower-isolated.png'],['icon.svg','plan/archiv/bilder/icon.svg'],
 ['plan/issue-10-ui-patch.diff','plan/archiv/ueberholt/issue-10-ui-patch.diff.txt'],
 ['KONZEPT-website-reife (gehört nicht zu den github dateien die ingesetzt werde).md','plan/archiv/ueberholt/KONZEPT-website-reife.md'],
];
const map=f=>{f=f.replaceAll('\\','/');const m=moves.find(([a])=>f===a||f.startsWith(a+'/'));return m?m[1]+f.slice(m[0].length):f;};
const safe=f=>{const p=path.resolve(root,f);if(!p.startsWith(root+path.sep))throw new Error('Pfad außerhalb des Repos: '+p);return p;};
const tracked=execFileSync('git',['ls-files','-z'],{encoding:'utf8'}).split('\0').filter(Boolean);
const extra=execFileSync('git',['ls-files','--others','--exclude-standard','-z'],{encoding:'utf8'}).split('\0').filter(f=>f&&!f.startsWith('plan/zyklus-2/paket-f-belege/'));
const files=[...new Set([...tracked,...extra])];
const changed=[];
for(const f of files){const dest=map(f);if(dest!==f&&fs.existsSync(safe(dest)))throw new Error('Ziel existiert: '+dest);}
for(const f of files){
 if(f.startsWith('plan/texte-lernen/')||f.startsWith('plan/zyklus-2/paket-f-'))continue; // Probelauf und einmalige Bauwerkzeuge unverändert.
 if(!/\.(md|js|mjs|cjs|sh|ps1|json)$/.test(f)||!fs.existsSync(safe(f)))continue;
 const original=fs.readFileSync(safe(f),'utf8'),dest=map(f),tokens=[];
 let text=original.replace(/\]\(([^\s)]+)\)/g,(all,url)=>{
  if(/^(?:[a-z]+:|#|\/)/i.test(url))return all;
  const [file,hash]=url.split('#'),old=path.relative(root,path.resolve(path.dirname(safe(f)),file)).replaceAll('\\','/');
  const neu=map(old),target=path.relative(path.dirname(safe(dest)),path.resolve(root,neu)).replaceAll('\\','/');
  const result=']('+target+(hash?'#'+hash:'')+')';tokens.push(result);return '@@F13LINK'+(tokens.length-1)+'@@';
 });
 // Relative Modul-/Werkzeugpfade und dirname-basierte Wurzeln mitnehmen.
 if(/\.(?:js|mjs|cjs)$/.test(f))text=text.replace(/(['"])(\.{1,2}\/[^'"\r\n]*)\1/g,(all,q,p)=>{
  const resolved=path.resolve(path.dirname(safe(f)),p);
  if(!fs.existsSync(resolved)||!(resolved===root||resolved.startsWith(root+path.sep)))return all;
  const old=path.relative(root,resolved).replaceAll('\\','/');const neu=old?map(old):'';
  const target=path.relative(path.dirname(safe(dest)),path.resolve(root,neu)).replaceAll('\\','/')||'.';
  return q+(target.startsWith('.')?target:'./'+target)+q;
 });
 for(const [a,b]of moves)text=text.split(a).join(b);
 text=text.replace(/@@F13LINK(\d+)@@/g,(_,n)=>tokens[Number(n)]);
 if(text!==original){fs.writeFileSync(safe(f),text);changed.push(f);}
}
for(const f of tracked){const dest=map(f);if(dest===f)continue;
 fs.mkdirSync(path.dirname(safe(dest)),{recursive:true});fs.renameSync(safe(f),safe(dest));console.log(f+' => '+dest);}
fs.writeFileSync('plan/zyklus-2/paket-f-belege/f13-umzug.json',JSON.stringify({moves,verweise:changed},null,2));
console.log('F13: '+changed.length+' Textdateien mit angepassten Verweisen. Geschütztes Texte-Verzeichnis unverändert.');

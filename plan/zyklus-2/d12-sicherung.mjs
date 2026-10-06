// D12: jede Minute den uncommitteten Stand sichern (Betreiber 06.10.: „jede Minute
// speichern, dass ich im Notfall direkt wechseln kann“). Keine Git-Änderung.
// Ein fester Zielordner wird überschrieben, damit nichts anwächst.
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root=process.cwd();
const ziel=path.resolve(root,'../Wiederholung-Belege/D12-2026-10-06-laufend');
const git=a=>execFileSync('git',a,{cwd:root,maxBuffer:64*1024*1024});
function sichern(){
  try{
    fs.mkdirSync(path.join(ziel,'dateien'),{recursive:true});
    fs.writeFileSync(path.join(ziel,'d12.patch'),git(['diff','--binary','HEAD']));
    const dateien=[...git(['diff','--name-only','-z','HEAD']).toString().split('\0'),
      ...git(['ls-files','--others','--exclude-standard','-z']).toString().split('\0')].filter(Boolean);
    for(const f of dateien){
      const src=path.resolve(root,f);
      if(!src.startsWith(root+path.sep)||!fs.existsSync(src)||!fs.statSync(src).isFile())continue;
      const dst=path.join(ziel,'dateien',f);fs.mkdirSync(path.dirname(dst),{recursive:true});fs.copyFileSync(src,dst);
    }
    const log=path.join(root,'plan/zyklus-2/d12-belege/gesamtlauf-2.log');
    const text=fs.existsSync(log)?fs.readFileSync(log,'utf8'):'';
    const stand={zeit:new Date().toLocaleString('de-DE'),head:git(['rev-parse','--short','HEAD']).toString().trim(),
      dateien:dateien.length,gesamtlaufGruen:(text.match(/^(EXIT 0|BEWAHRT)/gm)||[]).length,gesamtlaufRot:(text.match(/^ROT/gm)||[]).length,
      letzteZeile:text.trim().split('\n').pop()||'',weiter:'plan/zyklus-2/D12-UEBERGABE-2026-10-06.md'};
    fs.writeFileSync(path.join(ziel,'aktuell.json'),JSON.stringify(stand,null,2));
    fs.writeFileSync(path.join(root,'plan/zyklus-2/d12-belege/aktuell.json'),JSON.stringify(stand,null,2));
  }catch(e){fs.appendFileSync(path.join(root,'plan/zyklus-2/d12-belege/sicherung-fehler.log'),new Date().toISOString()+' '+e.message+'\n');}
}
sichern();setInterval(sichern,60000);

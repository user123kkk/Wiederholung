// Sicherung auf ausdrücklichen Betreiberauftrag; keine Git-Mutation.
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root = process.cwd();
const target = path.join(root, 'plan/zyklus-2/paket-f-belege');
fs.mkdirSync(target, {recursive:true});
function save() {
  const git = args => execFileSync('git', args, {cwd:root, maxBuffer:32*1024*1024});
  const stamp = new Date().toISOString().replace(/[:.]/g,'-');
  const dir = path.join(target, 'sicherungen', stamp);
  fs.mkdirSync(dir, {recursive:true});
  fs.writeFileSync(path.join(dir,'aenderungen.diff'), git(['diff','--binary','5af78a0']));
  fs.writeFileSync(path.join(dir,'status.txt'), git(['status','--short']));
  const files = new Set([...git(['diff','--name-only','-z','5af78a0']).toString().split('\0'),
    ...git(['ls-files','--others','--exclude-standard','-z']).toString().split('\0')]);
  for (const file of files) {
    if (!file || file.startsWith('plan/zyklus-2/paket-f-belege/')) continue;
    const src = path.resolve(root,file);
    if (!src.startsWith(root + path.sep)) throw new Error('Pfad außerhalb des Repos');
    if (!fs.existsSync(src) || !fs.statSync(src).isFile()) continue;
    const dst = path.join(dir,'dateien',file);
    fs.mkdirSync(path.dirname(dst),{recursive:true}); fs.copyFileSync(src,dst);
  }
  fs.writeFileSync(path.join(target,'aktuell.json'),JSON.stringify({zeit:new Date().toISOString(),
    head:git(['rev-parse','HEAD']).toString().trim(),sicherung:path.relative(root,dir)},null,2));
  console.log('Sicherung '+stamp);
}
save();
if (!process.argv.includes('--einmal')) setInterval(save,30000);

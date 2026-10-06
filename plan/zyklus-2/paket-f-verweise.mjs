// F13: neue defekte Markdown-/Modulverweise gegenüber festem Ausgang prüfen.
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root=process.cwd(),git=a=>execFileSync('git',a,{encoding:'utf8',maxBuffer:32e6});
const tracked=git(['ls-tree','-r','--name-only','5af78a0']).trim().split('\n');
const oldSet=new Set(tracked),moves=JSON.parse(fs.readFileSync('plan/zyklus-2/paket-f-belege/f13-umzug.json')).moves;
const map=f=>{const m=moves.find(([a])=>f===a||f.startsWith(a+'/'));return m?m[1]+f.slice(m[0].length):f;};
const relative=(file,url)=>path.relative(root,path.resolve(path.dirname(path.resolve(root,file)),url)).replaceAll('\\','/');
function links(s){return [...s.matchAll(/\]\((?:<([^>]+)>|([^\s)]+))\)/g)].map(m=>m[1]||m[2]).filter(u=>!/^([a-z]+:|#|\/)/i.test(u)).map(u=>decodeURI(u.split('#')[0]));}
const pre=[],fresh=[];
for(const old of tracked.filter(f=>f.endsWith('.md'))){
 const file=map(old);if(!fs.existsSync(file))continue;
 const original=git(['show','5af78a0:'+old]);
 const broken=new Set(links(original).map(u=>relative(old,u)).filter(f=>!oldSet.has(f)&&!tracked.some(p=>p.startsWith(f+'/'))));
 for(const url of links(fs.readFileSync(file,'utf8'))){const target=relative(file,url);if(fs.existsSync(target))continue;
  const item={file,url,target};if([...broken].some(b=>map(b)===target||b===target))pre.push(item);else fresh.push(item);
 }
}
const moduleMissing=[];
for(const old of tracked.filter(f=>/\.(js|mjs|cjs)$/.test(f))){const file=map(old);if(file===old||!fs.existsSync(file))continue;
 const src=fs.readFileSync(file,'utf8');for(const m of src.matchAll(/(?:require\(|from\s+)(['"])(\.{1,2}\/[^'"\n]+)\1/g)){
  const target=relative(file,m[2]);if(!fs.existsSync(target)&&!fs.existsSync(target+'.js'))moduleMissing.push({file,target});
 }
}
const result={neueDefekteVerweise:fresh,vorherBereitsDefekt:pre,moduleMissing};
fs.writeFileSync('plan/zyklus-2/paket-f-belege/f13-verweise.json',JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));if(fresh.length||moduleMissing.length)process.exitCode=1;

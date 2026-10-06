// Einzelprüfungen mit dauerhaften Logs; kein Gesamtlauf/Tempo/Deploy.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawn} from 'node:child_process';
import {createHash} from 'node:crypto';
const root=process.cwd(),pruef=path.join(root,'plan/werkzeuge/pruefstand');
const [tag,waitPid,startBei]=process.argv.slice(2);
if(!/^[a-z0-9-]+$/.test(tag||''))throw new Error('Eindeutiger Laufname erforderlich');
const out=path.join(root,'plan/zyklus-2/paket-f-belege',tag);
if(fs.existsSync(out))throw new Error('Original-Lauf existiert bereits');
fs.mkdirSync(out,{recursive:true});
const files=['app.js','styles.css','index.html','sw.js','firestore.rules','datenschutzerklaerung.html'];
const hash=()=>{const h=createHash('sha256');for(const f of files)h.update(f).update(fs.readFileSync(path.join(root,f)));return h.digest('hex');};
const basis=hash(),result={quelle:basis,start:new Date().toISOString(),aktiv:'wartet auf Foto-Vorstand',tests:[]};
const save=()=>fs.writeFileSync(path.join(out,'status.json'),JSON.stringify(result,null,2));save();
if(waitPid&&waitPid!=='0'){while(true){try{process.kill(Number(waitPid),0);}catch{break;}await new Promise(r=>setTimeout(r,5000));}
 const log=fs.readFileSync(path.join(root,'plan/zyklus-2/paket-f-belege/f12-voll-vor.log'),'utf8');
 if((log.match(/aufnehmen grün/g)||[]).length!==36||/Error|AssertionError/.test(log))throw new Error('Foto-Vorstand nicht vollständig grün');}
const cases=[
 ['f12-fotovergleich','x_paket_f_fotos.js','vergleichen','f12-voll-1'],
 ['f-texte','t_paket_f_texte.js'],['f-ebenen','t_paket_f_ebenen.js'],
 ['f-netz','t_paket_f_netz.js'],['kontrast','t_kontrast.js'],
 ['a11y','t_a11y.js'],['gross-alle','t_gross_alle.js'],
 ['ueben','t_ueben.js'],['ueben-auswahl','t_ueben_auswahl.js'],
 ['import-stapel','t_import_stapel.js'],['import-doppelt','t_import_doppelt.js'],
 ['import-einwilligung','t_import_einwilligung.js'],['konto-fortsetzungen','t_konto_fortsetzungen.js'],
 ['runde','abnahme_runde.js'],['affe-handy','affe.js','handy','200','7'],
 ['affe-ipad','affe.js','ipad','150','7'],
];
const copyRunde=dir=>{const src=path.join(os.tmpdir(),'adrabic-rundenabnahme');if(fs.existsSync(src)){fs.mkdirSync(dir,{recursive:true});for(const f of fs.readdirSync(src))if(fs.statSync(path.join(src,f)).isFile())fs.copyFileSync(path.join(src,f),path.join(dir,f));}};
copyRunde(path.join(out,'rundenlogs-vorher'));
let folge=cases;
if(startBei){const i=cases.findIndex(c=>c[0]===startBei);if(i<0)throw new Error('Unbekannter Fortsetzungsschritt');
 result.bereitsGeprueft='F12 separat zweimal rot, zurückgenommen; keine Paketgesamtabnahme';folge=cases.slice(i);save();}
for(const [name,file,...args]of folge){
 if(hash()!==basis)throw new Error('Produktstand während Prüfung geändert');
 result.aktiv=name;save();console.log('START '+name);
 const log=fs.createWriteStream(path.join(out,name+'.log'));
 const child=spawn(process.execPath,['--require',path.join(pruef,'pruef_cleanup.js'),file,...args],{
  cwd:pruef,windowsHide:true,env:{...process.env,F_FOTO_QUELLE:'',AFFE_TEXTE:'1',PRUEF_BILDER:path.join(out,'bilder')},
 });
 child.stdout.pipe(log,{end:false});child.stderr.pipe(log,{end:false});
 let copyTimer=name==='runde'?setInterval(()=>copyRunde(path.join(out,'rundenlogs')),3000):null;
 const start=Date.now();const code=await new Promise((resolve,reject)=>{child.on('error',reject);child.on('close',resolve);});
 if(copyTimer){clearInterval(copyTimer);copyRunde(path.join(out,'rundenlogs'));}
 await new Promise(r=>log.end(r));
 result.tests.push({name,file,args,code,sekunden:Math.round((Date.now()-start)/1000)});save();console.log('ENDE '+name+' Exit '+code);
 if(code!==0){result.aktiv='angehalten: '+name;save();process.exitCode=1;break;}
}
if(!process.exitCode){result.aktiv='Einzelprüfungen beendet; Ausgaben vollständig lesen';result.ende=new Date().toISOString();save();}

/* Runde15: konkrete Kontowechselfehler und normale Abschluesse.
   Vollstaendige Browserfaelle plus isolierte Promise-Reihenfolgen; feste
   Alt-Gegenproben zeigen die Wirkung, statt bloess alten Quelltext zu suchen. */
const {spawnSync}=require('node:child_process');
const path=require('node:path');
const ordner=path.join(__dirname,'../../grossplan/befunde/werkzeuge');
for(const [name,args] of [
 ['konto_authrest_normal.js',[]],['konto_authrest.js',[]],['konto_authrest.js',['--gegenprobe']],
 ['konto_adressdialog.js',[]],['konto_adressdialog.js',['--gegenprobe']],
 ['konto_adressdialog_app.js',[]],['konto_adressdialog_app.js',['--gegenprobe']],
 ['konto_entwuerfe.js',[]],['konto_entwuerfe.js',['--gegenprobe']],
 ['konto_registrierungsnachtrag_app.js',[]],['konto_registrierungsnachtrag_app.js',['--gegenprobe']],
 ['konto_authrest_app.js',[]],['konto_authrest_app.js',['--gegenprobe']]
]){
 console.log('\n== '+name+' '+args.join(' '));
 const r=spawnSync(process.execPath,[path.join(ordner,name),...args],{encoding:'utf8',env:process.env,timeout:180000,windowsHide:true});
 process.stdout.write(r.stdout||'');process.stderr.write(r.stderr||'');
 if(r.error||r.status!==0){console.error(r.error||('Exit '+r.status));process.exit(1);}
}

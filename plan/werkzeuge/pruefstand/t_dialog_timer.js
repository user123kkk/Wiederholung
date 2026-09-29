/* Echter closeDialog-Callback: alter Austritts-Timer darf einen spaeter
   geoeffneten Dialog nicht entfernen, muss aber sein eigenes Promise
   aufloesen (3.17.52: 3.17.51 liess den Aufrufer sonst ewig warten).
   Altstand fest 5de6969. */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const {execFileSync}=require('node:child_process');
const repo=path.join(__dirname,'../../..');
for(const alt of [true,false]){
 const source=alt?execFileSync('git',['show','5de6969:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
 const von=source.indexOf('function closeDialog(result) {'),bis=source.indexOf('/* Ergebnis je nach Art:',von);
 assert.ok(von>=0&&bis>von);let timer,renders=0,antworten=0;
 const a={resolve:()=>antworten++},b={resolve:()=>{throw new Error('Neuer Dialog darf nicht abgeschlossen werden');}};
 const dlg={parentElement:{classList:{contains:()=>true}}};
 const sandbox={ui:{dialog:a},app:{querySelector:()=>dlg},render:()=>renders++,spielAustrittsAnimation:(d,h,f)=>{timer=f;}};
 vm.createContext(sandbox);vm.runInContext(source.slice(von,bis),sandbox);
 sandbox.closeDialog(true);sandbox.ui.dialog=b;timer();
 if(alt){assert.equal(sandbox.ui.dialog,null);assert.equal(renders,1);assert.equal(antworten,1);}
 else{assert.equal(sandbox.ui.dialog,b);assert.equal(renders,0);assert.equal(antworten,1,'alter Dialog muss aufgeloest werden');}
 console.log(alt?'OK  Gegenprobe: alter Timer entfernt neuen Dialog.':'OK  Alter Timer laesst neuen Dialog unveraendert und loest den alten auf.');
}

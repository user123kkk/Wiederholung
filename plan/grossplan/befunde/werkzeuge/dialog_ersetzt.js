/* Neue Dialoge muessen einen bisherigen Aufrufer als Abbruch aufloesen.
   --befund zeigt den haengenden alten Aufrufer, --gegenprobe fest a4b5677.
   Der Sollzustand verlangt immer eine beendete alte Promise. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const repo=path.join(__dirname,'../../../..'),alt=process.argv.includes('--befund')||process.argv.includes('--gegenprobe');
const source=process.argv.includes('--gegenprobe')?require('node:child_process').execFileSync('git',['show','a4b5677:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
function lesen(a,b){const x=source.indexOf(a),y=source.indexOf(b,x);assert.ok(x>=0&&y>x);return source.slice(x,y);}
(async()=>{for(const kind of ['confirm','prompt','alert']){
 const ctx=vm.createContext({ui:{dialog:null},render(){},requestAnimationFrame(){},document:{getElementById(){return null;}}});
 vm.runInContext(lesen('function dialogResult(d, ok)','function dlgAlert(')+lesen('function openDialog(cfg)','/* Beobachtung 19/9:'),ctx);
 let beendet=false,wert;
 const erster=ctx.openDialog({kind,text:'Erste Frage',value:'Privat A'}).then(x=>{beendet=true;wert=x;});
 const zweiter=ctx.openDialog({kind:'confirm',text:'Zweite Frage'});
 const d=ctx.ui.dialog;await new Promise(r=>setImmediate(r));
 assert.equal(beendet,!alt,'Der bisherige Aufrufer muss abgeschlossen sein');
 if(!alt){await erster;assert.equal(wert,kind==='confirm'?false:kind==='prompt'?null:undefined);}
 assert.equal(ctx.ui.dialog,d);assert.equal(d.text,'Zweite Frage');
 d.resolve(true);assert.equal(await zweiter,true);
 console.log(JSON.stringify({kind,ersterBeendet:beendet,abbruchwert:wert,zweiterErhalten:true,alt}));
}})().catch(e=>{console.error(e);process.exitCode=1;});

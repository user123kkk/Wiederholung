/* G-099: aufgezeichnete Touch-Zeiten in den echten Pointer-Listener und
   wischEnde einspeisen. Kein Browser-Timing, keine nachgebaute Tempoformel.
   --gegenprobe: derselbe Quelltext aus c3a6aec muss die alten Fehler zeigen. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const repo=path.join(__dirname,'../../..'),alt=process.argv.includes('--gegenprobe');
const source=alt?execFileSync('git',['show','c3a6aec:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
function teil(von,bis){const a=source.indexOf(von),b=source.indexOf(bis,a);assert.ok(a>=0&&b>a,`${von}: Quelle fehlt`);return source.slice(a,b);}
const listener=teil('app.addEventListener("pointermove", e => {','function wischEnde(e) {');
const ende=teil('function wischEnde(e) {','app.addEventListener("pointerup", wischEnde);');
const helper=source.includes('function wischTempo(')?teil('function wischTempo(','app.addEventListener("pointerdown", e => {'):'';
const faelle=[
  // Aus der fehlgeschlagenen Browser-Spur: letzte 13.75px allein <0.45,
  // durchgehendes Fenster der Bewegung >0.45. Beide Richtungen betroffen.
  ['aufgezeichnet links',[[48,-13.75],[64.3,-27.5],[81,-41.25],[114.5,-55]],118.4,'pointerup','unknown',true],
  ['aufgezeichnet rechts',[[48,13.75],[64.3,27.5],[81,41.25],[114.5,55]],118.4,'pointerup','known',true],
  ['kurz schnell, danach stillhalten',[[20,13.75],[40,27.5],[60,41.25],[80,55]],230,'pointerup',null,true],
  ['kurz langsam',[[100,15],[200,30],[300,45],[400,55]],405,'pointerup',null,false],
  ['Systemabbruch',[[20,20],[40,40],[60,55]],65,'pointercancel',null,false],
  ['weit, langsam',[[100,30],[200,60],[300,90],[400,150]],600,'pointerup','known',false],
];
for(const[name,punkte,zeit,type,soll,alterFehler]of faelle){
  let jetzt=0;const handlers={};
  const karte={style:{},classList:{add(){},remove(){},toggle(){}},setPointerCapture(){}};
  const w={x:0,y:0,id:1,karte,breite:366,erfasst:false,dx:0,zeit:0,tempo:alt?0:null,bereit:false,spurX:0,spurT:0,spur:[{x:0,t:0}]};
  const s={app:{addEventListener(t,f){handlers[t]=f;}},wischStart:w,wischFrame:null,wischBewertung:false,wischAusstehend:null,
    WISCH_TEMPO:0.45,WISCH_FLING_MIN:40,WISCH_WEG:0.26,
    performance:{now:()=>jetzt},requestAnimationFrame:()=>1,cancelAnimationFrame(){},fuehlbar(){},
    setTimeout:()=>1,gradeKnown(){},gradeUnknown(){}};
  vm.createContext(s);vm.runInContext('function wischSchwelle(b){return Math.min(100,b*WISCH_WEG);}\n'+helper+listener+ende,s);
  for(const[t,x]of punkte){jetzt=t;handlers.pointermove({pointerId:1,clientX:x,clientY:0,preventDefault(){}});}
  jetzt=zeit;s.wischEnde({pointerId:1,type});
  const ist=s.wischAusstehend?.art||null;
  if(alt&&alterFehler)assert.notEqual(ist,soll,`Gegenprobe muss ${name} reproduzieren`);
  else assert.equal(ist,soll,name);
  console.log(`OK  ${alt?'Gegenprobe':'Tempo'}: ${name} -> ${ist||'keine Bewertung'}.`);
}

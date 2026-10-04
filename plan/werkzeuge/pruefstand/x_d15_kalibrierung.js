/* Unabhängige D15-Normalprobe: eine lineare Fläche, keine App. */
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {start}=require('./lib');
(async()=>{const root=path.join(os.tmpdir(),'paket-d15-kalibrierung-'+Date.now());fs.mkdirSync(root);console.log(root);const b=await start();try{
for(let i=0;i<4;i++){
const c=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});try{
const p=await c.newPage();await p.setContent('<style>body{margin:0;background:#111}#f{height:400px;background:white;animation:fade 280ms linear both;animation-play-state:paused}@keyframes fade{from{opacity:0}to{opacity:1}}</style><div id="f"></div>');
await p.evaluate(()=>{window.mess=[];let start=performance.now();function bild(t){mess.push({t,op:+getComputedStyle(document.querySelector('#f')).opacity});if(t-start<1500)requestAnimationFrame(bild);}requestAnimationFrame(bild);setTimeout(()=>{requestAnimationFrame(()=>{getComputedStyle(document.querySelector('#f')).opacity;requestAnimationFrame(()=>document.querySelector('#f').style.animationPlayState='running');});},320);});
await p.waitForTimeout(1700);const xs=await p.evaluate(()=>mess);fs.writeFileSync(path.join(root,i+'.json'),JSON.stringify(xs,null,2));
const paare=xs.slice(1).map((x,j)=>({dt:x.t-xs[j].t,do:x.op-xs[j].op}));console.log(i,JSON.stringify({maxPause:Math.max(...paare.map(x=>x.dt)),maxSprung:Math.max(...paare.map(x=>x.do)),rot:paare.filter(x=>x.do>.2)}));
}finally{await c.close();}
}
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

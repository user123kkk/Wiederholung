/* D12: wiederholbare Kontrolle derselben Seite mit beiden gesicherten Quellen. */
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {start,neueSeite,aktion,GERAETE,vollerStore}=require('./lib');
const root=path.join(os.tmpdir(),'paket-d-d12-diagnose-20261003');fs.mkdirSync(root,{recursive:true});
(async()=>{const b=await start();try{
for(const quelle of ['vor','abgelehnt','vor','abgelehnt']){
 const dir=path.join(os.tmpdir(),quelle==='vor'?'paket-d-d12-vor-20261003':'paket-d-d12-abgelehnt-20261003');
 const {p,ctx}=await neueSeite(b,{...GERAETE.handy,width:320,height:568},{store:vollerStore(),vorher:async c=>{
 await c.addInitScript(()=>navigator.serviceWorker.register=()=>Promise.reject(new Error('ohne Worker')));
 for(const f of ['app.js','styles.css'])await c.route(u=>u.hostname==='127.0.0.1'&&u.pathname.endsWith('/'+f),r=>r.fulfill({body:fs.readFileSync(path.join(dir,f),'utf8'),contentType:f.endsWith('.js')?'text/javascript':'text/css'}));
 }});
 try{
 await aktion(p,'einstellungen');await aktion(p,'einst-seite','konto-loeschen');
 for(let i=0;i<3;i++){
 await p.evaluate(async()=>{await document.fonts.ready;for(const a of document.getAnimations()){if(a.effect.getComputedTiming().endTime!==Infinity)a.finish();else{a.pause();a.currentTime=0;}}});
 await p.waitForTimeout(800);
 const n=quelle+'-'+Date.now()+'-'+i;
 fs.writeFileSync(path.join(root,n+'.json'),JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('#app *')].map(e=>({tag:e.tagName,klasse:e.className,rect:e.getBoundingClientRect().toJSON(),style:[...getComputedStyle(e)].map(k=>[k,getComputedStyle(e).getPropertyValue(k)])})))));
 await p.screenshot({path:path.join(root,n+'.png'),fullPage:true});console.log(n);
 }
 }finally{await ctx.close();}
}
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

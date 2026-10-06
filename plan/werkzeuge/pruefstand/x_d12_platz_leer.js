/* D12-Diagnose: Welche berechneten Eigenschaften der unsichtbaren Platzhalter-Antwort
   (.study-answer.platz-leer) unterscheiden sich zwischen Vorstand und D12? Kein Abnahmetest. */
const fs=require('node:fs'),path=require('node:path');
const {start,neueSeite,aktion,GERAETE,vollerStore}=require('./lib');
const repo=path.resolve(__dirname,'../../..'),B=path.join(repo,'plan/zyklus-2/d12-belege');
(async()=>{const b=await start();try{
  const lies=async(css,app)=>{
    const {p,ctx}=await neueSeite(b,GERAETE.handy,{ruhig:true,store:vollerStore({thema:'hell'}),ls:{'adrabic-thema':'hell'},vorher:async ctx=>{
      await ctx.addInitScript(()=>{navigator.serviceWorker.register=()=>Promise.reject(new Error('ohne Worker'));});
      await ctx.route(u=>u.pathname.endsWith('/styles.css'),r=>r.fulfill({body:css,contentType:'text/css'}));
      if(app)await ctx.route(u=>u.pathname.endsWith('/app.js'),r=>r.fulfill({body:app,contentType:'text/javascript'}));
    }});
    try{await aktion(p,'start-session');await p.waitForTimeout(1200);
      return await p.evaluate(()=>{const e=document.querySelector('.study-answer.platz-leer');const cs=getComputedStyle(e);const o={};for(let i=0;i<cs.length;i++)o[cs[i]]=cs.getPropertyValue(cs[i]);return o;});
    }finally{await ctx.close();}
  };
  const a=await lies(fs.readFileSync(path.join(B,'styles-vor-d12.css'),'utf8'),fs.readFileSync(path.join(B,'app-vor-d12.js'),'utf8'));
  const n=await lies(fs.readFileSync(path.join(repo,'styles.css'),'utf8'),null);
  const namen=Object.keys(a).filter(k=>a[k]!==n[k]);
  console.log('verschieden: '+namen.length);
  for(const k of namen)console.log(k+' | alt: '+String(a[k]).slice(0,120)+' | neu: '+String(n[k]).slice(0,120));
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

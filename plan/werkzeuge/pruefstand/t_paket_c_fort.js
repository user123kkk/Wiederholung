/* Feste Gegenprobe b60abf4 vor Paket C. --alt: dieselbe Abnahme rot. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const {start,neueSeite,aktion,GERAETE} = require('./lib');
const alt=process.argv.includes('--alt');
const repo=path.resolve(__dirname,'../../..');
(async()=>{
 const b=await start();
 try {
  for(const vp of [GERAETE.handy,{...GERAETE.handy,width:320,height:568},GERAETE.ipad])
   for(const thema of ['hell','dunkel']) for(const ruhig of [false,true]) {
    const {p,ctx}=await neueSeite(b,vp,{thema,ruhig,vorher:async ctx=>{
      await ctx.addInitScript(()=>{navigator.serviceWorker.register=()=>Promise.reject(new Error('Test ohne Worker'));});
      for(const datei of ['app.js','styles.css']) {
       const body=alt?execFileSync('git',['show','b60abf4:'+datei],{cwd:repo,encoding:'utf8',maxBuffer:4e6}):fs.readFileSync(path.join(repo,datei),'utf8');
       await ctx.route(u=>u.hostname==='127.0.0.1'&&u.pathname.endsWith('/'+datei),r=>r.fulfill({body,contentType:datei.endsWith('.js')?'text/javascript':'text/css'}));
      }
    }});
    try {
     await aktion(p,'tab-fortschritt',null,700);
     assert.equal(await p.locator('.trend-pill').count(),0,'C2 falscher Wochenvergleich');
     assert.equal(await p.locator('.wochen-kopf .gross-zahl').count(),0,'C2 Antworten noch Hauptzahl');
     assert.ok(await p.locator('.wochen-kopf').innerText().then(t=>t.includes('Antworten in den letzten 7 Tagen')));
     assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
     assert.deepEqual(p.fehler,[]);
     console.log('C2 grün',vp.width,thema,ruhig);
    } finally {await ctx.close();}
   }
 } finally {await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

/* C17: Tag -25 bleibt an jedem Wochentag im echten Raster.
   --alt prueft festen Vorstand b60abf4. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const {start, neueSeite, aktion, GERAETE, vollerStore, tag} = require('./lib');
const repo = path.resolve(__dirname, '../../..');
const alt = process.argv.includes('--alt');
(async () => {
  const browser = await start();
  try {
    for (const vp of [GERAETE.handy, {...GERAETE.handy,width:320,height:568}, GERAETE.ipad]) {
      for (const thema of ['hell','dunkel']) for (const ruhig of [false,true]) for (let versatz=0;versatz<7;versatz++) {
        const store = vollerStore({thema});
        const iso = tag(versatz-25);
        store['users/u1'].verlauf = {[iso]:{w:1,n:0}};
        const {p,ctx} = await neueSeite(browser,vp,{store,ruhig,tagVersatz:versatz,vorher:async ctx=>{
          await ctx.addInitScript(()=>{navigator.serviceWorker.register=()=>Promise.reject(new Error('Test ohne Worker'));});
          const body=alt?execFileSync('git',['show','b60abf4:app.js'],{cwd:repo,encoding:'utf8',maxBuffer:4e6}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
          await ctx.route(u=>u.hostname==='127.0.0.1'&&u.pathname.endsWith('/app.js'),r=>r.fulfill({body,contentType:'text/javascript'}));
        }});
        try {
          await aktion(p,'tab-fortschritt');
          const datum=Number(iso.slice(8))+'.'+Number(iso.slice(5,7))+'.';
          assert.equal(await p.locator('.kal-tag[title^="'+datum+'"]').count(),1,'C17 Tag -25 fehlt, Versatz '+versatz);
          assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Querscrollen');
          assert.deepEqual(p.fehler,[]);
          console.log('C17 grün',vp.width,thema,ruhig,'Tagversatz',versatz);
        }finally{await ctx.close();}
      }
    }
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

/* Sitzungsspezifischer Bereichszaehler beim Kontowechsel. Zwei nichtleere
   Bereiche erzwingen die Bereichsanzeige, statt den globalen Verlauf zu lesen.
   --befund aktuell; --gegenprobe fester Stand a4b5677. Nur SDK-Attrappe. */
const {start,vollerStore,tag}=require('../../../werkzeuge/pruefstand/lib');
const {APP,AUTH,FS}=require('../../../werkzeuge/pruefstand/stubs');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const repo=path.join(__dirname,'../../../..'),alt=process.argv.includes('--befund')||process.argv.includes('--gegenprobe');
const source=process.argv.includes('--gegenprobe')?require('node:child_process').execFileSync('git',['show','a4b5677:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
(async()=>{const b=await start();try{
 const store=vollerStore();store['users/u1/karten/k40']={...store['users/u1/karten/k4'],wort:'Zweites Gebiet',bereichId:'b2',order:0};
 for(const[k,v]of Object.entries({...store}))if(k.startsWith('users/u1'))store[k.replace('users/u1','users/u2')]=structuredClone(v);
 delete store['users/u2'].verlauf[tag(0)];
 const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'}),p=await ctx.newPage(),errors=[];
 p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(s=>{window.__START_STORE=s;window.__START_USER={uid:'u1',email:'a@example.com',emailVerified:true};},store);
 await p.route('**/www.gstatic.com/**',r=>r.fulfill({contentType:'text/javascript',body:r.request().url().includes('auth')?AUTH:r.request().url().includes('firestore')?FS:APP}));
 await p.route('**/app.js?*',r=>r.fulfill({contentType:'text/javascript',body:source+`
  window.__PRUEF={bereit:uid=>currentUser?.uid===uid&&bereiche!==null&&bereiche.length===2&&bereiche.every(x=>x.karten.length>0)&&!document.querySelector('.boot'),
   zaehlen:()=>{bereichHeuteZaehle('b1',1);render();},
   stand:()=>heuteAnteil(currentBereich().karten,currentBereich().id),
   wechsel:()=>{const s=window.__FB;s.user={uid:'u2',email:'b@example.com',emailVerified:true,getIdToken:()=>Promise.resolve('tok'),reload:()=>Promise.resolve()};s.authListeners.forEach(cb=>cb(s.user));}};` }));
 await p.goto('http://127.0.0.1:8099/index.html');await p.waitForFunction(()=>window.__PRUEF?.bereit('u1'));
 await p.evaluate(()=>window.__PRUEF.zaehlen());assert.equal((await p.evaluate(()=>window.__PRUEF.stand())).getan,1);
 await p.evaluate(()=>window.__PRUEF.wechsel());await p.waitForFunction(()=>window.__PRUEF.bereit('u2'));
 const stand=await p.evaluate(()=>window.__PRUEF.stand());assert.equal(stand.getan,alt?1:0);assert.deepEqual(errors,[]);
 await p.evaluate(()=>window.__PRUEF.zaehlen());const eigeneBAntwort=await p.evaluate(()=>window.__PRUEF.stand());assert.equal(eigeneBAntwort.getan,alt?2:1);
 console.log(JSON.stringify({stand,eigeneBAntwort,alt}));await ctx.close();
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

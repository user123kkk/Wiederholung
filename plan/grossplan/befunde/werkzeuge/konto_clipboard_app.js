/* Spaete Clipboard-Antwort: alter Kopierdialog darf B weder eine fremde
   Fehlermeldung zeigen noch mit seinem Timer neu zeichnen. SDK/Clipboard
   kontrolliert, keine Produktionskonten und keine echte Zwischenablage.
   --befund aktuell, --gegenprobe fester Stand a4b5677. */
const {start,vollerStore}=require('../../../werkzeuge/pruefstand/lib');
const {APP,AUTH,FS}=require('../../../werkzeuge/pruefstand/stubs');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const repo=path.join(__dirname,'../../../..'),alt=process.argv.includes('--befund')||process.argv.includes('--gegenprobe');
const source=process.argv.includes('--gegenprobe')?require('node:child_process').execFileSync('git',['show','a4b5677:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
(async()=>{const b=await start();try{for(const fall of ['fehler','timer']){
 const store=vollerStore();for(const[k,v]of Object.entries({...store}))if(k.startsWith('users/u1'))store[k.replace('users/u1','users/u2')]=structuredClone(v);
 const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'}),p=await ctx.newPage(),errors=[];
 p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(s=>{window.__START_STORE=s;window.__START_USER={uid:'u1',email:'a@example.com',emailVerified:true};
  Object.defineProperty(navigator,'clipboard',{value:{writeText:()=>new Promise((ok,nein)=>window.__COPY={ok,nein})}});},store);
 await p.route('**/www.gstatic.com/**',r=>r.fulfill({contentType:'text/javascript',body:r.request().url().includes('auth')?AUTH:r.request().url().includes('firestore')?FS:APP}));
 await p.route('**/app.js?*',r=>r.fulfill({contentType:'text/javascript',body:source+`
  const pruefRender=render;render=()=>{window.__RENDERC=(window.__RENDERC||0)+1;return pruefRender();};
  window.__PRUEF={bereit:uid=>currentUser?.uid===uid&&bereiche!==null&&!document.querySelector('.boot'),
   dialog:()=>{openDialog({kind:'code',title:'Teilen',text:'Code A',code:'TEST-ABCDE'});},
   wechsel:()=>{const s=window.__FB;s.user={uid:'u2',email:'b@example.com',emailVerified:true,getIdToken:()=>Promise.resolve('tok'),reload:()=>Promise.resolve()};s.authListeners.forEach(cb=>cb(s.user));},
   eigenerDialog:()=>{dlgAlert('Eigene Meldung B');},
   stand:()=>({text:ui.dialog?.text||null,render:window.__RENDERC||0})};` }));
 await p.goto('http://127.0.0.1:8099/index.html');await p.waitForFunction(()=>window.__PRUEF?.bereit('u1'));
 await p.evaluate(()=>window.__PRUEF.dialog());await p.locator('[data-action="code-copy-clipboard"]').click();await p.waitForFunction(()=>!!window.__COPY);
 await p.evaluate(()=>window.__PRUEF.wechsel());await p.waitForFunction(()=>window.__PRUEF.bereit('u2'));await p.waitForTimeout(150);
 await p.evaluate(()=>window.__PRUEF.eigenerDialog());await p.waitForTimeout(250);
 await p.evaluate(f=>{window.__RENDERC=0;if(f==='fehler')window.__COPY.nein(Error('Kopieren abgelehnt'));else window.__COPY.ok();},fall);
 await p.waitForTimeout(fall==='timer'?2200:120);
 const st=await p.evaluate(()=>window.__PRUEF.stand());
 assert.equal(st.text,alt&&fall==='fehler'?'Konnte nicht in die Zwischenablage kopieren.':'Eigene Meldung B');
 assert.equal(st.render,alt?1:0);assert.deepEqual(errors,[]);console.log(JSON.stringify({fall,st,alt}));await ctx.close();
}}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

/* Paket D: feste Gegenprobe 50d15ce (3.18.13), nie HEAD. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const {start,neueSeite,aktion,GERAETE} = require('./lib');
const alt = process.argv.includes('--alt');
const aufgabe = process.argv.find(a=>/^D\d+$/.test(a));
const repo = path.resolve(__dirname,'../../..');
async function seite(b,vp,opt={}) {
  return neueSeite(b,vp,{...opt,vorher:async ctx=>{
    await ctx.addInitScript(bootMessen=>{
      navigator.serviceWorker.register=()=>Promise.reject(new Error('Prüfung ohne Worker'));
      window.__edgeFrames=0;
      const raf=window.requestAnimationFrame;
      window.requestAnimationFrame=function(f){return raf.call(this,t=>{if(f.name==='edgeScrollTick')__edgeFrames++;f(t);});};
      if(bootMessen){
        window.__bootBilder=[];window.__bootTimer=null;
        const timer=window.setTimeout;
        window.setTimeout=function(f,ms,...args){
          const boot=document.querySelector('.boot.boot--exit');
          if(boot&&(f.name==='render'||String(f).includes('boot.remove()')))
            __bootTimer={ms,css:getComputedStyle(boot).transitionDuration};
          return timer.call(this,f,ms,...args);
        };
        const start=performance.now();let gesehen=false;
        function bild(t){
          const boot=document.querySelector('.boot'),view=document.querySelector('#app > .view');
          if(boot)gesehen=true;
          if(gesehen)__bootBilder.push({t,art:boot?'boot':view?'view':'leer',op:boot?+getComputedStyle(boot).opacity:view?+getComputedStyle(view).opacity:0});
          if(t-start<5000)requestAnimationFrame(bild);
        }requestAnimationFrame(bild);
      }
    },!!opt.bootMessen);
    for(const f of ['app.js','styles.css']) {
      let body=alt?execFileSync('git',['show','50d15ce:'+f],{cwd:repo,encoding:'utf8',maxBuffer:4e6}):fs.readFileSync(path.join(repo,f),'utf8');
      if(f==='app.js') body+='\nwindow.__D={render,dlgConfirm,closeDialog,startSession,startLernen,currentBereich,gradeCard,revealAnswer,zeigeToast,scrollGradeRowIntoView,get ui(){return ui;}};';
      await ctx.route(u=>u.hostname==='127.0.0.1'&&u.pathname.endsWith('/'+f),r=>r.fulfill({body,contentType:f.endsWith('.js')?'text/javascript':'text/css'}));
    }
  }});
}
async function d1(b) {
  for(const vp of [GERAETE.handy,{...GERAETE.handy,width:320,height:568},GERAETE.ipad,GERAETE.desktop])
  for(const leer of [false,true]) for(const thema of ['hell','dunkel']) for(const ruhig of [false,true]) {
    const {p,ctx}=await seite(b,vp,{leer,thema,ruhig});
    try {
      assert.equal(await p.getAttribute('html','data-thema'),thema);
      for(const weg of ['knopf','escape','hintergrund','dialog']) {
        if(weg==='dialog') await p.evaluate(()=>{__D.dlgConfirm('D1 Test');});
        else await aktion(p,'bereich-sheet-auf');
        await p.waitForTimeout(350);
        await p.evaluate(()=>{
          window.__bilder=[];window.__dlg=document.querySelector('.dlg');window.__huelle=__dlg.parentElement;
          function bild(t){if(!__dlg.isConnected)return;__bilder.push({t,transform:getComputedStyle(__dlg).transform,opacity:+getComputedStyle(__huelle).opacity});requestAnimationFrame(bild);}requestAnimationFrame(bild);
        });
        if(weg==='escape') await p.keyboard.press('Escape');
        else if(weg==='hintergrund') await p.evaluate(()=>document.querySelector('.dlg-backdrop').click());
        else await aktion(p,weg==='dialog'?'dlg-cancel':'bereich-sheet-zu',null,0);
        await p.waitForTimeout(300);
        const bilder=await p.evaluate(()=>__bilder);
        assert.equal(await p.locator('.dlg').count(),0,'D1 Blatt entfernt');
        if(!ruhig) {
          assert.ok(bilder.some(x=>x.transform!=='none'&&x.transform!=='matrix(1, 0, 0, 1, 0, 0)'),`D1 ${vp.width}/${weg}: kein berechneter Austritt`);
          assert.ok(bilder.some(x=>x.opacity<.9),'D1 Hülle blendet aus');
        } else assert.ok(bilder.length<=2,'D1 ruhig ohne Wartezeit');
      }
      assert.deepEqual(p.fehler,[]);
      console.log(`D1 ${vp.width} ${leer?'leer':'voll'} ${thema} ${ruhig?'ruhig':'bewegt'}: 4 Schließwege grün`);
    } finally {await ctx.close();}
  }
}
async function d2(b) {
  for(const vp of [GERAETE.handy,GERAETE.desktop]) {
    const {p,ctx}=await seite(b,vp);
    try {
      await p.waitForTimeout(1400);
      await p.evaluate(()=>__edgeFrames=0);await p.waitForTimeout(1000);
      assert.equal(await p.evaluate(()=>__edgeFrames),0,'D2 Dauerschleife im Leerlauf');
      if(vp===GERAETE.desktop) {
        await aktion(p,'tab-verwalten');
        await p.evaluate(()=>{const d=document.createElement('div');d.style.height='4000px';document.body.append(d);window.scrollTo(0,0);document.body.dispatchEvent(new PointerEvent('pointermove',{pointerType:'mouse',clientY:innerHeight-30,bubbles:true}));});
        await p.waitForTimeout(300);
        assert.ok(await p.evaluate(()=>scrollY)>30,'D2 Maus am Rand scrollt nicht');
        await p.evaluate(()=>document.body.dispatchEvent(new PointerEvent('pointermove',{pointerType:'mouse',clientY:innerHeight/2,bubbles:true})));
        await p.waitForTimeout(60);await p.evaluate(()=>__edgeFrames=0);await p.waitForTimeout(250);
        assert.equal(await p.evaluate(()=>__edgeFrames),0,'D2 läuft außerhalb der Randzone');
        await p.evaluate(()=>{document.body.dispatchEvent(new PointerEvent('pointermove',{pointerType:'mouse',clientY:30,bubbles:true}));document.dispatchEvent(new PointerEvent('pointerleave'));});
        await p.waitForTimeout(60);await p.evaluate(()=>__edgeFrames=0);await p.waitForTimeout(250);
        assert.equal(await p.evaluate(()=>__edgeFrames),0,'D2 läuft nach pointerleave');
      }
      console.log(`D2 ${vp.width}: Leerlauf 0, Rand-/Abbruchfälle grün`);
    }finally{await ctx.close();}
  }
}
async function d3(b) {
  const {cssStruktur}=await import('../css_struktur.mjs');
  const css=alt?execFileSync('git',['show','50d15ce:styles.css'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'styles.css'),'utf8');
  assert.deepEqual(cssStruktur(css),[],'D3 CSS-Struktur');
  await matrix(b,async(p,{ruhig})=>{
    const regeln=await p.evaluate(()=>{
      const a=[];function walk(rs){for(const r of rs){if(r.selectorText)a.push([r.selectorText,r.style.getPropertyValue('animation')]);if(r.cssRules)walk(r.cssRules);}}
      for(const s of document.styleSheets) {try{walk(s.cssRules);}catch(_){}}
      return a;
    });
    for(const [art,name] of [['known','geist-glanz-gut'],['unknown','geist-glanz-nicht'],['almost','geist-glanz']])
      assert.ok(regeln.some(([s,a])=>s===`.karte-geist--${art} .karte-seite`&&a.startsWith(name+' ')),'D3 CSSOM-Ring fehlt '+art);
    if(!ruhig) {
      const ring=await p.evaluate(()=>{
        const g=document.createElement('div');g.className='karte-geist karte-geist--known';g.innerHTML='<div class="karte-seite"></div>';document.body.append(g);
        const e=g.firstElementChild;e.getBoundingClientRect();const a=e.getAnimations()[0];a.pause();a.currentTime=60;
        const cs=getComputedStyle(e),r={name:cs.animationName,shadow:cs.boxShadow};g.remove();return r;
      });
      assert.equal(ring.name,'geist-glanz-gut');assert.ok(!/0px 0px 0px 0px$/.test(ring.shadow)&&ring.shadow!=='none','D3 Ring nicht gezeichnet');
    }
  });
}
async function d4(b) {
  await matrix(b,async(p,{leer})=>{
      await aktion(p,'tab-verwalten');await p.evaluate(()=>{__D.ui.drillOpen=true;__D.ui.drillSource='stufen';__D.ui.drillGruppen=new Set([0,1,2,3,4]);__D.render();});await p.waitForTimeout(650);
      if(leer){assert.equal(await p.locator('.stufe-chip').count(),0);return;}
      const messen=()=>p.evaluate(()=>[...document.querySelectorAll('.stufe-chip')].map(e=>{const r=e.getBoundingClientRect();return [r.x,r.y,r.width];}));
      const vor=await messen();assert.ok(vor.length>=3);
      for(let i=0;i<2;i++) {
        await p.evaluate(()=>document.querySelector('.stufe-chip').click());await p.waitForTimeout(50);
        const nach=await messen();assert.equal(nach.length,vor.length);
        nach.forEach((r,j)=>r.forEach((n,k)=>assert.ok(Math.abs(n-vor[j][k])<=1,'D4 Chip springt')));
        const pops=await p.evaluate(()=>document.getAnimations().filter(a=>a.animationName==='enter-pop'&&a.playState==='running').length);
        assert.ok(pops<=1,'D4 unveränderte Haken poppen');await p.waitForTimeout(300);
      }
  });
}
async function matrix(b,test,opt={}) {
  for(const vp of [GERAETE.handy,{...GERAETE.handy,width:320,height:568},GERAETE.ipad])
  for(const thema of ['hell','dunkel'])for(const ruhig of [false,true])for(const leer of [false,true]) {
    const {p,ctx}=await seite(b,vp,{thema,ruhig,leer,...opt});
    try {await p.waitForSelector('#app > .view');await test(p,{vp,thema,ruhig,leer});await p.evaluate(()=>document.fonts.ready);
      assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Querscrollen');
      assert.deepEqual(p.fehler,[]);console.log(`${aufgabe||'D'} ${vp.width} ${thema} ${ruhig?'ruhig':'bewegt'} ${leer?'leer':'voll'} grün`);
    }finally{await ctx.close();}
  }
}
async function d5(b) {await matrix(b,async(p,{leer})=>{
  if(leer){assert.equal(await p.locator('[data-action="start-session"]').count(),0);return;}
  for(const modus of ['runde','ueben','durchsicht']) {
    if(modus==='runde')await aktion(p,'start-session',null,0);
    else if(modus==='ueben') {await aktion(p,'tab-verwalten');await aktion(p,'open-drill');await aktion(p,'start-drill',null,0);}
    else await p.evaluate(async()=>{__D.currentBereich().gefuehrt=true;await __D.startLernen('s1');});
    await p.waitForTimeout(45);
    assert.ok(await p.locator(modus==='durchsicht'?'#durchsicht':'#sitzung').count(),'D5 Modus nicht gestartet: '+modus);
    const namen=await p.evaluate(()=>document.getAnimations().map(a=>[a.animationName,a.effect.target.className.baseVal??a.effect.target.className]));
    assert.ok(!namen.some(([a])=>a==='aufleuchten'),'D5 Bühne leuchtet auf: '+modus);
    assert.ok(!namen.some(([a,c])=>/enter-(vor|zurueck)/.test(a)&&c.includes('view--modus')),'D5 zusätzlicher Seitenschub: '+modus);
    assert.ok(namen.filter(([a])=>a==='karte-kommt').length<=1);
    if(modus!=='durchsicht')await aktion(p,'end-session');
  }
});}
async function d6(b) {await matrix(b,async(p,{leer})=>{
  if(leer)return;
  await aktion(p,'start-session');
  await p.evaluate(()=>{__D.ui.session.queue=__D.ui.session.queue.slice(0,1);__D.ui.session.total=1;__D.revealAnswer();});await p.waitForTimeout(600);
  await p.evaluate(()=>__D.gradeCard('known'));await p.waitForTimeout(400);
  const op=await p.locator('.ende__aktionen').evaluate(e=>+getComputedStyle(e).opacity);
  assert.ok(op>=.9,'D6 Fertig nach 400ms unsichtbar: '+op);
});}
const inventar=p=>p.evaluate(()=>document.querySelector('.view').getAnimations({subtree:true}).map(a=>({name:a.animationName,t:a.effect.getTiming(),end:a.effect.getComputedTiming().endTime})));
async function d7(b) {await matrix(b,async(p,{ruhig})=>{
  // Direkt nach dem ersten Aufbau messen: auch Animationen mit backwards
  // müssen inventarisiert werden, bevor der Browser sie nach Ende entfernt.
  const erst=await inventar(p);
  assert.ok(erst.every(a=>a.t.iterations!==2),'D7 doppelte Feier');
  assert.ok(erst.every(a=>a.end<=1200),'D7 erster Besuch länger als 1200ms');
  for(const tab of ['fortschritt','lernen','fortschritt']) {
    await aktion(p,'tab-verwalten');await aktion(p,'tab-'+tab,null,0);await p.waitForTimeout(40);
    const a=await inventar(p);
    if(tab==='lernen'||tab==='fortschritt'&&await p.evaluate(()=>window.__fortBesucht)) {
      assert.ok(a.length<=2,'D7 Choreografie beim zweiten Besuch: '+JSON.stringify(a));
      assert.ok(a.every(x=>x.end<=300),'D7 Wiederbesuch länger als 300ms');
    }else {assert.ok(a.every(x=>x.end<=1200),'D7 erster Fortschritt zu lang');await p.evaluate(()=>window.__fortBesucht=true);}
    await p.waitForTimeout(1200);
  }
},{warte:50});}
async function d8(b) {await matrix(b,async(p,{ruhig,leer})=>{
      await aktion(p,'tab-verwalten');await p.evaluate(leer=>{if(leer){const el=document.createElement('div');el.style.height='2000px';document.body.append(el);}window.scrollTo(0,900);},leer);
      assert.ok(await p.evaluate(()=>scrollY)>100,'D8 Probe hat keinen Scrollweg');
      const y=await p.evaluate(async()=>{document.querySelector('[data-action="tab-verwalten"]').click();await new Promise(requestAnimationFrame);return scrollY;});
      if(ruhig)assert.equal(y,0,'D8 aktiver Reiter scrollt trotz ruhig sanft');
      else assert.ok(y>0,'D8 normale sanfte Bewegung verschwunden');
      await p.waitForTimeout(700);assert.equal(await p.evaluate(()=>scrollY),0,'D8 Scrollziel nicht erreicht');
});}
async function touchWisch(p,cdp,dx,warte=20){
  const x=await p.locator('#app > .view').evaluate((e,dx)=>{const r=e.getBoundingClientRect();return Math.max(r.left+24,Math.min(r.right-24,dx<0?270:100));},dx);
  const y=await p.evaluate(x=>{
    for(let y=120;y<innerHeight-100;y+=20){const e=document.elementFromPoint(x,y);
      if(e?.closest('#app > .view')&&!e.closest('.drag-handle,input,textarea,select,.dlg,.nav,.modebar,canvas'))return y;}
    throw new Error('D9 kein freier Touchpunkt');
  },x);
  const pts=x=>[{x,y,id:1,radiusX:4,radiusY:4,force:1}];
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:pts(x)});
  for(let i=1;i<=5;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:pts(x+dx*i/5)});await p.waitForTimeout(warte);}
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForTimeout(650);
}
async function d9(b) {await matrix(b,async(p,{ruhig})=>{
  const cdp=await p.context().newCDPSession(p);
  await p.waitForTimeout(1200);
  const baseX=await p.locator('#app > .view').evaluate(e=>e.getBoundingClientRect().x);
  for(const dx of [100,-20]){
    await touchWisch(p,cdp,dx,60);assert.equal(await p.evaluate(()=>__D.ui.tab),'lernen','D9 Rand/zu kurz wechselt');
    assert.ok(Math.abs(await p.locator('#app > .view').evaluate(e=>e.getBoundingClientRect().x)-baseX)<=1,'D9 federt nicht zurück');
  }
  for(const [dx,ziel] of [[-100,'fortschritt'],[-100,'verwalten'],[100,'fortschritt'],[100,'lernen'],[-180,'fortschritt'],[180,'lernen']]) {
    await p.evaluate(()=>{
      window.__wischBilder=[];window.__wischMessen=true;
      function bild(){if(!__wischMessen)return;
        const el=document.querySelector('#app > .view'),r=el.getBoundingClientRect();
        const rs=[r,...[...document.querySelectorAll('[data-wisch-kopie]')].map(e=>e.getBoundingClientRect())];
        const cs=getComputedStyle(el),weg=cs.transform==='none'?0:new DOMMatrixReadOnly(cs.transform).m41;
        __wischBilder.push({tab:__D.ui.tab,x:r.x,weg,op:+cs.opacity,sichtbar:rs.some(a=>a.right>1&&a.left<innerWidth-1)});
        requestAnimationFrame(bild);
      }requestAnimationFrame(bild);
    });
    await touchWisch(p,cdp,dx);
    const xs=await p.evaluate(()=>{__wischMessen=false;return __wischBilder;});
    assert.equal(await p.evaluate(()=>__D.ui.tab),ziel,'D9 echter Touch wechselt Reiter nicht');
    if(!ruhig) {
      assert.ok(xs.every(r=>r.sichtbar),'D9 leeres Zwischenbild');
      const neu=xs.filter(r=>r.tab===ziel);
      assert.ok(neu.length>0&&Math.abs(neu[0].weg)>=200,'D9 neue Seite ploppt nahe am Ziel: '+JSON.stringify(neu.slice(0,3)));
      assert.ok(neu.every(r=>r.op>=.99),'D9 Wischseite blendet zusätzlich ein');
    }
    assert.equal(await p.locator('[data-wisch-kopie]').count(),0,'D9 alte Kopie bleibt');
  }
  await p.evaluate(()=>document.querySelector('[data-action="tab-fortschritt"]').click());
  if(!ruhig)assert.ok(Math.abs(await p.locator('#app > .view').evaluate(e=>e.getBoundingClientRect().x)-baseX)<=30,'D9 Tipp verwendet langen Wischweg');
});}
async function d11(b) {await matrix(b,async(p,{ruhig})=>{
  await p.evaluate(()=>{
    const start=performance.now();
    /* 07.10.2026: Im langen Lauf dreimal rot, allein gruen - die Meldung war rund
       80 ms nach Beginn des Ausblendens weg. Nur Protokoll fuer die Fehlermeldung:
       wer setzt #app neu oder entfernt die Meldung, solange sie steht? Keine
       Aenderung an Ablauf oder Grenze. */
    window.__toastWeg=[];
    const merke=wie=>{if(document.querySelector('.toast'))__toastWeg.push(Math.round(performance.now()-start)+' '+wie+' ['+(new Error().stack||'').split('\n').slice(2,7).map(z=>z.trim().replace(/^at /,'').slice(-60)).join(' < ')+']');};
    const echtRemove=Element.prototype.remove;
    Element.prototype.remove=function(){if(this.classList&&this.classList.contains('toast-wrap'))merke('remove');return echtRemove.call(this);};
    const desc=Object.getOwnPropertyDescriptor(Element.prototype,'innerHTML'),appEl=document.getElementById('app');
    Object.defineProperty(appEl,'innerHTML',{set(v){merke('innerHTML');desc.set.call(this,v);},get(){return desc.get.call(this);},configurable:true});
    __D.zeigeToast('D11 Test');window.__toastBilder=[];
    function messen(){const e=document.querySelector('.toast');if(!e)return;__toastBilder.push({t:performance.now()-start,op:+getComputedStyle(e).opacity});requestAnimationFrame(messen);}requestAnimationFrame(messen);
  });await p.waitForTimeout(2900);
  const xs=await p.evaluate(()=>__toastBilder.filter(x=>x.t>=2600&&x.op>0&&x.op<.95));
  assert.equal(await p.locator('.toast').count(),0,'D11 nicht entfernt');
  if(!ruhig) assert.ok(xs.length>=5,'D11 keine fünf Austrittsbilder: '+JSON.stringify(await p.evaluate(()=>__toastBilder.slice(-16)))+' | entfernt/neu gesetzt: '+JSON.stringify(await p.evaluate(()=>__toastWeg)));
  await p.evaluate(()=>{__D.zeigeToast('Alte Meldung');setTimeout(()=>__D.zeigeToast('Neue Meldung'),2650);});
  await p.waitForTimeout(2850);
  assert.equal(await p.locator('.toast').innerText(),'Neue Meldung','D11 alter Timer entfernt neue Meldung');
});}
function cssQuelle(){return alt?execFileSync('git',['show','50d15ce:styles.css'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'styles.css'),'utf8');}
async function d12(b){
  const css=cssQuelle().replace(/\/\*[\s\S]*?\*\//g,'');
  const ohneZitate=css.replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g,s=>' '.repeat(s.length));
  let tiefe=0;const tiefeVor=[];
  for(let i=0;i<ohneZitate.length;i++){tiefeVor[i]=tiefe;if(ohneZitate[i]==='{')tiefe++;else if(ohneZitate[i]==='}')tiefe--;}
  const regeln=[...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(m=>[m[1].trim(),m[2],tiefeVor[m.index]]);
  for(const sel of ['.lern-balken span','.lern-karte','.heute-bar span','.stat-seg','.modebar__fortschritt'])
    assert.ok(!regeln.some(([s,d])=>s===sel&&/transition\s*:[^;}]*(?:width|opacity|background)/.test(d)),'D12 toter Übergang: '+sel);
  assert.ok(!/\.grade-row(?: button)? \.sub\s*\{/.test(css),'D12 entfernte Unterzeile im CSS');
  assert.ok(!/@keyframes bootIn\b/.test(css),'D12 totes bootIn');
  // Die notwendige iOS-Standalone-Höhe in @media ist keine doppelte Grundregel.
  for(const sel of ['.boot','.boot--exit','.stapel'])assert.equal(regeln.filter(([s,,tiefe])=>s===sel&&tiefe===0).length,1,'D12 doppelt: '+sel);
  await matrix(b,async(p,{leer,ruhig})=>{
    await aktion(p,'tab-verwalten',null,0);await p.waitForTimeout(30);
    const draussen=await p.evaluate(()=>[...document.querySelectorAll('#karten-liste > .card-row')].filter(e=>e.getBoundingClientRect().top>=innerHeight&&e.getAnimations().length).length);
    assert.equal(draussen,0,'D12 Zeilen außerhalb des Bildes animiert');
    if(!leer){await aktion(p,'tab-lernen');await aktion(p,'start-session');
      assert.equal(await p.locator('.study-answer.platz-leer').evaluate(e=>e.getAnimations().length),0,'D12 unsichtbare Antwort animiert');}
  });
}
async function d13(b){
  const css=cssQuelle().replace(/\/\*[\s\S]*?\*\//g,'');
  const roh=[...css.matchAll(/\b(?:animation|transition)(?:-duration)?\s*:\s*([^;}]+)/g)].filter(m=>/(?:\d|\.)+(?:ms|s)\b/.test(m[1]));
  console.log('D13 rohe Zeitangaben: '+roh.length);assert.ok(roh.length<=15,'D13 mehr als 15 rohe Zeitangaben');
  for(const token of ['dur-feedback','dur-kurz','dur-eintritt','dur-gross','dur-austritt','ease-eintritt','ease-austritt'])
    assert.ok(css.includes('--'+token+':'),'D13 semantischer Token fehlt: '+token);
  await matrix(b,async()=>{});
}
async function d15(b) {
  for(const vp of [GERAETE.handy,{...GERAETE.handy,width:320,height:568},GERAETE.ipad])
  for(const thema of ['hell','dunkel'])for(const ruhig of [false,true])for(const profil of ['voll','leer','gast']) {
    const {p,ctx}=await seite(b,vp,{thema,ruhig,warte:1,bootMessen:true,leer:profil==='leer',user:profil==='gast'?null:undefined,ls:{'adrabic-thema':thema}});
    try {
      await p.waitForSelector('#app > .view');
      await p.waitForTimeout(650);
      const {timer,bilder}=await p.evaluate(()=>({timer:__bootTimer,bilder:__bootBilder}));
      if(!ruhig) {
        assert.ok(timer,'D15 wirklicher Boot-Timer nicht beobachtet');
        assert.equal(parseFloat(timer.css)*1000,timer.ms,'D15 Boot-Ausblendung abgeschnitten');
        assert.ok(bilder.some(x=>x.art==='boot')&&bilder.some(x=>x.art==='view'),'D15 Bildfolge unvollständig');
        const spruenge=bilder.slice(1).map((x,i)=>Math.abs(x.op-bilder[i].op));
        assert.ok(Math.max(...spruenge)<=.2,'D15 Deckkraft-Sprung: '+Math.max(...spruenge)+'; '+JSON.stringify(bilder.filter((x,i)=>i&&spruenge[i-1]>.2).map(x=>({vor:bilder[bilder.indexOf(x)-1],nach:x}))));
      }
      assert.equal(await p.getAttribute('html','data-thema'),thema);
      assert.deepEqual(p.fehler,[]);
      console.log(`D15 ${vp.width} ${thema} ${ruhig?'ruhig':'bewegt'} ${profil}: Dauer und Bildfolge stimmen`);
    }finally{await ctx.close();}
  }
}
const faelle={D1:d1,D2:d2,D3:d3,D4:d4,D5:d5,D6:d6,D7:d7,D8:d8,D9:d9,D11:d11,D12:d12,D13:d13,D15:d15};
if(aufgabe)assert.ok(faelle[aufgabe],'Unbekannte D-Probe: '+aufgabe);
// D13/D15 stehen in AUFGABEN.md auf "zurück" und sind nicht im Produkt.
// Ihre Proben bleiben unverändert erhalten und laufen nur auf ausdrücklichen
// Aufruf (node t_paket_d.js D12). Der Gesamtlauf prüft die gebauten Aufgaben.
const ZURUECK=['D13','D15']; // D12 seit 3.18.18 im Produkt und im Gesamtlauf
(async()=>{const b=await start();try {for(const [nr,test] of Object.entries(faelle))if(aufgabe?aufgabe===nr:!ZURUECK.includes(nr))await test(b);}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

/* Paket C. Fester Vorstand b60abf4 (3.18.12); --alt verlangt dieselbe
   Abnahme und endet vor der Behebung rot. Keine Produktionsdaten. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { start, neueSeite, aktion, GERAETE, foto } = require('./lib');
const ALT = process.argv.includes('--alt');
const BEFUND = process.argv.includes('--befund');
const repo = path.resolve(__dirname, '../../..');
const instrument = '\nwindow.__C = { render, syncTastatur, get ui(){return ui;}, karten:()=>currentCards(), update:(id,v)=>fb.updateDoc(karteRef(id),v) };';
async function seite(b, vp, opt = {}) {
  return neueSeite(b, vp, { ...opt, vorher: async ctx => {
    await ctx.addInitScript(() => {
      navigator.serviceWorker.register = () => Promise.reject(new Error('Test ohne Worker'));
      window.__fokus = []; window.__scroll = []; window.__blattScroll = [];
      const focus = HTMLElement.prototype.focus;
      HTMLElement.prototype.focus = function(opt) { window.__fokus.push([this.id, !!opt?.preventScroll]); return focus.call(this,opt); };
      const scroll = Element.prototype.scrollIntoView;
      Element.prototype.scrollIntoView = function(opt) { window.__scroll.push(this.id); return scroll.call(this,opt); };
      const scrollTop = Object.getOwnPropertyDescriptor(Element.prototype,'scrollTop');
      Object.defineProperty(Element.prototype,'scrollTop',{...scrollTop,set(v){
        if (this.classList.contains('dlg')) __blattScroll.push(v);
        return scrollTop.set.call(this,v);
      }});
    });
    for (const datei of ['app.js','styles.css']) {
      let body = ALT ? execFileSync('git',['show','b60abf4:'+datei],{cwd:repo,encoding:'utf8',maxBuffer:4e6}) : fs.readFileSync(path.join(repo,datei),'utf8');
      if (datei === 'app.js') body += instrument;
      await ctx.route(u => u.hostname === '127.0.0.1' && u.pathname.endsWith('/'+datei), r => r.fulfill({body,contentType:datei.endsWith('.js')?'text/javascript':'text/css'}));
    }
  }});
}
(async () => {
  const b = await start();
  try {
    if (BEFUND) {
      assert.ok(ALT,'--befund braucht den festen Altstand');
      const {p,ctx} = await seite(b,GERAETE.handy);
      try {
        await aktion(p,'tab-verwalten');
        await p.evaluate(()=>{__fokus=[];__scroll=[];});
        await aktion(p,'karte-neu');
        const fokusFehler = await p.evaluate(()=>__fokus.some(([id,ok])=>id==='f-wort'&&!ok));
        await p.evaluate(()=>{window.__wort=document.getElementById('f-wort');});
        await p.fill('#f-wort','C1 Gegenprobe'); await p.fill('#f-ueb','Gegenprobe');
        await aktion(p,'submit-card');
        const ersetzt = await p.evaluate(()=>__wort!==document.getElementById('f-wort'));
        await p.evaluate(()=>{__scroll=[];Object.defineProperty(visualViewport,'height',{configurable:true,get:()=>innerHeight-280});visualViewport.dispatchEvent(new Event('resize'));});
        await p.waitForTimeout(150);
        for(const h of [290,300,310,320]) {
          await p.evaluate(h=>{Object.defineProperty(visualViewport,'height',{configurable:true,get:()=>innerHeight-h});visualViewport.dispatchEvent(new Event('resize'));},h);
          await p.waitForTimeout(130);
        }
        for(let i=0;i<3;i++) { await p.evaluate(()=>visualViewport.dispatchEvent(new Event('scroll'))); await p.waitForTimeout(130); }
        const scrolls = await p.evaluate(()=>__scroll.length);
        assert.ok(fokusFehler); assert.ok(ersetzt); assert.equal(scrolls,8);
        console.log('C1 Altbefund b60abf4: Fokus ohne preventScroll, Wortfeld ersetzt, 8 scrollIntoView-Aufrufe');
      } finally { await ctx.close(); }
      return;
    }
    for (const vp of [GERAETE.handy, {...GERAETE.handy,width:320,height:568}, GERAETE.ipad, GERAETE.desktop]) {
      for (const leer of [false,true]) for (const thema of ['hell','dunkel']) for (const ruhig of [false,true]) {
        const {p,ctx} = await seite(b,vp,{thema,ruhig,leer});
        try {
          assert.equal(await p.getAttribute('html','data-thema'),thema);
          await aktion(p,'tab-verwalten');
          await p.evaluate(()=>window.scrollTo(0,700));
          await p.waitForTimeout(100);
          const seitenY = await p.evaluate(()=>scrollY);
          await p.evaluate(() => { window.__fokus=[]; window.__scroll=[]; });
          await aktion(p,'karte-neu');
          assert.equal(await p.evaluate(()=>scrollY),seitenY,'C1 Öffnen verschiebt Hintergrund');
          assert.deepEqual(await p.evaluate(() => __fokus.filter(([id,ok]) => id === 'f-wort' && !ok)), [], 'C1 Wortfokus scrollt');
          await p.evaluate(() => {
            window.__wort = document.getElementById('f-wort'); window.__abgetrennt = 0;
            window.__beobachter = new MutationObserver(records=>{
              for(const r of records) for(const n of r.removedNodes) if(n===__wort || n.contains?.(__wort)) __abgetrennt++;
            });
            __beobachter.observe(document.getElementById('app'),{childList:true,subtree:true});
          });
          await aktion(p,'submit-card');
          assert.equal(await p.getAttribute('#f-wort','aria-invalid'),'true');
          assert.equal(await p.getAttribute('#f-ueb','aria-invalid'),'true');
          await p.fill('#f-wort','Testwort C1'); await p.fill('#f-ueb','Testübersetzung');
          await aktion(p,'submit-card');
          assert.ok(await p.evaluate(() => __wort === document.getElementById('f-wort')), 'C1 Hinzufügen ersetzt Wortfeld');
          assert.equal(await p.inputValue('#f-wort'),'');
          assert.equal(await p.inputValue('#f-ueb'),'');
          assert.equal(await p.getAttribute('#f-wort','aria-invalid'),null);
          assert.equal(await p.evaluate(()=>__C.karten().filter(c=>c.wort==='Testwort C1').length),1);
          await p.fill('#f-wort','Entwurf bleibt'); await p.fill('#f-extra','Lange Notiz '.repeat(20));
          await p.evaluate(()=>__C.update(__C.karten().find(c=>c.wort==='Testwort C1').id,{extra:'Cloud-Echo'}));
          await p.waitForTimeout(200);
          assert.equal(await p.inputValue('#f-wort'),'Entwurf bleibt');
          assert.ok(await p.evaluate(()=>__wort===document.getElementById('f-wort')),'C1 fremder Snapshot ersetzt Feld');
          await p.fill('#f-wort','Zweite Karte C1'); await p.keyboard.press('Enter');
          assert.equal(await p.evaluate(()=>document.activeElement.id),'f-ueb');
          await p.fill('#f-ueb','Zweite Übersetzung'); await p.keyboard.press('Enter');
          await p.waitForTimeout(250);
          assert.equal(await p.evaluate(()=>__C.karten().filter(c=>c.wort==='Zweite Karte C1').length),1,'C1 doppelte Enter-Listener');
          assert.equal(await p.evaluate(()=>document.activeElement.id),'f-wort');
          /* Beim ersten Speichern verschwindet der hohe Leerzustand. Beide
             Quellstaende werden dann auf die kuerzere Dokumenthoehe geklemmt.
             Tastaturbewegung getrennt von dieser Inhaltsaenderung messen. */
          const tastaturY = await p.evaluate(()=>scrollY);
          await p.evaluate(() => {
            window.__scroll=[];window.__blattScroll=[];
            Object.defineProperty(visualViewport,'height',{configurable:true,get:()=>innerHeight-280});
            visualViewport.dispatchEvent(new Event('resize'));
          });
          await p.waitForTimeout(180);
          assert.ok(await p.evaluate(()=>__blattScroll.length<=1),'C1 mehrmals je Tastaturöffnung gescrollt');
          await p.evaluate(()=>{__blattScroll=[];});
          for (const h of [290,300,310,320]) {
            await p.evaluate(h => { Object.defineProperty(visualViewport,'height',{configurable:true,get:()=>innerHeight-h}); visualViewport.dispatchEvent(new Event('resize')); },h);
            await p.waitForTimeout(130);
          }
          await p.evaluate(() => { for(let i=0;i<3;i++) visualViewport.dispatchEvent(new Event('scroll')); __C.render(); });
          await p.waitForTimeout(180);
          assert.deepEqual(await p.evaluate(() => __scroll),[],'C1 scrollIntoView bewegt Vorfahren');
          assert.deepEqual(await p.evaluate(() => __blattScroll),[],'C1 weitere Größenwechsel scrollen erneut');
          assert.equal(await p.evaluate(()=>scrollY),tastaturY,'C1 Tastatur verschiebt Hintergrundseite');
          assert.equal(await p.evaluate(()=>__abgetrennt),0,'C1 Wortfeld kurz aus DOM entfernt');
          await p.evaluate(()=>document.getElementById('f-extra').focus({preventScroll:true}));
          await p.waitForTimeout(180);
          assert.ok(await p.evaluate(()=>__blattScroll.length<=1),'C1 Fokuswechsel scrollt mehrfach');
          if(vp.width===320) {
            assert.ok(await p.evaluate(()=>{
              const r=document.getElementById('f-extra').getBoundingClientRect();
              return r.bottom<=Math.min(document.querySelector('[data-karte-neu] .dlg').getBoundingClientRect().bottom,visualViewport.height+visualViewport.offsetTop)+1;
            }),'C1 verdeckte Notiz nicht ins Blatt gescrollt');
            if(!leer&&thema==='dunkel'&&!ruhig) await foto(p,'c1-320-tastatur');
          }
          await p.evaluate(()=>{Object.defineProperty(visualViewport,'height',{configurable:true,get:()=>innerHeight});visualViewport.dispatchEvent(new Event('resize'));});
          await p.waitForTimeout(120);
          await p.focus('#f-wort');
          await p.evaluate(()=>{Object.defineProperty(visualViewport,'height',{configurable:true,get:()=>innerHeight-280});visualViewport.dispatchEvent(new Event('resize'));});
          await p.waitForTimeout(180);
          assert.ok(await p.evaluate(() => __fokus.filter(([id])=> /^f-/.test(id)).every(([,ok])=>ok)),'C1 erneuter Fokus scrollt');
          if(vp.width===390&&!leer&&thema==='dunkel'&&!ruhig) {
            await p.evaluate(()=>{Object.defineProperty(visualViewport,'height',{configurable:true,get:()=>innerHeight});visualViewport.dispatchEvent(new Event('resize'));});
            await p.fill('#f-wort','Testwort C1'); await p.fill('#f-ueb','Duplikatentwurf');
            await aktion(p,'submit-card');
            assert.ok((await p.locator('.dlg').last().innerText()).includes('Wort gibt es schon'));
            await p.locator('.dlg').last().getByRole('button',{name:'Abbrechen',exact:true}).click();
            await p.waitForTimeout(500);
            assert.equal(await p.inputValue('#f-ueb'),'Duplikatentwurf');
            assert.ok(await p.evaluate(()=>__wort===document.getElementById('f-wort')));
            assert.ok(await p.evaluate(()=>{
              const blatt=document.getElementById('f-wort').closest('.dlg'),r=blatt.getBoundingClientRect();
              return getComputedStyle(blatt.parentElement).opacity==='1'&&r.top<innerHeight&&r.bottom>0;
            }),'C1 Dialogabbruch blendet erhaltenes Kartenblatt aus');
            await p.evaluate(()=>{sessionStorage.setItem('adrabic-token-erneuert-schreiben','1');__FB.fail=true;});
            await p.fill('#f-wort','Abgelehnte Karte C1'); await p.fill('#f-ueb','Ablehnung');
            await aktion(p,'submit-card');
            assert.ok((await p.locator('.dlg').last().innerText()).includes('Nicht gespeichert'));
            assert.ok(await p.evaluate(()=>__wort===document.getElementById('f-wort')));
            await p.locator('.dlg').last().getByRole('button',{name:'OK',exact:true}).click();
            await p.waitForTimeout(500);
            await p.evaluate(()=>{__FB.fail=null;});
            await p.fill('#f-wort','Offlineentwurf C1');
            await ctx.setOffline(true); await p.waitForTimeout(250);
            assert.equal(await p.inputValue('#f-wort'),'Offlineentwurf C1');
            assert.ok(await p.evaluate(()=>__wort===document.getElementById('f-wort')));
            await ctx.setOffline(false); await p.waitForTimeout(250);
            assert.equal(await p.evaluate(()=>__abgetrennt),0,'C1 Dialog/Fehler/Offline trennt Wortfeld');
            console.log('C1 Randfälle grün: Duplikatabbruch, abgelehnter Write, Offline/Rückkehr');
          }
          assert.deepEqual(p.fehler,[]);
          console.log('C1 grün',vp.width,leer?'leer':'voll',thema,ruhig?'ruhig':'bewegt');
        } finally { await ctx.close(); }
      }
    }
  } finally { await b.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});

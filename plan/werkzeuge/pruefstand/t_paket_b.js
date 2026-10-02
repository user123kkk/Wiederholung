/* Paket B: feste Gegenprobe 07c7568 (Stand vor Paket B).
   --alt prueft dieselbe Abnahme am Vorstand und muss mit Exit 1 enden.
   Fall einzeln: node t_paket_b.js B1 [--alt]. */
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const { start, neueSeite, aktion, GERAETE, vollerStore, OUT } = require('./lib');
const { pruefeKontrast } = require('./kontrast');
const ALT = process.argv.includes('--alt');
const FALL = process.argv.find(x => /^(B\d+|umfeld)$/.test(x));
const repo = path.resolve(__dirname, '../../..');
const fs = require('node:fs');
const instrument = `
window.__B = {
  set(s, patch = {}) { einstiegTimerStoppen(); einstiegBauScrollStoppen();
    ui.authGewaehlt = false; ui.einstieg = Object.assign(einstiegNeu(s), {
      ziele: ['kurs'], huerden: ['keine'], anker: 'eigen', ankerFrei: 'Testmoment erreicht habe',
      planGebaut: s === 7, aufgedeckt: s === 3, bewertet: s === 3 ? 'Sicher' : null
    }, patch); window.scrollTo(0, 0); render(); },
  liste(h) { return einstiegBauListe(Object.assign(einstiegNeu(7), { ziele:['kurs'], huerden:[h], anker:'eigen', ankerFrei:'Test' })); },
  dauer(h) { const e = Object.assign(einstiegNeu(7), { ziele:['kurs'], huerden:[h] });
    return typeof einstiegBauDauerFuer === 'function' ? einstiegBauDauerFuer(e) : einstiegBauDauer(einstiegBauListe(e).length); },
  stop: einstiegBauScrollStoppen,
  get ui() { return ui; }
};`;
async function seite(b, vp = GERAETE.handy, opt = {}) {
  return neueSeite(b, vp, { user: null, store: {}, ...opt,
    ls: { ...(opt.thema ? { 'adrabic-thema':opt.thema } : {}), ...(opt.ls || {}) }, vorher: async ctx => {
    // Die festen Quellen und die Instrumentierung muessen auch nach reload gelten.
    // Service-Worker-Abnahme bleibt t_sw/t_boot_geometrie vorbehalten.
    await ctx.addInitScript(() => { navigator.serviceWorker.register = () => Promise.reject(new Error('Pruefstand ohne Worker')); });
    for (const datei of ['app.js', 'styles.css']) {
      let body = ALT ? execFileSync('git', ['show', '07c7568:' + datei], { cwd: repo, encoding: 'utf8', maxBuffer: 4e6 }) : fs.readFileSync(path.join(repo, datei), 'utf8');
      if (datei === 'app.js') body += instrument;
      await ctx.route(u => u.hostname === '127.0.0.1' && u.pathname.endsWith('/' + datei), r => r.fulfill({ body, contentType: datei.endsWith('.js') ? 'text/javascript' : 'text/css' }));
    }
  }});
}
async function plan(p, huerde = 'keine') {
  await aktion(p, 'einstieg-weiter');
  await aktion(p, 'einstieg-ziel', 'kurs');
  await aktion(p, 'einstieg-weiter');
  await aktion(p, 'einstieg-huerde', huerde);
  await aktion(p, 'einstieg-weiter');
  await aktion(p, 'einstieg-aufdecken');
  await aktion(p, 'einstieg-bewerten', 'Sicher');
  await aktion(p, 'einstieg-weiter');
  await aktion(p, 'einstieg-weiter');
  await aktion(p, 'einstieg-weiter');
  await aktion(p, 'einstieg-anker', 'eigen');
  await p.locator('#einstieg-frei').fill('Testmoment erreicht habe');
  await aktion(p, 'einstieg-weiter', null, 8000);
  assert.equal(await p.locator('h1').innerText(), 'Dein Plan steht.');
}
const faelle = {
  async umfeld(b) {
    for (const vp of [GERAETE.handy, { ...GERAETE.handy, width:320,height:568 }, GERAETE.ipad]) {
      for (const thema of ['hell','dunkel']) for (const ruhig of [true,false]) {
        const { p, ctx } = await seite(b, vp, { thema, ruhig });
        try {
          await p.evaluate(() => document.fonts.ready);
          assert.equal(await p.locator('html').getAttribute('data-thema'), thema);
          for (let s=0;s<=7;s++) for (const voll of [false,true]) {
            await p.evaluate(([s,voll]) => __B.set(s, voll ? { huerden:['vergessen','wann','dran','zeit','schrift'], ziele:['kurs'], anker:'eigen', ankerFrei:'Testmoment erreicht habe' } : { huerden:[], ziele:[], anker:null, ankerFrei:'' }), [s,voll]);
            await p.waitForTimeout(450);
            await p.evaluate(() => __B.stop());
            assert.ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Querscrollen '+[vp.width,thema,ruhig,s,voll]);
            const geo = await p.evaluate(() => {
              const block = document.querySelector('.einstieg');
              const fuss = block?.querySelector('.einstieg-aktion');
              const letzte = fuss?.previousElementSibling;
              return fuss && letzte ? { top:fuss.getBoundingClientRect().top, bottom:letzte.getBoundingClientRect().bottom } : null;
            });
            assert.ok(!geo || geo.bottom <= geo.top+1, 'Fuss ueberlagert '+[vp.width,thema,ruhig,s,voll]);
            assert.deepEqual(p.fehler, []);
          }
          console.log('Umfeld', vp.width, thema, ruhig?'ruhig':'bewegt', '0–7 leer/voll ohne Ueberlauf/Ueberlagerung/Seitenfehler');
        } finally { await ctx.close(); }
      }
    }
  },
  async B2(b) {
    let rot = 0;
    for (const width of [320, 360, 390, 820]) for (const h of ['keine', 'vergessen']) {
      const { p, ctx } = await seite(b, { ...GERAETE.handy, width }, { ruhig: true });
      try {
        await p.evaluate(h => __B.set(3, { aufgedeckt: false, bewertet: null, huerden: [h] }), h);
        const vor = await p.locator('.einstieg-karte').boundingBox();
        await aktion(p, 'einstieg-aufdecken');
        const nach = await p.locator('.einstieg-karte').boundingBox();
        console.log(width, h, vor.y, '->', nach.y);
        if (Math.abs(vor.y - nach.y) > 1) rot++;
        assert.deepEqual(p.fehler, []);
      } finally { await ctx.close(); }
    }
    assert.equal(rot, 0, 'Karte springt');
  },
  async B3(b) {
    let rot = 0;
    for (const vp of [GERAETE.ipad, GERAETE.ipadquer]) {
      const { p, ctx } = await seite(b, vp, { ruhig: true });
      try {
        for (let s = 0; s <= 7; s++) {
          await p.evaluate(s => __B.set(s, { ziele: [], huerden: [], anker: null }), s);
          const box = await p.locator('.einstieg-aktion button.full').boundingBox();
          if (Math.abs(box.width - 420) > 1) rot++;
          for (const [step, action] of [[1,'einstieg-ziel'],[2,'einstieg-huerde'],[6,'einstieg-anker']]) if (step === s) {
            await aktion(p, action);
            const nach = await p.locator('.einstieg-aktion button.full').boundingBox();
            if (Math.abs(box.x - nach.x) > 1 || Math.abs(box.width - nach.width) > 1) rot++;
          }
          console.log(vp.width, s, box.x, box.width);
        }
      } finally { await ctx.close(); }
    }
    assert.equal(rot, 0, 'iPad-Knopf schrumpft');
  },
  async B4(b) {
    const { p, ctx } = await seite(b, GERAETE.handy, { ruhig: true });
    try {
      await p.evaluate(() => __B.set(7));
      await p.waitForTimeout(450); // echte Doppeltippsperre vor Plan speichern
      await aktion(p, 'einstieg-fertig');
      await aktion(p, 'mode-login');
      await aktion(p, 'mode-register');
      assert.equal(await p.locator('h1').innerText(), 'Plan speichern');
      assert.equal(await p.locator('[data-action="einstieg-wieder"]').count(), 1);
      await aktion(p, 'einstieg-wieder');
      assert.equal(await p.locator('h1').innerText(), 'Dein Plan steht.');
      assert.deepEqual(await p.evaluate(() => __B.ui.einstieg.ziele), ['kurs']);
    } finally { await ctx.close(); }
  },
  async B5(b) {
    const { p, ctx } = await seite(b, { ...GERAETE.handy, width: 320, height: 568 });
    try {
      for (const type of ['wheel', 'touchstart', 'keydown']) {
        await p.evaluate(() => __B.set(7, { planGebaut:false }));
        await p.waitForTimeout(1000);
        await p.evaluate(type => { window.dispatchEvent(new Event(type)); window.scrollTo(0, 0); }, type);
        await p.waitForTimeout(500);
        assert.equal(await p.evaluate(() => __B.ui.einstiegBauScrollRaf), null, type + ' beendet Aufbau-Schleife');
        await p.evaluate(() => __B.set(7));
        await p.waitForTimeout(1000);
        await p.evaluate(type => { window.dispatchEvent(new Event(type)); window.scrollTo(0, 0); }, type);
        await p.waitForTimeout(500);
        assert.equal(await p.evaluate(() => scrollY), 0, type + ' beendet Automatik');
      }
      await p.evaluate(() => __B.set(7));
      await p.waitForTimeout(1000);
      await p.mouse.wheel(0, -600);
      await p.waitForTimeout(100);
      const userTop = await p.evaluate(() => scrollY);
      await p.waitForTimeout(500);
      assert.equal(await p.evaluate(() => scrollY), userTop, 'echtes Mausrad behält Nutzerposition');
      await p.evaluate(() => __B.set(7));
      await p.waitForTimeout(4000);
      assert.ok(await p.evaluate(() => Math.abs(scrollY - (document.documentElement.scrollHeight - innerHeight)) <= 1));
      await aktion(p, 'einstieg-fertig');
      await aktion(p, 'einstieg-wieder', null, 4000);
      assert.equal(await p.evaluate(() => scrollY), 0, 'Rueckweg startet keine Fahrt');
    } finally { await ctx.close(); }
  },
  async B6(b) {
    let rot = 0;
    for (const [width,height] of [[320,568],[360,740],[375,667],[390,844],[820,1180]]) {
      const { p, ctx } = await seite(b, { ...GERAETE.handy, width, height }, { ruhig: true });
      try {
        for (const s of [0,1,2,3,4,5,6,7]) {
          await p.evaluate(s => __B.set(s, { huerden: s === 2 ? [] : ['keine'] }), s);
          await p.evaluate(() => document.fonts.ready);
          await p.waitForTimeout(100); // auch die 0,01-ms-Animation braucht einen ersten Stil-/Bilddurchlauf
          const box = await p.locator('.einstieg-aktion button.full').boundingBox();
          console.log(width, height, s, 'Unterkante', box.y + box.height);
          if ((width === 375 && s === 5) || (width === 390 && s === 2)) console.log('Fussmessung', await p.evaluate(() => {
            const fuss=document.querySelector('.einstieg-aktion'), leer=fuss.querySelector('.einstieg-neben-platz');
            return { scrollHeight:document.documentElement.scrollHeight, innerHeight, media:matchMedia('(max-height:760px)').matches,
              padding:getComputedStyle(fuss).paddingTop, leerHoehe:leer.getBoundingClientRect().height, leerRand:getComputedStyle(leer).marginTop,
              fussHoehe:fuss.getBoundingClientRect().height, leerHtml:leer.outerHTML };
          }));
          if (width === 375 && [0,1,3,4,5].includes(s) && box.y + box.height > height) rot++;
          if (width === 390 && s === 2 && await p.evaluate(() => document.documentElement.scrollHeight > innerHeight)) rot++;
          assert.ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
        }
      } finally { await ctx.close(); }
    }
    assert.equal(rot, 0, 'Leerraum schiebt Hauptknopf hinaus');
  },
  async B7(b) {
    const { p, ctx } = await seite(b);
    try {
      await p.evaluate(() => __B.set(1)); await p.waitForTimeout(500);
      const x = (await p.locator('.einstieg-aktion button.full').boundingBox()).x;
      const messung = await p.evaluate(async () => {
        document.querySelector('[data-action="einstieg-weiter"]').click();
        const werte = [];
        for (let i = 0; i < 20; i++) { await new Promise(requestAnimationFrame);
          const el = document.querySelector('.einstieg-aktion button.full');
          let opacity = 1; for (let n=el; n; n=n.parentElement) opacity *= Number(getComputedStyle(n).opacity);
          werte.push({ x:el.getBoundingClientRect().x, opacity }); }
        return werte;
      });
      console.log(messung);
      assert.ok(messung.every(v => Math.abs(v.x-x) <= 1 && v.opacity >= .99));
    } finally { await ctx.close(); }
  },
  async B8(b) {
    const { p, ctx } = await seite(b);
    try {
      // Erneuter Start mit beobachtbarem vorhandenen Boot-Knoten, echtes render().
      const seen = await p.evaluate(async () => {
        __B.ui.einstieg = null; __B.ui.authGewaehlt = false;
        document.querySelector('#app').innerHTML = '<div class="boot"></div>';
        const states = [];
        const observer = new MutationObserver(() => states.push(document.querySelector('.boot')?.className || 'einstieg'));
        observer.observe(document.querySelector('#app'), { subtree:true, attributes:true, childList:true });
        __B.set(0); await new Promise(r => setTimeout(r, 500)); observer.disconnect(); return states;
      });
      console.log(seen); assert.ok(seen.includes('boot boot--exit')); assert.ok(seen.includes('einstieg'));
    } finally { await ctx.close(); }
  },
  async B9(b) {
    const { p, ctx } = await seite(b);
    try {
      for (const [h, fixed] of [['dran','Zeitpunkt:'],['zeit','Runde:'],['schrift','Schrift:']]) {
        const list = await p.evaluate(h => __B.liste(h), h); console.log(h, list);
        assert.ok(!list.some(x => x.startsWith(fixed)), h + ': doppelte feste Zeile');
        assert.equal(await p.evaluate(h => __B.dauer(h), h), 6720, 'Bisherige Dauer bleibt trotz kuerzerer Liste');
      }
      for (const h of ['vergessen','wann','keine']) {
        const list = await p.evaluate(h => __B.liste(h), h);
        for (const fixed of ['Zeitpunkt:','Runde:','Schrift:']) assert.ok(list.some(x => x.startsWith(fixed)));
      }
    } finally { await ctx.close(); }
  },
  async B10(b) {
    for (const vp of [GERAETE.handy, {...GERAETE.handy,width:320,height:568}, GERAETE.ipad])
    for (const thema of ['hell','dunkel']) for (const ruhig of [true,false]) {
    const { p, ctx } = await seite(b, vp, { ruhig, thema });
    try {
      await p.evaluate(() => __B.set(7));
      await p.waitForTimeout(650); await p.evaluate(() => { __B.stop(); window.scrollTo(0,0); });
      const vor = await p.locator('.einstieg-kopf').boundingBox();
      await aktion(p, 'einstieg-fertig');
      const nach = await p.locator('.einstieg-kopf').boundingBox();
      assert.ok(nach && Math.abs(vor.y-nach.y) <= 1 && Math.abs(vor.x-nach.x) <= 1);
      assert.equal(await p.locator('[data-action="einstieg-wieder"]').getAttribute('aria-label'), 'Zurück zum Plan');
      assert.ok(!(await p.locator('#app').innerText()).includes('Schritt 1 von 2'));
      assert.ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await aktion(p, 'register');
      assert.equal(await p.locator('#a-name').getAttribute('aria-invalid'), 'true');
      await p.evaluate(() => window.scrollTo(0,0));
      const fehler = await p.locator('.einstieg-kopf').boundingBox();
      assert.ok(Math.abs(nach.y-fehler.y)<=1 && Math.abs(nach.x-fehler.x)<=1);
      assert.deepEqual(p.fehler, []);
      const kontrast = (await pruefeKontrast(p, 'Paket-B-Formular')).filter(f => !f.disabled);
      assert.deepEqual(kontrast, [], 'Formularkontrast');
      if (vp.width===390 && ruhig) await p.screenshot({path:path.join(OUT,'paket-b-formular-'+thema+'.png'),fullPage:true});
      await aktion(p, 'einstieg-wieder'); assert.equal(await p.locator('h1').innerText(), 'Dein Plan steht.');
      console.log('Formularrahmen',vp.width,thema,ruhig?'ruhig':'bewegt',vor.x,vor.y,nach.x,nach.y,'inkl. Feldfehler gruen');
    } finally { await ctx.close(); }
    }
  },
  async B11(b) {
    const { p, ctx } = await seite(b);
    try {
      await p.evaluate(() => { __B.set(4); });
      await aktion(p, 'einstieg-schrift', 'gross');
      assert.ok(await p.evaluate(() => localStorage.getItem('adrabic-einstieg-antworten')));
      await p.reload(); await p.waitForTimeout(1500);
      assert.equal(await p.evaluate(() => localStorage.getItem('adrabic-einstieg-antworten')), null);
    } finally { await ctx.close(); }
  },
  async B12() {
    const source = datei => ALT ? execFileSync('git', ['show','07c7568:'+datei], { cwd:repo, encoding:'utf8', maxBuffer:4e6 }) : fs.readFileSync(path.join(repo,datei),'utf8');
    const app = source('app.js'), css = source('styles.css');
    assert.ok(!app.includes('sticky) Bereichs')); assert.ok(!app.includes('sie dreht sich hin und zurueck'));
    assert.ok(!css.includes('EINSTIEG_BAU_MS = 2300')); assert.ok(!css.includes('Haken, der zweimal aufleuchtet'));
    assert.ok(!css.includes('„sitzt" ein Haken, der zweimal'));
    assert.ok(!app.includes('6 * EINSTIEG_BAU_SCHRITT_MS + EINSTIEG_BAU_NACHLAUF_MS;'));
  },
  async B13(b) {
    for (const vp of [GERAETE.handy, {...GERAETE.handy,width:320,height:568}, GERAETE.ipad])
    for (const thema of ['hell','dunkel']) for (const ruhig of [true,false]) {
    const { p, ctx } = await seite(b, vp, { ruhig, thema });
    try {
      const speicher = await p.evaluate(() => JSON.stringify({...localStorage}));
      await p.evaluate(() => __B.set(7));
      await p.waitForTimeout(1000); await p.evaluate(() => __B.stop());
      assert.equal(await p.locator('.einstieg-stand .einstieg-leiste').count(), 1);
      assert.ok((await p.locator('.einstieg-stand').innerText()).includes('Dein Stand'));
      assert.ok(!/\d/.test(await p.locator('.einstieg-stand').innerText()));
      assert.ok((await p.locator('.einstieg-stand [role="img"]').getAttribute('aria-label')).startsWith('Dein Stand: neu.'));
      assert.equal(await p.locator('.einstieg-stand .einstieg-leiste__punkt--ziel').count(), 0, 'Kein erreichter Zielhaken');
      assert.equal(await p.evaluate(() => JSON.stringify({...localStorage})), speicher, 'Keine neue Speicherung');
      await p.locator('.einstieg-stand').scrollIntoViewIfNeeded();
      const kontrast = (await pruefeKontrast(p, 'Paket-B-Stand')).filter(f => !f.disabled);
      assert.deepEqual(kontrast, [], 'Plankontrast');
      assert.deepEqual(p.fehler, []);
      if (vp.width===390 && ruhig) await p.screenshot({path:path.join(OUT,'paket-b-stand-'+thema+'.png'),fullPage:true});
      console.log('Dein Stand',vp.width,thema,ruhig?'ruhig':'bewegt','ohne Zahl/neuen Speicher/Zielhaken, Kontrast gruen');
    } finally { await ctx.close(); }
    }
  },
  async B1(b) {
    const { p, ctx } = await seite(b);
    try {
      await plan(p);
      await aktion(p, 'einstieg-fertig');
      const satz = await p.evaluate(() => JSON.parse(localStorage.getItem('adrabic-einstieg-nachklang')).satz);
      await p.evaluate(() => { window.__AUTO_VERIFY = true; });
      await p.locator('#a-name').fill('Neu');
      await p.locator('#a-email').fill('neu@example.com');
      await p.locator('#a-pass').fill('abcdefghi');
      await p.locator('[data-action="register"]').click();
      await p.waitForTimeout(3500);
      assert.equal(await p.locator('.nachklang__satz').textContent({ timeout: 2000 }), satz);
      await aktion(p, 'tab-verwalten');
      await aktion(p, 'karte-neu');
      await p.locator('#f-wort').fill('Test');
      await p.locator('#f-ueb').fill('Testkarte');
      await aktion(p, 'submit-card');
      await aktion(p, 'tab-lernen');
      assert.equal(await p.evaluate(() => localStorage.getItem('adrabic-einstieg-nachklang')), null);
      assert.equal(await p.locator('.nachklang').count(), 0);
      console.log('Nachklang nach neuem Konto vorhanden, Satz:', satz);
      assert.deepEqual(p.fehler, []);
    } finally { await ctx.close(); }
    const { p: bestand, ctx: c2 } = await seite(b, GERAETE.handy, { user: { uid: 'u1', emailVerified: true }, store: vollerStore(), ls: {
      'adrabic-einstieg-antworten': '{"arabGroesse":"gross"}', 'adrabic-einstieg-nachklang': '{"satz":"Test"}'
    }});
    try {
      assert.equal(await bestand.evaluate(() => localStorage.getItem('adrabic-einstieg-nachklang')), null);
      assert.equal(await bestand.evaluate(() => localStorage.getItem('adrabic-einstieg-antworten')), null);
    } finally { await c2.close(); }
  }
};
(async () => {
  const b = await start();
  try {
    for (const fall of FALL ? [FALL] : Object.keys(faelle).filter(x => /^B/.test(x)).sort((a,b) => Number(a.slice(1))-Number(b.slice(1)))) {
      try { await faelle[fall](b); console.log(fall + ' gruen' + (ALT ? ' (ALT: unerwartet)' : '')); }
      catch (e) { console.error(fall + ' ROT', e); process.exitCode = 1; }
    }
  }
  finally { await b.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

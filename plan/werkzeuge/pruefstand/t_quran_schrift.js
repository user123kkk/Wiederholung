/* 3.18.6: Quran-Text zeigt keinen Platzhalterkreis. UthmanicHafs1Ver18
   zeichnet U+06DF, U+06E3, U+06EB als gestrichelten Kreis (fontTools,
   LEHREN § 15). Text-Ansicht mit Sure 2, Aya 1-6 und 7:206 (unveraendert
   aus quran/tanzil-uthmani.txt):
   1. Hat ein Text eine Zeile mit einem dieser Zeichen, zeichnet Amiri
      Quran ALLE seine Zeilen (einheitlich, CDP getPlatformFontsForNode);
      ein Text ohne (Sure 1) bleibt ganz in UthmanicHafs.
   2. Eine Karte mit einem solchen Wort (2:5, erstes Wort) ebenso.
   3. Die Schriftdatei wird geladen (document.fonts), offline aus dem
      APP_SHELL-Eintrag (sw.js enthaelt sie).
   Gegenprobe: ohne tanzilSchriftMarkieren zeichnet UthmanicHafs -> rot. */
const fs = require('node:fs'), path = require('node:path');
const { start, tag } = require('./lib');
const { seiteMitApp, BETREIBER_UID, zeilenStore } = require('./text_lib');
const Q = fs.readFileSync(path.join(__dirname, '../../../quran/tanzil-uthmani.txt'), 'utf8')
  .split('\n').filter(l => l && l[0] !== '#').map(l => l.split('|'));
const ZEILEN = Q.filter(p => p[0] === '2' && +p[1] <= 6).map(p => p[2]).concat([Q.find(p => p[0] === '7' && p[1] === '206')[2]]);
const KREIS = /[ۣ۟۫]/;

async function lauf(browser, ersetze) {
  const fehler = [];
  const pruefe = (ok, text) => { if (!ok) fehler.push(text); };
  const store = zeilenStore(ZEILEN.length, () => ({ stufe: 7, next: '2099-12-31', erste: tag(-9) }), { wort: i => ZEILEN[i] });
  store['users/u1/karten/k0'].wort = ZEILEN[4].split(' ')[0];
  let { ctx, p } = await seiteMitApp(browser, store, { uid: BETREIBER_UID, ersetze });
  try {
    const cdp = await ctx.newCDPSession(p);
    await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
    const schriften = async sel => {
      const { root } = await cdp.send('DOM.getDocument', { depth: -1 });
      const { nodeIds } = await cdp.send('DOM.querySelectorAll', { nodeId: root.nodeId, selector: sel });
      const out = [];
      for (const id of nodeIds) {
        const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId: id });
        const { outerHTML } = await cdp.send('DOM.getOuterHTML', { nodeId: id });
        out.push({ kreis: KREIS.test(outerHTML), f: fonts.map(x => x.familyName).join('+') });
      }
      return out;
    };
    await p.click('[data-action="tab-verwalten"]'); await p.waitForTimeout(400);
    await p.click('[data-action="text-oeffnen"][data-id="t1"]'); await p.waitForTimeout(400);
    /* Beide Dateien wirklich laden lassen, sonst misst CDP Ersatzschriften. */
    await p.evaluate(() => Promise.all([document.fonts.load('20px UthmanicHafs', '\u0628'), document.fonts.load('20px AmiriQuranTanzil', '\u0628')]).catch(() => {}));
    await p.waitForFunction(() => [...document.fonts].filter(f => f.status === 'loaded').length >= 2, null, { timeout: 10000 }).catch(() => {});
    await p.waitForTimeout(500);
    const z = await schriften('.text-zeile__text');
    console.log('(lesen) Zeilen: ' + z.map(x => (x.kreis ? 'K:' : '-:') + x.f).join(' | '));
    pruefe(z.length === ZEILEN.length, z.length + ' Zeilen');
    pruefe(z.some(x => x.kreis) && z.some(x => !x.kreis), 'Stichprobe ohne beide Arten');
    for (const x of z) pruefe(/^Amiri Quran$/.test(x.f), 'Zeile eines Textes mit Kreiszeichen (' + (x.kreis ? 'selbst mit' : 'selbst ohne') + '): ' + x.f);
    pruefe(await p.evaluate(() => [...document.fonts].some(f => f.family.replace(/"/g, '') === 'AmiriQuranTanzil' && f.status === 'loaded')), 'Amiri Quran nicht geladen');
    await p.click('[data-action="text-schliessen"]'); await p.waitForTimeout(300);
    await p.fill('#suche, input[aria-label*="Suche"]', ZEILEN[4].split(' ')[0]).catch(() => {});
    await p.waitForTimeout(600);
    const k = await schriften('.wort.arabic');
    console.log('(lesen) Karten: ' + k.map(x => (x.kreis ? 'K:' : '-:') + x.f).join(' | '));
    /* Leere Liste = ausserhalb des Bildschirms, content-visibility zeichnet nicht. */
    const kk = k.filter(x => x.kreis);
    pruefe(kk.length >= 1 && kk.every(x => /^Amiri Quran$/.test(x.f)), 'Karte mit Kreiszeichen: ' + JSON.stringify(kk));
    pruefe(k.filter(x => !x.kreis && x.f).every(x => /^KFGQPC HAFS Uthmanic Script$/.test(x.f)), 'Karten ohne Kreiszeichen nicht UthmanicHafs');
    pruefe(fs.readFileSync(path.join(__dirname, '../../../sw.js'), 'utf8').includes('./fonts/AmiriQuran-arabisch.woff2'), 'Schrift fehlt in APP_SHELL');
    pruefe(p.fehler.length === 0, 'Seitenfehler: ' + p.fehler.join('; '));
    await ctx.close();
    // Text ohne Kreiszeichen (Sure 1): ganz UthmanicHafs
    const s1 = Q.filter(q => q[0] === '1').map(q => q[2]);
    ({ ctx, p } = await seiteMitApp(browser, zeilenStore(s1.length, () => ({ stufe: 7, next: '2099-12-31', erste: tag(-9) }), { wort: i => s1[i] }), { uid: BETREIBER_UID, ersetze }));
    const cdp2 = await ctx.newCDPSession(p); await cdp2.send('DOM.enable'); await cdp2.send('CSS.enable');
    await p.click('[data-action="tab-verwalten"]'); await p.waitForTimeout(400);
    await p.click('[data-action="text-oeffnen"][data-id="t1"]'); await p.waitForTimeout(400);
    await p.evaluate(() => document.fonts.load('20px UthmanicHafs', '\u0628').catch(() => {})); await p.waitForTimeout(800);
    const { root } = await cdp2.send('DOM.getDocument', { depth: -1 });
    const { nodeIds } = await cdp2.send('DOM.querySelectorAll', { nodeId: root.nodeId, selector: '.text-zeile__text' });
    for (const id of nodeIds) { const f = (await cdp2.send('CSS.getPlatformFontsForNode', { nodeId: id })).fonts.map(x => x.familyName).join('+'); pruefe(f === 'KFGQPC HAFS Uthmanic Script', 'Sure 1 nicht in UthmanicHafs: ' + f); }
    pruefe(nodeIds.length === 7, 'Sure 1: ' + nodeIds.length + ' Zeilen');
  } catch (e) { fehler.push('Abbruch: ' + e.message.split('\n')[0]); } finally { await ctx.close(); }
  return fehler;
}

(async () => {
  const browser = await start();
  try {
    const f = await lauf(browser);
    const g = await lauf(browser, ['  tanzilSchriftMarkieren(app);\n', '']);
    console.log('Gegenprobe ohne Markieren: ' + g.length + ' Befunde (rot erwartet)');
    if (!g.length) f.push('Gegenprobe blieb gruen');
    if (f.length) { console.log('FEHLER:\n' + f.join('\n')); process.exitCode = 1; }
    else console.log('OK t_quran_schrift: Kreiszeichen in Amiri Quran, sonst UthmanicHafs, Karten ebenso');
  } finally { await browser.close(); }
})();

/* Ansehen (kein Abnahmetest): Hilfestufe 2 seit 3.18.24 - der Anfang der
   Zeile. Sure 1 (kurze Zeilen) und 2:1-6 (2:1 ein Wort, lange Zeilen,
   Lesezeichen), Wortlaut unveraendert aus quran/tanzil-uthmani.txt.
   Je Zeile: Foto der Stufe, dazu Schrift (CDP), Richtung, was sichtbar ist.
     node x_anfang_foto.js [Zielordner] */
const fs = require('node:fs'), path = require('node:path');
const { start, tag } = require('./lib');
const { seiteMitApp, BETREIBER_UID, zeilenStore } = require('./text_lib');
const Q = fs.readFileSync(path.join(__dirname, '../../../quran/tanzil-uthmani.txt'), 'utf8')
  .split('\n').filter(l => l && l[0] !== '#').map(l => l.split('|'));
const ziel = process.argv[2] || path.join(__dirname, '../../texte-lernen/anfang-belege');
const SAETZE = { sure1: Q.filter(p => p[0] === '1').map(p => p[2]), sure2: Q.filter(p => p[0] === '2' && +p[1] <= 6).map(p => p[2]) };

(async () => {
  fs.mkdirSync(ziel, { recursive: true });
  const b = await start();
  try {
    for (const [name, ZEILEN] of Object.entries(SAETZE))
    for (const [breite, hoehe] of [[390, 844], [320, 568]])
    for (const thema of ['hell', 'dunkel']) {
      const store = zeilenStore(ZEILEN.length, () => ({ stufe: 0, next: tag(0), erste: null }), { wort: i => ZEILEN[i] });
      const { ctx, p } = await seiteMitApp(b, store, { uid: BETREIBER_UID, viewport: { width: breite, height: hoehe }, zusatz: 'tl: () => ui.textLernen,' });
      try {
        if (thema === 'dunkel') await p.evaluate(() => document.documentElement.setAttribute('data-thema', 'dunkel'));
        const cdp = await ctx.newCDPSession(p); await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
        await p.click('[data-action="tab-verwalten"]'); await p.waitForTimeout(400);
        await p.click('[data-action="text-oeffnen"][data-id="t1"]'); await p.waitForTimeout(400);
        await p.click('[data-action="text-lernen"][data-id="t1"]'); await p.waitForTimeout(400);
        for (let i = 0; i < Math.min(ZEILEN.length, 3); i++) {
          await p.click('[data-action="text-lernen-schritt"][data-id="buchstaben"]'); await p.waitForTimeout(300);
          await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
          const m = await p.evaluate(() => {
            const e = document.querySelector('.text-buehne__zeile--buchstaben'), pkt = e && e.querySelector('.text-buehne__verdeckt');
            if (!e) return null;
            const r = e.getBoundingClientRect(), rp = pkt.getBoundingClientRect(), wort = e.firstChild;
            const rg = document.createRange(); rg.selectNodeContents(wort); const rw = rg.getBoundingClientRect();
            return { text: e.textContent, dir: getComputedStyle(e).direction, klasse: e.className, breit: Math.round(r.width), quer: document.documentElement.scrollWidth > innerWidth,
              wortRechtsVonPunkten: rw.width === 0 ? null : rw.left >= rp.right - 1, auftrag: document.querySelector('.text-buehne__auftrag').textContent,
              hoch: document.documentElement.scrollHeight <= innerHeight + 1 };
          });
          const { root } = await cdp.send('DOM.getDocument', { depth: -1 });
          const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: '.text-buehne__zeile--buchstaben' });
          const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId });
          const datei = name + '-' + breite + '-' + thema + '-zeile' + (i + 1) + '.png';
          await p.screenshot({ path: path.join(ziel, datei) });
          console.log(datei + ' | ' + [...m.text].length + ' Zeichen, Woerter ' + m.text.replace(' · · ·', '').split(' ').filter(Boolean).length + ' | ' + m.dir + ' | Wort rechts von den Punkten: ' + m.wortRechtsVonPunkten +
            ' | quer: ' + m.quer + ' | passt in die Hoehe: ' + m.hoch + ' | Schrift: ' + fonts.map(f => f.familyName + ' ' + f.glyphCount).join(' + ') + ' | ' + m.auftrag);
          /* weiter zur naechsten neuen Zeile: aufdecken, konnte ich, ohne Hilfe, am Stueck, fliessend, naechste */
          await p.waitForSelector('[data-action="text-aufdecken"]:not(.gedimmt)', { timeout: 8000 }); await p.click('[data-action="text-aufdecken"]'); await p.waitForTimeout(700);
          await p.click('[data-action="text-konnte"][data-id="ja"]'); await p.waitForTimeout(300);
          await p.waitForSelector('[data-action="text-aufdecken"]:not(.gedimmt)', { timeout: 8000 }); await p.click('[data-action="text-aufdecken"]'); await p.waitForTimeout(700);
          await p.click('[data-action="text-konnte"][data-id="ja"]'); await p.waitForTimeout(300);
          await p.waitForSelector('[data-action="text-aufdecken"]:not(.gedimmt)', { timeout: 8000 }); await p.click('[data-action="text-aufdecken"]'); await p.waitForTimeout(700);
          await p.click('[data-action="text-am-stueck"][data-id="fliessend"]'); await p.waitForTimeout(400);
          if (!(await p.$('[data-action="text-lernen-weiter"]'))) break;
          await p.click('[data-action="text-lernen-weiter"]'); await p.waitForTimeout(400);
        }
        if (p.fehler.length) console.log('SEITENFEHLER ' + p.fehler.join('; '));
      } finally { await ctx.close(); }
    }
  } finally { await b.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

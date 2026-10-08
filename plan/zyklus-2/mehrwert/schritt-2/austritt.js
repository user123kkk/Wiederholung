/* Schritt 2: Bild fuer Bild messen, ob Blaetter beim Schliessen gleiten oder hart verschwinden,
   und ob Aufklapper (Ueben, Speicherkarten, Hinweis weg) den Inhalt darunter hart versetzen.
   Aufruf: node austritt.js */
const path = require('node:path');
const PS = path.resolve(__dirname, '../../../werkzeuge/pruefstand') + '/';
const { start, neueSeite, GERAETE, vollerStore } = require(PS + 'lib');

/* Startet die Bildmessung in der Seite, fuehrt dann die Handlung aus. */
async function messen(p, name, sel, tun, dauer = 420) {
  await p.evaluate(([sel, dauer]) => {
    window.__spur = [];
    const t0 = performance.now();
    function bild() {
      const e = document.querySelector(sel);
      const t = Math.round(performance.now() - t0);
      if (!e) window.__spur.push([t, null]);
      else { const r = e.getBoundingClientRect(); window.__spur.push([t, Math.round(r.top), +(+getComputedStyle(e).opacity).toFixed(2)]); }
      if (t < dauer) requestAnimationFrame(bild);
    }
    requestAnimationFrame(bild);
  }, [sel, dauer]);
  await tun();
  await p.waitForTimeout(dauer + 120);
  const spur = await p.evaluate(() => window.__spur);
  const lagen = [...new Set(spur.map(s => s[1] === null ? 'weg' : s[1] + '/' + s[2]))];
  console.log(JSON.stringify({ name, sel, bilder: spur.length, verschiedeneLagen: lagen.length, lagen: lagen.slice(0, 16) }));
}
const tipp = (p, action, id) => () => p.evaluate(([a, id]) => {
  const els = [...document.querySelectorAll('[data-action="' + a + '"]')].filter(e => id == null || e.dataset.id === id);
  (els.find(e => e.offsetParent !== null) || els[0]).click();
}, [action, id]);

(async () => {
  const b = await start();
  try {
    const { p } = await neueSeite(b, { ...GERAETE.handy, dpr: 1 }, { store: vollerStore({}), ls: { 'adrabic-thema': 'dunkel' } });
    await messen(p, 'Hinweis wegtippen: Serien-Karte darunter', '.serie-karte', tipp(p, 'hinweis-weg'));
    await tipp(p, 'bereich-sheet-auf')(); await p.waitForTimeout(600);
    await messen(p, 'Bereichs-Blatt zu (Escape)', '.dlg', () => p.keyboard.press('Escape'));
    await tipp(p, 'tab-verwalten')(); await p.waitForTimeout(800);
    await tipp(p, 'karte-neu')(); await p.waitForTimeout(600);
    await messen(p, 'Karte-anlegen-Blatt zu (Fertig)', '.dlg', tipp(p, 'karte-sheet-zu'));
    await tipp(p, 'karte-neu')(); await p.waitForTimeout(600);
    await messen(p, 'Karte-anlegen-Blatt zu (Escape)', '.dlg', () => p.keyboard.press('Escape'));
    await tipp(p, 'karte-neu')(); await p.waitForTimeout(600);
    await messen(p, 'Karte-anlegen-Blatt zu (Tippen daneben)', '.dlg', tipp(p, 'karte-sheet-neben'));
    await messen(p, 'Ueben aufklappen: Suchfeld darunter', '.view input[type="text"]', tipp(p, 'open-drill'));
    await messen(p, 'Ueben zuklappen: Suchfeld darunter', '.view input[type="text"]', tipp(p, 'close-drill'));
    await messen(p, 'Speicherkarten aufklappen: Suchfeld darunter', '.view input[type="text"]', tipp(p, 'toggle-sets'));
    await messen(p, 'Speicherkarten zuklappen: Suchfeld darunter', '.view input[type="text"]', tipp(p, 'toggle-sets'));
    await tipp(p, 'tab-lernen')(); await p.waitForTimeout(600);
    await tipp(p, 'einstellungen')(); await p.waitForTimeout(800);
    await tipp(p, 'logout')(); await p.waitForTimeout(600);
    await messen(p, 'Abmelden-Dialog zu (Escape)', '.dlg', () => p.keyboard.press('Escape'));
    console.log(JSON.stringify({ seitenfehler: p.fehler }));
  } finally { await b.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

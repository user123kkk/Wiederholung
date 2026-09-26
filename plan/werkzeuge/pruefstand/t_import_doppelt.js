/* G-079 (DATEN-15): normBereiche() verwarf beim Einspielen still einen
   zweiten Bereich mit gleichem Namen ("out.some(x => x.name === b.name)
   continue") - eine Sicherung mit zwei gleichnamigen Bereichen stellte nicht
   alles wieder her, ohne jede Meldung. Jetzt benennt der Import-Weg
   (normBereicheImport, nur fuer verarbeiteImportDaten) den zweiten Bereich
   mit "(2)" um - dieselbe Logik, die verarbeiteImportDaten schon fuer den
   Zusammenstoss mit einem VORHANDENEN Bereich benutzt.

   normBereiche() selbst bleibt unveraendert: an den anderen Aufrufstellen
   (Start, Cloud-Migration) ist das Verwerfen Absicht, siehe Kommentar an
   moveSelectedCardsTo ("Zwei gleichnamige Bereiche konnten sonst entstehen
   ... und dann traf das Verschieben den falschen").

   Abnahme (Befund): Datei mit zwei Bereichen "A" -> nach Einspielen "A" und
   "A (2)", Kartenzahl = Summe. */
const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { start, neueSeite, aktion, GERAETE, vollerStore } = require('./lib');
const APP_ALT = execFileSync('git', ['show', '3452fdc:app.js'], { cwd: path.join(__dirname, '../../..'), maxBuffer: 1 << 26 }).toString();

function datei2A() {
  return {
    exportedAt: new Date().toISOString(), profil: 'Test',
    bereiche: [
      { id: 'x1', name: 'A', karten: [{ wort: 'ein', uebersetzung: 'eins' }, { wort: 'zwei', uebersetzung: 'zwei' }], sets: [] },
      { id: 'x2', name: 'A', karten: [{ wort: 'drei', uebersetzung: 'drei' }, { wort: 'vier', uebersetzung: 'vier' }, { wort: 'fuenf', uebersetzung: 'fuenf' }], sets: [] }
    ]
  };
}

async function lauf(b, alt) {
  const vorher = alt ? ctx => ctx.route(u => u.hostname === '127.0.0.1' && u.pathname.endsWith('/app.js'),
    r => r.fulfill({ status: 200, contentType: 'text/javascript', body: APP_ALT })) : null;
  const { p, ctx } = await neueSeite(b, GERAETE.handy, { warte: 1500, store: vollerStore(), vorher });
  const datei = path.join(os.tmpdir(), 'adrabic-2a-' + (alt ? 'alt' : 'neu') + '.json');
  fs.writeFileSync(datei, JSON.stringify(datei2A()));
  await aktion(p, 'einstellungen', null, 800); await aktion(p, 'einst-seite', 'daten', 800);
  await p.setInputFiles('#import-file-input', datei); await p.waitForTimeout(900);
  // Bestaetigungsdialog (falls einer erscheint) mit dem letzten Knopf abschliessen.
  await p.evaluate(() => { const k = [...document.querySelectorAll('.dlg button')].pop(); if (k) k.click(); });
  await p.waitForTimeout(1200);
  const namen = await p.evaluate(() => [...window.__FB.store.entries()]
    .filter(([k]) => /^users\/u1\/bereiche\/[^/]+$/.test(k)).map(([, v]) => v.name));
  const kartenZahlA = await p.evaluate(() => {
    const S = window.__FB.store;
    const bereicheEintraege = [...S.entries()].filter(([k, v]) => /^users\/u1\/bereiche\/[^/]+$/.test(k) && (v.name === 'A' || v.name === 'A (2)'));
    let n = 0;
    for (const [k] of bereicheEintraege) {
      const bid = k.split('/').pop();
      n += [...S.keys()].filter(kk => kk.startsWith('users/u1/karten/') && S.get(kk).bereichId === bid).length;
    }
    return n;
  });
  const fehler = p.fehler.slice();
  await ctx.close();
  return { namen, kartenZahlA, fehler };
}

(async () => {
  const b = await start(); let funde = 0;
  const pruef = (n, ok, info) => { if (!ok) funde++; console.log((ok ? 'ok     ' : 'FEHLER ') + n + ' | ' + info); };

  const neu = await lauf(b, false);
  pruef('Bereich "A" vorhanden', neu.namen.includes('A'), neu.namen.join(', '));
  pruef('Bereich "A (2)" vorhanden (nicht verworfen)', neu.namen.includes('A (2)'), neu.namen.join(', '));
  pruef('Kartenzahl = Summe (2 + 3 = 5)', neu.kartenZahlA === 5, neu.kartenZahlA);
  pruef('keine Seitenfehler', !neu.fehler.length, neu.fehler.join(' / '));

  const alt = await lauf(b, true);
  pruef('Gegenprobe 3452fdc: "A (2)" fehlt (muss ROT sein)', !alt.namen.includes('A (2)'), alt.namen.join(', '));

  console.log('Funde: ' + funde); await b.close(); process.exit(funde ? 1 : 0);
})();

/* Stufe 1 (texte-lernen/KONZEPT.md § 13, § 14 "A"): Textzeilen erscheinen
   nirgends als Karten. Gemessen als Vergleich zweier Konten:
     A = vollerStore (40 Karten)
     B = A + ein Text mit 10 Zeilen in Bereich b1 (faellig, ueberfaellig,
         neu, fest; eine Zeile mit demselben Wort wie eine Karte).
   Bei B muss die App genau dasselbe zeigen wie bei A: Lernen-, Verwalten-
   und Fortschritt-Tab (ganzer Text), Rundengroesse beim Start, Kartensuche,
   Duplikat-Warnung, Ueben-Liste, Statistik-Zahlen, "offen"-Zaehlung.
   Die Texte-Oberflaeche kommt erst in Stufe 2; bis dahin muss B = A sein.
   --gegenprobe: app.js aus 48002ad (vor Stufe 1) - dort zaehlen die Zeilen
   mit, A und B muessen sich also unterscheiden. */
const { start, vollerStore } = require('./lib');
const { textStore, seiteMitApp, VOR_STUFE_1 } = require('./text_lib');

const gegenprobe = process.argv.includes('--gegenprobe');
const commit = gegenprobe ? VOR_STUFE_1 : null;
const zusatz = `
  intern: () => ({
    karten: currentCards().length,
    karteMitTextId: currentCards().some(c => c.textId),
    faellig: dueCardsFor(currentBereich()).length,
    duplikatZeile: !!findeDuplikat('Testzeile 1 eins zwei drei'),
    duplikatKarte: !!findeDuplikat('كِتَابٌ'),
    uebbar: typeof uebbareKarten === 'function' ? uebbareKarten().length : null,
    offen: bereicheMitOffenem().map(b => b.name).join(','),
    stats: JSON.stringify(statsCards(currentCards())),
  }),
  tab: t => { const k = document.querySelector('[data-action="tab-' + t + '"]'); if (k) k.click(); },`;

async function aufnehmen(browser, store) {
  const { ctx, p } = await seiteMitApp(browser, store, { commit, zusatz });
  const r = { intern: await p.evaluate(() => window.__PRUEF.intern()) };
  for (const t of ['lernen', 'verwalten', 'fortschritt']) {
    await p.evaluate(t => window.__PRUEF.tab(t), t);
    await p.waitForTimeout(700);
    r[t] = await p.evaluate(() => document.getElementById('app').innerText.replace(/\s+/g, ' ').trim());
  }
  // Kartensuche im Verwalten-Tab
  await p.evaluate(() => window.__PRUEF.tab('verwalten'));
  await p.waitForTimeout(500);
  const feld = await p.$('input[type="text"][aria-label*="uch"]');
  if (feld) {
    await feld.fill('Testzeile');
    await p.waitForTimeout(500);
    r.suche = await p.evaluate(() => document.getElementById('app').innerText.replace(/\s+/g, ' ').trim());
  } else r.suche = 'kein Suchfeld';
  // Runde starten
  await p.evaluate(() => window.__PRUEF.tab('lernen'));
  await p.waitForTimeout(500);
  const gestartet = await p.evaluate(() => { const k = document.querySelector('[data-action="start-session"]'); if (!k) return false; k.click(); return true; });
  await p.waitForTimeout(900);
  r.runde = gestartet ? await p.evaluate(() => (document.body.innerText.match(/Karte \d+ von \d+/) || ['?'])[0]) : 'kein Start';
  r.rundeZeigtZeile = await p.evaluate(() => document.body.innerText.includes('Testzeile'));
  r.fehler = p.fehler;
  await ctx.close();
  return r;
}

(async () => {
  const browser = await start();
  let a, b;
  try {
    a = await aufnehmen(browser, vollerStore());
    // Zeile 10 bekommt dasselbe Wort wie Karte k0 (Duplikat-Warnung)
    b = await aufnehmen(browser, textStore({ wortVon: i => i === 9 ? 'كِتَابٌ' : 'Testzeile ' + (i + 1) + ' eins zwei drei' }));
  } finally { await browser.close(); }

  const unterschiede = [];
  for (const k of Object.keys(a.intern)) {
    if (k === 'duplikatZeile') continue;
    if (JSON.stringify(a.intern[k]) !== JSON.stringify(b.intern[k])) unterschiede.push('intern.' + k + ': ' + JSON.stringify(a.intern[k]).slice(0, 60) + ' / ' + JSON.stringify(b.intern[k]).slice(0, 60));
  }
  if (b.intern.duplikatZeile) unterschiede.push('Duplikat-Warnung trifft eine Textzeile');
  if (b.intern.karteMitTextId) unterschiede.push('currentCards() enthaelt Textzeilen');
  for (const t of ['lernen', 'verwalten', 'fortschritt']) if (a[t] !== b[t]) {
    let i = 0; while (a[t][i] === b[t][i]) i++;
    unterschiede.push(t + '-Tab weicht ab bei: "' + a[t].slice(Math.max(0, i - 30), i + 40) + '" / "' + b[t].slice(Math.max(0, i - 30), i + 40) + '"');
  }
  if (a.suche !== b.suche) unterschiede.push('Kartensuche weicht ab: "' + String(a.suche).slice(0, 80) + '" / "' + String(b.suche).slice(0, 80) + '"');
  if (a.runde !== b.runde) unterschiede.push('Runde: ' + a.runde + ' / ' + b.runde);
  if (b.rundeZeigtZeile) unterschiede.push('Runde zeigt eine Textzeile');
  console.log('A: ' + a.intern.karten + ' Karten, ' + a.intern.faellig + ' faellig, Runde "' + a.runde + '", Suche-Feld ' + (a.suche === 'kein Suchfeld' ? 'fehlt' : 'da'));
  console.log('B: ' + b.intern.karten + ' Karten, ' + b.intern.faellig + ' faellig, Runde "' + b.runde + '"');
  if (a.suche === 'kein Suchfeld') unterschiede.push('Messfehler: Suchfeld nicht gefunden');
  if (a.runde === 'kein Start' || a.runde === '?') unterschiede.push('Messfehler: Runde nicht gestartet');
  const seitenfehler = a.fehler.concat(b.fehler);
  if (seitenfehler.length) unterschiede.push('Seitenfehler: ' + seitenfehler.slice(0, 3).join(' | '));

  if (gegenprobe) {
    const ok = unterschiede.filter(u => !u.startsWith('Messfehler') && !u.startsWith('Seitenfehler')).length >= 3;
    console.log(unterschiede.map(u => '  ' + u).join('\n'));
    console.log(ok ? 'Gegenprobe wie erwartet rot (' + unterschiede.length + ' Unterschiede)' : 'FEHLER Gegenprobe: zu wenige Unterschiede');
    process.exitCode = ok ? 0 : 1;
  } else {
    if (unterschiede.length) console.log('ROT:\n  ' + unterschiede.join('\n  '));
    else console.log('OK: B zeigt genau dasselbe wie A');
    process.exitCode = unterschiede.length ? 1 : 0;
  }
})().catch(e => { console.error(e); process.exitCode = 1; });

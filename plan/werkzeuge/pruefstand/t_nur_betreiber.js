/* Betreiber 30.09.2026: "alles mit Auswendiglernen und Quran soll nur fuer
   mich sichtbar sein - ein Freund nutzt die Seite schon."
   Historischer Vergleich (--historisch): normales Konto mit der VEROEFFENTLICHTEN
   Fassung (3.17.56, eigener Server auf einem git-worktree dieses Commits)
   und einmal mit dem aktuellen Stand - und verlangt: jeder Bildschirm
   gleich, im HTML (ohne Versionsnummer) und Pixel fuer Pixel.
   Seit Paket C (02.10.2026) sind normale Bildschirme ausdruecklich geaendert.
   Die regulaere Abnahme isoliert deshalb die Textfreigabe im aktuellen
   Quellstand: Schalter erzwungen aus gegen reale Freigabe. Alle sieben
   Bildschirme bleiben im HTML und Pixelvergleich; die Gegenproben muessen
   weiterhin Betreiber-Freigabe und eine entsperrte Schrift erkennen.
   Im Konto liegt eine Karte mit einem Quran-Wort mit U+06DF (2:5, erstes
   Wort, unveraendert aus quran/tanzil-uthmani.txt) - die Schrift-Korrektur
   3.18.6 darf dort nichts aendern.
   Bildschirme: Lernen, Runde (Karte, aufgedeckt), Fortschritt, Verwalten,
   Karte anlegen, Einstellungen - Handy 390 und Desktop 1440.
   Gegenproben: Betreiber-Konto unterscheidet sich; ohne die Sperre der
   Schrift-Korrektur (tanzilSchriftMarkieren) sieht auch u1 etwas Neues. */
const fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { execFileSync, spawn } = require('node:child_process');
const { start, vollerStore } = require('./lib');
const { seiteMitApp, BETREIBER_UID } = require('./text_lib');
const VEROEFFENTLICHT = 'a4b5677';   // 3.17.56, Hosting-Stand der damaligen Text-Abnahme
const historisch = process.argv.includes('--historisch');
const OHNE_TEXTE = ['function texteFreigeschaltet() {\n  return !!(currentUser && BETREIBER_UIDS.indexOf(currentUser.uid) !== -1);\n}',
  'function texteFreigeschaltet() {\n  return false;\n}'];
const repo = path.join(__dirname, '../../..');
const PORT_ALT = 8298;
const WORT = fs.readFileSync(path.join(repo, 'quran/tanzil-uthmani.txt'), 'utf8').split('\n')
  .find(l => l.startsWith('2|5|')).split('|')[2].split(' ')[0];
/* Gleicher Zufall in beiden Fassungen (Reihenfolge der Runde). */
const zusatz = `_zufall: (Math.random = (() => { let s = 7; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })()),`;

function store() {
  const s = vollerStore();
  s['users/u1/karten/k0'].wort = WORT;
  return s;
}
async function bilder(browser, base, commit, uid, viewport, ersetze) {
  const { ctx, p } = await seiteMitApp(browser, store(), { base, commit, uid, zusatz, viewport, ersetze });
  await p.emulateMedia({ reducedMotion: 'reduce' });
  const out = [];
  const halt = async name => {
    await p.waitForTimeout(700);
    /* Sonst zeichnet mal die Ersatzschrift (King-Fahd noch nicht geladen):
       17 Pixel Unterschied bei einem Lauf von dreien (30.09.). */
    await p.evaluate(() => document.fonts.load('20px UthmanicHafs', 'ب').then(() => document.fonts.ready).catch(() => {}));
    await p.waitForTimeout(150);
    const html = await p.evaluate(() => document.getElementById('app').innerHTML
      .replace(/\d+\.\d+\.\d+/g, 'V').replace(/data-affe="\d+"/g, ''));
    out.push({ name, html, png: (await p.screenshot()).toString('base64') });
  };
  /* Nur sichtbare Knoepfe (am Desktop gibt es manche doppelt, einer verborgen). */
  const klick = async sel => {
    for (const e of await p.$$(sel)) if (await e.isVisible()) { await e.click({ timeout: 5000 }).catch(() => {}); return true; }
    return false;
  };
  try {
    await halt('Lernen');
    if (await klick('[data-action="start-session"]')) {
      await halt('Runde');
      await p.keyboard.press('Space'); await halt('Runde aufgedeckt');
      await klick('[data-action="end-session"], [data-action="session-zu"], .modebar [data-action]');
    }
    await klick('[data-action="tab-fortschritt"]'); await halt('Fortschritt');
    await klick('[data-action="tab-verwalten"]'); await halt('Verwalten');
    if (await klick('[data-action="karte-neu"], [data-action="neu-wahl"]')) { await halt('Anlegen'); await p.keyboard.press('Escape'); }
    await klick('[data-action="einstellungen"]'); await halt('Einstellungen');
    if (p.fehler.length) out.push({ name: 'Seitenfehler', html: p.fehler.join('; '), png: '' });
  } finally { await ctx.close(); }
  return out;
}
/* Pixel vergleichen im Browser (keine PNG-Bibliothek noetig). */
async function pixelDiff(browser, a, b) {
  const p = await browser.newPage();
  const n = await p.evaluate(async ([a, b]) => {
    const lade = async s => { const i = new Image(); i.src = 'data:image/png;base64,' + s; await i.decode(); return i; };
    const [x, y] = [await lade(a), await lade(b)];
    if (x.width !== y.width || x.height !== y.height) return -1;
    const c = document.createElement('canvas'); c.width = x.width; c.height = x.height;
    const g = c.getContext('2d');
    g.drawImage(x, 0, 0); const d1 = g.getImageData(0, 0, c.width, c.height).data;
    g.clearRect(0, 0, c.width, c.height); g.drawImage(y, 0, 0); const d2 = g.getImageData(0, 0, c.width, c.height).data;
    let n = 0, x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
    /* Kantenglaettung runder Raender schwankt zwischen Laeufen um 1-4
       Farbstufen je Kanal, zusammen bis 12 (30.09. gemessen); echte Aenderungen (andere Schrift,
       anderer Inhalt) weichen um Hunderte ab. Gezaehlt ab > 24. */
    for (let i = 0; i < d1.length; i += 4) if (Math.abs(d1[i] - d2[i]) + Math.abs(d1[i + 1] - d2[i + 1]) + Math.abs(d1[i + 2] - d2[i + 2]) > 24) {
      n++; const px = (i / 4) % c.width, py = Math.floor(i / 4 / c.width);
      x0 = Math.min(x0, px); y0 = Math.min(y0, py); x1 = Math.max(x1, px); y1 = Math.max(y1, py);
    }
    return n ? n + ' (Bereich x ' + x0 + '-' + x1 + ', y ' + y0 + '-' + y1 + ')' : 0;
  }, [a, b]);
  await p.close();
  return n;
}
async function vergleich(browser, uid, viewport, baseNeu, ersetze) {
  const alt = historisch
    ? await bilder(browser, 'http://127.0.0.1:' + PORT_ALT + '/index.html', VEROEFFENTLICHT, uid, viewport)
    : await bilder(browser, baseNeu, null, uid, viewport, OHNE_TEXTE);
  const neu = await bilder(browser, baseNeu, null, uid, viewport, ersetze);
  const befunde = [];
  if (alt.map(x => x.name).join() !== neu.map(x => x.name).join()) befunde.push('Bildschirme: ' + alt.map(x => x.name).join() + ' / ' + neu.map(x => x.name).join());
  for (let i = 0; i < Math.min(alt.length, neu.length); i++) {
    const [a, n] = [alt[i], neu[i]];
    if (a.name === 'Seitenfehler' || n.name === 'Seitenfehler') { befunde.push(a.name + ': ' + a.html + ' / ' + n.html); continue; }
    if (a.html !== n.html) {
      let k = 0; while (k < a.html.length && a.html[k] === n.html[k]) k++;
      befunde.push(a.name + ' HTML anders ab: …' + a.html.slice(Math.max(0, k - 60), k + 80) + ' ⇄ …' + n.html.slice(Math.max(0, k - 60), k + 80));
    }
    const px = await pixelDiff(browser, a.png, n.png);
    if (px !== 0) { befunde.push(a.name + ': ' + (px < 0 ? 'andere Bildgroesse' : px + ' Pixel anders')); try { fs.writeFileSync(path.join(os.tmpdir(), 'nur_betreiber_' + a.name + '_alt.png'), Buffer.from(a.png, 'base64')); fs.writeFileSync(path.join(os.tmpdir(), 'nur_betreiber_' + a.name + '_neu.png'), Buffer.from(n.png, 'base64')); } catch (_) {} }
  }
  return { befunde, anzahl: alt.length };
}

(async () => {
  let server = null;
  // Die regulaere Abnahme vergleicht nur aktuelle Quellen. Ein historischer
  // Checkout/Server wird ausschliesslich fuer --historisch benoetigt.
  if (historisch) {
    const wt = path.join(os.tmpdir(), 'adrabic-veroeffentlicht-' + VEROEFFENTLICHT);
    if (!fs.existsSync(path.join(wt, 'index.html'))) {
      try { execFileSync('git', ['-C', repo, 'worktree', 'remove', '--force', wt], { stdio: 'ignore' }); } catch (_) {}
      execFileSync('git', ['-C', repo, 'worktree', 'add', '--detach', wt, VEROEFFENTLICHT], { stdio: 'ignore' });
    }
    const py = process.platform === 'win32' ? 'py' : 'python3';
    server = spawn(py, (process.platform === 'win32' ? ['-3'] : []).concat(['-m', 'http.server', String(PORT_ALT), '--bind', '127.0.0.1']), { cwd: wt, stdio: 'ignore' });
    await new Promise(r => setTimeout(r, 1500));
  }
  const browser = await start();
  const fehler = [];
  try {
    const baseNeu = 'http://127.0.0.1:' + (process.env.PRUEF_PORT || 8099) + '/index.html';
    for (const vp of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
      const r = await vergleich(browser, 'u1', vp, baseNeu);
      console.log('(lesen) normales Konto ' + vp.width + ': ' + r.anzahl + ' Bildschirme, ' + (r.befunde.length ? r.befunde.length + ' Unterschiede' : 'alle gleich'));
      if (r.anzahl !== 7) fehler.push(vp.width + ': Rundgang unvollstaendig: ' + r.anzahl + ' statt 7 Bildschirme');
      fehler.push(...r.befunde.map(x => vp.width + ': ' + x));
    }
    const g = await vergleich(browser, BETREIBER_UID, { width: 390, height: 844 }, baseNeu);
    console.log('Gegenprobe Betreiber-Konto: ' + g.befunde.length + ' Unterschiede (erwartet > 0)');
    if (!g.befunde.length) fehler.push('Gegenprobe: Betreiber sieht dasselbe ohne Textfreigabe - Test misst nichts');
    const s = await vergleich(browser, 'u1', { width: 390, height: 844 }, baseNeu, ['  if (!texteFreigeschaltet()) return;\n  for (const el of wurzel', '  for (const el of wurzel']);
    console.log('Gegenprobe ohne Sperre der Schrift-Korrektur: ' + s.befunde.length + ' Unterschiede (erwartet > 0): ' + s.befunde.join(' | ').slice(0, 200));
    if (!s.befunde.length) fehler.push('Gegenprobe: Schrift-Korrektur fuer alle bliebe unbemerkt');
    if (!historisch) {
      const offen = await vergleich(browser, 'u1', { width: 390, height: 844 }, baseNeu,
        [OHNE_TEXTE[0], 'function texteFreigeschaltet() {\n  return true;\n}']);
      console.log('Gegenprobe Textfreigabe fuer normales Konto: ' + offen.befunde.length + ' Unterschiede (erwartet > 0)');
      if (!offen.befunde.length) fehler.push('Gegenprobe: Textfreigabe fuer alle bliebe unbemerkt');
    }
  } catch (e) { fehler.push('Abbruch: ' + e.message.split('\n')[0]); } finally { await browser.close(); server?.kill(); }
  if (fehler.length) { console.log('FEHLER:\n' + fehler.join('\n')); process.exitCode = 1; }
  else console.log('OK t_nur_betreiber: ' + (historisch ? 'normales Konto sieht jeden Bildschirm wie in 3.17.56' : 'Textfreigabe aendert keinen der sieben Bildschirme normaler Konten; HTML und Pixel gleich'));
})();

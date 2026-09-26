/* 3.17.41 (G-022/DATEN-10): Ein grosser Import legt ALLE Schreibstapel sofort
   an (Offline-Warteschlange), statt jeden erst nach der Server-Bestaetigung
   des vorigen. Nachgestellt: 1000 Karten sichern, dann mit einem Server, der
   nie antwortet (window.__COMMIT_HAENGT, wie offline), wieder einspielen -
   die Zahl der commit()-Aufrufe muss >= 3 sein (1000+ Vorgaenge / 400).
   Gegenprobe fest gegen app.js aus 3452fdc (Stand vor 3.17.41): dort bleibt
   es bei 1 commit(). Aufruf: node t_import_stapel.js */
const { execFileSync } = require('child_process');
const path = require('path');
const { start, neueSeite, aktion, GERAETE, vollerStore } = require('./lib');
const APP_ALT = execFileSync('git', ['show', '3452fdc:app.js'], { cwd: path.join(__dirname, '../../..'), maxBuffer: 1 << 26 }).toString();

function store1000() {
  const s = vollerStore();
  for (let i = 0; i < 1000; i++) s['users/u1/karten/q' + i] = { wort: 'wort' + i, uebersetzung: 'Wort ' + i, extra: '', stufe: 0,
    nextReview: null, ersteBewertung: null, rueckfaelle: 0, quelleId: null, maxStufe: 0, order: i, bereichId: 'b2' };
  return s;
}
async function lauf(b, alt) {
  const vorher = alt ? ctx => ctx.route(u => u.hostname === '127.0.0.1' && u.pathname.endsWith('/app.js'),
    r => r.fulfill({ status: 200, contentType: 'text/javascript', body: APP_ALT })) : null;
  const { p, ctx } = await neueSeite(b, GERAETE.handy, { warte: 2500, store: store1000(), vorher });
  await aktion(p, 'einstellungen', null, 800); await aktion(p, 'einst-seite', 'daten', 800);
  const [dl] = await Promise.all([p.waitForEvent('download', { timeout: 8000 }), aktion(p, 'export-backup', null, 800)]);
  const datei = path.join(require('os').tmpdir(), 'adrabic-stapel-' + (alt ? 'alt' : 'neu') + '.json'); await dl.saveAs(datei);
  await p.evaluate(() => { window.__COMMIT_HAENGT = true; window.__FB.protokoll.length = 0; });
  await p.setInputFiles('#import-file-input', datei); await p.waitForTimeout(1200);
  await p.evaluate(() => { const k = [...document.querySelectorAll('.dlg button')].pop(); if (k) k.click(); });
  await p.waitForTimeout(2500);
  const commits = await p.evaluate(() => window.__FB.protokoll.filter(x => x === 'commit').length);
  const fehler = p.fehler.slice();
  await ctx.close();
  return { commits, fehler };
}
(async () => {
  const b = await start(); let funde = 0;
  const pruef = (n, ok, info) => { if (!ok) funde++; console.log((ok ? 'ok     ' : 'FEHLER ') + n + ' | ' + info); };
  const neu = await lauf(b, false);
  pruef('alle Stapel sofort angelegt (>= 3 commit, Server antwortet nie)', neu.commits >= 3, 'commit: ' + neu.commits);
  pruef('keine Seitenfehler', !neu.fehler.length, neu.fehler.join(' / '));
  const alt = await lauf(b, true);
  pruef('Gegenprobe 3452fdc: nur der erste Stapel (muss ROT sein)', alt.commits === 1, 'commit: ' + alt.commits);
  console.log('Funde: ' + funde); await b.close(); process.exit(funde ? 1 : 0);
})();

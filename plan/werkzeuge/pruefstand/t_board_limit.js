/* 3.17.38 (G-016/REGELN-5): firestore.rules erlaubt das Auflisten von
   feedback nur mit limit <= 100 (die Attrappe lehnt es ebenso ab).
   (a) Board mit 150 Ideen laedt ohne Fehler und zeigt hoechstens 100.
   (b) Konto loeschen entfernt ALLE 150 eigenen Stimm-Merker (seitenweise).
   Gegenprobe fest gegen app.js aus 1c8aaa1 (Stand vor 3.17.38): dort
   scheitert das Board an der strengen Attrappe. Aufruf: node t_board_limit.js */
const { execFileSync } = require('child_process');
const path = require('path');
const { start, neueSeite, aktion, GERAETE, vollerStore } = require('./lib');
const APP_ALT = execFileSync('git', ['show', '1c8aaa1:app.js'], { cwd: path.join(__dirname, '../../..'), maxBuffer: 1 << 26 }).toString();

function store150() {
  const s = vollerStore();
  for (let i = 0; i < 150; i++) {
    const id = 'f' + String(i).padStart(3, '0');
    s['feedback/' + id] = { text: 'Idee ' + i, erstelltAm: '2026-09-20T10:00:00Z', votes: i % 7, status: 'offen' };
    s['feedback/' + id + '/votes/u1'] = {};
  }
  return s;
}
async function board(b, alt) {
  const vorher = alt ? ctx => ctx.route(u => u.hostname === '127.0.0.1' && u.pathname.endsWith('/app.js'),
    r => r.fulfill({ status: 200, contentType: 'text/javascript', body: APP_ALT })) : null;
  const { p, ctx } = await neueSeite(b, GERAETE.handy, { warte: 1800, store: store150(), vorher });
  await aktion(p, 'einstellungen', null, 1000);
  await aktion(p, 'einst-seite', 'feedback', 2500);
  const r = await p.evaluate(() => ({ zeilen: document.querySelectorAll('#ideen-inhalt .ideen-zeile:not(.ideen-zeile--platz)').length,
    fehler: !!document.querySelector('#ideen-inhalt .error-box, #ideen-inhalt [data-action="feedback-neu-laden"]') }));
  return { p, ctx, r };
}
(async () => {
  const b = await start(); let funde = 0;
  const pruef = (n, ok, info) => { if (!ok) funde++; console.log((ok ? 'ok     ' : 'FEHLER ') + n + ' | ' + info); };
  const { p, ctx, r } = await board(b, false);
  pruef('(a) Board laedt ohne Fehler, hoechstens 100 Ideen', !r.fehler && r.zeilen > 0 && r.zeilen <= 100, JSON.stringify(r));
  await p.evaluate(() => { const k = document.querySelector('[data-action="einstellungen"]'); if (k) k.click(); }); await p.waitForTimeout(800);
  await p.evaluate(() => { const k = document.querySelector('[data-action="einst-seite"][data-id="konto-loeschen"]'); if (k) k.click(); });
  await p.waitForTimeout(900);
  await p.fill('#konto-loeschen-email', 'test@example.com'); await p.waitForTimeout(300);
  const k = await (await p.$('[data-action="delete-account"]')).boundingBox();
  await p.mouse.move(k.x + k.width / 2, k.y + k.height / 2); await p.mouse.down(); await p.waitForTimeout(2300); await p.mouse.up(); await p.waitForTimeout(500);
  if (await p.$('#dlg-input')) { await p.fill('#dlg-input', 'geheim'); await p.evaluate(() => { const x = [...document.querySelectorAll('.dlg button')].find(y => y.innerText.trim() === 'Weiter'); if (x) x.click(); }); }
  await p.waitForTimeout(2500);
  const rest = await p.evaluate(() => [...window.__FB.store.keys()].filter(x => /^feedback\/[^/]+\/votes\/u1$/.test(x)).length).catch(() => -1);
  pruef('(b) nach dem Loeschen keine eigenen Stimm-Merker mehr', rest === 0, 'uebrig: ' + rest);
  pruef('(c) keine Seitenfehler', !p.fehler.length, p.fehler.join(' / '));
  await ctx.close();
  const alt = await board(b, true);
  pruef('Gegenprobe 1c8aaa1: Board scheitert an der Mengenbremse (muss ROT sein)', alt.r.fehler || alt.r.zeilen === 0, JSON.stringify(alt.r));
  await alt.ctx.close();
  console.log('Funde: ' + funde); await b.close(); process.exit(funde ? 1 : 0);
})();

/* 3.17.40 (G-058/REGELN-12): Im catch von feedbackAbstimmen() kam bisher nur
   die zurueckgedrehte Anzeige, keine Meldung in Worten (LEHREN § 8.4). Mit
   __FB.fail = true muss nach dem Tipp auf den Herz-Knopf ein Toast mit
   fehlerKlartext(e) stehen, und die Stimme muss zurueckgedreht sein.
   Gegenprobe fest gegen app.js aus c70729b (Stand vor 3.17.40).
   Aufruf: node t_abstimmen_fehler.js */
const { execFileSync } = require('child_process');
const path = require('path');
const { start, neueSeite, aktion, GERAETE, vollerStore } = require('./lib');
const APP_ALT = execFileSync('git', ['show', 'c70729b:app.js'], { cwd: path.join(__dirname, '../../..'), maxBuffer: 1 << 26 }).toString();

function storeMitIdee() {
  const s = vollerStore();
  s['feedback/f1'] = { text: 'Karten mit Bild', erstelltAm: '2026-09-20T10:00:00Z', votes: 3, status: 'offen' };
  return s;
}

async function lauf(b, alt) {
  const vorher = ctx => alt ? ctx.route(u => u.hostname === '127.0.0.1' && u.pathname.endsWith('/app.js'),
    r => r.fulfill({ status: 200, contentType: 'text/javascript', body: APP_ALT })) : Promise.resolve();
  const { p, ctx } = await neueSeite(b, GERAETE.handy, { warte: 1500, store: storeMitIdee(), vorher });
  await aktion(p, 'einstellungen', null, 900);
  await aktion(p, 'einst-seite', 'feedback', 1800);
  const vorherStimmen = await p.evaluate(() => document.querySelector('.ideen-stimme span').textContent.trim());
  await p.evaluate(() => { window.__FB.fail = true; });
  await aktion(p, 'feedback-vote', 'f1', 900);
  const nachher = await p.evaluate(() => ({
    stimmen: document.querySelector('.ideen-stimme span') ? document.querySelector('.ideen-stimme span').textContent.trim() : null,
    toast: document.querySelector('.toast-wrap .toast span') ? document.querySelector('.toast-wrap .toast span').textContent : null
  }));
  return { p, ctx, vorherStimmen, nachher };
}

(async () => {
  const b = await start(); let funde = 0;
  const pruef = (n, ok, info) => { if (!ok) funde++; console.log((ok ? 'ok     ' : 'FEHLER ') + n + ' | ' + info); };

  const r = await lauf(b, false);
  pruef('(a) Stimme nach Fehlschlag zurueckgedreht', r.nachher.stimmen === r.vorherStimmen, r.vorherStimmen + ' -> ' + r.nachher.stimmen);
  pruef('(b) Toast mit Klartext nach dem Fehlschlag', !!r.nachher.toast && /abgelehnt|Verbindung|geklappt|Anfragen/.test(r.nachher.toast), JSON.stringify(r.nachher.toast));
  pruef('(c) keine Seitenfehler', !r.p.fehler.length, r.p.fehler.join(' / '));
  await r.ctx.close();

  const alt = await lauf(b, true);
  pruef('Gegenprobe c70729b: kein Toast nach dem Fehlschlag (muss ROT sein)', !alt.nachher.toast, JSON.stringify(alt.nachher));
  await alt.ctx.close();

  console.log('Funde: ' + funde); await b.close(); process.exit(funde ? 1 : 0);
})();

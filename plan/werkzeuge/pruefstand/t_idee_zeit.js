/* 3.17.40 (G-057/REGELN-10): Neue Ideen schreiben erstelltAm als
   fb.serverTimestamp() (echtes Firestore-Timestamp mit toMillis()) statt
   ISO-Text, damit die kommende Regel "erstelltAm == request.time" verlangen
   kann. ideeZeit() macht daraus ueberall dieselbe Vergleichszahl - fuer
   alte String-Ideen, echte Timestamps UND den lokalen Platzhalter direkt
   nach dem Anlegen (die Sentinel loest sich erst am Server auf).
   Gegenprobe fest gegen app.js aus c70729b (Stand vor 3.17.40): dort ist
   erstelltAm ein ISO-Text, kein Timestamp-Objekt.
   Aufruf: node t_idee_zeit.js */
const { execFileSync } = require('child_process');
const path = require('path');
const { start, neueSeite, aktion, GERAETE, vollerStore } = require('./lib');
const APP_ALT = execFileSync('git', ['show', 'c70729b:app.js'], { cwd: path.join(__dirname, '../../..'), maxBuffer: 1 << 26 }).toString();

function storeAlteIdee() {
  const s = vollerStore();
  s['feedback/alt'] = { text: 'Alte Idee (ISO-Text)', erstelltAm: '2020-01-01T00:00:00.000Z', votes: 0, status: 'offen' };
  return s;
}

async function lauf(b, alt) {
  const vorher = alt ? ctx => ctx.route(u => u.hostname === '127.0.0.1' && u.pathname.endsWith('/app.js'),
    r => r.fulfill({ status: 200, contentType: 'text/javascript', body: APP_ALT })) : null;
  const { p, ctx } = await neueSeite(b, GERAETE.handy, { warte: 1600, store: storeAlteIdee(), vorher });
  await aktion(p, 'einstellungen', null, 900);
  await aktion(p, 'einst-seite', 'feedback', 1800);
  await aktion(p, 'feedback-form-auf', null, 500);
  await p.fill('#fb-text', 'Neue Idee (frisch)');
  await aktion(p, 'feedback-submit', null, 900);
  const r = await p.evaluate(() => {
    const store = window.__FB.store;
    let neuPfad = null, neuDok = null;
    for (const [k, v] of store) { if (k.startsWith('feedback/') && !k.includes('/votes/') && k !== 'feedback/alt') { neuPfad = k; neuDok = v; } }
    const typ = neuDok ? (neuDok.erstelltAm && typeof neuDok.erstelltAm.toMillis === 'function' ? 'timestamp' :
      typeof neuDok.erstelltAm === 'string' ? 'string' : typeof neuDok.erstelltAm) : 'kein-dokument';
    const millis = neuDok && neuDok.erstelltAm && typeof neuDok.erstelltAm.toMillis === 'function' ? neuDok.erstelltAm.toMillis() : null;
    const texte = [...document.querySelectorAll('#ideen-inhalt .ideen-zeile strong')].map(e => e.textContent.trim());
    return { typ, millis, texte };
  });
  return { p, ctx, r };
}

(async () => {
  const b = await start(); let funde = 0;
  const pruef = (n, ok, info) => { if (!ok) funde++; console.log((ok ? 'ok     ' : 'FEHLER ') + n + ' | ' + info); };

  const r = await lauf(b, false);
  pruef('(a) neue Idee traegt ein Timestamp-Objekt im Store', r.r.typ === 'timestamp', JSON.stringify(r.r.typ) + ' millis=' + r.r.millis);
  pruef('(b) die Zahl daraus ist ein gueltiger Zeitpunkt (aus der Naehe von jetzt)', typeof r.r.millis === 'number' && Math.abs(Date.now() - r.r.millis) < 60000, String(r.r.millis));
  pruef('(c) Liste sortiert gemischt alt/neu richtig: frische Idee zuerst', r.r.texte[0] === 'Neue Idee (frisch)', JSON.stringify(r.r.texte));
  pruef('(d) alte Idee bleibt in der Liste', r.r.texte.includes('Alte Idee (ISO-Text)'), JSON.stringify(r.r.texte));
  pruef('(e) keine Seitenfehler', !r.p.fehler.length, r.p.fehler.join(' / '));
  await r.ctx.close();

  const alt = await lauf(b, true);
  pruef('Gegenprobe c70729b: erstelltAm ist ISO-Text, kein Timestamp (muss ROT sein)', alt.r.typ !== 'timestamp', JSON.stringify(alt.r.typ));
  await alt.ctx.close();

  console.log('Funde: ' + funde); await b.close(); process.exit(funde ? 1 : 0);
})();

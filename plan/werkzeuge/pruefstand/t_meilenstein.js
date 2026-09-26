/* 3.17.40 (G-061/REST-7): Der Meilenstein-Hinweis nannte die Marke
   (naechster erreichter Wert aus MEILENSTEINE, z.B. "25"), der Fortschritt
   im selben Konto die echte Zahl ("36 von 40 ..."), weil gesesseneKarten()
   anders zaehlte als statsCards()/fortschrittStoff(). Jetzt nennt der
   Hinweis dieselbe echte Zahl wie der Fortschritt - die Marke loest nur noch
   aus. vollerStore() hat 36 gesessene von 40 Karten (8 mit stufe 1-4 + 28
   mit stufe 2-10), die naechste MEILENSTEINE-Marke darunter ist 25 - also
   genau der in REST-7 gemessene Fall.
   Gegenprobe fest gegen app.js aus c70729b (Stand vor 3.17.40).
   Aufruf: node t_meilenstein.js */
const { execFileSync } = require('child_process');
const path = require('path');
const { start, neueSeite, aktion, GERAETE, vollerStore, tag } = require('./lib');
const APP_ALT = execFileSync('git', ['show', 'c70729b:app.js'], { cwd: path.join(__dirname, '../../..'), maxBuffer: 1 << 26 }).toString();

function storeMitHeuteGelernt() {
  const s = vollerStore();
  /* vollerStore() traegt in verlauf nie einen Eintrag fuer HEUTE (die
     Schleife beginnt bei i=1) - ohne diesen Eintrag greift zuerst der
     Serie-Hinweis (Punkt 1 in lernenHinweis()) und der Meilenstein-Hinweis
     (Punkt 2) kommt nie dran. */
  s['users/u1'].verlauf[tag(0)] = { w: 1, n: 0 };
  return s;
}

async function lauf(b, alt) {
  const vorher = alt ? ctx => ctx.route(u => u.hostname === '127.0.0.1' && u.pathname.endsWith('/app.js'),
    r => r.fulfill({ status: 200, contentType: 'text/javascript', body: APP_ALT })) : null;
  const { p, ctx } = await neueSeite(b, GERAETE.handy, { warte: 1600, store: storeMitHeuteGelernt(), vorher });
  const hinweis = await p.evaluate(() => document.querySelector('.hinweis--meilenstein .hinweis__text') ?
    document.querySelector('.hinweis--meilenstein .hinweis__text').textContent.trim() : null);
  await aktion(p, 'tab-fortschritt', null, 1200);
  /* .gross-zahl gibt es zweimal (Wochen-Antworten oben, "Dein Stoff" darunter) -
     ueber den Block mit der Ueberschrift "Dein Stoff" gezielt auswaehlen. */
  const fortschritt = await p.evaluate(() => {
    const block = [...document.querySelectorAll('.stat-block')].find(b => (b.querySelector('h3') || {}).textContent === 'Dein Stoff');
    const strong = block && block.querySelector('.gross-zahl strong');
    return strong ? strong.textContent.trim() : null;
  });
  return { p, ctx, hinweis, fortschritt };
}

(async () => {
  const b = await start(); let funde = 0;
  const pruef = (n, ok, info) => { if (!ok) funde++; console.log((ok ? 'ok     ' : 'FEHLER ') + n + ' | ' + info); };

  const r = await lauf(b, false);
  const zahlImHinweis = r.hinweis ? (r.hinweis.match(/\d+/) || [])[0] : null;
  pruef('(a) Meilenstein-Hinweis steht da', !!r.hinweis, JSON.stringify(r.hinweis));
  pruef('(b) Fortschritt zeigt 36', r.fortschritt === '36', 'gelesen: ' + r.fortschritt);
  pruef('(c) Hinweis nennt dieselbe Zahl wie Fortschritt (nicht die Marke 25)', zahlImHinweis === r.fortschritt, 'Hinweis: ' + zahlImHinweis + ' <-> Fortschritt: ' + r.fortschritt);
  pruef('(d) keine Seitenfehler', !r.p.fehler.length, r.p.fehler.join(' / '));
  await r.ctx.close();

  const alt = await lauf(b, true);
  const zahlAlt = alt.hinweis ? (alt.hinweis.match(/\d+/) || [])[0] : null;
  pruef('Gegenprobe c70729b: Hinweis (Marke) und Fortschritt (echte Zahl) weichen ab (muss ROT sein)', zahlAlt !== alt.fortschritt, 'Hinweis: ' + zahlAlt + ' <-> Fortschritt: ' + alt.fortschritt);
  await alt.ctx.close();

  console.log('Funde: ' + funde); await b.close(); process.exit(funde ? 1 : 0);
})();

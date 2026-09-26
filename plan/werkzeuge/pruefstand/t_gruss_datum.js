/* 3.17.40 (G-066/REST-12): lernenGruss() bildete das angezeigte Datum bisher
   aus new Date(), der Rest der App (Serie, "heute zaehlt") aus todayStr()
   (logicalToday(), DAY_START_HOUR = 4). Zwischen 0 und 4 Uhr zeigten Kopf
   und Serie zwei verschiedene "heute". Die Uhr wird auf 01:30 des echten
   Kalendertags gefaelscht (Context-Init-Script, wie lib.js tagVersatz),
   damit der Test unabhaengig von der TZ des Rechners laeuft, der ihn startet.
   Gegenprobe fest gegen app.js aus c70729b (Stand vor 3.17.40).
   Aufruf: node t_gruss_datum.js */
const { execFileSync } = require('child_process');
const path = require('path');
const { start, neueSeite, GERAETE } = require('./lib');
const APP_ALT = execFileSync('git', ['show', 'c70729b:app.js'], { cwd: path.join(__dirname, '../../..'), maxBuffer: 1 << 26 }).toString();

const KURZ = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

/* Dieselbe Rechnung wie logicalToday() in app.js: der Lerntag beginnt erst
   um 4 Uhr. Die echte, feste Uhr im Browser wird gleich auf 01:30 gesetzt -
   dieselbe Rechnung hier, unabhaengig vom Zeitpunkt des Testlaufs. */
function erwarteterLerntag() {
  const jetzt = new Date(); jetzt.setHours(1, 30, 0, 0);
  const d = new Date(jetzt);
  if (d.getHours() < 4) d.setDate(d.getDate() - 1);
  return d;
}

/* Ein FESTER Zeitpunkt (Date.now() gibt immer denselben Wert zurueck) bringt
   den Start der App zum Haengen - irgendeine Wartelogik braucht offenbar
   eine vorwaerts laufende Uhr. Deshalb wie tagVersatz in lib.js: ein fester
   VERSATZ auf die echte, laufende Uhr, der die Uhrzeit auf 01:30 des
   heutigen Kalendertags legt - Date.now() tickt normal weiter. */
async function feste0130(ctx) {
  await ctx.addInitScript(() => {
    const Echt = Date;
    const ziel = new Echt(); ziel.setHours(1, 30, 0, 0);
    const off = ziel.getTime() - Echt.now();
    class Verschoben extends Echt {
      constructor(...a) { if (a.length) { super(...a); return; } super(Echt.now() + off); }
      static now() { return Echt.now() + off; }
    }
    window.Date = Verschoben;
  });
}

async function lauf(b, alt) {
  const vorher = async ctx => {
    await feste0130(ctx);
    if (alt) await ctx.route(u => u.hostname === '127.0.0.1' && u.pathname.endsWith('/app.js'),
      r => r.fulfill({ status: 200, contentType: 'text/javascript', body: APP_ALT }));
  };
  const { p, ctx } = await neueSeite(b, GERAETE.handy, { warte: 1600, vorher });
  const r = await p.evaluate(() => ({
    datum: document.querySelector('.lernen-gruss__datum') ? document.querySelector('.lernen-gruss__datum').textContent : null,
    heuteKurz: document.querySelector('.woche__tag.heute .woche__kurz') ? document.querySelector('.woche__tag.heute .woche__kurz').textContent : null
  }));
  return { p, ctx, r };
}

(async () => {
  const b = await start(); let funde = 0;
  const pruef = (n, ok, info) => { if (!ok) funde++; console.log((ok ? 'ok     ' : 'FEHLER ') + n + ' | ' + info); };

  const erwartet = erwarteterLerntag();
  const erwarteteLang = erwartet.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' });
  const erwarteteKurz = KURZ[erwartet.getDay()];

  const r = await lauf(b, false);
  pruef('(a) Kopf-Datum ist der Lerntag (Tag vor Mitternacht-Grenze bei 01:30)', r.r.datum === erwarteteLang, erwarteteLang + ' <-> ' + r.r.datum);
  pruef('(b) Serie markiert denselben Tag als "heute"', r.r.heuteKurz === erwarteteKurz, erwarteteKurz + ' <-> ' + r.r.heuteKurz);
  pruef('(c) keine Seitenfehler', !r.p.fehler.length, r.p.fehler.join(' / '));
  await r.ctx.close();

  const alt = await lauf(b, true);
  pruef('Gegenprobe c70729b: Kopf-Datum weicht vom Lerntag ab (muss ROT sein)', alt.r.datum !== erwarteteLang, erwarteteLang + ' <-> ' + alt.r.datum);
  await alt.ctx.close();

  console.log('Funde: ' + funde); await b.close(); process.exit(funde ? 1 : 0);
})();

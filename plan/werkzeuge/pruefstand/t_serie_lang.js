/* G-007 (LERNEN-1): Die Serie waechst ueber die 120 Tage des Protokolls
   hinaus. Simuliert ein Konto ueber 200 Tage: alle SCHRITT Tage wird die App
   geladen (Uhr der Seite verschoben), dazwischen kommen die gelernten Tage
   ins Protokoll. Der Store wird von Lauf zu Lauf weitergegeben - samt dem,
   was die App selbst geschrieben hat (Sockel, Aufraeumen des Protokolls).
   Aufruf: node t_serie_lang.js  (Gegenprobe: mit altem Code bleibt es bei 121) */
const { start, neueSeite, vollerStore, GERAETE, tag } = require('./lib');

function tagAb(offset) {
  // Dieselbe 4-Uhr-Grenze wie die Seite und alle anderen Store-Daten.
  // Kalenderdatum um 00-04 Uhr lag sonst einen Tag vor dem simulierten Lerntag.
  return tag(offset);
}

async function lauf(b, name, tageGesamt, luecken, erwartet) {
  const SCHRITT = 5;
  let store = vollerStore();
  store['users/u1'].verlauf = {};
  store['users/u1'].streak = { sockel: 0, sockelBis: tagAb(0), beste: 0 };
  const kette = [];
  let letzte = null;
  for (let k = 0; k < tageGesamt; k += SCHRITT) {
    const bis = Math.min(k + SCHRITT - 1, tageGesamt - 1);
    for (let d = k; d <= bis; d++) if (!luecken.includes(d)) store['users/u1'].verlauf[tagAb(d)] = { w: 1, n: 0 };
    /* 09.10.2026: Der Versatz zaehlt Kalendertage, nicht Vielfache von 24 h.
       Ueber das Ende der Sommerzeit hinweg zeigte die verschobene Uhr sonst
       eine Stunde frueher; lief der Test zwischen 04:00 und 05:00, lag sie
       damit vor der 4-Uhr-Grenze und die Seite lebte einen Lerntag zurueck
       (Fall 3: 47 statt 48). Erwartungswerte unveraendert. */
    const jetzt = new Date(), ziel = new Date(jetzt);
    ziel.setDate(ziel.getDate() + bis);
    const { p } = await neueSeite(b, GERAETE.handy, { store, warte: 1300, tagVersatz: (ziel - jetzt) / 86400000 });
    const zahl = await p.evaluate(() => { const el = document.querySelector('.serie-zahl strong'); return el ? Number(el.textContent.trim()) : 0; });
    store = await p.evaluate(() => Object.fromEntries(window.__FB.store));
    const s = store['users/u1'].streak;
    kette.push('T' + (bis + 1) + '=' + zahl);
    letzte = { zahl, sockel: s.sockel, sockelBis: s.sockelBis, protokollTage: Object.keys(store['users/u1'].verlauf || {}).length, fehler: p.fehler };
    await p.context().close();
  }
  const ok = letzte.zahl === erwartet && letzte.fehler.length === 0;
  console.log((ok ? 'OK   ' : 'FEHL ') + name + ' | erwartet ' + erwartet + ' | gemessen ' + letzte.zahl +
    ' | Sockel ' + letzte.sockel + ' bis ' + letzte.sockelBis + ' | Protokoll ' + letzte.protokollTage + ' Tage' +
    (letzte.fehler.length ? ' | ' + letzte.fehler.join(' / ') : ''));
  console.log('      Verlauf: ' + kette.join(' '));
  return ok;
}

(async () => {
  const b = await start();
  const erg = [];
  erg.push(await lauf(b, '200 Tage am Stueck', 200, [], 200));
  /* Tag 125 ausgelassen (verziehen, weil genug Tage davor und danach): zaehlt
     nicht mit, reisst aber nicht - 199 gelernte Tage. */
  erg.push(await lauf(b, '200 Tage, Tag 125 verziehen', 200, [125], 199));
  /* Zwei Tage hintereinander aus: die Serie beginnt danach neu. */
  erg.push(await lauf(b, '150 Tage, Tag 100 und 101 aus', 150, [100, 101], 48));
  await b.close();
  console.log(erg.every(Boolean) ? 'Alle Faelle richtig.' : 'Nicht alle Faelle richtig.');
  process.exit(erg.every(Boolean) ? 0 : 1);
})();

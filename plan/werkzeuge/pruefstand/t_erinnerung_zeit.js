/* G-065 (REST-11): Zeitfeld im Erinnerungs-Blatt (#erinnerung-zeit) verlor
   seinen Wert bei jedem Neuzeichnen und sprang auf 20:00 zurueck, weil er nur
   im DOM stand (LEHREN § 6.3). Jetzt haelt ui.erinnerungZeit ihn, wie
   feedbackEntwurf das fuer das Ideen-Formular tut.

   Abnahme (Befund): 06:15 eintragen, ein fremdes Neuzeichnen ausloesen
   (hier: der Firestore-Stub feuert seinen users/u1-Snapshot direkt, wie ein
   Schreibvorgang von einem anderen Geraet es taete), danach "Uebernehmen" ->
   06:15 muss in der heruntergeladenen .ics stehen.

   Gegenprobe: gegen den festen Commit VOR der Behebung (LEHREN § 5.3,
   "Stand vor 3.17.41"), muss rot sein - dort springt das Feld auf 20:00
   zurueck und die .ics traegt 20:00 statt 06:15. */
const { chromium } = require('playwright');
const { neueSeite, aktion, GERAETE, vollerStore } = require('./lib');
const fs = require('fs');

const VOR_HASH = '3452fdc'; // Stand vor 3.17.41 (G-065/G-027/G-079/G-080)

async function fremdesNeuzeichnen(p) {
  await p.evaluate(() => {
    const S = window.__FB;
    const l = S.listeners.find(x => x.ref && x.ref.path === 'users/u1' && !x.ref.col);
    if (!l) throw new Error('kein users/u1-Listener - Erinnerungs-Blatt nicht offen?');
    l.cb({
      id: 'u1', exists: () => true,
      data: () => JSON.parse(JSON.stringify(S.store.get('users/u1'))),
      metadata: { hasPendingWrites: false, fromCache: false }, ref: l.ref
    });
  });
  await p.waitForTimeout(300);
}

async function lauf(b, { vorher } = {}) {
  const { p } = await neueSeite(b, GERAETE.handy, { store: vollerStore(), warte: 1500, vorher });
  await aktion(p, 'einstellungen', null, 800);
  await aktion(p, 'erinnerung-auf', null, 700);
  await p.fill('#erinnerung-zeit', '06:15');
  await p.waitForTimeout(150); // input-Ereignis verarbeiten
  await fremdesNeuzeichnen(p);
  const wertNachher = await p.evaluate(() => { const f = document.getElementById('erinnerung-zeit'); return f ? f.value : null; });
  const dl = p.waitForEvent('download', { timeout: 5000 }).catch(() => null);
  await aktion(p, 'erinnerung-eigene', null, 900);
  const d = await dl;
  let dtstart = null;
  if (d) { const pfad = await d.path(); const ics = fs.readFileSync(pfad, 'utf8'); dtstart = (ics.match(/DTSTART:\S+/) || [])[0]; }
  return { wertNachher, dtstart };
}

(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
  let fehler = 0;
  const pruef = (bez, ok, info) => { if (!ok) fehler++; console.log((ok ? 'OK  ' : 'FEHL') + ' ' + bez + (info ? ' | ' + info : '')); };

  const heute = await lauf(b);
  pruef('Feld haelt 06:15 nach fremdem Neuzeichnen', heute.wertNachher === '06:15', heute.wertNachher);
  pruef('.ics traegt 0615 (DTSTART)', /T0615/.test(heute.dtstart || ''), heute.dtstart);

  // Gegenprobe gegen den Stand vor der Behebung (Umleitung VOR dem ersten Laden, LEHREN § 5.3/§ 15).
  const alt = await lauf(b, {
    vorher: async ctx => {
      const { execSync } = require('child_process');
      const altCode = execSync('git show ' + VOR_HASH + ':app.js', { cwd: __dirname + '/../../..', maxBuffer: 1024 * 1024 * 20 }).toString();
      await ctx.route('**/app.js*', r => r.fulfill({ status: 200, contentType: 'text/javascript', body: altCode }));
    }
  });
  pruef('Gegenprobe (alter Code) ist ROT: Feld springt zurueck', alt.wertNachher !== '06:15', alt.wertNachher);

  console.log(fehler === 0 ? 'ALLE OK' : fehler + ' FEHLER');
  await b.close();
  process.exit(fehler === 0 ? 0 : 1);
})();

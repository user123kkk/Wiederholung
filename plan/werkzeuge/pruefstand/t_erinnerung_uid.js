/* G-027 (REST-5): Die .ics-Datei bekam bei jedem Download eine NEUE UID
   (Date.now()) - ein Kalender legt bei einer neuen UID einen zweiten
   Serientermin an, statt den alten zu ersetzen. Jetzt ist die UID fest
   ("adrabic-erinnerung@adrabic"), SEQUENCE zaehlt hoch (Zaehler im
   Geraete-Speicher hinweisSpeicher(), kein neuer localStorage-Schluessel).
   Dazu: "Erinnerung als aus markieren" loescht nur den Geraete-Merker, die
   Einstellungszeile zeigt danach wieder "aus".

   Abnahme (Befund): zwei Downloads nacheinander -> identische UID-Zeile,
   SEQUENCE steigt; Einstellungszeile laesst sich auf "aus" setzen. */
const { chromium } = require('playwright');
const { neueSeite, aktion, GERAETE, vollerStore } = require('./lib');
const fs = require('fs');

const VOR_HASH = '3452fdc'; // Stand vor 3.17.41

async function zweiDownloads(p) {
  const dl1 = p.waitForEvent('download', { timeout: 5000 }).catch(() => null);
  await aktion(p, 'erinnerung-zeit', '07:30', 900);
  const d1 = await dl1;
  const ics1 = d1 ? fs.readFileSync(await d1.path(), 'utf8') : '';

  await aktion(p, 'erinnerung-auf', null, 700);
  const dl2 = p.waitForEvent('download', { timeout: 5000 }).catch(() => null);
  await aktion(p, 'erinnerung-zeit', '19:30', 900);
  const d2 = await dl2;
  const ics2 = d2 ? fs.readFileSync(await d2.path(), 'utf8') : '';

  const uid = s => (s.match(/UID:\S+/) || [])[0];
  const seq = s => Number(((s.match(/SEQUENCE:(\d+)/) || [])[1]));
  return { uid1: uid(ics1), uid2: uid(ics2), seq1: seq(ics1), seq2: seq(ics2) };
}

(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
  let fehler = 0;
  const pruef = (bez, ok, info) => { if (!ok) fehler++; console.log((ok ? 'OK  ' : 'FEHL') + ' ' + bez + (info ? ' | ' + info : '')); };

  {
    const { p } = await neueSeite(b, GERAETE.handy, { store: vollerStore(), warte: 1500 });
    await aktion(p, 'einstellungen', null, 800);
    await aktion(p, 'erinnerung-auf', null, 700);
    const r = await zweiDownloads(p);
    pruef('Zwei Downloads: identische UID', !!r.uid1 && r.uid1 === r.uid2, r.uid1 + ' / ' + r.uid2);
    pruef('UID ist die feste adrabic-UID', r.uid1 === 'UID:adrabic-erinnerung@adrabic', r.uid1);
    pruef('SEQUENCE steigt', Number.isFinite(r.seq2) && r.seq2 > r.seq1, r.seq1 + ' -> ' + r.seq2);

    // Satz im Blatt, wenn schon eingerichtet
    await aktion(p, 'einstellungen', null, 700);
    const zeileVorher = await p.evaluate(() => { const z = document.querySelector('[data-action="erinnerung-auf"]'); return z ? z.innerText.replace(/\s+/g, ' ') : null; });
    pruef('Einstellungszeile zeigt Uhrzeit (nicht "aus")', !!zeileVorher && !/\baus\b/.test(zeileVorher), zeileVorher);
    await aktion(p, 'erinnerung-auf', null, 700);
    const hinweisSatz = await p.evaluate(() => { const d = document.querySelector('.dlg'); return d ? d.innerText.replace(/\s+/g, ' ') : ''; });
    pruef('Blatt nennt den Ersetzt-Satz', /ersetzt die alte/.test(hinweisSatz), hinweisSatz.slice(0, 200));

    // "Erinnerung als aus markieren"
    const hatKnopf = await p.evaluate(() => !!document.querySelector('[data-action="erinnerung-aus"]'));
    pruef('Knopf "Erinnerung als aus markieren" vorhanden', hatKnopf);
    await aktion(p, 'erinnerung-aus', null, 700);
    await aktion(p, 'einstellungen', null, 700);
    const zeileNachher = await p.evaluate(() => { const z = document.querySelector('[data-action="erinnerung-auf"]'); return z ? z.innerText.replace(/\s+/g, ' ') : null; });
    pruef('Einstellungszeile zeigt wieder "aus"', /\baus\b/.test(zeileNachher || ''), zeileNachher);
  }

  // Gegenprobe gegen den Stand vor der Behebung.
  {
    const { p } = await neueSeite(b, GERAETE.handy, {
      store: vollerStore(), warte: 1500,
      vorher: async ctx => {
        const { execSync } = require('child_process');
        const altCode = execSync('git show ' + VOR_HASH + ':app.js', { cwd: __dirname + '/../../..', maxBuffer: 1024 * 1024 * 20 }).toString();
        await ctx.route('**/app.js*', r => r.fulfill({ status: 200, contentType: 'text/javascript', body: altCode }));
      }
    });
    await aktion(p, 'einstellungen', null, 800);
    await aktion(p, 'erinnerung-auf', null, 700);
    const r = await zweiDownloads(p);
    pruef('Gegenprobe (alter Code) ist ROT: UID unterscheidet sich', r.uid1 !== r.uid2, r.uid1 + ' / ' + r.uid2);
  }

  console.log(fehler === 0 ? 'ALLE OK' : fehler + ' FEHLER');
  await b.close();
  process.exit(fehler === 0 ? 0 : 1);
})();

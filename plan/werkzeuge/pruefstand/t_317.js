/* 3.17.0: Hinweise, Erinnerung (.ics), Ideen-Board, Statistik (mit Test-Schluessel). */
const { start, neueSeite, aktion, foto, GERAETE, vollerStore } = require('./lib');
const fs = require('fs');
(async () => {
  const b = await start();
  const thema = process.argv[2] || 'dunkel';
  const store = vollerStore({ thema });
  store['feedback/f1'] = { text: 'Karten mit Bild', beschreibung: 'Ein Foto zur Vokabel', erstelltAm: '2026-09-20T10:00:00Z', votes: 3, status: 'offen' };
  store['feedback/f2'] = { text: 'Dunkler Modus', erstelltAm: '2026-09-10T10:00:00Z', votes: 7, status: 'umgesetzt' };
  store['feedback/f3'] = { text: 'Audio zur Aussprache', erstelltAm: '2026-09-21T10:00:00Z', votes: 5, status: 'geplant' };
  const { p, ctx } = await neueSeite(b, GERAETE.handy, { warte: 10, store });
  // Statistik: Test-Schluessel in app.js einsetzen, Anfragen mitschneiden
  const gesendet = [];
  await ctx.route('**/eu.i.posthog.com/**', async r => { try { gesendet.push(JSON.parse(r.request().postData())); } catch (e) {} r.fulfill({ status: 200, body: '{}', headers: { 'Access-Control-Allow-Origin': '*' } }); });
  await ctx.route('**/app.js*', async r => { const res = await r.fetch(); let t = await res.text(); t = t.replace('const POSTHOG_KEY = "";', 'const POSTHOG_KEY = "phc_test";'); r.fulfill({ response: res, body: t }); });
  await p.reload(); await p.waitForTimeout(2200);
  const hinweis = () => p.evaluate(() => { const h = document.querySelector('.hinweis'); return h ? h.className.replace('hinweis ', '') + ': ' + h.innerText.replace(/\s+/g, ' ') : '-'; });
  console.log('Hinweis 1:', await hinweis()); await foto(p, 'n-hinweis1-' + thema);
  await aktion(p, 'hinweis-weg', null, 700); console.log('Hinweis 2:', await hinweis()); await foto(p, 'n-hinweis2-' + thema);
  // Erinnerung
  const dl = p.waitForEvent('download', { timeout: 5000 }).catch(() => null);
  await aktion(p, 'erinnerung-auf', null, 700); await foto(p, 'n-erinnerung-' + thema);
  await aktion(p, 'erinnerung-zeit', '19:30', 900);
  const d = await dl; if (d) { const pfad = await d.path(); const ics = fs.readFileSync(pfad, 'utf8'); console.log('ICS:', d.suggestedFilename(), ics.includes('RRULE:FREQ=DAILY'), (ics.match(/DTSTART:\S+/) || [])[0]); }
  console.log('Toast:', await p.evaluate(() => (document.querySelector('.toast') || {}).innerText));
  console.log('Hinweis 3:', await hinweis());
  await aktion(p, 'hinweis-weg', null, 700).catch(() => {}); console.log('Hinweis 4:', await hinweis());
  // Ideen
  await aktion(p, 'einstellungen', null, 1200);
  console.log('Einstellungen Erinnerung-Zeile:', await p.evaluate(() => [...document.querySelectorAll('.liste-zeile')].map(x => x.innerText.replace(/\s+/g, ' ')).filter(t => /Erinnerung|Statistik/.test(t)).join(' | ')));
  await aktion(p, 'einst-seite', 'feedback', 150);
  console.log('Ideen sofort (150ms):', await p.evaluate(() => document.querySelectorAll('.ideen-zeile:not(.ideen-zeile--platz)').length + ' Zeilen, Platzhalter ' + document.querySelectorAll('.ideen-zeile--platz').length));
  await p.waitForTimeout(700); await foto(p, 'n-ideen-' + thema, true);
  console.log('Ideen:', await p.evaluate(() => [...document.querySelectorAll('#ideen-inhalt .ideen-zeile, #ideen-inhalt .eyebrow')].map(x => x.innerText.replace(/\s+/g, ' ')).join(' | ')));
  console.log('Moderation sichtbar (Test-Konto ist nicht Betreiber):', await p.evaluate(() => !!document.querySelector('.ideen-moderation')));
  await p.click('.ideen-stimme[data-id="f1"]'); await p.waitForTimeout(200);
  console.log('nach Stimme:', await p.evaluate(() => document.querySelector('.ideen-stimme[data-id="f1"]').innerText + ' aktiv=' + document.querySelector('.ideen-stimme[data-id="f1"]').classList.contains('aktiv')));
  await aktion(p, 'feedback-form-auf', null, 500);
  await p.fill('#fb-text', 'Wochenziel einstellen'); await p.fill('#fb-beschreibung', 'z.B. 5 Tage');
  await aktion(p, 'feedback-submit', null, 1200);
  console.log('nach Einreichen:', await p.evaluate(() => (document.querySelector('.ideen-danke') || {}).innerText), '| erste Zeile:', await p.evaluate(() => document.querySelector('#ideen-inhalt .ideen-zeile').innerText.replace(/\s+/g, ' ')));
  await foto(p, 'n-ideen-danke-' + thema);
  // Statistik senden
  await p.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
  await p.evaluate(() => { Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true }); document.dispatchEvent(new Event('visibilitychange')); });
  await p.waitForTimeout(800);
  const ev = gesendet.flatMap(x => x.batch || []);
  console.log('Statistik: ' + gesendet.length + ' Sendungen, Ereignisse:', ev.map(e => e.event + (e.properties.name ? '(' + e.properties.name + ')' : '')).join(', '));
  console.log('Kennung angemeldet:', (ev.find(e => e.properties.distinct_id && e.properties.distinct_id.startsWith('k-')) || {}).properties?.distinct_id, '| Inhalte/uid/E-Mail enthalten?', JSON.stringify(gesendet).includes('u1') || JSON.stringify(gesendet).includes('test@example.com') || JSON.stringify(gesendet).includes('Wochenziel'));
  console.log(p.fehler.join('\n') || 'keine Fehler');
  await b.close();
})();

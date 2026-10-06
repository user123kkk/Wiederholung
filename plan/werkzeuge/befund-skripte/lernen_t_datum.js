/* LERNEN-Audit: Datum/Zeitzone/Mitternacht/Sommerzeit mit Europe/Berlin
   und gefaelschter Uhr. Liest die echte app.js ueber die Firebase-Attrappe. */
const P = '/home/user/Wiederholung/plan/werkzeuge/pruefstand/';
const { chromium } = require(P + 'node_modules/playwright');
const { APP, AUTH, FS } = require(P + 'stubs');
const BASE = 'http://127.0.0.1:8099/index.html';

function storeFuer(heute) {
  // heute = logischer Tag 'YYYY-MM-DD'; eine Karte faellig
  const karten = {};
  for (let i = 0; i < 3; i++) karten['users/u1/karten/k' + i] = { wort: 'كِتَابٌ' + i, uebersetzung: 'Buch' + i, extra: '', stufe: 2, nextReview: heute,
    ersteBewertung: '2026-01-01', rueckfaelle: 0, quelleId: null, maxStufe: 2, order: i, bereichId: 'b1' };
  return Object.assign({
    'users/u1/bereiche/b1': { name: 'Vokabeln', order: 0, gefuehrt: false, satzId: null, satzVersion: 0, sets: {} },
    'users/u1': { name: 'Test', schemaVersion: 2, settings: { arabGroesse: 'normal', thema: 'dunkel', sitzungsLimit: 'alle', lastBackup: heute },
      streak: { sockel: 0, sockelBis: '2020-01-01', beste: 0 }, verlauf: {} }
  }, karten);
}

async function seite(b, isoUtc, store) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, timezoneId: 'Europe/Berlin', locale: 'de-DE' });
  const p = await ctx.newPage();
  p.fehler = [];
  p.on('pageerror', e => p.fehler.push(e.message));
  await p.clock.install({ time: new Date(isoUtc) });
  await p.clock.resume();
  await p.route('**/www.gstatic.com/**', r => {
    const u = r.request().url();
    r.fulfill({ status: 200, contentType: 'text/javascript', body: u.includes('auth') ? AUTH : u.includes('firestore') ? FS : APP });
  });
  await p.route('**/apis.google.com/**', r => r.abort());
  await p.addInitScript(i => { window.__START_USER = i.user; window.__START_STORE = i.store; },
    { user: { uid: 'u1', email: 't@e.de', displayName: 'T', emailVerified: true, metadata: { creationTime: 'Mon, 03 Aug 2026 10:00:00 GMT' } }, store });
  await p.goto(BASE, { waitUntil: 'load' });
  await p.waitForTimeout(1500);
  return { ctx, p };
}

const FAELLE = [
  { name: '25.09. 01:30 MESZ (UTC noch 24.09. 23:30)', utc: '2026-09-24T23:30:00Z', erwartetTag: '2026-09-24' },
  { name: '25.09. 02:30 MESZ (UTC 25.09. 00:30)', utc: '2026-09-25T00:30:00Z', erwartetTag: '2026-09-24' },
  { name: '25.09. 03:59 MESZ', utc: '2026-09-25T01:59:00Z', erwartetTag: '2026-09-24' },
  { name: '25.09. 04:01 MESZ', utc: '2026-09-25T02:01:00Z', erwartetTag: '2026-09-25' },
  { name: '25.10. 03:30 MEZ (Rueckstellung, Tag hat 25 h)', utc: '2026-10-25T02:30:00Z', erwartetTag: '2026-10-24' },
  { name: '25.10. 04:30 MEZ', utc: '2026-10-25T03:30:00Z', erwartetTag: '2026-10-25' },
  { name: '29.03.2027 03:30 MESZ (nach Vorstellung, 23 h-Tag war 28.03.)', utc: '2027-03-28T01:30:00Z', erwartetTag: '2027-03-27' },
  { name: '31.12. 23:30 MEZ (UTC 22:30, Jahreswechsel)', utc: '2026-12-31T22:30:00Z', erwartetTag: '2026-12-31' },
  { name: '01.01. 00:30 MEZ (UTC 31.12. 23:30)', utc: '2026-12-31T23:30:00Z', erwartetTag: '2026-12-31' }
];

(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM });
  let fehler = 0;
  for (const f of FAELLE) {
    const { ctx, p } = await seite(b, f.utc, storeFuer(f.erwartetTag));
    const r = await p.evaluate(() => ({ lokal: new Date().toString(), start: !!document.querySelector('[data-action="start-session"]') }));
    await p.evaluate(() => { const e = document.querySelector('[data-action="start-session"]'); if (e) e.click(); });
    await p.waitForTimeout(400);
    await p.keyboard.press('Space'); await p.waitForTimeout(500);
    await p.keyboard.press('3'); await p.waitForTimeout(2800);
    const nach = await p.evaluate(() => {
      const d = window.__FB.store.get('users/u1');
      const k = [0, 1, 2].map(i => window.__FB.store.get('users/u1/karten/k' + i)).find(k => k.stufe === 3);
      return { verlaufKeys: Object.keys(d.verlauf || {}), karte: k ? { stufe: k.stufe, next: k.nextReview } : null };
    });
    await p.evaluate(() => { const e = document.querySelector('[data-action="end-session"]'); if (e) e.click(); });
    await p.waitForTimeout(600);
    nach.serie = await p.evaluate(() => { const el = document.querySelector('.serie-zahl strong'); return el ? Number(el.textContent) : 0; });
    const ok = r.start && nach.verlaufKeys.join() === f.erwartetTag && nach.karte && nach.serie === 1;
    if (!ok) fehler++;
    console.log((ok ? 'OK   ' : 'FEHL ') + f.name + ' | lokal ' + r.lokal.slice(0, 24) + ' | Start-Knopf ' + r.start + ' | verlauf ' + nach.verlaufKeys.join() + ' | Karte ' + JSON.stringify(nach.karte) + ' | Serie ' + nach.serie +
      (p.fehler.length ? ' | ' + p.fehler.join(' / ') : ''));
    await ctx.close();
  }
  await b.close();
  console.log(fehler ? fehler + ' Fehler' : 'Alle Faelle richtig');
})();

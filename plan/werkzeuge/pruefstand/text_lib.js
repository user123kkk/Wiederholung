/* Gemeinsame Bausteine der Tests fuer "Texte auswendig lernen"
   (plan/texte-lernen/KONZEPT.md § 13). Kein religioeser Wortlaut: Textzeilen
   in diesen Tests sind neutrale Testsaetze oder kommen unveraendert aus
   quran/tanzil-uthmani.txt (LEHREN § 2). */
const fs = require('node:fs'), path = require('node:path');
const { execFileSync } = require('node:child_process');
const { vollerStore, tag } = require('./lib');
const { APP, AUTH, FS } = require('./stubs');

const repo = path.join(__dirname, '../../..');
const BASE = 'http://127.0.0.1:' + (process.env.PRUEF_PORT || 8099) + '/index.html';
/* Letzter Stand vor Stufe 1 - fuer Gegenproben (LEHREN § 5.3: nie HEAD). */
const VOR_STUFE_1 = '48002ad';

function appQuelle(commit) {
  return commit ? execFileSync('git', ['show', commit + ':app.js'], { cwd: repo, encoding: 'utf8' })
                : fs.readFileSync(path.join(repo, 'app.js'), 'utf8');
}

/* vollerStore plus ein Text mit 10 Zeilen in Bereich b1:
   z0-z3 fest (Stufe 7, 2099-12-31), z4-z6 frisch und heute faellig,
   z7 frisch seit 20 Tagen ueberfaellig, z8-z9 neu. Dazu Kreis- und
   Reglerfelder mit Werten, die nicht den Startwerten entsprechen - so faellt
   auf, wenn ein Weg sie durch Startwerte ersetzt. */
/* Zeile 10 ist 1216 Zeichen lang: laenger als eine Karte (1000), kuerzer
   als MAX_ZEILE (1500) - wie Aya 2:282 mit 1208 Zeichen. */
function textWort(i) {
  return i === 9 ? 'Lange Testzeile ' + 'x'.repeat(1200) : 'Testzeile ' + (i + 1) + ' eins zwei drei';
}
function textStore(opt = {}) {
  const store = vollerStore(opt);
  const ids = [];
  for (let i = 0; i < 10; i++) {
    const id = 'z' + i; ids.push(id);
    let stufe, next, erste;
    if (i < 4) { stufe = 7; next = '2099-12-31'; erste = tag(-40); }
    else if (i < 7) { stufe = i - 3; next = tag(0); erste = tag(-5); }
    else if (i === 7) { stufe = 0; next = tag(-20); erste = tag(-25); }
    else { stufe = 0; next = tag(0); erste = null; }
    store['users/u1/karten/' + id] = {
      wort: opt.wortVon ? opt.wortVon(i) : textWort(i),
      uebersetzung: '', extra: null, stufe, nextReview: next, ersteBewertung: erste,
      rueckfaelle: i === 2 ? 3 : 0, quelleId: null, maxStufe: stufe, order: i, bereichId: 'b1', textId: 't1' };
  }
  const b1 = store['users/u1/bereiche/b1'];
  b1.sets = { ...b1.sets, t1: { name: 'Testtext', order: 9, art: 'text', quelleId: null, cardIds: ids,
    nummerAb: 3, quelle: 'tanzil', sure: 2, kreisTage: 9, kreisPos: 'z2', kreisTag: tag(-1), festErgebnisse: '10110' } };
  b1.abstandFaktor = 0.8;
  b1.festErgebnisse = '1110';
  return store;
}

/* Stufe 4: Text t1 mit n Zeilen; zustand(i) liefert {stufe, next, erste}.
   Kurze Testsaetze, damit Abschnitte volle 5 Zeilen haben. */
function zeilenStore(n, zustand, opt = {}) {
  const store = textStore(opt);
  for (const k of Object.keys(store)) if (/\/karten\/z\d+$/.test(k)) delete store[k];
  const ids = [];
  for (let i = 0; i < n; i++) {
    const id = 'z' + i, z = zustand(i); ids.push(id);
    store['users/u1/karten/' + id] = { wort: opt.wort ? opt.wort(i) : 'Satz ' + (i + 1) + ' alpha beta', uebersetzung: '', extra: null,
      stufe: z.stufe, nextReview: z.next, ersteBewertung: z.erste, rueckfaelle: 0, quelleId: null,
      maxStufe: z.stufe, order: i, bereichId: 'b1', textId: 't1' };
  }
  const t1 = store['users/u1/bereiche/b1'].sets.t1;
  Object.assign(t1, { cardIds: ids, nummerAb: 1, quelle: null, sure: null, kreisTage: 7, kreisPos: null, kreisTag: null, festErgebnisse: '' }, opt.set || {});
  return store;
}
const FEST = { stufe: 7, next: '2099-12-31', erste: '2026-01-01' };

/* Seite mit echter app.js (oder einem festen alten Stand) und Zugriff auf
   die inneren Funktionen ueber window.__PRUEF. Service Worker gesperrt,
   damit die Umleitung von app.js greift (LEHREN § 15, 26.09.). */
/* opt.uid: Konto-Kennung. Texte bietet die App nur dem Betreiber an
   (texteFreigeschaltet); dann wird der Store auf diese Kennung umgeschrieben. */
const BETREIBER_UID = 'pitcQCAowlSOMjCvJ4xKSnuGVXi1';
/* opt.ersetze: [alt, neu] - Gegenprobe: eine Stelle der app.js gezielt
   entfernen; bricht ab, wenn die Stelle nicht gefunden wird (LEHREN § 15, 27.09.). */
async function seiteMitApp(browser, store, { commit, zusatz = '', viewport = { width: 390, height: 844 }, uid = 'u1', ersetze = null, base = BASE } = {}) {
  if (uid !== 'u1') store = Object.fromEntries(Object.entries(store).map(([k, v]) => [k.replace(/^users\/u1(?=\/|$)/, 'users/' + uid), v]));
  const ctx = await browser.newContext({ viewport, serviceWorkers: 'block', deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  p.fehler = [];
  p.on('pageerror', e => p.fehler.push(e.message));
  await p.addInitScript(([s, uid]) => { window.__START_STORE = s; window.__START_USER = { uid: uid, email: 'a@example.com', displayName: 'Test', emailVerified: true, metadata: { creationTime: 'Mon, 03 Aug 2026 10:00:00 GMT' } }; }, [store, uid]);
  await p.route('**/www.gstatic.com/**', r => r.fulfill({ contentType: 'text/javascript',
    body: r.request().url().includes('auth') ? AUTH : r.request().url().includes('firestore') ? FS : APP }));
  let quelle = appQuelle(commit).replace(/\r\n/g, '\n');
  for (const [alt, neu] of (ersetze && !Array.isArray(ersetze[0]) ? [ersetze] : (ersetze || []))) {
    if (!quelle.includes(alt)) throw new Error('Gegenprobe: Stelle nicht gefunden: ' + alt.slice(0, 60));
    quelle = quelle.replace(alt, neu);
  }
  await p.route('**/app.js?*', r => r.fulfill({ contentType: 'text/javascript', body: quelle + `
    window.__PRUEF = { bereit: () => bereiche !== null && !document.querySelector('.boot'),
      bereiche: () => JSON.parse(JSON.stringify(bereiche)),
      ${zusatz} };` }));
  await p.goto(base);
  await p.waitForFunction(() => window.__PRUEF && window.__PRUEF.bereit(), null, { timeout: 15000 });
  await p.waitForTimeout(600);
  return { ctx, p };
}

async function storeLesen(p) {
  return p.evaluate(() => Object.fromEntries([...window.__FB.store.entries()].map(([k, v]) => [k, JSON.parse(JSON.stringify(v))])));
}

module.exports = { BETREIBER_UID, textWort, textStore, zeilenStore, FEST, seiteMitApp, storeLesen, appQuelle, VOR_STUFE_1, BASE };

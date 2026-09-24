const { chromium } = require('playwright');
const { APP, AUTH, FS } = require('./stubs');
const fs = require('fs');
const path = require('path');

const BASE = 'http://127.0.0.1:8099/index.html';
const OUT = process.env.PRUEF_BILDER || path.join(require('os').tmpdir(), 'adrabic-pruefbilder');
fs.mkdirSync(OUT, { recursive: true });

function tag(offset) {
  const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

const WOERTER = [
  ['كِتَابٌ', 'Buch'], ['قَلَمٌ', 'Stift'], ['بَيْتٌ', 'Haus'], ['مَسْجِدٌ', 'Moschee'], ['مَدْرَسَةٌ', 'Schule'],
  ['طَالِبٌ', 'Student'], ['مُعَلِّمٌ', 'Lehrer'], ['بَابٌ', 'Tür'], ['نَافِذَةٌ', 'Fenster'], ['مَكْتَبٌ', 'Schreibtisch'],
  ['كُرْسِيٌّ', 'Stuhl'], ['سَرِيرٌ', 'Bett'], ['مِفْتَاحٌ', 'Schlüssel'], ['قَمِيصٌ', 'Hemd'], ['مِنْدِيلٌ', 'Taschentuch'],
  ['طَبِيبٌ', 'Arzt'], ['تَاجِرٌ', 'Händler'], ['نَجْمٌ', 'Stern'], ['وَلَدٌ', 'Junge'], ['حِمَارٌ', 'Esel'],
  ['حِصَانٌ', 'Pferd'], ['قِطٌّ', 'Katze'], ['كَلْبٌ', 'Hund'], ['دِيكٌ', 'Hahn'], ['حَجَرٌ', 'Stein'],
  ['مَاءٌ', 'Wasser'], ['لَبَنٌ', 'Milch'], ['خُبْزٌ', 'Brot'], ['سُكَّرٌ', 'Zucker'], ['شَايٌ', 'Tee'],
  ['قَهْوَةٌ', 'Kaffee'], ['رَجُلٌ', 'Mann'], ['اِمْرَأَةٌ', 'Frau'], ['بِنْتٌ', 'Mädchen'], ['أُمٌّ', 'Mutter'],
  ['أَبٌ', 'Vater'], ['أَخٌ', 'Bruder'], ['أُخْتٌ', 'Schwester'], ['يَوْمٌ', 'Tag'], ['لَيْلَةٌ', 'Nacht']
];

/* Ein gefuelltes Konto: 40 Karten ueber alle Stufen, 8 heute faellig, 4 neu,
   2 Sorgenkinder, drei Lektionen, eine Kategorie, 25 Tage Verlauf. */
function vollerStore(opt = {}) {
  const uid = 'u1';
  const store = {};
  const bid = 'b1';
  const karten = {};
  const ids = [];
  WOERTER.forEach(([ar, de], i) => {
    const id = 'k' + i;
    ids.push(id);
    let stufe, next, erste, rueck = 0;
    if (i < 4) { stufe = 0; next = tag(0); erste = null; }                 // neu
    else if (i < 12) { stufe = 1 + (i % 4); next = tag(0); erste = tag(-20); } // faellig
    else { stufe = 2 + (i % 9); next = tag(1 + (i % 12)); erste = tag(-30); }
    if (i === 5 || i === 9) rueck = 6;
    karten[id] = { wort: ar, uebersetzung: de, extra: i % 7 === 0 ? 'Plural: كُتُبٌ' : '', stufe, nextReview: next,
      ersteBewertung: erste, rueckfaelle: rueck, quelleId: null, maxStufe: stufe, order: i, bereichId: bid };
  });
  if (opt.leer) {
    store['users/' + uid + '/bereiche/' + bid] = { name: 'Vokabeln', order: 0, gefuehrt: false, satzId: null, satzVersion: 0, sets: {} };
  } else {
    store['users/' + uid + '/bereiche/' + bid] = { name: 'Medina Buch 1', order: 0, gefuehrt: false, satzId: null, satzVersion: 0,
      sets: {
        s1: { name: 'Lektion 1', order: 0, art: 'lektion', quelleId: null, cardIds: ids.slice(0, 12) },
        s2: { name: 'Lektion 2', order: 1, art: 'lektion', quelleId: null, cardIds: ids.slice(12, 25) },
        s3: { name: 'Lektion 3', order: 2, art: 'lektion', quelleId: null, cardIds: ids.slice(25, 40) },
        s4: { name: 'Familie', order: 3, art: 'kategorie', quelleId: null, cardIds: ids.slice(31, 38) },
        s5: { name: 'Schwierig', order: 4, art: 'eigen', quelleId: null, cardIds: [ids[5], ids[9]] }
      } };
    store['users/' + uid + '/bereiche/b2'] = { name: 'Quran-Wörter', order: 1, gefuehrt: false, satzId: null, satzVersion: 0, sets: {} };
    for (const [id, k] of Object.entries(karten)) store['users/' + uid + '/karten/' + id] = k;
  }
  const verlauf = {};
  if (!opt.leer) for (let i = 1; i <= 25; i++) if (i % 6 !== 0) verlauf[tag(-i)] = { w: 5 + (i * 7) % 14, n: i % 3 };
  store['users/' + uid] = { name: 'Test', schemaVersion: 2,
    settings: { arabGroesse: 'normal', thema: opt.thema || 'dunkel', sitzungsLimit: 'alle', lastBackup: opt.leer ? null : tag(-3) },
    streak: opt.leer ? {} : { count: 4, beste: 11, lastCompletedDate: tag(-1), lastEvaluatedDate: tag(0) },
    verlauf };
  return store;
}

async function neueSeite(browser, vp, opt = {}) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.dpr || 2,
    hasTouch: !!vp.touch, isMobile: !!vp.mobile, colorScheme: opt.hell ? 'light' : 'dark', reducedMotion: opt.ruhig ? 'reduce' : 'no-preference' });
  const p = await ctx.newPage();
  p.fehler = [];
  p.on('pageerror', e => p.fehler.push('PAGEERROR: ' + e.message + '\n' + (e.stack || '').split('\n').slice(0, 3).join('\n')));
  p.on('console', m => { if (m.type() === 'error' && !/Failed to load resource|ERR_/.test(m.text())) p.fehler.push('CONSOLE: ' + m.text()); });
  await p.route('**/www.gstatic.com/**', r => {
    const u = r.request().url();
    r.fulfill({ status: 200, contentType: 'text/javascript', body: u.includes('auth') ? AUTH : u.includes('firestore') ? FS : APP });
  });
  await p.route('**/verses.quran.foundation/**', r => r.abort());
  await p.route('**/apis.google.com/**', r => r.abort());
  const init = { user: opt.user === undefined ? { uid: 'u1', email: 'test@example.com', displayName: 'Test', emailVerified: true } : opt.user,
    store: opt.store || vollerStore(opt), ls: opt.ls || {} };
  await p.addInitScript(i => {
    window.__START_USER = i.user; window.__START_STORE = i.store;
    try { for (const [k, v] of Object.entries(i.ls)) localStorage.setItem(k, v); } catch (e) {}
  }, init);
  await p.goto(BASE, { waitUntil: 'load' });
  await p.waitForTimeout(opt.warte || 1400);
  return { ctx, p };
}

async function klick(p, sel, warte = 550) {
  const el = await p.$(sel);
  if (!el) throw new Error('nicht gefunden: ' + sel);
  await el.click();
  await p.waitForTimeout(warte);
}
async function aktion(p, action, id, warte = 550) {
  const ok = await p.evaluate(([a, id]) => {
    const els = [...document.querySelectorAll('[data-action="' + a + '"]')].filter(e => id == null || e.dataset.id === id);
    const el = els.find(e => e.offsetParent !== null) || els[0];
    if (!el) return false; el.click(); return true;
  }, [action, id]);
  if (!ok) throw new Error('keine Aktion ' + action + (id ? ' / ' + id : ''));
  await p.waitForTimeout(warte);
}
async function foto(p, name, voll) { await p.screenshot({ path: path.join(OUT, name + '.png'), fullPage: !!voll }); }

const GERAETE = {
  handy: { width: 390, height: 844, touch: true, mobile: true, dpr: 2 },
  klein: { width: 360, height: 740, touch: true, mobile: true, dpr: 2 },
  ipad: { width: 820, height: 1180, touch: true, mobile: true, dpr: 2 },
  ipadquer: { width: 1180, height: 820, touch: true, mobile: true, dpr: 2 },
  desktop: { width: 1440, height: 900, dpr: 1 }
};

/* Chromium: CHROMIUM=/pfad/zu/chrome setzen, sonst Playwrights eigenes. */
async function start() { return chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}); }

module.exports = { start, neueSeite, klick, aktion, foto, GERAETE, vollerStore, tag, OUT };

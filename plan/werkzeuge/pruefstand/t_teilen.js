/* G-017/G-018/G-019 (25.09.2026): Code erzeugen darf den Bereich erst nach
   Erfolg anfassen, "Teilen beenden" darf den Code lokal nicht verlieren,
   wenn das Loeschen in der Cloud scheitert, und jede Karte aus einem Code
   behaelt eine quelleId (kein Bild-Nachladen von einem fremden Server).
   node t_teilen.js */
const { start, neueSeite, aktion, vollerStore, tag } = require('./lib');
const { APP, AUTH, FS } = require('./stubs');

const BASE = 'http://127.0.0.1:8099/index.html';

const nutzer = { uid: 'u1', email: 'test@example.com', displayName: 'Test', emailVerified: true,
  providerData: [{ providerId: 'password' }], metadata: { creationTime: 'Mon, 03 Aug 2026 10:00:00 GMT', lastSignInTime: new Date().toUTCString() } };

/* Fuer Teil B: die Attrappe (stubs.js) kennt keinen Schalter, mit dem
   ausgerechnet deleteDoc auf geteilteLektionen scheitert (nur setDoc/
   updateDoc pruefen S.fail). stubs.js selbst wird nicht angefasst (nur
   app.js und dieser Test duerfen es) - stattdessen dient hier eine lokale
   Variante des Firestore-Moduls, mit demselben Verhalten, nur dass
   deleteDoc bei window.__FB.failDeleteGeteilt = true ablehnt. */
const FS_FEHLSCHLAG = FS.replace(
  'export function deleteDoc(ref){ S.store.delete(ref.path); melden(); return Promise.resolve(); }',
  /* "unavailable" statt "permission-denied": geteiltLoeschen() schluckt
     permission-denied absichtlich als "Dokument fehlt schon" (Kommentar dort,
     app.js ~2790) - das ist kein echter Fehlschlag. Ein echter Fehlschlag
     (Netz weg, Zeitlimit) hat einen anderen Code und muss beim Aufrufer
     ankommen. */
  'export function deleteDoc(ref){ if (S.failDeleteGeteilt && ref.path.startsWith("geteilteLektionen/")) return Promise.reject(Object.assign(new Error("fail"), {code:"unavailable"})); S.store.delete(ref.path); melden(); return Promise.resolve(); }'
);

async function neueSeiteFehlschlagDelete(browser, vp, opt = {}) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.dpr || 2, hasTouch: !!vp.touch, isMobile: !!vp.mobile });
  const p = await ctx.newPage();
  p.fehler = [];
  p.on('pageerror', e => p.fehler.push('PAGEERROR: ' + e.message + '\n' + (e.stack || '').split('\n').slice(0, 3).join('\n')));
  p.on('console', m => { if (m.type() === 'error' && !/Failed to load resource|ERR_/.test(m.text())) p.fehler.push('CONSOLE: ' + m.text()); });
  await p.route('**/www.gstatic.com/**', r => {
    const u = r.request().url();
    r.fulfill({ status: 200, contentType: 'text/javascript', body: u.includes('auth') ? AUTH : u.includes('firestore') ? FS_FEHLSCHLAG : APP });
  });
  await p.route('**/verses.quran.foundation/**', r => r.abort());
  await p.route('**/apis.google.com/**', r => r.abort());
  const init = { user: opt.user, store: opt.store, ls: opt.ls || {} };
  await p.addInitScript(i => { window.__START_USER = i.user; window.__START_STORE = i.store; try { for (const [k, v] of Object.entries(i.ls || {})) localStorage.setItem(k, v); } catch (e) {} }, init);
  await p.goto(BASE, { waitUntil: 'load' });
  await p.waitForTimeout(opt.warte || 1400);
  return { ctx, p };
}

const blatt = p => p.evaluate(() => { const d = [...document.querySelectorAll('.dlg')].pop(); return d ? d.innerText.replace(/\s+/g, ' ').slice(0, 220) : '–'; });
const knopf = (p, t) => p.evaluate(t => { const k = [...document.querySelectorAll('.dlg button')].find(x => x.innerText.trim() === t); if (k) { k.click(); return true; } return false; }, t);

(async () => {
  const b = await start();
  let fehler = 0;
  const pruefe = (name, ok) => { console.log((ok ? 'OK  ' : 'FEHL') + ' ' + name); if (!ok) fehler++; };

  // A: "Code erzeugen" scheitert (__FB.fail) - der Bereich behaelt keinen toten Code (G-017/DATEN-7/REGELN-7)
  {
    const { p } = await neueSeite(b, GERAETE_HANDY(), { warte: 1500, user: nutzer, store: vollerStore() });
    await p.evaluate(() => { window.__FB.fail = true; });
    await aktion(p, 'einstellungen', null, 800);
    await aktion(p, 'einst-seite', 'kartensaetze', 800);
    await aktion(p, 'teile-lektion-code-lehrer', null, 700);
    pruefe('Code erzeugen: fragt nach', (await blatt(p)).includes('Veröffentlichung'));
    await knopf(p, 'Code erzeugen');
    await p.waitForTimeout(1500);
    pruefe('Code erzeugen: Fehlermeldung sichtbar', (await blatt(p)) !== '–');
    await knopf(p, 'OK');
    await p.waitForTimeout(400);
    const hatTeilCode = await p.evaluate(() => { const d = window.__FB.store.get('users/u1/bereiche/b1'); return d ? ('teilCode' in d) : null; });
    pruefe('Code erzeugen: b1.teilCode NICHT gesetzt', hatTeilCode === false);
    const hatDatensatz = await p.evaluate(() => [...window.__FB.store.keys()].some(k => k.startsWith('geteilteLektionen/')));
    pruefe('Code erzeugen: kein Datensatz in geteilteLektionen', !hatDatensatz);
    const seite = await p.evaluate(() => document.querySelector('#app .view').innerText);
    pruefe('Code erzeugen: App zeigt kein "Dein Code"', !seite.includes('Dein Code'));
    pruefe('Code erzeugen: Knopf "Code erzeugen" weiterhin da', seite.includes('Code erzeugen'));
    pruefe('Code erzeugen: keine Seitenfehler', !p.fehler.length); if (p.fehler.length) console.log(p.fehler.join('\n'));
    await p.context().close();
  }

  // B: "Teilen beenden" scheitert im Cloud-Loeschen - der Code bleibt lokal stehen (G-018/DATEN-6)
  {
    const store = vollerStore();
    store['users/u1/bereiche/b1'].teilCode = 'ABCDE-FGHJK';
    store['geteilteLektionen/ABCDE-FGHJK'] = { ownerUid: 'u1', erstelltAm: '2026-09-20T10:00:00Z', inhalt: { bereiche: [] } };
    const { p } = await neueSeiteFehlschlagDelete(b, GERAETE_HANDY(), { warte: 1500, user: nutzer, store });
    await p.evaluate(() => { window.__FB.failDeleteGeteilt = true; });
    await aktion(p, 'einstellungen', null, 800);
    await aktion(p, 'einst-seite', 'kartensaetze', 800);
    const seiteVorher = await p.evaluate(() => document.querySelector('#app .view').innerText);
    pruefe('Teilen beenden: Seite zeigt den bestehenden Code', seiteVorher.includes('ABCDE-FGHJK'));
    await aktion(p, 'beende-teilen-code', null, 700);
    await knopf(p, 'Beenden');
    await p.waitForTimeout(1500);
    pruefe('Teilen beenden: Fehlermeldung sichtbar', (await blatt(p)).length > 0);
    await knopf(p, 'OK');
    await p.waitForTimeout(400);
    const teilCode = await p.evaluate(() => { const d = window.__FB.store.get('users/u1/bereiche/b1'); return d ? d.teilCode : undefined; });
    pruefe('Teilen beenden: b1.teilCode bleibt stehen', teilCode === 'ABCDE-FGHJK');
    const nochDa = await p.evaluate(() => window.__FB.store.has('geteilteLektionen/ABCDE-FGHJK'));
    pruefe('Teilen beenden: Datensatz in der Cloud bleibt', nochDa);
    const seiteDanach = await p.evaluate(() => document.querySelector('#app .view').innerText);
    pruefe('Teilen beenden: Knopf "Teilen beenden" bleibt da', seiteDanach.includes('Teilen beenden'));
    pruefe('Teilen beenden: keine Seitenfehler', !p.fehler.length); if (p.fehler.length) console.log(p.fehler.join('\n'));
    await p.context().close();
  }

  // C: Einloesen eines Datensatzes mit quelleId:null - kein Bild-Nachladen vom fremden Server (G-019/DATEN-4)
  {
    const store = vollerStore({ leer: true });
    const code = 'ZZZZZ-BILDX';
    store['geteilteLektionen/' + code] = {
      ownerUid: 'u2', erstelltAm: '2026-09-20T10:00:00Z',
      inhalt: { bereiche: [{
        id: 'fremd1', name: 'Fremder Satz', gefuehrt: true, satzId: 'fremd-satz-1', satzVersion: 1,
        karten: [{ id: 'c1', quelleId: null, wort: 'بَيْتٌ', uebersetzung: 'Haus', extra: 'https://bilder.example/x.png', stufe: 0, nextReview: tag(0), ersteBewertung: null, rueckfaelle: 0, maxStufe: 0 }],
        sets: []
      }] }
    };
    const { p, ctx } = await neueSeite(b, GERAETE_HANDY(), { warte: 1500, user: nutzer, store });
    const angefragt = [];
    p.on('request', r => { if (r.url().includes('bilder.example')) angefragt.push(r.url()); });
    await ctx.route('**/bilder.example/**', r => { angefragt.push(r.request().url()); r.abort(); });
    await aktion(p, 'einstellungen', null, 800);
    await aktion(p, 'einst-seite', 'kartensaetze', 800);
    await aktion(p, 'code-einloesen-start', null, 700);
    await p.fill('#dlg-input', code);
    await knopf(p, 'Einlösen');
    await p.waitForTimeout(1000);
    await knopf(p, 'Übernehmen');
    await p.waitForTimeout(1200);
    // moegliche Restmeldung (z. B. "eingespielt") wegklicken
    if ((await blatt(p)) !== '–') { await knopf(p, 'OK'); await p.waitForTimeout(400); }
    await aktion(p, 'tab-verwalten', null, 1200);
    await aktion(p, 'bereich-sheet-auf', null, 700);
    await p.evaluate(() => { const el = [...document.querySelectorAll('[data-action="select-bereich"]')].find(x => x.innerText.includes('Fremder Satz')); if (el) el.click(); });
    await p.waitForTimeout(700);
    const dom = await p.evaluate(() => ({
      imgFremd: !!document.querySelector('img[src*="bilder.example"]'),
      linkFremd: !!document.querySelector('a[href*="bilder.example"]'),
      hatQuelleId: (() => { for (const [k, v] of window.__FB.store) { if (/^users\/u1\/karten\//.test(k) && v.wort === 'بَيْتٌ') return !!v.quelleId; } return null; })()
    }));
    pruefe('Einloesen: kein Netzaufruf an bilder.example', angefragt.length === 0);
    pruefe('Einloesen: Bild erscheint als Link, kein <img>', dom.linkFremd && !dom.imgFremd);
    pruefe('Einloesen: Karte hat eine quelleId (nicht null)', dom.hatQuelleId === true);
    pruefe('Einloesen: keine Seitenfehler', !p.fehler.length); if (p.fehler.length) console.log(p.fehler.join('\n'));
    await p.context().close();
  }

  console.log(fehler ? fehler + ' Fehler' : 'alles ok');
  await b.close();
  if (fehler) process.exit(1);
})();

function GERAETE_HANDY() { return { width: 390, height: 844, touch: true, mobile: true, dpr: 2 }; }

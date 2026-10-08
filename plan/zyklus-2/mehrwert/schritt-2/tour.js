/* Schritt 2 (nur lesen): Rundgang ueber alle Bildschirme, Fotos + Bewegungsinventar.
   Aufruf: node tour.js <geraet> <thema> <modus>   modus: voll | leer | gast
   Schreibt Fotos nach PRUEF_BILDER und eine JSON-Zeile je Schritt nach stdout. */
const path = require('node:path');
const fs = require('node:fs');
const PS = path.resolve(__dirname, '../../../werkzeuge/pruefstand') + '/';
const { start, neueSeite, GERAETE, vollerStore, OUT } = require(PS + 'lib');
const [geraetName = 'handy', thema = 'dunkel', modus = 'voll'] = process.argv.slice(2);
const GER = { ...GERAETE, mini: { width: 320, height: 568, touch: true, mobile: true, dpr: 2 } };
const vp = { ...GER[geraetName], dpr: 1 };
const prefix = [geraetName, thema, modus].join('-');
const zeilen = [];
let nr = 0;

function aus(o) { zeilen.push(o); console.log(JSON.stringify(o)); }

async function animationen(p) {
  return p.evaluate(() => document.getAnimations().map(a => {
    const t = a.effect && a.effect.getComputedTiming ? a.effect.getComputedTiming() : {};
    const el = a.effect && a.effect.target;
    const pe = a.effect && a.effect.pseudoElement;
    let ziel = '?';
    if (el) ziel = el.tagName.toLowerCase() + (el.classList.length ? '.' + [...el.classList].slice(0, 2).join('.') : '') + (pe || '');
    return { n: a.animationName || ('T:' + a.transitionProperty), ziel,
      d: Math.round(t.duration), v: Math.round(t.delay || 0), it: t.iterations === Infinity ? 'inf' : t.iterations,
      e: (a.effect && a.effect.getTiming().easing) || '', zustand: a.playState };
  }));
}

function zusammen(listen) {
  const m = new Map();
  for (const l of listen) for (const a of l) {
    const k = a.n + '|' + a.ziel + '|' + a.d + '|' + a.v;
    if (!m.has(k)) m.set(k, { ...a, mal: 0 });
  }
  for (const a of listen.flat()) { /* zaehlen je Liste das Maximum */ }
  const alle = [...m.values()];
  const namen = {};
  for (const a of alle) namen[a.n] = (namen[a.n] || 0) + 1;
  const endlich = alle.filter(a => a.it !== 'inf');
  const ende = endlich.reduce((x, a) => Math.max(x, a.v + a.d * (a.it || 1)), 0);
  return { anzahl: alle.length, ziele: new Set(alle.map(a => a.ziel)).size, endeMs: ende, namen,
    endlos: alle.filter(a => a.it === 'inf').map(a => a.n + '@' + a.ziel),
    feder: alle.filter(a => /1\.4|1\.3|1\.2/.test(a.e)).length,
    laengste: endlich.sort((a, b) => (b.v + b.d) - (a.v + a.d)).slice(0, 4).map(a => a.n + '@' + a.ziel + ' ' + a.v + '+' + a.d) };
}

async function zustand(p) {
  return p.evaluate(() => {
    const sichtbar = e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== 'hidden'; };
    const akt = [...new Set([...document.querySelectorAll('[data-action]')].filter(sichtbar).map(e => e.dataset.action + (e.dataset.id ? ':' + e.dataset.id : '')))];
    const h1 = [...document.querySelectorAll('h1')].filter(sichtbar).map(e => e.textContent.trim().slice(0, 60));
    return { h1, hoehe: document.documentElement.scrollHeight, fenster: innerHeight, quer: document.documentElement.scrollWidth > innerWidth,
      aktionen: akt.slice(0, 80) };
  });
}

/* Eine Handlung ausfuehren, Bewegung mitschneiden, danach Foto. */
async function schritt(p, name, tun, opt = {}) {
  nr++;
  const id = String(nr).padStart(2, '0') + '-' + name;
  let fehler = null;
  try { if (tun) await tun(); } catch (e) { fehler = String(e.message || e).slice(0, 160); }
  const listen = [];
  if (!fehler) {
    for (const t of [20, 90, 220]) { await p.waitForTimeout(t === 20 ? 20 : t === 90 ? 70 : 130); listen.push(await animationen(p)); }
  }
  const b = zusammen(listen);
  await p.waitForTimeout(Math.min(Math.max(b.endeMs - 220 + 150, 400), opt.maxWarte || 4000));
  const z = await zustand(p);
  if (!fehler) await p.screenshot({ path: path.join(OUT, prefix + '-' + id + '.png') });
  if (!fehler && opt.voll && z.hoehe > z.fenster + 4) await p.screenshot({ path: path.join(OUT, prefix + '-' + id + '-voll.png'), fullPage: true });
  aus({ id, fehler, bewegung: b, ...z, seitenfehler: p.fehler.splice(0) });
  return !fehler;
}

function tipp(p, action, id) {
  return async () => {
    const ok = await p.evaluate(([a, id]) => {
      const els = [...document.querySelectorAll('[data-action="' + a + '"]')].filter(e => id == null || e.dataset.id === id);
      const el = els.find(e => e.offsetParent !== null) || els[0];
      if (!el) return false; el.click(); return true;
    }, [action, id]);
    if (!ok) throw new Error('keine Aktion ' + action + (id ? '/' + id : ''));
  };
}
const taste = (p, k) => async () => { await p.keyboard.press(k); };
async function ids(p, action) { return p.locator('[data-action="' + action + '"]').evaluateAll(es => [...new Set(es.map(e => e.dataset.id))]); }

(async () => {
  const b = await start();
  try {
    if (modus === 'gast') {
      const { p } = await neueSeite(b, vp, { user: null, store: {}, thema, hell: thema === 'hell', ls: { 'adrabic-thema': thema }, warte: 30 });
      await schritt(p, 'einstieg-0-start', null, { voll: true });
      await p.waitForTimeout(2600);
      await schritt(p, 'einstieg-0-nach-drehung', null, { voll: true });
      await schritt(p, 'einstieg-1', tipp(p, 'einstieg-weiter'), { voll: true });
      await schritt(p, 'einstieg-1-wahl', tipp(p, 'einstieg-ziel', 'kurs'), { voll: true });
      await schritt(p, 'einstieg-2', tipp(p, 'einstieg-weiter'), { voll: true });
      await schritt(p, 'einstieg-2-wahl-a', tipp(p, 'einstieg-huerde', 'vergessen'), { voll: true });
      await schritt(p, 'einstieg-2-wahl-b', tipp(p, 'einstieg-huerde', 'schrift'), { voll: true });
      await schritt(p, 'einstieg-2-wahl-c', tipp(p, 'einstieg-huerde', 'zeit'), { voll: true });
      await schritt(p, 'einstieg-3', tipp(p, 'einstieg-weiter'), { voll: true });
      await schritt(p, 'einstieg-3-offen', tipp(p, 'einstieg-aufdecken'), { voll: true });
      await schritt(p, 'einstieg-3-bewertet', tipp(p, 'einstieg-bewerten', 'Sicher'), { voll: true });
      await schritt(p, 'einstieg-4', tipp(p, 'einstieg-weiter'), { voll: true });
      await schritt(p, 'einstieg-5', tipp(p, 'einstieg-weiter'), { voll: true });
      await schritt(p, 'einstieg-6', tipp(p, 'einstieg-weiter'), { voll: true });
      await schritt(p, 'einstieg-6-wahl', tipp(p, 'einstieg-anker', 'maghrib'), { voll: true });
      await schritt(p, 'einstieg-7-aufbau', tipp(p, 'einstieg-weiter'), { maxWarte: 900 });
      await p.waitForTimeout(7500);
      await schritt(p, 'einstieg-7-plan', null, { voll: true, maxWarte: 6000 });
      await p.evaluate(() => scrollTo(0, 0));
      await schritt(p, 'einstieg-7-plan-oben', null, {});
      await schritt(p, 'konto', tipp(p, 'einstieg-fertig'), { voll: true });
      await schritt(p, 'anmelden', tipp(p, 'mode-login'), { voll: true });
      await schritt(p, 'passwort', tipp(p, 'mode-reset'), { voll: true });
    } else {
      const leer = modus === 'leer';
      const store = vollerStore({ leer, thema });
      const { p } = await neueSeite(b, vp, { thema, hell: thema === 'hell', leer, store, ls: { 'adrabic-thema': thema }, warte: 30 });
      await schritt(p, 'start-kalt', null, { maxWarte: 2500 });
      await schritt(p, 'lernen', null, { voll: true });
      await schritt(p, 'fortschritt', tipp(p, 'tab-fortschritt'), { voll: true });
      for (const id of await ids(p, 'fort-seite')) {
        await schritt(p, 'fort-' + id, tipp(p, 'fort-seite', id), { voll: true });
        await schritt(p, 'fort-' + id + '-zu', tipp(p, 'seite-zu'));
      }
      await schritt(p, 'verwalten', tipp(p, 'tab-verwalten'), { voll: true });
      await schritt(p, 'kartenblatt', tipp(p, 'karte-neu'));
      await schritt(p, 'kartenblatt-zu', taste(p, 'Escape'));
      if (!leer) {
        await schritt(p, 'ueben', tipp(p, 'open-drill'), { voll: true });
        await schritt(p, 'ueben-zu', tipp(p, 'close-drill'));
      }
      await schritt(p, 'lernen-zurueck', tipp(p, 'tab-lernen'));
      await schritt(p, 'einstellungen', tipp(p, 'einstellungen'), { voll: true });
      for (const id of await ids(p, 'einst-seite')) {
        await schritt(p, 'einst-' + id, tipp(p, 'einst-seite', id), { voll: true });
        await schritt(p, 'einst-' + id + '-zu', tipp(p, 'seite-zu'));
      }
      await schritt(p, 'einstellungen-zu', tipp(p, 'einstellungen-zu'));
      if (!leer) {
        await schritt(p, 'runde', tipp(p, 'start-session'));
        await schritt(p, 'runde-antwort', taste(p, 'Space'));
        await schritt(p, 'runde-nicht', taste(p, '1'));
        await schritt(p, 'runde-antwort2', taste(p, 'Space'));
        await schritt(p, 'runde-fast', taste(p, '2'));
        await schritt(p, 'runde-antwort3', taste(p, 'Space'));
        await schritt(p, 'runde-sicher', taste(p, '3'));
        for (let i = 0; i < 60 && !(await p.locator('#app .ende').count()); i++) {
          await p.keyboard.press('Space'); await p.waitForTimeout(650);
          if (await p.locator('#app .ende').count()) break;
          await p.keyboard.press('3'); await p.waitForTimeout(450);
        }
        await schritt(p, 'rundenende', null, { voll: true });
      }
    }
    fs.writeFileSync(path.join(OUT, prefix + '.json'), JSON.stringify(zeilen, null, 1));
  } finally { await b.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

/* Abnahme mehrerer Einstiegs-Befunde (3.17.42):
   G-039 (EINSTIEG-3) Probekarte springt beim Aufdecken nicht mehr - der
         Untertitel bleibt an derselben Stelle, .einstieg-probe top gleich
         (+-1px) vor/nach dem Aufdecken, 390 und 360 px.
   G-040 (EINSTIEG-4) Probekarte benutzt dieselbe Drehung wie die Runde
         (karte-dreh, karte-seite--vorn/--hinten, karte-dreh--wende),
         einstieg-aufklappen/einstieg-einladen gibt es nicht mehr.
   G-041 (EINSTIEG-5) "Nichts davon" liegt auf 360 und 390 px nicht mehr
         unerreichbar hinter dem stehenden Weiter-Bereich.
   G-044 (EINSTIEG-6) Der Anker-Text ("Nach dem Fajr-Gebet") steht auf dem
         fertigen Plan genau einmal.
   G-083 (EINSTIEG-12) Kurze Screens setzen den Fuss unten, lange Screens
         wachsen/scrollen normal; der Weiter-Bereich ueberdeckt nie den Inhalt.

   Gegenprobe fest auf Commit 5ad0a11 (Stand vor 3.17.42, LEHREN § 15):
   app.js UND styles.css werden dafuer aus dem alten Commit ausgeliefert -
   beide Dateien haben Anteile an jeder dieser Behebungen. */
const { chromium } = require('playwright');
const { AUTH, FS, APP } = require('./stubs');
const path = require('path');
const { execSync } = require('child_process');

const REPO = path.join(__dirname, '..', '..', '..');
const BASE = 'http://127.0.0.1:8099/index.html';
let APP_ALT = null, CSS_ALT = null;
try {
  APP_ALT = execSync('git show 5ad0a11:app.js', { cwd: REPO, encoding: 'utf8' });
  CSS_ALT = execSync('git show 5ad0a11:styles.css', { cwd: REPO, encoding: 'utf8' });
} catch (e) { console.log('Kein Git-Stand 5ad0a11 gefunden - Gegenproben entfallen:', e.message); }

async function seite(b, vp, opt = {}) {
  const ctx = await b.newContext({
    viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 2, hasTouch: true, isMobile: true,
    reducedMotion: opt.ruhig ? 'reduce' : 'no-preference'
  });
  if (opt.alt && APP_ALT) {
    await ctx.route(u => u.hostname === '127.0.0.1' && u.pathname.endsWith('/app.js'),
      r => r.fulfill({ status: 200, contentType: 'text/javascript', body: APP_ALT }));
    await ctx.route(u => u.hostname === '127.0.0.1' && u.pathname.endsWith('/styles.css'),
      r => r.fulfill({ status: 200, contentType: 'text/css', body: CSS_ALT }));
  }
  await ctx.route('**/www.gstatic.com/**', r => {
    const u = r.request().url();
    r.fulfill({ status: 200, contentType: 'text/javascript', body: u.includes('auth') ? AUTH : u.includes('firestore') ? FS : APP });
  });
  await ctx.route('**/verses.quran.foundation/**', r => r.abort());
  await ctx.route('**/apis.google.com/**', r => r.abort());
  const p = await ctx.newPage();
  p.fehler = [];
  p.on('pageerror', e => p.fehler.push('PAGEERROR: ' + e.message));
  await p.addInitScript(() => { window.__START_USER = null; window.__START_STORE = {}; });
  await p.goto(BASE, { waitUntil: 'load' });
  await p.waitForTimeout(opt.warte || 1500);
  return { ctx, p };
}

let funde = 0;
function pruefe(bedingung, text) {
  if (bedingung) console.log('ok     ', text);
  else { console.log('FEHLER ', text); funde++; }
}

async function klick(p, sel, warte = 650) {
  const ok = await p.evaluate(s => { const el = document.querySelector(s); if (!el) return false; el.click(); return true; }, sel);
  await p.waitForTimeout(warte);
  return ok;
}
/* 3.17.42 (G-040): Bildschirm 3 hat keine eigene .einstieg-probe-Flaeche mehr
   (Kasten im Kasten, siehe styles.css) - .einstieg-karte ist jetzt die
   sichtbare Karte selbst (wie .karte-seite in der Runde). Fuer G-039 zaehlt
   ihre Oberkante. */
const probeTop = p => p.evaluate(() => { const k = document.querySelector('.einstieg-karte'); return k ? Math.round(k.getBoundingClientRect().top) : null; });
const knopfTop = p => p.evaluate(() => { const k = document.querySelector('.einstieg-aktion button.full'); return k ? Math.round(k.getBoundingClientRect().top) : null; });

/* ---- G-039 + G-040: Probekarte (Bildschirm 3) --------------------------- */
async function pruefeProbekarte(b, vp, label) {
  const { p, ctx } = await seite(b, vp);
  await klick(p, '[data-action="einstieg-weiter"]');                 // 0 -> 1
  await klick(p, '[data-action="einstieg-ziel"]', 300);
  await klick(p, '[data-action="einstieg-weiter"]');                 // 1 -> 2
  await klick(p, '[data-action="einstieg-huerde"][data-id="keine"]', 300);
  await klick(p, '[data-action="einstieg-weiter"]');                 // 2 -> 3
  const vor = await probeTop(p);
  const vorKlassen = await p.evaluate(() => {
    const k = document.querySelector('.einstieg-karte');
    return { istKnopf: k ? k.tagName === 'BUTTON' : null, hatKarteDreh: !!document.querySelector('.einstieg-karte .karte-dreh') };
  });
  pruefe(vorKlassen.istKnopf === true, label + ': Karte vor dem Aufdecken ist ein <button>');
  pruefe(vorKlassen.hatKarteDreh === true, label + ': Vorderseite steckt schon in .karte-dreh (wie die Runde)');
  await klick(p, '[data-action="einstieg-aufdecken"]', 700);
  const nach = await probeTop(p);
  pruefe(vor !== null && nach !== null && Math.abs(vor - nach) <= 1,
    label + ': .einstieg-probe Top vor/nach Aufdecken gleich (' + vor + ' -> ' + nach + ')');
  const nachKlassen = await p.evaluate(() => {
    const dreh = document.querySelector('.einstieg-karte .karte-dreh');
    const vorn = document.querySelector('.einstieg-karte .karte-seite--vorn');
    const hinten = document.querySelector('.einstieg-karte .karte-seite--hinten');
    const tipp = !!document.querySelector('.einstieg-karte .study-flaeche__tipp');
    /* Dirigent bei der Abnahme: Wort vorn und hinten gleich hoch (Platzhalter
       vorn wie in der Runde) - vorher sprang es ~15 px. */
    const wm = s => { if (!s) return null; const r = s.querySelector('.study-word').getBoundingClientRect(), k = s.getBoundingClientRect(); return (r.top + r.bottom) / 2 - k.top; };
    const wortDiff = vorn && hinten ? Math.abs(wm(vorn) - wm(hinten)) : null;
    const antwort = hinten ? hinten.querySelector('.study-answer') : null;
    return {
      wende: dreh ? dreh.classList.contains('karte-dreh--wende') : false,
      vornDa: !!vorn, hintenDa: !!hinten, tippDa: tipp, wortDiff,
      antwortText: antwort ? antwort.textContent.trim() : null
    };
  });
  pruefe(nachKlassen.wende, label + ': karte-dreh--wende dreht wie in der Runde');
  pruefe(nachKlassen.vornDa && nachKlassen.hintenDa, label + ': karte-seite--vorn UND --hinten beide da (Drehung im Gang)');
  /* Dirigent bei der Abnahme: KEIN "Tippen zum Umdrehen" auf der Probekarte -
     der Untertitel (Betreiber-Wortlaut, WORTLAUT.md) sagt es schon. */
  pruefe(!nachKlassen.tippDa, label + ': kein doppelter Hinweis auf der Karte (Untertitel sagt es)');
  pruefe(nachKlassen.wortDiff !== null && nachKlassen.wortDiff <= 1, label + ': Wort vorn/hinten gleich hoch (' + nachKlassen.wortDiff + ' px)');
  pruefe(nachKlassen.antwortText === 'Buch', label + ': Uebersetzung ("Buch") steht auf der Rueckseite, .study-answer: ' + nachKlassen.antwortText);
  const keineAlteKlassen = await p.evaluate(() =>
    !document.querySelector('.einstieg-aufklappen, .einstieg-einladen, .einstieg-karte--wartet, .einstieg-karte__loesung'));
  pruefe(keineAlteKlassen, label + ': keine alten Klassen (einstieg-aufklappen/-einladen/--wartet/__loesung) mehr im DOM');
  console.log(label, '| Fehler auf der Seite:', p.fehler.join('|') || 'ok');
  await ctx.close();
}

/* ---- G-041: "Nichts davon" nicht hinter dem Weiter-Bereich ------------- */
async function pruefeNichtsDavon(b, vp, label) {
  const { p, ctx } = await seite(b, vp);
  await klick(p, '[data-action="einstieg-weiter"]');                 // 0 -> 1
  await klick(p, '[data-action="einstieg-ziel"]', 300);
  await klick(p, '[data-action="einstieg-weiter"]');                 // 1 -> 2 (Huerden)
  /* Der Befund maß den schlimmsten Fall: mehrere Huerden gewaehlt (jede
     bekommt ein Echo darunter, die Liste wird laenger) - auf 390 px war
     "Nichts davon" dann "ganz verdeckt", auch nach dem Scrollen. */
  await klick(p, '[data-action="einstieg-huerde"][data-id="vergessen"]', 200);
  await klick(p, '[data-action="einstieg-huerde"][data-id="wann"]', 200);
  await klick(p, '[data-action="einstieg-huerde"][data-id="dran"]', 200);
  await klick(p, '[data-action="einstieg-huerde"][data-id="zeit"]', 200);
  await klick(p, '[data-action="einstieg-huerde"][data-id="schrift"]', 200);
  /* Seit 3.17.44 stehen Auswahl und Weiter im Dokumentfluss.
     Pruefen: kein Ueberlappen und die letzte Auswahl ist nach Scrollen
     wirklich antippbar. Alte Sticky-Puffer sind kein Abnahmekriterium. */
  const ohneScroll = await p.evaluate(() => Math.round(document.documentElement.scrollHeight - innerHeight));
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await p.waitForTimeout(300);
  const lage = await p.evaluate(() => {
    const keine = document.querySelector('[data-action="einstieg-huerde"][data-id="keine"]');
    const aktion = document.querySelector('.einstieg-aktion');
    if (!keine || !aktion) return null;
    const kr = keine.getBoundingClientRect(), ar = aktion.getBoundingClientRect();
    return { keineBottom: Math.round(kr.bottom), aktionTop: Math.round(ar.top) };
  });
  // Seit 3.17.44 normaler Dokumentfluss: keine kuenstliche Scrollreserve.
  // Entscheidend sind Ueberdeckung und echte Erreichbarkeit per Trefferpruefung.
  pruefe(!!lage && lage.aktionTop >= lage.keineBottom,
    label + ': Weiter-Bereich liegt hinter der letzten Auswahl: ' + JSON.stringify(lage));
  const erreichbar = await p.evaluate(() => {
    const el = document.querySelector('[data-action="einstieg-huerde"][data-id="keine"]');
    el.scrollIntoView({block:'center', behavior:'instant'});
    const r = el.getBoundingClientRect();
    return el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2));
  });
  pruefe(erreichbar, label + ': letzte Auswahl ist nach Scrollen tatsaechlich antippbar');
  console.log(label, '| Fehler auf der Seite:', p.fehler.join('|') || 'ok');
  await ctx.close();
}

/* ---- G-044: Anker-Text genau einmal auf dem Plan ------------------------ */
async function pruefeZeitpunktEinmal(b) {
  const { p, ctx } = await seite(b, { width: 390, height: 844 });
  await klick(p, '[data-action="einstieg-weiter"]');
  await klick(p, '[data-action="einstieg-ziel"]', 300);
  await klick(p, '[data-action="einstieg-weiter"]');
  await klick(p, '[data-action="einstieg-huerde"][data-id="keine"]', 300);
  await klick(p, '[data-action="einstieg-weiter"]');                 // Huerden -> 3
  await klick(p, '[data-action="einstieg-aufdecken"]');
  await klick(p, '[data-action="einstieg-bewerten"][data-id="Sicher"]');
  await klick(p, '[data-action="einstieg-weiter"]');                 // 3 -> 4
  await klick(p, '[data-action="einstieg-weiter"]');                 // 4 -> 5
  await klick(p, '[data-action="einstieg-weiter"]');                 // 5 -> 6
  await klick(p, '[data-action="einstieg-anker"][data-id="fajr"]', 300);
  await klick(p, '[data-action="einstieg-weiter"]', 8000);           // 6 -> 7 (Plan-Aufbau)
  const info = await p.evaluate(() => {
    const el = document.querySelector('.einstieg');
    const text = el ? el.innerText : '';
    const treffer = (text.match(/Fajr-Gebet/g) || []).length;
    const kachelZeitpunkt = !!document.querySelector('.einstieg-kachel__titel') &&
      [...document.querySelectorAll('.einstieg-kachel__titel')].some(t => t.textContent.trim() === 'Zeitpunkt');
    const kacheln = document.querySelectorAll('.einstieg-kachel').length;
    return { treffer, kachelZeitpunkt, kacheln };
  });
  pruefe(info.treffer === 1, 'Anker-Text ("Fajr-Gebet") kommt auf dem Plan genau einmal vor: ' + info.treffer);
  pruefe(!info.kachelZeitpunkt, 'Kachel "Zeitpunkt" gibt es auf dem Plan nicht mehr');
  pruefe(info.kacheln === 3, 'Drei Kacheln auf dem Plan (Runde/Schrift/Ziel): ' + info.kacheln);
  console.log('G-044', '| Fehler auf der Seite:', p.fehler.join('|') || 'ok');
  await ctx.close();
}

/* ---- G-083: normaler Dokumentfluss statt Footer-Overlay -------------- */
async function pruefeKnopfHoehe(b, vp, label) {
  const { p, ctx } = await seite(b, vp);
  const mess = () => p.evaluate(() => {
    const aktion = document.querySelector('.einstieg-aktion');
    if (!aktion) return null;
    const ar = aktion.getBoundingClientRect();
    const opts = [...document.querySelectorAll('.einstieg-option')];
    const overlap = opts.some(el => {
      const r = el.getBoundingClientRect();
      return r.bottom > ar.top - 1 && r.top < ar.bottom + 1;
    });
    return {
      overlap,
      scroll: Math.round(document.documentElement.scrollHeight - innerHeight),
      buttonVisible: ar.bottom <= innerHeight + 1
    };
  });
  const kurz = await mess();
  pruefe(!!kurz && !kurz.overlap, label + ': Fuss ueberdeckt im Startbildschirm keinen Inhalt');
  await klick(p, '[data-action="einstieg-weiter"]');                 // -> 1
  await klick(p, '[data-action="einstieg-ziel"]', 300);
  await klick(p, '[data-action="einstieg-weiter"]');                 // -> 2
  await klick(p, '[data-action="einstieg-huerde"][data-id="vergessen"]', 300);
  await klick(p, '[data-action="einstieg-huerde"][data-id="wann"]', 300);
  await klick(p, '[data-action="einstieg-huerde"][data-id="dran"]', 300);
  await klick(p, '[data-action="einstieg-huerde"][data-id="zeit"]', 300);
  await klick(p, '[data-action="einstieg-huerde"][data-id="schrift"]', 300);
  const lang = await mess();
  pruefe(!!lang && !lang.overlap && lang.scroll > 0,
    label + ': langer Huerden-Screen scrollt und der Fuss ueberdeckt nichts: ' + JSON.stringify(lang));
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const ende = await mess();
  pruefe(!!ende && !ende.overlap,
    label + ': auch am Dokumentende kein Ueberdecken durch den Weiter-Bereich: ' + JSON.stringify(ende));
  console.log(label, '| Fehler auf der Seite:', p.fehler.join('|') || 'ok');
  await ctx.close();
}

(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
  const GERAETE = { handy: { width: 390, height: 844 }, klein: { width: 360, height: 740 } };

  console.log('-- G-039 + G-040: Probekarte --');
  for (const [name, vp] of Object.entries(GERAETE)) await pruefeProbekarte(b, vp, 'Probekarte/' + name);

  console.log('\n-- G-041: "Nichts davon" --');
  for (const [name, vp] of Object.entries(GERAETE)) await pruefeNichtsDavon(b, vp, 'NichtsDavon/' + name);

  console.log('\n-- G-044: Zeitpunkt nur einmal --');
  await pruefeZeitpunktEinmal(b);

  console.log('\n-- G-083: Footer im Dokumentfluss --');
  for (const [name, vp] of Object.entries(GERAETE)) await pruefeKnopfHoehe(b, vp, 'KnopfHoehe/' + name);

  console.log('\n' + funde + ' Fehler insgesamt auf dem aktuellen Stand.');

  if (APP_ALT && CSS_ALT) {
    console.log('\n-- Gegenprobe gegen 5ad0a11 (muss rot sein) --');
    let altFunde = 0;
    // G-039/G-040 Gegenprobe
    {
      const { p, ctx } = await seite(b, { width: 390, height: 844 }, { alt: true });
      await klick(p, '[data-action="einstieg-weiter"]');
      await klick(p, '[data-action="einstieg-ziel"]', 300);
      await klick(p, '[data-action="einstieg-weiter"]');
      await klick(p, '[data-action="einstieg-weiter"]');
      const vor = await probeTop(p);
      await klick(p, '[data-action="einstieg-aufdecken"]', 700);
      const nach = await probeTop(p);
      const gleich = vor !== null && nach !== null && Math.abs(vor - nach) <= 1;
      if (gleich) { console.log('  unerwartet: alter Stand hat den Sprung nicht (G-039)'); altFunde++; }
      else console.log('  ok (=Fehler im Altstand): Probekarte springt beim Aufdecken (' + vor + ' -> ' + nach + ')');
      const hatKarteDreh = await p.evaluate(() => !!document.querySelector('.einstieg-karte .karte-dreh--wende'));
      if (hatKarteDreh) { console.log('  unerwartet: alter Stand hat karte-dreh--wende schon (G-040)'); altFunde++; }
      else console.log('  ok (=Fehler im Altstand): keine karte-dreh--wende, alte eigene Drehung');
      await ctx.close();
    }
    // G-041 Gegenprobe
    {
      const { p, ctx } = await seite(b, { width: 390, height: 844 }, { alt: true });
      await klick(p, '[data-action="einstieg-weiter"]');
      await klick(p, '[data-action="einstieg-ziel"]', 300);
      await klick(p, '[data-action="einstieg-weiter"]');
      await klick(p, '[data-action="einstieg-huerde"][data-id="vergessen"]', 200);
      await klick(p, '[data-action="einstieg-huerde"][data-id="wann"]', 200);
      await klick(p, '[data-action="einstieg-huerde"][data-id="dran"]', 200);
  await klick(p, '[data-action="einstieg-huerde"][data-id="zeit"]', 200);
  await klick(p, '[data-action="einstieg-huerde"][data-id="schrift"]', 200);
      await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await p.waitForTimeout(300);
      const lage = await p.evaluate(() => {
        const keine = document.querySelector('[data-action="einstieg-huerde"][data-id="keine"]');
        const aktion = document.querySelector('.einstieg-aktion');
        if (!keine || !aktion) return null;
        const kr = keine.getBoundingClientRect(), ar = aktion.getBoundingClientRect();
        return { keineBottom: Math.round(kr.bottom), aktionTop: Math.round(ar.top) };
      });
      const ohneScroll = await p.evaluate(() => Math.round(document.documentElement.scrollHeight - innerHeight));
      const luft = lage && (lage.aktionTop - lage.keineBottom) >= 40;
      if (luft || ohneScroll >= 250) { console.log('  unerwartet: alter Stand hat schon Luft/Scroll-Reserve (G-041): ' + JSON.stringify(lage) + ' ohneScroll=' + ohneScroll); altFunde++; }
      else console.log('  ok (=Fehler im Altstand): "Nichts davon" liegt buendig am Knopf, keine erkennbare Scroll-Reserve: ' + JSON.stringify(lage) + ' ohneScroll=' + ohneScroll);
      await ctx.close();
    }
    // G-044 Gegenprobe
    {
      const { p, ctx } = await seite(b, { width: 390, height: 844 }, { alt: true });
      await klick(p, '[data-action="einstieg-weiter"]');
      await klick(p, '[data-action="einstieg-ziel"]', 300);
      await klick(p, '[data-action="einstieg-weiter"]');
      await klick(p, '[data-action="einstieg-huerde"][data-id="keine"]', 300);
      await klick(p, '[data-action="einstieg-weiter"]');
      await klick(p, '[data-action="einstieg-aufdecken"]');
      await klick(p, '[data-action="einstieg-bewerten"][data-id="Sicher"]');
      await klick(p, '[data-action="einstieg-weiter"]');
      await klick(p, '[data-action="einstieg-weiter"]');
      await klick(p, '[data-action="einstieg-weiter"]');
      await klick(p, '[data-action="einstieg-anker"][data-id="fajr"]', 300);
      await klick(p, '[data-action="einstieg-weiter"]', 8000);
      const treffer = await p.evaluate(() => {
        const el = document.querySelector('.einstieg');
        return el ? (el.innerText.match(/Fajr-Gebet/g) || []).length : 0;
      });
      if (treffer <= 1) { console.log('  unerwartet: alter Stand zeigt "Fajr-Gebet" nicht doppelt (G-044): ' + treffer); altFunde++; }
      else console.log('  ok (=Fehler im Altstand): "Fajr-Gebet" steht ' + treffer + 'x auf dem Plan');
      await ctx.close();
    }
    // G-083 Gegenprobe
    {
      const { p, ctx } = await seite(b, { width: 390, height: 844 }, { alt: true });
      await klick(p, '[data-action="einstieg-weiter"]');
      await klick(p, '[data-action="einstieg-ziel"]', 200);
      await klick(p, '[data-action="einstieg-weiter"]');
      for (const id of ['vergessen','wann','dran','zeit','schrift']) {
        await klick(p, '[data-action="einstieg-huerde"][data-id="' + id + '"]', 120);
      }
      const r = await p.evaluate(() => {
        const k = document.querySelector('[data-action="einstieg-huerde"][data-id="keine"]');
        const a = document.querySelector('.einstieg-aktion');
        if (!k || !a) return null;
        const kr = k.getBoundingClientRect(), ar = a.getBoundingClientRect();
        return { overlap: kr.bottom > ar.top - 1 && kr.top < ar.bottom + 1, scroll: Math.round(document.documentElement.scrollHeight - innerHeight) };
      });
      if (r && !r.overlap && r.scroll >= 250) { console.log('  unerwartet: alter Stand scrollt ohne Ueberdeckung (G-083): ' + JSON.stringify(r)); altFunde++; }
      else console.log('  ok (=Fehler im Altstand): Sticky-Fuss/fehlende Scroll-Logik: ' + JSON.stringify(r));
      await ctx.close();
    }
    console.log('\n' + altFunde + ' unerwartete "schon gut"-Treffer im Altstand (soll 0 sein).');
    funde += altFunde;
  }

  await b.close();
  process.exitCode = funde ? 1 : 0;
})();

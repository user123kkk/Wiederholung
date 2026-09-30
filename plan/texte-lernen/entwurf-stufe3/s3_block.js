/* ---------- 3.18.3: Neu lernen (Stufe 3) ----------
   plan/texte-lernen/KONZEPT.md § 5: Fuer jede neue Zeile drei Hilfestufen -
   lesen, Anfangsbuchstaben, ohne Hilfe -, danach alle heute neu gelernten
   Zeilen dieses Textes am Stueck. Erst "Fliessend" macht die Zeile frisch
   (Stufe 0, morgen faellig, WIEDERHOLEN.md § 2) und zaehlt einmal im
   Tagesprotokoll als "t" (WIEDERHOLEN.md § 7). Abbrechen vorher speichert
   nichts.

   Zustand in ui.textLernen (LEHREN § 6.3), gebunden an das Konto (uid):
     textId, id (die neue Zeile), fokus (die Zeile, die gerade geuebt wird),
     schritt: "lesen" | "buchstaben" | "ohne" | "amStueck" | "hakt" | "gelernt",
     aufgedeckt, aufgedecktAm, denkBis, frei, hakt (Set), nachueben (Ids),
     letzte (fuer Rueckgaengig). */
const DENKPAUSE_JE_WORT_MS = 400, DENKPAUSE_MIN_MS = 1000, DENKPAUSE_MAX_MS = 6000;
const NEU_GUT_FUER_HEUTE = 3;     // T7: danach ein ruhiger Satz, weiterlernen bleibt moeglich
let denkpauseUhr = null;

/* Anfangsbuchstaben (KONZEPT § 8.3): Woerter = Trennung an Leerzeichen. Bei
   Arabisch der erste Grundbuchstabe ohne Harakat, Quran-Zeichen und Tatweel;
   Woerter nur aus solchen Zeichen (Waqf-, Sajda-Zeichen) fallen weg. Sonst
   der erste Buchstabe, Satzzeichen davor und dahinter bleiben. */
const ARAB_OHNE_BUCHSTABE = /[ؐ-ًؚ-ٰٟۖ-ۭـ]/g;
function anfangsbuchstaben(zeile) {
  return String(zeile || "").split(" ").map(w => {
    if (!w) return "";
    if (istArabisch(w)) return w.replace(ARAB_OHNE_BUCHSTABE, "").charAt(0);
    const b = w.match(/[\p{L}\p{N}]/u);
    if (!b) return w;
    const vorn = (w.match(/^\p{P}+/u) || [""])[0], hinten = (w.match(/\p{P}+$/u) || [""])[0];
    return vorn + b[0] + hinten;
  }).filter(Boolean).join(" ");
}
/* Woerter, die man aufsagt - fuer die Denkpause. */
function zeileWoerter(zeile) {
  return String(zeile || "").split(" ").filter(w => w && (!istArabisch(w) || w.replace(ARAB_OHNE_BUCHSTABE, "")));
}
/* WIEDERHOLEN.md § 7: 0,4 s je Wort der verdeckten Zeilen, 1-6 s. */
function denkpauseMs(zeilen) {
  const n = zeilen.reduce((s, z) => s + zeileWoerter(z.wort).length, 0);
  return Math.min(DENKPAUSE_MAX_MS, Math.max(DENKPAUSE_MIN_MS, n * DENKPAUSE_JE_WORT_MS));
}

function textLernenZeile(b, id) { return ((b && b.zeilen) || []).find(z => z.id === id) || null; }
/* Heute neu gelernt = heute zum ersten Mal "fliessend" und deshalb morgen
   faellig. "Kann ich schon" beim Anlegen ist heute faellig und zaehlt nicht
   (das wird wiederholt, nicht neu gelernt). */
function heuteNeuGelernt(z) {
  return z.ersteBewertung === todayStr() && z.stufe === 0 && z.nextReview === dateInDays(1);
}
function naechsteNeueZeile(b, t, nachId) {
  const zeilen = textZeilenVon(b, t);
  const ab = nachId ? zeilen.findIndex(z => z.id === nachId) + 1 : 0;
  return zeilen.slice(ab).find(z => zeilenZustand(z) === "neu") || zeilen.find(z => zeilenZustand(z) === "neu") || null;
}
/* Die Zeilen am Stueck: alle heute neu gelernten dieses Textes bis zur
   aktuellen, in Textreihenfolge, dazu die aktuelle. */
function amStueckZeilen(b, t, tl) {
  const zeilen = textZeilenVon(b, t);
  const bis = zeilen.findIndex(z => z.id === tl.id);
  return zeilen.slice(0, bis + 1).filter(z => z.id === tl.id || heuteNeuGelernt(z));
}

function textLernenStarten(tid) {
  const b = currentBereich(), t = findText(b, tid);
  if (!t || !texteFreigeschaltet()) return;
  const z = naechsteNeueZeile(b, t, null);
  if (!z) { zeigeToast("Alle Zeilen sind gelernt"); render(); return; }
  ui.zeileEdit = null;
  ui.textLernen = { uid: currentUser ? currentUser.uid : null, textId: t.id, id: z.id, fokus: z.id,
    schritt: "lesen", aufgedeckt: false, aufgedecktAm: 0, denkBis: 0, frei: true,
    hakt: new Set(), nachueben: [], letzte: null };
  window.scrollTo(0, 0);
  render();
}
/* Denkpause: "Aufdecken" steht von Anfang an da, nur gedimmt, und wird ohne
   Sprung aktiv (LEHREN § 6.1). Der Timer setzt denselben Zustand, den auch
   ein spaeteres Neuzeichnen liest (§ 6.4). */
function denkpauseStarten(tl, zeilen) {
  if (denkpauseUhr) clearTimeout(denkpauseUhr);
  const ms = denkpauseMs(zeilen);
  tl.denkBis = Date.now() + ms;
  tl.frei = false;
  denkpauseUhr = setTimeout(() => {
    denkpauseUhr = null;
    if (ui.textLernen !== tl) return;
    tl.frei = true;
    const k = document.querySelector('[data-action="text-aufdecken"]');
    if (k) { k.classList.remove("gedimmt"); k.removeAttribute("aria-disabled"); }
  }, ms);
}
function textLernenSchritt(schritt) {
  const tl = ui.textLernen, b = currentBereich(), t = tl && findText(b, tl.textId);
  if (!t) { ui.textLernen = null; render(); return; }
  tl.schritt = schritt;
  tl.aufgedeckt = false;
  if (schritt === "buchstaben" || schritt === "ohne") denkpauseStarten(tl, [textLernenZeile(b, tl.fokus)].filter(Boolean));
  else if (schritt === "amStueck") denkpauseStarten(tl, amStueckZeilen(b, t, tl));
  else tl.frei = true;
  render();
}
function textAufdecken() {
  const tl = ui.textLernen;
  if (!tl || tl.aufgedeckt || !tl.frei || Date.now() < tl.denkBis) return;
  tl.aufgedeckt = true;
  tl.aufgedecktAm = Date.now();
  render();
}
/* Nach dem Aufdecken stehen an derselben Stelle neue Knoepfe - sie nehmen
   erst nach BEWERTEN_SPERRE_MS Tipps an (LEHREN § 6.1, 3.17.25). */
function textBewertenZuFrueh() {
  const tl = ui.textLernen;
  return !tl || !tl.aufgedeckt || Date.now() - tl.aufgedecktAm < BEWERTEN_SPERRE_MS;
}
function textKonnte(ok) {
  const tl = ui.textLernen;
  if (textBewertenZuFrueh()) return;
  if (tl.schritt === "buchstaben") textLernenSchritt(ok ? "ohne" : "lesen");
  else if (tl.schritt === "ohne") {
    if (!ok) { textLernenSchritt("buchstaben"); return; }
    const naechste = tl.nachueben.shift();
    if (naechste) { tl.fokus = naechste; textLernenSchritt("buchstaben"); return; }
    tl.fokus = tl.id;
    textLernenSchritt("amStueck");
  }
}
function textAmStueck(fliessend) {
  const tl = ui.textLernen;
  if (textBewertenZuFrueh() || tl.schritt !== "amStueck") return;
  if (!fliessend) { tl.hakt = new Set(); tl.schritt = "hakt"; render(); return; }
  textGelernt();
}
function textHaktWeiter() {
  const tl = ui.textLernen;
  if (!tl || tl.schritt !== "hakt" || tl.hakt.size === 0) return;
  const b = currentBereich(), t = findText(b, tl.textId);
  const reihe = amStueckZeilen(b, t, tl).map(z => z.id).filter(id => tl.hakt.has(id));
  tl.fokus = reihe.shift();
  tl.nachueben = reihe;
  textLernenSchritt("buchstaben");
}
/* Schritt 5: die Zeile wird frisch. Gespeichert wird nur hier. */
function textGelernt() {
  const tl = ui.textLernen, b = currentBereich(), t = findText(b, tl.textId);
  const z = textLernenZeile(b, tl.id);
  if (!t || !z) { ui.textLernen = null; render(); return; }
  tl.letzte = null;
  if (zeilenZustand(z) === "neu") {
    const vorher = { stufe: z.stufe, nextReview: z.nextReview, ersteBewertung: z.ersteBewertung, maxStufe: z.maxStufe };
    z.stufe = 0; z.nextReview = dateInDays(1); z.ersteBewertung = todayStr(); z.maxStufe = Math.max(0, z.maxStufe || 0);
    const pfad = pfadKarte(b.id, z.id);
    patchDoc({ [pfad + ".stufe"]: z.stufe, [pfad + ".nextReview"]: z.nextReview,
      [pfad + ".ersteBewertung"]: z.ersteBewertung, [pfad + ".maxStufe"]: z.maxStufe });
    verlaufZaehle("t");
    tl.letzte = { id: z.id, vorher: vorher, tag: todayStr() };
  }
  tl.schritt = "gelernt";
  tl.aufgedeckt = false;
  verlaufJetztSchreiben();
  render();
}
/* Schritt 8: Rueckgaengig nach "Fliessend" - die Zeile ist wieder neu, das
   Protokoll des Tages, an dem gelernt wurde, eins weniger. */
function textLernenRueckgaengig() {
  const tl = ui.textLernen;
  if (!tl || !tl.letzte) return;
  const b = currentBereich(), z = textLernenZeile(b, tl.letzte.id);
  if (!z) return;
  const v = tl.letzte.vorher;
  Object.assign(z, v);
  const pfad = pfadKarte(b.id, z.id);
  patchDoc({ [pfad + ".stufe"]: v.stufe, [pfad + ".nextReview"]: v.nextReview,
    [pfad + ".ersteBewertung"]: v.ersteBewertung, [pfad + ".maxStufe"]: v.maxStufe });
  const e = verlauf[tl.letzte.tag];
  if (e && e.t > 0) e.t--;
  verlaufDeltaMerken(tl.letzte.tag, "t", -1);
  verlaufJetztSchreiben();
  tl.letzte = null;
  tl.fokus = tl.id;
  textLernenSchritt("amStueck");
}
function textLernenWeiter() {
  const tl = ui.textLernen, b = currentBereich(), t = tl && findText(b, tl.textId);
  if (!t) { ui.textLernen = null; render(); return; }
  const z = naechsteNeueZeile(b, t, tl.id);
  if (!z) { textLernenEnde(); zeigeToast("Alle Zeilen sind gelernt"); return; }
  Object.assign(tl, { id: z.id, fokus: z.id, hakt: new Set(), nachueben: [], letzte: null });
  textLernenSchritt("lesen");
}
function textLernenEnde() {
  if (denkpauseUhr) { clearTimeout(denkpauseUhr); denkpauseUhr = null; }
  const tl = ui.textLernen;
  ui.textLernen = null;
  if (tl) ui.textAnsicht = tl.textId;
  verlaufJetztSchreiben();
  window.scrollTo(0, 0);
  render();
}

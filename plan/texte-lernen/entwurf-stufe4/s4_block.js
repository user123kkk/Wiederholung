/* ---------- 3.18.5: Wiederholen - Sitzung (Stufe 4) ----------
   WIEDERHOLEN.md § 2-5, § 7. Reihenfolge je Text: zuerst das Kreis-Stueck
   (feste Zeilen), dann die frischen Bloecke. Jede Aufgabe: Hinweiszeilen
   grau, die Zeilen verdeckt, Denkpause, bei etwa jedem zehnten Kreis-
   Abschnitt vorher "Wie geht es weiter?", dann Aufdecken und "Sicher" /
   "Hakt" (Hakt: die hakenden Zeilen antippen). Gespeichert wird je Aufgabe;
   Rueckgaengig nimmt die letzte Aufgabe samt Kreis-Feldern zurueck.

   ui.textWdh = { uid, textId, aufgaben: [{ art: "kreis"|"frisch", zeigen,
   bewerten, hinweis }], nr, aufgedeckt, aufgedecktAm, denkBis, frei,
   frage: null | { richtig, woerter, gewaehlt }, hakt: Set, letzte, erledigt } */

function wdhAufgabenBauen(b, t) {
  const zeilen = textZeilenVon(b, t);
  const heute = todayStr();
  const arbeit = textHeuteArbeit(zeilen, t, heute);
  const id = i => zeilen[i].id;
  const aufgaben = [];
  for (const a of arbeit.kreis) {
    const von = a[0];
    aufgaben.push({ art: "kreis", zeigen: a.map(id), bewerten: a.map(id),
      hinweis: [von - 2, von - 1].filter(i => i >= 0).map(id) });
  }
  for (const bl of arbeit.bloecke) {
    aufgaben.push({ art: "frisch", zeigen: bl.zeigen.map(id), bewerten: bl.frisch.map(id), hinweis: bl.hinweis.map(id) });
  }
  return aufgaben;
}
function textWiederholenStarten(tid) {
  const b = currentBereich(), t = findText(b, tid);
  if (!t || !texteFreigeschaltet()) return;
  const aufgaben = wdhAufgabenBauen(b, t);
  if (!aufgaben.length) { zeigeToast("Heute nichts zu wiederholen"); render(); return; }
  ui.zeileEdit = null;
  ui.textWdh = { uid: currentUser ? currentUser.uid : null, textId: t.id, aufgaben: aufgaben, nr: 0,
    aufgedeckt: false, aufgedecktAm: 0, denkBis: 0, frei: true, frage: null, hakt: new Set(), letzte: null, erledigt: 0 };
  wdhAufgabeBeginnen();
  window.scrollTo(0, 0);
  render();
}
function wdhAufgabe() { const w = ui.textWdh; return w && w.aufgaben[w.nr]; }
function wdhAufgabeBeginnen() {
  const w = ui.textWdh, a = wdhAufgabe();
  if (!a) return;
  const b = currentBereich(), t = findText(b, w.textId);
  const zeilen = textZeilenVon(b, t);
  w.aufgedeckt = false;
  w.hakt = new Set();
  w.frage = null;
  if (a.art === "kreis" && kontrollfrageFaellig(a.zeigen[0], todayStr())) {
    const k = kontrollWoerter(zeilen, textLernenZeile(b, a.zeigen[0]), todayStr());
    if (k) w.frage = { richtig: k.richtig, woerter: k.woerter, gewaehlt: null };
  }
  denkpauseStarten(w, a.zeigen.map(id => textLernenZeile(b, id)).filter(Boolean));
}
/* Kontrollfrage: falsch -> die erste Zeile zaehlt als gehakt. Kein Timer,
   kein Punktestand (WIEDERHOLEN.md § 7). */
function wdhFrageWaehlen(wort) {
  const w = ui.textWdh, a = wdhAufgabe();
  if (!w || !w.frage || w.frage.gewaehlt !== null) return;
  w.frage.gewaehlt = wort;
  if (wort !== w.frage.richtig) w.hakt.add(a.zeigen[0]);
  render();
}
function wdhAufdecken() {
  const w = ui.textWdh;
  if (!w || w.aufgedeckt || !w.frei || Date.now() < w.denkBis) return;
  if (w.frage && w.frage.gewaehlt === null) return;
  w.aufgedeckt = true;
  w.aufgedecktAm = Date.now();
  render();
}
function wdhZuFrueh() {
  const w = ui.textWdh;
  return !w || !w.aufgedeckt || Date.now() - w.aufgedecktAm < BEWERTEN_SPERRE_MS;
}
/* "Sicher": alle bewerteten Zeilen sicher - ausser denen, die die
   Kontrollfrage schon als gehakt markiert hat. "Hakt": auswaehlen. */
function wdhAntwort(sicher) {
  const w = ui.textWdh, a = wdhAufgabe();
  if (wdhZuFrueh() || !a || w.schritt === "hakt") return;
  if (!sicher) {
    if (a.bewerten.length === 1) { w.hakt.add(a.bewerten[0]); wdhSpeichern(); return; }
    w.schritt = "hakt"; render(); return;
  }
  wdhSpeichern();
}
function wdhHaktWeiter() {
  const w = ui.textWdh;
  if (!w || w.schritt !== "hakt" || w.hakt.size === 0) return;
  w.schritt = null;
  wdhSpeichern();
}
function wdhSpeichern() {
  const w = ui.textWdh, a = wdhAufgabe();
  const b = currentBereich(), t = findText(b, w.textId);
  if (!a || !t) { textWdhEnde(); return; }
  const heute = todayStr(), morgen = dateInDays(1);
  const patch = {};
  const vorherZeilen = [];
  const vorherText = { kreisPos: t.kreisPos, kreisTag: t.kreisTag, kreisTage: t.kreisTage, portion: t.portion, festErgebnisse: t.festErgebnisse };
  let ergebnisse = t.festErgebnisse || "";
  for (const id of a.bewerten) {
    const z = textLernenZeile(b, id);
    if (!z) continue;
    const sicher = !w.hakt.has(id);
    if (a.art === "kreis") ergebnisse = (ergebnisse + (sicher ? "1" : "0")).slice(-FEST_ERGEBNISSE_MAX);
    const neu = zeileNachAntwort(z, sicher, heute, morgen);
    if (neu) {
      vorherZeilen.push({ id: z.id, felder: { stufe: z.stufe, nextReview: z.nextReview, rueckfaelle: z.rueckfaelle, maxStufe: z.maxStufe } });
      Object.assign(z, neu);
      const pfad = pfadKarte(b.id, z.id);
      for (const [f, v] of Object.entries(neu)) patch[pfad + "." + f] = v;
    }
    verlaufZaehle("t");
  }
  const zeilen = textZeilenVon(b, t);
  const sp = f => pfadSet(b.id, t.id) + "." + f;
  if (a.art === "kreis") {
    const letzterIndex = zeilen.findIndex(z => z.id === a.bewerten[a.bewerten.length - 1]);
    const weiter = kreisWeiter(zeilen, [letzterIndex]);
    const fest = zeilen.filter(z => zeilenZustand(z) === "fest").length;
    const voll = kreisGroesse(fest + a.bewerten.filter(id => w.hakt.has(id)).length, t.kreisTage);
    const bisher = t.kreisTag === heute ? (Number.isInteger(t.portion) ? t.portion : 0) : voll;
    t.portion = Math.max(0, bisher - a.bewerten.length);
    t.kreisTag = heute;
    t.festErgebnisse = ergebnisse;
    t.kreisPos = weiter.pos;
    if (weiter.umlauf) t.kreisTage = kreisNachstellen(t.kreisTage, ergebnisse);
    Object.assign(patch, { [sp("kreisPos")]: t.kreisPos, [sp("kreisTag")]: t.kreisTag, [sp("portion")]: t.portion,
      [sp("festErgebnisse")]: t.festErgebnisse, [sp("kreisTage")]: t.kreisTage });
  } else if (!t.kreisPos) {
    /* Die erste feste Zeile eines Textes setzt den Kreis an (§ 3). */
    const erste = zeilen.find(z => zeilenZustand(z) === "fest");
    if (erste) { t.kreisPos = erste.id; patch[sp("kreisPos")] = t.kreisPos; }
  }
  patchDoc(patch);
  w.letzte = { nr: w.nr, zeilen: vorherZeilen, text: vorherText, tag: heute, anzahl: a.bewerten.length };
  w.erledigt++;
  w.nr++;
  if (w.nr < w.aufgaben.length) wdhAufgabeBeginnen();
  verlaufSpeichernBald();
  render();
}
function wdhRueckgaengig() {
  const w = ui.textWdh;
  if (!w || !w.letzte) return;
  const b = currentBereich(), t = findText(b, w.textId);
  if (!t) return;
  const l = w.letzte, patch = {};
  for (const x of l.zeilen) {
    const z = textLernenZeile(b, x.id);
    if (!z) continue;
    Object.assign(z, x.felder);
    for (const [f, v] of Object.entries(x.felder)) patch[pfadKarte(b.id, z.id) + "." + f] = v;
  }
  for (const [f, v] of Object.entries(l.text)) {
    t[f] = v;
    patch[pfadSet(b.id, t.id) + "." + f] = v === undefined ? null : v;
  }
  patchDoc(patch);
  const e = verlauf[l.tag];
  if (e && e.t) e.t = Math.max(0, e.t - l.anzahl);
  verlaufDeltaMerken(l.tag, "t", -l.anzahl);
  verlaufJetztSchreiben();
  w.nr = l.nr;
  w.erledigt = Math.max(0, w.erledigt - 1);
  w.letzte = null;
  w.schritt = null;
  wdhAufgabeBeginnen();
  render();
}
function textWdhEnde() {
  if (denkpauseUhr) { clearTimeout(denkpauseUhr); denkpauseUhr = null; }
  const w = ui.textWdh;
  ui.textWdh = null;
  if (w) ui.textAnsicht = w.textId;
  verlaufJetztSchreiben();
  window.scrollTo(0, 0);
  render();
}

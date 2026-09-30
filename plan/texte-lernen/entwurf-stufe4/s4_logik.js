/* ---------- 3.18.5: Wiederholen - Rechenlogik (Stufe 4) ----------
   plan/texte-lernen/WIEDERHOLEN.md § 1-5. Reine Funktionen ohne Oberflaeche
   und ohne Speichern, damit t_text_kreis/t_text_nachbarn/t_text_zustaende
   sie einzeln pruefen koennen.

   Zeilen kommen immer in Textreihenfolge (textZeilenVon). Zustaende:
   neu (ersteBewertung null), frisch (Stufe 0-6), fest (Stufe 7). */
const ABSCHNITT_MAX = 5;            // § 4: bis zu 5 Zeilen am Stueck
const ABSCHNITT_LANG = 200;         // § 4: eine laengere Zeile steht allein
const NACHSTELLEN_MIN_ANTWORTEN = 20;
const TAGESZEIT_HALTEN_S = 20 * 60; // § 5: ueber 20 Minuten -> heute halten

/* § 2: faellig ist eine frische Zeile, deren Tag gekommen ist. Feste Zeilen
   entscheidet der Kreis, nicht nextReview. */
function zeileFrischFaellig(z, heute) {
  return zeilenZustand(z) === "frisch" && z.nextReview <= heute;
}

/* § 4: Abschnitte aus aufeinanderfolgenden Zeilen einer Liste von Indizes
   (in Textreihenfolge). Eine Luecke im Text beendet den Abschnitt. */
function abschnitteBilden(zeilen, indizes) {
  const out = [];
  let akt = [];
  for (const i of indizes) {
    const lang = zeilen[i].wort.length > ABSCHNITT_LANG;
    const luecke = akt.length && i !== akt[akt.length - 1] + 1;
    if (akt.length && (luecke || lang || akt.length >= ABSCHNITT_MAX || zeilen[akt[0]].wort.length > ABSCHNITT_LANG)) {
      out.push(akt); akt = [];
    }
    akt.push(i);
  }
  if (akt.length) out.push(akt);
  return out;
}

/* § 3: das heutige Kreis-Stueck. Ab kreisPos die naechsten ceil(fest/kreisTage)
   festen Zeilen (an diesem Tag schon erledigte abgezogen: portion), am
   Textende weiter am Anfang, aufgerundet auf ganze Abschnitte.
   Ergebnis: Liste von Abschnitten (Listen von Indizes). */
function kreisGroesse(anzahlFest, kreisTage) {
  return anzahlFest ? Math.ceil(anzahlFest / Math.max(1, kreisTage)) : 0;
}
function kreisRestHeute(t, anzahlFest, heute) {
  const voll = kreisGroesse(anzahlFest, t.kreisTage);
  return t.kreisTag === heute ? Math.max(0, Number.isInteger(t.portion) ? t.portion : 0) : voll;
}
function kreisStueck(zeilen, t, heute) {
  const fest = [];
  zeilen.forEach((z, i) => { if (zeilenZustand(z) === "fest") fest.push(i); });
  if (!fest.length) return [];
  let rest = kreisRestHeute(t, fest.length, heute);
  if (rest <= 0) return [];
  let start = fest.findIndex(i => zeilen[i].id === t.kreisPos);
  if (start === -1) start = 0;
  /* Der Reihe nach ab start, hoechstens einmal rundherum. */
  const reihe = [];
  for (let k = 0; k < fest.length; k++) reihe.push(fest[(start + k) % fest.length]);
  /* Am Textende beginnt ein neuer Abschnitt (reihe springt zurueck). */
  const teile = [];
  let lauf = [];
  for (const i of reihe) { if (lauf.length && i < lauf[lauf.length - 1]) { teile.push(lauf); lauf = []; } lauf.push(i); }
  if (lauf.length) teile.push(lauf);
  const abschnitte = teile.flatMap(teil => abschnitteBilden(zeilen, teil));
  const out = [];
  for (const a of abschnitte) {
    if (rest <= 0) break;
    out.push(a);
    rest -= a.length;
  }
  return out;
}
/* Nach einem erledigten Abschnitt: die naechste feste Zeile hinter ihm (am
   Ende die erste). Ueberlaeuft der Kreis das Textende, meldet umlauf = true. */
function kreisWeiter(zeilen, abschnitt) {
  const letzte = abschnitt[abschnitt.length - 1];
  const fest = [];
  zeilen.forEach((z, i) => { if (zeilenZustand(z) === "fest") fest.push(i); });
  const danach = fest.find(i => i > letzte);
  if (danach !== undefined) return { pos: zeilen[danach].id, umlauf: false };
  return { pos: fest.length ? zeilen[fest[0]].id : null, umlauf: true };
}
/* § 3 Nachstellen, jedes Mal wenn der Kreis ueber das Textende laeuft. */
function kreisNachstellen(kreisTage, ergebnisse) {
  const e = String(ergebnisse || "");
  if (e.length < NACHSTELLEN_MIN_ANTWORTEN) return kreisTage;
  const anteil = e.split("").filter(x => x === "1").length / e.length;
  if (anteil < 0.85) return Math.max(KREIS_TAGE_MIN, Math.floor(kreisTage * 0.75));
  if (anteil > 0.95) return Math.min(KREIS_TAGE_MAX, Math.ceil(kreisTage * 1.25));
  return kreisTage;
}

/* § 4: Bloecke fuer frische Zeilen. Eine frische Zeile i wird mit ihren
   Nachbarn i-1 und i+1 aufgesagt (nur gelernte, nie neue), darueber grau die
   zwei Zeilen vor dem Block. Liegen frische Zeilen nah (Abstand <= 2),
   werden ihre Bloecke zusammengelegt. Bewertet werden nur die frischen. */
function frischBloecke(zeilen, heute) {
  const gelernt = i => i >= 0 && i < zeilen.length && zeilenZustand(zeilen[i]) !== "neu";
  const faellig = [];
  zeilen.forEach((z, i) => { if (zeileFrischFaellig(z, heute)) faellig.push(i); });
  const bloecke = [];
  for (const i of faellig) {
    const letzter = bloecke[bloecke.length - 1];
    if (letzter && i - letzter.frisch[letzter.frisch.length - 1] <= 2) letzter.frisch.push(i);
    else bloecke.push({ frisch: [i] });
  }
  return bloecke.map(b => {
    const von = gelernt(b.frisch[0] - 1) ? b.frisch[0] - 1 : b.frisch[0];
    const bis = gelernt(b.frisch[b.frisch.length - 1] + 1) ? b.frisch[b.frisch.length - 1] + 1 : b.frisch[b.frisch.length - 1];
    const zeigen = [];
    for (let i = von; i <= bis; i++) zeigen.push(i);
    const hinweis = [von - 2, von - 1].filter(i => i >= 0);
    return { zeigen: zeigen, frisch: b.frisch, hinweis: hinweis };
  });
}

/* § 2: Uebergaenge. Gibt die neuen Felder zurueck (nichts wird veraendert). */
function zeileNachAntwort(z, sicher, heute, morgen) {
  const zustand = zeilenZustand(z);
  if (zustand === "fest") {
    if (sicher) return null;                                   // bleibt fest
    return { stufe: 0, nextReview: morgen, rueckfaelle: (z.rueckfaelle || 0) + 1, maxStufe: z.maxStufe || 0 };
  }
  if (!sicher) return { stufe: 0, nextReview: morgen, rueckfaelle: z.rueckfaelle || 0, maxStufe: z.maxStufe || 0 };
  const k = Math.min(TEXT_FEST_STUFE, (z.stufe || 0) + 1);
  return { stufe: k, nextReview: k >= TEXT_FEST_STUFE ? TEXT_FEST_DATUM : morgen,
    rueckfaelle: z.rueckfaelle || 0, maxStufe: Math.max(z.maxStufe || 0, k) };
}

/* § 5: geschaetzte Zeit: 10 s je Zeile plus 1 s je 10 Zeichen. */
function zeileSekunden(z) { return 10 + Math.ceil(z.wort.length / 10); }
function textHeuteArbeit(zeilen, t, heute) {
  const kreis = kreisStueck(zeilen, t, heute);
  const bloecke = frischBloecke(zeilen, heute);
  let s = 0;
  for (const a of kreis) for (const i of a) s += zeileSekunden(zeilen[i]);
  for (const b of bloecke) for (const i of b.zeigen) s += zeileSekunden(zeilen[i]);
  return { kreis: kreis, bloecke: bloecke, sekunden: s };
}

/* § 7: Kontrollfrage - drei Woerter aus demselben Text, das richtige ist das
   erste Wort der ersten verdeckten Zeile. Die zwei anderen: aehnliche Laenge,
   nach vergleichsWort verschieden. Weniger als 3 verschiedene -> keine Frage.
   Welche Abschnitte gefragt werden: etwa jeder zehnte, fest aus Position
   und Tag (so bleibt die Frage beim Neuzeichnen dieselbe). */
function kontrollfrageFaellig(posId, heute) {
  let h = 0;
  const s = String(posId) + "|" + heute;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 10 === 0;
}
function kontrollWoerter(zeilen, richtigeZeile, heute) {
  const erstes = w => zeileWoerter(w)[0] || "";
  const richtig = erstes(richtigeZeile.wort);
  if (!richtig) return null;
  const schon = new Set([vergleichsWort(richtig)]);
  const kandidaten = [];
  for (const z of zeilen) for (const w of zeileWoerter(z.wort)) {
    const v = vergleichsWort(w);
    if (!v || schon.has(v)) continue;
    schon.add(v);
    kandidaten.push(w);
  }
  if (kandidaten.length < 2) return null;
  kandidaten.sort((a, b) => Math.abs(a.length - richtig.length) - Math.abs(b.length - richtig.length) || (a < b ? -1 : 1));
  const falsch = kandidaten.slice(0, 2);
  /* Reihenfolge fest aus Tag und Wort, damit die richtige nicht immer vorn steht. */
  const alle = [richtig].concat(falsch);
  let h = 0;
  for (const c of heute + richtig) h = (h * 33 + c.charCodeAt(0)) >>> 0;
  const r = h % 3;
  return { richtig: richtig, woerter: alle.slice(r).concat(alle.slice(0, r)) };
}

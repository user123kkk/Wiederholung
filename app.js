"use strict";

/* ============================================================
   FIREBASE-KONFIGURATION
   Diese Werte kommen aus der Firebase-Konsole:
   Projekteinstellungen → Allgemein → "Meine Apps" → Web-App → SDK-Konfiguration
   ============================================================ */
const firebaseConfig = {
  apiKey: "AIzaSyAHP4a_UBPQ_22QnRSlXbnDLsRL-IRO9XU",
  authDomain: "lernkarte-925c2.firebaseapp.com",
  projectId: "lernkarte-925c2",
  storageBucket: "lernkarte-925c2.firebasestorage.app",
  messagingSenderId: "712373953233",
  appId: "1:712373953233:web:d0f761786fc345b4b69bf0"
};

/* Versionsnummer: bei jeder Veroeffentlichung hochzaehlen und denselben Wert
   als CACHE_NAME in sw.js eintragen, damit alte Dateien verworfen werden. */
const APP_VERSION = "3.6.7";

const CONFIGURED = firebaseConfig.apiKey !== "HIER_EINFUEGEN";
/* Apple-Anmeldung (offene Frage 13) braucht ausser dem Code noch ein
   Apple-Developer-Konto (99$/Jahr) und die Einrichtung in der
   Firebase-Konsole - beides steht auf Betreiber-Wunsch noch aus (18.09.2026).
   Bis dahin bleibt der Knopf ausgeblendet statt auf eine Fehlermeldung zu
   fuehren, die niemand einordnen kann. Google ist bereits eingerichtet und
   bleibt an. Auf true stellen, sobald Apple in der Firebase-Konsole aktiv ist. */
const APPLE_LOGIN_BEREIT = false;
const app = document.getElementById("app");

/* ---------- Wer darf Kartensätze weitergeben? ----------
   Bis 3.5.1 war "Backup zum Weitergeben" an eine feste Nutzernummer (den
   Betreiber) gebunden - aus Sorge vor zwei Dingen: aus Versehen geteilte
   halbfertige Saetze, und Kennungs-Kollisionen, wenn mehrere Leute
   denselben satzId exportieren.

   Seit 3.5.2 offen fuer jeden (Betreiber-Entscheidung 18.09.2026): beide
   Sorgen sind separat abgedeckt, nicht durch diese Sperre. Versehentliches
   Teilen faengt der Bestaetigungsdialog in exportWeitergabe() ab, der genau
   zeigt, was rausgeht, bevor die Datei entsteht. Kennungs-Kollisionen
   verhindert exportWeitergabe() selbst: ein geführter (importierter)
   Bereich laesst sich gar nicht weitergeben (siehe istGefuehrt-Pruefung
   dort) - nur ein frisch selbst angelegter Bereich, der beim ersten Export
   eine neue, zufaellige Kennung bekommt.

   Moeglicher spaeterer Bezahl-Baustein (siehe plan/monetarisierung/
   GERUEST.md): wird erst gebaut, wenn der Betreiber diesen Strang
   startet - heute kostenlos fuer alle. */
function istAutor() { return true; }

/* ---------- XSS-Schutz ---------- */
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/* ---------- Datum & Intervall ---------- */
function fmtDate(d) {
  return d.getFullYear() + "-" +
    String(d.getMonth() + 1).padStart(2, "0") + "-" +
    String(d.getDate()).padStart(2, "0");
}
/* B5: Der Lerntag beginnt um 4 Uhr morgens, nicht um Mitternacht. Wer nach
   ʿIshāʾ um 00:30 noch lernt, ist gefuehlt am selben Tag - technisch waere es
   schon der naechste: die Streak risse und die Karten wuerden einen Tag zu weit
   geplant. Anki legt die Tagesgrenze aus demselben Grund auf 4 Uhr.
   Wichtig: JEDE Datumsrechnung der App geht ueber logicalToday(), sonst
   widersprechen sich "heute faellig" und "in n Tagen" zwischen 0 und 4 Uhr. */
const DAY_START_HOUR = 4;
function logicalToday() {
  const d = new Date();
  if (d.getHours() < DAY_START_HOUR) d.setDate(d.getDate() - 1);
  return d;
}
function todayStr() { return fmtDate(logicalToday()); }
function dateInDays(n) {
  const d = logicalToday();
  d.setDate(d.getDate() + n);
  return fmtDate(d);
}
/* Hoechste erlaubte Stufe. Ohne Deckel ueberschreitet die Intervallformel
   irgendwann den gueltigen Datumsbereich von JavaScript: nextReview wird dann
   "NaN-NaN-NaN" und die Karte gilt nie wieder als faellig - sie verschwindet
   stillschweigend. */
const MAX_STUFE = 12;
/* B1: Intervall mit Deckel. Frueher 2^(stufe-1) - das ergab ab Stufe 10 mehr als
   ein Jahr Pause, die Karte war praktisch aus dem Leben verschwunden. Fuer
   fluechtige Vokabeln geht das, fuer Grammatik und Quran-Inhalte, die man
   BEHALTEN will, nicht. Mit Faktor 1,8 und Deckel bei 180 Tagen kommt jede Karte
   mindestens zweimal im Jahr wieder:
   Stufe 1→1, 2→2, 3→3, 4→6, 5→10, 6→19, 7→34, 8→61, 9→110, ab 10→180 Tage. */
const MAX_INTERVAL_DAYS = 180;
function intervalForStufe(stufe) {
  const s = Math.min(Math.max(stufe, 1), MAX_STUFE);
  return Math.min(MAX_INTERVAL_DAYS, Math.round(Math.pow(1.8, s - 1)));
}
/* B4: Jitter. Ohne ihn kommen alle Karten, die an einem Tag gelernt wurden, fuer
   immer am selben Tag zurueck - 200er-Tage wechseln sich mit 0er-Tagen ab.
   ±15 % streuen den Stapel auseinander, ohne den Rhythmus zu zerstoeren.
   Nur beim Bewerten verwendet; beim manuellen Setzen einer Stufe im Formular
   gilt bewusst das glatte Intervall, damit die Beschriftung dort stimmt. */
function nextReviewForStufe(stufe) {
  const tage = intervalForStufe(stufe);
  const jitter = Math.round(tage * (Math.random() * 0.3 - 0.15));
  /* Der Deckel bleibt hart: sonst haette die oberste Stufe mit Streuung
     wieder bis zu 207 Tage und die Zusage "spaetestens nach einem halben
     Jahr" waere nicht mehr wahr. Nach oben wird also gekappt, nach unten
     streut es weiter. */
  return dateInDays(Math.min(MAX_INTERVAL_DAYS, Math.max(1, tage + jitter)));
}
function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/* ---------- Obergrenzen fuer selbst eingegebenen Text ----------
   Bis 3.0.3 hatten Wort, Uebersetzung und Notiz KEINE Grenze: normCard machte
   nur String(...) daraus. Eine Karte mit einem halben Megabyte Text war damit
   moeglich - nicht boesartig gedacht, aber sie laedt bei jedem Start mit,
   zaehlt gegen die 1-MiB-Grenze eines Firestore-Dokuments und macht die Liste
   unbenutzbar.

   Die Zahlen sind bewusst weit: Eine Vokabel ist ein Wort oder ein Satz, kein
   Absatz; 1000 Zeichen fasst auch einen langen Beispielsatz, und die Notiz
   nimmt mit 5000 Zeichen jeden Merksatz auf. Wer unter der Grenze bleibt -
   also jeder normale Gebrauch -, merkt nichts davon.

   Dieselben Zahlen stehen noch einmal in firestore.rules. Sie MUESSEN dort
   stehen: Was hier geprueft wird, prueft der Browser - und der gehoert dem
   Nutzer. Wird hier etwas geaendert, dort mitaendern. */
const MAX_WORT = 1000;     // wort und uebersetzung
const MAX_EXTRA = 5000;    // Beispielsatz, Bild-Link oder Notiz
function kuerze(s, max) { return String(s === undefined || s === null ? "" : s).slice(0, max); }

/* ---------- Obergrenzen fuer den Import ----------
   Der JSON-Import ist der einzige Dateiupload der App. Bis 3.0.3 wurde die
   Datei ohne jede Vorpruefung eingelesen: readAsText nahm sie in beliebiger
   Groesse, und was danach an Bereichen und Karten herauskam, ging ungezaehlt
   in die Cloud. Eine Datei musste dafuer nicht einmal boesartig sein - eine
   versehentlich doppelt zusammengefuegte Sicherung reicht.

   Geprueft wird in dieser Reihenfolge, jeweils BEVOR etwas geschrieben wird:
   erst die Dateigroesse (ohne die Datei zu lesen), dann die Struktur, dann
   die Anzahl. Die Zahlen sind so gewaehlt, dass eine echte Sicherung
   durchgeht: Der groesste denkbare Kartensatz hier hat einige tausend
   Karten, und 20.000 Karten als JSON bleiben deutlich unter 5 MB. */
const IMPORT_MAX_BYTES = 5 * 1024 * 1024;
const IMPORT_MAX_BEREICHE = 200;
const IMPORT_MAX_KARTEN = 20000;
/* Speicherkarten je Bereich. Dieselbe Zahl steht in firestore.rules - ohne
   sie hier wuerde die Regel eine Datei abweisen, die die App vorher
   klaglos angenommen hat, und der Nutzer saehe nur "Speichern fehlgeschlagen". */
const MAX_SETS = 500;
function shuffled(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------- Datenvalidierung ---------- */
/* B3: Damit ein Tageslimit fuer NEUE Karten ueberhaupt moeglich ist, muss "neu"
   von "vergessen" unterscheidbar sein. Beides steht sonst auf Stufe 0.
   ersteBewertung = null heisst: diese Karte wurde noch nie bewertet.
   Fuer Karten aus der Zeit vor 1.6.0 gibt es das Feld nicht. Regel dafuer:
   Stufe > 0 → wurde offensichtlich schon einmal bewertet, Datum aber unbekannt →
   Platzhalter. Stufe 0 → gilt als neu und laeuft einmalig durch das Tageslimit.
   Das ist gewollt: sonst braechte das Limit beim ersten grossen Import nichts. */
const LEGACY_FIRST_GRADE = "1970-01-01"; // "schon bewertet, Datum unbekannt"
/* E6: Ab wie vielen Rueckfaellen gilt eine Karte als "verbrannt"? Anki nennt
   solche Karten leeches. Wenige davon fressen sonst einen Grossteil der
   Lernzeit, ohne je zu sitzen - meist liegt es an der Karte selbst
   (zu viel auf einmal, unklare Uebersetzung), nicht am Gedaechtnis. */
const LEECH_SCHWELLE = 5;
function normCard(c) {
  const stufe = Number.isInteger(c.stufe) && c.stufe >= 0 ? c.stufe : 0;
  let erste = null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(c.ersteBewertung)) erste = c.ersteBewertung;
  else if (c.ersteBewertung === undefined && stufe > 0) erste = LEGACY_FIRST_GRADE;
  return {
    id: typeof c.id === "string" && c.id ? c.id : genId(),
    wort: kuerze(c.wort, MAX_WORT),
    uebersetzung: kuerze(c.uebersetzung, MAX_WORT),
    extra: typeof c.extra === "string" ? c.extra.slice(0, MAX_EXTRA) : "",
    stufe: stufe,
    nextReview: /^\d{4}-\d{2}-\d{2}$/.test(c.nextReview) ? c.nextReview : todayStr(),
    ersteBewertung: erste,
    /* E6: Karten von vor 1.7.0 haben das Feld nicht - sie starten bei 0.
       Rueckwirkend laesst es sich nicht rekonstruieren, die Zaehlung beginnt
       also mit dem Einbau. */
    rueckfaelle: Number.isInteger(c.rueckfaelle) && c.rueckfaelle >= 0 ? c.rueckfaelle : 0,
    /* 2.3.0: Herkunfts-Nummer. Bei einem weitergegebenen Kartensatz bleibt sie
       ueber alle Veroeffentlichungen hinweg dieselbe. Beim Import bekommt jede
       Karte eine neue id (sonst ueberschreibt sie vorhandene Karten, siehe
       2.2.0) - an der quelleId erkennt ein spaeteres Update trotzdem wieder,
       welche Karte im Konto schon da ist. Eigene Karten haben keine. */
    quelleId: typeof c.quelleId === "string" && c.quelleId ? c.quelleId : null,
    /* 2.7.0: hoechste je erreichte Stufe. Sie faellt nie, auch wenn die
       aktuelle Stufe faellt - genau darum haengt das Freischalten der
       naechsten Lektion daran und nicht an stufe. Wer bei einer alten Karte
       ehrlich "Nicht" drueckt, soll damit keine Lektion wieder zusperren.
       Fuer Karten aus der Zeit davor gilt die aktuelle Stufe als Hoechststand. */
    maxStufe: Math.max(
      Number.isInteger(c.maxStufe) && c.maxStufe >= 0 ? Math.min(c.maxStufe, MAX_STUFE) : 0,
      Number.isInteger(c.stufe) && c.stufe >= 0 ? Math.min(c.stufe, MAX_STUFE) : 0
    )
  };
}
function istNeueKarte(c) { return !c.ersteBewertung; }

/* ---------- 2.15.1: nicht alles ist Arabisch ----------
   Die Vorderseite einer Karte wurde immer in der Quran-Schrift und von rechts
   nach links gesetzt. Das ist richtig fuer arabische Vokabeln - und falsch
   fuer jeden anderen Bereich: In "Biologie 11" oder einem Franzoesisch-Satz
   rutschte der Punkt ans falsche Ende und die Schrift passte nicht.

   Statt einer Einstellung, die jemand pflegen muesste, entscheidet der Text
   selbst: Steht ein arabischer Buchstabe darin, wird arabisch gesetzt, sonst
   normal. Das gilt rueckwirkend fuer jeden vorhandenen Bereich, ohne dass
   irgendwo etwas eingetragen werden muss. */
const ARAB_ZEICHEN = /[\u0600-\u06FF\u0750-\u077F]/;
function istArabisch(text) { return ARAB_ZEICHEN.test(String(text || "")); }
/* Liefert die Attribute fuer ein Textelement - leer, wenn es kein Arabisch ist. */
function schriftAttr(text) {
  return istArabisch(text) ? ' class="arabic" lang="ar" dir="rtl"' : "";
}
function istVerbrannt(c) { return (c.rueckfaelle || 0) >= LEECH_SCHWELLE; }

/* ---------- 2.3.0: gefuehrte Kartensaetze und das Schloss ----------
   Ein "gefuehrter Bereich" ist ein Kartensatz, den jemand anders
   zusammengestellt und weitergegeben hat. Zwei Dinge gelten dort:

     1. Die Karten sind schreibgeschuetzt - nichts hinzufuegen, aendern,
        loeschen oder umsortieren. Nur so steht der Stoff bei allen in
        derselben Reihenfolge, und nur so kann ein spaeteres Update sauber
        nachziehen, ohne etwas durcheinanderzubringen.
     2. Gelernt wird nur, was freigeschaltet ist.

   Die Freigabe-Regel lautet:
     Eine Karte ist frei, wenn sie in mindestens einer NICHT gesperrten
     Lektion liegt.

   Kategorien und eigene Speicherkarten geben nie frei, sie zeigen nur an -
   sonst waere ueber "Nomen" mit seinen 96 Karten sofort fast alles offen.
   Weil die Regel so herum steht, darf eine Karte in beliebig vielen
   Kategorien liegen, ohne dass es die Freigabe stoert; und laege sie in zwei
   Lektionen, waere sie frei, sobald die fruehere davon offen ist.

   In einem eigenen Bereich gibt es nichts davon: dort ist alles frei und
   alles bearbeitbar, genau wie vor 2.3.0. */
function istGefuehrt(b) { return !!(b && b.gefuehrt); }

/* ---------- 2.7.0: Das Schloss wird berechnet, nicht gespeichert ----------
   Bis 2.6.0 stand an jeder Lektion ein gespeichertes "gesperrt", das man von
   Hand auf- und zumachte. Damit gab es einen Zustand, der mit der
   Wirklichkeit auseinanderlaufen konnte, und eine Entscheidung, die niemand
   treffen will.

   Jetzt gilt schlicht:
       Lektion 1 ist offen.
       Lektion N ist offen, sobald Lektion N-1 sitzt.

   Und "sitzt" heisst: jede ihrer Karten war SCHON EINMAL auf Stufe 2
   (maxStufe), nicht: steht gerade darauf. Das ist der entscheidende Punkt -
   so kann eine einmal geoeffnete Lektion nie wieder zugehen. Wer bei einer
   alten Karte ehrlich "Nicht" drueckt, verliert nichts.

   Ausnahme: eine verbrannte Karte (fuenf Rueckfaelle) haelt nichts auf. Wer
   ein Wort fuenfmal verhauen hat, soll deswegen nicht wochenlang feststecken -
   das ist der Moment, in dem man eine App zumacht. */
function karteZaehltFuerLektion(c) {
  return (c.maxStufe || 0) < LEKTION_STUFE && !istVerbrannt(c);
}
function lektionOffeneKarten(b, set) {
  const byId = new Map(b.karten.map(c => [c.id, c]));
  return set.cardIds.map(id => byId.get(id)).filter(c => c && karteZaehltFuerLektion(c));
}
function lektionSitzt(b, set) { return lektionOffeneKarten(b, set).length === 0; }
/* Die Nummern der offenen Lektionen. Sobald eine nicht sitzt, ist Schluss -
   die Reihenfolge der Liste ist der Weg. */
function offeneLektionIds(b) {
  const lek = lektionenVon(b);
  const offen = new Set();
  for (let i = 0; i < lek.length; i++) {
    if (i > 0 && !lektionSitzt(b, lek[i - 1])) break;
    offen.add(lek[i].id);
  }
  return offen;
}
function setGesperrt(s, b) {
  b = b || currentBereich();
  if (!istGefuehrt(b) || s.art !== "lektion") return false;
  return !offeneLektionIds(b).has(s.id);
}
/* Die Lektion, an der man gerade steht: die letzte offene. */
function aktuelleLektion(b) {
  const offen = offeneLektionIds(b);
  const lek = lektionenVon(b).filter(s => offen.has(s.id));
  return lek.length ? lek[lek.length - 1] : null;
}
function naechsteLektion(b) {
  const offen = offeneLektionIds(b);
  return lektionenVon(b).find(s => !offen.has(s.id)) || null;
}
/* Die Menge der freigeschalteten Karten-Nummern - oder null, wenn der Bereich
   gar nicht gefuehrt ist und die Frage sich nicht stellt. null statt "alle"
   spart bei 500 Karten das Aufbauen einer Menge, die ohnehin jeden Test
   bestehen wuerde; jede Abfrage lautet deshalb (frei === null || frei.has(id)). */
function freieIdsFor(b) {
  /* Kein gefuehrter Satz -> kein Schloss -> die Frage stellt sich nicht.
     Ein "gesperrt" an einer Speicherkarte im eigenen Bereich bleibt damit
     folgenlos, auch wenn es aus einer aelteren Fassung noch dranhaengt. */
  if (!istGefuehrt(b)) return null;
  const offen = offeneLektionIds(b);
  const frei = new Set();
  for (const s of (b.sets || [])) {
    if (s.art !== "lektion" || !offen.has(s.id)) continue;
    for (const id of s.cardIds) frei.add(id);
  }
  return frei;
}
function lektionenVon(b) { return (b.sets || []).filter(s => s.art === "lektion"); }
/* ---------- Wer bekommt das Lektions-System überhaupt zu sehen? ----------
   Schloss, Gruppen und der Modus „Lernen" gehoeren zu einem WEITERGEGEBENEN
   Kartensatz. In einem eigenen Bereich haben sie nichts verloren: Dort gibt es
   niemanden, der etwas freischalten muesste, und ein Schloss haette dort nicht
   einmal eine Wirkung - freieIdsFor() gibt fuer einen eigenen Bereich null
   zurueck, es waere also ein Knopf, der luegt.

   Deshalb gilt ab 2.5.0:
     - gefuehrter Bereich  -> alles: Gruppen, Schloss, ▶ Lernen
     - eigener Bereich     -> die schlichte Liste wie vor 2.3.0
     - eigener Bereich, aber Autorenmodus -> zusaetzlich die Art-Auswahl, denn
       die Lektionen fuer die Weitergabe muessen ja irgendwo entstehen. Und
       gruppiert wird erst, wenn wirklich eine Art vergeben wurde - vorher
       sieht das Feld genauso aus wie immer. */
function zeigtArtWahl(b) {
  b = b || currentBereich();
  /* Auch beim Autor nicht dauerhaft: Ein Auswahlfeld in jeder Zeile macht das
     Feld unruhig, und vergeben wird die Art einmal pro Speicherkarte und dann
     nie wieder. Deshalb ein Schalter darueber, der im Normalfall aus ist. */
  return istAutor() && !istGefuehrt(b) && ui.setsArtWahl;
}
function zeigtGruppen(b) {
  b = b || currentBereich();
  if (istGefuehrt(b)) return true;
  /* Absichtlich NICHT am Schalter haengend: Wer erst 20 Lektionen angelegt
     und den Schalter dann wieder ausgemacht hat, saehe sonst wieder eine
     flache Liste aus 26 Zeilen. Gruppiert wird, sobald es etwas zu gruppieren
     gibt - und vorher sieht das Feld aus wie immer. */
  return istAutor() && (b.sets || []).some(s => (s.art || "eigen") !== "eigen");
}
/* Darf in diesem Bereich an den Karten selbst etwas geaendert werden? */
function kartenBearbeitbar(b) { return !istGefuehrt(b || currentBereich()); }
/* Darf diese Speicherkarte umbenannt, geloescht oder umsortiert werden?
   In einem gefuehrten Satz gehoeren Kategorien und Lektionen dem Autor;
   eigene Speicherkarten legt sich jede:r selbst an und darf sie auch wieder
   wegwerfen. */
function setBearbeitbar(s, b) { return !istGefuehrt(b || currentBereich()) || s.art === "eigen"; }
async function hinweisGefuehrt(was) {
  await dlgAlert(was + ' geht in „' + currentBereich().name + '" nicht: Das ist ein geführter Kartensatz, ' +
    'er soll bei allen gleich bleiben. Für eigene Karten leg dir über „+ Bereich" oben einen eigenen Bereich an.',
    "Geführter Kartensatz");
}
/* Speicherkarte = benannte Merkliste. Sie speichert NUR Karten-IDs, keine Kopien
   der Karten. Dadurch bleibt jede Karte genau einmal im Bereich vorhanden:
   Änderungen am Wort oder an der Stufe wirken automatisch auch hier, und Üben
   über eine Speicherkarte verändert den Lernfortschritt genauso wenig wie der
   normale Übungsmodus. */
/* 2.3.0: Jede Speicherkarte hat eine Art. Sie entscheidet ueber das Verhalten,
   nicht nur ueber die Einsortierung:

     kategorie - die grossen Sammelmappen (Nomen, Verben, Grammatik, ...).
                 Immer offen, nie sperrbar. Sie geben NICHTS frei.
     lektion   - eine Einheit des Buchs bzw. ein Video der Playlist. Nur sie
                 laesst sich sperren, und nur sie gibt Karten frei.
     eigen     - selbst zusammengestellt, z.B. "schwierige Woerter". Genau
                 dafuer waren die Speicherkarten urspruenglich gedacht.

   Datenstaende vor 2.3.0 kennen das Feld nicht; sie gelten deshalb als
   "eigen" und verhalten sich damit exakt wie bisher. */
const SET_ARTEN = ["kategorie", "lektion", "eigen"];
/* 2.11.0: Reihenfolge der Abschnitte im Verwalten-Tab. Lektionen zuerst -
   sie sind der Weg. Kategorien danach, die sind zum Nachschlagen. Eigene
   zuletzt, weil sie am Anfang leer sind und erst mit der Zeit wachsen. */
const SET_ARTEN_ANZEIGE = ["lektion", "kategorie", "eigen"];
/* Ab dieser je erreichten Stufe gilt eine Karte als sitzend. Stufe 2 heisst
   bei den Intervallen (1,8 hoch Stufe-1): einmal gelernt, am naechsten Tag
   wiedererkannt. Eine Lektion braucht also mindestens zwei Tage. */
const LEKTION_STUFE = 1;
/* ---------- 2.13.1: liegengebliebene Karten ----------
   Die Serie zaehlt ueber ALLE Bereiche. Damit konnte ein einziger Bereich mit
   wochenalten Karten sie sofort zerreissen - und zwar ohne dass jemand etwas
   falsch gemacht haette: Es genuegte, ein altes Backup einzuspielen, und die
   Serie war weg, weil dessen Karten alle seit Wochen ueberfaellig waren.

   Deshalb: Was laenger als so viele Tage ueberfaellig ist, gilt als
   liegengeblieben. Es bricht die Serie nicht und blockiert sie nicht. Wer
   einen Bereich seit Wochen nicht angefasst hat, wird davon nicht laenger in
   Geiselhaft genommen; sobald er ihn wieder anfasst, zaehlt er ganz normal
   mit, denn dann sind seine Karten nicht mehr so lange ueberfaellig. */
const LIEGENGEBLIEBEN_TAGE = 14;
function istLiegengeblieben(c) {
  return !istNeueKarte(c) && c.nextReview < dateInDays(-LIEGENGEBLIEBEN_TAGE);
}
const SET_ART_TITEL = { kategorie: "Kategorien", lektion: "Lektionen", eigen: "Eigene" };
const SET_ART_ERKLAERUNG = {
  kategorie: "Sammelmappen quer durch den Stoff. Sie sind immer offen und schalten selbst nichts frei.",
  lektion: "Eine Einheit des Buchs bzw. ein Video. Gelernt wird im Lernen-Tab – hier siehst du nur, wie weit du bist.",
  eigen: "Selbst zusammengestellt, zum gezielten Üben. Aufnehmen lassen sich nur freigeschaltete Karten."
};
/* 2.21.5: Eigene, schlichte Strichsymbole statt Emoji fuer alles, was
   wirklich UI ist (Merken-Stern, Speicherkarten-Art). Emoji sehen je nach
   Betriebssystem unterschiedlich aus - fett und bunt auf dem einen Geraet,
   duenn und grau auf dem naechsten - und wirken neben durchgestalteten
   Knoepfen wie ein Fremdkoerper, der von woanders hineinkopiert wurde.
   Ein SVG-Symbol uebernimmt stattdessen currentColor und macht Hell/Dunkel
   automatisch mit.
   10 (17.09.2026): Die fruehere Grenze hier ("<option> rendert kein SVG,
   deshalb bleibt bei der Art-Auswahl ein Emoji stehen") ist mit dem
   Auswahl-Blatt fuer die Speicherkarten-Art weggefallen (SET_ART_ZEICHEN
   entfernt) - dort steht jetzt wie ueberall sonst das SVG-Symbol. */
const ICON_PFADE = {
  lektion: '<path d="M12 6.3C10.2 5.1 8 4.4 5.8 4.4c-.7 0-1.3.6-1.3 1.3v11.7c0 .7.6 1.3 1.3 1.3 2.2 0 4.4.7 6.2 1.9 1.8-1.2 4-1.9 6.2-1.9.7 0 1.3-.6 1.3-1.3V5.7c0-.7-.6-1.3-1.3-1.3-2.2 0-4.4.7-6.2 1.9z"/><line x1="12" y1="6.3" x2="12" y2="19.6"/>',
  kategorie: '<path d="M3 11.3V5.6c0-1.1.9-2 2-2h5.6c.5 0 1 .2 1.4.6l8 8c.8.8.8 2 0 2.8l-6.3 6.3c-.8.8-2 .8-2.8 0l-8-8c-.4-.4-.6-.9-.6-1.4z"/><circle cx="7.3" cy="7.3" r="1.1" fill="currentColor" stroke="none"/>',
  stern: '<path d="M12 17.3 5.8 21l1.6-7L2 9.3l7.1-.6L12 2l2.9 6.7 7.1.6-5.4 4.7 1.6 7z"/>',

  /* ---------- 3.0.0: das erweiterte Zeichenvorrat ----------
     Alle auf demselben 24er-Raster, alle in currentColor, alle mit derselben
     Strichstaerke (die steht in der styles.css, nicht hier). Damit ersetzen
     sie die Emoji, die bis 2.21.6 ueberall verstreut standen und auf jedem
     Geraet anders aussahen - mal bunt, mal fett, mal gar nicht passend.
     Die einzige bewusste Ausnahme bleibt die native Art-Auswahl im
     Autorenmodus: ein <option> kann kein SVG zeichnen. */
  lernen:      '<path d="M12 3 3 7.5l9 4.5 9-4.5L12 3z"/><path d="M3 12.5 12 17l9-4.5"/><path d="M3 17 12 21.5 21 17"/>',
  fortschritt: '<path d="M3 20h18"/><path d="M6 20v-6"/><path d="M11 20V8"/><path d="M16 20v-9"/><path d="M21 20V5"/>',
  verwalten:   '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h10"/>',
  zahnrad:     '<path d="M4 7h9"/><path d="M17 7h3"/><path d="M4 17h3"/><path d="M11 17h9"/><circle cx="15" cy="7" r="2.2"/><circle cx="7" cy="17" r="2.2"/>',
  chevronUnten:'<path d="M6 9.5 12 15.5 18 9.5"/>',
  chevronRechts:'<path d="M9 5.5 15.5 12 9 18.5"/>',
  zurueck:     '<path d="M15 5.5 8.5 12 15 18.5"/>',
  schliessen:  '<path d="M6.5 6.5l11 11"/><path d="M17.5 6.5l-11 11"/>',
  plus:        '<path d="M12 5v14"/><path d="M5 12h14"/>',
  suche:       '<circle cx="11" cy="11" r="7"/><path d="M20.5 20.5 16.2 16.2"/>',
  haken:       '<path d="M4.5 12.5 9.5 17.5 19.5 6.5"/>',
  rueckgaengig:'<path d="M8.5 13.5 4 9l4.5-4.5"/><path d="M4 9h11a5 5 0 0 1 0 10h-4.5"/>',
  ueben:       '<path d="M17 2.5 20.5 6 17 9.5"/><path d="M3.5 12v-2a4 4 0 0 1 4-4h13"/><path d="M7 21.5 3.5 18 7 14.5"/><path d="M20.5 12v2a4 4 0 0 1-4 4h-13"/>',
  serie:       '<path d="M12 22c3.9 0 7-2.7 7-6.5 0-4-3-6.4-4.1-9.4-.6 2-1.6 3-2.6 3.7C11 8 11 6 9 2.5c0 3.6-4 5.4-4 13C5 19.3 8.1 22 12 22z"/>',
  sichern:     '<path d="M12 3.5v12"/><path d="M7 11l5 5 5-5"/><path d="M4 20.5h16"/>',
  einspielen:  '<path d="M12 20.5v-12"/><path d="M7 13.5l5-5 5 5"/><path d="M4 3.5h16"/>',
  teilen:      '<path d="M12 3v12"/><path d="M8 6.5 12 2.5l4 4"/><path d="M5 13v6.5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V13"/>',
  stift:       '<path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M14.5 5.5l4 4"/>',
  muell:       '<path d="M4 7h16"/><path d="M9.5 7V4.5h5V7"/><path d="M6.5 7l1 13h9l1-13"/>',
  schloss:     '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7"/>',
  vollbild:    '<path d="M4 9.5V4h5.5"/><path d="M20 9.5V4h-5.5"/><path d="M4 14.5V20h5.5"/><path d="M20 14.5V20h-5.5"/>',
  warnung:     '<path d="M12 3.5 21 20H3z"/><path d="M12 10v4"/><path d="M12 17h.01"/>',
  offline:     '<path d="M3 3.5 21 21"/><path d="M6.8 9A5.5 5.5 0 0 0 7 20h9.5a4.5 4.5 0 0 0 2.9-1.05"/><path d="M8.3 5.6A6.5 6.5 0 0 1 18.4 11a4.5 4.5 0 0 1 2.3 1.4"/>',
  griff:       '<circle cx="9" cy="6" r="1.15" fill="currentColor" stroke="none"/><circle cx="9" cy="12" r="1.15" fill="currentColor" stroke="none"/><circle cx="9" cy="18" r="1.15" fill="currentColor" stroke="none"/><circle cx="15" cy="6" r="1.15" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1.15" fill="currentColor" stroke="none"/><circle cx="15" cy="18" r="1.15" fill="currentColor" stroke="none"/>',
  ordner:      '<path d="M3 7.5a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  karten:      '<rect x="3" y="6" width="14" height="12" rx="2"/><path d="M7 3.5h12a2 2 0 0 1 2 2V16"/>',
  leer:        '<circle cx="12" cy="12" r="8.5"/><path d="M8.5 12h7"/>',
  fertig:      '<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.8 2.8L16.2 9.6"/>',
  konto:       '<circle cx="12" cy="8" r="3.5"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>',
  abmelden:    '<path d="M14 4.5H6.5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2H14"/><path d="M17 8.5 20.5 12 17 15.5"/><path d="M20.5 12h-10"/>',
  umkehren:    '<path d="M7 4.5v15"/><path d="M4 16.5 7 19.5 10 16.5"/><path d="M17 19.5v-15"/><path d="M14 7.5 17 4.5 20 7.5"/>',
  /* 18.09.2026: Werkzeugleiste Verwalten, "Mehr"-Blatt - drei waagerechte
     Punkte, das uebliche Kebab-Symbol fuer eingeklappte Handlungen. */
  mehr:        '<circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none"/>',
  verschieben: '<path d="M4 6.5h9a4 4 0 0 1 4 4v6"/><path d="M13.5 13 17 16.5 20.5 13"/>',
  hand:        '<path d="M4 19.5h16"/><path d="M6.5 15.5 15 7a2.1 2.1 0 0 1 3 3l-8.5 8.5H6.5z"/>',
  auswaehlen:  '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8.5 12.2l2.4 2.4 4.6-5"/>',
  auge:        '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  augeZu:      '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20 20 4"/>',
  marke:       '<path fill="currentColor" stroke="none" d="M11.53,15.02L9.3,14.84L9.21,14.74L8.74,14.74L8.65,14.65L7.63,14.47L7.53,14.37L7.07,14.28L6.79,14.09L6.6,14.09L5.3,13.44L4.65,12.98L3.44,11.77L2.6,10.28L2.6,10.09L2.42,9.72L2.42,9.44L2.33,9.35L2.33,8.98L2.23,8.88L2.14,7.58L3.72,7.67L3.81,7.77L4.28,7.77L4.37,7.86L4.65,7.86L5.12,8.05L5.4,8.05L5.49,7.95L5.4,7.86L5.4,7.3L5.3,7.21L5.3,5.44L5.4,5.35L5.49,4.23L5.58,4.14L5.58,3.86L5.67,3.77L5.67,3.49L5.77,3.4L5.86,2.93L6.88,3.4L8.09,4.23L9.3,5.44L9.77,6.09L9.86,6L10.14,4.98L10.6,3.95L10.79,3.77L11.16,3.02L12,2L12.84,3.02L12.93,3.3L13.4,3.95L13.86,4.98L13.86,5.16L14.23,6.09L14.7,5.44L15.91,4.23L17.12,3.4L18.14,2.93L18.14,3.12L18.33,3.49L18.33,3.77L18.42,3.86L18.42,4.14L18.51,4.23L18.6,5.35L18.7,5.44L18.7,7.21L18.6,7.3L18.6,7.86L18.51,7.95L18.6,8.05L18.88,8.05L18.98,7.95L19.26,7.95L19.72,7.77L20.19,7.77L20.28,7.67L21.86,7.58L21.77,8.88L21.67,8.98L21.58,9.72L20.93,11.21L20.56,11.77L19.35,12.98L18.7,13.44L17.4,14.09L17.21,14.09L16.93,14.28L16.74,14.28L16.37,14.47L16.09,14.47L16,14.56L15.72,14.56L15.26,14.74L14.79,14.74L14.7,14.84L14.14,14.84L14.05,14.93L13.02,14.93L12.93,15.02L11.53,15.02Z"/><path d="M11.95,15.02L12,22"/>'
};
/* Kleines Symbol im Fliesstext (16px, .icon) - der bisherige Aufruf. */
function iconSvg(name, cls) {
  const key = name === "eigen" ? "stern" : name;
  return '<svg class="icon' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" width="16" height="16" ' +
    'aria-hidden="true">' + (ICON_PFADE[key] || "") + '</svg>';
}
/* Symbol als eigenstaendiges Element (20px, .i) - fuer Knoepfe, Navigation,
   Leerzustaende. cls nimmt die Groessenklassen i-sm / i-lg / i-xl. */
function ikon(name, cls) {
  return '<svg class="i' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" ' +
    'aria-hidden="true" focusable="false">' + (ICON_PFADE[name] || "") + '</svg>';
}
/* Marken-Logos fuer die Anmeldeknoepfe (offene Frage 13). Anders als die
   uebrigen Symbole (ICON_PFADE, eine Farbe = currentColor) tragen diese ihre
   eigenen Markenfarben fest - ein Google-"G" in Knopf-Textfarbe waere nicht
   wiederzuerkennen. Apple bleibt einfarbig (currentColor), so wie der
   Anbieter sein Zeichen selbst vorschreibt. */
const OAUTH_LOGOS = {
  google: '<svg class="oauth-logo" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false" style="width:20px;height:20px;flex:0 0 auto;display:block">' +
    '<path fill="#4285F4" stroke="none" d="M23.52 12.27c0-.82-.07-1.6-.2-2.36H12v4.46h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.72z"/>' +
    '<path fill="#34A853" stroke="none" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.1C3.25 21.3 7.31 24 12 24z"/>' +
    '<path fill="#FBBC05" stroke="none" d="M5.27 14.29A7.2 7.2 0 0 1 4.89 12c0-.8.14-1.57.38-2.29v-3.1H1.27A11.98 11.98 0 0 0 0 12c0 1.93.46 3.76 1.27 5.39l4-3.1z"/>' +
    '<path fill="#EA4335" stroke="none" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.61l4 3.1C6.22 6.86 8.87 4.75 12 4.75z"/>' +
    '</svg>',
  apple: '<svg class="oauth-logo" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false" style="width:20px;height:20px;flex:0 0 auto;display:block">' +
    '<path fill="currentColor" stroke="none" d="M16.36 1.43c0 1.14-.42 2.2-1.24 3.05-.87.9-2.13 1.63-3.34 1.51-.15-1.16.44-2.34 1.19-3.11.83-.87 2.23-1.5 3.36-1.45.02.17.03.34.03.5zM20.5 17.2c-.42.98-.62 1.42-1.16 2.29-.75 1.21-1.81 2.72-3.12 2.73-1.17.02-1.47-.76-3.06-.75-1.58.01-1.92.76-3.09.74-1.31-.02-2.31-1.38-3.06-2.59-2.1-3.4-2.32-7.39-1.02-9.52.92-1.51 2.38-2.4 3.75-2.4 1.39 0 2.27.77 3.42.77 1.12 0 1.8-.77 3.42-.77 1.22 0 2.51.67 3.43 1.82-3.02 1.66-2.53 5.98.49 7.68z"/>' +
    '</svg>'
};
/* Der Merken-Stern: eigenes Symbol statt ☆/⭐, weil er sich beim Antippen
   sichtbar veraendern soll (Umriss -> gefuellt) statt nur den Emoji-
   Zeichencode zu tauschen. pop=true spielt einmalig die Pop-Animation ab -
   siehe ui.merkPop und dessen "einmal lesen, dann loeschen" weiter unten,
   dasselbe Muster wie ui.springZu / ui.lernFokusNach. */
function sternIcon(gefuellt, pop) {
  return iconSvg("stern", "star" + (gefuellt ? " filled" : "") + (pop ? " pop" : ""));
}
function normSet(s) {
  const art = SET_ARTEN.indexOf(s.art) !== -1 ? s.art : "eigen";
  return {
    id: typeof s.id === "string" && s.id ? s.id : genId(),
    name: typeof s.name === "string" && s.name ? s.name.slice(0, 40) : "Speicherkarte",
    art: art,
    /* Das Schloss haengt ausschliesslich an Lektionen. Stuende es auch an
       einer Kategorie, waere die Freigabe-Regel nicht mehr eindeutig. */
    quelleId: typeof s.quelleId === "string" && s.quelleId ? s.quelleId : null,
    cardIds: (Array.isArray(s.cardIds) ? s.cardIds : []).filter(x => typeof x === "string" && x)
  };
}
function normBereiche(arr) {
  const out = [];
  if (Array.isArray(arr)) {
    for (const b of arr) {
      if (!b || typeof b !== "object" || typeof b.name !== "string" || !b.name) continue;
      if (out.some(x => x.name === b.name)) continue;
      out.push({
        id: typeof b.id === "string" && b.id ? b.id : genId(),
        name: b.name.slice(0, 40),
        gefuehrt: b.gefuehrt === true,
        satzId: typeof b.satzId === "string" && b.satzId ? b.satzId : null,
        satzVersion: Number.isInteger(b.satzVersion) && b.satzVersion > 0 ? b.satzVersion : 0,
        karten: (Array.isArray(b.karten) ? b.karten : [])
          .filter(c => c && typeof c === "object" && c.wort != null && c.uebersetzung != null)
          .map(normCard),
        sets: (Array.isArray(b.sets) ? b.sets : [])
          .filter(s => s && typeof s === "object")
          .slice(0, MAX_SETS)
          .map(normSet)
      });
    }
  }
  if (out.length === 0) out.push({ id: genId(), name: "Vokabeln", karten: [], sets: [] });
  return out;
}
/* Wandelt die lokale Bereiche-Liste (Array) in das in der Cloud gespeicherte
   Map-Format um (Bereiche und Karten jeweils als Objekt, per ID adressierbar).
   Nur DAMIT lassen sich einzelne Felder gezielt aktualisieren (siehe persistCardGrade),
   ohne dabei aus Versehen Änderungen zu überschreiben, die zwischenzeitlich von
   einem anderen Gerät gespeichert wurden. */
/* A4 (1.9.0): Eine Karte in der Form, wie sie in der Cloud steht. Frueher
   stand dieselbe Feldliste nur hier drin; seit es gezielte Patches gibt,
   schreibt auch das Anlegen und Verschieben einzelner Karten damit - so kann
   die Liste nicht an zwei Stellen auseinanderlaufen. */
function kartenFelder(c, order) {
  return {
    wort: c.wort, uebersetzung: c.uebersetzung, extra: c.extra,
    stufe: c.stufe, nextReview: c.nextReview,
    ersteBewertung: c.ersteBewertung === undefined ? null : c.ersteBewertung,
    rueckfaelle: c.rueckfaelle || 0,
    quelleId: c.quelleId || null,
    maxStufe: c.maxStufe || 0,
    order: order
  };
}
/* Eine Speicherkarte in der Form, wie sie in der Cloud steht. Wie bei den
   Karten steht die Feldliste nur an dieser einen Stelle, damit gezielte
   Patches und das Vollschreiben nicht auseinanderlaufen koennen. */
function setFelder(st, order) {
  return {
    name: st.name, order: order,
    art: st.art || "eigen",
    quelleId: st.quelleId || null,
    cardIds: st.cardIds
  };
}
function bereichFelder(b, order) {
  const kartenMap = {};
  b.karten.forEach((c, ci) => { kartenMap[c.id] = kartenFelder(c, ci); });
  const setsMap = {};
  (Array.isArray(b.sets) ? b.sets : []).forEach((st, si) => {
    setsMap[st.id] = setFelder(st, si);
  });
  return {
    name: b.name, order: order,
    gefuehrt: !!b.gefuehrt,
    satzId: b.satzId || null,
    satzVersion: b.satzVersion || 0,
    karten: kartenMap, sets: setsMap
  };
}
function bereicheMapToArray(mapObj) {
  const ids = Object.keys(mapObj || {});
  const list = ids.map(id => {
    const b = mapObj[id] || {};
    const kartenMap = b.karten && typeof b.karten === "object" ? b.karten : {};
    const karten = Object.keys(kartenMap).map(cid => {
      const c = kartenMap[cid] || {};
      return { card: normCard({ id: cid, wort: c.wort, uebersetzung: c.uebersetzung, extra: c.extra, stufe: c.stufe, nextReview: c.nextReview, ersteBewertung: c.ersteBewertung, rueckfaelle: c.rueckfaelle, quelleId: c.quelleId, maxStufe: c.maxStufe }), order: Number.isFinite(c.order) ? c.order : 0 };
    }).sort((x, y) => x.order - y.order).map(x => x.card);
    const setsMap = b.sets && typeof b.sets === "object" ? b.sets : {};
    const sets = Object.keys(setsMap).map(sid => {
      const s = setsMap[sid] || {};
      return { set: normSet({ id: sid, name: s.name, art: s.art, quelleId: s.quelleId, cardIds: s.cardIds }), order: Number.isFinite(s.order) ? s.order : 0 };
    }).sort((x, y) => x.order - y.order).map(x => x.set);
    return { id: id, name: typeof b.name === "string" && b.name ? b.name.slice(0, 40) : "Vokabeln", gefuehrt: b.gefuehrt === true, satzId: typeof b.satzId === "string" && b.satzId ? b.satzId : null, satzVersion: Number.isInteger(b.satzVersion) ? b.satzVersion : 0, karten: karten, sets: sets, order: Number.isFinite(b.order) ? b.order : 0 };
  }).sort((x, y) => x.order - y.order).map(({ order, ...rest }) => rest);
  return list.length ? list : [{ id: genId(), name: "Vokabeln", karten: [], sets: [] }];
}
/* ---------- 2.8.0: Tagesprotokoll ----------
   Bis 2.7.0 speicherte die App nur den AKTUELLEN Zustand jeder Karte. Damit
   liess sich kein Verlauf zeigen: kein "diese Woche", kein Vergleich mit
   gestern, kein Kalender. Der Fortschritts-Tab konnte deshalb gar nicht
   lebendig sein - er hatte nichts, woraus sich eine Bewegung ergibt.

   Jetzt wird pro Tag mitgeschrieben, wie viel gelernt wurde: w = bewertete
   Wiederholungen, n = zum ersten Mal gelernte Karten. Zwei Zahlen pro Tag,
   120 Tage aufgehoben - das sind ein paar Kilobyte.

   Das Protokoll ist Anzeige, nichts haengt daran. Deshalb wird es gebuendelt
   geschrieben (siehe verlaufSpeichernBald) statt bei jeder Karte einzeln;
   geht beim Schliessen der Seite einmal ein Eintrag verloren, ist das kein
   Schaden. */
const VERLAUF_TAGE = 120;
let verlauf = {};
let verlaufTimer = null;
/* 2.16.0: Die Tage, die DIESES Geraet selbst gezaehlt hat.

   Bis 2.13.1 war das Protokoll reine Anzeige - ging ein Eintrag verloren,
   fehlte ein Balken. Seit 2.14.0 haengt die SERIE daran: Ein Tag im Protokoll
   ist ein Tag der Serie. Der Schnappschuss aus der Wolke ERSETZTE aber das
   ganze Protokoll. Stand der heutige Eintrag noch in der Warteschlange (er
   ging gebuendelt raus, siehe verlaufSpeichernBald) oder war sein Schreiben
   einmal fehlgeschlagen, dann war der Tag damit weg - und die Serie fiel um
   genau eins, ohne dass jemand etwas getan haette.

   Gemerkt werden nur SELBST gezaehlte Tage. So kann ein fremder Stand nichts
   wegwerfen, was hier gerade entstanden ist - und "Verlauf zuruecksetzen"
   bleibt trotzdem ein echtes Loeschen. */
let verlaufEigene = new Set();
function normVerlauf(v) {
  const out = {};
  if (!v || typeof v !== "object") return out;
  const grenze = dateInDays(-VERLAUF_TAGE);
  for (const k of Object.keys(v)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(k) || k < grenze) continue;
    const e = v[k] || {};
    out[k] = { w: Number.isInteger(e.w) && e.w > 0 ? e.w : 0,
               n: Number.isInteger(e.n) && e.n > 0 ? e.n : 0 };
  }
  return out;
}
function verlaufZaehle(art) {
  const t = todayStr();
  const ersterHeute = !verlauf[t];
  if (ersterHeute) verlauf[t] = { w: 0, n: 0 };
  verlauf[t][art] = (verlauf[t][art] || 0) + 1;
  verlaufEigene.add(t);
  /* Der ERSTE Eintrag eines Tages entscheidet, ob der Tag fuer die Serie
     zaehlt - der geht sofort raus. Alles Weitere aendert nur noch Balken und
     wird wie bisher gebuendelt geschrieben. */
  if (ersterHeute) persistVerlauf(); else verlaufSpeichernBald();
}
/* Wolkenstand und eigenes Protokoll zusammenlegen statt ersetzen: je Tag die
   groessere Zahl, aber nur fuer Tage, die dieses Geraet selbst gezaehlt hat. */
function verlaufZusammen(lokal, wolke) {
  const out = {};
  for (const k of Object.keys(wolke)) out[k] = { w: wolke[k].w, n: wolke[k].n };
  for (const k of verlaufEigene) {
    const a = lokal[k];
    if (!a) continue;
    const b = out[k];
    out[k] = b ? { w: Math.max(a.w, b.w), n: Math.max(a.n, b.n) } : { w: a.w, n: a.n };
  }
  return out;
}
/* Was nur hier steht, geht danach an die Wolke - sonst fehlt derselbe Tag auf
   dem naechsten Geraet wieder. */
function verlaufNachschicken(wolke) {
  if (!userDocRef || !fb.FieldPath) return;
  const args = [];
  for (const k of verlaufEigene) {
    const a = verlauf[k];
    if (!a) continue;
    const b = wolke[k];
    if (b && b.w >= a.w && b.n >= a.n) continue;
    args.push(new fb.FieldPath("verlauf", k), a);
  }
  if (args.length === 0) return;
  fb.updateDoc(userDocRef, ...args).catch(() => {});
}
function verlaufSpeichernBald() {
  if (verlaufTimer) return;
  verlaufTimer = setTimeout(() => { verlaufTimer = null; persistVerlauf(); }, 2000);
}
/* 2.10.2: Nur der heutige Eintrag geht raus, nicht das ganze Protokoll.
   Frueher schrieb die App bei jeder Karte alle 120 Tage zurueck - wer in der
   Konsole aufraeumte, hatte alles Sekunden spaeter wieder da.

   Die Tagesschluessel (2026-09-07) taugen nicht als Feldpfad in Punktschreib-
   weise, deshalb FieldPath. Fehlt der aus irgendeinem Grund, bleibt es beim
   alten Weg - lieber schreiben als verlieren. */
function persistVerlauf() {
  if (!userDocRef) return;
  const t = todayStr();
  const heute = verlauf[t];
  if (!heute) return;
  /* 2.16.0: Der Fehler wird nicht mehr verschluckt. Fehlt das Nutzerdokument
     noch, wird es angelegt und der Tag danach erneut geschrieben - genau wie
     bei Serie und Einstellungen. Sonst waere der erste Lerntag eines neuen
     Kontos still verloren, und mit ihm der Anfang der Serie. */
  if (fb.FieldPath) {
    fb.updateDoc(userDocRef, new fb.FieldPath("verlauf", t), heute)
      .then(schreibErfolg)
      .catch(async e => {
        if (e && e.code === "not-found") {
          if (kontoWirdGeloescht) return;
          try {
            await fb.setDoc(userDocRef, { name: displayName, schemaVersion: SCHEMA_VERSION }, { merge: true });
            await fb.updateDoc(userDocRef, new fb.FieldPath("verlauf", t), heute);
            schreibErfolg();
            return;
          } catch (e2) { saveFehler(e2); return; }
        }
        saveFehler(e);
      });
  } else {
    fb.updateDoc(userDocRef, { verlauf: verlauf }).catch(() => {});
  }
}
/* Alte Tage in der Cloud wegraeumen. Laeuft einmal beim Laden, weil der
   Speicher sie da ohnehin schon verworfen hat und sie sonst nie jemand
   anfasst. */
function verlaufAufraeumen(roh) {
  if (!userDocRef || !roh || typeof roh !== "object" || !fb.FieldPath || !fb.deleteField) return;
  const grenze = dateInDays(-VERLAUF_TAGE);
  const alt = Object.keys(roh).filter(k => !/^\d{4}-\d{2}-\d{2}$/.test(k) || k < grenze);
  if (alt.length === 0) return;
  const args = [];
  for (const k of alt) { args.push(new fb.FieldPath("verlauf", k), fb.deleteField()); }
  fb.updateDoc(userDocRef, ...args).catch(() => {});
}
/* Das Tagesprotokoll loeschen. Nur die Anzeige - Karten, Stufen und
   Faelligkeiten bleiben unangetastet. Steht in der App, damit niemand dafuer
   in die Firebase-Konsole muss: Von dort aus verliert man gegen ein
   laufendes Geraet, das seinen Speicherstand zurueckschreibt. */
async function verlaufZuruecksetzen() {
  const tage = Object.keys(verlauf).length;
  const ok = await dlgConfirm("Das Tagesprotokoll von " + tage + " Tag(en) wird gelöscht: Balken, Kalender und Wochenzahlen fangen bei null an.\n\nKarten, Stufen und Fälligkeiten bleiben unberührt.",
    { title: "Verlauf zurücksetzen?", okLabel: "Löschen", danger: true });
  if (!ok) return;
  if (verlaufTimer) { clearTimeout(verlaufTimer); verlaufTimer = null; }
  verlauf = {};
  verlaufEigene = new Set();   // sonst holte der naechste Schnappschuss alles zurueck
  if (userDocRef) fb.updateDoc(userDocRef, { verlauf: {} }).catch(() => {});
  render();
}
/* Summe der letzten n Tage (heute eingeschlossen). */
function verlaufSumme(tage) {
  let w = 0, nn = 0;
  for (let i = 0; i < tage; i++) {
    const e = verlauf[dateInDays(-i)];
    if (e) { w += e.w || 0; nn += e.n || 0; }
  }
  return { w: w, n: nn, gesamt: w + nn };
}

/* Summe einer 7-Tage-Spanne, um "von" Tagen zurück bis ausschließlich
   "bis". verlaufSummeSpanne(0,7) ist diese Woche, (7,14) die davor - so
   lassen sich zwei Wochen vergleichen, ohne verlaufSumme() doppelt zu
   benutzen und die ältere von der jüngeren Hälfte abzuziehen. */
function verlaufSummeSpanne(von, bis) {
  let w = 0, nn = 0;
  for (let i = von; i < bis; i++) {
    const e = verlauf[dateInDays(-i)];
    if (e) { w += e.w || 0; nn += e.n || 0; }
  }
  return { w: w, n: nn, gesamt: w + nn };
}

function normStreak(s) {
  if (!s || typeof s !== "object") {
    return { count: 0, lastCompletedDate: null, lastEvaluatedDate: null,
             jokerAm: null, beste: 0, gerissenAm: null, vorher: 0 };
  }
  return {
    /* 2.8.0: Tag, an dem zuletzt ein Ausfalltag ueberbrueckt wurde. */
    jokerAm: /^\d{4}-\d{2}-\d{2}$/.test(s.jokerAm) ? s.jokerAm : null,
    /* 2.9.0: Die beste Serie geht nie verloren. Ein gerissener Zaehler fuehlt
       sich sonst an, als waere alles weg - und genau dann hoert man auf.
       Derselbe Begriff wie im Adrabic-Trainer ("beste Serie"). */
    beste: Number.isInteger(s.beste) && s.beste >= 0 ? s.beste : (Number.isInteger(s.count) ? s.count : 0),
    /* Wann die Serie zuletzt gerissen ist und auf welchem Stand sie war.
       Beides nur, damit die App es SAGEN kann statt still auf 0 zu springen -
       und damit sich ein Riss aus Versehen (zweiter Bereich, zweites Geraet)
       innerhalb von zwei Tagen zuruecknehmen laesst. */
    gerissenAm: /^\d{4}-\d{2}-\d{2}$/.test(s.gerissenAm) ? s.gerissenAm : null,
    vorher: Number.isInteger(s.vorher) && s.vorher >= 0 ? s.vorher : 0,
    /* 2.14.0: Sockel = die Serie, die bestand, bevor das Tagesprotokoll sie
       tragen konnte. Alles danach wird aus dem Protokoll gerechnet. */
    sockel: Number.isInteger(s.sockel) && s.sockel >= 0 ? s.sockel : null,
    sockelBis: /^\d{4}-\d{2}-\d{2}$/.test(s.sockelBis) ? s.sockelBis : null,
    count: Number.isInteger(s.count) && s.count >= 0 ? s.count : 0,
    lastCompletedDate: /^\d{4}-\d{2}-\d{2}$/.test(s.lastCompletedDate) ? s.lastCompletedDate : null,
    lastEvaluatedDate: /^\d{4}-\d{2}-\d{2}$/.test(s.lastEvaluatedDate) ? s.lastEvaluatedDate : null
  };
}
/* Einstellungen liegen im selben Nutzerdokument.

   2.3.0: Das Tageslimit fuer neue Karten ist entfallen. Es war die Notbremse
   gegen 500 faellige Karten am ersten Tag nach einem grossen Import. Diese
   Aufgabe uebernimmt jetzt das Schloss an den Lektionen - und zwar besser,
   weil es am Stoff haengt statt an einer Zahl, die niemand einstellen will.
   Ein alter Wert im Konto wird beim naechsten Speichern still verworfen. */
/* E7 (1.8.0): drei feste Stufen statt eines Zahlenfeldes. Fatha, Kasra und
   Sukuun sind bei 1,7 rem auf dem Handy kaum auseinanderzuhalten - und genau
   die entscheiden, ob richtig gelesen wird. */
/* 3.2.0: Beschriftungen gross geschrieben. Sie standen frueher als Knoepfe
   in einer Segmentreihe nebeneinander, wo Kleinschreibung passte; jetzt
   stehen sie als Stand rechts in einer Zeile neben "Dunkel" und "20". */
const ARAB_STUFEN = [
  { id: "klein",  label: "Klein",  faktor: 0.85 },
  { id: "normal", label: "Normal", faktor: 1 },
  { id: "gross",  label: "Groß",   faktor: 1.3 }
];
function arabFaktor() {
  const st = ARAB_STUFEN.find(x => x.id === settings.arabGroesse);
  return st ? st.faktor : 1;
}
function normSettings(s) {
  const g = s && ARAB_STUFEN.some(x => x.id === s.arabGroesse) ? s.arabGroesse : "normal";
  /* D5 (1.8.0): Datum des letzten Voll-Backups. Lag frueher in localStorage
     und war damit geraetelokal - auf einem neuen Handy hiess es immer "noch
     nie gesichert", was aussieht, als waeren die Daten weg. */
  const b = s && /^\d{4}-\d{2}-\d{2}$/.test(s.lastBackup) ? s.lastBackup : null;
  /* 2.20.0: Voreinstellung ist DUNKEL, nicht "automatisch". Wer die App seit
     Monaten dunkel kennt, soll sie nach einem Update nicht plötzlich weiss
     vorfinden, nur weil das Handy gerade hell steht. */
  const th = s && THEMEN.some(x => x.id === s.thema) ? s.thema : "dunkel";
  const sl = s && SITZUNGS_LIMITS.some(x => x.id === s.sitzungsLimit) ? s.sitzungsLimit : "alle";
  return {
    arabGroesse: g,
    lastBackup: b,
    thema: th,
    sitzungsLimit: sl
  };
}

/* ---------- C2 (2.0.0): lange Kartenlisten ----------
   Jede Aktion baut das komplette DOM neu (app.innerHTML = html). Bei wenigen
   Dutzend Karten faellt das nicht auf, bei mehreren hundert Zeilen ruckelt
   jeder Haken und jeder Tastendruck in der Suche spuerbar.

   Drei Gegenmittel, alle nur in der Liste im Verwalten-Tab:
     1. Suche zeichnet erst neu, wenn kurz nichts mehr getippt wurde
     2. ein Haken im Auswahlmodus aendert nur seine eigene Zeile
     3. ab SEITEN_SCHWELLE Karten wird die Liste seitenweise gezeigt

   Unterhalb der Schwelle bleibt alles genau wie bisher - wer 40 Vokabeln
   hat, sieht keinen Unterschied und keine Seitenleiste. */
const SEITEN_SCHWELLE = 150;   // ab so vielen Karten ueberhaupt Seiten
const SEITE_GROESSE = 100;     // Karten pro Seite
const SUCH_VERZOEGERUNG = 150; // Millisekunden Ruhe, bevor die Suche neu zeichnet
let sucheTimer = null;
/* 2.1.0: true, solange die Handy-Tastatur an einem Wort baut. In dieser Zeit
   darf die Liste nicht neu gezeichnet werden. */
let tastaturBautWort = false;
/* Welcher Ausschnitt der Gesamtliste gerade zu sehen ist. endDrag() braucht
   das, um eine umsortierte Seite an der richtigen Stelle zurueckzuschreiben
   statt die Karten der anderen Seiten zu verlieren. */
let listenFenster = { start: 0, anzahl: 0 };

/* ---------- Zustand ---------- */
let currentUser = null;      // Firebase-User
let displayName = "";
let bereiche = null;         // Array [{name, karten:[]}] – null solange Cloud-Daten noch nicht geladen
let cloudDocExists = false;
let syncError = null;
/* 2.21.1: Hinweis + Neu-laden-Knopf, falls "Daten werden geladen…" sehr
   lange steht (z.B. schlechtes WLAN). Der Timer laeuft nur einmal an, bis
   die Daten da sind oder sich der Nutzer neu anmeldet - siehe render() und
   den Reset in onAuthStateChanged. */
let ladeTimer = null;
let ladeLangsam = false;
/* Lehrer-Modus, Kernablauf (siehe plan/lehrer-modus/GERUEST.md, Abschnitt J):
   Ein per Link geteilter Kartensatz steckt komplett im URL-Fragment, nicht
   in der Datenbank - deshalb wird er schon beim Laden der Seite ausgelesen,
   lange bevor ein Nutzer eingeloggt ist. Verarbeitet wird er erst, sobald
   bereiche geladen sind (siehe teilLinkPruefen in initFirebase). null,
   sobald erledigt oder abgelehnt - sonst fragt jeder Re-Render erneut. */
/* Wird nicht mehr benoetigt: Code-basiertes Teilen hat keine URL-Fragment-Links */
// let ausstehenderTeilLink = leseTeilLinkAusHash();
/* E8: Merkt sich, ob GERADE der Ladebildschirm steht - siehe render(). Ohne
   das trifft der Wechsel zur echten App die Blüten-Animation an einem
   zufälligen Punkt ihres Zyklus und schneidet sie hart ab; das sah nach
   einem Fehler aus, nicht nach einem Übergang. */
let bootAktiv = false;
let bootStart = null;
/* Mindestanzeigedauer: Bei sehr schnellem Netz waeren die Daten manchmal
   da, bevor der Ladebildschirm ueberhaupt richtig zu sehen war - er blitzte
   nur auf und war weg. Das liest sich nach einem Fehler, nicht nach einem
   normalen, schnellen Start. Ueblicher Wert fuer Splash-Screens: 500-800ms. */
const BOOT_MIN_MS = 650;
let streak = normStreak(null); // { count, lastCompletedDate, lastEvaluatedDate } – nur echte Lernsessions zählen, Üben nicht
/* Muss VOR dem ersten Aufruf von normSettings stehen - die Funktion prüft
   den gespeicherten Wert gegen diese Liste. */
const THEMEN = [
  { id: "dunkel", label: "Dunkel" },
  { id: "hell", label: "Hell" },
  { id: "auto", label: "Automatisch" }
];
/* Bremst NUR die einzelne Sitzung, nicht den Stoff selbst (das macht seit
   2.3.0 das Schloss, siehe dueCardsFor). Wer 80 fällige Karten hat und nur
   10 Minuten Zeit, konnte bisher nur mittendrin abbrechen. "Alle" ist
   Voreinstellung: bestehendes Verhalten bleibt unverändert. */
const SITZUNGS_LIMITS = [
  { id: 10, label: "10" },
  { id: 20, label: "20" },
  { id: 30, label: "30" },
  { id: "alle", label: "Alle" }
];
let settings = normSettings(null); // { arabGroesse, lastBackup, thema, sitzungsLimit }

/* ---------- 2.20.0: hell und dunkel ----------
   "Automatisch" wird hier aufgelöst und nicht im Stil-Block. Der Grund ist
   Pflege: Sonst stünden dieselben zwanzig Farben zweimal da - einmal für
   data-thema="hell" und einmal in einer Medienabfrage für "automatisch" -
   und die zweite Fassung wäre die, die man beim nächsten Mal vergisst.

   Mitgesetzt wird theme-color im Kopf der Seite. Danach richtet sich auf dem
   Handy die Leiste um die App herum: Bliebe sie schwarz, während die App
   hell ist, sähe die helle Fassung aus wie ein Fehler. */
let systemHell = null;
try {
  systemHell = window.matchMedia("(prefers-color-scheme: light)");
  if (systemHell.addEventListener) {
    systemHell.addEventListener("change", () => { if (settings.thema === "auto") themaAnwenden(); });
  }
} catch (e) { systemHell = null; }
function themaAufgeloest() {
  if (settings.thema === "hell") return "hell";
  if (settings.thema === "dunkel") return "dunkel";
  return systemHell && systemHell.matches ? "hell" : "dunkel";
}
function themaAnwenden() {
  const t = themaAufgeloest();
  document.documentElement.setAttribute("data-thema", t);
  /* Dieselbe Wahl noch einmal auf dem Gerät - gelesen wird sie vom kleinen
     Skript im Kopf der Seite, damit beim Start nichts umspringt. */
  try { localStorage.setItem("adrabic-thema", settings.thema); } catch (e) {}
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", t === "hell" ? "#f2ece0" : "#0a0a09");
}
function setThema(id) {
  if (!THEMEN.some(x => x.id === id)) return;
  settings.thema = id;
  themaAnwenden();
  persistSettings();
  render();
}
function setSitzungsLimit(id) {
  if (!SITZUNGS_LIMITS.some(x => x.id === id)) return;
  if (id === settings.sitzungsLimit) return;
  settings.sitzungsLimit = id;
  persistSettings();
  render();
}
themaAnwenden();

let ui = {
  authMode: "login",         // "login" | "register" | "reset"
  authError: null,
  authInfo: null,
  authBusy: false,
  /* 3.4.0: Was im Anmeldeformular schon getippt ist. render() ersetzt den
     ganzen Inhalt von #app - ohne diesen Zwischenspeicher waren E-Mail und
     Passwort nach jeder Fehlermeldung und jedem Wechsel Anmelden/Konto
     anlegen leer. Liegt nur im Speicher, nie auf der Platte; wird bei jeder
     Anmeldeaenderung geleert (onAuthStateChanged). */
  authEingabe: { name: "", email: "", pass: "" },
  authPassSichtbar: false,
  /* 9 (17.09.2026): fehlender Name beim Registrieren steht direkt am Feld,
     nicht im allgemeinen Fehlerkasten - siehe doRegister/renderAuth. */
  authFeldFehler: null,
  kontoLoeschenBusy: false,  // Konto-Loeschung laeuft (Phase 2)
  /* A3 (1.9.0): der offene Bereich haengt an seiner ID, nicht mehr an einer
     Positionsnummer - siehe currentBereich(). null = noch keiner gewaehlt,
     dann faellt die App auf den ersten Bereich zurueck. */
  bereichId: null,
  tab: "lernen",             // "lernen" | "fortschritt" | "verwalten"
  /* 3.2.0: Unterseiten. Einstellungen und Fortschritt waren Stapel aus sechs
     bzw. neun Bloecken untereinander - jeder mit Ueberschrift und ein paar
     Zeilen Erklaerung, alle gleichzeitig sichtbar. Video 1: ein Bildschirm
     macht EINE Sache; wer etwas Neues zeigen will, nimmt keine neue Zeile,
     sondern eine neue Seite. Beide Bildschirme sind jetzt eine Liste von
     Zeilen, und was frueher darunter stand, steht auf der Seite dahinter.
     null = die Uebersicht selbst. */
  seite: null,               // "sichern" | "einspielen" | "verlauf" | "lektionen" | "leeches" | "vorschau"
  /* Die drei kleinen Entscheidungen (Helligkeit, Schriftgroesse, Karten pro
     Sitzung) brauchen keine eigene Seite - sie haben zwei bis vier Antworten.
     Die kommen als Blatt von unten, mit der Erklaerung dort, wo entschieden
     wird. null = zu. */
  wahlSheet: null,           // "thema" | "arab" | "limit"
  /* 10 (17.09.2026): dieselbe Idee wie wahlSheet, aber pro Speicherkarte statt
     global - die ID der Speicherkarte, deren Art gerade gewaehlt wird, oder
     null = zu. Eigenes Feld statt Wiederverwendung von wahlSheet: die Art
     haengt an einer bestimmten Zeile, nicht an einer app-weiten Einstellung. */
  setArtSheetId: null,
  /* 3.3.1: Das Karten-Formular liegt jetzt in einem Blatt, nicht mehr fest
     oben auf dem Verwalten-Bildschirm. Video 1: "the settings is just
     settings and the notes editor is just a notes editor - we don't throw in
     clutter"; wer etwas anlegen will, bekommt ein Blatt, keine zweite
     Abteilung auf einer Seite, die zum Ansehen da ist. Offen ist das Blatt,
     wenn hier true steht ODER ui.editId gesetzt ist. */
  karteSheet: false,
  /* 9 (17.09.2026): leeres Pflichtfeld beim Kartenformular meldet sich direkt
     am Feld, nicht im Dialog - siehe submitCardForm/karteSheet(). */
  karteFeldFehler: null,
  statsScope: "alle",        // "alle" = alle Bereiche zusammen, "bereich" = nur der offene
  session: null,
  editId: null,
  /* 16.09.2026: Die Detailansicht einer Karte in Verwalten (Beobachtung 1) -
     eine Karten-ID, oder null = geschlossen. Eigenes Feld statt Wiederverwendung
     von editId: Ansehen und Bearbeiten sind unterschiedliche Handlungen, die
     Ansicht soll nicht ungefragt in den Bearbeiten-Modus wechseln. */
  cardDetailId: null,
  askImport: false,          // alte lokale Daten anbieten
  searchQuery: "",           // Suchtext im Verwalten-Tab (nicht gespeichert, nur UI-Zustand)
  searchAll: false,          // D7: false = nur dieser Bereich, true = alle Bereiche
  kartenSeite: 0,            // C2: angezeigte Seite der Kartenliste (nur UI-Zustand)
  umzug: null,               // C1: { laeuft, fertig, gesamt, fehler } waehrend des Datenumzugs
  dialog: null,              // D2: { kind, title, text, value, okLabel, danger, resolve }
  selectMode: false,          // Mehrfachauswahl im Verwalten-Tab aktiv?
  selectedIds: new Set(),     // ausgewählte Karten-IDs
  /* 2.4.0: Der Modus "Lernen" - eine Durchsicht statt einer Abfrage.
     lernSetId = die Speicherkarte, die gerade durchgegangen wird (oder null).
     lernOffen = welche Notizen aufgeklappt sind.
     lernLetzte = die zuletzt abgehakte Karte, fuer "Rückgängig". */
  lernSetId: null,
  lernOffen: new Set(),
  lernLetzte: null,
  /* Nach welcher Karte als naechstes in den Blick gescrollt werden soll:
     eine Karten-Nummer, "__start__" beim Oeffnen, oder null = nicht scrollen.
     Steht hier statt in einer eigenen Variablen weiter unten, damit die
     Reihenfolge im Skript keine Rolle spielt. */
  lernFokusNach: null,
  /* 2.14.1: Die Karten, die man sich in DIESER Runde gemerkt hat. Sie stehen
     absichtlich nicht in ui.session: Wer mitten im Lernen den Tab wechselt,
     beendet damit die Sitzung - der Hinweis am Ende waere dann fuer immer
     verloren. So wartet er im Lernen-Tab, bis er benutzt wurde. */
  gemerktRunde: new Set(),
  /* 2.21.5: Die Karten-ID, deren Merken-Stern gerade die Pop-Animation
     abspielen soll - einmal gesetzt in karteMerken(), einmal gelesen und
     sofort geloescht in der Zeile, die den Knopf zeichnet. Dasselbe Muster
     wie springZu/lernFokusNach: ohne das "sofort loeschen" wuerde der Stern
     bei jedem folgenden Neuzeichnen erneut poppen, nicht nur beim Antippen. */
  merkPop: null,
  /* 2.10.0: Ziel eines Sprungs. Wer eine Aktion ausloest, die woanders auf
     der Seite etwas veraendert, soll dorthin mitgenommen werden - genau das
     Muster, das der Adrabic-Trainer bei der Checkliste benutzt. */
  springZu: null,
  springOben: false,
  /* 2.19.0: Einstellungen sind ein eigener Bildschirm, kein vierter Reiter.
     Ein Reiter ist ein Ort, an den man oft geht; hierher geht man selten. */
  einstellungen: false,
  drillOpen: false,           // Auswahl für Übungsmodus sichtbar?
  drillSource: "stufen",      // "stufen" oder "sets" (siehe drillSetIds)
  drillSetIds: new Set(),     // 2.21.0: im "sets"-Modus die angehakten Speicherkarten (mehrere möglich)
  /* 10 (17.09.2026): der Stufenbereich als Chip-Reihe statt zweier
     Klapplisten - von/bis stehen direkt hier, nicht mehr in zwei <select>.
     drillAnker ist der erste angetippte Wert des laufenden Zwei-Tipp-Vorgangs;
     null = der naechste Tipp startet eine neue Auswahl. Siehe waehleStufe(). */
  drillVon: null,
  drillBis: null,
  drillAnker: null,
  openSetId: null,            // Speicherkarte, deren Kartenliste aufgeklappt ist
  /* 18.09.2026, Smart Defaults (Video 3, PRINZIPIEN.md: "passt"): Wer schon
     einmal in einer Sitzung Karten in eine bestehende Speicherkarte gelegt
     hat, will beim naechsten Mal meist dieselbe wieder treffen - "＋ Neue
     Speicherkarte" war bisher IMMER die Vorauswahl, obwohl das der seltenere
     Fall ist. Nur Session-Zustand, bewusst nicht gespeichert (wie openSetId). */
  zuletztSetId: null,
  /* 2.2.0: Das Feld mit den Speicherkarten ist beim Start zugeklappt. Es
     wuchs sonst mit jeder neuen Speicherkarte weiter nach unten und schob
     Suchfeld und Kartenliste aus dem Bild. Bewusst NICHT gespeichert: nach
     jedem Start ist es wieder zu, das ist der Normalfall. */
  setsOffen: false,
  setsArtWahl: false,        // 2.5.0: Arten vergeben (nur Autor, eigener Bereich)
  /* 3.0.0: Das Bereichs-Sheet. Ersetzt die waagerecht scrollende Pill-Reihe
     ueber dem Lernstoff. Bewusst NICHT gespeichert - beim naechsten Start
     ist es wieder zu, das ist der Normalfall. */
  bereichSheet: false,
  /* Nachlese Video 1 (18.09.2026): die Werkzeugleiste in Verwalten zeigte
     bisher bis zu fünf Handlungen dauerhaft auf einmal. "Üben" bleibt sichtbar
     (die Handlung, für die man diesen Bildschirm meist aufruft); die drei
     seltenen/gefährlichen (Umkehren, Umbenennen, Löschen) und "Auswählen"
     stehen jetzt in diesem Blatt, das nur bei Bedarf kommt. */
  bereichMehr: false,
  /* 3.0.0: Kurze Rueckmeldung fuer Handlungen, die bisher stumm waren
     (Backup heruntergeladen, Reihenfolge umgekehrt). { text, bis }.
     Ausdruecklich NUR fuer Erfolge: Was anhaelt - ein Schreibfehler, eine
     abgerissene Verbindung - gehoert in ein Banner, das stehen bleibt, nicht
     in eine Meldung, die von selbst verschwindet. */
  toast: null,
};

/* ---------- 3.0.0: Toast ----------
   Hoechstens einer gleichzeitig; ein neuer verdraengt den alten. Der Timer
   loest ein render() aus, mehr braucht es nicht - die Meldung steht in ui
   und verschwindet damit von selbst aus dem naechsten Aufbau. */
let toastTimer = null;
function zeigeToast(text) {
  ui.toast = { text: text };
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastTimer = null;
    ui.toast = null;
    render();
  }, 2600);
  render();
}
function renderToast() {
  if (!ui.toast) return "";
  return '<div class="toast-wrap"><div class="toast" role="status" aria-live="polite">' +
    ikon("fertig", "i-sm") + '<span>' + esc(ui.toast.text) + '</span></div></div>';
}

/* ---------- Formular-Entwurf ----------
   render() baut das gesamte DOM neu. Ohne diesen Zwischenspeicher waere jede
   halb getippte Vokabel weg, sobald irgendetwas anderes ein render() ausloest -
   zum Beispiel ein Datensatz, der aus der Cloud hereinkommt. */
let formDraft = { wort: "", ueb: "", extra: "" };
function resetFormDraft() { formDraft = { wort: "", ueb: "", extra: "" }; ui.karteFeldFehler = null; }

/* 16.09.2026 (Beobachtung 3): Wohin nach dem Bearbeiten einer Karte
   zurueckgesprungen wird. editCard() springt zum Formular an den
   Seitenanfang - ohne diese Merker blieb man nach dem Speichern/Abbrechen
   dort stehen und musste erneut zur naechsten Karte herunterscrollen. Nur
   fuer Bearbeiten (bestehende Karte) gesetzt, nicht fuers Neuanlegen: Dort
   ist der Seitenanfang der richtige Ort fuer die naechste Eingabe (D1). */
let editRueckkehrY = null;

/* ---------- Handschrift-Canvas-Zustand (bleibt über Re-Renders erhalten,
   da render() das DOM inkl. Canvas bei jeder Aktion neu aufbaut) ---------- */
let hwStrokes = [];
let hwFullscreen = false;
let hwDrawing = false;   // true waehrend eines Handschrift-Strichs; siehe Rand-Scrollen weiter unten

/* ---------- Alte lokale Daten (Offline-Version) ---------- */
const OLD_STORAGE_KEY = "lernkarten-app-v1";
function oldLocalProfiles() {
  try {
    const raw = localStorage.getItem(OLD_STORAGE_KEY);
    if (!raw) return [];
    const s = JSON.parse(raw);
    if (!s || typeof s !== "object" || !s.profiles || typeof s.profiles !== "object") return [];
    return Object.keys(s.profiles).filter(n => {
      const p = s.profiles[n];
      return p && typeof p === "object" && p.bereiche && typeof p.bereiche === "object";
    });
  } catch (e) { return []; }
}
function importOldProfile(name) {
  try {
    const s = JSON.parse(localStorage.getItem(OLD_STORAGE_KEY));
    const p = s.profiles[name];
    const arr = [];
    for (const bn of Object.keys(p.bereiche)) {
      if (Array.isArray(p.bereiche[bn])) arr.push({ name: bn, karten: p.bereiche[bn] });
    }
    bereiche = normBereiche(arr);
  } catch (e) {
    bereiche = normBereiche(null);
  }
  ui.askImport = false;
  ui.bereichId = bereiche[0].id;
  persistAll();
  render();
}

/* ---------- Firebase ---------- */
/* C1 (2.0.0): Karten liegen nicht mehr als Unterfelder IM Nutzerdokument,
   sondern jede Karte als eigenes Dokument in users/{uid}/karten. Grund: Ein
   Firestore-Dokument darf hoechstens 1 MiB gross werden - bei etwa 5.000 bis
   7.000 Karten war Schluss, und zwar hart: ab da liesse sich keine Karte mehr
   anlegen. Als eigene Dokumente gibt es diese Grenze nicht mehr.

   Aufbau ab jetzt:
     users/{uid}                     name, streak, settings, schemaVersion
     users/{uid}/bereiche/{bid}      name, order, sets
     users/{uid}/karten/{cid}        bereichId + die Felder der Karte

   Die Karten liegen FLACH, mit dem Bereich als Feld - nicht unterhalb des
   Bereichs. Dadurch ist die Suche ueber alle Bereiche eine einzige Abfrage,
   und das Verschieben einer Karte aendert nur ein Feld statt Kopieren und
   Loeschen.

   Geladen werden weiterhin alle Karten des Nutzers auf einmal. Nur die
   faelligen zu laden waere erst bei Zehntausenden Karten ein Gewinn und
   muesste Fortschritt, Suche, Duplikatpruefung und Export mit umbauen. Die
   Struktur laesst das jederzeit nachtraeglich zu, ohne die Daten noch einmal
   umzuziehen. */
const SCHEMA_VERSION = 2;

let auth = null, db = null, userDocRef = null;
let bereicheColRef = null, kartenColRef = null;
let unsubscribeSnapshot = null, unsubBereicheSnap = null, unsubKartenSnap = null;
let fb = {}; // Firestore-/Auth-Funktionen nach dem Laden

/* Phase 2: Waehrend die Konto-Loeschung laeuft, darf keine der
   "not-found -> Dokument neu anlegen"-Stellen mehr anspringen (Snapshot-
   Handler, schreibeInsNutzerdokument, persistVerlauf). Ohne diese Sperre
   schreibt die App das geraede geloeschte Nutzerdokument sich selbst
   wieder hin, weil ein fehlendes Dokument fuer sie sonst "frisches Konto,
   erster Start" bedeutet. */
let kontoWirdGeloescht = false;

/* Rohstaende der beiden Sammlungen. Die Anzeige braucht beide, deshalb wird
   erst zusammengesetzt, wenn von jeder mindestens ein Stand da ist - sonst
   blitzte kurz eine Liste ohne Karten auf. */
let rohBereiche = null;
let rohKarten = null;
let sammlungenGestartet = false;
let umzugBereiche = null;   // alter Datenstand, nur waehrend des Umzugs

function listenerLoesen() {
  if (unsubscribeSnapshot) { unsubscribeSnapshot(); unsubscribeSnapshot = null; }
  if (unsubBereicheSnap) { unsubBereicheSnap(); unsubBereicheSnap = null; }
  if (unsubKartenSnap) { unsubKartenSnap(); unsubKartenSnap = null; }
}

/* ---------- 2.11.4: veralteter Anmelde-Ausweis ----------
   Die Sicherheitsregeln verlangen eine bestaetigte E-Mail. Firestore prueft
   das aber nicht am Konto, sondern an dem Ausweis (ID-Token), den der Browser
   mitschickt - und darin steht email_verified so, wie es beim Anmelden war.

   Wer sich anmeldet und ERST DANACH den Link in der Mail anklickt, hat
   deshalb einen Moment, in dem die App ihn hereinlaesst (sie sieht die
   Bestaetigung sofort), die Datenbank ihn aber abweist. Bis zu einer Stunde
   lang, bis der Ausweis von selbst erneuert wird. Fuer den Betroffenen sieht
   das aus wie ein kaputtes Konto.

   Deshalb: Bei "Zugriff verweigert" und bestaetigter E-Mail einmal einen
   frischen Ausweis holen und die Seite neu laden. Der Merker in
   sessionStorage sorgt dafuer, dass das genau einmal je Sitzung passiert -
   liegt es doch an den Regeln, entsteht keine Endlosschleife, sondern die
   Meldung bleibt stehen. */
const TOKEN_ERNEUERT_KEY = "adrabic-token-erneuert";
function ausweisErneuernUndNeuLaden() {
  let schonVersucht = false;
  try { schonVersucht = sessionStorage.getItem(TOKEN_ERNEUERT_KEY) === "1"; } catch (e) {}
  if (schonVersucht || !currentUser || !currentUser.emailVerified) return false;
  try { sessionStorage.setItem(TOKEN_ERNEUERT_KEY, "1"); } catch (e) {}
  currentUser.getIdToken(true)
    .then(() => { location.reload(); })
    .catch(() => { render(); });
  return true;
}
/* 17.09.2026: derselbe veraltete Ausweis trifft auch das SCHREIBEN, nicht nur
   das Laden - saveFehler() zeigte dafuer bisher nur den rohen Fehlercode und
   den Rat, ein Backup herunterzuladen, ohne je den Ausweis zu erneuern. Ein
   Neuladen wie beim Lesen ist hier aber die falsche Medizin: Es wuerde eine
   noch nicht gespeicherte Karte im offenen Formular mitreissen. Deshalb nur
   der Ausweis-Refresh, ohne reload - die naechsten Schreibversuche nutzen ihn
   automatisch, weil Firebase Auth und Firestore denselben Ausweis-Cache
   teilen. Eigener Merker, unabhaengig vom Lese-Merker: Je nachdem, was zuerst
   ausgeloest wird (ein Listener oder ein Schreibvorgang), soll trotzdem genau
   einmal erneuert werden. */
const TOKEN_ERNEUERT_SCHREIBEN_KEY = "adrabic-token-erneuert-schreiben";
function ausweisErneuernFuerSchreiben() {
  let schonVersucht = false;
  try { schonVersucht = sessionStorage.getItem(TOKEN_ERNEUERT_SCHREIBEN_KEY) === "1"; } catch (e) {}
  if (schonVersucht || !currentUser || !currentUser.emailVerified) return false;
  try { sessionStorage.setItem(TOKEN_ERNEUERT_SCHREIBEN_KEY, "1"); } catch (e) {}
  currentUser.getIdToken(true).catch(() => {});
  return true;
}
function snapFehler(err) {
  if (err && err.code === "permission-denied") {
    if (ausweisErneuernUndNeuLaden()) {
      syncError = "Anmeldung wird erneuert…";
      render();
      return;
    }
    syncError = currentUser && !currentUser.emailVerified
      ? "Zugriff verweigert – die E-Mail ist noch nicht bestätigt."
      : "Zugriff verweigert. Melde dich einmal ab und wieder an – hilft das nicht, stimmen die Sicherheitsregeln in Firebase nicht.";
  } else {
    syncError = "Verbindungsproblem beim Laden der Daten.";
  }
  render();
}

/* Setzt aus den beiden Sammlungen die Liste zusammen, mit der die App
   arbeitet - dieselbe Form wie bisher, damit Lernen, Fortschritt, Suche und
   Export unveraendert weiterlaufen. */
function bereicheAusSammlungen(bDocs, kDocs) {
  const nachBereich = new Map();
  for (const b of bDocs) nachBereich.set(b.id, []);
  for (const k of kDocs) {
    const liste = nachBereich.get(k.bereichId);
    /* Karten, deren Bereich es nicht mehr gibt, werden nicht angezeigt. Das
       kann vorkommen, wenn das Loeschen eines Bereichs mittendrin abbricht -
       sie tauchen sonst nirgends auf und wuerden nur die Zaehlung verfaelschen. */
    if (liste) liste.push(k);
  }
  const list = bDocs.map(b => {
    const karten = (nachBereich.get(b.id) || [])
      .map(k => ({ card: normCard(k), ord: Number.isFinite(k.order) ? k.order : 0 }))
      .sort((x, y) => x.ord - y.ord).map(x => x.card);
    const setsMap = b.sets && typeof b.sets === "object" ? b.sets : {};
    const sets = Object.keys(setsMap).map(sid => {
      const st = setsMap[sid] || {};
      return { set: normSet({ id: sid, name: st.name, art: st.art, quelleId: st.quelleId, cardIds: st.cardIds }), ord: Number.isFinite(st.order) ? st.order : 0 };
    }).sort((x, y) => x.ord - y.ord).map(x => x.set);
    return {
      id: b.id,
      name: typeof b.name === "string" && b.name ? b.name.slice(0, 40) : "Vokabeln",
      gefuehrt: b.gefuehrt === true,
      satzId: typeof b.satzId === "string" && b.satzId ? b.satzId : null,
      satzVersion: Number.isInteger(b.satzVersion) ? b.satzVersion : 0,
      karten: karten, sets: sets,
      order: Number.isFinite(b.order) ? b.order : 0
    };
  }).sort((x, y) => x.order - y.order).map(({ order, ...rest }) => rest);
  return list.length ? list : [{ id: genId(), name: "Vokabeln", karten: [], sets: [] }];
}

function datenZusammenbauen() {
  if (rohBereiche === null || rohKarten === null) return;
  bereiche = bereicheAusSammlungen(rohBereiche, rohKarten);
  /* A3: nur zuruecksetzen, wenn der offene Bereich wirklich weg ist. */
  if (!bereiche.some(b => b.id === ui.bereichId)) ui.bereichId = bereiche[0].id;
  syncError = null;
  if (ladeTimer) { clearTimeout(ladeTimer); ladeTimer = null; }
  ladeLangsam = false;
  evaluateStreakForNewDay();
  render();
  /* Lehrer-Modus, Kernablauf: erst hier ist bereiche wirklich geladen (nicht
     schon nach sammlungenStarten()) - verarbeiteImportDaten() braucht das.
     Die Funktion selbst sorgt dafuer, dass sie trotz mehrerer
     Schnappschuesse nur einmal wirklich etwas tut. */
  teilLinkPruefenUndVerarbeiten();
}

function sammlungenStarten() {
  if (sammlungenGestartet || !bereicheColRef) return;
  sammlungenGestartet = true;
  /* Anders als beim Nutzerdokument werden hier auch Staende mit eigenen,
     noch nicht bestaetigten Schreibvorgaengen uebernommen. Sie enthalten
     genau die Aenderung, die gerade lokal gemacht wurde - wuerde man sie
     ueberspringen, verschwaende eine gerade angelegte Karte kurz wieder aus
     der Liste, sobald die andere Sammlung einen Stand meldet. */
  unsubBereicheSnap = fb.onSnapshot(bereicheColRef, snap => {
    rohBereiche = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    datenZusammenbauen();
  }, snapFehler);
  unsubKartenSnap = fb.onSnapshot(kartenColRef, snap => {
    rohKarten = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    datenZusammenbauen();
  }, snapFehler);
}

/* 16.09.2026: "Failed to fetch dynamically imported module" nach
   Browser-Zurueck von Impressum/Datenschutz (Beobachtung 16) blieb
   bestehen, obwohl die Selbstheilung (kompletter Reload samt SW-/Cache-
   Loeschung) inzwischen zwei automatische Versuche bekommt (v3.0.42) - der
   Fehler kam laut Rueckmeldung trotzdem wieder. Das bedeutet: Ein voller
   Neuladen loest es NICHT zuverlaessig, also ist es vermutlich kein
   Cache-/Service-Worker-Problem, sondern ein tatsaechlicher, einzelner
   Netzwerk-Haenger genau bei diesem einen Abruf (z.B. weil der Browser
   Ressourcen waehrend einer Zurueck-Navigation kurzzeitig anders
   priorisiert). Ein voller Seiten-Reload ist dafuer die teuerste moegliche
   Antwort - bevor die Selbstheilung ueberhaupt greift, versucht diese
   Funktion denselben einzelnen Abruf erst noch zweimal, mit kurzer Pause,
   an genau der Stelle, an der er fehlschlug. Deutlich billiger und
   schneller als ein Reload, und trifft die Ursache direkter, falls es
   wirklich nur ein kurzer Haenger war. */
async function importMitVersuch(url, versuche, wartenMs) {
  for (let i = 1; i <= versuche; i++) {
    try { return await import(url); }
    catch (e) {
      if (i === versuche) throw e;
      await new Promise(r => setTimeout(r, wartenMs));
    }
  }
}

async function initFirebase() {
  const { initializeApp } = await importMitVersuch("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js", 3, 500);
  const authMod = await importMitVersuch("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js", 3, 500);
  const fsMod = await importMitVersuch("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js", 3, 500);
  fb = { ...authMod, ...fsMod };

  const fbApp = initializeApp(firebaseConfig);
  auth = fb.getAuth(fbApp);
  try {
    db = fb.initializeFirestore(fbApp, { localCache: fb.persistentLocalCache() });
  } catch (e) {
    db = fb.getFirestore(fbApp); // Fallback ohne Offline-Cache
  }

  fb.onAuthStateChanged(auth, user => {
    currentUser = user;
    listenerLoesen();
    bereiche = null;
    rohBereiche = null;
    rohKarten = null;
    sammlungenGestartet = false;
    if (ladeTimer) { clearTimeout(ladeTimer); ladeTimer = null; }
    ladeLangsam = false;
    umzugBereiche = null;
    streak = normStreak(null);
    settings = normSettings(null);
    verlauf = {};
    verlaufEigene = new Set();
    cloudDocExists = false;
    ui.session = null;
    ui.editId = null;
    ui.authEingabe = { name: "", email: "", pass: "" };
    ui.authFeldFehler = null;
    ui.authPassSichtbar = false;
    ui.askImport = false;
    ui.umzug = null;
    ui.einstellungen = false;
    if (user) {
      displayName = user.displayName || (user.email ? user.email.split("@")[0] : "Lernende:r");
      userDocRef = fb.doc(db, "users", user.uid);
      bereicheColRef = fb.collection(userDocRef, "bereiche");
      kartenColRef = fb.collection(userDocRef, "karten");
      unsubscribeSnapshot = fb.onSnapshot(userDocRef, snap => {
        /* 18.09.2026, Serie "aendert sich unberechenbar": Diese Zeile sollte
           nur das Echo der EIGENEN, in dieser Sitzung schon verarbeiteten
           Schreibaktion ignorieren (sonst wuerde jede eigene Aenderung den
           Handler doppelt durchlaufen). Sie blockte bisher aber auch die
           ALLERERSTE Momentaufnahme nach einem Neustart, wenn zu diesem
           Zeitpunkt noch ein ungesendeter Schreibvorgang vom letzten Mal in
           Firestores eigenem Offline-Speicher lag (z.B. App im Flugmodus
           geschlossen, bevor der heutige Lerntag den Server erreichte).
           Ergebnis: verlauf/streak blieben auf ihrem frisch zurueckgesetzten
           Leerzustand haengen (serieAktuell() zeigte 0/Standard), bis der
           Schreibvorgang irgendwann online ging und ein zweiter, "sauberer"
           Schnappschuss nachkam - die Serie schien sich von selbst zu
           aendern, ohne dass am Kartenbestand etwas geschah. cloudDocExists
           ist erst NACH der ersten wirklich verarbeiteten Momentaufnahme
           dieser Sitzung wahr; solange es falsch ist, gibt es nichts
           Frischeres zu schuetzen, also wird auch eine noch ausstehende
           Momentaufnahme diesmal verarbeitet statt verworfen. */
        if (snap.metadata.hasPendingWrites && cloudDocExists) return; // eigenes Echo ignorieren
        if (kontoWirdGeloescht) return; // Konto loeschung: kein automatisches Neuanlegen
        const data = snap.data();
        syncError = null;
        if (!data) {
          cloudDocExists = false;
          bereiche = normBereiche(null);
          streak = normStreak(null);
          ui.askImport = oldLocalProfiles().length > 0;
          if (!ui.askImport) persistAll(); // leeres Startdokument anlegen
          evaluateStreakForNewDay();
          render();
          return;
        }
        cloudDocExists = true;
        /* Es klappt wieder - der einmalige Erneuerungsversuch steht der
           naechsten Sitzung damit wieder zur Verfuegung. */
        try { sessionStorage.removeItem(TOKEN_ERNEUERT_KEY); } catch (e) {}
        if (typeof data.name === "string" && data.name) displayName = data.name;
        settings = normSettings(data.settings);
        themaAnwenden();          // 2.20.0: gilt auch auf einem neuen Gerät sofort
        streak = normStreak(data.streak);
        const wolkenVerlauf = normVerlauf(data.verlauf);
        verlauf = verlaufZusammen(verlauf, wolkenVerlauf);
        verlaufNachschicken(wolkenVerlauf);
        verlaufAufraeumen(data.verlauf);
        serieSockelSichern();
        if (data.schemaVersion === SCHEMA_VERSION) {
          ui.umzug = null;
          sammlungenStarten();
          evaluateStreakForNewDay();
          render();
          return;
        }
        /* Daten liegen noch im alten Format. Ab hier wird nichts geschrieben,
           bis der Umzug durch ist - sonst entstuenden zwei Staende, von denen
           keiner vollstaendig ist. */
        umzugBereiche = Array.isArray(data.bereiche)
          ? normBereiche(data.bereiche)
          : (data.bereiche && typeof data.bereiche === "object" ? bereicheMapToArray(data.bereiche) : normBereiche(null));
        /* Der Umzug laeuft von selbst los. Ein Knopf mit Erklaerung davor
           haette bedeutet, dass jeder, der die App benutzt, erst verstehen
           muss, was ein Datenformat ist. Ein erzwungenes Backup ist auch
           nicht noetig: Der alte Datensatz wird nicht angeruehrt und liegt
           danach unveraendert daneben.
           ui.umzug dient zugleich als Sperre - der Schnappschuss kann
           mehrfach kommen, gestartet wird trotzdem nur einmal. */
        if (!ui.umzug) {
          ui.umzug = { laeuft: false, fertig: 0, gesamt: 0, fehler: null };
          render();
          umzugStarten();
          return;
        }
        render();
      }, snapFehler);
    }
    render();
  });
}

let saveWarned = false;
/* 2.11.3: Ein fehlgeschlagener Schreibvorgang meldete sich EINMAL und war
   danach fuer den Rest der Sitzung stumm. Wer die erste Meldung wegtippte,
   lernte weiter im guten Glauben, alles werde gespeichert - waehrend nichts
   mehr ankam. Deshalb bleibt jetzt eine Zeile oben stehen, solange es klemmt.

   Offline ist ausdruecklich KEIN Fehlerfall: Firestore nimmt Schreibvorgaenge
   entgegen und schickt sie los, sobald die Verbindung wieder steht. Hier
   landen nur echte Ablehnungen (fehlende Rechte, kaputte Daten). */
let schreibFehler = null;
let schreibFehlerAusweisErneuert = false;
function saveFehler(e) {
  schreibFehler = (e && e.code) ? e.code : "unbekannter Fehler";
  if (schreibFehler === "permission-denied" && ausweisErneuernFuerSchreiben()) {
    schreibFehlerAusweisErneuert = true;
    render();
    return;
  }
  if (saveWarned) { render(); return; }
  saveWarned = true;
  dlgAlert("Speichern in der Cloud fehlgeschlagen (" + schreibFehler + "). Änderungen werden erneut versucht, sobald die Verbindung steht.", "Cloud nicht erreichbar");
}
function schreibErfolg() { saveWarned = false; if (schreibFehler) { schreibFehler = null; render(); } }

/* ---------- A4 (1.9.0): gezielt schreiben statt alles ueberschreiben ----------

   Bis 1.8.1 rief fast jede Aktion persist() auf, und persist() schrieb das
   GANZE Nutzerdokument neu - mit dem Stand, den genau dieses Geraet gerade im
   Speicher hatte. Wer auf dem Handy eine Karte anlegte, waehrend der Laptop
   noch den alten Stand offen hatte, verlor sie beim naechsten Klick am Laptop
   wieder. Ohne Fehlermeldung, ohne dass es auffiel. Fuers Bewerten war das mit
   persistCardGrade() schon geloest; jetzt gilt es fuer jede Aenderung.

   Ab hier gibt es genau drei Schreibwege:
     patchDoc()        - der Normalfall: nur die genannten Feldpfade
     persistCardGrade()- das Bewerten in der Lernsession (unveraendert)
     persistAll()      - nur noch beim ERSTEN Anlegen des Dokuments und beim
                         einmaligen Umzug alter Datenstaende

   Feldpfade sind zusammengesetzt aus den IDs: "bereiche.<bid>.karten.<cid>".
   IDs kommen aus genId() und bestehen nur aus Ziffern und Kleinbuchstaben -
   sie brauchen deshalb keine Maskierung im Pfad. */

function pfadBereich(bid) { return "bereiche." + bid; }
function pfadKarte(bid, cid) { return "bereiche." + bid + ".karten." + cid; }
function pfadSet(bid, sid) { return "bereiche." + bid + ".sets." + sid; }

/* Die Reihenfolge steckt im Feld "order". Aendert eine Aktion die Position
   MEHRERER Karten (Ziehen, Umkehren, Verschieben), werden genau diese
   order-Felder neu geschrieben - und sonst nichts an den Karten. Wort,
   Stufe und Faelligkeit eines anderen Geraets bleiben unberuehrt.

   "ausser" ist noetig, weil Firestore eine Aktualisierung ablehnt, in der ein
   Feldpfad im anderen steckt: Wer eine Karte komplett schreibt, darf ihr
   ".order" nicht zusaetzlich einzeln setzen. */
function ordnungPatch(b, patch, ausser) {
  const p = patch || {};
  const skip = ausser instanceof Set ? ausser : new Set();
  b.karten.forEach((c, i) => {
    if (!skip.has(c.id)) p[pfadKarte(b.id, c.id) + ".order"] = i;
  });
  return p;
}
/* Neue Karten stehen oben in der Liste. Statt dafuer die Ordnungszahl ALLER
   Karten neu zu schreiben (bei 500 Vokabeln 500 Felder pro neuer Karte),
   bekommt die neue Karte eine Zahl unterhalb von null: je spaeter angelegt,
   desto kleiner, also desto weiter vorn. Sortiert wird nach dem Wert, nicht
   nach einer luekenlosen Zaehlung - beim naechsten Ziehen oder Umkehren
   normalisiert ordnungPatch() ohnehin wieder auf 0, 1, 2, ... */
function ordnungVorn() { return -Date.now(); }

/* C1: Die Aufrufer oben bauen weiterhin Feldpfade wie
   "bereiche.<bid>.karten.<cid>.stufe". patchDoc uebersetzt sie in
   Schreibvorgaenge auf die richtigen Dokumente. Bewusst so herum: Damit
   bleiben rund vierzig Aufrufstellen unveraendert, und der Umbau steckt an
   einer Stelle, die sich pruefen laesst. */
const LOESCHEN = { __loeschen: true };   // Ersatz fuer deleteField() in Patches
function istLoeschung(w) { return w === LOESCHEN; }

function bereichRef(bid) { return fb.doc(bereicheColRef, bid); }
function karteRef(cid) { return fb.doc(kartenColRef, cid); }

/* Setzt einen gepunkteten Feldpfad in ein verschachteltes Objekt. Wird nur
   gebraucht, wenn im selben Patch ein Bereich komplett geschrieben UND ein
   einzelnes Unterfeld gesetzt wird - dann muss das Unterfeld ins Objekt,
   nicht als Pfad daneben, weil ein set() Punkte nicht auswertet. */
function tiefSetzen(obj, pfad, wert) {
  const teile = pfad.split(".");
  let ziel = obj;
  for (let i = 0; i < teile.length - 1; i++) {
    if (!ziel[teile[i]] || typeof ziel[teile[i]] !== "object") ziel[teile[i]] = {};
    ziel = ziel[teile[i]];
  }
  ziel[teile[teile.length - 1]] = wert;
}

async function patchDoc(patch) {
  if (!userDocRef || bereiche === null) return;
  if (!patch || Object.keys(patch).length === 0) return;

  /* Ein Dokument darf im selben Schwung nur einmal vorkommen. Beim
     Verschieben einer Karte steht im Patch erst ein Loeschen im Quellbereich
     und dann ein Schreiben im Zielbereich - fuer dasselbe Dokument. Der
     letzte Eintrag gewinnt, und das ist genau richtig: die Karte wird
     geschrieben, mit dem neuen bereichId. */
  const ops = new Map();
  const bereichLoeschungen = [];

  const merken = (schluessel, ref, art, daten) => {
    const da = ops.get(schluessel);
    if (art === "update" && da && (da.art === "set" || da.art === "update")) {
      for (const k of Object.keys(daten)) {
        if (da.art === "set") tiefSetzen(da.daten, k, daten[k]);
        else da.daten[k] = daten[k];
      }
      return;
    }
    ops.set(schluessel, { ref: ref, art: art, daten: daten });
  };

  for (const schluessel of Object.keys(patch)) {
    const wert = patch[schluessel];
    const teile = schluessel.split(".");
    if (teile[0] !== "bereiche" || teile.length < 2) continue;
    const bid = teile[1];

    if (teile.length === 2) {                       // ganzer Bereich
      if (istLoeschung(wert)) {
        bereichLoeschungen.push(bid);
        ops.set("b/" + bid, { ref: bereichRef(bid), art: "delete", daten: null });
        continue;
      }
      const { karten, ...rest } = (wert || {});
      merken("b/" + bid, bereichRef(bid), "set", rest);
      const km = karten && typeof karten === "object" ? karten : {};
      for (const cid of Object.keys(km)) {
        merken("k/" + cid, karteRef(cid), "set", { ...km[cid], bereichId: bid });
      }
      continue;
    }

    if (teile[2] === "karten" && teile.length >= 4) {
      const cid = teile[3];
      if (teile.length === 4) {
        if (istLoeschung(wert)) { ops.set("k/" + cid, { ref: karteRef(cid), art: "delete", daten: null }); continue; }
        merken("k/" + cid, karteRef(cid), "set", { ...wert, bereichId: bid });
      } else {
        merken("k/" + cid, karteRef(cid), "update", { [teile.slice(4).join(".")]: wert });
      }
      continue;
    }

    if (teile[2] === "sets" && teile.length >= 4) {
      /* Speicherkarten bleiben Unterfelder IM Bereichsdokument - sie
         enthalten nur Karten-IDs und werden nie gross. */
      const feldpfad = teile.slice(2).join(".");
      merken("b/" + bid, bereichRef(bid), "update", { [feldpfad]: istLoeschung(wert) ? fb.deleteField() : wert });
      continue;
    }

    if (teile.length === 3) {                       // z.B. bereiche.<bid>.name
      merken("b/" + bid, bereichRef(bid), "update", { [teile[2]]: istLoeschung(wert) ? fb.deleteField() : wert });
    }
  }

  const liste = [...ops.values()];
  try {
    /* Ein Stapel fasst hoechstens 500 Vorgaenge. 400 laesst Luft. */
    for (let i = 0; i < liste.length; i += 400) {
      const stapel = fb.writeBatch(db);
      for (const op of liste.slice(i, i + 400)) {
        if (op.art === "delete") stapel.delete(op.ref);
        else if (op.art === "set") stapel.set(op.ref, op.daten);
        else stapel.update(op.ref, op.daten);
      }
      await stapel.commit();
    }
    /* Firestore loescht Unter-Sammlungen NICHT mit. Die Karten eines
       geloeschten Bereichs muessen einzeln weg, sonst bleiben sie fuer immer
       liegen und zaehlen bei jedem Start als Leseeinheit mit. */
    for (const bid of bereichLoeschungen) await kartenEinesBereichsLoeschen(bid);
    schreibErfolg();
  } catch (e) {
    /* Es gibt nichts zu aendern, weil das Dokument (noch) nicht existiert -
       etwa direkt nach dem Anlegen des Kontos. Dann einmal komplett anlegen. */
    if (e && e.code === "not-found") { if (kontoWirdGeloescht) return; persistAll(); return; }
    saveFehler(e);
  }
}

async function kartenEinesBereichsLoeschen(bid) {
  if (!kartenColRef) return;
  try {
    const treffer = await fb.getDocs(fb.query(kartenColRef, fb.where("bereichId", "==", bid)));
    const docs = treffer.docs;
    for (let i = 0; i < docs.length; i += 400) {
      const stapel = fb.writeBatch(db);
      docs.slice(i, i + 400).forEach(d => stapel.delete(d.ref));
      await stapel.commit();
    }
  } catch (e) { saveFehler(e); }
}

/* Vollstaendiges Schreiben. Bewusst nur wenige Aufrufer, alle mit demselben
   Merkmal: Es gibt noch keinen fremden Stand, der verloren gehen koennte.
   Das Nutzerdokument wird mit merge geschrieben - damit bleibt das alte Feld
   "bereiche" als Sicherheitsnetz liegen, bis es in einer spaeteren Version
   entfernt wird. */
async function persistAll() {
  if (!userDocRef || bereiche === null) return;
  try {
    await fb.setDoc(userDocRef, {
      name: displayName, streak: streak, settings: settings, schemaVersion: SCHEMA_VERSION
    }, { merge: true });
    const ops = [];
    bereiche.forEach((b, bi) => {
      const felder = bereichFelder(b, bi);
      ops.push({ ref: bereichRef(b.id), daten: { name: felder.name, order: felder.order, sets: felder.sets } });
      b.karten.forEach((c, ci) => ops.push({ ref: karteRef(c.id), daten: { ...kartenFelder(c, ci), bereichId: b.id } }));
    });
    for (let i = 0; i < ops.length; i += 400) {
      const stapel = fb.writeBatch(db);
      ops.slice(i, i + 400).forEach(o => stapel.set(o.ref, o.daten));
      await stapel.commit();
    }
    schreibErfolg();
  } catch (e) { saveFehler(e); }
}

/* Gezieltes Speichern fuers Lernen: aendert nur die Stufe und das
   Faelligkeitsdatum dieser einen Karte. Dadurch kann ein Geraet nie den
   Fortschritt eines anderen ausloeschen - auch nicht, wenn eine Karte offline
   bewertet und die Aenderung erst spaeter hochgeladen wird. */
function persistCardGrade(bereichId, cardId, fields) {
  if (!kartenColRef) return;
  fb.updateDoc(karteRef(cardId), {
    stufe: fields.stufe,
    nextReview: fields.nextReview,
    /* B3: gehoert zum Bewerten dazu - sonst gilt eine heute eingefuehrte Karte
       auf dem naechsten Geraet wieder als neu und frisst das Tageslimit ein
       zweites Mal. */
    ersteBewertung: fields.ersteBewertung === undefined ? null : fields.ersteBewertung,
    /* E6: gehoert in denselben Schreibvorgang, sonst koennen Stufe und
       Rueckfallzaehler auseinanderlaufen. */
    rueckfaelle: Number.isInteger(fields.rueckfaelle) ? fields.rueckfaelle : 0,
    /* 2.11.1: Der Hoechststand MUSS hier mit. Er wurde beim Bewerten zwar im
       Speicher nachgezogen, aber nie geschrieben - beim naechsten Laden
       errechnete normCard ihn ersatzweise aus der AKTUELLEN Stufe. Fuer eine
       Karte, die einmal auf Stufe 2 stand und spaeter zurueckfiel, hiess das:
       Hoechststand wieder 1, und die Lektion ging zu, die laengst offen war.
       Genau der Fall, den "einmal erreicht" verhindern sollte. */
    maxStufe: Number.isInteger(fields.maxStufe) ? fields.maxStufe : 0
  }).then(schreibErfolg).catch(e => { saveFehler(e); });
}
/* 2.9.0: Einen Riss zuruecknehmen. Zwei Tage lang, danach nicht mehr.
   Gedacht fuer den Fall, dass die Serie an etwas gerissen ist, das mit dem
   Lernen nichts zu tun hatte - ein zweiter Bereich, der nach einem Import
   noch herumstand, ein zweites Geraet. Ohne diesen Knopf bleibt nur der Weg
   ueber die Firebase-Konsole. */
function streakRissZurueckliegtInTagen() {
  if (!streak.gerissenAm || !streak.vorher) return null;
  return streak.gerissenAm >= dateInDays(-2) ? streak.gerissenAm : null;
}
async function streakFortsetzen() {
  if (!streakRissZurueckliegtInTagen()) return;
  const ok = await dlgConfirm("Die Serie stand bei " + streak.vorher +
    " und ist am " + fmtDatum(streak.gerissenAm) + " gerissen. Auf diesen Stand zurücksetzen?",
    { title: "Serie fortsetzen?", okLabel: "Fortsetzen" });
  if (!ok) return;
  serieSockelSetzen(streak.vorher);
  streak.gerissenAm = null;
  streak.vorher = 0;
  persistStreak(["gerissenAm", "vorher"]);
  render();
}
/* ---------- 2.10.2: nur schreiben, was sich geaendert hat ----------
   Vorher schrieb jeder Anlass den KOMPLETTEN Serien-Stand aus dem Speicher
   zurueck - auch die blosse Tagespruefung, die nur ein Datum setzt. War die
   App dabei offline oder im Hintergrund und der Stand in der Cloud hatte
   sich inzwischen geaendert, ueberbuegelte sie ihn mit ihrem alten Wert.
   Genau so verschwand eine von Hand gesetzte 4.

   Jetzt geht nur noch das an den Server, was der Ausloeser wirklich
   angefasst hat. Wer in der Konsole am Zaehler dreht, verliert das nicht
   mehr, bloss weil die App nebenbei ein Datum notiert. */
const STREAK_FELDER = ["count", "beste", "lastCompletedDate", "lastEvaluatedDate", "jokerAm", "gerissenAm", "vorher"];
function persistStreak(felder) {
  if (!userDocRef) return;
  const patch = {};
  for (const f of (felder && felder.length ? felder : STREAK_FELDER)) {
    patch["streak." + f] = streak[f] === undefined ? null : streak[f];
  }
  schreibeInsNutzerdokument(patch);
}
function persistSettings() {
  if (!userDocRef) return;
  schreibeInsNutzerdokument({ settings: settings });
}
/* 2.11.3: Serie, Einstellungen und Tagesprotokoll gingen bisher mit einem
   stillen .catch(() => {}) raus. Zwei Faelle verschluckte das:

     - Das Nutzerdokument existiert noch nicht (frisch angelegtes Konto, das
       Anlegen laeuft noch). updateDoc scheitert dann mit "not-found", und die
       erste Serie war weg, ohne dass es jemand merkte.
     - Eine echte Ablehnung (fehlende Rechte) blieb voellig unsichtbar.

   Jetzt wird im ersten Fall das Dokument angelegt und danach neu geschrieben,
   im zweiten erscheint die Meldung wie bei den Karten auch. */
async function schreibeInsNutzerdokument(patch) {
  if (!userDocRef) return;
  try {
    await fb.updateDoc(userDocRef, patch);
    schreibErfolg();
  } catch (e) {
    if (e && e.code === "not-found") {
      if (kontoWirdGeloescht) return;
      try {
        await fb.setDoc(userDocRef, { name: displayName, schemaVersion: SCHEMA_VERSION }, { merge: true });
        await fb.updateDoc(userDocRef, patch);
        schreibErfolg();
        return;
      } catch (e2) { saveFehler(e2); return; }
    }
    saveFehler(e);
  }
}

/* ---------- Streak: zählt nur echte, vollständig erledigte Lerntage (kein Üben) ---------- */
/* A7: Die Streak zaehlt fuer ALLE Bereiche gemeinsam und misst genau das, was
   die App auch verlangt hat.

   2.3.0: Fuer die Streak zaehlen nur noch WIEDERHOLUNGEN. Neuer Stoff ist
   freiwillig, Wiederholungen sind die Pflicht - und ohne diese Trennung
   koennte einen das Freischalten einer Lektion die Flamme kosten: Wer abends
   Lektion 3 aufschliesst und sie nicht mehr durcharbeitet, haette sonst
   plaetzlich 25 offene Karten, obwohl er alles Faellige erledigt hatte. Vor
   2.3.0 hielt das Tageslimit neue Karten zurueck und das Problem fiel nicht
   auf; ohne Limit faellt es sofort auf.

   Gesperrte Karten zaehlen nirgends mit: nicht als faellig, nicht als
   verpasst, nicht im Fortschritt. Sie existieren fuer die Rechnung nicht. */
function evaluateStreakForNewDay() {
  if (bereiche === null) return;
  const t = todayStr();
  if (streak.lastEvaluatedDate === t) return; // heute schon geprüft
  // Gab es eine bereits eingeführte Karte, die schon VOR heute fällig war und
  // liegen geblieben ist? -> ein Tag wurde verpasst, die Streak reißt.
  // (Tage ganz ohne fällige Karten zählen nicht als verpasst.)
  const hadOverdue = bereiche.some(b => {
    const frei = freieIdsFor(b);
    return b.karten.some(c => !istNeueKarte(c) && c.nextReview < t && !istLiegengeblieben(c) &&
      (frei === null || frei.has(c.id)));
  });
  const geaendert = ["lastEvaluatedDate"];
  /* 2.14.0: Der Zustand der Karten entscheidet nicht mehr ueber die Serie.
     Ueberfaelliges wird weiterhin im Lernen-Tab angezeigt, aber es kann
     nichts mehr zerreissen. Der Block bleibt als Bauplan stehen, damit
     nachvollziehbar ist, was hier frueher passierte. */
  if (false && hadOverdue && streak.lastCompletedDate !== t) {
    /* 2.8.0: Ein Ausfalltag reisst die Serie nicht sofort. Serien wirken,
       weil man ungern verliert - genau deshalb hoeren viele nach dem ersten
       gerissenen Tag ganz auf. Eine Kulanz alle sieben Tage faengt Krankheit
       und Reisen ab, ohne die Serie wertlos zu machen. */
    const jokerFrei = !streak.jokerAm || streak.jokerAm < dateInDays(-7);
    if (jokerFrei && streak.count > 0) {
      streak.jokerAm = dateInDays(-1);
      geaendert.push("jokerAm");
    } else {
      if (streak.count > 0) { streak.vorher = streak.count; streak.gerissenAm = t; }
      streak.count = 0;
      streak.jokerAm = null;
      geaendert.push("count", "jokerAm", "gerissenAm", "vorher");
    }
  }
  streak.lastEvaluatedDate = t;
  persistStreak(geaendert);
}
/* ---------- 2.14.0: Die Serie wird gerechnet, nicht gespeichert ----------
   Bis 2.13.1 war die Serie ein Zaehler im Nutzerdokument, und ob er weiterlief
   oder auf null sprang, entschied der Zustand der KARTEN: Lag irgendwo etwas
   Ueberfaelliges, war sie weg. Damit hing eine Zahl, die man sich ueber
   Wochen erarbeitet, an Daten, die sich jederzeit unter ihr veraendern - ein
   Import, ein zweites Geraet, ein alter Bereich, der wieder auftaucht. Sie
   ist mehrfach aus genau diesem Grund verschwunden, ohne dass jemand etwas
   falsch gemacht haette. Jede Absicherung davor (Joker, "Serie fortsetzen",
   liegengebliebene Karten) war eine Reaktion auf einen Verlust, der schon
   passiert war.

   Jetzt kommt sie aus dem Tagesprotokoll: Es haelt fest, an welchen Tagen
   gelernt wurde. Das ist Geschichte und aendert sich nie rueckwirkend - kein
   Import und kein zweites Geraet kann sie mehr anfassen. Was frueher galt,
   traegt der Sockel: die Zahl, die beim Umstieg bestand.

   Ein Tag zaehlt, wenn an ihm gelernt wurde. Eine Luecke wird ueberbrueckt,
   wenn seit der letzten mindestens sieben gezaehlte Tage liegen. */
function serieAktuell() {
  const t = todayStr();
  const sockel = Number.isInteger(streak.sockel) ? streak.sockel : 0;
  const sockelBis = streak.sockelBis;
  let tage = 0, luecke = false;
  /* Heute zaehlt nur, wenn heute schon gelernt wurde - sonst beginnt die Kette
     bei gestern, damit die Serie nicht mitten am Tag verschwindet. */
  for (let i = verlauf[t] ? 0 : 1; i < 400; i++) {
    const d = dateInDays(-i);
    if (sockelBis && d <= sockelBis) return tage + sockel;
    if (verlauf[d]) { tage++; continue; }
    /* Ein einzelner ausgelassener Tag unterbricht die Serie nicht - Krankheit,
       Reise, ein voller Tag. Der zweite beendet sie. Eine Regel, die sich in
       einem Satz sagen laesst; die alte ("eine Luecke je sieben Tage") liess
       sich beim Rueckwaertszaehlen gar nicht sauber pruefen. */
    /* 2.16.0: Die Kulanz gilt auch fuer den ERSTEN geprueften Tag. Vorher
       hing sie an tage > 0: Wer gestern ausliess und heute noch nicht gelernt
       hat, sah den ganzen Tag eine 0 - und nach der ersten Karte stand die
       alte Zahl wieder da. Zwei ausgelassene Tage beenden die Serie
       nach wie vor. */
    if (!luecke) { luecke = true; continue; }
    break;
  }
  return tage;
}
/* Beim ersten Start unter 2.14.0 wird die bisherige Zahl zum Sockel, damit
   beim Umstieg niemand etwas verliert. */
function serieSockelSichern() {
  if (streak.sockel !== null) return;
  streak.sockel = streak.count || 0;
  streak.sockelBis = todayStr();
  persistStreak(["sockel", "sockelBis"]);
}
function serieSockelSetzen(n) {
  streak.sockel = Math.max(0, n);
  streak.sockelBis = todayStr();
  streak.beste = Math.max(streak.beste || 0, streak.sockel);
  persistStreak(["sockel", "sockelBis", "beste"]);
}
function checkStreakOnSessionComplete() {
  /* Hochgezaehlt wird nicht mehr - die Serie ergibt sich aus dem Protokoll.
     Hier wird nur noch der Rekord nachgezogen. */
  const jetzt = serieAktuell();
  if (jetzt > (streak.beste || 0)) { streak.beste = jetzt; persistStreak(["beste"]); }
}
/* Alle Bereiche, in denen heute noch eine WIEDERHOLUNG offen ist – Grundlage
   für die Streak-Prüfung UND für die Anzeige „Noch offen: …" auf dem
   Lernen-Tab. Neue Karten stehen hier bewusst nicht drin (siehe oben). */
function bereicheMitOffenem() {
  if (bereiche === null) return [];
  const t = todayStr();
  return bereiche
    .map(b => {
      const frei = freieIdsFor(b);
      const offen = b.karten.filter(c =>
        !istNeueKarte(c) && c.nextReview <= t && !istLiegengeblieben(c) &&
        (frei === null || frei.has(c.id))).length;
      return { bereich: b, offen: offen };
    })
    .filter(x => x.offen > 0);
}

/* ---------- Auth-Aktionen ---------- */
const AUTH_ERRORS = {
  "auth/invalid-credential": "E-Mail oder Passwort ist falsch.",
  "auth/user-not-found": "Kein Konto mit dieser E-Mail gefunden.",
  "auth/wrong-password": "E-Mail oder Passwort ist falsch.",
  "auth/invalid-email": "Das ist keine gültige E-Mail-Adresse.",
  "auth/email-already-in-use": "Mit dieser E-Mail gibt es schon ein Konto – bitte anmelden.",
  "auth/weak-password": "Passwort zu schwach – mindestens 6 Zeichen.",
  "auth/missing-password": "Bitte ein Passwort eingeben.",
  "auth/too-many-requests": "Zu viele Versuche – bitte kurz warten und erneut probieren.",
  "auth/network-request-failed": "Keine Verbindung – bitte Internet prüfen.",
  "auth/popup-closed-by-user": "Fenster wurde geschlossen, bevor die Anmeldung fertig war.",
  "auth/cancelled-popup-request": "Es lief schon ein Anmeldefenster – bitte noch einmal versuchen.",
  "auth/account-exists-with-different-credential": "Zu dieser E-Mail gibt es schon ein Konto mit einer anderen Anmeldeart (z. B. E-Mail/Passwort). Bitte darüber anmelden.",
  "auth/unauthorized-domain": "Diese Adresse ist für die Anmeldung nicht freigeschaltet."
};
function authErrorText(e) {
  return (e && AUTH_ERRORS[e.code]) || "Das hat nicht geklappt (" + (e && e.code ? e.code : "unbekannter Fehler") + ").";
}
function val(id) {
  const el = document.getElementById(id);
  return el ? el.value : "";
}

async function doLogin() {
  const email = val("a-email").trim();
  const pass = val("a-pass");
  ui.authError = null; ui.authInfo = null; ui.authBusy = true; render();
  try {
    await fb.signInWithEmailAndPassword(auth, email, pass);
  } catch (e) {
    ui.authError = authErrorText(e);
  }
  ui.authBusy = false;
  render();
}
/* Offene Frage 13 (plan/PLAN.md): Google und Apple als zusaetzliche
   Anmeldearten. Beide laufen ueber dasselbe Popup-Verfahren von Firebase
   Authentication - E-Mail-Bestaetigung entfaellt hier, da der jeweilige
   Anbieter die E-Mail bereits bestaetigt hat (emailVerified kommt so vom
   Anbieter). Ein Abbruch (Fenster zugemacht) ist kein Fehler, den man dem
   Benutzer als Problem zeigen muss - AUTH_ERRORS deckt den Fall ruhig ab. */
async function doGoogleLogin() {
  ui.authError = null; ui.authInfo = null; ui.authBusy = true; render();
  try {
    await fb.signInWithPopup(auth, new fb.GoogleAuthProvider());
  } catch (e) {
    if (e && e.code !== "auth/popup-closed-by-user") ui.authError = authErrorText(e);
  }
  ui.authBusy = false;
  render();
}
async function doAppleLogin() {
  ui.authError = null; ui.authInfo = null; ui.authBusy = true; render();
  try {
    const provider = new fb.OAuthProvider("apple.com");
    provider.addScope("email");
    provider.addScope("name");
    await fb.signInWithPopup(auth, provider);
  } catch (e) {
    if (e && e.code !== "auth/popup-closed-by-user") ui.authError = authErrorText(e);
  }
  ui.authBusy = false;
  render();
}
/* Beobachtung des Betreibers (18.09.2026): Auf manchen Geraeten/Browsern
   oeffnet Firebase fuer Google/Apple statt eines echten Popups eine
   Vollbild-Weiterleitung (uebliches Verhalten, wenn Popups technisch nicht
   moeglich sind, z.B. Safari/iOS). Geht jemand von dort per Zurueck-Knopf
   zur App zurueck, OHNE die Anmeldung abzuschliessen, stellt der Browser die
   Seite oft aus dem bfcache wieder her - also GENAU den eingefrorenen
   Zwischenstand von vorhin, inklusive ui.authBusy=true und den ewig
   drehenden Ladekreisen, weil das Promise aus signInWithPopup nie zu Ende
   lief (die Seite wurde ja verlassen, nicht nur in den Hintergrund gelegt).
   event.persisted erkennt genau diesen Fall. */
window.addEventListener("pageshow", e => {
  if (e.persisted && ui.authBusy) {
    ui.authBusy = false;
    render();
  }
});
async function doRegister() {
  const name = val("a-name").trim().slice(0, 40);
  const email = val("a-email").trim();
  const pass = val("a-pass");
  ui.authError = null; ui.authInfo = null;
  if (!name) {
    /* 9: fehlender Name meldet sich direkt am Feld, nicht im Kasten darunter -
       der Fehler betrifft genau ein Feld, anders als eine Serverantwort. */
    ui.authFeldFehler = { name: true };
    render();
    const el = document.getElementById("a-name");
    if (el) el.focus();
    return;
  }
  ui.authFeldFehler = null;
  ui.authBusy = true; render();
  try {
    const cred = await fb.createUserWithEmailAndPassword(auth, email, pass);
    displayName = name;
    await fb.updateProfile(cred.user, { displayName: name });
    /* C4: Nach der Registrierung eine Bestätigungs-E-Mail schicken. Die App
       sperrt sich selbst, bis emailVerified wahr ist (siehe renderAuth). */
    await fb.sendEmailVerification(cred.user);
    ui.authInfo = "Konto erstellt! Bitte E-Mail bestätigen – schau in deinem Posteingang (und Spam) nach.";
  } catch (e) {
    ui.authError = authErrorText(e);
  }
  ui.authBusy = false;
  render();
}
/* 2.11.4: Wer den Link angeklickt hat, sass hier sonst fest, bis er die Seite
   von sich aus neu lud. reload() holt den Kontostand vom Server, getIdToken
   holt einen frischen Ausweis - ohne den zweiten Schritt kaeme er zwar in die
   App, wuerde dort aber von der Datenbank abgewiesen. */
async function pruefeBestaetigung() {
  if (!currentUser) return;
  ui.authError = null; ui.authInfo = null; ui.authBusy = true; render();
  try {
    await currentUser.reload();
    if (currentUser.emailVerified) {
      await currentUser.getIdToken(true);
      location.reload();
      return;
    }
    ui.authError = "Noch nicht bestätigt. Öffne den Link in der E-Mail und versuch es dann noch einmal.";
  } catch (e) {
    ui.authError = "Konnte nicht prüfen: " + (e && e.code ? e.code : String(e));
  }
  ui.authBusy = false;
  render();
}
async function doResendVerification() {
  if (!currentUser) return;
  ui.authError = null; ui.authInfo = null; ui.authBusy = true; render();
  try {
    await fb.sendEmailVerification(currentUser);
    ui.authInfo = "Verifikations-E-Mail wurde verschickt – bitte Posteingang (und Spam) prüfen.";
  } catch (e) {
    ui.authError = "Fehler beim Versand: " + (e && e.code ? e.code : String(e));
  }
  ui.authBusy = false;
  render();
}
async function doReset() {
  const email = val("a-email").trim();
  ui.authError = null; ui.authInfo = null; ui.authBusy = true; render();
  try {
    await fb.sendPasswordResetEmail(auth, email);
    ui.authInfo = "E-Mail zum Zurücksetzen wurde verschickt – bitte Posteingang (und Spam) prüfen.";
  } catch (e) {
    ui.authError = authErrorText(e);
  }
  ui.authBusy = false;
  render();
}
function doLogout() {
  fb.signOut(auth);
}

/* ---------- Konto loeschen (Phase 2) ----------
   Reihenfolge ist Absicht: erst die Firestore-Daten weg, DANACH das
   Auth-Konto. Schlaegt der zweite Schritt fehl (z. B. "requires-recent-login"),
   bleibt ein Konto ohne Daten uebrig - anmeldbar, wiederholbar, harmlos.
   In der umgekehrten Reihenfolge waere ein Fehlschlag beim zweiten Schritt
   ein Datenbestand ohne Konto, das ihn je wieder loeschen koennte - die
   Regeln verlangen ueberall auth.uid == uid, und ohne Konto gibt es kein
   uid mehr, das passen wuerde. Das waere endgueltig verwaist. */
async function kontoDatenLoeschen() {
  if (!userDocRef || !bereicheColRef || !kartenColRef) return;
  /* Erst die Sperre, dann die Live-Listener abmelden - in dieser
     Reihenfolge kann keine der drei "not-found -> neu anlegen"-Stellen
     mehr anspringen, weder ueber den Snapshot-Handler noch ueber einen
     zufaellig noch laufenden Schreibvorgang (z. B. den 2-Sekunden-Timer
     von verlaufSpeichernBald). */
  kontoWirdGeloescht = true;
  listenerLoesen();
  const [bereicheSnap, kartenSnap] = await Promise.all([
    fb.getDocs(bereicheColRef), fb.getDocs(kartenColRef)
  ]);
  const alle = [...bereicheSnap.docs, ...kartenSnap.docs];
  for (let i = 0; i < alle.length; i += 400) {
    const stapel = fb.writeBatch(db);
    alle.slice(i, i + 400).forEach(d => stapel.delete(d.ref));
    await stapel.commit();
  }
  await fb.deleteDoc(userDocRef);
}
function kontoLoeschenFehlerText(e) {
  if (e && e.code === "auth/wrong-password") return "Falsches Passwort – das Konto wurde nicht gelöscht.";
  if (e && e.code === "auth/too-many-requests") return "Zu viele Versuche – bitte kurz warten und erneut probieren.";
  if (e && e.code === "auth/network-request-failed") return "Keine Verbindung – bitte Internet prüfen und erneut probieren.";
  return "Das hat nicht geklappt (" + (e && e.code ? e.code : "unbekannter Fehler") + "). Bitte erneut versuchen.";
}
async function kontoAuthLoeschen() {
  try {
    await fb.deleteUser(currentUser);
  } catch (e) {
    if (!e || e.code !== "auth/requires-recent-login") throw e;
    const pass = await dlgPrompt(
      "Aus Sicherheitsgründen wird dein Passwort noch einmal gebraucht, bevor das Konto endgültig gelöscht wird.",
      "", { title: "Passwort bestätigen", okLabel: "Konto löschen", danger: true, type: "password" });
    if (!pass) throw e;
    const zugangsdaten = fb.EmailAuthProvider.credential(currentUser.email, pass);
    await fb.reauthenticateWithCredential(currentUser, zugangsdaten);
    await fb.deleteUser(currentUser);
  }
}
async function doKontoLoeschen() {
  if (!currentUser || ui.kontoLoeschenBusy) return;
  const email = (currentUser.email || "").trim();
  exportBackup();
  const eingabe = await dlgPrompt(
    "Dein Konto und alle deine Karten, Bereiche und dein Lernstand werden unwiderruflich " +
    "gelöscht. Das lässt sich nicht rückgängig machen.\n\n" +
    "Ein Backup wurde gerade zum Herunterladen angeboten – sieh in deinen Downloads nach, " +
    "dass die Datei wirklich da ist.\n\n" +
    "Tipp zum Bestätigen deine E-Mail-Adresse ein: " + email,
    "", { title: "Konto endgültig löschen?", okLabel: "Endgültig löschen", danger: true });
  if (eingabe === null) return;
  if (eingabe.trim().toLowerCase() !== email.toLowerCase()) {
    await dlgAlert("Die E-Mail-Adresse stimmt nicht überein – es wurde nichts gelöscht.", "Abgebrochen");
    return;
  }
  ui.kontoLoeschenBusy = true; render();
  try {
    await kontoDatenLoeschen();
    await kontoAuthLoeschen();
    /* Erfolg: fb.deleteUser meldet auch ab, onAuthStateChanged raeumt den
       Rest auf (currentUser wird null, die App zeigt den Anmeldebildschirm). */
  } catch (e) {
    ui.kontoLoeschenBusy = false; render();
    await dlgAlert(kontoLoeschenFehlerText(e), "Löschen fehlgeschlagen");
    /* Die Live-Listener wurden in kontoDatenLoeschen() abgemeldet und
       kontoWirdGeloescht steht noch auf true - beides muss zurueck, sonst
       bleibt die App nach einem Fehlschlag ohne Cloud-Sync haengen. Ein
       Neuladen macht das ueber den normalen Anmelde-Weg (onAuthStateChanged)
       gruendlicher, als es hier von Hand nachzuziehen. */
    location.reload();
    return;
  }
}

/* ---------- Datenzugriff ---------- */
/* A3 (1.9.0): Der offene Bereich wird ueber seine ID gefunden, nicht mehr
   ueber eine Positionsnummer. Kam von einem zweiten Geraet ein Snapshot
   herein, in dem ein Bereich geloescht oder umsortiert wurde, zeigte
   "Position 2" danach still auf einen ANDEREN Bereich - neue Karten landeten
   im falschen, ohne dass jemand etwas merkte. Eine ID zeigt entweder auf
   denselben Bereich wie vorher oder auf gar keinen; im zweiten Fall faellt
   die App sichtbar auf den ersten Bereich zurueck. */
function currentBereich() {
  if (bereiche === null || bereiche.length === 0) return null;
  const b = bereiche.find(x => x.id === ui.bereichId);
  if (b) return b;
  ui.bereichId = bereiche[0].id;
  return bereiche[0];
}
function currentCards() { return currentBereich().karten; }
function findCard(id) { return currentCards().find(c => c.id === id); }
/* Bereiche aus älteren Datenständen haben noch kein sets-Feld – hier einmalig nachrüsten. */
function currentSets() {
  const b = currentBereich();
  if (!Array.isArray(b.sets)) b.sets = [];
  return b.sets;
}
function findSet(id) { return currentSets().find(s => s.id === id); }
/* Karten einer Speicherkarte in Bereichsreihenfolge, gelöschte IDs fallen weg. */
/* 2.6.0: Die Karten stehen in der Reihenfolge, in der sie in DIESER
   Speicherkarte liegen - also so, wie sie beim Auswaehlen angehakt oder
   danach am Griff zurechtgeschoben wurden.

   Bis 2.5.0 wurde stattdessen nach der Reihenfolge des Bereichs sortiert.
   Das war eine gerechnete Reihenfolge, keine gewaehlte: Die Karten einer
   Lektion liessen sich nicht in die Abfolge des Videos bringen, ohne den
   ganzen Bereich umzusortieren. Jetzt gehoert jeder Speicherkarte ihre
   eigene Ordnung.

   Karten, die es nicht mehr gibt, fallen still heraus - cardIds kann auf
   geloeschte Karten zeigen. */
function setCards(set) {
  const byId = new Map(currentCards().map(c => [c.id, c]));
  return set.cardIds.map(id => byId.get(id)).filter(Boolean);
}
/* 2.21.3: Herkunft und Kategorien einer Karte sichtbar machen. Bisher
   stand nirgends dran, aus welcher Lektion eine Karte kommt oder in
   welchen Kategorien sie noch steckt - man musste sich durch die
   Speicherkarten klicken, um es herauszufinden. Eine Karte kann dabei in
   beliebig vielen Speicherkarten gleichzeitig liegen (das war technisch
   schon immer moeglich); hier wird nur sichtbar gemacht, was ohnehin schon
   da ist. Sortiert wie ueberall sonst: Lektion vor Kategorie vor Eigene. */
function setsFuerKarte(cardId, b) {
  return (b.sets || [])
    .filter(s => s.cardIds.indexOf(cardId) !== -1)
    .sort((a, c) => SET_ARTEN_ANZEIGE.indexOf(a.art || "eigen") - SET_ARTEN_ANZEIGE.indexOf(c.art || "eigen"));
}
/* ausschluss: die Speicherkarte, in deren eigener Liste die Zeile ohnehin
   schon steht - "auch in Nomen" waere dort keine Information, sondern nur
   eine Wiederholung dessen, was gerade angeschaut wird.
   2.21.4: Nur noch bei Karten, die auch in „Schwierige Wörter" liegen -
   bei jeder Karte ueberall die volle Liste ihrer Speicherkarten anzuzeigen
   war mehr, als gebraucht wird. Genau die Karten, bei denen die Herkunft
   wirklich interessiert, sind die schwierigen. */
function kartenTagsHtml(cardId, b, ausschluss) {
  const inMerkliste = (b.sets || []).some(s => s.art === "eigen" && s.name === MERK_SET_NAME && s.cardIds.indexOf(cardId) !== -1);
  if (!inMerkliste) return "";
  const sets = setsFuerKarte(cardId, b).filter(s => !ausschluss || s.id !== ausschluss);
  if (sets.length === 0) return "";
  /* Beobachtung 7 (16.09.2026): Eine arabisch benannte Kategorie/Lektion sah
     hier "bisl verbuggt" aus - der Name lief ohne eigene Schrift/Richtung
     mit, wie jeder andere Text. schriftAttr() (oben definiert, bisher
     nirgends genutzt) traegt class="arabic"+dir="rtl" pro Zeile nach, damit
     eine gemischte Liste (manche Namen arabisch, manche nicht) jede Zeile
     fuer sich richtig setzt statt eine Richtung fuer alle zu erzwingen. */
  return '<div class="card-tags">' + sets.map(s =>
    '<span' + schriftAttr(s.name) + '>' + iconSvg(s.art || "eigen") + ' ' + esc(s.name) + '</span>'
  ).join(' · ') + '</div>';
}
/* ---------- Was ist heute fällig? ----------
   Wer 500 Vokabeln auf einmal bekommt, hat ohne Bremse am ersten Tag 500
   faellige Karten, am naechsten wieder 500 auf Stufe 1 dazu - nach zwei
   Wochen sind es Tausende und die App wird nie wieder geoeffnet. Das ist der
   haeufigste Grund, warum Karteikarten-Apps aufgegeben werden.

   Bis 2.2.0 war die Bremse ein Tageslimit fuer neue Karten. Seit 2.3.0 ist es
   das Schloss: In einem gefuehrten Satz existieren nur die Karten der
   freigeschalteten Lektionen, alles andere ist gar nicht erst faellig. Das
   bremst am Stoff statt an einer Zahl - und man sieht, WARUM heute nicht mehr
   kommt, statt nur dass etwas fehlt.

   In einem eigenen Bereich gibt es keine Bremse mehr. Dort entscheidet, wie
   viele Karten man selbst anlegt. */
function dueCardsFor(bereich) {
  const b = bereich || currentBereich();
  const t = todayStr();
  const frei = freieIdsFor(b);
  const dran = b.karten.filter(c => c.nextReview <= t && (frei === null || frei.has(c.id)));
  /* Wiederholungen zuerst: sie sind Arbeit von gestern und verfallen, neuer
     Stoff kann warten. */
  return dran.filter(c => !istNeueKarte(c)).concat(dran.filter(istNeueKarte));
}
function dueCards() { return dueCardsFor(currentBereich()); }
/* E7 (1.8.0) */
function setArabGroesse(id) {
  if (!ARAB_STUFEN.some(x => x.id === id)) return;
  if (id === settings.arabGroesse) return;
  settings.arabGroesse = id;
  persistSettings();
  render();
}
/* ---------- E4/D10: Zahlen für den Fortschritts-Tab ----------
   Alles hier wird bei jedem Aufruf frisch aus den vorhandenen Karten
   ausgerechnet. Es gibt bewusst KEIN neues Feld in der Cloud: eine Statistik,
   die selbst Daten schreibt, kann auch falsche Daten schreiben - und ein
   zusaetzlicher Schreibvorgang bei jeder Bewertung ist genau die Stelle, an
   der A4 (Vollueberschreiben) noch offen ist. Was sich nicht ableiten laesst,
   steht deshalb hier auch nicht. */

/* Welche Karten zaehlen: alle Bereiche zusammen oder nur der offene?
   2.3.0: Gesperrte Karten bleiben draussen. Sonst stuenden bei einem frisch
   eingespielten Satz 500 Karten in der Gruppe "neu" und der Fortschritt saehe
   aus, als haette man nichts geschafft - obwohl die erste Lektion sitzt. */
function statsCards() {
  if (bereiche === null) return [];
  const quelle = ui.statsScope === "bereich" ? [currentBereich()] : bereiche;
  const out = [];
  for (const b of quelle) {
    const frei = freieIdsFor(b);
    for (const c of b.karten) if (frei === null || frei.has(c.id)) out.push(c);
  }
  return out;
}

/* Die vier Gruppen der Stufenverteilung. Die Grenzen folgen den Intervallen:
   Stufe 3 = 3 Tage, Stufe 6 = 19 Tage. "Sitzt" heisst also: kommt fruehestens
   in gut zwei Wochen wieder. "Neu" laeuft ueber ersteBewertung und nicht ueber
   die Stufe - sonst stuende eine vergessene Karte auf Stufe 0 in derselben
   Gruppe wie eine nie gesehene. */
/* ---------- 2.12.0: Ein Wortschatz für alle Ansichten ----------
   Jede Ansicht hatte sich bisher ihre eigenen Woerter ausgedacht. Dieselbe
   Karte hiess im Fortschritt "neu", in der Durchsicht "gesehen" und im
   Lernen-Tab "in der ersten Abfrage" - und wer eine Karte durchgesehen
   hatte, fand sie im Fortschritt weiterhin unter "neu", obwohl er sie gerade
   gelesen hatte.

   Ab hier gibt es GENAU EINE Stelle, an der die Zustaende definiert sind.
   Jede Ansicht liest daraus: der Balken im Fortschritt, die Plaketten in den
   Listen, die Durchsicht, der Faden.

   Fuenf Zustaende, und jede Karte ist in genau einem:

     neu       nie angesehen
     gesehen   durchgesehen, aber noch nie gewusst
     wackelig  einmal gewusst, faellt noch leicht wieder raus
     solide    haelt sich
     fest      sitzt

   Die Grenze zwischen "neu" und "gesehen" ist das Erstbewertungsdatum, alle
   weiteren sind die Stufe. Eine Karte faellt nie unter Stufe 1 zurueck,
   sobald sie einmal gewusst wurde - deshalb bedeutet Stufe 0 immer entweder
   neu oder gesehen und die Einteilung ist ueberschneidungsfrei. */
/* 3.0.0: Die Farben kommen jetzt aus EINER Rampe (--stufe-0 bis --stufe-4).
   Vorher stand hier Grau, Bronze, Zinnober, Gold, Gruenspan nebeneinander -
   fuenf Farben aus drei verschiedenen Bedeutungswelten. Rot hiess an dieser
   Stelle "wackelig", woanders in der App "falsch"; Gruen hiess hier "fest",
   auf dem Bewertungsknopf "gewusst". Mit der Rampe heisst mehr Gold ueberall
   dasselbe: sitzt besser. Dieselben Werte tragen Kalender, Lektionsbalken
   und die Plaketten an den Karten.
   Geaendert ist ausschliesslich das Feld "farbe" - id, label, erklaerung
   und test sind unveraendert. */
const KARTEN_ZUSTAENDE = [
  { id: "neu",      label: "neu",      erklaerung: "noch nie angesehen",             farbe: "var(--stufe-0)", test: c => istNeueKarte(c) },
  { id: "gesehen",  label: "gesehen",  erklaerung: "durchgesehen, noch nie gewusst", farbe: "var(--stufe-1)", test: c => !istNeueKarte(c) && (c.maxStufe || 0) === 0 },
  { id: "wackelig", label: "wackelig", erklaerung: "Stufe 1–2",                      farbe: "var(--stufe-2)", test: c => (c.maxStufe || 0) > 0 && c.stufe <= 2 },
  { id: "solide",   label: "solide",   erklaerung: "Stufe 3–5",                      farbe: "var(--stufe-3)", test: c => (c.maxStufe || 0) > 0 && c.stufe >= 3 && c.stufe <= 5 },
  { id: "fest",     label: "fest",     erklaerung: "Stufe 6+",                       farbe: "var(--stufe-4)", test: c => (c.maxStufe || 0) > 0 && c.stufe >= 6 }
];
const STAT_GRUPPEN = KARTEN_ZUSTAENDE;
/* Der Zustand einer einzelnen Karte. Der erste passende gewinnt; die Tests
   oben sind so gebaut, dass immer genau einer passt. */
function kartenZustand(c) {
  return KARTEN_ZUSTAENDE.find(z => z.test(c)) || KARTEN_ZUSTAENDE[0];
}
/* Die Plakette, die in jeder Liste an einer Karte steht. Ein Ort, ein
   Wortlaut - vorher stand mal "Stufe 3", mal "✓ gesehen", mal nichts. */
function zustandBadge(c) {
  const z = kartenZustand(c);
  const stufe = (z.id === "neu" || z.id === "gesehen") ? "" : " " + c.stufe;
  return '<span class="badge zustand-' + z.id + '" title="' + esc(z.erklaerung) + '">' + z.label + stufe + '</span>';
}
/* Arabisch-indische Ziffern. Sie stehen klein neben den grossen Zahlen im
   Fortschritt - das ist die Handschrift dieser App: arabische Schrift als
   Zierde, die nebenbei mitlernt, statt eines beliebigen Symbols. */
const ARAB_ZIFFERN = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
function arabZahl(n) {
  return String(Math.max(0, Math.round(n))).split("").map(z => ARAB_ZIFFERN[+z] || z).join("");
}

/* ---------- 2.10.0: Sprung und Aufleuchten ----------
   Aus dem Adrabic-Trainer uebernommen: Wer in der Checkliste auf ein
   Kategorie-Zeichen tippt, wird sanft zum passenden Modul gescrollt, und das
   Modul leuchtet kurz auf - so sieht man, WAS sich geaendert hat.

   Hier gilt dasselbe fuer jede Aktion, deren Wirkung nicht dort steht, wo
   man getippt hat: Ueben und Durchgehen aus einer Speicherkarte heraus
   starten oben eine Sitzung, waehrend man unten in der Kartenliste steht.
   Ohne den Sprung sieht es aus, als sei nichts passiert. */
function springeZu(id) { ui.springZu = id; ui.springOben = false; }
/* 2.16.0: Ein MODUSWECHSEL ist etwas anderes als ein Sprung innerhalb der
   Seite. Ueben, Abfrage und Durchsicht tauschen den ganzen Bildschirm aus -
   dann ist die Frage "steht das Ziel schon im Bild?" sinnlos: An derselben
   Stelle steht jetzt etwas anderes, und was oben dazugehoert (Fortschritt,
   Ueberschrift, der Weg zurueck) bliebe ausserhalb des Bildes liegen.
   Deshalb hier immer an den Anfang der Seite, egal wo man vorher stand. */
function springeNachOben(id) { ui.springZu = id; ui.springOben = true; }
function sprungAusfuehren() {
  const id = ui.springZu;
  const ganzNachOben = ui.springOben;
  ui.springOben = false;
  if (!id) return;
  ui.springZu = null;
  requestAnimationFrame(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const sanft = !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    /* 2.14.2: Nicht mehr an die obere Kante schieben.

       Mit block:"start" landete das Ziel ganz oben am Bildschirmrand - bei
       einer Speicherkarte weit unten in einer langen Liste rauschte damit die
       halbe Seite durch, und man stand ohne alles, was darueber gehoert.

       Jetzt gilt: Steht das Ziel ohnehin schon im Bild, wird gar nicht
       gescrollt - dann genuegt das Aufleuchten. Sonst kommt es in die MITTE,
       damit ringsherum sichtbar bleibt, wo man gelandet ist. Nur wenn es zu
       gross fuer den Bildschirm ist, faengt es oben an - sonst saehe man von
       einem hohen Kasten nur die Mitte. */
    if (ganzNachOben) {
      window.scrollTo({ top: 0, behavior: sanft ? "smooth" : "auto" });
      el.classList.remove("aufleuchten");
      void el.offsetWidth;
      el.classList.add("aufleuchten");
      return;
    }
    const r = el.getBoundingClientRect();
    const hoehe = window.innerHeight || 800;
    const imBild = r.top >= 60 && r.bottom <= hoehe - 40;
    if (!imBild) {
      el.scrollIntoView({ behavior: sanft ? "smooth" : "auto",
                          block: r.height > hoehe * 0.8 ? "start" : "center" });
    }
    el.classList.remove("aufleuchten");
    void el.offsetWidth;            // Neustart der Animation erzwingen
    el.classList.add("aufleuchten");
  });
}

/* Kalenderraster: sieben Zeilen (Wochentage), eine Spalte je Woche. Die
   Faerbung richtet sich nach der Menge des Tages, in vier groben Stufen -
   feiner waere nicht lesbar. */
function renderKalender(tage) {
  /* Das Raster hat sieben Zeilen (Mo..So) und volle Spalten. Deshalb wird
     vom SONNTAG DIESER WOCHE aus zurueckgerechnet - sonst bricht die letzte
     Spalte mitten ab und die Zeilen stehen nicht mehr fuer Wochentage. */
  const wochen = Math.ceil(tage / 7);
  const heuteIso = todayStr();
  const heute = new Date(heuteIso + "T00:00:00");
  const dow = heute.getDay() === 0 ? 7 : heute.getDay();      // Mo=1 .. So=7
  const ende = new Date(heute); ende.setDate(ende.getDate() + (7 - dow));
  const start = new Date(ende); start.setDate(start.getDate() - (wochen * 7 - 1));
  let html = '<div class="kal">';
  for (let i = 0; i < wochen * 7; i++) {
    const d = new Date(start); d.setDate(d.getDate() + i);
    const iso = fmtDate(d);
    const e = verlauf[iso];
    const menge = e ? (e.w || 0) + (e.n || 0) : 0;
    const zukunft = iso > heuteIso;
    /* Vier Stufen. Feiner waere bei 11 Pixeln nicht mehr unterscheidbar. */
    const stufe = zukunft ? "x" : menge === 0 ? 0 : menge < 10 ? 1 : menge < 25 ? 2 : menge < 50 ? 3 : 4;
    html += '<div class="kal-tag s' + stufe + (iso === heuteIso ? " heute" : "") +
      '" title="' + esc(iso + (zukunft ? "" : ": " + menge + " Karten")) + '"></div>';
  }
  html += '</div>';
  return html;
}

function stufenVerteilung(cards) {
  return STAT_GRUPPEN.map(g => ({ ...g, anzahl: cards.filter(g.test).length }));
}

function wochentagKurz(iso) {
  const p = iso.split("-");
  const d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  return ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"][d.getDay()];
}
function tagKurz(iso) {
  const p = iso.split("-");
  return Number(p[2]) + "." + Number(p[1]) + ".";
}

/* Vorschau auf die naechsten sieben Tage. Gezaehlt werden nur Wiederholungen:
   Wann eine neue Karte drankommt, entscheidet das Tageslimit und nicht ihr
   Faelligkeitsdatum - sie hier mitzuzaehlen ergaebe eine Zahl, die nie eintritt.
   Der heutige Balken enthaelt auch alles Ueberfaellige aus der Vergangenheit. */
function vorschau7(cards) {
  const t = todayStr();
  const out = [];
  for (let i = 0; i < 7; i++) {
    const tag = dateInDays(i);
    const anzahl = cards.filter(c =>
      !istNeueKarte(c) && (i === 0 ? c.nextReview <= t : c.nextReview === tag)
    ).length;
    out.push({ tag: tag, anzahl: anzahl, label: i === 0 ? "heute" : (i === 1 ? "morgen" : wochentagKurz(tag)) });
  }
  return out;
}


/* E6: alle verbrannten Karten im gewaehlten Umfang, die schlimmste zuerst.
   Der Bereich wird mitgegeben, weil die Liste im Fortschritts-Tab auch
   bereichsuebergreifend sein kann und die Knoepfe wissen muessen, wohin. */
function verbrannteKarten() {
  if (bereiche === null) return [];
  const quelle = ui.statsScope === "bereich" ? [currentBereich()] : bereiche;
  const out = [];
  for (const b of quelle) {
    const frei = freieIdsFor(b);
    for (const c of b.karten) {
      if (frei !== null && !frei.has(c.id)) continue;   // gesperrt = zaehlt nirgends
      if (istVerbrannt(c)) out.push({ card: c, bereich: b });
    }
  }
  return out.sort((x, y) => y.card.rueckfaelle - x.card.rueckfaelle);
}
/* Zaehler von Hand zuruecksetzen - fuer den Fall, dass die Karte in Ordnung
   ist und nur eine schlechte Phase hatte. */
function resetRueckfaelle(bereichId, cardId) {
  const b = bereiche.find(x => x.id === bereichId);
  const c = b && b.karten.find(x => x.id === cardId);
  if (!c) return;
  c.rueckfaelle = 0;
  patchDoc({ [pfadKarte(bereichId, cardId) + ".rueckfaelle"]: 0 });
  render();
}
/* Aus dem Fortschritts-Tab direkt zur Karte springen: Bereich wechseln,
   Verwalten oeffnen, Formular mit der Karte fuellen. */
function editCardInBereich(bereichId, cardId) {
  if (!bereiche.some(x => x.id === bereichId)) return;
  ui.bereichId = bereichId;
  /* 3.2.0: Ein Reiterwechsel verlaesst auch eine offene Unterseite - sonst
     traegt die Kopfzeile den Titel der Seite, aus der man gerade kommt. */
  ui.seite = null;
  ui.tab = "verwalten";
  ui.session = null;
  ui.searchQuery = "";
  ui.kartenSeite = 0;
  ui.selectMode = false;
  ui.selectedIds = new Set();
  editCard(cardId);
  /* Beobachtung 3 gilt nur fuer den Sprung INNERHALB von Verwalten. editCard()
     setzt ui.tab hier oben schon auf "verwalten", bevor es selbst pruefen
     kann, ob man wirklich schon dort war - der Sprung aus dem
     Fortschritts-Tab hat also faelschlich eine Rueckkehrposition gesetzt.
     Wieder loeschen: Zurueck zum Fortschritts-Tab regelt bereits
     springeZu()/window.scrollTo(0,0) beim naechsten Tab-Wechsel. */
  editRueckkehrY = null;
}

const LAST_BACKUP_KEY = "adrabic-last-backup";
/* D5 (1.8.0): Das Datum liegt jetzt in den Einstellungen und damit in der
   Cloud. Vorher stand es nur im localStorage des jeweiligen Geraets - auf
   einem neuen Handy hiess es deshalb immer "noch nie gesichert", was aussieht,
   als waeren die Daten weg.
   Der localStorage wird weiter GELESEN, damit ein altes Datum nicht verloren
   geht, aber nur als Rueckfallebene. Geschrieben wird es beim naechsten
   Backup ohnehin in die Cloud - eine eigene Umzugsroutine waere zusaetzlicher
   Schreibzugriff fuer einen einzigen Wert. */
function lastBackupDate() {
  if (settings.lastBackup) return settings.lastBackup;
  try {
    const raw = localStorage.getItem(LAST_BACKUP_KEY);
    return /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : null;
  } catch (e) { return null; }
}
function daysSinceLastBackup() {
  const raw = lastBackupDate();
  if (!raw) return null; // noch nie exportiert
  const last = new Date(raw + "T00:00:00");
  const now = new Date(todayStr() + "T00:00:00");
  return Math.round((now - last) / 86400000);
}
function slugName(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9äöüß]+/g, "-").replace(/(^-|-$)/g, "");
}
/* Datei herunterladen. Steht fuer sich, weil es drei Knoepfe gibt, die
   dasselbe tun und sich nur im Inhalt unterscheiden. */
function dateiSpeichern(daten, dateiname) {
  const blob = new Blob([JSON.stringify(daten, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = dateiname;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
function exportBackup(onlyCurrent) {
  const data = {
    exportedAt: new Date().toISOString(),
    profil: displayName,
    bereiche: onlyCurrent ? [currentBereich()] : bereiche
  };
  const nameSlug = onlyCurrent ? "-" + slugName(currentBereich().name) : "";
  dateiSpeichern(data, "lernkarten-backup" + nameSlug + "-" + todayStr() + ".json");
  if (!onlyCurrent) {
    /* Nur das Voll-Backup zaehlt - ein Export eines einzelnen Bereichs
       sichert eben nicht alles. */
    settings.lastBackup = todayStr();
    persistSettings();
    try { localStorage.setItem(LAST_BACKUP_KEY, todayStr()); } catch (e) {}
  }
  render();
}
/* ---------- 2.3.0: Backup zum Weitergeben ----------
   Der Unterschied zu einem normalen Backup faellt hier, beim ERZEUGEN der
   Datei - nicht beim Einspielen. Das ist Absicht: So gibt es keinen
   Import-Knopf, mit dem man aus Versehen den eigenen Lernstand auf Null
   setzen kann. Der Import liest schlicht, was in der Datei steht.

   In die Datei kommt:
     - jede Karte mit Stufe 0, ohne Erstbewertung, ohne Rueckfaelle
       (nextReview wird weggelassen; normCard setzt beim Einspielen den
       Tag des Imports ein, nicht meinen Tag hier)
     - die Speicherkarten mit ihrer Art
     - alle Lektionen gesperrt, ausser der ersten
     - die Markierung "gefuehrt" - daran haengt der Schreibschutz
     - Kennung und laufende Nummer des Satzes, sowie eine Herkunfts-Nummer
       an jeder Karte und jeder Speicherkarte

   Die letzten beiden Punkte tun heute noch nichts. Sie muessen trotzdem
   schon in der allerersten Datei stehen, denn Dateien, die einmal draussen
   sind, lassen sich nicht nachruesten - und ohne sie kann ein spaeteres
   Update den vorhandenen Satz nicht wiedererkennen und legt stattdessen
   einen zweiten Bereich mit allem doppelt an. */
/* Prueft, ob b ueberhaupt weitergebbar ist, und zeigt sonst eine erklaerende
   Meldung. Gemeinsam fuer den Datei-Export und den Code-Entwurf (H),
   damit beide Wege dieselben Bedingungen stellen. */
async function weitergabeMoeglich(b) {
  if (istGefuehrt(b)) {
    await dlgAlert('„' + b.name + '" ist selbst ein geführter Satz. Weitergeben kann ihn nur, wer ihn zusammengestellt hat.',
      "Nicht möglich");
    return false;
  }
  if (lektionenVon(b).length === 0) {
    await dlgAlert('In „' + b.name + '" gibt es noch keine Speicherkarte der Art „Lektion". ' +
      'Ohne Lektionen gäbe es nichts zum Freischalten – wer den Satz einspielt, hätte gar keine Karte zum Lernen.\n\n' +
      'Leg im Verwalten-Tab unter „Speicherkarten“ mindestens eine Lektion an.', "Noch keine Lektionen");
    return false;
  }
  return true;
}

/* Baut den weitergebbaren Inhalt eines Bereichs - ohne Lernstand, ohne
   eigene Speicherkarten, alle Lektionen bis auf die erste gesperrt (siehe
   Kommentar ueber exportWeitergabe). Herausgezogen aus exportWeitergabe(),
   damit der Code-Entwurf aus lehrer-modus/GERUEST.md (Abschnitt H) denselben
   Inhalt erzeugt wie der bestehende Datei-Export, statt einer zweiten,
   moeglicherweise abweichenden Fassung. */
function baueWeitergabeBereich(b, version) {
  const karten = b.karten.map(c => ({
    id: c.id,
    quelleId: c.quelleId || c.id,
    wort: c.wort,
    uebersetzung: c.uebersetzung,
    extra: c.extra,
    stufe: 0
  }));
  const sets = (b.sets || []).filter(s => s.art === "kategorie" || s.art === "lektion").map(s => ({
    id: s.id,
    quelleId: s.quelleId || s.id,
    name: s.name,
    art: s.art,
    cardIds: s.cardIds.slice()
  }));
  return {
    id: b.id, name: b.name,
    gefuehrt: true, satzId: b.satzId, satzVersion: version,
    karten: karten, sets: sets
  };
}

/* ---------- 2.3.0: Backup zum Weitergeben ----------
   Der Unterschied zu einem normalen Backup faellt hier, beim ERZEUGEN der
   Datei - nicht beim Einspielen. Das ist Absicht: So gibt es keinen
   Import-Knopf, mit dem man aus Versehen den eigenen Lernstand auf Null
   setzen kann. Der Import liest schlicht, was in der Datei steht.

   In die Datei kommt:
     - jede Karte mit Stufe 0, ohne Erstbewertung, ohne Rueckfaelle
       (nextReview wird weggelassen; normCard setzt beim Einspielen den
       Tag des Imports ein, nicht meinen Tag hier)
     - die Speicherkarten mit ihrer Art
     - alle Lektionen gesperrt, ausser der ersten
     - die Markierung "gefuehrt" - daran haengt der Schreibschutz
     - Kennung und laufende Nummer des Satzes, sowie eine Herkunfts-Nummer
       an jeder Karte und jeder Speicherkarte

   Die letzten beiden Punkte tun heute noch nichts. Sie muessen trotzdem
   schon in der allerersten Datei stehen, denn Dateien, die einmal draussen
   sind, lassen sich nicht nachruesten - und ohne sie kann ein spaeteres
   Update den vorhandenen Satz nicht wiedererkennen und legt stattdessen
   einen zweiten Bereich mit allem doppelt an. */
async function exportWeitergabe() {
  const b = currentBereich();
  if (!(await weitergabeMoeglich(b))) return;
  const lektionen = lektionenVon(b);
  const ohneLektion = b.karten.filter(c => !lektionen.some(s => s.cardIds.indexOf(c.id) !== -1)).length;
  const eigeneAnzahl = (b.sets || []).filter(s => (s.art || "eigen") === "eigen").length;
  const version = (b.satzVersion || 0) + 1;
  const ok = await dlgConfirm(
    b.karten.length + ' Karten, ' + lektionen.length + ' Lektionen. Nur „' + lektionen[0].name + '" ist offen, der Rest kommt gesperrt an.' +
    (ohneLektion > 0 ? '\n\nAchtung: ' + ohneLektion + ' Karte(n) liegen in keiner Lektion. Die bleiben beim Empfänger für immer gesperrt.' : '') +
    (eigeneAnzahl > 0 ? '\n\n' + eigeneAnzahl + ' eigene Speicherkarte(n) bleiben zu Hause – weitergegeben werden nur Kategorien und Lektionen.' : '') +
    '\n\nDas wird Veröffentlichung Nr. ' + version + '.',
    { title: "Backup zum Weitergeben", okLabel: "Datei erzeugen" });
  if (!ok) return;

  /* Die Kennung entsteht beim ersten Mal und bleibt danach. Sie ist das
     einzige, woran ein Update spaeter den Satz wiedererkennt. */
  if (!b.satzId) b.satzId = slugName(b.name) + "-" + genId();
  b.satzVersion = version;
  patchDoc({ [pfadBereich(b.id) + ".satzId"]: b.satzId, [pfadBereich(b.id) + ".satzVersion"]: version });

  dateiSpeichern({
    exportedAt: new Date().toISOString(),
    profil: displayName,
    weitergabe: true,
    satz: { id: b.satzId, version: version, name: b.name },
    bereiche: [baueWeitergabeBereich(b, version)]
  }, "kartensatz-" + slugName(b.name) + "-v" + version + ".json");
  render();
}

/* ---------- Lehrer-Modus, Kernablauf: Lektion per Link teilen ----------
   plan/lehrer-modus/GERUEST.md, Abschnitt J. Ersetzt den fruehreren
   Firestore-Code-Entwurf (Abschnitt H/I): Statt eines Codes, der auf einen
   Datenbank-Eintrag zeigt, steckt der ganze Lektionsinhalt komprimiert IM
   LINK SELBST (URL-Fragment, alles nach "#"). Damit gibt es keine neue
   Firestore-Sammlung, keinen Lesezugriff ueber Kontogrenzen hinweg - nichts,
   was serverseitig gespeichert wuerde. Strukturell derselbe Fall wie der
   laengst unbedenkliche Datei-Export (exportWeitergabe), nur per Link statt
   Datei. Bewusste Entscheidung des Betreibers, dokumentiert in GERUEST.md:
   dafuer gibt es KEINEN Widerruf (ein verschickter Link funktioniert wie
   eine verschickte Datei fuer immer) und eine Laengengrenze.

   Das Fragment (nicht die Query-String!) ist Absicht: Alles nach "#" geht
   nie an einen Server - taucht also auch nicht in Zugriffs-Logs von Firebase
   Hosting auf. Ein Query-Parameter waere dafuer der falsche Ort gewesen. */
const TEIL_LINK_MAX_ZEICHEN = 4000; // grosszuegig unter praktischen Grenzen von Messenger-Links

function bytesZuBase64Url(bytes) {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function base64UrlZuBytes(str) {
  let s = str.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  const bin = atob(s);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}
/* CompressionStream/DecompressionStream sind eine eingebaute Browser-API
   (kein neues Abhaengigkeits-Paket, siehe README.md "kein Build-Schritt").
   Wo sie fehlt (aeltere Browser), wird unkomprimiert codiert - der Link
   wird dann laenger und stoesst frueher an TEIL_LINK_MAX_ZEICHEN, funktioniert
   aber weiterhin. */
async function komprimiere(text) {
  const roh = new TextEncoder().encode(text);
  if (typeof CompressionStream === "undefined") return { kompr: false, bytes: roh };
  const cs = new CompressionStream("gzip");
  const writer = cs.writable.getWriter();
  writer.write(roh);
  writer.close();
  const buf = await new Response(cs.readable).arrayBuffer();
  return { kompr: true, bytes: new Uint8Array(buf) };
}
async function dekomprimiere(bytes, warKomprimiert) {
  if (!warKomprimiert) return new TextDecoder().decode(bytes);
  const ds = new DecompressionStream("gzip");
  const writer = ds.writable.getWriter();
  writer.write(bytes);
  writer.close();
  const buf = await new Response(ds.readable).arrayBuffer();
  return new TextDecoder().decode(buf);
}

function genTeilCode() {
  /* Absichtlich kryptographisch zufaellig, nicht genId(): der Code ist hier
     die einzige Zugriffsschranke (wer ihn kennt, kann lesen), nicht nur eine
     Dokument-Nummer. Math.random() waere fuer diesen Zweck zu schwach. */
  const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // ohne 0/O/1/I - keine Verwechslung
  const bytes = new Uint8Array(10);
  crypto.getRandomValues(bytes);
  let code = "";
  for (const b of bytes) code += ALPHABET[b % ALPHABET.length];
  return code.slice(0, 5) + "-" + code.slice(5);
}

async function teileLektionCode() {
  const b = currentBereich();
  if (!(await weitergabeMoeglich(b))) return;
  if (b.teilCode) {
    await dlgAlert('„' + b.name + '" wird schon über den Code ' + b.teilCode + ' geteilt. ' +
      'Erst „Teilen beenden", dann neu teilen.', "Schon aktiv");
    return;
  }
  const version = (b.satzVersion || 0) + 1;
  const ok = await dlgConfirm(
    'Erzeugt einen Code, über den jede:r mit dem Code diese Lektion in die eigene App übernehmen kann - ' +
    'ohne dass du erfährst, wer oder wie oft. Du kannst das Teilen jederzeit beenden.',
    { title: "Per Code teilen", okLabel: "Code erzeugen" });
  if (!ok) return;

  if (!b.satzId) b.satzId = slugName(b.name) + "-" + genId();
  b.satzVersion = version;
  const code = genTeilCode();
  b.teilCode = code;
  patchDoc({
    [pfadBereich(b.id) + ".satzId"]: b.satzId,
    [pfadBereich(b.id) + ".satzVersion"]: version,
    [pfadBereich(b.id) + ".teilCode"]: code
  });
  try {
    await fb.setDoc(fb.doc(db, "geteilteLektionen", code), {
      ownerUid: currentUser.uid,
      erstelltAm: new Date().toISOString(),
      inhalt: { bereiche: [baueWeitergabeBereich(b, version)] }
    });
  } catch (e) {
    await dlgAlert("Fehler beim Speichern des Codes: " + (e && e.message ? e.message : e), "Fehler");
    return;
  }
  render();
  zeigeTeileCode(code);
}

async function beendeTeilenCode() {
  const b = currentBereich();
  if (!b.teilCode) return;
  const code = b.teilCode;
  const ok = await dlgConfirm("Der Code " + code + " funktioniert danach nicht mehr.",
    { title: "Teilen beenden?", okLabel: "Beenden", danger: true });
  if (!ok) return;
  b.teilCode = null;
  patchDoc({ [pfadBereich(b.id) + ".teilCode"]: fb.deleteField() });
  try { await fb.deleteDoc(fb.doc(db, "geteilteLektionen", code)); } catch (e) {}
  render();
}

async function codeEinloesenStart() {
  const code = await dlgPrompt("Code eingeben (von der Person, die geteilt hat):", "",
    { title: "Code einlösen", okLabel: "Einlösen" });
  if (!code || !code.trim()) return;
  await codeEinloesen(code.trim().toUpperCase());
}

async function codeEinloesen(code) {
  let snap;
  try {
    snap = await fb.getDoc(fb.doc(db, "geteilteLektionen", code));
  } catch (e) {
    await dlgAlert("Konnte den Code nicht prüfen: " + (e && e.message ? e.message : e), "Fehler");
    return;
  }
  if (!snap.exists()) {
    await dlgAlert("Diesen Code gibt es nicht (mehr). Prüf die Schreibweise, oder frag noch einmal nach.", "Code ungültig");
    return;
  }
  const ok = await dlgConfirm("Über einen Code wurde dir eine Lektion angeboten. Jetzt in dein Konto übernehmen?",
    { title: "Geteilte Lektion", okLabel: "Übernehmen" });
  if (!ok) return;
  await verarbeiteImportDaten(snap.data().inhalt);
}

/* Zeigt den erzeugten Code mit Copy-Button und Feedback. */
async function zeigeTeileCode(code) {
  await new Promise(resolve => {
    ui.dialog = {
      kind: "code-share",
      title: "Code zum Teilen",
      code: code,
      resolve: resolve
    };
    render();
  });
}

/* ---------- Deprecated: Link-basiertes Teilen (v3.5.x) - wird nicht mehr genutzt ----------
   Falls noch URLs mit #teilen= im Umlauf sind, diese Funktionen als Stubs beibehalten.
   Der Code-basierte Ansatz ist skalierbar (bis 3000+ Karten) und nicht invasiv. */

async function teileLektionLink() {
  await dlgAlert("Link-basiertes Teilen ist nicht mehr verfügbar. " +
    "Bitte nutze stattdessen das neue Code-System – klick 'Per Code teilen' in den Einstellungen.",
    "Link-System depreciert");
}

async function linkEinloesenStart() {
  await dlgAlert("Link-basiertes Teilen ist nicht mehr verfügbar. " +
    "Bitte frag die Person, die dir die Lektion zeigen will, nach einem aktuellen Code.",
    "Link-System depreciert");
}

/* ---------- 2.5.0: Nachschub für einen vorhandenen Kartensatz ----------

   Bis 2.4.0 legte jeder Import einen NEUEN Bereich an. Fuer ein normales
   Backup ist das richtig - es schuetzt davor, dass eine alte Datei einen
   neueren Stand ueberbuegelt. Fuer die zweite Ausgabe eines weitergegebenen
   Kartensatzes ist es fatal: Wer Lektion 6-10 nachbekommt, haette danach
   zweimal "Medina 1", die ersten 125 Karten doppelt, und seinen Lernstand
   von vier Wochen im falschen der beiden Bereiche.

   Deshalb erkennt der Import jetzt wieder, was er schon kennt. Zwei Angaben
   machen das moeglich, beide seit 2.3.0 in jeder Weitergabe-Datei:
     - die Kennung des Satzes am Bereich (satzId)
     - eine Herkunfts-Nummer an jeder Karte und jeder Speicherkarte (quelleId)
   Die Nummern der Karten aendern sich beim Import (seit 2.2.0, sonst
   ueberschreibt ein Import vorhandene Karten). Die Herkunfts-Nummer bleibt -
   sie ist das einzige, was ueber zwei Veroeffentlichungen hinweg haelt.

   Was beim Zusammenfuehren gilt:
     - Der Autor bestimmt den INHALT: Text, Notiz, Reihenfolge, welche Karten
       es gibt, welche Lektionen es gibt.
     - Der Lernende behaelt seinen FORTSCHRITT: Stufe, Faelligkeit,
       Rueckfaelle - und welche Lektionen er freigeschaltet hat. Eine Lektion,
       die er offen hat, wird nicht wieder zugesperrt, nur weil sie in der
       Datei gesperrt steht.
     - Eigene Speicherkarten des Lernenden bleiben unangetastet.

   Und eine Sicherung: Zusammengefuehrt wird nur in einen GEFUEHRTEN Bereich.
   Der eigene Bereich, aus dem der Satz stammt, traegt dieselbe Kennung -
   ohne diese Bedingung wuerde ein Testimport der eigenen Datei den eigenen
   Meisterbereich umbauen. So entsteht stattdessen eine gefuehrte Kopie zum
   Ausprobieren, genau wie bei einem Bruder. */
function satzUnterschied(ziel, datei) {
  const zielNachQuelle = kartenNachHerkunft(ziel);
  const gesehen = new Set();
  const neu = [], aktualisiert = [];
  for (const c of datei.karten) {
    const q = herkunftsSchluessel(c);
    const vorhanden = zielNachQuelle.get(q) || zielNachQuelle.get("w:" + c.wort);
    if (!vorhanden) { neu.push(c); continue; }
    gesehen.add(vorhanden.id);
    if (vorhanden.wort !== c.wort || vorhanden.uebersetzung !== c.uebersetzung || vorhanden.extra !== c.extra) {
      aktualisiert.push(c);
    }
  }
  const entfernt = ziel.karten.filter(c => !gesehen.has(c.id));
  /* Speicherkarten ohne Herkunfts-Nummer hat sich der Lernende selbst
     angelegt - die gehoeren ihm und bleiben, egal was in der Datei steht. */
  const dateiSetQuellen = new Set(datei.sets.map(s => s.quelleId || s.id));
  const neueSets = datei.sets.filter(s => !ziel.sets.some(z => z.quelleId === (s.quelleId || s.id)));
  const entfernteSets = ziel.sets.filter(s => s.quelleId && !dateiSetQuellen.has(s.quelleId));
  return { neu, aktualisiert, entfernt, neueSets, entfernteSets };
}

/* Karten des Ziels nach Herkunfts-Nummer.

   2.10.0: Fehlt die Herkunfts-Nummer, wird ersatzweise das arabische Wort
   genommen. Grund: Eine Datei, die aus einem normalen Backup stammt, hat
   keine Herkunfts-Nummern - traf sie auf einen gefuehrten Satz, passte KEINE
   einzige Karte, und das Zusammenfuehren tauschte alle 133 gegen 133 neue
   aus. Fuer den Lernenden hiess das: Lernstand weg. Mit dem Wort als
   Rueckfallebene bleibt die Zuordnung erhalten. */
function kartenNachHerkunft(b) {
  const m = new Map();
  for (const c of b.karten) if (c.quelleId) m.set(c.quelleId, c);
  for (const c of b.karten) if (!m.has("w:" + c.wort)) m.set("w:" + c.wort, c);
  return m;
}
function herkunftsSchluessel(c) { return c.quelleId || "w:" + c.wort; }

async function satzZusammenfuehren(ziel, datei) {
  const d = satzUnterschied(ziel, datei);
  const neueLektionen = d.neueSets.filter(s => s.art === "lektion").length;
  let text = "Ausgabe Nr. " + (datei.satzVersion || 1) + " von „" + datei.name + "\".\n\n";
  const zeilen = [];
  if (d.neu.length) zeilen.push("• " + d.neu.length + " Karte(n) kommen dazu" + (neueLektionen ? " (" + neueLektionen + " neue Lektion(en), gesperrt)" : ""));
  if (d.aktualisiert.length) zeilen.push("• " + d.aktualisiert.length + " Karte(n) werden im Text berichtigt");
  if (d.entfernt.length) zeilen.push("• " + d.entfernt.length + " Karte(n) fallen weg");
  if (d.entfernteSets.length) zeilen.push("• " + d.entfernteSets.length + " Speicherkarte(n) fallen weg");
  /* 2.11.5: Aendert sich nichts, gibt es auch nichts zu bestaetigen. Vorher
     stand da ein "Übernehmen" fuer einen Vorgang ohne Wirkung. */
  if (zeilen.length === 0 && (datei.satzVersion || 1) <= (ziel.satzVersion || 0)) {
    await dlgAlert('Diese Ausgabe von „' + datei.name + '" hast du schon (Nr. ' + (ziel.satzVersion || 0) + '). Am Inhalt ändert sich nichts.',
      "Nichts zu tun");
    return null;
  }
  if (zeilen.length === 0) zeilen.push("• Am Inhalt ändert sich nichts.");
  text += zeilen.join("\n");
  text += "\n\nDein Lernstand und die von dir freigeschalteten Lektionen bleiben.";
  if ((datei.satzVersion || 1) <= (ziel.satzVersion || 0)) {
    text = "Diese Ausgabe hast du schon (Nr. " + (ziel.satzVersion || 0) + ").\n\n" + text;
  }
  /* 2.10.0: Notbremse. Faellt mehr als die Haelfte weg, stimmt mit der Datei
     etwas nicht - etwa ein normales Backup, das auf einen gefuehrten Satz
     trifft. Lieber einmal zu viel gefragt als ein Lernstand weniger. */
  if (d.entfernt.length > ziel.karten.length / 2 && ziel.karten.length > 0) {
    text = "Achtung: " + d.entfernt.length + " von " + ziel.karten.length +
      " Karten würden wegfallen – samt ihrem Lernstand.\n\nDas passt fast nie. " +
      "Meist stammt die Datei nicht aus derselben Reihe.\n\n" + text;
  }
  const ok = await dlgConfirm(text, { title: "Kartensatz aktualisieren?", okLabel: "Übernehmen" });
  if (!ok) return null;

  /* 1. Karten: vorhandene behalten (mit Fortschritt), fehlende anlegen,
        weggefallene loeschen. Die Reihenfolge kommt aus der Datei. */
  const nachQuelle = kartenNachHerkunft(ziel);
  const vergeben = new Set(ziel.karten.map(c => c.id));
  const frisch = () => { let x = genId(); while (vergeben.has(x)) x = genId(); vergeben.add(x); return x; };
  const dateiZuLokal = new Map();   // Karten-Nummer in der Datei -> Karte im Konto
  const neueListe = [];
  for (const c of datei.karten) {
    const q = herkunftsSchluessel(c);
    let lokal = nachQuelle.get(q) || nachQuelle.get("w:" + c.wort);
    if (lokal) {
      if (!lokal.quelleId && c.quelleId) lokal.quelleId = c.quelleId;   // Nummer nachtragen
      lokal.wort = c.wort;
      lokal.uebersetzung = c.uebersetzung;
      lokal.extra = c.extra;
      /* stufe, nextReview, ersteBewertung, rueckfaelle bleiben, wie sie sind */
    } else {
      lokal = normCard({ id: frisch(), wort: c.wort, uebersetzung: c.uebersetzung, extra: c.extra, stufe: 0, quelleId: q });
      lokal.nextReview = todayStr();
    }
    dateiZuLokal.set(c.id, lokal);
    neueListe.push(lokal);
  }
  const behalten = new Set(neueListe.map(c => c.id));
  const geloeschteIds = ziel.karten.filter(c => !behalten.has(c.id)).map(c => c.id);
  ziel.karten = neueListe;

  /* 2. Speicherkarten: Inhalt und Name aus der Datei, Schloss vom Lernenden.
        Eigene (ohne Herkunfts-Nummer) bleiben stehen und verlieren nur
        Verweise auf Karten, die es nicht mehr gibt. */
  const uebersetzeIds = ids => ids.map(fid => dateiZuLokal.get(fid)).filter(Boolean).map(c => c.id);
  const zielNachSetQuelle = new Map();
  for (const s of ziel.sets) if (s.quelleId) zielNachSetQuelle.set(s.quelleId, s);
  const dateiSetQuellen = new Set(datei.sets.map(s => s.quelleId || s.id));
  const eigene = ziel.sets.filter(s => !s.quelleId);
  const ausDatei = datei.sets.map(s => {
    const q = s.quelleId || s.id;
    const vorhanden = zielNachSetQuelle.get(q);
    if (vorhanden) {
      vorhanden.name = s.name;
      vorhanden.art = s.art;
      vorhanden.cardIds = uebersetzeIds(s.cardIds);
      return vorhanden;
    }
    return normSet({ id: frisch(), quelleId: q, name: s.name, art: s.art, cardIds: uebersetzeIds(s.cardIds) });
  });
  const behalteneCardIds = new Set(neueListe.map(c => c.id));
  eigene.forEach(s => { s.cardIds = s.cardIds.filter(id => behalteneCardIds.has(id)); });
  const geloeschteSetIds = ziel.sets
    .filter(s => s.quelleId && !dateiSetQuellen.has(s.quelleId))
    .map(s => s.id);
  ziel.sets = ausDatei.concat(eigene);

  ziel.name = datei.name;
  ziel.satzVersion = datei.satzVersion || 1;

  /* 3. Schreiben. Der ganze Bereich wird neu geschrieben (Name, Kennung,
        Speicherkarten, alle Karten) - dazu die ausdruecklichen Loeschungen,
        denn ein Vollschreiben entfernt nichts, was nicht mehr vorkommt. */
  const idx = bereiche.findIndex(x => x.id === ziel.id);
  const patch = { [pfadBereich(ziel.id)]: bereichFelder(ziel, idx < 0 ? 0 : idx) };
  for (const cid of geloeschteIds) patch[pfadKarte(ziel.id, cid)] = LOESCHEN;
  for (const sid of geloeschteSetIds) patch[pfadSet(ziel.id, sid)] = LOESCHEN;
  patchDoc(patch);
  return d;
}

/* Herausgezogen aus importBackupFile(), damit der Link-Entwurf aus
   lehrer-modus/GERUEST.md (teilLinkPruefenUndVerarbeiten(), Abschnitt J)
   denselben Weg nimmt wie ein Datei-Import - dieselben Grenzen, dieselbe
   Zusammenfuehrungs-Logik, keine zweite, moeglicherweise abweichende
   Fassung. `data` hat die Form {bereiche: [...]}, egal ob sie aus einer
   Datei oder aus einem per Link geteilten Fragment kommt. */
async function verarbeiteImportDaten(data) {
  if (!data || !Array.isArray(data.bereiche)) {
    await dlgAlert("Das ist kein gültiger Lernkarten-Bestand.", "Import nicht möglich");
    return;
  }
  /* Anzahl pruefen, bevor normBereiche den ganzen Bestand aufbaut und
     bevor irgendetwas geschrieben wird. Gezaehlt wird auf den Rohdaten:
     Was hier zu gross ist, soll gar nicht erst entstehen. */
  if (data.bereiche.length > IMPORT_MAX_BEREICHE) {
    await dlgAlert("Das enthält " + data.bereiche.length + " Bereiche. Eingespielt werden bis zu " +
      IMPORT_MAX_BEREICHE + ".", "Import nicht möglich");
    return;
  }
  let kartenGesamt = 0;
  for (const b of data.bereiche) {
    if (b && typeof b === "object" && Array.isArray(b.karten)) kartenGesamt += b.karten.length;
  }
  if (kartenGesamt > IMPORT_MAX_KARTEN) {
    await dlgAlert("Das enthält " + kartenGesamt + " Karten. Eingespielt werden bis zu " +
      IMPORT_MAX_KARTEN + " auf einmal.", "Import nicht möglich");
    return;
  }
  /* 2.19.0: Eingespielt wird aus den Einstellungen heraus - das Ergebnis
     steht aber in den Bereichen. Ohne diese Zeile bliebe man auf dem
     Einstellungs-Bildschirm stehen und saehe von 120 neuen Karten nichts. */
  ui.einstellungen = false;
  const imported = normBereiche(data.bereiche);

  /* 2.5.0: Erst pruefen, was davon Nachschub für einen schon vorhandenen
     Satz ist. Nur der Rest wird als neuer Bereich angelegt. */
  const anzulegen = [];
  const berichte = [];
  for (const b of imported) {
    /* 2.11.5: Zusammengefuehrt wird nur, was auch als Kartensatz gedacht
       war. Ein gewoehnliches Backup traegt zwar dieselbe Kennung - es ist
       aber der Arbeitsstand des Autors samt seiner eigenen Speicherkarten,
       und die haben im Satz eines anderen nichts verloren. Es entsteht dann
       wie bei jeder normalen Datei ein eigener Bereich. */
    const ziel = (b.satzId && b.gefuehrt) ? bereiche.find(x => x.satzId === b.satzId && istGefuehrt(x)) : null;
    if (!ziel) { anzulegen.push(b); continue; }
    const bericht = await satzZusammenfuehren(ziel, b);
    if (bericht) berichte.push({ name: ziel.name, bericht: bericht });
  }
  if (anzulegen.length === 0) {
    render();
    if (berichte.length > 0) {
      const r = berichte[0].bericht;
      await dlgAlert('„' + berichte[0].name + '" ist aktualisiert: ' +
        r.neu.length + ' Karte(n) dazu, ' + r.aktualisiert.length + ' berichtigt, ' + r.entfernt.length + ' weggefallen. ' +
        'Dein Lernstand ist unverändert.', "Kartensatz aktualisiert");
    }
    return;
  }
  imported.length = 0;
  for (const b of anzulegen) imported.push(b);

  /* A4: Die eingespielten Bereiche kommen als eigene Feldpfade dazu.
     Vorhandene Bereiche werden dabei nicht angefasst - frueher wurde das
     ganze Dokument neu geschrieben, ein Import konnte also Karten
     ueberbuegeln, die inzwischen auf einem anderen Geraet entstanden waren. */
  const patch = {};
  for (const b of imported) {
    let name = b.name;
    if (bereiche.some(x => x.name === name)) {
      let n = 2;
      while (bereiche.some(x => x.name === name + " (" + n + ")")) n++;
      name = name + " (" + n + ")";
    }
    /* 2.2.0: Jede importierte Karte bekommt eine NEUE Nummer.
       Seit dem Umbau in 2.0.0 liegt jede Karte als eigener Datensatz unter
       ihrer Nummer. Behielt der Import die Nummern aus der Datei bei und
       gab es diese Karten im Konto noch, ueberschrieb der Import sie und zog
       sie in den neuen Bereich hinueber - der alte Bereich blieb leer
       zurueck. Genau das passierte beim zweiten Import derselben Datei.
       Mit neuen Nummern kann das nicht mehr vorkommen. Die Verweise in den
       Speicherkarten werden mit umgeschrieben, sonst zeigten sie ins Leere. */
    const vergeben = new Set();
    const frisch = () => { let x = genId(); while (vergeben.has(x)) x = genId(); vergeben.add(x); return x; };
    const nummernTausch = new Map();
    b.karten.forEach(c => { const altId = c.id; c.id = frisch(); nummernTausch.set(altId, c.id); });
    (b.sets || []).forEach(st => {
      st.id = frisch();
      st.cardIds = st.cardIds.map(x => nummernTausch.get(x)).filter(Boolean);
    });
    const neu = {
      id: genId(), name: name,
      /* 2.3.0: Schreibschutz, Kennung und Nummer kommen aus der Datei. Ein
         normales Backup hat sie nicht - dann entsteht wie bisher ein ganz
         gewoehnlicher, frei bearbeitbarer Bereich. */
      gefuehrt: b.gefuehrt === true,
      satzId: b.satzId || null,
      satzVersion: b.satzVersion || 0,
      karten: b.karten, sets: b.sets || []
    };
    bereiche.push(neu);
    patch[pfadBereich(neu.id)] = bereichFelder(neu, bereiche.length - 1);
  }
  patchDoc(patch);
  render();
  dlgAlert(imported.length + " Bereich(e) mit insgesamt " + imported.reduce((sum, b) => sum + b.karten.length, 0) + " Karte(n) importiert.", "Import fertig");
}

function importBackupFile(file) {
  if (!file) return;
  /* Zuerst die Groesse - das geht, ohne die Datei anzufassen. Eine 400-MB-
     Datei einzulesen und erst danach festzustellen, dass sie nicht passt,
     laesst das Handy vorher stehen. */
  if (typeof file.size === "number" && file.size > IMPORT_MAX_BYTES) {
    dlgAlert("Diese Datei ist " + Math.round(file.size / 1024 / 1024) + " MB groß. Eingespielt werden Dateien bis " +
      Math.round(IMPORT_MAX_BYTES / 1024 / 1024) + " MB.\n\nEine echte Sicherung dieser App ist deutlich kleiner – " +
      "vermutlich ist es die falsche Datei.", "Datei zu groß");
    return;
  }
  const reader = new FileReader();
  reader.onload = async () => {
    let data;
    try {
      data = JSON.parse(reader.result);
    } catch (e) {
      await dlgAlert("Diese Datei ist keine gültige Backup-Datei (kein lesbares JSON).", "Import nicht möglich");
      return;
    }
    if (!data || !Array.isArray(data.bereiche)) {
      await dlgAlert("Diese Datei ist keine gültige Lernkarten-Backup-Datei.", "Import nicht möglich");
      return;
    }
    await verarbeiteImportDaten(data);
  };
  reader.readAsText(file);
}

/* ---------- Bereiche ---------- */
async function addBereich() {
  const name = await dlgPrompt("Wie soll der neue Bereich heißen?", "", { title: "Neuer Bereich", okLabel: "Anlegen" });
  if (!name || !name.trim()) return;
  const n = name.trim().slice(0, 40);
  let b = bereiche.find(x => x.name === n);
  if (!b) {
    b = { id: genId(), name: n, karten: [], sets: [] };
    bereiche.push(b);
    patchDoc({ [pfadBereich(b.id)]: bereichFelder(b, bereiche.length - 1) });
  }
  ui.bereichId = b.id;
  ui.bereichSheet = false;
  ui.session = null;
  ui.editId = null;
  render();
}
function selectBereich(bereichId) {
  if (!bereiche.some(b => b.id === bereichId)) return;
  ui.bereichId = bereichId;
  ui.bereichSheet = false;     // 3.0.0: Das Sheet hat seine Aufgabe erfuellt.
  /* Sonst bleibt der Einstellungs-Bildschirm stehen: Der Bereich wechselt im
     Hintergrund, aber man sieht es erst nach "Fertig". */
  ui.einstellungen = false;
  ui.session = null;
  /* Die Speicherkarte gehoert zu ihrem Bereich - nach einem Wechsel zeigte
     die Durchsicht sonst auf eine Auswahl, die es hier nicht gibt. */
  ui.lernSetId = null;
  ui.lernLetzte = null;
  ui.editId = null;
  ui.cardDetailId = null;
  resetFormDraft();
  ui.searchQuery = "";
  ui.kartenSeite = 0;
  ui.selectMode = false;
  ui.selectedIds = new Set();
  ui.drillOpen = false;
  ui.drillSource = "stufen";
  ui.drillSetIds = new Set();
  ui.drillVon = null;
  ui.drillBis = null;
  ui.drillAnker = null;
  ui.openSetId = null;
  ui.setArtSheetId = null;
  /* 15.09.2026: Ohne das blieb die Seite auf der Scroll-Position des vorigen
     Bereichs stehen - wer unten in "Medina" war und zu einem anderen
     Bereich wechselte, landete dort ebenfalls unten statt oben. */
  window.scrollTo(0, 0);
  render();
}
async function renameBereich() {
  const b = currentBereich();
  const name = await dlgPrompt("Neuer Name für den Bereich:", b.name, { title: "Bereich umbenennen", okLabel: "Speichern" });
  if (!name || !name.trim()) return;
  const n = name.trim().slice(0, 40);
  if (n === b.name) return;
  if (bereiche.some(x => x !== b && x.name === n)) {
    await dlgAlert('Ein Bereich namens „' + n + '" existiert schon.', "Name schon vergeben");
    return;
  }
  b.name = n;
  patchDoc({ [pfadBereich(b.id) + ".name"]: n });
  render();
}
async function deleteBereich() {
  if (bereiche.length <= 1) {
    await dlgAlert("Der letzte verbleibende Bereich kann nicht gelöscht werden.", "Nicht möglich");
    return;
  }
  const b = currentBereich();
  /* 2.11.0: Zwei Sicherungen statt einer Nachfrage, die man wegtippt.

     Erstens laedt die App vorher ein Backup dieses Bereichs herunter - ohne
     zu fragen. Es kostet nichts und ist im Ernstfall alles.

     Zweitens muss der Name getippt werden. Ein „Ja"-Knopf laesst sich blind
     druecken, ein Name nicht: dafuer muss man hinsehen. Dreimal nachfragen
     haette nichts gebracht, das klickt man genauso weg. */
  exportBackup(true);
  const eingabe = await dlgPrompt(
    'Es werden ' + b.karten.length + ' Karte(n) mit ihrem gesamten Lernstand gelöscht. Das lässt sich nicht rückgängig machen.\n\n' +
    'Ein Backup dieses Bereichs wurde gerade zum Herunterladen angeboten – ' +
    'sieh in deinen Downloads nach, dass die Datei wirklich da ist.\n\n' +
    'Tipp zum Bestätigen den Namen des Bereichs ein: ' + b.name,
    "", { title: "Bereich löschen?", okLabel: "Endgültig löschen", danger: true });
  if (eingabe === null) return;
  if (eingabe.trim() !== b.name.trim()) {
    await dlgAlert("Der Name stimmt nicht überein – es wurde nichts gelöscht.", "Abgebrochen");
    return;
  }
  const idx = bereiche.findIndex(x => x.id === b.id);
  bereiche.splice(idx, 1);
  ui.bereichId = bereiche[Math.max(0, Math.min(idx, bereiche.length - 1))].id;
  ui.session = null;
  ui.editId = null;
  /* A4: nur diesen einen Bereich entfernen. deleteField() loescht genau
     dieses Feld, alles daneben bleibt so, wie es in der Cloud steht. */
  patchDoc({ [pfadBereich(b.id)]: LOESCHEN });
  render();
}

/* ---------- Mehrfachauswahl ---------- */
async function reverseOrder() {
  const cards = currentCards();
  if (cards.length < 2) return;
  if (!kartenBearbeitbar()) { await hinweisGefuehrt("Die Reihenfolge ändern"); return; }
  const ok = await dlgConfirm('Die Reihenfolge aller ' + cards.length + ' Karten in „' +
    currentBereich().name + '" wird einmalig umgekehrt.',
    { title: "Reihenfolge umkehren?", okLabel: "Umkehren" });
  if (!ok) return;
  cards.reverse();
  patchDoc(ordnungPatch(currentBereich()));
  render();
}
function toggleSelectMode() {
  ui.selectMode = !ui.selectMode;
  ui.selectedIds = new Set();
  ui.drillOpen = false;
  render();
}
function toggleCardSelected(id) {
  const vorher = ui.selectedIds.size;
  if (ui.selectedIds.has(id)) ui.selectedIds.delete(id);
  else ui.selectedIds.add(id);
  const nachher = ui.selectedIds.size;
  /* C2: Ein Haken soll nicht die ganze Liste neu bauen. Komplett neu
     gezeichnet wird nur, wenn die Aktionsleiste dabei erscheint oder
     verschwindet - also beim Sprung von 0 auf 1 und zurueck. Sonst reicht
     es, das Kaestchen und die Zahl in der Leiste zu aendern.
     Findet sich eine der beiden Stellen nicht, wird sicherheitshalber doch
     neu gezeichnet: lieber einmal ruckeln als eine Anzeige, die luegt. */
  if (vorher === 0 || nachher === 0) { render(); return; }
  const zeile = app.querySelector('[data-action="toggle-card-select"][data-id="' + CSS.escape(id) + '"]');
  const kasten = zeile ? zeile.querySelector('input[type="checkbox"]') : null;
  const zaehler = app.querySelector(".select-actionbar strong");
  if (!kasten || !zaehler) { render(); return; }
  kasten.checked = ui.selectedIds.has(id);
  zaehler.textContent = String(nachher);
}
async function deleteSelectedCards() {
  const n = ui.selectedIds.size;
  if (n === 0) return;
  if (!kartenBearbeitbar()) { await hinweisGefuehrt("Karten löschen"); return; }
  const ok = await dlgConfirm(n + " Karte(n) werden endgültig gelöscht. Das lässt sich nicht rückgängig machen.",
    { title: "Karten löschen?", okLabel: "Endgültig löschen", danger: true });
  if (!ok) return;
  const b = currentBereich();
  const geloescht = new Set(ui.selectedIds);
  const cards = b.karten;
  for (let i = cards.length - 1; i >= 0; i--) {
    if (geloescht.has(cards[i].id)) cards.splice(i, 1);
  }
  /* A4: gezielt entfernen. Die Ordnungszahlen der uebrigen Karten bleiben
     stehen - es entstehen Luecken (0, 1, 3, ...), und das ist in Ordnung:
     sortiert wird nach dem Wert, nicht nach luekenloser Zaehlung. */
  const patch = {};
  geloescht.forEach(id => { patch[pfadKarte(b.id, id)] = LOESCHEN; });
  purgeFromSets(geloescht).forEach(st => {
    patch[pfadSet(b.id, st.id) + ".cardIds"] = st.cardIds;
  });
  ui.selectedIds = new Set();
  patchDoc(patch);
  render();
}
/* A3 (1.9.0): Das Ziel wird ueber seine ID gesucht, nicht mehr ueber den
   Namen. Zwei gleichnamige Bereiche konnten sonst entstehen (normBereiche
   filtert doppelte Namen, bereicheMapToArray nicht) - und dann traf das
   Verschieben den falschen. */
function moveSelectedCardsTo(targetId) {
  const n = ui.selectedIds.size;
  if (n === 0) return;
  const quelle = currentBereich();
  const target = bereiche.find(b => b.id === targetId);
  if (!target || target === quelle) return;
  /* In beide Richtungen gesperrt: aus einem gefuehrten Satz darf nichts
     verschwinden, und hinein darf nichts, was der Autor nicht kennt. */
  if (istGefuehrt(quelle)) { hinweisGefuehrt("Karten verschieben"); return; }
  if (istGefuehrt(target)) { dlgAlert('„' + target.name + '" ist ein geführter Kartensatz – da lässt sich nichts hineinschieben.', "Nicht möglich"); return; }
  const cards = quelle.karten;
  const moved = [];
  for (let i = cards.length - 1; i >= 0; i--) {
    if (ui.selectedIds.has(cards[i].id)) {
      moved.unshift(cards[i]);
      cards.splice(i, 1);
    }
  }
  if (moved.length === 0) return;
  target.karten.unshift(...moved);
  const patch = {};
  /* A4: aus der Quelle entfernen, im Ziel neu anlegen, und im Ziel die
     Ordnungszahlen der uebrigen Karten nachziehen (sie ruecken alle nach
     hinten). Die verschobenen Karten selbst werden komplett geschrieben und
     sind deshalb von ordnungPatch ausgenommen - Firestore lehnt eine
     Aktualisierung ab, in der ein Feldpfad in einem anderen steckt. */
  const bewegt = new Set(moved.map(c => c.id));
  moved.forEach(c => { patch[pfadKarte(quelle.id, c.id)] = LOESCHEN; });
  moved.forEach((c, i) => { patch[pfadKarte(target.id, c.id)] = kartenFelder(c, i); });
  ordnungPatch(target, patch, bewegt);
  purgeFromSets(ui.selectedIds).forEach(st => {
    patch[pfadSet(quelle.id, st.id) + ".cardIds"] = st.cardIds;
  });
  ui.selectedIds = new Set();
  ui.selectMode = false;
  patchDoc(patch);
  render();
}

/* ---------- Speicherkarten (benannte Merklisten aus ausgewählten Karten) ---------- */
/* Entfernt IDs aus allen Speicherkarten des Bereichs, wenn Karten gelöscht oder
   verschoben werden – sonst zeigt eine Speicherkarte auf nicht mehr vorhandene Karten. */
/* Gibt die Speicherkarten zurueck, die dadurch wirklich kuerzer geworden
   sind - nur deren cardIds muessen anschliessend geschrieben werden (A4). */
function purgeFromSets(ids) {
  const idSet = ids instanceof Set ? ids : new Set(ids);
  const geaendert = [];
  currentSets().forEach(s => {
    const vorher = s.cardIds.length;
    s.cardIds = s.cardIds.filter(id => !idSet.has(id));
    if (s.cardIds.length !== vorher) geaendert.push(s);
  });
  return geaendert;
}
/* 2.11.0: „Merken" mitten in der Sitzung. Eigene Speicherkarten gab es
   laengst, aber der Weg dorthin fuehrte ueber Verwalten, Auswahlmodus und
   einen Stern - das findet niemand. Gemerkt wird eine Karte aber genau in
   dem Moment, in dem man merkt, dass sie schwer ist: mitten im Abfragen.
   Deshalb ein Knopf dort, und er legt die Sammelkarte beim ersten Mal
   selbst an. */
const MERK_SET_NAME = "Schwierige Wörter";
async function karteMerken(id) {
  const b = currentBereich();
  const card = b.karten.find(c => c.id === id);
  if (!card) return;
  let set = (b.sets || []).find(x => x.art === "eigen" && x.name === MERK_SET_NAME);
  let neu = false;
  if (!set) {
    set = normSet({ id: genId(), name: MERK_SET_NAME, art: "eigen", cardIds: [] });
    (b.sets = b.sets || []).push(set);
    neu = true;
  }
  /* 2.14.1: Zweiter Tipp nimmt es wieder heraus. Vorher kam an dieser Stelle
     ein Hinweis "liegt schon drin" - eine Sackgasse: Er sagte einem, was man
     ohnehin sah, und liess einen nichts tun. Wer sich vertippt, soll es
     zuruecknehmen koennen, ohne den Tab zu wechseln. */
  const drin = set.cardIds.indexOf(id);
  if (drin !== -1) {
    set.cardIds.splice(drin, 1);
    ui.gemerktRunde.delete(id);
  } else {
    set.cardIds.push(id);
    ui.gemerktRunde.add(id);
    ui.merkPop = id;   // 2.21.5: Stern-Pop nur beim Hinzufuegen, nicht beim Herausnehmen
  }
  patchDoc(neu
    ? { [pfadSet(b.id, set.id)]: setFelder(set, b.sets.length - 1) }
    : { [pfadSet(b.id, set.id) + ".cardIds"]: set.cardIds });
  render();
}

async function saveSelectedToSet(targetId) {
  const b0 = currentBereich();
  const frei = freieIdsFor(b0);
  /* In einem gefuehrten Satz laesst sich nur ablegen, was freigeschaltet ist.
     Sonst koennte man sich ueber die Kategorien den ganzen Stoff nach vorn
     holen, statt bei der ersten Lektion anzufangen - und genau davor soll das
     Schloss schuetzen. */
  const ids = [...ui.selectedIds].filter(id => frei === null || frei.has(id));
  if (ids.length === 0) {
    if (ui.selectedIds.size > 0) await dlgAlert("Von der Auswahl ist keine Karte freigeschaltet. Gesperrte Karten lassen sich nicht ablegen.", "Nichts zum Ablegen");
    return;
  }
  const uebersprungen = ui.selectedIds.size - ids.length;
  let set, neu = false;
  if (targetId === "__new__") {
    const name = await dlgPrompt("Wie soll die neue Speicherkarte heißen?", "Schwierige Wörter",
      { title: "Neue Speicherkarte", okLabel: "Anlegen" });
    if (!name || !name.trim()) return;
    const n = name.trim().slice(0, 40);
    if (currentSets().some(s => s.name === n)) {
      await dlgAlert('Eine Speicherkarte namens „' + n + '" existiert schon.', "Name schon vergeben");
      return;
    }
    set = { id: genId(), name: n, art: "eigen", gesperrt: false, quelleId: null, cardIds: [] };
    currentSets().push(set);
    neu = true;
  } else {
    set = findSet(targetId);
    if (!set) return;
    if (!setBearbeitbar(set)) { await hinweisGefuehrt("In diese Speicherkarte etwas ablegen"); return; }
  }
  const known = new Set(set.cardIds);
  ids.forEach(id => { if (!known.has(id)) set.cardIds.push(id); });
  ui.selectedIds = new Set();
  ui.selectMode = false;
  ui.openSetId = set.id;
  ui.zuletztSetId = set.id;
  const b = currentBereich();
  patchDoc(neu
    ? { [pfadSet(b.id, set.id)]: setFelder(set, currentSets().length - 1) }
    : { [pfadSet(b.id, set.id) + ".cardIds"]: set.cardIds });
  render();
  if (uebersprungen > 0) {
    dlgAlert(uebersprungen + " gesperrte Karte(n) aus der Auswahl wurden übersprungen.", "Teilweise abgelegt");
  }
}
/* 2.3.0: Die Art einer Speicherkarte umstellen. Nur im eigenen Bereich -
   in einem gefuehrten Satz gibt der Autor sie vor. */
function setArtAendern(id, art) {
  const set = findSet(id);
  if (!set || SET_ARTEN.indexOf(art) === -1) return;
  if (!setBearbeitbar(set)) { hinweisGefuehrt("Die Art ändern"); return; }
  if (set.art === art) return;
  set.art = art;
  patchDoc({ [pfadSet(currentBereich().id, set.id) + ".art"]: art });
  render();
}
async function renameSet(id) {
  const set = findSet(id);
  if (!set) return;
  if (!setBearbeitbar(set)) { await hinweisGefuehrt("Diese Speicherkarte umbenennen"); return; }
  const name = await dlgPrompt("Neuer Name für die Speicherkarte:", set.name,
    { title: "Speicherkarte umbenennen", okLabel: "Speichern" });
  if (!name || !name.trim()) return;
  const n = name.trim().slice(0, 40);
  if (n === set.name) return;
  if (currentSets().some(s => s !== set && s.name === n)) {
    await dlgAlert('Eine Speicherkarte namens „' + n + '" existiert schon.', "Name schon vergeben");
    return;
  }
  set.name = n;
  patchDoc({ [pfadSet(currentBereich().id, set.id) + ".name"]: n });
  render();
}
async function deleteSet(id) {
  const sets = currentSets();
  const idx = sets.findIndex(s => s.id === id);
  if (idx === -1) return;
  if (!setBearbeitbar(sets[idx])) { await hinweisGefuehrt("Diese Speicherkarte löschen"); return; }
  const ok = await dlgConfirm('Die Speicherkarte „' + sets[idx].name +
    '" wird gelöscht. Die Vokabeln selbst bleiben erhalten.',
    { title: "Speicherkarte löschen?", okLabel: "Löschen", danger: true });
  if (!ok) return;
  sets.splice(idx, 1);
  if (ui.openSetId === id) ui.openSetId = null;
  if (ui.lernSetId === id) { ui.lernSetId = null; ui.lernLetzte = null; }
  if (ui.setArtSheetId === id) ui.setArtSheetId = null;
  ui.drillSetIds.delete(id);   // 2.21.0: eine geloeschte Speicherkarte bleibt sonst angehakt haengen
  patchDoc({ [pfadSet(currentBereich().id, id)]: LOESCHEN });
  render();
}
function removeCardFromSet(setId, cardId) {
  const set = findSet(setId);
  if (!set) return;
  if (!setBearbeitbar(set)) { hinweisGefuehrt("Karten hier herausnehmen"); return; }
  set.cardIds = set.cardIds.filter(x => x !== cardId);
  patchDoc({ [pfadSet(currentBereich().id, setId) + ".cardIds"]: set.cardIds });
  render();
}
function toggleSetOpen(id) {
  const set = findSet(id);
  if (set && setGesperrt(set)) return;   // zu ist zu: auch kein Reinschauen
  ui.openSetId = ui.openSetId === id ? null : id;
  render();
}

/* ---------- Übungsmodus: Stufen-Range, ändert nichts am echten Fortschritt ---------- */
/* 2.3.0: Gesperrte Karten sind auch vom Ueben ausgenommen - "zu" heisst zu,
   sonst waere das Schloss nur eine Empfehlung. */
function uebbareKarten() {
  const b = currentBereich();
  const frei = freieIdsFor(b);
  return b.karten.filter(c => frei === null || frei.has(c.id));
}
function availableStufen() {
  const set = new Set(uebbareKarten().map(c => c.stufe));
  return [...set].sort((a, b) => a - b);
}
function openDrillPicker(source) {
  ui.drillOpen = true;
  ui.selectMode = false;
  /* 2.21.0: source ist die ID EINER Speicherkarte (Schnellzugriff "🔁 Üben"
     direkt an der Speicherkarte) - die kommt dann im "sets"-Modus schon
     angehakt an. Ohne source (Knopf oben in der Werkzeugleiste) wird immer
     bei "Nach Stufen" neu begonnen. */
  if (source && findSet(source)) {
    ui.drillSource = "sets";
    ui.drillSetIds = new Set([source]);
  } else {
    ui.drillSource = "stufen";
    ui.drillSetIds = new Set();
  }
  setzeVollenStufenBereich();
  /* 2.16.0: Der Auswahlkasten oeffnet sich ganz oben in der Werkzeugleiste -
     der Knopf dafuer steht aber in der Speicherkarte, oft mehrere Bildschirme
     weiter unten. Wer ihn dort drueckte, sah gar nichts passieren. */
  springeZu("drill-box");
  render();
}
/* 10: Vorbelegung wie frueher bei den zwei <select> - der ganze verfuegbare
   Bereich ist zu Beginn markiert, nicht nur eine Stufe. */
function setzeVollenStufenBereich() {
  const stufen = availableStufen();
  ui.drillVon = stufen.length ? stufen[0] : null;
  ui.drillBis = stufen.length ? stufen[stufen.length - 1] : null;
  ui.drillAnker = null;
}
/* 10: Erster Tipp auf einen Chip beginnt eine neue Auswahl (nur diese eine
   Stufe), der zweite Tipp spannt den Bereich zwischen beiden auf - danach
   startet der naechste Tipp wieder neu. Die Reihenfolge der beiden Tipps
   spielt keine Rolle, min/max richten sich selbst aus. */
function waehleStufe(s) {
  if (ui.drillAnker === null) {
    ui.drillAnker = s;
    ui.drillVon = s;
    ui.drillBis = s;
  } else {
    ui.drillVon = Math.min(ui.drillAnker, s);
    ui.drillBis = Math.max(ui.drillAnker, s);
    ui.drillAnker = null;
  }
  render();
}
async function startDrill(min, max, handwriting) {
  const cards = uebbareKarten().filter(c => c.stufe >= min && c.stufe <= max);
  if (cards.length === 0) {
    await dlgAlert("In diesem Stufenbereich gibt es keine Karten.", "Nichts zu üben");
    return;
  }
  startDrillWithCards(cards, min === max ? ("Stufe " + min) : ("Stufe " + min + "–" + max), handwriting);
}
/* 2.21.0: Loest das bisherige startDrillFromSet(EINE Speicherkarte) ab -
   jetzt koennen mehrere Speicherkarten zusammen geuebt werden (z.B.
   "Nomen" + "Weiblich"). Eine Karte, die in mehreren der ausgewaehlten
   Speicherkarten liegt, soll in der Runde nur einmal vorkommen, nicht
   doppelt - dafuer sorgt das Map nach ID. */
async function startDrillFromSets(setIds, handwriting) {
  const gewaehlt = setIds.map(id => findSet(id)).filter(Boolean);
  if (gewaehlt.length === 0) {
    await dlgAlert("Wähle mindestens eine Speicherkarte aus.", "Nichts ausgewählt");
    return;
  }
  const gesperrt = gewaehlt.find(s => setGesperrt(s));
  if (gesperrt) {
    await dlgAlert('„' + gesperrt.name + '" ist noch gesperrt. Schalte sie erst frei – dann kannst du sie auch üben.', "Noch gesperrt");
    return;
  }
  const frei = freieIdsFor(currentBereich());
  const byId = new Map();
  gewaehlt.forEach(s => {
    setCards(s).forEach(c => {
      if (frei === null || frei.has(c.id)) byId.set(c.id, c);
    });
  });
  const cards = [...byId.values()];
  if (cards.length === 0) {
    await dlgAlert("Die ausgewählten Speicherkarten enthalten keine Karten (mehr).", "Nichts zu üben");
    return;
  }
  const label = gewaehlt.length === 1
    ? "Speicherkarte: " + gewaehlt[0].name
    : "Speicherkarten: " + gewaehlt.map(s => s.name).join(" + ");
  startDrillWithCards(cards, label, handwriting);
}
function startDrillWithCards(cards, label, handwriting) {
  springeNachOben("sitzung");
  const ids = cards.map(c => c.id);
  hwStrokes = [];
  hwFullscreen = false;
  ui.gemerktRunde = new Set();   // 2.21.0: neue Runde - "Merken" zaehlt jetzt auch hier
  ui.session = {
    queue: shuffled(ids),
    total: ids.length,
    revealed: false,
    extraOpen: true,
    lastAction: null,
    isDrill: true,
    handwriting: !!handwriting,
    drillIds: ids,
    drillLabel: label
  };
  ui.drillOpen = false;
  /* 3.2.0: Ein Reiterwechsel verlaesst auch eine offene Unterseite - sonst
     traegt die Kopfzeile den Titel der Seite, aus der man gerade kommt. */
  ui.seite = null;
  ui.tab = "lernen";
  render();
}

/* ---------- 2.4.0: der Modus „Lernen" ----------
   Das ist bewusst KEINE Abfrage. „Üben" (der Drill) deckt ab und fragt ab,
   der Lernen-Tab bewertet - fuer die erste Begegnung mit neuem Stoff taugt
   beides nicht. Wer ein Video schaut und das Buch danebenliegen hat, will die
   Karten SEHEN: in seiner Reihenfolge, nichts verdeckt, Notiz aufklappbar.

   Drei Entscheidungen, die den Modus ausmachen:

   1. Reihenfolge statt Zufall. Solange alle Karten auf derselben Stufe
      stehen, ist Mischen sinnlos; die Reihenfolge im Bereich ist die
      Reihenfolge des Buchs bzw. der Playlist. Erst wenn die Stufen
      auseinanderlaufen, ist Zufall richtig - und das ist der Lernen-Tab.

   2. Ein Haken statt Bewertungsknoepfen. Es gibt nichts zu bewerten, was man
      gerade zum ersten Mal liest. Der Haken setzt die Karte auf Stufe 1, ab
      morgen kommt sie im Lernen-Tab als Wiederholung.

   3. Kein eigener Zwischenstand. Wer 25 Karten offen hat, 17 abhakt und
      rausgeht, findet beim naechsten Mal genau die 8 uebrigen vor - denn
      "abgehakt" heisst schlicht "hat eine Stufe". Es gibt nichts zu
      speichern, was mit dem Rest der App auseinanderlaufen koennte. */
function lernSet() {
  return ui.lernSetId ? findSet(ui.lernSetId) : null;
}
/* Die Karten der Durchsicht: in Bereichsreihenfolge, ohne gesperrte. */
function lernKarten(set) {
  const frei = freieIdsFor(currentBereich());
  return setCards(set).filter(c => frei === null || frei.has(c.id));
}
async function startLernen(setId) {
  const set = findSet(setId);
  if (!set || !istGefuehrt(currentBereich())) return;
  if (setGesperrt(set)) {
    await dlgAlert('„' + set.name + '" wird frei, sobald die Lektion davor sitzt.', "Noch nicht dran");
    return;
  }
  if (lernKarten(set).length === 0) {
    await dlgAlert('„' + set.name + '" enthält keine Karten (mehr).', "Nichts durchzugehen");
    return;
  }
  springeNachOben("durchsicht");
  ui.lernSetId = set.id;
  ui.lernOffen = new Set();
  ui.lernLetzte = null;
  ui.session = null;
  ui.drillOpen = false;
  ui.selectMode = false;
  /* 3.2.0: Ein Reiterwechsel verlaesst auch eine offene Unterseite - sonst
     traegt die Kopfzeile den Titel der Seite, aus der man gerade kommt. */
  ui.seite = null;
  ui.tab = "lernen";
  ui.lernFokusNach = "__start__";
  render();
}
function endeLernen() {
  ui.lernSetId = null;
  ui.lernOffen = new Set();
  ui.lernLetzte = null;
  ui.lernFokusNach = null;
  render();
}
function toggleLernNotiz(id) {
  if (ui.lernOffen.has(id)) ui.lernOffen.delete(id);
  else ui.lernOffen.add(id);
  render();
}
/* Abhaken. Nur fuer Karten, die noch nie bewertet wurden - eine Karte, die
   schon auf Stufe 4 steht, darf eine Durchsicht nicht zurueckwerfen. */
/* 2.11.0: Der Haken heisst „Gesehen" und gibt KEINE Stufe mehr.

   Vorher setzte er die Karte direkt auf Stufe 1. Damit war er eine
   Selbstauskunft ohne Gegenprobe: Wer 21-mal blind tippt, hat 21 Karten auf
   Stufe 1, ohne eine einzige gelernt zu haben. Aufgefallen waere es erst am
   naechsten Tag - und der erste Eindruck ist dann verschenkt, gerade der
   zaehlt beim ersten Kontakt am meisten.

   Jetzt stellt der Haken die Karte fuer HEUTE in die Abfrage: sie gilt als
   begonnen (ersteBewertung), bleibt aber auf Stufe 0 und ist sofort faellig.
   Die Stufe 1 verdient man sich in der Abfrage, nicht durch Tippen.
   Ablauf: ansehen, gleich pruefen, morgen wieder. */
function lernAbhaken(id) {
  const card = findCard(id);
  if (!card || !istNeueKarte(card)) return;
  ui.lernLetzte = { cardId: card.id, prevStufe: card.stufe, prevNextReview: card.nextReview, prevErsteBewertung: card.ersteBewertung };
  card.ersteBewertung = todayStr();
  card.stufe = 0;
  card.nextReview = todayStr();
  verlaufZaehle("n");
  persistCardGrade(currentBereich().id, card.id, {
    stufe: card.stufe, nextReview: card.nextReview,
    ersteBewertung: card.ersteBewertung, rueckfaelle: card.rueckfaelle || 0,
    maxStufe: card.maxStufe
  });
  ui.lernFokusNach = card.id;
  /* 2.10.1: Auch das Durchgehen zaehlt fuer den Tag. Vorher sprang die
     Flamme nur am Ende einer Lernsession an - am ersten Tag mit einem neuen
     Kartensatz gibt es aber gar keine Wiederholungen, also blieb sie auf 0,
     obwohl 21 Karten gelernt wurden. */
  checkStreakOnSessionComplete();
  render();
}
/* Vertippt: genau ein Schritt zurueck. Ohne das waere ein Fehltipp auf dem
   Handy nur ueber das Formular im Verwalten-Tab zu heilen. */
function lernRueckgaengig() {
  const l = ui.lernLetzte;
  if (!l) return;
  const card = findCard(l.cardId);
  if (card) {
    card.stufe = l.prevStufe;
    card.nextReview = l.prevNextReview;
    card.ersteBewertung = l.prevErsteBewertung;
    persistCardGrade(currentBereich().id, card.id, {
      stufe: card.stufe, nextReview: card.nextReview,
      ersteBewertung: card.ersteBewertung, rueckfaelle: card.rueckfaelle || 0,
      maxStufe: card.maxStufe || 0
    });
  }
  ui.lernLetzte = null;
  render();
}

/* ---------- Karten ---------- */
/* D6: Vergleichsform fuer die Duplikatpruefung. Vokalzeichen und Tatweel werden
   entfernt, weil كِتَاب und كتاب dasselbe Wort sind - ohne das findet die Pruefung
   genau die Duplikate nicht, die man sich beim Abtippen einhandelt.
   Nur zum Vergleichen; gespeichert wird selbstverstaendlich der Originaltext.

   2.1.0: benutzt jetzt dieselbe Vergleichsform wie die Suche (suchNorm), also
   zusaetzlich أ إ آ ٱ als ا und ة als ه. Ohne das galten أحمد und احمد als zwei
   verschiedene Woerter und liessen sich doppelt anlegen - beim Abtippen ohne
   Hamza der haeufigste Fall ueberhaupt.

   Eine Ausnahme: ى und ي bleiben hier getrennt (Parameter `streng`). Die Suche
   darf sie zusammenwerfen, ein Treffer zu viel kostet nichts. Eine Warnung zu
   viel kostet dagegen Vertrauen: على (auf) und علي (Ali) stehen beide in fast
   jedem Anfaenger-Wortschatz, und eine Warnung, die man gewohnheitsmaessig
   wegklickt, warnt nicht mehr. */
function vergleichsWort(w) {
  return suchNorm(String(w).trim(), true).text.replace(/\s+/g, " ").trim();
}
function findeDuplikat(wort, exceptId, cards) {
  const key = vergleichsWort(wort);
  return (cards || currentCards()).find(c => c.id !== exceptId && vergleichsWort(c.wort) === key) || null;
}
async function submitCardForm() {
  if (!kartenBearbeitbar()) { await hinweisGefuehrt("Karten anlegen oder ändern"); return; }
  /* Gekappt wird hier und nicht erst in normCard: Dieses Formular schreibt
     seine Felder mit einem gezielten Patch direkt in die Cloud, normCard
     kommt auf diesem Weg gar nicht vor. */
  const wort = val("f-wort").trim().slice(0, MAX_WORT);
  const ueb = val("f-ueb").trim().slice(0, MAX_WORT);
  const extra = val("f-extra").trim().slice(0, MAX_EXTRA);
  if (!wort || !ueb) {
    /* 9: Dialog wegtippen und selbst suchen, welches Feld fehlt, ist zwei
       Schritte zu viel - der Fehler steht jetzt direkt am leeren Feld. */
    ui.karteFeldFehler = { wort: !wort, ueb: !ueb };
    render();
    fokusInsErstesFehlerfeld();
    return;
  }
  ui.karteFeldFehler = null;
  /* D6: Der Entwurf haelt den getippten Text fest, waehrend der Dialog offen
     ist - beim Abbrechen bleibt die Eingabe also stehen. */
  const dup = findeDuplikat(wort, ui.editId || null);
  if (dup) {
    const ok = await dlgConfirm('„' + wort + '" gibt es in diesem Bereich schon.\nÜbersetzung dort: „' +
      dup.uebersetzung + '"', { title: "Wort gibt es schon", okLabel: "Trotzdem speichern" });
    if (!ok) return;
  }
  const bereich = currentBereich();
  /* A4: Was diese eine Karte betrifft, wird gezielt geschrieben - nie mehr
     der ganze Kartenbestand. Der Patch wird waehrend der Aenderung
     mitgefuehrt, damit nur wirklich geaenderte Felder darin landen. */
  const warEdit = !!ui.editId;
  const patch = {};
  if (ui.editId) {
    const card = findCard(ui.editId);
    if (card) {
      const pfad = pfadKarte(bereich.id, card.id);
      /* E6: Wer eine verbrannte Karte umformuliert, hat genau das getan, was
         der Hinweis verlangt - dann faengt die Zaehlung wieder bei null an.
         Nur bei geaendertem Wort oder geaenderter Uebersetzung; eine Notiz
         oder eine korrigierte Stufe aendert die Karte nicht wirklich. */
      if (card.wort !== wort || card.uebersetzung !== ueb) {
        card.rueckfaelle = 0;
        patch[pfad + ".rueckfaelle"] = 0;
      }
      card.wort = wort;
      card.uebersetzung = ueb;
      card.extra = extra;
      patch[pfad + ".wort"] = wort;
      patch[pfad + ".uebersetzung"] = ueb;
      patch[pfad + ".extra"] = extra;
      const stufeEl = document.getElementById("f-stufe");
      if (stufeEl) {
        let newStufe = parseInt(stufeEl.value, 10);
        if (!Number.isInteger(newStufe) || newStufe < 0) newStufe = 0;
        if (newStufe > MAX_STUFE) newStufe = MAX_STUFE;
        if (newStufe !== card.stufe) {
          card.stufe = newStufe;
          card.nextReview = newStufe === 0 ? todayStr() : dateInDays(intervalForStufe(newStufe));
          /* Wer hier von Hand eine Stufe setzt, erklaert die Karte als bekannt.
             Sie darf dann nicht mehr als "neu" durch das Tageslimit laufen. */
          if (newStufe > 0 && istNeueKarte(card)) card.ersteBewertung = todayStr();
          patch[pfad + ".stufe"] = card.stufe;
          patch[pfad + ".nextReview"] = card.nextReview;
          patch[pfad + ".ersteBewertung"] = card.ersteBewertung === undefined ? null : card.ersteBewertung;
        }
      }
    }
    ui.editId = null;
    /* Beim Bearbeiten ist die Sache erledigt - das Blatt geht zu. Beim
       Anlegen bleibt es offen (siehe unten, D1). */
    ui.karteSheet = false;
  } else {
    const neu = {
      id: genId(),
      wort: wort,
      uebersetzung: ueb,
      extra: extra,
      stufe: 0,
      nextReview: todayStr(),
      ersteBewertung: null,  // B3: noch nie bewertet = neue Karte
      rueckfaelle: 0         // E6
    };
    bereich.karten.unshift(neu);
    /* A4: genau ein neues Feld. Frueher wurde dabei der komplette Bestand
       neu geschrieben - eine Karte, die auf einem anderen Geraet entstanden
       war, verschwand dadurch wieder. */
    patch[pfadKarte(bereich.id, neu.id)] = kartenFelder(neu, ordnungVorn());
  }
  resetFormDraft();
  patchDoc(patch);
  const toastText = warEdit ? "Änderung gespeichert" : "Karte gespeichert";
  zeigeToast(toastText);
  render();
  /* D1: Fokus zurueck ins Wort-Feld, damit man mehrere Vokabeln
     hintereinander eingeben kann, ohne jedes Mal hineinzutippen.
     Nur beim Neuanlegen - wer eine bestehende Karte bearbeitet hat, wollte
     damit nicht automatisch die Tastatur fuer die naechste neue Karte
     oeffnen (Beobachtung 15.09.2026). */
  if (!warEdit) {
    /* D1, unveraendert: Das Blatt bleibt offen und der Fokus springt zurueck
       ins Wort-Feld, damit man mehrere Vokabeln hintereinander eingeben
       kann. Video 1 beschreibt genau das als den Sinn eines Blattes - man
       bleibt im Zusammenhang, statt fuer jede Karte hin und her zu
       wechseln. */
    fokusInsWortfeld();
  } else if (editRueckkehrY !== null) {
    /* Beobachtung 3: zurueck an die Stelle, von der aus bearbeitet wurde -
       sonst steht man nach dem Speichern am Seitenanfang und muss erneut
       zur naechsten Karte herunterscrollen. */
    window.scrollTo(0, editRueckkehrY);
    editRueckkehrY = null;
  }
}
function editCard(id) {
  /* hinweisGefuehrt zeichnet ueber den Dialog selbst neu - wichtig, weil der
     Sprung aus dem Fortschritts-Tab schon den Bereich gewechselt hat. */
  if (!kartenBearbeitbar()) { hinweisGefuehrt("Karten ändern"); return; }
  /* Nur merken, wenn der Sprung wirklich innerhalb von Verwalten passiert -
     aus dem Fortschritts-Tab (editCardInBereich) war man vorher woanders,
     dorthin gibt es nichts sinnvoll zurueckzuspringen. */
  editRueckkehrY = ui.tab === "verwalten" ? window.scrollY : null;
  ui.editId = id;
  ui.karteSheet = true;
  ui.karteFeldFehler = null;
  const c = findCard(id);
  formDraft = c ? { wort: c.wort, ueb: c.uebersetzung, extra: c.extra } : { wort: "", ueb: "", extra: "" };
  render();
  /* 3.3.1: Kein Sprung mehr nach oben. Das Formular kam bis dahin oben auf
     der Seite - jetzt kommt es von unten, und die Liste bleibt genau dort
     stehen, wo man sie verlassen hat. */
  fokusInsWortfeld();
}
/* Ein Ort fuer den Fokus ins erste Feld. Nach render() steht das Markup neu
   da, der Fokus muss also jedes Mal neu gesetzt werden. */
function fokusInsWortfeld() {
  const el = document.getElementById("f-wort");
  if (el) el.focus();
}
/* 9: nach einer fehlgeschlagenen Pruefung ins erste leere Pflichtfeld,
   nicht immer ins Wort-Feld - sonst landet der Fokus am falschen Feld,
   wenn nur die Uebersetzung fehlt. */
function fokusInsErstesFehlerfeld() {
  const id = (ui.karteFeldFehler && ui.karteFeldFehler.wort) ? "f-wort" : "f-ueb";
  const el = document.getElementById(id);
  if (el) el.focus();
}
function cancelEdit() {
  ui.editId = null; ui.karteSheet = false; resetFormDraft(); render();
  if (editRueckkehrY !== null) { window.scrollTo(0, editRueckkehrY); editRueckkehrY = null; }
}
async function deleteCard(id) {
  const card = findCard(id);
  if (!card) return;
  if (!kartenBearbeitbar()) { await hinweisGefuehrt("Karten löschen"); return; }
  const ok = await dlgConfirm('Die Karte „' + card.wort + '" (' + card.uebersetzung + ') wird gelöscht.',
    { title: "Karte löschen?", okLabel: "Löschen", danger: true });
  if (!ok) return;
  const b = currentBereich();
  b.karten.splice(b.karten.findIndex(c => c.id === id), 1);
  const patch = {};
  patch[pfadKarte(b.id, id)] = LOESCHEN;
  purgeFromSets([id]).forEach(st => {
    patch[pfadSet(b.id, st.id) + ".cardIds"] = st.cardIds;
  });
  patchDoc(patch);
  render();
}

/* ---------- Lern-Session ---------- */
function startSession() {
  let due = dueCards();
  if (due.length === 0) return;
  /* Sitzungslimit: schneidet am Ende ab, ohne Reihenfolge umzusortieren.
     Wer 80 fällige hat und "10" wählt, sieht die 10 dringendsten, nicht 10 zufällige. */
  if (typeof settings.sitzungsLimit === "number" && due.length > settings.sitzungsLimit) {
    due = due.slice(0, settings.sitzungsLimit);
  }
  springeNachOben("sitzung");
  /* 2.11.5: Die Durchsicht muss beendet werden, sonst passiert scheinbar
     nichts. renderLernen zeigt die Durchsicht, solange lernSetId gesetzt ist -
     die Sitzung lief also im Hintergrund an, war aber nirgends zu sehen.
     Betraf genau den Knopf "Abfrage starten" am Ende des Durchgehens. */
  ui.lernSetId = null;
  ui.lernLetzte = null;
  ui.gemerktRunde = new Set();
  ui.session = { queue: shuffled(due.map(c => c.id)), total: due.length, revealed: false, extraOpen: true, lastAction: null, isDrill: false, bereichId: currentBereich().id };
  render();
}
/* E5 (1.8.0): Beim Aufdecken das Vollbild verlassen.
   Die Zeichenflaeche liegt im Vollbild als fixiertes Fenster (position:fixed,
   z-index 50) UEBER der Seite. Die Loesung wurde also durchaus gerendert - sie
   lag nur darunter und war unsichtbar. Man musste erst "Verkleinern" druecken.
   Jetzt schliesst "Fertig" das Vollbild gleich mit. */
/* 2.21.6: Gemeinsame Stelle fuer "Vollbild verlassen", egal ob durch
   "Fertig" (revealAnswer) oder durch den Vollbild-Knopf selbst
   (case "hw-fullscreen"). Vorher raeumte NUR "Fertig" den Scroll danach
   auf - verliess man das Vollbild ueber den Knopf (z.B. nach dem Aufdecken,
   um die eigene Schrift noch mal neben der Loesung zu vergleichen), blieb
   die Seite an der Scrollposition von VOR dem Vollbild stehen. Die passte
   nicht mehr zum Inhalt darunter, der sich waehrend des Vollbilds veraendert
   haben kann (z.B. gerade erst aufgedeckt) - "falsch positioniert". */
function hwVollbildVerlassen() {
  const warVollbild = hwFullscreen;
  hwFullscreen = false;
  render();
  if (warVollbild) setTimeout(scrollGradeRowIntoView, 220);
}
function revealAnswer() {
  /* 2.21.1: "Katapult"-Gefuehl beim Aufdecken aus dem Vollbild heraus - in
     demselben Moment springt die Seite von der fixierten Zeichenflaeche
     zurueck in den normalen Textfluss (ein grosser, sofortiger Sprung),
     und DIREKT DANACH beginnt noch eine sanfte Scroll-Animation obendrauf.
     Zwei Bewegungen kurz hintereinander wirken wie ein Ruck. Kam die
     Aufdeckung aus dem Vollbild, bekommt der Sprung erst einen Moment Zeit,
     fertig zu werden, bevor die sanfte Bewegung anfaengt - fuehlt sich eher
     wie EINE Bewegung an. Ohne Vollbild vorher aendert sich nichts. */
  const ausVollbild = hwFullscreen;
  ui.session.revealed = true;
  if (ausVollbild) { hwVollbildVerlassen(); return; }
  render();
  scrollGradeRowIntoView();
}
/* E5 (1.8.0): nur so weit scrollen, dass die Loesung ins Bild kommt - die
   eigene Zeichnung darueber soll sichtbar bleiben, sonst muesste man zum
   Vergleichen wieder hochscrollen. Deshalb block:"nearest" (bewegt das
   Minimum) und nicht block:"center" (holt das Wort in die Mitte und schiebt
   die Zeichnung oben aus dem Bild).
   requestAnimationFrame: erst wenn der Browser das neue DOM gesetzt hat,
   sonst gibt es das Element noch gar nicht. */
/* Allgemeines Werkzeug, kein Einzelfall fuer "Aufdecken": Immer wenn
   innerhalb einer laufenden Karte neuer Inhalt dazukommt und dadurch die
   Bewertungszeile aus dem Bild rutschen koennte, ruft die jeweilige Stelle
   diese eine Funktion auf. Heute sind das revealAnswer() und das Oeffnen
   der Beispielsaetze (toggleExtra) - jede kuenftige Stelle mit demselben
   Problem (weiteres Aufklappen, eine neue Karten-Zusatzinfo, etc.) bindet
   sich genauso an, ohne dass die Scroll-Logik dort neu erfunden wird.

   block:"nearest" bewegt nur das noetige Minimum - ist die Bewertungszeile
   schon sichtbar, passiert nichts, kein unnoetiges Ruckeln. scroll-margin-
   bottom auf .grade-row (siehe CSS) sorgt dabei automatisch fuer etwas Luft
   zum unteren Bildschirmrand, wie man es aus Karteikarten-Apps kennt - die
   Knoepfe kleben nicht direkt an der Kante, sie haben spuerbar Abstand. */
function scrollGradeRowIntoView() {
  requestAnimationFrame(() => {
    const el = document.querySelector(".grade-row") || document.querySelector(".study-answer");
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}
function toggleExtra() {
  ui.session.extraOpen = !ui.session.extraOpen;
  render();
  // nur beim Aufklappen: Zuklappen macht die Seite kuerzer, kein Nachschub noetig
  if (ui.session.extraOpen) scrollGradeRowIntoView();
}
/* B2: drei Tasten statt zwei.
   „Nicht gewusst" warf bisher jede Karte auf Stufe 0 zurueck - auch eine, die
   acht Wochen sicher sass und heute einmal verpatzt wurde. Das demotiviert und
   blaeht die Tagesmenge auf. Anki und aehnliche Systeme haben aus demselben
   Grund drei Stufen:
     Nicht   → zwei Stufen zurueck, kommt in DIESER Runde wieder
     Fast    → eine Stufe zurueck, morgen wieder (nicht mehr heute)
     Sicher  → eine Stufe hoch, naechstes Intervall mit Streuung */
function gradeCard(kind) {
  const s = ui.session;
  if (!s || s.queue.length === 0) return;
  /* card kann fehlen, wenn die Karte auf einem anderen Geraet geloescht wurde,
     waehrend diese Session offen ist. Frueher stuerzte hier card.id ab. */
  const card = findCard(s.queue[0]);
  if (card && !s.isDrill) {
    /* E6: vor der Aenderung merken - direkt darunter wird ersteBewertung
       gesetzt, danach waere die Karte nicht mehr als "neu" erkennbar. */
    const warNeu = istNeueKarte(card);
    s.lastAction = {
      cardId: card.id,
      prevStufe: card.stufe,
      prevNextReview: card.nextReview,
      prevErsteBewertung: card.ersteBewertung,
      prevRueckfaelle: card.rueckfaelle || 0,
      /* 2.11.3: Ohne das blieb ein Fehltipp auf "Sicher" fuer immer stehen -
         der Hoechststand kennt kein Zurueck, und bei der letzten Karte einer
         Lektion haette ein einziger Fehlgriff die naechste Lektion dauerhaft
         aufgeschlossen. */
      prevMaxStufe: card.maxStufe || 0,
      prevQueue: s.queue.slice()
    };
    // B3: ab jetzt gilt die Karte als eingeführt und zählt gegen das Tageslimit
    if (istNeueKarte(card)) card.ersteBewertung = todayStr();
    if (kind === "known") {
      card.stufe = Math.min(card.stufe + 1, MAX_STUFE);
      card.nextReview = nextReviewForStufe(card.stufe);
      card.maxStufe = Math.max(card.maxStufe || 0, card.stufe);
    } else if (kind === "almost") {
      card.stufe = Math.max(0, card.stufe - 1);
      card.nextReview = dateInDays(1);
    } else {
      card.stufe = Math.max(0, card.stufe - 2);
      card.nextReview = todayStr();
      /* E6: Nur ein echter Rueckfall zaehlt - "Nicht" bei einer Karte, die
         schon einmal saß. Eine Karte, die man beim allerersten Anblick nicht
         weiß, ist kein Rueckfall, sondern normal. "Fast" zaehlt ebenfalls
         nicht: da war die Erinnerung ja da.

         2.11.1: gemessen am HOECHSTSTAND, nicht daran, ob die Karte schon
         einmal angefasst wurde. Seit 2.11.0 stellt "Gesehen" eine Karte in
         die Abfrage, ohne ihr eine Stufe zu geben - sie galt damit sofort
         als "nicht mehr neu", und wer sie in der ersten Abfrage nicht wusste,
         sammelte Rueckfaelle fuer etwas, das er gerade zum ersten Mal
         gelesen hatte. Nach fuenf Malen waere sie "verbrannt" gewesen. */
      if ((card.maxStufe || 0) >= 1) card.rueckfaelle = (card.rueckfaelle || 0) + 1;
    }
    /* 2.8.0: fuers Tagesprotokoll. warNeu steht vor der Bewertung fest -
       danach traegt die Karte ihr Erstbewertungsdatum und waere nicht mehr
       als neu erkennbar. */
    verlaufZaehle(warNeu ? "n" : "w");
  }
  const id = s.queue.shift();
  // Nur „Nicht" hängt die Karte wieder hinten an. „Fast" ist morgen dran –
  // stünde sie auch heute noch einmal an, würde die Session nie enden.
  if (kind === "unknown" && card) s.queue.push(id);
  if (s.isDrill && s.queue.length === 0) s.queue = shuffled(s.drillIds);
  s.revealed = false;
  s.extraOpen = true;      // 2.7.0: Notiz ist beim Aufdecken offen
  hwStrokes = [];
  if (!s.isDrill) {
    if (card) persistCardGrade(s.bereichId, card.id, { stufe: card.stufe, nextReview: card.nextReview, ersteBewertung: card.ersteBewertung, rueckfaelle: card.rueckfaelle || 0, maxStufe: card.maxStufe || 0 });
    if (s.queue.length === 0) checkStreakOnSessionComplete();
  }
  render();
}
function gradeKnown() { gradeCard("known"); }
function gradeAlmost() { gradeCard("almost"); }
function gradeUnknown() { gradeCard("unknown"); }
function undoLastGrade() {
  const s = ui.session;
  if (!s || !s.lastAction) return;
  const card = findCard(s.lastAction.cardId);
  if (card) {
    card.stufe = s.lastAction.prevStufe;
    card.nextReview = s.lastAction.prevNextReview;
    // sonst bliebe eine irrtümlich bewertete neue Karte für heute verbraucht
    card.ersteBewertung = s.lastAction.prevErsteBewertung;
    // E6: sonst bliebe ein irrtuemlicher Rueckfall dauerhaft gezaehlt
    card.rueckfaelle = s.lastAction.prevRueckfaelle;
    card.maxStufe = s.lastAction.prevMaxStufe;
  }
  s.queue = s.lastAction.prevQueue;
  s.lastAction = null;
  s.revealed = true;
  s.extraOpen = false;
  if (card) persistCardGrade(s.bereichId, card.id, { stufe: card.stufe, nextReview: card.nextReview, ersteBewertung: card.ersteBewertung, rueckfaelle: card.rueckfaelle || 0, maxStufe: card.maxStufe || 0 });
  render();
}
function endSession() { ui.session = null; hwStrokes = []; hwFullscreen = false; render(); }

/* ---------- Tastatur-Shortcuts während einer Session ---------- */
document.addEventListener("keydown", e => {
  if (!ui.session || ui.tab !== "lernen") return;
  const tag = document.activeElement && document.activeElement.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA") return;
  const s = ui.session;
  if (s.queue.length === 0) return;
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    /* 2.15.0: Im Uebungsmodus traegt die Leertaste durch: aufdecken, dann
       weiter. Nur eine Bewegung, kein Zielen auf Knoepfe. */
    if (!s.revealed) revealAnswer();
    else if (s.isDrill) gradeCard("weiter");
    return;
  }
  if (e.key === "ArrowRight" || e.key === "3") {
    if (s.revealed) gradeKnown();
  } else if (e.key === "ArrowDown" || e.key === "2") {
    if (s.revealed) gradeAlmost();
  } else if (e.key === "ArrowLeft" || e.key === "1") {
    if (s.revealed) gradeUnknown();
  }
});

/* ---------- Wischen zum Bewerten (Anki/Quizlet-Muster) ----------
   Zusaetzlich zu den drei Knoepfen: Karte nach rechts ziehen wertet "Sicher",
   nach links "Nicht" - dieselben beiden Extreme, die auch Pfeiltasten links/
   rechts ausloesen. "Fast" hat keine Wischrichtung und bleibt Knopf-only.
   Achsen-Sperre mit 8px Totzone: Erst wenn die Bewegung eindeutig waagerecht
   ist, wird der Zeiger eingefangen und vertikales Scrollen (z.B. bei einer
   langen Notiz) unterbunden - ist sie senkrecht, passiert gar nichts und der
   Finger scrollt ganz normal weiter. */
let wischStart = null;
app.addEventListener("pointerdown", e => {
  const karte = e.target.closest("#sitzung");
  if (!karte || !ui.session || !ui.session.revealed || ui.session.isDrill) return;
  if (e.target.closest("button, a, canvas, input, textarea")) return;
  wischStart = { x: e.clientX, y: e.clientY, karte, breite: karte.getBoundingClientRect().width, id: e.pointerId, erfasst: false };
});
app.addEventListener("pointermove", e => {
  if (!wischStart || e.pointerId !== wischStart.id) return;
  const dx = e.clientX - wischStart.x, dy = e.clientY - wischStart.y;
  if (!wischStart.erfasst) {
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
    if (Math.abs(dy) > Math.abs(dx)) { wischStart = null; return; } // senkrecht: normales Scrollen
    wischStart.erfasst = true;
    wischStart.karte.setPointerCapture(e.pointerId);
    wischStart.karte.classList.add("wird-gezogen");
  }
  e.preventDefault();
  const rot = Math.max(-10, Math.min(10, dx / 14));
  wischStart.karte.style.transform = "translateX(" + dx + "px) rotate(" + rot + "deg)";
  const anteil = Math.min(1, Math.abs(dx) / (wischStart.breite * 0.32));
  wischStart.karte.style.boxShadow = anteil < 0.06 ? "" :
    "inset 0 0 0 2px " + (dx > 0 ? "var(--positive-border)" : "var(--negative-border)");
});
function wischEnde(e) {
  if (!wischStart || e.pointerId !== wischStart.id) return;
  const { karte, x, breite, erfasst } = wischStart;
  wischStart = null;
  if (!erfasst) return;
  const dx = e.clientX - x;
  const schwelle = Math.min(120, breite * 0.3);
  karte.classList.remove("wird-gezogen");
  karte.style.boxShadow = "";
  if (Math.abs(dx) >= schwelle) {
    const rechts = dx > 0;
    karte.style.transition = "transform 220ms var(--ease-out)";
    karte.style.transform = "translateX(" + (rechts ? "130%" : "-130%") + ") rotate(" + (rechts ? 12 : -12) + "deg)";
    setTimeout(() => (rechts ? gradeKnown() : gradeUnknown()), 180);
  } else {
    karte.style.transition = "transform 220ms var(--ease-spring)";
    karte.style.transform = "";
  }
}
app.addEventListener("pointerup", wischEnde);
app.addEventListener("pointercancel", wischEnde);

/* Zählt eine Zahl von 0 hoch, statt sie einfach dastehen zu haben - für
   "Diese Woche im Vergleich" im Fortschritt-Tab. dataset.countedTo merkt
   sich den zuletzt angezeigten Wert: ändert er sich nicht (jedes render()
   ruft das hier erneut auf), läuft die Animation nicht jedesmal neu an. */
function tickCountups() {
  /* 3.3.0: Wer Bewegung abbestellt hat, bekam sie hier trotzdem. Die
     styles.css setzt fuer prefers-reduced-motion jede Animation auf 0,01ms
     (Abschnitt 3) - das greift aber nur bei CSS. Diese Zahl zaehlt in
     JavaScript hoch und lief deshalb als einzige Bewegung der App weiter.
     Gefunden, weil der Probelauf an dieser Stelle haengenblieb: Die
     waehrend des Zaehlens wachsende Zahl aendert die Seitenhoehe, und der
     Browser hielt kein Element mehr fuer "stabil". */
  let ruhig = false;
  try { ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
  catch (e) {}
  document.querySelectorAll("[data-countup]").forEach(el => {
    const ziel = Number(el.dataset.countup);
    if (el.dataset.countedTo === String(ziel)) return;
    el.dataset.countedTo = String(ziel);
    const strong = el.querySelector("strong");
    if (!strong) return;
    if (ruhig) { strong.textContent = String(ziel); return; }
    const t0 = performance.now(), dauer = 480;
    function frame(t) {
      const p = Math.min(1, (t - t0) / dauer);
      strong.textContent = String(Math.round(ziel * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  });
}

/* ---------- Rendering ---------- */
function render() {
  /* C2: Wird aus anderem Anlass neu gezeichnet (Klick, Tabwechsel, Daten aus
     der Cloud), ist ein noch wartender Such-Timer gegenstandslos - der
     Suchtext steht bereits in ui.searchQuery. */
  if (sucheTimer) { clearTimeout(sucheTimer); sucheTimer = null; }
  if (!CONFIGURED) { renderSetup(); return; }
  if (currentUser === null) { renderAuth(); return; }
  /* C4: E-Mail muss bestätigt sein, bevor der Rest der App zugreifbar ist.
     Ohne das kann sich jeder mit einer erfundenen Adresse registrieren. */
  if (!currentUser.emailVerified) { renderPendingVerification(); return; }
  /* C1: Liegen die Daten noch im alten Format, gibt es genau einen
     Bildschirm - den Umzug. Vorher darf nichts geschrieben werden, sonst
     entstehen zwei halbe Staende. */
  if (ui.umzug) { renderUmzug(); return; }
  if (bereiche === null) {
    /* 2.21.1: Einmalig einen Timer starten, der nach 9 Sekunden einen
       Hinweis samt "Neu laden" nachschiebt - bis dahin bleibt der Bildschirm
       wie gehabt. Ohne das stand hier bei schlechtem WLAN nur "Daten werden
       geladen…", ohne jede Handhabe, ausser abzuwarten oder von sich aus auf
       die Idee zu kommen, die Seite neu zu laden. */
    if (!ladeTimer && !ladeLangsam) {
      ladeTimer = setTimeout(() => {
        ladeLangsam = true;
        ladeTimer = null;
        render();
      }, 9000);
    }
    if (!bootAktiv) { bootAktiv = true; bootStart = Date.now(); }
    let laden = '<div class="boot">';
    laden += '<div class="boot__mark"><div class="boot__orbit r1"><span></span></div>' +
      '<div class="boot__orbit r2"><span></span></div><div class="boot__orbit r3"><span></span></div>' +
      '<img src="./flower-isolated.png" class="i" alt=""></div>';
    if (syncError) {
      /* Blockierend: Ohne Daten gibt es nichts zu zeigen. Also Klartext und
         ein Weg weiter, statt eines Ladepunkts, der nie aufhoert. */
      laden += '<div class="empty__titel">Keine Verbindung zu deinen Daten</div>';
      laden += '<div class="error-box" style="max-width:34ch;text-align:left">' + ikon("warnung", "i-sm") +
        '<div class="banner__text">' + esc(syncError) + '</div></div>';
      laden += '<button class="secondary" data-action="seite-neu-laden">Neu laden</button>';
    } else if (ladeLangsam) {
      laden += '<p class="boot__text">Das dauert l\u00e4nger als sonst. Pr\u00fcf deine Internetverbindung \u2013 ' +
        'oder lade die Seite neu.</p>';
      laden += '<button class="secondary" data-action="seite-neu-laden">Neu laden</button>';
    } else {
      laden += '<p class="boot__text">Deine Karten werden geladen\u2026</p>';
    }
    laden += '</div>';
    app.innerHTML = laden;
    return;
  }
  /* E8: Der Ladebildschirm verschwindet nicht mehr abrupt - er blendet erst
     aus (280ms), egal an welchem Punkt seiner Animation die Daten fertig
     wurden. Ein Ausblenden überdeckt jede Phase gleich gut; ein hartes
     Abschneiden nicht. */
  if (bootAktiv) {
    const rest = BOOT_MIN_MS - (Date.now() - bootStart);
    if (rest > 0) { setTimeout(render, rest); return; }
    bootAktiv = false;
    const bootEl = app.querySelector(".boot");
    if (bootEl) {
      bootEl.classList.add("boot--exit");
      setTimeout(render, 280);
      return;
    }
  }
  if (ui.askImport) { renderImport(); return; }
  renderMain();
}

/* ---------- C1: einmaliger Umzug ins neue Datenformat ---------- */
/* Bewusst fast textlos. Wer die App benutzt, muss nicht wissen, was ein
   Datensatz ist - er soll nur sehen, dass gerade etwas laeuft und er warten
   soll. Die Begruendung steht im Changelog, nicht auf dem Bildschirm. */
function renderUmzug() {
  const u = ui.umzug;
  let html = '<div class="solo">';
  html += soloMarke(null);
  html += '<div class="card" style="text-align:center">';
  if (u.fehler) {
    /* Blockierender Fehler: eigener Bildschirm, Klartext, EIN Weg weiter. */
    html += '<div class="empty__icon">' + ikon("warnung", "i-xl") + '</div>';
    html += '<div class="empty__titel">Das hat nicht geklappt</div>';
    html += '<p class="empty__text">Deine Karten sind unver\u00e4ndert geblieben.</p>';
    html += '<div class="error-box" style="text-align:left">' + ikon("warnung", "i-sm") +
      '<div class="banner__text">' + esc(u.fehler) + '</div></div>';
    html += '<button data-action="umzug-start">Nochmal versuchen</button>';
  } else {
    /* Bewusst fast textlos. Wer die App benutzt, muss nicht wissen, was ein
       Datenformat ist - er soll nur sehen, dass etwas laeuft. */
    html += '<div class="boot__mark" style="margin-bottom:var(--space-5)">' + ikon("karten", "i-xl") + '</div>';
    html += '<div class="empty__titel">Einen Moment</div>';
    html += '<p class="empty__text">Deine Karten werden einmalig umgestellt. Bitte die Seite offen lassen.</p>';
    if (u.gesamt > 0) {
      const anteil = Math.round((u.fertig / u.gesamt) * 100);
      html += '<div class="heute-bar"><span style="width:' + anteil + '%"></span></div>';
      html += '<p class="hint"><strong>' + u.fertig + '</strong> von ' + u.gesamt + '</p>';
    }
  }
  html += '</div></div>';
  app.innerHTML = html;
  app.style.setProperty("--arab-scale", String(arabFaktor()));
}

async function umzugStarten() {
  if (!ui.umzug || ui.umzug.laeuft || !umzugBereiche || !userDocRef) return;

  /* Karten-IDs waren bisher nur INNERHALB eines Bereichs eindeutig. In einer
     gemeinsamen Sammlung muessen sie es ueberall sein - sonst wuerde eine
     Karte eine gleichnamige aus einem anderen Bereich ueberschreiben. Bei
     einer Dopplung bekommt die zweite Karte eine neue ID; Speicherkarten, die
     auf die alte zeigen, werden mitgezogen. */
  const gesehen = new Set();
  for (const b of umzugBereiche) {
    for (const c of b.karten) {
      if (gesehen.has(c.id)) {
        const alteId = c.id;
        c.id = genId();
        (b.sets || []).forEach(st => {
          st.cardIds = st.cardIds.map(x => (x === alteId ? c.id : x));
        });
      }
      gesehen.add(c.id);
    }
  }

  const ops = [];
  umzugBereiche.forEach((b, bi) => {
    const felder = bereichFelder(b, bi);
    ops.push({ ref: bereichRef(b.id), daten: { name: felder.name, order: felder.order, sets: felder.sets } });
    b.karten.forEach((c, ci) => ops.push({ ref: karteRef(c.id), daten: { ...kartenFelder(c, ci), bereichId: b.id } }));
  });

  ui.umzug.laeuft = true;
  ui.umzug.fehler = null;
  ui.umzug.gesamt = ops.length;
  ui.umzug.fertig = 0;
  render();

  try {
    for (let i = 0; i < ops.length; i += 400) {
      const stapel = fb.writeBatch(db);
      ops.slice(i, i + 400).forEach(o => stapel.set(o.ref, o.daten));
      await stapel.commit();
      ui.umzug.fertig = Math.min(i + 400, ops.length);
      render();
    }
    /* Ganz zum Schluss die Markierung setzen. Bricht der Umzug vorher ab,
       bleibt das alte Format massgeblich und beim naechsten Start beginnt
       er einfach von vorn - doppelt geschriebene Karten sind harmlos, weil
       sie unter derselben ID landen. */
    await fb.updateDoc(userDocRef, { schemaVersion: SCHEMA_VERSION });
    ui.umzug = null;
    umzugBereiche = null;
    /* Nicht auf den naechsten Schnappschuss des Nutzerdokuments warten - der
       kommt nicht. Firestore meldet nur Aenderungen am INHALT; hier hat
       dieses Geraet den neuen Inhalt selbst geschrieben, und der bestaetigte
       Stand unterscheidet sich davon nur in den Metadaten. Solche Meldungen
       liefert onSnapshot ohne includeMetadataChanges nicht aus - die App
       blieb dann auf "Daten werden geladen..." stehen, bis jemand neu lud.
       Also hier direkt weiterschalten. */
    sammlungenStarten();
    render();
  } catch (e) {
    ui.umzug.laeuft = false;
    ui.umzug.fehler = e && e.code ? e.code : "Fehler";
    render();
  }
}

function renderPendingVerification() {
  let html = '<div class="solo">';
  html += soloMarke("E-Mail best\u00e4tigen", "Schritt 2 von 2 \u00b7 Best\u00e4tigen");
  html += '<div class="card">';
  html += '<p class="hint">Wir haben eine Best\u00e4tigungs-E-Mail an <strong>' + esc(currentUser.email) +
    '</strong> geschickt. \u00d6ffne den Link darin, um dein Konto freizuschalten.</p>';
  /* 3.3.2: landing.html verspricht "Danach legst du direkt deine erste
     Karte an" - und dann kommt erstmal diese Wartezeile. Ohne diesen Satz
     verschwindet das Versprechen genau dort, wo es am meisten zaehlt. Der
     Satz sagt nichts Neues zu, er haelt nur fest, was schon zugesagt war. */
  html += '<p class="hint" style="margin-top:var(--space-3)">Danach geht es gleich weiter zu deiner ersten Karte.</p>';
  if (ui.authError) html += '<div class="error-box" style="margin-top:var(--space-4)">' + ikon("warnung", "i-sm") +
    '<div class="banner__text">' + esc(ui.authError) + '</div></div>';
  if (ui.authInfo) html += '<div class="info-box" style="margin-top:var(--space-4)">' + ikon("haken", "i-sm") +
    '<div class="banner__text">' + esc(ui.authInfo) + '</div></div>';
  html += '<div class="form-actions">';
  html += '<button data-action="verification-check">Ich habe best\u00e4tigt</button>';
  html += '</div>';
  html += '<div class="form-actions" style="margin-top:var(--space-2)">';
  html += '<button class="secondary" data-action="resend-verification">Erneut senden</button>';
  html += '<button class="secondary" data-action="logout">Abmelden</button>';
  html += '</div>';
  html += '</div></div>';
  app.innerHTML = html;
}

/* Die Wortmarke ueber den Solo-Bildschirmen. Ersetzt das Emoji-Sprout, das
   auf jedem Geraet anders aussah. */
/* 3.3.2: schritt ist optional und zeigt "Schritt 1 von 2" etc. ueber der
   Ueberschrift - Video 3, Ziel-Gradient: Wer weiss, wie viele Schritte noch
   kommen, erlebt das Warten auf die Bestaetigungsmail als einen von zwei
   Schritten, nicht als offenes Ende. Kein neues Bauteil - .eyebrow gibt es
   schon, dieselbe Rolle wie ueber jeder Sektion. */
function soloMarke(untertitel, schritt) {
  return '<div class="solo-mark">' + ikon("marke", "i-lg") +
    '<strong>Adrabic</strong></div>' +
    (schritt ? '<div class="eyebrow">' + esc(schritt) + '</div>' : '') +
    (untertitel ? '<h1>' + esc(untertitel) + '</h1>' : '');
}

function renderSetup() {
  app.innerHTML =
    '<div class="solo">' + soloMarke("Einmalige Einrichtung") +
    '<div class="card" style="margin-top:var(--space-5)"><h2>Firebase-Konfiguration fehlt</h2>' +
    '<p class="hint">Diese App ist noch nicht mit einem Firebase-Projekt verbunden. So geht es:</p>' +
    '<ol class="setup-steps" style="margin-top:var(--space-4)">' +
    '<li>Auf <code>console.firebase.google.com</code> ein Projekt anlegen.</li>' +
    '<li>Unter <strong>Authentication \u2192 Sign-in method</strong> \u201eE-Mail/Passwort\u201c aktivieren.</li>' +
    '<li>Unter <strong>Firestore Database</strong> eine Datenbank im Produktionsmodus anlegen und die Sicherheitsregeln einf\u00fcgen.</li>' +
    '<li>Unter <strong>Projekteinstellungen \u2192 Meine Apps</strong> eine Web-App anlegen und die <code>firebaseConfig</code>-Werte kopieren.</li>' +
    '<li>Die Werte oben in der <code>app.js</code> bei <code>firebaseConfig</code> eintragen.</li>' +
    '</ol></div></div>';
}

/* 3.4.0: Liest, was gerade in den Anmeldefeldern steht, bevor render() sie
   ersetzt. Ein Feld, das es im aktuellen Modus nicht gibt (Name beim
   Anmelden, Passwort beim Zuruecksetzen), laesst seinen alten Wert stehen -
   so ist er nach dem Zurueckwechseln wieder da. */
function authEingabenMerken() {
  const e = ui.authEingabe;
  const name = document.getElementById("a-name");
  const email = document.getElementById("a-email");
  const pass = document.getElementById("a-pass");
  if (name) e.name = name.value;
  if (email) e.email = email.value;
  if (pass) e.pass = pass.value;
}

function renderAuth() {
  authEingabenMerken();
  const m = ui.authMode;
  const sichtbar = ui.authPassSichtbar;
  let html = '<div class="solo">';
  html += soloMarke(m === "register" ? "Konto anlegen"
        : m === "reset" ? "Passwort zur\u00fccksetzen" : "Anmelden",
        m === "register" ? "Schritt 1 von 2 \u00b7 Konto" : null);
  html += '<p class="subtitle" style="margin-bottom:var(--space-6)">' +
    (m === "register" ? "Einmalig \u2013 danach auf jedem Ger\u00e4t."
     : m === "reset" ? "Wir schicken dir einen Link zum Neusetzen."
     : "Weiterlernen, wo du aufgeh\u00f6rt hast.") + '</p>';
  html += '<div class="card">';
  if (m === "register") {
    const nameFehler = !!(ui.authFeldFehler && ui.authFeldFehler.name);
    html += '<div class="field"><label for="a-name">Dein Name <span class="opt">\u2013 wird in der App angezeigt</span></label>';
    html += '<input type="text" id="a-name" maxlength="40" autocomplete="nickname"' +
      (nameFehler ? ' aria-invalid="true" aria-describedby="a-name-fehler"' : '') + '>';
    if (nameFehler) html += '<div class="field__fehler" id="a-name-fehler">Bitte ausf\u00fcllen</div>';
    html += '</div>';
  }
  html += '<div class="field"><label for="a-email">E-Mail</label>';
  html += '<input type="email" id="a-email" autocomplete="email" inputmode="email"></div>';
  if (m !== "reset") {
    html += '<div class="field"><label for="a-pass">Passwort' +
      (m === "register" ? ' <span class="opt">\u2013 mindestens 6 Zeichen</span>' : '') + '</label>';
    /* 3.4.0: Das Auge steht IM Feld, rechts - dort sucht man es (Bild 24 der
       Sammlung). Passwoerter vertippt man am Handy leicht, ohne es zu sehen. */
    html += '<div class="feld-mit-knopf">';
    html += '<input type="' + (sichtbar ? "text" : "password") + '" id="a-pass" autocomplete="' +
      (m === "register" ? "new-password" : "current-password") + '" autocapitalize="off" spellcheck="false">';
    html += '<button type="button" class="icon-btn" data-action="passwort-zeigen" aria-pressed="' + (sichtbar ? "true" : "false") +
      '" aria-label="' + (sichtbar ? "Passwort verbergen" : "Passwort anzeigen") + '">' +
      ikon(sichtbar ? "augeZu" : "auge") + '</button>';
    html += '</div></div>';
  }
  if (ui.authError) html += '<div class="error-box" style="margin:var(--space-4) 0 0">' + ikon("warnung", "i-sm") +
    '<div class="banner__text">' + esc(ui.authError) + '</div></div>';
  if (ui.authInfo) html += '<div class="info-box" style="margin:var(--space-4) 0 0">' + ikon("haken", "i-sm") +
    '<div class="banner__text">' + esc(ui.authInfo) + '</div></div>';

  const busy = ui.authBusy ? " disabled" : "";
  const laed = ui.authBusy ? " busy" : "";
  html += '<div class="form-actions">';
  if (m === "login") {
    html += '<button class="full' + laed + '" data-action="login"' + busy + '>Anmelden</button>';
  } else if (m === "register") {
    html += '<button class="full' + laed + '" data-action="register"' + busy + '>Konto anlegen</button>';
  } else {
    html += '<button class="full' + laed + '" data-action="reset"' + busy + '>Link zusenden</button>';
  }
  html += '</div>';

  /* Offene Frage 13: Google/Apple als zusaetzliche Anmeldearten, nur dort
     sinnvoll, wo tatsaechlich ein Konto entsteht bzw. man sich anmeldet -
     beim Zuruecksetzen (m === "reset") gibt es kein Passwort, das ein
     Anbieter ersetzen koennte. Bewusst .secondary statt eines gefuellten
     Knopfs: Es bleibt bei EINER gefuellten Flaeche pro Bildschirm
     (styles.css Abschnitt 6), das ist weiterhin "Anmelden"/"Konto anlegen". */
  if (m !== "reset") {
    html += '<div class="auth-trenner"><span>oder</span></div>';
    html += '<div class="auth-anbieter">';
    html += '<button type="button" class="secondary full' + laed + '" data-action="google-login"' + busy + '>' +
      OAUTH_LOGOS.google + '<span>Mit Google anmelden</span></button>';
    if (APPLE_LOGIN_BEREIT) {
      html += '<button type="button" class="secondary full' + laed + '" data-action="apple-login"' + busy + '>' +
        OAUTH_LOGOS.apple + '<span>Mit Apple anmelden</span></button>';
    }
    html += '</div>';
  }
  html += '</div>';

  /* Die Nebenwege stehen unter der Karte, nicht darin - sie gehoeren nicht
     zum Formular. */
  html += '<div class="empty__aktionen" style="margin-top:var(--space-5)">';
  if (m === "login") {
    html += '<button class="secondary" data-action="mode-register"' + busy + '>Neues Konto anlegen</button>';
    html += '<button class="linklike" data-action="mode-reset"' + busy + '>Passwort vergessen?</button>';
  } else {
    html += '<button class="linklike" data-action="mode-login"' + busy + '>Zur\u00fcck zur Anmeldung</button>';
  }
  html += '</div>';
  /* Datenschutz und Impressum (Rechtstexte, Phase 5) sind keine
     Bedienschritte, sondern Fussnoten - deshalb .rechtsfuss statt
     .linklike: klein, gedaempft, in einer Zeile, statt wie eine weitere
     Handlung neben "Passwort vergessen?" auszusehen. Muessen VOR dem
     Anlegen des Kontos lesbar sein, nicht erst danach - deshalb schon
     hier auf dem Anmeldebildschirm. Ein einziger Datenschutz-Text statt
     zweier verschieden benannter (v3.0.3 hatte zusaetzlich einen
     eigenen, alltagssprachlichen Bildschirm in der App selbst) - dessen
     Inhalt steht jetzt als "Kurz gesagt" oben in derselben Seite. */
  html += '<div class="rechtsfuss" style="margin-top:var(--space-5)">';
  html += '<a href="./datenschutzerklaerung.html">Datenschutz</a>';
  html += '<span class="rechtsfuss__trenner" aria-hidden="true">·</span>';
  html += '<a href="./impressum.html">Impressum</a>';
  html += '</div>';
  html += '</div>';
  app.innerHTML = html;

  /* Werte per Eigenschaft zurueck, nicht als value-Attribut ins HTML: ein
     Passwort gehoert nicht in den Markup-Text. */
  const zurueck = { "a-name": ui.authEingabe.name, "a-email": ui.authEingabe.email, "a-pass": ui.authEingabe.pass };
  for (const id in zurueck) {
    const feld = document.getElementById(id);
    if (feld && zurueck[id]) feld.value = zurueck[id];
  }

  const pass = document.getElementById("a-pass");
  if (pass) pass.addEventListener("keydown", e => {
    if (e.key === "Enter") (m === "register" ? doRegister() : doLogin());
  });
  const email = document.getElementById("a-email");
  if (email && m === "reset") email.addEventListener("keydown", e => {
    if (e.key === "Enter") doReset();
  });
  const name = document.getElementById("a-name");
  /* 9: Fehler verschwindet, sobald man tippt - ohne render(), wie beim
     Kartenformular. */
  if (name) name.addEventListener("input", () => {
    if (ui.authFeldFehler && ui.authFeldFehler.name) {
      ui.authFeldFehler.name = false;
      name.removeAttribute("aria-invalid");
      name.removeAttribute("aria-describedby");
      const fehlerEl = document.getElementById("a-name-fehler");
      if (fehlerEl) fehlerEl.remove();
    }
  });
}

function renderImport() {
  const profiles = oldLocalProfiles();
  let html = '<div class="solo">';
  html += soloMarke("Alte Karten gefunden");
  html += '<p class="subtitle" style="margin-bottom:var(--space-6)">Willkommen, ' + esc(displayName) + '.</p>';
  html += '<div class="card">';
  html += '<p class="hint">Auf diesem Ger\u00e4t liegen noch Karten aus der Offline-Version. ' +
    'Sollen sie in dein Konto \u00fcbernommen werden?</p>';
  html += '<div class="form-actions" style="flex-direction:column">';
  for (const p of profiles) {
    html += '<button class="full" data-action="import-old" data-name="' + esc(p) + '">\u00dcbernehmen von \u201e' + esc(p) + '\u201c</button>';
  }
  html += '<button class="secondary full" data-action="skip-import">Ohne Import starten</button>';
  html += '</div></div></div>';
  app.innerHTML = html;
}

/* ============================================================================
   3.0.0 – DAS GERÜST

   Vier Ebenen, klar getrennt:

     SHELL   AppBar oben, Navigation unten (am Handy) bzw. links (am Desktop).
             Bleibt stehen, ist Orientierung.
     VIEW    Der Inhalt. Scrollt. Lesebreite, mittig.
     MODUS   Abfrage, Übung, Durchsicht. Verdeckt die Shell vollständig und
             bringt eine eigene, einzeilige Leiste mit. (Das Prinzip stand
             schon in 2.16.0 als "imModus" im Code - jetzt hat es eine Form.)
     OVERLAY Dialog, Sheet, Toast.

   Die Navigation ist EIN Block mit drei Knöpfen. Ob daraus eine Leiste unten
   oder eine Spalte links wird, entscheidet allein die styles.css. Damit ist
   diese Entscheidung jederzeit umkehrbar, ohne hier etwas anzufassen.
   ========================================================================= */

/* Die Kopfzeile. zurueck = data-action für den Zurück-Knopf (oder null),
   titel = fester Text (sonst steht dort der Bereichs-Umschalter). */
function appBar(cfg) {
  const c = cfg || {};
  let html = '<header class="appbar">';
  if (c.zurueck) {
    html += '<button class="icon-btn" data-action="' + c.zurueck + '" aria-label="Zurück">' +
      ikon("zurueck") + '</button>';
  }
  if (c.titel) {
    html += '<div class="appbar__title">' + esc(c.titel) + '</div>';
  } else {
    /* Zwei Fassungen desselben Platzes: Am Handy steht hier der Umschalter
       (die Bereichsliste passt nicht auf den Bildschirm), am Desktop steht
       sie offen in der Spalte links und hier nur noch der Name der Ansicht.
       Welche von beiden erscheint, entscheidet allein die styles.css. */
    html += '<button class="bereich-pill" data-action="bereich-sheet-auf" ' +
      'aria-haspopup="dialog" aria-label="Bereich wechseln">' +
      '<span>' + esc(currentBereich().name) + '</span>' + ikon("chevronUnten") + '</button>';
    html += '<div class="appbar__title appbar__title--ansicht">' + esc(c.ansicht || "") + '</div>';
  }
  html += '<div class="appbar__spacer"></div>';
  if (c.aktion) html += c.aktion;
  html += '</header>';
  return html;
}

/* Die Leiste für einen Modus: raus, wie weit, und die eine Nebenhandlung. */
function modeBar(cfg) {
  const c = cfg || {};
  let html = "";
  if (typeof c.anteil === "number") {
    const p = Math.max(0, Math.min(100, Math.round(c.anteil * 100)));
    html += '<div class="modebar__fortschritt" style="width:' + p + '%"></div>';
  }
  html += '<div class="modebar">';
  html += '<button class="icon-btn" data-action="' + esc(c.zu) + '" aria-label="' +
    esc(c.zuLabel || "Schließen") + '">' + ikon("schliessen") + '</button>';
  html += '<div class="modebar__mitte">' + (c.mitte || "") + '</div>';
  html += c.rechts || '<span style="width:var(--ctrl-md);flex:none"></span>';
  html += '</div>';
  return html;
}

/* Die Navigation. Am Handy sind nur .nav__tabs sichtbar; die übrigen Teile
   blendet die styles.css erst ab 900 px ein, wo aus der Leiste eine Spalte
   wird und Platz für Marke, Bereiche und Einstellungen ist. */
function navLeiste() {
  const tabs = [
    { id: "lernen", label: "Lernen", icon: "lernen", action: "tab-lernen" },
    { id: "fortschritt", label: "Fortschritt", icon: "fortschritt", action: "tab-fortschritt" },
    { id: "verwalten", label: "Verwalten", icon: "verwalten", action: "tab-verwalten" }
  ];
  const offen = bereiche ? dueCards().length : 0;

  let html = '<nav class="nav" aria-label="Hauptbereiche">';

  html += '<div class="nav__brand">' + ikon("marke", "i-lg") + '<strong>Adrabic</strong></div>';

  html += '<div class="nav__bereiche">';
  html += '<div class="nav-titel">Bereiche</div>';
  html += '<div class="liste" style="background:transparent;border:0">';
  (bereiche || []).forEach(b => {
    const d = dueCardsFor(b).length;
    html += '<button class="liste-zeile' + (b.id === currentBereich().id && !ui.einstellungen ? " aktiv" : "") +
      '" data-action="select-bereich" data-bid="' + esc(b.id) + '">' +
      '<span class="liste-zeile__text">' + esc(b.name) + '</span>' +
      (d > 0 ? '<span class="badge zustand-gesehen">' + d + '</span>' : '') + '</button>';
  });
  html += '<button class="liste-zeile" data-action="add-bereich">' +
    ikon("plus", "i-sm") + '<span class="liste-zeile__text">Bereich anlegen</span></button>';
  html += '</div></div>';

  html += '<div class="nav__tabs" role="tablist">';
  tabs.forEach(t => {
    const aktiv = !ui.einstellungen && ui.tab === t.id;
    html += '<button class="nav__tab' + (aktiv ? " active" : "") + '" data-action="' + t.action +
      '" role="tab" aria-selected="' + (aktiv ? "true" : "false") + '">' +
      ikon(t.icon, aktiv ? "voll" : "") +
      '<span>' + t.label + '</span>' +
      (t.id === "lernen" && offen > 0 ? '<span class="nav__dot" aria-hidden="true"></span>' : '') +
      '</button>';
  });
  html += '</div>';

  html += '<div class="nav__foot">';
  html += '<button class="liste-zeile' + (ui.einstellungen ? " aktiv" : "") +
    '" data-action="einstellungen">' + ikon("zahnrad", "i-sm") +
    '<span class="liste-zeile__text">Einstellungen</span></button>';
  html += '</div>';

  html += '</nav>';
  return html;
}

/* Das Bereichs-Sheet. Ersatz für die waagerecht scrollende Pill-Reihe: Die
   kostete eine volle Zeile auf dem Bildschirm, den man täglich sieht, und
   hörte ab vier Bereichen auf, bedienbar zu sein. Hier steht zusätzlich, wie
   viel in jedem Bereich offen ist - das war vorher nirgends zu sehen. */
function bereichSheet() {
  if (!ui.bereichSheet || !bereiche) return "";
  /* Tippen neben das Blatt schliesst - anders als beim Eingabe-Dialog, wo das
     eine halb getippte Eingabe kosten koennte. Damit ein Tipp INS Blatt nicht
     bis zum Hintergrund durchschlaegt, traegt das Blatt selbst eine Handlung,
     die nichts tut: closest() findet sie zuerst. Kein Inline-JavaScript. */
  let html = '<div class="dlg-backdrop" data-action="bereich-sheet-zu" role="presentation">';
  html += '<div class="dlg" data-action="nichts" role="dialog" aria-modal="true" aria-label="Bereich wählen">';
  html += '<h3>Bereich</h3>';
  html += '<div class="sheet-liste"><div class="liste" style="background:transparent;border:0">';
  bereiche.forEach(b => {
    const d = dueCardsFor(b).length;
    const aktiv = b.id === ui.bereichId || (!ui.bereichId && b.id === currentBereich().id);
    html += '<button class="liste-zeile' + (aktiv ? " aktiv" : "") +
      '" data-action="select-bereich" data-bid="' + esc(b.id) + '">' +
      '<span class="liste-zeile__text">' + esc(b.name) + '</span>' +
      (d > 0 ? '<span class="badge zustand-gesehen">' + d + ' fällig</span>' : '<span class="liste-zeile__wert">fertig</span>') +
      (aktiv ? ikon("haken", "i-sm") : '') + '</button>';
  });
  html += '<button class="liste-zeile" data-action="add-bereich">' +
    ikon("plus", "i-sm") + '<span class="liste-zeile__text">Bereich anlegen</span></button>';
  html += '</div></div>';
  html += '<div class="dlg-actions"><button class="secondary" data-action="bereich-sheet-zu">Schließen</button></div>';
  html += '</div></div>';
  return html;
}

/* 18.09.2026, Video-1-Nachlese: die vier selteneren Handlungen aus der
   Werkzeugleiste in Verwalten (Auswaehlen, Umkehren, Umbenennen, Loeschen) -
   vorher alle dauerhaft nebeneinander, jetzt in einem Blatt, das nur kommt,
   wenn man "Mehr" antippt. Gleiche Huelle wie bereichSheet(). Bedingungen
   je Zeile unveraendert aus der alten Werkzeugleiste uebernommen. */
function bereichMehrSheet() {
  if (!ui.bereichMehr) return "";
  const cards = currentCards();
  const gefuehrt = istGefuehrt(currentBereich());
  let html = '<div class="dlg-backdrop" data-action="bereich-mehr-zu" role="presentation">';
  html += '<div class="dlg" data-action="nichts" role="dialog" aria-modal="true" aria-label="Weitere Handlungen">';
  html += '<h3>Weitere Handlungen</h3>';
  html += '<div class="sheet-liste"><div class="liste" style="background:transparent;border:0">';
  if (cards.length > 0) {
    html += '<button class="liste-zeile" data-action="bereich-mehr-auswaehlen">' +
      ikon("auswaehlen", "i-sm") + '<span class="liste-zeile__text">Mehrere Karten auswählen</span></button>';
  }
  if (cards.length > 1 && !gefuehrt) {
    html += '<button class="liste-zeile" data-action="bereich-mehr-umkehren" title="Reihenfolge aller Karten in diesem Bereich einmalig umkehren">' +
      ikon("umkehren", "i-sm") + '<span class="liste-zeile__text">Reihenfolge umkehren</span></button>';
  }
  if (!gefuehrt) {
    html += '<button class="liste-zeile" data-action="bereich-mehr-umbenennen" title="Bereich umbenennen">' +
      ikon("stift", "i-sm") + '<span class="liste-zeile__text">Bereich umbenennen</span></button>';
  }
  html += '<button class="liste-zeile gefahr" data-action="bereich-mehr-loeschen" title="Bereich löschen">' +
    ikon("muell", "i-sm") + '<span class="liste-zeile__text">Bereich löschen</span></button>';
  html += '</div></div>';
  html += '<div class="dlg-actions"><button class="secondary" data-action="bereich-mehr-zu">Schließen</button></div>';
  html += '</div></div>';
  return html;
}

/* 16.09.2026 (Beobachtung 1): Detailansicht einer Karte aus der Verwalten-
   Liste - fuer Notizen, die in der einzeiligen Vorschau abgeschnitten sind.
   Gleiche Huelle wie bereichSheet() (dasselbe .dlg-Muster), nur mit anderem
   Inhalt. Rein lesend; Bearbeiten bleibt ein eigener Knopf, der zum
   bestehenden Bearbeiten-Formular fuehrt - keine zweite Bearbeiten-Logik. */
function cardDetailSheet() {
  if (!ui.cardDetailId) return "";
  const c = findCard(ui.cardDetailId);
  if (!c) return "";
  const b = currentBereich();
  let html = '<div class="dlg-backdrop" data-action="card-detail-zu" role="presentation">';
  html += '<div class="dlg" data-action="nichts" role="dialog" aria-modal="true" aria-labelledby="card-detail-titel">';
  html += '<h3 id="card-detail-titel"' + (istArabisch(c.wort) ? ' class="arabic" lang="ar" dir="rtl"' : '') + '>' + esc(c.wort) + '</h3>';
  html += '<p class="dlg-text" style="margin-bottom:var(--space-3)">' + esc(c.uebersetzung) + '</p>';
  if (c.extra) html += '<div class="extra-note-voll" style="margin-bottom:var(--space-4)">' + renderExtra(c.extra, []) + '</div>';
  html += '<div style="margin-bottom:var(--space-2)">' + zustandBadge(c) + '</div>';
  html += kartenTagsHtml(c.id, b);
  html += '<div class="dlg-actions">';
  if (kartenBearbeitbar(b)) {
    html += '<button data-action="card-detail-bearbeiten" data-id="' + esc(c.id) + '">' +
      ikon("stift", "i-sm") + ' Bearbeiten</button>';
  }
  html += '<button class="secondary" data-action="card-detail-zu">Schließen</button>';
  html += '</div></div></div>';
  return html;
}

/* Das Karten-Blatt. Dieselbe Huelle wie das Bereichs-Sheet und das
   Wahl-Blatt (.dlg), nur mit dem Formular darin. Die Kennungen f-wort,
   f-ueb, f-extra und f-stufe bleiben unveraendert - app.js liest sie
   direkt (siehe README, "Wenn du am Markup arbeitest").

   Tippen neben das Blatt schliesst NICHT: Anders als bei einer Liste
   kostet das hier eine halb getippte Karte. Dieselbe Entscheidung wie beim
   Eingabe-Dialog (renderDialog). */
function karteSheet() {
  const editing = ui.editId ? findCard(ui.editId) : null;
  if (!ui.karteSheet && !editing) return "";
  if (istGefuehrt(currentBereich())) return "";

  const fehler = ui.karteFeldFehler || {};
  let html = '<div class="dlg-backdrop" data-action="nichts" role="presentation">';
  html += '<div class="dlg" data-action="nichts" role="dialog" aria-modal="true" aria-labelledby="karte-sheet-titel">';
  html += '<h3 id="karte-sheet-titel">' + (editing ? "Karte bearbeiten" : "Neue Karte") + '</h3>';
  html += '<div class="field"><label for="f-wort">Wort <span class="opt">– Pflicht</span></label>';
  html += '<input type="text" id="f-wort" class="arabic" dir="rtl" lang="ar" maxlength="' + MAX_WORT + '" value="' + esc(formDraft.wort) + '"' +
    (fehler.wort ? ' aria-invalid="true" aria-describedby="f-wort-fehler"' : '') + '>';
  if (fehler.wort) html += '<div class="field__fehler" id="f-wort-fehler">Bitte ausfüllen</div>';
  html += '</div>';
  html += '<div class="field"><label for="f-ueb">Übersetzung <span class="opt">– Pflicht</span></label>';
  html += '<input type="text" id="f-ueb" maxlength="' + MAX_WORT + '" value="' + esc(formDraft.ueb) + '"' +
    (fehler.ueb ? ' aria-invalid="true" aria-describedby="f-ueb-fehler"' : '') + '>';
  if (fehler.ueb) html += '<div class="field__fehler" id="f-ueb-fehler">Bitte ausfüllen</div>';
  html += '</div>';
  html += '<div class="field"><label for="f-extra">Beispielsatz, Bild-Link oder Notiz <span class="opt">– optional</span></label>';
  html += '<textarea id="f-extra" rows="2" maxlength="' + MAX_EXTRA + '">' + esc(formDraft.extra) + '</textarea></div>';
  if (editing) {
    html += '<div class="field"><label for="f-stufe">Wiederholungsstufe</label>';
    html += '<input type="number" id="f-stufe" min="0" max="' + MAX_STUFE + '" step="1" value="' + editing.stufe + '" inputmode="numeric"></div>';
  }
  html += '<div class="dlg-actions">';
  /* Kurze Beschriftungen: .dlg-actions macht beide Knoepfe gleich breit, und
     "Karte hinzufuegen" brach dabei auf zwei Zeilen um. Worum es geht, steht
     als Ueberschrift ueber dem Blatt - der Knopf muss es nicht wiederholen. */
  html += '<button data-action="submit-card">' + (editing ? "Speichern" : "Hinzufügen") + '</button>';
  html += '<button class="secondary" data-action="karte-sheet-zu">' + (editing ? "Abbrechen" : "Fertig") + '</button>';
  html += '</div></div></div>';
  return html;
}

/* ---------- Banner ----------
   Drei Tiefen für Fehler: blockierend (eigener Bildschirm, siehe der
   Start-Fehler ganz unten), Banner (bleibt stehen, solange das Problem
   besteht) und Feld (unter dem Eingabefeld). Ein Banner ist bewusst NICHT
   wegklickbar: Was anhält, gehört nie in eine Meldung, die verschwindet. */
function bannerFehler(titel, text) {
  return '<div class="banner-fehler">' + ikon("warnung", "i-sm") +
    '<div class="banner__text"><strong>' + esc(titel) + '</strong> ' + text + '</div></div>';
}
function bannerInfo(text, leise) {
  return '<div class="' + (leise ? "banner-info banner-leise" : "banner-info") + '">' +
    ikon(leise ? "offline" : "warnung", "i-sm") +
    '<div class="banner__text">' + text + '</div></div>';
}
function bannerSchreibfehler() {
  if (!schreibFehler) return "";
  if (schreibFehler === "permission-denied" && schreibFehlerAusweisErneuert) {
    return bannerFehler("Kurz nicht gespeichert:",
      'Die Anmeldung war veraltet und wurde gerade erneuert. Versuch die letzte Änderung noch einmal zu speichern.');
  }
  return bannerFehler("Nicht gespeichert:",
    'Änderungen kommen gerade nicht in der Cloud an (' + esc(schreibFehler) + '). ' +
    'Lade ein Backup herunter, bevor du weiterlernst.');
}

function renderMain() {
  /* 2.16.0: Im Modus verschwindet die Navigation.

     Ueben, Abfrage und Durchsicht sind nichts, woraus man nebenbei
     herausklickt - wer mittendrin den Bereich wechselt oder auf Fortschritt
     tippt, verliert die laufende Runde. Trotzdem standen ueber der Karte
     drei Reihen: Kopfzeile, Bereichsreihe, Tabs. Auf dem Handy ist das der
     halbe erste Bildschirm - Platz, der der Karte fehlt, und drei
     Gelegenheiten, aus Versehen abzubrechen.

     3.0.0: Aus dem Sonderfall ist eine Ebene geworden. Ein Modus bringt seine
     eigene, einzeilige Leiste mit (siehe modeBar) - Shell und Modus koennen
     sich damit nicht mehr ins Gehege kommen.

     Sichtbar bleibt eine einzige Ausnahme: die Warnung, dass gerade nicht
     gespeichert wird. Die darf kein Modus verstecken. */
  const imModus = ui.tab === "lernen" && !!(ui.session || ui.lernSetId) && !ui.einstellungen;

  /* Erst den Inhalt bauen. Die Modi geben ihre Leiste selbst aus, deshalb
     muss das Geruest wissen, ob es ueberhaupt eines zeichnen soll. */
  let inhalt = "";
  if (ui.einstellungen) inhalt = renderEinstellungen();
  else inhalt = ui.tab === "lernen" ? renderLernen()
              : ui.tab === "fortschritt" ? renderFortschritt()
              : renderVerwalten();

  let html = "";
  let kopf = "";

  if (!imModus) {
    /* ---- Meldungen, die ueber allem stehen ---- */
    if (schreibFehler) kopf += bannerSchreibfehler();
    if (syncError) {
      kopf += bannerFehler("Verbindung:", esc(syncError) +
        ' Die App zeigt weiter den zuletzt geladenen Stand.');
    }

    const backupAge = ui.einstellungen ? 0 : daysSinceLastBackup();
    if (backupAge === null || backupAge >= 14) {
      kopf += '<div class="banner-info banner-leise">' + ikon("sichern", "i-sm") +
        '<div class="banner__text">' +
        (backupAge === null ? "Du hast noch nie ein Backup heruntergeladen."
                            : "Dein letztes Backup ist " + backupAge + " Tage her.") +
        ' <button class="tiny-link" data-action="export-backup">Jetzt sichern</button></div></div>';
    }
  } else if (schreibFehler) {
    kopf += bannerSchreibfehler();
  }

  /* ---- Geruest ---- */
  if (imModus) {
    /* Kein AppBar, keine Navigation. Die Leiste kommt aus dem Modus. */
    html += '<div class="view view--modus">' + kopf + inhalt + '</div>';
  } else if (ui.einstellungen) {
    /* 3.2.0: Eine offene Unterseite traegt ihren eigenen Titel und fuehrt
       zurueck zur Uebersicht, nicht aus den Einstellungen heraus. Sonst
       verliert man mit einem Tipp zwei Ebenen auf einmal. */
    html += ui.seite
      ? appBar({ titel: SEITEN_TITEL[ui.seite] || "Einstellungen", zurueck: "seite-zu" })
      : appBar({
          titel: "Einstellungen",
          zurueck: "einstellungen-zu",
          aktion: '<button class="ghost" data-action="einstellungen-zu">Fertig</button>'
        });
    html += '<div class="view">' + kopf + inhalt + '</div>';
    html += navLeiste();
  } else if (ui.seite) {
    /* Unterseite eines Reiters (gerade nur Fortschritt). Die Navigation
       bleibt stehen - man ist weiter in diesem Reiter, eine Ebene tiefer. */
    html += appBar({ titel: SEITEN_TITEL[ui.seite] || "", zurueck: "seite-zu" });
    html += '<div class="view">' + kopf + inhalt + '</div>';
    html += navLeiste();
  } else {
    const ansicht = ui.tab === "lernen" ? currentBereich().name
                  : ui.tab === "fortschritt" ? "Fortschritt" : "Verwalten";
    /* 16.09.2026 (Testrueckmeldung): Einstellungen war auf dem Handy
       ueberhaupt nicht mehr erreichbar - der einzige Knopf dafuer steckt in
       .nav__foot, und das blendet styles.css unter 900px komplett aus (das
       ist die Desktop-Spalte). Ohne eigenen Reiter (bewusst seit 2.19.0,
       "hierher geht man selten") bekommt die Kopfzeile jetzt zusaetzlich ein
       Zahnrad - am Desktop per CSS wieder ausgeblendet, dort fuehrt weiterhin
       nur die Rail-Zeile aus navLeiste() hin, damit es dort nicht doppelt
       steht. */
    html += appBar({
      ansicht: ansicht,
      aktion: '<button class="icon-btn appbar__einstellungen" data-action="einstellungen" aria-label="Einstellungen">' +
        ikon("zahnrad", "i-sm") + '</button>'
    });
    html += '<div class="view">' + kopf + inhalt + '</div>';
    html += navLeiste();
  }

  /* Das versteckte Dateifeld für den Import. Es steht ausserhalb aller
     Bildschirme, weil zwei Knöpfe es benutzen: der in den Einstellungen und
     der auf dem leeren Startbildschirm. Zwei Felder mit derselben Kennung
     wären ein Fehler, den niemand sieht - der zweite Knopf täte dann nichts. */
  html += '<input type="file" id="import-file-input" accept="application/json" style="display:none">';

  /* Vor dem Neuaufbau merken, in welchem Feld der Cursor stand - sonst springt
     er bei jedem Tastendruck heraus. Galt bisher nur fuer das Suchfeld. */
  const prevActive = document.activeElement;
  const prevActiveId = prevActive && prevActive.id ? prevActive.id : null;
  const prevSelStart = prevActive && typeof prevActive.selectionStart === "number"
    ? prevActive.selectionStart : null;

  /* Ebene 3 – Overlays. Reihenfolge zaehlt: der Eingabe-Dialog liegt ueber
     dem Bereichs-Sheet, damit ein „Bereich anlegen“ aus dem Sheet heraus
     bedienbar bleibt. */
  html += bereichSheet();
  html += bereichMehrSheet();
  html += wahlSheet();
  html += setArtSheet();
  html += karteSheet();
  html += cardDetailSheet();
  html += renderDialog();          // D2 – liegt als Overlay ueber allem
  html += renderToast();
  app.innerHTML = html;
  /* E7: Faktor am Container, damit ihn jede .arabic-Stelle darunter erbt. */
  app.style.setProperty("--arab-scale", String(arabFaktor()));
  /* Beobachtung 18: Tab-Wechsel kann den Scroll-/Layoutzustand aendern,
     ohne ein resize-Event auszuloesen - hier zur Sicherheit erneut syncen. */
  if (typeof syncViewportGap === "function") syncViewportGap();
  tickCountups();

  if (prevActiveId) {
    const again = document.getElementById(prevActiveId);
    if (again && typeof again.focus === "function") {
      again.focus();
      if (prevSelStart !== null && typeof again.setSelectionRange === "function") {
        try { again.setSelectionRange(prevSelStart, prevSelStart); } catch (e) {}
      }
    }
  }

  const importInput = document.getElementById("import-file-input");
  if (importInput) {
    importInput.addEventListener("change", e => {
      importBackupFile(e.target.files[0]);
      e.target.value = "";
    });
  }

  /* 2.4.0: Der Blick soll dort stehen, wo es weitergeht.

     Gesucht wird ab der gerade abgehakten Karte NACH VORN, nicht von ganz
     oben: Wer Karte 10 zuerst abhakt, wuerde sonst zurueck an den Anfang
     geworfen. Erst wenn dahinter nichts Offenes mehr steht, faengt die Suche
     vorn wieder an.

     Gescrollt wird ausserdem nur, wenn die Zielkarte gerade nicht zu sehen
     ist - sonst ruckelt die Seite bei jedem Tipp, obwohl alles schon im
     Bild steht. */
  sprungAusfuehren();
  if (ui.lernFokusNach) {
    const woher = ui.lernFokusNach;
    ui.lernFokusNach = null;
    requestAnimationFrame(() => {
      const alle = [...document.querySelectorAll(".lern-karte")];
      if (alle.length === 0) return;
      const offen = k => !k.classList.contains("ist-gelernt");
      let ziel = null;
      if (woher === "__start__") {
        /* Beim Oeffnen nur springen, wenn schon etwas erledigt ist - sonst
           steht man ohnehin an der richtigen Stelle. */
        if (alle.some(k => !offen(k))) ziel = alle.find(offen);
      } else {
        const i = alle.findIndex(k => k.dataset.lernid === woher);
        ziel = alle.slice(i + 1).find(offen);
        /* 2.16.0: Kein Ruecksprung mehr an den Anfang. Frueher stand hier
           "sonst nimm die erste offene Karte ueberhaupt" - wer unten die
           letzten Karten abhakte, wurde damit nach ganz oben geworfen,
           obwohl er dort gar nichts zu tun hatte. Steht hinter der
           abgehakten Karte nichts Offenes mehr, bleibt der Blick stehen.
           Nach oben geht es nur, wenn ALLES abgehakt ist - dort steht dann
           "Durchgearbeitet" mit dem Knopf zur Abfrage. */
        if (!ziel && !alle.some(offen)) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      }
      if (!ziel) return;
      const r = ziel.getBoundingClientRect();
      if (r.top < 60 || r.bottom > window.innerHeight - 60) {
        ziel.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    });
  }
  if (ui.tab === "lernen" && ui.session && ui.session.handwriting && ui.session.queue.length > 0) {
    setupHandwritingCanvas();
  }

  if (ui.dialog) setupDialog();     // D2

  if (ui.tab === "verwalten") {
    ["f-wort", "f-ueb"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("keydown", e => {
        if (e.key === "Enter") submitCardForm();
      });
    });
    /* Jede Eingabe sofort in den Entwurf spiegeln, damit ein render()
       dazwischen nichts loeschen kann. */
    [["f-wort", "wort"], ["f-ueb", "ueb"], ["f-extra", "extra"]].forEach(([id, key]) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", e => {
        formDraft[key] = e.target.value;
        /* 9: Fehler verschwindet, sobald man tippt - ohne render(), damit
           Fokus und Schreibfluss nicht unterbrochen werden. */
        if (ui.karteFeldFehler && ui.karteFeldFehler[key]) {
          ui.karteFeldFehler[key] = false;
          el.removeAttribute("aria-invalid");
          el.removeAttribute("aria-describedby");
          const fehlerEl = document.getElementById(id + "-fehler");
          if (fehlerEl) fehlerEl.remove();
        }
      });
    });
    /* 2.21.0: ersetzt den alten Einzel-Listener auf <select id="drill-source">
       - jetzt ein Radiopaar fuer den Modus plus beliebig viele Checkboxen
       fuer die Speicherkarten-Mehrfachauswahl. */
    document.querySelectorAll('input[name="drill-mode"]').forEach(el => {
      el.addEventListener("change", e => {
        ui.drillSource = e.target.value;
        /* 10: wie vorher bei den zwei <select> - "Nach Stufen" beginnt
           jedesmal wieder beim vollen Bereich, keine Reste vom letzten Mal. */
        if (ui.drillSource === "stufen") setzeVollenStufenBereich();
        render();
      });
    });
    document.querySelectorAll(".drill-set-check").forEach(el => {
      el.addEventListener("change", e => {
        if (e.target.checked) ui.drillSetIds.add(el.dataset.id);
        else ui.drillSetIds.delete(el.dataset.id);
        render();
      });
    });
    const searchEl = document.getElementById("f-search");
    if (searchEl) {
      const clearEl = document.getElementById("f-search-clear");
      const uebernehmen = wert => {
        /* Der Suchtext wird sofort uebernommen - im Feld steht er ohnehin
           schon, und ein render() aus anderer Richtung darf ihn nicht
           verlieren. Nur das Neuzeichnen der Liste wartet, bis der Finger
           kurz still steht. Ohne das rechnet jeder Tastendruck die Treffer
           aus und baut alle Zeilen neu. */
        ui.searchQuery = wert;
        ui.kartenSeite = 0;
        if (clearEl) clearEl.hidden = !wert;
        if (sucheTimer) clearTimeout(sucheTimer);
        /* 2.1.0: zeichneKartenListe() statt render() - nur die Liste, nicht
           das Suchfeld, in dem gerade getippt wird. */
        sucheTimer = setTimeout(() => { sucheTimer = null; zeichneKartenListe(); }, SUCH_VERZOEGERUNG);
      };
      searchEl.addEventListener("input", e => {
        /* 2.1.0: Solange die Handy-Tastatur an einem Wort baut (Autokorrektur,
           Wortvorschlag, Wischen), wird der Text nur mitgeschrieben und nichts
           neu gezeichnet. Jede Aenderung am DOM waehrend dieser Phase bringt
           die Tastatur durcheinander. */
        if (tastaturBautWort) { ui.searchQuery = e.target.value; return; }
        uebernehmen(e.target.value);
      });
      searchEl.addEventListener("compositionstart", () => { tastaturBautWort = true; });
      searchEl.addEventListener("compositionend", e => {
        tastaturBautWort = false;
        uebernehmen(e.target.value);
      });
    }
  }

}

/* Die Durchsicht. Eine Liste statt einer Karte pro Bildschirm: Wer mit einem
   Video mitgeht, will blaettern koennen, nicht 25-mal weitertippen. Auf einem
   breiten Bildschirm stehen zwei Spalten nebeneinander, auf dem Handy eine -
   das macht das Raster von selbst, ohne zweite Ansicht. */
function renderDurchsicht(set) {
  const alle = lernKarten(set);
  const cards = currentCards();
  const offen = alle.filter(istNeueKarte);
  const fertig = alle.length - offen.length;
  let html = "";

  /* 3.0.0: Die Durchsicht ist ein Modus wie die Abfrage - also dieselbe
     einzeilige Leiste oben statt Kopfzeile, Bereichsreihe und Reitern.
     Der Fortschrittsstrich sitzt darin; der breitere .lern-balken bleibt
     darunter stehen, weil er hier die einzige Rueckmeldung ueberhaupt ist:
     abgehakt wird ohne Ton, ohne Sprung, ohne Bildschirmwechsel. */
  html += modeBar({
    zu: "lern-ende",
    zuLabel: "Durchsicht beenden",
    mitte: fertig + " von " + alle.length + " gelernt",
    anteil: alle.length ? fertig / alle.length : 0,
    rechts: ui.lernLetzte
      ? '<button class="icon-btn" data-action="lern-undo" aria-label="Letztes Abhaken zurücknehmen">' +
        ikon("rueckgaengig") + '</button>'
      : null
  });

  html += '<div id="durchsicht">';
  html += '<div class="sektion__kopf">';
  html += '<h2 style="margin:0">' + iconSvg(set.art || "eigen") + ' ' + esc(set.name) + '</h2>';
  html += '<span class="hint">' + (offen.length > 0 ? 'noch ' + offen.length : 'fertig') + '</span>';
  html += '</div>';
  html += '<div class="lern-balken"><span style="width:' + (alle.length ? Math.round(fertig / alle.length * 100) : 0) + '%"></span></div>';
  /* 2.7.0: Ist alles abgehakt, ist der Bildschirm sonst nur eine Liste
     abgeblendeter Karten - man weiss nicht, ob man fertig ist. */
  /* 2.7.0: Ist alles abgehakt, ist der Bildschirm sonst nur eine Liste
     abgeblendeter Karten - man weiss nicht, ob man fertig ist. */
  if (offen.length === 0) {
    html += '<div class="stapel" style="margin-top:var(--stack)">';
    html += '<div class="empty__titel">Durchgearbeitet</div>';
    html += '<p class="empty__text">Jetzt kommt die erste Abfrage – dort verdienen sich die Karten ihre Stufe 1.</p>';
    html += '<button class="lg full" data-action="start-session">Abfrage starten</button>';
    html += '</div>';
  } else {
    html += '<p class="hint" style="margin-top:var(--space-4)">Geh mit dem Video mit. <strong>Gesehen</strong> ' +
      'stellt die Karte für heute in die Abfrage – gelernt hast du sie erst, wenn du sie dort weißt.</p>';
  }
  html += '</div>';

  html += '<div class="lern-raster">';
  for (const c of alle) {
    const neu = istNeueKarte(c);
    /* Die Nummer ist die Position im Bereich, nicht in dieser Auswahl. So
       laesst sich draussen sagen "Video 3 = Karten 41-63", und die Zahl
       bleibt dieselbe, egal ueber welche Speicherkarte man hereinkommt. */
    const nr = cards.indexOf(c) + 1;
    const notizOffen = ui.lernOffen.has(c.id);
    html += '<div class="lern-karte' + (neu ? "" : " ist-gelernt") + '" data-lernid="' + esc(c.id) + '">';
    html += '<div class="lern-nr">' + nr + '</div>';
    html += '<div class="lern-inhalt">';
    html += '<div class="wort' + (istArabisch(c.wort) ? ' arabic" lang="ar" dir="rtl' : '') + '">' + esc(c.wort) + '</div>';
    html += '<div class="uebersetzung">' + esc(c.uebersetzung) + '</div>';
    if (c.extra) {
      html += '<button class="lern-notiz-knopf" data-action="lern-notiz" data-id="' + esc(c.id) + '" aria-expanded="' + (notizOffen ? "true" : "false") + '">' +
        ikon(notizOffen ? "chevronUnten" : "chevronRechts", "i-sm") + ' Notiz</button>';
      if (notizOffen) html += '<div class="extra-note-voll">' + renderExtra(c.extra, []) + '</div>';
    }
    html += '</div>';
    html += '<div class="lern-tat">';
    if (neu) {
      html += '<button class="lern-haken" data-action="lern-haken" data-id="' + esc(c.id) + '">Gesehen</button>';
    } else {
      html += zustandBadge(c);
    }
    html += '</div>';
    html += '</div>';
  }
  html += '</div>';
  return html;
}

/* ---------- 2.7.0: der Faden ----------
   In einem gefuehrten Kartensatz steht hier immer GENAU EIN Schritt: ein Satz,
   ein Knopf. Vorher standen mehrere Meldungen nebeneinander, und die
   wichtigste war eine Wegbeschreibung ("schalte die naechste Lektion unter
   Verwalten bei den Speicherkarten mit dem Schloss frei"). Wer weiterlernen
   will, soll nicht in einen anderen Tab geschickt werden, um dort ein Symbol
   zu suchen - der naechste Schritt gehoert dorthin, wo man steht. */
function renderFaden(b, due) {
  const akt = aktuelleLektion(b);
  const naechste = naechsteLektion(b);
  let html = "";
  if (!akt) {
    return '<p class="hint">Dieser Kartensatz hat noch keine Lektionen.</p>';
  }
  const inLektion = lernKarten(akt);
  const ungelernt = inLektion.filter(istNeueKarte);
  const wiederholungen = due.filter(c => !istNeueKarte(c));

  /* 1. Neuer Stoff in der offenen Lektion - das ist immer der erste Schritt. */
  if (ungelernt.length > 0) {
    const angefangen = inLektion.length - ungelernt.length;
    html += '<p class="due-info">' + iconSvg("lektion") + ' <strong>' + esc(akt.name) + '</strong></p>';
    html += '<p class="hint" style="padding:0 0 12px">' +
      (angefangen > 0
        ? 'Noch ' + ungelernt.length + ' von ' + inLektion.length + ' Karten.'
        : inLektion.length + ' Karten, noch keine davon gelernt.') + '</p>';
    html += '<button data-action="lern-set" data-id="' + esc(akt.id) + '">' +
      (angefangen > 0 ? "Weiter durchgehen" : "Durchgehen") + '</button>';
    if (wiederholungen.length > 0) {
      html += '<p class="hint" style="margin-top:14px">Danach warten ' + wiederholungen.length +
        ' Wiederholung' + (wiederholungen.length === 1 ? '' : 'en') + '.</p>';
      html += '<button class="secondary" data-action="start-session">Erst wiederholen (' + wiederholungen.length + ')</button>';
    }
    return html;
  }

  /* 2. Nichts Neues, aber es ist etwas abzufragen.
     2.11.1: Karten, die gerade erst durchgesehen wurden, stehen hier als
     ERSTE Abfrage - sie "Wiederholung" zu nennen waere falsch, man hat sie
     ja noch nie gewusst. Unterschieden am Hoechststand. */
  if (wiederholungen.length > 0) {
    /* Wortwahl aus demselben Wortschatz: Karten, die gerade erst durchgesehen
       wurden, sind "gesehen" - sie zu "Wiederholungen" zu erklaeren waere
       falsch, man hat sie ja noch nie gewusst. */
    const erstmalig = wiederholungen.filter(c => kartenZustand(c).id === "gesehen").length;
    const wort = erstmalig === wiederholungen.length
      ? (wiederholungen.length === 1 ? 'gesehene Karte zum Abfragen' : 'gesehene Karten zum Abfragen')
      : (wiederholungen.length === 1 ? 'Wiederholung' : 'Wiederholungen');
    html += '<p class="due-info"><strong>' + wiederholungen.length + '</strong> ' + wort +
      ' aus „' + esc(akt.name) + '"</p>';
    html += '<button data-action="start-session">Los</button>';
    return html;
  }

  /* 3. Heute fertig. Was jetzt zaehlt, ist der Weg zur naechsten Lektion. */
  const fehlen = lektionOffeneKarten(b, akt);
  if (fehlen.length === 0 && naechste) {
    /* Kann nur eintreten, wenn die naechste Lektion selbst leer ist. */
    html += '<p class="due-info">' + ikon("haken", "i-sm") + ' „' + esc(akt.name) + '“ sitzt.</p>';
    html += '<p class="hint" style="padding:0">„' + esc(naechste.name) + '" ist frei.</p>';
    return html;
  }
  html += '<p class="due-info">' + ikon("haken", "i-sm") + ' Für heute erledigt.</p>';
  if (naechste) {
    const naechsterTermin = fehlen.map(c => c.nextReview).sort()[0];
    html += '<p class="hint" style="padding:6px 0 0">' + ikon("schloss", "i-sm") + ' <strong>' + esc(naechste.name) + '</strong> wird frei, ' +
      'sobald jede Karte aus „' + esc(akt.name) + '" einmal auf Stufe ' + LEKTION_STUFE + ' war.</p>';
    html += '<p class="hint" style="padding:0">Noch ' + fehlen.length + ' Karte' + (fehlen.length === 1 ? '' : 'n') +
      (naechsterTermin ? ' – die nächste ist am ' + fmtDatum(naechsterTermin) + ' dran.' : '.') + '</p>';
  } else {
    html += '<p class="hint" style="padding:6px 0 0">Alle Lektionen sind durch.</p>';
  }
  return html;
}

function fmtDatum(iso) {
  const t = todayStr();
  if (iso <= t) return "heute";
  const d = new Date(t + "T00:00:00"); d.setDate(d.getDate() + 1);
  if (fmtDate(d) === iso) return "morgen";
  const p = iso.split("-");
  return p[2] + "." + p[1] + ".";
}

/* 2.14.1: Der Hinweis auf die gemerkten Karten. Er steht sowohl auf dem
   Abschluss-Bildschirm als auch im Lernen-Tab - wer die Sitzung abbricht oder
   den Tab wechselt, soll ihn trotzdem bekommen. */
function gemerktHinweis() {
  const n = ui.gemerktRunde.size;
  if (n === 0) return "";
  return '<div class="merk-hinweis">' + iconSvg("stern", "star filled") +
    '<span class="banner__text">Du hast dir ' + n + ' Karte' + (n === 1 ? '' : 'n') +
    ' gemerkt.</span>' +
    '<button class="secondary" data-action="merk-oeffnen">Ansehen</button></div>';
}
/* Bringt einen dorthin, wo die gemerkten Karten liegen: Verwalten-Tab,
   Speicherkarte aufgeklappt, und sie leuchtet kurz auf - dasselbe Muster wie
   ueberall sonst im Tool. */
function merkSetOeffnen() {
  const set = (currentBereich().sets || []).find(x => x.art === "eigen" && x.name === MERK_SET_NAME);
  ui.gemerktRunde = new Set();
  if (!set) { render(); return; }
  ui.session = null;
  ui.lernSetId = null;
  /* 3.2.0: Ein Reiterwechsel verlaesst auch eine offene Unterseite - sonst
     traegt die Kopfzeile den Titel der Seite, aus der man gerade kommt. */
  ui.seite = null;
  ui.tab = "verwalten";
  ui.setsOffen = true;
  ui.openSetId = set.id;
  springeZu("set-" + set.id);
  render();
}

/* ---------- 2.19.0: der Einstellungs-Bildschirm ----------
   Gesammelt ist hier alles, was man selten tut und einmal einstellt. Die
   Ordnung folgt der Frage, WORAN man dreht: erst wie es aussieht, dann die
   eigenen Daten, dann das Konto. Jeder Abschnitt sagt in einem Satz, was
   er bewirkt - gerade Backup und Import sind Handlungen, die man nicht
   rückgängig macht. */
/* ============================================================================
   EINSTELLUNGEN — 3.2.0: eine Liste, keine Wand

   Vorher: sechs Sektionen untereinander, jede ein Kasten mit Ueberschrift und
   drei bis fuenf Zeilen Erklaerung. Alles gleichzeitig sichtbar, obwohl man
   immer nur wegen EINER Sache herkommt. Rueckmeldung des Betreibers: "unter
   jedem Bereich ist 10 Zeilen Erklaerung".

   Jetzt (Video 1, "ein Bildschirm macht eine Sache"):
     - Die Uebersicht ist eine Liste von Zeilen. Jede Zeile nennt links, worum
       es geht, und rechts den aktuellen Stand. Kein erklaerender Text.
     - Die Erklaerung ist nicht geloescht - sie steht dort, wo entschieden
       wird: im Blatt (kleine Wahl) oder auf der Unterseite (Handlung).
     - Wer nichts aendern will, scrollt an allem in drei Sekunden vorbei.
   ========================================================================= */

/* Die Titel der Unterseiten. Eine Stelle, damit Kopfzeile und Zeile nicht
   auseinanderlaufen. */
const SEITEN_TITEL = {
  sichern: "Sichern",
  einspielen: "Einspielen",
  verlauf: "Aufzeichnung",
  lektionen: "Lektionen",
  leeches: "Karten, die nicht klappen",
  vorschau: "Die n\u00e4chsten 7 Tage"
};

/* Eine Zeile der Uebersicht: Symbol, Beschriftung, aktueller Stand, Pfeil. */
function einstZeile(cfg) {
  return '<button class="liste-zeile" data-action="' + cfg.action + '"' +
    (cfg.id ? ' data-id="' + esc(cfg.id) + '"' : '') + '>' +
    ikon(cfg.icon, "i-sm") +
    '<span class="liste-zeile__text">' + esc(cfg.text) + '</span>' +
    (cfg.wert ? '<span class="liste-zeile__wert">' + esc(cfg.wert) + '</span>' : '') +
    ikon("chevronRechts", "i-sm") + '</button>';
}

function labelVon(liste, id, ersatz) {
  const t = liste.find(x => x.id === id);
  return t ? t.label : ersatz;
}

function renderEinstellungen() {
  if (ui.seite) return renderEinstellungenSeite(ui.seite);

  const alter = daysSinceLastBackup();
  const tage = Object.keys(verlauf).length;
  let html = "";

  /* ---------- Darstellung und Lernen: drei kleine Entscheidungen ---------- */
  html += '<div class="sektion">';
  html += '<div class="eyebrow">Darstellung</div>';
  html += '<div class="liste">';
  html += einstZeile({ action: "wahl-sheet", id: "thema", icon: "leer", text: "Helligkeit",
    wert: labelVon(THEMEN, settings.thema, "Dunkel") });
  html += einstZeile({ action: "wahl-sheet", id: "arab", icon: "karten", text: "Arabische Schrift",
    wert: labelVon(ARAB_STUFEN, settings.arabGroesse, "Normal") });
  html += '</div></div>';

  html += '<div class="sektion">';
  html += '<div class="eyebrow">Lernen</div>';
  html += '<div class="liste">';
  html += einstZeile({ action: "wahl-sheet", id: "limit", icon: "lernen", text: "Karten pro Sitzung",
    wert: labelVon(SITZUNGS_LIMITS, settings.sitzungsLimit, "Alle") });
  html += '</div></div>';

  /* ---------- Daten: drei Handlungen, jede auf eigener Seite ----------
     Sichern, Einspielen und Verlauf standen bisher als drei Kaesten
     untereinander, zusammen ueber 15 Zeilen Text auf einem Bildschirm, den
     man wegen einer einzigen Sache aufruft. */
  html += '<div class="sektion">';
  html += '<div class="eyebrow">Daten</div>';
  html += '<div class="liste">';
  html += einstZeile({ action: "einst-seite", id: "sichern", icon: "sichern", text: "Sichern",
    wert: alter === null ? "noch nie" : alter === 0 ? "heute" : "vor " + alter + " Tg." });
  html += einstZeile({ action: "einst-seite", id: "einspielen", icon: "einspielen", text: "Einspielen" });
  html += einstZeile({ action: "einst-seite", id: "verlauf", icon: "fortschritt", text: "Aufzeichnung",
    wert: tage + " Tag" + (tage === 1 ? "" : "e") });
  html += '</div></div>';

  /* ---------- Hilfe ---------- */
  html += '<div class="sektion">';
  html += '<div class="eyebrow">Hilfe</div>';
  html += '<div class="liste">';
  html += einstZeile({ action: "open-error-modal", icon: "warnung", text: "Fehler melden" });
  html += '</div></div>';

  /* ---------- Konto ---------- */
  html += '<div class="sektion">';
  html += '<div class="eyebrow">Konto</div>';
  html += '<div class="liste">';
  html += '<div class="liste-zeile">' + ikon("konto", "i-sm") +
    '<span class="liste-zeile__text">' + esc(displayName) + '</span>' +
    (currentUser && currentUser.email ? '<span class="liste-zeile__wert">' + esc(currentUser.email) + '</span>' : '') +
    '</div>';
  html += '<button class="liste-zeile gefahr" data-action="logout">' + ikon("abmelden", "i-sm") +
    '<span class="liste-zeile__text">Abmelden</span></button>';
  html += '<button class="liste-zeile gefahr" data-action="delete-account"' +
    (ui.kontoLoeschenBusy ? " disabled" : "") + '>' + ikon("muell", "i-sm") +
    '<span class="liste-zeile__text">Konto endgültig löschen</span></button>';
  html += '</div></div>';

  html += einstFuss();
  return html;
}

/* Datenschutz und Impressum muessen jederzeit erreichbar sein, nicht nur vor
   der Anmeldung (Paragraph 5 DDG: "leicht erkennbar, unmittelbar erreichbar").
   Ohne diese Zeile haette ein angemeldeter Nutzer keinen Weg dorthin ausser
   sich abzumelden. .rechtsfuss statt .liste-zeile: Fussnoten, keine
   Kontoaktion wie "Abmelden" darueber. Die Versionsnummer steht daneben -
   dort sucht man sie, wenn man sie braucht. */
function einstFuss() {
  let html = '<div class="rechtsfuss" style="margin-top:var(--space-6)">';
  html += '<a href="./datenschutzerklaerung.html">Datenschutz</a>';
  html += '<span class="rechtsfuss__trenner" aria-hidden="true">·</span>';
  html += '<a href="./impressum.html">Impressum</a>';
  html += '</div>';
  html += '<p class="hint" style="text-align:center;color:var(--text-3);margin-top:var(--space-4)" ' +
    'data-action="debug-version-tap">Adrabic ' + APP_VERSION + '</p>';
  return html;
}

/* ---------- Die Unterseiten ----------
   Jede macht genau eine Sache, und hier ist der Text richtig aufgehoben: Wer
   diese Seite geoeffnet hat, will wissen, was passiert, bevor er tippt. */
function renderEinstellungenSeite(id) {
  const b = currentBereich();
  let html = "";

  if (id === "sichern") {
    const alter = daysSinceLastBackup();
    html += '<div class="card">';
    html += '<p class="hint">Ein Backup ist eine Datei auf deinem Gerät. Sie hängt an nichts – ' +
      'geht das Konto verloren, ist sie das Einzige, was bleibt.</p>';
    html += '<div class="' + (alter === null || alter >= 14 ? "banner-info" : "banner-info banner-leise") +
      '" style="margin:var(--space-4) 0 0">' + ikon("sichern", "i-sm") + '<div class="banner__text">' +
      (alter === null ? "Du hast noch nie ein Backup heruntergeladen."
       : alter === 0 ? "Zuletzt gesichert: heute."
       : "Zuletzt gesichert vor " + alter + " Tag" + (alter === 1 ? "" : "en") + ".") + '</div></div>';
    html += '<div class="form-actions">';
    html += '<button data-action="export-backup">' + ikon("sichern", "i-sm") + ' Alles sichern</button>';
    html += '<button class="secondary" data-action="export-backup-current">Nur „' + esc(b.name) + '“</button>';
    html += '</div>';
    html += '</div>';
    if (!istGefuehrt(b)) {
      html += '<div class="card" style="margin-top:var(--stack)">';
      html += '<h3>Zum Weitergeben</h3>';
      html += '<p class="hint">Derselbe Bereich, aber alles auf Stufe 0 und alle Lektionen bis auf ' +
        'die erste zu. Für deinen eigenen Stand ändert sich nichts.</p>';
      html += '<div class="form-actions">';
      html += '<button class="secondary" data-action="export-weitergabe">' + ikon("teilen", "i-sm") +
        ' Kartensatz zum Weitergeben</button>';
      html += '</div></div>';

      /* Lehrer-Modus, Kernablauf - siehe teileLektionCode() in app.js und
         plan/lehrer-modus/GERUEST.md, Abschnitt H. Code-basiertes Teilen skaliert
         bis 3000+ Karten und ist nicht invasiv – kein URL-Fragment, nur kurze Codes. */
      html += '<div class="card" style="margin-top:var(--stack)">';
      html += '<h3>Per Code teilen</h3>';
      if (b.teilCode) {
        html += '<p class="hint">Aktiver Code: <strong>' + esc(b.teilCode) + '</strong>. ' +
          'Jede:r mit diesem Code kann die Lektion übernehmen, ohne dass du davon erfährst.</p>';
        html += '<div class="form-actions">';
        html += '<button class="secondary danger" data-action="beende-teilen-code">Teilen beenden</button>';
        html += '</div>';
      } else {
        html += '<p class="hint">Erzeugt einen kurzen Code, über den jede:r mit dem Code diese Lektion ' +
          'in die eigene App übernehmen kann – ohne dass du erfährst, wer oder wie oft. Du kannst das Teilen jederzeit beenden.</p>';
        html += '<div class="form-actions">';
        html += '<button class="secondary" data-action="teile-lektion-code">' + ikon("teilen", "i-sm") +
          ' Code erzeugen</button>';
        html += '</div>';
      }
      html += '</div>';
    }
    return html;
  }

  if (id === "einspielen") {
    html += '<div class="card">';
    html += '<p class="hint">Eine Backup-Datei oder einen Kartensatz laden. Gehört die Datei zu einem ' +
      'Satz, den du schon hast, wird er ergänzt – dein Lernstand bleibt.</p>';
    html += '<div class="form-actions">';
    html += '<button data-action="import-trigger">' + ikon("einspielen", "i-sm") +
      ' Datei auswählen</button>';
    html += '</div></div>';

    html += '<div class="card" style="margin-top:var(--stack)">';
    html += '<h3>Code einlösen</h3>';
    html += '<p class="hint">Der Code einer geteilten Lektion – einfach eingeben und Lektion übernehmen.</p>';
    html += '<div class="form-actions">';
    html += '<button class="secondary" data-action="code-einloesen-start">' + ikon("einspielen", "i-sm") +
      ' Code eingeben</button>';
    html += '</div></div>';
    return html;
  }

  if (id === "verlauf") {
    const tage = Object.keys(verlauf).length;
    html += '<div class="card">';
    html += '<p class="hint">Das Tagesprotokoll trägt Kalender, Wochenzahlen und die Serie – ' +
      'aufgezeichnet sind <strong>' + tage + '</strong> Tag' + (tage === 1 ? "" : "e") + '. ' +
      'Löschen betrifft nur die Anzeige: Karten, Stufen und Fälligkeiten bleiben unberührt.</p>';
    html += '<div class="form-actions">';
    html += '<button class="secondary" data-action="verlauf-reset"' + (tage === 0 ? " disabled" : "") +
      '>Verlauf zurücksetzen</button>';
    html += '</div></div>';
    return html;
  }

  return '<p class="hint">Diese Seite gibt es nicht.</p>';
}

/* ---------- Das Wahl-Blatt ----------
   Fuer Entscheidungen mit zwei bis vier Antworten. Kommt von unten, laesst
   den Bildschirm dahinter stehen und traegt die Erklaerung genau dort, wo
   entschieden wird - statt dauerhaft unter einer Einstellung, die man
   einmal setzt und danach nie wieder ansieht. */
const WAHLEN = {
  thema: {
    titel: "Helligkeit", action: "set-thema",
    liste: () => THEMEN, wert: () => settings.thema,
    hilfe: 'Dunkel ist die Fassung, für die diese App gebaut ist. Hell ist keine ' +
           'Umkehrung davon, sondern eine eigene: Tinte auf Papier statt Creme auf Schwarz.'
  },
  arab: {
    titel: "Arabische Schrift", action: "set-arab-groesse",
    liste: () => ARAB_STUFEN, wert: () => settings.arabGroesse,
    hilfe: 'Gilt überall in der App. Es gibt nichts einzustellen, nur auszuprobieren, ' +
           'was du lesen kannst.',
    probe: true
  },
  limit: {
    titel: "Karten pro Sitzung", action: "set-sitzungslimit",
    liste: () => SITZUNGS_LIMITS, wert: () => settings.sitzungsLimit,
    hilfe: 'Bei „Alle“ zeigt eine Sitzung jede fällige Karte auf einmal. Bei einer ' +
           'Zahl hört sie danach auf – der Rest bleibt fällig und steht in der nächsten ' +
           'Sitzung wieder oben, Wiederholungen zuerst. Bremst nur die Sitzung, nicht den Stoff.'
  }
};

function wahlSheet() {
  if (!ui.wahlSheet) return "";
  const w = WAHLEN[ui.wahlSheet];
  if (!w) return "";
  const aktiv = w.wert();
  let html = '<div class="dlg-backdrop" data-action="wahl-sheet-zu" role="presentation">';
  html += '<div class="dlg" data-action="nichts" role="dialog" aria-modal="true" aria-label="' + esc(w.titel) + '">';
  html += '<h3>' + esc(w.titel) + '</h3>';
  if (w.probe) {
    html += '<p class="arabic" lang="ar" dir="rtl" style="font-size:calc(1.6rem * var(--arab-scale,1));' +
      'text-align:center;margin-top:var(--space-3)">بِسْمِ ٱللّٰهِ</p>';
  }
  html += '<div class="sheet-liste"><div class="liste" style="background:transparent;border:0">';
  w.liste().forEach(o => {
    const ist = o.id === aktiv;
    html += '<button class="liste-zeile' + (ist ? " aktiv" : "") + '" data-action="' + w.action +
      '" data-id="' + esc(o.id) + '">' +
      '<span class="liste-zeile__text">' + esc(o.label) + '</span>' +
      (ist ? ikon("haken", "i-sm") : '') + '</button>';
  });
  html += '</div></div>';
  if (ui.wahlSheet === "thema" && settings.thema === "auto") {
    html += '<p class="field__hilfe">Gerade ' + (themaAufgeloest() === "hell" ? "hell" : "dunkel") + '.</p>';
  }
  html += '<p class="field__hilfe" style="margin-top:var(--space-4)">' + w.hilfe + '</p>';
  html += '<div class="dlg-actions"><button class="secondary" data-action="wahl-sheet-zu">Fertig</button></div>';
  html += '</div></div>';
  return html;
}

/* 10: dasselbe Blatt-Muster wie wahlSheet(), aber pro Speicherkarte statt
   app-weit - siehe ui.setArtSheetId. Waehlen aendert sofort (wie bei
   Helligkeit), das Blatt bleibt bis "Fertig" offen. */
function setArtSheet() {
  const set = ui.setArtSheetId ? findSet(ui.setArtSheetId) : null;
  if (!set) return "";
  const aktiv = set.art || "eigen";
  let html = '<div class="dlg-backdrop" data-action="set-art-sheet-zu" role="presentation">';
  html += '<div class="dlg" data-action="nichts" role="dialog" aria-modal="true" aria-label="Art von ' + esc(set.name) + '">';
  html += '<h3>Art von „' + esc(set.name) + '“</h3>';
  html += '<div class="sheet-liste"><div class="liste" style="background:transparent;border:0">';
  SET_ARTEN.forEach(a => {
    const ist = a === aktiv;
    html += '<button class="liste-zeile' + (ist ? " aktiv" : "") + '" data-action="set-art-waehlen" data-id="' + a + '">' +
      ikon(a === "eigen" ? "stern" : a, "i-sm") +
      '<span class="liste-zeile__text">' + esc(SET_ART_TITEL[a]) + '</span>' +
      (ist ? ikon("haken", "i-sm") : '') + '</button>';
  });
  html += '</div></div>';
  html += '<p class="field__hilfe" style="margin-top:var(--space-4)">' + esc(SET_ART_ERKLAERUNG[aktiv]) + '</p>';
  html += '<div class="dlg-actions"><button class="secondary" data-action="set-art-sheet-zu">Fertig</button></div>';
  html += '</div></div>';
  return html;
}

/* 3.0.15: renderDatenschutz() (seit 3.0.3) entfernt - der eigene,
   alltagssprachliche Bildschirm hier in der App und die vollstaendige
   Datenschutzerklaerung (impressum.html-Nachbar, Phase 5) sagten im Kern
   dasselbe unter zwei verschiedenen Namen ("Datenschutz" hier,
   "Datenschutzerklaerung" dort) - verwirrend statt hilfreich, siehe
   plan/phase-5-recht/LOGBUCH.md. Der Inhalt steht jetzt als Abschnitt
   "Kurz gesagt" oben in datenschutzerklaerung.html, ein einziges Ziel
   fuer beide Bildschirme (renderAuth, renderEinstellungen). */

/* ---------- 3.0.0: Der Startbildschirm ----------
   Eine Frage, eine Antwort: Was ist heute dran? Statt einer Folge von
   Hinweiszeilen und einem Knopf zwischen Kaesten steht hier EIN Stapel - die
   Zahl gross, die Handlung darunter, und darunter erst das Beiwerk.

   Der Leerzustand ist kein Restfall, sondern ein eigener Bildschirm: Symbol,
   Satz, EINE Handlung. Es gibt drei davon (gar keine Karten / heute nichts
   faellig / alles erledigt), und jeder sagt etwas anderes. */
function renderLernen() {
  const lset = lernSet();
  if (lset) return renderDurchsicht(lset);
  if (ui.session) return renderSession();

  const cards = currentCards();
  const due = dueCards();
  const b = currentBereich();
  const neuImStapel = due.filter(istNeueKarte).length;
  let html = "";

  html += gemerktHinweis();

  /* --- Noch gar keine Karten: der allererste Bildschirm nach der Anmeldung.
     2.11.2: Hier stand einmal nur "leg welche unter Verwalten an" - wer
     gerade eine Kartensatz-Datei bekommen hatte, las also ausgerechnet die
     Aufforderung, alles selbst zu tippen. Der Import steht deshalb zuerst
     und als richtiger Knopf. */
  if (cards.length === 0) {
    html += '<div class="empty">';
    html += '<div class="empty__icon betont">' + ikon("einspielen", "i-xl") + '</div>';
    html += '<div class="empty__titel">Noch nichts in \u201e' + esc(b.name) + '\u201c</div>';
    html += '<p class="empty__text">Hast du eine Kartensatz-Datei bekommen? Spiel sie ein \u2013 ' +
      'deine Lektionen stehen danach fertig da.</p>';
    html += '<div class="empty__aktionen">';
    html += '<button data-action="import-trigger">Kartensatz einspielen</button>';
    html += '<button class="ghost" data-action="tab-verwalten">Eigene Karten anlegen</button>';
    html += '</div></div>';
    return html;
  }

  /* --- Ein gefuehrter Satz hat seinen eigenen Faden. --- */
  if (istGefuehrt(b)) {
    html += renderFaden(b, due);
  } else if (due.length === 0) {
    html += '<div class="empty">';
    html += '<div class="empty__icon betont">' + ikon("fertig", "i-xl") + '</div>';
    html += '<div class="empty__titel">F\u00fcr heute durch</div>';
    html += '<p class="empty__text">In \u201e' + esc(b.name) + '\u201c ist nichts mehr f\u00e4llig. ' +
      'Der n\u00e4chste Schwung kommt von selbst.</p>';
    html += '<div class="empty__aktionen">';
    html += '<button class="secondary" data-action="tab-verwalten">Trotzdem \u00fcben</button>';
    html += '</div></div>';
  } else {
    /* --- Der Stapel. Die eine gefuellte Goldflaeche dieses Bildschirms. --- */
    html += '<div class="stapel">';
    html += '<div class="stapel__zahl">' + due.length + '</div>';
    html += '<div class="stapel__was">' +
      (due.length === 1 ? 'Karte ist heute f\u00e4llig' : 'Karten sind heute f\u00e4llig') +
      ' \u00b7 von ' + cards.length + '</div>';
    html += '<button class="lg full" data-action="start-session">Lernsession starten</button>';
    if (neuImStapel > 0 || due.length - neuImStapel > 0) {
      html += '<div class="stapel__meta">';
      if (due.length - neuImStapel > 0) {
        html += '<span class="badge zustand-solide">' + (due.length - neuImStapel) + ' Wiederholung' +
          (due.length - neuImStapel === 1 ? '' : 'en') + '</span>';
      }
      if (neuImStapel > 0) html += '<span class="badge zustand-neu">' + neuImStapel + ' neu</span>';
      html += '</div>';
    }
    html += '</div>';
  }

  /* --- Serie. Steht unter dem Stapel, nicht darueber: sie ist Belohnung,
     nicht Aufgabe. --- */
  const serieHeute = serieAktuell();
  if (serieHeute > 0) {
    html += '<div class="serie-karte" style="margin-top:var(--stack)">';
    html += '<span class="serie-zahl">' + ikon("serie", "i-lg") +
      '<strong>' + serieHeute + '</strong></span>';
    html += '<span class="serie-text">Tag' + (serieHeute === 1 ? "" : "e") + ' am St\u00fcck' +
      (streak.beste > serieHeute ? '<br><span class="serie-beste">Bester Lauf: <strong>' +
        streak.beste + '</strong></span>' : '') + '</span>';
    html += '</div>';
  }

  /* A7: Wer drei Bereiche hat und heute nur einen lernt, bekam nie eine
     Streak und erfuhr nirgends, warum. Jetzt steht es hier. */
  const offen = bereicheMitOffenem().filter(x => x.bereich.id !== currentBereich().id);
  if (offen.length > 0) {
    html += '<div class="banner-info banner-leise" style="margin-top:var(--stack)">' +
      ikon("lernen", "i-sm") + '<div class="banner__text">Noch offen f\u00fcr die Serie: ' +
      offen.map(x => '<strong>' + esc(x.bereich.name) + '</strong> (' + x.offen + ')').join(", ") +
      '</div></div>';
  } else if (due.length === 0 && streak.lastCompletedDate === todayStr()) {
    html += '<div class="banner-info banner-leise" style="margin-top:var(--stack)">' +
      ikon("haken", "i-sm") + '<div class="banner__text">Heute ist in allen Bereichen alles erledigt.</div></div>';
  }

  return html;
}

/* E4/D10: der Fortschritts-Tab.
   Ohne sichtbaren Fortschritt fehlt der Grund weiterzumachen - und die
   Vorschau warnt vor einem 300er-Tag, bevor er da ist. */
/* Was heute noch zu tun ist - der einzige Teil des Tabs, der jeden Tag von
   vorn beginnt und abschliessbar ist. */
function fortschrittHeute(cards) {
  let html = "";
  /* --- 1. Heute: das Einzige, was jeden Tag von vorn beginnt --- */
  const t = todayStr();
  /* 2.10.1: Neue Karten zaehlen hier mit. Vorher standen nur Wiederholungen
     drin - wer einen frisch eingespielten Satz vor sich hatte, las "fertig ✓",
     obwohl die erste Lektion noch komplett ungelernt war. Fuer die STREAK
     zaehlen weiterhin nur Wiederholungen (siehe bereicheMitOffenem); hier
     geht es um die Frage "was ist heute noch zu tun", und dazu gehoert neuer
     Stoff, der freigeschaltet ist. */
  const offenHeute = cards.filter(c => c.nextReview <= t).length;
  const heute = verlauf[t] || { w: 0, n: 0 };
  const getan = heute.w + heute.n;
  const ziel = getan + offenHeute;
  const anteil = ziel > 0 ? Math.round((getan / ziel) * 100) : 100;
  /* Die Serie steht oben und gross - sie ist die einzige Zahl, die taeglich
     etwas von einem will. Daneben die beste Serie, damit ein Riss nicht wie
     ein Totalverlust aussieht. */
  /* 2.13.0: Eine grosse 0 als erste Zahl des Tabs sieht aus wie ein Fehler
     und nicht wie ein Anfang. Wer noch keine Serie hat, bekommt deshalb keine
     Null, sondern die naechste Handlung. Und "beste Serie" erscheint erst,
     wenn es eine gibt - eine zweite 0 daneben macht es nur schlimmer. */
  const serie = serieAktuell();
  if (serie === 0) {
    html += '<div class="serie-karte">';
    html += '<div class="serie-zahl"><strong>' + (offenHeute === 0 && getan > 0 ? ikon("haken", "i-lg") : "1") + '</strong></div>';
    html += '<div class="serie-text">' +
      (offenHeute === 0 && getan > 0
        ? 'Heute erledigt – morgen beginnt die Serie'
        : 'Heute wird Tag 1<br><span class="serie-klein">Wiederholungen erledigen, dann zählt der Tag</span>') + '</div>';
    if (streak.beste > 0) html += '<div class="serie-beste">beste Serie<br><strong>' + streak.beste + '</strong></div>';
    html += '</div>';
  } else {
    html += '<div class="serie-karte">';
    html += '<div class="serie-zahl"><strong>' + serie + '</strong><span class="arab-ziffer" lang="ar" dir="rtl">' + arabZahl(serie) + '</span></div>';
    html += '<div class="serie-text">Tag' + (serie === 1 ? '' : 'e') + ' am Stück</div>';
    if (streak.beste > 0) html += '<div class="serie-beste">beste Serie<br><strong>' + streak.beste + '</strong></div>';
    html += '</div>';
  }
  if (streakRissZurueckliegtInTagen()) {
    /* 3.2.0: War ein .stat-block mit drei Inline-Korrekturen, die den Block
       gleich wieder flach machten - seit .stat-block eine Flaeche ist, waere
       das ein Kasten, der nur so tut. Es ist inhaltlich auch keiner: ein
       Hinweis mit einer Handlung. */
    html += '<div class="stat-block">';
    html += '<p class="stat-sub">Die Serie stand bei <strong>' + streak.vorher +
      '</strong> und ist ' + fmtDatum(streak.gerissenAm) + ' gerissen.</p>';
    html += '<button class="secondary" data-action="streak-fortsetzen">Serie fortsetzen</button>';
    html += '</div>';
  }
  
  html += '<div class="stat-block">';
  html += '<h3>Heute</h3>';
  html += '<div class="heute-bar" role="img" aria-label="' + getan + ' von ' + ziel + ' erledigt"><span style="width:' + anteil + '%"></span></div>';
  html += '<p class="stat-sub">' +
    (ziel === 0
      ? 'Nichts zu tun – schau morgen wieder rein.'
      : '<strong>' + getan + '</strong> Antwort' + (getan === 1 ? '' : 'en') + (offenHeute > 0 ? ', noch ' + offenHeute + ' Karte' + (offenHeute === 1 ? '' : 'n') + ' offen' : ' – fertig')) +
    (heute.n > 0 ? ' · ' + heute.n + ' zum ersten Mal gesehen' : '') + '</p>';
  /* 2.13.0: Ein Tab, der nur zusieht, fuehlt sich tot an. Wenn heute noch
     etwas offen ist, gehoert der Weg dorthin hierher - und nicht nur die
     Feststellung, dass etwas offen ist. */
  if (offenHeute > 0) html += '<button data-action="tab-lernen">Weiter lernen</button>';
  html += '</div>';
  return html;
}

/* Der Wochenvergleich: die einzige Stelle im Fortschritt-Tab, die eine
   RICHTUNG zeigt statt eines Standes. Bewusst nur diese eine Zahl (Antworten
   gesamt), nicht drei - sonst ist es wieder ein Kachel-Armaturenbrett
   (siehe Abschnitt 12 in styles.css). Die Zahl zählt beim Anzeigen von 0
   hoch (tickCountups()) - das einzige animierte Element hier, und es zeigt
   etwas Echtes: wie viel diese Woche schon zusammengekommen ist. */
function fortschrittTrend() {
  const diese = verlaufSumme(7);
  const letzte = verlaufSummeSpanne(7, 14);
  if (diese.gesamt === 0 && letzte.gesamt === 0) return "";
  let html = '<div class="stat-block">';
  html += '<h3>Diese Woche im Vergleich</h3>';
  html += '<div style="display:flex;align-items:center;gap:var(--space-4);flex-wrap:wrap">';
  html += '<p class="gross-zahl" style="margin:0" data-countup="' + diese.gesamt + '"><strong>0</strong>' +
    '<span>Antworten diese Woche</span></p>';
  if (letzte.gesamt > 0) {
    const delta = diese.gesamt - letzte.gesamt;
    const pct = Math.round((delta / letzte.gesamt) * 100);
    const richtung = delta > 0 ? "trend-up" : delta < 0 ? "trend-down" : "trend-flat";
    const pfeil = delta > 0 ? "↑" : delta < 0 ? "↓" : "→";
    html += '<span class="trend-pill ' + richtung + '">' + pfeil + ' ' + Math.abs(pct) +
      ' % zur Vorwoche</span>';
  } else {
    html += '<span class="trend-pill">Vorwoche war leer</span>';
  }
  html += '</div></div>';
  return html;
}

/* Die Bewegung: zwoelf Wochen als Kalenderraster. */
function fortschrittWochen() {
  let html = "";
  /* --- 2. Die letzten Wochen: die Bewegung, die dem Tab vorher fehlte ---
     Ein Kalenderraster sagt in einer Sekunde, ob man dranbleibt - dafür
     braucht es keine Beschriftung und keine Erklärung. */
  const w12 = verlaufSumme(84);
  /* 2.13.0: Das Raster waechst mit. Zwoelf leere Wochen am ersten Tag sehen
     aus wie ein Fehler; vier Wochen mit einem hellen Kaestchen sehen aus wie
     ein Anfang. Gezeigt wird ab der ersten Woche mit einem Eintrag,
     mindestens vier und hoechstens zwoelf. */
  let tageTief = 0;
  for (const k of Object.keys(verlauf)) {
    const alter = Math.round((new Date(todayStr()) - new Date(k)) / 86400000);
    if (alter > tageTief) tageTief = alter;
  }
  const wochen = Math.min(12, Math.max(4, Math.ceil((tageTief + 1) / 7)));
  html += '<div class="stat-block">';
  html += '<h3>' + (wochen === 1 ? 'Diese Woche' : 'Die letzten ' + wochen + ' Wochen') + '</h3>';
  /* 2.11.5: Gezaehlt werden ANTWORTEN, nicht Karten. Eine Karte kann an einem
     Tag mehrfach drankommen ("Nicht" haengt sie wieder hinten an), und wer
     21 Karten durchsieht und danach abfragt, hat 42 Antworten gegeben.
     "44 Karten bearbeitet" bei 21 Karten im Stapel las sich wie ein Fehler. */
  html += '<p class="stat-sub">' + w12.gesamt + ' Antworten · ' + w12.n + ' Karten zum ersten Mal gesehen</p>';
  html += renderKalender(wochen * 7);
  if (w12.gesamt === 0) {
    html += '<p class="stat-sub" style="margin-top:var(--space-3)">Noch nichts aufgezeichnet – ab dem ersten gelernten Tag füllt sich das Raster.</p>';
  }
  /* 2.19.0: „Verlauf zurücksetzen" stand mitten in der Anzeige, die es
     löscht. Es steht jetzt bei den anderen Daten-Handlungen in den
     Einstellungen. */
  html += '</div>';
  return html;
}

/* Der Stand: eine Zahl, die nie zurueckgeht, darunter die Verteilung. */
function fortschrittStoff(cards) {
  let html = "";
  /* --- 3. Der Stoff: eine Zahl, die nie zurückgeht --- */
  const gesessen = cards.filter(c => (c.maxStufe || 0) >= LEKTION_STUFE).length;
  const gruppen = stufenVerteilung(cards);
  const gesamt = cards.length;
  html += '<div class="stat-block">';
  html += '<h3>Dein Stoff</h3>';
  /* maxStufe kann nicht fallen - anders als der Stapelbalken darunter, der
     schwankt, sobald man etwas vergisst. Deshalb steht diese Zahl oben. */
  html += '<p class="gross-zahl"><strong>' + gesessen + '</strong>' +
    '<span class="arab-ziffer" lang="ar" dir="rtl">' + arabZahl(gesessen) + '</span>' +
    ' <span>von ' + gesamt + ' Karten saßen schon mindestens einmal</span></p>';
  const woche = verlaufSumme(7);
  if (woche.n > 0) html += '<p class="stat-sub">Diese Woche ' + woche.n + ' neue dazu.</p>';
  /* 2.13.0: Ein Balken aus einer einzigen Farbe verteilt nichts - er sieht
     nur aus, als waere er kaputt. Solange alle Karten im selben Zustand sind,
     bleibt er weg. */
  const belegt = gruppen.filter(g => g.anzahl > 0);
  if (belegt.length < 2) {
    html += '<p class="stat-sub">Alle ' + gesamt + ' Karten sind gerade <strong>' +
      esc(belegt.length ? belegt[0].label : "neu") + '</strong>.</p>';
    return html + '</div>';
  }
  html += '<p class="stat-sub" style="margin-top:var(--space-4)">Wie fest es gerade sitzt:</p>';
  html += '<div class="stat-bar" role="img" aria-label="' +
    esc(gruppen.map(g => g.anzahl + " " + g.label).join(", ")) + '">';
  gruppen.forEach(g => {
    if (g.anzahl === 0) return;
    const p = (g.anzahl / gesamt) * 100;
    html += '<div class="stat-seg" style="width:' + p.toFixed(2) + '%; background:' + g.farbe + '" title="' +
      esc(g.label + ": " + g.anzahl + " Karten (" + g.erklaerung + ")") + '"></div>';
  });
  html += '</div>';
  html += '<div class="stat-legend">';
  gruppen.forEach(g => {
    html += '<span><span class="dot" style="background:' + g.farbe + '"></span><strong>' + g.anzahl + '</strong> ' +
      esc(g.label) + ' <span style="opacity:0.7">(' + esc(g.erklaerung) + ')</span></span>';
  });
  html += '</div>';
  html += '</div>';
  return html;
}

/* Nur wenn es Lektionen gibt. Ein Ziel wirkt, wenn es nah ist - 21 Karten
   in einer Lektion sind eines, 133 im Bereich nicht. */
function fortschrittLektionen(nurBereich) {
  let html = "";
  /* --- 4. Lektionen: nur, wenn es welche gibt ---
     Der Ziel-Gradient-Effekt greift bei einem NAHEN Ziel. 21 Karten in einer
     Lektion sind eines, 133 Karten im Bereich nicht. Wer keine Lektionen hat
     (eigene Bereiche), sieht diesen Block gar nicht - ein leerer Block waere
     schlechter als keiner. */
  const bF = currentBereich();
  const lekF = lektionenVon(bF);
  if (nurBereich && lekF.length > 0) {
    const offenIds = offeneLektionIds(bF);
    const aktF = aktuelleLektion(bF);
    html += '<div class="stat-block">';
    html += '<h3>Lektionen</h3>';
    const fertig = lekF.filter(x => lektionSitzt(bF, x)).length;
    html += '<p class="stat-sub">' + fertig + ' von ' + lekF.length + ' sitzen</p>';
    html += '<div class="lekt-leiste">';
    for (const st of lekF) {
      const karten = setCards(st);
      const sitzt = lektionSitzt(bF, st);
      const zu = !offenIds.has(st.id);
      const dran = aktF && st.id === aktF.id;
      const fest = karten.filter(c => (c.maxStufe || 0) >= LEKTION_STUFE || istVerbrannt(c)).length;
      const p = karten.length ? Math.round((fest / karten.length) * 100) : 100;
      html += '<div class="lekt-kachel' + (zu ? " zu" : sitzt ? " sitzt" : "") + (dran ? " dran" : "") + '">';
      html += '<div class="lekt-name">' + (zu ? ikon("schloss", "i-sm") + " " : sitzt ? ikon("haken", "i-sm") + " " : "") + esc(st.name) + '</div>';
      html += '<div class="lekt-bar"><span style="width:' + (zu ? 0 : p) + '%"></span></div>';
      html += '<div class="lekt-zahl">' + (zu ? karten.length + ' Karten' : fest + ' / ' + karten.length) + '</div>';
      html += '</div>';
    }
    html += '</div>';
    html += '</div>';
  }
  return html;
}

/* Der Fortschritts-Tab. Er reiht nur noch seine Bloecke aneinander; jeder
   steht fuer sich und laesst sich einzeln lesen und aendern. Vorher war das
   eine Funktion von 188 Zeilen, in die vier Veroeffentlichungen nacheinander
   etwas hineingeschrieben hatten. */
/* ============================================================================
   FORTSCHRITT — 3.2.0: vier Bloecke statt neun

   Vorher standen neun Bloecke untereinander: Serie, Heute, Wochenvergleich,
   Kalender, Stoff, Lektionen, verbrannte Karten, Sieben-Tage-Vorschau - jeder
   mit Ueberschrift und erklaerender Unterzeile. Rueckmeldung des Betreibers:
   "Chaosladen". Video 1: ein Bildschirm macht eine Sache, und wer etwas
   Zusaetzliches zeigen will, nimmt eine neue Seite statt einer neuen Zeile.

   Auf dem Tab bleibt jetzt nur, was die Frage "wie stehe ich gerade da"
   beantwortet - Serie, heute, die letzten Wochen, der Stoff. Alles, was eine
   LISTE ist (Lektionen, Karten die nicht klappen, die naechsten sieben Tage),
   ist eine eigene Seite hinter einer Zeile. Nichts ist geloescht, nichts hat
   seine Logik geaendert: dieselben Funktionen, ein anderer Ort.
   ========================================================================= */

function renderFortschritt() {
  if (ui.seite) return renderFortschrittSeite(ui.seite);

  const cards = statsCards();
  const nurBereich = ui.statsScope === "bereich";
  let html = "";

  html += '<div class="pills" style="margin-bottom:var(--space-4)">';
  html += '<button class="pill' + (nurBereich ? "" : " active") + '" data-action="stats-scope" data-scope="alle">Alle Bereiche</button>';
  html += '<button class="pill' + (nurBereich ? " active" : "") + '" data-action="stats-scope" data-scope="bereich">Nur „' + esc(currentBereich().name) + '"</button>';
  html += '</div>';

  if (cards.length === 0) {
    html += '<div class="empty">';
    html += '<div class="empty__icon">' + ikon("fortschritt", "i-xl") + '</div>';
    html += '<div class="empty__titel">Noch nichts zu zeigen</div>';
    html += '<div class="empty__text">Sobald du Karten anlegst und bewertest, steht hier, wie du dastehst.</div>';
    html += '<div class="empty__aktionen"><button data-action="tab-verwalten">Karten anlegen</button></div>';
    html += '</div>';
    return html;
  }

  /* Der Stand: vier Bloecke, von "heute" nach "insgesamt". */
  html += fortschrittHeute(cards);
  html += fortschrittTrend();
  html += fortschrittWochen();
  html += fortschrittStoff(cards);

  /* Was eine Liste ist, wird eine Seite. Eine Zeile erscheint nur, wenn es
     dahinter auch etwas gibt - eine Zeile, die auf einen leeren Bildschirm
     fuehrt, ist schlechter als keine Zeile. */
  const leeches = verbrannteKarten();
  const lekF = lektionenVon(currentBereich());
  const tage7 = vorschau7(cards);
  const hatVorschau = !tage7.every(x => x.anzahl === 0);
  const zeigtLektionen = nurBereich && lekF.length > 0;

  if (zeigtLektionen || leeches.length > 0 || hatVorschau) {
    html += '<div class="sektion" style="margin-top:var(--stack)">';
    html += '<div class="eyebrow">Genauer ansehen</div>';
    html += '<div class="liste">';
    if (zeigtLektionen) {
      const fertig = lekF.filter(x => lektionSitzt(currentBereich(), x)).length;
      html += einstZeile({ action: "fort-seite", id: "lektionen", icon: "ordner", text: "Lektionen",
        wert: fertig + " von " + lekF.length });
    }
    if (leeches.length > 0) {
      html += einstZeile({ action: "fort-seite", id: "leeches", icon: "warnung",
        text: "Karten, die nicht klappen", wert: String(leeches.length) });
    }
    if (hatVorschau) {
      const summe = tage7.reduce((a, x) => a + x.anzahl, 0);
      html += einstZeile({ action: "fort-seite", id: "vorschau", icon: "serie",
        text: "Die nächsten 7 Tage", wert: summe + " Karten" });
    }
    html += '</div></div>';
  }

  return html;
}

/* ---------- Die Unterseiten des Fortschritts ---------- */
function renderFortschrittSeite(id) {
  const cards = statsCards();

  if (id === "lektionen") return fortschrittLektionen(true);

  if (id === "leeches") {
    const leeches = verbrannteKarten();
    let html = '<p class="hint" style="margin-bottom:var(--space-5)">Ab ' + LEECH_SCHWELLE +
      ' Rückfällen. Meist liegt es an der Karte, nicht am Gedächtnis – zu viel auf ' +
      'einmal, zu ähnlich zu einer anderen, oder die Übersetzung passt nicht ganz. ' +
      'Nimm dir erst die obersten vor.</p>';
    if (leeches.length === 0) {
      return '<div class="empty"><div class="empty__icon">' + ikon("fertig", "i-xl") + '</div>' +
        '<div class="empty__titel">Keine dabei</div>' +
        '<div class="empty__text">Gerade hängt keine Karte fest.</div></div>';
    }
    /* Nur EINE Flaeche (Satz 2). Der erste Versuch hier war
       .card.card--flush um eine .liste - das ergab zwei sichtbar
       gerundete Kaesten ineinander. Die .liste ist bereits eine Flaeche. */
    html += '<div class="liste">';
    leeches.forEach(x => {
      html += '<div class="leech-row">';
      html += '<div class="words"><div class="wort' + (istArabisch(x.card.wort) ? ' arabic" lang="ar" dir="rtl' : '') + '">' + esc(x.card.wort) + '</div>' +
        '<div class="uebersetzung">' + esc(x.card.uebersetzung) +
        (ui.statsScope === "alle" && bereiche.length > 1 ? ' · ' + esc(x.bereich.name) : '') + '</div></div>';
      html += '<span class="leech-badge">' + x.card.rueckfaelle + '×</span>';
      html += '<button class="ghost" data-action="edit-leech" data-bid="' + esc(x.bereich.id) + '" data-id="' + esc(x.card.id) + '" title="Karte umformulieren oder aufteilen" aria-label="Karte bearbeiten">' + ikon("stift", "i-sm") + '</button>';
      html += '<button class="ghost" data-action="reset-leech" data-bid="' + esc(x.bereich.id) + '" data-id="' + esc(x.card.id) + '" title="Zähler auf 0 setzen – die Karte bleibt unverändert" aria-label="Rückfallzähler zurücksetzen">' + ikon("umkehren", "i-sm") + '</button>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  }

  if (id === "vorschau") {
    const tage = vorschau7(cards);
    const maxTag = Math.max(1, ...tage.map(x => x.anzahl));
    let html = '<p class="hint" style="margin-bottom:var(--space-5)">Nur Wiederholungen – noch nie ' +
      'bewertete Karten stehen hier nicht drin, die kommen erst, wenn du sie freischaltest.</p>';
    html += '<div class="card">';
    html += '<div class="spark-reihe oben">';
    tage.forEach(x => { html += '<span>' + (x.anzahl > 0 ? x.anzahl : "") + '</span>'; });
    html += '</div>';
    html += '<div class="spark">';
    tage.forEach((x, i) => {
      const h = x.anzahl === 0 ? 2 : Math.max(4, Math.round((x.anzahl / maxTag) * 100));
      html += '<div class="spark-fill' + (x.anzahl === 0 ? " leer" : "") + (i === 0 ? " heute" : "") +
        '" style="height:' + h + '%" title="' + esc(tagKurz(x.tag) + ": " + x.anzahl + " Wiederholungen") + '"></div>';
    });
    html += '</div>';
    html += '<div class="spark-reihe unten">';
    tage.forEach(x => { html += '<span>' + esc(x.label) + '</span>'; });
    html += '</div>';
    html += '</div>';
    const spitze = tage.slice(1).reduce((a, b) => b.anzahl > a.anzahl ? b : a, tage[1]);
    if (spitze && spitze.anzahl >= 60) {
      html += '<div class="banner-info" style="margin-top:var(--space-5)">' + ikon("warnung", "i-sm") +
        '<div class="banner__text">Am ' + esc(tagKurz(spitze.tag)) + ' stehen ' + spitze.anzahl +
        ' Wiederholungen an. An dem Tag wird es voll – plan ihn ein.</div></div>';
    }
    return html;
  }

  return '<p class="hint">Diese Seite gibt es nicht.</p>';
}

/* ---------- 3.0.0: Die Buehne ----------
   Die Abfragekarte war bisher ein Kasten unter Kaesten - dieselbe Flaeche wie
   ein Hinweis, dieselbe wie das Formular. Jetzt bekommt sie den Bildschirm:
   oben eine einzeilige Leiste mit Fortschrittsstrich, in der Mitte das Wort,
   unten die Bewertung dort, wo der Daumen ohnehin liegt.

   Unveraendert bleibt alles, was daran haengt: dieselben data-action-Werte,
   dieselbe Kennung #sitzung, dieselben Klassen .study-word, .study-answer und
   .grade-row - auf die greift scrollGradeRowIntoView() zu. */
function renderSession() {
  const s = ui.session;
  const gesamt = s.total || (s.drillIds ? s.drillIds.length : 0) || 1;

  if (s.queue.length === 0) {
    let html = modeBar({ zu: "end-session", zuLabel: "Zur\u00fcck", mitte: "Fertig", anteil: 1 });
    html += '<div class="done-box">' +
      '<div class="emoji">' + ikon("fertig", "i-xl") + '</div>' +
      '<h2>Geschafft</h2>' +
      '<p class="hint">Alle ' + gesamt + ' Karten f\u00fcr heute durch.' +
      (streak.lastCompletedDate === todayStr()
        ? ' ' + streak.count + ' Tag' + (streak.count === 1 ? "" : "e") + ' am St\u00fcck.'
        : '') +
      '</p>';
    html += gemerktHinweis();
    html += '<div class="empty__aktionen" style="margin-top:var(--space-6)">';
    html += '<button data-action="end-session">Zur\u00fcck</button>';
    if (s.lastAction) {
      html += '<button class="ghost" data-action="undo-grade">' + ikon("rueckgaengig", "i-sm") +
        ' Letzte Bewertung r\u00fcckg\u00e4ngig</button>';
    }
    html += '</div></div>';
    return html;
  }

  const card = findCard(s.queue[0]);
  if (!card) {
    s.queue.shift();
    return renderSession();
  }

  const remaining = s.queue.length;
  const promptText = s.handwriting ? card.uebersetzung : card.wort;
  const promptArabic = !s.handwriting && istArabisch(promptText);
  const answerText = s.handwriting ? card.wort : card.uebersetzung;
  const answerArabic = s.handwriting && istArabisch(answerText);
  const fertig = Math.max(0, gesamt - remaining);

  let html = modeBar({
    zu: "end-session",
    zuLabel: s.isDrill ? "\u00dcbung beenden" : "Session abbrechen",
    /* 3.2.1: Stand bis hier "0 von 11" auf der ERSTEN Karte - richtig
       gezaehlt (null erledigt), aber gelesen wie "Karte 0". Video 3, Ziel-
       Gradient: eine Null als erste Zahl eines Ablaufs liest sich wie
       Stillstand. Jetzt zaehlt die Zeile die Karte, auf der man steht - das
       ist dieselbe Information, nur nie null. Der Fortschrittsstrich
       darunter bleibt unveraendert bei fertig/gesamt; er soll bei null
       anfangen, er ist ja der Balken. */
    mitte: s.isDrill
      ? "Noch " + remaining + " in dieser Runde"
      : "Karte " + Math.min(fertig + 1, gesamt) + " von " + gesamt,
    anteil: s.isDrill ? null : fertig / gesamt,
    rechts: s.lastAction
      ? '<button class="icon-btn" data-action="undo-grade" aria-label="Letzte Bewertung r\u00fcckg\u00e4ngig machen">' +
        ikon("rueckgaengig") + '</button>'
      : null
  });

  /* 3.2.2: "zugedeckt" heisst: die Antwort ist noch verborgen, hier steht
     also eine NEUE Karte. Nur dann soll das Wort einwandern (styles.css
     Abschnitt 9). Ohne diese Unterscheidung laesst sich der Fall nicht
     trennen: render() baut den Bildschirm bei jeder Handlung neu auf, eine
     Eintrittsbewegung auf .study-word liefe deshalb auch beim blossen
     Aufdecken noch einmal - das Wort haette gezuckt, obwohl es sich gar
     nicht geaendert hat. */
  html += '<div class="study-card' + (s.revealed ? '' : ' zugedeckt') + '" id="sitzung">';

  if (s.isDrill) {
    html += '<div class="drill-banner">' + ikon("ueben", "i-sm") + ' \u00dcbungsmodus \u00b7 ' +
      esc(s.drillLabel) + (s.handwriting ? ' \u00b7 Handschrift' : '') +
      ' \u2013 dein Fortschritt bleibt unber\u00fchrt</div>';
  }

  html += '<div class="study-card__mitte">';
  /* D4 (1.8.0): lang und dir sagen dem Browser, dass hier Arabisch steht.
     Er waehlt danach Schrift und Leserichtung; ohne das rutschen Satzzeichen
     in gemischtem Text auf die falsche Seite. */
  html += '<div class="study-word' + (promptArabic ? ' arabic" lang="ar" dir="rtl' : '') + '">' + esc(promptText) + '</div>';

  if (!s.revealed) {
    if (s.handwriting) html += renderHandwritingCanvas(false);
  } else {
    if (s.handwriting) html += renderHandwritingCanvas(true);
    html += '<div class="study-answer' + (answerArabic ? ' arabic" lang="ar" dir="rtl' : '') + '">' + esc(answerText) + '</div>';
    /* 2.21.3: Gerade beim Wiederholen aus "Schwierige Woerter" heraus war
       bisher nicht zu sehen, aus welcher Lektion das Wort stammt. */
    html += kartenTagsHtml(card.id, currentBereich());
    /* E6: erst NACH dem Aufdecken. Vorher waere der Hinweis ein Tipp
       ("Achtung, die kannst du nicht") und wuerde die Bewertung verfaelschen.
       Im Uebungsmodus bleibt er weg, dort zaehlt nichts. */
    if (!s.isDrill && istVerbrannt(card)) {
      html += '<div class="leech-banner">' + ikon("serie", "i-sm") + ' Diese Karte ist dir schon <strong>' +
        card.rueckfaelle + '-mal</strong> wieder entfallen. Formuliere sie im Verwalten-Tab um oder ' +
        'teile sie in zwei Karten \u2013 sonst frisst sie weiter deine Lernzeit. Sobald du Wort oder ' +
        '\u00dcbersetzung \u00e4nderst, beginnt die Z\u00e4hlung von vorn.</div>';
    }
    if (card.extra && s.extraOpen) {
      /* 2.7.0: Die Notiz steht offen da. Vorher klappte sie nach JEDER Karte
         wieder zu - bei 25 Karten also 25 Extra-Tipps fuer etwas, das man
         eigentlich immer sehen will. Wer sie knapp mag, klappt sie zu. */
      html += '<div class="study-extra">' + renderExtra(card.extra) + '</div>';
    }
  }
  html += '</div>';

  /* ---- Die Aktionszone, unten verankert ---- */
  html += '<div class="study-aktionen">';

  if (s.revealed) {
    html += '<div class="study-nebenaktionen">';
    if (card.extra) {
      html += '<button class="ghost" data-action="toggle-extra">' +
        (s.extraOpen ? "Notiz verbergen" : "Notiz anzeigen") + '</button>';
    }
    /* 2.11.0/2.21.0: "Merken" genau dort, wo einem auffaellt, dass eine Karte
       schwer ist - auch im Uebungsmodus, denn es aendert nur die
       Speicherkarte, nie Stufe oder Faelligkeit. */
    {
      const gemerkt = (currentBereich().sets || []).some(x => x.art === "eigen" && x.name === MERK_SET_NAME && x.cardIds.indexOf(card.id) !== -1);
      /* 2.21.5: justPopped einmalig lesen und sofort loeschen - sonst wuerde
         der Stern bei JEDEM Neuzeichnen erneut poppen. */
      const justPopped = ui.merkPop === card.id;
      if (justPopped) ui.merkPop = null;
      html += '<button class="ghost merk-btn" data-action="karte-merken" data-id="' + esc(card.id) + '" title="' +
        (gemerkt ? 'Wieder herausnehmen' : 'In \u201e' + esc(MERK_SET_NAME) + '\u201c ablegen, um sie sp\u00e4ter gezielt zu \u00fcben') + '">' +
        sternIcon(gemerkt, justPopped) +
        (gemerkt ? 'Gemerkt' : "Merken") + '</button>';
    }
    html += '</div>';
  }

  if (!s.revealed) {
    if (s.isDrill) {
      /* 2.16.0: Im Uebungsmodus kein Knopf mehr zum Aufdecken. Dieselbe
         Bewegung, die danach weitertraegt, deckt auch auf - Leertaste oder
         ein Tipp irgendwo. Im echten Lernen bleibt der Knopf: dort geht es
         nach dem Aufdecken mit einer ECHTEN Entscheidung weiter (Nicht /
         Fast / Sicher), und wer dafuer ohnehin zielen muss, soll nicht aus
         Versehen aufdecken. */
      html += '<p class="weiter-hinweis">Leertaste oder tippen \u2013 Antwort zeigen</p>';
    } else if (!s.handwriting) {
      /* Bei Handschrift deckt "Fertig" in der Zeichenleiste auf. */
      html += '<button class="lg full" data-action="reveal">Antwort zeigen</button>';
    }
  } else if (s.isDrill) {
    /* 2.15.0: Gar keine Knoepfe. Im Uebungsmodus aendert sich nichts am
       Fortschritt - uebrig bleibt eine einzige Bewegung, und die braucht
       keinen Knopf. Der Hinweis traegt trotzdem .grade-row: auf dieses
       Element scrollt scrollGradeRowIntoView() nach dem Aufdecken. Steht es
       nicht da (oder steht es auf display:none), bleibt der Blick haengen. */
    html += '<div class="grade-row" style="grid-template-columns:1fr">' +
      '<p class="weiter-hinweis">Leertaste oder tippen \u2013 weiter</p></div>';
  } else {
    html += '<div class="grade-row">';
    /* 3.2.1: "kommt gleich wieder" war die einzige der drei Unterzeilen, die
       am Handy auf zwei Zeilen umbrach - die drei Knoepfe standen damit
       sichtbar ungleich da. "gleich wieder" sagt dasselbe und reiht sich
       neben "morgen wieder" und "in ~N Tagen" ein. Die Vorlesefassung im
       aria-label bleibt ausfuehrlich. */
    html += '<button class="btn-unknown" data-action="grade-unknown" aria-label="Nicht gewusst \u2013 zwei Stufen zur\u00fcck, kommt gleich noch einmal">Nicht<span class="sub">gleich wieder</span></button>';
    html += '<button class="btn-almost" data-action="grade-almost" aria-label="Fast gewusst \u2013 eine Stufe zur\u00fcck, morgen wieder">Fast<span class="sub">morgen wieder</span></button>';
    html += '<button class="btn-known" data-action="grade-known" aria-label="Sicher gewusst \u2013 eine Stufe weiter">Sicher<span class="sub">in ~' + intervalForStufe(Math.min(card.stufe + 1, MAX_STUFE)) + ' Tagen</span></button>';
    html += '</div>';
  }

  html += '</div>';
  html += '</div>';
  return html;
}

/* Handschrift-Canvas: bleibt nach "Fertig" sichtbar, damit die eigene
   Zeichnung neben der aufgedeckten Lösung stehen bleibt. */
function renderHandwritingCanvas(revealed) {
  let html = '<div class="hw-canvas-wrap' + (hwFullscreen ? ' fullscreen' : '') + '">';
  html += '<canvas id="hw-canvas" width="700" height="260"></canvas>';
  html += '<div class="hw-toolbar">';
  /* D9 (1.8.0): einzelnen Strich zuruecknehmen. Vorher gab es nur "alles
     loeschen" - ein verrutschter letzter Zahn kostete das ganze Wort.
     Nach dem Aufdecken ausgeblendet: dann wird nicht mehr geschrieben,
     sondern verglichen. */
  if (!revealed && hwStrokes.length) {
    html += '<button class="secondary" data-action="hw-undo" aria-label="Letzten Strich zurücknehmen">' + ikon("rueckgaengig", "i-sm") + ' Strich zurück</button>';
  }
  html += '<button class="secondary" data-action="hw-clear" aria-label="Ganze Zeichnung löschen">' + ikon("muell", "i-sm") + ' Löschen</button>';
  html += '<button class="secondary" data-action="hw-fullscreen" aria-label="' + (hwFullscreen ? "Zeichenfläche verkleinern" : "Zeichenfläche als Vollbild") + '">' + ikon("vollbild", "i-sm") + (hwFullscreen ? " Verkleinern" : " Vollbild") + '</button>';
  if (!revealed) html += '<button data-action="reveal">Fertig</button>';
  html += '</div></div>';
  return html;
}

/* Extra-Feld: Bild-Links als Bild, http(s)-Links klickbar, Rest als Text */
function renderExtra(extra, tokens) {
  const trimmed = extra.trim();
  if (/^https?:\/\/\S+\.(png|jpe?g|gif|webp|svg)(\?\S*)?$/i.test(trimmed)) {
    return '<img src="' + esc(trimmed) + '" alt="Bild" style="max-width:100%;border-radius:8px">';
  }
  if (/^https?:\/\/\S+$/i.test(trimmed)) {
    return '<a href="' + esc(trimmed) + '" target="_blank" rel="noopener noreferrer">' + esc(trimmed) + '</a>';
  }
  /* Nur reiner Text wird markiert - in ein Bild oder einen Link duerfen
     keine Markierungen hineingeschrieben werden. */
  return markiere(extra, tokens || []);
}


/* ============================================================
   SUCHE (2.1.0)

   Die Suche verglich bisher rohen Text mit rohem Text (`includes`). Damit
   fand sie nur, was Zeichen fuer Zeichen gleich geschrieben war: mit
   Harakat getippt fand die Karte ohne Harakat nicht, "alshams" fand
   "shams" nicht, ein Buchstabe daneben fand gar nichts.

   Jetzt laeuft jeder Vergleich ueber eine Vergleichsform: Harakat und
   Tatweel raus, Alif-Varianten vereinheitlicht, deutsche Umlaute und
   Umschrift-Striche auf Grundbuchstaben. Gespeichert und angezeigt wird
   selbstverstaendlich weiterhin der Originaltext - die Vergleichsform
   existiert nur fuer die Dauer der Suche.

   Bewusst NICHT enthalten: Latein zu Arabisch ("shams" findet شمس, ohne
   dass "shams" auf der Karte steht). Das braeuchte eine Umschrifttabelle,
   und Arabisch laesst sich auf zehn Arten umschreiben - das raet mehr als
   es findet.
   ============================================================ */

/* Zeichen, die beim Vergleichen ersatzlos verschwinden: Harakat, Sukun,
   Dagger-Alif, Tatweel, Quran-Zeichen, freistehende Hamza-Striche und
   unsichtbare Steuerzeichen. */
const SUCH_WEG = /[\u064B-\u0652\u0653\u0654\u0655\u0670\u0640\u06D6-\u06ED\u200B-\u200F\u2018\u2019\u02BE\u02BF\u02BC'`\u00B4]/;

/* Zeichen, die auf eine gemeinsame Form gebracht werden. */
const SUCH_ERSATZ = {
  "\u0623": "\u0627", "\u0625": "\u0627", "\u0622": "\u0627", "\u0671": "\u0627",  // أ إ آ ٱ → ا
  "\u0624": "\u0648",                                                       // ؤ → و
  "\u0626": "\u064A", "\u0649": "\u064A",                                  // ئ ى → ي
  "\u0629": "\u0647",                                                       // ة → ه
  "\u0621": "",                                                             // ء
  "\u00DF": "ss",
  "\u00E4": "a", "\u00F6": "o", "\u00FC": "u",
  "-": " ", "\u2013": " ", "_": " "
};

/* Ein Zeichen in seine Vergleichsform. Rueckgabe kann leer sein (faellt weg)
   oder mehrere Zeichen lang (ß → ss) - deshalb fuehrt suchNorm() Buch
   darueber, welches Zeichen der Vergleichsform aus welcher Stelle des
   Originals stammt. Ohne dieses Verzeichnis liesse sich eine Fundstelle
   spaeter nicht mehr im Originaltext markieren. */
function normZeichen(ch, streng) {
  const c = ch.toLowerCase();
  /* `streng` kommt von der Duplikatpruefung: dort bleibt ى ein ى, siehe
     vergleichsWort(). Ueberall sonst gilt es als ي. */
  if (streng && c === "\u0649") return c;
  if (Object.prototype.hasOwnProperty.call(SUCH_ERSATZ, c)) return SUCH_ERSATZ[c];
  if (SUCH_WEG.test(c)) return "";
  /* NFD zerlegt zum Beispiel ā in a + Strich; der Strich faellt dann weg.
     Deckt alle Umschrift-Zeichen auf einmal ab (ā ī ū š ṣ ḥ ṭ ẓ ḍ). */
  return c.normalize("NFD").replace(/[\u0300-\u036F]/g, "");
}

function suchNorm(text, streng) {
  const s = String(text);
  let out = "";
  const map = [];                 // Stelle in der Vergleichsform → Stelle im Original
  for (let i = 0; i < s.length; i++) {
    const r = normZeichen(s[i], streng);
    for (let k = 0; k < r.length; k++) map.push(i);
    out += r;
  }
  return { text: out, map: map };
}

/* Vergleichsform eines Kartenfeldes, dazu seine einzelnen Woerter.
   Gepuffert, weil dasselbe Feld beim Tippen sehr oft gefragt wird. */
const suchPuffer = new Map();
function suchFeld(text) {
  const roh = String(text == null ? "" : text);
  let f = suchPuffer.get(roh);
  if (!f) {
    const t = suchNorm(roh).text;
    f = { text: t, woerter: t.split(/[^\p{L}\p{N}]+/u).filter(Boolean) };
    if (suchPuffer.size > 4000) suchPuffer.clear();
    suchPuffer.set(roh, f);
  }
  return f;
}

/* Der Suchtext, zerlegt in einzelne Woerter. Mehrere Woerter gelten UND:
   "sonne licht" findet die Karte, auf der beides steht - in beliebiger
   Reihenfolge und in beliebigen Feldern. */
function suchTokens(q) {
  const roh = suchNorm(q).text.split(/\s+/).filter(Boolean);
  /* Ein alleinstehender Artikel ist kein Suchwort: Wer "al-shams" tippt,
     meint shams. Nur wenn sonst nichts dasteht, bleibt er stehen - dann
     sucht jemand wirklich nach diesen zwei Buchstaben. */
  const ohne = roh.filter(t => t !== "al" && t !== "\u0627\u0644");
  return ohne.length > 0 ? ohne : roh;
}

/* Arabischer Artikel ال und seine Umschrift "al". Nur abschneiden, wenn
   danach noch mindestens drei Zeichen stehen - sonst wuerde "alle" zu "le"
   und faende jedes zweite Wort. */
function ohneArtikel(w) {
  if (w.length > 4 && (w.startsWith("\u0627\u0644") || w.startsWith("al"))) return w.slice(2);
  return w;
}

/* Wie gut passt ein Suchwort auf ein Feld? 3 = Feld faengt damit an,
   2 = ein Wort im Feld faengt damit an, 1 = steht irgendwo drin, 0 = gar
   nicht. Daraus entsteht die Reihenfolge der Treffer: Wortanfaenge zuerst. */
function tokenPunkte(t, f, ungefaehr) {
  if (!f.text || !t) return 0;
  if (f.text.startsWith(t)) return 3;
  if (f.woerter.some(w => w.startsWith(t))) return 2;
  if (f.text.includes(t)) return 1;
  /* Artikel-Toleranz, absichtlich nur am Wortanfang: "alshams" findet
     "shams" und umgekehrt, ohne dass mitten in fremden Woertern getroffen
     wird. */
  const stamm = ohneArtikel(t);
  if (stamm !== t && f.woerter.some(w => w.startsWith(stamm) || ohneArtikel(w).startsWith(stamm))) return 2;
  if (t.length >= 3 && f.woerter.some(w => ohneArtikel(w).startsWith(t))) return 2;
  if (!ungefaehr) return 0;
  const erlaubt = t.length <= 3 ? 0 : (t.length <= 6 ? 1 : 2);
  if (erlaubt === 0) return 0;
  return f.woerter.some(w => abstand(t, w, erlaubt) <= erlaubt) ? 1 : 0;
}

/* Abstand zweier Woerter: wie viele Aenderungen trennen sie? Gezaehlt werden
   Einfuegen, Loeschen, Ersetzen und - wichtig - das Vertauschen zweier
   benachbarter Zeichen. Reines Levenshtein wertet "sonen" statt "sonne" als
   zwei Fehler; das Vertauschen ist aber der haeufigste Vertipper ueberhaupt
   und soll als einer zaehlen.

   Abbruch, sobald feststeht, dass mehr als `max` Aenderungen noetig sind. */
function abstand(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let vorvorher = null;
  let vorher = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j++) vorher[j] = j;
  for (let i = 1; i <= a.length; i++) {
    const jetzt = new Array(b.length + 1);
    jetzt[0] = i;
    let bestes = i;
    for (let j = 1; j <= b.length; j++) {
      const kosten = a[i - 1] === b[j - 1] ? 0 : 1;
      let w = Math.min(jetzt[j - 1] + 1, vorher[j] + 1, vorher[j - 1] + kosten);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        w = Math.min(w, vorvorher[j - 2] + 1);
      }
      jetzt[j] = w;
      if (w < bestes) bestes = w;
    }
    if (bestes > max) return max + 1;
    vorvorher = vorher;
    vorher = jetzt;
  }
  return vorher[b.length];
}

/* Punktzahl einer ganzen Karte. Fehlt auch nur eines der Suchwoerter in
   allen drei Feldern, ist die Karte kein Treffer. */
function kartenPunkte(c, tokens, ungefaehr) {
  const felder = [suchFeld(c.wort), suchFeld(c.uebersetzung), suchFeld(c.extra)];
  let summe = 0;
  for (const t of tokens) {
    let beste = 0;
    for (const f of felder) {
      const p = tokenPunkte(t, f, ungefaehr);
      if (p > beste) beste = p;
    }
    if (beste === 0) return null;
    summe += beste;
  }
  return summe;
}

function suchLauf(quelle, tokens, ungefaehr) {
  const treffer = [];
  for (const eintrag of quelle) {
    const punkte = kartenPunkte(eintrag.card, tokens, ungefaehr);
    if (punkte === null) continue;
    treffer.push({ card: eintrag.card, bereich: eintrag.bereich, punkte: punkte });
  }
  /* sort() ist in JavaScript stabil: bei gleicher Punktzahl bleibt die
     eigene Kartenreihenfolge erhalten. */
  treffer.sort((a, b) => b.punkte - a.punkte);
  return treffer;
}

/* Fundstellen im Originaltext hervorheben. Gesucht wird in der
   Vergleichsform, markiert wird im Original - dafuer dient das Verzeichnis
   aus suchNorm(). Gibt fertiges, abgesichertes HTML zurueck. */
function markiere(text, tokens) {
  const roh = String(text == null ? "" : text);
  if (!tokens || tokens.length === 0) return esc(roh);
  const n = suchNorm(roh);
  const stellen = [];
  for (const t of tokens) {
    const varianten = [t];
    const stamm = ohneArtikel(t);
    if (stamm !== t) varianten.push(stamm);
    for (const v of varianten) {
      if (!v) continue;
      let von = n.text.indexOf(v);
      while (von !== -1) {
        stellen.push([n.map[von], n.map[von + v.length - 1] + 1]);
        von = n.text.indexOf(v, von + 1);
      }
    }
  }
  if (stellen.length === 0) return esc(roh);
  stellen.sort((a, b) => a[0] - b[0]);
  const zusammen = [];
  for (const st of stellen) {
    const letzte = zusammen[zusammen.length - 1];
    if (letzte && st[0] <= letzte[1]) letzte[1] = Math.max(letzte[1], st[1]);
    else zusammen.push([st[0], st[1]]);
  }
  let out = "", pos = 0;
  for (const [a, b] of zusammen) {
    out += esc(roh.slice(pos, a)) + "<mark>" + esc(roh.slice(a, b)) + "</mark>";
    pos = b;
  }
  return out + esc(roh.slice(pos));
}

function renderVerwalten() {
  const cards = currentCards();
  const bAkt = currentBereich();
  const gefuehrt = istGefuehrt(bAkt);
  const editing = ui.editId ? findCard(ui.editId) : null;
  let html = "";
  /* 2.3.0: In einem gefuehrten Satz gibt es kein Formular. Ein ausgegrautes
     Formular waere schlechter als keins - es sieht aus, als waere etwas
     kaputt. Stattdessen steht hier in zwei Zeilen, was Sache ist.
     2.7.0: Kein Hinweis mehr aufs Freischalten - das passiert von selbst. */
  if (gefuehrt) {
    const lekt = lektionenVon(bAkt);
    const offen = lekt.filter(x => !setGesperrt(x, bAkt)).length;
    html += '<div class="satz-banner"><strong>' + esc(bAkt.name) + '</strong> · ' +
      offen + ' von ' + lekt.length + ' Lektionen frei' +
      '<br>Die Karten stehen fest. Eigene legst du in einem eigenen Bereich an (oben „+ Bereich").</div>';
    return html + renderVerwaltenListe(cards, gefuehrt);
  }
  /* 3.3.1: Hier stand bis 3.3.0 das ganze Formular - drei Felder, eine
     Ueberschrift und ein Knopf, dauerhaft, auf dem Bildschirm, den man
     aufruft, um seine Karten ANZUSEHEN. Auf dem Handy fuellte es die erste
     Bildschirmseite komplett; von der Liste war beim Ankommen nichts zu
     sehen. Video 1 nennt genau das: ein Bildschirm macht eine Sache, und
     wer etwas anlegen will, bekommt dafuer ein Blatt. Uebrig bleibt der
     eine Knopf - die Handlung, die auf diesem Bildschirm dran ist
     (Satz 1). */
  html += '<button class="lg full" data-action="karte-neu">' +
    ikon("plus", "i-sm") + ' Karte hinzuf\u00fcgen</button>';
  html += '<div style="height:var(--stack)"></div>';
  return html + renderVerwaltenListe(cards, gefuehrt);
}

/* Der untere Teil des Verwalten-Tabs: Werkzeugleiste, Speicherkarten,
   Kartenliste. Steht seit 2.3.0 fuer sich, weil ein gefuehrter Satz oben kein
   Formular hat, hier unten aber genau dasselbe zeigt. */
function renderVerwaltenListe(cards, gefuehrt) {
  let html = '<div class="panel">';
  html += '<div class="bereich-manage-row">';
  html += '<h2 style="margin-bottom:0">Karten in „' + esc(currentBereich().name) + '" (' + cards.length + ')</h2>';
  html += '<div>';
  if (ui.selectMode) {
    /* Mitten in der Mehrfachauswahl bleibt "Fertig" an Ort und Stelle -
       ein Sprung ins Blatt waere hier eine unnoetige zweite Handlung. */
    html += '<button class="ghost" data-action="toggle-select-mode" title="Mehrfachauswahl beenden">' + ikon("schliessen", "i-sm") + ' Fertig</button>';
  } else {
    if (cards.length > 0) html += '<button class="ghost" data-action="open-drill" title="Stufen oder Speicherkarten beliebig oft üben">' + ikon("ueben", "i-sm") + ' Üben</button>';
    /* Löschen gilt fuer den Bereich selbst, nicht fuer seine Karten - deshalb
       steht der Mehr-Knopf unconditional da, genau wie "Löschen" es vorher war.
       Was genau im Blatt steht, entscheidet weiterhin jede Zeile fuer sich. */
    html += '<button class="ghost" data-action="bereich-mehr-auf" title="Weitere Handlungen für diesen Bereich" aria-label="Weitere Handlungen für diesen Bereich" aria-haspopup="dialog">' + ikon("mehr", "i-sm") + ' Mehr</button>';
  }
  html += '</div></div>';

  if (ui.drillOpen) {
    const stufen = availableStufen();
    const sets = currentSets().filter(s => !setGesperrt(s));
    /* 2.3.0: Zeichen nach Art, und gezaehlt wird, was tatsaechlich uebbar
       ist - eine Kategorie kann gesperrte Karten enthalten, die hier nicht
       mitkommen duerfen. */
    const freiDrill = freieIdsFor(currentBereich());
    html += '<div class="drill-picker" id="drill-box">';
    html += '<p class="hint" style="padding-top:0">Was üben? (Fortschritt bleibt dabei unverändert)</p>';
    /* 2.21.0: Radioknoepfe statt Dropdown - "Nach Stufen" und "Speicherkarten"
       sind jetzt zwei unterschiedlich bediente Modi (Stufenbereich vs.
       Mehrfachauswahl), das liess sich in einem einzelnen <select> nicht
       mehr sauber unterbringen. */
    if (sets.length > 0) {
      html += '<div class="wahl-reihe">';
      html += '<label class="check-row"><input type="radio" name="drill-mode" value="stufen"' +
        (ui.drillSource === "stufen" ? " checked" : "") + '><span>Nach Stufen</span></label>';
      html += '<label class="check-row"><input type="radio" name="drill-mode" value="sets"' +
        (ui.drillSource === "sets" ? " checked" : "") + '><span>Speicherkarten</span></label>';
      html += '</div>';
    }
    if (ui.drillSource === "sets" && sets.length > 0) {
      /* 2.21.0: Mehrfachauswahl statt eines einzelnen Eintrags - mehrere
         Speicherkarten zusammen ueben (z.B. "Nomen" + "Weiblich"), ohne
         eine Karte doppelt zu zaehlen, wenn sie in beiden liegt.
         2.21.2: Die Kartenzahl je Zeile ("Verben (2)", "Lektion 1–3
         Wiederholung (16)") wieder raus - bei laengeren Namen wurde die
         Zeile dadurch unnoetig breit, und dieselbe Zahl steht ohnehin schon
         bei der Speicherkarte selbst weiter unten im Verwalten-Tab, links
         vom "🔁 Üben"-Knopf. */
      html += '<div class="drill-set-liste">';
      html += sets.map(s => {
        const checked = ui.drillSetIds.has(s.id);
        return '<label style="display:flex; align-items:center; gap:6px; cursor:pointer">' +
          '<input type="checkbox" class="drill-set-check" data-id="' + esc(s.id) + '"' + (checked ? " checked" : "") + '> ' +
          iconSvg(s.art || "eigen") + ' ' + esc(s.name) + '</label>';
      }).join("");
      html += '</div>';
      const gewaehlteSets = sets.filter(s => ui.drillSetIds.has(s.id));
      const gesamtzahl = new Set(gewaehlteSets.flatMap(s => setCards(s).filter(c => freiDrill === null || freiDrill.has(c.id)).map(c => c.id))).size;
      html += '<p class="hint" style="padding:0 0 10px">' + gesamtzahl + ' Karte(n)' +
        (gewaehlteSets.length > 1 ? " insgesamt (zusammen, ohne Dopplungen)" : "") + '</p>';
    }
    if (ui.drillSource !== "sets" || sets.length === 0) {
      /* 10: Chips statt "von"/"bis"-Klapplisten - bei 2-5 Stufen sieht man
         gleich alle auf einmal (Bild 9, 72). Erster Tipp waehlt eine Stufe,
         der zweite spannt den Bereich dazwischen auf (waehleStufe()). Bis zu
         MAX_STUFE+1 Chips duerfen umbrechen, keine erzwungene Einzelzeile. */
      html += '<p class="hint" style="padding-top:0">Anfang antippen, dann Ende</p>';
      html += '<div class="stufe-chips" role="group" aria-label="Stufenbereich">';
      html += stufen.map(s => {
        const aktiv = ui.drillVon !== null && s >= ui.drillVon && s <= ui.drillBis;
        return '<button type="button" class="stufe-chip' + (aktiv ? " aktiv" : "") +
          '" data-action="stufe-chip" data-stufe="' + s + '" aria-pressed="' + (aktiv ? "true" : "false") +
          '" aria-label="Stufe ' + s + '">' + s + '</button>';
      }).join("");
      html += '</div>';
      html += '<p class="hint" style="padding:0 0 10px">' +
        (ui.drillVon === null ? "Keine Stufe verfügbar" :
         ui.drillVon === ui.drillBis ? ("Stufe " + ui.drillVon) : ("Stufe " + ui.drillVon + "–" + ui.drillBis)) + '</p>';
    }
    /* 3.0.0: Die Handschrift-Wahl steht VOR dem Start, nicht darunter. Ein
       Haken, den man erst unter dem Knopf sieht, ist einer, den man nicht
       mehr setzt. */
    html += '<label class="check-row">';
    html += '<input type="checkbox" id="drill-handwriting">';
    html += '<span>' + ikon("hand", "i-sm") + ' Handschriftlich üben (Deutsch → Arabisch)</span>';
    html += '</label>';
    html += '<div class="form-actions">';
    html += '<button data-action="start-drill">Start</button>';
    html += '<button class="secondary" data-action="close-drill">Abbrechen</button>';
    html += '</div>';
    html += '</div>';
  }

  if (ui.selectMode && ui.selectedIds.size > 0) {
    html += '<div class="select-actionbar">';
    html += '<strong>' + ui.selectedIds.size + '</strong> ausgewählt &nbsp;';
    if (kartenBearbeitbar()) html += '<button class="ghost" data-action="delete-selected">' + ikon("muell", "i-sm") + ' Löschen</button>';
    if (bereiche.length > 1 && kartenBearbeitbar()) {
      html += '<select id="move-target-select">' +
        bereiche.filter(b => b.id !== ui.bereichId).map(b => '<option value="' + esc(b.id) + '">' + esc(b.name) + '</option>').join("") +
        '</select>';
      html += '<button class="ghost" data-action="move-selected">' + ikon("verschieben", "i-sm") + ' Verschieben</button>';
    }
    const sets = currentSets().filter(s => setBearbeitbar(s));
    if (sets.length > 0) {
      /* Smart Default: die zuletzt in DIESER Sitzung benutzte Speicherkarte
         vorausgewaehlt, falls sie noch existiert und bearbeitbar ist - sonst
         bleibt "Neue Speicherkarte" die Vorauswahl, wie bisher. */
      const vorgabe = ui.zuletztSetId && sets.some(s => s.id === ui.zuletztSetId) ? ui.zuletztSetId : "__new__";
      html += '<select id="save-set-select">';
      html += '<option value="__new__"' + (vorgabe === "__new__" ? " selected" : "") + '>＋ Neue Speicherkarte</option>';
      html += sets.map(s => '<option value="' + esc(s.id) + '"' + (vorgabe === s.id ? " selected" : "") + '>' + esc(s.name) + '</option>').join("");
      html += '</select>';
      html += '<button class="ghost" data-action="save-to-set" title="Ausgewählte Karten in einer Speicherkarte ablegen">' + ikon("stern", "i-sm") + ' Speichern</button>';
    } else {
      html += '<button class="ghost" data-action="save-to-new-set" title="Ausgewählte Karten als Speicherkarte ablegen, um sie später gezielt zu üben">' + ikon("stern", "i-sm") + ' Als Speicherkarte</button>';
    }
    html += '</div>';
  }

  html += renderSetsPanel();

  /* 2.1.0: Die Kartenliste steckt in einem eigenen Kasten und wird beim
     Tippen allein neu gezeichnet - das Suchfeld selbst wird dabei nie
     angefasst. Vorher baute jeder Tastendruck die ganze Seite neu, samt
     Suchfeld: Die Handy-Tastatur haengt dann mit ihrem halbfertigen Wort an
     einem Feld, das es nicht mehr gibt, und schiebt beim naechsten Zeichen
     ihre Reste verdreht ins neue hinein - aus "sonne" wurde "snn". */
  if (cards.length === 0 && !ui.searchAll) {
    html += '<p class="hint">Noch keine Karten vorhanden.</p>';
  } else {
    html += '<div class="search-wrap">' + ikon("suche", "i-such");
    html += '<input type="text" id="f-search" placeholder="Wort, Übersetzung oder Notiz…" value="' + esc(ui.searchQuery) + '"' +
      ' autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false">';
    html += '<button class="search-clear" id="f-search-clear" data-action="search-clear" aria-label="Suche leeren"' +
      (ui.searchQuery ? '' : ' hidden') + '>' + ikon("schliessen", "i-sm") + '</button>';
    html += '</div>';
    if (bereiche.length > 1) {
      html += '<div class="seg-row" style="margin:0 0 14px">';
      html += '<span class="seg" role="group" aria-label="Suchbereich">';
      html += '<button class="' + (ui.searchAll ? "" : "active") + '" data-action="search-scope" data-scope="eins" aria-pressed="' + (ui.searchAll ? "false" : "true") + '">nur dieser Bereich</button>';
      html += '<button class="' + (ui.searchAll ? "active" : "") + '" data-action="search-scope" data-scope="alle" aria-pressed="' + (ui.searchAll ? "true" : "false") + '">alle Bereiche</button>';
      html += '</span></div>';
    }
    html += '<div id="karten-liste">' + kartenListeInhalt() + '</div>';
  }
  html += '</div>';
  return html;
}

/* Inhalt des Kastens #karten-liste: filtern, sortieren, blaettern, Zeilen
   bauen. Steht bewusst fuer sich, damit ein Tastendruck in der Suche genau
   diesen Teil erneuern kann und sonst nichts. */
function kartenListeInhalt() {
  const cards = currentCards();
  const tokens = suchTokens(ui.searchQuery);
  const eigenerId = currentBereich().id;
  /* D7 (1.8.0): Suche wahlweise ueber alle Bereiche. Treffer aus einem
     FREMDEN Bereich bekommen den Bereichsnamen als Plakette und nur den
     ✏️-Knopf: Loeschen und Ankreuzen arbeiten auf currentCards() und wuerden
     bei einer fremden Karte die falsche treffen. Der ✏️-Knopf wechselt
     vorher den Bereich. */
  const fremdeBereiche = new Map();   // Karten-ID → Bereich, nur bei Treffern von anderswo
  let html = "";
  let shownCards;
  let ungefaehr = false;

  if (tokens.length === 0) {
    shownCards = cards;
  } else {
    const quelle = [];
    if (ui.searchAll) {
      for (const b of bereiche) for (const c of b.karten) quelle.push({ card: c, bereich: b });
    } else {
      for (const c of cards) quelle.push({ card: c, bereich: null });
    }
    let treffer = suchLauf(quelle, tokens, false);
    /* Erst wenn es gar nichts Genaues gibt, wird ein Buchstabe Abweichung
       erlaubt. Immer an hiesse: drei getippte Zeichen passen auf fast alles,
       und man sucht in den Suchergebnissen weiter. */
    if (treffer.length === 0) {
      treffer = suchLauf(quelle, tokens, true);
      ungefaehr = treffer.length > 0;
    }
    shownCards = treffer.map(t => t.card);
    for (const t of treffer) {
      if (t.bereich && t.bereich.id !== eigenerId) fremdeBereiche.set(t.card.id, t.bereich);
    }
  }

  if (shownCards.length === 0) {
    /* Zwei verschiedene Leerzustaende, nicht einer: "nichts gefunden" und
       "noch nichts da" verlangen verschiedene naechste Schritte. */
    html += '<div class="empty">';
    if (tokens.length) {
      html += '<div class="empty__icon">' + ikon("suche", "i-xl") + '</div>';
      html += '<div class="empty__titel">Keine Treffer</div>';
      html += '<p class="empty__text">Nichts passt zu \u201e' + esc(ui.searchQuery) + '\u201c.' +
        (ui.searchAll ? '' : ' Vielleicht liegt das Wort in einem anderen Bereich.') + '</p>';
      html += '<div class="empty__aktionen"><button class="secondary" data-action="search-clear">Suche leeren</button>';
      if (!ui.searchAll && bereiche.length > 1) {
        html += '<button class="ghost" data-action="search-scope" data-scope="alle">In allen Bereichen suchen</button>';
      }
      html += '</div>';
    } else {
      html += '<div class="empty__icon">' + ikon("karten", "i-xl") + '</div>';
      html += '<div class="empty__titel">Noch keine Karten</div>';
      /* 3.3.1: Stand "Leg OBEN deine erste Karte an" - das stimmte, solange
         das Formular oben auf der Seite klebte. Jetzt steht die Handlung
         hier, wo der leere Zustand sie ohnehin braucht (Video 1: ein leerer
         Bildschirm zeigt auf die eine Handlung, statt sie zu beschreiben). */
      html += '<p class="empty__text">Fang mit einer eigenen Karte an \u2013 oder spiel einen ' +
        'fertigen Kartensatz ein.</p>';
      html += '<div class="empty__aktionen">';
      html += '<button data-action="karte-neu">' + ikon("plus", "i-sm") + ' Erste Karte anlegen</button>';
      html += '<button class="secondary" data-action="import-trigger">' +
        ikon("einspielen", "i-sm") + ' Kartensatz einspielen</button>';
      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  if (tokens.length) {
    html += '<p class="hint" style="margin-bottom:10px">' +
      (ungefaehr ? 'Keine genauen Treffer – ähnlich geschrieben: ' : '') +
      shownCards.length + (shownCards.length === 1 ? ' Karte' : ' Karten') + '</p>';
  }

  const bAkt = currentBereich();
  const freiIds = freieIdsFor(bAkt);
  const bearbeitbar = kartenBearbeitbar(bAkt);
  const draggable = tokens.length === 0 && !ui.selectMode && bearbeitbar;
  /* C2: Seiten erst ab SEITEN_SCHWELLE. Darunter ist shownCards die ganze
     Liste und es erscheint keine Seitenleiste. */
  const seiten = shownCards.length > SEITEN_SCHWELLE ? Math.ceil(shownCards.length / SEITE_GROESSE) : 1;
  if (ui.kartenSeite > seiten - 1) ui.kartenSeite = seiten - 1;
  if (ui.kartenSeite < 0) ui.kartenSeite = 0;
  const start = seiten > 1 ? ui.kartenSeite * SEITE_GROESSE : 0;
  const seitenKarten = seiten > 1 ? shownCards.slice(start, start + SEITE_GROESSE) : shownCards;
  /* Beim Ziehen wird nur die sichtbare Seite umsortiert. endDrag() muss
     wissen, an welcher Stelle der Gesamtliste dieser Ausschnitt sitzt -
     sonst wuerde es die Reihenfolge der uebrigen Seiten ueberschreiben.
     Ziehen ist ohnehin nur ohne Suche moeglich, deshalb entspricht der
     Ausschnitt dann genau currentCards().slice(start, ...). */
  listenFenster = { start: start, anzahl: seitenKarten.length };
  if (!bearbeitbar && tokens.length === 0) html += '<p class="hint" style="margin-bottom:10px">' + ikon("schloss", "i-sm") + ' Geführter Kartensatz – die Karten und ihre Reihenfolge stehen fest. Hervorgehoben ist, was freigeschaltet ist.</p>';
  /* 3.3.1: Stand als drei Zeilen Anleitung dauerhaft ueber der Liste -
     dieselbe Sorte Erklaerungswand, die der Betreiber in den Einstellungen
     gemeldet hat. Der Griff ist sichtbar, das Ziehen erklaert sich beim
     ersten Versuch; die Tastatur-Fassung steht ohnehin im aria-label jedes
     Griffs, wo sie hingehoert. Uebrig bleibt eine Zeile - und der Satz zur
     Seitengrenze nur dann, wenn es ueberhaupt mehrere Seiten gibt, denn nur
     dann kann man in die Grenze laufen. */
  if (draggable) html += '<p class="hint" style="margin-bottom:10px">Am Griff ziehen ändert die Reihenfolge.' +
    (seiten > 1 ? ' Über die Seitengrenze hinaus geht das nicht – dafür „Verschieben“ im Auswahlmodus.' : '') + '</p>';
  if (seiten > 1) html += seitenLeiste(ui.kartenSeite, seiten, shownCards.length);
  for (let i = 0; i < seitenKarten.length; i++) {
    const c = seitenKarten[i];
    const fremd = fremdeBereiche.get(c.id) || null;
    /* Bei Treffern aus einem anderen Bereich gilt dessen Freigabe, nicht die
       des offenen - sonst stuende eine fremde Karte faelschlich als gesperrt
       da. */
    const freiHier = fremd ? freieIdsFor(fremd) : freiIds;
    const kartenZu = freiHier !== null && !freiHier.has(c.id);
    const hervor = freiHier !== null && !kartenZu;
    const zeilenKlasse = "card-row" + (kartenZu ? " card-locked" : "") + (hervor ? " card-frei" : "");
    if (ui.selectMode && !fremd && !kartenZu) {
      const checked = ui.selectedIds.has(c.id);
      html += '<div class="' + zeilenKlasse + '" data-action="toggle-card-select" data-id="' + esc(c.id) + '" style="cursor:pointer">';
      /* pointer-events:none nimmt der Checkbox nur den Klick per Maus (der
         landet auf der Zeile) - per Tastatur bleibt sie erreichbar, und
         Leertaste loest denselben Klick aus, der bis zur Zeile hochblubbert.
         aria-label macht das Feld auch ohne sichtbaren Text verstaendlich. */
      html += '<input type="checkbox" style="pointer-events:none" aria-label="' + esc(c.wort) + ' auswählen" ' + (checked ? "checked" : "") + '>';
    } else {
      /* 16.09.2026 (Beobachtung 1): Tippen auf die Zeile oeffnet die
         Detailansicht - reicht die einzeilige Vorschau nicht (lange Notiz),
         muss man nicht erst "Bearbeiten" oeffnen, um mehr zu sehen. Nur fuer
         Karten im offenen Bereich (findCard() findet sonst nichts); Ziehgriff,
         Bearbeiten- und Loeschen-Knopf liegen als eigene data-action-Elemente
         DARIN und haben Vorrang (closest() findet das naechste zuerst). */
      html += '<div class="' + zeilenKlasse + '"' + (draggable ? ' data-cardid="' + esc(c.id) + '"' : '') +
        (!fremd ? ' data-action="card-detail" data-id="' + esc(c.id) + '" style="cursor:pointer"' : '') + '>';
      if (draggable) html += '<span class="drag-handle" tabindex="0" role="button" title="Ziehen zum Sortieren, oder mit den Pfeiltasten" aria-label="' + esc(c.wort) + ' verschieben – Pfeiltasten nach oben oder unten, Position ' + (start + i + 1) + ' von ' + shownCards.length + '">' + ikon("griff", "i-sm") + '</span>';
      else if (ui.selectMode && kartenZu) html += '<span class="lock-anzeige" title="Gesperrt – lässt sich nicht auswählen" aria-hidden="true">' + ikon("schloss", "i-sm") + '</span>';
    }
    html += '<div class="words">';
    html += '<div class="wort' + (istArabisch(c.wort) ? ' arabic" lang="ar" dir="rtl' : '') + '">' + markiere(c.wort, tokens) + '</div>';
    html += '<div class="uebersetzung">' + markiere(c.uebersetzung, tokens) + '</div>';
    if (c.extra) html += '<div class="extra-note">' + renderExtra(c.extra, tokens) + '</div>';
    html += kartenTagsHtml(c.id, fremd || bAkt);
    html += '</div>';
    if (fremd) html += '<span class="badge" title="Diese Karte liegt in einem anderen Bereich">' + esc(fremd.name) + '</span>';
    if (kartenZu && !ui.selectMode) html += '<span class="badge" title="Noch in keiner freigeschalteten Lektion">' + ikon("schloss", "i-sm") + ' </span>';
    html += zustandBadge(c);
    /* E6: In der Liste sichtbar machen, damit beim Durchsehen sofort
       auffaellt, welche Karte umformuliert gehoert. */
    if (istVerbrannt(c)) html += '<span class="leech-badge" title="' + c.rueckfaelle + '-mal wieder vergessen – umformulieren oder aufteilen">' + ikon("serie", "i-sm") + ' ' + c.rueckfaelle + '×</span>';
    if (fremd) {
      html += '<button class="ghost" data-action="edit-card-in-bereich" data-bereich="' + esc(fremd.id) + '" data-id="' + esc(c.id) +
        '" title="In „' + esc(fremd.name) + '" öffnen" aria-label="Karte im Bereich ' + esc(fremd.name) + ' bearbeiten">' + ikon("stift", "i-sm") + '</button>';
    } else if (!ui.selectMode && bearbeitbar) {
      html += '<button class="ghost" data-action="edit-card" data-id="' + esc(c.id) + '" title="Bearbeiten" aria-label="Karte bearbeiten">' + ikon("stift", "i-sm") + '</button>';
      html += '<button class="ghost" data-action="delete-card" data-id="' + esc(c.id) + '" title="Löschen" aria-label="Karte löschen">' + ikon("muell", "i-sm") + '</button>';
    }
    html += '</div>';
  }
  /* Zweite Leiste unten: nach 100 Zeilen ist die obere aus dem Bild. */
  if (seiten > 1) html += seitenLeiste(ui.kartenSeite, seiten, shownCards.length);
  return html;
}

/* Nur die Liste erneuern, ohne das Suchfeld anzufassen. */
function zeichneKartenListe() {
  const kasten = document.getElementById("karten-liste");
  if (!kasten) { render(); return; }
  kasten.innerHTML = kartenListeInhalt();
}

/* C2: Blaettern zwischen den Seiten der Kartenliste. */
function seitenLeiste(seite, seiten, gesamt) {
  let h = '<div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin:12px 0">';
  h += '<button class="ghost" data-action="seite-zurueck"' + (seite === 0 ? ' disabled' : '') + ' aria-label="Vorherige Seite">‹ Zurück</button>';
  h += '<span class="hint" style="padding:0">Seite ' + (seite + 1) + ' von ' + seiten + ' · ' + gesamt + ' Karten</span>';
  h += '<button class="ghost" data-action="seite-vor"' + (seite === seiten - 1 ? ' disabled' : '') + ' aria-label="Nächste Seite">Weiter ›</button>';
  h += '</div>';
  return h;
}

/* Liste der Speicherkarten. Wird nur gezeigt, wenn es welche gibt – solange
   keine existiert, bleibt der Verwalten-Tab unverändert schlicht.

   2.3.0: Die Liste ist nach Art gruppiert (Kategorien, Lektionen, Eigene).
   Die Gruppen sind keine Ordner: Gezogen wird weiterhin per ⠿-Griff, aber nur
   innerhalb der eigenen Gruppe - die Art wechselt man ueber das Auswahlfeld
   in der Zeile, nicht durch Ziehen. */
function renderSetsPanel() {
  const b = currentBereich();
  const sets = currentSets();
  if (sets.length === 0) return "";
  const frei = freieIdsFor(b);
  const gefuehrt = istGefuehrt(b);
  const gruppen = zeigtGruppen(b);
  const zuAnzahl = gefuehrt ? sets.filter(s => setGesperrt(s, b)).length : 0;
  let html = '<div class="drill-picker" style="margin-bottom:14px">';
  /* 2.2.0: Kopfzeile zum Auf- und Zuklappen. Zu ist der Normalzustand. */
  html += '<button class="secondary sets-kopf" data-action="toggle-sets" aria-expanded="' + (ui.setsOffen ? "true" : "false") + '">';
  html += ikon(ui.setsOffen ? "chevronUnten" : "chevronRechts", "i-sm") + '<span>Speicherkarten</span>';
  html += '<span class="badge">' + sets.length + '</span>';
  if (zuAnzahl > 0) html += '<span class="badge" title="' + zuAnzahl + ' Lektion(en) noch gesperrt">' + ikon("schloss", "i-sm") + ' ' + zuAnzahl + '</span>';
  html += '</button>';
  if (!ui.setsOffen) { html += '</div>'; return html; }
  if (istAutor() && !gefuehrt) {
    html += '<button class="tiny-link" data-action="toggle-set-art" style="padding:6px 0">' +
      (ui.setsArtWahl ? "Arten fertig" : "Arten vergeben") + '</button>';
  }

  if (!gruppen) {
    /* Der Normalfall: eine schlichte Liste, wie vor 2.3.0. */
    html += '<p class="hint" style="padding:6px 0">Feste Auswahl an Vokabeln, jederzeit beliebig oft übbar. Reihenfolge per Griff ändern, auch mit den Pfeiltasten.</p>';
    html += '<div class="set-liste" data-gruppe="alle">';
    sets.forEach((s, i) => { html += setBlock(s, b, frei, gefuehrt, i + 1, sets.length); });
    html += '</div></div>';
    return html;
  }
  for (const art of SET_ARTEN_ANZEIGE) {
    const gruppe = sets.filter(s => (s.art || "eigen") === art);
    if (gruppe.length === 0) continue;
    html += '<div class="set-gruppe">';
    html += '<div class="set-gruppe-kopf">' + iconSvg(art) + ' ' + SET_ART_TITEL[art] +
      '<span class="badge">' + gruppe.length + '</span></div>';
    html += '<p class="hint" style="padding:4px 0 2px; font-size:0.84rem">' + SET_ART_ERKLAERUNG[art] + '</p>';
    html += '<div class="set-liste" data-gruppe="' + art + '">';
    gruppe.forEach((s, i) => { html += setBlock(s, b, frei, gefuehrt, i + 1, gruppe.length); });
    html += '</div></div>';
  }
  html += '</div>';
  return html;
}

/* Eine einzelne Speicherkarte samt (optional) aufgeklappter Kartenliste. */
function setBlock(s, b, frei, gefuehrt, pos, gesamt) {
  /* Ein Schloss wirkt nur in einem gefuehrten Satz. In einem eigenen Bereich
     wird es deshalb weder gezeigt noch beachtet. */
  const zu = setGesperrt(s, b);
  const cards = setCards(s);
  const open = ui.openSetId === s.id && !zu;
  const eigenerBesitz = setBearbeitbar(s, b);
  let html = '<div class="set-block' + (zu ? " set-locked" : "") + '" id="set-' + esc(s.id) + '" data-setid="' + esc(s.id) + '">';
  html += '<div class="set-row">';
  if (eigenerBesitz) html += '<span class="drag-handle" tabindex="0" role="button" title="Ziehen zum Sortieren, oder mit den Pfeiltasten" aria-label="' + esc(s.name) + ' verschieben – Pfeiltasten nach oben oder unten, Position ' + pos + ' von ' + gesamt + '">' + ikon("griff", "i-sm") + '</span>';
  /* 2.7.0: Nur noch Anzeige. Freigeschaltet wird durch Lernen, nicht durch
     Tippen - es gibt hier nichts zu entscheiden. */
  if (gefuehrt && s.art === "lektion") {
    html += '<span class="lock-anzeige" title="' +
      (zu ? 'Wird frei, sobald die Lektion davor sitzt' : 'Freigeschaltet') + '">' + ikon("schloss", "i-sm") + '</span>';
  }
  /* Beobachtung 7: derselbe Fund wie bei kartenTagsHtml() - ein arabisch
     benannter Kategorie-/Lektionsname lief hier bisher ohne eigene Schrift/
     Richtung mit. Klasse muss mit "set-name" zusammen in einem class-Attribut
     stehen, deshalb hier die im Repo uebliche Ternary-Form statt schriftAttr(). */
  html += '<span class="set-name' + (istArabisch(s.name) ? ' arabic" lang="ar" dir="rtl' : '') + '">' + esc(s.name) + '</span>';
  html += '<span class="badge">' + cards.length + ' Karte' + (cards.length === 1 ? "" : "n") + '</span>';
  /* 2.11.0: In einem gefuehrten Satz stehen an einer LEKTION keine Knoepfe
     mehr. Vorher stand dieselbe Lektion an zwei Orten und wollte an beiden
     etwas: der Lernen-Tab fuehrte einen hindurch, und hier lag nochmal ein
     eigener Weg daneben. Man wusste nicht, welcher der richtige ist.
     Jetzt gilt: gelernt wird im Lernen-Tab, hier wird nachgeschaut. */
  const nurAnzeige = gefuehrt && s.art === "lektion";
  if (zu) {
    html += '<span class="badge">gesperrt</span>';
  } else if (nurAnzeige) {
    const fest = cards.filter(c => (c.maxStufe || 0) >= LEKTION_STUFE || istVerbrannt(c)).length;
    html += '<span class="badge">' + fest + ' / ' + cards.length + ' sitzen</span>';
    html += '<button class="ghost" data-action="toggle-set-open" data-id="' + esc(s.id) + '" aria-label="Karten anzeigen" aria-expanded="' + (open ? "true" : "false") + '">' + ikon(open ? "chevronUnten" : "chevronRechts", "i-sm") + '</button>';
  } else {
    if (cards.length > 0) html += '<button class="ghost" data-action="drill-set" data-id="' + esc(s.id) + '" title="Diese Auswahl üben">' + ikon("ueben", "i-sm") + ' Üben</button>';
    html += '<button class="ghost" data-action="toggle-set-open" data-id="' + esc(s.id) + '" title="Karten anzeigen" aria-label="' + (open ? "Karten dieser Speicherkarte verbergen" : "Karten dieser Speicherkarte anzeigen") + '" aria-expanded="' + (open ? "true" : "false") + '">' + ikon(open ? "chevronUnten" : "chevronRechts", "i-sm") + '</button>';
  }
  if (zeigtArtWahl(b)) {
    /* 10: Blatt statt Klappliste - drei Chips in jeder Zeile machten die
       Liste voll (Satz "weniger Inhalt am Handy"), also nur ein Knopf mit
       der aktuellen Art, der das Auswahl-Blatt oeffnet (wie bei Helligkeit). */
    const art = s.art || "eigen";
    html += '<button class="ghost" data-action="set-art-sheet-auf" data-id="' + esc(s.id) +
      '" title="Art dieser Speicherkarte" aria-label="Art dieser Speicherkarte: ' + esc(SET_ART_TITEL[art]) + '">' +
      ikon(art === "eigen" ? "stern" : art, "i-sm") + ' ' + esc(SET_ART_TITEL[art]) + '</button>';
  }
  if (eigenerBesitz) {
    html += '<button class="ghost" data-action="rename-set" data-id="' + esc(s.id) + '" title="Umbenennen" aria-label="Speicherkarte umbenennen">' + ikon("stift", "i-sm") + '</button>';
    html += '<button class="ghost" data-action="delete-set" data-id="' + esc(s.id) + '" title="Speicherkarte löschen (Vokabeln bleiben erhalten)" aria-label="Speicherkarte löschen">' + ikon("muell", "i-sm") + '</button>';
  }
  html += '</div>';
  if (open) {
    html += '<div class="set-cards">';
    if (cards.length === 0) {
      html += '<p class="hint">Keine Karten mehr in dieser Speicherkarte.</p>';
    } else {
      if (eigenerBesitz && cards.length > 1) html += '<p class="hint" style="padding:6px 0">Ziehe am Griff, um die Reihenfolge in dieser Speicherkarte zu ändern, oder nutze am Griff die Pfeiltasten. Die Reihenfolge im Bereich bleibt unberührt.</p>';
      cards.forEach((c, ci) => {
        /* In einer Lektion sind ohnehin alle Karten gleich dran - dort waere
           eine Hervorhebung nur Unruhe. In den Kategorien steht dagegen alles
           gemischt, und genau dort ist die Frage "was darf ich schon?" echt. */
        const kartenZu = frei !== null && !frei.has(c.id);
        const hervor = frei !== null && !kartenZu && s.art !== "lektion";
        html += '<div class="card-row' + (kartenZu ? " card-locked" : "") + (hervor ? " card-frei" : "") + '"' +
          (eigenerBesitz ? ' data-cardid="' + esc(c.id) + '"' : '') + '>';
        /* 2.6.0: Griff zum Sortieren INNERHALB dieser Speicherkarte. Er
           veraendert nur cardIds, nie die Reihenfolge des Bereichs. */
        if (eigenerBesitz) html += '<span class="drag-handle" tabindex="0" role="button" title="Ziehen zum Sortieren, oder mit den Pfeiltasten" aria-label="' + esc(c.wort) + ' verschieben – Pfeiltasten nach oben oder unten, Position ' + (ci + 1) + ' von ' + cards.length + '">' + ikon("griff", "i-sm") + '</span>';
        html += '<div class="words"><div class="wort' + (istArabisch(c.wort) ? ' arabic" lang="ar" dir="rtl' : '') + '">' + esc(c.wort) + '</div>';
        html += '<div class="uebersetzung">' + esc(c.uebersetzung) + '</div>' + kartenTagsHtml(c.id, b, s.id) + '</div>';
        if (kartenZu) html += '<span class="badge" title="Noch in keiner freigeschalteten Lektion">' + ikon("schloss", "i-sm") + '</span>';
        html += zustandBadge(c);
        if (eigenerBesitz) html += '<button class="ghost" data-action="remove-from-set" data-set="' + esc(s.id) + '" data-id="' + esc(c.id) + '" title="Aus dieser Speicherkarte entfernen (Karte bleibt im Bereich)" aria-label="Aus dieser Speicherkarte entfernen">' + ikon("schliessen", "i-sm") + '</button>';
        html += '</div>';
      });
    }
    html += '</div>';
  }
  html += '</div>';
  return html;
}

/* ---------- Karten sortieren: per Zeigegerät (Maus UND Touch) ---------- */
let dragState = null;
let autoScrollRAF = null;
/* 16.09.2026: Der Doppeltipp (v3.0.35-40) blieb auf echten Geraeten
   unzuverlaessig - zwei Antipper auf denselben 28px breiten Griff, innerhalb
   eines engen Zeitfensters, sind fuer einen Finger zu praezise ("funktioniert
   selten gut, mal scrollt, mal wird trotzdem was markiert"). Jetzt
   Long-Press statt Doppeltipp: den Griff kurz halten, OHNE zu wischen,
   aktiviert das Ziehen - eine einzige, durchgehende Beruehrung statt zwei
   getrennter.

   Zweiter Fund, noch am selben Tag: Mit touch-action "manipulation" (wie
   zuvor) darf der Browser das Scrollen fuer diese Beruehrung schon auf
   seinem eigenen Compositor-Thread beginnen, SOBALD sich der Finger bewegt -
   unabhaengig davon, was JS spaeter entscheidet (genau dafuer ist
   touch-action da: fluessiges Scrollen ohne auf das Hauptthread-JS warten zu
   muessen). setPointerCapture() beim Aktivieren des Ziehens kommt dagegen zu
   spaet - ein einmal beguennstigtes natives Scrollen laesst sich damit nicht
   zuverlaessig zurueckholen. Ergebnis: Griff und Seite bewegten sich beim
   Ziehen gleichzeitig ("beim Verschieben scrollt es").

   Deshalb jetzt touch-action wieder "none" auf .drag-handle - das
   unterbindet natives Scrollen fuer JEDE Beruehrung, die auf dem Griff
   beginnt, von Anfang an und endgueltig (kein Compositor-Scroll, das man
   spaeter zurueckerobern muesste). Damit eine Beruehrung, die eigentlich nur
   ueber den Griff hinwegwischen wollte, trotzdem normal scrollt, holt
   scrollUebernahme das entgangene native Scrollen manuell per
   window.scrollBy() nach, sobald HOLD_TOLERANZ ueberschritten ist - siehe
   pointermove-Handler unten. Das eigene Rand-Scrollen waehrend eines aktiven
   Zugs (autoScrollTick oben) blieb davon unberuehrt; es war schon immer rein
   JS-gesteuert, nie nativ. */
let holdTimer = null;
let holdKandidat = null; // { handle, row, art, inSet, pointerId, startX, startY }
let scrollUebernahme = null; // { pointerId, lastY } - manuelles Scrollen, siehe Kommentar oben
const HOLD_DAUER = 350;     // ms bis Halten das Ziehen aktiviert
const HOLD_TOLERANZ = 10;   // px Bewegung, die einen Halte-Versuch als Scrollen erkennt und abbricht

function updateDragPosition(y) {
  if (!dragState) return;
  const row = dragState.row;
  const parent = row.parentNode;
  if (!parent) return;
  const siblings = [...parent.querySelectorAll(dragState.selektor)].filter(r => r !== row);
  let target = null;
  for (const sib of siblings) {
    const rect = sib.getBoundingClientRect();
    if (y < rect.top + rect.height / 2) { target = sib; break; }
  }
  if (target) parent.insertBefore(row, target);
  else parent.appendChild(row);
}

function autoScrollTick() {
  if (!dragState) { autoScrollRAF = null; return; }
  const margin = 70;   // Bereich am Bildschirmrand, der das Scrollen auslöst
  const maxSpeed = 16; // Pixel pro Frame, ganz am Rand
  const y = dragState.clientY;
  const vh = window.innerHeight;
  let dy = 0;
  if (y < margin) {
    dy = -maxSpeed * Math.min(1, Math.max(0, (margin - y) / margin));
  } else if (y > vh - margin) {
    dy = maxSpeed * Math.min(1, Math.max(0, (y - (vh - margin)) / margin));
  }
  if (dy !== 0) {
    window.scrollBy(0, dy);
    updateDragPosition(y);
  }
  autoScrollRAF = requestAnimationFrame(autoScrollTick);
}

/* 2.3.0: Die Art-Auswahl steht in jeder Speicherkarten-Zeile. Ein einziger
   delegierter Listener statt eines je Zeile - sonst muesste nach jedem
   Neuzeichnen alles neu verdrahtet werden. */
/* 2.15.0: Auf dem Handy gibt es keine Leertaste - dort traegt ein Tipp
   irgendwo auf die Karte. Ausgenommen ist alles, was selbst etwas tut:
   Knoepfe, Eingabefelder, das Zeichenfeld der Handschrift.
   2.21.1: "irgendwo" galt bisher nur INNERHALB von .study-card - auf dem
   Handy ist die Karte aber oft nicht bildschirmfuellend, darunter blieb ein
   leerer Streifen, in dem ein Tipp wirkungslos war. Waehrend einer
   Uebungsrunde zeigt der Bildschirm ohnehin nur die Karte (Kopfzeile und
   Tabs sind ausgeblendet, siehe imModus), darum darf der ganze
   Anwendungsbereich zaehlen, nicht nur das Kartenpanel selbst.
   2.21.6: Trotzdem blieb ein Streifen wirkungslos - #app (= .container) hat
   selbst KEINE feste Hoehe, es ist nur so hoch wie sein Inhalt. Auf einem
   hohen Handy-Bildschirm mit kurzem Karteninhalt bleibt darunter ein
   Streifen nacktes <body> uebrig, der gar nicht mehr zu #app gehoert - ein
   Tipp dort erreicht diesen Listener also nie, ganz gleich wie weit
   gefasst er innerhalb von #app ist. <body> traegt dagegen immer die volle
   Bildschirmhoehe (min-height:100vh/100dvh), deshalb haengt der Listener
   jetzt dort statt an #app - das schliesst die Luecke endgueltig. */
document.body.addEventListener("click", e => {
  const s = ui.session;
  if (!s || !s.isDrill || s.queue.length === 0) return;
  /* Handschrift: dort deckt "Fertig" auf. Ein Tipp neben das Zeichenfeld
     waere sonst genau der Fehlgriff, der die Loesung verraet, bevor man sie
     geschrieben hat. */
  if (s.handwriting && !s.revealed) return;
  if (e.target.closest("button, a, input, select, textarea, canvas, .hw-toolbar, .modebar")) return;
  if (!s.revealed) revealAnswer();
  else gradeCard("weiter");
});

/* Gemeinsamer Aktivierungspunkt fuer Maus (sofort) und Touch/Stift (nach
   dem Halten) - haelt dragState-Aufbau, setPointerCapture und Rand-Scrollen
   an einer Stelle, statt sie zweimal zu pflegen. */
function starteZiehen(handle, row, art, inSet, pointerId, clientY) {
  dragState = { pointerId: pointerId, row: row, art: art,
                selektor: art === "set" ? ".set-block" : ".card-row",
                setid: inSet && inSet.closest(".set-block") ? inSet.closest(".set-block").dataset.setid : null,
                cardid: row.dataset.cardid, clientY: clientY };
  handle.setPointerCapture(pointerId);
  row.classList.add("dragging");
  if (!autoScrollRAF) autoScrollRAF = requestAnimationFrame(autoScrollTick);
}

function holdAbbrechen() {
  clearTimeout(holdTimer);
  holdTimer = null;
  if (holdKandidat) holdKandidat.handle.classList.remove("griff-haelt");
  holdKandidat = null;
}

app.addEventListener("pointerdown", e => {
  const handle = e.target.closest(".drag-handle");
  if (!handle) return;
  /* 2.2.0: Derselbe Griff zieht jetzt zweierlei - eine Karte in der Liste
     oder eine Speicherkarte im Feld darueber. Welches von beidem, entscheidet
     sich hier einmal und steht danach in dragState.art. */
  /* 2.6.0: Erst .card-row pruefen, dann .set-block - und nicht umgekehrt.
     Eine Kartenzeile in einer aufgeklappten Speicherkarte liegt INNERHALB
     eines .set-block; wer zuerst nach .set-block sucht, findet den Kasten
     drumherum und zieht die ganze Speicherkarte statt der Karte. */
  const row = handle.closest(".card-row") || handle.closest(".set-block");
  if (!row) return;
  const art = row.classList.contains("card-row") ? "karte" : "set";
  /* Liegt die Kartenzeile in einer Speicherkarte, wird deren eigene
     Reihenfolge geaendert, nicht die des Bereichs. */
  const inSet = art === "karte" ? row.closest(".set-cards") : null;

  if (e.pointerType === "mouse") {
    /* Maus hat kein Scroll-Konflikt (man scrollt mit dem Rad, nicht durch
       Klicken auf den Griff) - ein Klick zieht deshalb weiterhin sofort. */
    e.preventDefault();
    starteZiehen(handle, row, art, inSet, e.pointerId, e.clientY);
    return;
  }

  /* Touch/Stift: siehe Kommentar bei HOLD_DAUER weiter oben. Bewusst KEIN
     preventDefault() hier - solange offen ist, ob das ein Scrollversuch
     oder ein Halten wird, soll der Browser frei entscheiden koennen. */
  holdAbbrechen();
  holdKandidat = { handle: handle, row: row, art: art, inSet: inSet,
                    pointerId: e.pointerId, startX: e.clientX, startY: e.clientY,
                    lastY: e.clientY };
  handle.classList.add("griff-haelt");
  holdTimer = setTimeout(() => {
    const k = holdKandidat;
    if (!k) return;
    holdKandidat = null;
    k.handle.classList.remove("griff-haelt");
    starteZiehen(k.handle, k.row, k.art, k.inSet, k.pointerId, k.lastY);
  }, HOLD_DAUER);
});

app.addEventListener("pointermove", e => {
  if (holdKandidat && e.pointerId === holdKandidat.pointerId) {
    const dx = e.clientX - holdKandidat.startX, dy = e.clientY - holdKandidat.startY;
    if (Math.hypot(dx, dy) > HOLD_TOLERANZ) {
      /* Wischen erkannt, kein Halten. touch-action:none auf dem Griff hat
         natives Scrollen fuer diese Beruehrung von Anfang an unterbunden -
         den seit der Beruehrung entgangenen Weg jetzt in einem Schritt
         nachholen, ab hier per scrollUebernahme normal weiterverfolgen. */
      const nachholen = holdKandidat.startY - e.clientY;
      holdAbbrechen();
      scrollUebernahme = { pointerId: e.pointerId, lastY: e.clientY };
      window.scrollBy(0, nachholen);
      return;
    }
    holdKandidat.lastY = e.clientY;
  } else if (scrollUebernahme && e.pointerId === scrollUebernahme.pointerId) {
    window.scrollBy(0, scrollUebernahme.lastY - e.clientY);
    scrollUebernahme.lastY = e.clientY;
  }
  if (!dragState || e.pointerId !== dragState.pointerId) return;
  dragState.clientY = e.clientY;
  updateDragPosition(e.clientY);
});

/* 2.2.0: Neue Reihenfolge der Speicherkarten. Sie steckt nur in der
   Ordnungszahl jedes Sets, die Karten selbst werden nicht angefasst.
   Von endDrag() UND von der Pfeiltasten-Alternative weiter unten genutzt -
   beide muessen nach dem Verschieben (per Maus bzw. per Taste) dieselbe
   Reihenfolge aus demselben DOM-Zustand herausschreiben. */
function commitSetOrder(parent) {
  const ids = [...parent.querySelectorAll(".set-block")].map(r => r.dataset.setid);
  const sets = currentSets();
  const byId = new Map(sets.map(x => [x.id, x]));
  const neu = ids.map(id => byId.get(id)).filter(Boolean);
  /* 2.3.0: Gezogen wird innerhalb einer Gruppe (Kategorien, Lektionen,
     Eigene). Die neue Reihenfolge ersetzt genau die Plaetze, die diese
     Gruppe in der Gesamtliste belegt - die anderen Gruppen bleiben, wo sie
     sind. Vorher wurde die ganze Liste ersetzt; mit Gruppen waeren dabei
     alle anderen Speicherkarten verschwunden. */
  const plaetze = [];
  const inGruppe = new Set(ids);
  sets.forEach((x, i) => { if (inGruppe.has(x.id)) plaetze.push(i); });
  if (neu.length > 0 && neu.length === plaetze.length) {
    plaetze.forEach((pos, i) => { sets[pos] = neu[i]; });
    const b = currentBereich();
    const patch = {};
    sets.forEach((x, i) => { patch[pfadSet(b.id, x.id) + ".order"] = i; });
    patchDoc(patch);
  }
}

/* 2.6.0: Sortieren innerhalb einer Speicherkarte. Beruehrt nur deren
   cardIds - die Reihenfolge des Bereichs und damit die Nummern der Karten
   bleiben, wie sie sind. */
function commitSetCardOrder(parent, setid) {
  const set = findSet(setid);
  const neu = [...parent.querySelectorAll(".card-row")].map(r => r.dataset.cardid).filter(Boolean);
  if (set && neu.length === set.cardIds.length) {
    set.cardIds = neu;
    patchDoc({ [pfadSet(currentBereich().id, set.id) + ".cardIds"]: neu });
  }
}

/* C2: Neue Reihenfolge innerhalb der sichtbaren Seite (oder der ganzen
   Liste, wenn es keine Seiten gibt). Ersetzt genau den Ausschnitt
   listenFenster; die Karten davor und dahinter bleiben, wo sie sind. */
function commitBereichOrder(parent) {
  const newOrderIds = [...parent.querySelectorAll(".card-row")].map(r => r.dataset.cardid);
  const cards = currentCards();
  const byId = new Map(cards.map(c => [c.id, c]));
  const reordered = newOrderIds.map(cid => byId.get(cid)).filter(Boolean);
  if (listenFenster.anzahl > 0 && reordered.length === listenFenster.anzahl) {
    cards.splice(listenFenster.start, listenFenster.anzahl, ...reordered);
    /* A4: nur die Ordnungszahlen dieses Bereichs, nichts sonst. */
    patchDoc(ordnungPatch(currentBereich()));
  }
}

function endDrag(e) {
  /* Ein Loslassen/Abbrechen beendet auch einen noch wartenden Halte-Versuch
     (derselbe Finger, der den Griff beruehrt hat) - sonst bliebe der Timer
     stehen und wuerde beim naechsten Griff faelschlich als "schon gehalten"
     zaehlen. Ebenso eine laufende manuelle Scroll-Uebernahme (siehe
     pointermove-Handler) - sonst wuerde deren letzter Y-Wert beim naechsten
     Wischen ueber denselben Griff als Startpunkt missverstanden. */
  if (holdKandidat && (!e || e.pointerId === holdKandidat.pointerId)) holdAbbrechen();
  if (scrollUebernahme && (!e || e.pointerId === scrollUebernahme.pointerId)) scrollUebernahme = null;
  if (!dragState) return;
  if (autoScrollRAF) { cancelAnimationFrame(autoScrollRAF); autoScrollRAF = null; }
  const row = dragState.row;
  const parent = row.parentNode;
  row.classList.remove("dragging");
  if (parent && dragState.art === "set") {
    commitSetOrder(parent);
  } else if (parent && dragState.setid) {
    commitSetCardOrder(parent, dragState.setid);
  } else if (parent) {
    commitBereichOrder(parent);
  }
  dragState = null;
  render();
}
app.addEventListener("pointerup", endDrag);
app.addEventListener("pointercancel", endDrag);

/* ---------- Karten sortieren: per Tastatur (Pfeiltasten am Griff) ----------
   9. Barrierefreiheit: dieselben drei Ziele wie beim Ziehen (Bereich,
   Speicherkarte, Karten INNERHALB einer Speicherkarte) muessen auch ohne
   Maus/Touch erreichbar sein (WCAG 2.1.1). Der Griff ist dafuer fokussierbar
   (siehe HTML-Erzeugung oben, tabindex="0" + role="button"). Pfeil hoch/runter
   vertauscht die Zeile mit ihrem Nachbarn im DOM - genau wie updateDragPosition
   es beim Ziehen tut - und ruft danach dieselbe commit-Funktion wie endDrag().
   Nach dem render() ist die alte Zeile weg; der Fokus wird deshalb ueber die
   ID der verschobenen Karte/Speicherkarte an der NEUEN Zeile wiedergefunden -
   sonst spraenge der Fokus bei jeder Verschiebung auf den Seitenanfang. */
app.addEventListener("keydown", e => {
  if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
  const handle = e.target.closest(".drag-handle");
  if (!handle) return;
  const row = handle.closest(".card-row") || handle.closest(".set-block");
  if (!row) return;
  const parent = row.parentNode;
  if (!parent) return;
  const art = row.classList.contains("card-row") ? "karte" : "set";
  const inSet = art === "karte" ? row.closest(".set-cards") : null;
  const setid = inSet && inSet.closest(".set-block") ? inSet.closest(".set-block").dataset.setid : null;
  const selektor = art === "set" ? ".set-block" : ".card-row";
  const geschwister = [...parent.querySelectorAll(selektor)];
  const idx = geschwister.indexOf(row);
  const zielIdx = e.key === "ArrowUp" ? idx - 1 : idx + 1;
  e.preventDefault();
  if (idx < 0 || zielIdx < 0 || zielIdx >= geschwister.length) return; // schon am Rand - nichts zu tun
  const ziel = geschwister[zielIdx];
  if (e.key === "ArrowUp") parent.insertBefore(row, ziel);
  else parent.insertBefore(row, ziel.nextSibling);

  const fokusId = art === "set" ? row.dataset.setid : row.dataset.cardid;
  if (art === "set") commitSetOrder(parent);
  else if (setid) commitSetCardOrder(parent, setid);
  else commitBereichOrder(parent);

  render();
  const fokusSelektor = art === "set"
    ? '.set-block[data-setid="' + CSS.escape(fokusId) + '"] .drag-handle'
    : '.card-row[data-cardid="' + CSS.escape(fokusId) + '"] .drag-handle';
  const neuerGriff = document.querySelector(fokusSelektor);
  if (neuerGriff) neuerGriff.focus();
});

/* ---------- Allgemeines Rand-Scrollen mit der Maus (PC) ---------- */
/* Entscheidung des Betreibers, 4. September 2026: Die Seite soll auf dem PC
   von selbst scrollen, sobald die Maus oben oder unten am Bildschirmrand
   steht - ganz ohne Klick, wie man es von manchen Websites kennt. Das ist
   etwas anderes als das Rand-Scrollen beim Kartenziehen weiter oben: DAS
   reagiert nur waehrend eines aktiven Ziehvorgangs, DIESES staendig, allein
   durch die Mausposition.

   Nur fuer echte Maeuse (pointerType "mouse") - auf dem Handy bleibt es beim
   gewohnten Wischen mit dem Finger, das soll unangetastet bleiben. */
let edgeScrollMouseY = null;
document.addEventListener("pointermove", e => {
  if (e.pointerType !== "mouse") return;
  edgeScrollMouseY = e.clientY;
});
/* Verlaesst die Maus das Fenster (Tab-Wechsel, zweiter Bildschirm), kommen
   keine neuen pointermove-Ereignisse mehr - ohne dieses Zuruecksetzen wuerde
   mit dem letzten bekannten Wert fuer immer weitergescrollt. */
document.addEventListener("pointerleave", () => { edgeScrollMouseY = null; });

function edgeScrollTick() {
  const tag = document.activeElement && document.activeElement.tagName;
  /* Vier Faelle, in denen Rand-Scrollen mehr schaden als nuetzen wuerde:
     - dragState: das Kartenziehen hat sein eigenes Rand-Scrollen (siehe
       autoScrollTick oben) - beide gleichzeitig wuerden sich addieren
     - hwDrawing: sonst wuerde ein Strich beim Schreiben mitten im Zug
       verrutschen, weil die Seite unter dem Stift wegscrollt
     - hwFullscreen: hinter der Vollbild-Zeichenflaeche gibt es nichts zu
       scrollen
     - ui.dialog: waehrend ein eigener Dialog offen ist (D2), soll der
       Hintergrund stillstehen wie bei jedem Dialog
     - INPUT/TEXTAREA im Fokus: sonst rutscht ein Formularfeld beim
       Ausfuellen unter der Maus weg */
  const gesperrt = dragState || hwDrawing || hwFullscreen || ui.dialog ||
    tag === "INPUT" || tag === "TEXTAREA";
  if (!gesperrt && edgeScrollMouseY !== null) {
    const margin = 70;   // dieselbe Randzone wie beim Kartenziehen
    const maxSpeed = 16; // dieselbe Hoechstgeschwindigkeit - ein Gefuehl fuer beides
    const y = edgeScrollMouseY;
    const vh = window.innerHeight;
    let dy = 0;
    if (y < margin) {
      dy = -maxSpeed * Math.min(1, Math.max(0, (margin - y) / margin));
    } else if (y > vh - margin) {
      dy = maxSpeed * Math.min(1, Math.max(0, (y - (vh - margin)) / margin));
    }
    if (dy !== 0) window.scrollBy(0, dy);
  }
  requestAnimationFrame(edgeScrollTick);
}
requestAnimationFrame(edgeScrollTick);

/* ---------- Handschrift-Canvas: Zeichnen per Zeigegerät (Maus/Touch/Stylus) ---------- */
/* Die Striche werden NICHT in Pixeln gespeichert, sondern als Anteil der
   Canvas-Breite (0 bis 1) - fuer x und y mit demselben Faktor. Dadurch bleibt
   das Seitenverhaeltnis erhalten, wenn man auf Vollbild umschaltet oder das
   Geraet dreht. Frueher war die Zeichenflaeche fest 700x260 gross, wurde aber
   auf etwa 350x240 angezeigt: waagerecht um Faktor 2 gestaucht, senkrecht fast
   gar nicht. Runde Boegen wurden dadurch zu Ellipsen. */
function sizeCanvas(canvas, ctx) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.round(rect.width * dpr));
  canvas.height = Math.max(1, Math.round(rect.height * dpr));
  /* Ab hier rechnet der Kontext in CSS-Pixeln, die Bitmap ist aber feiner
     aufgeloest - deshalb sind die Striche auf dem Handy nicht mehr unscharf. */
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
function drawStrokes(ctx, canvas) {
  const rect = canvas.getBoundingClientRect();
  const w = rect.width || 1;
  const h = rect.height || 1;
  ctx.clearRect(0, 0, w, h);
  /* E5 (1.8.0): Grundlinie wie im Schreibheft. Arabisch sitzt auf dieser
     Linie, einzelne Buchstaben (ج ع ر) haengen darunter - deshalb liegt sie
     nicht mittig, sondern bei knapp zwei Dritteln, damit unten Platz bleibt.
     Sie wird VOR den Strichen gezeichnet und liegt so immer hinter der
     eigenen Schrift. Das halbe Pixel (+0.5) macht die Linie scharf statt
     grau verwaschen. */
  ctx.save();
  ctx.strokeStyle = "#ddd0ba";
  ctx.lineWidth = 1;
  ctx.beginPath();
  const baseline = Math.round(h * 0.66) + 0.5;
  ctx.moveTo(10, baseline);
  ctx.lineTo(Math.max(10, w - 10), baseline);
  ctx.stroke();
  ctx.restore();
  ctx.strokeStyle = "#2a2016";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const stroke of hwStrokes) {
    const pts = stroke.map(p => ({ x: p.x * w, y: p.y * w }));
    if (pts.length === 1) {
      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, ctx.lineWidth / 2, 0, Math.PI * 2);
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fill();
      continue;
    }
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.stroke();
  }
}
function setupHandwritingCanvas() {
  const canvas = document.getElementById("hw-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  sizeCanvas(canvas, ctx);
  drawStrokes(ctx, canvas);
  function posFromEvent(e) {
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 1;
    return {
      x: (e.clientX - rect.left) / w,
      y: (e.clientY - rect.top) / w
    };
  }
  /* D9-Nachbesserung (1.8.2): "Strich zurück" tauchte bisher nur nach dem
     Wechsel in den Vollbild-Modus auf, weil nur DIESE eine Aktion ein
     render() ausloeste, das den Knopf neu ins HTML schreibt. Waehrend des
     Zeichnens selbst wird nur roh aufs Canvas gemalt (drawStrokes) - der
     Knopf blieb also unsichtbar, bis irgendetwas anderes render() antrieb. */
  let ersterStrich = false;
  canvas.addEventListener("pointerdown", e => {
    e.preventDefault();
    hwDrawing = true;
    canvas.setPointerCapture(e.pointerId);
    ersterStrich = hwStrokes.length === 0;
    hwStrokes.push([posFromEvent(e)]);
    drawStrokes(ctx, canvas);
  });
  canvas.addEventListener("pointermove", e => {
    if (!hwDrawing) return;
    hwStrokes[hwStrokes.length - 1].push(posFromEvent(e));
    drawStrokes(ctx, canvas);
  });
  function endStroke() {
    hwDrawing = false;
    /* Erst HIER, nach pointerup, ist der Strich fertig. Ein render() waehrend
       des Zeichnens wuerde das Canvas-Element ersetzen und damit die laufende
       Pointer-Erfassung kappen - der Strich risse mitten drin ab. */
    if (ersterStrich) { ersterStrich = false; render(); }
  }
  canvas.addEventListener("pointerup", endStroke);
  canvas.addEventListener("pointercancel", endStroke);
}
/* Beim Drehen des Geraets aendert sich die Breite - Flaeche neu vermessen
   und die vorhandenen Striche neu zeichnen. */
window.addEventListener("resize", () => {
  const canvas = document.getElementById("hw-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  sizeCanvas(canvas, ctx);
  drawStrokes(ctx, canvas);
});

/* Beobachtung 18 (18.09.2026), mit Messwerten belegt: window.innerHeight
   selbst liefert in der Home-Bildschirm-App unterschiedliche Werte, je
   nachdem ob der aktuelle Bildschirminhalt scrollbar ist oder nicht (z.B.
   848px bei "Lernen" ohne Scroll, 896px bei "Fortschritt" mit Scroll -
   derselbe Bildschirm, 48px Differenz). visualViewport zeigt denselben
   falschen Wert, ein Vergleich der beiden bringt also nichts. Fix: den
   groessten je in dieser Sitzung gemessenen Wert als verlaessliche
   Referenz nehmen - der kleinere, falsche Wert kommt nur vor, nie der
   groessere, korrekte. */
let maxViewportHeight = 0;
function syncViewportGap() {
  const vv = window.visualViewport;
  const h = vv ? vv.height : window.innerHeight;
  maxViewportHeight = Math.max(maxViewportHeight, h, window.innerHeight);
  const gap = Math.max(0, maxViewportHeight - h);
  document.documentElement.style.setProperty("--vv-gap", gap + "px");
}
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", syncViewportGap);
  window.visualViewport.addEventListener("scroll", syncViewportGap);
}
window.addEventListener("resize", syncViewportGap);
syncViewportGap();

/* Beobachtung 18: Messwerkzeug fuer die noch ungeklaerte springende Nav-
   Leiste. Eine als Home-Bildschirm-App installierte PWA startet immer mit
   der eigenen start_url, ein ?debug=nav in der Adresse geht beim Start
   verloren - deshalb zusaetzlich per localStorage (7x Tap auf die
   Versionsnummer unten in Einstellungen, siehe debugVersionTap()) und ohne
   Reload aktivierbar. Wird entfernt, sobald die Ursache gefunden ist. */
function zeigeNavDebugOverlay() {
  if (document.getElementById("nav-debug-box")) return;
  const box = document.createElement("div");
  box.id = "nav-debug-box";
  box.style.cssText = "position:fixed;top:0;left:0;right:0;z-index:99999;" +
    "background:rgba(0,0,0,0.85);color:#0f0;font:11px monospace;padding:8px;" +
    "white-space:pre-wrap;pointer-events:none;";
  document.body.appendChild(box);
  function updateDebugBox() {
    const nav = document.querySelector(".nav");
    const navRect = nav ? nav.getBoundingClientRect() : null;
    const vv = window.visualViewport;
    const cs = getComputedStyle(document.documentElement);
    box.textContent =
      "innerHeight: " + window.innerHeight + "\n" +
      "vv.height: " + (vv ? vv.height : "n/a") + "\n" +
      "vv.offsetTop: " + (vv ? vv.offsetTop : "n/a") + "\n" +
      "--vv-gap: " + cs.getPropertyValue("--vv-gap") + "\n" +
      "--sab: " + cs.getPropertyValue("--sab") + "\n" +
      "nav.top: " + (navRect ? navRect.top.toFixed(1) : "n/a") + "\n" +
      "nav.bottom: " + (navRect ? navRect.bottom.toFixed(1) : "n/a") + "\n" +
      "nav.height: " + (navRect ? navRect.height.toFixed(1) : "n/a") + "\n" +
      "docEl.scrollHeight: " + document.documentElement.scrollHeight + "\n" +
      "docEl.clientHeight: " + document.documentElement.clientHeight + "\n" +
      "body.scrollHeight: " + document.body.scrollHeight + "\n" +
      "scrollY: " + window.scrollY + "\n" +
      "ui.tab: " + (typeof ui !== "undefined" ? ui.tab : "n/a");
  }
  updateDebugBox();
  window.addEventListener("resize", updateDebugBox);
  window.addEventListener("scroll", updateDebugBox);
  if (window.visualViewport) window.visualViewport.addEventListener("resize", updateDebugBox);
  setInterval(updateDebugBox, 500);
}
if (new URLSearchParams(location.search).get("debug") === "nav" ||
    localStorage.getItem("debugNav") === "1") {
  zeigeNavDebugOverlay();
}
/* Siebenmal auf die Versionsnummer tippen (einstFuss()) aktiviert das
   Overlay dauerhaft (localStorage), unabhaengig von der Start-URL. */
let debugTapCount = 0, debugTapTimer = null;
function debugVersionTap() {
  debugTapCount++;
  clearTimeout(debugTapTimer);
  debugTapTimer = setTimeout(() => { debugTapCount = 0; }, 2000);
  if (debugTapCount >= 7) {
    debugTapCount = 0;
    localStorage.setItem("debugNav", "1");
    zeigeNavDebugOverlay();
  }
}

/* ---------- D2 (1.8.0): eigene Dialoge ----------
   alert/confirm/prompt halten das ganze Programm an und liefern ihr Ergebnis
   sofort zurueck. Eigene Dialoge koennen das nicht - sie muessen auf einen
   Klick warten. Deshalb geben die drei Funktionen ein Promise zurueck, und
   jede aufrufende Stelle wurde auf async/await umgestellt.
   Der Zustand liegt in ui.dialog und nicht in einer eigenen Variablen: So
   ueberlebt ein offener Dialog auch ein render(), das mitten hinein von
   einem Cloud-Snapshot ausgeloest wird. */
function openDialog(cfg) {
  return new Promise(resolve => {
    ui.dialog = Object.assign({ value: "", okLabel: "OK", danger: false, resolve: resolve }, cfg);
    render();
    requestAnimationFrame(() => {
      const el = document.getElementById("dlg-input");
      if (el) { el.focus(); el.select(); }
    });
  });
}
function closeDialog(result) {
  const d = ui.dialog;
  if (!d) return;
  ui.dialog = null;
  render();
  d.resolve(result);
}
/* Ergebnis je nach Art: prompt liefert Text oder null, confirm true/false,
   alert nichts. Damit verhalten sie sich wie ihre Vorbilder und die
   aufrufenden Stellen mussten inhaltlich nicht umgebaut werden. */
function dialogResult(d, ok) {
  if (d.kind === "prompt") return ok ? d.value : null;
  if (d.kind === "confirm") return !!ok;
  return undefined;
}
function dlgAlert(text, title) {
  return openDialog({ kind: "alert", title: title || "Hinweis", text: text });
}
function dlgConfirm(text, opts) {
  const o = opts || {};
  return openDialog({
    kind: "confirm", title: o.title || "Bist du sicher?", text: text,
    okLabel: o.okLabel || "Ja, weiter", danger: !!o.danger
  });
}
function dlgPrompt(text, defaultValue, opts) {
  const o = opts || {};
  return openDialog({
    kind: "prompt", title: o.title || "Eingabe", text: text,
    value: defaultValue || "", okLabel: o.okLabel || "Übernehmen", type: o.type || "text"
  });
}
function renderDialog() {
  const d = ui.dialog;
  if (!d) return "";
  /* Bewusst KEIN Schliessen durch Klick auf den Hintergrund: auf dem Handy
     trifft man den beim Scrollen zu leicht, und dann waere die Eingabe weg. */
  let h = '<div class="dlg-backdrop">';
  h += '<div class="dlg" role="dialog" aria-modal="true" aria-labelledby="dlg-title">';
  h += '<h3 id="dlg-title">' + esc(d.title) + '</h3>';

  if (d.kind === "code-share") {
    h += '<p class="dlg-text" id="dlg-text">Klick „Kopieren" oder wähle den Code:</p>';
    h += '<code style="display:block; word-break:break-all; padding:var(--space-3); background:var(--surface-raised); border-radius:var(--r-sm); font-size:0.9em; overflow-y:auto; max-height:120px; text-align:center; letter-spacing:2px; font-weight:bold">' + esc(d.code) + '</code>';
  } else {
    h += '<div class="dlg-text" id="dlg-text">' + esc(d.text) + '</div>';
  }

  if (d.kind === "prompt") {
    /* aria-labelledby statt aria-label: der Text steht schon sichtbar da
       (d.text ist je nach Aufruf verschieden - "Neuer Name für ...", "Neue
       Übersetzung" ...), doppelt zu tippen waere nur eine Fehlerquelle. */
    h += '<input type="' + (d.type === "password" ? "password" : "text") + '" id="dlg-input" aria-labelledby="dlg-text" value="' + esc(d.value) + '">';
  }
  h += '<div class="dlg-actions">';
  if (d.kind === "code-share") {
    h += '<button class="secondary" data-action="dlg-ok">Fertig</button>';
    h += '<button data-action="code-copy-clipboard">Kopieren</button>';
  } else {
    if (d.kind !== "alert") h += '<button class="secondary" data-action="dlg-cancel">Abbrechen</button>';
    h += '<button' + (d.danger ? ' class="danger"' : '') + ' data-action="dlg-ok">' + esc(d.okLabel) + '</button>';
  }
  h += '</div></div></div>';
  return h;
}
function setupDialog() {
  const inp = document.getElementById("dlg-input");
  if (!inp) return;
  /* Wie beim Kartenformular: jeden Tastendruck sofort in den Zustand
     spiegeln, sonst loescht ein render() dazwischen das Getippte. */
  inp.addEventListener("input", e => { if (ui.dialog) ui.dialog.value = e.target.value; });
  inp.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (ui.dialog) closeDialog(dialogResult(ui.dialog, true));
    }
  });
}
document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  const errorModal = document.getElementById("errorModal");
  if (errorModal && errorModal.getAttribute("aria-hidden") === "false") { closeErrorModal(); return; }
  if (ui.dialog) { closeDialog(dialogResult(ui.dialog, false)); return; }
  /* 3.0.25: Das Bereichs-Sheet liess sich per Tastatur bisher nur über den
     "Fertig"-Knopf schliessen, nicht über Escape wie jeder andere Dialog -
     eine Inkonsequenz, die auffaellt, sobald man die App ohne Maus bedient. */
  if (ui.bereichSheet) { ui.bereichSheet = false; render(); }
  if (ui.bereichMehr) { ui.bereichMehr = false; render(); }
  if (ui.cardDetailId) { ui.cardDetailId = null; render(); }
});

/* ---------- Fehlerformular-Modal ---------- */
function openErrorModal() {
  const modal = document.getElementById("errorModal");
  if (modal) {
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const textarea = document.getElementById("error-description");
    if (textarea) setTimeout(() => textarea.focus(), 100);
  }
}

function closeErrorModal() {
  const modal = document.getElementById("errorModal");
  if (modal) {
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  const form = document.getElementById("errorForm");
  if (form) form.reset();
}

/* Initialisierung des Fehlerformulars. Kein Klick auf den Hintergrund zum
   Schliessen - dieselbe bewusste Entscheidung wie bei .dlg-backdrop (siehe
   dort): auf dem Handy trifft man ihn beim Scrollen zu leicht, und bei drei
   Feldern waere mehr verloren als bei einem. */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("errorForm");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();

    const honeypot = form.querySelector('input[name="website"]').value;
    if (honeypot) return;

    const name = document.getElementById("error-name").value.trim() || "(kein Name)";
    const email = document.getElementById("error-email").value.trim() || "(keine E-Mail)";
    const description = document.getElementById("error-description").value.trim();

    if (!description) {
      dlgAlert("Bitte beschreib den Fehler.");
      return;
    }

    const subject = encodeURIComponent("Fehler gemeldet");
    const body = encodeURIComponent(
      "Name: " + name + "\n" +
      "E-Mail: " + email + "\n" +
      "Fehler:\n" + description
    );

    window.location.href = "mailto:" +
      String.fromCharCode(97,100,114,97,98,105,99,46,100,101,64,103,109,97,105,108,46,99,111,109) +
      "?subject=" + subject + "&body=" + body;
    closeErrorModal();
  });
});

/* ---------- Event-Delegation ----------
   Bewusst an <body>, nicht an #app: errorModal liegt ausserhalb von #app
   (das rendert komplett neu, siehe render() - ein Dialog darin wuerde bei
   jedem Klick verschwinden), ein Klick auf seine data-action-Knoepfe muss
   die Delegation trotzdem erreichen. Dieselbe Begruendung wie beim
   body-Listener fuer den Uebungsmodus weiter oben. Bleibt damit der EINE
   delegierte Klick-Listener ueber data-action (README.md), nur an einem
   Element, das wirklich alles umschliesst. */
document.body.addEventListener("click", e => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  switch (btn.dataset.action) {
    case "login": doLogin(); break;
    case "register": doRegister(); break;
    case "reset": doReset(); break;
    case "google-login": doGoogleLogin(); break;
    case "apple-login": doAppleLogin(); break;
    case "mode-login": ui.authMode = "login"; ui.authError = null; ui.authInfo = null; ui.authFeldFehler = null; render(); break;
    case "mode-register": ui.authMode = "register"; ui.authError = null; ui.authInfo = null; ui.authFeldFehler = null; render(); break;
    case "mode-reset": ui.authMode = "reset"; ui.authError = null; ui.authInfo = null; ui.authFeldFehler = null; render(); break;
    case "passwort-zeigen": ui.authPassSichtbar = !ui.authPassSichtbar; render(); break;
    case "logout": doLogout(); break;
    case "delete-account": doKontoLoeschen(); break;
    /* 3.0.0: Das Bereichs-Sheet. "nichts" traegt das Blatt selbst, damit ein
       Tipp hinein nicht bis zum Hintergrund durchschlaegt und schliesst. */
    case "bereich-sheet-auf": ui.bereichSheet = true; render(); break;
    case "bereich-sheet-zu": ui.bereichSheet = false; render(); break;
    case "card-detail": ui.cardDetailId = btn.dataset.id; render(); break;
    case "card-detail-zu": ui.cardDetailId = null; render(); break;
    case "card-detail-bearbeiten": ui.cardDetailId = null; editCard(btn.dataset.id); break;
    case "nichts": break;
    case "seite-neu-laden": location.reload(); break;
    /* Nur im Startfehler-Bildschirm: anders als "seite-neu-laden" räumt
       dieser Knopf IMMER erst Service Worker und Cache weg, nicht nur
       einmal pro Sitzung - ein Mensch, der ihn anklickt, hat die
       automatische Selbstheilung schon hinter sich und darf sie erneut
       anstoßen, z.B. nachdem er sein Netz repariert hat. */
    case "start-neu-versuchen": selbstheilung().then(() => location.reload()); break;
    case "einstellungen": ui.einstellungen = true; ui.seite = null; window.scrollTo(0, 0); render(); break;
    case "einstellungen-zu": ui.einstellungen = false; ui.seite = null; window.scrollTo(0, 0); render(); break;

    /* 3.2.0 - Unterseiten und Wahl-Blatt. Beide Seiten-Handlungen tun
       dasselbe; sie heissen nur verschieden, damit im Markup lesbar bleibt,
       aus welchem Bildschirm die Zeile kommt. */
    case "einst-seite":
    case "fort-seite":
      ui.seite = btn.dataset.id || null; window.scrollTo(0, 0); render(); break;
    case "seite-zu":
      ui.seite = null; window.scrollTo(0, 0); render(); break;
    case "wahl-sheet":
      ui.wahlSheet = btn.dataset.id || null; render(); break;
    case "wahl-sheet-zu":
      ui.wahlSheet = null; render(); break;
    case "set-art-sheet-auf":
      ui.setArtSheetId = btn.dataset.id || null; render(); break;
    case "set-art-sheet-zu":
      ui.setArtSheetId = null; render(); break;
    case "set-art-waehlen":
      setArtAendern(ui.setArtSheetId, btn.dataset.id); break;
    case "debug-version-tap": debugVersionTap(); break;
    case "resend-verification": doResendVerification(); break;
    case "verification-check": pruefeBestaetigung(); break;
    case "import-old": importOldProfile(btn.dataset.name); break;
    case "skip-import": ui.askImport = false; persistAll(); render(); break;
    case "select-bereich": selectBereich(btn.dataset.bid); break;
    case "add-bereich": addBereich(); break;
    case "rename-bereich": renameBereich(); break;
    case "delete-bereich": deleteBereich(); break;
    case "bereich-mehr-auf": ui.bereichMehr = true; render(); break;
    case "bereich-mehr-zu": ui.bereichMehr = false; render(); break;
    /* Jede Zeile im Blatt schliesst es zuerst, bevor sie die eigentliche
       Handlung ausloest - Umbenennen/Loeschen zeigen ihrerseits einen
       eigenen Dialog (D2), der sonst ueber dem gerade erst geschlossenen
       Blatt haengen wuerde. */
    case "bereich-mehr-auswaehlen": ui.bereichMehr = false; toggleSelectMode(); break;
    case "bereich-mehr-umkehren": ui.bereichMehr = false; reverseOrder(); break;
    case "bereich-mehr-umbenennen": ui.bereichMehr = false; renameBereich(); break;
    case "bereich-mehr-loeschen": ui.bereichMehr = false; deleteBereich(); break;
    /* 15.09.2026: window.scrollTo(0,0) in allen drei Tab-Wechseln ergaenzt -
       ohne das blieb die Seite auf der Scroll-Position des vorigen Tabs
       stehen (siehe selectBereich() fuer denselben Fund beim Bereichswechsel). */
    case "tab-lernen": ui.einstellungen = false; ui.seite = null; ui.wahlSheet = null; ui.setArtSheetId = null; ui.karteSheet = false; ui.bereichSheet = false; ui.bereichMehr = false; ui.cardDetailId = null; ui.tab = "lernen"; ui.editId = null; resetFormDraft(); ui.searchQuery = ""; ui.kartenSeite = 0; ui.searchAll = false; ui.selectMode = false; ui.selectedIds = new Set(); ui.drillOpen = false; window.scrollTo(0, 0); render(); break;
    case "tab-fortschritt": ui.einstellungen = false; ui.seite = null; ui.wahlSheet = null; ui.setArtSheetId = null; ui.karteSheet = false; ui.bereichSheet = false; ui.bereichMehr = false; ui.cardDetailId = null; ui.tab = "fortschritt"; ui.session = null; ui.lernSetId = null; ui.editId = null; resetFormDraft(); ui.drillOpen = false; window.scrollTo(0, 0); render(); break;
    case "stats-scope": ui.statsScope = btn.dataset.scope === "bereich" ? "bereich" : "alle"; render(); break;
    case "edit-leech": editCardInBereich(btn.dataset.bid, btn.dataset.id); break;
    case "reset-leech": resetRueckfaelle(btn.dataset.bid, btn.dataset.id); break;
    case "tab-verwalten": ui.einstellungen = false; ui.seite = null; ui.wahlSheet = null; ui.setArtSheetId = null; ui.karteSheet = false; ui.bereichSheet = false; ui.bereichMehr = false; ui.cardDetailId = null; ui.tab = "verwalten"; ui.session = null; ui.lernSetId = null; window.scrollTo(0, 0); render(); break;
    case "lern-set": startLernen(btn.dataset.id); break;
    case "lern-haken": lernAbhaken(btn.dataset.id); break;
    case "lern-notiz": toggleLernNotiz(btn.dataset.id); break;
    case "lern-undo": lernRueckgaengig(); break;
    case "lern-ende": endeLernen(); break;
    case "start-session": startSession(); break;
    case "reveal": revealAnswer(); break;
    case "toggle-extra": toggleExtra(); break;
    case "grade-known": gradeKnown(); break;
    case "grade-almost": gradeAlmost(); break;
    case "grade-unknown": gradeUnknown(); break;
    case "grade-weiter": gradeCard("weiter"); break;   // Nachbesserung: nur im Übungsmodus sichtbar
    case "undo-grade": undoLastGrade(); break;
    case "end-session": endSession(); break;
    case "submit-card": submitCardForm(); break;
    case "karte-neu":
      ui.editId = null; resetFormDraft(); ui.karteSheet = true;
      render(); fokusInsWortfeld(); break;
    case "karte-sheet-zu": cancelEdit(); break;
    case "edit-card": editCard(btn.dataset.id); break;
    /* D7: Sprung in den fremden Bereich. Nutzt dieselbe Funktion wie der
       Fortschritts-Tab - dort wechselt sie schon seit 1.7.0 den Bereich,
       oeffnet Verwalten und fuellt das Formular. */
    case "edit-card-in-bereich": editCardInBereich(btn.dataset.bereich, btn.dataset.id); break;
    case "search-scope": ui.searchAll = btn.dataset.scope === "alle"; ui.kartenSeite = 0; ui.selectMode = false; ui.selectedIds = new Set(); render(); break;
    case "search-clear": ui.searchQuery = ""; ui.kartenSeite = 0; render(); break;
    case "toggle-sets": ui.setsOffen = !ui.setsOffen; render(); break;
    case "toggle-set-art": ui.setsArtWahl = !ui.setsArtWahl; render(); break;
    case "cancel-edit": cancelEdit(); break;
    case "delete-card": deleteCard(btn.dataset.id); break;
    case "reverse-order": reverseOrder(); break;
    case "toggle-select-mode": toggleSelectMode(); break;
    /* C2: Blaettern. Nach oben scrollen, sonst steht man nach dem Klick
       mitten in der neuen Seite, ohne zu sehen, dass sie gewechselt hat. */
    case "seite-zurueck": ui.kartenSeite = Math.max(0, ui.kartenSeite - 1); window.scrollTo(0, 0); render(); break;
    case "seite-vor": ui.kartenSeite = ui.kartenSeite + 1; window.scrollTo(0, 0); render(); break;
    case "umzug-start": umzugStarten(); break;
    case "toggle-card-select": toggleCardSelected(btn.dataset.id); break;
    case "delete-selected": deleteSelectedCards(); break;
    case "move-selected": {
      const sel = document.getElementById("move-target-select");
      if (sel && sel.value) moveSelectedCardsTo(sel.value);
      break;
    }
    case "open-drill": openDrillPicker(); break;
    case "close-drill": ui.drillOpen = false; render(); break;
    case "start-drill": {
      const hwEl = document.getElementById("drill-handwriting");
      const hw = hwEl && hwEl.checked;
      if (ui.drillSource === "sets") {
        startDrillFromSets([...ui.drillSetIds], hw);
        break;
      }
      /* 10: von/bis kommen jetzt aus den Chips (ui.drillVon/drillBis) statt
         aus zwei <select>-Elementen. */
      if (ui.drillVon !== null && ui.drillBis !== null) {
        startDrill(Math.min(ui.drillVon, ui.drillBis), Math.max(ui.drillVon, ui.drillBis), hw);
      }
      break;
    }
    case "stufe-chip": waehleStufe(parseInt(btn.dataset.stufe, 10)); break;
    case "save-to-new-set": saveSelectedToSet("__new__"); break;
    case "save-to-set": {
      const sel = document.getElementById("save-set-select");
      if (sel && sel.value) saveSelectedToSet(sel.value);
      break;
    }
    case "drill-set": openDrillPicker(btn.dataset.id); break;
    case "toggle-set-open": toggleSetOpen(btn.dataset.id); break;
    case "rename-set": renameSet(btn.dataset.id); break;
    case "delete-set": deleteSet(btn.dataset.id); break;
    case "remove-from-set": removeCardFromSet(btn.dataset.set, btn.dataset.id); break;
    case "dlg-ok": if (ui.dialog) closeDialog(dialogResult(ui.dialog, true)); break;
    case "dlg-cancel": if (ui.dialog) closeDialog(dialogResult(ui.dialog, false)); break;
    case "code-copy-clipboard":
      if (ui.dialog && ui.dialog.code) {
        navigator.clipboard.writeText(ui.dialog.code).then(() => {
          btn.textContent = "✓ Kopiert!";
          btn.disabled = true;
          setTimeout(() => {
            btn.textContent = "Kopieren";
            btn.disabled = false;
            render();
          }, 2000);
        }).catch(() => {
          dlgAlert("Konnte nicht in die Zwischenablage kopieren.", "Fehler");
        });
      }
      break;
    case "link-copy-clipboard":
      if (ui.dialog && ui.dialog.link) {
        navigator.clipboard.writeText(ui.dialog.link).then(() => {
          btn.textContent = "✓ Kopiert!";
          btn.disabled = true;
          setTimeout(() => {
            btn.textContent = "Kopieren";
            btn.disabled = false;
            render();
          }, 2000);
        }).catch(() => {
          dlgAlert("Konnte nicht in die Zwischenablage kopieren.", "Fehler");
        });
      }
      break;
    case "set-arab-groesse": setArabGroesse(btn.dataset.id); break;   // E7
    case "set-thema": setThema(btn.dataset.id); break;
    case "set-sitzungslimit":
      setSitzungsLimit(btn.dataset.id === "alle" ? "alle" : Number(btn.dataset.id));
      break;
    case "hw-undo": hwStrokes.pop(); render(); break;   // D9
    case "hw-clear": hwStrokes = []; render(); break;
    case "hw-fullscreen":
      if (hwFullscreen) hwVollbildVerlassen();
      else { hwFullscreen = true; render(); }
      break;
    case "export-backup": exportBackup(false); break;
    case "export-backup-current": exportBackup(true); break;
    case "export-weitergabe": exportWeitergabe(); break;
    case "teile-lektion-code": teileLektionCode(); break;          // GERUEST.md Abschnitt H
    case "beende-teilen-code": beendeTeilenCode(); break;
    case "code-einloesen-start": codeEinloesenStart(); break;
    case "teile-lektion-link": teileLektionLink(); break;          // GERUEST.md Abschnitt J (deprecated)
    case "link-einloesen-start": linkEinloesenStart(); break;      // deprecated
    case "streak-fortsetzen": streakFortsetzen(); break;
    case "verlauf-reset": verlaufZuruecksetzen(); break;
    case "karte-merken": karteMerken(btn.dataset.id); break;
    case "merk-oeffnen": merkSetOeffnen(); break;
    case "import-trigger": {
      const el = document.getElementById("import-file-input");
      if (el) el.click();
      break;
    }
    case "open-error-modal": openErrorModal(); break;
    case "close-error-modal": closeErrorModal(); break;
  }
});

/* ---------- 3.0.24: Selbstheilung bei Startfehler ----------
   Ursache eines echten Falls: Ein alter Service Worker (oder sein Cache)
   hing fest und lieferte einen kaputten Stand des Firebase-SDK aus - jeder
   normale "Neu laden"-Klick landete wieder beim selben Service Worker und
   damit beim selben Fehler. Geholfen hat erst ein manuelles "Websitedaten
   l\u00f6schen" in den Entwicklertools. Das kann man niemandem zumuten, der die
   App nur benutzen will - also macht die App es bei Bedarf selbst.

   NUR wenn der Browser online zu sein glaubt - sonst w\u00fcrde das L\u00f6schen des
   eigenen Caches ausgerechnet den Fall verschlimmern, f\u00fcr den er gedacht
   ist: echtes Offline-Nutzen mit bereits zwischengespeichertem SDK.

   16.09.2026 (Beobachtung 16, jetzt reproduziert): "Impressum" in den
   Einstellungen \u00f6ffnen, dann Browser-Zur\u00fcck - der Ladefehler kam wieder,
   und zwar SOFORT (kein einziger automatischer Heilungsversuch griff
   sichtbar). Naheliegendste Erkl\u00e4rung: index.html wird nach einer echten
   Navigation zu impressum.html und zur\u00fcck ein zweites Mal frisch geladen,
   `initFirebase()` schl\u00e4gt dabei erneut fehl (z.B. weil der
   Zur\u00fcck-Navigationspfad Ressourcen im Browser anders/knapper priorisiert
   als ein normaler erster Aufruf), die EINMALIGE Selbstheilung greift, l\u00e4dt
   neu - schl\u00e4gt der dynamische Import beim Reload nochmal fehl, ist das
   Kontingent (bisher: 1) bereits aufgebraucht und der rohe Fehlerbildschirm
   erscheint, obwohl ein zweiter Versuch die Ursache (z.B. ein kurzzeitig
   blockiertes IndexedDB/Cache-Handle) durchaus noch h\u00e4tte l\u00f6sen k\u00f6nnen.
   Kontingent deshalb von 1 auf SELBSTHEILUNG_MAX erh\u00f6ht (Z\u00e4hler statt
   Ja/Nein-Flag) - h\u00e4lt den Schutz gegen Endlos-Neuladen (echtes Offline,
   blockiertes gstatic.com) bei einer festen Obergrenze, gibt aber einer
   zweiten, wirklich transienten St\u00f6rung eine echte Chance. */
const SELBSTHEILUNG_MAX = 2;
function kannSelbstheilen() {
  try {
    const bisher = parseInt(sessionStorage.getItem("adrabic-selbstheilung") || "0", 10);
    return navigator.onLine && bisher < SELBSTHEILUNG_MAX;
  } catch (e) { return navigator.onLine; } // sessionStorage blockiert (privater Modus o.\u00e4.) - dann eben ohne die Sperre
}
async function selbstheilung() {
  try {
    const bisher = parseInt(sessionStorage.getItem("adrabic-selbstheilung") || "0", 10);
    sessionStorage.setItem("adrabic-selbstheilung", String(bisher + 1));
  } catch (e) {}
  try {
    if ("serviceWorker" in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r => r.unregister()));
    }
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    }
  } catch (e) { /* Aufr\u00e4umen fehlgeschlagen - dann bleibt es beim gew\u00f6hnlichen Fehlerbildschirm */ }
}

/* 16.09.2026: Diagnose-Zeile ergaenzt (Versuche, Online-Status) - die
   bisherige Fehlermeldung allein ("Failed to fetch dynamically imported
   module: ...") reichte nicht aus, um die Ursache des wiederkehrenden
   Ladefehlers nach Browser-Zurueck einzugrenzen. Fuer den naechsten Fall:
   ein Screenshot dieses Kastens verraet, wie viele automatische Versuche
   schon liefen und ob der Browser sich selbst fuer online hielt - beides
   naechster Anhaltspunkt statt einer weiteren Vermutung. */
function zeigeStartfehler(e) {
  let diagnose = "";
  try {
    const bisher = parseInt(sessionStorage.getItem("adrabic-selbstheilung") || "0", 10);
    diagnose = bisher + " automatische Versuche \u00b7 online: " + (navigator.onLine ? "ja" : "nein");
  } catch (err) { /* sessionStorage blockiert - dann eben ohne Diagnosezeile */ }
  app.innerHTML = '<div class="solo"><div class="empty">' +
    '<div class="empty__icon">' + ikon("offline", "i-xl") + '</div>' +
    '<div class="empty__titel">Start fehlgeschlagen</div>' +
    '<p class="empty__text">Die App konnte ihre Bausteine nicht laden. ' +
    'Pr\u00fcf deine Internetverbindung und lade die Seite neu.</p>' +
    '<div class="error-box" style="text-align:left">' + ikon("warnung", "i-sm") +
    '<div class="banner__text">' + esc(e && e.message ? e.message : String(e)) +
    (diagnose ? '<br><span style="opacity:.7">' + esc(diagnose) + '</span>' : '') +
    '</div></div>' +
    '<button data-action="start-neu-versuchen">Neu laden</button>' +
    '</div></div>';
}

/* ---------- Start ---------- */
if (CONFIGURED) {
  initFirebase().catch(async e => {
    if (kannSelbstheilen()) {
      await selbstheilung();
      location.reload();
      return;
    }
    zeigeStartfehler(e);
  });
} else {
  render();
}

/* ---------- Offline-Fähigkeit: Service Worker registrieren ---------- */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

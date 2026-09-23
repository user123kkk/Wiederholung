# Logbuch: Einstieg vor der Anmeldung

Letzter Eintrag zuerst. Auftrag: [`AUFTRAG.md`](AUFTRAG.md)

---

### 2026-09-23 — Video ein zweites Mal ausgewertet (Bilder), Bestandsaufnahme gemacht

**Geändert:** `plan/onboarding/VIDEO-BEFUND.md` (neu §0.1 Korrekturen, §5 Bildschirm-für-Bildschirm, Zahlen ergänzt); neu `plan/onboarding/BESTAND.md`; `plan/PLAN.md`. Kein App-Code.
**Anlass:** Betreiber: „weiter, sei so detailliert wie nur möglich, bestätige ob du das Video verstanden hast."
**Zweiter Durchgang:** 70 Bilder aus 128 Kandidaten (`--detail balanced`), alle einzeln angesehen. Der erste, reine Untertitel-Durchgang hatte **drei App-Namen falsch**: „Bipul/Bumpits" ist **BitePal** (Waschbär, 61 Bildschirme), „Elma" ist **Alma**, „House" ist **Houzz**. Korrigiert in `VIDEO-BEFUND.md` §0.1. **Lehre, die über dieses Video hinausgeht:** Für Muster reicht der Untertitel, für Namen und Zahlen auf dem Bildschirm nicht — wer zitiert, braucht den Bilddurchgang.
**Drei Funde, die nur im Bild stehen:** (1) **Mehrfachauswahl ist die Regel** — bei vier von sieben abgelesenen Fragen steht „select all that apply"; Headspace ist kein Sonderfall. (2) **Überspringen steht sichtbar daneben**, nicht versteckt (Grammarly: „Skip personalization" gleichrangig) — bestätigt am Bild, was in `FRAGENKATALOG.md` §7 Regel 5 bisher nur aus `AUFTRAG.md` §5 abgeleitet war. (3) **Die Antwort wird im selben Bildschirm kommentiert** (BitePal: „Losing 0.5 kg is a realistic target" direkt am Schieberegler) — das ist die stärkste Form von P2, Einlösung ohne eigenen Bildschirm, und genau so wirken A1 und A2 von selbst.
**Festgehalten, nicht beantwortet:** Speak baut seinen Einstieg auf einem ausdrücklichen **Angriff gegen Karteikarten** auf („Speaking early and often, not memorizing flashcards"). Eine Gegenrede auf dem Einstiegsbildschirm wäre eine Wirkungsbehauptung und fällt durch P4 — deshalb nur vermerkt.
**Bestandsaufnahme (Block 1, kein Code):** vorgezogen, obwohl F1/F2 offen sind, weil sie reines Lesen ist und an keiner offenen Frage hängt. Ergebnis in `BESTAND.md`. Die drei wichtigsten Befunde am Code: (a) `onAuthStateChanged` setzt `settings = normSettings(null)` unbedingt zurück (`app.js:1551`) — Antworten aus dem Einstieg **müssen** in den `localStorage` und dürfen erst **nach** dem Laden des Cloud-Dokuments angewendet werden, sonst sind sie beim Anmelden weg. (b) `cloudDocExists` (`app.js:1607`) ist bereits genau die Unterscheidung, die P7 verlangt — für „neues Konto vs. bestehendes Konto" muss nichts gebaut werden. (c) `soloMarke()` übergibt in `renderAuth()` schon heute „Schritt 1 von 2 · Konto" (`app.js:5004`) — das Houzz-Muster ist im Ansatz vorhanden.
**Teilentwarnung zu E4/F5:** A2 (Hell/Dunkel) braucht **keinen** neuen Speicher — `themaAnwenden()` schreibt `adrabic-thema` schon heute ohne Konto (`app.js:1048`), und der Rechtstext nennt diesen Schlüssel bereits. Neu wären nur die Schlüssel für A1, A3 und den Merker. Die Rechtsfrage bleibt für diese drei offen.
**Offen:** F1–F6 unverändert (`FRAGENKATALOG.md` §9). Zusätzlich aus `BESTAND.md` §8: ob der Einstieg nach einer Abmeldung erneut erscheinen soll (Vorschlag: nein), und wo der Merker gesetzt wird — beides gehört in Block 3.
**Nächster Schritt:** unverändert Betreiber-Entscheidung F1 (Umfang) und F2 (Einlösungs-Bildschirm zuerst). Ohne sie wird nicht gebaut.

---

### 2026-09-23 — Video ausgewertet, Fragenkatalog und Reihenfolge aufgeschrieben

**Geändert:** neu `plan/onboarding/VIDEO-BEFUND.md` und `plan/onboarding/FRAGENKATALOG.md`; `plan/PLAN.md` (Nebenstrang „Einstieg vor der Anmeldung"). Kein App-Code, keine Versionsnummer — reine Plandateien, Veröffentlichungsliste entfällt.
**Anlass:** Betreiber-Auftrag: „eine bulletproofe Liste mit 1 Million Fragen für Onboarding, reihenfolgisch sinnvoll", nach den Punkten aus einem Video, das mit dem `/watch`-Skill auszuwerten war. Damit sind die in `AUFTRAG.md` Abschnitt 0 angekündigten eigenen Quellen erstmals da.
**Video:** <https://youtu.be/Qsq-Sj_rojU> (Mobbin, „1000+ Onboarding-Flows"). Untertitel der Plattform gezogen, keine Bilder — der Whisper-Schlüssel fehlt, war hier aber nicht nötig. Befund in `VIDEO-BEFUND.md`, getrennt nach Verteilung (auszählbar), Fallzahl (Einzelfall-A/B, nicht tragend) und Muster (qualitativ, überprüfbar). Nach `STRATEGIE.md` 1.1 trägt keine Video-Zahl eine Entscheidung; keine davon kommt auf den Bildschirm.
**Entscheidung 1 — die Million wird nicht geliefert, und zwar begründet.** Eine Million Fragen ließe sich nur durch Aufblähen erzeugen; das verstößt gegen `AUFTRAG.md` §4 („eine Frage, deren Antwort nirgends hinführt, ist Dekoration") und `../../CLAUDE.md` („kein Punkt, nur weil er in einer Liste stand"). Die App hat drei Einstellungen (`app.js:891`), also können heute höchstens drei Fragen überhaupt etwas einstellen. Stattdessen: der **vollständig ausgeschöpfte Fragenraum** dieser App — 139 Fragen, jede mit Ziel, Prüfergebnis und Platz in der Reihenfolge. Aufteilung: 3 sofort verwendbar, 11 mit kleinem Bau, 24 hinter fremden Sperren, 101 abgelehnt **mit Begründung** statt weggelassen.
**Entscheidung 2 — „kugelsicher" ist als sieben Prüfungen ausgeschrieben** (P1 Ziel, P2 Einlösung, P3 Beantwortbarkeit, P4 keine Behauptung, P5 kein Eingriff in die Lernlogik, P6 Datensparsamkeit, P7 Bestandskonto unberührt). Ohne diese Definition ist „kugelsicher" nicht prüfbar, und jede spätere Session würde neu streiten.
**Entscheidung 3 — die Reihenfolge sind neun Stationen**, nicht eine Fragenfolge: zeigen → eine Handlung ohne Konto → Lesbarkeit → Aussehen → Rundengröße → Einlösung → Wenn-dann-Satz → Konto → erste eigene Karte. Grund für den Zuschnitt: Im Video war über alle gelobten Flows nur eines gemeinsam — schnell zum Wert, Konto so spät wie möglich (Duolingo: 60 Bildschirme davor). Die drei Fragen stehen bewusst **nach** der ersten Handlung, weil sie vorher nicht beantwortbar sind (P3).
**Wichtigster einzelner Fund:** Die gelobten Beispiele (Endel, BitePal, Speak, Brilliant) fragen wenig und **zeigen nach den Fragen, was die Antworten bewirkt haben**. Ohne diesen Einlösungs-Bildschirm (Station S6, Katalog B3) fallen auch gute Fragen durch P2 und der Einstieg ist ein Fragebogen. Das ist der Punkt, der zuerst gebaut gehört.
**Bewusster Verzicht:** Das stärkste Muster des Videos — die Prognose („in 2 Monaten kannst du dich auf Reisen verständigen", Speak/BitePal) — ist hier **verboten**, weil es dafür keine Datengrundlage gibt (`STRATEGIE.md` 1.1). In `FRAGENKATALOG.md` D4 ausdrücklich als Verzicht vermerkt, nicht stillschweigend ausgelassen.
**Offen:** F1 bis F6 in `FRAGENKATALOG.md` Abschnitt 9. Am wichtigsten: (F1) bleibt es bei E2 vom 19.09. — nur der Wenn-dann-Satz — oder kommen A1–A3 dazu? Empfehlung des Agenten: dazu, weil der Wenn-dann-Satz allein keinen Speicherort und damit keine Einlösung hat. (F4) Anker des Wenn-dann-Satzes mit möglichem religiösem Bezug: Betreiber-Wortlaut, nicht Agent. (F5) E4 Datenschutz-Rechtsprüfung der Zwischenspeicherung: echte Person.
**Nächster Schritt:** Betreiber entscheidet F1 (Umfang) und F2 (Einlösungs-Bildschirm zuerst). Erst danach Block 1 aus `AUFTRAG.md` §7 (Bestandsaufnahme, kein Code).

---

### 2026-09-19 — E2 entschieden: nur der Wenn-dann-Satz; E1 offen

**Geändert:** `AUFTRAG.md` Abschnitt 6 (Zeilen E1/E2). Kein App-Code.
**Entscheidung:** Betreiber wählte von vier Bausteinen nur den Wenn-dann-Satz. Zeit pro Tag, Schriftprobe und die drei Mechanik-Bildschirme wurden **nicht** gewählt und deshalb nicht aufgenommen. Zu E1 schrieb er „weis nicht ob stetigs in sowas behandelt werden oder persönliches, ka" — als Frage gelesen, ob ein solcher Einstieg Stetigkeit oder Persönliches behandelt. Das ist eine Lesart, keine Bestätigung.
**Folge:** Der Strang ist damit ein Einstieg zum Dranbleiben. Das passt zur App: Abstände wachsen nur, wenn man an den Fälligkeitstagen wiederkommt (`STRATEGIE.md` 1.1). Belegt ist dafür nur Gollwitzer & Sheeran 2006 (Ziele allgemein, nicht Sprachenlernen) — auf dem Bildschirm steht davon nichts als Behauptung.
**Offen:** (1) Wortlaut und Anker der Situationen (E3) — Vorschlag an den Betreiber, **nicht** geschrieben: feste Tagesabläufe als Anker, etwa der Gebetsablauf; ob und wie, entscheidet er. (2) E1 bestätigen. (3) E4 Datenschutz-Rechtsprüfung — beim Wenn-dann-Satz ohne Speicherung eventuell gar nicht nötig, sonst ja.
**Nächster Schritt:** Betreiber beantwortet die zwei Rückfragen (Lesart E1, Anker E3). Dann Block 1.

---

### 2026-09-19 — Strang angelegt, Konzept geschrieben, nichts gebaut

**Geändert:** neu `plan/onboarding/AUFTRAG.md` und dieses Logbuch; `plan/PLAN.md` (Nebenstrang + Statusverlauf). Kein App-Code, keine Versionsnummer.
**Anlass:** Betreiber: Einstieg vor der Anmeldung, aber „wissenschaftlich … korrekten fragen passend, worauf hinarbeitend, für Muslime … nicht buchstäblich alles" — als ganzes Projekt, nicht als Aufzählung.
**Befund (am Code geprüft):**
- Es gibt drei Einstellungen (`sitzungsLimit`, `arabGroesse`, `thema`, `app.js:936`); ein Tageslimit für neue Karten ist seit 2.3.0 entfallen (`app.js:815`). Deshalb wurden „Warum lernst du?" und „Wie gut liest du?" **nicht** vorgeschlagen — sie stellen nichts ein.
- Belege für drei Lernforschungs-Aussagen nachgeprüft (Roediger & Karpicke 2006, Cepeda u. a. 2006, Gollwitzer & Sheeran 2006). Für „Einstieg vor Anmeldung erhöht Registrierungen" fand sich keine kontrollierte Studie, nur Anbieter-Blogs; die Zahlen aus dem Video sind nicht verwendet.
- Das Urteil „Signup nach Onboarding: nicht relevant" (`phase-1-datenzugriff/LOGBUCH.md`, 19.09.) war unvollständig begründet und ist im Auftrag zurückgenommen.
**Entscheidung:** Erst Konzept und Freigabe, dann Bau — wegen `CLAUDE.md` („nichts bauen, was nicht im Plan steht") und der Lehre vom 13.09. (Inhalt kommt vom Betreiber, Freigabe vor dem Schreiben ins Repo).
**Offen:** E1–E4 aus `AUFTRAG.md` Abschnitt 6. E4 (Datenschutz-Rechtsprüfung der Zwischenspeicherung) ist keine Agenten-Entscheidung.
**Nächster Schritt:** Betreiber entscheidet E1 und E2 (und liefert oder gibt frei E3). Danach Block 1 (Bestandsaufnahme, kein Code).

# Hifz und Texte-Lernen Ideen

Wörtlich aus dem Chat 981b69a1, Agent 3, gestartet 2026-10-07 15:39 (Quelle: `agent-a9821243eae8e06dc.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 12 parallelen Ideen-Agenten für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build: app.js ~820 KB, styles.css, index.html, sw.js; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server; Hosting Firebase). Der Betreiber ist ein Einzelner, bisher Nutzer: er und wenige Freunde; Ziel ist eine öffentliche, ernsthafte Lern-Website. Zielgruppe: deutschsprachige Muslime, die Arabisch (Quran-/klassisches Arabisch) lernen. Neu im Probelauf: "Texte auswendig lernen" (u. a. Quran, Tanzil-Daten unter quran/).
Frage des Betreibers: Wie kann das Tool ECHTEN, UNBESTREITBAREN Mehrwert bieten – Features, Ausbau, Verbesserungen, Neues. Er will ein großes, gründliches Ergebnis.
HARTE REGELN: NUR LESEN. In einem anderen Chat wird gerade am Repo gearbeitet. Also: keine Datei im Repo anlegen/ändern/löschen, keine git-Befehle außer rein lesenden (log, show, diff, grep), keine Tests, keine Server, keine Skripte aus plan/werkzeuge starten, nichts installieren. app.js nie komplett lesen, sondern mit Grep gezielt suchen und Ausschnitte lesen.
Nützliche Dateien: KONZEPT.md, README.md, CHANGELOG.md, plan/STAND.md, plan/grossplan/FUNKTIONEN.md (bereits bewertete Funktionen: Korb 1/2/3 – nichts davon einfach wiederholen, sondern darauf aufbauen oder begründet widersprechen), plan/texte-lernen/KONZEPT.md und WIEDERHOLEN.md, plan/lehrer-modus/GERUEST.md, plan/monetarisierung/GERUEST.md, plan/landing-page-strategie/STRATEGIE.md, plan/beobachtungen-lernwerkzeug.md, plan/zyklus-2/AUFGABEN.md.
Rahmenbedingungen des Projekts: Religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte selbst (Wortlaut kommt vom Betreiber oder aus geprüften Quellen); keine Sekten/Organisationen/Politik; keine Speicherung religiöser Angaben der Nutzer. Keine Dark Patterns. Datenschutz (DSGVO) ernst. Kein eigener Server (Cloud Functions wären eine bewusste Entscheidung – als Abhängigkeit kennzeichnen).
AUSGABEFORMAT (Deutsch, max. ca. 900 Wörter, kein Vorgeplänkel): 8–14 konkrete Ideen. Je Idee: Titel; was genau (2–3 Sätze); für wen und welcher belegbare Nutzen; Aufwand S/M/L; Abhängigkeiten (Server? Inhalte vom Betreiber? Lizenz? iOS-Grenzen?); Risiko/Gegenargument; Beleg (Datei:Zeile im Repo bzw. URL). Am Ende: deine Top 3 mit einem Satz Begründung und 1–2 Dinge, die man ausdrücklich NICHT bauen sollte. Ehrlich gewichten, nicht verkaufen. Nichts erfinden: Was du nicht geprüft hast, als Vermutung kennzeichnen.

DEIN BLICKWINKEL: Auswendiglernen von Texten (Quran-Hifz, Mutun wie kurze Lehrtexte, Bittgebete/Adhkar als vom Nutzer selbst eingegebene Texte). Lies plan/texte-lernen/KONZEPT.md, WIEDERHOLEN.md und den obersten Teil von plan/texte-lernen/LOGBUCH.md gründlich und sieh dir die Umsetzung im Code an (Grep nach "texte", "texteFreigeschaltet", "anfangsbuchstaben", "kreis", "nachbarn"). Recherchiere, wie Hifz traditionell und in bestehenden Apps organisiert wird (Sabaq/Sabqi/Manzil bzw. neu/nah/fern, Tarteel, Quran Companion, Memorize-Quran-Apps, Anki-Hifz-Decks) und welche Probleme Lernende real haben (ähnliche Verse/Mutashabihat, Versübergänge, Seitenlayout-Gedächtnis, Vergessen alter Teile, fehlende Kontrolle ohne Lehrer). Was fehlt der jetzigen Umsetzung gegenüber dem, was nachweislich hilft – und was kann sie besser als Tarteel & Co., gerade OHNE Server und ohne Spracherkennung? Denke an: Mutashabihat-Hinweise aus Textvergleich der Tanzil-Daten (rein rechnerisch, kein religiöser Inhalt), Übergangs-Abfrage zwischen Versen/Seiten, Mushaf-Seiten-/Juz-/Hizb-Bezug aus tanzil-quran-data.xml, Wiederholungsplan für bereits früher Gelerntes (Bestand eintragen), Selbstkontrolle durch Aufnahme und Abhören (lokal, MediaRecorder), Lehrer-Abhörmodus, Druck-/Exportansicht, Fortschritt über Juz. Beachte streng: Quran-Text nur unverändert aus geprüfter Quelle; keine Tafsir/Übersetzungen selbst verfassen; Lizenzlage von Übersetzungen/Rezitationen nennen.

## Bericht des Agenten

## Blickwinkel Texte auswendig lernen (Hifz, Mutun, Adhkar) – 12 Ideen

Nur gelesen, nichts geändert. Geprüfter Ist-Stand: Sure/Ayat-Bereich aus Tanzil anlegen, neu/frisch/fest, Kreis je Text, Nachbar-Blöcke, Anfangsbuchstaben, Denkpause, Kontrollfrage, „Kann ich schon“. Nicht genutzt werden Juz/Hizb/Seite/Ruku aus der XML – `quranLesen` liest nur `suras > sura` (`app.js:11709`).

**1. Kreis über mehrere Texte, kurze Suren als Ganzes**
- Was: Der Kreis läuft je Text mit `ceil(fest/kreisTage)` (`app.js:12411`). Eine feste Sure mit 4 Ayat liefert so 1 Aya pro Tag, und 37 Suren aus Juz 30 ergeben 37 Mini-Stücke täglich. Besser: ein Kreis über eine Sammlung in Mushaf-Reihenfolge, kleinste Einheit die ganze kurze Sure.
- Nutzen: Entspricht der Manzil-Praxis und verhindert Zerstückelung. Das ist der größte Strukturfehler, sobald jemand mehr als ein bis zwei Suren hat.
- Aufwand: L (Lernlogik, Mehrgeräte).
- Abhängigkeiten: keine.
- Risiko: Eingriff mitten im Probelauf; erst nach der Auswertung am 29.10.
- Beleg: `WIEDERHOLEN.md` § 3; `app.js:12453–12470`.

**2. Bestand eintragen ohne 7-Tage-Lawine**
- Was: „Kann ich schon“ setzt alles auf frisch(0), fällig heute (`WIEDERHOLEN.md` § 2). Wer 2 Juz kann, hat 7 Tage lang täglich Hunderte Ayat. Besser: Bestand direkt in den Kreis (fest, „ungeprüft“), der erste Durchlauf dient als Einstufung.
- Nutzen: Menschen mit Vorwissen, also die Kernzielgruppe; ohne das scheitert der Einstieg.
- Aufwand: M.
- Risiko: „fest“ ohne Nachweis; gemildert, weil gehakte Zeilen ohnehin frisch werden.
- Beleg: `app.js:12071`; `WIEDERHOLEN.md` § 2.

**3. Hinweis auf ähnliche Ayat (rein rechnerisch)**
- Was: Nach dem Aufdecken ein neutraler Hinweis „Gleicher Anfang wie Sure X, Aya Y“ mit markiertem erstem abweichendem Wort. Der Vergleich läuft lokal über den schon geladenen Text.
- Nutzen: Mutashabihat gelten als eine der größten Hifz-Hürden (USIM-Studie, Tarteel-Blog). Meine Zählung auf `tanzil-uthmani.txt`: 276 Ayat wortgleich mit einer anderen, etwa 1570 mit gleichen ersten 3 Wörtern, etwa 1760 mit einer 5-Wort-Folge, die auch anderswo steht; Rechenzeit 280 ms. Die Zahlen sind grob (Basmala nur roh abgezogen).
- Aufwand: M.
- Abhängigkeiten: keine; kein fremder Datensatz nötig (QUL bietet einen, Lizenz nicht geprüft).
- Risiko: Nur Textgleichheit zeigen, keine Deutung. Zu viele Treffer; daher nur innerhalb des eigenen Bestands.
- Beleg: https://oarep.usim.edu.my/handle/123456789/7591

**4. Mushaf-Seite, Juz und Hizb anzeigen und als Auswahl anbieten**
- Was: Die XML enthält 604 Seiten, 30 Juz, 240 Viertel und 556 Ruku (`tanzil-quran-data.xml:119`, `:961`). Anlegen „nach Seite/Juz“, Seitengrenze als dünne Marke in der Ansicht, Fortschritt „Juz 30: 412 von 564 fest“.
- Nutzen: Lernende und Lehrer rechnen in Seiten und Juz; knüpft an das Seitengedächtnis an.
- Aufwand: S–M.
- Risiko: Die Seitenzählung gilt für den Madina-Mushaf. Zeilengetreues Seitenbild geht damit nicht (bräuchte QUL-Layoutdaten; Vermutung, nicht geprüft).

**5. Übergangs-Abfrage**
- Was: Eigene kurze Übung nur für Nahtstellen: letzte Aya einer Sure oder Seite zur ersten der nächsten, und Abschnittsgrenzen. Heute endet jeder Kreis-Abschnitt am Textende (`app.js:12465`); Suren-Übergänge werden nie geübt.
- Nutzen: Versübergänge sind die typische Bruchstelle.
- Aufwand: M; setzt Idee 1 oder 4 voraus.

**6. Einstiegsprobe „ab hier weiter“**
- Was: Wie beim Lehrer: zufällige feste Aya als Anfang, 3–5 Ayat weiter aufsagen. Als freiwillige Probe, nicht als Lernweg.
- Nutzen: Prüft, ob man ohne die zwei grauen Vorzeilen einsteigen kann – das prüft die App bisher nie.
- Aufwand: S–M.
- Risiko: Widerspricht T4 „nirgends gemischt“ (`KONZEPT.md` § 11), braucht also eine Betreiber-Entscheidung. Innerhalb der Probe bleibt die Reihenfolge erhalten.

**7. Aufnehmen und Abhören, nur lokal**
- Was: MediaRecorder während des Aufsagens; nach dem Aufdecken abhören und mitlesen. Die Aufnahme bleibt im Arbeitsspeicher und wird danach verworfen.
- Nutzen: Echte Selbstkontrolle ohne Lehrer, ohne Server, offline, kostenlos. Tarteels Fehlererkennung ist kostenpflichtig (5,99 $/Monat) und braucht Internet.
- Aufwand: M.
- Abhängigkeiten: Mikrofon-Freigabe, Datenschutz-Absatz. iOS-PWA: Verhalten im Standalone-Modus muss am Gerät geprüft werden (Vermutung: geht ab iOS 14.3, mit Tücken).
- Risiko: F-11b wurde wegen „Blaze + Stimmdaten“ abgelehnt (`FUNKTIONEN.md:71`). Hier wird nichts gespeichert oder hochgeladen, der Ablehnungsgrund entfällt.

**8. Abhörmodus für Lehrer oder Partner**
- Was: Ansicht für ein zweites Gerät oder die Person gegenüber: Text sichtbar, Zeile antippen = gehakt. Das ersetzt die Selbstbewertung für diesen Abschnitt.
- Nutzen: Bewertung durch Dritte ist die traditionelle Kontrolle; ehrlicher als „Fließend/Hakt“.
- Aufwand: S am selben Gerät (Handy umdrehen); L über Konten hinweg (Lehrer-Modus, T11).
- Empfehlung: nur die S-Fassung.

**9. Lange Ayat in Lernteile an Waqf-Zeichen**
- Was: Eine Aya bleibt ein Dokument, wird beim Neu-Lernen aber an den im Text vorhandenen Pausenzeichen stückweise aufgedeckt. Der Text selbst bleibt unverändert.
- Nutzen: 29 Ayat haben über 1000 Bytes, 2:282 hat 2273 (meine Messung). Als eine einzige Einheit sind sie kaum lernbar.
- Aufwand: M.
- Risiko: Nur an Zeichen der Quelle teilen, nie eigene Grenzen setzen.

**10. Schwachstellen-Karte**
- Was: Je Zeile zählen, wie oft sie gehakt hat; in der Textansicht dezent markieren; Übung „nur meine Wackelstellen, mit Nachbarn“.
- Nutzen: „Schwache Seiten öfter als starke“ ist Standardrat; Tarteel bietet ein Fehlerprotokoll.
- Aufwand: S–M (ein Feld je Karte, Regeln).
- Beleg: `frischeBloecke`, `app.js:12474`.

**11. Druck- und Exportansicht**
- Was: Text als Druckseite: voll, nur Anfangsbuchstaben oder mit Lücken, mit Quellenzeile. Im Code steht weder `window.print` noch `@media print` (Grep ohne Treffer).
- Nutzen: Lernen ohne Bildschirm, Unterricht, eigene Mutun und Adhkar.
- Aufwand: S.
- Risiko: Quran-Druck nur mit unverändertem Text und Tanzil-Angabe.

**12. Kontrollfrage mit echten Verwechslern**
- Was: Die falschen Wörter kommen heute aus demselben Text, nur nach Länge gewählt (`KONZEPT.md` § 15). Besser: Anfangswörter der Nachbar-Ayat und ähnlicher Ayat aus Idee 3.
- Nutzen: Prüft die echte Verwechslung statt eines Ratespiels.
- Aufwand: S nach Idee 3.

### Lizenzlage
- **Rezitationen:** everyayah.com hat keine klare Lizenz; die Audio-Dateien von Quran.com unterliegen den Developer Terms der Quran Foundation. Deshalb keine Rezitation einbauen, höchstens später mit schriftlicher Freigabe.
- **Deutsche Übersetzungen** (z. B. Bubenheim/Elyas): keine freie Lizenz gefunden. Nicht einbauen.

### Top 3
1. **Idee 2 (Bestand) zusammen mit Idee 1 (Kreis über Texte):** Ohne sie trägt die Methode für niemanden mit mehr als ein paar Suren – das ist Voraussetzung, kein Extra.
2. **Idee 3 (ähnliche Ayat):** Trifft ein belegtes Hauptproblem, ist rein rechnerisch, offline, und so bietet es kaum jemand kostenlos.
3. **Idee 7 (lokales Abhören):** Die ehrliche Antwort auf „keine Kontrolle ohne Lehrer“, ohne Spracherkennung und ohne Daten außer Haus.

### Nicht bauen
- Spracherkennung oder KI-Fehlererkennung: Server, Kosten, Stimmdaten, und falsches „richtig“ beim Quran wäre schlimmer als gar keine Kontrolle.
- Eigene Übersetzungen, Tafsir oder Tajwid-Einfärbung, und Rezitations-Audio ohne belegte Lizenz.

Quellen: https://tarteel.ai/blog/8-common-challenges-faced-by-hifz-students-and-how-to-overcome-them/ · https://feedback.tarteel.ai/feature-requests/p/quran-revision-plan · https://qul.tarteel.ai/morphology_phrases · https://api-docs.quran.foundation/docs/sdk/javascript/audio/ · https://thehifzproject.com/articles/sabaq-sabqi-manzil

# Grammatik Nahw Sarf Lernformen

Wörtlich aus dem Chat 981b69a1, Agent 21, gestartet 2026-10-07 15:55 (Quelle: `agent-a1a26a26ed0efb42a.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 13 Agenten der ZWEITEN Runde für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server). Betreiber ist ein Einzelner, Nutzer bisher er und wenige Freunde; Ziel: öffentliche, ernsthafte Lern-Website für deutschsprachige Muslime, die Quran-/klassisches Arabisch lernen. Neu im Probelauf: "Texte auswendig lernen" (Zeile für Zeile, neu/frisch/fest, Kreis, Anfangsbuchstaben-Hilfe).
Der Betreiber hat entschieden: Er will ALLES Nützliche aus Runde 1 bauen, egal wie schwer. Runde 2 soll tiefer und weiter schauen.
ERGEBNIS RUNDE 1 (nicht wiederholen): Eine Karte hat heute drei Felder: Wort, Übersetzung, Notiz (app.js ~1855, ~8377). Es gibt Handschrift-Canvas, Suche mit Harakat-Normalisierung, Speicherkarten (Lektionen/Gruppen). Geplant sind: Liste einfügen, ohne Harakat abfragen/Harakat-Leiter, zweite Richtung Deutsch→Arabisch mit Handschrift, Harakat-Eingabeleiste, Verwechslungspaare, Quran-Konkordanz zur Karte, Wort in Aya antippen → Karte, Wurzel-Familien (hängt an Lizenz der Morphologiedaten), Formen-Tabellen als Kartentyp (als "groß, für wenige" eingestuft), Plural/Verbform als strukturierte Notiz. Nicht bauen: automatisch erzeugte Konjugationen/Plurale/Übersetzungen, TTS, KI-Karten, weitere freie Kartenfelder (Wurzelfeld wurde entfernt: 0 von 136 Karten nutzten es).
HARTE REGELN: NUR LESEN im Repo. Keine Datei anlegen/ändern, keine git-Befehle außer lesenden, nichts ausführen. app.js nie komplett lesen: Grep, dann Ausschnitte. Projektregeln: Religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte; maschinell erzeugtes Arabisch ist ausgeschlossen (plan/LEHREN.md § 1.6 – lies den Abschnitt per Grep); Inhalte kommen vom Nutzer oder vom Betreiber. Lernlogik nur mit Betreiber-Entscheidung.
AUSGABEFORMAT (Deutsch, max. ca. 1000 Wörter): Teil 1 "Befunde/Ideen" (8–14 Punkte; je Punkt: Titel, was genau, Nutzen, Aufwand S/M/L, Abhängigkeiten, Risiko/Gegenargument, Beleg Datei:Zeile oder URL). Teil 2 "Fragen an den Betreiber" (3–8 Fragen, jede mit 2–3 Sätzen Hintergrund, Auswahlmöglichkeiten und Empfehlung, sodass er ohne Nachschlagen antworten kann). Ungeprüftes als Vermutung kennzeichnen.

DEIN AUFTRAG: Über die Einzelvokabel hinaus – was lernt jemand im klassischen Arabischunterricht wirklich, und welche Lernformen fehlen der App dafür? Recherchiere, wie Lehrgänge der Zielgruppe aufgebaut sind (Madinah-Bücher: Satzmuster, I'rab-Fragen, Umformungsübungen; Bayna Yadayk: Dialoge; Sarf-Tabellen/Tasrif auswendig; Ajrumiyyah als Matn zum Auswendiglernen plus Regeln; Qasas an-Nabiyyin als erster Lesetext) und welche Übungstypen die Forschung zum Zweitspracherwerb für Morphologie und Syntax stützt (Abruf von Formen, Lückentext, Satzbau, Diktat, Lesen mit schrittweise entzogenen Hilfen). Prüfe im Code, was das bestehende Modell hergibt (Kartenfelder, Speicherkarten-Arten, Übungsmodi – Grep "art:", "Lektion", "drill", "ueben", "handwriting", "extra"; und die Texte-Funktion: kann sie auch Sarf-Tabellen, Dialoge, einen Matn oder einen Lesetext tragen? wie werden eigene Texte in Zeilen geteilt?). Entwirf Lernformen, die mit NUTZER- oder BETREIBER-Inhalt auskommen und möglichst auf Bestehendem aufsetzen statt neue Kartentypen zu erfinden, z. B.: Lückentext aus dem eigenen Beispielsatz; Tasrif-Tabelle als "Text" im Texte-Modul (Zeile = Form, Reihenfolge fest – passt die Kreis-Methode dafür?); Satz-Karten mit I'rab-Frage als Notiz; Diktat per eigener Handschrift; Lesetext mit antippbaren unbekannten Wörtern → Karte; "Lies ohne Harakat" für eigene Texte; Regel-Karten (Frage/Antwort statt Wort/Übersetzung – geht das heute schon sauber, inkl. Schriftrichtung bei gemischtem Text?); Paar-/Gegensatz-Karten; Zahlen/Zählregeln. Sage je Form ehrlich, ob sie für Karteikarten taugt oder ob man sie besser dem Unterricht überlässt. Ziel: Adrabic als Begleiter für den GANZEN Kurs, nicht nur für die Wortliste – ohne zur überladenen Alles-App zu werden.

## Bericht des Agenten

## Über die Einzelvokabel hinaus: Lernformen für den ganzen Kurs

Code-Befunde sind im Repo nachgelesen (`C:\Users\USER\Wiederholung\app.js`, `plan\texte-lernen\KONZEPT.md`). Die Angaben zum Aufbau der Lehrgänge und zur Forschung stammen überwiegend aus Fachwissen und sind nur stichprobenhaft per Websuche gestützt, also Vermutung, wo nicht anders vermerkt.

### Teil 1 – Befunde/Ideen

**1. Das Texte-Modul trägt Matn, Tasrif-Tabelle und Lesetext heute schon – technisch**
- Was: Eigener Text wird nur an Zeilenumbrüchen geteilt (`rohZuZeilen`, app.js:11772); bis 1000 Zeilen, 1500 Zeichen je Zeile (11647, 189). Jede Zeile ist ein Karten-Dokument mit `textId`.
- Nutzen: Ajrumiyyah-Abschnitt oder Tasrif-Tabelle lassen sich ohne neuen Kartentyp einfügen.
- Aufwand: S (nur Hinweistext und Beispiel im Anlegen-Dialog).
- Risiko: Arabisch aus PDFs kommt oft mit kaputten Harakat an.
- Beleg: app.js:11771–11852.

**2. Die Kreis-Methode passt nicht zu kurzen, geschlossenen Reihen (Tasrif)**
- Was: Das Tagesstück ist `ceil(fest / kreisTage)` mit Startwert 7 Tage. Eine 14-Formen-Tabelle ergibt 2 Zeilen pro Tag. Tasrif wird aber immer als ganze Reihe aufgesagt.
- Vorschlag: Texte bis etwa 20 Zeilen laufen im Kreis immer ganz.
- Aufwand: M. Das ist Lernlogik, also Betreiber-Entscheidung.
- Beleg: app.js:12411, 706, 12453–12467.

**3. Die Anfangsbuchstaben-Hilfe ist bei Tasrif wertlos**
- Was: Die Hilfe zeigt den ersten Grundbuchstaben je Wort (app.js:12204). Bei فعل / فعلا / فعلوا ist das in jeder Zeile derselbe Buchstabe.
- Vorschlag: Bei Einwort-Zeilen stattdessen eine Randspalte als Stichwort zeigen (siehe Punkt 4).
- Die Kontrollfrage „Wie geht es weiter?" (12536) habe ich für Einwort-Zeilen nicht geprüft; dass sie dort ebenfalls schwach ist, ist Vermutung.
- Aufwand: M.

**4. Textzeilen haben kein zweites Feld in der Oberfläche**
- Was: Das Konzept sieht `uebersetzung` als „Übersetzung/Notiz" vor (KONZEPT.md:162). Angelegt wird sie aber leer (app.js:11836), und das Bearbeiten-Blatt hat nur „Wortlaut" (12867).
- Nutzen eines Feldes „Bedeutung/Stichwort" je Zeile:
  - Tasrif: Pronomen (هو, هما …) als Abrufreiz;
  - Matn: deutsche Bedeutung zum Verstehen;
  - Dialog: Sprecher.
- Aufwand: M (Eingabe im Format `Zeile | Stichwort`, Anzeige beim Aufdecken).
- Risiko: Eine Übersetzung neben Quran-Ayat darf nur vom Nutzer kommen; bei Tanzil-Texten das Feld eventuell weglassen.

**5. Regel-Karten (Frage/Antwort) gehen heute nur unsauber**
- Was, drei Stellen:
  - Die Beschriftung heißt fest „Wort/Übersetzung", und das Wort-Feld ist immer `dir="rtl"` in arabischer Schrift (8378).
  - `istArabisch` schaltet schon bei einem einzigen arabischen Zeichen alles auf RTL und Quran-Schrift (294, 11140). „Was ist ein مبتدأ?" steht dann komplett rechtsläufig in arabischer Schrift.
  - Die Antwortseite wird im normalen Modus nie arabisch gesetzt (`answerArabic = s.handwriting && …`, 11023). Eine arabische Antwort erscheint in lateinischer Schrift und linksläufig.
- Vorschlag: Richtung nach überwiegendem Schriftanteil bestimmen (`dir="auto"` plus arabische Spans) und die Antwortseite gleich behandeln wie die Vorderseite.
- Nutzen: Nahw-Regeln, Definitionen und Zählregeln als Karten.
- Aufwand: M.
- Risiko: Berührt die Darstellung aller Karten; nach LEHREN muss dann der Bestand mitgeprüft werden.

**6. I'rab-Satzkarten: taugen, mit Punkt 5 als Voraussetzung**
- Was: Vorn der Satz aus dem Lehrbuch mit einem markierten Wort, hinten der I'rab, in der Notiz die Regel. Kein neuer Typ nötig.
- Offen: Es braucht eine einfache Markierung (z. B. `*Wort*` wird unterstrichen); eine solche gibt es heute nicht (Vermutung, nicht vollständig gegrept).
- Aufwand: S–M.
- Ehrlich: Das Analysieren neuer Sätze bleibt Unterricht. Die Karte festigt nur schon besprochene Mustersätze.

**7. Lückentext aus dem eigenen Beispielsatz (bekannt als F-9) – Voraussetzung neu bewerten**
- Was: F-9 wurde zurückgestellt, „bis Karten Beispielsätze tragen" (plan\grossplan\FUNKTIONEN.md:24). Mit „Liste einfügen" und Satzkarten entsteht dieser Bestand.
- Vorschlag: Nur im Üben. Steht das Wort der Karte wörtlich (harakat-normalisiert, die Suchfunktion ab 11438 kann das) in der Notiz, wird es dort verdeckt.
- Aufwand: M.
- Risiko: Flektierte Formen werden nicht gefunden. Das ist hinzunehmen, es wird nichts erzeugt.

**8. Diktat/Imla' geht nur als Selbstdiktat**
- Was: Der Handschrift-Modus fragt schon Deutsch→Arabisch ab (11020–11022). Echtes Diktat braucht Ton; TTS ist ausgeschlossen.
- Möglich wäre später eine eigene Sprachaufnahme je Karte oder Zeile.
- Aufwand: L (Speicherort, Datenschutz).
- Empfehlung: Nicht jetzt; dem Unterricht überlassen.

**9. „Lies ohne Harakat" für eigene Texte**
- Was: In der Textansicht ein Schalter, der Harakat nur in der Anzeige entfernt (Regex `ARAB_OHNE_BUCHSTABE` existiert, 12203). Passt zu Qasas an-Nabiyyin und Madinah-Lesestücken und ist dieselbe Mechanik wie die geplante Harakat-Leiter.
- Aufwand: S.
- Pflicht: Bei Quran-Texten (`quelle === "tanzil"`) gesperrt.

**10. Lesetext: Wort antippen → Karte**
- Was: Geplant ist das für Ayat; dieselbe Funktion wird für eigene Texte gebraucht. Das Wort wird als Vorderseite übernommen, die Zeile als Notiz/Beispielsatz, die Übersetzung tippt der Nutzer.
- Nutzen: Liefert zugleich die Beispielsätze für Punkt 7.
- Aufwand: M.

**11. Text als „nur lesen" statt auswendig**
- Was: Heute ist jeder Text ein Auswendig-Text (Hinweis im Anlegen-Dialog, 12850). Ein Lesestück will man lesen, nicht aufsagen.
- Vorschlag: Text-Art „Lesen" ohne Kreis: gelesen-Haken, Harakat-Schalter, Wort→Karte.
- Aufwand: M–L.
- Risiko: Zweite Text-Art, Überladung. Erst nach dem Probelauf.

**12. Dialoge (Bayna Yadayk): nicht bauen**
- Der Betreiber hat schon „Dialoge eher nicht" notiert (KONZEPT.md:50). Mustersätze daraus gehören als Satzkarten in Punkt 6.
- Dialoge leben vom Sprechen zu zweit; das ist Unterricht.

**13. Umformungsübungen (Madinah: „Setze in den Dual/Plural", „Mache weiblich"): nur als Paar-Karte**
- Was: Vorn Ausgangssatz plus Auftrag, hinten Lösung, beides aus dem Buch abgetippt. Funktioniert mit Punkt 5.
- Automatisches Erzeugen ist ausgeschlossen (LEHREN § 1.6, plan\LEHREN.md:183–197).
- Zahlen und Zählregeln: Regel als Regel-Karte, Beispiele als Satzkarten. Kein eigener Typ.
- Aufwand: S (nur Vorlagen/Hinweise).

**14. Forschung (teils belegt)**
- Abruf und verteiltes Üben sind für Vokabeln gut belegt, für Grammatik und Morphologie dünner, aber positiv (Suzuki 2017 zu verteiltem Üben von Morphologie, https://forrt.org/flora-replication-atlas/doi/10.1177/1362168815617334/; ANR-Projekt: https://anr.fr/Project-ANR-23-CE28-0026).
- Folgerung: Formen abrufen (Tasrif, Lücke) ist gut gestützt. Satzbau und freie Produktion kann eine Selbstbewertungs-Karte kaum leisten.

### Teil 2 – Fragen an den Betreiber

**1. Sollen kurze Texte (Tasrif-Tabellen) im Kreis immer ganz laufen?**
- Hintergrund: Heute teilt der Kreis jeden Text auf etwa 7 Tage auf; eine 14-Formen-Tabelle käme mit 2 Formen pro Tag. Traditionell sagt man die Reihe am Stück.
- Wahl: (a) bis ~20 Zeilen immer ganz, (b) Schalter „immer ganz" je Text, (c) lassen.
- Empfehlung: (a), keine neue Einstellung.

**2. Zweites Feld je Textzeile (Bedeutung/Stichwort)?**
- Hintergrund: Das Feld existiert in den Daten, ist aber nirgends eingebbar. Für Tasrif wäre es der Abrufreiz (Pronomen), für einen Matn die Bedeutung.
- Wahl: (a) für eigene Texte ja, für Quran-Suren nein, (b) überall, (c) nein.
- Empfehlung: (a).

**3. Regel-Karten offiziell unterstützen?**
- Hintergrund: Frage/Antwort-Karten mit gemischtem Deutsch und Arabisch werden heute falsch gesetzt (ganze Zeile rechtsläufig; arabische Antwort ohne arabische Schrift). Die Korrektur berührt die Darstellung aller Karten.
- Wahl: (a) Darstellung korrigieren, Beschriftungen bleiben, (b) zusätzlich Beschriftung „Vorderseite/Rückseite" in nicht geführten Bereichen, (c) nichts.
- Empfehlung: (a) jetzt, (b) später.

**4. Text-Art „nur lesen" – ja, später oder nie?**
- Hintergrund: Lesestücke (Qasas, Madinah-Lektionstexte) will man lesen und daraus Vokabeln ziehen, nicht aufsagen. Das wäre ein zweiter Modus im Texte-Modul.
- Wahl: (a) nach dem Probelauf als eigene Stufe, (b) nur Harakat-Schalter und Wort→Karte in der bestehenden Textansicht, (c) nie.
- Empfehlung: (b) – kleiner, gleicher Nutzen.

**5. Harakat ausblenden auch bei Quran-Texten?**
- Hintergrund: Technisch ist es reine Anzeige. Der Wortlaut würde aber verändert dargestellt.
- Wahl: (a) bei Quran gesperrt, (b) überall.
- Empfehlung: (a).

**6. Diktat mit eigener Sprachaufnahme?**
- Hintergrund: Echtes Imla' braucht Ton; TTS ist ausgeschlossen. Eine eigene Aufnahme hieße Audio speichern (Speicherort, Kosten, Datenschutz).
- Wahl: (a) nicht bauen, Selbstdiktat über Handschrift reicht, (b) später prüfen.
- Empfehlung: (a).

**7. Lückentext (F-9) jetzt einplanen?**
- Hintergrund: Er war zurückgestellt, bis Karten Beispielsätze haben. Die kämen über Wort→Karte (Zeile wird Notiz).
- Wahl: (a) direkt nach Wort→Karte, (b) weiter zurückstellen.
- Empfehlung: (a), nur im Üben und ohne Einfluss auf die Stufen.

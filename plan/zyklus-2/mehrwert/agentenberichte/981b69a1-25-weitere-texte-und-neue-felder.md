# Weitere Texte und neue Felder

Wörtlich aus dem Chat 981b69a1, Agent 25, gestartet 2026-10-07 15:55 (Quelle: `agent-adfb6bff68a3a28c0.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 13 Agenten der ZWEITEN Runde für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server). Betreiber ist ein Einzelner, Nutzer bisher er und wenige Freunde; Ziel: öffentliche, ernsthafte Lern-Website für deutschsprachige Muslime, die Quran-/klassisches Arabisch lernen. Zwei Säulen: (1) Karteikarten mit Stufen und Handschrift, (2) im Probelauf "Texte auswendig lernen" (Quran aus Tanzil-Daten, eigene Texte; neu/frisch/fest, Kreis, Anfangsbuchstaben).
Der Betreiber hat entschieden: Er will ALLES Nützliche aus Runde 1 bauen. Runde 2 soll WEITER schauen – also Felder finden, die Runde 1 gar nicht betrachtet hat.
RUNDE 1 hat bereits abgedeckt (nicht wiederholen): Import/Liste einfügen, Regal mit Kartensätzen, Harakat, zweite Richtung, Statistik/Kennzahlen, Rückkehr nach Pause/Serie, Lehrer-Code/Einladungslink/Nachliefern, Startseite/Proberunde, Druck/Export/Wake Lock, Hifz-Ausbau (Bestand, Kreis über Texte, Juz/Seite, ähnliche Ayat, Übergänge, Selbstaufnahme, Abhör-Modus), Wort aus Aya → Karte, Konkordanz, Wurzel-Familien. Als "nicht bauen" eingestuft: TTS, Spracherkennung, KI-Inhalte, Web Push, öffentliche Nutzer-Bibliothek, Klassenraum, Kinderkonten, OCR, Abzeichen/Bestenlisten, Quran-Leser mit Übersetzung/Tafsir/Audio.
HARTE REGELN: NUR LESEN im Repo. Keine Datei anlegen/ändern, keine git-Befehle außer lesenden, nichts ausführen. app.js nie komplett lesen. Projektregeln (sehr wichtig für deinen Auftrag): Religiöser Rahmen AUSSCHLIESSLICH Quran und Sunnah nach dem Verständnis der Salaf as-Salih (die drei ersten Generationen), dazu die Gelehrten auf dem Manhaj der Salaf. Keine Sekte, keine Organisation, keine Bewegung, kein politischer Bezug – auch nicht als Abgrenzung. Kein Agent verfasst, übersetzt, kürzt oder bewertet religiöse Inhalte; Wortlaut und AUSWAHL kommen vom Betreiber. Du darfst also nur ARTEN von Texten und technische/lizenzrechtliche Wege beschreiben und Fragen an den Betreiber vorbereiten – keine inhaltlichen Empfehlungen für bestimmte Werke, Gelehrte, Verlage oder Websites als religiöse Autorität aussprechen; nenne Quellen nur als technische Datenquelle mit Lizenzlage und dem Hinweis, dass die inhaltliche Eignung der Betreiber prüft. Keine Speicherung religiöser Angaben der Nutzer. Lies dazu plan/LEHREN.md § 2 (Grep "§ 2" bzw. "Religi").
AUSGABEFORMAT (Deutsch, max. ca. 1000 Wörter): Teil 1 "Neue Felder/Ideen" (8–14 Punkte; je Punkt: Titel, was genau, für wen und welcher Nutzen, Aufwand S/M/L, Abhängigkeiten (Inhalt vom Betreiber? Lizenz?), Risiko/Gegenargument, Beleg Datei:Zeile oder URL). Teil 2 "Fragen an den Betreiber" (3–8 Fragen, jede mit 2–3 Sätzen Hintergrund, Auswahlmöglichkeiten und Empfehlung, sodass er ohne Nachschlagen antworten kann). Ungeprüftes als Vermutung kennzeichnen.

DEIN AUFTRAG: Neue Felder jenseits von Runde 1. Denke von der Lebenswirklichkeit eines Lernenden her und prüfe jeweils im Code, was es schon gibt: (1) Andere Texte als Quran im Texte-Modul: Wie legt man heute einen eigenen Text an (Grep "eigener Text", "t-art", "zeilen", Aufteilung in Zeilen, Längengrenzen, Schrift)? Welche ARTEN von Texten lernt die Zielgruppe auswendig (kurze Lehrtexte in Versform/Prosa, Überlieferungen mit arabischem Wortlaut, Bittgebete des Alltags, Gedichte der Grammatik) – und was bräuchte das Modul technisch dafür (Vers-Paare/Halbverse, nummerierte Abschnitte, Überliefererkette vom Wortlaut getrennt abfragen?, sehr kurze Einheiten, optionale eigene Übersetzungszeile des Nutzers)? Gibt es digitale arabische Textsammlungen mit klarer Lizenz als reine DATENQUELLE (Lizenzlage recherchieren; Eignung prüft der Betreiber)? (2) Verbindung Lernen ↔ Alltag: "Vokabeln der Sure, die ich gerade lerne", "Wörter aus dem Text, den ich auswendig kann, als Karten" (Verständnis des Auswendiggelernten), Lernplan auf ein Ziel hin (Datum, Menge pro Tag – reine Rechnung). (3) Lesen üben: eigener Lesetext, in dem bekannte Karten-Wörter markiert sind und unbekannte per Tipp zur Karte werden; Lesefluss ohne Harakat. (4) Hören ohne fremdes Audio: Der Nutzer oder sein Lehrer nimmt die Aussprache einer Karte/Zeile selbst auf – lokal in IndexedDB statt in der Cloud (Speicherbedarf, iOS-Grenzen, Verlust beim Löschen der Websitedaten, Datenschutz ehrlich bewerten). (5) Zahlen/Schrift/Alphabet für absolute Anfänger: Gibt es in der App einen Einstieg für jemanden, der die Buchstaben noch nicht kann (Buchstabenformen Anfang/Mitte/Ende, mit Handschrift-Feld)? Inhalt ist hier nicht religiös – was davon könnte ein Agent bauen, was braucht Betreiber-Freigabe? (6) Wiederverwendbarkeit über Arabisch hinaus: Würde das Werkzeug ohne Umbau auch für andere Fächer/Sprachen taugen (und sollte man das wollen, oder verwässert es)? (7) Übergänge im Leben: Gerätewechsel, mehrere Geräte, Konto-E-Mail ändern, Daten an ein anderes Konto weitergeben, langfristige Archivierung der eigenen Lernhistorie. (8) Gemeinsam lernen OHNE Datenfluss zwischen Konten: zwei Personen an einem Gerät, gegenseitiges Abfragen mit Karten (Abfrager-Ansicht), Lernkreis mit gemeinsamem Wochenplan auf Papier. Bewerte ehrlich, welche zwei oder drei dieser Felder das Werkzeug wirklich größer machen und welche Verzettelung wären.

## Bericht des Agenten

# Runde 2 – Neue Felder jenseits von Runde 1 (nur gelesen, nichts geändert)

## Was der Code heute kann (Grundlage der Bewertung)

- **Eigener Text:** Titel (max. 40 Zeichen) plus ein Textfeld; jede nicht leere Zeile wird ein Lernschritt (`app.js:11772`, `:12042-12049`). Danach Vorschau mit „Zusammen"/„Teilen" (Teilung an der Wortgrenze nahe der Mitte, `:11776`) und „Kann ich schon" (`:12071`).
- **Grenzen:** 1000 Zeilen je Text (`:11647`), 1500 Zeichen je Zeile (`:189`), 500 Sets + Texte je Bereich (`:212`).
- **Zeilen sind Karten-Dokumente,** aber `uebersetzung` und `extra` werden leer angelegt (`:11836`), und das Bearbeiten-Blatt kennt nur „Wortlaut" (`:12867`).
- **Schrift:** arabisch wird automatisch erkannt (`:353`).
- **Konzept zu anderen Büchern:** „später, je Buch, nur mit belegter Freigabe" (`plan/texte-lernen/KONZEPT.md:330`).
- **Mikrofon:** serverseitig gesperrt, `Permissions-Policy: microphone=()` (`firebase.json:57` und `:117`). Kein `MediaRecorder`, kein eigenes IndexedDB im Code.
- **Konto:** kein E-Mail-Wechsel (kein `updateEmail` / `verifyBeforeUpdateEmail`); bei vertippter Adresse bleibt nur „Konto löschen" (`:3365`).
- **Sicherung:** JSON aller Bereiche (`:4191`); `b.texte` und `b.zeilen` liegen im Bereich und sind damit vermutlich enthalten. Der Rückweg beim Einspielen ist nur an `:4894-4902` gesehen, nicht durchgeprüft.
- **Mehrere Geräte:** Firestore mit `persistentLocalCache` und Multi-Tab (`:2233`).
- **Alphabet-Einstieg:** keiner; der Einstieg kennt nur drei Ziele (`:1416`).

## Teil 1 – Neue Felder/Ideen

**1. Eigene Notiz-/Übersetzungszeile je Textzeile (S)**
- Was: Das vorhandene Feld `uebersetzung` im Zeilen-Blatt freigeben; Anzeige nur auf Tipp, nie beim Aufsagen.
- Nutzen: Wer auswendig lernt, will die Bedeutung dabeihaben. Den Wortlaut tippt der Nutzer selbst, die App liefert nichts.
- Abhängigkeit: keine; das Feld existiert (`KONZEPT.md:162`).
- Risiko: Bei Quran-Zeilen stünden Nutzer-Übersetzungen direkt neben der Aya. Ob das dort erlaubt sein soll, entscheidet der Betreiber.
- Beleg: `app.js:11836`, `:12867`.

**2. Gliederung im Text: Abschnitte und Vers-Paare (M)**
- Was: Eine Zeile als „Überschrift/Abschnitt" markieren (wird nicht abgefragt, setzt die Nummerierung neu). Dazu ein Halbvers-Trenner im Einfügetext (Vermutung: Tab oder ` *** `), der zwei Hälften nebeneinander zeigt und optional „erste Hälfte zeigen, zweite aufsagen" erlaubt.
- Nutzen: Lehrtexte in Versform und nummerierte Sammlungen passen heute nur als flache Zeilenliste hinein.
- Abhängigkeit: Der Betreiber entscheidet, ob diese Textarten gewollt sind.
- Risiko: Die neue Abfrageform berührt die Lernlogik, die laut Projektregel tabu ist; das braucht ein ausdrückliches Ja.
- Beleg: `:11679`, `:11772`.

**3. Zeilenteil „nicht abfragen" (Kette getrennt vom Wortlaut) (M)**
- Was: Je Zeile ein optionaler Vorspann, der beim Aufsagen sichtbar bleibt oder separat geübt wird.
- Nutzen: Überlieferungen mit Kette; auch Sprecherangaben oder Überschriften.
- Risiko: Was Kette und was Wortlaut ist, trennt nur der Nutzer selbst; die App darf das nicht automatisch tun.
- Aufbau: auf Punkt 2 aufsetzen, nicht parallel bauen.

**4. Sehr kurze Einheiten: „Sammlung" statt Fließtext (M)**
- Was: Eine Text-Variante, in der jede Zeile für sich steht, mit eigenem Anlass-Titel, ohne Übergang zur nächsten und ohne Kreis in Reihenfolge.
- Nutzen: Kurze Alltagstexte sind keine Kette von Zeilen.
- Gegenargument: Das leisten Karteikarten schon heute (Vorderseite Anlass, Rückseite Wortlaut). Empfehlung: nicht bauen, sondern im Anlegen-Dialog einen Hinweis darauf geben.

**5. Lernplan auf ein Ziel hin, reine Rechnung (S–M)**
- Was: Je Text „fertig bis Datum" oder „x neue Zeilen pro Tag". Die App zeigt nur die Rechnung (verbleibende Zeilen ÷ Tage, „du liegst 3 Zeilen zurück"), ohne Mahnung.
- Nutzen: Wer ein Ziel hat, sieht sofort, ob das Tempo reicht.
- Risiko: Druck oder Schuldgefühl – deshalb nur eine neutrale Zahl. Es darf kein religiöses Ziel gespeichert werden; Datum und Menge allein sind unkritisch.
- Beleg: Die Zählung neu/frisch/fest ist schon da (`:11674`).

**6. Wörter aus meinem Text als Karten (M)**
- Was: In der Text-Ansicht ein Wort antippen → Kartenformular mit vorbelegtem Wort; die Bedeutung tippt der Nutzer. Auf der Karte ein Rückverweis „kommt vor in Text X, Zeile n".
- Nutzen: Verständnis des Auswendiggelernten.
- Abgrenzung: Runde 1 hatte das nur für Ayat. Hier gilt es für alle Texte, plus eine Übersicht „Wörter dieses Textes ohne Karte" (Abgleich ohne Harakat).
- Risiko: Arabische Wortformen sind nicht die Grundform; der Abgleich bleibt grob.
- Beleg: Die Worttrennung existiert (`:12216`).

**7. Lesetext mit Markierung bekannter Wörter (L)**
- Was: Eigener Lesetext, nicht zum Auswendiglernen. Wörter mit Karte sind unterlegt, unbekannte werden per Tipp zur Karte; dazu ein Schalter „Harakat ausblenden".
- Nutzen: Lesefluss – das eigentliche Ziel des Vokabellernens.
- Risiko: eine dritte Säule; Wortformen-Abgleich ohne Morphologie ist schwach; bei Quran-Text kollidiert das Ausblenden mit „unverändert" (Tanzil-Lizenz, `KONZEPT.md:310`), also nur für eigene Texte.
- Urteil: erst nach Punkt 6, denn 6 ist der kleine Kern davon.

**8. Eigene Tonaufnahme lokal (L, heikel)**
- Was: Aufnahme je Karte oder Zeile per MediaRecorder in IndexedDB.
- Hürden:
  - Die Mikrofon-Sperre in `firebase.json:57` müsste auf `microphone=(self)` geöffnet werden.
  - Aufnahmen liegen nur auf dem einen Gerät und gehen bei „Websitedaten löschen" verloren.
  - iOS-Safari löscht skriptbeschreibbaren Speicher nach 7 Tagen ohne Besuch; zum Home-Bildschirm hinzugefügte Web-Apps sind davon ausgenommen (https://searchengineland.com/what-safaris-7-day-cap-on-script-writeable-storage-means-for-pwa-developers-332519).
  - Die JSON-Sicherung würde dadurch unvollständig.
  - Speicherbedarf grob 0,1–0,25 MB je 10 Sekunden (Vermutung, codec-abhängig).
- Datenschutz: Lokal ist es gut, aber eine Stimmaufnahme religiöser Texte bleibt ein Art.-9-naher Inhalt auf dem Gerät.
- Urteil: nur als ausdrücklich „flüchtige Hörhilfe auf diesem Gerät", sonst lassen.

**9. Alphabet-Einstieg (M)**
- Was: Ein mitgelieferter Kartensatz „Buchstaben" mit den Formen allein/Anfang/Mitte/Ende, geübt mit dem vorhandenen Handschrift-Feld.
- Nutzen: Schließt die größte Lücke für absolute Anfänger.
- Abhängigkeit: Formen und Reihenfolge sind nicht religiös und könnte ein Agent bauen. Freigabe braucht: deutsche Umschrift und Lautbeschreibung (Schreibweise ist Betreiber-Sache, LEHREN § 2 Punkt 3), Beispielwörter, und ob Aussprache ohne Ton überhaupt seriös vermittelbar ist.
- Risiko: Buchstaben ohne Lehrer oder Ton zu lernen kann falsche Aussprache festigen.
- Beleg: `:1416`, `:1866`.

**10. Konto-Übergänge (S–M)**
- Was: (a) E-Mail ändern über `verifyBeforeUpdateEmail`, fehlt heute. (b) Eine Einstellungsseite „Neues Gerät" mit drei Sätzen: anmelden genügt, offline Gelerntes wird nachgetragen, die Sicherung ist nur ein Zusatz. (c) „In anderes Konto übertragen" = Sicherung dort einspielen, als geführter Ablauf.
- Nutzen: Bei einer öffentlichen Website ist das Pflicht; eine tote Mailadresse bedeutet sonst Kontoverlust.
- Risiko: E-Mail-Wechsel braucht eine frische Anmeldung und eine neue Mailvorlage in der Firebase-Konsole (Betreiber-Schritt).
- Beleg: `:3365`, `:4191`.

**11. Lesbares Archiv der Lernhistorie (S)**
- Was: Neben dem JSON eine für Menschen lesbare Datei (HTML oder CSV): Karten, Texte, Stand, Datum.
- Nutzen: In zehn Jahren ohne die App noch lesbar; stützt auch das Auskunftsrecht.
- Risiko: Überschneidet sich mit Druck/Export aus Runde 1; nur bauen, wenn dort nicht schon abgedeckt.

**12. Abfrager-Ansicht für zwei Personen an einem Gerät (S–M)**
- Was: Bei Texten zeigt der Bildschirm dem Abfragenden die ganze Zeile plus die nächste; er tippt „saß / gehakt / falsch". Bei Karten: Antwort sofort sichtbar und große Knöpfe.
- Nutzen: Bildet die verbreitete Form „jemand hört mich ab" ab, ohne Datenfluss zwischen Konten.
- Abgrenzung: Der „Abhör-Modus" aus Runde 1 war solo gedacht; mit jenem Agenten abgleichen.
- Risiko: gering; es ist nur eine andere Darstellung derselben Bewertung.

**13. Wochenplan zum Ausdrucken für den Lernkreis (S)**
- Was: Aus einem Text eine A4-Tabelle (Woche × Zeilenbereich, Spalten für Namen zum Abhaken) per Druck-CSS erzeugen.
- Risiko: Nischenfunktion; nur als Anhängsel an den Druck aus Runde 1.

**14. Andere Fächer und Sprachen (kein Bau)**
- Befund: Technisch geht es weitgehend schon – Schrift nach Zeichen erkannt (`:295`), Ziel „Etwas anderes" (`:1418`), „Bereiche".
- Empfehlung: nicht bewerben und nichts dafür bauen, aber auch nicht aktiv verhindern. Das Profil „Quran-/klassisches Arabisch" ist der Grund, warum jemand diese App statt Anki nimmt.

### Datenquellen (nur technisch; inhaltliche Eignung prüft der Betreiber)

- **OpenITI-Korpus:** sehr große Sammlung vormoderner arabischer Texte als Klartext, Lizenz CC BY-NC-SA 4.0 (https://zenodo.org/records/10007820). „NC" und „SA" sind für eine später vielleicht verkaufbare App ein Hindernis; die Texte sind zudem ungeprüfte Digitalisate.
- **Hadith-JSON-Sammlungen auf GitHub** (z. B. https://github.com/A7med3bdulbaset/hadith-json): von einer Website abgegriffen, im README keine Lizenz genannt → nicht verwendbar.
- **Fazit:** Außer Tanzil gibt es derzeit keine Quelle mit so klarer Lage. Der realistische Weg bleibt „Nutzer fügt selbst ein", verbessert durch die Punkte 1–3.

### Ehrliche Gewichtung

- **Macht das Werkzeug wirklich größer:** Punkte 1–3 zusammen (das Texte-Modul wird für alles außer Quran tauglich), Punkt 6 (die Brücke zwischen den zwei Säulen, das Alleinstellungsmerkmal) und Punkt 10 (Voraussetzung für „öffentlich und ernsthaft").
- **Klein und lohnend:** 5, 12.
- **Verzettelung:** 4, 7 (vorerst), 8, 13, 14. Punkt 9 ist eine echte Zielgruppenentscheidung, kein Selbstläufer.

## Teil 2 – Fragen an den Betreiber

**F1. Sollen eigene Texte außerhalb des Quran ausdrücklich unterstützt werden (Abschnitte, Halbverse, Vorspann)?**
Heute gibt es nur flache Zeilen. Der Einwilligungstext nennt Hadith-Bücher bereits (`app.js:11660`), das Konzept sagt „später, je Buch".
- a) Nein, nur Quran und flache Zeilen.
- b) Nur die Notizzeile (Punkt 1).
- c) Notizzeile plus Gliederung (Punkte 1–3), Inhalt weiterhin nur vom Nutzer eingefügt.
- Empfehlung: c, in zwei Schritten (erst 1, dann 2 und 3).

**F2. Darf eine Nutzer-Notiz/-Übersetzung auch an Quran-Zeilen stehen?**
Technisch ist es dasselbe Feld; die App schriebe nichts selbst. Es stünde aber selbst Getipptes neben der Aya.
- a) Ja, überall.
- b) Nur bei eigenen Texten.
- c) Bei Quran nur als „Notiz" beschriftet und nur auf Tipp sichtbar.
- Empfehlung: c. Das ist Deine Entscheidung, kein Agent beurteilt das.

**F3. Mitgelieferte Texte außer Quran – ja oder nein?**
Geprüft: OpenITI ist CC BY-NC-SA (nicht kommerziell, Weitergabe unter gleicher Lizenz); die frei kursierenden Hadith-JSONs haben keine Lizenz. Jede mitgelieferte Sammlung bräuchte Deine Auswahl, eine belegte Freigabe und eine Prüfsumme wie bei Tanzil.
- a) Nichts mitliefern.
- b) Du besorgst selbst eine schriftliche Freigabe für ein von Dir gewähltes Werk.
- Empfehlung: a, bis Du selbst ein Werk und eine Freigabe hast.

**F4. Alphabet-Einstieg für Menschen, die noch nicht lesen können?**
Das erweitert die Zielgruppe deutlich nach unten. Die Buchstabenformen kann ein Agent bauen; Umschrift, Lautbeschreibung und Beispielwörter müsstest Du freigeben. Ohne Ton lernt man die Aussprache nicht.
- a) Nein, die App setzt Lesen voraus und sagt das auf der Startseite.
- b) Nur Formen schreiben und erkennen, mit dem klaren Hinweis „Aussprache beim Lehrer".
- c) Voller Einstieg.
- Empfehlung: b, und erst nach F1 und F6.

**F5. Eigene Tonaufnahme nur auf dem Gerät?**
Sie erfordert, die Mikrofon-Sperre im Hosting zu öffnen. Aufnahmen wären nicht in der Sicherung, nicht auf dem zweiten Gerät, und in iOS-Safari ohne Home-Bildschirm nach 7 Tagen Nichtnutzung weg.
- a) Nicht bauen.
- b) Bauen als „flüchtige Hörhilfe" mit deutlichem Hinweis.
- Empfehlung: a. Wenn die Selbstaufnahme aus Runde 1 ohnehin kommt, dann lokal wie b und nie in der Cloud.

**F6. E-Mail-Adresse ändern einbauen?**
Heute kommt niemand an sein Konto, dessen Mailadresse wegfällt (Passwort-Zurücksetzen geht an die alte Adresse). Es braucht eine neue Mailvorlage in der Firebase-Konsole (Dein Schritt) und eine erneute Anmeldung vor dem Wechsel.
- a) Ja, vor der Öffnung für andere.
- b) Später.
- Empfehlung: a.

**F7. Lernplan mit Zieldatum: Ton?**
Die App würde nur rechnen.
- a) Nur „noch n Zeilen, das sind x pro Tag".
- b) Zusätzlich „im Plan / zurück".
- c) Gar nicht.
- Empfehlung: a. „Zurück" erzeugt den Druck, den die App sonst bewusst vermeidet (keine Wirkungszusage, `app.js:1421`).

**F8. Andere Fächer und Sprachen?**
Es funktioniert technisch schon.
- a) Stillschweigend möglich lassen (heutiger Zustand).
- b) Aktiv bewerben.
- c) Einschränken.
- Empfehlung: a.

Ungeprüft / Vermutung: Speicherbedarf der Aufnahmen; ob das Einspielen einer Sicherung Texte samt Kreis-Stand in allen Fällen verlustfrei wiederherstellt; die Überschneidung von Punkt 11 und 12 mit dem, was Runde 1 genau unter Druck/Export und Abhör-Modus versteht.

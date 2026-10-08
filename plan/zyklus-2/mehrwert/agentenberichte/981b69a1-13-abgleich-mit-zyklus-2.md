# Abgleich mit Zyklus 2

Wörtlich aus dem Chat 981b69a1, Agent 13, gestartet 2026-10-07 15:55 (Quelle: `agent-a3a612d564ff509b4.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 13 Agenten der ZWEITEN Runde für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build: app.js ~820 KB, styles.css, index.html, sw.js; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server). Betreiber ist ein Einzelner (minderjährig), Nutzer bisher er und wenige Freunde; Ziel: öffentliche, ernsthafte Lern-Website für deutschsprachige Muslime, die Quran-/klassisches Arabisch lernen. Neu im Probelauf (nur Betreiber-Konto): "Texte auswendig lernen" mit Quran aus Tanzil-Daten (quran/).
Der Betreiber hat entschieden: Er will ALLES Nützliche aus Runde 1 bauen, egal wie schwer. Runde 2 soll tiefer und weiter schauen als Runde 1.
ERGEBNIS RUNDE 1 (nicht wiederholen, sondern darauf aufbauen): Bestätigte Fehler: (a) "Nicht" dann "Sicher" in derselben Runde gibt sofort wieder vollen Abstand (app.js gradeCard ~5985-6069); (b) Sitzungslimit schneidet erste N statt dringendste (startSession ~5893); (c) Backup ohne Verlauf/Serie/Einstellungen (exportBackup ~4191); (d) keine indexierbare Seite (index.html noindex, robots.txt). Geplante Ideen: Liste einfügen F-1 mit Vorschau/CSV/Lektionszeilen; ohne Harakat abfragen F-2 bzw. Harakat-Leiter; Regal mit Betreiber-Kartensätzen als statische Dateien (zuerst Medina Buch 1); Rückkehr nach Pause (Berg strecken); Ruhetag; Urlaubsmodus; öffentliche Startseite + Proberunde ohne Konto; Bearbeiten in der Abfrage; Rundenende zeigt verpatzte Karten; Kennzahl "sicher gekonnt"; Trefferquote reifer Karten; Problemkarten mit Diagnose/Verwechslungspaare; Wake Lock; Druckansicht; Text-/CSV-Export; Einladungslink für Lektions-Code; Nachliefern unter demselben Code; Wochentakt-Freigabe; Harakat-Eingabeleiste; Handschrift in normaler Runde; zweite Richtung Deutsch→Arabisch F-5; Texte: Bestand eintragen ohne Lawine, Kreis über mehrere Texte, Juz/Hizb/Seite, Hinweis auf ähnliche Ayat (rechnerisch), Übergangs-Abfrage, Einstiegsprobe, lokale Selbstaufnahme, Abhör-Modus auf einem Gerät, lange Ayat an Waqf-Zeichen teilen, Schwachstellen je Zeile; Wort in Aya antippen → Karte; Quran-Konkordanz zur Karte; Wurzel-Familien/Abdeckung (hängt an GPL-Morphologiedaten). Als "nicht bauen" eingestuft: TTS, Spracherkennung, KI-Karten, automatische Bedeutungen/Konjugationen, Web Push, öffentliche Nutzer-Bibliothek, Klassenraum mit Schülerfortschritt, Kinderkonten, .apkg-Import, OCR, Abzeichen/Bestenlisten, Rezitations-Audio ohne schriftliche Lizenz.
HARTE REGELN: NUR LESEN. In einem anderen Chat wird gerade am Repo gearbeitet. Keine Datei im Repo anlegen/ändern/löschen, keine git-Befehle außer rein lesenden, keine Tests, keine Server, keine Skripte starten, nichts installieren. app.js nie komplett lesen: Grep, dann Ausschnitte.
Projektregeln: Religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte; keine Sekten/Organisationen/Politik; keine Speicherung religiöser Angaben. Keine Dark Patterns. DSGVO ernst. Lernlogik nur mit ausdrücklicher Betreiber-Entscheidung. Wichtige Dateien: plan/STAND.md, plan/LEHREN.md (116 KB, gezielt greppen), plan/grossplan/FUNKTIONEN.md und ENTSCHEIDUNGEN.md, plan/zyklus-2/AUFGABEN.md, ENTSCHEIDUNGEN.md und befunde/, plan/texte-lernen/KONZEPT.md und WIEDERHOLEN.md, plan/lehrer-modus/GERUEST.md, plan/onboarding/, README.md, CHANGELOG.md, firestore.rules, firebase.json.
AUSGABEFORMAT (Deutsch, max. ca. 1000 Wörter, kein Vorgeplänkel): Teil 1 "Befunde/Ideen" (8–14 Punkte; je Punkt: Titel, was genau, Nutzen, Aufwand S/M/L, Abhängigkeiten, Risiko/Gegenargument, Beleg Datei:Zeile oder URL). Teil 2 "Fragen an den Betreiber" (3–8 Fragen; jede so formuliert, dass er sie OHNE Nachschlagen beantworten kann: 2–3 Sätze Hintergrund, die Auswahlmöglichkeiten, deine Empfehlung mit einem Satz Begründung). Ehrlich gewichten. Ungeprüftes als Vermutung kennzeichnen.

DEIN AUFTRAG: Abgleich der Runde-1-Ideen mit dem laufenden Plan. Lies plan/zyklus-2/AUFGABEN.md vollständig, plan/zyklus-2/ENTSCHEIDUNGEN.md, plan/zyklus-2/CODEX-START.md (überfliegen), plan/grossplan/ENTSCHEIDUNGEN.md und FUNKTIONEN.md. Erstelle statt freier Ideen eine Abgleich-Liste: Für jede Runde-1-Idee und jeden bestätigten Fehler oben: (1) Ist das schon als Aufgabe/Entscheidung erfasst (Kennung nennen, z. B. E-05, Z7, C28, LERN-12)? (2) Kollidiert der Bau mit einem Zyklus-2-Paket A–F (gleiche Code-Stelle, gleiche Ansicht), sodass er erst danach oder zusammen damit kommen sollte? (3) Widerspricht es einer schon getroffenen Entscheidung (mit Datum/Zitatstelle)? Schlage daraus eine realistische Bau-Reihenfolge in Paketen vor (Paket G, H, I … im Stil von AUFGABEN.md), mit Abhängigkeiten zwischen den Paketen und einer groben Session-Schätzung je Paket. Nenne ausdrücklich die Ideen, die man technisch sofort parallel zu Zyklus 2 bauen könnte, ohne Dateikonflikt-Risiko (z. B. rein neue statische Dateien) – und die, bei denen das gefährlich wäre. Teil 2 wie beschrieben.

## Bericht des Agenten

## Teil 1 – Abgleich Runde 1 gegen den laufenden Plan

Gelesen: `plan/zyklus-2/AUFGABEN.md`, `ENTSCHEIDUNGEN.md`, `CODEX-START.md`, `LOGBUCH.md`, `plan/grossplan/ENTSCHEIDUNGEN.md`, `FUNKTIONEN.md`, `plan/STAND.md`; gezielt gegreppt in `plan/PLAN.md`, `texte-lernen/KONZEPT.md`, `lehrer-modus/GERUEST.md`, `firestore.rules`, `firebase.json`. Kein Code ausgeführt, nichts geändert.

**1. Die vier bestätigten Fehler sind erfasst, aber nie entschieden.**
- (a) = E-04, (b) = E-05, (c) = E-07, (d) = Phase 6/7.
- In `grossplan/ENTSCHEIDUNGEN.md:14-31` steht bei E-01 bis E-18 in der Spalte „Entschieden“ nur „–“. Das „alles wie empfohlen“ vom 01.10. gilt nur für Z1–Z18.
- Codex darf sie deshalb nicht bauen (`CODEX-START.md` § 6, Lernlogik ohne Antwort).
- Aufwand je S. Ohne ein ausdrückliches „E-04 a, E-05 ja“ bleibt Paket G gesperrt.

**2. Backup mit Verlauf/Serie/Einstellungen widerspricht der Empfehlung E-07.**
- Empfohlen war dort (b) „ehrlich benennen“; (a) „mitsichern“ nur auf Nachfrage, weil sich die Serie mit einer bearbeiteten Datei fälschen ließe (`grossplan/ENTSCHEIDUNGEN.md:117-125`).
- Gleiche Code-Stelle wie A8 (DATEN-4, Einspielen ohne Einwilligung), A12 (Einstellungen als ganzes Objekt), E5 (EINST-5) und Z13 (Wort „Sicherung“).
- Erst nach Paket A und E bauen. Aufwand M.

**3. „Regal, zuerst Medina Buch 1“ widerspricht zwei Festlegungen.**
- `plan/PLAN.md:737` (12.09.): „Medina-Kartensatz bleibt privat“.
- F-3: „erst, wenn ein eigener, rechtlich freier Satz existiert“ (`FUNKTIONEN.md:22`).
- Technik ist S (statische JSON-Dateien), der Inhalt ist die Sperre. Das alte `start-kartensatz.json` (50 Karten, `PLAN.md:747`) liegt nicht mehr im Wurzelverzeichnis.

**4. Ruhetag ist Z6b, aber anders definiert als in Runde 1.**
- Z6b meint „App geöffnet, nichts fällig“ (`zyklus-2/ENTSCHEIDUNGEN.md:32-69`), kein frei wählbarer Ruhetag. Offen, sperrt E7.
- Urlaubsmodus ist nirgends erfasst. Er liegt nahe an F-17 („Serie als Hebel“, lieber nicht).
- Beides ändert `serieAktuell` (`app.js:3031`), also nur einer nach dem anderen. Aufwand M.

**5. Rückkehr nach Pause ist Z7/LERN-11 („später“) und hängt an E-05.**
- Der Befund sagt selbst „E-05 zuerst“ (`befunde/LERN.md:118-127`).
- Berührt C5 (FORT-4, Pausensatz) und E25 (LERN-10). „Berg strecken“ geht über „erst einmal 20“ hinaus und ist Lernlogik. Aufwand M.

**6. Kennzahlen kollidieren direkt mit C28 (Z1-Umbau).**
- „Sicher gekonnt“ gehört zu C7/Z4 und C28; Problemkarten zu C19 (FORT-12) und den „Sorgenkindern“ in Z1.
- „Trefferquote reifer Karten“ reibt sich an F-13 und LEHREN § 3.5 („System nicht verraten“).
- Nicht getrennt bauen, sondern als Anforderung in den Z1-Entwurf geben, bevor Codex Fotos zeigt. Aufwand M.

**7. Rundenende und Abfrage: gleiche Ansicht wie Paket D und E.**
- „Verpatzte Karten am Rundenende“ trifft D6 (BEW-6) und E23 (LERN-8).
- „Bearbeiten in der Abfrage“ trifft C12 (VERW-2), C1 (G-118) und E21/E22.
- Wake Lock ist nicht erfasst und klein (S), sitzt aber in `startSession`. Alles erst nach D und E.

**8. F-1 und F-2 sind empfohlen (E-16), aber nicht entschieden.**
- F-1 berührt das Neu-Blatt (C1, C12, C27) und die Import-Grenze E-08; nach Paket C, M.
- F-2 braucht eine Betreiber-Antwort zur religiösen Seite (`FUNKTIONEN.md:21`); die Harakat-Leiter ist eine Erweiterung davon, S–M.
- F-5 und Handschrift in der normalen Runde gehören zusammen: eigenes Konzept, 3–4 Sessions, Regeln, L.
- Harakat-Eingabeleiste ist nicht erfasst.

**9. Einladungslink und Nachliefern berühren bewusst Entferntes.**
- Link-Teilen wurde in 3.6.0 abgelöst (`GERUEST.md` Abschnitt K, Reste bei `app.js:1307`). Ein Link, der nur den Code trägt, ist etwas anderes, muss aber ausdrücklich so begründet werden (LEHREN § 3.5).
- Nachliefern widerspricht „Inhalt bleibt unveränderlich“ (`GERUEST.md` Abschnitt M, Schritt 1) und braucht eine Regeländerung samt Deploy.
- Wochentakt widerspricht Abschnitt L („nur Lehrer-Klick entscheidet“).
- Aufwand M, Risiko liegt in den Regeln.

**10. Öffentliche Startseite ist Phase 6 (`zurückgestellt`), Proberunde ohne Konto ist schon beschlossen.**
- `landing.html` wurde am 23.09. auf Betreiber-Wunsch gelöscht (`PLAN.md:79`); „Probelauf ohne Konto wird gebaut“ steht in `PLAN.md:252`.
- `geteilteLektionen` ist nur für bestätigte Konten lesbar (`firestore.rules:317`). Die Proberunde muss also aus statischen Dateien kommen.
- Vorher: E-15 App Check („vor öffentlicher Werbung“), Rechtsprüfung (STAND § 6 Nr. 6), Paket B (Gast-Start B8). Aufwand L.

**11. Alle Texte-Ideen sind bis 29.10. gesperrt.**
- `CODEX-START.md:168`: an „Texte auswendig lernen“ nichts umbauen, der Probelauf läuft.
- Teilen von Texten ist T11 „später“ und steht unter „wird nicht gebaut“ (`KONZEPT.md:370`, `:491`).
- Selbstaufnahme: `firebase.json:57` und `:117` setzen `microphone=()`. Nötig wären Header-Änderung, `csp-build` und Datenschutztext; F-11b („eigene Tonaufnahmen“, lieber nicht) liegt nahe, auch wenn lokal etwas anderes ist.
- Langes Teilen an Waqf-Zeichen: heute wird an der Wortgrenze geteilt (`KONZEPT.md:456`). Wo geteilt wird, ist eine religiöse Wortlaut-Frage und gehört dem Betreiber.

**12. Wurzel-Familien widerspricht F-20.**
- Das Wurzelfeld wurde in 3.9.8 entfernt (`FUNKTIONEN.md:70`), dazu kommt die GPL-Frage der Morphologiedaten.
- Konkordanz und „Wort antippen → Karte“ sind nicht erfasst und hängen an der Texte-Freigabe.

**13. Druckansicht und Text/CSV-Export sind nicht erfasst und nicht widersprochen.**
- Druck ist fast nur CSS, also `styles.css`, dieselbe Datei wie Paket D und F12. Export sitzt neben `exportBackup` (`app.js:4191`). Je S.

### Vorgeschlagene Reihenfolge nach A–F und der Nachprüfung

| Paket | Inhalt | Braucht | Sessions |
|---|---|---|---|
| G | Lernkern: E-04, E-05, danach Z7/Pause, Z6b | Betreiber-Ja; Paket E fertig | 2 |
| H | Runde: verpatzte Karten, Bearbeiten in der Abfrage, Wake Lock | D, E | 2 |
| I | Eingeben und Ausgeben: F-1, CSV/Text-Export, Druck, Backup (E-07 a) | A, C | 3 |
| J | Harakat: F-2, Leiter, Eingabeleiste | G | 2 |
| K | Teilen: Einladungslink, Nachliefern, Regal-Technik | Regeln, freier Inhalt | 2–3 |
| L | Öffentlich: Startseite, Proberunde, `noindex`/SEO | B, K, E-15, Recht | 3–4 |
| M | Texte Runde 2 | Auswertung 29.10. | 4–6 |
| N | F-5 mit Handschrift | eigenes Konzept, J | 4 |
| O | Quran-Bezug: Konkordanz, Wort → Karte, Wurzeln | M, Lizenz | 3+ |

### Parallel zu Zyklus 2

- **Ohne Dateikonflikt möglich:** nur neue Dateien außerhalb von `app.js`, `styles.css`, `index.html`, `sw.js`, `firebase.json`.
  - Kartensatz-Dateien fürs Regal als JSON (Inhalt vom Betreiber).
  - Vorberechnete Tabellen als Datei: Juz/Hizb/Seite und ähnliche Ayat aus `quran/tanzil-quran-data.xml`.
  - Konzepte unter `plan/` für F-5, Startseite, Texte Runde 2.
  - Neue `t_*.js`-Gegenproben für E-04/E-05.
- **Auch dabei zu beachten:** `plan/**` und `**/*.md` werden nicht ausgeliefert, JSON im Wurzelverzeichnis schon (`firebase.json:9-21`). `pruefe_stand.mjs` könnte neue Dateien bemängeln (Vermutung, nicht geprüft).
- **Gefährlich:** alles in `app.js` oder `styles.css` (`CODEX-START.md:162`, nie zwei Agenten gleichzeitig), jede Versionserhöhung, `firestore.rules`, `firebase.json`, jede Texte-Änderung vor dem 29.10.

## Teil 2 – Fragen an den Betreiber

**1. E-04 und E-05 jetzt freigeben?**
Beide Lernfehler aus Runde 1 stehen seit 25.09. als Fragen im Plan, aber ohne Deine Antwort; ohne die baut kein Agent sie. Die Pausen-Hilfe hängt an E-05.
- Auswahl: (a) beide ja wie empfohlen, (b) nur E-05, (c) warten.
- Empfehlung: (a), weil beide klein sind und andere Pakete sperren.

**2. Die übrigen alten Fragen E-01 bis E-18 pauschal „wie empfohlen“?**
Am 01.10. hast Du nur die Zyklus-2-Fragen so beantwortet; die 18 älteren sind formal offen. Manche sind in Zyklus 2 neu gestellt worden (Passwort ändern, Datenschutztext).
- Auswahl: (a) alle wie empfohlen, (b) einzeln durchgehen.
- Empfehlung: (a), aber E-07 und E-10 einzeln (Fragen 3 und 6 hier bzw. Religion).

**3. Sicherung: Serie, Kalender und Einstellungen mitsichern?**
Am 25.09. war die Empfehlung, nur ehrlich zu benennen, weil sich eine Serie mit einer bearbeiteten Datei fälschen ließe. Runde 1 nennt das Fehlen einen Fehler.
- Auswahl: (a) nur benennen, (b) alles mitsichern, nur in ein leeres Konto einspielbar, (c) Einstellungen und Kalender ja, Serie nein.
- Empfehlung: (b), weil die Serie nur Dich selbst betrifft und der Datenverlust schwerer wiegt.

**4. Medina Buch 1 ins Regal?**
Am 12.09. hast Du entschieden, dass dieser Satz privat bleibt; das Regal sollte erst mit einem rechtlich freien Satz kommen.
- Auswahl: (a) bleibt privat, Regal startet mit einem eigenen Satz von Dir, (b) Medina öffentlich nach geklärtem Urheberrecht, (c) Regal später.
- Empfehlung: (a), weil eigene Wortlisten rechtlich und inhaltlich Dir gehören.

**5. Ruhetag: welche Art?**
Offen ist Z6b: Ein Tag, an dem nichts fällig war und Du die App geöffnet hast, lässt die Serie nicht reißen. Runde 1 schlägt zusätzlich einen frei wählbaren Ruhetag und einen Urlaubsmodus vor.
- Auswahl: (a) nur Z6b, (b) Z6b plus ein fester Wochentag, (c) zusätzlich Urlaubsmodus.
- Empfehlung: (a) jetzt, weil jede weitere Ausnahme die Serie weniger ehrlich macht.

**6. Lektionen nachliefern unter demselben Code?**
Heute ist ein geteilter Satz unveränderlich; nur die Freigabe-Zahl darf wachsen. Nachliefern braucht eine neue Regel und einen Regel-Deploy.
- Auswahl: (a) ja, nur Anhängen neuer Lektionen, (b) nein, neuer Code je Fassung.
- Empfehlung: (a), weil Lehrende sonst jede Woche einen neuen Code verteilen.

**7. Texte: nach dem 29.10. zuerst was?**
Bis zur Auswertung darf nichts an den Texten geändert werden. Runde 1 hat rund zehn Ideen dazu.
- Auswahl: (a) Bestand eintragen ohne Lawine und Kreis über mehrere Texte, (b) Juz/Hizb und ähnliche Ayat, (c) Aufnahme und Abhören.
- Empfehlung: (a), weil es den Alltag eines Hafiz trifft und keine neuen Daten oder Berechtigungen braucht.

**8. Darf während Zyklus 2 ein zweiter Agent reine Datendateien und Konzepte anlegen?**
Codex arbeitet allein an `app.js` und `styles.css`. Neue JSON-Dateien und Plantexte stören das technisch nicht.
- Auswahl: (a) ja, nur neue Dateien, (b) nein, strikt nacheinander.
- Empfehlung: (a) nur für Konzepte unter `plan/`, weil Datendateien im Wurzelverzeichnis sofort mit ausgeliefert würden.

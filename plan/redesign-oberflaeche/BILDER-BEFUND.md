# Befund: die 108 Bilder aus der TikTok-Sammlung

**Angelegt:** 17. September 2026
**Quelle:** Ordner `C:\Users\USER\Desktop\design ideen aus dem internet für adrabic tool\`
(liegt **nicht** im Repo — nur auf dem Rechner des Betreibers). Alle Bilder
stammen vom TikTok-Konto `@ux_snacks`, das Beiträge anderer Designer
weiterverbreitet.
**Stand der App beim Abgleich:** 3.3.2 → nach Block 7: 3.4.0

---

## Worum es in dieser Datei geht — in einfachen Worten

Der Betreiber hat 108 Bilder mit Design-Tipps gesammelt. Jedes Bild wurde
**einzeln angesehen** und mit dem **echten Code** verglichen. Für jedes Bild
steht unten, was es sagt und was das für Adrabic heißt.

Die Regel dabei (siehe `AUFTRAG.md`): **„Ist schon da" zählt nur mit Beleg** —
also mit Datei und Zeilennummer. Und ein Tipp wird nicht umgesetzt, nur weil er
auf einem Bild stand. Was nicht passt, steht mit Grund da, statt zu fehlen.

### Was in der Sammlung steckt

| Bilder | Thema | Herkunft |
|---|---|---|
| 1–7 | 5 Grundgesetze guter Bedienung | @ux_snacks |
| 8–15 | Wann man **keine** Klappliste (Dropdown) nehmen sollte | @uxcoffeetime |
| 16–25 | Anmeldeformulare besser gestalten | Adrian K / designme.agency |
| 26–33 | Fehler bei dunklen Oberflächen | supercharge.design |
| 34–40 | Farben richtig einsetzen | @startuxdesign |
| 41–47 | Schlechtes Design vermeiden | figma.expert |
| 48–56 | Ein Design-Portfolio bauen | @startuxdesign |
| 57–78 | 20 Dos & Don'ts | Wadhah Aloui |
| 79–86 | Symbole (Icons) gestalten | Pixsel Academy |
| 87–95 | Texte in der Oberfläche („UX Writing") | Pixsel Academy |
| 96–108 | 10 Gesetze der Bedienpsychologie | vamshi.work |

**11 Bilder sind dieselbe Werbeseite** (Bild 7, 15, 25, 33, 40, 47, 56, 78, 86,
95, 108 — Dateien `…B9A945D3…`, alle byte-gleich). Sie werben für ein
kostenpflichtiges Buch und enthalten keinen Tipp. Echte Tipp-Bilder: **97**.

### Die Zeichen in der Tabelle

| Zeichen | Heißt |
|---|---|
| ✅ | **Ist schon da.** Beleg steht dabei. |
| 🔨 | **In dieser Session gebaut** (Block 7, Version 3.4.0). |
| 📋 | **Kommt in einen geplanten Block** (siehe `AUFTRAG.md`, Blöcke 8–10). |
| 🟡 | **Betreiber muss entscheiden** — steht in `plan/PLAN.md` unter „Offene Fragen". |
| ➖ | **Passt nicht zu Adrabic** — mit Grund. |
| ▫️ | **Kein Tipp** — Titelbild, Werbung oder reine Erklärung. |

### Kleines Wörterbuch

Die Bilder benutzen Fachwörter. Hier, was sie meinen:

| Wort auf dem Bild | Auf Deutsch |
|---|---|
| UI / UX | Oberfläche / wie sich die Bedienung anfühlt |
| CTA („Call to Action") | der Hauptknopf, z. B. „Anmelden" |
| Dropdown / Select | Klappliste — man tippt drauf, dann klappt eine Liste auf |
| Radio Button | runder Auswahlpunkt: nur **eine** Wahl möglich |
| Checkbox | Ankreuzkästchen: **mehrere** Wahlen möglich |
| Toggle / Switch | Schiebeschalter an/aus |
| Placeholder | grauer Hinweistext **im** Feld, verschwindet beim Tippen |
| Label | Beschriftung **über** dem Feld, bleibt stehen |
| Toast | kurze Meldung, die unten auftaucht und von selbst verschwindet |
| Skeleton Loading | graue Platzhalter-Balken, solange Inhalt lädt |
| Onboarding | die ersten Bildschirme für neue Nutzer |
| Touch Target | die Fläche, die man mit dem Finger treffen muss |
| Accent | die Betonungsfarbe |
| Dark Mode | dunkle Darstellung |
| Hick's Law | mehr Auswahl = längeres Zögern |
| Miller's Law | man behält nur wenige Dinge gleichzeitig im Kopf |
| Jakob's Law | Leute erwarten, dass es so geht wie in anderen Apps |
| Fitts's Law | große, nahe Knöpfe trifft man schneller |
| Von-Restorff-Effekt | das eine, was anders aussieht, fällt auf |
| Proximity (Nähe) | was nah beieinander steht, gehört zusammen |
| Serial Position | das Erste und Letzte einer Reihe merkt man sich |
| Tesler's Law | die App soll die Arbeit machen, nicht der Mensch |
| Doherty-Schwelle | die App muss sofort sichtbar reagieren |
| Peak-End-Regel | man erinnert sich an den Höhepunkt und das Ende |

---

## Der Befund, Bild für Bild

Reihenfolge = Reihenfolge des Herunterladens (Dateizeit). Die Kennung ist der
Anfang des Dateinamens `temp_image_…`.

### Karussell 1 — 5 Grundgesetze (Bild 1–7)

| Nr | Datei | Was das Bild sagt | Urteil für Adrabic |
|---|---|---|---|
| 1 | CE6457EF | Titel: „Dein Gehirn hasst schlechte Oberflächen — 5 Gesetze" | ▫️ Titelbild |
| 2 | C683AF19 | Hick: weniger Auswahl = schnellere Entscheidung | ✅ Einstellungen sind drei kurze Gruppen statt einer langen Liste (`app.js:4990`, Block 2). **Offen:** Verwalten-Werkzeugleiste zeigt fünf Handlungen gleichzeitig — steht schon im Logbuch (Eintrag Block 6), bleibt dort. |
| 3 | 6C3EA00C | Nähe: zusammengehörige Dinge eng, andere mit Abstand | ✅ Abstände kommen aus festen Stufen `--space-*` (`styles.css`, Abschnitt 1); Gruppen mit `.eyebrow`-Überschrift (`app.js:4997ff`) |
| 4 | 06BBA50C | Jakob: Anmelden-Knopf gefüllt, Registrieren als Umriss, „Passwort vergessen" als Link | ✅ Genau so gebaut: `app.js:4183` gefüllt, `4196` `secondary`, `4197` `linklike` |
| 5 | DB4E6785 | Miller: lange Formulare in Gruppen teilen | ✅ Kein Formular in der App hat mehr als drei Felder (Anmelden: `app.js:4150–4175`, Karte: `4442ff`) |
| 6 | BF368857 | Von Restorff: nur **ein** Knopf hervorgehoben | ✅ Ist Satz 1 der Gestaltungsregeln: „genau eine gefüllte Akzentfläche" (`styles.css:14`) |
| 7 | B9A945D3 | Werbung für ein 510-Seiten-Buch | ▫️ Werbung |

### Karussell 2 — Wann keine Klappliste (Bild 8–15)

| Nr | Datei | Was das Bild sagt | Urteil für Adrabic |
|---|---|---|---|
| 8 | 6B304C8E | Titel: „Wann man Dropdowns NICHT nimmt" | ▫️ Titelbild |
| 9 | 3A377D74 | Unter 5 Möglichkeiten: alle zeigen (Auswahlpunkte oder Chips) statt Klappliste | ✅ Helligkeit, Arabische Schrift, Karten pro Sitzung öffnen ein Blatt mit allen Möglichkeiten sichtbar (`app.js:5000–5010`, `wahl-sheet`). 📋 **Aber:** Die „Art der Speicherkarte" ist eine Klappliste mit nur 3 Möglichkeiten (`app.js:6535`) → Block 10 |
| 10 | DC818919 | Wenn Tippen leichter ist als Auswählen: Eingabefeld | ➖ Die App fragt nirgends Monat/Jahr oder Ähnliches ab |
| 11 | B5A303D7 | Ja/Nein: Schalter oder Kästchen statt Klappliste | ✅ „Handschriftlich üben" ist ein Kästchen, wirkt sofort (`app.js:6201`) |
| 12 | 68836906 | Sehr lange Liste: Suchfeld mit Vorschlägen | ✅ Verwalten hat ein Suchfeld mit Sofort-Treffern (`app.js:6246`) |
| 13 | 22046FCC | Zahlen: Eingabe oder Schieberegler statt Klappliste | 📋 „Üben von Stufe … bis Stufe …" sind **zwei** Klapplisten (`app.js:6193–6194`) → Block 10 |
| 14 | 00BCAB5B | Zahlenbereich: ein Regler mit zwei Griffen | 📋 derselbe Fall wie Bild 13 → Block 10 (dort wird entschieden: Chips, kein Regler — ein Regler mit zwei Griffen ist am Handy fummelig, siehe Block 10) |
| 15 | B9A945D3-2 | Werbung | ▫️ Werbung |

### Karussell 3 — Anmeldeformulare (Bild 16–25)

| Nr | Datei | Was das Bild sagt | Urteil für Adrabic |
|---|---|---|---|
| 16 | 135431A0 | Titel: „Anmeldeformulare besser gestalten, Teil 1" | ▫️ Titelbild |
| 17 | FE173359 | Beschriftung **über** dem Feld, nicht nur grauer Text im Feld | ✅ Jedes Feld hat ein `<label>` darüber (`app.js:4150ff`); die Regel steht in `styles.css:937` |
| 18 | 96A83C76 | Hauptknopf mind. 44 px hoch, klar abgesetzt | ✅ `--tap: 44px` (`styles.css:213`), Anmelden-Knopf gefüllt und volle Breite (`app.js:4183`) |
| 19 | 437A0D05 | Felder am Handy mind. 44 px, ca. 16 px Abstand | ✅ Felder 48 px hoch (`styles.css:957`), Abstand `--space-4` (`styles.css:946`) |
| 20 | 42786712 | Aufbau eines Anmeldebildschirms (Beschriftung, Feld, Knopf, Wechsel-Link) | ✅ Alle Teile vorhanden (`app.js:4143–4200`) |
| 21 | 8544B3C7 | „Passwort vergessen?" direkt am Passwortfeld, klein | ✅ teilweise — steht **unter** der Karte statt am Feld. Das ist eine **bewusste** Entscheidung (Kommentar `app.js:4192`: „Nebenwege gehören nicht zum Formular"). Nicht geändert. |
| 22 | 3F22927A | Anmelden mit Google/Apple anbieten | 🟡 Braucht Einstellungen in der Firebase-Konsole **und** eine Änderung der Datenschutzerklärung (Daten gehen dann an Google/Apple). Offene Frage 13 in `PLAN.md`. |
| 23 | 0E56F08E | Wechsel Anmelden ↔ Registrieren darf das Formular **nicht leeren** | 🔨 **War kaputt:** E-Mail und Passwort wurden bei jedem Wechsel **und nach jeder Fehlermeldung** gelöscht (live geprüft). Behoben in 3.4.0 (`app.js:4132` `authEingabenMerken`) |
| 24 | C6F3E8ED | Auge im Passwortfeld zum Anzeigen | 🔨 Gebaut in 3.4.0 (`app.js:4166–4172`, `styles.css:1011`) |
| 25 | B9A945D3-3 | Werbung | ▫️ Werbung |

### Karussell 4 — Fehler bei dunklen Oberflächen (Bild 26–33)

| Nr | Datei | Was das Bild sagt | Urteil für Adrabic |
|---|---|---|---|
| 26 | F6E0DA71 | Titel: „Diese Dark-UI-Fehler vermeiden" | ▫️ Titelbild |
| 27 | 61C63699 | Kein reines Schwarz mit reinem Weiß — zu harter Kontrast | 🟡 Hintergrund `#08080a` ist fast reines Schwarz (`styles.css:71`), Knopf-Hover wird reines Weiß `#ffffff` (`styles.css:120`). Die Schrift ist schon gedämpft (`#f5f3ec`). „Creme auf Fast-Schwarz" ist aber die **gewählte Marke** (wie das TikTok-Symbol). Offene Frage 12. |
| 28 | 895A0FC7 | Tiefe durch Flächentöne, nicht durch Schatten | ✅ Steht so in `styles.css:224ff`: „Tiefe kommt zuerst aus Flächenton + Haarlinie" |
| 29 | 42851B51 | Keine großen hellen Flächen im Dunkeln | ✅ Satz 1: nur **eine** gefüllte helle Fläche pro Bildschirm (`styles.css:14`) |
| 30 | A06CF908 | Keine grellen, übersättigten Farben | ✅ Grün `#6aa588` und Rot `#c96b52` sind gedämpft (`styles.css:93–94`) |
| 31 | 6B71B294 | Nicht annehmen, dass alle Dunkel wollen | ✅ Dunkel / Hell / Automatisch wählbar (`app.js:888`) |
| 32 | 6158583B | Farbe nur für Wichtiges, Rest bleibt dunkel | ✅ Satz 1 (`styles.css:14`) |
| 33 | B9A945D3-4 | Werbung | ▫️ Werbung |

### Karussell 5 — Farben richtig einsetzen (Bild 34–40)

| Nr | Datei | Was das Bild sagt | Urteil für Adrabic |
|---|---|---|---|
| 34 | C849EE50 | Titel: „Farbtheorie für Anfänger, Teil 2" | ▫️ Titelbild |
| 35 | 9C685DEF | 60-30-10: 60 % Grundfarbe, 30 % Hauptfarbe, 10 % Akzent (Beispiel Duolingo) | ✅ im Sinn: dunkle Flächen, cremefarbene Schrift, eine Akzentfläche (`styles.css:14`, Tokens ab `:60`) |
| 36 | 555EEA25 | Die kräftigste Farbe zieht das Auge zuerst | ✅ derselbe Satz 1 |
| 37 | 35AB14DC | Farbe für Rückmeldung: Grün = geklappt, Rot = Fehler | ✅ Farben da (`--positive`, `--negative`). 📋 **Aber:** Nach dem Speichern einer Karte kommt **gar keine** Rückmeldung — siehe Bild 105 → Block 8. Gelb für Warnung **bewusst nicht** (`styles.css:127`: vierte Farbe bräche Satz 1). |
| 38 | 1AE388E8 | Dunkel ist nicht einfach umgedreht: kein reines Weiß als Schrift | ✅ Schrift ist `#f5f3ec`, nicht `#fff` (`styles.css:82`) |
| 39 | 44F40C48 | Zustände: Normal, Schweben, Gedrückt, Fokus, Deaktiviert | ✅ alle fünf in `styles.css:805–806, 858ff, 979` |
| 40 | B9A945D3-5 | Werbung | ▫️ Werbung |

### Karussell 6 — Schlechtes Design vermeiden (Bild 41–47)

| Nr | Datei | Was das Bild sagt | Urteil für Adrabic |
|---|---|---|---|
| 41 | D1CA92DB | Abstände nicht alle gleich: Beschriftung eng am Feld, Gruppen weiter weg | ✅ Beschriftung `--space-2` am Feld (`styles.css:950`), Feld zu Feld `--space-4` (`:946`) |
| 42 | B73FCE68 | Titel: „Escape the bad design" | ▫️ Titelbild |
| 43 | 82919D6F | Menschliche Sprache: „In den Warenkorb" statt „Warenkorb" | ✅ Knöpfe sagen, was passiert: „Konto anlegen", „Link zusenden" (`app.js:4185, 4187`) |
| 44 | CB39E08F | Fehler sofort **am Feld** zeigen, nicht irgendwo unten | 📋 Leeres Karten-Formular meldet sich per **Dialogfenster** (`app.js:3466`), „Bitte einen Namen eingeben" als Kasten unter allen Feldern (`app.js:1906`) → Block 9. Die Gestaltung dafür gibt es schon, ungenutzt (`styles.css:985, 1020`). |
| 45 | C695DADF | Knöpfe sagen, was danach passiert („Abonnieren" statt „Absenden") | ✅ Alle Bestätigungsdialoge haben eigene Knopftexte wie „Endgültig löschen", „Anlegen" (`app.js:739, 2029, 2858, 2936 …`) |
| 46 | 8149DE3D | Weniger ist mehr: nicht alles auf einmal zeigen | ✅ Erklärungen liegen auf Unterseiten (Block 2, `app.js:4990` + `renderEinstellungenSeite`) |
| 47 | B9A945D3-6 | Werbung | ▫️ Werbung |

### Karussell 7 — Design-Portfolio (Bild 48–56)

Dieses Karussell richtet sich an Designer, die einen Job suchen. **Für ein
Lernwerkzeug trifft es nicht zu.** Zwei Gedanken passen trotzdem zur Arbeitsweise
im Repo und sind hier vermerkt, nicht gebaut.

| Nr | Datei | Was das Bild sagt | Urteil für Adrabic |
|---|---|---|---|
| 48 | EE9B6E05 | Titel: „Wie man sein erstes Portfolio NICHT baut" | ▫️ Titelbild |
| 49 | 2F9C8936 | Portfolio zeigt Denkweg, nicht nur schöne Bilder | ➖ kein Portfolio. (Das Logbuch macht genau das für jede Entscheidung.) |
| 50 | B3E669D3 | Echte Probleme lösen statt Spotify nachbauen | ➖ kein Portfolio |
| 51 | 1B3C8BB2 | Weg zeigen: Problem → Recherche → Entwurf → Ergebnis | ➖ kein Portfolio |
| 52 | D8277CD6 | KI darf helfen, aber nicht das Denken ersetzen | ➖ kein Portfolio |
| 53 | A0C0B783 | 3 starke Projekte statt 10 schwache | ➖ kein Portfolio |
| 54 | F0255A75 | Nicht auf perfekt warten, veröffentlichen und verbessern | ✅ Arbeitsweise im Repo: ein Block = eine Veröffentlichung (`AUFTRAG.md`) |
| 55 | EB6A49CA | Nie aufhören, weiterzubauen | ➖ kein Portfolio |
| 56 | B9A945D3-7 | Werbung | ▫️ Werbung |

### Karussell 8 — 20 Dos & Don'ts (Bild 57–78)

| Nr | Datei | Was das Bild sagt | Urteil für Adrabic |
|---|---|---|---|
| 57 | 01ADDA6E | Titel: „20 UX/UI Dos & Don'ts" | ▫️ Titelbild |
| 58 | 511E19D5 | Nicht zu karg: „Episode 1" statt „#1", „38 %" statt nur Balken | ✅ Zähler „Karte 1 von 11" auf der Lernbühne (Block 3), „x von y sitzen" (`app.js:5498`) |
| 59 | B75321F3 | Knöpfe in voller Breite | ✅ Hauptknöpfe im Anmeldeformular `.full` (`styles.css:854`, `app.js:4183`) |
| 60 | C622FAFA | Suchfeld mit Hinweis, **was** man suchen kann | ✅ „Wort, Übersetzung oder Notiz…" (`app.js:6246`) |
| 61 | 5C4EAAF0 | Zeigen, **wo** und **warum** ein Fehler ist (z. B. Passwort-Regeln) | 📋 Block 9 (derselbe Punkt wie Bild 44). Passwortlänge steht schon in der Beschriftung (`app.js:4163`). |
| 62 | B3B5F590 | Löschen-Knopf rot, nicht in der normalen Farbe | ✅ `button.danger` rot (`styles.css:842`), alle Lösch-Dialoge mit `danger: true` |
| 63 | 464E87B3 | Graue Platzhalter beim Laden statt Drehkreis | ➖ Die Karten kommen fast immer sofort aus dem Offline-Speicher; beim Start gibt es ein Markenbild mit Text „Deine Karten werden geladen…" und nach 9 s einen Hinweis mit Neu-Laden-Knopf (`app.js:3945–3949`). Ein Platzhalter-Gerüst wäre ein zweites Ladebild für denselben Moment. (Der Farbverlauf dafür, `--skeleton`, liegt ungenutzt in `styles.css:160` — Aufräumkandidat, kein Bau.) |
| 64 | C0A8C96A | Bedienelemente für Finger (Drehrad) statt Mini-Klapplisten | 📋 Stufen-Auswahl beim Üben → Block 10 |
| 65 | 2666F472 | Sanfte Farbverläufe, keine grellen | ✅ Nur ein Verlauf von Akzent-Schleier zu durchsichtig (`styles.css:1132, 1241`) |
| 66 | 3454A33F | Einführungsbildschirme überspringbar machen | ➖ Es gibt keine Einführungsbildschirme (bewusst, `PRINZIPIEN.md`: „kein erfundener Assistent") |
| 67 | 166B5E92 | Lange Formulare in Schritte teilen, Fortschritt zeigen | ✅ „Schritt 1 von 2 · Konto" (Block 5, `app.js:4149`) |
| 68 | 8D3EDA9D | Kein reines `#000000` / `#FFFFFF` — besser `#242424` / `#E7E9EB` | 🟡 derselbe Punkt wie Bild 27 → Offene Frage 12 |
| 69 | C08BF5AE | Feldform passend zur Eingabe (z. B. 4 Kästchen für einen Code) | ➖ Die App bestätigt per Link in der E-Mail, nicht per Code |
| 70 | FFF6BE9D | Die wichtige Handlung hervorheben | ✅ Satz 1 (`styles.css:14`) |
| 71 | 2B90EB16 | Knopftext klar: „Absenden/Abbrechen" statt „Ja/Nein" | ✅ Dialoge haben eigene Texte (siehe Bild 45). Rückfall-Text „Ja, weiter" (`app.js:7097`) wird von keinem Dialog mehr benutzt. |
| 72 | A83E2DD1 | Bei 2–3 Möglichkeiten alle zeigen, keine Klappliste | 📋 „Art der Speicherkarte" (`app.js:6535`) → Block 10 |
| 73 | 3FD90283 | Innere Ecken weniger rund als äußere | ✅ Radius wächst mit der Fläche: Feld 10 px, Karte 16/22 px (`styles.css:218–221`) |
| 74 | 56FD1E9E | Ähnliches zusammen gruppieren | ✅ Einstellungen: Darstellung / Lernen / Daten / Hilfe / Konto (`app.js:4997–5040`) |
| 75 | 676EDB98 | Einzelwahl = Punkte, Mehrfachwahl = Kästchen | ✅ Mehrere Speicherkarten zum Üben = Kästchen (`app.js:6182`); Einzelwahl im Blatt = Liste mit Haken |
| 76 | EECA2248 | Abstände so, dass Gruppen zusammengehören (12 / 24 / 32 px) | ✅ wie Bild 41 |
| 77 | BE9874C2 | Fortschrittsbalken ermutigen weiterzumachen | ✅ Tagesbalken (`app.js:5358`), Lektionsbalken, Stufenband (`styles.css:1218`) |
| 78 | B9A945D3-8 | Werbung | ▫️ Werbung |

### Karussell 9 — Symbole gestalten (Bild 79–86)

| Nr | Datei | Was das Bild sagt | Urteil für Adrabic |
|---|---|---|---|
| 79 | 05A8E0DF | Titel: „Dos & Don'ts für Icon-Design" | ▫️ Titelbild |
| 80 | 78437E8D | Symbole einfach halten | ✅ Alle Symbole sind wenige Linien (`app.js:428ff`) |
| 81 | B0EC24C0 | Optisch ausgleichen statt stur nach Zahlen | ➖ Zeichentipp für Symbol-Designer; die App zeichnet keine Abspiel-Symbole |
| 82 | 887D77B2 | Nicht verschiedene Stile mischen | ✅ Ein Stil: Linie, 1,6 px, runde Enden (`styles.css:402–408`); Emoji nur, wo SVG technisch nicht geht (`app.js:424`) |
| 83 | 895CF939 | Im Zeichenprogramm die echten Ränder anzeigen | ➖ Tipp fürs Zeichenprogramm (Figma), nicht für Code |
| 84 | A4435633 | Symbole, die man sofort versteht | ✅ Bekannte Formen: Stift, Mülleimer, Lupe, Pfeil (`app.js:428ff`) |
| 85 | A798F475 | Symbole von vorne, nicht schräg | ✅ Alle frontal |
| 86 | B9A945D3-9 | Werbung | ▫️ Werbung |

### Karussell 10 — Texte in der Oberfläche (Bild 87–95)

| Nr | Datei | Was das Bild sagt | Urteil für Adrabic |
|---|---|---|---|
| 87 | 52A75C87 | Titel: „UX Writing Dos & Don'ts" | ▫️ Titelbild |
| 88 | D76E2F14 | Erklärung: gute Texte machen Bedienung leichter | ▫️ Erklärung ohne eigenen Tipp |
| 89 | 7C87023C | „Senden" statt „Absenden" | ✅ wie Bild 45 |
| 90 | 89DDC105 | „Beitrag speichern" statt „Ja" | ✅ wie Bild 71 |
| 91 | 5779005E | Beim Warten sagen, **was** passiert, nicht nur „Bitte warten" | ✅ „Deine Karten werden geladen…", nach 9 s mit Erklärung (`app.js:3945–3949`) |
| 92 | 5879CF83 | Beschriftungen statt Platzhalter | ✅ wie Bild 17 |
| 93 | 8E78DE22 | Hinweis wird **rot am Feld**, wenn die Regel verletzt ist | 📋 Block 9 |
| 94 | 4CD24A12 | Fehlermeldung kurz, mit Beispiel | ✅ Kurze deutsche Meldungen, z. B. „E-Mail oder Passwort ist falsch." (`app.js:1873`) |
| 95 | B9A945D3-10 | Werbung | ▫️ Werbung |

### Karussell 11 — 10 Gesetze der Bedienpsychologie (Bild 96–108)

| Nr | Datei | Was das Bild sagt | Urteil für Adrabic |
|---|---|---|---|
| 96 | 6FB54BCD | Titel: „10 UX-Gesetze, bildlich erklärt" | ▫️ Titelbild |
| 97 | 701E1EEB | Jakob: vertraute Muster, z. B. Leiste unten mit Symbol + Wort | ✅ Schwebende Leiste unten (Block 6, v3.3.0) |
| 98 | 373C5967 | Hick: Auswahl verringern, eine Empfehlung vorgeben | ✅ wie Bild 2. **Offen im Logbuch:** Verwalten-Werkzeugleiste, „Smart Defaults" |
| 99 | B3A059BB | Fitts: wichtige Knöpfe groß und im Daumenbereich | ✅ Leiste unten, Bewerten-Knöpfe unten auf der Bühne (Block 3), 44 px (`styles.css:213`) |
| 100 | EF845774 | Miller: Inhalt in Häppchen | ✅ wie Bild 46 |
| 101 | E6540182 | Nähe: Beschriftung beim Feld, Gruppen mit Abstand | ✅ wie Bild 41 |
| 102 | 86219F52 | Von Restorff: die Empfehlung hebt sich ab | ✅ Satz 1 |
| 103 | 1E3DA2EF | Reihenfolge: Wichtiges an Anfang und Ende | ✅ „Lernen" ist der erste Reiter; Einstellungen enden mit Konto (`app.js:5027ff`) |
| 104 | DB6F5E68 | Tesler: die App übernimmt Arbeit (Vorausfüllen) | ✅ teilweise: Formular-Entwurf bleibt beim Schließen erhalten (`formDraft`, `app.js:4442`), Anmeldefelder mit `autocomplete` (`app.js:4160`). **Offen im Logbuch:** „Smart Defaults sind als passt eingestuft, aber nirgends umgesetzt" — braucht erst eine konkrete Stelle, nicht bauen ohne. |
| 105 | 0126AAAA | Doherty: sofort reagieren — Antippen → „Speichert…" → „Gespeichert ✓" | 📋 **Fund:** Es gibt eine fertige Kurzmeldung `zeigeToast()` (`app.js:1063`), die im ganzen Code **nie aufgerufen** wird (seit 3.0.0, `git log -S`). Wer eine Karte anlegt, sieht nur, dass das Formular leer wird. → Block 8 |
| 106 | D43C4152 | Peak-End: Höhepunkt und Ende bewusst gestalten | ✅ Ende einer Lernrunde hat einen eigenen Bildschirm „Für heute durch" (`app.js:5245`). 📋 Rückmeldung beim Speichern → Block 8 |
| 107 | 5B482B71 | Zusammenfassung: für Menschen gestalten, Regeln sind Richtschnur, kein Zwang | ▫️ Zusammenfassung |
| 108 | B9A945D3-11 | Werbung | ▫️ Werbung |

---

## Zusammenzählung

| Urteil (erstes Zeichen der Zeile) | Anzahl | Bilder |
|---|---|---|
| ▫️ kein Tipp (Titel, Werbung, Erklärung) | 24 | 1, 7, 8, 15, 16, 25, 26, 33, 34, 40, 42, 47, 48, 56, 57, 78, 79, 86, 87, 88, 95, 96, 107, 108 |
| ✅ schon da (mit Beleg) | 59 | 2, 3, 4, 5, 6, 9, 11, 12, 17, 18, 19, 20, 21, 28, 29, 30, 31, 32, 35, 36, 37, 38, 39, 41, 43, 45, 46, 54, 58, 59, 60, 62, 65, 67, 70, 71, 73, 74, 75, 76, 77, 80, 82, 84, 85, 89, 90, 91, 92, 94, 97, 98, 99, 100, 101, 102, 103, 104, 106 |
| 🔨 in dieser Session gebaut | 2 | 23, 24 |
| 📋 geplant (Block 8–10) | 8 | 13, 14, 44, 61, 64, 72, 93, 105 |
| 🟡 Betreiber entscheidet | 3 | 22, 27, 68 |
| ➖ passt nicht | 12 | 10, 49, 50, 51, 52, 53, 55, 63, 66, 69, 81, 83 |
| **Summe** | **108** | |

Sechs ✅-Zeilen tragen zusätzlich einen offenen Rest, der in einen Block
gehört oder schon im Logbuch steht: **9** (Klappliste „Art" → Block 10),
**37** und **106** (Rückmeldung → Block 8), **2** und **98** (Werkzeugleiste
Verwalten, Logbuch), **104** (Smart Defaults, Logbuch). Bild **21** ist ✅ mit
einer bewusst anders getroffenen Entscheidung.

**Alle 108 Bilder sind angesehen und haben eine Zeile.** Eine neue Session muss
den Bilderordner nicht noch einmal durchgehen.

## Was daraus folgt (Kurzfassung)

1. **Die App war in den Grundregeln schon auf Stand.** Über die Hälfte der
   Tipps ist belegbar umgesetzt — das ist das Ergebnis der Blöcke 1–6, nicht
   Zufall.
2. **Die echten Lücken liegen im Kleinen, bei der Rückmeldung:** Eingaben, die
   verschwinden (behoben), eine Bestätigung, die nie erscheint (Block 8),
   Fehler, die im Dialogfenster statt am Feld stehen (Block 9), und zwei
   Klapplisten, wo man die Wahl direkt sehen sollte (Block 10).
3. **Drei Punkte sind keine Gestaltungs-, sondern Betreiberfragen:** reines
   Schwarz/Weiß gegen die gewählte Marke, und Google/Apple-Anmeldung.

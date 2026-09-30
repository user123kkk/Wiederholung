# Logbuch: Texte auswendig lernen

Letzter Eintrag zuerst. Plan: [`KONZEPT.md`](KONZEPT.md), [`WIEDERHOLEN.md`](WIEDERHOLEN.md).

### 2026-09-30 — Stufe 7: Gesamtprüfung (Cloud) + Stichwort „ladegerät“

**Geändert:**
- `plan/werkzeuge/pruefstand/affe.js`: `AFFE_TEXTE=1` = Betreiber-Konto mit
  Testtext und Einwilligung; Text-Aktionen zu 60 % bevorzugt, Widerruf und
  „Text löschen“ ausgeschlossen (sonst endete der Lauf dort); zählt die
  Text-Aktionen. Ohne Schalter unverändert.
- `plan/werkzeuge/pruefstand/t_text_tempo.js` (neu): Sure 2 (286 Ayat),
  CPU 4×, lange Aufgaben je Schritt.
- `plan/werkzeuge/ladegeraet.ps1`, `ladegeraet.bat` (neu), `CLAUDE.md`
  Abschnitt „Stichwort ladegerät“: am Laptop Stand → Strom → alle Tests →
  Affe mit Texten → Regeln → Hosting; Abbruch beim ersten Rot.
**Ergebnisse (Cloud-Container):**
- Affe mit Texten: Handy 200 (Seed 7: 149 Text-Aktionen; Seed 23: 133),
  iPad 150 (92), klein 150 (100) – **0 Befunde**. Erreicht: Wiederholen,
  Aufdecken, Hakt/Fließend, Rückgängig, Kontrollfrage, Neu lernen, Zeile
  bearbeiten/Original, Anlegen-Wahl, Lernen-Tab.
- `t_text_tempo`: keine Aufgabe > 200 ms. Aufgaben > 50 ms (CPU 4×):
  Verwalten 94/79, Text öffnen 95/56/104, Wiederholen 56, Beenden 57/62,
  Lernen-Tab 60. Aufgeschlüsselt: JS für die Text-Ansicht 2,4 ms, Plan
  0,3 ms, Markieren 0,9 ms, `render()` 45 ms – der Rest ist Satz/Layout
  von 286 arabischen Zeilen durch den Browser (Zeilen haben schon
  `content-visibility`). **Befund, nicht behoben:** Ziel „kein Bild
  > 50 ms“ (KONZEPT § 13) im Container nicht erreicht; gleiche Größenordnung
  wie der bestehende Verwalten-Reiter. Abhilfe wäre nachgeladene Liste
  (erst 40 Zeilen, Rest beim Scrollen) – lohnt erst, wenn es am echten
  Gerät spürbar ist. Am Laptop/iPhone nachmessen.
- Voller Gesamtlauf (Stand `7264af9`, 3.18.7): **115/120 Exit 0**. Rot nur
  die 5 umgebungsbedingten (`t_boot_geometrie`, `t_dreh_lage`,
  `t_quran_datei` „offline trotzdem Netz“, `t_sw`, `t_verlauf_mehrgeraete`).
  `t_sw` wegen der neuen Schrift in `APP_SHELL` extra verglichen: die 9
  FEHLER-Zeilen sind **wortgleich** mit dem Lauf auf unverändertem 3.18.2.
  Am Laptop müssen alle 120 grün sein (Stichwort „ladegerät“).
**Nicht gemacht:** Mehrgeräte-Test gegen den Emulator (WIEDERHOLEN § 9) –
kein Emulator im Container; am Laptop mit `regeln_testen.sh`-Umgebung
nachholen. `ladegeraet.ps1` lief nie unter Windows (keine PowerShell im
Container) – der erste Lauf mit dem Stichwort ist sein Test.
**Nächster Schritt:** Betreiber: Stichwort „ladegerät“ am Laptop. Danach Stufe 8 = Probelauf
(4 Wochen, Betreiber lernt echt; wöchentlich die Probelauf-Werte aus den
Einstellungen ins Logbuch).

### 2026-09-30 — Stufe 6: Lernen-Tab, Fortschritt, Probelauf-Werte (3.18.7)

**Geändert:** `app.js`: Block „Lernen-Tab und Probelauf-Werte (Stufe 6)“
vor `renderTextWdh` (`textSitztSatz`, `lernenTexte`, `textHeute`,
`probelaufWerte`); `renderLernen`: `lernenTexte(b)` vor der Serie, ein
Bereich nur mit Texten zeigt Gruß + Texte + Serie statt „Noch nichts“;
`renderEinstellungen`: `probelaufWerte()` vor „Hilfe“;
`textLernenGueltig` erlaubt den Modus auch im Lernen-Tab (nicht während
einer Karten-Runde); `textLernenEnde` öffnet die Text-Ansicht nur im
Verwalten-Tab; Klick `text-heute`. `styles.css`: `.texte-lernen*`,
`.probelauf__zeile`, Desktop-Raster rechte Spalte (LEHREN § 6.2).
Version 3.18.7, Changelog. Prüfstand: `t_text_fortschritt.js` (neu).
**Entscheidung:**
- Balken nur fest + frisch gefüllt, neu = Spur (drei Wörter stehen im
  `aria-label`, keine Zahlen in der Anzeige).
- Status: „Heute: etwa N Minuten“ (WIEDERHOLEN § 5-Schätzung) / „Heute
  fertig“ / „Wiederholt – Neues möglich“ / „Noch nichts gelernt“.
- Ein Tipp: Fälliges zuerst, sonst Neu lernen, sonst Text-Ansicht.
- Probelauf-Zeilen zeigen Methoden-Zahlen – bewusst, nur für den
  Betreiber (Auswertung § 8), sonst gilt LEHREN § 6.9 weiter.
**Tests:** `t_text_fortschritt` grün (Balken 40/40, Minuten, Wiederholen
aus dem Lernen-Tab bis „Fertig“, Ring unverändert, `t` > 0, Serie zählt,
Probelauf-Zeilen, Desktop Spalte 2, Konto ohne Probelauf nichts;
Gegenprobe ohne Block rot). Bildschirmfotos Lernen/Einstellungen 390 px.
Regression grün: `t_lernen_start`, `t_start`, `t_a11y`, `t_kontrast`,
`t_sprung`, `t_serie`, `t_doppeltipp`, alle `t_text_*`, `t_quran_schrift`,
`t_regler_karten`.
**Offen:** wie zuvor (Laptop-Gesamtlauf, Regeln, iPhone-Eindruck).
**Nächster Schritt:** Stufe 7 (KONZEPT § 12): Gesamtprüfung – voller
Prüfstand, Zufallstest („Affe“) Handy 200 / iPad 150 mit Texten, CPU 4×
bei 286 Zeilen kein Bild > 50 ms, danach Übergabe/Claude-Prüfung nach
`grossplan/AUFTRAG.md` § 2c. Dann Probelauf starten (4 Wochen, Stufe 8).

### 2026-09-30 — Quran-Schrift: Amiri Quran für Kreiszeichen, Schrift an Textzeilen (3.18.6)

**Betreiber:** „weiß nicht ob A oder C … soll perfekt sein, sonst mach wie
du magst“. **Entschieden: A.**
**Geprüft vor der Entscheidung:**
- C (King-Fahd-Text zur King-Fahd-Schrift) wäre das Original-Paar, aber
  Quelle (qurancomplex.gov.sa) und tanzil.net aus dem Container nicht
  erreichbar, Lizenz des King-Fahd-Textes ungeprüft, Tausch der ganzen
  Textquelle samt Prüfsumme/Tests. Nicht jetzt.
- A: `@fontsource/amiri-quran` 5.3.0 (npm, OFL 1.1), arabische Teilmenge
  `amiri-quran-arabic-400-normal.woff2`, 45 KB, SHA-256 `35f4f02b…e733e`.
  fontTools: alle 69 Zeichen des Tanzil-Textes vorhanden, U+06DF/06E3/06EB
  als kleine Zeichen (keine Platzhalter). Sichtvergleich 1:1, 2:2, 2:5,
  2:6, 7:206, 11:41: Amiri Quran fehlerfrei, King-Fahd mit ◌ in 2:5, 2:6,
  11:41.
- B (Umlenken auf U+06E0) verworfen: falsches Zeichen für die echten 66
  U+06E0.
**Geändert:**
- `fonts/AmiriQuran-arabisch.woff2`, `fonts/AmiriQuran-OFL.txt` (neu);
  `sw.js` `ZUSATZ` (offline); `styles.css` `@font-face 'AmiriQuranTanzil'`
  + `.arabic.arabic-tanzil`; `impressum.html` Absatz Amiri Quran mit
  Lizenzlink.
- `app.js`: `KREIS_ZEICHEN`, `tanzilSchriftMarkieren(app)` nach
  `app.innerHTML` in `render()` – jedes `.arabic`-Element mit einem der drei
  Zeichen ganz in Amiri Quran (nie zwei Schriften in einem Wort: zerreißt
  die Verbindungen). Gilt auch für Karten (auch dort war der Kreis ein
  Fehler für alle).
- **Zweiter Fehler, schon seit Stufe 2:** `schriftAttr` lieferte ein eigenes
  `class`, an 4 Stellen stand davor schon `class="…"` → der Browser verwarf
  es, Textzeilen standen in einer Ersatzschrift (FreeSerif/Liberation).
  `schriftAttr(text, klassen)`; Vorschau, Text-Ansicht, Lern-Bühne,
  Kontrollfrage umgestellt. LEHREN § 15.
- Folgen sichtbar gemacht: verdeckte Punkte arabischer Zeilen rechts
  (`plaintext` machte sie links); Kontrollfrage zeigt nur Einstieg + drei
  Wörter (bei 320×568 lagen sie sonst unter fünf verdeckten Zeilen).
- Prüfstand: `t_quran_schrift.js` (neu). Version 3.18.6, Changelog.
**Tests:** `t_quran_schrift` grün (CDP: Zeilen mit Kreiszeichen nur
„Amiri Quran“, ohne nur „KFGQPC HAFS Uthmanic Script“, Karte ebenso;
Gegenprobe ohne Markieren rot). Bildschirmfotos 390/320: kein ◌, Seite =
Bildschirmhöhe. Weitere Läufe: nächster Absatz bzw. Commit.
- *Einheitlich je Text:* Hat eine Zeile eines Textes ein Kreiszeichen,
  steht der **ganze Text** in Amiri Quran (`textSchriftKlasse` am
  Container: Text-Ansicht, Lern-Bühne, Vorschau) – sonst wechselten in
  einer Sure die Schriftstile Zeile für Zeile. Sure 1 (ohne solche
  Zeichen) bleibt King-Fahd; `t_quran_schrift` prüft beides.
**Offen:** Echtes iPhone: Eindruck Amiri Quran (Betreiber).
**Nächster Schritt:** Stufe 6: Lernen-Tab-Block „Texte“, Fortschritt,
Probelauf-Zeile in den Einstellungen (KONZEPT § 8.1 Punkt 3,
WIEDERHOLEN § 8), Test `t_text_fortschritt.js`.

### 2026-09-30 — Stufe 5: Karten-Regler (3.18.5)

**Geändert:** `app.js`: `nextReviewForStufe(stufe, faktor)` (Faktor < 1
kürzt, mindestens 1 Tag); `gradeCard` ruft im Probelauf `reglerAntwort`
vor der Stufenänderung und nutzt den Faktor bei „Sicher“;
`undoLastGrade` → `reglerZurueck`; neuer Block „Karten-Regler (Stufe 5)“
vor `gradeKnown`. Version 3.18.5, Changelog. Prüfstand:
`t_regler_karten.js` (neu).
**Entscheidung:** Gezählt werden Antworten auf Karten mit Stufe ≥ 7 *vor*
der Antwort, nur in der Runde (nicht Üben). Nach 20 solchen Antworten
Prüfung (< 85 % → −0,1, > 95 % → +0,1, Grenzen 0,5/1,0), **danach wird das
Fenster geleert** – ohne eigenes Zählfeld (hätte eine Regeländerung
gebraucht) wäre „20 neue Antworten seit der letzten Prüfung“ nicht
erkennbar. Das Fenster ist damit 20 statt 50 Antworten. Rückgängig stellt
Faktor und Fenster zurück (Faktor 1 statt „fehlt“ ist gleichbedeutend).
Datenschutz deckt „Lernstatistik je Bereich“ schon ab (3.18.2).
**Tests:** `t_regler_karten` grün: 70 % → 0,9, gespeichert; Stufe 8 mit
Faktor 55 statt 61 Tage (Streuung im Test aus); Rückgängig auch der
20. Antwort; Karte außerhalb unverändert; Gegenprobe Konto ohne
Probelauf: kein Feld, 61 Tage. `abnahme_runde.js` **13/13 grün**.
**Offen:** wie Stufe 4 (Laptop-Gesamtlauf, Regeln).
**Nächster Schritt:** Schrift-Korrektur (Entscheidung A, Eintrag darüber
folgt), danach Stufe 6.

### 2026-09-30 — Stufe 4: Wiederholen (3.18.4) + Befund Quran-Schrift

**Geändert:**
- `app.js`: Block „Wiederholen (Stufe 4)“ vor `textZeileHtml`
  (`istFest`, `kreisAbschnitte`, `frischeBloecke`, `inAbschnitte`,
  `textWdhPlan`, `textWdhSekunden`/`textZuVielHeute`, `kreisNachstellen`,
  `kontrollWahl`, `textWdhStarten`/`-Stueck`/`-Antwort`/`-Bewerten`/
  `-Rueckgaengig`, `textKontrolle`, `renderTextWdh`); `ui.kreisHeute`;
  Text-Ansicht: „Wiederholen“ (wenn fällig), „Neu lernen“ danach
  zweitrangig, bei > 20 min Hinweis „Heute lieber das Gelernte halten“;
  `renderTextLernen` verzweigt bei `art: "wdh"`; 5 Klick-Fälle,
  `text-zeile-hakt` auch im Schritt `wdhHakt`. Version 3.18.4, Changelog.
- `styles.css`: `.text-kontrolle`.
- Prüfstand: `t_text_kreis.js`, `t_text_nachbarn.js`,
  `t_text_zustaende.js`, `kreis_sim.js` (Zusatz: Tag durchspielen),
  `text_lib.js` (`zeilenStore`, `FEST`, `opt.wort`).
- `plan/LEHREN.md` § 15: Zeile zum Schrift-Befund.
**Entscheidung:**
- *Tagesstück nicht auf 5er-Abschnitte aufgerundet* (Abweichung vom Wortlaut
  WIEDERHOLEN § 3): genau `ceil(fest/kreisTage)` Zeilen, diese in Abschnitte
  geteilt. Wörtlich wurden aus 2 Zeilen am Tag 5 und ein kleiner Text lief
  in 2 statt 7 Tagen durch; `kreisTage` hätte seinen Sinn verloren.
- *Abschnitt:* bis 5 aufeinanderfolgende Zeilen, eine Zeile > 200 Zeichen
  steht allein, am Textende beginnt ein neuer Abschnitt.
- *Heute schon erledigte Kreis-Zeilen* nur im Speicher (`ui.kreisHeute`);
  gespeichert ist `kreisTag` = ganzes Tagesstück erledigt. Neustart am
  selben Tag auf einem anderen Gerät → schlimmstenfalls mehr Wiederholung,
  nie weniger. Kein neues Cloud-Feld, keine Regeländerung.
- *Nachbarn* nur gelernte Zeilen (eine neue Zeile kann man nicht aufsagen).
- *Nur eine zu bewertende Zeile im Stück* → „Hakt“ bewertet direkt, ohne
  Auswahl-Schritt.
- *Kontrollfrage* bei jedem 10. Kreis-Abschnitt (Zähler im Speicher), nur
  wenn der Text ≥ 3 verschiedene erste Wörter hat.
**Tests:** `t_text_kreis`, `t_text_nachbarn`, `t_text_zustaende` grün, je
mit roter Gegenprobe (ohne Weiterrücken / ohne Zusammenlegen / Schwelle 8).
Dazu grün: `t_text_neu`, `t_anfangsbuchstaben`, `t_text_anlegen`,
`t_text_einwilligung`, `t_text_felder`, `t_text_ausschluss`,
`t_quran_fehler`, `t_serie`, `t_sprung`, `t_kontrast`, `t_a11y`,
`t_doppeltipp`. Bildschirmfotos 390/320 (Ansicht, Kontrollfrage, offen):
Seite = Bildschirmhöhe.
**Befund (wichtig, betrifft schon Stufe 2):** Die King-Fahd-Schrift
`UthmanicHafs1Ver18.ttf` zeichnet U+06DF (kleine hohe runde Null, 3988× in
2240 Ayat), U+06E3 und U+06EB als **gestrichelten Kreis ◌** (fontTools:
gleicher Umriss 96,-210,1351,1045; Bildschirmfoto bestätigt). Beispiel
أُو۟لَٰٓئِكَ, كَفَرُوا۟. Nur im Probelauf sichtbar. Die Prüfung aus Stufe 2
sah nur, *welche* Schrift zeichnet (LEHREN § 15). **Nicht selbst
behoben**, weil die Wahl der Ersatz-Glyphe die Darstellung des Wortlauts
betrifft (CLAUDE.md Grundsatz 2) – Frage an den Betreiber:
- A (Empfehlung): eine Tanzil-taugliche freie Quran-Schrift mitliefern
  (z. B. Amiri Quran, OFL) nur für Tanzil-Text; Wortlaut unverändert,
  alle Zeichen richtig. Kosten: eine Schriftdatei mehr (Größe prüfen),
  Lizenz ins Impressum.
- B: nur in der Anzeige U+06DF auf die Glyphe U+06E0 der King-Fahd-Schrift
  umlenken. Klein, aber U+06E0 ist eigentlich die *rechteckige* Null – die
  66 echten U+06E0 sähen dann gleich aus. Nicht empfohlen.
- C: King-Fahd-Text statt Tanzil (Lizenz/Quelle neu prüfen). Groß.
**Offen:**
- **Betreiber:** Schrift-Frage A/B/C; Regeln aus 3.18.0 veröffentlichen.
- Laptop: Gesamtlauf und `t_bestand_tempo` (5 Tests sind in der Cloud
  umgebungsbedingt rot, siehe Stufe 3).
- Mehrgeräte-Test mit echtem SDK gegen den Emulator (WIEDERHOLEN § 9) –
  braucht Emulator, am Laptop.
**Nächster Schritt:** Stufe 5: Karten-Regler (WIEDERHOLEN § 6, Test
`t_regler_karten.js`). Vorüberlegung: Ohne neues Cloud-Feld gibt es keinen
Zähler „20 neue Antworten seit der letzten Prüfung“ → nach jeder Prüfung
`festErgebnisse` leeren (Fenster = die letzten 20 seit der Prüfung).

### 2026-09-30 — Stufe 3: Neu lernen (3.18.3), Gesamtlauf in der Cloud

**Geändert:**
- `app.js`: Block „Neu lernen (Stufe 3)“ nach `renderTextAnsicht` (aus
  `entwurf-stufe3/s3_block.js` + `s3_render.js`; Regex der
  Anfangsbuchstaben als `\u`-Escapes, Auftrag als `<h1>`), neu
  `textLernenGueltig()` (Konto, Reiter, Schalter, Text/Zeile noch da);
  Protokollart „t“ in `normVerlauf`, `tagGelernt` (w+n+t), 3 Art-Listen;
  `ui.textLernen`; `imModus` + Inhalt in `renderMain`; Ansicht-Schlüssel,
  Tiefe, `tabSchonAktiv`; 4 Reset-Stellen + Widerruf; Knopf „Neu lernen“ in
  der Text-Ansicht; 11 Klick-Fälle. Version 3.18.3 (`app.js`, `sw.js`,
  `index.html` inkl. Startbild-Links), `CHANGELOG.md`.
- `styles.css`: Block aus `entwurf-stufe3/s3.css`; Knopfreihe mit
  `padding: 0 var(--space-3)` (bei 320 px brach „Noch nicht“ um, Knopf
  3 px höher → Sprung beim Aufdecken, von `t_text_neu` gefunden).
- Prüfstand: `t_text_neu.js`, `t_anfangsbuchstaben.js` (neu).
**Entscheidung:** Neu lernen ist ein Modus im Verwalten-Reiter (keine
Navigation, feste Knopfreihe), weil der Text dort geöffnet wird. Der Entwurf
wurde sonst unverändert übernommen.
**Tests:** `t_text_neu` OK bei 390×844 und 320×568 (Schritte 1–8,
Denkpause mit echtem Tipp an die Stelle – `p.click` wartet bei
`aria-disabled` selbst und hätte die Sperre verdeckt –, Sperre nach dem
Aufdecken, Hakt, Rückgängig, Abbruch speichert nichts, Seite nie höher als
der Bildschirm, eine `h1`); Gegenprobe ohne `verlaufZaehle("t")` rot.
`t_anfangsbuchstaben` OK (13 Stellen aus der Fixture + deutscher Satz);
Gegenprobe ohne Entfernen der Zeichen rot. Gesamtlauf (Cloud-Container,
Linux-Chromium): 108/113 Exit 0. Rot: `t_boot_geometrie`, `t_dreh_lage`
(Gegenprobe), `t_quran_datei` (Browser-Teil „offline trotzdem Netz“),
`t_sw`, `t_verlauf_mehrgeraete` – **alle fünf genauso rot auf unverändertem
3.18.2** (git worktree, Port 8299): Umgebung (Schriften, Proxy), nicht
Stufe 3. `t_bestand_tempo` in dieser Umgebung grün.
**Befund (Frage an den Betreiber, nicht gebaut):** Anfangsbuchstaben nach
§ 8.3 zeigen bei Wörtern mit Artikel immer ٱ (1:1 → „ب ٱ ٱ ٱ“). Dafür, den
Artikel zu überspringen: echte Gedächtnisstütze. Dagegen: Abweichung vom
Plan, eigene Regel für ال/ٱل. Empfehlung: im Probelauf so lassen, nach
Rückmeldung entscheiden.
**Offen:**
- **Betreiber:** Regeln aus 3.18.0 vor dem Hosting veröffentlichen.
- Die fünf umgebungsbedingt roten Tests sowie `t_bestand_tempo` am Laptop
  (Ladegerät) nachprüfen, bevor veröffentlicht wird.
- Echtes iPhone: Lern-Ansicht, lange Aya, Denkpause.
**Nächster Schritt:** Stufe 4 (Wiederholen, `WIEDERHOLEN.md` § 1–5, § 7
Kontrollfrage; Tests § 9).

### 2026-09-30 — Stufe 2: Anlegen, Einwilligung, Bearbeiten, Löschen (3.18.2)

**Geändert:**
- `app.js`: neuer Block „Texte anlegen, ansehen, bearbeiten“ vor
  `renderVerwalten` (`findText`, `textZeilenVon`, `zeilenZustand`,
  `quranLaden`/`quranLesen`/`quranAya`, `texteEinwilligungHolen`,
  `textAnlegenStarten`/`-Pruefen`/`-Ausfuehren`, `zeileSpeichern`,
  `zeileOriginal`, `zeileEinfuegen`, `zeileLoeschen`, `textLoeschen`,
  `textEntfernen`, `texteWiderrufen`) und Oberfläche (`renderTexteBlock`,
  `renderTextAnlegen`, `renderTextAnsicht`, `neuWahlSheet`,
  `zeileEditSheet`); `renderVerwalten` (Seiten, Knopf „Neu“, Texte-Block);
  `ui` (+`neuWahl`, `textAnlegen`, `textAnsicht`, `zeileEdit`); Overlay-
  Listen (`renderToast`, `renderMain` ×4, `schliesseObersteEbene`,
  `tabSchonAktiv`); Tab-Handler ×3 und `selectBereich` setzen Text-Seiten
  zurück; Klick-Verteiler (22 neue Aktionen); `input`- und neuer
  `change`-Listener; Nutzerdokument-Snapshot liest `texteEinwilligung`;
  `renderEinstellungen` (Widerruf), `renderKontoLoeschen` und
  `deleteBereich` nennen Texte. Version 3.18.2 an allen Stellen inkl. 31
  Startbild-Links (in 3.18.0 vergessen, siehe unten).
- `styles.css`: Block „Texte auswendig lernen (Stufe 2)“ am Ende.
- `datenschutzerklaerung.html` Punkt 5 (Absatz „Texte auswendig lernen“,
  Art. 9 Abs. 2 lit. a, Widerruf, Lernstatistik, Quran-Datei) und „Kurz
  gesagt“, Stand 29.09.; `impressum.html` Abschnitt „Quran-Text“
  (Quellenangabe laut Tanzil-Lizenz).
- Prüfstand: `t_text_anlegen.js`, `t_text_einwilligung.js`,
  `t_quran_fehler.js` (neu), `t_quran_datei.js` (Browser-Teil),
  `text_lib.js` (`uid`, `ersetze` für Gegenproben).
**Entscheidung:**
- *Auswahl in einem Blatt:* „Neu“ zeigt drei Zeilen – Karte, Text einfügen,
  Sure aus dem Quran – statt Karte/Text und danach noch einmal zwei Wege
  (Hick: eine Entscheidung statt zwei). Nur mit `texteFreigeschaltet()`;
  alle anderen sehen weiter „Karte hinzufügen“.
- *Anlegen und Text-Ansicht als Seiten* im Verwalten-Tab (großes Textfeld,
  lange Listen), Auswahl und Zeile-Bearbeiten als Blätter.
- *Einwilligung* wird gefragt, sobald man einen der beiden Text-Wege wählt;
  Schreiben ohne `await` (offline), Ablehnung nimmt sie zurück und meldet
  sich wie jeder Schreibfehler. Satz ohne religiösen Wortlaut.
- *Surenname* aus der Metadaten-Datei, Titel „Sure 2 ‹البقرة› · 1–10“ mit
  Richtungs-Klammern (U+2068/2069), sonst drehte die Schreibrichtung die
  Zahlen (am Bildschirm gesehen).
- *Bei Suren* kein Einfügen/Löschen einzelner Ayat (Nummerierung), aber
  Bearbeiten und „Original wiederherstellen“; beim Speichern nur Ränder
  abschneiden, damit das Original genau getroffen wird.
- *Neue Zeile* entsteht erst beim Speichern (vorher legte „Neue Zeile
  danach“ sofort eine Zeile „…“ an).
- *Schrift:* Alle 68 Zeichen des Tanzil-Textes zeichnet
  `UthmanicHafs1Ver18.ttf` selbst (CDP `getPlatformFontsForNode`,
  Gegenprobe: eine Ziffer fällt auf Times New Roman zurück und wird
  gemeldet). Offen aus § 8.3 damit erledigt.
- *Konto-Bindung* der Entwürfe (`uid` in `textAnlegen`/`zeileEdit`): heute
  verwirft schon der Probelauf-Schalter den Entwurf in einem fremden Konto;
  die Bindung zählt nach der Freigabe für alle (Test stellt das nach).
**Tests:** `t_text_anlegen.js` OK (30 Quellzeilen Sure 2, Zusammen/Teilen,
kann-ich-schon 15/15, Bearbeiten mit gleichem Lernstand, Einfügen an
Position 2, Zeile löschen, echter Download → echtes Dateifeld: gleicher
Wortlaut und Stand, neue Nummern, Text löschen ohne Reste, Konto ohne
Probelauf sieht nichts). `t_text_einwilligung.js` OK; Gegenprobe ohne
Konto-Bindung: Entwurf in B sichtbar (rot wie erwartet).
`t_quran_datei.js` OK: Sure 1 (7) und Sure 2 (286) wortgleich, 2:282 mit
1208 Zeichen ungeteilt, offline liefert der Service Worker beide Dateien.
`t_quran_fehler.js` OK (2 Ladeversuche); Gegenprobe ohne Sperre: 484
Versuche. `t_text_felder`, `t_text_ausschluss` weiter OK. Gesamtlauf:
nächster Eintrag.
**Gegenprüfung:** gelesen: `git diff app.js` ohne Kommentare (alle neuen
Funktionen, Listener, Overlay-Listen), Bildschirmfotos (Verwalten, Auswahl,
Einwilligung, Sure-Seite, Text-Ansicht, Zeile). Gefunden und behoben vor
dem Commit: (1) **Endlosschleife**: scheiterte das Laden bei offener
Sure-Ansicht, lud jedes Neuzeichnen erneut (LEHREN § 6.7) – jetzt nur
auf Knopfdruck; (2) „Original wiederherstellen“ hätte Leerraum
zusammengefasst (im Tanzil-Text heute ohne Folgen, geprüft: keine
doppelten oder besonderen Leerzeichen); (3) Blatt „Neue Zeile“ ohne
Konto-Kennung wurde sofort verworfen (Test fand es); (4) verdrehter Titel;
(5) „Von/Bis Aya“ nicht auf einer Höhe (`.field + .field`).
**Korrektur zu 3.18.0:** Die 31 Startbild-Links standen noch auf
`?v=3.17.56`; `t_boot_geometrie.js` verlangt die aktuelle Version. Gefunden
hat es die parallele Runde-15-Session, weil ich nur eine Auswahl der Tests
hatte laufen lassen. In 3.18.2 behoben; LEHREN § 15.
**Offen:**
- **Betreiber:** Regeln (aus 3.18.0) vor dem Hosting veröffentlichen.
- Datenschutzerklärung: Rechtsprüfung durch eine echte Person (wie J1/F5).
- Echtes iPhone: Darstellung der Sure, Tastatur über dem großen Textfeld.
**Nächster Schritt:** siehe Eintrag „Pause“ direkt darunter (gehört zeitlich
nach diesem Eintrag, steht wegen des Zusammenhangs hier).

### 2026-09-30 — Pause auf Betreiber-Wunsch („mach später, wenn ich Laptop lade“)

**Geändert:** `plan/texte-lernen/entwurf-stufe3/` (Entwurf Stufe 3, noch
**nicht** in `app.js`: `s3_block.js` Logik, `s3_render.js` Sitzung,
`s3.css`, `ersetze.js` Hilfsskript für Ersetzungen mit CRLF).
**Stand:** Stufe 2 (3.18.2) ist in `app.js`, `styles.css`, `index.html`,
`sw.js`, `CHANGELOG.md`, Datenschutz, Impressum fertig und **lokal, nicht
committet**. Alle Text-Tests grün (`t_text_anlegen`, `t_text_einwilligung`,
`t_text_felder`, `t_text_ausschluss`, `t_quran_datei`, `t_quran_fehler`).
Gesamtlauf `alle_pruefen.js` zweimal unterbrochen (Internet/Session weg,
dann Pause): 25 bzw. 37 von 111 Tests liefen; rot nur `t_bestand_tempo.js`
(200 ms statt ≤ 100 ms) – gemessen im **Akkubetrieb bei 22 %**, bekannte
Messbedingung (LEHREN § 5.3), noch nicht bewertet.
**Entscheidung:** Kein Commit ohne vollständigen Gesamtlauf (Lehre aus
3.18.0). Deshalb wartet 3.18.2 lokal.
**Offen:** Betreiber veröffentlicht Regeln aus 3.18.0 (unverändert offen).
Parallele Runde-15-Session hat 3.18.1 reserviert; vor dem Commit `git
fetch`, bei neuem `origin/main` rebasen und Version über dessen Nummer
setzen (alle Stellen inkl. 31 Startbild-Links).
**Nächster Schritt (bei „los weiter“, Laptop am Ladegerät):**
1. Server: `py -3 -m http.server 8199 --bind 127.0.0.1` im Repo.
2. `PRUEF_PORT=8199`, `CHROMIUM=C:\Program Files\Google\Chrome\Application\chrome.exe`,
   `node plan/werkzeuge/pruefstand/alle_pruefen.js --fortsetzen`.
3. `t_bestand_tempo.js` einzeln am Ladegerät; bei Rot gegen `a828371`
   (3.18.0) und `a4b5677` (3.17.56) unter gleichen Bedingungen vergleichen.
4. Alles grün → Logbuch-Tests ergänzen, Commit 3.18.2, Push.
5. Stufe 3: Entwurf aus `entwurf-stufe3/` einbauen – dazu Protokollart
   „t“ in `normVerlauf`, `verlaufZusammen`, `persistVerlauf` (Art-Listen
   `["w","n","u"]` → `+ "t"`) und `tagGelernt` (w+n+t); `imModus` um
   `ui.textLernen`, Knopf „Neu lernen“ in der Text-Ansicht, Klick-Fälle
   (`text-lernen-*`, `text-aufdecken`, `text-konnte`, `text-am-stueck`,
   `text-zeile-hakt`, `text-hakt-weiter`), `ui.textLernen` mit uid-Bindung,
   Auftrag als `<h1>`. Tests `t_text_neu.js`, `t_anfangsbuchstaben.js`
   (Fixture aus `fixtures/quran-stellen.json`), Kontrast des gedimmten
   Knopfs prüfen.

### 2026-09-29 — Stufe 1: Daten, Regeln, Schalter, Ausschluss (3.18.0)

**Geändert:**
- `app.js`: `normCard` (+`textId`, Stufe von Zeilen ≤ 7, Zeilen bis
  `MAX_ZEILE` 1500), `normSet`/`normTextSet`/`normErgebnisse`/`normRegler`/
  `bereichAufteilen` (neu, nach `sternIcon`), `kartenFelder` (`textId` nur
  bei Zeilen), `setFelder`/`textSetFelder`, `bereichFelder` (Zeilen, Texte,
  Regler), `normBereiche`, `bereicheMapToArray`, `bereicheAusSammlungen`,
  Snapshot-Teilabgleich in `sammlungenStarten`, `persistAllAusfuehren`,
  `verarbeiteImportDaten` (neue Nummern für Zeilen/Texte, `textId` und
  `kreisPos` umgeschrieben), `deleteBereich` (Bereich nur mit Text gilt
  nicht als leer), `umzugStarten`; Konstanten `SET_ART_TEXT`,
  `TEXT_FEST_STUFE`, `TEXT_FEST_DATUM`, `KREIS_TAGE_*`, `MAX_ZEILE`;
  Schalter `texteFreigeschaltet()` (nach `istBetreiber`). Version 3.18.0
  (`app.js`, `sw.js`, `index.html` ×2), `CHANGELOG.md`.
- `firestore.rules`: `nutzerFelder` + `texteEinwilligung` (Datum/null,
  löschbar); `bereichFelder` + `abstandFaktor` (Zahl 0,5–1), `festErgebnisse`
  (≤ 50 aus 0/1); `kartenFelder` + `textId` (≤ 200, löschbar); `wort` bis
  1500 nur mit `textId`, Länge wird auch geprüft, wenn sich `textId` ändert.
- `plan/phase-1-datenzugriff/regeln-pruefung.mjs`: T01–T25.
- Prüfstand: `text_lib.js`, `t_text_felder.js`, `t_text_ausschluss.js` (neu);
  alle Tests lesen den Port aus `PRUEF_PORT` (Standard 8099, 23 Dateien,
  nur die URL) – nötig, weil eine parallele Session (Großplan-Runde 15,
  eigener Worktree) Port 8099 belegt.
- `plan/texte-lernen/KONZEPT.md` § 7.5 (Restrisiko Set-Art), § 7.6 (neu),
  `plan/LEHREN.md` § 15 (Backslash-Vorfall).
**Entscheidung:**
- *Getrennte Listen im Speicher* (§ 7.6) statt 35 einzelner
  `!c.textId`-Filter. Grund: robust auch für künftigen Karten-Code; weniger
  Stellen (nur die Lade- und Schreibwege) statt vieler. Speicherung in der
  Cloud wie im Plan.
- *Neue Felder nur, wenn gesetzt* (`textId`, Regler). So schreiben normale
  Karten und Bereiche auch vor dem Regel-Deploy fehlerfrei (LEHREN § 8.1).
- *Zeilen bis 1500 Zeichen* statt Aya 2:282 zu teilen (Abweichung von
  § 7.4 für Quran-Texte): Eine Aya bleibt ein Lernschritt (T2), die
  Aya-Nummern bleiben durchgehend. Eigene Texte über 1500: Stufe 2 bietet
  Teilen an.
- *`sure` im Text-Set* (nur bei `quelle: "tanzil"`), damit „weicht vom
  Original ab“ (§ 9.5) die Aya finden kann. Set-Inhalte prüfen die Regeln
  nicht, keine Regeländerung nötig.
- *Schalter* `texteFreigeschaltet()` ist bewusst strenger als
  `istBetreiber()` (auch bei leerer Liste aus). Er steuert nur das Angebot;
  Laden und Schreiben funktionieren für jedes Konto.
- *Einwilligung:* In Stufe 1 nur Regel und Regeltest; Lesen/Schreiben kommt
  mit dem Einwilligungs-Dialog in Stufe 2.
- *`portion`* (WIEDERHOLEN.md § 10) wird nirgends sonst beschrieben – nicht
  angelegt. Bei Bedarf in Stufe 4.
**Tests:** Regeln 204/204 (Emulator); Gegenprobe mit Regeln aus `48002ad`:
7 abgelehnt (T01, T05, T08, T09, T12, T13, T21), wie erwartet.
`t_text_felder.js` OK in allen fünf Wegen (Neuladen, Vollschreiben, Import,
Umzug, Snapshot-Echo); `--gegenprobe` (app.js `48002ad`): alle fünf rot.
`t_text_ausschluss.js`: Konto mit Text zeigt Lernen/Verwalten/Fortschritt
Wort für Wort gleich wie ohne, Runde „Karte 1 von 12“ in beiden, Suche und
Duplikat-Warnung finden keine Zeile; `--gegenprobe`: 10 Unterschiede
(u. a. „Karte 1 von 18“, „50 Karten“). Regressionen (Chrome 154,
Windows, Port 8199, Quellstand `99601bb6…`): `abnahme_runde.js` 13/13 OK
(Ausgaben „(lesen)“ gelesen), `t_sprung`, `t_kontrast`, `t_a11y`,
`t_einstieg` (alle Geräte, 0 Sprünge, 0 Kontrastfunde), `t_quran_datei`,
`t_daten`, `t_persist`, `t_import_doppelt`, `t_import_stapel`,
`t_karten_snapshot`, `t_bereiche`, `t_konto_stapel` – alle Exit 0.
`pruefe_stand.mjs` grün, `node --check app.js` sauber.
**Gegenprüfung:** gelesen: kompletter `git diff app.js` (Stellen oben),
`firestore.rules`-Diff, alle Aufrufer von `kartenFelder`/`pfadKarte` mit
ganzem Wert (5594, 5013, 4607 … schreiben nur über `kartenFelder`;
`persistCardGrade` nur Einzelfelder), `kontoDatenLoeschen` und
`kartenEinesBereichsLoeschen` (löschen per Sammlung bzw. `bereichId` –
Zeilen gehen mit), `exportBackup` (serialisiert `bereiche` samt
`zeilen`/`texte`). Gefunden und behoben: (1) Regel ließ eine lange Zeile
durch, wenn nur `textId` gelöscht wurde (T25 rot → Prüfung auch bei
`textId`-Änderung); (2) zwei Regex ohne Backslash (LEHREN § 15);
(3) `deleteBereich` hielt einen Bereich nur mit Text für leer und löschte
ohne Sicherung. Nicht geprüft: echtes Firebase, echtes iPhone.
**Offen:**
- **Betreiber:** Regeln veröffentlichen, **vor** dem Hosting von 3.18.0
  (PLAN „Was Du noch tun musst“).
- Parallele Großplan-Runde 15 (3.17.57) in `C:/Users/USER/Wiederholung-r15`;
  wer zuerst pusht, auf den rebased der andere. Version springt nie zurück.
- Löschen-Dialog und Konto-Löschen nennen Texte noch nicht (Stufe 2).
**Nächster Schritt:** Regressionen auswerten, dann Commit 3.18.0 und
Stufe 2 (Anlegen selbst/Quran, Einwilligung, Bearbeiten, Löschen,
Sicherung, Datenschutzerklärung).

### 2026-09-29 — Stufe 0: Quran-Quelle, Datei, Prüfsumme, Code-Stellen, Fixtures

**Geändert:** `quran/tanzil-uthmani.txt`, `quran/tanzil-quran-data.xml`
(neu, unverändert von tanzil.net), `.gitattributes` (`quran/** -text`),
`plan/werkzeuge/pruefstand/t_quran_datei.js` (neu),
`plan/werkzeuge/pruefstand/fixtures/quran_stellen_erzeugen.js` und
`fixtures/quran-stellen.json` (neu), `plan/texte-lernen/KONZEPT.md` § 9,
§ 14, § 17.
**Entscheidung:**
- *Quelle:* King-Fahd-Entwicklerseite (`qurancomplex.gov.sa/en/techquran/dev/`)
  wieder nicht erreichbar (WebFetch: `ECONNREFUSED`, curl: Zeitüberschreitung
  nach 20 s). Bedingungen damit nicht belegbar → nach § 9 **Tanzil
  Uthmani 1.1**. Bedingungen wörtlich aus dem Lizenzblock der Datei:
  verbatim kopieren und verbreiten erlaubt, Ändern nicht; in Apps nutzbar,
  wenn die Quelle (Tanzil Project) deutlich genannt und auf tanzil.net
  verlinkt wird; der Copyright-Hinweis gehört in jede Kopie. Lizenz
  CC BY 3.0 (https://tanzil.net/docs/text_license). Der Download verlangt
  „I agree with Terms of Use“ – Betreiber hat im Chat zugestimmt.
- *Download:* `https://tanzil.net/pub/download/index.php?marks=true&sajdah=true&tatweel=true&quranType=uthmani&outType=txt-2&agree=true`
  = Standard-Häkchen der Seite (Pausen- und Sajda-Zeichen, Tatweel an;
  Rub-Zeichen aus). Metadaten: `https://tanzil.net/res/text/metadata/quran-data.xml`.
- *SHA-256:* Text `6933e133dd56db778c801bf738848454e43648105a151e8d84d86a7cae39ec5f`
  (1 396 087 Byte), Metadaten `8867c1d88191472adec9db694b3cd9f135b1a2ef580574d32cf888dcb22c5c7a`
  (77 234 Byte). UTF-8 ohne BOM, LF.
- *Zählung:* 114 Suren, 6236 Ayat, lückenlos in Reihenfolge, Aya-Zahl je
  Sure = Metadaten (Summe 6236).
- *Kein JSON:* Die App soll die Originaldatei selbst lesen, statt eine
  umgewandelte Kopie. Grund: Lizenz verbietet Ändern; die Prüfsumme gilt
  dann für genau die ausgelieferte Datei. Abweichung in § 9 vermerkt.
- *Basmala:* in der Quelldatei ist sie bei Sure 1 eigene Aya 1, bei den
  anderen Suren (außer 9) den ersten Wörtern von Aya 1 vorangestellt. Bleibt
  so (§ 15 „so wie in der Quelldatei“).
- *Lange Aya:* nur 2:282 (1208 Zeichen) liegt über `MAX_WORT`/Regel 1000.
  Nächstlängste 24:31 (766). Lösung nach § 7.4 in Stufe 2: an Wortgrenze
  teilen, Text unverändert.
- *Code-Stellen § 14:* Skript ordnet jede Zeile mit `.karten`/`currentCards()`
  ihrer Funktion zu → dieselben 51 Funktionen wie im Plan. Zusätzlich fünf
  Stellen, die Felder still verwerfen (`normCard`, `normSet` mit „text“ →
  „eigen“, `bereicheAusSammlungen`/`bereicheMapToArray` mit fester
  Set-Feldliste, `SET_ARTEN` in `setArtSheet`/`setArtAendern`) – in § 14
  ergänzt.
- *Fixtures:* nur Fundstellen + SHA-256 je Zeile, kein Wortlaut
  (LEHREN § 2). Tests lesen den Text aus der Quelldatei. 13 Stellen: Sure 1
  ganz, 2:1 (Basmala vorangestellt), 2:2 (Wort nur aus Waqf-Zeichen),
  2:282, 7:206 (Sajda), 9:1, 114:6. Für die späteren Tests gezählt: 3698
  Ayat mit Tatweel, 2652 mit Wort nur aus Waqf-Zeichen, 15 mit Sajda-Zeichen.
- *Keine Version:* Stufe 0 ändert kein Verhalten der App (`app.js`,
  `index.html`, `sw.js` unverändert; die Dateien unter `quran/` werden
  erst ab Stufe 2 geladen). Deshalb keine neue `APP_VERSION`; die erste
  Version des Baus kommt mit Stufe 1.
**Tests:** `node t_quran_datei.js` → 114 Suren, 6236 Ayat, 13 Stichproben
grün. Gegenproben (ein Shadda entfernt, eine Zeile entfernt, CRLF) jeweils
rot. `pruefe_stand.mjs` grün.
**Gegenprüfung:** gelesen: `git diff` (nur `.gitattributes` + neue Dateien),
Testcode gegen Befund (prüft Byte-Gleichheit, nicht nur Zeilenzahl – eine
geänderte Harakat fällt auf), Quelldatei-Kopf/Lizenzblock, `firebase.json`
(`quran/` wird ausgeliefert, nicht in `ignore`; Standard-Cache-Header). Nach
dem Commit: `git archive` (so exportiert `veroeffentlichen.ps1`) mit
`core.autocrlf=true` liefert dieselbe Prüfsumme (`e3438d3`: `6933e133…`,
Metadaten `8867c1d8…`). Gegenprobe: frischer Klon, Zeile `quran/** -text`
entfernt, gleiches `git archive` → `9e1a1336…` (Windows-Zeilenenden, rot).
Die Zeile in `.gitattributes` ist also nötig. Gefunden: nichts Weiteres.
**Offen:** (1) Darstellung des Tanzil-Textes mit der vorhandenen Schrift
`UthmanicHafs1Ver18.ttf` (King-Fahd-Kodierung) – in Stufe 2 am Bildschirm
prüfen (§ 8.3). (2) Quellenangabe + Link im Impressum und unter der
Sure-Auswahl – Stufe 2. (3) King-Fahd-Bedingungen bleiben unbelegt; ein
Wechsel später nur mit neuer Datei, neuer Prüfsumme und Test.
**Nächster Schritt:** Stufe 1 (§ 12): Daten (`textId`, Set-Art „text“,
Kreis- und Bereichsfelder durch alle F-Stellen), Firestore-Regeln mit
Emulator-Gegenprobe, Probelauf-Schalter, Ausschluss an allen A-Stellen;
Tests `t_text_ausschluss.js`, `t_text_felder.js`, `abnahme_runde.js` 13/13.

### 2026-09-29 — Bauauftrag; Arbeitsbaum für den Bau freigemacht

**Geändert:** `plan/PLAN.md` (Wo eine neue Session anfängt),
`plan/texte-lernen/KONZEPT.md` (Status, nächster Schritt), dieses Logbuch
neu, `plan/grossplan/runde15-unfertig.patch` (Sicherung).
**Entscheidung:** Betreiber: erst dieser Bau, dann die Codex-Runden, dann
Gesamtprüfung und neue Runden; Bau in einem neuen Claude-Chat. Im
Arbeitsbaum lag Codex' unfertige Runde 15 (3.17.57, 25 Dateien). Sie ist
nicht verworfen: `git stash` („Codex Runde 15 unfertig …“) und als Patch im
Repo; `git apply --check` gegen `a4b5677` erfolgreich. Der Bau startet von
`main` = 3.17.56.
**Offen:** Quran-Quelle/Bedingungen (Stufe 0). Weißes Aufblitzen beim Start
ist ein eigener offener Punkt, nicht Teil des Baus. Runde 15 nach dem Bau
einspielen.
**Nächster Schritt:** Stufe 0 nach `KONZEPT.md` § 12: Quran-Quelle und
Bedingungen klären, Datei + SHA-256, Zählung 114/6236; Liste § 14 gegen den
aktuellen Code prüfen; Fixtures.

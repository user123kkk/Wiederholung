# Arbeitsstand – hier weitermachen (wird laufend überschrieben)

## Aktuell 09.10.2026: ein Gesamtauftrag

Der Betreiber bestätigt: weiterarbeiten an den offenen App-Punkten,
Mehrwert-Ideen und Plänen; keine Pause. Aktuell bearbeitet wird deren
Teil Schutz/Zuverlässigkeit (ALLES-OFFEN § 3.1), nach der Tagesdeckel-Prüfung.
Die weitere Mehrwert-Arbeit bleibt Auftrag, sie wird nicht gleichzeitig
als gebaut geführt. Große Gesamtabnahme/Veröffentlichung später gesammelt.

- Online laut letztem Veröffentlichungsbeleg: 3.18.28 mit 3.18.27.
- Auf main: 3.18.29, Rechtsdialog erhält Plan und Eingaben.
- Uncommittet: 3.18.30 für A14/A15; 16 echte SDK-Fälle und 222 Regeln grün,
  Gesamtabnahme ausstehend. Gestoppter großer Lauf: 29/157 abgeschlossen,
  alle Exit 0; keine vollständige Abnahme. Entwurf unbedingt behalten.
- A16 neu offen: abgelehnte Tagesantwort verschwindet nach Neustart;
  feste Gegenprobe und zwei Kontrollen in VERLAUF-NEUSTART-2026-10-09.md.
- Tagesziel/Frage 10: Audit fertig, Empfehlung eines neuen dauerhaften
  Deckels zurückgenommen; gewünschtes Pensum, Zusatznutzen und
  Lernkriterium fehlen. Keine neue Tagesziel-Funktion bauen.

Maßgeblich: ../../ALLES-OFFEN.md und ../../STAND.md. Anschließend gilt
weiter die entschiedene Mehrwert-Reihenfolge aus GESAMTLISTE.md; zuerst
noch offene Lernrunde, dann Import/Backup, Darstellung/Einstieg und Konto.
Wartende Inhalte, Texte-Probelauf bis 29.10. und Geräteprüfungen bleiben
an ihre Bedingungen gebunden. Die folgenden Angaben vom 08.10. sind
historischer Verlauf und keine Meldung aktuell laufender Tests.

Für Claude **und** Codex. Der Betreiber ist am 08.10. ab etwa 11:50 für
über eine Stunde weg und will, dass ohne Rückfrage weitergebaut wird.
Sein Auftrag: alle Mehrwert-Punkte und alle offenen Punkte bauen, **große
Pakete vor Kleinkram**, jede Minute sichern. Reihenfolge und Überblick:
[`UEBERBLICK-OFFEN.md`](UEBERBLICK-OFFEN.md).

## Stand 08.10., 13:25 Uhr (Betreiber verlässt um 13:55 das WLAN)

- Gesamtlauf des Betreibers an 3.18.26 ist fertig: 149/152, drei
  Nachläufe grün, Affen 0 Befunde (Logbuch Zyklus 2, oberster Eintrag).
  Nichts neu veröffentlicht, online 3.18.26.
- **Entwurf 3.18.27 im Browser geprüft, bisher grün:** `t_liste_einfuegen`
  (3 Größen + geführt), `t_loeschen_rueckgaengig`, `t_liste_lesen` (13),
  `t_lernlogik` (12), `t_paket_f_struktur`, `t_paket_f_css`,
  `t_paket_f_texte`, `pruefe_stand.mjs`, `t_paket_d.js D1` mit der
  schärferen Abnahme (vier Lagen). `austritt.js` am Entwurf: 12–13
  Zwischenlagen beim Schließen (`schritt-2/daten/austritt-entwurf.log`).
- **13:43 Uhr: alle 27 betroffenen bestehenden Tests am Entwurf Exit 0**
  (`t_paket_d D1`, `t_paket_c_weiter`, `t_karten_blatt`, `t_neben_tippen`,
  `t_dialog_timer`, `t_rundenende`, `t_fluessig_ende`, `t_einstellungen`,
  `t_einst`, `t_einst_oben`, `t_verwalten`, `t_ueben`, `t_sprung`,
  `t_kontrast`, `t_a11y`, `t_daten`, `t_hick`, `t_zahlen`,
  `t_undo_verlauf`, `t_runde_lage`, `t_fotos_runde`, `t_sicher`,
  `t_doppeltipp`, `t_wischen`, `t_ansage`, `t_gross_alle`, `t_schreiben`).
  Logs in `%TEMP%\entwurf\`. Die beschreibenden Ausgaben sind **noch
  nicht einzeln gelesen** (LEHREN § 5.3), nur die Exit-Codes.
- **Läuft seit 13:44:** `abnahme_runde.js` am Entwurf (Log
  `%TEMP%\entwurfbnahme_runde.log`).
- **Noch nicht gelaufen:** Gesamtlauf und Affen am Entwurf.
- **Deshalb ist 3.18.27 noch nicht auf `main`.** Nächste Schritte: Ausgaben
  lesen, Rundenabnahme 13/13, dann Version (alle Stellen mit 3.18.26 in
  `index.html` – auch die 31 Startbild-Links –, `sw.js`, `app.js`),
  CHANGELOG (Entwurf unten), `pruefe_stand.mjs`, Commit, Push, danach
  `ladegeraet.ps1 -NurPruefen` am Netzteil.

## Nachtrag 08.10., nachmittags

- **3.18.27 ist auf `main`** (48bde8d), nicht veröffentlicht; die Abschnitte
  unten über den „Entwurf“ beschreiben den Weg dorthin. Der getrennte
  Ordner `Wiederholung-bew1` und der Patch sind damit überholt.
- Offen vor dem Veröffentlichen: `ladegeraet.ps1 -NurPruefen` am Netzteil
  (Gesamtlauf, Affen), eigene Tests für Export, Druck, Bildschirm-wach.
- Neu vom Betreiber: Durchlauf „Verständlichkeit“ über das ganze Tool
  (`GESAMTLISTE.md` Abschnitt 4a). Er schreibt später „weiter“.
- Skriptpunkt: `ladegeraet.ps1` soll vor den zwei Emulator-Tests prüfen,
  ob der Emulator noch antwortet.

## Nachtrag 08.10., ab 14:50 („weiter“)

- Voller Lauf `ladegeraet.ps1 -NurPruefen` an 3.18.27 läuft seit 14:52
  (156 Tests, Logs `%TEMP%\adrabic-pruefstand-gesamt\7223038b21480566\`,
  Ausgabe `%TEMP%\ladegeraet-nurpruefen-3.18.27.log`). Solange er läuft:
  **keine Browser-Tests und keine Änderung an App- oder Testdateien in
  diesem Ordner** (der Lauf-Server liefert ihn live aus).
- Durchlauf „Verständlichkeit“ ist als Bericht fertig:
  [`verstaendlichkeit/BERICHT.md`](verstaendlichkeit/BERICHT.md). Sieben
  Fragen an den Betreiber (Abschnitt 4). Eine Kleinigkeit ohne ihn: VS-5,
  „gesehen“ statt „gelernt“ (`app.js` 9945), nach dem Lauf.
- Danach weiter nach `GESAMTLISTE.md`, „Reihenfolge“ Punkt 2.

## Wo der Code liegt

- `main` (dieser Ordner und `origin/main`): App unverändert **3.18.26**.
- **Entwurf, ungeprüft im Browser:** getrennter Ordner
  `C:\Users\USER\Wiederholung-bew1` (git worktree, losgelöst von `main`).
  Derselbe Stand liegt als Patch hier im Repo und wird jede Minute neu
  geschrieben: [`schritt-2/bewegung-1-entwurf.patch`](schritt-2/bewegung-1-entwurf.patch)
  (enthält auch neue Testdateien). Anwenden auf sauberem `main`:
  `git apply --check <patch>` und dann `git apply <patch>`.

## Warum noch nichts auf `main` ist

Der Betreiber hat um etwa 10:45 `ladegeraet.bat` gestartet (aus
`Desktop\Wiederholung`, Stand c65fe6d = App 3.18.26). Der Lauf misst
Zeiten; parallele Browser-Tests könnten ihn rot machen. Deshalb bis zum
Ende des Laufs: **nur schreiben und `node --check`, keine Browser-Tests.**
Fortschritt: `ls %TEMP%\adrabic-pruefstand-gesamt\<neuester Ordner>` (152
Tests, danach Affen). Prozess: `cmd.exe … ladegeraet.bat`.

## Was im Entwurf steckt

| Teil | Inhalt | Geprüft |
|---|---|---|
| Bewegung 1 | A-1 Blatt gleitet beim Schließen (`element.animate`); A-2 Üben-Auswahl und Speicherkarten blenden ein; A-3 Einstellungen: Eintritt nur beim ersten Besuch; D1-Test verlangt vier Lagen | nur Syntax |
| Tippen in Blättern | V-1 `--tastatur` auch beim Verschieben des Ausschnitts (Verdachts-Fix, iPhone); V-3 `autocomplete="off"` im Eingabe-Dialog. V-2 noch **nicht** gebaut | nur Syntax |
| Paket I: Liste einfügen | `listeLesen()` (rein), Blatt mit Vorschau unter Verwalten → „Mehr“, Doppelte übersprungen, höchstens 1000 Zeilen; Tests `t_liste_lesen.js` (13 Fälle **grün**, ohne Browser) und `t_liste_einfuegen.js` | Leser grün, Blatt nur Syntax |
| Paket I: Export, Druck | „Als Liste speichern“ (CSV mit Strichpunkt) und „Drucken“ (eigene Tabelle, `@media print`) unter „Mehr“, nur eigene Bereiche | nur Syntax |
| Paket I: Löschen | Einzelkarte ohne Rückfrage, Meldung mit „Rückgängig“ (6 s) holt Karte, Platz und Speicherkarten zurück; `t_paket_c_weiter.js` C23 angepasst; neuer Test `t_loeschen_rueckgaengig.js` | nur Syntax |
| Paket I: Backup | volle Sicherung schreibt zusätzlich `verlauf`, `serie`, `einstellungen`, `format: 2` | nur Syntax |
| Paket H: Bildschirm wach | `bildschirmWach()` hält den Bildschirm während `ui.session` an (Wake Lock), neu geholt bei Rückkehr | nur Syntax |
| Paket H: Rundenende | Karten, die nicht saßen, zum Aufklappen (`s.nichtMal`, `s.nichtKarten`, Handlung `ende-nicht`); Kacheln in Knopf-Reihenfolge Nicht/Fast/Sicher, „nicht“ zählt Karten (Frage 23) | nur Syntax; **berührt die Lernrunde → `abnahme_runde.js` 13/13 Pflicht** |

| Paket G0 | Lernlogik-Kern zwischen Marken `//LERNLOGIK-ANFANG` … `-ENDE` in `app.js`; Bewertungsregel als `bewertungAnwenden()` herausgelöst (ohne Verhaltensänderung); allgemeiner Schalter `VORAB` / `vorab(name)` („betreiber“ / „alle“); Schnelltest `t_lernlogik.js` | **11 Fälle grün, ohne Browser**; Runde selbst noch nicht |
| Paket G, Frage 7 | „Sicher“ nach „Nicht“ in derselben Runde hebt die Stufe nicht, Karte kommt morgen; **nur im Betreiber-Konto** (`VORAB.nichtDannSicher = "betreiber"`) | Regel grün im Schnelltest; Runde noch nicht |

G0 ist bewusst **nicht** als eigene Datei gebaut: Eine zweite Startdatei
hieße `index.html`, `APP_SHELL` und Versions-Query anfassen, ohne dass der
Nutzen größer wäre als mit den Marken. Kann später nachgezogen werden.

| Paket G, Frage 9 | Neue Karte: erstes „Sicher“ hebt die Stufe nicht, Karte bleibt heute fällig und kommt in derselben Runde noch einmal (ans Ende gehängt); zweites „Sicher“ bringt Stufe 1 und „morgen“. „Fast“/„Nicht“ wie bisher. Abbruch dazwischen: Karte ist eingeführt, Stufe 0, heute fällig. **Nur im Betreiber-Konto** (`VORAB.neuZweimal`) | Regel grün im Schnelltest (12 Fälle); Runde noch nicht |

So ist Frage 9 ausgelegt (Entscheidung lautete nur „müssen zweimal
sitzen“): Die zweite Bewertung zählt im Tagesprotokoll als Wiederholung,
nicht noch einmal als neue Karte. Das Freischalten der nächsten Lektion
hängt am Höchststand und kommt damit erst nach dem zweiten „Sicher“.
Dem Betreiber beim nächsten Bericht so sagen; er kann es mit einem Wort
ändern.

**Korrektur 09.10.2026 nach Gegenprüfung:** Frage 10:
`TAGESDECKEL-AUDIT-2026-10-09.md` ist maßgeblich. Gekoppelte Startphasen
korrigiert; 450 Modellläufe, neun Auditfälle und Browser-Bereichsrunde grün.
Neuer dauerhafter Deckel derzeit nicht empfohlen, Rundengröße nicht als
Tagesziel umdeuten; Pensum, Zusatznutzen gegenüber vorhandenen Runden und
Lernkriterium fehlen für einen Rückkehr-Probelauf. Bereichsfolge bleibt
gemäß Betreiberentscheidung. Der nachfolgende Absatz ist ein historischer,
am 08.10. zurückgenommener Vorschlag; 60/30 gilt nicht.

Offen in Paket G (noch nicht gebaut): **Frage 10** (Tagesdeckel nach Pause,
Fälligkeiten bleiben). Braucht Zahlen und einen Satz auf dem
Lernen-Bildschirm (ab wie vielen fälligen Karten, wie viele am Tag, was
steht da). Vorschlag zum Vorlegen: greift ab mehr als 60 fälligen
Wiederholungen; heute die 30 dringendsten (`nachDringlichkeit`), Rest
bleibt fällig; nach den 30 steht „Für heute genug. Morgen geht es weiter.“
mit leisem „Weiterlernen“. Wortlaut und Zahlen entscheidet der Betreiber.

Noch nicht gebaut aus Paket H (braucht den Browser zum Hinsehen, weil es
die Lage in der Runde ändert): Karte in der Abfrage bearbeiten, „Runde
fortsetzen“ am selben Tag, einmalige Erklärung der drei Knöpfe (Wortlaut
vom Betreiber).

## Bewusst noch nicht gebaut (Paket I)

- **Backup zurückspielen** (Serie, Kalender, Einstellungen in ein leeres
  Konto): berührt Serie und `verlaufEpoche` (Regeln, Zähler über mehrere
  Geräte). Nur mit Emulator-Test (`t_verlauf_mehrgeraete.js` als Vorbild).
- **Lektionszeilen** in der eingefügten Liste (Frage 17: „werden gesperrte
  Lektionen“): berührt das Freischalten; eigener Schritt mit vollem Lauf.
  Bis dahin sind alle eingefügten Karten sofort als neu fällig.
- Import-Grenze 5 000 (E-08): gehört zu Paket J (Regeln).

## Sobald der Lauf fertig ist (Reihenfolge)

1. Logs des Laufs lesen, Ergebnis ins Logbuch (`CLAUDE.md`, Stichwort
   „ladegerät“, Schritt 2 und 3).
2. Eigenen Server starten (Port 8097 im Entwurfs-Ordner, `PRUEF_PORT`),
   prüfen, dass er den Entwurf liefert (LEHREN § 5.3).
3. Messen: `schritt-2/austritt.js` muss Zwischenlagen zeigen; neuer
   D1-Test am alten Stand rot, am Entwurf grün.
4. Neue Tests: `t_liste_einfuegen.js`, `t_loeschen_rueckgaengig.js`.
   Betroffene alte: `t_paket_d.js D1`, `t_paket_c_weiter.js`,
   `t_karten_blatt.js`, `t_neben_tippen.js`, `t_dialog_timer.js`,
   `t_einstellungen.js`, `t_einst.js`, `t_verwalten.js`, `t_ueben.js`,
   `t_sprung.js`, `t_kontrast.js`, `t_gross_alle.js`, `t_a11y.js`,
   `t_daten.js`, `t_hick.js`.
5. Fehler beheben, dann Version 3.18.27 (Liste aus `CLAUDE.md`: `app.js`,
   `sw.js`, zweimal `index.html`, `CHANGELOG.md`, `pruefe_stand.mjs`),
   LEHREN § 14, Commit auf `main`, Push.
6. Weil neue Bildschirme und Blätter überall betroffen sind: voller Lauf
   (`ladegeraet.ps1 -NurPruefen`) vor dem Veröffentlichen. Veröffentlicht
   wird nur auf das Stichwort des Betreibers.
7. Danach Paket H (Bearbeiten in der Abfrage, verpatzte Karten am
   Rundenende, Runde fortsetzen, Bildschirm wach).

## Entwurf des CHANGELOG-Eintrags für 3.18.27

### 3.18.27 – 8. Oktober 2026

**Viele Karten auf einmal, ruhigere Fenster, und der erste Teil der neuen
Lernregeln (nur im Betreiber-Konto).**

Neu:

- **Liste einfügen** (Verwalten → „Mehr“): viele Karten auf einmal aus einer
  eingefügten Liste. Eine Zeile je Karte, Wort und Übersetzung getrennt
  durch Tab, Strichpunkt oder „ – “, eine dritte Spalte wird zur Notiz.
  Steht Deutsch vorne, werden die Spalten getauscht. Vor dem Anlegen zeigt
  eine Vorschau, wie viele Karten entstehen, welche es schon gibt und welche
  Zeilen sich nicht lesen ließen. Höchstens 1000 Zeilen auf einmal.
- **Als Liste speichern** und **Drucken** (Verwalten → „Mehr“): der Bereich
  als Tabelle (CSV) oder auf Papier. Nur bei eigenen Bereichen.
- **Karte löschen ohne Rückfrage, dafür „Rückgängig“:** Eine einzelne Karte
  ist sofort gelöscht; sechs Sekunden lang holt „Rückgängig“ sie mit
  Lernstand, Platz in der Liste und ihren Speicherkarten zurück. Die
  Mehrfachauswahl fragt weiter nach.
- **Rundenende zeigt, was nicht saß:** „3 Karten saßen noch nicht“ zum
  Aufklappen. Die drei Kacheln stehen in der Reihenfolge der Knöpfe (Nicht,
  Fast, Sicher), und „nicht“ zählt Karten statt Antworten.
- **Der Bildschirm bleibt während einer Runde an**, wo das Gerät es kann.
- **Die volle Sicherung enthält jetzt auch Kalender, Serie und
  Einstellungen.** Eingespielt werden weiter nur die Karten; das
  Zurückspielen der Serie folgt als eigener Schritt.

Ruhiger:

- **Blätter und Dialoge gleiten beim Schließen nach unten.** Bisher sprangen
  sie in einem Bild aus dem Bildschirm (am iPhone bestätigt: „es ist einfach
  weg“). Der Test dazu erkannte den Sprung nicht und verlangt jetzt
  Zwischenlagen.
- „Üben“ und „Speicherkarten“ blenden beim Aufklappen kurz ein.
- Die Einstellungen spielen ihren Eintritt nur beim ersten Öffnen, nicht
  mehr bei jeder Rückkehr von einer Unterseite.
- Tastatur am iPhone (Verdachts-Fix nach einer Bildschirmaufnahme, am Gerät
  zu bestätigen): Verschiebt das iPhone beim Wechsel in ein Feld den
  Ausschnitt, bleibt das Blatt an der Tastatur, statt hochzurutschen und
  einen Streifen freizulassen. „Name ändern“ zeigt keine Vorschlagszeile
  des Systems mehr.

Lernregeln, vorerst **nur im Betreiber-Konto** (Schalter `VORAB` in
`app.js`; für alle erst nach seinem Ja):

- „Nicht“ und danach „Sicher“ in derselben Runde: Die Stufe steigt nicht,
  die Karte kommt morgen wieder. Bisher bekam ein eben vergessenes Wort
  sofort wieder den vollen Abstand.
- Eine neue Karte muss in der Runde zweimal sitzen: Das erste „Sicher“
  bringt sie in derselben Runde noch einmal, erst das zweite auf „morgen“.

Unter der Haube: Die Bewertungsregel steht als eigene Funktion in einem
markierten Block und hat Schnelltests ohne Browser (`t_lernlogik.js`).

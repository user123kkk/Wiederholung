# Arbeitsstand – hier weitermachen (wird laufend überschrieben)

Für Claude **und** Codex. Der Betreiber ist am 08.10. ab etwa 11:50 für
über eine Stunde weg und will, dass ohne Rückfrage weitergebaut wird.
Sein Auftrag: alle Mehrwert-Punkte und alle offenen Punkte bauen, **große
Pakete vor Kleinkram**, jede Minute sichern. Reihenfolge und Überblick:
[`UEBERBLICK-OFFEN.md`](UEBERBLICK-OFFEN.md).

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

Offen in Paket G (noch nicht gebaut, braucht eine genaue Festlegung):
Frage 9 (neue Karten müssen in der Runde zweimal sitzen) und Frage 10
(Tagesdeckel nach Pause, Fälligkeiten bleiben). Beides ändert, wie eine
Runde zusammengestellt wird; erst Regel aufschreiben, dann bauen.

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

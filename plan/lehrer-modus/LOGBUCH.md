# Logbuch: Lehrer-/Schülermodus

Fortlaufend, neuester Eintrag zuerst. Format aus `../../CLAUDE.md`.
Grundlage: [`GERUEST.md`](GERUEST.md), Abschnitte L und M.

### 2026-09-19 — Datei-„Zum Weitergeben" aus der App genommen (v3.7.2)

**Geändert:**
- `app.js`: Karte „Zum Weitergeben" / Knopf `export-weitergabe` entfernt; Funktion `exportWeitergabe()` und der Klick-Fall dazu weg. Inhalt und Warnungen leben in `weitergabeBestaetigung()` und werden von `teileLektionCode()` genutzt (Fortschritt und Lehrer). `baueWeitergabeBereich()` bleibt (Code-Teilen + Einspielen alter Dateien). Überschrift der Code-Karte wieder „Per Code teilen". `APP_VERSION` 3.7.2.
- `sw.js` `CACHE_NAME`, `index.html` `?v=` → 3.7.2, `CHANGELOG.md`.
- `plan/lehrer-modus/probelauf-lehrer.mjs`: prüft, dass der Datei-Knopf fehlt; zweiter Knopf heißt im aktuellen Stand „Code erzeugen".

**Entscheidung:** Datei-Export und „Code – Fortschritt schaltet frei" erzeugten denselben Satz (Stufe 0, erste Lektion offen, eigener Stand unberührt). Der Datei-Weg ist fürs Erste überflüssig; die sinnvollen Rückfragen (Karten ohne Lektion, eigene Speicherkarten, Veröffentlichungsnummer) gehören vor den Code, nicht in eine zweite Karte. Import einer schon erzeugten Datei bleibt unter Einspielen.

**Offen:** Datei-Export später wieder anbieten, falls ein Offline-Weg ohne Firestore gebraucht wird – Funktion ist nicht gelöscht im Sinne des Formats (`baueWeitergabeBereich` steht), nur der Knopf. Betreiber muss weiterhin `firestore.rules` deployen und `veroeffentlichen.bat` (aus dem vorigen Eintrag).

**Nächster Schritt:** Auf Zwei-Konten-Test und Regel-Deploy warten; kein weiterer Codepunkt aus diesem Auftrag.

### 2026-09-19 — „Lehrer gibt frei" gebaut und veröffentlicht (v3.7.0)

**Geändert:**
- `app.js` (Zeilen nach Neuvergabe grob): `lehrerGesteuert()` und der Lehrer-Zweig in `offeneLektionIds()` (~283–310; **die** freigegebene Änderung an der Lernlogik, sonst nichts); `normLehrerBindung()`, `bereichFelder()`, `normBereiche()`, `bereicheAusSammlungen()` tragen die Felder `teilFreigabe` / `lehrerCode` / `lehrerOffenBis` (und laden `teilCode` endlich mit); `teileLektionCode(modus)`, `lehrerFreigeben()`, `beendeTeilenCode()`, `codeEinloesen()`, `lehrerStandAktualisieren()` / `lehrerStaendeAktualisieren()` (~2900–3080); `satzZusammenfuehren()` und `verarbeiteImportDaten()` übernehmen die Bindung (~3150–3260); Einstellungs-Karte „Per Code teilen" mit zwei Knöpfen, Stand-Anzeige und „Nächste Lektion freigeben" (~5790); Aktionen `teile-lektion-code-lehrer`, `lehrer-freigeben`; Hinweistexte in `startDrillFromSets`, `startLernen`, `renderFaden`, `setBlock`; Auslöser für den Nachhol-Abruf in `datenZusammenbauen()` (nur erster Aufbau), `selectBereich()`, `verbindungGewechselt()` und ein `visibilitychange`-Listener.
- `firestore.rules`: `geteilteLektionen` mit optionalem `freigabe: { offenBis }` (`freigabeOk()`), `update` nur Ersteller / nur `freigabe` / nur nach oben / nur wenn beim Anlegen schon vorhanden; Bereichsfelder `teilFreigabe`, `lehrerCode`, `lehrerOffenBis`; Löschen der vier optionalen Felder (`!('x' in d)`).
- `plan/phase-1-datenzugriff/regeln-pruefung.mjs`: Fälle L01–L30.
- `plan/lehrer-modus/probelauf-lehrer.mjs` (neu): Durchlauf gegen die echte `app.js`.
- `APP_VERSION` / `CACHE_NAME` / `?v=` → 3.7.0, `CHANGELOG.md`.

**Entscheidung:**
- **Zwei Knöpfe statt Auswahldialog.** „Code – Fortschritt schaltet frei" bleibt der bisherige Weg, „Code – ich gebe frei" ist neu. Ein Dialog mit Wahl hätte einen neuen Dialogtyp gebraucht; zwei beschriftete Knöpfe sind auch für einen Lehrer ohne Erklärung lesbar.
- **Freigabe-Zähler im Datensatz, Spiegel am Sender-Bereich (`teilFreigabe`).** Beim Freigeben schreibt zuerst der Server, dann erst die eigene Anzeige — schlägt die Regel/das Netz fehl, behauptet die Anzeige nichts Falsches.
- **Modus = Vorhandensein von `freigabe`**, kein eigenes Modus-Feld: ein Zustand weniger, der auseinanderlaufen kann. Ein gewöhnlicher Code kann nachträglich **nicht** zum Lehrer-Code werden (Regel).
- **Empfänger holt den Stand mit einzelnem `getDoc`** (Start, Bereichswechsel, Rückkehr in die App, Netz wieder da; höchstens 1×/Minute/Bereich). Kein Dauer-Listener — wenige Lesevorgänge, wie in M gefordert. Fehler, fehlender Datensatz (Lehrer hat beendet), Offline: stiller Rückfall auf den letzten Stand, der nur steigen kann.
- **Bei Lehrer-Satz schaltet der Lernfortschritt nichts frei** — auch nicht zusätzlich (GERUEST L (b): „nur Lehrer-Klick"). Stellt jemand von Fortschritt auf Lehrer um, können bereits durch Fortschritt geöffnete Lektionen wieder zugehen; das ist der Preis der Entscheidung „nur Lehrer" und wird beim Umstellen im Dialog ausdrücklich genannt.
- **Vollschreiben darf die Bindung nicht löschen:** `bereichFelder()` schreibt die Felder mit, sobald sie gesetzt sind (`patchDoc` setzt ohne `merge`).
- **Nebenfund mitbehoben (gehörte zum Bau, weil sonst „Freigabe beenden/anzeigen" nach Neustart nicht funktioniert):** `teilCode` wurde beim Laden nie mitgelesen (`bereicheAusSammlungen`), und `firestore.rules` lehnte das Löschen des Feldes ab (Emulator mit alter Regeldatei: „TEILCODE LOESCHEN: ABGEWIESEN"). Beides war seit v3.6.0 so.

**Geprüft:**
- Regeln, Firestore-Emulator (Java 21 aus früherem Scratchpad, Emulator 1.22.0): **106 von 106** mit neuer Datei; mit der alten Datei (`HEAD`) 97 von 106 — genau die neuen legitimen Fälle fallen durch, die Fälle schlagen also an.
- App, Playwright + zustandsbehaftete Firestore-Attrappe (`probelauf-lehrer.mjs`): **34 von 34**, keine Konsolenfehler. Enthält den Regressionstest der Fortschritts-Logik (Satz ohne Lehrer-Stand: alles sitzt → alle Lektionen durch, keine Lehrer-Felder, kein Lehrer-Text), Neustart (Sender sieht Code + Stand wieder), Stand steigt nie sinkend, Wechsel Fortschritt → Lehrer ohne zweiten Bereich, Update mit erhaltener Bindung.
- **Nicht geprüft:** Echtes Firebase (Regel nicht deployt), zwei echte Konten, echtes Handy, Flugmodus. Regeln und Attrappe sind getrennt geprüft; ob beide zusammenpassen, zeigt erst der Test mit zwei Konten.

**Offen:**
- **Betreiber muss `firestore.rules` deployen** (`firebase deploy --only "firestore:rules"`) und `veroeffentlichen.bat` ausführen — ohne die Regel schlägt „Nächste Lektion freigeben" mit `permission-denied` fehl, und das Löschen von `teilCode` bleibt abgewiesen. Details unten in „Was Du noch tun musst" der Antwort und in `PLAN.md`.
- Test mit **zwei Konten** durch den Betreiber (Lehrer teilt/gibt frei, Schüler löst ein und sieht Lektion 2 nach Neustart).
- Der Datensatz enthält **nur die Lektionen zum Zeitpunkt des Teilens**. Legt der Lehrer später Lektionen an, erreicht die „Freigabe" sie nicht — dafür müsste er neu teilen. Bewusst nicht gelöst (Inhalt ist unveränderlich, siehe Regel).
- Der Lehrer kann die **Zahl** nicht zurücknehmen (Entscheidung: einmal offen bleibt offen). Ein versehentlicher Klick lässt sich nur durch „Teilen beenden" + neu teilen beheben; die Empfänger müssen dann den neuen Code einlösen (Update-Weg, Lernstand bleibt).
- Frage 5/C5 (Minderjährige) bleibt harte Sperre für **künftige server-gestützte** Varianten. Der Datensatz enthält weiterhin keine Empfängerdaten und keine Rückmeldung an den Sender; der Empfänger liest nur.

**Nächster Schritt:** Auf die Rückmeldung des Betreibers zum Zwei-Konten-Test warten; solange die Regel nicht deployt ist, gilt das Feature als **nicht fertig**. Danach ist der Nebenstrang wieder `zurückgestellt` (Ausbaustufen A–D im Gerüst bleiben unbeauftragt).

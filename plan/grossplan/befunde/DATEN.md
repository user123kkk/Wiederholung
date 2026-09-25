# Befunde DATEN (Verwalten, Karten, Bereiche, Import/Export, Code-Teilen)

Prüfstand-Skripte: `scratchpad/audit/DATEN/x_*.js` (Chromium, Firebase-Attrappe, Handy 390 px).

#### DATEN-1: Ein einziger „not-found"-Fehler macht aus geführten Sätzen normale Bereiche und kappt Teilen/Lehrer-Bindung
- Art: Fehler
- Schwere: kritisch
- Beleg: `app.js:2202` `if (e && e.code === "not-found") { … persistAll(); return; }`; `app.js:2234` persistAll schreibt je Bereich nur `{ name, order, sets }` per `stapel.set(…)` **ohne merge** (`app.js:2240`). Damit fallen `gefuehrt`, `satzId`, `satzVersion`, `teilCode`, `teilFreigabe`, `lehrerCode`, `lehrerOffenBis` weg; dazu werden alle Karten aus dem Speicher dieses Geräts neu geschrieben. Messung `x_notfound.js`: Karte k5 im Store gelöscht („anderes Gerät"), hier Übersetzung geändert und gespeichert → Bereich b1 vorher `{…satzId:"medina-own",satzVersion:3,teilCode:"ABCDE-FGHJK"}`, nachher `{name,order}`; geführter Bereich b3 vorher `{gefuehrt:true,satzId,lehrerCode,lehrerOffenBis:3}`, nachher `{name,order}`; die gelöschte Karte k5 war wieder da. Verifiziert (Attrappe wirft wie echtes Firestore `not-found` bei `update` auf fehlendes Dokument).
- Warum es stört: Zwei Geräte reichen (eins löscht eine Karte oder einen Bereich, das andere bearbeitet, sortiert, merkt oder verschiebt noch). Danach ist ein geführter Satz frei bearbeitbar, die nächste Ausgabe landet als Doppel-Bereich (Lernstand im falschen), der Lehrer-Stand ist weg, und ein geteilter Code läuft weiter, ohne dass die App ihn noch beenden kann. Fortschritt vom anderen Gerät wird mit dem alten Stand überschrieben, gelöschte Karten stehen wieder auf.
- Vorschlag: In `patchDoc` bei `not-found` **nicht** `persistAll()` aufrufen, sondern nur, wenn das Nutzerdokument selbst fehlt (erstes Anlegen). Für Karten/Bereiche: den Stapel ohne die Ops auf fehlende Dokumente erneut schicken oder verwerfen und neu laden. Zusätzlich `persistAll` die Bereichsfelder über `bereichFelder()` (ohne `karten`) schreiben lassen, damit es nie Felder verliert.
- Entscheidet: Agent
- Umsetzung: Opus
- Abnahme: `x_notfound.js` (oder neuer `t_zwei_geraete.js`): nach dem Speichern sind alle sieben Bereichsfelder unverändert, k5 bleibt gelöscht, die Änderung wird verworfen oder mit Hinweis gemeldet.

#### DATEN-2: Kartensatz-Update verschluckt eine neue Karte mit gleichem arabischem Wort und überschreibt die alte
- Art: Fehler
- Schwere: hoch
- Beleg: `app.js:3887` `let lokal = nachQuelle.get(q) || nachQuelle.get("w:" + c.wort);`. Der Wort-Ersatz greift auch, wenn die Karte der Datei eine eigene `quelleId` hat und die lokale Karte schon eine **andere** `quelleId`. Außerdem kann dieselbe lokale Karte mehrmals zugeordnet werden. Messung `x_merge.js`: lokal عَيْنٌ = „Auge" (Stufe 5, quelleId qa); Ausgabe 2 bringt qa „Auge", dazu qc عَيْنٌ = „Quelle". Ergebnis: Meldung „0 Karten dazu, 1 berichtigt"; Cloud `ka: عَيْنٌ=Quelle stufe5`, „Auge" ist weg, Lektion `cardIds:["ka","kb","ka"]` (doppelt). Verifiziert.
- Warum es stört: Gleichlautende Wörter mit zwei Bedeutungen sind im Arabischen häufig (عين, ذهب). Die Lernenden verlieren eine Karte, ihr Lernstand hängt an der falschen Bedeutung, und bei jeder weiteren Ausgabe kippt es hin und her.
- Vorschlag: In `satzUnterschied` und `satzZusammenfuehren` den Ersatz `w:` nur nutzen, wenn die Datei-Karte **keine** quelleId hat oder die lokale Karte keine hat. Jede lokale Karte höchstens einmal zuordnen (Set `vergeben`). Die cardIds in `uebersetzeIds` von Doppelten befreien.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: `x_merge.js` meldet „1 Karte dazu", die Cloud hat „Auge" (Stufe 5) und „Quelle" (neu, Stufe 0), die Lektion hat drei verschiedene IDs.

#### DATEN-3: Jede Sortierbewegung schreibt ALLE Karten des Bereichs
- Art: Verbesserung
- Schwere: hoch
- Beleg: `app.js:10996` `commitBereichOrder` → `patchDoc(ordnungPatch(currentBereich()))`; `ordnungPatch` (`app.js:2072`) setzt `.order` für **jede** Karte → ein Update pro Kartendokument. Das gilt auch für jeden Pfeiltasten-Schritt am Griff (`app.js:11087`), für „Umkehren" (`:4209`) und für „Verschieben" (`:4299`, ganze Zielliste). Verifiziert durch Lesen. Rechnung: 2000 Karten × 10 Ziehvorgänge = 20 000 Schreibvorgänge, das ist das Tages-Freikontingent (`phase-1-datenzugriff/LOGBUCH.md`, 19.09.) für das ganze Projekt.
- Warum es stört: Eine Nutzerin mit großem Satz kann beim Aufräumen allein das Tageskontingent verbrauchen. Danach scheitert für alle das Speichern (`resource-exhausted`), oder es entstehen Kosten.
- Vorschlag: Beim Laden die gespeicherte `order` je Karte merken (z. B. `c._ord`, nicht in `kartenFelder`). `ordnungPatch` schreibt nur Karten, deren Index sich vom gemerkten Wert unterscheidet. Beim Ziehen innerhalb einer Seite ändern sich nur die Karten zwischen alter und neuer Stelle. Neue Karten (`ordnungVorn`, negative Zahl) einmal normalisieren.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Zähler im Prüfstand (Ops je `commit`): Karte in einer 2000er-Liste um eine Stelle verschieben → höchstens 2 Kartendokumente geschrieben.

#### DATEN-4: Geteilte Kartensätze eines Fremden können doch Bilder von dessen Server laden
- Art: Fehler
- Schwere: mittel
- Beleg: Der Schutz aus 3.17.24 hängt an der Karte: `renderExtra(c.extra, …, !!c.quelleId)` (`app.js:7135, 7772, 9781, 9794, 10553`). Beim Einlösen übernimmt `normCard` die `quelleId` unverändert aus dem fremden Datensatz (`app.js:246`, Aufruf über `codeEinloesen` → `verarbeiteImportDaten`). Die Regel für `geteilteLektionen` prüft den Inhalt nicht (`firestore.rules:298–300`, nur `bereiche is list`, Größe 1). Wer den Datensatz selbst per SDK schreibt und `quelleId: null` setzt, bekommt beim Empfänger `<img src="https://sein-server/…png">` geladen, also dessen IP-Adresse. Vermutung zum Angriffsweg (nicht mit echtem Firebase nachgestellt), Codepfad verifiziert.
- Warum es stört: Das ist genau der Fall, den § 12 (LG München I) ausschließen soll. Ein Absender könnte sehen, wer seinen Code wann einlöst.
- Vorschlag: In `verarbeiteImportDaten` jeder Karte aus einem Code (und aus jeder `gefuehrt`-Datei) eine `quelleId` erzwingen (`c.quelleId || c.id`), bevor die IDs getauscht werden. Oder „fremd" am Bereich festmachen (`b.gefuehrt || b.satzId`) statt an der Karte.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Prüfstand mit Datensatz `quelleId:null` und Bild-URL: nach dem Einlösen gibt es keine Anfrage an den Bild-Host, das Bild erscheint als Link.

#### DATEN-5: Bilder in der Kartenliste sprengen die einzeilige Vorschau; http-Bilder brechen, Referer geht mit
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:10553` rendert `renderExtra` auch in der Listenzeile, `app.js:9988` baut `<img … style="max-width:100%">` ohne Höhe, `loading` und `referrerpolicy`. Messung `x_bild.js` (Foto `DATEN/daten-bild-liste.png`): Zeilen mit Bild-Notiz sind 238 px hoch statt 75 px, das Bild füllt die Liste, und beim Öffnen von Verwalten werden alle Bilder der Seite (bis 100) geladen, jeweils mit `referer`. Regex erlaubt `http://` (`/^https?:\/\/…/`), die CSP erlaubt nur `img-src 'self' data: https:` (`firebase.json:59`). Live gibt das also ein kaputtes Bild. Verifiziert (Höhe, Anfragen); CSP-Bruch aus dem Header abgeleitet.
- Warum es stört: Wer Bild-Karten nutzt, bekommt eine Liste, in der man kaum scrollen kann. Dazu viel Datenverbrauch am Handy.
- Vorschlag: In der Liste (`kartenListeInhalt`) statt des Bildes ein Symbol plus „Bild" zeigen (`renderExtra`-Variante `vorschau`). Sonst `loading="lazy" referrerpolicy="no-referrer" decoding="async"` setzen. Bilder nur bei `https://`, `http://` als Link.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: `x_bild.js`: Zeilenhöhe mit Bild = Zeilenhöhe ohne Bild (±2 px), 0 Bild-Anfragen beim Öffnen von Verwalten, `http://…png` als `<a>`.

#### DATEN-6: „Teilen beenden" kann scheitern, ohne es zu sagen; der Code bleibt dann lesbar
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:3633–3638`: zuerst `b.teilCode = null` und `patchDoc(… LOESCHEN)`, danach `try { await fb.deleteDoc(…) } catch (e) {}`. Genauso `bereichEntfernen` `geteiltLoeschen(b.teilCode).catch(() => {})` (`app.js:4189`). Scheitert das Löschen (z. B. `permission-denied` bei veraltetem Ausweis, § 8.2), ist der Datensatz noch da, die App kennt den Code aber nicht mehr. Verifiziert durch Lesen.
- Warum es stört: Der Bestätigungstext verspricht „Du kannst das Teilen jederzeit beenden" (`app.js:3450`). Hier stimmt das still nicht mehr (§ 7.2), und es gibt keinen zweiten Versuch.
- Vorschlag: Erst `deleteDoc` (mit `ausweisErneuernFuerSchreiben` bei `permission-denied`), erst bei Erfolg den lokalen Stand löschen. Bei Fehler `dlgAlert(fehlerKlartext(e))` und den Code stehen lassen. Beim Bereich-Löschen dasselbe **vor** dem Löschen (§ 6.8: was scheitern kann, zuerst).
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Prüfstand: `deleteDoc` wirft → Meldung sichtbar, `b.teilCode` bleibt, der Knopf „Teilen beenden" bleibt da.

#### DATEN-7: Code erzeugen merkt sich den Code, auch wenn das Speichern scheitert; keine Größenprüfung (1 MiB)
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:3569–3576` setzt `b.teilCode`, `satzVersion` und schreibt sie per `patchDoc`, **bevor** `setDoc(geteilteLektionen/…)` (`:3585`) läuft. Bei Fehler steht nur „Code nicht gespeichert", danach `teileLektionCode` → „wird schon über den Code … geteilt" (`:3558`). Der Datensatz enthält den ganzen Bereich (`baueWeitergabeBereich`). Ein Firestore-Dokument darf höchstens 1 MiB haben, Notizen bis 5000 Zeichen je Karte → schon ~200 Karten mit langen Notizen überschreiten das. Es gibt keine Vorabprüfung, der Kommentar `:3727` verspricht „bis 3000+ Karten". Verifiziert durch Lesen, Grenze nicht gemessen.
- Warum es stört: Wer einen großen Satz teilt, bekommt eine nichtssagende Meldung und danach einen Code, der nicht existiert.
- Vorschlag: Zuerst `setDoc`, erst bei Erfolg `teilCode`/`satzVersion` setzen und patchen. Vorher `new Blob([JSON.stringify(datensatz)]).size` gegen ~900 KB prüfen und in Worten melden („zu groß – teile ihn in zwei Bereiche" o. ä.).
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: `__FB.fail` beim `setDoc` → kein `teilCode` im Bereich, zweiter Versuch fragt wieder „Code erzeugen"; 1,2-MB-Satz → Hinweis vor dem Schreiben.

#### DATEN-8: „Alles sichern" sichert Serie, Kalender und Einstellungen nicht
- Art: Unvollständig
- Schwere: mittel
- Beleg: `app.js:3377–3381` Backup = `{ exportedAt, profil, bereiche }`, ohne `verlauf`, `streak`, `settings`. Der Text dazu (`app.js:8142`): „geht das Konto verloren, ist sie das Einzige, was bleibt". `verarbeiteImportDaten` liest nur `data.bereiche`. Verifiziert.
- Warum es stört: Nach einem Kontoverlust sind Karten und Stufen wieder da, Serie und Fortschritts-Kalender aber weg, obwohl „Alles" draufsteht.
- Vorschlag: Zwei Wege. (a) `verlauf` und `streak` mitsichern und beim Einspielen **nur in ein leeres Konto** übernehmen (keine Serie aus Fremddateien; das berührt die Serie, also Lernlogik). (b) Nur ehrlich benennen: Knopf/Text „Karten sichern", Satz „Serie und Kalender sind nicht enthalten".
- Entscheidet: Betreiber
- Umsetzung: Sonnet
- Abnahme: (a) Backup enthält `verlauf`, `streak`; nach Einspielen in ein leeres Konto zeigt Fortschritt dieselben Tage. (b) grep „Alles sichern" = 0, Hinweis steht auf der Seite.
- Pro/Contra: Pro (a): Das Versprechen stimmt dann, wer das Konto verliert, verliert die Serie nicht. Contra (a): Eine Serie ließe sich mit einer bearbeiteten Datei fälschen; beim Einspielen in ein volles Konto ist unklar, was gilt; der Umfang ist größer. Pro (b): klein, ehrlich, ohne Eingriff in die Lernlogik. Contra (b): Verlust bleibt. **Empfehlung: (b) jetzt, (a) nur, wenn Nutzer:innen danach fragen.**

#### DATEN-9: Suche wird ab ~1400 Karten bei jedem Suchwort langsam (Zwischenspeicher zu klein)
- Art: Verbesserung
- Schwere: mittel
- Beleg: `app.js:10074` `if (suchPuffer.size > 4000) suchPuffer.clear();`. Je Karte kommen bis zu 3 Felder in den Puffer; ab >4000 verschiedenen Feldtexten wird er in jedem Suchlauf geleert und alles neu normalisiert. Messung `x_perf.js`, CPU 4×: **1200 Karten** – erste Suche 172 ms, jede weitere 0 ms (kein Long Task). **2000 Karten** – jede Suche 260–370 ms, unscharf 500 ms. Im Profil: `normZeichen` + `suchFeld` + GC dominieren. Verifiziert.
- Warum es stört: Große Sätze (Medina 1–3) ruckeln bei jedem Tippen in der Suche, genau dort, wo Tempo zählt.
- Vorschlag: Puffergrenze an die Kartenzahl koppeln (`3 × Kartenzahl + 500`) oder die Vergleichsform in einer `WeakMap` pro Karte halten, entwertet bei Änderung von wort/uebersetzung/extra.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: `x_perf.js 2000`: zweite und weitere Suche ohne Long Task > 50 ms.

#### DATEN-10: Großer Import wird in 400er-Stapeln nacheinander geschrieben – bricht er ab, bleibt ein halber Bereich
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:2186–2194` `for (…i += 400) { … await stapel.commit(); }`. Jeder Stapel wartet auf die Bestätigung des Servers. Offline oder beim Schließen der App mitten im Import sind nur die ersten Stapel eingereiht. Das Bereichsdokument (mit Lektionen, die auf alle Karten zeigen) steht im ersten Stapel. Einspielen ist offline nicht gesperrt (kein `offline`-Check in `importBackupFile`/`verarbeiteImportDaten`). **Vermutung** (echtes SDK-Verhalten offline nicht nachstellbar; die Attrappe bestätigt sofort).
- Warum es stört: Bei 3000 Karten stehen nach einem Abbruch z. B. nur 399 da, ohne Meldung. Die Lektionen zeigen ins Leere.
- Vorschlag: Stapel nicht nacheinander awaiten, sondern alle sofort `commit()`en (lokal sofort sichtbar und in der Offline-Warteschlange) und dann `Promise.all`. Oder großen Import offline sperren mit Hinweis. Bereichsdokument in den letzten Stapel.
- Entscheidet: Agent
- Umsetzung: Opus
- Abnahme: Test am Gerät: 3000er-Datei im Flugmodus einspielen, App schließen, online öffnen → 3000 Karten. Im Prüfstand: `commit`-Aufrufe vor dem ersten Auflösen = Anzahl Stapel.

#### DATEN-11: Ein Import von 20 000 Karten verbraucht das Tages-Schreibkontingent des ganzen Projekts
- Art: Verbesserung
- Schwere: mittel
- Beleg: `app.js:193` `IMPORT_MAX_KARTEN = 20000`. Das ist genau das Freikontingent von 20 000 Schreibvorgängen/Tag (`phase-1-datenzugriff/LOGBUCH.md`, 19.09.). Weder App noch Regeln begrenzen wiederholte Importe. Dass das Projekt im Spark-Tarif ist, ist eine Vermutung.
- Warum es stört: Eine versehentlich große oder mutwillig wiederholte Datei legt das Speichern für alle Nutzer:innen bis Mitternacht (Pacific) lahm oder verursacht Kosten.
- Vorschlag: Grenze auf z. B. 5000 senken (der größte gedachte Satz hat „einige tausend"). In der Konsole ein Budget mit Alarm setzen (steht schon offen).
- Entscheidet: Betreiber
- Umsetzung: Haiku
- Abnahme: `grep IMPORT_MAX_KARTEN` = neuer Wert; Meldungstext bleibt richtig.
- Pro/Contra: Pro: schützt Kontingent und Kosten, echte Backups sind weit kleiner. Contra: Wer wirklich >5000 Karten hat, muss in Teilen einspielen; ein mutwilliger Nutzer kann trotzdem mehrfach importieren (echter Schutz bräuchte einen Server). **Empfehlung: senken auf 5000 plus Budget-Alarm.**

#### DATEN-12: Gelöschte Karten lassen sich nicht zurückholen
- Art: Funktion
- Schwere: mittel
- Beleg: `deleteCard` (`app.js:4933`) und `deleteSelectedCards` (`:4241`) löschen sofort nach einer Rückfrage („endgültig"). Einen Rückgängig-Weg gibt es nicht (grep „Rückgängig" nur beim Lernen). Im Changelog oder Logbuch ist er nicht abgelehnt.
- Warum es stört: Eine Rückfrage klickt man weg (Kommentar `app.js:4163` sagt das selbst). Ein Fehltipp bei 30 ausgewählten Karten kostet 30 Karten samt Lernstand.
- Vorschlag: Nach dem Löschen `zeigeToast` mit „Rückgängig" (8 s). Die gelöschten Karten samt `kartenFelder`, Index und Set-Zugehörigkeit im Speicher halten, bei Tipp zurückschreiben. Die Rückfrage bei Einzelkarten könnte dann entfallen (Hick), bei Mehrfachauswahl bleiben.
- Entscheidet: Betreiber
- Umsetzung: Sonnet
- Abnahme: Prüfstand: 3 Karten löschen, „Rückgängig" → 3 Karten mit gleicher Stufe, Reihenfolge und Lektion zurück.
- Pro/Contra: Pro: Schutz dort, wo er wirkt; weniger Dialoge. Contra: Ein Toast mit Knopf kann über dem Finger erscheinen (§ 6.1, Platz reservieren); nach 8 s oder Neuladen ist es endgültig, also kein echter Papierkorb. **Empfehlung: ja, als Toast, Rückfrage bei Mehrfachauswahl behalten.**

#### DATEN-13: Angefangene Karte geht verloren, wenn das Handy die App im Hintergrund beendet
- Art: Verbesserung
- Schwere: niedrig
- Beleg: `formDraft` liegt nur im Arbeitsspeicher (`app.js:1574`). Station 11 schützt Schließen/Wischen, nicht das Beenden der App durch iOS. Der typische Fall: zum Wörterbuch wechseln, Wort kopieren, zurück. Vermutung zum Auftreten (am Gerät nicht geprüft).
- Warum es stört: Gerade bei langen Notizen tippt man viel und wechselt oft die App.
- Vorschlag: Entwurf in `sessionStorage` spiegeln (try/catch), beim Öffnen des Blatts wiederherstellen, beim Hinzufügen/Verwerfen löschen. Neuer Speicher-Schlüssel → Datenschutzerklärung Punkt 7 (§ 12).
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Prüfstand: Text tippen, Seite neu laden, „Karte hinzufügen" → Text steht wieder da.

#### DATEN-14: Speicherkarten-Inhalt wird als ganze Liste überschrieben – zwei Geräte verlieren Einträge
- Art: Fehler
- Schwere: niedrig
- Beleg: `karteMerken` (`app.js:4355`), `saveSelectedToSet` (`:4398`), `removeCardFromSet` (`:4454`) schreiben `….cardIds` komplett. Merkt Gerät A Karte X und Gerät B zugleich Karte Y, gewinnt der letzte Schreibvorgang. Verifiziert durch Lesen.
- Warum es stört: Gemerkte „Schwierige Wörter" verschwinden still.
- Vorschlag: Beim Hinzufügen `arrayUnion`, beim Entfernen `arrayRemove` (patchDoc-Wertersatz wie `LOESCHEN`); Reihenfolge-Änderungen bleiben Vollschreiben.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Stub mit echtem `arrayUnion`: zwei Merk-Vorgänge auf veraltetem Stand → beide IDs drin.

#### DATEN-15: Einspielen verwirft still einen zweiten Bereich mit gleichem Namen
- Art: Fehler
- Schwere: niedrig
- Beleg: `app.js:617` `if (out.some(x => x.name === b.name)) continue;` in `normBereiche`, das beim Import läuft (`:3972`). Gleichnamige Bereiche kann es im Konto geben (Kommentar `app.js:4258`: `bereicheMapToArray` filtert nicht). Die Karten des zweiten Bereichs fehlen dann in der Wiederherstellung, und die Erfolgsmeldung sagt nichts dazu. Verifiziert durch Lesen.
- Warum es stört: Eine Sicherung stellt nicht alles her, und man merkt es erst, wenn das Original weg ist.
- Vorschlag: Beim Import doppelte Namen nicht verwerfen, sondern mit „(2)" umbenennen (die Logik dafür steht schon in `verarbeiteImportDaten`, `:4010`).
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: Datei mit zwei Bereichen „A" → nach Einspielen „A" und „A (2)", Kartenzahl = Summe.

#### DATEN-16: Toter Link-Teilen-Code mit fehlerhaftem Text
- Art: Verbesserung
- Schwere: niedrig
- Beleg: `teileLektionLink`/`linkEinloesenStart` (`app.js:3729–3740`, Titel „Link-System depreciert", „klick 'Per Code teilen'"), dazu `komprimiere`, `dekomprimiere`, `bytesZuBase64Url`, `base64UrlZuBytes`, `TEIL_LINK_MAX_ZEICHEN` (`:3480–3530`) und `case "link-copy-clipboard"` (`:12180`). grep: kein `data-action="teile-lektion-link"`, `"link-einloesen-start"` oder `"link-copy-clipboard"` wird irgendwo gerendert. Verifiziert.
- Warum es stört: Das sind ~80 Zeilen, die niemand erreicht, mit Fremdwort und alter Anleitung; bei einer späteren Wiederverwendung wäre der Text falsch.
- Vorschlag: Funktionen, `case`-Zeilen und Hilfsfunktionen entfernen (§ 3.8: nach Namen und data-action greppen).
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: `grep -c "depreciert\|komprimiere\|teile-lektion-link" app.js` = 0, `node --check app.js` sauber.

#### DATEN-17: CSV-Import (Anki/Quizlet-Export, Tabelle)
- Art: Funktion
- Schwere: niedrig
- Beleg: Einspielen nimmt nur JSON (`app.js:7413` `accept="application/json"`, `:4064` `JSON.parse`). grep „csv" in CHANGELOG/plan: nicht vorhanden, nicht abgelehnt.
- Warum es stört: Wer aus Anki, Quizlet oder einer Tabelle kommt, muss jede Karte abtippen. Das ist die größte Hürde beim Umstieg.
- Vorschlag: Datei `.csv/.tsv/.txt` annehmen: Trenner raten (Tab, Semikolon, Komma), Spalte 1 = Wort, 2 = Übersetzung, 3 = Notiz. Vorschau „N Karten, erste drei: …" in `dlgConfirm`, dann in einen neuen Bereich über `verarbeiteImportDaten` (gleiche Grenzen). Mit Duplikat-Hinweis über `vergleichsWort`.
- Entscheidet: Betreiber
- Umsetzung: Sonnet
- Abnahme: Anki-„Notes in Plain Text"-Export und Quizlet-Export (Tab) ergeben je einen Bereich mit richtiger Zahl; Arabisch mit Harakat unverändert.
- Pro/Contra: Pro: holt Umsteiger:innen ab, kein Server, keine neuen Datenflüsse, kleiner Umfang. Contra: fremde Formate sind unsauber (Anki-HTML in Feldern, Zeilenumbrüche in Anführungszeichen) und liefern Support-Fälle; Premium-tauglich ist es kaum (Hürde beim Einstieg, nicht Mehrwert). **Empfehlung: bauen, kostenlos, nur Klartext-Spalten, HTML-Tags beim Import entfernen.**

#### DATEN-18: Mehrfachbearbeitung (Lektion zuweisen, Stufe zurücksetzen, Notiz anhängen)
- Art: Premium
- Schwere: niedrig
- Beleg: Auswahlmodus kennt nur Verschieben/Ablegen/Löschen (`app.js:10352–10360`). „Ablegen" legt in eine Speicherkarte, aus einer Lektion herausnehmen geht nur einzeln (`remove-from-set`).
- Warum es stört: Wer eine Lektion umbaut (30 Karten von Lektion 3 nach 4), tippt 60-mal.
- Vorschlag: In der Auswahlleiste „Aus Speicherkarte nehmen" (Blatt wie `WAHLEN.speicherkarte`). Zurücksetzen der Stufe nur nach Betreiber-Freigabe (Lernlogik).
- Entscheidet: Betreiber
- Umsetzung: Sonnet
- Abnahme: 30 Karten auswählen → aus „Lektion 3" nehmen und in „Lektion 4" ablegen in zwei Schritten.
- Pro/Contra: Pro: spart Autor:innen von Kartensätzen (Lehrer-Kandidaten fürs Abo) viel Zeit; passt zum Lehrer-Gerüst als Ausbaustufe. Contra: Jeder weitere Knopf in der Leiste widerspricht Hick (Station 10 hat sie eben auf drei gekürzt); als Premium wirkt eine fehlende Grundhandlung wie Schikane. **Empfehlung: „Herausnehmen" kostenlos ergänzen (im Blatt, nicht in der Leiste); Stufen-Massenänderung nicht.**

#### DATEN-19: Namen abtippen zum Bereich-Löschen ist bei arabischen Namen mit Harakat kaum machbar
- Art: Verbesserung
- Schwere: niedrig
- Beleg: `app.js:4178` `if (eingabe.trim() !== b.name.trim())`, exakter Vergleich.
- Warum es stört: „القُرْآن" mit Harakat abzutippen ist mühsam und fehleranfällig. Die Sicherung soll Hinsehen erzwingen, nicht Harakat-Tippen.
- Vorschlag: Mit `vergleichsWort()` vergleichen (Harakat, Alif-Formen egal, Groß/klein egal).
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: Bereich „كِتَاب" lässt sich mit Eingabe „كتاب" löschen; falscher Name bleibt abgelehnt.

Geprüft ohne Fund:
- **XSS** (`x_xss.js`): Nutzlast `<img onerror>` / `"><svg onload>` in Bereichsnamen (2), Speicherkarten-/Lektionsnamen (3), Wort, Übersetzung, Notiz, Profilname; Notiz als `https://…png"onerror=`, `javascript:…`, `https://…/"onmouseover=`. Durchlaufen: Lernen, Bereich-Blatt, Verwalten, Speicherkarten auf/zu, Karten-Detail + Lösch-Dialog, Bearbeiten, Mehr-Blatt, Suche (eins/alle), Üben-Auswahl nach Speicherkarten, Fortschritt, Einstellungen (Kartensätze, Daten), Lernrunde mit Aufdecken. **0 Auslösungen, 0 rohe Tags im DOM, keine Seitenfehler.** `dlgAlert/Confirm/Prompt` escapen Titel, Text, Wert (`app.js:11479–11494`); `markiere()` escapt jeden Abschnitt; Feedback-Zeile escapt `text`/`beschreibung`; `javascript:`-Links unmöglich (Regex nur `https?://\S+`).
- Arabische Suche: Harakat, Tatweel, Quran-Zeichen raus, أ إ آ ٱ → ا, ة → ه, ى/ئ → ي, ؤ → و, Artikel ال/al tolerant, Umlaute/Umschrift (Schlussel findet Schlüssel, gemessen). Duplikatprüfung trennt ى/ي bewusst. Lücke ohne praktische Bedeutung: U+0656–065F und persische ی/ک werden nicht vereinheitlicht.
- Import-Grenzen (5 MB vor dem Lesen, 200 Bereiche, 20 000 Karten vor dem Aufbau), kaputtes JSON, falsche Struktur, neue IDs beim Import (kein Überschreiben), „Notbremse" bei >50 % wegfallenden Karten, Zusammenführen nur in geführte Bereiche.
- Code-Einlösen: Normalisierung, falscher Code, offline (Station 13, `t_daten.js`); Regel: kein `list`, Format-Prüfung, nur Ersteller löscht/erhöht.
- Bereich anlegen/umbenennen/wechseln (setzt Suche/Auswahl zurück), leerer Bereich einfach löschen, voller mit Backup + Name, letzter nicht löschbar.
- Verschieben zwischen Bereichen (Löschen + Neuanlage im selben Patch, Lernstand bleibt), geführte Bereiche in beide Richtungen gesperrt.
- Karten-Blatt: Pflichtfelder am Feld, Längen gekappt (1000/5000 wie Regeln), Duplikat-Rückfrage, Entwurf beim Schließen (Station 11).
- Verwalten mit 2000 Karten öffnen: Long Tasks 110–145 ms (CPU 4×), Seiten à 100 ab 150 Karten, Suche entprellt und zeichnet nur die Liste neu.
- patchDoc-Stapelgrenze 400 < 500, Unter-Sammlung beim Bereich-Löschen mitgelöscht.

# Nachprüfung Runde 15 — 3.17.57 (Abnahme unterbrochen)

Ausgang `a4b5677` /3.17.56. Eingefrorener Produkt-/Lib-/Stub-Stand:
`d17b05f425891265df6ca56b2e9badfb4cbce3ef9250ba46a31f45fce6c8cdab`.
Keine Produktionskonten, kein Hosting-Deploy. Dies ist noch keine Freigabe.

## Gegenprüfung §2a

Vollständiger App-Diff gelesen: Herkunft vor bestätigtem Auth-Dialog,
Auftragsidentität statt bloßer UID, frühe Rückkehr bei fremder Antwort,
eigene Registrierung vor/nach Auth-Callback und eigene Adresslöschung.
Das SDK kann schon auf B zeigen, bevor der App-Callback B meldet; Abmelden
prüft deshalb beide User. Ein alter UI-Nachtrag darf auch bei A→B→A nicht
zurückkehren. Eigene Löschung trägt nur ihren Namen ins Gastformular.
Private Entwürfe, Auswahl und zugehörige Blätter werden zusammen geleert;
Cloud-Echo desselben Kontos bleibt ein anderer Pfad. Lernalgorithmen unverändert.

Gezielte ursprüngliche18 Normalfälle grün. Neuer Gesamt-Test enthält
zusätzlich App-/SDK-Fälle, A→B→A, Auth-Callback vor/nach Löschquittung,
SDK-Wechsel vor App-Callback, Namens-Nachtrag und feste Alt-Gegenproben
`c4a2ccf`. Alle77 Fälle sind erst nach der endgültigen Gesamtfolge abzunehmen.

Eigene Regression im neuen Normalfall: 25ms verzögerte Löschquittung
ließ im früheren Auth-Callback einen neuen Einstieg entstehen. Formularwahl
in diesen Callback vorgezogen; echte App bei 0/25ms danach grün. Vorherige
Gesamtfolge beendet. Neue106er-Folge enthält diese Korrektur.

G-109: verborgenen Fehlerdialog als Inventarwurzel ausgeschlossen; echte
Aktionen bis zum fertigen Plan und Kontoformular, nicht heuristische
Knopftexte. Erster eigener Test erwartete einen nicht existierenden
Aktionsnamen; rot abgebrochen, am echten `einstieg-fertig` korrigiert.
Gesonderter vollständiger Rundgang grün. `t_dialog_timer` muss weiterhin
den alten Aufrufer auflösen, nicht dessen Promise hängenlassen.

## Acht Bereiche — frischer Durchgang

| Bereich | Gelesen/geprüft | Ergebnis / noch fehlender Beleg |
|---|---|---|
| Konto | Auth-Reset, Auftragshilfen, Registrierung/Timeout/Profil/Mail, Reset, Popup, Adresslöschung, Abmelden, übrige Prompt-/Confirm-Aufrufer | Fünf geplante Korrekturen gezielt grün;77er-Gesamttest läuft. Übrige Bearbeitungsdialoge als Hypothese mit tatsächlicher SDK-Bootstrap-Lücke prüfen; keinen fremden Datenverlust aus einer VM mit künstlich geladenem B behaupten. |
| Daten | Kartenformular, Duplikat-Dialog, Bereich-/Set-Handlungen, `patchDoc`, Nutzer-Fallback, gezieltes Speichern und Captures aus Runde14 | Herkunft in mehrstufigen SDK-Writes erhalten. Bestätigte Bearbeitungsdialoge brauchen zusätzliche Gegenprobe. |
| Lernen | App-Diff, Tages-/Bereichszähler, `heuteAnteil`, Start/Bewertung/Undo, Auth-Reset der flüchtigen Durchsicht | Keine Lernregeländerung. Bereichszähler bleibt im Auth-Reset unangetastet: mit zwei nichtleeren Bereichen prüfen, ob B A-Antworten anzeigt. Frische13er-Abnahme folgt aus identischen Gesamtlogs. |
| Einstieg | aktuelle Aktion `einstieg-fertig`, Wahl/Probekarte, Plan-Aufbau, fertiger Plan, Kontoformular, .52–.55-Startcode | Inventar vollständig, Boot-Geometrie in106er-Folge grün. Bestätigter iPhone-Start unverändert; iPad-Teilfenster/Drehen während Boot weiterhin offen. |
| Regeln | eigene UID, Bereich/Karte, Feldpositivlisten, Share-Owner, Stimmen, Reset-Kennung und Diff | Regeln/Cloud-Felder unverändert;179/179 historische Regelabnahme weiterhin gültig, keine frisch wiederholte behauptet. Produktionsregelstand K10 nicht bestätigt. |
| Technik | vier Versionen/31 Splash-Querys, CSP/APP_SHELL, Navigation im SW, HTTP-Cache/Hosting-ignore, Prüfstand-Fingerprints | Syntax/Standprüfer grün; Boot/Cache-Strategie aus .55 erhalten. Testwrapper muss ausgeführte Quellen mithashen; Quellenänderung während eines Testlaufs darf nicht bewahrt werden. |
| Rest/UI | Board-Entwurf und Konto-Reset, Einstellungen/Blätter, Auswahl, Schreibcanvas, Kontrast/A11y, große Screens | B erbt keine privaten A-Entwürfe/Auswahl. Frische große Ansichten/Kontrast/Scroll-/Schreibwerte und beide Affen noch abschließend lesen. |
| Produkt | PLAN/AUFTRAG, Betreiberentscheidungen E01–E19, Konsolenschritte K1–K13, Textlern-Entwürfe | Keine neue Funktion, Lernmethode, religiösen Inhalte oder Datenflüsse. Vorschläge bleiben Fragen. Claude-Gesamtprüfung erst nach A1–A6 oder erneutem Anhalten. |

## Messwerte und Grenzen

Vorheriger Lauf (Produktfingerprint `bcd4901ed58fbebc`, später geändert):
Original-Tempoabnahme bei CPU4×: 3000 geführt50/0/0/0/0ms,
eigen59/0/0/0/0ms, unveränderte Grenze100ms;6000 geführt70ms.
Rundenstart lange Aufgaben138–218ms: beschreibende Grenze, kein Versprechen
vollständiger Flüssigkeit. Leistungsprüfung isoliert, kein Profiling/Tracing.

Aktueller Lauf `d17b05f425891265` rot bei130ms/100ms Grenze. Anschließende
Rechnerkontrolle: BatteryStatus1 (Akkubetrieb), CPU798MHz,34% Gesamtlast.
Frühere grüne Messung ersetzt diese Abnahme nicht. Übrige Prüfungen laufen;
Laptop-Ladeanzeige vom Betreiber angefragt. Kein Leistungsfix aufgrund einer
unbewiesenen Ursache und keine Grenzänderung.

Gesamtlog `%TEMP%/adrabic-r15-gesamt-quittung.log`, Einzelprotokolle
`%TEMP%/adrabic-pruefstand-gesamt/d17b05f425891265`.
A5/A6 erst nach vollständiger Abnahme und geprüften Hypothesen festlegen.

Letzter Stand:32 Ergebnisse,30 Exit0; Tempotest rot und Test G083/039/040/041/044
mit Zeitlimit nach957s statt45s Wartezeit. Aktueller UI-Teil dieses Tests
grün, feste Alt-Gegenprobe unvollständig. Keine Abnahme daraus ableiten.
Prüfprozesse beendet; Wiedereinstieg mit gleichem Fingerprint und
`alle_pruefen.js --fortsetzen` erhält nur30 tatsächlich grüne aktuelle Läufe.
Alle32 Ausgaben gelesen bzw. exakt mit vollständig gelesenen Vorläufen
verglichen. Aktuelle Quelle benötigt weiterhin77er-Wrapper/Lernabnahme/Affen.
Direkte Windows-Netzabfrage ACLineStatus0; Ladeanzeige angefragt.

## Claude-Gegenprüfung und Abschluss (29./30.09.2026, 3.18.3)

Der Codex-Entwurf lag nur als Patch vor (`runde15-unfertig.patch`). Claude hat
ihn in einem eigenen Worktree eingespielt, auf 3.18.0 (Texte lernen Stufe 1)
rebased und nach 3.18.2 als 3.18.3 abgeschlossen.

Gelesen: der vollständige `app.js`-Diff (selbst), dazu eine frische Prüfung
durch einen zweiten Prüfer ohne Arbeitsverlauf (§ 2a). Ergebnis:

| Fund | Schwere | Ergebnis |
|---|---|---|
| F1: Nach Zeitlimit und Neuversuch mit korrigierter Adresse verwirft der späte Callback des ersten Kontos den Auftrag; das neue Konto bekommt weder Namen noch Bestätigungs-Mail | mittel, Rückstufung dieser Runde | behoben: `doRegister` übernimmt den verworfenen Auftrag, wenn kein neuer begonnen wurde und das SDK auf das eben angelegte Konto zeigt; `registrierungGilt` prüft Auftrag und SDK-Konto. Test `t_konto_registrierung_neuversuch.js`: aktuell grün, Gegenprobe ohne Übernahme zeigt „B ohne Mail“ |
| F2: `auftrag.loescht` blieb während der Passwort-Rückfrage gesetzt; eine fremde Abmeldung galt als eigene Löschung | niedrig | behoben: `loescht` nur während eines laufenden `deleteUser` |
| F3: Adresse auf der Löschseite und offenes Erinnerungsblatt überlebten den Kontowechsel (G-108) | niedrig | behoben im Auth-Reset |
| F4/F5: anderer Tab während `deleteUser`; Nachtrag nur über die Adresse zugeordnet | niedrig, Vermutung | G-130 |

G-110 ist im Code belegt geschlossen: nach einem Wechsel vor dem Aufruf gibt es
weder `deleteUser(B)` noch `signOut(B)`. Normalfälle (Registrierung in beiden
Reihenfolgen, Zeitlimit-Nachtrag, Login-Fehler, Popup-Abbruch, Reset, „Adresse
falsch“ mit und ohne Neu-Anmeldung, Abmelden) ohne hängenden Busy-Merker.
Lernlogik nicht berührt. `t_konto_fortsetzungen.js` vor und nach dem Fix mit
identischer Ausgabe grün.

Die 31 Startbild-Querys stehen auf 3.18.3: `t_boot_geometrie.js` verlangt an
ihnen die aktuelle Version (in 3.18.0 fehlte das, beim Rebase ausgeglichen).

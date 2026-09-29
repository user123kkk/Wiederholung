# Nachprüfung Runde 14 — aktuelle Mustersuche

Ausgangscommit `c4a2ccf` (3.17.55), aktueller Entwurf 3.17.56.
Eingefrorener Produkt-/Lib-/Stub-Stand:
`a4b32726402d316cf32dff747287e07d4cb989b3067fed208fdc8687f5874eeb`.
Keine Produktionskonten, keine Produktionsveröffentlichung.

## Ergebnis: A5 nicht bestanden, A6 weiterhin 0

105er-Gesamtfolge beendet: **105/105 Prozessprüfungen grün**; alle
vollständigen Ausgaben gelesen. Nur ursprünglich roten Tempotest am
Ladegerät wiederholt, 104 identische grüne Ergebnisse bewahrt. Originalcode,
Original-CPU4× und Originalgrenze100ms unverändert: 3000 geführt
57/0/0/0/0ms, eigen0/0/0/0/0ms. Keine Diagnosevariante übernommen.
Frühere rote Messungen (150ms gesamt,192ms isoliert, Altstand272ms)
bleiben historische Daten; kein Produktfix aus diesen Vermutungen gebaut.

Zusätzlicher hoher Fund **G-111**: verzögerte Registrierung aus Gast A
schreibt beim folgenden fremden Konto B den privaten Namen aus A ins
SDK-Profil und versendet die Bestätigung an B. Vollständige App und
kontrollierte SDK-Antwort, keine Produktionskonten. Folgerunde.

Zusätzlicher kritischer Fund **G-110**: Ein bereits bestätigter Auth-Dialog
setzt nach A→B den konkreten deleteUser(B)- bzw. signOut-Aufruf fort.
Kontrollierte Microtask-Probe, keine echte Kontolöschung; Folgerunde.

Neue hohe Aufgabe **G-108**: zwei vollständige App-Fälle belegen private
A-Kartentexte im B-Formular und tatsächliches Schreiben einer neuen Karte
unter B. Neuer mittlerer Fund **G-107**, sieben kontrollierte Auth-Funktionen:
zusätzlich E-Mail-, Google- und Apple-Anmeldung mit später Fehlerantwort.
Belege/Abnahme in `NACHLESE-2026-09-29.md` und `werkzeuge/konto_entwuerfe.js`,
`werkzeuge/konto_authrest.js`. Nicht als bereits korrigiert zählen.
Ideen-Entwurf nach Wiederöffnen in B und geerbte Kartenauswahl ebenfalls
bestätigt; insgesamt vier vollständige G-108-Fälle. Die vermutete
Schreibfehler-Vererbung war nicht bestätigt und ist kein neuer Fund.
Zusätzlicher niedriger Prüfstand-Fund G-109: Inventar Teil 2 wählt ein
verborgenes Dialog-Kindelement und stoppt den Einstieg vor der Probekarte.
Nicht als vollständigen Inventarrundgang zählen; getrennte echte
Einstiegs-/Rundenende-Prüfungen bleiben erforderlich.

| Bereich | Frisch gelesene Stellen und Prüfungen | Befund / Grenze |
|---|---|---|
| Konto | Auth-Reset, Registrierung/Profil/Mail, Bestätigung, Token-Rückkehr, „Adresse falsch“, Reset, Löschkontext; tatsächlicher Kartenentwurf A→B | G-107 mittel, G-108 hoch neu. G-106 schützt drei Bestätigungswege; vollständige App belegt neue B-Sperre bis eigener Antwort, Altstand `c4a2ccf` blockiert B. |
| Daten | Datei-/Code-Import, Zusammenführung und Warteschlange, Weitergabe-Token/Codekollision, Lehrer-Abruf, Migration | G-102–G-104 gezielt grün: B-Dokumente unverändert, normaler 500-Karten-Umzug abgeschlossen; Altstand `5de6969` importiert in B und markiert B vorzeitig fertig. Wiederholungen/Fehler auch in 51 Funktionsfällen geprüft. |
| Lernen | Diff der Runde, Bewertung/Canvas-Zähler-Bindung, Stufen/Fälligkeit im Kartenformular, Reset-Grenze | Lernregel-Diff leer. Gemeinsamer Auth-Reset verändert keine Stufe/Fälligkeit. Vollständige frische Regression läuft; Leistungsprüfung 150ms statt 100ms rot, isolierter Altvergleich erforderlich. Keine pauschale Flüssigkeitsaussage. |
| Einstieg | Übernommene Claude-Diffs .52–.55, Boot-/Versions-Queries, Hürden/Probekarte/Plan und neue Dialog-Promise-Abnahme | Boot/Schrift/Hintergrund/Cache-Verhalten unverändert; .55 vom Betreiber am iPhone bestätigt. `t_dialog_timer` aktuell grün und muss alten Aufrufer auflösen. iPad-Teilfenster/Drehen während Boot bleibt ungetestet. |
| Regeln | Share-Owner/Create-/Update-Bedingungen, Regeln-Dateidiff, Feldpfade der neuen Guards, Kontoreferenzen | Keine neue Regel/kein Cloud-Feld in Runde 14. 179/179 aus .50 ist historisch gültige Regelabnahme, keine frisch wiederholte behauptet. Produktions-Regelstand K10 nicht bestätigt. |
| Technik | Navigation im SW, Immutable-URLs, Inline-Boot/CSP, Versionen und APP_SHELL, fortsetzbarer Runner | `pruefe_stand.mjs` grün; Cache zuerst aus .55 erhalten. Historischen .55-Kommentar nach eigener globaler Ersetzung wiederhergestellt. Vollständige 105er-Folge nur für korrigierten Quellstand. |
| Rest | Board-Laden inkl. UID vor/nach Anfrage, Einreichen/Abstimmen/Moderation Erfolg/Fehler/Dialogwechsel | G-105 gezielt grün: B-Entwurf/Anzeige erhalten; normale Writes, Rollback und Entfernen bleiben wirksam. Private Entwürfe bei Auth-Reset gehören angrenzend zu G-108. Keine Board-Regeländerung. |
| Produkt | Bestehende Aufträge/Entscheidungen, Q1, Modell-/Gegenprüfungs- und Abschlussregeln | Keine neue Funktion oder religiöser Wortlaut. Betreiberfragen bleiben offen; mechanische G-107/G-108 für Folgerunde. Claude-Gesamtprüfung nach §2c erst nach Abschluss oder erneutem Anhalten. |

## Gegenprüfung §2a

Produktdiff vollständig in Abschnitten gelesen: 124 hinzugefügte Zeilen,
hauptsächlich Herkunftsprüfung; Rückkehr nach jeder relevanten Netzantwort,
keine fremde UI/Retry-Mutation. Normale Fortsetzungen separat geprüft,
einschließlich genau einem neuen Kollisionscode nach Token-Retry.
51 VM-Fälle ersetzen keine SDK-/Geräteprüfung; echte App-Gegenproben getrennt.
Gegenprobe `c4a2ccf` belegt Auth-Busy-Verlust, feste ältere `5de6969`-Proben
belegen die übrigen Konto-Fortsetzungen. Eigene neue Prüfungen verlangen
beendete Aufträge, unveränderte B-Dokumente und normalen B-Abschluss.

13/13 Lernabnahme grün, Handy 200/Seed1402 und iPad150/Seed1403 jeweils
0 Zufallsbefunde. Leistungsabnahme am Ladegerät jetzt bestanden; neue kritische/hohe Funde
halten A5/A6 unabhängig von den grünen Einzelkorrekturen negativ.

## Grenze der Tempodiagnose

Ursprünglicher Stand `a5ea99c` / .47 auf demselben Rechner ebenfalls rot,
469ms; ursprüngliche Testdatei unverändert. Die Lern-CSS ist unverändert,
der CSS-Diff betrifft nur den Boot-Screen. Die bisherigen Testgrenzen
wurden nicht gelockert. Diagnose-Skripte sind keine zusätzliche Abnahme.

Offizieller DevTools/Lighthouse-Benchmark (Quellen-SHA256
`dbfbeadbdd81924267dd4312f57be1005b237d66d9f7a6d76d153bc034d485f7`):
erster Lauf 1× 522,5/679, 4× 57/67,5; zweiter Lauf 1× 505/331,5,
4× 46,5/29,5. Low-Ziel laut DevTools264; anschließende Kalibrierung
1,37× mit Kontrollen280/291,5/223,5 außerhalb des Zielbereichs ±10.
Keine Freigabe aus einer unstabilen Kalibrierung. Windows meldet
Akkubetrieb, 17%, CPU798MHz (WMI), Schema Ausbalanciert. Das ist eine
abweichende Messbedingung, kein Beweis für die alleinige Fehlerursache.
Netzbetrieb danach geprüft: Originaltest besteht ohne Änderung (siehe
oberstes Ergebnis). Handy-Schreiben nachgemessen: 1525ms/60 Bewegungen,
ein Frameintervall448ms; Lage/Striche/Undo/Vollbild erhalten, Kontrast0.
Keine pauschale Aussage über alle Bildintervalle. Rohlogs im Logbuch.

[DevTools erklärt die Hardwareabhängigkeit der Drosselung](https://developer.chrome.com/blog/devtools-grounded-real-world).

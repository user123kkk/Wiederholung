# Offener Tempo-Befund der Datenabnahme

10.10.2026, entdeckt beim vollständigen Lauf an 3.18.30. Keine neue
Lernregel, keine Änderung am Text-Probelauf, keine Abnahmefreigabe.

## Tatsächliche rote Abnahme

**Fortsetzung nach Neustart,10.10.16:22:** Neustart16:11:51 und Netzteil2
bestätigt. Unveränderter Originaltest einmal ausgeführt: Verwalten219/146ms,
höchste Aufgabe219ms bei200ms, Exit1. Vollständiger Log
`../sicherung/tests/text-tempo-original-neustart-1.log` gelesen. Unabhängige
Rechenprobe am selben Chrome: CPU4x36,2–54,3ms, Median41,9; ohne Drosselung
Median8,2/8,55ms. Neustart hat ausreichendes Tempo nicht nachgewiesen.

Zwei gezielte Klicktraces: unveränderte Eingabe196,32ms; getrenntes Drücken
und Loslassen mit80ms Pause170,32ms. Gleiche Schriften, Layoutfolge159/532
und End-DOM. Die Eingabezeit ist verändert, daher keine Ersatzabnahme und
kein Beweis, dass alle ursprünglichen roten Aufgaben Messfehler waren.
Lokale Playwright-Quelle `node_modules/playwright-core/lib/coreBundle.js`
enthält einen zusätzlichen Hit-Target-Interceptor während automatisierter
Klicks. Sein Anteil am ursprünglichen Rot ist nicht abschließend belegt;
keine force-Klick-Probe und keine Teständerung daraus vorgenommen.
Rohtraces `text-layout-ursache/neustart-{original,getrennt}.json`, vollständige
Logs `text-layout-neustart-{original,getrennt}.log` und Offline-Auswertung
`text-layout-auswertung-neustart-1.log` erhalten und gelesen.

Betreiber: „halt dich nicht so lang daran auf, du verschwendest tokens“.
Weitere Tempo-Diagnose deshalb jetzt beendet; keine zusätzliche Messreihe
oder Änderung ohne belegte Ursache. Paketabschluss bleibt gesperrt,
157/158 und Quellee595b5b6312244cd erhalten. Kein Produktfix/Deploy.

Unveränderter `t_text_tempo.js`: Sure2 mit286 vorhandenen Ayat,390×844,
CPU4×, Hauptthread-Aufgaben; Grenze200ms. Erster vollständiger Lauf226ms
beim Wechsel nach Verwalten, einmalige Fortsetzung nach Diagnose254ms.
Nach notwendiger Mehrgeräte-Testkorrektur erneut252ms im abschließenden
Gesamtlauf. Alle vollständigen Ausgaben sind gesichert; keine davon ist ein Fix.
Rot bleibt bis zur Klärung eine Paketabschluss-Sperre.

## Vergleich und Grenzen

Vorgeschriebene `x_ab_tempo.js`, acht Paare mit fester App-Quelle315bb0e
und unverändertem Entwurf. Verwalten: alter Median188ms (2/8 über200),
Entwurf279ms (6/8 über200); Text öffnen144/148ms. Die erste Deutung
„Entwurf langsamer“ war vorläufig.

Zweiter Vergleich mit derselben Messhilfe und abwechselnder Reihenfolge:
Verwalten alter Median286ms (6/8 über200), Entwurf212ms (4/8 über200),
Text162/150ms. Alle acht Paare zeigen identisches #app-DOM, SHA256
`2f26be5275dfc14100c34759681047246f942637093fa66e4699d481fb2c2c33`.
Eine durch den Datenentwurf verursachte Verlangsamung ist damit nicht
belegt. Beide Quellen überschreiten die Grenze; Gleichheit beweist keine
ausreichende Geschwindigkeit.

Traces am tatsächlichen Originaltest zeigen gleiche Layoutobjektzahlen
beim Wechsel nach Verwalten (156 und397 schmutzige Objekte). Hauptkosten
liegen in Browserlayout/HTML-Aufbau. Verwalten im alten Trace373ms,
im neuen178ms; beim Textöffnen alte278/neue239ms. Profiler/Trace verändern
Laufzeit und dienen nur der Ursachenprüfung. Daraus weder einen behobenen
Fehler noch einen bloßen Messfehler ableiten. Die endgültige Ursache ist offen.

## Erhalt und nächster Schritt

### Betreiberkorrektur: Grenze selbst prüfen,10.10.2026

Weitere Messläufe gestoppt. Der Betreiber fragt, ob die vorgegebene Grenze
regulierbar oder nur angesetzt wurde, und kritisiert den verbrauchten
Nutzungsrahmen ohne Fix. Codex hat die Herkunft/Angemessenheit zu spät
geprüft; keine weitere blinde Optimierung gegen die200ms-Zahl.

git blame/log ordnen200ms/Longtask dem Agentencommit7264af9a vom30.09.
zu. Der Testkommentar bezeichnet dies als sichtbares Stocken, liefert aber
keine quantitative Geräte-/Nutzungsherleitung. KONZEPT§13 nennt hingegen
50ms/Bild; Bilder und Longtasks sind unterschiedliche Messgrößen. Das
ursprüngliche Logbuch dokumentiert im Cloud-Container maximal104ms und
ein bereits verfehltes50ms-Bildziel. Kein damaliger Laptop-/iPhone-Nachweis.

Die [offizielle INP-Empfehlung](https://web.dev/articles/inp) ordnet200ms
als gute Reaktionszeit einer Interaktion ein und bewertet reale Besuche
am75.Perzentil. Der aktuelle Test prüft stattdessen den maximalen einzelnen
Longtask unter künstlicher CPU4x-Drosselung. Die gleiche Zahl ist damit
keine fachliche Herleitung für diesen konkreten Test. Grenze regulierbar;
erst Messgröße, Gerätebedingungen und Abnahmezweck festlegen. Keine neue
Zahl oder Produktfreigabe aus der Betreiberfrage ableiten.

Auch eigene Ein-/Zwei-CPU-Affinitätsproben bleiben verworfen: unabhängige
Verlangsamung nur1,13 beziehungsweise etwa1,30 statt4. App-Grüns daraus
ungültig. Gesamtrunner wegen NODE_OPTIONS-Quotierungsfehler nicht gestartet,
Cachecode1 und Quellee595b5b6312244cd offline bestätigt. Vor Originaltests
nun semantische Rechenprüfung, Affinität gesperrt; kein Produkt verändert.
Gezielte Windows-Fadenprobe scheitert mangels lesbarem Fadennamen vor
gedrosselter Probe/App-Abnahme. Alternativbrowser am geprüften Edge-Pfad
und WSL nicht vorhanden. Keine Systeminstallation oder fremde Prozess-
änderung vorgenommen. Keine weiteren Energie-/Prioritäts-/Renderproben.

### Erneut beauftragte Sperrenklärung, 10.10.2026 17:20

Ergänzung17:29: AboveNormal-Stabilitätsprobe215/277ms rot, deshalb
keine Gesamtabnahme. Vorwärmen der ersten14 tatsächlichen Kartenwörter
liefert315ms; Originale davor222/234, danach380/316ms. Flexbasis0%
liefert232/197ms; Originale320/190 und291/217ms. Gleicher End-DOM,
keine Produktvariante übernommen. Diese kleinen Varianten lösen die
Sperre nicht ausreichend. Alle eigenen Testbrowser beendet; weitere
Arbeit muss eine notwendige Änderung am gemeinsamen Renderablauf
begründen. Keine wiederholten Energie-/Prioritätsproben oder Auswahl
grüner Einzelwerte. Originaltest, Grenze200ms, CPU4x und157 grüne
Abnahmen bleiben unverändert erhalten.

Ergänzung17:23: Die beiden vorher festgelegten Energie-Stabilitätsläufe
scheitern mit230/376ms. Der Ansatz ist verworfen; keine Gesamtabnahme
gestartet, AC/DC-Minimum5 bestätigt. Direkt kombinierter Beobachter/
Viewport-Abgleich231ms; flankierende Originale302/197ms. Kontinuierlich
erhaltene Navigation290ms, Originale231/192ms, gleicher End-DOM. Auch
weniger native Eingabeereignisse sind damit kein Tempo-Fix. Abschließende
gezielte Umgebungsprobe: ausschließlich eigene Browser-CDP-Prozesse auf
AboveNormal, keine fremden Anwendungen ändern.

Der Betreiber hat um16:53 die gezielte Klärung und notwendige belegte
Korrektur wieder beauftragt. Browservarianten mit verzögertem render(),
getrennten Mausereignissen, Sichtbarkeitsbeobachter, bedingtem
Viewport-Abgleich und sofort gesetzten ersten14 Karten lösen die Sperre
nicht zuverlässig. Varianten bleiben ausschließlich in der Diagnosehilfe
`x_text_tempo_phase.js`; Produktdateien und Originaltest sind unverändert.
Eine Variante meldet kleine Longtasks, hat aber eine243ms Renderaufgabe im
gleichen Renderer. Dieses Ergebnis wird ausdrücklich nicht als Fix gewertet.
Rohtraces liegen mit eindeutigen Laufzeitnamen unter `text-layout-ursache/`.

Eine kontrollierte Energieprobe am Netzteil verändert ausschließlich das
AC-Prozessorminimum des bestehenden ausgeglichenen Schemas von5 auf100.
CPU4x und200ms-Grenze bleiben unverändert. Originaltest199ms grün;
unabhängige Rechenprobe weiterhin24,3–50,5ms unter CPU4x. Das Hilfsskript
stellt die Einstellung im finally auf5 zurück. Anschließende Gegenprobe
mit5: Original305ms rot. Das einzelne knappe Grün beweist weder eine
zuverlässige Lösung noch die Ursache aller vorherigen roten Belege.

Vorab begrenzte nächste Prüfung: zwei Originalläufe mit AC-Minimum100;
beide müssen grün sein. Nur dann läuft die fortgesetzte Gesamtabnahme mit
unveränderter Quelle und erhaltenen157 grünen Ergebnissen. Jedes Rot
verwirft diesen Ansatz; keine Auswahl grüner Ergebnisse und kein
Wiederholen bis grün. Auch danach wird die Energieeinstellung restauriert.
Belege: `text-tempo-energie-1-{ablauf,referenz,original}.log`,
`text-tempo-energie-gegenprobe-original.log`,
`text-tempo-energie-stabilitaet-*` unter `../sicherung/tests/`.

### Gezielte Ursachenprüfung, 10.10.2026 16:09

Die großen Layoutdurchläufe der erhaltenen Originaltraces liegen zeitlich
nach dem Ende des click-Handlers, nicht innerhalb davon. Alt: 134,47 und
113,19 ms, neu: 57,07 und 62,75 ms. Beide setzen zunächst 159, dann 532
Layoutobjekte. Ein weiterer Fix gegen großes erzwungenes Layout im
Klick-Handler ist damit nicht begründet. Der Handler selbst kostet weiterhin
Zeit; diese Aussage entlastet ihn nicht pauschal.

Gezielte Browserprobe Original/Variante/Original mit dem vorhandenen
`x_tempo_spur.js`: Nur in der Variante wird `content-visibility` der
Kartenzeilen von auto auf visible gesetzt, ausschließlich im Testbrowser.
App, Daten, Klickaktionen und CPU4x bleiben gleich. Beide Schriften sind
schon vor dem Wechsel geladen; alle drei End-DOMs haben den bisherigen
Hash 2f26be52. Die Originale zeigen erneut die Folge 159/532 Layoutobjekte;
die Variante setzt sofort 1021 Objekte. Ihr großer Layoutdurchlauf dauert
251,59 ms, die ganze Klickaufgabe 634 ms. Das Abschalten der verzögerten
Kartenanzeige ist keine Korrektur. Diese drei Diagnosewerte sind kein
statistischer Geschwindigkeitsvergleich und keine Originaltest-Abnahme.

Eine unabhängige Rechenprobe in about:blank, ohne App/DOM/Firebase/Schriften,
prüft zwölfmal je Gruppe exakt vier Millionen identische Rechenschritte.
Chrome 154.0.8037.98, stets Prüfsumme -1157083627. Ohne Drosselung vorher
4,7–5,7 ms (Median 5,2), CPU4x 24,3–46,7 ms (Median 28,3), ohne Drosselung
danach 4,9–7,1 ms (Median 5,35). Damit sind Schwankungen auch unabhängig von
der App beobachtet. Das beweist weder die Ursache aller ursprünglichen
Überschreitungen noch einen Messfehler oder ausreichende Produktleistung.

Kein belegter notwendiger Produktfix aus diesen Proben. App/Rules und
Originaltest bleiben unverändert; Runnerquelle e595b5b6312244cd bestätigt.
157 gültige grüne Abnahmen bleiben erhalten. Keine Schwelle gelockert,
kein Paketcommit/Deploy. Laptop läuft seit 07.10.2026 14:45, Netzteilstatus 2.
Als nächste kontrollierte Umgebungsänderung empfiehlt sich der bereits in
LEHREN §5.3 beschriebene Neustart. Den Neustart führt der Betreiber aus,
damit seine anderen offenen Arbeiten nicht ungefragt unterbrochen werden.
Danach zuerst unabhängige Rechenprobe und unveränderten Originaltest einmal
prüfen; keine komplette Serie und keine Wiederholung bis grün. Ein einzelnes
Grün wäre noch keine abschließende Erklärung der alten roten Belege.

Neue Belege: `../sicherung/tests/text-layout-{original-1,sichtbar,original-2}.log`,
vollständige Rohtraces/Schriftstände unter `text-layout-ursache/`,
`text-layout-auswertung.log` und `text-tempo-cpu-referenz.log`.
Werkzeuge: `x_text_layout_ursache.js`, `x_text_layout_auswerten.js`,
`x_cpu_referenz.js`. Die Offline-Auswertung prüft die Layout-Zuordnung und
Schrift-/End-DOM-Belege. Alle vollständigen neuen Ausgaben gelesen.

Belege unter `../sicherung/tests/`: abnahme-text-tempo-rot-3.18.30.log,
abnahme-text-tempo-rot-2-3.18.30.log, abnahme-text-tempo-ab-3.18.30.log,
abnahme-text-tempo-reihenfolge-2-3.18.30.log,
abnahme-text-spur-neu-3.18.30.log, abnahme-text-spur-alt-3.18.30.log,
dazu CPU-/Trace-JSON beider Quellen. Der erste eigene Diagnoseaufruf
scheiterte vor Browserstart an einem CRLF-Anker; sein Fehlerlog bleibt
erhalten, der zweite Aufruf normalisiert die gelesene Diagnosequelle.

Restlichen Gesamtlauf und vorgeschriebene Runde/Zufallsprüfungen einmal
vollständig lesen und sichern. Danach Tempo-Ursache gezielt klären; keine
Schwelle lockern, keine Tests überspringen und keine Wiederholung bis grün.
AGENTS/CODEX-START schützen den laufenden Text-Probelauf; ohne passende
belegte Ursache wird dessen Produktcode nicht geändert. Kein Paketcommit
oder Deploy bei ungeklärter roter Abnahme.

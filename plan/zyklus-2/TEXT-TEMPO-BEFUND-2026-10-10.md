# Offener Tempo-Befund der Datenabnahme

10.10.2026, entdeckt beim vollständigen Lauf an 3.18.30. Keine neue
Lernregel, keine Änderung am Text-Probelauf, keine Abnahmefreigabe.

## Tatsächliche rote Abnahme

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

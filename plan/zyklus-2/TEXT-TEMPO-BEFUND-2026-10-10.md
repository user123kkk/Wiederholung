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

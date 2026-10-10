# Nachtstand 10.10.2026, 08:08

Nachtauftrag läuft noch bis 09:00 Europe/Berlin. Danach Nacht-Heartbeat
pausieren; kein neuer Auftrag, kein Veröffentlichen. Große Abnahme und
ladegeraet bleiben ausdrücklich später. Minuten-Sicherung bleibt erhalten.

## Ergebnis

- A14/A15/A16-Entwurf erhalten. Neu A17: Notizspeichern im offenen Blatt
  setzte eine inzwischen fremd bewertete Karte unbeabsichtigt zurück.
  Feste Gegenprobe zeigt den Verlust. Flüchtiges Kennzeichen für bewusste
  Standwahl korrigiert dies im bestehenden Datenpaket.
- A17: fünf SDK-Fälle gemeinsam und zwei spätere Einzelproben grün;
  Kartenblatt/Snapshot/Sprung/Kontrast/a11y-Grundchecks grün. Keine
  vollständige WCAG-, Geräte- oder Paketabnahme daraus ableiten.
- A16: zusätzliche Einzelproben zur Kartenkopie-Aktivierung, falschen
  Epoche, Altersgrenze 120/121 und abweichenden Cloud-Belegkopie grün.
  Gezielt falsche Varianten werden erkannt. Originaler 17er-Lauf und
  spätere Einzelbelege bleiben an ihren jeweiligen Quellen gebunden;
  Katalog jetzt 22, kein vollständiger neuer 22er-Lauf.
- A16-Prüfer: unbekannte/leere Fallauswahl wird abgewiesen; ein leeres
  „0 Fälle grün“ ist kein gültiger Erfolg mehr. Definitionen und Fallzahl
  müssen vollständig passen. Vorbefund und positive/negative Kontrollen
  sind erhalten; keine Fachassertion oder Zeitgrenze gelockert.
- Bearbeiten in der Abfrage und taggleiche Rundenfortsetzung konkret
  vorbereitet. Keine neue H-Funktion über dem uncommitteten Datenpaket.

## Sicherung tatsächlich wiederhergestellt

Eine Sicherungsschleife geprüft, kein zweiter Baum gestartet. Patch-Snapshot
auf Basis `dfd44eb3f50d06190197a11a9c52a318dba5a300` in eigenem leeren
TEMP-Ordner erst mit `git apply --check`, dann tatsächlich angewandt.
Alle 23 enthaltenen Dateien gegen zuvor erfassten Arbeitsbaum gleich,
Zeilenenden für den Inhaltsvergleich auf LF normalisiert. App und beide
neuen SDK-Prüfdateien mit `node --check` grün. Arbeitsbaum unberührt.
Log: `../sicherung/tests/nacht-minutenpatch-wiederherstellung.log`.
Patch-SHA256:
`e1be6af59602f60ce230fd9f0cfafa51a50ab67032102402849cf670cb7983c1`.

Wiederhergestellter und aktueller App-SHA256:
`4a8ca5a1a73c7873275497c38f7368f542785a97f1712e21a20b60faed25fe97`.
3.18.30 bleibt Entwurf, App im Commit weiterhin 3.18.29. Die Probe belegt
diesen Patch-Snapshot, keine automatische Vollsicherung ignorierter Dateien,
keine PWA-/Produktabnahme und keine bytegleiche Zeilenendendarstellung.

## Noch offen

Große Datenabnahme/Paketabschluss und echte Gerätebelege. Außerdem für den
späteren Ladegerät-Weg: Demo-Emulator 8082 bereitstellen und den direkt
geladenen SDK-Helfer im Fortsetzungs-Hash berücksichtigen. Hashlücke isoliert
nachgewiesen, kein großer Lauf gestartet; Wrapper unverändert.

Belege und tatsächlicher späterer Ablauf:
`ABNAHME-VORBEREITUNG-3.18.30.md`, `FORMULAR-KONFLIKT-2026-10-10.md`,
`VERLAUF-NEUSTART-2026-10-09.md`. Anschlussvorbereitung:
`mehrwert/VORBEREITUNG-LERNRUNDE-2026-10-09.md`.
Keine alten grünen Ergebnisse verschiedener Quellen zusammen als neue
Gesamtabnahme ausgeben. A14–A17 bleiben bis Paketabschluss in Arbeit.

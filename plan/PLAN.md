# Gesamtplan – Übersicht und offene Schritte

Maßgeblich ist [STAND.md](STAND.md). Historische Phasen, Entscheidungen und
sämtliche früheren Arbeitsstände bleiben im [PLAN-Verlauf](archiv/PLAN-verlauf.md).
Grundlage: [KONZEPT.md](../KONZEPT.md), Arbeitsregeln: [CLAUDE.md](../CLAUDE.md)
und [LEHREN.md](LEHREN.md).

## Aktuelle Arbeit, 06.10.2026

**09.10.2026, 20:44 – Fix A14/A15 im Entwurf 3.18.30:**
Serverseitiger Aktionsschutz, Undo-Prüfung und dauerhafte Konfliktkopien
gebaut. 12 echte SDK-Schutzfälle und 222 Regeln-Prüfungen grün.
Netzteil erkannt, frischer Gesamtlauf läuft. Abnahme/Gegenprüfung noch
nicht vollständig; uncommittete App-Arbeit durch Minuten-Patch gesichert.
Regeln vor Hosting erforderlich, ältere Clients müssen aktualisieren.
Keine Veröffentlichung. Maßgeblich ist der neue oberste Stand-Eintrag.

**09.10.2026, Restinventur abgeschlossen:** Gesehen-Undo und Offline-Gesehen
bestätigen dieselben offenen A14/A15; keine zusätzlichen Doppelfunde.
Fremde Löschung bleibt bei Offline-Bewertung/Gesehen auch nach Nachholen
erhalten. Feste SDK-/Emulatorbelege in KARTEN-KONFLIKTE-2026-10-09.
Nächster Prüfpunkt: abgelehnte Aktionen über Neustart und Tageszähler.
Keine Produktbehebung oder Veröffentlichung.

**09.10.2026, neue bestätigte Datenfunde:** A14/DATEN-9 und A15/DATEN-10
offen: altes Rückgängig und Offline-Nachholen überschreiben neuere fremde
Bewertung derselben Karte. Echte SDK-/Emulator-Gegenprobe 7142b93 rot für
beide; andere Karte unverändert. Belege, abgewogener Lösungsentwurf und
Abnahme in `zyklus-2/KARTEN-KONFLIKTE-2026-10-09.md`. Kein gebauter Fix,
keine erfundene Konflikt-Lernregel, keine App-/Regeländerung oder Deploy.

**Weiterer Auftrag 09.10.2026:** Vorbeugung gegen die eigenen Modellfehler
abgeschlossen: automatische Eingangssperre und Original-Codeaudit, 14
Eingangsprüfungen/neun Auditfälle grün. Regeln vor jeder Empfehlung in
`EMPFEHLUNGEN-PRUEFEN.md`. Danach unbekannte Codefehler systematisch suchen:
`zyklus-2/ZUVERLAESSIGKEIT-NACHPRUEFUNG.md` legt Daten-/Konto-/Lern-/
Backup-/UI-/Gerätedurchgänge und Nachweise fest. Erste Datenstelle gelesen;
vollständige Nachprüfung bleibt offen. Kein App-/Lernregelumbau oder Deploy.

**Korrektur 09.10.2026 nach Gegenprüfung:** Maßgeblich
`zyklus-2/mehrwert/TAGESDECKEL-AUDIT-2026-10-09.md`.
Starttermine im Modell korrigiert, eigene Empfehlung kritisch geprüft.
Kein neues dauerhaftes Tagesziel an Rundengröße koppeln. Vor dem Bau
Nutzen gegenüber vorhandenen Runden und gewünschtes Pensum/Lernkriterium
klären; Empfehlung eines neuen dauerhaften Deckels zurückgenommen.
Neun Auditfälle, 450 korrigierte Modellläufe, Browser-Bereichsrunde und
Standprüfung grün. Keine komplette neue App-Abnahme. Folgender Absatz
ist Verlauf des ersten, anschließend korrigierten Berichts.

**Fortsetzung 09.10.2026:** Tagesdeckel-Rechnung und Empfehlung abgeschlossen;
90 Vergleiche mit tatsächlichen Bewertungsregeln, reproduzierbares Werkzeug
und Ergebnisse unter `zyklus-2/mehrwert/TAGESDECKEL-RECHNUNG-2026-10-09.md`.
Noch keine Lernregel geändert. Zielgröße, faire Auswahl und dauerhaftes
Zählen müssen vor dem Bau feststehen. Betreiber sammelt Änderungen;
„ladegerät“ für den gemeinsamen großen Abschluss später.

**Aktualisierung 09.10.2026:** Maßgeblicher Stand 3.18.29 (E4: Rechtsseiten
im vorhandenen Dialog, Plan und Formulare erhalten), nicht veröffentlicht.
Online ist 3.18.28. Betroffene Tests grün, Klein-Weg; voller Lauf vor
Veröffentlichung durch den Betreiber. Danach iPhone G7: Plan erstellen,
Datenschutz und Impressum öffnen, jeweils „Zurück“ tippen; Plan und
getippter Name müssen erhalten bleiben. Nächste Arbeit: Tagesdeckel
durchrechnen und Empfehlung. Die folgenden Absätze sind Verlauf.

Paket F (3.18.17), D12 (3.18.18), vier Betreiber-Meldungen (3.18.19–3.18.21) die Reihenfolge bei Rundenlimit (3.18.22) und die Runde über alle Bereiche (3.18.23) liegen auf main, nicht veröffentlicht. Gesamtlauf 152/152 nach Neustart des Laptops. Was der Betreiber am 05./06.10. gewünscht und entschieden hat: [Liste](zyklus-2/BETREIBER-2026-10-06.md). Online ist
3.18.14. Einzelheiten: [Logbuch](zyklus-2/LOGBUCH.md), oberster Eintrag,
[Aufgaben](zyklus-2/AUFGABEN.md).

## Reihenfolge

1. D12 ist erledigt (3.18.18). D13 nach [Vorbereitung](zyklus-2/D12-D13-NACHHOLEN.md) nur
   mit Gegensehen am iPhone.
2. Betreiber veröffentlicht E, F und D12 mit „ladegerät“.
3. Fortschritt-Umbau Z1 (C9/C10/C28) im eigenen Chat, Fotos vor dem Commit.
4. Nachprüfung nach [Zyklus-Auftrag](zyklus-2/AUFTRAG.md) §3.6.
5. Text-Probelauf bis 29.10.2026 unverändert lassen; danach Auswertung,
   C18 und D14.

## Offen

- Beim Betreiber: Gerätetests G1–G7 ([Zettel](zyklus-2/GERAETETESTS-ZETTEL.md)),
  Rechtsprüfung der Datenschutzerklärung durch eine Person,
  `plan/texte-lernen/entwurf-g119/` löschen oder behalten (Z14).
- D13 und D15 zurück, D14 und C18 bis 29.10. gesperrt.
- E17 wartet auf G4. E26 später (Z7), Vorlage:
  [E26-Vorschlag](zyklus-2/E26-VORSCHLAG.md).
- Regeln und Hosting veröffentlicht ausschließlich der Betreiber;
  „ladegerät“ startet den festgelegten Ablauf.
- Spätere Funktionen und Konsolenschritte: [FUNKTIONEN](grossplan/FUNKTIONEN.md),
  [KONSOLE](grossplan/KONSOLE.md), historische Fragen im PLAN-Verlauf.

## Neue Session

STAND, CLAUDE und LEHREN lesen, dann Auftrag, Aufgaben und obersten
Logbucheintrag. Bei Paket-F-Fortsetzung die Übergabe lesen und Änderungen
erhalten. Eine Unterbrechung ersetzt keine Abnahme.

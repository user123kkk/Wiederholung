# Frische Nachprüfung – 29.09.2026

## Durchgang auf 3.17.51: A5 nicht bestanden

Produktstand `e9bfc140b1c5b853ae53eea110907c92faf3dc62bc41c4496fc264ef77fae48a`.
91 übrige Prüfscripte vollständig ausgeführt, Ausgaben gelesen; beschreibende
Altdiagnosen nicht als scharfe Verhaltensabnahme gezählt. Lernrunden-Abnahme
separat: erster Lauf 12 bestanden, X-Test ohne Ausgabe im Zeitlimit;
dieser Lauf ist keine 13/13-Freigabe. Frische fortsetzbare vollständige Folge
inzwischen 13/13 grün, alle Geräte-Ausgaben gelesen; beide Affen 0 Befunde.
Die Nachprüfung bleibt wegen der neuen hohen Funde ausdrücklich negativ.

| Bereich | Frisch geprüft | Ergebnis / Grenze |
|---|---|---|
| Konto | Reauth, Löschung/Timeout, Nutzer-Fallback, A→B→Abmelden, Folgeanmeldung | Korrekturen grün; zusätzlicher alter Migrationsauftrag G-104 hoch, kontrollierte echte Funktion schreibt B-Schema und verwirft dessen Umzug |
| Daten | Datei-/Code-Import, Zusammenführung, Weitergabe/Retry, Unter-Sammlungen | G-102/G-103 hoch neu bestätigt; Weitergabe verändert B-Teilfelder, FileReader erzeugt B-Bereich/Karte; Lehrer-Abruf verändert bei gleichem Code B-Stand |
| Lernen | Zähler, Reset/Undo, Karten/Canvas-Identität, Seriengrenzen, echte Touch-Abläufe | SDK-Mehrgeräte-Test grün; Lernregel unverändert; vollständige neue 13er-Folge noch erforderlich |
| Einstieg | kurze/lange Ansichten, Auswahl, Aufdecken, fertiger Plan, Feldfehler/Fokus | G-039-Gegenprobe nach Messkorrektur tatsächlich 205→165; aktueller Stand grün, natürlicher Dokumentfluss ohne Footer-Overlay |
| Regeln | eigene UID, Bereich/Karte, Besitzer-Weitergabe, Stimmen, Reset-Kennung | Aktuelle Regeln unverändert, 179/179 aus Runde 12 gültig; SDK-Zähler-/Reset-Ablauf auf diesem Stand erneut grün; kein Produktionsregelstand behauptet |
| Technik | Versionen/CSP/APP_SHELL, SW-Ausfall/Update, Hosting-ignore/Workflow, Offline | Standprüfer grün; SW behält alten Cache bei fehlender Kerndatei; manuelles Hosting, keine automatische Veröffentlichung beim Push |
| Rest/UI | Verwalten/Einstellungen, Erinnerungs-UID/Zeiten, große Ansichten, Kontrast/A11y, Schreiben | Gezielte Fälle grün; Erstwechsel unter CPU 4× teilweise mehrere 100ms, Beobachtung zur weiteren Ursachenprüfung, keine pauschale Flüssigkeitsfreigabe |
| Produkt/Rahmen | aktuelle Funktionen gegen PLAN/Entscheidungen/Datenschutz abgeglichen | Keine neue Lernmethode/religiösen Texte/Monetarisierung gebaut. Q1 und Betreiberentscheidungen bleiben offen; echtes iOS, echte E-Mails/Konsole nicht lokal abgenommen |

Zusätzliche mittlere Aufgaben G-105/G-106: kontrollierte echte Funktions-
Ausführung zeigt Verlust von Board-Entwurf/Stimm-Anzeige bzw. alte
Bestätigungsprüfung mit B-Token/Neuladen. Kein Server-Stimmverlust behauptet.

**Urteil:** Drei neue hohe Aufgaben G-102/G-103/G-104; A5 fehlgeschlagen,
A6-Zähler weiterhin 0. Runde 14 behebt G-102–G-106. Die Suche ist
breiter als die abgearbeitete Liste, aber kein Beweis vollständiger Fehlerfreiheit.

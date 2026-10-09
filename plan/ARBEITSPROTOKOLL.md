# Arbeitsprotokoll – was gerade getan wird

Zwischenspeicher nach `LEHREN.md` § 1.9: spätestens nach jedem
Arbeitsschritt eine Zeile mit Uhrzeit (was gelesen, geprüft, geändert,
gemessen wurde), dann committen und pushen. Neueste Zeile oben. Ist der
Inhalt im Logbuch oder in `ALLES-OFFEN.md` angekommen, werden alte Zeilen
gelöscht; die letzte Zeile sagt dann, wohin sie gewandert sind.

## 09.10.2026

- Codex Audit abgeschlossen: alte Gegenprobe c78e986 rot, korrigierte 450 Modellläufe, neun Auditfälle einschließlich aller Ergebnis-Hashes/Einzelwerte grün. Browser t_runde_bereiche grün, vollständige Ausgaben gelesen (Rückgängig, Weiterlernen, persistierte Zuordnung, w=9 bei acht Karten). Standprüfung grün. Im korrigierten großen Modell bleiben bei Deckel 20 im Mittel 165,8 ursprüngliche Karten unbesucht; kein Lernwirkungsbeweis. Eigene Rundengröße-Tagesziel-Kopplung zurückgenommen; dauerhaften neuen Deckel vorerst nicht bauen, klar begrenzten Rückkehr-Probelauf mit Pensum/Zusatznutzen/Lernkriterium vorbereiten. Alle aktuellen Planzeiger korrigiert, Originalzahlen erhalten, Fehlerart in LEHREN aufgenommen. Keine App-/Versions-/Cloud-Änderung, kein Gesamtlauf oder Deploy.

- Codex Audit auf ausdrücklichen Auftrag: Modell, Empfehlung, Originalcode und Betreiberentscheidungen kritisch gelesen. Fehler: i bestimmt zugleich Stufe und Terminphase; bei Stufe 3 sind alle ursprünglichen Termine auf derselben Phase statt gleichmäßig. Empfehlung „Tagesziel entlastet“ wurde nicht modelliert, Ziel an Rundengröße koppeln ist unbegründet, globale Mischung würde früherem Betreiberauftrag widersprechen. Historische Ergebnisse bleiben erhalten, korrigierter Lauf bekommt eigene Datei. Primärquellen Anki-Handbuch und Fachartikel geprüft; Quelle für konkrete optimale App-Zahl fehlt. Akku 34 %, nur Einzelprüfungen/Analyse, kein Gesamtlauf.

- Codex Abschluss Tagesdeckel: Werkzeug/Aufgaben/Logbuch als c78e986 auf main gepusht; Bericht und JSON durch Minuten-Sicherung bereits auf main. Arbeitsbaum sauber, origin/main gleich. Tagesdeckel-Rechnung und Empfehlung fertig, Bau wartet auf die ausdrücklich offenen Ziel-/Auswahl-/Zählentscheidungen; Veröffentlichung weiterhin gesammelt später. Kein App-Versionswechsel, .29 lokal und .28 laut letztem Online-Beleg.

- Codex Rechnung fertig: 90 Vergleiche, je fünf feste Folgen/180 Tage. 1100 Karten/60 Tage Pause, 85/10/5: Deckel 20 lässt nach 180 Tagen im Mittel 175,6 ursprüngliche Karten unbesucht; Deckel 30 letzter Erstbesuch Tag 158–177. Älteste zuerst/30 erreicht Tag 35, verursacht aber mehr gesamte Wartezeit (60263,2 statt 41143,2 Kartentage). Keine Aussage über echtes Behalten. Empfehlung und offene Bauentscheidungen im Rechnungsbericht, alle aktuellen Planzeiger nachgezogen; App unverändert. Selbstprüfung und Kern 12/12 grün. Nur neue Reihenfolge-Varianten zusätzlich gerechnet, erfolgreiche Tagesmengen nicht wiederholt.

- Codex Tagesdeckel-Rechnung: sechs synthetische Szenarien, vier Tagesmengen, drei Antwortmuster, je fünf Folgen über 180 Tage. Nur Analysewerkzeug; App unverändert. Originaler Lernlogik-Schnelltest 12/12 grün. Zwei eigene langsame Rechenstarts ohne Ergebnis beendet und Laufzeit verbessert (Kern einmal kompilieren, keine Funktionserzeugung je Kartenbewertung); keine Ergebnisse aus abgebrochenen Läufen übernommen. Modellgrenzen und falsche Annahme „w = verschiedene Karten“ im neuen Rechnungsbericht dokumentiert. Abschließender Lauf läuft.

- Codex Fortsetzung: Betreiber möchte weiterarbeiten und „ladegerät“ für das größere gemeinsame Stück aufheben. Auftrag wörtlich in ALLES-OFFEN gespeichert. Tagesdeckel: tatsächliche Auswahl, Bewertungsregel, Wiederholungsqueue und Tageszähler gelesen. Wichtig: verlauf.w zählt Antworten, nicht verschiedene Karten; eine neue Karte kann beim zweiten Sicher bereits w erhöhen. Simulation nutzt den vorhandenen Lernlogik-Block und die tatsächliche Dringlichkeitssortierung, ohne Produktänderung und ohne erfundene Gedächtnisleistung.

- Codex Abschluss: 3.18.29 als 2bdf83c auf main committet und gepusht. Fünf betroffene Testläufe grün (E4, Rechtsplan-Umfeld, Anmeldung-Enter, Einstellungen, Dialog-Timer); vollständige Logs gelesen und gesichert. Klein-Weg, kein Gesamtlauf, nicht veröffentlicht. Online bleibt laut letztem Veröffentlichungsbeleg 3.18.28. G7 am echten iPhone nach Veröffentlichung offen; nächste Arbeit Tagesdeckel-Rechnung. Details im Zyklus-Logbuch, Eintrag 3.18.29. Ein Plan-Schreibbefehl wurde wegen PowerShell-Quotierung vor Ausführung abgelehnt und korrigiert, ohne Dateiänderung aus dem Fehlversuch.

- 15:50 Codex: E4 am festen d64380a rot (echter Zurück-Link, Formular fehlt). Neuer Weg: bestehender Dialog, unveränderte Rechtsseiten lokal laden, Rückweg bleibt sichtbar. E4 390/320/820 grün; Umfeld sechs Geräte-/Farbkombinationen grün, Fehler/Neuversuch und verspätete Antwort geprüft. iPad-Kontrastmeldung als Scroll-Clip belegt und alle sichtbaren Abschnitte durchgescrollt geprüft. 3.18.29 vorbereitet; Standprüfung grün. Betroffene Regressionen laufen; Akku BatteryStatus 1, Klein-Weg, kein Gesamtlauf/Deploy.

- Codex, Auftrag „weiter“: Desktop-Checkout sauber auf d64380a / 3.18.28 aktualisiert. Übergabe, Betreiber-Verstehen, offene Liste, Grundregeln und E4-Befund gelesen. Minuten-Sicherung gestartet (Git Bash). E4 wieder offen: tatsächlichen Zurück-Weg prüfen, vorhandenen Dialog für Rechtsinhalt verwenden. Nicht veröffentlichen.

- 04:38 **3.18.28 ist online.** `ladegeraet.ps1 -Fortsetzen`: 155 bewahrt,
  `t_serie_lang` Exit 0, zusammen 156/156; Affen Handy 200 und iPad 150 je
  0 Befunde; Regeln eingespielt; Hosting veröffentlicht. Abgerufen:
  `adrabic.web.app/sw.js` zeigt `adrabic-3.18.28`.
- 04:30 „ladegerät“ an 3.18.28 endete 04:19 mit 155/156, nichts
  veröffentlicht. Rot: `t_serie_lang` Fall 3 (47 statt 48), lief 04:01.
  Einzeln 04:20 wieder rot. Ursache gerechnet und belegt: Der Test
  verschiebt die Uhr der Seite um Vielfache von 24 h; über das Ende der
  Sommerzeit (25.10.) zeigt sie dann 03:xx statt 04:xx und liegt vor der
  4-Uhr-Grenze, die Seite lebt einen Lerntag zurück. Tritt nur zwischen
  04:00 und 05:00 auf. Kein App-Fehler. Test auf Kalendertage umgestellt
  (Erwartungen unverändert): 04:24 grün, 3/3 Fälle. `ladegeraet.ps1` hat
  jetzt `-Fortsetzen`; damit läuft der Stichwort-Ablauf am selben
  Quellstand weiter (155 bestandene bleiben, `t_serie_lang` neu, dann
  Affen, Regeln, Hosting). Gleiche Falle möglich in `t_gruss_datum` und
  `t_paket_c_kalendertage` (nutzen denselben Versatz aus `lib.js`); `lib.js`
  selbst erst nach dem Veröffentlichen berichtigen, weil es zum Quellstand
  gehört.
- 02:07 Betreiber: Safari, Version .26. Ursache am Code gefunden: „← Zurück“
  auf den Rechtsseiten ist ein Link auf `./index.html` und lädt im neuen
  Reiter die App neu. In `ALLES-OFFEN.md` nachgetragen. Der Test zu E4
  prüft diesen Weg nicht (LEHREN § 5.3: Test muss den echten Weg gehen).
- 02:02 Betreiber meldet: Plan im Einstieg ist weg nach Datenschutz/
  Impressum und zurück. In `ALLES-OFFEN.md` § 3.2 eingetragen, mit Abgleich
  (E4, G7, `app.js` 8966). Nichts gebaut: `ladegerät` läuft, und die
  Ursache ist am Gerät noch nicht belegt.
- 01:58 `zyklus-2/mehrwert/agentenberichte/ALLE-IDEEN.md` erzeugt: 338
  nummerierte Ideen wörtlich (Titel) aus 23 Berichten; 9 Berichte haben
  eine andere Form und sind noch ganz zu lesen, 2 sind leer. Der Abgleich
  mit dem Katalog (187 Zeilen) steht noch aus.
- 01:50 Betreiber: „ladegeraet“ (Stichwort, Freigabe für Regeln und
  Hosting). `ladegeraet.ps1` gestartet an 3.18.28, Netzteil, Baum sauber.
  Ausgabe: `%TEMP%/ladegeraet-3.18.28.log`. Achtung: Der Lauf überquert
  04:00 (Wechsel des Lerntags); rote Datumstests danach einzeln prüfen
  (LEHREN § 5.4). Er fragte auch „34? ich dachte über 60“: 34 sind
  Berichte (einer je Agent), darin stecken die Ideen (Katalog: 187 Zeilen,
  68 Fragen).

## 08.10.2026

- 19:15 3.18.28 auf `main` (9f2990a) und gepusht. Zweiter Lauf `t_paket_e`,
  `t_einstellungen`, `t_einst` grün. Logbuch, STAND, ALLES-OFFEN
  nachgezogen. Patch `verstaendlichkeit/woerter-3.18.28-entwurf.patch` ist
  damit überholt (bleibt als Beleg).
- 18:56 Tests am Entwurf 3.18.28 fertig: 33 von 34 grün, `abnahme_runde.js`
  13/13. Rot: `t_paket_e` E6 („Zeile behauptet keinen eingerichteten
  Termin“). Echter Fehler im Entwurf, nicht im Test: „19:30 Uhr, im
  Kalender“ behauptet einen Termin, den die App nicht kennt; „Vorlage für
  19:30 Uhr“ war in Paket E bewusst so gewählt. Mein Vorschlag in der
  Tabelle „Niedrig“ war nicht mit dem Repo abgeglichen (LEHREN § 1.7).
  Zurückgenommen in `app.js` und CHANGELOG; `t_paket_e` läuft neu.
- 17:58 Minuten-Sicherung sichert jetzt auch den laufenden Chat wörtlich
  (jede Minute, nach `Desktop\Wiederholung-Belege\chats\`, außerhalb des
  Repos, weil es öffentlich ist). Betreiber 17:57: „auch laufende
  Aufgaben, ihren Stand, ihre Wege?“ Neu gestartet, läuft.
- 17:55 Minuten-Sicherung erweitert und neu gestartet (Betreiber 17:52:
  „wirklich alles … selbst Tests … ich will ein klares: ist eingebaut“):
  sichert jetzt jede Minute auch alle Testausgaben (`plan/sicherung/tests/`,
  26 Läufe der letzten zwei Tage) und schreibt
  `plan/sicherung/UEBERGABE-AKTUELL.md`. Erster vollständiger Durchgang
  17:54 committet und gepusht (4fefe03). Patch enthält jetzt auch die
  geänderten Testdateien (geprüft). `AGENTS.md` und `CLAUDE.md` verweisen
  darauf.
- 17:50 Minuten-Sicherung läuft (`plan/werkzeuge/minuten_sicherung.sh`, im
  Hintergrund dieses Chats): jede Minute `plan/` und `CLAUDE.md` committen
  und pushen, uncommitteter App-Entwurf als
  `plan/sicherung/entwurf-aktuell.patch`. Erster Lauf 17:47 gesichert und
  gepusht (758e1c5). Bekannte Lücke: geänderte Testdateien unter
  `plan/werkzeuge` fehlen in diesem Patch (stehen im Patch unter
  `verstaendlichkeit/`); beim nächsten Neustart des Skripts beheben.
  Betreiber 17:49: „ich hab Zweifel, ob du wirklich Sachen alle 60 Sek.
  speicherst“ – deshalb Automatik statt Versprechen.
- 17:47 Regel § 1.9, `BETREIBER-VERSTEHEN.md`, dieses Protokoll und die
  Wünsche zur Arbeitsweise in `ALLES-OFFEN.md` § 3.2a eingetragen.
- 17:45 Alle 43 lokalen Chats wörtlich gesichert nach
  `Desktop\Wiederholung-Belege\chats\` (Werkzeug `chats_sichern.py`).
- 17:43 Agentenberichte der Mehrwert-Runden gefunden (lokale Chat-Dateien,
  Ordner `subagents`), 34 von 36 wörtlich nach
  `zyklus-2/mehrwert/agentenberichte/`; zwei Agenten hatten keinen Bericht
  (am Limit abgebrochen).
- 17:39 `ALLES-OFFEN.md` angelegt: 450 Betreiber-Nachrichten gelesen und
  gegen das Repo geprüft.
- 17:27 Tests am Entwurf 3.18.28 gestartet (34 Tests, danach
  `abnahme_runde.js`); Ergebnis: `%TEMP%\entwurf-3.18.28\_ergebnis.txt`.
  Entwurf liegt uncommittet im Hauptordner, Patch unter
  `zyklus-2/mehrwert/verstaendlichkeit/woerter-3.18.28-entwurf.patch`.
- 17:26 Voller Lauf an 3.18.27 ausgewertet: 153/156, drei Nachläufe grün,
  Affen 0 Befunde. Zehn Hilfsskripte auf `PRUEF_PORT` umgestellt.
- 14:52 Voller Lauf `ladegeraet.ps1 -NurPruefen` an 3.18.27 gestartet;
  währenddessen Bericht „Verständlichkeit“ geschrieben.

**Gerade offen:** nichts läuft. Als Nächstes: Katalog gegen die 34
Agentenberichte abgleichen, Tagesdeckel rechnen, Schritt (b) der
Verständlichkeit. Wartet auf den Betreiber: „ladegerät“.

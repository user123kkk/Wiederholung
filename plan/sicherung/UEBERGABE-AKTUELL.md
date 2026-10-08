# Übergabe – Stand von 08.10.2026 23:23 (wird jede Minute neu geschrieben)

Für Claude und Codex: Wer hier weitermacht, braucht keine Erklärung vom
Betreiber. Erst diese Seite, dann `plan/BETREIBER-VERSTEHEN.md`,
`plan/ALLES-OFFEN.md`, `plan/STAND.md`, `plan/ARBEITSPROTOKOLL.md`.

## Stand

- Zweig und letzter Commit: `main`, `e5a9d68 Sicherung 23:22 (automatisch, jede Minute)`
- Version in `app.js` (Arbeitsordner): const APP_VERSION = "3.18.28"
- Version im letzten Commit: const APP_VERSION = "3.18.28"

## Uncommittete Dateien (stehen vollständig in `plan/sicherung/entwurf-aktuell.patch`)

Keine. Alles ist committet.

## Was gerade läuft

- Prozesse: node.exe 0, chrome.exe 16 (mehrere node.exe mit chrome.exe heißt meist: Tests laufen).

## Letzte Testergebnisse (vollständige Ausgaben: `plan/sicherung/tests/`)

**entwurf-3.18.28**: 37 grün, 1 rot, zuletzt: EXIT 0 t_einst (2. Lauf)
```
EXIT 1 t_paket_e
```

**ladegeraet-nurpruefen-3.18.27.log**: 153 grün, 3 rot
```
ROT t_griff_scrollen.js (27s)
ROT t_konto_fortsetzungen.js (2s)
ROT t_paket_f_netz.js (1s)
153/156 Exit 0; 3 rot. Ausgaben noch lesen: C:\Users\USER\AppData\Local\Temp\adrabic-pruefstand-gesamt\7223038b21480566
ABGEBROCHEN: Pruefstand nicht komplett gruen (Liste oben). Nichts veroeffentlicht.
```

## Zuletzt getan (aus `plan/ARBEITSPROTOKOLL.md`)

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

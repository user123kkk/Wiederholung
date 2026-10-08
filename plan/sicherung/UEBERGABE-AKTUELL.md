# Übergabe – Stand von 08.10.2026 18:30 (wird jede Minute neu geschrieben)

Für Claude und Codex: Wer hier weitermacht, braucht keine Erklärung vom
Betreiber. Erst diese Seite, dann `plan/BETREIBER-VERSTEHEN.md`,
`plan/ALLES-OFFEN.md`, `plan/STAND.md`, `plan/ARBEITSPROTOKOLL.md`.

## Stand

- Zweig und letzter Commit: `main`, `afb3fb8 Sicherung 18:29 (automatisch, jede Minute)`
- Version in `app.js` (Arbeitsordner): const APP_VERSION = "3.18.28"
- Version im letzten Commit: const APP_VERSION = "3.18.27"

## Uncommittete Dateien (stehen vollständig in `plan/sicherung/entwurf-aktuell.patch`)

```
 M CHANGELOG.md
 M app.js
 M datenschutzerklaerung.html
 M index.html
 M plan/werkzeuge/pruefstand/t_paket_c_weiter.js
 M plan/werkzeuge/pruefstand/t_runde_bereiche.js
 M sw.js
```

Auf einem sauberen Stand desselben Commits wiederherstellen:
`git apply --check plan/sicherung/entwurf-aktuell.patch`, dann `git apply plan/sicherung/entwurf-aktuell.patch`.

## Was gerade läuft

- Prozesse: node.exe 1, chrome.exe 24 (mehrere node.exe mit chrome.exe heißt meist: Tests laufen).

## Letzte Testergebnisse (vollständige Ausgaben: `plan/sicherung/tests/`)

**entwurf-3.18.28**: 32 grün, 0 rot, zuletzt: EXIT 0 t_paket_c_weiter

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

**Gerade offen:** Tests am Entwurf 3.18.28 laufen. Danach: Ausgaben lesen,
3.18.28 auf `main`, Tagesdeckel rechnen, Katalog gegen Agentenberichte
abgleichen.

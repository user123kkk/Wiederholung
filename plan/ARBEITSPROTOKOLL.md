# Arbeitsprotokoll – was gerade getan wird

Zwischenspeicher nach `LEHREN.md` § 1.9: spätestens nach jedem
Arbeitsschritt eine Zeile mit Uhrzeit (was gelesen, geprüft, geändert,
gemessen wurde), dann committen und pushen. Neueste Zeile oben. Ist der
Inhalt im Logbuch oder in `ALLES-OFFEN.md` angekommen, werden alte Zeilen
gelöscht; die letzte Zeile sagt dann, wohin sie gewandert sind.

## 08.10.2026

- 18:55 Regel § 1.9, `BETREIBER-VERSTEHEN.md`, dieses Protokoll und die
  Wünsche zur Arbeitsweise in `ALLES-OFFEN.md` § 3.2a eingetragen.
- 18:45 Alle 43 lokalen Chats wörtlich gesichert nach
  `Desktop\Wiederholung-Belege\chats\` (Werkzeug `chats_sichern.py`).
- 18:40 Agentenberichte der Mehrwert-Runden gefunden (lokale Chat-Dateien,
  Ordner `subagents`), 34 von 36 wörtlich nach
  `zyklus-2/mehrwert/agentenberichte/`; zwei Agenten hatten keinen Bericht
  (am Limit abgebrochen).
- 18:15 `ALLES-OFFEN.md` angelegt: 450 Betreiber-Nachrichten gelesen und
  gegen das Repo geprüft.
- 17:27 Tests am Entwurf 3.18.28 gestartet (34 Tests, danach
  `abnahme_runde.js`); Ergebnis: `%TEMP%\entwurf-3.18.28\_ergebnis.txt`.
  Entwurf liegt uncommittet im Hauptordner, Patch unter
  `zyklus-2/mehrwert/verstaendlichkeit/woerter-3.18.28-entwurf.patch`.
- 17:20 Voller Lauf an 3.18.27 ausgewertet: 153/156, drei Nachläufe grün,
  Affen 0 Befunde. Zehn Hilfsskripte auf `PRUEF_PORT` umgestellt.
- 14:52 Voller Lauf `ladegeraet.ps1 -NurPruefen` an 3.18.27 gestartet;
  währenddessen Bericht „Verständlichkeit“ geschrieben.

**Gerade offen:** Tests am Entwurf 3.18.28 laufen. Danach: Ausgaben lesen,
3.18.28 auf `main`, Tagesdeckel rechnen, Katalog gegen Agentenberichte
abgleichen.

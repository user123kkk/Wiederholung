# Runde über alle Bereiche – laufender Stand, 07.10.2026

Für den Notfall-Wechsel. Maßgeblich bleibt das Logbuch.

**Fest auf main:** b45a13b, 3.18.22 (alles bis dahin abgenommen, nicht
veröffentlicht, online ist 3.18.14).

**Offen im Arbeitsbaum, Entwurf 3.18.23:** `app.js` (Funktionen
`offeneWiederholungen`, `rundeWeitereBereiche`, `rundeRestAnzahl`,
`rundeNaechsterBereich`; geändert `startSession`, `gradeCard`,
`undoLastGrade`, `renderSession`, `renderRundenEnde`, `bereicheMitOffenem`),
Version in app.js/sw.js/index.html, CHANGELOG. Neuer Test
`t_runde_bereiche.js`. Vorstand `runde-belege/app-vor-23.js`.

**Schon geprüft:** `t_runde_bereiche.js` zehn Fälle grün
(`runde-belege/runde-neu.log`), Gegenprobe am festen b45a13b schlägt an
(`runde-alt.log`); `t_rundenende`, `t_undo_verlauf`, `t_heute_bereich`,
`t_x_mitten`, `t_reihenfolge_limit` grün.

**Läuft seit 07:13:** Gesamtlauf, 152 Tests, Quellstand c00d9e558808a295 (Neustart 07:29 nach zwei Nachbesserungen: Lernen-Bildschirm zählt wie die Runde, Kommentar),
losgelöst (`runde-belege/gesamtlauf.pid`, Ausgabe `gesamtlauf-1.log`).
Danach von selbst Runden-Abnahme und Affen (`runde-belege/kette.ps1`);
fertig, wenn `runde-belege/kette-fertig.txt` da ist. Sicherung jede Minute
nach `Desktop\Wiederholung-Belege\D12-2026-10-06-laufend\`.

**Weiter (Stichwort „Runde weiter“):** wie in
`E05-UEBERGABE-2026-10-07.md` Schritte 1–6, mit diesen Dateien. Vergleich
der Logs gegen den Lauf 6b07c2a930bb5248 (3.18.22). Erwartbar anders: Tests
mit mehreren Bereichen, in denen ein zweiter Bereich fällige Wiederholungen
hat.

**Grenzen der ersten Fassung, auf Betreiberwunsch („fix die Grenzen dann“) behoben:**
Der Stapel auf Lernen zählt jetzt dasselbe wie die Runde und zeigt den
Startknopf auch, wenn nur andere Bereiche fällig sind (`lernenStapel`); der
Hinweis darunter heißt „Mit dabei: …“. Tests 0, 11, 12 in `t_runde_bereiche.js`.

## Stand 11:35 – D11 geklärt, Abnahme-Kette läuft

- Vergleichslauf `t_paket_d.js` am festen Vorstand b45a13b (3.18.22, eigener
  Arbeitsbaum, Port 8098): **ebenfalls rot an D11** nach 202 grünen
  Zuständen. Beleg `runde-belege/vergleich-alt-t_paket_d.log` und `.err`.
  Also Störung von außen (Spiel auf derselben Grafikeinheit), kein Fehler
  von 3.18.23. In `LEHREN.md` § 5.3 und § 15 eingetragen.
- Arbeitsbaum und Server 8098 wieder entfernt.
- Seit 11:33 läuft abgekoppelt `runde-belege/kette2.ps1`: Gesamtlauf
  `--fortsetzen` (nur `t_paket_d` neu) → Runde → Affe Handy 200 → Affe iPad
  150. Ausgaben: `gesamtlauf-5-fortsetzen.log`, `abschluss-runde.log`,
  `abschluss-affe-handy.log`, `abschluss-affe-ipad.log`; fertig, wenn
  `kette2-fertig.txt` da ist.
- Commit erst, wenn `t_paket_d` grün ist. Bleibt er rot: wiederholen, wenn
  der Rechner frei ist. Grenze nicht anfassen.

## Stand 13:50 – abgeschlossen mit einem offenen Test

Runde 13/13, Affen 0, Gesamtlauf 151/152. D11 rot, auch am Vorstand; Ursache offen. Alles Weitere im Logbuch Zyklus 2, oberster Eintrag.

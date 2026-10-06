# D12 und D13 nachholen – Vorbereitung, 05.10.2026

Nur gelesen und aufgeschrieben, während Paket F geprüft wird. Nichts gebaut.
Betreiber 05.10.: „jo“ zu „D12/D13 vorbereiten“. Das Nachholen selbst ist ein
eigener Chat **nach** dem Commit von Paket F (Stichwort z. B. „D12 D13 weiter“).

## Warum es jetzt gehen sollte

Beide Zeilen stehen auf `zurück`, weil der Fotovergleich rot war und die
Ursache offen blieb (`D-UEBERGABE-2026-10-03.md` § 3). Am 05.10. wurde bei F12
dasselbe Muster als Messfehler belegt (`LEHREN.md` § 5.3, § 15):

- Fotos mit GPU-Raster haben bei **gleicher** Quelle mehrere Fassungen
  (Verlaufs-Rauschen ±1, andere Kachelgrößen). Das passt zu den D12-Belegen
  „DOM gleich, Rasterkacheln 224×256 statt 800×448“ und „unveränderter
  Vorstand erzeugt dasselbe rote PNG“.
- Mit Software-Raster (`--disable-gpu`) und Kontrolle Alt gegen Alt sind die
  Fotos in allen Konfigurationen ohne Bewegung und in den Konto-
  Konfigurationen mit Bewegung gleich (`paket-f-belege/f12-sicht-voll-3.log`).

Das ist eine begründete Erwartung, kein Ergebnis für D12/D13. Die starken
alten Fehler (32 Korallpixel, 70.880 Pixel auf „Konto löschen“) sind damit
nicht erklärt, nur wahrscheinlich dieselbe Klasse. Zeigt das neue Messgerät
dort bei gleicher Kontrolle einen Unterschied, bleibt die Zeile zurück.

## Was vorhanden ist

Sicherung `Desktop\Wiederholung-Belege\Paket-D-2026-10-03-Uebergabe\temp\`:

| Ordner | Inhalt |
|---|---|
| `paket-d-d12-vor-20261003/` | app.js, styles.css vor D12 (styles SHA256 78c0b553…) |
| `paket-d-d13-vor-20261003/` | Stand mit D12, vor D13 (styles 9a9ca879…) |
| `paket-d-d12-d13-fortsetzung-abgelehnt-20261003/` | Entwurf D12+D13: styles.css (183 +, 196 − gegen d12-vor), app.js (13 + für D12), `d13_tokenleiter.mjs` |

Die Entwürfe stammen vom Stand 3.18.13. Seitdem kamen D1–D11, Paket E und
Paket F (auch CSS). Sie lassen sich nicht einfach kopieren.

## Vorgehen (Vorschlag)

1. Paket F ist committet, Arbeitsbaum sauber, Netzteil dran.
2. **D12:** Diff `d12-vor → d13-vor` Zeile für Zeile gegen den Befund BEW-12
   lesen und auf den aktuellen Stand übertragen. Was F12 schon entfernt hat
   (`.grade-row button .sub`), entfällt. Jede Stelle am aktuellen Code
   nachlesen, die Zeilennummern im Befund stimmen nicht mehr.
3. **D13:** `d13_tokenleiter.mjs` nicht blind laufen lassen. Erst lesen,
   welche Rohwerte es auf welche Token legt, dann auf dem aktuellen
   `styles.css` anwenden. Ziel aus dem Befund: höchstens 15 Rohwerte.
4. **Abnahme mit `x_paket_f_sicht.js`** (Alt = fester Vorstand als Datei,
   Kontrolle Alt/Alt, `--disable-gpu`, 0 Toleranz). Zwei Anpassungen sind
   nötig und vorher festzulegen, nicht nach einem roten Lauf:
   - D12 entfernt `transition`-Angaben, D13 ändert Dauern und Kurven. Die
     berechneten Stile unterscheiden sich dort also absichtlich. Der
     Stilvergleich muss genau diese Eigenschaften ausnehmen
     (`transition-*`, `animation-duration`, `animation-timing-function`,
     `animation-delay`) und sonst streng bleiben. Die Liste der betroffenen
     Elemente gehört ins Log.
   - Die Endbilder müssen gleich bleiben (Fotos). Was sich ändern darf, ist
     nur der Verlauf einer Bewegung. Den prüfen die vorhandenen Tests
     (`t_paket_d.js`, `t_fluessig*.js`, `t_sprung.js`, `abnahme_runde.js`).
5. D13 ändert Zeiten, die man sieht. Dafür reicht ein Chromium-Test nicht:
   Der Betreiber sieht sich danach Karte aufdecken, bewerten und Blatt
   öffnen am iPhone an (LEHREN § 5.6).

## Dafür und dagegen

- **Dafür:** zwei offene Zeilen schließen sich, die Entwürfe sind da, das
  Messproblem ist wahrscheinlich gelöst. D13 macht spätere Bewegungs-
  Änderungen einfacher (eine Leiter statt 25 Einzelwerten).
- **Dagegen:** beide sind „niedrig“. D13 fasst über hundert Stellen an und
  ändert fühlbare Zeiten; das Risiko eines neuen Rucklers ist echt
  (`CLAUDE.md`: UI-/Bewegungsänderungen erzeugen hier leicht neue Fehler).
  D12 dagegen ist reines Aufräumen.

**Empfehlung:** D12 nachholen. D13 nur, wenn der Betreiber bereit ist, danach
am iPhone gegenzusehen; sonst als `später` führen statt `zurück`.

## Nicht Teil davon

D14 (gesperrt bis 29.10.), D15 (zwei Fehlversuche, erst am Gerät ansehen).

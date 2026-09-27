# Übergabe für eine ausdrücklich delegierte Codex-Aufgabe

Nur bei ausdrücklichem Auftrag zur Delegation: Der verantwortliche Codex-Chat
füllt diese Vorlage für **genau eine** Aufgabe aus. Das Modell wird nach
`AUFTRAG.md` § 1 empfohlen. Alles in spitzen Klammern ersetzen. Aufgaben mit
unklarer Ursache bleiben zunächst beim verantwortlichen Chat.

---

```
Du arbeitest im angehängten Repo Wiederholung (Karteikarten-PWA „Adrabic",
kein Build-Schritt). Du erledigst genau EINE Aufgabe: <ID> – <Titel>.

Lies vorher:
- plan/LEHREN.md § <nur die Abschnitte, die die Aufgabe berühren, z. B. 6.1, 7.1>
- die genannten Codestellen selbst (nicht aus dem Gedächtnis arbeiten)

Was falsch ist (Befund):
<Beleg mit datei:zeile und kurzem Zitat; Messung>

Was du änderst – nur das:
1. <Datei>: <Funktion/Selektor> – <genau was, ggf. mit neuem Wortlaut in Anführungszeichen>
2. …

Was du NICHT anfasst:
- keine anderen Stellen, keine „Aufräumarbeiten" nebenbei
- APP_VERSION, sw.js CACHE_NAME, index.html ?v=, CHANGELOG.md, plan/ – macht der Dirigent
- keine Lernlogik (Stufen, Abstände, Bewertung, Serie), kein religiöser Text
- nicht committen, nicht pushen
- kein `git stash`, `git checkout .` oder `git restore .` – andere Agenten können
  parallel an anderen Dateien arbeiten. Gegenprobe: eigene Datei vorher kopieren
  und danach zurückkopieren (Runde 5: ein Handwerker stashte den ganzen Ordner,
  während ein zweiter schrieb)

Regeln des Repos, die hier gelten:
- ein delegierter Klick-Listener über data-action (kein eigener Listener an Knöpfen)
- Eintrittsbewegungen nur als @keyframes; prefers-reduced-motion beachten
- Zustand in `ui`, nicht nur im DOM
- Texte: Du-Form, ein Satz, mz(n, "Karte", "Karten") für Einzahl/Mehrzahl,
  keine Systemcodes; deutsche Anführungszeichen nur IN Strings, nie als Begrenzer,
  und zwar genau „ (U+201E) … “ (U+201C) wie im Bestand – nicht ” (U+201D)
  (Runde 1: Haiku setzte ” – Abnahme fand es)
- nur vorhandene CSS-Token (var(--…)), die es in styles.css wirklich gibt

Prüfen, bevor du fertig meldest:
- node --check app.js
- <konkreter Test aus plan/werkzeuge/pruefstand; Browserpfad der aktuellen Umgebung verwenden>
  (Server läuft auf 127.0.0.1:8099; falls nicht: im Repo-Wurzelordner
  einen lokalen HTTP-Server auf Port 8099 starten)
- <grep, der 0 bzw. N Treffer liefern muss>

Abnahme (daran prüft der Dirigent):
<das Kriterium aus AUFGABEN.md, wörtlich>

Deine Antwort: (1) welche Dateien/Zeilen du geändert hast, (2) Ausgabe der
Prüfbefehle, (3) alles, was dir unklar war oder was du bewusst nicht gemacht
hast. Nichts beschönigen: wenn ein Test rot ist, sag es.
```

---

## Nach der Rückmeldung (verantwortlicher Chat)

1. `git diff` lesen – nur die genannten Stellen geändert?
2. Abnahme **selbst** prüfen (Test selbst laufen lassen).
3. Passt → Status `erledigt` (Version kommt beim Runden-Commit dazu).
   Passt nicht → Ursache prüfen und mit genauem Grund korrigieren.

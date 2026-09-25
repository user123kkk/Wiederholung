# Übergabe an einen Handwerker (Sonnet) oder eine Hilfskraft (Haiku)

Der Dirigent (Opus) füllt diese Vorlage für **genau eine** Aufgabe aus und gibt
sie als Prompt an den Agenten (`model: "sonnet"` oder `"haiku"`). Alles in
spitzen Klammern ersetzen. Je genauer, desto weniger muss geraten werden – was
sich nicht genau beschreiben lässt, ist eine Opus-Aufgabe.

---

```
Du arbeitest im Repo /home/user/Wiederholung (Karteikarten-PWA „Adrabic",
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

Regeln des Repos, die hier gelten:
- ein delegierter Klick-Listener über data-action (kein eigener Listener an Knöpfen)
- Eintrittsbewegungen nur als @keyframes; prefers-reduced-motion beachten
- Zustand in `ui`, nicht nur im DOM
- Texte: Du-Form, ein Satz, mz(n, "Karte", "Karten") für Einzahl/Mehrzahl,
  keine Systemcodes; deutsche Anführungszeichen nur IN Strings, nie als Begrenzer
- nur vorhandene CSS-Token (var(--…)), die es in styles.css wirklich gibt

Prüfen, bevor du fertig meldest:
- node --check app.js
- <konkreter Test: cd plan/werkzeuge/pruefstand && CHROMIUM=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node t_xyz.js>
  (Server läuft auf 127.0.0.1:8099; falls nicht: im Repo-Wurzelordner
  `python3 -m http.server 8099 --bind 127.0.0.1` im Hintergrund starten)
- <grep, der 0 bzw. N Treffer liefern muss>

Abnahme (daran prüft der Dirigent):
<das Kriterium aus AUFGABEN.md, wörtlich>

Deine Antwort: (1) welche Dateien/Zeilen du geändert hast, (2) Ausgabe der
Prüfbefehle, (3) alles, was dir unklar war oder was du bewusst nicht gemacht
hast. Nichts beschönigen: wenn ein Test rot ist, sag es.
```

---

## Nach der Rückmeldung (Dirigent)

1. `git diff` lesen – nur die genannten Stellen geändert?
2. Abnahme **selbst** prüfen (Test selbst laufen lassen).
3. Passt → Status `erledigt` (Version kommt beim Runden-Commit dazu).
   Passt nicht → zurück an denselben Agenten (`SendMessage`) mit dem genauen
   Grund. Nach zwei Fehlschlägen übernimmt Opus.

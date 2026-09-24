# Prüfstand (Playwright, ohne echtes Firebase)

Für die Prüfschleife (`plan/audit/AUFTRAG.md`). Liegt unter `plan/`, wird also
nicht ausgeliefert.

- `stubs.js` – zustandsbehafteter Nachbau von Firebase App/Auth/Firestore; wird
  per `page.route` statt `www.gstatic.com` ausgeliefert.
- `lib.js` – `start()`, `neueSeite(browser, GERAETE.x, {user, store, ls, leer,
  thema, warte})`, `aktion(p, data-action, data-id, warte)`, `foto(p, name)`,
  `vollerStore()` (40 Karten über alle Stufen, 25 Tage Verlauf).
- `affe.js` – Zufallstest: `node affe.js handy 200 7` (Gerät, Schritte, Seed).
- `t_sprung.js` – misst, ob die Karte beim Aufdecken springt (Ziel: 0 px).
- `t_bild.js` – hält Animationen Bild für Bild an (`document.getAnimations()`).
- `bogen.py` – Kontaktbogen: `python3 bogen.py aus.png 800 a.png b.png …`.

Einrichten (einmal):

```
cd plan/werkzeuge/pruefstand
npm init -y && PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm i playwright
# im Repo-Wurzelordner, eigener Prozess:
python3 -m http.server 8099 --bind 127.0.0.1
# dann z. B.:
CHROMIUM=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node t_sprung.js
```

Fotos landen in `$PRUEF_BILDER` (Standard: `<tmp>/adrabic-pruefbilder`).
`node_modules/` und `package*.json` nicht einchecken.

# Prompt für Claude Design

Alles zwischen den beiden Linien in Claude Design einfügen. Gib Claude Design
Zugriff auf die echten Dateien des Repos (`styles.css`, `app.js`, `index.html`,
`landing.html`) — es soll **auf ihnen aufbauen**, nicht bei null anfangen.

---

Du gestaltest die mobile Oberfläche für **Adrabic**, eine bestehende Karteikarten-PWA
(arabischer Wortschatz, Quran-Bezug). Kein Framework, kein Build — reines Vanilla
JS/CSS, dunkel-zuerst, ein einziger delegierter Klick-Listener über `data-action`.
Es ist ein ruhiges, minimalistisches Lernwerkzeug für eine Handvoll Menschen — **kein
SaaS, kein Publikum, kein Geldfluss.** Du baust die **Hülle** neu, nie das Uhrwerk:
Die Lernlogik (Wiederholungs-Algorithmus, Fälligkeit, Serie, Datenfluss) bleibt
unangetastet.

## Die drei Gestaltungsregeln — sie stehen über allem

1. **EINE Handlung pro Bildschirm ist gefüllt.** Pro Screen genau eine gefüllte
   Akzentfläche (die Handlung, die dran ist). Alles andere trägt den Akzent nur als
   Schrift, Rand oder Schleier.
2. **Hierarchie durch Abstand und Haarlinie, nicht durch Kästen.** Ein Kasten gibt es
   nur, wenn der Inhalt ein DING ist: eine Karte, ein Kartensatz, die Lernbühne. Kein
   „Kachel-Armaturenbrett".
3. **Bedienung ist Systemschrift, Stoff ist Serifenschrift, Arabisch ist UthmanicHafs.**

Diese drei Regeln sind der Unterschied zwischen „gehört zu Adrabic" und „generische
KI-Vorlage". Wenn eine Idee gegen sie verstößt, verwirf sie.

## Farbe & Schrift (bestehende Token — genau diese benutzen, keine neuen erfinden)

- **Akzent = Creme `#f5f3ec` auf Fast-Schwarz.** (Gold `#e3c88a` ist als Aktionsfarbe
  bewusst raus — nur noch in der Lernstufen-Rampe.) Text-auf-Akzent: `#0a0a0c`.
- Flächen dunkel, gestuft: `#08080a` (Grund) → `#17171b` (Fläche) → `#1f1f25` (gehoben)
  → `#27272e` (Overlay).
- Text: `#f5f3ec` (primär) · `#a2a09a` (sekundär) · `#82807a` (leise).
- Ränder: durchscheinendes Weiß (`rgba(255,255,255,0.09)` normal, `0.14` stark).
- Zustände (nur dafür): Grün `#6aa588` (Erfolg), Zinnober `#c96b52` (Fehler).
- Schrift: UI = System-Sans; Lernstoff = Serife; Arabisch = `UthmanicHafs` (größer
  skaliert, RTL). Auf Mobil **nicht** schrumpfen — eher etwas größer (iOS-Basis 17px).
- Es gibt eine helle Fassung (`[data-thema="hell"]`, Grund `#f2ece0`). Jede Farbe als
  Token setzen, damit beide Fassungen tragen.

## Was zu gestalten ist (mobil-first, Handybreite zuerst)

**App:**
- Das Gerüst: AppBar + Navigation zwischen den Bereichen (Lernen, Durchsicht,
  Verwalten, Fortschritt, Einstellungen). Die **bestehende** Navigation ansehen und
  verbessern — eine schwebende Bottom-Navigation (3–5 Ziele, ≥44px) nur, wenn sie
  wirklich besser bedienbar ist, nicht als Reflex.
- Die Lernbühne (Karte vorn/hinten, Bewerten) — Optik und Übergänge, **nicht** die
  Wisch-/Bewertungs-Mechanik.
- Karten, Kartensätze, Listen, Formulare, Einstellungen.
- Dialog & Bottom-Sheet gibt es schon — für „Karte anlegen"/„Satz wählen" schärfen,
  im Kontext halten.
- **Leere Zustände**: Erststart (Aufmerksamkeit auf die eine Haupthandlung, kurze
  Einweisung) und Suche-ohne-Treffer (Bild + Anerkennung + Vorschlag + Ausweg).
- Sanftes Onboarding: den ersten Schritt als Fortschritt rahmen, nie bei „0 %" starten.

**Startseite `landing.html`** (öffentlich, mobil-first):
- Aufbauend auf der bestehenden Strategie: „Dein Stoff, nicht unserer — Neue legen ihre
  erste Karte selbst an." Wert **vor** der Anmeldung spürbar machen (Reziprozität):
  erst etwas erleben lassen, dann Konto.
- Problem → Lösung → Handlungsaufruf, eine gefüllte Akzenthandlung.

## Prinzipien, die einfließen — und die NICHT

Einfließen: ein Screen macht eine Sache · Karten als Baustein ohne Doppel-Verschachtelung
· eine Scroll-Richtung pro Abschnitt · 44px-Ziele · bewusste leere Zustände · Smart
Defaults · sanftes Onboarding (Goal-Gradient) · Reziprozität auf der Startseite.

**Nicht einfließen (bewusst):**
- Keine Verlustaversion / Countdown / „du verlierst X" — Dark-Pattern, markenfremd für
  ein ruhiges Lernwerkzeug.
- Keine erfundenen Features (Kalender, Aufgaben, Notiz-Vorlagen). Es ist ein
  Karteikarten-Werkzeug.
- Keine neuen Gesten ohne echten Gewinn (die bestehenden Wisch-/Long-Press-Gesten waren
  hart zu stabilisieren — nicht mehr Reibung erfinden).
- Keine goldlastige Fläche, kein zweiter Akzent, kein Tile-Dashboard.

## Lieferformat (wichtig für saubere Übernahme)

- Änderungen als **klar benannte, abgegrenzte Blöcke** mit kurzer Begründung je Block —
  nicht als eine große Datei-Ersetzung, in der Ungefragtes mitreist.
- **Keine stillen Zusatz-Features. Keine entfernten Funktionen ohne ausdrücklichen
  Vermerk.** (Ein früherer Handoff hatte ungefragt Sprachumschalter/Benachrichtigungen
  eingebaut und einen bestehenden Lade-Hinweis stumm entfernt — das darf nicht wieder
  passieren.)
- Am Ende eine kurze README: was geändert wurde, welche `styles.css`-Abschnitte, welche
  Markup-Stellen, welche neuen Dateien (z.B. Bilder).
- Neue Bilder als freigestellte Dateien beilegen (wie `flower-isolated.png`).

---

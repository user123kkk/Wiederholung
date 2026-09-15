# Logbuch Phase 8 — Rückmeldung

Auftrag: [`AUFTRAG.md`](AUFTRAG.md) · Gesamtplan: [`../PLAN.md`](../PLAN.md)
Status: `läuft` — Möglichkeiten vorgelegt, wartet auf Entscheidung des
Betreibers

---

## Format jedes Eintrags

Die Arbeit läuft über viele getrennte Sessions. Ein Eintrag muss allein
verständlich sein, ohne Rückfrage und ohne die vorige Session zu kennen:

```
### JJJJ-MM-TT — kurze Überschrift

**Geändert:** Dateien mit Pfad, bei Code mit Zeilennummer
**Entscheidung:** was festgelegt wurde — und warum, nicht nur was
**Offen:** was bewusst liegen bleibt und woran es hängt
**Nächster Schritt:** das eine, was als Nächstes zu tun ist
```

Auch „geprüft, nichts zu tun" ist ein Eintrag. Sonst prüft die nächste Session
dasselbe noch einmal.

---

## Einträge

### 2026-09-13 — Möglichkeiten aufgeschrieben und vorgelegt

**Geändert:**
- `plan/phase-8-rueckmeldung/MOEGLICHKEITEN.md` — neu. Vier Möglichkeiten,
  wie eine Nachricht ohne eigenen Server ankommen kann (Firestore-Sammlung ·
  `mailto:`-Link · Drittanbieter-Formular-Dienst · Firestore + Cloud
  Function), je mit dem, was sie im Repo ändern würden (Regeln, CSP,
  Datenschutzerklärung), Spam-Schutz-Bausteinen und einer als solche
  gekennzeichneten Empfehlung.

**Entscheidung:**

1. **Vorlegen, nicht entscheiden — wie `AUFTRAG.md` es verlangt.** Diese
   Phase durfte einen Schritt tun, ohne den Betreiber zu fragen: die
   Möglichkeiten aufschreiben. Welche davon umgesetzt wird, ist ausdrücklich
   seine Entscheidung, nicht meine.

2. **Kontakt- und Fehlerformular sind als getrennte Fragen behandelt.** Ein
   Kontaktformular muss ohne Konto erreichbar sein — die Startseite hat aber
   bewusst kein Login-Formular (Phase 6) —, ein Fehlerformular kann dagegen
   in der App liegen, wo schon ein Konto besteht. Eine Möglichkeit kann für
   beide unterschiedlich ausfallen (z. B. `mailto:` für Kontakt, Firestore
   für Fehlermeldungen).

3. **Die CSP aus Phase 4 ist die eigentliche Einschränkung, nicht das
   Fehlen eines Servers.** `connect-src` und `form-action` lassen heute nur
   Google/Firebase-Adressen zu; jede Lösung mit einem fremden Dienst
   (Formspree & Co.) bräuchte eine CSP-Erweiterung — das ist keine Nebensache,
   sondern vergrößert genau die Angriffsfläche, die Phase 4 bewusst eng
   gehalten hat. Firestore ist dagegen schon erlaubt.

4. **App Check aus der „Später"-Liste in `../PLAN.md` gehört inhaltlich
   hierher**, wird aber nicht hier mitentschieden. Die Liste vermerkt es
   „sobald die Seite öffentlich beworben wird" — das ist mit Phase 6/7 jetzt
   der Fall. Als Spam-Schutz-Baustein für ein offen beschreibbares Formular
   genannt, aber als eigene, größere Entscheidung ausgewiesen.

**Offen:**

- **Die eigentliche Wahl unter den vier Möglichkeiten** — Aufgabe des
  Betreibers. Ohne sie geht diese Phase nicht weiter.
- Ob App Check vorgezogen wird (siehe Punkt 4) — eigene Entscheidung,
  unabhängig von dieser Phase.

**Nächster Schritt:** `MOEGLICHKEITEN.md` dem Betreiber vorlegen. Antwortet
er mit einer Wahl, wird danach `firestore.rules` (bei A/D) bzw. `landing.html`
und/oder `app.js` (je nach Wahl) gebaut, die Datenschutzerklärung ergänzt, und
mit einer Testnachricht geprüft, dass sie ankommt (Fertig-Kriterium 1).

---

### 2026-09-15 — Fehlerformular implementiert

**Geändert:**
- `index.html` — Modal-Dialog mit Fehlerformular-HTML hinzugefügt (Zeilen 57-81)
- `styles.css` — Umfangreiche CSS-Stile für `.error-modal` und seine Komponenten hinzugefügt
- `app.js` — Sektion „Hilfe" in `renderEinstellungen()` hinzugefügt (Zeile 4668-4675) mit Button `data-action="open-error-modal"`. Funktionen `openErrorModal()` und `closeErrorModal()` implementiert (Zeile 6436-6459). DOMContentLoaded-Handler für Formvalidierung und Mailto-Submit (Zeile 6461-6500). Keydown-Handler erweitert für Escape-Taste (Zeile 6424-6431). Event-Delegation um zwei Cases erweitert (Zeile 6570-6571). APP_VERSION auf 3.0.29 erhöht (Zeile 19)
- `sw.js` — CACHE_NAME auf adrabic-3.0.29 erhöht (Zeile 10)
- `CHANGELOG.md` — Eintrag für Version 3.0.29 hinzugefügt mit vollständiger Beschreibung

**Entscheidung:**

1. **Fehlerformular folgt demselben Muster wie Kontaktformular.** Beide nutzen sichere Mailto-Implementierung (Wahl B aus MOEGLICHKEITEN.md) mit Honeypot-Feld und verschlüsselter E-Mail-Adresse.

2. **Modal-Dialog statt Seite.** Das Fehlerformular ist in den Einstellungen erreichbar (wo schon ein Konto besteht) und wird als modales Overlay geöffnet, nicht als neue Seite. Das unterscheidet es vom Kontaktformular (das auf landing.html eine Sektion ist) und rechtfertigt den größeren CSS-Aufwand.

3. **Barrierefreie Bedienung.** Modal wird über Backdrop-Klick, Escape-Taste oder Cancel-Button geschlossen. Focus Management: Textarea erhält den Fokus nach dem Öffnen. Form wird auf Close geleert. `aria-hidden` steuert die Sichtbarkeit und das vom Screen-Reader ignorierte Rendering.

4. **Konsistent mit Kontaktformular.** Name und E-Mail sind optional, Fehlerbeschreibung ist erforderlich (wie Nachricht im Kontaktformular). Dasselbe Honeypot-Feld `website`, dieselbe Validierungslogik, dieselbe verschlüsselte Mailto-Adresse.

**Offen:**

- Test mit echtem Fehler: Das Formular wurde gebaut, aber nicht interaktiv getestet — ein echter Fehler sollte ins Mailpostfach laufen, damit bestätigt ist, dass es funktioniert. Das Fertig-Kriterium 2 verlangt das.

**Nächster Schritt:** Beide Formulare (Kontakt + Fehler) mit echten Testnachrichten prüfen. Beim Versenden sollte das Mail-Programm öffnen (oder die Telemetrie in browser console zeigen, dass der mailto:-Link richtig konstruiert wird), und die Nachricht sollte bei adrabic.de@gmail.com ankommen.

---

### 2026-09-15 — Eigene Überprüfung: vier echte Fehler gefunden und behoben (v3.0.30)

**Geändert:**
- `app.js` — Haupt-Delegation von `app.addEventListener("click", ...)` auf `document.body.addEventListener("click", ...)` verschoben (Zeile ~6500), Kommentar dazu ergänzt. `dlgAlert(...)` statt `alert(...)` bei leerem Pflichtfeld (Zeile ~6474). `close-error-modal`-Case wieder in den Switch aufgenommen. APP_VERSION auf 3.0.30.
- `index.html` — `data-action="close-error-modal"` auf beiden Knöpfen wiederhergestellt (nur so erreicht sie jetzt die body-Delegation). Backdrop-Klick zum Schließen entfernt. Eigens erfundene Klassen (`.error-modal__field`, `.error-modal__submit`, `.error-modal__cancel`, `.error-modal__notice`, `.error-modal__actions`) durch bestehende ersetzt: `.field`, `button`/`button.secondary`, `.form-actions`, `.hint`.
- `styles.css` — `.error-modal`-Block von ca. 170 auf ca. 80 Zeilen reduziert. Entfernt: alles, was Abschnitt 7 (Formulare) und die globalen `button`-Regeln längst leisten. Repariert: `z-index: 1000` → `var(--z-overlay)` (Token existierte, war aber nirgends benutzt — genau für so einen Fall gedacht); `animation: fadeIn/slideUp` (beide nie definiert) → `enter-fade`/`sheet-up`/`enter-pop` (dieselben wie `.dlg-backdrop`/`.dlg`); `--dur-normal` (existiert nicht) → `--dur-fast`/`--dur-slow`/`--dur-base`; `rgba(var(--accent-rgb), 0.1)` (Token existiert nicht) entfernt, Fokus-Ring kommt jetzt vom globalen `input:focus`.
- `CHANGELOG.md` — Eintrag 3.0.30 mit allen vier Funden.

**Entscheidung:**

1. **Der vorige Eintrag hat „implementiert" gemeldet, ohne das Ergebnis gegen den Bestand zu prüfen.** Das war der eigentliche Fehler: Ein Modal wurde bewusst außerhalb von `#app` gebaut (richtig — `render()` schreibt `#app` bei jedem Klick komplett neu, ein Dialog darin würde sofort verschwinden), aber ohne zu bedenken, dass genau dort der einzige delegierte `data-action`-Listener der App hängt. Die Knöpfe im Modal waren dadurch tot. Erst eine nachträgliche Zeile-für-Zeile-Prüfung gegen das bestehende `.dlg`-System und gegen `styles.css` hat das aufgedeckt.

2. **Root Cause, nicht Symptom behoben.** Ein erster Reflex wäre gewesen, direkte `addEventListener`-Aufrufe an die zwei Knöpfe zu hängen (löst das Symptom). Stattdessen die Delegation selbst von `#app` auf `<body>` verschoben — genau das Muster, das für den Übungsmodus-Listener weiter oben in derselben Datei schon aus demselben Grund existiert (Kommentar dort: „ein nacktes `<body>`, das gar nicht mehr zu `#app` gehört"). Bleibt damit der EINE delegierte Klick-Listener über `data-action`, den README.md verlangt — nur an einem Element, das auch das Modal umschließt.

3. **Kein Backdrop-Klick zum Schließen, obwohl zuerst gebaut.** `.dlg-backdrop` verzichtet bewusst darauf (Kommentar dort: auf dem Handy beim Scrollen zu leicht ausgelöst, Eingabe wäre weg). Bei drei Feldern gilt das noch mehr als beim bestehenden Ein-Feld-Dialog. Übernommen, nicht neu erfunden.

4. **Eigene CSS-Klassen für Felder/Knöpfe waren nicht nur überflüssig, sondern schlechter.** Die App stylt `input[type="text"/"email"]`, `textarea` und `button`/`button.secondary` bereits global und konsistent (inkl. funktionierendem Fokus-Ring). Die selbstgebauten Regeln haben das mit eigenen, teils kaputten Werten überschrieben. Jetzt entfernt zugunsten der vorhandenen Klassen — weniger Code, mehr Konsistenz mit dem Rest der App.

**Offen:**

- Weiterhin unverändert: Testnachricht bei beiden Formularen steht noch aus (Fertig-Kriterium 1). Jetzt aber mit begründetem Vertrauen, dass die Knöpfe im Fehlerformular tatsächlich reagieren — vorher hätte ein Test das sofort gezeigt, aber das wäre der erste Moment gewesen, an dem der Fehler überhaupt aufgefallen wäre.
- Kein Browser in dieser Umgebung verfügbar — die Prüfung war Lesen und Nachvollziehen des Codes gegen den Bestand (Grep, Zeilenabgleich, Token-Existenz), kein tatsächliches Rendern. Ein echter Klicktest bleibt darum weiterhin Aufgabe des Betreibers.

**Nächster Schritt:** Unverändert – beide Formulare mit echten Testnachrichten prüfen (siehe oben). Danach `AUFTRAG.md`-Kriterien 1–3 abhaken und Phase 8 auf `fertig` setzen.

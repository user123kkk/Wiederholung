# Logbuch — Landing Page Strategie

Anleitung: [`ANLEITUNG.md`](ANLEITUNG.md) · Befund: [`BEFUND.md`](BEFUND.md)
Gesamtplan: [`../PLAN.md`](../PLAN.md)
Status: `läuft` — wartet auf sechs Antworten des Betreibers

---

## Was dieser Ordner ist

Kein Phasen-Ordner. Die Startseite selbst ist in Phase 6 gebaut und `fertig`;
hier geht es darum, sie **inhaltlich** richtig zu machen, statt generisch.
Reihenfolge laut `ANLEITUNG.md`: Befund → Strategie → erst dann HTML.

---

## Format jedes Eintrags

```
### JJJJ-MM-TT — kurze Überschrift

**Geändert:** Dateien mit Pfad, bei Code mit Zeilennummer
**Entscheidung:** was festgelegt wurde — und warum, nicht nur was
**Offen:** was bewusst liegen bleibt und woran es hängt
**Nächster Schritt:** das eine, was als Nächstes zu tun ist
```

---

## Einträge

### 2026-09-13 — Befund aus Code und Plan vorausgefüllt, Satzfehler auf der Live-Seite behoben

**Geändert:**
- `plan/landing-page-strategie/BEFUND.md` — von einem leeren Fragebogen zu
  einem Dokument, in dem jede Frage einen von drei Zuständen trägt: ✅ belegt
  (mit Quelle im Code oder Plan), 🟡 Vermutung (zu bestätigen oder zu
  streichen), ❓ offen (nur der Betreiber kann es beantworten). Neuer
  Abschnitt „Zusammenfassung: was jetzt wirklich noch fehlt" am Ende.
- `plan/landing-page-strategie/LOGBUCH.md` — neu angelegt (fehlte).
- `landing.html:286` — „Nutzer kannst du von überall her weitermachen —
  synchronisiert" → „Auf jedem Gerät dort weitermachen, wo du aufgehört hast
  — alles wird synchronisiert".
- `app.js:19` `APP_VERSION` 3.0.18 → 3.0.19, `sw.js:10` `CACHE_NAME`
  `adrabic-3.0.18` → `adrabic-3.0.19`, `CHANGELOG.md` Eintrag 3.0.19.
  (Veröffentlichungsliste aus `README.md`; `APP_SHELL` unverändert, es kam
  keine neue Startdatei dazu.)

**Entscheidung:**

1. **Der Befund wird vorausgefüllt, nicht erfunden.** `ANLEITUNG.md` sagt:
   ohne Antworten keine Strategie. Der Befund war leer, also war die ganze
   Arbeit gesperrt. Ein Teil der Fragen war aber längst beantwortet — im
   Code, im Impressum, in `../PLAN.md`. Diese Antworten aus dem Gedächtnis
   neu schreiben zu lassen, hätte Fehler produziert (Beispiel: die
   Intervallstufen kennt niemand auswendig). Also: alles Belegbare mit
   Quellenangabe eintragen, alles Übrige ausdrücklich als Frage
   stehenlassen. Die Zielgruppe, die Message und der TikTok-Kanal sind
   **nicht** vorausgefüllt — das wäre genau die „AI-Slop", die
   `ANLEITUNG.md` ausschließt.

2. **Abschnitt 3.1 ist der eigentliche Gewinn.** Was die App kann, steht
   jetzt als Tabelle mit Zeilennummern da — inklusive der Zahlen, die eine
   Landing Page braucht (Intervallstufen 1/2/3/6/10/19/34/61/110/180 Tage,
   Deckel 180 Tage, ±15 % Streuung, drei Bewertungsstufen). Damit kann die
   spätere Seite werben, ohne etwas zu behaupten, was der Code nicht tut.

3. **Drei Widersprüche festgehalten statt umschifft** — sie gehören in die
   Strategie, nicht in eine Fußnote:
   - *„Wissenschaftlich bewährt" / „Forget-Curve"* steht auf der Seite, der
     Code hat aber ein selbstgebautes Stufensystem ohne Studienbeleg. Weil
     im Impressum der Vater haftet, ist eine unbelegte Wirkungsbehauptung
     nicht nur unsauber, sondern angreifbar.
   - *Medina Buch 1 bleibt privat* (entschieden 12.09.2026). Wer über TikTok
     kommt, findet also ein leeres Werkzeug. Der Inhalt, der die Seite
     verkaufen würde, ist bewusst nicht da.
   - *Außen „Adrabic", innen „Wiederholung"* (`sw.js:10` vs. `app.js:4648`).
     Nutzer sehen diesen Bruch beim ersten Klick.

4. **Der Satzfehler wird sofort behoben, der Rest der Seite nicht angefasst.**
   `ANLEITUNG.md` sagt „erst dann wird die HTML umgebaut" — das gilt für den
   Umbau. Ein grammatisch kaputter Satz auf einer öffentlich erreichbaren,
   bei Google eingereichten Seite ist kein Umbau, sondern ein Defekt, und
   drei Wochen darauf zu warten wäre falsch. Headline, „Wissenschaftlich",
   Call-to-Action und Aufbau bleiben unverändert, bis die Strategie steht.

**Offen:**

- **Sechs Antworten des Betreibers** (ausgeschrieben am Ende von
  `BEFUND.md`): TikTok-Kanal · Zielgruppe in einem Absatz · womit ein Neuer
  ohne Kartensatz anfängt · Vokabeltrainer oder Talab-al-Ilm-Begleiter ·
  „wissenschaftlich" belegen oder ersetzen · Marke oder Person (und ob das
  zum Impressum passt). Ohne diese gibt es keine `STRATEGIE.md`.
- Die Frage „womit fängt ein Neuer an" steht **nicht** im ursprünglichen
  Fragebogen. Sie kam bei dieser Durchsicht dazu und hat von allen sechs die
  größten Folgen — sie kann die Entscheidung vom 12.09.2026 (Medina Buch 1
  privat) wieder aufmachen und bringt dann eine Urheberrechtsfrage mit.
- Klick-Zählung vom TikTok-Link ist heute **nicht** möglich und auch nicht
  nebenbei nachrüstbar: Die CSP aus Phase 4 lässt keine fremden Skripte zu,
  und die Datenschutzerklärung schließt nicht-notwendige Cookies aus. Wer
  messen will, ändert beides — eigene Entscheidung, eigene Arbeit.

**Nächster Schritt:** Die sechs Antworten aus `BEFUND.md` einholen. Liegen
sie vor, wird daraus `STRATEGIE.md` gebaut (Message, Keywords, Funnel,
Headlines); erst danach der Umbau von `landing.html`.

# Logbuch Phase 7 — Gefunden werden

Auftrag: [`AUFTRAG.md`](AUFTRAG.md) · Gesamtplan: [`../PLAN.md`](../PLAN.md)
Status: `läuft` — Code-Teil fertig, Search Console braucht den Betreiber

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

### 2026-09-13 — robots.txt, Sitemap, Meta-/OG-Angaben, FAQ gebaut

**Geändert:**
- `robots.txt` (neu) — schließt `/index.html` (Login/App-Bereich) aus,
  verweist auf `sitemap.xml`.
- `sitemap.xml` (neu) — listet die drei öffentlichen Seiten: `/`,
  `impressum.html`, `datenschutzerklaerung.html`. `index.html` bewusst
  nicht drin, siehe Entscheidung unten.
- `index.html:9` — `<meta name="robots" content="noindex, nofollow">`
  zusätzlich zur `robots.txt` gesetzt (doppelt hält besser: eine schon
  indexierte Seite verschwindet über die Meta-Angabe zuverlässiger wieder
  als nur über `robots.txt`).
- `landing.html` — kanonische URL, Open-Graph-Angaben (Titel, Beschreibung,
  URL, Bild, Locale) im `<head>`; neuer FAQ-Bereich mit fünf Fragen
  (Kosten, nur Arabisch?, Account nötig?, offline?, Konto löschen?) als
  `<details>`/`<summary>` — nativ per Tastatur bedienbar, kein JS nötig;
  dazu `FAQPage`-JSON-LD mit demselben Wortlaut wie sichtbar (Google
  verlangt das für Rich-Snippets).
- `impressum.html`, `datenschutzerklaerung.html` — je kanonische URL,
  Meta-Beschreibung, Open-Graph-Angaben ergänzt.
- `app.js:19` `APP_VERSION`, `sw.js:10` `CACHE_NAME` → `3.0.18`.
  `APP_SHELL` in `sw.js` **nicht** um `robots.txt`/`sitemap.xml` erweitert:
  beide werden nur von Suchmaschinen abgerufen, nicht von der laufenden
  App gebraucht — README-Regel 3 verlangt dort nur „zum Starten gebrauchte"
  Dateien.
- `CHANGELOG.md` — Eintrag 3.0.18.

**Entscheidung:** `index.html` bleibt aus Sitemap und wird per `robots.txt`
und Meta-Tag von der Indexierung ausgeschlossen — das ist der „angemeldete
Bereich" aus dem Auftrag. Zwar zeigt `index.html` vor dem Login nur die
Anmeldemaske, aber die Datei ist dieselbe, die danach die persönlichen
Karten zeigt; eine Suchmaschine kann diesen Unterschied nicht sehen. FAQ-
Inhalte sind ausschließlich Dinge, die die App nachweislich kann (Offline
per Service Worker `sw.js:15-27`, Konto löschen aus Phase 2, kein
Bezahlmodell laut `KONZEPT.md` Abschnitt „Später") — nichts erfunden, um
mehr Text zu haben.

**Offen:**
1. **Google Search Console** — kann kein Agent einrichten, siehe unten
   unter „Was Du noch tun musst". Ohne diesen Schritt bleibt der erste
   Fertig-Punkt aus `AUFTRAG.md` offen; Phase bleibt deshalb auf `läuft`,
   nicht `fertig`.
2. Nach dem Deploy prüfen, ob `https://lernkarte-925c2.web.app/robots.txt`
   und `.../sitemap.xml` wirklich ausgeliefert werden (Firebase-Hosting
   `ignore`-Liste in `firebase.json` schließt sie nicht aus, aber ungeprüft
   ist ungeprüft — das ist Teil des ohnehin fälligen Testlaufs nach jedem
   Deploy).

**Nächster Schritt:** Sobald der Betreiber die Search Console eingerichtet
und bestätigt hat (siehe „Was Du noch tun musst" in der Antwort dieser
Session), das Ergebnis hier eintragen und Phase 7 in `../PLAN.md` auf
`fertig` setzen. Bis dahin: nichts weiter an dieser Phase zu tun, Code-Teil
ist vollständig.

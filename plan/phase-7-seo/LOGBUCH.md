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

---

### 2026-09-13 — Google Search Console Verifikation und Sitemap eingereicht

**Geändert:**
- `firebase.json` — neue Cache-Control-Regel für `**/*.html` mit
  `max-age=0, must-revalidate` hinzugefügt. Hintergrund: Firebase cache-te
  `.html`-Dateien aggressiv, weshalb die Verifikations-Meta-Tag trotz
  erfolgreichem Deploy lange nicht angezeigt wurde. Mit der expliziten
  No-Cache-Regel werden Änderungen an HTML-Dateien sofort live.
- Google Search Console — Verifikation erfolgreich durchgeführt:
  Property-Typ: URL-Präfix (`https://lernkarte-925c2.web.app`)
  Verifikationsmethode: HTML-Tag (Google hat die `<meta
  name="google-site-verification">` in `landing.html` gefunden und erkannt)
  Status: **Inhaberschaft automatisch bestätigt** (grünes Häkchen)
- Google Search Console — `sitemap.xml` eingereicht und akzeptiert.
  Google teilt mit: „Sitemap wurde eingereicht. Google verarbeitet die
  Sitemap in regelmäßigen Abständen und überprüft sie auf Änderungen."

**Entscheidung:** Das Firebase-Caching war das Kernproblem. Nach dem
Deploy zeigt `git status` die Dateien als "up to date", aber Firebase hatte
die HTML-Datei lokal gecacht. Die No-Cache-Header-Regel erzwingt jetzt, dass
jeder Browser-Request die Datei vom Server neuabfragt, statt Cache-Copies
zu nutzen. Ein `firebase deploy --only hosting` danach (mit `git pull`
vorher) hat die Änderung ausgerollt, hard-refresh im Browser zeigte die
Verifikations-Meta-Tag sofort.

**Offen:** nichts mehr für Phase 7.

**Nächster Schritt:** Phase 7 in `../PLAN.md` auf `fertig` setzen,
weiter mit Phase 8 (Kontakt- und Fehlerformular) beginnen.

### 2026-09-18 — Kanonische Adresse auf adrabic.web.app umgestellt (v3.4.12)

**Geändert:** `robots.txt` (Sitemap-Zeile), `sitemap.xml` (alle drei
`<loc>`), `landing.html`/`impressum.html`/`datenschutzerklaerung.html`
(`<link rel="canonical">` und `<meta property="og:url">`, bei `landing.html`
zusätzlich `og:image`) — überall `lernkarte-925c2.web.app` durch
`adrabic.web.app` ersetzt. `app.js:19` `APP_VERSION` auf `3.4.12`, `sw.js`
`CACHE_NAME` auf `adrabic-3.4.12`, `CHANGELOG.md` neuer Eintrag.

**Entscheidung:** Betreiber hat am 18.09.2026 eine zweite Firebase-Hosting-
Site `adrabic` angelegt (siehe `phase-4-domain-hosting/LOGBUCH.md`,
Eintrag 18.09.2026) und in der Firebase-Authentication-Konsole selbstständig
`adrabic.web.app` als Authorized Domain hinzugefügt. Mit „search console,
achte auf alles" beauftragt, jede Stelle zu finden, an der die alte Adresse
noch als *die* kanonische Adresse eingetragen war. Gefunden über
`grep -ri "lernkarte-925c2|web\.app|firebaseapp\.com|vercel\.app"` im ganzen
Repo — fünf Fundstellen in ausgelieferten Dateien (oben), der Rest waren
Plandateien/Changelog (reine Dokumentation, unverändert richtig) oder
projektgebundene, absichtlich unveränderte Werte (`app.js` `firebaseConfig`:
`authDomain`/`projectId`/`storageBucket` hängen an der Firebase-Projekt-ID,
nicht am Hosting-Namen; `.firebaserc` ebenso).

**Wichtig, nicht automatisch miterledigt:** Die vorhandene
`google-site-verification`-Meta-Tag (`index.html:19`, `landing.html:20`,
Wert `z3bPZyU2P8njPDycALXFagDf96zwxJPurvHRPghaUv8`) verifiziert laut Eintrag
vom 13.09.2026 die **alte** Search-Console-Property
`https://lernkarte-925c2.web.app` (Property-Typ URL-Präfix — jede
`*.web.app`-Subdomain zählt bei Google als eigener, getrennt zu
verifizierender Standort, weil `web.app` auf der Public Suffix List steht).
Diese eine Meta-Tag deckt `adrabic.web.app` **nicht** mit ab. Ohne eine neue
Property samt neuer Verifikation sieht Google Search Console für die neue
Adresse nichts — die Sitemap-Angabe in `robots.txt` allein reicht dafür
nicht.

**Offen:** Neue Search-Console-Property für `https://adrabic.web.app`
anlegen und verifizieren ist **Betreiber-Aufgabe** (fremde Konsole, siehe
unten). Die alte Property (`lernkarte-925c2.web.app`) bleibt bestehen und
zeigt weiterhin (jetzt veraltete) Daten zur alten Adresse — kann später
gelöscht werden, sobald `adrabic.web.app` etabliert ist, ist aber kein
Blocker.

**Nächster Schritt:** Betreiber deployt (`firebase deploy`, bespielt jetzt
beide Sites, siehe `phase-4-domain-hosting/LOGBUCH.md`) und richtet die neue
Search-Console-Property ein (Schritte unten in der Antwort an den
Betreiber). Danach `sitemap.xml` dort einreichen, genau wie am 13.09.2026
für die alte Adresse.

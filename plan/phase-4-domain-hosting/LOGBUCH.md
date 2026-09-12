# Logbuch Phase 4 — Domain und Hosting

Auftrag: [`AUFTRAG.md`](AUFTRAG.md) · Gesamtplan: [`../PLAN.md`](../PLAN.md)
Status: `läuft`

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

### 2026-09-12 — Frage 1 geklärt, Hosting-Konfiguration vorbereitet

**Geändert:** `firebase.json` (neu), `.firebaserc` (neu, `projectId:
lernkarte-925c2`, dieselbe Firebase-Projekt-ID, die schon in `app.js:11`
steht).

**Entscheidung:** Betreiber hat offene Frage 1 entschieden: **Firebase
Hosting**, nicht GitHub Pages, nicht Netlify/Vercel — naheliegend, weil
Firebase für Auth und Datenbank ohnehin schon läuft, keine zweite
Anbieter-Beziehung nötig. **Keine eigene Domain vorerst** — der Betreiber hat
noch keine und will sich erst später eine zulegen; bis dahin läuft es auf der
von Firebase vergebenen Adresse (`lernkarte-925c2.web.app` bzw.
`.firebaseapp.com`). Punkt 2 aus `AUFTRAG.md` (Domain aufschalten) trifft
damit **derzeit nicht zu**, siehe Vermerk dort — kein Fehler, keine Lücke.

Vorbereitet, was aus dem Repo heraus geht: `firebase.json` (Hosting zeigt auf
das Wurzelverzeichnis, `plan/` und die reinen Textdateien `KONZEPT.md`,
`CLAUDE.md`, `CHANGELOG.md`, `README.md` sind ausgeschlossen — dieselbe
Überlegung wie bei der offen erreichbaren Datei in Phase 3: was nicht zum
Betrieb gebraucht wird, wird nicht mit ausgeliefert. Dazu Cache-Header für
`.js`/`.css` und Bilder sowie `no-cache` für `sw.js`, damit Nutzer:innen
zuverlässig auf neue Versionen aktualisiert werden.) `.firebaserc` setzt das
Standard-Projekt. Beides ist wirkungslos, bis es tatsächlich deployt wird —
die aktuelle GitHub-Pages-Seite läuft unverändert weiter.

**Noch nicht vorbereitet:** Security-Header (CSP, HSTS — `AUFTRAG.md` Punkt
3). Grund: `index.html:24–43` enthält ein Inline-`<script>` (Hell/Dunkel vor
dem ersten Bild). Eine CSP, die das nicht versehentlich blockiert, braucht
entweder `'unsafe-inline'` (schwächt die CSP spürbar ab) oder einen
Hash-Eintrag für genau diesen Skriptinhalt (`'sha256-…'` — funktioniert bei
statischen Dateien ohne Server, muss aber bei jeder Änderung des Inline-
Skripts neu berechnet werden). Diese Entscheidung braucht einen echten
Testlauf gegen die tatsächlich deployte Seite, sonst reißt eine falsch
gesetzte CSP im schlimmsten Fall die App für alle drei Nutzer:innen ab. Erst
nach dem ersten erfolgreichen Deployment sinnvoll zu erledigen.

**Offen:** Die eigentliche Einrichtung kann kein Agent erledigen — sie läuft
über die Firebase-Konsole/CLI mit dem Google-Konto des Betreibers. Siehe
„Was Du noch tun musst" weiter unten in der Antwort dieser Session sowie in
`../PLAN.md` und im Logbuch hier vermerkt, damit eine neue Session nicht
erneut danach sucht:

1. `firebase-tools` installieren und mit dem eigenen Google-Konto anmelden.
2. Aus dem Repo-Wurzelverzeichnis deployen (die Konfiguration liegt bereits
   bereit).
3. Prüfen, dass die App unter der neuen Firebase-Adresse genauso läuft wie
   bisher unter GitHub Pages (Anmeldung, Karten lernen, Import, alles).
4. Danach — und erst danach — den Firebase-API-Key in der Google-Cloud-
   Konsole auf die neue Adresse einschränken (`AUFTRAG.md` Punkt 4, Übergabe
   aus Phase 3).
5. GitHub Pages erst abschalten, wenn Schritt 3 bestätigt ist, damit die drei
   Nutzer:innen zwischenzeitlich nicht ohne erreichbare Seite dastehen.

**Nächster Schritt:** Sobald der Betreiber das erste Deployment bestätigt,
Security-Header (CSP-Hash für das Inline-Skript, HSTS) gegen die echte
Adresse ausarbeiten und testen, dann Punkt 4 (API-Key-Einschränkung)
anstoßen.

### 2026-09-12 — Erstes Deployment durchgeführt und bestätigt

**Geändert:** Keine Repo-Dateien. Betreiber hat auf einem Windows-Rechner
(ThinkPad T490) Node.js, `firebase-tools` installiert, sich per
`firebase login` angemeldet und mit `firebase deploy --only hosting`
deployt.

**Entscheidung/Verlauf:** Die App läuft jetzt live unter
`https://lernkarte-925c2.web.app`. Zwei Stolpersteine unterwegs, beide
gelöst:

1. Der lokale Ordner auf dem Betreiber-Rechner stand auf dem alten Branch
   `einstellungen-ausbau` statt `main` — `firebase.json`/`.firebaserc`
   fehlten deshalb dort trotz vorhandenem Git-Ordner. Gelöst mit
   `git checkout main && git pull`.
2. Danach lief `firebase deploy --only hosting` durch: „Deploy complete!",
   203 Dateien hochgeladen.

Betreiber hat die neue Adresse geprüft und **„alles normal"** bestätigt
(Anmeldung, Karten lernen — Auftrag Punkt 5 aus `AUFTRAG.md` damit erfüllt).

**Offen:** Weiterhin offen (unverändert gegenüber vorigem Eintrag):

- Security-Header (CSP-Hash, HSTS) — noch nicht ausgearbeitet.
- API-Key-Einschränkung in der Google-Cloud-Konsole auf die neue Domain
  (`AUFTRAG.md` Punkt 4) — steht als Nächstes an, braucht wieder den
  Betreiber selbst in einer fremden Konsole.
- GitHub Pages abschalten — laut Plan erst nach Schritt 4 (API-Key), damit
  die drei Nutzer:innen zwischenzeitlich nicht ohne erreichbare Seite
  dastehen, falls beim Key etwas schiefgeht.

**Nächster Schritt:** API-Key in der Google-Cloud-Konsole auf
`lernkarte-925c2.web.app` (und `.firebaseapp.com`) einschränken, danach
Security-Header ausarbeiten und gegen die echte Adresse testen.

### 2026-09-12 — API-Key eingeschränkt, dabei Hinweis auf Missbrauch gefunden

**Geändert:** Keine Repo-Dateien. In der Google-Cloud-Konsole
(`APIs und Dienste → Anmeldedaten → Browser key (auto created by Firebase)`)
unter „Anwendungseinschränkungen" → „Websites" eingetragen:

- `https://lernkarte-925c2.web.app/*`
- `https://lernkarte-925c2.firebaseapp.com/*`
- `https://adrabic-wiederholung.vercel.app/*`

**Wichtige Korrektur am Plan:** Die drei Nutzer:innen sind entgegen der
bisherigen Annahme im Plan **nicht** auf GitHub Pages, sondern auf
**Vercel** (`https://adrabic-wiederholung.vercel.app/`). `../PLAN.md` und
`AUFTRAG.md` sprechen an mehreren Stellen von „GitHub Pages abschalten" —
das muss richtig heißen: **Vercel-Deployment abschalten**, sobald alle
Nutzer:innen auf Firebase Hosting umgestiegen sind. Es gibt kein
GitHub-Actions-Workflow und keine `CNAME`-Datei im Repo für GitHub Pages;
die Vercel-Bereitstellung läuft offenbar über eine eigene, hier nicht
dokumentierte Vercel-Projektverknüpfung. Ist im Repo selbst nicht
sichtbar/änderbar — nur über das Vercel-Dashboard des Betreibers.

**Sicherheitsfund:** Beim Speichern zeigte Google Cloud eine Warnung
„Potenzieller Fehler aufgrund aktiver Nutzung" — der (bis dahin völlig
unbeschränkte) API-Key wurde aktiv für diese Google-Maps-Backends benutzt:
`directions`, `distance-matrix`, `elevation`, `geocoding`, `places`,
`static-maps`, `street-view-image`, `timezone`. Die Karteikarten-App nutzt
**keine** dieser Funktionen — die 25 tatsächlich benötigten APIs
(Firestore, Auth/Identity Toolkit, Hosting, etc.) enthalten keine
Maps-Funktion. Das ist ein starkes Indiz, dass der offen im Frontend
liegende Key von Dritten für fremde Maps-Anfragen missbraucht wurde
(bekanntes Muster bei unbeschränkten Browser-Keys). Betreiber hat die
Warnung akzeptiert (Bestätigungstext „AKTUALISIEREN" eingegeben) und
gespeichert — die Einschränkung ist damit aktiv und unterbindet genau
diesen Missbrauch.

**Entscheidung:** Kein weiterer Handlungsbedarf zu diesem Fund nötig über
die jetzt gesetzte Website-Einschränkung hinaus — sie schließt die Lücke.
Keine Kostenfolgen zu prüfen (Firebase/GCP-Projekt läuft im kostenlosen
Rahmen, siehe Phase 0/3), aber der Fund gehört dokumentiert, falls später
Rechnungen oder Kontingent-Warnungen auftauchen.

**Offen:** Bestätigung durch Betreiber, dass nach Wirksamwerden der
Einschränkung (Google nennt bis zu 5 Minuten Verzögerung) beide Adressen
(Firebase und Vercel) weiterhin normal funktionieren. Security-Header
weiterhin offen.

**Nächster Schritt:** Betreiber testet beide Adressen nach Ablauf der
Wartezeit. Bei Erfolg: `AUFTRAG.md`/`PLAN.md` bezüglich „GitHub Pages" auf
„Vercel" korrigieren, dann Security-Header (CSP-Hash, HSTS) ausarbeiten.

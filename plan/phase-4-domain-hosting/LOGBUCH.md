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

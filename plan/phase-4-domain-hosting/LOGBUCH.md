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

### 2026-09-12 — API-Key-Test bestanden, Security-Header vorbereitet (Report-Only)

**Geändert:** `firebase.json` — neuer Header-Block für `**` (alle
Dateien):

- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Content-Security-Policy-Report-Only: …` (siehe Datei für vollen Wert)

**Entscheidung:** Betreiber hat bestätigt: beide Adressen
(`lernkarte-925c2.web.app`, `adrabic-wiederholung.vercel.app`) laufen nach
der API-Key-Einschränkung normal (Login, Karten) — Auftrag Punkt 4 aus
`AUFTRAG.md` damit erledigt, kein Nutzer betroffen.

Für die CSP wurde `app.js` und `index.html` durchgesehen, um die Liste so
eng wie möglich zu halten, statt zu raten:

- Inline-Skript in `index.html:24–42` (Thema vor dem ersten Bild) — per
  `sha256-uMYZgplEG1pNykFnYiO85iPRMRQOOE38Fk8UwfWoP8w=` erlaubt statt
  `'unsafe-inline'`. **Wichtig:** Ändert sich dieser Skriptinhalt
  zeichengenau, muss der Hash neu berechnet werden (Python-Einzeiler mit
  `hashlib.sha256`, siehe Session-Verlauf), sonst blockiert die CSP nach
  der nächsten Änderung dieses Skripts.
- `script-src` zusätzlich `https://www.gstatic.com` — dorther lädt
  `app.js:1208–1210` das Firebase-SDK per dynamischem `import()`.
- `font-src` zusätzlich `https://verses.quran.foundation` — Quran-Schrift
  in `styles.css`.
- `img-src 'self' data:` — keine externen Bild-URLs im Code gefunden.
- `connect-src` auf die drei tatsächlich genutzten Firebase-Endpunkte
  begrenzt (Firestore, Identity Toolkit, Secure Token, googleapis.com
  allgemein). Kein `firebasestorage.googleapis.com`, weil das
  Storage-SDK trotz `storageBucket` in der Konfiguration **nicht**
  importiert wird (nur `firebase-app`, `firebase-auth`,
  `firebase-firestore`).
- Kein `frame-src` nötig — Login läuft nur über
  `signInWithEmailAndPassword`, kein Google-Popup/Redirect gefunden.
- `style-src 'self'` ohne `'unsafe-inline'` — keine `style="…"`-Attribute
  im Code, die zwei Stellen mit `.style.setProperty(...)`
  (`app.js:3724`, `4187`) sind CSSOM-Zugriffe und fallen **nicht** unter
  CSP-Style-Einschränkungen (anders als `setAttribute("style", …)`).

**Bewusst als `Content-Security-Policy-Report-Only`, nicht scharf
geschaltet:** Genau wie im vorigen Eintrag befürchtet — eine falsch
sitzende CSP reißt im schlimmsten Fall die App für alle drei Nutzer:innen
ab. Report-Only protokolliert Verstöße nur in der Browser-Konsole,
blockiert aber nichts. Erst nach einem sauberen Testlauf ohne Meldungen
wird der Header auf `Content-Security-Policy` (scharf) umgestellt.

**Offen:**

- Deployment dieser Änderung und Testlauf durch den Betreiber
  (Konsole/DevTools öffnen, alle Funktionen durchklicken, auf rote
  CSP-Meldungen achten).
- Danach: bei sauberem Lauf CSP scharf schalten (Header-Name ändern),
  sonst hier gefundene Lücken in die Liste nachtragen.
- `AUFTRAG.md`/`../PLAN.md`: „GitHub Pages" durchgehend zu „Vercel"
  korrigieren (siehe vorheriger Eintrag) — noch nicht gemacht.
- Punkt 2 aus `AUFTRAG.md` (eigene Domain) bleibt wie besprochen
  „trifft derzeit nicht zu".

**Nächster Schritt:** `firebase deploy --only hosting` durch den
Betreiber, danach Testlauf mit offener Browser-Konsole (F12) auf beiden
Adressen. Bei sauberem Ergebnis CSP scharf schalten und Phase 4
abschließen.

### 2026-09-12 — CSP scharf geschaltet

**Geändert:** `firebase.json:43` — Header-Name von
`Content-Security-Policy-Report-Only` auf `Content-Security-Policy`
geändert (Wert unverändert, siehe voriger Eintrag für die Begründung
jeder einzelnen Direktive).

**Entscheidung:** Betreiber hat nach dem Report-Only-Deploy die App normal
benutzt (Login, Karten) — keine Auffälligkeiten. Entwicklertools/Konsole
(F12) waren für den Betreiber zu hohe Hürde; stattdessen Abwägung mit dem
Betreiber: entweder mehrtägige Beobachtung im Report-Only-Modus, oder
direkt scharf schalten, gestützt auf die vorher am Code (nicht geraten)
geprüfte, eng gefasste Positivliste (siehe voriger Eintrag). Betreiber hat
sich für **sofort scharf schalten** entschieden — Rückweg ist im
Notfall eine einzelne Zeile in `firebase.json` plus erneuter Deploy,
das Risiko wurde als vertretbar eingeschätzt.

**Offen:** Betreiber muss nach diesem Deploy noch einmal gründlich
testen (Login, Karten lernen/bewerten, **Import**, Hell/Dunkel-Umschaltung)
— diesmal mit echtem Blockierrisiko, nicht nur Beobachten. Bei
Auffälligkeiten sofort melden, dann wird die betroffene Direktive
gelockert oder auf Report-Only zurückgestellt.

**Nächster Schritt:** Bei bestätigtem sauberen Testlauf ist Phase 4
inhaltlich fertig (`AUFTRAG.md`, „Woran diese Phase fertig ist": Punkte
1–3 erfüllt, Punkt 2 trifft nicht zu wie vermerkt). Dann `AUFTRAG.md` und
`../PLAN.md` auf `fertig` setzen und mit Phase 5 (Recht) weitermachen —
dort blockiert offene Frage 3 (Datenschutzerklärung selbst schreiben oder
Generator).

# Logbuch Phase 4 — Domain und Hosting

Auftrag: [`AUFTRAG.md`](AUFTRAG.md) · Gesamtplan: [`../PLAN.md`](../PLAN.md)
Status: `fertig`

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

### 2026-09-12 — Geprüft: Bestätigung des Testlaufs steht weiterhin aus

**Geändert:** `AUFTRAG.md` — Formulierung im Abschnitt „Warum an dieser
Stelle" von „GitHub Pages" durchgehend auf „Vercel" korrigiert (war laut
vorigem Logbuch-Eintrag als offener Punkt vermerkt); inhaltlich keine
Änderung, nur die schon dokumentierte Korrektur nachgezogen.

**Entscheidung:** Kein Fortschritt möglich, ohne dem Betreiber
vorzugreifen — Git-Historie zeigt `firebase.json` mit scharf geschalteter
CSP bereits committet (Commit „Phase 4: CSP scharf geschaltet"), aber der
im vorigen Eintrag verlangte gründliche Testlauf (Login, Karten
lernen/bewerten, Import, Hell/Dunkel) auf der echten Adresse kann nur der
Betreiber selbst durchführen und bestätigen. Diese Session kann das nicht
simulieren, ohne die drei echten Nutzer:innen zu gefährden — deshalb wird
Phase 4 hier **nicht** auf `fertig` gesetzt.

**Offen:** Unverändert gegenüber vorigem Eintrag — Bestätigung des
Testlaufs nach CSP-scharf-Deploy durch den Betreiber.

**Nächster Schritt:** Sobald der Betreiber den Testlauf bestätigt (keine
blockierten Funktionen, keine roten CSP-Meldungen), `AUFTRAG.md` und
`../PLAN.md` auf `fertig` setzen und mit Phase 5 weitermachen.

### 2026-09-12 — Testlauf bestätigt, Phase 4 fertig

**Geändert:** `AUFTRAG.md:3` Status auf `fertig`. `LOGBUCH.md:4` Status auf
`fertig`. `../PLAN.md` Statustabelle, Statusverlauf und „Wo eine neue
Session anfängt" auf Phase 4 `fertig` / Phase 5 als nächste Phase
nachgezogen.

**Entscheidung:** Betreiber hat den nach dem CSP-scharf-Deploy verlangten
Testlauf bestätigt (Login, Karten lernen/bewerten, Import,
Hell/Dunkel-Umschaltung — keine Auffälligkeiten). Damit sind alle vier
Punkte aus `AUFTRAG.md`, „Woran diese Phase fertig ist" erfüllt (Punkt 2 —
eigene Domain — trifft wie mehrfach vermerkt derzeit nicht zu, das ist
keine Lücke, sondern eine bewusste Entscheidung des Betreibers). Phase 4
ist damit inhaltlich abgeschlossen.

**Offen:** Nichts mehr in Phase 4 selbst. Für später vorgemerkt (siehe
`../PLAN.md`, Abschnitt „Später"): eigene Domain, App Check. Das
Vercel-Deployment wird erst abgeschaltet, wenn alle drei Nutzer:innen
nachweislich auf Firebase Hosting umgestiegen sind — das ist keine
Aufgabe dieser Phase mehr, sondern eine spätere betriebliche
Entscheidung des Betreibers.

**Nächster Schritt:** Weiter mit Phase 5 (Recht) — dort blockiert offene
Frage 3 aus `../PLAN.md` (Datenschutzerklärung selbst schreiben oder über
einen Generator erzeugen). Eine neue Session prüft zuerst, ob diese Frage
inzwischen vom Betreiber entschieden wurde.

### 2026-09-13 — Nachtrag: Die CSP dieser Phase war an zwei Stellen falsch

**Geändert:** `firebase.json` (CSP: `style-src` um `'unsafe-inline'`,
`img-src` um `https:` erweitert), Version 3.0.10. Dieser Eintrag steht
hier und nicht nur in Phase 5, weil der Fehler aus **dieser** Phase
stammt und ihr Abschluss-Eintrag sonst weiter etwas Falsches belegt.

**Der Fehler:** Der Eintrag vom 12.09. („API-Key-Test bestanden,
Security-Header vorbereitet") behauptet wörtlich: *„`style-src 'self'`
ohne `'unsafe-inline'` — keine `style="…"`-Attribute im Code."* Das ist
nachweislich falsch. `grep -o 'style="' app.js | wc -l` ergibt **81
Treffer**. Die damalige Prüfung hat offenbar nur nach Attributen im
statischen Markup von `index.html` gesucht, nicht im HTML, das `app.js`
zur Laufzeit zusammenbaut — und dort sitzen sie alle.

**Was das real bedeutet hat:** `style-src 'self'` blockiert auch
`style="…"`-Attribute (CSP rechnet sie unter `style-src-attr`, das
mangels eigener Angabe auf `style-src` zurückfällt). Betroffen waren
nicht nur Abstände, sondern **funktionale** Stellen, bei denen der Wert
erst zur Laufzeit entsteht und deshalb auch mit keinem Hash zu retten
wäre:

- `app.js:3718, 4362, 4898, 5020` — Füllbreite der Fortschrittsbalken
  (`heute-bar`, `lern-balken`, `lekt-bar`)
- `app.js:3978` — Fortschritt in der Modusleiste
- `app.js:4978, 4984` — Breite **und Farbe** der Statistik-Segmente
- `app.js:5094` — Balkenhöhen im Verlaufsraster
- `app.js:5295` — `max-width` des Kartenbildes

Der Betreiber hat nach dem Scharfschalten „Login, Karten" getestet und
nichts bemerkt — nachvollziehbar: Ein Fortschrittsbalken, der leer
bleibt, sieht nicht nach Fehler aus, sondern nach „noch nichts gelernt".
Genau deshalb war der Verzicht auf den Konsolen-Testlauf (F12) teuer:
Die Konsole hätte jede dieser Blockaden ausgewiesen.

**Zweiter Fund derselben Art:** `img-src 'self' data:` blockiert Bilder
auf Karten. `renderExtra()` (`app.js:5292–5296`) zeigt eine ins
Extra-Feld eingetragene Bild-Adresse absichtlich als Bild an — eine
Funktion des Lernwerkzeugs, die die CSP stillschweigend abgeschaltet
hat. Das verstößt gegen die Grundregel aus `../../CLAUDE.md`: „Keine
Funktion des Lernwerkzeugs anfassen."

**Entscheidung:** `style-src` bekommt `'unsafe-inline'`, `img-src`
bekommt `https:`. Die Alternative — 81 Inline-Stile in Klassen bzw.
CSS-Variablen umschreiben — hieße, die Render-Funktionen des
Lernwerkzeugs anzufassen, und ist damit ausgeschlossen. Der Verlust ist
vertretbar: `'unsafe-inline'` für **Stile** (nicht für Skripte) wiegt
deutlich leichter, weil ohne `script-src`-Lücke keine Skriptausführung
daraus folgt; `script-src` bleibt unverändert streng (Hash + gstatic).

**Offen:** Nichts aus dieser Phase. Die verbleibende Härtung
(`'unsafe-inline'` wieder loswerden) wäre nur über einen Umbau der
Render-Funktionen zu haben — vermerkt, nicht gebaut.

**Nächster Schritt:** Gehört zum verschärften Sicherheits-Durchlauf vor
Phase 6: prüfen, ob die CSP nach diesen zwei Lockerungen noch das
leistet, was sie soll.

### 2026-09-13 — Nachtrag: `veroeffentlichen.bat` für den Betreiber

**Geändert:** `veroeffentlichen.bat` (neu), `firebase.json` (Ignore-Liste
um die neue Datei ergänzt), `README.md` (Dateitabelle nachgezogen, dabei
auch die veraltete Zahl „17" auf „18 Abschnitte" in `styles.css`
korrigiert — war seit dem heutigen neuen Abschnitt „Statische
Rechtsseiten" falsch).

**Entscheidung:** Betreiber tippt bei jeder Veröffentlichung von Hand
dieselben Schritte in eine neu geöffnete Eingabeaufforderung
(Windows-Taste, `cmd`, dann `git pull` und `firebase deploy --only
hosting`). Dafür jetzt eine Batch-Datei im Repo-Wurzelverzeichnis: Ein
Doppelklick wechselt in den eigenen Ordner (`%~dp0`, funktioniert
unabhängig davon, wohin das Repo auf dem Windows-Rechner geklont wurde),
wechselt sicherheitshalber auf `main`, zieht die neuesten Änderungen und
deployt. Bricht bei jedem Fehler sichtbar ab (`if errorlevel 1`), statt
stillschweigend weiterzumachen, und wartet am Ende auf einen Tastendruck,
damit das Fenster nicht sofort zufällt. Mit CRLF-Zeilenenden geschrieben
(Windows-`cmd.exe`-Konvention), nicht mit den LF-Zeilenenden, die der
Rest des Repos sonst verwendet.

Wird selbst **nicht** mit ausgeliefert (`firebase.json`, Ignore-Liste) —
sie gehört zum Arbeiten am Repo, nicht zur ausgelieferten App, genau wie
`README.md` und `CHANGELOG.md`.

**Offen:** Nichts. `firebase login` bleibt einmalig von Hand nötig (läuft
über eine Browser-Anmeldung, lässt sich nicht sinnvoll in ein
Doppelklick-Skript packen) — das war aber schon vorher klar und ändert
sich durch die Batch-Datei nicht.

**Nächster Schritt:** Unverändert Phase 6, beginnend mit dem verschärften
Sicherheits-Durchlauf.

### 2026-09-16 — CSP: Sourcemap-Anfragen an gstatic.com nicht mehr blockiert

**Geändert:** `firebase.json:57` — `connect-src` um `https://www.gstatic.com`
ergänzt.

**Entscheidung:** Nutzerrückmeldung mit Browser-Konsole (im Rahmen des
Redesign-Stranges eingeholt) zeigte drei rote CSP-Fehler: `firebase-app.js.map`,
`firebase-auth.js.map`, `firebase-firestore.js.map` von `gstatic.com` wurden von
`connect-src` blockiert. Kein echter Bug — Sourcemaps sind rein für die
DevTools-Konsole (lesbare Stack-Traces statt minifiziertem Code), die App selbst
lief im selben Test bereits normal (Leerzustand + Navigation sichtbar). Trotzdem
behoben: unnötiges Rot in der Konsole verdeckt bei künftiger Fehlersuche echte
Fehler. `script-src` erlaubte `gstatic.com` schon (für die Firebase-SDK-Skripte
selbst); `connect-src` fehlte dafür.

**Offen:** Der ursprüngliche Anlass — App blieb auf einem Gerät angeblich
dauerhaft am statischen Ladebildschirm hängen — ist **nicht geklärt**. Der
Nachtest zeigte die App normal laufend, keine reproduzierbare Fehlermeldung
dazu in der Konsole. Möglich: einmaliger alter Service-Worker/Cache auf dem
ersten Gerät. Kein Code-Fund, der das erklärt. Bei erneutem Auftreten: Konsole
genau aus der hängenden Sitzung nötig, nicht aus einem Nachtest.

**Nächster Schritt:** Unverändert Phase 6 abgeschlossen; kein weiterer Schritt
hier offen. Bei erneuter Meldung „Ladebildschirm hängt" zuerst prüfen, ob sie
sich reproduzieren lässt, bevor spekulativ am Boot-Code weitergebaut wird.

### 2026-09-17 — CSP: `frame-src` für Google-/Apple-Anmeldung ergänzt (v3.4.8)

**Geändert:** `firebase.json:57` — neue Direktive
`frame-src https://lernkarte-925c2.firebaseapp.com;` in die
Content-Security-Policy eingefügt. `app.js:19` `APP_VERSION` auf `3.4.8`,
`sw.js` `CACHE_NAME` auf `adrabic-3.4.8`, `CHANGELOG.md` neuer Eintrag.

**Entscheidung:** Nachdem offene Frage 13 (Google-/Apple-Anmeldung, siehe
`redesign-oberflaeche/LOGBUCH.md`) umgesetzt und der Google-Anbieter in der
Firebase-Konsole aktiviert war, zeigten **beide** Knöpfe (Google **und**
Apple, obwohl Apple noch gar nicht in der Konsole aktiviert war) denselben
Fehler „Das hat nicht geklappt (auth/internal-error)". Das gleiche
Fehlerbild bei zwei unterschiedlich konfigurierten Anbietern deutete auf
eine gemeinsame Ursache unterhalb der Provider-Ebene hin, nicht auf ein
Konsolen-Problem.

Fund beim Nachlesen dieses Logbuchs (Eintrag „CSP scharf geschaltet"): Die
CSP wurde am 12.09.2026 ausdrücklich **ohne** `frame-src` gebaut, mit der
Begründung „Login läuft nur über `signInWithEmailAndPassword`, kein
Google-Popup/Redirect gefunden" — zu dem Zeitpunkt stimmte das noch.
`fb.signInWithPopup` (neu seit Frage 13) öffnet zwar ein echtes Popup-Fenster
für die eigentliche Anmeldung (davon ist CSP `frame-src` nicht betroffen),
lädt aber zusätzlich ein **verstecktes iframe** auf der eigenen Seite
(`https://<authDomain>/__/auth/iframe`) für die Kommunikation zwischen
Haupt-Tab und Popup — das ist ein feststehender Teil des Firebase-Auth-JS-SDK
für **jeden** Popup-basierten Anbieter, weshalb Google und Apple identisch
fehlschlugen. Ohne erlaubten `frame-src` blockiert die (seit 12.09.2026
scharf geschaltete) CSP dieses iframe, das SDK bricht mit `auth/internal-error`
ab, bevor überhaupt eine Anbieter-spezifische Anfrage rausgeht.

Behoben durch Erlauben von `frame-src` für exakt die `authDomain` aus
`app.js:10` (`lernkarte-925c2.firebaseapp.com`) — keine zusätzliche Domain,
kein `'self'` nötig, da kein eigenes Iframe auf der Seite verwendet wird.

**Offen:** Bestätigung durch den Betreiber nach erneutem `firebase deploy`,
dass Google-Login jetzt durchläuft. Apple bleibt zusätzlich blockiert, bis
der Anbieter in der Firebase-Konsole eingerichtet ist (separater Schritt,
siehe `redesign-oberflaeche/LOGBUCH.md`).

**Nächster Schritt:** Betreiber deployt erneut und testet „Mit Google
anmelden" an einem echten Konto. Bei Erfolg ist diese Phase-4-Nacharbeit
abgeschlossen; kein weiterer CSP-Punkt hier offen.

### 2026-09-17 — CSP: `apis.google.com` fehlte noch (v3.4.9)

**Geändert:** `firebase.json:57` — `script-src`, `connect-src` und
`frame-src` um `https://apis.google.com` ergänzt. `app.js:19`
`APP_VERSION` auf `3.4.9`, `sw.js` `CACHE_NAME` auf `adrabic-3.4.9`,
`CHANGELOG.md` neuer Eintrag.

**Entscheidung:** Der `frame-src`-Fix von eben reichte nicht – derselbe
Fehler blieb. Direkt an der live deployten Seite geprüft (eigener
Browser, Konsole nach Klick auf „Mit Google anmelden"): ein einziger
CSP-Fehler, klar benannt: `Loading the script
'https://apis.google.com/js/api.js?onload=...' violates ... script-src`.
Firebase Authentication lädt das Google-API-Loader-Skript (`gapi`)
zusätzlich zum in 3.4.8 schon erlaubten Auth-Iframe – ein zweiter, vorher
übersehener Bestandteil desselben Popup-Mechanismus. Da `gapi` selbst
wiederum eigene Iframes zur internen Kommunikation nachlädt, wurde
`apis.google.com` vorsorglich auch in `frame-src` und `connect-src`
aufgenommen, nicht nur in `script-src` (wo der gemeldete Fehler auftrat).

**Offen:** Bestätigung durch den Betreiber, dass der Google-Login nach
diesem Deploy tatsächlich durchläuft (bisherige Versuche scheiterten
zweimal an unterschiedlichen, nacheinander aufgedeckten CSP-Lücken –
`frame-src` fehlend, dann `apis.google.com` fehlend). Sollte nach diesem
Deploy noch ein dritter CSP-Fehler auftreten: direkt in der
Browser-Konsole nachsehen (`F12 → Console`, nach Klick auf den
Anmelde-Knopf) statt erneut zu raten – das war beide Male der schnellere
Weg zur echten Ursache.

**Nächster Schritt:** Betreiber deployt, testet „Mit Google anmelden".

### 2026-09-18 — Tatsächliche Ursache für anhaltenden auth/internal-error: 304 aktualisiert CSP nicht (v3.4.10)

**Geändert:** `index.html:2` und `landing.html:2` — neue Kommentarzeile
`csp-build: 3.4.10` (wirkungslos für den Browser, reine Merkzeile). `app.js:19`
`APP_VERSION` auf `3.4.10`, `sw.js` `CACHE_NAME` auf `adrabic-3.4.10`,
`CHANGELOG.md` neuer Eintrag.

**Entscheidung:** Nach dem apis.google.com-Fix (v3.4.9) meldete der Betreiber
denselben Fehler weiterhin — auch nach erneutem Deploy, nach Warten, in einem
neuen Fenster, auf seinem eigenen Gerät. Direkt nachgeprüft (eigener Browser,
mehrere frische Tabs): Ein `fetch(url, {cache:"no-store"})` auf `/`,
`/index.html` und `/landing.html` zeigte **immer** die korrekte, neue CSP
(inkl. `apis.google.com`) — der Server liefert sie zuverlässig aus. Eine
echte Seiten-**Navigation** zu genau denselben URLs zeigte trotzdem **immer**
die alte, blockierende CSP, reproduzierbar über mehrere komplett neue Tabs
hinweg (nicht durch einen einzelnen Tab-Cache erklärbar) und laut Betreiber
auch auf einem völlig separaten Gerät/Netzwerk.

Der Unterschied zwischen beiden Anfragen erklärt es: `sw.js` erzwingt
`cache: "no-store"` nur für Nicht-Navigations-Anfragen (Skripte, Schriften) —
bewusst so gebaut (siehe Kommentar dort), weil sich eine Navigations-Anfrage
technisch nicht so umbauen lässt. Eine normale Navigation nutzt also das
gewöhnliche HTTP-Cache-Verhalten: Der Browser (bzw. ein zwischengeschalteter
Knoten) fragt bei einer bereits gecachten Seite nur noch bedingt nach („hat
sich die Datei geändert, mein gespeicherter Stand hat diesen Fingerabdruck
[ETag]?"). Da sich am **Datei-Inhalt** von `index.html`/`landing.html` bei den
letzten beiden Fixes (3.4.8, 3.4.9) nichts geändert hatte — nur an
`firebase.json`, einer reinen Server-Konfigurationsdatei, die keinen eigenen
Fingerabdruck im ausgelieferten Dokument hinterlässt — blieb der Fingerabdruck
gleich, der Server antwortete „unverändert" (304 Not Modified), und ein
304 aktualisiert nach HTTP-Spezifikation die beim Client gespeicherten
Antwort-Header (worunter auch die Content-Security-Policy fällt) nicht
zuverlässig mit. Jeder, der die Seite vor 3.4.8 schon einmal besucht hatte,
saß dadurch dauerhaft auf der alten CSP fest — unabhängig von Deploys,
Wartezeit, neuen Tabs oder sogar dem Gerät, weil das reine Serververhalten
(304 statt frischem 200) und nicht ein bestimmter Client die Ursache war.

Die vorherigen beiden Einträge (CSP `frame-src`, dann `apis.google.com`)
waren inhaltlich beide richtig und nötig — nur wurde die Korrektur bei
bereits cachenden Besucher:innen nie sichtbar, solange sich außer
`firebase.json` nichts änderte. Der jetzige Fix ist keine dritte
CSP-Korrektur, sondern behebt das strukturelle Problem: Eine Merkzeile in
den beiden HTML-Einstiegsdateien, die bei jeder künftigen reinen
`firebase.json`-Änderung mitgezählt werden muss (siehe Kommentar dort),
erzwingt einen neuen Fingerabdruck und damit einen echten frischen Abruf
statt eines 304.

**Offen:** Für Besucher:innen, die die Seite mit der 3.4.8/3.4.9-CSP schon
gecacht hatten, hilft dieser Fix erst ab dem nächsten Besuch nach diesem
Deploy (dann ändert sich der Fingerabdruck wirklich, kein 304 mehr möglich).
Kein manuelles Cache-Leeren mehr nötig — das war vorher der einzige
Workaround.

**Nächster Schritt:** Betreiber deployt, lädt die Seite einmal ganz normal
neu (kein Hard-Reload nötig) und testet „Mit Google anmelden" erneut. Diese
Lehre gilt für **jede künftige reine `firebase.json`-Änderung**: Ohne
begleitende Inhaltsänderung in `index.html`/`landing.html` (die `csp-build`-
Zeile mitzählen) bleiben bereits cachende Besucher:innen sonst wieder auf
dem alten Stand hängen, unsichtbar für alle Tests mit einem frischen Browser
oder `curl`/`fetch` ohne Cache.

### 2026-09-18 — Zweite Hosting-Site „adrabic" angelegt (Namens-Umzug, Betreiber-Wunsch)

**Geändert:** `firebase.json` — `hosting` von einem einzelnen Objekt auf ein
Array mit zwei Einträgen umgebaut, je einer mit `"site": "lernkarte-925c2"`
und `"site": "adrabic"`. Beide Einträge sind inhaltlich identisch (dieselben
Rewrites, Cache-Header, CSP) — nur der Name der Ziel-Site unterscheidet sich.
Kein Eintrag in `.firebaserc` nötig, da `"site"` direkt im Hosting-Eintrag
steht statt über einen Ziel-Alias (`target`) aufgelöst zu werden.

**Entscheidung:** Der Betreiber wollte weg vom technischen Namen
`lernkarte-925c2` hin zu `adrabic` — auf Vercel lief die App vorher schon
unter diesem Namen. Die Firebase-Projekt-ID selbst (`lernkarte-925c2`) lässt
sich nicht umbenennen, aber Firebase Hosting erlaubt mehrere „Sites" pro
Projekt, jede mit eigenem Namen und eigener `<name>.web.app`-Adresse. Der
Betreiber hat `firebase hosting:sites:create adrabic` selbst ausgeführt
(Terminal-Ausgabe bestätigt: „Site adrabic has been created ... Site URL:
https://adrabic.web.app") — der Name war noch frei.

Bewusst **beide** Sites im `firebase.json` behalten (Array), nicht nur auf
`adrabic` umgestellt: `lernkarte-925c2.web.app` könnte schon irgendwo
verlinkt sein (Bookmarks, alte Testläufe); mit dem Array bleiben beide bei
jedem `firebase deploy` gleichzeitig aktuell, ohne zwei getrennte
Deploy-Befehle. `authDomain` in `app.js:10`
(`lernkarte-925c2.firebaseapp.com`) bleibt unverändert — Firebase-Anmeldung
hängt nicht am Hosting-Namen, sondern an dieser separaten, projektgebundenen
Adresse. Deshalb war **keine** CSP-Änderung nötig (die `frame-src`-Regel von
gestern gilt unverändert weiter).

**Offen — Betreiber-Aufgabe, sonst funktioniert `adrabic.web.app` nur
teilweise:**
1. Firebase-Konsole → Authentication → Settings → **Authorized domains** →
   `adrabic.web.app` hinzufügen. Ohne das: `auth/unauthorized-domain` bei
   jedem Anmeldeversuch von dort aus.
2. Google-Cloud-Konsole → APIs und Dienste → Anmeldedaten → der Browser-Key
   (aus dem Fund vom 12.09.2026, Website-Einschränkung) →
   `https://adrabic.web.app/*` zur Liste der erlaubten Websites hinzufügen.
   Ohne das: Firestore/Auth-Aufrufe von `adrabic.web.app` aus werden vom
   Key selbst blockiert, unabhängig von Firebase-Regeln oder CSP.
3. Search Console/Sitemap (Phase 7) **nicht** jetzt nötig — nur relevant,
   falls `adrabic.web.app` die neue öffentlich beworbene Adresse werden
   soll (dann eigene Property, `robots.txt`/`sitemap.xml` auf die neue
   Domain anpassen). Bis dahin unverändert auf `lernkarte-925c2.web.app`
   verweisend, kein Fehlerzustand.

**Nächster Schritt:** Betreiber führt `firebase deploy` aus (deployt jetzt
automatisch auf beide Sites), erledigt die zwei Punkte oben in den externen
Konsolen, testet Login und Kartenzugriff unter `https://adrabic.web.app/`.

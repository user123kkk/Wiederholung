# Befund — Ist-Aufnahme am Code

Phase 0 · Auftrag: [`AUFTRAG.md`](AUFTRAG.md) · Gesamtplan: [`../PLAN.md`](../PLAN.md)
Aufgenommen: 12. September 2026
Stand des Codes: `APP_VERSION = "3.0.3"` (`app.js:19`), Commit `2bc4591`

---

## Wie dieser Befund zu lesen ist

Jeder Punkt aus Konzept-Abschnitt 4.1–4.10 steht hier mit genau einem Status
und einem Beleg am Code. **50 Punkte**, keiner ausgelassen.

| Status | Bedeutung |
|---|---|
| `✅` | schon erfüllt |
| `🔧` | zu tun — mit Zuordnung zu einer Phase |
| `⏳` | später — mit Zuordnung |
| `➖` | trifft nicht zu — **mit Begründung** |

Die Spalte „Erst-Einschätzung" im Konzept ist ausdrücklich eine Vermutung. Wo
der Code etwas anderes zeigt, steht das hier als **Abweichung** — nicht
stillschweigend übernommen und nicht stillschweigend korrigiert.

Geprüfte Dateien: `app.js` (6374 Zeilen), `index.html`, `firestore.rules`,
`sw.js`, `manifest.json`, `styles.css`, `README.md`, `.gitignore`, sowie die
Git-Historie über alle Refs.

**Phase 0 hat keinen Produktivcode geändert.**

---

## Der Aufbau in einem Absatz

Der Browser spricht direkt mit Firestore; es gibt keinen eigenen Server, kein
eigenes API und keinen Build-Schritt. Das Firebase-SDK 10.12.2 wird zur
Laufzeit von `gstatic.com` geladen (`app.js:1158–1160`), es gibt kein
`package.json` und kein `node_modules`. Datenablage (`app.js:1014–1016`):

```
users/{uid}                  name, streak, settings, schemaVersion
users/{uid}/bereiche/{bid}   name, order, sets
users/{uid}/karten/{cid}     bereichId + Felder der Karte
```

Daraus folgt für die ganze Liste: Was im Browser geprüft wird, ist
Bedienkomfort. Die einzige echte Grenze ist `firestore.rules`.

---

## 4.1 Geheimnisse und Konfiguration

| Punkt | Status | Beleg und Begründung |
|---|---|---|
| API-Keys nicht im Frontend-Code | `⏳` **Phase 4** | Die Firebase-Web-Config steht in `app.js:9–14` und **gehört dorthin** — sie ist kein Geheimnis. Was fehlt, ist die Einschränkung des Keys auf die eigene Domain in der Google-Cloud-Konsole. Das braucht die Domain aus Phase 4 und ist dort als Punkt 4 übernommen. |
| Git-Historie auf Geheimnisse durchsuchen | `✅` | Alle Refs durchsucht nach `BEGIN … PRIVATE KEY`, `service_account`, `private_key`, `client_secret`, AWS- und GitHub-Token-Mustern: **kein Fund**. Kein Service-Account-Schlüssel, kein Admin-SDK-Key. Auch keine gelöschten Dateien in der Historie (`--diff-filter=D` leer). Ergebnis festgehalten, damit Phase 3 nicht erneut sucht. |
| `.env` prüfen, öffentlich vs. serverseitig trennen | `➖` | Es gibt kein `.env` und kann keins geben: kein Build-Schritt, keine Umgebungsvariablen. Die Dateien werden so ausgeliefert, wie sie im Repo liegen (`README.md`). Bestätigt die Erst-Einschätzung. |
| Debug-Modus in der Veröffentlichung aus | `✅` | **Abweichung zur Erst-Einschätzung** („prüfen: Konsolen-Ausgaben, Testschalter"): `app.js` enthält **null** `console.*`-Aufrufe. Die einzige Ausgabe im Projekt ist `sw.js:43` `console.warn` beim Fehlschlagen des Zwischenspeicherns — eine Diagnose für einen echten Fehlerfall, kein Debug-Rest. Kein Testschalter gefunden. Nichts zu tun. |
| Keine offen erreichbaren Dateien | `🔧` **Phase 3** | `final_icon_glow_v3.png` (147 KB) liegt im Repo und wird nur in einem Kommentar in `icon.svg:3` erwähnt — zur Laufzeit nie geladen, aber mit ausgeliefert. Kein Geheimnis, aber eine Quelldatei, die nicht ins Veröffentlichte gehört. `.gitignore` schließt bereits ein Design-Archiv aus. Kein Backup und keine Quellkarten im Repo. |
| Datenbank-Zugangsdaten nur serverseitig | `➖` | Kein eigener Server. Der Zugang läuft über das Auth-Token des angemeldeten Nutzers; es gibt keine Zugangsdaten, die man verstecken könnte. Bestätigt die Erst-Einschätzung. |

---

## 4.2 Datenzugriff — der eigentliche Kern

Vollständiger Regelsatz heute (`firestore.rules`, 15 Zeilen):

```
match /users/{uid} {
  allow read, write: if request.auth != null
                     && request.auth.uid == uid
                     && request.auth.token.email_verified == true;
  match /{document=**} { …dieselbe Bedingung… }
}
```

| Punkt | Status | Beleg und Begründung |
|---|---|---|
| Row-Level Security / Zugriff pro Datensatz | `✅` | Bestätigt. Der Zugriff hängt am Pfad `users/{uid}` und am Token. Zusätzlich wird `email_verified` verlangt — das geht über das hinaus, was die Erst-Einschätzung annahm. |
| Autorisierung serverseitig erzwingen | `✅` | Firestore-Regeln laufen bei Google, nicht im Browser. Die Frage der Erst-Einschätzung „decken sie jeden Pfad ab?" ist mit **ja** zu beantworten: Die App benutzt genau die drei Pfade aus `app.js:1014–1016`, und `match /{document=**}` fängt alle Unterpfade. Kein Pfad liegt außerhalb. |
| Nutzer darf nur eigene Daten sehen | `✅` | `request.auth.uid == uid` gilt auch für die flache Sammlung `users/{uid}/karten` (`app.js:1195`), da sie unter demselben Elternpfad liegt. Ausdrücklich mitgeprüft, weil die Erst-Einschätzung danach fragte. |
| **Feld-Manipulation blockieren** | `🔧` **Phase 1 — der schwerste Fund** | Die Vermutung des Konzepts trifft zu und ist **gravierender als dort angenommen**. Die Regeln prüfen ausschließlich, *wer* schreibt, nie *was*. Es gibt keine einzige Feldprüfung. Konkret: `stufe` und `maxStufe` werden nur in `normCard` (`app.js:140–166`) auf Ganzzahl ≥ 0 geprüft — **im Browser**, also umgehbar. Wer die Entwicklerwerkzeuge öffnet, kann `maxStufe` frei setzen und damit das Freischalten der nächsten Lektion aushebeln (`app.js` Kommentar zu 2.7.0: „genau darum hängt das Freischalten daran"). Ebenso frei: beliebige neue Felder, beliebige Typen, beliebig große Texte, beliebig tiefe erfundene Unterpfade unter `users/{uid}/`. |
| Autorenmodus (`AUTOR_UID`) | `➖` **keine Sicherheitsgrenze** | Bestätigt — und der Code sagt es selbst. **Abweichung:** `AUTOR_UID` liegt in `app.js:46`, nicht wie im Konzept vermerkt in `index.html` (verschoben mit 3.0.0). Der Kommentar `app.js:40–45` benennt den Zweck korrekt: „dass niemand VERSEHENTLICH etwas in Umlauf bringt, nicht dass etwas geheim bleibt." `istAutor()` (`app.js:47–50`) ist eine reine Sichtbarkeitsschaltung im Browser. **Festhalten, damit später niemand etwas Ernstes dahinterlegt.** |
| Sensible Daten verschlüsselt speichern | `➖` | Geprüft, **welche** personenbezogenen Daten überhaupt in Firestore liegen: nur `name` (selbst gewählter Anzeigename), `streak`, `settings`, `schemaVersion` sowie Bereiche und Kartentexte. Die E-Mail liegt in Firebase Auth, nicht in der eigenen Datenbank. Kartentexte sind Lernstoff, kein personenbezogenes Datum. Firestore verschlüsselt ruhende Daten ohnehin. Nichts, was eine eigene Verschlüsselung rechtfertigt. |
| Parameterisierte Abfragen / Injection | `➖` | Kein SQL im Projekt. Firestore kennt keine Query-Injection: Abfragen werden als Objekte gebaut, nicht als Text zusammengesetzt. Bestätigt die Erst-Einschätzung. |

> **Prüfschritt für Phase 1, aus dem Repo heraus nicht zu klären:**
> `firestore.rules` ist die *versionierte* Fassung. Ob sie auch die *aktive*
> ist, zeigt nur die Firebase-Konsole. Vor jeder Änderung abgleichen.

---

## 4.3 Konto und Anmeldung

| Punkt | Status | Beleg und Begründung |
|---|---|---|
| Registrierung und Anmeldung durchklicken | `🔧` **Phase 2** | Der Code ist da (`app.js:1731` Anmeldung, `app.js:1746` Registrierung). Ein dokumentierter Testlauf fehlt — genau wie die Erst-Einschätzung sagt. |
| E-Mail-Bestätigung | `✅` | `sendEmailVerification` bei der Registrierung (`app.js:1751`) und erneut anforderbar (`app.js:1784`). Die Regeln verlangen `email_verified == true`, und die App sperrt sich selbst bis dahin (`app.js:3487` → `renderPendingVerification`). Beides greift ineinander. |
| Passwort zurücksetzen | `✅` | Vorhanden und erreichbar: `sendPasswordResetEmail` (`app.js:1796`), angebunden am Anmeldebildschirm (`renderAuth`, `app.js:3672 ff.`). Die offene Frage der Erst-Einschätzung („prüfen, ob es im Tool erreichbar ist") ist damit beantwortet: **ja**. |
| **Konto löschen inklusive Daten** | `🔧` **Phase 2 — Pflicht vor Veröffentlichung** | Bestätigt die Vermutung. `deleteUser` kommt in `app.js` **nicht vor**; es gibt keinen Weg, ein Konto zu löschen. Zu bauen sind beide Hälften: Konto in Firebase Auth **und** Daten unter `users/{uid}`. Voraussetzung für Phase 5. |
| Passwörter richtig gehasht | `➖` | Macht Firebase Auth. Die App sieht ein Passwort nur als Eingabefeld und reicht es an das SDK weiter; sie speichert nichts davon. Bestätigt. |
| Session-Cookies absichern | `➖` | Geprüft: `document.cookie` kommt in `app.js` **null**-mal vor. Firebase Auth arbeitet mit Tokens im Browserspeicher, nicht mit eigenen Cookies. Es gibt kein Cookie, das man absichern könnte. Bestätigt. |
| Anmeldung mit Rate-Limit, Bot-Schutz | `⏳` **später** | Firebase bringt einen Grundschutz mit. Der richtige Hebel heißt App Check und lohnt erst, wenn die Seite öffentlich beworben wird. Bestätigt; steht in `../PLAN.md` unter „Später". |
| Private Seiten hinter dem Login | `✅` | Die Reihenfolge in `render()` (`app.js:3483–3487`) ist eindeutig: Datenschutzhinweis (absichtlich auch ohne Konto erreichbar, Commit `2bc4591`) → `renderAuth()` wenn nicht angemeldet → `renderPendingVerification()` wenn nicht bestätigt → erst dann die App. Ohne Anmeldung ist von den Lerndaten **nichts** sichtbar. |
| Admin-Routen geschützt | `➖` | Es gibt keine. Die App kennt überhaupt keine Routen — ein Bildschirm, `render()` schreibt alles neu. Der Autorenmodus ist keine Route und keine Grenze (siehe 4.2). Bestätigt. |

---

## 4.4 Eingaben und Ausgaben

| Punkt | Status | Beleg und Begründung |
|---|---|---|
| Alle Eingaben prüfen | `🔧` **Phase 1** | Die Browser-Hälfte ist ordentlich: `normCard` (`app.js:140–166`) prüft `stufe` auf Ganzzahl ≥ 0, Datumsfelder gegen `^\d{4}-\d{2}-\d{2}$`, `rueckfaelle` auf Ganzzahl ≥ 0; `normBereiche` (`app.js:469–492`) verlangt einen nicht-leeren Namen und kürzt ihn auf 40 Zeichen. **Die Regel-Hälfte fehlt vollständig** (siehe 4.2). Genau die „doppelt"-Anforderung der Erst-Einschätzung ist damit halb erfüllt. Aufgefallen: `wort` und `uebersetzung` sind nur `String(…)` **ohne Längenbegrenzung** (`app.js:147–148`) — anders als `name`. |
| Nutzertexte beim Anzeigen entschärfen (XSS) | `🔧` **Phase 1, aber besser als befürchtet** | Es gibt eine zentrale Entschärfung `esc()` (`app.js:54–58`, maskiert `& < > " '`) mit **107 Verwendungen**. Erleichternd: `app.js` benutzt **keine** Template-Literale, alles ist Zeichenkettenaddition — kein `${}` kann versehentlich durchrutschen. Die 11 `innerHTML`-Stellen sind durchweg Zuweisungen fertig gebauter Zeichenketten. Stichproben an den heikelsten Stellen (Bereichsnamen `app.js:3839`, Speicherkarten `app.js:1873`, Dialogtexte) zeigen `esc()` angewandt. **Geprüft und entwarnt:** drei Fundstellen, an denen `b.name` ohne `esc()` eingesetzt wird (`app.js:2235`, `2241`, `2640`), gehen alle an `dlgAlert`/`dlgPrompt` — und `renderDialog` entschärft beim Rendern (`app.js:6194`). Offen bleibt, ob **jede** der 107 Einsetzungen lückenlos greift. Das ist eine Aussage über jede einzelne Stelle und gehört in die gründliche Prüfung von Phase 1, nicht in eine Stichprobe. |
| Dateiupload einschränken | `🔧` **Phase 1** | Bestätigt: Es gibt genau einen, den JSON-Import (`app.js:2469–2563`, Eingabefeld `app.js:4006` mit `accept="application/json"`). Struktur wird geprüft (`JSON.parse` in `try`, `Array.isArray(data.bereiche)`, danach `normBereiche`). **Nicht geprüft werden: Dateigröße** — `reader.readAsText(file)` (`app.js:2563`) liest ohne Obergrenze —, **Anzahl der Bereiche und Karten**, und **Textlänge** von `wort`/`uebersetzung`. `accept` im Eingabefeld ist ein Vorschlag an den Dateidialog, keine Prüfung. |
| API-Antworten beschneiden | `➖` | Kein eigenes API. Was der Browser bekommt, entscheiden allein die Regeln — der Punkt fällt inhaltlich mit 4.2 zusammen und wird dort behandelt. Bestätigt. |
| CORS-Einstellungen | `➖` | Kein eigenes API. Die Gegenstellen (Firebase, Schriftserver) setzen ihre CORS-Regeln selbst; dieses Projekt hat dort nichts einzustellen. Bestätigt. |

---

## 4.5 Transport und Umfeld

| Punkt | Status | Beleg und Begründung |
|---|---|---|
| HTTPS erzwingen | `✅` / `⏳` **Phase 4 bestätigen** | Liefert das Hosting. Solange auf GitHub Pages, ist HTTPS gesetzt. Mit der Domain aus Phase 4 erneut nachzuweisen, nicht anzunehmen. |
| Security-Header (CSP, HSTS …) | `⏳` **Phase 4** | Bestätigt: hängt am Hosting, auf GitHub Pages kaum einstellbar. Keine Header-Konfiguration im Repo. Gehört in Phase 4 und ist dort Punkt 3. |
| Rate-Limits auf teure Endpunkte | `➖` | Keine eigenen Endpunkte. Relevant erst mit Abo/Bezahlung — das steht unter „Später". Bestätigt. |
| Abhängigkeiten scannen, aktuell halten | `🔧` **Phase 3, klein** | Bestätigt: sehr wenig Angriffsfläche. Es gibt **kein** `package.json` und **kein** `node_modules`. Die einzige Code-Abhängigkeit ist das Firebase-SDK, fest auf **10.12.2** gepinnt (`app.js:1158–1160`), geladen von `gstatic.com`. Dazu die Quran-Schrift von `verses.quran.foundation` (`sw.js:32`). Zu tun bleibt genau eines: prüfen, ob 10.12.2 noch aktuell ist. Unbenutzte Abhängigkeiten gibt es nicht. |
| Voller Sicherheits-Durchlauf am Ende | `⏳` **Abschluss von Phase 1** | Bestätigt als eigener Abschluss einer Phase, nicht als Dauerauftrag. Sinnvoll am Ende von Phase 1, wenn die Regeln stehen. |

---

## 4.6 Recht

| Punkt | Status | Beleg und Begründung |
|---|---|---|
| Impressum | `⏳` **Phase 5** | Nicht vorhanden. Fällig mit der öffentlichen Adresse. |
| Datenschutzerklärung | `⏳` **Phase 5** | Es gibt bisher nur einen Hinweis in den Einstellungen (`app.js:4459`, `renderDatenschutz` ab `app.js:4481`), erreichbar auch **ohne** Konto (`app.js:3483`, `3723`). Das ist ein Hinweis, keine Erklärung. Bestätigt. |
| Cookie-Richtlinie und Einwilligung | `➖` **wahrscheinlich kein Banner nötig** | Das Konzept verlangt ausdrücklich: erst prüfen, ob überhaupt nicht-notwendige Cookies gesetzt werden. **Geprüft:** `document.cookie` kommt **null**-mal vor. Der einzige eigene Browserspeicher ist `localStorage`-Schlüssel `adrabic-thema` (Hell/Dunkel-Wahl, `index.html:35`, `app.js`) plus der Altschlüssel `lernkarten-app-v1` (`app.js:975`, nur zur einmaligen Übernahme alter Daten). Beides ist für den Betrieb notwendig und nicht einwilligungspflichtig. Firebase Auth legt seinen Anmeldezustand ebenfalls im Browserspeicher ab — notwendig für die Anmeldung. **Ein Banner wäre nach heutigem Stand überflüssig.** In Phase 5 vor der endgültigen Festlegung noch einmal am dann aktuellen Firebase-Verhalten nachzuprüfen. |
| Auskunft und Löschung eigener Daten | `🔧` **Phase 2 (Technik) → Phase 5 (Text)** | Hängt an „Konto löschen", das es nicht gibt. Deshalb steht Phase 2 zwingend vor Phase 5. |

---

## 4.7 Die Startseite — Conversion

| Punkt | Status | Beleg und Begründung |
|---|---|---|
| Aufbau Problem → Ausmaß → Lösung → Beweis → Handlungsaufruf | `⏳` **Phase 6** | Es gibt **keine** öffentliche Seite. Wer die Adresse aufruft, landet direkt am Anmeldebildschirm (`app.js:3484`). |
| Hero-Bereich mit Handlungsaufruf | `⏳` **Phase 6** | Nicht vorhanden. |
| Problem richtig benennen | `⏳` **Phase 6** | Inhaltliche Vorgabe des Konzepts, in den Auftrag von Phase 6 übernommen. |
| Trennung öffentlich / angemeldet | `⏳` **Phase 6**, Grundlage `✅` | Die technische Hälfte steht bereits: Ohne Anmeldung ist nichts Privates sichtbar (siehe 4.3). Was fehlt, ist die öffentliche Hälfte — es gibt schlicht noch nichts zu trennen. |

---

## 4.8 Gefunden werden — SEO

| Punkt | Status | Beleg und Begründung |
|---|---|---|
| Google Search Console | `⏳` **Phase 7** | Nicht eingerichtet. Vor der Domain sinnlos. |
| `robots.txt` und `sitemap.xml` | `⏳` **Phase 7** | Beide nicht vorhanden. |
| Titel und Meta-/OG-Angaben | `⏳` **Phase 7** | `index.html` hat `<title>`, `theme-color`, `color-scheme` und die PWA-Angaben — aber **keine** `description` und **keine** OG-Angaben. Für eine reine App hinter dem Login ist das folgerichtig; mit der öffentlichen Seite ändert es sich. |
| FAQ-Bereich | `⏳` **Phase 7** | Nicht vorhanden. |

---

## 4.9 Rückmeldungen

| Punkt | Status | Beleg und Begründung |
|---|---|---|
| Kontaktformular | `⏳` **Phase 8** | Nicht vorhanden. Läuft heute über direkte Nachrichten, und das funktioniert. |
| Formular für Fehlermeldungen | `⏳` **Phase 8** | Nicht vorhanden. Dass der Kanal wirkt, ist belegt: eine Rückmeldung hat schon eine Funktion geändert (Notiz nach dem Aufdecken offen). |

---

## 4.10 Barrierefreiheit

| Punkt | Status | Beleg und Begründung |
|---|---|---|
| Bedienung mit der Tastatur | `🔧` **Phase 9** | Teilweise. Die App baut ihre Bedienelemente überwiegend als echte `button`-Elemente, die damit von selbst erreichbar sind. Aber: `app.js` hat **einen** delegierten Klick-Listener über `data-action` (`README.md`), und der Übungsmodus wertet Tipps auf die ganze Bühne aus. Ob jeder Weg auch ohne Maus gangbar ist, ist nicht belegt und in Phase 9 durchzugehen. |
| Kontraste, auch im dunklen Modus | `🔧` **Phase 9** | Beide Fassungen existieren (`data-thema` in `index.html:38`, Tokens in `styles.css`). Gemessen wurden die Kontraste nie. |
| Sichtbarer Fokus | `🔧` **Phase 9** | Bestätigt die Angabe im Konzept: Im Modus „Lernen" gibt es einen mitwandernden Fokus. Für die übrigen Bildschirme ist es nicht belegt. |
| Alternativtexte, sinnvolle Beschriftungen | `🔧` **Phase 9** | Gemischt. Gut: Der Dialog ist sauber ausgezeichnet (`role="dialog"`, `aria-modal`, `aria-labelledby`, `app.js:6192–6193`), `icon.svg` trägt `role="img"` und `aria-label`, dekorative Grafiken tragen `aria-hidden="true"` (`index.html:46`, `49`). Offen: Die über `ikon()`/`iconSvg()` erzeugten Symbole in Schaltflächen sind daraufhin nicht durchgesehen. Der laufende Umbau von Emoji auf SVG fasst genau diese Stellen ohnehin an. |

---

## Zusammenfassung

| | 4.1 | 4.2 | 4.3 | 4.4 | 4.5 | 4.6 | 4.7 | 4.8 | 4.9 | 4.10 | **Σ** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `✅` | 2 | 3 | 4 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | **10** |
| `🔧` | 1 | 1 | 2 | 3 | 1 | 1 | 0 | 0 | 0 | 4 | **13** |
| `⏳` | 1 | 0 | 1 | 0 | 2 | 2 | 4 | 4 | 2 | 0 | **16** |
| `➖` | 2 | 3 | 2 | 2 | 1 | 1 | 0 | 0 | 0 | 0 | **11** |
| **Σ** | **6** | **7** | **9** | **5** | **5** | **4** | **4** | **4** | **2** | **4** | **50** |

### Die fünf Funde, die den Plan tragen

1. **Feld-Manipulation ist die eine echte Lücke.** `firestore.rules` prüft
   *wer* schreibt, nie *was*. `maxStufe` steuert das Freischalten der nächsten
   Lektion und ist frei setzbar. → **Phase 1, zuerst.**
2. **„Konto löschen" fehlt vollständig.** Kein `deleteUser` im Code. Blockiert
   Phase 5. → **Phase 2.**
3. **Der JSON-Import prüft Struktur, aber keine Menge.** Keine Dateigrößen-,
   Anzahl- oder Textlängenbegrenzung. → **Phase 1.**
4. **XSS ist diszipliniert gebaut, aber nicht abschließend belegt.** Zentrale
   `esc()`, keine Template-Literale, Stichproben sauber. Die lückenlose
   Prüfung aller 107 Einsetzungen steht aus. → **Phase 1.**
5. **Die Außenseite existiert schlicht nicht.** Startseite, Impressum,
   Datenschutzerklärung, `robots.txt`, Sitemap, Formulare: nichts davon ist da.
   Das ist kein Mangel, sondern der Grund für die Phasen 4–8.

### Was sich als unbegründete Sorge erwiesen hat

Ausdrücklich festgehalten, damit keine spätere Session Arbeit erfindet:

- **Keine Debug-Reste.** Null `console.*` in `app.js`.
- **Keine Geheimnisse in der Git-Historie.** Über alle Refs geprüft.
- **Keine Cookies.** Null `document.cookie`. Ein Banner wäre überflüssig.
- **Kein Abhängigkeits-Wildwuchs.** Eine gepinnte Bibliothek, kein Build.
- **Kein offener Pfad in Firestore.** Die Regel deckt alles ab, was die App
  benutzt — sie prüft nur den Inhalt nicht.

### Abweichungen zwischen Konzept und Code

Nach Konzept-Abschnitt 3 ist der Code maßgeblich. Festgehalten statt
stillschweigend korrigiert:

| Konzept sagt | Code zeigt |
|---|---|
| Version 2.21.x | `APP_VERSION = "3.0.3"` (`app.js:19`) |
| `AUTOR_UID` in `index.html` | `app.js:46` (verschoben mit 3.0.0) |
| „prüfen: Konsolen-Ausgaben" | keine vorhanden |
| „Passwort zurücksetzen — prüfen, ob erreichbar" | vorhanden und erreichbar |
| Repo `user123kkk/adrabic`, Ordner `wiederholung/` | Repo `user123kkk/Wiederholung`, flache Ablage. `manifest.json` trägt aber noch `"id": "/adrabic/wiederholung/"` — ein Hinweis darauf, dass die App bisher unter diesem Pfad ausgeliefert wird. → offene Frage 5, und in Phase 4 zu beachten: Ein geänderter Pfad ändert die `id` und damit die Identität der installierten App. |

### Was Phase 0 nicht klären konnte

Zwei Dinge liegen außerhalb des Repos und brauchen einen Blick in fremde
Oberflächen:

1. **Sind die ausgelieferten Firestore-Regeln dieselben wie die Datei im
   Repo?** Nur in der Firebase-Konsole zu sehen. → vor Phase 1 abgleichen.
2. **Ist der API-Key bereits eingeschränkt?** Nur in der Google-Cloud-Konsole
   zu sehen. → Phase 4.

---

**Phase 0 ist damit abgeschlossen.** Nächster Schritt:
[`../phase-1-datenzugriff/AUFTRAG.md`](../phase-1-datenzugriff/AUFTRAG.md).

# Befunde TECHNIK (PWA, Service Worker, Hosting, Leistung, SEO, Barrierefreiheit, statische Seiten, Werkzeuge)

Stand: 25.09.2026, Code 3.17.29 (`9884a3a`). Nichts im Repo geändert. Eigene Skripte und Ausgaben:
`scratchpad/audit/TECHNIK/` (`t_csp.js`, `t_sw.js`, `t_fokus.js`, `t_fokus2.js`, `t_leistung.js`,
`t_kontrast_gross.js`, `pruefe_version.sh`, `a11y_kontrast.txt`).

---

#### TECHNIK-1: Impressum und Datenschutz ignorieren das helle Thema, weil die CSP ihr Kopfskript blockiert
- Art: Fehler
- Schwere: hoch
- Beleg: `impressum.html:18-37` und `datenschutzerklaerung.html:18-37`: das Kopfskript unterscheidet sich von `index.html:88-107` nur in einer Farbe (`hell ? "#f2ece0" : "#0e0e12"` statt `"#111010"`). Selbst nachgerechneter sha256 (base64) des Inhalts: Rechtsseiten `V7eLURLNlFcOp/21l+MzL3mFuBHq3zut9ChTCulJl9w=`, `index.html` `+kgbNJPbflpXFm9lacyASAWVq9Ake21SDCF2vjlryGI=`. In `firebase.json:59` und `:118` stehen nur `uMYZ…`, `68Cs…`, `+kgb…`, also **nicht** der Hash der Rechtsseiten. Messung (`TECHNIK/t_csp.js`, echte CSP per Route eingespielt, `adrabic-thema=hell`): `impressum.html` → `data-thema` = null, Hintergrund rgb(17,16,16), Konsole: „Refused to execute inline script … script-src …“. Dasselbe bei `datenschutzerklaerung.html`. `index.html` → `hell`, keine Meldung. **verifiziert**
- Warum es stört: Wer das helle Thema gewählt hat, tippt in den Einstellungen auf Impressum oder Datenschutz und bekommt eine schwarze Seite. Genau der Vorfall aus LEHREN § 9.2 (3.0.21), nur auf anderen Seiten. Außerdem weicht die Statusleistenfarbe `#0e0e12` von der App-Farbe `#111010` ab, die Farbnaht aus Beobachtung 17 kehrt auf diesen Seiten zurück.
- Vorschlag: In beiden Rechtsseiten `#0e0e12` → `#111010` ersetzen, im `<meta name="theme-color">` und im Skript. Dann ist das Skript byteweise gleich dem aus `index.html`, und sein Hash `+kgb…` ist schon erlaubt. `firebase.json` bleibt unverändert, `csp-build` muss nicht mitgezählt werden. Die HTML-Dateien ändern sich, deshalb braucht es einen Hosting-Deploy. Nach LEHREN § 4.1 ist das eine Änderung an ausgelieferten Dateien, also Version hochzählen.
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: `TECHNIK/t_csp.js` meldet für beide Seiten `thema:"hell"` und „keine CSP-Meldung“, `pruefe_version.sh` (TECHNIK-2) läuft grün, `grep -c 0e0e12 impressum.html datenschutzerklaerung.html` ergibt 0.

#### TECHNIK-2: Kein automatischer Prüfschritt vor dem Veröffentlichen (Version an vier Stellen, CSP-Hashes)
- Art: Fehlt
- Schwere: hoch
- Beleg: `.github/workflows/veroeffentlichen.yml:28-29` prüft nur `node --check app.js && node --check sw.js`. `veroeffentlichen.bat:19-21` deployt ganz ohne Prüfung. Die Checkliste LEHREN § 14 Punkt 10/11 und § 9.2 wird von Hand abgearbeitet. Belegte Vorfälle dazu: 3.5.4, 3.6.2, 3.11.0, 3.0.21, jetzt TECHNIK-1. Entwurf `TECHNIK/pruefe_version.sh` gegen den heutigen Stand laufen lassen: bricht mit Exit 1 ab und nennt genau TECHNIK-1 (`Inline-Skript in impressum.html fehlt in der CSP: 'sha256-V7eL…'`). **verifiziert**
- Warum es stört: Jeder Fehler dieser Art sieht aus wie „erledigt“, bis ein Mensch ihn am Gerät findet. Der Betreiber: „das kann ich mir einfach nicht leisten“.
- Vorschlag: Neues Skript `plan/werkzeuge/pruefe_version.sh` nach dem Entwurf im Scratchpad. Es prüft:
  1. `node --check` für `app.js` und `sw.js`;
  2. `APP_VERSION` gleich `CACHE_NAME`, beide `?v=` in `index.html` und Kopf von `CHANGELOG.md`, mit festem Text, nicht Regex (§ 4.1);
  3. jedes Inline-`<script>` in jeder `*.html` der Wurzel ist per Hash in **jeder** CSP von `firebase.json` erlaubt.

  Optional kommt dazu eine Warnung bei Hashes, die kein Skript mehr benutzt (TECHNIK-16). Einbinden als eigener Schritt **vor** dem Deploy im Workflow (`run: bash plan/werkzeuge/pruefe_version.sh`; `plan/` wird ausgecheckt, nur nicht ausgeliefert). In `veroeffentlichen.bat` geht es nur, wenn Git-Bash oder WSL da ist. Sonst braucht es dieselbe Prüfung als `node`-Skript (`pruefe_version.js`), weil `node` auf dem Betreiber-PC sicher vorhanden ist (firebase-tools braucht es). Die Node-Fassung ist vorzuziehen: Sie läuft an beiden Stellen, braucht kein Python und keine Bash. In LEHREN § 14 Punkt 10/11 auf das Skript verweisen.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Das Skript ist heute rot mit genau dem Fund aus TECHNIK-1 und nach dessen Behebung grün. Ein absichtlich verstelltes `?v=` in einer Kopie lässt es rot werden. Ein Workflow-Lauf mit falscher Version bricht vor „Auf Firebase Hosting veroeffentlichen“ ab.

#### TECHNIK-3: Eine offene App erfährt nie von einer neuen Version, es gibt keinen Hinweis „Neue Version“
- Art: Fehlt
- Schwere: mittel
- Beleg: `sw.js:73` `self.skipWaiting()` und `sw.js:82` `self.clients.claim()`: Der neue Service Worker übernimmt sofort. In `app.js:12398-12402` steht nur `register("./sw.js")`. Es gibt keinen `registration.update()`, kein `updatefound` und kein `controllerchange` (grep über `app.js`: 0 Treffer). Messung `TECHNIK/t_sw.js`: nach einem Update-Versuch läuft die alte Seite unverändert weiter, kein Hinweistext. Beim Update-Teil ist das Ergebnis nur eingeschränkt aussagekräftig, weil Playwright den Abruf von `sw.js` womöglich nicht umleitet. Belegt ist der Befund durch den Code. **verifiziert (Code)**
- Warum es stört: Eine Home-Bildschirm-App auf iOS/Android bleibt oft tagelang im Speicher und lädt nie neu. Der Browser sucht nur bei einer Navigation nach einem neuen `sw.js`. Ein Fix wie 3.17.28 („bewertete Karten kamen wieder“) kommt dann erst an, wenn die App ganz geschlossen wurde. Für den Betreiber ist nicht erkennbar, wer noch mit alter `app.js` lernt.
- Vorschlag: In `app.js`:
  1. bei `visibilitychange` → sichtbar höchstens 1×/Stunde `reg.update()` aufrufen;
  2. bei `navigator.serviceWorker` `controllerchange`, sobald keine Runde läuft (`!ui.session && !ui.lernSetId`, wie `verbindungGewechselt`), einen Toast oder Hinweis „Neue Version – neu laden“ mit Knopf zeigen, oder ohne Hinweis neu laden, wenn die App ohnehin gerade in den Vordergrund kommt.

  Die Klick-Handlung läuft über den einen delegierten Listener (`data-action`).
- Entscheidet: Betreiber (neuer sichtbarer Hinweis)
- Umsetzung: Sonnet
- Abnahme: Prüfstand-Test mit zwei `sw.js`-Fassungen (eigener kleiner Server im Scratchpad oder `CACHE_NAME` per Route): Nach „sichtbar werden“ erscheint der Hinweis, bzw. die Seite lädt, und `APP_VERSION` ist neu. Während einer Runde erscheint nichts.
- Pro/Contra: Pro: Fehlerbehebungen erreichen alle innerhalb von Stunden statt Tagen. Die Fehlerberichte enthalten dann aktuelle Versionen. Das Stille-Neuladen-Verfahren verursacht keine zusätzliche Unruhe am Bildschirm. Contra: ein weiteres Element auf dem Bildschirm (Hick's Law), falls als Hinweis gebaut. Bei stillem Neuladen verliert man einen halb getippten Entwurf, sofern er nicht in `ui`/Entwurf liegt (`karteEntwurfOffen` gibt es, andere Formulare prüfen). Empfehlung: **stilles Neuladen nur beim Zurückkehren in die App** (Sichtbar-Werden, keine Runde, kein offenes Blatt). Keinen sichtbaren Hinweis. Das deckt den Kern ab und bringt kein neues Bedienelement.

#### TECHNIK-4: Jeder Start wartet aufs Netz, auch für Dateien, die sich nie ändern können
- Art: Verbesserung
- Schwere: mittel
- Beleg: `sw.js:99-146`: „Zuerst Netz, dann Cache“ für **alle** Anfragen, mit `NETZ_ZEITLIMIT_MS = 4000` (`sw.js:86`). Betroffen sind auch `app.js?v=3.17.29`, `styles.css?v=3.17.29` und `https://www.gstatic.com/firebasejs/10.14.1/*.js` (`app.js:1864-1866`). Diese URLs tragen ihre Version und ändern ihren Inhalt nie. Bei „Lie-Fi“ (Verbindung da, aber langsam) wartet so jeder Start bis zu 4 s je Datei. **verifiziert (Code)**, die Wartezeit auf echtem Lie-Fi ist nicht gemessen.
- Warum es stört: Der Start fühlt sich in U-Bahn und Funkloch langsam an, obwohl alles im Cache liegt. Die Begründung für „Netz zuerst“ („online sieht man immer sofort die neueste Version“, `sw.js:99-100`) gilt für diese Dateien nicht, weil eine neue Version eine neue URL hat.
- Vorschlag: In `sw.js` für drei Fälle „Cache zuerst, sonst Netz (und ablegen)“: gleiche Herkunft mit `?v=` in der Query, `www.gstatic.com/firebasejs/<version>/`, dazu `fonts/`. Navigationen, `manifest.json`, Bilder und alles andere bleiben unverändert bei „Netz zuerst“. Beobachtung 16 (`plan/beobachtungen-lernwerkzeug.md:1019`) wurde mit dem Zeitlimit gelöst. Der Vorschlag ist neu, weil er nur unveränderliche URLs betrifft.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Prüfstand mit echter Service-Worker-Steuerung: Beim zweiten Laden erzeugen `app.js?v=…` und `firebase-*.js` keine Netzanfrage (Netzmitschnitt von Server bzw. CDP `Network.requestWillBeSent` mit `fromServiceWorker`). Wird `index.html` mit neuem `?v=` ausgeliefert, holt die App die neue `app.js` vom Netz.

#### TECHNIK-5: Die drei Firebase-Bausteine laden nacheinander statt gleichzeitig
- Art: Verbesserung
- Schwere: mittel
- Beleg: `app.js:1864-1866`: drei `await importMitVersuch(...)` hintereinander. Messung `TECHNIK/t_leistung.js` (Handy, 150 ms Latenz): `firebase-app.js 405→562`, `firebase-auth.js 570→724`, `firebase-firestore.js 728→960` ms, ein klarer Wasserfall. Bei CPU 4× ergeben sich 625→780, 849→1012 und 1018→1226. **verifiziert** (Attrappe statt echter SDK-Dateien; die echten sind größer, der Abstand wird eher größer)
- Warum es stört: Beim ersten Besuch und immer, wenn der Cache nicht greift, wartet die Anmeldung zwei Netz-Umläufe länger als nötig, gemessen rund 350–400 ms bei 4G.
- Vorschlag: `const [appMod, authMod, fsMod] = await Promise.all([importMitVersuch(A), importMitVersuch(B), importMitVersuch(C)])`. Jeder Baustein behält seine eigenen Wiederholungen. Zusätzlich in `index.html` drei `<link rel="modulepreload" href="https://www.gstatic.com/firebasejs/10.14.1/…" crossorigin>`. Die CSP `script-src` erlaubt gstatic schon, `preconnect` steht schon in `index.html:38`. Die URL-Version steht dann an zwei Stellen und gehört in `pruefe_version` (TECHNIK-2).
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: `t_leistung.js`: Die Startzeiten der drei `firebase-*.js` liegen innerhalb von ~20 ms. `t_start.js` und `t_anmelden.js` bleiben grün. Der Startfehler-Pfad (gstatic blockiert) zeigt weiter „Start fehlgeschlagen“.

#### TECHNIK-6: Helles Thema am Desktop und iPad quer: Navigationsspalte unter 4,5:1
- Art: Fehler
- Schwere: mittel
- Beleg: `t_a11y.js desktop` (Lauf 25.09.) meldet auf jedem Bildschirm `Kontrast ["Bereiche 4.31","Lernen 4.31","Fortschritt 4.31","Verwalten 4.31"]`. `TECHNIK/t_kontrast_gross.js`: `desktop/hell` und `ipadquer/hell` → `.nav-titel` und `.nav__tab` 4,31 < 4,5. Farbe rgb(111,104,92) = `--paper-500` `#6f685c` (`styles.css:326`) über `--bg-sunken` der Spalte (`styles.css:4608`). Die Regeln stehen in `styles.css:4628-4646` (`.nav__tab`, `.nav-titel` mit `color: var(--text-3)`). Handy, klein und iPad hoch sind sauber, ebenso das dunkle Thema. `t_kontrast.js` prüft nur `GERAETE.handy` (`t_kontrast.js:9`) und konnte das nicht finden (LEHREN § 5.3). **verifiziert**
- Warum es stört: Die Hauptnavigation ist am großen Bildschirm im hellen Thema schwerer lesbar. Das verstößt gegen die eigene Regel ≥ 4,5:1.
- Vorschlag: In `styles.css` im ≥900-px-Block für `:root[data-thema="hell"]` `.nav__tab` (nicht aktiv) und `.nav-titel` auf `--text-2` setzen. Alternativ die Spaltenfläche im hellen Thema auf `--bg` lassen. `t_kontrast.js` um `GERAETE.desktop` erweitern.
- Entscheidet: Agent
- Umsetzung: Haiku (CSS) + Sonnet (Test erweitern)
- Abnahme: `t_a11y.js desktop` zeigt überall `Kontrast 0`. Der erweiterte `t_kontrast.js` meldet 0 Funde in beiden Themen auf Handy und Desktop.

#### TECHNIK-7: „Fehler melden“-Dialog: Tab verlässt den Dialog, Fokus landet danach im Nichts
- Art: Fehler
- Schwere: mittel
- Beleg: Die Fokusfalle `app.js:11566-11577` sucht nur `.dlg`. Das Fehler-Modal (`index.html:129-156`, `role="dialog" aria-modal="true"`) liegt außerhalb davon. `closeErrorModal()` (`app.js:11668-11676`) gibt den Fokus nicht zurück. Messung `TECHNIK/t_fokus.js`/`t_fokus2.js` (Tastatur, Desktop): Nach dem Öffnen steht der Fokus richtig im Textfeld, nach 3× Tab aber auf `body` und dann auf Knöpfen hinter dem Dialog (21 von 25 Tabs außerhalb). Nach Escape steht er auf `body`. Zum Vergleich Karten-, Bereich-, Wahl-Blatt und Abmelde-Rückfrage: 0 Tabs außerhalb, Fokus kehrt zum Öffner zurück. **verifiziert**
- Warum es stört: Wer mit Tastatur oder Bildschirmleser einen Fehler melden will, verliert den Dialog aus dem Fokus und danach die eigene Position in den Einstellungen (WCAG 2.4.3). Es ist genau die eine Stelle, die bei Beobachtung 19/9 nicht mitgezogen wurde (LEHREN § 3.3).
- Vorschlag: Die Fokusfalle auf `.dlg, #errorModal[aria-hidden="false"] .error-modal__dialog` erweitern. In `openErrorModal()` `document.activeElement` merken, in `closeErrorModal()` dorthin zurückgeben, sofern das Element noch im DOM steht, sonst über `fokusSchluessel`. Solange das Modal offen ist, `#app` `inert` setzen, beim Schließen wieder entfernen.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: `TECHNIK/t_fokus.js`: „fehler-modal … 25x Tab: ausserhalb 0“. `t_fokus2.js`: „open-error-modal … nach Escape open-error-modal“.

#### TECHNIK-8: Kurzmeldungen werden vom Bildschirmleser vermutlich nicht vorgelesen
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:1565`: `renderToast()` gibt `<div class="toast" role="status" aria-live="polite">…Text…</div>` als Teil von `render()` zurück. `render()` ersetzt `#app` komplett (LEHREN § 13). Die Live-Region entsteht also **zusammen mit** ihrem Text und nicht vorher leer. Viele Bildschirmleser (VoiceOver, NVDA) sagen nur Änderungen an einer schon vorhandenen Region an. Außerdem baut jedes `render()` in den 2,6 s die Region neu auf. Die Fehlerzeilen der Anmeldung (`app.js:6703`, `role="alert"`) sind weniger betroffen, weil `alert` beim Einfügen meist angesagt wird. **Vermutung** (kein echter Bildschirmleser verfügbar; der Mechanismus ist aus dem Code belegt).
- Warum es stört: „Gespeichert“, „Kopiert“, „Rückgängig“ und ähnliche Bestätigungen erreichen blinde Nutzer:innen nicht. Die Handlung bleibt für sie ohne Rückmeldung (LEHREN § 6.7, § 6.10).
- Vorschlag: Eine dauerhafte, leere `<div id="ansage" class="sr-only" role="status" aria-live="polite"></div>` **außerhalb** von `#app` in `index.html` (wie `#errorModal`). `zeigeToast()` setzt dort zusätzlich `textContent`: zuerst leeren, dann im nächsten Frame den Text setzen. Die sichtbare Meldung bleibt, bekommt aber `aria-hidden="true"`, damit nichts doppelt angesagt wird.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Test: Nach `zeigeToast("x")` steht in `#ansage` der Text, und `#ansage` ist nach `render()` dasselbe Element (Identität per `===` geprüft). Gerätetest für den Betreiber: VoiceOver an, Karte speichern → „Gespeichert“ wird gesprochen.

#### TECHNIK-9: Veröffentlichen lädt den ganzen Ordner hoch, auch Dateien, die nicht öffentlich sein sollen
- Art: Fehler
- Schwere: mittel
- Beleg: `firebase.json:8` bzw. `:67` `"public": "."`, die `ignore`-Liste (`:9-23`) kennt keine `*.zip`. `.gitignore` enthält `Wiederholung-design-redesign.zip`, die Datei liegt also offenbar auf einem Rechner im Repo-Ordner. Das ist eine **Vermutung**: im Container ist sie nicht vorhanden. `veroeffentlichen.bat:13-20` deployt den **Arbeitsordner** und nicht den Stand von `main`. Nicht eingecheckte, lokal geänderte Dateien gehen so mit live, ohne dass es eine Prüfung gibt. **verifiziert (Code)**
- Warum es stört: Liegt die ZIP im Ordner des Betreiber-PCs, ist sie nach dem nächsten `.bat`-Deploy unter `https://adrabic.web.app/Wiederholung-design-redesign.zip` für jeden abrufbar (ein ganzer Design-Handoff samt Code). Lokale Bastelstände können live gehen, die nie auf `main` waren.
- Vorschlag: In `firebase.json` bei beiden Sites `"**/*.zip"` in `ignore` aufnehmen. Das ändert keinen Header, `csp-build` muss also nicht mitgezählt werden. In `veroeffentlichen.bat` vor dem Deploy `git status --porcelain` prüfen und bei Ausgabe abbrechen („Es gibt lokale Änderungen, die nicht auf main sind“). Der GitHub-Knopf ist nicht betroffen, weil er sauber auscheckt.
- Entscheidet: Agent (Datei). Konsole: prüfen, ob die ZIP schon live ist.
- Umsetzung: Haiku
- Abnahme: `grep -c '\*\*/\*.zip' firebase.json` = 2. `curl -sI https://adrabic.web.app/Wiederholung-design-redesign.zip` liefert 404 (Betreiber oder Agent mit Netz). Die `.bat` bricht mit einer geänderten Datei im Ordner ab.

#### TECHNIK-10: Datenschutzerklärung erwähnt die lokale Kopie der Lerninhalte nicht, und sie bleibt nach dem Abmelden liegen
- Art: Unvollständig
- Schwere: mittel
- Beleg: `app.js:1873` `initializeFirestore(fbApp, { localCache: fb.persistentLocalCache() })` legt Karten, Bereiche und Verlauf dauerhaft in IndexedDB auf dem Gerät ab. Dazu kommt der Service-Worker-Cache (`sw.js:62`). Abmelden (`app.js:2736`, `:11983`) ruft nur `fb.signOut(auth)`, kein `terminate`/`clearIndexedDbPersistence` (grep: 0 Treffer). Die Datenschutzerklärung Punkt 10 (`datenschutzerklaerung.html:240-246`) sagt: „Die Anmeldung … speichert den angemeldeten Zustand … (IndexedDB) … Die einzige weitere Speicherung im Browser sind die unter Punkt 7 genannten Einträge in localStorage und sessionStorage.“ Punkt 7 warnt „Wer dasselbe Gerät benutzt, kann sie aber sehen“ nur für localStorage. **verifiziert (Code↔Text)**. Recht selbst nicht bewertet (§ 12).
- Warum es stört: Der Text nennt einen Datenfluss nicht, den der Code hat (LEHREN § 12 „jeden Datenfluss nennen“). Auf einem geteilten Gerät (Familie, Schule) liegen die Karten des vorigen Kontos nach dem Abmelden weiter im Browser-Speicher.
- Vorschlag: (a) Text Punkt 7/10 ergänzen: Firestore hält eine Kopie der eigenen Lerninhalte im Browser-Speicher (IndexedDB), damit die App offline geht. Dazu kommt, ob sie beim Abmelden gelöscht wird. (b) Optional: beim Abmelden nach dem `signOut` `terminate(db)` + `clearIndexedDbPersistence(db)` und anschließend neu laden. Vorher prüfen, ob noch ungesendete Schreibvorgänge da sind (`waitForPendingWrites` mit Zeitlimit), und sonst warnen.
- Entscheidet: Betreiber (Rechtstext, Verhalten beim Abmelden)
- Umsetzung: Haiku (Text) / Opus (Löschen beim Abmelden, Firebase-Zustand)
- Abnahme: (a) Der Satz „die einzige weitere Speicherung“ ist ersetzt, `grep -n IndexedDB datenschutzerklaerung.html` nennt die Lerninhalte. (b) Prüfstand/Gerät: Nach dem Abmelden ist `indexedDB.databases()` ohne `firestore/…`-Eintrag.
- Pro/Contra: (a) Pro: Der Text stimmt dann mit dem Code, genau die Lehre aus 24.09. (§ 15). Contra: keines. Empfehlung: **ja**. (b) Pro: Auf geteilten Geräten bleibt nichts Fremdes liegen. Contra: Eine offline gemachte, noch nicht gesendete Bewertung ginge beim Abmelden verloren. Das nächste Anmelden auf demselben Gerät lädt alles neu (mehr Lesezugriffe). Der Prüfstand bildet das nicht nach (`stubs.js`). Empfehlung: **erst (a); (b) nur mit Warnung „noch nicht gesendet“** und als eigener, gut getesteter Schritt.

#### TECHNIK-11: Fehlt beim Vorabspeichern eine Kerndatei, löscht die neue Version trotzdem den alten Cache
- Art: Fehler
- Schwere: niedrig
- Beleg: `sw.js:66-70`: jede Datei einzeln `cache.add(url).catch(() => console.warn(...))`. Die Installation gelingt deshalb auch, wenn `app.js?v=…` oder `styles.css?v=…` nicht gespeichert werden konnte. `sw.js:76-80` löscht danach alle anderen Caches. Holt die alte Seite neue Dateien, landen sie im **alten** Cache (`CACHE_NAME` des alten Workers, `sw.js:132`), und der wird hier gelöscht. Folge: Offline zeigt `index.html` (neu) auf eine `app.js?v=neu`, die nirgends liegt. `app.js` läuft nicht, also greift auch der Startwächter (`app.js:6427`) nicht, und der Ladebildschirm bleibt ohne Text stehen. **Vermutung** zur Häufigkeit (braucht einen Netzaussetzer genau beim Installieren), der Mechanismus ist aus dem Code belegt.
- Warum es stört: Das ist selten, aber dann ist die App offline tot. Der Fall „nie ewig Lädt…“ (LEHREN § 6.7) wäre verletzt.
- Vorschlag: Kerndateien (`./`, `./index.html`, `styles.css?v`, `app.js?v`) mit `cache.addAll` und **ohne** `catch` speichern, damit die Installation scheitert und der alte Worker samt Cache bleibt. Die übrigen Dateien bleiben einzeln mit `catch`.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Prüfstand: `app.js?v=` beim Install mit 500 beantworten → die Registrierung bleibt beim alten Worker, und `caches.keys()` enthält weiter den alten Cache.

#### TECHNIK-12: Manifest: zwei gleich große „any“-Symbole, keins für Android-Formen (maskable)
- Art: Verbesserung
- Schwere: niedrig
- Beleg: `manifest.json:15-33`: `desktop-icon.png` 512 `any` (rund, transparente Ecken) **und** `icon-512.png` 512 `any` (Quadrat, randlos). Welches Android nimmt, ist nicht festgelegt. Nimmt es das runde, entsteht ein Kreis auf weißem Grund in der Adaptiv-Form (**Vermutung**, nicht am Gerät geprüft). Laut Beobachtung 18 (`plan/beobachtungen-lernwerkzeug.md:1024`) wurde `"any maskable"` **in einer Angabe** bewusst entfernt. Neu ist hier der Vorschlag eines **getrennten** Eintrags. Nachgesehen: `icon-192.png`/`icon-512.png` sind randlos, die Blüte liegt deutlich innerhalb der Sicherheitszone (Mittelpunktabstand der äußersten Ecke ≈ 50/96 px < 40 % Radius-Zone von 77 px).
- Warum es stört: Auf Android kann das installierte Symbol verkleinert in einem weißen Kreis erscheinen statt randlos dunkel.
- Vorschlag: `desktop-icon.png` aus dem Manifest nehmen oder auf eine andere Größe beschränken. Dazu ein eigener Eintrag `{ "src": "./icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }`, `any` bleibt daneben bestehen.
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: Chrome DevTools → Application → Manifest zeigt keine Warnung und in der Maskable-Vorschau die Blüte vollständig. Gerätetest Android: Symbol randlos.

#### TECHNIK-13: Der Browser darf den Offline-Speicher jederzeit räumen (keine dauerhafte Speicherung angefragt)
- Art: Fehlt
- Schwere: niedrig
- Beleg: `TECHNIK/t_sw.js`: `navigator.storage.persisted()` → `false`. In `app.js` gibt es keinen Aufruf von `navigator.storage.persist()` (grep: 0 Treffer). Die ungesendeten Schreibvorgänge liegen in der IndexedDB von Firestore (`app.js:1873`). **verifiziert**
- Warum es stört: Wird der Gerätespeicher knapp, räumt der Browser „nicht dauerhaften“ Speicher. Offline gelernte, noch nicht gesendete Bewertungen wären dann weg.
- Vorschlag: Einmal nach der ersten Anmeldung `navigator.storage?.persist?.()` aufrufen, aber **nur** in der installierten App (`matchMedia('(display-mode: standalone)')`). Firefox fragt im normalen Tab mit einem eigenen Dialog nach, das wäre ein neuer, ungefragter Dialog. Chrome und Safari entscheiden still.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Im Prüfstand mit `display-mode: standalone` wird `persist` genau einmal aufgerufen (Spion), im normalen Tab nie.

#### TECHNIK-14: GitHub-Knopf: Werkzeugversion nicht festgelegt, Schlüsseldatei bleibt bei Fehler liegen
- Art: Verbesserung
- Schwere: niedrig
- Beleg: `.github/workflows/veroeffentlichen.yml:38` `npx -y firebase-tools@latest`: eine neue Hauptversion kann den Deploy ohne Änderung im Repo brechen. `:36-39`: Bricht `deploy` ab, läuft `rm -f "$RUNNER_TEMP/sa.json"` nicht mehr (Bash `-e`). Der Runner ist wegwerfbar, das Risiko also klein. Es gibt keinen `permissions:`-Block, das Token bekommt die Standardrechte. **verifiziert (Code)**
- Warum es stört: Ein Deploy-Knopf, der eines Tages ohne Grund rot ist, kostet den Betreiber einen Abend. Der Workflow braucht nur Lesezugriff.
- Vorschlag: `firebase-tools@13` (oder die aktuell geprüfte Hauptversion) festlegen. `trap 'rm -f "$RUNNER_TEMP/sa.json"' EXIT` vor `printf`. `permissions: { contents: read }` auf Workflow-Ebene. Vor dem Deploy den Schritt aus TECHNIK-2.
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: `grep -n "firebase-tools@latest" .github/workflows/veroeffentlichen.yml` = 0, `grep -n "permissions:" …` = 1, `grep -n trap …` = 1.

#### TECHNIK-15: Regeln lassen sich nicht per Knopf veröffentlichen
- Art: Funktion
- Schwere: niedrig
- Beleg: `.github/workflows/veroeffentlichen.yml:38` nur `--only hosting`. LEHREN § 4.5: Regeln brauchen `firebase deploy --only firestore:rules` vom PC oder die Konsole, `firebase login` geht aus der Agentenumgebung nicht. **verifiziert**
- Warum es stört: Jede neue Regel hängt am PC oder an der Konsole des Betreibers. Bis dahin ist die zugehörige Funktion kaputt (§ 8.4, Vorfall 3.0.27: drei Tage).
- Vorschlag: `workflow_dispatch.inputs.was` mit `hosting` (Standard) | `regeln` | `beides`. Für `regeln`/`beides` läuft vorher der Emulator-Test `plan/phase-1-datenzugriff/regeln-pruefung.mjs` (Java per `actions/setup-java`), bei Rot wird abgebrochen. Konsole: Das Dienstkonto braucht zusätzlich die Rolle „Firebase Rules Admin“.
- Entscheidet: Betreiber (neue Funktion, Konsole)
- Umsetzung: Sonnet
- Abnahme: Lauf mit `was=regeln`: Der Emulator-Test ist grün, danach „Deploy complete“ für `firestore:rules`. In der Konsole unter Firestore → Regeln steht der Zeitstempel des Laufs.
- Pro/Contra: Pro: Regeln und Code lassen sich von jedem Gerät im selben Schritt veröffentlichen, die Lücke „Regel nicht deployt“ (mehrfacher Vorfall) wird kleiner. Mit Emulator-Test vorab ist das sicherer als Einfügen in die Konsole. Contra: Ein Knopf mit mehr Rechten, und ein Fehlgriff kann alle Zugriffe sperren (wie jede Regeländerung). Das Dienstkonto braucht eine weitere Rolle, der Einrichtungsaufwand liegt beim Betreiber. Der Emulator-Test in CI muss erst gebaut und stabil sein. Empfehlung: **ja, aber nur mit vorgeschaltetem Emulator-Test**. Ohne ihn lieber nicht.

#### TECHNIK-16: Zwei tote Freigaben in der CSP
- Art: Verbesserung
- Schwere: niedrig
- Beleg: `firebase.json:59`/`:118`: `sha256-uMYZ…` (altes Thema-Skript, `plan/phase-5-recht/LOGBUCH.md:279`) und `sha256-68Cs…` (Kontaktformular von `landing.html`, `CHANGELOG.md:1956`). Keine ausgelieferte Seite hat noch ein Skript mit diesen Hashes (Nachrechnung aller `*.html`, siehe TECHNIK-1). `landing.html` ist entfernt (LEHREN § 3.5). **verifiziert**
- Warum es stört: Eine CSP soll nur erlauben, was läuft. Tote Hashes verwirren beim nächsten CSP-Fund, siehe TECHNIK-1: Man hält `uMYZ` leicht für den Hash der Rechtsseiten.
- Vorschlag: Beide Hashes aus beiden Sites streichen, `csp-build` in `index.html:2` hochzählen (§ 4.3). Das am besten zusammen mit TECHNIK-1 erledigen und danach `pruefe_version` auf ungenutzte Hashes prüfen lassen.
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: `grep -c "uMYZ\|68CssCcg" firebase.json` = 0. `t_csp.js` zeigt für alle drei Seiten keine CSP-Meldung.

#### TECHNIK-17: Suchmaschinen: „/“ steht in der Sitemap, ist aber „noindex“
- Art: Verbesserung
- Schwere: niedrig
- Beleg: `sitemap.xml:4` `https://adrabic.web.app/`. „/“ liefert `index.html` mit `<meta name="robots" content="noindex, nofollow">` (`index.html:18`). `robots.txt:2` sperrt nur `/index.html` und nicht „/“. Die Search Console meldet so etwas als Fehler „Eingereichte URL als noindex gekennzeichnet“. Umgekehrt kann Google bei `/index.html` (verlinkt aus beiden Rechtsseiten, „← Zurück“) das `noindex` nie lesen, weil `robots.txt` das Abrufen verbietet. Die URL kann dann ohne Inhalt im Index landen. Bekannt als „zur Kenntnis“ (`plan/phase-6-startseite/LOGBUCH.md:211`). Neu sind hier die konkreten Folgen in der Search Console. **verifiziert (Dateien)**
- Warum es stört: Ein Dauerfehler in der Search Console, und die Rechtsseiten sind die einzigen indexierbaren Seiten.
- Vorschlag: Bis Phase 6 „/“ aus `sitemap.xml` nehmen und `Disallow: /index.html` streichen (das `noindex` reicht und wird dann gelesen). Mit Phase 6 neu entscheiden.
- Entscheidet: Betreiber (Phase 6 zurückgestellt)
- Umsetzung: Haiku
- Abnahme: Search Console → Seiten: kein Fehler „als noindex gekennzeichnet“.
- Pro/Contra: Pro: saubere Search Console, keine widersprüchlichen Signale. Contra: Solange es keine Startseite gibt, ist ohnehin nichts Wichtiges zu finden. Der Aufwand lohnt sich kaum vor Phase 6. Empfehlung: **mit Phase 6 zusammen**, nicht vorher.

#### TECHNIK-18: Rechtsseiten: kein Querverweis Datenschutz → Impressum, zweite Kopie der Gestaltung
- Art: Verbesserung
- Schwere: niedrig
- Beleg: `datenschutzerklaerung.html`: `grep -c impressum` = 0. Das Impressum verlinkt auf den Datenschutz (`impressum.html:86`), umgekehrt fehlt der Link. Beide laden `./styles.css` **ohne** `?v=` (`impressum.html:17`). Das ist eine andere URL als in der App (`styles.css?v=3.17.29`), also ein zweiter Download von 242 KB (67 KB gz). Beim ersten Besuch ohne Service Worker kann die Datei bis zu 1 h alt sein (`firebase.json:28`). Die Fußzeile ist nur „Adrabic“ bzw. „Stand: …“. **verifiziert**
- Warum es stört: Wer im Datenschutz ist, findet das Impressum nur über die App. Die kleine Stil-Abweichung nach einem Gestaltungs-Update ist möglich, aber harmlos.
- Vorschlag: In beide Fußzeilen `.rechtsfuss`-Links „Impressum · Datenschutz“ (Form nach § 12 „eigene, ruhige Form“). Die `?v=`-Query auf den Rechtsseiten **nicht** einführen: Das ergäbe zwei weitere Versionsstellen je Veröffentlichung, und der Nutzen ist klein.
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: `grep -c 'impressum.html' datenschutzerklaerung.html` ≥ 1, der Link ist im Browser sichtbar.

#### TECHNIK-19: Unnötige Bytes: großes Favicon, ungenutzte Dateien im Vorabspeicher
- Art: Verbesserung
- Schwere: niedrig
- Beleg: `index.html:41` und beide Rechtsseiten verwenden `desktop-icon.png` (512×512, 147 KB) als Tab-Symbol. `sw.js:44,46` speichern `icon.svg` und `flower-isolated.png` vorab, obwohl keine ausgelieferte Seite sie verwendet. grep über `*.html`, `*.js` und `*.css` findet nur Kommentare (`styles.css:74,174`) und `sw.js`. **verifiziert**
- Warum es stört: Jeder erste Besuch lädt ~175 KB, die nichts anzeigen oder in 16 px gezeigt werden. Das fällt klein aus, ist aber vermeidbar.
- Vorschlag: Als Tab-Symbol `icon-192.png` (35 KB) nehmen. `icon.svg` und `flower-isolated.png` aus `APP_SHELL` nehmen, die Dateien selbst bleiben liegen (README/Startbilder brauchen sie womöglich; vorher `grep` in `README.md`).
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: `TECHNIK/t_sw.js` listet beide Dateien nicht mehr im Cache. Das Tab-Symbol ist sichtbar.

#### TECHNIK-20: `app.js`/`styles.css` bestehen zu über 40 % aus Kommentaren
- Art: Verbesserung
- Schwere: niedrig
- Beleg: Gemessen: `app.js` 656 KB, davon 293 KB Kommentare (44,6 %), gzip 214 KB. `styles.css` 242 KB, davon 100 KB Kommentare (41,4 %), gzip 67 KB. `styles.css` blockiert das erste Bild (`index.html:87`). Erste Darstellung im Prüfstand trotzdem schnell: FCP 212–232 ms lokal, 440 ms (4G) bzw. 708 ms (4G + CPU 4×), längste Hauptthread-Blockade 307 ms bei CPU 4× (`TECHNIK/t_leistung.js`). **verifiziert**
- Warum es stört: Beim ersten Besuch über Mobilfunk fällt die Datenmenge ins Gewicht. Gemessen spürbar ist das heute kaum.
- Vorschlag: Nur im GitHub-Workflow vor dem Deploy Kommentare entfernen bzw. minifizieren (z. B. `esbuild --minify` auf Kopien). Das Repo bleibt lesbar, und es gibt keinen Build-Schritt für die Arbeit.
- Entscheidet: Betreiber
- Umsetzung: Sonnet
- Abnahme: Ausgelieferte `app.js` gzip < 150 KB, App startet, `abnahme_runde.js` grün gegen die minifizierte Fassung.
- Pro/Contra: Pro: rund ein Drittel weniger Daten beim ersten Laden (**Vermutung**, gzip komprimiert Kommentare schon gut). Contra: Der `.bat`-Weg würde anders ausliefern als der Knopf. Fehlerberichte nennen Zeilen der minifizierten Datei. Ein zusätzlicher Schritt, der brechen kann, und „kein Build-Schritt“ ist ein bewusster Grundsatz (`CLAUDE.md`). Empfehlung: **lieber nicht**, solange die Messwerte so gut sind. TECHNIK-4/5 bringen mehr für den Start.

#### TECHNIK-21: Installationsdialog ohne Bildschirmfotos und Schnellzugriffe
- Art: Premium
- Schwere: niedrig
- Beleg: `manifest.json` hat weder `screenshots` noch `shortcuts`. Chrome (Android/Desktop) zeigt nur mit `screenshots` den großen Installationsdialog. **verifiziert**
- Warum es stört: Der Installationsdialog wirkt karg, „premium“ wirkt er so nicht.
- Vorschlag: 2–3 Bildschirmfotos (`form_factor: narrow`/`wide`) aus dem Prüfstand und ein Schnellzugriff „Runde starten“. Bei `start_url` gehen Parameter nicht verloren, ein Schnellzugriff braucht aber eine eigene URL und Auswertung in `app.js`.
- Entscheidet: Betreiber
- Umsetzung: Sonnet
- Abnahme: DevTools → Manifest zeigt die Fotos. Chrome Android zeigt den großen Dialog.
- Pro/Contra: Pro: wertiger erster Eindruck, und ein Schnellzugriff spart zwei Tipps. Contra: Die Fotos zeigen Karten, also Lehrstoff. Nach § 1.6 muss der Inhalt vom Betreiber kommen, oder es werden neutrale Texte ohne Arabisch verwendet. Die Fotos müssen bei jeder Gestaltungsänderung neu erzeugt werden, und ein Schnellzugriff ist neuer Code mit URL-Auswertung. Empfehlung: **Fotos später mit Phase 6** (dann gibt es freigegebene Beispielinhalte), Schnellzugriffe lieber nicht.

---

Geprüft ohne Fund:

- **CSP `index.html`:** Hash des Kopfskripts stimmt (`+kgb…`). Mit echter CSP keine Meldung. `connect-src`/`frame-src` passen zu `authDomain` (`app.js:10`) und dem Google-Popup. `font-src 'self'` passt zur eigenen Schrift. Kein `eval`/`new Function`/Worker.
- **Versionsstellen 3.17.29:** `app.js:19`, `sw.js:10`, `index.html:87`, `index.html:165`, `CHANGELOG.md:1`, alle gleich.
- **`APP_SHELL` gegen die tatsächlich gecachten Schlüssel:** alle 12 Einträge mit korrekter Query im Cache (`t_sw.js`). Schrift unter `fonts/` enthalten. `splash/` bewusst nicht (`index.html:55`, richtig: iOS lädt nur eins).
- **Selbstheilung** nur online, Obergrenze 2 (`app.js:12283-12305`). Startwächter 9 s. Offline-Fehlertext mit automatischem Neuladen bei `online`.
- **Fetch-Handler:** nur GET, nur eigene Herkunft und gstatic, nur `res.ok` in den Cache, `no-store` außer bei Navigationen. Rückfall auf `index.html` nur bei Navigationen.
- **Startbilder:** 31 `apple-touch-startup-image`, alle 31 Dateien vorhanden, jede Pixelgröße passt zu `device-width × dpr` bzw. quer. Nur Hochformat auf iPhones (bewusst, die App ist hochkant). Am echten Gerät nicht prüfbar (§ 5.6).
- **Schrift:** `font-display: swap` (`styles.css:3406`), wird nur für `.arabic` angefordert. Umwandeln in woff2 bewusst nicht vorgeschlagen („Datei unverändert lassen“, § 12).
- **Barrierefreiheit (`t_a11y.js` handy/klein/desktop, reduzierte Bewegung, hell):** keine Knöpfe ohne Namen, keine Felder ohne Label, kein `img` ohne `alt`, jede Ansicht mit `h1`, Blätter als Dialog benannt, keine Bewegung trotz „ruhig“. Einziger Fund: Kontrast am Desktop (TECHNIK-6).
- **Fokus:** Karten-, Bereich-, Wahl-Blatt und Abmelde-Rückfrage fangen den Fokus und geben ihn nach Escape an den Öffner zurück (`t_fokus2.js`). Einzige Ausnahme: das Fehler-Modal (TECHNIK-7).
- **Zoom 200 %** (640 px bzw. 320 px CSS-Breite): kein waagerechter Überstand auf Lernen, Fortschritt, Verwalten, Einstellungen. `viewport` ohne `maximum-scale`/`user-scalable=no`, Zoomen ist also erlaubt.
- **`t_kontrast.js` (Handy, beide Themen):** 0 Funde. Zusätzlich iPad hoch in beiden Themen und alle Geräte im dunklen Thema: 0 Funde.
- **Header:** HSTS, `nosniff`, `X-Frame-Options DENY`, `frame-ancestors 'none'`, `Referrer-Policy`, `Permissions-Policy`. `sw.js` `no-cache`, HTML `max-age=0, must-revalidate`, beide Sites gleich.
- **`ignore` in `firebase.json`:** `plan/**`, `**/*.md`, `**/.*` (deckt `.github`, `.firebase`, `.claude` ab). Außer `*.zip` (TECHNIK-9) keine Lücke gefunden.
- **Manifest `id`** `/adrabic/wiederholung/`: bewusst so gelassen (`plan/phase-0-bestand/LOGBUCH.md:193`), nicht angefasst. `start_url`/`scope` passen. `display_override` ist vorhanden. `theme_color`/`background_color` gleich `--ink-900` `#111010`.
- **`index.html` Meta:** `color-scheme dark` nur bis `styles.css` greift, danach setzt `:root[data-thema]` `color-scheme` (`styles.css:289/302`), also kein Fehler. `theme-color` wird vom Kopfskript und von `app.js:1338` nachgezogen.
- **Rechtsseiten:** „← Zurück“ führt auf `./index.html`, dieselbe `.rechtsseite`-Gestaltung, `lang="de"`, `canonical`/`og:url` auf `adrabic.web.app`. Die localStorage-Schlüssel im Code (`adrabic-thema`, `-einstieg-antworten`, `-einstieg-nachklang`, `-hinweise` samt Erinnerungszeit, `-last-backup`, sessionStorage `-selbstheilung`/`-token-erneuert*`) sind alle in Punkt 7 beschrieben. Nur gelöscht werden `adrabic-bewegung`, `adrabic-statistik-aus`, `debugNav`. Nur gelesen wird `lernkarten-app-v1` (Übernahme aus Altversion).
- **Workflow:** läuft nur auf Knopfdruck, `concurrency` verhindert doppelte Deploys, das Fehlen des Secrets wird klar gemeldet. **`.bat`:** bricht bei Git-Fehlern ab, pausiert am Ende.
- **Hauptthread:** eine lange Aufgabe von 307 ms beim ersten Aufbau mit CPU 4×. Keine weitere über 80 ms. Kein Handlungsbedarf.
- **Nicht prüfbar hier:** echter Offline-Start mit Service Worker (Playwright leitet Anfragen des Workers an der Route vorbei; `t_sw.js` zeigte offline die App, aber ohne gecachtes SDK, das Ergebnis ist deshalb nicht belastbar), echter Bildschirmleser, echtes iOS/Android-Installieren.

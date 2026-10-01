# Befunde DATEN – Daten, Regeln, Offline, Mehrgeräte, Kontowechsel, Service Worker, Sicherheit

Prüfer-Kürzel DATEN, Zyklus 2, 01.10.2026. Stand `main` = 3.18.10 (`436dc78`).
Nur gelesen und gemessen, kein Code geändert. Eigene Skripte unter
`scratchpad/audit/DATEN/`. Emulator: eigener Ordner mit Junction auf
`~/.cache/adrabic-regeln-emu/node_modules`, Ports 8187/4487/4587, Regeldatei
`firestore.rules` des Repos unverändert gelesen, Projekt `wiederholung-test`.

Reihenfolge der neuen Funde: mittel (DATEN-1, -3, -4, -5), dann niedrig (DATEN-2, -6, -7, -8).

---

## Bekannte Befunde im aktuellen Code (nicht neu, nur Stand)

- **G-110 – noch offen (kritisch).** `app.js:3365–3371`: `kontoVertipptNeuAnfangen`
  wartet auf `dlgConfirm` und liest **danach** `const nutzer = currentUser`,
  dann `fb.deleteUser(nutzer)`. `doLogout` (`app.js:3431–3447`) ruft nach dem
  Dialog ungeprüft `fb.signOut(auth)`. Der Auth-Reset (`app.js:2281–2285`)
  löst nur noch nicht aufgelöste Dialoge mit `false` auf.
- **G-107 – noch offen.** `ausweisErneuernUndNeuLaden` (`app.js:1977–1979`)
  lädt nach der Token-Antwort ungeprüft neu; `doLogin`/`doGoogleLogin`/
  `doAppleLogin`/`doRegister`/`doReset` (`app.js:3175–3306`, `3398–3421`)
  setzen späte Fehler/Info/Busy ohne Herkunftsprüfung;
  `kontoVertipptNeuAnfangen` → `kontoNeuAnmelden()` erfasst den Kontext erst
  nach der Antwort (`app.js:3381`).
- **G-108 – noch offen.** Auth-Reset `app.js:2259–2329` leert `ui.editId`, aber
  weder `ui.karteSheet` noch `formDraft`, Auswahl, Ideen-Entwurf,
  `ui.kontoLoeschenEmail` oder Erinnerungsblatt (`grep` im Block: kein Treffer).
- **G-109 – noch offen.** `plan/werkzeuge/pruefstand/t_inventar2.js:5` wählt
  weiter `[role="dialog"]:not([aria-hidden="true"])`; das verborgene
  `#errorModal` (`index.html:175`, `aria-hidden` am Elternteil) wird so Wurzel.
- **G-111 – noch offen.** `app.js:2263–2264` nimmt den allgemeinen Merker
  `ui.registrierungZeitlimit` und `ui.authEingabe.name`, ohne Bindung an die
  angeforderte Adresse; `app.js:2347–2352` ruft `sendEmailVerification`/
  `updateProfile` für das gerade gemeldete Konto.

## Runde-15-Arbeitsstand (Zweig `runde15`, `4462fac`, und Patch) – was übertragbar ist

Gelesen: `git show 4462fac -- app.js sw.js`, `plan/grossplan/runde15-unfertig.patch`
(Zeilen 48–404) und Diff beider (`scratchpad/audit/DATEN/patch_app.txt` vs.
`commit_app.txt`).

- Der Zweig ist die **neuere** Fassung: Er enthält den Patch (auf 3.17.56)
  plus drei Korrekturen der Claude-Gegenprüfung (F1 Übernahme des Auftrags in
  `doRegister`, F2 `auftrag.loescht` nur während `deleteUser`, F3 Leeren von
  `kontoLoeschenEmail` und Erinnerungsblatt). Übertragen wird **der Zweig,
  nicht der Patch**.
- Inhalt: `ui.authAuftrag` mit `authAuftragStarten`/`authAuftragGilt`/
  `registrierungGilt`; Konto vor dem Dialog erfassen in
  `kontoVertipptNeuAnfangen` und `doLogout` (G-110); Bindung in `doLogin`,
  `doGoogleLogin`, `doAppleLogin`, `doRegister`, `doReset`,
  `ausweisErneuernUndNeuLaden` (G-107); Auth-Reset leert ~35 UI-/Entwurfs-
  Zustände inkl. `resetFormDraft()`, `ui.karteSheet`, Auswahl, Ideen-Entwurf,
  Schreibfläche (G-108); Nachtrag nur für den eigenen Auftrag (G-111);
  `t_inventar2.js` nur sichtbare Wurzeln (G-109).
- **Übertragbarkeit: gut.** `git diff 2206666 HEAD -- app.js` (3.18.2 → 3.18.10)
  hat **keinen** Abschnitt im Auth-Bereich (onAuthStateChanged, `doLogin` …
  `doLogout`, Kontolöschen); die Änderungen liegen in Verlauf, `ui`, Lernen,
  Texten, Render. Der Zweig-Diff lässt sich also fast mechanisch übertragen
  (nur Zeilenversatz ~+60). Neu in `ui` seit 3.18.2 sind `textLernen` und
  `kreisHeute`; die Texte-Zustände `ui.textAnlegen`, `ui.zeileEdit`,
  `ui.textLernen` tragen eine `uid` und werden beim Zeichnen verworfen
  (`app.js:12263`, `12891–12893`) – sie brauchen keinen Eintrag im Reset,
  gehören aber in die G-108-Abnahme (A-Text darf nicht in B gespeichert
  werden). `authEingabeNameNachtrag` ist im Zweig entfernt, in `main` noch da
  – nur zusammen übernehmen. Vor dem Übertragen die 77er-/106er-Prüffolge des
  Zweigs auf den neuen Stand neu laufen lassen (die dortige Abnahme lief auf
  3.18.1 und ist für 3.18.10 kein Beleg).
- **Nummernkonflikt (Dokumentation, wichtig für Paket A):** Der Zweig führt
  in seinem `AUFGABEN.md` G-112, G-116, G-118–G-130 (z. B. G-118 =
  Probekarte leuchtet nicht, G-119 = Mitscrollen im Plan-Aufbau, G-123 =
  Lehrer-Freigabe hängt, G-126 = volles render mitten in der Runde, G-127/
  G-128 = Verlauf-Reset). `main` vergibt G-118 (Verwalten-Scroll) und G-119
  (Verwalten-Tempo) **anders**. Die Zweig-Funde G-112, G-116, G-120–G-130
  stehen nirgends in `main` – sie gehen beim Übertragen sonst verloren.
  Stichproben am aktuellen Code: G-112 (Zweig) noch da – `openDialog`
  (`app.js:14100–14108`) überschreibt `ui.dialog`, ohne den vorigen Aufrufer
  aufzulösen; G-123 (Zweig) noch da – `lehrerFreigeben` (`app.js:4415–4438`)
  setzt `b.teilFreigabe` nur nach Erfolg innerhalb von 12 s, kein Abgleich mit
  dem Server, Regel verlangt `offenBis >` (`firestore.rules:360`); G-126
  (Zweig) noch da – `app.js:2386` kehrt beim eigenen Echo zurück, bevor
  `letzterNutzerKopf` (`app.js:2387–2389`) nachgezogen wird.
  Vorschlag: beim Übertragen neue Nummern ab G-131 vergeben und die Zweig-
  Liste in `main/plan/grossplan/AUFGABEN.md` bzw. `zyklus-2/AUFGABEN.md`
  übernehmen.

---

## Neue Funde

#### DATEN-1: Ideen-Board – ein Konto kann jede Idee beliebig hochzählen oder fremde auf 0 drehen (G-014-Schutz lässt sich in zwei Schritten umgehen)
- Art: Fehler
- Schwere: mittel
- Beleg: `firestore.rules:483–490` – `votes/{uid}` darf **allein** angelegt
  (`create: … request.resource.data.size() == 0 && exists(feedback/$(id))`) und
  **allein** gelöscht werden (`delete: … request.auth.uid == uid`). Die
  Zähler-Regel `firestore.rules:469–475` bindet nur den Zähler an den Merker,
  nicht umgekehrt. **Verifiziert im Emulator**
  (`scratchpad/audit/DATEN/emu/stimmen-probe.mjs`, unveränderte Regeldatei):
  V1 – Konto A stimmt 5× ab und löscht dazwischen nur den Merker: alle 10
  Schritte ERLAUBT, `votes = 5` aus einem Konto. V2 – fremdes Konto legt nur
  den Merker an, dann Stapel „Merker löschen + votes −1“: 6 Schritte ERLAUBT,
  `votes` 3 → 0, ohne je +1 gegeben zu haben. Gegenprobe V3 (Zähler allein)
  weiterhin abgelehnt. Der vorhandene Regeltest prüft nur Paare (F03, F05, E11,
  E12, P1–P4; `regeln-pruefung.mjs:332–469`) und `M14` erlaubt das Merker-
  Löschen allein ausdrücklich. Die Datenschutzerklärung Punkt 6 begründet
  den Stimm-Merker mit „damit niemand doppelt abstimmt“ – das hält die Regel
  nicht.
- Warum es stört: Genau das „Sabotieren“, das G-014 schließen sollte
  (LEHREN § 8.1b), geht weiter – mit einem Konto und ein paar Zeilen in den
  Entwicklerwerkzeugen. Der Betreiber entscheidet nach der Stimmenzahl.
- Vorschlag: In `firestore.rules` den Merker an den Zähler binden:
  `create` nur, wenn `getAfter(/feedback/$(id)).data.votes == get(/feedback/$(id)).data.votes + 1`;
  `delete` nur, wenn die Idee nicht (mehr) existiert **oder**
  `getAfter(…).data.votes == get(…).data.votes - 1`. Dafür muss das
  Konto-Löschen (`kontoDatenLoeschen`, `app.js:3521–3531`) Merker und `votes −1`
  im selben Stapel schreiben (nur bei Ideen, unter denen der eigene Merker
  existiert; `entfernt` eingeschlossen). Datenschutzerklärung prüfen: Sie sagt
  sinngemäß „Stimmenzahl bleibt“ (Kommentar `app.js:3515–3517`) – nach dem
  Fix sinkt sie beim Löschen um die eigene Stimme. Emulator-Fälle für V1/V2
  in `regeln-pruefung.mjs` aufnehmen (müssen rot werden), M14 anpassen.
- Entscheidet: Agent (Regel + App + Test), Konsole (Regel-Deploy durch den Betreiber)
- Aufwand: mittel
- Abnahme: `stimmen-probe.mjs` gegen die neue Regel: V1 endet bei `votes = 1`,
  V2 bei `votes = 3` (alle Umgehungsschritte abgelehnt); P1/P4/M13/M14-neu und
  Konto-Löschen im Emulator grün; `bash plan/werkzeuge/regeln_testen.sh` alle grün.

#### DATEN-3: Nach einem abgebrochenen Update startet die App offline nicht mehr – sie bleibt für immer auf „Adrabic startet“
- Art: Fehler
- Schwere: mittel
- Beleg: `sw.js:190–197` – jede Navigation legt die frische Netz-Antwort im
  Hintergrund mit `cache.put(req, copy)` in den Cache des **gerade laufenden,
  alten** Workers (`CACHE_NAME` alt); `sw.js:208–211` liefert die Seite danach
  zuerst aus diesem Cache (seit 3.17.55). Die neue `index.html` zeigt aber auf
  `app.js?v=NEU`, das nur die Installation des **neuen** Workers ablegt
  (`sw.js:85`, `addAll(KERN)`). Scheitert diese Installation (Netzabriss,
  App nach Sekunden geschlossen – iOS beendet den Worker), bleibt der alte
  Worker aktiv mit einer `index.html`, deren `app.js` er nicht hat
  (`isUnveraenderlich` → `caches.match` leer → Netz, `sw.js:147–159`).
  `index.html:218` hat keinen Ersatz, Start-Wächter und „Start fehlgeschlagen“
  stehen selbst in `app.js` (`app.js:15206–15224`) und laufen dann nie.
  Das hebelt die Absicht von G-068 aus (Kommentar `sw.js:71–80`).
  **Verifiziert** mit `scratchpad/audit/DATEN/swprobe.cjs` (eigener Server,
  Kopie der Dateien, Firebase-Schlüssel durch Platzhalter ersetzt, Chrome):
  Durchgang „normal“ (Update gelingt): offline `app.js?v=9.9.9` aus dem Cache,
  App läuft. Durchgang „abbruch“ (`app.js?v=9.9.9` antwortet beim Update mit
  503): danach liegt im Cache `adrabic-3.18.10` unter `/index.html` die Seite
  mit `app.js?v=9.9.9`, gespeichert ist nur `app.js?v=3.18.10`; offline:
  `FEHLER app.js?v=9.9.9 net::ERR_FAILED`, `#app` zeigt nach 4 s nur „Adrabic
  startet“. Nebenbei bleibt ein leerer Cache `adrabic-9.9.9` liegen.
  Abgrenzung: Dasselbe Endbild meldete TECHNIK-11 (G-068, erledigt 3.17.36)
  über einen anderen Weg; dessen Abnahme („alter Worker und alter Cache
  bleiben“) ist hier weiterhin erfüllt – genau deshalb fällt der neue Weg
  aus 3.17.55 (Hintergrund-`put` der Seite in den alten Cache) dort nicht auf.
- Warum es stört: Wer die installierte App nach einer Veröffentlichung kurz
  online öffnet und schließt und sie dann in der U-Bahn/im Flugmodus öffnet,
  sieht nur das Logo – ohne Hinweis, ohne Knopf. Seine Daten sind da, er
  kommt nicht ran. Online heilt es sich beim nächsten Start.
- Vorschlag: In `sw.js` die Navigation nur dann im Hintergrund in den Cache
  legen, wenn die neue Seite zur Version des laufenden Workers passt
  (`(await copy.clone().text()).includes("app.js?v=" + VERSION)`), sonst
  verwerfen – eine neue Version bringt ihre `index.html` ohnehin mit der
  Installation des neuen Workers (`KERN` enthält `./` und `./index.html`).
  So bleiben reine Header-/CSP-Änderungen ohne Versionswechsel weiter
  „beim zweiten Start“ sichtbar (Begründung 3.17.55). Zusätzlich erwägen: ein
  kleiner Wächter in `index.html` (`<script type="module" onerror=…>` bzw.
  Zeitgeber), der bei fehlendem `app.js` „Start fehlgeschlagen – Neu laden“
  zeigt (dann CSP-Hash nachziehen, `pruefe_stand.mjs`).
- Entscheidet: Agent
- Aufwand: klein (sw.js), mittel mit Wächter in index.html
- Abnahme: `swprobe.cjs` Durchgang „abbruch“: offline lädt `app.js?v=3.18.10`
  (alter Stand) und die App läuft; Durchgang „normal“ unverändert;
  `t_sw.js` und `t_boot_geometrie.js` grün; iPhone-Start (3.17.55, weißer
  Schleier) am Gerät nicht verschlechtert.

#### DATEN-4: Nach „Einwilligung widerrufen“ holt „Sicherung einspielen“ alle Texte ohne Einwilligung zurück in die Cloud
- Art: Fehler
- Schwere: mittel
- Beleg: `texteWiderrufen` (`app.js:11960–11976`) lädt vor dem Löschen eine
  Sicherung herunter (`exportBackup(false)`), die `bereiche` samt `zeilen`
  und `texte` enthält (`app.js:4191–4195`). `verarbeiteImportDaten`
  (`app.js:4792–4928`) übernimmt `b.zeilen`/`b.texte` aus jeder Datei
  (`app.js:4888`, `4897–4905`, `4918–4919`) und schreibt sie per
  `patchDoc` – ohne `texteEinwilligung` oder `texteFreigeschaltet()` zu
  prüfen (`grep` im Bereich: kein Treffer). Angelegt werden Texte sonst nur
  nach `texteEinwilligungHolen()` (`app.js:11735–11753`, `11761`). Weitere
  Wege derselben Art (Vermutung, nicht gemessen): eine Sicherung des
  Betreiber-Kontos in einem anderen Konto einspielen (dort sind Texte
  unsichtbar, weil `texteFreigeschaltet()` aus ist, liegen aber in der
  Cloud); ein manipulierter geteilter Datensatz mit Karten, die `textId`
  tragen, und einer Speicherkarte `art: "text"` – `bereichAufteilen`
  (`app.js:741–746`) macht daraus Texte. Verifiziert durch Lesen der Pfade.
- Warum es stört: Die Datenschutzerklärung Punkt 5 sagt: Texte erst nach
  ausdrücklicher Einwilligung (Art. 9 DSGVO), Widerruf löscht sie. Ein
  naheliegender Ablauf („widerrufen, später Sicherung einspielen, um Karten
  zurückzuholen“) speichert dieselben Glaubens-Daten wieder, mit
  `texteEinwilligung: null`.
- Vorschlag: In `verarbeiteImportDaten` vor dem Schreiben: hat die Datei
  Texte und ist `texteEinwilligung` leer, dann (a) bei `texteFreigeschaltet()`
  zuerst `texteEinwilligungHolen()` fragen, bei Ablehnung `zeilen`/`texte`
  verwerfen und das im Ergebnis-Dialog sagen; (b) sonst Texte immer
  verwerfen. Dasselbe für `codeEinloesen`: Zeilen/Texte aus einem geteilten
  Satz grundsätzlich verwerfen („Texte lassen sich nicht teilen“, DSE Punkt 5).
- Entscheidet: Agent (setzt ein bestehendes Versprechen der DSE um; Wortlaut
  des Hinweises mit B9 abstimmen)
- Aufwand: klein
- Abnahme: Prüfstand: Konto mit Texten → widerrufen → Sicherung einspielen
  ohne neue Einwilligung → keine `karten`-Dokumente mit `textId` und kein
  `sets.*` mit `art: "text"` im Store; mit Einwilligung → Texte da. Konto
  ohne Freischaltung: Datei mit Texten → nur Karten eingespielt.

#### DATEN-5: Funde aus dem Zweig `runde15` stehen nicht in `main`, und ihre Nummern kollidieren (G-118, G-119)
- Art: Aufräumen
- Schwere: mittel
- Beleg: `git -C C:\Users\USER\Wiederholung-r15 show HEAD:plan/grossplan/AUFGABEN.md`,
  Zeilen 148–163: G-112, G-116, G-118–G-130 (Zweig). `main`
  `plan/grossplan/AUFGABEN.md:149–150` vergibt G-118 (Verwalten-Scroll) und
  G-119 (Verwalten-Tempo) anders; G-112, G-116, G-120–G-130 fehlen in `main`
  ganz (`grep` ohne Treffer). Drei davon am aktuellen Code nachgelesen und
  noch vorhanden: Zweig-G-112 (`app.js:14100–14108`, neuer Dialog ersetzt den
  alten, dessen Aufrufer wartet für immer – trifft z. B. `saveFehler` →
  `dlgAlert` über einer offenen Rückfrage), Zweig-G-123 (`app.js:4415–4438`
  und `firestore.rules:360`: nach Zeitlimit hat der Server N, die App N−1,
  jedes weitere „Freigeben“ wird dauerhaft abgelehnt – Sackgasse für
  Lehrer:innen), Zweig-G-126 (`app.js:2386–2389`, volles `render()` mitten in
  der Runde nach Server-Bestätigung). Verifiziert durch Lesen; die übrigen
  (G-116, G-124, G-127, G-128, G-130) nicht einzeln nachgeprüft.
- Warum es stört: Der Zweig liegt nur auf dem Laptop. Wird nur „G-107–G-111“
  übertragen, gehen rund zwölf belegte Funde verloren, darunter eine echte
  Sackgasse (Lehrer-Freigabe). Zwei Listen mit derselben Nummer für
  Verschiedenes führen zu falschen „erledigt“-Einträgen.
- Vorschlag: Vor Paket A die Zweig-Liste nach `plan/zyklus-2/AUFGABEN.md`
  übernehmen, mit neuen Nummern (ab G-131 oder eigenes Präfix), je Zeile mit
  „im Stand 3.18.10 noch vorhanden: ja/nein“. Zweig-G-112 und -G-123 gehören
  inhaltlich zu Paket A (Daten sicher).
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Jede Zeile G-112, G-116, G-118–G-130 des Zweigs hat in `main`
  genau einen Eintrag mit eindeutiger Nummer; `grep -c "G-118"` zeigt in
  `main` nur noch eine Bedeutung.

#### DATEN-2: Fehlermeldung „Die App versucht es weiter, sobald die Verbindung steht“ ist bei echten Ablehnungen falsch und widerspricht dem Banner
- Art: Fehler
- Schwere: niedrig
- Beleg: `app.js:2503` – `dlgAlert("… " + schreibFehlerText(…) + ". Die App versucht es weiter, sobald die Verbindung steht.")`.
  Laut Kommentar `app.js:2481–2483` landen hier „nur echte Ablehnungen“
  (Offline ist kein Fehler); Firestore wiederholt Ablehnungen nie (LEHREN § 8.2,
  § 13). Nachgeholt werden nur Bewertungen und Tagesprotokoll, und nur einmal
  nach Ausweis-Erneuerung (`abgelehntesNachholen`, `app.js:2813–2818`). Der
  Banner sagt gleichzeitig „Lade ein Backup herunter, bevor du weiterlernst“
  (`app.js:8433–8435`). Verifiziert durch Lesen der Pfade.
- Warum es stört: Nach einer Ablehnung (z. B. Regel fehlt, Karte auf anderem
  Gerät gelöscht → `not-found` in `persistCardGrade`) wartet man auf etwas, das
  nie passiert; Dialog und Banner sagen Gegensätzliches (LEHREN § 7.2).
- Vorschlag: Satz in `saveFehler` an den Banner angleichen („… ist nicht
  gespeichert. Lade ein Backup herunter, bevor du weiterlernst.“) oder je Code
  unterscheiden; Wortlaut mit B9 (Texte) abstimmen.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `grep -n "versucht es weiter" app.js` leer; Prüfstand `__FB.fail`
  mit `permission-denied` zweimal → Dialog und Banner sagen dasselbe.

#### DATEN-6: „Idee einreichen“ hat weder Zeitlimit noch Offline-Sperre – der Knopf kann endlos drehen
- Art: Fehler
- Schwere: niedrig
- Beleg: `app.js:9854–9857` – `feedbackEinreichtWird = true; … await fb.addDoc(…)`
  ohne `mitZeitlimit`; der Knopf `app.js:9634–9635` wird nur über
  `feedbackEinreichtWird` gesperrt, nicht bei `offline` (anders als „Code
  erzeugen“, `offlineAttr`, `app.js:9429`). Mit dauerhaftem Offline-Speicher
  (`app.js:2233`) löst ein Schreibvorgang erst nach der Server-Bestätigung
  auf (so auch der Kommentar `app.js:3542–3546`). **Vermutung** zur
  sichtbaren Wirkung: nicht mit echtem SDK gemessen, die Attrappe bestätigt
  sofort.
- Warum es stört: Offline oder bei hängendem Netz dreht „Einreichen“ ohne
  Ende; die Idee geht später still raus (LEHREN § 6.7: jedes Warten hat ein
  Zeitlimit).
- Vorschlag: Knopf offline sperren wie die Teilen-Knöpfe und `addDoc` in
  `mitZeitlimit` legen; bei Zeitlimit Entwurf behalten und Meldung in Worten.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Prüfstand mit hängendem `addDoc`: nach 12 s ist der Knopf wieder
  bedienbar, Entwurf noch da; offline ist der Knopf gesperrt mit Hinweis.

#### DATEN-7: Einstellungen gehen als ganzes Objekt in die Cloud – ein Gerät, das offline war, überschreibt die Wahl eines anderen
- Art: Fehler
- Schwere: niedrig
- Beleg: `app.js:2893–2896` – `schreibeInsNutzerdokument({ settings: settings })`
  schreibt immer alle vier Felder (`normSettings`, `app.js:1195–1200`).
  Serie und Tagesprotokoll schreiben dagegen gezielt (`persistStreak`,
  `app.js:2885–2892`; `persistVerlauf`). Der Regelkommentar
  `firestore.rules:117–119` setzt das Ganz-Schreiben sogar voraus.
  Verifiziert durch Lesen; nicht mit zwei Geräten gemessen.
- Warum es stört: Handy stellt auf „Hell“, das iPad (offline, alter Stand)
  ändert die Rundengröße – beim Hochladen ist das Handy wieder „Dunkel“,
  und `lastBackup` springt auf den alten Wert zurück.
- Vorschlag: Nur das geänderte Feld schreiben (`"settings.thema": …`). Dabei
  beachten: `settingsOk` prüft mit `hasOnly` die ganze Map – liegt in einem
  alten Konto noch ein fremdes Teilfeld, lehnt die Regel dann jedes
  Einzelfeld-Schreiben ab. Also erst im Emulator mit einem Altfeld prüfen
  oder bei `permission-denied` einmal ganz schreiben.
- Entscheidet: Agent
- Aufwand: klein (mit Emulator-Fall mittel)
- Abnahme: Emulator/SDK-Test wie `t_verlauf_mehrgeraete.js`: Gerät A ändert
  `thema`, Gerät B offline `sitzungsLimit` → nach Abgleich beide Werte da.

#### DATEN-8: Offline zeigt „Impressum“/„Datenschutz“ die App statt der Seite; online immer die Fassung vom letzten Besuch
- Art: Fehler
- Schwere: niedrig
- Beleg: `sw.js:225–228` – jede fehlgeschlagene Navigation fällt auf
  `./index.html` zurück; die Rechtsseiten stehen nicht in `ZUSATZ`
  (`sw.js:50–58`). `sw.js:208–211` liefert eine einmal besuchte Seite immer
  zuerst aus dem Cache, die neue kommt erst beim Aufruf danach. Aus dem Code
  gelesen, **nicht gemessen**.
- Warum es stört: Offline tippt man auf „Datenschutz“ und landet wieder im
  Startbildschirm der App (unter der Adresse der Rechtsseite). Eine
  geänderte Datenschutzerklärung sieht ein wiederkehrender Besucher erst
  beim zweiten Öffnen.
- Vorschlag: `impressum.html` und `datenschutzerklaerung.html` in `ZUSATZ`
  aufnehmen; Rückfall auf `index.html` nur für `./` und `./index.html`; für
  die Rechtsseiten „Netz zuerst“ (wie vor 3.17.55), weil dort kein
  iOS-Startbild im Spiel ist.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `t_sw.js` erweitert: offline `impressum.html` → Inhalt enthält
  „Impressum“; nach Änderung der Datei zeigt der erste Online-Aufruf die neue.

---

## Geprüft ohne Fund

- **Einstellungen:** `normSettings` (`app.js:1184–1201`) liefert genau die vier
  Felder aus `settingsOk` (`firestore.rules:120–129`).
- **Nutzerdokument:** geschrieben werden `name`, `streak` (neun Schlüssel,
  Grenze 20), `settings`, `schemaVersion`, `verlauf`, `verlaufEpoche`,
  `texteEinwilligung` – alle in `nutzerFelder()`; `bereiche` nur löschbar.
- **Bereich:** `bereichFelder` (`app.js:856–886`) samt `normRegler` und
  Lehrer-/Teilen-Feldern deckt sich mit `bereichFelder()`/`bereichWerte` der
  Regeln (Faktor 0,5–1, Ergebnisse `[01]{0,50}`).
- **Karte/Textzeile:** `kartenFelder` (`app.js:823–837`) gegen `kartenWerte`
  (1000/1500 Zeichen, `textId` nur bei Zeilen, Stufe ≤ 12).
- **Tagesprotokoll:** atomare `increment` mit Epoche, Reset mit neuer Kennung,
  Ablehnungspfad liest erst den Server (`app.js:1028–1109`,
  `firestore.rules:150–154`).
- **Ideen-Board anlegen/moderieren:** Felder und `serverTimestamp` passen zur
  Regel; Rückmeldungen sind an das Konto gebunden (`app.js:9834–9960`).
- **Geteilte Sätze:** kein freies Auflisten, Überschreiben fremder Codes
  abgelehnt (E20), Freigabe nur aufwärts; `teileLektionCode` schreibt erst
  nach Erfolg an den Bereich.
- **Konto löschen, alle Orte:** Neu-Anmeldung zuerst, dann geteilte Sätze
  (über `teilCode` und Abfrage nach `ownerUid`), Stimm-Merker seitenweise,
  Bereiche, Karten samt Textzeilen, Nutzerdokument, zuletzt Auth; jeder
  Schritt an `kontoLoeschKontext` gebunden (`app.js:3467–3541`, `3640–3690`).
- **Schreibwege und Kontowechsel:** `patchDoc`, `persistAll`,
  `persistCardGrade`, `schreibeInsNutzerdokument`, Import, Code einlösen,
  Teilen, Board prüfen nach jedem `await` das Ursprungskonto.
- **Texte:** Entwürfe und laufendes Lernen tragen die `uid`
  (`app.js:12263`, `12891–12893`).
- **CSP, Hashes, `APP_SHELL`, Versionen:** `node plan/werkzeuge/pruefe_stand.mjs`
  → „Alles in Ordnung“ (alle drei HTML-Seiten, zwei Hashes, drei
  modulepreload-Links). Fremde Quellen nur gstatic/Google-Anmeldung.
- **`localStorage`:** fünf Schlüssel in Benutzung (`adrabic-thema`,
  `-last-backup`, `-hinweise`, `-einstieg-antworten`, `-einstieg-nachklang`),
  alle in Datenschutz Punkt 7; `sessionStorage` dort allgemein genannt.
  Randnotiz: der Altschlüssel `lernkarten-app-v1` (`app.js:1873`) wird nur
  gelesen, nie gelöscht.
- **Service Worker Normalfall:** Update gelingt → offline startet die neue
  Version aus dem Cache (`swprobe.cjs`, Durchgang „normal“).
- **Schon bekannt, weiter offen:** E-03 (Offline-Kopie der Lerndaten im
  Gerätespeicher fehlt in der Datenschutzerklärung), E-06 (offene App erfährt
  nichts von neuer Version), G-059 (COOP-Header).

## Nicht mehr geprüft

- Voller Regeltest (`bash plan/werkzeuge/regeln_testen.sh`, 204 Fälle) – nur
  die eigene Stimmen-Probe lief; Java und Emulator sind auf dem Laptop
  startbar.
- Mehrgeräte und Offline mit echtem SDK (nur Code gelesen).
- Zweig-Funde G-116, G-124, G-127, G-128, G-130 am aktuellen Code.
- Schlüssel von `baueWeitergabeBereich` einzeln gegen die Regel, Ganzzahl bei
  `order` nach Ziehen/Sortieren, Umzug (Schema 1 → 2), Lehrer-Stand-Abfrage.
- Laden des Quran-Texts (Zeitlimit, Fehlerpfad), übrige Fehler-/Zeitlimit-
  Pfade außerhalb von Anmeldung, Board und Teilen.
- DATEN-6 und DATEN-8 im Browser; echtes iPhone.

Emulator-Prozesse beendet (kein `java.exe`, Ports 8187/4487/4587/8188 frei).

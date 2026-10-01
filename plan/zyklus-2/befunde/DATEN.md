# Befunde DATEN – Daten, Regeln, Offline, Mehrgeräte, Kontowechsel, Service Worker, Sicherheit

Prüfer-Kürzel DATEN, Zyklus 2, 01.10.2026. Stand `main` = 3.18.10 (`436dc78`).
Nur gelesen und gemessen, kein Code geändert. Eigene Skripte unter
`scratchpad/audit/DATEN/`. Emulator: eigener Ordner mit Junction auf
`~/.cache/adrabic-regeln-emu/node_modules`, Ports 8187/4487/4587, Regeldatei
`firestore.rules` des Repos unverändert gelesen, Projekt `wiederholung-test`.

*(Datei wird laufend ergänzt; Reihenfolge nach Schwere am Ende.)*

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

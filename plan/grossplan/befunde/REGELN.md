# REGELN – firestore.rules, Datenmodell, Sicherheit (Großprüfung 25.09.2026)

Stand geprüft: `app.js` 3.17.29, `firestore.rules` wie im Repo, `firebase.json`, `datenschutzerklaerung.html` (Stand 24.09.2026).

**Emulator lief.** Gestartet mit firebase-tools (neueste Version aus npm) und Firestore-Emulator v1.22.0 (Download über den Proxy hat geklappt). Java 21 (`/usr/bin/java`). Alles liegt im Scratchpad unter `audit/REGELN/emu/`, im Repo wurde nichts installiert.
- `plan/phase-1-datenzugriff/regeln-pruefung.mjs` gegen die aktuellen Regeln: **132 von 132 wie erwartet**.
- Eigene Zusatzfälle stehen in `audit/REGELN/extra.mjs`. Ergebnis gegen die Regeln im Repo: `audit/REGELN/aus-ist.txt`. Ergebnis gegen einen Regelvorschlag: `audit/REGELN/aus-vorschlag.txt`, der Vorschlag selbst in `audit/REGELN/rules-vorschlag.rules`.
- Prüfstand-Test: `audit/REGELN/t_notfound.js`.

---

#### REGELN-1: Ein „nicht gefunden“ beim Speichern löscht Lehrer-Bindung, Teil-Code und „geführt“ in ALLEN Bereichen und holt gelöschte Bereiche zurück
- Art: Fehler
- Schwere: hoch
- Beleg:
  - `app.js:2202`: `if (e && e.code === "not-found") { if (kontoWirdGeloescht) return; persistAll(); return; }`.
  - `app.js:2234`: `persistAll()` schreibt jeden Bereich mit `stapel.set(o.ref, o.daten)` **ohne merge**. Die Daten sind nur `{ name, order, sets }`, also fehlen `gefuehrt`, `satzId`, `satzVersion`, `teilCode`, `teilFreigabe`, `lehrerCode` und `lehrerOffenBis`.
  - Derselbe Zuschnitt steht beim Umzug in `app.js:6592` (dort unkritisch, weil es Altdaten sind).
  - **Verifiziert im Prüfstand** (`audit/REGELN/t_notfound.js`): Ein anderes Gerät löscht Bereich b1, danach benennt dieses Gerät b1 um. Messung:
    - vorher b2 `{"gefuehrt":false,"satzId":"quran-1","satzVersion":3,"teilCode":"KLMNP-QRSTU","teilFreigabe":2}`, nachher b2 `{"name":"Quran-Wörter","order":1}`;
    - vorher b3 `{"gefuehrt":true,…,"lehrerCode":"ABCDE-FGHJK","lehrerOffenBis":2}`, nachher b3 `{"name":"Lehrer-Satz","order":2}`;
    - der gelöschte b1 ist wieder da.
  - Ausgelöst wird das von jedem `update` in `patchDoc` auf ein Dokument, das es nicht mehr gibt. Beispiele: Umbenennen, Speicherkarten, `lehrerOffenBis`, Teilen beenden. Realistisch ist das bei zwei Geräten oder bei einer Offline-Warteschlange. Wie oft das vorkommt, ist Vermutung. Phase 5 (`plan/phase-5-recht/LOGBUCH.md:516`) hatte es nur als ungeprüfte Möglichkeit vermerkt. Neu ist jetzt der Nachweis und der größere Schaden (Teil- und Lehrer-Felder gab es damals noch nicht).
- Warum es stört:
  - Ein geführter Satz wird still frei bearbeitbar.
  - Die Lehrer-Freigaben sind weg.
  - Ein geteilter Code verwaist: Man kann ihn in der App nicht mehr beenden, und „Konto löschen“ findet ihn nicht mehr (REGELN-3).
  - Was auf dem anderen Gerät gelöscht wurde, kommt zurück.
- Vorschlag:
  - In `patchDoc` bei `not-found` nur dann `persistAll()` aufrufen, wenn das **Nutzerdokument** fehlt (dafür war der Weg gedacht: frisches Konto). Das lässt sich mit einem `getDoc(userDocRef)` prüfen. Sonst die Vorgänge auf fehlende Dokumente verwerfen, den Rest neu schreiben und `saveFehler` melden.
  - Zusätzlich in `persistAll()` die Bereichsdaten aus `bereichFelder()` ohne `karten` nehmen (wie `patchDoc` es tut). Dann nimmt ein Vollschreiben nie Felder weg.
  - Prüfstand-Test aus `t_notfound.js` übernehmen.
- Entscheidet: Agent
- Umsetzung: Opus
- Abnahme: `t_notfound.js` zeigt nachher b2/b3 mit allen Feldern, b1 kommt nicht zurück. Dazu `t_daten.js`, `t_loeschen_teilen.js` und `abnahme_runde.js` grün.

#### REGELN-2: Stimmen im Feedback-Board lassen sich beliebig hoch- und auf 0 herunterdrehen, obwohl die Regeln das billig verhindern könnten
- Art: Fehler
- Schwere: mittel
- Beleg:
  - `firestore.rules:395-397` prüft nur „votes ±1“, nicht, ob die eigene Stimme dazu existiert.
  - Emulator (`aus-ist.txt`):
    - 5× `votes+1` ohne Stimm-Dokument ergibt `votes = 5`;
    - ein **fremdes** Konto macht 10× `votes-1`, ohne je abgestimmt zu haben: `votes = 0` (E11);
    - verifiziert.
  - Der Kommentar `firestore.rules:354-358` nimmt nur das **Aufblähen** in Kauf und nennt die Bindung „ohne echten Sicherheitsgewinn“. Das **Sabotieren** fremder Ideen hat er nicht betrachtet.
  - Die Bindung braucht keine Cloud Function. Mit `exists()`/`existsAfter()` auf `feedback/{id}/votes/{auth.uid}` im Stapel ist sie **verifiziert** (`rules-vorschlag.rules`, `aus-vorschlag.txt`):
    - P1 (richtig abstimmen) und P4 (richtig zurückziehen) sind erlaubt;
    - P2, P3 und E11 (ohne eigene Stimme) werden abgelehnt;
    - die Fälle F01–F26 bleiben unberührt (dieselben Stapel wie in der App).
  - Kosten: 2 Dokument-Lesungen je Stimme.
- Warum es stört:
  - Wer die Entwicklerwerkzeuge öffnet, kann die Reihenfolge des Boards bestimmen und die Ideen anderer auf 0 setzen.
  - Die Datenschutzerklärung Punkt 6 sagt „damit niemand doppelt abstimmt“. Das stimmt heute nur für die Oberfläche.
- Vorschlag:
  - In `firestore.rules` den `votes`-Zweig ersetzen, wie in `rules-vorschlag.rules` (Zeilen um 396–401).
  - Den Kommentar 337–358 berichtigen.
  - In `regeln-pruefung.mjs` die Fälle P1–P4 und E11 aufnehmen.
  - Mehrere Wegwerf-Konten bleiben möglich (eine Stimme je Konto). Das ist ehrlich so dazuzuschreiben.
- Entscheidet: Agent (Regel), danach Konsole (Betreiber deployt die Regeln)
- Umsetzung: Opus
- Abnahme: Emulator mit `extra.mjs`, E11/P2/P3 „ABGELEHNT“, P1/P4 „ERLAUBT“, `regeln-pruefung.mjs` weiter 132/132.

#### REGELN-3: Geteilte Kartensätze können verwaisen und überleben dann auch „Konto löschen“
- Art: Fehler
- Schwere: hoch
- Beleg:
  - `app.js:3631-3637` (`beendeTeilenCode`): Zuerst entfernt `patchDoc` den `teilCode` am Bereich. Erst danach kommt `try { await fb.deleteDoc(...) } catch (e) {}`, der Fehler wird still geschluckt.
  - `app.js:4189` (`bereichEntfernen`): `geteiltLoeschen(b.teilCode).catch(() => {})`, ebenfalls still.
  - Dazu REGELN-1, das `teilCode` ganz entfernt.
  - `kontoDatenLoeschen` (`app.js:2770-2773`) findet Codes **nur** über `teilCode` in den eigenen Bereichen.
  - Die Regeln erlauben keine Abfrage nach dem Besitzer. Emulator E19: `where("ownerUid","==",eigeneUid)` wird **abgelehnt**, verifiziert. Ein verwaister Satz ist also für niemanden mehr auffindbar, bleibt aber für jeden mit dem Code lesbar.
- Warum es stört: Die Datenschutzerklärung verspricht in Punkt 5 („Das Teilen endet, wenn du … den Bereich löschst“) und in Punkt 12 („auch Kartensätze, die du per Code geteilt hast“) etwas, das der Code nur im Normalfall hält. LEHREN § 12 (Vorfall 24.09.2026) verlangt, dass alle Orte gelöscht werden.
- Vorschlag:
  1. `firestore.rules`: `allow list: if angemeldetBestaetigt() && resource.data.ownerUid == request.auth.uid;`. Verifiziert:
     - E19 ist dann erlaubt;
     - P5 (fremde uid) und P6 (ohne Filter) bleiben abgelehnt;
     - der Schutz aus Punkt 2 des Regelkommentars („kein Aufzählen“) bleibt also.
  2. `kontoDatenLoeschen`: zusätzlich `getDocs(query(collection(db,"geteilteLektionen"), where("ownerUid","==",uid)))` und alles davon löschen.
  3. `beendeTeilenCode`/`bereichEntfernen`: erst den Satz in der Cloud löschen, `teilCode` am Bereich erst nach Erfolg entfernen. Bei Fehler Meldung nach § 8.4.
  4. Regeltest nachtragen (E19, P5, P6).
- Entscheidet: Agent (Code und Regel), danach Konsole (Regel-Deploy)
- Umsetzung: Opus
- Abnahme:
  - Prüfstand: Store mit einem Satz `ownerUid: u1` **ohne** passenden `teilCode`, danach Konto löschen. Der Satz ist weg (Erweiterung von `t_loeschen_teilen.js`).
  - Emulator E19 erlaubt, P5/P6 abgelehnt.

#### REGELN-4: Nach dem Löschen einer Idee durch die Moderation bleiben die Stimm-Merker mit Konto-Kennung für immer liegen
- Art: Fehler
- Schwere: mittel
- Beleg:
  - `app.js:8630`: `feedbackLoeschen` löscht nur `feedback/{id}`, Firestore löscht Unter-Sammlungen nicht mit.
  - `kontoDatenLoeschen` (`app.js:2777-2778`) geht nur über die **noch vorhandenen** Vorschläge.
  - Emulator E15: `feedback/i2/votes/<uid>` besteht nach dem Löschen von `feedback/i2` weiter, verifiziert.
  - E14: Ein Stimm-Dokument lässt sich auch unter einer Idee anlegen, die es nie gab, verifiziert.
- Warum es stört: Das Versprechen in Datenschutzerklärung Punkt 12 („deine Stimm-Merker im Feedback-Board“ werden gelöscht) gilt nicht für Ideen, die der Betreiber gelöscht hat. Dort liegt die Konto-Kennung als Dokument-ID.
- Vorschlag (zwei Wege):
  - (a) Moderation löscht nicht, sondern setzt einen Status `entfernt`, den die Oberfläche ausblendet. Dann findet `kontoDatenLoeschen` die Idee weiter. Das ist die kleinste Änderung: `feedbackWerte` Statusliste, Anzeige-Filter.
  - (b) Die Regel erlaubt der Moderation `list, delete` auf `votes`, und `feedbackLoeschen` räumt vorher die Stimmen ab.
  - Dazu bei `votes/{uid}` `create` ein `exists(feedback/$(id))` verlangen.
- Entscheidet: Agent (Weg a ist mechanisch; Weg b gibt der Moderation Einblick in die Kennungen der Abstimmenden, das wäre Betreiber-Sache)
- Umsetzung: Sonnet (a) / Opus (b)
- Abnahme: Emulator: Moderator „entfernt“ Idee, das Stimm-Dokument wird mit dem Konto-Löschen weggeräumt. Prüfstand-Erweiterung von `t_loeschen_teilen.js`.

#### REGELN-5: Keine Mengenbremse, kein App Check – ein Wegwerf-Konto kann Kosten oder Quoten-Ausfall für alle erzeugen
- Art: Fehlt
- Schwere: mittel
- Beleg:
  - Jedes bestätigte Konto (auch ein Google-Konto) darf unbegrenzt `feedback`-Dokumente anlegen (`firestore.rules:381`), ebenso unbegrenzt `geteilteLektionen`. Letztere dürfen fast 1 MiB groß sein: Emulator E17, 900 KB `inhalt.bereiche[0]` wird angenommen, verifiziert, weil nur `size()==1` geprüft wird. Eigene Karten sind ebenfalls unbegrenzt.
  - `feedbackLaden` (`app.js:8523-8537`) liest **die ganze Sammlung** und zusätzlich **ein `getDoc` je Eintrag**: N Ideen ergeben 2N Lesungen bei jedem Öffnen und bei jedem Nutzer. Mit 5 000 Spam-Einträgen verbrauchen zehn Aufrufe die kostenlosen 50 000 Lesungen am Tag (gerechnet).
  - `kontoDatenLoeschen` liest ebenfalls alle Ideen.
  - App Check steht in `plan/PLAN.md` unter „Später“ (Zeile 397, „sobald die Seite öffentlich beworben wird“). Die Frage aus `PLAN.md:454` („Rate-Limits … jetzt wo Fremde registrieren können?“) ist im Code nicht umgesetzt.
- Warum es stört: Im Spark-Tarif legt ein erschöpftes Tageskontingent die App für **alle** lahm (Vermutung: welcher Tarif gilt, ist hier nicht sichtbar). Im Blaze-Tarif entstehen echte Kosten.
- Vorschlag:
  - Regeln:
    - `allow list: if … && request.query.limit <= 100` für `feedback`, in der App `query(…, orderBy("votes","desc"), limit(100))`;
    - `text(d.text, 100) && d.text.size() > 0`;
    - für `geteilteLektionen` `inhalt.bereiche[0] is map` mit `keys().hasOnly([...])` und `karten is list && karten.size() <= 5000`.
  - Konsole: Budget-Warnung in Google Cloud Billing (bzw. Nutzungsübersicht in Firebase) und App Check mit reCAPTCHA Enterprise. Für App Check sind CSP (`connect-src`/`script-src` für `www.google.com/recaptcha`) und die Datenschutzerklärung nötig.
- Entscheidet: Betreiber (App Check und Budget: Konsole, dazu die Datenschutzerklärung). Regelteil: Agent.
- Umsetzung: Opus
- Abnahme: Emulator: `getDocs(collection(feedback))` ohne `limit` wird abgelehnt, mit `limit(100)` erlaubt. Die App lädt das Board mit höchstens 100+100 Lesungen (Prüfstand: Zähler `__FB` Lesungen).
- Pro/Contra App Check:
  - Pro: Es sperrt Skripte ohne echte Seite aus. Das ist der einzige Schutz vor Massenanlage, den reine Regeln nicht leisten können.
  - Contra: Ein weiterer Fremddienst (reCAPTCHA, IP an Google), mehr CSP-Einträge (Vorfälle 3.4.8–10), ein möglicher Anmeldebruch, falls falsch eingerichtet, und ein Absatz in der Datenschutzerklärung.
  - Empfehlung: Den Regelteil und die Budget-Warnung jetzt machen (kostenlos, ohne Nebenwirkung). App Check wie geplant erst vor öffentlicher Werbung, dann mit Gerätetest.

#### REGELN-6: Nach dem Abmelden bleiben alle Lerndaten im Gerätespeicher (Firestore-Cache), die Datenschutzerklärung sagt „nur ein paar Einstellungen“
- Art: Unvollständig
- Schwere: mittel
- Beleg:
  - `app.js:1872`: `initializeFirestore(fbApp, { localCache: fb.persistentLocalCache() })`. Damit liegen alle Bereiche, Karten und das Protokoll in IndexedDB.
  - Im ganzen Code gibt es kein `clearIndexedDbPersistence` und kein `terminate` (grep, verifiziert).
  - `doLogout` (`app.js:2735`) ruft nur `fb.signOut`.
  - Datenschutzerklärung „Kurz gesagt“: „Auf deinem Gerät bleiben nur ein paar Einstellungen und Merkzeichen (Punkt 7) und die App-Dateien“. Punkt 10 nennt IndexedDB nur für den Anmeldezustand.
- Warum es stört: Auf einem geteilten Gerät (Familie, Schule) kann die nächste Person die Karten der vorigen über die Entwicklerwerkzeuge lesen. Und die Erklärung beschreibt den Speicher nicht vollständig (§ 12: jeden Datenfluss nennen).
- Vorschlag:
  - Mindestens den Text in Punkt 7/10 und „Kurz gesagt“ ergänzen: „eine Kopie deiner Lerninhalte, damit die App offline läuft“.
  - Optional beim Abmelden: `waitForPendingWrites` (mit Zeitlimit), dann `terminate(db)` und `clearIndexedDbPersistence(db)`, aber nur wenn nichts mehr aussteht (der Offline-Hinweis im Abmelde-Dialog bleibt gültig).
- Entscheidet: Betreiber (Recht/Text, Verhalten beim Abmelden)
- Umsetzung: Sonnet
- Abnahme: Prüfstand: nach Abmelden `indexedDB.databases()` ohne `firestore/…`-Datenbank (nur, wenn der Code-Teil gewählt wird). Die Datenschutzerklärung nennt die Offline-Kopie.
- Pro/Contra Code-Teil:
  - Pro: Das Gerät ist nach dem Abmelden wirklich leer, die Aussage wird wahr.
  - Contra: Die Anmeldung auf dem eigenen Handy lädt danach alles neu (Lesungen), und ein nicht gesendeter Offline-Stand ginge verloren, wenn man die Prüfung falsch baut.
  - Empfehlung: Den Text jetzt korrigieren. Das Leeren beim Abmelden nur mit der Sperre „nichts ausstehend“ einbauen.

#### REGELN-7: „Code erzeugen“ trägt den Code schon ein, bevor er gespeichert ist – bei einem Fehler zeigt die App danach einen toten Code
- Art: Fehler
- Schwere: mittel
- Beleg:
  - `app.js:3571-3591`: `b.teilCode = code` und `patchDoc(...)` (nicht abgewartet) laufen **vor** `setDoc(geteilteLektionen/code)`.
  - Im `catch` (`3589`) nur `dlgAlert` und `return`, kein Zurücknehmen von `b.teilCode`/`teilFreigabe`.
  - Danach steht beim Bereich „Dein Code: …“ (`app.js:8198`), obwohl es den Datensatz nicht gibt.
  - Auslöser sind Regeln, die nicht deployt sind, eine Netzunterbrechung oder eine Code-Kollision. Emulator E20: `set` auf einen bestehenden fremden Code wird abgelehnt, verifiziert.
  - Dazu warten `setDoc` hier und `updateDoc` in `lehrerFreigeben` (`3614`) ohne Zeitlimit auf die Server-Bestätigung (§ 6.7).
- Warum es stört: Die Lehrkraft gibt einen Code weiter, der „ungültig“ meldet. Den Grund sieht sie nicht.
- Vorschlag:
  - Erst `setDoc` (mit `mitZeitlimit`), dann bei Erfolg `b.teilCode` setzen und `patchDoc`.
  - Bei Fehler nichts am Bereich ändern.
  - Bei `permission-denied` wegen einer Kollision einmal mit neuem Code wiederholen. Das ist erlaubt, weil es kein Neuversuch nach demselben Fehlschlag ist, sondern ein anderer Code.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Prüfstand mit `__FB.fail = true` vor „Code erzeugen“: danach kein „Dein Code“ im Bereich und `users/u1/bereiche/b1.teilCode` nicht gesetzt.

#### REGELN-8: Der Regeltest prüft genau das Feld nicht, an dem der größte Vorfall hing
- Art: Unvollständig
- Schwere: niedrig
- Beleg:
  - `regeln-pruefung.mjs` N01/N04/N29 schreiben `settings` **ohne** `sitzungsLimit`. Das ist das Feld aus Vorfall 3.0.27 (LEHREN § 8.1).
  - Ebenfalls ungetestet: `streak.sockel`/`sockelBis` als `null`, das `persistAll`-Nutzerdokument, Arabisch mit voller Länge (MAX_WORT 1000 / MAX_EXTRA 5000 gleich der Regelgrenze, also Grundsatz 2 im Regelkopf verletzt), die Bindung der Stimmen, verwaiste Stimmen und die Suche nach dem Besitzer.
  - Im Emulator habe ich das nachgeholt (E01–E07, E09, E10 alle erlaubt, verifiziert). **Heute gibt es dort also keinen Fehler**, es fehlt nur der Schutz vor dem nächsten.
  - Der Kopf der Datei nennt noch „62 von 62“ bzw. „76“; tatsächlich sind es 132.
- Warum es stört: Die nächste Änderung an Einstellungen oder Längen fällt sonst wieder erst beim Nutzer auf.
- Vorschlag: Die Fälle E01–E20 und P1–P6 aus `audit/REGELN/extra.mjs` als `assertSucceeds`/`assertFails` in `regeln-pruefung.mjs` übernehmen. Kopfzahl korrigieren. Die Laufanleitung für Linux ergänzen (`npx firebase-tools emulators:exec --only firestore --project wiederholung-test "node regeln-pruefung.mjs"` mit `firebase.json` wie im Kopf; der Jar-Download über den Proxy klappt).
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Der Lauf meldet „158 von 158“ (bzw. die neue Summe), gegen die alte Regel schlagen P2/P3/E19 an.

#### REGELN-9: Ein Backup mit Stufe über 12 bricht den ganzen Import-Stapel ab
- Art: Fehler
- Schwere: niedrig
- Beleg:
  - `app.js:222`: `normCard` begrenzt `stufe` nur nach unten (`c.stufe >= 0 ? c.stufe : 0`). `maxStufe` wird dagegen auf `MAX_STUFE` gedeckelt (`app.js:249`).
  - Die Regel verlangt 0..12. Emulator E08: `stufe: 13` wird abgelehnt, verifiziert. Ein solcher Wert lässt ganze 400er-Stapel beim Einspielen scheitern (`patchDoc`, `writeBatch`).
  - Wie es zu so einer Datei kommt, ist Vermutung: eine von Hand bearbeitete Sicherung oder eine spätere Version mit mehr Stufen.
- Warum es stört: „Einspielen“ scheitert dann mit einer allgemeinen Meldung, der Grund bleibt unsichtbar.
- Vorschlag: In `normCard` `Math.min(stufe, MAX_STUFE)`. Das ist dieselbe Deckelung wie bei `maxStufe` und ändert die Lernlogik nicht.
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: `grep -n "Math.min(.*MAX_STUFE" app.js` zeigt die Deckelung für `stufe`. Import einer Datei mit `stufe: 20` im Prüfstand ergibt eine Karte mit Stufe 12, ohne Fehlerbanner.

#### REGELN-10: Ideen können ein erfundenes Datum und einen leeren Titel tragen
- Art: Verbesserung
- Schwere: niedrig
- Beleg:
  - `firestore.rules:373`: `erstelltAm` ist nur `text(…, 40)`. Emulator E13: `"9999-12-31T00:00:00Z"` wird angenommen, verifiziert.
  - Bei gleicher Stimmenzahl sortiert `app.js:8526` danach, eine Spam-Idee steht also immer oben.
  - `text(d.text, 100)` erlaubt auch `""`.
- Warum es stört: Die Reihenfolge ist manipulierbar, leere Einträge sind möglich.
- Vorschlag: Regel `d.text.size() > 0` und `erstelltAm is timestamp && erstelltAm == request.time`. In der App `serverTimestamp()` schreiben und beim Sortieren `toMillis()` verwenden. Eine alte String-Idee bleibt lesbar, weil nur beim Anlegen geprüft wird. Alternativ als kleinster Schritt: Regex auf ISO-Datum und `<= request.time`.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Emulator: E13 und `text: ""` werden abgelehnt, F01/F06/F07 weiter erlaubt.

#### REGELN-11: Datenschutzerklärung sagt an drei Stellen mehr zu, als die Regeln halten
- Art: Unvollständig
- Schwere: niedrig
- Beleg:
  - Punkt 14 sagt „jedes Konto ausschließlich an die eigenen Daten“. Das widerspricht Punkt 5 (Code-Sätze) und Punkt 6 (Board).
  - Punkt 6 sagt „damit niemand doppelt abstimmt“ (siehe REGELN-2, heute nicht durchgesetzt).
  - Punkt 5 nennt die Konto-Kennung im geteilten Satz, sagt aber nicht, dass **jeder mit dem Code sie lesen kann**. Emulator E18: `ownerUid` ist für das fremde Konto sichtbar, verifiziert.
- Warum es stört: § 7.2/§ 12 fordern: nur versprechen, was der Code tut.
- Vorschlag:
  - Punkt 14: „… an die eigenen Daten, mit den Ausnahmen aus Punkt 5 und 6“.
  - Punkt 5: „Wer den Code hat, sieht auch diese Kennung.“
  - Punkt 6 bleibt, wenn REGELN-2 umgesetzt ist, sonst entschärfen.
- Entscheidet: Betreiber (Rechtstext)
- Umsetzung: Haiku
- Abnahme: `grep -n "ausschließlich an die eigenen" datenschutzerklaerung.html` zeigt den Zusatz.
- Pro/Contra:
  - Pro: Der Text wird exakt richtig, bei geringem Aufwand.
  - Contra: Er wird länger und lässt die Kennung wichtiger klingen, als sie ist (eine zufällige Zeichenfolge ohne Namen).
  - Empfehlung: Punkt 14 und Punkt 5 ändern. Punkt 6 mit REGELN-2 zusammen.

#### REGELN-12: Abstimmen scheitert ohne ein Wort
- Art: Fehler
- Schwere: niedrig
- Beleg:
  - `app.js:8608-8612`: Im `catch` von `feedbackAbstimmen` wird nur die Anzeige zurückgedreht, es kommt keine Meldung.
  - Das trifft zu, wenn die Regel nicht deployt ist, bei einem Doppel-Tipp von zwei Geräten (Emulator E12: ein zweites `set` auf ein bestehendes Stimm-Dokument wird abgelehnt) und offline.
  - § 8.4 verlangt „eine Meldung in Worten“.
- Warum es stört: Der Herz-Knopf springt kommentarlos zurück, das wirkt wie ein toter Knopf.
- Vorschlag: Im `catch` `zeigeToast(fehlerKlartext(e))` (vorhandenes Bauteil, § 3.7).
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: Prüfstand: `__FB.fail = true`, Tipp auf Abstimmen, danach steht ein Toast mit „abgelehnt …“ da.

#### REGELN-13: Kein Cross-Origin-Opener-Policy-Header
- Art: Verbesserung
- Schwere: niedrig
- Beleg: `firebase.json:49-58` setzt HSTS, nosniff, XFO, Referrer, Permissions und CSP, aber kein COOP.
- Warum es stört: kaum. `same-origin-allow-popups` würde fremde Fenster vom `window.opener` trennen, während das Google-Popup weiter funktioniert. Einen großen Sicherheitsgewinn bringt das ohne COEP nicht.
- Vorschlag: `{ "key": "Cross-Origin-Opener-Policy", "value": "same-origin-allow-popups" }` in beiden Site-Blöcken. Dazu `csp-build` mitzählen (§ 4.3) und die Google-Anmeldung am Gerät testen. **Nicht** `same-origin`, das bricht `signInWithPopup`.
- Entscheidet: Agent (mit Gerätetest durch den Betreiber)
- Umsetzung: Sonnet
- Abnahme: `curl -sI https://adrabic.web.app/ | grep -i cross-origin-opener`, danach Google-Anmeldung und -Neuanmeldung am iPhone und am Desktop erfolgreich.
- Empfehlung: nur zusammen mit der nächsten ohnehin fälligen Header-Änderung, nicht allein. Das Risiko eines Anmeldebruchs (Vorfälle 3.4.8–10) wiegt den kleinen Gewinn nicht auf.

---

Geprüft ohne Fund:
- **Positivliste Nutzerdokument:** `persistAll`, `schreibeInsNutzerdokument`, `persistStreak` (alle `STREAK_FELDER` + `sockel`/`sockelBis`), `persistSettings` (genau die 4 Felder aus `normSettings`, `sitzungsLimit` `"alle"` oder Zahl), `persistVerlauf` (FieldPath je Tag), `verlaufNachschicken`, `verlaufAufraeumen` (deleteField), `verlaufZuruecksetzen`, Umzug `schemaVersion`. Alles passt zu `nutzerFelder()`/`streakOk`/`settingsOk`, im Emulator E01–E03 bestätigt. Kein Feld, das die Regel ablehnt. `bereiche` wird nur gelöscht.
- **Bereiche:** `bereichFelder()` (ohne `karten`, durch `patchDoc` abgeschnitten) passt genau zu `bereichFelder()` der Regel (E10). Felder, die die Regel erlaubt, aber niemand schreibt: keine. `satzId`/`satzVersion`/`gefuehrt` schreibt der Satz-Import.
- **Karten:** `kartenFelder()` + `bereichId`, `persistCardGrade` (5 Felder), Verschieben (`set` mit neuem `bereichId`). `MAX_WORT`/`MAX_EXTRA` = Regelgrenze. `size()` zählt so, dass JS-Länge 1000/5000 für Arabisch mit Harakat und für Emoji durchgeht (E04–E07). Die Abfrage `where bereichId` ist durch `read` gedeckt (E09).
- **Fremde Daten lesen/schreiben** unter `users/{uid}`: durch `eigenesKonto` ausgeschlossen (M01–M05). Unbekannte Unterpfade/Sammlungen abgelehnt (M27–M29).
- **geteilteLektionen:** kein Aufzählen (T03/T04/P6), kein Überschreiben fremder Codes (E20), Freigabe nur nach oben und nur vom Besitzer (L-Reihe). Code 10 Zeichen aus 32 mit `crypto.getRandomValues`, `256 % 32 = 0`, also ohne Modulo-Verzerrung, rund 2^50 Möglichkeiten.
- **Feedback:** Anlegen nur mit `votes 0`/`status offen`, keine Konto-Kennung im Dokument, Stimm-Dokumente nicht auflistbar, Moderation an eine uid gebunden und zusätzlich E-Mail-bestätigt. Texte werden mit `esc()` ausgegeben (`app.js:8479/8481`).
- **Konto löschen:** Reihenfolge richtig (erst Neu-Anmeldung, dann Daten, dann Auth). `kontoWirdGeloescht` + `listenerLoesen` vor dem ersten Löschen. Bereiche, Karten, Nutzerdokument, eigene Codes (über `teilCode`) und eigene Stimmen (über bestehende Ideen) werden gelöscht. Lücken nur in REGELN-3/-4.
- **firebase.json:**
  - Beide Site-Blöcke sind identisch (per Python verglichen).
  - `img-src https:` ist nötig, weil Karten beliebige Bild-Links tragen (`renderExtra`). Bilder aus fremden Sätzen werden nur verlinkt (Datenschutzerklärung Punkt 9), enger geht es ohne Proxy nicht.
  - `style-src 'unsafe-inline'` wegen `style="…"` im Markup.
  - HSTS ohne `preload`: `.app` ist als ganze Top-Level-Domain im Browser-Preload, also ohne Wirkung für `web.app`. Erst bei eigener Domain relevant.
  - Permissions-Policy (Kamera/Mikrofon/Ort aus) passt, die App braucht nichts davon.
  - `frame-src`/`script-src` für den Google-Popup sind vollständig (§ 9.2).
  - `authDomain` auf `firebaseapp.com` ist bewusst so (`plan/redesign-oberflaeche/LOGBUCH.md:963`). Es wird nur `signInWithPopup` benutzt, kein Redirect.
  - Hosting-`ignore` schließt `plan/`, `*.md`, `*.bat`, `firestore.rules` und Punktdateien aus.
- **Datenschutzerklärung gegen die Cloud-Felder:** Name, E-Mail, Bereiche, Karten, Speicherkarten, Stufen, Fälligkeiten, Serie, Tagesprotokoll, Einstellungen, geteilte Sätze samt Zeit/Kennung/Freigabe, Board-Titel/Beschreibung/Zeit/Status/Stimmenzahl, Stimm-Merker mit Kennung: alles genannt. Lücken nur in REGELN-6/-11.
- **Nicht prüfbar von hier:** ob die Regeln aus dem Repo **live** in der Konsole stehen, welcher Tarif (Spark/Blaze) gilt, ob E-Mail-Enumeration-Schutz und die Einschränkung des Browser-Keys aktiv sind. Das sind Konsolen-Blicke für den Betreiber.

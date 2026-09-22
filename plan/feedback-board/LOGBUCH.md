# Logbuch: Feedback-Board

Letzter Eintrag zuerst.

---

### 2026-09-23 — Endlosschleife beim Laden gefunden und behoben, Doppel-Einreichen verhindert (v3.9.1)

**Anlass:** Betreiber-Meldung mit Screenshot: das Formular unter „Ideen &
Vorschläge" flackert, beide Textfelder lassen sich kaum antippen, darunter
steht dauerhaft „Lädt…". Dazu ein zweiter, offener Auftrag ohne Rückfragen:
das ganze Tool auf Fehler/Bugs/Sicherheitslücken durchsehen und beheben.

**Geändert:** `app.js` — `renderFeedbackSeite()` (Lade-Anstoß um
`!feedbackFehler` ergänzt), `feedbackLaden()`/Fehlerzweig (Knopf „Erneut
versuchen", neuer `data-action="feedback-retry"`), `feedbackEinreichen()`
(neuer Busy-Zustand `feedbackEinreichtWird`), Reset in `onAuthStateChanged`.

**Ursache (echter Fund):** `renderFeedbackSeite()` prüfte nur
`feedbackListe === null && !feedbackLaedt`, um automatisch nachzuladen.
Schlägt das Laden fehl (z. B. weil `firestore.rules` für `feedback` noch
nicht deployt ist — genau der Zustand, solange der Betreiber „Was Du noch
tun musst" aus der vorigen Session noch nicht erledigt hat), setzt
`feedbackLaden()` `feedbackFehler` und `feedbackLaedt = false` — und exakt
dann wurde die Bedingung oben **wieder wahr** und `feedbackLaden()` sofort
erneut aufgerufen. Jeder Versuch löst zwei volle Neuaufbauten von `#app`
aus (`render()` beim Start und am Ende von `feedbackLaden()`) — das
zerstört und ersetzt dabei auch die gerade fokussierten Eingabefelder unter
der Bildschirmtastatur. Bei einem schnell fehlschlagenden Aufruf
(`permission-denied` kommt zügig zurück) entsteht daraus eine so schnelle
Wiederholung, dass es als Flackern wahrgenommen wird und der Nutzer nie
über „Lädt…" hinauskommt — unabhängig vom Tippen selbst, rein durch den
Ladeversuch angetrieben.

**Fix:** Nach einem Fehlschlag wird **nicht mehr automatisch** erneut
versucht — nur noch über einen expliziten „Erneut versuchen"-Knopf. Das
beendet die Schleife strukturell, unabhängig davon, ob die eigentliche
Ursache (fehlender Deploy) behoben ist oder nicht.

**Nebenfund beim Gegenlesen:** Der „Vorschlag einreichen"-Knopf war
während des eigentlichen Schreibvorgangs (`addDoc`) nicht gesperrt — ein
schneller Doppel-Tipp (naheliegend bei einem Knopf ohne sichtbare
Rückmeldung) hätte denselben Vorschlag zweimal angelegt. Eigener
Busy-Zustand ergänzt, gleiches Muster wie `ui.kontoLoeschenBusy`
(`button.busy`, per CSS bereits vorhanden, wird bisher nur bei Anmelden/
Registrieren/Zurücksetzen benutzt).

**Sicherheits-/Fehlerdurchsicht (Betreiber-Auftrag, „wie ein Hacker"),
diese Runde:**
- `firestore.rules` komplett neu gegengelesen (alle drei Sammlungen). Keine
  neuen Funde über das hinaus, was bereits in `firestore.rules` selbst
  dokumentiert ist (bewusst in Kauf genommene Lücken sind als solche
  markiert, nicht übersehen).
- Fehlerformular-`mailto:`-Aufbau geprüft: `encodeURIComponent()` läuft
  über den **gesamten zusammengesetzten** Body-Text (Name + E-Mail +
  Beschreibung als eine Einheit) — ein Nutzer, der `&`, `?` oder Zeilen-
  umbrüche in Name/E-Mail eingibt, kann damit keine zusätzlichen
  Mailto-Parameter (z. B. `bcc=`) einschleusen, das würde alles selbst mit
  kodiert. Kein Fund.
- Auth-E-Mail-Versand (`sendEmailVerification`, `sendPasswordResetEmail`)
  geprüft: kein eigenes `actionCodeSettings`/`continueUrl` gesetzt — damit
  kein Open-Redirect-Risiko über eine manipulierbare Rücksprungadresse,
  Firebase zeigt seine eigene Standardseite. Kein Fund.
- `esc()`-Abdeckung an mehreren Rendering-Stellen stichprobenartig
  nachverfolgt (u. a. `kartenListeInhalt()`, Feedback-Board, Import-Pfad
  `verarbeiteImportDaten`) — konsequent verwendet, keine neue Lücke
  gefunden.
- Handschrift-Aufnahme (`hwStrokes`) geprüft: reine Koordinatenzahlen aus
  Zeigerereignissen, keine Nutzertext-Einspeisung, keine Angriffsfläche.

**Offen/bewusst nicht angefasst:**
- Die Ursache des Ladefehlers selbst (fehlender Deploy) bleibt beim
  Betreiber — siehe frühere „Was Du noch tun musst".
- Betreiber-Kommentar „Beschreibung bei hell/dunkel muss nicht so krass
  sein" — Ziel-Element nicht eindeutig zu bestimmen (`.opt`-Stil geprüft,
  unauffällig). Nicht geraten, festgehalten statt blind geändert.
- Eine erschöpfende Sicherheitsprüfung „des gesamten Tools" ist keine
  endliche Aufgabe; diese Runde deckt die Stellen mit dem größten
  realistischen Risiko ab (neue Schreibpfade, Formulare, Auth), nicht
  jede Zeile.

**Geprüft:** `node --check app.js` sauber. Nicht am echten Gerät/Konto
geprüft (der eigentliche Ladefehler braucht den ausstehenden Firestore-
Regel-Deploy, um überhaupt reproduzierbar zu sein).

**Nächster Schritt:** Betreiber deployt `firestore.rules` (weiterhin
ausstehend), testet danach Formular + Abstimmen ohne Flackern.

### 2026-09-22 — Gebaut, gegen den Emulator geprüft (v3.8.4)

**Geändert:**
- `firestore.rules`: neuer Block `feedback/{id}` + `feedback/{id}/votes/{uid}`,
  Funktionen `istFeedbackModerator()`, `feedbackFelder()`, `feedbackWerte()`.
- `app.js`: Zustand (`feedbackListe`, `feedbackEigeneVotes`, `feedbackLaedt`,
  `feedbackFehler`, `feedbackFormFehler`), Icon `pfeilHoch`, `SEITEN_TITEL.
  feedback`, Zeile in `renderEinstellungen()` (Abschnitt „Hilfe"),
  `renderFeedbackSeite()`, `feedbackZeile()`, `FEEDBACK_STATUS`,
  `feedbackLaden()`, `feedbackEinreichen()`, `feedbackAbstimmen()`,
  `feedbackStatusAendern()`, `feedbackLoeschen()`, fünf neue `data-action`-
  Fälle, Reset der drei Feedback-Variablen in `onAuthStateChanged`.
- `styles.css`: `.badge.positiv`/`.badge.negativ`, `min-height` bereits von
  vorherigem Fix vorhanden (kein neuer Eingriff dort für dieses Feature).
- `plan/phase-1-datenzugriff/regeln-pruefung.mjs`: 26 neue Prüfungen F01–F26,
  `MOD`-Konstante + `RULES_TEXT`-Ersetzung für die Moderations-Fälle.
- `APP_VERSION`/`CACHE_NAME`/`index.html?v=` → 3.8.4, `CHANGELOG.md`.

**Entscheidung — Datenmodell:** Sammlung `feedback/{id}` ohne gespeicherte
Konto-Kennung (Betreiber-Vorgabe: „niemand kann auf die Daten der anderen
zugreifen"). `votes` ist ein Zählfeld auf dem Dokument selbst (±1 pro
Schreibvorgang), zusätzlich ein leeres Dokument je Konto unter `votes/{uid}`
als Existenz-Nachweis „hat abgestimmt" — nur für die eigene Kennung lesbar,
nirgends `list` erlaubt (sonst wären über die Dokument-IDs, die die
Konto-Kennungen SIND, alle Stimmenden sichtbar). Bewusst **kein**
`getCountFromServer()`/Aggregation auf der `votes`-Unterammlung als
Zähl-Ersatz erwogen und verworfen: Aggregationsabfragen brauchen dieselbe
`list`-Berechtigung wie eine normale Auflistung — hätte also entweder gar
nicht funktioniert oder dieselbe Anonymität wieder aufgebrochen.

**Entscheidung — Abstimm-Konsistenz, ehrlich unvollständig:** Die beiden
Schreibvorgänge beim Abstimmen (Stimm-Dokument + Zähler) sind NICHT
kryptografisch aneinander gebunden. Erwogen: eine Cloud Function (verworfen —
dieses Projekt hat bewusst keinen eigenen Server, `../../CLAUDE.md`) und eine
`get()`-Gegenprüfung in der Regel (verworfen — verdoppelt die Lesekosten pro
Abstimmung, ohne dass ein Angriff mit echtem Schaden verhindert würde: das
Schlimmste ist ein aufgeblähter Zähler bei einer Idee, kein Zugriff auf
fremde Daten). Als `writeBatch()` in `app.js` gebaut (atomar gegen normale
Fehler/Netzabbrüche), mit dem dokumentierten Rest-Risiko gegen absichtlichen
Missbrauch über die Entwicklerwerkzeuge.

**Entscheidung — Moderation ohne Selbst-Löschen:** Weil keine Konto-Kennung
gespeichert wird, kann niemand beweisen, welcher Eintrag „der eigene" ist —
auch nicht die einreichende Person selbst. Löschen und Status ändern kann
deshalb ausschließlich `istFeedbackModerator()` (feste Konto-ID-Liste,
Platzhalter bis der Betreiber seine eigene einträgt). Bewusste Konsequenz
der Anonymität, keine übersehene Funktion.

**Echter Fehler gefunden und behoben, vor dem ersten Testlauf:**
`feedbackWerte()` hatte in der ersten Fassung keine Klammern um die
einzelnen `(!pruefen.hasAny(...) || Prüfung)`-Paare. In der Regelsprache
bindet `&&` stärker als `||` — ohne Klammern wäre die Kette am Ende bei
`|| d.status in [...]` gelandet und hätte (weil `status` beim Anlegen immer
`'offen'` ist) fast jede Feldprüfung wirkungslos gemacht, unabhängig vom
Inhalt von `text`/`beschreibung`/etc. Gefunden beim Gegenlesen gegen das
Muster der übrigen `*Werte()`-Funktionen in `firestore.rules` (die alle
konsequent klammern), nicht durch den Emulator — der Fehler wurde vor dem
ersten Lauf behoben, lief also nie tatsächlich gegen den Emulator.

**Geprüft:** Java (Microsoft OpenJDK 21) eigens für diese Sitzung
installiert — vorher in dieser Arbeitsumgebung nicht vorhanden, alle
früheren Regelprüfungen in diesem Projekt liefen in anderen Sitzungen.
Firestore-Emulator gegen die echte `firestore.rules` gestartet:
**132 von 132 Prüfungen wie erwartet**, davon 26 neu (F01–F26, siehe
`regeln-pruefung.mjs`). Die Moderations-Fälle (F25/F26) laufen gegen eine
Kopie der Regel mit einer Test-Konto-ID anstelle des Platzhalters — die
echte, deployte Regel bleibt beim Platzhalter, bis der Betreiber sie
ersetzt. `node --check app.js` sauber. Oberfläche selbst **nicht** am echten
Gerät/mit echtem Konto geprüft (braucht Login, in dieser Umgebung nicht
möglich) — nur Code-Review plus die Erkenntnis aus dem Swipe-Fix von eben,
dass `.liste` selbst eine Fläche ist: die Liste der Vorschläge wurde deshalb
NICHT in `.liste` gepackt (das wäre eine Fläche in einer Fläche gewesen,
Satz 2 der Gestaltungsregeln), sondern als einzelne `.card`-Elemente mit
Abstand dazwischen.

**Offen:**
1. Betreiber muss die eigene Konto-ID in `istFeedbackModerator()`
   (`firestore.rules`) eintragen, dann `firebase deploy --only
   "firestore:rules"` und `veroeffentlichen.bat` — siehe Session-Antwort,
   „Was Du noch tun musst".
2. Betreiber-Test am echten Gerät/Konto steht aus (Formular, Abstimmen,
   Moderations-Knöpfe erscheinen nur für die eingetragene Konto-ID).
3. Datenschutzerklärung Abschnitt 10 noch nicht um das Board erweitert
   (`feedback-board/AUFTRAG.md`, Punkt 3) — vor einer echten Bewerbung des
   Boards nachholen.
4. Missbrauchs-Vorprüfung bewusst vertagt (`AUFTRAG.md`, Punkt 4).

**Nächster Schritt:** Betreiber-Rückmeldung zum Gerätetest abwarten.

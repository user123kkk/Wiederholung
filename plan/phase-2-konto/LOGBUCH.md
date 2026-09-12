# Logbuch Phase 2 — Konto-Lebenszyklus

Auftrag: [`AUFTRAG.md`](AUFTRAG.md) · Gesamtplan: [`../PLAN.md`](../PLAN.md)
Status: `läuft` — Konto-Löschung gebaut, ein Fehler beim ersten Testlauf gefunden
und behoben, erneuter Test steht noch aus

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

### 2026-09-12 — Phase 2 begonnen: Konto löschen gebaut, Punkt 3 geprüft

**Geändert:**
- `../../app.js`
  - `ui.kontoLoeschenBusy` (neues Feld, Zeile ~905)
  - `kontoDatenLoeschen()`, `kontoLoeschenFehlerText()`, `kontoAuthLoeschen()`,
    `doKontoLoeschen()` — neue Funktionen direkt nach `doLogout()`
  - `renderEinstellungen()` — neuer Knopf „Konto endgültig löschen" im
    Abschnitt „Konto", unter „Abmelden"
  - `dlgPrompt()` / `renderDialog()` — Eingabefeld kann jetzt `type: "password"`
    bekommen (für die Passwort-Nachfrage bei `requires-recent-login`)
  - Event-Delegation: neuer Fall `"delete-account"`
  - `APP_VERSION` auf `3.0.5`
- `../../sw.js` — `CACHE_NAME` auf `adrabic-3.0.5`
- `../../CHANGELOG.md` — Eintrag 3.0.5

**Entscheidung:**

1. **Reihenfolge: erst Firestore-Daten löschen, dann das Auth-Konto.** Der
   Auftrag verlangt ausdrücklich, den Fall eines halb gelöschten Kontos zu
   bedenken. Beide Reihenfolgen können bei einem Netzwerkfehler mitten im
   Vorgang scheitern — der Unterschied ist, was danach übrig bleibt:
   - Daten zuerst: Schlägt der Auth-Schritt fehl, bleibt ein Konto ohne
     Daten. Es lässt sich erneut anmelden, der Löschversuch lässt sich
     wiederholen (Löschen bereits gelöschter Dokumente ist in Firestore ein
     No-Op). Harmlos.
   - Konto zuerst: Schlägt der Firestore-Schritt fehl, bleiben Daten ohne
     Konto. Die Regeln verlangen überall `request.auth.uid == uid` — ohne
     das Konto gibt es kein passendes `uid` mehr. Niemand könnte diese Daten
     je wieder löschen, auch der Betreiber nicht ohne Admin-SDK. Endgültig
     verwaist.

   Deshalb: Daten zuerst. Das ist auch, warum `kontoAuthLoeschen()` bei
   `auth/requires-recent-login` erneut nach dem Passwort fragt und danach
   `deleteUser` wiederholt, statt einfach aufzugeben — die Daten sind zu
   diesem Zeitpunkt schon weg, ein Abbruch hier soll nicht dazu führen, dass
   der Nutzer es gar nicht mehr versuchen kann.

2. **Bestätigung durch Eintippen der E-Mail-Adresse**, nicht durch einen
   einzelnen Knopf. Folgt demselben Muster wie das Löschen eines Bereichs
   (`deleteBereich()`, Zeile ~2707): ein Backup wird ohne Nachfrage
   automatisch angeboten (hier das volle Backup, `exportBackup()` ohne
   Parameter — bei `deleteBereich()` ist es nur der eine Bereich), danach
   muss etwas Eindeutiges eingetippt werden. Ein Name lässt sich nicht blind
   wegklicken.

3. **Passwortfeld für die Nachfrage:** `dlgPrompt()` konnte bisher nur
   Klartext-Eingaben. Kleinste denkbare Erweiterung (`opts.type`) statt
   eines eigenen Dialogtyps — an jeder bisherigen Aufrufstelle ändert sich
   nichts, weil der Parameter optional ist und auf `"text"` zurückfällt.

4. **Keine Regeländerung nötig.** `firestore.rules` erlaubt `delete` auf
   `users/{uid}`, `bereiche/{bid}` und `karten/{cid}` bereits seit Phase 1
   (`allow read, delete: if eigenesKonto(uid);` an allen drei Stellen) —
   ungeprüft, weil Löschen kein Feld anfasst, das eine Feldregel bräuchte.
   Geprüft und bestätigt beim Lesen der Datei, nicht neu geschrieben.

5. **Punkt 3 des Auftrags („Private Seiten hinter dem Login") ist bereits
   erfüllt** — unverändert seit dem Befund in `phase-0-bestand/BEFUND.md`,
   Abschnitt 4.3. Die Reihenfolge in `render()` (`app.js:3619–3627`) ist
   weiterhin: Datenschutzhinweis (auch ohne Konto erreichbar, das ist
   Absicht) → `renderAuth()` ohne Anmeldung → `renderPendingVerification()`
   ohne Bestätigung → erst dann die App. Nichts geändert, nur erneut
   geprüft — steht hier, damit die nächste Session es nicht noch einmal tut.

**Offen:**
- **Punkt 1 des Auftrags** (Registrierung, Bestätigung, Anmeldung,
  Passwort-Zurücksetzen als dokumentierter Testlauf) — das ist ein
  manueller Durchklick-Test in der laufenden App, kein Agent kann das
  stellvertretend tun.
- **Punkt 2, der Test selbst:** Die neue Lösch-Funktion ist geschrieben und
  gegen `firestore.rules` gelesen, aber **noch an keinem echten Konto
  ausprobiert** — kein Emulator zur Hand in dieser Session (kein
  `firebase-tools` installiert, kein `package.json` im Projekt). Der
  Auftrag verlangt ausdrücklich einen Testlauf an einem Testkonto, nicht nur
  gelesenen Code. Das ist unten unter „Was Du noch tun musst" vermerkt.
- Kleinere Frage, die beim Testen mitbeobachtet werden sollte: Zeigt
  `dlgAlert`/`dlgPrompt` mehrzeiligen Text mit `\n` überhaupt zeilenweise an?
  `dlgConfirm` bei `deleteBereich()` nutzt dasselbe Muster seit Version
  2.11.0 und offenbar unauffällig — hier nur erneut aufgeschrieben, damit es
  beim ersten eigenen Test nicht wie ein neuer Fehler aussieht, falls es
  doch auffällt.

**Nächster Schritt:** Punkt 1 und Punkt 2 an einem **Testkonto** durchführen
(nicht am eigenen echten Konto!) — siehe „Was Du noch tun musst" in
`../PLAN.md`. Danach diesen Eintrag um das Ergebnis ergänzen und, wenn alles
passt, Phase 2 auf `fertig` setzen.

---

### 2026-09-12 — Erster Testlauf, Fehler gefunden: Löschung hebt sich selbst auf

**Geändert:**
- `../../app.js`
  - `kontoWirdGeloescht` (neue Sperre, deklariert bei den anderen
    modulweiten Zustandsvariablen nahe `unsubscribeSnapshot`)
  - `onSnapshot(userDocRef, ...)` — Abbruch am Anfang, wenn die Sperre steht
  - `persistVerlauf()` — Abbruch vor dem automatischen Neuanlegen
  - `schreibeInsNutzerdokument()` — Abbruch vor dem automatischen Neuanlegen
  - `patchDoc()` — Abbruch vor dem automatischen Neuanlegen (dritte Stelle
    mit demselben Muster, beim Suchen nach `"not-found"` gefunden)
  - `kontoDatenLoeschen()` — setzt die Sperre und meldet `listenerLoesen()`
    ab, bevor irgendetwas gelöscht wird
  - `doKontoLoeschen()` — lädt die Seite neu, wenn die Löschung
    fehlschlägt, statt mit abgemeldeten Live-Abgleichen weiterlaufen zu
    lassen
  - `APP_VERSION` auf `3.0.6`
- `../../sw.js` — `CACHE_NAME` auf `adrabic-3.0.6`
- `../../CHANGELOG.md` — Eintrag 3.0.6

**Entscheidung:**

Der Betreiber hat den Testlauf gemacht (Testkonto, Karten angelegt, über den
neuen Knopf gelöscht) und danach in der Firebase-Konsole nachgesehen: Das
Konto war weiterhin da. Auf Nachfrage nur „komisch" — kein Fehlerdialog in
der App, die App selbst zeigte den Anmeldebildschirm (`currentUser` war also
wirklich `null`).

Das war der entscheidende Hinweis: Wenn die App keinen Fehler gemeldet hat,
`fb.deleteUser()` also durchgelaufen ist, aber in der Konsole trotzdem noch
etwas steht, kann das kein Fehlschlag der Löschung selbst sein — es muss
etwas sein, das **danach** wieder etwas anlegt.

Fündig geworden beim Durchsuchen aller Stellen, die auf ein fehlendes
Nutzerdokument reagieren (Suche nach `"not-found"` und nach
`normBereiche(null)`): Drei separate Codepfade legen das Nutzerdokument
automatisch neu an, sobald sie es nicht finden — Absicht für den Fall
„frisches Konto, das Dokument existiert noch nicht", aber ununterscheidbar
vom Fall „das Dokument wurde gerade gelöscht":

1. Der Live-Abgleich auf `userDocRef` (`app.js`, im `onAuthStateChanged`
   gesetzt) sieht `data === undefined`, hält das für ein neues Konto und
   ruft `persistAll()` — das schreibt das **komplette** in-memory
   `bereiche`-Array zurück in die Cloud. Das war der Haupttäter: Diese
   Zuhör-Funktion lief die ganze Zeit weiter, während `kontoDatenLoeschen()`
   löschte, und hat auf die eigene Löschung reagiert, noch bevor
   `deleteUser()` das Konto abgemeldet hat.
2. `persistVerlauf()` — bei „not-found" wird das Dokument per `setDoc` mit
   `merge: true` neu angelegt. Ausgelöst würde das durch den 2-Sekunden-
   Debounce-Timer aus `verlaufSpeichernBald()`, falls kurz vor dem Löschen
   noch eine Karte bewertet wurde.
3. `schreibeInsNutzerdokument()` — derselbe „not-found → setDoc mit merge"-
   Ablauf für Serie und Einstellungen.

Alle drei sind für den Normalbetrieb richtig und bleiben unverändert — das
Problem war ausschließlich, dass sie während einer **aktiven Löschung**
nicht wissen konnten, dass das fehlende Dokument Absicht ist. Die Lösung
ist deshalb eine einzige Sperrvariable `kontoWirdGeloescht`, die alle drei
Stellen vor ihrem jeweiligen Neuanlegen prüfen, plus das sofortige Abmelden
der Live-Abgleiche in `kontoDatenLoeschen()` (verhindert Fall 1 bereits an
der Wurzel, da der Handler danach gar nicht mehr aufgerufen wird — die
Sperre selbst federt nur noch Fall 2 und 3 ab, falls ein Schreibvorgang
schon unterwegs war, bevor `listenerLoesen()` griff).

Bewusst **keine** Sperre in `persistAll()` selbst eingebaut: Diese Funktion
*ist* die Neuanlage-Logik, kein weiterer Aufrufer davon existiert außerhalb
der drei genannten Stellen (geprüft: `grep -n "persistAll()"`).

**Die Reihenfolge Daten-zuerst-dann-Konto (Eintrag vom 2026-09-12, weiter
oben) bleibt richtig** — dieser Fehler war kein Grund, sie zu überdenken.
Er zeigt nur, dass "Daten löschen" mehr bedeutet als ein `deleteDoc()`-Aufruf,
solange noch etwas anderes zuhört.

**Offen:**
- **Das verwaiste Testkonto-Dokument muss von Hand aus Firestore.** Weil
  Schritt 1 oben zugeschlagen hat, bevor `deleteUser()` fertig war, wurde
  das Testkonto in Authentication vermutlich trotzdem gelöscht (dafür gab es
  keinen Fehler) — aber das dabei neu angelegte Firestore-Dokument gehört
  jetzt zu keinem Konto mehr. Genau das Szenario, das die
  Daten-zuerst-Reihenfolge verhindern sollte, ist über einen Umweg trotzdem
  eingetreten. Steht unter „Was Du noch tun musst" in `../PLAN.md`.
- **Der Fix selbst ist ungetestet.** Wieder kein Emulator zur Hand — die
  Analyse ist gründlich (drei Fundstellen, alle mit `grep` verifiziert,
  keine vierte gefunden), aber ob die Sperre in der Praxis reicht, zeigt
  erst der nächste Testlauf.
- Punkt 1 des Auftrags (Registrierung/Bestätigung/Anmeldung/Reset als
  dokumentierter Testlauf) weiterhin offen — unklar, ob das beim ersten
  Testlauf schon mitgemacht wurde oder nur die Löschung.

**Nächster Schritt:** Mit einem **neuen** Testkonto den ganzen Ablauf
wiederholen (altes Testkonto ist jetzt das verwaiste Dokument, nicht wieder
verwenden) — danach in der Firebase-Konsole **beide** Stellen prüfen,
Authentication und Firestore. Vorher das alte verwaiste Dokument in der
Konsole von Hand löschen (siehe PLAN.md).

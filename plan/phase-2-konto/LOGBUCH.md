# Logbuch Phase 2 — Konto-Lebenszyklus

Auftrag: [`AUFTRAG.md`](AUFTRAG.md) · Gesamtplan: [`../PLAN.md`](../PLAN.md)
Status: `läuft` — Konto-Löschung gebaut, noch nicht an einem Testkonto geprüft

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

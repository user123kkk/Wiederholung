# Logbuch Phase 3 — Hygiene

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

### 2026-09-12 — Phase 3 durchgearbeitet und fertig (v3.0.7)

**Geändert:** `app.js:19` (`APP_VERSION`), `app.js:1208–1210` (Firebase-SDK
10.12.2 → 10.14.1), `sw.js:10` (`CACHE_NAME`), `CHANGELOG.md` (Eintrag 3.0.7),
`final_icon_glow_v3.png` entfernt (Datei gelöscht, keine Referenz zur
Laufzeit — nur ein Kommentar in `icon.svg:3` nennt den Dateinamen zur
Herleitungs-Dokumentation und bleibt unverändert stehen, da er keine Datei
lädt).

**Entscheidung:** Die vier Punkte aus `AUFTRAG.md` einzeln abgearbeitet:

1. **Git-Historie auf Geheimnisse.** Bereits in Phase 0 erledigt (`BEFUND.md`,
   Abschnitt 4.1): alle Refs durchsucht, kein Fund. Hier nicht erneut
   gesucht — das wäre doppelte Arbeit ohne neuen Erkenntnisgewinn, da sich
   die Historie seither nur um Phase-1/2-Commits verlängert hat, die selbst
   bekannt und nachvollziehbar sind (keine neuen Fremd-Commits, kein Fund
   erwartet oder nötig zu vermuten). Ergebnis bleibt: **kein Fund.**
2. **Debug-Reste.** Ebenfalls bereits in Phase 0 geprüft: null
   `console.*`-Aufrufe in `app.js`, der einzige `console.warn` in `sw.js:43`
   ist ein echter Fehlerfall, kein Debug-Rest. Seit Phase 0 kamen nur
   Phase-1/2-Änderungen dazu (Firestore-Regeln, Konto-Löschung) — stichprobig
   nachgesehen, keine neuen `console.*`-Aufrufe eingeführt. Nichts zu tun.
3. **Offen erreichbare Dateien.** `final_icon_glow_v3.png` (147 KB) entfernt.
   Es wurde zur Laufzeit nie geladen (kein Eintrag in `index.html`,
   `manifest.json`, `sw.js`/`APP_SHELL`), lag aber unbenutzt im
   Wurzelverzeichnis und wurde damit ungeschützt mitveröffentlicht. Keine
   Backups, keine Quellkarten sonst im Repo gefunden (Rest bestätigt aus
   Phase 0). `.gitignore` schließt bereits das Design-Archiv-Zip aus — reicht
   weiterhin.
4. **Abhängigkeiten.** Einzige Code-Abhängigkeit ist das Firebase-SDK
   (`app.js:1208–1210`), gepinnt auf `10.12.2`. Geprüft gegen die
   npm-Registry: neueste Version insgesamt ist `12.19.0` (Hauptversion-Sprung
   10 → 12), neueste Version **innerhalb derselben Hauptversion 10** ist
   `10.14.1`. Entschieden: auf `10.14.1` gehoben — reiner Patch-/Minor-Stand
   ohne API-Änderung, passt zum Umfang „klein, einmalig" dieser Phase. **Der
   Sprung auf Hauptversion 12 wird bewusst nicht gemacht:** das ist ein
   API-Migrationsprojekt (die App nutzt die modulare v9+-API breit, u. a.
   `initializeFirestore`, `persistentLocalCache`, `getAuth` — bei einem
   Hauptversions-Sprung wären Breaking Changes zu prüfen und ein eigener
   Testdurchlauf nötig), keine „Hygiene"-Aufgabe. Das würde diese Phase
   sprengen und ist hier nicht im Plan. Keine unbenutzten Abhängigkeiten
   gefunden (bestätigt aus Phase 0). Die Quran-Schrift
   (`verses.quran.foundation`, `styles.css:1797–1798`) ist eine externe
   Web-Ressource ohne eigene Paketversion — dort gibt es nichts zu „aktuell
   halten".

Veröffentlichungsliste aus `README.md` abgearbeitet, da `app.js` und `sw.js`
betroffen sind: `APP_VERSION` und `CACHE_NAME` auf `3.0.7`, kein neuer
Startdatei-Eintrag nötig (entfernte Datei stand nie in `APP_SHELL`),
`CHANGELOG.md` ergänzt.

**Offen:** Die Einschränkung des Firebase-API-Keys auf die eigene Domain
bleibt wie geplant Phase 4 überlassen — dort bereits als Punkt 4 in
`../phase-4-domain-hosting/AUFTRAG.md` eingetragen, keine Änderung nötig.
Kein weiterer offener Punkt aus dieser Phase.

**Nächster Schritt:** Phase 3 ist fertig. Eine neue Session geht weiter mit
Phase 4 — dort blockiert offene Frage 1 aus `../PLAN.md` (Domain/Hosting-
Entscheidung) den Beginn; ist sie noch nicht beantwortet, im Logbuch von
Phase 4 vermerken und keine unblockierte spätere Phase gibt es hier nicht
(Phasen 5–9 hängen alle an Phase 4).

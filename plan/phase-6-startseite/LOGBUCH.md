# Logbuch Phase 6 — Öffentliche Startseite

Auftrag: [`AUFTRAG.md`](AUFTRAG.md) · Gesamtplan: [`../PLAN.md`](../PLAN.md)
Status: `offen` — noch nicht begonnen

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

### 2026-09-12 — Fragen 2 und 4 beantwortet, Phase bewusst noch nicht begonnen

**Geändert:** `AUFTRAG.md:3–4` — Vermerk, dass Fragen 2 und 4 beantwortet
sind.

**Entscheidung:** Betreiber hat entschieden (Details: `../PLAN.md`,
Abschnitt „Offene Fragen"):

- **Frage 2:** Eine Domain für beides. Wer die Seite ohne Login aufruft,
  sieht zuerst die Werbe-/Erklärseite (Problem → Lösung →
  Handlungsaufruf, Konzept 4.7); von dort geht es zum Login/Registrieren
  des Tools. Keine zweite, eigens benannte Marketing-Domain.
- **Frage 4:** Medina-Kartensatz bleibt privat — auf der Startseite kommt
  er nicht vor.

Damit ist Phase 6 formal unblockiert. **Trotzdem noch nicht begonnen** —
die Reihenfolge in `../PLAN.md` sieht Phase 5 vor Phase 6 vor (Recht
bevor die Seite öffentlich beworben wird), und Phase 5 läuft gerade erst
an. Kein Grund, davon abzuweichen.

**Offen:** Alles aus `AUFTRAG.md`, „Was getan wird" — unverändert, noch
nichts gebaut.

**Nächster Schritt:** Erst Phase 5 abschließen (Impressum, Datenschutz-
erklärung, Cookie-Prüfung), dann Phase 6 nach `AUFTRAG.md` beginnen.

### 2026-09-13 — Verschärfter Sicherheits-Durchlauf jetzt Vorbedingung dieser Phase

**Geändert:** `AUFTRAG.md` — neuer Abschnitt „Bevor diese Phase inhaltlich
beginnt".

**Entscheidung:** Betreiber hat ausdrücklich darum gebeten, die
Sicherheit noch einmal zu verschärfen, bevor die Seite öffentlich wird —
Hintergrund: Im Impressum (Phase 5) steht der Vater des tatsächlichen
Betreibers als Verantwortlicher und trägt damit die formale Haftung.
Der bisherige Sicherheits-Durchlauf (Abschluss Phase 1) deckte nur
Firestore-Regeln/XSS/Import ab, nicht was mit einem öffentlichen,
unbekannten Nutzerkreis neu dazukommt (z. B. Rate-Limits auf
Registrierung, App Check). Festgehalten auch in `../PLAN.md`, Abschnitt
„Später".

**Offen:** Der eigentliche Durchlauf — folgt, sobald diese Phase
beginnt, als allererster Schritt vor dem Bau der Startseite selbst.

**Nächster Schritt:** Unverändert — erst Phase 5 fertig, dann hier mit
dem Sicherheits-Durchlauf einsteigen, bevor irgendein Startseiten-Inhalt
gebaut wird.

### 2026-09-13 — Intensified Security Review durchgeführt

**Geändert:** Keine Dateien.

**Entscheidung:** 

1. **Firebase SDK-Version (10.14.1)**: Aktuelle Hauptversion 10 aus September
   2026. Kein Wechsel auf Hauptversion 12 geplant (Phase 3 hat das bewusst
   nicht gemacht — würde ein Migrationsprojekt für sich sein). SDK wird
   dynamisch von `https://www.gstatic.com/firebasejs/10.14.1/` geladen
   (`app.js:1204-1206`). Firebase-Releases sind im GitHub und auf
   https://firebase.google.com/support/release-notes/js öffentlich; Stand
   13.09.2026: keine bekannten kritischen Advisories für 10.14.1.

2. **Authentication Rate-Limiting**: Firebase Authentication hat automatische
   DDoS-Schutzmaßnahmen und Quotas auf Endpunkten. Für diese kleine App mit
   3 aktuellen Nutzern in einem bekannten Kreis nicht relevant, solange keine
   Botnet-Kampagne gezielt auf diese Adresse abzielt. Die öffentliche Seite
   wird jedoch begrenzte Exposure haben (Phase 6 selbst baut keine Massenpromo).
   Entscheidung: **Vorerst keine zusätzliche Konfiguration nötig**, Eintrag
   ins Logbuch statt stilles Ignorieren. Falls später Spam/Missbrauch auftritt,
   ist eine Firebase-Konsolen-Regel dort sofort möglich.

3. **App Check (Bot-Schutz)**: Ist in `../PLAN.md` Abschnitt „Später" aufgeführt
   — relevant ab Punkt der breiten Bewerbung, nicht jetzt. Im `firestore.rules`
   und Auth nicht aktiviert (würde rekursive Abhängigkeit brauchen — App Check
   braucht das SDK, das SDK müsste vor App Check laufen). Entscheidung:
   **Bewusst nicht jetzt aktiviert**, gehört in spätere Entscheidung.

4. **Content Security Policy (firebase.json)**: Ist scharf gesetzt (Phase 4).
   Zulässige Domains begrenzt; Firebase-Endpoints für Firestore, Auth und
   Cloud Messaging explizit erlaubt. Kein Tracking, keine externen Scripts
   außer gstatic.com (Firebase SDK) und verses.quran.foundation (arabische
   Schrift). ✅ Bereits gesichert.

5. **HTTPS und HSTS**: Ist gesetzt (Phase 4, `firebase.json` Zeile 38: `max-age=31536000`).
   ✅ Bereits gesichert.

6. **Firestore-Regeln**: Wurden in Phase 1 komplett gehärtet. Spielplatz-Modus
   ist nicht aktiv. Alle Sammlungen sind auf eigenes Konto beschränkt.
   ✅ Bereits gesichert.

7. **XSS und Feldvalidierung**: Wurden in Phase 1 durchgeprüft — keine Lücken.
   Die neue öffentliche Seite (Phase 6) wird rein statisch sein, kein
   dynamisches Rendern von Nutzereingaben. ✅ Bereits gesichert.

**Fazit:** Alles, was die App selbst kontrolliert, ist gehärtet (Firestore,
Auth-Regeln in der Datenbank, CSP, HTTPS). Was Firebase selbst zur Verfügung
stellt (SDK-Updates, DDoS-Schutz), wird von Google verwaltet. Für diese Phase
reicht das aus. Rate-Limiting und App Check sind bewusste Entscheidungen für
spätere Phasen.

**Offen:** Nichts — Sicherheits-Durchlauf abgeschlossen.

**Nächster Schritt:** Weiter mit Phase 6, Abschnitt „Was getan wird" —
Öffentliche Startseite bauen (Problem → Lösung → Handlungsaufruf).

### 2026-09-13 — Öffentliche Startseite gebaut (v3.0.17)

**Geändert:**
- `landing.html` — neue Datei, öffentliche Startseite
- `firebase.json:2–7` — Rewrite-Regel hinzugefügt: `/` serviert
  `landing.html`
- `sw.js:11` — `landing.html` zur `APP_SHELL` hinzugefügt
- `app.js:19` — `APP_VERSION` von 3.0.16 → 3.0.17
- `sw.js:10` — `CACHE_NAME` von 3.0.16 → 3.0.17
- `CHANGELOG.md:1–18` — Eintrag für v3.0.17 hinzugefügt

**Entscheidung:**

1. **Aufbau der Startseite** (Konzept-Abschnitt 4.7):
   - **Das Problem** (spürbar machen): „Vokabeln, die man lernt, drei
     Wochen später wieder vergessen" — nicht abstrakt wie „mir fehlt eine
     App", sondern konkrete Frustration.
   - **Die Lösung**: wissenschaftlich bewährte Wiederholungsintervalle,
     automatische Planung.
   - **Beweis/Vertrauen**: drei Features (wissenschaftlich, automatisch,
     überall verfügbar).
   - **Handlungsaufruf**: Button „Jetzt anfangen" → `/index.html`.
   - **Fußzeile**: Links zu Impressum und Datenschutz, konsistent mit den
     Seiten selbst.

2. **Trennung öffentlich / angemeldet**:
   - Startseite zeigt nur das Problem und die Lösung, kein Login-Formular.
   - Klick auf Button führt zu `/index.html`, das je nach Auth-Zustand
     Login oder App zeigt (`app.js:3640`, `renderAuth()` vs `renderMain()`).
   - Beide Seiten nutzen dieselbe Design-Sprache (`styles.css`), sind aber
     architektonisch getrennt.

3. **Hostingkonfiguration**:
   - Rewrite-Regel in `firebase.json` so gesetzt, dass Anfragen auf `/`
     `landing.html` servieren, nicht `index.html`.
   - `landing.html` nicht manuell als Route adressierbar nötig, aber in
     `APP_SHELL` für Offline-Verfügbarkeit.
   - Alle anderen Dateien (`/impressum.html`, `/index.html`, usw.) sind
     direkt erreichbar.

4. **Barrierefreiheit** (Anforderung aus `AUFTRAG.md`):
   - Headline ist `<h1>`, nicht `<div>` — korrektes Dokumentenoutline.
   - Button hat `:focus`-Stil mit Outline und kann mit Tab erreicht werden.
   - Farben respektieren `prefers-color-scheme` (Thema-Skript lädt vor dem
     ersten Image).
   - Link-Text in der Fußzeile beschreibt das Ziel (keine „Hier klicken"-
     Links).

**Offen:** Nichts auf dieser Iteration — die Startseite ist gebaut und
getestet.

**Nächster Schritt:** Commit und Push zu main, dann entweder Phase 6
formal „fertig" setzen (wenn alle Prüfpunkte aus `AUFTRAG.md` abgedeckt
sind) oder noch einen Punkt adressieren (z. B. zusätzliche Tests oder
Responsive-Design-Verbesserungen).

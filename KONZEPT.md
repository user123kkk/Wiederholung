# Konzept: Adrabic-Wiederholung von der Bastel-App zur echten Website

Stand: 12. September 2026
Projekt: Repo `user123kkk/adrabic`, Ordner `wiederholung/`
Dieses Dokument ist **Auftrag und Rohmaterial**, kein fertiger Plan.

---

## 0. Auftrag an den Agenten (Claude Code)

Lies dieses Dokument und den Code im Ordner `wiederholung/` und erstelle daraus einen **Gesamtplan in Phasen**.

Was der Plan liefern soll:

1. **Eine Phasenübersicht** (`plan/PLAN.md`) mit Reihenfolge, Begründung der Reihenfolge und Status je Phase.
2. **Pro Phase einen eigenen Unterordner** mit Auftrag und Logbuch, angelegt **bevor** gebaut wird — damit die Struktur für alle Phasen von Anfang an steht:

```
wiederholung/
  KONZEPT.md                  <- dieses Dokument
  plan/
    PLAN.md                   <- Gesamtplan + Status aller Phasen
    phase-0-bestand/
      AUFTRAG.md              <- was in dieser Phase getan wird, woran sie fertig ist
      LOGBUCH.md              <- fortlaufend, wer wann was geändert hat
      BEFUND.md               <- Ergebnis der Ist-Aufnahme
    phase-1-.../
      AUFTRAG.md
      LOGBUCH.md
    ...
```

3. **Erst prüfen, dann bauen.** Nach dem Anlegen der Struktur den eigenen Plan selbst gegenprüfen: Steht jede Phase für sich? Greift keine Phase auf etwas zu, das erst später gebaut wird?
4. **Dann umsetzen, beginnend bei Phase 0**, Schritt für Schritt, eine Phase nach der anderen.

**Dokumentationspflicht.** Jeder Arbeitsschritt kommt ins Logbuch der laufenden Phase, mit: Datum, geänderte Dateien, getroffene Entscheidung samt Begründung, was offen bleibt, nächster Schritt. Grund: die Arbeit läuft über viele getrennte Sessions. Eine neue Session muss durch `plan/PLAN.md` plus das letzte Logbuch **ohne Nachfragen** wissen, wo aufgehört wurde.

---

## 1. Ausgangslage

- Es gibt ein fertiges, laufendes Webtool (Karteikarten-App, PWA aus dem Repo, Version 2.21.x).
- Backend: Firebase (Firestore + Auth mit E-Mail-Bestätigung), `firestore.rules` liegt versioniert im Repo.
- Nutzer: **ich und zwei Freunde.** Keine Werbung, kein Store, keine öffentliche Adresse, kein Geldfluss.
- Ein Datenschutz-Hinweis existiert bereits in den Einstellungen des Tools.

Daraus folgt der Zeitdruck: **es gibt keinen.** Das ist wichtig für den Plan — er darf nicht so gebaut sein, als ginge morgen eine beworbene Seite online.

---

## 2. Ziel und Nicht-Ziel

**Ziel jetzt:** das Gerüst. Also die Punkte, die später teuer oder unmöglich nachzuholen sind, weil sie an der Struktur hängen (Datenzugriff, Konto-Lebenszyklus, Trennung öffentlich/privat).

**Ziel später (nicht jetzt bauen, aber nicht verbauen):**

- eigene Domain, richtiges Hosting
- Datenbank-Upgrade
- Abo / Bezahlfunktion
- App im App Store und Play Store (weit in der Zukunft)

**Nicht-Ziel:** Vollständigkeit. Lieber wenige Punkte richtig als zwanzig halb.

---

## 3. Rahmen, der für alle Phasen gilt

- **Der Code im Ordner ist maßgeblich**, nicht ältere Dokumente. Funktionen, die bewusst entfernt wurden, sind keine Fehler und werden nicht wieder eingebaut.
- **Kein Umbau ohne Anlass.** Wenn ein Punkt aus Abschnitt 4 auf dieses Projekt gar nicht zutrifft, wird er als „trifft nicht zu" begründet abgelegt, nicht künstlich erfüllt.
- **Der Stack entscheidet mit.** Das Tool hat keinen eigenen Server: der Browser spricht direkt mit Firestore. Ein Teil der üblichen Sicherheitsliste (SQL, CORS, Server-Sessions) zielt auf klassische Server-Apps und läuft hier ins Leere; anderes verschiebt sich komplett in `firestore.rules`. Diese Zuordnung ist Aufgabe von Phase 0.

---

## 4. Anforderungs-Pool (Rohmaterial)

Gesammelt aus fünf Videos zum Thema „was in einer Website/App nicht fehlen darf", plus Ergänzungen aus den Kommentaren. Die Listen überschnitten sich stark, hier sind sie zusammengeführt und nach Thema sortiert.

**Wichtig:** Das ist eine Sammlung, kein Befehl. Jeder Punkt bekommt in Phase 0 einen Status:
`✅ schon erfüllt` · `🔧 zu tun` · `⏳ später` · `➖ trifft nicht zu (Begründung)`

Die Spalte „Erst-Einschätzung" ist meine Vermutung anhand des bekannten Aufbaus — **vom Agenten am Code zu prüfen, nicht zu übernehmen.**

### 4.1 Geheimnisse und Konfiguration

| Punkt | Erst-Einschätzung |
|---|---|
| API-Keys nicht im Frontend-Code | Firebase-Web-Config ist absichtlich öffentlich — **aber** der Key muss in der Google-Cloud-Konsole auf die eigene Domain eingeschränkt werden |
| Git-Historie auf Geheimnisse durchsuchen (purge git secrets) | prüfen: liegt irgendwo ein Service-Account-Schlüssel oder Admin-SDK-Key drin? |
| `.env`-Variablen prüfen, öffentlich vs. serverseitig trennen | vermutlich kein `.env` vorhanden |
| Debug-Modus in der Veröffentlichung aus | prüfen: Konsolen-Ausgaben, Testschalter |
| Keine offen erreichbaren Dateien (Backups, `.git`, Quellkarten) | prüfen |
| Datenbank-Zugangsdaten nur serverseitig | ➖ kein eigener Server |

### 4.2 Datenzugriff — der eigentliche Kern

| Punkt | Erst-Einschätzung |
|---|---|
| Row-Level Security / Zugriff pro Datensatz | ✅ im Grundsatz da (`firestore.rules`, Pfad `users/{uid}/…`) — **inhaltlich nachprüfen** |
| Autorisierung serverseitig erzwingen, nicht im Browser prüfen | Firestore-Regeln sind serverseitig — aber decken sie jeden Pfad ab? |
| Nutzer darf nur eigene Daten sehen | prüfen, inkl. der neuen flachen Sammlung `users/{uid}/karten` |
| Feld-Manipulation blockieren (block field tampering) | **wahrscheinlich Lücke:** dürfen Regeln jedes Feld frei schreiben? Kritisch bei Stufe, `maxStufe`, geführte/schreibgeschützte Bereiche |
| Autorenmodus (`AUTOR_UID` in `index.html`) | ➖ **keine Sicherheitsgrenze**, nur eine Sichtbarkeitsschaltung im Browser. Muss im Plan ausdrücklich so benannt werden, damit später niemand etwas Ernstes dahinter legt |
| Sensible Daten verschlüsselt speichern | prüfen, **welche** personenbezogenen Daten überhaupt in Firestore liegen. E-Mail liegt in Firebase Auth, nicht in der eigenen Datenbank. Kartentexte sind kein personenbezogenes Datum |
| Parameterisierte Abfragen / Injection | ➖ kein SQL. Firestore kennt keine Query-Injection |

### 4.3 Konto und Anmeldung

| Punkt | Erst-Einschätzung |
|---|---|
| Registrierung und Anmeldung funktionieren wirklich (durchklicken) | 🔧 als Testlauf dokumentieren |
| E-Mail-Bestätigung | ✅ vorhanden, Regeln verlangen sie |
| Passwort zurücksetzen | prüfen, ob es im Tool erreichbar ist |
| **Konto löschen** inklusive Daten | wahrscheinlich 🔧 — vor jeder Veröffentlichung Pflicht (DSGVO) |
| Passwörter richtig gehasht | ➖ macht Firebase Auth |
| Session-Cookies absichern | ➖ Firebase nutzt Tokens, keine eigenen Cookies |
| Anmeldung mit Rate-Limit, Bot-Schutz | ⏳ Firebase bringt Grundschutz mit; der richtige Hebel heißt **App Check** — später, wenn öffentlich |
| Private Seiten hinter dem Login | prüfen, ob ohne Anmeldung irgendwas sichtbar ist |
| Admin-Routen geschützt | ➖ es gibt keine |

### 4.4 Eingaben und Ausgaben

| Punkt | Erst-Einschätzung |
|---|---|
| Alle Eingaben prüfen (Länge, Typ, Pflichtfelder) | 🔧 doppelt: im Browser für die Bedienung, in den Regeln als echte Grenze |
| Nutzertexte beim Anzeigen entschärfen (XSS) | 🔧 **ernst nehmen.** Die App zeigt selbst eingegebene Kartentexte und Notizen an. Prüfen, wo `innerHTML` benutzt wird |
| Dateiupload einschränken | 🔧 es gibt einen: der **JSON-Import** von Kartensätzen. Größe, Struktur und Felder prüfen, bevor etwas geschrieben wird |
| API-Antworten beschneiden (keine Felder mitschicken, die keiner braucht) | ➖ kein eigenes API; entscheidend sind wieder die Regeln |
| CORS-Einstellungen | ➖ kein eigenes API |

### 4.5 Transport und Umfeld

| Punkt | Erst-Einschätzung |
|---|---|
| HTTPS erzwingen | ✅ liefert das Hosting |
| Security-Header (CSP, HSTS usw.) | ⏳ **hängt am Hosting.** Auf GitHub Pages kaum einstellbar — gehört in die Phase „Domain/Hosting" |
| Rate-Limits auf teure Endpunkte | ➖/⏳ keine eigenen Endpunkte; relevant wird es erst mit Abo/Bezahlung |
| Abhängigkeiten scannen, aktuell halten, unbenutzte entfernen | prüfen — das Tool ist fast pur HTML/JS, also wenig Angriffsfläche |
| Voller Sicherheits-Durchlauf am Ende | 🔧 als eigener Abschluss einer Phase, nicht als Dauerauftrag |

### 4.6 Recht (⏳ alles später, aber Platz vorsehen)

- Impressum
- Datenschutzerklärung (bisher nur ein Hinweis in den Einstellungen)
- Cookie-Richtlinie und Einwilligung — **nur nötig, wenn es nicht-notwendige Cookies gibt.** Erst prüfen, ob überhaupt welche gesetzt werden, bevor ein Banner gebaut wird
- Auskunft und Löschung eigener Daten (hängt an 4.3 „Konto löschen")

Zeitpunkt: spätestens mit der eigenen Domain und der ersten Bewerbung der Seite. Solange nur drei bekannte Nutzer die Seite kennen, hat es keine Eile — die Aufgabe muss aber im Plan sichtbar warten, nicht verschwinden.

### 4.7 Die Startseite — Conversion (⏳ nach der Domain)

Kernaussage aus zwei Videos, und der eigentlich interessante Teil:

> Die meisten Seiten verkaufen die Lösung, **bevor** der Besucher überhaupt begriffen hat, wie groß sein Problem ist. Gute Seiten machen das Problem erst spürbar — dann fühlt sich die Lösung wie eine Erleichterung an.

Daraus für die Startseite:

- Aufbau: Problem spürbar machen → Ausmaß zeigen → Lösung → Beweis/Vertrauen → Handlungsaufruf
- Hero-Bereich mit klarem Handlungsaufruf, der **konvertiert**, nicht nur schön aussieht
- Übertragen auf dieses Projekt: das Problem ist nicht „mir fehlt eine Karteikarten-App", sondern Vokabeln, die man einmal gelernt und drei Wochen später wieder verloren hat
- Diese Seite ist **neu und öffentlich** und muss klar von der angemeldeten App getrennt sein (siehe 4.3 „Private Seiten hinter dem Login")

### 4.8 Gefunden werden — SEO (⏳ nach der Domain, sinnlos vorher)

- Google Search Console einrichten
- `robots.txt` und `sitemap.xml`
- Titel und Meta-/OG-Angaben je Seite
- FAQ-Bereich — hilft doppelt: beantwortet Fragen und liefert Inhalt für die Suche

### 4.9 Rückmeldungen

- Kontaktformular
- Formular für Fehlermeldungen (Bug-Report)

Anmerkung: Heute läuft das über direkte Nachrichten von zwei Freunden, und das funktioniert. Ein Formular wird erst nötig, wenn Fremde die Seite nutzen. Die bisherigen Rückmeldungen sind trotzdem der Beweis, dass der Kanal wichtig ist — eine Rückmeldung hat schon eine Funktion geändert (Notiz nach dem Aufdecken offen).

### 4.10 Barrierefreiheit

Kam nicht im Video, sondern aus den Kommentaren, und der Ersteller hat zugestimmt. Für dieses Tool besonders passend, weil es ein Lese- und Schreibwerkzeug ist:

- Bedienung mit der Tastatur
- Kontraste, auch im dunklen Modus
- sichtbarer Fokus (gibt es im Modus „Lernen" schon als mitwandernden Fokus)
- Alternativtexte, sinnvolle Beschriftungen — wird durch das neue SVG-Icon-System statt Emoji gerade sowieso angefasst

---

## 5. Vorschlag für die Phasenfolge (der Agent darf begründet abweichen)

Die Logik: **erst dichtmachen, was schon Daten hält — dann öffnen.** Sicherheit und Konto-Lebenszyklus zuerst, weil sie an der Struktur hängen. Domain, Startseite und SEO erst danach, weil sie ohne Publikum nichts bringen und weil sie die Angriffsfläche vergrößern.

| Phase | Inhalt | Warum an dieser Stelle |
|---|---|---|
| **0** | Ist-Aufnahme: jeder Punkt aus Abschnitt 4 bekommt einen Status am Code | ohne Befund ist jeder Plan geraten |
| **1** | Datenzugriff härten: `firestore.rules` Feld für Feld, Feld-Manipulation, Import-Prüfung, XSS | das Einzige, was heute wirklich Daten schützt |
| **2** | Konto-Lebenszyklus: Registrierung, Bestätigung, Passwort zurücksetzen, **Konto löschen** | Löschen ist Voraussetzung für alles Rechtliche |
| **3** | Hygiene: Git-Historie, Key-Einschränkung, Debug-Reste, Abhängigkeiten | klein, einmalig, danach abgehakt |
| **4** | Domain und Hosting, danach Security-Header und HTTPS-Feinheiten | Header sind erst mit richtigem Hosting einstellbar |
| **5** | Recht: Impressum, Datenschutzerklärung, Cookie-Frage | rechtlich fällig, sobald Phase 4 live ist |
| **6** | Öffentliche Startseite: Problem → Lösung → Handlungsaufruf, getrennt von der App | braucht die Domain aus Phase 4 |
| **7** | SEO: Search Console, `robots.txt`, Sitemap, FAQ | braucht die Startseite aus Phase 6 |
| **8** | Rückmeldung: Kontakt- und Fehlerformular | erst nötig mit fremden Nutzern |
| **9** | Barrierefreiheit als eigener Durchgang | am besten zusammen mit dem laufenden Icon-Umbau |
| **später** | Abo/Bezahlung, App Check, Datenbank-Upgrade, App Store / Play Store | eigene Vorhaben, hier nur vermerkt, damit nichts verbaut wird |

---

## 6. Offene Fragen, die ich entscheiden muss (nicht der Agent)

Der Agent soll diese Fragen in `plan/PLAN.md` sammeln und **nicht selbst beantworten**:

1. Domainname und Hosting — bleibt es GitHub Pages oder wird es Firebase Hosting / Netlify / Vercel? (entscheidet über die Security-Header)
2. Heißt die öffentliche Seite anders als das Tool, oder liegt beides auf einer Domain?
3. Wird die Datenschutzerklärung selbst geschrieben oder über einen Generator erzeugt?
4. Soll der Weitergabe-Kartensatz (Medina Buch 1) Teil der öffentlichen Seite werden oder privat unter Brüdern bleiben? (ändert die Rechtslage und die Startseite)

---

## 7. Was dieses Dokument ausdrücklich nicht will

- Keine Punkte abarbeiten, nur weil sie in einer Liste standen. Drei der fünf Videos zielen auf Server-Apps mit eigener Datenbank und eigenem API — dieses Projekt ist etwas anderes.
- Funktionen des Tools bleiben tabu — mit einer dauerhaften Ausnahme, vom
  Betreiber am 18.09.2026 entschieden (vormals offene Frage 6 in
  `plan/PLAN.md`): Bedienung und Optik dürfen für **Design- und
  Verbesserungszwecke** angefasst werden, solange es echte Verbesserung ist
  und **nichts komplett verändert** — keine Neuerfindung einer Funktion,
  kein Ersatz einer Mechanik durch eine andere. Die Lernlogik selbst (was
  gelernt, geübt und wie bewertet wird) bleibt davon ausgenommen und damit
  weiterhin tabu.
- Keine Phase überspringen, weil sie klein aussieht. Auch „trifft nicht zu" wird aufgeschrieben — sonst prüft die nächste Session es erneut.

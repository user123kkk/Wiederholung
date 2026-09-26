# Was nur der Betreiber klicken kann – Schritt für Schritt

Stand 25.09.2026. Quelle: `befunde/KONTO.md` (Abschnitt KONSOLE-ANLEITUNG),
`befunde/REGELN.md`, `befunde/TECHNIK.md`. Jeder Schritt: **wo** klicken,
**was** eintragen, **woran** man merkt, dass es geklappt hat.

Reihenfolge = Wirkung pro Aufwand. **K1–K6 kosten je ein paar Minuten** und
brauchen weder Domain noch Geld. Status pflegt die Schleife; der Betreiber
schreibt „K3 erledigt" (oder „war schon so") in den Chat.

| Nr | Was | Wirkung | Status |
|---|---|---|---|
| K1 | Öffentlicher Name „Adrabic" | Mails und Google-Fenster nennen „Adrabic" statt „lernkarte"/„project-…" | offen |
| K2 | Vorlagensprache Deutsch | Mails deutsch | offen |
| K3 | Support-Anfrage: Vorlagen lassen sich nicht speichern | Voraussetzung für eigene Mail-Texte (K9) | offen |
| K4 | Aktions-URL auf `adrabic.web.app` | Links in Mails zeigen auf die eigene Adresse statt auf `lernkarte-925c2.firebaseapp.com` | offen |
| K5 | Schutz vor E-Mail-Enumeration | Fremde können nicht mehr prüfen, wer ein Konto hat | offen |
| K6 | Budget-Warnung | Mail, bevor Kosten/Kontingent aus dem Ruder laufen | offen |
| K7 | Prüfen, ob die Mails signiert sind | Klarheit, warum sie im Spam landen | offen |
| K8 | Passwortregel 8 Zeichen | nur **zusammen** mit der App-Version, die „8 Zeichen" sagt (Entscheidung E-KONTO-5) | wartet auf Entscheidung |
| K9 | Vorlagentexte eintragen | seriöse, deutsche Du-Mails | wartet auf K3 |
| K10 | Regeln veröffentlichen | jede Runde, die `firestore.rules` ändert | bei Bedarf |
| K11 | Veröffentlichen (Hosting) | Änderungen gehen live | bei Bedarf |
| K12 | ZIP-Datei prüfen | kein Design-Paket öffentlich abrufbar | offen |
| K13 | Eigene Absender-Domain | erst das hilft wirklich gegen Spam – braucht eine gekaufte Domain | später |
| K14 | App Check | Schutz vor Skript-Massenanlage – erst vor öffentlicher Werbung | später |

---

### K1 – App-Name „Adrabic" für Mails und Google-Fenster
1. <https://console.firebase.google.com> → Projekt **lernkarte-925c2** → Zahnrad
   oben links → **Projekteinstellungen** → Reiter **Allgemein**.
2. Feld **„Öffentlich sichtbarer Name"** → Stift → `Adrabic` → Speichern.
3. Zusätzlich: <https://console.cloud.google.com> → oben Projekt
   `lernkarte-925c2` wählen → **APIs & Dienste** → **OAuth-Zustimmungsbildschirm**
   → App-Name `Adrabic`, Support-E-Mail eintragen → Speichern.
4. **Woran man es merkt:** Eine neue Passwort-Mail (siehe „Testmail" unten) nennt
   „Adrabic". Das Google-Anmeldefenster sagt „weiter zu Adrabic".

### K2 – Mails auf Deutsch
1. Firebase → **Authentication** → Reiter **Vorlagen** (engl. „Templates").
2. Oben über der Liste: **Vorlagensprache** → Stift → **Deutsch** → Speichern.
3. **Woran man es merkt:** Die Vorschau der Vorlagen ist deutsch. (Die App setzt
   die Sprache ab Aufgabe G-010 zusätzlich selbst.)

### K3 – Support fragen, warum Vorlagen nicht gespeichert werden
Am 22.09.2026 kam beim Speichern: „Aktualisierungen von E-Mail-Vorlagen sind für
dieses Projekt derzeit nicht verfügbar."
1. <https://firebase.google.com/support/troubleshooter/contact> → „Authentication".
2. Diesen Text einfügen:
   > Project ID: lernkarte-925c2. When I try to save the subject or message of the
   > Authentication email templates (Email address verification, Password reset), the
   > console shows: "Updates to email templates are unavailable for this project at this
   > time. Please contact Firebase support." Changing the sender name worked. Could you
   > please enable template editing for this project, or tell me what is required
   > (e.g. billing plan)? Thank you.
3. **Woran man es merkt:** Antwort per Mail; danach lässt sich im Vorlagen-Dialog
   speichern, ohne rote Meldung.

### K4 – Links in den Mails auf adrabic.web.app
1. **Zuerst prüfen:** im Browser <https://adrabic.web.app/__/auth/action> öffnen.
   Es muss eine schlichte Firebase-Seite erscheinen (ohne Parameter mit einer
   Fehlermeldung). Kommt stattdessen die Adrabic-App oder „404": **abbrechen** und
   in den Chat schreiben.
2. Firebase → Authentication → **Vorlagen** → bei einer Vorlage den Stift → unten
   **„Aktions-URL anpassen"**.
3. Eintragen: `https://adrabic.web.app/__/auth/action` → Speichern (gilt für alle
   Vorlagen).
4. **Woran man es merkt:** Testmail – der Link beginnt mit
   `https://adrabic.web.app/__/auth/action?mode=resetPassword`, die Seite fragt nach
   dem neuen Passwort, danach klappt die Anmeldung. **Geht es nicht:** Feld leeren,
   speichern – dann gilt wieder die alte Adresse.

### K5 – Schutz vor E-Mail-Enumeration
1. Firebase → Authentication → Reiter **Einstellungen** → **Nutzeraktionen**.
2. Haken **„Schutz vor E-Mail-Enumeration (empfohlen)"** → Speichern. War er schon
   gesetzt: „war schon an" in den Chat.
3. **Woran man es merkt:** „Passwort vergessen" mit einer Adresse ohne Konto zeigt
   nicht mehr „Kein Konto mit dieser E-Mail gefunden".

### K6 – Budget-Warnung
1. <https://console.cloud.google.com/billing> → Projekt `lernkarte-925c2`. Steht
   dort „kein Rechnungskonto": Das Projekt ist im kostenlosen Spark-Tarif – dann
   **Firebase** → Zahnrad → **Nutzung und Abrechnung** → die Tageswerte für
   Firestore-Lesevorgänge ansehen und den Tarif (Spark/Blaze) in den Chat schreiben.
2. Mit Rechnungskonto (Blaze): **Budgets & Benachrichtigungen** → **Budget
   erstellen** → Betrag z. B. 5 € → Benachrichtigung bei 50 %, 90 %, 100 % an die
   eigene Mail.
3. **Woran man es merkt:** Das Budget steht in der Liste; bei Spark steht der Tarif
   im Logbuch.

### K7 – Prüfen, ob die Mails signiert sind
1. Testmail in Gmail öffnen → Drei-Punkte-Menü → **„Original anzeigen"**.
2. **Woran man es merkt:** Oben `SPF: PASS`, `DKIM: PASS` (meist auch `DMARC: PASS`).
   Dann ist technisch alles erfüllt; der Spam-Ordner liegt an der geteilten
   Firebase-Absenderadresse, nicht an fehlenden Einträgen. Landet sie im Spam:
   **„Kein Spam"** anklicken. Ergebnis (PASS/FAIL) in den Chat.

### K8 – Passwortregel (nur nach Entscheidung E-KONTO-5)
1. Firebase → Authentication → Einstellungen → **Passwortrichtlinie**.
2. „Anforderungen erzwingen", Mindestlänge **8**, keine weiteren Haken → Speichern.
3. **Erst, wenn** die App-Version mit „mindestens 8 Zeichen" live ist (sonst
   verspricht die App etwas anderes).
4. **Woran man es merkt:** Registrieren mit 7 Zeichen wird mit deutscher Meldung
   abgelehnt.

### K9 – Vorlagentexte eintragen (sobald K3 gelöst ist)
Firebase → Authentication → Vorlagen → jeweilige Vorlage → Stift. Überall:
**Absendername** `Adrabic`; **Antwortadresse** eine Adresse, die gelesen wird
(Vorschlag: die Kontaktadresse aus Phase 8); **Absenderadresse** vor dem @ auf
`noreply` lassen. Platzhalter genau so übernehmen: `%LINK%`, `%EMAIL%`,
`%NEW_EMAIL%`. Bewusst ohne `%DISPLAY_NAME%` (fehlt der Name, stünde „Hallo ,").

Was sich ändern lässt (Firebase-Hilfe 7000714): Absendername, Absenderadresse,
Antwortadresse und Betreff bei allen Vorlagen; der Text sicher bei „Passwort
zurücksetzen". Zeigt eine Vorlage kein Textfeld: nur den Betreff eintragen.

**a) E-Mail-Adresse bestätigen**
- Betreff: `Bestätige deine E-Mail-Adresse für Adrabic`
```
<p>Hallo,</p>
<p>tippe auf den Link, um die E-Mail-Adresse für dein Adrabic-Konto zu bestätigen:</p>
<p><a href='%LINK%'>E-Mail-Adresse bestätigen</a></p>
<p>Danach wechselst du zurück zur App – sie geht von selbst weiter.</p>
<p>Du hast kein Konto bei Adrabic angelegt? Dann ignoriere diese E-Mail einfach.</p>
<p>Adrabic</p>
```

**b) Passwort zurücksetzen**
- Betreff: `Neues Passwort für Adrabic`
```
<p>Hallo,</p>
<p>für dein Adrabic-Konto (%EMAIL%) wurde ein neues Passwort angefordert. Über diesen Link legst du es fest:</p>
<p><a href='%LINK%'>Neues Passwort festlegen</a></p>
<p>Der Link gilt nur kurze Zeit. Hast du nichts angefordert, ignoriere diese E-Mail – dein bisheriges Passwort bleibt gültig.</p>
<p>Adrabic</p>
```

**c) E-Mail-Adresse geändert** (wird erst verschickt, wenn es „E-Mail ändern" gibt)
- Betreff: `Die E-Mail-Adresse deines Adrabic-Kontos wurde geändert`
```
<p>Hallo,</p>
<p>die Anmelde-Adresse deines Adrabic-Kontos wurde auf %NEW_EMAIL% geändert.</p>
<p>Warst du das nicht? Dann mach die Änderung über diesen Link rückgängig und lege danach ein neues Passwort fest:</p>
<p><a href='%LINK%'>Alte Adresse wiederherstellen</a></p>
<p>Adrabic</p>
```
**Woran man es merkt:** Testmail zeigt Betreff und Text wie oben, Umlaute richtig.

### K10 – Regeln veröffentlichen
Nur, wenn eine Runde `firestore.rules` geändert hat (steht dann im Logbuch und
in der Antwort).
- **Vom PC:** im Repo-Ordner `firebase deploy --only firestore:rules`.
- **Ohne PC:** Firebase → **Firestore Database** → Reiter **Regeln** → gesamten
  Inhalt von `firestore.rules` aus GitHub (Datei öffnen → „Raw" → alles kopieren)
  einfügen → **Veröffentlichen**.
- **Woran man es merkt:** Oben im Regel-Editor steht die heutige Uhrzeit; die
  Funktion aus dem Logbuch geht.
- **Reihenfolge ab 3.17.40 (G-016, G-057): App und Regeln direkt
  nacheinander.** Die neuen Regeln erlauben das Ideen-Board nur mit höchstens
  100 Einträgen je Abfrage (ältere Apps würden abgelehnt), und die neue App
  schreibt einen Server-Zeitstempel, den erst die neuen Regeln annehmen.
  Deshalb: **zuerst** 3.17.40 (oder neuer) veröffentlichen (K11), prüfen, dass
  unter Konto ganz unten „Adrabic 3.17.40" steht, **sofort danach** die Regeln.
  In den Minuten dazwischen lädt das Board weiter, nur eine neue Idee
  anzulegen schlägt mit einer Meldung fehl. Woran man es danach merkt:
  Einstellungen → „Ideen & Vorschläge" lädt die Liste, und eine Test-Idee
  lässt sich anlegen.

### K11 – Veröffentlichen (Hosting)
GitHub → Repo `Wiederholung` → **Actions** → „Veroeffentlichen" → **Run workflow**
(oder am PC `veroeffentlichen.bat`). Voraussetzung einmalig: Secret
`FIREBASE_SERVICE_ACCOUNT` (Schritte in `plan/audit/LOGBUCH.md`, 25.09.2026).
**Woran man es merkt:** In der App unter Einstellungen steht die neue Version.

### K12 – Liegt eine ZIP-Datei öffentlich?
Im Browser <https://adrabic.web.app/Wiederholung-design-redesign.zip> öffnen.
Erwartet: „Page not found" / 404. Wird eine Datei heruntergeladen: in den Chat
schreiben (dann wird sie beim nächsten Veröffentlichen entfernt; ab Aufgabe G-006
lädt der Deploy keine ZIP mehr hoch).

### K13 – Eigene Absender-Domain (später, braucht eine gekaufte Domain)
Mit `*.web.app` geht das nicht (keine DNS-Einträge möglich). Mit Domain (z. B.
`adrabic.de`, ca. 5–15 €/Jahr):
1. Firebase → Authentication → Vorlagen → Stift → **„Domain anpassen"** → Domain.
2. Die angezeigten DNS-Einträge (TXT für SPF und Bestätigung, zwei CNAME für DKIM)
   genau so beim Domain-Anbieter eintragen. Nur **einen** `v=spf1`-Eintrag pro
   Domain.
3. Selbst dazu: TXT auf `_dmarc.<domain>` mit `v=DMARC1; p=none; rua=mailto:<eigene Adresse>`.
4. Warten (bis 24 h) bis „Bestätigung abgeschlossen" → **„Benutzerdefinierte Domain
   anwenden"**.
5. **Woran man es merkt:** Testmail kommt von `noreply@<domain>`, „Original
   anzeigen" zeigt SPF/DKIM/DMARC PASS für die eigene Domain.
Dazu gehören dann auch Phase-4-Schritte (Authorized domains, Browser-Key,
`LEHREN.md` § 9.1).

### K14 – App Check (später, vor öffentlicher Werbung)
Erst mit eigener Aufgabe (CSP, Datenschutzerklärung, Gerätetest). Nicht vorher
einschalten – ein falsch eingerichtetes App Check sperrt alle aus.

---

## Testmail (nach K1, K2, K4, K9)
In der App abmelden → „Passwort vergessen?" → eine Testadresse → „Link
zusenden". Mail ansehen: Sprache, Absendername, Betreff, Link-Adresse. Das
Passwort muss man nicht wirklich ändern – die Mail einfach liegen lassen.

## Gerätetests, die nur am echten Gerät gehen
- **Google-Anmeldung aus der Home-Bildschirm-App (iPhone):** Adrabic vom
  Home-Bildschirm öffnen (nicht Safari-Tab), abgemeldet → „Mit Google anmelden".
  Erwartet: nach ~10 s angemeldet zurück in der App. Dasselbe im Safari-Tab.
  Ergebnis mit iOS-Version in den Chat (Aufgabe G-KONTO-9).

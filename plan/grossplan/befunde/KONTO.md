# KONTO – Konto-Lebenszyklus und E-Mails (Großprüfung 25.09.2026)

Grundlage: `app.js` (Stand im Repo, Firebase-SDK 10.14.1 = `@firebase/auth` 1.7.9,
zum Nachlesen der Fehlercodes entpackt unter `scratchpad/audit/KONTO/package/`),
`datenschutzerklaerung.html`, `firebase.json`, `plan/phase-2-konto/*`,
`plan/redesign-oberflaeche/LOGBUCH.md` (Block 14, Vorlagen-Sperre), CHANGELOG.

Einschränkung der Recherche: `firebase.google.com`, `support.google.com`,
`cloud.google.com` und `adrabic.web.app` sind vom Netz dieser Umgebung aus
gesperrt. Aussagen zur Firebase-Konsole stützen sich auf Suchergebnis-Auszüge
aus der offiziellen Doku (Quellen unten), GitHub-Issues des Firebase-SDK und den
SDK-Quelltext. Wo das nicht reicht, steht „Vermutung" oder „in der Konsole
nachsehen".

---

#### KONTO-1: Die App setzt keine Sprache für Firebase – Mails, Passwort-Seite und Google-Fenster können englisch kommen
- Art: Fehler
- Schwere: hoch
- Beleg: `grep -n "languageCode\|useDeviceLanguage" app.js` → 0 Treffer. `app.js:1870`
  `auth = fb.getAuth(fbApp);` ohne Sprache. Im SDK (`@firebase/auth` 1.7.9,
  `index-68602d24.js:2581`) startet `this.languageCode = null`; nur wenn sie gesetzt
  ist, schickt das SDK den Kopf `X-Firebase-Locale` (Zeile 893–894) und reicht sie
  an das Google-Fenster weiter (Zeile 10067). Ohne ihn gilt allein die
  „Vorlagensprache" der Konsole, deren Grundwert Englisch ist. verifiziert (Code), welche Sprache die Konsole gerade hat: nicht prüfbar.
- Warum es stört: Wer sich in einer rein deutschen App anmeldet, bekommt womöglich
  „Verify your email for project-…" und landet beim Zurücksetzen auf einer
  englischen Firebase-Seite. Das wirkt unseriös und landet eher im Spam.
- Vorschlag: `app.js` direkt nach `auth = fb.getAuth(fbApp);` die Zeile
  `auth.languageCode = "de";` einfügen. Nicht `useDeviceLanguage()`, denn die App
  ist nur deutsch, und ein Handy auf Englisch bekäme sonst englische Mails.
  Zusätzlich in der Konsole die Vorlagensprache auf Deutsch stellen (Anleitung
  Schritt 2), weil ein SDK-Issue meldet, dass bei angepassten Vorlagen nur die
  Konsolen-Sprache greift ([#5846](https://github.com/firebase/firebase-js-sdk/issues/5846)).
  In `stubs.js` braucht die Attrappe nichts, eine Eigenschaft zu setzen geht immer.
- Entscheidet: Agent (Code) + Konsole (Vorlagensprache)
- Umsetzung: Haiku
- Abnahme: `grep -c 'auth.languageCode = "de"' app.js` = 1. Dazu am echten Konto:
  „Passwort vergessen" → Mail und Passwort-Seite sind deutsch, das Google-Fenster
  zeigt „Anmelden – weiter zu …" auf Deutsch.

#### KONTO-2: Konto löschen hat weder Offline-Sperre noch Zeitlimit – bei schlechtem Netz hängt „Wird gelöscht …" endlos, und das Konto kann halb gelöscht zurückbleiben
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:2860–2890` (`kontoLoeschenAusfuehren`) und `app.js:2754–2785`
  (`kontoDatenLoeschen`) prüfen `offline` nirgends. Kein Aufruf läuft über
  `mitZeitlimit`: nicht `await geteiltLoeschen(code)` (2772), nicht
  `fb.getDocs(… "feedback")` (2777), nicht `await stapel.commit()` (2783), nicht
  `deleteDoc(userDocRef)`. Andere Netz-Funktionen auf der Einstellungsseite sind
  offline gesperrt (`app.js:8201–8227`, Muster `offlineAttr`), diese nicht.
  Die Neu-Anmeldung davor fängt Offline nur ab, wenn die letzte Anmeldung älter als
  4 Minuten ist (`kontoAnmeldungFrisch`, 2829). Verhalten: Mit `persistentLocalCache`
  (1872) beantwortet `getDocs` offline aus dem Cache. Die Promises von `deleteDoc`
  und `commit` lösen erst mit der Bestätigung des Servers auf (dokumentiertes
  Firestore-Verhalten). Code verifiziert, das Hängen selbst ist eine **Vermutung**
  (der Prüfstand-Stub bestätigt sofort, kann es nicht zeigen).
- Warum es stört: Wer im Zug löscht, sieht einen Knopf, der sich endlos dreht,
  schließt die App, und die Lösch-Befehle warten in der Firestore-Warteschlange.
  Beim nächsten Start steht `kontoWirdGeloescht` wieder auf `false`, und der
  Snapshot-Zweig „kein Dokument → `persistAll()`" (1937–1954) kann das Dokument neu
  anlegen, während das Auth-Konto bleibt. Genau diesen Zustand verbietet LEHREN § 6.8.
- Vorschlag: In `renderKontoLoeschen()` den Halteknopf und `kontoLoeschenPerTastatur`
  offline sperren, mit derselben Zeile wie beim Teilen („Dafür brauchst du eine
  Verbindung"). In `kontoLoeschenAusfuehren()` vor `exportBackup()` die Abfrage
  `if (offline) { dlgAlert(…); return; }` einbauen. `kontoDatenLoeschen()` als
  Ganzes gegen ein großzügiges Zeitlimit laufen lassen (z. B. 30 s, eigene Variante
  von `mitZeitlimit` mit Firestore-Text). Läuft es ab: Meldung „Nicht fertig
  gelöscht – bitte mit Verbindung noch einmal", dann `location.reload()` wie
  bisher. Das Zeitlimit nimmt eingereihte Löschbefehle nicht zurück, verhindert aber
  das endlose Warten.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Neuer Prüfstand-Test mit `offline = true` (Ereignis `offline`) auf der
  Löschseite: Knopf `disabled`, kein Aufruf von `deleteDoc`/`writeBatch` im
  Stub-Protokoll. Ein zweiter Fall mit einem Stub, dessen `commit` nie auflöst:
  Nach dem Zeitlimit steht eine Meldung da, `.busy` ist weg.

#### KONTO-3: „Passwort vergessen" verrät, ob eine Adresse registriert ist – oder meldet „verschickt", obwohl es kein Konto gibt
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:2528` `"auth/user-not-found": "Kein Konto mit dieser E-Mail gefunden."`.
  `app.js:2700–2711` (`doReset`): Wirft Firebase nichts, steht fest da:
  „E-Mail zum Zurücksetzen wurde verschickt". Im SDK heißt `EMAIL_NOT_FOUND` →
  `user-not-found`. Das kommt nur, wenn der Enumeration-Schutz der Konsole **aus**
  ist. Er ist nur für Projekte ab dem 15.09.2023 von selbst an
  ([Google-Doku](https://docs.cloud.google.com/identity-platform/docs/admin/email-enumeration-protection)).
  Wann `lernkarte-925c2` angelegt wurde, ist hier nicht bekannt. Code verifiziert,
  Konsolen-Stand unbekannt.
- Warum es stört: Ist der Schutz aus, kann jeder durchprobieren, wer Adrabic
  benutzt. Ist er an, liest jemand mit Tippfehler in der Adresse „wurde verschickt"
  und wartet auf eine Mail, die nie kommt.
- Vorschlag: (1) Konsole: Enumeration-Schutz einschalten (Anleitung Schritt 6).
  (2) `doReset`: Die Erfolgszeile lautet dann „Wenn es zu dieser Adresse ein Konto
  gibt, ist eine E-Mail unterwegs. Schau auch im Spam nach." Den Eintrag
  `auth/user-not-found` darf man stehen lassen, er schadet bei eingeschaltetem
  Schutz nicht. Hinweis: „Mit dieser E-Mail gibt es schon ein Konto" beim
  Registrieren (2531) lässt sich grundsätzlich nicht verbergen, das ist bei
  Firebase so und in Ordnung.
- Entscheidet: Konsole (Schalter) + Agent (Text)
- Umsetzung: Haiku
- Abnahme: `grep -F "Wenn es zu dieser Adresse ein Konto" app.js` = 1 Treffer.
  Konsole: Authentication → Einstellungen → Nutzeraktionen → „Schutz vor
  E-Mail-Enumeration" angehakt.

#### KONTO-4: Mehrere Firebase-Fehler enden im nichtssagenden „Das hat nicht geklappt"
- Art: Unvollständig
- Schwere: mittel
- Beleg: `AUTH_ERRORS` (`app.js:2526–2540`) kennt 13 Codes. Alles andere fällt über
  `authErrorText` (2541) auf `fehlerKlartext` (3524) zurück und damit auf „Das hat
  nicht geklappt. Versuch es gleich noch einmal." Im SDK (Zeile 936–941) entstehen
  aber auch: `auth/user-disabled` (Konto vom Betreiber gesperrt: „nochmal
  versuchen" ist falsch), `auth/popup-blocked` (Safari blockiert das Fenster),
  `auth/password-does-not-meet-requirements` (sobald eine Passwortregel aktiv ist,
  siehe KONTO-5), `auth/operation-not-allowed` (Anmeldeart in der Konsole aus),
  `auth/missing-email` (nicht zugeordnete Codes werden laut SDK Zeile 939–941 als
  kleingeschriebener Server-Code weitergereicht: `MISSING_EMAIL` → `missing-email`),
  `auth/web-storage-unsupported` (privates Fenster bzw. gesperrter Speicher) und
  `auth/user-token-expired` (nach einem Passwortwechsel auf einem anderen Gerät).
  Ein leeres E-Mail-Feld bei „Link zusenden" ist ohne vorherige Prüfung
  (`doReset` 2701) sehr wahrscheinlich. Code verifiziert, die genaue
  Server-Antwort bei leerem Feld ist eine Vermutung.
- Warum es stört: Eine Meldung, die „versuch es noch einmal" sagt, obwohl es nie
  gehen wird, führt in eine Schleife (LEHREN § 6.7, § 7.1).
- Vorschlag: `AUTH_ERRORS` ergänzen. `user-disabled`: „Dieses Konto ist gesperrt.
  Schreib dem Betreiber über das Impressum." `popup-blocked`: „Das Anmeldefenster
  wurde blockiert. Erlaube Pop-ups für diese Seite und tippe noch einmal."
  `password-does-not-meet-requirements`: der Text der Passwortregel.
  `operation-not-allowed`: „Diese Anmeldeart ist gerade nicht verfügbar."
  `missing-email`: „Bitte zuerst deine E-Mail-Adresse eingeben."
  `web-storage-unsupported`: „Dein Browser blockiert den Speicher, den die Anmeldung
  braucht. Privates Fenster? Dann bitte ein normales öffnen."
  `user-token-expired`: „Bitte melde dich neu an." Dazu in `doReset` eine
  Leerfeld-Prüfung am Feld, wie beim Namen (`ui.authFeldFehler`), statt den Server
  zu fragen.
- Entscheidet: Agent
- Umsetzung: Haiku (Texte) / Sonnet (Feldprüfung)
- Abnahme: Prüfstand mit `authFail` auf jeden neuen Code: Keine Meldung enthält
  „Das hat nicht geklappt". Leeres Feld → Feldfehler, kein Aufruf
  `sendPasswordResetEmail` im Stub.

#### KONTO-5: Passwortregel „mindestens 6 Zeichen" ist schwach und steht fest im Text
- Art: Verbesserung
- Schwere: mittel
- Beleg: `app.js:6801` `– mindestens 6 Zeichen`, `app.js:2532`
  `"Passwort zu schwach – mindestens 6 Zeichen."`. Das ist Firebases unterste
  Grenze. Eine Passwortregel („Password policy") lässt sich in der Konsole
  einstellen; verletzt man sie, liefert Firebase
  `auth/password-does-not-meet-requirements` (SDK-Tabelle), und diesen Code
  kennt die App nicht (KONTO-4). verifiziert (Code).
- Warum es stört: Mit 6 Zeichen lassen sich Konten leicht erraten. Wer die Regel
  nur in der Konsole anhebt, lässt die App weiter „6" sagen (§ 7.2: nur versprechen,
  was stimmt).
- Vorschlag: Konsole: Authentication → Einstellungen → Passwortrichtlinie →
  „Erzwingen", Mindestlänge 8, keine Pflicht zu Sonderzeichen (NIST SP 800-63B rät
  von Zusammensetzungsregeln ab). **Im selben Zug** in `app.js` beide Texte auf
  „mindestens 8 Zeichen" ändern und den neuen Code in `AUTH_ERRORS` aufnehmen.
  Gibt es schon Konten mit kürzerem Passwort, können sie sich weiter anmelden;
  Firebase prüft die Regel nur beim Setzen (Vermutung, in der Konsole steht dazu
  ein Hinweis, vorher lesen).
- Entscheidet: Betreiber
- Umsetzung: Haiku (Texte) + Konsole
- Abnahme: `grep -c "mindestens 8 Zeichen" app.js` = 2. Registrieren mit 7 Zeichen
  am echten Projekt ergibt die deutsche Meldung.
- Pro/Contra: Dafür: deutlich schwerer zu erraten, Standard bei seriösen Apps, drei
  Zeilen Code plus ein Konsolen-Schalter. Dagegen: etwas mehr Reibung beim
  Registrieren; Google-Anmeldung und Passwortmanager nehmen die meiste Reibung
  aber schon weg. Empfehlung: **ja, 8 Zeichen, ohne Sonderzeichen-Pflicht.**

#### KONTO-6: Angemeldet lässt sich weder das Passwort noch die E-Mail-Adresse ändern
- Art: Fehlt
- Schwere: mittel
- Beleg: `grep -n "updatePassword\|verifyBeforeUpdateEmail\|updateEmail" app.js` → 0.
  Einstellungen → Konto (`app.js:8076–8085`) hat nur „Abmelden" und „Konto
  löschen". Zum Passwortwechsel muss man sich abmelden und „Passwort vergessen?"
  nehmen. Für eine neue E-Mail-Adresse gibt es keinen Weg außer einem neuen Konto
  und Backup/Einspielen. In CHANGELOG und Logbüchern ist dazu nichts vermerkt,
  weder gebaut noch abgelehnt. verifiziert.
- Warum es stört: Wer die Adresse wechselt, etwa weil die Schul-Mail endet, verliert
  sonst den Zugang, sobald er sein Passwort vergisst. Eine Berichtigung nach
  Art. 16 DSGVO (Datenschutz Punkt 13) kann der Betreiber in der Firebase-Konsole
  nicht vornehmen, denn dort lässt sich die Adresse eines Nutzers nicht ändern
  (Vermutung, Stand der Konsole). Firebase hat die Vorlage „E-Mail-Adresse
  geändert" dafür schon fertig.
- Vorschlag: Zwei Stufen. (a) Klein: Zeile „Passwort ändern" (nur bei
  `providerData` mit `password`), die `sendPasswordResetEmail(auth, currentUser.email)`
  auslöst und dann „Link ist unterwegs an …" zeigt. Keine neue Seite, kein
  Passwortfeld, dieselbe Firebase-Seite wie bei „vergessen". (b) Später:
  „E-Mail-Adresse ändern" als Unterseite mit `kontoNeuAnmelden()` (gibt es schon)
  → `fb.verifyBeforeUpdateEmail(currentUser, neu)`. Firebase schickt an die neue
  Adresse einen Bestätigungslink und an die alte die Mail „E-Mail-Adresse
  geändert" mit einem Link zum Rückgängigmachen. Das Firestore-Dokument speichert
  keine E-Mail, die Regeln brauchen keine Änderung (verifiziert:
  `grep "email" firestore.rules` → nur `email_verified`). Achtung: Nach dem Wechsel
  ist `email_verified` für die neue Adresse erst nach dem Klick wahr.
- Entscheidet: Betreiber
- Umsetzung: Sonnet (a) / Opus (b, Neu-Anmeldung, Ausweis erneuern, Rückweg)
- Abnahme: (a) Prüfstand: Tipp auf „Passwort ändern" ruft im Stub
  `sendPasswordResetEmail` mit der eigenen Adresse auf; die Zeile fehlt bei
  Google-Konten. (b) Echtes Testkonto: neue Adresse bestätigt, alte bekommt die
  Mail mit Rückgängig-Link.
- Pro/Contra: Dafür (a): fast kein Code, schließt eine echte Lücke, nutzt die
  vorhandene Firebase-Seite. Dafür (b): löst die Berichtigung ohne Admin-Werkzeug.
  Dagegen: (b) ist sicherheitskritisch (Konto-Übernahme, wenn falsch gebaut),
  und bei drei Konten ist der Bedarf klein. Hick's Law: eine Zeile mehr unter
  „Konto". Empfehlung: **(a) jetzt, (b) erst, wenn jemand danach fragt.**

#### KONTO-7: Datenschutzerklärung nennt den Offline-Speicher der Lerninhalte nicht, und der bleibt nach dem Abmelden auf dem Gerät
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:1872` `fb.initializeFirestore(fbApp, { localCache: fb.persistentLocalCache() })`
  legt eine Kopie aller Bereiche und Karten in die IndexedDB des Geräts.
  `doLogout` (`app.js:2721–2737`) ruft nur `fb.signOut(auth)`; ein
  `clearIndexedDbPersistence`/`terminate` gibt es nirgends (grep 0). Die
  Datenschutzerklärung sagt dagegen in „Kurz gesagt": „Auf deinem Gerät bleiben
  nur ein paar Einstellungen und Merkzeichen (Punkt 7) und die App-Dateien selbst".
  Punkt 10 nennt IndexedDB nur für den Anmeldezustand. Weitere kleine Lücken im
  Konto-Teil: Bei Google-Anmeldung legt Firebase Auth auch das Profilbild (Adresse)
  des Google-Kontos ab; Punkt 4 sagt „nur Name, E-Mail-Adresse und die
  Bestätigung". Die Zeitpunkte von Registrierung und letzter Anmeldung speichert
  Firebase, die App zeigt sie sogar an („Dabei seit", `kontoSeit`, `app.js:8095`).
  Code verifiziert; Profilbild laut Firebase-Standardverhalten des Google-Anbieters,
  **Vermutung**, in der Konsole unter Authentication → Nutzer nicht sichtbar.
- Warum es stört: LEHREN § 12 verlangt, dass die Erklärung jeden Datenfluss nennt.
  Auf einem geteilten Gerät (Familien-iPad) liegen die Karten nach dem Abmelden
  weiter im Browser-Speicher.
- Vorschlag: Nur den Text anpassen, nicht die Technik, denn die Warteschlange
  offline gelernter Antworten hängt an diesem Speicher (so sagt es die
  Abmelde-Rückfrage, 2729–2731). In „Kurz gesagt" und Punkt 7 bzw. 10 einfügen:
  „Damit die App offline funktioniert, hält der Browser eine Kopie deiner
  Lerninhalte im Gerätespeicher (IndexedDB). Sie bleibt nach dem Abmelden
  erhalten, bis du die Website-Daten im Browser löschst." In Punkt 4 ergänzen:
  „… sowie die Adresse deines Google-Profilbilds, die diese App nicht verwendet",
  dazu „Zeitpunkt der Registrierung und der letzten Anmeldung". Wortlaut prüft der
  Betreiber (Recht).
- Entscheidet: Betreiber
- Umsetzung: Haiku (nach Freigabe des Wortlauts)
- Abnahme: `grep -c "IndexedDB" datenschutzerklaerung.html` ≥ 2, und der Satz
  „bleiben nur ein paar Einstellungen" ist ersetzt.
- Pro/Contra: Dafür: Die Erklärung stimmt dann, zwei Sätze Text. Alternative
  „Cache beim Abmelden löschen": Dagegen spricht, dass offline Gelerntes verloren
  ginge und der Start danach langsamer wäre. Empfehlung: **Text anpassen, Technik
  lassen.**

#### KONTO-8: Links in den Firebase-Mails zeigen auf „lernkarte-925c2.firebaseapp.com", der App-Name in den Mails ist vermutlich nicht „Adrabic"
- Art: Verbesserung
- Schwere: mittel
- Beleg: Kein `actionCodeSettings` in `sendEmailVerification`/`sendPasswordResetEmail`
  (`app.js:2653, 2690, 2704`). Damit gilt die Standard-Aktions-URL
  `https://<authDomain>/__/auth/action`, `authDomain` ist
  `lernkarte-925c2.firebaseapp.com` (`app.js:10`). Der Platzhalter `%APP_NAME%` in
  allen Vorlagen ist der „öffentlich sichtbare Name" des Projekts. Laut
  CHANGELOG 1321 zeigt schon das Google-Fenster „lernkarte". Code verifiziert,
  Konsolenwerte sind eine **Vermutung**.
- Warum es stört: Eine Mail „von Adrabic", deren Link auf einen fremd wirkenden
  Namen führt, sieht für Menschen und Spamfilter nach Phishing aus.
- Vorschlag: Ohne Code, nur Konsole (Anleitung Schritte 1 und 4). Öffentlicher Name
  „Adrabic"; Aktions-URL auf `https://adrabic.web.app/__/auth/action`. Die
  reservierten `/__/auth/…`-Seiten liefert Firebase Hosting auf **jeder** Site des
  Projekts aus. Dass die eigenen Header aus `firebase.json` sie nicht treffen,
  zeigt der funktionierende Google-Login: `X-Frame-Options: DENY` gilt für `**`,
  trotzdem lädt das Auth-Iframe `…/__/auth/iframe`. Die Umstellung vorher im
  Browser prüfen (Schritt 4).
- Entscheidet: Konsole
- Umsetzung: — (nur Konsole)
- Abnahme: Eine neue Passwort-Mail an ein Testkonto: Der Link beginnt mit
  `https://adrabic.web.app/__/auth/action?mode=resetPassword…`, die Seite öffnet sich
  und setzt das Passwort. Der Betreff nennt „Adrabic".

#### KONTO-9: Google-Anmeldung aus der iPhone-Home-Bildschirm-App ist ungeprüft – der Code-Kommentar setzt ein Verhalten voraus, das `signInWithPopup` nicht hat
- Art: Unvollständig
- Schwere: mittel
- Beleg: `app.js:2592–2601` nur `signInWithPopup`, kein `signInWithRedirect`. Der
  Kommentar `app.js:2614–2623` sagt, Firebase öffne auf Safari/iOS „statt eines
  echten Popups eine Vollbild-Weiterleitung". `signInWithPopup` schaltet aber nicht
  selbst auf Weiterleitung um (SDK). Aus installierten iOS-Web-Apps sind hängende
  oder scheiternde Popups belegt: SDK-Issue
  [#7443](https://github.com/firebase/firebase-js-sdk/issues/7443) (mit
  *eigener* authDomain `network-request-failed`, mit `*.firebaseapp.com` laut Titel
  in Ordnung), sowie [#77](https://github.com/firebase/firebase-js-sdk/issues/77).
  Die Bestätigung „am echten Gerät" (PLAN 1485) sagt nicht, ob das im Safari-Tab
  oder in der Home-Bildschirm-App war. **Vermutung**.
- Warum es stört: Gerade die installierte App ist die, die der Betreiber bewirbt.
  Dreht sich der Google-Knopf dort ewig, bleibt nur „Seite neu laden".
- Vorschlag: Zuerst ein Gerätetest (unten, „Was der Betreiber am Gerät prüft").
  Klappt er: den falschen Kommentar berichtigen und die Stelle **nicht** anfassen.
  Klappt er nicht: nur bei `navigator.standalone === true` bzw.
  `matchMedia("(display-mode: standalone)")` auf `signInWithRedirect` +
  `getRedirectResult` umstellen. Achtung: Die Weiterleitung braucht bei Safari
  wegen der Speicher-Trennung eine authDomain gleich der App-Domain. Das
  widerspricht #7443, also nicht ohne zweiten Gerätetest. Daraus folgt auch:
  **`authDomain` nicht aus Namensgründen auf `adrabic.web.app` umstellen**. Das ist
  die offene Frage aus `redesign-oberflaeche/LOGBUCH.md` Punkt 4, hier mit einem
  neuen Argument dagegen.
- Entscheidet: Betreiber (Gerätetest), danach Agent
- Umsetzung: Opus (falls Umbau)
- Abnahme: Das Ergebnis des Gerätetests steht im Logbuch, mit iOS-Version und
  Modus (Safari-Tab / Home-Bildschirm).

#### KONTO-10: E-Mail-Vorlagen lassen sich im Projekt nicht speichern – Ursache ungeklärt, Support nie angefragt
- Art: Unvollständig
- Schwere: mittel
- Beleg: `plan/redesign-oberflaeche/LOGBUCH.md` (Nachtrag 22.09.2026): Beim Speichern
  von Betreff/Text kam „Aktualisierungen von E-Mail-Vorlagen sind für dieses
  Projekt derzeit nicht verfügbar. Wenden Sie sich an Firebase-Support." Nur der
  Absendername ließ sich speichern. Eine Recherche am 25.09.2026 findet keine
  öffentliche Erklärung dieser Meldung. Belegt ist nur, dass Firebase die
  Bearbeitung von Vorlagen „zum Schutz vor Spam" einschränkt
  ([Firebase-Hilfe 7000714](https://support.google.com/firebase/answer/7000714?hl=en),
  Auszug: Absendername, Absenderadresse, Antwortadresse und Betreff sind
  anpassbar, den Nachrichtentext nennt die Hilfe ausdrücklich für die
  Passwort-Mail). Ob Blaze-Tarif oder Projektalter eine Rolle spielen: **unbelegt**.
- Warum es stört: Ohne Anpassung gehen die Firebase-Standardtexte raus: förmlich
  („Sie"), mit `%APP_NAME%`, und ohne KONTO-1/Schritt 2 womöglich englisch.
- Vorschlag: Betreiber öffnet eine Support-Anfrage (Anleitung Schritt 3, fertiger
  Text dabei). Bis dahin reichen die Schritte, die ohne Vorlagen-Bearbeitung gehen
  (Sprache, öffentlicher Name, Aktions-URL). Die Texte unten sind fertig, sobald
  Speichern geht.
- Entscheidet: Konsole
- Umsetzung: —
- Abnahme: Im Vorlagen-Dialog „Speichern" ohne Fehlermeldung; die Testmail zeigt
  den neuen Betreff.

#### KONTO-11: Registrieren kann ein Konto anlegen, obwohl die App „Keine Verbindung" meldet – dann ohne Bestätigungsmail und ohne Namen
- Art: Fehler
- Schwere: niedrig
- Beleg: `app.js:2648–2653`: drei Aufrufe nacheinander, jeder mit eigenem 12-s-Limit
  (`mitZeitlimit`, 2555). Läuft das Limit bei `createUserWithEmailAndPassword` ab,
  während der Server das Konto doch anlegt, dann: Fehlertext gesetzt, `updateProfile`
  und `sendEmailVerification` laufen nie. `onAuthStateChanged` bringt die
  Bestätigungsseite mit der Meldung „Keine Verbindung", obwohl keine Mail
  unterwegs ist, und `displayName` fällt auf den Teil vor dem @ zurück (1916).
  Code verifiziert, der Ablauf in der Praxis eine Vermutung (braucht genau diesen
  Zeitpunkt).
- Warum es stört: Man wartet auf eine Mail, die nie kommt. Der Spam-Hinweis
  schickt einen in die falsche Richtung.
- Vorschlag: In `renderPendingVerification` ist „Erneut senden" schon da. Zusätzlich
  in `bestaetigungBeobachten()` beim **ersten** Aufruf je Konto prüfen: Ist
  `ui.authError` die Zeitlimit-Meldung, dann einmal still `sendEmailVerification`
  nachschicken und den Text durch „Konto angelegt" ersetzen. Den Namen nachtragen:
  Ist `currentUser.displayName` leer und `ui.authEingabe.name` gesetzt,
  `updateProfile` nachholen.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Prüfstand: Stub `createUser…` löst nach 13 s auf. Danach gibt es genau
  einen `sendEmailVerification`-Aufruf, und `displayName` hat den getippten Namen.

#### KONTO-12: Ob vor dem Löschen neu angemeldet werden muss, entscheidet die Uhr des Geräts
- Art: Verbesserung
- Schwere: niedrig
- Beleg: `app.js:2829–2832`
  `Date.now() - letzte < 4 * 60 * 1000` mit `letzte` =
  `metadata.lastSignInTime` (Serverzeit). Geht die Uhr des Geräts ein paar Minuten
  nach, gilt eine alte Anmeldung als „frisch". Dann löscht die App zuerst die Daten
  (2874), und erst `deleteUser` scheitert mit `requires-recent-login` (2836).
  Bricht man die Neu-Anmeldung dann ab, bleibt ein Konto ohne Daten. Das ist die
  Reihenfolge, die LEHREN § 6.8 ausschließt. verifiziert (Code).
- Warum es stört: Selten, aber genau der Fall, den Station 15 beheben sollte.
- Vorschlag: Vor dem Löschen **immer** `kontoNeuAnmelden()` aufrufen, ohne
  Frische-Prüfung. Das ist ein Schritt mehr, dafür unabhängig von der Uhr.
  `kontoAnmeldungFrisch` und der Stub-Sonderfall (`lastSignInTime`, LEHREN § 5.4)
  fallen dann weg.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Prüfstand-Test Konto löschen (Station 15): Die Neu-Anmeldung kommt
  immer vor dem ersten `deleteDoc`. Test mit Uhr +10 min (`page.clock`) grün.

#### KONTO-13: Bei „schon ein Konto" bzw. „falsches Passwort" fehlt der Hinweis auf Google und aufs Zurücksetzen
- Art: Verbesserung
- Schwere: niedrig
- Beleg: `app.js:2527, 2529, 2531, 2534`. Wer sein Konto mit Google angelegt hat
  und es mit E-Mail und Passwort versucht, liest „E-Mail oder Passwort ist falsch"
  (es gibt gar kein Passwort) bzw. „bitte anmelden". Bei `too-many-requests` nach
  mehreren Fehlversuchen fehlt der Ausweg. verifiziert.
- Warum es stört: Man bleibt ratlos vor einem Konto, das es gibt.
- Vorschlag: Texte ergänzen, kein Code-Umbau. `invalid-credential` → „E-Mail oder
  Passwort ist falsch. Mit Google angelegt? Dann unten „Mit Google anmelden"."
  `email-already-in-use` → „Zu dieser E-Mail gibt es schon ein Konto. Melde dich an,
  mit Google oder über „Passwort vergessen?"." `too-many-requests` beim Anmelden →
  „… oder setze dein Passwort zurück."
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: `grep -F "Mit Google angelegt" app.js` = 1. Die Sprung-Messung am
  Anmelde-Bildschirm (`t_sprung.js`) bleibt bei 0 px, die Meldung steht unter dem
  Knopf.

#### KONTO-14: Enter im E-Mail-Feld tut beim Anmelden nichts; ohne `<form>` bieten Passwortmanager das Speichern womöglich nicht an
- Art: Verbesserung
- Schwere: niedrig
- Beleg: `app.js:6889–6896`: Enter wird nur im Passwortfeld ausgewertet, im E-Mail-Feld
  nur im Modus `reset`. `grep -n "<form" app.js` → 0; die Felder stehen in `div`.
  Die `autocomplete`-Werte stimmen (`email`, `current-password`, `new-password`).
  Das Speichern-Angebot des iOS-Schlüsselbunds ist eine **Vermutung**, gemessen
  wurde es nicht.
- Warum es stört: Kleine Reibung bei jeder Anmeldung. Wird das Passwort nicht
  gespeichert, fließen mehr Nutzer:innen in „Passwort vergessen".
- Vorschlag: Die Felder in `<form data-action="…" novalidate>` fassen und `submit`
  mit `preventDefault` über den vorhandenen Delegations-Weg an
  `doLogin`/`doRegister`/`doReset` geben. Kein eigener Listener an Knöpfen
  (README-Regel); eine `submit`-Delegation auf `body` neben der Klick-Delegation.
  Vorher prüfen, ob `render()` beim Fehler das Formular ersetzt; `authEingabenMerken`
  gibt es schon.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Prüfstand: Enter im E-Mail-Feld ruft `signInWithEmailAndPassword` auf.
  Gerätetest: iOS bietet nach der ersten Anmeldung „Passwort sichern?" an.

#### KONTO-15: Ein unbestätigtes Konto mit vertippter Adresse bleibt für immer liegen
- Art: Verbesserung
- Schwere: niedrig
- Beleg: `renderPendingVerification` (`app.js:6665–6715`) bietet „Abmelden" als Weg
  zurück (Kommentar 2716–2719). Das unbestätigte Konto mit der falschen Adresse
  bleibt in Firebase Auth bestehen, und niemand kann es löschen, denn „Konto
  löschen" liegt hinter der Bestätigung. verifiziert.
- Warum es stört: Karteileichen in der Konsole. Tippt man eine fremde, echte
  Adresse, bekommt diese Person Adrabic-Mails, und ihre spätere Registrierung
  scheitert an „schon ein Konto" (lösbar über „Passwort vergessen").
- Vorschlag: Auf der Bestätigungsseite den Knopf „Adresse falsch? Neu anfangen":
  `fb.deleteUser(currentUser)`. Direkt nach dem Registrieren ist die Anmeldung
  frisch; sonst über `kontoNeuAnmelden()`. Unbestätigte Konten haben keine
  Firestore-Daten (die Regeln verlangen `email_verified`), das Löschen ist also
  vollständig.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Prüfstand: Knopf → `deleteUser` im Stub, danach der Anmeldebildschirm im
  Modus `register` mit leerem E-Mail-Feld.

---

## Geprüft ohne Fund

- **Reihenfolge beim Konto löschen:** Neu-Anmeldung → Backup → Daten →
  Auth-Konto (`kontoLoeschenAusfuehren`). Die Sperre `kontoWirdGeloescht` steht vor
  `listenerLoesen()`. Geteilte Sätze und Stimm-Merker werden mitgelöscht (§ 12).
  Nach einem Fehlschlag wird neu geladen. In Ordnung bis auf KONTO-2/12.
- **Neu anmelden je Anbieter** (`kontoNeuAnmelden`, 2800–2827): Passwort bzw. Popup
  Google/Apple; Abbruch ist kein Fehler. In Ordnung.
- **Abmelden** mit Rückfrage, Anbieter-genauer Text, Offline-Satz; ohne Rückfrage auf
  der Bestätigungsseite (Absicht, 2712–2720). In Ordnung.
- **Popup ohne Zeitlimit**, `pageshow`/`persisted` setzt `authBusy` zurück
  (2625–2630). `popup-closed-by-user` erzeugt keine Meldung. In Ordnung.
- **Bestätigungsseite:** fragt alle 5 s still nach und bei `visibilitychange`
  (6640–6663), nach Erfolg `getIdToken(true)` + Reload. Spam-Hinweis fest auf der
  Seite. Kein Doppelstart (`bestaetigungLaeuft`). In Ordnung.
- **`continueUrl`** bewusst nicht gesetzt: kein Open-Redirect (LEHREN § 10.2).
  **Urteil zum Nachrüsten:** lieber nicht. Auf iOS öffnet der Mail-Link Safari,
  nicht die Home-Bildschirm-App. Ein „Weiter"-Knopf führte in eine
  Safari-Fassung, in der man *nicht* angemeldet ist, und das verwirrt mehr als es
  hilft. Die installierte App erkennt die Bestätigung selbst. Der Vorlagentext
  unten sagt deshalb „zurück zur App".
- **Private Seiten hinter dem Login:** Reihenfolge in `render()` unverändert
  (Phase-2-Eintrag). Nicht erneut geprüft.
- **`mitZeitlimit`** an allen E-Mail/Passwort-Aufrufen (Login, Register, Profil,
  Verifizierung, Reset, reload, Token). Nicht an Popups (richtig).
- **Eingaben bleiben** über `render()` erhalten (`authEingabenMerken`, Passwort per
  Eigenschaft, nicht im Markup). In Ordnung.
- **Fehlertexte ohne Systemcode**: Kein `e.code`/`e.message` in sichtbarem Text der
  Auth-Stellen (`authErrorText` → `fehlerKlartext`, das nur in die Konsole loggt).
  Lücken in KONTO-4.
- **`auth/invalid-credential`** als Code bei falschem Passwort (Firebase 10) ist
  abgedeckt; im SDK verifiziert: `INVALID_LOGIN_CREDENTIALS` → `invalid-credential`.
- **Rate-Limit** `too-many-requests` hat einen Text, beim Löschen einen eigenen.
  Firebase meldet auch zu viele Passwort-Mails (`RESET_PASSWORD_EXCEED_LIMIT`) unter
  demselben Code. Abgedeckt.
- **Firestore-Regeln und E-Mail**: Die Regeln prüfen nur `email_verified`, die
  Adresse wird nirgends in Firestore gespeichert. Ein späteres „E-Mail ändern"
  braucht keine Regeländerung.
- **Apple** ausgeblendet (`APPLE_LOGIN_BEREIT`): nicht geprüft, bewusst so.
- **Gmail/Yahoo-Anforderungen**: Für Adrabic gelten nur die Regeln für *alle*
  Absender (SPF **oder** DKIM, TLS, Spam-Quote < 0,3 %). DMARC-Pflicht und
  One-Click-Abmelden gelten ab 5 000 Mails/Tag bzw. nur für Werbung und Abos.
  Anmelde-Mails brauchen keinen Abmeldelink. Die Firebase-Standardadresse ist
  vermutlich schon per SPF/DKIM signiert; der Betreiber prüft das in Schritt 7.
  Kein Handlungsbedarf im Code.

---

## KONSOLE-ANLEITUNG

Für den Betreiber. Reihenfolge = Wirkung pro Aufwand. Schritte 1, 2, 4 und 6
kosten je ein paar Minuten und brauchen weder Domain noch Support.

### Schritt 1 – App-Name „Adrabic" für Mails und Google-Fenster
1. <https://console.firebase.google.com> → Projekt **lernkarte-925c2** → Zahnrad oben
   links → **Projekteinstellungen** → Reiter **Allgemein**.
2. Feld **„Öffentlich sichtbarer Name"** (engl. „Public-facing name") → Stift →
   `Adrabic` → Speichern.
3. Woran man merkt, dass es geklappt hat: Eine neue Passwort-Mail (Schritt 5) nennt im
   Betreff/Text „Adrabic" statt „project-…" bzw. „lernkarte". Das Google-Fenster zeigt
   den App-Namen aus dem OAuth-Zustimmungsbildschirm: Google Cloud Console →
   APIs & Dienste → OAuth-Zustimmungsbildschirm → App-Name `Adrabic`, Support-Mail
   eintragen → Speichern.

### Schritt 2 – Mails auf Deutsch
1. Firebase → **Authentication** → Reiter **Vorlagen** (engl. „Templates").
2. Oben über der Liste: **„Vorlagensprache"** → Stift → **Deutsch** → Speichern.
3. Merkmal: Die Vorschau der Vorlagen ist deutsch. Nach der Code-Änderung
   aus KONTO-1 kommt auch die Passwort-Seite deutsch.

### Schritt 3 – Support fragen, warum Vorlagen nicht gespeichert werden
1. <https://firebase.google.com/support/troubleshooter/contact> → „Authentication" →
   Problem beschreiben.
2. Text zum Einfügen:
   > Project ID: lernkarte-925c2. When I try to save the subject or message of the
   > Authentication email templates (Email address verification, Password reset), the
   > console shows: "Updates to email templates are unavailable for this project at this
   > time. Please contact Firebase support." Changing the sender name worked. Could you
   > please enable template editing for this project, or tell me what is required
   > (e.g. billing plan)? Thank you.
3. Merkmal: Antwort per Mail. Danach lässt sich im Vorlagen-Dialog speichern,
   ohne dass die rote Meldung erscheint.

### Schritt 4 – Links in den Mails auf adrabic.web.app
1. Zuerst prüfen: im Browser <https://adrabic.web.app/__/auth/action> öffnen. Es
   muss eine schlichte Firebase-Seite erscheinen (ohne Parameter mit einer
   Fehlermeldung wie „ungültiger Modus" o. ä.), **nicht** die Adrabic-App und kein 404.
   Kommt die App oder ein 404: abbrechen und dem Agenten Bescheid geben.
2. Firebase → Authentication → **Vorlagen** → bei einer beliebigen Vorlage den Stift →
   unten **„Aktions-URL anpassen"** (engl. „Customize action URL").
3. Eintragen: `https://adrabic.web.app/__/auth/action` → Speichern. Die Einstellung
   gilt für alle Vorlagen.
4. Voraussetzung (schon erledigt laut 18.09.2026): `adrabic.web.app` steht unter
   Authentication → Einstellungen → **Autorisierte Domains**.
5. Merkmal: Schritt 5 ausführen. Der Link in der Mail beginnt mit
   `https://adrabic.web.app/__/auth/action?mode=resetPassword`, die Seite fragt nach dem
   neuen Passwort, und die Anmeldung mit dem neuen Passwort klappt. **Geht es nicht:**
   Feld leeren und speichern, dann gilt wieder die alte Adresse.

### Schritt 5 – Testmail (nach jedem Schritt)
In der App abmelden → „Passwort vergessen?" → Testadresse → „Link zusenden". Mail
öffnen: Sprache, Absendername, Betreff, Link-Adresse ansehen. Nicht am eigenen
Hauptkonto testen, wenn man das Passwort nicht ändern will; die Mail kann man auch
einfach liegen lassen.

### Schritt 6 – Schutz vor E-Mail-Enumeration
1. Firebase → Authentication → Reiter **Einstellungen** → **Nutzeraktionen**
   (engl. „User actions").
2. Haken **„Schutz vor E-Mail-Enumeration (empfohlen)"** setzen → Speichern. Ist er
   schon gesetzt: nichts tun, dem Agenten „war schon an" melden.
3. Merkmal: „Passwort vergessen" mit einer Adresse ohne Konto zeigt keine Meldung
   „Kein Konto mit dieser E-Mail gefunden" mehr. (Nach KONTO-3 steht dort der neue,
   vorsichtige Satz.)

### Schritt 7 – Prüfen, ob die Mails schon signiert sind
1. Eine Testmail (Schritt 5) in Gmail öffnen → Drei-Punkte-Menü → **„Original
   anzeigen"**.
2. Merkmal: Oben stehen `SPF: PASS`, `DKIM: PASS` (und meist `DMARC: PASS`) für
   `firebaseapp.com`. Dann ist technisch alles erfüllt, was Gmail/Yahoo von kleinen
   Absendern verlangen; der Spam-Ordner liegt dann an der Reputation der geteilten
   Firebase-Adresse, nicht an fehlenden Einträgen.
3. Landet die Mail im Spam: **„Kein Spam"** anklicken. Das hilft für die eigene
   Adresse und ein wenig für die Absenderadresse allgemein.

### Schritt 8 – Passwortregel (nur wenn KONTO-5 freigegeben)
1. Firebase → Authentication → Einstellungen → **Passwortrichtlinie**.
2. „Anforderungen erzwingen", Mindestlänge **8**, keine weiteren Haken → Speichern.
3. **Nur zusammen** mit der App-Version, die „mindestens 8 Zeichen" sagt, sonst
   verspricht die App etwas anderes.
4. Merkmal: Registrieren mit 7 Zeichen wird abgelehnt, mit deutscher Meldung.

### Schritt 9 – Vorlagentexte eintragen (sobald Speichern geht, Schritt 3)
Firebase → Authentication → Vorlagen → jeweilige Vorlage → Stift.
Überall: **Absendername** `Adrabic`. **Antwortadresse:** eine Adresse, die gelesen wird
(Vorschlag `adrabic.de@gmail.com`, die Adresse aus Phase 8; Wahl des Betreibers).
Die **Absenderadresse** (Teil vor dem @) auf `noreply` lassen.
Platzhalter so übernehmen, wie sie stehen: `%LINK%`, `%EMAIL%`, `%NEW_EMAIL%`.
Bewusst **ohne** `%DISPLAY_NAME%`: Fehlt der Name (KONTO-11), stünde „Hallo ," da.

Was sich laut Firebase-Hilfe (7000714) ändern lässt: Absendername,
Absenderadresse, Antwortadresse und Betreff bei **allen** Mail-Vorlagen, der
**Nachrichtentext** sicher bei „Passwort zurücksetzen". Bei „E-Mail-Adresse
bestätigen" zeigt die Konsole, ob das Textfeld bearbeitbar ist. Bei
„E-Mail-Adresse geändert" ist der Text laut Hilfe gesperrt („zum Schutz vor
Spam"); dort nur Betreff und Absender setzen. Steht bei einer Vorlage kein
Textfeld, dann nur den Betreff eintragen.

**a) E-Mail-Adresse bestätigen**
- Betreff: `Bestätige deine E-Mail-Adresse für Adrabic`
- Text:
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
- Text:
```
<p>Hallo,</p>
<p>für dein Adrabic-Konto (%EMAIL%) wurde ein neues Passwort angefordert. Über diesen Link legst du es fest:</p>
<p><a href='%LINK%'>Neues Passwort festlegen</a></p>
<p>Der Link gilt nur kurze Zeit. Hast du nichts angefordert, ignoriere diese E-Mail – dein bisheriges Passwort bleibt gültig.</p>
<p>Adrabic</p>
```

**c) E-Mail-Adresse geändert** (wird erst verschickt, wenn es „E-Mail ändern" gibt,
KONTO-6 b; heute nie)
- Betreff: `Die E-Mail-Adresse deines Adrabic-Kontos wurde geändert`
- Text (nur falls die Konsole das Feld freigibt):
```
<p>Hallo,</p>
<p>die Anmelde-Adresse deines Adrabic-Kontos wurde auf %NEW_EMAIL% geändert.</p>
<p>Warst du das nicht? Dann mach die Änderung über diesen Link rückgängig und lege danach ein neues Passwort fest:</p>
<p><a href='%LINK%'>Alte Adresse wiederherstellen</a></p>
<p>Adrabic</p>
```
Merkmal: Testmail (Schritt 5) zeigt Betreff und Text wie oben, Umlaute richtig.

### Schritt 10 – Eigene Absender-Domain (erst wenn es eine Domain gibt, „später")
Mit `*.web.app` geht das nicht, denn dort kann man keine DNS-Einträge setzen. Es braucht
eine gekaufte Domain (z. B. `adrabic.de`, ca. 5–15 € im Jahr; Entscheidung des
Betreibers, Phase 4 „später").
1. Firebase → Authentication → Vorlagen → Stift → **„Domain anpassen"** → Domain
   eintragen (z. B. `adrabic.de`).
2. Firebase zeigt eine Tabelle mit DNS-Einträgen. Genau diese beim Domain-Anbieter
   eintragen. Typisch sind: TXT `v=spf1 include:_spf.firebasemail.com ~all`, TXT mit
   `firebase=lernkarte-925c2` sowie zwei CNAME für DKIM (`firebase1._domainkey`,
   `firebase2._domainkey`). **Nur einen** `v=spf1`-Eintrag pro Domain; gibt es schon
   einen (z. B. für ein Postfach), beide in einem Eintrag zusammenführen.
3. Selbst dazu (Firebase gibt ihn nicht vor, Gmail empfiehlt ihn): TXT auf
   `_dmarc.adrabic.de` mit `v=DMARC1; p=none; rua=mailto:<eigene Adresse>`.
4. Warten, bis zu 24 h, bis die Konsole grün „Bestätigung abgeschlossen" zeigt, dann
   **„Benutzerdefinierte Domain anwenden"**.
5. Merkmal: Die Testmail kommt von `noreply@adrabic.de`, „Original anzeigen" zeigt
   SPF/DKIM/DMARC PASS für `adrabic.de`.
Wirkung: Das ist erst die Maßnahme, die gegen Spam wirklich hilft (eigene Reputation).
Schritte 1–7 verbessern Vertrauen und Sprache, die Reputation aber kaum.

### Eigene Aktions-Seite in der App – Urteil
Möglich wäre eine eigene Seite (`action.html` o. ä.) mit `verifyPasswordResetCode` +
`confirmPasswordReset` (Passwort) und `applyActionCode` (Bestätigen) bzw.
`checkActionCode` (E-Mail wiederherstellen), die Parameter `mode`, `oobCode`,
`lang` und `continueUrl` aus der URL.
- Dafür: eigenes Aussehen, Du-Form, Marke, eigene Passwortregel-Anzeige.
- Dagegen: rund 150 Zeilen sicherheitsnaher Code, eigene CSP- und SW-Fragen.
  Auf iOS öffnet der Link trotzdem Safari und nicht die installierte App. Die
  Firebase-Seite funktioniert, mit Schritt 2 auf Deutsch und mit Schritt 4 unter
  der eigenen Adresse.
- **Empfehlung: nicht bauen.** Erst Schritte 1–4. Nur wenn der Betreiber das Aussehen
  der Firebase-Seite danach ausdrücklich stört, als Funktion in den Plan aufnehmen.

### Was der Betreiber am Gerät prüft (für KONTO-9)
iPhone, Adrabic **vom Home-Bildschirm** geöffnet (nicht im Safari-Tab), abgemeldet →
„Mit Google anmelden" → Google-Konto wählen. Erwartet: zurück in der App,
angemeldet, innerhalb von ~10 s. Ergebnis mit iOS-Version melden. Dasselbe einmal im
Safari-Tab.

---

Quellen (Recherche 25.09.2026):
[Firebase: eigene Domain für Auth-Mails](https://firebase.google.com/docs/auth/email-custom-domain) ·
[Firebase-Hilfe: Konto-Mails anpassen](https://support.google.com/firebase/answer/7000714?hl=en) ·
[Firebase: eigene Aktions-Seiten](https://firebase.google.com/docs/auth/custom-email-handler) ·
[Google Cloud: E-Mail-Enumeration-Schutz](https://docs.cloud.google.com/identity-platform/docs/admin/email-enumeration-protection) ·
[DmarcDkim: Firebase-DNS-Einträge](https://dmarcdkim.com/setup/how-to-setup-spf-dkim-dmarc-records-for-firebase-domain-authentication) ·
[Gmail-Absenderrichtlinien](https://support.google.com/mail/answer/81126?hl=en) ·
[Gmail-Durchsetzung ab Nov. 2025](https://dmarcwise.io/blog/gmail-sender-requirements-enforcement) ·
[SDK-Issue #5846 (Sprache der Vorlagen)](https://github.com/firebase/firebase-js-sdk/issues/5846) ·
[SDK-Issue #7443 (iOS-Home-Bildschirm-Popup)](https://github.com/firebase/firebase-js-sdk/issues/7443) ·
[SDK-Issue #77](https://github.com/firebase/firebase-js-sdk/issues/77)

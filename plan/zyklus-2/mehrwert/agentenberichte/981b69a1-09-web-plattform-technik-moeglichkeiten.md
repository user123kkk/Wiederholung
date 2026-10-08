# Web-Plattform Technik Möglichkeiten

Wörtlich aus dem Chat 981b69a1, Agent 9, gestartet 2026-10-07 15:39 (Quelle: `agent-a7376214d25e4e621.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 12 parallelen Ideen-Agenten für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build: app.js ~820 KB, styles.css, index.html, sw.js; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server; Hosting Firebase). Der Betreiber ist ein Einzelner, bisher Nutzer: er und wenige Freunde; Ziel ist eine öffentliche, ernsthafte Lern-Website. Zielgruppe: deutschsprachige Muslime, die Arabisch (Quran-/klassisches Arabisch) lernen. Neu im Probelauf: "Texte auswendig lernen" (u. a. Quran, Tanzil-Daten unter quran/).
Frage des Betreibers: Wie kann das Tool ECHTEN, UNBESTREITBAREN Mehrwert bieten – Features, Ausbau, Verbesserungen, Neues. Er will ein großes, gründliches Ergebnis.
HARTE REGELN: NUR LESEN. In einem anderen Chat wird gerade am Repo gearbeitet. Also: keine Datei im Repo anlegen/ändern/löschen, keine git-Befehle außer rein lesenden (log, show, diff, grep), keine Tests, keine Server, keine Skripte aus plan/werkzeuge starten, nichts installieren. app.js nie komplett lesen, sondern mit Grep gezielt suchen und Ausschnitte lesen.
Nützliche Dateien: KONZEPT.md, README.md, CHANGELOG.md, plan/STAND.md, plan/grossplan/FUNKTIONEN.md (bereits bewertete Funktionen: Korb 1/2/3 – nichts davon einfach wiederholen, sondern darauf aufbauen oder begründet widersprechen), plan/texte-lernen/KONZEPT.md und WIEDERHOLEN.md, plan/lehrer-modus/GERUEST.md, plan/monetarisierung/GERUEST.md, plan/landing-page-strategie/STRATEGIE.md, plan/beobachtungen-lernwerkzeug.md, plan/zyklus-2/AUFGABEN.md.
Rahmenbedingungen des Projekts: Religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte selbst (Wortlaut kommt vom Betreiber oder aus geprüften Quellen); keine Sekten/Organisationen/Politik; keine Speicherung religiöser Angaben der Nutzer. Keine Dark Patterns. Datenschutz (DSGVO) ernst. Kein eigener Server (Cloud Functions wären eine bewusste Entscheidung – als Abhängigkeit kennzeichnen).
AUSGABEFORMAT (Deutsch, max. ca. 900 Wörter, kein Vorgeplänkel): 8–14 konkrete Ideen. Je Idee: Titel; was genau (2–3 Sätze); für wen und welcher belegbare Nutzen; Aufwand S/M/L; Abhängigkeiten (Server? Inhalte vom Betreiber? Lizenz? iOS-Grenzen?); Risiko/Gegenargument; Beleg (Datei:Zeile im Repo bzw. URL). Am Ende: deine Top 3 mit einem Satz Begründung und 1–2 Dinge, die man ausdrücklich NICHT bauen sollte. Ehrlich gewichten, nicht verkaufen. Nichts erfinden: Was du nicht geprüft hast, als Vermutung kennzeichnen.

DEIN BLICKWINKEL: Was die Web-Plattform 2026 hergibt und die App noch nicht nutzt. Prüfe zuerst, was schon genutzt wird (manifest.json, sw.js, firebase.json inkl. CSP, Grep in app.js nach "serviceWorker", "speechSynthesis", "MediaRecorder", "share", "indexedDB", "persist", "wakeLock", "vibrate", "Notification", "shortcuts", "offline"). Bewerte dann für jede Fähigkeit konkret Nutzen für Lernende, Unterstützung auf iOS Safari/installierter PWA vs. Android Chrome vs. Desktop (mit Quelle: MDN, caniuse, webkit.org) und Verträglichkeit mit der bestehenden CSP und "kein Build, kein Server": echte Offline-Nutzung inkl. Schreiben und späterem Abgleich (Firestore-Persistenz – was ist heute aktiv?), Audio (speechSynthesis für ar-SA: Qualität/Verfügbarkeit je Plattform; vorab erzeugte Audiodateien; lizenzfreie Rezitations-Audios pro Vers von everyayah/quran.com – Lizenz prüfen), MediaRecorder für Selbstaufnahme, Handschrift auf Canvas, Web Share / Share Target, App-Shortcuts, Badging, Screen Wake Lock beim Lernen, Haptik (iOS-Grenzen), View Transitions, Web Push, File System Access/Export als Datei, Druck-Stylesheet für Kartensätze/Lernlisten als PDF, lokale KI im Browser (z. B. Chrome Prompt API/WebGPU-Modelle – realistisch für Arabisch?) und KI über API (bräuchte Server/Schlüssel-Schutz: klar sagen), Tastatur-Kürzel am Desktop, Widgets/Live Activities (nur nativ – Capacitor-/TWA-Hülle als späterer Store-Weg ehrlich einordnen). Nenne auch technische Schulden, die Mehrwert blockieren (eine 820-KB-Datei, Ladezeit auf dem Handy), aber nur, wenn sie für Nutzer spürbar sind.

## Bericht des Agenten

## Web-Plattform 2026: was Adrabic schon nutzt und was fehlt

Nur gelesen, nichts geändert. Plattform-Angaben ohne URL stammen aus meinem Wissensstand und sind nicht frisch nachgeschlagen; frisch geprüft habe ich nur Wake Lock und die Audio-Lizenzen.

**Schon genutzt:**
- Service Worker mit App-Hülle, Cache-first für versionierte Dateien (`sw.js:44-58`, `133-161`).
- Firestore-Offline mit Schreiben und Mehr-Tab-Abgleich (`app.js:2233`), dazu `navigator.storage.persist()` nur in der installierten App (`app.js:2240ff`).
- Vibration, nur Android (`app.js:154-158`).
- Handschrift-Canvas (`app.js:11362`, `13900ff`).
- Tastatur beim Lernen: Leertaste, 1/2/3, Pfeile (`app.js:6212-6240`).
- `.ics`-Erinnerung (`app.js:10423`), JSON-Sicherung als Download (`app.js:4180`), Zwischenablage (`app.js:15003`).

**Nicht genutzt (Grep ohne Treffer):** speechSynthesis, Audio, MediaRecorder, Web Share, Wake Lock, Badging, View Transitions, Notification/Push, `@media print`, `shortcuts` im Manifest.

### Ideen

**1. Bildschirm wach halten beim Lernen (Wake Lock)**
- Was: `navigator.wakeLock.request("screen")` in Lernrunde und Texte-Lernen, bei `visibilitychange` neu anfordern.
- Nutzen: Beim Aufsagen einer Aya aus dem Kopf fasst man das Display lange nicht an; es dunkelt sonst ab.
- Aufwand S. Abhängigkeiten: keine, die CSP ist nicht betroffen.
- Plattform: Chrome/Android und Desktop ja; iOS in Safari ab 16.4, in der installierten App erst ab 18.4 (vorher WebKit-Bug 254545).
- Risiko: Akku; nur während aktiver Runde halten.
- Beleg: https://webkit.org/b/254545, https://progressier.com/pwa-capabilities/screen-wake-lock

**2. Druck-Stylesheet für Kartensätze und Texte**
- Was: `@media print` für Wortliste (Arabisch | Deutsch), Faltblatt zum Abdecken und Textzeilen; der Browser macht daraus PDF.
- Nutzen: Lehrer und Lernende im Unterricht oder in der Moschee ohne Handy; nichts verlässt das Gerät.
- Aufwand S–M. Abhängigkeiten: die Quran-Schrift liegt schon lokal (`sw.js:56-57`).
- Risiko: Beim Quran-Druck müssen Tanzil-Quellenangabe und unveränderter Text mit aufs Blatt (`plan/texte-lernen/KONZEPT.md:80`); iOS-Druckdialog ist etwas versteckt.
- Beleg: `styles.css` enthält kein `@media print`.

**3. Rezitation pro Aya im Texte-Lernen**
- Was: Aya anhören, wiederholen, Schleife – menschlicher Qari, keine Synthese.
- Nutzen: Auswendiglernen des Quran läuft klassisch übers Hören; das wäre der größte inhaltliche Sprung.
- Aufwand M–L. Abhängigkeiten:
  - Lizenz ist nicht sauber: everyayah.com hat keine seitenweite Lizenz, einzelne Sätze tragen „Recitation license: UNKNOWN“.
  - Die Quran-Foundation-API verlangt `client_secret` und damit einen Server.
  - Realistisch ist nur ein Qari mit schriftlicher Erlaubnis, Dateien selbst gehostet (`media-src` fällt heute auf `'self'` zurück, passt also).
  - Bei mp3 hat die Hosting-Regel in `firebase.json` keinen Cache-Header; ganzer Quran wären mehrere hundert MB – Vermutung, Hosting-Kontingent prüfen.
- Risiko: Ohne geklärte Erlaubnis nicht bauen. Die Wahl des Rezitators ist Betreiber-Entscheidung.
- Beleg: https://huggingface.co/datasets/quranlab/quran-audio, https://api-docs.quran.foundation/legal/developer-terms/

**4. Selbstaufnahme, nur lokal**
- Was: Eigene Rezitation aufnehmen und direkt gegen den Text hören; Blob bleibt im Arbeitsspeicher, kein Upload.
- Nutzen: Selbstkontrolle beim Aufsagen. Widerspricht F-11b nicht, weil das Gegenargument dort Blaze und Stimmdaten waren (`FUNKTIONEN.md:71`) – beides entfällt lokal.
- Aufwand M. Abhängigkeiten: `Permissions-Policy: microphone=()` in `firebase.json` blockiert das heute hart und müsste auf `microphone=(self)`; dazu `csp-build` mitzählen und Datenschutzerklärung anpassen.
- Plattform: MediaRecorder läuft auf iOS ab 14.5 (mp4/aac).
- Risiko: Mikrofon-Abfrage kostet Vertrauen; iOS fragt in der installierten App evtl. wiederholt (Vermutung).

**5. Manifest-Shortcuts und Badge „fällig“**
- Was: `shortcuts` („Heute lernen“, „Texte“) und `navigator.setAppBadge(n)` beim Öffnen.
- Nutzen: Ein Tipp weniger; die Fälligkeit ist sichtbar.
- Aufwand S.
- Plattform: Shortcuts nur Android und Desktop, nicht iOS. Badge auf iOS nur installiert und nur mit Benachrichtigungs-Erlaubnis.
- Risiko: Ohne Push veraltet die Zahl, weil sie nur beim Öffnen gesetzt wird. Ein rotes Zahlen-Badge ist grenzwertig zu „kein Druck“ – eher nur Shortcuts.
- Beleg: `manifest.json` hat kein `shortcuts`.

**6. Web Share statt nur Kopieren**
- Was: `navigator.share()` für Lektions-Code und Einladung, mit dem Kopieren als Rückfall (`app.js:15003`).
- Nutzen: Verbreitung per WhatsApp in Lerngruppen ist der reale Kanal.
- Aufwand S. Plattform: iOS und Android ja, Desktop-Firefox nein.
- Risiko: gering. Share Target (Empfangen) gibt es auf iOS nicht – weglassen.

**7. Web Push für Erinnerungen**
- Was: Technisch seit iOS 16.4 in der installierten App möglich.
- Urteil: F-16 bleibt richtig abgelehnt (`FUNKTIONEN.md:66`). Es braucht einen Server (FCM plus Cloud Function/Scheduler, Blaze), einen neuen Datenfluss, und die CSP `connect-src` müsste auf. `.ics` deckt den Kern. Ich widerspreche nicht.

**8. Sprachsynthese für ar-SA**
- Was: `speechSynthesis` kostet nichts, aber die Qualität schwankt: iOS hat eine brauchbare Stimme, Android hängt von der installierten Google-TTS ab, Windows oft ohne arabisches Sprachpaket.
- Urteil: Harakat werden unzuverlässig gesprochen, und es kollidiert mit LEHREN § 1.6 (`FUNKTIONEN.md:65`). Nicht bauen.
- Alternative: F-11a mit Betreiber-Aufnahmen als statische Dateien für die Wortkarten. Aufwand M, hängt an den Aufnahmen.

**9. View Transitions für Tab- und Kartenwechsel**
- Was: `document.startViewTransition`, ab Safari 18 und Chrome 111.
- Urteil: Nutzen rein kosmetisch. Die Projektgeschichte zeigt hohe Regressionsgefahr bei Motion (CLAUDE.md, Übergabe 27.09.). Aufwand M. Lieber nicht.

**10. Export als CSV/Anki-Text und „Speichern unter“**
- Was: Zum JSON-Backup zusätzlich CSV. `showSaveFilePicker` gibt es nur in Chromium; iOS am besten über `navigator.share({files})` in „Dateien“.
- Nutzen: Kein Lock-in ist ein glaubwürdiges Vertrauensargument für eine öffentliche Seite.
- Aufwand S.

**11. Tastatur am Desktop ausbauen**
- Was: Lernen ist abgedeckt; es fehlen (Vermutung, nicht jede Ansicht geprüft) Kürzel für „neue Karte“, Suche, Rückgängig und ein „?“-Überblick.
- Nutzen: Viel-Eingeber am PC, also Lehrer. Aufwand S.

**12. Lokale KI und KI per API**
- Lokal: Chromes Prompt API läuft nur am Desktop und ohne belastbares Arabisch (Vermutung zum aktuellen Sprachumfang). WebGPU-Modelle sind hunderte MB groß.
- Per API: braucht einen Schlüssel und damit einen Server.
- Urteil: Inhaltlich ohnehin durch § 1.6 und F-19 gesperrt. Nicht bauen.

**13. Ladegewicht**
- Was: `app.js` 817 KB und `styles.css` 263 KB, unkomprimiert. Hosting komprimiert; die Parse-Zeit auf schwachen Androids habe ich nicht gemessen.
- Urteil: Nach dem ersten Besuch kommt alles cache-first aus dem Service Worker, spürbar ist also nur der Erstbesuch. Erst messen (Lighthouse am Handy), dann entscheiden; ein Aufteilen bräche „kein Build“ nicht, wäre aber Aufwand L.
- Echter Nutzerfund: Der Quran-Text (1,4 MB) wird erst beim ersten Öffnen geladen und ist vorher offline nicht da (`app.js:11684-11705`). Ein Knopf „für offline bereitlegen“ wäre S.

**14. Store-Hülle (TWA/Capacitor)**
- Was: Widgets und Live Activities gibt es nur nativ. Eine TWA für den Play Store ist billig; iOS über Capacitor bringt Apple-Review-Risiko (Guideline 4.2), 99 $ pro Jahr und eine zweite Auslieferung.
- Urteil: Erst wenn Nutzerzahlen es rechtfertigen.

### Top 3
1. **Wake Lock** – kleinster Aufwand, sofort spürbar genau im neuen Texte-Lernen.
2. **Druck-Stylesheet** – echter Offline- und Unterrichtsnutzen ohne Server, Daten oder Lizenzfrage (außer Quellenzeile).
3. **Selbstaufnahme lokal**, und Rezitations-Audio nur falls die Lizenz schriftlich geklärt ist – Hören und Aufsagen ist der Kern des Auswendiglernens.

### Ausdrücklich nicht bauen
- Sprachsynthese oder KI für Arabisch (Qualität, § 1.6).
- Web Push, Badge-Druck und View Transitions: Server- bzw. Regressionskosten übersteigen den Nutzen.

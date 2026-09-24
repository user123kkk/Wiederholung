# Logbuch: Prüfschleife

Letzter Eintrag zuerst. Auftrag: [`AUFTRAG.md`](AUFTRAG.md).
Routine: `trig_016y2uuWtQZ4yrCzAhkZsLQn`, stündlich zur Minute 50 (UTC), weckt
die Session `session_01AFmawb4fvtC6x7d1U1ExLT`.

| Nr | Station | Stand |
|---|---|---|
| 1 | Start | erledigt (v3.16.1) |
| 2 | Einstieg | erledigt (v3.17.1) |
| 3 | Anmelden | erledigt (v3.17.2) |
| 4 | Bestätigung | erledigt (v3.17.3) |
| 5 | Lernen-Start | erledigt (v3.17.4) |
| 6 | Lernrunde | erledigt (v3.14.0/3.15.0 Umdrehen/Bewerten, v3.17.5 Rest) |
| 7 | Rundenende | offen |
| 8 | Üben | weitgehend (v3.15.0: Auswahl, Bewertung, Ende, Schreiben-Tinte); Rest: Schreiben im Vollbild, Speicherkarten-Liste |
| 9–18 | … | offen |

---

### 2026-09-24 — Betreiber: Rückgängig zählt zurück, „soll flüssig sein" (v3.17.6)

**Anlass (Vorrang vor der Schleife):** Antwort auf die offene Frage aus
Station 6: „ja natürlich [...] man hat es ja nicht gewollt, nichts zum
überlegen". Dazu: „Meinst du du findest mehr? Soll flüssig sein."

**Geändert (app.js):** `gradeCard` (~Z. 4936) merkt sich in `lastAction`
`verlaufTag`/`verlaufArt` ("n" bei neuer Karte, sonst "w");
`undoLastGrade` (~Z. 5060) zählt genau diesen Zähler herunter und schreibt
sofort (`persistVerlauf`) – gebündelt wäre riskant, weil
`verlaufZusammen` je Tag die größere Zahl nimmt. Üben hat kein Rückgängig
(`lastAction` nur im Lernen), dort nichts zu tun.
**Geändert (styles.css):** Einblend-Bewegung der Kartenliste nur noch
`:nth-child(-n+14)` (die Regel traf jede Zeile, Rest nur verzögert);
`.card-row { content-visibility: auto; contain-intrinsic-size: auto 75px }`
(gemessene Zeilenhöhe 75 px, 98 bei zwei Zeilen).
**Neu (Prüfstand):** `t_undo_verlauf.js` (3× bewerten/rückgängig → Zähler
stimmt, auch im Store), `t_fluessig.js` (CPU 4×, longtask + Bilder > 34 ms je
Handlung), `t_fluessig_gross.js` (400 Karten, mit CPU-Profil),
`t_liste_lang.js` (Scrollen ans Ende, Ziehen sortiert).
**AUFTRAG.md:** Prüfliste um „Flüssig" ergänzt – ab Station 7 mitmessen.

**Gemessen (CPU 4×, 400 Karten, erstes Bild nach Tipp):** Verwalten 206 →
79 ms (zweites Mal 33), Fortschritt 137 → 89 ms. Profil vorher:
`syncAppbarKante` 93 ms – nicht die Funktion selbst, sondern ihr
`scrollY`-Lesen erzwingt das Layout der ganzen neuen Liste.
Mit 40 Karten: alle Handlungen < 100 ms, Umdrehen/Bewerten 0 verpasste
Bilder.
**Regression:** `t_runde_rest.js` ohne Fund, Affe Handy 150 / iPad 120
Schritte 0 Befunde, Liste lang: sortiert, Ende sichtbar.

**Entscheidung:** `content-visibility` statt eine eigene „virtuelle Liste"
zu bauen – eine CSS-Zeile, kein neuer Code, der Browser rechnet die
Zeilen weiter selbst (Suchen mit Strg+F, Ziehen, Tastatur bleiben).

**Offen:** Fortschritt beim ersten Öffnen noch ≈90 ms bei 400 Karten –
bei Station 9 (Fortschritt) genauer ansehen.
**Nächste Station:** 7 (Rundenende)

---

### 2026-09-24 — Station 6: Lernrunde, Rest (v3.17.5)

**Anlass:** Routine, 12:50 UTC. Keine neue Betreiber-Nachricht.

**Geprüft (`t_runde_rest.js`, Handy, klein, iPad):** Wischen rechts/links,
kurzer und senkrechter Wisch, Rückgängig, Notiz verbergen/zeigen, Merken,
Leertaste/1/2/3, Enter auf fokussiertem Knopf, Taste bei offenem Dialog,
Kontrast.
- **Fund 1: Rückgängig schließt die Notiz** – `undoLastGrade` setzte
  `extraOpen = false`, überall sonst gilt „offen" (2.7.0).
- **Fund 2: Enter/Leertaste auf fokussiertem Knopf wirkungslos** – der
  Runden-Listener fing beide Tasten immer ab (`preventDefault`), Rückgängig
  und Schließen waren per Tastatur nicht bedienbar.
- **Fund 3: Tasten wirken durch offene Dialoge** – kein Test auf `.dlg`.
- Fund 4: „Merken" → „Gemerkt" macht den Knopf 8 px breiter, der Nachbar
  „Notiz" rückt 4 px.
- Fund 5: `aria-label` „Session abbrechen" – sonst heißt es überall „Runde".
- Ohne Befund: Wischen (beide Richtungen bewerten, kurz federt zurück,
  senkrecht nichts), Notiz ein/aus 0 px, Kontrast 0. Messfehler im ersten
  Lauf: „Nicht" lässt „Karte x von y" gleich (Karte kommt wieder) – der Test
  prüft jetzt, ob die nächste Karte zugedeckt ist.
- Bemerkt, nicht gebaut (Lernlogik): Rückgängig setzt die Karte zurück, zählt
  den Tagesverlauf (`verlauf[heute].w/n`) aber nicht herunter – Fortschritt
  zeigt nach einem Rückgängig eine Antwort zu viel. Gehört zur Lernlogik/
  Statistik, deshalb nur notiert.

**Geändert (app.js):** Tastatur-Listener (~Z. 5080–5100): Dialog-Sperre,
Enter/Leertaste bei Fokus auf BUTTON/A/SELECT durchlassen; `undoLastGrade`
(~Z. 5065) `extraOpen = true`; `renderSession` zuLabel „Runde beenden",
Merken-Knopf mit beiden Wörtern (`.merk-btn__wort`). **styles.css (Ende):**
`.merk-btn__wort`. Version 3.17.5.
**Neu (Prüfstand):** `t_runde_rest.js`.

**Geprüft danach:** alle Funde behoben auf allen drei Geräten; Regression
`t_sprung.js` 0 px (klein ±1 Rundung, wie vorher), Affe Handy 150 Schritte
0 Befunde.

**Offen:** Verlauf nach Rückgängig (s. o.) – vom Betreiber freigegeben und in
v3.17.6 gebaut.
**Nächste Station:** 7 (Rundenende – Einzahl-Grammatik dort schon in
3.17.4 behoben)

---

### 2026-09-24 — Station 5: Lernen-Start (v3.17.4)

**Geprüft (`t_lernen_start.js`, sieben Zustände × Handy hell/dunkel, klein,
iPad):** leer (Start-Liste), eine Karte, erste Runde, gefüllt, alles
erledigt, Serie in Gefahr, zweiter Bereich offen. Gemessen: Layout-Shift ab
dem Laden (PerformanceObserver `layout-shift`) 0,0000 überall, Kontrast 0,
nicht quer, keine Konsolenfehler.
- **Fund 1 (Grammatik): „Morgen kommen 1 Karte wieder."** – Lernen-Tab
  (`lernenStapel`) und Rundenende (gleicher Satz). Beim Suchen nach derselben
  Sorte: „Alle 1 Karte für heute durch" (Rundenende), „Alle 1 Karten sind
  gerade neu" (Fortschritt, Zustände), „aufgezeichnet sind 1 Tag"
  (Einstellungen). Alle vier gleich mit behoben – gehören zu Station 7/9/14,
  sind aber derselbe Fehler; dort nicht noch einmal suchen.
- **Fund 2 (doppelt): „Für heute durch" + „Heute ist in allen Bereichen
  alles erledigt"** bei nur einem Bereich mit Karten. Die 3.16.0-Sperre
  zählte `bereiche.length`, ein leerer zweiter Bereich hob sie auf.
- Ohne Befund: Plaketten „8 Wiederholungen · 4 neu" sind reine Anzeige (kein
  toter Knopf), Serie-Hinweis erscheint nur bei Gefahr, höchstens ein
  Hinweis, Start-Liste ersetzt den Hinweis.
- Bemerkt, kein App-Fehler: im Testzustand „erste Runde" zeigt die Serie
  „Heute wird Tag 1", weil der Test-Store kein `streak` setzt – echte Runden
  schreiben ihn.

**Geändert (app.js):** `lernenStapel` (~Z. 8768, 8778), Rundenende (~Z. 9523,
9532), Fortschritt-Zustände (~Z. 8979), Aufzeichnung (~Z. 7827). Version 3.17.4.
**Neu (Prüfstand):** `t_lernen_start.js`.

**Entscheidung:** Einzahl ausgeschrieben („Die Karte für heute ist durch.",
„Deine Karte ist gerade …") statt „1 Karte" – liest sich wie ein Satz, nicht
wie eine Zählung.

**Offen:** –
**Nächste Station:** 6 (Lernrunde – Rest: Wischen, Rückgängig, Notiz,
Merken, Tastatur)

---

### 2026-09-24 — Station 4: Bestätigung (v3.17.3)

**Anlass:** Schleife direkt nach Station 3 („Arbeite weiter an stellen wo du
es für nötig hälst").

**Geprüft (`t_bestaetigung.js`, Handy hell/dunkel, klein, iPad):**
- **Fund 1: Meldungen schieben alle drei Knöpfe** um 83 (Handy), 84–105
  (klein), 63–84 px (iPad) – „Noch nicht bestätigt", „erneut gesendet",
  Fehler.
- **Fund 2: kein Tipp-Feedback** – „Ich habe bestätigt"/„Erneut senden"
  wurden während der Anfrage weder gesperrt noch drehten sie (Checkliste:
  sofortige Rückmeldung).
- **Fund 3: Systemcodes im Text** – „Konnte nicht prüfen:
  auth/network-request-failed", „Fehler beim Versand: auth/too-many-requests".
- Fund 4: Text-Reste – „versuch es dann noch einmal" (seit 3.12.0 prüft der
  Bildschirm selbst), „Verifikations-E-Mail" neben „Bestätigungs-E-Mail",
  Spam-Hinweis doppelt (fest auf der Seite + in jeder Meldung).
- Ohne Befund: automatische Weiterleitung nach Bestätigung 2,2–2,8 s,
  Kontrast 0, Knöpfe im Fenster, nicht quer.
- Kein App-Fund, aber Prüfstand: `stubs.js` erlaubte unbestätigten Nutzern
  das Lesen – die App lief deshalb im Test in den „neues Konto"-Zweig und
  setzte das Thema auf dunkel. Echte Regeln (`firestore.rules` Z. 67/275)
  verweigern das; der Stub tut es jetzt auch (`permission-denied`).
  `reload()`/`sendEmailVerification()` im Stub können über
  `__FB.authFail` scheitern.

**Geändert (app.js):** `renderPendingVerification` (~Z. 6360–6400): Schütteln
wie in `renderAuth`, Spam-Satz kürzer, Knöpfe mit `disabled`/`busy`
(`ui.authBusyWas` = "pruefen"/"senden", neu in `ui`), Meldungen
(`auth-meldung`, `role`) unter die Knöpfe. `pruefeBestaetigung` /
`doResendVerification` (~Z. 2665–2700): `authErrorText(e)` statt Code, neue
Texte. `doRegister`: Info nur noch „Konto angelegt.". Version 3.17.3.
**Neu (Prüfstand):** `t_bestaetigung.js`; `stubs.js` s. o.

**Entscheidung:** Dieselben Bausteine wie Station 3 (Meldung unten,
Schütteln), damit beide Anmelde-Bildschirme gleich antworten (Checkliste
Konsistenz). „Ich habe bestätigt" bleibt trotz Selbst-Prüfung – er ist der
Weg bei hakendem Netz (Begründung 3.12.0).

**Geprüft danach:** Sprünge 0 px in allen Fällen und Geräten, Tipp-Feedback
ja, Texte ohne Codes, Kontrast 0; Regression `t_anmelden.js` unverändert 0.

**Offen:** –
**Nächste Station:** 5 (Lernen-Start)

---

### 2026-09-24 — Station 3: Anmelden (v3.17.2)

**Anlass:** Schleife nach Station 2, keine neue Betreiber-Nachricht außer
„Arbeite weiter an stellen wo du es für nötig hälst" (PostHog-Schlüssel
kommt später mit „von vorhin:").

**Geprüft (`t_anmelden.js`, Handy hell/dunkel, klein, iPad):**
- **Fund 1: Fehlermeldung schiebt den Knopf** – „E-Mail oder Passwort stimmt
  nicht" stand über dem Formular, Anmelde-Knopf 63 px tiefer. Ein zweiter
  Tipp landete daneben.
- **Fund 2: Name-Fehler verlängert das Formular** um 30 px (eigene Zeile
  `.field__fehler` unter dem Feld), Knopf rutschte.
- Fund 3: Kein Tast-/Sichtsignal bei wiederholtem Fehlversuch – die Meldung
  steht schon da, ein zweiter Fehlschlag sieht aus wie „nichts passiert".
- Ohne Befund: Passwort vergessen (Bestätigung erscheint), Passwort-Auge
  behält Eingaben, Kontrast 0, keine waagerechte Scrollleiste.
- „Neues Konto" führt über den Einstieg (Plan speichern) – so gewollt
  (`mode-register`), kein Fund.

**Geändert (app.js, `renderAuth` ~Z. 6460–6520):** `ui.authError`/`ui.authInfo`
nach den Formular-Aktionen, Klasse `auth-meldung`, `role="alert"`/`"status"`;
Schütteln nur bei neuer Meldung (`ui.authFehlerGezeigt`); Name-Fehler als
`.opt--fehler` in der Beschriftung (`#a-name-fehler`), der input-Listener
setzt Text/Klasse zurück statt ein Element zu entfernen. Version 3.17.2.
**Geändert (styles.css, Ende):** `.auth-meldung` (enter-rise),
`.auth-wackeln` + `@keyframes auth-wackeln`, `.opt--fehler`.
**Neu (Prüfstand):** `t_anmelden.js`.

**Entscheidung:** Meldung unter den Knopf statt Platz oben freihalten – ein
leerer Platz wäre ohne Fehler ein Loch; unter dem Knopf verschiebt sie nichts,
was man noch antippen will. Schütteln nur einmal pro neuer Meldung, damit es
nicht bei jedem Neuzeichnen (z. B. Passwort-Auge) wackelt.

**Geprüft danach:** Sprünge 0 px (Fehler, Name), Kontrast 0 in allen
Varianten, keine Konsolenfehler.

**Offen:** –
**Nächste Station:** 4 (Bestätigung)

---

### 2026-09-24 — Station 2: Einstieg (v3.17.1)

**Anlass:** Routine, 11:50 UTC. Keine neue Betreiber-Nachricht seit v3.17.0.
Der Betreiber will den Einstieg inhaltlich selbst durchgehen – geprüft und
behoben wurde nur Handwerk (Sprünge, Kontrast, Lage), Inhalt und Ablauf
unverändert.

**Geprüft (`t_einstieg.js`, `t_einstieg_lage.js`, Handy/klein/iPad, hell+dunkel):**
- **Fund: Weiter-Knopf springt bei jeder Wahl** – Ziel 81/105/31 px
  (Handy/klein/iPad), Hürden 39/39/22, Zeitpunkt 0/25/2. Ursache: Knopf im
  Fluss direkt unter Echo-Satz bzw. Hürden-Echo; auf dem iPad zusätzlich die
  senkrechte Zentrierung (Echo verschob alles um die halbe Höhe).
- Fund 2: Knopf-Lage zwischen den Schritten verschieden (±30 px), weil nur
  Pflicht-Bildschirme die Hinweiszeile darunter haben.
- Fund 3: „kein Tracking" im Einstieg (Plan-Bildschirm) – seit 3.17.0 nicht
  mehr wörtlich wahr.
- Kontrast: Die Meldungen zu den Leiter-Wörtern waren ein Fehler des
  Prüfskripts (absolut gesetztes Kind außerhalb des Eltern-Kastens → Punkt als
  Hintergrund gewertet). `kontrast.js` wertet jetzt nur Flächen unter dem
  Text und überspringt laufende Animationen.

**Geändert (styles.css):** `.solo.einstieg-solo` volle Höhe als Spalte,
`.einstieg` wächst, `.einstieg > .einstieg-aktion` unten (`margin-top: auto`,
`position: sticky`, Verlauf, unterer Abstand hier statt an `.solo`), iPad:
oben mit Luft statt zentriert; `.einstieg-sperre` Zeilenhöhe = Mindesthöhe.
**Geändert (app.js):** `einstiegFuss` – leere Hinweiszeile auf Schritt 1–6;
Vertrauenssatz „Keine Werbung, keine Cookies."; Version 3.17.1.
**Neu (Prüfstand):** `t_einstieg.js`, `t_einstieg_lage.js`, `t_leiste.js`;
`kontrast.js` verbessert.

**Entscheidung:** Knopf unten fest statt Platz für das Echo freizuhalten – ein
freigehaltener Platz wäre vor der Wahl ein Loch; unten fest ist das Muster
der Vorbilder (Duolingo, Cal AI) und die Daumenzone.

**Geprüft danach:** Sprünge 0 px überall; Knopf auf Schritt 1–6 an derselben
Stelle (741/637/1077 px), Schritt 0 17 px höher (Link darunter); Kontrast 0;
Regression (Kontrast App, Sprünge Runde, Konto löschen), Affe klein 150, 0.

**Offen:** –
**Nächste Station:** 3 (Anmelden)

---

### 2026-09-24 — Betreiber: Analytics ja, Board, Hinweise, Runde (v3.17.0)

**Anlass (Vorrang vor der Schleife):** Datenschutz/Impressum „sollen mit der
Zeit gehen" → Analytics ja (PostHog, TikTok-Hinweis), Ideen-Board „cleane
dings statt plötzliches verspätetes pop up" und ausbauen, Übersetzung früher?,
Unterzeilen der Bewertung weg, Hinweise/Erinnerung „passend in bestimmten
Situationen", Video: Fortschritt sichtbar machen, vor dem Gehen zeigen, was
verloren geht, Rückblick. „viele regeln wurden von claude früher
geschrieben [...] kannst umgehen" (u. a. J1: keine neuen localStorage-Schlüssel).

**Geändert (app.js):** Statistik-Modul (Z. ~150–250: `POSTHOG_KEY` leer =
aus, `zaehle`, `zaehlSenden`, `zaehlKennungSetzen`, `zaehlBildschirm`) und
Ereignisse an Runde/Üben/Karten/Codes/Dateien/Sicherung/Konto/Einstellungen/
Ideen/Fehlerformular/Start; `BETREIBER_UIDS` = Betreiber-Kennung aus
`firestore.rules`; Ideen-Board neu (`renderFeedbackSeite`, `feedbackInhalt`,
`zeichneIdeen`, `feedbackZeile`, Entwurf per input-Listener, Vorladen in
`case "einstellungen"`, Einreichen ohne Neuladen); Hinweise
(`lernenHinweis`, `hinweisKarte`, `hinweisWeg`, `letzteWoche`,
`gesesseneKarten`, localStorage `adrabic-hinweise`); Erinnerung
(`erinnerungSheet`, `erinnerungIcs`, `erinnerungHerunterladen`, Zeile in den
Einstellungen); Bewertung ohne Unterzeilen; Löschen-Seite mit Fortschritt;
Version 3.17.0.
**Geändert (styles.css):** Antwort ohne Verzögerung (Linie 120 ms),
Knopfhöhe `--ctrl-lg`, `.schalter-optik`, Abschnitt „3.17.0 · Hinweise,
Ideen-Board, Erinnerung".
**Geändert (sonst):** `firebase.json` (CSP connect-src + eu.i.posthog.com, beide
Seiten), `datenschutzerklaerung.html` (Kurz gesagt, 2, 7, 8, 9, 10, neu 15,
Stand 24.9.), `plan/analytics/GERUEST.md`, `plan/PLAN.md` (Frage 14).
**Neu:** `plan/werkzeuge/pruefstand/t_317.js`.

**Entscheidung:**
- **PostHog ohne Bibliothek:** eigener schlanker Sender an `/batch/`. Kein
  fremdes Skript (Sicherheit, CSP nur connect-src), keine Cookies/kein
  Speicher auf dem Gerät, keine Autocapture/Aufnahmen. Kennung angemeldet =
  SHA-256("adrabic|"+uid) gekürzt (Wiederkehr messbar, nicht umkehrbar);
  abgemeldet = Zufall je Seitenaufruf ohne Personenprofil
  (`$process_person_profile: false`). Einstieg-Trichter über
  `bildschirm` = „einstieg-N".
- **Bis zum Schlüssel aus:** Ohne PostHog-Konto des Betreibers gibt es keinen
  Schlüssel; der Schalter in den Einstellungen erscheint erst mit Schlüssel.
- **Push-Mitteilungen nicht gebaut:** bräuchten einen Server (FCM + Cloud
  Functions, Blaze-Tarif) – stattdessen Kalendereintrag (.ics, täglich).
- **Übersetzung früher: ja** – die Rückseite war beim Umdrehen kurz leer.
- **Rabatt beim Kündigen (Video):** trifft nicht zu – es gibt kein Abo.
  Übernommen ist der Kern: vor dem Löschen den Fortschritt zeigen.
- **Moderation:** Anzeige jetzt nur für die Betreiber-Kennung; Sicherheit
  lag schon immer in den Regeln (`istFeedbackModerator`).

**Geprüft:** `t_317.js` dunkel+hell (Hinweis-Kette Meilenstein → Erinnerung
→ Ideen, .ics mit RRULE und DTSTART, Toast, Einstellungszeile, Board ohne
Platzhalter nach Vorladen, Stimme 3→4, Einreichen mit Dank, keine
Moderation für Nicht-Betreiber, Statistik: 13 Ereignisse, Kennung „k-…",
keine uid/E-Mail/Inhalte im Versand); Kontrast 0; Sprünge 0 (±1 px am
360-px-Handy); `t_hick`, `t_ueben`, `t_start`, `t_sicher`; Affe 200, 0.

**Offen:** PostHog-Schlüssel und IP-Einstellung (Betreiber, siehe PLAN
Frage 14); Datenschutz-Punkt 15 rechtlich gegenlesen lassen; Kalender-Datei
am iPhone prüfen.
**Nächste Station:** 2 (Einstieg)

---

### 2026-09-24 — Station 1: Start (v3.16.1)

**Anlass:** Routine `trig_016y2uuWtQZ4yrCzAhkZsLQn`, 10:50 UTC. Keine neue
Betreiber-Nachricht seit v3.16.0.

**Geprüft (`plan/werkzeuge/pruefstand/t_start.js`, `t_klein_boot.js`):**
- **Hänger beim Start – Fund.** `initFirebase()` → `importMitVersuch()`;
  `render()` läuft erst nach `onAuthStateChanged`. Antwortet gstatic.com
  nie (weder Daten noch Fehler), gab es keinen Ausweg: nach 11 s nur das
  Zeichen. Der 9-s-Hinweis (`ladeTimer`) sitzt im Lade-Zweig von `render()`
  und greift erst bei langsamen DATEN.
- Startbild vs. erstes Bild (1170×2532): mittlere Abweichung 0,01 je Kanal,
  eine Stelle >24 (Quantisierung) – Startbilder müssen nicht neu.
- Übergang: 0,15/0,45 s Ladebild, 0,7/0,85 s Ausblenden, ab 1,0 s App.
  Kein leeres Bild dazwischen gemessen.
- Bewegung reduziert: Hof/Linie aus (Regel in 3.13.0), Linie erscheint ohne
  Einblendung nach 0,9 s.

**Geändert (app.js):** `let ersterRender` (Z. ~1033), in `render()` gesetzt;
`startWaechter()` + `START_WAECHTER_MS = 9000` im Startblock;
`bootLangsamHinweis()`; Lade-Zweig in `render()` über `data-stand`
(ruhig/langsam/fehler) statt Klassenprüfung – der Hinweis wird nicht bei
jedem Neuzeichnen neu eingeblendet. Version 3.16.1.
**Geändert (styles.css):** `.boot__hinweis` (absolut unter der Linie).

**Entscheidung:** Hinweis und Wartezeit wie beim langsamen Datenladen (ein
Satz, „Neu laden", 9 s) – eine Regel, nicht zwei. „Neu laden" statt
„Selbstheilung" (Caches löschen): bei einem Hänger ist das Netz das
Problem, nicht der Zwischenspeicher. Der Fehlerfall (`syncError`) behält
den Fluss-Aufbau (`.boot--hinweis`), weil er mehr Text trägt.

**Geprüft danach:** Zeichen/Name vor und nach dem Hinweis 374/486 px (0
Sprung); normaler Start ohne Hinweis; 320×568: Knopf endet bei 503 px;
Kontrast 0; Sprünge 0 (bekannte 4 px); `t_hick.js`; Affe 150 Schritte, 0.

**Offen:** Fehlerfall `syncError` am Bildschirm nicht nachgestellt (der
Prüfstand kann Firestore-Fehler noch nicht auslösen) – gehört zu Station 16.
**Nächste Station:** 2 (Einstieg)

---

### 2026-09-24 — Hick-Durchgang über das ganze Tool, „Tage gelernt" (v3.16.0)

**Anlass:** Betreiber (Vorrang vor der Schleife): „mach einfach, und achte
dabei auf hick's law" (= offene Fragen 14/15 selbst entscheiden), „bei profil
wie viele tage gelernt, muss da auf jeden überprüft werden weil hab das tool
locker über 30 tage genutzt", „deine karten [...] zu viel platz [...] stufen
und farbe erklärt", „sachen im doppelt gemoppelt raus", „gesamtes tool".

**Vorgehen:** Inventar jedes Bildschirms (`plan/werkzeuge/pruefstand/
t_inventar.js`, `t_inventar2.js`: Text-Gliederung + Ganzseitenfotos), dann
jede Information gegen die anderen Bildschirme gehalten.

**Befund „Tage gelernt":** `Object.keys(verlauf).length`. Das Protokoll gibt
es seit 2.8.0 (7.9.2026), es zählt nur Tage mit Bewertung, hält 120 Tage.
`ersteBewertung` existiert erst seit 1.6.0 (3.9.2026) und nur für Tage mit
neuen Karten. Die Tage des Betreibers vor dem 7.9. sind **nirgends
gespeichert** – nicht rekonstruierbar.

**Geändert (app.js):** Profil (`renderEinstellungen`) ohne Zahlenreihe, neu
`kontoSeit()` („Dabei seit …" aus `currentUser.metadata.creationTime`);
Einstellungen-Kopf ohne „Fertig"; `tagGelernt()` + Feld `u` im Protokoll
(`normVerlauf`, `verlaufZaehle`, `verlaufZusammen`, `verlaufNachschicken`,
`verlaufSumme`), alle Serien-/Tagesprüfungen über `tagGelernt`
(`serieAktuell`, `lernenSerie`, `lernenStapel`, `renderRundenEnde`,
`startListe`), `gradeCard` zählt Übungsantworten (`u`); Fortschritt:
`fortschrittHeute`/`fortschrittTrend` entfernt, `fortschrittWochen` =
Zahl + Vergleich + Kalender + Übungszeile, Legende kompakt ohne Nullen,
Umschalter weg (`ui.statsScope` fest „alle"), Lektionen-Zeile für den offenen
Bereich; Lernen ohne doppelte „fällig"-Zeile, `trotzdem-ueben` öffnet Üben,
Alles-erledigt-Banner nur bei mehreren Bereichen; Verwalten: Stand-Punkte
statt Plakette, Zieh-Hinweis nur bei mehreren Seiten, Suchbereich nur beim
Suchen; Kartenblatt ohne „– Pflicht", Notiz mit Platzhalter; Rundenende ohne
„Fertig" in der Kopfzeile; zwei Einleitungstexte gekürzt. Version 3.16.0.
**Geändert (styles.css):** `.profil__seit` (statt `.profil__zahlen`),
`.stat-legend--kompakt`, `.wochen-kopf`, `.wochen-ueben`,
`.card-row__stand`, `.liste-suchbereich`.

**Entscheidung:**
- **Frage 15 (Üben im Fortschritt): gebaut, ohne Serie.** Ein reiner
  Übungstag füllt keinen Wochenpunkt, kein Kalenderkästchen, hält keine
  Serie. Geprüft: 6 Übungsantworten → Serie und Woche unverändert; danach
  eine echte Runde → heutiger Punkt gefüllt.
- **Frage 14 (Analytics): nicht gebaut.** Die Datenschutzerklärung verspricht
  wörtlich „Keine Werbung, kein Tracking, keine Analyse-Dienste" und „keine
  Analyse des Nutzungsverhaltens". Jede Zählung bräche das öffentliche
  Versprechen an die Nutzer:innen oder müsste es ändern – das ist keine
  Gestaltungsfrage, die „mach einfach" abdeckt. Dem Betreiber als Ja/Nein
  vorgelegt („Zählen ja?"); bei Ja: anonyme Tageszähler ohne Kennung +
  neuer Absatz in der Datenschutzerklärung + Firestore-Regel (die
  `veroeffentlichen.bat` NICHT mitspielt – sie deployt nur Hosting).
- **Serie nur noch auf Lernen**, nicht im Fortschritt: Lernen ist der Ort,
  an den man täglich kommt (Rückkehr-Drang), Fortschritt der Ort für „wie
  stehe ich da".
- **„Serie fortsetzen" entfällt** mit `fortschrittHeute`: hing an
  `streak.gerissenAm`, das seit 2.14.0 nie gesetzt wird (toter Hinweis).
- **Einstieg nicht umgebaut:** Der Betreiber will ihn selbst durchgehen;
  im Inventar keine Doppelung gefunden, die nicht bewusst ist (Echo-Sätze).

**Geprüft:** Kontrast 0; Sprünge Lernen/Üben 0 px (Ausnahme bekannt: 4 px am
360-px-Handy bei Rückfall + Notiz); `t_hick.js` hell und dunkel (Profil,
Fortschritt, Suchbereich an/aus, Formular, Rundenende, Trotzdem üben, Serie
bei reinem Üben); `t_ueben.js`, `t_sicher.js`; iPad + Desktop; Affentest
200 (Handy) + 150 (iPad) Schritte, 0 Befunde.

**Offen:** Frage 14 (Ja/Nein des Betreibers). J1.
**Nächste Station:** 1 (Start)

---

### 2026-09-24 — Betreiber-Rückmeldung zu Üben, Tinte, Ring (v3.15.0)

**Anlass:** Betreiber (hat Vorrang vor der Schleife): Üben überladen, Banner
auf jeder Karte unnötig, Schreiben dunkel auf dunkel, Bewertungsknöpfe ins
Üben zurück, Üben evtl. im Fortschritt zählen, Umrandungs-Animation aus dem
Einstieg durchgängig, Analytics notieren, „alles durchdenken".

**Geändert (app.js):** `drawStrokes()` Farben aus `--text-1`/`--border-strong`;
`renderSession()` – Kopfzeilen-Hinweis erste Übungskarte (`.mitte-wechsel`),
Üben mit Knopf + antippbarer Karte + Bewertungszeile (eigene Unterzeilen),
Raster-Mitte (`.study-card__oben/__unten`), `study-flaeche--wartet`, Tipp-Satz
nur bei `!s.zug`; `leechHinweis()` gekürzt; `gradeCard()` zählt auch im Üben,
kein Neumischen; Tastatur/Tipp-irgendwo decken nur noch auf; Wischen auch im
Üben; `renderRundenEnde()` mit Übungsfassung + `drill-nochmal`;
Übungsauswahl neu (`ui.drillGruppen`, `gruppenName`, `drillGruppenKarten`,
`startDrillGruppen`, `case "stufe-chip"` an/aus); `waehleStufe()` und
`startDrill(min,max)` entfernt (unbenutzt); Version 3.15.0.
**Geändert (styles.css):** `--paper-500` (dunkel), `--cinnabar-400`,
`--verdigris-400` (hell/dunkel), `.grade-row .sub` ohne Deckkraft,
`.badge.zustand-frisch` hell; `karte-einladen`, `geist-glanz-*`,
`karte-schatten` über `::before`-Deckkraft; `.segment`, `input.schalter`,
`.drill-*`, `.mitte-wechsel`, `.study-card__mitte` als Raster,
`.leech-banner` mit Zeichen daneben.
**Neu:** `plan/werkzeuge/pruefstand/kontrast.js` + `t_kontrast.js`,
`t_ueben.js`, `t_sprung_ueben.js`, `t_ring.js`, `t_fotos_runde.js`;
`plan/analytics/GERUEST.md`; offene Fragen 14 (Analytics) und 15 (Üben im
Fortschritt) in `plan/PLAN.md`.

**Entscheidung:**
- **Schreiben bleibt**, aber als Schalter mit Unterzeile statt Haken mit
  Klammertext. Ob es ganz wegfällt, kann erst Nutzung zeigen (Frage 14) –
  Entfernen wäre nicht rückgängig zu machen für die, die es benutzen.
- **Bewertung im Üben wirkt nur auf die Runde.** Alles andere hieße, die
  Lernlogik zu ändern (tabu). Deshalb eigene Unterzeilen („passt", „sitzt")
  statt „morgen/später wieder".
- **Üben zählt (noch) nicht im Fortschritt:** Die Anzeige wäre leicht, aber
  ob ein Übungstag die Serie hält, ist eine Entscheidung des Betreibers
  (Frage 15, Empfehlung: nein).
- **Analytics nicht gebaut:** braucht Rechtsprüfung und eine Wahl (Frage 14).
- **Kontrast wird jetzt gemessen, nicht angeschaut** – die dunkle Tinte war
  genau die Sorte Fehler, die man auf Fotos übersieht. `t_kontrast.js` gehört
  ab jetzt zu jeder Runde der Schleife.

**Geprüft:** Kontrast 0 Funde (vorher 48); Sprünge: Aufdecken 0 px, Karte zu
Karte 0 px (Ausnahme 4 px am 360-px-Handy, wenn Rückfall-Hinweis und Notiz
zusammenkommen); Üben komplett (Auswahl, 12 Bewertungen, Ende, Nochmal,
Schreiben hell/dunkel); Ring und Aufleuchten Bild für Bild; Regressionstests;
Affentest 200 + 150 Schritte, 0 Befunde.

**Offen:** Fragen 14 und 15 (`plan/PLAN.md`).
**Nächste Station:** 1 (Start)

---

### 2026-09-24 — Schleife eingerichtet; Karte dreht sich wirklich (v3.14.0)

**Anlass:** Betreiber: „lern modus zumindest kann man karte nur umdrehen wenn
man auf antwort anzeigen drückt, soll das? bitte nimm kritik nicht akzeptant
immer an. sonst ist karten umdrehen [...] sehr unsatisfying. knöpfe garnicht
[...] versuch selbst eine loop zu erstellen [...] von 1 bis ende".

**Geändert (app.js):** `renderSession()` – Karte aus zwei Seiten
(`.karte-dreh`, `.karte-seite--vorn/--hinten`), Karte trägt im Lernen
`data-action="reveal"`, Platzhalter für „Merken", Notiz und Rückfall-Hinweis
vor dem Aufdecken; neu `leechHinweis()`, `kartenAbflug()` (aus `gradeCard()`
gerufen); `revealAnswer()` mit Doppeltipp-Sperre und `fuehlbar(8)`;
`stufenBereichName()` → „alle Karten"; Üben-Hinweis mit Abstand wie die
Bewertungszeile; Version 3.14.0.
**Geändert (styles.css):** `.study-flaeche` nur noch Griff, Aussehen auf
`.karte-seite`; `karte-wende`, `karte-hebt`, `karte-schatten`;
`.karte-geist--*` + `geist-*`; `.study-aufdecken`/`.grade-row button` 58 px;
`karte-kommt` ohne Füllmodus `both`.
**Neu:** `plan/audit/AUFTRAG.md`, dieses Logbuch,
`plan/werkzeuge/pruefstand/` (Prüfstand aus dem Scratchpad ins Repo geholt,
sonst stünde die Schleife nach einem Container-Neustart ohne Werkzeug da).

**Entscheidung:**
- **Antippen deckt auf – die Kritik stimmt, die alte Begründung nicht mehr.**
  2.16.0 hatte bewusst nur den Knopf zugelassen („wer zielen muss, soll nicht
  aus Versehen aufdecken"). Das galt einem Tipp *irgendwo*. Die Karte selbst
  anzutippen ist Absicht, Aufdecken bewertet nichts, und Anki/Quizlet machen
  es genauso. Der Knopf bleibt (Zugänglichkeit, Gewohnheit).
- **„Fast"/„Sicher" bleiben.** Geprüft: Die Zahl der Knöpfe ist Lernlogik
  (tabu); die Wörter sind kurz und eindeutig, die Unterzeilen verraten kein
  System. Was
  fehlte, war das Gefühl, nicht die Beschriftung – deshalb Abflug + Druck.
- **Wegflug statt Verschwinden** mit einer Kopie außerhalb von `#app`, weil
  `render()` das Markup ersetzt. Nach einem Wisch wird nichts kopiert (die
  Karte fliegt dort schon selbst).
- **Nebenfund behoben:** `karte-kommt`/`karte-dreht` liefen mit
  `animation-fill-mode: both` auf `.study-flaeche`; die Endlage einer
  gefüllten Animation überschreibt Inline-Styles – das Wischen hätte die
  Karte danach nicht mehr sichtbar bewegt.

**Geprüft:** Sprungmessung über 12 Karten × 4 Geräte = 0 px (vorher −3 bis
−120 px), Üben 0 px; Drehung und Abflug Bild für Bild (dunkel und hell);
Wischen nach dem Drehen bewegt die Karte; Doppeltipp deckt einmal auf;
Regressionstests; Affentest 200 Schritte, 0 Befunde.

**Offen:** –
**Nächste Station:** 1 (Start)

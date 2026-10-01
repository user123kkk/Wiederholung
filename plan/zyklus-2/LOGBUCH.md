# Logbuch: Zyklus 2

Letzter Eintrag zuerst. Auftrag: [`AUFTRAG.md`](AUFTRAG.md).

### 2026-10-01 — Paket A fertig am Netzteil, 3.18.11, nicht veröffentlicht

**Geändert:** Vorhandenen uncommitteten Paket-A-Stand vollständig fortgesetzt,
A7/A13 bereits zuerst nachgeholt. Paket-Version 3.18.11 aus dem Zwischenstand
beibehalten: app.js:19, sw.js:10, alle 33 index.html-Querys einschließlich
31 Startbildern, CHANGELOG oben. In dieser Netzteil-Fortsetzung keine weitere
Produktionsänderung; t_text_felder.js auf berechtigtes Betreiber-Fixture und
erneute echte Einwilligung nach dem absichtlichen Leeren des Stores angepasst.
Alle bisherigen Feld-/Mengen-/Verweisprüfungen und fünf Wege erhalten.
AUFGABEN A1–A13 erledigt, STAND/PLAN/KONSOLE K10 nachgezogen; eigene
Prüfaufbau- und Diagnosefehler in LEHREN. Nur Paket A, kein neues Paket.

**Entscheidung:** Betreiber hat Netzteil angeschlossen und damit gemäß neuer
AGENTS-Anweisung den Abschluss einschließlich Commit/Push auf main beauftragt.
BatteryStatus 2 vor Gesamtlauf, währenddessen und vor Abschluss gemessen.
Kein Auftrag zum Veröffentlichen; kein ladegeraet-/veroeffentlichen-/Deploy-Aufruf.
Der vorausgegangene Pull auf 90d7aaa betraf nur AGENTS.md und erhielt den
Zwischenstand per Autostash b2dea40; Produktstand seitdem identisch.
Vor dem Commit nochmals Remote geprüft: 76d10d3 enthält ausschließlich
die neue Z10-Entscheidung für ein späteres Paket. Diff gelesen, per
git pull --ff-only --autostash übernommen; Autostash 37580c1 erfolgreich
angewendet. Vergleich gegen 37580c1 ohne ENTSCHEIDUNGEN.md leer, alle elf
neuen Dateien erhalten. AGENTS.md danach neu gelesen; Prüfquellstand unverändert.

**Abnahme, alle vollständigen Ausgaben gelesen:**

- Frischer Gesamtlauf alle_pruefen.js: zunächst 128/130; t_text_felder rot,
  weil u1 als normales Konto seit A8 keine Texte importieren darf.
  Das absichtliche Store-Leeren entfernt auch die Einwilligung. Erster
  Betreiber-Fixture-Nachlauf wartete deshalb im echten Einwilligungsdialog;
  abgebrochen, bevor er ein Ergebnis speichern konnte. Jetzt Dialog wirklich
  bestätigt und Importabschluss abgewartet. Fünf Wege grün; Gegenprobe
  --gegenprobe gegen festen 48002ad bleibt auf allen fünf Wegen rot.
  Kein Erwartungswert gelockert, keine Prüfung gelöscht oder übersprungen.
- t_text_tempo zunächst Verwalten 325 ms > 200; unverändert im gezielten
  Nachlauf maximal 158 ms und Exit 0. x_ab_tempo.js 6 c4b1c30 am Netzteil,
  abwechselnd Vorstand/Arbeitsstand: Verwalten alt
  154/220/225/237/301/314 (Median 237), neu 66/214/220/222/244/278
  (Median 222), jeweils 5/6 > 200; Text alt Median 139, neu 143,
  Überschreitungen 1/6 bzw. 0/6. Bestehende Render-Verzögerung bzw.
  Rechnerschwankung belegt, keine neue Paket-A-Regression; keine pauschale
  Ruckelfreiheit behauptet. Kein Tempo-Code außerhalb A geändert.
- alle_pruefen.js --fortsetzen danach **130/130 Exit 0, 0 rot**.
  128 unveränderte grüne Tests nach Quell-/Test-Hash bewahrt, nur die beiden
  auffälligen Tests frisch. Fingerprint
  9899bd6d5bb78fd3e3dc2e04c79f392b4ed185dcc48e036ea9df4bbeb75636b9.
  Alle 130 vollständigen Einzel-Logs gelesen, auch die beschreibenden Ausgaben.
- abnahme_runde.js --fortsetzen: **13/13 grün**, identische Quell-/Test-Hashes
  aus Gesamtlauf. Vollständige Rundenende-/Üben-/Schreiben-Ausgaben gelesen.
  Sprung Lernen/Üben jeweils 0 px auf geprüften Formaten, Kontrast 0 Funde,
  a11y ohne Funde. t_bestand_tempo: sämtliche Bewertungen CPU 4× < 100 ms,
  größter Wert 83 ms; Zeichnen CPU 4× und Scrollen ohne Bilder > 34 ms.
  Beschreibende alte Onboarding-/Tabwechsel-Befunde bleiben anderen Paketen
  zugeordnet; keine vollständige UI-Fehlerfreiheit oder echtes iOS behauptet.
- Affe, AFFE_TEXTE=1, Seed 7, nacheinander: handy 200 Schritte,
  156 Texte-Aktionen, **0 Befunde**; ipad 150 Schritte,
  126 Texte-Aktionen, **0 Befunde**.
- bash plan/werkzeuge/regeln_testen.sh: **210/210 wie erwartet**, Exit 0.
  Komplette 235 Ausgabezeilen gelesen. Git-Bash meldet beim Start den
  POSIX-Pfad /c/... in der Emulator-Konfiguration als nicht existent;
  der Test lädt aber RULES_FILE vollständig mit readFileSync und übergibt
  RULES_TEXT an initializeTestEnvironment (regeln-pruefung.mjs:82–86).
  Die Tests prüfen damit die tatsächlichen Repo-Regeln; erwartete
  Ablehnungen einschließlich einzelner Marker-/Zähler-Manipulationen
  belegt, kein Erfolg gegen erlaubende Ersatzregeln behauptet.
  Emulator danach beendet; keine produktiven Konten/Regeln angefasst.
- node --check app.js / sw.js / t_text_felder.js, pruefe_stand.mjs und
  git diff --check grün; CSP aller HTML-Seiten und APP_SHELL geprüft.

**Gegenprüfung § 2a (Diff und Befunde, nicht nur Bericht):**

- A1/G-110: Dialog bindet ursprünglichen Auth-Auftrag vor dem Await;
  App- und SDK-Kontowechsel blockieren fremdes Löschen/Abmelden.
- A2/G-107: sämtliche Auth-Fortsetzungen, Fehlerpfade und frühe Rückkehr
  gegen Auftrag geprüft; Normalfälle, eigene Löschung 0/25 ms und A→B→A grün.
- A3/G-108: private Karten-/Feedback-Entwürfe, Auswahl und Zeichnung
  beim Wechsel geleert; keine Daten von A in B.
- A4/G-111: Nachtrag nur für eigene Registrierung; neuer Versuch kann normal
  Profil/Mail abschließen. A→B→A schützt fremde Antworten.
- A5/G-109: Inventar fordert nichtleere sichtbare Zustände, echtes Rundenende
  und vollständiges Onboarding bis Plan speichern; Gegenprobe c4b1c30 zeigt
  den alten falschen Exit 0. Wrapper-Hash umfasst verwendete Hilfsproben.
- A6/DATEN-1: Marker create/delete nur mit passender atomarer Zähleränderung,
  eigener Marker unter fehlendem Eltern-Dokument löschbar. Kontolöschung
  zieht eigene Stimmen auch von entfernten Ideen ab, fremde Marker bleiben;
  echte SDK-Probe plus sechs neue Regel-Angriffs-/Normalfälle.
- A7/DATEN-3: laufender HTML-Cache nur bei gleicher exakter App-Version;
  Quote verhindert Versionspräfix-Verwechslung. Echte HTTP-/Worker-Probe:
  Normal-/Abbruch-Update, Offline-Start unter / und index.html grün.
  Gleichversionige HTML-Korrektur weiterhin cachebar.
- A8/DATEN-4: Textimport nur Betreiber mit vorhandener/erneuter Zustimmung;
  Zustimmung vor Write, Ursprung nach Await geprüft, geteilte Sätze
  ausgeschlossen. Kartenimport bleibt möglich. Aktueller Sperrtest und
  feste c4b1c30-Gegenprobe sowie unveränderte Feldprüfung grün.
- A9/DATEN-5: genau 15 Original-Restzeilen aus 4462fac gesichert, R15-Präfix
  verhindert Kollision; aktueller Codepfad nachgelesen, kein neuer
  Laufzeitnachweis oder zusätzlicher Bauauftrag daraus behauptet.
- A10/DATEN-2: Dialog und Banner nennen dieselbe Handlung für erneuerte
  Anmeldung bzw. dauerhafte Ablehnung; kein falsches automatisches Retry.
- A11/DATEN-6: Offline-Sperre in UI und Funktion, bestehendes Zeitlimit 12 s,
  Entwurf erhalten, verspäteter Erfolg ohne alte UI-Wirkung. 24 angrenzende
  Formular-Konfigurationen grün. Backend-Write selbst bleibt unabbrüchlich.
- A12/DATEN-7: alle vier Settings-Aufrufer als Einzelpatch; nach
  permission-denied nur bei bekannten Settings-Keys und tatsächlichem Altfeld
  einmal serverbasierte bereinigende Transaktion, Ursprung geprüft.
  Zwei Offline-Geräte bewahren aktuelle Fremdwerte; ohne Altfeld kein
  Ganz-Schreiben. Echte SDK- und Kontowechsel-Abnahmen grün.
- A13/DATEN-8: beide Rechtsseiten im Zusatzcache, online Netz zuerst,
  App-Index-Rückfall ausschließlich root/index relativ zum Worker.
  Beide Seiten vor erstem Besuch offline, beim ersten Online-Aufruf frisch;
  unbekannte Pfade ohne App-Fallback. Wortlaut unverändert.

**LEHREN § 14, Punkt für Punkt:**

1. Vollständiger Produktions-Diff, relevante Codepfade und Testquellen gelesen;
   zusätzliche Fixture-Änderung samt Erwartungswerten separat gelesen.
2. Auth-/Settings-/Import-/Stimm-Marker-/SW-Muster im ganzen Repo gesucht.
3. Betroffene Speicher-/Regel-Kommentare, Handlungstexte und CHANGELOG passend.
4. Kein neues Blatt/Cloud-Feld/Storage-Key; Rechtsseiten in zentralem Cache.
5. Bestehende ui-/Draft-Zustände genutzt, keine neue DOM-Zustandsquelle.
6. Angrenzende Formate 320/390/iPad, hell/dunkel, normal/reduziert, leer/voll
   gezielt grün; Sprung/Kontrast/CPU-Messungen wie oben, bekannte Verzögerung
   explizit eingeordnet. Echtes iPhone bleibt Geräteprüfung.
7. Meldungen in Worten mit Handlung, kein Systemcode/Methodenwert ergänzt.
8. Keine neuen Cloud-Felder; geänderte Regeln 210/210; K10 enthält
   Veröffentlichungsschritt mit Wo/Was/Woran, bleibt offen.
9. Bestehende Datenflüsse eingeschränkt, keine neue Datenart; DSE weiterhin
   zutreffend, Rechts-/religiöse Texte nicht verändert.
10. Syntax App und SW grün.
11. Eine Version 3.18.11 an vier Stellen, alle 33 Querys und CHANGELOG;
    pruefe_stand.mjs einschließlich CSP/APP_SHELL grün.
12. Betroffene Abnahmen, alle 130 Tests, 13 Runde und beide Affenläufe grün;
    vollständige Ausgaben/Gegenproben gelesen, keine Grenze gelockert.
13. AUFGABEN, LOGBUCH, STAND, PLAN/KONSOLE aktualisiert; eigene Fehler
    samt Ursache/Regel in LEHREN dokumentiert.
14. Betreiber-Schritt nur für späteres Veröffentlichen benennen:
    Regeln vor Hosting über ladegeraet.bat, aktuell kein Deploy-Auftrag.

**Kriterien:** K1–K6 aus grossplan/AUFTRAG § 3.1 für Paket A erfüllt;
A1 auf dieses Paket begrenzt erfüllt, A2 unverändert (keine offene
Entscheidung gebaut), A3 Regel-Schritt dokumentiert, A4 Paket-Prüfungen grün.
A5/A6 Gesamt-Nachprüfung gehören erst nach allen Paketen, hier nicht behauptet.

**Logs:** %TEMP%/adrabic-pruefstand-gesamt/9899bd6d5bb78fd3/*.log und stand.json;
%TEMP%/paket-a-gesamt-fortsetzung.log, paket-a-rundenabnahme.log,
paket-a-textfelder-gegenprobe.log, paket-a-tempo-ab.log,
paket-a-affe-handy.log, paket-a-affe-ipad.log, paket-a-regeln-abschluss.log.
Frühere feste A-Gegenproben und Bilder stehen in den beiden vorigen Bau-Einträgen.

**Offen:** Neue Firestore-Regeln müssen **vor späterem Hosting** eingespielt
werden (CODEX-START § 5.5, KONSOLE K10; macht ladegeraet.ps1 auf Betreiber-Auftrag).
Online bleibt 3.18.10. Bekannte Onboarding-/Tempo-/Gerätebefunde verbleiben bei
ihren Aufgaben; kein Bau außerhalb Paket A. Texte-Probelauf läuft unverändert.

**Abschluss:** Paket A direkt auf main committen und pushen, nicht veröffentlichen.
**Nächster Schritt:** Paket B nur im neuen ausdrücklich beauftragten Chat
mit dem Paket-B-Starttext aus CODEX-START; hier keine weitere Bauaufgabe.

### 2026-10-01 — A weiter: Pull mit erhaltenem Zwischenstand, weiterhin Akku

**Geändert:** Zuerst wie beauftragt `git pull --autostash`: main von
`c4b1c30` auf `90d7aaa` vorgespult, ausschließlich `AGENTS.md` aktualisiert.
Git hat Autostash `b2dea40` erfolgreich angewendet. Vergleich
`git diff b2dea40 -- . ':!AGENTS.md'` danach leer; alle elf neuen
Paket-A-Dateien weiterhin untracked vorhanden. Keine Produktionsänderung.
Dieser Logeintrag und `plan/STAND.md` halten die Fortsetzung fest.

**Entscheidung:** `AGENTS.md` vollständig neu gelesen, anschließend STAND,
CLAUDE und Prüfstand-LIESMICH sowie den letzten Abnahme-Eintrag gelesen.
Die neue Regel zu „A weiter“ erhält den uncommitteten Stand und verbietet
auf Akku den Paketabschluss. Alle 13 A-Zeilen bereits gezielt geprüft,
keine offene/zurückgegebene Bauaufgabe. Keine gültige Einzelprüfung ohne
Quelländerung wiederholt. Syntax App/SW und vollständige Standprüfung für
3.18.11 nach Pull erneut grün; Ausgabe vollständig gelesen.

**Offen:** BatteryStatus **1**, 35 %; daher weiterhin kein Gesamtlauf,
kein Affe, kein Commit/Push und keine Veröffentlichung. Lokale Version
3.18.11 erhalten, alle A-Zeilen `in Arbeit`. Regel-Veröffentlichung bleibt
für eine spätere, vom Betreiber ausgelöste Veröffentlichung offen.

**Nächster Schritt:** Netzteil anschließen und „Netzteil dran“ schreiben.
Bei gemessenem BatteryStatus **2** Paket A nach dem vorigen Eintrag
abschließen: Gesamtlauf, Affe, Gegenprüfung/Checkliste und erst bei Grün
Commit/Push auf main. Nicht veröffentlichen, kein Paket B beginnen.

### 2026-10-01 — Paket A gebaut: A7/A13 nachgeholt, Gesamtlauf braucht Netzteil

**Geändert:** `sw.js:49` (Rechtsseiten vorabspeichern), `sw.js:135`
(App-Startpfade), `sw.js:197` (nur passende HTML-Version im laufenden Cache),
`sw.js:220` / `sw.js:237` (sofortiger Cache/Index-Rückfall nur beim App-Start);
`plan/werkzeuge/pruefstand/t_sw_paket_a.js:18` (abgewartetes Async-Polling),
`t_sw.js:129` (neue Ressourcen-URL samt Antwort/Cache-Nachweis),
`app.js:19`, `sw.js:10`, `index.html:64` / `index.html:126` / `index.html:218`
(Version 3.18.11, alle 33 Querys einschließlich 31 Startbild-Links),
`CHANGELOG.md:1`, `LEHREN.md` §§ 5.3/15, Aufgabenliste, STAND und PLAN.
Vorhandene uncommittete A1–A6/A8–A12-Änderungen erhalten, keine anderen Pakete.

**Entscheidung:** Betreiber hat die Fortsetzung dieses Zwischenstands und
das Nachholen von A7/A13 ausdrücklich beauftragt. Der korrigierte echte
HTTP-/Worker-Test bestätigt zuerst den erfolgreichen Online-Update-/Offline-
Normalfall. Ursache der früheren Prüfaufbau-Fehler belegt: Offline wurde vor
Aktivierungsabschluss geschaltet; `waitForFunction(async ...)` behandelt
in dieser lokalen Playwright-Fassung die Promise als wahr (Quellcode:
`const success = predicate(); if (success) ...`). Jetzt wird jede Cache-/
Registrierungsabfrage per `page.evaluate` abgewartet und gepollt; Controller
muss mit dem aktivierten Worker übereinstimmen. SDK-Dateien werden an ihren
gespeicherten Request-URLs nachgewiesen; eine nackte Match-Abfrage passte
hier trotz vorhandener URL nicht. Entscheidend ist der anschließend
tatsächlich erfolgreiche Offline-Neustart. Automatische Registrierung und
Update-Prüfung erhalten getrennte Serverzustände; reales `reg.update()`,
keine lokal gerouteten Navigationsantworten und keine künstlichen Cache-Puts.
Eigene Diagnose-/Titel-/Quotierungsfehler in LEHREN festgehalten.

A7: Neue HTML mit anderer App-Version überschreibt den alten Cache nicht;
die neue Installation bringt ihre eigene Startseite. Korrekturen derselben
Version bleiben cachebar; Versionspräfixe werden durch die schließende
Quote unterschieden. A13: eigene Rechtsseiten im Zusatzcache, online Netz
zuerst, Index-Rückfall nur für `/` und `index.html`, jeweils relativ zu sw.js.
Rechtstexte und Lernlogik bleiben unverändert. Die alte Station B verlangte
das Vergiften des alten HTML-Caches und widersprach damit A7. Sie fordert
jetzt direkt eine neue Versions-URL an und prüft zusätzlich identische
Antwortbytes und genau einen Netzabruf für zwei Anforderungen; kein Test
gelöscht, keine Grenze gelockert. Echte Versionswechsel separat vollständig.

**Gezielte Abnahme, vollständige Ausgaben gelesen:**

- `t_sw_paket_a.js --gegenprobe`: fester c4b1c30 bestätigt Offline-Boot-
  Blockade nach Abbruch, App-Fallback statt Rechtsseiten und alte Online-
  Rechtsfassung; Normal-Update und gleichversionige HTML-Korrektur grün.
- `t_sw_paket_a.js`: erfolgreicher und gescheiterter Update-Versuch;
  Offline-Starts unter `/` und `/index.html`; HTML gleicher Version;
  beide Rechtsseiten offline vor erstem Besuch, beide beim ersten Online-
  Aufruf frisch; unbekannter Pfad ohne App-Fallback. Grün, auch mit 3.18.11.
- `t_sw.js`: alle Stationen A–D und festen Gegenproben grün, Funde 0;
  Cache-HTML bei 3 s Netzverzögerung nach 73 ms, alter Stand 3094 ms.
  Erster Lauf brach wegen nicht antwortendem Prüfserver 8099 ab, per HTTP-
  Abruf belegt; Server neu gestartet, HTTP 200 und vollständiger Lauf grün.
- `t_boot_geometrie.js`: fünf Geräteformate, pixelgleiche Zeichen/Namen,
  Georgia sowie simuliertes iOS-Erstbild/Standalone grün. Kein echtes
  iPhone-Ergebnis behauptet.
- `t_sprung.js`: alle vier Breiten ohne Sprung; `t_kontrast.js`: Funde 0;
  `t_a11y.js`: keine Funde, ruhige Bewegung und benannte Dialoge grün.
- Syntax App/SW/Test und `pruefe_stand.mjs` grün: Version 3.18.11,
  CSP unverändert passend und erweiterte APP_SHELL vollständig.
  Die übrigen gezielten A-Abnahmen/210 Regeltests wurden nicht erneut
  ausgeführt: ihre vollständigen grünen Ausgaben stehen im vorigen Eintrag.

**Gegenprüfung § 2a:** gesamten Produktions-Diff erneut gegen die Befunde
gelesen: A1–A4 ursprünglicher Auth-Auftrag/privater Reset, A5 echter
Inventar-Endzustand, A6 atomare Marker/Zähler-Paarung und eigener Löschfall,
A8 Zustimmung vor Import-Write, A9 genau 15 gesicherte Original-Restzeilen,
A10 passende Fehlerhandlung, A11 Offline/Zeitlimit, A12 Einzelsettings und
serverbasierte Altfeld-Transaktion. A7/A13 erfüllen jetzt die jeweilige
Abnahme; Schutz und Rückfall nur am vorgeschlagenen Pfad. Neue SW-Testquelle
und geänderte Station B vollständig gelesen. Keine neuen Datenfelder,
keine Funktion außerhalb Paket A und kein Release ausgelöst.

**LEHREN § 14, Punkt für Punkt (keine Commit-Freigabe):**

1. Produktions-Codepfade und Diff gelesen, siehe Gegenprüfung.
2. App-Navigation/Cache-Put/Fallback sowie übrige A-Muster geprüft.
3. SW-Kommentare, Changelog und Speicher-/Regeltexte nachgezogen.
4. Rechtsseiten in APP_SHELL; kein neues Blatt oder Speicherfeld.
5. Bestehende UI-Zustände, keine neue DOM-Zustandsquelle.
6. Sprung/Kontrast/Startbild grün; CPU-Tempo/Gesamtlauf/Affe am Netzteil offen.
7. Bestehende Texte, keine Systemcodes oder religiöser Wortlaut ergänzt.
8. Keine neuen Cloud-Felder; geänderte Regeln 210/210 aus vorigem Eintrag.
9. Keine neue Datenart; bestehende DSE unverändert zutreffend.
10. Syntax App und SW grün.
11. Version 3.18.11 an allen 33 Querys, APP_VERSION/CACHE_NAME und CHANGELOG; Standprüfung grün.
12. Einzeltests grün; Gesamtlauf und Affe ausdrücklich fehlen.
13. Aufgaben, Logbuch, STAND und PLAN aktualisiert; eigene Fehler in LEHREN.
14. Netzteil als konkreten Betreiber-Schritt am Antwortende nennen.

**Offen:** BatteryStatus weiterhin **1** (zuletzt 42 %), daher Halt nach
CODEX-START § 5.4: kein Gesamtlauf, kein Affe, kein Commit/Push. Alle 13
Zeilen bleiben `in Arbeit`, lokale Version 3.18.11, online 3.18.10.
Geänderte Firestore-Regeln müssen vor einer späteren Hosting-Veröffentlichung
eingespielt werden; jetzt keine Veröffentlichung beauftragt und kein
`ladegeraet`/`veroeffentlichen`/`firebase deploy` ausgeführt.

**Nächster Schritt:** Netzteil anschließen; erst bei BatteryStatus **2**
Prüfserver/SDK-Emulator gemäß Prüfstand-LIESMICH starten, ganzen Prüfstand
und danach Affe Handy 200/7 und iPad 150/7 ausführen, alle Ausgaben lesen;
§ 2a/§ 14 erneut prüfen, Status/Logbuch nachziehen und erst bei Grün
direkt auf main committen/pushen. Nicht veröffentlichen.

### 2026-10-01 — Paket A angehalten: elf Zeilen gezielt geprüft, SW und Gesamtabnahme offen

**Geändert:** `app.js:2556` (Speicherfehler-Handlung), `app.js:2949`
(Settings-Einzelfelder), `app.js:2973` (nur Altfeld-Reparatur am Serverstand),
`app.js:9798` / `app.js:10002` (Feedback offline / Zeitlimit);
`firestore.rules:117` (Settings-Kommentar), `plan/werkzeuge/pruefstand/`
(`t_feedback_speichern.js`, `t_feedback_ansichten.js`,
`t_settings_mehrgeraete.js`, `t_settings_kontowechsel.js`, `stubs.js`,
`alle_pruefen.js` – Wrapper-Hilfsquellen mit hashen);
`plan/grossplan/befunde/werkzeuge/runde14_fortsetzungen.js:13`
(Fixture kennt offline), `LEHREN.md` §§ 3.7/3.11/5.3/15,
`AUFGABEN.md`, `plan/STAND.md`, `plan/PLAN.md`.

Eigene Statuskorrektur: Erstes Regex traf wegen CRLF keine Zeile; im Diff
bemerkt, strukturiert mit genau elf geprüften Treffern korrigiert und in
LEHREN §§ 3.10/15 festgehalten.

**Entscheidung:** A10 übernimmt jeweils dieselbe nächste Handlung wie der
vorhandene Banner: nach Ausweis-Erneuerung erneut speichern, bei dauerhafter
Ablehnung Backup. A11 nutzt bestehendes `mitZeitlimit` (echte 12 s), sperrt
Knopf und Funktion offline und erhält den Entwurf. Eine nach dem Zeitlimit
doch serverseitig gespeicherte Idee kann die UI weiterhin nicht bestätigen;
eine Abbruch-/Deduplizierungsfunktion war nicht vorgeschlagen und wurde nicht
ergänzt. A12 schreibt alle vier Aufrufer einzeln. Nur wenn die Ablehnung
tatsächlich mit unbekannten Server-Settings zusammenfällt, wird einmal die
Map aus dem aktuellen Serverstand bereinigt, in einer Transaktion; keine
generelle Wiederholung eines Ganz-Schreibens. Kein neuer Datenschlüssel,
keine neue Datenart, keine Lernlogik oder religiöser Wortlaut geändert.

**Gegenprüfung nach § 2a:** Produktions-Diff und alle übertragenen Test-Diffs
gegen Befunde gelesen; neue Testquellen auf Erwartungswerte/Abbruch geprüft.
A1: Ursprung vor Dialog, Fremdkonto bleibt; A2: alte Fortsetzungen stumm,
eigene normale Abschlüsse laufen; A3: private Drafts/Selektion zurückgesetzt;
A4: eigener Registrierungs-Nachtrag von fremdem getrennt, A→B→A/Neuversuch
geprüft; A5: sichtbares Inventar plus echte Endzustände, fester Alt-Test
c4b1c30 reproduziert Exit 0 mit leerem Inventar; A6: Gegenbindung am Merker,
Batch-Abzug nur bei eigenem vorhandenen Merker, Kontoprüfungen nach Await;
A7/A13: keine SW-Behebung übernommen, Normal-Prüfaufbau rot und ausdrücklich
nicht abgenommen; A8: Einwilligung vor jedem Import-Schreibweg, geteilte
Texte ausgeschlossen, Konto nach Dialog geprüft; A9: genau 15 Originalzeilen
gesichert, nur Kennungen umbenannt, Laufzeit-Hypothesen nicht als bewiesen
bezeichnet; A10: beide Fehlerzweige; A11: Offline-/Doppeltipp-Sperre und
Zeitlimit-Fortsetzung; A12: Einzelpatch sowie Transaktions-Ursprung und
Serverstand geprüft. Keine fremden Paketaufgaben gebaut.

**Gezielte Abnahme:**

- `t_konto_fortsetzungen.js` inklusive aller festen Alt-Gegenproben c4a2ccf,
  normale Auth-Abschlüsse, SDK-vor-Callback, A→B→A, eigene Adresslöschung
  (0/25 ms): grün; `t_konto_registrierung_neuversuch.js` grün.
- `t_inventar2.js` vollständig bis Rundenende und Plan-speichern: grün;
  `t_inventar2_gegenprobe.js` c4b1c30: alter Fehler bestätigt.
- Regeln 210/210 erwartungsgemäß; sechs DATEN-1-Fälle zuvor vier unerwartete
  Freigaben. Vollständige 233 Ausgabezeilen des grünen Regellaufs gelesen.
  Echter SDK-/Emulator-Fall `t_settings_mehrgeraete.js`: auch Kontodaten-
  Löschung zieht Stimme von offener und entfernter Idee ab, fremder Merker bleibt.
- `t_import_einwilligung.js` aktueller Stand und c4b1c30: echter Widerruf,
  Zustimmung/Abbruch, normales Konto, manipulierter geteilter Satz grün.
- `t_feedback_speichern.js`: Modul-Strings separat geparst, beide Meldungen,
  Offline-Sperre auch in Funktion, nach 12 s bedienbar, Entwurf erhalten,
  späte Antwort ohne UI-Wirkung; feste Gegenprobe c4b1c30 zeigt alte Fehler.
- `t_feedback_ansichten.js`: 24 Kombinationen aus 320/390/810 px, hell/dunkel,
  Bewegung normal/reduziert, leer/voll, jeweils online→offline→online grün.
  Bilder 320 dunkel und 810 hell angesehen. Kein interner Formular-Sprung,
  kein horizontaler Überlauf. Vorhandener Offline-Banner verschiebt die ganze
  Karte auch im Vorstand (320 px: identische 104.15625 px); bei aktuellem
  Scrollstand liegt der gesperrte Knopf am kleinen Handy unter der festen
  Navigation. Bestehender Zustand, hier nicht außerhalb des Plans geändert.
- `t_settings_mehrgeraete.js`: echte SDKs, zwei getrennte Offline-Caches,
  Thema/Rundengröße/Backupdatum erhalten; c4b1c30 überschreibt Thema/Datum;
  Altfeld-Reparatur bewahrt den Serverstand. `t_settings_kontowechsel.js`:
  Wechsel während Reparatur ohne Write/Fehlermeldung, ohne Altfeld kein
  Ganz-Schreiben, aktuelle Fremdwerte erhalten – grün.
- Abschluss-Regressionsauswahl (kein Gesamtlauf): `t_konto_nutzerfallback`,
  `t_konto`, `t_board_moderation`, `t_board_limit`, `t_konto_dialog`,
  `t_konto_bestaetigungswechsel`, `t_daten`, `t_text_einwilligung`,
  `t_text_zustaende`, `t_sprung`, `t_kontrast`, `t_a11y`: alle grün.
  Alle vollständigen Ausgaben gelesen. Logs:
  `%TEMP%/paket-a-abschluss-t_*.log`; frühere Lösch-/Teilen-Abnahmen
  `%TEMP%/paket-a-t_*.log`, Regeln `%TEMP%/paket-a-regeln-vorher.log` und
  `%TEMP%/paket-a-regeln-nachher.log`. Neue Einzelproben ohne Umleitung
  stehen vollständig in den Tool-Ausgaben. Bilder:
  `%TEMP%/adrabic-pruefbilder/paket-a-feedback-{320-dunkel,810-hell}.png`.

**LEHREN § 14, Punkt für Punkt (keine Commit-Freigabe):**

1. Codepfade und Diff selbst gelesen, siehe Gegenprüfung.
2. Alle Settings-Aufrufer/Auth-/Import-/Merker-Muster gesucht.
3. Speichertext, Lösch-/Regel-Kommentare nachgezogen.
4. Kein neues Blatt, keine Handlung, kein Cloud-/Geräteschlüssel.
5. Bestehende UI-/Draft-Speicher weiter genutzt.
6. Sprung/Geometrie/Kontrast/ruhige Bewegung gezielt grün; CPU-Tempo/Affe am Netzteil offen, echtes iOS nicht behauptet.
7. Fehlermeldungen nennen Handlung und Verbindung, keine Systemcodes.
8. Keine neuen Cloud-Felder; geänderte Regeln 210/210 und echter SDK-Löschfall grün; Regel-Veröffentlichung bleibt offen.
9. Vorhandene Datenflüsse eingeschränkt, keine neue Datenart; DSE nachgelesen, kein Änderungserfordernis.
10. `node --check app.js` und `sw.js` grün.
11. `pruefe_stand.mjs` grün auf 3.18.10; eine neue Paket-Version/CHANGELOG erst nach Erledigung der zurückgegebenen Zeilen, noch kein Release vorbereitet.
12. Betroffene Tests/Regressionen grün; Gesamtlauf und Affe fehlen. Keine Commit-Freigabe.
13. Aufgaben, Logbuch, STAND und PLAN nachgezogen; eigene Prüffehler in LEHREN notiert.
14. Betreiber-Schritt Netzteil am Antwortende benennen; kein Deploy-Auftrag.

**Offen:** A7/A13 `zurück (SW-Prüfaufbau)` nach § 6. Der neue
`t_sw_paket_a.js` ist ein ausdrücklich nicht abgenommener Entwurf, bleibt
sichtbar rot; keine Grenze gelockert, nichts gelöscht/übersprungen. Kein
Commit/Push/Deploy; bekannte eigene Änderungen bleiben im Arbeitsbaum.
Version weiterhin 3.18.10. BatteryStatus am Abschluss weiterhin **1**, daher
kein `alle_pruefen.js` und keine Affenläufe. Netzteilfrage gestellt, noch
keine positive Gerätemessung. Neue Regeln müssen **vor** einer späteren
Hosting-Veröffentlichung eingespielt werden (Betreiber/ladegeraet), jetzt
ausdrücklich nicht veröffentlichen. Elf Zeilen `in Arbeit`, weil die
Paket-Abnahme/Version/Commit noch fehlen; nicht fälschlich `erledigt`.

**Nächster Schritt:** A7/A13 in einer ausdrücklich auf den erhaltenen
Zwischenstand aufbauenden Fortsetzung abnehmen. Dann eine Paket-Version,
Gesamtlauf/Affe am Netzteil (BatteryStatus 2), § 2a/§ 14 erneut und erst
bei Grün direkt auf main committen/pushen; nicht veröffentlichen.

### 2026-10-01 — A6–A9: Regeln und Import geprüft, SW-Aufgaben zurück

**Geändert:** `firestore.rules:483` (Stimm-Merker bindet Zähler),
`regeln-pruefung.mjs` (sechs neue Fälle, M14 gepaarter Abzug),
`app.js:3630` (eigene Stimmen beim Konto-Löschen atomar zurückziehen),
`app.js:4915` (Import-Einwilligung, Ausschluss in geteilten Sätzen),
`t_import_einwilligung.js`, `t_sw_paket_a.js`, `RUNDE15-REST.md`, Aufgabenliste.
**Entscheidung:** A6: vor Änderung vier Umgehungsschritte im Emulator
unerwartet erlaubt, danach 210/210 erwartungsgemäß. Alte/fremde/entfernte
Ideen und verwaiste Merker enthalten; DSE sagt nicht, dass die eigene
Stimmenzahl beim Konto-Löschen erhalten bleibt, keine neue Datenart.
A8: echter Widerruf und vier vollständige App-Fälle (abgelehnt, bestätigt,
normales Konto, manipulierter Code) grün; Gegenprobe c4b1c30 speichert
jeweils zehn Zeilen/einen Text ohne neue Einwilligung. Importdialog benennt
ausgelassene Texte; religiöser Wortlaut unverändert. A9: alle 15
Zweig-Restzeilen mit eigenem R15-Präfix gesichert, aktuelle Codepfade
nachgelesen; keine zusätzlichen Befunde gebaut.
**Gegenprüfung:** Auth-/Import-/Stimmen-Diff am Befund gelesen; eigene
Adresslöschung/Registrierung bleiben erhalten. Kontoprüfung nach jedem
zusätzlichen Await, Stimmen-Abzug nur mit tatsächlich vorhandenem eigenem
Merker. Gezielte Konto-Lösch-, Teilen-, Auth-, Sprung-, Kontrast-, A11y-Tests
grün (acht Logs `%TEMP%/paket-a-t_*.log`).
**Offen:** A7 und A13 zurück: Abbruch-Gegenprobe c4b1c30 bestätigt, aber
Normal-Update/offline-Kontrolle des neuen SW-Tests scheitert. Route-Variante
umging `setOffline` bzw. brach vor dem Worker ab; nach Korrektur auf echten
lokalen HTTP-Server bleibt Normal-Update bei `ERR_INTERNET_DISCONNECTED`.
Keine Abnahme behauptet, SW-Schutzentwurf vollständig zurückgenommen.
Zusätzliche eigene Prüfkorrektur: boot-Knoten ist flüchtig; App-Fallback
am bleibenden `#app` unterscheiden. § 6: nicht weiter am selben Prüfaufbau
probieren. Neue Regeln müssen vor Hosting eingespielt werden, ausschließlich
durch Betreiber/ladegeraet. Weiterhin Akku, kein Gesamtlauf/Commit/Deploy.
**Nächster Schritt:** A10–A12 abarbeiten; SW-Prüfaufbau danach als eigener
offener Punkt für die Fortsetzung belassen.

### 2026-10-01 — Paket A begonnen: Kontowechsel-Schutz aus runde15 übertragen

**Geändert:** `app.js` (Auth-Auftrag, Auth-Reset, Auth-Fortsetzungen); acht
Prüfdateien aus `4462fac`, `t_inventar2.js` und neue feste Gegenprobe
`t_inventar2_gegenprobe.js`; `regeln-pruefung.mjs` (DATEN-1-Gegenprobe).
**Entscheidung:** Ausgang `c4b1c30` / 3.18.10 per sauberem Fast-forward
geholt; Syntax und Standprüfung grün. Übertragen wird ausschließlich der
Auth-/Inventar-Diff des gesicherten Zweigs, keine alten Versionen oder
Textlern-Änderungen. A1–A4 am Vorstand als Fehler reproduziert und nach
Übertragung mit `t_konto_fortsetzungen.js` grün (Normalfälle, vollständige
App, A→B→A, SDK-Wechsel vor Callback, Gegenproben fest `c4a2ccf`).
Registrierungs-Neuversuch ebenfalls grün, ohne Übernahme-Zeile B ohne Mail.
A5-Vorstand: leere Inventare, Abbruch bei `-> null`, trotzdem Exit 0.
Neuer Inventartest erzwingt den vollständigen Weg bis zum Kontoformular.
**Offen:** Einzelabnahmen und Paket-Gegenprüfung laufen. BatteryStatus 1,
67 %: kein Gesamtlauf/Commit auf Akku (CODEX-START § 5.4). Keine Version
hochgezählt, kein Push, kein Deploy. Ein erster erzeugter Übertragungs-Patch
war syntaktisch ungültig; `git apply --check` lehnte ihn ohne Änderung ab.
Hunk-Anfänge anschließend zeilenweise erkannt und Übertragung geprüft.
**Nächster Schritt:** Paket A der Tabelle nach weiterbearbeiten; A6
Stimmen-Regeln nach roter Emulator-Gegenprobe korrigieren.

### 2026-10-01 — Phase 1 fertig: 8 Prüfer, Plan für Codex geschrieben

**Geändert:** `befunde/` (AUFTRAG-PRUEFER, BEW, CODE, DATEN, EIN, EINST,
FORT, LERN, VERW), `AUFGABEN.md`, `CODEX-START.md`, `ENTSCHEIDUNGEN.md`
(alle neu); `AGENTS.md` neu gefasst und aus `.gitignore` genommen (war nie
im Repo, Codex bekam sie beim Anhängen des Repos nicht; Hosting schließt
`**/*.md` aus); `plan/STAND.md` (Stufe-7-Blocker entfernt, Gesamtplan § 6);
Zweig `runde15` nach `origin` gepusht.
**Ergebnis:** 103 neue Funde (hoch 6, mittel 42, niedrig 55, kritisch 0).
G-107–G-111 im Stand 3.18.10 alle noch offen (DATEN). Zweimal vom
Nutzungslimit unterbrochen; jeder Prüfer nennt am Dateiende, was er nicht
mehr geprüft hat.
**Entscheidung:** Aufgaben in sechs Paketen A–F, je Paket ein Codex-Chat,
eine Version, voller Prüfstand, Claude-Gegenlesen. Betreiber-Wunsch „Codex
soll es 1 zu 1 hinkriegen“: `CODEX-START.md` legt Lesen, Reihenfolge,
Gegenprobe, Abnahme, Anhalten und Verbote fest; Modell je Paket in § 2.
**Von mir am Code nachgelesen (Stichprobe):** BEW-1, BEW-2, BEW-3, VERW-1,
EINST-1, EINST-2, DATEN-1 (Regeltext), EIN-Kommentar. Alle stimmen. Die
übrigen Funde sind **nicht** einzeln nachgelesen; deshalb ist Schritt 4.2 in
`CODEX-START.md` Pflicht (Beleg am aktuellen Code prüfen, sonst
`trifft nicht zu`).
**Offen:** 18 Entscheidungen des Betreibers (`ENTSCHEIDUNGEN.md`), Gerätetests
G1–G7. Nicht geprüfte Stellen der Prüfer (Wischen mit Touch, Schreiben-Runde,
iPad quer, Einspielen per Code/Datei, voller Regeltest) gehören in die
Nachprüfung (Phase 4).
**Nächster Schritt:** Paket A (`AUFGABEN.md`), zuerst G-110.

### 2026-09-30 — Zyklus angelegt, Vorbild-Bilder ausgewertet

**Betreiber:** Runde 15 entfällt; nach „Texte auswendig lernen“ die ganze
App noch einmal komplett prüfen, mit Plan und Agenten. Vollständige Liste
seiner Punkte in `AUFTRAG.md` § 1. Dazu 45 Bildschirmfotos des Onboardings
von „marhaba!“ als Anregung.
**Geändert:** `plan/zyklus-2/AUFTRAG.md`, `VORBILD-MARHABA.md`, dieses
Logbuch (neu); `plan/STAND.md` Reihenfolge.
**Entscheidung:** Runde 15 als Runde entfällt, ihre Befunde G-107–G-111
(G-110 kritisch) und G-118 kommen als Paket A an den Anfang der Umsetzung,
vor allem Neuen (Begründung `AUFTRAG.md` § 2). Prüfung parallel mit
Lese-Agenten, Umsetzung weiter nacheinander (LEHREN § 15, 25.09.).
Bilder: 13 Muster notiert, je mit Einschätzung für Adrabic; Bezahlseite,
Beispiel-Statistik, religiöse Zielliste und Lehrstoff ausdrücklich nicht.
**Offen:** Beginn erst nach Veröffentlichung von Texte (Stufe 7).
Zwei Gestaltungsfragen an den Betreiber stehen in `VORBILD-MARHABA.md` § 5
und kommen gesammelt in Phase 2.
**Nächster Schritt:** Nach Texte-Veröffentlichung Phase 0 (`AUFTRAG.md` § 3.1).

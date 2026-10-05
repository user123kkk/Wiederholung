# Logbuch: Zyklus 2

Letzter Eintrag zuerst. Auftrag: [`AUFTRAG.md`](AUFTRAG.md).

### 2026-10-05 — E7 Ruhetag abgenommen, 3.18.16 (Codex nach Übergabe)

**Geändert:** Übernommener Produktstand unverändert erhalten: `app.js:951`
(`r` normalisieren, zentrale `VERLAUF_ARTEN`), `app.js:1045`
(`ruhetagPruefen`), Aufrufe beim Laden, Nutzer-Snapshot und Sichtbarwerden,
`app.js:3212` (Ruhetage überspringen), `app.js:11054` (Satz auf Lernen).
Version in app.js/sw.js/index.html, CHANGELOG, Datenschutz Punkt 5;
E7-Abnahme und E8-Lerntag-Fixture in t_paket_e.js, fünf Fälle in t_serie.js.
AGENTS-Verweis, Übergabe und Entscheidung V8 aus dem uncommitteten Stand
mitgenommen. Eigene Änderungen nur Abschlussdokumentation: AUFGABEN E7,
STAND, PLAN AKTUELL, dieses Logbuch, LEHREN E8-Nachlauf, Überschrift und
Umsetzungsnotiz in ENTSCHEIDUNGEN. Keine Produkt-/Attrappen-/Teständerung
seit dem finalen Gesamtlauf.
**Entscheidung:** Auftrag, genau an CODEX-HANDOFF-2026-10-05-E7 fortzusetzen,
nichts verwerfen, nicht veröffentlichen. Z6b „ruhetag ja“, V8 „5 nein“.
Marker nur bei bestehender Serie: Serie 0 braucht keinen täglichen Write.
Commit/Push direkt auf main gemäß Übergabe. Netzteil BatteryStatus 2;
Server 8099 verfügbar, CHROMIUM je Aufruf gesetzt, Browserläufe seriell.
**Prüfung:**

- Übernommener Gesamtlauf: **139/139 Exit 0**, kein Zeitlimit/abnahmeOk=false,
  Quellstand bdfec355e529485d7cf4304414e65913fa4554c34f977268e1fa1a335e8e8a69.
  Alle 139 Logs gelesen und zeilenweise gegen den abgenommenen E-Lauf
  verglichen. Unterschiede: E7-Abnahmen/fünf Serienfälle, Datum, Version,
  zufällige Karten und Laufzeiten; keine neue beschreibende Regression.
  E8-Fixture folgt tag(-1), Nachlauf t_paket_e 914 s grün.
- Tempo-Rot 204 ms aus dem ersten Lauf durch die übergebene Messung
  x_ab_tempo.js 8 1242368 geprüft (Werkzeug verwendet oberen Median):
  Verwalten alt 141/143/158/173/176/217/220/241 ms, Median 176, 3 über 200;
  neu 145/145/145/148/157/166/180/185 ms, Median 157, 0 über 200.
  Text-Median alt 142, neu 111 ms. A/B aus der Übergabe, nicht neu gemessen;
  keine E7-Verschlechterung erkennbar, Grenze unverändert. Finaler Nachlauf
  t_text_tempo max. 182 ms grün. t_bestand_tempo bei Bewertungen max. 60 ms
  (vorher 85); t_fluessig nennt beschreibend 221 ms beim Reiterwechsel.
  Daraus keine Aussage „ruckelfrei“.
- Frische Affen: Handy **200**, iPad **150**, Startwert 7, je **0 Befunde**.
- Frische abnahme_runde ohne --fortsetzen: **13/13 grün**; alle 13
  Einzellogs vollständig gelesen und gegen die Gesamtlogs verglichen.
  Unterschiede nur Kartenreihenfolge/Wortlänge, Zeit und Wischweg 68/69 px.
  Sprünge auf Lernen/Üben überall 0, Kontrast 0, kein Überlauf; Schreiben
  mit CPU 4× 0 Bilder über 34 ms. Doppeltipp 80/150/250 ms bleibt Karte 1,
  700 ms Karte 2. Keine Skriptlademeldung.
- Frische Gegenprobe E7 --alt am festen **8762d38**: Exit 1 mit genau
  „E7 Serie reißt ohne fällige Karte am 2026-10-07“, actual 0, expected 10.
  Neuer Stand: drei Tage Serie 10, sechs Regelfälle, vier Markerfälle grün;
  t_serie 14/14 einschließlich Joker und Tagen ohne Öffnen.
- node --check app.js/sw.js/t_paket_e.js/t_serie.js, pruefe_stand.mjs
  (3.18.16, CSP, APP_SHELL), git diff --check grün. Fetch: origin/main
  unverändert bbb9b88 vor Abschluss; kein fremder uncommitteter Stand
  verworfen. Abschluss direkt auf main, Remote-Hash danach prüfen.
**Gegenprüfung (grossplan/AUFTRAG §2a):** gesamten Diff gegen LERN-1 und
Z6b gelesen, alle Erwartungen mit der freigegebenen Regel verglichen.
ruhetagPruefen schreibt nur nach geladenem Nutzerdokument UND beiden
Sammlungen, bei fehlenden fälligen Karten in sämtlichen Bereichen und
fehlenden fälligen Textzeilen im Betreiber-Konto; nie bei Löschung/Umzug,
Serie 0 oder bereits gelerntem Tag. Gleicher Tag/Neuladen erzeugt keinen
zweiten Write; zwei Geräte können r auf 2 heben, gelesen wird r > 0.
Normalisierung, Zusammenführen und alle Schreib-/Ablehnungszweige tragen r
mit, Kontoreferenz/Generation/Epoche schützen alte Fortsetzungen; Reset
entfernt r. tagGelernt und Kalender zählen r nicht, Joker bleibt unberührt.
Frühe Rückkehr beendet nur die optionale Prüfung, keine Busy-/Dialog-
Fortsetzung. Firestore-Regeln erlauben bereits die freie verlauf-Map
(Typ Map, höchstens 400 Tage), daher keine neue Regel/kein Regel-Deploy.
SDK-Mehrgeräte-/Reset-/Offline-Regressionen im Gesamtlauf grün. Kein
Produktfix aus der Gegenprüfung nötig, Text-Probelauf unverändert.
**LEHREN §14, einzeln:**

1. Tatsächliche Lese-/Schreib-/Serienpfade und Aufrufe gelesen.
2. Repo-Suche nach Serie, tagGelernt, Verlauf und Ruhetag; alle Zählerlisten
   auf dieselbe zentrale Liste gebracht, Kalender/Lerntage geprüft.
3. Serienkommentar, Lernen-Satz, CHANGELOG und Datenschutz mitgezogen.
4. Keine neue Handlung/kein Blatt; r in Normalisierung und sämtlichen
   zentralen Merge-/Write-/Nachhol-Listen.
5. Zustand in verlauf/verlaufOffen, kein ausschließliches DOM-Merkmal.
6. Gesamtlauf auf 320/390/iPad/Desktop, hell/dunkel/reduce/leer/voll;
   Sprung/Kontrast und CPU-4×-Ausgaben gelesen, Tempo-A/B oben begrenzt.
7. Ein Satz „Deine Serie bleibt.“; keine Codes oder Intervallzahlen.
8. Neues Unterfeld r im vorhandenen freien Verlauf: Regel am Code geprüft,
   firestore.rules unverändert; daher kein geänderter Regel-Emulatortest.
9. Datenschutzerklärung Punkt 5 im selben Commit.
10. Syntaxprüfungen sauber.
11. 3.18.16 an vier Stellen, alle 33 Versions-URLs, Changelog/CSP/APP_SHELL
    durch Standprüfung bestätigt.
12. E7, Serie, 139 Gesamttests, Affen und frische Runde 13/13 abgenommen.
13. AUFGABEN, Logbuch, STAND, PLAN und entschiedene Fragen aktualisiert.
14. Antwort nennt „Was Du noch tun musst“; Veröffentlichung bleibt Betreiber.
**Kriterien:** K1–K6 für E7 erfüllt; A4 grün. A1/A2/A5/A6 für den ganzen
Zyklus bleiben offen (F, zurückgestellte Befunde und Nachprüfung);
Geräte-/Rechtsabnahmen sind keine durch diese Tests erledigten Aufgaben.
**Eigene Prüfdiagnose korrigiert:** erster Hashvergleich betrachtete nur
die Testdatei, obwohl Konto-/D-Wrapper Hilfsquellen einbeziehen. Danach die
echte Hashbildung aus alle_pruefen.js gelesen: alle 139 Testhashes samt
Hilfsquellen und Produkt-/Attrappenhash stimmen. Keine Quelle geändert,
kein Test daraus neu gestartet. Logbuch/PLAN anfangs am falschen Stamm
gesucht; tatsächliche Pfade mit rg --files ermittelt (§3.2/§3.11).
**Belege:** C:/Users/USER/Desktop/Wiederholung-Belege/Paket-E-2026-10-05-E7/
(gesamtlauf-139, logvergleich.txt, affe-handy-200-7.log,
affe-ipad-150-7.log, runde-frisch.log, runde-frisch-einzellogs,
gegenprobe-E7-8762d38.log). Vorherige Rundenlogs separat erhalten.
**Offen:** Ruhetag greift nur an Tagen, an denen die App geöffnet wird;
Rückwärtsrechnen hat der Betreiber mit „egal dann“ abgelehnt, nicht bauen.
Neuer Datenschutz-Satz gehört in die offene Rechtsprüfung durch eine Person.
E17 wartet auf G4, E26 später Z7; G5/G6/G7 am Gerät nach Veröffentlichung,
D12–D15 bleiben zurück. Kleine E19-/E3-Beobachtungen aus 04.10. bleiben
für die Nachprüfung erhalten. Keine Veröffentlichung in dieser Sitzung.
**Nächster Schritt:** Betreiber startet ladegeraet.bat selbst, wenn er
veröffentlichen möchte; in der App muss danach 3.18.16 stehen. Paket F
erst nach „F weiter“, vorher nichts Neues beginnen.

### 2026-10-04 — Entscheidung Z6b: Ruhetag ja

**Geändert:** `ENTSCHEIDUNGEN.md` (Antwort eingetragen), `AUFGABEN.md` E7 von
`zurück (wartet auf Z6b ja)` auf `offen`. Kein Produktcode.
**Entscheidung:** Betreiber im Chat wörtlich „ruhetag ja“. Damit ist die
Serie-Regel für Tage ohne fällige Karte freigegeben, genau in der Form aus
`ENTSCHEIDUNGEN.md` Z6b (Ruhetag zählt nicht hoch, reißt nicht, verbraucht
den verziehenen Tag nicht). Nicht sofort gebaut: Lernlogik, braucht
Regelprüfung, Gegenprobe und einen frischen Gesamtlauf am Netzteil.
**Offen:** E7 bauen. V8 („5 Karten“) weiter unbeantwortet; Betreiber hat die
Frage nicht verstanden, wurde neu erklärt. E17 wartet auf G4.
**Nächster Schritt:** auf „E weiter“ E7 nach CODEX-START § 4 bauen und als
eigene Version abschließen.

### 2026-10-04 — Paket E abgeschlossen, 3.18.15 (Claude Code nach Übergabe)

**Geändert:** keine Produkt-, Attrappen- oder Testquelle seit Start des
dritten Gesamtlaufs; Quellkennung unverändert f53f4c89e4421ee3. Nur
Abschlussdokumentation: AUFGABEN (28 Zeilen auf `erledigt (3.18.15)`, genau
28 Treffer geprüft), CHANGELOG-Kopf und Abnahmeabsatz, STAND, PLAN, CLAUDE.md,
dieses Logbuch.
**Entscheidung:** Betreiberauftrag: Paket E an der dokumentierten Stelle
fortsetzen, Prüfstand mit `--fortsetzen`, danach Paketabschluss mit Commit
und Push auf main. D12–D15 bleiben zurück. Nicht veröffentlichen.
BatteryStatus vor jedem Lauf 2, Server 8099 HTTP 200, CHROMIUM je Aufruf
gesetzt, kein paralleler Browserlauf.
**Prüfung:**
- Gesamtlauf `alle_pruefen.js --fortsetzen`: 83 bewahrt, 56 neu, Ergebnis
  **139/139 Exit 0**. Alle 56 neuen Logs vollständig gelesen (unter anderem
  t_paket_c_weiter 1201 s, t_paket_d 1154 s, t_paket_e 887 s mit 29 Abnahmen).
  14 beschreibende Ausgaben zeilenweise gegen die abgenommenen D-Logs
  (9802e0dd7279f524) verglichen. Unterschiede nur: Merken-Breite und Lage der
  Nebenaktionen (E20), Limittext (E23), Erinnerungs-Toast (E6), zufällige
  Kartenreihenfolge, Tempozahlen. „Wisch links: NICHTS“ steht gleich im D-Log.
  t_sprung viermal 0, t_text_tempo größte Aufgabe 147 ms (Grenze 200 ms),
  t_scrollen 0 Ruckler. Keine Aussage „ruckelfrei“ daraus.
- Affe mit Startwert 7: Handy 200 Schritte 0 Befunde, iPad 150 Schritte
  0 Befunde.
- `abnahme_runde.js` frisch ohne `--fortsetzen`: **13/13 grün**. 13 Einzellogs
  gegen die Gesamtlogs verglichen: gleich bis auf zufällige Kartenreihenfolge.
  t_doppeltipp 80/150/250 ms → Karte 1, 700 ms → Karte 2, keine
  Skriptlademeldung.
- `gegenproben.js`: **28/28** am festen 8762d38 rot, je AssertionError mit
  der Befundmeldung der Aufgabe; ganze Ausgabe gelesen.
- `node --check` app.js/sw.js/t_paket_e.js/stubs.js/alle_pruefen.js,
  `pruefe_stand.mjs` (3.18.15, CSP, APP_SHELL), `git diff --check`: grün.
  index.html 33 Stellen 3.18.15, keine 3.18.14 mehr. origin/main nach Fetch
  weiter 8762d38.
**Gegenprüfung (grossplan/AUFTRAG § 2a), frischer Blick:** Produktdiff
(app.js, styles.css, index.html, Datenschutz, sw.js), Attrappe und
t_paket_e.js vollständig gelesen, gegen Befunde EINST/LERN und Z9/Z10.
Geprüft ohne Fund: Wischen nach Rückgängig (`animation: none` beim Greifen
hebt das gehaltene `both` auf), Tastatur-Guards vor Escape/Backspace
(Eingabefeld, Dialog, Blatt), `data-bid` am neuen Bereichsknopf,
Ring-Erwartung E25 (`--ziel` = 1 − Anteil), Kontobindung bei Name, Passwort
und Löschmeldung, frühe Rückkehr mit Busy-Rücknahme in
`kontoLoeschenAusfuehren`. Zwei kleine Beobachtungen, **nicht gebaut**
(CODEX-START § 7), für die Nachprüfung:
1. E19: Die erste Bewertung des Tages hebt „Bester Lauf“. Rückgängig danach
   senkt den Rekord nicht. Lernt man an dem Tag nichts mehr, bleibt der Rekord
   um 1 zu hoch. Umsetzung entspricht dem Vorschlag in LERN-4.
2. E3: Nach „Weiter zur E-Mail“ bleiben Beschriftung „Fertig“, Statuszeile
   und das eingeblendete Kopierfeld bis zum Neuladen stehen, auch nach
   Schließen und erneutem Öffnen.
**LEHREN § 14:** 1 Codepfade gelesen, nicht nur Kommentare. 2 Muster im Repo
gesucht (Rechtslinks sechs Stellen, Schriftstufen gemeinsam). 3 Texte und
Kommentare nachgezogen (Serie im Reset-Dialog und Hinweis, Tastatur,
Einstellungs-Abschnitte). 4 neue Handlungen im einen delegierten Listener;
kein neues Blatt, kein neues Rasterkind. 5 Zustand in `ui`/Sitzung/Speicher
(`drillRueckkehrTab`, `zurueckVon`, Hinweismerker). 6 Sprung 0, Kontrast 0,
320 bis 1440 px geprüft; CPU-4×-Werte beschreibend gelesen. 7 `mz()` für
Tage, keine Firebase-Codes im Text. 8 keine neuen Cloud-Felder,
`firestore.rules` unverändert. 9 neuer Geräteschlüssel `adrabic-bereich-<uid>`
steht in der Datenschutzerklärung Punkt 7 im selben Commit. 10 Syntax grün.
11 Version an vier Stellen, 33 URLs, Changelog, CSP, APP_SHELL grün.
12 Gesamtlauf, Affen, Runde 13/13. 13 Logbuch, PLAN, STAND, AUFGABEN.
14 „Was Du noch tun musst“ in der Antwort.
**Belege:** C:/Users/USER/Desktop/Wiederholung-Belege/Paket-E-2026-10-04-Abschluss/
(`dritter-Gesamtlauf-fortgesetzt-139-von-139`, `affe-handy-200-7.log`,
`affe-ipad-150-7.log`, `abnahme_runde-frisch.log` samt 13 Einzellogs,
`gegenproben-lauf.log`, `gegenproben-8762d38`).
**Offen:** E7 wartet auf „Z6b ja“, E17 auf Gerätetest G4, E26 später (Z7),
V8 nicht freigegeben. G5/G6/G7 am echten Gerät nach Veröffentlichung.
D12–D15 zurück. Ursprüngliche Transportursache der einmaligen
SW-Skriptlademeldung (zweiter Lauf) ungeklärt, seither nicht wieder
aufgetreten. Beobachtungen 1 und 2 oben. Online bleibt der Stand des
Betreibers; 3.18.15 ist nicht veröffentlicht.
**Nächster Schritt:** Betreiber veröffentlicht mit `ladegeraet.bat`. Danach
auf sein Stichwort Paket F; nicht von selbst beginnen.

### 2026-10-04, 20:00 — Betreiberpause; exakte Übergabe an Claude Code

**Geändert:** CLAUDE-HANDOFF-2026-10-04-PAKET-E.md neu; Verweise in
CLAUDE.md, STAND und PLAN. Keine Produkt-/Prüfquelle seit Start des dritten
Gesamtlaufs geändert. Uncommitteten E-Stand vollständig erhalten.
**Entscheidung:** Betreiber bittet wegen 5 % verbleibender Nutzung um
Anhalten und Übernahme durch Claude Code. Geprüften Wrapperprozess und
seinen Browserbaum gezielt beendet; kein E-Prüfprozess mehr aktiv.
**Prüfung:** dritter Lauf 83/139 fertig, alle 83 vollständigen Logs gelesen,
keine roten fertigen Tests. Letzter Abschluss t_paket_c.js (208 s),
t_paket_c_fort.js unterbrochen, keine Abnahme daraus. BatteryStatus 2.
Snapshot einschließlich Teil-Ausgabe im Abschluss-Belegordner unter
dritter-Gesamtlauf-bei-Betreiberpause; ursprünglicher TEMP-Stand erhalten.
**Offen:** übrige 56 Gesamttests, beide Affen, frischer 13/13-Wrapper,
finale Gegenproben/Gegenprüfung/LEHREN §14 und Commit/Push. E7/E17 zurück,
E26 später, Geräteabnahmen und D12–D15 unverändert. Nicht veröffentlicht.
**Nächster Schritt:** auf ausdrücklichen Fortsetzungsauftrag die Übergabe
lesen und bei unverändertem Quellstand alle_pruefen.js --fortsetzen;
keinen bereits grünen Lauf neu anfangen, keine uncommittete Arbeit verwerfen.

### 2026-10-04 — Paket E am Netzteil: frischer Abschlusslauf

**Geändert:** erhaltenen E-Stand übernommen, keine anderen Paketaufgaben.
E5-Nachkorrektur: app.js Absatzkonto-sicherhinweis, styles.css max-width
48em, t_paket_e.js misst fünf Breiten. Neue eigene Regression in LEHREN.
**Entscheidung:** „netzteil an“ bestätigt den zuvor angeforderten Abschluss,
BatteryStatus 2, zunächst 61 Prozent; ausdrücklich kein Veröffentlichen.
main und origin/main nach Fetch identisch (8762d38). Version 3.18.15 bleibt.
**Prüfung/Gegenprüfung:** Syntax/Standprüfung grün, Server HTTP 200.
Produktdiff erneut vollständig gegen EINST/LERN/Z9/Z10 gelesen:
UID/Generationsbindung, frühe Rückkehr/Busy, Abbruch/offline/Teilerfolg,
zentrale Handlungen/Schriftwahl, Text- und Datenschutznachträge geprüft.
Erster frischer Gesamtlauf 4d41a7da9066a404 bewusst angehalten:
t_gross_alle meldet Konto löschen auf beiden großen Breiten lange Zeilen 1,
gegenüber 0 im abgenommenen D-Log. Der verlängerte Downloads-Absatz ist die
Ursache; alleiniger Exit 0 hätte den neuen Befund verdeckt. Nur diesen Absatz
begrenzt. E5 danach 320/390/820/1180/1440: 18,97/24,04/48/48/48 Schriftbreiten,
kein Überlauf; t_gross_alle frisch auf beiden großen Breiten wieder alle
Kontrast/Quer/Überdeckung/lange-Zeilen-Werte 0. Keine Grenze gelockert.
Die 39 px in der beschreibenden Einstieg-Auswahlprobe sind bytegleich zu D,
kein neuer E-Sprung. Beschreibende Tempowerte nicht als ruckelfrei ausgeben.
Ersten angehaltenen Lauf und damaligen Produktdiff getrennt erhalten unter
C:/Users/USER/Desktop/Wiederholung-Belege/Paket-E-2026-10-04-Abschluss/.
Zweiter Gesamtlauf ebenfalls angehalten, vollständige 81 fertige Logs gelesen
und getrennt erhalten: t_konto_fortsetzungen scheiterte am alten
parameterlosen deleteUser-Anker der Hilfsprobe konto_adressdialog_app.js.
Testanbindung am Exportnamen und Nutzerweitergabe korrigiert, keine
Schutzassertion geändert. Frischer Einzelwrapper samt festen alten
Gegenproben vollständig grün.
Doppeltipp: ursprünglicher 80-ms-Fall hatte korrekte Karte 1, aber native
SW-Skriptabrufmeldung, trotz Exit 0. Vier Diagnosefälle auf eigenem HTTP-Port:
8762d38 und aktueller Stand normal ohne Fehler; absichtlich abgebrochener
sw.js-Abruf auf beiden erzeugt exakt dieselbe native Konsolenmeldung und
register-TypeError, Karte bleibt 1. Das belegt den Fehlerpfad, nicht die
genaue Transportursache des ursprünglichen Abbruchs. Unverändertes
t_doppeltipp anschließend frisch 80/150/250→1, 700→2, keine Seitenfehler.
Keine Meldung gefiltert und kein Produkt-SW geändert. Diagnosequelle und
Einzellog im Abschluss-Belegordner; im finalen Gesamtlauf erneut prüfen.
Jetzt dritter frischer Gesamtlauf, ohne --fortsetzen, 139 Tests, Quellkennung
f53f4c89e4421ee34b97574ca6b1da1cad6d08930eba5256dd333329a6b55b7f.
**Offen:** vollständige Logs lesen, beide Affen, frischer 13/13-Rundenwrapper,
feste Gegenproben, Abschlussgegenprüfung/LEHREN §14, Commit/Push auf main.
E7/Z6b, E17/G4, E26/Z7, G5/G6/G7 und D12–D15 bleiben unverändert offen/zurück.
**Nächster Schritt:** laufenden frischen Prüfstand abnehmen, dann Paket E
abschließen. Nicht veröffentlichen.

### 2026-10-04 — Paket E lokal abgenommen; Abschluss wartet auf Netzteil

**Geändert:** app.js, styles.css, index.html und Datenschutzerklärung Punkt 7;
28 freigegebene Produktaufgaben gebaut. E2 war bereits A3/3.18.11.
Neue Einzelabnahmen t_paket_e.js (29 Aufgaben einschließlich E2), festes
Gegenprobe-Commit 8762d38; kein HEAD-Vergleich. Attrappe ergänzt um gezielt
hängende Reauth/Cloud/Profil/Reset-Antworten und zwei Lösch-Callback-Reihenfolgen.
Standardverhalten erhalten; verzögertes Löschen von A überschreibt B nicht.
t_einstellungen.js schließt das jetzt absichtlich offen bleibende Mailformular
und prüft das anschließende echte Ideenformular ausdrücklich sichtbar.
alle_pruefen.js gibt ausschließlich dem neuen Paket-E-Test 30 Minuten wie D,
keine bestehende Prüfgrenze verändert und keinen Test entfernt/ausgelassen.
Aufgaben, STAND, PLAN und eigene Fehler in LEHREN nachgezogen.
Version 3.18.15 samt Cache, allen 33 Versions-URLs und Changelog vorbereitet
nach CODEX-START §5.3; noch kein Commit und keine Gesamtabnahme dieser Version.

**Entscheidung:** ausdrückliches „E weiter“ ersetzt die ältere E-Sperre.
D/3.18.14 laut Betreiber abgeschlossen, gepusht und veröffentlicht.
Anfangs sauberer main, Pull unverändert, Syntax/Standprüfung grün,
Server 8099 HTTP 200. BatteryStatus durchgehend 1 (zuletzt 61 Prozent):
nur Bau und Einzeltests; kein Gesamtlauf, Affe, Tempo-Abschluss, Commit,
Push oder Veröffentlichung. E7 ohne Z6b ja zurück, E17 ohne Gerätetest G4
zurück, E26 später Z7; V8 nicht freigegeben. D12–D15 und die Text-Probelauf-
Implementierung unverändert; keine neue Paketarbeit.
Z10 aus ENTSCHEIDUNGEN hat ausdrücklich Vorrang vor dem alten E14-Hinweis:
keine Hilfe-Seite/Entwurfsfreigabe, nur Rückmeldung und Installationszeile.
Bestehende Dialoge, Aktionen, Cloudfelder und Firebase-Resetmail genutzt.
E31 führt nur die lokale Bereichs-ID pro UID ein; Datenschutz im selben Stand.
Keine neue Cloudstruktur, Datenbankregel oder arabische/religiöse Formulierung.
Bestehende Regeln erlauben Name 1–200 Zeichen und arabGroesse bis 20 Zeichen;
sehrgross fällt darunter. firestore.rules unverändert.

**Prüfung:** sämtliche endgültigen 25 betroffenen Einzeltest-Ausgaben vollständig
gelesen, alle Exit 0. Die erste Folge stoppte sofort bei t_sprung rot;
Ursache und Korrektur siehe Gegenprüfung/LEHREN, danach frisch grün.

- Lernrunde, einzeln (13): t_runde_lage, t_sprung, t_sprung_ueben, t_wischen,
  t_wischen_schraeg, t_doppeltipp, t_x_mitten, t_abgelehnt, t_undo_verlauf,
  t_serie, t_rundenende, t_ueben, t_schreiben.
- Weitere zwölf: t_einstellungen (maßgeblich Folgelauf), t_fehler_melden,
  t_daten, t_bestaetigung, t_konto_nach_loeschen, t_konto_loeschwechsel,
  t_konto_bestaetigungswechsel, t_settings_kontowechsel, t_gruss_datum,
  t_hick, t_kontrast, t_a11y.

Die 13 Einzeltests ersetzen nicht den vorgeschriebenen frischen
abnahme_runde.js-Wrapper beim Paketabschluss. t_schreiben enthält CPU-4×-
Messungen; auf Akku mit anderen Prüfungen keine Tempo-Abnahme daraus.
E-Abnahmen gezielt einzeln, kein Gesamtaufruf von alle_pruefen.js oder
standardmäßig vollständigem t_paket_e.js auf Akku. Oberflächenzustände auf
320/390/iPad, hell/dunkel und bei Bewegungsänderung reduziert/bewegt;
leer/voll, Abbruch, Fehler und Kontowechsel wie unten. E32 erst als
Prüfkandidat ohne Produktänderung auf 320 px gemessen, danach eingebaut
und endgültig mit langen Inhalten erneut geprüft. Acht PNG-Belege; tatsächlich
angesehen: Einstellungen 320 hell, Installation 320 hell/dunkel, Desktoprunde
offen. Texte lesbar, Dialog scrollbar, Bestätigung erreichbar.

**Gegenprüfung nach grossplan/AUFTRAG §2a/§2b/§3:** vollständigen Produktdiff
und neuen Prüfstand gelesen, jede Aufgabe gegen ihren gelesenen Befund geprüft.
Vorhandene Regressionen erhalten, E21-Grenze nicht gelockert. Feste Altproben
waren am konkreten Befund rot; reine Text-/Aufräumaufgaben zusätzlich am
Ausgangsquelltext geprüft. E2 zeigt auf dem Ausgang bereits grün, daher kein
unnötiger Produktfix. Lokales Ergebnis je Aufgabe:

| Aufgabe | Diff gegen Befund und Abnahme |
|---|---|
| E1 | Reset nennt konkrete Serie 21 und null; zwölf Zustände/Abbruch erhalten Serie. Alt verschweigt Verlust. |
| E2 | Bestehender Auth-Reset leert sämtliche Felder; Löschung A → B in sechs Zuständen bereits am Ausgang grün. Trifft nicht zu. |
| E3 | Mailto bleibt offen, Kopierweg/markierbares Textfeld nach Ablehnung; zwölf Zustände, Entwurf erhalten, Knopf stabil. Alt schließt. |
| E4 | Sechs App-Rechtslinks mit target blank/noopener; kompletter Einstieg auf drei Breiten, beide Popups, Name/Adresse erhalten. Alt ersetzt App. G7 offen. |
| E5 | Blob-URL erst nach 60 s freigeben; Download angeboten und Downloads-Prüfsatz. Alt sofort widerrufen. G5 offen. |
| E6 | Zukünftige Uhrzeit heute, vergangene morgen; ICS angeboten, Zeile Vorlage, vorsichtige Gerätetexte. Alt startet immer morgen. G6 offen. |
| E8 | Erster Anzeigetag/Schwelle im vorhandenen Hinweismerkzeichen; Folgetag beendet Meilenstein. Montag → Dienstag/Mittwoch Rückblick in sechs Zuständen. Alt blockiert. |
| E9 | overflow-wrap an Profilname, Löschliste und Ideenworten; 40/100 Zeichen in sechs Breiten/Themen passen. Alt läuft über. |
| E10 | Dunkle theme-color #111010 statt #0e0e12; Browsermeta geprüft. Alt falsche Farbe. |
| E11 | Erfolg an UID/Generation gebunden, Toast auch im Einstieg; zwölf Breiten/Themen/Callback-Reihenfolgen und spätes A nach B grün. Alt schweigt. |
| E12 | Busy vor Passwortabfrage, vorhandenes 12-s-Limit um Reauth; tatsächlicher Zeitablauf, gesperrter Knopf, kein Delete und keine späte Fortsetzung. Alt keine Rückmeldung. |
| E13 | Nur Werte von Einstellungs-Knopfzeilen umbrechen (Text-Probelauf-Zeile ausgenommen), Reset 44 px, Antwort sichtbar scrollen. Alt auf 320: Wert abgeschnitten, 36 px, Unterkante 754,53 >568; neu 551,53 und alle sechs Zustände grün. |
| E14 | Z10: Rückmeldung + vorhandener Dialog mit drei Schritten je Plattform. Zwölf Zustände/Schließen grün; Herstelleranleitungen geprüft. Alt keine Installationshandlung. |
| E15 | Name per bestehendem Prompt, Cloud dann Auth-Profil, Zeitlimit/UID-Schutz. Sechs Zustände, Abbruch/leer/offline, Cloudfehler, ehrlicher Teilerfolg/Wiederholung, spätes A ohne B-Fortsetzung grün. Alt keine Namensänderung. |
| E16 | Überholte Kommentare/Aliasse und ungenutzte ID-Regeln entfernt, Backupname adrabic, gleiche Themenwahl ohne Cloudschreibaufruf. Tote Namen am Ausgang belegt; neue Probe grün. |
| E18 | Eigener Rückkehrreiter statt bestehendem numerischen drillVon; Abbruch aus Lernen/Verwalten in sechs Zuständen richtig. Alt falscher Reiter. |
| E19 | Rekord bei erster gezählter Bewertung mit vorhandener Funktion nachziehen; eine Bewertung, X, Rekord 12 lokal/cloud statt alter 10. Keine neue Serienregel. Serie/Undo grün. |
| E20 | Feste zwei Slots inkl. leerem Platzhalter; zwölf Karten mit/ohne Notiz, vor/nach Aufdecken, zwölf Zustände: Merken höchstens 1 px, Alt 67,15 px. |
| E21 | Escape beendet und speichert, Backspace nimmt zurück, sichtbare/ARIA-Tasten und Kommentare. Echter Space/3/Backspace/3/Escape-Verlauf genau eine Antwort. Erste Marken erhöhten Zeile 60→75,75 px und erzeugten −5 px; live CSS-Ausblendung belegte Ursache. Absolut im Knopf korrigiert; frischer Sprungtest viermal 0. |
| E22 | Letzte Bewertungsart vor Löschen merken; jeweilige Geist-Keyframes reverse, reduzierte Bewegung none. Drei Richtungen × Bewegung grün; Alt karte-kommt. Nur fertige 0,01-ms-Reste anderer Animationen, keine laufende Rückkehr bei reduce. |
| E23 | Limittext „Karten in dieser Runde“ ohne zweites geschafft. Quelltextprobe und Rundenende auf drei Geräten grün. |
| E24 | Alten Hintergrund-Listener entfernt, vorhandene Kartendelegation behalten. Body-Tipp geschlossen, Karte öffnet; Alt Body-Tipp öffnet. Üben/Hick/Sprung grün. |
| E25 | Ruhetag ohne Tageslernen: leerer Ring/kein Haken/echte nächste Fälligkeit; mit Tageslernen voller Ring. Zwölf Zustände grün; Alt unverdientes Lob. |
| E27 | Andere fällige Bereiche als vorhandene select-bereich-Knöpfe, mindestens 44 px; zwölf Zustände tatsächlicher Wechsel. Alt nicht antippbar. |
| E28 | Nachtgruß Hallo; Ausgang Gute Nacht durch Text-/Datumsprobe ersetzt. |
| E29 | Vorhandenes Warnsymbol für häufig vergessen; Quelltextprobe statt zweiter Serienflamme grün. |
| E30 | Nur password-Provider, bestehende Resetmail mit Bestätigung/Busy/Limit/UID-Schutz. Mail/Abbruch/Fehler, Google/Apple ohne Zeile, spätes A ohne Dialog in B grün. Alt keine Handlung. |
| E31 | adrabic-bereich-UID nur Bereichs-ID; Lesen bei Auth, gültiger Fallback, Schreiben bei Auswahl, eigene Löschung räumt auf. Neustart b2, gelöschte ID b1, anderes Konto b1. Alt vergisst. Datenschutz Punkt 7 ergänzt. |
| E32 | Sehr groß 1,6 in gemeinsamer Auswahl; 40 vorhandene Karten je Thema inkl. langer Notiz/Antwort, Liste/Einstieg auf 320 ohne Überlauf/Knöpfe außerhalb; acht angrenzende Zustände mit gespeicherter Wahl grün. Alt Stufe fehlt. |

E14 Quellen, am 04.10.2026 gelesen und mit Manifest/Apple-Web-App-Meta abgeglichen:
[Apple iPhone-Handbuch](https://support.apple.com/de-de/guide/iphone/iphea86e5236/ios)
und [Google Chrome-Hilfe](https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DAndroid&hl=de).
Keine Behauptung, eine Kalenderdatei sei bereits ein eingerichteter Termin.

Belege: C:/Users/USER/Desktop/Wiederholung-Belege/Paket-E-2026-10-04-Akku/.
25 Testlogs, maßgeblich t_einstellungen-folgelauf.js.log, E32-final.log,
quellen.json/quellen-folgelauf.json, acht PNGs und sprung-diagnose.js.
Das erste rote Sprunglog wurde versehentlich überschrieben; die vier schon
vollständig gelesenen Ergebniszeilen sind als ausdrücklich gekennzeichnete
Abschrift t_sprung-erster-roter-lauf.txt erhalten, nicht als Original.
Prüfläufe vor abschließender Versionsvorbereitung; unterschiedliche lokale
Quellenstände dokumentiert. Kein frischer Gesamtstand oder Tempovergleich
behauptet. Nach Versionsvorbereitung: Syntax von App/SW/neuem E-Test/Attrappe/
Gesamtwrapper grün; pruefe_stand.mjs vollständig grün (3.18.15, CSS-Struktur,
Version, CSP, APP_SHELL und SDK-Vorablinks), git diff --check grün.
Letzte Akkuprüfung: BatteryStatus 1, 60 Prozent. Kein Paketabschluss behauptet.

**LEHREN §14, Vorprüfung (vor Commit am Netzteil erneut):**
1 Codepfade gelesen; 2 gleiche Muster im Repo gesucht; 3 Texte/Kommentare
nachgezogen; 4 zentrale Schriftwahl, Aktionen, Auth-Reset und Testliste
berücksichtigt; 5 dauerhafter Zustand in bestehenden ui-/Auth-/Speicherpfaden,
kein neuer alleiniger DOM-Zustand; 6 Sprung/Kontrast/Breiten lokal grün,
CPU-4×-Tempo und echtes Gerätegefühl offen; 7 Einzahl/Mehrzahl geprüft,
Fehlertexte ohne Firebase-Codes; 8 keine neuen Cloudfelder/Regeln;
9 Datenschutzerklärung um lokalen Bereichsspeicher ergänzt;
10 Syntax grün; 11 Version/Cache/33 URLs/Changelog/CSP/APP_SHELL grün;
12 betroffene 25 Einzeltests grün, Gesamtlauf/Affen/frischer Rundenwrapper
noch offen; 13 Logbuch/PLAN/STAND/Aufgaben aktualisiert;
14 Betreiber muss Netzteil anschließen und „Netzteil dran“ einfügen.
Quellenhashes nach Versionsvorbereitung: quellen-version-vorbereitet.json.
Prüfstand unter Windows weiter mit CHROMIUM=C:/Program Files/Google/Chrome/
Application/chrome.exe und bestehendem Server 8099.

**Offen:** frischer gesamter Prüfstand, beide Affen, separater frischer
13/13-Rundenwrapper und eventuelle notwendige Fehlerkorrekturen am Netzteil;
abschließende Gegenprüfung/LEHREN §14 vor Commit, Commit/Push auf main.
E7/Z6b, E17/G4 und E26/Z7 bleiben wie oben; G5/G6/G7 nach späterer
Betreiber-Veröffentlichung auf echten Geräten. Keine weitere Aufgabe bauen.

**Nächster Schritt:** Betreiber fügt „Netzteil dran“ ein. BatteryStatus 2
prüfen, vorhandenen Stand behalten, Paket E bis Commit/Push abschließen.
Nicht veröffentlichen.

### 2026-10-04 — Paket D D1–D11 abgeschlossen, 3.18.14

**Geändert:** vorhandenen Arbeitsstand vollständig erhalten und für den
Abschluss übernommen: app.js:19/1602/1822/4143/6761/9053/13392/14171/14517,
styles.css:2181 (D3 und Bewegungsregeln D5–D9), sw.js:10, sämtliche 33
Versions-URLs in index.html:64 ff.; css_struktur.mjs, pruefe_stand.mjs und
D-Abnahme/Wrapper/a11y-Erweiterung. CHANGELOG.md:1 gegen den tatsächlichen
Diff korrigiert: keine pauschale Flüssigkeitsbehauptung, D6 ohne Verzögerung
eingeblendet/≥0,9 nach 400 ms, D15 offen. AUFGABEN D1–D9/D11 auf
erledigt (3.18.14), D10 bleibt trifft nicht zu (B5/3.18.12).
STAND und PLAN „AKTUELL“ nachgezogen. Sämtliche bereits vorhandenen
Diagnosequellen/-berichte bleiben erhalten; sie sind keine Produktfixes
für D12–D15. .gitignore:22 ignoriert nur den vorhandenen lokalen
Python-Bytecode im Prüfstand; nicht gelöscht, Quellen bleiben versioniert,
Hosting schließt plan/** bereits auf beiden Sites aus.

**Entscheidung:** Betreiber 04.10. schließt ausdrücklich nur die gebauten
D1–D11 ab. D12, D13, D14, D15 bleiben zurück; nichts gebaut, nichts weiter
gemessen, kein Capture-Build und keine neue Fotoserie für diese Aufgaben.
Die vorhandene ZURUECK-Liste und sämtliche D12/D13/D15-Proben in
t_paket_d.js sind bytegleich erhalten, standardmäßig ausgenommen und
einzeln aufrufbar. Kein anderer Test ausgelassen, gelöscht oder gelockert.
Kein Reset, Clean, Pull oder Wiederherstellen; keine neue Produktänderung
während des Abschlusses. Kein Paket E. Veröffentlichung bleibt beim Betreiber.

**Prüfung:** BatteryStatus durchgehend 2 (anfangs 89, zuletzt 100 Prozent),
Server 8099 HTTP 200. Chrome 154.0.8037.93, Firebase-Attrappe, kein
WebKit/echtes Gerät. Frisch, ohne --fortsetzen:

- alle_pruefen.js: 138/138 Exit 0, kein Zeitlimit/roter Prozess;
  jede vollständige Ausgabe gelesen, einschließlich beschreibender Proben.
- affe.js handy 200 7: 200 Schritte, 0 Befunde; vollständige Ausgabe gelesen.
- affe.js ipad 150 7: 150 Schritte, 0 Befunde; vollständige Ausgabe gelesen.
- abnahme_runde.js separat frisch: 13/13 grün, alle 13 vollständigen
  Einzeltest-Ausgaben gelesen; Schreiben CPU 4× auf allen drei Breiten
  0 Bilder >34 ms, Zeichenfläche/Knöpfe im Bild, Tinte erhalten.
- Gegenproben D1–D9/D11 separat mit --alt am festen 50d15ce:
  alle zehn am konkreten Befund rot (Exit 1), vollständige Ausgaben gelesen.
  D1 kein berechneter Austritt; D2 61 statt 0; D3 verwaiste Keyframe/Klammer;
  D4 Chipsprung; D5 Bühnen-Aufleuchten; D6 Deckkraft 0 nach 400 ms;
  D7 doppelte Feier; D8 900 statt 0; D9 leeres Zwischenbild;
  D11 keine fünf Austrittsbilder. Dies sind erwartete Altstandfehler,
  keine roten Produktabnahmen und keine Messfehler-Erklärung.

Belege separat vom abgebrochenen Lauf:
C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-04-Abschluss/
(adrabic-pruefstand-gesamt/9802e0dd7279f524/, beide Affenlogs,
frische-rundenabnahme/, gegenproben-50d15ce/).
Produkt-/Prüfstandkennung beider frischen Läufe:
9802e0dd7279f524672568bf788d79594a51ae4f9e61cab288b848d2421fb7b9.
App/CSS/SW/HTML und t_paket_d.js nach den Läufen bytegleich zu Beginn
des frischen Gesamtlaufs; Syntax, Standprüfung und bisher versionierter
Diff-Whitespace grün. Erst die Indexprüfung einschließlich vorher
unversionierter Dateien meldet vier bereits vorhandene zusätzliche
EOF-Leerzeilen in D-KRITISCHE-PRUEFUNG, D15-CAPTURE-MESSWEG,
D15-DECKUNG und D15-OPERATION. Bewusst unverändert erhalten, keine
Produkt-/Teständerung oder rote Abnahme daraus; Indexausgabe gesichert.

**Gegenprüfung nach Großplan § 2a (D1–D11, Punkt für Punkt):**
Vollständigen Produktdiff gegen 50d15ce gelesen (app.js, styles.css, sw.js,
index.html, CHANGELOG), außerdem t_paket_d.js, t_a11y.js, Gesamtprüfer,
css_struktur.mjs und dessen Einbindung in pruefe_stand.mjs; die Befundblöcke
BEW-1 bis BEW-11 jeweils gegen tatsächlichen Code und Erwartungswerte gelesen.
Keine Lernregel, Cloud-Regel, neue persistente Speicherung oder Datenübertragung.

1. D1: berechnete Transformation/Deckkraft statt Inline-Stil geprüft;
   Blatt und Hülle lösen haltende Eintrittsanimationen, 200-ms-Austritt,
   Desktop scale(.96), reduziert sofort. Fehlender/abgelöster Dialog und
   Doppelschließen rufen die Fortsetzung weiter auf. closeDialog löst auch
   das alte Promise auf, ohne einen neuen Dialog zu schließen.
2. D2: RAF beginnt nur in der 70-px-Mausrandzone, Mitte/pointerleave bauen
   ihn ab; Leerlauf Handy/Desktop 0. Bestehende Sperren für Ziehen, Schreiben,
   Dialog und Eingabefelder gelesen. Eigenes Zieh-Scrollen bleibt getrennt.
3. D3: zwei verwaiste CSS-Zeilen entfernt; Strukturprüfung erkennt sie,
   CSSOM fordert die konkrete Animation für alle drei Bewertungsarten.
   Berechneter grüner Schatten am pausierten 60-ms-Bild geprüft, nicht nur
   Selektorfund. Reduzierte Bewegung bleibt über die zentrale Regel aus.
4. D4: Hakenplatz immer vorhanden, inaktiv unsichtbar; Umschalten desselben
   Bildschirms ohne neues Poppen. Test misst x/y/Breite ±1 px und maximal
   einen Pop. Leere Auswahl bleibt ohne Chips; Zustand weiter in ui.
5. D5: nur die drei Modusstarts scrollen ohne Bühnen-Aufleuchten;
   Richtungsselektor überstimmt nicht mehr animation:none am Modus.
   Test fordert gestarteten Modus und keine zweite Bühnen-/Seitenbewegung
   für Runde, Üben und Durchsicht. Leere Konten haben keinen Startknopf.
6. D6: nur Verzögerung am Ende entfernt, 360-ms-Eintritt bleibt.
   ≥0,9 Deckkraft nach 400 ms ist das Befundkriterium; deshalb Changelog
   von „sofort sichtbar“ auf „ohne Wartezeit eingeblendet“ berichtigt.
7. D7: Besuchsmerker im Arbeitsspeicher unter ui, nur neue normale
   Lernen-/Fortschrittansicht zählt. Wiederbesuche ohne Kinderchoreografie,
   erster Besuch ≤1200 ms, Wiederbesuch ≤2 Bewegungen/300 ms; Flamme einmal.
   Kontowechsel/Render baut private Kopien ab, kein neuer lokaler Schlüssel.
8. D8: vier smooth-Wege auf scrollArt umgestellt; zentrale Sprunghilfe
   war schon geschützt. Echter aktiver Reitertipp 900→0 im ersten Bild
   bei reduziert, normal zunächst >0 und danach Ziel 0; keine bloße
   Prüfung eines gesetzten Optionswertes.
9. D9: neue Seite kommt weit mit Deckkraft 1, alte Seite gleichzeitig
   als eingefrorene inert/aria-hidden Bildkopie ohne IDs/Handlungen.
   Bildkopie nur in #app, nach 200 ms/jedem Render weg; Layoutlesung vor
   Neuaufbau. Test: echte CDP-Touchzüge in beide Richtungen, kurze/weite
   Züge, Rand, kein leeres Zwischenbild, normaler Reitertipp ≤30 px.
   Abbruchpfad bleibt unverändert; echtes iPhone-Gefühl bleibt offen.
10. D10: kein Produktdiff; B5/3.18.12 bereits vorhanden. Touch-, Rad- und
    Tastaturabbruch sowie cancelAnimationFrame im echten Einstiegscode
    gelesen. B5 und sämtliche Einstiegstests im frischen Lauf prüfen es.
11. D11: alter Toast endet linear in 160 ms, reduziert sofort; hält
    Eintritt nicht fest, ≥5 Zwischenbilder. Kein render/innerHTML beim
    Ablauf, kein Feldverlust; erfasste alte Hülle kann neue Meldung nicht
    entfernen. Neuer Toast nach 2650 ms ist eigener Gegenfall.

§2a.3: historische Gegenproben an festem 50d15ce, niemals HEAD.
D10 ist bereits vor diesem Paket behoben und hat deshalb keine erfundene
rote D-Gegenprobe. §2a.4: Chrome-Emulation ist kein WebKit/echtes Gerät;
D9-Gerätegefühl, G1 und D15-iPhone-Start bleiben offen. D12–D15 sind durch
Betreiberentscheidung zurück, keine weitere Messung oder Produktänderung.

**LEHREN § 14 — Checkliste vor diesem Commit:**

1. Codepfade selbst gelesen: renderMain, ui-Besuchsmerker, Reiterwischen,
   Sprunghilfen/Scrollwege, Maus-Randscrollen, spielAustrittsAnimation,
   closeDialog und Toast-Ablauf; zugehörige CSS-Regeln gegen Befund geprüft.
2. Mustersuche im Repo: RAF-/Scrollschleifen, smooth-Wege, Hakenmarkierungen,
   Modusstarts, gehaltene Animationen und Austritt; eigenständige Zieh-,
   Einstiegs- und Kartenkopf-Rückmeldungen nicht pauschal umgebaut.
3. Changelog gegen Diff korrigiert (D6-Sichtbarkeit und offenes D15);
   Aufgaben, STAND, PLAN und aktuelles Logbuch nachgezogen. Historische
   Diagnoseberichte bleiben erhalten und sind keine neuen Arbeitsaufträge.
4. Keine neuen Blätter, Handlungen, Rasterkinder oder Einstellungen.
   CSS-Strukturhilfe im Standprüfer; D-Abnahme durch t_*.js im Gesamtprüfer.
   Die vorhandene ZURUECK-Liste bleibt unverändert/Einzelaufruf möglich.
5. Besuchsmerker in ui.choreografieBesucht; Toastzustand in ui.toast;
   reine Austrittskopie hat keinen Bedienzustand und wird bei Render entfernt.
6. Sprung/Kontrast/a11y und Breitenmatrizen grün. Schreiben und Scrollen
   bei CPU 4× ohne Bilder >34 ms; Texttempo maximal 169 ms, Grenze 200.
   Beschreibende Kalt-/Erstbesuchsproben zeigen weiter Pausen:
   t_fluessig erstes Fortschritt/Verwalten max. 283/300-ms-Bild,
   t_fluessig_gross erstes Fortschrittbild 520 ms, Ende 216-ms-Bild.
   Kein Urteil „durchgehend ruckelfrei“, kein ungeprüfter Tempo-Fix;
   Geräte-/kalte Startabnahme bleibt offen, keine neue D15-Messung.
7. Keine neuen Produkttexte oder Methoden-Zahlen; vorhandene
   Einzahl/Mehrzahl und Nutzeransagen in den beschreibenden Ausgaben gelesen.
8. Keine neuen Cloud-Felder, firestore.rules unverändert. Regeln aus A
   bleiben Veröffentlichungspflicht des Betreibers über ladegeraet.bat.
9. Kein neuer Datenfluss/localStorage-Schlüssel; Datenschutz unverändert.
10. node --check app.js sw.js sowie separate Prüfung sw.js grün.
11. APP_VERSION/CACHE_NAME und alle 33 ?v=-Stellen =3.18.14, CHANGELOG oben;
    pruefe_stand.mjs grün einschließlich CSS-Struktur, aller HTML-CSP,
    APP_SHELL, Firebase-Vorladen und csp-build.
12. Frischer Gesamtprüfstand 138/138, alle Ausgaben vollständig gelesen;
    affe handy 200 7 / ipad 150 7 und frische Runde 13/13 separat dokumentiert.
    Keine Assertion gelöscht/gelockert, kein anderer Test ausgelassen.
13. Logbuch im CLAUDE-Format, PLAN „AKTUELL“ und STAND aktualisiert;
    D12–D15 zurück, D9-Gerätegefühl/G1 offen, kein Paket E begonnen.
14. Betreiberantwort endet mit „Was Du noch tun musst“:
    ladegeraet.bat, danach iPhone-App ganz schließen/neu öffnen und
    für D15 Übergang vom Ladebild zur App ansehen.

**Kriterien:** D1–D9/D11 gegen ihren BEW-Befund abgenommen; D10 bereits
B5. Kein pauschaler Abschluss aller Zyklus-/Geräteaufgaben oder A1–A6
behauptet. Abnahme aus Großplan §3 angewandt (echter Codepfad,
Randfälle/Regression, feste rote Gegenprobe, keine verletzte Lernlogik).

**Offen:** D12–D15 bewusst zurück; vorhandene Entwürfe/Fehlbelege bleiben
erhalten, keine neue Messfrage als Auftrag. Echtes D9-Gerätegefühl und G1
bleiben offen. D15 kalte Start-/Geräteabnahme nicht durch warme Kontrollen
ersetzt. Veröffentlichung steht aus; Regeln aus Paket A vor Hosting
durch ladegeraet.bat. Keine Veröffentlichung/kein Deploy durch Codex.

**Abschlussweg:** Dokument-/Indexprüfung, Commit direkt auf main und Push;
keine Veröffentlichung. Danach anhalten.
**Nächster Schritt:** Betreiber: ladegeraet.bat; auf dem iPhone App
ganz schließen, neu öffnen und den Übergang vom Ladebild zur App für D15
ansehen. Kein Paket E ohne eigenen Auftrag.



### 2026-10-04 — Paket D: Betreiberauftrag zum Abschluss D1–D11

**Geändert:** `CHANGELOG.md:1` gegen den Produktdiff berichtigt: Fertig
blendet ohne Verzögerung ein (≥0,9 nach 400 ms), D15 ist weiterhin offen.
Vorhandene Version 3.18.14 in `app.js:19`, `sw.js:10`, `index.html:64`
übernommen; kein Reset, Clean, Pull oder Wiederherstellen.
**Entscheidung:** ausdrücklicher Betreiberauftrag 04.10.: ausschließlich
die gebauten Aufgaben D1–D11 abschließen. D12, D13, D14 und D15 bleiben
zurück; dort nichts bauen oder weiter messen, kein Capture-Build, keine
neue Fotoserie. Dies ersetzt die bisherigen nächsten Messaufträge.
Die vorhandene ZURUECK-Liste in `t_paket_d.js` bleibt unverändert:
D12/D13/D15 sind nicht im Produkt, laufen im Standardlauf nicht mit und
bleiben einzeln aufrufbar. Kein anderer Test wird ausgelassen oder gelockert.
**Prüfung:** Pflichtdateien vollständig gelesen, Produktdiff und D-Abnahmen
gelesen. BatteryStatus 2 (89 Prozent); Server 8099 HTTP 200. App/SW-Syntax,
Standprüfung einschließlich CSS-Struktur/CSP/APP_SHELL grün; alle 33
Versions-URLs (31 Startbilder, CSS, JS) tragen 3.18.14. Gesamtlauf wird
frisch begonnen, ohne --fortsetzen; danach beide Affen und Runde 13/13.
**Offen:** Abschlussprüfung und Gegenprüfung; D12–D15 zurück, Gerätegefühl
D9 und iPhone-Start D15 offen. Veröffentlichung nur durch den Betreiber
mit `ladegeraet.bat`; kein Deploy durch diesen Chat, kein Paket E.
**Nächster Schritt:** frischen Gesamtlauf vollständig lesen und bei Rot
Ursache belegen/beheben oder Messfehler belegen; sonst anhalten ohne Commit.

### 2026-10-04 — Paket D: Capture-Messweg kritisch geprüft, Build nicht begonnen

**Geändert:** neu `plan/zyklus-2/D15-CAPTURE-KRITIK-2026-10-04.md`;
`plan/LEHREN.md` § 5.3 (drei Regeln) und § 15 (eine Zeile); STAND,
Übergabe und D15-Hinweis in AUFGABEN nachgezogen. Außerhalb des Repos
TEMP `paket-d15-kritik-20261004/` (Offline-Auswerter und Ergebnis).
Kein Produktcode, kein Test, kein Browserlauf, keine Installation.
**Entscheidung:** Beide Capture-Sperren an der gepinnten ANGLE-Quelle
bestätigt: noperspective wird in `Context.cpp:4639` ohne eigene Bedingung
abgeschaltet (nur per Quellpatch erhaltbar); ein Abschnitt endet nur über
einen Window-Swap (`Context.cpp:9771–9781`, `Surface.cpp:347/359`), den
es im headless gestarteten Prüfstand nicht gibt (`lib.js:136`,
`gl_surface_egl.cc:1081–1084`). Toolchain fehlt vollständig, Laptop an
der Untergrenze. **Entscheidend:** Vorhandene kalte Spuren zeigen, dass
der Zielshader 21–22 Prozent der späten Kompilierzeit trägt (24,5 von
113,6 ms; 14 Kompilierungen) und dass ohne alle Schatten an Navigation
und Startliste weiter 72,0 ms Bildlücke bleiben, bei nur 24,1 ms Flush.
Erlaubt wären bei 280 ms linear höchstens 56 ms. Die Capture-Rohwerte
können die BEW-15-Abnahme damit nicht tragen; der Build ist nicht
begründet und wurde nicht begonnen (Urteil „lieber nicht“, LEHREN § 1.1).
Die Pause hängt am ersten Zeichnen der App-Ansicht direkt nach
`render()` (rAF-Abstand 156,2 ms, Bildlücke 178,4 ms bei Deckkraft 0).
**Gegenprüfung:** jede Quellzeile selbst gelesen (lokale Kopien mit
SHA256 im Bericht), jede Zahl aus `auswertung.json` mit Eingabe-Hashes;
Rechenwerte als Rechnung bezeichnet. Frühere Berichte nicht
umgeschrieben, Widersprüche im neuen Bericht benannt. Nicht geprüft:
Bildhelligkeit dieser vier Läufe, Zerlegung der rund 48 ms außerhalb des
Raster-Flushes, ShareGroup-Zuordnung in Chromium (Quellen nicht geladen).
**Fremde Änderung bemerkt:** 00:27:19–00:27:52 änderte ein anderer
Prozess `app.js` (nur Version → 3.18.14), `sw.js`, `index.html`,
`CHANGELOG.md` (Eintrag „3.18.14 – Paket D“) und `t_paket_d.js`
(D12/D13/D15 laufen ohne Argument nicht mehr mit). Nicht von dieser
Sitzung, nicht angefasst, nicht zurückgenommen; Einzelheiten und Hashes
in D15-CAPTURE-KRITIK § 7. Kein Commit dazu, `main` = `50d15ce`.
Die Übergabe-Hashes für `app.js`/`sw.js`/`index.html` gelten damit nicht
mehr. Betreiber muss klären, welcher Chat das war.
**Korrektur 00:50, eigener Fehler:** „während dieser Sitzung“ und der
Verdacht auf Codex waren ungeprüft. Diese Sitzung begann erst 00:30:53;
die Änderung lag davor. Codex (Chat Capture-Vorbereitung) verneint.
Zeitlich passt eine vom Betreiber um 00:30:29 gelöschte frühere
Claude-Sitzung (Beginn 00:19:54); sie hat sehr wahrscheinlich die Version
gesetzt und um 00:28:00 einen Gesamtlauf begonnen, der bei `t_anmelden`
um 00:30:20 abbrach (TEMP `adrabic-pruefstand-gesamt/9802e0dd7279f524/`).
Nicht beweisbar, Transkript gelöscht. Keine Gesamtabnahme von 3.18.14.
**Offen:** D12/D13/D15 zurück, D14 geschützt, Z1 ausgelassen, G1 offen.
Betreiber entscheidet, ob der Capture-Build trotz dieses Urteils gewollt
ist (dann: Visual Studio 2026 mit Administratorrechten, ≥ 100 GB, zwei
ANGLE-Patches). BatteryStatus 2, kein Gesamt-/Tempo-Lauf. Kein
Paketabschluss, keine Version, Commit, Push oder Veröffentlichung.
**Nächster Schritt:** die eine Frage aus D15-CAPTURE-KRITIK § 6 messen:
kalt Original/Diagnose/Original mit `x_d_ursachen.js boot`, ob die
Einblendung lückenlos bleibt, wenn während des ersten Zeichnens der
App-Ansicht keine Deckkraft-Bewegung läuft. Vorhersage und Abbruchregel
stehen dort. Erst danach ein Produktentwurf.

### 2026-10-03 — Paket D: Capture-Messweg konkret vorbereitet

**Geändert:** D15-CAPTURE-MESSWEG-2026-10-03.md, Offline-Leser
plan/werkzeuge/pruefstand/x_d15_capture_payload.py; STAND, Übergabe,
D15-Hinweis und LEHREN nachgezogen. Neun feste Originaleingaben (1.631.860
Bytes), zehn zusätzliche gepinnte Quellen und Offline-Prüfung außerhalb
des Repos erhalten. Keine Produktänderung oder Capture-Aufnahme.
**Entscheidung:** Standard-ANGLE-Capture nicht blind starten: Context.cpp
schaltet noperspective aus, das die Originalquelle verlangt. onPreSwap
überspringt vorhandene nicht-Window-Surfaces. Eigene separate Build mit
Caps-Erhaltung und belegtem ShareGroup-Abschluss ist Voraussetzung;
Build-Grundgerüst, feste Eingabe, erforderliche Drawdaten und Null-Pixel-
Kontrollen im Messweg konkret beschrieben. Keine native Erfassung behauptet.
**Prüfung:** neun Eingabe-/zehn Quellenhashes gleich, fünf Produktbytehashes
gleich, Python-Syntax und bestehende App-/SW-/Standprüfung grün.
Offline-Leser: vier Float32-Bitwörter einschließlich negativer Null/NaN
erhalten; sechs ungültige Hash-/Bereichsfälle abgewiesen. Das sind
synthetische Leserprüfungen, keine GPU-/Bild-/Tempoabnahme.
**Korrektur:** erster Kopierlauf verglich CRLF-Shaderdatei mit LF-Tracehash;
Assertion stoppte. Exakte Tracequelle separat extrahiert, beide Dateien/
Hashes erhalten; 37 CRLF erklären Differenz. Frühere Skriptfassung behalten.
Anfangs nicht vorhandenes Operation/bestand.json gelesen; auswertung.json
danach verwendet, keine Aussage aus dem fehlenden Pfad.
**Gegenprüfung:** §2a/§2b/§3, BEW-15 und Datenumfang gegen tatsächliche
Quellen gelesen: Caps/Framegrenze ausdrücklich gesperrt, Drawbeleg nicht
durch Shaderhash ersetzt, keine Toleranz/Maskierung/warme Abnahme.
**Offen:** Build-Toolchain und beide Capture-Voraussetzungen; D12/D13/D15
weiter zurück, D14 geschützt, Z1 ausgelassen, G1 offen. BatteryStatus 1,
Server HTTP 200/19.539 Bytes. Kein Paketabschluss, Version/Commit/Push/Deploy.
**Nächster Schritt:** separate passende Build vorbereiten, zuerst Caps-
Erhaltung und Offscreen-ShareGroup-/Abschlussbeleg klären, erst dann
gezielte Originalerfassung nach D15-CAPTURE-MESSWEG §3–5.


Abschluss nach Datumswechsel am 04.10.2026: Vorbereitung samt vollständigem
geändertem/unversioniertem Arbeitsbaum dauerhaft unter
C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-D15-Capture-Vorbereitung/
gesichert: 98 Dateien / 5.222.564 Bytes, alle Quell-/Kopie-SHA256 gleich.
Originale und frühere Sicherungen erhalten. Diese Abschlussdokumentation
liegt zusätzlich separat unter sicherungsabschluss/ mit eigenem Hashmanifest.
Fünf Produktbytehashes gleich; neue Python-Syntax/Offline-Leserprüfungen und
git diff --check grün. Kein Browser-/Gesamt-/Tempo-Test, keine Veröffentlichung.
Beim ersten Diffdruck brach Python-cp1252 am Pfeilzeichen ab; anschließend
mit PYTHONIOENCODING=utf-8 vollständigen eigenen Dokumentdiff gelesen.
Die Dateien waren unverändert gültig; kein Ergebnis aus dem Abbruch abgeleitet.

### 2026-10-03 — Paket D: Erfassbarkeit geprüft, fehlende Capture-Umgebung bestimmt

**Geändert:** nur Dokumentation und Offline-Helfer. **D15-Erfassbarkeit 03.10., ohne Browserlauf:** Exaktes CDP-Protokoll
mit 52 Domains/580 Methoden geprüft; keine deklarierte Methode für Skias
interne Uniform-/Attributwerte. Passend gepinntes ANGLE kann Uniform-Payloads
mit Capture-Build erfassen; Standardoption false, Mock ohne Erfassung.
Installierte Capture-Unterstützung nicht belegt; vier Capture-Marker in
chrome.dll fehlen (begrenzter Beleg, keine vollständige Build-Analyse).
RenderDoc/apitrace in PATH, Standardpfaden und geprüften Installations-
registern nicht gefunden. Kein neuer Foto-/ENV-Versuch, keine Installation.
Konkreter Haltepunkt: zusätzliche Capture-fähige Messumgebung fehlt.
Details: [D15-ERFASSBARKEIT-2026-10-03.md](D15-ERFASSBARKEIT-2026-10-03.md).
D bleibt angehalten; D12/D13/D15 zurück, D14 geschützt, Z1 ausgelassen,
G1 offen. Alle Daten erhalten, Produkt unverändert, Server HTTP 200,
BatteryStatus 1. Keine Veröffentlichung.

**Prüfung:** exakt gepinnte CDP-/ANGLE-Quellen, Hashinventare und begrenzte
lokale Werkzeug-/Binary-Prüfung. GL-Aufrufpayload von finalen GPU-Konstanten/
Deckung unterschieden. Eigene 404-Pfadannahmen sichtbar korrigiert, Originale
behalten. Gegenprüfung §2a/§2b/§3 im Bericht. Keine Aufgabe erledigt.


Erfassbarkeitsprüfung, vollständige gepinnte Quellen/Protokolldomains,
begrenztes Binary-/Werkzeuginventar, feste Eingangsdaten und vollständiger
geänderter/unversionierter Arbeitsbaum zusätzlich dauerhaft unter
C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-D15-Erfassbarkeit-233845/
gesichert: 141 Dateien / 3.661.949 Bytes, sämtliche Quell-/Kopie-SHA256 gleich.
Originale und frühere Sicherungen erhalten. Abschlussdokumentation separat
unter sicherungsabschluss/ mit Hashmanifest. Aktuelle Python-Syntax,
Quellen-SHA256 und git diff --check grün; Produktbytehashes unverändert.
Kein neuer Produkt-/Gesamt-/Tempo-Test.

### 2026-10-03 — Paket D: Ersatzzeichenwege eingegrenzt, Haltepunkt bestätigt

**Geändert:** nur Dokumentation und separate Offline-Auswertung, kein Browser
oder Produktentwurf. **D15-Zeichenwegprüfung 03.10., nur offline:** Einzelkontur bietet keine
Deckungsgleichheit; analytischer Differenzclip verwendet erneut GrRRectEffect;
getrennte Masken benötigen unbewiesene Parameter-/Rundungs-/Kompositionsgleichheit.
Rundrechtecke haben mehrere interne Zeichenwege, nicht pauschal einen einzigen.
Idealisierter Austausch der äußeren Ellipsenregel durch Radialregel:
88/88 vorhandene Modellwerte verschieden, keine GPU-/RGB-Abnahme daraus.
Kein belegter günstiger pixelgleicher Ersatz. D bleibt nach §6 angehalten;
keine nächste Blindprobe. Wiederaufnahme nur mit konkret steuerbarem Zeichenweg
samt Gleichheitsbeleg oder begründeter Erfassung fehlender GPU-Daten.
Details: [D15-ZEICHENWEG-2026-10-03.md](D15-ZEICHENWEG-2026-10-03.md).
D12/D13/D15 zurück, D14 geschützt, Z1 ausgelassen, G1 offen. Alles erhalten;
Produkt unverändert, Server HTTP 200, Akku BatteryStatus 1. Nicht veröffentlicht.

**Prüfung:** exakt gepinnte Primärquellen gelesen, neue Quellen-SHA256 geprüft.
22 gespeicherte Modellpunkte in vier Phasen gegen idealisierte Radialregel;
88 Unterschiede, ausdrücklich keine gerenderte Maskenabnahme. Quellen erlauben
mehrere RRect-Wege; zu pauschale erste Chat-Formulierung präzisiert.
Gegenprüfung §2a/§2b/§3 dokumentiert. app.js/sw.js-Syntax und Standprüfung grün;
Produktbytehashes gleich. Keine neue Gesamt-/Tempo-Prüfung auf Akku.


Neue Quellwegprüfung, feste Offline-Eingaben, frühere Dokumentstände und
vollständiger geänderter/unversionierter Arbeitsbaum zusätzlich dauerhaft
unter C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-D15-Zeichenweg-232324/
gesichert: 75 Dateien / 2.573.768 Bytes, sämtliche Quell-/Kopie-SHA256 gleich.
Originale und ältere Sicherungen bleiben erhalten. Endgültige Dokumentation
separat unter sicherungsabschluss/ mit eigenem Hashmanifest.

### 2026-10-03 — Paket D: Paint-Lücke geschlossen, verlorene AA-Deckung offline belegt

**Geändert:** nur Dokumentation und separate Offline-Auswerter. Bericht
[`D15-DECKUNG-2026-10-03.md`](D15-DECKUNG-2026-10-03.md), STAND, Übergabe,
Ursachen, D15-Hinweis und LEHREN ergänzt; alte Dokumentstände erhalten.
**Entscheidung:** Browser-DEPS pinnt Skia exakt. Binäre historische Picture
selbst gelesen: drawDRRect 23 mit Weiß/SrcIn-Farbfilter 14/255, ohne Blur;
vollständige semantische Paint-Gleichheit zu A1/B/A2/A3. SVG gleiche Alpha.
325 Fehler in 72 fehlende, 14 zusätzliche und 239 andere Mischpixel getrennt.
22 Originalpixel unterhalb SVG-Support; alle vier Ableitungsphasen des aus
Quelle/Geometrie abgeleiteten Modells dort positiv. Zwei unterschiedliche
geglättete Deckungen werden multipliziert. Modell ausdrücklich kein exakter
GPU-/RGB-Ersatz; vollständige Uniform-/Attributwerte in Spur nicht enthalten.
**Offen:** unterstützter anderer Zeichenweg muss konkrete Deckung und
Mischkontext erhalten; kein belegter Ersatz. SVG bleibt abgelehnt, §6.
Keine weitere Browserprobe ohne entsprechende Ableitung/prüfbare Daten.
D12/D13 unverändert zurück, D14 geschützt, Z1 ausgelassen, G1 offen.
**Prüfung:** ausschließlich vorhandene Bilder/Pictures/Shader plus passende
Primärquellen. Eigene rg-/Parser-Vorabfehler durch Assertions abgefangen,
Quelle gelesen und echte Bit-/Nullpfad-/Dateioffsetfälle korrigiert;
alle früheren Leserfassungen behalten, keine Pixelgrenze gelockert.
Gegenprüfung §2a/§2b/§3: Paint-Lücke wirklich geschlossen, Grenzen und
fehlende Gerätedaten sichtbar, keine abgeschlossene Aufgabe behauptet.
Produktbytehashes gleich, Server HTTP 200, Akku BatteryStatus 1.
Kein neuer Browser/Foto/Produktentwurf, anderes Paket, Version, Commit/Push/Deploy.

Abschlussprüfung: sechs aktuelle Offline-Quellen syntaktisch gültig;
erneut gelesene Pictures gleich gespeicherter Auswertung, native
CommandLog-Anzahlen und unterstützte Paint-Farben geprüft; git diff --check
grün. Kein neuer Produkt-/Gesamtlauf, Hashes unverändert.

Offline-Deckungsprüfung, gepinnte Primärquellen, feste Eingaben und
vollständiger Arbeitsbaum zusätzlich dauerhaft unter
`C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-D15-Deckung-223800/`
gesichert: 137 Dateien / 33.180.459 Bytes, alle Quell-/Kopie-SHA256 gleich.
Originale und ältere Sicherungen bleiben erhalten; endgültige
Abschlussdokumentation separat unter `sicherungsabschluss/` mit Hashmanifest.

### 2026-10-03 — Paket D: Inset-Zeichenblock kausal isoliert, pixelungleiche Alternative angehalten

**Geändert:** nur Dokumentation und separate TEMP-Diagnose. Neue feste
CSS-Navigation, frische vollständig nacheinander abgeschlossene Prozesse,
echte Bilder/Spuren und zeitgleiche gespeicherte Pictures. Neuer Bericht
[`D15-OPERATION-2026-10-03.md`](D15-OPERATION-2026-10-03.md); STAND,
Übergabe, Ursachen, D15-Hinweis und LEHREN nachgezogen. Alle alten Daten,
Helferfassungen und Dokumentstände erhalten.
**Entscheidung:** Befehle 0–28 exakt historisch, bekannter Shaderhash erneut.
A1/B/A2 entfernt allein Rahmenbefehl 26; Shader bleibt. A2/D/A3 entfernt
allein Inset-Zeichenblock 19–25; restliche Liste exakt gleich, Shader fehlt
und kehrt im Original zurück. Originalbilder A1/A2/A3 null Fehlerpixel.
Eigene C-Probe und ältere globale Probe falsch isoliert: `--kante:none`
ergibt vollständig `box-shadow:none`. Sichtbar korrigiert und Rohdaten
behalten. D verwendet gültige Außenschattenliste. Eine abgeleitete SVG-
Randfläche E vermeidet Shader, verändert 325 Pixel bis sechs Stufen:
streng abgelehnt, kein Produktentwurf und keine weitere Variante.
**Offen:** originale Deckungs-/Mischregel und fehlende Paint-/Uniformdaten
gegen E-Fehlerpunkte offline klären; vollständige kalte/Geräteabnahme fehlt.
D12/D13-Beleglücke unverändert; D14 geschützt, Z1 ausgelassen, G1 offen.
**Nächster Schritt:** gespeicherte Daten zu dieser Deckungsregel lesen,
keine Browser-/Farb-/Pfadserie. Nach §6 keine rote Alternative übernehmen.
Gegenprüfung §2a/§2b/§3: vollständige Listendifferenzen und Hashes selbst
ausgewertet, kein Ursachenbeleg aus fehlender Datei oder CPU-Replay,
keine gelockerte Abnahme. Produktbytehashes gleich, Server HTTP 200,
BatteryStatus 1. Kein anderes Paket, keine Version, Commit/Push/Deploy.

Abschlussprüfung grün: app.js/sw.js-Syntax, neue Diagnosequellen,
pruefe_stand.mjs und git diff --check. Kein Gesamtlauf auf Akku.
Ein Dokumentations-Patch ohne passenden Anker wurde vor Änderung abgelehnt,
anschließend korrigiert; keine Daten verloren.

Neue D15-Diagnose, feste Eingaben, frühere Dokumentstände und vollständiger
Arbeitsbaum zusätzlich dauerhaft unter
`C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-D15-Operation-221300/`
gesichert: 503 Dateien / 151.843.659 Bytes, alle Quell-/Kopie-SHA256 gleich.
Originale und frühere Sicherungen bleiben erhalten. Nachgezogene
Abschlussdokumentation separat unter `sicherungsabschluss/` mit Hashmanifest.

### 2026-10-03 — Paket D: kritische Rohdatenprüfung, konkrete Operation statt Blindprobe

**Geändert:** nur Dokumentation. Neuer Bericht
[`D-KRITISCHE-PRUEFUNG-2026-10-03.md`](D-KRITISCHE-PRUEFUNG-2026-10-03.md),
STAND, Übergabe, Ursachen und LEHREN nachgezogen. Alle alten Daten erhalten.
Offline-Auswerter unter TEMP `paket-d-kritische-pruefung-20261003-204600/`.
**Entscheidung:** D12 zuerst gegen Rohspuren/Browserquelle geprüft.
Coverage-Debugliste sichtbar korrigiert (vier/zwei gegenüber echten
16/vier Hintergrundquads). Beim Copy-Zeichendurchgang bereits 780×1688
und 2×; 29.033/29.323 Fehlerpixel abseits innerer senkrechter Quadgrenzen.
Keine pauschale Frühaufnahme-/Naht-Erklärung und keine Rohtextur behauptet.
D15-Picture selbst gelesen: Befehl 26 inverse Innenkante, 79 Befehle
gesamt. Genau diese Operation mit ihrem Clipkontext als nächste
Shader-Ursachenfrage benannt; Zusammenhang noch nicht bewiesen.
**Offen:** D12/D13 starke Pixelursache und trennende GPU-Texturdaten fehlen,
D15 Einzeloperation/Alternative/kalte Startabnahme, D14 geschützt, Z1
ausgelassen, G1 offen. Keine Browserprobe, kein Produktfix oder anderes Paket.
**Nächster Schritt:** nur isolierte D15-Operation aus fester Picture prüfen,
bekannten Shaderhash verlangen, bei fehlender Übereinstimmung beenden;
keine neue D12-Schleife. Gegenprüfung §2a/§2b/§3: Rohdaten statt Bericht,
Abnahme unverändert, keine Aufgabe erledigt. Syntax und Standprüfung grün,
Produktbytehashes gleich, Server HTTP 200, Akku BatteryStatus 1.
Eigene rg-Parameterverwechslung und unnötige Roh-Picture-Base64-Ausgabe
beim Lesen liefern keine Befunde; LEHREN nachgezogen. Kein Commit/Push/Deploy.

Kritische Prüfung, verwendete Eingaben und vollständiger Arbeitsbaum
zusätzlich dauerhaft unter
`C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-Kritische-Pruefung-204600/`
gesichert: 71 Dateien / 400.703.495 Bytes, alle Quell-/Kopie-SHA256 gleich.
Originale bleiben erhalten; Abschlussdokumentation separat unter
`sicherungsabschluss/` mit eigenem Hashmanifest.

### 2026-10-03 — Paket D: begrenzte starke Probe ohne Reproduktion

Zwei benannte historische Fehlerwege, historische D12-Entwurfsquelle,
je ein neuer Browserprozess; keine Produkt- oder Abnahmeänderung.
Konto-Ziel nach 13 ersten Fotos nur ein Kanalwert rot, Korall-Ziel nach
fünf ersten Fotos exakt gleich. Kein instrumentiertes starkes Rot und
damit kein neuer Ursachenbeleg. Rohbilder, DOM, Fotomarken und Quads
erhalten; keine Ein-Pixel-Schleife oder weitere Variante begonnen.
Diagnosewrapper nur unter TEMP, Fortsetzen nach früherem Rot explizit
keine Abnahme. HTML-Attributnormalisierung und überlappende Prozesslaufzeiten
offen dokumentiert; eigenes Ablaufproblem in LEHREN. Akku BatteryStatus 1,
Server HTTP 200. Produktbytehashes unverändert. Gegenprüfung §2a/§2b/§3:
keine Aufgabe erledigt, keine neue Toleranz/Referenz/Maskierung. Nach §6
angehalten; fachliche Prüfung erhaltener Daten als nächster sinnvoller
Schritt, keine weitere Blindprobe. Details oben in
[`D-URSACHEN-2026-10-03.md`](D-URSACHEN-2026-10-03.md).
D12/D13/D15 zurück, D14 geschützt, Z1 ausgelassen, G1 offen. Kein anderes
Paket, keine Version, Commit/Push/Veröffentlichung. Originale erhalten.

Die begrenzte Probe und der Arbeitsbaum sind zusätzlich dauerhaft unter
`C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-Starke-Probe-202831/`
gesichert: 262 Dateien / 158.800.888 Bytes, alle Quell-/Kopie-SHA256 gleich.
Originale erhalten; Abschlussdokumentation separat unter
`sicherungsabschluss/` mit eigenem Manifest.

### 2026-10-03 — Paket D weiter: starke Konto-/Korallpixel offline getrennt

Ein-Pixel-Schleife auf Betreiberauftrag liegen gelassen. Ausschließlich
vorhandene starke Fehler, zwölf Direktfotos, zwei Rundgangkontrollen und
gesicherte grüne DOM-Daten ausgewertet. Server HTTP 200, BatteryStatus 2.
Konto: 70.880 Fehlerpixel unverändert, sechs stärkste geometrisch an
Rundkanten; dennoch nur 59/1.339 stärkere Pixel nahe geprüften Konturen.
1.196/1.339 im Backup-Knopf, viele in dessen Schrift, 1.152 in allen
Kanälen heller. Keine Rundkanten-Erklärung auf den gesamten Fehler übertragen.
Zwölf Direktfotos und beide Rundgangkontrollen vollständig referenzgleich.
Korall: 32 Pixel am unteren Kontolistenrand; zehn Farben ausschließlich
in diesem Block. Keine Ressourcenzuordnung aus späterem grünem DOM behauptet.

Entscheidende Beleglücke: beiden historischen starken roten Bildern fehlt
zeitgleiche DOM-/GPU-Diagnose. Grüne Spuren/Wiedergaben ersetzen sie nicht.
Konkrete nächste Datenanforderung und Zählungen oben in
[`D-URSACHEN-2026-10-03.md`](D-URSACHEN-2026-10-03.md), Auswerter/Ergebnisse
unter TEMP `paket-d-starke-pixel-20261003-200644/`. Keine neue Browserreihe,
kein Verdachtsfix, keine Toleranz oder neue Referenz. Gegenprüfung §2a/§2b/§3:
nur konkrete Ursachenfrage, keine Abnahme oder Erledigung aus Kontrollbildern.
Produktbytehashes erhalten; D12/D13/D15 zurück, D14 geschützt, Z1 ausgelassen,
G1 offen. Paket D nach §6 angehalten; kein Commit/Push/Veröffentlichen.

Neue Offline-Auswertung samt verwendeten Originalbildern, grünen
DOM-Kontrollen und 48 Arbeitsbaumdateien dauerhaft gesichert unter
`C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-Starke-Pixel-200644/`:
116 Dateien / 26.858.870 Bytes, alle Quell-/Kopie-SHA256 gleich. Originale
und frühere Sicherungen erhalten. Abschlussdokumentation separat unter
`sicherungsabschluss/` mit eigenem Manifest. `git diff --check` grün,
beide vollständigen Produkthashes gleich, Server abschließend HTTP 200.

### 2026-10-03 — Paket D weiter: Ein-Pixel-Fehler auch mit unverändertem Vorstand

Auf erneutes „weiter“ Ursachenfrage bewusst begrenzt: Tritt derselbe Fehler
ohne D12-Quellenänderung auf? Zuerst vorhandene PNGs/stand.json-Hashes
zusammengeführt: Vorstand und Entwurf lieferten früher exakt dasselbe
grüne Einstellungs-PNG. Gesicherter Vorstand ist bytegleich zum erhaltenen
Arbeitsbaum; vollständige Quellenhashes im Bericht. Danach nur ein gezielter
strenger Vorstandslauf, ohne Vorab-Fläche und ohne frühere Rasterwiedergaben.
Acht erste Fotos gleich, Einstellungen als neuntes Foto rot: derselbe
einzelne Kanalwert an (546,112); vollständiges PNG bytegleich zum roten
Entwurf. Vorher-/Nachher-DOM, gehaltene Animationen, Viewport und Scroll
jeweils gleich. Originale Belege und vollständiger Fehlerlog erhalten.

Damit tritt die Ein-Pixel-Abweichung ohne D12-Änderung auf; kein Produktfix
daraus begründet. Interner Kanalwertwechsel und starke historische
32-Korall-/70.880-Konto-Fehler ungeklärt; keine Toleranz oder neue Referenz.
Gegenprüfung §2a/§2b/§3: feste Quellenbelege, Assertion schlägt an, keine
Erledigung/Abnahme. Eigener UTF-8-Auswerterfehler sichtbar in LEHREN §15.
[`D12-PIXEL-2026-10-03.md`](D12-PIXEL-2026-10-03.md), Quellenabschnitt,
enthält vollständige SHA256. Produktdateien bytegleich, Server HTTP 200.
D12/D13/D15 zurück, D14 geschützt, Z1 ausgelassen, G1 offen. Paket D bleibt
angehalten; keine Version, kein Commit/Push/Veröffentlichen.

Quellenkontrolle dauerhaft gesichert unter
`C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-Quellenkontrolle-192919/`:
190 Dateien / 105.902.459 Bytes, alle Quell-/Kopie-SHA256 gleich. Beide
Quelldateisätze und alle 48 geänderten/unversionierten Projektdateien enthalten;
Originale und frühere Sicherungen erhalten. Abschlussdokumentation separat
unter `sicherungsabschluss/` mit eigenem Manifest. `git diff --check` grün,
Server abschließend HTTP 200; keine Gesamt- oder Geräteabnahme behauptet.

### 2026-10-03 — Paket D weiter: gezeichnete Quelle des Ein-Pixel-Fehlers

Auf „weiter“ im selben Chat zuerst vorhandene Ressourcen/Quads des roten
Einstellungsfotos ausgewertet. Server 8099 HTTP 200, BatteryStatus 2.
Keine Produktänderung; vollständige app.js/styles.css-Übergabehashes gleich.
Pixelmittelpunkt (546,5;112,5): Hintergrundressource 400 zeichnet, Kopfleiste
endet oberhalb, Ansichts-Pass enthält dort kein Quad. Raster-PNGs entstehen
durch spätere Ebenenwiedergabe; keine Rohkopien dieser GPU-Textur.

Sechs isolierte A/B/A-Reihen mit festen Trace-Hashes: Kopfleiste,
Vorab-Höhe, echte GPU-Kachelhöhe, Vorab-Fläche, Viewportfoto und kurze
Dokumenthöhe. Alle reproduzieren den roten Kanalwert, keine erklärt den
historischen grünen Wert. Vergleich kleinerer Bilder nur diagnostisch;
historische Ganzseitenabnahme unverändert. Danach zwei gezielte App-Läufe:
Original ohne Vorab-Fläche und ohne frühere Rasterwiedergaben beide acht
erste Fotos gleich, neuntes Foto Einstellungen exakt ein Kanalwert rot.
DOM/Animationen/Viewports gleich; sofort vor Konto-Löschen angehalten.

Gegenprüfung §2a/§2b/§3: ausschließlich konkrete D12/D13-Ursachenfrage,
unveränderte Assertion schlägt an, kein erledigter Status oder Produktfix.
Starke historische Fehler und grüne Einstellungs-Spur weiter ungeklärt.
Eigene Diagnoseabbrüche in LEHREN §15 erfasst. Bericht und nächster
Ursachenauftrag: [`D12-PIXEL-2026-10-03.md`](D12-PIXEL-2026-10-03.md).
D12/D13/D15 zurück, D14 geschützt, Z1 ausgelassen, G1 offen. Paket D nach
CODEX-START §6 angehalten; keine Version, kein Commit/Push/Veröffentlichen.

Abschlussprüfung grün: Syntax der neuen Diagnosehilfe, `pruefe_stand.mjs`,
`git diff --check`; beide Produkthashes vollständig gleich, Server HTTP 200.
Alle neuen Belege und 48 geänderten/unversionierten Arbeitsbaumdateien
zusätzlich dauerhaft unter
`C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-Pixel-185851/`:
467 Dateien / 239.073.370 Bytes, sämtliche Quell-/Kopie-SHA256 gleich.
Originale und alte Sicherungen erhalten. Nachgezogene Abschlussdokumentation
separat unter `sicherungsabschluss/` mit eigenem Manifest erhalten.

### 2026-10-03 — Paket D weiter: Kachelbreite eingegrenzt, Vorab-Fläche bleibt rot

Pflichtdateien vollständig gelesen, danach obersten Logbucheintrag,
Übergabe und Ursachenbericht. Alle 43 übernommenen Arbeitsbaumdateien
mit SHA256 und Git-Diff unter TEMP `paket-d-kachelbreite-20261003-175521/`
gesichert. Server 8099 bereits HTTP 200/19.539 Bytes, BatteryStatus 2.
Produktdateien app.js/styles.css behalten die Übergabehashes vollständig.

Zuerst vorhandene grüne/rote D12-Spuren ausgewertet: 2×-Raster im roten
Lauf vor physischer Viewportvergrößerung, im grünen danach. Quellen der
installierten Browserrevision erklären 224 gegenüber 800 Pixel Breite.
Interner Setter und starke historische Fehlerpixel bleiben unbelegt.
Abgeleitete isolierte Proben und gezielte App-Proben nur als Diagnose:
Vorab-Fläche erhält gemessenes DOM/Animationen, 33/34 erste historische
Fotos gleich. Einstellungen 320/dunkel/voll bleibt rot, ein Kanalwert
an (546,112), trotz voller gezeichneter Kachelbreite 640. Sofort angehalten,
Konto-Löschen nicht erreicht. Originale PNGs, Marken, Ressourcen, Quads,
Trace-SHA256 und fehlgeschlagene Ansätze erhalten. Keine Folgefoto-Abnahme.

Gegenprüfung §2a/§2b/§3: neue Dateien betreffen ausschließlich die konkrete
D12/D13-Ursachenfrage; keine Produktkorrektur und kein erledigter Status.
Unveränderte strenge Assertion schlägt an. Keine Gesamt-, Tempo- oder
Geräteabnahme aus gefilterten Proben; angrenzende Zustände bleiben offen.
Eigene Diagnosefehler in LEHREN §5.3/§15 festgehalten. Bericht und nächster
Arbeitsauftrag: [`D12-KACHELBREITE-2026-10-03.md`](D12-KACHELBREITE-2026-10-03.md).
D12/D13/D15 zurück, D14 geschützt, Z1 ausgelassen, G1 offen. Paket D
angehalten; keine Version, kein Commit/Push und keine Veröffentlichung.

Abschlussprüfung: Syntax beider neuen JS-Diagnosehilfen und app.js/sw.js,
`pruefe_stand.mjs`, `git diff --check` grün; beide Produkthashes vollständig
gleich, Server weiterhin HTTP 200. Neue Belege und übernommener Arbeitsbaum
zusätzlich dauerhaft unter
`C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-Kachelbreite-175521/`:
909 Dateien / 570.954.170 Bytes, alle Quell-/Kopie-SHA256 gleich, Originale
erhalten. Abschluss dieser Sicherung separat unter `sicherungsabschluss/`
mit eigenem Manifest, damit vorherige Dokumentkopien erhalten bleiben.

### 2026-10-03 — Übergabe für den nächsten Paket-D-Chat gesichert

Auf Betreiberauftrag eine genaue Fortsetzungshilfe geschrieben:
[`D-UEBERGABE-2026-10-03.md`](D-UEBERGABE-2026-10-03.md). Sie enthält
Lesereihenfolge, Status und Grenzen, vollständige Produkthashes, genaue
rote/grüne Belegpfade, erste konkrete D12-Frage, feste D15-A/B/A-Spuren,
Shaderhash, Werkzeugparameter und Fallen beim erneuten Ausführen.
Kein neuer Produktversuch, keine neue Messung, keine Änderung der Abnahme.

Alle vorhandenen TEMP-Einträge `paket-d*` einschließlich Entwürfen und
abgebrochenen Läufen zusätzlich dauerhaft nach
`C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-Uebergabe/`
kopiert. Dort `temp/` mit ursprünglicher Struktur und `arbeitsbaum/` mit
allen geänderten/unversionierten Projektdateien; dazu Git-Diff, Status,
HEAD und Manifest. **4.848 Dateien / 2.652.609.778 Bytes, alle Quell-/Kopie-
SHA256 gleich.** Originale nicht verschoben oder gelöscht. Die Sicherung
enthält den Stand beim Schreiben der Übergabe; anschließende Dokumentation
dieses Sicherungsabschlusses wird separat unter `abschlussdokumentation/`
mit eigenem Hashmanifest ergänzt. STAND verlinkt diese Übergabe.
D12/D13/D15 bleiben zurück, D14 geschützt, Z1 ausgelassen, G1 offen;
kein Commit, Push oder Veröffentlichen. Keine Paketabschluss-Abnahme.

### 2026-10-03 — Paket D weiter: einzelne Innenkanten-Shaderoperation kalt isoliert

**Erhalten:** Pflichtlektüre und obersten vorherigen Eintrag gelesen;
übernommenen Arbeitsbaum mit Manifest unter
`C:/Users/USER/AppData/Local/Temp/paket-d-fortsetzung-20261003-150412/`
gesichert. Server 8099 bereits HTTP 200, BatteryStatus 2. Keine
Produktänderung, Version, Commit, Push oder Veröffentlichung. Diagnosehilfen
und Dokumentation ergänzt; alle bisherigen Entwürfe, roten Bilder und
abgebrochenen Ausgaben erhalten. D14-Probelauf geschützt, Z1 ausgelassen,
G1 offen. Kein anderes Paket begonnen.

**Bewiesen, D12/D13:** Historische Fehler vollständig ausgezählt:
Korallbereich 32 Pixel bei (520,1814)–(528,1818), exakt gleicher 8×4-
Ausschnitt nur im Nachher-Fehlerort gefunden. Konto-Löschen 70.880 Pixel
bis sieben Kanalstufen, sechs stärkere Punkte lokalisiert. Keine vollständige
Erklärung durch die bisherige ±1-Verlaufprobe. Neue konkrete Mindest-
Kachelhöhenprobe 448 scheitert bei unverändertem gemessenem DOM weiterhin:
29.323 Pixel, tatsächlich 224×448 statt grüner 800×448. Beide Bildmarken
vollständig. Drei gleiche Folgefotos nur Diagnose, kein Gesamtfoto-Erfolg.
Keine Toleranz, Maske, ausgelassene Abnahmestufe oder Fotoaufbau-Korrektur.

**Korrektur, D15:** Die alten LI-/`.view`-Zuordnungen waren numerische
Kandidaten aus getrennten Rasterzählern, kein belegter CPU-/GPU-Auftrag.
Ursachenzuordnung zurückgenommen; alte Berichte erhalten, Werkzeug
kennzeichnet neue Kandidaten und ersetzt keine historischen Ergebnisse.
Spätere DOM-Aufnahme nicht mit zeitgleicher Picture-Liste gleichgesetzt.

**Bewiesen, D15:** Startlisten-Verlauf allein und 56-px-Navigationsschatten
allein lassen den langen kalten Flush bestehen. Vollständige Picture-Spur
mit 128-MiB-Puffer und beiden Marken; neue Ganesh-/ANGLE-Spur liefert
einzelne Compileraufrufe: 91,043-ms-Flush, zehn Shaderkompilierungen
zusammen 80,905 ms. Teuerste einzelne `FillRRectOp`-Kompilierung 24,467 ms.
Nur Navigations-Innenkante entfernt: derselbe Shaderquellhash erscheint
später erneut, Arbeit nur verschoben. Feste kalte A/B/A-Probe, gleiche
Instrumentierung, jeweils frischer Prozess: beide Innenkanten an Navigation
und Startliste entfernen lässt denselben Shader entfallen; Original bringt
ihn zurück. Späte Flushes 94,361/34,959 ms, 24,059 ms, 89,278/35,394 ms.
Gemeinsame Zeichen-/Treiberoperation nun belegt. Weitere Shaderkombinationen
ändern sich ebenfalls; nicht sämtliche Ersparnis einer Operation zugeordnet.
Variante hat weiterhin echte kalte Pausen und verändert sichtbare Kanten.
Kein dritter Produktversuch und keine Produkt-/Geräteabnahme.

**Prüfaufbaufehler:** Fehlende historische boot-raster.json, Snapshot ohne
args.snapshot und Flush vor späterer Bildmarke zunächst falsch vorausgesetzt;
Abbrüche/Teilbelege erhalten und Auswertungen explizit korrigiert. Vollständige
Shadertexte aus Trace-Datei gezielt ausgewertet, nachdem Konsolenausgabe
abgeschnitten wurde. Stand/Version/Syntax und Erhaltungsprüfung siehe
abschließende Prüfnotiz unten; keine breite Produktregression erneut
behauptet, da Produktdateien unverändert sind.

**Ungeklärt / konkreter nächster Schritt:** D12 beide tatsächlichen
Rasterdimensionen mit unverändertem Maßstab und End-Animationsebenen
festhalten; beim ersten starken Korallfehler zeitgleiche vollständige
Quads/Ressourcen sichern. Erst nach Ursachenbeleg Fotoaufbau korrigieren
und sämtliche Zustände streng vergleichen. D15 gespeicherte Innenkanten-
Picture als isolierte feste Grafikprobe pixelgleich mit anderem Zeichenweg
prüfen; kaltes Original/Variante/Original samt Shaderhash und Bildfolge.
Erst danach Produktentwurf mit fester Vorher-Gegenprobe und kompletter
echter kalter Abnahme. Alle Belegpfade und genaue Grenzen im neuesten
Abschnitt [`D-URSACHEN-2026-10-03.md`](D-URSACHEN-2026-10-03.md).
D12/D13/D15 und Paketabschluss bleiben zurück.

**Abschließende Prüfung:** app.js/sw.js, drei JS- und sieben Python-
Diagnosehilfen syntaktisch grün; Stand/Version/CSP/APP_SHELL sowie
`git diff --check` grün. Erhaltungsprüfung: alle 34 übernommenen Dateien
vorhanden und ihre Sicherungs-Hashes unverändert; nur fünf Dokumente und
zwei vorhandene Diagnosehilfen fortgeschrieben. Produktdateien bytegleich;
übrige vorhandene Dateien unverändert. Manifest und
`erhaltungspruefung-fortsetzung.json` im genannten Sicherungsordner.
Server erneut HTTP 200/19.539 Bytes, BatteryStatus 2.

### 2026-10-03 — Paket D im selben Chat fortgesetzt: Rasterkacheln und Animations-Ebenen belegt

**Erhalten:** Alle vorhandenen uncommitteten Änderungen, Entwürfe und Belege
behalten; zusätzliche Sicherung mit Manifest unter
`C:/Users/USER/AppData/Local/Temp/paket-d-weiter-erhaltung-20261003-142449/`.
Server 8099 HTTP 200, BatteryStatus 2. app.js/styles.css behalten SHA256
F27C45E7… und 78C0B553…; keine Produktänderung, Version, Commit, Push oder
Veröffentlichung. Diagnosehilfen ergänzt, keine Foto-Assertion gelockert.

**Bewiesen, D12/D13:** Eine neue detaillierte rote Antwortaufnahme gegen
die bereits vorhandene pixelgleiche Quads-Kontrolle ausgewertet: 41.727
Fehlerpixel, alle 86 DOM-Elemente gleich, vier Animationen beendet.
GPU-Rasterkacheln rot 224×256, grün 800×448, Maßstab beidseits 2×2;
abschließender Pass 52/12 Quads. Hintergrundabweichungen beginnen an den
abweichenden Kachelgrenzen. Isolierter originaler Hintergrundverlauf in
zwei frischen Browserprozessen: gleiches DOM, andere Rasteraufteilung,
40.809 Fehlerpixel bis eine Kanalstufe. Displayliste enthält Dither.
Rasterabhängigkeit dieser Verlaufklasse unabhängig vom Produktentwurf
belegt; keine pauschale Erklärung des alten starken 8×4-Korallfehlers.

Feste Emulations-Viewport-Skala geprüft und verworfen: gleiches gemessenes
DOM und richtige Bildgröße, dennoch 1.243.305 andere Pixel. Wiederherstellen
liefert null Fehlerpixel. Kein neuer Foto-Standard daraus gemacht.
Gezielte Animations-Gegenprobe direkt am ersten Rot auf Feedback:
End-Animationen gehalten → freigegeben → wieder gehalten, gemessenes DOM
gleich; Fehlerpixel 0 → 98 → 0. GPU-Ebenen `.view`/`.ideen-leer` verschwinden
beim Freigeben und werden wieder hergestellt. Einfaches Canceln ändert
selbst das Bild und ist damit ebenfalls kein belegter Aufnahme-Fix.
Ausgefilterte Zustände zählen weiter nicht; keine Gesamtabnahme behauptet.

**Bewiesen, D15:** Alte 88,298-ms-Rasterarbeit über Raster-ID bis LI-Ebene
verfolgt. Zusätzlicher kalter Browser mit derselben gesicherten zweiten
Quelle: 90 echte Bilder, 109,28-ms-Pause, Titelschritt 105,33 in 12,63 ms.
Jetzt 95,788-ms-Flush an `.view`, nicht derselben LI-Ebene. Die konkrete
DOM-Ebene ist deshalb keine belastbare einzelne Ursache. DOM-Ziele,
Raster-Displaylisten und vollständige Bildfolge gesichert. Keine warme
Abnahme, kein dritter Produktversuch. Die einzelne gemeinsame Skia-/
Treiberoperation bleibt ungeklärt.

**Prüfaufbaufehler:** Picture-Kategorien füllten den Trace-Puffer vor den
späten Fotos; deren PNGs/Displaylisten bleiben gültige einzelne Belege,
die späte GPU-Spur ist unvollständig. Vorhandene vollständige grüne
Quads-Spur verwendet. Python-Auswertung zunächst wegen Windows-Codierung,
dann fehlender Marken abgebrochen; beide Logs bewahrt, UTF-8 und vollständige
Vergleichsspur korrigiert. Ein Animationslauf scheitert schon auf Lektionen,
bevor die Antwort-Gegenprobe eingreift; bewahrt, Folgewerkzeug greift nun
gezielt am ersten Rot. Keine dieser Änderungen ist Produktabnahme.

**Offen / nächster konkreter Schritt:** Aufnahmeweg mit unveränderten
End-Animationsebenen und stabiler Rasteraufteilung gegen die gesicherte
rote Aufteilung prüfen; den 8×4-Korallbereich beim ersten Auftreten mit
zugehörigen Ressourcen/Quads sichern. Erst dann Fotoaufbau korrigieren und
alle Zustände streng vor/nach vergleichen. D15 die gemeinsame einzelne
Zeichen-/Treiberoperation isolieren, feste Alt-Gegenprobe und echte kalte
Bildabnahme vor jeder Korrektur. Belegpfade und genaue Ergebnisse in
[`D-URSACHEN-2026-10-03.md`](D-URSACHEN-2026-10-03.md), erster Abschnitt.
Syntax der fünf berührten/neuen JS-Hilfen, Stand/Version/CSP/APP_SHELL
und `git diff --check` grün. D12/D13/D15 zurück, D14-Probelauf geschützt,
Z1 ausgelassen, G1 offen; kein anderes Paket und kein Paketabschluss.

### 2026-10-03 — Paket D: rote/grüne Daten verglichen; Aufnahme- und GPU-Lücken konkretisiert

**Geändert:** AGENTS.md, STAND.md, CLAUDE.md, LEHREN.md und CODEX-START.md
vollständig gelesen, danach den vorher obersten Eintrag; Aufgaben,
Entscheidungen, Zyklus-Auftrag, BEW-12–15 und Großplan §2a/2b/3 gelesen.
Alle 20 anfänglich geänderten/unversionierten Dateien mit SHA256-Manifest
gesichert: `C:/Users/USER/AppData/Local/Temp/paket-d-analyse-20261003-134349/`.
Server 8099 bereits HTTP 200/19.539 Bytes, kein Neustart nötig; BatteryStatus 2.
Kein Pull und keine Produktänderung. Neue Offline-Auswertungen und
Diagnosehilfen ausschließlich unter `plan/werkzeuge/pruefstand/`.
Die beiden vorhandenen Instrumentierungswerkzeuge können optional über
`D_GPU_KATEGORIEN` ausführlichere Spuren aufnehmen; Standardablauf und
Foto-Assertion unverändert. Beweisbericht: [`D-URSACHEN-2026-10-03.md`](D-URSACHEN-2026-10-03.md).

**Bewiesen, D12/D13:** Die beiden gesicherten instrumentierten roten
Aufnahmen gegen die bereits vorhandene pixelgleiche Kontrolle ausgewertet.
DOM/Stile/Geometrien/Pseudoelemente und normalisierter DOMSnapshot mit
Malreihenfolge gleich; Rundenende alle 60 Elemente gleich, alle sieben
Animationen beendet. Ebenenabmessungen/Transformationen gleich; ein
Malzähler 20/22. Während der Fotoaufnahme Rasterbereich 390×844 →
780×1688 → 390×844; unterschiedliche interne Renderpässe:
Rundenende rot 49/grün 14 Quads, Kartensätze rot zusätzliche 4/4/47,
grün 9. Das belegt den Eingriff der Aufnahme in den Grafikaufbau,
aber nicht die einzelne Operation hinter den Fehlerpixeln.

Neue Frage native Pixelskala 2: ausschließlich Diagnose-Browser-Flag,
keine Produktänderung. Gegenprobe bereits auf Lernen rot, 24.535 Pixel,
maximal 217/220/222 Kanalstufen; drei Folgefotos gleich zum Fehler.
Diese Variante ist kein geeigneter Prüfaufbau-Fix; vollständig bewahrt.
Neue Frage konkrete Quads/Skia-Operation: erweiterte Detailspur des
unveränderten D12-Entwurfs auf dem gezielten 390/hell/bewegt/voll-Weg.
16/16 Fotos gleich; ausführliche grüne Spur gesichert. Kein detailliertes
rotes Bild in diesem Lauf. Alle 35 ausgefilterten Zustände null Fotos;
keine Gesamtfoto-Abnahme. Nicht denselben Gesamtvergleich erneut gestartet,
weil die vom Betreiber verlangte Ursachenklärung vor Korrektur noch fehlt.

**Bewiesen, D15:** Alte kalte GPU-Aufgaben offline zerlegt: 85,678 ms
Raster-Endarbeit enthält 85,666 ms Flush; Cache-Aufrufe selbst nur
Mikrosekunden, dazu ANGLE-Arbeit bis 21,899 ms. Shader-Kompilierung damit
nicht direkt bewiesen. Neue Frage nach benannter Shader-/Treiberoperation:
unveränderte gesicherte zweite Quelle, neuer Browser, erweiterte Grafikspur.
Kalt 92 echte Bilder, warme Kontexte 104/104. Kalt Raster-Endarbeit
88,298/35,563 ms, Renderpass 43,185 ms; Bildpause 158,42 ms und sichtbarer
Titelschritt 91,62. Warme Titelschritte höchstens 13,97/14,04, keine
Bildpause >50 ms. Diesmal kein rAF-Deckkraftschritt >0,2 trotz roter
echter Bildfolge. Keine isolierte Deckkraft aus Titelhelligkeit ableiten.
Auch Detailspur benennt innerhalb der 88,298 ms nur den 88,289-ms-Flush,
keinen Shader und kein CSS-Ziel. Kein dritter Produktfix, keine kalte Abnahme.

**Offen:** D12 genaue Raster-/Mischoperation und historische Konto-/8×4-
Fehlerpixel; D13 wartet auf belastbaren Gesamtvergleich. D15 Zuordnung
des kalten Flushs zu einer konkreten Zeichenoperation plus kalte Abnahme;
Gerätewirkung offen. D14 wegen Text-Probelauf zurück. D1–D11 erhalten,
Z1 ausgelassen, G1 offen. Keine Version, kein Commit/Push/Deploy.

**Nächster Schritt:** D12 die jetzt erfassten Detaildaten am ersten roten
Aufnahmebild mit der vorhandenen grünen Detailspur vergleichen und die
abweichende Operation durch feste Aufnahme-Gegenprobe isolieren; erst
dann Prüfaufbau korrigieren und alle Fotozustände prüfen. D15 die teure
Rasterressource mit DOM-Ziel/Zeichenoperation verbinden, diese gezielt
unter wirklich kalten Browserstarts isolieren; erst bei Beleg minimal
korrigieren. Genaue Pfade, Grenzen und Gegenproben im Beweisbericht.

**Erhaltung/Prüfung:** Alle 20 Anfangsdateien vorhanden; 14 bytegleich.
Nur die vier nachgezogenen Plandateien und die zwei optional erweiterten
Diagnosewerkzeuge unterscheiden sich von der Anfangssicherung; Originale
dort erhalten. Produktdateien app.js/styles.css exakt mit den bisherigen
SHA256-Werten f27c45e7…d60ebf und 78c0b553…40cdea. Manifest der Nachprüfung
`paket-d-analyse-20261003-134349/erhaltung-nachher.json` im TEMP.
JavaScript-Syntax der vier berührten/neuen JS-Hilfen und AST-Syntax aller
neun Python-Auswertungen grün. Standprüfung mit Version/CSP/APP_SHELL/
CSS-Struktur und `git diff --check` grün. Alle vollständigen Diagnose-
Ausgaben gelesen; keine Testgrenze verändert. Abschließend HTTP
200/19.539 Bytes und BatteryStatus 2. §5-Gesamtabnahme/Affe nicht erfüllt
und nicht als gelaufen eingetragen; kein Paketabschluss.

### 2026-10-03 — Paket D: erstes instrumentiertes Fehlerfoto gesichert; D15-Bildsprung bestätigt

**Geändert:** AGENTS.md, STAND.md, CLAUDE.md, LEHREN.md und CODEX-START.md
vollständig gelesen, danach den vorher obersten Eintrag. Aufgaben,
Entscheidungen, Zyklus-Auftrag, BEW-12–15 und Großplan §2a/2b/3 gelesen.
Alle anfänglich geänderten und unversionierten Dateien mit SHA256-Manifest
gesichert: `C:/Users/USER/AppData/Local/Temp/paket-d-instrumentiert-20261003-131651/`.
Kein Pull und keine Produktänderung. Server 8099 HTTP 200/19.539 Bytes,
Neustart nicht nötig; BatteryStatus 2. Syntax und Standprüfung grün.

`plan/werkzeuge/pruefstand/x_paket_d_fotos.js` hat jetzt eine optionale
Diagnose über `D_FOTO_DIAGNOSE`: dieselbe Reihenfolge, Stabilisierung und
unveränderte strenge Foto-Assertion. Das neue `x_d_foto_instrument.js`
sichert vor/nach jedem Foto DOM, berechnete Stile, Pseudoelemente,
Geometrie, Animationen und DOMSnapshot samt Malreihenfolge. Durchgehende
GPU-/Compositor-/Hauptthread-Spur und Ebenen bleiben auch bei Rot erhalten.
Drei Folgefotos nach Rot dienen ausschließlich der Diagnose; sie ersetzen
nie das erste Fehlerfoto oder die fehlgeschlagene Assertion.
Auswertung: `x_d_foto_auswerten.py` und `x_d15_spuren_auswerten.py`.
Alle Werkzeuge liegen unter dem Hosting-ausgeschlossenen `plan/`.

**D12/D13:** Ungefilterten gesamten Rundgang mit gesichertem D12-Entwurf
gestartet. Erste 15 Fotos exakt gleich; beim 16. Foto gemäß §6 angehalten:
`390-hell-bewegt-voll-ende`, 77.992 verschiedene RGB-Pixel,
Bereich (0,0)–(780,1056), maximal R/G/B 1/2/1 Kanalstufen Unterschied.
Erstes Fehlerbild, Vorher-/Nachher-DOM, Animationen, Ebenen und GPU-Spur
gesichert unter `paket-d-fotos/d12-20261003-stand1/instrumentiert-20261003-1319/`
im TEMP. Vollständiges Log: `paket-d-foto-instrumentiert-20261003-1319.log`.
Alle sieben erfassten Animationen am Fehlerfoto sind beendet.

Gezielte Kontrolle mit der unveränderten gesicherten Ausgangsquelle und
dem gleichen echten Weg 390/hell/bewegt/voll scheitert nach neun gleichen
Fotos auf `einst-kartensaetze`: 20.283 Pixel, Bereich (0,112)–(780,911),
maximal eine Kanalstufe. Drei direkt anschließende Bilder sind jeweils
pixelgleich zum historischen Vorher-Bild. Vor/nach Screenshot sind alle
erfassten Geometrien und berechneten Stile identisch; einzig die HTML-
Serialisierung des verborgenen Importfelds wechselt von `display:none`
zu `display: none;`. Die Seitenanimation ist schon vor dem Foto beendet.
Auch Ausgangsquelle kann somit ein transient abweichendes Foto liefern.
Das erklärt noch nicht die historischen Konto-/Einstellungen-Fehlerpixel.
Keinen Messfehler oder bestimmten GPU-Mechanismus als Ursache behauptet.
Kontrollen und Trace: `instrumentiert-vorstand-20261003-1325/` im gleichen
Foto-Verzeichnis, Log `paket-d-foto-vorstand-20261003-1325.log` im TEMP.

Gezielter zweiter Lauf desselben unveränderten D12-Entwurfs und Wegs:
alle 16 Fotos 390/hell/bewegt/voll exakt gleich. Erfasstes DOM vor dem
Rundenende identisch zum ersten roten Lauf. Dies ist eine gezielte Kontrolle,
keine Gesamtfoto-Abnahme. Daten `instrumentiert-entwurf-kontrolle-20261003-1331/`,
Log `paket-d-foto-entwurf-kontrolle-20261003-1331.log` im TEMP.
Keine Toleranz, Maske, Testlöschung oder zusätzliche Produktänderung.
D12/D13 bleiben zurück; den D13-Entwurf nicht wieder eingebaut.

**D15:** Gesicherte drei Bildfolgen und Traces aus
`paket-d-ursachen-messung-1791025838429/0/`, `/1/`, `/2/` erneut ausgewertet,
ohne neue Browser-/Produktversuche. Zeitachsen über die gesicherte
Performance-Metrik NavigationStart und timeOrigin verbunden. Kalt:
GPU-Rasterung beginnt bei 1192,8 ms und dauert 85,7 ms (umgebende
GPU-Aufgabe 86,5 ms), Renderdurchgang bei 1297,5 ms dauert 45,6 ms,
weitere Rasterung bei 1351,5 ms dauert 36,4 ms. Echte Browserbilder haben
92,6/71,1 ms Abstand; Titel „Dein Start“ bleibt dabei noch dunkel.
Zwischen Bildern 61/62 steigt dessen gemittelte Helligkeit von 31,35
auf 122,88 über 11,0 ms. Das ist ein sichtbarer Aufholsprung, keine bloße
rAF-Abtastlücke. rAF derselben kalten Quelle zeigt weiterhin 116,5 ms
Lücke und Deckkraftschritt 0,4161. Warme Kontrollen haben keine Bildpausen
über 50 ms; größter Titelschritt im gleichen Zeitfenster jeweils 14,04.
Zusammengesetzte Titelhelligkeit ist keine isolierte Elementdeckkraft und
keine kalte Abnahme. Keine Aussage über Shader-Ursache oder iOS-Wirkung.
Auswertung mit allen Einzelwerten:
`C:/Users/USER/AppData/Local/Temp/paket-d15-auswertung-20261003-1328/`,
vollständige Ausgabe `paket-d15-auswertung-20261003-1328.log` im TEMP.
Erste Auswertung ebenfalls erhalten (`paket-d15-auswertung-20261003-1322/`).
Kein dritter Verdachts-Fix nach den zwei gescheiterten Produktversuchen.

**Entscheidung/Gegenprüfung:** Foto-Assertion bleibt strikt und rot;
gezielte grüne Folgefotos erfüllen BEW-12 nicht. Zeitgleiche Daten der
neuen Fehlerbilder sind gesichert; historische Herkunft bleibt offen.
BEW-15 gegen echte Bilder und GPU-Spuren gelesen: warme Kontrollen
ersetzen keine kalte Startabnahme. D14 bleibt wegen geschütztem Text-
Probelauf zurück, D1–D11 erhalten. Z1 ausgelassen, G1 offen.
Keine erfüllte §5-Gesamtabnahme, keine Version, kein Commit/Push/Deploy.

**Offen:** D12-Gesamtfotovergleich und Ursache der historischen Abweichung,
darauf wartend D13. D15 kalte Startabnahme und gezielte Behebung des
nachgewiesenen Grafikaufbaus; Gerätewirkung offen. D14 erst nach Probelauf.

**Erhaltung/Prüfung:** Alle 17 Anfangsdateien bleiben vorhanden; außer den
vier nachgezogenen Plandateien und dem optional instrumentierten
Fotowerkzeug bytegleich zur Anfangssicherung. app.js SHA256
`f27c45e7c7f34959dbc5a205daab1a3996801899c6ee21128e32195001d60ebf`,
styles.css SHA256
`78c0b553cf62855e0edc07b2b15746198432d9ea52708647e8546171ce40cdea`.
Neue JavaScript-/Python-Hilfsquellen syntaktisch geprüft; Standprüfung
einschließlich Version/CSP/APP_SHELL und `git diff --check` grün.
Gefilterter Kontrolllauf beendet, vollständige Ausgabe gelesen; die
35 ausgeschlossenen Zustände haben keine Fotos und zählen nicht als Abnahme.
Server abschließend HTTP 200/19.539 Bytes, BatteryStatus 2.

**Nächster Schritt:** Gesicherte D12-Fehlerbilder samt DOM-/Animations-/GPU-
Spuren gegen die identischen grünen Kontrollen auswerten, bevor der
Foto-Prüfaufbau geändert wird. D15 nur am belegten Grafikaufbau weiter
untersuchen; keine dritte Verdachtsänderung. Paketabschluss bleibt gesperrt.

### 2026-10-03 — Paket D: Foto-Kontrollen erhalten; kalten Grafikaufbau bei D15 eingegrenzt

**Geändert:** AGENTS.md, STAND.md, CLAUDE.md, LEHREN.md und CODEX-START.md
vollständig gelesen, danach den vorher obersten Eintrag; Aufgaben,
Entscheidungen, Zyklus-Auftrag, BEW-12–15 und Großplan §2a/2b/3 geprüft.
Alle geänderten und unversionierten Dateien vor der ersten Änderung kopiert:
`C:/Users/USER/AppData/Local/Temp/paket-d-ursachen-20261003-125845/`.
Kein Pull und keine Produktänderung. Server 8099 bereits HTTP 200,
19.539 Bytes; Neustart unnötig. BatteryStatus 2. Syntax und Standprüfung grün.
Neue Diagnosewerkzeuge: `plan/werkzeuge/pruefstand/x_d_ursachen.js`,
`x_d_bilddaten.py` und `x_d15_kalibrierung.js` im selben Ordner.

**D12/D13:** Historische RGB-Differenzen erneut untersucht und verstärkt
abgebildet. Konto-löschen: 70.880 Pixel, höchstens sieben Kanalstufen,
über Schatten-/Textbereiche verteilt. Einstellungen: weiterhin genau
8×4 Pixel bei (520,1814), korallfarbenes Rechteck an der Unterkante der
Kontoliste. Keine passende sichtbare DOM-Fläche in den neuen Kontrollen;
dies beweist die Herkunft im historischen Fehlerbild nicht.
Zwei Kontrollfolgen mit beiden gesicherten D12-Quellen liefern insgesamt
28 pixelgleiche Bilder, einschließlich Wiederholungen und Fokus-Aufhebung.
Die zweite Folge enthält auch die Zwischenfotos des ursprünglichen Wegs.
Alle neuen Einstellungen-Bilder sind mit dem alten Vorher-Bild pixelgleich;
auch der unveränderte originale 390/dunkel/bewegt/leer-Rundgang vollständig
grün. Vollständige Ausgabe gelesen. Kein grüner Gesamtfotovergleich und
keine nachgewiesene Ursache der historischen Abweichung; D12/D13 bleiben
zurück. Keine PNG-/Pixel-Toleranz, kein Maskieren, kein weiterer Entwurf.

Kontrolldaten und Bilder:
`C:/Users/USER/AppData/Local/Temp/paket-d-ursachen-messung-1791025271648/`
und `paket-d-ursachen-messung-1791025479009/` im selben TEMP-Ordner.
Originaler Kontrollrundgang:
`paket-d-fotos/d12-20261003-stand1/ursache-kontrolle-20261003-1320/`.
Frühere vor/nach-Bilder und Entwürfe unangetastet.

**D15:** Ausschließlich den gesicherten zweiten Entwurf durch Quellenumleitung
gemessen. Drei erste Diagnoseläufe sichern 92/91/94 echte Browserbilder,
rAF-Werte und Traces. Zeitursprung ab dem zweiten Lauf mitgesichert.
Korrektur der ersten Interpretation: Ein rAF-Loch ist keine vollständige
Bildfolge; die echten Browserbilder enthalten ebenfalls Pausen. Deshalb
die frühere rote Abnahme nicht allein als Abtastfehler erklären.
Die vollständigere Spur enthält zusätzlich Hauptthread-/GPU-Aufgaben.
Sie zeigt 25,4 ms Layout, 87,8 ms GPU-Rasterung und 43,9 ms für einen
GPU-Renderdurchgang beim ersten Zeichnen der Folgeseite.

Kontrollierter Nachlauf: **identische gesicherte Quelle, gleicher Browser**,
drei frische Kontexte nacheinander. Kalt: 95 Browserbilder, Fade-rAF-Lücke
116,5 ms mit Deckkraft 0,0594107 auf 0,475482; GPU-Rasterung 86,5 ms,
Renderdurchgang 45,6 ms. Zwei anschließende warme Kontrollen: 105/104 Bilder,
keine Fade-rAF-Lücke über 50 ms und keine dieser GPU-Aufgaben über 20 ms.
Das grenzt den kalten Grafikaufbau als Ursache ein. Die übrige Quelle und
der Messaufbau sind gleich. Keine warme Kontrolle ersetzt die vorgeschriebene
kalte Startabnahme. Keine vollständige Ruckelfreiheit oder iOS-Wirkung behauptet.
Unabhängige lineare Kontrollfläche mit gleicher 280-ms-Dauer und pausiertem
Start: vier Läufe, maximaler Bildabstand 20,5/17/19,4/20,5 ms, höchster
Deckkraftschritt jeweils unter 0,061; Grenze 0,2 unverändert.

Spuren, Bilder und Zeitdaten:
`C:/Users/USER/AppData/Local/Temp/paket-d-ursachen-messung-1791025309661/`,
`paket-d-ursachen-messung-1791025525860/`,
`paket-d-ursachen-messung-1791025760604/` sowie der kontrollierte Dreierlauf
`paket-d-ursachen-messung-1791025838429/0/`, `/1/`, `/2/` im selben TEMP.
Unabhängige Kontrolle: `paket-d15-kalibrierung-1791025703848/`.

**Entscheidung/Gegenprüfung:** Befundabnahmen gegen die Diagnose gelesen:
Kontrollbilder erfüllen noch nicht den D12-Gesamtvergleich; eine rAF-Liste
ersetzt keine D15-Bildfolge. Alte Entwürfe nur gelesen/umgeleitet, nicht
erneut ins Produkt eingebaut. Nach zwei gescheiterten Produktversuchen
kein weiterer Verdachts-Fix. D14 bleibt wegen des geschützten Text-Probelaufs
zurück. D1–D11 erhalten. Keine §5-Gesamtabnahme, Version, Commit, Push oder
Veröffentlichung; Z1 ausgelassen, G1 offen. LEHREN §5.3/§15 ergänzt.

**Offen:** Historische D12-Fotoabweichung ursächlich nicht belegt, deshalb
D13 nicht abgenommen. D15 braucht eine belastbare kalte Bildfolge und eine
Behebung am nachgewiesenen Grafikaufbau; Gerätewirkung bleibt offen.
D14 erst nach dem Probelauf. Paketabschluss nach §3–§7 nicht erfüllt.

**Erhaltung:** app.js SHA256
`f27c45e7c7f34959dbc5a205daab1a3996801899c6ee21128e32195001d60ebf`,
styles.css SHA256
`78c0b553cf62855e0edc07b2b15746198432d9ea52708647e8546171ce40cdea`,
beide wie vor dieser Fortsetzung. Alle Anfangsdateien vorhanden und außer
den ausdrücklich nachgezogenen Plandateien bytegleich. Keine Testgrenze geändert.

**Nächster Schritt:** D12 im instrumentierten gesamten Foto-Rundgang mit
DOM-/Animations-/GPU-Daten beim ersten abweichenden Bild fassen; erst danach
D13. Bei D15 kalten Grafikaufbau gezielt prüfen, keinen dritten Verdachts-Fix.

### 2026-10-03 — Paket D erneut fortgesetzt; rote Foto-/Startabnahme verhindert Abschluss

**Geändert:** Vorhandenen Arbeitsbaum und alle früheren Belege erhalten.
AGENTS.md und CODEX-START.md vollständig, dazu STAND, CLAUDE, LEHREN,
Zyklus-Auftrag, Aufgaben, Entscheidungen, BEW-12–15 und Großplan §2a/2b/3
gelesen. Kein Pull in den ausdrücklich zu erhaltenden Arbeitsbaum.
Anfangssicherung `%TEMP%/paket-d-fortsetzung-20261003/`.
Server 8099 bereits erreichbar: HTTP 200, 19.539 Bytes; kein Neustart nötig.
BatteryStatus 2. Syntax und Standprüfung vor der Produktänderung grün.

**D12:** Gesicherten früheren Entwurf über Quellenumleitung geprüft.
Zwölf direkte Konto-löschen-Fotos aus je zwei Besuchen beider Quellen
pixelgleich; sämtliche berechneten Stile und Elementgeometrien gleich.
Diagnosequelle `plan/werkzeuge/pruefstand/x_d12_diagnose.js`, Daten und Bilder
`%TEMP%/paket-d-d12-diagnose-20261003/`. Zusätzlich den tatsächlichen
Foto-Rundgang 320/dunkel/bewegt/voll gegen die alten Vorher-Fotos geprüft:
unveränderte Quelle und D12-Entwurf jeweils vollständig grün.
Diese Kontrollen erklären die ursprünglichen 70.880 abweichenden Pixel
noch nicht; keine pauschale Messfehlerbehauptung.
Ganzer Vergleich mit demselben D12-Entwurf danach erneut rot, diesmal
`390-dunkel-bewegt-leer-einstellungen`: Unterschied innerhalb (520,1814)
bis (528,1818), RGB-Maxima 219/141/128, identische Bildgröße 780×2198.
Pixel und Ausschnitt angesehen; kein bloßer Unterschied der PNG-Kodierung.
Ursache ungeklärt. Lauf endet gemäß §6, kein grüner Gesamtfotovergleich.
Neue Fotos bleiben unter `%TEMP%/paket-d-fotos/d12-20261003-stand1/`
in `kontrolle-unveraendert`, `kontrolle-entwurf`, `nach-fortsetzung`.
Frühere `vor`-/`nach`-Ordner unverändert; keine Toleranz hinzugefügt.

**D13:** Entwurf der vorgeschriebenen fünf Dauern und beiden Kurven mit
`plan/werkzeuge/d13_tokenleiter.mjs` erstellt: 136 Deklarationen umgestellt,
15 statt 111 rohe Zeitangaben. Sonderzeiten: reduzierte Bewegung,
Kartendrehungen, Halte-Knöpfe und Ladeschleifen. Verzögerungen und an den
Plan-Aufbau gekoppelte Zeiten bleiben exakt; alte Token bleiben definiert.
Text-Probelauf ab `.text-kopf` bytegleich. Struktur-/Syntax-/Standprüfung
grün, D13-Umfeldmatrix 24/24 grün, vollständige Ausgabe gelesen.
Noch keine Abnahme: belastbarer Gesamtfotovergleich fehlt; Entwurf
wird bewahrt und nicht im Produkt behalten. Kein Token-Grenzwert gelockert.

**D14:** Befund erneut am aktuellen Code gelesen. Die angeblichen
Rechtsseiten-Schriften 1,15/1,35/1,1/0,85 rem gehören weiterhin zu
`.text-kopf`, `.text-buehne__zeile`, `.text-buehne__wahl` und
`.texte-lernen__satz`. Die vollständige Schrift-Token-Abnahme widerspricht
CODEX-START §7 (Text-Probelauf bis 29.10. unverändert). Keine Text-Stile
geändert, keine vollständige D14-Erledigung behauptet.

**D15:** Zweiter Produktversuch auf Grundlage des gesicherten ersten
Entwurfs: Folgeseiten-Fade zunächst pausiert, Stil im rAF hergestellt,
im nächsten rAF gestartet. Dauer weiterhin aus berechnetem Boot-CSS.
Bildfolge erneut rot: Deckkraft 0,237793 bei 1262,7 ms, 0,832793 bei
1429,3 ms, Sprung 0,595 über unveränderter Grenze 0,2.
Nach zwei gescheiterten Produktversuchen gemäß §6 zurückgenommen.
Zweiter Entwurf `%TEMP%/paket-d-d15-zweiter-versuch-20261003/`;
gemeinsamer D12-/D13-Entwurf samt Hilfsquellen
`%TEMP%/paket-d-d12-d13-fortsetzung-abgelehnt-20261003/`.
Keine Behauptung über eine echte iOS-Bildfolge oder die Ursache der Pause.

**Entscheidung:** Rote bzw. nicht erfüllte Abnahmen verhindern den
Paketabschluss. Nur eigene neue Produktversuche zurücknehmen; D1–D11 und
alle schon vorhandenen Dateien unverändert erhalten. Keine Version,
kein Commit, Push oder Deploy. Keine neue Aufgabe/Paket begonnen.
Z1 ausgelassen, G1 offen. LEHREN §15 um die eigenen Befunde ergänzt.

**Offen:** D12-/D13-Gesamtfotovergleich, D14 nach geschütztem Probelauf,
D15 nach zwei gescheiterten Versuchen. §5-Gesamtlauf/Affe und vollständige
Commit-Checkliste sind deshalb nicht als bestanden eingetragen.

**Erhaltung abschließend geprüft:** app.js SHA256
`f27c45e7c7f34959dbc5a205daab1a3996801899c6ee21128e32195001d60ebf`,
styles.css SHA256
`78c0b553cf62855e0edc07b2b15746198432d9ea52708647e8546171ce40cdea`,
jeweils exakt wie die Anfangssicherung dieser Fortsetzung.
Produkt- und Hilfsquellen-Syntax, Standprüfung einschließlich Version/CSP/
APP_SHELL/CSS-Struktur sowie `git diff --check` grün. Alle zu Beginn
geänderten/unversionierten Dateien bleiben vorhanden; neue Hilfsquellen
bleiben ebenfalls erhalten. Keine vorhandene Testgrenze verändert.

**Nächster Schritt:** D12-/D13-Fotoprüfaufbau ursächlich klären und D15
gegen tatsächliche Bildfolge prüfen; erst bei grüner Abnahme Paket D
abschließen. D14-Sperre respektieren, keine Veröffentlichung.

### 2026-10-03 — Paket D fortgesetzt; D12–D15 zurück, Abschluss angehalten

**Geändert:** Alle abgenommenen D1–D9-/D11-Änderungen und sämtliche anderen
uncommitteten Dateien erhalten. Nur die eigenen, nicht abgenommenen
D12-/D15-Versuche aus der vorher gesicherten D11-Fassung zurückgenommen.
Abgelehnte Entwürfe unverändert unter `%TEMP%/paket-d-d12-abgelehnt-20261003/`
und `%TEMP%/paket-d-d15-abgelehnt-20261003/` bewahrt; ihre Ausgangsfassung
unter `%TEMP%/paket-d-d12-vor-20261003/`. Aufgabenliste und Stand nachgezogen.

**Entscheidung:** CODEX-START §6: keine ungeklärte rote Abnahme als fertig
melden. D12-Fotovergleich an `320-dunkel-bewegt-voll-einst-konto-loeschen`
rot. PNGs angesehen und RGBA-Daten geprüft: 70.880 abweichende Bildpunkte,
maximal 7 Kanalstufen, also keine bloße PNG-Komprimierungsabweichung.
Ursache nicht belegt; sämtliche 460 Vorher-Bilder und vorhandenen Nachher-
Bilder unter `%TEMP%/paket-d-fotos/d12-20261003-stand1/` bleiben erhalten.
D13-Gegenprobe gegen festen Commit 50d15ce ebenfalls rot: 111 rohe Zeiten.
Vorgeschriebenen Fotovergleich nicht durch Toleranzen ersetzt; solange dessen
Prüfaufbau ungeklärt ist, keine breite mechanische Umstellung begonnen.
D14-Beleg nachgelesen: Die als Rechtsseiten genannten Größen stehen im
Textlernen-Abschnitt. Vorschlag und geschützter Probelauf widersprechen
sich; kein Umbau und keine behauptete vollständige Token-Abnahme.

**D15:** Feste Gegenprobe 50d15ce rot: CSS 320 ms, Timer 280 ms.
Erster Fix las die CSS-Dauer für beide Startwege und blendete die Folgeseite
ab 0 ein. Dauer-Abnahme grün, Bildfolge rot (Deckkraft-Sprung 0,59).
Diagnostischer Nachlauf desselben unveränderten Fixes: 0,0596 → 0,6542
zwischen 1210,8 und 1377,3 ms. Dieser Nachlauf ist kein zweiter Produktfix;
er belegt keine Ursache und keine tatsächliche iOS-Bildfolge. Assertion
nur um die fehlschlagenden Messpaare ergänzt, Grenze 0,2 unverändert.
Eigenen Versuch gemäß §4.6/§6 zurückgenommen; D15 nicht fertig.

**Offen:** D12–D15 zurück; Gegenprüfung/Paketabschluss einschließlich
Gesamtlauf, Affe, Version, Commit und Push noch offen. Netzteil weiterhin
BatteryStatus 2/95 %. Unabhängige Server-Probe erneut HTTP 200/19.539 Bytes.
Z1 ausgelassen, G1 offen, Text-Probelauf unverändert. Kein Deploy.

**Erhaltung geprüft:** app.js und styles.css nach beiden Rücknahmen per
SHA256 exakt identisch mit der gesicherten, lokal abgenommenen D11-Fassung.
Syntax beider Produktdateien und beider neuer Prüfdateien grün;
Standprüfung einschließlich CSS-Struktur, Version/CSP/APP_SHELL grün,
`git diff --check` ohne Fund. Kein vorhandener Regressionstest entfernt,
keine Messgrenze gelockert. Die neuen D12/D13/D15-Gegenproben bleiben
absichtlich rot, solange ihre Aufgaben zurückgestellt sind.

**Gegenprüfung (Zwischenstand, kein Paketabschluss):** Vollständigen aktuellen
Produkt-Diff sowie Standprüfer, Wrapper, a11y-Erweiterung und LEHREN-Diff
gelesen und mit BEW-1–BEW-15 abgeglichen. D1 beendet gehaltene Animationen;
D2 startet nur in aktiver Maus-Randzone; D3 entfernt die verwaiste Klammer;
D4 reserviert Haken; D5 entfernt nur Modus-Aufleuchten; D6 zeigt Aktionen
ohne Verzögerung; D7 merkt nur Besuche im RAM; D8 berücksichtigt reduzierte
Bewegung; D9 erhält den normalen Reiter-Klick und entfernt seine inerte
Bildkopie; D10 wurde nicht doppelt gebaut; D11 entfernt nur die erfasste
alte Meldung. Keine Lernregel, Datenstruktur oder Cloud-Regel geändert.
Die volle §5-/LEHREN-§14-Abnahme ist wegen der offenen roten Abnahmen
ausdrücklich nicht als erfüllt eingetragen.

**Nächster Schritt:** Nur Paket D fortsetzen: zuerst zurückgestellte
Foto-Abnahme D12/D13 ursächlich klären, D14-Befund abgrenzen, D15-Bildfolge
belegen und abnehmen. Vorhandenen Arbeitsbaum und alle Belege erhalten.

### 2026-10-03 — Paket D ausdrücklich fortgesetzt, Server wieder startklar

**Geändert:** Vorhandenen D1-Entwurf und alle uncommitteten Dateien erhalten.
Lokalen Python-http.server-Prozess 19776 beendet und denselben Server auf
127.0.0.1:8099 aus dem Repo neu gestartet (PID 2612, verborgen).
Serverausgaben unter `%TEMP%/paket-d-server-20261003/`.

**Entscheidung:** Betreiber beauftragt Server-Neustart und anschließend
„D weiter“. Deshalb vorhandenen Paket-D-Stand fortsetzen, nicht verwerfen
oder erneut pullen. Kombinierter Neustartbefehl von Werkzeugrichtlinie
abgelehnt; eng begrenztes Stoppen des zuvor identifizierten PID und eigener
Serverstart getrennt erfolgreich. Unabhängige HTTP-Probe: 200, 19.539 Bytes,
`app.js?v=3.18.13` vorhanden. Syntax und Standprüfung grün. D1-Abnahme:
32 Zustände (390/320/820/1440, leer/voll, hell/dunkel, bewegt/ruhig), je
Knopf/Escape/Hintergrund/Bestätigungsdialog grün. Regression läuft.

**Offen:** D12–D15; Z1 ausgelassen,
G1 offen, keine Veröffentlichung. Abschluss erst nach § 5.

**D1-Abnahme nachgereicht:** Dialogtimer, Kartenblatt (Handy/klein/iPad,
Fehler, Duplikat, Entwurf, Bearbeiten/Löschen), Kontodialog, Sprung auf vier
Geräten (alle 0 px), Kontrast (0 Funde) und a11y (0 Funde) vollständig gelesen,
grün. Ausgaben `%TEMP%/paket-d-einzel-20261003/D1-*.log`.
D1 und doppelte C16 lokal abgenommen; Paketabschluss weiterhin offen.

**Prüfaufbau-Korrektur:** D3 zuerst nur Selektor gefunden (weitere Regel
setzt dessen Rahmenfarbe). Konkrete animation-Deklaration jetzt gefordert;
Gegenprobe 50d15ce rot: CSSOM-Ring known fehlt. Neue Strukturprüfung
erkennt außerdem beide verwaisten Klammer-/Keyframezeilen. Noch kein
D3-Produktfix vor D2-Abschluss. Vorab abgelehnter Status-Patch mit
rückwärts angeordneten Hunks korrigiert. LEHREN §15 ergänzt; bestehende
Regeln §5.3 und §3.10/3.11 gelten, keine neue Ausnahme.

**D2:** `app.js` Rand-Scrollen nur nach Mausbewegung in 70-px-Randzone
starten; außerhalb/pointerleave cancelAnimationFrame. Feste Gegenprobe
50d15ce: 61 Rückrufe/s im Leerlauf; Fix Handy/Desktop 0. Desktop unten
scrollt, Mitte und pointerleave stoppen. Muster: Zieh-Autoscroll bleibt
separat, bereits an aktive Geste gebunden. Sprung/Kontrast/a11y grün,
vollständige Ausgaben `%TEMP%/paket-d-einzel-20261003/D2-*.log` gelesen.

**D3:** Zwei verwaiste Keyframe-/Klammerzeilen entfernt; alle drei
Bewertungsanimationen im CSSOM vorhanden. Strukturprüfung in Standprüfung
aufgenommen. Fester Altstand rot, 24 Zustände grün; g-60-Foto zeigt grünen
Ring. Bild/Sprung/Kontrast/a11y und Runde 13/13 grün, sämtliche Ausgaben
gelesen. Runden-Quellhash `534794d936acb8e8e09a591f5cb174960e80bb78ce43ba3d83d09bd888c54b8d`.

**D4:** Haken immer im Markup, inaktive unsichtbar; Pop nur beim neuen
Bildschirm, nicht beim Umschalten desselben. Feste Gegenprobe 50d15ce rot
„Chip springt“, 24 Zustände grün (±1 px und höchstens ein Pop).
Mustersuche: anderer bedingter Haken im Einstellungs-Segment gehört nicht
zu Chips; kein gleicher Breitenfehler geändert. Üben/Sprung/Kontrast/a11y
grün; vollständige Ausgaben D4-*.log gelesen. Auswahl zählt unverändert
40 → 9 Karten, Übung endet und lässt sich wiederholen.

**D5:** `springeNachOben` bei den drei Modusstarts nur scrollen, kein
Aufleuchten der Bühne; Modus-Animation gewinnt gegen Richtungsselektor.
Fester Altstand rot „Bühne leuchtet auf“. 24 Zustände, jeweils Runde,
Üben und Durchsicht (leere Konten ohne Startknopf), grün. Mustersuche:
genau diese drei Modusstarts; `springeZu` behält gezielte Rückmeldung.
Kontrast/a11y und Runde 13/13 grün, vollständige Ausgaben gelesen.
Runden-Quellhash `ef48ad556ebc3851360ad44fc6cf10fa27d4a649bc6d4e3425b2898fb704389d`.

**D6:** Nur 1300-ms-Verzögerung am Rundenende entfernt; Eintritt bleibt.
Altstand Deckkraft 0 nach 400 ms, Fix in 24 Zuständen ≥0,9. Mustersuche:
andere 1300-ms-Verzögerung am Lernstart gehört zu D7, nicht vorgezogen.
Flüssig-Ende erreicht Abschluss, Konsole sauber (CPU-4-Messhinweis:
55-ms-Blockade/50-ms-Bild, keine Tempo-Vergleichsbehauptung).
Kontrast/a11y und Runde 13/13 grün; vollständige Ausgaben gelesen.
Runden-Quellhash `24e25a13d087c3ad2bdd31cd4739ea99c50828f92f795baa77a0292da1d06b0e`.

**D7:** Z5 umgesetzt, Besuchsmerker nur in `ui` im Arbeitsspeicher, kein
Speicher-/Cloud-Feld. Choreografie nur erster Besuch von Lernen/Fortschritt;
bei Wiederbesuch nur Seitenwechsel. Ring/Balken/Spark ≤600 ms, Lichtstreif
kürzer, Wochenpunkte/Blöcke ruhig, Flamme einmal (auch Rundenende).
Altstand doppelte Feier rot; 24 Zustände erster Besuch ≤1200 ms,
Wiederbesuch ≤2 Bewegungen/300 ms, grün. Mustersuche: Einstieg-Flamme
bleibt eigenständiger Paket-B-Ablauf; Kalender bereits durch C21 kürzer,
nicht zurückgebaut. Lernen-Start/Fortschritt alle Zustände CLS/Kontrast 0,
kein Querscrollen; Kontrast/a11y und Runde 13/13 grün, Ausgaben gelesen.
Runden-Quellhash `7c6afb9301d5758d7020897c3bcfd1bcc2983719953c4a20464400d24b52de33`.
Gesamtprüfer berücksichtigt neue große D-Matrix mit 30 Minuten
Prozesszeitlimit und Hash der CSS-Strukturhilfe; Messgrenzen unverändert.

**D8:** Vier ungeschützte smooth-Scrollwege verwenden `scrollArt()`;
vorhandene Sprung-Hilfe bleibt bereits geschützt. Altstand beim aktiven
Reitertipp 900 statt 0 px, Fix in 24 Zuständen grün; normale Bewegung
bleibt sanft. a11y prüft denselben echten Tipp im ersten Bild (900→0).
Sprung/Kontrast/a11y und Runde 13/13 grün, alle Ausgaben gelesen.
Runden-Quellhash `31b30435b5097dc53143c99da4209b3d63381f4c9f096a75bd5127dd9571b05c`.

**D9:** Eigene weite Wisch-Keyframes mit Deckkraft 1; mindestens 200 px
und 60–100 % Fensterbreite, auch beim weiten Zug. Leistentipp bleibt 26 px.
Vorher 26 px/0,6 (50d15ce), nachher 24 Zustände mit sechs echten
Touchwechseln plus Rand/zu kurz grün. Alte Seite gleichzeitig als eingefrorene,
inert/aria-hidden Bildkopie ohne IDs/Handlungen; nach 200 ms oder jedem
Neuzeichnen entfernt, kein privater Rest außerhalb von #app.
Gegenlesen entfernte eine sofortige Layout-Messung nach Neuaufbau und
ergänzte den weiten Zug (180 px); endgültige Matrix erneut vollständig grün.
Mustersuche: Karten-/Blattwischen sind getrennte Gesten; deren Wege nicht
in D9 geändert. Scrollen CPU4: 0 Bilder >34 ms, Maxima 18–19 ms, keine
Blockaden (Messhinweis, keine A/B-Tempo-Behauptung). Leiste/Sprung/Kontrast/
a11y vollständig gelesen und grün; `D9-final-*.log` im Einzeltestordner.
Gerätegefühl am iPhone weiterhin nicht bestätigt; G1 bleibt offen.

**D10:** Befund bereits durch B5 behoben, deshalb trifft nicht zu; keine
zweite Änderung. Abbruch-Listener touchstart/wheel/keydown sowie beide
RAF-Abbauwege nachgelesen. B5 (auch echtes Mausrad, ununterbrochene Fahrt,
Rückweg) und sämtliche vier `t_einstieg*.js` grün, Ausgaben vollständig
gelesen. D9-Sprung/Kontrast/a11y gelten am unveränderten Produktquellstand.
Beschreibende Hürdenwahl-Messung 39 px auf Handys schon im festen Vorstand:
CRLF-Hash von 50d15ce `dc1761b67cbaa64ba48440d114490d8f9e9ebf3a7446b506575dec9cf4b357f2`,
vollständiges altes Einstieg-Log gelesen; kein neuer D-Rückschritt.
Layouttest zeigt scrollbare lange Seiten, kein verdeckter Fuß, Kontrast/
Querscrollen 0; nicht als überall unveränderliche Knopfhöhe ausgegeben.

**D11:** Toast 160 ms linear ausblenden, reduziert sofort entfernen.
Feste Gegenprobe ohne Austrittsbilder rot. Erster Fix scheiterte an
haltender Eintrittsanimation: Diagnoselauf desselben unveränderten Fixes
zeigt 1→0 ohne Zwischenwert. Zweiter Fix beendet die Animation mit eigenem
Stil-Durchlauf am längst bestehenden Toast (kein neues innerHTML).
24 Zustände ≥5 Austrittsbilder grün; ältere erfasste Hülle entfernt keine
neue Meldung. Mustersuche: Blatt/Dialog haben eigenen Austritt D1,
Bestätigung im Kartenkopf bleibt eigene Rückmeldung, nicht der Toast.
Dialogtimer/Kartenblatt/Sprung/Kontrast/a11y vollständig gelesen und grün;
Ausgaben `D11-*.log`. Kommentare und LEHREN §15 nachgezogen.

**D12-Versuch (anschließend zurückgenommen, siehe oberster Eintrag):** Feste Gegenprobe 50d15ce rot am toten Lernbalken-
Übergang. Vorher 460 Fotos in 36 Zuständen (Haupt-/Unterseiten, Blatt,
Runde/Antwort/Ende, sämtliche Einstiegsschritte und Kontoformulare),
`%TEMP%/paket-d-fotos/d12-20261003-stand1/vor/`; Lernen-Foto auch angesehen.
Aktuellen app.js-/styles.css-Hash vor Übernahme gegen Fotobasis geprüft;
gesicherter Vorstand `%TEMP%/paket-d-d12-vor-20261003/`.
Benannte tote Übergänge/Unterzeilen/bootIn entfernt, Boot und Stapel unter
Erhalt sämtlicher wirksamer Geometrie zusammengelegt. iOS-Standalone-Höhe
erhalten. Sichtbare erste 14 Zeilen im rAF markieren (alle Maße lesen,
dann Klassen schreiben), unsichtbare Platzhalter ohne eigene Animation.
24 Zustände grün; Text-Probelauf-CSS bytegleich zum gesicherten Vorstand.
Pixelvergleich und Pflichtregression einschließlich Runde noch offen.

**Nächster Schritt:** D12-Abnahme abschließen. D1–D9 und D11 lokal abgenommen,
D10 bereits durch B5 erledigt;
Paketabschluss nach §5 weiterhin offen.

### 2026-10-03 — Paket D bei D1 angehalten: lokaler Prüfstand antwortet nicht vollständig

**Geändert:** `app.js:14449` lokaler D1-Entwurf: haltende Eintrittsanimationen
vor dem Austritt abschalten, beschleunigende Kurve, mittige Dialoge mit
Maßstab/Deckkraft, Entfernen nach 200 statt 190 ms. Neue Gegenprobe und
Abnahme `plan/werkzeuge/pruefstand/t_paket_d.js` gegen festen Commit
`50d15ce7b5ab59a2fd016d6faddb3b7c1417d425` (3.18.13).
`AUFGABEN.md` D1 zurück; keine weitere D-Aufgabe geändert. Entwurf und Test
bleiben uncommittet erhalten; keine Version hochgezählt.

**Entscheidung:** AGENTS, CODEX-START, STAND, CLAUDE, LEHREN, Zyklus-Auftrag,
Aufgaben, Entscheidungen und BEW-Befunde gelesen. Arbeitsbaum vor Beginn
sauber, main; `git pull --ff-only origin main` bereits aktuell.
Syntax app.js/sw.js und `pruefe_stand.mjs` vor Änderung grün.
Chrome vorhanden; Batterie meldet 2 bei 95 %. Port 8099 zunächst erreichbar.
D1-Gegenprobe am festen Vorstand endet rot mit
„D1 390/knopf: kein berechneter Austritt“ (echter Befund, berechneter
Transform). Danach scheitert die neue Abnahme bereits bei `page.goto`
mit `net::ERR_EMPTY_RESPONSE`. Unabhängiges `Invoke-WebRequest` bestätigt
„The response ended prematurely. (ResponseEnded)“. Listener ist der
vorhandene Python-http.server-Prozess 19776 auf 127.0.0.1:8099.
Damit ist keine Abnahme des Fixes erfolgt. Gemäß CODEX-START § 6 hält das
ganze Paket an, wenn der Prüfstand nicht startet. Keine Testgrenze geändert.

**Offen:** D1-Fix vollständig abnehmen (32 Zustände, je vier Schließwege),
berührte Tests sowie Sprung/Kontrast/a11y; danach D2–D15 in Tabellenfolge,
Gegenprüfung, LEHREN § 14, Version, Gesamtlauf, Runde/Affe, Commit und Push.
C16 erst nach erfolgreicher D1-Abnahme erledigt setzen. Z1 ausgelassen,
G1 offen, Text-Probelauf unverändert. Kein Commit, Push oder Deploy.

**Nächster Schritt:** Lokalen Prüfstand-Server auf Port 8099 wieder
funktionsfähig starten; dann ausdrücklich Paket D fortsetzen, vorhandenen
Entwurf erhalten und D1 zuerst grün abnehmen.

### 2026-10-03 — Vorhandenen Paket-C-Stand abgeschlossen, 3.18.13

**Geändert:** Den gesamten vorhandenen Stand erhalten und als 3.18.13
abgeschlossen: `app.js:19`, `sw.js:10`, alle 33 `?v=`-Stellen in
`index.html` (einschließlich 31 Startbilder), `CHANGELOG.md`.
22 Aufgaben C1–C8, C11–C15, C17, C19–C21 und C23–C27 lokal abgenommen;
C22 nur b/c/d. Sechs vorhandene neue C-Abnahmedateien mit aufgenommen.
Beim Gegenlesen zusätzlich `app.js:9163`: Eingabe-Handler des vorhandenen
Kartenblatts auch über Fortschritt verbinden. `t_paket_c_weiter.js:149`
prüft Escape/Rückfrage, Abbruch und Neuzeichnen ohne Entwurfsverlust.
`alle_pruefen.js` erhält für die gebündelten C-Dateien ausreichende
Prozesszeit (weiter 60 Minuten, verw 20 Minuten); keine Assertion,
Messgrenze oder Wartebedingung gelockert. Dokumentation in LEHREN,
PLAN, STAND, beiden Aufgabenlisten und Changelog nachgezogen.

**Entscheidung:** Ausdrücklicher Betreiberauftrag: den uncommitteten C-Stand
abschließen, keine weitere Aufgabe bauen, Z1 auslassen, kein anderes Paket,
nicht veröffentlichen. Deshalb vorhandenen Stand weder gepullt noch
zurückgesetzt. Sicherung vor dem Abschluss:
`%TEMP%/paket-c-vor-abschluss-20261002-223602/`.
Gegen diese Sicherung sind CSS, vier geänderte Bestandstests und fünf der
sechs neuen C-Tests bytegleich; app.js unterscheidet sich nur durch Version
und die eine C12/C19-Handlerbedingung. Der sechste C-Test wurde um genau die
Entwurfsregression erweitert. Alle alten Logbuch-Einträge, Fehlversuche,
Patch und Gegenproben bleiben erhalten. `git fetch origin main` bestätigte
denselben Vorstand b60abf4. Commit/Push direkt auf main, kein Deploy.

**Gegenprüfung nach Großplan § 2a / § 3:** Vollständigen app.js-/styles.css-Diff
gegen G-118, FORT-1–7, FORT-10/12–15 und VERW-1–9/11 gelesen; alle vier
geänderten Bestandstests, alle sechs neuen C-Tests und Dokumentations-Diffs
geprüft. Je Aufgabe:
C1 dauerhaft verbundenes Wortfeld, Fokus ohne Scrollen, Nachführen nur im Blatt;
C2 Antwortenzahl klein ohne Erfolgswertung; C3 Quran-Zierziffer entfernt;
C4 globaler Kopf; C5 ehrliche Pause und bestehender Rundenweg;
C6 Null/Einzahl/Mehrzahl; C7 nur bestätigter Wortlaut, keine Lernregel;
C8 binäres Raster in voller Breite und beschriftet;
C11 realer Puffer für die Kartenzahl aller Bereiche;
C12 geänderte Entwürfe bei Escape/Wischen; C13 sichtbares Ablegeziel und Ansage;
C14 echte Leeransicht nach Bereichswechsel; C15 vorhandener Bereichsweg;
C17 ältester Kalendertag; C19 Rückweg und kontogebundenes Undo;
C20 vorhandene Inhalte auf großen Bildschirmen offen;
C21 tatsächliche Animationsenden; C22 ausschließlich b/c/d;
C23 Ansagen bei Verschieben/Löschen; C24 beide Rückwege gleich;
C25 Hinweise nur geführt; C26 gültiges letztes Ziel, Detailwege und verschwundene
Karte ohne Entwurfsverlust; C27 nur sichtbare bearbeitbare IDs.
Frühe Rückkehr beim verschwundenen Kartenziel erhält den Entwurf;
Undo überschreibt keine neueren Rückfälle. Asynchrone Dialogfortsetzungen
prüfen Konto/Bereich/Auswahl. Feste Gegenproben b60abf4 vollständig gelesen;
C2 nochmals frisch rot bestätigt, C15 als Textvergleich. C12/C19-
Zusammenspiel war tatsächlich fehlerhaft: UI-Probe vor Korrektur schloss die
geänderte Übersetzung mit Escape ohne Rückfrage. Nach der begrenzten
Handlerkorrektur gezielte C19-Matrix und vollständige C-Matrix grün.
Gerätebefund G1 bleibt ausdrücklich offen.

**Gesamtlauf:** Netzteil mehrfach BatteryStatus=2; Chrome 154.0.8037.93,
CHROMIUM in jedem Browseraufruf gesetzt, lokaler Server 8099.
Echte SDK-Prüfungen gegen lokalen Firestore-Emulator 8081, ausschließlich
Demo-Projekt. Endstand **137/137 grün**, einschließlich zweier gezielter
Nachläufe, alle vollständigen Einzel-Ausgaben gelesen.
Quellhash `dc1761b67cbaa64ba48440d114490d8f9e9ebf3a7446b506575dec9cf4b357f2`.
Logs `%TEMP%/adrabic-pruefstand-gesamt/dc1761b67cbaa64b/`.
Angefangenen Lauf vor der C19-Korrektur bewahrt; danach korrigierten
Produktstand vollständig geprüft. Nach Anpassung der Starterzeit nur exakt
passende grüne Quell-/Test-Hashes fortgesetzt.
C1 32 Zustände plus Duplikatabbruch/Write-Ablehnung/Offline-Rückkehr;
C2 zwölf Zustände; C12/C13/C14 zusammen 40; C17 84 Kalenderfälle;
`t_paket_c_weiter` 256 Aufgaben-Konfigurationen (1200 Sekunden), alles grün.
C11 zweite Suche 4.229 statt 72.026 normalize-Aufrufe.
Rasterkontrast hell 5,42/dunkel 5,17; volle verfügbare Breite.
Rundenabnahme **13/13 grün** aus identischen Produkt-/Test-Hashes;
auch Rundenende, Üben und Schreiben vollständig gelesen.
Affe mit Textfällen (AFFE_TEXTE=1), Startwert 7: **Handy 200/iPad 150,
jeweils 0 Befunde**, 106/126 Textaktionen; beide vollständigen Ausgaben gelesen.
Zusatzlogs `%TEMP%/paket-c-final-{rundenabnahme,affe-handy,affe-ipad}.log`
und `paket-c-final-C2-gegenprobe.log`.
Syntax, Version, alle 33 Dateiversionen, CSP/APP_SHELL und diff --check grün.

**Belegte Prüfaufbaufehler, keine Produktänderung:** Erster vollständiger
Lauf 135/137. `t_nur_betreiber` fror normale Bildschirme auf 3.17.56 ein
und meldete freigegebene C1/C4/C7-Änderungen rot. Historischen Bericht unter
`%TEMP%/paket-c-abschluss-nur-betreiber-historisch.log` bewahrt;
`--historisch` bleibt abrufbar. Aktuelle Abnahme isoliert den Textschalter
am selben Quellstand: erzwungen aus gegen reale Freigabe, unverändert
strenger HTML-/Pixelvergleich, sieben Stationen bei 390/1440 px.
Beide normal grün; Betreiber-Gegenprobe sechs Unterschiede, entsperrte
Schrift vier, erzwungene Normal-Konto-Freigabe sechs. Keine Station ausgelassen.
`t_serie_lang` verwendete vor 04:00 das Kalenderdatum statt des Lerntags.
Beleg 00:07: 2026-10-03 gegen 2026-10-02; T5=4 und T200=199.
Gemeinsame vorhandene lib.tag-Funktion benutzt, Erwartungswerte unverändert:
200/199/48 im Nachlauf exakt erreicht. Alten vollständigen Bericht
`%TEMP%/paket-c-abschluss-serie-lang-alte-testbasis.log` und Stand-JSON
`paket-c-abschluss-gesamt-vor-nachlauf.json` bewahrt.
Nur die beiden geänderten Tests frisch nachgelaufen; keine grünen Tests
desselben Stands wiederholt, keine Lernregel geändert.

**Tempo und Grenzen:** Texttempo CPU4×, 286 Ayat: längste Aufgabe 132 ms,
keine über 200 ms. Scrollen Verwalten/Fortschritt/Einstellungen:
keine Bilder über 34 ms, max. 19/19/18 ms. Schreiben CPU4×:
keine Bilder über 34 ms, Lage unverändert. Beschreibende Tempoausgaben
melden weiterhin kurze Blockaden: Rundenstart 125 ms, Fortschritt 183 ms,
Verwalten 194 ms, Rundenende 125 ms. Kein roter Tempo-Grenztest;
keine vollständige Ruckelfreiheit und keine echte iOS-Abnahme behauptet.

**LEHREN § 14, Punkt für Punkt:**

1. Codepfade selbst gelesen, einschließlich Dialog-/Snapshot-/Auth-Fortsetzungen;
   C12/C19-Regressionsursache gefunden und geprüft.
2. Muster im Repo gesucht: Fokus/Scrollen/Blattaufbau, Entwurfsbindung,
   Auswahlreset, Suchpuffer, Fortschrittsbegriffe, Kalender und alte Knopfhinweise.
3. Betroffene Texte/Kommentare und sichtbar falsche G-021-Meldung korrigiert;
   historische Meldungen erhalten.
4. Vorhandenes Kartenblatt wiederverwendet, neue C-Aktionen in Handlern und
   Auswahl-/Dialog-/Rasterlisten geprüft, keine neue Einstellung oder Speicherung.
5. Entwurf in formDraft, Auswahl und Ansichten in ui; C19 Neuzeichnen hält Eingabe.
6. Sprung/Kontrast/Breiten/hell/dunkel/reduzierte Bewegung/leer/voll geprüft;
   CPU4× und tatsächliche Animationsenden gelesen, Grenzen siehe oben.
7. Einzahl/Mehrzahl, Nutzertexte und Ansagen gelesen, keine neuen Systemcodes
   oder religiösen Texte.
8. Keine neuen Cloud-Felder oder Regeln; bestehende echte SDK-Regressionen grün.
9. Kein neuer Datenfluss/localStorage-Schlüssel; keine Datenschutzänderung nötig.
10. node --check app.js und sw.js grün; geänderte Prüfskripte syntaktisch grün.
11. APP_VERSION/CACHE_NAME/alle 33 URLs/CHANGELOG einheitlich 3.18.13;
    pruefe_stand einschließlich CSP und APP_SHELL grün.
12. Berührte Tests und vollständiger Prüfstand 137/137, Runde 13/13,
    beide Affenläufe; Originalfehlerberichte und Gegenproben gelesen.
13. Logbuch, PLAN „AKTUELL“, STAND und beide Aufgabenlisten aktualisiert.
14. G1 und künftiger Regeln-Deploy als bedingte Betreiber-Schritte
    dokumentiert; jetzt wird nichts veröffentlicht.

**Offen:** G1 bis zur echten iPhone-Bestätigung (Safari und installierte App)
nach einer späteren Veröffentlichung. C16/D1; C18 erst nach dem Text-Probelauf
am 29.10.; C22(a)/F3, Teil e ausgeschlossen. Z1 mit C9/C10/C28 ausgelassen.
Kein anderes Paket begonnen. Online bleibt 3.18.10. Die bereits in Paket A
geänderten Firestore-Regeln müssen vor späterem Hosting eingespielt werden
(`ladegeraet.ps1`); in diesem Abschluss keine Regeländerung.

**Nächster Schritt:** Keine weitere Aufgabe ohne neuen Auftrag beginnen.
G1 nach einer späteren Veröffentlichung am echten iPhone mit datierter Version
prüfen: Verwalten oben/gescrollt, Wortfeld, arabische Tastatur mit Vorschlägen,
zweimal Enter. Seite muss stehen, Blatt über der Tastatur bleiben.

### 2026-10-02 — Nur C1 wiederaufgenommen, lokale Abnahme grün

**Geändert:** `app.js:6033` entfernt den doppelten Aufbau nach der Meldung;
`6079/6087/9096/9174` fokussieren ohne Scrollen. `8648/8770/9025`
behalten das neue Kartenblatt durchgehend verbunden, begrenzt auf dasselbe
Konto und denselben Bereich. Werte, Fehler und Meldung werden im erhaltenen
Blatt aktualisiert; Eingabe-/Enter-Handler werden nicht doppelt gebunden.
`14308/14366` prüfen nur einmal je Fokus/Tastaturöffnung und scrollen nur
das Blatt, nur bei verdecktem Feld. Viewport-scroll löst kein Nachscrollen
aus. `14463` schließt nur den Bestätigungsdialog über dem erhaltenen Blatt.
`t_paket_c.js` prüft diese Ursachen und Randfälle; LEHREN nachgezogen.
**Entscheidung:** Auf ausdrücklichen Auftrag nur C1 nachholen. Die beiden
alten Fehlversuche im Logbuch und ihr Patch wurden vor dem Bau gelesen.
Alle vorhandenen uncommitteten Änderungen erhalten; deshalb kein Pull und
kein Zurücksetzen. Ausgang zusätzlich vollständig gesichert unter
`%TEMP%/c1-ausgang-20261002-194156/`. Kein Z1, kein anderes Paket, kein Deploy.
**Prüfung:** Feste Gegenprobe b60abf4 bestätigt Fokus ohne preventScroll,
ersetztes Wortfeld und acht scrollIntoView-Aufrufe. Neuer Stand **32 Zustände
grün**: 390/320/iPad820/Desktop1440, hell/dunkel, bewegt/ruhig, leer/voll.
Hinzufügen und Enter legen je eine Karte an; Pflichtfehler, fremdes Echo,
vier Größenwechsel, Viewport-scroll, Fokuswechsel und erneutes Öffnen der
Tastatur erhalten das Feld. MutationObserver bestätigt: auch keine kurze
DOM-Trennung. Duplikatabbruch, dauerhafte Schreibablehnung und Offline-
Rückkehr grün. Foto der sichtbaren Notiz im 320-px-Blatt gelesen.
Logs `%TEMP%/c1-final-abnahme-2.log`, `c1-final-altbefund.log` und
`c1-rand-gegenprobe.log`; Fehlversuche und Diagnosen ebenfalls bewahrt.
**Eigene Korrekturen:** Leertest maß Inhaltsverkürzung statt Tastaturbewegung
(Ausgang und Fix identisch 680→568 px, Scroll-Lage 112→0 bereits beim
Speichern). Messphasen getrennt. Die Attrappe liefert bei fail immer
permission-denied; dauerhaft abgelehnten Zweig korrekt vorbereitet.
Der neu erhaltene Knoten machte den falschen closeDialog-Zielknoten sichtbar:
Rand-Gegenprobe rot, begrenzter Zielselektor grün. Keine Schließdauer geändert.
**Gegenprüfung:** Eigenen vollständigen Diff gegen G-118 gelesen:
submitCardForm/zeigeToast/patchDoc/Sammlungs-Snapshots/renderMain,
Blatt-Markup und Handler, Viewport/Fokus-Timer sowie Dialog-Schließpfad.
Fallback bei fehlendem/anderem Blatt baut regulär neu; Auth-Wechsel entfernt
den privaten Entwurf. Abgelöste/anders fokussierte Felder werden vom Timer
nicht mehr gescrollt. Keine Lernregel, keine Cloud-Felder, keine lokalen
Speicherschlüssel und kein Umbau des Text-Probelaufs. Alle unberührten
vorhandenen Änderungen vor der Dokumentation bytegleich mit der Sicherung.
**Regression:** Dialog-Timer, Kartenblatt, Karten-Snapshots, Verwalten,
Kontrast, a11y und Kontowechsel-Entwürfe grün. Frische Rundenabnahme
**13/13 grün**, alle 13 Einzel-Ausgaben vollständig gelesen; einschließlich
Rundenende/Üben/Schreiben, sichtbarer Zeichenfläche und CPU4× ohne Bilder
über 34 ms beim Zeichnen. Geprüfter Quellstand:
`165fc6b7fe35caed1080aa950c4a3340d8138a5ab559996863c69a8403de3026`.
Affe Handy200/iPad150 mit Startwert 7 jeweils **0 Befunde**; vollständige
Ausgaben gelesen. Syntax, Versions-/CSP-Prüfung und `git diff --check` grün.
Logs `%TEMP%/c1-final-*.log`, Runden-Einzelprotokolle unter
`%TEMP%/adrabic-pruefstand-gesamt/165fc6b7fe35caed/`.
**Tempo:** Acht abwechselnde A/B-Paare mit je drei Speichervorgängen,
CPU4×, Netzteil (BatteryStatus=2), Chrome 154.0.8037.93. Vergleich mit dem
gesicherten lokalen Ausgang einschließlich der vorherigen Paket-C-Arbeit:
Klick-Median 129→62 ms, Maximum 206→135 ms; Longtask-Median 131→73 ms,
Maximum 208→139 ms, über 100 ms 17/24→3/24. Keine vollständige
Ruckelfreiheit behauptet. Vollständige Ausgabe `c1-final-tempo.log` gelesen.
**Offen:** C1 ist lokal einzeln abgenommen. Noch keine
Gesamtabnahme des Pakets, keine neue Version, kein Commit/Push. Version bleibt
3.18.12. G1 bleibt bis zur echten iPhone-Bestätigung offen. C16/D1,
C18/nach 29.10., C22(a)/F3 und Z1 bleiben wie im vorherigen Auftrag.
**Nächster Schritt:** Vorhandenen uncommitteten Paket-C-Stand behalten;
Paketabschluss braucht einen eigenen Auftrag. G1 nach einer späteren
Veröffentlichung am echten iPhone prüfen, in Safari und installierter App:
Verwalten oben/gescrollt, Wortfeld, arabische Tastatur samt Vorschlägen und
zweimal Enter. Seite muss stehen und das Blatt über der Tastatur bleiben.
Keine weitere Aufgabe begonnen; Z1 weiterhin ausgelassen.

### 2026-10-02 — Paket C lokal angehalten, C27 einzeln grün

**Geändert:** C27 Alle/Keine für die tatsächlich sichtbare Seite; fremde und
gesperrte Karten ausgeschlossen, andere Seiten behalten ihre Auswahl.
Ab 20 Karten verlangt Löschen das Wort „Löschen“. Leere Treffer deaktivieren
Alle, ohne eine bestehende Auswahl zu löschen; Leistenhöhe bleibt gleich.
21 Aufgaben einzeln grün: C2–C8, C11–C15, C17, C19–C21, C23–C27.
C22 b/c/d grün; a ausdrücklich F3, e ausgeschlossen.
**Prüfung:** C27 feste Gegenprobe b60abf4 rot; 16 Zustände inklusive 200
Karten/Seitenwechsel, falsche/richtige Löschbestätigung, Fremd-/Schloss- und
Leertreffer grün. Berührte Verwalten-Prüfung, Sprung, Kontrast und a11y grün,
Ausgaben vollständig gelesen; Foto der festen Auswahlleiste bei 320 px gelesen.
**Abschlussprüfung:** Frische Rundenabnahme **13/13 grün**, alle 13
Einzelausgaben vollständig gelesen, einschließlich der beschreibenden
Rundenende-/Üben-/Schreiben-Ausgaben. Schreiben CPU 4× bei Handy/klein/iPad:
0 Bilder über 34 ms, Lage unverändert; keine allgemeine Tempo-Abnahme des
gesamten Pakets behauptet. Quellhash
`21515fd15b6ef4e081b6c7b4b161f501973d3c1e7e15283d869ba2ed993472f7`;
Logs `%TEMP%/adrabic-pruefstand-gesamt/21515fd15b6ef4e0/` und
`%TEMP%/paket-c-abschluss-runde.log`. Affe **Handy 200/iPad 150, Seed 7,
je 0 Befunde** (normaler Kartenlauf, kein AFFE_TEXTE); beide vollständigen
Logs `%TEMP%/paket-c-abschluss-affe-{handy,ipad}.log` gelesen.
Netzteil BatteryStatus=2, Syntax/Stand/CSP/APP_SHELL und diff --check grün.
**Gegenprüfung:** Gesamten app.js-/styles.css-Diff gegen FORT-1–7,
FORT-10/12–15 und VERW-1–9/11 sowie G-118 gelesen, dazu alle Änderungen
der bestehenden Tests, historische G-021-Korrektur und Dokumentation.
C2 Antwortzahl ohne Erfolgsversprechen; C3 keine Quran-Zierziffer; C4 globaler
Kopf; C5 ehrliche Pause; C6 Null/Plural; C7 nur bestätigter Wortlaut, keine
Lernregel; C8 binäres Raster, Texte unverändert; C11 realer Suchpuffer;
C12 Entwurf/Abbruch; C13 Ziel/Ansage; C14 echte Leeransicht; C15 vorhandener
Bereichsweg; C17 Wochenrand; C19 Rückweg und kontogebundenes Undo;
C20 bestehende Inhalte offen; C21 tatsächliche Animationsenden;
C22 nur b/c/d; C23 Rückmeldung; C24 beide Rückwege; C25 eigene/geführte
Hinweise; C26 vorhandene Wege und verschwundene Karte; C27 sichtbare IDs.
Auch die sechs neuen Paket-C-Abnahmedateien vollständig gegen ihre Befunde
gelesen; C1 bleibt ausdrücklich rot, kein Test verschweigt diesen Befund.
Frühe Rückkehr beim verschwundenen Kartenziel erhält den Entwurf; Undo
überschreibt keine neueren Rückfälle. Asynchrone Bestätigungen prüfen Konto,
Bereich und Auswahl. Keine neuen Cloud-Felder/localStorage-Schlüssel oder
Regeln, kein Umbau des Text-Probelaufs. Keine weiteren Paketaufgaben gebaut.
**LEHREN § 14:** 1 Codepfade gelesen; 2 Muster gesucht; 3 Texte/Kommentare
nachgezogen; 4 neue Aktionen/rasterschlüssel in vorhandenen Listen; 5 Auswahl
und Entwurf in ui/formDraft; 6 Sprung/Kontrast/Breiten geprüft, Schreiben
CPU 4× grün, keine allgemeine Tempo- oder echte iOS-Abnahme behauptet;
7 Plural geprüft; 8 keine neuen
Cloud-Felder/Regeln; 9 kein neuer Datenfluss; 10 Syntax grün; 11 bestehende
3.18.12 samt CSP/APP_SHELL grün; 12 Einzelprüfungen grün außer bekanntem C1,
frische Runde/Affe siehe Abschlussprüfung, Gesamtlauf noch ausstehend;
13 Logbuch/STAND/Aufgaben nachgezogen; 14 nächster Auftrag unten. Dies ist
die Gegenprüfung des Zwischenstands, keine Commit-Freigabe.
**Offen:** C1 bleibt rot (erneuter Nachweis: `%TEMP%/paket-c-abschluss-C1.log`),
nach zwei Fehlversuchen kein dritter Anlauf (§ 6). C16/D1, C18/nach 29.10.,
C22(a)/F3 zurückgestellt. C9/C10/C28 als Z1 ausgelassen. Deshalb kein
Gesamtlauf/Versionsabschluss behauptet, kein Commit/Push/Deploy; Version
bleibt 3.18.12. Arbeitsstand vollständig uncommittet erhalten. Nächster
Auftrag: C1 in neuem Astra-Chat mit diesem vorhandenen Arbeitsstand nachholen.

### 2026-10-02 — C19–C26 einzeln abgenommen, C27 in Abnahme

**Geändert:** C19 Bearbeiten über Fortschritt und Zähler-Undo (6 Sekunden,
kontogebunden, neue Rückfallzählung bleibt erhalten). C20 vorhandene Inhalte
ab 720 px offen, keine erzwungene Kastenhöhe. C21 Kalender-Spalten 380 ms
gesamt, Band 350 ms; offene Detailbalken ebenfalls kurz. C22 b/c/d tote
Klassen/Kommentare bereinigt und Kalender-Symbol. C23 Erfolgsansagen für
Verschieben/Einzel-/Mehrfachlöschen und ehrlicher Verschiebehinweis. C24
gemeinsamer Such-/Auswahlreset für beide Rückwege. C25 Hinweise nur geführt.
C26 letztes gültiges Ablegeziel zuerst/vorausgewählt, Standpunkte/Detail aus
Speicherkarte, Griff-Tipp ignoriert, gelöschte Karte mit erhaltenem Entwurf,
lange Detailnotiz scrollt in sich, Knöpfe bleiben sichtbar.
**Prüfung:** Feste Gegenproben b60abf4 jeweils rot; je 16 Zustände grün,
Fortschritt/Verwalten/Kartenblatt/Snapshot passend zur Stelle und Sprung,
Kontrast (0 Funde), a11y grün. Vollständige C19–C26-Logs gelesen, Fotos
iPad sowie Detailnotiz 320/1440 gelesen. C19-Test irrtümlich auf ein nicht
vorhandenes Formular gezielt, dann mit echter submit-card-Aktion geprüft;
Fehllogs bewahrt. C20 alter Test klickte auf nun versteckte Navigationszeile:
zusätzliche Prüfung offener Inhalte, alle Unterseiten weiterhin geprüft.
C21 erster Fix ließ letzte Vorschau-Balken durch spätere CSS-Regeln laufen;
zweiter Fix ordnet den scoped Override danach, 600-ms-Abnahme grün.
**Entscheidung:** C22(a) bleibt gemäß Doppelt-gemeldet-Liste für F3, kein F
begonnen; Teil e ausdrücklich ausgeschlossen. C26 nimmt den im Befund
erlaubten Nutzungsweg für zuletztSetId, kein neuer Speicher.
**Offen:** C27 erster Fix Höhenwechsel, zweiter Fix feste schmale Zeilen.
Danach Testdatenfehler: 160 lokale Zusatzkarten fehlten im Attrappen-Store
und verschwanden beim Echo; vollständige Store-Fixture korrigiert, kein
dritter Produktfix. Alle/Page/20-Karten-Löschen in 16 Zuständen grün,
Fremd-/Schloss-/Leertreffer-Nachprüfung läuft. Kein Commit/Deploy.

### 2026-10-02 — C17 einzeln abgenommen

**Geändert:** Tage bis Sonntag in der Wochenzahl mitrechnen, Grenzen 4/12
unverändert. Gegenprobe b60abf4: am Montag fehlt tag(-25).
**Prüfung:** 84 Zustände (7 Wochentage, 390/320/iPad, Themen/ruhig) grün.
Fortschritt leer/eine/voll, Sprung, Kontrast (0 Funde), a11y grün;
vollständige `%TEMP%/paket-c-C17-*.log` gelesen.
**Offen:** C19/C20 Einzelabnahmen laufen; C21 feste Gegenprobe rot.
Kein Commit/Deploy.

### 2026-10-02 — C15 einzeln abgenommen, C16/C18 zurückgestellt

**Geändert:** Beide veralteten „+ Bereich“-Hinweise nennen Bereichsname →
„Bereich anlegen“. Keine zusätzliche Aktion.
**Prüfung:** Feste Textgegenprobe b60abf4 zwei Treffer, jetzt null; Syntax,
Verwalten, geführte Zustände (16), Sprung, Kontrast (0 Funde), a11y grün.
Vollständige `%TEMP%/paket-c-C15-*.log` gelesen.
**Entscheidung:** C16 ist laut Doppelt-gemeldet-Liste D1 zugeordnet; kein D
begonnen. C18 verlangt ausdrücklich Ende des Probelaufs; bis 29.10. kein
Text-Umbau. Beide als zurück mit Grund geführt.
**Offen:** C17-Abnahme läuft; C19-Gegenprobe b60abf4 rot (Rückweg Verwalten).
Kein Commit/Deploy.

### 2026-10-02 — C14 einzeln abgenommen, C15 Textgegenprobe

**Geändert:** Ein Leerzustand mit Code- und Dateiimport, eine Hauptaktion;
Bereichwechsel setzt die globale Suche zurück. Aktive globale Suche aus
einem leeren Bereich bleibt möglich, Leeren zeigt wieder den Leerzustand.
**Prüfung:** Gegenprobe b60abf4 rot. 16 Zustände einschließlich Desktop,
globale Suche und echte Code-Eingabe grün. Verwalten, Sprung, Kontrast
(0 Funde), a11y grün; vollständige C14-Logs und Fotos 320/1440 gelesen.
C15-Gegenprobe am festen b60abf4: zwei Verweise auf nicht vorhandenen
„+ Bereich“-Knopf. Beide durch den vorhandenen Weg über Bereichsnamen ersetzen.
**Offen:** Paketabschluss/C1 unverändert offen, kein Commit/Deploy.

### 2026-10-02 — C13 einzeln abgenommen, C14 Gegenprobe

**Geändert:** Ablegen öffnet und zeigt das Ziel, Kurzmeldung nennt Anzahl und
Speicherkarte; bei 0 neuen Karten „War schon drin“. Beim Sortieren bleibt der
Fokus in der betroffenen Liste, auch wenn dieselbe Karte zweimal sichtbar ist.
**Prüfung:** Gegenprobe b60abf4 rot. Erster Fix zeigte in der beschreibenden
Verwalten-Ausgabe eine abweichende zweite Sortierung: Fokus fand die Karte
zuerst in der nun offenen Speicherkarte. Zweiter Fix begrenzt den Selektor
auf Hauptliste bzw. konkrete Speicherkarte. Test um echte Sortierassertion
erweitert; offene Panel-Vorbedingung an genehmigtes Verhalten angepasst.
12 Zustände mit sichtbarem Ziel/Ansage/0-neu/zweimal Pfeiltaste grün;
Verwalten, Sprung, Kontrast (0 Funde), a11y grün. Vollständige Ausgaben
`%TEMP%/paket-c-C13-*.log` gelesen, erster Lauf bewahrt, zweiter `-2`.
C14-Gegenprobe rot: globale Suche bleibt nach Bereichwechsel aktiv.
**Offen:** Paketabschluss/C1 unverändert offen, kein Commit/Deploy.

### 2026-10-02 — C12 einzeln abgenommen, C13 Gegenprobe

**Geändert:** Bearbeiten-Entwurf mit gespeicherter Karte vergleichen, auch
Stand; Auswahlstand über Neuzeichnen bewahren. Escape/Wischen fragen bei
Änderung, unverändert schließen sie direkt. Knopf Abbrechen bleibt direkt.
Dialogfortsetzung an Konto, Edit-ID und konkreten Entwurf gebunden.
**Prüfung:** Gegenprobe b60abf4 rot. Erster Versuch zeigte auch am Abbrechen-
Knopf die Rückfrage; zweiten Versuch auf diesen Klickpfad begrenzt.
Jetzt **12 Zustände grün**: Escape/CDP-Touch, Dialog abbrechen/verwerfen,
Wort/Übersetzung/Notiz/Stand erhalten, Cloud unverändert ohne Speichern.
Erweiterter Kartenblatt-Test, Snapshot, Sprung, Kontrast (0 Funde), a11y grün.
Vollständige Ausgaben `%TEMP%/paket-c-C12-*.log` gelesen; erster Fehllauf
bewahrt, zweiter mit Suffix `-2`. C13-Gegenprobe rot: Speicherkartenpanel bleibt zu.
**Offen:** Paketabschluss/C1 unverändert offen, kein Commit/Deploy.

### 2026-10-02 — C11 einzeln abgenommen, C12 Gegenprobe

**Geändert:** Suchpuffergrenze mindestens 4000, sonst viermal Kartenzahl aller
Bereiche. G-021 und Changelog 3.17.33 sichtbar korrigiert; Vorfall in LEHREN.
**Prüfung:** Gegenprobe b60abf4 zweite Suche 72.026 normalize-Aufrufe, Fix
**4.229** (<6000), echte 1500 Karten mit Notiz und sichtbare Treffer.
Verwalten Suche/Auswahl/Speicherkarten, Sprung, Kontrast (0 Funde), a11y grün.
Vollständige Ausgaben `%TEMP%/paket-c-C11-*.log` gelesen. Batterie erneut 2.
C12-Gegenprobe rot: geänderter Entwurf über Escape ohne Rückfrage geschlossen.
**Offen:** Paketabschluss/C1 unverändert offen, kein Commit/Deploy.

### 2026-10-02 — C8 einzeln abgenommen, C11 Gegenprobe

**Geändert:** Kalender mit Mo/Mi/Fr, Monatskürzeln, Legende, zwei Zuständen,
feinem Rand für leere Tage und voller Breite. Keine Text-Lernlogik angefasst.
**Prüfung:** Gegenprobe b60abf4 rot (23,9 % Breite). Fix in 16 Zuständen mit
leerem/4-/12-Wochen-Raster grün; gelernt/leer 5,42:1 hell, 5,17:1 dunkel,
100 % Rasterbreite. 320px-Foto nach abgeschlossener Bewegung gelesen.
Fortschritt, Sprung, Kontrast (0 Funde), a11y grün. Vollständige Ausgaben
`%TEMP%/paket-c-C8-*.log` gelesen.
**Entscheidung:** C9/C10 als Bestandteile des ausgeschlossenen Z1-Umbaus
ausgelassen. Weiter nur Paket C. C11-Gegenprobe b60abf4 rot: 72.026
normalize-Aufrufe bei zweiter gleicher Suche über 1500 Karten mit Notiz.
Historischen Commit geprüft: feste Grenze tatsächlich unverändert.
**Offen:** Paketabschluss/C1 unverändert offen, kein Commit/Deploy.

### 2026-10-02 — C7 einzeln abgenommen, C8 Gegenprobe

**Geändert:** Karten „schon einmal gewusst“, Lektionen „einmal geschafft“;
derselbe Wortlaut in Meilenstein, geführten Speicherkarten, Freischalthinweis
und Kontolösch-Zusammenfassung. Stufe-1-Kommentar berichtigt, keine Regeländerung.
**Prüfung:** Gegenprobe b60abf4 rot; 16 Zustände einschließlich Meilenstein und
geführtem Satz grün. Lernen-Start leer/eine/erste Runde/voll/erledigt/Serie/
zwei Bereiche, Fortschritt, Sprung, Kontrast (0 Funde), a11y grün. Fotos
gelesen, `saß/saßen/Lektion.*sitzt` ohne Treffer. Vollständige Ausgaben
`%TEMP%/paket-c-C7-*.log` gelesen. Fehlaufruf eines nicht vorhandenen Tests
als eigene Logdatei bewahrt; vorhandener Test `t_lernen_start` danach grün.
C8-Gegenprobe rot: Raster nutzt nur 23,9 % seiner Breite.
**Offen:** Paketabschluss/C1 unverändert offen, kein Commit/Deploy.

### 2026-10-02 — C6 einzeln abgenommen, C7 Gegenprobe

**Geändert:** Keine große Null; vorhandener Stand-Satz und sekundärer Weg
zur Runde bei noch nicht gewussten Karten. Mehrzahl über `mz`.
**Prüfung:** Gegenprobe b60abf4 rot, Fix in 16 Zuständen mit 1/40 neuen Karten
und Einzelkarte nach Nicht grün. C5-Integration, Fortschritt leer/eine/voll,
Sprung, Kontrast (0 Funde), a11y grün; 320px-Foto gelesen, kein Überlauf.
Vollständige Ausgaben `%TEMP%/paket-c-C6-*.log` gelesen.
**Entscheidung:** C7-Wortlaut vorab im Chat gezeigt und Z4 freigegeben:
Karten „schon einmal gewusst“, Lektionen „einmal geschafft“. Nur Wörter,
Regeln unverändert; Gegenprobe C7 b60abf4 rot.
**Offen:** Paketabschluss/C1 unverändert offen, kein Commit/Deploy.

### 2026-10-02 — C5 einzeln abgenommen, C6 Gegenprobe

**Geändert:** Nie gelernt/Pause/aktiv anhand Protokoll und erster Bewertung
unterschieden. Pausensatz und Runde starten; vorhandene Lernregeln unverändert.
C6-Gegenprobe b60abf4 rot: große Null bei neuen Karten.
**Prüfung:** C5 in 16 Zuständen mit Pause30/100, bewerteten Karten ohne
Protokoll und echtem Anfang grün; Knopf startet Runde. Wochenkopf,
Fortschritt leer/eine/voll, Sprung, Kontrast (0 Funde), a11y grün.
Rundenabnahme **13/13 grün**, vollständige 13 Protokolle gelesen, Quellstand
`7e600022291915aa649c91827f1e92ecbafec125eb812b8de500f4f6c6447f55`.
Logs `%TEMP%/paket-c-C5-*.log` und gleichnamiger Quellstandordner unter
`%TEMP%/adrabic-pruefstand-gesamt/`.
**Offen:** Paketabschluss/C1 unverändert offen, kein Commit/Deploy.

### 2026-10-02 — C4 einzeln abgenommen, C5 Gegenprobe

**Geändert:** Hauptkopf „Fortschritt“, Lektionen-Zeile mit Bereichsnamen.
Globale Zahlen unverändert. Gegenprobe C5 rot: Pausensatz fehlt nach 30 Tagen.
**Prüfung:** C4 in 16 Zuständen und nach Bereichwechsel grün; Fortschritt
leer/eine/voll, Sprung, Kontrast (0 Funde), a11y grün. Vollständige Ausgaben
unter `%TEMP%/paket-c-C4-*.log` gelesen.
**Entscheidung:** C5-Wortlaut vor dem Bau im Chat gezeigt: „Dein bisheriger
Fortschritt bleibt. Starte mit einer Runde wieder ein.“ Knopf „Runde starten“.
Unterscheidung nie/Pause anhand gesamtem Protokoll und erster Bewertung.
**Offen:** Paketabschluss/C1 unverändert offen, kein Commit/Deploy.

### 2026-10-02 — C3 einzeln abgenommen, C4 Gegenprobe

**Geändert:** Quran-Zierziffer aus dem Stoffzähler entfernt, dazu die
unbenutzten Ziffern-CSS-Regeln. C4-Gegenprobe b60abf4 rot: Bereichspille im
Fortschritt sichtbar, obwohl die Zahlen alle Bereiche umfassen.
**Prüfung:** C3 in 16 Zuständen grün, 320px-Foto gelesen; Fortschritt
leer/eine/voll, Sprung, Kontrast (0 Funde), a11y grün. Vollständige Ausgaben
unter `%TEMP%/paket-c-C3-*.log` gelesen. Syntax grün.
**Offen:** Paketabschluss/C1 unverändert offen, kein Commit/Deploy.

### 2026-10-02 — C2 einzeln abgenommen, C3 Gegenprobe

**Geändert:** Antwortzahl als kleine sachliche Zeile; Vergleichspille entfernt.
Wochenkopf-Test prüft weiterhin alle Zustände, jetzt ohne Vergleich und mit
exakter Antwortsumme. C3-Gegenprobe gegen b60abf4 zeigt die Zierziffer rot.
**Prüfung:** C2 in 12 Zuständen grün; `t_wochen_kopf`, `t_fortschritt`,
`t_sprung`, `t_kontrast` (0 Funde) und `t_a11y` grün. Vollständige Ausgaben
gelesen, gesichert unter `%TEMP%/paket-c-C2-*.log`.
**Offen:** Paketabschluss bleibt offen; C1 zurück, kein Commit/Deploy.

### 2026-10-02 — Paket C begonnen, C1 zurück, C2 Gegenprobe

**Geändert:** Zwei neue Tests unter `plan/werkzeuge/pruefstand/`:
`t_paket_c.js` (C1) und `t_paket_c_fort.js` (C2), feste Gegenprobe b60abf4.
Produktdateien nach den C1-Versuchen wieder unverändert.
**Entscheidung:** Nur C ohne Z1-Umbau. Start sauber auf main, Pull aktuell,
Syntax/Stand grün, BatteryStatus=2. C1-Gegenprobe zeigt Fokus ohne
preventScroll. Zwei Versuche scheitern an der Identität des Wortfelds nach
Hinzufügen; gemäß §6 zurück. Eigene Änderungen vollständig als
`%TEMP%/paket-c-C1-versuch.patch` gesichert, dann nur diese zurückgenommen.
Kein fremder Arbeitsstand vorhanden oder verworfen. C2-Gegenprobe rot:
trend-pill weiterhin vorhanden. Unterbrechung durch Betreiber, danach
unveränderte Testdateien erhalten und fortgesetzt.
**Offen:** C1-Abnahme rot, kein Paketabschluss/Commit möglich. C9/C10 gehören
laut Hinweis zum ausgeschlossenen Umbau; C16 laut Dopplungsliste nach D;
C18 laut Befund erst nach dem Text-Probelauf. Keine anderen Pakete begonnen.
**Nächster Schritt:** C2 und weitere freigegebene C-Zeilen der Reihe nach.


### 2026-10-02 — Paket B fertig, 3.18.12; kein Deploy

**Geändert:** B6 zuerst behoben; B1–B13 des vorhandenen Arbeitsstands
vollständig erhalten und abgenommen. Aufgaben auf erledigt (3.18.12),
STAND/PLAN/Changelog nachgezogen. Eigene temporäre Prüfhilfen nach
%TEMP%/paket-b-pruefhilfen gesichert und aus scratchpad entfernt.
**Entscheidung:** Nur Paket B. Netzteil BatteryStatus=2 vor Fortsetzung,
Tempo und Abschluss; HEAD/origin/main vor Commit unverändert 07c7568.
Commit/Push direkt auf main, keine Veröffentlichung. Vorhandene Änderungen
an Modellhinweisen/Dokumentation mit erhalten; keine weiteren Pakete begonnen.

**Prüfung:** Gesamtlauf mit identischem Fingerprint
afc7570ffdcd75c0edfe8be7a08d7f67a09755d85bcf3b4308ff7eb3993d416d
einschließlich gezieltem Nachlauf **131/131 grün**, alle vollständigen
Ausgaben gelesen. Rundenabnahme --fortsetzen **13/13**, gespeicherte
Quell-/Test-Hashes passen; keine unnötige Wiederholung grüner Fälle.
Affe nacheinander, AFFE_TEXTE=1, Seed7: Handy200 **0 Befunde**
(143 Texte-Aktionen), iPad150 **0 Befunde** (126 Texte-Aktionen).
Syntax/Stand/CSP/Cache grün, alle 33 index.html-Querys auf 3.18.12.
B6: 375×667 kurze Schritte im Bild, Runde Unterkante 663,297;
390×844 Hürden ohne Wahl scrollHeight844. G-083 und 192 angrenzende
Zustände grün. Echos dürfen im Dokumentfluss wachsen; kein sticky-Fuß.

**Tempo-Ausreißer belegt:** t_text_tempo zunächst Verwalten203 ms >200.
Original erhalten in %TEMP%/paket-b-fort-text-tempo-rot.log.
x_ab_tempo.js 8 07c7568 am Netzteil, abwechselnd alt/neu:
Verwalten alt130/131/137/148/150/151/153/168 (Median150),
neu112/115/121/137/139/140/156/163 (Median139); jeweils0/8 >200.
Textöffnen alt Median135, neu126; jeweils0/8 >200.
Keine belegte Paket-B-Verschlechterung. Nachlauf unverändert maximal170 ms,
Exit0; Grenze200 unverändert. Kein Tempo-Code außerhalb B geändert.
Einstieg CPU4× vollständig bis „Dein Plan steht“ auf 375/390/820:
maximale Longtasks145/174/130 ms, maximale Bildabstände159,3/175,1/122 ms.
Das sind messbare Pausen; vollständige Ruckelfreiheit nicht behauptet.
Auch die beschreibenden übrigen Tempo-Ausgaben enthalten kurze Blockaden.

**Gegenprüfung (§ 2a):** Produktdiff vollständig gegen EIN-1–12 und Z18
gelesen, dazu t_paket_b.js und feste Alt-Gegenproben07c7568.
B1 Frischkonto-Merker am Auth-Wechsel zurückgesetzt, Bestand weiter leer;
B2 Untertitel hält Kartenlage; B3 Breite420 hoch/quer stabil;
B4 frühe Rückkehr behält fertigen Plan; B5 Abbruch entfernt RAF/Listener,
Normalfahrt bleibt, Formularrückweg ohne Fahrt; B6 echte Viewports,
Schriften/Bilddurchlauf abgewartet, strikte Grenze statt gelockerter Toleranz;
B7 Fuß von Eintrittsbewegung ausgenommen, echte Klick-Bildmessung;
B8 Timer prüft denselben Boot-Knoten und rendert aktuellen Zustand;
B9/Z15 Doppelung weg, Dauer6720 ms erhalten; B10/Z16 nur direktes Formular,
Bestätigung unverändert; B11 frischer Start löscht nur Antwortenschlüssel;
B12 Kommentare/Dauer passen; B13/Z18 wiederverwendete kleine Leiste,
Anfangsstand ohne Zielhaken, neue Zahl oder Speicherung.
Neue Rückkehr-/Timerpfade gegen Fehler/Kontowechsel/Abbruch gelesen,
Pflichtregressionen/Fehlerformulare grün. Keine neue Abweichung vom Auftrag.
Fotos375-Willkommen/Runde,390-Hürden,820-Runde sowie Formular/Plan
visuell gelesen: keine Überlagerung; lange Inhalte bleiben scrollbar.
Keine Lernlogik, religiösen Texte, Cloud-Felder, Regeln oder Rechtstexte geändert.
D10 ist derselbe Scrollbefund wie B5; Paket D bleibt hier unbearbeitet.

**LEHREN §14, Punkt für Punkt:**
1 Codepfade/Diff gelesen; 2 Muster im Repo gesucht; 3 Texte/Kommentare
nachgezogen; 4 vorhandene Bauteile/Handlungen, kein neuer persistenter Speicher;
5 Merker im bestehenden UI-Zustand bzw. Konto-Ladezustand;
6 Breiten/Themen/reduzierte Bewegung, Sprung/Kontrast und CPU4× gemessen,
Pausen ausdrücklich beziffert; 7 Wortlaut/Mehrzahl geprüft, keine Methoden-Zahl;
8 keine neuen Cloud-Felder oder Regeländerung; 9 kein neuer persistenter
Datenfluss, Datenschutzerklärung unverändert; 10 Syntax grün;
11 Version/Cache/33 Querys/Changelog/CSP grün; 12 Tests131/131,
Runde13/13 und Affe0/0; 13 Logbuch/STAND/PLAN/Aufgaben nachgezogen;
14 Gerätepunkt mit konkreten Schritten dokumentiert, kein Deploy beauftragt.

**Offen:** Kein weiterer Paket-B-Codepunkt. Echtes iOS/Gefühl/E-Mail-Zustellung
nicht durch Chromium bestätigt. Nach einer späteren Betreiber-Veröffentlichung:
Gaststart in installierter iPhone-App öffnen (weicher Boot-Übergang),
Einstieg bis „Runde“ durchgehen (auf SE Hauptknopf sichtbar), auf fertigem
Plan während der Fahrt nach oben wischen (Position bleibt beim Finger),
Formular → Anmeldung → Registrierung → Zurück (derselbe Plan erhalten).
Version/Bilder beim Gerätetest festhalten. Bekannte übrige Pakete und offene
Betreiberentscheidungen bleiben offen; nichts davon vorgezogen.
Regeln aus Paket A weiterhin vor einer späteren Hosting-Veröffentlichung
einspielen lassen (ladegeraet übernimmt das). Hier kein Deploy.
**Logs:** %TEMP%/adrabic-pruefstand-gesamt/afc7570ffdcd75c0;
%TEMP%/paket-b-fort-{gesamt-nachlauf,tempo-ab,einstieg-tempo,affe-handy,affe-ipad}.log;
Einzel-/Alt-/Umfeldlogs in den vorherigen Einträgen. Bilder unter
%TEMP%/adrabic-pruefbilder/paket-b-*.png.
**Nächster Schritt:** Paket B auf main committen/pushen, dann anhalten.
Ein neues Paket braucht einen neuen Auftrag. Nicht veröffentlichen.

### 2026-10-02 — Netzteil bestätigt, Paket-B-Abschluss fortgesetzt

**Geändert:** Produktstand unverändert, alle uncommittierten Änderungen behalten.
**Entscheidung:** Betreiber meldet „netzteil ist dran“; BatteryStatus=2.
Server8099 und Firestore-Emulator8081 wieder gestartet. Gesamtlauf
--fortsetzen bestätigt denselben Fingerprint afc7570ffdcd75c0 und bewahrt
73 grüne Tests; die restlichen 58 laufen frisch.
**Offen:** Restlauf, CPU-4×, Affe, Schlussprüfung und Commit/Push.
**Nächster Schritt:** Nur Paket B abschließen, keine Veröffentlichung.

### 2026-10-02 — Paket B gebaut, Abschluss wartet auf Netzteil

**Geändert:** Keine weitere Produktänderung. Uncommittierten Stand erhalten;
B6 behoben, alle 13 Einzelabnahmen grün, Version 3.18.12 vorbereitet.
**Entscheidung:** Nach Unterbrechung keine laufenden Prüfdienste mehr.
Netzteilprüfung liefert BatteryStatus=1, Ladestand 93 %. Deshalb nach
CODEX-START § 5.4 keinen weiteren Gesamtlauf/Tempo-Test/Commit auf Akku.
Betreiber hat GPT-6.1 gewählt und sparsames Vorgehen gewünscht.
**Prüfung:** 73/131 Gesamttests am identischen Fingerprint
afc7570ffdcd75c0edfe8be7a08d7f67a09755d85bcf3b4308ff7eb3993d416d
mit Exit 0 gespeichert, keine gespeicherten roten Tests. Alle 73 Ausgaben
vollständig gelesen, zuletzt t_leiste.js. Bereits grüne Fälle per
--fortsetzen behalten; kein vollständiger Gesamterfolg behauptet.
Produktdiff/Tests erneut gegen EIN-1–12 und Z15/Z16/Z18 gelesen:
Frischkonto-Merker beim Auth-Wechsel zurückgesetzt, Rückplan erhalten,
Boot-Timer an seinen Knoten gebunden, Scroll-Abbruch und Dauer passend,
B6 echte Viewports/Schriftbereitschaft, strikte Unterkante ohne Toleranz.
Keine zusätzlichen Paketänderungen nötig; Gerätegefühl bleibt ungeprüft.
**Offen:** Restliche 58 Tests, CPU-4×-Einstiegsmessung und Bilder
(scratchpad/b-tempo.cjs vorbereitet), Affe Handy200/iPad150 mit Texten,
Rundenabnahme --fortsetzen, abschließende LEHREN-Checkliste, Status/Commit/Push.
Logs: %TEMP%/adrabic-pruefstand-gesamt/afc7570ffdcd75c0.
Eigene scratchpad-Hilfen vor Commit entfernen; keine vorhandenen Dateien löschen.
**Nächster Schritt:** Betreiber schreibt „Netzteil dran“. Dann BatteryStatus=2
prüfen, Server8099/Firestore-Emulator8081 starten und denselben Lauf fortsetzen.
Kein anderes Paket, keine Veröffentlichung.

### 2026-10-02 — Paket-B-Prüflauf nach Nutzungslimit fortgesetzt

**Geändert:** Keine Produktänderung seit Fingerprint afc7570ffdcd75c0.
**Entscheidung:** Unterbrechung beendete Server, Emulator und Prüfprozess.
Lokale Dienste wieder gestartet, danach alle_pruefen.js --fortsetzen:
elf erfolgreiche Tests mit identischen Quell-/Test-Hashes bewahrt, die
fehlenden laufen frisch. BatteryStatus=2. Betreiber wünscht sparsames
Vorgehen; keine unnötigen Wiederholungen, vorgeschriebene Abnahmen bleiben.
**Offen:** Gesamtlauf, dessen Auswertung und Paketabschluss laufen noch.
**Nächster Schritt:** Paket B abschließen, kein anderes Paket, kein Deploy.

### 2026-10-01 — Paket B fortgesetzt, B6 abgenommen; Gesamtlauf läuft

**Geändert:** Vorhandenen uncommittierten Stand vollständig erhalten.
B6 in styles.css: Fußpadding 16 px, unter 761 px 12 px und leeren
Konto-Link-Platz einschließlich Flex-Abstand ausblenden. Der echte Link
auf Willkommen bleibt. t_paket_b.js wartet bei B6 auf Schrift/Bilddurchlauf,
Unterkante auf 375 px wird strikt <= Fensterhöhe geprüft. Paketversion
3.18.12 in app.js, sw.js, allen 33 index.html-Querys und CHANGELOG.
**Entscheidung:** Betreiber beauftragt ausdrücklich B6/Status zurück und
Abschluss des vorhandenen Pakets. Deshalb kein Verwerfen und kein Pull
über den Arbeitsstand; fetch bestätigt HEAD = origin/main = 07c7568.
Netzteil zweimal BatteryStatus=2. Keine Veröffentlichung.
**Abnahme B6:** Fester Vorstand 07c7568 mit zwei echten Befunden rot,
neuer Stand auf 320/360/375/390/820 grün. 375×667 Unterkanten für
Willkommen/Ziel/Karte/Schrift/Runde: 628,938/607,672/635,484/607,672/663,297.
390×844 Hürden: scrollHeight = innerHeight = 844; Knopflage wie die kurzen
Schritte (0,203 px Rundung). 192 angrenzende Zustände (390/320/iPad,
hell/dunkel, ruhig/bewegt, 0–7 leer/voll) ohne Überlagerung, Querscrollen
oder Seitenfehler. G-039/040/041/044/083 samt festen Gegenproben grün.
Logs: %TEMP%/paket-b-fort-{B6-alt,umfeld,g083}.log.
**Offen:** Gesamtlauf 131 Tests gestartet mit Fingerprint
afc7570ffdcd75c0edfe8be7a08d7f67a09755d85bcf3b4308ff7eb3993d416d
unter %TEMP%/adrabic-pruefstand-gesamt/afc7570ffdcd75c0.
Danach Ausgaben lesen, Affe Handy200/iPad150, Gegenprüfung und Commit/Push.
Kein anderes Paket beginnen. Gerätebestätigung bleibt von Chromium getrennt.
**Nächster Schritt:** Lauf vollständig auswerten und Paket B abschließen.

### 2026-10-01 — Modellhinweise um GPT-6.1 Sol aktualisiert

**Geändert:** Auf Betreiberhinweis die Sol-Empfehlungen in CODEX-START
(Starttexte, Pakettabelle, Faustregel) und grossplan/AUFTRAG auf GPT-6.1 Sol
umgestellt; Kürzel in AUFGABEN für offene/fortzusetzende Aufgaben definiert.
**Entscheidung:** Neue Sol-Arbeit mit GPT-6.1 Sol; Astra/Luna und Denkstufen
beibehalten. Historische Berichte nicht umgeschrieben. Quelle geprüft:
[OpenAI-Modellbeschreibung](https://developers.openai.com/api/docs/models/gpt-6.1-sol).
**Offen:** Paket B weiterhin uncommittiert bei B6 angehalten, siehe unten.
Keine Produktänderung, keine neue Paketabnahme, kein Commit/Push/Deploy.
**Nächster Schritt:** B6 wie im folgenden Eintrag nachholen.
**Prüfung:** Modellverweise und Dokumentdiff gelesen, git diff --check grün;
für diese reine Planänderung keine Produktprüfungen wiederholt.

### 2026-10-01 — Paket B angehalten bei B6, uncommittiert; Ausgang 07c7568 / 3.18.11

**Geändert:** Nur Paket B: Nachklang, Probekartenhöhe, iPad-Fußbreite,
Plan-Rückweg, Scroll-Abbruch, Knopfbewegung, Gast-Boot, doppelte Aufbauzeilen,
direkter Formularrahmen, frischer Antwortenspeicher, Kommentare/Scroll-Dauer,
kleine Stand-Leiste. t_paket_b.js mit festen Gegenproben gegen 07c7568.
**Entscheidung:** Sauberer main, Pull aktuell, Syntax/Stand grün; lokaler
Server 8099 und geprüfter Chrome starten. BatteryStatus=2.
B1-Gegenprobe rot: Nachklang fehlt nach neuer Registrierung.
Neue Abnahme grün: Satz nach 3,5 s sichtbar, erste Karte löscht ihn;
Bestandskonto löscht beide Schlüssel. G-042-Bestandsregression grün.
**Offen:** B6 nach zwei gescheiterten Änderungen zurück. B1–B5/B7–B13
haben grüne Einzelabnahmen und bleiben wegen fehlendem Paketabschluss
`in Arbeit`, nicht als veröffentlichte/committierte Version erledigt.
Gesamtlauf 131 Tests, Affe Handy 200/iPad 150, CPU-4×-Prüfung und neue
Paketversion vor Commit/Push ausstehend. Diese Schritte wurden wegen der
weiter roten B6-Abnahme nicht als grüne Paketabnahme ausgegeben.
Keine Veröffentlichung, kein Commit/Push, Version weiterhin 3.18.11.
**Nächster Schritt:** In neuem Chat (Astra mittel empfohlen) B6/Status
zurück nachholen, alle vorhandenen Änderungen behalten. Danach Paket B
gemäß CODEX-START § 5 abschließen. Kein anderes Paket beginnen.

B13/Z18: einstiegLeiste wiederverwendet, klein auf dem fertigen Plan;
Anfangsstand neu, spätere Punkte ungefüllt, kein erreichter Zielhaken.
Keine Zahl und keine neue Speicherung (localStorage vor/nach identisch).
Zwölf Konfigurationen 390/320/iPad, tatsächlich hell/dunkel, ruhig/bewegt,
einschließlich sichtbarer Leiste/Kontrast/Seitenfehler grün. Fotos von
Formular und Plan hell/dunkel visuell gelesen (keine Überlagerung).
Umfeld/Pflichtregressionen grün (B13-*.log).

**Gegenprüfung:** Gesamten Produktdiff gegen EIN-1 bis EIN-12 und Z18 gelesen.
Neue frühe Rückkehr in mode-register erhält den Rückplan; Boot-Timer prüft
denselben Knoten und rendert den dann aktuellen Zustand. Frischkonto-Merker
wird beim Auth-Wechsel gelöscht; Bestandskonto-Caches werden weiter geleert.
Scroll-Abbruch entfernt Listener/RAF, Rückweg startet keine neue Fahrt.
Z15 erhält Dauer trotz kürzerer Liste; Z16 betrifft nur das direkte Formular.
Z18 zeigt Anfang statt gelernter Karten. Keine Änderung an Lernlogik,
religiösem Wortlaut, Cloud-Feldern, Regeln oder Rechtstexten.
Tests gegen den Befund gelesen: Themenquelle korrigiert; B7 zusätzlich mit
echtem Weiter-Klick statt neuem Fixture. Fester Vorstand zeigt x=38→12,
Deckkraft 0,6→1; die neue Abnahme verlangt jedes Bild x=12/Deckkraft 1.
B6-Abnahme bleibt ausdrücklich rot; keine Testgrenze gelockert.

**LEHREN § 14, Punkt für Punkt (kein Commit):**
1 Codepfade gelesen; 2 Muster im Repo gesucht; 3 betroffene Kommentare
korrigiert; 4 vorhandene Handlungen/Bauteile, kein neuer persistenter Speicher;
5 UI-Merker im bestehenden Zustand; 6 Breiten/Themen/reduzierte Bewegung,
Sprung/Kontrast gemessen, CPU 4× noch vor Paketabschluss nötig;
7 vorhandener Wortlaut, keine neue Methoden-Zahl; 8 keine neuen Cloud-Felder;
9 kein neuer persistenter Datenfluss; 10 Syntax grün; 11 bisherige Version
konsistent, neue Paketversion ausstehend; 12 Einzel-/Pflichttests grün außer
B6, Paketgesamtlauf/Affe ausstehend; 13 Logbuch/Stand/Plan nachgezogen;
14 Betreiber bekommt den nächsten Starttext und den Anhaltegrund.

**Endstand-Prüfungen:** Alle 13 festen Gegenproben rot wie erwartet.
Aktuelle B-Abnahmen: zwölf grün, nur B6 rot (375-Runde 675,297 >667,
390-Hürden scrollHeight 852 >844). G-039/040/041/044/083 und G-042
mit ihren festen Gegenproben erneut grün; Syntax/Versions-/CSP-Prüfung grün.
Logs: %TEMP%/paket-b-final-{abnahmen,gegenproben,g083,bestand}.log;
nach B7-Testschärfung zusätzlich paket-b-end-{abnahmen,B7-alt}.log.

B12/EIN-12: Veraltete Aussagen zu Überspringen, Hero-Drehung, sticky-Fuß,
Kartenbauteil, Ringdauer und zweimaligem Haken korrigiert. Aufbau-Scroll
nutzt einstiegBauDauerFuer statt fest sechs Punkten; scrollY erst im RAF,
alter ui.einstiegBauScrollStartTop vollständig entfernt. Text-Gegenprobe
rot; Textabnahme, B5-Scrollregression, Umfeld und Pflichtregressionen grün
(B12-*.log). Übriges position:sticky betrifft Verwalten, nicht den Einstieg.

B11/EIN-11: Beim frischen render()-Start auf Bildschirm 0 nur den
Antwortenschlüssel entfernen. Keine Nachklang-Zeitgrenze eingebaut.
Feste Gegenprobe rot, Schriftwahl und Neuladen mit anschließendem null
grün; Umfeld und Pflichtregressionen grün (B11-*.log).

B10/EIN-10/Z16: einstiegKopf mit Rückaktion/Name wiederverwendet, direktes
Registrierungsformular in derselben solo/einstieg-Struktur; separate Zählung
entfällt nur dort. Bestätigung nicht angefasst. Feste erweiterte Gegenprobe
07c7568 rot (Formularkopf fehlt). Aktuell alle zwölf Konfigurationen:
390/320 Kopf x=12 y=28, iPad x=70 y=28 vor/nach, auch nach leeren
Pflichtfeldern und Rückweg. Umfeld/Pflichtregressionen/t_konto grün
(B10-*.log). Rahmen bleibt auch bei Neuzeichnen nach Feldfehler erhalten.

B9/EIN-9/Z15: Je erster Hürde schrift/zeit/dran die doppelte feste Zeile
weggelassen, übrige Hürden behalten alle festen Zeilen. Keine neuen Texte.
Z15-Dauer explizit erhalten: 6720 ms vor/nach Wegfall, Ring/Timer verwenden
dieselbe Dauerfunktion. Gegenprobe rot, Abnahme/192 Zustände/Pflichtregressionen
grün (B9-*.log). B12 zieht den noch fest auf sechs gerechneten Scroll-Zweig nach.

B7/EIN-7: Eintritt auf direkte Inhaltskinder begrenzt, Fuß ausgeschlossen.
Gegenprobe 07c7568 rot; 20 Bilder nach Schrittwechsel x=12 und Deckkraft=1.
192 Zustände mit tatsächlich geprüftem Thema, Pflichtregressionen grün.
B8/EIN-8: vorhandenes Boot auch beim Gast ausblenden, 300 ms ohne Mindesthalt;
Timer prüft denselben DOM-Knoten und zeichnet den aktuellen Zustand.
Feste Gegenprobe rot, aktuelle Folge boot/boot--exit/Einstieg grün.
Umfeld, t_sprung/t_kontrast/t_a11y, t_boot_geometrie und t_einstieg grün
(B7-/B8-*.log). t_einstieg beschreibt bestehende Echo-Verschiebungen:
Hürden Handy 39 px, kleines Handy Ziel 4 px; kein Kontrast-/Quer-/Seitenfund.

B6/EIN-6 zurück nach zwei Änderungsversuchen (§ 6). Versuch 1:
Leerplatz unter 760 px entfernt, Fußpadding space-4; auf 375×667 Runde
675,297 px, auf 390×844 Hürden scrollHeight 852. Diagnose belegt:
Leerplatz tatsächlich 0, Padding 16; die Abnahme bleibt rot.
Versuch 2: derselbe Padding-Weg mit space-2 (8 px): Runde 667,297 px,
Hürden weiter 852 statt 844. Kein dritter Versuch; nur die beiden
B6-Änderungen zurückgenommen, B2/B3 vollständig erhalten. Neuer
scharfer B6-Test bleibt bestehen, keine Grenze gelockert oder übersprungen.
Logs: %TEMP%/paket-b-B6-B6.log, B6-diagnose.log, B6-neu-B6.log.
Paket wird mit B7 fortgesetzt; wegen offener roter B6-Abnahme kein Commit.

**Korrektur Umfeld-Messung B2–B5:** Der neue Gast-Test übergab thema wie
ein Kontotest an fullerStore; Gäste lesen jedoch die lokale Wahl. Die mit
hell beschrifteten Fälle waren deshalb ebenfalls dunkel. Die Zahlen
192 Zustände waren richtig, die Themenabdeckung war nicht belegt. Test
setzt nun adrabic-thema und verlangt data-thema === thema. Betroffene
Umfeld-Abnahmen werden frisch wiederholt; vorhandene t_kontrast-Läufe
prüften reale Kontothemen und bleiben davon getrennt. Keine alte
hell/dunkel-Behauptung als aktuelle Abnahme verwenden.

B5/EIN-5/R15-119 (D10-Dopplung): Eingabe-Abbruch für beide Scroll-Schleifen,
Listener bei Ende/Abbruch entfernt; Formular-Rückweg startet die Fahrt nicht
erneut. Gegenprobe 07c7568: wheel lässt Aufbau-RAF weiterlaufen, fertiger
Plan zieht nach Eingabe auf 259 px. Neue Abnahme wheel/touchstart/keydown,
echtes Mausrad, Normalfahrt bis unten und Rückweg oben grün. 192 angrenzende
Zustände und t_sprung/t_kontrast/t_a11y grün. Keine Dauer/Kurve verändert.

B4/EIN-4: mode-register erhält den fertigen EinstiegZurueck-Plan und
wechselt nur zum Registrierungsformular. Feste Gegenprobe 07c7568 zeigt
Ziel-Neustart statt Plan speichern; neue Abnahme Formular/Rückweg/Antworten
grün. 192 angrenzende Zustände und t_sprung/t_kontrast/t_a11y grün.
Neuer Paket-Test unterbindet Worker-Registrierung, damit feste Quellen
auch nach Neuladen gelten; echte Worker bleiben separat geprüft.

B3/EIN-3: CSS-Fußbreite 100%, weiterhin max. 420 px. Feste Gegenprobe:
97–246 px auf iPad; aktuelle Abnahme 0–7 auf 820/1180 px jeweils 420 px,
links 200/380 px, Auswahl ändert Breite/Lage nicht. 192 angrenzende
Zustände und t_sprung/t_kontrast/t_a11y grün (B3-*.log).

B2/EIN-2: feste Gegenprobe 07c7568 zeigt bei vergessen auf 320/360/390
jeweils -24,703125 px, keine/iPad unverändert. Untertitel reserviert jetzt
zwei Zeilen nur für vergessen; Abnahme auf 320/360/390/820 jeweils 0 px.
Bestehende G-039/040/041/044/083-Abnahme samt 5ad0a11-Gegenprobe grün;
t_sprung (alle vier Geräte), t_kontrast (0 Funde), t_a11y grün.
Angrenzende 390/320/iPad, hell/dunkel, ruhig/bewegt, leer/voll laufen.
Nachlauf: alle 12 Konfigurationen, jeweils 0–7 leer/voll (192 Zustände),
ohne Querscrollen, Überlagerung oder Seitenfehler grün (B2-umfeld.log).
Eigener Prüfaufbau B4/B10: Fixture zeichnete den Plan unmittelbar vor
Plan speichern; echte 400-ms-Sperre ignorierte den Tipp. Jetzt 450 ms
abgewartet. Korrigierte feste Gegenprobe B4 endet tatsächlich bei Ziel,
B10 zeigt das fehlende Kopf-Markup auf dem Formular, beide rot.

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

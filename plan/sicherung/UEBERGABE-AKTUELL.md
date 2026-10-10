# Übergabe – Stand von 10.10.2026 14:25 (wird jede Minute neu geschrieben)

Für Claude und Codex: Wer hier weitermacht, braucht keine Erklärung vom
Betreiber. Erst diese Seite, dann `plan/BETREIBER-VERSTEHEN.md`,
`plan/ALLES-OFFEN.md`, `plan/STAND.md`, `plan/ARBEITSPROTOKOLL.md`.

## Stand

- Zweig und letzter Commit: `main`, `cccc08b Sicherung 14:24 (automatisch, jede Minute)`
- Version in `app.js` (Arbeitsordner): const APP_VERSION = "3.18.30"
- Version im letzten Commit: const APP_VERSION = "3.18.29"

## Uncommittete Dateien (stehen vollständig in `plan/sicherung/entwurf-aktuell.patch`)

```
 A .agents/skills/adrabic-daten/SKILL.md
 A .agents/skills/adrabic-daten/agents/openai.yaml
 A .agents/skills/adrabic-lernbelege/SKILL.md
 A .agents/skills/adrabic-lernbelege/agents/openai.yaml
 A .agents/skills/adrabic-oberflaeche/SKILL.md
 A .agents/skills/adrabic-oberflaeche/agents/openai.yaml
 A .agents/skills/llm-council/.gitignore
 A .agents/skills/llm-council/README.md
 A .agents/skills/llm-council/SKILL.md
 A .agents/skills/llm-council/agents/openai.yaml
 A .agents/skills/llm-council/references/upstream-SKILL.md
 A .claude/skills/adrabic-daten/SKILL.md
 A .claude/skills/adrabic-lernbelege/SKILL.md
 A .claude/skills/adrabic-oberflaeche/SKILL.md
 A .claude/skills/llm-council/README.md
 A .claude/skills/llm-council/SKILL.md
 A .claude/skills/llm-council/references/upstream-SKILL.md
 M CHANGELOG.md
 M app.js
 M datenschutzerklaerung.html
 M firestore.rules
 M index.html
 M plan/werkzeuge/ladegeraet.ps1
 M plan/werkzeuge/minuten_sicherung.sh
 A plan/werkzeuge/projekt_skills.mjs
 M plan/werkzeuge/pruefstand/LIESMICH.md
 M plan/werkzeuge/pruefstand/abnahme_runde.js
 M plan/werkzeuge/pruefstand/alle_pruefen.js
 A plan/werkzeuge/pruefstand/diagnose_formular_konflikt.js
 M plan/werkzeuge/pruefstand/diagnose_karten_konflikt.js
 A plan/werkzeuge/pruefstand/diagnose_verlauf_neustart.js
 A plan/werkzeuge/pruefstand/karten_konflikte_sdk.js
 M plan/werkzeuge/pruefstand/stubs.js
 M plan/werkzeuge/pruefstand/t_nur_betreiber.js
 M plan/werkzeuge/pruefstand/t_paket_c_weiter.js
 A plan/werkzeuge/pruefstand/t_tagesantworten_sdk.js
 A plan/werkzeuge/pruefstand/x_ab_bestand_tempo.js
 A plan/werkzeuge/pruefstand/x_abnahme_hash.js
 A plan/werkzeuge/pruefstand/x_nur_betreiber_aufbau.js
 A plan/werkzeuge/pruefstand/x_spur_bestand.js
 A plan/werkzeuge/pruefstand/x_stub_batch.js
 M plan/werkzeuge/regeln/regeln-pruefung.mjs
 M sw.js
```

Auf einem sauberen Stand desselben Commits wiederherstellen:
`git apply --check plan/sicherung/entwurf-aktuell.patch`, dann `git apply plan/sicherung/entwurf-aktuell.patch`.

## Was gerade läuft

- Prozesse: node.exe 13, chrome.exe 17 (mehrere node.exe mit chrome.exe heißt meist: Tests laufen).

## Letzte Testergebnisse (vollständige Ausgaben: `plan/sicherung/tests/`)

**entwurf-3.18.28**: 37 grün, 1 rot, zuletzt: EXIT 0 t_einst (2. Lauf)
```
EXIT 1 t_paket_e
```

**ladegeraet-nurpruefen-3.18.27.log**: 153 grün, 3 rot
```
ROT t_griff_scrollen.js (27s)
ROT t_konto_fortsetzungen.js (2s)
ROT t_paket_f_netz.js (1s)
153/156 Exit 0; 3 rot. Ausgaben noch lesen: C:\Users\USER\AppData\Local\Temp\adrabic-pruefstand-gesamt\7223038b21480566
ABGEBROCHEN: Pruefstand nicht komplett gruen (Liste oben). Nichts veroeffentlicht.
```

## Zuletzt getan (aus `plan/ARBEITSPROTOKOLL.md`)

## 10.10.2026

- 14:12 Codex PaketD-Prüfer vollständig grün1244s, ganze Ausgabe gelesen:32 Schließwegvarianten mit je vier Wegen, zwei Leerlauf-/Randfallprüfungen und weitere vorhandene Zustandsmatrizen. Bestehende Aufgaben-Auswahl unverändert, keine neue D-Aufgabe behauptet.95/158 gültige Abschlüsse grün, alle95 Logs gelesen; PaketE aktiv. Quelle e595b5b6312244cd gleich.

- 14:02 Codex C27-Muster repoübergreifend gesucht: keine weiteren direkten __FB.store.set-Aufbauten, D/E auch keine direkten Map-Löschungen. Verbleibende gezielte Löschungen in Notfound/C26/Befundproben betreffen ausdrücklich verschwundene Daten, keine weiteren160 Testkarten; bestehende gültige Abnahmen erhalten. PaketD aktiv,94 grüne Abschlüsse unverändert.

- 13:50 Codex kompletter C-Sammeltest grün1223s; alle256 Fall-/Breiten-/Themen-/Bewegungsvarianten einschließlich C27 und C22 samt Kontrastausgaben vollständig gelesen. Neue Testkennung36200c315aa0, gemeinsamer Quellstand unverändert. Jetzt94/158 gültige Abschlüsse grün und alle94 Logs gelesen; PaketD aktiv. C27-Rotbeleg bleibt erhalten, keine Testgrenze geändert.

- 13:45 Codex Commitumfang gelesen: erhaltene Datenentwürfe, Prüfhilfen und zuvor angelegte Skills unverändert vorhanden; nichts verworfen/gestaged. LIESMICH um C27-Lehre ergänzt: Testkarten über Firestore-API/Listener anlegen, nicht Map/App direkt verändern. Dokumentation beeinflusst Quellstand nicht; Sammeltest weiter aktiv.

- 13:42 Betreiber „komm weiter“: Fortsetzung eingetragen, vorhandener Runner19768 bleibt allein aktiv. 93 gültige Tests bewahrt; geänderter C-Sammeltest noch nicht abgeschlossen. Keine zusätzliche Rückfrage/kein neuer Prüflauf gestartet.

- 13:37 Codex STAND auf tatsächlichen Runner19768/93 gültige Ergebnisse und dritte Aufbaukorrektur aktualisiert. Minuten-Sicherung geprüft: ein Baum12532→16564 mit aktuellem Kind21856, kein Doppelstart. Fortsetzung/Leseregister/Rotbelege für Chatwechsel dokumentiert; keine fertige Abnahme behauptet.

- 13:30 Codex C27 mit korrekt durch Batch/Listener angelegten Testkarten16/16 grün, ganze Ausgabe gelesen. Assertion200 minus20=180 und alle Auswahl-/Dialog-/Sperrfälle unverändert. App/Rules/Stub gleich, nur Testaufbau geändert. Gesamtfortsetzung35421/Node19768 bewahrt93 gültige Tests, kompletter C-Sammeltest neu; Log abnahme-gesamt-4-3.18.30.log. Reader prüft aktive Dateinamen und liest sie nicht anhand eines alten stand.json-Abschlusses vorzeitig. C27-Rotbeleg/alter Stand separat erhalten, Bericht ergänzt; großer Abschluss offen.

- 13:27 Codex C27 im Sammeltest rot: nach Löschen20/200 nur20 statt180 Karten, nicht Rückgängig (Zwischenmeldung sofort korrigiert). Eigenen Runner19272 samt begonnenem D beendet; gesamten roten C-Log/stand.json zusätzlich erhalten. 93 grüne,94 vollständige Abschlusslogs gelesen. C27 fügte160 Testkarten direkt in App und Map ein, ohne Snapshotmeldung; beim strukturellen Neuaufbau liefert Listenercache nur ursprüngliche40 minus20. Testaufbau verwendet jetzt echten vorhandenen Stub-API-Batch und wartet auf200 Karten, alle Auswahl-/Löschassertions gleich. C27 gezielt allein aktiv; Produkt/Rules/Sharedhash unverändert.

- 13:14 Codex Gesamtstand93/158 grün; alle93 vollständigen gültigen Abschlusslogs gelesen, einschließlich PaketB sowie C1/C2/C11–C14/C17 (Kalendertagversatz0–6). Weiterlernen-Test aktiv. Leseregister aktuell; Produkt/Rules/SDK-Quellstand unverändert. Tokenpräferenz dauerhaft dokumentiert, kompakte Kontrollroutine statt wiederholter ausführlicher Abfragen.

- 13:04 Codex Nachfrage zur Begrenzung beantwortet und Regel präzisiert: keine starre Tokenobergrenze; notwendige Auswertung/Fehlerklärung bleiben vollständig. Routine und Kommunikation sparsam, keine ungeprüften Freigaben.

- 13:03 Codex ausdrücklichen Wunsch zum Festhalten der Tokenpräferenz umgesetzt: BETREIBER-VERSTEHEN mit Originalwortlaut, Skriptbetrieb/knapper KI-Auswertung und konkreten ladegeraet-Unterschieden ergänzt; Wunsch in ALLES-OFFEN erledigt dokumentiert. Reine Dokumentation, bestehender Prüflauf bleibt aktiv.

- 13:01 Codex Betreiberfrage zu Tokens/ladegeraet geklärt: tatsächlichen Wrapper gelesen, -NurPruefen -Fortsetzen gleicher Gesamtprüfer, aber sauberer Gitstand vorausgesetzt und iPad-Seed11 statt Paket-Seed7; ohne NurPruefen Veröffentlichung. Bestehenden Lauf weiterführen, knappe Auswertung. 90/158 grün, vollständige Logs bis PaketC/C-Fort gelesen, keine neue Quelle geändert. Wunsch in ALLES-OFFEN eingetragen.

- 12:52 Codex korrigierter t_nur_betreiber vollständig grün: sieben Bildschirme je Handy/Desktop HTML und Pixel identisch für normales Konto; drei Gegenproben erkennen Betreiberfreigabe, Schriftentsperrung und unzulässige Textfreigabe. Ganze Ausgabe gelesen, neuer Testhash d4acf692, kein historischer Checkout/Server benutzt. Fortgesetzter Gesamtstand87/158 grün, alle87 gültigen Abschlusslogs gelesen; Original-Aufbaufehler bleibt separat. Runner15139/Node19272 jetzt PaketB, Quellen e595b5b6312244cd unverändert. Keine Wiederholung86 gültiger Tests/kein Deploy.

- 12:50 Codex zweite Aufbaulücke im Gesamtlauf:86 grün, t_nur_betreiber vor Browserstart rot bei unnötigem historischem Worktree-Aufbau. Eigenen Runnerbaum18936/gerade gestartetes PaketB beendet, alle87 fertigen Logs gelesen und roten Einzellog/stand.json zusätzlich gesichert. Normaler Vergleich arbeitet seit PaketC ausschließlich am aktuellen Stand; historischen Checkout/Server deshalb nur in bestehendem --historisch-Zweig anfordern, Browser-/HTML-/Pixel-/Gegenproben unverändert. Reine VM-Aufbauprobe ohne Git-/Servermutation grün, fester Vorstand315bb0e rot genau beim unnötigen Checkout (2 Aufrufe); ganze Ausgaben gelesen. Kein neuer Worktree angelegt, keine vorhandenen Ordner bereinigt; Produkt/Rules/Stubhash e595b5b6312244cd gleich. Fortsetzung mit tatsächlichen Quellen-/Testhashes bewahrt86 gültige Tests, nur geänderten/roten und unvollständige neu. Mainlog abnahme-gesamt-3-3.18.30.log; Leserregister für geänderten Test zurückgesetzt, alte rote Ausgabe erhalten.

- 12:45 Codex75/158 grün, alle75 vollständigen Abschlusslogs gelesen. Kontrast0, paralleles SDK-Laden mit alter Wasserfall-Gegenprobe, Lernstart28 Zustände und zwölf bestehende Lernregelregressionen grün. Keine neue Lernregel/Empfehlung/Lernwirkungsbehauptung; keine zusätzlichen Simulationen. Eine Minuten-Sicherung12532/16564 weiterhin aktiv, Übergabe/automatische Sicherungen fortgeschritten. Report/STAND und Leserregister aktualisiert, Gesamtlauf87583 allein weiter.

- 12:42 Codex70/158 grün, alle70 vollständigen Abschlusslogs gelesen. Kontofortsetzungen samt zahlreichen festen Gegenproben, Lösch-Zeitlimit/Offline-Sperre, Wechsel während Löschung und alte Speicher-/Stapelantworten isoliert. Aktuell Kontrastprüfung, einziger Browserlauf87583 bleibt aktiv. Keine Produktionsdaten/Authentifizierungsbelege, App/Regeln unverändert, kein Paketcommit/Deploy.

- 12:38 Codex62/158 abgeschlossene Prüfungen grün, alle62 vollständigen Ausgaben gelesen und im Leserregister gesichert. Kartenblatt vier Konfigurationen, fremde Karten-/Feldechos, kleine Bootlage, Konto-Lösch-/Abbruch-/Google-Attrappenfälle und alter Dialog/Bestätigung nach Kontowechsel grün. Keine echte Google-/iPhone-Authentifizierung daraus behauptet. Gesamtlauf läuft jetzt Kontofortsetzungen allein; Produkt/Rules weiterhin gleicher Entwurf, keine Tests ausgelassen/Grenzen verändert.

- 12:32 Codex50/158 grün, vollständige Abschlusslogs1–50 gelesen. Üben/Serie und echte Wiederholung getrennt erhalten, alte/neue Ideenzeitstempel richtig sortiert, Import gleichnamiger Bereiche erhält alle fünf Karten. Gelesene Testnamen samt Quellstand jetzt explizit abnahme-gelesen-3.18.30.json für nahtlosen Anschluss; keine automatisch ungelesene Ausgabe abhaken. Lauf87583 aktiv, Prüfgrenzen und Produkt unverändert.

- 12:31 Codex Gesamtlauf47/158 grün, alle47 vollständigen Logs gelesen. Rückmeldung24 Varianten, Fehlerfokus/-Entwurferhalt, Fortschritt12 Varianten, Scrollen im Gesamtlauf, große Ansichten28 Zustände, Datum/Bereichszähler grün. Vier aktuelle Rundenbilder tatsächlich angesehen und gesichert (plan/sicherung/tests/abnahme-rundenfotos-3.18.30), Knöpfe/Antwort im Bild; keine iPhone-Abnahme daraus. Beschreibende Tempoausgaben erhalten: Bewerten max53ms, Fortschrittwechsel209ms/max233ms Bildlücke; große Erstansicht445ms. Keine allgemeine Flüssigkeitszusage oder ungeprüfte Ursache. Zwischenmeldung zum aktiven Test war zu früh geraten (Verwalten statt Fotos); tatsächliche Prozesszeile gelesen, fortan im Standleser mitgeführt. Kein App-/Regelwechsel, Lauf87583 weiter allein aktiv.

- 12:24 Codex frischer Gesamtlauf32/158 grün, alle32 Abschlusslogs vollständig gelesen: Einstellungs-/Einstiegsvarianten, Bestandskonto, Probekarte, Scroll-/Lagenmessung, Kalender-UID/Uhrzeit einschließlich Gegenproben. Beschreibende mobile Einstiegsverschiebung39px in älteren gesicherten Logs identisch; kein neuer Produktfehler daraus behauptet. Ein voriger Zwischenlog-Pfad t_einstieg war vor dessen Start angenommen, tatsächlichen Prozess/Dateien nachgelesen; keine Testquelle/Ergebnisse verändert. Lauf87583 weiter allein aktiv am e595b5b6312244cd. Rest Gesamtlauf/Affe/Runden-Auswertung/Abschluss bleibt.

- 12:17 Codex Gesamtlauf25/158 grün, alle25 vollständigen Abschlusslogs gelesen. Bestands-Tempo erneut im Gesamtlauf grün,3000er-Bewertungen max61ms; Teilen/Import/Sicherung drei Breiten ohne Kontrast-/Seitenfehler, Timergegenprobe/Doppeltipp/Drehlage (vier Breiten0px) grün. Beschreibende Einstellungs-/Geometrieausgaben ebenfalls gelesen, keine neuen Produktbefunde daraus. Läuft allein weiter, keine Abnahme vor vollständigem Lauf/Affe/Runde.

- 12:12 Codex frische Abschlusslogs1–9 vollständig gelesen: Erinnerungs-/Ideenhinweise, a11y, abgelehnte Bewertung, Abstimmfehler, Anmeldung/Enter, Ansagen und Bereiche alle grün; historische Gegenproben erwartbar rot. Shared-Stub-Diff vollständig gegengelesen, Syntax grün; Diagnosewerkzeuge für Minutenpatch erfasst, Trace/CPU-Profil zusätzlich ins Repo kopiert. SDK-Gültigkeit anhand tatsächlicher Route geprüft: nur unverändertes AUTH aus stubs.js, echtes Firestore; 16/8-Fälle nicht wiederholt. Vorbereitungsseite um aktuellen Lauf berichtigt, frühere Historie erhalten. Gesamtlauf87583 weiterhin allein aktiv, kein neuer Produktbau/Deploy.

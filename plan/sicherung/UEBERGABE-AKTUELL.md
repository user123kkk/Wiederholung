# Übergabe – Stand von 10.10.2026 15:11 (wird jede Minute neu geschrieben)

Für Claude und Codex: Wer hier weitermacht, braucht keine Erklärung vom
Betreiber. Erst diese Seite, dann `plan/BETREIBER-VERSTEHEN.md`,
`plan/ALLES-OFFEN.md`, `plan/STAND.md`, `plan/ARBEITSPROTOKOLL.md`.

## Stand

- Zweig und letzter Commit: `main`, `62f2fb82 Sicherung 15:10 (automatisch, jede Minute)`
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
 M plan/ALLES-OFFEN.md
 M plan/ARBEITSPROTOKOLL.md
 M plan/STAND.md
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
 M plan/werkzeuge/pruefstand/t_rechtsplan.js
 A plan/werkzeuge/pruefstand/t_tagesantworten_sdk.js
 A plan/werkzeuge/pruefstand/x_ab_bestand_tempo.js
 A plan/werkzeuge/pruefstand/x_ab_tempo_reihenfolge.js
 A plan/werkzeuge/pruefstand/x_abnahme_hash.js
 A plan/werkzeuge/pruefstand/x_nur_betreiber_aufbau.js
 A plan/werkzeuge/pruefstand/x_rechts_clip.js
 A plan/werkzeuge/pruefstand/x_spur_bestand.js
 A plan/werkzeuge/pruefstand/x_spur_rechtsplan.js
 A plan/werkzeuge/pruefstand/x_spur_text_tempo.js
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

- 15:10 Codex zweiter A/B-Vergleich mit ausgeglichener Reihenfolge vollständig gelesen: achtmal identisches #app-DOM (Hash2f26be52), Verwalten alter Median286ms/6 rote Messungen, Entwurf212ms/4; Text162/150ms, keine Überschreitung. Erste pauschale Verlangsamungsdeutung dadurch nicht gehalten; Schwankung/Layoutkosten beider Quellen belegt, keine abschließende Ursache/Fehlerfreiheit. Rohtraces/CPU-Profile gesichert. Gesamtlauf einmal nach Diagnose am unveränderten Stand fortgesetzt (Runner14360/Sitzung53308),144 gültige grüne bewahrt, fehlende14 einschließlich Original-Tempo erneut; keine Wiederholungsschleife bis grün. Rest/Affe/Runde beenden, Tempo-Befund unabhängig vom nächsten Einzelwert offen behandeln.

- 15:08 Codex acht vorgeschriebene A/B-Paare gelesen: Verwalten alter Median188ms/2 Überschreitungen, Entwurf279ms/6; Text144/148ms. Daraus zunächst Entwurf langsamer gemeldet. Traces am unveränderten Originaltest beider Quellen vollständig gelesen: gleiche Layoutobjektzahlen156/397, Hauptkosten Browserlayout/HTML-Aufbau; alter Trace373ms, neuer178ms für Verwalten, Trace kostet selbst Laufzeit. Noch keine abschließende Ursache. Ausgleich der A/B-Reihenfolge und DOM-Gleichheit mit tatsächlicher Messhilfe begonnen. Eigener Diagnoseanker scheiterte an CRLF vor Browserstart; Log erhalten, Quellnormalisierung korrigiert, zweiter Diagnoseaufruf aktiv. Produkt/Assertions gleich, Abnahme weiter gesperrt.

- 15:04 Codex t_text_tempo rot226ms bei200ms/CPU4x; vollständigen Log gelesen, eigenen Runner14916 samt begonnenem Text-Zustandstest beendet.144 grüne/145 vollständige Abschlusslogs erhalten, rote Ausgabe/stand.json separat gesichert. Originaltest und vorgeschriebene x_ab_tempo-Messhilfe gelesen; acht feste Vergleichspaare mit315bb0e gestartet, kein weiterer Browserlauf. Keine Ursache vorweggenommen, keine Produkt-/Testgrenzenänderung; Paketabschluss gesperrt bis Klärung.

- 15:01 Codex143/158 gültig grün; alle143 vollständigen Abschlusslogs gelesen. A16 frisch22 SDK-Fälle am unveränderten4a8ca5a1/6a110898, Service-Worker-Offline/Update samt festen Gegenproben grün. Text-Neu-Test aktiv, Probelauf unverändert. Stand/Ideenzuordnung samt lokalen Links geprüft; Abschlussbericht nachgezogen. Netzteil2 bestätigt, keine Veröffentlichung.

- 14:55 Codex vollständige TikTok-Nachricht einschließlich Betreiberkommentaren als Quelle unter ideen/TIKTOK-SAMMLUNG-2026-10-10.md bewahrt. Wünsche in ALLES-OFFEN/BETREIBER-VERSTEHEN und vorhandene Onboarding-, Mehrwert-, Konsolen-, Geräte- und Monetarisierungspläne eingefügt; keine parallele Statusliste. Historische Onboarding-Zahlen nicht als Sperre; automatische Tests vor Betreiberaufwand. Primärrecherche/Architekturprüfung offen, Videoaussagen nicht als geprüfte Empfehlungen übernommen. Kein Produktbau/Deploy, bestehende3.18.30-Abnahme fortgesetzt.130/158 grün; alle130 Abschlusslogs vollständig gelesen, Sprung/Üben aktiv.

- 14:44 Codex119/158 grün, alle119 vollständigen Logs gelesen; Rundenlage vier Chromium-Handygrößen, Geometrie0px/Scroll0, Bereichsrunde/Undo/Weiterlernen geprüft. Beschreibender t_runde_rest meldet links per Maus NICHTS; tatsächlichen Messpfad gelesen (Maus, Offen-Zustand statt Kartenstand). Daraus keine Wischfreigabe abgeleitet; vorgeschriebene Touch-/Schrägwisch-Abnahmen folgen im selben Gesamtlauf. Rundenende aktiv, Quellen unverändert.

- 14:40 Codex korrigierte Rechts-Abnahme komplett grün40s:320/390/820 hell/dunkel, vollständiger Inhalt, sichtbarer Kontrast, alle Rückwege/Eingabenerhalt und Fehler/Neuversuch/späte Antwort. Neue Testkennung292d3e77; ganze Ausgabe gelesen. Verzögerte Registrierung samt echter12/13s-Grenze/fester Gegenprobe und vorhandene Regler-Regressionsausgaben gelesen. Gesamt112/158 gültig grün, alle112 Abschlusslogs gelesen; Reihenfolge-Limit aktiv. Quellen unverändert, keine Lernempfehlung.

- 14:38 Codex t_rechtsplan rot bei Tablet/hell: zwei A-Links1.89 statt4.5. Eigenen Runner19768/angefangene Registrierung beendet; vollständigen roten Log/stand.json gesichert,109 grüne und110 vollständige Logs gelesen. Unveränderten Test mit Messspur ausgeführt, Screenshot tatsächlich angesehen: Links bei y1057–1079 außerhalb Scrollclip256–905, unsichtbar. Kontrastleser benennt klassenlose Links als A, Sichtfilter suchte nur className und behielt sie als unbekannt. Testfilter verwendet nun denselben Klasse/Tag-Schlüssel und alle gleichnamigen Treffer; sichtbare/teilweise sichtbare/doppelte/unbekannte schlechte Kontraste bleiben erhalten. Originalfilter-VM-Proben grün, feste315bb0e-Gegenprobe rot genau beim abgeschnittenen Link; komplette Ausgaben gelesen. Nur Testzuordnung geändert, Grenze4.5/App/CSS/Rules gleich. Oberflächen-Skill geladen. Runner14916/Sitzung58908 fortgesetzt,109 gültige Ergebnisse bewahrt, Log abnahme-gesamt-5-3.18.30.log; aktiven Log nicht vorzeitig abhaken.

- 14:30 Codex Gesamtstand102/158 grün, alle102 vollständigen Abschlusslogs gelesen: F-Bildvergleich zwölf Varianten0 Fehlerpixel, lebende CSS-Nachbarn/Ebenen, Netzwerkfehler0, Struktur und sichtbare Wörter/Sicherung geprüft. Textausgaben tatsächlich gelesen, keine pauschale Lernwirkungszusage. F-Umfeld aktiv; gemeinsamer Stand unverändert, Abschluss/Affe weiterhin offen.

- 14:27 Codex PaketE-Prüfer komplett grün938s, ganze Ausgabe gelesen:30 vorhandene lokale Abnahmen, E17/E26 wie bisher ausdrücklich ausgenommen. Sicherungsdatei/ICS nur Chromium; iOS/Android-Geräte bleiben offen. Kontowechsel, Zeitlimit/Teilerfolg, Profil/Plan, Ruhetagsregressionen und Geometrie geprüft, keine Lernwirkungs-/Gerätezusage.96/158 grün, alle96 Abschlusslogs gelesen; F-Bilder aktiv.

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

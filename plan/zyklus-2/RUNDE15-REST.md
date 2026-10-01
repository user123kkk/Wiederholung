# Gesicherte Restbefunde aus runde15

Quelle: unverändert aus Commit `4462fac`, nur Kennungen auf `R15-` umbenannt.
Sie sind keine zusaetzlichen Bauauftraege fuer dieses Paket-A-Gespraech.
Die Spalte Stand stammt aus dem gesicherten Zweig; aktuelle Nachlese unten.

## Nachlese auf 3.18.10, 01.10.2026

`ja` bezeichnet den vorhandenen Codepfad bzw. die Prüflücke, keinen neuen
Laufzeitnachweis. Alle 15 Originalzeilen sind unten genau einmal gesichert.
R15-112 und R15-123 gehören sachlich zu Daten sicher; die jetzige Umsetzung
bleibt auf A1–A13 begrenzt. Nicht aufgrund dieser Sicherung bauen.

| Kennung | Im Stand 3.18.10 noch vorhanden | Aktueller Beleg / Zuordnung |
|---|---|---|
| R15-112 | ja | `openDialog` ersetzt `ui.dialog` ohne Auflösen; weiterer Daten-Folgeauftrag |
| R15-116 | ja | Token-/Bestätigungs-Fortsetzungen prüfen App-User, nicht SDK-User vor Callback; weiterer Daten-Folgeauftrag |
| R15-118 | ja | `einstieg-bewerten` setzt die Bewertet-Klasse am bestehenden Kartenknoten nicht; Onboarding-Folgeauftrag |
| R15-119 | ja | beide Auto-Scroll-Schleifen ohne Eingabeabbruch, Aufbau-Dauer fest sechs; deckt sich mit B5/D10, nur einmal beheben |
| R15-120 | ja | Sticky-/Probe-Kommentare in app.js und styles.css; deckt sich mit B12, dessen Umfang abgleichen |
| R15-121 | ja | `veroeffentlichen.ps1` prüft `diff-tree` des Tip-Commits; Archivprüfung kann Git-Vergleich nicht durchführen; Werkzeug-Folgeauftrag |
| R15-122 | ja | `lekF.filter(x => lektionSitzt(bF, x))`, danach erneut je Lektion ohne gemeinsamen Index; Fortschritt-/Tempo-Folgeauftrag |
| R15-123 | ja | `lehrerFreigeben`: lokal nur nach Write-Erfolg, kein Server-Abgleich nach Zeitlimit; Regel strikt aufwärts; Daten-Folgeauftrag |
| R15-124 | ja | `umzugStarten`: doppelte ID durch `genId()` ersetzt, Kommentar behauptet dieselbe ID; Daten-Folgeauftrag |
| R15-125 | ja | `runde14_fortsetzungen.js` nur aktueller Code; Board-Gegenprobe deckt nur Einreichen/Abstimmen; Test-Folgeauftrag |
| R15-126 | ja | eigener Pending-Write kehrt vor `letzterNutzerKopf` zurück; tatsächliche SDK-Wirkung noch prüfen; Daten-Folgeauftrag |
| R15-127 | ja | neue Epoche leert `verlaufOffen`; Serien-Daten, alte Frage E-20 bleibt gesperrt, keine neue Freigabe |
| R15-128 | ja | Reset-/Epochen-Pfade und Regel für alte Ganzwerte vorhanden; genaue Verluste mit SDK noch prüfen; Daten-Folgeauftrag |
| R15-129 | ja | Wischtest legt drei Grenzen selbst fest; Mehrgeräte-Verlaufstest ohne feste Gegenprobe; Test-Folgeauftrag |
| R15-130 | ja (Verdacht) | laufendes SDK-deleteUser und Adresszuordnung des Registrierungs-Nachtrags; unverändert nur Hypothese, echtes SDK erforderlich |

## Gesicherter Originalwortlaut

| Kennung | Befund | Schwere | Wer | Modell | Historischer Stand / Abnahme |
|---|---|---|---|---|---|
| R15-112 | Neuer Dialog ersetzt den bisherigen, ohne dessen Aufrufer als Abbruch aufzulösen | mittel | Agent | Sol | offen: dialog_ersetzt.js --befund und feste Gegenprobe a4b5677; Confirm/Prompt/Alert bleiben offen. Abnahme verlangt abgeschlossene erste Promise mit false/null/undefined und unveränderten zweiten Dialog; Folgerunde nach Runde15 |
| R15-116 | Token-/Bestätigungsantwort lädt die Seite trotz bereits gewechseltem SDK-User neu, bevor der App-Auth-Callback eintrifft | mittel | Agent | Sol/Astra | offen: konto_sdk_vor_callback.js --befund / --gegenprobe a4b5677; drei normale Navigationen erhalten, drei SDK-Wechsel ohne App-Callback abbrechen. Keine fremde Datenlöschung behauptet; Folgerunde |
| R15-118 | Probekarte im Einstieg leuchtet beim Bewerten nicht auf; das Aufleuchten kommt erst beim nächsten Neuzeichnen, also ohne Anlass | niedrig | Agent | Sol | offen: Claude-Prüfung 29.09. (.42–.46). Klick-Zweig `einstieg-bewerten` ersetzt nur `.einstieg-bewertung`, setzt `einstieg-karte--bewertet` nicht; die Klasse entsteht nur in render() (`app.js` „einstieg-karte--offen“), `einstieg-glanz` hängt an ihr (`styles.css:4067`). Abnahme: Glanz genau einmal direkt nach dem Tippen, kein zweites Aufleuchten bei späterem render(); ruhig-Modus ohne Glanz |
| R15-119 | Automatisches Mitscrollen beim Plan-Aufbau und fertigen Plan lässt sich nicht unterbrechen; Dauer fest auf sechs Punkte | mittel | Agent | Sol | offen: Claude-Prüfung 29.09. (.46). `einstiegBauAutoScroll`/`einstiegPlanAutoScroll` rufen jeden Frame `scrollTo`, ohne bei touchstart/wheel/keydown abzubrechen (~6,7 s + 3,6 s); Dauer `6 * EINSTIEG_BAU_SCHRITT_MS` statt `einstiegBauDauer(n)` bei 4–6 Punkten. Abnahme: eigener Wisch/Scroll beendet die Automatik sofort, Endpunkt passt bei 4 und 6 Punkten, Übergang Aufbau→Plan ohne Sprung (Übergabe 27.09. § 8: angrenzende Screens prüfen) |
| R15-120 | Veraltete Kommentare zum zurückgebauten Sticky-Fuß und zur entfernten `.einstieg-probe`-Karte | niedrig | Agent | Luna | offen: Claude-Prüfung 29.09.; `app.js` Kommentare „sticky haengt am Fuss“, „sticky) Bereichs“, „folgt dem jeweils neu erscheinenden Punkt“; `styles.css:1932`. Nur Kommentare |
| R15-121 | Veröffentlichen-Batch prüft csp-build nur am letzten Commit; `pruefe_stand` überspringt die Prüfung in der Archiv-Kopie und meldet trotzdem „geprüft“ | niedrig | Agent | Sol | offen: Claude-Prüfung 29.09. (fb3e1a0). `veroeffentlichen.ps1` `diff-tree` nur für den Tip-Commit; eine `firebase.json`-Änderung in einem früheren, noch nicht veröffentlichten Commit fällt durch. Abnahme: Vergleich gegen den zuletzt veröffentlichten Stand oder ehrliche Meldung |
| R15-122 | Statistik/Lektionen bauen je Lektion eine eigene Karten-Map (`lektionSitzt` ohne `byId`) | niedrig | Agent | Sol | offen: Claude-Prüfung 29.09. (.47, Rest von G-037). `app.js` Statistik `lekF.filter(x => lektionSitzt(bF, x))` u. a.; bei 6000 Karten/300 Lektionen etwa 600 Map-Aufbauten je Render. Abnahme: gemeinsamer Index, Messung vorher/nachher mit CPU 4× |
| R15-123 | Lehrer-Freigabe: nach Zeitlimit oder Kontowechsel bleibt lokal N-1, obwohl der Server N schon hat; nächstes „Freigeben“ scheitert dauerhaft an der Regel `offenBis >` | mittel | Agent | Sol/Astra | offen: Claude-Prüfung 29.09. (.56, Muster schon vorher durch `mitZeitlimit`). `lehrerFreigeben`: `b.teilFreigabe` nur nach bestätigtem Write; `firestore.rules:357` verlangt größer. Kein Rückabgleich vom Server. Abnahme: nach Zeitlimit/Abbruch zeigt die App den Serverstand bzw. „Freigeben“ gelingt beim nächsten Versuch; keine Regeländerung ohne Emulator-Test |
| R15-124 | Umzug: doppelte Karten-IDs bekommen bei jedem Neustart eine neue Zufalls-ID; nach abgebrochenem Umzug bleibt eine verwaiste Doppelkarte | niedrig | Agent | Sol | offen: Claude-Prüfung 29.09.; `umzugStarten` `c.id = genId()`, Kommentar „harmlos, weil unter derselben ID“ stimmt dafür nicht. Nichts geht verloren. Abnahme: deterministische Ersatz-ID (z. B. aus Bereich-ID + alter ID), Test mit Doppel-ID und Abbruch nach erstem Stapel |
| R15-125 | Prüflücke: `feedbackLaden`, `feedbackStatusAendern`, `feedbackLoeschen` (3.17.56) ohne Werkzeug bzw. ohne feste Gegenprobe | niedrig | Agent | Sol | offen: Claude-Prüfung 29.09.; `runde14_fortsetzungen.js` liest nur den aktuellen Stand, `konto_board.js` deckt nur Einreichen/Abstimmen. Abnahme: Gegenprobe gegen `c4a2ccf` |
| R15-126 | Server-Bestätigung eines eigenen Nutzerdokument-Writes löst mitten in der Runde ein volles render() aus | mittel | Agent | Astra | offen: Claude-Prüfung 29.09. (.50). `onSnapshot(userDocRef, { includeMetadataChanges: true })`: Das eigene Echo kehrt bei `hasPendingWrites` zurück, **bevor** `letzterNutzerKopf` nachgezogen wird; die spätere Bestätigung gilt deshalb als `nurVerlauf=false` und rendert trotz `ui.session` (Symptom wie G-094). Codepfad belegt, sichtbare Wirkung mit echtem SDK/Emulator prüfen (Attrappe kennt keine Metadaten-Ereignisse). Abnahme: Streak-/Settings-Write in laufender Runde ersetzt weder Karte noch Zeichenfläche |
| R15-127 | Nach einem Verlauf-Reset auf Gerät A verwirft Gerät B seine danach, aber mit alter Epoche entstandenen Antworten | niedrig | B | Astra | wartet: E-20. Claude-Prüfung 29.09. (.50). `verlaufEpocheUebernehmen` setzt `verlaufOffen = {}`; Ablehnungspfad in `persistVerlauf`. Folge: Tag kann in der Serie fehlen. Berührt Serien-Daten → Vorschlag an den Betreiber (Umbuchen auf neue Epoche statt verwerfen), nicht ohne Freigabe bauen |
| R15-128 | Abgelehnter Reset: Antworten bis zum Rückroll-Snapshot gehen still verloren, Anzeige ohne render(); alte Clients bis 3.17.49 umgehen die Epochen-Regel | niedrig | Agent | Sol | offen: Claude-Prüfung 29.09. (.50); `app.js` Reset-Ablehnung und `firestore.rules` `verlaufEpocheOk` (ganze Tageswerte ohne Epoche gehen durch). Übergangslücke; Kommentar „weder wiederbeleben“ präzisieren |
| R15-129 | Prüflücken: `t_wisch_tempo.js` setzt die Wischgrenzen selbst statt sie aus `app.js` zu lesen; `t_verlauf_mehrgeraete.js` ohne feste Gegenprobe | niedrig | Agent | Luna | offen: Claude-Prüfung 29.09. (.50) |
| R15-130 | Seltene Auth-Randfälle: anderer Tab meldet während `deleteUser(A)` ein Konto B an (SDK meldet danach ab); offener Registrierungsauftrag nach Zeitlimit wird nur über die Adresse zugeordnet | niedrig | Agent | Astra | offen: Claude-Gegenprüfung Runde 15 (F4/F5), Vermutung aus SDK-Verhalten bzw. Codepfad, kein Datenschaden belegt. Erst mit echtem SDK nachstellen, dann einstufen |

# Umsetzung der Lernlogik-Änderungen

Wörtlich aus dem Chat 981b69a1, Agent 24, gestartet 2026-10-07 15:55 (Quelle: `agent-aedd357b8ae4ed3ce.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 13 Agenten der ZWEITEN Runde für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build: app.js ~820 KB, styles.css, index.html, sw.js; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server). Betreiber ist ein Einzelner, Nutzer bisher er und wenige Freunde; Ziel: öffentliche, ernsthafte Lern-Website für deutschsprachige Muslime, die Quran-/klassisches Arabisch lernen.
Der Betreiber hat entschieden: Er will ALLES Nützliche aus Runde 1 bauen, egal wie schwer. Runde 2 soll tiefer schauen. Die Lernlogik darf nur mit seiner ausdrücklichen Entscheidung geändert werden – deine Aufgabe ist, ihm diese Entscheidungen so vorzubereiten, dass er sie treffen kann.
RUNDE 1 zur Lernlogik: 12 Stufen, Abstand 1,8^(Stufe−1) Tage, Deckel 180, ±15 % Streuung (app.js ~122-148). "Sicher" +1 Stufe; "Fast" −1 Stufe, morgen; "Nicht" −2 Stufen, heute fällig, ans Ende der Runde (gradeCard ~5985-6069). Bestätigter Fehler A: "Nicht" und danach "Sicher" in derselben Runde ergibt sofort wieder den vollen Abstand der neuen Stufe. Bestätigter Fehler B: Sitzungslimit schneidet die ersten N in Kartenreihenfolge statt der dringendsten (startSession ~5893, dueCardsFor ~3790). Vorschläge: (1) A beheben; (2) nach Dringlichkeit sortieren; (3) neue Karten erst nach zwei richtigen Abrufen aus der Runde; (4) Rückkehr nach Pause: Berg über Tage strecken; (5) Ruhetag für die Serie (Z6b in plan/zyklus-2/ENTSCHEIDUNGEN.md); (6) Urlaubsmodus; (7) Hinweis "heute keine neuen" bei Überlast in eigenen Bereichen; (8) zweite Richtung Deutsch→Arabisch als Stufen-Tor; (9) Handschrift in der normalen Runde; (10) Abfrage ohne Harakat, evtl. an Stufe gekoppelt; (11) Trefferquote über zwei Tageszähler, evtl. kompakter Verlauf je Karte; (12) Regler aus dem Texte-Probelauf (abstandFaktor, festErgebnisse) auf Karten ausdehnen; (13) "Karte überspringen"; (14) alles Fällige über Bereiche in einer Runde.
HARTE REGELN: NUR LESEN im Repo. Keine Datei anlegen/ändern, keine git-Befehle außer lesenden, keine Tests/Server/Skripte starten (du darfst Testdateien LESEN). Du darfst im Scratchpad-freien Kopf rechnen oder ein kleines Rechenbeispiel per node -e ausführen, das NICHTS aus dem Repo verändert und keine Repo-Skripte startet. app.js nie komplett lesen.
AUSGABEFORMAT (Deutsch, max. ca. 1100 Wörter): Teil 1 je Vorschlag (1)–(14): genaue Code-Stellen (Datei:Zeile, Funktionsnamen), was sich konkret ändern müsste (in Worten, kein Code-Diff), welche gespeicherten Felder/Regeln (firestore.rules) betroffen sind, was mit BESTEHENDEN Daten der Nutzer passiert (Migration nötig?), welche vorhandenen Tests unter plan/werkzeuge (t_*.js – Namen nennen) die Stelle absichern und welche neu nötig wären, Nebenwirkungen auf Serie/Fortschritt/Lektionsschloss (maxStufe, offeneLektionIds)/Rückgängig (lastAction)/Mehrgeräte, Aufwand S/M/L. Teil 2 "Fragen an den Betreiber" (5–10 Fragen): jede mit 2–3 Sätzen Hintergrund IN ALLTAGSSPRACHE mit einem Zahlenbeispiel ("Eine Karte, die du 2 Monate nicht gesehen hast …"), den Auswahlmöglichkeiten, was sich für ihn beim täglichen Lernen spürbar ändert, und deiner Empfehlung.

DEIN AUFTRAG: Arbeite die 14 Punkte am Code durch wie oben beschrieben. Zusätzlich: Simuliere überschlägig (im Kopf oder per kleinem node -e ohne Repo-Zugriff) für einen Bestand von 500 Karten mit 10 neuen pro Tag und 90 % bzw. 80 % Trefferquote die tägliche Last nach 30/90/180 Tagen mit der heutigen Regel und mit Korrektur A – damit der Betreiber sieht, was die Korrektur an Mehrarbeit kostet. Prüfe, ob Vorschlag (4) "Berg strecken" ohne neue Felder geht (nur Auswahl der heutigen Runde nach Dringlichkeit + Deckel) oder ob Fälligkeiten wirklich umgeschrieben werden müssten, und was davon weniger riskant ist. Prüfe für (5) und (6), wie die Serie heute gerechnet wird (Grep "streak", "serie", "joker", "tagGelernt") und was "Tag ohne Fälliges" genau heißt. Nenne am Ende eine empfohlene Reihenfolge der 14 und welche man zu EINEM gemeinsamen Umbau bündeln sollte, damit die Lernlogik nur einmal angefasst und einmal vollständig geprüft wird.

## Bericht des Agenten

## Lernlogik Runde 2: Code-Prüfung der 14 Vorschläge

Nur gelesen, nichts verändert. Die Tests habe ich nur per Grep zugeordnet, nicht einzeln gelesen. Für die Bewertungslogik (A, Sortierung) habe ich keinen gezielten Test gefunden; diese Zuordnung ist nicht abschließend geprüft.

### Befunde vorab
- **Fehler A bestätigt:** `gradeCard` (app.js:6023–6032). Die Runde merkt sich nicht, dass eine Karte heute "Nicht" bekam.
- **Fehler B bestätigt:** `dueCardsFor` (3790–3798) sortiert nur "Wiederholungen vor neuen", sonst in Kartenreihenfolge. `startSession` (5897) schneidet per `slice`. Der Kommentar in 5895 behauptet "die 10 dringendsten"; das stimmt nicht.
- **Serie heute:** `serieAktuell` (3031–3065) rechnet rein aus dem Tagesprotokoll `verlauf`. Ein Tag zählt, wenn `tagGelernt` (965) wahr ist, also w+n+t > 0; Üben (u) zählt nicht. Ein Lückentag wird verziehen, wenn seit dem letzten verziehenen mindestens 7 Tage gelernt wurden (`SERIE_JOKER_TAGE`, 3022).
- **Karten reißen die Serie nicht mehr:** Der alte Überfällig-Block in `evaluateStreakForNewDay` ist mit `if (false && …)` abgeschaltet (2961).
- **"Tag ohne Fälliges" ist nirgends definiert.** Am nächsten liegt `bereicheMitOffenem` (3113): nur Wiederholungen, ohne gesperrte Lektionen, ohne länger als 14 Tage Liegengebliebenes (`istLiegengeblieben`, 561). `dueCards` zählt dagegen auch neue Karten mit.
- **Regeln:**
  - `settingsOk` hat `hasOnly` (firestore.rules:122). Jede neue Einstellung braucht eine Regeländerung vor dem Hosting.
  - `streakOk` (104) hat kein `hasOnly`; neue Serienfelder gehen ohne Regeländerung durch.
  - `verlauf` wird nur auf Größe ≤ 400 geprüft (140); neue Tagesschlüssel sind erlaubt.
  - `kartenFelder` (229) ist eine feste Liste; neue Kartenfelder brauchen eine Regeländerung.

### Simulation
500 Karten, 10 neue pro Tag (Tag 30 liegt noch in der Einführungsphase, die bis Tag 50 läuft). Annahmen: 60 % Treffer beim ersten Anblick, 90 % beim zweiten Versuch am selben Tag. Korrektur A heißt hier: "Sicher" nach "Nicht" am selben Tag bringt keine Stufe, die Karte kommt morgen. Mittel aus 40 Läufen, Werte sind Karten pro Tag / Antworten pro Tag.

| Fall | Tag 30 | Tag 90 | Tag 180 |
|---|---|---|---|
| 90 %, heutige Regel | 70 / 75 | 21 / 23 | 10 / 11 |
| 90 %, mit A | 75 / 80 | 23 / 25 | 11 / 11 |
| 80 %, heutige Regel | 81 / 91 | 27 / 29 | 12 / 13 |
| 80 %, mit A | 91 / 102 | 32 / 36 | 14 / 15 |

In dieser Tabelle sind Fehler je zur Hälfte "Fast" und "Nicht". Wenn jeder Fehler "Nicht" ist, kostet A mehr:
- 90 %: Tag 30 von 67/78 auf 76/88, Tag 90 von 21/24 auf 25/28, Tag 180 von 10/11 auf 12/13.
- 80 %: Tag 30 von 76/96 auf 95/118, Tag 90 von 26/32 auf 38/46, Tag 180 von 12/15 auf 17/21.

A kostet also etwa 5–10 % Mehrarbeit bei 90 % und 10–25 % bei 80 %, im schlechtesten Fall bis rund 45 %.

### Teil 1: je Vorschlag

**(1) Fehler A** — Aufwand S–M
- Stelle: `gradeCard` 6023–6032, `lastAction` 5999, `undoLastGrade` 6162.
- Änderung: Die Runde führt eine Liste der heute mit "Nicht" bewerteten Karten. "Sicher" danach setzt die Karte auf morgen, ohne Stufe zu erhöhen.
- Felder: ohne neues Feld wirkt es nur innerhalb einer Runde. Bricht man ab und startet neu, oder wechselt das Gerät, ist die Merkliste weg. Robust wird es nur mit einem neuen Kartenfeld `nichtAm` (Datum), das in `kartenFelder`, `kartenWerte`, `persistCardGrade` (2823) und `normCard` (236) aufgenommen wird.
- Migration: keine.
- Nebenwirkung Lektionsschloss: `LEKTION_STUFE` = 1 (548). Eine neue Karte mit "Nicht → Sicher" erreicht `maxStufe` 1 erst am Folgetag; die nächste Lektion öffnet einen Tag später.
- Nebenwirkung Rückgängig: `lastAction` muss die Merkliste mit zurückstellen.
- Tests: `abnahme_runde.js`, `t_rundenende`, `t_undo_verlauf`, `t_karten_snapshot`, `t_regler_karten`. Neu nötig: `t_nicht_sicher` (auch über Rundenneustart).

**(2) Dringlichkeit** — Aufwand S
- Stelle: `dueCardsFor` 3797, `startSession` 5897.
- Änderung: Wiederholungen sortieren nach Überfälligkeit geteilt durch `intervalForStufe(stufe)`, bei Gleichstand niedrige Stufe zuerst.
- Felder, Regeln, Migration: keine.
- Nebenwirkung: `dueCardsFor` wird auch für Zähler benutzt, dort ist die Reihenfolge egal. `t_bestand_tempo` muss wegen der Sortierkosten grün bleiben.
- Tests neu: `t_dringlichkeit`.

**(3) Neue Karten erst nach zwei richtigen Abrufen** — Aufwand M
- Stelle: `gradeCard` 6018–6026 und 6069.
- Änderung: ein Zähler nur in der Runde. Das erste "Sicher" einer neuen Karte reiht sie wieder ein, erst das zweite vergibt Stufe 1.
- Felder: keine.
- Zu klären: ob `verlaufZaehle("n")` einmal oder zweimal zählt (Ring und Balken), und `prevQueue` beim Rückgängig.
- Nebenwirkung: Das Lektionsschloss bleibt am selben Tag erreichbar.
- Tests: `t_lernen_start`, `t_runde_rest`, `t_ring`, `t_heute_bereich`.

**(4) Berg strecken** — Aufwand M
- **Es geht ohne neue Felder.** Vorschlag (2) plus ein Tagesdeckel reichen. Das heute Erledigte steht schon in `verlauf[heute].w`.
- Umbau nötig bei den Anzeigen: `heuteAnteil` (10501) zählt alles Fällige als offen, der Ring würde nie voll. `lernenStapel` (10510) braucht "Tagesziel erreicht, X warten noch".
- Fälligkeiten umschreiben ist klar riskanter: nicht umkehrbar, Hunderte Schreibvorgänge, Konflikte zwischen zwei Geräten, und die echte Überfälligkeit (Grundlage für 2) ginge verloren.
- Empfehlung: nur Auswahl. Z7 steht in den Entscheidungen bisher auf "später".

**(5) Ruhetag (Z6b)** — Aufwand M
- Der Bauplan steht in ENTSCHEIDUNGEN.md.
- Stellen: `normVerlauf` 946–949 wirft unbekannte Schlüssel weg und muss `r` durchlassen. `serieAktuell` 3054–3061: ein r-Tag zählt nicht und verbraucht keine Verzeihung.
- Regeln: keine Änderung nötig (siehe oben).
- Mehrgeräte: Eine ältere App-Fassung blendet `r` aus. Zu prüfen ist, ob ihr Schreibweg das Feld erhält (`t_verlauf_mehrgeraete`).
- Offen: die genaue Definition von "nichts fällig" (Frage 4).
- Tests: `t_serie`, `t_serie_lang`, `t_serie_warnung`, `t_fortschritt`.

**(6) Urlaubsmodus** — Aufwand M
- Stellen: zwei Felder `streak.urlaubVon` / `urlaubBis`, aufzunehmen in `normStreak` (1135) und `STREAK_FELDER` (2884). `serieAktuell` überspringt die Tage. Die Warnung in `lernenHinweis` (10290) muss schweigen.
- Regeln: gehen durch; besser trotzdem als Datum prüfen.
- Fälligkeiten nicht verschieben; die Rückkehr läuft über (4).

**(7) Hinweis "heute keine neuen"** — Aufwand S
- Stelle: reine Anzeige in `lernenStapel` (10510) oder `lernenHinweis` (10276, dort gilt eine Rangfolge).
- Felder: keine.
- Tests: `t_lernen_start`, `t_serie_warnung`.

**(8) + (9) Deutsch→Arabisch und Handschrift** — Aufwand M
- `renderSession` kann beides schon: `s.handwriting` dreht Frage und Antwort (11020–11023). Bisher wird es nur im Üben gesetzt (`startDrillWithCards`, 5521).
- Ohne Feld machbar, wenn die Richtung aus der Stufe folgt (zum Beispiel ab Stufe 4 Deutsch→Arabisch).
- Ein echtes Tor mit eigener Stufe je Richtung braucht ein neues Kartenfeld und Regeln; das wäre Aufwand L.
- Tests: `t_schreiben`, `t_wischen`, `t_runde_lage`.

**(10) Ohne Harakat** — Aufwand S–M
- Es gibt keine Funktion zum Entfernen der Vokalzeichen; sie wäre neu, als reine Anzeige in `renderSession`.
- An die Stufe gekoppelt: kein Feld. Als Einstellung: `settingsOk` muss geändert werden.

**(11) Trefferquote** — Aufwand M
- `verlauf` kennt nur Mengen (w/n/u/t), keine Treffer.
- Änderung: ein neuer Tageszähler für "Sicher", in `verlaufZaehle` (968), `normVerlauf` und Rückgängig (6183).
- Regeln: keine Änderung.
- Ein Verlauf je Karte braucht ein neues Kartenfeld mit Regel. Alte Tage bleiben ohne Quote.
- Tests: `t_undo_verlauf`, `t_verlauf_mehrgeraete`.

**(12) Regler für alle** — Aufwand S
- Stelle: nur die Sperre `texteFreigeschaltet()` in 6021.
- Regeln: erlauben `abstandFaktor` und `festErgebnisse` schon (176, 206–209).
- Migration: keine; der Regler wirkt erst ab der nächsten Bewertung.
- Tests: `t_regler_karten`.

**(13) Überspringen** — Aufwand S
- Änderung: Karte ohne Bewertung ans Ende der Warteschlange, kein Protokolleintrag, `lastAction` leeren.
- Felder: keine.
- Tests: `t_rundenende`, `t_x_mitten`.

**(14) Alle Bereiche in einer Runde** — Aufwand M–L
- Betroffen: `findCard` (3717) sucht nur im aktuellen Bereich. Die Runde hat genau eine `bereichId`, an der Regler, `bereichHeuteZaehle` und `persistCardGrade` hängen.
- Änderung: Bereich je Warteschlangen-Eintrag; Schrift und Richtung je Karte.
- Felder: keine.
- Tests: `t_heute_bereich`, `t_bereiche`, `abnahme_runde.js`, `affe.js`.

### Teil 2: Fragen an den Betreiber

1. **"Nicht" und gleich danach "Sicher".** Eine Karte auf Stufe 8 (alle 2 Monate): Du weißt sie nicht, zwei Minuten später schon. Heute kommt sie dann erst in rund 19 Tagen wieder.
   - (a) Sie kommt morgen wieder, die Stufe steigt erst dann.
   - (b) Die Stufe steigt, aber sie kommt morgen.
   - (c) So lassen.
   - Spürbar: etwa 5–10 % mehr Karten täglich, bei vielen Fehlern bis 25 %.
   - Empfehlung: (a), mit dem Merkfeld an der Karte, damit es auch über Abbruch und Gerätewechsel hält.

2. **Welche 20 von 80?** Heute kommen bei einem Limit die 20, die in der Liste oben stehen. Dabei kann eine 2 Monate überfällige Karte liegen bleiben, während eine frische drankommt.
   - (a) Die am stärksten überfälligen zuerst, gemessen am eigenen Abstand.
   - (b) So lassen.
   - Empfehlung: (a).

3. **Rückkehr nach Pause.** Du warst 3 Wochen weg, 240 Karten warten.
   - (a) Die App zeigt täglich höchstens zum Beispiel 40 plus das Tagesübliche, die dringendsten zuerst; die Fälligkeiten bleiben unverändert.
   - (b) Die App schreibt die Fälligkeiten um und verteilt sie über 2 Wochen.
   - (c) Nichts tun.
   - Empfehlung: (a). Es ist jederzeit abschaltbar und nichts geht verloren.

4. **Was ist ein Ruhetag?** Zwei Tage nichts fällig, die Serie von 40 reißt.
   - (a) Ruhetag, wenn keine Wiederholung fällig ist, auch wenn neue Karten bereitlägen.
   - (b) Ruhetag nur, wenn gar nichts da ist, also auch keine neue Karte und keine Textzeile.
   - Zusatzfrage: Muss man die App dafür öffnen?
   - Empfehlung: (a), mit Öffnen. Neue Karten sind laut Code freiwillig.

5. **Urlaub.** Zehn Tage Reise, Serie 60.
   - (a) Du trägst vorher Von und Bis ein. Die Serie ruht, danach greift Frage 3.
   - (b) Kein Urlaubsmodus; der eine verziehene Tag reicht.
   - Empfehlung: (a), höchstens 30 Tage am Stück.

6. **Neue Karten zweimal.** Zehn neue Wörter: heute reicht einmal "Sicher".
   - (a) Jedes neue Wort muss in der Runde zweimal sitzen; das sind etwa 10 Antworten mehr pro Tag.
   - (b) So lassen.
   - Empfehlung: (a).

7. **Deutsch→Arabisch und Schreiben.**
   - (a) Ab Stufe 4 fragt die Runde automatisch Deutsch→Arabisch, optional mit Schreibfläche.
   - (b) Jede Richtung bekommt eine eigene Stufe; das verdoppelt die Arbeit.
   - (c) Bleibt beim Üben.
   - Empfehlung: (a), abschaltbar.

8. **Ohne Harakat.**
   - (a) Ab Stufe 7 wird ohne Vokalzeichen gefragt, die Lösung zeigt sie.
   - (b) Als Schalter.
   - (c) Nicht.
   - Empfehlung: (a), erst nach dem Kern-Umbau.

9. **Regler für alle.** Liegst du bei gefestigten Karten unter 85 %, werden die Abstände bis auf die Hälfte kürzer (180 → 90 Tage); über 95 % werden sie wieder länger.
   - Auswahl: jetzt für alle Karten, oder weiter nur im Probelauf.
   - Empfehlung: erst nach A, und erst wenn die Trefferquote (11) sichtbar ist. Sonst ändern sich Abstände, ohne dass man sieht, warum.

### Reihenfolge und Bündelung

- **Ein gemeinsamer Kern-Umbau** (Bewertung und Rundenbau einmal anfassen, einmal vollständig prüfen): 1 + 2 + 3 + 13 + 4 + 7, dazu der Tageszähler aus 11. Alles liegt in `gradeCard`, `startSession`, `dueCardsFor` und `heuteAnteil`.
- **Zweites Paket Serie:** 5 + 6. Beides liegt in `serieAktuell` und `normVerlauf`.
- **Drittes Paket Abfrageform:** 8 + 9 + 10. Liegt in `renderSession` und `startSession`.
- **Danach einzeln:** 12, zuletzt 14 (größter Umbau der Runde).
- Regeländerungen (`nichtAm`, eventuell eine Einstellung) immer vor dem Hosting einspielen.

Geprüfte Dateien: `C:\Users\USER\Wiederholung\app.js`, `C:\Users\USER\Wiederholung\firestore.rules`, `C:\Users\USER\Wiederholung\plan\zyklus-2\ENTSCHEIDUNGEN.md`, `C:\Users\USER\Wiederholung\plan\werkzeuge\pruefstand\`.

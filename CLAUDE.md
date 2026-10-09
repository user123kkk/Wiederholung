# Hinweise für Claude Code und Codex

## Zuerst: [`plan/STAND.md`](plan/STAND.md) – aktueller Stand und Reihenfolge

Eine Übersicht für Claude und Codex (`AGENTS.md` verweist genauso). Sie
enthält die Reihenfolge des Betreibers vom 30.09.2026: erst Texte lernen
fertig, dann Zyklus 2 (`plan/zyklus-2/AUFTRAG.md`: die ganze App neu
prüfen, Runde 15 entfällt, ihre Befunde sind dort Paket A). Außerdem
steht dort, was bei Texte lernen fertig und was offen ist, und wo lokale
Sicherungen liegen. Historische Arbeitsaufträge stehen im Archiv.
Wo sie von `STAND.md` abweichen, gilt `STAND.md`.

## Alles Offene: [`plan/ALLES-OFFEN.md`](plan/ALLES-OFFEN.md) (Betreiber 08.10.2026, fest)

Die eine Liste für alles, was an der App noch gemacht, entschieden oder
geprüft werden muss. Jeder Wunsch des Betreibers kommt **in derselben
Antwort** dort hinein, auch wenn er nur nebenbei fällt (`plan/LEHREN.md`
§ 1.8). Fragt er „was ist offen“ oder „wie viel ist fertig“, wird aus
dieser Datei geantwortet. Empfehlungen vorher mit dem ganzen Repo und
seinen Wünschen abgleichen (§ 1.7).

## Den Betreiber verstehen und nichts verlieren (Betreiber 08.10.2026, fest)

Vor Empfehlungen und Simulationen zusätzlich
[`plan/EMPFEHLUNGEN-PRUEFEN.md`](plan/EMPFEHLUNGEN-PRUEFEN.md) anwenden
(Betreiber 09.10.2026). Technisch korrekte Zahlen belegen nur die geprüfte
Fragestellung; Eingangsdaten, tatsächliche Codepfade und Aussagegrenzen
sind vor dem Bericht zu prüfen.

- Vor der ersten Antwort [`plan/BETREIBER-VERSTEHEN.md`](plan/BETREIBER-VERSTEHEN.md)
  lesen: wie er schreibt, was seine Wörter bedeuten, was er immer will.
- Wörtlich sichern, nichts auslassen, laufend festhalten
  (`plan/LEHREN.md` § 1.9): Arbeitsschritte nach
  [`plan/ARBEITSPROTOKOLL.md`](plan/ARBEITSPROTOKOLL.md), Agentenberichte
  ungekürzt als Datei, Chats mit `plan\werkzeuge\chats_sichern.py` sichern.
- **Zu Beginn jeder Session die Minuten-Sicherung starten** (im Hintergrund):
  `bash plan/werkzeuge/minuten_sicherung.sh`. Sie schreibt jede Minute nach
  `plan/sicherung/`: den uncommitteten Entwurf als Patch, alle
  Testausgaben und die Seite
  [`UEBERGABE-AKTUELL.md`](plan/sicherung/UEBERGABE-AKTUELL.md), und
  committet und pusht `plan/`. Wer von Codex oder einem anderen Chat
  kommt, liest zuerst diese Seite und fragt den Betreiber nicht nach dem
  Stand.
- Ihn nicht mit Formalitäten und unnötigen Fragen belasten: selbst
  entscheiden, was er nicht entscheiden muss (`plan/LEHREN.md` § 1.2), und
  es im Logbuch vermerken.

## Klein-Weg (Betreiber 07.10.2026, fest)

Kleinigkeiten dauern Minuten, nicht Stunden. Gilt für Aussehen, Abstand,
Wortlaut und für ein vorhandenes Muster, das an weitere Stellen kommt
(Beispiel: „Tippen daneben schließt“). Gilt **nicht** für Lernlogik,
Regeln, Daten, neue Bildschirme.

1. Sofort bauen, auch wenn gerade ein großer Lauf läuft – dann in einem
   eigenen Schritt danach committen, nicht den Betreiber warten lassen.
2. Nur die betroffenen Tests (die, die die Stelle nennen). Kein
   Gesamtlauf, kein Affe, keine Rundenabnahme.
3. Mehrere Kleinigkeiten = eine Version. Logbuch: wenige Zeilen.
4. Der volle Lauf bleibt für Lernlogik, Pakete und vor dem Veröffentlichen.

## Vor allem anderen: [`plan/LEHREN.md`](plan/LEHREN.md) lesen

### Stichwort „ladegerät“ (Betreiber 30.09.2026)

Schreibt der Betreiber **„ladegerät“** oder **„mach weiter, bin auf dem
laptop“** (gleichbedeutend), dann ist gemeint: Laptop hängt am
Strom, jetzt alles prüfen und – nur wenn alles grün ist – veröffentlichen.
Das Stichwort **ist** seine Freigabe für Regeln und Hosting. Ablauf:

1. Im Repo auf dem Laptop (Windows, PowerShell):
   `powershell -ExecutionPolicy Bypass -File plan\werkzeuge\ladegeraet.ps1`
   (dasselbe wie Doppelklick auf `ladegeraet.bat`). Das Skript: Stand =
   `origin/main` → Strom da? → alle `t_*.js` (inkl. 13 Rundentests,
   `t_bestand_tempo`) → Affe mit Texten Handy 200 / iPad 150 → **erst
   dann** `firebase deploy --only firestore:rules` → Hosting über
   `veroeffentlichen.ps1`. Bricht beim ersten Rot ab, ohne zu veröffentlichen.
2. Ausgabe **lesen**, nicht nur den Exit-Code: Rote Tests einzeln nachsehen
   (`<tmp>/adrabic-pruefstand-gesamt/<Quellstand>/*.log`) und gegen den
   Vorstand prüfen (LEHREN § 5.3). Echter Fehler → beheben, committen,
   Stichwort-Ablauf neu. Skriptfehler (es lief bis 30.09. nie unter Windows)
   → Skript reparieren, Logbuch.
3. Ergebnis in `plan/texte-lernen/LOGBUCH.md` eintragen (Version, Commit,
   was lief, was online ist) und dem Betreiber kurz melden.

Nur prüfen ohne Veröffentlichen: `ladegeraet.ps1 -NurPruefen`.

## Verbindlicher Arbeitsablauf

Bei „leg los“ oder „weiter“ zuerst [plan/STAND.md](plan/STAND.md), dann das
Logbuch der laufenden Phase lesen. Für Zyklus 2 gelten
[CODEX-START.md](plan/zyklus-2/CODEX-START.md) und die Aufgabenliste.
Der konkrete Betreiberauftrag bestimmt Paket und Umfang.
Historische Aufträge und Übergaben stehen vollständig im
[Archiv](plan/archiv/CLAUDE-verlauf-2026-10-05.md).

Pflicht: LEHREN vollständig vor der ersten Änderung, §14 vor jedem Commit.
Jede neue Fehlerart als Regel und Vorfall in LEHREN dokumentieren.
UI-/Bewegungsänderungen auch auf angrenzenden Bildschirmen prüfen: kurze und
lange Viewports, Scrollposition, Karte und Bewertung, Plan-Aufbau und fertiger
Plan, iOS First Paint. Ein neuer Sprung oder Ruckler verhindert die Abnahme.
Geräteabnahme und Chromium-Prüfung ausdrücklich unterscheiden.

Texte auswendig lernen bleiben im Probelauf nur im Betreiber-Konto.
Keine Freigabe für andere ohne sein ausdrückliches Ja; unter
`plan/texte-lernen/` während des Probelaufs nichts umbauen. Aktueller
Probelaufstand und Auswertungstermin stehen in STAND.

## Zwei Grundsätze des Betreibers (24.09.2026, ausdrücklich „notieren")

1. **Seine Vorschläge sind Fragen, keine Beschlüsse.**
   > „nur weil ich ein Argument dafür bringen kann, heißt es nicht, dass es
   > überwiegt."

   Zu jedem Vorschlag und jeder Kritik gehören:
   - Argumente dafür **und** dagegen, ehrlich gewichtet;
   - dann ein eigenes Urteil mit Empfehlung, auch wenn es „lieber nicht"
     lautet.

   Ein Bedenken, das er *vor* einer Anweisung äußert, ist kein Bauauftrag.
   Echte Fehler, die dabei auffallen, werden trotzdem sofort behoben.
   **Umgekehrt genauso:** Ein Einwand, eine Frage oder Kritik ist auch kein
   Auftrag zum Streichen oder Ändern. Eigenes Urteil nennen und dabei
   bleiben, bis er ausdrücklich entscheidet (Betreiber 29.09.2026, „fest
   notieren“; `plan/LEHREN.md` § 1.1).
   Einzelheiten: `plan/LEHREN.md` § 1.
2. **Religiöser Rahmen:** Es gilt ausschließlich **Quran und Sunnah nach dem
   Verständnis der Salaf as-Salih**. Gemeint sind die drei ersten Generationen
   nach dem Propheten Muhammad ﷺ, dazu die Fatawa der Gelehrten auf dem Manhaj
   der Salaf, die Hadithe und der Quran.
   - Keine Sekte, keine Organisation, keine Bewegung, kein politischer Bezug,
     auch nicht als Abgrenzung.
   - Religiöse Inhalte verfasst kein Agent selbst; Wortlaut kommt vom
     Betreiber.
   - Religiöse Angaben von Nutzer:innen werden nicht gespeichert.

   Einzelheiten: `plan/LEHREN.md` § 2.

## Wenn hier jemand „leg los" sagt

Dann ist **immer** das gemeint: die Arbeit aus `plan/` an genau der Stelle
fortsetzen, an der die letzte Session aufgehört hat. Nicht nachfragen, nicht
neu planen, nicht auf einen Auftrag warten.

Die Stelle steht in [plan/STAND.md](plan/STAND.md) und im obersten Eintrag
des laufenden Logbuchs. [plan/PLAN.md](plan/PLAN.md) enthält die Übersicht
und offenen Fragen. Vorhandenen Arbeitsstand erhalten; den konkreten
Fortsetzungsauftrag und seine Prüfpflichten befolgen.

## Die Grundregel

**Baue nichts, was nicht im Plan steht.** Grundlage ist [`KONZEPT.md`](KONZEPT.md),
der Auftrag steht dort in Abschnitt 0. Fällt dir etwas auf, das nicht im Plan
steht: ins Logbuch schreiben, nicht bauen.

Weiter gilt durchgehend (Konzept-Abschnitt 7):

- Keine Funktion des Lernwerkzeugs anfassen — mit einer dauerhaften Ausnahme
  seit 18.09.2026 (Betreiber-Entscheidung, `KONZEPT.md` §7,
  `plan/archiv/PLAN-verlauf.md` offene Frage 6): Bedienung/Optik dürfen für **Design- und
  Verbesserungszwecke** angefasst werden, solange nichts komplett verändert
  wird. Die Lernlogik selbst bleibt tabu.
- Nichts wieder einbauen, was bewusst entfernt wurde. **Der Code ist
  maßgeblich, nicht ältere Dokumente** — auch nicht `KONZEPT.md`, wo es vom
  Code abweicht.
- Kein Punkt wird abgearbeitet, nur weil er in einer Liste stand. „Trifft nicht
  zu" wird mit Begründung aufgeschrieben, nicht weggelassen.

## Dokumentationspflicht

Die Arbeit läuft über viele getrennte Sessions. Jeder Arbeitsschritt kommt ins
Logbuch der laufenden Phase, in diesem Format:

```
### JJJJ-MM-TT — kurze Überschrift

**Geändert:** Dateien mit Pfad, bei Code mit Zeilennummer
**Entscheidung:** was festgelegt wurde — und warum, nicht nur was
**Offen:** was bewusst liegen bleibt und woran es hängt
**Nächster Schritt:** das eine, was als Nächstes zu tun ist
```

Auch „geprüft, nichts zu tun" ist ein Eintrag. Sonst prüft die nächste Session
dasselbe noch einmal. Eine neue Session muss durch `plan/PLAN.md` plus das
letzte Logbuch **ohne Nachfragen** weiterarbeiten können — das ist der Zweck.

## Was der Betreiber selbst tun muss

Manches kann ein Agent nicht erledigen: alles, was in einer fremden Konsole
passiert (Firebase, Google Cloud, Domain, Search Console), und jede
Entscheidung aus „Offene Fragen" in `plan/PLAN.md`.

**Solche Punkte kommen ans Ende der Antwort, unter eine eigene Überschrift
„Was Du noch tun musst" — als nummerierte Schritte, nicht als Nebensatz.**
Jeder Schritt sagt: wo klicken, was einfügen, woran man merkt, dass es
geklappt hat. Keine Andeutungen, kein „müsste noch eingespielt werden".

Der Grund: Solange so ein Schritt offen ist, ist die Arbeit **nicht** fertig,
sie sieht nur so aus. Eine Regeldatei im Repo schützt keine einzige Zeile
Daten, solange sie nicht in der Firebase-Konsole steht.

Derselbe Punkt gehört zusätzlich ins Logbuch unter **Offen** und in
`plan/PLAN.md` — sonst hält die nächste Session die Phase für erledigt.

## Wie hier veröffentlicht wird

**Direkt auf `main`, ohne Pull Request.** So will es der Betreiber. Also:
committen, auf `main` pushen, fertig. Keinen PR anlegen, keinen Branch
aufmachen, nicht nachfragen.

Bei jeder Änderung an der App selbst (nicht bei reinen Plandateien) gilt die
Veröffentlichungsliste aus [`README.md`](README.md):

1. `APP_VERSION` in `app.js` hochzählen.
2. **Denselben Wert** als `CACHE_NAME` in `sw.js` eintragen. Ohne das behalten
   Nutzer:innen die alten Dateien im Cache.
3. **Denselben Wert** auch in **beide** Versions-Querys in `index.html`
   eintragen: `<script src="./app.js?v=…">` und
   `<link rel="stylesheet" href="./styles.css?v=…">` — sonst bleibt die Datei
   bis zu eine Stunde im normalen HTTP-Cache des Browsers hängen
   (`Cache-Control: max-age=3600`, die Regel gilt für `.js` **und** `.css`),
   selbst ein Reload holt dann noch die alte Datei. Steht in `README.md`,
   fehlte hier bis 23.09.2026 (v3.9.5) — deshalb bei 3.9.3/3.9.4 übersehen.
   Für `styles.css` fehlte die Query überall bis 24.09.2026 (v3.11.0).
4. Neue Startdateien in `APP_SHELL` in `sw.js` aufnehmen. `app.js` und
   `styles.css` stehen dort seit 3.11.0 **mit** Versions-Query (aus `VERSION`,
   das sich aus `CACHE_NAME` ableitet) — `caches.match()` vergleicht die ganze
   URL samt Query, ohne sie traf der vorab gespeicherte Eintrag nie.
5. Eintrag in `CHANGELOG.md`.
6. `node --check app.js` vor dem Commit.
   - Warum: 3.6.2 startete die App auf keinem Gerät, weil typografische
     Anführungszeichen als String-Begrenzer im Code standen.
7. Nur `firebase.json` geändert (Header, CSP)? Dann die Zeile `csp-build` in
   `index.html` mitzählen.
   - Warum: Sonst antwortet der Server 304, und Browser behalten die alten
     Header (3.4.10).
8. `veroeffentlichen.bat` spielt **nur Hosting** ein.
   - Geänderte `firestore.rules` braucht einen eigenen Schritt des Betreibers:
     `firebase deploy --only firestore:rules` oder die Firebase-Konsole.
   - Dieser Schritt gehört unter „Was Du noch tun musst".

Plandateien unter `plan/` und `KONZEPT.md` sind reine Textdateien, stehen nicht
in `APP_SHELL` und werden nicht ausgeliefert — für sie entfällt die Liste.

## Was dieses Repo ist

Karteikarten-PWA (aktuelle Version: `APP_VERSION` in `app.js`). Kein Build-Schritt, keine Paketverwaltung: die
Dateien werden so ausgeliefert, wie sie im Wurzelverzeichnis liegen. Der
Browser spricht direkt mit Firestore; es gibt **keinen eigenen Server**.

`user123kkk/Wiederholung` ist der **maßgebliche Stand**. Das ältere
`user123kkk/adrabic` enthält unter `wiederholung/` noch die Vorgängerfassung
2.21.4 (alles in einer `index.html`) — **dort wird nicht mehr gearbeitet.**

Wo im `KONZEPT.md` vom Ordner `wiederholung/` die Rede ist, ist das
Wurzelverzeichnis dieses Repos gemeint.

Für Gestaltung und Markup gelten die Regeln in [`README.md`](README.md) —
besonders: Eintrittsbewegungen müssen `@keyframes` sein, und `app.js` hat
**einen** delegierten Klick-Listener über `data-action`.

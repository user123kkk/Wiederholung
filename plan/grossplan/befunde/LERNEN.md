# LERNEN – Lernrunde, Lernlogik, Serie, Speichern, Sync/Offline

Stand: app.js 3.17.29. Messskripte: `scratchpad/audit/LERNEN/t_datum.js`, `t_logik.js`, `t_gross.js`
(echte app.js, Firebase-Attrappe aus `plan/werkzeuge/pruefstand/`).

#### LERNEN-1: Die Serie bleibt bei 121 Tagen stehen
- Art: Fehler
- Schwere: hoch
- Beleg: `app.js:726` `const VERLAUF_TAGE = 120;`, `app.js:746-747` `normVerlauf` wirft Tage `< dateInDays(-120)` weg; `app.js:864-872` `verlaufAufraeumen` löscht sie auch in der Cloud; `serieAktuell()` (`app.js:2455-2485`) zählt nur aus `verlauf`, der Sockel wird nie nachgezogen. Messung `t_logik.js [1]`: 100 Tage am Stück → 100, 119 → 119, **125 → 121, 200 → 121**. Verifiziert.
- Warum es stört: Wer länger als vier Monate jeden Tag lernt, dessen Serie zählt nicht mehr weiter. Genau die treuesten Nutzer:innen sehen jeden Tag dieselbe Zahl. Auch `streak.beste` bleibt bei 121 stehen.
- Vorschlag: Bevor alte Tage weggeräumt werden, prüfen, ob die Kette bis an die Grenze reicht. Wenn ja, den weggeräumten Teil in den Sockel übernehmen (`streak.sockel`/`sockelBis`, wie `serieSockelSetzen`). Die Übernahme muss mit der Joker-Regel verträglich sein, also genau an einem gelernten Tag übergeben. Alternative: nur für die Serie eine kleine Liste der gelernten Tage länger aufheben. Die Regel lässt bis 400 Einträge zu (`firestore.rules:138`), aber auch das löst es nur bis 400.
- Entscheidet: Betreiber (LEHREN § 13: `serieAktuell` nur mit Freigabe; die Regel selbst bleibt gleich, es ist eine Fehlerbehebung)
- Umsetzung: Opus
- Abnahme: neuer Fall in `t_serie.js`: 200 Tage am Stück → 200; 130 Tage mit einer verziehenen Lücke bei Tag 125 → richtige Zahl; `beste` wächst mit.
- Pro/Contra: Pro: Das ist eindeutig ein Fehler, denn keine Aussage in der App verspricht eine Obergrenze. Contra: Der Sockel-Mechanismus hat schon zweimal Fehler erzeugt (3.17.28, § 15), eine Änderung braucht deshalb gründliche Tests. Empfehlung: beheben, mit Testfällen vorab.

#### LERNEN-2: Eine vergessene, gut gelernte Karte kommt trotzdem erst nach fast einem halben Jahr wieder
- Art: Fehler (Wechselwirkung zweier Regeln) / Lernlogik
- Schwere: hoch
- Beleg: `app.js:5087-5094`: „Nicht" setzt `stufe - 2` und stellt die Karte in dieselbe Runde zurück. Das anschließende „Sicher" setzt `stufe + 1`. Gleichzeitig gilt `intervalForStufe` (`app.js:122-125`) ab Stufe 10 immer 180 Tage. Messung `t_logik.js [3]` (Nicht, dann gleich Sicher): Stufe 12 → nächste Abfrage in **164 Tagen**, Stufe 11 → 161, Stufe 10 → 107, Stufe 8 → 38, Stufe 5 → 6 Tage. Verifiziert.
- Warum es stört: Wer ein Wort nach einem halben Jahr vergessen hat, sieht es nach einmaligem Nachschlagen erst wieder nach einem halben Jahr. Das ist der Moment, in dem eine Wiederholung am dringendsten wäre. Oben auf der Leiter bleibt „Nicht" praktisch ohne Folgen.
- Vorschlag: Möglichkeit (a): Das „Sicher" nach einem „Nicht" in derselben Runde hebt die Stufe nicht an (Karte bleibt auf der Stufe nach dem Rückfall, nächste Abfrage morgen oder in wenigen Tagen). Möglichkeit (b): Ein Rückfall setzt nicht fest 2 Stufen zurück, sondern mindestens bis unter die 180-Tage-Stufen, z. B. `min(stufe - 2, 6)`. Nur in `gradeCard` (`app.js:5048ff.`), Rückgängig nimmt beides über `lastAction` ohnehin zurück.
- Entscheidet: Betreiber (Lernlogik)
- Umsetzung: Sonnet
- Abnahme: `t_logik.js [3]`: Stufe 12, Nicht, Sicher → höchstens 7 Tage (Wert legt der Betreiber fest). `node abnahme_runde.js` grün.
- Pro/Contra: Pro: Jede verbreitete Methode (Anki-„Relearning", Leitner) behandelt einen Rückfall bei reifen Karten deutlich härter. Die Zahlen bleiben verborgen (§ 3.5), es ändert sich nur, *wann* die Karte kommt. Contra: Mehr Wiederholungen am Tag nach einem Rückfall. Eine Karte, die nur ein „Aussetzer" war, kommt häufiger. Empfehlung: (a). Sie ist die kleinste Änderung und wirkt genau dort, wo das Problem ist. Eine Umstellung auf FSRS würde das Problem ebenfalls lösen, wäre aber ein Methodenwechsel mit Datenumzug und lohnt sich hier nicht.

#### LERNEN-3: „Gesehen" und dann „Rückgängig" zählt den Tag trotzdem für die Serie
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:4703-4722` `lernAbhaken` ruft `verlaufZaehle("n")` auf. `lernRueckgaengig` (`app.js:4726-4741`) setzt nur die Karte zurück, nicht das Protokoll. `ui.lernLetzte` merkt sich weder Tag noch Art. Messung `t_logik.js [2]`: Serie vorher 0 → nach Gesehen `{"w":0,"n":1}` → nach Rückgängig **weiter `{"w":0,"n":1}`**, Karte wieder neu, **Serie danach 1**. Verifiziert.
- Warum es stört: Ein versehentlicher Tipp mit sofortigem Rückgängig hält die Serie am Leben und zeigt eine neue Karte zu viel. Das ist genau der Fall, der in 3.17.6 für die Runde behoben wurde (`undoLastGrade`, „man hat es ja nicht gewollt"). Die Durchsicht wurde dabei vergessen (§ 3.3).
- Vorschlag: In `lernAbhaken` zusätzlich `verlaufTag: todayStr()` in `ui.lernLetzte` ablegen. In `lernRueckgaengig` dann `verlauf[tag].n--` und `persistVerlauf()`, genau wie in `undoLastGrade` (`app.js:5205-5209`).
- Entscheidet: Agent (dieselbe freigegebene Regel wie 3.17.6, mechanisch nachgezogen)
- Umsetzung: Sonnet
- Abnahme: `t_logik.js [2]` zeigt nach Rückgängig `{"w":0,"n":0}` und Serie 0. `t_undo_verlauf.js` weiter grün.

#### LERNEN-4: Das Rundenlimit nimmt die obersten Karten der Liste, nicht die dringendsten
- Art: Fehler (Code widerspricht der eigenen Zusage)
- Schwere: mittel
- Beleg: `app.js:4955-4958` Kommentar „Wer 80 fällige hat und "10" wählt, sieht die 10 dringendsten". `dueCardsFor` (`app.js:2989-2997`) filtert nur und sortiert nicht, die Reihenfolge ist also die Listenreihenfolge (neue Karten stehen oben, `ordnungVorn`). Messung `t_logik.js [4]`: Limit 10, dabei 10 Karten heute fällig oben in der Liste und 20 Karten 20–58 Tage überfällig darunter. Drangekommen sind **nur r00–r09 (heute fällig)**, kein einziger der lange überfälligen. Verifiziert.
- Warum es stört: Wer täglich eine 10er-Runde macht und mehr fällig hat, bekommt immer die zuletzt angelegten Karten. Alte Karten unten in der Liste kommen nie dran und verfallen („liegengeblieben").
- Vorschlag: In `startSession` vor dem Abschneiden die Wiederholungen nach `nextReview` aufsteigend sortieren (die am längsten überfälligen zuerst), danach wie bisher mischen. Neue Karten bleiben hinten.
- Entscheidet: Betreiber (welche Karten kommen, gehört zur Lernlogik; die Absicht steht allerdings schon im Code)
- Umsetzung: Sonnet
- Abnahme: `t_logik.js [4]` zeigt 10 Karten aus r20–r29 (die ältesten).
- Pro/Contra: Pro: Das stellt her, was der Kommentar verspricht, und verhindert, dass alte Karten dauerhaft liegen bleiben. Contra: Wer lange weg war, bekommt zuerst die schwersten, weil am längsten vergessenen Karten, und das kann entmutigen. Empfehlung: nach Fälligkeit sortieren.

#### LERNEN-5: Keine Warnung an dem Tag, an dem ein Aussetzen die halbe Serie kostet
- Art: Fehler (Hinweis passt nicht zur Regel) / Lernlogik-Frage
- Schwere: mittel
- Beleg: `app.js:8943` warnt nur bei `!tagGelernt(heute) && !tagGelernt(gestern)`. `serieAktuell` läuft rückwärts, **die jüngste Lücke bekommt den Joker immer** (`seitJoker = SERIE_JOKER_TAGE` am Start, `app.js:2466`). Eine ältere Lücke mit weniger als 7 Tagen Abstand beendet dann die Zählung. Messung `t_logik.js [5]` (30 Tage, Lücke, 3 Tage): Am Tag davor zeigt die App Serie **33** mit dem Hinweis „Leg dir eine Erinnerung…", keine Warnung. Nach einem ausgelassenen Tag steht dort Serie **3** und „Ohne eine Runde endet deine Serie von 3 Tagen". Verifiziert. Der Fall steht so in `t_serie.js` („zweite Lücke zu früh … erwartet 6"), ist also gewollt gerechnet.
- Warum es stört: 30 Tage verschwinden ohne Vorwarnung, und genau diesen „krummen Rest" wollte 3.17.20 abschaffen. Die Warnung kommt erst, wenn der Verlust schon eingetreten ist.
- Vorschlag: (a) mechanisch: die Warnung auslösen, wenn `serieAktuell()` für morgen ohne heutige Runde kleiner wäre als heute. Dafür dieselbe Rechnung mit einem Stichtag-Parameter aufrufen, `serieAktuell(stichtag)`, Aufruf nur für den Hinweis. (b) Lernlogik: Den Joker vorwärts vergeben (die ältere Lücke verbraucht ihn). Eine zweite Lücke zu früh setzt dann auf die Tage *nach* ihr zurück, statt die Tage vor der ersten abzuschneiden.
- Entscheidet: Agent für (a) (der Hinweis soll die geltende Regel richtig wiedergeben), Betreiber für (b)
- Umsetzung: Sonnet (a) / Opus (b)
- Abnahme: `t_logik.js [5a]` zeigt am Tag davor „Heute zählt: Ohne eine Runde endet deine Serie von 33 Tagen".
- Pro/Contra (b): Pro: Das Ergebnis ist leichter zu verstehen („seit der letzten zu frühen Lücke"). Contra: Es wäre strenger als heute (Zahl 1 statt 4 im Messfall), und `t_serie.js` müsste neu festgelegt werden. Empfehlung: nur (a), (b) nicht.

#### LERNEN-6: Bei großen Beständen braucht jede Bewertung spürbar Rechenzeit
- Art: Verbesserung
- Schwere: mittel
- Beleg: Messung `t_gross.js` (Handy, CPU 4× gedrosselt, Summe langer Aufgaben je Bewertung): 300 Karten 0–117 ms · 1000 Karten 74–201 ms · **3000 Karten 229–422 ms** (eigener Bereich ähnlich: 199–394 ms) · **6000 Karten 466–722 ms**. Ursache laut Code: Jeder Karten-Schnappschuss (also jede Bewertung) baut in `datenZusammenbauen` (`app.js:1780-1805`) alle Karten neu auf und macht zweimal `JSON.stringify([bereiche, …])`. Dazu kommt `render()` mit `freieIdsFor` → `lektionOffeneKarten` (`app.js:320-323`), das je Lektion eine neue `Map` über alle Karten baut. Verifiziert (Messung), Ursachenanteil ist eine Vermutung.
- Warum es stört: Ab etwa 2000 Karten hängt die Karte nach dem Wischen spürbar, bevor die nächste kommt, auf älteren Handys erst recht. Gerade Vielnutzer:innen trifft das.
- Vorschlag: In `datenZusammenbauen` nur die geänderten Dokumente übernehmen (`snap.docChanges()`) statt alles neu aufzubauen. Den Vergleich per `JSON.stringify` ersetzen durch „hat sich etwas außer der eigenen, schon angewendeten Bewertung geändert". In `offeneLektionIds` die `byId`-Map einmal je Bereich bauen und je Render zwischenspeichern.
- Entscheidet: Agent
- Umsetzung: Opus
- Abnahme: `t_gross.js` 3000 Karten ≤ 100 ms je Bewertung, `abnahme_runde.js` grün.
- Nebenbefund (Vermutung, nach Firestore-Doku): Der Dauer-Listener auf `users/{uid}/karten` liest nach mehr als 30 Minuten Pause beim Öffnen alle Karten neu und rechnet sie als Lesezugriffe ab (1000 Karten = 1000 Lesezugriffe je Start). Bei vielen Nutzer:innen mit großen Beständen reicht das kostenlose Tageskontingent (50 000) nicht mehr. Der Betreiber sollte das in der Konsole unter „Usage" beobachten.

#### LERNEN-7: Teilen per Code: der ganze Kartensatz steht in einem Dokument (1 MiB), und ein Fehlschlag hinterlässt einen toten Code
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:3415-3436` `baueWeitergabeBereich` packt alle Karten samt `extra` (bis 5000 Zeichen, `app.js:176`) in **ein** Dokument `geteilteLektionen/{code}` (`app.js:3588`). Firestore lehnt Dokumente über 1 MiB ab, das wird ab etwa 200 Karten mit langen Notizen oder einigen Tausend kurzen Karten erreicht (Rechnung, nicht gemessen). Zusätzlich wird `teilCode` schon **vor** dem `setDoc` in den Bereich geschrieben (`app.js:3572-3580`), und der `catch` (`app.js:3589-3592`) nimmt ihn nicht zurück. Danach meldet die App „wird schon über den Code … geteilt", obwohl es den Code gar nicht gibt. Verifiziert (Codepfad).
- Warum es stört: Lehrer:innen mit einem großen Buch-Satz können nicht teilen und bekommen danach einen Code angezeigt, der bei allen anderen „nicht gefunden" ergibt.
- Vorschlag: Zuerst `setDoc`, erst danach den `patchDoc` mit `teilCode` schreiben, oder im `catch` alles zurücksetzen. Vorab die Größe grob schätzen (`JSON.stringify(datensatz).length` × ~1,1 > 1 000 000) und in Worten melden. Für große Sätze später auf mehrere Dokumente aufteilen (Regeländerung, Betreiber).
- Entscheidet: Agent (Reihenfolge und Meldung) / Betreiber (Aufteilung mit neuer Regel)
- Umsetzung: Sonnet
- Abnahme: Prüfstand mit `__FB.fail` beim Teilen: danach kein `teilCode` am Bereich, kein „Schon aktiv".

#### LERNEN-8: Zwei Geräte oder offline lernen: das Tagesprotokoll zählt Antworten zu wenig
- Art: Fehler
- Schwere: niedrig
- Beleg: `verlaufZusammen` (`app.js:785-799`) nimmt je Tag `Math.max(lokal, Wolke)`, und `persistVerlauf` (`app.js:838-866`) schreibt den ganzen Tageswert, sodass die letzte Schreibung gewinnt. Beispiel: Handy offline 20 Antworten, iPad online 15 am selben Tag. Heraus kommen 20 statt 35. Verifiziert (Codepfad), nicht gemessen.
- Warum es stört: Balken und Wochenrückblick zeigen weniger als tatsächlich gelernt wurde. Die Serie ist nicht betroffen, weil `> 0` reicht.
- Vorschlag: Die Tageszähler mit `fb.increment(1)` schreiben (auch `increment(-1)` beim Rückgängig). `verlaufZusammen` übernimmt dann den Wolkenwert und addiert nur die noch ausstehenden eigenen Zähler. Vorher `stubs.js` auf echtes `increment` in `FieldPath`-Updates prüfen (§ 5.4).
- Entscheidet: Agent
- Umsetzung: Opus
- Abnahme: Prüfstandtest mit zwei Seiten auf demselben Store: 5 + 3 Antworten → 8.

#### LERNEN-9: Zweiter Tab ohne Offline-Speicher, das Banner verspricht trotzdem die Übertragung
- Art: Fehler
- Schwere: niedrig
- Beleg: `app.js:1872` `persistentLocalCache()` ohne `tabManager`, das ist der Standard-Einzeltab. Ein zweiter Tab bekommt die IndexedDB-Sperre nicht, und Firestore fällt dann still auf den Arbeitsspeicher zurück (Vermutung nach SDK-Verhalten, mit der Attrappe nicht prüfbar). `offlineCacheAktiv` bleibt trotzdem `true` (`app.js:1873`), deshalb sagt das Offline-Banner „wird übertragen, sobald du wieder online bist" (`app.js:7343`).
- Warum es stört: Wer am Desktop zwei Tabs offen hat, offline lernt und den zweiten Tab schließt, verliert diese Bewertungen, obwohl die App etwas anderes zugesagt hat.
- Vorschlag: `persistentLocalCache({ tabManager: fb.persistentMultipleTabManager() })`. Die Attrappe kennt die Funktion schon (`stubs.js`).
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: echter Browser gegen das echte Firebase: zwei Tabs, beide ohne Warnung „Failed to obtain exclusive access" in der Konsole. Kann nur der Betreiber am echten Projekt prüfen.

#### LERNEN-10: „Merken" auf zwei Geräten überschreibt sich gegenseitig
- Art: Fehler
- Schwere: niedrig
- Beleg: `karteMerken` (`app.js:4331-4360`) schreibt die ganze Liste `sets.<id>.cardIds`. Merken Handy und iPad kurz nacheinander verschiedene Karten, bleibt nur eine Liste übrig. Legen beide die Sammelkarte zum ersten Mal an, entstehen zwei „Schwierige Wörter". Verifiziert (Codepfad).
- Warum es stört: Eine gemerkte Karte ist still wieder weg.
- Vorschlag: `arrayUnion`/`arrayRemove` für `cardIds` (in `patchDoc` durchreichen). `stubs.js` gibt für `arrayUnion` heute nur das Argument zurück und muss dafür echt gemacht werden (§ 5.4).
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Prüfstand: zwei Seiten merken je eine Karte → beide in der Liste.

#### LERNEN-11: Eine alte Offline-Bewertung kann eine neuere von einem anderen Gerät überschreiben
- Art: Verbesserung
- Schwere: niedrig
- Beleg: `persistCardGrade` (`app.js:2262-2292`) schreibt Stufe und Fälligkeit ohne Zeitstempel, deshalb gewinnt, wer zuletzt *ankommt*. iPad offline bewertet morgens „Sicher", das Handy abends online „Nicht". Kommt das iPad danach online, steht wieder die Morgen-Bewertung. Verifiziert (Codepfad).
- Warum es stört: Selten, aber ein echter Rückfall geht verloren, und die Karte bleibt zu lange weg.
- Vorschlag: Feld `bewertetUm` (Zeitpunkt der Bewertung) mitschreiben. Die Regel lehnt ein Update mit älterem `bewertetUm` ab. Die App verwirft eine solche Ablehnung ohne Meldung (nicht über `abgelehnteBewertungen` erneut senden).
- Entscheidet: Betreiber (neues Feld, Regeländerung, Konsolen-Deploy)
- Umsetzung: Opus
- Abnahme: Emulatortest in `regeln-pruefung.mjs`: älteres `bewertetUm` → abgelehnt; die App zeigt dabei keine Fehlermeldung.
- Pro/Contra: Pro: Der Lernstand ist auf mehreren Geräten sicher der zuletzt tatsächlich erlebte. Contra: Neues Feld plus Regel plus Deploy, und die Ablehnung muss von einem echten Rechteproblem unterschieden werden (§ 8.2). Nutzen ist klein. Empfehlung: erst angehen, wenn Mehrgeräte-Nutzung belegt häufig ist.

#### LERNEN-12: Kommentar zur Lektions-Schwelle nennt die falsche Stufe
- Art: Fehler (Kommentar)
- Schwere: niedrig
- Beleg: `app.js:449-452` „Ab dieser je erreichten Stufe … Stufe 2 heisst … Eine Lektion braucht also mindestens zwei Tage", Code `const LEKTION_STUFE = 1;`
- Warum es stört: Die nächste Session könnte aus dem Kommentar auf eine falsche Freischaltregel schließen (§ 3.2).
- Vorschlag: Kommentar auf Stufe 1 korrigieren („einmal mit Sicher bewertet").
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: `grep -n "Stufe 2 heisst" app.js` findet nichts mehr.

#### LERNEN-13: Abfrage in Gegenrichtung (Deutsch → Arabisch)
- Art: Funktion / Premium
- Schwere: niedrig
- Beleg: Die Runde zeigt immer `wort` vorne (`renderSession`, `app.js:9587ff.`). „Umkehren" im Verwalten dreht nur die Reihenfolge der Liste (`reverseOrder`). In `CHANGELOG.md` und den Logbüchern findet sich nichts zu einer Gegenrichtung.
- Warum es stört: Wiedererkennen (Arabisch → Deutsch) ist leichter als aktives Erinnern. Wer Arabisch sprechen oder schreiben will, übt das Schwerere nie.
- Vorschlag: Je Bereich ein Schalter „auch andersherum abfragen". Umsetzung mit eigener Stufe/Fälligkeit je Richtung (neue Kartenfelder, Regel) oder zunächst nur im Üben ohne Lernstand (keine Datenänderung).
- Entscheidet: Betreiber (neue Funktion, Lernlogik)
- Umsetzung: Opus
- Abnahme: je nach Entscheidung. Für den Üben-Weg: Schalter im Üben dreht die Karte, kein Schreibzugriff auf Karten.
- Pro/Contra: Pro: großer Lerneffekt, bekannt aus jeder Karteikarten-App, guter Premium-Kandidat. Contra: Mit Lernstand verdoppelt sich die tägliche Menge, und es braucht neue Felder samt Regel-Deploy. Die Schreib-Übung (Handschrift) deckt einen Teil schon ab. Empfehlung: zuerst nur im Üben anbieten (ohne Datenänderung), die volle Fassung als Premium später.

#### LERNEN-14: Antwort eintippen statt nur aufdecken
- Art: Funktion
- Schwere: niedrig
- Beleg: Die Runde kennt nur Aufdecken plus Selbstbewertung (`revealAnswer`, `gradeCard`). Handschrift gibt es (`hwStrokes`), Tippen nicht. In den Logbüchern steht nichts dazu.
- Warum es stört: Die Selbstbewertung ist großzügig („Sicher", obwohl nur ungefähr gewusst). Ein getippter Vergleich macht ehrlicher.
- Vorschlag: Optionales Eingabefeld vor dem Aufdecken. Der Vergleich über `suchNorm` (ohne Harakat), und das Ergebnis schlägt nur eine Bewertung vor, entscheiden tut weiter die Nutzer:in.
- Entscheidet: Betreiber
- Umsetzung: Opus
- Abnahme: –
- Pro/Contra: Pro: aktives Erinnern, besonders für Deutsch → Arabisch. Contra: Arabisch tippen am Handy ist mühsam, die Harakat machen den Vergleich heikel, und Tastatur plus Blatt treffen die iOS-Stolperstellen (§ 11). Empfehlung: nur zusammen mit LERNEN-13 und nur als Wahl, nicht jetzt.

---

Geprüft ohne Fund:
- **Datum/Zeitzone/Mitternacht:** Die Vermutung „UTC statt lokal" ist widerlegt. Alle Tagesrechnungen gehen über `logicalToday()` (lokal, Tagesgrenze 4 Uhr, `app.js:93-108`), kein `toISOString` für Tage. `t_datum.js` mit `timezoneId: Europe/Berlin` und gestellter Uhr, 9/9 richtig: 01:30, 02:30 und 03:59 MESZ → Vortag; 04:01 → neuer Tag; Zeitumstellung 25.10. (03:30 → 24.10., 04:30 → 25.10.) und 28.03.2027; Silvester 23:30 und 00:30. Protokoll-Schlüssel, Fälligkeit und Serie stimmen jeweils.
- Die Tagesdifferenzen (`app.js:3151`, `3356-3358`, `9272`) runden mit `Math.round` und kommen deshalb über die Zeitumstellung. `fmtDatum`, `letzteWoche` und der Kalender gehen alle über `todayStr()`.
- **Karten-Speicherung:** ein Dokument je Karte (`users/{uid}/karten/{cid}`, `app.js:1622-1643`), deshalb gibt es für den eigenen Bestand keine 1-MiB-Grenze. Das Bereichsdokument enthält nur `sets` mit ID-Listen, und das Nutzerdokument nur ≤121 Protokolltage (Regel ≤400).
- `persistCardGrade` schreibt nur die Bewertungsfelder und keine fremden Felder. Die Regeln (`kartenWerte`) passen zu `MAX_STUFE` 12.
- `undoLastGrade` setzt Stufe, Fälligkeit, Erstbewertung, Rückfälle, Höchststand, Warteschlange und Protokoll zurück (3.17.6).
- `wischNachholen` steht in `endSession`. Tab- und Bereichswechsel während der Runde sind nicht erreichbar, weil die Reiter im Modus ausgeblendet sind (`imModus`, `app.js:7309`).
- Die Tastatur-Kürzel sind bei offenem Dialog oder Blatt gesperrt. Enter/Leertaste auf einem Knopf lösen den Knopf aus.
- Streuung (Jitter) nach oben ist bei 180 Tagen gekappt. Die Streuung ist bis Stufe 3 praktisch 0, was in Ordnung ist.
- Leech-Erkennung gibt es schon (`LEECH_SCHWELLE`, `istVerbrannt`), sie wird deshalb nicht vorgeschlagen. `evaluateStreakForNewDay` ist absichtlich tot und wurde nicht angefasst.
- Abgelehnte Bewertungen und das Protokoll werden nach Ausweis-Erneuerung nachgeschickt (`abgelehntesNachholen`).
- Das erste Protokoll des Tages geht sofort raus, der Rest gebündelt. Beim Verbergen der Seite wird sofort geschrieben (`visibilitychange`).
- Das Echo des Nutzerdokuments wird erst nach dem ersten echten Stand ignoriert (`cloudDocExists`, § 8.3).

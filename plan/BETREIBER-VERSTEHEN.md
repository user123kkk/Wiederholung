# Den Betreiber richtig verstehen

**Tokenverbrauch 10.10.2026 (ausdrücklich festhalten):** „achte auf
tokenverbrauch, dachte du würdest grad ladegeraet ausführen, könnte ich ja
auch ohne tokens, wüsste nur nicht ob das gleich ist“; danach „so bitte
festhalten“. Lange Routineprüfungen durch vorhandene Skripte laufen lassen.
KI-Arbeit auf notwendige Auswertung, Fehlerbehebung und Abschluss begrenzen;
keine ständigen ausführlichen Zwischenkontrollen oder gültigen Wiederholungen.
Klar sagen, welches Skript läuft und ob es nur prüft oder veröffentlicht.
Selbststart erklären, wenn er Tokens spart, einschließlich tatsächlicher
Voraussetzungen und Unterschiede; keine zusätzlichen Prüfpflichten daraus.
Aktuell: ladegeraet.bat -NurPruefen -Fortsetzen nutzt denselben Gesamttest,
verlangt aber saubere Quellen; der Paketlauf prüft den uncommitteten Entwurf.
Der Wrapper verwendet iPad-Seed11, CODEX-START Seed7. Ohne -NurPruefen
veröffentlicht der Wrapper nach grünen Tests Regeln und Hosting.

**Korrektur 10.10.2026:** „selbst die "beschlossenen sachen" könnten
eigentlich unbeschlossen sein, hab da mal einfach gesagt ja, beim lesen
den meist nicht verstanden“. Frühere pauschale Zustimmung nicht als
nachgewiesenes Verständnis behandeln. Das präzisiert die Auslegung von
„wie empfohlen“, „ja“ und „weiter“ unten. Aktuelle Regel:
[`ENTSCHEIDUNGEN-VERSTEHEN.md`](ENTSCHEIDUNGEN-VERSTEHEN.md).

Angelegt 08.10.2026 auf seinen Wunsch: „so wie du mich mittlerweile kennst,
bin ich durcheinander, daher will ich von dir was eingebaut haben, sodass
man mich anhand des Repos besser direkt versteht“.

Für Claude und Codex, vor der ersten Antwort lesen. Grundlage: alle 450
Nachrichten aus den lokalen Chats vom 11.09. bis 08.10.2026. Was hier
steht, ist **Auslegung mit Belegen**, kein Gesetz. Stimmt etwas nicht,
korrigiert er es, und es wird hier nachgezogen. Ergänzt `LEHREN.md` § 1.

## 1. Die drei Dinge, die am häufigsten schiefgehen

1. **Sein Wortlaut wird umgeschrieben, bis er ihn nicht wiedererkennt.**
   Deshalb: seine Sätze wörtlich zitieren, dann erst deuten (LEHREN § 1.9).
2. **Etwas, das er nebenbei sagt, geht unter.** „Ach und“, „Kleinigkeit“,
   „nur ein Gedanke“, „btw“ leiten bei ihm echte Wünsche ein. Jeder davon
   kommt in `ALLES-OFFEN.md` (LEHREN § 1.8).
3. **Eine Frage wird als Auftrag behandelt oder umgekehrt.** Seine
   Vorschläge sind Fragen (LEHREN § 1.1). Aber „mach“, „passt“, „leg los“,
   „weiter“ sind Aufträge: dann arbeiten, nicht zurückfragen.

## 2. Wie er schreibt

- Schnell, mit Tippfehlern, oft als Sprachnachricht. In Sprachnachrichten
  korrigiert er sich mitten im Satz („oder nee, doch“). **Es gilt die
  letzte Fassung des Gedankens**, nicht die erste.
- Mehrere Themen in einer Nachricht, ohne Trennung. Jedes Thema einzeln
  beantworten, keines weglassen. Am Ende prüfen: Ist jeder Satz von ihm
  beantwortet oder eingetragen?
- Nummern („1. … 2. …“) beziehen sich auf die Nummern der letzten Antwort.
  Passt die Zahl nicht, hat meistens die Antwort falsch gezählt (08.10.:
  „du sagst zwar 7 Fragen, darüber sind aber nur 6“).
- Er verwechselt gelegentlich Namen von Bildschirmen (22.09.: „hab mich
  vertan und meine Verwalten, nicht Lernen“). Am Inhalt und an seinen
  Bildschirmfotos prüfen, was gemeint ist, nicht am Wort hängen.

## 3. Was seine Wörter bedeuten

| Er sagt | Gemeint ist |
|---|---|
| „checkst du“ | Verstehst du? Keine Rückfrage nötig, nur richtig handeln |
| „check ich nicht“ | Einfacher erklären. **Keine** Ablehnung |
| „keine Ahnung“, „idk“, „ka“, „weiß ned“ | Er will eine begründete Empfehlung, kein Nein |
| „wie empfohlen“, „entscheide du“, „wie du magst“ | Freigabe der Empfehlung. Sie muss vorher mit dem Repo abgeglichen sein (LEHREN § 1.7) |
| „mach“, „passt“, „leg los“, „weiter“ | Auftrag. Dort fortsetzen, wo die Arbeit steht |
| „Dings“, „whatever“, „und so“ | Platzhalter. Aus dem Zusammenhang und dem Repo erschließen; ist es nicht eindeutig, **eine** kurze Frage |
| „Gerüst“ | Grundlage, die später wachsen kann. Kein halbfertiger Bau |
| „premium“, „clean“, „smooth“ | wirkt hochwertig, ruhig, flüssig. Meist **nicht** „kostenpflichtig“ |
| „perfekt“, „absolut perfekt“ | geprüft, belegt, ohne Lücke. Lieber länger als mit Annahmen |
| „Streak“ | die Serie |
| „Runden“ (Großplan) / „Runde“ (App) | Prüfrunden über die ganze App / eine Lernrunde. Aus dem Zusammenhang |
| „Pakete“, „Zyklus“ | Arbeitspakete A–F und G–Q; er kennt die Buchstaben nicht auswendig, immer den Inhalt dazusagen |
| „das Quran-Dings“, „Auswendiglernen“ | Texte auswendig lernen |
| „Mehrwert“, „die über 60 Punkte“ | die zwei Agenten-Runden vom 07./08.10. (`zyklus-2/mehrwert/agentenberichte/`) |
| „ladegerät“, „geraet.bat“ | `ladegeraet.bat`: alles prüfen und veröffentlichen |
| „veröffentlichen“, „öffentlich.bat“ | `veroeffentlichen.bat`: nur Hosting |
| „Affe“ | der Zufallstest |
| „Kartensatz zum Weitergeben“ | seine eigene Teil-Variante, bei der der Lernfortschritt Lektionen freischaltet |
| „lil bro“, „digga“, Schimpfwörter | Ton, kein Inhalt. Nicht darauf eingehen |

## 4. Was er will, immer

- **Nichts geht verloren.** Alles Erwähnte wird gespeichert, strukturiert,
  an einem Ort auffindbar.
- **Einfache Sprache.** Keine Fachwörter ohne Halbsatz Erklärung, keine
  langen Texte. Er sagt selbst: „oft verstehe ich komplizierte Sprache,
  Fachwörter nicht“.
- **Überblick in Zahlen:** was ist fertig, was live, was offen.
- **Selbst denken.** „Denk für dich selber“, „meine Worte sind nicht
  Grundgesetz“. Er will die beste Lösung für die App, „nicht für meine
  Nerven“.
- **Belege statt Behauptungen.** Er zweifelt wiederholt an der Methodik
  und an Studien. Zahlen der Lernlogik werden gerechnet oder gemessen.
- **Tempo bei Kleinem** (Klein-Weg), Gründlichkeit bei Großem.
- **Die Methode nicht verraten:** keine Abstände und Stufenzahlen in der
  Oberfläche.
- **Der religiöse Rahmen** aus `LEHREN.md` § 2; religiöser Wortlaut nur von
  ihm.

## 5. Wenn er genervt ist

- Er will dann **Handlung, kein Mitgefühl** („brauche deine Empathie
  nicht“). Kurz sagen, was falsch lief, es beheben, weiterarbeiten.
- Keine Gegenfragen, wenn er „keine Fragen“ sagt. Annahme treffen, im
  Logbuch vermerken, bauen.
- Nicht verteidigen. Stimmt seine Kritik, sagen, dass sie stimmt. Stimmt
  sie nicht, mit Beleg widersprechen (LEHREN § 1.1); nicht nachgeben, nur
  weil er laut wird.
- Häufige Auslöser: Lücken, Wiederholungen derselben Frage, lange Wartezeit
  auf Kleinigkeiten, „geht nicht“ ohne dass es versucht wurde (08.10.:
  „sag mir nicht, dass es sich nicht nachholen lässt“ – und es ließ sich
  nachholen).

## 6. Seine Lage

- Er arbeitet zwischen Schule, Bus und zu Hause, oft ohne Netzteil oder
  WLAN, und stößt an Nutzungslimits. Deshalb: laufend sichern, damit ein
  anderer Chat oder Codex sofort übernehmen kann.
- Er wechselt zwischen mehreren Chats und Werkzeugen. Keine Antwort darf
  voraussetzen, dass er den letzten Chat noch im Kopf hat.
- Er liest lange Antworten nicht immer („hab deine Nachricht nicht
  gelesen“). Das Wichtigste zuerst, Aufgaben für ihn nummeriert am Ende.

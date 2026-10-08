# Mehrwert: Texte auswendig

Wörtlich aus dem Chat a495c23a, Agent 3, gestartet 2026-10-07 16:06 (Quelle: `agent-a4f88f0fc17a1fa05.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

Du arbeitest an einer Ideen- und Prüfrunde für die Karteikarten-App "Adrabic" (Arabisch lernen, PWA ohne eigenen Server, ein einzelner Betreiber). Repo: C:\Users\USER\Desktop\Wiederholung (NICHT C:\Users\USER\Wiederholung). NUR LESEN: keine Datei ändern, keine Tests, keinen Browser, keinen Server starten, kein git commit. Websuche ist erlaubt.

Pflichtlektüre zuerst: plan/STAND.md, plan/LEHREN.md §1 und §2, plan/texte-lernen/KONZEPT.md, plan/texte-lernen/WIEDERHOLEN.md, plan/texte-lernen/ANFANG-VORLAGE-2026-10-07.md, oberster Eintrag plan/texte-lernen/LOGBUCH.md. Feste Grenzen: religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte, Übersetzungen oder arabischen Text und verändert Quran-Text nicht; keine Sekten/Organisationen/Politik; keine religiösen Angaben speichern; kein eigener Server.

Auftrag des Betreibers (wörtlich): "stelle sicher dass dieses Quran-Dings bzw. Texte top 1 ist, perfekt, Aufwand ist kein Problem" und "echten unbestreitbaren Mehrwert".

DEIN BLICKWINKEL: der Teil "Texte auswendig lernen" (Quran-Suren, Hadith, Gedichte; Zeile für Zeile, drei Hilfestufen, Wiederholkreis, Nachbarzeilen, Denkpause, Kontrollfrage). Lies den Code in app.js ab dem Kommentar "Neu lernen (Stufe 3)" und suche renderTextLernen, renderTextWdh, text-anlegen, tanzil, kreisTage. Recherchiere, wie Quran-Auswendiglernen in der Praxis läuft (neue Lektion / nahe Wiederholung / ferne Wiederholung – oft Sabaq, Sabqi, Manzil genannt; Verbinden der Ayat; Mutashabihat = ähnliche Verse; laut aufsagen; Abhören durch Lehrer) und was gute Apps bieten (Tarteel u. a.). Prüfe kritisch, was der App gegenüber dieser Praxis fehlt oder widerspricht, und was sie ohne Mikrofon/Server sinnvoll leisten kann (z. B. Aufsagen am Stück über Zeilengrenzen, Übergänge zwischen Zeilen gezielt üben, ähnliche Zeilen nebeneinander, Aufnahme zum Selbst-Abhören lokal, Audio-Rezitation: Lizenz- und Rahmenfragen nur benennen, nicht entscheiden).

LIEFERE auf Deutsch, einfache Sprache, höchstens 700 Wörter: nach Nutzen geordnete Liste von höchstens 8 Vorschlägen. Je Vorschlag: was genau, warum es hilft (Quelle mit Link; ehrlich: Studie, Praxis oder Meinung), was dagegen spricht, Aufwand, Risiko (auch religiös-inhaltlich: wo muss der Betreiber selbst entscheiden oder Wortlaut liefern), betroffene Stelle im Code. Am Ende: 3 erste Schritte, 2 verlockende, aber schädliche Ideen. Nichts erfinden; Ungeprüftes kennzeichnen.

## Bericht des Agenten

## Texte auswendig lernen: Prüfung und Vorschläge

Nur gelesen (Pflichtdateien, `C:\Users\USER\Desktop\Wiederholung\app.js` Zeilen 12842–13505), dazu Websuche. Nichts geändert, nichts am Gerät geprüft. Die Links sind Suchtreffer; die Seiten selbst habe ich nicht geöffnet.

**Was gut passt:** Neu / frisch / fest mit Kreis entspricht der Praxis (neue Lektion, nahe und ferne Wiederholung). Reihenfolge, Nachbarzeilen und Anfang der Zeile passen ebenfalls.

### Vorschläge, nach Nutzen

**1. Übergang vom Gestern ins Heute mit aufsagen**
- Was: Beim „Am Stück“ die letzte schon gelernte Zeile davor verdeckt mit aufsagen, unbewertet. Heute steht sie nur grau da.
- Warum: Ayat verbinden ist Kern der Praxis; Fehler sitzen an den Nahtstellen. Praxis: [quransheikh.com](https://www.quransheikh.com/how-to-memorize-quran-without-forgetting), [Tarteel-Blog](https://tarteel.ai/blog/how-to-memorize-the-quran-quickly/).
- Dagegen: etwas länger; ändert das Neu-Lernen mitten im Probelauf.
- Aufwand: klein. Risiko: Lernlogik, Betreiber entscheidet.
- Code: `amStueckZeilen`, `renderTextLernen` (Aufruf `hinweis(reihe[0].id, 2)`).

**2. „Ganz aufsagen“: ganzer Text oder Bereich von–bis am Stück**
- Was: alles verdeckt, abschnittsweise aufdecken, Hakendes antippen. Heute endet jedes Stück nach 5 Zeilen, und über das Textende läuft kein Abschnitt.
- Warum: Beim Abhören und im Gebet sagt man ganze Suren auf (Praxis, [thehifzproject.com](https://thehifzproject.com/articles/sabaq-sabqi-manzil)).
- Dagegen: lange Sitzung; unklar, ob es den Kreis weiterschiebt.
- Aufwand: mittel. Risiko: Empfehlung zunächst ohne Wertung für die Probelauf-Zahlen.
- Code: `inAbschnitte`, `kreisAbschnitte`, `renderTextWdh`.

**3. Schwache Stellen sichtbar machen**
- Befund: `KONZEPT.md` § 7.1 sagt „`rueckfaelle` +1, wenn eine feste Zeile hakt“. `textWdhBewerten` erhöht das Feld nicht. Bei Textzeilen bleibt es immer 0.
- Was: zählen, in der Text-Ansicht markieren, „Nur die Schwachen üben“ (mit Nachbarn).
- Warum: Tarteel führt eine Fehlerhistorie ([App Store](https://apps.apple.com/us/app/-/id1391009396)); ein Lehrer markiert Fehler im Mushaf (Praxis, ungeprüft).
- Dagegen: darf nicht nach Tadel aussehen.
- Aufwand: klein bis mittel. Risiko: gering; Feld und Regeln gibt es schon.
- Code: `textWdhBewerten`, `textWdhRueckgaengig`, `textAnsichtZeilenHtml`.

**4. Ähnliche Zeilen nebeneinander (Mutashabihat)**
- Was: Wenn eine Zeile hakt, andere Zeilen aus den eigenen Texten mit gleichem Anfang oder Ende daneben zeigen. Reiner Zeichenvergleich, Text unverändert.
- Warum: bekannte Fehlerquelle; Tarteel markiert sie farbig ([Tarteel-Hilfe](https://support.tarteel.ai/en/articles/12414414-what-do-the-different-text-colours-mean)).
- Dagegen: maschineller Vergleich kann unpassende Paare liefern.
- Aufwand: mittel. Risiko religiös-inhaltlich: nur Wortgleichheit zeigen, keine Deutung. Eine fertige Liste ([QUL](https://qul.tarteel.ai/resources/mutashabihat/73)) ist bei Lizenz und Herkunft ungeprüft; der Betreiber entscheidet.
- Code: neu, neben `kontrollWahl`.

**5. Kontrollfrage schärfen**
- Befund: `kontrollZaehler` lebt nur im Arbeitsspeicher. Bei kurzen Sitzungen kommt die Frage fast nie. Die falschen Wörter sind zufällige Zeilenanfänge.
- Was: Zähler am Text speichern; als falsche Wörter die Anfänge der Nachbarzeilen nehmen.
- Dagegen: härter. Aufwand: klein. Risiko: gering.
- Code: `textWdhStueck`, `kontrollWahl`.

**6. Sich selbst aufnehmen und abhören**
- Was: Aufnahme bleibt nur im Gerät, wird nach dem Vergleich verworfen.
- Warum: die eigene Stimme zu hören hilft dem Behalten (Studie, [Forrin & MacLeod](https://qz.com/1144521/youremembermoreofwhatyoureadoutloud)); das Ohr findet Fehler (Praxis).
- Dagegen: `firebase.json` sperrt das Mikrofon (`microphone=()`). Dazu Datenschutzerklärung und iOS-Eigenheiten. Ersetzt keinen Lehrer.
- Aufwand: mittel bis groß. Risiko: Recht; Betreiber entscheidet.

**7. Hinweis auf das Abhören durch einen Menschen**
- Was: ein Satz nach „fest“. Den Wortlaut liefert der Betreiber.
- Warum: Selbstbewertung findet keine Aussprachefehler (Praxis).
- Aufwand: winzig.

**8. Rezitation anhören**
- Nur benannt: Lizenzen sind unklar ([everyayah](https://huggingface.co/datasets/maqra-project/az-balayev), [Quran Foundation](https://api-docs.quran.foundation/legal/developer-terms/)). Fremder Server ist ausgeschlossen, selbst ausgeliefert wird es groß. Die Wahl des Rezitators trifft der Betreiber.

### Drei erste Schritte
1. Punkt 3: Zählfehler beheben und anzeigen.
2. Punkt 5.
3. Punkt 1 dem Betreiber vorlegen; im Logbuch vermerken, weil der Probelauf bis 29.10. läuft.

### Zwei verlockende, aber schädliche Ideen
- **Spracherkennung wie Tarteel:** braucht Server oder ein großes Modell, macht Fehler bei Harakat und täuscht ein Urteil über die Rezitation vor. Steht in `KONZEPT.md` § 16 schon als „nicht bauen“.
- **Von der App erzeugte Lückentexte, Übersetzungen oder Erklärungen zu Ayat:** verändert oder verfasst religiösen Inhalt (`LEHREN.md` § 2).

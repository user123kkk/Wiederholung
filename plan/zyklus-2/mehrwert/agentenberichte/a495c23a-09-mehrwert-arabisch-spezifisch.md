# Mehrwert: Arabisch-spezifisch

Wörtlich aus dem Chat a495c23a, Agent 9, gestartet 2026-10-07 16:06 (Quelle: `agent-a338cf54cd2785a58.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

Du arbeitest an einer Ideen- und Prüfrunde für die Karteikarten-App "Adrabic" (Arabisch lernen, deutschsprachig, PWA ohne eigenen Server, ein einzelner Betreiber). Repo: C:\Users\USER\Desktop\Wiederholung (NICHT C:\Users\USER\Wiederholung). NUR LESEN: keine Datei ändern, keine Tests, keinen Browser, keinen Server starten, kein git commit. Websuche ist erlaubt.

Pflichtlektüre zuerst (kurz): plan/STAND.md, plan/LEHREN.md §1 und §2, KONZEPT.md Abschnitt 0 und 7, plan/ideen/ (Überblick; es gibt dort evtl. etwas zu Grammatik-Karten/Notizen). Feste Grenzen: religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte oder arabischen Text (Beispiele nur aus vorhandenen Dateien zitieren, nichts Arabisches selbst schreiben); kein eigener Server.

Auftrag des Betreibers: "echten unbestreitbaren Mehrwert ... features, Sachen ausbauen, verbessern, hinzufügen".

DEIN BLICKWINKEL: Was braucht jemand, der ARABISCH lernt, das ein allgemeines Karteikarten-Werkzeug nicht bietet? Lies in app.js, wie eine Karte aufgebaut ist (wort, uebersetzung, extra/Notiz, Felder beim Anlegen: Suche renderCardForm, karte-sheet, extra, Plural, Wurzel, istArabisch, schriftAttr, arab-scale, Harakat) und wie gesucht wird. Prüfe und recherchiere: Harakat ein-/ausblenden als Schwierigkeitsstufe (Lesen ohne Vokalzeichen); Suche, die Harakat ignoriert; Felder für Plural, Verbformen (Vergangenheit/Gegenwart/Masdar), Wurzel, Genus; Wortfamilien über die Wurzel verbinden; Beispielsatz zur Karte (wer liefert ihn? Nutzer selbst); Aussprache hören (Web Speech API Arabisch: Qualität und Verfügbarkeit auf iOS/Android ehrlich; eigene Aufnahme des Nutzers/Lehrers lokal oder im Kartensatz – Speicherfrage); arabische Tastatur/Eingabehilfe beim Anlegen; schnelle Karten-Erstellung aus einer Lektion (Liste einfügen, Tabelle, Foto ist ohne Server unrealistisch – ehrlich sagen); Schriftgröße/Schriftwahl; Zahlen, Dual, gebrochene Plurale als typische Hürden. Was sagt die Forschung zum Vokabellernen in einer Sprache mit anderer Schrift und Wurzelsystem (Quellen)?

LIEFERE auf Deutsch, einfache Sprache, höchstens 700 Wörter: nach Nutzen geordnete Liste von höchstens 8 Vorschlägen. Je Vorschlag: was genau, warum es hilft (Quelle mit Link; ehrlich: Studie, Praxis oder Meinung), was dagegen spricht, Aufwand, Risiko, betroffene Stelle (Datei:Zeile). Am Ende: 3 erste Schritte, 2 verlockende, aber schädliche Ideen. Nichts erfinden; Ungeprüftes kennzeichnen.

## Bericht des Agenten

# Arabisch-Blickwinkel: 8 Vorschläge, nach Nutzen geordnet

Nur gelesen, nichts geändert, nichts am Bildschirm geprüft. Zeilen beziehen sich auf `C:\Users\USER\Desktop\Wiederholung\app.js` (3.18.23).

**Ausgangslage:** Eine Karte hat drei Felder: Wort, Übersetzung, Notiz (8954–8963). Die Suche ignoriert Harakat und Alif-Formen schon (12095–12124), die Duplikatprüfung auch (6059). Die Schriftgröße hat vier Stufen (1212). Dort ist nichts zu tun.

**1. Liste einfügen (F-1, schon „bauen“ empfohlen)**
- Was: Viele Zeilen „Wort; Übersetzung; Notiz“ auf einmal einfügen, mit Vorschau. Aus Excel kopierte Tabellen kommen mit Tab und passen dazu.
- Warum: 30 Wörter einer Lektion brauchen heute 30 Blatt-Durchgänge. Das ist Praxis, keine Studie (`plan/grossplan/FUNKTIONEN.md:20`).
- Dagegen: Tippfehler kommen im Stapel herein.
- Aufwand: 1–2 Sessions. Risiko: gering.
- Stelle: 6071 (`submitCardForm`), 6062 (`findeDuplikat`).
- Foto einer Buchseite geht ohne Server nicht verlässlich.

**2. Ohne Harakat abfragen (F-2)**
- Was: Schalter je Runde. Vorderseite ohne Vokalzeichen, nach dem Aufdecken mit. Gespeichert wird nichts verändert.
- Warum: Eine Studie mit 54 Lernenden zeigt, dass Harakat Lesetempo und Genauigkeit verbessern ([Deep Blue, Uni Michigan](https://deepblue.lib.umich.edu/items/86dd6622-6e6d-4551-a9fc-7a7782453bcf); nur die Zusammenfassung gelesen, der Volltext gab 403). Daraus folgt: Vorgabe „mit“, „ohne“ als bewusste Steigerung.
- Dagegen: Ob Quran-Wörter ohne Zeichen gezeigt werden, entscheidet der Betreiber. Shadda ist eine eigene Frage.
- Aufwand: 1 Session. Risiko: mittel, es berührt die Abfrage.
- Stelle: 11660 (`promptText`), 12095 (`SUCH_WEG`).

**3. Arabisch in der Notiz richtig setzen**
- Was: Die Notiz wird als gewöhnlicher Text ausgegeben, ohne `dir`, ohne arabische Schrift, in der Liste sehr klein. Ein arabischer Beispielsatz steht dort vermutlich schlecht lesbar und mit verrutschten Satzzeichen. Das ist aus dem Code abgeleitet, nicht am Bildschirm gesehen.
- Warum: Der Platzhalter lädt selbst zum „Beispielsatz“ ein (8963).
- Dagegen: Gemischte Zeilen (arabisch und deutsch) sind heikel.
- Aufwand: unter 1 Session. Risiko: Layout, viele Zustände prüfen.
- Stelle: 11855, 9623, 13892, 12057 (`renderExtra`); `styles.css:1796`, `2607`.

**4. Zweite Richtung Deutsch → Arabisch (F-5)**
- Warum: Produktives Üben baut produktives Wissen auf, rezeptives nur rezeptives (Studie: [Webb 2009, RELC Journal](https://www.proquest.com/docview/224066064)). Die Handschrift-Übung gibt es schon (11660), nur ohne Lernstand.
- Dagegen: Lernlogik, neue Kartenfelder, Regeln.
- Aufwand: 3–4 Sessions. Risiko: hoch. Eigenes Konzept nötig.

**5. Wortfamilie über Notiz und Suche, kein neues Feld**
- Was: Platzhalter um „Plural, Wurzel“ ergänzen. Die Suche durchsucht die Notiz schon (12229), also findet die Wurzel in der Notiz alle verwandten Karten.
- Warum: Lernende reagieren auf Wurzeln wie Muttersprachler (Studie: [Aljasser 2026](https://jltr.academypublication.com/index.php/jltr/article/view/12186)). Dass ein Wurzelfeld in einer App hilft, ist damit nicht belegt.
- Dagegen: Das Wurzel-/Grammatikfeld wurde in 3.9.8 entfernt, 0 von 136 Karten nutzten es (`FUNKTIONEN.md:70`). Feste Felder für Plural, Verbformen, Genus empfehle ich deshalb nicht. Dual, Zahlen und gebrochene Plurale sind Lehrstoff und kommen vom Nutzer.
- Aufwand: Minuten. Risiko: keins.

**6. Lückentext aus dem eigenen Beispielsatz (F-9)**
- Erst sinnvoll, wenn Karten Beispielsätze tragen, also nach 1 und 3. Den Satz liefert nur der Nutzer. Meinung, keine Quelle geprüft.
- Aufwand: 1–2 Sessions.

**7. Ton nur aus echten Aufnahmen (F-11a)**
- Was: Vom Betreiber aufgenommene Dateien über das Hosting, erst wenn Aufnahmen da sind.
- Dagegen: Aufnahmen der Nutzer brauchen Cloud-Speicher im Bezahltarif und sind Stimmdaten (F-11b). Nur lokal gespeichert gingen sie beim Gerätewechsel verloren.
- Aufwand: 1–2 Sessions plus die Aufnahmen.

**8. Harakat-Leiste über der Tastatur: lieber nicht jetzt**
- Was: Eine Webseite kann die Tastatursprache nicht umschalten. Möglich wären Knöpfe für die Vokalzeichen am Wort-Feld.
- Dagegen: Das Blatt und die Tastatur waren schon mehrfach Fehlerquelle (G-118). Der Nutzen ist ungeprüft.
- Stelle: 8955.

## Drei erste Schritte
1. Nr. 3 am iPhone ansehen: eine Karte mit arabischem Satz in der Notiz anlegen. Bestätigt sich der Befund, ist das ein Fehler und kein Feature.
2. F-1 freigeben und bauen.
3. Für F-2 entscheiden: Gilt es auch für Quran-Wörter, und bleibt Shadda stehen?

## Zwei verlockende, aber schädliche Ideen
- **Vorlesen per Sprachsynthese.** Welche Stimme es gibt, hängt vom Gerät ab, und auf iOS läuft es unzuverlässig ([Überblick](https://orthogonal.info/how-to-implement-text-to-speech-in-javascript/)). Ob jedes Gerät eine arabische Stimme hat, ist ungeprüft. Es wäre maschinell erzeugtes Arabisch und ist schon abgelehnt (F-15, `LEHREN.md` § 1.6).
- **Automatik für Beispielsätze, Wurzeln oder Harakat (KI).** Sie erzeugt Lehrstoff, den niemand geprüft hat (F-19).

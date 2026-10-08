# Mehrwert: Üben und Schreiben

Wörtlich aus dem Chat a495c23a, Agent 2, gestartet 2026-10-07 16:06 (Quelle: `agent-a0b29b7cf33554bdf.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

Du arbeitest an einer Ideen- und Prüfrunde für die Karteikarten-App "Adrabic" (Arabisch lernen, PWA ohne eigenen Server, ein einzelner Betreiber). Repo: C:\Users\USER\Desktop\Wiederholung (NICHT C:\Users\USER\Wiederholung). NUR LESEN: keine Datei ändern, keine Tests, keinen Browser, keinen Server starten, kein git commit. Websuche ist erlaubt.

Pflichtlektüre zuerst (kurz): plan/STAND.md, plan/LEHREN.md §1 und §2, KONZEPT.md Abschnitt 0 und 7. Feste Grenzen: religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte oder arabischen Text; keine Sekten/Organisationen/Politik; keine religiösen Angaben speichern; kein eigener Server; keine manipulativen Muster.

Auftrag des Betreibers (wörtlich): "ich will dass das Lernen auf dieser Seite wirklich hilft ... auch der Übungsmodus, der freiwillig ist, idk, so ziemlich alles" und "echten unbestreitbaren Mehrwert".

DEIN BLICKWINKEL: der freiwillige Übungsmodus ("Üben", zählt nicht für Wiederholungen), die Handschrift ("Mit Schreiben", Deutsch → Arabisch von Hand, Vollbild-Schreiben, drawStrokes), Durchsicht, Speicherkarten/gemerkte Karten. Lies in app.js: open-drill, start-drill, renderDrill*, drillGruppenKarten, drill-handwriting, drawStrokes, Durchsicht, merk*. Frage: Wozu dient der Modus heute, wann hilft freies Üben nachweislich (z. B. vor einer Prüfung, schwache Karten, aktives Schreiben/Produzieren, Tippen statt Selbstbewertung), wann ist es nur Beschäftigung? Was würde Schreiben im Arabischen wirklich bringen (Forschung zu Handschrift und Behalten, Schriftlernen)? Was fehlt: z. B. nur schwache Karten üben, Fehlerliste nach dem Üben, Tippen mit arabischer Tastatur, Hören. Was davon ist ohne Server machbar (Web Speech API für Vorlesen: Qualität bei Arabisch ehrlich einschätzen)?

LIEFERE auf Deutsch, einfache Sprache, höchstens 700 Wörter: nach Nutzen geordnete Liste von höchstens 8 Vorschlägen. Je Vorschlag: was genau, warum es nachweislich hilft (Quelle mit Link; ehrlich: Studie, Praxis oder Meinung), was dagegen spricht, Aufwand (klein/mittel/groß), Risiko, betroffene Stelle (Datei:Zeile). Am Ende: die 3 ersten Schritte und 2 verlockende, aber schädliche Ideen. Nichts erfinden; Ungeprüftes kennzeichnen.

## Bericht des Agenten

# Üben, Schreiben, Durchsicht, Speicherkarten: Befund und Vorschläge

Nur gelesen, nichts geändert. Repo: `C:\Users\USER\Desktop\Wiederholung`, Stand 3.18.23. Die Studien kenne ich nur aus Suchtreffern und Zusammenfassungen, nicht aus dem Volltext.

## Was der Modus heute ist

- **Üben** startet aus Verwalten (`app.js:13624`), nach Stand oder nach Speicherkarten (`13632–13693`).
- Die Abfrage läuft wie beim Lernen, ändert aber weder Stufe noch Fälligkeit (`6528`, `6547`).
- Am Ende stehen drei Zahlen und „Noch eine Runde“. Der Knopf startet wieder **alle** Karten (`15711–15716`).
- **Mit Schreiben** ist die einzige Stelle der App mit Deutsch → Arabisch (`11660–11663`). Verglichen wird mit dem Auge.
- **Durchsicht**: „Gesehen“ stellt die Karte sofort in die heutige Abfrage (`5992`). Das ist schon richtig gebaut, dort ist nichts zu tun.

**Wann Üben hilft:** kurz vor Unterricht oder Prüfung, bei Karten, die nicht klappen, und beim Selbst-Hervorbringen (Deutsch → Arabisch, Schreiben).
**Wann es nur Beschäftigung ist:** Karten, die sitzen, am selben Tag noch einmal durchgehen. In der Studie von Rohrer u. a. 2005 war der Vorsprung nach einer Woche groß und schrumpfte danach stark ([Quelle](https://digitalcommons.usf.edu/psy_facpub/1772/)).

## Vorschläge, nach Nutzen

**1. Deutsch → Arabisch auch ohne Zeichnen**
- Was: zweiter Schalter „Deutsch → Arabisch“; Antwort im Kopf oder laut, dann umdrehen.
- Warum: Was man in dieser Richtung übt, kann man danach besser selbst hervorbringen (Studie, Webb 2005: [Link](https://www.cambridge.org/core/product/DDF362AE7B13D1949B1CD591DA2F3414)). Stilles Abrufen wirkt so gut wie lautes (Studie, Smith/Roediger/Karpicke 2013, nur Titel gesehen: [Liste](https://learninglab.psych.purdue.edu/publications)).
- Dagegen: ein Schalter mehr; berührt F-5 (zweite Richtung, „später“).
- Aufwand klein, Risiko klein, weil nur im Üben. Stelle: `11660–11663`, `13682–13688`.

**2. Abschluss mit Fehlerliste und „Nur die falschen noch einmal“**
- Was: unter den drei Zahlen die „Nicht“-Karten als Liste, dazu ein zweiter Knopf. Optional: „in Schwierige Wörter legen“.
- Warum: Praxis und meine Einschätzung, keine Studie. Heute sieht man nur „3 nicht“, aber nicht welche.
- Dagegen: Kornell & Bjork 2008 fanden, dass Karten weglassen leicht schadet ([Quelle](https://bjorklab.psych.ucla.edu/wp-content/uploads/sites/13/2016/07/Kornell_Bjork_2008_Memory.pdf)). Deshalb „alle noch einmal“ behalten.
- Aufwand klein bis mittel. Risiko: Höhe des Abschluss-Bildschirms. Stelle: `11982–12001`, `6529–6532`, `15711`.

**3. Chip „klappt nicht“ in der Auswahl**
- Was: Karten mit Rückfällen als eigene Auswahl. Die Daten gibt es schon (`card.rueckfaelle`, `6515`; Liste `4419`).
- Warum: Praxis (Anki behandelt solche Karten gesondert), keine Studie.
- Dagegen: darf keine Zahlen zeigen („System nicht verraten“). Die Liste im Fortschritt (`11556`) reicht manchen schon.
- Aufwand klein, Risiko klein. Stelle: `5814–5831`, `13668–13678`.

**4. Hinweis bei heute fälligen Karten**
- Was: in der Auswahl „X davon sind heute fällig, erst die Runde“.
- Warum: Wer direkt vor der Wiederholung übt, bewertet danach zu gut. Das ist meine Ableitung aus der Forschung zu Abständen, nicht gemessen.
- Dagegen: wirkt belehrend und grenzt an Lernlogik. Das entscheidet der Betreiber.
- Aufwand klein, Risiko mittel. Stelle: `5773`, `13680`.

**5. Schreiben: Vergleich auch in der kleinen Ansicht**
- Was: eigene Schrift und Lösung groß nebeneinander. Heute gibt es das nur im Vollbild (`12021–12025`).
- Warum: Erwachsene lernten arabische Buchstaben von Hand schneller als durch Tippen oder Zusehen und lasen danach besser (Studie, Wiley & Rapp 2021, 42 Personen: [Link](https://pmc.ncbi.nlm.nih.gov/articles/PMC8641140/)).
- Dagegen: Die Studie betrifft Buchstaben bei Anfängern, nicht Vokabeln über Monate. Finger auf Glas ist auch kein Stift. Der Nutzen ist am größten, solange die Schrift noch neu ist.
- Aufwand mittel. Risiko: Layout am Handy (3.17.8, 3.18.19). Stelle: `12016–12045`, `14507`.

**6. Tippen mit arabischer Tastatur: lieber nicht**
- Kein Vorteil fürs Behalten (siehe 1), und beim Schriftlernen war Tippen schwächer als Schreiben (siehe 5).
- Harakat am Handy tippen ist mühsam; ein genauer Vergleich wäre unfair.
- Aufwand groß.

## Die drei ersten Schritte

1. Der Betreiber entscheidet über Vorschlag 1. Er ist der kleinste Eingriff mit dem besten Beleg.
2. Vorschlag 2 als Entwurf, mit Messung der Bildschirmhöhe.
3. Vorschlag 3 dazu; Wortlaut des Chips vom Betreiber.

## Zwei verlockende, aber schädliche Ideen

- **Vorlesen über den Browser (Web Speech API).** Das geht ohne Server, aber die Stimme hängt vom Gerät ab. Android-Chrome fällt ohne Sprachpaket auf eine englische Stimme zurück ([Readium](https://readium.org/speech/docs/WebSpeech.html)). Bei Wörtern ohne Harakat rät die Stimme die Vokale; das ist meine Einschätzung, nicht getestet. Falsch Gehörtes prägt sich ein. Es ist außerdem maschinell erzeugtes Arabisch und als F-15 schon abgelehnt (`plan/grossplan/FUNKTIONEN.md:65`). Wenn Ton, dann Aufnahmen des Betreibers (F-11a).
- **Üben für Serie oder Stufen zählen lassen.** Dann wird Durchklicken belohnt und die Abstände stimmen nicht mehr. Es ist Lernlogik und bleibt tabu.

## Was Du noch tun musst

Nichts einspielen. Offen sind nur Deine Entscheidungen zu 1 bis 5.

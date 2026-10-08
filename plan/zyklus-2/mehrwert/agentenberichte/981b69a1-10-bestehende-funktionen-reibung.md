# Bestehende Funktionen Reibung

Wörtlich aus dem Chat 981b69a1, Agent 10, gestartet 2026-10-07 15:39 (Quelle: `agent-a1ffa1b86d28c3517.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 12 parallelen Ideen-Agenten für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build: app.js ~820 KB, styles.css, index.html, sw.js; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server; Hosting Firebase). Der Betreiber ist ein Einzelner, bisher Nutzer: er und wenige Freunde; Ziel ist eine öffentliche, ernsthafte Lern-Website. Zielgruppe: deutschsprachige Muslime, die Arabisch (Quran-/klassisches Arabisch) lernen. Neu im Probelauf: "Texte auswendig lernen" (u. a. Quran, Tanzil-Daten unter quran/).
Frage des Betreibers: Wie kann das Tool ECHTEN, UNBESTREITBAREN Mehrwert bieten – Features, Ausbau, Verbesserungen, Neues. Er will ein großes, gründliches Ergebnis.
HARTE REGELN: NUR LESEN. In einem anderen Chat wird gerade am Repo gearbeitet. Also: keine Datei im Repo anlegen/ändern/löschen, keine git-Befehle außer rein lesenden (log, show, diff, grep), keine Tests, keine Server, keine Skripte aus plan/werkzeuge starten, nichts installieren. app.js nie komplett lesen, sondern mit Grep gezielt suchen und Ausschnitte lesen.
Nützliche Dateien: KONZEPT.md, README.md, CHANGELOG.md, plan/STAND.md, plan/grossplan/FUNKTIONEN.md (bereits bewertete Funktionen: Korb 1/2/3 – nichts davon einfach wiederholen, sondern darauf aufbauen oder begründet widersprechen), plan/texte-lernen/KONZEPT.md und WIEDERHOLEN.md, plan/lehrer-modus/GERUEST.md, plan/monetarisierung/GERUEST.md, plan/landing-page-strategie/STRATEGIE.md, plan/beobachtungen-lernwerkzeug.md, plan/zyklus-2/AUFGABEN.md.
Rahmenbedingungen des Projekts: Religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte selbst (Wortlaut kommt vom Betreiber oder aus geprüften Quellen); keine Sekten/Organisationen/Politik; keine Speicherung religiöser Angaben der Nutzer. Keine Dark Patterns. Datenschutz (DSGVO) ernst. Kein eigener Server (Cloud Functions wären eine bewusste Entscheidung – als Abhängigkeit kennzeichnen).
AUSGABEFORMAT (Deutsch, max. ca. 900 Wörter, kein Vorgeplänkel): 8–14 konkrete Ideen. Je Idee: Titel; was genau (2–3 Sätze); für wen und welcher belegbare Nutzen; Aufwand S/M/L; Abhängigkeiten (Server? Inhalte vom Betreiber? Lizenz? iOS-Grenzen?); Risiko/Gegenargument; Beleg (Datei:Zeile im Repo bzw. URL). Am Ende: deine Top 3 mit einem Satz Begründung und 1–2 Dinge, die man ausdrücklich NICHT bauen sollte. Ehrlich gewichten, nicht verkaufen. Nichts erfinden: Was du nicht geprüft hast, als Vermutung kennzeichnen.

DEIN BLICKWINKEL: Das Vorhandene besser machen statt Neues bauen. Erstelle dir aus dem Code ein Inventar aller Bildschirme und Funktionen (index.html Struktur; in app.js Grep nach "data-action=" – alle Aktionen auflisten und gruppieren; Tabs/Ansichten; Einstellungen) und lies plan/beobachtungen-lernwerkzeug.md, plan/zyklus-2/AUFGABEN.md (nur überfliegen: was ist als Fehler schon erfasst – das NICHT wiederholen) und die letzten ~15 Einträge in CHANGELOG.md. Suche dann nach: (a) Funktionen, die es gibt, die ein Nutzer aber kaum findet oder versteht (versteckter Wert); (b) Abläufe mit unnötig vielen Schritten bei den häufigsten Handlungen (Karte anlegen, Lernrunde starten, Fehler in Karte während des Lernens korrigieren, Karte suchen, Karten verschieben); (c) Stellen, an denen die App Wissen über den Nutzer hat, es aber nicht zurückgibt (z. B. schwerste Karten, oft verwechselte Paare, beste Lernzeit, Vergessensquote je Bereich); (d) fehlende kleine Dinge, die in jeder guten Karteikarten-App selbstverständlich sind (Suche über alles, Rückgängig der letzten Bewertung, Karte pausieren/zurückstellen, Markieren, Notiz/Eselsbrücke je Karte, Beispielsatz, Tags, Papierkorb, Bearbeiten während der Abfrage, Statistik je Bereich) – jeweils im Code prüfen, ob vorhanden, und mit Datei:Zeile belegen. Ergebnis: Ideen mit dem besten Verhältnis Nutzen/Aufwand, weil sie auf Bestehendem aufsetzen.

## Bericht des Agenten

BLICKWINKEL: Vorhandenes besser machen. Nur gelesen, nichts geändert. Zeilen beziehen sich auf app.js 3.18.10.

INVENTAR (geprüft)
Vorhanden: Rückgängig der letzten Bewertung (11066, 11350), „Merken" in die Speicherkarte „Schwierige Wörter" (11234, 5244), Notiz je Karte (ein Feld `extra`, 8386), Duplikatwarnung (5727), Suche ohne Harakat, mit Umschrift und unscharf (11423–11466, 13100–13106), Suche über alle Bereiche (13154), „Karten, die nicht klappen" ab 5 Rückfällen (232, 10880–10940), 7-Tage-Vorschau (10943), Üben nach Stufe oder Speicherkarte (13008, 13386), Handschrift, Wischen, Tasten 1/2/3 (6212–6240), Rundenlimit, Mehrfachauswahl mit Verschieben/Ablegen (13043–13045).
Fehlt (Grep 0 Treffer): Papierkorb, Pausieren/Zurückstellen, CSV-/Text-Export, Drucken, Listen-Import, Filter/Sortierung der Kartenliste, Bearbeiten in der Abfrage.
Einstellungen sind nur vier: Thema, arabische Schriftgröße, Rundenlimit, letztes Backup (1337).

IDEEN

1. Bearbeiten direkt in der Abfrage
- Was: Stift-Knopf auf der aufgedeckten Karte, der das bestehende Kartenblatt öffnet und danach zur selben Karte zurückkehrt.
- Nutzen: Tippfehler fallen beim Lernen auf. Der Leech-Hinweis sagt in der Runde „Formuliere sie um oder teile sie" (ca. 10986), bietet aber keinen Knopf; `edit-leech` gibt es nur unter Fortschritt (10937).
- Aufwand: S–M. Abhängigkeiten: keine.
- Risiko: Blatt über der Bühne (iOS-Tastatur, Scroll-Vorgeschichte). Die Tastensperre bei offenem Blatt existiert schon (6218).
- Beleg: Die Runde kennt nur reveal, grade-*, karte-merken, toggle-extra, undo-grade (10997–11299).

2. Rundenende zeigt die verpatzten Karten
- Was: Unter „sicher/fast/nicht" die Liste der „Nicht"-Karten, mit „Diese noch einmal üben" und „Alle merken".
- Nutzen: Heute stehen dort nur drei Zahlen (11330–11333). Welche Karten es waren, weiß die Runde, gibt es aber nicht zurück.
- Aufwand: S. `startDrillWithCards` (5522) nimmt eine beliebige Kartenliste.
- Risiko: längerer Abschlussbildschirm, also einklappbar halten.

3. „Zu ähnlich zu welcher?" bei festhängenden Karten
- Was: Auf der Leech-Seite und beim Anlegen die ähnlichste vorhandene Karte daneben zeigen (gleiches Gerüst ohne Harakat, unscharfer Treffer).
- Nutzen: Der Text behauptet „zu ähnlich zu einer anderen" (10920), nennt sie aber nicht. Verwechslungspaare sind beim Arabischen ein Kernproblem.
- Aufwand: M. Baut auf `vergleichsWort` und `suchLauf(…, true)` auf.
- Risiko: Heuristik mit Fehltreffern. Echte Verwechslungsdaten gibt es nicht, weil kein Bewertungsverlauf je Karte gespeichert wird.

4. Duplikatprüfung über alle Bereiche
- Was: `findeDuplikat` prüft nur den offenen Bereich (5703–5706). Erweitern mit dem Hinweis „steht schon in Bereich X".
- Aufwand: S. Risiko: gewollte Dubletten, deshalb „Trotzdem speichern" lassen.

5. Trefferquote zurückgeben
- Was: Das Tagesprotokoll speichert nur w/n/u (905–913). Der Rundenzähler known/almost/unknown (6068) verfällt. Zwei Zähler je Tag mehr ergeben „Diese Woche X % gewusst" und einen Hinweis bei zu vielen neuen Karten.
- Nutzen: die einzige ehrliche Rückmeldung, ob das Pensum passt.
- Aufwand: M. Abhängigkeit: Firestore-Regeln für die neuen Felder, Betreiber-Deploy.
- Risiko: Die Zahl kann entmutigen. Mit dem geplanten Fortschritt-Umbau (C28) abstimmen. Ausdrücklich nicht als Premium (F-13).

6. Filter in Verwalten: neu / fällig / hängt fest / ohne Notiz
- Was: Die Liste kennt nur Suche (13080–13095). Die Stufen-Chips gibt es schon, aber nur im Üben-Panel (13008).
- Nutzen: „Zeig mir, was wackelt" kostet heute den Umweg über Fortschritt.
- Aufwand: S–M. Risiko: mehr Bedienelemente in einem schon vollen Tab.

7. Handschrift auch in der normalen Runde
- Was: Schalter beim Rundenstart. Heute nur im Üben: `startSession` hat kein `handwriting` (5908), `startDrillWithCards` schon (5534).
- Nutzen: stärkstes Alleinstellungsmerkmal, kaum auffindbar. FUNKTIONEN.md nennt es die Brücke zu F-5.
- Aufwand: M. Risiko: Vollbild- und Scroll-Fehler haben Geschichte (2.21.x). Berührt die Abfrage-Oberfläche, nicht die Stufenlogik; trotzdem Betreiber-Entscheidung.

8. Karte in dieser Runde überspringen
- Was: „Später" schiebt die Karte ans Ende der Warteschlange, ohne Bewertung.
- Nutzen: Karten, die man gerade nicht fair beurteilen kann, erzwingen heute eine falsche Bewertung.
- Aufwand: S. Risiko: Ausweichknopf. Echtes Pausieren über Tage wäre Lernlogik und damit tabu; nur auf ausdrückliches Ja.

9. Löschen mit „Rückgängig"-Meldung
- Was: 5–8 Sekunden Rücknahme im Toast statt Papierkorb.
- Beleg: kein Papierkorb vorhanden; VERW-4 erfasst nur die fehlende Rückmeldung.
- Aufwand: M. Risiko: Mehrgeräte-Sync, also den Schreibvorgang verzögern statt zurückschreiben.

10. Alles Fällige in einer Runde
- Was: `startSession` nimmt nur den offenen Bereich (5893, 5908). Bei mehreren Bereichen heißt das mehrere Starts.
- Aufwand: M. Risiko: Der Abstandsregler hängt am Bereich (6018), und LERN-12 (Hinweis antippbar) löst den halben Schmerz billiger. Erst LERN-12 abwarten.

11. F-1 „Liste einfügen" und F-2 „ohne Harakat" vorziehen, dazu Text-Export
- Was: Beide sind beschlossen (ENTSCHEIDUNGEN.md:201), aber nicht gebaut (STAND.md:122). Der Import nimmt nur JSON (8615).
- Nutzen: 30 Wörter sind heute 30 Formular-Durchgänge. Der Text-Export als Gegenstück zeigt, dass niemand eingesperrt wird.
- Aufwand: je 1–2 Sessions.

12. Mehrstufiges Rückgängig
- Was: `lastAction` hält genau einen Schritt (6000 ff.).
- Aufwand: S–M. Nutzen eher klein; nur mitnehmen, wenn Idee 1 ohnehin an der Runde arbeitet.

TOP 3
1. Idee 1 (Bearbeiten in der Abfrage): Die App fordert dazu selbst auf und bietet den Weg nicht an.
2. Idee 2 (Rundenende mit den verpatzten Karten): kleinster Aufwand, gibt vorhandenes Wissen sofort zurück.
3. Idee 11 (F-1 zuerst): bereits entschieden und der größte Hebel bei der häufigsten Handlung.

NICHT BAUEN
- Tags oder weitere Kartenfelder (Beispielsatz, Wurzel): Speicherkarten erfüllen die Tag-Rolle schon (`kartenTagsHtml`, 3761), und F-20 wurde bei 0 von 136 Nutzungen entfernt.
- Statistik-Dashboard oder FSRS: ohne Bewertungsverlauf je Karte nicht belastbar (F-14), und der Fortschritt-Tab hat schon 15 offene Befunde.

GRENZEN DER PRÜFUNG
- Nicht geprüft: Texte-lernen-Abläufe, das Onboarding und das tatsächliche Verhalten am Gerät.
- Die Zeilenangabe bei Idee 1 (Leech-Hinweis) ist ungefähr.

# Mehrwert: Dranbleiben ohne Druck

Wörtlich aus dem Chat a495c23a, Agent 5, gestartet 2026-10-07 16:06 (Quelle: `agent-a0fd8551996021f00.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

Du arbeitest an einer Ideen- und Prüfrunde für die Karteikarten-App "Adrabic" (Arabisch lernen, PWA ohne eigenen Server, ein einzelner Betreiber). Repo: C:\Users\USER\Desktop\Wiederholung (NICHT C:\Users\USER\Wiederholung). NUR LESEN: keine Datei ändern, keine Tests, keinen Browser, keinen Server starten, kein git commit. Websuche ist erlaubt.

Pflichtlektüre zuerst: plan/STAND.md, plan/LEHREN.md §1 und §2, KONZEPT.md Abschnitt 0 und 7, plan/onboarding/PSYCHOLOGIE.md, plan/zyklus-2/BETREIBER-2026-10-06.md, plan/zyklus-2/E26-VORSCHLAG.md. Feste Grenzen: religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; keine religiösen Inhalte verfassen; keine religiösen Angaben speichern; kein eigener Server (also keine Push-Nachrichten vom Server); keine manipulativen Muster (kein Druck, keine Schuld, keine künstliche Verknappung).

Auftrag des Betreibers: "echten unbestreitbaren Mehrwert". Früher sagte er zur Serie: "ich will nicht dass Leute ihre Streak so verlieren, aber hey das gehört dazu".

DEIN BLICKWINKEL: Dranbleiben. Der größte Feind jedes Lernwerkzeugs ist, dass Leute nach zwei Wochen aufhören. Lies in app.js: Serie/Streak (tagGelernt, serie, Ruhetag falls vorhanden), Fortschritt-Tab (renderFortschritt, vorschau7, heuteAnteil), Rundenende (renderRundenEnde), Rundengröße/Limit, Rückstand nach Pause, Erinnerungen/Benachrichtigungen (falls vorhanden), PWA-Installation. Recherchiere, was nachweislich hilft, ohne zu manipulieren: Gewohnheitsanker (feste Tageszeit), kleine Tagesmenge, Umgang mit Rückstand nach Pause ("Erst einmal 20"), Fortschritt sichtbar machen (was kann ich jetzt, das ich vor einem Monat nicht konnte), lokale Erinnerungen in PWAs auf iOS/Android (was technisch ohne Server wirklich geht – ehrlich), Serie mit Schonung. Prüfe, wo die App heute Leute nach einer Pause mit einem Berg erschlägt.

LIEFERE auf Deutsch, einfache Sprache, höchstens 700 Wörter: nach Nutzen geordnete Liste von höchstens 8 Vorschlägen. Je Vorschlag: was genau, warum es hilft (Quelle mit Link; ehrlich: Studie, Praxis oder Meinung), was dagegen spricht, Aufwand, Risiko, betroffene Stelle (Datei:Zeile). Am Ende: 3 erste Schritte, 2 verlockende, aber schädliche Ideen (z. B. typische Dark Patterns). Nichts erfinden; Ungeprüftes kennzeichnen.

## Bericht des Agenten

**Dranbleiben: Befund und Vorschläge** (nur gelesen, Repo `C:\Users\USER\Desktop\Wiederholung`, Stand 3.18.23; nichts geändert, nichts am Gerät geprüft)

Vieles ist schon da: verziehener Tag alle 7 Lerntage (`app.js:3136`), Ruhetag (`:1045`), Kalender-Erinnerung (`:11034`), Wochenrückblick (`:10937`), Wenn-dann-Satz im Einstieg, Auswahl nach Dringlichkeit bei Rundenlimit (`:6288`).

Der Berg nach einer Pause steht an drei Stellen:
- Der Ring zeigt die volle Zahl, z. B. „412 fällig“ (`:11191`).
- Voreinstellung ist „Alle“ (`:1232`), also startet „Runde starten“ mit 412 Karten (`:6352`).
- Nach einer begrenzten Runde steht „Heute sind noch 392 Karten offen“ (`:11991`).

## Vorschläge, nach Nutzen

**1. „Erst einmal 20“ (E26) jetzt bauen**
- Was: Sind mehr als 30 Karten fällig und steht „Alle“, erscheint ein leiser zweiter Knopf. Die Einstellung bleibt unverändert.
- Warum: Die Anki-Praxis rät bei Rückstand zu einer festen Tagesmenge statt alles auf einmal ([Anki-Forum](https://forums.ankiweb.net/t/resume-learning-after-two-month-break-best-practices/64522)). Das ist Praxis, keine Studie. Die Voraussetzung (Reihenfolge, 3.18.22) ist gebaut.
- Dagegen: zweiter Knopf auf dem Bildschirm (Hick).
- Aufwand klein, Risiko mittel (nah an der Lernlogik, braucht sein Ja).
- Stelle: `app.js:11204`, `:6352`.

**2. Rundenende ohne Berg**
- Was: Bei großem Rest (z. B. über 30) statt der Zahl ein Satz wie „Für heute reicht das. Der Rest wartet.“ „Weiterlernen“ bleibt.
- Warum: Sonst hebt Vorschlag 1 sich selbst auf. Meinung, kein Beleg.
- Dagegen: Die Zahl ist ehrlich; wer sie will, sieht sie im Lernen-Tab.
- Aufwand klein, Risiko gering (nur Text).
- Stelle: `app.js:11991`.

**3. Serien-Warnung neu fassen**
- Was: Heute steht „Heute zählt: Ohne eine Runde endet deine Serie von N Tagen“ (`app.js:10916`). Das ist Verlustsprache, die `PSYCHOLOGIE.md` § 4 ausschließt. Neutral wäre z. B. „Eine Karte heute, und deine Serie läuft weiter.“ Die Regel bleibt, die Serie kann weiter reißen („gehört dazu“).
- Warum: Widerspruch zur eigenen Regel. Meinung.
- Dagegen: Die Warnung ist wahr und nützlich; manche wollen sie deutlich.
- Aufwand sehr klein, Risiko gering. Wortlaut entscheidet der Betreiber.

**4. Ruhiger Satz bei der Rückkehr**
- Was: Nach 7 oder mehr Tagen ohne Lerntag ein Hinweis in `lernenHinweis` mit der Zahl, die nie fällt: „N Karten hast du schon einmal gewusst“ (`gesesseneKarten`, `:10875`).
- Warum: Einzelne Aussetzer schaden der Gewohnheit kaum, dauernde Unregelmäßigkeit schon (Lally u. a. 2010, [UCL](https://www.ucl.ac.uk/news/2009/aug/how-long-does-it-take-form-habit)). Die Studie betrifft Gewohnheiten allgemein, nicht Lern-Apps.
- Dagegen: ein weiterer Hinweistyp; es gilt „höchstens einer“.
- Aufwand klein, Risiko gering.
- Stelle: `app.js:10901`.

**5. Wenn-dann-Satz nicht verlieren**
- Was: Der Satz wird mit der ersten eigenen Karte gelöscht (`app.js:1542`). Der Erinnerungs-Hinweis bietet danach nur Uhrzeiten (`:10994`). Vorschlag: Im Erinnerungs-Blatt zuerst die Frage „Woran hängst du die Runde?“ (eigene Situation), dann die Uhrzeit.
- Warum: Gollwitzer & Sheeran 2006, d = 0,65 (steht in `PSYCHOLOGIE.md` 1.1; Studie, nicht speziell zum Sprachenlernen).
- Dagegen: Ein Satz mit Gebetszeit ist eine religiöse Angabe. Er darf nur aufs Gerät, nie in die Kalenderdatei oder die Cloud, und die Datenschutzerklärung Punkt 7 müsste mit.
- Aufwand mittel, Risiko mittel (Recht).

**6. Monatsrückblick**
- Was: Einmal im Monat im vorhandenen Rückblick-Hinweis: „Seit dem 1.: N Karten zum ersten Mal gelernt“. Das lässt sich aus `ersteBewertung` rechnen (`app.js:5996`).
- Warum: Fortschritt über Wochen sieht man im Alltag nicht. Meinung.
- Dagegen: Eine ähnliche Zeile wurde im Fortschritt bewusst entfernt (Kommentar `:11369`, „doppelt“). Deshalb nur als Hinweis, nicht als Block.
- Aufwand klein, Risiko gering.

**7. Erinnerungen: beim Kalender bleiben**
- Geplante lokale Mitteilungen gibt es im Web nicht: Chromes „Notification Triggers“ wurde nach dem Test nie eingeführt ([Chrome-Doku](https://developer.chrome.com/docs/web-platform/notification-triggers)). iOS kennt nur Push mit Server ([Apple-Forum](https://developer.apple.com/forums/thread/735402)).
- Die Zahl am App-Symbol braucht auf iOS die Mitteilungs-Erlaubnis ([WebKit](https://webkit.org/blog/14112/badging-for-home-screen-web-apps/)) und ändert sich nur bei offener App.
- Urteil: nichts Neues bauen. Der `.ics`-Weg ist der richtige.

**8. Installation zur passenden Zeit anbieten**
- Was: Die Anleitung steht nur in den Einstellungen (`app.js:9912`). Vorschlag: einmal als Hinweis nach etwa drei Lerntagen, nur im Browser-Tab.
- Warum: Ein Symbol auf dem Home-Bildschirm ist ein täglicher Auslöser. Meinung, ungeprüft.
- Dagegen: noch ein Hinweis. Aufwand klein, Risiko gering.

## Drei erste Schritte
1. Vorschlag 3 dem Betreiber vorlegen (nur Wortlaut).
2. Vorschläge 1 und 2 zusammen als eine Entscheidung „E26 ja/nein“.
3. Vorschlag 4 danach, mit demselben Prüfstand-Fall „60 Tage Pause“.

## Verlockend, aber schädlich
- **Serie zurückholen gegen Leistung** („lerne heute 50, dann zählt gestern doch“) oder ein Countdown bis Mitternacht. Das ist Druck und Verlustangst, und rückwirkendes Zählen ist im Code bewusst ausgeschlossen (`app.js:3099`).
- **Rückstand verstecken oder still verwerfen**, damit die Zahl klein aussieht. Das wäre erfundener Fortschritt. Die Zahl darf leiser stehen, aber nie falsch sein.

**Ungeprüft:** Wirkung jedes Vorschlags in dieser App; Duolingo-Zahlen habe ich nicht verwendet (Firmenangaben). Die Anki-Quelle ist Forenpraxis.

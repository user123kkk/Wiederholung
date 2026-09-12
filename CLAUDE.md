# Hinweise für Claude Code

## Wenn hier jemand „leg los" sagt

Dann ist **immer** das gemeint: die Arbeit aus `plan/` an genau der Stelle
fortsetzen, an der die letzte Session aufgehört hat. Nicht nachfragen, nicht
neu planen, nicht auf einen Auftrag warten.

**So findest du die Stelle — in dieser Reihenfolge:**

1. [`plan/PLAN.md`](plan/PLAN.md) lesen. Der Abschnitt **„Wo eine neue Session
   anfängt"** nennt die nächste Phase. Die Statusspalte sagt, was `fertig` ist.
2. Den `AUFTRAG.md` dieser Phase lesen — er sagt, was zu tun ist und woran die
   Phase fertig ist.
3. Den `LOGBUCH.md` dieser Phase lesen, **letzter Eintrag zuerst**. Das Feld
   **„Nächster Schritt"** ist die konkrete Aufgabe.
4. Arbeiten. Nach jedem Arbeitsschritt das Logbuch fortschreiben und
   `plan/PLAN.md` nachziehen.

Steht bei der Phase eine offene Frage als Sperre (`plan/PLAN.md`, Abschnitt
„Offene Fragen"), dann diese Phase **nicht** beginnen — die nächste
unblockierte Phase nehmen und im Logbuch vermerken, warum.

## Die Grundregel

**Baue nichts, was nicht im Plan steht.** Grundlage ist [`KONZEPT.md`](KONZEPT.md),
der Auftrag steht dort in Abschnitt 0. Fällt dir etwas auf, das nicht im Plan
steht: ins Logbuch schreiben, nicht bauen.

Weiter gilt durchgehend (Konzept-Abschnitt 7):

- Keine Funktion des Lernwerkzeugs anfassen. Es geht um Fundament, Recht und
  Außenseite.
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
3. Neue Startdateien in `APP_SHELL` in `sw.js` aufnehmen.
4. Eintrag in `CHANGELOG.md`.

Plandateien unter `plan/` und `KONZEPT.md` sind reine Textdateien, stehen nicht
in `APP_SHELL` und werden nicht ausgeliefert — für sie entfällt die Liste.

## Was dieses Repo ist

Karteikarten-PWA, Version 3.0.3. Kein Build-Schritt, keine Paketverwaltung: die
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

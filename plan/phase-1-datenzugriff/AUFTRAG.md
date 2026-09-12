# Phase 1 — Datenzugriff härten

Status: `offen`
Gehört zu: [`../PLAN.md`](../PLAN.md)
Setzt voraus: Phase 0 (`fertig`) — die Befunde zu Konzept-Abschnitt 4.2 und 4.4

---

## Warum an dieser Stelle

Die Firestore-Regeln sind das Einzige, was heute wirklich Daten schützt. Alles,
was im Browser geprüft wird, ist Bedienkomfort und keine Grenze — wer die
Entwicklerwerkzeuge öffnet, umgeht es. Diese Phase kommt vor allen anderen
Bauphasen, weil sie an der Struktur hängt: Später nachzuziehen heißt, bereits
geschriebene Daten nachträglich sortieren zu müssen.

## Was getan wird

Grundlage ist ausschließlich, was `../phase-0-bestand/BEFUND.md` zu den
Abschnitten 4.2 (Datenzugriff) und 4.4 (Eingaben und Ausgaben) als `🔧`
festgestellt hat. Kein Punkt wird hier neu erfunden.

1. **`firestore.rules` Feld für Feld.** Deckt die Regel jeden Pfad ab, den die
   App tatsächlich benutzt? Ist jeder Pfad, den sie nicht benutzt, verschlossen?
2. **Feld-Manipulation.** Darf der Browser heute jedes Feld frei schreiben?
   Kritisch bei Stufe, `maxStufe` und schreibgeschützten Bereichen — ein
   manipuliertes Feld verfälscht die Lernlogik dauerhaft.
3. **Import-Prüfung.** Der JSON-Import ist der einzige Dateiupload der App.
   Größe, Struktur und Felder müssen geprüft werden, **bevor** geschrieben wird.
4. **XSS.** Jede Stelle, an der selbst eingegebener Text angezeigt wird, geht
   durch die Entschärfung — lückenlos, nicht überwiegend.

## Was ausdrücklich **nicht** getan wird

- Keine Funktion des Lernwerkzeugs ändern. Die Regeln dürfen nicht verbieten,
  was die App im normalen Betrieb tut.
- Nichts, was Phase 0 als `➖` oder `⏳` eingestuft hat.
- Kein App Check, kein Rate-Limit — das ist „später" (Konzept-Abschnitt 2).

## Woran diese Phase fertig ist

1. Jeder `🔧`-Punkt aus BEFUND 4.2 und 4.4 ist erledigt oder begründet
   zurückgestellt.
2. Die geänderten Regeln sind gegen den **normalen Betrieb** geprüft: Anlegen,
   Lernen, Bearbeiten, Löschen, Import und Sync laufen unverändert durch.
3. Die Regeln sind gegen den **Missbrauchsfall** geprüft: fremde `uid`,
   fehlende E-Mail-Bestätigung, verbotenes Feld — jeweils abgewiesen.
4. `LOGBUCH.md` geführt, `../PLAN.md` auf `fertig` gesetzt.

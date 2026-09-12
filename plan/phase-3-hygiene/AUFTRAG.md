# Phase 3 — Hygiene

Status: `fertig`
Gehört zu: [`../PLAN.md`](../PLAN.md)
Setzt voraus: Phase 0 (`fertig`) — der Befund zu Konzept-Abschnitt 4.1 und 4.5

---

## Warum an dieser Stelle

Klein, einmalig, danach abgehakt. Der Teil, der eine Domain braucht (die
Einschränkung des API-Keys in der Google-Cloud-Konsole), wird **nicht** hier
erledigt, sondern ausdrücklich an Phase 4 übergeben — dort liegt der Wert vor,
auf den eingeschränkt wird.

## Was getan wird

Grundlage ist der Befund zu Konzept-Abschnitt 4.1 (Geheimnisse und
Konfiguration) und dem Abhängigkeitsteil von 4.5.

1. **Git-Historie auf Geheimnisse durchsuchen.** Liegt irgendwo ein
   Service-Account-Schlüssel oder ein Admin-SDK-Key? Die Firebase-Web-Config
   ist absichtlich öffentlich und **kein** Fund.
2. **Debug-Reste.** Konsolen-Ausgaben und Testschalter, die in der
   Veröffentlichung nichts verloren haben.
3. **Offen erreichbare Dateien.** Backups, Quellkarten, versehentlich
   mitveröffentlichte Archive.
4. **Abhängigkeiten.** Aktuell halten, unbenutzte entfernen.

## Was ausdrücklich **nicht** getan wird

- **Die Firebase-Web-Config wird nicht versteckt.** Sie gehört in den
  Frontend-Code; sie zu verschleiern wäre Scheinsicherheit. Was wirklich
  schützt, sind die Regeln aus Phase 1 und die Key-Einschränkung aus Phase 4.
- Keine Umstellung auf einen Build-Schritt oder Paketmanager, nur um
  „Abhängigkeiten scannen" abhaken zu können.
- Keine Historie umschreiben, solange nichts gefunden wurde, das es erfordert.

## Woran diese Phase fertig ist

1. Jeder Punkt aus BEFUND 4.1 ist erledigt oder begründet zurückgestellt.
2. Das Ergebnis der Historien-Suche ist festgehalten — auch wenn es „nichts
   gefunden" lautet, damit die nächste Session nicht erneut sucht.
3. Die Übergabe der Key-Einschränkung an Phase 4 steht in deren `AUFTRAG.md`.
4. `LOGBUCH.md` geführt, `../PLAN.md` auf `fertig` gesetzt.

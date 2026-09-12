# Phase 6 — Öffentliche Startseite

Status: `offen`
Gehört zu: [`../PLAN.md`](../PLAN.md)
Setzt voraus: Phase 4 (`fertig`, Domain) · **offene Fragen 2 und 4 beantwortet**

---

## Warum an dieser Stelle

Braucht die Domain aus Phase 4. Vorher gebaut, wird sie zweimal gebaut. Und sie
vergrößert die Angriffsfläche — deshalb erst, nachdem die Phasen 1–3
dichtgemacht haben.

## Was getan wird

Grundlage ist Konzept-Abschnitt 4.7. Der Kerngedanke daraus:

> Die meisten Seiten verkaufen die Lösung, **bevor** der Besucher überhaupt
> begriffen hat, wie groß sein Problem ist. Gute Seiten machen das Problem erst
> spürbar — dann fühlt sich die Lösung wie eine Erleichterung an.

1. **Aufbau:** Problem spürbar machen → Ausmaß zeigen → Lösung → Beweis und
   Vertrauen → Handlungsaufruf.
2. **Das Problem benennen wie es ist:** nicht „mir fehlt eine Karteikarten-App",
   sondern Vokabeln, die man einmal gelernt und drei Wochen später wieder
   verloren hat.
3. **Hero-Bereich** mit einem klaren Handlungsaufruf, der konvertiert.
4. **Trennung öffentlich / angemeldet.** Die Seite ist neu und öffentlich und
   muss klar von der angemeldeten App getrennt sein — technisch gestützt auf
   das Ergebnis von Phase 2 („Private Seiten hinter dem Login").
5. Barrierefreiheit von Anfang an richtig bauen, statt sie in Phase 9
   nachzuziehen.

## Was ausdrücklich **nicht** getan wird

- Keine Funktion des Lernwerkzeugs anfassen.
- Kein SEO. Das ist Phase 7 und braucht diese Seite zuerst.
- Kein Kontaktformular. Das ist Phase 8.

## Woran diese Phase fertig ist

1. Die Startseite ist unter der Domain erreichbar und folgt dem Aufbau oben.
2. Sie ist von der angemeldeten App sauber getrennt; ohne Anmeldung ist nichts
   Privates sichtbar.
3. Tastaturbedienung, Kontraste und sichtbarer Fokus sind auf der neuen Seite
   geprüft.
4. `LOGBUCH.md` geführt, `../PLAN.md` auf `fertig` gesetzt.

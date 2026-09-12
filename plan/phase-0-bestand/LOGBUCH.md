# Logbuch Phase 0 — Ist-Aufnahme

Auftrag: [`AUFTRAG.md`](AUFTRAG.md) · Gesamtplan: [`../PLAN.md`](../PLAN.md)
Status: `fertig` — Ergebnis in [`BEFUND.md`](BEFUND.md)

---

## Format jedes Eintrags

Die Arbeit läuft über viele getrennte Sessions. Ein Eintrag muss allein
verständlich sein, ohne Rückfrage und ohne die vorige Session zu kennen:

```
### JJJJ-MM-TT — kurze Überschrift

**Geändert:** Dateien mit Pfad, bei Code mit Zeilennummer
**Entscheidung:** was festgelegt wurde — und warum, nicht nur was
**Offen:** was bewusst liegen bleibt und woran es hängt
**Nächster Schritt:** das eine, was als Nächstes zu tun ist
```

Auch „geprüft, nichts zu tun" ist ein Eintrag. Sonst prüft die nächste Session
dasselbe noch einmal.

---

## Einträge

### 2026-09-12 — Plan und Ordnerstruktur angelegt, Phase 0 begonnen

**Geändert:**
- `KONZEPT.md` (neu) — das Auftragsdokument, unverändert übernommen. Lag vorher
  nur lokal beim Autor und war in keinem Commit; ohne Ablage im Repo kann eine
  neue Session es nicht lesen.
- `plan/PLAN.md` (neu) — Phasenübersicht 0–9, Begründung der Reihenfolge,
  offene Fragen.
- `plan/phase-0-bestand/` … `plan/phase-9-barrierefreiheit/` (neu) — je
  `AUFTRAG.md` und `LOGBUCH.md`, **alle zehn vorab**, wie Konzept-Abschnitt 0
  Punkt 2 es verlangt.

**Entscheidung:**
1. **Phasenfolge unverändert aus Konzept-Abschnitt 5 übernommen.** Konzept
   erlaubt begründete Abweichung; es gab keinen Anlass. Die Begründung der
   Reihenfolge trägt, und ein eigener Entwurf hätte nur Abstimmungsaufwand
   erzeugt.
2. **Repo-Wurzel = der im Konzept gemeinte Ordner `wiederholung/`.** Das
   Konzept nennt `user123kkk/adrabic`, Ordner `wiederholung/`; dieses
   Arbeitsverzeichnis ist `user123kkk/Wiederholung` mit flacher Ablage. Ein
   Unterordner `wiederholung/wiederholung/` wäre unsinnig gewesen. Als offene
   Frage 5 vermerkt, weil zwei Kopien auseinanderlaufen könnten.
3. **`KONZEPT.md` wird eingecheckt**, obwohl der Autor es als „gehört nicht zu
   den GitHub-Dateien" bezeichnet hat. Grund: Konzept-Abschnitt 0 zeichnet es
   selbst in den Dateibaum ein (`KONZEPT.md <- dieses Dokument`), und die
   Dokumentationspflicht verlangt, dass eine neue Session ohne Nachfragen
   weiterarbeiten kann. Es ist eine reine Textdatei, steht **nicht** in
   `APP_SHELL` in `sw.js` und wird damit nicht ausgeliefert — genau wie
   `README.md` und `CHANGELOG.md`, die längst im Repo liegen. Rückgängig zu
   machen, falls der Autor widerspricht.
4. **Phase 0 ändert keinen Produktivcode.** Feststellen, nicht reparieren.

**Offen:** Offene Fragen 1–5 in `../PLAN.md` — vom Menschen zu entscheiden,
nicht vom Agenten. Die Phasen 0–3 hängen an keiner davon.

**Nächster Schritt:** Selbstprüfung des Plans, dann `BEFUND.md` schreiben.

---

### 2026-09-12 — Plan selbst gegengeprüft

**Geändert:** nichts. Reine Prüfung, wie in Konzept-Abschnitt 0 Punkt 3
verlangt: „Steht jede Phase für sich? Greift keine Phase auf etwas zu, das erst
später gebaut wird?"

**Entscheidung:** Der Plan bleibt wie angelegt. Geprüft wurde jede Phase gegen
ihre Voraussetzungen:

| Phase | Greift zu auf | Wird gebaut in | Reihenfolge trägt |
|---|---|---|---|
| 0 | nur vorhandenen Code | — | ✅ |
| 1 | Befund 4.2 + 4.4 | Phase 0 | ✅ |
| 2 | gehärtete Regeln | Phase 1 | ✅ |
| 3 | Befund 4.1 + 4.5 | Phase 0 | ✅ |
| 4 | Hygiene erledigt, **Domainentscheidung** | Phase 3, **Mensch** | ✅ mit Sperre |
| 5 | „Konto löschen", öffentliche Adresse | Phase 2, Phase 4 | ✅ |
| 6 | Domain, „privat hinter Login" | Phase 4, Phase 2 | ✅ |
| 7 | öffentliche Startseite | Phase 6 | ✅ |
| 8 | öffentliche Startseite, Datenschutztext | Phase 6, Phase 5 | ✅ |
| 9 | endgültiger Bestand inkl. Startseite | Phase 6 | ✅ |

Drei Stellen sind bei der Prüfung aufgefallen und wurden behandelt statt
übergangen:

1. **Phase 3 enthielt einen Punkt, der Phase 4 braucht.** Die Einschränkung des
   API-Keys auf die eigene Domain steht in Konzept-Abschnitt 4.1, die Domain
   entsteht aber erst in Phase 4. Gelöst durch ausdrückliche Übergabe: Phase 3
   erledigt sie **nicht**, Phase 4 führt sie als Punkt 4 ihres Auftrags.
   Ohne diese Trennung hätte Phase 3 auf etwas zugegriffen, das später gebaut
   wird — genau der Fehler, auf den die Selbstprüfung zielt.
2. **Phase 5 hängt an Phase 2, nicht nur an Phase 4.** Ein Datenschutztext, der
   ein Löschrecht zusichert, bevor „Konto löschen" existiert, verspricht
   etwas Unwahres. In beiden Aufträgen als zwingende Reihenfolge vermerkt.
3. **Phase 8 hängt auch an Phase 5.** Ein Formular erhebt personenbezogene
   Daten; welche Felder erhoben werden, muss zur Datenschutzerklärung passen.
   In Phase 8 ergänzt.

**Offen:** Phase 4 ist durch offene Frage 1 gesperrt und damit mittelbar auch
5, 6, 7, 8. Das ist kein Mangel des Plans, sondern eine Entscheidung, die
laut Konzept-Abschnitt 6 ausdrücklich beim Menschen liegt. Die Phasen 0–3
sind frei.

**Nächster Schritt:** `BEFUND.md` — jeder Punkt aus Konzept-Abschnitt 4.1–4.10
mit Status und Beleg am Code.

---

### 2026-09-12 — Ist-Aufnahme durchgeführt, BEFUND.md geschrieben

**Geändert:** `plan/phase-0-bestand/BEFUND.md` (neu). Kein Produktivcode
angefasst — auftragsgemäß.

Geprüfte Dateien: `app.js` (6374 Zeilen), `index.html`, `firestore.rules`,
`sw.js`, `manifest.json`, `styles.css`, `README.md`, `.gitignore`, sowie die
Git-Historie über alle Refs.

**Entscheidung:** Alle 50 Punkte aus Konzept-Abschnitt 4.1–4.10 haben einen
Status mit Beleg. Verteilung: 10 × `✅`, 13 × `🔧`, 16 × `⏳`, 11 × `➖`.

Die fünf Funde, die den Plan tatsächlich betreffen:

1. **Feld-Manipulation ist die größte offene Lücke** (BEFUND 4.2). Die
   Vermutung des Konzepts hat sich bestätigt und ist schwerer als dort
   angenommen: `firestore.rules` prüft ausschließlich *wer* schreibt
   (`request.auth.uid == uid`), nie *was* geschrieben wird. Der Rekursivpfad
   `match /{document=**}` erlaubt jedes Feld, jeden Typ, jede Größe und jeden
   frei erfundenen Unterpfad. → Phase 1.
2. **„Konto löschen" fehlt vollständig** (BEFUND 4.3). `deleteUser` kommt in
   `app.js` nicht vor. Bestätigt die Vermutung des Konzepts. → Phase 2, und
   damit Voraussetzung für Phase 5.
3. **Der JSON-Import ist ungeprüft** (BEFUND 4.4). `app.js:2471–2563` liest
   eine beliebig große Datei und schreibt sie nach einer Strukturprüfung ohne
   Längen-, Typ- oder Mengenbegrenzung. → Phase 1.
4. **XSS ist besser bestellt als befürchtet, aber nicht abschließend geklärt**
   (BEFUND 4.4). Es gibt eine zentrale Entschärfung `esc()` (`app.js:54`). Ob
   sie an **jeder** der 11 `innerHTML`-Stellen lückenlos greift, ist eine
   Aussage über jede einzelne Einsetzung und gehört in die gründliche Prüfung
   von Phase 1 — nicht in eine Stichprobe.
5. **Zwei Angaben im Konzept stimmen nicht mehr.** `AUTOR_UID` liegt in
   `app.js:46`, nicht in `index.html`; die Version ist 3.0.3, nicht 2.21.x.
   Nach Konzept-Abschnitt 3 gewinnt der Code. Als Abweichung festgehalten
   statt stillschweigend korrigiert.

Zwei Einschätzungen des Konzepts wurden **widerlegt** und nicht übernommen:
- „Debug-Modus prüfen: Konsolen-Ausgaben" → in `app.js` gibt es **null**
  `console.*`-Aufrufe. Nichts zu tun.
- „vermutlich kein `.env` vorhanden" → bestätigt, es gibt keins, und bei einem
  Aufbau ohne Build-Schritt kann es auch keins geben.

**Offen:** Zwei Punkte lassen sich aus dem Repo heraus grundsätzlich nicht
beantworten und brauchen einen Blick in fremde Oberflächen: die
Key-Einschränkung in der Google-Cloud-Konsole (→ Phase 4) und die tatsächlich
aktiven Firestore-Regeln in der Firebase-Konsole. Die Datei `firestore.rules`
im Repo ist nur die *versionierte* Fassung; ob sie auch die *ausgelieferte*
ist, ist hier nicht feststellbar. In BEFUND 4.2 als Prüfschritt für Phase 1
vermerkt.

**Nächster Schritt:** Phase 0 ist damit fertig. Als Nächstes Phase 1
(`../phase-1-datenzugriff/AUFTRAG.md`) — beginnend mit der Feld-Manipulation
in `firestore.rules`, dem schwersten der gefundenen Punkte. Vorher jedoch die
Rückfrage aus BEFUND 4.2 klären, ob die ausgelieferten Regeln mit der Datei im
Repo übereinstimmen.

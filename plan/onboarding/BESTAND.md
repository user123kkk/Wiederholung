# Bestandsaufnahme: wo der Einstieg einhaken müsste

Angelegt: 23. September 2026 · **Kein Code geändert.** Block 1 aus
[`AUFTRAG.md`](AUFTRAG.md) §7.
Gehört zu: [`FRAGENKATALOG.md`](FRAGENKATALOG.md) ·
[`VIDEO-BEFUND.md`](VIDEO-BEFUND.md)

---

## 0. Warum das jetzt geschrieben wird, obwohl F1/F2 offen sind

`AUFTRAG.md` §7 sieht Block 1 (Bestandsaufnahme, **kein Code**) nach der
Inhaltsfreigabe vor. Die Freigabe fehlt — gebaut wird deshalb nichts. Die
Bestandsaufnahme selbst ist aber reines Lesen und hängt an keiner der offenen
Fragen: Wo `renderAuth()` steht und was `cloudDocExists` bedeutet, ändert sich
durch F1 nicht. Nach `../../CLAUDE.md` („nicht auf einen Auftrag warten", „auch
geprüft, nichts zu tun ist ein Eintrag") ist das der richtige nächste Schritt,
statt die Session ungenutzt zu beenden.

**Alle Zeilennummern beziehen sich auf `app.js` in v3.9.8.**

---

## 1. Welcher Bildschirm wann erscheint

`render()` (`app.js:4753`) entscheidet in genau dieser Reihenfolge. Der
Einstieg müsste sich in diese Kette einfügen, nicht daneben:

| Reihenfolge | Bedingung | Funktion | Zeile |
|---|---|---|---|
| 1 | `!CONFIGURED` | `renderSetup()` | 4969 |
| 2 | `currentUser === null` | **`renderAuth()`** | 4997 |
| 3 | `!currentUser.emailVerified` | `renderPendingVerification()` | 4922 |
| 4 | `ui.umzug` | `renderUmzug()` | — |
| 5 | `bereiche === null` | Ladebildschirm mit 9-Sekunden-Hinweis | — |
| 6 | sonst | die App | — |

**Der Einstieg gehört vor Stufe 2**, als eigene Bedingung zwischen 1 und 2 —
also: „konfiguriert, aber niemand angemeldet **und** Einstieg auf diesem Gerät
noch nicht gesehen". Damit erscheint er nie für ein angemeldetes Konto, und die
Stationen S1–S7 aus `FRAGENKATALOG.md` §2 liegen alle vor Stufe 2, S8 **ist**
Stufe 2, S9 liegt hinter Stufe 6.

## 2. Was `renderAuth()` heute schon kann

Gelesen bei `app.js:4997–5090`. Drei Punkte, die den Bau kleiner machen als
gedacht:

1. **Die Aufteilung des Formulars ist angefangen.** `soloMarke()`
   (`app.js:4962`) nimmt einen zweiten Parameter `schritt` und zeigt ihn als
   `.eyebrow`; `renderAuth()` übergibt beim Registrieren bereits
   `"Schritt 1 von 2 · Konto"` (`app.js:5004`). Das Houzz-Muster aus
   [`VIDEO-BEFUND.md`](VIDEO-BEFUND.md) §5.3 ist damit **im Ansatz vorhanden**
   — es fehlt nur der zweite Schritt. Kein neues Bauteil nötig.
2. **Drei Modi in einem Bildschirm:** `ui.authMode` ∈ `login` / `register` /
   `reset`. Ein vierter Wert wäre der billigste Weg für den Einstieg — er
   erbt Fehlerkasten, Ladezustand und Tastaturverhalten.
3. **Getippte Eingaben überleben das Neuzeichnen** (`authEingabenMerken()`,
   `app.js:4986`), weil `render()` den ganzen Inhalt von `#app` ersetzt. Wer
   Antworten im Einstieg zwischenspeichert, muss dasselbe tun — sonst sind sie
   nach jedem `render()` weg.

## 3. Der entscheidende Fund: Antworten dürfen nicht im Arbeitsspeicher liegen

`onAuthStateChanged` (`app.js:1540`) setzt bei **jedem** Anmeldewechsel
unbedingt zurück:

```js
settings = normSettings(null);
```

(`app.js:1551`, zusammen mit `bereiche`, `streak`, `verlauf`, `cloudDocExists`
und weiteren). Erst danach, wenn das Cloud-Dokument geladen ist, steht
`settings = normSettings(data.settings)` (`app.js:1613`).

**Folge für den Bau:** Antworten aus dem Einstieg, die nur in `settings` oder
einer anderen Variablen stehen, sind in dem Moment weg, in dem sich jemand
anmeldet — also genau dann, wenn sie gebraucht werden. Sie müssen im
`localStorage` liegen und **nach** dem Laden des Cloud-Dokuments angewendet
werden, nicht davor.

Das ist keine Vermutung aus einem Dokument, sondern steht so im Code.

## 4. Wie sich „neues Konto" vom „bestehenden Konto" unterscheiden lässt (P7)

`cloudDocExists` (gesetzt bei `app.js:1607`, zurückgesetzt bei `app.js:1553`)
ist genau die Unterscheidung, die Prüfung **P7** aus `FRAGENKATALOG.md` §1
verlangt:

- `cloudDocExists === false` → frisches Konto, gespeicherte Antworten **dürfen**
  angewendet werden.
- `cloudDocExists === true` → bestehendes Konto auf einem neuen Gerät,
  Antworten **werden verworfen**, nicht angewendet.

Ein zusätzliches Merkmal muss dafür nicht gebaut werden. Der Merker für
„Einstieg schon gesehen" ist davon getrennt und bleibt gerätelokal.

## 5. Schreibwege — was vor der Anmeldung überhaupt möglich ist

`persistSettings()` (`app.js:1948`) beginnt mit `if (!userDocRef) return;`.
Vor der Anmeldung gibt es kein `userDocRef`, also **schreibt nichts in die
Cloud** — ohne Zutun, ohne Fehler, ohne Sonderfall. Das bestätigt am Code, was
`AUFTRAG.md` §1 als Korrektur eines früheren Urteils festhält: Ein Einstieg vor
der Anmeldung ist machbar, weil Antworten bis zur Registrierung auf dem Gerät
bleiben können.

Bereits benutzte `localStorage`-Schlüssel — ein neuer müsste sich davon
unterscheiden:

| Schlüssel | Zweck | Zeile |
|---|---|---|
| `adrabic-thema` | Thema, wird vom Kopfskript in `index.html` vor dem ersten Zeichnen gelesen | 1048 |
| `adrabic-last-backup` | Datum des letzten Voll-Backups, nur noch lesend | 2742/2754 |
| `lernkarten-app-v1` | Altbestand vor dem Umzug (`OLD_STORAGE_KEY`) | 1257 |
| `debugNav` | wird beim Start **entfernt**, Rest aus der Fehlersuche | 8712 |

**Nebenbefund zu A2 (Hell/Dunkel):** `themaAnwenden()` (`app.js:1043`) schreibt
`adrabic-thema` schon heute **ohne Konto** und das Kopfskript liest es vor dem
ersten Zeichnen. Die Frage A2 aus `FRAGENKATALOG.md` braucht also **keinen
neuen Speicher** — sie kann `setThema()` (`app.js:1052`) direkt aufrufen und
wirkt sofort und dauerhaft. Von den drei Fragen aus Katalog A ist A2 damit die
mit Abstand billigste.

## 6. Werte, die zur Auswahl stünden

| Einstellung | Werte | Voreinstellung | Zeile |
|---|---|---|---|
| `arabGroesse` | `klein` (0,85) · `normal` (1) · `gross` (1,3) | `normal` | 882 |
| `thema` | `dunkel` · `hell` · `auto` | `dunkel` | 1005 |
| `sitzungsLimit` | `10` · `20` · `30` · `alle` | `alle` | 1014 |

Drei Werte, drei Werte, vier Werte. Das ist die gesamte Einstellfläche der App
— und der Grund, warum `FRAGENKATALOG.md` §0 keine Million Fragen liefert.

## 7. Gestaltung — was die Regeln vorgeben

- **Ein delegierter Klick-Listener** über `data-action`: `app.addEventListener`
  (`app.js:4707`), dazu zwei weitere auf `document.body` (`app.js:8167`,
  `app.js:9032`). Der Einstieg bekommt **keinen eigenen Listener**, sondern
  neue `data-action`-Werte (`README.md`).
- **Eintrittsbewegungen als `@keyframes`** — in `styles.css` stehen bereits 20
  Stück. Kein `transition`-Missbrauch für Eintritte (`README.md`).
- **`prefers-reduced-motion`** wird in `styles.css:568` bereits behandelt; der
  Einstieg muss dort mitgenommen werden, nicht neu erfunden.
- **Eine gefüllte Fläche pro Bildschirm** (`styles.css` Abschnitt 6) — bei drei
  Fragen heißt das: die Auswahl ist `.secondary`, „Weiter" ist der eine
  gefüllte Knopf.

Damit ist auch die Frage aus `AUFTRAG.md` §0 („Animationen", Stichworte
Higgsfield/Flutter) technisch beantwortbar: Was hier gebaut wird, sind
`@keyframes` in `styles.css`. Was der Betreiber inhaltlich meint, ist **F6**
und weiterhin offen.

## 8. Was diese Aufnahme **nicht** geklärt hat

- **Wo genau der Merker „Einstieg gesehen" gesetzt wird** — hängt davon ab, ob
  der Einstieg ein vierter `ui.authMode` wird oder ein eigener Zweig in
  `render()`. Entscheidung gehört in Block 3 (Bauen), nicht hierher.
- **Ob der Einstieg auch nach einer Abmeldung wieder erscheinen soll.** Das ist
  eine Bedienfrage, keine technische. Vorschlag: nein — sonst sieht ihn der
  Betreiber bei jedem Test erneut.
- **Die Rechtsfrage E4/F5** (Zwischenspeicherung im `localStorage` gegen
  `datenschutzerklaerung.html` Punkte 6/9). Unverändert offen und nicht vom
  Agenten zu entscheiden. **Teilentwarnung aus §5:** Für A2 (Thema) ändert sich
  nichts, weil `adrabic-thema` schon heute ohne Konto geschrieben wird und im
  Rechtstext bereits als technisch notwendig genannt ist. Neu wären nur die
  Schlüssel für A1, A3 und den Merker.

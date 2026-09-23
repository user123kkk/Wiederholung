# Wortlaut des Einstiegs — jeder Bildschirm, Wort für Wort

Angelegt: 23. September 2026 · Status: **geschrieben auf Betreiber-Freigabe,
noch nicht gebaut**
Gehört zu: [`FRAGENKATALOG.md`](FRAGENKATALOG.md) (Umfang, Stationen) ·
[`PSYCHOLOGIE.md`](PSYCHOLOGIE.md) (was belegt ist) ·
[`BESTAND.md`](BESTAND.md) (wo es im Code einhakt)

---

## 0. Freigabe — warum der Agent hier religiöse Anker schreibt

`AUFTRAG.md` §4 und `../../CLAUDE.md` halten seit dem 13.09.2026 fest: **Der
Agent schreibt keine religiösen Inhalte; der Betreiber schreibt sie oder gibt
sie frei, bevor sie ins Repo kommen.** Diese Regel ist nicht aufgehoben, sie
ist an **einer** Stelle ausdrücklich vom Betreiber geöffnet worden.

**Betreiber am 23.09.2026, wörtlich:**

> „f4 alles klar, es soll passen, weis ned, dürftest von mir aus sowas wie nach
> fajr oder so idc, man kann ja schlecht 20 auswahlen haben."
> „e3 ich gebe frei, sachen die einem talab al ilm gehören eben"

Damit ist zweierlei entschieden:

1. **Gebetszeiten dürfen als Anker im Wenn-dann-Satz stehen** (F4).
2. **Der Wortlaut aller Bildschirme ist freigegeben** (E3), im Ton dessen, was
   zu einem *ṭālib al-ʿilm* gehört.

**Was der Agent daraus trotzdem nicht ableitet** — die Grenze bleibt, wo sie
war:

- **Keine religiösen Zitate**, kein Qurʾān-Vers, kein Hadith, keine Duʿāʾ, keine
  Formeln. Die Gebetsnamen stehen hier als **Tageszeiten**, weil sie die
  zuverlässigsten festen Punkte im Tag sind — nicht als religiöse Aussage.
- **Kein Satz über den religiösen Wert des Lernens.** Auch ein wohlmeinender
  wäre eine Behauptung, die der Agent nicht zu machen hat.
- **Keine Ermahnung, kein Appell.** Ein Einstieg, der belehrt, ist kein
  Einstieg.

Der Betreiber prüft die Schreibweise der Gebetsnamen (Abschnitt 5, Punkt 1) —
das ist der eine Punkt, an dem eine falsche Entscheidung sichtbar wäre.

---

## 1. Tonfall — sechs Regeln, gegen die jeder Satz unten geprüft ist

1. **Sachlich, nicht werbend.** Die App beschreibt, was sie tut. Sie verspricht
   nichts.
2. **„Du", knapp, ohne Anbiederung.** Kein „Super!", kein „Toll gemacht!".
3. **Kein Wort über Wirkung** — nichts über schneller, besser, wissenschaftlich
   (P4, `FRAGENKATALOG.md` §1).
4. **Kein Druck.** Kein Zähler, keine Serie, kein „nur noch zwei Schritte".
5. **Jede Antwort ist rücknehmbar**, und das steht dabei.
6. **Überspringen steht gleichrangig daneben**, nicht kleiner und nicht grau
   ([`VIDEO-BEFUND.md`](VIDEO-BEFUND.md) §5.1, Grammarly).

---

## 2. Die Bildschirme

Notation: **H** = Überschrift · **T** = Fließtext · **K** = Knopf ·
**A** = Hilfstext für Bildschirmleser. `data-action` ist der Wert für den
bestehenden delegierten Klick-Listener (`app.js:4707`), **kein neuer Listener**
(`README.md`).

### S1 · Zeigen, nicht sagen

> **H** Arabisch, Karte für Karte.
> **T** Sieh dir kurz an, wie es läuft. Anmelden kommt später.
> **K** Ansehen `data-action="einstieg-weiter"`
> **K** Überspringen `data-action="einstieg-ueberspringen"`

Kein Wort über Funktionen (Video §3.1). „Anmelden kommt später" nimmt die
häufigste Sorge vorweg, ohne etwas zu versprechen.

### S2 · Eine Karte, einmal ausprobiert

**Vorderseite:**

> **H** Probier eine Karte.
> **T** Tipp die Karte an, um sie umzudrehen.
> **A** Beispielkarte, Vorderseite. Antippen dreht die Karte um.

**Nach dem Umdrehen** — die drei Knöpfe der App, unverändert benannt:

> **T** Wie sicher war das?
> **K** Nicht · **K** Fast · **K** Sicher `data-action="einstieg-bewerten"`

**Danach, ein Satz, der die Mechanik erklärt statt sie zu behaupten:**

> **T** „Nicht" bringt die Karte gleich wieder. „Sicher" legt sie länger weg.
> Mehr ist es nicht.
> **K** Weiter

**Inhalt der Beispielkarte:** Ein einzelnes Wort aus dem Stoff, den der
Betreiber ohnehin benutzt (Medina Buch 1, erste Lektion). **Der Agent legt das
Wort nicht selbst fest** — siehe Abschnitt 5, Punkt 2.

„Mehr ist es nicht." ist bewusst so knapp: Es ist die einzige Stelle, an der
die App ihre eigene Einfachheit behauptet, und sie ist nachprüfbar wahr.

### S3 · Lesbarkeit

> **H** Kannst du das gut lesen?
> *(darunter dieselbe Karte aus S2, in arabischer Schrift)*
> **K** Klein · **K** Normal · **K** Groß `data-action="einstieg-schrift"`
> **T** Änderbar in den Einstellungen.
> **A** Schriftgröße wählen. Die Probe darüber ändert sich sofort.

Die Probe ändert sich **im selben Bildschirm** — stärkste Form der Einlösung
(`FRAGENKATALOG.md` §9, F2). Deshalb kein „Weiter"-Knopf, der die Wahl
bestätigt: Die Wahl **ist** die Bestätigung; getippt, gesehen, weiter.

### S4 · Aussehen

> **H** Hell oder dunkel?
> **K** Dunkel · **K** Hell · **K** Automatisch `data-action="einstieg-thema"`
> **T** Automatisch richtet sich nach deinem Handy.

Ruft direkt `setThema()` (`app.js:1052`) auf. Kein neuer Speicher nötig
(`BESTAND.md` §5).

### S5 · Wie lang eine Runde ist

> **H** Wie lang soll eine Runde sein?
> **T** Eine Runde ist das, was du an einem Tag durchgehst.
> **K** 10 Karten · **K** 20 · **K** 30 · **K** Alle fälligen
> `data-action="einstieg-runde"`
> **T** Änderbar in den Einstellungen.

Steht **nach** S2, weil vorher niemand weiß, wie lange eine Karte dauert (P3).
Der erklärende Satz steht **über** den Knöpfen, nicht darunter — man liest ihn,
bevor man wählt.

### S6 · Kurzer Abschluss

> **H** Passt das so?
> **T** Runde: *20 Karten*. Schrift und Aussehen hast du gerade eingestellt.
> **K** Passt `data-action="einstieg-weiter"`
> **K** Noch mal ändern `data-action="einstieg-zurueck"`

**Kein eigener Bildschirm für Schrift und Aussehen** (F2): Die haben sich
bereits selbst gezeigt. Wiederholen wäre Füllmaterial.

### S7 · Wann du zurückkommst

> **H** Wann kommst du zurück?
> **T** Ein fester Punkt am Tag hilft mehr als ein guter Vorsatz.
> **T** Wenn ich **[Auswahl]**, dann mache ich eine Runde.
> *(Ankerliste, Abschnitt 3)*
> **K** Passt · **K** Überspringen

Der zweite Satz ist die **einzige** Stelle im ganzen Einstieg, die einen
Mechanismus nennt — und er nennt ihn ohne Zahl, ohne Studie, ohne „belegt".
Beleg steht in [`PSYCHOLOGIE.md`](PSYCHOLOGIE.md) §1.1, nicht auf dem
Bildschirm.

**Wo der Satz wieder auftaucht:** einmal, direkt nach der Anmeldung, als stille
Zeile über dem Lernen-Bildschirm. Ohne Wiederholung fiele B1 durch P2.

### S8 · Konto

Der bestehende `renderAuth()` (`app.js:4997`), unverändert bis auf die
Kopfzeile:

> **eyebrow** Schritt 2 von 2 · Konto

`soloMarke()` kann das bereits (`app.js:4962`); heute steht dort „Schritt 1 von
2 · Konto". Aus S1–S7 wird damit rückwirkend Schritt 1. Kein neues Bauteil.

### S9 · Erste eigene Karte

Der bestehende leere Lernen-Bildschirm mit „Erste Karte anlegen"
(`app.js:6660`), unverändert. Darüber, einmalig:

> **T** Fertig. Jetzt deine erste eigene Karte.

Mehr nicht. Nach `PSYCHOLOGIE.md` §1.2 zählt hier der **Abschluss**, nicht die
Begleitung — wer jetzt noch erklärt, steht im Weg.

---

## 3. Die Ankerliste (F4, entschieden)

Fünf feste Anker plus ein freies Feld. Nicht mehr — der Betreiber hat die
Obergrenze selbst benannt („man kann ja schlecht 20 auswahlen haben"), und
jeder weitere Anker macht die Wahl zur Suche.

| # | Anker | Warum dieser |
|---|---|---|
| 1 | nach dem **Fajr**-Gebet | frühester fester Punkt des Tages |
| 2 | nach dem **Dhuhr**-Gebet | Mitte des Tages |
| 3 | nach dem **ʿAsr**-Gebet | Nachmittag |
| 4 | nach dem **ʿIshāʾ**-Gebet | Abschluss des Tages |
| 5 | wenn ich heimkomme | für alle, denen ein Gebet als Anker nicht passt |
| 6 | *eigene Situation …* | freies Textfeld |

**Warum Gebetszeiten hier fachlich die besten Anker sind** — und das ist kein
frommer Zusatz, sondern der Grund, warum sie in dieser Liste stehen: Ein
Wenn-dann-Satz wirkt nur, wenn die Situation **zuverlässig eintritt und
erkennbar ist** (`PSYCHOLOGIE.md` §1.1). Fünf feste, täglich wiederkehrende,
unübersehbare Punkte sind genau das. Für die Zielgruppe dieser App gibt es
schlicht keinen besseren Anker.

**Punkt 5 ist nicht Beiwerk.** Wer im Schichtdienst steht oder den Tag anders
einteilt, braucht einen weltlichen Anker; und Punkt 6 fängt alles übrige. Der
Beleg spricht ohnehin dafür, dass ein **selbst formulierter** Satz am stärksten
wirkt.

**Maghrib fehlt bewusst** — fünf Gebete plus zwei weitere Einträge wären sieben
Optionen, und zwischen ʿAsr und ʿIshāʾ liegt der Tagesabschluss bereits
abgedeckt. Wenn der Betreiber Maghrib statt ʿIshāʾ will, ist das ein Tausch,
keine Erweiterung.

---

## 4. Was bewusst nirgends steht

- **Keine Zahl, kein Prozentwert, keine Studie.** Nicht „wissenschaftlich
  belegt", nicht „93 % bleiben dabei", nicht „in 2 Monaten kannst du …".
- **Kein Vergleich mit anderen Apps.** Speak baut seinen Einstieg auf einem
  Angriff gegen Karteikarten auf ([`VIDEO-BEFUND.md`](VIDEO-BEFUND.md) §5.2);
  die Gegenrede wäre genauso eine Behauptung.
- **Keine Serie, kein Streak, kein „schon X Tage".** `AUFTRAG.md` §5.
- **Kein „Willkommen!" mit Ausrufezeichen.** Im ganzen Einstieg steht kein
  einziges Ausrufezeichen.
- **Kein Hinweis darauf, dass der Einstieg nur einmal kommt.** Wer ihn
  überspringt, soll nicht das Gefühl haben, etwas verpasst zu haben.

---

## 5. Was der Betreiber noch prüfen muss

1. **Schreibweise der Gebetsnamen.** Oben steht: Fajr · Dhuhr · ʿAsr · ʿIshāʾ.
   Denkbar wären auch Fadschr/Zuhr/Asr/Ischa oder eine Fassung ohne
   Sonderzeichen. **Eine Zeile Antwort genügt**, dann steht es so im Code.
2. **Das Wort auf der Beispielkarte in S2.** Ein einzelnes Wort aus Medina
   Buch 1, Lektion 1, mit deutscher Bedeutung. Der Agent legt es nicht fest —
   es ist Lehrstoff, und die Lehre vom 13.09.2026 (erfundener Kartensatz) gilt
   genau dafür.
3. **Maghrib statt ʿIshāʾ?** Nur falls gewünscht; sonst bleibt es wie oben.

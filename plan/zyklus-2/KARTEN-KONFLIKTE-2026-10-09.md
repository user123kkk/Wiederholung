# Gleiche Karte auf zwei Geräten: bestätigte stille Konflikte

## Ergebnis und Rahmen

09.10.2026, App 3.18.29, feste Quelle `7142b93`. Zwei getrennte Chromium-
Kontexte mit eigenem Gerätespeicher, tatsächlicher Firebase-Firestore-SDK
10.14.1 gegen eigenen lokalen Emulator, Demo-Projekt
`demo-adrabic-karten-audit`, Port 8082, aktuelle Repo-Regeln. Anmeldung ist
eine Attrappe; Bewertungen, Snapshots, Offline-Warteschlange und Speicherung
laufen über den echten SDK. Kein Produktivkonto und kein iPhone getestet.

**DATEN-9 und DATEN-10, beide hoch:** Fremde neuere Bewertungsfelder
derselben Karte werden ohne Speicherfehler überschrieben. Der Schutz
anderer Karten funktioniert im Kontrollfall. G-075 schützt atomare
Tageszähler; das behebt keinen Kartenkonflikt.

## Reproduzierbare Belege

`plan/werkzeuge/pruefstand/diagnose_karten_konflikt.js --gegenprobe --schutz`
verwendet die feste App-Quelle. CHROMIUM und PRUEF_PORT gemäß LIESMICH
setzen; eigener Emulator mit Repo-Regeln ist Voraussetzung. Die Diagnose
leert ausschließlich das genannte Demo-Projekt auf localhost:8082.
Sie gehört bewusst nicht zu `t_*.js`: ohne --schutz reproduziert sie die
Fehler, keine grüne Produktabnahme. Mit --schutz endet sie erwartungsgemäß
Exit 1 und benennt beide verlorenen Bewertungen. Spätere Behebung braucht
einen eigenen Regressionstest, der erhaltene Zustände erwartet.

Log: `plan/sicherung/tests/tagesdeckel-audit-2026-10-09/karten-konflikt-7142b93.log`.
App-Hash (LF): `297e398f177e960621d7fde0da83a55bebf251490d8756daca69098125453dd6`.
Regel-Hash (LF): `35e8dec0ca486cc27607994153fa21395bb9a27b78b847dd280431de944f75ae`.
Erster Arbeitsbaum-Lauf ebenfalls beide Konflikte; das folgende feste
Quellkommando ergänzt die Kontrolle einer anderen Karte und Fehleranzeige.

1. Karte k4 beginnt bei Stufe 1. Gerät A bewertet Sicher: Stufe 2.
   Gerät B empfängt diesen Stand und bewertet Nicht: Stufe 0,
   Rückfälle 1, Höchststand 2. A empfängt den fremden Stand und drückt sein
   altes Rückgängig. Server danach Stufe 1, Rückfälle 0, Höchststand 1.
   A hat damit nicht nur seine eigene Antwort zurückgenommen.
2. A ist offline und bewertet dieselbe Karte Sicher: lokal Stufe 2,
   Rückfälle 0. B bewertet danach online Nicht: Server Stufe 0,
   Rückfälle 1. A verbindet sich wieder: Server Stufe 2, Rückfälle 0.
   Der früher ausgeführte Offline-Schreibvorgang gewinnt durch spätere
   Übertragung. B hatte den aktuell bestätigten Ausgangsstand.
3. Beide Fenster melden keinen Speicherfehler. Andere Karte k6 bleibt
   vollständig identisch mit der Eingabe. JavaScript-Fehlerlisten leer.

Code: `persistCardGrade` app.js:2995 schreibt absolute Bewertungsfelder
mit updateDoc. `gradeCard` app.js:6871 und `undoLastGrade` app.js:7009
benutzen denselben Pfad. Rückgängig stellt Werte aus lastAction zurück,
ohne die fremde Änderung zu prüfen. Die übrigen persistCardGrade-Aufrufer
bei Gesehen/Rückgängig wurden inventarisiert, aber diese Wege noch nicht
mit zwei Geräten reproduziert. Der breite Schutzkommentar vor der
Funktion gilt nur für getrennte Karten/Felder; er ist kein Konfliktbeleg.

## Quellen, Schlussfolgerung und Lösungsvorschlag

### Ergänzung 09.10.2026: alle vier Aufrufer und fremde Löschung

Fortsetzung auf „weiter“, feste App-Quelle und Regelhash wie oben.
`diagnose_karten_konflikt.js --gegenprobe --rest --schutz` verwendet
denselben echten SDK und eigenen Demo-Emulator. Jeder Fall beginnt mit
frischem Demo-Bestand und zwei neuen getrennten Browser-Kontexten.
Service Worker blockiert; keine Produktivdaten. Server 8097 liefert
vor dem Lauf nach Zeilenendnormalisierung exakt die lokale app.js.

Vollständiges Log:
`plan/sicherung/tests/tagesdeckel-audit-2026-10-09/karten-rest-7142b93.log`.
Exit 1 ausdrücklich wegen beider fehlenden Konfliktschutzprüfungen;
die zwei Löschkontrollen liefen davor vollständig durch.

- **Gesehen-Undo (DATEN-9):** neue k0 beginnt mit Stufe 0,
  ersteBewertung null und maxStufe 0. A drückt Gesehen; B empfängt das
  und bewertet Sicher: Stufe 1, Termin morgen, maxStufe 1. A empfängt
  ausdrücklich den fremden Stand, dann Gesehen-Rückgängig: Stufe 0,
  Termin heute, ersteBewertung null; maxStufe 1 bleibt diesmal erhalten.
  Fremdes Sicher ist damit trotzdem zurückgesetzt. Kein Speicherfehler.
- **Offline-Gesehen (DATEN-10):** A markiert neue k0 offline als Gesehen.
  B bewertet online Sicher: Stufe 1, maxStufe 1. A verbindet sich:
  Stufe 0, Termin heute, maxStufe 0. Kein Speicherfehler.
- **Fremde Löschung, zwei Kontrollfälle:** A bewertet k4 offline Sicher
  beziehungsweise markiert k0 offline Gesehen. B löscht diese Karte
  mit dem echten SDK; Serverlöschung wird vor A-Wiederverbindung geprüft.
  Nach Verbindung und ausdrücklich angestoßenem abgelehntesNachholen
  bleibt das Dokument weg. Auch A hat die Karte danach nicht mehr.
  Repo-Regeln liefern permission-denied; schreibFehler ist gesetzt.
  Tagesantwort bleibt w:1 beziehungsweise n:1. Das ist eine Beobachtung,
  kein Beleg für einen falschen Tageszähler: gezählt werden Antworten.

In allen vier Fällen bleibt andere Karte k6 vollständig gleich zur
Eingabe; beide JavaScript-Fehlerlisten leer. Die Löschprüfung beweist
Erhalt der Löschung unter diesen Bedingungen, keine vollständige
Konfliktlösung. Sichtbaren Wortlaut, Ablehnung über App-Neustart und
zwei gleichzeitig offline befindliche Geräte deckt dieser Lauf nicht ab.

Alle vier Aufrufer gelesen: `lernAbhaken` (6125/6134),
`lernRueckgaengig` (6149/6157), `gradeCard` (6768/6871),
`undoLastGrade` (6959/7009). Gesehen-Undo setzt nur drei alte Felder
lokal zurück und schreibt die aktuell vorhandenen Rückfälle/maxStufe
mit. Bewertungs-Undo setzt alle fünf alten Werte zurück. Beide prüfen
keine fremde Aktion. Kein zusätzlicher Fund nur für dasselbe Muster:
A14/A15 erhalten die erweiterten Abnahmen.

Der oben historische Satz „noch nicht mit zwei Geräten reproduziert“
ist durch diese Ergänzung für Gesehen/Gesehen-Undo erledigt.
App, Regeln und Lernlogik unverändert. Akku zu Beginn 17 %;
kein Gesamtlauf, keine Veröffentlichung. Nächster Prüfpunkt:
abgelehnte Bewertung beim Neustart und Bindung der Tageszähler an
verlorene/abgewiesene Kartenaktionen; keine neue Zählregel ableiten.

Firebase dokumentiert die Synchronisierung nach Offline-Verbindung und
die Regel, dass bei mehreren Änderungen desselben Dokuments der letzte
Schreibvorgang gewinnt: [Offline-Dokumentation](https://firebase.google.com/docs/firestore/manage-data/enable-offline).
Transaktionen lesen den aktuellen Stand und werden bei konkurrierenden
Änderungen erneut versucht; sie scheitern offline:
[Transaktions-Dokumentation](https://firebase.google.com/docs/firestore/manage-data/transactions).
Das erklärt die Messung, bestimmt aber nicht die gewünschte Lernregel.

| Vorschlag | Beleg und Nutzen | Gegenargument | Noch nicht bewiesen |
|---|---|---|---|
| Jede Bewertung an eindeutige Aktion und Ausgangsrevision binden; veraltete Aktionen nicht still über neuere schreiben. Konflikt sichtbar erhalten. | Gemessen: absolute alte Werte vernichten den neueren Rückfall. Eine Ausgangsrevision macht diesen Konflikt erkennbar. | Braucht neue Datenfelder, Regeln, ausfallsichere Warteschlange und kompatiblen Übergang für alte App-Versionen. | Es gibt dafür noch keinen gebauten oder getesteten Produktpfad. |
| Rückgängig darf nur die eigene Aktion widerrufen; nach fremder Änderung keine alten Komplettwerte zurückschreiben. | DATEN-9 zeigt genau die verletzte Grenze. | Ein bloßer lokaler Wertevergleich hat ein Zeitfenster bis zum Schreiben und erkennt gleiche Werte nicht sicher. Serverprüfung oder Aktionsprotokoll nötig. | Offline-Rückgängig, Tageszähler und spätere Konfliktauflösung gemeinsam abnehmen. |
| Für echte Konflikte zunächst bewahren und anzeigen, keine automatische Zusammenrechnung der Stufen. | Verhindert eine erfundene Regel für Sicher/Nicht in unklarer Reihenfolge. | Zusätzliche Bedienhandlung; automatische Zusammenführung könnte später sinnvoll sein. | Auswahl des gültigen Standes und Lernwirkung verlangen eine ausdrückliche Entscheidung. |

Empfehlung als technische Richtung: Konflikte verlustfrei erkennen und
sichtbar halten. Nicht einfach alle Writes durch runTransaction ersetzen:
das würde die bestehende Offline-Bewertung ohne eigene Warteschlange
brechen. Keine Gerätesperre als unbelegte Zusage; Offline-Geräte können
eine Sperre nicht zuverlässig sehen. Keine höhere Stufe/maxStufe als
Konfliktlösung: das würde Nicht und gewolltes Rückgängig ignorieren.

## Konkrete Abnahme vor einer Behebung

- Feste Gegenprobe oben bleibt rot; neue Schutztests am Fix grün.
- Gleiche Karte: A→B, B→A, zwei Offline-Geräte, fremdes Undo und gleiche
  Endwerte mit verschiedenen Aktionen; keine verlorenen Aktionen.
- Andere Karten und nicht betroffene Wort-/Notizfelder unverändert.
- Abbruch, App-Neustart, Kontowechsel, doppelte Zustellung, echte
  Regeln-Ablehnung und alte Client-Version verlieren/verdoppeln nichts.
- Rückgängig korrigiert nur eigene Tagesantwort und freigeschalteten Stand;
  Stufe, Termin, Rückfälle, Höchststand und Zähler gemeinsam prüfen.
- Gesicherte ausstehende Aktion bleibt bis Bestätigung oder bewusster
  Auflösung erhalten; UI unterscheidet lokal, bestätigt und Konflikt.
- Neue Felder und Übergang durch Regeln-/Emulatortests absichern; voller
  Lauf und Rundenabnahme später mit Netzteil, vor Veröffentlichung.

Historischer Status vor dem Bau: bestätigt, nicht behoben. Beide Aufgaben
in AUFGABEN und ALLES-OFFEN aufgenommen.
Die übrige Nachprüfung läuft unabhängig weiter; kein Gesamturteil.

## Schutzentwurf 3.18.30, 09.10.2026 20:42

Der Betreiber hat den Bau ausdrücklich beauftragt. Normale Karten tragen
`bewertungsStand` (eindeutige Aktion) und `bewertungsBasis` (ersetzter Stand).
Die Regeln prüfen den Ausgangsstand atomar. Beide Undo-Wege prüfen schon
vor lokalen Änderungen die eigene Aktionskennung. Textzeilen bleiben beim
bisherigen Probelauf. Notiz/Wort/Reihenfolge benötigen keine neue Antwort.

Noch nicht bestätigte Aktionen liegen zusätzlich einzeln unter
`adrabic-bewertung-<uid>/<aktion>` in localStorage. Ablehnung entfernt
sie nicht. Neustart zeigt sie wieder, Serverprüfung bestätigt oder
kennzeichnet den Konflikt, ohne einen neuen Ausgangsstand zu erfinden.
Download und ausdrückliches Entfernen sind möglich. Speicherfehler
bucht keine neue Antwort. Datenschutz Punkt 7 ist ergänzt.

Belege: `plan/sicherung/tests/karten-fix-2026-10-09/`:

- `schutz-5.log`: 12 Fälle grün mit echtem Firestore-SDK und Repo-Regeln,
  unabhängige Browserprofile. Eigenes Undo, fremdes Undo mit unveränderten
  Tageszählern, Gesehen-Undo, Offline-Bewertung/Gesehen samt Neustart,
  zwei Offline-Geräte, gleiche Werte bei fremder Kennung, eigenes Offline-
  Undo, Löschung, Antwortspeicher voll, echte Regeln-Ablehnung mit Retry
  ohne zusätzliche Tagesantwort, alter Client abgewiesen/Notiz erlaubt.
- `regeln.log`: 222/222, einschließlich zwölf neuer positiver und negativer
  Kennungsfälle. Bestehende Werte-Negativfälle erhalten gültige Kennungen,
  damit die Werteprüfung weiterhin wirklich geprüft wird.
- `undo-verlauf.log`: bestehende beschreibende Zählerausgabe gelesen;
  n und w werden bei eigenem Undo jeweils genau einmal zurückgenommen.
- `konto.log`: drei vorhandene Kontowechsel-/Abmeldefälle grün, Attrappe.

Testaufbau: eigener Demo-Emulator 8082, eigener HTTP-Server 8097, Auth-
Attrappe und echter Firestore-SDK. Die SDK-Probe heißt
`plan/werkzeuge/pruefstand/karten_konflikte_sdk.js` und läuft separat vom
normalen Attrappen-Prüfstand. Die historische Diagnose gegen 7142b93
bleibt erhalten. Eine globale Storage-Fehler-Injektion störte auch den SDK;
das korrigierte Fixture injiziert QuotaExceededError nur für Antwortkopien.
Das belegt diesen App-Fehlerpfad, keinen vollständigen Browser-Speicherausfall.

Grenzen/offen: Gesamtlauf an Quelle 526cb2e58f6b890b läuft (157 Tests),
Rundenabnahme, Affen und Gegenprüfung noch nicht abgeschlossen. Tageszähler
bleiben bei den bisherigen Regeln; die Proben belegen eigene Rücknahme,
blockierte beobachtete fremde Aktion und Retry ohne Doppelzählung, keine
neue Definition von Konfliktantworten. Regelwechsel lehnt geänderte
Bewertungen alter Clients ab; diese brauchen eine Aktualisierung. Regeln
müssen vor Hosting eingespielt werden. Noch kein App-Commit oder Deploy.

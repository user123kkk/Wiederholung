# Übergabe aus ChatGPT – Onboarding/UI – 27.09.2026

Dieses Dokument ist eine Session-Übergabe für Claude Code. Es hält fest, was in der ChatGPT-Session tatsächlich am Repo geändert wurde, welche Betreiber-Beobachtungen dahinterstehen und welche Regressionen dabei entstanden bzw. entdeckt wurden.

## 1. Ausgangslage

Der Betreiber hat auf echten iPhone-Screenshots mehrere Onboarding-Probleme gemeldet:
- Auswahlzeilen und Texte wurden teilweise von UI überlagert.
- Der Bereich mit „Weiter“ lag über dem Inhalt.
- Auf dem Hürden-Screen wurde insbesondere „Nichts davon“ verdeckt.
- Hinweise/Echos standen teilweise hinter dem Button.
- Einige Animationen fühlten sich ruckelig an.
- Der Ladebildschirm zeigte das Icon beim ersten Bild an einer anderen Position und kurz danach an einer anderen/zentrierten Position.
- Der Plan-Aufbau sollte ruhiger werden und beim Aufbau sinnvoll automatisch mit dem Inhalt scrollen.
- Die vertikale Plan-Leiter soll langsamer und sauberer nach unten laufen.
- Auf der Probekarte ruckelte besonders der Übergang nach der Bewertung bei „Dann kommt sie morgen wieder …“.

**Wichtig:** Der Betreiber will keine neue UI-Architektur. Die vorhandene App-Logik, bestehende Layout-Muster und bestehende Animationen sind die Referenz. Erst vorhandenen Code lesen, dann minimal reparieren.

## 2. Bereits behobener Overlay-Fehler – 3.17.44

In styles.css war .einstieg > .einstieg-aktion mit position: sticky versehen.

Das war die Ursache dafür, dass der Weiter-Bereich bei langen Screens über den Inhalt gelegt wurde.

Behoben:
- position: sticky aus dem Weiter-Bereich entfernt.
- normaler Dokumentfluss wiederhergestellt.
- margin-top: auto bleibt für kurze Screens erhalten.
- künstlicher 11rem-Puffer unter den Auswahlzeilen entfernt.
- lange Onboarding-Screens dürfen normal wachsen und scrollen.

Dadurch gilt jetzt:
- kurzer Screen → Fuss unten;
- langer Screen → Inhalt wächst und scrollt;
- kein Weiter-Overlay über Auswahl/Text.

Der Regressionstest plan/werkzeuge/pruefstand/t_einstieg_g083_039_040_041_044.js wurde auf diese Logik angepasst.

## 3. Entfernte Onboarding-Texte – 3.17.45

Auf Wunsch des Betreibers wurden diese redundanten erklärenden Sätze aus dem produktiven Onboarding entfernt:
- „Aus deinen Antworten. Schrift und Runde kannst du jederzeit ändern.“
- „So kommt ein Wort zurück, das du heute anlegst“
- „Weißt du es mal nicht, kommt es früher wieder.“

Nicht versehentlich wieder einbauen. Das Entfernen folgt dem Wunsch nach Kürze/Hick's Law und der vorhandenen Onboarding-Entscheidung, Mechanik möglichst visuell statt doppelt verbal zu erklären.

## 4. Plan-Aufbau – 3.17.45

Der Plan-Aufbau wurde etwas entschleunigt:
- Schritt-Takt auf 820 ms erhöht.
- Vorlauf auf 700 ms.
- Nachlauf auf 1100 ms.
- vertikale Leiter-Animation in styles.css von 1200 ms auf 2200 ms verlängert.
- einzelne Leiterzeilen ruhiger gemacht.

### Achtung: erste Auto-Scroll-Implementierung war nicht sauber

Zuerst wurden mehrere scrollIntoView({ behavior: smooth })-Aufrufe zeitlich hintereinander gesetzt.

Das war eine schlechte Lösung: mehrere laufende Smooth-Scrolls können sich auf iOS gegenseitig abbrechen und als Stop-and-go/Ruckeln erscheinen.

**3.17.46 ersetzt diese Architektur wieder durch eine einzige kontrollierte Animation.**

## 5. Auto-Scroll – aktueller Stand 3.17.46

app.js verwendet jetzt für den Plan-Aufbau und den fertigen Plan jeweils eine kontrollierte requestAnimationFrame-Bewegung statt einer Kette konkurrierender smooth-Scrolls.

Ziel:
- während der Plan entsteht → ruhiges Folgen des wachsenden Inhalts;
- fertiger Plan → eine einzige längere Bewegung über den vorhandenen Plan;
- keine drei aufeinanderfolgenden Smooth-Scrolls, die einander abbrechen.

Wenn der Betreiber weiterhin Ruckeln meldet, nicht wieder mehrere scrollIntoView-Timer hinzufügen. Stattdessen die eine Bewegung messen und ihre Dauer/Easing/Abbruchlogik anpassen.

prefers-reduced-motion wird berücksichtigt; bei reduzierter Bewegung kein automatisches Scrollen.

## 6. Probekarte / „Dann kommt sie morgen wieder“ – 3.17.46

Der bisherige Ablauf war: Bewertung anklicken → ui.einstieg.bewertet setzen → kompletter render() → Probekarte wird als neuer DOM-Baum erzeugt → Antworttext/Leiste erscheinen gleichzeitig.

Das konnte auf dem Gerät wie ein kurzer Ruck der Karte/Scrollposition wirken.

Jetzt:
- Beim Klick auf einstieg-bewerten bleibt die vorhandene Probekarte im DOM.
- Es wird kein kompletter render() für diesen Schritt mehr gemacht.
- Nur Bewertungsbuttons werden durch Antwort + Weiter-Fuss ersetzt.
- Die Karte, ihre aktuelle Drehposition und die Scrollposition bleiben dieselben DOM-Knoten.
- ansagen() bleibt erhalten.

Das ist absichtlich eine lokale DOM-Änderung: nicht den ganzen Onboarding-Screen neu rendern, wenn nur der Bereich unter der Karte wechseln muss.

## 7. Loading-Screen – wichtiger Befund

Der Boot-Screen besteht aus zwei zeitlich verschiedenen Dingen:
1. iOS kann beim Start einer installierten PWA zuerst apple-touch-startup-image aus splash/*.png anzeigen.
2. Danach erscheint das HTML-.boot aus index.html.

app.js hat bereits bootBild(), und index.html hat dasselbe Markup, damit der erste HTML-Paint nicht auf app.js wartet.

### 3.17.45/3.17.46

Der HTML-First-Paint wurde zusätzlich abgesichert:
- .boot steht schon mit data-stand=ruhig im HTML.
- kritische Positionierungswerte im Inline-CSS verwenden keine erst später definierten CSS-Variablen mehr.
- styles.css und app.js werden weiterhin über die gemeinsame Versionsnummer geladen.

### Sehr wichtiger offener Punkt

Wenn das Icon zwischen dem iOS-Startbild und dem HTML-Loading-Screen springt, kann das nicht allein durch app.js behoben werden.

Die Splash-PNGs unter splash/ sind statische Bilder. Das Repo dokumentiert bereits:
- plan/werkzeuge/startbilder.js erzeugt sie.
- Das Skript fotografiert den tatsächlichen .boot-Screen.
- Wenn .boot-Markup oder Geometrie geändert wird, müssen die Splash-Bilder neu erzeugt werden.

**Deshalb nicht einfach noch mehr CSS-Offsets auf .boot stapeln.** Erst prüfen, ob die statischen splash/*.png geometrisch noch dem aktuellen .boot entsprechen.

Der Betreiber meldet aktuell weiterhin einen Loading-Sprung. Das ist daher der nächste konkrete Prüfpunkt.

## 8. Sehr wichtige Arbeitsregel für zukünftige Sessions

**Änderungen an UI/Motion erzeugen in diesem Projekt relativ leicht neue Fehler.**

Konkrete Beispiele aus dieser Session:
- Sticky-Footer wurde als vermeintliche Lösung für Positionierung benutzt → verdeckte lange Screens.
- Der erste Auto-Scroll-Versuch nutzte mehrere smooth-Scrolls → Bewegungen konnten sich gegenseitig abbrechen.
- Ein kompletter render() nach Bewertung der Probekarte konnte die Karte erneut mounten und dadurch Ruckeln verursachen.

### Nach jedem UI-Fix angrenzende Zustände erneut prüfen

Nicht nur den gemeldeten Screenshot reparieren.

Mindestens prüfen:
- vorheriger Screen;
- aktueller Screen;
- nächster Screen;
- kurzer Handy-Screen;
- langer Handy-Screen;
- Zurück;
- Auswahl ohne Auswahl;
- letzte Auswahl / Nichts davon;
- Bewertung der Probekarte;
- Plan-Aufbau;
- fertiger Plan;
- Scrollposition vor/nach Interaktion;
- prefers-reduced-motion;
- Loading First Paint;
- iOS-spezifische Übergänge.

**Regel: Ein Fix ist nicht fertig, wenn nur die Stelle besser aussieht. Er ist fertig, wenn die benachbarten Zustände weiterhin dieselbe Geometrie und Interaktionslogik behalten.**

## 9. Keine Lernlogik verändern

Die Änderungen hier betreffen Darstellung, DOM-Mounting und Bewegung.

Nicht verändern:
- Wiederholungsalgorithmus;
- Stufen;
- Fälligkeiten;
- Bewertungsspeicherung;
- Lernfortschritt.

Die Probekarte im Onboarding ist nur Demonstration. Ihre Bewertung wird nicht als echte Lernbewertung gespeichert.

## 10. Veröffentlichung / Cache

Aktueller Stand dieser Session: 3.17.46.

Muss identisch sein in:
- app.js → APP_VERSION
- sw.js → CACHE_NAME
- index.html → app.js?v=...
- index.html → styles.css?v=...
- CHANGELOG.md

Vor Veröffentlichung nach CLAUDE.md prüfen.

node --check app.js ist Pflicht.

## 11. Nächster sinnvoller Prüfpunkt

1. Loading-Screen auf echtem iPhone prüfen: Ist der Sprung Splash-PNG → HTML oder innerhalb des HTML-Boot-Screens?
2. Falls Splash → HTML: splash/*.png mit plan/werkzeuge/startbilder.js neu erzeugen und auf einem echten iPhone prüfen.
3. Falls innerhalb HTML: First-Paint-Geometrie mit und ohne styles.css messen; nicht blind weitere Offsets hinzufügen.
4. Probekarte auf echtem iPhone testen: Karte antippen → bewerten → „Dann kommt sie morgen wieder“; dabei insbesondere getBoundingClientRect().top, scrollY und sichtbare Bewegung vergleichen.
5. Plan-Aufbau testen: keine konkurrierenden Scrollbewegungen, keine Sprünge beim Erscheinen neuer Leiterpunkte.
6. Erst danach weitere Motion-Anpassungen vornehmen.

## 12. Was bewusst NICHT gemacht wurde

- keine neue UI-Bibliothek;
- kein Framework-Wechsel;
- keine neue Lernfunktion;
- keine Änderung der Lernlogik;
- kein neues Overlay-System;
- kein weiterer Sticky-Footer;
- keine künstlichen großen Scroll-Puffer;
- keine zusätzlichen erklärenden Texte an den drei oben genannten Stellen.

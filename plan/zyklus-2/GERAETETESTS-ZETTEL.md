# Gerätetests am iPhone – Zettel zum Abhaken

## Neue Testpräferenz 10.10.2026 – gilt vor dem alten Zettel

Betreiber möchte möglichst keine Screenshots oder Screenrecordings liefern.
Agent testet selbst im Browser und untersucht passende Simulator-/Emulator-
oder echte Gerätezugänge, auch für Öffnen vom Homebildschirm und installierte
PWA. Die [Quelle7](../ideen/TIKTOK-SAMMLUNG-2026-10-10.md) ist ein offener
Prüfauftrag für diesen Testweg, kein Beleg, dass hier schon ein iPhone-
Simulator verfügbar ist. Quelle1 ergänzt kleine/große Displays, Drehung,
Foldables, mehrere Fenster und Displays. G1–G7 möglichst automatisieren;
je Fall Testumgebung und verbleibenden echten Gerätebeleg dokumentieren.
Chromium-Viewporttests ersetzen keinen Safari-/iOS-/PWA-Systembeleg.
Den Betreiber erst mit dem begründeten, nicht automatisierbaren Rest belasten;
keine Bildschirmfoto-Pflicht. Historische Anleitungen unten bleiben Verlauf.

Stand 05.10.2026. Quelle: `ENTSCHEIDUNGEN.md`, Abschnitt „Was Du am Gerät
prüfen musst“. Das kann kein Agent, der Prüfstand hat kein echtes iPhone.

**Vorher:** Auf dem iPhone muss die Version laufen, die getestet wird.
Einstellungen der App ganz nach unten scrollen, dort steht die Nummer.
Steht dort eine ältere: erst am Laptop `ladegeraet.bat` (Netzteil dran),
dann die App am iPhone ganz schließen und neu öffnen.

Zu jedem Punkt reicht mir eine Zeile: „G1 ok“ oder „G1 nein: …“, bei „nein“
am besten ein Bildschirmfoto.

## Geht schon mit der Version, die jetzt online ist

- [ ] **G1 – Feld „Wort“ scrollt nicht weg**
  1. Reiter **Verwalten** → **Neu** → **Karte**.
  2. Ins Feld **Wort** tippen, Tastatur kommt.
  - Richtig: Die Seite bleibt stehen, das Feld ist über der Tastatur zu sehen.
- [ ] **G2 – Quran-Schrift** (nur Dein Konto)
  1. Einen Text mit Sure 2 öffnen.
  - Richtig: keine gestrichelten Kreise, die Schrift steht ruhig.
- [ ] **G3 – Tastatur über großem Textfeld** (nur Dein Konto)
  1. **Neu** → **Text** → eigenen Text tippen, mehrere Zeilen.
  - Richtig: Feld und Knöpfe bleiben erreichbar.
- [ ] **G4 – Google-Konto löschen**
  1. Ein **Testkonto** mit Google anlegen (nicht Dein echtes).
  2. Einstellungen → Konto löschen, bis zum Ende durchgehen.
  - Richtig: Das Google-Fenster öffnet sich, das Löschen geht durch.
  - Geht das Fenster nicht auf: Das ist der Fall, für den E17 gedacht ist.

## Erst nach dem nächsten Veröffentlichen (Paket E und F)

- [ ] **G5 – Sicherung**
  1. Einmal in Safari, einmal in der installierten App:
     Einstellungen → **Sichern & einspielen** → **Alles sichern**.
  - Richtig: In der iPhone-App **Dateien** liegt `adrabic-sicherung-….json`.
- [ ] **G6 – Erinnerung**
  1. iPhone-App: Einstellungen → Tägliche Erinnerung einrichten.
  2. Dasselbe auf einem Android-Handy.
  - Richtig: Der Kalender bietet den Termin an.
- [ ] **G7 – Zurück von Datenschutz/Impressum**
  1. Installierte App: Einstellungen → **Datenschutz** → zurück.
  - Richtig: Du bist dort, wo Du warst. Nichts lädt neu.
- [ ] **Sicherung einspielen (Paket F)**
  1. Die Datei aus G5 unter **Sichern & einspielen** → Einspielen wählen.
  - Richtig: Es entsteht ein neuer Bereich mit denselben Karten.

## Nur ansehen, kein Ja/Nein nötig

- **Start der App (D15):** App ganz schließen, neu öffnen. Wirkt der Wechsel
  vom Ladebild zur App wie ein Sprung? Wenn nicht, bleibt D15 liegen.
- **Gefühl beim Wischen und Aufdecken (D9):** ein paar Karten lernen.
  Fällt etwas als Ruckler auf, sag wo.

## Nicht am Gerät, aber nur Du

- **Rechtsprüfung:** Eine Person mit Rechtskenntnis liest
  `datenschutzerklaerung.html`. Seit Paket F geändert: „Kurz gesagt“,
  Punkt 6, 9, 10, 13 und 14.

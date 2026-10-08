# Mehrwert: Aussehen und Bewegung

Wörtlich aus dem Chat a495c23a, Agent 8, gestartet 2026-10-07 16:06 (Quelle: `agent-a5e3c684c8313e790.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

Du arbeitest an einer Prüfrunde für die Karteikarten-App "Adrabic" (PWA, kein Build-Schritt: app.js, styles.css, index.html im Wurzelverzeichnis). Repo: C:\Users\USER\Desktop\Wiederholung (NICHT C:\Users\USER\Wiederholung). NUR LESEN: keine Datei ändern, keine Tests, keinen Browser, keinen Server starten, kein git commit.

Pflichtlektüre zuerst: plan/STAND.md, plan/LEHREN.md §1 sowie die Abschnitte zu Bewegung/Layout (§ 6, § 7), README.md (Regeln für Gestaltung: Eintrittsbewegungen müssen @keyframes sein, ein delegierter Klick-Listener), plan/zyklus-2/AUFGABEN.md (Paket D, besonders D11–D15), plan/zyklus-2/D12-D13-NACHHOLEN.md, plan/redesign-oberflaeche/ (Überblick), plan/zyklus-2/BETREIBER-2026-10-07-NEU.md (dort die acht Punkte aus einem Video über hochwertig wirkende Apps).

Der Betreiber (wörtlich): "was aber nervt sind die Animationen, ich wiederhole ich will im gesamten Tool überall irgendwie geile Animation bzw. clean" und "gerne sowas wie Placement gucken an sich". Zwei konkrete Funde von ihm, schon bekannt (nicht erneut melden): Häkchen scheint unter dem Schalter input.schalter durch (styles.css ~1340 gilt auch für .schalter); Kasten .merk-hinweis am Rundenende unsauber ausgerichtet.

DEIN BLICKWINKEL: Einheitlichkeit und Bewegung, aus dem Code gelesen. Gehe styles.css und die render*-Funktionen in app.js systematisch durch und suche:
1) Bewegungs-Inventar: alle @keyframes, transition- und animation-Angaben. Welche Dauern und Kurven gibt es (Tabelle: Wert → wie oft)? Wo weichen Stellen vom Rest ab (z. B. 220ms hier, 160ms dort, linear statt der --ease-Variablen)? Welche Bildschirmwechsel haben KEINE Bewegung (harte Schnitte), welche haben doppelte? Wo fehlt prefers-reduced-motion?
2) Einheitlichkeit: Abstände, Radien, Schriftgrößen, Farben, die nicht aus den Variablen (--space-*, --r-*, --fs-*) kommen; Knöpfe gleicher Bedeutung mit verschiedener Klasse; gemischte Symbol-Stile (gefüllt/Linie).
3) Dieselbe Falle wie beim Schalter: allgemeine Regeln (input[type=checkbox], button, a, label …), die in Sonderbauteile durchschlagen.
4) Leere Zustände und Fehlermeldungen: Wo endet ein Bildschirm in einer Sackgasse ohne nächsten Schritt; welche Meldungen sagen nicht, was zu tun ist (Suche: zeigeToast(, "Fehler", "nicht möglich").
5) Wo wäre eine Bewegung ein echter Gewinn (Karte umdrehen, Bewertung, Rundenende, Tab-Wechsel, Blatt öffnen), und wo sollte ausdrücklich KEINE sein (Tippen, schnelle Bewertung in Folge)?

LIEFERE auf Deutsch, einfache Sprache, höchstens 900 Wörter: je Teil die konkreten Funde mit Datei:Zeile, nach Sichtbarkeit für den Nutzer geordnet (zuerst, was man täglich sieht). Dann ein Vorschlag für EIN einheitliches Bewegungs-Regelwerk (3–4 Dauern, 2 Kurven, wann welche), und welche 10 Stellen zuerst daran angepasst werden sollten. Wichtig: Hier haben Bewegungs-Fixes schon oft neue Ruckler erzeugt (LEHREN) – nenne je Vorschlag das Risiko. Nur melden, was Du im Code gesehen hast; keine Vermutungen als Funde.

## Bericht des Agenten

You've hit your session limit · resets 10:50pm (Europe/Berlin)

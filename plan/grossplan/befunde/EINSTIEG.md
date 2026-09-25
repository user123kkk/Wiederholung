# EINSTIEG – Befunde (Einstieg, Anmeldung, Bestätigung, erster Start, Bewegung)

Stand: v3.17.29. Geprüft im Prüfstand (Chromium, Firebase-Attrappe) auf 390×844 und 360×740, hell und dunkel, dazu CPU 4×, reduzierte Bewegung und Tastatur am Desktop.
Skripte: `audit/EINSTIEG/walk.js`, `mess2.js`, `rest.js`. Fotos: `audit/EINSTIEG/bilder/` (z. B. `handy-dunkel-0…9lernen.png`, `klein-*`, `x-*`).
Nicht prüfbar: echtes iOS/Android (Tastatur, Zurück-Geste, Gefühl der Bewegung), echte Mails.

---

#### EINSTIEG-1: Die Karten-Wege auf dem Plan liegen hinter dem Knopf und werden kaum gesehen
- Art: Verbesserung
- Schwere: mittel
- Beleg: `app.js:6283–6315` (Plan-Bildschirm). Gemessen: Die Seite ist 1218 px hoch bei 844 px Bildschirm (390 px Breite) und 1263 px bei 740 px (360 px). Der Knopf „Plan speichern“ steht fest bei 776 px. Die Leiter („So kommt ein Wort zurück …“) beginnt etwa bei 590 px und „Und so kommst du an deine Karten“ erst unterhalb von 1000 px. Beides läuft hinter bzw. unter dem stehenden Knopf ab, die Animationen der Leiter (`styles.css:4147 ff.`, Verzögerung 700–1650 ms) spielen dort, wo niemand hinsieht. Fotos `handy-dunkel-7.png`, `klein-hell-7.png`. Verifiziert.
- Warum es stört: Die zwei Wege („Selbst anlegen“, „Kartensatz per Code“) sind ausdrücklich wegen des TikTok-Befunds des Betreibers hier (Kommentar `app.js:6295`). Wer nicht scrollt, sieht sie nie, und der Knopf lädt zum Weitertippen ohne Scrollen ein.
- Vorschlag: Den Plan kürzen, bis er auf eine Bildschirmhöhe passt. Der Satz über den Kacheln entfällt (siehe EINSTIEG-6). Die Leiter kommt kompakt als waagerechte `einstiegLeiste(false)` statt der senkrechten Leiter, denn dasselbe Bild steht schon auf Bildschirm 0 und nach „Sicher“. Die beiden Wege stehen direkt über dem Knopf. Alternativ kommen die Wege in die Start-Liste nach der Anmeldung, wo sie ohnehin als Knöpfe stehen.
- Entscheidet: Betreiber (Inhalt des Plans wird umgestellt)
- Umsetzung: Sonnet
- Abnahme: Auf 390×844 und 360×740 ist `document.documentElement.scrollHeight <= innerHeight + 40`, oder die Unterkante von `.einstieg-wege` liegt über der Oberkante von `.einstieg-aktion`.
- Pro/Contra: Pro: Das TikTok-Argument wirkt erst, wenn die Wege gesehen werden. Die Leiter wiederholt die Leiste (nichts doppelt), und ein Bildschirm hat dann eine Aufgabe. Contra: Die senkrechte Leiter mit groben Zeitangaben („morgen“, „nach etwa einer Woche“) ist die einzige Stelle mit Zeitworten. Der Betreiber hat den Plan „soo tuff“ genannt, weniger Plan kann weniger „Wertgefühl“ bedeuten. Empfehlung: Die Leiter bleibt, dafür fällt die Satzwiederholung weg und die Wege rücken **vor** die Leiter. Das kostet nichts und macht die Wege sichtbar.

#### EINSTIEG-2: „Kostenlos.“ steht noch auf „Plan speichern“, obwohl der Betreiber es „komplett“ weg haben wollte
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:6777`: `(ausEinstieg ? "Kostenlos. Einmal anlegen – dann ist dein Plan gespeichert."`. `CHANGELOG.md` 3.17.22: Betreiber „entferne dieses kostenlos. keine werbung.. komplett“, entfernt wurde es nur auf dem Plan (`app.js:6307`). Foto `handy-dunkel-8auth.png`. Verifiziert.
- Warum es stört: Das Muster wurde an einer Stelle behoben, an der nächsten nicht (LEHREN § 3.3). Dazu warnt NEUAUFBAU-3 § 5 vor einer Kosten-Zusage, die nicht gemacht ist.
- Vorschlag: Den Text ersetzen durch „Einmal anlegen – dann ist dein Plan gespeichert.“
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: `grep -n -i "kostenlos" app.js` findet keinen String mehr in der Oberfläche, nur noch Kommentare.

#### EINSTIEG-3: Die Probekarte springt beim Antippen 40 px nach oben
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:6172–6180`. Vor dem Aufdecken steht über der Karte `<p class="subtitle">…Tipp die Karte an…</p>`, danach fehlt dieser Absatz, und die Karte rückt nach oben. Gemessen: `.einstieg-probe` oben 205 → 165 px (390 px) bzw. 205 → 164 px (360 px). Fotos `handy-dunkel-3a.png` / `3b.png`. Verifiziert.
- Warum es stört: Das Element unter dem Finger bewegt sich genau beim Tipp (LEHREN § 6.1). Die Aufklapp-Drehung wird dadurch zu zwei Bewegungen (Drehung plus Versatz).
- Vorschlag: Den Untertitel in beiden Zuständen an derselben Stelle lassen und nur den Text tauschen, „Wie sicher warst du?“ ersetzt also den Hinweis im selben `<p>`. Alternativ bekommt die Zeile eine feste Mindesthöhe.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Vor und nach `einstieg-aufdecken` ist `getBoundingClientRect().top` von `.einstieg-probe` gleich (±1 px) auf 390 und 360 px.

#### EINSTIEG-4: Die Probekarte übt eine andere Bedienung als die echte Runde
- Art: Verbesserung
- Schwere: mittel
- Beleg: In der echten Runde dreht sich die Karte um 180° und zeigt die Antwort auf der Rückseite (`styles.css:2074–2090`, `karte-wende`, 3.14.0/3.17.0). Die Probekarte auf Bildschirm 3 klappt nur um −90° → 0° auf (`styles.css:3956`, `einstieg-aufklappen`), bleibt dabei arabisch, und die Lösung erscheint **unter** der Karte (`.einstieg-karte__loesung`). Bildschirm 0 dreht dagegen wie die echte Runde auf „Buch“. Außerdem wurde der Einladen-Puls in der Runde in 3.17.26 entfernt (Betreiber: „umdrehen nicht gezwungen“, `styles.css` Kommentar bei 2140). Im Einstieg läuft er weiter (`styles.css:3942`, `einstieg-einladen 1.8s … 2`). Fotos `handy-dunkel-3b.png`, `-3c.png`. Verifiziert.
- Warum es stört: C2 in `ENTSCHIEDEN.md` verlangt „wie im echten Lernlauf“. Wer den Einstieg durchläuft, lernt drei verschiedene Kartenbilder kennen. Der Puls, den der Betreiber in der Runde als Druck empfand, bleibt genau in dem Moment stehen, in dem die neue Person sich erinnern soll.
- Vorschlag: Bildschirm 3 baut die Karte aus demselben Markup und denselben Klassen wie die Runde (`karte-dreh--wende`, Rückseite `karte-seite--hinten`), ohne Speichern. `einstieg-einladen` entfällt, stattdessen der Satz „Tippen zum Umdrehen“ wie in der Runde.
- Entscheidet: Agent (Bedienung/Optik im bestehenden Stil, Lernlogik unberührt)
- Umsetzung: Sonnet
- Abnahme: `grep -n "einstieg-aufklappen\|einstieg-einladen" styles.css app.js` findet nichts mehr. Das Foto nach dem Aufdecken zeigt „Buch“ auf der Kartenrückseite wie in `t_runde_*`-Fotos. `t_einstieg.js` bleibt grün.

#### EINSTIEG-5: „Nichts davon“, der ehrliche Ausweg, liegt auf 360 px hinter dem Weiter-Knopf
- Art: Fehler
- Schwere: mittel
- Beleg: Bildschirm „Was hat dich bisher gebremst?“ (`app.js:6150–6160`). Gemessen ohne Wahl auf 360×740: Zeile „Nichts davon“ 580–640 px, der fest stehende Bereich `.einstieg-aktion` beginnt bei 613 px. Die Zeile ist also halb verdeckt. Auf 390 px ist sie nach drei Hürden ganz verdeckt (Seite 908 px, Foto `handy-dunkel-2.png`). Nirgends ist ein Hinweis zu sehen, dass die Seite weiterscrollt. Verifiziert.
- Warum es stört: Der Bildschirm ist Pflicht (`EINSTIEG_PFLICHT[2]`). Wer keine Hürde hat, braucht genau diese letzte Zeile. Sieht er sie nicht, wählt er eine Hürde, die nicht stimmt, oder bleibt stecken („Wähl, was stimmt – oder ‚Nichts davon‘.“ nennt eine Zeile, die er nicht sieht).
- Vorschlag: `.einstieg-solo` bekommt unten Luft in Höhe des stehenden Bereichs (`padding-bottom`/`scroll-padding-bottom`), dazu ein weicher Verlauf über dem Knopf als Scroll-Hinweis. Oder die Hürden-Zeilen werden auf 360 px enger (Icon-Kreis kleiner, `min-height` 52 px), damit sechs Zeilen passen.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Auf 360×740 und 390×844 ohne Wahl liegt `bottom` von `[data-id="keine"]` über `top` von `.einstieg-aktion`. Mit drei Hürden lässt sich die Zeile ganz über den Knopf scrollen.

#### EINSTIEG-6: Der Zeitpunkt steht auf dem Plan zweimal
- Art: Verbesserung
- Schwere: niedrig
- Beleg: `app.js:6287` `einstieg-satz--plan` („Nach dem Fajr-Gebet mache ich eine Runde.“) und `app.js:6290` Kachel „Zeitpunkt: nach dem Fajr-Gebet“. Foto `handy-dunkel-7voll.png`. Verifiziert.
- Warum es stört: „Nichts doppelt“ (LEHREN § 1.5/§ 6.9). 3.10.3 hatte den Satz unter „Plan speichern“ schon wegen „doppelt gemoppelt“ entfernt.
- Vorschlag: Den Satz behalten (er ist der Vorsatz, Beleg Gollwitzer) und die Kachel „Zeitpunkt“ streichen. Das Raster bekommt dann drei Kacheln, oder „Ziel“ läuft über die ganze Breite.
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: Auf dem Plan kommt der Anker-Text genau einmal vor (`innerText`-Zählung).

#### EINSTIEG-7: Die Einstiegs-Antworten bleiben liegen, wenn man sich danach in ein bestehendes Konto einloggt oder abbricht
- Art: Fehler
- Schwere: mittel
- Beleg: `adrabic-einstieg-antworten` wird nur in `einstiegAnwenden()` (`app.js:1308`, nur bei neuem Konto ohne Cloud-Dokument) und bei `einstieg-konto` (`app.js:11816`, nur Bildschirm 0) gelöscht. Weg „Plan speichern → Ich habe schon ein Konto (`mode-login`) → Anmelden“ gemessen: danach steht `{"arabGroesse":"gross"}` weiter im `localStorage` (`rest.js`). Wer nach „Plan speichern“ abbricht, behält den Schlüssel und den Wenn-dann-Satz (`adrabic-einstieg-nachklang`) auf Dauer. Legt später jemand anderes auf dem Gerät ein Konto an (z. B. per Google), erbt er Schrift/Runde, und sein leerer Lernen-Bildschirm zeigt den Satz der vorigen Person („Nach dem Maghrib-Gebet …“). Datenschutzerklärung Punkt 7 sagt „bis dein Konto angelegt ist“. Verifiziert (Bestandskonto), Rest aus dem Code gelesen.
- Warum es stört: Das Versprechen „Zwischenspeicher weg, Datensparsamkeit P6“ gilt nur im Hauptweg. Der Satz mit Gebetsbezug ist die bewusste Ausnahme aus LEHREN § 2.5 und sollte gerade nicht länger liegen als zugesagt.
- Vorschlag: Im Zweig „Cloud-Dokument existiert“ (`app.js` nach `cloudDocExists = true`, einmal je Anmeldung) beide Schlüssel löschen. Ein Bestandskonto braucht weder Antworten noch Nachklang. Beim Abbruch ohne Konto: den Nachklang erst bei `doRegister`/Google-Neukonto setzen statt bei „Plan speichern“, oder einen Zeitstempel speichern und nach z. B. 7 Tagen verwerfen. Die Datenschutzerklärung in denselben Worten nachziehen.
- Entscheidet: Agent (mechanisch). Die Zeitgrenze und eine Textänderung der Datenschutzerklärung legt der Agent dem Betreiber vor.
- Umsetzung: Sonnet
- Abnahme: Einstieg → Plan speichern → Anmelden mit Bestandskonto: danach `localStorage.getItem('adrabic-einstieg-antworten') === null` und `…-nachklang === null`. Test als `t_einstieg_rest.js`.

#### EINSTIEG-8: Bei „Bewegung reduzieren“ springen Inhalte außerhalb des Einstiegs verzögert herein
- Art: Fehler
- Schwere: mittel
- Beleg: `styles.css:577–583` setzt bei `prefers-reduced-motion` nur Dauer und Wiederholung auf fast null, **nicht die Verzögerung**. Nur der Einstieg setzt sie auf 0 (`styles.css:4253–4255`). Gemessen mit reduzierter Bewegung, 30 ms nach dem Wechsel noch laufende Verzögerungen: Lernen `stapel` 60 ms, `ring__fuellung` 250, `hinweis` 260, Serien-Punkte 380–545+, Zeichen 700. Fortschritt `stat-block` 80–360, `kal` 300, `stat-bar` 450. Im Code außerdem `.ende--neu .ende__aktionen … 1300ms backwards` (`styles.css:2275`, Rundenende-Knöpfe 1,3 s unsichtbar) und `.startliste-oder` 420 ms. Verifiziert (Messung `mess2.js`).
- Warum es stört: Mit `fill-mode both/backwards` ist das Element bis zum Ende der Verzögerung unsichtbar und erscheint dann schlagartig. Wer Bewegung abbestellt, bekommt so ein stückweises Aufploppen statt eines ruhigen Bilds (LEHREN § 6.4: „bekommt das Ergebnis sofort“). Die Rundenende-Knöpfe fehlen 1,3 s.
- Vorschlag: In der globalen Regel `animation-delay: 0s !important;` ergänzen. Die Ausnahme `button.halten.haelt .halten__fuellung` hat keine Verzögerung und bleibt unberührt. Danach kann die Sonderregel für `.einstieg` entfallen.
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: `mess2.js` Teil (c) meldet mit `reducedMotion: 'reduce'` auf Lernen, Fortschritt und Rundenende „keine Verzögerungen“. `t_a11y.js` bleibt grün.

#### EINSTIEG-9: Das Handy-Zurück verlässt den Einstieg (und die App) statt einen Schritt zurückzugehen
- Art: Fehlt
- Schwere: mittel
- Beleg: `app.js` benutzt `history.pushState`/`popstate` nirgends (grep ohne Treffer, auch `plan/beobachtungen-lernwerkzeug.md:574`). Der Einstieg hat nur den eigenen Pfeil (`einstieg-zurueck`). Escape tut im Einstieg nichts (gemessen). Vermutung (am Gerät nicht prüfbar): Android-Zurück in der installierten App schließt sie auf Bildschirm 5, Ziel und Hürden sind weg (nur im Arbeitsspeicher), beim nächsten Öffnen beginnt alles bei Willkommen. Dasselbe gilt für Blätter und Unterseiten der App.
- Warum es stört: Die Zurück-Geste ist die häufigste Bedienung am Handy. Ein Einstieg, der dabei alles verwirft, ist eine Abbruchstelle, die der Betreiber nicht sieht.
- Vorschlag: Eine kleine, zentrale Verlaufs-Schicht: je Einstiegs-Schritt bzw. offenem Blatt `history.pushState({ebene})`, dazu ein `popstate`-Listener, der `einstieg-zurueck` bzw. `schliesseObersteEbene()` aufruft. Zuerst nur für den Einstieg, mit Gerätetest. Escape im Einstieg = Zurück.
- Entscheidet: Betreiber (Architektur, berührt bfcache-Verhalten)
- Umsetzung: Opus
- Abnahme: Prüfstand: `page.goBack()` auf Bildschirm 5 zeigt Bildschirm 4 mit erhaltenen Antworten. Am Android-Gerät: Zurück-Taste geht Schritt für Schritt bis Willkommen, erst dann raus.
- Pro/Contra: Pro: Das erwartet jede Person am Handy. Sie verliert keine Antworten mehr, und Blätter schließen, wie man es gewohnt ist. Contra: Es gab schon einen bfcache-/Zurück-Fehler mit Impressum (`beobachtungen-lernwerkzeug.md`, v3.0.41). Neue Verlaufseinträge können dort Nebenwirkungen haben, und am Gerät ist das schwer zu testen. `render()` ersetzt `#app` komplett, der Zustand muss also sauber aus `ui` kommen. Empfehlung: machen, aber eng begrenzt auf den Einstieg (vor der Anmeldung gibt es noch kein Firebase-Konto, das gestört werden könnte) und als eigener Commit mit Gerätetest. Blätter kommen erst danach.

#### EINSTIEG-10: Auf der Bestätigungsseite laufen zwei Bewegungen endlos
- Art: Fehler
- Schwere: niedrig
- Beleg: `styles.css:4452` `.brief-bild .i-xl { … animation: brief-schweben 2.8s … infinite; }` und `styles.css:4464` `animation: puls 1.6s ease-in-out infinite;` (Punkt vor „Sobald du bestätigt hast …“). Man wartet dort oft Minuten auf die Mail. Foto `x-bestaetigen.png`. Verifiziert (Code).
- Warum es stört: LEHREN § 6.4: kein Endlos-Loop, der Aufmerksamkeit zieht. Bewegung über 5 s braucht nach WCAG 2.2.2 einen Stopp. Zwei Bewegungen für ein Warten sind dazu doppelt.
- Vorschlag: `brief-schweben` einmal laufen lassen (Wiederholung 1–2). `puls` bleibt als einziges „es arbeitet“-Zeichen, aber nur ein paar Durchläufe (z. B. 6, ≈ 10 s), dann steht der Punkt ruhig.
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: `grep -n "infinite" styles.css` zeigt nur noch Ladekreis, Skelett, Ladebildschirm und `einstieg-atmen` (der Aufbau dauert < 6 s).

#### EINSTIEG-11: Jede Wahl im Einstieg löst vier Bewegungen gleichzeitig aus
- Art: Verbesserung
- Schwere: niedrig
- Beleg: Ein Tipp auf eine Antwortzeile startet `einstieg-blitz` 600 ms (`styles.css:3668`), `einstieg-hupf` 480 ms mit Feder und Drehung am Icon (`:3655`), `einstieg-haken` mit Feder (`:3661`) und `einstieg-echo` 460 ms (`:3700`). Dazu läuft bei **jedem** Schrittwechsel ein Lichtstreif durch den Fortschrittsbalken (`einstieg-schimmer 1100ms`, `:3587`, 7×). Die Flamme auf Bildschirm 5 wackelt zweimal (`einstieg-flamme … 2`, `:3993`), der Einladen-Puls pulst zweimal. Gemessen per `getAnimations()` (walk.js, S1/S2). Die Runde wurde in 3.17.26 auf „eine Bewegung pro Tipp“ beruhigt, der Einstieg nicht.
- Warum es stört: LEHREN § 6.4: „Eine Bewegung pro Ursache“, „zweifaches Aufleuchten wirkt wie Werbung“. Der Betreiber hat selbst „die energie könnte ein ticken runter“ gesagt. Einstieg und Runde fühlen sich unterschiedlich an.
- Vorschlag: Beim Wählen bleibt nur der Haken (ohne Feder), das Echo schreibt sich weiter auf. `blitz` und `hupf` fallen weg. Der Schimmer im Balken läuft nur beim letzten Schritt (Plan). Flamme und Puls laufen je einmal.
- Entscheidet: Betreiber (er hat „effekte alles hochdingsen“ gewollt und die Animationen gelobt)
- Umsetzung: Haiku
- Abnahme: Nach einem Tipp auf `.einstieg-option` gibt `getAnimations()` höchstens 2 neue Animationen zurück.
- Pro/Contra: Pro: Das ist ruhiger und passt zur Runde seit 3.17.26 und zu LEHREN § 6.4. Das Premium-Gefühl entsteht eher aus Präzision als aus Menge. Contra: Der Betreiber hat die Einstiegs-Bewegungen ausdrücklich gemocht und in die App übernommen haben wollen (3.11.0/3.12.0). Der Einstieg wird nur einmal gesehen, dort ist etwas mehr Ausdruck vertretbar. Empfehlung: Balken-Schimmer und doppelte Wiederholungen streichen (klarer Gewinn). `hupf` auf der Icon-Zeile zur Wahl stellen, den Rest lassen.

#### EINSTIEG-12: Der Hauptknopf steht auf Bildschirm 0 und auf dem Plan an anderer Stelle als sonst
- Art: Verbesserung
- Schwere: niedrig
- Beleg: Gemessen, Oberkante des Hauptknopfs: Bildschirm 0 bei 724 px, Bildschirme 1–6 bei 741 px, Plan bei 776 px (390×844). Auf 360×740 entsprechend 620 / 637 / 672 px. Grund: Die Sperr-Zeile `.einstieg-sperre` gibt es nur auf 1–6 (`app.js:6003–6004`). Auf 0 steht darunter „Ich habe schon ein Konto“, auf dem Plan nichts. Verifiziert.
- Warum es stört: 3.17.1 wollte den Knopf „von Bildschirm zu Bildschirm an derselben Stelle“ halten. Beim ersten „Meinen Plan erstellen“ → „Weiter“ springt er 17 px nach unten, unter den Finger.
- Vorschlag: Den Fußbereich überall gleich hoch machen: die leere Sperr-Zeile auch auf 0 und auf dem Plan reservieren, oder `.einstieg-aktion` eine feste Mindesthöhe geben, bei der der Nebenweg auf 0 innerhalb derselben Höhe liegt.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Die Oberkante des Hauptknopfs ist auf allen Einstiegs-Bildschirmen gleich (±1 px), gemessen mit `walk.js`.

#### EINSTIEG-13: Der Google-Knopf sagt „anmelden“, wo ein Konto angelegt wird
- Art: Verbesserung
- Schwere: niedrig
- Beleg: `app.js:6842` `'<span>Mit Google anmelden</span>'` steht auch im Modus `register` unter „Plan speichern / Konto anlegen“. Foto `handy-dunkel-8auth.png`. Verifiziert.
- Warum es stört: Wer gerade seinen Plan speichern will, liest „anmelden“ und denkt, er brauche schon ein Konto. Das ist eine kleine Abbruchstelle genau an der „Kasse“.
- Vorschlag: Im Modus `register` den Text „Mit Google fortfahren“ zeigen, im Modus `login` „Mit Google anmelden“ lassen. Für Apple (`APPLE_LOGIN_BEREIT`) gilt dasselbe.
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: `renderAuth()` im Modus `register` enthält „Mit Google fortfahren“, im Modus `login` „Mit Google anmelden“.

#### EINSTIEG-14: Vorschlag: Bildschirmwechsel mit der View Transitions API
- Art: Funktion
- Schwere: niedrig
- Beleg: `startViewTransition` kommt in `app.js` nicht vor. Heute läuft jeder Wechsel über `render()` → `app.innerHTML` plus `@keyframes enter-vor/-zurueck` (`styles.css:505–512`). Die Karte von Bildschirm 3 (Probekarte) und die Probe auf Bildschirm 4 zeigen dasselbe Wort an ähnlicher Stelle. Heute verschwindet sie und kommt neu.
- Warum es stört: Nicht störend, aber es gibt eine Lücke im Premium-Gefühl. Zusammengehörige Elemente (Karte → Schriftprobe, Plan → „Plan speichern“, Tab-Wechsel) könnten ineinander übergehen, statt neu einzufliegen.
- Vorschlag: `render()` für den Einstieg in `document.startViewTransition(() => …)` einpacken, wo verfügbar. Probekarte und Schriftprobe bekommen dasselbe `view-transition-name`, der Rest ein kurzes Überblenden. Bei reduzierter Bewegung und ohne API bleibt es wie heute.
- Entscheidet: Betreiber (neue Bewegung, nicht im Plan)
- Umsetzung: Opus
- Abnahme: In Chromium gleitet die Karte von Bildschirm 3 nach 4 (Einzelbilder aus `t_bild.js`). In Safari < 18 und mit `reducedMotion` ist das Verhalten unverändert. `t_sprung.js` bleibt grün.
- Pro/Contra: Pro: Eine native, günstige Bewegung, die Zusammenhang **zeigt** („nur das Neue bewegt sich“, LEHREN § 6.4) und ohne Build-Schritt auskommt. Contra: Safari erst ab 18. Sie läuft doppelt mit den vorhandenen `enter-*`-Keyframes, wenn man diese nicht abschaltet. Sie friert die Seite während des Übergangs ein, Tipps gehen verloren (Doppeltipp-Regel § 6.1). `still-ansicht` und viele Sonderfälle in `render()` müssten mitgedacht werden. Empfehlung: Jetzt nicht bauen. Erst die Liste der Bewegungen beruhigen (EINSTIEG-11). Wenn überhaupt, dann als eng begrenzter Versuch nur zwischen Bildschirm 3 und 4.

#### EINSTIEG-15: Vorschlag: Schriftwahl in die Probekarte legen, ein Bildschirm weniger
- Art: Verbesserung
- Schwere: niedrig
- Beleg: Bis zur ersten Karte sind es heute 8 Einstiegs-Bildschirme, dann der Aufbau (≈ 5,7 s, `EINSTIEG_BAU_*`, `app.js:6048`), dann Konto, Bestätigung, Lernen und das Kartenformular, zusammen 12 Stationen. Bildschirm 4 (Schrift) zeigt dasselbe Wort wie Bildschirm 3 noch einmal (`einstiegProbe`, `app.js:5743`).
- Warum es stört: Hick's Law und „nichts doppelt“: zweimal hintereinander dasselbe Wort auf derselben Fläche. Jeder Bildschirm ist eine Abbruchstelle.
- Vorschlag: Nach dem Bewerten auf Bildschirm 3 die Schrift-Umschaltung (Klein/Normal/Groß) direkt unter die aufgedeckte Karte setzen („Gut lesbar?“). Die Vorauswahl „Groß“ aus der Hürde gilt dort genauso. Bildschirm 4 fällt weg, `EINSTIEG_LETZTER` 7 → 6.
- Entscheidet: Betreiber (Ablauf des Einstiegs)
- Umsetzung: Sonnet
- Abnahme: Der Einstieg hat 7 Bildschirme. `einstiegSchrittSichern` speichert die Vorauswahl weiter. `t_einstieg.js` ist angepasst und grün.
- Pro/Contra: Pro: Ein Bildschirm weniger. Die Wirkung (Schrift ändert sich) steht an der Karte, die man gerade gelernt hat. Der Probelauf wird runder. Contra: Bildschirm 3 wird voller (Karte, Bewertung, Echo, Leiste, Schrift) und passt auf 360 px nicht mehr ohne Scrollen. D2 in `ENTSCHIEDEN.md` nennt die Schriftfrage „stärkste Einlösung“, sie verdient ihren eigenen Moment. Empfehlung: lieber nicht. Wenn gekürzt werden soll, dann zuerst den Aufbau von 5,7 s auf ≈ 4 s, das kostet keine Einlösung.

---

## Stellen, an denen der Betreiber Wortlaut liefern müsste
- Keine neue. Offen bleibt nur, wie bisher dokumentiert: eine mögliche Formel am Ziel „gefestigt“ (LOGBUCH 3.10.3, Punkt 7) und das eigene Wort für die Beispielkarte (`EINSTIEG_BEISPIEL`, Platzhalter كِتَابٌ). Kein Vorschlag des Agenten.

## Geprüft ohne Fund
- Alle Einstiegs-Bildschirme 0–7 plus Aufbau auf 390 und 360 px, hell und dunkel: kein waagerechtes Scrollen, keine Konsolenfehler.
- Pflichtsperre (Ziel, Hürden, Zeitpunkt): Der Knopf sperrt und entsperrt ohne Neuzeichnen, der Hinweistext hat seinen Platz reserviert, Doppeltipp-Sperre 400 ms.
- „Ich habe schon ein Konto“ und „Zurück zum Plan/Einstieg“: Der Stand bleibt erhalten, Merker und Nachklang werden korrekt gesetzt/gelöscht.
- Übernahme der Antworten nur bei neuem Konto: gemessen `settings.arabGroesse = "gross"` im neuen Dokument. Ein Bestandskonto wird nicht überschrieben (P7).
- Ziel und Hürden werden nirgends gespeichert (§ 2.5), gelesen in `einstiegNeu`/`einstiegAntwortenSichern`.
- Nachklang und Start-Liste auf dem leeren Lernen-Bildschirm: Das Versprechen „Jetzt deine erste eigene Karte“ kommt an, „Erste Karte anlegen“ ist der erste Schritt, Code/Datei stehen leise darunter (Fotos `*-9lernen.png`).
- Bestätigungsseite: Der Spam-Hinweis steht fest, still wird alle 5 s und bei `visibilitychange` geprüft, Meldungen stehen unter den Knöpfen.
- Abmelden: Rückfrage, danach Willkommen (so entschieden 3.12.0, nicht wieder einen Gerätemerker vorschlagen).
- Flüssigkeit mit CPU 4×: alle Einstiegs-Schritte ohne Ruckler. Nur beim Übergang zum Aufbau eine Blockade von 71 ms (1 Bild), unkritisch.
- Reduzierte Bewegung im Einstieg: Verzögerungen auf 0, Aufbau übersprungen, keine automatische Kartendrehung, die Übersetzung ist per Tipp erreichbar.
- Tastatur: Tab-Reihenfolge auf 0 (Karte → Weiter → Konto) und 1 (Antworten) sinnvoll. Der Fokus geht beim Wechsel auf die Überschrift, der gesperrte Weiter-Knopf wird übersprungen.
- Hell/Dunkel: Ein neues Konto startet dunkel, auch wenn der Einstieg hell war. Das ist bewusst so (Kommentar 3.10.2) und tritt nur bei einem früheren Konto auf dem Gerät auf. Kein Fund.
- Erster Bereich heißt „Vokabeln“ statt nach dem Ziel benannt: bewusst nicht vorschlagen, das Ziel „Quran und Sunnah“ darf nicht in die Cloud (§ 2.5).
- Serien-Satz auf Bildschirm 5 („Ein ausgelassener Tag reißt sie nicht“) gegen `serieAktuell()` gelesen: Der Joker ist von Anfang an geladen, die Aussage stimmt im Regelfall. Die Rundenlogik selbst gehört nicht in diesen Bereich.

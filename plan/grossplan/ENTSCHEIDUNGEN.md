# Entscheidungen des Betreibers

Stand 25.09.2026. Nach `CLAUDE.md` Grundsatz 1: Zu jeder Frage Argumente
dafür **und** dagegen, ehrlich gewichtet, dann ein Urteil. Ausführlich mit
Belegen im jeweiligen Befund (`befunde/…`).

**So antwortest du:** im Chat einfach die Nummern, z. B. „E-01 ja, E-04 a,
E-10 b, E-16: F-1 und F-2 ja, Rest wie empfohlen". „Wie empfohlen" für alles
geht auch. Die Schleife trägt es hier ein (Spalte „Entschieden") und baut es
in der nächsten Runde.

| Nr | Frage | Empfehlung | Entschieden |
|---|---|---|---|
| E-01 | Passwort mind. 8 Zeichen | ja | – |
| E-02 | „Passwort ändern" in Einstellungen | ja (a), E-Mail ändern erst bei Bedarf | – |
| E-03 | Datenschutzerklärung an den Code angleichen | ja, Wortlaut unten | – |
| E-04 | Rückfall reifer Karten ernster nehmen | ja, Weg (a) | – |
| E-05 | Rundenlimit: dringendste zuerst | ja | – |
| E-06 | Neue Version still beim Zurückkehren laden | ja, ohne sichtbaren Hinweis | – |
| E-07 | „Alles sichern" ehrlich benennen | ja, Weg (b) | – |
| E-08 | Import-Grenze auf 5 000 | ja | – |
| E-09 | Löschen mit „Rückgängig" | ja | – |
| E-10 | Schriftprobe | (b) freigegebenes Wort | – |
| E-11 | Plan: Karten-Wege vor die Leiter | ja | – |
| E-12 | Zurück-Taste im Einstieg | ja, nur Einstieg, mit Gerätetest | – |
| E-13 | Einstieg ruhiger | teilweise (Schimmer + Doppelungen weg) | – |
| E-14 | Regeln per Knopf veröffentlichen | ja, nur mit Emulator-Test davor | – |
| E-15 | App Check | später, vor öffentlicher Werbung | – |
| E-16 | Funktionen/Premium | F-1 und F-2 bauen, Rest siehe `FUNKTIONEN.md` | – |
| E-17 | „Lieber nicht"-Liste bestätigen | bestätigen | – |
| E-18 | Gerätetest Google-Anmeldung | bitte testen | – |

---

### E-01 – Passwort mindestens 8 statt 6 Zeichen (KONTO-5)
- **Dafür:** Deutlich schwerer zu erraten. Standard bei seriösen Apps. Es sind
  drei Zeilen Code plus ein Konsolen-Schalter (K8).
- **Dagegen:** Etwas mehr Reibung beim Registrieren. Die Google-Anmeldung und
  Passwortmanager nehmen den größten Teil davon ab.
- **Urteil: ja, 8 Zeichen, ohne Pflicht zu Sonderzeichen.** Zusammensetzungsregeln
  helfen laut NIST nicht.

### E-02 – Angemeldet das Passwort ändern (KONTO-6)
Heute muss man sich abmelden und „Passwort vergessen" nehmen. Die E-Mail-Adresse
lässt sich gar nicht ändern.
- **(a) „Passwort ändern":** eine Zeile unter Konto, die dieselbe Firebase-Mail
  wie „vergessen" an die eigene Adresse schickt. Kaum Code. Erscheint nur bei
  E-Mail-Konten, nicht bei Google.
- **(b) „E-Mail ändern":** Neu-Anmeldung, dann Bestätigung an die neue Adresse.
  Die alte Adresse bekommt eine Mail zum Rückgängigmachen.
- **Dafür:** schließt eine echte Lücke. (b) löst auch eine Berichtigung nach DSGVO.
- **Dagegen:** eine Zeile mehr. (b) ist sicherheitskritisch (Konto-Übernahme,
  wenn falsch gebaut), der Bedarf bei wenigen Konten ist klein.
- **Urteil: (a) jetzt, (b) erst, wenn jemand danach fragt.**

### E-03 – Datenschutzerklärung an den Code angleichen (Rechtstext)
Drei Prüfer haben unabhängig gefunden: Die Erklärung sagt „auf deinem Gerät
bleiben nur ein paar Einstellungen". Tatsächlich hält der Browser eine **Kopie
aller Lerninhalte** (für offline). Sie bleibt nach dem Abmelden liegen.
Außerdem fehlen: die Adresse des Google-Profilbilds (legt Firebase ab),
Registrierungs- und Anmeldezeitpunkt, die Ausnahmen „Teilen per Code" und
„Board" bei „nur die eigenen Daten", und dass jeder mit dem Code die
Konto-Kennung im geteilten Satz sieht.

Vorgeschlagener Wortlaut, zum Prüfen durch Dich bzw. den Anwalt (`LEHREN.md`
§ 12, keine Rechtsberatung):
- „Kurz gesagt" und Punkt 7/10: *„Damit die App offline funktioniert, hält dein
  Browser eine Kopie deiner Lerninhalte im Gerätespeicher (IndexedDB). Sie
  bleibt nach dem Abmelden erhalten, bis du die Website-Daten im Browser
  löschst."*
- Punkt 4: *„… sowie die Adresse deines Google-Profilbilds, die diese App nicht
  verwendet, und die Zeitpunkte deiner Registrierung und letzten Anmeldung."*
- Punkt 14: *„… ausschließlich an die eigenen Daten, mit den Ausnahmen aus Punkt 5
  und 6."*
- Punkt 5: *„Wer den Code hat, sieht auch diese Kennung."*
- **Dafür:** Die Erklärung stimmt dann mit dem Code. Genau die Lehre vom
  24.09. (§ 15).
- **Dagegen:** etwas längerer Text.
- **Urteil: ja.** Die Technik bleibt (Offline-Lernen hängt an der Kopie). Das
  Löschen beim Abmelden wäre ein eigener, riskanter Schritt: Offline Gelerntes,
  das noch nicht hochgeladen ist, ginge verloren. Das lieber nicht.

### E-04 – Rückfall reifer Karten (LERNEN-2, Lernlogik)
Gemessen: Eine Karte auf der höchsten Stufe, heute vergessen („Nicht"), dann in
derselben Runde „Sicher", kommt erst nach **164 Tagen** wieder. Ab Stufe 10
bleibt ein Rückfall praktisch folgenlos.
- **(a)** Das „Sicher" direkt nach einem „Nicht" in derselben Runde hebt die
  Stufe nicht an. Die Karte bleibt auf der Stufe nach dem Rückfall.
- **(b)** Ein Rückfall setzt mindestens unter die höchsten Stufen zurück.
- **Dafür:** Jede verbreitete Methode behandelt einen Rückfall bei reifen Karten
  härter. Keine Zahl wird sichtbar (§ 3.5), es ändert sich nur, *wann* die Karte
  kommt.
- **Dagegen:** nach einem Rückfall ein paar Wiederholungen mehr. Ein einmaliger
  „Aussetzer" kommt früher zurück.
- **Urteil: (a)** – kleinste Änderung, wirkt genau dort, wo das Problem ist.

### E-05 – Rundenlimit nimmt die dringendsten (LERNEN-4, Lernlogik)
Der Code-Kommentar verspricht „die 10 dringendsten", tatsächlich kommen die
obersten der Liste. Gemessen: 20–58 Tage überfällige Karten kamen bei Limit 10
nie dran.
- **Dafür:** stellt her, was der Code zusagt. Alte Karten bleiben nicht
  dauerhaft liegen.
- **Dagegen:** Nach einer Pause kommen zuerst die am längsten vergessenen, also
  schwersten. Das kann entmutigen.
- **Urteil: ja.**

### E-06 – Neue Version erreicht offene Apps (TECHNIK-3)
Eine Home-Bildschirm-App bleibt oft tagelang offen und lädt nie neu. Fehler-
behebungen kommen dann erst an, wenn die App ganz geschlossen wurde.
- **Dafür:** Behebungen erreichen alle innerhalb von Stunden.
- **Dagegen:** Ein sichtbarer Hinweis wäre ein Element mehr. Stilles Neuladen
  könnte einen halb getippten Entwurf kosten.
- **Urteil: still neu laden, nur beim Zurückkehren in die App**, nie während
  einer Runde oder mit offenem Blatt. Kein sichtbarer Hinweis.

### E-07 – „Alles sichern" (DATEN-8)
Die Sicherung enthält Karten und Stufen, aber nicht Serie, Kalender und
Einstellungen. Der Text sagt „Alles" und „das Einzige, was bleibt".
- **(a)** Serie/Kalender mitsichern, nur in ein leeres Konto einspielen.
  Dagegen: Eine Serie ließe sich mit einer bearbeiteten Datei fälschen, das
  berührt die Serie (Lernlogik), der Umfang ist größer.
- **(b)** Ehrlich benennen: „Karten sichern", Satz „Serie und Kalender sind
  nicht enthalten". Dagegen: Der Verlust bleibt.
- **Urteil: (b) jetzt, (a) nur, wenn jemand danach fragt.**

### E-08 – Import-Grenze (DATEN-11)
Heute dürfen 20 000 Karten auf einmal eingespielt werden. Das ist genau das
kostenlose Tages-Schreibkontingent des **ganzen** Projekts.
- **Dafür:** schützt Kontingent und Kosten. Echte Sicherungen sind weit
  kleiner.
- **Dagegen:** Wer wirklich mehr als 5 000 Karten hat, spielt in Teilen ein.
- **Urteil: ja, 5 000, dazu die Budget-Warnung (K6).**

### E-09 – Gelöschte Karten zurückholen (DATEN-12)
- **Dafür:** Eine Rückfrage klickt man weg, ein „Rückgängig" schützt, wo es
  wirkt. Die Rückfrage bei einer Einzelkarte könnte dann entfallen (weniger
  Dialoge).
- **Dagegen:** kein echter Papierkorb (nach 8 s endgültig). Der Knopf braucht
  reservierten Platz, damit nichts springt (§ 6.1).
- **Urteil: ja, als Kurzmeldung mit „Rückgängig". Rückfrage bei Mehrfachauswahl
  bleibt.**

### E-10 – Schriftprobe in den Einstellungen (REST-14, Religion)
Das Wahl-Blatt „Arabische Schrift" zeigt die Basmala als Größenprobe. Im Repo
ist keine Freigabe dieses Wortlauts zu finden, vermutlich hat ein Agent sie
gewählt. Nach § 2 wählt kein Agent religiöse Inhalte.
- **(a) Basmala bleibt:** zeigt Harakat, Schadda, Alif Wasla. Dagegen: Ein
  heiliger Text als Testmuster kann unangemessen wirken.
- **(b) كِتَابٌ** (schon freigegeben) oder das erste Wort der eigenen Karten.
- **Urteil: (b).** Deine Entscheidung, weil es Religion berührt.

### E-11 – Plan-Bildschirm im Einstieg (EINSTIEG-1)
Die beiden Wege („Selbst anlegen", „Kartensatz per Code") stehen so tief, dass
sie hinter dem festen Knopf liegen. Gerade der Code-Weg ist wegen Deines
TikTok-Befunds dort.
- **Dafür:** Die Wege werden gesehen, und nichts steht doppelt.
- **Dagegen:** Du hast den Plan „soo tuff" genannt. Umstellen kann das Wertgefühl
  mindern.
- **Urteil: Leiter bleibt, die Wege rücken vor die Leiter, der doppelte Satz
  fällt weg.**

### E-12 – Zurück-Taste im Einstieg (EINSTIEG-9)
Heute fängt die App die Zurück-Geste nicht ab. Vermutlich schließt sie die App
mitten im Einstieg, und alle Antworten sind weg (am Gerät zu prüfen).
- **Dafür:** Das erwartet jeder am Handy.
- **Dagegen:** Es gab schon einen Fehler mit Zurück und Rechtsseiten. Neue
  Verlaufseinträge können Nebenwirkungen haben und sind am Gerät schwer zu
  testen.
- **Urteil: ja, eng auf den Einstieg begrenzt, eigener Commit, Gerätetest.**
  Blätter erst danach.

### E-13 – Einstieg ruhiger (EINSTIEG-11)
Jede Wahl löst vier Bewegungen gleichzeitig aus. Die Runde wurde in 3.17.26
auf „eine Bewegung je Tipp" beruhigt, der Einstieg nicht.
- **Dafür:** passt zur Runde und zu „Energie ein Ticken runter".
- **Dagegen:** Du hast die Einstiegs-Bewegungen ausdrücklich gemocht. Der
  Einstieg wird nur einmal gesehen.
- **Urteil: teilweise.** Balken-Schimmer bei jedem Schritt und doppelte
  Wiederholungen weg. Der Rest bleibt.

### E-14 – Regeln per GitHub-Knopf (TECHNIK-15)
- **Dafür:** Regeln und Code lassen sich von jedem Gerät im selben Schritt
  veröffentlichen. Die Lücke „Regel nicht deployt" (mehrere Vorfälle) wird
  kleiner.
- **Dagegen:** ein Knopf mit mehr Rechten. Das Dienstkonto braucht eine
  weitere Rolle.
- **Urteil: ja, aber nur mit Emulator-Test davor, der bei Rot abbricht.**

### E-15 – App Check (REGELN-5)
- **Dafür:** Das ist der einzige Schutz gegen Skripte, die massenhaft Konten
  oder Einträge anlegen.
- **Dagegen:** ein Fremddienst (reCAPTCHA, IP an Google), CSP-Einträge, ein
  Absatz in der Datenschutzerklärung, und falsch eingerichtet sperrt es alle
  aus.
- **Urteil: später, vor öffentlicher Werbung.** Der Regelteil der Mengenbremse
  (G-016) kommt jetzt.

### E-16 – Funktionen und Premium
Siehe [`FUNKTIONEN.md`](FUNKTIONEN.md).
**Urteil:** F-1 (Liste einfügen) und F-2 (ohne Harakat abfragen) bauen. F-5
(zweite Richtung) als nächstes großes Vorhaben mit eigenem Konzept. Premium erst
nach der Rechtsfrage (minderjähriger Inhaber), dann F-7 → F-6 → F-4.
Lieber nicht: F-13 bis F-20.

### E-17 – „Lieber nicht" bestätigen
Jeweils mit Begründung im Befund:
- Kommentare beim Deploy entfernen (TECHNIK-20): Die Messwerte sind gut, und es
  widerspricht „kein Build-Schritt".
- Installations-Fotos (TECHNIK-21): erst mit Phase 6.
- View Transitions (EINSTIEG-14): friert Tipps ein, doppelt mit vorhandenen
  Bewegungen.
- Schriftwahl in die Probekarte (EINSTIEG-15): Bildschirm 3 würde zu voll.
- Wochenziel (REST-15): zweite Kennzahl neben der Serie.
- Push-Erinnerung (REST-16): braucht einen Server.
- Offline-Zeitstempel je Bewertung (LERNEN-11): Nutzen klein, Regeln und
  Deploy nötig.
- Mehrfachbearbeitung (DATEN-18): nur „Aus Speicherkarte nehmen" im Blatt,
  sonst nicht.

**Urteil: bestätigen.** Wer eins davon doch will, nennt es.

### E-18 – Gerätetest Google-Anmeldung (KONTO-9)
Der Code verlässt sich auf ein Verhalten von `signInWithPopup` auf iOS, das es so
nicht gibt. Aus Home-Bildschirm-Apps sind hängende Popups bekannt. Bitte am
iPhone testen, einmal vom Home-Bildschirm und einmal im Safari-Tab: abgemeldet →
„Mit Google anmelden". Erwartet wird, dass man nach etwa 10 s angemeldet in der
App ist. Ergebnis mit iOS-Version in den Chat. Klappt es, wird nur der Kommentar
berichtigt. Klappt es nicht, baut Opus einen Weiterleitungs-Weg nur für die
installierte App.

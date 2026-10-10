# Council-Transkript: Tempo-Sperre, 10.10.2026

## Auftrag und neutrale Frage

Betreiber: Grenze auf Angemessenheit prüfen; verbrauchten Nutzungsrahmen ohne Fix beanstandet; anschließend „weiter“.
Frage: Wie mit der bisherigen Tempo-Abnahmesperre umgehen, ohne unbelegte Qualitätsbehauptungen oder unbegrenzte Diagnosearbeit?

Adrabic-Datenentwurf3.18.30:157/158 Tests grün,13Runden/238Rules/2Zufallsläufe grün. Einziger Fehler maximaler Longtask>200ms unter CDP CPU4x/ChromeWindows. Agent setzte200ms am30.09. ohne dokumentierte Geräteherleitung; Konzept nennt50ms/Bild. INP200ms ist andere Metrik. Alte+neue App in vorhandenen A/B gleichermaßen schwankend/rot; keine belastbare Regression belegt, keine Gleichwertigkeit bewiesen. Viele Diagnosevarianten ohne Fix. Betreiber kritisiert Nutzungsbudget, fragt Grenze regulierbar; weiter beauftragt Ausarbeitung, keine ausdrückliche neue Grenzwert-/Abschlussfreigabe. Entwurf erhalten, kein Deploy/neues Paket. Optionen: Sperre behalten; feste Grenze kalibrieren; absolute Messung als Warnbefund, Abschluss anhand klarer Regression-/Nutzungsprüfung separat entscheiden. Keine neue Zahl erfinden oder Mehrheit als Freigabe.

## Quellen des Hauptagenten

- plan/werkzeuge/pruefstand/t_text_tempo.js und git-Herkunft 7264af9a vom 30.09.
- plan/texte-lernen/KONZEPT.md § 13 und LOGBUCH.md.
- plan/zyklus-2/TEXT-TEMPO-BEFUND-2026-10-10.md.
- plan/zyklus-2/DATEN-ABNAHME-3.18.30-2026-10-10.md.
- plan/ENTSCHEIDUNGEN-VERSTEHEN.md, CODEX-START.md und aktueller Stand.
- https://web.dev/articles/inp (bereits vor Council gelesen).
- .agents/skills/llm-council/SKILL.md.

Berater bekamen denselben neutralen Brief, jeweils eine Rollenperspektive, maximal 100 Wörter, keine fremden Antworten und keine Änderungsaufträge.
Prüfer lasen ausschließlich tempo-2026-10-10-gegenpruefung.md mit dem Brief und allen anonymisierten Antworten, maximal 100 Wörter. Keine fremden Prüfantworten.

## Tatsächliche Agenten und Modelle

Hauptagent /root; fünf getrennte Berater /root/tempo_a bis /root/tempo_e;
fünf frische Prüfer /root/tempo_review_a bis /root/tempo_review_e.
Alle mit fork_turns=none, ohne Modelloverride. Konkrete Modellkennung der Unteragenten wurde durch die Spawn-Ergebnisse nicht ausgewiesen; keine verschiedenen Modelle behauptet.
Slotgrenze: zuerst drei, danach zwei. Gemeinsame Vorgaben und gleiche Modellfamilie sind Grenzen der Unabhängigkeit.

## Fünf vollständige Beraterantworten

### /root/tempo_a – Gegenprüfer

Empfehlung: Den absoluten Longtask-Wert vorläufig als offenen Warnbefund führen; einen Abschluss erst nach verständlicher Betreiberentscheidung und klarer Regression-/Nutzungsprüfung erlauben.
Stärkstes Argument: Eine nicht hergeleitete 200-ms-Grenze blockiert derzeit, obwohl die A/B-Messung keine belastbare Verschlechterung zeigt.
Gegenargument: Die Schwankungen könnten eine echte Verschlechterung verdecken; „keine Regression nachgewiesen“ bedeutet keine Gleichwertigkeit.
Beleggrenze: Grüne Daten- und Rules-Tests belegen keine flüssige Bedienung. INP begründet diesen Longtask-Grenzwert nicht.
Kleinster nächster Schritt: Die konkrete Abschlussregel mit einem Bedienbeispiel, Prüfbedingungen und begrenztem Prüfaufwand ausarbeiten und dem Betreiber zur Entscheidung vorlegen. Bis dahin bleibt der Abschluss gesperrt.

### /root/tempo_b – Grundproblem

Empfehlung: Den absoluten Longtask-Befund als Warnung führen und die Abschlussentscheidung getrennt anhand einer nachvollziehbaren Regression- und Nutzungsprüfung vorbereiten. Bis zur Betreiberentscheidung bleibt die bestehende Sperre bestehen.
Stärkstes Argument: Eine unbegründete Schwelle misst unter künstlicher Drosselung keinen nachgewiesenen Produktfehler; weitere Varianten verbrauchen Budget ohne klare Erkenntnisfrage.
Gegenargument: Ein Warnstatus könnte echte Bedienungsprobleme verdecken und eine bisher verbindliche Prüfung abschwächen.
Beleggrenze: Die bisherigen A/B-Läufe beweisen weder Regression noch Gleichwertigkeit.
Kleinster nächster Schritt: Eine kurze Entscheidungsvorlage mit einem konkreten Bedienablauf, vorhandenen A/B-Belegen und den Folgen jeder Option erstellen; keine neue Zahl und keinen roten Abschluss eigenmächtig freigeben.

### /root/tempo_c – Nutzen

Empfehlung: Die absolute Longtask-Messung als Warnbefund führen und den Produktabschluss getrennt anhand einer vorher verständlich vereinbarten Regression- und Nutzungsprüfung entscheiden.
Nutzen: So fließt das verbleibende Budget in die Frage, ob die Änderung die Bedienung spürbar verschlechtert. Weitere Diagnosevarianten ohne Entscheidungskriterium helfen wenig.
Gegenargument: Eine getrennte Prüfung könnte echte Verzögerungen übersehen; der Warnbefund muss sichtbar bleiben.
Beleggrenze: Schwankende A/B-Ergebnisse beweisen weder Regression noch Gleichwertigkeit. Die grünen Funktionstests beantworten die Bedienungsfrage nicht.
Kleinster nächster Schritt: Ein kurzes Abnahmekriterium mit identischen Alt-/Neu-Nutzungsschritten und Vorgehen bei unklarem Ergebnis ausarbeiten und dem Betreiber verständlich vorlegen.

### /root/tempo_d – Außenstehender

Empfehlung: Die absolute Longtask-Messung vorläufig als Warnbefund behandeln; einen Abschluss separat anhand einer begrenzten Regression- und Nutzungsprüfung vorbereiten. Der Entwurf bleibt erhalten.
Stärkstes Argument: Eine unbegründete Grenze sollte weitere Arbeit nicht unbegrenzt erzwingen, wenn auch die alte App daran scheitert.
Gegenargument: Gleichermaßen rote Messungen können ein echtes Nutzungsproblem verdecken; Gleichwertigkeit ist nicht bewiesen.
Beleggrenze: Die grünen Tests belegen Datenverhalten, keine flüssige Bedienung.
Kleinster nächster Schritt: Dem Betreiber an einem konkreten Bedienbeispiel erklären, was die drei Optionen bedeuten, und eine begrenzte Prüfung zur Auswahl vorlegen. Grenzwertänderung und Abschluss benötigen eine verständliche Einzelfreigabe.

### /root/tempo_e – Umsetzer

Empfehlung: Die absolute Longtask-Messung als Warnbefund behandeln; den Abschluss separat anhand einer belastbaren Vergleichsprüfung und einer klaren Betreiberentscheidung beurteilen.
Stärkstes Argument: Eine unbegründete Sperre verursacht weitere Arbeit, ohne eine Verschlechterung nachzuweisen. Gegenargument: Gleiches Rot bei beiden Versionen kann gemeinsame Nutzungsprobleme verdecken.
Beleggrenze: Die grünen Prüfungen belegen geprüfte Datenfunktionen; sie beweisen weder flüssige Bedienung noch Gleichwertigkeit.
Kleinster nächster Schritt: Vorhandene A/B-Ergebnisse samt Messbedingungen knapp gegenüberstellen und eine konkrete Änderung der Prüfregel zur Entscheidung vorlegen. Bis dahin Entwurf erhalten und Sperre formal unverändert lassen.

## Zufällige anonymisierte Zuordnung

A = /root/tempo_a (Gegenprüfer)

B = /root/tempo_d (Außenstehender)

C = /root/tempo_c (Nutzen)

D = /root/tempo_e (Umsetzer)

E = /root/tempo_b (Grundproblem)

Rollen und Agentennamen standen nicht in der Datei für die Gegenprüfung. Schreibstil kann trotzdem eine Rolle verraten.

## Fünf vollständige Gegenprüfungen

### /root/tempo_review_a

Stärkste Begründung: Die unbegründete 200-ms-Sperre rechtfertigt keine endlose Diagnose; schwankendes Rot beider Versionen belegt keine Regression.
Größte Beleglücke: Es fehlt eine nachvollziehbare Nutzungsprüfung auf einem relevanten Gerät; Gleichwertigkeit bleibt unbewiesen.
Gemeinsam übersehen: Das Konzept nennt 50 ms/Bild. Keine Antwort klärt, welchen Bedienanspruch diese Vorgabe beschreibt und wie er zur vorgeschlagenen Abschlussregel passt.
Empfehlung: Eine kurze Entscheidungsvorlage ausarbeiten: konkreter Bedienablauf, passende Messgröße, Gerätebedingungen, begrenzter Prüfaufwand und Vorgehen bei unklarem Ergebnis. Erst danach verständliche Einzelfreigabe einholen. Entwurf erhalten; bestehende Sperre bis dahin unverändert lassen. Einstimmigkeit ersetzt weder Beleg noch Freigabe.

### /root/tempo_review_b

Stärkste Begründung: Eine unbegründete Schwelle kann den Abschluss nicht sachlich tragen, wenn auch die alte App daran scheitert. Größte Beleglücke: Die schwankenden Vergleiche belegen weder Gleichwertigkeit noch tatsächliche Bedienbarkeit. Gemeinsam übersehen: Selbst nachgewiesene Gleichwertigkeit könnte ein bereits bestehendes, unzumutbares Bedienungsproblem fortschreiben; Regression und absolute Nutzbarkeit brauchen getrennte Kriterien. Empfehlung: Einen konkreten Bedienablauf, relevante Gerätebedingungen, begrenzten Prüfaufwand und die Konsequenz eines unklaren Ergebnisses vorab verständlich vereinbaren. Bis zur ausdrücklichen Betreiberentscheidung bleibt die Sperre bestehen; die fünf ähnlichen Empfehlungen ersetzen keine Freigabe.

### /root/tempo_review_c

Stärkste Begründung: Eine nicht hergeleitete Schwelle rechtfertigt keine unbegrenzte Diagnosearbeit; alte und neue App scheitern daran gleichermaßen.
Größte Beleglücke: Die schwankenden Vergleiche beweisen weder Gleichwertigkeit noch brauchbare Bedienung.
Gemeinsam übersehen: Eine Änderung kann gegenüber einer bereits langsamen Vorgängerversion unauffällig bleiben und trotzdem unzumutbar sein. Regression und absolute Nutzbarkeit brauchen deshalb getrennte Kriterien.
Empfehlung: Eine begrenzte Prüfung konkreter Bedienabläufe ausarbeiten, einschließlich Vorgehen bei unklarem Ergebnis und erkennbarem Nutzungsproblem. Dem Betreiber Folgen und Restunsicherheit verständlich vorlegen. Bis zur Einzelfreigabe bleibt die Sperre bestehen; die Übereinstimmung der Antworten ersetzt keinen Beleg.

### /root/tempo_review_d

Stärkste Begründung: Die unbegründete Schwelle rechtfertigt keine unbegrenzte Diagnosearbeit; auch die alte App scheitert schwankend daran.
Größte Beleglücke: Es fehlen belastbare Belege für Gleichwertigkeit und tatsächliche Bedienbarkeit.
Gemeinsam übersehen: Selbst nachgewiesene Gleichwertigkeit reicht nicht, wenn beide Versionen dieselbe störende Verzögerung zeigen. Die Nutzungsprüfung braucht deshalb ein eigenständiges Akzeptanzkriterium.
Empfehlung: Eine begrenzte Prüfung mit identischen Bedienabläufen, begründeten Gerätebedingungen und vorab festgelegtem Umgang mit unklaren Ergebnissen ausarbeiten. Vergleich und absolute Bedienbarkeit getrennt beurteilen. Bis zur verständlichen Betreiberentscheidung bleiben Entwurf und Sperre erhalten; Einigkeit der Berater ersetzt keine Freigabe.

### /root/tempo_review_e

Stärkste Begründung: Die unbegründete 200-ms-Schwelle rechtfertigt keine endlose Diagnose; gleiche rote Alt-/Neu-Messungen belegen keine Regression.
Größte Beleglücke: Weder Gleichwertigkeit noch akzeptable Bedienung auf tatsächlichen Nutzergeräten sind nachgewiesen.
Gemeinsam übersehen: Auch eine unveränderte alte Verzögerung kann unzumutbar sein. Eine reine Regressionsprüfung reicht deshalb nicht; die Nutzungsprüfung braucht ein eigenständiges, verständliches Akzeptanzkriterium.
Empfehlung: Einen konkreten Bedienablauf, relevante Gerätebedingungen, begrenzten Prüfaufwand und den Umgang mit unklaren Ergebnissen vorab festlegen. Die bestehende Sperre bleibt bis zur verständlichen Betreiberentscheidung bestehen. Die Übereinstimmung der Antworten ersetzt keine Freigabe.

## Synthese des Hauptagenten

Die dokumentierte Herkunft trägt keine genau auf diesen Laptop bezogene 200-ms-Longtask-Sperre. Daraus folgt weder eine höhere richtige Zahl noch ein Tempo-Fix. Besonders gewichtig ist die Gegenprüfung: Selbst nachgewiesene Gleichwertigkeit kann gemeinsame schlechte Bedienbarkeit bewahren; der 50-ms/Bild-Anspruch bleibt ebenfalls offen.

Die Entscheidungsvorlage unterscheidet daher eine echte neue Tempo-Abnahme von einer ausdrücklichen, begrenzten Risikoentscheidung über bereits geprüfte Datenkorrekturen. Empfohlen wird eine solche Ausnahme für A14–A17/3.18.30, sofern der Betreiber die Unsicherheit versteht und akzeptiert. Dies geht über eine technische Vergleichsfreigabe hinaus: Es beansprucht ausdrücklich keinen Gleichwertigkeitsnachweis. Der Originaltest bleibt rot und unverändert; Tempo bleibt offen, Veröffentlichung ausgeschlossen. Bis zur Einzelfreigabe bleibt die bestehende Abschlusssperre bestehen.

Neue Tempo-Prüfungen erfordern vorab Bedienablauf, relevante Geräte, passende Messgrößen, begrenzten Aufwand und Umgang mit unklarem Ergebnis. Keine neue Messung wurde für den Council gestartet. Berater und Prüfer liefern Argumente, keine unabhängigen Gerätebelege. Die Empfehlung beruht auf nachvollziehbaren Grenzen und dem Betreiberwunsch nach begrenztem Aufwand, nicht auf Stimmenzahlen.

## Konkretes Ergebnis

Siehe TEMPO-ENTSCHEIDUNG-2026-10-10.md. Noch keine Einzelfreigabe, kein neuer Lauf, keine Testgrenze geändert und kein Produktabschluss.


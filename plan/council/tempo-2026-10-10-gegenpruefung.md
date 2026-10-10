# Anonymisierte Gegenprüfung: Tempo-Abnahme

Adrabic-Datenentwurf3.18.30:157/158 Tests grün,13Runden/238Rules/2Zufallsläufe grün. Einziger Fehler maximaler Longtask>200ms unter CDP CPU4x/ChromeWindows. Agent setzte200ms am30.09. ohne dokumentierte Geräteherleitung; Konzept nennt50ms/Bild. INP200ms ist andere Metrik. Alte+neue App in vorhandenen A/B gleichermaßen schwankend/rot; keine belastbare Regression belegt, keine Gleichwertigkeit bewiesen. Viele Diagnosevarianten ohne Fix. Betreiber kritisiert Nutzungsbudget, fragt Grenze regulierbar; weiter beauftragt Ausarbeitung, keine ausdrückliche neue Grenzwert-/Abschlussfreigabe. Entwurf erhalten, kein Deploy/neues Paket. Optionen: Sperre behalten; feste Grenze kalibrieren; absolute Messung als Warnbefund, Abschluss anhand klarer Regression-/Nutzungsprüfung separat entscheiden. Keine neue Zahl erfinden oder Mehrheit als Freigabe.

## A

Empfehlung: Den absoluten Longtask-Wert vorläufig als offenen Warnbefund führen; einen Abschluss erst nach verständlicher Betreiberentscheidung und klarer Regression-/Nutzungsprüfung erlauben.
Stärkstes Argument: Eine nicht hergeleitete 200-ms-Grenze blockiert derzeit, obwohl die A/B-Messung keine belastbare Verschlechterung zeigt.
Gegenargument: Die Schwankungen könnten eine echte Verschlechterung verdecken; „keine Regression nachgewiesen“ bedeutet keine Gleichwertigkeit.
Beleggrenze: Grüne Daten- und Rules-Tests belegen keine flüssige Bedienung. INP begründet diesen Longtask-Grenzwert nicht.
Kleinster nächster Schritt: Die konkrete Abschlussregel mit einem Bedienbeispiel, Prüfbedingungen und begrenztem Prüfaufwand ausarbeiten und dem Betreiber zur Entscheidung vorlegen. Bis dahin bleibt der Abschluss gesperrt.

## B

Empfehlung: Die absolute Longtask-Messung vorläufig als Warnbefund behandeln; einen Abschluss separat anhand einer begrenzten Regression- und Nutzungsprüfung vorbereiten. Der Entwurf bleibt erhalten.
Stärkstes Argument: Eine unbegründete Grenze sollte weitere Arbeit nicht unbegrenzt erzwingen, wenn auch die alte App daran scheitert.
Gegenargument: Gleichermaßen rote Messungen können ein echtes Nutzungsproblem verdecken; Gleichwertigkeit ist nicht bewiesen.
Beleggrenze: Die grünen Tests belegen Datenverhalten, keine flüssige Bedienung.
Kleinster nächster Schritt: Dem Betreiber an einem konkreten Bedienbeispiel erklären, was die drei Optionen bedeuten, und eine begrenzte Prüfung zur Auswahl vorlegen. Grenzwertänderung und Abschluss benötigen eine verständliche Einzelfreigabe.

## C

Empfehlung: Die absolute Longtask-Messung als Warnbefund führen und den Produktabschluss getrennt anhand einer vorher verständlich vereinbarten Regression- und Nutzungsprüfung entscheiden.
Nutzen: So fließt das verbleibende Budget in die Frage, ob die Änderung die Bedienung spürbar verschlechtert. Weitere Diagnosevarianten ohne Entscheidungskriterium helfen wenig.
Gegenargument: Eine getrennte Prüfung könnte echte Verzögerungen übersehen; der Warnbefund muss sichtbar bleiben.
Beleggrenze: Schwankende A/B-Ergebnisse beweisen weder Regression noch Gleichwertigkeit. Die grünen Funktionstests beantworten die Bedienungsfrage nicht.
Kleinster nächster Schritt: Ein kurzes Abnahmekriterium mit identischen Alt-/Neu-Nutzungsschritten und Vorgehen bei unklarem Ergebnis ausarbeiten und dem Betreiber verständlich vorlegen.

## D

Empfehlung: Die absolute Longtask-Messung als Warnbefund behandeln; den Abschluss separat anhand einer belastbaren Vergleichsprüfung und einer klaren Betreiberentscheidung beurteilen.
Stärkstes Argument: Eine unbegründete Sperre verursacht weitere Arbeit, ohne eine Verschlechterung nachzuweisen. Gegenargument: Gleiches Rot bei beiden Versionen kann gemeinsame Nutzungsprobleme verdecken.
Beleggrenze: Die grünen Prüfungen belegen geprüfte Datenfunktionen; sie beweisen weder flüssige Bedienung noch Gleichwertigkeit.
Kleinster nächster Schritt: Vorhandene A/B-Ergebnisse samt Messbedingungen knapp gegenüberstellen und eine konkrete Änderung der Prüfregel zur Entscheidung vorlegen. Bis dahin Entwurf erhalten und Sperre formal unverändert lassen.

## E

Empfehlung: Den absoluten Longtask-Befund als Warnung führen und die Abschlussentscheidung getrennt anhand einer nachvollziehbaren Regression- und Nutzungsprüfung vorbereiten. Bis zur Betreiberentscheidung bleibt die bestehende Sperre bestehen.
Stärkstes Argument: Eine unbegründete Schwelle misst unter künstlicher Drosselung keinen nachgewiesenen Produktfehler; weitere Varianten verbrauchen Budget ohne klare Erkenntnisfrage.
Gegenargument: Ein Warnstatus könnte echte Bedienungsprobleme verdecken und eine bisher verbindliche Prüfung abschwächen.
Beleggrenze: Die bisherigen A/B-Läufe beweisen weder Regression noch Gleichwertigkeit.
Kleinster nächster Schritt: Eine kurze Entscheidungsvorlage mit einem konkreten Bedienablauf, vorhandenen A/B-Belegen und den Folgen jeder Option erstellen; keine neue Zahl und keinen roten Abschluss eigenmächtig freigeben.


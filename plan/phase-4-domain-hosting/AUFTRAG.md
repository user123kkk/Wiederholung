# Phase 4 — Domain und Hosting

Status: `läuft`
Gehört zu: [`../PLAN.md`](../PLAN.md)
Setzt voraus: Phase 3 (`fertig`) · offene Frage 1 aus `../PLAN.md` — **geklärt
am 12.09.2026: Firebase Hosting, vorerst keine eigene Domain**

---

## Warum an dieser Stelle

Security-Header sind erst mit richtigem Hosting einstellbar: auf GitHub Pages
kaum. Die Header sind damit keine eigene Aufgabe, sondern eine Folge der
Hosting-Entscheidung. Alles, was danach kommt (Recht, Startseite, SEO), braucht
die Adresse, die hier entsteht.

## Was getan wird

1. **Hosting einrichten** gemäß der Entscheidung zu offener Frage 1.
2. **Domain aufschalten**, HTTPS erzwingen und nachweisen. Trifft vorerst
   **nicht zu** — der Betreiber hat sich am 12.09.2026 ausdrücklich gegen eine
   eigene Domain entschieden, für jetzt reicht die von Firebase vergebene
   Adresse (`lernkarte-925c2.web.app` / `.firebaseapp.com`). Eine eigene
   Domain ist für später vorgemerkt (`../PLAN.md`, „Später"). HTTPS erzwingen
   und nachweisen bleibt bestehen, gilt dann für die Firebase-Adresse.
3. **Security-Header** setzen, soweit das gewählte Hosting sie erlaubt: CSP,
   HSTS und die üblichen weiteren. Was nicht geht, wird als „geht hier nicht"
   mit Grund festgehalten.
4. **Übergabe aus Phase 3:** den Firebase-API-Key in der Google-Cloud-Konsole
   auf die jetzt bekannte Domain einschränken.
5. Prüfen, dass der Service Worker und die App-Hülle unter der neuen Adresse
   unverändert laufen.

## Was ausdrücklich **nicht** getan wird

- Keine Inhalte. Die öffentliche Startseite ist Phase 6.
- Keine Rechtstexte. Das ist Phase 5.
- Kein Datenbank-Upgrade und kein App Check — „später".

## Woran diese Phase fertig ist

1. Die App ist unter der endgültigen Adresse über HTTPS erreichbar.
2. Die gesetzten Header sind überprüft; die nicht möglichen sind mit Grund
   notiert.
3. Der API-Key ist auf die Domain eingeschränkt und die App läuft danach noch.
4. `LOGBUCH.md` geführt, `../PLAN.md` auf `fertig` gesetzt.

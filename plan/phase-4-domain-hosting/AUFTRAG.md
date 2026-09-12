# Phase 4 — Domain und Hosting

Status: `offen`
Gehört zu: [`../PLAN.md`](../PLAN.md)
Setzt voraus: Phase 3 (`fertig`) · **offene Frage 1 aus `../PLAN.md` muss
beantwortet sein** — ohne Hosting-Entscheidung ist diese Phase nicht zu beginnen

---

## Warum an dieser Stelle

Security-Header sind erst mit richtigem Hosting einstellbar: auf GitHub Pages
kaum. Die Header sind damit keine eigene Aufgabe, sondern eine Folge der
Hosting-Entscheidung. Alles, was danach kommt (Recht, Startseite, SEO), braucht
die Adresse, die hier entsteht.

## Was getan wird

1. **Hosting einrichten** gemäß der Entscheidung zu offener Frage 1.
2. **Domain aufschalten**, HTTPS erzwingen und nachweisen.
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

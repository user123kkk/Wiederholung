# Sichert alle lokalen Claude-Code-Chats zu diesem Projekt als lesbare
# Textdateien: jede Nachricht des Betreibers und jede Antwort woertlich,
# ohne Werkzeug-Ausgaben. Nur lesen, nichts wird veraendert.
#
# Aufruf (PowerShell, im Repo):
#   py -3 plan\werkzeuge\chats_sichern.py
# Ziel: Desktop\Wiederholung-Belege\chats\  (bewusst AUSSERHALB des Repos:
# das Repo ist oeffentlich, in den Chats stehen persoenliche Angaben).
import io, json, glob, os, re, sys

quelle = os.path.expanduser(r"~\.claude\projects")
ziel = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser(r"~\Desktop\Wiederholung-Belege\chats")
os.makedirs(ziel, exist_ok=True)


def text_aus(inhalt):
    if isinstance(inhalt, str):
        return inhalt
    if isinstance(inhalt, list):
        return "\n".join(t.get("text") or "" for t in inhalt if isinstance(t, dict) and t.get("type") == "text")
    return ""


anzahl = 0
uebersicht = []
for ordner in sorted(glob.glob(os.path.join(quelle, "*iederholung*"))):
    for datei in sorted(glob.glob(os.path.join(ordner, "*.jsonl"))):
        zeilen, erste, letzte, betreiber = [], "", "", 0
        for roh in io.open(datei, encoding="utf-8", errors="replace"):
            try:
                e = json.loads(roh)
            except ValueError:
                continue
            art = e.get("type")
            if art not in ("user", "assistant") or e.get("isMeta") or e.get("isSidechain"):
                continue
            text = text_aus((e.get("message") or {}).get("content"))
            if art == "user":
                text = re.sub(r"<system-reminder>.*?</system-reminder>", "", text, flags=re.S)
            text = text.strip()
            if not text:
                continue
            zeit = (e.get("timestamp") or "")[:16].replace("T", " ")
            erste = erste or zeit
            letzte = zeit or letzte
            if art == "user":
                betreiber += 1
            zeilen.append("\n## %s — %s\n\n%s\n" % ("BETREIBER" if art == "user" else "Claude", zeit, text))
        if not zeilen:
            continue
        name = "%s_%s.md" % (erste[:10] or "ohne-datum", os.path.basename(datei)[:8])
        with io.open(os.path.join(ziel, name), "w", encoding="utf-8", newline="\n") as f:
            f.write("# Chat %s\n\nOrdner: %s\nVon %s bis %s. Wörtlich, ohne Werkzeug-Ausgaben.\n" % (os.path.basename(datei)[:8], os.path.basename(ordner), erste, letzte))
            f.write("".join(zeilen))
        uebersicht.append((erste, name, betreiber, len(zeilen)))
        anzahl += 1

uebersicht.sort()
with io.open(os.path.join(ziel, "UEBERSICHT.md"), "w", encoding="utf-8", newline="\n") as f:
    f.write("# Gesicherte Chats\n\n| Beginn | Datei | Nachrichten Betreiber | Nachrichten gesamt |\n|---|---|---|---|\n")
    for erste, name, b, n in uebersicht:
        f.write("| %s | %s | %d | %d |\n" % (erste, name, b, n))
print(anzahl, "Chats gesichert nach", ziel)

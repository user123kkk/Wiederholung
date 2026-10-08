#!/usr/bin/env bash
# Minuten-Sicherung (LEHREN § 1.9, Betreiber 08.10.2026: "alles jede Minute
# gespeichert ... falls ich Limit treffe, ich auf Codex oder andersrum
# weiterarbeiten kann, ohne mich erklaeren zu muessen ... selbst Tests,
# alles, was eine KI auch nur anfasst").
#
# Laeuft neben der Arbeit und sichert jede Minute nach plan/sicherung/:
#   1. entwurf-aktuell.patch   alle uncommitteten Aenderungen an App- und
#                              Testdateien (die Dateien selbst bleiben
#                              unangetastet und uncommittet)
#   2. tests/                  alle Testausgaben der letzten zwei Tage aus
#                              dem TEMP-Ordner (Gesamtlauf, Nachlaeufe,
#                              Entwurfs-Tests, ladegeraet-Ausgabe)
#   3. UEBERGABE-AKTUELL.md    eine Seite: Stand, was uncommittet ist, was
#                              gerade laeuft, letzte Testergebnisse, wie ein
#                              anderer Agent sofort weitermacht
# und committet + pusht plan/ (ohne plan/werkzeuge) und CLAUDE.md, AGENTS.md.
# Halbfertige App- oder Testdateien werden nie committet, nur als Patch
# gesichert. Schlaegt ein Schritt fehl (Git belegt, kein Netz), versucht es
# die naechste Minute wieder.
#
# Start (Git Bash, im Repo):  bash plan/werkzeuge/minuten_sicherung.sh
# Laeuft nur, solange der Laptop an ist. Jede neue Session startet sie zuerst.
cd "$(dirname "$0")/../.." || exit 1
S=plan/sicherung
mkdir -p "$S/tests"
tmp=$(cygpath -u "${TEMP:-/tmp}" 2>/dev/null || echo "${TEMP:-/tmp}")

while true; do
  zeit=$(date '+%d.%m.%Y %H:%M')

  # 1. Entwurf als Patch (App-Dateien und Werkzeuge/Tests getrennt, weil ein
  #    Ausschluss von plan/ sonst auch plan/werkzeuge ausschliesst).
  { git diff HEAD -- . ':!plan' ':!CLAUDE.md' ':!AGENTS.md'; git diff HEAD -- plan/werkzeuge; } > "$S/entwurf-aktuell.patch.neu" 2>/dev/null
  if ! cmp -s "$S/entwurf-aktuell.patch.neu" "$S/entwurf-aktuell.patch" 2>/dev/null; then
    mv -f "$S/entwurf-aktuell.patch.neu" "$S/entwurf-aktuell.patch"
  else
    rm -f "$S/entwurf-aktuell.patch.neu"
  fi

  # 2. Testausgaben der letzten zwei Tage.
  for d in "$tmp"/adrabic-pruefstand-gesamt/* "$tmp"/entwurf-* "$tmp"/nachlauf-*; do
    [ -d "$d" ] || continue
    [ -n "$(find "$d" -maxdepth 0 -mtime -2 2>/dev/null)" ] || continue
    ziel="$S/tests/$(basename "$d")"
    mkdir -p "$ziel"
    find "$d" -maxdepth 1 -type f -size -400k -exec cp -u {} "$ziel/" \; 2>/dev/null
  done
  for f in "$tmp"/ladegeraet-*.log; do
    [ -f "$f" ] || continue
    [ -n "$(find "$f" -mtime -2 2>/dev/null)" ] || continue
    tr -d '\000' < "$f" > "$S/tests/$(basename "$f").neu" 2>/dev/null
    if ! cmp -s "$S/tests/$(basename "$f").neu" "$S/tests/$(basename "$f")" 2>/dev/null; then
      mv -f "$S/tests/$(basename "$f").neu" "$S/tests/$(basename "$f")"
    else
      rm -f "$S/tests/$(basename "$f").neu"
    fi
  done

  # 3. Die eine Seite fuer die Uebergabe.
  {
    echo "# Übergabe – Stand von $zeit (wird jede Minute neu geschrieben)"
    echo
    echo "Für Claude und Codex: Wer hier weitermacht, braucht keine Erklärung vom"
    echo "Betreiber. Erst diese Seite, dann \`plan/BETREIBER-VERSTEHEN.md\`,"
    echo "\`plan/ALLES-OFFEN.md\`, \`plan/STAND.md\`, \`plan/ARBEITSPROTOKOLL.md\`."
    echo
    echo "## Stand"
    echo
    echo "- Zweig und letzter Commit: \`$(git rev-parse --abbrev-ref HEAD 2>/dev/null)\`, \`$(git log -1 --format='%h %s' 2>/dev/null | cut -c1-110)\`"
    echo "- Version in \`app.js\` (Arbeitsordner): $(grep -m1 -o 'const APP_VERSION = "[^"]*"' app.js 2>/dev/null)"
    echo "- Version im letzten Commit: $(git show HEAD:app.js 2>/dev/null | grep -m1 -o 'const APP_VERSION = "[^"]*"')"
    echo
    echo "## Uncommittete Dateien (stehen vollständig in \`plan/sicherung/entwurf-aktuell.patch\`)"
    echo
    aend=$(git status --porcelain --untracked-files=no -- . ':!plan/sicherung' 2>/dev/null)
    if [ -n "$aend" ]; then
      echo '```'; echo "$aend"; echo '```'
      echo
      echo "Auf einem sauberen Stand desselben Commits wiederherstellen:"
      echo "\`git apply --check plan/sicherung/entwurf-aktuell.patch\`, dann \`git apply plan/sicherung/entwurf-aktuell.patch\`."
    else
      echo "Keine. Alles ist committet."
    fi
    echo
    echo "## Was gerade läuft"
    echo
    n=$(tasklist //FI "IMAGENAME eq node.exe" 2>/dev/null | grep -ci "node.exe")
    c=$(tasklist //FI "IMAGENAME eq chrome.exe" 2>/dev/null | grep -ci "chrome.exe")
    echo "- Prozesse: node.exe $n, chrome.exe $c (mehrere node.exe mit chrome.exe heißt meist: Tests laufen)."
    echo
    echo "## Letzte Testergebnisse (vollständige Ausgaben: \`plan/sicherung/tests/\`)"
    echo
    for e in $(ls -t "$S"/tests/*/_ergebnis.txt 2>/dev/null | head -3); do
      echo "**$(basename "$(dirname "$e")")**: $(grep -c '^EXIT 0' "$e") grün, $(grep -c '^EXIT [^0]' "$e") rot, zuletzt: $(tail -1 "$e")"
      rot=$(grep '^EXIT [^0]' "$e")
      [ -n "$rot" ] && { echo '```'; echo "$rot"; echo '```'; }
      echo
    done
    for l in $(ls -t "$S"/tests/ladegeraet-*.log 2>/dev/null | head -1); do
      echo "**$(basename "$l")**: $(grep -c '^EXIT 0' "$l") grün, $(grep -c '^ROT' "$l") rot"
      echo '```'; grep '^ROT\|Exit 0;\|ABGEBROCHEN\|Alles gruen\|FERTIG' "$l" | tail -6; echo '```'
      echo
    done
    echo "## Zuletzt getan (aus \`plan/ARBEITSPROTOKOLL.md\`)"
    echo
    sed -n '/^## /,$p' plan/ARBEITSPROTOKOLL.md 2>/dev/null | head -45
  } > "$S/UEBERGABE-AKTUELL.md.neu" 2>/dev/null
  # Nur die Kopfzeile aendert sich jede Minute: ohne inhaltliche Aenderung
  # keinen neuen Commit erzeugen.
  if ! cmp -s <(tail -n +2 "$S/UEBERGABE-AKTUELL.md.neu") <(tail -n +2 "$S/UEBERGABE-AKTUELL.md" 2>/dev/null); then
    mv -f "$S/UEBERGABE-AKTUELL.md.neu" "$S/UEBERGABE-AKTUELL.md"
  else
    rm -f "$S/UEBERGABE-AKTUELL.md.neu"
  fi

  # 4. Committen und pushen.
  if [ -n "$(git status --porcelain -- plan ':!plan/werkzeuge' CLAUDE.md AGENTS.md 2>/dev/null)" ]; then
    git add -A -- plan ':!plan/werkzeuge' CLAUDE.md AGENTS.md 2>/dev/null &&
      git commit -q --only -m "Sicherung $(date +%H:%M) (automatisch, jede Minute)" -- plan ':!plan/werkzeuge' CLAUDE.md AGENTS.md 2>/dev/null &&
      echo "$(date +%H:%M) gesichert"
  fi
  if [ -n "$(git log origin/main..HEAD --oneline 2>/dev/null)" ]; then
    git push -q origin HEAD:main 2>/dev/null && echo "$(date +%H:%M) gepusht"
  fi
  sleep 60
done

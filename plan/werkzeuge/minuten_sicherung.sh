#!/usr/bin/env bash
# Minuten-Sicherung (LEHREN § 1.9, Betreiber 08.10.2026: "alle 60 Sek. ...
# wird festgehalten"). Laeuft neben der Arbeit und sichert jede Minute:
#   1. den uncommitteten Stand der App- und Testdateien als Patch nach
#      plan/sicherung/entwurf-aktuell.patch (die Dateien selbst bleiben
#      unangetastet und uncommittet),
#   2. alles unter plan/ und CLAUDE.md als Commit auf main, mit Push.
# Committet wird NUR plan/ (ohne plan/werkzeuge) und CLAUDE.md (--only),
# nie halbfertige App- oder Testdateien; die stehen im Patch. Schlaegt ein Schritt fehl (Git gerade belegt, kein Netz),
# versucht es die naechste Minute wieder.
#
# Start (Git Bash, im Repo):  bash plan/werkzeuge/minuten_sicherung.sh
# Ende: Fenster schliessen oder Strg+C. Laeuft nur, solange der Laptop an ist.
cd "$(dirname "$0")/../.." || exit 1
mkdir -p plan/sicherung
while true; do
  zeit=$(date +%H:%M)
  if [ -n "$(git status --porcelain --untracked-files=no -- . ':!plan' ':!CLAUDE.md' plan/werkzeuge 2>/dev/null)" ]; then
    git diff HEAD -- . ':!plan' ':!CLAUDE.md' plan/werkzeuge > plan/sicherung/entwurf-aktuell.patch 2>/dev/null
  elif [ -s plan/sicherung/entwurf-aktuell.patch ]; then
    : > plan/sicherung/entwurf-aktuell.patch
  fi
  if [ -n "$(git status --porcelain -- plan ':!plan/werkzeuge' CLAUDE.md 2>/dev/null)" ]; then
    git add -A -- plan ':!plan/werkzeuge' CLAUDE.md 2>/dev/null &&
      git commit -q --only -m "Sicherung $zeit (automatisch, jede Minute)" -- plan ':!plan/werkzeuge' CLAUDE.md 2>/dev/null &&
      echo "$zeit gesichert"
  fi
  if [ -n "$(git log origin/main..HEAD --oneline 2>/dev/null)" ]; then
    git push -q origin HEAD:main 2>/dev/null && echo "$zeit gepusht"
  fi
  sleep 60
done

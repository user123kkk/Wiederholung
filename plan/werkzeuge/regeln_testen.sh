#!/usr/bin/env bash
# ============================================================
# regeln_testen.sh — Firestore-Regeln im Emulator pruefen (Linux)
#
# Wofuer: fuehrt plan/phase-1-datenzugriff/regeln-pruefung.mjs gegen einen
# echten Firestore-Emulator aus. Nur so ist geprueft, dass firestore.rules
# tatsaechlich das tut, was gewollt ist — nicht nur, dass es syntaktisch
# gueltig ist.
#
# Wann laufen lassen: nach JEDER Aenderung an firestore.rules oder an
# regeln-pruefung.mjs, vor dem Commit (plan/LEHREN.md § 8.1: Firestore-Regeln
# sind eine Positivliste, ein einziges vergessenes Feld laesst jeden
# Speichervorgang scheitern — das faellt nur im Emulator auf, nicht beim
# Lesen der Regel).
#
# Braucht: Java (der Firestore-Emulator ist ein .jar), Node.js, Internet nur
# beim ersten Lauf (npm-Pakete + Emulator-Jar werden gecacht).
#
# Aufruf:
#   bash plan/werkzeuge/regeln_testen.sh
#
# Umgebungsvariablen:
#   REGELN_EMU    Ordner fuer die Emulator-Umgebung (node_modules, cache).
#                 Default: $HOME/.cache/adrabic-regeln-emu — wird bei
#                 Bedarf angelegt und wiederverwendet, kein npm install bei
#                 spaeteren Laeufen, wenn node_modules schon da ist.
#   REGELN_DATEI  Pfad zu einer firestore.rules, die statt der Repo-Datei
#                 geprueft werden soll (Gegenprobe gegen eine aeltere
#                 Fassung). Default: firestore.rules dieses Repos.
#
# Exit-Code: der des Testlaufs (regeln-pruefung.mjs beendet sich mit 1,
# sobald auch nur ein Fall anders ausgeht als erwartet — 0, wenn alle wie
# erwartet ausgehen). Dieses Skript reicht denselben Code weiter.
# ============================================================
set -euo pipefail

REPO_WURZEL="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
PRUEFDATEI="$REPO_WURZEL/plan/phase-1-datenzugriff/regeln-pruefung.mjs"
EMU_ORDNER="${REGELN_EMU:-$HOME/.cache/adrabic-regeln-emu}"
REGELN_DATEI="${REGELN_DATEI:-$REPO_WURZEL/firestore.rules}"

if [ ! -f "$PRUEFDATEI" ]; then
  echo "Nicht gefunden: $PRUEFDATEI" >&2
  exit 1
fi
if [ ! -f "$REGELN_DATEI" ]; then
  echo "Nicht gefunden (REGELN_DATEI): $REGELN_DATEI" >&2
  exit 1
fi
if ! command -v java >/dev/null 2>&1; then
  echo "Java nicht gefunden. Der Firestore-Emulator braucht ein installiertes Java (siehe LEHREN § 8.1)." >&2
  exit 1
fi
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js nicht gefunden." >&2
  exit 1
fi

mkdir -p "$EMU_ORDNER"

if [ ! -d "$EMU_ORDNER/node_modules" ]; then
  echo "Richte Emulator-Umgebung in $EMU_ORDNER ein (einmalig) ..."
  (
    cd "$EMU_ORDNER"
    [ -f package.json ] || npm init -y >/dev/null
    npm install firebase-tools @firebase/rules-unit-testing firebase
  )
else
  echo "Nutze vorhandene Emulator-Umgebung in $EMU_ORDNER (kein npm install)."
fi

# firebase.json der Emulator-Umgebung immer neu schreiben, damit sie auf die
# uebergebene REGELN_DATEI zeigt (absoluter Pfad, damit es egal ist, ob
# firebase emulators:exec spaeter aus EMU_ORDNER heraus laeuft).
cat > "$EMU_ORDNER/firebase.json" <<JSON
{
  "emulators": {
    "firestore": { "port": 8085 },
    "ui": { "enabled": false },
    "singleProjectMode": true
  },
  "firestore": {
    "rules": "$REGELN_DATEI"
  }
}
JSON

# regeln-pruefung.mjs aus dem Repo in die Emulator-Umgebung kopieren, damit
# es dort dieselben node_modules (firebase, @firebase/rules-unit-testing)
# findet wie ein lokal per npm install angelegtes Skript.
cp "$PRUEFDATEI" "$EMU_ORDNER/regeln-pruefung.mjs"

cd "$EMU_ORDNER"
RULES_FILE="$REGELN_DATEI" \
  ./node_modules/.bin/firebase emulators:exec --only firestore \
    --project wiederholung-test "node regeln-pruefung.mjs"

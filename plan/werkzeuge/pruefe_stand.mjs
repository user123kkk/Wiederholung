#!/usr/bin/env node
// Prüfskript für die Veröffentlichungsliste (README.md / LEHREN.md § 4.1, § 4.3, § 9.2).
// Aufruf: node plan/werkzeuge/pruefe_stand.mjs (aus der Repo-Wurzel oder egal woher).
// Nur eingebaute Module, kein npm.

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";

// Repo-Wurzel: zwei Ordner über dieser Datei (plan/werkzeuge/ -> Wurzel).
// Per PRUEF_WURZEL überschreibbar (fuer die Gegenprobe in einer Kopie).
const hierDatei = fileURLToPath(import.meta.url);
const hierOrdner = path.dirname(hierDatei);
const wurzel = process.env.PRUEF_WURZEL
  ? path.resolve(process.env.PRUEF_WURZEL)
  : path.resolve(hierOrdner, "..", "..");

function pfad(...teile) {
  return path.join(wurzel, ...teile);
}

// Zeilenenden wie der Browser: Der HTML-Parser macht aus \r\n vor allem
// anderen \n, der CSP-Hash gilt also fuer den \n-Text. Git fuer Windows
// checkt standardmaessig mit \r\n aus - ohne diese Zeile meldete die
// Pruefung dort falsche CSP-Fehler und veroeffentlichen.bat brach ab.
function lies(relPfad) {
  return readFileSync(pfad(relPfad), "utf8").replace(/\r\n?/g, "\n");
}

let fehlerZahl = 0;

function ok(text) {
  console.log("OK    " + text);
}
function fehler(text) {
  fehlerZahl++;
  console.log("FEHLER " + text);
}
function hinweis(text) {
  console.log("HINWEIS " + text);
}

// ---------- 1. Version an vier Stellen ----------

let version = null;
{
  const appJs = lies("app.js");
  // Zum Herausziehen ist ein Regex ok, verglichen wird die Version danach per ===.
  const m = appJs.match(/const APP_VERSION = "([^"]+)";/);
  if (!m) {
    fehler("app.js: `const APP_VERSION = \"X\";` nicht gefunden.");
  } else {
    version = m[1];

    const swJs = lies("sw.js");
    const erwartetCache = 'const CACHE_NAME = "adrabic-' + version + '";';
    if (swJs.includes(erwartetCache)) {
      ok("Version " + version + ": CACHE_NAME in sw.js stimmt.");
    } else {
      fehler(
        "sw.js: CACHE_NAME passt nicht zu APP_VERSION (" + version +
        "). Erwartet Zeichenkette: " + erwartetCache
      );
    }

    const indexHtml = lies("index.html");
    const erwartetStyles = "styles.css?v=" + version;
    const treffStyles = indexHtml.split(erwartetStyles).length - 1;
    if (treffStyles === 1) {
      ok("Version " + version + ": styles.css?v=... in index.html genau einmal vorhanden.");
    } else {
      fehler(
        "index.html: \"" + erwartetStyles + "\" " +
        (treffStyles === 0 ? "nicht gefunden" : treffStyles + "-mal statt einmal gefunden") + "."
      );
    }

    const erwartetAppJs = "app.js?v=" + version;
    const treffAppJs = indexHtml.split(erwartetAppJs).length - 1;
    if (treffAppJs === 1) {
      ok("Version " + version + ": app.js?v=... in index.html genau einmal vorhanden.");
    } else {
      fehler(
        "index.html: \"" + erwartetAppJs + "\" " +
        (treffAppJs === 0 ? "nicht gefunden" : treffAppJs + "-mal statt einmal gefunden") + "."
      );
    }
  }
}

// ---------- 2. CHANGELOG.md ----------

if (version) {
  const changelog = lies("CHANGELOG.md");
  const zeilen = changelog.split("\n");
  const ersteUeberschrift = zeilen.find(z => z.startsWith("## "));
  const erwartetKopf = "## " + version + " ";
  if (ersteUeberschrift && ersteUeberschrift.startsWith(erwartetKopf)) {
    ok("CHANGELOG.md: erste Überschrift beginnt mit \"" + erwartetKopf + "\".");
  } else {
    fehler(
      "CHANGELOG.md: erste \"## \"-Überschrift ist \"" +
      (ersteUeberschrift || "(keine gefunden)") +
      "\", erwartet Beginn \"" + erwartetKopf + "\"."
    );
  }
}

// ---------- 3. node --check ----------

for (const datei of ["app.js", "sw.js"]) {
  try {
    execFileSync(process.execPath, ["--check", pfad(datei)], { stdio: "pipe" });
    ok("node --check " + datei + " erfolgreich.");
  } catch (e) {
    const meldung = e.stderr ? e.stderr.toString().trim() : String(e.message || e);
    fehler("node --check " + datei + " schlägt fehl: " + meldung);
  }
}

// ---------- 4. CSP-Hashes der Inline-Skripte ----------

{
  let cspHashes = new Set();
  try {
    const fbJson = JSON.parse(lies("firebase.json"));
    const hosting = Array.isArray(fbJson.hosting) ? fbJson.hosting[0] : fbJson.hosting;
    const headerBlock = (hosting.headers || []).find(h => h.source === "**");
    const cspHeader = headerBlock &&
      (headerBlock.headers || []).find(h => h.key === "Content-Security-Policy");
    if (!cspHeader) {
      fehler("firebase.json: kein Content-Security-Policy-Header für source \"**\" gefunden.");
    } else {
      const cspWert = cspHeader.value;
      // script-src-Direktive herausschneiden, um nur dort nach Hashes zu suchen.
      const scriptSrcMatch = cspWert.match(/script-src([^;]*)/);
      const scriptSrcTeil = scriptSrcMatch ? scriptSrcMatch[1] : "";
      const hashFund = scriptSrcTeil.match(/'sha256-[^']+'/g) || [];
      cspHashes = new Set(hashFund.map(h => h.slice(1, -1))); // Anführungszeichen weg
      ok("firebase.json: " + cspHashes.size + " sha256-Hashes in script-src gefunden.");
    }
  } catch (e) {
    fehler("firebase.json konnte nicht gelesen/geparst werden: " + e.message);
  }

  const gebrauchteHashes = new Set();

  for (const datei of ["index.html", "impressum.html", "datenschutzerklaerung.html"]) {
    if (!existsSync(pfad(datei))) {
      hinweis("CSP-Prüfung: " + datei + " nicht vorhanden, übersprungen.");
      continue;
    }
    const inhalt = lies(datei);
    // Alle <script ...>...</script>-Blöcke finden (ohne src-Attribut).
    const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;
    let m;
    let nummer = 0;
    while ((m = scriptRegex.exec(inhalt)) !== null) {
      nummer++;
      const attribute = m[1];
      const inlineInhalt = m[2];
      if (/\bsrc\s*=/.test(attribute)) {
        continue; // externes Skript, keine Hash-Prüfung nötig
      }
      const typMatch = attribute.match(/\btype\s*=\s*["']([^"']+)["']/);
      const typ = typMatch ? typMatch[1] : null;
      if (typ === "application/ld+json") {
        hinweis(
          datei + " Skript #" + nummer +
          ": JSON-LD (application/ld+json) wird von CSP script-src nicht " +
          "blockiert, übersprungen."
        );
        continue;
      }
      if (inlineInhalt.length === 0) {
        continue; // leeres Skript, kein Inline-Code
      }
      // Hash exakt wie der Browser: SHA-256 über den Inhalt zwischen > und </script>, UTF-8, Base64.
      const hash = createHash("sha256").update(inlineInhalt, "utf8").digest("base64");
      const hashStr = "sha256-" + hash;
      gebrauchteHashes.add(hashStr);
      if (cspHashes.has(hashStr)) {
        ok(datei + " Skript #" + nummer + ": Hash steht in der CSP.");
      } else {
        fehler(
          datei + " Skript #" + nummer +
          ": Hash fehlt in der CSP von firebase.json. Berechneter Hash: 'sha256-" + hash + "'"
        );
      }
    }
  }

  for (const h of cspHashes) {
    if (!gebrauchteHashes.has(h)) {
      hinweis("CSP enthält Hash '" + h + "', der zu keinem geprüften Inline-Skript passt.");
    }
  }
}

// ---------- 5. APP_SHELL ----------

if (version) {
  const swJs = lies("sw.js");
  const shellMatch = swJs.match(/const APP_SHELL = \[([\s\S]*?)\];/);
  if (!shellMatch) {
    fehler("sw.js: `const APP_SHELL = [ ... ];` nicht gefunden.");
  } else {
    const listenText = shellMatch[1];
    // Zeilenweise durchgehen, Kommentare ab // ignorieren.
    const zeilen = listenText.split("\n");
    for (const rohzeile of zeilen) {
      const zeile = rohzeile.replace(/\/\/.*$/, "").trim();
      if (!zeile) continue;

      // Reines Zeichenketten-Literal: "./irgendwas"
      const literalMatch = zeile.match(/^"((?:[^"\\]|\\.)*)"\s*,?\s*$/);
      if (literalMatch) {
        const wert = literalMatch[1];
        if (wert === "./") continue; // steht fuer index.html-Ordner selbst, kein Datei-Eintrag
        if (wert.includes("?")) continue; // hat eine Query, hier nicht relevant (nur Fall + VERSION unten)
        const relDatei = wert.replace(/^\.\//, "");
        if (existsSync(pfad(relDatei))) {
          ok("APP_SHELL: " + wert + " vorhanden.");
        } else {
          fehler("APP_SHELL: " + wert + " fehlt (Datei nicht gefunden: " + relDatei + ").");
        }
        continue;
      }

      // Eintrag mit + VERSION, z.B. "./app.js?v=" + VERSION
      const versionMatch = zeile.match(/^"([^"]*)\?v="\s*\+\s*VERSION\s*,?\s*$/);
      if (versionMatch) {
        const basis = versionMatch[1];
        const relDatei = basis.replace(/^\.\//, "");
        if (existsSync(pfad(relDatei))) {
          ok("APP_SHELL: " + basis + "?v=... (VERSION) vorhanden.");
        } else {
          fehler("APP_SHELL: " + basis + "?v=... (VERSION) fehlt (Datei nicht gefunden: " + relDatei + ").");
        }
        continue;
      }

      // Andere Zeilenformen (z.B. reine Kommentarzeilen ohne Eintrag) überspringen.
    }
  }
}

// ---------- 6. csp-build ----------

{
  let gitVerfuegbar = true;
  let geaenderteDateien = new Set();
  try {
    const ausgabe1 = execFileSync("git", ["diff", "--name-only", "HEAD"], {
      cwd: wurzel,
      stdio: "pipe"
    }).toString();
    const ausgabe2 = execFileSync("git", ["diff", "--cached", "--name-only"], {
      cwd: wurzel,
      stdio: "pipe"
    }).toString();
    for (const z of (ausgabe1 + "\n" + ausgabe2).split("\n")) {
      const t = z.trim();
      if (t) geaenderteDateien.add(t);
    }
  } catch (e) {
    gitVerfuegbar = false;
  }

  if (!gitVerfuegbar) {
    hinweis("csp-build-Prüfung übersprungen: git nicht verfügbar.");
  } else {
    const fbGeaendert = geaenderteDateien.has("firebase.json");
    const indexGeaendert = geaenderteDateien.has("index.html");
    if (fbGeaendert && !indexGeaendert) {
      fehler(
        "firebase.json geändert, aber csp-build in index.html nicht mitgezählt (LEHREN § 4.3)."
      );
    } else {
      ok("csp-build-Prüfung: kein offener Widerspruch (firebase.json/index.html).");
    }
  }
}

// ---------- Abschluss ----------

console.log("");
if (fehlerZahl === 0) {
  console.log("Alles in Ordnung.");
  process.exit(0);
} else {
  console.log(fehlerZahl + " Fehler.");
  process.exit(1);
}

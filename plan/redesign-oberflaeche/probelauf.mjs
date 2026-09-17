/* ===========================================================================
   PROBELAUF — die echte App ohne Firebase ansehen

   ARBEITSMITTEL, KEINE AUSGELIEFERTE DATEI. Liegt unter plan/, steht nicht in
   APP_SHELL und wird von nichts im Wurzelverzeichnis aufgerufen.

   Wozu: index.html braucht Firebase von gstatic.com. Wo das nicht erreichbar
   ist (Agent-Umgebung, Flugzeug, gesperrtes Netz), bleibt die App bei
   "Start fehlgeschlagen" stehen - jede Gestaltungsaenderung waere dann
   ungeprueft. Dieses Skript faengt die drei Firebase-Module ab und liefert
   Attrappen mit erfundenen Daten. Danach laeuft die ECHTE app.js: dieselben
   render()-Funktionen, dieselben Handler, dieselbe styles.css.

   Was es NICHT ist: ein Test der Lernlogik oder der Firestore-Zugriffe. Es
   schreibt nichts und prueft nichts nach - es macht die Oberflaeche sichtbar.

   Braucht Playwright. Das Repo hat bewusst keine Paketverwaltung, also wird
   es NICHT als Abhaengigkeit eingetragen. Ausserhalb installieren und einen
   Verweis ins Wurzelverzeichnis legen (node_modules/ steht in .gitignore,
   es landet also nichts im Repo). NODE_PATH hilft hier NICHT - ES-Module
   werten es nicht aus:
     mkdir -p /tmp/pw && cd /tmp/pw && npm install playwright
     ln -s /tmp/pw/node_modules <repo>/node_modules
   Chromium liegt in dieser Umgebung schon unter /opt/pw-browsers/chromium;
   sonst den Pfad ueber PROBE_CHROMIUM setzen.

   Aufruf (Wurzelverzeichnis):
     python3 -m http.server 8099 &
     node plan/redesign-oberflaeche/probelauf.mjs
   Bilder landen in plan/redesign-oberflaeche/.probelauf/ (nicht eingecheckt).
   ========================================================================= */

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASIS = process.env.PROBE_URL || "http://localhost:8099";
const ZIEL = new URL("./.probelauf/", import.meta.url).pathname;
mkdirSync(ZIEL, { recursive: true });

/* ---- Erfundene Daten ------------------------------------------------------
   Genug fuer einen vollen Fortschritts-Tab: eine Serie, ein Verlauf ueber
   Wochen, Karten auf verschiedenen Stufen, ein paar Lektionen und zwei
   Karten ueber der Rueckfall-Schwelle (LEECH_SCHWELLE = 5). */
const heute = new Date();
const tag = n => new Date(heute.getTime() - n * 86400000).toISOString().slice(0, 10);

const verlauf = {};
for (let i = 0; i < 40; i++) {
  if (i % 5 === 3) continue;                      // Luecken, sonst sieht der Kalender gelogen aus
  verlauf[tag(i)] = { w: 6 + ((i * 7) % 19), n: i % 4 };
}

const WOERTER = [
  ["كِتَاب", "Buch"], ["قَلَم", "Stift"], ["بَيْت", "Haus"], ["مَدْرَسَة", "Schule"],
  ["مِفْتَاح", "Schlüssel"], ["بَاب", "Tür"], ["مَسْجِد", "Moschee"], ["طَالِب", "Schüler"],
  ["سَيَّارَة", "Auto"], ["مَكْتَب", "Schreibtisch"], ["نَافِذَة", "Fenster"], ["كُرْسِيّ", "Stuhl"]
];

const karten = [];
for (let i = 0; i < 24; i++) {
  const [w, u] = WOERTER[i % WOERTER.length];
  const stufe = i % 6;
  karten.push({
    id: "k" + i, bereichId: "b1", order: i,
    wort: w + (i >= WOERTER.length ? " " + (i + 1) : ""), uebersetzung: u,
    extra: i % 5 === 0 ? "Plural: " + u + "e" : "",
    stufe, maxStufe: Math.max(stufe, i % 4),
    ersteBewertung: i < 20 ? tag(30 - i) : null,
    nextReview: i < 9 ? tag(1) : tag(-(i % 7)),     // neun sind faellig
    rueckfaelle: i === 3 ? 7 : i === 11 ? 6 : i === 17 ? 5 : 0
  });
}

const sets = {};
["Lektion 1", "Lektion 2", "Lektion 3", "Lektion 4"].forEach((name, i) => {
  sets["s" + i] = {
    name, art: "lektion", order: i,
    cardIds: karten.slice(i * 6, i * 6 + 6).map(k => k.id)
  };
});

const NUTZERDOK = {
  name: "Ahmad",
  schemaVersion: 2,
  settings: { thema: "dunkel", arabGroesse: "normal", sitzungsLimit: 20, lastBackup: tag(3) },
  streak: { aktuell: 7, beste: 14, letzterTag: tag(0), sockel: 0 },
  verlauf
};
const BEREICHE = [
  { id: "b1", name: "Medina Buch 1", order: 0, gefuehrt: false, sets },
  { id: "b2", name: "Grammatik", order: 1, gefuehrt: false, sets: {} }
];

/* ---- Die Attrappen -------------------------------------------------------
   Nur die Aufrufe, die app.js beim Start und beim Zeichnen braucht. Alles,
   was schreibt, ist bewusst ein No-op: der Probelauf soll nichts tun koennen.  */
const STUB_APP = `export function initializeApp(){ return { name: "probe" }; }`;

const STUB_AUTH = `
export function getAuth(){ return { currentUser: null }; }
export function onAuthStateChanged(a, cb){
  setTimeout(() => cb({ uid: "probe-uid", email: "ahmad@example.com",
                        displayName: "Ahmad", emailVerified: true }), 0);
  return () => {};
}
export function signOut(){ return Promise.resolve(); }
export function setPersistence(){ return Promise.resolve(); }
export const browserLocalPersistence = {};
`;

const STUB_FS = `
const NUTZERDOK = ${JSON.stringify(NUTZERDOK)};
const BEREICHE   = ${JSON.stringify(BEREICHE)};
const KARTEN     = ${JSON.stringify(karten)};

export function initializeFirestore(){ return { probe: true }; }
export function getFirestore(){ return { probe: true }; }
export function persistentLocalCache(){ return {}; }
export function doc(a, b, c){ return { art: "doc", pfad: [b, c].filter(Boolean).join("/") }; }
export function collection(a, name){ return { art: "col", name }; }

function snapDoc(daten){
  return { metadata: { hasPendingWrites: false }, exists: () => !!daten, data: () => daten };
}
function snapCol(liste){
  return { docs: liste.map(d => ({ id: d.id, data: () => d })) };
}
export function onSnapshot(ref, cb){
  setTimeout(() => {
    if (ref.art === "col") cb(snapCol(ref.name === "bereiche" ? BEREICHE : KARTEN));
    else cb(snapDoc(NUTZERDOK));
  }, 0);
  return () => {};
}
/* Schreiben: der Probelauf aendert nichts. */
export function setDoc(){ return Promise.resolve(); }
export function updateDoc(){ return Promise.resolve(); }
export function deleteDoc(){ return Promise.resolve(); }
export function getDoc(){ return Promise.resolve(snapDoc(NUTZERDOK)); }
export function getDocs(){ return Promise.resolve(snapCol([])); }
export function writeBatch(){ return { set(){}, update(){}, delete(){}, commit(){ return Promise.resolve(); } }; }
export function serverTimestamp(){ return null; }
export function deleteField(){ return null; }
export const enableIndexedDbPersistence = () => Promise.resolve();
`;

const MODULE = {
  "firebase-app.js": STUB_APP,
  "firebase-auth.js": STUB_AUTH,
  "firebase-firestore.js": STUB_FS
};

/* ---- Die Bildschirme, die abgelichtet werden -----------------------------
   Jeder Eintrag: Name, und was zu tun ist, um dorthin zu kommen. Geklickt
   wird ueber data-action - dieselben Werte, die app.js auswertet. */
const BILDER = [
  { name: "01-lernen",            weg: [] },
  { name: "02-fortschritt",       weg: ['[data-action="tab-fortschritt"]'] },
  { name: "03-fort-lektionen",    weg: ['[data-action="tab-fortschritt"]', '[data-action="stats-scope"][data-scope="bereich"]', '[data-action="fort-seite"][data-id="lektionen"]'] },
  { name: "04-fort-leeches",      weg: ['[data-action="tab-fortschritt"]', '[data-action="fort-seite"][data-id="leeches"]'] },
  { name: "05-fort-vorschau",     weg: ['[data-action="tab-fortschritt"]', '[data-action="fort-seite"][data-id="vorschau"]'] },
  { name: "06-einstellungen",     weg: ['[data-action="einstellungen"]'] },
  { name: "07-einst-wahl",        weg: ['[data-action="einstellungen"]', '[data-action="wahl-sheet"][data-id="limit"]'] },
  { name: "08-einst-sichern",     weg: ['[data-action="einstellungen"]', '[data-action="einst-seite"][data-id="sichern"]'] },
  { name: "09-einst-verlauf",     weg: ['[data-action="einstellungen"]', '[data-action="einst-seite"][data-id="verlauf"]'] },
  { name: "10-verwalten",         weg: ['[data-action="tab-verwalten"]'] }
];

const browser = await chromium.launch({ executablePath: process.env.PROBE_CHROMIUM || "/opt/pw-browsers/chromium" });
/* Der Service Worker muss aus bleiben: er speichert die App-Huelle UND
   fremde Herkuenfte (CACHEABLE_ORIGINS in sw.js, darunter gstatic.com).
   Beim zweiten Aufruf serviert er dann eine gespeicherte Antwort, und die
   Attrappe unten kommt nie zum Zug - der Probelauf zeigt in dem Fall einen
   alten Stand oder bleibt im Ladebildschirm haengen. */
const kontext = await browser.newContext({
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 2,
  serviceWorkers: "block"
});
const seite = await kontext.newPage();

const fehler = [];
seite.on("pageerror", e => fehler.push("PAGEERROR " + e.message));
seite.on("console", m => { if (m.type() === "error") fehler.push("CONSOLE " + m.text()); });

await seite.route("**/firebasejs/**", route => {
  const datei = route.request().url().split("/").pop();
  const quelle = MODULE[datei];
  if (!quelle) return route.abort();
  route.fulfill({ status: 200, contentType: "text/javascript; charset=utf-8", body: quelle });
});

for (const bild of BILDER) {
  await seite.goto(BASIS + "/index.html", { waitUntil: "load" });
  try {
    await seite.waitForSelector(".nav__tabs", { timeout: 10000 });
  } catch (e) {
    console.log("✗", bild.name, "- App kam nicht hoch. Sichtbar war:");
    console.log("   " + (await seite.innerText("body")).slice(0, 300).replace(/\n+/g, " | "));
    fehler.push("Start haengt bei " + bild.name);
    continue;
  }
  for (const klick of bild.weg) {
    await seite.click(klick, { timeout: 5000 });
    await seite.waitForTimeout(200);
  }
  await seite.waitForTimeout(250);
  await seite.screenshot({ path: ZIEL + bild.name + ".png", fullPage: true });
  const hoehe = await seite.evaluate(() => document.body.scrollHeight);
  if (hoehe > 900) {
    /* Die eigentliche Pruefung, unabhaengig vom Bild und vom Scrollen:
       Wie viel Platz liegt zwischen der Unterkante des letzten Elements und
       dem Ende des Dokuments? Er muss mindestens so hoch sein wie die
       Navigationsleiste - sonst steht das letzte Element auch bei ganz
       heruntergescrollter Seite dahinter. Ein Bild kann das verschleiern
       (position:fixed wandert im fullPage-Bild), eine Zahl nicht. */
    const platz = await seite.evaluate(() => {
      const view = document.querySelector(".view");
      const nav = document.querySelector(".nav");
      if (!view || !nav) return null;
      const letzte = view.lastElementChild;
      if (!letzte) return null;
      const y = window.scrollY;
      const dokuEnde = document.documentElement.scrollHeight;
      const unterkante = letzte.getBoundingClientRect().bottom + y;
      return {
        rest: Math.round(dokuEnde - unterkante),
        navH: Math.round(nav.getBoundingClientRect().height)
      };
    });
    if (platz && platz.rest < platz.navH) {
      console.log("   ⚠ unter dem letzten Element bleiben nur " + platz.rest +
                  "px, die Navigation ist " + platz.navH + "px hoch");
      fehler.push(bild.name + ": Inhalt verschwindet hinter der Navigation");
    } else if (platz) {
      console.log("   Luft unter dem letzten Element: " + platz.rest +
                  "px (Navigation " + platz.navH + "px)");
    }
  }
  console.log("✓", bild.name);
}

await browser.close();
if (fehler.length) {
  console.log("\nFehler waehrend des Probelaufs:");
  [...new Set(fehler)].forEach(f => console.log("  " + f.slice(0, 200)));
  process.exitCode = 1;
} else {
  console.log("\nKeine Fehler in der Konsole.");
}

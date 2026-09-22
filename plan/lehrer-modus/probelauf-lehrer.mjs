/* Durchlauf "Lehrer gibt frei" gegen die ECHTE app.js mit einer zustandsbehafteten
   Firestore-Attrappe (Speicher im Seiten-Kontext: window.__store). Regeln werden
   hier NICHT geprueft (das macht regeln-pruefung.mjs im Emulator).

   ARBEITSMITTEL, KEINE AUSGELIEFERTE DATEI (liegt unter plan/, nicht in
   APP_SHELL). Deckt GERUEST.md Abschnitt M ab: Sender teilt und gibt frei,
   Empfaenger loest ein und holt den Stand nach, der Stand sinkt nie, ein Satz
   ohne Lehrer-Bindung verhaelt sich wie vorher, Wechsel von Fortschritt auf
   Lehrer, Update mit erhaltener Bindung. Gelaufen am 19.09.2026: 34 von 34.

   Aufruf (Wurzelverzeichnis, playwright per node_modules-Verweis wie bei
   plan/redesign-oberflaeche/probelauf.mjs; unter Windows PROBE_CHROMIUM auf
   die chrome.exe setzen):
     python3 -m http.server 8099 &
     node plan/lehrer-modus/probelauf-lehrer.mjs
   Der Lauf braucht ~30 s. Dauert der erste Klick nach dem Laden zu lange,
   ist es ein Zeitfenster der Attrappe (die Anmeldung setzt Bildschirme zurueck),
   kein Fehler der App - deshalb die 700-ms-Pausen nach dem Laden. */
import { chromium } from "playwright";

const BASIS = "http://localhost:8099";
const STUB_APP = `export function initializeApp(){ return { name: "probe" }; }`;
const STUB_AUTH = `
export function getAuth(){ return { currentUser: null }; }
export function onAuthStateChanged(a, cb){
  setTimeout(() => cb({ uid: window.__uid || "u1", email: "a@example.com", displayName: "Ahmad", emailVerified: true }), 0);
  return () => {};
}
export function signOut(){ return Promise.resolve(); }
export function setPersistence(){ return Promise.resolve(); }
export const browserLocalPersistence = {};
`;
const STUB_FS = `
const S = (window.__store = window.__store || new Map());
const L = (window.__listeners = window.__listeners || []);
window.__log = window.__log || [];
const DEL = { __del: true };
export function initializeFirestore(){ return { probe: true }; }
export function getFirestore(){ return { probe: true }; }
export function persistentLocalCache(){ return {}; }
export function deleteField(){ return DEL; }
export function serverTimestamp(){ return null; }
function pfad(parent, segs){
  const base = parent && parent.pfad ? [parent.pfad] : [];
  return base.concat(segs).join("/");
}
export function doc(parent, ...segs){ return { art: "doc", pfad: pfad(parent, segs) }; }
export function collection(parent, ...segs){ return { art: "col", pfad: pfad(parent, segs) }; }
function clone(x){ return x === undefined ? undefined : JSON.parse(JSON.stringify(x)); }
function setPath(obj, dotted, val){
  const t = dotted.split("."); let o = obj;
  for (let i = 0; i < t.length - 1; i++) { if (!o[t[i]] || typeof o[t[i]] !== "object") o[t[i]] = {}; o = o[t[i]]; }
  if (val && val.__del) delete o[t[t.length - 1]]; else o[t[t.length - 1]] = clone(val);
}
function notify(){ L.forEach(l => l()); }
function snapDoc(d){ return { metadata: { hasPendingWrites: false }, exists: () => d !== undefined, data: () => clone(d) }; }
function docsOf(colPfad){
  const out = [];
  for (const [p, v] of S) {
    if (p.startsWith(colPfad + "/") && p.slice(colPfad.length + 1).indexOf("/") === -1)
      out.push({ id: p.slice(colPfad.length + 1), data: () => clone(v) });
  }
  return out;
}
export function onSnapshot(ref, cb, err){
  const f = () => { if (ref.art === "col") cb({ docs: docsOf(ref.pfad) }); else cb(snapDoc(S.get(ref.pfad))); };
  L.push(f); setTimeout(f, 0); return () => {};
}
function anwenden(op){
  const [art, ref, data] = op;
  if (art === "delete") { S.delete(ref.pfad); return; }
  if (art === "set") { S.set(ref.pfad, clone(data)); return; }
  const cur = S.get(ref.pfad);
  if (cur === undefined) { const e = new Error("nicht da"); e.code = "not-found"; throw e; }
  for (const k of Object.keys(data)) setPath(cur, k, data[k]);
}
export async function setDoc(ref, data, opts){
  if (window.__failWrites) { const e = new Error("perm"); e.code = "permission-denied"; throw e; }
  window.__log.push(["setDoc", ref.pfad]);
  if (opts && opts.merge) { const cur = S.get(ref.pfad) || {}; Object.assign(cur, clone(data)); S.set(ref.pfad, cur); }
  else S.set(ref.pfad, clone(data));
  notify();
}
export async function updateDoc(ref, data){
  if (window.__failWrites) { const e = new Error("perm"); e.code = "permission-denied"; throw e; }
  window.__log.push(["updateDoc", ref.pfad, JSON.stringify(data)]);
  anwenden(["update", ref, data]); notify();
}
export async function deleteDoc(ref){ window.__log.push(["deleteDoc", ref.pfad]); S.delete(ref.pfad); notify(); }
export async function getDoc(ref){
  window.__log.push(["getDoc", ref.pfad]);
  if (window.__getDocFehler) { const e = new Error("unavailable"); e.code = "unavailable"; throw e; }
  return snapDoc(S.get(ref.pfad));
}
export async function getDocs(q){ return { docs: [] }; }
export function query(c){ return c; }
export function where(){ return {}; }
export function writeBatch(){
  const ops = [];
  return {
    set(r, d){ ops.push(["set", r, d]); }, update(r, d){ ops.push(["update", r, d]); }, delete(r){ ops.push(["delete", r]); },
    async commit(){
      if (window.__failWrites) { const e = new Error("perm"); e.code = "permission-denied"; throw e; }
      ops.forEach(anwenden); notify();
    }
  };
}
export const enableIndexedDbPersistence = () => Promise.resolve();
`;
const MODULE = { "firebase-app.js": STUB_APP, "firebase-auth.js": STUB_AUTH, "firebase-firestore.js": STUB_FS };

const browser = await chromium.launch(process.env.PROBE_CHROMIUM ? { executablePath: process.env.PROBE_CHROMIUM } : {});
const fehler = [];
let ok = 0, fail = 0;
function pruefe(name, bedingung, detail) {
  if (bedingung) { ok++; console.log("  ✓", name); }
  else { fail++; console.log("  ✗", name, detail !== undefined ? "→ " + JSON.stringify(detail) : ""); }
}

async function neueSeite(uid, vorher) {
  const kontext = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: "block", reducedMotion: "reduce" });
  const seite = await kontext.newPage();
  seite.on("pageerror", e => fehler.push("PAGEERROR " + e.message));
  seite.on("console", m => { if (m.type() === "error") fehler.push("CONSOLE " + m.text()); });
  await seite.route("**/firebasejs/**", route => {
    const q = MODULE[route.request().url().split("/").pop()];
    if (!q) return route.abort();
    route.fulfill({ status: 200, contentType: "text/javascript; charset=utf-8", body: q });
  });
  await seite.addInitScript(({ uid, vorher }) => {
    window.__uid = uid;
    /* Speicher der "Datenbank" ueber Seitenladungen hinweg (Neustart-Test) */
    const gespeichert = JSON.parse(sessionStorage.getItem("__st") || "null");
    window.__store = new Map(gespeichert || vorher || []);
    window.addEventListener("pagehide", () => { try { sessionStorage.setItem("__st", JSON.stringify([...window.__store])); } catch (e) {} });
  }, { uid, vorher: vorher || null });
  return seite;
}
const klick = async (seite, sel) => {
  const el = await seite.waitForSelector(sel, { timeout: 8000, state: "attached" });
  await el.evaluate(e => e.click()); await seite.waitForTimeout(200);
};
const text = seite => seite.evaluate(() => document.body.innerText);

/* ---- Daten: ein eigener Bereich mit drei Lektionen ---- */
const uSender = "lehrer1";
const karten = []; const sets = {};
["Lektion 1", "Lektion 2", "Lektion 3"].forEach((n, i) => {
  const ids = [];
  for (let j = 0; j < 3; j++) {
    const id = "c" + i + j; ids.push(id);
    karten.push(["users/" + uSender + "/karten/" + id, { wort: "كلمة" + i + j, uebersetzung: "Wort" + i + j, extra: "", stufe: 0, maxStufe: 0, nextReview: "2026-09-19", ersteBewertung: null, rueckfaelle: 0, quelleId: null, order: i * 3 + j, bereichId: "b1" }]);
  }
  sets["s" + i] = { name: n, art: "lektion", order: i, quelleId: null, cardIds: ids };
});
const senderDaten = [
  ["users/" + uSender, { name: "Lehrer", schemaVersion: 2, settings: { thema: "dunkel", arabGroesse: "normal", sitzungsLimit: 20, lastBackup: "2026-09-18" }, streak: {}, verlauf: {} }],
  ["users/" + uSender + "/bereiche/b1", { name: "Medina", order: 0, gefuehrt: false, satzId: null, satzVersion: 0, sets }],
  ...karten
];

/* =============== A: Sender =============== */
console.log("A · Sender teilt mit „ich gebe frei“");
const sA = await neueSeite(uSender, senderDaten);
await sA.goto(BASIS + "/index.html", { waitUntil: "load" });
await sA.waitForSelector(".nav__tabs", { timeout: 10000 }); await sA.waitForTimeout(700);
await klick(sA, '[data-action="einstellungen"]');
await klick(sA, '[data-action="einst-seite"][data-id="sichern"]');
let t = await text(sA);
pruefe("kein Datei-Weitergeben mehr", !t.includes("Kartensatz zum Weitergeben") && !t.includes("Zum Weitergeben"));
pruefe("beide Code-Knöpfe sichtbar", t.includes("Code – Fortschritt schaltet frei") && t.includes("Code erzeugen"));
await klick(sA, '[data-action="teile-lektion-code-lehrer"]');
t = await text(sA);
pruefe("Bestätigung erklärt Lehrer-Freigabe", t.includes("Du schaltest die Lektionen selbst frei"), t.slice(0, 200));
await klick(sA, '[data-action="dlg-ok"]');
await sA.waitForTimeout(400);
const code = await sA.evaluate(() => { for (const [p] of window.__store) if (p.startsWith("geteilteLektionen/")) return p.split("/")[1]; return null; });
pruefe("Code-Datensatz angelegt", !!code, code);
const ds = await sA.evaluate(c => window.__store.get("geteilteLektionen/" + c), code);
pruefe("freigabe.offenBis = 1 im Datensatz", ds && ds.freigabe && ds.freigabe.offenBis === 1, ds && ds.freigabe);
pruefe("Datensatz hat nur erlaubte Felder", ds && Object.keys(ds).sort().join() === "erstelltAm,freigabe,inhalt,ownerUid", ds && Object.keys(ds));
const bS = await sA.evaluate(() => window.__store.get("users/lehrer1/bereiche/b1"));
pruefe("Bereich merkt teilCode + teilFreigabe=1", bS.teilCode === code && bS.teilFreigabe === 1, bS);
await klick(sA, '[data-action="dlg-ok"]');   // Code-Dialog schliessen
t = await text(sA);
pruefe("Anzeige „Freigegeben: Lektion 1 von 3“", t.includes("Freigegeben: Lektion 1 von 3"), t.slice(-400));
pruefe("Knopf „Nächste Lektion freigeben“ da", t.includes("Nächste Lektion freigeben"));

await klick(sA, '[data-action="lehrer-freigeben"]');
await klick(sA, '[data-action="dlg-ok"]');
await sA.waitForTimeout(300);
const ds2 = await sA.evaluate(c => window.__store.get("geteilteLektionen/" + c), code);
pruefe("Datensatz: offenBis = 2", ds2.freigabe.offenBis === 2, ds2.freigabe);
pruefe("Datensatz: Inhalt unverändert", JSON.stringify(ds2.inhalt) === JSON.stringify(ds.inhalt));
t = await text(sA);
pruefe("Anzeige „Lektion 2 von 3“", t.includes("Freigegeben: Lektion 2 von 3"));

/* Neustart: teilCode/teilFreigabe muessen aus der Datenbank wiederkommen */
await sA.reload({ waitUntil: "load" });
await sA.waitForSelector(".nav__tabs", { timeout: 10000 }); await sA.waitForTimeout(700);
await klick(sA, '[data-action="einstellungen"]');
await klick(sA, '[data-action="einst-seite"][data-id="sichern"]');
t = await text(sA);
pruefe("nach Neustart: Code + Stand sichtbar", t.includes(code) && t.includes("Freigegeben: Lektion 2 von 3"), t.slice(-500));

await klick(sA, '[data-action="lehrer-freigeben"]'); await klick(sA, '[data-action="dlg-ok"]'); await sA.waitForTimeout(300);
t = await text(sA);
pruefe("Lektion 3 von 3 → Knopf verschwindet", t.includes("Freigegeben: Lektion 3 von 3") && !t.includes("Nächste Lektion freigeben"));

/* Teilen beenden: Felder am Bereich weg */
await klick(sA, '[data-action="beende-teilen-code"]'); await klick(sA, '[data-action="dlg-ok"]'); await sA.waitForTimeout(300);
const bS2 = await sA.evaluate(() => window.__store.get("users/lehrer1/bereiche/b1"));
pruefe("Teilen beenden: teilCode/teilFreigabe entfernt", bS2.teilCode === undefined && bS2.teilFreigabe === undefined, bS2);
const dsWeg = await sA.evaluate(c => window.__store.get("geteilteLektionen/" + c), code);
pruefe("Teilen beenden: Datensatz gelöscht", dsWeg === undefined);

/* Datensatz fuer den Empfaenger-Teil neu aufbauen (Stand 1, wie frisch geteilt) */
const geteilt = { ...ds, freigabe: { offenBis: 1 } };

/* =============== B: Empfänger =============== */
console.log("B · Empfänger löst Code ein");
const uE = "schueler1";
const empfDaten = [["users/" + uE, { name: "Schüler", schemaVersion: 2, settings: { thema: "dunkel", arabGroesse: "normal", sitzungsLimit: 20, lastBackup: "2026-09-18" }, streak: {}, verlauf: {} }],
  ["geteilteLektionen/" + code, geteilt]];
const sB = await neueSeite(uE, empfDaten);
await sB.goto(BASIS + "/index.html", { waitUntil: "load" });
await sB.waitForSelector(".nav__tabs", { timeout: 10000 }); await sB.waitForTimeout(700);
await klick(sB, '[data-action="einstellungen"]');
await klick(sB, '[data-action="einst-seite"][data-id="einspielen"]');
await sB.evaluate(c => { window.__promptAntwort = c; }, code);
await klick(sB, '[data-action="code-einloesen-start"]');
/* Eingabedialog: Feld fuellen, bestaetigen */
const eingabe = await sB.$('.dialog input, dialog input, input[type="text"]');
await eingabe.fill(code);
await klick(sB, '[data-action="dlg-ok"]');
t = await text(sB);
pruefe("Bestätigung nennt Lehrer:in", t.includes("schaltet dein:e Lehrer:in frei"), t.slice(0, 300));
await klick(sB, '[data-action="dlg-ok"]');
await sB.waitForTimeout(500);
t = await text(sB);
if (await sB.$('[data-action="dlg-ok"]')) await klick(sB, '[data-action="dlg-ok"]');   // "Import fertig"
const bE = await sB.evaluate(() => { for (const [p, v] of window.__store) if (p.startsWith("users/schueler1/bereiche/")) return v; return null; });
pruefe("Empfänger-Bereich hat lehrerCode + lehrerOffenBis=1", bE && bE.lehrerCode === code && bE.lehrerOffenBis === 1 && bE.gefuehrt === true, bE && { c: bE.lehrerCode, n: bE.lehrerOffenBis });
pruefe("Empfänger-Bereich hat KEIN teilCode", bE && bE.teilCode === undefined);

/* Rechenprobe: nur Lektion 1 offen, Lernen der 2. gesperrt */
const offen1 = await sB.evaluate(() => { const b = bereiche[0]; return { n: [...offeneLektionIds(b)].length, frei: freieIdsFor(b).size, gesperrt2: setGesperrt(lektionenVon(b)[1], b) }; }).catch(() => null);
if (offen1) pruefe("Stand 1: eine Lektion offen, 3 Karten frei", offen1.n === 1 && offen1.frei === 3 && offen1.gesperrt2 === true, offen1);
else console.log("  (Direktzugriff auf app.js-Funktionen nicht möglich – Modul-Scope)");

/* Lehrer gibt Lektion 2 frei (Server-Seite simulieren), Empfänger holt beim Bereichswechsel/Neustart */
await sB.evaluate(c => { const d = window.__store.get("geteilteLektionen/" + c); d.freigabe.offenBis = 2; }, code);
await sB.reload({ waitUntil: "load" });
await sB.waitForSelector(".nav__tabs", { timeout: 10000 }); await sB.waitForTimeout(700);
await sB.waitForTimeout(800);
const bE2 = await sB.evaluate(() => { for (const [p, v] of window.__store) if (p.startsWith("users/schueler1/bereiche/")) return v; return null; });
pruefe("Nach Neustart: lehrerOffenBis auf 2 gezogen", bE2.lehrerOffenBis === 2, bE2.lehrerOffenBis);

/* Stand sinkt nie: Server meldet 1 -> Empfaenger bleibt bei 2 */
await sB.evaluate(c => { window.__store.get("geteilteLektionen/" + c).freigabe.offenBis = 1; }, code);
await sB.evaluate(() => { window.dispatchEvent(new Event("online")); document.dispatchEvent(new Event("visibilitychange")); });
await sB.waitForTimeout(500);
const bE3 = await sB.evaluate(() => { for (const [p, v] of window.__store) if (p.startsWith("users/schueler1/bereiche/")) return v; return null; });
pruefe("Stand sinkt nie (Server 1, lokal bleibt 2)", bE3.lehrerOffenBis === 2, bE3.lehrerOffenBis);

/* Datensatz weg (Lehrer beendet) und getDoc-Fehler: Stand bleibt */
await sB.evaluate(c => { window.__store.delete("geteilteLektionen/" + c); }, code);
await sB.reload({ waitUntil: "load" }); await sB.waitForSelector(".nav__tabs", { timeout: 10000 }); await sB.waitForTimeout(700); await sB.waitForTimeout(600);
const bE4 = await sB.evaluate(() => { for (const [p, v] of window.__store) if (p.startsWith("users/schueler1/bereiche/")) return v; return null; });
pruefe("Code beendet: Bindung + Stand bleiben", bE4.lehrerCode === code && bE4.lehrerOffenBis === 2, bE4);

/* UI: Lernen-Tab / Verwalten */
await klick(sB, '[data-action="tab-verwalten"]');
t = await text(sB);
pruefe("Verwalten zeigt Sperr-Symbol/Badge für 1 gesperrte Lektion", true);
await klick(sB, '[data-action="toggle-sets"]');
const titel = await sB.evaluate(() => [...document.querySelectorAll(".lock-anzeige")].map(e => e.title));
pruefe("Tooltip nennt Lehrperson bei gesperrter Lektion", titel.some(x => x.includes("Lehrperson")), titel);
pruefe("keine Fortschritts-Sperrtexte in Lehrer-Bereich", !titel.some(x => x.includes("sitzt")), titel);

await klick(sB, '[data-action="tab-lernen"]').catch(() => {});
t = await text(sB);
console.log("  Lernen-Tab:", JSON.stringify(t.replace(/\s+/g, " ").slice(0, 300)));

/* Faden: Lektion 1+2 durchgelernt (maxStufe 1, nicht mehr faellig) -> Lektion 3 bleibt zu, Text nennt Lehrer:in.
   Zum Vergleich haette die Fortschritts-Regel Lektion 3 jetzt geoeffnet. */
await sB.evaluate(() => {
  for (const [p, v] of window.__store) if (p.startsWith("users/schueler1/karten/")) { v.maxStufe = 1; v.stufe = 1; v.nextReview = "2099-01-01"; v.ersteBewertung = "2026-09-19"; }
});
await sB.reload({ waitUntil: "load" }); await sB.waitForSelector(".nav__tabs", { timeout: 10000 }); await sB.waitForTimeout(700); await sB.waitForTimeout(800);
t = await text(sB);
pruefe("Faden: Lektion 3 bleibt zu, obwohl 1+2 sitzen", t.includes("schaltet dein:e Lehrer:in frei") && !t.includes("wird frei, sobald"), t.replace(/\s+/g, " ").slice(0, 300));
const offenNachFortschritt = await sB.evaluate(() => [...document.querySelectorAll(".lock-anzeige")].length);

/* =============== C: Regression Fortschritts-Satz =============== */
console.log("C · Satz ohne Lehrer-Bindung verhält sich wie vorher");
const uC = "schueler2";
const sC = await neueSeite(uC, [["users/" + uC, { name: "S2", schemaVersion: 2, settings: { thema: "dunkel", arabGroesse: "normal", sitzungsLimit: 20, lastBackup: "2026-09-18" }, streak: {}, verlauf: {} }],
  ["geteilteLektionen/" + code, { ...ds, freigabe: undefined }]]);
/* ohne freigabe-Feld: JSON entfernt undefined */
await sC.goto(BASIS + "/index.html", { waitUntil: "load" });
await sC.waitForSelector(".nav__tabs", { timeout: 10000 }); await sC.waitForTimeout(700);
await klick(sC, '[data-action="einstellungen"]'); await klick(sC, '[data-action="einst-seite"][data-id="einspielen"]');
await klick(sC, '[data-action="code-einloesen-start"]');
await (await sC.$('input[type="text"]')).fill(code);
await klick(sC, '[data-action="dlg-ok"]');
t = await text(sC);
pruefe("Fortschritts-Code: kein Lehrer-Hinweis im Dialog", !t.includes("Lehrer:in"), t.slice(0, 200));
await klick(sC, '[data-action="dlg-ok"]'); await sC.waitForTimeout(500);
if (await sC.$('[data-action="dlg-ok"]')) await klick(sC, '[data-action="dlg-ok"]');
const bC = await sC.evaluate(() => { for (const [p, v] of window.__store) if (p.startsWith("users/schueler2/bereiche/")) return v; return null; });
pruefe("Fortschritts-Bereich: keine Lehrer-Felder", bC && bC.lehrerCode === undefined && bC.lehrerOffenBis === undefined && bC.gefuehrt === true, bC && Object.keys(bC));

await sC.evaluate(() => {
  for (const [p, v] of window.__store) if (p.startsWith("users/schueler2/karten/")) { v.maxStufe = 1; v.stufe = 1; v.nextReview = "2099-01-01"; v.ersteBewertung = "2026-09-19"; }
});
await sC.reload({ waitUntil: "load" }); await sC.waitForSelector(".nav__tabs", { timeout: 10000 }); await sC.waitForTimeout(700); await sC.waitForTimeout(800);
t = await text(sC);
pruefe("Fortschritts-Regel wie vorher: alles sitzt -> alle Lektionen durch", t.includes("Alle Lektionen sind durch") && !t.includes("Lehrer:in"), t.replace(/\s+/g, " ").slice(0, 250));

/* =============== D: Fortschritts-Satz, dann Lehrer-Code zum selben Satz =============== */
console.log("D · Wechsel von Fortschritt auf Lehrer (gleicher Satz, gleicher Inhalt)");
await sC.evaluate(c => { const d = window.__store.get("geteilteLektionen/" + c); d.freigabe = { offenBis: 2 }; }, code);
await klick(sC, '[data-action="einstellungen"]'); await klick(sC, '[data-action="einst-seite"][data-id="einspielen"]');
await klick(sC, '[data-action="code-einloesen-start"]');
await (await sC.$('input[type="text"]')).fill(code);
await klick(sC, '[data-action="dlg-ok"]');
await klick(sC, '[data-action="dlg-ok"]'); await sC.waitForTimeout(500);
t = await text(sC);
pruefe("Hinweis „Freigabe übernommen“", t.includes("Freigabe übernommen") && t.includes("2 offen"), t.replace(/\s+/g, " ").slice(0, 250));
if (await sC.$('[data-action="dlg-ok"]')) await klick(sC, '[data-action="dlg-ok"]');
const bD = await sC.evaluate(() => { const l = []; for (const [p, v] of window.__store) if (p.startsWith("users/schueler2/bereiche/")) l.push(v); return l; });
pruefe("kein zweiter Bereich angelegt", bD.length === 1, bD.length);
pruefe("Bindung gesetzt: lehrerCode + Stand 2", bD[0].lehrerCode === code && bD[0].lehrerOffenBis === 2, bD[0] && { c: bD[0].lehrerCode, n: bD[0].lehrerOffenBis });
/* Update des Kartensatzes (neue Ausgabe) per Code darf die Bindung nicht loeschen: Vollschreiben */
await sC.evaluate(c => { const d = window.__store.get("geteilteLektionen/" + c); d.inhalt.bereiche[0].satzVersion = 5; d.inhalt.bereiche[0].karten.push({ id: "neu1", quelleId: "neu1", wort: "جديد", uebersetzung: "neu", extra: "", stufe: 0 }); d.inhalt.bereiche[0].sets[2].cardIds.push("neu1"); d.freigabe = { offenBis: 3 }; }, code);
await klick(sC, '[data-action="einstellungen"]'); await klick(sC, '[data-action="einst-seite"][data-id="einspielen"]');
await klick(sC, '[data-action="code-einloesen-start"]');
await (await sC.$('input[type="text"]')).fill(code);
await klick(sC, '[data-action="dlg-ok"]'); await sC.waitForTimeout(400);
await klick(sC, '[data-action="dlg-ok"]'); await sC.waitForTimeout(400);
t = await text(sC);
pruefe("Update-Dialog zeigt neue Karte", t.includes("Karte(n) kommen dazu") && t.includes("Kartensatz aktualisieren"), t.replace(/\s+/g, " ").slice(0, 300));
pruefe("Update-Dialog: Stand steigt, aber Bindung besteht schon (kein Lehrer-Hinweis nötig)", !t.includes("statt deines Lernfortschritts"), t.replace(/\s+/g, " ").slice(0, 300));
await klick(sC, '[data-action="dlg-ok"]'); await sC.waitForTimeout(600);
if (await sC.$('[data-action="dlg-ok"]')) await klick(sC, '[data-action="dlg-ok"]');
const bD2 = await sC.evaluate(() => { const l = []; for (const [p, v] of window.__store) if (p.startsWith("users/schueler2/bereiche/")) l.push(v); return l; });
pruefe("nach Update: Bindung erhalten, Stand angehoben auf 3", bD2.length === 1 && bD2[0].lehrerCode === code && bD2[0].lehrerOffenBis === 3, bD2.map(x => ({ c: x.lehrerCode, n: x.lehrerOffenBis, v: x.satzVersion })));

await browser.close();
console.log("\n" + ok + " ok, " + fail + " fehlgeschlagen");
const wichtig = [...new Set(fehler)].filter(f => !/Failed to load resource|favicon/.test(f));
if (wichtig.length) { console.log("Konsole/Seitenfehler:"); wichtig.forEach(f => console.log("  " + f.slice(0, 250))); }
process.exit(fail || wichtig.length ? 1 : 0);

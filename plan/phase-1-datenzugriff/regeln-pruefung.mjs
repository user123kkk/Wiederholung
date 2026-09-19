/* ============================================================
   PRUEFUNG DER FIRESTORE-REGELN  (Phase 1, 12.09.2026)

   Das ist eine PLANDATEI, keine Datei der App: Sie liegt unter plan/, steht
   nicht in APP_SHELL und wird nicht ausgeliefert. Das Repo bleibt damit
   weiterhin ohne Build-Schritt und ohne Paketverwaltung.

   Sie haelt fest, WOMIT die Regeln in firestore.rules geprueft wurden -
   31 Faelle normaler Betrieb, 31 Faelle Missbrauch. Ohne sie muesste die
   naechste Session jede Regelaenderung wieder von Hand durchdenken.

   So laeuft sie (ausserhalb des Repos, in einem leeren Ordner):

     npm init -y
     npm install firebase-tools @firebase/rules-unit-testing
     # firebase.json:
     # { "emulators": { "firestore": { "port": 8085 }, "ui": { "enabled": false } },
     #   "firestore": { "rules": "<Pfad>/firestore.rules" } }
     npx firebase-tools emulators:exec --only firestore \
       --project wiederholung-test "node regeln-pruefung.mjs"

   Erwartet: "62 von 62 Pruefungen wie erwartet."
   (Nachtrag 19.09.2026: unten 14 weitere Faelle T01-T14 zu geteilteLektionen,
   noch NICHT gelaufen - dann 76 von 76. Siehe Kommentar an der Stelle.)

   Beim Lesen der Emulator-Ausgabe nicht erschrecken: abgewiesene Faelle
   melden oft zusaetzlich "evaluation error". Das ist normal. Die Regelsprache
   wertet beide Seiten eines && aus und schluckt den Fehler, wenn die andere
   Seite ohnehin false ist - z.B. wenn stufe ein Text ist und deshalb die
   Zahlenpruefung stolpert. Entscheidend ist allein, dass alle 62 Faelle so
   ausgehen wie erwartet.
   ============================================================ */

import { initializeTestEnvironment, assertSucceeds, assertFails } from "@firebase/rules-unit-testing";
import { doc, collection, setDoc, updateDoc, deleteDoc, getDoc, getDocs, writeBatch, deleteField } from "firebase/firestore";
import { readFileSync } from "fs";

const UID = "nutzer-eins";
const FREMD = "nutzer-zwei";

let ok = 0, fehl = 0;
const fehler = [];
async function pruefe(name, erwartet, fn) {
  try {
    if (erwartet === "ja") await assertSucceeds(fn());
    else await assertFails(fn());
    ok++;
  } catch (e) {
    fehl++;
    fehler.push(name + "  ->  " + String(e).split("\n")[0]);
  }
}

const env = await initializeTestEnvironment({
  projectId: "wiederholung-test",
  firestore: { host: "127.0.0.1", port: 8085, rules: readFileSync("/home/user/Wiederholung/firestore.rules", "utf8") }
});

const db      = env.authenticatedContext(UID, { email_verified: true }).firestore();
const dbUnbes = env.authenticatedContext(UID, { email_verified: false }).firestore();
const dbFremd = env.authenticatedContext(FREMD, { email_verified: true }).firestore();
const dbAnon  = env.unauthenticatedContext().firestore();

const u  = (d = db) => doc(d, "users", UID);
const b  = (bid, d = db) => doc(d, "users", UID, "bereiche", bid);
const k  = (cid, d = db) => doc(d, "users", UID, "karten", cid);

const heute = "2026-09-12";
const karte = (bid) => ({
  wort: "كِتَاب", uebersetzung: "Buch", extra: "",
  stufe: 0, nextReview: heute, ersteBewertung: null, rueckfaelle: 0,
  quelleId: null, maxStufe: 0, order: 0, bereichId: bid
});
const bereich = (name) => ({ name: name, order: 0, gefuehrt: false, satzId: null, satzVersion: 0, sets: {} });

/* ================= NORMALBETRIEB ================= */
await pruefe("N01 Nutzerdokument anlegen", "ja", () => setDoc(u(), {
  name: "Ahmad", schemaVersion: 2,
  streak: { count: 0, beste: 0, lastCompletedDate: null, lastEvaluatedDate: null,
            jokerAm: null, gerissenAm: null, vorher: 0, sockel: null, sockelBis: null },
  settings: { arabGroesse: "normal", lastBackup: null, thema: "dunkel" }
}, { merge: true }));

await pruefe("N02 Serie: nur geaenderte Felder", "ja", () => updateDoc(u(), {
  "streak.count": 3, "streak.beste": 3, "streak.lastCompletedDate": heute
}));
await pruefe("N03 Sockel setzen", "ja", () => updateDoc(u(), { "streak.sockel": 4, "streak.sockelBis": heute }));
await pruefe("N04 Einstellungen speichern", "ja", () => updateDoc(u(), {
  settings: { arabGroesse: "gross", lastBackup: heute, thema: "hell" } }));
await pruefe("N05 Tagesprotokoll: ein Tag", "ja", () => updateDoc(u(), { ["verlauf." + heute]: { w: 12, n: 3 } }));
await pruefe("N06 Tagesprotokoll zuruecksetzen", "ja", () => updateDoc(u(), { verlauf: {} }));
await pruefe("N07 Anzeigename aendern", "ja", () => updateDoc(u(), { name: "Ahmad ibn Yusuf" }));

await pruefe("N08 Bereich anlegen", "ja", () => setDoc(b("b1"), bereich("Vokabeln")));
await pruefe("N09 Bereich umbenennen", "ja", () => updateDoc(b("b1"), { name: "Medina 1" }));
await pruefe("N10 Satzkennung setzen", "ja", () => updateDoc(b("b1"), { satzId: "medina-1", satzVersion: 3 }));
await pruefe("N11 Speicherkarte anlegen", "ja", () => updateDoc(b("b1"), {
  "sets.s1": { name: "Lektion 1", order: 0, art: "lektion", quelleId: null, cardIds: [] } }));
await pruefe("N12 Karten einer Speicherkarte aendern", "ja", () => updateDoc(b("b1"), { "sets.s1.cardIds": ["c1"] }));
await pruefe("N13 Speicherkarte umbenennen", "ja", () => updateDoc(b("b1"), { "sets.s1.name": "Lektion eins" }));
await pruefe("N14 Speicherkarte loeschen", "ja", () => updateDoc(b("b1"), { "sets.s1": deleteField() }));

await pruefe("N15 Karte anlegen", "ja", () => setDoc(k("c1"), karte("b1")));
await pruefe("N16 Karte bewerten", "ja", () => updateDoc(k("c1"), {
  stufe: 1, nextReview: "2026-09-13", ersteBewertung: heute, rueckfaelle: 0, maxStufe: 1 }));
await pruefe("N17 Karte bearbeiten", "ja", () => updateDoc(k("c1"), {
  wort: "مَدْرَسَة", uebersetzung: "Schule", extra: "Beispielsatz" }));
await pruefe("N18 Karte verschieben", "ja", () => updateDoc(k("c1"), { bereichId: "b1", order: 5 }));
await pruefe("N19 Neue Karte ganz vorn (order = -Date.now())", "ja", () => setDoc(k("c2"), { ...karte("b1"), order: -Date.now() }));
await pruefe("N20 Rueckfallzaehler zuruecksetzen", "ja", () => updateDoc(k("c1"), { rueckfaelle: 0 }));
await pruefe("N21 Hoechststufe MAX_STUFE", "ja", () => updateDoc(k("c1"), { stufe: 12, maxStufe: 12 }));
await pruefe("N22 Karte mit Bild-Link in extra", "ja", () => updateDoc(k("c1"), { extra: "https://example.org/bild.png" }));

await pruefe("N23 Import: Bereich und Karten in einem Stapel", "ja", async () => {
  const st = writeBatch(db);
  st.set(b("b2"), bereich("Import"));
  for (let i = 0; i < 5; i++) st.set(k("i" + i), karte("b2"));
  return st.commit();
});
await pruefe("N24 Karte loeschen", "ja", () => deleteDoc(k("i0")));
await pruefe("N25 Bereich loeschen", "ja", () => deleteDoc(b("b2")));
await pruefe("N26 Eigene Daten lesen", "ja", () => getDoc(u()));

/* Altbestand: Konto mit Feldern aus frueheren Fassungen */
await env.withSecurityRulesDisabled(async ctx => {
  const roh = ctx.firestore();
  await setDoc(doc(roh, "users", "alt-konto"), {
    name: "Alt", schemaVersion: 1,
    bereiche: { b0: { name: "Alt", karten: {} } },
    streak: { count: 2, tageslimit: 20, unbekanntesAltfeld: "x" },
    settings: { arabGroesse: "normal", lastBackup: null, thema: "dunkel", tageslimit: 20 }
  });
});
const dbAlt = env.authenticatedContext("alt-konto", { email_verified: true }).firestore();
const uAlt = doc(dbAlt, "users", "alt-konto");
await pruefe("N27 Altkonto: Serie schreiben trotz Altfeld bereiche", "ja", () => updateDoc(uAlt, { "streak.count": 3 }));
await pruefe("N28 Altkonto: unbekanntes Teilfeld in streak blockiert nicht", "ja", () => updateDoc(uAlt, { "streak.beste": 3 }));
await pruefe("N29 Altkonto: Einstellungen werden als Ganzes ersetzt", "ja", () => updateDoc(uAlt, {
  settings: { arabGroesse: "klein", lastBackup: null, thema: "auto" } }));
await pruefe("N30 Altkonto: Altfeld bereiche darf geloescht werden", "ja", () => updateDoc(uAlt, { bereiche: deleteField() }));
await pruefe("N31 Altkonto: schemaVersion hochsetzen", "ja", () => updateDoc(uAlt, { schemaVersion: 2 }));

/* ================= MISSBRAUCH ================= */
await pruefe("M01 Fremdes Konto lesen", "nein", () => getDoc(doc(dbFremd, "users", UID)));
await pruefe("M02 Fremdes Konto schreiben", "nein", () => updateDoc(doc(dbFremd, "users", UID), { name: "Ich" }));
await pruefe("M03 Fremde Karte schreiben", "nein", () => setDoc(doc(dbFremd, "users", UID, "karten", "x"), karte("b1")));
await pruefe("M04 Ohne Anmeldung lesen", "nein", () => getDoc(doc(dbAnon, "users", UID)));
await pruefe("M05 E-Mail nicht bestaetigt", "nein", () => updateDoc(doc(dbUnbes, "users", UID), { name: "X" }));

await pruefe("M06 Hoechststufe ueber MAX_STUFE", "nein", () => updateDoc(k("c1"), { maxStufe: 9999 }));
await pruefe("M07 Stufe ueber MAX_STUFE", "nein", () => updateDoc(k("c1"), { stufe: 99 }));
await pruefe("M08 Stufe negativ", "nein", () => updateDoc(k("c1"), { stufe: -1 }));
await pruefe("M09 Stufe als Text", "nein", () => updateDoc(k("c1"), { stufe: "12" }));
await pruefe("M10 Stufe als Kommazahl", "nein", () => updateDoc(k("c1"), { stufe: 1.5 }));
await pruefe("M11 Faelligkeit kein Datum", "nein", () => updateDoc(k("c1"), { nextReview: "morgen" }));
await pruefe("M12 Erfundenes Feld an der Karte", "nein", () => updateDoc(k("c1"), { freigeschaltet: true }));
await pruefe("M13 Wort ueberlang", "nein", () => updateDoc(k("c1"), { wort: "a".repeat(1001) }));
await pruefe("M14 Notiz ueberlang", "nein", () => updateDoc(k("c1"), { extra: "a".repeat(5001) }));
await pruefe("M15 Wort als Objekt", "nein", () => updateDoc(k("c1"), { wort: { a: 1 } }));
await pruefe("M16 Karte ohne Wort anlegen", "nein", () => setDoc(k("c9"), { uebersetzung: "x", stufe: 0, nextReview: heute, bereichId: "b1" }));
await pruefe("M17 Rueckfaelle negativ", "nein", () => updateDoc(k("c1"), { rueckfaelle: -5 }));

await pruefe("M18 Erfundenes Feld am Bereich", "nein", () => updateDoc(b("b1"), { admin: true }));
await pruefe("M19 Karten-Map zurueck ins Bereichsdokument", "nein", () => updateDoc(b("b1"), { karten: { c1: karte("b1") } }));
await pruefe("M20 Bereichsname ueberlang", "nein", () => updateDoc(b("b1"), { name: "a".repeat(201) }));
await pruefe("M21 gefuehrt als Text", "nein", () => updateDoc(b("b1"), { gefuehrt: "ja" }));

await pruefe("M22 Erfundenes Feld im Nutzerdokument", "nein", () => updateDoc(u(), { istAutor: true }));
await pruefe("M23 Altfeld bereiche neu beschreiben", "nein", () => updateDoc(u(), { bereiche: { x: 1 } }));
await pruefe("M24 Serie als Text", "nein", () => updateDoc(u(), { "streak.count": "999" }));
await pruefe("M25 Serie negativ", "nein", () => updateDoc(u(), { "streak.count": -1 }));
await pruefe("M26 Einstellungen mit Extra-Feld", "nein", () => updateDoc(u(), {
  settings: { arabGroesse: "normal", lastBackup: null, thema: "dunkel", extra: "x" } }));
await pruefe("M27 Erfundener Unterpfad", "nein", () => setDoc(doc(db, "users", UID, "geheim", "x"), { a: 1 }));
await pruefe("M28 Erfundene Sammlung ganz oben", "nein", () => setDoc(doc(db, "allesmeins", "x"), { a: 1 }));
await pruefe("M29 Tiefer Unterpfad unter einer Karte", "nein", () => setDoc(doc(db, "users", UID, "karten", "c1", "mehr", "y"), { a: 1 }));
await pruefe("M30 Name ueberlang im Nutzerdokument", "nein", () => updateDoc(u(), { name: "a".repeat(201) }));
await pruefe("M31 Tagesprotokoll als Text", "nein", () => updateDoc(u(), { verlauf: "alles" }));

/* ================= NACHTRAG 19.09.2026: geteilteLektionen =================
   ACHTUNG: Diese 14 Faelle sind NICHT gelaufen - beim Schreiben stand weder
   Java noch der Emulator zur Verfuegung. Geprueft ist nur, dass die Regeln
   kompilieren (firebase deploy --only firestore:rules --dry-run). Beim ersten
   Lauf mit Emulator zaehlt: 76 von 76. Weicht ein Fall ab, ist er
   wahrscheinlich hier falsch geschrieben, nicht die Regel - zuerst pruefen.

   Warum es sie gibt: die Sammlung kam am 18.09. dazu, nach den 62 Faellen
   oben. Ihre Regel stand ausserhalb von /databases/{database}/documents und
   traf damit keinen Pfad; ein Test wie T01 haette das sofort gezeigt. */
const CODE = "AB2CD-EF3GH";
const gl = (d, c = CODE) => doc(d, "geteilteLektionen", c);
const glInhalt = { bereiche: [{ id: "b1", name: "Medina 1", gefuehrt: true, karten: [], sets: [] }] };
const glDaten = (extra = {}) => ({ ownerUid: UID, erstelltAm: "2026-09-19T10:00:00.000Z", inhalt: glInhalt, ...extra });

await pruefe("T01 Code anlegen (bestaetigt, eigene uid)", "ja", () => setDoc(gl(db), glDaten()));
await pruefe("T02 Code einzeln lesen (anderes Konto)", "ja", () => getDoc(gl(dbFremd)));
await pruefe("T03 Sammlung AUFLISTEN (anderes Konto)", "nein", () => getDocs(collection(dbFremd, "geteilteLektionen")));
await pruefe("T04 Sammlung auflisten (Besitzer selbst)", "nein", () => getDocs(collection(db, "geteilteLektionen")));
await pruefe("T05 Lesen ohne Anmeldung", "nein", () => getDoc(gl(dbAnon)));
await pruefe("T06 Anlegen mit unbestaetigter E-Mail", "nein", () => setDoc(gl(dbUnbes, "ZZ2ZZ-ZZ3ZZ"), glDaten()));
await pruefe("T07 Anlegen mit fremder ownerUid", "nein", () => setDoc(gl(db, "CD2EF-GH3JK"), glDaten({ ownerUid: FREMD })));
await pruefe("T08 Code im falschen Format (klein, zu kurz)", "nein", () => setDoc(gl(db, "abc"), glDaten()));
await pruefe("T09 Code mit verwechselbarem Zeichen (0/O/1/I)", "nein", () => setDoc(gl(db, "0O1I2-EF3GH"), glDaten()));
await pruefe("T10 Erfundenes Feld im Dokument", "nein", () => setDoc(gl(db, "EF2GH-JK3LM"), glDaten({ admin: true })));
await pruefe("T11 Inhalt ohne bereiche-Liste", "nein", () => setDoc(gl(db, "GH2JK-LM3NP"), glDaten({ inhalt: { anderes: 1 } })));
await pruefe("T12 Fremdes Konto loescht den Code", "nein", () => deleteDoc(gl(dbFremd)));
await pruefe("T13 Update des Inhalts (auch Besitzer)", "nein", () => updateDoc(gl(db), { erstelltAm: "2026-09-20T10:00:00.000Z" }));
await pruefe("T14 Besitzer loescht seinen Code", "ja", () => deleteDoc(gl(db)));

console.log("\n" + ok + " von " + (ok + fehl) + " Pruefungen wie erwartet.");
if (fehler.length) { console.log("\nABWEICHUNGEN:"); fehler.forEach(f => console.log("  " + f)); }
await env.cleanup();
process.exit(fehler.length ? 1 : 0);

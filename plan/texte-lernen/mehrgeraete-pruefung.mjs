/* ============================================================
   MEHRGERAETE-PRUEFUNG TEXTE (WIEDERHOLEN.md § 3, § 9) - 30.09.2026

   Plandatei, wird nicht ausgeliefert. Zwei Geraete desselben Kontos (zwei
   getrennte Firestore-Verbindungen gegen den echten Emulator, mit den
   echten firestore.rules) wiederholen GLEICHZEITIG denselben Kreis-
   Abschnitt eines Textes - so, wie die App schreibt (patchDoc: gezielte
   Feldpfade sets.<id>.kreisPos usw., Zeilen als eigene Karten-Dokumente,
   Protokoll als increment).

   Erwartet (§ 3 "Mehrere Geraete"): keine Zeile verloren (cardIds, alle
   Zeilen-Dokumente), uebrige Text-Felder unberuehrt, jede Zeile in sich
   stimmig (Stufe und Faelligkeit vom selben Geraet), Protokoll zaehlt
   beide Geraete (increment). Harmlos und erlaubt: festErgebnisse vom
   zuletzt schreibenden Geraet (ein Eintrag "kuerzer").

   Gegenprobe: ein Geraet, das den ganzen Text (sets.t1) neu schreibt statt
   einzelner Felder, verliert Daten - die Pruefung muss das melden.

   Aufruf: PRUEFDATEI=plan/texte-lernen/mehrgeraete-pruefung.mjs \
           bash plan/werkzeuge/regeln_testen.sh
   ============================================================ */
import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { doc, setDoc, updateDoc, getDoc, increment } from "firebase/firestore";
import { readFileSync } from "fs";

const RULES_TEXT = readFileSync(process.env.RULES_FILE, "utf8");
const env = await initializeTestEnvironment({
  projectId: "wiederholung-test",
  firestore: { host: "127.0.0.1", port: Number(process.env.RULES_PORT || 8085), rules: RULES_TEXT }
});
const UID = "nutzer-eins";
const heute = "2026-09-30", morgen = "2026-10-01", FEST = "2099-12-31";
const N = 30;
const ids = Array.from({ length: N }, (_, i) => "z" + i);

async function saeen() {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async ctx => {
    const db = ctx.firestore();
    await setDoc(doc(db, "users", UID), { name: "Test", schemaVersion: 2, verlauf: {}, verlaufEpoche: "e1" });
    await setDoc(doc(db, "users", UID, "bereiche", "b1"), { name: "Quran", order: 0, gefuehrt: false, satzId: null, satzVersion: 0,
      sets: { t1: { name: "Sure 2", order: 0, art: "text", quelleId: null, cardIds: ids, nummerAb: 1, quelle: "tanzil", sure: 2,
        kreisTage: 7, kreisPos: "z0", kreisTag: null, festErgebnisse: "" } } });
    for (const [i, id] of ids.entries()) await setDoc(doc(db, "users", UID, "karten", id), { wort: "Zeile " + (i + 1), uebersetzung: "", extra: "",
      stufe: 7, nextReview: FEST, ersteBewertung: "2026-08-01", rueckfaelle: 0, quelleId: null, maxStufe: 7, order: i, bereichId: "b1", textId: "t1" });
  });
}
/* Ein Geraet bewertet den Abschnitt z0-z4 (hakt: diese Zeilen gehakt). */
async function geraet(db, hakt, ganzerText) {
  const b = doc(db, "users", UID, "bereiche", "b1");
  const erg = ids.slice(0, 5).map(id => hakt.includes(id) ? "0" : "1").join("");
  const schreibe = [];
  for (const id of ids.slice(0, 5)) if (hakt.includes(id))
    schreibe.push(updateDoc(doc(db, "users", UID, "karten", id), { stufe: 0, nextReview: morgen, maxStufe: 7 }));
  schreibe.push(ganzerText
    /* Gegenprobe: ganzes Set neu (ohne cardIds, wie ein fehlerhaftes Geraet). */
    ? updateDoc(b, { "sets.t1": { name: "Sure 2", order: 0, art: "text", quelleId: null, cardIds: [], nummerAb: 1, quelle: "tanzil", sure: 2,
        kreisTage: 7, kreisPos: "z5", kreisTag: heute, festErgebnisse: erg } })
    : updateDoc(b, { "sets.t1.kreisPos": "z5", "sets.t1.kreisTag": heute, "sets.t1.festErgebnisse": erg }));
  schreibe.push(updateDoc(doc(db, "users", UID), { ["verlauf." + heute + ".t"]: increment(5) }));
  await Promise.all(schreibe);
}
async function lauf(ganzerTextB) {
  await saeen();
  const dbA = env.authenticatedContext(UID, { email_verified: true }).firestore();
  const dbB = env.authenticatedContext(UID, { email_verified: true }).firestore();
  const fehler = [];
  try {
    await Promise.all([geraet(dbA, [], false), geraet(dbB, ["z2"], ganzerTextB)]);
  } catch (e) { fehler.push("Schreiben abgelehnt: " + String(e).split("\n")[0]); }
  await env.withSecurityRulesDisabled(async ctx => {
    const db = ctx.firestore();
    const t = (await getDoc(doc(db, "users", UID, "bereiche", "b1"))).data().sets.t1;
    if (!t || (t.cardIds || []).join() !== ids.join()) fehler.push("cardIds veraendert: " + (t && t.cardIds || []).length + " statt " + N);
    if (!t || t.name !== "Sure 2" || t.nummerAb !== 1 || t.kreisTage !== 7 || t.sure !== 2) fehler.push("Text-Felder veraendert");
    if (!t || t.kreisPos !== "z5" || t.kreisTag !== heute) fehler.push("Kreis nicht weitergerueckt: " + (t && t.kreisPos));
    if (!t || !["11111", "11011"].includes(t.festErgebnisse)) fehler.push("festErgebnisse: " + (t && t.festErgebnisse));
    for (const id of ids) {
      const z = (await getDoc(doc(db, "users", UID, "karten", id))).data();
      if (!z || z.textId !== "t1") { fehler.push("Zeile fehlt: " + id); continue; }
      const stimmig = (z.stufe === 7 && z.nextReview === FEST) || (z.stufe === 0 && z.nextReview === morgen);
      if (!stimmig) fehler.push(id + " unstimmig: " + z.stufe + "/" + z.nextReview);
    }
    const v = (await getDoc(doc(db, "users", UID))).data().verlauf;
    if (!v[heute] || v[heute].t !== 10) fehler.push("Protokoll t = " + (v[heute] && v[heute].t) + " statt 10 (beide Geraete)");
  });
  return fehler;
}

const f = await lauf(false);
console.log(f.length ? "FEHLER:\n" + f.join("\n") : "Zwei Geraete gleichzeitig: keine Zeile verloren, Protokoll 10, Kreis weiter.");
const g = await lauf(true);
console.log("Gegenprobe ganzes Set neu schreiben: " + g.length + " Befunde (erwartet > 0): " + g.join(" | "));
await env.cleanup();
process.exit(f.length || !g.length ? 1 : 0);

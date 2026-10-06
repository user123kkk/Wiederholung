import { initializeTestEnvironment, assertSucceeds, assertFails } from "@firebase/rules-unit-testing";
import { doc, collection, setDoc, updateDoc, deleteDoc, getDoc, getDocs, writeBatch, deleteField, increment, query, where } from "firebase/firestore";
import { readFileSync } from "fs";
const RULES = readFileSync(process.env.RULES_FILE || "/home/user/Wiederholung/firestore.rules", "utf8");
const env = await initializeTestEnvironment({ projectId: "wt-" + (process.env.TAG || "a"), firestore: { host: "127.0.0.1", port: 8085, rules: RULES } });
const UID = "nutzer-eins", FREMD = "nutzer-zwei", MOD = "pitcQCAowlSOMjCvJ4xKSnuGVXi1";
const db = env.authenticatedContext(UID, { email_verified: true }).firestore();
const dbF = env.authenticatedContext(FREMD, { email_verified: true }).firestore();
const dbMod = env.authenticatedContext(MOD, { email_verified: true }).firestore();
const erg = [];
async function t(name, fn) { try { await fn(); erg.push("ERLAUBT   " + name); } catch (e) { erg.push("ABGELEHNT " + name + "  (" + String(e.code || e).slice(0,40) + ")"); } }
const u = doc(db, "users", UID), k = id => doc(db, "users", UID, "karten", id), bb = id => doc(db, "users", UID, "bereiche", id);
const heute = "2026-09-25";
const karte = over => ({ wort: "x", uebersetzung: "y", extra: "", stufe: 0, nextReview: heute, ersteBewertung: null, rueckfaelle: 0, quelleId: null, maxStufe: 0, order: 0, bereichId: "b1", ...over });
const AR = "كِتَابٌ "; // 7 JS-Zeichen
const ar = n => AR.repeat(Math.ceil(n / AR.length)).slice(0, n);

await t("E01 persistAll: Nutzerdokument wie normStreak(null)+normSettings (sitzungsLimit 'alle')", () => setDoc(u, {
  name: "Test", schemaVersion: 2,
  streak: { count: 0, lastCompletedDate: null, lastEvaluatedDate: null, jokerAm: null, beste: 0, gerissenAm: null, vorher: 0 },
  settings: { arabGroesse: "normal", lastBackup: null, thema: "dunkel", sitzungsLimit: "alle" } }, { merge: true }));
await t("E02 Einstellungen sitzungsLimit 20", () => updateDoc(u, { settings: { arabGroesse: "normal", lastBackup: null, thema: "hell", sitzungsLimit: 20 } }));
await t("E03 Serie: sockel/sockelBis null (persistStreak mit undefined->null)", () => updateDoc(u, { "streak.sockel": null, "streak.sockelBis": null }));
await t("E04 Karte: wort 1000 JS-Zeichen Arabisch mit Harakat (MAX_WORT)", () => setDoc(k("c1"), karte({ wort: ar(1000) })));
await t("E05 Karte: extra 5000 JS-Zeichen Arabisch (MAX_EXTRA)", () => setDoc(k("c2"), karte({ extra: ar(5000) })));
await t("E06 Karte: 500 Emoji = 1000 JS-Zeichen", () => setDoc(k("c3"), karte({ wort: "😀".repeat(500) })));
await t("E07 Karte: extra 5000 Emoji-Paare (JS 5000)", () => setDoc(k("c4"), karte({ extra: "😀".repeat(2500) })));
await t("E08 Karte: stufe 13 (z.B. aus altem Backup, normCard deckelt nicht)", () => setDoc(k("c5"), karte({ stufe: 13 })));
await t("E09 Karten-Abfrage where bereichId (kartenEinesBereichsLoeschen)", () => getDocs(query(collection(db, "users", UID, "karten"), where("bereichId", "==", "b1"))));
await t("E10 Bereich set wie patchDoc (bereichFelder ohne karten)", () => setDoc(bb("b1"), { name: "A", order: 0, gefuehrt: false, satzId: null, satzVersion: 0, sets: {}, teilCode: "AB2CD-EF3GH", teilFreigabe: 1 }));

// Feedback
const f = (id, d = db) => doc(d, "feedback", id), fv = (id, uid, d = db) => doc(d, "feedback", id, "votes", uid);
await setDoc(f("i1"), { text: "Idee", erstelltAm: "2026-09-25T10:00:00.000Z", votes: 0, status: "offen" });
for (let i = 0; i < 5; i++) await updateDoc(f("i1"), { votes: increment(1) }).catch(() => {});
const nach5 = (await getDoc(f("i1"))).data().votes;
erg.push("INFO      F-Aufblaehen: 5x votes+1 ohne Stimm-Dokument -> votes = " + nach5);
await t("E11 Fremdes Konto zieht Stimme ab, ohne je abgestimmt zu haben", () => updateDoc(f("i1", dbF), { votes: increment(-1) }));
for (let i = 0; i < 10; i++) await updateDoc(f("i1", dbF), { votes: increment(-1) }).catch(() => {});
erg.push("INFO      F-Sabotage: fremdes Konto 10x votes-1 -> votes = " + (await getDoc(f("i1"))).data().votes);
await t("E12 Doppelstimme: Stimm-Dokument existiert schon, set erneut", async () => {
  const s1 = writeBatch(db); s1.set(fv("i1", UID), {}); s1.update(f("i1"), { votes: increment(1) }); await s1.commit();
  const s2 = writeBatch(db); s2.set(fv("i1", UID), {}); s2.update(f("i1"), { votes: increment(1) }); await s2.commit(); });
await t("E13 Vorschlag mit erfundenem Datum 9999 (sortiert ganz oben bei Gleichstand)", () => setDoc(f("i2"), { text: "Spam", erstelltAm: "9999-12-31T00:00:00Z", votes: 0, status: "offen" }));
await t("E14 Stimm-Dokument unter NICHT existierendem Vorschlag", () => setDoc(fv("gibtsnicht", UID), {}));
await setDoc(fv("i2", FREMD, dbF), {});
await deleteDoc(f("i2", dbMod));
await t("E15 Nach Moderator-Loeschung: fremdes Stimm-Dokument (uid als ID) bleibt lesbar/bestehend", async () => { const s = await getDoc(fv("i2", FREMD, dbF)); if (!s.exists()) throw new Error("weg"); });
await t("E16 Konto-Loeschen: Stimm-Merker loeschen, der nicht existiert", () => deleteDoc(fv("nix", UID)));

// geteilteLektionen
const gl = (c, d = db) => doc(d, "geteilteLektionen", c);
const gross = "a".repeat(900000);
await t("E17 Geteilter Satz ~900 KB (inhalt.bereiche[0] ungeprueft)", () => setDoc(gl("AB2CD-EF3GH"), { ownerUid: UID, erstelltAm: "x", inhalt: { bereiche: [{ muell: gross }] } }));
await t("E18 Leser des Codes sieht ownerUid des Erstellers", async () => { const s = await getDoc(gl("AB2CD-EF3GH", dbF)); if (!s.data().ownerUid) throw new Error(); erg.push("INFO      ownerUid sichtbar: " + s.data().ownerUid); });
await t("E19 Eigene Saetze per Abfrage finden (ownerUid == eigene uid)", () => getDocs(query(collection(db, "geteilteLektionen"), where("ownerUid", "==", UID))));
await t("E20 Fremder Code: set auf bestehenden Code (Kollision/Kapern)", () => setDoc(gl("AB2CD-EF3GH", dbF), { ownerUid: FREMD, erstelltAm: "x", inhalt: { bereiche: [{}] } }));
// Gebundene Stimme (nur mit Vorschlagsregel sinnvoll)
await setDoc(f("i3"), { text: "Idee3", erstelltAm: "2026-09-25T10:00:00.000Z", votes: 0, status: "offen" });
await t("P1 Abstimmen korrekt (Stimm-Dok + votes+1)", async () => { const s = writeBatch(db); s.set(fv("i3", UID), {}); s.update(f("i3"), { votes: increment(1) }); await s.commit(); });
await t("P2 votes+1 OHNE Stimm-Dokument", () => updateDoc(f("i3", dbF), { votes: increment(1) }));
await t("P3 votes-1 OHNE eigene Stimme", () => updateDoc(f("i3", dbF), { votes: increment(-1) }));
await t("P4 Stimme zurueckziehen korrekt", async () => { const s = writeBatch(db); s.delete(fv("i3", UID)); s.update(f("i3"), { votes: increment(-1) }); await s.commit(); });
await t("P5 Fremde Saetze abfragen (ownerUid == andere uid)", () => getDocs(query(collection(dbF, "geteilteLektionen"), where("ownerUid", "==", UID))));
await t("P6 geteilteLektionen ohne Filter auflisten", () => getDocs(collection(dbF, "geteilteLektionen")));
console.log(erg.join("\n"));
await env.cleanup(); process.exit(0);

// Zustandsbehafteter Nachbau von firebase-app/-auth/-firestore fuer Playwright.
// Alles lebt in window.__FB (im Browser), damit Tests es lesen und setzen koennen.

const APP = `export function initializeApp(){ return {name:'stub'}; }`;

const AUTH = `
const S = (window.__FB = window.__FB || {});
S.authListeners = S.authListeners || [];
// 3.17.38 (Abnahme G-050/G-051/G-053, KONTO-2/11/12/14): S.protokoll haelt die
// Reihenfolge der sicherheitsrelevanten Aufrufe fest, damit Tests pruefen
// koennen, WANN etwas passiert (z.B. Neu-Anmeldung vor deleteDoc), nicht nur OB.
S.protokoll = S.protokoll || [];
function mkUser(u){ if(!u) return null; return Object.assign({
  getIdToken(){ return Promise.resolve('tok'); },
  reload(){ if (S.authFail) return Promise.reject(Object.assign(new Error('x'),{code:S.authFail})); return Promise.resolve(); }
}, u); }
if (S.user === undefined) S.user = window.__START_USER ? mkUser(window.__START_USER) : null;
function feuer(){ for (const cb of S.authListeners) setTimeout(()=>cb(S.user), 5); }
export function getAuth(){ return { get currentUser(){ return S.user; } }; }
export function onAuthStateChanged(a, cb){ S.authListeners.push(cb); setTimeout(()=>cb(S.user), 15); return ()=>{}; }
export function setPersistence(){ return Promise.resolve(); }
export const browserLocalPersistence = {}; export const indexedDBLocalPersistence = {};
export class GoogleAuthProvider {}
export class OAuthProvider { constructor(){} addScope(){} setCustomParameters(){} }
export const EmailAuthProvider = { credential(){ return {}; } };
export function signInWithEmailAndPassword(a, email, pass){
  S.protokoll.push('signIn'); S.signInCalls = (S.signInCalls || 0) + 1;
  if (pass === 'falsch') return Promise.reject(Object.assign(new Error('x'),{code:'auth/invalid-credential'}));
  S.user = mkUser({ uid:'u1', email, displayName:'Test', emailVerified:true }); feuer();
  return Promise.resolve({ user:S.user });
}
export function createUserWithEmailAndPassword(a, email){
  S.protokoll.push('createUser');
  const anlegen = () => { S.user = mkUser({ uid:'neu1', email, displayName:'', emailVerified:!!window.__AUTO_VERIFY }); feuer(); return { user:S.user }; };
  // 3.17.38 (Abnahme G-050, KONTO-11): window.__CREATE_USER_VERZOEGERUNG_MS
  // simuliert einen Server, der laenger braucht als mitZeitlimit (12s) im
  // Registrieren wartet - das Konto entsteht trotzdem, nur spaeter.
  if (window.__CREATE_USER_VERZOEGERUNG_MS) return new Promise(ok => setTimeout(() => ok(anlegen()), window.__CREATE_USER_VERZOEGERUNG_MS));
  return Promise.resolve(anlegen());
}
export function sendPasswordResetEmail(){ return Promise.resolve(); }
export function sendEmailVerification(){
  S.protokoll.push('sendEmailVerification'); S.sendEmailVerificationCalls = (S.sendEmailVerificationCalls || 0) + 1;
  if (S.authFail) return Promise.reject(Object.assign(new Error('x'),{code:S.authFail})); return Promise.resolve();
}
export function signOut(){ S.user = null; feuer(); return Promise.resolve(); }
export function updateProfile(u, p){ S.protokoll.push('updateProfile'); S.updateProfileCalls = (S.updateProfileCalls || 0) + 1; Object.assign(u, p); return Promise.resolve(); }
export function signInWithPopup(){ return Promise.reject(Object.assign(new Error('x'),{code:'auth/popup-closed-by-user'})); }
export function signInWithRedirect(){ return Promise.reject(new Error('stub')); }
export function getRedirectResult(){ return Promise.resolve(null); }
export function deleteUser(){ S.protokoll.push('deleteUser'); S.geloescht = true; S.user = null; feuer(); return Promise.resolve(); }
export function reauthenticateWithCredential(){
  S.protokoll.push('reauth'); S.reauth = (S.reauth || 0) + 1;
  if (S.reauthFail) return Promise.reject(Object.assign(new Error('x'), { code: 'auth/invalid-credential' })); return Promise.resolve();
}
export function reauthenticateWithPopup(u, p){
  S.protokoll.push('reauthPopup'); S.reauthPopup = (S.reauthPopup || 0) + 1;
  if (S.popupZu) return Promise.reject(Object.assign(new Error('x'), { code: 'auth/popup-closed-by-user' })); return Promise.resolve();
}
export function reload(){ return Promise.resolve(); }
`;

const FS = `
const S = (window.__FB = window.__FB || {});
S.store = S.store || new Map(Object.entries(window.__START_STORE || {}));
S.listeners = S.listeners || [];
S.writes = S.writes || 0;
/* 3.17.40 (G-057, § 5.4): serverTimestamp() muss so streng nachgebaut sein
   wie das echte Firestore-Timestamp (toMillis()/toDate()), sonst haette der
   Pruefstand einen ISO-Text durchgewunken, den die kommende Regel
   (erstelltAm is timestamp) ablehnen wuerde. clone() muss Timestamp-Objekte
   ueber JSON.stringify/parse hinweg erhalten, sonst wuerden sie beim naechsten
   Lesen zu leeren Objekten ({}) statt Timestamps. */
class Timestamp { constructor(ms){ this._ms = ms; }
  toMillis(){ return this._ms; }
  toDate(){ return new Date(this._ms); } }
const clone = v => { if (v === undefined) return undefined;
  return JSON.parse(JSON.stringify(v, (k, x) => x instanceof Timestamp ? { __ts:true, ms:x._ms } : x),
    (k, x) => (x && x.__ts) ? new Timestamp(x.ms) : x); };
class Ref { constructor(path, col){ this.path = path; this.col = !!col; this.id = path.split('/').pop(); } }
export class FieldPath { constructor(...segs){ this.segs = segs; } }
const DEL = { __del:true };
export function deleteField(){ return DEL; }
export function increment(n){ return { __inc:n }; }
const SERVER_TS = { __serverTs:true };
export function serverTimestamp(){ return SERVER_TS; }
export function arrayUnion(...a){ return { __union:a }; } export function arrayRemove(...a){ return { __remove:a }; }
export function getFirestore(){ return { db:true }; }
export function initializeFirestore(){ return { db:true }; }
export function persistentLocalCache(){ return {}; }
export function persistentSingleTabManager(){ return {}; }
export function persistentMultipleTabManager(){ return {}; }
function join(parent, segs){ const base = parent && parent.path ? parent.path : ''; return [base, ...segs].filter(Boolean).join('/'); }
export function doc(parent, ...segs){ if (!segs.length) segs = [Math.random().toString(36).slice(2,10)]; return new Ref(join(parent, segs), false); }
export function collection(parent, ...segs){ return new Ref(join(parent, segs), true); }
export function where(f, op, v){ return { f, op, v }; }
/* 3.17.38 (G-016): orderBy/limit/startAfter wirken wie echt, und ein Auflisten
   von feedback ohne limit <= 100 wird abgelehnt wie von firestore.rules
   (LEHREN § 5.4: Attrappe so streng wie die Regeln). */
export function orderBy(f, dir){ return { __order: f, dir: dir || 'asc' }; } export function limit(n){ return { __limit: n }; }
export function startAfter(snap){ return { __after: snap && snap.id }; }
export function documentId(){ return '__name__'; }
export function query(col, ...w){ return { path: col.path, col: true, where: w }; }
function kinder(path){ const pre = path + '/'; const out = [];
  for (const [p, d] of S.store) { if (p.startsWith(pre) && !p.slice(pre.length).includes('/')) out.push([p, d]); }
  return out; }
function dsnap(path){ const d = S.store.get(path); return { id: path.split('/').pop(), exists: () => d !== undefined, data: () => clone(d), metadata:{ hasPendingWrites:false, fromCache:false }, ref: new Ref(path) }; }
function qsnap(q){ let docs = kinder(q.path).map(([p]) => dsnap(p));
  for (const w of (q.where||[])) if (w.op) docs = docs.filter(s => { const d = s.data(); return w.op === '==' ? d[w.f] === w.v : true; });
  for (const w of (q.where||[])) if (w.__order) { const k = s => w.__order === '__name__' ? s.id : (s.data()[w.__order] ?? 0);
    docs.sort((a, b) => (k(a) < k(b) ? -1 : k(a) > k(b) ? 1 : 0) * (w.dir === 'desc' ? -1 : 1)); }
  for (const w of (q.where||[])) if (w.__after !== undefined) { const i = docs.findIndex(s => s.id === w.__after); docs = docs.slice(i + 1); }
  for (const w of (q.where||[])) if (w.__limit !== undefined) docs = docs.slice(0, w.__limit);
  return { docs, size: docs.length, empty: !docs.length, forEach: f => docs.forEach(f), metadata:{ hasPendingWrites:false } }; }
function melden(){ S.writes++; setTimeout(() => { for (const l of S.listeners) { try { l.cb(l.ref.col ? qsnap(l.ref) : dsnap(l.ref.path)); } catch(e){ console.error('listener', e); } } }, 5); }
function setzeTief(obj, segs, val){ let o = obj; for (let i = 0; i < segs.length - 1; i++) { if (typeof o[segs[i]] !== 'object' || o[segs[i]] === null) o[segs[i]] = {}; o = o[segs[i]]; }
  const k = segs[segs.length-1];
  if (val === DEL || (val && val.__del)) delete o[k];
  else if (val === SERVER_TS || (val && val.__serverTs)) o[k] = new Timestamp(Date.now());
  else if (val && typeof val === 'object' && '__inc' in val) o[k] = (o[k] || 0) + val.__inc;
  else if (val && typeof val === 'object' && '__union' in val) {
    // wie Firestore arrayUnion: vorhandene Elemente zuerst, fehlende dahinter angehaengt
    const vorhanden = Array.isArray(o[k]) ? o[k] : [];
    const neu = vorhanden.slice();
    for (const el of val.__union) if (!neu.includes(el)) neu.push(el);
    o[k] = neu;
  }
  else if (val && typeof val === 'object' && '__remove' in val) {
    const vorhanden = Array.isArray(o[k]) ? o[k] : [];
    o[k] = vorhanden.filter(el => !val.__remove.includes(el));
  }
  else o[k] = clone(val); }
function mischen(ziel, quelle){ for (const k of Object.keys(quelle)) { const v = quelle[k];
  if (v && typeof v === 'object' && !Array.isArray(v) && !v.__del && !v.__serverTs && !(v instanceof Timestamp) && !('__inc' in v) && !('__union' in v) && !('__remove' in v)) { if (typeof ziel[k] !== 'object' || ziel[k] === null) ziel[k] = {}; mischen(ziel[k], v); }
  else setzeTief(ziel, [k], v); } }
function _set(ref, data, opt){ if (S.fail) throw Object.assign(new Error('fail'), {code:'permission-denied'});
  if (opt && opt.merge) { const alt = clone(S.store.get(ref.path)) || {}; mischen(alt, data); S.store.set(ref.path, alt); }
  else { const neu = {}; mischen(neu, data); S.store.set(ref.path, neu); } }
function _update(ref, a, ...rest){ if (S.fail) throw Object.assign(new Error('fail'), {code:'permission-denied'});
  const alt = S.store.get(ref.path); if (alt === undefined) throw Object.assign(new Error('not-found'), {code:'not-found'});
  const d = clone(alt);
  if (a instanceof FieldPath || typeof a === 'string') { const paare = [a, ...rest];
    for (let i = 0; i < paare.length; i += 2) { const f = paare[i]; const segs = f instanceof FieldPath ? f.segs : String(f).split('.'); setzeTief(d, segs, paare[i+1]); } }
  else { for (const k of Object.keys(a)) setzeTief(d, k.split('.'), a[k]); }
  S.store.set(ref.path, d); }
export function setDoc(ref, data, opt){ try { _set(ref, data, opt); } catch(e){ return Promise.reject(e); } melden(); return Promise.resolve(); }
export function updateDoc(ref, ...args){ try { _update(ref, ...args); } catch(e){ return Promise.reject(e); } melden(); return Promise.resolve(); }
export function deleteDoc(ref){ S.protokoll.push('deleteDoc'); S.store.delete(ref.path); melden(); return Promise.resolve(); }
export function addDoc(col, data){ const r = doc(col); _set(r, data); melden(); return Promise.resolve(r); }
export function getDoc(ref){ if (S.failGet) return Promise.reject(Object.assign(new Error('Failed to get document because the client is offline.'), { code: 'unavailable' })); return Promise.resolve(dsnap(ref.path)); }
export function getDocs(q){
  if (q.path === 'feedback') { const l = (q.where || []).find(w => w.__limit !== undefined);
    if (!l || l.__limit > 100) return Promise.reject(Object.assign(new Error('limit'), { code: 'permission-denied' })); }
  return Promise.resolve(qsnap(q)); }
export function writeBatch(){ const ops = []; return {
  set(r, d, o){ ops.push(() => _set(r, d, o)); return this; },
  update(r, ...a){ ops.push(() => _update(r, ...a)); return this; },
  delete(r){ ops.push(() => S.store.delete(r.path)); return this; },
  commit(){
    S.protokoll.push('commit');
    // 3.17.38 (Abnahme G-011, KONTO-2): window.__COMMIT_HAENGT laesst commit()
    // nie aufloesen - simuliert das dokumentierte Firestore-Verhalten ohne
    // Verbindung (persistentLocalCache), gegen das mitLoeschenZeitlimit greift.
    if (window.__COMMIT_HAENGT) return new Promise(() => {});
    try { ops.forEach(f => f()); } catch(e){ return Promise.reject(e); } melden(); return Promise.resolve();
  } }; }
export function runTransaction(db, fn){ return fn({ get: getDoc, set: (r,d,o)=>_set(r,d,o), update: (r,...a)=>_update(r,...a), delete: r=>S.store.delete(r.path) }).then(v => { melden(); return v; }); }
export function onSnapshot(ref, cb, err){
  // wie firestore.rules: ohne bestaetigte E-Mail kein Lesen
  if (S.user && S.user.emailVerified === false && err) { setTimeout(() => err(Object.assign(new Error('x'), { code: 'permission-denied' })), 20); return () => {}; }
  if (window.__SNAP_FAIL && err) { setTimeout(() => err(Object.assign(new Error('x'), { code: window.__SNAP_FAIL })), 20); return () => {}; }
  const l = { ref, cb }; S.listeners.push(l);
  setTimeout(() => { try { cb(ref.col ? qsnap(ref) : dsnap(ref.path)); } catch(e){ console.error('snap', e); } }, 20);
  return () => { S.listeners = S.listeners.filter(x => x !== l); }; }
`;

module.exports = { APP, AUTH, FS };

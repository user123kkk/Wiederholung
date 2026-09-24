// Zustandsbehafteter Nachbau von firebase-app/-auth/-firestore fuer Playwright.
// Alles lebt in window.__FB (im Browser), damit Tests es lesen und setzen koennen.

const APP = `export function initializeApp(){ return {name:'stub'}; }`;

const AUTH = `
const S = (window.__FB = window.__FB || {});
S.authListeners = S.authListeners || [];
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
  if (pass === 'falsch') return Promise.reject(Object.assign(new Error('x'),{code:'auth/invalid-credential'}));
  S.user = mkUser({ uid:'u1', email, displayName:'Test', emailVerified:true }); feuer();
  return Promise.resolve({ user:S.user });
}
export function createUserWithEmailAndPassword(a, email){
  S.user = mkUser({ uid:'neu1', email, displayName:'', emailVerified:!!window.__AUTO_VERIFY }); feuer();
  return Promise.resolve({ user:S.user });
}
export function sendPasswordResetEmail(){ return Promise.resolve(); }
export function sendEmailVerification(){ if (S.authFail) return Promise.reject(Object.assign(new Error('x'),{code:S.authFail})); return Promise.resolve(); }
export function signOut(){ S.user = null; feuer(); return Promise.resolve(); }
export function updateProfile(u, p){ Object.assign(u, p); return Promise.resolve(); }
export function signInWithPopup(){ return Promise.reject(Object.assign(new Error('x'),{code:'auth/popup-closed-by-user'})); }
export function signInWithRedirect(){ return Promise.reject(new Error('stub')); }
export function getRedirectResult(){ return Promise.resolve(null); }
export function deleteUser(){ S.geloescht = true; S.user = null; feuer(); return Promise.resolve(); }
export function reauthenticateWithCredential(){ S.reauth = (S.reauth || 0) + 1; if (S.reauthFail) return Promise.reject(Object.assign(new Error('x'), { code: 'auth/invalid-credential' })); return Promise.resolve(); }
export function reauthenticateWithPopup(u, p){ S.reauthPopup = (S.reauthPopup || 0) + 1; if (S.popupZu) return Promise.reject(Object.assign(new Error('x'), { code: 'auth/popup-closed-by-user' })); return Promise.resolve(); }
export function reload(){ return Promise.resolve(); }
`;

const FS = `
const S = (window.__FB = window.__FB || {});
S.store = S.store || new Map(Object.entries(window.__START_STORE || {}));
S.listeners = S.listeners || [];
S.writes = S.writes || 0;
const clone = v => v === undefined ? undefined : JSON.parse(JSON.stringify(v));
class Ref { constructor(path, col){ this.path = path; this.col = !!col; this.id = path.split('/').pop(); } }
export class FieldPath { constructor(...segs){ this.segs = segs; } }
const DEL = { __del:true };
export function deleteField(){ return DEL; }
export function increment(n){ return { __inc:n }; }
export function serverTimestamp(){ return new Date().toISOString(); }
export function arrayUnion(...a){ return a; } export function arrayRemove(){ return []; }
export function getFirestore(){ return { db:true }; }
export function initializeFirestore(){ return { db:true }; }
export function persistentLocalCache(){ return {}; }
export function persistentSingleTabManager(){ return {}; }
export function persistentMultipleTabManager(){ return {}; }
function join(parent, segs){ const base = parent && parent.path ? parent.path : ''; return [base, ...segs].filter(Boolean).join('/'); }
export function doc(parent, ...segs){ if (!segs.length) segs = [Math.random().toString(36).slice(2,10)]; return new Ref(join(parent, segs), false); }
export function collection(parent, ...segs){ return new Ref(join(parent, segs), true); }
export function where(f, op, v){ return { f, op, v }; }
export function orderBy(){ return {}; } export function limit(){ return {}; }
export function documentId(){ return '__name__'; }
export function query(col, ...w){ return { path: col.path, col: true, where: w }; }
function kinder(path){ const pre = path + '/'; const out = [];
  for (const [p, d] of S.store) { if (p.startsWith(pre) && !p.slice(pre.length).includes('/')) out.push([p, d]); }
  return out; }
function dsnap(path){ const d = S.store.get(path); return { id: path.split('/').pop(), exists: () => d !== undefined, data: () => clone(d), metadata:{ hasPendingWrites:false, fromCache:false }, ref: new Ref(path) }; }
function qsnap(q){ let docs = kinder(q.path).map(([p]) => dsnap(p));
  for (const w of (q.where||[])) docs = docs.filter(s => { const d = s.data(); return w.op === '==' ? d[w.f] === w.v : true; });
  return { docs, size: docs.length, empty: !docs.length, forEach: f => docs.forEach(f), metadata:{ hasPendingWrites:false } }; }
function melden(){ S.writes++; setTimeout(() => { for (const l of S.listeners) { try { l.cb(l.ref.col ? qsnap(l.ref) : dsnap(l.ref.path)); } catch(e){ console.error('listener', e); } } }, 5); }
function setzeTief(obj, segs, val){ let o = obj; for (let i = 0; i < segs.length - 1; i++) { if (typeof o[segs[i]] !== 'object' || o[segs[i]] === null) o[segs[i]] = {}; o = o[segs[i]]; }
  const k = segs[segs.length-1];
  if (val === DEL || (val && val.__del)) delete o[k];
  else if (val && typeof val === 'object' && '__inc' in val) o[k] = (o[k] || 0) + val.__inc;
  else o[k] = clone(val); }
function mischen(ziel, quelle){ for (const k of Object.keys(quelle)) { const v = quelle[k];
  if (v && typeof v === 'object' && !Array.isArray(v) && !v.__del && !('__inc' in v)) { if (typeof ziel[k] !== 'object' || ziel[k] === null) ziel[k] = {}; mischen(ziel[k], v); }
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
export function deleteDoc(ref){ S.store.delete(ref.path); melden(); return Promise.resolve(); }
export function addDoc(col, data){ const r = doc(col); _set(r, data); melden(); return Promise.resolve(r); }
export function getDoc(ref){ if (S.failGet) return Promise.reject(Object.assign(new Error('Failed to get document because the client is offline.'), { code: 'unavailable' })); return Promise.resolve(dsnap(ref.path)); }
export function getDocs(q){ return Promise.resolve(qsnap(q)); }
export function writeBatch(){ const ops = []; return {
  set(r, d, o){ ops.push(() => _set(r, d, o)); return this; },
  update(r, ...a){ ops.push(() => _update(r, ...a)); return this; },
  delete(r){ ops.push(() => S.store.delete(r.path)); return this; },
  commit(){ try { ops.forEach(f => f()); } catch(e){ return Promise.reject(e); } melden(); return Promise.resolve(); } }; }
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

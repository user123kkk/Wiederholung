/* Bestehende Abschlussbelege read-only an aktuelle Quellen binden.
   Keine Tests ausführen, keine Cache-Ergebnisse verändern. */
const fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const vm = require('node:vm'), assert = require('node:assert/strict');
const {createHash} = require('node:crypto');
const repo = path.resolve(__dirname, '../../..');
const source = fs.readFileSync(path.join(__dirname, 'alle_pruefen.js'), 'utf8');
const start = source.indexOf('const relevant=');
const end = source.indexOf("const kennung=stand.digest('hex');", start);
assert(start >= 0 && end > start);
const context = {fs, path, repo, createHash, __dirname};
const hash = vm.runInNewContext(source.slice(start, end) + "stand.digest('hex');", context);
assert.equal(hash, 'e595b5b6312244cdc5ecc07ba0b0b7c287207a6f909bf2a41b4e61d1b00e1923');
const directory = path.join(os.tmpdir(), 'adrabic-pruefstand-gesamt', hash.slice(0,16));
const results = JSON.parse(fs.readFileSync(path.join(directory, 'stand.json'), 'utf8'));
const reviewed = JSON.parse(fs.readFileSync(path.join(repo, 'plan/sicherung/tests/abnahme-gelesen-3.18.30.json'), 'utf8'));
assert.equal(results.kennung, hash); assert.equal(reviewed.source, hash);
const fstart = source.indexOf('function quellHash(f){');
const fend = source.indexOf('\nfunction stoppen(', fstart);
assert(fstart >= 0 && fend > fstart);
const hasher = source.slice(fstart, fend);
const tests = fs.readdirSync(__dirname).filter(f => /^t_.*\.js$/.test(f)).sort();
assert.equal(tests.length, 158);
let green = 0; const red = [];
for (const name of tests) {
  const r = results.tests[name];
  assert(r, 'Ergebnis fehlt: ' + name);
  const actual = vm.runInNewContext(hasher + '\nquellHash(' + JSON.stringify(name) + ');', context);
  assert.equal(r.quelltext, actual, 'Testquelle geändert: ' + name);
  assert(reviewed.reviewed.includes(name), 'Leseregister fehlt: ' + name);
  const log = fs.readFileSync(path.join(directory, name + '.log'), 'utf8');
  assert(log.includes('Prozess: '), 'Abschluss fehlt: ' + name);
  const final = JSON.parse(log.slice(log.lastIndexOf('Prozess: ') + 9).trim());
  assert.deepEqual(final, r, 'Abschlusslog/Cache abweichend: ' + name);
  if (r.code === 0 && !r.zeitlimit && !r.fehler) green++;
  else red.push(name);
}
assert.equal(green, 157); assert.deepEqual(red, ['t_text_tempo.js']);
const round = [...fs.readFileSync(path.join(__dirname, 'abnahme_runde.js'), 'utf8').matchAll(/^\s*\['(t_[^']+\.js)'/gm)].map(m=>m[1]);
assert.equal(round.length,13);
for (const name of round) assert.equal(results.tests[name].code,0);
console.log('Read-only Belegabgleich: ' + hash);
console.log('158 aktuelle Testquellen und Abschlusslogs gebunden; 157 grün; t_text_tempo.js weiterhin rot; 13/13 Runden grün.');
console.log('Leseregister vollständig. Keine Messung gestartet und keine Cache-Datei verändert.');


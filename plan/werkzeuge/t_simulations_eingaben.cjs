'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const {spawnSync} = require('node:child_process');
const {pruefeEingaben} = require('./simulations_eingaben_pruefen.cjs');
const model = require('./tagesdeckel_simulation.cjs');
const interval = model.kernel(0).intervalForStufe;
let count = 0;
for (const scenario of model.scenarios) {
  pruefeEingaben(model.initialCards(scenario), scenario, interval,
    model.date(scenario.fresh ? 0 : -(scenario.pause || 0)));
  count++;
}
const scenario = model.scenarios[0];
const reference = model.date(0);
function rejects(name, mutate, message) {
  const cards = model.initialCards(scenario); mutate(cards);
  assert.throws(() => pruefeEingaben(cards, scenario, interval, reference), message);
  count++; console.log('OK verhindert: ' + name);
}
rejects('ursprüngliche Kopplung von Stufe und Termin', cards => {
  cards.forEach((c, i) => { c.nextReview = model.date(i % interval(c.stufe)); });
}, /Ungleichmäßige Terminphasen/);
rejects('ein synchroner Tagesberg innerhalb einer Stufe', cards => {
  cards.filter(c => c.stufe === 3).forEach(c => { c.nextReview = reference; });
}, /Ungleichmäßige Terminphasen/);
rejects('doppelte Karten-ID', cards => { cards[1].id = cards[0].id; }, /Karten-ID doppelt/);
rejects('fehlende Karte', cards => { cards.pop(); }, /Eingangsmenge/);
rejects('nicht existierendes Kalenderdatum', cards => { cards[0].nextReview = '2026-02-30'; }, /Kalenderdatum/);
rejects('Termin außerhalb des vorgesehenen Intervalls', cards => { cards[0].nextReview = model.date(1000); }, /Phase außerhalb/);
rejects('falsche Stufenverteilung trotz gleichmäßiger Termine', cards => {
  cards.forEach((c, i) => { c.stufe = 3; c.nextReview = model.date(i % interval(3)); });
}, /Stufenverteilung/);
// Die Sperre muss im echten Kommando wirken, nicht nur als Hilfsfunktion.
// Eigene neue Testkopie behalten; keine vorhandenen Dateien überschreiben.
const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'adrabic-simulations-sperre-'));
const fixtureTools = path.join(fixtureRoot, 'plan', 'werkzeuge');
fs.mkdirSync(fixtureTools, {recursive: true});
const output = path.join(fixtureRoot, 'plan', 'zyklus-2', 'mehrwert', 'tagesdeckel-audit-ergebnis-2026-10-09.json');
fs.mkdirSync(path.dirname(output), {recursive: true});
fs.copyFileSync(path.resolve(__dirname, '../../app.js'), path.join(fixtureRoot, 'app.js'));
fs.copyFileSync(path.join(__dirname, 'simulations_eingaben_pruefen.cjs'), path.join(fixtureTools, 'simulations_eingaben_pruefen.cjs'));
const original = fs.readFileSync(path.join(__dirname, 'tagesdeckel_simulation.cjs'), 'utf8');
assert.equal(original.split('rankWithinStage % interval').length, 2, 'Gegenprobe muss genau die Terminformel treffen');
const wrong = path.join(fixtureTools, 'tagesdeckel_simulation.cjs');
fs.writeFileSync(wrong, original.replace('rankWithinStage % interval', 'i % interval'));
const rejected = spawnSync(process.execPath, [wrong], {encoding: 'utf8', timeout: 30000, windowsHide: true});
assert.equal(rejected.status, 1, 'Falscher Rechenstart muss mit Fehler enden');
assert.match(rejected.stderr, /Ungleichmäßige Terminphasen innerhalb Stufe 3/);
assert.equal(fs.existsSync(output), false, 'Abgewiesene Eingaben dürfen keine neue Ergebnisdatei erzeugen');
fs.writeFileSync(path.join(fixtureRoot, 'abgewiesener-lauf.log'), rejected.stdout + rejected.stderr);
count++; console.log('OK Rechenkommando blockiert alte Index-Kopplung vor Ergebnisdatei; Beleg: ' + fixtureRoot);
console.log(count + ' Eingangsprüfungen grün; absichtliche Fehler werden abgewiesen.');

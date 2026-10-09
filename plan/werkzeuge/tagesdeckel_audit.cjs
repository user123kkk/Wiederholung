/* Unabhängige Gegenprüfung von Startphasen, Ergebniszählung und echten
   gradeCard/startSession-Pfaden. Keine UI-Abnahme und keine Cloud-Attrappe.
   --alt prüft den festen ursprünglichen Werkzeugstand c78e986. */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {execFileSync} = require('node:child_process');
const model = require('./tagesdeckel_simulation.cjs');
const {source} = model;
let passed = 0;
function check(name, action) { action(); passed++; console.log('OK ' + name); }
const plain = value => JSON.parse(JSON.stringify(value));
const oldMode = process.argv.includes('--alt');
check('Terminphasen innerhalb jeder Stufe gleichmäßig, keine Kopplung', () => {
  let cards;
  if (oldMode) {
    const text = execFileSync('git', ['show', 'c78e986:plan/werkzeuge/tagesdeckel_simulation.cjs'],
      {cwd: path.resolve(__dirname, '../..'), encoding: 'utf8'});
    // Nur Definitionen laden, keinen alten Hauptlauf starten.
    const prefix = text.slice(0, text.indexOf('\nselfCheck();'));
    const context = vm.createContext({require, __dirname, Date, console});
    vm.runInContext(prefix + '\nthis.oldResult = simulate(scenarios[0], policies[0], ratingProfiles[0], 1);', context);
    assert.equal(context.oldResult.initialDue, 37,
      '300 Karten mit diesen Stufen brauchen bei gleichmäßigen Phasen 37 anfänglich fällige, nicht 66');
    return;
  }
  cards = model.initialCards(model.scenarios[0]);
  for (const stufe of model.scenarios[0].stages) {
    const interval = model.kernel(0).intervalForStufe(stufe);
    const counts = Array(interval).fill(0);
    for (const c of cards.filter(c => c.stufe === stufe)) {
      const phase = Math.round((Date.parse(c.nextReview) - Date.parse(model.date(0))) / 86400000);
      counts[phase]++;
    }
    assert.ok(Math.max(...counts) - Math.min(...counts) <= 1, 'Stufe ' + stufe);
  }
  assert.equal(cards.filter(c => c.nextReview <= model.date(0)).length, 37);
});
if (oldMode) process.exit(0);

function functionText(name, nextMarker) {
  const start = source.indexOf('function ' + name + '(');
  const end = source.indexOf(nextMarker, start);
  assert.ok(start >= 0 && end > start, name + ' Quellgrenzen');
  return source.slice(start, end);
}
function actual(cards, owner = true, limit = 20, more = []) {
  const k = model.kernel(0);
  const ctx = vm.createContext({
    ...k, ui: {bereichId: 'a', gemerktRunde: new Set(), session: null},
    bereiche: [{id: 'a', name: 'A', karten: cards}, ...more],
    settings: {sitzungsLimit: limit}, wischBewertung: false, verlaufEpoche: 1,
    hwStrokes: [], counts: {w: 0, n: 0}, persisted: [],
    shuffled: a => a.slice(), freieIdsFor: b => b.locked ? new Set(b.karten.filter(c => !c.locked).map(c => c.id)) : null,
    vorab: () => owner, texteFreigeschaltet: () => false,
    fuehlbar() {}, render() {}, kartenAbflug() {}, springeNachOben() {}, ansagen() {},
    bereichHeuteZaehle() {}, checkStreakOnSessionComplete() {},
    verlaufZaehle(art) { ctx.counts[art]++; },
    persistCardGrade(bid, cid, fields) { ctx.persisted.push({bid, cid, ...fields}); }
  });
  const text = functionText('istNeueKarte', '/*') +
    '\nconst LIEGENGEBLIEBEN_TAGE = 14;\n' +
    functionText('istLiegengeblieben', 'const SET_ART_TITEL') +
    functionText('dueCardsFor', '/* E7') +
    functionText('offeneWiederholungen', 'function bereicheMitOffenem') +
    functionText('rundeWeitereBereiche', '/* E5') +
    functionText('gradeCard', '/* 3.14.0: Die bewertete Karte geht') +
    '\nfunction currentBereich() {return bereiche.find(b => b.id === ui.bereichId);}\n' +
    'function findCard(id) {return currentBereich().karten.find(c => c.id === id);}\n';
  vm.runInContext(text, ctx);
  ctx.startSession();
  return ctx;
}
function card(id, stufe = 3, due = 0, fresh = false) {
  return {id, stufe, maxStufe: stufe, nextReview: model.date(due),
    ersteBewertung: fresh ? '' : model.date(-100), rueckfaelle: 0};
}
check('Echtes gradeCard: neue Karte zweimal, n=1 und w=1', () => {
  const c = card('new', 0, 0, true), a = actual([c]);
  a.gradeCard('known'); assert.equal(c.stufe, 0); assert.equal(a.ui.session.queue.length, 1);
  a.gradeCard('known'); assert.equal(c.stufe, 1); assert.equal(a.ui.session.queue.length, 0);
  assert.deepEqual(a.counts, {w: 1, n: 1});
});
check('Echtes gradeCard: wiederholtes Nicht, dann Fast beendet die Runde', () => {
  const c = card('repeat', 8), a = actual([c]);
  a.gradeCard('unknown'); a.gradeCard('unknown'); a.gradeCard('almost');
  assert.equal(c.stufe, 3); assert.equal(c.nextReview, model.date(1));
  assert.equal(a.ui.session.queue.length, 0); assert.deepEqual(a.counts, {w: 3, n: 0});
});
check('Echtes gradeCard: Betreiberregel und Normalnutzer unterscheiden sich', () => {
  for (const owner of [true, false]) {
    const c = card('recall', 8), a = actual([c], owner);
    a.gradeCard('unknown'); a.gradeCard('known');
    assert.equal(c.stufe, owner ? 6 : 7);
    assert.equal(c.nextReview, model.date(owner ? 1 : 34));
  }
});
check('Echtes startSession: geöffneter Bereich zuerst, kein globales Ranking', () => {
  const a = actual([card('new', 0, 0, true)], true, 1,
    [{id: 'b', name: 'B', karten: [card('review')]}]);
  assert.deepEqual(plain(a.ui.session.queue), ['new']); assert.equal(a.ui.session.rest.length, 0);
});
check('Echte weitere Bereiche: Grenze 14 Tage, neue und gesperrte Karten ausgeschlossen', () => {
  const a = actual([], true, 20, [{id: 'b', name: 'B', locked: true,
    karten: [card('today'), card('day14', 3, -14), card('day15', 3, -15),
      card('new', 0, 0, true), {...card('locked'), locked: true}]}]);
  assert.deepEqual(plain(a.ui.session.queue), ['today', 'day14']);
});
check('Deckel zählt Zulassungen; mehrere Antworten verändern die Zulassung nicht', () => {
  const s = {name: 'Einmal neu', count: 2, fresh: true, dailyNew: 0};
  const r = model.simulate(s, {cap: 1}, {known: 1, almost: 0}, 1, true, {days: 1, trace: true});
  assert.equal(r.totalAdmitted, 1); assert.equal(r.totalAnswers, 2);
  assert.equal(r.untouchedInitial, 1); assert.equal(r.clearInitialDay, null);
  assert.equal(r.cards[1].nextReview, model.date(0)); assert.equal(r.cards[1].ersteBewertung, '');
});
check('Modell und echtes gradeCard liefern denselben ersten Tag bei allen Sicher', () => {
  for (const owner of [false, true]) {
    const scenario = {count: 3, fresh: true, dailyNew: 0};
    const expected = model.simulate(scenario, {cap: 2}, {known: 1, almost: 0}, 1, owner, {days: 1, trace: true});
    const actualCards = model.initialCards(scenario), a = actual(actualCards, owner, 2);
    let replies = 0;
    while (a.ui.session.queue.length) { a.gradeCard('known'); replies++; }
    assert.equal(replies, expected.totalAnswers);
    assert.deepEqual(actualCards.map(c => [c.stufe, c.nextReview, c.ersteBewertung]),
      expected.cards.map(c => [c.stufe, c.nextReview, c.ersteBewertung]));
  }
});
if (process.argv.includes('--ergebnis')) check('Alle 90 Ergebnisgruppen mit Quelle, Werkzeug und Einzelwerten konsistent', () => {
  const crypto = require('node:crypto');
  const hash = text => crypto.createHash('sha256').update(text.replace(/\r\n/g, '\n')).digest('hex');
  const result = JSON.parse(fs.readFileSync(path.resolve(__dirname,
    '../zyklus-2/mehrwert/tagesdeckel-audit-ergebnis-2026-10-09.json'), 'utf8'));
  assert.equal(result.modelVersion, 2);
  assert.equal(result.sourceSha256LF, hash(source));
  assert.equal(result.toolSha256LF, hash(fs.readFileSync(path.join(__dirname, 'tagesdeckel_simulation.cjs'), 'utf8')));
  assert.equal(result.rows.length, 90);
  const keys = new Set();
  const mean = values => Math.round(values.reduce((a, b) => a + b, 0) / values.length * 10) / 10;
  for (const row of result.rows) {
    const key = [row.scenario, row.policy, row.ratings].join('|');
    assert.ok(!keys.has(key), 'Doppelte Ergebnisgruppe'); keys.add(key);
    const scenario = model.scenarios.find(s => s.name === row.scenario);
    const policy = model.policies.find(p => p.name === row.policy);
    assert.ok(scenario && policy && model.ratingProfiles.some(p => p.name === row.ratings));
    assert.equal(row.runs.length, 5);
    assert.equal(row.initialDue, model.initialCards(scenario).filter(c => c.nextReview <= model.date(0)).length);
    for (const run of row.runs) {
      assert.equal(run.initialDue, row.initialDue);
      assert.ok(run.totalAdmitted <= policy.cap * 180);
      assert.ok(run.totalAnswers >= run.totalAdmitted && run.totalAnswers <= 2 * run.totalAdmitted);
      assert.equal(run.newIntroduced + run.unintroduced, (scenario.fresh ? scenario.count : 0) + scenario.dailyNew * 179);
      assert.equal(run.clearInitialDay === null, run.untouchedInitial > 0);
      assert.ok(run.untouchedInitial <= run.initialDue);
      assert.ok(run.waitingDays >= 0);
    }
    assert.deepEqual(row.initialClearDays, row.runs.map(r => r.clearInitialDay));
    assert.equal(row.untouchedInitial, mean(row.runs.map(r => r.untouchedInitial)));
    assert.equal(row.maxAnswers, Math.max(...row.runs.map(r => r.maxAnswers)));
    assert.equal(row.waitingCardDays, mean(row.runs.map(r => r.waitingDays)));
    for (const key of ['dueEnd', 'newIntroduced', 'unintroduced']) {
      assert.equal(row[key], mean(row.runs.map(r => r[key])), key);
    }
    assert.equal(row.oldestDueDays, Math.max(...row.runs.map(r => r.oldestDueDays)));
    assert.equal(row.answersPerDay, Math.round(mean(row.runs.map(r => r.totalAnswers)) / 180 * 10) / 10);
    assert.deepEqual(row.firstDay, row.runs[0].firstDay);
  }
});
console.log(passed + ' Auditfälle grün.');

/* Eingangsprüfung für das Tagesdeckel-Modell. Unabhängig von der Formel,
   die Karten erzeugt: beobachtete Häufigkeiten pro Stufe prüfen. */
'use strict';
const assert = require('node:assert/strict');
function pruefeEingaben(cards, scenario, intervalForStufe, referenceDate) {
  assert.ok(Number.isInteger(scenario.count) && scenario.count >= 0, 'Kartenanzahl ungültig');
  assert.equal(cards.length, scenario.count, 'Eingangsmenge stimmt nicht');
  assert.ok(Number.isInteger(scenario.pause ?? 0) && (scenario.pause ?? 0) >= 0, 'Pause ungültig');
  assert.ok(Number.isInteger(scenario.dailyNew ?? 0) && (scenario.dailyNew ?? 0) >= 0, 'Neue Karten pro Tag ungültig');
  if (!scenario.fresh) {
    assert.ok(Array.isArray(scenario.stages) && scenario.stages.length > 0, 'Stufen fehlen');
    assert.equal(new Set(scenario.stages).size, scenario.stages.length, 'Stufen doppelt');
    assert.ok(scenario.stages.every(s => Number.isInteger(s) && s >= 0 && s <= 12), 'Stufenliste ungültig');
  }
  const groups = new Map(), ids = new Set();
  for (const c of cards) {
    assert.ok(!ids.has(c.id), 'Karten-ID doppelt'); ids.add(c.id);
    assert.ok(Number.isInteger(c.stufe) && c.stufe >= 0 && c.stufe <= 12, 'Stufe ungültig');
    assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(c.nextReview), 'Terminformat ungültig');
    const timestamp = Date.parse(c.nextReview + 'T12:00:00Z');
    assert.ok(Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === c.nextReview,
      'Kalenderdatum ungültig');
    const phase = (timestamp - Date.parse(referenceDate + 'T12:00:00Z')) / 86400000;
    assert.ok(Number.isInteger(phase), 'Terminphase kein Kalendertag');
    if (scenario.fresh) {
      assert.equal(c.stufe, 0, 'Neue Karte mit anderer Stufe');
      assert.ok(!c.ersteBewertung, 'Neue Karte bereits eingeführt');
      assert.equal(phase, 0, 'Neue Karte nicht am ersten Tag fällig');
      continue;
    }
    assert.ok(scenario.stages.includes(c.stufe), 'Unerwartete Stufe');
    assert.ok(c.ersteBewertung, 'Wiederholung als neue Karte angelegt');
    if (!groups.has(c.stufe)) groups.set(c.stufe, Array(intervalForStufe(c.stufe)).fill(0));
    const counts = groups.get(c.stufe);
    assert.ok(phase >= 0 && phase < counts.length, 'Phase außerhalb des Stufenintervalls');
    counts[phase]++;
  }
  if (!scenario.fresh) for (const stage of scenario.stages) {
    const observed = (groups.get(stage) || []).reduce((n, c) => n + c, 0);
    assert.ok(observed >= Math.floor(scenario.count / scenario.stages.length) &&
      observed <= Math.ceil(scenario.count / scenario.stages.length), 'Stufenverteilung stimmt nicht');
  }
  for (const [stage, counts] of groups) {
    assert.ok(Math.max(...counts) - Math.min(...counts) <= 1,
      'Ungleichmäßige Terminphasen innerhalb Stufe ' + stage);
  }
  return {cards: cards.length, stages: groups.size};
}
module.exports = {pruefeEingaben};

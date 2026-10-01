/* G-109: fester Stand vor Paket A (c4b1c30, 3.18.10). Der alte Test
   meldet Exit 0 trotz leerem Inventar und Ende vor dem fertigen Plan. */
const assert = require('node:assert/strict');
const { execFileSync, spawnSync } = require('node:child_process');
const path = require('node:path');
const repo = path.join(__dirname, '../../..');
const code = execFileSync('git', ['show', 'c4b1c30:plan/werkzeuge/pruefstand/t_inventar2.js'], { cwd: repo, encoding: 'utf8' });
const lauf = spawnSync(process.execPath, ['-e', code], { cwd: __dirname, env: process.env, encoding: 'utf8', timeout: 180000, windowsHide: true });
assert.ifError(lauf.error);
assert.equal(lauf.status, 0, lauf.stderr);
assert.match(lauf.stdout, /=== rundenende\r?\n\r?\n/);
assert.match(lauf.stdout, /-> null/);
assert.doesNotMatch(lauf.stdout, /fertiger-plan|plan-speichern/);
console.log('OK Gegenprobe c4b1c30: Exit 0, leeres Rundenende, vor dem fertigen Plan abgebrochen.');

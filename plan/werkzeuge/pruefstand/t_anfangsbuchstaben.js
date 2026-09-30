/* Stufe 3 (texte-lernen/KONZEPT.md § 8.3, § 13): Anfangsbuchstaben.
   Der Wortlaut kommt unveraendert aus quran/tanzil-uthmani.txt, ausgewaehlt
   ueber fixtures/quran-stellen.json (Pruefsumme) - kein Text vom Agenten.
   Prueft je Stelle: ein Zeichen je Wort mit Grundbuchstabe; kein Harakat-,
   Quran-Zeichen oder Tatweel; Woerter nur aus solchen Zeichen fallen weg;
   jedes Zeichen ist das erste verbleibende des Wortes. Dazu ein deutscher
   Testsatz: erster Buchstabe, Satzzeichen bleiben.
   Gegenprobe: ohne Entfernen der Zeichen (Regex leer) wird es rot. */
const fs = require('node:fs'), path = require('node:path');
const { createHash } = require('node:crypto');
const { start } = require('./lib');
const { seiteMitApp, textStore } = require('./text_lib');

const QUELLE = fs.readFileSync(path.join(__dirname, '../../../quran/tanzil-uthmani.txt'), 'utf8')
  .split('\n').filter(l => l && l[0] !== '#').map(l => l.split('|'));
const STELLEN = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/quran-stellen.json'), 'utf8')).stellen;
const ZEICHEN = /[ؐ-ًؚ-ٰٟۖ-ۭـ]/;
const ZEICHEN_G = new RegExp(ZEICHEN.source, 'g');
const zusatz = `ab: z => anfangsbuchstaben(z),`;

async function lauf(browser, ersetze) {
  const fehler = [];
  const pruefe = (ok, text) => { if (!ok) fehler.push(text); };
  const { ctx, p } = await seiteMitApp(browser, textStore(), { zusatz, ersetze });
  try {
    for (const s of STELLEN) {
      const zeile = QUELLE.find(q => +q[0] === s.sure && +q[1] === s.aya)[2];
      pruefe(createHash('sha256').update(zeile).digest('hex') === s.sha256, s.sure + ':' + s.aya + ' Pruefsumme');
      const erwartet = zeile.split(' ').map(w => w.replace(ZEICHEN_G, '')).filter(Boolean).map(w => w[0]);
      const ab = await p.evaluate(z => window.__PRUEF.ab(z), zeile);
      const teile = ab.split(' ');
      pruefe(teile.join('|') === erwartet.join('|'), s.sure + ':' + s.aya + ': ' + teile.length + ' statt ' + erwartet.length + ' Buchstaben oder falscher Buchstabe');
      pruefe(!ZEICHEN.test(ab), s.sure + ':' + s.aya + ': Harakat/Quran-Zeichen/Tatweel uebrig');
      pruefe(teile.every(t => [...t].length === 1), s.sure + ':' + s.aya + ': mehr als ein Zeichen je Wort');
      if (s.sure === 2 && s.aya === 2) pruefe(teile.length < s.woerter, '2:2: Waqf-Wort faellt nicht weg');
      if (s.sure === 1 && s.aya === 1) console.log('(lesen) 1:1 -> ' + ab + ' (' + teile.length + ' von ' + s.woerter + ' Woertern)');
    }
    const de = await p.evaluate(() => window.__PRUEF.ab('„Eins, zwei – drei!“ 42 Äpfel'));
    pruefe(de === '„E, z – d!“ 4 Ä', 'Deutsch: ' + de);
    pruefe(p.fehler.length === 0, 'Seitenfehler: ' + p.fehler.join('; '));
  } finally { await ctx.close(); }
  return fehler;
}

(async () => {
  const browser = await start();
  try {
    const f = await lauf(browser);
    const g = await lauf(browser, ['.replace(ARAB_OHNE_BUCHSTABE, "").charAt(0)', '.charAt(0)']);
    console.log('Gegenprobe ohne Entfernen: ' + g.length + ' Befunde (rot erwartet)');
    if (g.length === 0) f.push('Gegenprobe blieb gruen');
    if (f.length) { console.log('FEHLER:\n' + f.join('\n')); process.exitCode = 1; }
    else console.log('OK t_anfangsbuchstaben: ' + STELLEN.length + ' Quran-Stellen + deutscher Satz');
  } finally { await browser.close(); }
})();

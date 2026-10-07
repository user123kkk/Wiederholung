/* Texte, Hilfestufe 2 (texte-lernen/KONZEPT.md § 8.3, § 13), seit 3.18.24:
   der Anfang der Zeile statt Anfangsbuchstaben (Betreiber 07.10.2026;
   Vorlage texte-lernen/ANFANG-VORLAGE-2026-10-07.md, Weg b). Diese Datei
   hiess bis 3.18.23 t_anfangsbuchstaben.js und pruefte die alte Fassung.
   Der Wortlaut kommt unveraendert aus quran/tanzil-uthmani.txt, ausgewaehlt
   ueber fixtures/quran-stellen.json (Pruefsumme) - kein Text vom Agenten.
   Prueft je Stelle:
   - der Anfang ist Zeichen fuer Zeichen der Beginn der Zeile (nichts
     entfernt, nichts ersetzt) und endet an einer Wortgrenze;
   - er enthaelt genau 1 Wort (Zeile bis 6 Woerter) oder 2 (laenger), bei
     einer Zeile aus einem Wort nichts; Woerter nur aus Lesezeichen zaehlen
     nicht;
   - mindestens ein Wort der Zeile bleibt verdeckt.
   Dazu deutsche Testsaetze. Die Anzeige in der Oberflaeche prueft
   t_text_neu.js. Gegenprobe: zaehlt die Funktion bis 3, wird es rot. */
const fs = require('node:fs'), path = require('node:path');
const { createHash } = require('node:crypto');
const { start } = require('./lib');
const { seiteMitApp, textStore } = require('./text_lib');

const QUELLE = fs.readFileSync(path.join(__dirname, '../../../quran/tanzil-uthmani.txt'), 'utf8')
  .split('\n').filter(l => l && l[0] !== '#').map(l => l.split('|'));
const STELLEN = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/quran-stellen.json'), 'utf8')).stellen;
const ZEICHEN_G = /[ؐ-ًؚ-ٰٟۖ-ۭـ]/g;
const zusatz = `za: z => zeilenAnfang(z),`;
const echteWoerter = text => text.split(' ').filter(w => w && w.replace(ZEICHEN_G, ''));
const soll = n => n <= 1 ? 0 : n <= 6 ? 1 : 2;

async function lauf(browser, ersetze) {
  const fehler = [];
  const pruefe = (ok, text) => { if (!ok) fehler.push(text); };
  const { ctx, p } = await seiteMitApp(browser, textStore(), { zusatz, ersetze });
  try {
    let kurz = 0, lang = 0;
    for (const s of STELLEN) {
      const wo = s.sure + ':' + s.aya;
      const zeile = QUELLE.find(q => +q[0] === s.sure && +q[1] === s.aya)[2];
      pruefe(createHash('sha256').update(zeile).digest('hex') === s.sha256, wo + ' Pruefsumme');
      const n = echteWoerter(zeile).length;
      const a = await p.evaluate(z => window.__PRUEF.za(z), zeile);
      pruefe(zeile.startsWith(a), wo + ': Anfang ist nicht der unveraenderte Beginn der Zeile');
      pruefe(a === '' || zeile.length === a.length || zeile[a.length] === ' ', wo + ': Anfang endet mitten im Wort');
      pruefe(echteWoerter(a).length === soll(n), wo + ': ' + echteWoerter(a).length + ' Woerter gezeigt, erwartet ' + soll(n) + ' bei ' + n);
      pruefe(n <= 1 || echteWoerter(a).length < n, wo + ': nichts bleibt verdeckt');
      if (a) pruefe(echteWoerter(a.split(' ').slice(-1)[0]).length === 1, wo + ': Anfang endet auf einem Lesezeichen');
      if (n > 6) lang++; else kurz++;
      if (s.sure === 1 && s.aya === 1) console.log('(lesen) 1:1 -> ' + echteWoerter(a).length + ' von ' + n + ' Woertern gezeigt, ' + [...a].length + ' Zeichen');
    }
    pruefe(kurz > 0 && lang > 0, 'Stellen decken nicht kurze und lange Zeilen ab (' + kurz + '/' + lang + ')');
    const de = async z => p.evaluate(x => window.__PRUEF.za(x), z);
    pruefe(await de('„Eins, zwei – drei!“') === '„Eins,', 'Deutsch kurz: ' + await de('„Eins, zwei – drei!“'));
    pruefe(await de('eins zwei drei vier fünf sechs') === 'eins', 'Deutsch sechs Wörter: ' + await de('eins zwei drei vier fünf sechs'));
    pruefe(await de('eins zwei drei vier fünf sechs sieben') === 'eins zwei', 'Deutsch sieben Wörter: ' + await de('eins zwei drei vier fünf sechs sieben'));
    pruefe(await de('Einwort') === '', 'Ein Wort: ' + await de('Einwort'));
    pruefe(await de('') === '', 'Leer: ' + await de(''));
    pruefe(await de('eins  zwei drei') === 'eins', 'Doppeltes Leerzeichen: ' + await de('eins  zwei drei'));
    pruefe(p.fehler.length === 0, 'Seitenfehler: ' + p.fehler.join('; '));
  } finally { await ctx.close(); }
  return fehler;
}

(async () => {
  const browser = await start();
  try {
    const f = await lauf(browser);
    const g = await lauf(browser, ['gezaehlt < zeigen', 'gezaehlt < 3']);
    console.log('Gegenprobe (zaehlt bis 3): ' + g.length + ' Befunde (rot erwartet)');
    if (g.length === 0) f.push('Gegenprobe blieb gruen');
    if (f.length) { console.log('FEHLER:\n' + f.join('\n')); process.exitCode = 1; }
    else console.log('OK t_zeilenanfang: ' + STELLEN.length + ' Quran-Stellen + deutsche Saetze');
  } finally { await browser.close(); }
})();

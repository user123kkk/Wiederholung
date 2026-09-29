/* Stufe 0 (Texte auswendig lernen, KONZEPT.md Par. 9 und 13): Die
   mitgelieferte Quran-Datei ist unveraendert die Datei von tanzil.net.

   Geprueft ohne Browser:
   1. SHA-256 beider Quelldateien wie im Logbuch festgehalten;
   2. 114 Suren, 6236 Ayat, lueckenlos der Reihe nach, Format "sure|aya|text";
   3. Aya-Zahl je Sure = Metadaten (quran-data.xml);
   4. Stichproben aus fixtures/quran-stellen.json: dieselbe Zeile hat
      denselben SHA-256 wie beim Anlegen der Fixture (kein Text im Test -
      kein Agent schreibt Quran-Wortlaut, LEHREN Par. 2);
   5. der Lizenzblock steht unveraendert am Dateiende.
   Gegenprobe: dieselbe Pruefung gegen drei veraenderte Kopien (ein Zeichen
   geaendert, eine Zeile entfernt, CRLF statt LF) muss jeweils rot sein.

   Stufe 2 ergaenzt: Sure 1 und 2 anlegen, offline nach erstem Laden. */
const fs = require('node:fs'), path = require('node:path');
const { createHash } = require('node:crypto');

const repo = path.join(__dirname, '../../..');
const TEXT = path.join(repo, 'quran/tanzil-uthmani.txt');
const META = path.join(repo, 'quran/tanzil-quran-data.xml');
const SHA_TEXT = '6933e133dd56db778c801bf738848454e43648105a151e8d84d86a7cae39ec5f';
const SHA_META = '8867c1d88191472adec9db694b3cd9f135b1a2ef580574d32cf888dcb22c5c7a';
const stellen = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/quran-stellen.json'), 'utf8'));

const sha = b => createHash('sha256').update(b).digest('hex');

function pruefe(textBytes, metaBytes) {
  const fehler = [];
  if (sha(textBytes) !== SHA_TEXT) fehler.push('SHA-256 Text weicht ab');
  if (sha(metaBytes) !== SHA_META) fehler.push('SHA-256 Metadaten weichen ab');
  const text = textBytes.toString('utf8');
  if (text.includes('\r')) fehler.push('Zeilenende CR gefunden');
  const zeilen = text.split('\n').filter(l => l && !l.startsWith('#'));
  const ayat = [];
  let vor = [0, 0];
  for (const l of zeilen) {
    const p = l.split('|');
    if (p.length !== 3 || !/^\d+$/.test(p[0]) || !/^\d+$/.test(p[1]) || !p[2]) { fehler.push('Format: ' + l.slice(0, 20)); continue; }
    const s = +p[0], a = +p[1];
    if (!((s === vor[0] && a === vor[1] + 1) || (s === vor[0] + 1 && a === 1))) fehler.push('Reihenfolge bei ' + s + ':' + a);
    vor = [s, a];
    ayat.push({ s, a, t: p[2] });
  }
  if (ayat.length !== 6236) fehler.push('Ayat: ' + ayat.length + ' statt 6236');
  const jeSure = new Map();
  for (const x of ayat) jeSure.set(x.s, (jeSure.get(x.s) || 0) + 1);
  if (jeSure.size !== 114) fehler.push('Suren: ' + jeSure.size + ' statt 114');
  const meta = [...metaBytes.toString('utf8').matchAll(/<sura index="(\d+)" ayas="(\d+)"/g)].map(m => [+m[1], +m[2]]);
  if (meta.length !== 114) fehler.push('Metadaten-Suren: ' + meta.length);
  for (const [s, n] of meta) if (jeSure.get(s) !== n) fehler.push('Sure ' + s + ': ' + jeSure.get(s) + ' statt ' + n);
  for (const st of stellen.stellen) {
    const x = ayat.find(y => y.s === st.sure && y.a === st.aya);
    if (!x || sha(x.t) !== st.sha256) fehler.push('Stichprobe ' + st.sure + ':' + st.aya + ' weicht ab');
  }
  if (!/TERMS OF USE:[\s\S]*CHANGING IT IS NOT ALLOWED[\s\S]*tanzil\.net/.test(text)) fehler.push('Lizenzblock fehlt');
  return { fehler, ayat: ayat.length, suren: jeSure.size };
}

const text = fs.readFileSync(TEXT), meta = fs.readFileSync(META);
let rot = 0;

const echt = pruefe(text, meta);
console.log('Echte Datei: ' + echt.suren + ' Suren, ' + echt.ayat + ' Ayat, ' + stellen.stellen.length + ' Stichproben');
if (echt.fehler.length) { rot++; console.log('FEHLER echte Datei:\n  ' + echt.fehler.join('\n  ')); }

// Gegenproben: jede Veraenderung muss auffallen.
const s = text.toString('utf8');
const zeilen = s.split('\n');
const iStelle = zeilen.findIndex(l => l.startsWith(stellen.stellen[0].sure + '|' + stellen.stellen[0].aya + '|'));
const geaendert = zeilen.slice(); geaendert[iStelle] = geaendert[iStelle].replace(/ّ/, '');
const gegen = {
  'ein Zeichen (Shadda) entfernt': Buffer.from(geaendert.join('\n')),
  'eine Zeile entfernt': Buffer.from(zeilen.filter((_, i) => i !== 100).join('\n')),
  'CRLF statt LF': Buffer.from(s.replace(/\n/g, '\r\n'))
};
for (const [name, bytes] of Object.entries(gegen)) {
  const r = pruefe(bytes, meta);
  if (r.fehler.length) console.log('Gegenprobe rot wie erwartet (' + name + '): ' + r.fehler.slice(0, 2).join('; '));
  else { rot++; console.log('FEHLER Gegenprobe blieb gruen: ' + name); }
}

console.log(rot ? 'ROT (' + rot + ')' : 'OK');
process.exitCode = rot ? 1 : 0;

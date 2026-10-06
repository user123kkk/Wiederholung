// F12, zweiter Durchgang: den gesicherten Entwurf wieder einsetzen.
// Vorstand dieses Laufs wird als feste Datei gesichert (Gegenprobe/Fotos).
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {cssStruktur} from '../werkzeuge/css_struktur.mjs';
const belege='plan/zyklus-2/paket-f-belege/';
const vor=belege+'styles-vor-f12-lauf2.css';
if(fs.existsSync(vor))throw new Error('Vorstand dieses Laufs bereits gesichert');
const alt=fs.readFileSync('styles.css','utf8');
const crlf=alt.includes('\r\n');
// Nur Zeilenenden angleichen; Leerzeilen des Entwurfs bleiben (Vorstand hat selbst welche).
let neu=fs.readFileSync(belege+'styles-f12-versuch.css','utf8').replaceAll('\r\n','\n');
if(crlf)neu=neu.replaceAll('\n','\r\n');
assert.deepEqual(cssStruktur(neu),[]);
fs.writeFileSync(vor,alt);fs.writeFileSync('styles.css',neu);
console.log('F12 wieder eingesetzt: '+alt.length+' -> '+neu.length+' Zeichen, Zeilenenden '+(crlf?'CRLF':'LF'));

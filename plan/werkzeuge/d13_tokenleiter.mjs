// Einmalige, begrenzte BEW-13-Umstellung. Sonderzeiten bleiben unverändert.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const datei='styles.css';
let css=fs.readFileSync(datei,'utf8');
const anker='  --dur-instant: 90ms;';
assert.equal(css.split(anker).length,2);
css=css.replace(anker,`  --dur-feedback: 100ms;
  --dur-kurz: 200ms;
  --dur-eintritt: 300ms;
  --dur-gross: 400ms;
  --dur-austritt: 200ms;
  --ease-eintritt: cubic-bezier(.05,.7,.1,1);
  --ease-austritt: cubic-bezier(.3,0,.8,.15);
${anker}`);
// Der Text-Probelauf beginnt hinter der letzten Bewegungsregel.
const ende=css.indexOf('.text-kopf');assert.ok(ende>0);
const schutz=css.slice(ende);
let n=0;
css=css.slice(0,ende).replace(/\/\*[\s\S]*?\*\/|\b(animation|transition)(-duration)?\s*:\s*([^;}]+)/g,(g,art,suffix,wert)=>{
 if(!art)return g;
 if(/0\.01ms|(?<![-\w])(?:dreh|schimmer|boot-hof|boot-linie|einstieg-atmen|karte-wende|vorn-weg|karte-hebt|karte-schatten|griff-halten|halten-fuellen)\b|560ms|var\(--halten/.test(wert))return g;
 let nr=0;
 const neu=wert.replace(/(?<![\w.-])(\d*\.?\d+)(ms|s)\b/g,(v,z,e)=>{
  const ms=+z*(e==='s'?1000:1);
  // Delays und an den Aufbau gekoppelte Zeiten bleiben exakt gleich.
  if((art==='animation'&&nr++>0)||wert.includes('calc('))return `calc(var(--dur-feedback) * ${ms/100})`;
  const token=ms<=150?'feedback':ms<=250?'kurz':ms<=350?'eintritt':'gross';
  return `var(--dur-${token})`;
 }).replaceAll('var(--ease-out)','var(--ease-eintritt)')
 .replaceAll('var(--dur-instant)','var(--dur-feedback)')
 .replaceAll('var(--dur-fast)','var(--dur-kurz)')
 .replaceAll('var(--dur-base)','var(--dur-kurz)')
 .replaceAll('var(--dur-slow)','var(--dur-eintritt)');
 if(neu!==wert)n++;
 return `${art}${suffix||''}: ${neu}`;
})+schutz;
// Vier Bewertungs-Austritte: eigene beschleunigende Kurve.
css=css.replace(/(animation: geist-(?:rechts|links|sinkt|weiter) [^;]+)var\(--ease-eintritt\)/g,'$1var(--ease-austritt)');
assert.equal(css.slice(css.indexOf('.text-kopf')),schutz);
fs.writeFileSync(datei,css);console.log(n+' Deklarationen auf semantische Token abgebildet');

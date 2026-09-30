// node ersetze.js <datei> <aenderungen.js> : jede Ersetzung muss genau einmal treffen.
const fs=require('fs');const [,,datei,plan]=process.argv;
const roh=fs.readFileSync(datei,'utf8');const crlf=roh.includes('\r\n');
let s=roh.replace(/\r\n/g,'\n');
const paare=require(require('path').resolve(plan));
for(const [a,b] of paare){const n=s.split(a).length-1;if(n!==1){console.error('Treffer '+n+': '+a.slice(0,80));process.exit(1);}s=s.split(a).join(b);}
fs.writeFileSync(datei,crlf?s.replace(/\n/g,'\r\n'):s);console.log(paare.length+' Ersetzungen in '+datei);

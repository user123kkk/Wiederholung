// Strukturprüfung ohne Abhängigkeiten. Der Browser-CSSOM-Test prüft zusätzlich
// die tatsächlich angenommenen Bewertungsregeln (Paket D3).
export function cssStruktur(quelle) {
  const fehler = [], stapel = [];
  let kommentar=false, zitat='', prelude='', zeile=1;
  for(let i=0;i<quelle.length;i++) {
    const c=quelle[i], n=quelle[i+1];
    if(c==='\n')zeile++;
    if(kommentar) {if(c==='*'&&n==='/'){kommentar=false;i++;}continue;}
    if(zitat) {if(c==='\\'){i++;continue;}if(c===zitat)zitat='';continue;}
    if(c==='/'&&n==='*'){kommentar=true;i++;continue;}
    if(c==='"'||c==="'"){zitat=c;continue;}
    if(c==='{') {
      const kopf=prelude.trim();
      if(!stapel.length && /^(?:from|to|[\d.]+%)\s*$/.test(kopf))fehler.push(`Zeile ${zeile}: Keyframe außerhalb von @keyframes`);
      stapel.push(zeile);prelude='';
    }else if(c==='}') {
      if(!stapel.length)fehler.push(`Zeile ${zeile}: schließende Klammer ohne Regel`);
      else stapel.pop();prelude='';
    }else if(c===';')prelude='';
    else prelude+=c;
  }
  if(kommentar)fehler.push('Nicht beendeter Kommentar');
  if(zitat)fehler.push('Nicht beendete Zeichenkette');
  if(stapel.length)fehler.push(`Nicht geschlossene Regeln ab Zeile ${stapel.join(', ')}`);
  return fehler;
}

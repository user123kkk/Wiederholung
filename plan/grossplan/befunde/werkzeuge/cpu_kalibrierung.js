/* Diagnose, keine Abnahme und keine Grenzwertaenderung.
   Offiziellen DevTools/Lighthouse-Benchmark getrennt von der App ausfuehren.
   Quellen-Hash und Rohwerte werden ausgegeben; kein Produkt wird geladen. */
const {start}=require('../../../werkzeuge/pruefstand/lib');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
const url='https://raw.githubusercontent.com/ChromeDevTools/devtools-frontend/main/front_end/panels/mobile_throttling/CalibrationController.ts';
(async()=>{
 const antwort=await fetch(url);assert.equal(antwort.status,200);
 const text=await antwort.text();
 const anfang=text.indexOf('function computeBenchmarkIndex(');assert.ok(anfang>0);
 const benchmark=text.slice(anfang).replace(/\): number/g,')');
 const hash=require('node:crypto').createHash('sha256').update(text).digest('hex');
 assert.equal(hash,'dbfbeadbdd81924267dd4312f57be1005b237d66d9f7a6d76d153bc034d485f7','Offizieller Benchmark seit der dokumentierten Diagnose geaendert');
 fs.writeFileSync(path.join(os.tmpdir(),'adrabic-devtools-calibration-'+hash.slice(0,16)+'.ts'),text);
 const browser=await start();try{
  const p=await browser.newPage(),cdp=await p.context().newCDPSession(p);
  await p.goto('about:blank');await p.evaluate('(()=>{'+benchmark+'; window.benchmark=computeBenchmarkIndex;})()');
  await p.evaluate(()=>window.benchmark(250)); // V8 aufwaermen
  const werte=[];
  for(const rate of [1,4,1,4]){
   await cdp.send('Emulation.setCPUThrottlingRate',{rate});
   const score=await p.evaluate(()=>window.benchmark(250));werte.push({rate,score});
  }
  let unten=1,oben=4;
  const suche=[];
  for(let i=0;i<8;i++){
   const rate=Math.round((unten+oben)*50)/100;
   await cdp.send('Emulation.setCPUThrottlingRate',{rate});
   const score=await p.evaluate(()=>window.benchmark(250));suche.push({rate,score});
   if(Math.abs(score-264)<10)break;
   if(score<264)oben=rate;else unten=rate;
  }
  const ziel=suche.at(-1),kontrolle=[];
  for(let i=0;i<3;i++)kontrolle.push(await p.evaluate(()=>window.benchmark(250)));
  const ergebnis={quelle:url,sha256:hash,browser:browser.version(),offizielleZielwerte:{mid:1000,low:264},werte,suche,ziel,kontrolle};
  fs.writeFileSync(path.join(os.tmpdir(),'adrabic-cpu-kalibrierung.json'),JSON.stringify(ergebnis,null,2));
  console.log(JSON.stringify(ergebnis));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

/* Diagnose des unveraenderten G-037-Ablaufs. Profiler-Aufwand zaehlt nicht
   als Tempoabnahme; Quellstand und Grenze bleiben unveraendert. */
const fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),assert=require('node:assert/strict');
const datei=path.join(__dirname,'../../../werkzeuge/pruefstand/t_bestand_tempo.js');
let test=fs.readFileSync(datei,'utf8');process.env.PRUEF_KARTEN='3000';
const vor="await p.keyboard.press('3'); await p.waitForTimeout(1200);";
assert.equal(test.split(vor).length,2,'Profiler-Grenze nicht eindeutig');
test=test.replace(vor,`await cdp.send('Profiler.enable'); await cdp.send('Profiler.start');
      await p.keyboard.press('3'); await p.waitForTimeout(1200);
      const prof = (await cdp.send('Profiler.stop')).profile;
      fs.writeFileSync(path.join(require('node:os').tmpdir(),'adrabic-g037-profile-'+(gef?'gefuehrt':'eigen')+'-'+i+'.json'),JSON.stringify(prof));
      const profNodes=new Map(prof.nodes.map(n=>[n.id,n])),profZeiten=new Map();
      for(let j=0;j<prof.samples.length;j++){
        const frame=profNodes.get(prof.samples[j]).callFrame;
        const key=(frame.functionName||'(leer)')+' '+(frame.url.includes('app.js')?'app:'+frame.lineNumber:frame.url.slice(0,80));
        profZeiten.set(key,(profZeiten.get(key)||0)+prof.timeDeltas[j]/1000);
      }
      console.log('PROFIL Selbstzeit ms',JSON.stringify([...profZeiten].sort((a,b)=>b[1]-a[1]).slice(0,18)));`);
const lauf=new Module(datei,module);lauf.filename=datei;lauf.paths=Module._nodeModulePaths(path.dirname(datei));lauf._compile(test,datei);

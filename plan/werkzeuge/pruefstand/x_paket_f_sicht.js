/* F12-Abnahme „wie t_nur_betreiber.js“: Fensterfotos (kein fullPage), Vergleich der
   dekodierten RGBA-Werte, keine Pixeltoleranz. Derselbe Rundgang wie
   x_paket_f_fotos.js; lange Seiten werden in Fensterhöhen durchgescrollt.
   Zusätzlich je Zustand die berechneten Stile aller Elemente samt ::before/::after.
   Alt = feste Vorstand-Datei (F_SICHT_ALT), Neu = styles.css im Arbeitsbaum;
   app.js ist in beiden Durchgängen dieselbe.
     node x_paket_f_sicht.js [--kontrolle]
   --kontrolle nimmt den Vorstand zweimal auf (Alt gegen Alt) und meldet, ob das
   Messgerät selbst schwankt. Abnahme bleibt allein Alt gegen Neu. */
const fs=require('node:fs'),path=require('node:path');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {neueSeite,aktion,GERAETE,vollerStore}=require('./lib');
const repo=path.resolve(__dirname,'../../..');
const altDatei=process.env.F_SICHT_ALT||path.join(repo,'plan/zyklus-2/paket-f-belege/styles-vor-f12-lauf2.css');
const aus=process.env.F_SICHT_AUS||path.join(repo,'plan/zyklus-2/paket-f-belege/f12-sicht');
fs.mkdirSync(aus,{recursive:true});
const kontrolle=process.argv.includes('--kontrolle');
// F_SICHT_NEU nur für die Gegenprobe des Messgeräts (absichtlich veränderte Datei).
const cssAlt=fs.readFileSync(altDatei,'utf8'),cssNeu=fs.readFileSync(process.env.F_SICHT_NEU||path.join(repo,'styles.css'),'utf8');
assert.notEqual(cssAlt,cssNeu,'Vorstand und Arbeitsbaum sind gleich: nichts zu vergleichen');
const basis={zeitMs:Date.now(),voll:vollerStore(),leer:vollerStore({leer:true})};
let fotos=0,stile=0,schwankung=0,nichtMessbar=0;const rot=[];

async function seite(b,vp,opt,css){
  return neueSeite(b,vp,{...opt,vorher:async ctx=>{
    await ctx.addInitScript(zeitMs=>{
      navigator.serviceWorker.register=()=>Promise.reject(new Error('Foto ohne Worker'));
      const Echt=Date,offset=zeitMs-Echt.now();
      window.Date=class extends Echt {constructor(...a){super(...(a.length?a:[Echt.now()+offset]));}static now(){return Echt.now()+offset;}};
      let seed=7;Math.random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
    },basis.zeitMs);
    await ctx.route(u=>u.hostname==='127.0.0.1'&&u.pathname.endsWith('/styles.css'),r=>r.fulfill({body:css,contentType:'text/css'}));
  }});
}
/* Ein Zustand: ruhigstellen, Stile lesen, in Fensterhöhen fotografieren. */
async function zustand(p,name,liste){
  await p.evaluate(async()=>{
    await document.fonts.ready;
    for(const a of document.getAnimations()){
      if(a.effect.getComputedTiming().endTime!==Infinity)a.finish();
      else {a.pause();a.currentTime=0;}
    }
  });
  await p.waitForTimeout(800);
  await p.evaluate(()=>new Promise(resolve=>{
    let letzte=scrollY,gleich=0;
    function bild(){const y=scrollY;gleich=y===letzte?gleich+1:0;letzte=y;if(gleich>=3)resolve();else requestAnimationFrame(bild);}requestAnimationFrame(bild);
  }));
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Querüberlauf '+name);
  /* Versuch 05.10.: einmal unsichtbar und wieder sichtbar zeichnen, damit Ebenen
     nach einer Bewegung neu gerastert werden. Verworfen und nur noch auf Wunsch:
     Der Schritt nimmt Eingabefeldern den Fokus und machte die ruhigen
     Konfigurationen Alt gegen Alt rot (f12-sicht-voll-2.log). */
  if(process.env.F_SICHT_NEURASTER==='1')await p.evaluate(()=>new Promise(r=>{
    const e=document.documentElement,alt=e.style.visibility;e.style.visibility='hidden';
    requestAnimationFrame(()=>requestAnimationFrame(()=>{e.style.visibility=alt;requestAnimationFrame(()=>requestAnimationFrame(r));}));
  }));
  const stil=await p.evaluate(()=>{
    const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return (h>>>0).toString(16);};
    // Chrome zählt eigene Eigenschaften (--x) je Seite in anderer Reihenfolge auf: sortieren.
    const lies=(el,pseudo)=>{const cs=getComputedStyle(el,pseudo);if(pseudo&&cs.content==='none')return '';const e=[];for(let i=0;i<cs.length;i++)e.push(cs[i]+':'+cs.getPropertyValue(cs[i]));return e.sort().join(';');};
    const out=[];let n=0;
    for(const el of document.documentElement.querySelectorAll('*')){
      if(el.closest('head'))continue;
      const wer=(n++)+' '+el.tagName.toLowerCase()+(el.id?'#'+el.id:'')+(typeof el.className==='string'&&el.className?'.'+el.className.trim().replace(/\s+/g,'.'):'');
      out.push([wer,hash(lies(el,null)+'|'+lies(el,'::before')+'|'+lies(el,'::after'))]);
    }
    return {out,roh:{html:lies(document.documentElement,null),body:lies(document.body,null)}};
  });
  const lage=await p.evaluate(()=>({y:scrollY,h:innerHeight,H:document.documentElement.scrollHeight}));
  const stufen=[lage.y];
  for(let y=0;y<lage.H-lage.h;y+=lage.h)if(!stufen.includes(y))stufen.push(y);
  const ende=Math.max(0,lage.H-lage.h);if(!stufen.includes(ende))stufen.push(ende);
  const bilder=[];
  for(const y of stufen){
    if(y!==lage.y||bilder.length){
      await p.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),y);
      await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
      await p.waitForTimeout(200);
    }
    bilder.push([y,await p.screenshot()]);
  }
  if(stufen.length>1){
    await p.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),lage.y);
    await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
    await p.waitForTimeout(200);
  }
  liste.push({name,stil:stil.out,roh:stil.roh,bilder});
}
async function rundgang(p,leer,liste){
  const z=name=>zustand(p,name,liste);
  await z('lernen');
  await aktion(p,'tab-fortschritt');await z('fortschritt');
  const fortSeiten=await p.locator('[data-action="fort-seite"]').evaluateAll(es=>[...new Set(es.map(e=>e.dataset.id))]);
  for(const id of fortSeiten){await aktion(p,'fort-seite',id);await z('fort-'+id);await aktion(p,'seite-zu');}
  await aktion(p,'tab-verwalten');await z('verwalten');
  await aktion(p,'karte-neu');await z('kartenblatt');
  await p.keyboard.press('Escape');await p.waitForTimeout(300);
  if(!leer){await aktion(p,'open-drill');await z('ueben');await aktion(p,'close-drill');}
  await aktion(p,'einstellungen');await z('einstellungen');
  const einstSeiten=await p.locator('[data-action="einst-seite"]').evaluateAll(es=>[...new Set(es.map(e=>e.dataset.id))]);
  for(const id of einstSeiten){await aktion(p,'einst-seite',id);await z('einst-'+id);await aktion(p,'seite-zu');}
  await aktion(p,'einstellungen-zu');await aktion(p,'tab-lernen');
  if(!leer){
    await aktion(p,'start-session');await z('runde');
    await p.keyboard.press('Space');await p.waitForTimeout(700);await z('antwort');
    for(let i=0;i<40&&!(await p.locator('#app .ende').count());i++){
      await p.keyboard.press('3');await p.waitForTimeout(400);
      if(!(await p.locator('#app .ende').count())){await p.keyboard.press('Space');await p.waitForTimeout(600);}
    }
    await p.waitForSelector('#app .ende');await z('ende');
  }
}
async function gastgang(p,liste){
  const z=name=>zustand(p,name,liste);
  await z('einstieg-0');await aktion(p,'einstieg-weiter');
  await aktion(p,'einstieg-ziel','kurs');await z('einstieg-1');await aktion(p,'einstieg-weiter');
  await aktion(p,'einstieg-huerde','keine');await z('einstieg-2');await aktion(p,'einstieg-weiter');
  await z('einstieg-3a');await aktion(p,'einstieg-aufdecken');await z('einstieg-3b');
  await aktion(p,'einstieg-bewerten','Sicher');await z('einstieg-3c');await aktion(p,'einstieg-weiter');
  await z('einstieg-4');await aktion(p,'einstieg-schrift');await aktion(p,'einstieg-weiter');
  await z('einstieg-5');await aktion(p,'einstieg-runde');await aktion(p,'einstieg-weiter');
  await z('einstieg-6');await aktion(p,'einstieg-anker');await aktion(p,'einstieg-weiter');
  await p.waitForTimeout(7000);await z('einstieg-7');
  await aktion(p,'einstieg-fertig');await z('konto');
  await aktion(p,'mode-login');await z('anmelden');
  await aktion(p,'mode-reset');await z('passwort');
}
async function pixel(browser,a,b){
  if(a.equals(b))return 0;
  const p=await browser.newPage();
  try{return await p.evaluate(async([a,b])=>{
    const load=async s=>{const i=new Image();i.src='data:image/png;base64,'+s;await i.decode();return i;};
    const x=await load(a),y=await load(b);if(x.width!==y.width||x.height!==y.height)return -1;
    const c=document.createElement('canvas');c.width=x.width;c.height=x.height;const g=c.getContext('2d',{willReadFrequently:true});
    g.drawImage(x,0,0);const d=g.getImageData(0,0,c.width,c.height).data;
    g.clearRect(0,0,c.width,c.height);g.drawImage(y,0,0);const e=g.getImageData(0,0,c.width,c.height).data;
    let n=0;for(let i=0;i<d.length;i+=4)if(d[i]!==e[i]||d[i+1]!==e[i+1]||d[i+2]!==e[i+2]||d[i+3]!==e[i+3])n++;
    return n;
  },[a.toString('base64'),b.toString('base64')]);}finally{await p.close();}
}
/* Vergleicht zwei Durchgänge; gibt Befundzeilen zurück und sichert abweichende Bilder. */
async function vergleich(browser,prefix,x,y,marke){
  const befunde=[];
  if(x.length!==y.length){befunde.push(prefix+' '+marke+': andere Zahl an Zuständen '+x.length+'/'+y.length);return befunde;}
  for(let i=0;i<x.length;i++){
    const a=x[i],b=y[i],name=prefix+'-'+a.name;
    if(a.name!==b.name){befunde.push(name+' '+marke+': anderer Zustand '+b.name);continue;}
    if(a.stil.length!==b.stil.length)befunde.push(name+' '+marke+': andere Elementzahl '+a.stil.length+'/'+b.stil.length);
    else for(let k=0;k<a.stil.length;k++)if(a.stil[k][0]!==b.stil[k][0]||a.stil[k][1]!==b.stil[k][1]){
      let was='';
      for(const wurzel of ['html','body'])if(a.roh[wurzel]!==b.roh[wurzel]){const x=a.roh[wurzel].split(';'),y=b.roh[wurzel].split(';'),xs=new Set(x),ys=new Set(y);was+=' ['+wurzel+' nur a: '+x.filter(e=>!ys.has(e)).slice(0,4).join(' / ')+' | nur b: '+y.filter(e=>!xs.has(e)).slice(0,4).join(' / ')+' | Anzahl '+x.length+'/'+y.length+']';}
      befunde.push(name+' '+marke+': berechneter Stil anders bei '+a.stil[k][0]+(a.stil[k][0]!==b.stil[k][0]?' (anderes Element: '+b.stil[k][0]+')':'')+was);break;}
    if(a.bilder.length!==b.bilder.length){befunde.push(name+' '+marke+': andere Zahl an Scrollschritten '+a.bilder.length+'/'+b.bilder.length);continue;}
    for(let k=0;k<a.bilder.length;k++){
      const n=await pixel(browser,a.bilder[k][1],b.bilder[k][1]);
      if(n!==0){
        befunde.push(name+' y='+a.bilder[k][0]+' '+marke+': '+(n<0?'andere Bildgröße':n+' Pixel anders'));
        fs.writeFileSync(path.join(aus,name+'-y'+a.bilder[k][0]+'-'+marke+'-a.png'),a.bilder[k][1]);
        fs.writeFileSync(path.join(aus,name+'-y'+b.bilder[k][0]+'-'+marke+'-b.png'),b.bilder[k][1]);
      }
    }
  }
  return befunde;
}
(async()=>{const b=await chromium.launch({...(process.env.CHROMIUM?{executablePath:process.env.CHROMIUM}:{}),args:(process.env.F_SICHT_ARGS||'').split(' ').filter(Boolean)});try{
  console.log('Browser '+b.version()+', Zusatzschalter: '+(process.env.F_SICHT_ARGS||'keine'));
  const faelle=[];
  for(const vp of [GERAETE.handy,{...GERAETE.handy,width:320,height:568},GERAETE.ipad])
  for(const thema of ['hell','dunkel'])for(const ruhig of [false,true]){
    for(const leer of [false,true])faelle.push({vp,thema,ruhig,leer,gast:false});
    faelle.push({vp,thema,ruhig,gast:true});
  }
  for(const f of faelle){
    const prefix=[f.vp.width,f.thema,f.ruhig?'ruhig':'bewegt',f.gast?'gast':f.leer?'leer':'voll'].join('-');
    if(process.env.F_FOTO_FILTER&&!prefix.includes(process.env.F_FOTO_FILTER))continue;
    const gang=async css=>{
      let opt;
      if(f.gast)opt={user:null,store:{},thema:f.thema,ruhig:f.ruhig,ls:{'adrabic-thema':f.thema}};
      else{const store=JSON.parse(JSON.stringify(f.leer?basis.leer:basis.voll));store['users/u1'].settings.thema=f.thema;
        opt={thema:f.thema,ruhig:f.ruhig,leer:f.leer,store,ls:{'adrabic-thema':f.thema}};}
      const {p,ctx}=await seite(b,f.vp,opt,css);const liste=[];
      try{
        assert.equal(await p.evaluate(()=>document.documentElement.dataset.thema),f.thema,'Thema '+prefix);
        if(f.gast)await gastgang(p,liste);else await rundgang(p,f.leer,liste);
        assert.deepEqual(p.fehler,[],'Browserfehler '+prefix);
      }finally{await ctx.close();}
      return liste;
    };
    const alt=await gang(cssAlt),neu=await gang(cssNeu);
    let befunde=await vergleich(b,prefix,alt,neu,'alt-neu');
    let zusatz='';
    if(kontrolle){
      const k=await vergleich(b,prefix,alt,await gang(cssAlt),'alt-alt');schwankung+=k.length;
      /* Ein Foto, das schon Alt gegen Alt schwankt, misst nichts: Es wird als
         „nicht messbar“ ausgewiesen statt der Änderung zugerechnet. Stilbefunde
         und Fotos mit gleicher Kontrolle bleiben streng. */
      const ort=t=>/ y=\d+ /.test(t)?t.split(' alt-')[0]:null;
      const schwankt=new Set(k.map(ort).filter(Boolean));
      const unmessbar=befunde.filter(t=>schwankt.has(ort(t)));
      befunde=befunde.filter(t=>!schwankt.has(ort(t)));nichtMessbar+=schwankt.size;
      zusatz=' | Kontrolle Alt/Alt: '+(k.length?k.join('; '):'gleich')+(unmessbar.length?' | nicht messbar: '+unmessbar.join('; '):'');
    }
    const nFotos=alt.reduce((s,z)=>s+z.bilder.length,0),nStile=alt.reduce((s,z)=>s+z.stil.length,0);
    fotos+=nFotos;stile+=nStile;rot.push(...befunde);
    console.log(prefix+': '+alt.length+' Zustände, '+nFotos+' Fotos, '+nStile+' Elementstile – '+(befunde.length?'ROT '+befunde.join('; '):'gleich')+zusatz);
  }
  console.log('\nGesamt: '+fotos+' Fensterfotos, '+stile+' Elementstile, '+rot.length+' Abweichungen Alt/Neu'+(kontrolle?', '+schwankung+' Schwankungen Alt/Alt, '+nichtMessbar+' Fotos nicht messbar':''));
  assert.equal(rot.length,0,'F12-Fotovergleich rot');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

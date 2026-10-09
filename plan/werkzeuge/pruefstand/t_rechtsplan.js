/* E4 Umfeld: vorhandener Dialog, unveränderter Rechtsinhalt und alle Rückwege.
   Die vollständige Einstiegs-Gegenprobe steht in t_paket_e.js E4 --rechts-alt
   gegen d64380a (3.18.28), nie HEAD. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {start,neueSeite,GERAETE} = require('./lib');
const {pruefeKontrast} = require('./kontrast');
const repo = path.resolve(__dirname,'../../..');
const dateien = {datenschutz:'datenschutzerklaerung.html',impressum:'impressum.html'};
async function seite(b,vp,opt={}) {
  return neueSeite(b,vp,{...opt,vorher:async ctx=>{
    await ctx.addInitScript(()=>{navigator.serviceWorker.register=()=>Promise.reject(new Error('Prüfung ohne Worker'));});
    const body=fs.readFileSync(path.join(repo,'app.js'),'utf8')+'\nwindow.__R={ui,render,zeigeRecht};';
    await ctx.route(u=>u.pathname.endsWith('/app.js'),r=>r.fulfill({body,contentType:'text/javascript'}));
  }});
}
async function oeffne(p,id) {
  await p.locator(`#app > .solo [data-action="recht-zeigen"][data-id="${id}"], #app > .view [data-action="recht-zeigen"][data-id="${id}"]`).click();
  await p.waitForSelector('#dlg-recht-inhalt .sektion');
  await p.waitForTimeout(350);
}
async function zu(p,art) {
  if(art==='Escape') await p.keyboard.press('Escape');
  else if(art==='daneben') await p.locator('.dlg-backdrop').click({position:{x:2,y:2}});
  else await p.locator('[aria-labelledby="dlg-title"] [data-action="dlg-ok"]').click();
  await p.waitForFunction(()=>!document.querySelector('[aria-labelledby="dlg-title"]'));
}
(async()=>{
  const b=await start();
  try {
    for(const vp of [{...GERAETE.handy,width:320,height:568},GERAETE.handy,GERAETE.ipad])
    for(const thema of ['hell','dunkel']) {
      const {p,ctx}=await seite(b,vp,{user:null,ls:{'adrabic-thema':thema},ruhig:thema==='hell'});
      try {
        await p.evaluate(()=>{__R.ui.einstieg=null;__R.ui.authGewaehlt=true;__R.ui.authMode='register';__R.render();});
        await p.fill('#a-name','Name bleibt');await p.fill('#a-email','bleibt@example.com');await p.fill('#a-pass','Passwort-bleibt');
        assert.equal(await p.locator('html').getAttribute('data-thema'),thema);
        for(const id of Object.keys(dateien)) {
          const url=p.url();await oeffne(p,id);
          assert.equal(ctx.pages().length,1);assert.equal(p.url(),url);
          const original=fs.readFileSync(path.join(repo,dateien[id]),'utf8');
          const gleich=await p.evaluate(html=>{
            const doc=new DOMParser().parseFromString(html,'text/html');
            const quelle=doc.querySelector('.rechtsseite');quelle.querySelectorAll('.rechtsseite__zurueck,h1,script').forEach(x=>x.remove());
            const norm=s=>s.replace(/\s+/g,' ').trim();
            return norm(quelle.textContent)===norm(document.querySelector('#dlg-recht-inhalt .rechtsseite').textContent);
          },original);
          assert.ok(gleich,'Rechtsinhalt vollständig und unverändert');
          const lage=await p.evaluate(()=>{
            const dlg=document.querySelector('.dlg'),knopf=dlg.querySelector('[data-action="dlg-ok"]');
            const r=knopf.getBoundingClientRect(),d=dlg.getBoundingClientRect();
            return {quer:document.documentElement.scrollWidth>innerWidth+1,unten:r.bottom<=innerHeight+1,imBlatt:r.bottom<=d.bottom+1,gesperrt:document.documentElement.classList.contains('blatt-offen'),fokus:dlg.contains(document.activeElement)};
          });
          assert.deepEqual(lage,{quer:false,unten:true,imBlatt:true,gesperrt:true,fokus:true});
          // Der allgemeine Leser kennt Scroll-Clips nicht: iPad meldete eine
          // unsichtbare Überschrift bei y=1058, Inhalt endet bei y=905.
          // Alle Textabschnitte durchscrollen und nur tatsächlich sichtbare
          // Befunde übernehmen. Kontrastgrenze bleibt unverändert 4,5:1.
          const scroll=p.locator('#dlg-recht-inhalt');
          const masse=await scroll.evaluate(el=>({hoehe:el.clientHeight,gesamt:el.scrollHeight}));
          for(let y=0;y<masse.gesamt;y+=Math.max(1,Math.floor(masse.hoehe*.7))) {
            await scroll.evaluate((el,y)=>{el.scrollTop=y;},y);
            const funde=await pruefeKontrast(p,`Recht ${vp.width}/${thema}/${id}/${y}`);
            const sichtbar=await p.evaluate(funde=>{
              const clip=document.querySelector('#dlg-recht-inhalt').getBoundingClientRect();
              return funde.filter(f=>{
                const el=[...document.querySelectorAll('#dlg-recht-inhalt *')].find(el=>el.className===f.klasse&&el.textContent.trim().startsWith(f.text));
                if(!el) return true;
                const r=el.getBoundingClientRect();return r.bottom>clip.top&&r.top<clip.bottom;
              });
            },funde);
            assert.deepEqual(sichtbar,[]);
          }
          await p.locator('#dlg-recht-inhalt').evaluate(el=>{el.scrollTop=el.scrollHeight;});
          assert.ok(await p.locator('#dlg-recht-inhalt .rechtsfuss').isVisible());
          await zu(p,id==='datenschutz'?'Zurück':'Escape');
          assert.equal(await p.inputValue('#a-name'),'Name bleibt');assert.equal(await p.inputValue('#a-email'),'bleibt@example.com');assert.equal(await p.inputValue('#a-pass'),'Passwort-bleibt');
          assert.equal(await p.locator('html').evaluate(el=>el.classList.contains('blatt-offen')),false);
        }
        await oeffne(p,'impressum');await zu(p,'daneben');
        assert.deepEqual(p.fehler,[]);
        if(vp.width===390&&thema==='hell') { await oeffne(p,'datenschutz');await p.screenshot({path:path.join(process.env.PRUEF_BILDER||require('os').tmpdir(),'rechtsplan-390-hell.png')});await zu(p,'Zurück'); }
        console.log(`Recht ${vp.width}/${thema}: Inhalt vollständig, Kontrast, Rückweg sichtbar, Zurück/Escape/daneben, Eingaben erhalten`);
      } finally {await ctx.close();}
    }
    const {p,ctx}=await seite(b,GERAETE.handy);
    try {
      await p.evaluate(()=>{__R.ui.einstellungen=true;__R.render();});
      await oeffne(p,'impressum');
      await p.locator('#dlg-recht-inhalt .rechtsfuss [data-id="datenschutz"]').click();
      await p.waitForFunction(()=>document.querySelector('#dlg-title')?.textContent==='Datenschutz'&&document.querySelector('#dlg-recht-inhalt .sektion'));
      await zu(p,'Zurück');assert.ok(await p.locator('.rechtsfuss').isVisible());
      let anfragen=0;
      await ctx.route('**/datenschutzerklaerung.html',r=>{anfragen++;return r.fulfill({status:503,body:'nicht verfügbar'});});
      await p.locator('#app [data-action="recht-zeigen"][data-id="datenschutz"]').click();
      await p.waitForSelector('#dlg-recht-inhalt [data-action="recht-zeigen"]');
      await p.waitForTimeout(400);assert.equal(anfragen,1,'kein automatischer Neuversuch');
      await ctx.unroute('**/datenschutzerklaerung.html');
      await p.locator('#dlg-recht-inhalt [data-action="recht-zeigen"]').click();await p.waitForSelector('#dlg-recht-inhalt .sektion');await zu(p,'Zurück');
      let freigeben;
      await ctx.route('**/datenschutzerklaerung.html',async r=>{await new Promise(resolve=>{freigeben=resolve;});await r.continue();});
      await p.locator('#app [data-action="recht-zeigen"][data-id="datenschutz"]').click();
      while(!freigeben) await p.waitForTimeout(20);
      await zu(p,'Zurück');await oeffne(p,'impressum');freigeben();await p.waitForTimeout(300);
      assert.equal(await p.locator('#dlg-title').textContent(),'Impressum');
      assert.ok(!(await p.locator('#dlg-recht-inhalt').textContent()).includes('Kurz gesagt'),'alte Antwort ersetzt neuen Dialog nicht');
      await zu(p,'Zurück');assert.deepEqual(p.fehler,[]);
      console.log('Recht Einstellungen: Querverweis, Fehler/Neuversuch, späte Antwort verworfen, Rückkehr bleibt in Einstellungen');
    } finally {await ctx.close();}
  } finally {await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

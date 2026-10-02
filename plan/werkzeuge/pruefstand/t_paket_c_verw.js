/* Paket C / Verwalten: echte Abläufe, --alt gegen festen Commit b60abf4. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const {start, neueSeite, aktion, foto, GERAETE} = require('./lib');
const repo = path.resolve(__dirname, '../../..');
const alt = process.argv.includes('--alt');
const fall = process.argv.find(x => /^C\d+$/.test(x));
const faelle = {
  async C12(p) {
    await aktion(p, 'tab-verwalten');
    const edit = async () => { await p.evaluate(() => __CV.editCard('k4')); await p.waitForTimeout(600); };
    const fragen = async () => {
      await p.waitForTimeout(600);
      assert.ok(await p.locator('.dlg').count(), 'C12 Entwurf ohne Rückfrage geschlossen');
      assert.ok((await p.locator('.dlg').last().innerText()).includes('Änderungen verwerfen?'), 'C12 Rückfrage fehlt');
      assert.equal(await p.locator('#f-ueb').inputValue(), 'Überarbeitete Übersetzung', 'C12 Entwurf verloren');
      assert.equal(await p.evaluate(() => window.__FB.store.get('users/u1/karten/k4').uebersetzung), 'Schule', 'C12 Cloud verändert');
    };
    await edit();
    await p.keyboard.press('Escape'); await p.waitForTimeout(600);
    assert.equal(await p.locator('#f-ueb').count(), 0, 'C12 unveränderte Karte braucht keine Rückfrage');
    await edit(); await p.fill('#f-ueb', 'Überarbeitete Übersetzung');
    await p.fill('#f-extra', 'Überarbeitete Notiz');
    await p.keyboard.press('Escape'); await fragen();
    await p.locator('.dlg').last().getByRole('button', {name:'Abbrechen', exact:true}).click();
    await p.waitForTimeout(600);
    assert.equal(await p.locator('#f-extra').inputValue(), 'Überarbeitete Notiz');
    await p.keyboard.press('Escape'); await fragen();
    await p.locator('.dlg').last().getByRole('button', {name:'Verwerfen', exact:true}).click();
    await p.waitForTimeout(600);
    assert.equal(await p.locator('#f-ueb').count(), 0, 'C12 Verwerfen schließt');
    await edit(); await p.fill('#f-ueb', 'Überarbeitete Übersetzung');
    const box = await p.locator('.dlg').boundingBox();
    const cdp = await p.context().newCDPSession(p);
    const x = box.x + box.width / 2, y = box.y + 15;
    await cdp.send('Input.dispatchTouchEvent', {type:'touchStart', touchPoints:[{x,y}]});
    for (const dy of [20,60,100,140]) {
      await cdp.send('Input.dispatchTouchEvent', {type:'touchMove', touchPoints:[{x,y:y+dy}]});
      await p.waitForTimeout(25);
    }
    await cdp.send('Input.dispatchTouchEvent', {type:'touchEnd',touchPoints:[]});
    await fragen(); await cdp.detach();
    await p.locator('.dlg').last().getByRole('button', {name:'Abbrechen', exact:true}).click();
    await p.waitForTimeout(400);
    await aktion(p, 'karte-sheet-zu');
    assert.equal(await p.locator('#f-ueb').count(), 0, 'C12 Abbrechen bleibt direkt');
    await edit();
    const select = p.locator('#f-stufe');
    const vorher = await select.inputValue();
    const anders = await select.locator('option').evaluateAll((els, v) => els.find(e => e.value !== v).value, vorher);
    await select.selectOption(anders);
    await p.keyboard.press('Escape'); await p.waitForTimeout(500);
    assert.ok((await p.locator('.dlg').last().innerText()).includes('Änderungen verwerfen?'), 'C12 Standänderung geht verloren');
    await p.locator('.dlg').last().getByRole('button',{name:'Abbrechen',exact:true}).click();
    await p.waitForTimeout(500);
    assert.equal(await p.locator('#f-stufe').inputValue(),anders,'C12 gewählter Stand nach Rückfrage verloren');
    assert.equal(await p.evaluate(()=>window.__FB.store.get('users/u1/karten/k4').stufe),Number(vorher),'C12 Rückfrage speichert Stand nicht');
  },
  async C13(p) {
    await aktion(p,'tab-verwalten');
    const ablegen=async()=>{
      await p.evaluate(async()=>{
        __CV.ui.setsOffen=false;__CV.ui.selectMode=true;
        __CV.ui.selectedIds=new Set(['k0','k1']);
        await __CV.saveSelectedToSet('s5');
      });
      await p.waitForTimeout(850);
    };
    await ablegen();
    assert.ok(await p.evaluate(()=>__CV.ui.setsOffen),'C13 Panel bleibt zu');
    assert.equal(await p.locator('#set-s5 .set-cards').count(),1,'C13 Ziel nicht aufgeklappt');
    assert.equal(await p.locator('#set-s5 .set-cards > .card-row').count(),4,'C13 Inhalt fehlt');
    assert.ok((await p.locator('#ansage').textContent()).includes('2 Karten in „Schwierig“'),'C13 Ansage fehlt');
    const lage=await p.locator('#set-s5').boundingBox();
    assert.ok(lage.y>=0 && lage.y < p.viewportSize().height-90,'C13 Ziel nicht im Bild');
    const ids=await p.evaluate(()=>window.__FB.store.get('users/u1/bereiche/b1').sets.s5.cardIds);
    assert.deepEqual([...ids].sort(),['k0','k1','k5','k9']);
    await ablegen();
    assert.ok((await p.locator('#ansage').textContent()).includes('War schon drin'),'C13 doppelte Auswahl ohne Erklärung');
    assert.equal(await p.locator('#set-s5 .set-cards > .card-row').count(),4,'C13 doppelte IDs');
    const vorher=await p.locator('#karten-liste > .card-row').evaluateAll(es=>es.slice(0,3).map(e=>e.dataset.cardid));
    await p.locator('#karten-liste > .card-row').first().locator('.drag-handle').focus();
    await p.keyboard.press('ArrowDown');await p.waitForTimeout(650);
    assert.ok(await p.evaluate(()=>!!document.activeElement.closest('#karten-liste')),'C13 Fokus wechselt in offene Speicherkarte');
    await p.keyboard.press('ArrowDown');await p.waitForTimeout(650);
    const nachher=await p.locator('#karten-liste > .card-row').evaluateAll(es=>es.slice(0,3).map(e=>e.dataset.cardid));
    assert.deepEqual(nachher,[vorher[1],vorher[2],vorher[0]],'C13 Hauptliste bleibt bei zweiter Pfeiltaste stehen');
  },
  async C14(p) {
    await aktion(p,'tab-verwalten');
    await p.evaluate(()=>{__CV.ui.searchAll=true;__CV.ui.searchQuery='Buch';__CV.selectBereich('b2');});
    await p.waitForTimeout(600);
    assert.equal(await p.evaluate(()=>__CV.ui.searchAll),false,'C14 alte globale Suche bleibt');
    assert.equal(await p.locator('.view .empty').count(),1,'C14 leerer Bereich ohne Leerzustand');
    assert.equal(await p.locator('[data-action="karte-neu"]').count(),1,'C14 doppelte Hauptaktion');
    const code=p.locator('[data-action="code-einloesen-start"]');
    assert.equal(await code.count(),1,'C14 Code fehlt');
    assert.equal(await p.locator('[data-action="import-trigger"]').count(),1,'C14 Dateieinspielen fehlt');
    await p.evaluate(()=>{__CV.ui.searchAll=true;__CV.ui.searchQuery='Buch';__CV.render();});
    assert.ok(await p.locator('#karten-liste > .card-row').count(),'C14 globale Suche im leeren Bereich verloren');
    await p.fill('#f-search','');await p.waitForTimeout(400);
    assert.equal(await p.locator('.view .empty').count(),1,'C14 Suche leeren verliert Leerzustand');
    assert.equal(await p.locator('[data-action="karte-neu"]').count(),1);
    if([320,1440].includes(p.viewportSize().width))await foto(p,'paket-c-C14-leer-'+p.viewportSize().width);
    await code.click();await p.waitForTimeout(500);
    assert.equal(await p.locator('.dlg input').count(),1,'C14 Code öffnet keine Eingabe');
  }
};
(async () => {
  const browser = await start();
  try {
    for (const name of fall ? [fall] : Object.keys(faelle)) {
      for (const vp of [GERAETE.handy, {...GERAETE.handy,width:320,height:568}, GERAETE.ipad, ...(name==='C14'?[GERAETE.desktop]:[])]) {
        for (const thema of ['hell','dunkel']) for (const ruhig of [false,true]) {
          const {p,ctx} = await neueSeite(browser,vp,{thema,ruhig,vorher:async ctx => {
            await ctx.addInitScript(() => { navigator.serviceWorker.register = () => Promise.reject(new Error('Test ohne Worker')); });
            for (const datei of ['app.js','styles.css']) {
              let body = alt ? execFileSync('git',['show','b60abf4:'+datei],{cwd:repo,encoding:'utf8',maxBuffer:4e6}) : fs.readFileSync(path.join(repo,datei),'utf8');
              if (datei === 'app.js') body += '\nwindow.__CV = {ui, render, editCard, selectBereich, saveSelectedToSet};';
              await ctx.route(u=>u.hostname==='127.0.0.1'&&u.pathname.endsWith('/'+datei),r=>r.fulfill({body,contentType:datei.endsWith('.js')?'text/javascript':'text/css'}));
            }
          }});
          try {
            await faelle[name](p);
            assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Querscrollen');
            assert.deepEqual(p.fehler,[]);
            if(vp.width===320&&!ruhig)await foto(p,'paket-c-'+name+'-'+thema);
            console.log(name,'grün',vp.width,thema,ruhig);
          } finally { await ctx.close(); }
        }
      }
    }
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});

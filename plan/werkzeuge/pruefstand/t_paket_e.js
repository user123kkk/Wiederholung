/* Paket E: Gegenproben am festen 8762d38 (3.18.14), nie HEAD. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const {start,neueSeite,aktion,GERAETE,vollerStore,tag} = require('./lib');
const alt = process.argv.includes('--alt');
const aufgabe = process.argv.find(a=>/^E\d+$/.test(a));
const repo = path.resolve(__dirname,'../../..');
function quelle(f) { return alt?execFileSync('git',['show','8762d38:'+f],{cwd:repo,encoding:'utf8',maxBuffer:4e6}):fs.readFileSync(path.join(repo,f),'utf8'); }
async function seite(b,vp,opt={}) {
  return neueSeite(b,vp,{...opt,vorher:async ctx=>{
    await ctx.addInitScript(()=>{navigator.serviceWorker.register=()=>Promise.reject(new Error('Prüfung ohne Worker'));});
    if(opt.zeit)await ctx.addInitScript(iso=>{const Echt=Date;window.__zeitE=new Echt(iso).getTime();window.Date=class extends Echt{constructor(...a){super(...(a.length?a:[window.__zeitE]));}static now(){return window.__zeitE;}};},opt.zeit);
    for(const f of ['app.js','styles.css','index.html']) {
      let body=alt?execFileSync('git',['show','8762d38:'+f],{cwd:repo,encoding:'utf8',maxBuffer:4e6}):fs.readFileSync(path.join(repo,f),'utf8');
      if(f==='app.js') body+='\nwindow.__E={render,verlaufZuruecksetzen,serieAktuell,kontoLoeschenAusfuehren,kontoDatenLoeschen,kontoAuthLoeschen,erinnerungIcs,erinnerungHerunterladen,dateiSpeichern,lernenHinweis,hinweisSpeicher,get streak(){return streak;},get ui(){return ui;}};';
      if(f==='app.js'&&opt.kandidat)body+='\nif(!ARAB_STUFEN.some(x=>x.id==="sehrgross"))ARAB_STUFEN.push({id:"sehrgross",label:"Sehr groß",faktor:1.6});';
      await ctx.route(u=>u.hostname==='127.0.0.1'&&u.pathname.endsWith('/'+f),r=>r.fulfill({body,contentType:f.endsWith('.js')?'text/javascript':f.endsWith('.css')?'text/css':'text/html'}));
    }
  }});
}
async function e2(b) {
  for(const vp of [GERAETE.handy,{...GERAETE.handy,width:320,height:568},GERAETE.ipad])
  for(const thema of ['hell','dunkel']) {
    const store=vollerStore({thema});
    for(const [k,v]of Object.entries({...store}))store[k.replace('users/u1','users/u2')]=structuredClone(v);
    const {p,ctx}=await seite(b,vp,{store});
    try {
      await p.evaluate(async()=>{__E.ui.einstellungen=true;__E.ui.seite='konto-loeschen';__E.render();await __E.kontoDatenLoeschen();await __E.kontoAuthLoeschen();});
      await p.evaluate(()=>{const s=__FB;s.user={uid:'u2',emailVerified:true,email:'zwei@example.com',getIdToken:()=>Promise.resolve('tok')};for(const cb of s.authListeners)cb(s.user);});
      await p.waitForTimeout(900);
      assert.equal(await p.evaluate(()=>__E.ui.seite),null);
      assert.equal(await p.locator('[data-action="seite-zu"]').count(),0);
      assert.equal(await p.evaluate(()=>__E.ui.kontoLoeschenEmail),'');
      assert.equal(await p.locator('[data-action="start-session"]').count(),1);
      assert.deepEqual(p.fehler,[]);
      console.log(`E2 ${vp.width}/${thema}: A gelöscht, B ohne alte Unterseite bedienbar`);
    } finally {await ctx.close();}
  }
}
async function e4(b) {
  for(const vp of [GERAETE.handy,{...GERAETE.handy,width:320,height:568},GERAETE.ipad]) {
    const {p,ctx}=await seite(b,vp,{user:null});
    try {
      for(const [a,id] of [['einstieg-weiter'],['einstieg-ziel','kurs'],['einstieg-weiter'],['einstieg-huerde','keine'],['einstieg-weiter'],['einstieg-aufdecken'],['einstieg-bewerten','Sicher'],['einstieg-weiter'],['einstieg-weiter'],['einstieg-weiter'],['einstieg-anker','eigen']])await aktion(p,a,id);
      await p.fill('#einstieg-frei','Testmoment');await aktion(p,'einstieg-weiter',null,8000);
      await aktion(p,'einstieg-fertig');
      await p.fill('#a-name','E4 Name');await p.fill('#a-email','e4@example.com');
      for(const file of ['datenschutzerklaerung.html','impressum.html']) {
        const link=p.locator(`#app a[href="./${file}"]`);
        assert.equal(await link.getAttribute('target'),'_blank','E4 Rechtslink ersetzt App');
        const [popup]=await Promise.all([p.waitForEvent('popup'),link.click()]);
        await popup.waitForLoadState();assert.ok(await popup.locator('h1').isVisible());await popup.close();
        assert.equal(await p.inputValue('#a-name'),'E4 Name');assert.equal(await p.inputValue('#a-email'),'e4@example.com');
      }
      assert.deepEqual(p.fehler,[]);console.log(`E4 ${vp.width}: ganzer Einstieg, beide Rechtsseiten, Name/Adresse erhalten`);
    } finally {await ctx.close();}
  }
}
async function e5(b) {
  const {p,ctx}=await seite(b,GERAETE.handy);
  try {
    await p.evaluate(()=>{window.__widerrufen=[];const revoke=URL.revokeObjectURL;URL.revokeObjectURL=u=>{__widerrufen.push(u);revoke.call(URL,u);};window.__fristen=[];const timer=setTimeout;window.setTimeout=(f,ms,...args)=>{if(String(f).includes('revokeObjectURL'))__fristen.push(ms);return timer(f,ms,...args);};});
    const [download]=await Promise.all([p.waitForEvent('download'),p.evaluate(()=>__E.dateiSpeichern({test:'E5'},'e5.json'))]);
    assert.equal(download.suggestedFilename(),'e5.json');
    assert.deepEqual(await p.evaluate(()=>__widerrufen),[],'E5 Blob sofort widerrufen');
    assert.ok((await p.evaluate(()=>__fristen)).some(x=>x>=60000),'E5 Download bekommt 60 s');
    await p.evaluate(()=>{__E.ui.einstellungen=true;__E.ui.seite='konto-loeschen';__E.render();});
    assert.match(await p.locator('#app').innerText(),/Prüf, ob die Datei in deinen Downloads liegt/);
    // E5: der längere Prüfsatz darf auf großen Bildschirmen keine zu breite Textzeile erzeugen.
    for(const vp of [{width:320,height:568},GERAETE.handy,GERAETE.ipad,{width:1180,height:820},{width:1440,height:1000}]) {
      await p.setViewportSize(vp);await p.evaluate(()=>__E.render());await p.waitForTimeout(80);
      const m=await p.evaluate(()=>{
        const e=[...document.querySelectorAll('#app p')].find(e=>e.textContent.includes('Prüf, ob die Datei in deinen Downloads liegt'));
        return {breite:e.getBoundingClientRect().width/parseFloat(getComputedStyle(e).fontSize),quer:document.documentElement.scrollWidth>innerWidth+1};
      });
      assert.ok(m.breite<=48.01&&!m.quer,'E5 Sicherungshinweis zu breit: '+JSON.stringify(m));
      console.log(`E5 ${vp.width}: Sicherungshinweis ${m.breite.toFixed(2)} Schriftbreiten, kein Überlauf`);
    }
    console.log('E5 Chromium: Datei angeboten, Blob 60 s erhalten, Prüfsatz sichtbar; iOS offen');
  } finally {await ctx.close();}
}
async function e6(b) {
  const {p,ctx}=await seite(b,GERAETE.handy);
  try {
    const werte=await p.evaluate(()=>{
      const Echt=Date;
      window.Date=class extends Echt {constructor(...a){super(...(a.length?a:[2026,9,4,12,0,0]));}static now(){return new Echt(2026,9,4,12,0,0).getTime();}};
      const heute=__E.erinnerungIcs('19:30',1),morgen=__E.erinnerungIcs('09:00',2);window.Date=Echt;return {heute,morgen};
    });
    assert.match(werte.heute,/DTSTART:20261004T193000/,'E6 zukünftige Zeit heute');assert.match(werte.morgen,/DTSTART:20261005T090000/);
    const [download]=await Promise.all([p.waitForEvent('download'),p.evaluate(()=>__E.erinnerungHerunterladen('19:30'))]);
    assert.equal(download.suggestedFilename(),'adrabic-erinnerung.ics');
    await p.evaluate(()=>{__E.ui.einstellungen=true;__E.render();});
    assert.match(await p.locator('[data-action="erinnerung-auf"]').innerText(),/Vorlage.*19:30/,'E6 Zeile behauptet keinen eingerichteten Termin');
    console.log('E6 heute/morgen, ICS angeboten, neutraler Status; iOS/Android-Geräte offen');
  } finally {await ctx.close();}
}
async function e8(b) {
  const store=vollerStore();store['users/u1'].streak={sockel:0,sockelBis:tag(-100)};store['users/u1'].verlauf[tag(0)]={w:1};
  const {p,ctx}=await seite(b,GERAETE.handy,{store});
  try {
    assert.match(await p.evaluate(()=>__E.lernenHinweis()),/meilenstein/);
    const gespeichert=await p.evaluate(()=>__E.hinweisSpeicher());
    assert.equal(gespeichert.meilensteinTag,tag(0),'E8 erster Anzeigetag gespeichert');
    await p.evaluate(()=>{const d=JSON.parse(localStorage.getItem('adrabic-hinweise'));const tag=new Date();tag.setDate(tag.getDate()-1);d.meilensteinTag=tag.getFullYear()+'-'+String(tag.getMonth()+1).padStart(2,'0')+'-'+String(tag.getDate()).padStart(2,'0');localStorage.setItem('adrabic-hinweise',JSON.stringify(d));});
    assert.ok(!(await p.evaluate(()=>__E.lernenHinweis())).includes('meilenstein'),'E8 gestriger Hinweis verdrängt andere');
    console.log('E8 erster Tag gemerkt; gestriger Meilenstein läuft ab');
  } finally {await ctx.close();}
  if(!alt) for(const vp of [{...GERAETE.handy,width:320,height:568},GERAETE.handy,GERAETE.ipad])for(const thema of ['hell','dunkel']) {
    const w=vollerStore({thema});w['users/u1'].streak={sockel:0,sockelBis:'2026-01-01'};
    w['users/u1'].verlauf['2026-10-05']={w:1};w['users/u1'].verlauf['2026-10-06']={w:1};w['users/u1'].verlauf['2026-10-07']={w:1};
    const s=await seite(b,vp,{store:w,zeit:'2026-10-05T12:00:00'});
    try {
      assert.match(await s.p.evaluate(()=>__E.lernenHinweis()),/meilenstein/);
      for(const d of ['2026-10-06T12:00:00','2026-10-07T12:00:00']) {
        await s.p.evaluate(d=>window.__zeitE=new Date(d).getTime(),d);
        assert.match(await s.p.evaluate(()=>__E.lernenHinweis()),/rueckblick/,'E8 Rückblick nach Ablauf verdrängt');
      }
      console.log(`E8 ${vp.width}/${thema}: Montag gezeigt, Dienstag/Mittwoch Rückblick`);
    } finally {await s.ctx.close();}
  }
}
async function e9(b) {
  for(const vp of [{...GERAETE.handy,width:320,height:568},GERAETE.handy,GERAETE.ipad])for(const thema of ['hell','dunkel']) {
    const store=vollerStore({thema});store['users/u1'].name='N'.repeat(40);
    store['feedback/e9']={text:'T'.repeat(100),beschreibung:'B'.repeat(100),votes:1,createdAt:1};
    const {p,ctx}=await seite(b,vp,{store});
    try {
      await aktion(p,'einstellungen');
      assert.equal(await p.locator('.profil__text strong').innerText(),'N'.repeat(40));
      const pruef=()=>p.evaluate(()=>[...document.querySelectorAll('.profil__text strong,.ideen-text strong,.ideen-text .hint')].filter(e=>e.offsetParent!==null).every(e=>e.scrollWidth<=e.clientWidth+1&&e.getBoundingClientRect().right<=innerWidth));
      assert.ok(await pruef(),'E9 Profil läuft über');
      await aktion(p,'einst-seite','feedback');await p.waitForTimeout(300);
      assert.equal(await p.locator('.ideen-text strong').first().innerText(),'T'.repeat(100));
      assert.ok(await pruef(),'E9 Board läuft über');console.log(`E9 ${vp.width}/${thema}: Profil und Board lange Wörter passen`);
    } finally {await ctx.close();}
  }
}
async function e10(b) {
  const {p,ctx}=await seite(b,GERAETE.handy);
  try {assert.equal(await p.getAttribute('meta[name="theme-color"]','content'),'#111010');console.log('E10 theme-color entspricht dunklem Seitenhintergrund');}
  finally {await ctx.close();}
}
async function loeschenBeginnen(p) {
  await p.evaluate(()=>{__E.ui.einstellungen=true;__E.ui.seite='konto-loeschen';__E.ui.kontoLoeschenEmail='test@example.com';__E.render();__E.kontoLoeschenAusfuehren();});
  await p.fill('.dlg input','richtig');await aktion(p,'dlg-ok',null,300);
}
async function e11(b) {
  for(const sofort of [false,true]) for(const vp of [{...GERAETE.handy,width:320,height:568},GERAETE.handy,GERAETE.ipad]) for(const thema of ['hell','dunkel']) {
    const {p,ctx}=await seite(b,vp,{thema});
    try {
      await p.evaluate(v=>__FB.deleteUserCallbackSofort=v,sofort);await loeschenBeginnen(p);await p.waitForTimeout(700);
      assert.equal(await p.evaluate(()=>__FB.user),null);
      assert.match(await p.locator('#app').innerText(),/Dein Konto ist gelöscht/);
      assert.match(await p.locator('#ansage').innerText(),/Dein Konto ist gelöscht/);
      console.log(`E11 ${vp.width}/${thema}/Callback ${sofort?'vor':'nach'} Promise: Toast und Ansage`);
    } finally {await ctx.close();}
  }
  const {p,ctx}=await seite(b,GERAETE.handy);
  try {
    await p.evaluate(()=>__FB.deleteUserHaengt=true);await loeschenBeginnen(p);await p.waitForTimeout(300);
    await p.evaluate(()=>{const s=__FB;for(const[k,v]of [...s.store])if(k.startsWith('users/u1'))s.store.set(k.replace('users/u1','users/u2'),structuredClone(v));s.user={uid:'u2',email:'b@example.com',emailVerified:true,getIdToken:()=>Promise.resolve('tok')};for(const cb of s.authListeners)cb(s.user);});
    await p.waitForTimeout(550);await p.evaluate(()=>__FB.deleteUserFreigeben());await p.waitForTimeout(550);
    assert.equal(await p.evaluate(()=>__FB.user.uid),'u2');assert.ok(!(await p.locator('#app').innerText()).includes('Dein Konto ist gelöscht'));
    console.log('E11 alte Löschantwort nach Kontowechsel: B bleibt ohne fremden Erfolg');
  } finally {await ctx.close();}
}
async function e12(b) {
  const {p,ctx}=await seite(b,GERAETE.handy);
  try {
    await p.evaluate(()=>__FB.reauthHaengt=true);await loeschenBeginnen(p);
    assert.equal(await p.evaluate(()=>__E.ui.kontoLoeschenBusy),true,'E12 keine Rückmeldung während Reauth');
    assert.ok(await p.locator('[data-halten="konto-loeschen"]').isDisabled());
    await p.waitForTimeout(12500);
    assert.match(await p.locator('.dlg').innerText(),/Keine Verbindung/);
    assert.equal(await p.evaluate(()=>__E.ui.kontoLoeschenBusy),false);
    assert.equal(await p.evaluate(()=>__FB.protokoll.includes('deleteDoc')||__FB.protokoll.includes('deleteUser')),false);
    await p.evaluate(()=>__FB.reauthFreigeben());await p.waitForTimeout(300);
    assert.equal(await p.evaluate(()=>__FB.protokoll.includes('deleteUser')),false,'Späte Reauth darf nicht löschen');
    console.log('E12 echter 12-s-Abbruch: Rückmeldung, gesperrter Knopf, keine Löschung');
  } finally {await ctx.close();}
}
async function e32(b) {
  const kandidat=process.argv.includes('--kandidat');
  for(const thema of ['hell','dunkel']) {
    const store=vollerStore({thema});store['users/u1'].settings.arabGroesse='sehrgross';let n=0;
    for(const[k,v]of Object.entries(store))if(k.includes('/karten/')){v.bereichId='b1';v.nextReview=tag(0);n++;}
    store['users/u1/karten/k5'].extra='Merksatz: '+'Das Wort steht im Buch in Lektion 3, Beispielsatz mit Erklaerung. '.repeat(5);
    store['users/u1/karten/k6'].uebersetzung='ein sehr langer Uebersetzungstext, der ueber mehrere Zeilen geht und dabei die Karte hoch macht';
    const {p,ctx}=await seite(b,{...GERAETE.handy,width:320,height:568},{store,kandidat});
    try {
      assert.equal(await p.locator('#app').evaluate(e=>e.style.getPropertyValue('--arab-scale')),'1.6','E32 Sehr groß fehlt');
      const messen=async wo=>{
        const funde=await p.evaluate(()=>[...document.querySelectorAll('#app .arabic')].filter(e=>e.offsetParent&&e.tagName!=='INPUT').filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>({klasse:e.className,text:e.textContent,breite:e.clientWidth,inhalt:e.scrollWidth})));
        assert.deepEqual(funde,[],'E32 '+wo+' überläuft');assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'E32 ganze Seite überläuft');
        const knopf=p.locator('.study-aufdecken, .grade-row');
        if(await knopf.count()) {const r=await knopf.boundingBox();assert.ok(r.y>=0&&r.y+r.height<=568+1,'E32 Aktionszeile außerhalb des Bildschirms');}
      };
      await aktion(p,'tab-verwalten');await messen('Liste');await aktion(p,'tab-lernen');await aktion(p,'start-session');
      for(let i=0;i<n;i++) {await messen('Karte '+i+' geschlossen');await aktion(p,'reveal',null,650);await messen('Karte '+i+' offen');await aktion(p,'grade-known',null,550);}
      console.log(`E32 320/${thema}: ${n} Karten und Liste ohne Überlauf`);
    } finally {await ctx.close();}
    const e=await seite(b,{...GERAETE.handy,width:320,height:568},{user:null,kandidat,thema});
    try {
      for(const[a,id]of [['einstieg-weiter'],['einstieg-ziel','kurs'],['einstieg-weiter'],['einstieg-huerde','schrift'],['einstieg-weiter'],['einstieg-aufdecken'],['einstieg-bewerten','Sicher'],['einstieg-weiter']])await aktion(e.p,a,id);
      assert.equal(await e.p.locator('[data-action="einstieg-schrift"][data-id="sehrgross"]').count(),1);
      assert.equal(await e.p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'E32 Einstieg-Auswahl überläuft');
      console.log(`E32 320/${thema}: Einstieg-Auswahl passt`);
    } finally {await e.ctx.close();}
  }
  if(!alt)for(const vp of [GERAETE.handy,GERAETE.ipad])for(const thema of ['hell','dunkel'])for(const ruhig of [false,true]) {
    const {p,ctx}=await seite(b,vp,{thema,ruhig});
    try {
      await aktion(p,'einstellungen');await aktion(p,'wahl-sheet','arab');await aktion(p,'set-arab-groesse','sehrgross');
      assert.equal(await p.evaluate(()=>__FB.store.get('users/u1').settings.arabGroesse),'sehrgross');
      await p.keyboard.press('Escape');await aktion(p,'einstellungen-zu');await aktion(p,'start-session');await aktion(p,'reveal',null,700);
      assert.equal(await p.locator('#app').evaluate(e=>e.style.getPropertyValue('--arab-scale')),'1.6');
      assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
      const box=await p.locator('.grade-row').boundingBox();assert.ok(box.y+box.height<=vp.height+1);
      console.log(`E32 ${vp.width}/${thema}/${ruhig?'ruhig':'bewegt'}: Wahl gespeichert, Karte/Knöpfe passen`);
    } finally {await ctx.close();}
  }
}
async function e31(b) {
  const {p,ctx}=await seite(b,GERAETE.handy);
  try {
    await aktion(p,'tab-verwalten');await aktion(p,'bereich-sheet-auf');await p.locator('[data-action="select-bereich"][data-bid="b2"]').filter({visible:true}).first().click();await p.waitForTimeout(550);
    await p.reload();await p.waitForTimeout(1800);assert.equal(await p.evaluate(()=>__E.ui.bereichId),'b2','E31 letzter Bereich nach Neustart vergessen');
    assert.equal(await p.evaluate(()=>localStorage.getItem('adrabic-bereich-u1')),'b2');
    await p.evaluate(()=>localStorage.setItem('adrabic-bereich-u1','entfernt'));await p.reload();await p.waitForTimeout(1800);assert.equal(await p.evaluate(()=>__E.ui.bereichId),'b1');
    await p.evaluate(()=>{const s=__FB;for(const[k,v]of [...s.store])if(k.startsWith('users/u1'))s.store.set(k.replace('users/u1','users/u2'),structuredClone(v));localStorage.setItem('adrabic-bereich-u1','b2');s.user={uid:'u2',email:'b@example.com',emailVerified:true,getIdToken:()=>Promise.resolve('tok')};for(const cb of s.authListeners)cb(s.user);});
    await p.waitForTimeout(1000);assert.equal(await p.evaluate(()=>__E.ui.bereichId),'b1','E31 Bereich eines anderen Kontos übernommen');
    console.log('E31 Neustart b2, entfernte ID b1, anderes Konto b1');
  } finally {await ctx.close();}
}
async function e30(b) {
  for(const provider of ['password','google.com','apple.com']) {
    const {p,ctx}=await seite(b,GERAETE.handy,{user:{uid:'u1',email:'test@example.com',displayName:'Test',emailVerified:true,providerData:[{providerId:provider}]}});
    try {
      await aktion(p,'einstellungen');assert.equal(await p.locator('[data-action="konto-passwort"]').count(),provider==='password'?1:0,'E30 Mail-Kontoweg fehlt oder bei OAuth sichtbar');
      if(provider==='password') {
        await aktion(p,'konto-passwort');await aktion(p,'dlg-cancel');assert.deepEqual(await p.evaluate(()=>__FB.resetAnfragen||[]),[]);
        await aktion(p,'konto-passwort');await aktion(p,'dlg-ok');assert.deepEqual(await p.evaluate(()=>__FB.resetAnfragen),['test@example.com']);assert.match(await p.locator('.dlg').innerText(),/E-Mail.*Spam/s);await aktion(p,'dlg-ok');
        await p.evaluate(()=>__FB.authFail='auth/network-request-failed');await aktion(p,'konto-passwort');await aktion(p,'dlg-ok');assert.match(await p.locator('.dlg').innerText(),/Keine Verbindung/);assert.equal(await p.evaluate(()=>__E.ui.authBusy),false);
      }
      console.log(`E30 ${provider}: passender Konto-Weg${provider==='password'?', Abbruch, Mail, Fehler':''}`);
    } finally {await ctx.close();}
  }
  if(!alt) {
    const {p,ctx}=await seite(b,GERAETE.handy,{user:{uid:'u1',email:'test@example.com',displayName:'Test',emailVerified:true,providerData:[{providerId:'password'}]}});
    try {
      await aktion(p,'einstellungen');await p.evaluate(()=>{const s=__FB;for(const[k,v]of [...s.store])if(k.startsWith('users/u1'))s.store.set(k.replace('users/u1','users/u2'),structuredClone(v));s.resetHaengt=true;});
      await aktion(p,'konto-passwort');await aktion(p,'dlg-ok');assert.equal(await p.evaluate(()=>__E.ui.authBusy),true);
      await p.evaluate(()=>{const s=__FB;s.user={uid:'u2',displayName:'B',email:'b@example.com',emailVerified:true,providerData:[{providerId:'password'}],getIdToken:()=>Promise.resolve('tok')};for(const cb of s.authListeners)cb(s.user);});await p.waitForTimeout(550);await p.evaluate(()=>__FB.resetFreigeben());await p.waitForTimeout(550);
      assert.equal(await p.locator('.dlg').count(),0,'E30 fremde Mailbestätigung in B');assert.equal(await p.evaluate(()=>__E.ui.authBusy),false);assert.deepEqual(await p.evaluate(()=>__FB.resetAnfragen),['test@example.com']);
      console.log('E30 späte A-Mailantwort: B ohne fremden Dialog/Busy');
    } finally {await ctx.close();}
  }
}
async function e27(b) {
  for(const vp of [{...GERAETE.handy,width:320,height:568},GERAETE.handy,GERAETE.ipad])for(const thema of ['hell','dunkel'])for(const ruhig of [false,true]) {
  const store=vollerStore();store['users/u1/karten/x1']={...store['users/u1/karten/k1'],bereichId:'b2',nextReview:tag(0),ersteBewertung:tag(-2)};
  store['users/u1'].settings.thema=thema;
  const {p,ctx}=await seite(b,vp,{store,ruhig});
  try {
    const k=p.locator('.banner__text [data-action="select-bereich"]');assert.equal(await k.count(),1,'E27 kein direkter Bereichsweg');
    assert.ok((await k.boundingBox()).height>=44);const bid=await k.getAttribute('data-bid');await k.click();await p.waitForTimeout(550);
    assert.equal(await p.evaluate(()=>__E.ui.bereichId),bid);assert.equal(await p.locator('[data-action="start-session"]').count(),1);
    console.log(`E27 ${vp.width}/${thema}/${ruhig?'ruhig':'bewegt'}: Bereichsweg, 44 px`);
  } finally {await ctx.close();}
  }
}
async function e24(b) {
  const {p,ctx}=await seite(b,GERAETE.handy);
  try {
    await aktion(p,'tab-verwalten');await aktion(p,'open-drill');await aktion(p,'start-drill');
    await p.locator('body').dispatchEvent('click');assert.equal(await p.evaluate(()=>__E.ui.session.revealed),false,'E24 Tipp außerhalb der Karte deckt auf');
    await p.click('.study-flaeche');await p.waitForTimeout(650);assert.equal(await p.evaluate(()=>__E.ui.session.revealed),true);
    console.log('E24 Üben: Hintergrund bleibt geschlossen, Karte deckt auf');
  } finally {await ctx.close();}
}
async function e25(b) {
  for(const gelernt of [false,true]) for(const vp of [{...GERAETE.handy,width:320,height:568},GERAETE.handy,GERAETE.ipad]) for(const thema of ['hell','dunkel']) {
    const store=vollerStore({thema});for(const[k,v]of Object.entries(store))if(k.includes('/karten/')){v.nextReview=tag(2);v.ersteBewertung=tag(-2);}
    delete store['users/u1'].verlauf[tag(0)];if(gelernt)store['users/u1'].verlauf[tag(0)]={w:1};
    const {p,ctx}=await seite(b,vp,{store});
    try {
      assert.equal(await p.locator('.stapel__titel').innerText(),gelernt?'Für heute durch':'Heute ist nichts fällig','E25 falsches Lob');
      assert.equal(await p.locator('.stapel__mitte svg').count(),gelernt?1:0);
      const ziel=await p.locator('.stapel .ring__fuellung').evaluate(e=>e.style.getPropertyValue('--ziel'));
      assert.equal(Number(ziel),gelernt?0:1);
      if(!gelernt)assert.match(await p.locator('.stapel__was').innerText(),/Die nächsten Karten kommen am/);
      console.log(`E25 ${vp.width}/${thema}/${gelernt?'gelernt':'Ruhetag'}: ehrlicher Ring und Text`);
    } finally {await ctx.close();}
  }
}
async function e22(b) {
  for(const art of ['known','unknown','almost']) for(const ruhig of [false,true]) {
    const {p,ctx}=await seite(b,GERAETE.handy,{ruhig});
    try {
      await aktion(p,'start-session');await aktion(p,'reveal',null,650);await aktion(p,'grade-'+art,null,550);
      const namen=await p.evaluate(()=>{document.querySelector('[data-action="undo-grade"]').click();document.querySelector('.study-flaeche').getBoundingClientRect();return document.getAnimations().map(a=>a.animationName);});
      assert.ok(!namen.includes('karte-kommt'),'E22 Rückgängig kommt vom Stapel');
      const name={known:'geist-rechts',unknown:'geist-links',almost:'geist-sinkt'}[art];
      if(ruhig) {
        assert.ok(!namen.includes(name),'E22 Rückkehr bewegt sich trotz reduzierter Bewegung');
        await p.waitForTimeout(50);
        const rest=await p.evaluate(()=>document.getAnimations().map(a=>({name:a.animationName,state:a.playState,dauer:a.effect.getComputedTiming().duration,ziel:a.effect.target.className})));
        assert.ok(rest.every(a=>a.state==='finished'&&a.dauer<=0.01),'E22 laufende Bewegung: '+JSON.stringify(rest));
      } else {
        assert.ok(namen.includes(name),'E22 Rückkehrrichtung fehlt: '+namen);
        assert.equal(await p.locator('.study-flaeche').evaluate(e=>getComputedStyle(e).animationDirection),'reverse');
      }
      console.log(`E22 ${art}/${ruhig?'ruhig':'bewegt'}: ${namen.join(',')||'ohne Bewegung'}`);
    } finally {await ctx.close();}
  }
}
async function e21(b) {
  const {p,ctx}=await seite(b,{...GERAETE.ipad,width:1440,height:1000});
  try {
    await aktion(p,'start-session');await p.evaluate(()=>document.activeElement?.blur());await p.keyboard.press('Space');await p.waitForTimeout(650);
    const vorher=await p.evaluate(()=>__E.ui.session.queue[0]);await p.keyboard.press('3');await p.waitForTimeout(600);await p.keyboard.press('Backspace');await p.waitForTimeout(350);
    assert.equal(await p.evaluate(()=>__E.ui.session.queue[0]),vorher,'E21 Backspace holt Karte nicht zurück');assert.equal(await p.evaluate(()=>__E.ui.session.revealed),true);
    assert.equal(await p.getAttribute('[data-action="grade-known"]','aria-keyshortcuts'),'3 ArrowRight');
    await p.keyboard.press('3');await p.waitForTimeout(600);await p.keyboard.press('Escape');await p.waitForTimeout(350);
    assert.equal(await p.evaluate(()=>__E.ui.session),null);
    assert.equal(await p.evaluate(d=>{const e=__FB.store.get('users/u1').verlauf[d];return (e?.w||0)+(e?.n||0);},tag(0)),1,'E21 Escape schreibt die heutige Antwort');
    console.log('E21 Desktop: Space, 3, Backspace, 3, Escape und Protokoll');
  } finally {await ctx.close();}
}
async function e19(b) {
  const store=vollerStore();store['users/u1'].verlauf={};store['users/u1'].streak={sockel:0,sockelBis:tag(-60),beste:10};
  for(let i=1;i<=11;i++)store['users/u1'].verlauf[tag(-i)]={w:1};
  const {p,ctx}=await seite(b,GERAETE.handy,{store});
  try {
    await aktion(p,'start-session');await aktion(p,'reveal',null,650);await aktion(p,'grade-known',null,650);await aktion(p,'end-session',null,650);
    assert.equal(await p.evaluate(()=>__E.streak.beste),12,'E19 Rekord nach Teilrunde veraltet');
    assert.equal(await p.evaluate(()=>__FB.store.get('users/u1').streak.beste),12);
    console.log('E19 erste Bewertung und X: Rekord 12 lokal und gespeichert');
  } finally {await ctx.close();}
}
async function e20(b) {
  for(const vp of [{...GERAETE.handy,width:320,height:568},GERAETE.handy,GERAETE.ipad]) for(const thema of ['hell','dunkel']) for(const ruhig of [false,true]) {
    const store=vollerStore({thema});let i=0;for(const [k,v]of Object.entries(store))if(k.includes('/karten/'))v.extra=(i++%2)?'Vorhandene Testnotiz':'';
    const {p,ctx}=await seite(b,vp,{store,ruhig});
    try {
      await aktion(p,'start-session');const xs=[];
      for(let n=0;n<12;n++) {
        xs.push((await p.locator('[data-action="karte-merken"]').boundingBox()).x);
        await aktion(p,'reveal',null,650);xs.push((await p.locator('[data-action="karte-merken"]').boundingBox()).x);
        await aktion(p,'grade-known',null,550);
      }
      assert.ok(Math.max(...xs)-Math.min(...xs)<=1,'E20 Merken wechselt die Position: '+xs.join(','));
      console.log(`E20 ${vp.width}/${thema}/${ruhig?'ruhig':'bewegt'}: 12 Karten, Merken stabil`);
    } finally {await ctx.close();}
  }
}
async function e18(b) {
  for(const vp of [{...GERAETE.handy,width:320,height:568},GERAETE.handy,GERAETE.ipad]) for(const thema of ['hell','dunkel']) {
    const store=vollerStore({thema});for(const [k,v]of Object.entries(store))if(k.includes('/karten/')){v.nextReview=tag(2);v.ersteBewertung=tag(-2);}
    const {p,ctx}=await seite(b,vp,{store});
    try {
      await aktion(p,'trotzdem-ueben');await aktion(p,'close-drill');assert.equal(await p.evaluate(()=>__E.ui.tab),'lernen','E18 falscher Rückweg');
      await aktion(p,'tab-verwalten');await aktion(p,'open-drill');await aktion(p,'close-drill');assert.equal(await p.evaluate(()=>__E.ui.tab),'verwalten');
      console.log(`E18 ${vp.width}/${thema}: Rückweg aus Lernen und Verwalten`);
    } finally {await ctx.close();}
  }
}
async function e15(b) {
  for(const vp of [{...GERAETE.handy,width:320,height:568},GERAETE.handy,GERAETE.ipad]) for(const thema of ['hell','dunkel']) {
    const {p,ctx}=await seite(b,vp,{thema});
    try {
      await aktion(p,'einstellungen');assert.equal(await p.locator('[data-action="konto-name"]').count(),1,'E15 keine Namensänderung');
      await aktion(p,'konto-name');await p.fill('#dlg-input','  Neuer Name  ');await aktion(p,'dlg-ok',null,700);
      assert.equal(await p.evaluate(()=>__FB.store.get('users/u1').name),'Neuer Name');
      assert.equal(await p.evaluate(()=>__FB.user.displayName),'Neuer Name');
      assert.equal(await p.locator('.profil__text strong').innerText(),'Neuer Name');
      await aktion(p,'konto-name');await p.fill('#dlg-input','Abbruch');await aktion(p,'dlg-cancel');
      assert.equal(await p.evaluate(()=>__FB.store.get('users/u1').name),'Neuer Name');
      await aktion(p,'konto-name');await p.fill('#dlg-input','   ');await aktion(p,'dlg-ok');assert.match(await p.locator('.dlg').innerText(),/1 bis 200/);await aktion(p,'dlg-ok');
      await ctx.setOffline(true);await aktion(p,'konto-name');assert.match(await p.locator('.dlg').innerText(),/Keine Verbindung/);
      assert.deepEqual(p.fehler,[]);console.log(`E15 ${vp.width}/${thema}: Cloud und Profil, Abbruch, Leerfeld, offline`);
    } finally {await ctx.close();}
  }
  if(!alt)await e15Grenzen(b);
}
async function e15Grenzen(b) {
  const {p,ctx}=await seite(b,GERAETE.handy);
  try {
    await aktion(p,'einstellungen');await p.evaluate(()=>__FB.fail=true);await aktion(p,'konto-name');await p.fill('#dlg-input','Cloudfehler');await aktion(p,'dlg-ok');
    assert.match(await p.locator('.dlg').innerText(),/Speicherbestätigung/);assert.equal(await p.evaluate(()=>__FB.store.get('users/u1').name),'Test');assert.equal(await p.evaluate(()=>__FB.updateProfileCalls||0),0);await aktion(p,'dlg-ok');
    await p.evaluate(()=>{__FB.fail=false;__FB.profileFail='auth/network-request-failed';});await aktion(p,'konto-name');await p.fill('#dlg-input','Cloudname');await aktion(p,'dlg-ok');
    assert.equal(await p.evaluate(()=>__FB.store.get('users/u1').name),'Cloudname');assert.match(await p.locator('.dlg').innerText(),/im Konto gespeichert.*Anmeldeprofil/s);await aktion(p,'dlg-ok');
    await p.evaluate(()=>__FB.profileFail=null);await aktion(p,'konto-name');await aktion(p,'dlg-ok');assert.equal(await p.evaluate(()=>__FB.user.displayName),'Cloudname');
    await p.evaluate(()=>{const s=__FB;for(const[k,v]of [...s.store])if(k.startsWith('users/u1'))s.store.set(k.replace('users/u1','users/u2'),structuredClone(v));s.store.get('users/u2').name='Konto B';s.updateDocHaengt=true;});
    await aktion(p,'konto-name');await p.fill('#dlg-input','Später A');await aktion(p,'dlg-ok');
    const vorher=await p.evaluate(()=>__FB.updateProfileCalls);
    await p.evaluate(()=>{const s=__FB;s.user={uid:'u2',displayName:'Konto B',email:'b@example.com',emailVerified:true,getIdToken:()=>Promise.resolve('tok')};for(const cb of s.authListeners)cb(s.user);});await p.waitForTimeout(550);await p.evaluate(()=>__FB.updateDocFreigeben());await p.waitForTimeout(550);
    assert.equal(await p.evaluate(()=>__FB.updateProfileCalls),vorher,'E15 alte Fortsetzung aktualisiert Profil');assert.equal(await p.evaluate(()=>__FB.store.get('users/u2').name),'Konto B');assert.equal(await p.evaluate(()=>__E.ui.authBusy),false);
    console.log('E15 Fehlergrenzen: Cloudfehler, Teilerfolg ehrlich, Wiederholung, spätes A ohne B-Fortsetzung');
  } finally {await ctx.close();}
}
async function e16(b) {
  const js=quelle('app.js'),css=quelle('styles.css');
  assert.ok(!js.includes('lernkarten-backup'),'E16 alter Sicherungsdateiname');
  assert.ok(!js.includes('id === "daten" || id === "sichern"'),'E16 tote Aliasse');
  assert.ok(!css.includes('.einst-id'),'E16 tote ID-Regeln');
  const {p,ctx}=await seite(b,GERAETE.handy);
  try {
    await aktion(p,'einstellungen');await aktion(p,'wahl-sheet','thema');const n=await p.evaluate(()=>__FB.updateDocCalls||0);
    await aktion(p,'set-thema','dunkel');assert.equal(await p.evaluate(()=>__FB.updateDocCalls||0),n,'E16 gleiche Wahl schreibt erneut');
    console.log('E16 Aufräumen: Dateiname, Aliasse, ID und unveränderte Themenwahl');
  } finally {await ctx.close();}
}
async function e23() {
  const js=quelle('app.js');assert.ok(!js.includes(' Karten geschafft.')&&!js.includes('Eine Karte geschafft.'),'E23 doppeltes geschafft');
  assert.ok(js.includes(' Karten in dieser Runde.'));console.log('E23 Limittext ohne doppeltes geschafft');
}
async function e28() {
  assert.ok(!quelle('app.js').includes('"Gute Nacht"'),'E28 Abschied im Gruß');console.log('E28 Nachtgruß: Hallo');
}
async function e29() {
  const block=quelle('app.js').split('function leechHinweis(card, platz) {')[1].split('function renderSession()')[0];
  assert.ok(!block.includes('ikon("serie"'),'E29 Serienflamme im Rückfallhinweis');assert.ok(block.includes('ikon("warnung"'));console.log('E29 Rückfallhinweis mit Warnsymbol');
}
async function e14(b) {
  for(const vp of [{...GERAETE.handy,width:320,height:568},GERAETE.handy,GERAETE.ipad]) for(const thema of ['hell','dunkel']) for(const ruhig of [false,true]) {
    const {p,ctx}=await seite(b,vp,{thema,ruhig});
    try {
      await aktion(p,'einstellungen');assert.ok((await p.locator('#app').textContent()).includes('Rückmeldung'),'E14 unehrliche Hilfe-Überschrift');
      await aktion(p,'installation-hilfe');const d=p.locator('.dlg');
      assert.match(await d.innerText(),/iPhone.*Safari[\s\S]*Android.*Chrome/);
      assert.equal(await d.evaluate(e=>e.scrollWidth<=e.clientWidth+1),true);
      await aktion(p,'dlg-ok');assert.equal(await d.count(),0);
      console.log(`E14 ${vp.width}/${thema}/${ruhig?'ruhig':'bewegt'}: beide Anleitungen, Rückweg`);
    } finally {await ctx.close();}
  }
}
async function e13(b) {
  for(const vp of [{...GERAETE.handy,width:320,height:568},GERAETE.handy,GERAETE.ipad]) for(const thema of ['hell','dunkel']) {
    const {p,ctx}=await seite(b,vp,{thema});
    let wertPasst, resetHoehe;
    try {
      await aktion(p,'einstellungen');
      const wert=p.locator('[data-id="daten"] .liste-zeile__wert');
      wertPasst=await wert.evaluate(e=>e.scrollWidth<=e.clientWidth+1);
      await aktion(p,'einst-seite','daten');
      resetHoehe=(await p.locator('[data-action="verlauf-reset"]').boundingBox()).height;
    } finally {await ctx.close();}
    const ver=await seite(b,vp,{thema,user:{uid:'neu1',email:'neu@example.com',displayName:'Neu',emailVerified:false}});
    try {
      await aktion(ver.p,'verification-check',null,900);
      const box=await ver.p.locator('.auth-meldung').boundingBox();
      console.log('E13 Messung',vp.width,thema,JSON.stringify({wertPasst,resetHoehe,antwortUnterkante:box.y+box.height,bild:vp.height}));
      assert.deepEqual({wertPasst,resetPasst:resetHoehe>=44,antwortSichtbar:box.y>=0&&box.y+box.height<=vp.height+1},{wertPasst:true,resetPasst:true,antwortSichtbar:true},'E13 drei Befunde');
      assert.deepEqual(ver.p.fehler,[]);console.log(`E13 ${vp.width}/${thema}: voller Wert, 44 px, Antwort sichtbar`);
    } finally {await ver.ctx.close();}
  }
}
async function e1(b) {
  for(const vp of [GERAETE.handy,{...GERAETE.handy,width:320,height:568},GERAETE.ipad])
  for(const thema of ['hell','dunkel']) for(const ruhig of [false,true]) {
    const store=vollerStore({thema});store['users/u1'].verlauf={};
    store['users/u1'].streak={sockel:0,sockelBis:tag(-60),beste:21};
    for(let i=0;i<21;i++)store['users/u1'].verlauf[tag(-i)]={w:1};
    const {p,ctx}=await seite(b,vp,{store,ruhig});
    try {
      await p.evaluate(()=>{__E.ui.einstellungen=true;__E.ui.seite='daten';__E.render();});
      assert.equal(await p.evaluate(()=>__E.serieAktuell()),21);
      assert.ok(!(await p.locator('#app').innerText()).includes('nur die Anzeige'),'E1 Seite verschweigt Serienverlust');
      await aktion(p,'verlauf-reset');
      const text=await p.locator('[aria-labelledby="dlg-title"]').innerText();
      assert.match(text,/Serie von 21 Tagen.*null/s,'E1 Dialog nennt Serie und Zahl');
      await aktion(p,'dlg-cancel');
      assert.equal(await p.evaluate(()=>__E.serieAktuell()),21,'Abbruch erhält Serie');
      assert.deepEqual(p.fehler,[]);
      console.log(`E1 ${vp.width}/${thema}/${ruhig?'ruhig':'bewegt'}: Serie 21 genannt, Abbruch erhält Stand`);
    } finally {await ctx.close();}
  }
}
async function e3(b) {
  for(const vp of [GERAETE.handy,{...GERAETE.handy,width:320,height:568},GERAETE.ipad])
  for(const thema of ['hell','dunkel']) for(const ruhig of [false,true]) {
    const {p,ctx}=await seite(b,vp,{thema,ruhig});
    try {
      await aktion(p,'einstellungen');await aktion(p,'open-error-modal');
      await p.fill('#error-description','E3 Beschreibung bleibt erhalten');
      await p.evaluate(()=>{window.__kopiert=null;Object.defineProperty(navigator,'clipboard',{value:{writeText:async t=>{__kopiert=t;}},configurable:true});});
      const vorher=await p.locator('#errorForm button[type=submit]').boundingBox();
      await p.click('#errorForm button[type=submit]');await p.waitForTimeout(250);
      assert.equal(await p.getAttribute('#errorModal','aria-hidden'),'false','E3 Modal nach mailto offen');
      assert.ok(await p.locator('#error-mail-hinweis').isVisible(),'E3 Ausweg sichtbar');
      const nachher=await p.locator('#errorForm button[type=submit]').boundingBox();
      assert.ok(Math.abs(vorher.x-nachher.x)<=1&&Math.abs(vorher.y-nachher.y)<=1,'E3 Knopf springt');
      await aktion(p,'error-copy');
      assert.match(await p.evaluate(()=>__kopiert),/E3 Beschreibung bleibt erhalten[\s\S]*Adrabic 3\./);
      assert.equal(await p.inputValue('#error-description'),'E3 Beschreibung bleibt erhalten');
      await p.evaluate(()=>Object.defineProperty(navigator,'clipboard',{value:{writeText:async()=>{throw new Error('abgelehnt');}},configurable:true}));
      await aktion(p,'error-copy');
      assert.ok(await p.locator('#error-mail-text').isVisible(),'E3 manueller Kopierweg bei Ablehnung');
      assert.match(await p.inputValue('#error-mail-text'),/E3 Beschreibung bleibt erhalten[\s\S]*Adrabic 3\./);
      assert.deepEqual(p.fehler,[]);
      console.log(`E3 ${vp.width}/${thema}/${ruhig?'ruhig':'bewegt'}: offen, kein Sprung, Zwischenablage und manueller Ausweg`);
    } finally {await ctx.close();}
  }
}
(async()=>{
  const pruefungen={E1:e1,E2:e2,E3:e3,E4:e4,E5:e5,E6:e6,E8:e8,E9:e9,E10:e10,E11:e11,E12:e12,E13:e13,E14:e14,E15:e15,E16:e16,E18:e18,E19:e19,E20:e20,E21:e21,E22:e22,E23:e23,E24:e24,E25:e25,E27:e27,E28:e28,E29:e29,E30:e30,E31:e31,E32:e32};
  if(aufgabe&&!pruefungen[aufgabe])throw new Error('Kein Bauauftrag/keine Probe für '+aufgabe);
  const b=await start();try {
    for(const name of aufgabe?[aufgabe]:Object.keys(pruefungen))await pruefungen[name](b);
    if(!aufgabe)console.log('Paket E: '+Object.keys(pruefungen).length+' lokale Abnahmen; E7 wartet auf Z6b ja, E17 auf G4, E26 später Z7.');
  } finally {await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

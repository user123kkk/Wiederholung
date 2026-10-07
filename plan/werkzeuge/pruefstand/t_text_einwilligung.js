/* Stufe 2 (texte-lernen/KONZEPT.md § 10, § 13): Einwilligung.
   1. Ohne Einwilligung: Dialog erscheint; "Abbrechen" -> keine Anlege-Seite,
      nichts geschrieben.
   2. "Einverstanden" -> texteEinwilligung = heute im Nutzerdokument, dann
      die Anlege-Seite.
   3. Zweiter Text: kein Dialog mehr (genau einmal gefragt), auch nicht nach
      Neuladen (Wert kommt aus dem Nutzerdokument).
   4. Widerruf in den Einstellungen: Sicherung wird heruntergeladen, alle
      Texte (Set + Zeilen) aller Bereiche weg, Einwilligung null, Zeile weg,
      Karten unveraendert.
   5. Kontowechsel: ein offener Anlege-Entwurf erscheint nicht im naechsten
      Konto (LEHREN § 8.3). */
const { start, vollerStore, tag } = require('./lib');
const { seiteMitApp, storeLesen, BETREIBER_UID, textStore } = require('./text_lib');
const U = 'users/' + BETREIBER_UID;

(async () => {
  const fehler = [];
  const pruefe = (ok, text) => { if (!ok) fehler.push(text); };
  const browser = await start();
  try {
    const { ctx, p } = await seiteMitApp(browser, vollerStore(), { uid: BETREIBER_UID });
    const klick = async (sel, w = 600) => { await p.click(sel); await p.waitForTimeout(w); };
    const dialogDa = () => p.$('.dlg [data-action="dlg-ok"]').then(x => !!x);
    const neuerText = async () => {
      await klick('[data-action="tab-verwalten"]');
      await klick('[data-action="neu-wahl"]');
      await klick('[data-action="text-neu"][data-id="selbst"]');
    };

    // 1. Abbrechen
    await neuerText();
    pruefe(await dialogDa(), '1: kein Einwilligungs-Dialog');
    const satz = await p.$eval('.dlg', e => e.innerText).catch(() => '');
    pruefe(/Glauben/.test(satz) && /widerrufen/.test(satz), '1: Einwilligungs-Satz unvollstaendig');
    await klick('[data-action="dlg-cancel"]');
    pruefe(await p.$('#t-roh') === null, '1: Anlege-Seite trotz Abbrechen');
    let s = await storeLesen(p);
    pruefe(!('texteEinwilligung' in s[U]), '1: Einwilligung trotz Abbrechen gespeichert');

    // 2. Einverstanden
    await neuerText();
    await klick('[data-action="dlg-ok"]', 800);
    s = await storeLesen(p);
    pruefe(s[U].texteEinwilligung === tag(0), '2: Einwilligung nicht gespeichert (' + s[U].texteEinwilligung + ')');
    pruefe(await p.$('#t-roh') !== null, '2: keine Anlege-Seite');
    await p.fill('#t-roh', 'Erste Testzeile\nZweite Testzeile');
    await klick('[data-action="text-pruefen"]');
    await klick('[data-action="text-anlegen"]', 900);

    // 3. Zweiter Text ohne Dialog, auch nach Neuladen
    await klick('[data-action="text-schliessen"]');
    await neuerText();
    pruefe(!(await dialogDa()) && await p.$('#t-roh') !== null, '3: erneut gefragt');
    await klick('[data-action="text-anlegen-zu"]');
    s = await storeLesen(p);
    await ctx.close();
    // Neuladen = neue Seite mit dem gespeicherten Stand
    const neu = {};
    for (const [k, v] of Object.entries(s)) neu[k.replace(U, 'users/u1')] = v;
    const { ctx: c2, p: p2 } = await seiteMitApp(browser, neu, { uid: BETREIBER_UID });
    await p2.click('[data-action="tab-verwalten"]'); await p2.waitForTimeout(600);
    await p2.click('[data-action="neu-wahl"]'); await p2.waitForTimeout(500);
    await p2.click('[data-action="text-neu"][data-id="selbst"]'); await p2.waitForTimeout(600);
    pruefe(!(await p2.$('.dlg [data-action="dlg-ok"]')) && await p2.$('#t-roh') !== null, '3: nach Neuladen erneut gefragt');
    await p2.click('[data-action="text-anlegen-zu"]'); await p2.waitForTimeout(400);

    // 4. Widerruf
    await p2.click('[data-action="einstellungen"], [aria-label="Einstellungen"]').catch(() => {});
    await p2.waitForTimeout(700);
    /* Seit 3.18.25 nicht mehr auf der Hauptseite (Fehltipp des Betreibers),
       sondern unter "Sichern & einspielen", mit Erklaerung. */
    pruefe(!(await p2.$('[data-action="texte-widerrufen"]')), '4: Widerruf steht noch auf der Hauptseite der Einstellungen');
    await p2.click('[data-action="einst-seite"][data-id="daten"]'); await p2.waitForTimeout(600);
    let zeile = await p2.$('[data-action="texte-widerrufen"]');
    pruefe(!!zeile, '4: kein Widerruf unter Sichern & einspielen');
    if (zeile) {
      await zeile.click(); await p2.waitForTimeout(500);
      const [download] = await Promise.all([p2.waitForEvent('download', { timeout: 5000 }).catch(() => null),
        p2.click('[data-action="dlg-ok"]')]);
      await p2.waitForTimeout(900);
      pruefe(!!download, '4: keine Sicherung vor dem Loeschen');
      const s4 = await storeLesen(p2);
      const zeilen = Object.entries(s4).filter(([k, v]) => k.startsWith(U + '/karten/') && v.textId);
      const texte = Object.values(s4).filter(v => v && v.sets).flatMap(v => Object.values(v.sets)).filter(x => x.art === 'text');
      const karten = Object.entries(s4).filter(([k, v]) => k.startsWith(U + '/karten/') && !v.textId);
      pruefe(zeilen.length === 0 && texte.length === 0, '4: nach Widerruf ' + zeilen.length + ' Zeilen, ' + texte.length + ' Texte');
      pruefe(s4[U].texteEinwilligung === null, '4: Einwilligung nicht null');
      pruefe(karten.length === 40, '4: Karten ' + karten.length + ' statt 40');
      pruefe(!(await p2.$('[data-action="texte-widerrufen"]')), '4: Widerrufs-Zeile noch da');
    }
    pruefe(p2.fehler.length === 0, 'Seitenfehler: ' + p2.fehler.join(' | '));
    await c2.close();

    // 5. Kontowechsel mit offenem Entwurf
    /* Konto B hat eigene Daten (sonst landet es im Einstieg und der Fall
       beweist nichts). --gegenprobe: ohne die Konto-Bindung des Entwurfs
       muss der Entwurf in B erscheinen. */
    const st = textStore(); st['users/u1'].texteEinwilligung = tag(0);
    for (const [k, v] of Object.entries(textStore())) st[k.replace('users/u1', 'users/fremd2')] = v;
    /* Zustand nach der Freigabe (WIEDERHOLEN.md § 8): Texte fuer alle. Sonst
       verwirft schon der Probelauf-Schalter den Entwurf in B, und die
       Bindung waere nicht geprueft. */
    const fuerAlle = ['function texteFreigeschaltet() {\n  return !!(currentUser && BETREIBER_UIDS.indexOf(currentUser.uid) !== -1);',
      'function texteFreigeschaltet() {\n  return !!currentUser;'];
    const ersetze = [fuerAlle];
    if (process.argv.includes('--gegenprobe'))
      ersetze.push(['if (ui.textAnlegen && (ui.textAnlegen.uid !== uidJetzt || ', 'if (ui.textAnlegen && (false || ']);
    const { ctx: c3, p: p3 } = await seiteMitApp(browser, st, { uid: BETREIBER_UID, ersetze });
    await p3.click('[data-action="tab-verwalten"]'); await p3.waitForTimeout(500);
    await p3.click('[data-action="neu-wahl"]'); await p3.waitForTimeout(400);
    await p3.click('[data-action="text-neu"][data-id="selbst"]'); await p3.waitForTimeout(500);
    await p3.fill('#t-roh', 'Privater Entwurf von Konto A');
    await p3.evaluate(() => { const s = window.__FB; s.user = { uid: 'fremd2', email: 'b@example.com', emailVerified: true, getIdToken: () => Promise.resolve('t') }; for (const cb of s.authListeners) cb(s.user); });
    await p3.waitForTimeout(1500);
    const sichtbar = await p3.evaluate(() => document.body.innerText.includes('Privater Entwurf') || !!document.getElementById('t-roh'));
    const bGeladen = await p3.evaluate(() => window.__PRUEF.bereiche().length > 0 && !document.querySelector('.einstieg'));
    pruefe(bGeladen, '5: Messfehler - Konto B nicht geladen');
    if (process.argv.includes('--gegenprobe')) {
      console.log('B zeigt: ' + (await p3.evaluate(() => document.getElementById('app').innerText.replace(/\s+/g, ' ').slice(0, 120))));
      console.log(sichtbar ? 'Gegenprobe wie erwartet rot: Entwurf in B sichtbar' : 'FEHLER Gegenprobe: Entwurf auch ohne Bindung unsichtbar');
      process.exitCode = sichtbar ? 0 : 1;
      await c3.close(); return;
    }
    pruefe(!sichtbar, '5: Entwurf von Konto A im Konto B sichtbar');
    await c3.close();
  } finally { await browser.close(); }
  if (fehler.length) { console.log('ROT:\n  ' + fehler.join('\n  ')); process.exitCode = 1; }
  else console.log('OK: Einwilligung einmal, Abbrechen, Neuladen, Widerruf, Kontowechsel');
})().catch(e => { console.error(e); process.exitCode = 1; });

// Laedt Seiten mit der echten CSP aus firebase.json (per route injiziert) und prueft,
// ob das Kopfskript laeuft und ob CSP-Verstoesse gemeldet werden.
const { chromium } = require('playwright');
const fs = require('fs');
const fj = JSON.parse(fs.readFileSync(require('path').join(__dirname, '../../../firebase.json'), 'utf8'));
const csp = fj.hosting[1].headers.find(h => h.source === '**').headers.find(h => h.key === 'Content-Security-Policy').value;
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM });
  for (const seite of ['impressum.html', 'datenschutzerklaerung.html', 'index.html']) {
    const ctx = await b.newContext({ colorScheme: 'light' });
    const p = await ctx.newPage();
    const meld = [];
    p.on('console', m => { if (/Content Security Policy|Refused/.test(m.text())) meld.push(m.text().slice(0, 160)); });
    await p.route('**/127.0.0.1:8099/**', async r => {
      const resp = await r.fetch();
      const h = { ...resp.headers(), 'content-security-policy': csp };
      r.fulfill({ response: resp, headers: h });
    });
    await p.route('**/www.gstatic.com/**', r => r.abort());
    await p.addInitScript(() => { try { localStorage.setItem('adrabic-thema', 'hell'); } catch (e) {} });
    await p.goto('http://127.0.0.1:8099/' + seite, { waitUntil: 'load' });
    await p.waitForTimeout(600);
    const r = await p.evaluate(() => ({ thema: document.documentElement.getAttribute('data-thema'), bg: getComputedStyle(document.body).backgroundColor, meta: document.querySelector('meta[name=theme-color]').content }));
    console.log(seite, JSON.stringify(r), meld.length ? '\n   CSP: ' + meld.join('\n   CSP: ') : 'keine CSP-Meldung');
    await ctx.close();
  }
  await b.close();
})();

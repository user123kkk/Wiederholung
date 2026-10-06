// F8: sichtbarer Wortlaut; Speicher-/SDK-Namen und Datenformat bleiben erhalten.
import fs from 'node:fs';
let app=fs.readFileSync('app.js','utf8');
if(!app.includes('"adrabic-backup"'))throw new Error('Dateinamenanker fehlt');
app=app.replace('"adrabic-backup"','"adrabic-sicherung"')
 .replaceAll('Lernkarten-Backup-Datei','Sicherungsdatei')
 .replaceAll('Lernkarten-Bestand','Adrabic-Bestand')
 .replaceAll('Voll-Backups','Vollsicherung').replaceAll('Voll-Backup','Vollsicherung')
 .replaceAll('Backup-Datei','Sicherungsdatei').replaceAll('Backups','Sicherungen')
 .replace(/\bBackup\b/g,'Sicherung');
fs.writeFileSync('app.js',app);
let privacy=fs.readFileSync('datenschutzerklaerung.html','utf8');
privacy=privacy.replaceAll('das Datum deines letzten Backups','das Datum deiner letzten Sicherung');
fs.writeFileSync('datenschutzerklaerung.html',privacy);

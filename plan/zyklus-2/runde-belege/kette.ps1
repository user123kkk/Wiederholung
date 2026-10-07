$env:CHROMIUM='C:\Program Files\Google\Chrome\Application\chrome.exe'; $env:AFFE_TEXTE='1'; Wait-Process -Id 7684 -ErrorAction SilentlyContinue; Set-Location 'C:\Users\USER\Desktop\Wiederholung\plan\werkzeuge\pruefstand'; if (Select-String -Path 'C:\Users\USER\Desktop\Wiederholung\plan\zyklus-2\runde-belege\gesamtlauf-4-fortsetzen.log' -Pattern '152/152 Exit 0; 0 rot' -Quiet) { cmd /c "node abnahme_runde.js --fortsetzen > ""C:\Users\USER\Desktop\Wiederholung\plan\zyklus-2\runde-belege\abschluss-runde.log"" 2>&1"; Add-Content 'C:\Users\USER\Desktop\Wiederholung\plan\zyklus-2\runde-belege\abschluss-runde.log' "RUNDE Exit $LASTEXITCODE"; cmd /c "node affe.js handy 200 7 > ""C:\Users\USER\Desktop\Wiederholung\plan\zyklus-2\runde-belege\abschluss-affe-handy.log"" 2>&1"; Add-Content 'C:\Users\USER\Desktop\Wiederholung\plan\zyklus-2\runde-belege\abschluss-affe-handy.log' "AFFE Exit $LASTEXITCODE"; cmd /c "node affe.js ipad 150 7 > ""C:\Users\USER\Desktop\Wiederholung\plan\zyklus-2\runde-belege\abschluss-affe-ipad.log"" 2>&1"; Add-Content 'C:\Users\USER\Desktop\Wiederholung\plan\zyklus-2\runde-belege\abschluss-affe-ipad.log' "AFFE Exit $LASTEXITCODE" }; Set-Content 'C:\Users\USER\Desktop\Wiederholung\plan\zyklus-2\runde-belege\kette-fertig.txt' (Get-Date -Format o)







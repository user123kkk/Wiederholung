$env:CHROMIUM='C:\Program Files\Google\Chrome\Application\chrome.exe'; $env:AFFE_TEXTE='1'
$b='C:\Users\USER\Desktop\Wiederholung\plan\zyklus-2\runde-belege'
Set-Location 'C:\Users\USER\Desktop\Wiederholung\plan\werkzeuge\pruefstand'
cmd /c "node alle_pruefen.js --fortsetzen > ""$b\gesamtlauf-5-fortsetzen.log"" 2>&1"; Add-Content "$b\gesamtlauf-5-fortsetzen.log" "GESAMT Exit $LASTEXITCODE"
cmd /c "node abnahme_runde.js --fortsetzen > ""$b\abschluss-runde.log"" 2>&1"; Add-Content "$b\abschluss-runde.log" "RUNDE Exit $LASTEXITCODE"
cmd /c "node affe.js handy 200 7 > ""$b\abschluss-affe-handy.log"" 2>&1"; Add-Content "$b\abschluss-affe-handy.log" "AFFE Exit $LASTEXITCODE"
cmd /c "node affe.js ipad 150 7 > ""$b\abschluss-affe-ipad.log"" 2>&1"; Add-Content "$b\abschluss-affe-ipad.log" "AFFE Exit $LASTEXITCODE"
Set-Content "$b\kette2-fertig.txt" (Get-Date -Format o)

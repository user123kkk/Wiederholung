$env:CHROMIUM='C:\Program Files\Google\Chrome\Application\chrome.exe'
$b='C:\Users\USER\Desktop\Wiederholung\plan\zyklus-2\runde-belege'
Set-Location 'C:\Users\USER\Desktop\Wiederholung\plan\werkzeuge\pruefstand'
cmd /c "node alle_pruefen.js --fortsetzen > ""$b\gesamtlauf-9-ohne-sicherung.log"" 2>&1"
Add-Content "$b\gesamtlauf-9-ohne-sicherung.log" "GESAMT Exit $LASTEXITCODE Roblox $([bool](Get-Process RobloxPlayerBeta -ErrorAction SilentlyContinue))"
Set-Location 'C:\Users\USER\Desktop\Wiederholung'
Start-Process node -ArgumentList 'plan/zyklus-2/d12-sicherung.mjs' -WindowStyle Hidden
Set-Content "$b\kette4-fertig.txt" (Get-Date -Format o)

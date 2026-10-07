$env:CHROMIUM='C:\Program Files\Google\Chrome\Application\chrome.exe'
$b='C:\Users\USER\Desktop\Wiederholung\plan\texte-lernen\anfang-belege'
Set-Location 'C:\Users\USER\Desktop\Wiederholung\plan\werkzeuge\pruefstand'
cmd /c "node alle_pruefen.js --fortsetzen > ""$b\gesamtlauf-2-fortsetzen.log"" 2>&1"; Add-Content "$b\gesamtlauf-2-fortsetzen.log" "GESAMT Exit $LASTEXITCODE"
Set-Content "$b\kette2-fertig.txt" (Get-Date -Format o)

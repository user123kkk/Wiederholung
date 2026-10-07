$env:CHROMIUM='C:\Program Files\Google\Chrome\Application\chrome.exe'
$b='C:\Users\USER\Desktop\Wiederholung\plan\zyklus-2\runde-belege'
Set-Location 'C:\Users\USER\Desktop\Wiederholung\plan\werkzeuge\pruefstand'
foreach ($n in 6,7,8) {
  cmd /c "node alle_pruefen.js --fortsetzen > ""$b\gesamtlauf-$n-fortsetzen.log"" 2>&1"
  $x=$LASTEXITCODE; Add-Content "$b\gesamtlauf-$n-fortsetzen.log" "GESAMT Exit $x Roblox $([bool](Get-Process RobloxPlayerBeta -ErrorAction SilentlyContinue))"
  if ($x -eq 0) { break }
}
Set-Content "$b\kette3-fertig.txt" (Get-Date -Format o)

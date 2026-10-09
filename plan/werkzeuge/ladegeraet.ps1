param(
    [string]$RepoPath = (Join-Path $PSScriptRoot '..\..'),
    [switch]$NurPruefen,
    [switch]$Fortsetzen
)

# Stichwort "ladegeraet" (CLAUDE.md): am Laptop, am Strom, alles in fester
# Reihenfolge. Veroeffentlicht wird NUR, wenn jede Pruefung gruen ist:
#   1. Stand: lokaler main = origin/main, keine lokalen Aenderungen an App-Dateien
#   2. Strom: Laptop haengt am Ladegeraet (sonst misst t_bestand_tempo falsch, LEHREN 5.3)
#   3. Pruefstand: alle t_*.js (inkl. 13 Rundentests, t_bestand_tempo)
#   4. Zufallstest mit Texten: Affe Handy 200 / iPad 150, keine Befunde
#   5. firestore.rules einspielen (vor dem Hosting: neue Felder seit 3.18.0)
#   6. Hosting ueber veroeffentlichen.ps1 (prueft den Stand selbst noch einmal)
# -NurPruefen: 1-4, nichts veroeffentlichen.
# -Fortsetzen: Schritt 3 uebernimmt bestandene Tests desselben Quellstands
#   (alle_pruefen.js --fortsetzen) und faehrt nur rote und fehlende neu. Fuer
#   den Fall, dass ein einzelner Test am Pruefaufbau scheiterte und nur die
#   Testdatei berichtigt wurde. Aendert sich App, Regeln, lib.js oder
#   stubs.js, gilt ein neuer Quellstand und es laeuft ohnehin alles neu.
$ErrorActionPreference = 'Stop'
$server = $null
$emu = $null
$ergebnis = 1
$bericht = New-Object System.Collections.Generic.List[string]
function Schritt([string]$t) { Write-Host ''; Write-Host ('=== ' + $t + ' ==='); $bericht.Add($t) }
function Werkzeug([string]$Name, [string]$Fehler) {
    $c = Get-Command $Name -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $c) { throw $Fehler }
    return $c.Source
}

try {
    $repo = (Resolve-Path -LiteralPath $RepoPath).ProviderPath
    $git = Werkzeug 'git.exe' 'Git fehlt.'
    $node = Werkzeug 'node.exe' 'Node.js fehlt.'
    $py = Werkzeug 'py.exe' 'Python (py) fehlt.'
    $chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
    if (-not (Test-Path -LiteralPath $chrome)) { throw ('Chrome nicht gefunden: ' + $chrome) }

    Schritt '1/6 Stand'
    & $git -C $repo fetch origin main
    if ($LASTEXITCODE -ne 0) { throw 'git fetch fehlgeschlagen (Internet?).' }
    $lokal = (& $git -C $repo status --porcelain --untracked-files=no -- app.js styles.css index.html sw.js firestore.rules firebase.json fonts quran plan/werkzeuge/pruefstand) -join "`n"
    if ($lokal) { throw ("Lokale Aenderungen an App- oder Testdateien - erst sichern oder verwerfen:`n" + $lokal) }
    $branch = & $git -C $repo rev-parse --abbrev-ref HEAD
    if ($branch -ne 'main') { throw ('Nicht auf main, sondern auf ' + $branch + '.') }
    & $git -C $repo merge --ff-only origin/main
    if ($LASTEXITCODE -ne 0) { throw 'main laesst sich nicht vorspulen (lokale Commits?).' }
    $commit = (& $git -C $repo rev-parse HEAD).Substring(0, 8)
    $version = [regex]::Match((Get-Content -LiteralPath (Join-Path $repo 'app.js') -Raw -Encoding UTF8), 'const APP_VERSION = "([^"]+)";').Groups[1].Value
    Write-Host ('Stand: ' + $version + ' / ' + $commit)

    Schritt '2/6 Strom'
    $akku = Get-CimInstance Win32_Battery -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($akku -and $akku.BatteryStatus -ne 2 -and $akku.BatteryStatus -ne 6) {
        throw ('Der Laptop laeuft auf Akku (' + $akku.EstimatedChargeRemaining + ' %). Bitte Ladegeraet anstecken und neu starten - sonst misst der Tempotest falsch.')
    }
    Write-Host 'Am Ladegeraet.'

    $pruef = Join-Path $repo 'plan\werkzeuge\pruefstand'
    if (-not (Test-Path -LiteralPath (Join-Path $pruef 'node_modules\playwright'))) {
        Write-Host 'Playwright einmalig installieren...'
        Push-Location -LiteralPath $pruef
        try {
            $env:PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = '1'
            if (-not (Test-Path 'package.json')) { & npm.cmd init -y | Out-Null }
            & npm.cmd i playwright
            if ($LASTEXITCODE -ne 0) { throw 'npm i playwright fehlgeschlagen.' }
        } finally { Pop-Location }
    }
    $env:PRUEF_PORT = '8199'
    $env:CHROMIUM = $chrome
    $server = Start-Process -FilePath $py -ArgumentList '-3', '-m', 'http.server', '8199', '--bind', '127.0.0.1' -WorkingDirectory $repo -WindowStyle Hidden -PassThru
    Start-Sleep -Seconds 2

    # t_verlauf_mehrgeraete.js braucht den Firestore-Emulator auf 127.0.0.1:8081
    # (nur Demo-Projekt, keine Produktivdaten). Eigener Ordner mit eigener
    # firebase.json, damit die Hosting-Einstellungen des Repos unberuehrt bleiben.
    $null = Werkzeug 'java.exe' 'Java fehlt (Firestore-Emulator fuer t_verlauf_mehrgeraete).'
    $fb = Werkzeug 'firebase.cmd' 'Firebase-Werkzeuge fehlen. Einmalig: npm install -g firebase-tools'
    $emuOrdner = Join-Path $env:TEMP 'adrabic-ladegeraet-emu'
    New-Item -ItemType Directory -Force -Path $emuOrdner | Out-Null
    $regeln = (Join-Path $repo 'firestore.rules') -replace '\\', '/'
    $emuJson = '{ "firestore": { "rules": "' + $regeln + '" }, "emulators": { "firestore": { "host": "127.0.0.1", "port": 8081 }, "ui": { "enabled": false }, "hub": { "port": 4410 }, "logging": { "port": 4510 } } }'
    [System.IO.File]::WriteAllText((Join-Path $emuOrdner 'firebase.json'), $emuJson)
    $emu = Start-Process -FilePath $fb -ArgumentList 'emulators:start', '--only', 'firestore', '--project', 'demo-adrabic-pruefung' -WorkingDirectory $emuOrdner -WindowStyle Hidden -PassThru
    $bereit = $false
    for ($i = 0; $i -lt 60 -and -not $bereit; $i++) {
        Start-Sleep -Seconds 1
        try { Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:8081/' -TimeoutSec 2 | Out-Null; $bereit = $true } catch { }
    }
    if (-not $bereit) { throw 'Firestore-Emulator startet nicht (Port 8081).' }
    Write-Host 'Firestore-Emulator laeuft (8081).'

    Schritt '3/6 Pruefstand (alle Tests, dauert)'
    Push-Location -LiteralPath $pruef
    try {
        if ($Fortsetzen) { & $node 'alle_pruefen.js' '--fortsetzen' } else { & $node 'alle_pruefen.js' }
        $gesamt = $LASTEXITCODE
    } finally { Pop-Location }
    if ($gesamt -ne 0) { throw 'Pruefstand nicht komplett gruen (Liste oben). Nichts veroeffentlicht.' }

    Schritt '4/6 Zufallstest mit Texten'
    $env:AFFE_TEXTE = '1'
    Push-Location -LiteralPath $pruef
    try {
        foreach ($lauf in @(@('handy', '200', '7'), @('ipad', '150', '11'))) {
            # PowerShell 5.1: 2>&1 macht jede stderr-Zeile zum Fehlerobjekt, unter
            # 'Stop' braeche das hier ab. Nur fuer diesen Aufruf lockern.
            $ErrorActionPreference = 'Continue'
            $aus = (& $node 'affe.js' $lauf[0] $lauf[1] $lauf[2] 2>&1 | ForEach-Object { "$_" }) -join "`n"
            $ErrorActionPreference = 'Stop'
            $zeile = ($aus -split "`n" | Where-Object { $_ -match 'Befunde:' } | Select-Object -Last 1)
            Write-Host $zeile
            if ($zeile -notmatch 'Befunde: 0$') { Write-Host $aus; throw ('Affe ' + $lauf[0] + ' hat Befunde. Nichts veroeffentlicht.') }
        }
    } finally { Pop-Location; Remove-Item Env:AFFE_TEXTE -ErrorAction SilentlyContinue }

    if ($NurPruefen) {
        Write-Host ''
        Write-Host ('Alles gruen: ' + $version + ' / ' + $commit + '. Es wurde nichts veroeffentlicht (-NurPruefen).')
        $ergebnis = 0
    } else {
    $firebase = Werkzeug 'firebase.cmd' 'Firebase-Werkzeuge fehlen. Einmalig: npm install -g firebase-tools'
    $projekt = (Get-Content -LiteralPath (Join-Path $repo '.firebaserc') -Raw -Encoding UTF8 | ConvertFrom-Json).projects.default
    Schritt '5/6 Firestore-Regeln'
    Push-Location -LiteralPath $repo
    try {
        & $firebase deploy --only firestore:rules --project $projekt
        if ($LASTEXITCODE -ne 0) { throw 'Regeln nicht eingespielt (Ausgabe oben). Hosting NICHT gestartet.' }
    } finally { Pop-Location }

    Schritt '6/6 Hosting'
    & powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File (Join-Path $repo 'plan\werkzeuge\veroeffentlichen.ps1') -RepoPath $repo
    if ($LASTEXITCODE -ne 0) { throw 'Hosting fehlgeschlagen (Ausgabe oben). Die Regeln sind schon eingespielt - das ist unschaedlich, alte App-Versionen kommen damit zurecht.' }
    Write-Host ''
    Write-Host ('FERTIG: ' + $version + ' ist online. In der App unter Einstellungen pruefen.')
    $ergebnis = 0
    }
} catch {
    Write-Host ''
    Write-Host ('ABGEBROCHEN: ' + $_.Exception.Message)
} finally {
    if ($server -and -not $server.HasExited) { Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue }
    # firebase.cmd startet node und java als Kindprozesse: ganzen Baum beenden.
    if ($emu -and -not $emu.HasExited) { & taskkill.exe /PID $emu.Id /T /F 2>$null | Out-Null }
    Write-Host ''
    Write-Host ('Schritte: ' + ($bericht -join ' | '))
}
exit $ergebnis

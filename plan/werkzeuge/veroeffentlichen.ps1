param(
    [string]$RepoPath = (Join-Path $PSScriptRoot '..\..'),
    [switch]$NurPruefen
)

# Hosting aus dem frisch geholten, committeten main. Kein checkout, pull,
# stash oder Reset im Arbeitsordner; lokale Entwuerfe werden nie exportiert.
$ErrorActionPreference = 'Stop'
$stageRoot = $null
$deployStarted = $false
$ergebnis = 1
$tempBase = [IO.Path]::GetFullPath([IO.Path]::GetTempPath()).TrimEnd('\', '/')

function Werkzeug([string]$Name, [string]$Fehler) {
    $command = Get-Command $Name -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $command) { throw $Fehler }
    return $command.Source
}

try {
    Write-Host '============================================'
    Write-Host '  Wiederholung - Update veroeffentlichen'
    Write-Host '============================================'
    $git = Werkzeug 'git.exe' 'Git fehlt auf diesem PC oder ist nicht im Pfad.'
    $node = Werkzeug 'node.exe' 'Node.js fehlt. Die notwendige Standpruefung kann nicht laufen.'
    if (-not $NurPruefen) {
        $firebase = Werkzeug 'firebase.cmd' 'Firebase-Werkzeuge fehlen. Einmalig: npm install -g firebase-tools'
    }
    $repo = (Resolve-Path -LiteralPath $RepoPath).ProviderPath
    $gitRoot = & $git -C $repo rev-parse --show-toplevel
    if ($LASTEXITCODE -ne 0) { throw 'Der Ordner ist kein Git-Repository.' }
    if ([IO.Path]::GetFullPath($gitRoot).TrimEnd('\', '/') -ne $repo.TrimEnd('\', '/')) {
        throw 'Bitte veroeffentlichen.bat direkt aus dem Repo-Ordner starten.'
    }

    Write-Host ''
    Write-Host '[1/3] Hole den aktuellen Stand von main...'
    & $git -C $repo fetch --no-tags origin '+refs/heads/main:refs/remotes/origin/main'
    if ($LASTEXITCODE -ne 0) { throw 'main konnte nicht geholt werden. Es wird kein alter Ersatzstand veroeffentlicht.' }
    $commit = & $git -C $repo rev-parse --verify 'refs/remotes/origin/main^{commit}'
    if ($LASTEXITCODE -ne 0 -or $commit -notmatch '^[0-9a-f]{40,64}$') { throw 'main ist kein gueltiger Commit.' }
    # Das Archiv hat keinen Git-Arbeitsbaum. Die csp-build-Aenderung deshalb
    # am gewaehlten Commit pruefen, niemals am lokalen offenen Entwurf.
    $changed = @(& $git -C $repo diff-tree --root --no-commit-id --name-only -r -m $commit)
    if ($LASTEXITCODE -ne 0) { throw 'Die Header-Aenderungen von main konnten nicht geprueft werden.' }
    if ($changed -contains 'firebase.json' -and $changed -notcontains 'index.html') {
        throw 'main aendert firebase.json ohne index.html/csp-build. Kein Upload.'
    }

    $stageRoot = Join-Path $tempBase ('adrabic-release-' + [guid]::NewGuid().ToString('N'))
    New-Item -ItemType Directory -Path $stageRoot | Out-Null
    $archive = Join-Path $stageRoot 'main.zip'
    $release = Join-Path $stageRoot 'site'
    & $git -C $repo archive --format=zip "--output=$archive" $commit
    if ($LASTEXITCODE -ne 0) { throw 'Die Veroeffentlichungs-Kopie konnte nicht erstellt werden.' }
    Expand-Archive -LiteralPath $archive -DestinationPath $release

    Write-Host ''
    Write-Host '[2/3] Pruefe die Kopie: Version, CSP und Startdateien...'
    Push-Location -LiteralPath $release
    try {
        $config = Get-Content -LiteralPath 'firebase.json' -Raw -Encoding UTF8 | ConvertFrom-Json
        if (-not $config.hosting) { throw 'Die Kopie hat keine Hosting-Konfiguration.' }
        # Auch ein versehentliches public:".." darf nichts ausserhalb der
        # sauberen Kopie in den Upload nehmen.
        $releaseFull = [IO.Path]::GetFullPath($release).TrimEnd('\', '/')
        foreach ($hosting in @($config.hosting)) {
            if (-not $hosting.public) { throw 'Das Hosting-Verzeichnis fehlt.' }
            $publicFull = [IO.Path]::GetFullPath((Join-Path $release $hosting.public)).TrimEnd('\', '/')
            if ($publicFull -ne $releaseFull -and -not $publicFull.StartsWith($releaseFull + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
                throw 'Das Hosting-Verzeichnis liegt ausserhalb der geprueften Kopie.'
            }
        }
        $project = (Get-Content -LiteralPath '.firebaserc' -Raw -Encoding UTF8 | ConvertFrom-Json).projects.default
        if (-not $project -or $project -notmatch '^[a-z0-9][a-z0-9-]+$') { throw 'Das Firebase-Projekt der Kopie fehlt oder ist ungueltig.' }
        & $node 'plan/werkzeuge/pruefe_stand.mjs'
        if ($LASTEXITCODE -ne 0) { throw 'Die Standpruefung ist fehlgeschlagen. Kein Upload.' }
        Write-Host 'csp-build: Aenderungen des gewaehlten main-Commits geprueft.'
        $match = [regex]::Match((Get-Content -LiteralPath 'app.js' -Raw -Encoding UTF8), 'const APP_VERSION = "([^"]+)";')
        if (-not $match.Success) { throw 'Die App-Version konnte nicht gelesen werden.' }
        $version = $match.Groups[1].Value
        Write-Host ''
        Write-Host ('Geprueft: Adrabic ' + $version + ' / main ' + $commit.Substring(0, 8))
        Write-Host 'Lokale Entwuerfe bleiben erhalten und werden nicht hochgeladen.'
        if ($NurPruefen) {
            Write-Host 'Pruefung bestanden. Es wurde nichts veroeffentlicht.'
        } else {
            Write-Host ''
            Write-Host '[3/3] Veroeffentliche auf Firebase Hosting...'
            $deployStarted = $true
            & $firebase deploy --only hosting --project $project
            if ($LASTEXITCODE -ne 0) { throw 'Firebase meldet einen Fehler. Details stehen oben.' }
            Write-Host ''
            Write-Host ('Fertig! In der App unter Einstellungen steht jetzt Adrabic ' + $version + '.')
        }
        $ergebnis = 0
    } finally {
        Pop-Location
    }
} catch {
    Write-Host ''
    Write-Host ('FEHLER: ' + $_.Exception.Message)
    if ($deployStarted) {
        Write-Host 'Der Upload wurde gestartet. Ob etwas veroeffentlicht wurde, zeigt die Firebase-Ausgabe oben.'
    } else {
        Write-Host 'Es wurde nichts veroeffentlicht.'
    }
} finally {
    # Nur unser eindeutiges, aufgeloestes Kind des TEMP-Ordners entfernen.
    # Nie den Arbeitsordner oder einen aus der Konfiguration gelesenen Pfad.
    if ($stageRoot) {
        $cleanupPath = [IO.Path]::GetFullPath($stageRoot).TrimEnd('\', '/')
        if ([IO.Path]::GetDirectoryName($cleanupPath) -eq $tempBase -and
            [IO.Path]::GetFileName($cleanupPath) -match '^adrabic-release-[0-9a-f]{32}$') {
            try { Remove-Item -LiteralPath $cleanupPath -Recurse -Force }
            catch { Write-Warning ('Temporaere Kopie konnte nicht entfernt werden: ' + $cleanupPath) }
        } else {
            Write-Warning 'Unerwarteter temporaerer Pfad; nichts entfernt.'
        }
    }
}
exit $ergebnis

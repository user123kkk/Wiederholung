@echo off
rem 3.17.34: Die Batch-Datei laeuft aus einer Kopie im TEMP-Ordner. Windows
rem liest eine .bat Zeile fuer Zeile waehrend sie laeuft - tauscht "git pull"
rem sie unterwegs aus, liefe der Rest aus der neuen Datei an der falschen
rem Stelle weiter (so geschehen am 26.09.: alte Meldung, falscher Abbruch).
if not "%~1"=="--aus-temp" (
  copy /y "%~f0" "%TEMP%\adrabic-veroeffentlichen.bat" >nul
  call "%TEMP%\adrabic-veroeffentlichen.bat" --aus-temp "%~dp0"
  exit /b
)
setlocal
cd /d "%~2"

echo ============================================
echo   Wiederholung - Update veroeffentlichen
echo ============================================
echo.
echo Aktueller Ordner: %cd%
echo.

rem 3.17.34: Werkzeuge vorher pruefen, damit eine fehlende Installation
rem als klarer Satz erscheint und nicht als unverstaendlicher Abbruch.
where git >nul 2>nul
if errorlevel 1 (
  echo Git ist auf diesem PC nicht installiert oder nicht im Pfad.
  goto fehler
)
where firebase >nul 2>nul
if errorlevel 1 (
  echo Die Firebase-Werkzeuge fehlen. Einmalig: npm install -g firebase-tools
  goto fehler
)

echo [1/3] Hole neueste Aenderungen von main...
rem 3.17.34: .firebase/hosting..cache schreibt die Firebase-CLI bei jedem
rem Deploy neu. Die Datei steht (versehentlich) im Repo - ohne diese Zeile
rem galt der Ordner danach immer als "geaendert". Es ist nur ein Zwischenspeicher.
git checkout -- .firebase >nul 2>nul
git checkout main
if errorlevel 1 goto fehler
git pull origin main
if errorlevel 1 goto fehler
echo.

echo [2/3] Pruefe auf lokale Aenderungen, die nicht auf main sind...
set "LOKAL="
for /f "delims=" %%i in ('git status --porcelain') do set "LOKAL=1"
if defined LOKAL (
  echo Im Ordner liegen Dateien, die nicht auf main sind - sie wuerden mit
  echo hochgeladen. Hier sind sie:
  git status --short
  echo Loeschen oder verschieben, dann noch einmal starten.
  goto fehler
)

where node >nul 2>nul
if errorlevel 1 (
  echo Hinweis: node fehlt, die Pruefung von Version und CSP wird uebersprungen.
  echo Der Stand auf main ist vor jedem Push schon so geprueft worden.
) else (
  echo Pruefe den Stand: Version, CSP, Dateien...
  node plan\werkzeuge\pruefe_stand.mjs
  if errorlevel 1 goto fehler
)
echo.

echo [3/3] Deploye auf Firebase Hosting...
rem "call" ist Pflicht: firebase ist eine .cmd-Datei. Ohne call kehrt die
rem Batch-Datei danach nie zurueck - kein "Fertig", kein Fehler, das Fenster
rem schliesst sich einfach.
call firebase deploy --only hosting
if errorlevel 1 goto fehler

echo.
echo ============================================
echo   Fertig! Die Seite ist aktualisiert.
echo   In der App unter Einstellungen steht jetzt die neue Version.
echo ============================================
goto ende

:fehler
echo.
echo ============================================
echo   FEHLER - siehe Meldung oben. Es wurde nichts veroeffentlicht,
echo   ausser die Meldung kam erst nach "[3/3]".
echo ============================================

:ende
echo.
pause

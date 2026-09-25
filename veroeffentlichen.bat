@echo off
setlocal
cd /d "%~dp0"

echo ============================================
echo   Wiederholung - Update veroeffentlichen
echo ============================================
echo.
echo Aktueller Ordner: %cd%
echo.

echo [1/2] Hole neueste Aenderungen von main...
git checkout main
if errorlevel 1 goto fehler
git pull origin main
if errorlevel 1 goto fehler
echo.

echo Pruefe auf lokale Aenderungen, die nicht auf main sind...
for /f %%i in ('git status --porcelain') do (
  echo Es gibt lokale Aenderungen im Ordner. Erst committen oder verwerfen.
  goto fehler
)
echo Pruefe den Stand (Version, CSP, Dateien)...
node plan\werkzeuge\pruefe_stand.mjs
if errorlevel 1 goto fehler
echo.

echo [2/2] Deploye auf Firebase Hosting...
firebase deploy --only hosting
if errorlevel 1 goto fehler

echo.
echo ============================================
echo   Fertig! Die Seite ist aktualisiert.
echo ============================================
goto ende

:fehler
echo.
echo ============================================
echo   FEHLER - siehe Meldung oben.
echo   Nichts wurde uebersprungen, bitte pruefen.
echo ============================================

:ende
echo.
pause

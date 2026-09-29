@echo off
setlocal
rem Nur fetch, kein pull/checkout: lokale Entwuerfe bleiben erhalten.
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0plan\werkzeuge\veroeffentlichen.ps1" -RepoPath "%~dp0." %*
set "ERGEBNIS=%ERRORLEVEL%"
echo.
pause
exit /b %ERGEBNIS%

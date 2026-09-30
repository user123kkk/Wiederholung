@echo off
setlocal
rem Stichwort "ladegeraet" (CLAUDE.md): am Ladegeraet alle Pruefungen, dann Regeln + Hosting.
rem Nur pruefen, nichts veroeffentlichen: ladegeraet.bat -NurPruefen
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0plan\werkzeuge\ladegeraet.ps1" -RepoPath "%~dp0." %*
set "ERGEBNIS=%ERRORLEVEL%"
echo.
pause
exit /b %ERGEBNIS%

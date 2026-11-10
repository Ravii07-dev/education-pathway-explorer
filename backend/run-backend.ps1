# Education Pathway Explorer - Java Backend Runner (JDK 21 LTS)
$ErrorActionPreference = "Stop"

$JavaHome = "C:\Program Files\Java\jdk-21.0.12.1"
$Javac = "$JavaHome\bin\javac.exe"
$Java = "$JavaHome\bin\java.exe"

$BackendDir = $PSScriptRoot
Set-Location $BackendDir

$OutDir = "$BackendDir\bin"
if (!(Test-Path $OutDir)) {
    New-Item -ItemType Directory -Path $OutDir -Force | Out-Null
}

Write-Host "Compiling Java Backend using JDK 21..." -ForegroundColor Cyan
$Sources = Get-ChildItem -Path "$BackendDir\src\main\java" -Filter "*.java" -Recurse | Select-Object -ExpandProperty FullName

& $Javac -d $OutDir -encoding UTF-8 $Sources

if ($LASTEXITCODE -ne 0) {
    Write-Host "Java Compilation Failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Compilation successful! Starting Java REST Server on http://localhost:8080..." -ForegroundColor Green
& $Java -cp $OutDir com.pathway.explorer.PathwayBackendApplication

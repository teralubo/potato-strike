Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$ufbt = (Get-Command ufbt -ErrorAction SilentlyContinue).Source
if (-not $ufbt) { $ufbt = Join-Path $env:APPDATA "Python\Python39\Scripts\ufbt.exe" }
if (-not (Test-Path $ufbt)) {
  Write-Host "ufbt is required to build Potato Strike Mini .fap"
  Write-Host "Install: python -m pip install ufbt"
  exit 1
}

Push-Location $PSScriptRoot
try {
  & $ufbt
} finally {
  Pop-Location
}

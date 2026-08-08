Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if (-not (Get-Command ufbt -ErrorAction SilentlyContinue)) {
  Write-Host "ufbt is required to build Potato Strike Mini .fap"
  Write-Host "Install: python -m pip install ufbt"
  exit 1
}

Push-Location $PSScriptRoot
try {
  ufbt
} finally {
  Pop-Location
}

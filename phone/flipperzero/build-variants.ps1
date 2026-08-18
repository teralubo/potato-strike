$ErrorActionPreference = "Stop"

$ufbt = (Get-Command ufbt -ErrorAction SilentlyContinue).Source
if (-not $ufbt) {
  $ufbt = Join-Path $env:APPDATA "Python\Python39\Scripts\ufbt.exe"
}
if (-not (Test-Path $ufbt)) { throw "ufbt is required: python -m pip install --user ufbt" }

$variants = @(
  @{ Name = "official"; Index = "https://update.flipperzero.one/firmware/directory.json"; Output = "PotatoStrikeMini-1.3-FINAL-PATCH-1.3-official.fap" },
  @{ Name = "momentum"; Index = "https://up.momentum-fw.dev/firmware/directory.json"; Output = "PotatoStrikeMini-1.3-FINAL-PATCH-1.3-momentum.fap" },
  @{ Name = "unleashed"; Index = "https://up.unleashedflip.com/directory.json"; Output = "PotatoStrikeMini-1.3-FINAL-PATCH-1.3-unleashed.fap" }
)

New-Item -ItemType Directory -Force -Path "dist" | Out-Null

foreach ($variant in $variants) {
  Write-Host "Building Potato Strike Mini for $($variant.Name)..."
  & $ufbt update --index-url=$($variant.Index)
  & $ufbt
  $fap = Get-ChildItem -Path "." -Recurse -Filter "*.fap" | Sort-Object LastWriteTime -Descending | Select-Object -First 1
  if (-not $fap) {
    throw "No .fap produced for $($variant.Name)"
  }
  Copy-Item -Force $fap.FullName (Join-Path "dist" $variant.Output)
}

Write-Host "Flipper Zero firmware variants are ready in phone/flipperzero/dist"

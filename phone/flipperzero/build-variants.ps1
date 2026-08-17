$ErrorActionPreference = "Stop"

$variants = @(
  @{ Name = "official"; Index = "https://update.flipperzero.one/firmware/directory.json"; Output = "PotatoStrikeMini-1.2-FINAL-official.fap" },
  @{ Name = "momentum"; Index = "https://up.momentum-fw.dev/firmware/directory.json"; Output = "PotatoStrikeMini-1.2-FINAL-momentum.fap" },
  @{ Name = "unleashed"; Index = "https://up.unleashedflip.com/directory.json"; Output = "PotatoStrikeMini-1.2-FINAL-unleashed.fap" }
)

New-Item -ItemType Directory -Force -Path "dist" | Out-Null

foreach ($variant in $variants) {
  Write-Host "Building Potato Strike Mini for $($variant.Name)..."
  ufbt update --index-url=$($variant.Index)
  ufbt
  $fap = Get-ChildItem -Path "." -Recurse -Filter "*.fap" | Sort-Object LastWriteTime -Descending | Select-Object -First 1
  if (-not $fap) {
    throw "No .fap produced for $($variant.Name)"
  }
  Copy-Item -Force $fap.FullName (Join-Path "dist" $variant.Output)
}

Write-Host "Flipper Zero firmware variants are ready in phone/flipperzero/dist"

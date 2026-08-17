# Potato Strike Mini for Flipper Zero

## Najprosciej

1. Pobierz paczke `potato-strike-1.2-final-folder` z GitHub Actions.
2. Rozpakuj `PotatoStrike-1.2-FINAL.zip`.
3. Wybierz plik pod swoj firmware:

```text
PotatoStrikeMini-1.2-FINAL-official.fap   - oficjalny firmware Flipper Zero
PotatoStrikeMini-1.2-FINAL-momentum.fap   - Momentum Firmware
PotatoStrikeMini-1.2-FINAL-unleashed.fap  - Unleashed Firmware
```

4. Skopiuj wybrany plik z `phone/flipperzero/` na karte SD Flipper Zero do:

```text
/ext/apps/Games/
```

5. Na Flipperze wejdz w `Apps -> Games -> Potato Strike`.

Jesli pobierasz same artefakty, wybierz:

```text
potato-strike-flipperzero-official-fap
potato-strike-flipperzero-momentum-fap
potato-strike-flipperzero-unleashed-fap
```

This is a tiny Flipper Zero mini-game for the Potato Strike 1.2 FINAL compatibility pack.

It is intentionally minimal:

- monochrome 128x64 screen,
- no editor,
- no LAN,
- no textures,
- no HTML runtime,
- tiny RAM footprint,
- simple player, enemy, bullet, HP and score loop.

## Controls

- `Left` / `Right`: move
- `Up`: shoot
- `Back`: exit

## Build

Install `ufbt`, then run:

```powershell
ufbt
```

The resulting `.fap` is created in `dist/`.

To build all supported firmware variants locally:

```powershell
.\build-variants.ps1
```

This script creates:

```text
dist/PotatoStrikeMini-1.2-FINAL-official.fap
dist/PotatoStrikeMini-1.2-FINAL-momentum.fap
dist/PotatoStrikeMini-1.2-FINAL-unleashed.fap
```

## Firmware variants

- Official: built with `https://update.flipperzero.one/firmware/directory.json`.
- Momentum: built with `https://up.momentum-fw.dev/firmware/directory.json`.
- Unleashed: built with `https://up.unleashedflip.com/directory.json`.
- Other custom firmwares: try the closest matching `.fap` first. If the app does not start, build manually with that firmware's SDK/index if it supports uFBT.

GitHub Actions builds ready files for Official, Momentum and Unleashed firmware.

## Install

Copy the matching `.fap` to:

```text
/ext/apps/Games/
```

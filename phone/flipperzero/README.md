# Potato Strike Mini for Flipper Zero

This is a tiny Flipper Zero mini-game for the Potato Strike 1.1 BETA compatibility pack.

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

GitHub Actions also builds the `.fap` as an artifact named `potato-strike-flipperzero-fap`.

## Install

Copy the built `.fap` to:

```text
/ext/apps/Games/
```

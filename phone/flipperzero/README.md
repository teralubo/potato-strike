# Potato Strike Mini for Flipper Zero

## Najprosciej

1. Pobierz paczke `potato-strike-1.1-beta-folder` z GitHub Actions.
2. Rozpakuj `PotatoStrike-1.1-BETA.zip`.
3. Skopiuj `phone/flipperzero/PotatoStrikeMini-1.1-BETA.fap` na karte SD Flipper Zero do:

```text
/ext/apps/Games/
```

4. Na Flipperze wejdz w `Apps -> Games -> Potato Strike`.

Jesli pobierasz sam artefakt `potato-strike-flipperzero-fap`, wrzuc plik `.fap` w to samo miejsce.

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

GitHub Actions builds the ready file as `PotatoStrikeMini-1.1-BETA.fap` in the artifact named `potato-strike-flipperzero-fap`.

## Install

Copy the built `.fap` to:

```text
/ext/apps/Games/
```

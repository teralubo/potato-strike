# Changelog

## 1.2 BETA Unreleased

Experimental branch-only ideas for future gameplay and sandbox updates.

- Added `UNRELEASED-1.2-BETA.md` as the working plan for 1.2 ideas.
- Added `mods/unreleased/1.2-beta/aim-lab-bunker.json`, a small aim and recoil training prototype.
- Added `mods/unreleased/1.2-beta/extraction-sweep.json`, a story/extraction prototype with a custom objective.
- Added `mods/unreleased/1.2-beta/micro-royale.json`, a tiny fast-round combat prototype.
- Kept these ideas on `unreleased` so they can be tested before moving anything to `beta`.

## 1.1 BETA

Compatibility update focused on portable builds.

- Added `phone/android`, a lightweight Android WebView wrapper for the one-file Potato Strike HTML build.
- Added Android GitHub Actions build for `PotatoStrike-1.1-BETA-debug.apk`.
- Added `phone/flipperzero`, a tiny Flipper Zero mini-game version designed for low RAM and the 128x64 monochrome screen.
- Added Flipper Zero GitHub Actions build for `.fap` artifacts.
- Added `PotatoStrike-1.1-BETA.zip` packaging workflow with `phone/` and `phone/flipperzero/` inside the release folder.
- Added `scripts/sync-phone-assets.js` to copy the current `PotatoStrike.html` into Android assets.
- Added `scripts/package-compat.js` to create the 1.1 compatibility release folder/zip.
- Added GitHub Actions workflow for APK, FAP and compatibility ZIP artifacts.
- Added desktop compatibility CI for Windows x64/ia32 portable builds.
- Added Linux compatibility CI for AppImage, deb, rpm, tar.gz and unpacked Linux builds.
- Added `compat/` launchers for legacy Windows, portable Linux, Linux local-server mode and macOS best-effort HTML launch.
- Added simple Android and Flipper Zero READMEs with ready-file paths for `PotatoStrike-1.1-BETA.apk` and `PotatoStrikeMini-1.1-BETA.fap`.
- Added Flipper Zero firmware variants for Official, Momentum and Unleashed `.fap` builds.
- Kept the main game runtime unchanged for this compatibility update.

## 1.0 BETA FINAL

- Balanced bot economy so pistol rounds are fair.
- Added story objectives and Tab objective view.
- Added bomb drop/pickup slot behavior.
- Added knife and Glock burst mode.
- Added expanded gear shop with armor, helmet, defuse kit and Zeus.

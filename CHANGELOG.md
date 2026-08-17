# Changelog

## 1.2 FINAL

Sandbox Studio and 3D readability update.

- Added folder-based mod categories and the removable/restorable `default/fps_info` mod, disabled by default.
- Added grenade inventory slots, hold/release throwing, 3D arc physics, competitive purchase limits and synchronized jump-throws.
- Added unlimited profile-backed Fast Binds with same-key action sequences, per-entry and global enable controls, permanent removal and full config round-tripping while preserving all economy, side and buy-time checks.
- Added default adaptive V-Sync frame pacing with Eco/Balanced 30/60 FPS ceilings and optional manual caps.
- Replaced the fixed isometric Studio preview with a direct, persistent WebGL scene editor and a software fallback.
- Added separate 2D mission-plan and 3D scene workflows, including object/group/trigger/waypoint/sync/marker modes, transform tools, layers, history and multi-selection.
- Added local Three.js vendor build so Studio 3D works offline without a CDN.
- Added map schema `editorData.version: 2` for units, groups, triggers, waypoints, markers, systems, pickups and connections while retaining old obstacle compatibility.
- Connected Studio units, bot routes, pickups and triggers to game tests.
- Added 3D FPS jumping, crouching and corrected mouse/touch vertical camera control while preserving the 2D dash.
- Corrected FPS wall projection to use object height and elevation instead of oversized fixed walls.
- Added rotated obstacle collision/rendering and more readable low-cost materials, terrain, fog, characters and wall shading.
- Removed screen-space material stripes, aimed round spawns into the map and fixed status/minimap overlap on compact screens.
- Preserved the existing 2D game, profiles, mods, story mode, economy, LAN setup and offline crash guards.
- Promoted the Aim Lab Bunker, Extraction Sweep and Micro Royale JSON prototypes as optional 1.2 mod examples.
- Updated Android, Flipper Zero, desktop compatibility, Pages and release ZIP naming to 1.2 BETA.
- Kept heavy GitHub Actions builds manual/tag-only and Pages free of npm installation to reduce billed minutes.

## 1.1 BETA

Compatibility update focused on portable builds.

- Optimized GitHub Actions cost usage by moving heavy compatibility builds to manual/tag-only runs and making Pages publish the committed HTML without npm install.
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

# Changelog

## 1.3 FINAL - Patch 1.0

Release identifier shown in the main menu: `V1.3-FINAL PATCH: 1.0`.

### Patch 1.0 - Combat, economy and server rules

- Added distinct low-cost 2D silhouettes for pistols, rifles, sniper rifles, heavy weapons and the knife; actors and dropped weapons now show their actual weapon class.
- Changed player AWP hits against enemies to one-shot kills through armor for both body and head-equivalent 2D/3D collision hits.
- Added teammate damage scaling. Friendly fire deals 50% weapon, melee and grenade damage by default and can be changed by the LAN commander.
- Added `mp_friendlyfire_damage_reduction` support to server CFG files and the owner console, with an accepted range of `0.0-1.0`.
- Replaced the unexplained money number with the explicit `KASA $...` or `MONEY $...` top HUD label.
- Kept shop purchases behind all three checks: active freeze/live phase, remaining buy time and the player's own team buy zone.
- Standardized regular buy times at 20 seconds, Casual at 30 seconds and retained special-mode overrides where continuous buying is part of the mode.
- Expanded the LAN commander panel with bot difficulty, buy time, freeze time, round time, starting money, gravity, friendly fire and teammate damage controls.
- Expanded bot difficulty from three names to levels `0-5`; level `5` is the default and highest difficulty.
- Added automatic migration of old `easy`, `normal` and `hard` profile/server values to levels `1`, `3` and `5`.
- BOT matches use the player's `0-5` menu selection. LAN uses the commander's synchronized server setting. Story always starts at level `5`.
- Enabled friendly fire for Classic, Competitive and Wingman presets while Casual keeps it disabled, matching their intended rule style.
- Changed Wingman buy time from 15 to 20 seconds for consistency with the requested 20-30 second purchase window.
- Added release verification checks for the difficulty scale, teammate damage, commander controls, 2D weapon silhouettes and AWP behavior.
- Rebuilt the self-contained browser HTML, Android embedded HTML, full release package and compressed beta package.

### 1.3 Release - 3D textures, FPS controls and buying

- Added tiny FreEDoom 0.13.0 weapon viewmodel PNGs to the 3D renderer without changing 2D weapons.
- Added distinct cached FreEDoom-based texture variants and silhouette details for every built-in firearm.
- Added full FPS mouse look in 3D with horizontal yaw, vertical pitch and a stable 70-degree up/down range during ADS.
- Added CS-style team buy zones, round-start buy-time enforcement and clear shop/HUD availability feedback.
- Added potato-friendly FPS controls for precise mouse, ADS/scope sensitivity, raw input, acceleration, FOV and viewmodel movement.
- Kept textured viewmodels visible during RMB/ADS and added a fixed default center dot that hides while aiming.
- Expanded the existing crosshair mini-paint with a master toggle, reset-to-dot and full settings import/export.
- Added a dependency-free WAD/PLAYPAL/Doom Patch extraction tool and reproducible source manifest.
- Embedded weapon PNGs into the one-file HTML and included standalone assets in desktop packages.
- Kept procedural weapon rendering as the automatic missing-asset fallback and as the ADS/scope view.
- Excluded the original WAD files from Git and release packages; the runtime does not read them.
- Added BSD 3-Clause attribution and license files beside the exported assets.

## 1.2 FINAL

Sandbox Studio and 3D readability update.

- Added folder-based mod categories and the removable/restorable `default/fps_info` mod, disabled by default.
- Added grenade inventory slots, hold/release throwing, 3D arc physics, competitive purchase limits and synchronized jump-throws.
- Added unlimited profile-backed Fast Binds with same-key action sequences, per-entry and global enable controls, permanent removal and full config round-tripping while preserving all economy, side and buy-time checks.
- Added default adaptive V-Sync frame pacing with Eco/Balanced 30/60 FPS ceilings and optional manual caps.
- Added LAN room ownership, authoritative server-config writes, enemy-minimap control and JSON/CFG import/export.
- Added a LAN waiting room with explicit hosting/joining, live roster refresh, commander transfer and commander-controlled match start.
- Expanded the owner console with CS/GoldSrc-style cvars, config execution, map/bot controls, bind inspection and `sv_cheats`-gated debugging.
- Added immediate live-round bot movement and complete weapon/equipment transfer when taking over a teammate bot.
- Added commander-controlled RMB policies: disabled, zoom with classic crosshair, or Potato weapon sights with AWP scope and mobile AIM control.
- Added profile-backed BOT RMB selection in the main menu and a fixed ready-to-use sights policy for Story mode.
- Added functional Classic, Competitive 5v5, Wingman, Retake, Deathmatch, Casual and Training presets with enforced team sizes, timers, loadouts, respawns and frag scoring where applicable.
- Added configurable Story hint bind `J` and custom mission hints in Studio.
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

# Potato Strike 1.2 BETA Patch Notes

Potato Strike 1.2 BETA is the Sandbox Studio and 3D readability update.

## Studio 2D

- Added a mission-plan workflow inspired by classic Arma 2 editing: `F1` objects, `F2` groups, `F3` triggers, `F4` waypoints, `F5` synchronization and `F6` markers.
- Added pan, zoom, drag selection, multi-selection, copy/paste, delete, undo/redo and grid snapping.
- Added layers with visibility and locking, plus explorer and property editing.

## Studio 3D

- Replaced the fixed isometric preview with a real perspective WebGL workspace inspired by modern 3D mission editors such as Eden.
- Objects can be selected, placed and transformed directly in the 3D viewport.
- Camera controls: `WASD`, `Q/Z`, right mouse look, wheel speed, Shift boost and focus/reset buttons.
- Transform controls: `1` select, `2` move, `3` rotate and `4` scale. Hold Alt while moving to change elevation.
- Three.js is bundled locally with its MIT license and minified, so Studio works offline without a CDN. A canvas fallback remains available for weak or blocked WebGL drivers.

## Sandbox Data

- Added compatible map schema `editorData.version: 2`.
- Added units T/CT, groups, triggers, waypoints, markers, systems, pickups and synchronization connections.
- Kept the old obstacle map format, so existing maps and profiles can still be imported.
- Studio test mode now transfers unit spawns, group waypoint routes, pickups and triggers into the playable game.
- Custom trigger and mod code remains an advanced trusted-content feature. Do not import code from unknown sources.

## Game 3D

- Corrected wall projection to use each object's real height and elevation.
- Added rotation-aware obstacle collision and ray hits.
- Reworked low-cost wall materials, sky, terrain, fog, characters and shading for clearer enemy/background separation.
- Removed the repeated vertical wall accents responsible for visible screen stripes.
- Spawn cameras now face into the map, and desktop/mobile status messages no longer overlap the HUD or minimap.
- Preserved the existing lightweight raycaster and quality presets for potato hardware.

## Packaging

- Updated package version and desktop, Android, Flipper Zero and compatibility ZIP names to `1.2 BETA`.
- Updated GitHub Pages to publish the ready single-file game and current patch notes.
- Heavy compatibility builds remain manual or tag-triggered to avoid spending Actions minutes on normal pushes.
- Added optional example mods in `mods/examples/1.2-beta/`.

## Scope

Bots/offline are the primary full game path. LAN remains a lightweight lobby/heartbeat foundation with bot fill, not a complete authoritative internet multiplayer implementation. Potato Strike Mini for Flipper Zero remains a separate reduced mini-game because the full HTML sandbox cannot fit the device limits.

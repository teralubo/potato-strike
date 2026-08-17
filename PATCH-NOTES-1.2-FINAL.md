# Potato Strike 1.2 FINAL Patch Notes

Potato Strike 1.2 FINAL closes the Sandbox Studio line with finished FPS movement, folder-based mods and a rebuilt grenade inventory.

## Fast Bind and frame pacing

- Settings include profile-backed Fast Binds for buying any weapon, grenade or equipment item and for common inventory actions.
- A Fast Bind uses the normal shop path, so money, buy time, team restrictions and inventory replacement still apply.
- V-Sync is the default frame mode. It follows the browser/display refresh through `requestAnimationFrame`, with the existing Eco/Balanced performance presets limiting work to 30/60 FPS on potato PCs.
- Manual 30, 60 and 120 FPS caps and the maximum browser frame rate remain available.

## FPS movement

- `Space` jumps in 3D and keeps the existing dash in 2D.
- `Ctrl` crouches, lowers the camera and reduces movement speed.
- Desktop mouse and mobile touch both support vertical camera control.

## Mods

- First-level folders inside `mods/` are categories in the mod manager.
- Added `mods/default/fps_info`, disabled by default.
- `fps_info` shows a small FPS counter in the upper-left corner when enabled.
- Mods can be enabled, disabled, prioritized, removed from a profile and restored.
- Electron scans nested `mod.json` manifests; browser profiles use the same category metadata.

## Grenades

- Grenades are regular inventory entries selected with `1-0`, the mouse wheel or `H`.
- Hold left mouse to aim and release it to throw. The mobile `FIRE` button uses the same flow.
- Added a lightweight 3D arc with height, gravity, wall collision and ground bounce.
- Pressing jump while a grenade is primed performs a synchronized jump-throw.
- Purchase limits follow the competitive pattern: four grenades total, up to two flashbangs and one of every other type.

## Builds

- `main`: full `PotatoStrike-1.2-FINAL.zip`.
- `beta`: compressed `PotatoStrike-1.2-BETA-FINAL.zip` without developer tools, platform source trees or example mods; gameplay and Studio remain included.
- Heavy compatibility workflows remain manual or tag-triggered to protect GitHub Actions minutes.

# Potato Strike 1.3 BETA texture update

This beta updates only the lightweight 3D weapon presentation. The 2D renderer and its weapons are unchanged.

## FPS camera

- Mouse look now rotates the 3D camera both left-right and up-down, including during ADS and AWP scope use.
- Vertical look has a stable range of about 70 degrees and respects pitch sensitivity, aim sensitivity and inverted Y settings.
- Walls, terrain, players, dropped equipment and mission markers share the same vertical projection around the fixed center aim point.

## CS-style buying and controls

- Added team-specific T and CT buy zones around map spawns in 2D and 3D; buying and Fast Bind purchases require the player to remain in their own zone.
- Buy time now counts from round start, includes freeze time and reports whether time or location blocks a purchase.
- Custom and generated maps receive buy zones automatically, while moving a spawn in the editor also moves its buy zone.
- Added precise mouse sensitivity, ADS/scope sensitivity, raw input, optional acceleration, 3D FOV and weapon-view movement settings.

## 3D weapon textures

- Added low-resolution first-person weapon sprites exported from FreEDoom 0.13.0.
- Every CS-style weapon now receives a cached lightweight variant with its own material color, scale and silhouette detail instead of sharing one category texture.
- Suppressors, scopes, long barrels, magazines, drums and dual-pistol layouts make important weapons readable at a glance while retaining FreEDoom pixels as the legal source.
- FreEDoom viewmodels now remain visible while holding RMB/ADS; the sprite is raised toward the sight line instead of switching to the untextured body.
- Pistols, shotguns, SMGs, rifles, sniper rifles and heavy weapons receive category-appropriate textured viewmodels.
- ADS, iron sights and AWP scope retain the existing readable procedural model.
- Knife, grenades and C4 remain unchanged because the source set has no matching replacement that improves gameplay readability.
- Missing or unreadable PNG files automatically fall back to the previous procedural weapon model.

## Crosshair editor

- The default non-aiming crosshair is now one fixed center dot inspired by the static CS2 setup.
- Every active RMB aiming mode hides the regular crosshair; AWP keeps its dedicated scope reticle.
- Settings now include a master crosshair toggle, presets, color, size, gap, thickness, outline and the existing 16x16 multi-color mini-paint.
- Added reset-to-dot plus full crosshair import/export, including enabled state, preset parameters and painted pixels.
- Existing profiles migrate to the dot while preserving already-painted custom crosshairs.

## Lightweight and removable source

- The original `freedoom1.wad` and `freedoom2.wad` files are build-time inputs only and are excluded from Git and release packages.
- `DEV-tools/extract-freedoom-weapons.js` converts Doom Patch lumps and `PLAYPAL` directly to transparent PNG without external dependencies.
- The committed PNG set is roughly 30 KiB. The one-file HTML build embeds it as data URLs and remains fully offline.
- The game and release package continue to work after the source WAD files are deleted.

## License

The exported weapon artwork comes from FreEDoom 0.13.0 and is distributed under the BSD 3-Clause license. Attribution, the license text, source WAD hash and lump mapping are stored in `game/assets/weapons/freedoom/`.

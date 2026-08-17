# Potato Strike 1.3 BETA texture update

This beta updates only the lightweight 3D weapon presentation. The 2D renderer and its weapons are unchanged.

## 3D weapon textures

- Added low-resolution first-person weapon sprites exported from FreEDoom 0.13.0.
- Pistols, shotguns, SMGs, rifles, sniper rifles and heavy weapons receive category-appropriate textured viewmodels.
- ADS, iron sights and AWP scope retain the existing readable procedural model.
- Knife, grenades and C4 remain unchanged because the source set has no matching replacement that improves gameplay readability.
- Missing or unreadable PNG files automatically fall back to the previous procedural weapon model.

## Lightweight and removable source

- The original `freedoom1.wad` and `freedoom2.wad` files are build-time inputs only and are excluded from Git and release packages.
- `DEV-tools/extract-freedoom-weapons.js` converts Doom Patch lumps and `PLAYPAL` directly to transparent PNG without external dependencies.
- The committed PNG set is roughly 30 KiB. The one-file HTML build embeds it as data URLs and remains fully offline.
- The game and release package continue to work after the source WAD files are deleted.

## License

The exported weapon artwork comes from FreEDoom 0.13.0 and is distributed under the BSD 3-Clause license. Attribution, the license text, source WAD hash and lump mapping are stored in `game/assets/weapons/freedoom/`.

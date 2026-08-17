# Potato Strike 1.2 FINAL Patch Notes

Potato Strike 1.2 FINAL closes the Sandbox Studio line with finished FPS movement, folder-based mods and a rebuilt grenade inventory.

## LAN owner, console and aiming

- Added a dedicated LAN server button and waiting room. Players join through `Play` with LAN selected, while the host can wait, refresh the roster, transfer commander rights, edit server settings and start everyone together.
- The player who creates a LAN room is its commander. The lightweight server keeps the owner ID and rejects server-config writes from other players.
- The commander can toggle enemy minimap visibility, set the hostname/player limit, enable debug cheats, and import/export a complete JSON or Valve-style `.cfg` server configuration.
- The owner console now supports command batches and a safe CS/GoldSrc-style set including `status`, `cvarlist`, `exec`, `writecfg`, `map`, bot commands, round cvars, binds and cheat-gated debugging commands.
- Bots receive an opening movement order as soon as freeze time ends. Taking over a teammate bot transfers its weapon, ammunition, armor, helmet, kit, Zeus and grenades immediately.
- The commander chooses one authoritative RMB policy: no action, zoom with the classic crosshair, or Potato sights inspired by direct weapon-sight views. The sights policy gives AWP its scope and aligns simple iron sights for other guns; Glock keeps RMB burst switching.
- Offline BOT matches expose the same RMB policy in the main menu. Story mode consistently uses weapon sights so campaign missions have a ready aiming setup.
- Server rules, minimap ownership and inventory behavior are shared by the 2D and 3D game paths.

## Match modes and story hints

- Added functional presets for Classic/custom size, Competitive 5v5, Wingman 2v2, Retake, Deathmatch, Casual 10v10 and Training 1v1.
- Wingman, Competitive, Casual and Training enforce their team sizes and round limits. Classic keeps the existing manual 1v1-10v10 selector.
- Retake starts with a planted bomb, short timer and side-appropriate rifle, armor, utility and CT defuse kit.
- Deathmatch and Training disable the bomb, provide a rifle loadout, track frags and respawn players and bots without dropping the active loadout.
- Story mode has a configurable `J` hint bind. Studio missions can save a custom hint; older missions receive a contextual hint based on their objective type.

## Fast Bind and frame pacing

- Settings include unlimited profile-backed Fast Binds for buying any weapon, grenade or equipment item and for common inventory actions.
- Multiple actions can share one key for complete loadout binds. Every entry can be enabled, disabled or permanently removed, and the whole Fast Bind system can be switched off or cleared.
- Fast Bind order, enabled state and master switch are included in full profile/config export and restored on import.
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

# Potato Strike Mods

Drop JSON mod files here for the offline/Electron version.

Supported JSON fields:

- `name`
- `mode`
- `roundTime`
- `map`
- `weapons`
- `missions`
- `storyGoal`
- `code`

Script snippets can be imported from the editor, but they run only through a small sandbox API.

## Story objectives

Story maps can define a goal in `map.meta.storyGoal` or in a saved mission:

```json
{
  "name": "Warehouse Sweep",
  "mode": "story",
  "map": {
    "name": "Warehouse",
    "meta": {
      "storyGoal": {
        "type": "eliminate",
        "target": 1,
        "text": "Clear all enemy bots",
        "code": "return ctx.enemiesAlive <= 0;"
      }
    },
    "obstacles": []
  }
}
```

Supported goal `type` values: `eliminate`, `kills`, `plant`, `defuse`, `win`, `custom`.

The `code` field is optional JavaScript used by the offline sandbox to decide if the task is complete. It receives `ctx`:

- `ctx.player`
- `ctx.state`
- `ctx.map`
- `ctx.bomb`
- `ctx.goal`
- `ctx.enemiesAlive`
- `ctx.alliesAlive`
- `ctx.kills`
- `ctx.roundKills`
- `ctx.plants`
- `ctx.defuses`

Examples:

```js
return ctx.enemiesAlive <= 0;
return ctx.kills >= 3 && ctx.player.hp >= 50;
return ctx.bomb.status === "planted" && ctx.bomb.site === "A";
```

In story mode the player can press `Tab` to view the current objective. If no custom objective exists, Potato Strike uses the default objective: eliminate all enemies.

## Bomb and weapon rules

On death, actors drop their weapons, but never the knife. The bomb is a special inventory slot: scroll or number keys can select it, and holding `E` uses it. Only Terrorists can pick up a dropped bomb.

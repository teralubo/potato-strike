const fs = require("fs");

const html = fs.readFileSync("index.html", "utf8");
const js = fs.readFileSync("game.js", "utf8");
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const defaultConfig = JSON.parse(fs.readFileSync("configs/default-config.json", "utf8"));

const ids = [...js.matchAll(/\$\("([^"]+)"\)/g)].map((match) => match[1]);
const missing = [...new Set(ids)].filter((id) => !html.includes(`id="${id}"`));

if (missing.length) {
  console.error(`Missing DOM IDs: ${missing.join(", ")}`);
  process.exit(1);
}

if (!packageJson.scripts || !packageJson.scripts.start || !packageJson.scripts["start:editor"] || !packageJson.scripts["build:win"] || !packageJson.scripts["build:linux"] || !packageJson.scripts.serve) {
  console.error("package.json is missing start/build scripts");
  process.exit(1);
}

for (const file of ["main.js", "preload.js", "editor.html", "editor.css", "editor.js", "launch-offline-window.bat", "scripts/package-offline.js", "mods/README.md"]) {
  if (!fs.existsSync(file)) {
    console.error(`Missing required offline file: ${file}`);
    process.exit(1);
  }
}

for (const file of [
  `dist/Potato Strike ${packageJson.version}.exe`,
  "PotatoStrike.exe",
  "PotatoStrike.bat",
  "PotatoStrike-Window.bat",
  "PotatoStrike-Studio.bat",
  "configs/default-config.json",
  "mods/README.md",
  "beta/PotatoStrike-Beta.exe",
  "beta/PotatoStrike.bat",
  "beta/PotatoStrike-Window.bat",
  "beta/PotatoStrike-Studio.bat",
  "beta/configs/default-config.json",
  "beta/mods/README.md",
]) {
  if (!fs.existsSync(file)) {
    console.error(`Missing required game artifact: ${file}`);
    process.exit(1);
  }
}

for (const key of ["configId", "userMaps", "storyMissions", "customTextures", "mods", "settings", "bindings", "nick", "playerId"]) {
  if (!(key in defaultConfig)) {
    console.error(`default config missing ${key}`);
    process.exit(1);
  }
}

if (!js.includes("userMaps()") || !js.includes("storyMissions: savedStoryMissions()")) {
  console.error("runtime config does not include generated maps and story missions");
  process.exit(1);
}

if (!fs.readFileSync("main.js", "utf8").includes("config:save") || !fs.readFileSync("preload.js", "utf8").includes("saveConfig")) {
  console.error("Electron config save bridge is missing");
  process.exit(1);
}

for (const snippet of [
  "draw3dCharacter",
  "draw3dWeapon",
  "draw3dSiteMarkers",
  "openOwnerConsole",
  "isLobbyCommander",
  "editorWidth",
  "editorHeight",
  "editorRotation",
  "editorColor",
  "registerUserMap",
  "importTexture",
  "importMod",
  "loadedMods",
  "customTextures",
  "makeClassicMap",
  "dust2",
  "quickEditor",
  "openStandaloneEditor",
  "loadStudioTestMap",
  "loadUserMapsFromStorage",
]) {
  if (!js.includes(snippet)) {
    console.error(`Missing required runtime feature: ${snippet}`);
    process.exit(1);
  }
}

const editorJs = fs.readFileSync("editor.js", "utf8");
for (const snippet of ["testMap", "saveMap", "generateMap", "potatoStrikeStudioTestMap", "potatoStrikeUserMaps"]) {
  if (!editorJs.includes(snippet)) {
    console.error(`Missing required Studio feature: ${snippet}`);
    process.exit(1);
  }
}

console.log(`DOM IDs OK: ${new Set(ids).size}`);
console.log("package.json OK");
console.log("config/offline requirements OK");
console.log("main-folder/beta/editor/model requirements OK");

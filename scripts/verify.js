const fs = require("fs");

const html = fs.readFileSync("game/index.html", "utf8");
const js = fs.readFileSync("game/game.js", "utf8");
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const defaultConfig = JSON.parse(fs.readFileSync("configs/default-config.json", "utf8"));

const ids = [...js.matchAll(/\$\("([^"]+)"\)/g)].map((match) => match[1]);
const missing = [...new Set(ids)].filter((id) => !html.includes(`id="${id}"`));

if (missing.length) {
  console.error(`Missing DOM IDs: ${missing.join(", ")}`);
  process.exit(1);
}

if (!packageJson.scripts || !packageJson.scripts.start || !packageJson.scripts["start:safe"] || !packageJson.scripts["start:editor"] || !packageJson.scripts["build:win"] || !packageJson.scripts["build:linux"] || !packageJson.scripts.serve) {
  console.error("package.json is missing start/build scripts");
  process.exit(1);
}

for (const file of ["main.js", "preload.js", "game/index.html", "game/styles.css", "game/game.js", "game/editor.html", "game/editor.css", "game/editor.js", "launch-offline-window.bat", "scripts/package-offline.js", "scripts/build-single-html.js", "DEV-tools/README.md", "DEV-tools/mod-template.json", "mods/README.md"]) {
  if (!fs.existsSync(file)) {
    console.error(`Missing required offline file: ${file}`);
    process.exit(1);
  }
}

for (const file of [
  "PotatoStrike.bat",
  "PotatoStrike.html",
  "PotatoStrike-Window.bat",
  "PotatoStrike-Studio.bat",
  "configs/default-config.json",
  "mods/README.md",
]) {
  if (!fs.existsSync(file)) {
    console.error(`Missing required game artifact: ${file}`);
    process.exit(1);
  }
}

if (fs.existsSync("beta")) {
  console.error("Local beta folder should not exist; beta is published via the GitHub beta branch");
  process.exit(1);
}

for (const key of ["type", "configId", "userMaps", "storyMissions", "customTextures", "mods", "settings", "bindings", "nick", "playerId"]) {
  if (!(key in defaultConfig)) {
    console.error(`default config missing ${key}`);
    process.exit(1);
  }
}

if (!js.includes("userMaps()") || !js.includes("storyMissions: savedStoryMissions()")) {
  console.error("runtime config does not include generated maps and story missions");
  process.exit(1);
}

const mainJs = fs.readFileSync("main.js", "utf8");
if (!mainJs.includes("config:save") || !fs.readFileSync("preload.js", "utf8").includes("saveConfig")) {
  console.error("Electron config save bridge is missing");
  process.exit(1);
}

if (!packageJson.build?.files?.includes("PotatoStrike.html")) {
  console.error("Electron build must include PotatoStrike.html for safe offline mode");
  process.exit(1);
}

if (!fs.existsSync("logs/.gitkeep")) {
  console.error("Missing logs folder marker");
  process.exit(1);
}

const singleHtml = fs.readFileSync("PotatoStrike.html", "utf8");
if (!singleHtml.includes("<style>") || !singleHtml.includes("<script>") || singleHtml.includes('src="game.js"') || singleHtml.includes('href="styles.css"')) {
  console.error("Single-file HTML build is not self-contained");
  process.exit(1);
}

if (!mainJs.includes("playersDir") || !mainJs.includes("profile.json") || !mainJs.includes("assets.json")) {
  console.error("Player profile folder storage is missing");
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
  "createPlayerProfile",
  "renderProfileMenu",
  "applyProfile",
  "renderModManager",
  "sortedMods",
  "enterSpectator",
  "updateSpectator",
  "takeoverBot",
  "livingTeamBots",
  "ensureAudio",
  "emitAudioEvent",
  "pollServerAudioEvents",
  "weaponAudioProfile",
  "maybeStep",
]) {
  if (!js.includes(snippet)) {
    console.error(`Missing required runtime feature: ${snippet}`);
    process.exit(1);
  }
}

const editorJs = fs.readFileSync("game/editor.js", "utf8");
for (const snippet of ["testMap", "saveMap", "generateMap", "draw3dPreview", "isoCanvasPoint", "viewportMode", "importAssets", "potatoStrikeStudioTestMap", "potatoStrikeUserMaps"]) {
  if (!editorJs.includes(snippet)) {
    console.error(`Missing required Studio feature: ${snippet}`);
    process.exit(1);
  }
}

for (const snippet of ["wrap.dataset.view", "canvas.style.width = \"100%\"", "drawViewLabel(\"3D EDIT\"", "window.addEventListener(\"resize\", draw)"]) {
  if (!editorJs.includes(snippet)) {
    console.error(`Missing required persistent Studio viewport feature: ${snippet}`);
    process.exit(1);
  }
}

const editorHtml = fs.readFileSync("game/editor.html", "utf8");
for (const snippet of ["Grafika edytora", "drawIsoFloor", "shadeColor", "studioSettings.testGraphics = studioSettings.viewportMode", "type=\"hidden\" value=\"2d\""]) {
  if (!editorJs.includes(snippet) && !editorHtml.includes(snippet)) {
    console.error(`Missing required Studio editor graphics separation: ${snippet}`);
    process.exit(1);
  }
}

for (const snippet of ["TEREN / ADVANCED", "applyTerrainSettings", "snapPoint", "terrainColor", "moddingMode", "autosave-map"]) {
  if (!editorJs.includes(snippet) && !editorHtml.includes(snippet)) {
    console.error(`Missing required Studio advanced terrain/modding feature: ${snippet}`);
    process.exit(1);
  }
}

for (const snippet of ["hitIsoObject", "isoBoxFaces", "hitObjectAtEvent", "pointInPolygon"]) {
  if (!editorJs.includes(snippet)) {
    console.error(`Missing required Studio 3D editing feature: ${snippet}`);
    process.exit(1);
  }
}

for (const snippet of ["showFatalError", "normalizeMap", "findSafePoint", "showFatalError(fallbackError, \"renderu\")", "normalizeMap(maps[state.mapKey]"]) {
  if (!js.includes(snippet)) {
    console.error(`Missing required runtime safety guard: ${snippet}`);
    process.exit(1);
  }
}

for (const snippet of ["showBootError", "ensureNormalBootMenu", "if (!loadStudioTestMap()) ensureNormalBootMenu()"]) {
  if (!js.includes(snippet)) {
    console.error(`Missing required offline boot guard: ${snippet}`);
    process.exit(1);
  }
}

const preloadJs = fs.readFileSync("preload.js", "utf8");
for (const snippet of ["writeLog", "logs", "potato-strike.log", "preload-error", "log:renderer", "crashReporter", "showCrashRecoveryWindow", "POTATO_SAFE_OFFLINE", "PotatoStrike.html"]) {
  if (!mainJs.includes(snippet) && !preloadJs.includes(snippet)) {
    console.error(`Missing required offline logging feature: ${snippet}`);
    process.exit(1);
  }
}

if (!fs.readFileSync("game/styles.css", "utf8").includes("#menu {\n  position: absolute;\n  inset: 0;\n  z-index: 5;")) {
  console.error("Menu overlay z-index guard is missing");
  process.exit(1);
}

for (const snippet of ["cycleSpectatorTarget", "spectatorNext", "OBS HP", "po dead strzalki lub klik"]) {
  if (!js.includes(snippet) && !html.includes(snippet)) {
    console.error(`Missing required spectator feature: ${snippet}`);
    process.exit(1);
  }
}

for (const snippet of ["normalizeStudioMap", "map = normalizeStudioMap(map);", "Nie udalo sie zaimportowac mapy", "Mapa przekonwertowana do edycji"]) {
  if (!editorJs.includes(snippet)) {
    console.error(`Missing required Studio safety guard: ${snippet}`);
    process.exit(1);
  }
}

console.log(`DOM IDs OK: ${new Set(ids).size}`);
console.log("package.json OK");
console.log("config/offline requirements OK");
console.log("main-folder/beta/editor/model requirements OK");

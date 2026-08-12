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

if (!packageJson.scripts || !packageJson.scripts.start || !packageJson.scripts["start:safe"] || !packageJson.scripts["start:editor"] || !packageJson.scripts["build:win"] || !packageJson.scripts["build:win:compat"] || !packageJson.scripts["build:linux"] || !packageJson.scripts["build:linux:compat"] || !packageJson.scripts.serve || !packageJson.scripts["phone:sync"] || !packageJson.scripts["package:compat"]) {
  console.error("package.json is missing start/build scripts");
  process.exit(1);
}

for (const file of ["main.js", "preload.js", "game/index.html", "game/styles.css", "game/game.js", "game/editor.html", "game/editor.css", "game/editor.js", "launch-offline-window.bat", "scripts/package-offline.js", "scripts/build-single-html.js", "scripts/sync-phone-assets.js", "scripts/package-compat.js", "DEV-tools/README.md", "DEV-tools/mod-template.json", "mods/README.md", "CHANGELOG.md", "PATCH-NOTES-1.1-BETA.md"]) {
  if (!fs.existsSync(file)) {
    console.error(`Missing required offline file: ${file}`);
    process.exit(1);
  }
}

for (const file of [
  ".github/workflows/potato-strike-1-1-beta.yml",
  ".github/workflows/pages.yml",
  "phone/README.md",
  "phone/android/README.md",
  "phone/android/settings.gradle",
  "phone/android/build.gradle",
  "phone/android/app/build.gradle",
  "phone/android/app/src/main/AndroidManifest.xml",
  "phone/android/app/src/main/java/local/potatostrike/android/MainActivity.java",
  "phone/android/app/src/main/assets/PotatoStrike.html",
  "phone/flipperzero/README.md",
  "phone/flipperzero/application.fam",
  "phone/flipperzero/potato_strike_mini.c",
  "phone/flipperzero/build-flipper.ps1",
  "phone/flipperzero/build-variants.ps1",
  "compat/README.md",
  "compat/windows/PotatoStrike-Windows-Legacy.cmd",
  "compat/linux/PotatoStrike-Linux-Portable.sh",
  "compat/linux/PotatoStrike-Linux-Server.sh",
  "compat/macos/PotatoStrike-macOS.command",
]) {
  if (!fs.existsSync(file)) {
    console.error(`Missing required 1.1 compatibility file: ${file}`);
    process.exit(1);
  }
}

const compatWorkflow = fs.readFileSync(".github/workflows/potato-strike-1-1-beta.yml", "utf8");
for (const snippet of ["desktop-compat", "build:win:compat", "build:linux:compat", "potato-strike-windows-compat", "potato-strike-linux-compat", "phone/android/PotatoStrike-1.1-BETA.apk", "PotatoStrikeMini-1.1-BETA-official.fap", "PotatoStrikeMini-1.1-BETA-momentum.fap", "PotatoStrikeMini-1.1-BETA-unleashed.fap", "https://up.momentum-fw.dev/firmware/directory.json", "merge-multiple: true"]) {
  if (!compatWorkflow.includes(snippet)) {
    console.error(`Missing required desktop compatibility workflow feature: ${snippet}`);
    process.exit(1);
  }
}

const pagesWorkflow = fs.readFileSync(".github/workflows/pages.yml", "utf8");
for (const snippet of ["cp PotatoStrike.html _site/index.html", "touch _site/.nojekyll", "pages-info.html", "not the repository README"]) {
  if (!pagesWorkflow.includes(snippet)) {
    console.error(`Missing required GitHub Pages HTML-game feature: ${snippet}`);
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
  "simple3dTextures",
  "textureForHit",
  "sideColorForHit",
  "draw3dTerrain",
  "draw3dFloorPerspectiveGrid",
  "drawFpsStatusStrip",
  "settings.quality === \"high\" ? 520 : 360",
  "draw3dFloorGuides",
  "drawPotatoWallColumn",
  "castRayHit",
  "draw3dWeapon",
  "weaponViewModel",
  "drawWeaponHands",
  "drawWeaponMuzzleFlash",
  "draw3dSiteMarkers",
  "draw3dProjectilesAndObjectives",
  "projectWorldToFps",
  "equipmentCatalog",
  "Defuse Kit",
  "Kevlar + Helmet",
  "canBuyNow",
  "buyTime",
  "shop-status",
  "droppedWeapons",
  "dropActiveWeapon",
  "pickupDroppedWeapon",
  "dropOwnedWeaponCategory",
  "Knife",
  "droppable: false",
  "meleeAttack",
  "knifeWeaponId",
  "burstCapable",
  "toggleWeaponMode",
  "fireMode",
  "dropPlayerLoadoutOnDeath",
  "dropActorLoadoutOnDeath",
  "pickupDroppedBomb",
  "carriedItems",
  "isBombSelected",
  "story-objective-panel",
  "checkStoryObjective",
  "runStoryGoalCode",
  "makeBotLoadout",
  "botRoundBudget",
  "chooseAffordableWeapon",
  "actorWeaponStats",
  "equipmentPrice",
  "Zeus x27",
  "Kevlar + Helmet",
  "Defuse Kit",
  "state.round > 1 || weapon.category === \"Pistol\"",
  "bindings.drop",
  "KeyH",
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
  "camera.pitch",
  "normalizeGraphicsMode",
  "isPerspectiveMode",
  "renderGameView",
  "3D FPS",
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
  "stepAudioProfile",
  "impactAudioProfile",
  "materialAt",
  "autoTextureForHit",
  "hazard",
  "bluewall",
  "impact",
  "maybeStep",
  "applyLanguage",
  "i18n",
  "bindLabel",
  "setOptionText",
  "crosshairSize",
  "crosshairGap",
  "crosshairThickness",
  "crosshairOutline",
  "crosshairCustomEnabled",
  "crosshairPaintCanvas",
  "drawCustomCrosshair",
  "paintCrosshairCell",
  "normalizeCrosshairPixels",
  "cycleWeapon",
  "pitchSensitivity",
  "invertY",
  "redpanel",
  "greenpanel",
  "tile",
  "camo",
  "stripe",
  "3D FPS",
]) {
  if (!js.includes(snippet)) {
    console.error(`Missing required runtime feature: ${snippet}`);
    process.exit(1);
  }
}

const editorJs = fs.readFileSync("game/editor.js", "utf8");
for (const snippet of ["testMap", "saveMap", "generateMap", "draw3dPreview", "isoCanvasPoint", "viewportMode", "importAssets", "potatoStrikeStudioTestMap", "potatoStrikeUserMaps", "testGraphics", "storyGoal", "story-goal-code"]) {
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
for (const snippet of ["Grafika edytora", "drawIsoFloor", "shadeColor", "Kamera testu", "<option value=\"3d\">3D FPS</option>"]) {
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

for (const snippet of ["default-texture", "textureOptions", "studioTexturePalette", "[\"texture\", \"texture\"]", "defaultTexture"]) {
  if (!editorJs.includes(snippet) && !editorHtml.includes(snippet)) {
    console.error(`Missing required simple texture Studio feature: ${snippet}`);
    process.exit(1);
  }
}

for (const snippet of ["texture-paint-canvas", "paint-color", "paint-size", "savePaintTexture", "applyPaintTextureToSelected", "textureColor"]) {
  if (!editorJs.includes(snippet) && !editorHtml.includes(snippet) && !js.includes(snippet)) {
    console.error(`Missing required mini-paint texture feature: ${snippet}`);
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

const stylesCss = fs.readFileSync("game/styles.css", "utf8").replace(/\r\n/g, "\n");
if (!stylesCss.includes("#menu {\n  position: absolute;\n  inset: 0;\n  z-index: 5;")) {
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

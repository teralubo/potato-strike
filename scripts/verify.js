const fs = require("fs");
const path = require("path");

function fail(message) {
  console.error(message);
  process.exit(1);
}

function requireFiles(files, label = "required file") {
  for (const file of files) {
    if (!fs.existsSync(file)) fail(`Missing ${label}: ${file}`);
  }
}

function requireSnippets(source, snippets, label) {
  for (const snippet of snippets) {
    if (!source.includes(snippet)) fail(`Missing ${label}: ${snippet}`);
  }
}

function verifyDomIds(source, html, label) {
  const ids = [...source.matchAll(/\$\("([^"]+)"\)/g)].map((match) => match[1]);
  const missing = [...new Set(ids)].filter((id) => !html.includes(`id="${id}"`));
  if (missing.length) fail(`${label} missing DOM IDs: ${missing.join(", ")}`);
  return new Set(ids).size;
}

function jsonFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return jsonFiles(file);
    return entry.isFile() && entry.name.endsWith(".json") ? [file] : [];
  });
}

const gameHtml = fs.readFileSync("game/index.html", "utf8");
const gameJs = fs.readFileSync("game/game.js", "utf8");
const editorHtml = fs.readFileSync("game/editor.html", "utf8");
const editorJs = fs.readFileSync("game/editor.js", "utf8");
const editorCss = fs.readFileSync("game/editor.css", "utf8");
const mainJs = fs.readFileSync("main.js", "utf8");
const preloadJs = fs.readFileSync("preload.js", "utf8");
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const packageLock = JSON.parse(fs.readFileSync("package-lock.json", "utf8"));
const defaultConfig = JSON.parse(fs.readFileSync("configs/default-config.json", "utf8"));

const gameIdCount = verifyDomIds(gameJs, gameHtml, "Game");
const editorIdCount = verifyDomIds(editorJs, editorHtml, "Studio");

if (packageJson.version !== "1.3.0") fail(`Unexpected package version: ${packageJson.version}`);
if (packageLock.version !== packageJson.version || packageLock.packages?.[""]?.version !== packageJson.version) {
  fail("package-lock.json version does not match package.json");
}

for (const script of [
  "start", "start:safe", "start:editor", "serve", "verify", "build:editor-vendor", "build:single", "assets:freedoom",
  "package:offline", "package:compat", "package:beta-final", "phone:sync", "build:win", "build:win:compat", "build:linux", "build:linux:compat",
]) {
  if (!packageJson.scripts?.[script]) fail(`package.json is missing script: ${script}`);
}

if (!packageJson.dependencies?.three || !packageJson.devDependencies?.esbuild) fail("Studio 3D build dependencies are missing");
if (!packageJson.build?.files?.includes("game/vendor/three.min.js") || !packageJson.build?.files?.includes("game/vendor/THREE-LICENSE.txt") || !packageJson.build?.files?.includes("game/assets/**/*")) {
  fail("Electron package does not include the local Studio 3D vendor and license");
}

requireFiles([
  "main.js", "preload.js", "server.js", "game/index.html", "game/styles.css", "game/game.js",
  "game/editor.html", "game/editor.css", "game/editor.js", "game/vendor/three.min.js", "game/vendor/THREE-LICENSE.txt",
  "DEV-tools/three-vendor-entry.js", "DEV-tools/README.md", "DEV-tools/mod-template.json",
  "DEV-tools/extract-freedoom-weapons.js",
  "scripts/package-offline.js", "scripts/build-single-html.js", "scripts/clean-editor-vendor.js", "scripts/sync-phone-assets.js", "scripts/package-compat.js", "scripts/package-beta-final.js",
  "PotatoStrike.html", "PotatoStrike.bat", "PotatoStrike-Window.bat", "PotatoStrike-Studio.bat",
  "README.md", "CHANGELOG.md", "PATCH-NOTES-1.1-BETA.md", "PATCH-NOTES-1.2-BETA.md", "PATCH-NOTES-1.2-FINAL.md", "PATCH-NOTES-1.3-BETA.md", "PATCH-NOTES-1.3-FINAL.md", "PATCH-NOTES-1.3-BETA-FINAL.md", "SANDBOX-EXAMPLES-1.2-BETA.md",
  "game/assets/weapons/freedoom/README.md", "game/assets/weapons/freedoom/LICENSE-FREEDOOM.txt", "game/assets/weapons/freedoom/manifest.json",
  "game/assets/weapons/freedoom/pistol.png", "game/assets/weapons/freedoom/shotgun.png", "game/assets/weapons/freedoom/super-shotgun.png",
  "game/assets/weapons/freedoom/chaingun.png", "game/assets/weapons/freedoom/launcher.png", "game/assets/weapons/freedoom/plasma.png", "game/assets/weapons/freedoom/bfg.png",
  "mods/README.md", "mods/examples/README.md", "mods/examples/1.2-beta/README.md",
  "mods/default/fps_info/mod.json", "mods/default/fps_info/README.md",
  "mods/examples/1.2-beta/aim-lab-bunker.json", "mods/examples/1.2-beta/extraction-sweep.json", "mods/examples/1.2-beta/micro-royale.json",
  ".github/workflows/potato-strike-1-2-beta.yml", ".github/workflows/pages.yml",
  "phone/README.md", "phone/android/README.md", "phone/android/settings.gradle", "phone/android/build.gradle",
  "phone/android/app/build.gradle", "phone/android/app/src/main/AndroidManifest.xml",
  "phone/android/app/src/main/java/local/potatostrike/android/MainActivity.java",
  "phone/android/app/src/main/assets/PotatoStrike.html", "phone/flipperzero/README.md",
  "phone/flipperzero/application.fam", "phone/flipperzero/potato_strike_mini.c",
  "phone/flipperzero/build-flipper.ps1", "phone/flipperzero/build-variants.ps1",
  "phone/flipperzero/PotatoStrikeMini-1.3-FINAL-PATCH-1.3-official.fap",
  "phone/flipperzero/PotatoStrikeMini-1.3-FINAL-PATCH-1.3-momentum.fap",
  "phone/flipperzero/PotatoStrikeMini-1.3-FINAL-PATCH-1.3-unleashed.fap",
  "compat/README.md", "compat/windows/PotatoStrike-Windows-Legacy.cmd",
  "compat/linux/PotatoStrike-Linux-Portable.sh", "compat/linux/PotatoStrike-Linux-Server.sh",
  "compat/macos/PotatoStrike-macOS.command", "logs/.gitkeep",
]);

if (fs.existsSync("beta")) fail("Local beta folder must not exist; beta is a Git branch");
if (fs.existsSync(".github/workflows/potato-strike-1-1-beta.yml")) fail("Obsolete 1.1 compatibility workflow is still present");

const vendorSize = fs.statSync("game/vendor/three.min.js").size;
if (vendorSize < 100000 || vendorSize > 1200000) fail(`Unexpected Studio 3D vendor size: ${vendorSize} bytes`);

for (const firmware of ["official", "momentum", "unleashed"]) {
  const file = `phone/flipperzero/PotatoStrikeMini-1.3-FINAL-PATCH-1.3-${firmware}.fap`;
  const data = fs.readFileSync(file);
  if (data.subarray(0, 4).toString("hex") !== "7f454c46") fail(`Invalid FAP ELF header: ${file}`);
  if (data.length > 65536) fail(`Flipper FAP exceeds the 64 KiB patch budget: ${file}`);
}

const androidGradle = fs.readFileSync("phone/android/app/build.gradle", "utf8");
if (!androidGradle.includes("minSdk 21") || !androidGradle.includes('versionName "1.3-final-patch-1.3"')) {
  fail("Android Patch 1.3 compatibility target is invalid");
}

for (const file of ["package.json", ...jsonFiles("configs"), ...jsonFiles("mods"), ...jsonFiles("DEV-tools")]) {
  try {
    JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail(`Invalid JSON ${file}: ${error.message}`);
  }
}

for (const file of [
  "mods/examples/1.2-beta/aim-lab-bunker.json",
  "mods/examples/1.2-beta/extraction-sweep.json",
  "mods/examples/1.2-beta/micro-royale.json",
]) {
  const mod = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!mod.id || !mod.name || !mod.map || !Array.isArray(mod.map.obstacles) || !Array.isArray(mod.weapons)) {
    fail(`Invalid example mod shape: ${file}`);
  }
}

for (const key of ["type", "configId", "userMaps", "storyMissions", "customTextures", "mods", "removedDefaultMods", "settings", "serverConfig", "bindings", "nick", "playerId"]) {
  if (!(key in defaultConfig)) fail(`default config missing ${key}`);
}
if (defaultConfig.settings.hzLimit !== "vsync" || defaultConfig.settings.fastBindsEnabled !== true || !Array.isArray(defaultConfig.settings.fastBinds)) {
  fail("default config must enable V-Sync and contain Fast Binds");
}
if (defaultConfig.settings.botAimMode !== "sights") fail("default BOT RMB aiming mode must use sights");
if (defaultConfig.settings.difficulty !== 5 || defaultConfig.serverConfig.botDifficulty !== 5 || defaultConfig.serverConfig.teamDamageScale !== 0.5) {
  fail("default bot difficulty and teammate damage settings are invalid");
}
if (defaultConfig.settings.crosshairEnabled !== true || defaultConfig.settings.crosshairVersion !== 2 || defaultConfig.settings.crosshairStyle !== "dot") {
  fail("default crosshair must be the enabled fixed-dot preset");
}
if (defaultConfig.settings.gameRules !== "classic" || defaultConfig.serverConfig.aimMode !== "sights" || defaultConfig.serverConfig.enemyMinimap !== false || defaultConfig.serverConfig.svCheats !== false) {
  fail("default game rules, aiming or safe server settings are invalid");
}
const defaultFpsMod = JSON.parse(fs.readFileSync("mods/default/fps_info/mod.json", "utf8"));
if (defaultFpsMod.id !== "default.fps_info" || defaultFpsMod.category !== "default" || defaultFpsMod.enabled !== false || defaultFpsMod.builtin !== "fps_info") {
  fail("default fps_info mod manifest is invalid");
}

const singleHtml = fs.readFileSync("PotatoStrike.html", "utf8");
if (!singleHtml.includes("<style>") || !singleHtml.includes("<script>") || singleHtml.includes('src="game.js"') || singleHtml.includes('href="styles.css"')) {
  fail("PotatoStrike.html is not self-contained");
}

const freedoomManifest = JSON.parse(fs.readFileSync("game/assets/weapons/freedoom/manifest.json", "utf8"));
if (freedoomManifest.sourceVersion !== "0.13.0" || freedoomManifest.license !== "BSD-3-Clause" || freedoomManifest.sprites.length !== 9) {
  fail("FreEDoom weapon export manifest is invalid");
}
for (const sprite of freedoomManifest.sprites) {
  const png = fs.readFileSync(path.join("game/assets/weapons/freedoom", sprite.file));
  if (png.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") fail(`Invalid FreEDoom PNG: ${sprite.file}`);
}
if (!fs.readFileSync(".gitignore", "utf8").includes("texture/*.wad")) fail("Source WAD files must remain ignored");
if (!singleHtml.includes("data:image/png;base64,") || singleHtml.includes("assets/weapons/freedoom/pistol.png")) {
  fail("PotatoStrike.html must embed FreEDoom weapon PNGs");
}

requireSnippets(mainJs, [
  "config:save", "playersDir", "profile.json", "assets.json", "crashReporter", "showCrashRecoveryWindow",
  "POTATO_SAFE_OFFLINE", "PotatoStrike.html", "log:renderer", "listModManifests", 'entry.name.toLowerCase() !== "mod.json"',
], "offline runtime feature");
requireSnippets(preloadJs, ["saveConfig", "sendRendererLog", "log:renderer"], "preload bridge feature");

requireSnippets(gameJs, [
  "normalizeMap", "findSafePoint", "showFatalError", "ensureNormalBootMenu", "applyLanguage", "i18n",
  "makeBotLoadout", "botRoundBudget", "chooseAffordableWeapon", "equipmentCatalog", "dropActiveWeapon",
  "pickupDroppedWeapon", "dropPlayerLoadoutOnDeath", "knifeWeaponId", "toggleWeaponMode", "enterSpectator",
  "takeoverBot", "renderModManager", "sortedMods", "createPlayerProfile", "openStandaloneEditor",
  "normalizeGraphicsMode", "renderGameView", "camera.pitch", "updatePerspectiveLook", "requestGamePointerLock", "MAX_CAMERA_PITCH", "cycleWeapon", "drawCustomCrosshair",
  "jumpHeight", "verticalVelocity", 'crouch: "ControlLeft"', "mobileLook",
  "bundledDefaultMods", "installBundledDefaultMods", "loadNativeMods", "drawEnabledModOverlays",
  "selectedGrenade", "beginGrenadeAim", "releaseGrenadeAim", "jumpThrowQueued", "totalGrenades",
  "fastBindActionEntries", "normalizeFastBinds", "executeFastBind", "fastBindsEnabled", "ownsEquipment", "settings: { ...settings, fastBinds }", 'hzLimit: "vsync"',
  "obstacleLocalPoint", "pointInMapObstacle", "autoTextureForHit", "drawPotatoWallColumn",
  "const objectHeight = clamp(Number(wall.z || 96)", "const elevation = clamp(Number(wall.elevation || 0)",
  "editorUnitsForSide", "editorWaypointsForUnit", "spawnEditorPickups", "updateEditorTriggers",
  "runEditorTriggerExpression", "activateEditorTrigger",
  "serverConfigSnapshot", "syncLanHeartbeat", "mp_show_enemy_minimap", "writecfg", "cvarlist", "requireCheats",
  "openingMove", "botStop", "isAwpScoped", "drawAwpScope", "aimZoom", "mouse.rightDown",
  "gameRulePresets", "applyGameRulePreset", "updateRespawns", "isIronSights", "drawPotatoIronSights", "showStoryHint",
  "openLanLobby", "openLanSetup", "lanLobbyRequest", "renderLanLobby", "manageLanPlayer", "startLanLobbyMatch", "launchLanLobbyMatch", "botAimMode",
  "freedoomWeaponTextureSources", "freedoomWeaponTexture", "freedoomWeaponTextureKey", "freedoomWeaponProfiles", "freedoomWeaponVariant", "drawWeaponVariantDetail", "drawFreedoomWeaponTexture", "migrateCrosshairSettings", "crosshairEnabled",
  "drawFreedoomWeaponTexture(w, h, weapon, sway, recoilDrop, aiming)", "if (!isAimActive()) drawCrosshair();", "customEnabled: settings.crosshairCustomEnabled",
  "buyZoneForTeam", "inBuyZone", "drawBuyZones2d", "draw3dBuyZoneMarker", "zoomSensitivity", "rawMouseInput", "fieldOfView",
  "drawWeaponSilhouette2d", "normalizeBotDifficulty", "teamDamageScale", "mp_friendlyfire_damage_reduction", 'b.weaponName === "AWP"',
], "game/runtime feature");

requireSnippets(gameHtml, [
  'id="fast-bind-key"', 'id="fast-bind-action"', 'id="fast-bind-add"', 'id="fast-bind-enabled"',
  'id="fast-bind-clear"', 'id="fast-bind-count"', 'id="fast-bind-list"',
  'id="crosshair-enabled"', 'id="crosshair-reset"', 'id="crosshair-paint-canvas"',
  'id="game-rules"', 'id="server-aim-mode"', 'id="server-enemy-minimap"', 'id="server-config-file"', 'data-touch-action="aim"',
  'id="create-lan"', 'id="join-lan"', 'id="lan-lobby-panel"', 'id="lan-transfer-target"', 'id="lan-lobby-bans"', 'id="lan-lobby-add-player"', 'id="menu-aim-mode"',
  'id="server-bot-difficulty"', 'id="server-buytime"', 'id="server-team-damage"',
  'id="release-version"', 'V1.3-FINAL PATCH: 1.3',
  '<option value="vsync" selected>',
], "Fast Bind and V-Sync settings UI");

const serverJs = fs.readFileSync("server.js", "utf8");
requireSnippets(serverJs, [
  "roomOwners", "roomConfigs", "roomLobbyState", "roomBans", "roomKicks", 'url.pathname === "/api/server-config"', 'url.pathname === "/api/lobby"',
  '"access-control-allow-origin": "*"', 'req.method === "OPTIONS"',
  "Only lobby owner can update server config", "Only lobby owner can transfer command", "Only lobby owner can start match", "Only lobby owner can manage players",
], "LAN server ownership feature");

for (const obsolete of ["(h * 760) / d", "settings.quality === \"high\" ? 520 : 360"]) {
  if (gameJs.includes(obsolete)) fail(`Obsolete 3D renderer code is still present: ${obsolete}`);
}

requireSnippets(editorHtml, [
  'src="vendor/three.min.js"', 'id="studio-viewport-3d"', 'value="2d"', 'value="3d"',
  'data-editor-mode="objects"', 'data-editor-mode="groups"', 'data-editor-mode="triggers"',
  'data-editor-mode="waypoints"', 'data-editor-mode="sync"', 'data-editor-mode="markers"',
  'data-transform="select"', 'data-transform="translate"', 'data-transform="rotate"', 'data-transform="scale"',
  'id="layer-list"', 'id="add-layer"', 'id="undo-editor"', 'id="redo-editor"', 'id="story-goal-hint"',
], "Studio UI feature");

requireSnippets(editorJs, [
  "defaultEditorData", "normalizeEditorData", "version: 2", "normalizeStudioMap", "testMap", "saveMap",
  "generateMap", "importAssets", "storyGoal", "applyTerrainSettings", "renderLayers", "recordHistory",
  "undoEditor", "redoEditor", "copySelection", "pasteSelection", 'event.code === "KeyA"',
  "new THREE.WebGLRenderer", "powerPreference: \"low-power\"", "new THREE.PerspectiveCamera",
  "new THREE.Raycaster", "new THREE.CanvasTexture", "draw3dCanvasFallback", "handleStudio3dMouseDown",
  "studio3dGroundPoint", "focusStudioSelection", "setTransformMode", "setEditorMode",
  "units", "groups", "triggers", "waypoints", "markers", "systems", "pickups", "connections",
  "storyGoalHint",
], "Studio 1.2 feature");

requireSnippets(editorCss, ["#studio-viewport-3d", ".studio-viewport-toolbar", "#studio-viewport-stage", "@media"], "Studio layout feature");

const workflow = fs.readFileSync(".github/workflows/potato-strike-1-2-beta.yml", "utf8");
requireSnippets(workflow, [
  "Potato Strike 1.3 FINAL Patch 1.3 Compatibility Builds", "workflow_dispatch", "tags:", '"v*"', "concurrency:",
  "build:win:compat", "build:linux:compat", "PotatoStrike-1.3-FINAL-PATCH-1.3.apk",
  "PotatoStrikeMini-1.3-FINAL-PATCH-1.3-official.fap", "PotatoStrikeMini-1.3-FINAL-PATCH-1.3-momentum.fap",
  "PotatoStrikeMini-1.3-FINAL-PATCH-1.3-unleashed.fap", "PotatoStrike-1.3-FINAL.zip", "potato-strike-1.3-final-folder",
  "PotatoStrike-1.3-BETA-FINAL.zip", "potato-strike-1.3-beta-final-compressed",
], "1.3 compatibility workflow feature");

const pagesWorkflow = fs.readFileSync(".github/workflows/pages.yml", "utf8");
requireSnippets(pagesWorkflow, [
  "paths:", "PotatoStrike.html", "test -f PotatoStrike.html", "cp PotatoStrike.html _site/index.html",
  "PATCH-NOTES-1.3-FINAL.md", "touch _site/.nojekyll", "pages-info.html", "not the repository README",
], "GitHub Pages feature");
for (const forbidden of ["npm ci", "npm run build:single", "actions/setup-node"]) {
  if (pagesWorkflow.includes(forbidden)) fail(`Pages workflow must stay cheap and exclude: ${forbidden}`);
}

const packageScript = fs.readFileSync("scripts/package-compat.js", "utf8");
requireSnippets(packageScript, ["PotatoStrike-1.3-FINAL", "PATCH-NOTES-1.3-FINAL.md", "PotatoStrike-1.3-FINAL-PATCH-1.3.apk"], "release packager feature");
const betaPackageScript = fs.readFileSync("scripts/package-beta-final.js", "utf8");
requireSnippets(betaPackageScript, ["PotatoStrike-1.3-BETA-FINAL", "PATCH-NOTES-1.3-BETA-FINAL.md", "CompressionLevel Optimal", "mods", "game"], "compressed beta packager feature");

console.log(`Game DOM IDs OK: ${gameIdCount}`);
console.log(`Studio DOM IDs OK: ${editorIdCount}`);
console.log(`Studio 3D vendor OK: ${(vendorSize / 1024).toFixed(1)} KiB`);
console.log("Potato Strike 1.3 FINAL runtime, assets, release packages and workflows OK");

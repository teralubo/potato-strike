const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d", { alpha: false });

function showBootError(error) {
  const menu = document.getElementById("menu");
  const message = document.getElementById("message");
  if (menu) menu.classList.remove("hidden");
  if (message) {
    message.textContent = `Blad startu offline: ${error?.message || String(error || "nieznany blad")}`;
    message.classList.add("show");
  }
  window.potatoNative?.log?.("game:boot-error", error?.message || String(error || "nieznany blad"), error?.stack || "");
  console.error(error);
}

window.addEventListener("error", (event) => showBootError(event.error || event.message));
window.addEventListener("unhandledrejection", (event) => showBootError(event.reason));

const $ = (id) => document.getElementById(id);
const hud = {
  mode: $("mode-pill"),
  team: $("team-pill"),
  health: $("health"),
  armor: $("armor"),
  money: $("money"),
  buyZone: $("buy-zone-pill"),
  round: $("round"),
  score: $("score"),
  timer: $("timer"),
  bomb: $("bomb-pill"),
  missionPill: $("mission-pill"),
  storyObjectivePanel: $("story-objective-panel"),
  storyObjectiveText: $("story-objective-text"),
  weaponName: $("weapon-name"),
  ammo: $("ammo"),
  message: $("message"),
  menu: $("menu"),
  start: $("start"),
  createLan: $("create-lan"),
  joinLan: $("join-lan"),
  lanLobbyPanel: $("lan-lobby-panel"),
  lanLobbyRoom: $("lan-lobby-room"),
  lanLobbyStatus: $("lan-lobby-status"),
  lanLobbyOwner: $("lan-lobby-owner"),
  lanLobbyPlayers: $("lan-lobby-players"),
  lanLobbyBans: $("lan-lobby-bans"),
  lanAddPlayerName: $("lan-add-player-name"),
  lanAddPlayerTeam: $("lan-add-player-team"),
  lanLobbyAddPlayer: $("lan-lobby-add-player"),
  lanTransferTarget: $("lan-transfer-target"),
  lanLobbyStart: $("lan-lobby-start"),
  lanLobbyTransfer: $("lan-lobby-transfer"),
  lanLobbySettings: $("lan-lobby-settings"),
  lanLobbyRefresh: $("lan-lobby-refresh"),
  lanLobbyLeave: $("lan-lobby-leave"),
  lanBrowserPanel: $("lan-browser-panel"),
  lanBrowserAddress: $("lan-browser-address"),
  lanBrowserRefresh: $("lan-browser-refresh"),
  lanBrowserList: $("lan-browser-list"),
  lanBrowserStatus: $("lan-browser-status"),
  shopPanel: $("shop-panel"),
  shopList: $("shop-list"),
  settingsPanel: $("settings-panel"),
  bindsPanel: $("binds-panel"),
  bindList: $("bind-list"),
  teamsPanel: $("teams-panel"),
  teamList: $("team-list"),
  teamAddAlly: $("team-add-ally"),
  teamAddEnemy: $("team-add-enemy"),
  teamRemoveAlly: $("team-remove-ally"),
  teamRemoveEnemy: $("team-remove-enemy"),
  teamAddLan: $("team-add-lan"),
  teamRemoveLan: $("team-remove-lan"),
  teamBalance: $("team-balance"),
  teamDifficulty: $("team-difficulty"),
  mapgenPanel: $("mapgen-panel"),
  mapSeed: $("map-seed"),
  mapSize: $("map-size"),
  mapgenStatus: $("mapgen-status"),
  generateMap: $("generate-map"),
  editorPanel: $("editor-panel"),
  editorName: $("editor-name"),
  editorTool: $("editor-tool"),
  editorGoal: $("editor-goal"),
  editorTarget: $("editor-target"),
  editorObjectiveText: $("editor-objective-text"),
  editorGoalCode: $("editor-goal-code"),
  editorWidth: $("editor-width"),
  editorHeight: $("editor-height"),
  editorRotation: $("editor-rotation"),
  editorColor: $("editor-color"),
  editorNew: $("editor-new"),
  editorRandom: $("editor-random"),
  editorSaveMap: $("editor-save-map"),
  editorSave: $("editor-save"),
  editorLoad: $("editor-load"),
  editorExport: $("editor-export"),
  textureFile: $("texture-file"),
  textureName: $("texture-name"),
  textureImport: $("texture-import"),
  modFile: $("mod-file"),
  modMode: $("mod-mode"),
  modCode: $("mod-code"),
  modImport: $("mod-import"),
  modExport: $("mod-export"),
  assetList: $("asset-list"),
  editorProperties: $("editor-properties"),
  savedMissions: $("saved-missions"),
  consolePanel: $("console-panel"),
  commandInput: $("command-input"),
  runCommand: $("run-command"),
  commandLog: $("command-log"),
  pausePanel: $("pause-panel"),
  resumeGame: $("resume-game"),
  pauseSettings: $("pause-settings"),
  pauseMenu: $("pause-menu"),
  lanResumeMatch: $("lan-resume-match"),
  lanRestartRound: $("lan-restart-round"),
  lanRestartMatch: $("lan-restart-match"),
  lanRefereeSettings: $("lan-referee-settings"),
  lanEndMatch: $("lan-end-match"),
  lanRefereeNote: $("lan-referee-note"),
  missionsPanel: $("missions-panel"),
  missionList: $("mission-list"),
  networkPanel: $("network-panel"),
  networkStatus: $("network-status"),
  serverHostname: $("server-hostname"),
  serverHost: $("server-host"),
  serverJoin: $("server-join"),
  serverMaxplayers: $("server-maxplayers"),
  serverBotDifficulty: $("server-bot-difficulty"),
  serverFillBots: $("server-fill-bots"),
  serverBotQuota: $("server-bot-quota"),
  serverBuyTime: $("server-buytime"),
  serverFreezeTime: $("server-freezetime"),
  serverRoundTime: $("server-roundtime"),
  serverStartMoney: $("server-startmoney"),
  serverGravity: $("server-gravity"),
  serverFriendlyFire: $("server-friendly-fire"),
  serverTeamDamage: $("server-team-damage"),
  serverEnemyMinimap: $("server-enemy-minimap"),
  serverCheats: $("server-cheats"),
  serverAimMode: $("server-aim-mode"),
  serverApply: $("server-apply"),
  serverExport: $("server-export"),
  serverImport: $("server-import"),
  serverConfigFile: $("server-config-file"),
  modsPanel: $("mods-panel"),
  modManagerList: $("mod-manager-list"),
  sandboxSpawnPanel: $("sandbox-spawn-panel"),
  sandboxSpawnList: $("sandbox-spawn-list"),
  sandboxWorldPanel: $("sandbox-world-panel"),
  sandboxWorldSummary: $("sandbox-world-summary"),
  sandboxWorldExport: $("sandbox-world-export"),
  sandboxWorldImport: $("sandbox-world-import"),
  sandboxWorldSwitch: $("sandbox-world-switch"),
  hybridMapExport: $("hybrid-map-export"),
  hybridMapImport: $("hybrid-map-import"),
  hybridMapFile: $("hybrid-map-file"),
  sandboxWorldClear: $("sandbox-world-clear"),
  sandboxWorldFile: $("sandbox-world-file"),
  editorExportMap: $("editor-export-map"),
  editorImportMap: $("editor-import-map"),
  editorMapFile: $("editor-map-file"),
  sandboxWorldConfig: $("sandbox-world-config"),
  sandboxWidth: $("sandbox-width"),
  sandboxHeight: $("sandbox-height"),
  sandboxWallTexture: $("sandbox-wall-texture"),
  sandboxUnlimitedAmmo: $("sandbox-unlimited-ammo"),
  rerollMissions: $("reroll-missions"),
  graphicsMode: $("graphics-mode"),
  quality: $("quality"),
  languageSelect: $("language-select"),
  difficulty: $("difficulty"),
  resolution: $("resolution"),
  hzLimit: $("hz-limit"),
  fastBindKey: $("fast-bind-key"),
  fastBindAction: $("fast-bind-action"),
  fastBindAdd: $("fast-bind-add"),
  fastBindEnabled: $("fast-bind-enabled"),
  fastBindEnabledLabel: $("fast-bind-enabled-label"),
  fastBindCount: $("fast-bind-count"),
  fastBindClear: $("fast-bind-clear"),
  fastBindList: $("fast-bind-list"),
  crosshairStyle: $("crosshair-style"),
  crosshairEnabled: $("crosshair-enabled"),
  crosshairColor: $("crosshair-color"),
  crosshairSize: $("crosshair-size"),
  crosshairGap: $("crosshair-gap"),
  crosshairThickness: $("crosshair-thickness"),
  crosshairOutline: $("crosshair-outline"),
  crosshairPaintColor: $("crosshair-paint-color"),
  crosshairCustomEnabled: $("crosshair-custom-enabled"),
  crosshairPaintCanvas: $("crosshair-paint-canvas"),
  crosshairPaintClear: $("crosshair-paint-clear"),
  crosshairReset: $("crosshair-reset"),
  crosshairPaintExport: $("crosshair-paint-export"),
  crosshairPaintImport: $("crosshair-paint-import"),
  crosshairPaintFile: $("crosshair-paint-file"),
  configNick: $("config-nick"),
  configId: $("config-id"),
  configPlayerId: $("config-player-id"),
  playerName: $("player-name"),
  lanRoom: $("lan-room"),
  serverUrl: $("server-url"),
  exportConfig: $("export-config"),
  importConfig: $("import-config"),
  configFile: $("config-file"),
  sensitivity: $("sensitivity"),
  pitchSensitivity: $("pitch-sensitivity"),
  zoomSensitivity: $("zoom-sensitivity"),
  fieldOfView: $("field-of-view"),
  rawMouseInput: $("raw-mouse-input"),
  mouseAcceleration: $("mouse-acceleration"),
  mouseAccelerationAmount: $("mouse-acceleration-amount"),
  viewBob: $("view-bob"),
  invertY: $("invert-y"),
  screenShake: $("screen-shake"),
  soundEnabled: $("sound-enabled"),
  masterVolume: $("master-volume"),
  footstepVolume: $("footstep-volume"),
  serverAudio: $("server-audio"),
  perfLimit: $("perf-limit"),
  botCount: $("bot-count"),
  controlMode: $("control-mode"),
  showMinimap: $("show-minimap"),
  autoReload: $("auto-reload"),
  menuMode: $("menu-mode"),
  gameRules: $("game-rules"),
  profileCurrent: $("profile-current"),
  playerMenu: $("player-menu"),
  profileNick: $("profile-nick"),
  profileCreate: $("profile-create"),
  profileList: $("profile-list"),
  profileLoad: $("profile-load"),
  profileExport: $("profile-export"),
  profileImport: $("profile-import"),
  profileFile: $("profile-file"),
  openProfile: $("open-profile"),
  openMods: $("open-mods"),
  launchTarget: $("launch-target"),
  matchSize: $("match-size"),
  fillMode: $("fill-mode"),
  menuTeam: $("menu-team"),
  menuMap: $("menu-map"),
  menuGraphics: $("menu-graphics"),
  menuAimMode: $("menu-aim-mode"),
  quickEditor: $("quick-editor"),
  openSettings: $("open-settings"),
  openBinds: $("open-binds"),
  openTeams: $("open-teams"),
  openMapgen: $("open-mapgen"),
  openEditor: $("open-editor"),
  openConsole: $("open-console"),
  openNetwork: $("open-network"),
  downloadGame: $("download-game"),
  mobileControls: $("mobile-controls"),
};

const weaponCatalog = [
  { name: "Physics Gun", side: "BOTH", category: "Sandbox", price: 0, magSize: 1, reserve: 0, damage: 0, fireDelay: 80, reloadTime: 0, spread: 0, recoil: 0, bulletSpeed: 0, automatic: true, color: "#70d7e5", droppable: false, sandboxOnly: true },
  { name: "Glock-18", side: "T", category: "Pistol", price: 200, magSize: 20, reserve: 120, damage: 19, fireDelay: 95, reloadTime: 1.15, spread: 0.065, recoil: 0.042, bulletSpeed: 1040, automatic: false, color: "#bfc7c1", burstCapable: true, burstCount: 3, burstDelay: 280, fireMode: "semi" },
  { name: "USP-S", side: "CT", category: "Pistol", price: 200, magSize: 12, reserve: 60, damage: 23, fireDelay: 150, reloadTime: 1.2, spread: 0.042, recoil: 0.038, bulletSpeed: 1060, automatic: false, color: "#b7c0b6" },
  { name: "P2000", side: "CT", category: "Pistol", price: 200, magSize: 13, reserve: 52, damage: 22, fireDelay: 145, reloadTime: 1.2, spread: 0.049, recoil: 0.04, bulletSpeed: 1040, automatic: false, color: "#9fb5b2" },
  { name: "P250", side: "BOTH", category: "Pistol", price: 300, magSize: 13, reserve: 52, damage: 27, fireDelay: 150, reloadTime: 1.2, spread: 0.052, recoil: 0.05, bulletSpeed: 1060, automatic: false, color: "#aebbb5" },
  { name: "Five-SeveN", side: "CT", category: "Pistol", price: 500, magSize: 20, reserve: 100, damage: 24, fireDelay: 110, reloadTime: 1.3, spread: 0.057, recoil: 0.045, bulletSpeed: 1080, automatic: false, color: "#a7bfd1" },
  { name: "Tec-9", side: "T", category: "Pistol", price: 500, magSize: 18, reserve: 90, damage: 25, fireDelay: 88, reloadTime: 1.35, spread: 0.079, recoil: 0.054, bulletSpeed: 1050, automatic: false, color: "#c9a283" },
  { name: "CZ75-Auto", side: "BOTH", category: "Pistol", price: 500, magSize: 12, reserve: 24, damage: 23, fireDelay: 70, reloadTime: 1.45, spread: 0.095, recoil: 0.062, bulletSpeed: 1030, automatic: true, color: "#b5b2a6" },
  { name: "Dual Berettas", side: "BOTH", category: "Pistol", price: 300, magSize: 30, reserve: 120, damage: 18, fireDelay: 92, reloadTime: 1.55, spread: 0.082, recoil: 0.04, bulletSpeed: 1000, automatic: false, color: "#c0aa82" },
  { name: "Desert Eagle", side: "BOTH", category: "Pistol", price: 700, magSize: 7, reserve: 35, damage: 58, fireDelay: 230, reloadTime: 1.35, spread: 0.088, recoil: 0.13, bulletSpeed: 1240, automatic: false, color: "#d1bd83" },
  { name: "R8 Revolver", side: "BOTH", category: "Pistol", price: 600, magSize: 8, reserve: 24, damage: 64, fireDelay: 360, reloadTime: 1.75, spread: 0.11, recoil: 0.16, bulletSpeed: 1180, automatic: false, color: "#c29b6d" },
  { name: "MAC-10", side: "T", category: "SMG", price: 1050, magSize: 30, reserve: 100, damage: 20, fireDelay: 62, reloadTime: 1.45, spread: 0.12, recoil: 0.055, bulletSpeed: 960, automatic: true, color: "#c9a283" },
  { name: "MP9", side: "CT", category: "SMG", price: 1250, magSize: 30, reserve: 120, damage: 21, fireDelay: 58, reloadTime: 1.4, spread: 0.105, recoil: 0.052, bulletSpeed: 1000, automatic: true, color: "#b8c3d6" },
  { name: "MP7", side: "BOTH", category: "SMG", price: 1500, magSize: 30, reserve: 120, damage: 22, fireDelay: 66, reloadTime: 1.45, spread: 0.088, recoil: 0.052, bulletSpeed: 1040, automatic: true, color: "#9aa8b4" },
  { name: "MP5-SD", side: "BOTH", category: "SMG", price: 1500, magSize: 30, reserve: 120, damage: 21, fireDelay: 68, reloadTime: 1.45, spread: 0.078, recoil: 0.046, bulletSpeed: 990, automatic: true, color: "#8e9f9b" },
  { name: "UMP-45", side: "BOTH", category: "SMG", price: 1200, magSize: 25, reserve: 100, damage: 25, fireDelay: 90, reloadTime: 1.5, spread: 0.083, recoil: 0.065, bulletSpeed: 980, automatic: true, color: "#9aa48e" },
  { name: "P90", side: "BOTH", category: "SMG", price: 2350, magSize: 50, reserve: 100, damage: 19, fireDelay: 58, reloadTime: 1.85, spread: 0.115, recoil: 0.052, bulletSpeed: 1010, automatic: true, color: "#b9b68f" },
  { name: "PP-Bizon", side: "BOTH", category: "SMG", price: 1400, magSize: 64, reserve: 120, damage: 18, fireDelay: 70, reloadTime: 1.7, spread: 0.12, recoil: 0.043, bulletSpeed: 940, automatic: true, color: "#ada27f" },
  { name: "Galil AR", side: "T", category: "Rifle", price: 1800, magSize: 35, reserve: 90, damage: 28, fireDelay: 90, reloadTime: 1.6, spread: 0.088, recoil: 0.066, bulletSpeed: 1160, automatic: true, color: "#b08d57" },
  { name: "FAMAS", side: "CT", category: "Rifle", price: 1950, magSize: 25, reserve: 90, damage: 27, fireDelay: 82, reloadTime: 1.6, spread: 0.071, recoil: 0.058, bulletSpeed: 1180, automatic: true, color: "#8f9b78" },
  { name: "AK-47", side: "T", category: "Rifle", price: 2700, magSize: 30, reserve: 90, damage: 34, fireDelay: 102, reloadTime: 1.65, spread: 0.092, recoil: 0.078, bulletSpeed: 1220, automatic: true, color: "#c48a45" },
  { name: "M4A4", side: "CT", category: "Rifle", price: 2900, magSize: 30, reserve: 90, damage: 29, fireDelay: 92, reloadTime: 1.55, spread: 0.074, recoil: 0.061, bulletSpeed: 1260, automatic: true, color: "#8ea9b8" },
  { name: "M4A1-S", side: "CT", category: "Rifle", price: 2900, magSize: 25, reserve: 75, damage: 31, fireDelay: 105, reloadTime: 1.5, spread: 0.048, recoil: 0.045, bulletSpeed: 1230, automatic: true, color: "#a6ad9f" },
  { name: "SG 553", side: "T", category: "Rifle", price: 3000, magSize: 30, reserve: 90, damage: 32, fireDelay: 95, reloadTime: 1.7, spread: 0.066, recoil: 0.068, bulletSpeed: 1240, automatic: true, color: "#a98554" },
  { name: "AUG", side: "CT", category: "Rifle", price: 3300, magSize: 30, reserve: 90, damage: 30, fireDelay: 95, reloadTime: 1.7, spread: 0.058, recoil: 0.06, bulletSpeed: 1250, automatic: true, color: "#8aa0a3" },
  { name: "SSG 08", side: "BOTH", category: "Sniper", price: 1700, magSize: 10, reserve: 60, damage: 74, fireDelay: 760, reloadTime: 1.8, spread: 0.025, recoil: 0.16, bulletSpeed: 1520, automatic: false, color: "#99a277" },
  { name: "AWP", side: "BOTH", category: "Sniper", price: 4750, magSize: 5, reserve: 30, damage: 115, fireDelay: 1180, reloadTime: 2.2, spread: 0.018, recoil: 0.22, bulletSpeed: 1680, automatic: false, color: "#6f8c63" },
  { name: "G3SG1", side: "T", category: "Sniper", price: 5000, magSize: 20, reserve: 90, damage: 80, fireDelay: 260, reloadTime: 2.2, spread: 0.045, recoil: 0.13, bulletSpeed: 1480, automatic: true, color: "#a28d59" },
  { name: "SCAR-20", side: "CT", category: "Sniper", price: 5000, magSize: 20, reserve: 90, damage: 80, fireDelay: 260, reloadTime: 2.2, spread: 0.043, recoil: 0.13, bulletSpeed: 1480, automatic: true, color: "#8296a0" },
  { name: "Nova", side: "BOTH", category: "Heavy", price: 1050, magSize: 8, reserve: 32, damage: 16, pellets: 7, fireDelay: 880, reloadTime: 1.9, spread: 0.24, recoil: 0.11, bulletSpeed: 900, automatic: false, color: "#b7a274" },
  { name: "XM1014", side: "BOTH", category: "Heavy", price: 2000, magSize: 7, reserve: 32, damage: 13, pellets: 7, fireDelay: 350, reloadTime: 1.9, spread: 0.22, recoil: 0.1, bulletSpeed: 900, automatic: true, color: "#b08f75" },
  { name: "MAG-7", side: "CT", category: "Heavy", price: 1300, magSize: 5, reserve: 32, damage: 18, pellets: 7, fireDelay: 820, reloadTime: 1.8, spread: 0.25, recoil: 0.12, bulletSpeed: 890, automatic: false, color: "#8f9b84" },
  { name: "Sawed-Off", side: "T", category: "Heavy", price: 1100, magSize: 7, reserve: 32, damage: 17, pellets: 7, fireDelay: 820, reloadTime: 1.8, spread: 0.29, recoil: 0.12, bulletSpeed: 870, automatic: false, color: "#a77e55" },
  { name: "M249", side: "BOTH", category: "Heavy", price: 5200, magSize: 100, reserve: 200, damage: 28, fireDelay: 86, reloadTime: 2.9, spread: 0.13, recoil: 0.088, bulletSpeed: 1120, automatic: true, color: "#8b9a78" },
  { name: "Negev", side: "BOTH", category: "Heavy", price: 1700, magSize: 150, reserve: 200, damage: 24, fireDelay: 70, reloadTime: 3.0, spread: 0.16, recoil: 0.092, bulletSpeed: 1080, automatic: true, color: "#a19570" },
  { name: "Knife", side: "BOTH", category: "Melee", price: 0, magSize: 1, reserve: 0, damage: 55, fireDelay: 440, reloadTime: 0, spread: 0, recoil: 0.025, bulletSpeed: 0, automatic: false, color: "#d8d5bf", melee: true, droppable: false },
];

const grenadeCatalog = [
  { name: "HE Grenade", key: "he", side: "BOTH", price: 300, color: "#d56b4f" },
  { name: "Flashbang", key: "flash", side: "BOTH", price: 200, color: "#e7ddaa" },
  { name: "Smoke", key: "smoke", side: "BOTH", price: 300, color: "#b7b7ad" },
  { name: "Molotov", key: "fire", side: "T", price: 400, color: "#de8746" },
  { name: "Incendiary", key: "fire", side: "CT", price: 500, color: "#de8746" },
  { name: "Decoy", key: "decoy", side: "BOTH", price: 50, color: "#8ab2d4" },
];

const bundledDefaultMods = [
  {
    id: "default.fps_info",
    name: "fps_info",
    category: "default",
    version: "1.0.0",
    description: "Maly licznik FPS w lewym gornym rogu.",
    builtin: "fps_info",
    enabled: false,
    priority: 20,
    bundled: true,
  },
];

const equipmentCatalog = [
  { name: "Kevlar Vest", side: "BOTH", price: 650, key: "armor", value: 100, color: "#9aa48e" },
  { name: "Kevlar + Helmet", side: "BOTH", price: 1000, key: "helmet", value: 100, color: "#b8c3d6" },
  { name: "Defuse Kit", side: "CT", price: 400, key: "defuseKit", value: true, color: "#d7bd62" },
  { name: "Zeus x27", side: "BOTH", price: 200, key: "zeus", value: true, color: "#8ab2d4" },
];

const maps = {
  dustyard: {
    name: "Dustyard",
    w: 2200,
    h: 1480,
    tSpawn: { x: 260, y: 1180 },
    ctSpawn: { x: 1900, y: 260 },
    sites: { A: { x: 1640, y: 1050, r: 115 }, B: { x: 760, y: 270, r: 110 } },
    obstacles: [
      { x: 250, y: 220, w: 270, h: 90 }, { x: 690, y: 150, w: 120, h: 360 }, { x: 1010, y: 270, w: 380, h: 90 },
      { x: 1550, y: 140, w: 130, h: 340 }, { x: 320, y: 650, w: 430, h: 120 }, { x: 900, y: 630, w: 220, h: 230 },
      { x: 1320, y: 670, w: 420, h: 90 }, { x: 210, y: 1020, w: 250, h: 90 }, { x: 710, y: 1030, w: 430, h: 110 },
      { x: 1370, y: 1020, w: 110, h: 270 }, { x: 1660, y: 1130, w: 310, h: 100 },
    ],
  },
  officepark: {
    name: "Officepark",
    w: 2000,
    h: 1340,
    tSpawn: { x: 250, y: 230 },
    ctSpawn: { x: 1710, y: 1090 },
    sites: { A: { x: 1450, y: 260, r: 105 }, B: { x: 560, y: 960, r: 105 } },
    obstacles: [
      { x: 430, y: 120, w: 130, h: 420 }, { x: 760, y: 240, w: 430, h: 100 }, { x: 1360, y: 470, w: 130, h: 390 },
      { x: 160, y: 710, w: 360, h: 110 }, { x: 690, y: 760, w: 160, h: 360 }, { x: 1000, y: 910, w: 430, h: 110 },
      { x: 1580, y: 910, w: 190, h: 100 }, { x: 1190, y: 90, w: 120, h: 270 },
    ],
  },
  cachebox: {
    name: "Cachebox",
    w: 2180,
    h: 1380,
    tSpawn: { x: 250, y: 690 },
    ctSpawn: { x: 1900, y: 690 },
    sites: { A: { x: 1530, y: 1030, r: 115 }, B: { x: 1500, y: 330, r: 115 } },
    obstacles: [
      { x: 390, y: 250, w: 250, h: 90 }, { x: 390, y: 1000, w: 250, h: 90 }, { x: 760, y: 140, w: 120, h: 380 },
      { x: 760, y: 850, w: 120, h: 380 }, { x: 1040, y: 560, w: 300, h: 210 }, { x: 1430, y: 160, w: 100, h: 310 },
      { x: 1430, y: 910, w: 100, h: 310 }, { x: 1690, y: 560, w: 250, h: 120 },
    ],
  },
  custom: {
    name: "Custom Mission",
    w: 2100,
    h: 1420,
    tSpawn: { x: 260, y: 1190 },
    ctSpawn: { x: 1840, y: 220 },
    sites: { A: { x: 480, y: 450, r: 110 }, B: { x: 1620, y: 1020, r: 110 } },
    obstacles: [
      { x: 330, y: 220, w: 430, h: 80 }, { x: 920, y: 170, w: 120, h: 400 }, { x: 1240, y: 300, w: 420, h: 90 },
      { x: 240, y: 730, w: 360, h: 110 }, { x: 780, y: 760, w: 500, h: 90 }, { x: 1480, y: 650, w: 150, h: 330 },
      { x: 360, y: 1110, w: 450, h: 90 }, { x: 1020, y: 1080, w: 150, h: 260 }, { x: 1500, y: 1180, w: 400, h: 80 },
    ],
  },
};

function makeClassicMap(name, w, h, variant) {
  const base = [
    { x: w * 0.18, y: h * 0.18, w: w * 0.16, h: 82 },
    { x: w * 0.42, y: h * 0.12, w: 110, h: h * 0.32 },
    { x: w * 0.58, y: h * 0.22, w: w * 0.18, h: 90 },
    { x: w * 0.22, y: h * 0.55, w: w * 0.24, h: 105 },
    { x: w * 0.5, y: h * 0.53, w: 130, h: h * 0.25 },
    { x: w * 0.7, y: h * 0.64, w: w * 0.18, h: 90 },
  ];
  const extras = Array.from({ length: 5 + variant }, (_, i) => ({
    x: 180 + ((i * 271 + variant * 97) % Math.floor(w - 420)),
    y: 150 + ((i * 193 + variant * 131) % Math.floor(h - 360)),
    w: 80 + ((i + variant) % 4) * 42,
    h: 64 + ((i * 2 + variant) % 3) * 48,
    type: i % 2 ? "crate" : "cover",
    color: i % 2 ? "#7d6648" : "#61715f",
  }));
  return {
    name,
    w,
    h,
    tSpawn: { x: 170 + variant * 8, y: h - 170 },
    ctSpawn: { x: w - 170, y: 170 + variant * 6 },
    sites: {
      A: { x: Math.floor(w * 0.74), y: Math.floor(h * 0.72), r: 112 },
      B: { x: Math.floor(w * 0.3), y: Math.floor(h * 0.25), r: 108 },
    },
    obstacles: [...base, ...extras].map((o) => ({ type: "wall", color: "#56614d", ...o })),
  };
}

Object.assign(maps, {
  dust2: makeClassicMap("Dust II style", 2250, 1500, 1),
  mirage: makeClassicMap("Mirage style", 2180, 1460, 2),
  inferno: makeClassicMap("Inferno style", 2050, 1580, 3),
  nuke: makeClassicMap("Nuke style", 1980, 1380, 4),
  overpass: makeClassicMap("Overpass style", 2300, 1520, 5),
  vertigo: makeClassicMap("Vertigo style", 1900, 1320, 6),
  ancient: makeClassicMap("Ancient style", 2180, 1540, 7),
  anubis: makeClassicMap("Anubis style", 2240, 1480, 8),
  train: makeClassicMap("Train style", 2360, 1420, 9),
  cache: makeClassicMap("Cache style", 2150, 1400, 10),
  office: makeClassicMap("Office hostage style", 1950, 1280, 11),
  italy: makeClassicMap("Italy hostage style", 2020, 1360, 12),
  tuscan: makeClassicMap("Tuscan classic style", 2160, 1440, 13),
  cobblestone: makeClassicMap("Cobblestone style", 2320, 1600, 14),
  assault: makeClassicMap("Assault classic style", 1880, 1280, 15),
});

const campaignTemplates = [
  { title: "Condition Zero I", text: "Wygraj 2 rundy na dowolnej mapie", type: "roundWins", target: 2, reward: 900 },
  { title: "Pistol discipline", text: "Zdobadz 5 fragow pistolami", type: "category", category: "Pistol", target: 5, reward: 1000 },
  { title: "Bomb carrier", text: "Podloz bombe 2 razy jako T", type: "plants", target: 2, reward: 1200 },
  { title: "Retake drill", text: "Rozbroj bombe albo wygraj 2 rundy jako CT", type: "ctRounds", target: 2, reward: 1400 },
  { title: "Rifle license", text: "Zdobadz 8 fragow karabinami", type: "category", category: "Rifle", target: 8, reward: 1800 },
  { title: "Map control", text: "Wygraj runde na kazdej mapie", type: "mapWins", target: 3, reward: 2400 },
];

const state = {
  running: false,
  overlayOpen: false,
  gameMode: "offline",
  lobbyOwnerId: "",
  team: "T",
  enemyTeam: "CT",
  mapKey: "dustyard",
  map: maps.dustyard,
  round: 1,
  half: 1,
  score: { T: 0, CT: 0 },
  roundTime: 115,
  freezeTime: 5,
  buyTime: 20,
  phase: "freeze",
  paused: false,
  winner: "",
  bomb: { status: "carried", carrier: "player", x: 0, y: 0, site: "", timer: 40, defuse: 0 },
  activeSpecial: "",
  grenadePrime: null,
  storyMission: null,
  storyComplete: false,
  campaignIndex: 0,
  randomMissions: [],
  spectator: { active: false, index: 0, target: null, takeoverLatch: false },
  ruleMode: "classic",
  fragScore: { player: 0, enemy: 0 },
  frameSkip: 0,
  triggerPoll: 0,
  triggerStates: {},
  sandboxCategory: "objects",
};

const sandbox = {
  version: 1,
  unitsPerMeter: 32,
  widthMeters: 40,
  heightMeters: 30,
  wallTexture: "white",
  heldObjectId: "",
  holdDistance: 180,
};

const settings = {
  graphicsMode: "2d",
  quality: "medium",
  difficulty: 5,
  resolution: "auto",
  hzLimit: "vsync",
  crosshairEnabled: true,
  crosshairVersion: 2,
  crosshairStyle: "dot",
  crosshairColor: "#f2f0df",
  crosshairSize: 1,
  crosshairGap: 10,
  crosshairThickness: 2,
  crosshairOutline: true,
  crosshairCustomEnabled: false,
  crosshairPaintColor: "#f2f0df",
  customCrosshair: [],
  language: "pl",
  configId: "",
  nick: "Potato",
  playerId: "",
  sensitivity: 1,
  pitchSensitivity: 1,
  zoomSensitivity: 0.68,
  fieldOfView: 90,
  rawMouseInput: true,
  mouseAcceleration: false,
  mouseAccelerationAmount: 0.25,
  viewBob: 0.65,
  invertY: false,
  screenShake: 0.8,
  soundEnabled: true,
  masterVolume: 0.75,
  footstepVolume: 0.55,
  serverAudio: true,
  perfLimit: "balanced",
  botCount: 10,
  matchSize: 5,
  fillMode: "bots",
  gameRules: "classic",
  botAimMode: "sights",
  controlMode: "keyboard",
  showMinimap: true,
  autoReload: true,
  fastBindsEnabled: true,
  fastBinds: [],
  sandboxWidth: 40,
  sandboxHeight: 30,
  sandboxWallTexture: "white",
  sandboxUnlimitedAmmo: false,
};

const serverSettings = {
  version: 1,
  hostname: "Potato LAN",
  svLan: true,
  svCheats: false,
  enemyMinimap: false,
  maxPlayers: 10,
  freezeTime: 5,
  roundTime: 115,
  buyTime: 20,
  startMoney: 800,
  botQuota: 5,
  fillTeamsWithBots: true,
  botDifficulty: 5,
  botStop: false,
  gravity: 720,
  friendlyFire: false,
  teamDamageScale: 0.5,
  aimMode: "sights",
  gameRules: "classic",
};

const networkSync = { lastHeartbeat: 0, ownerId: "", connected: false };
const lobbySession = {
  active: false,
  hosting: false,
  room: "",
  players: [],
  bans: [],
  status: "waiting",
  startedAt: 0,
  lastPoll: 0,
  launching: false,
};

const gameRulePresets = {
  classic: { label: "Classic", matchSize: 0, roundTime: 115, freezeTime: 5, buyTime: 20, maxRounds: 32, respawn: false, bomb: true, friendlyFire: true },
  competitive: { label: "Competitive 5v5", matchSize: 5, roundTime: 115, freezeTime: 5, buyTime: 20, maxRounds: 24, respawn: false, bomb: true, friendlyFire: true },
  wingman: { label: "Wingman 2v2", matchSize: 2, roundTime: 90, freezeTime: 4, buyTime: 20, maxRounds: 16, respawn: false, bomb: true, friendlyFire: true },
  retake: { label: "Retake", matchSize: 4, roundTime: 40, freezeTime: 3, buyTime: 0, maxRounds: 12, respawn: false, bomb: true, planted: true },
  deathmatch: { label: "Deathmatch", matchSize: 5, roundTime: 300, freezeTime: 1, buyTime: 300, maxRounds: 1, respawn: true, fragLimit: 30, bomb: false },
  casual: { label: "Casual 10v10", matchSize: 10, roundTime: 135, freezeTime: 5, buyTime: 30, maxRounds: 16, respawn: false, bomb: true, friendlyFire: false },
  training: { label: "Training 1v1", matchSize: 1, roundTime: 300, freezeTime: 1, buyTime: 300, maxRounds: 1, respawn: true, fragLimit: 15, bomb: false },
};

function activeGameRules() {
  return gameRulePresets[state.ruleMode] || gameRulePresets.classic;
}

function isRespawnMode() {
  return isSandboxMode() || Boolean(activeGameRules().respawn);
}

function applyGameRulePreset(mode, updateMenu = true) {
  const key = gameRulePresets[mode] ? mode : "classic";
  const preset = gameRulePresets[key];
  state.ruleMode = key;
  settings.gameRules = key;
  if (updateMenu) hud.gameRules.value = key;
  if (preset.matchSize) {
    settings.matchSize = preset.matchSize;
    hud.matchSize.value = String(preset.matchSize);
    hud.botCount.value = String(preset.matchSize * 2);
  }
  hud.matchSize.disabled = Boolean(preset.matchSize);
  return preset;
}

const simple3dTextures = {
  white: { base: "#d8d8ce", side: "#aeb2a8", seam: "rgba(34,38,33,0.32)", mark: "rgba(255,255,255,0.22)", mode: "panel", footstep: "concrete" },
  concrete: { base: "#aeb4aa", side: "#7f8980", seam: "rgba(39,45,40,0.34)", mark: "rgba(255,255,255,0.14)", mode: "speckle", footstep: "concrete" },
  brick: { base: "#b77e61", side: "#764a3c", seam: "rgba(54,29,24,0.42)", mark: "rgba(255,235,210,0.13)", mode: "brick", footstep: "stone" },
  crate: { base: "#9a6b3f", side: "#5e3e27", seam: "rgba(43,25,14,0.46)", mark: "rgba(255,224,167,0.14)", mode: "crate", footstep: "wood" },
  metal: { base: "#88999f", side: "#52656d", seam: "rgba(17,29,33,0.4)", mark: "rgba(255,255,255,0.2)", mode: "metal", footstep: "metal" },
  glass: { base: "#80b1bd", side: "#437884", seam: "rgba(25,55,64,0.38)", mark: "rgba(255,255,255,0.32)", mode: "glass", footstep: "glass" },
  hazard: { base: "#f0d06e", side: "#88622e", seam: "rgba(42,31,18,0.38)", mark: "rgba(20,20,15,0.3)", mode: "hazard", footstep: "metal" },
  bluewall: { base: "#86a9bd", side: "#526f82", seam: "rgba(17,31,43,0.36)", mark: "rgba(255,255,255,0.18)", mode: "panel", footstep: "concrete" },
  redpanel: { base: "#b67c70", side: "#744741", seam: "rgba(55,22,20,0.36)", mark: "rgba(255,238,230,0.14)", mode: "panel", footstep: "concrete" },
  greenpanel: { base: "#8fa27a", side: "#536648", seam: "rgba(25,42,22,0.34)", mark: "rgba(255,255,235,0.14)", mode: "panel", footstep: "concrete" },
  tile: { base: "#c2c0b5", side: "#89887f", seam: "rgba(34,34,31,0.38)", mark: "rgba(255,255,255,0.2)", mode: "tile", footstep: "stone" },
  asphalt: { base: "#9fa49c", side: "#626c65", seam: "rgba(17,20,18,0.34)", mark: "rgba(255,255,255,0.16)", mode: "speckle", footstep: "stone" },
  camo: { base: "#bbc6a0", side: "#667453", seam: "rgba(38,49,28,0.28)", mark: "rgba(237,245,205,0.18)", mode: "camo", footstep: "dirt" },
  stripe: { base: "#e1c981", side: "#816b43", seam: "rgba(28,24,16,0.35)", mark: "rgba(255,255,230,0.2)", mode: "stripe", footstep: "metal" },
  terrain: { base: "#3d4b39", side: "#222b23", seam: "rgba(242,240,223,0.1)", mark: "rgba(255,255,255,0.07)", mode: "terrain", footstep: "dirt" },
};

const bindings = {
  forward: "KeyW",
  back: "KeyS",
  left: "KeyA",
  right: "KeyD",
  use: "KeyE",
  reload: "KeyR",
  shop: "KeyB",
  settings: "KeyO",
  missions: "KeyM",
  binds: "KeyI",
  teams: "KeyT",
  network: "KeyN",
  grenade: "KeyH",
  drop: "KeyG",
  dash: "Space",
  crouch: "ControlLeft",
  pause: "KeyP",
  console: "Backquote",
  hint: "KeyJ",
  spectatorNext: "ArrowRight",
  spectatorPrev: "ArrowLeft",
};

const actionLabels = {
  forward: "Ruch do przodu",
  back: "Ruch do tylu",
  left: "Ruch w lewo",
  right: "Ruch w prawo",
  use: "Uzyj / bomba / przejmij bota",
  reload: "Przeladuj",
  shop: "Sklep",
  settings: "Ustawienia",
  missions: "Misje",
  binds: "Bindy",
  teams: "Druzyny",
  network: "LAN / online",
  grenade: "Wybierz granat",
  drop: "Wyrzuc bron",
  dash: "Skok 3D / dash 2D",
  crouch: "Kucanie 3D",
  pause: "Pauza",
  console: "Komendy lobby",
  hint: "Podpowiedz fabularna",
  spectatorNext: "Spectator nastepny",
  spectatorPrev: "Spectator poprzedni",
};

const i18n = {
  pl: {
    close: "Zamknij",
    play: "Graj",
    createLan: "Utworz serwer LAN",
    sandboxMode: "Sandbox",
    sandboxSpawnTitle: "Tworzenie sandbox",
    sandboxWorldTitle: "Swiat sandbox",
    sandboxExport: "Eksportuj swiat",
    sandboxImport: "Importuj swiat",
    sandboxClear: "Wyczysc utworzone elementy",
    sandboxHoldQ: "przytrzymaj Q",
    sandboxUnderP: "menu pod P",
    sandboxObjects: "Obiekty",
    sandboxWeapons: "Bronie",
    sandboxWidth: "Szerokosc swiata (metry)",
    sandboxHeight: "Dlugosc swiata (metry)",
    sandboxWall: "Material scian",
    sandboxSpawnHelp: "Kliknij element, aby utworzyc go przed graczem. Physics Gun przenosi obiekty lewym przyciskiem myszy.",
    sandboxWorldHelp: "Eksport zapisuje rozmiar, sciany, obiekty, NPC i bronie z aktualnego swiata.",
    joinLan: "DOLACZ LAN",
    lanServers: "Serwery LAN",
    lanNetwork: "siec lokalna",
    lanHostAddress: "Adres komputera hosta",
    lanRefreshList: "Odswiez liste",
    lanBrowserHelp: "Wybierz serwer z listy. Nie musisz przepisywac nazwy pokoju.",
    lanAddPlayer: "Dodaj gracza",
    lanAddPlayerLabel: "Dodaj gracza lokalnego",
    lanPlayerTeam: "Druzyna gracza",
    lanBans: "Zbanowani gracze",
    lobbyTitle: "Poczekalnia LAN",
    lobbyLeave: "Opusc lobby",
    lobbyStart: "Rozpocznij mecz",
    lobbyTransfer: "Przekaz dowodce",
    lobbySettings: "Ustawienia serwera",
    lobbyRefresh: "Odswiez",
    lobbyRoom: "Pokoj",
    lobbyStatus: "Status",
    lobbyOwner: "Dowodca",
    lobbyAimLabel: "Celowanie PPM (BOTY)",
    lobbyTransferLabel: "Przekaz dowodzenie",
    lobbyKicker: "serwer lokalny",
    lobbyNote: "Dowodca ustawia serwer i rozpoczyna mecz, gdy gracze sa gotowi.",
    profile: "Profil",
    mods: "Mody",
    settings: "Ustawienia",
    binds: "Bindy",
    teams: "Druzyny",
    mapgen: "Generator map",
    storyEditor: "Edytor fabuly",
    commands: "Komendy",
    network: "Online/LAN",
    download: "Pobierz lokalnie",
    shop: "Sklep",
    shopTitle: "Bronie i ekwipunek",
    settingsTitle: "Ustawienia gry",
    missionsTitle: "Misje rundy",
    teamsTitle: "Druzyny",
    bindsTitle: "Bindy",
    mapgenTitle: "Generator map",
    modsTitle: "Mody",
    profileTitle: "profil gracza",
    menuLead: "CS-like dla slabych komputerow: misje, boty, bomba, sklep stron, 2D albo lekkie 3D. Pod I sa bindy, ktore mozna zobaczyc i zmienic.",
    controlsHelp: "WASD ruch / mysz / Spacja skok 3D lub dash 2D / Ctrl kucanie 3D / E uzyj-podloz-rozbroj-podnies bron / G drop broni / H granat / J podpowiedz fabularna / R reload / B sklep / PPM wg serwera / I bindy / 1-0 ekwipunek",
    languageLabel: "Jezyk / Language",
    graphicsLabel: "Tryb grafiki",
    qualityLabel: "Jakosc",
    botDifficultyLabel: "Poziom botow",
    resolutionLabel: "Rozdzielczosc",
    hzLabel: "Hz / FPS cap",
    fastBindTitle: "Fast Bind",
    fastBindHelp: "Przypisz dowolna liczbe szybkich zakupow lub akcji. Wiele wpisow moze korzystac z tego samego klawisza; zakupy nadal respektuja zasady sklepu.",
    fastBindSetKey: "Ustaw klawisz",
    fastBindAdd: "Dodaj",
    fastBindRemove: "Usun",
    fastBindEnabled: "Fast Bind wlaczone",
    fastBindEntryEnabled: "Aktywny",
    fastBindClear: "Usun wszystkie",
    fastBindCount: "Wpisy: {count}",
    fastBindEmpty: "Brak Fast Bind. Ustaw klawisz i wybierz akcje.",
    fastBindPress: "Nacisnij klawisz...",
    fastBindBuyWeapons: "Kup bron",
    fastBindBuyGrenades: "Kup granat",
    fastBindBuyGear: "Kup ekwipunek",
    fastBindActions: "Akcje gry",
    fastBindActionAria: "Akcja Fast Bind",
    crosshairLabel: "Celownik",
    crosshairEnabledLabel: "Pokaz celownik",
    crosshairColorLabel: "Kolor celownika",
    crosshairSizeLabel: "Rozmiar celownika",
    crosshairGapLabel: "Przerwa celownika",
    crosshairThicknessLabel: "Grubosc celownika",
    crosshairOutlineLabel: "Outline celownika",
    crosshairPaintLabel: "Mini-paint celownika",
    crosshairCustomLabel: "Uzyj narysowanego celownika",
    crosshairReset: "Reset: punkt",
    sensitivityLabel: "Czuleosc myszy",
    pitchSensitivityLabel: "Kamera gora/dol",
    zoomSensitivityLabel: "Czuleosc ADS / lunety",
    fieldOfViewLabel: "Pole widzenia 3D",
    rawMouseLabel: "Raw mouse input",
    mouseAccelerationLabel: "Akceleracja myszy",
    mouseAccelerationAmountLabel: "Sila akceleracji",
    viewBobLabel: "Ruch modelu broni",
    invertYLabel: "Odwroc mysz Y",
    nickLabel: "Nick gracza",
    configIdLabel: "ID configu",
    playerIdLabel: "ID gracza",
    shakeLabel: "Screen shake",
    soundLabel: "Dzwieki gry",
    volumeLabel: "Glosnosc",
    footstepsLabel: "Kroki",
    serverAudioLabel: "Audio eventy przez serwer LAN",
    perfLabel: "Limit CPU/GPU",
    botCountLabel: "Liczba botow",
    controlsLabel: "Sterowanie",
    minimapLabel: "Minimap",
    autoReloadLabel: "Auto reload przy pustym magazynku",
    exportConfig: "Pobierz config",
    importConfig: "Wgraj config",
    bindHelp: "Pod klawiszem I mozesz zobaczyc i zmienic bindy. Kliknij akcje, potem nacisnij nowy klawisz.",
    rerollMissions: "Wygeneruj nowe misje ($300)",
    owned: "Posiadane",
    equip: "Wyposaz",
    buy: "Kup",
    grenade: "Granat",
    throwKey: "ekwipunek 1-0 / LPM",
    you: "TY",
    pressKey: "Nacisnij klawisz...",
    missionsPill: "MISJE",
    armor: "ARMOR",
    bomb: "BOMBA",
    languageChanged: "Jezyk: polski",
    profileNewPlaceholder: "Nick nowego profilu",
    newProfile: "Nowy profil",
    load: "Wczytaj",
    exportProfile: "Export profilu",
    importProfile: "Import profilu",
    modeLabel: "Tryb",
    gameRulesLabel: "Tryb gry",
    versionLabel: "Wersja",
    matchSizeLabel: "Rozmiar meczu",
    fillLabel: "Uzupelnienie",
    startSideLabel: "Strona startowa",
    mapLabel: "Mapa",
    menuGraphicsLabel: "Grafika",
  },
  en: {
    close: "Close",
    play: "Play",
    createLan: "Create LAN server",
    sandboxMode: "Sandbox",
    sandboxSpawnTitle: "Sandbox spawn menu",
    sandboxWorldTitle: "Sandbox world",
    sandboxExport: "Export world",
    sandboxImport: "Import world",
    sandboxClear: "Clear spawned items",
    sandboxHoldQ: "hold Q",
    sandboxUnderP: "menu under P",
    sandboxObjects: "Objects",
    sandboxWeapons: "Weapons",
    sandboxWidth: "World width (meters)",
    sandboxHeight: "World length (meters)",
    sandboxWall: "Wall material",
    sandboxSpawnHelp: "Click an item to spawn it in front of the player. Hold the left mouse button with the Physics Gun to move objects.",
    sandboxWorldHelp: "Export saves the size, walls, objects, NPCs and weapons in the current world.",
    joinLan: "JOIN LAN",
    lanServers: "LAN servers",
    lanNetwork: "local network",
    lanHostAddress: "Host computer address",
    lanRefreshList: "Refresh list",
    lanBrowserHelp: "Choose a server from the list. The room is selected automatically.",
    lanAddPlayer: "Add player",
    lanAddPlayerLabel: "Add local player",
    lanPlayerTeam: "Player team",
    lanBans: "Banned players",
    lobbyTitle: "LAN waiting room",
    lobbyLeave: "Leave lobby",
    lobbyStart: "Start match",
    lobbyTransfer: "Transfer commander",
    lobbySettings: "Server settings",
    lobbyRefresh: "Refresh",
    lobbyRoom: "Room",
    lobbyStatus: "Status",
    lobbyOwner: "Commander",
    lobbyAimLabel: "RMB aiming (BOTS)",
    lobbyTransferLabel: "Transfer command",
    lobbyKicker: "local server",
    lobbyNote: "The commander configures the server and starts once players are ready.",
    profile: "Profile",
    mods: "Mods",
    settings: "Settings",
    binds: "Binds",
    teams: "Teams",
    mapgen: "Map generator",
    storyEditor: "Story editor",
    commands: "Commands",
    network: "Online/LAN",
    download: "Download local",
    shop: "Shop",
    shopTitle: "Weapons and gear",
    settingsTitle: "Game settings",
    missionsTitle: "Round missions",
    teamsTitle: "Teams",
    bindsTitle: "Binds",
    mapgenTitle: "Map generator",
    modsTitle: "Mods",
    profileTitle: "player profile",
    menuLead: "CS-like for weak computers: missions, bots, bomb mode, side shop, 2D or light 3D. Press I to view and change binds.",
    controlsHelp: "WASD movement / mouse / Space jump or 2D dash / Ctrl crouch / E use / G drop / H grenade / J story hint / R reload / B shop / server-defined RMB / I binds / 1-0 inventory",
    languageLabel: "Language / Jezyk",
    graphicsLabel: "Graphics mode",
    qualityLabel: "Quality",
    botDifficultyLabel: "Bot difficulty",
    resolutionLabel: "Resolution",
    hzLabel: "Hz / FPS cap",
    fastBindTitle: "Fast Bind",
    fastBindHelp: "Assign any number of quick purchases or actions. Multiple entries may use the same key; purchases still follow shop rules.",
    fastBindSetKey: "Set key",
    fastBindAdd: "Add",
    fastBindRemove: "Remove",
    fastBindEnabled: "Fast Bind enabled",
    fastBindEntryEnabled: "Enabled",
    fastBindClear: "Remove all",
    fastBindCount: "Entries: {count}",
    fastBindEmpty: "No Fast Binds. Set a key and choose an action.",
    fastBindPress: "Press a key...",
    fastBindBuyWeapons: "Buy weapon",
    fastBindBuyGrenades: "Buy grenade",
    fastBindBuyGear: "Buy gear",
    fastBindActions: "Game actions",
    fastBindActionAria: "Fast Bind action",
    crosshairLabel: "Crosshair",
    crosshairEnabledLabel: "Show crosshair",
    crosshairColorLabel: "Crosshair color",
    crosshairSizeLabel: "Crosshair size",
    crosshairGapLabel: "Crosshair gap",
    crosshairThicknessLabel: "Crosshair thickness",
    crosshairOutlineLabel: "Crosshair outline",
    crosshairPaintLabel: "Crosshair mini-paint",
    crosshairCustomLabel: "Use painted crosshair",
    crosshairReset: "Reset: dot",
    sensitivityLabel: "Mouse sensitivity",
    pitchSensitivityLabel: "Vertical sensitivity",
    zoomSensitivityLabel: "ADS / scope sensitivity",
    fieldOfViewLabel: "3D field of view",
    rawMouseLabel: "Raw mouse input",
    mouseAccelerationLabel: "Mouse acceleration",
    mouseAccelerationAmountLabel: "Acceleration amount",
    viewBobLabel: "Weapon view movement",
    invertYLabel: "Invert mouse Y",
    nickLabel: "Player nick",
    configIdLabel: "Config ID",
    playerIdLabel: "Player ID",
    shakeLabel: "Screen shake",
    soundLabel: "Game sounds",
    volumeLabel: "Volume",
    footstepsLabel: "Footsteps",
    serverAudioLabel: "LAN server audio events",
    perfLabel: "CPU/GPU limit",
    botCountLabel: "Bot count",
    controlsLabel: "Controls",
    minimapLabel: "Minimap",
    autoReloadLabel: "Auto reload on empty magazine",
    exportConfig: "Download config",
    importConfig: "Import config",
    bindHelp: "Press I to view and change binds. Click an action, then press a new key.",
    rerollMissions: "Generate new missions ($300)",
    owned: "Owned",
    equip: "Equip",
    buy: "Buy",
    grenade: "Select grenade",
    drop: "Drop weapon",
    throwKey: "inventory 1-0 / LMB",
    you: "YOU",
    pressKey: "Press a key...",
    missionsPill: "MISSIONS",
    armor: "ARMOR",
    bomb: "BOMB",
    languageChanged: "Language: English",
    profileNewPlaceholder: "New profile nick",
    newProfile: "New profile",
    load: "Load",
    exportProfile: "Export profile",
    importProfile: "Import profile",
    modeLabel: "Mode",
    gameRulesLabel: "Game mode",
    versionLabel: "Version",
    matchSizeLabel: "Match size",
    fillLabel: "Fill",
    startSideLabel: "Starting side",
    mapLabel: "Map",
    menuGraphicsLabel: "Graphics",
  },
};

const actionLabelI18n = {
  en: {
    forward: "Move forward",
    back: "Move back",
    left: "Move left",
    right: "Move right",
    use: "Use / bomb / take bot",
    reload: "Reload",
    shop: "Shop",
    settings: "Settings",
    missions: "Missions",
    binds: "Binds",
    teams: "Teams",
    network: "LAN / online",
    grenade: "Grenade",
    drop: "Drop weapon",
    dash: "3D jump / 2D dash",
    crouch: "3D crouch",
    pause: "Pause",
    console: "Lobby commands",
    hint: "Story hint",
    spectatorNext: "Spectator next",
    spectatorPrev: "Spectator previous",
  },
};

function tr(key) {
  return (i18n[settings.language] && i18n[settings.language][key]) || i18n.pl[key] || key;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function bindLabel(action) {
  return settings.language === "en" ? actionLabelI18n.en[action] || actionLabels[action] || action : actionLabels[action] || action;
}

function normalizeGraphicsMode(mode) {
  return ["2d", "3d"].includes(mode) ? mode : "2d";
}

function isPerspectiveMode() {
  return settings.graphicsMode === "3d";
}

const MAX_CAMERA_PITCH = Math.PI * 0.3889;

function updatePerspectiveLook(deltaX, deltaY, sensitivityScale = 1) {
  const speed = Math.hypot(deltaX, deltaY);
  const acceleration = settings.mouseAcceleration ? 1 + Math.min(1.5, speed / 40) * settings.mouseAccelerationAmount : 1;
  const sensitivity = settings.sensitivity * sensitivityScale * acceleration;
  player.angle += deltaX * 0.0032 * sensitivity;
  const pitchDirection = settings.invertY ? -1 : 1;
  camera.pitch = clamp(
    camera.pitch - deltaY * 0.00235 * sensitivity * settings.pitchSensitivity * pitchDirection,
    -MAX_CAMERA_PITCH,
    MAX_CAMERA_PITCH,
  );
  mouse.x = window.innerWidth / 2;
  mouse.y = window.innerHeight / 2;
}

async function requestGamePointerLock() {
  if (document.pointerLockElement === canvas) return;
  try {
    if (settings.rawMouseInput) await canvas.requestPointerLock({ unadjustedMovement: true });
    else await canvas.requestPointerLock();
  } catch {
    try { await canvas.requestPointerLock(); } catch { /* Pointer lock remains optional. */ }
  }
}

function renderGameView() {
  if (settings.graphicsMode === "3d") render3d();
  else render2d();
}

function setGraphicsMode(mode) {
  settings.graphicsMode = normalizeGraphicsMode(mode);
  if (!isPerspectiveMode()) camera.pitch = 0;
  if (hud.graphicsMode) hud.graphicsMode.value = settings.graphicsMode;
  if (hud.menuGraphics) hud.menuGraphics.value = settings.graphicsMode;
  mouse.x = isPerspectiveMode() ? window.innerWidth / 2 : mouse.x;
  mouse.y = isPerspectiveMode() ? window.innerHeight / 2 : mouse.y;
}

const player = {
  x: 0,
  y: 0,
  r: 16,
  hp: 100,
  armor: 0,
  helmet: false,
  defuseKit: false,
  zeus: false,
  money: 800,
  speed: 250,
  dash: 0,
  jumpHeight: 0,
  verticalVelocity: 0,
  jumpLatch: false,
  crouched: false,
  eyeHeight: 58,
  invuln: 0,
  angle: 0,
  weaponId: 0,
  kills: 0,
  roundKills: 0,
  hits: 0,
  plants: 0,
  defuses: 0,
  alive: true,
  grenades: {},
  useLatch: false,
};

let weapons = [];
const bots = [];
const allies = [];
const bullets = [];
const grenades = [];
const droppedWeapons = [];
const effects = [];
const customTextures = [];
const loadedMods = [];
const removedDefaultModIds = [];
const keys = new Set();
const touchActions = new Set();
const mouse = { x: 0, y: 0, down: false, clicked: false, rightDown: false };
const camera = { x: 0, y: 0, shake: 0, pitch: 0 };
const mobileLook = { pointerId: null, x: 0, y: 0 };
const runtimeStats = { fps: 0, frames: 0, sampleStarted: performance.now() };
let last = performance.now();
let waitingForBind = "";
let waitingForFastBind = false;
let pendingFastBindKey = "";
const editor = { active: false, selectedMission: "", selectedObject: null, hybridView: "sandbox", previousGraphicsMode: "2d" };

function isSandboxMode(mode = state.gameMode) {
  return mode === "sandbox" || mode === "editor-sandbox";
}

function isHybridMode() {
  return state.gameMode === "editor-sandbox";
}

function makeWeapons() {
  weapons = weaponCatalog.map((weapon, id) => ({
    ...weapon,
    id,
    owned: false,
    ammo: weapon.magSize,
    currentReserve: weapon.reserve,
    cooldown: 0,
    reloading: 0,
  }));
}

function resize() {
  const scale = window.devicePixelRatio || 1;
  const fixed = settings.resolution !== "auto" ? settings.resolution.split("x").map(Number) : null;
  const cssW = fixed ? fixed[0] : window.innerWidth;
  const cssH = fixed ? fixed[1] : window.innerHeight;
  canvas.width = Math.floor(cssW * scale);
  canvas.height = Math.floor(cssH * scale);
  canvas.style.width = `${cssW}px`;
  canvas.style.height = `${cssH}px`;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function dist(ax, ay, bx, by) {
  return Math.hypot(ax - bx, ay - by);
}

function angleTo(ax, ay, bx, by) {
  return Math.atan2(by - ay, bx - ax);
}

function angleDiff(a, b) {
  return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}

function teamName(team) {
  return team === "T" ? "Terrorists" : "Counter-Terrorists";
}

function enemyOf(team) {
  return team === "T" ? "CT" : "T";
}

function showMessage(text) {
  hud.message.textContent = text;
  hud.message.classList.add("show");
  clearTimeout(showMessage.timer);
  showMessage.timer = setTimeout(() => hud.message.classList.remove("show"), 1600);
}

function setText(selector, text) {
  document.querySelectorAll(selector).forEach((node) => { node.textContent = text; });
}

function setLabel(inputId, text) {
  const input = $(inputId);
  const label = input?.closest("label");
  if (!label) return;
  const textNode = [...label.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
  if (textNode) textNode.textContent = `\n          ${text}\n          `;
}

function setPlaceholder(id, text) {
  const input = $(id);
  if (input) input.placeholder = text;
}

function setOptionText(selectId, value, text) {
  const option = document.querySelector(`#${selectId} option[value="${value}"]`);
  if (option) option.textContent = text;
}

function applyLanguage() {
  document.documentElement.lang = settings.language === "en" ? "en" : "pl";
  setText("#start", tr("play"));
  setText("#create-lan", tr("createLan"));
  setText("#sandbox-spawn-title", tr("sandboxSpawnTitle"));
  setText("#sandbox-world-title", tr("sandboxWorldTitle"));
  setText("#sandbox-world-export", tr("sandboxExport"));
  setText("#sandbox-world-import", tr("sandboxImport"));
  setText("#sandbox-world-clear", tr("sandboxClear"));
  setText("#sandbox-spawn-kicker", tr("sandboxHoldQ"));
  setText("#sandbox-world-kicker", tr("sandboxUnderP"));
  setText('[data-sandbox-category="objects"]', tr("sandboxObjects"));
  setText('[data-sandbox-category="npcs"]', "NPC");
  setText('[data-sandbox-category="weapons"]', tr("sandboxWeapons"));
  setText("#sandbox-spawn-help", tr("sandboxSpawnHelp"));
  setText("#sandbox-world-help", tr("sandboxWorldHelp"));
  setLabel("sandbox-width", tr("sandboxWidth"));
  setLabel("sandbox-height", tr("sandboxHeight"));
  setLabel("sandbox-wall-texture", tr("sandboxWall"));
  setText("#join-lan", tr("joinLan"));
  setText("#lan-browser-panel h2", tr("lanServers"));
  setText("#lan-browser-panel .muted", tr("lanNetwork"));
  setLabel("lan-browser-address", tr("lanHostAddress"));
  setText("#lan-browser-refresh", tr("lanRefreshList"));
  setText("#lan-browser-status", tr("lanBrowserHelp"));
  setText("#lan-lobby-add-player", tr("lanAddPlayer"));
  setLabel("lan-add-player-name", tr("lanAddPlayerLabel"));
  setLabel("lan-add-player-team", tr("lanPlayerTeam"));
  setText(".lan-ban-section > strong", tr("lanBans"));
  setText("#lan-lobby-title", tr("lobbyTitle"));
  setText("#lan-lobby-leave", tr("lobbyLeave"));
  setText("#lan-lobby-start", tr("lobbyStart"));
  setText("#lan-lobby-transfer", tr("lobbyTransfer"));
  setText("#lan-lobby-settings", tr("lobbySettings"));
  setText("#lan-lobby-refresh", tr("lobbyRefresh"));
  setText("#lan-lobby-room-label", tr("lobbyRoom"));
  setText("#lan-lobby-status-label", tr("lobbyStatus"));
  setText("#lan-lobby-owner-label", tr("lobbyOwner"));
  setText("#lan-lobby-kicker", tr("lobbyKicker"));
  setText("#lan-lobby-note", tr("lobbyNote"));
  setText("#open-profile", tr("profile"));
  setText("#open-mods", tr("mods"));
  setText("#open-settings", tr("settings"));
  setText("#open-binds", tr("binds"));
  setText("#open-teams", tr("teams"));
  setText("#open-mapgen", tr("mapgen"));
  setText("#open-editor", tr("storyEditor"));
  setText("#open-console", tr("commands"));
  setText("#open-network", tr("network"));
  setText("#download-game", tr("download"));
  setText(".close-panel", tr("close"));
  setText("#shop-panel h2", tr("shopTitle"));
  setText("#shop-panel .muted", tr("shop").toLowerCase());
  setText("#settings-panel h2", tr("settingsTitle"));
  setText("#fast-bind-title", tr("fastBindTitle"));
  setText("#fast-bind-help", tr("fastBindHelp"));
  setText("#fast-bind-add", tr("fastBindAdd"));
  setText("#fast-bind-enabled-label", tr("fastBindEnabled"));
  setText("#fast-bind-clear", tr("fastBindClear"));
  hud.fastBindAction?.setAttribute("aria-label", tr("fastBindActionAria"));
  setText("#missions-panel h2", tr("missionsTitle"));
  setText("#binds-panel h2", tr("bindsTitle"));
  setText("#teams-panel h2", tr("teamsTitle"));
  setText("#mapgen-panel h2", tr("mapgenTitle"));
  setText("#mods-panel h2", tr("modsTitle"));
  setText("#player-menu .muted", tr("profileTitle"));
  setText(".weapon-card.wide div:last-child", tr("controlsHelp"));
  setText("#menu .menu-box > p", tr("menuLead"));
  setText("#export-config", tr("exportConfig"));
  setText("#import-config", tr("importConfig"));
  setText("#binds-panel .panel-note", tr("bindHelp"));
  setText("#reroll-missions", tr("rerollMissions"));
  setText("#profile-create", tr("newProfile"));
  setText("#profile-load", tr("load"));
  setText("#profile-export", tr("exportProfile"));
  setText("#profile-import", tr("importProfile"));
  setPlaceholder("profile-nick", tr("profileNewPlaceholder"));
  setLabel("language-select", tr("languageLabel"));
  setLabel("graphics-mode", tr("graphicsLabel"));
  setLabel("quality", tr("qualityLabel"));
  setLabel("difficulty", tr("botDifficultyLabel"));
  setLabel("resolution", tr("resolutionLabel"));
  setLabel("hz-limit", tr("hzLabel"));
  setLabel("crosshair-style", tr("crosshairLabel"));
  setLabel("crosshair-enabled", tr("crosshairEnabledLabel"));
  setLabel("crosshair-color", tr("crosshairColorLabel"));
  setLabel("crosshair-size", tr("crosshairSizeLabel"));
  setLabel("crosshair-gap", tr("crosshairGapLabel"));
  setLabel("crosshair-thickness", tr("crosshairThicknessLabel"));
  setLabel("crosshair-outline", tr("crosshairOutlineLabel"));
  setLabel("sensitivity", tr("sensitivityLabel"));
  setLabel("pitch-sensitivity", tr("pitchSensitivityLabel"));
  setLabel("zoom-sensitivity", tr("zoomSensitivityLabel"));
  setLabel("field-of-view", tr("fieldOfViewLabel"));
  setLabel("raw-mouse-input", tr("rawMouseLabel"));
  setLabel("mouse-acceleration", tr("mouseAccelerationLabel"));
  setLabel("mouse-acceleration-amount", tr("mouseAccelerationAmountLabel"));
  setLabel("view-bob", tr("viewBobLabel"));
  setLabel("invert-y", tr("invertYLabel"));
  setLabel("crosshair-paint-color", tr("crosshairPaintLabel"));
  setLabel("crosshair-custom-enabled", tr("crosshairCustomLabel"));
  setText("#crosshair-reset", tr("crosshairReset"));
  setLabel("config-nick", tr("nickLabel"));
  setLabel("config-id", tr("configIdLabel"));
  setLabel("config-player-id", tr("playerIdLabel"));
  setLabel("screen-shake", tr("shakeLabel"));
  setLabel("master-volume", tr("volumeLabel"));
  setLabel("footstep-volume", tr("footstepsLabel"));
  setLabel("perf-limit", tr("perfLabel"));
  setLabel("bot-count", tr("botCountLabel"));
  setLabel("control-mode", tr("controlsLabel"));
  setLabel("menu-mode", tr("modeLabel"));
  setLabel("game-rules", tr("gameRulesLabel"));
  setLabel("launch-target", tr("versionLabel"));
  setLabel("match-size", tr("matchSizeLabel"));
  setLabel("fill-mode", tr("fillLabel"));
  setLabel("menu-team", tr("startSideLabel"));
  setLabel("menu-map", tr("mapLabel"));
  setLabel("menu-graphics", tr("menuGraphicsLabel"));
  setLabel("menu-aim-mode", tr("lobbyAimLabel"));
  setLabel("lan-transfer-target", tr("lobbyTransferLabel"));
  if (settings.language === "en") {
    setOptionText("hz-limit", "vsync", "V-Sync (recommended)");
    setOptionText("hz-limit", "0", "Unlimited");
    setOptionText("menu-mode", "offline", "Offline bots");
    setOptionText("menu-mode", "story", "Story mode");
    setOptionText("menu-mode", "lan", "LAN");
    setOptionText("menu-mode", "online", "Online HTML");
    setOptionText("game-rules", "classic", "Classic / custom size");
    setOptionText("game-rules", "competitive", "Competitive 5v5");
    setOptionText("game-rules", "wingman", "Wingman 2v2");
    setOptionText("game-rules", "retake", "Retake");
    setOptionText("game-rules", "deathmatch", "Deathmatch");
    setOptionText("game-rules", "casual", "Casual 10v10");
    setOptionText("game-rules", "training", "Training 1v1");
    setOptionText("launch-target", "html", "HTML / browser");
    setOptionText("launch-target", "exe", "Offline EXE");
    setOptionText("fill-mode", "bots", "BOTS");
    setOptionText("fill-mode", "lan", "LAN players + bots");
    setOptionText("menu-team", "random", "Random");
    setOptionText("menu-team", "T", "Terrorists");
    setOptionText("menu-team", "CT", "Counter-Terrorists");
    setOptionText("menu-graphics", "2d", "2D top-down");
    setOptionText("menu-graphics", "3d", "3D FPS");
    setOptionText("graphics-mode", "3d", "3D FPS");
    setOptionText("control-mode", "keyboard", "Keyboard + mouse");
    setOptionText("control-mode", "mobile", "Phone / touch screen");
    setOptionText("crosshair-style", "dot", "Fixed dot");
    setOptionText("crosshair-style", "classic", "Classic");
    setOptionText("crosshair-style", "wide", "Wide");
    setOptionText("crosshair-style", "circle", "Circle");
    setOptionText("crosshair-style", "t", "T Style");
    setOptionText("server-aim-mode", "sights", "Weapon sights / scope");
    setOptionText("server-aim-mode", "zoom", "Zoom only + classic crosshair");
    setOptionText("server-aim-mode", "none", "No action");
    setOptionText("menu-aim-mode", "sights", "Weapon sights / scope");
    setOptionText("menu-aim-mode", "zoom", "Zoom only + classic crosshair");
    setOptionText("menu-aim-mode", "none", "No action");
  } else {
    setOptionText("hz-limit", "vsync", "V-Sync (zalecane)");
    setOptionText("hz-limit", "0", "Bez limitu");
    setOptionText("menu-mode", "offline", "BOTY offline");
    setOptionText("menu-mode", "story", "Tryb fabularny");
    setOptionText("menu-mode", "lan", "LAN");
    setOptionText("menu-mode", "online", "Online HTML");
    setOptionText("game-rules", "classic", "Classic / wlasny rozmiar");
    setOptionText("game-rules", "competitive", "Competitive 5v5");
    setOptionText("game-rules", "wingman", "Wingman 2v2");
    setOptionText("game-rules", "retake", "Retake");
    setOptionText("game-rules", "deathmatch", "Deathmatch");
    setOptionText("game-rules", "casual", "Casual 10v10");
    setOptionText("game-rules", "training", "Trening 1v1");
    setOptionText("launch-target", "html", "HTML / przegladarka");
    setOptionText("launch-target", "exe", "Offline EXE");
    setOptionText("fill-mode", "bots", "BOTY");
    setOptionText("fill-mode", "lan", "LAN gracze + boty");
    setOptionText("menu-team", "random", "Losowa");
    setOptionText("menu-team", "T", "Terrorists");
    setOptionText("menu-team", "CT", "Counter-Terrorists");
    setOptionText("menu-graphics", "2d", "2D top-down");
    setOptionText("menu-graphics", "3d", "3D FPS");
    setOptionText("graphics-mode", "3d", "3D FPS");
    setOptionText("control-mode", "keyboard", "Klawiatura + mysz");
    setOptionText("control-mode", "mobile", "Telefon / ekran dotykowy");
    setOptionText("crosshair-style", "dot", "Staly punkt");
    setOptionText("crosshair-style", "classic", "Classic");
    setOptionText("crosshair-style", "wide", "Szeroki");
    setOptionText("crosshair-style", "circle", "Kolo");
    setOptionText("crosshair-style", "t", "Styl T");
    setOptionText("server-aim-mode", "sights", "Przyrzady celownicze / scope");
    setOptionText("server-aim-mode", "zoom", "Tylko przyblizenie + klasyczny celownik");
    setOptionText("server-aim-mode", "none", "Brak akcji");
    setOptionText("menu-aim-mode", "sights", "Przyrzady celownicze / scope");
    setOptionText("menu-aim-mode", "zoom", "Tylko przyblizenie + klasyczny celownik");
    setOptionText("menu-aim-mode", "none", "Brak akcji");
  }
  const sound = $("sound-enabled")?.closest("label");
  if (sound) sound.lastChild.textContent = `\n          ${tr("soundLabel")}\n        `;
  const serverAudio = $("server-audio")?.closest("label");
  if (serverAudio) serverAudio.lastChild.textContent = `\n          ${tr("serverAudioLabel")}\n        `;
  const minimap = $("show-minimap")?.closest("label");
  if (minimap) minimap.lastChild.textContent = `\n          ${tr("minimapLabel")}\n        `;
  const autoReload = $("auto-reload")?.closest("label");
  if (autoReload) autoReload.lastChild.textContent = `\n          ${tr("autoReloadLabel")}\n        `;
  renderShop();
  renderBinds();
  renderFastBindOptions();
  renderFastBinds();
  renderMissions();
  renderTeams();
  renderModManager();
  syncMenuAimMode();
  updateHud();
}

function showFatalError(error, context = "runtime") {
  console.error(error);
  const message = error?.message || String(error || "nieznany blad");
  state.running = false;
  state.paused = false;
  state.overlayOpen = false;
  hud.menu.classList.remove("hidden");
  hud.pausePanel?.classList.add("hidden");
  showMessage(`Blad ${context}: ${message}`);
}

function actionDown(action) {
  return keys.has(bindings[action]) || touchActions.has(action);
}

function codeName(code) {
  if (code === "Space") return "Space";
  if (code.startsWith("Key")) return code.slice(3);
  if (code.startsWith("Digit")) return code.slice(5);
  return code;
}

function fastBindActionEntries() {
  const entries = [];
  for (const weapon of weaponCatalog.filter((item) => !item.melee && !item.sandboxOnly)) {
    entries.push({ group: tr("fastBindBuyWeapons"), value: `buy:weapon:${weaponCatalog.indexOf(weapon)}`, label: `${weapon.category}: ${weapon.name} ($${weapon.price})` });
  }
  for (const grenade of grenadeCatalog) {
    entries.push({ group: tr("fastBindBuyGrenades"), value: `buy:grenade:${grenadeCatalog.indexOf(grenade)}`, label: `${grenade.name} ($${grenade.price})` });
  }
  for (const gear of equipmentCatalog) {
    entries.push({ group: tr("fastBindBuyGear"), value: `buy:equipment:${equipmentCatalog.indexOf(gear)}`, label: `${gear.name} ($${gear.price})` });
  }
  entries.push(
    { group: tr("fastBindActions"), value: "action:shop", label: tr("shop") },
    { group: tr("fastBindActions"), value: "action:reload", label: bindLabel("reload") },
    { group: tr("fastBindActions"), value: "action:grenade", label: bindLabel("grenade") },
    { group: tr("fastBindActions"), value: "action:drop", label: bindLabel("drop") },
  );
  for (let slot = 1; slot <= 10; slot += 1) {
    entries.push({ group: tr("fastBindActions"), value: `action:slot:${slot}`, label: `Slot ${slot}` });
  }
  return entries;
}

function normalizeFastBinds(value = settings.fastBinds) {
  const allowed = new Set(fastBindActionEntries().map((entry) => entry.value));
  const normalized = [];
  const ids = new Set();
  for (const bind of Array.isArray(value) ? value : []) {
    if (!bind || typeof bind.key !== "string" || !allowed.has(bind.action)) continue;
    let id = typeof bind.id === "string" && bind.id ? bind.id : "";
    if (!id || ids.has(id)) id = `fb-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
    ids.add(id);
    normalized.push({ id, key: bind.key, action: bind.action, enabled: bind.enabled !== false });
  }
  settings.fastBinds = normalized;
  settings.fastBindsEnabled = settings.fastBindsEnabled !== false;
  return settings.fastBinds;
}

function fastBindActionLabel(action) {
  return fastBindActionEntries().find((entry) => entry.value === action)?.label || action;
}

function renderFastBindOptions() {
  if (!hud.fastBindAction) return;
  const selected = hud.fastBindAction.value;
  hud.fastBindAction.innerHTML = "";
  const groups = new Map();
  for (const entry of fastBindActionEntries()) {
    if (!groups.has(entry.group)) {
      const group = document.createElement("optgroup");
      group.label = entry.group;
      groups.set(entry.group, group);
      hud.fastBindAction.appendChild(group);
    }
    const option = document.createElement("option");
    option.value = entry.value;
    option.textContent = entry.label;
    groups.get(entry.group).appendChild(option);
  }
  if ([...hud.fastBindAction.options].some((option) => option.value === selected)) hud.fastBindAction.value = selected;
}

function renderFastBinds() {
  if (!hud.fastBindList || !hud.fastBindKey) return;
  normalizeFastBinds();
  hud.fastBindKey.textContent = waitingForFastBind ? tr("fastBindPress") : pendingFastBindKey ? codeName(pendingFastBindKey) : tr("fastBindSetKey");
  hud.fastBindEnabled.checked = settings.fastBindsEnabled;
  hud.fastBindCount.textContent = tr("fastBindCount").replace("{count}", String(settings.fastBinds.length));
  hud.fastBindClear.disabled = settings.fastBinds.length === 0;
  hud.fastBindList.innerHTML = "";
  if (!settings.fastBinds.length) {
    const empty = document.createElement("div");
    empty.className = "panel-note";
    empty.textContent = tr("fastBindEmpty");
    hud.fastBindList.appendChild(empty);
    return;
  }
  for (const bind of settings.fastBinds) {
    const item = document.createElement("div");
    item.className = `fast-bind-item${bind.enabled ? "" : " disabled"}`;
    const key = document.createElement("span");
    key.className = "tag";
    key.textContent = codeName(bind.key);
    const label = document.createElement("span");
    label.textContent = fastBindActionLabel(bind.action);
    const toggle = document.createElement("label");
    toggle.className = "fast-bind-toggle";
    const enabled = document.createElement("input");
    enabled.type = "checkbox";
    enabled.checked = bind.enabled;
    enabled.addEventListener("change", () => {
      bind.enabled = enabled.checked;
      saveConfig();
      renderFastBinds();
    });
    const enabledLabel = document.createElement("span");
    enabledLabel.textContent = tr("fastBindEntryEnabled");
    toggle.append(enabled, enabledLabel);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "secondary";
    remove.textContent = tr("fastBindRemove");
    remove.addEventListener("click", () => {
      settings.fastBinds = settings.fastBinds.filter((entry) => entry.id !== bind.id);
      saveConfig();
      renderFastBinds();
    });
    item.append(key, label, toggle, remove);
    hud.fastBindList.appendChild(item);
  }
}

function executeFastBind(action) {
  if (action.startsWith("buy:")) {
    if (!state.running) return showMessage(settings.language === "en" ? "Start a match before buying" : "Uruchom mecz przed zakupem");
    const [, type, rawId] = action.split(":");
    buyItem(type, Number(rawId));
    return;
  }
  if (action === "action:shop") return togglePanel(hud.shopPanel);
  if (!state.running) return;
  if (action === "action:reload") return reload();
  if (action === "action:grenade") return selectNextGrenade();
  if (action === "action:drop") return dropActiveWeapon();
  if (action.startsWith("action:slot:")) equipHotkey(Number(action.slice("action:slot:".length)));
}

const audio = {
  ctx: null,
  enabledOnce: false,
  lastServerPost: 0,
  lastServerPoll: 0,
  lastServerEventTime: 0,
  lastBombBeep: 0,
  playerStep: 0,
  actorSteps: new WeakMap(),
};

function ensureAudio() {
  if (!settings.soundEnabled) return null;
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return null;
  if (!audio.ctx) audio.ctx = new AudioCtor();
  if (audio.ctx.state === "suspended") audio.ctx.resume();
  audio.enabledOnce = true;
  return audio.ctx;
}

function audioVolume(x = player.x, y = player.y, range = 1250, channel = "effects") {
  if (!settings.soundEnabled) return 0;
  const base = clamp(Number(settings.masterVolume ?? 0.75), 0, 1);
  const channelVolume = channel === "steps" ? clamp(Number(settings.footstepVolume ?? 0.55), 0, 1) : 1;
  const d = dist(player.x, player.y, x, y);
  return base * channelVolume * clamp(1 - d / range, 0, 1);
}

function makeNoise(ctx, duration) {
  const buffer = ctx.createBuffer(1, Math.max(1, Math.floor(ctx.sampleRate * duration)), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  return source;
}

function burst({ type = "noise", freq = 160, endFreq = 80, duration = 0.12, volume = 0.45, x = player.x, y = player.y, range = 1250, filter = 900, channel = "effects" }) {
  const ctx = ensureAudio();
  const v = volume * audioVolume(x, y, range, channel);
  if (!ctx || v <= 0.002) return;
  const gain = ctx.createGain();
  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, v), now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  gain.connect(ctx.destination);
  let source;
  if (type === "noise") {
    source = makeNoise(ctx, duration);
    const biquad = ctx.createBiquadFilter();
    biquad.type = "bandpass";
    biquad.frequency.setValueAtTime(filter, now);
    biquad.Q.value = 0.8;
    source.connect(biquad);
    biquad.connect(gain);
  } else {
    source = ctx.createOscillator();
    source.type = type;
    source.frequency.setValueAtTime(freq, now);
    source.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), now + duration);
    source.connect(gain);
  }
  source.start(now);
  source.stop(now + duration + 0.02);
}

function weaponAudioProfile(weapon = {}) {
  const name = weapon.name || "";
  if (name.includes("AWP")) return { freq: 76, click: 980, filter: 460, duration: 0.26, volume: 1, tail: 0.2, shell: 0.22 };
  if (name.includes("SSG") || weapon.category === "Sniper") return { freq: 102, click: 900, filter: 580, duration: 0.21, volume: 0.82, tail: 0.15, shell: 0.18 };
  if (weapon.category === "Heavy" && weapon.pellets) return { freq: 72, click: 620, filter: 430, duration: 0.23, volume: 0.9, tail: 0.14, shell: 0.2 };
  if (weapon.category === "Heavy") return { freq: 94, click: 720, filter: 820, duration: 0.12, volume: 0.66, tail: 0.08, shell: 0.12 };
  if (weapon.category === "Pistol") return { freq: name.includes("Desert") || name.includes("R8") ? 132 : 190, click: 1320, filter: 1450, duration: 0.095, volume: name.includes("Desert") || name.includes("R8") ? 0.62 : 0.45, tail: 0.05, shell: 0.09 };
  if (weapon.category === "SMG") return { freq: 150, click: 1180, filter: 1250, duration: 0.075, volume: 0.38, tail: 0.035, shell: 0.065 };
  const silenced = name.includes("M4A1-S") || name.includes("USP-S") || name.includes("MP5-SD");
  return { freq: silenced ? 135 : name.includes("AK") ? 104 : 120, click: silenced ? 760 : 980, filter: silenced ? 820 : 1040, duration: silenced ? 0.09 : 0.13, volume: silenced ? 0.42 : 0.64, tail: silenced ? 0.03 : 0.09, shell: silenced ? 0.05 : 0.11 };
}

function stepAudioProfile(material = "dirt", walking = false) {
  const profiles = {
    concrete: { filter: 420, freq: 86, scrape: 0.12 },
    stone: { filter: 520, freq: 92, scrape: 0.16 },
    wood: { filter: 330, freq: 76, scrape: 0.2 },
    metal: { filter: 780, freq: 118, scrape: 0.24 },
    glass: { filter: 980, freq: 136, scrape: 0.18 },
    dirt: { filter: 280, freq: 72, scrape: 0.1 },
  };
  const p = profiles[material] || profiles.dirt;
  const volume = walking ? 0.075 : 0.14;
  return { ...p, volume };
}

function impactAudioProfile(material = "concrete") {
  const profiles = {
    concrete: { filter: 1500, freq: 220, volume: 0.18 },
    stone: { filter: 1700, freq: 260, volume: 0.2 },
    wood: { filter: 820, freq: 180, volume: 0.16 },
    metal: { filter: 2400, freq: 420, volume: 0.22 },
    glass: { filter: 2800, freq: 760, volume: 0.18 },
    dirt: { filter: 520, freq: 120, volume: 0.12 },
  };
  return profiles[material] || profiles.concrete;
}

function playSound(kind, data = {}) {
  const x = data.x ?? player.x;
  const y = data.y ?? player.y;
  if (kind === "gun") {
    const p = weaponAudioProfile(data.weapon);
    const volume = p.volume * (data.hostile ? 0.68 : 1);
    burst({ type: "square", freq: p.freq, endFreq: 38, duration: p.duration, volume, x, y, filter: p.filter });
    burst({ type: "noise", duration: p.duration + p.tail, volume: volume * 0.7, x, y, filter: p.filter });
    setTimeout(() => burst({ type: "triangle", freq: p.click, endFreq: p.click * 0.7, duration: 0.025, volume: volume * 0.22, x, y, filter: 2200 }), 18);
    setTimeout(() => burst({ type: "noise", duration: 0.045, volume: p.shell, x, y, range: 620, filter: 3100 }), 95);
  } else if (kind === "dryfire") burst({ type: "square", freq: 420, endFreq: 260, duration: 0.04, volume: 0.18, x, y, filter: 1800 });
  else if (kind === "reload") { burst({ type: "triangle", freq: 320, endFreq: 180, duration: 0.08, volume: 0.28, x, y, filter: 1400 }); setTimeout(() => burst({ type: "triangle", freq: 210, endFreq: 330, duration: 0.09, volume: 0.22, x, y, filter: 1600 }), 180); }
  else if (kind === "reloadDone") burst({ type: "triangle", freq: 280, endFreq: 520, duration: 0.06, volume: 0.2, x, y, filter: 1800 });
  else if (kind === "step") {
    const p = stepAudioProfile(data.material, data.walking);
    burst({ type: "noise", duration: 0.045, volume: p.volume, x, y, range: 760, filter: p.filter, channel: "steps" });
    burst({ type: "sine", freq: p.freq, endFreq: 42, duration: 0.055, volume: p.volume * 0.62, x, y, range: 720, channel: "steps" });
    if (!data.walking) burst({ type: "noise", duration: 0.025, volume: p.scrape * 0.18, x, y, range: 520, filter: p.filter * 1.6, channel: "steps" });
  }
  else if (kind === "impact") {
    const p = impactAudioProfile(data.material);
    burst({ type: "noise", duration: 0.035, volume: p.volume, x, y, range: 900, filter: p.filter });
    burst({ type: "triangle", freq: p.freq, endFreq: Math.max(42, p.freq * 0.45), duration: 0.04, volume: p.volume * 0.55, x, y, range: 780, filter: p.filter });
  }
  else if (kind === "grenadeThrow") burst({ type: "noise", duration: 0.09, volume: 0.18, x, y, filter: 1100 });
  else if (kind === "grenadeExplode") { burst({ type: "noise", duration: data.type === "smoke" ? 0.5 : 0.28, volume: data.type === "flash" ? 0.42 : 0.8, x, y, range: 1600, filter: data.type === "smoke" ? 420 : 720 }); burst({ type: "sawtooth", freq: data.type === "flash" ? 880 : 74, endFreq: 38, duration: data.type === "flash" ? 0.12 : 0.22, volume: data.type === "smoke" ? 0.18 : 0.55, x, y, range: 1600 }); }
  else if (kind === "hit") burst({ type: "noise", duration: 0.035, volume: 0.16, x, y, filter: 1900 });
  else if (kind === "death") burst({ type: "sawtooth", freq: 170, endFreq: 48, duration: 0.28, volume: 0.35, x, y, filter: 620 });
  else if (kind === "bombPlant") { burst({ type: "square", freq: 620, endFreq: 620, duration: 0.06, volume: 0.32, x, y, filter: 1500 }); setTimeout(() => burst({ type: "square", freq: 820, endFreq: 820, duration: 0.05, volume: 0.28, x, y, filter: 1600 }), 110); }
  else if (kind === "bombBeep") burst({ type: "sine", freq: data.fast ? 1050 : 760, endFreq: data.fast ? 1050 : 760, duration: 0.055, volume: 0.28, x, y, range: 1450, filter: 1200 });
  else if (kind === "bombExplode") { burst({ type: "noise", duration: 0.5, volume: 1, x, y, range: 1900, filter: 520 }); burst({ type: "sawtooth", freq: 64, endFreq: 28, duration: 0.6, volume: 0.75, x, y, range: 1900 }); }
  else if (kind === "defuse") burst({ type: "triangle", freq: 560, endFreq: 360, duration: 0.08, volume: 0.2, x, y, filter: 1300 });
  else if (kind === "buy" || kind === "ui") burst({ type: "triangle", freq: kind === "buy" ? 520 : 440, endFreq: kind === "buy" ? 780 : 620, duration: 0.05, volume: 0.16, x, y, filter: 1800 });
}

function serverAudioBase() {
  const raw = hud.serverUrl?.value || `${location.protocol}//${location.host}`;
  return raw.replace(/^ws:/, "http:").replace(/^wss:/, "https:").replace(/\/$/, "");
}

function emitAudioEvent(kind, data = {}, sendServer = true) {
  playSound(kind, data);
  if (!sendServer || !settings.serverAudio || state.gameMode === "offline") return;
  const now = performance.now();
  if (now - audio.lastServerPost < 35) return;
  audio.lastServerPost = now;
  fetch(`${serverAudioBase()}/api/audio`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      room: hud.lanRoom?.value || "potato-lan",
      playerId: settings.playerId,
      name: settings.nick,
      kind,
      x: Math.round(data.x ?? player.x),
      y: Math.round(data.y ?? player.y),
      weapon: data.weapon?.name || data.weapon || "",
      type: data.type || "",
      material: data.material || "",
      time: Date.now(),
    }),
  }).catch(() => {});
}

function pollServerAudioEvents() {
  if (!settings.serverAudio || state.gameMode === "offline") return;
  const now = performance.now();
  if (now - audio.lastServerPoll < 280) return;
  audio.lastServerPoll = now;
  const room = encodeURIComponent(hud.lanRoom?.value || "potato-lan");
  fetch(`${serverAudioBase()}/api/audio-events?room=${room}&since=${audio.lastServerEventTime}`).then((res) => res.json()).then((payload) => {
    for (const event of payload.events || []) {
      audio.lastServerEventTime = Math.max(audio.lastServerEventTime, event.time || 0);
      if (event.playerId && event.playerId === settings.playerId) continue;
      playSound(event.kind, { x: event.x, y: event.y, weapon: event.weapon ? { name: event.weapon } : null, type: event.type, material: event.material });
    }
  }).catch(() => {});
}

function maybeStep(actor, moving, walking = false) {
  if (!moving || state.phase !== "live") return;
  const now = performance.now();
  const delay = walking ? 470 : 310;
  const lastStep = actor === player ? audio.playerStep : audio.actorSteps.get(actor) || 0;
  if (now - lastStep < delay) return;
  if (actor === player) audio.playerStep = now;
  else audio.actorSteps.set(actor, now);
  emitAudioEvent("step", { x: actor.x, y: actor.y, walking, material: materialAt(actor.x, actor.y) }, actor === player);
}

function ensurePlayerId() {
  if (!settings.configId) {
    settings.configId = `cfg-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }
  if (!settings.playerId) {
    settings.playerId = `ps-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }
  hud.configId.value = settings.configId;
  hud.configPlayerId.value = settings.playerId;
  if (hud.profileCurrent) hud.profileCurrent.textContent = `${settings.nick} / ${settings.playerId}`;
}

function serializeProfile() {
  const fastBinds = normalizeFastBinds().map((bind) => ({ ...bind }));
  return {
    version: 1,
    type: "potato-strike-player-profile",
    configId: settings.configId,
    nick: settings.nick,
    playerId: settings.playerId,
    settings: { ...settings, fastBinds },
    bindings: { ...bindings },
    serverConfig: serverConfigSnapshot(),
    userMaps: userMaps(),
    storyMissions: savedStoryMissions(),
    customTextures,
    mods: loadedMods,
    removedDefaultMods: removedDefaultModIds,
  };
}

function serializeConfig() {
  return serializeProfile();
}

function saveConfig() {
  ensurePlayerId();
  const profile = serializeProfile();
  localStorage.setItem("potatoStrikeConfig", JSON.stringify(profile));
  const profiles = playerProfiles().filter((item) => item.playerId !== profile.playerId);
  profiles.push(profile);
  localStorage.setItem("potatoStrikeProfiles", JSON.stringify(profiles));
  renderProfileMenu();
}

function syncProfileFields() {
  settings.difficulty = normalizeBotDifficulty(settings.difficulty);
  hud.configNick.value = settings.nick;
  hud.configId.value = settings.configId;
  hud.configPlayerId.value = settings.playerId;
  hud.profileNick.value = settings.nick;
  hud.playerName.value = settings.nick;
  hud.languageSelect.value = settings.language;
  hud.difficulty.value = String(settings.difficulty);
  hud.teamDifficulty.value = String(settings.difficulty);
  hud.resolution.value = settings.resolution;
  hud.hzLimit.value = String(settings.hzLimit);
  if (!hud.hzLimit.value) {
    settings.hzLimit = "vsync";
    hud.hzLimit.value = "vsync";
  }
  hud.crosshairStyle.value = settings.crosshairStyle;
  hud.crosshairEnabled.checked = settings.crosshairEnabled !== false;
  hud.crosshairColor.value = settings.crosshairColor;
  hud.crosshairSize.value = String(settings.crosshairSize);
  hud.crosshairGap.value = String(settings.crosshairGap);
  hud.crosshairThickness.value = String(settings.crosshairThickness);
  hud.crosshairOutline.checked = settings.crosshairOutline;
  hud.crosshairCustomEnabled.checked = settings.crosshairCustomEnabled;
  hud.crosshairPaintColor.value = settings.crosshairPaintColor || settings.crosshairColor;
  hud.sensitivity.value = String(settings.sensitivity);
  hud.pitchSensitivity.value = String(settings.pitchSensitivity);
  hud.zoomSensitivity.value = String(settings.zoomSensitivity);
  hud.fieldOfView.value = String(settings.fieldOfView);
  hud.rawMouseInput.checked = settings.rawMouseInput !== false;
  hud.mouseAcceleration.checked = Boolean(settings.mouseAcceleration);
  hud.mouseAccelerationAmount.value = String(settings.mouseAccelerationAmount);
  hud.viewBob.value = String(settings.viewBob);
  hud.invertY.checked = settings.invertY;
  hud.soundEnabled.checked = settings.soundEnabled;
  hud.masterVolume.value = String(settings.masterVolume);
  hud.footstepVolume.value = String(settings.footstepVolume);
  hud.serverAudio.checked = settings.serverAudio;
  hud.controlMode.value = settings.controlMode;
  hud.sandboxWidth.value = String(clamp(Number(settings.sandboxWidth) || 40, 30, 150));
  hud.sandboxHeight.value = String(clamp(Number(settings.sandboxHeight) || 30, 24, 120));
  hud.sandboxWallTexture.value = simple3dTextures[settings.sandboxWallTexture] ? settings.sandboxWallTexture : "white";
  hud.sandboxUnlimitedAmmo.checked = Boolean(settings.sandboxUnlimitedAmmo);
  hud.menuAimMode.value = ["none", "zoom", "sights"].includes(settings.botAimMode) ? settings.botAimMode : "sights";
  applyGameRulePreset(settings.gameRules || "classic");
  hud.showMinimap.checked = settings.showMinimap;
  hud.mobileControls.classList.toggle("hidden", settings.controlMode !== "mobile");
  normalizeFastBinds();
  renderFastBindOptions();
  renderFastBinds();
  drawCrosshairPaint();
  syncServerControls();
  syncMenuAimMode();
}

function syncMenuAimMode() {
  if (!hud.menuAimMode) return;
  const mode = hud.menuMode.value;
  const story = mode === "story";
  const sandboxMode = isSandboxMode(mode);
  hud.sandboxWorldConfig?.classList.toggle("hidden", !sandboxMode);
  for (const control of [hud.gameRules, hud.matchSize, hud.fillMode, hud.menuTeam, hud.menuMap, hud.menuAimMode]) {
    control?.closest("label")?.classList.toggle("hidden", sandboxMode);
  }
  hud.menuAimMode.disabled = story || mode === "lan";
  if (story) hud.menuAimMode.value = "sights";
  else if (mode !== "lan") hud.menuAimMode.value = settings.botAimMode || "sights";
  hud.menuAimMode.title = story
    ? (settings.language === "en" ? "Story mode uses weapon sights." : "Kampania uzywa przyrzadow celowniczych.")
    : mode === "lan"
      ? (settings.language === "en" ? "The LAN commander sets RMB in server settings." : "W LAN zachowanie PPM ustawia dowodca serwera.")
      : "";
}

function migrateCrosshairSettings(sourceSettings = {}) {
  if (Number(sourceSettings.crosshairVersion || 0) >= 2) return;
  settings.crosshairEnabled = true;
  settings.crosshairVersion = 2;
  if (!sourceSettings.crosshairCustomEnabled && !sourceSettings.customCrosshair?.length) settings.crosshairStyle = "dot";
}

function loadConfig() {
  const raw = localStorage.getItem("potatoStrikeConfig");
  if (!raw) {
    ensurePlayerId();
    syncProfileFields();
    saveConfig();
    return;
  }
  try {
    const config = JSON.parse(raw);
    Object.assign(settings, config.settings || {});
    migrateCrosshairSettings(config.settings || {});
    normalizeFastBinds();
    settings.graphicsMode = normalizeGraphicsMode(settings.graphicsMode);
    Object.assign(bindings, config.bindings || {});
    if (bindings.grenade === bindings.drop) bindings.grenade = "KeyH";
    settings.configId = config.configId || settings.configId;
    settings.nick = config.nick || settings.nick;
    settings.playerId = config.playerId || settings.playerId;
    restoreUserContent(config);
  } catch {
    showMessage("Config uszkodzony, uzywam domyslnego");
  }
  ensurePlayerId();
  syncProfileFields();
}

function downloadJson(name, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}

async function exportConfig() {
  const config = serializeProfile();
  const name = `profile-${settings.nick || "player"}-${settings.playerId || "local"}`;
  if (window.potatoNative?.saveConfig) {
    const result = await window.potatoNative.saveConfig(name, config);
    showMessage(result.ok ? `Profil zapisany w configs/players/${settings.playerId}` : "Nie zapisano profilu");
    return;
  }
  downloadJson("potato-strike-profile.json", config);
}

function playerProfiles() {
  try {
    return JSON.parse(localStorage.getItem("potatoStrikeProfiles") || "[]");
  } catch {
    return [];
  }
}

function applyProfile(profile, preserveIncomingId = true) {
  Object.assign(settings, profile.settings || {});
  migrateCrosshairSettings(profile.settings || {});
  normalizeFastBinds();
  Object.assign(bindings, profile.bindings || {});
  if (bindings.grenade === bindings.drop) bindings.grenade = "KeyH";
  settings.configId = profile.configId || settings.configId || `cfg-${Date.now().toString(36)}`;
  settings.nick = profile.nick || settings.nick || "Potato";
  if (preserveIncomingId) settings.playerId = profile.playerId || settings.playerId;
  ensurePlayerId();
  restoreUserContent(profile);
  installBundledDefaultMods();
  syncProfileFields();
  saveConfig();
  renderBinds();
  renderProfileMenu();
}

function createPlayerProfile(nick) {
  saveConfig();
  settings.nick = nick || "Potato";
  settings.playerId = `ps-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  settings.configId = `cfg-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  writeUserMaps([]);
  writeStoryMissions([]);
  customTextures.splice(0, customTextures.length);
  loadedMods.splice(0, loadedMods.length);
  removedDefaultModIds.splice(0, removedDefaultModIds.length);
  installBundledDefaultMods();
  syncProfileFields();
  saveConfig();
  renderSavedMissions();
  renderAssetList();
  showMessage(`Nowy profil: ${settings.nick}`);
}

function renderProfileMenu() {
  if (!hud.profileList) return;
  const profiles = playerProfiles();
  hud.profileList.innerHTML = "";
  for (const profile of profiles) {
    const option = document.createElement("option");
    option.value = profile.playerId;
    option.textContent = `${profile.nick || "Potato"} / ${profile.playerId || "--"}`;
    hud.profileList.appendChild(option);
  }
  hud.profileList.value = settings.playerId;
  hud.profileCurrent.textContent = `${settings.nick} / ${settings.playerId || "--"}`;
}

function isLobbyCommander() {
  return Boolean(settings.playerId && state.lobbyOwnerId && settings.playerId === state.lobbyOwnerId);
}

function canManageServer() {
  return !state.lobbyOwnerId || isLobbyCommander();
}

function normalizeBotDifficulty(value, fallback = 5) {
  const legacy = { easy: 1, normal: 3, hard: 5 };
  const parsed = Object.prototype.hasOwnProperty.call(legacy, value) ? legacy[value] : Number(value);
  return Number.isFinite(parsed) ? Math.round(clamp(parsed, 0, 5)) : fallback;
}

function serverConfigSnapshot() {
  return {
    type: "potato-strike-server-config",
    version: 1,
    ...serverSettings,
    map: state.mapKey,
    matchSize: Number(settings.matchSize),
    fillMode: settings.fillMode,
    gameRules: state.ruleMode,
  };
}

function normalizeServerConfig(config = {}) {
  const source = config.serverConfig || config;
  const bool = (value, fallback) => value === undefined ? fallback : value === true || value === 1 || value === "1" || value === "true";
  return {
    hostname: String(source.hostname || serverSettings.hostname).slice(0, 64),
    svLan: bool(source.svLan, serverSettings.svLan),
    svCheats: bool(source.svCheats, serverSettings.svCheats),
    enemyMinimap: bool(source.enemyMinimap, serverSettings.enemyMinimap),
    maxPlayers: clamp(Number(source.maxPlayers ?? serverSettings.maxPlayers), 2, 20),
    freezeTime: clamp(Number(source.freezeTime ?? serverSettings.freezeTime), 0, 30),
    roundTime: clamp(Number(source.roundTime ?? serverSettings.roundTime), 15, 600),
    buyTime: clamp(Number(source.buyTime ?? serverSettings.buyTime), 0, 120),
    startMoney: clamp(Number(source.startMoney ?? serverSettings.startMoney), 0, 16000),
    botQuota: clamp(Number(source.botQuota ?? serverSettings.botQuota), 0, 19),
    fillTeamsWithBots: bool(source.fillTeamsWithBots, serverSettings.fillTeamsWithBots),
    botDifficulty: normalizeBotDifficulty(source.botDifficulty, serverSettings.botDifficulty),
    botStop: bool(source.botStop, serverSettings.botStop),
    gravity: clamp(Number(source.gravity ?? serverSettings.gravity), 100, 1600),
    friendlyFire: bool(source.friendlyFire, serverSettings.friendlyFire),
    teamDamageScale: clamp(Number(source.teamDamageScale ?? serverSettings.teamDamageScale), 0, 1),
    aimMode: ["none", "zoom", "sights"].includes(source.aimMode) ? source.aimMode : serverSettings.aimMode,
    gameRules: gameRulePresets[source.gameRules] ? source.gameRules : serverSettings.gameRules,
  };
}

function applyServerConfig(config, { quiet = false } = {}) {
  if (!canManageServer()) {
    if (!quiet) showMessage("Tylko dowodca moze zmienic server config");
    return false;
  }
  Object.assign(serverSettings, normalizeServerConfig(config));
  if (config.map && maps[config.map]) {
    state.mapKey = config.map;
    state.map = normalizeMap(maps[config.map]);
    hud.menuMap.value = config.map;
  }
  if (config.matchSize) {
    settings.matchSize = clamp(Number(config.matchSize), 1, Math.floor(serverSettings.maxPlayers / 2));
    hud.matchSize.value = String(settings.matchSize);
  }
  if (config.fillMode) settings.fillMode = config.fillMode;
  settings.difficulty = serverSettings.botDifficulty;
  applyGameRulePreset(config.gameRules || serverSettings.gameRules || settings.gameRules);
  state.freezeTime = serverSettings.freezeTime;
  state.roundTime = serverSettings.roundTime;
  state.buyTime = serverSettings.buyTime;
  syncServerControls();
  saveConfig();
  if (!quiet) showMessage("Server config zastosowany");
  return true;
}

function syncServerControls() {
  if (!hud.serverHostname) return;
  const editable = canManageServer();
  hud.serverHostname.value = serverSettings.hostname;
  hud.serverMaxplayers.value = String(serverSettings.maxPlayers);
  hud.serverBotDifficulty.value = String(serverSettings.botDifficulty);
  hud.serverFillBots.checked = serverSettings.fillTeamsWithBots;
  hud.serverBotQuota.value = String(serverSettings.botQuota);
  hud.serverBuyTime.value = String(serverSettings.buyTime);
  hud.serverFreezeTime.value = String(serverSettings.freezeTime);
  hud.serverRoundTime.value = String(serverSettings.roundTime);
  hud.serverStartMoney.value = String(serverSettings.startMoney);
  hud.serverGravity.value = String(serverSettings.gravity);
  hud.serverFriendlyFire.checked = serverSettings.friendlyFire;
  hud.serverTeamDamage.value = String(Math.round(serverSettings.teamDamageScale * 100));
  hud.serverEnemyMinimap.checked = serverSettings.enemyMinimap;
  hud.serverCheats.checked = serverSettings.svCheats;
  hud.serverAimMode.value = serverSettings.aimMode;
  for (const control of [hud.serverHostname, hud.serverMaxplayers, hud.serverBotDifficulty, hud.serverFillBots, hud.serverBuyTime, hud.serverFreezeTime, hud.serverRoundTime, hud.serverStartMoney, hud.serverGravity, hud.serverFriendlyFire, hud.serverTeamDamage, hud.serverEnemyMinimap, hud.serverCheats, hud.serverAimMode, hud.serverApply, hud.serverImport]) {
    if (control) control.disabled = !editable;
  }
  hud.serverBotQuota.disabled = !editable || !serverSettings.fillTeamsWithBots;
  if (hud.networkStatus) {
    const owner = state.lobbyOwnerId || settings.playerId;
    const role = editable ? "dowodca" : "gracz";
    hud.networkStatus.textContent = `${serverSettings.hostname} / ${role} / owner ${owner || "--"} / ${networkSync.connected ? "LAN online" : "lokalny fallback"}`;
  }
}

function serverConfigFromControls() {
  return {
    ...serverConfigSnapshot(),
    hostname: hud.serverHostname.value,
    maxPlayers: Number(hud.serverMaxplayers.value),
    botDifficulty: Number(hud.serverBotDifficulty.value),
    fillTeamsWithBots: hud.serverFillBots.checked,
    botQuota: Number(hud.serverBotQuota.value),
    buyTime: Number(hud.serverBuyTime.value),
    freezeTime: Number(hud.serverFreezeTime.value),
    roundTime: Number(hud.serverRoundTime.value),
    startMoney: Number(hud.serverStartMoney.value),
    gravity: Number(hud.serverGravity.value),
    friendlyFire: hud.serverFriendlyFire.checked,
    teamDamageScale: Number(hud.serverTeamDamage.value) / 100,
    enemyMinimap: hud.serverEnemyMinimap.checked,
    svCheats: hud.serverCheats.checked,
    aimMode: hud.serverAimMode.value,
  };
}

function parseCfgText(source) {
  const result = {};
  const map = {
    hostname: "hostname", sv_lan: "svLan", sv_cheats: "svCheats", mp_show_enemy_minimap: "enemyMinimap",
    maxplayers: "maxPlayers", mp_freezetime: "freezeTime", mp_roundtime: "roundTime", mp_roundtime_defuse: "roundTime",
    mp_buytime: "buyTime", mp_startmoney: "startMoney", bot_quota: "botQuota", bot_difficulty: "botDifficulty",
    bot_stop: "botStop", sv_gravity: "gravity", mp_friendlyfire: "friendlyFire", mp_friendlyfire_damage_reduction: "teamDamageScale", mp_aim_mode: "aimMode", game_mode: "gameRules",
  };
  for (const line of String(source).split(/\r?\n/)) {
    const tokens = line.trim().match(/"[^"]*"|'[^']*'|[^\s]+/g) || [];
    if (!tokens.length || tokens[0].startsWith("//") || tokens[0].startsWith("#")) continue;
    const key = map[tokens[0].toLowerCase()];
    if (key) result[key] = (tokens.slice(1).join(" ") || "").replace(/^["']|["']$/g, "");
  }
  return result;
}

async function importServerConfigFile() {
  const file = hud.serverConfigFile.files[0];
  if (!file) return;
  try {
    const source = await file.text();
    const config = file.name.toLowerCase().endsWith(".cfg") ? parseCfgText(source) : JSON.parse(source);
    applyServerConfig(config);
    localStorage.setItem("potatoStrikeServerConfig", JSON.stringify(serverConfigSnapshot()));
    localStorage.setItem("potatoStrikeCfg:server", JSON.stringify(serverConfigSnapshot()));
  } catch (error) {
    showMessage(`Niepoprawny server config: ${error.message}`);
  }
  hud.serverConfigFile.value = "";
}

async function saveServerConfigRemote() {
  if (state.gameMode !== "lan") return false;
  try {
    const response = await fetch(`${serverAudioBase()}/api/server-config`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ room: hud.lanRoom.value, playerId: settings.playerId, config: serverConfigSnapshot() }),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    networkSync.connected = true;
    return true;
  } catch {
    networkSync.connected = false;
    return false;
  }
}

async function syncLanHeartbeat(force = false) {
  if (state.gameMode !== "lan" || !state.running) return;
  const now = performance.now();
  if (!force && now - networkSync.lastHeartbeat < 2000) return;
  networkSync.lastHeartbeat = now;
  try {
    const response = await fetch(`${serverAudioBase()}/api/heartbeat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ room: hud.lanRoom.value, playerId: settings.playerId, name: settings.nick, team: state.team }),
    });
    if (!response.ok) throw new Error();
    const payload = await response.json();
    state.lobbyOwnerId = payload.ownerId || state.lobbyOwnerId || settings.playerId;
    networkSync.ownerId = state.lobbyOwnerId;
    networkSync.connected = true;
    if (payload.config && !isLobbyCommander()) {
      Object.assign(serverSettings, normalizeServerConfig(payload.config));
      applyGameRulePreset(serverSettings.gameRules);
    } else if (!payload.config && isLobbyCommander()) saveServerConfigRemote();
  } catch {
    networkSync.connected = false;
  }
  syncServerControls();
}

function applyLobbyConfig(config) {
  if (!config || typeof config !== "object") return;
  Object.assign(serverSettings, normalizeServerConfig(config));
  if (config.map && maps[config.map]) {
    state.mapKey = config.map;
    hud.menuMap.value = config.map;
  }
  if (config.matchSize) {
    settings.matchSize = clamp(Number(config.matchSize), 1, 10);
    hud.matchSize.value = String(settings.matchSize);
  }
  if (config.fillMode) {
    settings.fillMode = config.fillMode;
    hud.fillMode.value = config.fillMode;
  }
  applyGameRulePreset(config.gameRules || serverSettings.gameRules || "classic");
  syncServerControls();
}

async function lanLobbyRequest(action, extra = {}) {
  const response = await fetch(`${serverAudioBase()}/api/lobby`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      action,
      room: lobbySession.room || hud.lanRoom.value,
      playerId: settings.playerId,
      name: settings.nick,
      team: state.team,
      ...extra,
    }),
  });
  if (!response.ok) {
    const error = new Error((await response.text()) || `HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

function renderLanLobby(payload = {}) {
  lobbySession.players = Array.isArray(payload.players) ? payload.players : lobbySession.players;
  lobbySession.bans = Array.isArray(payload.bans) ? payload.bans : lobbySession.bans;
  lobbySession.status = payload.status || lobbySession.status;
  lobbySession.startedAt = Number(payload.startedAt) || lobbySession.startedAt;
  state.lobbyOwnerId = payload.ownerId || state.lobbyOwnerId;
  networkSync.ownerId = state.lobbyOwnerId;
  networkSync.connected = true;
  if (payload.config && !isLobbyCommander()) applyLobbyConfig(payload.config);
  const owner = lobbySession.players.find((entry) => entry.playerId === state.lobbyOwnerId);
  hud.lanLobbyRoom.textContent = lobbySession.room || hud.lanRoom.value;
  hud.lanLobbyStatus.textContent = lobbySession.status === "started"
    ? (settings.language === "en" ? "Match starting" : "Mecz startuje")
    : (settings.language === "en" ? "Waiting for players" : "Oczekiwanie na graczy");
  hud.lanLobbyOwner.textContent = owner?.name || state.lobbyOwnerId || "--";
  hud.lanLobbyPlayers.innerHTML = "";
  for (const entry of lobbySession.players) {
    const row = document.createElement("div");
    row.className = "lan-player-row";
    const name = document.createElement("strong");
    name.textContent = `${entry.name || "Potato"} / ${entry.playerId}`;
    const role = document.createElement("span");
    role.className = "tag";
    role.textContent = entry.playerId === state.lobbyOwnerId ? (settings.language === "en" ? "COMMANDER" : "DOWODCA") : (entry.team || "T");
    row.append(name, role);
    if (isLobbyCommander() && entry.playerId !== state.lobbyOwnerId) {
      const actions = document.createElement("div");
      actions.className = "lan-player-actions";
      for (const [action, label] of [["kick", "Kick"], ["ban", "Ban"]]) {
        const button = document.createElement("button");
        button.className = "secondary";
        button.textContent = label;
        button.addEventListener("click", () => manageLanPlayer(action, entry.playerId, entry.name));
        actions.appendChild(button);
      }
      row.appendChild(actions);
    }
    hud.lanLobbyPlayers.appendChild(row);
  }
  hud.lanLobbyBans.innerHTML = "";
  for (const entry of lobbySession.bans) {
    const row = document.createElement("div");
    row.className = "lan-player-row";
    const name = document.createElement("strong");
    name.textContent = entry.name || entry.playerId;
    const id = document.createElement("span");
    id.className = "tag";
    id.textContent = entry.playerId;
    row.append(name, id);
    if (isLobbyCommander()) {
      const button = document.createElement("button");
      button.className = "secondary";
      button.textContent = "Unban";
      button.addEventListener("click", () => manageLanPlayer("unban", entry.playerId, entry.name));
      row.appendChild(button);
    }
    hud.lanLobbyBans.appendChild(row);
  }
  if (!lobbySession.bans.length) hud.lanLobbyBans.textContent = settings.language === "en" ? "No bans" : "Brak banow";
  hud.lanTransferTarget.innerHTML = "";
  for (const entry of lobbySession.players.filter((playerEntry) => playerEntry.playerId !== settings.playerId)) {
    const option = document.createElement("option");
    option.value = entry.playerId;
    option.textContent = `${entry.name || "Potato"} / ${entry.playerId}`;
    hud.lanTransferTarget.appendChild(option);
  }
  const commander = isLobbyCommander();
  hud.lanLobbyStart.disabled = !commander || lobbySession.status === "started";
  hud.lanLobbyTransfer.disabled = !commander || !hud.lanTransferTarget.options.length;
  hud.lanLobbyAddPlayer.disabled = !commander;
  syncServerControls();
}

async function manageLanPlayer(action, targetId, targetName = "") {
  if (!isLobbyCommander()) return showMessage("Tylko dowodca moze zarzadzac graczami");
  try {
    renderLanLobby(await lanLobbyRequest(action, { targetId, targetName }));
    showMessage(`LAN: ${action} ${targetName || targetId}`);
  } catch (error) {
    showMessage(`LAN: ${error.message}`);
  }
}

function openLanSetup(hosting) {
  if (!lobbySession.active) {
    state.lobbyOwnerId = "";
    networkSync.ownerId = "";
  }
  lobbySession.hosting = hosting;
  hud.serverHost.classList.toggle("hidden", !hosting);
  hud.serverJoin.classList.toggle("hidden", hosting);
  syncServerControls();
  togglePanel(hud.networkPanel);
  setTimeout(() => (hosting ? hud.serverHostname : hud.lanRoom).focus(), 0);
}

function renderLanServerList(servers = []) {
  hud.lanBrowserList.innerHTML = "";
  for (const server of servers) {
    const row = document.createElement("div");
    row.className = "lan-server-row";
    const identity = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = server.config?.hostname || server.room || "Potato LAN";
    const room = document.createElement("div");
    room.className = "muted";
    room.textContent = `${settings.language === "en" ? "Room" : "Pokoj"}: ${server.room}`;
    identity.append(name, room);
    const players = document.createElement("span");
    players.className = "tag";
    players.textContent = `${server.players?.length || 0}/${server.config?.maxPlayers || 10} ${settings.language === "en" ? "players" : "graczy"}`;
    const status = document.createElement("span");
    status.className = "tag";
    status.textContent = server.status === "started" ? (settings.language === "en" ? "IN GAME" : "W GRZE") : (settings.language === "en" ? "WAITING" : "OCZEKUJE");
    const join = document.createElement("button");
    join.textContent = settings.language === "en" ? "JOIN" : "DOLACZ";
    join.disabled = server.status === "started" || (server.players?.length || 0) >= (server.config?.maxPlayers || 10);
    join.addEventListener("click", async () => {
      hud.serverUrl.value = hud.lanBrowserAddress.value.trim() || "ws://localhost:8787";
      hud.lanRoom.value = server.room;
      await openLanLobby(false);
    });
    row.append(identity, players, status, join);
    hud.lanBrowserList.appendChild(row);
  }
  if (!servers.length) hud.lanBrowserList.textContent = settings.language === "en" ? "No active LAN servers." : "Brak aktywnych serwerow LAN pod tym adresem.";
}

async function refreshLanServerBrowser() {
  hud.lanBrowserRefresh.disabled = true;
  hud.lanBrowserStatus.textContent = settings.language === "en" ? "Searching..." : "Pobieranie listy serwerow...";
  hud.serverUrl.value = hud.lanBrowserAddress.value.trim() || "ws://localhost:8787";
  try {
    const response = await fetch(`${serverAudioBase()}/api/rooms`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const servers = await response.json();
    renderLanServerList(Array.isArray(servers) ? servers : []);
    hud.lanBrowserStatus.textContent = `${Array.isArray(servers) ? servers.length : 0} ${settings.language === "en" ? "active servers" : "aktywnych serwerow"} / ${new Date().toLocaleTimeString()}`;
  } catch (error) {
    renderLanServerList([]);
    hud.lanBrowserStatus.textContent = `${settings.language === "en" ? "Cannot load the server list" : "Nie mozna pobrac listy"}: ${error.message}`;
  } finally {
    hud.lanBrowserRefresh.disabled = false;
  }
}

function openLanServerBrowser() {
  hud.lanBrowserAddress.value = hud.serverUrl.value || "ws://localhost:8787";
  closePanels();
  state.overlayOpen = true;
  hud.lanBrowserPanel.classList.remove("hidden");
  refreshLanServerBrowser();
}

async function openLanLobby(hosting) {
  if (lobbySession.active) {
    closePanels();
    state.overlayOpen = true;
    hud.lanLobbyPanel.classList.remove("hidden");
    renderLanLobby();
    return;
  }
  ensurePlayerId();
  settings.nick = hud.playerName.value.trim() || settings.nick || "Potato";
  hud.menuMode.value = "lan";
  state.gameMode = "lan";
  state.running = false;
  lobbySession.room = hud.lanRoom.value.trim() || "potato-lan";
  lobbySession.hosting = hosting;
  lobbySession.launching = false;
  try {
    const payload = await lanLobbyRequest(hosting ? "create" : "join", hosting ? { config: serverConfigSnapshot() } : {});
    lobbySession.active = true;
    closePanels();
    state.overlayOpen = true;
    hud.lanLobbyPanel.classList.remove("hidden");
    renderLanLobby(payload);
    showMessage(hosting ? "Serwer LAN utworzony" : "Dolaczono do poczekalni LAN");
  } catch (error) {
    lobbySession.active = false;
    networkSync.connected = false;
    showMessage(`LAN: ${error.message}`);
  }
}

async function pollLanLobby(force = false) {
  if (!lobbySession.active || state.running || lobbySession.launching) return;
  const now = performance.now();
  if (!force && now - lobbySession.lastPoll < 1800) return;
  lobbySession.lastPoll = now;
  try {
    const payload = await lanLobbyRequest("join");
    renderLanLobby(payload);
    if (payload.status === "started" && Number(payload.startedAt) > 0) launchLanLobbyMatch(payload);
  } catch (error) {
    networkSync.connected = false;
    if (error.status === 403) {
      lobbySession.active = false;
      closePanels();
      hud.menu.classList.remove("hidden");
      showMessage(`LAN: ${error.message}`);
      return;
    }
    hud.lanLobbyStatus.textContent = settings.language === "en" ? "Server unavailable" : "Serwer niedostepny";
  }
}

function prepareLanMatchConfig() {
  settings.matchSize = Number(hud.matchSize.value);
  settings.fillMode = hud.fillMode.value;
  state.mapKey = hud.menuMap.value;
  applyGameRulePreset(hud.gameRules.value, false);
  serverSettings.gameRules = state.ruleMode;
  return serverConfigSnapshot();
}

async function startLanLobbyMatch() {
  if (!isLobbyCommander()) return showMessage("Tylko dowodca moze rozpoczac mecz");
  try {
    const payload = await lanLobbyRequest("start", { config: prepareLanMatchConfig() });
    renderLanLobby(payload);
    launchLanLobbyMatch(payload);
  } catch (error) {
    showMessage(`LAN: ${error.message}`);
  }
}

function launchLanLobbyMatch(payload) {
  if (lobbySession.launching) return;
  lobbySession.launching = true;
  applyLobbyConfig(payload.config);
  closePanels();
  state.running = true;
  mouse.x = window.innerWidth / 2;
  mouse.y = window.innerHeight / 2;
  newMatch({ preserveLobbyOwner: true });
  renderGameView();
  hud.menu.classList.add("hidden");
  showMessage(`LAN / ${lobbySession.players.length} graczy / ${isLobbyCommander() ? "dowodca" : "gracz"}`);
}

async function leaveLanLobby() {
  try { await lanLobbyRequest("leave"); } catch { /* leaving a stopped server is still local */ }
  lobbySession.active = false;
  lobbySession.launching = false;
  lobbySession.players = [];
  state.running = false;
  state.lobbyOwnerId = "";
  closePanels();
  hud.menu.classList.remove("hidden");
  syncMenuAimMode();
}

function openOwnerConsole() {
  if (!isLobbyCommander()) {
    showMessage("Tylko dowodca lobby moze otworzyc konsole");
    return;
  }
  togglePanel(hud.consolePanel);
}

function savedStoryMissions() {
  try {
    return JSON.parse(localStorage.getItem("potatoStrikeMissions") || "[]");
  } catch {
    return [];
  }
}

function defaultStoryGoal() {
  return { type: "eliminate", target: 1, text: "Wyeliminuj wszystkich wrogow", hint: "Trzymaj sie z druzyna i oczyszczaj mape sektorami.", code: "return ctx.enemiesAlive <= 0;" };
}

function normalizeStoryGoal(goal = {}) {
  const fallback = defaultStoryGoal();
  return {
    ...fallback,
    ...goal,
    type: goal.type || fallback.type,
    target: Math.max(1, Number(goal.target || fallback.target)),
    text: goal.text || fallback.text,
    hint: goal.hint || "",
    code: goal.code || "",
  };
}

function activeStoryGoal() {
  return normalizeStoryGoal(state.storyMission?.goal || state.map?.meta?.storyGoal || defaultStoryGoal());
}

function storyContext() {
  return {
    player,
    state,
    map: state.map,
    bomb: state.bomb,
    goal: activeStoryGoal(),
    enemiesAlive: bots.filter((bot) => bot.hp > 0).length,
    alliesAlive: allies.filter((bot) => bot.hp > 0).length + (player.alive ? 1 : 0),
    kills: player.kills,
    roundKills: player.roundKills,
    plants: player.plants,
    defuses: player.defuses,
  };
}

function runStoryGoalCode(goal) {
  if (!goal.code?.trim()) return false;
  try {
    return Boolean(Function("ctx", `"use strict";\n${goal.code}`)(storyContext()));
  } catch (error) {
    showMessage(`Blad kodu celu: ${error?.message || "unknown"}`);
    return false;
  }
}

function storyGoalProgress(goal = activeStoryGoal()) {
  if (goal.type === "kills") return player.kills;
  if (goal.type === "plant") return player.plants;
  if (goal.type === "defuse") return player.defuses;
  if (goal.type === "win") return state.score[state.team] || 0;
  if (goal.type === "eliminate") return goal.target - bots.filter((bot) => bot.hp > 0).length;
  return runStoryGoalCode(goal) ? goal.target : 0;
}

function isStoryGoalComplete(reason = "") {
  if (state.gameMode !== "story" || state.storyComplete) return false;
  const goal = activeStoryGoal();
  if (goal.code?.trim() && runStoryGoalCode(goal)) return true;
  if (goal.type === "plant") return player.plants >= goal.target || reason === "plant";
  if (goal.type === "defuse") return player.defuses >= goal.target || reason === "defuse";
  if (goal.type === "kills") return player.kills >= goal.target;
  if (goal.type === "win") return state.score[state.team] >= goal.target || reason === "win";
  return bots.every((bot) => bot.hp <= 0);
}

function renderStoryObjective() {
  if (!hud.storyObjectiveText) return;
  const goal = activeStoryGoal();
  const progress = clamp(storyGoalProgress(goal), 0, goal.target);
  hud.storyObjectiveText.textContent = `${goal.text} (${progress}/${goal.target})`;
}

function showStoryObjective(force = false) {
  if (state.gameMode !== "story") return false;
  renderStoryObjective();
  if (force) hud.storyObjectivePanel?.classList.remove("hidden");
  else hud.storyObjectivePanel?.classList.toggle("hidden");
  return true;
}

function checkStoryObjective(reason = "") {
  if (!isStoryGoalComplete(reason)) return false;
  state.storyComplete = true;
  renderStoryObjective();
  showMessage("Cel fabularny wykonany");
  if (state.phase === "live") endRound(state.team, "cel fabularny wykonany");
  return true;
}

function userMaps() {
  try {
    return JSON.parse(localStorage.getItem("potatoStrikeUserMaps") || "[]");
  } catch {
    return [];
  }
}

function writeUserMaps(list) {
  localStorage.setItem("potatoStrikeUserMaps", JSON.stringify(list));
}

function registerUserMap(map, id = `map-${Date.now().toString(36)}`) {
  const list = userMaps().filter((item) => item.id !== id);
  const record = { id, map: JSON.parse(JSON.stringify(map)) };
  record.map = normalizeMap(record.map);
  list.push(record);
  writeUserMaps(list);
  maps[id] = record.map;
  if (![...hud.menuMap.options].some((option) => option.value === id)) {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = record.map.name || id;
    hud.menuMap.appendChild(option);
  }
  saveConfig();
  return id;
}

function loadUserMapsFromStorage() {
  for (const item of userMaps()) {
    if (!item?.id || !item?.map) continue;
    maps[item.id] = normalizeMap(item.map);
    if (![...hud.menuMap.options].some((option) => option.value === item.id)) {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.map.name || item.id;
      hud.menuMap.appendChild(option);
    }
  }
}

function loadStudioTestMap() {
  const params = new URLSearchParams(window.location.search);
  if (!params.has("studioTest")) return false;
  try {
    const testMap = JSON.parse(localStorage.getItem("potatoStrikeStudioTestMap") || "null");
    if (!testMap?.obstacles) return false;
    const studioTextures = JSON.parse(localStorage.getItem("potatoStrikeStudioTextures") || "[]");
    if (Array.isArray(studioTextures)) {
      const merged = new Map(customTextures.map((texture) => [texture.id, texture]));
      for (const texture of studioTextures) if (texture?.id) merged.set(texture.id, texture);
      customTextures.splice(0, customTextures.length, ...merged.values());
    }
    maps.studioTest = normalizeMap(testMap);
    if (![...hud.menuMap.options].some((option) => option.value === "studioTest")) {
      const option = document.createElement("option");
      option.value = "studioTest";
      option.textContent = `Studio test: ${testMap.name || "Map"}`;
      hud.menuMap.appendChild(option);
    }
    hud.menuMap.value = "studioTest";
    hud.menuGraphics.value = normalizeGraphicsMode(testMap.meta?.testGraphics || "2d");
    hud.menuMode.value = "offline";
    if (testMap.meta?.matchSize) hud.matchSize.value = String(testMap.meta.matchSize);
    hud.menu.classList.add("hidden");
    closePanels();
    state.running = true;
    mouse.x = window.innerWidth / 2;
    mouse.y = window.innerHeight / 2;
    newMatch();
    applyStudioTestMeta(testMap.meta || {});
    showMessage("Test mapy ze Studio");
    return true;
  } catch {
    state.running = false;
    hud.menu.classList.remove("hidden");
    showMessage("Nie udalo sie zaladowac testu Studio");
    return false;
  }
}

function isStudioTestLaunch() {
  return new URLSearchParams(window.location.search).has("studioTest");
}

function ensureNormalBootMenu() {
  if (isStudioTestLaunch()) return;
  state.running = false;
  state.paused = false;
  state.overlayOpen = false;
  hud.menu.classList.remove("hidden");
  hud.pausePanel?.classList.add("hidden");
}

function applyStudioTestMeta(meta) {
  const studioRule = meta.gameMode === "defuse" ? "classic" : meta.gameMode;
  if (gameRulePresets[studioRule]) {
    applyGameRulePreset(studioRule);
    resetRoundPositions();
    spawnBots();
  }
  if (meta.defaultWeapon && meta.defaultWeapon !== "side-default") {
    const weapon = weapons.find((item) => item.name === meta.defaultWeapon);
    if (weapon) {
      weapon.owned = true;
      weapon.ammo = weapon.magSize;
      weapon.currentReserve = weapon.reserve;
      player.weaponId = weapon.id;
      showMessage(`Studio weapon: ${weapon.name}`);
    }
  }
}

function restoreUserContent(config) {
  if (config.serverConfig) Object.assign(serverSettings, normalizeServerConfig(config.serverConfig));
  const mapList = config.userMaps || [];
  writeUserMaps(mapList);
  for (const item of mapList) {
    maps[item.id] = normalizeMap(item.map);
    if (![...hud.menuMap.options].some((option) => option.value === item.id)) {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.map.name || item.id;
      hud.menuMap.appendChild(option);
    }
  }
  if (config.storyMissions) writeStoryMissions(config.storyMissions);
  customTextures.splice(0, customTextures.length, ...(config.customTextures || []));
  removedDefaultModIds.splice(0, removedDefaultModIds.length, ...(config.removedDefaultMods || []));
  loadedMods.splice(0, loadedMods.length, ...(config.mods || []).map(normalizeMod));
  renderAssetList();
}

function writeStoryMissions(list) {
  localStorage.setItem("potatoStrikeMissions", JSON.stringify(list));
}

function renderSavedMissions() {
  hud.savedMissions.innerHTML = "";
  for (const mission of savedStoryMissions()) {
    const item = document.createElement("div");
    item.className = "mission-item";
    const goal = normalizeStoryGoal(mission.goal);
    item.innerHTML = `<div class="mission-title"><span>${mission.name}</span><span class="tag">${goal.type} ${goal.target}</span></div><div>${goal.text}</div><div>${mission.map.name} / ${mission.map.obstacles.length} obiektow</div>`;
    item.addEventListener("click", () => {
      editor.selectedMission = mission.id;
      showMessage(`Wybrano misje: ${mission.name}`);
    });
    hud.savedMissions.appendChild(item);
  }
}

function saveEditorMission() {
  const list = savedStoryMissions();
  const goal = normalizeStoryGoal({
    type: hud.editorGoal.value,
    target: Number(hud.editorTarget.value || 1),
    text: hud.editorObjectiveText?.value || "",
    code: hud.editorGoalCode?.value || "",
  });
  const map = JSON.parse(JSON.stringify(state.map));
  map.meta = { ...(map.meta || {}), storyGoal: goal };
  const mission = {
    id: `mission-${Date.now().toString(36)}`,
    name: hud.editorName.value || "Moja misja",
    goal,
    map,
  };
  list.push(mission);
  writeStoryMissions(list);
  registerUserMap(mission.map, `story-map-${mission.id}`);
  renderSavedMissions();
  showMessage("Misja zapisana");
}

function loadEditorMission(id = editor.selectedMission) {
  const mission = savedStoryMissions().find((item) => item.id === id);
  if (!mission) return showMessage("Najpierw wybierz misje");
  maps.story = JSON.parse(JSON.stringify(mission.map));
  maps.story.name = mission.name;
  maps.story.meta = { ...(maps.story.meta || {}), storyGoal: normalizeStoryGoal(mission.goal) };
  state.storyMission = mission;
  if (![...hud.menuMap.options].some((option) => option.value === "story")) {
    const option = document.createElement("option");
    option.value = "story";
    option.textContent = "Story mission";
    hud.menuMap.appendChild(option);
  }
  hud.menuMode.value = "story";
  hud.menuMap.value = "story";
  showMessage(`Zaladowano: ${mission.name}`);
}

function newEditorMap() {
  maps.editor = JSON.parse(JSON.stringify(maps.custom));
  maps.editor.name = hud.editorName.value || "Editor Map";
  state.map = maps.editor;
  state.mapKey = "editor";
  editor.active = true;
  showMessage("Edytor map aktywny");
}

function logCommand(text) {
  const line = document.createElement("div");
  line.textContent = text;
  hud.commandLog.prepend(line);
}

const consoleCvars = {
  hostname: ["hostname", "string"],
  sv_lan: ["svLan", "bool"],
  sv_cheats: ["svCheats", "bool"],
  sv_gravity: ["gravity", "number", 100, 1600],
  mp_show_enemy_minimap: ["enemyMinimap", "bool"],
  mp_friendlyfire: ["friendlyFire", "bool"],
  mp_friendlyfire_damage_reduction: ["teamDamageScale", "number", 0, 1],
  mp_freezetime: ["freezeTime", "number", 0, 30],
  mp_roundtime: ["roundTime", "number", 15, 600],
  mp_roundtime_defuse: ["roundTime", "number", 15, 600],
  mp_buytime: ["buyTime", "number", 0, 120],
  mp_startmoney: ["startMoney", "number", 0, 16000],
  bot_quota: ["botQuota", "number", 0, 19],
  bot_difficulty: ["botDifficulty", "difficulty"],
  bot_stop: ["botStop", "bool"],
  mp_aim_mode: ["aimMode", "aimMode"],
  game_mode: ["gameRules", "gameRules"],
};

const consoleCommands = [
  "help", "cmdlist", "cvarlist", "status", "version", "echo", "clear", "exec", "writecfg",
  "map", "changelevel", "maps", "map_generate", "mp_restartgame", "bot_add", "bot_add_t", "bot_add_ct", "bot_kick",
  "pause", "resume", "getpos", "getpos_exact", "setpos", "give", "give_money", "impulse", "god", "noclip", "notarget",
  "bind", "unbind", "key_listboundkeys",
];

function consoleTokens(source) {
  return (String(source).match(/"[^"]*"|'[^']*'|[^\s]+/g) || []).map((token) => token.replace(/^["']|["']$/g, ""));
}

function consoleBool(value) {
  return value === "1" || value === "true" || value === "on";
}

function requireCheats(command) {
  if (serverSettings.svCheats) return true;
  logCommand(`${command}: sv_cheats 1 required`);
  return false;
}

function setConsoleCvar(command, value) {
  const [key, type, min, max] = consoleCvars[command];
  if (value === undefined) {
    logCommand(`\"${command}\" = \"${serverSettings[key]}\"`);
    return;
  }
  if (type === "bool") serverSettings[key] = consoleBool(String(value).toLowerCase());
  else if (type === "number") serverSettings[key] = clamp(Number(value), min, max);
  else if (type === "difficulty") serverSettings[key] = normalizeBotDifficulty(value);
  else if (type === "aimMode") serverSettings[key] = ["none", "zoom", "sights"].includes(value) ? value : "sights";
  else if (type === "gameRules") serverSettings[key] = gameRulePresets[value] ? value : "classic";
  else serverSettings[key] = String(value).slice(0, 64);
  settings.difficulty = serverSettings.botDifficulty;
  if (key === "freezeTime") state.freezeTime = serverSettings.freezeTime;
  if (key === "roundTime") state.roundTime = serverSettings.roundTime;
  if (key === "buyTime") state.buyTime = serverSettings.buyTime;
  if (key === "botQuota") {
    settings.matchSize = clamp(serverSettings.botQuota, 1, 10);
    hud.matchSize.value = String(settings.matchSize);
  }
  if (key === "gameRules") applyGameRulePreset(serverSettings.gameRules);
  syncServerControls();
  saveConfig();
  saveServerConfigRemote();
  logCommand(`\"${command}\" changed to \"${serverSettings[key]}\"`);
}

function giveConsoleWeapon(name) {
  const normalized = String(name || "").replace(/^weapon_/, "").replace(/_/g, "").toLowerCase();
  const weapon = weapons.find((item) => item.name.replace(/[-\s]/g, "").toLowerCase() === normalized);
  if (!weapon) return logCommand(`give: unknown weapon ${name || ""}`);
  weapon.owned = true;
  weapon.ammo = weapon.magSize;
  weapon.currentReserve = weapon.reserve;
  player.weaponId = weapon.id;
  state.activeSpecial = "";
  mouse.rightDown = false;
  logCommand(`gave ${weapon.name}`);
}

function executeOwnerCommand(source) {
  const parts = consoleTokens(source);
  const command = (parts.shift() || "").toLowerCase();
  if (!command) return;
  if (consoleCvars[command]) return setConsoleCvar(command, parts.join(" ") || undefined);
  if (command === "help" || command === "cmdlist") return logCommand(`commands: ${consoleCommands.join(", ")}`);
  if (command === "cvarlist") return logCommand(`cvars: ${Object.keys(consoleCvars).join(", ")}`);
  if (command === "status") return logCommand(`${serverSettings.hostname} | owner ${state.lobbyOwnerId} | ${state.gameMode} | ${state.map.name} | T ${state.score.T}:${state.score.CT} CT | bots ${bots.length + allies.length}`);
  if (command === "version") return logCommand("Potato Strike V1.4 FINAL PATCH-1.0 / console protocol 2");
  if (command === "echo") return logCommand(parts.join(" "));
  if (command === "clear") { hud.commandLog.innerHTML = ""; return; }
  if (command === "pause") { setPaused(true); return logCommand("paused"); }
  if (command === "resume") { setPaused(false); return logCommand("resumed"); }
  if (command === "mp_restartgame") { newMatch(); return logCommand("game restarted"); }
  if (command === "map_generate") { generateMapFromMenu(); return logCommand("generated map ready"); }
  if (command === "maps") return logCommand(`maps: ${Object.keys(maps).join(", ")}`);
  if (command === "map" || command === "changelevel") {
    const mapKey = parts[0];
    if (!maps[mapKey]) return logCommand(`map not found: ${mapKey || ""}`);
    hud.menuMap.value = mapKey;
    state.mapKey = mapKey;
    state.map = normalizeMap(maps[mapKey]);
    newMatch();
    return logCommand(`loaded ${mapKey}`);
  }
  if (command === "bot_kick") { bots.length = 0; allies.length = 0; renderTeams(); return logCommand("all bots kicked"); }
  if (["bot_add", "bot_add_t", "bot_add_ct"].includes(command)) {
    const team = command === "bot_add_t" ? "T" : command === "bot_add_ct" ? "CT" : (bots.length <= allies.length ? state.enemyTeam : state.team);
    addTeamSlot(team === state.team ? "ally" : "enemy");
    serverSettings.botQuota = bots.length + allies.length;
    return logCommand(`${command}: added ${team} bot`);
  }
  if (command === "getpos" || command === "getpos_exact") return logCommand(`setpos ${player.x.toFixed(2)} ${player.y.toFixed(2)}; setang ${(player.angle * 180 / Math.PI).toFixed(2)}`);
  if (command === "setpos") {
    if (!requireCheats(command)) return;
    player.x = clamp(Number(parts[0]), player.r, state.map.w - player.r);
    player.y = clamp(Number(parts[1]), player.r, state.map.h - player.r);
    return logCommand(`position ${player.x.toFixed(1)} ${player.y.toFixed(1)}`);
  }
  if (command === "give_money") { player.money = clamp(Number(parts[0] || 16000), 0, 16000); return logCommand(`money ${player.money}`); }
  if (command === "give") { if (requireCheats(command)) giveConsoleWeapon(parts[0]); return; }
  if (command === "impulse") {
    if (!requireCheats(command) || parts[0] !== "101") return;
    player.hp = 100; player.armor = 100; player.helmet = true; player.money = 16000;
    for (const weapon of ownedWeapons()) { weapon.ammo = weapon.magSize; weapon.currentReserve = weapon.reserve; }
    return logCommand("impulse 101: health, armor, ammo, money");
  }
  if (["god", "noclip", "notarget"].includes(command)) {
    if (!requireCheats(command)) return;
    const key = `${command}Mode`;
    player[key] = parts[0] === undefined ? !player[key] : consoleBool(parts[0]);
    return logCommand(`${command} ${player[key] ? "ON" : "OFF"}`);
  }
  if (command === "writecfg") {
    const name = (parts[0] || "server").replace(/[^a-z0-9_-]/gi, "");
    localStorage.setItem(`potatoStrikeCfg:${name}`, JSON.stringify(serverConfigSnapshot()));
    return logCommand(`wrote cfg ${name}`);
  }
  if (command === "exec") {
    const name = (parts[0] || "server").replace(/\.cfg$/i, "");
    const stored = localStorage.getItem(`potatoStrikeCfg:${name}`);
    if (!stored) return logCommand(`couldn't exec ${name}.cfg`);
    applyServerConfig(JSON.parse(stored), { quiet: true });
    return logCommand(`exec ${name}.cfg`);
  }
  if (command === "key_listboundkeys") return logCommand(Object.entries(bindings).map(([action, key]) => `${key}=${action}`).join(" | "));
  if (command === "bind") {
    const [key, action] = parts;
    if (!key || !bindings[action]) return logCommand("usage: bind <KeyboardEvent.code> <action>");
    bindings[action] = key; saveConfig(); renderBinds(); return logCommand(`bound ${key} to ${action}`);
  }
  if (command === "unbind") {
    const key = parts[0];
    for (const action of Object.keys(bindings)) if (bindings[action] === key) bindings[action] = "";
    saveConfig(); renderBinds(); return logCommand(`unbound ${key}`);
  }
  logCommand(`unknown command: ${command}. Type help.`);
}

function runOwnerCommand() {
  if (!isLobbyCommander()) {
    logCommand("Brak uprawnien: tylko dowodca lobby");
    showMessage("Tylko dowodca lobby moze uzywac komend");
    return;
  }
  const source = hud.commandInput.value.trim();
  if (!source) return;
  logCommand(`] ${source}`);
  for (const command of source.split(";").map((item) => item.trim()).filter(Boolean)) executeOwnerCommand(command);
  hud.commandInput.value = "";
}

function setPaused(value) {
  if (state.gameMode === "lan" && !isLobbyCommander()) {
    showMessage("Tylko dowodca LAN moze wstrzymac mecz");
    return;
  }
  state.paused = value;
  hud.pausePanel.classList.toggle("hidden", !value);
  const lan = state.gameMode === "lan";
  for (const control of [hud.lanResumeMatch, hud.lanRestartRound, hud.lanRestartMatch, hud.lanRefereeSettings, hud.lanEndMatch, hud.lanRefereeNote]) control?.classList.toggle("hidden", !lan);
  hud.resumeGame.classList.toggle("hidden", lan);
  hud.pauseSettings.classList.toggle("hidden", lan);
  hud.pauseMenu.classList.toggle("hidden", lan);
  document.exitPointerLock?.();
}

function sideAllows(item, team = state.team) {
  return item.side === "BOTH" || item.side === team;
}

function equipmentPrice(item) {
  if (item.key === "helmet" && player.armor >= 100 && !player.helmet) return 350;
  return item.price;
}

function ownsEquipment(item) {
  return (item.key === "armor" && player.armor >= 100)
    || (item.key === "helmet" && player.armor >= 100 && player.helmet)
    || (item.key === "defuseKit" && player.defuseKit)
    || (item.key === "zeus" && player.zeus);
}

function defaultWeaponName(team) {
  return team === "T" ? "Glock-18" : "USP-S";
}

function activeWeapon() {
  return weapons[player.weaponId] || weapons[0];
}

function canHoldAim(weapon = activeWeapon()) {
  if (!isPerspectiveMode() || !player.alive || isBombSelected() || isGrenadeSelected() || weapon.melee || weapon.burstCapable || weapon.sandboxOnly) return false;
  return serverSettings.aimMode !== "none";
}

function showStoryHint() {
  if (state.gameMode !== "story") return showMessage(settings.language === "en" ? "Hints are available in Story mode" : "Podpowiedzi sa dostepne w trybie fabularnym");
  const goal = activeStoryGoal();
  const generated = {
    eliminate: "Sprawdz minimape, trzymaj oslony i eliminuj wrogow po jednym.",
    kills: "Szukaj bezpiecznych pojedynkow i kontroluj amunicje.",
    plant: "Wez bombe, wybierz bombsite i przytrzymaj E po wybraniu C4.",
    defuse: "Oczysc bombsite, podejdz do C4 i trzymaj E. Defuse kit skraca czas.",
    win: "Graj na czas i cel rundy; nie musisz szukac ostatniego fraga.",
  };
  showMessage(goal.hint || generated[goal.type] || goal.text);
  return true;
}

function isAimActive() {
  return mouse.rightDown && canHoldAim();
}

function isAwpScoped() {
  return isAimActive() && serverSettings.aimMode === "sights" && activeWeapon().name === "AWP";
}

function isIronSights() {
  return isAimActive() && serverSettings.aimMode === "sights" && activeWeapon().name !== "AWP";
}

function aimZoom() {
  if (isAwpScoped()) return 2.65;
  if (isIronSights()) return 1.32;
  if (isAimActive()) return 1.42;
  return 1;
}

function ownedWeapons() {
  return weapons.filter((weapon) => weapon.owned);
}

function playerHasBomb() {
  return state.bomb.status === "carried" && state.bomb.carrier === "player";
}

function isBombSelected() {
  return state.activeSpecial === "bomb" && playerHasBomb();
}

function selectedGrenadeName() {
  return state.activeSpecial.startsWith("grenade:") ? state.activeSpecial.slice("grenade:".length) : "";
}

function selectedGrenade() {
  const name = selectedGrenadeName();
  if (!name || (player.grenades[name] || 0) <= 0) return null;
  return grenadeCatalog.find((grenade) => grenade.name === name) || null;
}

function isGrenadeSelected() {
  return Boolean(selectedGrenade());
}

function weaponInventoryRank(weapon) {
  if (weapon.melee || weapon.category === "Melee") return 3;
  if (weapon.category === "Pistol") return 2;
  return 1;
}

function carriedItems() {
  const items = ownedWeapons()
    .sort((a, b) => weaponInventoryRank(a) - weaponInventoryRank(b) || a.id - b.id)
    .map((weapon) => ({ type: "weapon", weapon, label: weapon.name }));
  for (const grenade of grenadeCatalog) {
    const count = player.grenades[grenade.name] || 0;
    if (count > 0) items.push({ type: "grenade", grenade, label: `${grenade.name} x${count}` });
  }
  if (playerHasBomb()) items.push({ type: "bomb", label: "C4 Bomb" });
  return items;
}

function selectInventoryItem(item) {
  if (!item) return;
  state.grenadePrime = null;
  mouse.rightDown = false;
  if (item.type === "bomb") {
    state.activeSpecial = "bomb";
    showMessage("C4 Bomb");
  } else if (item.type === "grenade") {
    state.activeSpecial = `grenade:${item.grenade.name}`;
    showMessage(`${item.grenade.name} x${player.grenades[item.grenade.name] || 0}`);
  } else {
    state.activeSpecial = "";
    player.weaponId = item.weapon.id;
    showMessage(item.weapon.name);
  }
  emitAudioEvent("ui", { x: player.x, y: player.y }, false);
  updateHud();
}

function selectNextGrenade() {
  const items = carriedItems().filter((item) => item.type === "grenade");
  if (!items.length) return showMessage("Brak granatow");
  const active = selectedGrenadeName();
  const index = items.findIndex((item) => item.grenade.name === active);
  selectInventoryItem(items[(index + 1 + items.length) % items.length]);
}

function defaultWeaponId(team) {
  const name = defaultWeaponName(team);
  return weapons.find((weapon) => weapon.name === name)?.id || 0;
}

function knifeWeaponId() {
  return weapons.find((weapon) => weapon.melee || weapon.name === "Knife")?.id ?? defaultWeaponId(state.team);
}

function difficultyScale() {
  return [0.55, 0.7, 0.85, 1, 1.18, 1.35][normalizeBotDifficulty(settings.difficulty)];
}

function botRoundBudget(team) {
  if (isRespawnMode()) return 16000;
  if (state.ruleMode === "retake") return 5200;
  if (state.round <= 1) return 800;
  const base = 800 + Math.min(4200, (state.round - 1) * 850);
  const scoreBoost = Math.max(0, state.score[team] || 0) * 250;
  return Math.min(16000, base + scoreBoost);
}

function chooseAffordableWeapon(team, budget) {
  const defaultName = defaultWeaponName(team);
  const affordable = weapons
    .filter((weapon) => !weapon.melee && !weapon.sandboxOnly && weapon.category !== "Melee" && sideAllows(weapon, team) && weapon.price <= budget)
    .filter((weapon) => state.round > 1 || isRespawnMode() || state.ruleMode === "retake" || weapon.category === "Pistol")
    .sort((a, b) => b.price - a.price);
  if (!affordable.length) return weapons.find((weapon) => weapon.name === defaultName);
  const premium = affordable.filter((weapon) => weapon.price >= Math.min(budget, state.round <= 1 ? 650 : 1800));
  const pool = premium.length ? premium : affordable;
  return pool[Math.floor(Math.random() * pool.length)] || weapons.find((weapon) => weapon.name === defaultName);
}

function makeBotLoadout(team) {
  let money = botRoundBudget(team);
  const defaultWeapon = weapons.find((weapon) => weapon.name === defaultWeaponName(team));
  const weapon = chooseAffordableWeapon(team, money) || defaultWeapon;
  money -= weapon?.name === defaultWeaponName(team) ? 0 : weapon?.price || 0;
  const loadout = {
    money: Math.max(0, money),
    weapon: weapon?.name || defaultWeaponName(team),
    weaponId: weapon?.id ?? defaultWeapon?.id ?? 0,
    armor: 0,
    helmet: false,
    defuseKit: false,
    zeus: false,
    grenades: [],
  };
  const buyEquipment = (key) => {
    const item = equipmentCatalog.find((entry) => entry.key === key && sideAllows(entry, team));
    if (!item || money < item.price) return false;
    money -= item.price;
    if (key === "armor") loadout.armor = Math.max(loadout.armor, item.value);
    if (key === "helmet") {
      loadout.armor = Math.max(loadout.armor, item.value);
      loadout.helmet = true;
    }
    if (key === "defuseKit") loadout.defuseKit = true;
    if (key === "zeus") loadout.zeus = true;
    return true;
  };
  if (state.round <= 1) {
    if (Math.random() < 0.55) buyEquipment("armor");
  } else if (money >= 1000) {
    buyEquipment("helmet");
  } else if (money >= 650) {
    buyEquipment("armor");
  }
  if (team === "CT" && state.round > 1 && Math.random() < 0.45) buyEquipment("defuseKit");
  if (state.round > 1 && Math.random() < 0.2) buyEquipment("zeus");
  const utilityPool = grenadeCatalog.filter((grenade) => sideAllows(grenade, team)).sort((a, b) => a.price - b.price);
  const maxGrenades = state.round <= 1 ? 1 : 3;
  for (const grenade of utilityPool.sort(() => Math.random() - 0.5)) {
    if (loadout.grenades.length >= maxGrenades) break;
    if (money >= grenade.price && Math.random() < (state.round <= 1 ? 0.28 : 0.55)) {
      money -= grenade.price;
      loadout.grenades.push(grenade.name);
    }
  }
  loadout.money = Math.max(0, money);
  return loadout;
}

function weaponStatsByName(name) {
  const weapon = weapons.find((item) => item.name === name);
  return weapon || weapons[defaultWeaponId(state.enemyTeam)] || weapons[0];
}

function actorWeaponStats(actor) {
  const weapon = weaponStatsByName(actor.weapon);
  const scale = actor.source === "LAN" ? 1 : difficultyScale();
  return {
    name: weapon.name,
    category: weapon.category,
    damage: weapon.damage * (actor.hostile ? 0.42 : 0.36) * scale,
    spread: (weapon.spread || 0.08) + (actor.hostile ? 0.05 : 0.06),
    recoil: weapon.recoil || 0,
    bulletSpeed: Math.max(720, (weapon.bulletSpeed || 950) * 0.72),
    fireDelay: weapon.fireDelay || 520,
    pellets: weapon.pellets || 1,
    automatic: weapon.automatic,
  };
}

function pointInRect(x, y, o) {
  return x > o.x && x < o.x + o.w && y > o.y && y < o.y + o.h;
}

function obstacleBlocks(o) {
  return o && o.visible !== false && o.collidable !== false && !["trigger", "logic", "light"].includes(o.type);
}

function obstacleLocalPoint(o, x, y) {
  const angle = -(Number(o.rot || 0) * Math.PI) / 180;
  const dx = x - (o.x + o.w / 2);
  const dy = y - (o.y + o.h / 2);
  return {
    x: dx * Math.cos(angle) - dy * Math.sin(angle),
    y: dx * Math.sin(angle) + dy * Math.cos(angle),
  };
}

function pointInMapObstacle(x, y, o) {
  if (!obstacleBlocks(o)) return false;
  const local = obstacleLocalPoint(o, x, y);
  return Math.abs(local.x) < o.w / 2 && Math.abs(local.y) < o.h / 2;
}

function pointInObstacle(x, y) {
  return state.map.obstacles.some((o) => pointInMapObstacle(x, y, o));
}

function rectCircleHit(rect, cx, cy, r) {
  if (!obstacleBlocks(rect)) return false;
  const local = obstacleLocalPoint(rect, cx, cy);
  const x = clamp(local.x, -rect.w / 2, rect.w / 2);
  const y = clamp(local.y, -rect.h / 2, rect.h / 2);
  return Math.hypot(local.x - x, local.y - y) < r;
}

function inSite(siteKey, x = player.x, y = player.y) {
  const site = state.map.sites[siteKey];
  return site && dist(x, y, site.x, site.y) <= site.r;
}

function buyZoneForTeam(team = state.team) {
  return state.map.buyZones?.[team] || { ...(team === "T" ? state.map.tSpawn : state.map.ctSpawn), r: 220 };
}

function inBuyZone(team = state.team, x = player.x, y = player.y) {
  if (isRespawnMode()) return true;
  const zone = buyZoneForTeam(team);
  return Boolean(zone) && dist(x, y, zone.x, zone.y) <= zone.r;
}

function currentSite(x = player.x, y = player.y) {
  if (inSite("A", x, y)) return "A";
  if (inSite("B", x, y)) return "B";
  return "";
}

function normalizeMap(rawMap, fallback = maps.custom) {
  const source = rawMap && typeof rawMap === "object" ? rawMap : fallback;
  const map = {
    ...fallback,
    ...source,
    w: clamp(Number(source.w) || fallback.w || 2000, 900, 5000),
    h: clamp(Number(source.h) || fallback.h || 1400, 700, 4000),
  };
  const point = (value, fallbackPoint) => ({
    x: clamp(Number(value?.x) || fallbackPoint.x, 32, map.w - 32),
    y: clamp(Number(value?.y) || fallbackPoint.y, 32, map.h - 32),
  });
  map.tSpawn = point(source.tSpawn, fallback.tSpawn || { x: 180, y: map.h - 180 });
  map.ctSpawn = point(source.ctSpawn, fallback.ctSpawn || { x: map.w - 180, y: 180 });
  const buyZone = (value, spawn) => ({ ...point(value, spawn), r: clamp(Number(value?.r) || 220, 96, 520) });
  map.buyZones = {
    T: buyZone(source.buyZones?.T, map.tSpawn),
    CT: buyZone(source.buyZones?.CT, map.ctSpawn),
  };
  map.sites = {
    A: { ...point(source.sites?.A, fallback.sites?.A || { x: map.w * 0.72, y: map.h * 0.72 }), r: clamp(Number(source.sites?.A?.r) || 115, 48, 260) },
    B: { ...point(source.sites?.B, fallback.sites?.B || { x: map.w * 0.3, y: map.h * 0.28 }), r: clamp(Number(source.sites?.B?.r) || 110, 48, 260) },
  };
  map.obstacles = (Array.isArray(source.obstacles) ? source.obstacles : [])
    .map((obj, index) => ({
      id: obj.id || `obj-${index}`,
      type: obj.type || "wall",
      x: clamp(Number(obj.x) || 0, 0, map.w - 24),
      y: clamp(Number(obj.y) || 0, 0, map.h - 24),
      w: clamp(Math.abs(Number(obj.w) || 96), 12, map.w),
      h: clamp(Math.abs(Number(obj.h) || 96), 12, map.h),
      z: clamp(Number(obj.z) || 64, 0, 512),
      elevation: clamp(Number(obj.elevation) || 0, 0, 1024),
      rot: Number(obj.rot) || 0,
      color: obj.color || "",
      texture: obj.texture || obj.material || source.meta?.defaultTexture || autoTextureForHit(obj),
      material: obj.material || obj.texture || source.meta?.defaultTexture || autoTextureForHit(obj),
      textureColor: obj.textureColor || "",
      layer: obj.layer || "default",
      visible: obj.visible !== false,
      locked: Boolean(obj.locked),
      sandboxBoundary: Boolean(obj.sandboxBoundary),
      sandboxSpawned: Boolean(obj.sandboxSpawned),
      script: obj.script || "",
    }))
    .filter((obj) => obj.w > 0 && obj.h > 0);
  map.name = source.name || fallback.name || "Custom Mission";
  map.meta = {
    terrainColor: "#3d4b39",
    skyColor: "#61777f",
    ambientColor: "#41565c",
    fogDistance: 3600,
    ...(fallback.meta || {}),
    ...(source.meta || {}),
    storyGoal: normalizeStoryGoal(source.meta?.storyGoal || fallback.meta?.storyGoal),
  };
  map.editorData = source.editorData && typeof source.editorData === "object" ? JSON.parse(JSON.stringify(source.editorData)) : null;
  return map;
}

const sandboxObjectCatalog = [
  { id: "box", name: "Box", namePl: "Skrzynia", icon: "BOX", w: 64, h: 64, z: 64, type: "crate", texture: "crate" },
  { id: "small-box", name: "Small box", namePl: "Mala skrzynia", icon: "S", w: 38, h: 38, z: 38, type: "crate", texture: "crate" },
  { id: "barrel", name: "Metal barrel", namePl: "Metalowa beczka", icon: "O", w: 44, h: 44, z: 72, type: "cover", texture: "metal" },
  { id: "wall", name: "Wall panel", namePl: "Panel scienny", icon: "W", w: 128, h: 24, z: 112, type: "wall", texture: "white" },
  { id: "cover", name: "Concrete cover", namePl: "Betonowa oslona", icon: "C", w: 112, h: 44, z: 54, type: "cover", texture: "concrete" },
  { id: "hazard", name: "Hazard block", namePl: "Blok ostrzegawczy", icon: "!", w: 72, h: 72, z: 72, type: "hazard", texture: "hazard" },
];

const sandboxNpcCatalog = [
  { id: "friendly", name: "Friendly NPC", namePl: "Przyjazny NPC", icon: "ALLY", hostile: false },
  { id: "enemy", name: "Enemy NPC", namePl: "Wrogi NPC", icon: "ENEMY", hostile: true },
  { id: "dummy", name: "Training dummy", namePl: "Manekin treningowy", icon: "DUMMY", hostile: true, stationary: true },
];

function sandboxObjectId(prefix = "prop") {
  return `sandbox-${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function physicsGunId() {
  return weapons.find((weapon) => weapon.sandboxOnly)?.id ?? 0;
}

function isPhysicsGunActive() {
  return isSandboxMode() && activeWeapon()?.sandboxOnly;
}

function sandboxSpawnPoint(distance = 150) {
  const x = player.x + Math.cos(player.angle) * distance;
  const y = player.y + Math.sin(player.angle) * distance;
  return {
    x: clamp(x, 64, state.map.w - 64),
    y: clamp(y, 64, state.map.h - 64),
  };
}

function createSandboxMap(widthMeters = sandbox.widthMeters, heightMeters = sandbox.heightMeters, wallTexture = sandbox.wallTexture) {
  sandbox.widthMeters = clamp(Math.round(Number(widthMeters) || 40), 30, 150);
  sandbox.heightMeters = clamp(Math.round(Number(heightMeters) || 30), 24, 120);
  sandbox.wallTexture = simple3dTextures[wallTexture] ? wallTexture : "white";
  const w = sandbox.widthMeters * sandbox.unitsPerMeter;
  const h = sandbox.heightMeters * sandbox.unitsPerMeter;
  const thickness = 28;
  const wall = (id, x, y, wallWidth, wallHeight) => ({
    id,
    type: "wall",
    x,
    y,
    w: wallWidth,
    h: wallHeight,
    z: 150,
    elevation: 0,
    texture: sandbox.wallTexture,
    material: sandbox.wallTexture,
    locked: true,
    sandboxBoundary: true,
  });
  return normalizeMap({
    name: `Sandbox ${sandbox.widthMeters}x${sandbox.heightMeters}m`,
    w,
    h,
    tSpawn: { x: w / 2, y: h / 2 },
    ctSpawn: { x: w / 2 + 96, y: h / 2 },
    sites: { A: { x: w / 2, y: h / 2, r: 48 }, B: { x: w / 2, y: h / 2, r: 48 } },
    obstacles: [
      wall("sandbox-boundary-n", 0, 0, w, thickness),
      wall("sandbox-boundary-s", 0, h - thickness, w, thickness),
      wall("sandbox-boundary-w", 0, thickness, thickness, h - thickness * 2),
      wall("sandbox-boundary-e", w - thickness, thickness, thickness, h - thickness * 2),
    ],
    meta: { gameMode: "sandbox", defaultTexture: sandbox.wallTexture, terrainColor: "#485443", skyColor: "#71858a", fogDistance: Math.max(w, h) * 1.1 },
  });
}

function resetSandboxLoadout() {
  for (const weapon of weapons) {
    weapon.owned = false;
    weapon.cooldown = 0;
    weapon.reloading = 0;
    weapon.ammo = weapon.magSize;
    weapon.currentReserve = weapon.reserve;
  }
  const tool = weapons[physicsGunId()];
  if (tool) {
    tool.owned = true;
    player.weaponId = tool.id;
  }
  player.grenades = {};
  state.activeSpecial = "";
  state.bomb.status = "none";
  state.bomb.carrier = "";
}

function clearSandboxSpawned() {
  if (!isSandboxMode()) return;
  state.map.obstacles = state.map.obstacles.filter((object) => object.sandboxBoundary);
  bots.length = 0;
  allies.length = 0;
  droppedWeapons.length = 0;
  sandbox.heldObjectId = "";
  renderSandboxWorldSummary();
  showMessage(settings.language === "en" ? "Sandbox world cleared" : "Wyczyszczono swiat sandbox");
}

function spawnSandboxObject(template) {
  if (!isSandboxMode() || !template) return;
  const point = sandboxSpawnPoint(150);
  const object = {
    ...template,
    id: sandboxObjectId(template.id),
    x: clamp(point.x - template.w / 2, 32, state.map.w - template.w - 32),
    y: clamp(point.y - template.h / 2, 32, state.map.h - template.h - 32),
    rot: Math.round((player.angle * 180) / Math.PI),
    sandboxSpawned: true,
    locked: false,
  };
  state.map.obstacles.push(object);
  showMessage(`${settings.language === "en" ? template.name : template.namePl} +1`);
}

function spawnSandboxNpc(template) {
  if (!isSandboxMode() || !template) return;
  const point = sandboxSpawnPoint(190);
  const team = template.hostile ? state.enemyTeam : state.team;
  const npc = makeTeamBot(team, (template.hostile ? bots.length : allies.length) + 1, "SANDBOX");
  npc.x = point.x;
  npc.y = point.y;
  npc.hp = template.id === "dummy" ? 250 : 100;
  npc.name = settings.language === "en" ? template.name : template.namePl;
  npc.sandboxSpawned = true;
  npc.speed = template.stationary ? 0 : npc.speed;
  npc.stationary = Boolean(template.stationary);
  npc.passive = Boolean(template.stationary);
  if (template.hostile) bots.push(npc);
  else allies.push(npc);
  showMessage(`${npc.name} +1`);
}

function spawnSandboxWeapon(weapon) {
  if (!isSandboxMode() || !weapon || weapon.sandboxOnly || weapon.melee) return;
  const point = sandboxSpawnPoint(130);
  const item = weaponDropData(weapon, point.x, point.y);
  item.sandboxSpawned = true;
  item.ammo = weapon.magSize;
  item.currentReserve = weapon.reserve;
  droppedWeapons.push(item);
  showMessage(`${weapon.name} +1`);
}

function renderSandboxSpawnMenu() {
  if (!hud.sandboxSpawnList) return;
  const category = state.sandboxCategory;
  hud.sandboxSpawnList.innerHTML = "";
  document.querySelectorAll("[data-sandbox-category]").forEach((button) => button.classList.toggle("active", button.dataset.sandboxCategory === category));
  let entries = [];
  if (category === "objects") entries = sandboxObjectCatalog.map((item) => ({ item, name: settings.language === "en" ? item.name : item.namePl, icon: item.icon, detail: `${item.w}x${item.h}`, action: () => spawnSandboxObject(item) }));
  if (category === "npcs") entries = sandboxNpcCatalog.map((item) => ({ item, name: settings.language === "en" ? item.name : item.namePl, icon: item.icon, detail: item.stationary ? "250 HP" : "AI", action: () => spawnSandboxNpc(item) }));
  if (category === "weapons") entries = weapons.filter((weapon) => !weapon.sandboxOnly && !weapon.melee).map((item) => ({ item, name: item.name, icon: item.category.slice(0, 3).toUpperCase(), detail: item.category, action: () => spawnSandboxWeapon(item) }));
  for (const entry of entries) {
    const button = document.createElement("button");
    button.className = "sandbox-spawn-item secondary";
    const icon = document.createElement("span");
    icon.className = "sandbox-spawn-icon";
    icon.textContent = entry.icon;
    const label = document.createElement("span");
    const title = document.createElement("strong");
    const detail = document.createElement("span");
    title.textContent = entry.name;
    detail.className = "muted";
    detail.textContent = entry.detail;
    label.append(title, document.createElement("br"), detail);
    button.append(icon, label);
    button.addEventListener("click", entry.action);
    hud.sandboxSpawnList.appendChild(button);
  }
}

function renderSandboxWorldSummary() {
  if (!hud.sandboxWorldSummary) return;
  const hybrid = isHybridMode();
  hud.sandboxWorldSwitch?.classList.toggle("hidden", !hybrid);
  hud.hybridMapExport?.classList.toggle("hidden", !hybrid);
  hud.hybridMapImport?.classList.toggle("hidden", !hybrid);
  if (hud.sandboxWorldSwitch) hud.sandboxWorldSwitch.textContent = `PRZELACZ: ${editor.hybridView === "editor" ? "SANDBOX" : "EDYTOR"}`;
  const spawned = state.map?.obstacles?.filter((object) => !object.sandboxBoundary).length || 0;
  const rows = [
    [settings.language === "en" ? "World" : "Swiat", `${sandbox.widthMeters} x ${sandbox.heightMeters} m`],
    [settings.language === "en" ? "Objects" : "Obiekty", String(spawned)],
    ["NPC", String(bots.length + allies.length)],
  ];
  hud.sandboxWorldSummary.innerHTML = "";
  for (const [label, value] of rows) {
    const cell = document.createElement("div");
    const name = document.createElement("span");
    const data = document.createElement("strong");
    name.textContent = label;
    data.textContent = value;
    cell.append(name, data);
    hud.sandboxWorldSummary.appendChild(cell);
  }
}

function sandboxSnapshot() {
  return {
    format: "potato-strike-sandbox",
    version: sandbox.version,
    savedAt: new Date().toISOString(),
    graphicsMode: settings.graphicsMode,
    world: { widthMeters: sandbox.widthMeters, heightMeters: sandbox.heightMeters, wallTexture: sandbox.wallTexture },
    map: state.map,
    player: { x: player.x, y: player.y, angle: player.angle },
    npcs: [...allies, ...bots].map((npc) => ({ ...npc })),
    weapons: droppedWeapons.map((weapon) => ({ ...weapon })),
  };
}

function exportSandboxWorld() {
  if (!isSandboxMode()) return;
  downloadJson(`potato-sandbox-${sandbox.widthMeters}x${sandbox.heightMeters}.json`, sandboxSnapshot());
  showMessage(settings.language === "en" ? "Sandbox world exported" : "Wyeksportowano swiat sandbox");
}

function mapSnapshot() {
  return {
    format: "potato-strike-map",
    version: 1,
    savedAt: new Date().toISOString(),
    map: normalizeMap(JSON.parse(JSON.stringify(state.map)), maps.custom),
  };
}

function exportCurrentMap() {
  if (!state.map) return;
  const safeName = String(state.map.name || "mapa").replace(/[^a-z0-9_-]+/gi, "-").toLowerCase();
  downloadJson(`${safeName || "mapa"}.potato-map.json`, mapSnapshot());
  showMessage("Wyeksportowano mape");
}

async function importCurrentMapFile(input) {
  const file = input?.files?.[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    const rawMap = data?.format === "potato-strike-map" ? data.map : data?.map || data;
    if (!rawMap || !Array.isArray(rawMap.obstacles)) throw new Error("nieprawidlowy plik mapy");
    state.map = normalizeMap(rawMap, maps.custom);
    state.mapKey = "editor";
    maps.editor = JSON.parse(JSON.stringify(state.map));
    hud.editorName.value = state.map.name || "Importowana mapa";
    player.x = clamp(player.x, 32, state.map.w - 32);
    player.y = clamp(player.y, 32, state.map.h - 32);
    renderEditorProperties();
    renderSandboxWorldSummary();
    render2d();
    showMessage("Zaimportowano mape do edytora");
  } catch (error) {
    showMessage(`Blad importu mapy: ${error.message}`);
  } finally {
    input.value = "";
  }
}

function switchHybridView(target = editor.hybridView === "editor" ? "sandbox" : "editor") {
  if (!isHybridMode()) return;
  if (target === "editor") {
    editor.hybridView = "editor";
    editor.active = true;
    editor.previousGraphicsMode = settings.graphicsMode;
    camera.x = clamp(player.x - innerWidth / 2, 0, Math.max(0, state.map.w - innerWidth));
    camera.y = clamp(player.y - innerHeight / 2, 0, Math.max(0, state.map.h - innerHeight));
    setGraphicsMode("2d");
    closePanels();
    state.overlayOpen = true;
    hud.editorPanel.classList.remove("hidden");
    renderSavedMissions();
    renderEditorProperties();
    document.exitPointerLock?.();
    showMessage("EDYTOR: widok z powietrza / P: menu przelaczania");
  } else {
    editor.hybridView = "sandbox";
    editor.active = false;
    closePanels();
    setGraphicsMode(editor.previousGraphicsMode || "2d");
    showMessage("SANDBOX: kamera gracza / P: menu przelaczania");
    if (isPerspectiveMode()) requestGamePointerLock();
  }
}

async function importSandboxWorldFile() {
  const file = hud.sandboxWorldFile.files[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    if (data?.format !== "potato-strike-sandbox" || !data.map || !data.world) throw new Error("invalid sandbox file");
    sandbox.widthMeters = clamp(Number(data.world.widthMeters) || 40, 30, 150);
    sandbox.heightMeters = clamp(Number(data.world.heightMeters) || 30, 24, 120);
    sandbox.wallTexture = simple3dTextures[data.world.wallTexture] ? data.world.wallTexture : "white";
    state.map = normalizeMap(data.map, createSandboxMap());
    bots.length = 0;
    allies.length = 0;
    for (const raw of Array.isArray(data.npcs) ? data.npcs.slice(0, 64) : []) {
      const npc = { ...raw, x: clamp(Number(raw.x) || state.map.w / 2, 32, state.map.w - 32), y: clamp(Number(raw.y) || state.map.h / 2, 32, state.map.h - 32), r: 15, sandboxSpawned: true };
      if (npc.hostile) bots.push(npc);
      else allies.push(npc);
    }
    droppedWeapons.length = 0;
    for (const raw of Array.isArray(data.weapons) ? data.weapons.slice(0, 128) : []) {
      const weapon = weapons.find((item) => item.name === raw.name);
      if (!weapon || weapon.sandboxOnly || weapon.melee) continue;
      droppedWeapons.push({ ...weaponDropData(weapon, clamp(Number(raw.x) || player.x, 32, state.map.w - 32), clamp(Number(raw.y) || player.y, 32, state.map.h - 32)), ammo: clamp(Number(raw.ammo) || weapon.magSize, 0, weapon.magSize), currentReserve: clamp(Number(raw.currentReserve) || weapon.reserve, 0, weapon.reserve), sandboxSpawned: true });
    }
    player.x = clamp(Number(data.player?.x) || state.map.w / 2, 32, state.map.w - 32);
    player.y = clamp(Number(data.player?.y) || state.map.h / 2, 32, state.map.h - 32);
    player.angle = Number(data.player?.angle) || 0;
    if (data.graphicsMode) setGraphicsMode(data.graphicsMode);
    resetSandboxLoadout();
    renderSandboxWorldSummary();
    closePanels();
    showMessage(settings.language === "en" ? "Sandbox world imported" : "Zaimportowano swiat sandbox");
  } catch (error) {
    showMessage(`${settings.language === "en" ? "Import failed" : "Blad importu"}: ${error.message}`);
  } finally {
    hud.sandboxWorldFile.value = "";
  }
}

function findSafePoint(origin = { x: state.map.w / 2, y: state.map.h / 2 }) {
  const start = { x: clamp(Number(origin.x) || state.map.w / 2, 32, state.map.w - 32), y: clamp(Number(origin.y) || state.map.h / 2, 32, state.map.h - 32) };
  if (!pointInObstacle(start.x, start.y)) return start;
  for (let r = 36; r <= 420; r += 36) {
    for (let i = 0; i < 16; i += 1) {
      const a = (i / 16) * Math.PI * 2;
      const p = { x: clamp(start.x + Math.cos(a) * r, 32, state.map.w - 32), y: clamp(start.y + Math.sin(a) * r, 32, state.map.h - 32) };
      if (!pointInObstacle(p.x, p.y)) return p;
    }
  }
  return start;
}

function hasLineOfSight(ax, ay, bx, by) {
  const steps = Math.ceil(dist(ax, ay, bx, by) / 28);
  for (let i = 1; i < steps; i += 1) {
    const t = i / steps;
    if (pointInObstacle(ax + (bx - ax) * t, ay + (by - ay) * t)) return false;
  }
  return true;
}

function moveEntity(entity, vx, vy, dt) {
  entity.x += vx * dt;
  for (const o of state.map.obstacles) {
    if (rectCircleHit(o, entity.x, entity.y, entity.r)) {
      entity.x -= vx * dt;
      break;
    }
  }
  entity.y += vy * dt;
  for (const o of state.map.obstacles) {
    if (rectCircleHit(o, entity.x, entity.y, entity.r)) {
      entity.y -= vy * dt;
      break;
    }
  }
  entity.x = clamp(entity.x, entity.r, state.map.w - entity.r);
  entity.y = clamp(entity.y, entity.r, state.map.h - entity.r);
}

function seededRandom(seed) {
  let value = 2166136261;
  for (let i = 0; i < seed.length; i += 1) value = Math.imul(value ^ seed.charCodeAt(i), 16777619);
  return () => {
    value += value << 13; value ^= value >>> 7; value += value << 3; value ^= value >>> 17; value += value << 5;
    return ((value >>> 0) % 10000) / 10000;
  };
}

function generateMapFromMenu() {
  const seed = hud.mapSeed.value || "potato";
  const rand = seededRandom(seed);
  const size = hud.mapSize.value;
  const w = size === "large" ? 2400 : size === "small" ? 1700 : 2100;
  const h = size === "large" ? 1600 : size === "small" ? 1120 : 1400;
  const obstacles = [];
  const count = size === "large" ? 16 : size === "small" ? 9 : 12;
  for (let i = 0; i < count; i += 1) {
    const ow = 90 + Math.floor(rand() * 330);
    const oh = 70 + Math.floor(rand() * 230);
    const x = 220 + Math.floor(rand() * (w - ow - 440));
    const y = 160 + Math.floor(rand() * (h - oh - 320));
    obstacles.push({ x, y, w: ow, h: oh });
  }
  maps.generated = {
    name: `Generated ${seed}`,
    w,
    h,
    tSpawn: { x: 180, y: h - 180 },
    ctSpawn: { x: w - 180, y: 180 },
    sites: { A: { x: Math.floor(w * 0.74), y: Math.floor(h * 0.72), r: 115 }, B: { x: Math.floor(w * 0.32), y: Math.floor(h * 0.26), r: 110 } },
    obstacles,
  };
  const id = registerUserMap(maps.generated, `generated-${seed.replace(/[^a-z0-9_-]/gi, "-").toLowerCase()}`);
  hud.menuMap.value = id;
  hud.mapgenStatus.textContent = `Wygenerowano mape z seedem "${seed}".`;
  showMessage("Mapa wygenerowana");
}

function editorCanvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return { x: event.clientX - rect.left + camera.x, y: event.clientY - rect.top + camera.y };
}

function editMapAt(event) {
  if (!editor.active || !state.overlayOpen || !state.map) return false;
  const p = editorCanvasPoint(event);
  const tool = hud.editorTool.value;
  if (["wall", "crate", "cover", "ramp", "light"].includes(tool)) {
    const obj = {
      id: `obj-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`,
      type: tool,
      x: p.x - Number(hud.editorWidth.value) / 2,
      y: p.y - Number(hud.editorHeight.value) / 2,
      w: Number(hud.editorWidth.value),
      h: Number(hud.editorHeight.value),
      z: tool === "ramp" ? 28 : tool === "cover" ? 46 : tool === "crate" ? 64 : tool === "light" ? 10 : 96,
      rot: Number(hud.editorRotation.value),
      color: hud.editorColor.value,
    };
    state.map.obstacles.push(obj);
    editor.selectedObject = obj.id;
  } else if (tool === "siteA") {
    state.map.sites.A = { x: p.x, y: p.y, r: 115 };
  } else if (tool === "siteB") {
    state.map.sites.B = { x: p.x, y: p.y, r: 110 };
  } else if (tool === "tSpawn") {
    state.map.tSpawn = { x: p.x, y: p.y };
    state.map.buyZones.T = { x: p.x, y: p.y, r: state.map.buyZones.T?.r || 220 };
  } else if (tool === "ctSpawn") {
    state.map.ctSpawn = { x: p.x, y: p.y };
    state.map.buyZones.CT = { x: p.x, y: p.y, r: state.map.buyZones.CT?.r || 220 };
  } else if (tool === "delete") {
    state.map.obstacles = state.map.obstacles.filter((o) => !rectCircleHit(o, p.x, p.y, 12));
    editor.selectedObject = null;
  } else if (tool === "move") {
    const o = state.map.obstacles.find((item) => rectCircleHit(item, p.x, p.y, 12));
    if (o) {
      o.x = p.x - o.w / 2;
      o.y = p.y - o.h / 2;
      editor.selectedObject = o.id || `${o.x}-${o.y}`;
    }
  }
  renderEditorProperties();
  render2d();
  return true;
}

function renderEditorProperties() {
  hud.editorProperties.innerHTML = "";
  const selected = state.map?.obstacles.find((o) => (o.id || `${o.x}-${o.y}`) === editor.selectedObject);
  if (selected) {
    const fields = [
      ["Typ", "type"], ["X", "x"], ["Y", "y"], ["W", "w"], ["H", "h"], ["Z", "z"], ["Rot", "rot"], ["Kolor", "color"],
    ];
    for (const [label, key] of fields) {
      const item = document.createElement("div");
      item.className = "team-item";
      const inputType = key === "color" ? "color" : key === "type" ? "text" : "number";
      item.innerHTML = `<span>${label}</span><input data-prop="${key}" type="${inputType}" value="${selected[key] ?? ""}">`;
      hud.editorProperties.appendChild(item);
    }
    hud.editorProperties.querySelectorAll("[data-prop]").forEach((input) => {
      input.addEventListener("input", () => {
        const key = input.dataset.prop;
        selected[key] = input.type === "number" ? Number(input.value) : input.value;
        render2d();
      });
    });
    return;
  }
  const rows = [["Wybrany", "brak"], ["Obiekty", state.map?.obstacles.length || 0], ["Bombsite", "A/B"], ["Spawny", "T/CT"]];
  for (const [label, value] of rows) {
    const item = document.createElement("div");
    item.className = "team-item";
    item.innerHTML = `<span>${label}</span><span class="tag">${value}</span>`;
    hud.editorProperties.appendChild(item);
  }
}

function saveCurrentMapOnly() {
  if (!state.map) return;
  const id = registerUserMap({ ...JSON.parse(JSON.stringify(state.map)), name: hud.editorName.value || state.map.name || "User Map" });
  hud.menuMap.value = id;
  showMessage("Mapa zapisana do configu");
}

function renderAssetList() {
  if (!hud.assetList) return;
  hud.assetList.innerHTML = "";
  const rows = [
    ...customTextures.map((texture) => ["Texture", texture.name]),
    ...sortedMods().map((mod) => [mod.enabled === false ? "Mod off" : "Mod on", `${mod.priority ?? 100} / ${mod.name || mod.id || "unnamed"}`]),
  ];
  if (!rows.length) rows.push(["Assets", "brak"]);
  for (const [kind, name] of rows) {
    const item = document.createElement("div");
    item.className = "team-item";
    item.innerHTML = `<span>${kind}</span><span class="tag">${name}</span>`;
    hud.assetList.appendChild(item);
  }
}

function normalizeMod(mod, fallbackCategory = "custom") {
  const source = mod && typeof mod === "object" ? mod : {};
  return {
    id: String(source.id || `mod-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`),
    name: String(source.name || source.id || "unnamed"),
    category: String(source.category || fallbackCategory || "custom"),
    enabled: source.enabled !== false,
    priority: Number(source.priority ?? 100),
    ...source,
  };
}

function installBundledDefaultMods() {
  let changed = false;
  for (const bundled of bundledDefaultMods) {
    if (removedDefaultModIds.includes(bundled.id) || loadedMods.some((mod) => mod.id === bundled.id)) continue;
    loadedMods.push(normalizeMod(bundled, "default"));
    changed = true;
  }
  return changed;
}

async function loadNativeMods() {
  if (!window.potatoNative?.listMods) return;
  const diskMods = await window.potatoNative.listMods();
  if (!Array.isArray(diskMods)) return;
  for (const entry of diskMods) {
    const diskMod = normalizeMod(entry, entry.category || "custom");
    if (removedDefaultModIds.includes(diskMod.id)) continue;
    const existing = loadedMods.find((mod) => mod.id === diskMod.id);
    if (existing) {
      const enabled = existing.enabled;
      const priority = existing.priority;
      Object.assign(existing, diskMod, { enabled, priority });
    } else {
      loadedMods.push(diskMod);
    }
  }
  renderAssetList();
  renderModManager();
  saveConfig();
}

function sortedMods() {
  return [...loadedMods].sort((a, b) => {
    const categoryA = String(a.category || "custom");
    const categoryB = String(b.category || "custom");
    if (categoryA === "default" && categoryB !== "default") return -1;
    if (categoryB === "default" && categoryA !== "default") return 1;
    return categoryA.localeCompare(categoryB) || Number(a.priority ?? 100) - Number(b.priority ?? 100);
  });
}

function enabledMod(builtin) {
  return sortedMods().find((mod) => mod.enabled !== false && mod.builtin === builtin) || null;
}

function renderModManager() {
  if (!hud.modManagerList) return;
  hud.modManagerList.innerHTML = "";
  const mods = sortedMods();
  const removedBundled = bundledDefaultMods.filter((mod) => removedDefaultModIds.includes(mod.id));
  if (!mods.length && !removedBundled.length) {
    const empty = document.createElement("div");
    empty.className = "mission-item";
    empty.textContent = "Brak modow w profilu. Wgraj mod w edytorze lub przez import modpacka.";
    hud.modManagerList.appendChild(empty);
    return;
  }
  const categories = new Map();
  for (const mod of mods) {
    const category = String(mod.category || "custom");
    if (!categories.has(category)) categories.set(category, []);
    categories.get(category).push(mod);
  }
  for (const [category, categoryMods] of categories) {
    const heading = document.createElement("div");
    heading.className = "mod-category-title";
    heading.textContent = category;
    hud.modManagerList.appendChild(heading);
    for (const mod of categoryMods) {
      const item = document.createElement("div");
      item.className = "mission-item";
      item.innerHTML = `
        <div class="mission-title"><span>${escapeHtml(mod.name || mod.id || "unnamed")}</span><span class="tag">${mod.enabled === false ? "OFF" : "ON"}</span></div>
        <div class="muted">${escapeHtml(mod.description || `Kategoria: ${category}`)}</div>
        <div class="settings-grid">
          <label class="check"><input data-mod-enabled="${escapeHtml(mod.id)}" type="checkbox" ${mod.enabled === false ? "" : "checked"}> Wlaczony</label>
          <label>Priorytet <input data-mod-priority="${escapeHtml(mod.id)}" type="number" value="${Number(mod.priority ?? 100)}"></label>
        </div>
        <div class="menu-actions left"><button data-mod-remove="${escapeHtml(mod.id)}" class="secondary">Usun z profilu</button></div>
      `;
      hud.modManagerList.appendChild(item);
    }
  }
  if (removedBundled.length) {
    const heading = document.createElement("div");
    heading.className = "mod-category-title";
    heading.textContent = "default / usuniete";
    hud.modManagerList.appendChild(heading);
    for (const mod of removedBundled) {
      const item = document.createElement("div");
      item.className = "mission-item";
      item.innerHTML = `<div class="mission-title"><span>${escapeHtml(mod.name)}</span><span class="tag">DOSTEPNY</span></div><div class="menu-actions left"><button data-mod-restore="${escapeHtml(mod.id)}">Dodaj ponownie</button></div>`;
      hud.modManagerList.appendChild(item);
    }
  }
  hud.modManagerList.querySelectorAll("[data-mod-enabled]").forEach((input) => {
    input.addEventListener("change", () => {
      const mod = loadedMods.find((item) => item.id === input.dataset.modEnabled);
      if (mod) mod.enabled = input.checked;
      saveConfig();
      renderAssetList();
      renderModManager();
    });
  });
  hud.modManagerList.querySelectorAll("[data-mod-priority]").forEach((input) => {
    input.addEventListener("input", () => {
      const mod = loadedMods.find((item) => item.id === input.dataset.modPriority);
      if (mod) mod.priority = Number(input.value || 100);
      saveConfig();
      renderAssetList();
    });
  });
  hud.modManagerList.querySelectorAll("[data-mod-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = loadedMods.findIndex((item) => item.id === button.dataset.modRemove);
      if (index >= 0) {
        const [removed] = loadedMods.splice(index, 1);
        if (removed.bundled || bundledDefaultMods.some((mod) => mod.id === removed.id)) {
          if (!removedDefaultModIds.includes(removed.id)) removedDefaultModIds.push(removed.id);
        }
      }
      saveConfig();
      renderAssetList();
      renderModManager();
    });
  });
  hud.modManagerList.querySelectorAll("[data-mod-restore]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.modRestore;
      const index = removedDefaultModIds.indexOf(id);
      if (index >= 0) removedDefaultModIds.splice(index, 1);
      installBundledDefaultMods();
      saveConfig();
      renderAssetList();
      renderModManager();
    });
  });
}

async function importTexture() {
  const file = hud.textureFile.files[0];
  if (!file) return showMessage("Wybierz plik tekstury");
  const dataUrl = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
  customTextures.push({ id: `tex-${Date.now().toString(36)}`, name: hud.textureName.value || file.name, dataUrl });
  renderAssetList();
  saveConfig();
  showMessage("Tekstura wgrana do configu");
}

function safeApplyMod(mod) {
  if (mod.roundTime) state.roundTime = Number(mod.roundTime);
  if (mod.mode) state.gameMode = String(mod.mode).slice(0, 32);
  if (mod.map) {
    const id = registerUserMap(mod.map, `mod-map-${mod.name || Date.now().toString(36)}`);
    hud.menuMap.value = id;
  }
  if (Array.isArray(mod.weapons)) {
    for (const weapon of mod.weapons) {
      weaponCatalog.push({ side: "BOTH", category: "Mod", price: 1000, magSize: 20, reserve: 80, damage: 25, fireDelay: 110, reloadTime: 1.5, spread: 0.07, recoil: 0.05, bulletSpeed: 1000, automatic: true, color: "#d7bd62", ...weapon });
    }
  }
}

async function importMod() {
  let source = hud.modCode.value.trim();
  const file = hud.modFile.files[0];
  if (file) source = await file.text();
  if (!source) return showMessage("Wklej kod albo wybierz plik modu");
  let mod;
  if (hud.modMode.value === "json") {
    mod = JSON.parse(source);
  } else {
    mod = { id: `script-${Date.now().toString(36)}`, name: "Script sandbox", script: source };
    try {
      const api = { setRoundTime: (v) => { state.roundTime = Number(v); }, addMoney: (v) => { player.money += Number(v); }, message: showMessage };
      Function("api", `"use strict";\n${source}`)(api);
    } catch {
      showMessage("Script mod ma blad");
    }
  }
  const normalized = normalizeMod(mod, mod.category || "custom");
  const existingIndex = loadedMods.findIndex((item) => item.id === normalized.id);
  if (existingIndex >= 0) loadedMods.splice(existingIndex, 1, normalized);
  else loadedMods.push(normalized);
  const removedIndex = removedDefaultModIds.indexOf(normalized.id);
  if (removedIndex >= 0) removedDefaultModIds.splice(removedIndex, 1);
  safeApplyMod(mod);
  if (window.potatoNative?.saveMod) await window.potatoNative.saveMod(mod.name || mod.id || "mod", mod);
  renderAssetList();
  renderModManager();
  saveConfig();
  showMessage("Mod/tryb wgrany");
}

function resetLoadout() {
  for (const weapon of weapons) {
    weapon.owned = false;
    weapon.ammo = weapon.magSize;
    weapon.currentReserve = weapon.reserve;
    weapon.cooldown = 0;
    weapon.reloading = 0;
  }
  player.grenades = {};
  player.helmet = false;
  player.defuseKit = false;
  player.zeus = false;
  const knifeId = knifeWeaponId();
  weapons[knifeId].owned = true;
  weapons[knifeId].ammo = weapons[knifeId].magSize;
  weapons[knifeId].currentReserve = weapons[knifeId].reserve;
  const id = defaultWeaponId(state.team);
  weapons[id].owned = true;
  player.weaponId = id;
  state.bomb.status = state.team === "T" ? "carried" : "none";
  state.bomb.carrier = state.team === "T" ? "player" : "";
}

function editorUnitsForSide(team) {
  const units = state.map.editorData?.units;
  return Array.isArray(units) ? units.filter((unit) => unit.side === team) : [];
}

function editorUnitSpawn(team, index, fallback) {
  const units = editorUnitsForSide(team);
  const unit = units[index];
  if (!unit) return { point: fallback, unit: null };
  return { point: findSafePoint({ x: unit.x, y: unit.y }), unit };
}

function editorWaypointsForUnit(unit) {
  if (!unit || !state.map.editorData) return [];
  const group = state.map.editorData.groups?.find((item) => Array.isArray(item.members) && item.members.includes(unit.id));
  if (!group) return [];
  return (state.map.editorData.waypoints || [])
    .filter((waypoint) => waypoint.groupId === group.id)
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0))
    .map((waypoint) => ({ x: waypoint.x, y: waypoint.y, type: waypoint.type || "MOVE" }));
}

function nextEditorWaypoint(actor) {
  if (!Array.isArray(actor.editorWaypoints) || !actor.editorWaypoints.length) return null;
  actor.editorWaypointIndex = clamp(Number(actor.editorWaypointIndex || 0), 0, actor.editorWaypoints.length - 1);
  let point = actor.editorWaypoints[actor.editorWaypointIndex];
  if (dist(actor.x, actor.y, point.x, point.y) < 54) {
    if (point.type === "CYCLE") actor.editorWaypointIndex = 0;
    else actor.editorWaypointIndex = Math.min(actor.editorWaypoints.length - 1, actor.editorWaypointIndex + 1);
    point = actor.editorWaypoints[actor.editorWaypointIndex];
  }
  return point;
}

function spawnEditorPickups() {
  const pickups = state.map.editorData?.pickups;
  if (!Array.isArray(pickups)) return;
  for (const pickup of pickups) {
    const weapon = weapons.find((item) => item.name === pickup.weapon);
    if (!weapon || weapon.melee) continue;
    const item = weaponDropData(weapon, pickup.x, pickup.y);
    item.ammo = clamp(Number(pickup.ammo || weapon.magSize), 0, weapon.magSize);
    item.currentReserve = weapon.reserve;
    item.editorPickup = true;
    droppedWeapons.push(item);
  }
}

function equipRuleWeapon(name) {
  const weapon = weapons.find((item) => item.name === name);
  if (!weapon) return;
  weapon.owned = true;
  weapon.ammo = weapon.magSize;
  weapon.currentReserve = weapon.reserve;
  weapon.cooldown = 0;
  weapon.reloading = 0;
  player.weaponId = weapon.id;
}

function applyRuleRoundLoadout() {
  if (isSandboxMode()) return;
  if (state.ruleMode === "retake") {
    resetLoadout();
    player.armor = 100;
    player.helmet = true;
    player.defuseKit = state.team === "CT";
    player.grenades = state.team === "CT" ? { "Flashbang": 1, "Smoke Grenade": 1 } : { "Flashbang": 1, "HE Grenade": 1 };
    equipRuleWeapon(state.team === "T" ? "AK-47" : "M4A4");
  } else if (isRespawnMode() && state.round === 1) {
    player.money = 16000;
    player.armor = 100;
    player.helmet = true;
    equipRuleWeapon(state.team === "T" ? "AK-47" : "M4A4");
  }
}

function resetRoundPositions() {
  const rules = activeGameRules();
  const fallback = findSafePoint(state.team === "T" ? state.map.tSpawn : state.map.ctSpawn);
  const spawn = editorUnitSpawn(state.team, 0, fallback).point;
  player.x = spawn.x;
  player.y = spawn.y;
  player.angle = angleTo(player.x, player.y, state.map.w / 2, state.map.h / 2);
  camera.pitch = 0;
  player.jumpHeight = 0;
  player.verticalVelocity = 0;
  player.jumpLatch = false;
  player.crouched = false;
  player.eyeHeight = 58;
  player.hp = 100;
  player.armor = Math.min(player.armor, 100);
  player.alive = true;
  player.roundKills = 0;
  player.invuln = 0;
  bullets.length = 0;
  grenades.length = 0;
  droppedWeapons.length = 0;
  effects.length = 0;
  player.useLatch = false;
  state.activeSpecial = "";
  state.grenadePrime = null;
  leaveSpectator();
  const commanderRules = state.gameMode === "lan";
  state.roundTime = commanderRules ? serverSettings.roundTime : (rules.roundTime ?? serverSettings.roundTime);
  state.freezeTime = commanderRules ? serverSettings.freezeTime : (rules.freezeTime ?? serverSettings.freezeTime);
  state.buyTime = commanderRules ? serverSettings.buyTime : (rules.buyTime ?? serverSettings.buyTime);
  state.phase = "freeze";
  state.winner = "";
  state.bomb.timer = 40;
  state.bomb.defuse = 0;
  state.triggerPoll = 0;
  state.triggerStates = {};
  applyRuleRoundLoadout();
  spawnEditorPickups();
  if (!rules.bomb) {
    state.bomb.status = "none";
    state.bomb.carrier = "";
  } else if (rules.planted) {
    const siteKey = Math.random() < 0.5 ? "A" : "B";
    const site = state.map.sites[siteKey];
    state.bomb.status = "planted";
    state.bomb.carrier = "";
    state.bomb.x = site.x;
    state.bomb.y = site.y;
    state.bomb.site = siteKey;
    state.bomb.timer = 30;
  } else if (state.team === "T") {
    state.bomb.status = "carried";
    state.bomb.carrier = "player";
  } else {
    state.bomb.status = "hidden";
    state.bomb.carrier = "enemy";
    const siteKey = Math.random() < 0.5 ? "A" : "B";
    const site = state.map.sites[siteKey];
    state.bomb.x = site.x;
    state.bomb.y = site.y;
    state.bomb.site = siteKey;
  }
}

function spawnBots() {
  bots.length = 0;
  allies.length = 0;
  if (isSandboxMode()) {
    renderTeams();
    return;
  }
  const target = Math.max(1, Number(state.gameMode === "lan" ? serverSettings.botQuota : settings.matchSize));
  const fillLan = state.gameMode !== "lan" || serverSettings.fillTeamsWithBots;
  const lobbyTeamCount = (team) => lobbySession.players.filter((slot) => slot.team === team).length;
  const enemyCount = fillLan ? Math.max(0, target - (state.gameMode === "lan" ? lobbyTeamCount(state.enemyTeam) : 0)) : 0;
  const allyCount = fillLan ? Math.max(0, target - (state.gameMode === "lan" ? lobbyTeamCount(state.team) : 1)) : 0;
  const enemySpawn = findSafePoint(state.enemyTeam === "T" ? state.map.tSpawn : state.map.ctSpawn);
  for (let i = 0; i < enemyCount; i += 1) {
    const placed = editorUnitSpawn(state.enemyTeam, i, null);
    const spawn = placed.point || findSafePoint({ x: enemySpawn.x + (Math.random() - 0.5) * 180, y: enemySpawn.y + (Math.random() - 0.5) * 180 });
    const loadout = makeBotLoadout(state.enemyTeam);
    bots.push({
      x: spawn.x,
      y: spawn.y,
      r: 15,
      hp: 78 + state.round * 2 * difficultyScale(),
      armor: loadout.armor,
      helmet: loadout.helmet,
      defuseKit: loadout.defuseKit,
      grenades: loadout.grenades,
      zeus: loadout.zeus,
      team: state.enemyTeam,
      hostile: true,
      angle: 0,
      speed: (92 + Math.random() * 22) * difficultyScale(),
      fire: 450 + Math.random() * 700,
      weapon: loadout.weapon,
      loadout,
      name: `ENEMY ${i + 1}`,
      source: "BOT",
      flashed: 0,
      openingMove: 0,
      editorWaypoints: editorWaypointsForUnit(placed.unit),
      editorWaypointIndex: 0,
    });
  }
  const allySpawn = findSafePoint(state.team === "T" ? state.map.tSpawn : state.map.ctSpawn);
  for (let i = 0; i < allyCount; i += 1) {
    const placed = editorUnitSpawn(state.team, i, null);
    const spawn = placed.point || findSafePoint({ x: allySpawn.x + (Math.random() - 0.5) * 170, y: allySpawn.y + (Math.random() - 0.5) * 170 });
    const loadout = makeBotLoadout(state.team);
    allies.push({
      x: spawn.x,
      y: spawn.y,
      r: 15,
      hp: 82,
      armor: loadout.armor,
      helmet: loadout.helmet,
      defuseKit: loadout.defuseKit,
      grenades: loadout.grenades,
      zeus: loadout.zeus,
      team: state.team,
      hostile: false,
      angle: 0,
      speed: 92 + Math.random() * 18,
      fire: 520 + Math.random() * 760,
      weapon: loadout.weapon,
      loadout,
      name: `BOT ${i + 1}`,
      source: "BOT",
      flashed: 0,
      openingMove: 0,
      editorWaypoints: editorWaypointsForUnit(placed.unit),
      editorWaypointIndex: 0,
    });
  }
  renderTeams();
}

function makeTeamBot(team, index = 1, source = "BOT") {
  const spawn = findSafePoint(team === "T" ? state.map.tSpawn : state.map.ctSpawn);
  const loadout = makeBotLoadout(team);
  return {
    x: spawn.x + (Math.random() - 0.5) * 170,
    y: spawn.y + (Math.random() - 0.5) * 170,
    r: 15,
    hp: source === "LAN" ? 100 : 82,
    armor: loadout.armor,
    helmet: loadout.helmet,
    defuseKit: loadout.defuseKit,
    grenades: loadout.grenades,
    zeus: loadout.zeus,
    team,
    hostile: team === state.enemyTeam,
    angle: 0,
    speed: source === "LAN" ? 0 : 92 + Math.random() * 18,
    fire: 520 + Math.random() * 760,
    weapon: loadout.weapon,
    loadout,
    name: `${source} ${index}`,
    source,
    flashed: 0,
  };
}

function addTeamSlot(side, source = "BOT") {
  if (side === "ally") allies.push(makeTeamBot(state.team, allies.length + 1, source));
  else bots.push(makeTeamBot(state.enemyTeam, bots.length + 1, source));
  settings.matchSize = Math.max(settings.matchSize, Math.max(bots.length, allies.length + 1));
  renderTeams();
  saveConfig();
}

function removeTeamSlot(side, source = "") {
  const list = side === "ally" ? allies : bots;
  const index = source ? list.findIndex((slot) => slot.source === source) : list.length - 1;
  if (index >= 0) list.splice(index, 1);
  renderTeams();
  saveConfig();
}

function balanceTeams() {
  while (allies.length + 1 < bots.length) addTeamSlot("ally");
  while (bots.length < allies.length + 1) addTeamSlot("enemy");
  renderTeams();
}

function newMatch({ preserveLobbyOwner = false } = {}) {
  state.gameMode = hud.menuMode.value;
  const rules = applyGameRulePreset(hud.gameRules.value);
  serverSettings.gameRules = state.ruleMode;
  if (state.gameMode !== "lan" && typeof rules.friendlyFire === "boolean") serverSettings.friendlyFire = rules.friendlyFire;
  if (state.gameMode === "story") {
    serverSettings.aimMode = "sights";
    serverSettings.botDifficulty = 5;
    settings.difficulty = 5;
    hud.difficulty.value = "5";
    hud.teamDifficulty.value = "5";
  }
  else if (state.gameMode !== "lan") serverSettings.aimMode = settings.botAimMode || "sights";
  ensurePlayerId();
  if (!preserveLobbyOwner) {
    state.lobbyOwnerId = settings.playerId;
    networkSync.ownerId = settings.playerId;
  }
  if (hud.launchTarget.value === "exe") showMessage("EXE: uzyj Pobierz lokalnie albo npm run build:win");
  settings.matchSize = Number(hud.matchSize.value);
  settings.fillMode = hud.fillMode.value;
  settings.botCount = settings.matchSize * 2;
  state.team = hud.menuTeam.value === "random" ? (Math.random() < 0.5 ? "T" : "CT") : hud.menuTeam.value;
  state.enemyTeam = enemyOf(state.team);
  state.mapKey = hud.menuMap.value;
  state.storyMission = null;
  state.storyComplete = false;
  if (state.gameMode === "story" && !maps.story) {
    const first = savedStoryMissions()[0];
    if (first) {
      maps.story = JSON.parse(JSON.stringify(first.map));
      maps.story.meta = { ...(maps.story.meta || {}), storyGoal: normalizeStoryGoal(first.goal) };
      state.storyMission = first;
      state.mapKey = "story";
    } else {
      showMessage("Brak zapisanej misji, uzywam Custom Mission");
      state.mapKey = "custom";
    }
  }
  if (isSandboxMode()) {
    settings.sandboxWidth = clamp(Number(hud.sandboxWidth.value) || 40, 30, 150);
    settings.sandboxHeight = clamp(Number(hud.sandboxHeight.value) || 30, 24, 120);
    settings.sandboxWallTexture = simple3dTextures[hud.sandboxWallTexture.value] ? hud.sandboxWallTexture.value : "white";
    settings.sandboxUnlimitedAmmo = hud.sandboxUnlimitedAmmo.checked;
    state.mapKey = "sandbox";
    state.map = createSandboxMap(settings.sandboxWidth, settings.sandboxHeight, settings.sandboxWallTexture);
  } else {
    player.noclipMode = false;
    state.map = normalizeMap(maps[state.mapKey] || maps.custom);
  }
  if (state.gameMode === "story" && !state.storyMission) {
    state.storyMission = { id: "default-eliminate", name: state.map.name || "Story", goal: normalizeStoryGoal(state.map.meta?.storyGoal), map: state.map };
  }
  state.round = 1;
  state.half = 1;
  state.score = { T: 0, CT: 0 };
  state.fragScore = { player: 0, enemy: 0 };
  camera.pitch = 0;
  setGraphicsMode(hud.menuGraphics.value);
  player.money = serverSettings.startMoney;
  player.armor = 0;
  player.helmet = false;
  player.defuseKit = false;
  player.zeus = false;
  player.kills = 0;
  player.hits = 0;
  player.plants = 0;
  player.defuses = 0;
  makeWeapons();
  if (isSandboxMode()) resetSandboxLoadout();
  else resetLoadout();
  resetRoundPositions();
  spawnBots();
  if (isSandboxMode()) {
    state.phase = "live";
    state.roundTime = 0;
    state.buyTime = 0;
    renderSandboxWorldSummary();
  }
  syncServerControls();
  syncLanHeartbeat(true);
  renderShop();
  renderMissions();
  renderStoryObjective();
  editor.hybridView = "sandbox";
  editor.active = false;
  showMessage(isSandboxMode()
    ? `${state.map.name} / Q: spawn / P: ${isHybridMode() ? "PRZELACZ" : "import-export"} / Physics Gun: LPM`
    : `${state.gameMode.toUpperCase()} / ${rules.label} / ${teamName(state.team)} / ${state.map.name} / dowodca ${settings.nick}`);
}

function swapSidesIfNeeded() {
  if (state.round === 17) {
    state.team = enemyOf(state.team);
    state.enemyTeam = enemyOf(state.team);
    state.half = 2;
    player.money = serverSettings.startMoney;
    resetLoadout();
    showMessage(`Zmiana stron: grasz jako ${teamName(state.team)}`);
  }
}

function endRound(winner, reason) {
  if (state.phase === "ended") return;
  state.phase = "ended";
  state.winner = winner;
  state.score[winner] += 1;
  player.money += winner === state.team ? 3250 : 1900;
  if (winner === state.team) advanceMission("roundWins", 1);
  if (winner === "CT" && state.team === "CT") advanceMission("ctRounds", 1);
  if (winner === state.team) markMapWin();
  if (winner === state.team && state.gameMode === "story") checkStoryObjective("win");
  if (reason.includes("bomba wybuchla")) emitAudioEvent("bombExplode", { x: state.bomb.x, y: state.bomb.y });
  else emitAudioEvent(winner === state.team ? "buy" : "death", { x: player.x, y: player.y });
  showMessage(`${winner} wygrywa: ${reason}`);
  setTimeout(() => {
    state.round += 1;
    if (state.round > activeGameRules().maxRounds) {
      hud.menu.classList.remove("hidden");
      state.running = false;
      showMessage("Mecz zakonczony");
      return;
    }
    swapSidesIfNeeded();
    resetRoundPositions();
    spawnBots();
    renderShop();
  }, 1800);
}

function plantBomb() {
  if (state.team !== "T" || !playerHasBomb() || !isBombSelected()) return;
  const site = currentSite();
  if (!site) {
    showMessage("Musisz byc na bombsite A albo B");
    return;
  }
  state.bomb.status = "planted";
  state.bomb.x = player.x;
  state.bomb.y = player.y;
  state.bomb.site = site;
  state.bomb.timer = 40;
  state.bomb.carrier = "";
  state.activeSpecial = "";
  player.plants += 1;
  advanceMission("plants", 1);
  checkStoryObjective("plant");
  emitAudioEvent("bombPlant", { x: player.x, y: player.y });
  showMessage(`Bomba podlozona na ${site}`);
}

function defuseBomb(dt) {
  if (state.team !== "CT" || state.bomb.status !== "planted") return;
  if (dist(player.x, player.y, state.bomb.x, state.bomb.y) > 62) {
    state.bomb.defuse = 0;
    return;
  }
  state.bomb.defuse += dt;
  if (Math.floor(state.bomb.defuse * 4) !== Math.floor((state.bomb.defuse - dt) * 4)) emitAudioEvent("defuse", { x: state.bomb.x, y: state.bomb.y }, false);
  const defuseTime = player.defuseKit ? 2.5 : 5;
  if (state.bomb.defuse >= defuseTime) {
    player.defuses += 1;
    advanceMission("defuses", 1);
    checkStoryObjective("defuse");
    endRound("CT", "bomba rozbrojona");
  }
}

function useKey(dt) {
  if (!actionDown("use")) {
    state.bomb.defuse = 0;
    player.useLatch = false;
    return;
  }
  if (isBombSelected() && currentSite()) {
    plantBomb();
    return;
  }
  if (state.team === "CT" && state.bomb.status === "planted" && dist(player.x, player.y, state.bomb.x, state.bomb.y) <= 62) {
    defuseBomb(dt);
    return;
  }
  if (state.team === "CT" && state.bomb.status === "planted") state.bomb.defuse = 0;
  if (!player.useLatch) {
    if (!pickupDroppedBomb()) pickupDroppedWeapon();
  }
  player.useLatch = true;
}

function updateRoundRules(dt) {
  if (isSandboxMode()) return;
  if (state.phase === "freeze") {
    state.buyTime = Math.max(0, state.buyTime - dt);
    state.freezeTime -= dt;
    if (state.freezeTime <= 0) {
      state.phase = "live";
      for (const actor of [...bots, ...allies]) actor.openingMove = Math.max(1.25, Number(actor.openingMove || 0));
    }
    return;
  }
  if (state.phase !== "live") return;
  state.roundTime -= dt;
  state.buyTime = Math.max(0, state.buyTime - dt);
  if (isRespawnMode()) {
    const limit = activeGameRules().fragLimit || 30;
    if (state.roundTime <= 0 || state.fragScore.player >= limit || state.fragScore.enemy >= limit) {
      const winner = state.fragScore.player >= state.fragScore.enemy ? state.team : state.enemyTeam;
      endRound(winner, `deathmatch ${state.fragScore.player}:${state.fragScore.enemy}`);
    }
    return;
  }
  checkStoryObjective();
  if (state.phase === "ended") return;
  if (state.bomb.status === "planted") {
    state.bomb.timer -= dt;
    const beepDelay = state.bomb.timer < 10 ? 360 : state.bomb.timer < 20 ? 620 : 980;
    const now = performance.now();
    if (now - audio.lastBombBeep > beepDelay) {
      audio.lastBombBeep = now;
      emitAudioEvent("bombBeep", { x: state.bomb.x, y: state.bomb.y, fast: state.bomb.timer < 10 }, false);
    }
    if (state.bomb.timer <= 0) endRound("T", "bomba wybuchla");
  } else if (state.roundTime <= 0) {
    endRound("CT", "czas rundy minal");
  }
  if (bots.every((bot) => bot.hp <= 0)) {
    if (state.team === "T" && state.bomb.status === "planted") return;
    endRound(state.team, "eliminacja druzyny przeciwnej");
  }
}

function buyItem(type, id) {
  if (!canBuyNow()) {
    showMessage(buyBlockMessage());
    renderShop();
    return;
  }
  if (type === "weapon") {
    const weapon = weapons[id];
    if (!weapon || !sideAllows(weapon)) return;
    if (!weapon.owned) {
      if (player.money < weapon.price) return showMessage("Za malo kasy");
      dropOwnedWeaponCategory(weapon.category, weapon.id);
      player.money -= weapon.price;
      weapon.owned = true;
      weapon.ammo = weapon.magSize;
      weapon.currentReserve = weapon.reserve;
    }
    player.weaponId = weapon.id;
    emitAudioEvent("buy", { x: player.x, y: player.y });
    showMessage(`Wyposazono: ${weapon.name}`);
  }
  if (type === "grenade") {
    const grenade = grenadeCatalog[id];
    if (!grenade || !sideAllows(grenade)) return;
    const count = player.grenades[grenade.name] || 0;
    const totalGrenades = Object.values(player.grenades).reduce((sum, amount) => sum + Number(amount || 0), 0);
    const typeLimit = grenade.key === "flash" ? 2 : 1;
    if (totalGrenades >= 4 || count >= typeLimit) return showMessage("Limit granatow");
    if (player.money < grenade.price) return showMessage("Za malo kasy");
    player.money -= grenade.price;
    player.grenades[grenade.name] = count + 1;
    emitAudioEvent("buy", { x: player.x, y: player.y });
    showMessage(`Kupiono: ${grenade.name}`);
  }
  if (type === "equipment") {
    const item = equipmentCatalog[id];
    if (!item || !sideAllows(item)) return;
    if (ownsEquipment(item)) return showMessage(settings.language === "en" ? "Already owned" : "Juz posiadasz");
    const price = equipmentPrice(item);
    if (player.money < price) return showMessage("Za malo kasy");
    player.money -= price;
    if (item.key === "armor") player.armor = Math.max(player.armor, item.value);
    if (item.key === "helmet") {
      player.armor = Math.max(player.armor, item.value);
      player.helmet = true;
    }
    if (item.key === "defuseKit") player.defuseKit = true;
    if (item.key === "zeus") player.zeus = true;
    emitAudioEvent("buy", { x: player.x, y: player.y });
    showMessage(`Kupiono: ${item.name}`);
  }
  renderShop();
  updateHud();
}

function canBuyNow() {
  if (isSandboxMode()) return false;
  return (state.phase === "freeze" || state.phase === "live") && state.buyTime > 0 && inBuyZone();
}

function buyBlockMessage() {
  if (!inBuyZone()) return settings.language === "en" ? "Return to your buy zone" : "Wroc do swojej strefy kupowania";
  if (state.buyTime <= 0) return settings.language === "en" ? "Buy time has ended" : "Czas kupowania minal";
  return settings.language === "en" ? "Buying unavailable" : "Kupowanie niedostepne";
}

function weaponDropData(weapon, x = player.x, y = player.y) {
  return {
    weaponId: weapon.id,
    name: weapon.name,
    category: weapon.category,
    side: weapon.side,
    ammo: weapon.ammo,
    currentReserve: weapon.currentReserve,
    x: clamp(x, 24, state.map.w - 24),
    y: clamp(y, 24, state.map.h - 24),
    angle: player.angle,
    color: weapon.color,
  };
}

function dropWeaponAt(weapon, x, y, angle = Math.random() * Math.PI * 2) {
  if (!weapon || weapon.droppable === false || weapon.melee) return false;
  droppedWeapons.push(weaponDropData(weapon, x, y));
  droppedWeapons[droppedWeapons.length - 1].angle = angle;
  return true;
}

function dropPlayerLoadoutOnDeath() {
  let dropped = 0;
  for (const weapon of ownedWeapons()) {
    if (weapon.droppable === false || weapon.melee) continue;
    if (dropWeaponAt(weapon, player.x + (Math.random() - 0.5) * 34, player.y + (Math.random() - 0.5) * 34)) {
      weapon.owned = false;
      weapon.cooldown = 0;
      weapon.reloading = 0;
      dropped += 1;
    }
  }
  state.activeSpecial = "";
  const knife = weapons[knifeWeaponId()];
  if (knife) {
    knife.owned = true;
    player.weaponId = knife.id;
  }
  if (playerHasBomb()) dropBombAt(player.x, player.y);
  if (dropped) renderShop();
}

function dropActorLoadoutOnDeath(actor) {
  if (!actor || actor.droppedLoadout) return;
  actor.droppedLoadout = true;
  const names = Array.isArray(actor.weapons) ? actor.weapons : [actor.weapon].filter(Boolean);
  for (const name of names) {
    const weapon = weapons.find((item) => item.name === name);
    dropWeaponAt(weapon, actor.x + (Math.random() - 0.5) * 28, actor.y + (Math.random() - 0.5) * 28);
  }
}

function dropBombAt(x = player.x, y = player.y) {
  if (!playerHasBomb()) return false;
  state.bomb.status = "dropped";
  state.bomb.carrier = "";
  state.bomb.x = x;
  state.bomb.y = y;
  state.bomb.site = "";
  state.activeSpecial = "";
  return true;
}

function dropWeapon(weapon, { force = false, silent = false } = {}) {
  if (!weapon?.owned) return false;
  if (weapon.droppable === false || weapon.melee) {
    if (!silent) showMessage("Noza nie mozna wyrzucic");
    return false;
  }
  const carrying = ownedWeapons();
  if (!force && carrying.length <= 1) {
    if (!silent) showMessage("Nie mozesz wyrzucic ostatniej broni");
    return false;
  }
  droppedWeapons.push(weaponDropData(weapon, player.x + Math.cos(player.angle) * 38, player.y + Math.sin(player.angle) * 38));
  weapon.owned = false;
  weapon.cooldown = 0;
  weapon.reloading = 0;
  if (player.weaponId === weapon.id) {
    const fallback = ownedWeapons().find((item) => item.id !== weapon.id);
    if (fallback) player.weaponId = fallback.id;
  }
  if (!silent) {
    emitAudioEvent("ui", { x: player.x, y: player.y }, false);
    showMessage(`Wyrzucono: ${weapon.name}`);
  }
  renderShop();
  updateHud();
  return true;
}

function dropOwnedWeaponCategory(category, exceptId = -1) {
  const existing = weapons.find((weapon) => weapon.owned && weapon.category === category && weapon.id !== exceptId && weapon.droppable !== false && !weapon.melee);
  if (existing) dropWeapon(existing, { force: true, silent: true });
}

function dropActiveWeapon() {
  if (!state.running || state.overlayOpen || !player.alive) return;
  if (isBombSelected()) return showMessage("Bomby nie wyrzucasz jak broni");
  if (isGrenadeSelected()) return showMessage("Granat wybierz ponownie albo rzuc LPM");
  dropWeapon(activeWeapon());
}

function nearestDroppedWeapon(range = 70) {
  let best = null;
  for (const item of droppedWeapons) {
    const d = dist(player.x, player.y, item.x, item.y);
    if (d <= range && (!best || d < best.d)) best = { item, d };
  }
  return best?.item || null;
}

function pickupDroppedWeapon() {
  const item = nearestDroppedWeapon();
  if (!item) return false;
  const weapon = weapons[item.weaponId] || weapons.find((candidate) => candidate.name === item.name);
  if (!weapon) return false;
  dropOwnedWeaponCategory(weapon.category, weapon.id);
  weapon.owned = true;
  weapon.ammo = clamp(Number(item.ammo), 0, weapon.magSize);
  weapon.currentReserve = clamp(Number(item.currentReserve), 0, weapon.reserve);
  weapon.cooldown = 0;
  weapon.reloading = 0;
  state.activeSpecial = "";
  player.weaponId = weapon.id;
  droppedWeapons.splice(droppedWeapons.indexOf(item), 1);
  emitAudioEvent("buy", { x: player.x, y: player.y }, false);
  showMessage(`Podniesiono: ${weapon.name}`);
  renderShop();
  updateHud();
  return true;
}

function pickupDroppedBomb() {
  if (state.bomb.status !== "dropped") return false;
  if (dist(player.x, player.y, state.bomb.x, state.bomb.y) > 74) return false;
  if (state.team !== "T") {
    showMessage("Tylko T moze podniesc bombe");
    return false;
  }
  state.bomb.status = "carried";
  state.bomb.carrier = "player";
  state.activeSpecial = "bomb";
  emitAudioEvent("buy", { x: player.x, y: player.y }, false);
  showMessage("Podniesiono C4");
  updateHud();
  return true;
}

function beginGrenadeAim() {
  const catalog = selectedGrenade();
  if (!catalog || state.phase !== "live" || state.overlayOpen) return false;
  if (!state.grenadePrime) {
    state.grenadePrime = { name: catalog.name, startedAt: performance.now(), jumpThrowQueued: false };
    showMessage(`${catalog.name}: pusc LPM aby rzucic`);
  }
  return true;
}

function throwGrenade(jumpThrow = false) {
  const name = state.grenadePrime?.name || selectedGrenadeName();
  const catalog = grenadeCatalog.find((grenade) => grenade.name === name);
  if (!catalog || (player.grenades[name] || 0) <= 0) {
    state.grenadePrime = null;
    return false;
  }
  const launchAngle = player.angle;
  const horizontalSpeed = jumpThrow ? 650 : 570;
  player.grenades[name] -= 1;
  grenades.push({
    x: player.x + Math.cos(launchAngle) * (player.r + 8),
    y: player.y + Math.sin(launchAngle) * (player.r + 8),
    z: player.eyeHeight + player.jumpHeight,
    vx: Math.cos(launchAngle) * horizontalSpeed,
    vy: Math.sin(launchAngle) * horizontalSpeed,
    vz: jumpThrow ? 300 : 190,
    timer: 1.5,
    type: catalog.key,
    color: catalog.color,
    jumpThrow,
  });
  state.grenadePrime = null;
  if ((player.grenades[name] || 0) <= 0) state.activeSpecial = "";
  emitAudioEvent("grenadeThrow", { x: player.x, y: player.y, type: catalog.key });
  advanceMission("grenade", 1);
  showMessage(jumpThrow ? `${catalog.name}: JUMP THROW` : `${catalog.name}: rzut`);
  renderShop();
  updateHud();
  return true;
}

function releaseGrenadeAim() {
  if (!state.grenadePrime) return false;
  return throwGrenade(isPerspectiveMode() && player.jumpHeight > 0);
}

function explodeGrenade(grenade) {
  emitAudioEvent("grenadeExplode", { x: grenade.x, y: grenade.y, type: grenade.type });
  effects.push({ x: grenade.x, y: grenade.y, r: grenade.type === "smoke" ? 130 : 86, life: grenade.type === "smoke" ? 7 : 0.45, type: grenade.type, color: grenade.color });
  if (grenade.type === "he" || grenade.type === "fire") {
    for (const bot of bots) {
      if (bot.hp > 0 && dist(grenade.x, grenade.y, bot.x, bot.y) < 120) {
        damageActor(bot, grenade.type === "he" ? 60 : 35);
        awardPlayerHit(bot);
      }
    }
    if (serverSettings.friendlyFire) {
      const amount = teamDamage(grenade.type === "he" ? 60 : 35);
      for (const ally of allies) {
        if (ally.hp > 0 && dist(grenade.x, grenade.y, ally.x, ally.y) < 120) damageActor(ally, amount);
      }
    }
  }
  if (grenade.type === "flash") {
    for (const bot of bots) {
      if (bot.hp > 0 && dist(grenade.x, grenade.y, bot.x, bot.y) < 260 && hasLineOfSight(grenade.x, grenade.y, bot.x, bot.y)) bot.flashed = 2.4;
    }
  }
}

function awardPlayerHit(bot) {
  player.hits += 1;
  advanceMission("hits", 1);
  if (bot.hp <= 0) {
    if (isRespawnMode()) {
      bot.respawnTimer = 2.2;
      bot.deathCounted = true;
    }
    else dropActorLoadoutOnDeath(bot);
    player.kills += 1;
    player.roundKills += 1;
    if (isRespawnMode()) state.fragScore.player += 1;
    player.money += 300;
    advanceMission("kills", 1);
    advanceMission("category", 1, activeWeapon().category);
    emitAudioEvent("death", { x: bot.x, y: bot.y }, false);
  } else {
    emitAudioEvent("hit", { x: bot.x, y: bot.y }, false);
  }
}

function meleeAttack(owner, angle, weapon, hostile = false) {
  if (!hostile && owner === player) {
    if (state.phase !== "live" || state.overlayOpen) return;
    if (weapon.cooldown > 0) return;
    weapon.cooldown = weapon.fireDelay / 1000;
    camera.shake = Math.min(8, camera.shake + 2.2 * settings.screenShake);
  }
  emitAudioEvent("gun", { x: owner.x, y: owner.y, weapon, hostile }, !hostile && owner === player);
  const reach = 78;
  const arc = Math.PI / 2.35;
  if (hostile) {
    if (dist(owner.x, owner.y, player.x, player.y) <= reach && Math.abs(angleDiff(angle, angleTo(owner.x, owner.y, player.x, player.y))) <= arc && hasLineOfSight(owner.x, owner.y, player.x, player.y)) {
      damagePlayer(weapon.damage || 35);
    }
    return;
  }
  let best = null;
  for (const bot of bots) {
    if (bot.hp <= 0) continue;
    const d = dist(owner.x, owner.y, bot.x, bot.y);
    const rel = Math.abs(angleDiff(angle, angleTo(owner.x, owner.y, bot.x, bot.y)));
    if (d <= reach && rel <= arc && hasLineOfSight(owner.x, owner.y, bot.x, bot.y) && (!best || d < best.d)) best = { bot, d };
  }
  if (best) {
    damageActor(best.bot, weapon.damage);
    awardPlayerHit(best.bot);
  } else if (owner === player && serverSettings.friendlyFire) {
    const ally = allies.find((item) => item.hp > 0 && dist(owner.x, owner.y, item.x, item.y) <= reach && Math.abs(angleDiff(angle, angleTo(owner.x, owner.y, item.x, item.y))) <= arc && hasLineOfSight(owner.x, owner.y, item.x, item.y));
    if (ally) damageActor(ally, teamDamage(weapon.damage));
    else emitAudioEvent("dryfire", { x: owner.x, y: owner.y }, false);
  } else {
    emitAudioEvent("dryfire", { x: owner.x, y: owner.y }, false);
  }
}

function shoot(owner, angle, weapon, hostile = false) {
  if (weapon.melee) {
    meleeAttack(owner, angle, weapon, hostile);
    return;
  }
  let burstShots = 1;
  if (!hostile && owner === player) {
    if (state.phase !== "live" || state.overlayOpen) return;
    if (weapon.reloading > 0 || weapon.cooldown > 0) return;
    if (weapon.ammo <= 0) {
      emitAudioEvent("dryfire", { x: owner.x, y: owner.y }, false);
      if (settings.autoReload) reload();
      return;
    }
    burstShots = weapon.burstCapable && weapon.fireMode === "burst" ? Math.min(weapon.burstCount || 3, weapon.ammo) : 1;
    weapon.ammo -= burstShots;
    if (isSandboxMode() && settings.sandboxUnlimitedAmmo) weapon.ammo = weapon.magSize;
    weapon.cooldown = weapon.burstCapable && weapon.fireMode === "burst" ? (weapon.burstDelay || weapon.fireDelay) / 1000 : weapon.fireDelay / 1000;
    camera.shake = Math.min(10, camera.shake + weapon.recoil * 90 * settings.screenShake * burstShots);
  }
  emitAudioEvent("gun", { x: owner.x, y: owner.y, weapon, hostile }, !hostile && owner === player);
  const pelletCount = weapon.pellets || 1;
  for (let burst = 0; burst < burstShots; burst += 1) {
    for (let i = 0; i < pelletCount; i += 1) {
      const aimFactor = !hostile && owner === player && (isAwpScoped() || isIronSights()) ? (isAwpScoped() ? 0.16 : 0.52) : 1;
      const spread = hostile ? 0.11 * difficultyScale() : (weapon.spread + weapon.recoil * Math.min(1.5, owner.speedFactor || 0)) * aimFactor;
      const burstOffset = (burst - (burstShots - 1) / 2) * 0.018;
      const a = angle + (Math.random() - 0.5) * spread + burstOffset;
      bullets.push({
        x: owner.x + Math.cos(a) * (owner.r + 18),
        y: owner.y + Math.sin(a) * (owner.r + 18),
        vx: Math.cos(a) * (hostile ? weapon.bulletSpeed || 760 * difficultyScale() : weapon.bulletSpeed),
        vy: Math.sin(a) * (hostile ? weapon.bulletSpeed || 760 * difficultyScale() : weapon.bulletSpeed),
        damage: hostile ? weapon.damage || 10 * difficultyScale() : weapon.damage,
        owner,
        team: owner.team || (hostile ? state.enemyTeam : state.team),
        weaponName: weapon.name || owner.weapon || "",
        weaponCategory: weapon.category || "",
        hostile,
        life: 0.95,
        color: hostile ? "#f06d58" : "#f5df88",
      });
    }
  }
}

function reload() {
  if (isBombSelected() || isGrenadeSelected()) return;
  const weapon = activeWeapon();
  if (weapon.melee) return;
  if (weapon.reloading > 0 || weapon.ammo === weapon.magSize || weapon.currentReserve <= 0) return;
  weapon.reloading = weapon.reloadTime;
  emitAudioEvent("reload", { x: player.x, y: player.y, weapon });
  showMessage(`Przeladowanie: ${weapon.name}`);
}

function sandboxAimObject() {
  if (!isSandboxMode()) return null;
  if (isPerspectiveMode()) {
    const hit = castRayHit(player.angle);
    return hit.d <= 520 && hit.hit && !hit.hit.sandboxBoundary && !hit.hit.locked ? hit.hit : null;
  }
  const worldX = mouse.x + camera.x;
  const worldY = mouse.y + camera.y;
  const direct = [...state.map.obstacles].reverse().find((object) => !object.sandboxBoundary && !object.locked && pointInMapObstacle(worldX, worldY, object));
  if (direct) return direct;
  return state.map.obstacles
    .filter((object) => !object.sandboxBoundary && !object.locked)
    .map((object) => ({ object, distance: dist(worldX, worldY, object.x + object.w / 2, object.y + object.h / 2) }))
    .filter((entry) => entry.distance < 48)
    .sort((a, b) => a.distance - b.distance)[0]?.object || null;
}

function beginPhysicsGrab() {
  if (!isPhysicsGunActive()) return false;
  const object = sandboxAimObject();
  if (!object) {
    showMessage(settings.language === "en" ? "Physics Gun: no movable object" : "Physics Gun: brak ruchomego obiektu");
    return true;
  }
  sandbox.heldObjectId = object.id;
  sandbox.holdDistance = clamp(dist(player.x, player.y, object.x + object.w / 2, object.y + object.h / 2), 80, 520);
  emitAudioEvent("ui", { x: player.x, y: player.y }, false);
  return true;
}

function releasePhysicsGrab() {
  if (!sandbox.heldObjectId) return false;
  sandbox.heldObjectId = "";
  emitAudioEvent("ui", { x: player.x, y: player.y }, false);
  return true;
}

function updatePhysicsGun() {
  if (!sandbox.heldObjectId || !isSandboxMode()) return;
  const object = state.map.obstacles.find((item) => item.id === sandbox.heldObjectId);
  if (!object || object.locked || object.sandboxBoundary) {
    sandbox.heldObjectId = "";
    return;
  }
  const target = isPerspectiveMode()
    ? { x: player.x + Math.cos(player.angle) * sandbox.holdDistance, y: player.y + Math.sin(player.angle) * sandbox.holdDistance }
    : { x: mouse.x + camera.x, y: mouse.y + camera.y };
  object.x = clamp(target.x - object.w / 2, 30, state.map.w - object.w - 30);
  object.y = clamp(target.y - object.h / 2, 30, state.map.h - object.h - 30);
}

function updatePlayer(dt) {
  if (!player.alive || state.overlayOpen || state.phase === "ended") return;
  useKey(dt);
  const forward = (actionDown("forward") ? 1 : 0) - (actionDown("back") ? 1 : 0);
  const strafe = (actionDown("right") ? 1 : 0) - (actionDown("left") ? 1 : 0);
  const len = Math.hypot(forward, strafe) || 1;
  const walking = keys.has("ShiftLeft") || keys.has("ShiftRight") || state.phase === "freeze";
  let speed = player.speed * (walking ? 0.58 : 1);
  if (isAwpScoped() || isIronSights()) speed *= 0.72;
  if (isPerspectiveMode()) {
    const wantsJump = actionDown("dash");
    const sandboxFlight = isSandboxMode() && player.noclipMode;
    if (sandboxFlight) {
      player.verticalVelocity = 0;
      player.jumpHeight = clamp(player.jumpHeight + ((wantsJump ? 1 : 0) - (actionDown("crouch") ? 1 : 0)) * speed * dt, 0, 320);
    } else if (wantsJump && !player.jumpLatch && player.jumpHeight <= 0 && state.phase === "live") {
      player.jumpHeight = 0.01;
      player.verticalVelocity = 245;
      player.jumpLatch = true;
    }
    if (!wantsJump) player.jumpLatch = false;
    if (!sandboxFlight) {
      player.verticalVelocity -= serverSettings.gravity * dt;
      player.jumpHeight += player.verticalVelocity * dt;
      if (player.jumpHeight <= 0) {
        player.jumpHeight = 0;
        player.verticalVelocity = 0;
      }
    }
    player.crouched = !sandboxFlight && actionDown("crouch");
    const targetEyeHeight = player.crouched ? 38 : 58;
    player.eyeHeight += (targetEyeHeight - player.eyeHeight) * clamp(dt * 14, 0, 1);
    if (player.crouched) speed *= 0.54;
    player.dash = 0;
    if (state.grenadePrime?.jumpThrowQueued && player.jumpHeight > 0) throwGrenade(true);
  } else {
    player.jumpHeight = 0;
    player.verticalVelocity = 0;
    player.jumpLatch = false;
    player.crouched = false;
    player.eyeHeight = 58;
    if (actionDown("dash") && player.dash <= 0 && state.phase === "live" && (forward || strafe)) player.dash = 0.18;
    if (player.dash > 0) {
      speed *= 2.2;
      player.dash -= dt;
    }
  }
  player.speedFactor = Math.hypot(forward, strafe) * (walking ? 0.25 : player.crouched ? 0.54 : 1);
  if (isPerspectiveMode()) {
    const vx = Math.cos(player.angle) * forward * speed + Math.cos(player.angle + Math.PI / 2) * strafe * speed;
    const vy = Math.sin(player.angle) * forward * speed + Math.sin(player.angle + Math.PI / 2) * strafe * speed;
    if (player.noclipMode && isSandboxMode()) {
      player.x = clamp(player.x + (vx / len) * dt, player.r, state.map.w - player.r);
      player.y = clamp(player.y + (vy / len) * dt, player.r, state.map.h - player.r);
    } else moveEntity(player, vx / len, vy / len, dt);
  } else {
    moveEntity(player, (strafe / len) * speed, (-forward / len) * speed, dt);
    player.angle = angleTo(player.x, player.y, mouse.x + camera.x, mouse.y + camera.y);
  }
  maybeStep(player, Boolean(forward || strafe), walking || player.crouched);
  const weapon = activeWeapon();
  weapon.cooldown = Math.max(0, weapon.cooldown - dt);
  if (weapon.reloading > 0) {
    weapon.reloading -= dt;
    if (weapon.reloading <= 0) {
      const need = weapon.magSize - weapon.ammo;
      const take = Math.min(need, weapon.currentReserve);
      weapon.ammo += take;
      weapon.currentReserve -= take;
      emitAudioEvent("reloadDone", { x: player.x, y: player.y, weapon }, false);
    }
  }
  updatePhysicsGun();
  if (!isPhysicsGunActive() && !isBombSelected() && !isGrenadeSelected() && mouse.down && (weapon.automatic || mouse.clicked)) shoot(player, player.angle, weapon);
  mouse.clicked = false;
  player.invuln = Math.max(0, player.invuln - dt);
}

function updateBots(dt) {
  if (state.phase !== "live" || serverSettings.botStop) return;
  for (const bot of bots) {
    if (bot.hp <= 0) continue;
    bot.flashed = Math.max(0, bot.flashed - dt);
    bot.openingMove = Math.max(0, Number(bot.openingMove || 0) - dt);
    const a = angleTo(bot.x, bot.y, player.x, player.y);
    bot.angle = a;
    const d = dist(bot.x, bot.y, player.x, player.y);
    const los = hasLineOfSight(bot.x, bot.y, player.x, player.y);
    const targetSite = state.enemyTeam === "T" ? state.map.sites[state.bomb.site || (Math.random() < 0.5 ? "A" : "B")] : null;
    const editorWaypoint = nextEditorWaypoint(bot);
    if (bot.flashed <= 0 && (bot.openingMove > 0 || !los || d > 260 || player.notargetMode)) {
      const tx = editorWaypoint?.x ?? targetSite?.x ?? player.x;
      const ty = editorWaypoint?.y ?? targetSite?.y ?? player.y;
      const openingTarget = state.enemyTeam === "T" ? (targetSite || { x: state.map.w / 2, y: state.map.h / 2 }) : { x: state.map.w / 2, y: state.map.h / 2 };
      const moveA = bot.openingMove > 0
        ? angleTo(bot.x, bot.y, editorWaypoint?.x ?? openingTarget.x, editorWaypoint?.y ?? openingTarget.y)
        : angleTo(bot.x, bot.y, tx, ty) + Math.sin(performance.now() / 420 + bot.x) * 0.45;
      moveEntity(bot, Math.cos(moveA) * bot.speed, Math.sin(moveA) * bot.speed, dt);
      maybeStep(bot, true, false);
    }
    bot.fire -= dt * 1000;
    if (!bot.passive && bot.fire <= 0 && los && d < 740 && player.alive && !player.notargetMode && bot.flashed <= 0) {
      const weapon = actorWeaponStats(bot);
      shoot(bot, a, weapon, true);
      bot.fire = Math.max(260, (weapon.fireDelay || 520) / difficultyScale()) + Math.random() * 440;
    }
    if (d < bot.r + player.r) damagePlayer(16 * dt * difficultyScale());
  }
}

function updateAllies(dt) {
  if (state.phase !== "live" || serverSettings.botStop) return;
  const aliveEnemies = bots.filter((bot) => bot.hp > 0);
  for (const ally of allies) {
    if (ally.hp <= 0) continue;
    const target = aliveEnemies.sort((a, b) => dist(ally.x, ally.y, a.x, a.y) - dist(ally.x, ally.y, b.x, b.y))[0];
    if (!target) continue;
    const a = angleTo(ally.x, ally.y, target.x, target.y);
    ally.angle = a;
    const d = dist(ally.x, ally.y, target.x, target.y);
    const los = hasLineOfSight(ally.x, ally.y, target.x, target.y);
    const editorWaypoint = nextEditorWaypoint(ally);
    if (!los || d > 360) {
      const moveAngle = editorWaypoint ? angleTo(ally.x, ally.y, editorWaypoint.x, editorWaypoint.y) : a;
      moveEntity(ally, Math.cos(moveAngle) * ally.speed, Math.sin(moveAngle) * ally.speed, dt);
      maybeStep(ally, true, false);
    }
    ally.fire -= dt * 1000;
    if (ally.fire <= 0 && los && d < 680) {
      const weapon = actorWeaponStats(ally);
      shoot(ally, a, weapon, false);
      ally.fire = Math.max(300, weapon.fireDelay || 620) + Math.random() * 460;
    }
  }
}

function livingTeamBots() {
  return allies.filter((ally) => ally.hp > 0);
}

function currentSpectatorTarget() {
  const living = livingTeamBots();
  if (!living.length) {
    state.spectator.target = null;
    return null;
  }
  state.spectator.index = clamp(state.spectator.index, 0, living.length - 1);
  state.spectator.target = living[state.spectator.index];
  return state.spectator.target;
}

function cycleSpectatorTarget(direction = 1) {
  if (!state.spectator.active || player.alive) return;
  const living = livingTeamBots();
  if (!living.length) {
    currentSpectatorTarget();
    return;
  }
  state.spectator.index = (state.spectator.index + direction + living.length) % living.length;
  state.spectator.target = living[state.spectator.index];
  const target = state.spectator.target;
  const takeoverHint = target.source === "LAN" ? "slot LAN tylko obserwacja" : "E przejmuje bota";
  showMessage(`Obserwujesz ${target.name} (${state.spectator.index + 1}/${living.length}) - ${takeoverHint}`);
}

function enterSpectator() {
  if (state.phase === "ended") return;
  state.spectator.active = true;
  state.spectator.index = 0;
  state.spectator.takeoverLatch = true;
  mouse.down = false;
  mouse.clicked = false;
  state.grenadePrime = null;
  player.jumpHeight = 0;
  player.verticalVelocity = 0;
  player.crouched = false;
  player.eyeHeight = 58;
  const target = currentSpectatorTarget();
  if (!target) {
    if (isRespawnMode()) {
      showMessage("Odrodzenie za chwile...");
      return;
    }
    endRound(state.enemyTeam, "twoja druzyna wyeliminowana");
    return;
  }
  const takeoverHint = target.source === "LAN" ? "slot LAN tylko obserwacja" : "E przejmuje bota";
  showMessage(`Nie zyjesz - obserwujesz ${target.name}. Strzalki/klik zmieniaja cel, ${takeoverHint}.`);
}

function leaveSpectator() {
  state.spectator.active = false;
  state.spectator.target = null;
  state.spectator.takeoverLatch = false;
}

function takeoverBot(bot) {
  const index = allies.indexOf(bot);
  if (index < 0 || bot.hp <= 0 || bot.source === "LAN") return;
  player.x = bot.x;
  player.y = bot.y;
  player.angle = bot.angle || player.angle;
  player.hp = clamp(bot.hp, 1, 100);
  player.alive = true;
  player.invuln = 0.35;
  player.jumpHeight = 0;
  player.verticalVelocity = 0;
  player.jumpLatch = false;
  player.crouched = false;
  player.eyeHeight = 58;
  player.armor = clamp(Number(bot.armor || bot.loadout?.armor || 0), 0, 100);
  player.helmet = Boolean(bot.helmet || bot.loadout?.helmet);
  player.defuseKit = Boolean(bot.defuseKit || bot.loadout?.defuseKit);
  player.zeus = Boolean(bot.zeus || bot.loadout?.zeus);
  player.grenades = {};
  for (const grenade of bot.grenades || bot.loadout?.grenades || []) player.grenades[grenade] = (player.grenades[grenade] || 0) + 1;
  const knife = weapons[knifeWeaponId()];
  for (const weapon of weapons) weapon.owned = weapon === knife;
  const botWeapon = weapons.find((weapon) => weapon.name === bot.weapon) || weapons[defaultWeaponId(state.team)];
  botWeapon.owned = true;
  botWeapon.ammo = clamp(Number(bot.loadout?.ammo || botWeapon.magSize), 0, botWeapon.magSize);
  botWeapon.currentReserve = clamp(Number(bot.loadout?.reserve ?? botWeapon.reserve), 0, botWeapon.reserve);
  botWeapon.cooldown = 0;
  botWeapon.reloading = 0;
  player.weaponId = botWeapon.id;
  state.activeSpecial = "";
  mouse.rightDown = false;
  allies.splice(index, 1);
  leaveSpectator();
  renderTeams();
  renderShop();
  updateHud();
  showMessage(`Przejales ${bot.name}: ${botWeapon.name}. Grasz dalej.`);
}

function updateSpectator() {
  if (player.alive || !state.spectator.active || state.overlayOpen || state.phase === "ended") return;
  const target = currentSpectatorTarget();
  if (!target) {
    if (isRespawnMode()) return;
    endRound(state.enemyTeam, "twoja druzyna wyeliminowana");
    return;
  }
  player.x = target.x;
  player.y = target.y;
  player.angle = target.angle || player.angle;
  const wantsTakeover = actionDown("use");
  if (wantsTakeover && !state.spectator.takeoverLatch) takeoverBot(target);
  state.spectator.takeoverLatch = wantsTakeover;
}

function damagePlayer(amount) {
  if (player.invuln > 0 || !player.alive || player.godMode) return;
  const armorBlock = Math.min(player.armor, amount * 0.5);
  player.armor -= armorBlock;
  player.hp -= amount - armorBlock;
  player.invuln = 0.12;
  emitAudioEvent("hit", { x: player.x, y: player.y }, false);
  if (player.hp <= 0) {
    player.hp = 0;
    player.alive = false;
    if (isRespawnMode()) {
      player.respawnTimer = 2.5;
      state.fragScore.enemy += 1;
    } else dropPlayerLoadoutOnDeath();
    emitAudioEvent("death", { x: player.x, y: player.y });
    enterSpectator();
  }
}

function respawnActor(actor, team) {
  const spawn = findSafePoint(team === "T" ? state.map.tSpawn : state.map.ctSpawn);
  actor.x = clamp(spawn.x + (Math.random() - 0.5) * 120, actor.r, state.map.w - actor.r);
  actor.y = clamp(spawn.y + (Math.random() - 0.5) * 120, actor.r, state.map.h - actor.r);
  actor.hp = 100;
  actor.armor = Math.max(0, Number(actor.armor || 0));
  actor.flashed = 0;
  actor.fire = 450 + Math.random() * 500;
  actor.respawnTimer = 0;
  actor.openingMove = 0.8;
  actor.deathCounted = false;
}

function updateRespawns(dt) {
  if (!isRespawnMode() || state.phase !== "live") return;
  if (!player.alive) {
    player.respawnTimer = Math.max(0, Number(player.respawnTimer || 0) - dt);
    if (player.respawnTimer <= 0) {
      respawnActor(player, state.team);
      player.alive = true;
      player.invuln = 1.2;
      player.hp = 100;
      player.jumpHeight = 0;
      player.verticalVelocity = 0;
      state.activeSpecial = "";
      mouse.rightDown = false;
      leaveSpectator();
      showMessage("Odrodzenie");
    }
  }
  for (const actor of [...bots, ...allies]) {
    if (actor.hp > 0) continue;
    actor.respawnTimer = Math.max(0, Number(actor.respawnTimer || 2.2) - dt);
    if (actor.respawnTimer <= 0) respawnActor(actor, actor.team);
  }
}

function damageActor(actor, amount, ignoreArmor = false) {
  const armor = Number(actor.armor || 0);
  const armorBlock = ignoreArmor ? 0 : Math.min(armor, amount * 0.45);
  actor.armor = Math.max(0, armor - armorBlock);
  actor.hp -= amount - armorBlock;
}

function teamDamage(amount) {
  return amount * serverSettings.teamDamageScale;
}

function updateBullets(dt) {
  for (let i = bullets.length - 1; i >= 0; i -= 1) {
    const b = bullets[i];
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.life -= dt;
    const hitWall = pointInObstacle(b.x, b.y);
    let remove = b.life <= 0 || b.x < 0 || b.y < 0 || b.x > state.map.w || b.y > state.map.h || hitWall;
    if (!remove && b.hostile && dist(b.x, b.y, player.x, player.y) < player.r) {
      damagePlayer(b.damage);
      remove = true;
    }
    if (!remove && b.hostile) {
      for (const ally of allies) {
        if (ally.hp > 0 && dist(b.x, b.y, ally.x, ally.y) < ally.r) {
          damageActor(ally, b.damage);
          if (ally.hp <= 0) {
            if (isRespawnMode() && !ally.deathCounted) {
              ally.respawnTimer = 2.2;
              ally.deathCounted = true;
              state.fragScore.enemy += 1;
            } else if (!isRespawnMode()) dropActorLoadoutOnDeath(ally);
          }
          emitAudioEvent(ally.hp <= 0 ? "death" : "hit", { x: ally.x, y: ally.y }, false);
          remove = true;
          break;
        }
      }
    }
    if (!remove && !b.hostile) {
      for (const bot of bots) {
        if (bot.hp > 0 && dist(b.x, b.y, bot.x, bot.y) < bot.r) {
          const awpKill = b.owner === player && b.weaponName === "AWP";
          damageActor(bot, awpKill ? Math.max(200, b.damage) : b.damage, awpKill);
          if (b.owner === player) awardPlayerHit(bot);
          remove = true;
          break;
        }
      }
    }
    if (!remove && !b.hostile && b.owner === player && serverSettings.friendlyFire) {
      for (const ally of allies) {
        if (ally.hp > 0 && dist(b.x, b.y, ally.x, ally.y) < ally.r) {
          damageActor(ally, teamDamage(b.damage));
          remove = true;
          break;
        }
      }
    }
    if (!remove && !b.hostile && b.owner !== player && serverSettings.friendlyFire && player.alive && dist(b.x, b.y, player.x, player.y) < player.r) {
      damagePlayer(teamDamage(b.damage));
      remove = true;
    }
    if (remove) {
      if (hitWall) emitAudioEvent("impact", { x: b.x, y: b.y, material: materialAt(b.x, b.y) }, false);
      if (settings.quality !== "low") effects.push({ x: b.x, y: b.y, r: 10, life: 0.18, type: "hit", color: b.color });
      bullets.splice(i, 1);
    }
  }
}

function updateGrenades(dt) {
  for (let i = grenades.length - 1; i >= 0; i -= 1) {
    const g = grenades[i];
    const previousX = g.x;
    const previousY = g.y;
    g.x += g.vx * dt;
    g.y += g.vy * dt;
    g.z = Math.max(0, Number(g.z || 0) + Number(g.vz || 0) * dt);
    g.vz = Number(g.vz || 0) - 620 * dt;
    const drag = Math.pow(0.965, dt * 60);
    g.vx *= drag;
    g.vy *= drag;
    if (pointInObstacle(g.x, g.y)) {
      g.x = previousX;
      g.y = previousY;
      g.vx *= -0.35;
      g.vy *= -0.35;
    }
    if (g.z <= 0 && g.vz < 0) {
      g.z = 0;
      g.vz *= -0.34;
      g.vx *= 0.72;
      g.vy *= 0.72;
      if (Math.abs(g.vz) < 24) g.vz = 0;
    }
    g.timer -= dt;
    if (g.timer <= 0) {
      explodeGrenade(g);
      grenades.splice(i, 1);
    }
  }
  for (let i = effects.length - 1; i >= 0; i -= 1) {
    effects[i].life -= dt;
    if (effects[i].type === "fire") {
      for (const bot of bots) {
        if (bot.hp > 0 && dist(effects[i].x, effects[i].y, bot.x, bot.y) < effects[i].r) {
          damageActor(bot, 16 * dt);
          if (bot.hp <= 0) {
            if (isRespawnMode() && !bot.deathCounted) {
              bot.respawnTimer = 2.2;
              bot.deathCounted = true;
              state.fragScore.player += 1;
            } else if (!isRespawnMode()) dropActorLoadoutOnDeath(bot);
          }
        }
      }
    }
    if (effects[i].life <= 0) effects.splice(i, 1);
  }
}

function missionValue(mission) {
  if (mission.type === "kills") return player.kills;
  if (mission.type === "hits") return player.hits;
  if (mission.type === "plants") return player.plants;
  if (mission.type === "defuses") return player.defuses;
  return mission.progress || 0;
}

function activeMissions() {
  const campaign = campaignTemplates.slice(0, state.campaignIndex + 1).filter((m) => !m.done).slice(0, 3);
  return [...campaign, ...state.randomMissions].slice(0, 5);
}

function advanceMission(type, amount = 1, category = "") {
  const all = [...campaignTemplates, ...state.randomMissions];
  let changed = false;
  for (const mission of all) {
    if (mission.done) continue;
    if (mission.type === type || (mission.type === "category" && mission.category === category)) {
      mission.progress = (mission.progress || 0) + amount;
      if ((mission.progress || 0) >= mission.target) {
        mission.done = true;
        player.money += mission.reward;
        if (campaignTemplates.includes(mission) && state.campaignIndex < campaignTemplates.length - 1) state.campaignIndex += 1;
        showMessage(`Misja wykonana: ${mission.title} +$${mission.reward}`);
      }
      changed = true;
    }
  }
  if (changed) renderMissions();
}

function markMapWin() {
  const mission = campaignTemplates.find((m) => m.type === "mapWins");
  if (!mission || mission.done) return;
  mission.maps = mission.maps || {};
  mission.maps[state.mapKey] = true;
  mission.progress = Object.keys(mission.maps).length;
  if (mission.progress >= mission.target) advanceMission("mapWins", 0);
}

function generateRandomMissions() {
  const pool = [
    { title: "Eco hero", text: "Zdobadz 3 fragi bez kupowania karabinu", type: "kills", target: player.kills + 3, reward: 700 },
    { title: "Grenadier", text: "Kup i rzuc granat w tej rundzie", type: "grenade", target: 1, reward: 500 },
    { title: "Aim warmup", text: "Traf 12 pociskow", type: "hits", target: player.hits + 12, reward: 650 },
    { title: "AWP dream", text: "Zdobadz 2 fragi sniperem", type: "category", category: "Sniper", target: 2, reward: 900 },
  ];
  const picked = pool[Math.floor(Math.random() * pool.length)];
  state.randomMissions = [{ ...picked, progress: 0, done: false }];
  renderMissions();
}

function renderMissions() {
  hud.missionList.innerHTML = "";
  const list = activeMissions();
  let done = 0;
  for (const mission of list) {
    if (mission.done) done += 1;
    const value = Math.min(mission.target, Math.floor(missionValue(mission)));
    const pct = mission.done ? 100 : clamp((value / mission.target) * 100, 0, 100);
    const item = document.createElement("div");
    item.className = "mission-item";
    item.innerHTML = `<div class="mission-title"><span>${mission.title}</span><span class="tag">+$${mission.reward}</span></div><div>${mission.text}: ${value}/${mission.target}</div><div class="mission-progress"><span style="width:${pct}%"></span></div>`;
    hud.missionList.appendChild(item);
  }
  hud.missionPill.textContent = `${tr("missionsPill")} ${done}/${list.length || 1}`;
}

function renderTeams() {
  if (!hud.teamList) return;
  hud.teamList.innerHTML = "";
  const localSlots = [{ name: tr("you"), team: state.team, hp: player.hp, source: "player", weapon: activeWeapon().name, armor: player.armor }, ...allies.map((bot) => ({ name: bot.name, team: state.team, hp: bot.hp, source: settings.fillMode === "lan" ? "LAN/BOT" : "BOT", weapon: bot.weapon, armor: bot.armor }))];
  const enemySlots = bots.map((bot, index) => ({ name: bot.name || `ENEMY ${index + 1}`, team: state.enemyTeam, hp: bot.hp, source: bot.source || (settings.fillMode === "lan" ? "LAN/BOT" : "BOT"), weapon: bot.weapon, armor: bot.armor }));
  for (const slot of [...localSlots, ...enemySlots]) {
    const item = document.createElement("div");
    item.className = "team-item";
    item.innerHTML = `<span>${slot.name} / ${slot.team}</span><span class="tag">${slot.source} ${slot.weapon || "pistol"} ${Math.max(0, Math.ceil(slot.hp))}HP ${Math.ceil(slot.armor || 0)}AR</span>`;
    hud.teamList.appendChild(item);
  }
}

function renderBinds() {
  hud.bindList.innerHTML = "";
  for (const [action, code] of Object.entries(bindings)) {
    const item = document.createElement("div");
    item.className = "bind-item";
    const button = document.createElement("button");
    button.textContent = waitingForBind === action ? tr("pressKey") : codeName(code);
    button.addEventListener("click", () => {
      waitingForBind = action;
      renderBinds();
    });
    item.innerHTML = `<span>${bindLabel(action)}</span>`;
    item.appendChild(button);
    hud.bindList.appendChild(item);
  }
}

function renderShop() {
  hud.shopList.innerHTML = "";
  const buyingOpen = canBuyNow();
  const status = document.createElement("div");
  status.className = `shop-status${buyingOpen ? "" : " closed"}`;
  status.innerHTML = `<strong>$${player.money}</strong><span>${buyingOpen ? `Buy time ${Math.ceil(state.buyTime)}s / ${settings.language === "en" ? "buy zone" : "strefa kupowania"}` : buyBlockMessage()}</span>`;
  hud.shopList.appendChild(status);
  const sectionOrder = ["Pistol", "SMG", "Rifle", "Sniper", "Heavy"];
  for (const category of sectionOrder) {
    const section = document.createElement("div");
    section.className = "shop-section";
    section.innerHTML = `<div class="shop-section-title">${category}</div>`;
    for (const weapon of weapons.filter((item) => item.category === category && sideAllows(item))) {
      const item = document.createElement("div");
      item.className = `shop-item${weapon.owned ? " owned" : ""}${weapon.id === player.weaponId ? " active" : ""}`;
      item.innerHTML = `<div class="shop-title"><span>${weapon.name}</span><span class="tag">${weapon.owned ? tr("owned") : `$${weapon.price}`}</span></div><div class="muted">${weapon.side} / ${weapon.category}</div><div class="shop-stats"><span>DMG ${weapon.damage}</span><span>MAG ${weapon.magSize}</span><span>ROF ${Math.round(1000 / weapon.fireDelay * 60)}</span><span>SPREAD ${Math.round(weapon.spread * 100)}</span></div>`;
      const button = document.createElement("button");
      button.textContent = weapon.owned ? tr("equip") : tr("buy");
      button.disabled = !buyingOpen || (!weapon.owned && player.money < weapon.price);
      button.title = !buyingOpen ? buyBlockMessage() : (!weapon.owned && player.money < weapon.price) ? "Za malo kasy" : "";
      button.addEventListener("click", () => buyItem("weapon", weapon.id));
      item.appendChild(button);
      section.appendChild(item);
    }
    hud.shopList.appendChild(section);
  }
  const utility = document.createElement("div");
  utility.className = "shop-section";
  utility.innerHTML = `<div class="shop-section-title">Utility / Gear</div>`;
  for (const grenade of grenadeCatalog.filter((item) => sideAllows(item))) {
    const id = grenadeCatalog.indexOf(grenade);
    const item = document.createElement("div");
    item.className = "shop-item";
    item.innerHTML = `<div class="shop-title"><span>${grenade.name}</span><span class="tag">$${grenade.price}</span></div><div class="muted">${tr("grenade")} / ${grenade.side}</div><div class="shop-stats"><span>${tr("owned")} ${player.grenades[grenade.name] || 0}</span><span>${tr("throwKey")}</span></div>`;
    const button = document.createElement("button");
    button.textContent = tr("buy");
    button.disabled = !buyingOpen || player.money < grenade.price;
    button.title = !buyingOpen ? buyBlockMessage() : player.money < grenade.price ? "Za malo kasy" : "";
    button.addEventListener("click", () => buyItem("grenade", id));
    item.appendChild(button);
    utility.appendChild(item);
  }
  for (const gear of equipmentCatalog.filter((item) => sideAllows(item))) {
    const id = equipmentCatalog.indexOf(gear);
    const owned = ownsEquipment(gear);
    const price = equipmentPrice(gear);
    const stat = gear.key === "defuseKit" ? "DEFUSE 2.5s" : gear.key === "zeus" ? "TASER" : "ARMOR 100";
    const tag = gear.key === "helmet" ? "HELMET" : gear.key === "zeus" ? "ZEUS" : "GEAR";
    const item = document.createElement("div");
    item.className = `shop-item${owned ? " owned" : ""}`;
    item.innerHTML = `<div class="shop-title"><span>${gear.name}</span><span class="tag">${owned ? tr("owned") : `$${price}`}</span></div><div class="muted">${gear.side} / Equipment</div><div class="shop-stats"><span>${stat}</span><span>${tag}</span></div>`;
    const button = document.createElement("button");
    button.textContent = owned ? tr("owned") : tr("buy");
    button.disabled = owned || !buyingOpen || player.money < price;
    button.title = !buyingOpen ? buyBlockMessage() : player.money < price ? "Za malo kasy" : "";
    button.addEventListener("click", () => buyItem("equipment", id));
    item.appendChild(button);
    utility.appendChild(item);
  }
  hud.shopList.appendChild(utility);
}

function drawMap2d() {
  ctx.fillStyle = "#293629";
  ctx.fillRect(-camera.x, -camera.y, state.map.w, state.map.h);
  if (!isSandboxMode()) drawBuyZones2d();
  if (settings.quality !== "low") {
    ctx.strokeStyle = "#2e3a2d";
    for (let x = 0; x < state.map.w; x += 80) {
      ctx.beginPath(); ctx.moveTo(x - camera.x, -camera.y); ctx.lineTo(x - camera.x, state.map.h - camera.y); ctx.stroke();
    }
    for (let y = 0; y < state.map.h; y += 80) {
      ctx.beginPath(); ctx.moveTo(-camera.x, y - camera.y); ctx.lineTo(state.map.w - camera.x, y - camera.y); ctx.stroke();
    }
  }
  for (const [key, site] of isSandboxMode() ? [] : Object.entries(state.map.sites)) {
    ctx.fillStyle = key === "A" ? "rgba(215,189,98,0.18)" : "rgba(119,181,111,0.18)";
    ctx.beginPath(); ctx.arc(site.x - camera.x, site.y - camera.y, site.r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#f2f0df"; ctx.font = "22px Arial"; ctx.textAlign = "center"; ctx.fillText(key, site.x - camera.x, site.y - camera.y + 8);
  }
  ctx.strokeStyle = "#848b72"; ctx.lineWidth = 3;
  for (const o of state.map.obstacles) {
    if (o.visible === false) continue;
    ctx.save();
    ctx.translate(o.x + o.w / 2 - camera.x, o.y + o.h / 2 - camera.y);
    ctx.rotate((Number(o.rot || 0) * Math.PI) / 180);
    ctx.fillStyle = wallBaseColor(o);
    ctx.fillRect(-o.w / 2, -o.h / 2, o.w, o.h);
    if (settings.quality !== "low") {
      ctx.strokeStyle = "rgba(255,255,255,0.13)";
      const step = o.type === "crate" ? 18 : 28;
      for (let tx = -o.w / 2; tx < o.w / 2; tx += step) {
        ctx.beginPath();
        ctx.moveTo(tx, -o.h / 2);
        ctx.lineTo(tx, o.h / 2);
        ctx.stroke();
      }
      if (o.type === "light") {
        ctx.fillStyle = "rgba(255,238,143,0.24)";
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(o.w, o.h), 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.strokeRect(-o.w / 2, -o.h / 2, o.w, o.h);
    if (o.type) {
      ctx.fillStyle = "#f2f0df";
      ctx.font = "10px Arial";
      ctx.fillText(o.type, 0, 4);
    }
    ctx.restore();
  }
  ctx.strokeStyle = "#786544"; ctx.lineWidth = 12; ctx.strokeRect(-camera.x, -camera.y, state.map.w, state.map.h);
}

function weaponForActor(actor) {
  if (actor === player) return activeWeapon();
  return weaponStatsByName(actor.weapon);
}

function drawWeaponSilhouette2d(weapon, scale = 1) {
  const category = weapon?.melee ? "Melee" : weapon?.category || "Pistol";
  ctx.fillStyle = weapon?.color || "#20231e";
  ctx.strokeStyle = "#f0e7c8";
  ctx.lineWidth = Math.max(1, 1.3 * scale);
  ctx.beginPath();
  if (category === "Melee") {
    ctx.moveTo(5 * scale, -3 * scale); ctx.lineTo(28 * scale, 0); ctx.lineTo(5 * scale, 4 * scale); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#433a2a"; ctx.fillRect(0, -5 * scale, 8 * scale, 10 * scale);
    return;
  }
  const sniper = category === "Sniper";
  const pistol = category === "Pistol";
  const heavy = category === "Heavy";
  const body = pistol ? 15 : heavy ? 29 : sniper ? 30 : 25;
  const barrel = pistol ? 9 : sniper ? 25 : heavy ? 16 : 18;
  ctx.rect(3 * scale, -5 * scale, body * scale, 10 * scale); ctx.fill(); ctx.stroke();
  ctx.fillRect((3 + body) * scale, -2 * scale, barrel * scale, 4 * scale);
  ctx.save(); ctx.translate((pistol ? 9 : 15) * scale, 4 * scale); ctx.rotate(pistol ? 0.45 : 0.25); ctx.fillRect(0, 0, 6 * scale, (pistol ? 12 : 15) * scale); ctx.restore();
  if (!pistol) ctx.fillRect((heavy ? 12 : 17) * scale, 4 * scale, (heavy ? 12 : 7) * scale, (heavy ? 10 : 13) * scale);
  if (sniper) { ctx.beginPath(); ctx.arc(18 * scale, -7 * scale, 4 * scale, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); }
}

function drawActor(actor, color, label) {
  const x = actor.x - camera.x;
  const y = actor.y - camera.y;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(actor.angle || 0);
  ctx.strokeStyle = "#f7f1d8";
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(0, 0, actor.r + 2, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath(); ctx.arc(0, 0, actor.r, 0, Math.PI * 2); ctx.fill();
  drawWeaponSilhouette2d(weaponForActor(actor));
  ctx.restore();
  ctx.fillStyle = "#f2f0df"; ctx.font = "12px Arial"; ctx.textAlign = "center"; ctx.fillText(label, x, y - actor.r - 10);
}

function drawProjectiles2d() {
  for (const b of bullets) {
    ctx.strokeStyle = b.color; ctx.lineWidth = 3; ctx.beginPath();
    ctx.moveTo(b.x - camera.x, b.y - camera.y);
    ctx.lineTo(b.x - camera.x - b.vx * 0.018, b.y - camera.y - b.vy * 0.018);
    ctx.stroke();
  }
  for (const g of grenades) {
    ctx.fillStyle = g.color; ctx.beginPath(); ctx.arc(g.x - camera.x, g.y - camera.y, 7, 0, Math.PI * 2); ctx.fill();
  }
  for (const item of droppedWeapons) {
    const x = item.x - camera.x;
    const y = item.y - camera.y;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(item.angle || 0);
    ctx.translate(-12, 0);
    drawWeaponSilhouette2d(item, 0.8);
    ctx.restore();
    ctx.fillStyle = "#f2f0df";
    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.fillText(item.name, x, y - 14);
  }
  for (const e of effects) {
    ctx.globalAlpha = clamp(e.life / 1.5, 0.18, 0.75);
    ctx.fillStyle = e.type === "smoke" ? "#a8aaa1" : e.color;
    ctx.beginPath(); ctx.arc(e.x - camera.x, e.y - camera.y, e.r, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
  }
  if (["planted", "hidden", "dropped"].includes(state.bomb.status)) {
    ctx.fillStyle = "#d75f4f"; ctx.fillRect(state.bomb.x - camera.x - 8, state.bomb.y - camera.y - 8, 16, 16);
  }
}

function drawMinimap() {
  if (!settings.showMinimap) return;
  const compact = window.innerWidth <= 640;
  const w = compact ? 124 : 170;
  const h = compact ? 82 : 112;
  const x = window.innerWidth - w - (compact ? 8 : 16);
  const y = compact ? 130 : 16;
  ctx.fillStyle = "rgba(12,14,12,.72)"; ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = "rgba(242,240,223,.18)"; ctx.strokeRect(x, y, w, h);
  const sx = w / state.map.w, sy = h / state.map.h;
  ctx.fillStyle = "#7a8169";
  for (const o of state.map.obstacles) {
    if (!obstacleBlocks(o)) continue;
    ctx.save();
    ctx.translate(x + (o.x + o.w / 2) * sx, y + (o.y + o.h / 2) * sy);
    ctx.rotate((Number(o.rot || 0) * Math.PI) / 180);
    ctx.fillRect(-(o.w * sx) / 2, -(o.h * sy) / 2, o.w * sx, o.h * sy);
    ctx.restore();
  }
  ctx.fillStyle = "#d7bd62";
  for (const site of Object.values(state.map.sites)) ctx.fillRect(x + site.x * sx - 3, y + site.y * sy - 3, 6, 6);
  ctx.fillStyle = "#77b56f"; ctx.fillRect(x + player.x * sx - 2, y + player.y * sy - 2, 4, 4);
  ctx.fillStyle = "#75a6cf";
  for (const ally of allies) if (ally.hp > 0) ctx.fillRect(x + ally.x * sx - 2, y + ally.y * sy - 2, 4, 4);
  if (serverSettings.enemyMinimap) {
    ctx.fillStyle = "#d95f4e";
    for (const bot of bots) if (bot.hp > 0) ctx.fillRect(x + bot.x * sx - 2, y + bot.y * sy - 2, 4, 4);
  }
  ctx.fillStyle = "#f5df88";
  for (const item of droppedWeapons) ctx.fillRect(x + item.x * sx - 2, y + item.y * sy - 2, 4, 4);
}

function drawCrosshair() {
  if (settings.crosshairEnabled === false) return;
  const weapon = activeWeapon();
  const cx = isPerspectiveMode() ? window.innerWidth / 2 : mouse.x;
  const cy = isPerspectiveMode() ? window.innerHeight / 2 : mouse.y;
  if (settings.crosshairCustomEnabled && settings.customCrosshair?.length) {
    drawCustomCrosshair(cx, cy);
    return;
  }
  const baseGap = Number(settings.crosshairGap ?? 10);
  const size = Number(settings.crosshairSize ?? 1);
  const gap = baseGap + weapon.spread * 120 + player.speedFactor * 10 + camera.shake;
  const length = (settings.crosshairStyle === "wide" ? 13 : 7) * size;
  const thickness = Number(settings.crosshairThickness ?? 2);
  const drawLines = (stroke, width) => {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.beginPath();
    if (settings.crosshairStyle !== "t") {
      ctx.moveTo(cx, cy - gap - length); ctx.lineTo(cx, cy - gap);
    }
    ctx.moveTo(cx - gap - length, cy); ctx.lineTo(cx - gap, cy);
    ctx.moveTo(cx + gap, cy); ctx.lineTo(cx + gap + length, cy);
    ctx.moveTo(cx, cy + gap); ctx.lineTo(cx, cy + gap + length);
    ctx.stroke();
  };
  ctx.fillStyle = settings.crosshairColor;
  if (settings.crosshairStyle === "dot") {
    if (settings.crosshairOutline) {
      ctx.fillStyle = "rgba(0,0,0,0.72)";
      ctx.beginPath(); ctx.arc(cx, cy, 2 * size + 1.2, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = settings.crosshairColor;
    ctx.beginPath(); ctx.arc(cx, cy, 1.6 * size, 0, Math.PI * 2); ctx.fill();
    return;
  }
  if (settings.crosshairStyle === "circle") {
    if (settings.crosshairOutline) {
      ctx.strokeStyle = "rgba(0,0,0,0.72)";
      ctx.lineWidth = thickness + 3;
      ctx.beginPath(); ctx.arc(cx, cy, gap + length * 0.7, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.strokeStyle = settings.crosshairColor;
    ctx.lineWidth = thickness;
    ctx.beginPath(); ctx.arc(cx, cy, gap + length * 0.7, 0, Math.PI * 2); ctx.stroke();
    return;
  }
  if (settings.crosshairOutline) drawLines("rgba(0,0,0,0.72)", thickness + 3);
  drawLines(settings.crosshairColor, thickness);
}

function drawCustomCrosshair(cx, cy) {
  const pixels = settings.customCrosshair || [];
  const scale = clamp(Number(settings.crosshairSize || 1) * 2, 1, 5);
  const origin = 8 * scale;
  if (settings.crosshairOutline) {
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    for (const cell of pixels) {
      ctx.fillRect(cx - origin + cell.x * scale - 1, cy - origin + cell.y * scale - 1, scale + 2, scale + 2);
    }
  }
  for (const cell of pixels) {
    ctx.fillStyle = cell.color || settings.crosshairColor;
    ctx.fillRect(cx - origin + cell.x * scale, cy - origin + cell.y * scale, scale, scale);
  }
}

function normalizeCrosshairPixels(pixels) {
  if (!Array.isArray(pixels)) return [];
  return pixels
    .map((cell) => ({ x: Math.floor(Number(cell.x)), y: Math.floor(Number(cell.y)), color: String(cell.color || settings.crosshairColor) }))
    .filter((cell) => cell.x >= 0 && cell.x < 16 && cell.y >= 0 && cell.y < 16 && /^#[0-9a-f]{6}$/i.test(cell.color))
    .slice(0, 256);
}

function paintCrosshairCell(event, erase = false) {
  const canvasPaint = hud.crosshairPaintCanvas;
  const rect = canvasPaint.getBoundingClientRect();
  const x = clamp(Math.floor(((event.clientX - rect.left) / rect.width) * 16), 0, 15);
  const y = clamp(Math.floor(((event.clientY - rect.top) / rect.height) * 16), 0, 15);
  const pixels = normalizeCrosshairPixels(settings.customCrosshair);
  const index = pixels.findIndex((cell) => cell.x === x && cell.y === y);
  if (erase || event.buttons === 2) {
    if (index >= 0) pixels.splice(index, 1);
  } else if (index >= 0) {
    pixels[index].color = hud.crosshairPaintColor.value;
  } else {
    pixels.push({ x, y, color: hud.crosshairPaintColor.value });
  }
  settings.customCrosshair = pixels;
  settings.crosshairCustomEnabled = true;
  hud.crosshairCustomEnabled.checked = true;
  drawCrosshairPaint();
  saveConfig();
}

function drawCrosshairPaint() {
  const canvasPaint = hud.crosshairPaintCanvas;
  if (!canvasPaint) return;
  const pctx = canvasPaint.getContext("2d");
  pctx.clearRect(0, 0, canvasPaint.width, canvasPaint.height);
  pctx.fillStyle = "#111411";
  pctx.fillRect(0, 0, canvasPaint.width, canvasPaint.height);
  pctx.strokeStyle = "rgba(242,240,223,0.12)";
  for (let i = 0; i <= 16; i += 1) {
    const v = i * 10;
    pctx.beginPath(); pctx.moveTo(v, 0); pctx.lineTo(v, 160); pctx.stroke();
    pctx.beginPath(); pctx.moveTo(0, v); pctx.lineTo(160, v); pctx.stroke();
  }
  pctx.strokeStyle = "rgba(215,189,98,0.5)";
  pctx.strokeRect(70.5, 70.5, 20, 20);
  for (const cell of normalizeCrosshairPixels(settings.customCrosshair)) {
    pctx.fillStyle = cell.color;
    pctx.fillRect(cell.x * 10 + 1, cell.y * 10 + 1, 8, 8);
  }
}

function render2d() {
  camera.shake *= 0.88;
  camera.x = clamp(player.x - window.innerWidth / 2 + (Math.random() - 0.5) * camera.shake, 0, Math.max(0, state.map.w - window.innerWidth));
  camera.y = clamp(player.y - window.innerHeight / 2 + (Math.random() - 0.5) * camera.shake, 0, Math.max(0, state.map.h - window.innerHeight));
  drawMap2d();
  drawProjectiles2d();
  for (const ally of allies) if (ally.hp > 0) drawActor(ally, state.team === "T" ? "#c48a45" : "#8ea9b8", ally === state.spectator.target ? "OBS" : state.team);
  for (const bot of bots) if (bot.hp > 0) drawActor(bot, state.enemyTeam === "T" ? "#b84d42" : "#557bb0", state.enemyTeam);
  if (player.alive) drawActor(player, state.team === "T" ? "#c48a45" : "#8ea9b8", "YOU");
  drawPhysicsGunBeam2d();
  drawMinimap();
  drawCrosshair();
}

function drawPhysicsGunBeam2d() {
  if (!isPhysicsGunActive()) return;
  const object = state.map.obstacles.find((item) => item.id === sandbox.heldObjectId);
  if (!object) return;
  ctx.strokeStyle = "rgba(112,215,229,0.92)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(player.x - camera.x, player.y - camera.y);
  ctx.lineTo(object.x + object.w / 2 - camera.x, object.y + object.h / 2 - camera.y);
  ctx.stroke();
  ctx.strokeStyle = "#dffcff";
  ctx.strokeRect(object.x - camera.x, object.y - camera.y, object.w, object.h);
}

function castRay(angle) {
  let x = player.x, y = player.y, d = 0;
  const step = settings.quality === "low" ? 24 : 14;
  const maxDistance = clamp(Number(state.map.meta?.fogDistance || 1800), 1200, 2600);
  while (d < maxDistance) {
    x += Math.cos(angle) * step; y += Math.sin(angle) * step; d += step;
    if (x < 0 || y < 0 || x > state.map.w || y > state.map.h || pointInObstacle(x, y)) return d;
  }
  return maxDistance;
}

function castRayHit(angle) {
  let x = player.x, y = player.y, d = 0;
  const step = settings.quality === "low" ? 24 : 14;
  const maxDistance = clamp(Number(state.map.meta?.fogDistance || 1800), 1200, 2600);
  while (d < maxDistance) {
    x += Math.cos(angle) * step;
    y += Math.sin(angle) * step;
    d += step;
    if (x < 0 || y < 0 || x > state.map.w || y > state.map.h) return { d, hit: null, edge: true };
    const hit = state.map.obstacles.find((obj) => pointInMapObstacle(x, y, obj));
    if (hit) return { d, hit, edge: false, x, y, side: wallHitSide(hit, x, y) };
  }
  return { d: maxDistance, hit: null, edge: false };
}

function wallHitSide(hit, x, y) {
  const local = obstacleLocalPoint(hit, x, y);
  const left = Math.abs(local.x + hit.w / 2);
  const right = Math.abs(hit.w / 2 - local.x);
  const top = Math.abs(local.y + hit.h / 2);
  const bottom = Math.abs(hit.h / 2 - local.y);
  const min = Math.min(left, right, top, bottom);
  if (min === left) return "west";
  if (min === right) return "east";
  if (min === top) return "north";
  return "south";
}

function wallBaseColor(hit) {
  if (hit?.textureColor) return hit.textureColor;
  if (hit?.texture === "custom-color" && hit.color) return hit.color;
  return textureForHit(hit).base;
}

function defaultTextureForType(type) {
  if (type === "crate") return "crate";
  if (type === "cover") return "concrete";
  if (type === "light") return "glass";
  if (type === "ramp") return "metal";
  if (type === "hazard") return "hazard";
  return "white";
}

function autoTextureForHit(hit) {
  if (!hit) return "white";
  if (hit.texture || hit.material) return hit.texture || hit.material;
  if (["crate", "cover", "light", "ramp", "hazard"].includes(hit.type)) return defaultTextureForType(hit.type);
  const hash = Math.abs(Math.floor(hit.x * 7 + hit.y * 11 + hit.w * 13 + hit.h * 17));
  const longWall = Math.max(hit.w, hit.h) > Math.min(hit.w, hit.h) * 2.4;
  const palette = longWall
    ? ["concrete", "white", "bluewall", "redpanel", "greenpanel", "brick", "tile"]
    : ["crate", "metal", "concrete", "hazard", "asphalt", "camo", "stripe"];
  return palette[hash % palette.length];
}

function textureForHit(hit) {
  if (!hit) return simple3dTextures.white;
  const key = hit.texture || hit.material || autoTextureForHit(hit);
  const custom = customTextures.find((texture) => texture.id === key);
  if (custom) {
    const base = custom.baseColor || hit.textureColor || hit.color || "#b8b8ae";
    return { base, side: shadeHex(base, -34), seam: "rgba(25,28,24,0.34)", mark: "rgba(255,255,255,0.16)", mode: custom.kind === "paint" ? "tile" : "panel", footstep: "concrete" };
  }
  return simple3dTextures[key] || simple3dTextures.white;
}

function materialAt(x, y) {
  const hit = state.map.obstacles.find((o) => pointInMapObstacle(x, y, o));
  return textureForHit(hit || { texture: "terrain" }).footstep || "dirt";
}

function sideColorForHit(hit) {
  const known = textureForHit(hit);
  if (known.side) return known.side;
  return shadeHex(wallBaseColor(hit), -34);
}

function shadeHex(color, amount) {
  const hex = String(color || "#64705c").replace("#", "");
  if (hex.length !== 6) return color;
  const value = parseInt(hex, 16);
  const r = clamp((value >> 16) + amount, 0, 255);
  const g = clamp(((value >> 8) & 255) + amount, 0, 255);
  const b = clamp((value & 255) + amount, 0, 255);
  return `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`;
}

function drawPotatoWallColumn(x, y, colW, wallH, hit, shade, distance, side = "", texCoord = 0) {
  const texture = textureForHit(hit);
  const baseColor = hit?.color && hit.texture === "custom-color" ? hit.color : wallBaseColor(hit);
  const sideShade = side === "north" || side === "south" ? -18 : 0;
  const base = shadeHex(baseColor, shade + sideShade);
  ctx.fillStyle = base;
  const drawX = Math.floor(x);
  const drawW = Math.ceil(colW) + 1;
  ctx.fillRect(drawX, y, drawW, wallH);
  const stripe = texture.mode === "crate" ? 128 : texture.mode === "brick" ? 96 : texture.mode === "metal" ? 160 : 220;
  if (settings.quality === "high" && Math.floor(texCoord) % stripe < Math.max(3, stripe * 0.035)) {
    ctx.fillStyle = texture.seam;
    ctx.fillRect(drawX, y, drawW, wallH);
  }
  if (settings.quality !== "low" && texture.mode === "brick") {
    ctx.fillStyle = "rgba(70,48,35,0.16)";
    for (let row = y + Math.max(12, wallH / 5); row < y + wallH; row += Math.max(12, wallH / 5)) ctx.fillRect(drawX, row, drawW, 1);
  }
  if (settings.quality !== "low" && texture.mode === "crate") {
    ctx.fillStyle = "rgba(40,28,18,0.28)";
    ctx.fillRect(drawX, y + wallH * 0.48, drawW, Math.max(1, wallH * 0.05));
  }
  if (settings.quality !== "low" && texture.mode === "glass") {
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.fillRect(drawX, y + wallH * 0.18, drawW, Math.max(1, wallH * 0.08));
  }
  if (settings.quality !== "low" && texture.mode === "hazard") {
    const band = Math.max(10, wallH / 6);
    ctx.fillStyle = "rgba(20,20,15,0.28)";
    for (let row = y; row < y + wallH; row += band * 2) ctx.fillRect(drawX, row, drawW, band);
  }
  if (settings.quality !== "low" && texture.mode === "tile") {
    ctx.fillStyle = "rgba(60,58,52,0.22)";
    for (let row = y + Math.max(10, wallH / 6); row < y + wallH; row += Math.max(10, wallH / 6)) ctx.fillRect(drawX, row, drawW, 1);
    if (Math.floor(texCoord) % 64 < 6) ctx.fillRect(drawX, y, drawW, wallH);
  }
  if (settings.quality !== "low" && texture.mode === "camo") {
    const patch = Math.abs(Math.floor(texCoord / 48)) % 5;
    ctx.fillStyle = patch < 2 ? "rgba(74,92,55,0.1)" : "rgba(224,232,188,0.07)";
    ctx.fillRect(drawX, y + wallH * (0.18 + patch * 0.09), drawW, wallH * 0.16);
  }
  if (settings.quality !== "low" && texture.mode === "stripe") {
    ctx.fillStyle = Math.abs(Math.floor(texCoord / 42)) % 2 ? "rgba(20,20,15,0.12)" : "rgba(255,255,220,0.08)";
    ctx.fillRect(drawX, y, drawW, wallH);
  }
  ctx.fillStyle = `rgba(255,255,255,${clamp(0.09 - distance / 9000, 0.015, 0.075)})`;
  ctx.fillRect(drawX, y, drawW, Math.max(1, wallH * 0.025));
  ctx.fillStyle = `rgba(0,0,0,${clamp(0.2 + distance / 5200, 0.18, 0.46)})`;
  ctx.fillRect(drawX, y + wallH - Math.max(2, wallH * 0.04), drawW, Math.max(2, wallH * 0.04));
  const fogDistance = Math.max(900, Number(state.map.meta?.fogDistance || 3600));
  ctx.fillStyle = `rgba(73,91,96,${clamp((distance - fogDistance * 0.34) / fogDistance, 0, 0.48)})`;
  ctx.fillRect(drawX, y, drawW, wallH);
}

function render3d() {
  camera.shake *= 0.88;
  const w = window.innerWidth, h = window.innerHeight;
  ctx.imageSmoothingEnabled = true;
  // Pitch is an angle, so every projected object follows the same FPS camera.
  const horizon = clamp(h * 0.52 + Math.tan(camera.pitch) * h * 0.38, -h * 0.55, h * 1.55);
  const skyColor = state.map.meta?.skyColor || state.map.meta?.ambientColor || "#61777f";
  const sky = ctx.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, shadeHex(skyColor, 28));
  sky.addColorStop(0.72, skyColor);
  sky.addColorStop(1, shadeHex(skyColor, -38));
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, horizon);
  draw3dTerrain(w, h, horizon);
  const zoom = aimZoom();
  const fov = ((clamp(Number(settings.fieldOfView) || 90, 70, 110) * Math.PI) / 180) / zoom;
  const cols = settings.quality === "low" ? 160 : settings.quality === "high" ? 480 : 320;
  const colW = w / cols;
  const depth = [];
  for (let i = 0; i < cols; i += 1) {
    const ray = player.angle - fov / 2 + (i / cols) * fov;
    const hitInfo = castRayHit(ray);
    const d = hitInfo.d * Math.cos(ray - player.angle);
    depth[i] = d;
    if (!hitInfo.hit && !hitInfo.edge) continue;
    const wall = hitInfo.hit || { texture: "concrete", material: "concrete", z: 160, elevation: 0 };
    const objectHeight = clamp(Number(wall.z || 96), 12, 512);
    const elevation = clamp(Number(wall.elevation || 0), 0, 1024);
    const eyeHeight = player.eyeHeight + player.jumpHeight;
    const projection = h * 1.08 * zoom;
    const top = horizon - ((elevation + objectHeight - eyeHeight) * projection) / Math.max(1, d) + camera.shake;
    const bottom = horizon - ((elevation - eyeHeight) * projection) / Math.max(1, d) + camera.shake;
    const wallH = clamp(bottom - top, 2, h * 1.6);
    const shade = clamp(12 - d * 0.022, -54, 10);
    const x = i * colW;
    const y = clamp(top, -h * 0.8, h * 1.5);
    const texCoord = hitInfo.hit ? (hitInfo.side === "north" || hitInfo.side === "south" ? hitInfo.x - hitInfo.hit.x : hitInfo.y - hitInfo.hit.y) : i;
    drawPotatoWallColumn(x, y, colW, wallH, wall, shade, d, hitInfo.side, texCoord);
  }
  const sprites = [
    ...bots.filter((bot) => bot.hp > 0).map((bot) => ({ bot, color: state.enemyTeam === "T" ? "#b84d42" : "#557bb0", d: dist(player.x, player.y, bot.x, bot.y), a: angleTo(player.x, player.y, bot.x, bot.y) })),
    ...allies.filter((bot) => bot.hp > 0 && bot !== state.spectator.target).map((bot) => ({ bot, color: state.team === "T" ? "#c48a45" : "#8ea9b8", d: dist(player.x, player.y, bot.x, bot.y), a: angleTo(player.x, player.y, bot.x, bot.y) })),
  ].sort((a, b) => b.d - a.d);
  for (const s of sprites) {
    let rel = s.a - player.angle;
    while (rel < -Math.PI) rel += Math.PI * 2;
    while (rel > Math.PI) rel -= Math.PI * 2;
    if (Math.abs(rel) > fov / 1.35) continue;
    const sx = (0.5 + rel / fov) * w;
    const col = clamp(Math.floor(sx / colW), 0, depth.length - 1);
    if (s.d > depth[col] + 45) continue;
    const size = clamp((h * 96 * zoom) / s.d, 14, 240);
    const actorY = horizon + clamp((h * (player.eyeHeight + player.jumpHeight) * zoom) / Math.max(1, s.d), 2, 320) - size * 0.62;
    draw3dCharacter(sx, actorY, size, s.color, s.bot.hostile);
  }
  draw3dProjectilesAndObjectives(w, h, fov, depth, colW, horizon);
  if (!isSandboxMode()) {
    draw3dSiteMarkers(w, h, fov, depth, colW, horizon);
    draw3dBuyZoneMarker(w, h, fov, depth, colW, horizon);
  }
  draw3dWeapon(w, h);
  drawPhysicsGunBeam3d(w, h);
  if (isAwpScoped()) drawAwpScope(w, h);
  else if (isIronSights()) drawPotatoIronSights(w, h);
  drawFpsStatusStrip(w, h);
  drawMinimap();
  if (!isAimActive()) drawCrosshair();
}

function drawPhysicsGunBeam3d(w, h) {
  if (!isPhysicsGunActive() || !sandbox.heldObjectId) return;
  ctx.strokeStyle = "rgba(112,215,229,0.9)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(w * 0.68, h * 0.86);
  ctx.lineTo(w / 2, h / 2);
  ctx.stroke();
  ctx.fillStyle = "rgba(112,215,229,0.18)";
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, 18, 0, Math.PI * 2);
  ctx.fill();
}

function drawAwpScope(w, h) {
  const radius = Math.min(w, h) * 0.43;
  const cx = w / 2;
  const cy = h / 2;
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.96)";
  ctx.beginPath();
  ctx.rect(0, 0, w, h);
  ctx.arc(cx, cy, radius, 0, Math.PI * 2, true);
  ctx.fill("evenodd");
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.clip();
  ctx.strokeStyle = "rgba(10,12,10,0.88)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - radius, cy); ctx.lineTo(cx + radius, cy);
  ctx.moveTo(cx, cy - radius); ctx.lineTo(cx, cy + radius);
  ctx.stroke();
  ctx.fillStyle = "#111";
  ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
  ctx.strokeStyle = "rgba(200,210,194,0.46)";
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.stroke();
}

function drawPotatoIronSights(w, h) {
  const cx = w / 2;
  const cy = h / 2;
  const weapon = activeWeapon();
  const pistol = weapon.category === "Pistol";
  ctx.save();
  ctx.strokeStyle = "rgba(12,14,12,0.96)";
  ctx.fillStyle = "rgba(18,20,17,0.96)";
  ctx.lineWidth = Math.max(3, w / 420);
  if (pistol) {
    ctx.fillRect(cx - 30, cy + 20, 10, 26);
    ctx.fillRect(cx + 20, cy + 20, 10, 26);
    ctx.fillRect(cx - 4, cy + 7, 8, 30);
  } else {
    ctx.beginPath();
    ctx.arc(cx, cy + 32, 30, Math.PI * 1.08, Math.PI * 1.92);
    ctx.stroke();
    ctx.fillRect(cx - 5, cy + 5, 10, 34);
    ctx.beginPath();
    ctx.moveTo(cx - 15, cy + 34); ctx.lineTo(cx, cy + 12); ctx.lineTo(cx + 15, cy + 34);
    ctx.stroke();
  }
  ctx.fillStyle = "rgba(215,189,98,0.8)";
  ctx.fillRect(cx - 2, cy + 9, 4, 8);
  ctx.restore();
}

function draw3dTerrain(w, h, horizon = h / 2) {
  const terrainColor = state.map.meta?.terrainColor || simple3dTextures.terrain.base;
  const floor = ctx.createLinearGradient(0, horizon, 0, h);
  floor.addColorStop(0, shadeHex(terrainColor, 34));
  floor.addColorStop(0.48, terrainColor);
  floor.addColorStop(1, shadeHex(terrainColor, -28));
  ctx.fillStyle = floor;
  ctx.fillRect(0, horizon, w, h - horizon);
  draw3dFloorPerspectiveGrid(w, h, horizon);
}

function draw3dFloorPerspectiveGrid(w, h, horizon = h / 2) {
  if (settings.quality === "low") return;
  ctx.save();
  ctx.lineWidth = 1;
  const floorHeight = h - horizon;
  for (let i = 1; i <= 8; i += 1) {
    const y = horizon + Math.pow(i / 8, 1.72) * floorHeight;
    ctx.strokeStyle = `rgba(242,240,223,${0.09 - i * 0.007})`;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(242,240,223,0.055)";
  const yawOffset = Math.sin(player.angle) * w * 0.08;
  for (let i = -5; i <= 5; i += 1) {
    const foot = w / 2 + yawOffset + i * w * 0.13;
    ctx.beginPath();
    ctx.moveTo(w / 2, horizon);
    ctx.lineTo(foot, h);
    ctx.stroke();
  }
  ctx.restore();
}

function draw3dFloorGuides(w, h, horizon = h / 2) {
  draw3dFloorPerspectiveGrid(w, h, horizon);
}

function drawFpsStatusStrip(w, h) {
  if (settings.quality === "low") return;
  ctx.fillStyle = "rgba(17,20,17,0.5)";
  ctx.fillRect(14, h - 44, 106, 28);
  ctx.fillStyle = "#f2f0df";
  ctx.font = "800 12px Arial";
  ctx.textAlign = "center";
  ctx.fillText("3D FPS", 67, h - 26);
}

function drawEnabledModOverlays() {
  if (!enabledMod("fps_info") || !state.running) return;
  const label = `${runtimeStats.fps || 0} FPS`;
  ctx.save();
  ctx.font = "700 11px Arial";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const width = Math.ceil(ctx.measureText(label).width) + 12;
  ctx.fillStyle = "rgba(10,12,10,0.68)";
  ctx.fillRect(10, 58, width, 20);
  ctx.fillStyle = "#f2f0df";
  ctx.fillText(label, 16, 63);
  ctx.restore();
}

function projectWorldToFps(wx, wy, fov, depth, colW, horizon, verticalOffset = 0, occlusionPad = 70) {
  const d = dist(player.x, player.y, wx, wy);
  let rel = angleTo(player.x, player.y, wx, wy) - player.angle;
  while (rel < -Math.PI) rel += Math.PI * 2;
  while (rel > Math.PI) rel -= Math.PI * 2;
  if (Math.abs(rel) > fov / 1.25) return null;
  const sx = (0.5 + rel / fov) * window.innerWidth;
  const col = clamp(Math.floor(sx / colW), 0, depth.length - 1);
  if (d > depth[col] + occlusionPad) return null;
  return {
    x: sx,
    y: horizon + clamp((window.innerHeight * (190 + verticalOffset + (player.eyeHeight + player.jumpHeight - 58) * 3.2)) / Math.max(1, d), -200, 220),
    d,
    scale: clamp(window.innerHeight / Math.max(1, d), 0.08, 2.4),
  };
}

function draw3dProjectilesAndObjectives(w, h, fov, depth, colW, horizon) {
  for (const b of bullets) {
    const p = projectWorldToFps(b.x, b.y, fov, depth, colW, horizon, -18, 25);
    if (!p) continue;
    ctx.strokeStyle = b.color || "#f6d98e";
    ctx.lineWidth = clamp(14 / p.d, 1, 3);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x - Math.cos(player.angle) * clamp(900 / p.d, 3, 24), p.y + clamp(170 / p.d, 1, 8));
    ctx.stroke();
  }
  for (const e of effects) {
    const p = projectWorldToFps(e.x, e.y, fov, depth, colW, horizon, 6, 160);
    if (!p) continue;
    const size = clamp((h * e.r) / Math.max(1, p.d), 14, e.type === "smoke" ? 190 : 96);
    ctx.globalAlpha = clamp(e.life / (e.type === "smoke" ? 7 : 1.5), 0.2, 0.7);
    ctx.fillStyle = e.type === "smoke" ? "#a8aaa1" : e.color;
    ctx.beginPath();
    ctx.ellipse(p.x, p.y - size * 0.2, size * 0.65, size * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  for (const g of grenades) {
    const p = projectWorldToFps(g.x, g.y, fov, depth, colW, horizon, -12 - Number(g.z || 0) * 3.2, 55);
    if (!p) continue;
    const size = clamp((h * 14) / Math.max(1, p.d), 5, 18);
    ctx.fillStyle = g.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(17,18,12,0.55)";
    ctx.stroke();
  }
  for (const item of droppedWeapons) {
    const p = projectWorldToFps(item.x, item.y, fov, depth, colW, horizon, -8, 60);
    if (!p) continue;
    const size = clamp((h * 34) / Math.max(1, p.d), 10, 36);
    ctx.fillStyle = "rgba(0,0,0,0.36)";
    ctx.beginPath();
    ctx.ellipse(p.x, p.y + size * 0.35, size * 0.9, size * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = item.color || "#d7bd62";
    ctx.fillRect(p.x - size * 0.7, p.y - size * 0.2, size * 1.4, size * 0.28);
    ctx.fillStyle = "#171812";
    ctx.fillRect(p.x + size * 0.1, p.y - size * 0.46, size * 0.75, size * 0.18);
    if (p.d < 180) {
      ctx.fillStyle = "#f2f0df";
      ctx.font = "800 11px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`E ${item.name}`, p.x, p.y - size * 0.8);
    }
  }
  if (["planted", "hidden", "dropped"].includes(state.bomb.status)) {
    const p = projectWorldToFps(state.bomb.x, state.bomb.y, fov, depth, colW, horizon, -10, 75);
    if (p) {
      const size = clamp((h * 28) / Math.max(1, p.d), 10, 34);
      ctx.fillStyle = "#d75f4f";
      ctx.fillRect(p.x - size * 0.55, p.y - size * 0.45, size * 1.1, size * 0.9);
      ctx.fillStyle = "#171812";
      ctx.fillRect(p.x - size * 0.28, p.y - size * 0.2, size * 0.56, size * 0.16);
      ctx.fillStyle = "#f2f0df";
      ctx.font = "800 11px Arial";
      ctx.textAlign = "center";
      ctx.fillText(state.bomb.status === "planted" ? "C4" : "BOMB", p.x, p.y - size * 0.72);
    }
  }
}

function draw3dSiteMarkers(w, h, fov, depth, colW, horizon = h / 2) {
  for (const [key, site] of Object.entries(state.map.sites)) {
    const p = projectWorldToFps(site.x, site.y, fov, depth, colW, horizon, 0, 110);
    if (!p) continue;
    ctx.fillStyle = key === "A" ? "rgba(215,189,98,0.86)" : "rgba(119,181,111,0.86)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, clamp((h * 22) / p.d, 8, 24), 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#171812";
    ctx.font = "700 14px Arial";
    ctx.textAlign = "center";
    ctx.fillText(key, p.x, p.y + 5);
  }
}

function draw3dCharacter(x, y, size, color, hostile = false) {
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.38)";
  ctx.beginPath();
  ctx.ellipse(x, y + size * 0.64, size * 0.34, size * 0.09, 0, 0, Math.PI * 2);
  ctx.fill();
  const outline = Math.max(2, size * 0.035);
  ctx.strokeStyle = "rgba(12,15,13,0.9)";
  ctx.lineWidth = outline;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x - size * 0.24, y - size * 0.43);
  ctx.lineTo(x + size * 0.24, y - size * 0.43);
  ctx.lineTo(x + size * 0.2, y + size * 0.18);
  ctx.lineTo(x - size * 0.2, y + size * 0.18);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = hostile ? "#7a3130" : "#3e5964";
  ctx.fillRect(x - size * 0.17, y - size * 0.3, size * 0.34, size * 0.34);
  ctx.strokeRect(x - size * 0.17, y - size * 0.3, size * 0.34, size * 0.34);
  ctx.fillStyle = "#d8c19a";
  ctx.beginPath();
  ctx.arc(x, y - size * 0.57, size * 0.16, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = hostile ? "#4b2925" : "#34464f";
  ctx.beginPath();
  ctx.arc(x, y - size * 0.61, size * 0.17, Math.PI, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#2b2d28";
  ctx.fillRect(x - size * 0.19, y + size * 0.14, size * 0.15, size * 0.47);
  ctx.fillRect(x + size * 0.04, y + size * 0.14, size * 0.15, size * 0.47);
  ctx.strokeRect(x - size * 0.19, y + size * 0.14, size * 0.15, size * 0.47);
  ctx.strokeRect(x + size * 0.04, y + size * 0.14, size * 0.15, size * 0.47);
  ctx.fillStyle = "#171a16";
  ctx.fillRect(x + size * 0.05, y - size * 0.18, size * 0.58, size * 0.085);
  ctx.fillRect(x + size * 0.1, y - size * 0.07, size * 0.17, size * 0.23);
  ctx.strokeRect(x + size * 0.05, y - size * 0.18, size * 0.58, size * 0.085);
  ctx.fillStyle = hostile ? "#df5f54" : "#6ca5c6";
  ctx.fillRect(x - size * 0.29, y - size * 0.42, size * 0.08, size * 0.18);
  ctx.fillRect(x + size * 0.21, y - size * 0.42, size * 0.08, size * 0.18);
  ctx.restore();
}

function weaponViewModel(weapon) {
  if (weapon.melee) {
    return { body: 96, barrel: 0, stock: false, scope: false, grip: false, magazine: 0, knife: true };
  }
  const longGun = ["Rifle", "Sniper", "Heavy", "SMG"].includes(weapon.category);
  return {
    body: longGun ? 170 : 88,
    barrel: weapon.category === "Sniper" ? 172 : weapon.category === "Heavy" ? 132 : longGun ? 116 : 58,
    stock: ["Rifle", "Sniper", "Heavy"].includes(weapon.category),
    scope: weapon.category === "Sniper" || ["AUG", "SG 553"].includes(weapon.name),
    grip: weapon.category !== "Pistol",
    magazine: weapon.category === "Heavy" ? 48 : weapon.category === "Pistol" ? 24 : 36,
  };
}

function draw3dBuyZoneMarker(w, h, fov, depth, colW, horizon) {
  const zone = buyZoneForTeam();
  if (inBuyZone()) {
    ctx.save();
    ctx.strokeStyle = state.team === "T" ? "rgba(215,189,98,0.68)" : "rgba(108,165,198,0.68)";
    ctx.fillStyle = state.team === "T" ? "rgba(215,189,98,0.055)" : "rgba(108,165,198,0.055)";
    ctx.lineWidth = 3;
    ctx.setLineDash([12, 9]);
    ctx.beginPath();
    ctx.ellipse(w / 2, h * 0.82, w * 0.34, h * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#f2f0df";
    ctx.font = "800 12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${state.team} BUY ZONE`, w / 2, h * 0.69);
    ctx.restore();
    return;
  }
  const p = projectWorldToFps(zone.x, zone.y, fov, depth, colW, horizon, -30, zone.r);
  if (!p || dist(player.x, player.y, zone.x, zone.y) > zone.r * 2.4) return;
  const radius = clamp((h * zone.r * 0.42) / Math.max(1, p.d), 18, 180);
  ctx.save();
  ctx.strokeStyle = state.team === "T" ? "rgba(215,189,98,0.82)" : "rgba(108,165,198,0.82)";
  ctx.fillStyle = state.team === "T" ? "rgba(215,189,98,0.09)" : "rgba(108,165,198,0.09)";
  ctx.lineWidth = 3;
  ctx.setLineDash([10, 7]);
  ctx.beginPath();
  ctx.ellipse(p.x, p.y, radius, radius * 0.28, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#f2f0df";
  ctx.font = "800 12px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`${state.team} BUY ZONE`, p.x, p.y - 12);
  ctx.restore();
}

function drawBuyZones2d() {
  for (const team of ["T", "CT"]) {
    const zone = buyZoneForTeam(team);
    ctx.save();
    ctx.fillStyle = team === "T" ? "rgba(215,189,98,0.10)" : "rgba(108,165,198,0.10)";
    ctx.strokeStyle = team === "T" ? "rgba(215,189,98,0.72)" : "rgba(108,165,198,0.72)";
    ctx.lineWidth = team === state.team ? 4 : 2;
    ctx.setLineDash([12, 8]);
    ctx.beginPath();
    ctx.arc(zone.x - camera.x, zone.y - camera.y, zone.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#f2f0df";
    ctx.font = "800 13px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${team} BUY`, zone.x - camera.x, zone.y - camera.y + 5);
    ctx.restore();
  }
}

const freedoomWeaponTextureSources = Object.freeze({
  pistol: "assets/weapons/freedoom/pistol.png",
  shotgun: "assets/weapons/freedoom/shotgun.png",
  "super-shotgun": "assets/weapons/freedoom/super-shotgun.png",
  chaingun: "assets/weapons/freedoom/chaingun.png",
  launcher: "assets/weapons/freedoom/launcher.png",
  plasma: "assets/weapons/freedoom/plasma.png",
  bfg: "assets/weapons/freedoom/bfg.png",
});
const freedoomWeaponTextures = new Map();
const freedoomWeaponVariants = new Map();
function freedoomWeaponTexture(name) {
  if (!name) return null;
  if (freedoomWeaponTextures.has(name)) return freedoomWeaponTextures.get(name);
  const source = freedoomWeaponTextureSources[name];
  if (!source) return null;
  const image = new Image();
  image.decoding = "async";
  image.src = source;
  freedoomWeaponTextures.set(name, image);
  return image;
}

const freedoomWeaponProfiles = Object.freeze({
  "Glock-18": { key: "pistol", accent: "#c8a96a" },
  "USP-S": { key: "pistol", accent: "#7693a2", detail: "suppressor", scale: 0.96 },
  P2000: { key: "pistol", accent: "#6f9fa8", detail: "compact" },
  P250: { key: "pistol", accent: "#8f9b91", scale: 1.03 },
  "Five-SeveN": { key: "pistol", accent: "#688ba6", detail: "long-barrel" },
  "Tec-9": { key: "pistol", accent: "#b97648", detail: "magazine", scale: 1.08 },
  "CZ75-Auto": { key: "chaingun", accent: "#85877e", detail: "compact", scale: 0.76 },
  "Dual Berettas": { key: "pistol", accent: "#b89558", detail: "dual", scale: 0.82 },
  "Desert Eagle": { key: "launcher", accent: "#c3a24e", detail: "compact", scale: 0.78 },
  "R8 Revolver": { key: "shotgun", accent: "#a36d42", detail: "compact", scale: 0.78 },
  "MAC-10": { key: "chaingun", accent: "#b86f40", detail: "compact", scale: 0.84 },
  MP9: { key: "chaingun", accent: "#718aa8", detail: "compact", scale: 0.88 },
  MP7: { key: "plasma", accent: "#667988", detail: "compact", scale: 0.76 },
  "MP5-SD": { key: "pistol", accent: "#607d73", detail: "suppressor", scale: 1.18 },
  "UMP-45": { key: "shotgun", accent: "#738365", detail: "magazine", scale: 0.96 },
  P90: { key: "bfg", accent: "#a49f55", detail: "compact", scale: 0.72 },
  "PP-Bizon": { key: "launcher", accent: "#9b834c", detail: "drum", scale: 0.86 },
  "Galil AR": { key: "chaingun", accent: "#9f6c35", detail: "magazine" },
  FAMAS: { key: "plasma", accent: "#667e57", detail: "compact", scale: 0.92 },
  "AK-47": { key: "chaingun", accent: "#b66f2f", detail: "wood", scale: 1.06 },
  M4A4: { key: "plasma", accent: "#66889a", detail: "long-barrel", scale: 0.96 },
  "M4A1-S": { key: "plasma", accent: "#879187", detail: "suppressor", scale: 0.94 },
  "SG 553": { key: "bfg", accent: "#92703b", detail: "scope", scale: 0.82 },
  AUG: { key: "bfg", accent: "#65848a", detail: "scope", scale: 0.84 },
  "SSG 08": { key: "launcher", accent: "#788553", detail: "scope", scale: 1.02 },
  AWP: { key: "launcher", accent: "#4f7049", detail: "large-scope", scale: 1.1 },
  G3SG1: { key: "bfg", accent: "#8f713c", detail: "large-scope", scale: 0.9 },
  "SCAR-20": { key: "plasma", accent: "#607d8b", detail: "large-scope", scale: 0.96 },
  Nova: { key: "shotgun", accent: "#a8894c", detail: "long-barrel" },
  XM1014: { key: "super-shotgun", accent: "#9b694d", detail: "magazine" },
  "MAG-7": { key: "shotgun", accent: "#697b68", detail: "compact", scale: 0.92 },
  "Sawed-Off": { key: "super-shotgun", accent: "#9c5e31", detail: "compact", scale: 0.9 },
  M249: { key: "bfg", accent: "#687b55", detail: "magazine", scale: 1.08 },
  Negev: { key: "bfg", accent: "#8e7945", detail: "drum", scale: 1.12 },
});

function freedoomWeaponTextureProfile(weapon) {
  if (!weapon || weapon.melee) return null;
  return freedoomWeaponProfiles[weapon.name] || { key: "chaingun", accent: weapon.color || "#8d9688" };
}

function freedoomWeaponTextureKey(weapon) {
  return freedoomWeaponTextureProfile(weapon)?.key || "";
}

function drawWeaponVariantDetail(vctx, profile, width, top, height) {
  const center = width / 2;
  vctx.fillStyle = profile.accent || "#8d9688";
  vctx.strokeStyle = "rgba(15,18,16,0.86)";
  vctx.lineWidth = 2;
  if (profile.detail === "suppressor") {
    vctx.fillRect(center - 5, 1, 10, top + 18);
    vctx.strokeRect(center - 5, 1, 10, top + 18);
  } else if (profile.detail === "long-barrel") {
    vctx.fillRect(center - 3, 4, 6, top + 13);
    vctx.strokeRect(center - 3, 4, 6, top + 13);
  } else if (["scope", "large-scope"].includes(profile.detail)) {
    const scopeW = profile.detail === "large-scope" ? 30 : 22;
    vctx.fillRect(center - scopeW / 2, top + height * 0.16, scopeW, 10);
    vctx.strokeRect(center - scopeW / 2, top + height * 0.16, scopeW, 10);
    vctx.fillRect(center - 3, top + height * 0.12, 6, 8);
  } else if (profile.detail === "magazine") {
    vctx.fillRect(center + width * 0.08, top + height * 0.58, 10, Math.max(16, height * 0.28));
    vctx.strokeRect(center + width * 0.08, top + height * 0.58, 10, Math.max(16, height * 0.28));
  } else if (profile.detail === "drum") {
    vctx.beginPath();
    vctx.arc(center + width * 0.1, top + height * 0.67, Math.max(8, width * 0.1), 0, Math.PI * 2);
    vctx.fill();
    vctx.stroke();
  } else if (profile.detail === "wood") {
    vctx.fillStyle = "rgba(128,70,30,0.78)";
    vctx.fillRect(center - width * 0.28, top + height * 0.55, width * 0.56, Math.max(6, height * 0.09));
  } else if (profile.detail === "compact") {
    vctx.fillStyle = "rgba(20,24,22,0.42)";
    vctx.fillRect(center - width * 0.22, top + height * 0.72, width * 0.44, Math.max(5, height * 0.08));
  }
}

function freedoomWeaponVariant(weapon) {
  const profile = freedoomWeaponTextureProfile(weapon);
  if (!profile) return null;
  const image = freedoomWeaponTexture(profile.key);
  if (!image?.complete || !image.naturalWidth || !image.naturalHeight) return null;
  if (freedoomWeaponVariants.has(weapon.name)) return freedoomWeaponVariants.get(weapon.name);
  const dual = profile.detail === "dual";
  const top = 26;
  const width = image.naturalWidth * (dual ? 2 : 1) + 28;
  const height = image.naturalHeight + top + 8;
  const texture = document.createElement("canvas");
  texture.width = width;
  texture.height = height;
  const vctx = texture.getContext("2d");
  vctx.imageSmoothingEnabled = false;
  if (dual) {
    vctx.drawImage(image, 2, top + 6);
    vctx.drawImage(image, image.naturalWidth - 2, top);
  } else {
    vctx.drawImage(image, (width - image.naturalWidth) / 2, top);
  }
  vctx.globalCompositeOperation = "source-atop";
  vctx.globalAlpha = 0.52;
  vctx.fillStyle = profile.accent || weapon.color || "#8d9688";
  vctx.fillRect(0, 0, width, height);
  vctx.globalAlpha = 1;
  vctx.globalCompositeOperation = "source-over";
  drawWeaponVariantDetail(vctx, profile, width, top, image.naturalHeight);
  vctx.globalAlpha = 0.78;
  vctx.fillStyle = profile.accent || weapon.color || "#8d9688";
  vctx.fillRect(width * 0.38, top + image.naturalHeight * 0.48, width * 0.24, 3);
  vctx.globalAlpha = 1;
  freedoomWeaponVariants.set(weapon.name, texture);
  return texture;
}

function drawFreedoomWeaponTexture(w, h, weapon, sway, recoilDrop, aiming = false) {
  const profile = freedoomWeaponTextureProfile(weapon);
  const image = freedoomWeaponVariant(weapon);
  if (!image?.width || !image?.height) return false;
  const scale = clamp(Math.min(w / 400, h / 190) * (aiming ? 1.06 : 1) * (profile.scale || 1), 1.65, 5.2);
  const width = image.width * scale;
  const height = image.height * scale;
  const x = (w - width) / 2 + sway;
  const aimLift = aiming ? clamp(h * 0.14, 70, 130) : 0;
  const y = h - height - aimLift + recoilDrop;
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.shadowColor = "rgba(0,0,0,0.38)";
  ctx.shadowBlur = 8 * scale;
  ctx.drawImage(image, Math.round(x), Math.round(y), Math.round(width), Math.round(height));
  ctx.restore();
  drawWeaponMuzzleFlash(w / 2 - 3 * scale + sway, y + 5 * scale, scale * 0.8);
  return true;
}

function drawWeaponPart(x, y, w, h, color, stroke = "rgba(17,18,12,0.72)") {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);
}

function drawWeaponHands(x, y, scale) {
  ctx.fillStyle = "#d8c19a";
  ctx.beginPath();
  ctx.ellipse(x - 28 * scale, y + 52 * scale, 28 * scale, 18 * scale, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(x + 84 * scale, y + 58 * scale, 24 * scale, 16 * scale, 0.15, 0, Math.PI * 2);
  ctx.fill();
}

function drawWeaponMuzzleFlash(x, y, scale) {
  if (camera.shake < 1.4 || activeWeapon().cooldown <= 0) return;
  ctx.fillStyle = "rgba(255,214,111,0.78)";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 34 * scale, y - 12 * scale);
  ctx.lineTo(x + 26 * scale, y + 12 * scale);
  ctx.closePath();
  ctx.fill();
}

function draw3dWeapon(w, h) {
  if (isAwpScoped()) return;
  const grenade = selectedGrenade();
  if (grenade) {
    const scale = clamp(w / 1280, 0.78, 1.15);
    const x = w / 2 + 80 * scale;
    const y = h - 122 * scale + camera.shake * 1.2;
    drawWeaponHands(x, y, scale);
    ctx.fillStyle = grenade.color;
    ctx.beginPath();
    ctx.ellipse(x + 54 * scale, y + 34 * scale, 30 * scale, 42 * scale, -0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#171a16";
    ctx.lineWidth = 4 * scale;
    ctx.stroke();
    drawWeaponPart(x + 38 * scale, y - 4 * scale, 34 * scale, 18 * scale, "#444a42");
    ctx.strokeStyle = state.grenadePrime ? "#e8d46a" : "#b9bcae";
    ctx.lineWidth = 5 * scale;
    ctx.beginPath();
    ctx.arc(x + 76 * scale, y + 2 * scale, 14 * scale, 0, Math.PI * 2);
    ctx.stroke();
    return;
  }
  if (isBombSelected()) {
    const scale = clamp(w / 1280, 0.78, 1.15);
    const x = w / 2 + 84 * scale;
    const y = h - 128 * scale + camera.shake * 1.8;
    drawWeaponHands(x, y, scale);
    drawWeaponPart(x + 8 * scale, y + 18 * scale, 116 * scale, 72 * scale, "#263024");
    drawWeaponPart(x + 26 * scale, y + 30 * scale, 78 * scale, 34 * scale, "#151913");
    ctx.fillStyle = "#d75f4f";
    ctx.fillRect(x + 36 * scale, y + 40 * scale, 24 * scale, 12 * scale);
    ctx.fillStyle = "#e8d46a";
    ctx.font = `${Math.round(16 * scale)}px Arial`;
    ctx.fillText("C4", x + 72 * scale, y + 55 * scale);
    return;
  }
  const weapon = activeWeapon();
  if (weapon.sandboxOnly) {
    const scale = clamp(w / 1280, 0.78, 1.15);
    const x = w / 2 + 92 * scale;
    const y = h - 142 * scale + camera.shake;
    drawWeaponHands(x, y, scale);
    drawWeaponPart(x + 8 * scale, y + 24 * scale, 126 * scale, 34 * scale, "#354c50");
    drawWeaponPart(x + 42 * scale, y + 52 * scale, 28 * scale, 58 * scale, "#273336");
    drawWeaponPart(x + 126 * scale, y + 31 * scale, 58 * scale, 18 * scale, "#70d7e5");
    ctx.fillStyle = sandbox.heldObjectId ? "#dffcff" : "#70d7e5";
    ctx.beginPath();
    ctx.arc(x + 188 * scale, y + 40 * scale, (sandbox.heldObjectId ? 13 : 9) * scale, 0, Math.PI * 2);
    ctx.fill();
    return;
  }
  const model = weaponViewModel(weapon);
  const aiming = isIronSights();
  const scale = clamp(w / 1280, 0.78, 1.15);
  const sway = Math.sin(performance.now() / 140) * player.speedFactor * (aiming ? 2.5 : 10) * settings.viewBob;
  const recoilDrop = camera.shake * 1.8;
  if (model.knife) {
    const x = w / 2 + 86 * scale + sway;
    const y = h - 132 * scale + recoilDrop;
    drawWeaponHands(x, y, scale);
    ctx.save();
    ctx.translate(x + 64 * scale, y + 18 * scale);
    ctx.rotate(-0.55);
    drawWeaponPart(-18 * scale, 42 * scale, 32 * scale, 68 * scale, "#2c302a");
    ctx.fillStyle = "#e4e0d0";
    ctx.beginPath();
    ctx.moveTo(-10 * scale, 40 * scale);
    ctx.lineTo(16 * scale, -64 * scale);
    ctx.lineTo(34 * scale, 44 * scale);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(17,18,12,0.72)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.fillRect(8 * scale, -40 * scale, 5 * scale, 70 * scale);
    ctx.restore();
    return;
  }
  if (drawFreedoomWeaponTexture(w, h, weapon, sway, recoilDrop, aiming)) return;
  const x = w / 2 + (aiming ? (weapon.category === "Pistol" ? -18 : -74) : weapon.category === "Pistol" ? 84 : 44) * scale + sway;
  const y = h - (aiming ? 116 : weapon.category === "Pistol" ? 132 : 150) * scale + recoilDrop;
  const bodyH = (weapon.category === "Pistol" ? 28 : 34) * scale;
  drawWeaponHands(x, y, scale);
  if (model.stock) drawWeaponPart(x - 82 * scale, y + 26 * scale, 80 * scale, 22 * scale, "#2d332f");
  drawWeaponPart(x, y + 20 * scale, model.body * scale, bodyH, weapon.color);
  drawWeaponPart(x + model.body * scale - 8 * scale, y + 28 * scale, model.barrel * scale, 10 * scale, "#1a1d18");
  drawWeaponPart(x + 26 * scale, y + 48 * scale, model.magazine * scale, 54 * scale, "#30352f");
  if (model.grip) drawWeaponPart(x + 92 * scale, y + 48 * scale, 22 * scale, 42 * scale, "#242821");
  if (model.scope) {
    drawWeaponPart(x + 58 * scale, y + 2 * scale, 88 * scale, 18 * scale, "#111412");
    ctx.fillStyle = "#7fb3c7";
    ctx.fillRect(x + 86 * scale, y + 6 * scale, 20 * scale, 10 * scale);
  }
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  ctx.fillRect(x + 12 * scale, y + 26 * scale, model.body * 0.55 * scale, 4 * scale);
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.fillRect(x + 6 * scale, y + 54 * scale, model.body * 0.7 * scale, 5 * scale);
  drawWeaponMuzzleFlash(x + (model.body + model.barrel - 8) * scale, y + 33 * scale, scale);
}

function updateHud() {
  const weapon = activeWeapon();
  const grenade = selectedGrenade();
  if (isSandboxMode()) {
    const objectCount = state.map.obstacles.filter((object) => !object.sandboxBoundary).length;
    hud.mode.textContent = `SANDBOX / ${settings.graphicsMode.toUpperCase()}`;
    hud.team.textContent = "Q SPAWN / P WORLD";
    hud.health.textContent = `HP ${Math.ceil(player.hp)}`;
    hud.armor.textContent = `${sandbox.widthMeters}x${sandbox.heightMeters}m`;
    hud.money.textContent = `${settings.language === "en" ? "OBJECTS" : "OBIEKTY"} ${objectCount}`;
    hud.buyZone.classList.add("hidden");
    hud.round.textContent = `NPC ${bots.length + allies.length}`;
    hud.score.textContent = `${settings.graphicsMode.toUpperCase()} FPS`;
    hud.timer.textContent = "--:--";
    hud.bomb.textContent = "Q SPAWN";
    hud.missionPill.textContent = "P IMPORT / EXPORT";
    hud.weaponName.textContent = weapon.name;
    hud.ammo.textContent = sandbox.heldObjectId ? "HOLDING" : "LMB GRAB";
    return;
  }
  const spectated = state.spectator.active ? currentSpectatorTarget() : null;
  const living = state.spectator.active ? livingTeamBots() : [];
  hud.mode.textContent = `${state.gameMode.toUpperCase()} / ${activeGameRules().label.toUpperCase()}`;
  hud.team.textContent = spectated ? `SPECTATE ${spectated.name} ${living.length ? state.spectator.index + 1 : 0}/${living.length}${spectated.source === "LAN" ? "" : " / E TAKEOVER"}` : `TEAM ${state.team}${isLobbyCommander() ? " / CMD" : ""}`;
  hud.health.textContent = spectated ? `OBS HP ${Math.ceil(spectated.hp)}` : `HP ${Math.ceil(player.hp)}`;
  hud.armor.textContent = `${tr("armor")} ${Math.ceil(player.armor)}${player.helmet ? " +H" : ""}${player.defuseKit ? " KIT" : ""}${player.zeus ? " ZEUS" : ""}`;
  hud.money.textContent = `${settings.language === "en" ? "MONEY" : "KASA"} $${player.money}`;
  const buyingOpen = canBuyNow();
  hud.buyZone.classList.toggle("hidden", !buyingOpen);
  hud.buyZone.textContent = `${settings.language === "en" ? "BUY ZONE" : "STREFA KUPNA"} ${Math.ceil(state.buyTime)}s`;
  hud.round.textContent = `R ${state.round}/32`;
  hud.score.textContent = isRespawnMode() ? `FRAGS ${state.fragScore.player} : ${state.fragScore.enemy}` : `T ${state.score.T} : ${state.score.CT} CT`;
  const time = state.phase === "freeze" ? state.freezeTime : state.roundTime;
  hud.timer.textContent = `${Math.floor(time / 60)}:${String(Math.max(0, Math.ceil(time % 60))).padStart(2, "0")}`;
  hud.bomb.textContent = state.bomb.status === "planted" ? `${tr("bomb")} ${state.bomb.site} ${Math.ceil(state.bomb.timer)}s` : playerHasBomb() ? `${tr("bomb")} ${isBombSelected() ? "READY" : tr("you")}` : state.bomb.status === "dropped" ? `${tr("bomb")} DROP` : `${tr("bomb")} --`;
  hud.weaponName.textContent = isBombSelected() ? "C4 Bomb" : grenade ? grenade.name : weapon.burstCapable ? `${weapon.name} ${weapon.fireMode === "burst" ? "BURST" : "SEMI"}` : `${weapon.name}${isAwpScoped() ? " / SCOPE" : isIronSights() ? " / SIGHTS" : isAimActive() ? " / ZOOM" : ""}`;
  hud.ammo.textContent = isBombSelected() ? "HOLD E" : grenade ? `${player.grenades[grenade.name] || 0} / ${state.grenadePrime ? "RELEASE LMB" : "HOLD LMB"}` : weapon.melee ? "MELEE" : weapon.reloading > 0 ? "reloading..." : `${weapon.ammo} / ${weapon.currentReserve}`;
}

function playerInsideEditorTrigger(trigger) {
  const dx = player.x - trigger.x;
  const dy = player.y - trigger.y;
  if (trigger.shape === "ellipse") return (dx * dx) / Math.max(1, (trigger.w / 2) ** 2) + (dy * dy) / Math.max(1, (trigger.h / 2) ** 2) <= 1;
  return Math.abs(dx) <= trigger.w / 2 && Math.abs(dy) <= trigger.h / 2;
}

function runEditorTriggerExpression(source, ctx) {
  const code = String(source || "true").trim();
  if (!code || code === "true") return true;
  try {
    if (/\breturn\b/.test(code)) return Boolean(Function("ctx", `"use strict";\n${code}`)(ctx));
    return Boolean(Function("ctx", `"use strict"; return Boolean(${code});`)(ctx));
  } catch (error) {
    console.warn("Editor trigger condition", error);
    return false;
  }
}

function activateEditorTrigger(trigger, ctx) {
  const code = String(trigger.onActivation || "").trim();
  if (!code) {
    showMessage(trigger.name || "Trigger aktywowany");
    return;
  }
  try {
    Function("ctx", `"use strict";\n${code}`)(ctx);
  } catch (error) {
    console.warn("Editor trigger activation", error);
    showMessage(`Blad triggera: ${trigger.name || trigger.id}`);
  }
}

function updateEditorTriggers(dt) {
  const triggers = state.map.editorData?.triggers;
  if (!Array.isArray(triggers) || !triggers.length || !player.alive) return;
  state.triggerPoll -= dt;
  if (state.triggerPoll > 0) return;
  state.triggerPoll = 0.25;
  for (const trigger of triggers) {
    const inside = playerInsideEditorTrigger(trigger);
    const previous = state.triggerStates[trigger.id] || { inside: false, activated: false };
    const ctx = {
      trigger,
      player,
      team: state.team,
      round: state.round,
      enemiesAlive: bots.filter((bot) => bot.hp > 0).length,
      alliesAlive: allies.filter((bot) => bot.hp > 0).length + (player.alive ? 1 : 0),
      inside,
      showMessage,
      completeObjective: () => { state.storyComplete = true; renderStoryObjective(); },
      endRound,
    };
    const canActivate = inside && (!previous.activated || (trigger.repeatable && !previous.inside)) && runEditorTriggerExpression(trigger.condition, ctx);
    if (canActivate) {
      activateEditorTrigger(trigger, ctx);
      previous.activated = true;
    }
    previous.inside = inside;
    state.triggerStates[trigger.id] = previous;
  }
}

function tick(now) {
  const selectedCap = String(settings.hzLimit ?? "vsync");
  const vsyncCap = settings.perfLimit === "eco" ? 30 : settings.perfLimit === "balanced" ? 60 : 0;
  const fpsCap = selectedCap === "vsync" ? vsyncCap : Math.max(0, Number(selectedCap) || 0);
  const target = fpsCap ? 1000 / fpsCap : 0;
  const elapsed = now - last;
  if (target && elapsed + 0.25 < target) {
    requestAnimationFrame(tick);
    return;
  }
  const dt = Math.min(0.033, elapsed / 1000 || 0);
  last = target ? now - (elapsed % target) : now;
  runtimeStats.frames += 1;
  const fpsElapsed = now - runtimeStats.sampleStarted;
  if (fpsElapsed >= 500) {
    runtimeStats.fps = Math.round((runtimeStats.frames * 1000) / fpsElapsed);
    runtimeStats.frames = 0;
    runtimeStats.sampleStarted = now;
  }
  pollLanLobby();
  if (state.running && !state.paused) {
    syncLanHeartbeat();
    updateRoundRules(dt);
    updateRespawns(dt);
    updatePlayer(dt);
    updateAllies(dt);
    updateBots(dt);
    updateBullets(dt);
    updateGrenades(dt);
    updateEditorTriggers(dt);
    updateSpectator();
    pollServerAudioEvents();
    try {
      renderGameView();
      drawEnabledModOverlays();
    } catch (error) {
      console.error(error);
      showMessage("Blad renderu - przelaczam na 2D");
      settings.graphicsMode = "2d";
      hud.menuGraphics.value = "2d";
      hud.graphicsMode.value = "2d";
      try {
        render2d();
      } catch (fallbackError) {
        showFatalError(fallbackError, "renderu");
      }
    }
    if (state.running) updateHud();
  }
  requestAnimationFrame(tick);
}

function togglePanel(panel) {
  const open = panel.classList.contains("hidden");
  closePanels();
  if (open) {
    state.overlayOpen = true;
    panel.classList.remove("hidden");
    document.exitPointerLock?.();
    if (panel === hud.shopPanel) renderShop();
    if (panel === hud.missionsPanel) renderMissions();
    if (panel === hud.teamsPanel) renderTeams();
    if (panel === hud.bindsPanel) renderBinds();
    if (panel === hud.editorPanel) renderSavedMissions();
    if (panel === hud.modsPanel) renderModManager();
    if (panel === hud.lanLobbyPanel) renderLanLobby();
  }
}

function closePanels() {
  state.overlayOpen = false;
  waitingForFastBind = false;
  hud.playerMenu?.classList.add("hidden");
  hud.shopPanel.classList.add("hidden");
  hud.settingsPanel.classList.add("hidden");
  hud.bindsPanel.classList.add("hidden");
  hud.teamsPanel.classList.add("hidden");
  hud.mapgenPanel.classList.add("hidden");
  hud.editorPanel.classList.add("hidden");
  hud.consolePanel.classList.add("hidden");
  hud.missionsPanel.classList.add("hidden");
  hud.networkPanel.classList.add("hidden");
  hud.lanLobbyPanel.classList.add("hidden");
  hud.modsPanel.classList.add("hidden");
  hud.sandboxSpawnPanel?.classList.add("hidden");
  hud.sandboxWorldPanel?.classList.add("hidden");
  hud.storyObjectivePanel?.classList.add("hidden");
}

function equipHotkey(n) {
  const slot = n === 0 ? 10 : n;
  selectInventoryItem(carriedItems()[slot - 1]);
}

function cycleWeapon(direction = 1) {
  const items = carriedItems();
  if (items.length < 2) return;
  const current = items.findIndex((item) => {
    if (item.type === "bomb") return isBombSelected();
    if (item.type === "grenade") return item.grenade.name === selectedGrenadeName();
    return !isBombSelected() && !isGrenadeSelected() && item.weapon.id === player.weaponId;
  });
  const index = current >= 0 ? current : 0;
  selectInventoryItem(items[(index + direction + items.length) % items.length]);
}

function toggleWeaponMode() {
  if (isBombSelected() || isGrenadeSelected()) return false;
  const weapon = activeWeapon();
  if (!weapon.burstCapable) return false;
  weapon.fireMode = weapon.fireMode === "burst" ? "semi" : "burst";
  emitAudioEvent("ui", { x: player.x, y: player.y }, false);
  showMessage(`${weapon.name}: ${weapon.fireMode === "burst" ? "BURST" : "SEMI"}`);
  updateHud();
  return true;
}

function downloadLauncher() {
  const content = `@echo off\r\ncd /d "%~dp0"\r\nstart "" "PotatoStrike.html"\r\n`;
  const blob = new Blob([content], { type: "application/octet-stream" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "PotatoStrike-launch-browser.bat";
  a.click();
  URL.revokeObjectURL(a.href);
  showMessage("Pobrano launcher .bat do gry lokalnej");
}

window.addEventListener("resize", resize);
window.addEventListener("keydown", (event) => {
  if (waitingForFastBind) {
    event.preventDefault();
    waitingForFastBind = false;
    pendingFastBindKey = event.code === "Escape" ? "" : event.code;
    renderFastBinds();
    return;
  }
  if (waitingForBind) {
    event.preventDefault();
    bindings[waitingForBind] = event.code;
    showMessage(`Bind ustawiony: ${actionLabels[waitingForBind]} = ${codeName(event.code)}`);
    waitingForBind = "";
    saveConfig();
    renderBinds();
    return;
  }
  const typing = ["INPUT", "TEXTAREA", "SELECT"].includes(event.target?.tagName);
  const fastBinds = !event.repeat && !typing && !state.overlayOpen && settings.fastBindsEnabled !== false
    ? normalizeFastBinds().filter((bind) => bind.enabled && bind.key === event.code)
    : [];
  if (fastBinds.length) {
    event.preventDefault();
    for (const fastBind of fastBinds) executeFastBind(fastBind.action);
    return;
  }
  if ([bindings.forward, bindings.left, bindings.back, bindings.right, bindings.dash, bindings.crouch, bindings.drop, bindings.spectatorNext, bindings.spectatorPrev, "KeyQ", "Tab"].includes(event.code)) event.preventDefault();
  keys.add(event.code);
  if (!typing && state.running && isSandboxMode() && event.code === "KeyQ") {
    if (hud.sandboxSpawnPanel.classList.contains("hidden")) {
      closePanels();
      state.overlayOpen = true;
      hud.sandboxSpawnPanel.classList.remove("hidden");
      renderSandboxSpawnMenu();
      document.exitPointerLock?.();
    }
    return;
  }
  if (event.code === bindings.dash && isPerspectiveMode() && state.grenadePrime) state.grenadePrime.jumpThrowQueued = true;
  if (event.code === "Escape") closePanels();
  if (event.code === "Tab" && showStoryObjective()) return;
  if (!typing && event.code === "KeyP" && state.running && isSandboxMode()) {
    renderSandboxWorldSummary();
    togglePanel(hud.sandboxWorldPanel);
    return;
  }
  if (!typing && event.code === "KeyV" && state.running && isSandboxMode()) {
    player.noclipMode = !player.noclipMode;
    showMessage(`Sandbox noclip: ${player.noclipMode ? "ON" : "OFF"} / granice mapy aktywne`);
    return;
  }
  if (event.code === bindings.hint) { showStoryHint(); return; }
  if (event.code === bindings.shop) togglePanel(hud.shopPanel);
  if (event.code === bindings.settings) togglePanel(hud.settingsPanel);
  if (event.code === bindings.missions) togglePanel(hud.missionsPanel);
  if (event.code === bindings.binds) togglePanel(hud.bindsPanel);
  if (event.code === bindings.teams) togglePanel(hud.teamsPanel);
  if (event.code === bindings.network) togglePanel(hud.networkPanel);
  if (event.code === bindings.console) openOwnerConsole();
  if (event.code === bindings.pause) {
    if (!isSandboxMode()) setPaused(!state.paused);
    return;
  }
  if (state.overlayOpen) return;
  if (state.spectator.active && !player.alive) {
    if (event.code === bindings.spectatorNext) cycleSpectatorTarget(1);
    if (event.code === bindings.spectatorPrev) cycleSpectatorTarget(-1);
    return;
  }
  if (event.code === bindings.reload) reload();
  if (event.code === bindings.drop) dropActiveWeapon();
  if (event.code === bindings.grenade) selectNextGrenade();
  if (event.code.startsWith("Digit")) equipHotkey(Number(event.code.slice(5)));
});
window.addEventListener("keyup", (event) => {
  keys.delete(event.code);
  if (event.code === "KeyQ" && isSandboxMode() && !hud.sandboxSpawnPanel.classList.contains("hidden")) {
    closePanels();
    if (state.running && isPerspectiveMode()) requestGamePointerLock();
  }
});
canvas.addEventListener("mousemove", (event) => {
  if (document.pointerLockElement === canvas) {
    if (isPerspectiveMode()) {
      const aimSensitivity = isAwpScoped() ? settings.zoomSensitivity * 0.62 : isAimActive() ? settings.zoomSensitivity : 1;
      updatePerspectiveLook(event.movementX, event.movementY, aimSensitivity);
    } else {
      mouse.x = clamp(mouse.x + event.movementX, 0, window.innerWidth);
      mouse.y = clamp(mouse.y + event.movementY, 0, window.innerHeight);
    }
  } else {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
  }
});
canvas.addEventListener("pointerdown", (event) => {
  if (event.pointerType !== "touch" || !isPerspectiveMode() || state.overlayOpen) return;
  mobileLook.pointerId = event.pointerId;
  mobileLook.x = event.clientX;
  mobileLook.y = event.clientY;
  canvas.setPointerCapture?.(event.pointerId);
  event.preventDefault();
});
canvas.addEventListener("pointermove", (event) => {
  if (event.pointerType !== "touch" || event.pointerId !== mobileLook.pointerId || !isPerspectiveMode()) return;
  const dx = event.clientX - mobileLook.x;
  const dy = event.clientY - mobileLook.y;
  updatePerspectiveLook(dx * 2, dy * 2);
  mobileLook.x = event.clientX;
  mobileLook.y = event.clientY;
  event.preventDefault();
});
const stopMobileLook = (event) => {
  if (event.pointerId === mobileLook.pointerId) mobileLook.pointerId = null;
};
canvas.addEventListener("pointerup", stopMobileLook);
canvas.addEventListener("pointercancel", stopMobileLook);
canvas.addEventListener("mousedown", async (event) => {
  if (editMapAt(event)) return;
  if (state.overlayOpen) return;
  if (state.spectator.active && !player.alive) {
    cycleSpectatorTarget(event.button === 2 ? -1 : 1);
    event.preventDefault();
    return;
  }
  ensureAudio();
  if (event.button === 2) {
    if (canHoldAim()) {
      mouse.rightDown = true;
      await requestGamePointerLock();
    } else toggleWeaponMode();
    event.preventDefault();
    return;
  }
  if (isGrenadeSelected()) {
    beginGrenadeAim();
    event.preventDefault();
    return;
  }
  if (event.button === 0 && isPhysicsGunActive()) {
    mouse.down = true;
    mouse.clicked = true;
    beginPhysicsGrab();
    await requestGamePointerLock();
    event.preventDefault();
    return;
  }
  mouse.down = true;
  mouse.clicked = true;
  await requestGamePointerLock();
});
canvas.addEventListener("contextmenu", (event) => {
  if ((state.running && !state.overlayOpen) || (state.spectator.active && !player.alive)) event.preventDefault();
});
canvas.addEventListener("wheel", (event) => {
  if (state.overlayOpen || !state.running || !player.alive) return;
  event.preventDefault();
  if (sandbox.heldObjectId && isPhysicsGunActive()) {
    sandbox.holdDistance = clamp(sandbox.holdDistance + (event.deltaY > 0 ? 24 : -24), 80, 520);
    return;
  }
  cycleWeapon(event.deltaY > 0 ? 1 : -1);
}, { passive: false });
window.addEventListener("mouseup", (event) => {
  if (event.button === 0) {
    mouse.down = false;
    releasePhysicsGrab();
  }
  if (event.button === 2) mouse.rightDown = false;
  if (event.button === 0) releaseGrenadeAim();
});

document.querySelectorAll(".close-panel").forEach((button) => button.addEventListener("click", closePanels));
hud.openSettings.addEventListener("click", () => togglePanel(hud.settingsPanel));
hud.openBinds.addEventListener("click", () => togglePanel(hud.bindsPanel));
hud.openTeams.addEventListener("click", () => togglePanel(hud.teamsPanel));
hud.openMapgen.addEventListener("click", () => togglePanel(hud.mapgenPanel));
async function openStandaloneEditor() {
  if (window.potatoNative?.openEditor) {
    await window.potatoNative.openEditor();
    return;
  }
  window.location.href = window.location.pathname.toLowerCase().endsWith("potatostrike.html") ? "game/editor.html" : "editor.html";
}

hud.quickEditor.addEventListener("click", () => togglePanel(hud.editorPanel));
hud.openEditor.addEventListener("click", openStandaloneEditor);
hud.openConsole.addEventListener("click", openOwnerConsole);
hud.openNetwork.addEventListener("click", () => {
  syncServerControls();
  togglePanel(hud.networkPanel);
});
hud.createLan.addEventListener("click", () => openLanSetup(true));
hud.joinLan.addEventListener("click", openLanServerBrowser);
hud.lanBrowserRefresh.addEventListener("click", refreshLanServerBrowser);
hud.serverHost.addEventListener("click", async () => {
  applyServerConfig(serverConfigFromControls(), { quiet: true });
  await openLanLobby(true);
});
hud.serverJoin.addEventListener("click", () => openLanLobby(false));
hud.serverFillBots.addEventListener("change", () => {
  serverSettings.fillTeamsWithBots = hud.serverFillBots.checked;
  hud.serverBotQuota.disabled = !hud.serverFillBots.checked || !canManageServer();
});
hud.lanLobbyStart.addEventListener("click", startLanLobbyMatch);
hud.lanLobbyAddPlayer.addEventListener("click", async () => {
  const name = hud.lanAddPlayerName.value.trim();
  if (!name) return showMessage("Wpisz nick gracza LAN");
  const targetId = `local-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  try {
    renderLanLobby(await lanLobbyRequest("add", { targetId, targetName: name, targetTeam: hud.lanAddPlayerTeam.value }));
    hud.lanAddPlayerName.value = "";
  } catch (error) {
    showMessage(`LAN: ${error.message}`);
  }
});
hud.lanLobbyTransfer.addEventListener("click", async () => {
  const targetId = hud.lanTransferTarget.value;
  if (!targetId) return;
  try {
    renderLanLobby(await lanLobbyRequest("transfer", { targetId }));
    showMessage("Przekazano dowodzenie");
  } catch (error) {
    showMessage(`LAN: ${error.message}`);
  }
});
hud.lanLobbySettings.addEventListener("click", () => {
  syncServerControls();
  togglePanel(hud.networkPanel);
});
hud.lanLobbyRefresh.addEventListener("click", () => pollLanLobby(true));
hud.lanLobbyLeave.addEventListener("click", leaveLanLobby);
hud.serverApply.addEventListener("click", async () => {
  if (!applyServerConfig(serverConfigFromControls())) return;
  localStorage.setItem("potatoStrikeServerConfig", JSON.stringify(serverConfigSnapshot()));
  const remote = await saveServerConfigRemote();
  if (state.gameMode === "lan") showMessage(remote ? "Server config zapisany w lobby LAN" : "Server offline: config zapisany lokalnie");
});
hud.serverExport.addEventListener("click", () => downloadJson("potato-strike-server.json", serverConfigSnapshot()));
hud.serverImport.addEventListener("click", () => hud.serverConfigFile.click());
hud.serverConfigFile.addEventListener("change", importServerConfigFile);
hud.openProfile.addEventListener("click", () => {
  const shouldOpen = hud.playerMenu?.classList.contains("hidden");
  closePanels();
  hud.playerMenu?.classList.toggle("hidden", !shouldOpen);
});
hud.openMods.addEventListener("click", () => {
  togglePanel(hud.modsPanel);
  renderModManager();
});
hud.teamAddAlly.addEventListener("click", () => addTeamSlot("ally"));
hud.teamAddEnemy.addEventListener("click", () => addTeamSlot("enemy"));
hud.teamRemoveAlly.addEventListener("click", () => removeTeamSlot("ally"));
hud.teamRemoveEnemy.addEventListener("click", () => removeTeamSlot("enemy"));
hud.teamAddLan.addEventListener("click", () => addTeamSlot("ally", "LAN"));
hud.teamRemoveLan.addEventListener("click", () => removeTeamSlot("ally", "LAN"));
hud.teamBalance.addEventListener("click", balanceTeams);
hud.teamDifficulty.addEventListener("change", () => {
  settings.difficulty = normalizeBotDifficulty(hud.teamDifficulty.value);
  serverSettings.botDifficulty = settings.difficulty;
  hud.difficulty.value = String(settings.difficulty);
  saveConfig();
});
hud.downloadGame.addEventListener("click", downloadLauncher);
hud.generateMap.addEventListener("click", generateMapFromMenu);
hud.editorNew.addEventListener("click", newEditorMap);
hud.editorRandom.addEventListener("click", () => {
  hud.mapSeed.value = `${hud.editorName.value || "story"}-${Date.now().toString(36)}`;
  generateMapFromMenu();
  maps.editor = JSON.parse(JSON.stringify(maps.generated));
  state.map = maps.editor;
  state.mapKey = "editor";
  editor.active = true;
  showMessage("Losowa misja/mapa gotowa do edycji");
});
hud.editorSave.addEventListener("click", saveEditorMission);
hud.editorSaveMap.addEventListener("click", saveCurrentMapOnly);
hud.editorExportMap.addEventListener("click", exportCurrentMap);
hud.editorImportMap.addEventListener("click", () => hud.editorMapFile.click());
hud.editorMapFile.addEventListener("change", () => importCurrentMapFile(hud.editorMapFile));
hud.editorLoad.addEventListener("click", () => loadEditorMission());
hud.editorExport.addEventListener("click", () => {
  const mission = savedStoryMissions().find((item) => item.id === editor.selectedMission);
  if (!mission) return showMessage("Najpierw wybierz misje");
  downloadJson(`${mission.name.replace(/\s+/g, "-").toLowerCase()}.potato-mission.json`, mission);
});
hud.textureImport.addEventListener("click", importTexture);
hud.modImport.addEventListener("click", importMod);
hud.modExport.addEventListener("click", () => downloadJson("potato-strike-modpack.json", { mods: loadedMods, textures: customTextures, maps: userMaps(), missions: savedStoryMissions() }));
hud.runCommand.addEventListener("click", runOwnerCommand);
hud.commandInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") runOwnerCommand();
});
hud.resumeGame.addEventListener("click", () => setPaused(false));
hud.lanResumeMatch.addEventListener("click", () => setPaused(false));
hud.lanRestartRound.addEventListener("click", () => { if (isLobbyCommander()) { resetRoundPositions(); setPaused(false); showMessage("Sedzia LAN: runda zrestartowana"); } });
hud.lanRestartMatch.addEventListener("click", () => { if (isLobbyCommander()) { newMatch({ preserveLobbyOwner: true }); setPaused(false); showMessage("Sedzia LAN: mecz zrestartowany"); } });
hud.lanRefereeSettings.addEventListener("click", () => { if (isLobbyCommander()) { setPaused(false); syncServerControls(); togglePanel(hud.networkPanel); } });
hud.lanEndMatch.addEventListener("click", () => { if (isLobbyCommander()) { state.running = false; state.paused = false; closePanels(); hud.menu.classList.remove("hidden"); showMessage("Sedzia LAN: mecz zakonczony"); } });
hud.pauseSettings.addEventListener("click", () => {
  setPaused(false);
  togglePanel(hud.settingsPanel);
});
hud.pauseMenu.addEventListener("click", () => {
  state.running = false;
  setPaused(false);
  hud.menu.classList.remove("hidden");
});
hud.start.addEventListener("click", async () => {
  try {
    if (hud.menuMode.value === "lan") {
      await openLanLobby(false);
      return;
    }
    ensureAudio();
    closePanels();
    state.running = true;
    mouse.x = window.innerWidth / 2;
    mouse.y = window.innerHeight / 2;
    newMatch();
    renderGameView();
    hud.menu.classList.add("hidden");
    if (state.gameMode === "online") {
      hud.networkStatus.textContent = `${state.gameMode.toUpperCase()} jest przygotowany w menu. Aktualny build gra lokalnie z botami, dopoki nie zostanie podpiety serwer.`;
      showMessage(`${state.gameMode.toUpperCase()}: fallback do botow`);
    }
    await requestGamePointerLock();
  } catch (error) {
    showFatalError(error, "startu gry");
  }
});

hud.graphicsMode.addEventListener("change", () => { setGraphicsMode(hud.graphicsMode.value); saveConfig(); });
hud.menuGraphics.addEventListener("change", () => { setGraphicsMode(hud.menuGraphics.value); saveConfig(); });
hud.menuMode.addEventListener("change", syncMenuAimMode);
for (const control of [hud.sandboxWidth, hud.sandboxHeight, hud.sandboxWallTexture, hud.sandboxUnlimitedAmmo]) {
  control.addEventListener("change", () => {
    settings.sandboxWidth = clamp(Number(hud.sandboxWidth.value) || 40, 30, 150);
    settings.sandboxHeight = clamp(Number(hud.sandboxHeight.value) || 30, 24, 120);
    settings.sandboxWallTexture = simple3dTextures[hud.sandboxWallTexture.value] ? hud.sandboxWallTexture.value : "white";
    settings.sandboxUnlimitedAmmo = hud.sandboxUnlimitedAmmo.checked;
    hud.sandboxWidth.value = String(settings.sandboxWidth);
    hud.sandboxHeight.value = String(settings.sandboxHeight);
    hud.sandboxWallTexture.value = settings.sandboxWallTexture;
    saveConfig();
  });
}
document.querySelectorAll("[data-sandbox-category]").forEach((button) => button.addEventListener("click", () => {
  state.sandboxCategory = button.dataset.sandboxCategory;
  renderSandboxSpawnMenu();
}));
hud.sandboxWorldExport.addEventListener("click", exportSandboxWorld);
hud.sandboxWorldImport.addEventListener("click", () => hud.sandboxWorldFile.click());
hud.sandboxWorldFile.addEventListener("change", importSandboxWorldFile);
hud.sandboxWorldSwitch.addEventListener("click", () => switchHybridView());
hud.hybridMapExport.addEventListener("click", exportCurrentMap);
hud.hybridMapImport.addEventListener("click", () => hud.hybridMapFile.click());
hud.hybridMapFile.addEventListener("change", () => importCurrentMapFile(hud.hybridMapFile));
hud.sandboxWorldClear.addEventListener("click", clearSandboxSpawned);
hud.menuAimMode.addEventListener("change", () => {
  settings.botAimMode = hud.menuAimMode.value;
  saveConfig();
});
hud.quality.addEventListener("change", () => { settings.quality = hud.quality.value; });
hud.languageSelect.addEventListener("change", () => {
  settings.language = hud.languageSelect.value;
  applyLanguage();
  showMessage(tr("languageChanged"));
  saveConfig();
});
hud.difficulty.addEventListener("change", () => {
  settings.difficulty = normalizeBotDifficulty(hud.difficulty.value);
  serverSettings.botDifficulty = settings.difficulty;
  hud.teamDifficulty.value = String(settings.difficulty);
  saveConfig();
});
hud.resolution.addEventListener("change", () => { settings.resolution = hud.resolution.value; resize(); saveConfig(); });
hud.hzLimit.addEventListener("change", () => { settings.hzLimit = hud.hzLimit.value; saveConfig(); });
hud.fastBindKey.addEventListener("click", () => {
  waitingForFastBind = true;
  renderFastBinds();
});
hud.fastBindAdd.addEventListener("click", () => {
  if (!pendingFastBindKey) return showMessage(tr("fastBindPress"));
  const action = hud.fastBindAction.value;
  normalizeFastBinds();
  settings.fastBinds.push({
    id: `fb-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`,
    key: pendingFastBindKey,
    action,
    enabled: true,
  });
  showMessage(`Fast Bind: ${codeName(pendingFastBindKey)} = ${fastBindActionLabel(action)}`);
  pendingFastBindKey = "";
  saveConfig();
  renderFastBinds();
});
hud.fastBindEnabled.addEventListener("change", () => {
  settings.fastBindsEnabled = hud.fastBindEnabled.checked;
  saveConfig();
  renderFastBinds();
});
hud.fastBindClear.addEventListener("click", () => {
  settings.fastBinds = [];
  pendingFastBindKey = "";
  saveConfig();
  renderFastBinds();
  showMessage(settings.language === "en" ? "All Fast Binds removed" : "Usunieto wszystkie Fast Bind");
});
hud.crosshairStyle.addEventListener("change", () => { settings.crosshairStyle = hud.crosshairStyle.value; saveConfig(); });
hud.crosshairEnabled.addEventListener("change", () => { settings.crosshairEnabled = hud.crosshairEnabled.checked; saveConfig(); });
hud.crosshairColor.addEventListener("input", () => { settings.crosshairColor = hud.crosshairColor.value; saveConfig(); });
hud.crosshairSize.addEventListener("input", () => { settings.crosshairSize = Number(hud.crosshairSize.value); saveConfig(); });
hud.crosshairGap.addEventListener("input", () => { settings.crosshairGap = Number(hud.crosshairGap.value); saveConfig(); });
hud.crosshairThickness.addEventListener("input", () => { settings.crosshairThickness = Number(hud.crosshairThickness.value); saveConfig(); });
hud.crosshairOutline.addEventListener("change", () => { settings.crosshairOutline = hud.crosshairOutline.checked; saveConfig(); });
hud.crosshairPaintColor.addEventListener("input", () => { settings.crosshairPaintColor = hud.crosshairPaintColor.value; saveConfig(); });
hud.crosshairCustomEnabled.addEventListener("change", () => { settings.crosshairCustomEnabled = hud.crosshairCustomEnabled.checked; saveConfig(); });
hud.crosshairPaintClear.addEventListener("click", () => {
  settings.customCrosshair = [];
  drawCrosshairPaint();
  saveConfig();
});
hud.crosshairReset.addEventListener("click", () => {
  settings.crosshairEnabled = true;
  settings.crosshairVersion = 2;
  settings.crosshairStyle = "dot";
  settings.crosshairColor = "#f2f0df";
  settings.crosshairSize = 1;
  settings.crosshairGap = 10;
  settings.crosshairThickness = 2;
  settings.crosshairOutline = true;
  settings.crosshairCustomEnabled = false;
  settings.customCrosshair = [];
  syncProfileFields();
  saveConfig();
  showMessage(settings.language === "en" ? "Crosshair reset to fixed dot" : "Celownik: staly punkt");
});
hud.crosshairPaintExport.addEventListener("click", () => downloadJson("potato-crosshair.json", {
  type: "potato-strike-crosshair",
  enabled: settings.crosshairEnabled !== false,
  style: settings.crosshairStyle,
  color: settings.crosshairColor,
  size: settings.crosshairSize,
  gap: settings.crosshairGap,
  thickness: settings.crosshairThickness,
  outline: settings.crosshairOutline,
  customEnabled: settings.crosshairCustomEnabled,
  pixels: normalizeCrosshairPixels(settings.customCrosshair),
}));
hud.crosshairPaintImport.addEventListener("click", () => hud.crosshairPaintFile.click());
hud.crosshairPaintFile.addEventListener("change", async () => {
  const file = hud.crosshairPaintFile.files[0];
  if (!file) return;
  const payload = JSON.parse(await file.text());
  if (typeof payload.enabled === "boolean") settings.crosshairEnabled = payload.enabled;
  if (["dot", "classic", "wide", "circle", "t"].includes(payload.style)) settings.crosshairStyle = payload.style;
  if (/^#[0-9a-f]{6}$/i.test(payload.color || "")) settings.crosshairColor = payload.color;
  if (Number.isFinite(Number(payload.size))) settings.crosshairSize = clamp(Number(payload.size), 0.6, 2.2);
  if (Number.isFinite(Number(payload.gap))) settings.crosshairGap = clamp(Number(payload.gap), 0, 24);
  if (Number.isFinite(Number(payload.thickness))) settings.crosshairThickness = clamp(Number(payload.thickness), 1, 5);
  if (typeof payload.outline === "boolean") settings.crosshairOutline = payload.outline;
  settings.customCrosshair = normalizeCrosshairPixels(payload.pixels || payload.customCrosshair || payload);
  settings.crosshairCustomEnabled = typeof payload.customEnabled === "boolean" ? payload.customEnabled : Boolean(settings.customCrosshair.length);
  syncProfileFields();
  drawCrosshairPaint();
  saveConfig();
  showMessage("Celownik wgrany");
});
hud.crosshairPaintCanvas.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  hud.crosshairPaintCanvas.setPointerCapture?.(event.pointerId);
  paintCrosshairCell(event, event.button === 2);
});
hud.crosshairPaintCanvas.addEventListener("pointermove", (event) => {
  if (!event.buttons) return;
  event.preventDefault();
  paintCrosshairCell(event, event.buttons === 2);
});
hud.crosshairPaintCanvas.addEventListener("contextmenu", (event) => event.preventDefault());
hud.configNick.addEventListener("input", () => { settings.nick = hud.configNick.value || "Potato"; hud.playerName.value = settings.nick; saveConfig(); });
hud.exportConfig.addEventListener("click", exportConfig);
hud.importConfig.addEventListener("click", () => hud.configFile.click());
hud.configFile.addEventListener("change", async () => {
  const file = hud.configFile.files[0];
  if (!file) return;
  const config = JSON.parse(await file.text());
  applyProfile(config, true);
  showMessage("Profil wgrany z configu");
});
hud.profileCreate.addEventListener("click", () => createPlayerProfile(hud.profileNick.value || "Potato"));
hud.profileLoad.addEventListener("click", () => {
  const profile = playerProfiles().find((item) => item.playerId === hud.profileList.value);
  if (!profile) return showMessage("Brak profilu do wczytania");
  applyProfile(profile, true);
  showMessage(`Wczytano profil: ${settings.nick}`);
});
hud.profileExport.addEventListener("click", exportConfig);
hud.profileImport.addEventListener("click", () => hud.profileFile.click());
hud.profileFile.addEventListener("change", async () => {
  const file = hud.profileFile.files[0];
  if (!file) return;
  applyProfile(JSON.parse(await file.text()), true);
  showMessage("Profil zaimportowany");
});
hud.sensitivity.addEventListener("input", () => { settings.sensitivity = clamp(Number(hud.sensitivity.value) || 1, 0.1, 8); saveConfig(); });
hud.pitchSensitivity.addEventListener("input", () => { settings.pitchSensitivity = Number(hud.pitchSensitivity.value); saveConfig(); });
hud.zoomSensitivity.addEventListener("input", () => { settings.zoomSensitivity = Number(hud.zoomSensitivity.value); saveConfig(); });
hud.fieldOfView.addEventListener("input", () => { settings.fieldOfView = Number(hud.fieldOfView.value); saveConfig(); });
hud.rawMouseInput.addEventListener("change", () => { settings.rawMouseInput = hud.rawMouseInput.checked; saveConfig(); });
hud.mouseAcceleration.addEventListener("change", () => { settings.mouseAcceleration = hud.mouseAcceleration.checked; saveConfig(); });
hud.mouseAccelerationAmount.addEventListener("input", () => { settings.mouseAccelerationAmount = Number(hud.mouseAccelerationAmount.value); saveConfig(); });
hud.viewBob.addEventListener("input", () => { settings.viewBob = Number(hud.viewBob.value); saveConfig(); });
hud.invertY.addEventListener("change", () => { settings.invertY = hud.invertY.checked; saveConfig(); });
hud.screenShake.addEventListener("input", () => { settings.screenShake = Number(hud.screenShake.value); });
hud.soundEnabled.addEventListener("change", () => { settings.soundEnabled = hud.soundEnabled.checked; if (settings.soundEnabled) ensureAudio(); saveConfig(); });
hud.masterVolume.addEventListener("input", () => { settings.masterVolume = Number(hud.masterVolume.value); saveConfig(); });
hud.footstepVolume.addEventListener("input", () => { settings.footstepVolume = Number(hud.footstepVolume.value); saveConfig(); });
hud.serverAudio.addEventListener("change", () => { settings.serverAudio = hud.serverAudio.checked; saveConfig(); });
hud.perfLimit.addEventListener("change", () => { settings.perfLimit = hud.perfLimit.value; saveConfig(); });
hud.botCount.addEventListener("input", () => { settings.botCount = Number(hud.botCount.value); });
hud.controlMode.addEventListener("change", () => {
  settings.controlMode = hud.controlMode.value;
  hud.mobileControls.classList.toggle("hidden", settings.controlMode !== "mobile");
  showMessage(settings.controlMode === "mobile" ? "Sterowanie telefonem wlaczone" : "Sterowanie klawiatura");
  saveConfig();
});
hud.matchSize.addEventListener("change", () => {
  settings.matchSize = Number(hud.matchSize.value);
  hud.botCount.value = String(settings.matchSize * 2);
});
hud.gameRules.addEventListener("change", () => {
  applyGameRulePreset(hud.gameRules.value, false);
  saveConfig();
});
hud.fillMode.addEventListener("change", () => { settings.fillMode = hud.fillMode.value; });
hud.showMinimap.addEventListener("change", () => { settings.showMinimap = hud.showMinimap.checked; });
hud.autoReload.addEventListener("change", () => { settings.autoReload = hud.autoReload.checked; });
hud.rerollMissions.addEventListener("click", () => {
  if (player.money < 300) return showMessage("Za malo kasy");
  player.money -= 300;
  generateRandomMissions();
  updateHud();
});

document.querySelectorAll("[data-touch-action]").forEach((button) => {
  const action = button.dataset.touchAction;
  const down = (event) => {
    event.preventDefault();
    if (action === "fire") {
      if (!beginGrenadeAim()) {
        mouse.down = true;
        mouse.clicked = true;
      }
    } else if (action === "aim") {
      if (canHoldAim()) mouse.rightDown = true;
      else toggleWeaponMode();
    } else if (action === "reload") {
      reload();
    } else if (action === "grenade") {
      selectNextGrenade();
    } else {
      if (action === "dash" && isPerspectiveMode() && state.grenadePrime) state.grenadePrime.jumpThrowQueued = true;
      touchActions.add(action);
    }
  };
  const up = (event) => {
    event.preventDefault();
    if (action === "fire") {
      mouse.down = false;
      releaseGrenadeAim();
    }
    if (action === "aim") mouse.rightDown = false;
    touchActions.delete(action);
  };
  button.addEventListener("pointerdown", down);
  button.addEventListener("pointerup", up);
  button.addEventListener("pointercancel", up);
  button.addEventListener("pointerleave", up);
});

try {
  window.potatoNative?.log?.("game:boot", "Starting game renderer boot");
  makeWeapons();
  loadConfig();
  if (installBundledDefaultMods()) saveConfig();
  loadNativeMods().catch((error) => window.potatoNative?.log?.("mods", "Native mod scan failed", error?.stack || error?.message || String(error)));
  loadUserMapsFromStorage();
  resize();
  renderMissions();
  renderShop();
  renderBinds();
  renderSavedMissions();
  renderAssetList();
  renderModManager();
  renderProfileMenu();
  applyLanguage();
  if (!loadStudioTestMap()) ensureNormalBootMenu();
  window.potatoNative?.log?.("game:boot", `Boot complete running=${state.running} menuHidden=${hud.menu.classList.contains("hidden")}`);
  requestAnimationFrame(tick);
} catch (error) {
  showBootError(error);
}

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
  round: $("round"),
  score: $("score"),
  timer: $("timer"),
  bomb: $("bomb-pill"),
  missionPill: $("mission-pill"),
  weaponName: $("weapon-name"),
  ammo: $("ammo"),
  message: $("message"),
  menu: $("menu"),
  start: $("start"),
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
  missionsPanel: $("missions-panel"),
  missionList: $("mission-list"),
  networkPanel: $("network-panel"),
  networkStatus: $("network-status"),
  modsPanel: $("mods-panel"),
  modManagerList: $("mod-manager-list"),
  rerollMissions: $("reroll-missions"),
  graphicsMode: $("graphics-mode"),
  quality: $("quality"),
  languageSelect: $("language-select"),
  difficulty: $("difficulty"),
  resolution: $("resolution"),
  hzLimit: $("hz-limit"),
  crosshairStyle: $("crosshair-style"),
  crosshairColor: $("crosshair-color"),
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
  { name: "Glock-18", side: "T", category: "Pistol", price: 200, magSize: 20, reserve: 120, damage: 19, fireDelay: 95, reloadTime: 1.15, spread: 0.065, recoil: 0.042, bulletSpeed: 1040, automatic: false, color: "#bfc7c1" },
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
  { name: "FAMAS", side: "CT", category: "Rifle", price: 2050, magSize: 25, reserve: 90, damage: 27, fireDelay: 82, reloadTime: 1.6, spread: 0.071, recoil: 0.058, bulletSpeed: 1180, automatic: true, color: "#8f9b78" },
  { name: "AK-47", side: "T", category: "Rifle", price: 2700, magSize: 30, reserve: 90, damage: 34, fireDelay: 102, reloadTime: 1.65, spread: 0.092, recoil: 0.078, bulletSpeed: 1220, automatic: true, color: "#c48a45" },
  { name: "M4A4", side: "CT", category: "Rifle", price: 3100, magSize: 30, reserve: 90, damage: 29, fireDelay: 92, reloadTime: 1.55, spread: 0.074, recoil: 0.061, bulletSpeed: 1260, automatic: true, color: "#8ea9b8" },
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
];

const grenadeCatalog = [
  { name: "HE Grenade", key: "he", side: "BOTH", price: 300, color: "#d56b4f" },
  { name: "Flashbang", key: "flash", side: "BOTH", price: 200, color: "#e7ddaa" },
  { name: "Smoke", key: "smoke", side: "BOTH", price: 300, color: "#b7b7ad" },
  { name: "Molotov", key: "fire", side: "T", price: 400, color: "#de8746" },
  { name: "Incendiary", key: "fire", side: "CT", price: 600, color: "#de8746" },
  { name: "Decoy", key: "decoy", side: "BOTH", price: 50, color: "#8ab2d4" },
];

const equipmentCatalog = [
  { name: "Kevlar Vest", side: "BOTH", price: 650, key: "armor", value: 100, color: "#9aa48e" },
  { name: "Kevlar + Helmet", side: "BOTH", price: 1000, key: "helmet", value: 100, color: "#b8c3d6" },
  { name: "Defuse Kit", side: "CT", price: 400, key: "defuseKit", value: true, color: "#d7bd62" },
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
  phase: "freeze",
  paused: false,
  winner: "",
  bomb: { status: "carried", carrier: "player", x: 0, y: 0, site: "", timer: 40, defuse: 0 },
  campaignIndex: 0,
  randomMissions: [],
  spectator: { active: false, index: 0, target: null, takeoverLatch: false },
  frameSkip: 0,
};

const settings = {
  graphicsMode: "2d",
  quality: "medium",
  difficulty: "normal",
  resolution: "auto",
  hzLimit: 60,
  crosshairStyle: "classic",
  crosshairColor: "#f2f0df",
  language: "pl",
  configId: "",
  nick: "Potato",
  playerId: "",
  sensitivity: 1,
  screenShake: 0.8,
  soundEnabled: true,
  masterVolume: 0.75,
  footstepVolume: 0.55,
  serverAudio: true,
  perfLimit: "balanced",
  botCount: 10,
  matchSize: 5,
  fillMode: "bots",
  controlMode: "keyboard",
  showMinimap: true,
  autoReload: true,
};

const simple3dTextures = {
  white: { base: "#ecece2", side: "#c7c9bd", seam: "rgba(35,35,31,0.24)", mark: "rgba(255,255,255,0.28)", mode: "panel" },
  concrete: { base: "#cfd1c7", side: "#aeb3aa", seam: "rgba(45,45,40,0.26)", mark: "rgba(255,255,255,0.18)", mode: "panel" },
  brick: { base: "#c7a889", side: "#9a7158", seam: "rgba(65,38,28,0.34)", mark: "rgba(255,245,220,0.16)", mode: "brick" },
  crate: { base: "#ad8150", side: "#765334", seam: "rgba(49,30,17,0.36)", mark: "rgba(255,230,176,0.18)", mode: "crate" },
  metal: { base: "#aeb9bd", side: "#78888d", seam: "rgba(22,35,38,0.32)", mark: "rgba(255,255,255,0.24)", mode: "metal" },
  glass: { base: "#acd3dc", side: "#6fabb8", seam: "rgba(33,67,74,0.28)", mark: "rgba(255,255,255,0.35)", mode: "glass" },
  terrain: { base: "#3b4a35", side: "#263126", seam: "rgba(242,240,223,0.12)", mark: "rgba(255,255,255,0.08)", mode: "terrain" },
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
  grenade: "KeyG",
  dash: "Space",
  pause: "KeyP",
  console: "Backquote",
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
  grenade: "Granat",
  dash: "Dash",
  pause: "Pauza",
  console: "Komendy lobby",
  spectatorNext: "Spectator nastepny",
  spectatorPrev: "Spectator poprzedni",
};

const i18n = {
  pl: {
    close: "Zamknij",
    play: "Graj",
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
    controlsHelp: "WASD ruch / mysz / E uzyj-podloz-rozbroj / R reload / B sklep / O ustawienia / M misje / I bindy / G granat / 1-9 bron / po dead strzalki lub klik zmieniaja teammate",
    languageLabel: "Jezyk / Language",
    graphicsLabel: "Tryb grafiki",
    qualityLabel: "Jakosc",
    botDifficultyLabel: "Poziom botow",
    resolutionLabel: "Rozdzielczosc",
    hzLabel: "Hz / FPS cap",
    crosshairLabel: "Celownik",
    crosshairColorLabel: "Kolor celownika",
    nickLabel: "Nick gracza",
    configIdLabel: "ID configu",
    playerIdLabel: "ID gracza",
    sensitivityLabel: "Czuleosc myszy",
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
    throwKey: "G - rzut",
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
    controlsHelp: "WASD movement / mouse / E use-plant-defuse-takeover / R reload / B shop / O settings / M missions / I binds / G grenade / 1-9 weapon / after death arrows or click change teammate",
    languageLabel: "Language / Jezyk",
    graphicsLabel: "Graphics mode",
    qualityLabel: "Quality",
    botDifficultyLabel: "Bot difficulty",
    resolutionLabel: "Resolution",
    hzLabel: "Hz / FPS cap",
    crosshairLabel: "Crosshair",
    crosshairColorLabel: "Crosshair color",
    nickLabel: "Player nick",
    configIdLabel: "Config ID",
    playerIdLabel: "Player ID",
    sensitivityLabel: "Mouse sensitivity",
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
    grenade: "Grenade",
    throwKey: "G - throw",
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
    dash: "Dash",
    pause: "Pause",
    console: "Lobby commands",
    spectatorNext: "Spectator next",
    spectatorPrev: "Spectator previous",
  },
};

function tr(key) {
  return (i18n[settings.language] && i18n[settings.language][key]) || i18n.pl[key] || key;
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
  mouse.y = isPerspectiveMode() ? window.innerHeight / 2 + camera.pitch * 0.28 : mouse.y;
}

const player = {
  x: 0,
  y: 0,
  r: 16,
  hp: 100,
  armor: 0,
  helmet: false,
  defuseKit: false,
  money: 800,
  speed: 250,
  dash: 0,
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
};

let weapons = [];
const bots = [];
const allies = [];
const bullets = [];
const grenades = [];
const effects = [];
const customTextures = [];
const loadedMods = [];
const keys = new Set();
const touchActions = new Set();
const mouse = { x: 0, y: 0, down: false, clicked: false };
const camera = { x: 0, y: 0, shake: 0, pitch: 0 };
let last = performance.now();
let waitingForBind = "";
const editor = { active: false, selectedMission: "", selectedObject: null };

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
  setLabel("crosshair-color", tr("crosshairColorLabel"));
  setLabel("config-nick", tr("nickLabel"));
  setLabel("config-id", tr("configIdLabel"));
  setLabel("config-player-id", tr("playerIdLabel"));
  setLabel("sensitivity", tr("sensitivityLabel"));
  setLabel("screen-shake", tr("shakeLabel"));
  setLabel("master-volume", tr("volumeLabel"));
  setLabel("footstep-volume", tr("footstepsLabel"));
  setLabel("perf-limit", tr("perfLabel"));
  setLabel("bot-count", tr("botCountLabel"));
  setLabel("control-mode", tr("controlsLabel"));
  setLabel("menu-mode", tr("modeLabel"));
  setLabel("launch-target", tr("versionLabel"));
  setLabel("match-size", tr("matchSizeLabel"));
  setLabel("fill-mode", tr("fillLabel"));
  setLabel("menu-team", tr("startSideLabel"));
  setLabel("menu-map", tr("mapLabel"));
  setLabel("menu-graphics", tr("menuGraphicsLabel"));
  if (settings.language === "en") {
    setOptionText("menu-mode", "offline", "Offline bots");
    setOptionText("menu-mode", "story", "Story mode");
    setOptionText("menu-mode", "lan", "LAN");
    setOptionText("menu-mode", "online", "Online HTML");
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
  } else {
    setOptionText("menu-mode", "offline", "BOTY offline");
    setOptionText("menu-mode", "story", "Tryb fabularny");
    setOptionText("menu-mode", "lan", "LAN");
    setOptionText("menu-mode", "online", "Online HTML");
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
  renderMissions();
  renderTeams();
  renderModManager();
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
  if (name.includes("AWP")) return { freq: 82, filter: 520, duration: 0.24, volume: 0.95, tail: 0.18 };
  if (name.includes("SSG") || weapon.category === "Sniper") return { freq: 105, filter: 620, duration: 0.2, volume: 0.78, tail: 0.14 };
  if (weapon.category === "Heavy" && weapon.pellets) return { freq: 78, filter: 480, duration: 0.22, volume: 0.85, tail: 0.12 };
  if (weapon.category === "Pistol") return { freq: 180, filter: 1450, duration: 0.095, volume: 0.45, tail: 0.05 };
  if (weapon.category === "SMG") return { freq: 150, filter: 1250, duration: 0.075, volume: 0.38, tail: 0.035 };
  const silenced = name.includes("M4A1-S") || name.includes("USP-S") || name.includes("MP5-SD");
  return { freq: silenced ? 135 : 120, filter: silenced ? 850 : 1050, duration: silenced ? 0.09 : 0.13, volume: silenced ? 0.42 : 0.62, tail: silenced ? 0.03 : 0.09 };
}

function playSound(kind, data = {}) {
  const x = data.x ?? player.x;
  const y = data.y ?? player.y;
  if (kind === "gun") {
    const p = weaponAudioProfile(data.weapon);
    const volume = p.volume * (data.hostile ? 0.68 : 1);
    burst({ type: "square", freq: p.freq, endFreq: 38, duration: p.duration, volume, x, y, filter: p.filter });
    burst({ type: "noise", duration: p.duration + p.tail, volume: volume * 0.7, x, y, filter: p.filter });
  } else if (kind === "dryfire") burst({ type: "square", freq: 420, endFreq: 260, duration: 0.04, volume: 0.18, x, y, filter: 1800 });
  else if (kind === "reload") { burst({ type: "triangle", freq: 320, endFreq: 180, duration: 0.08, volume: 0.28, x, y, filter: 1400 }); setTimeout(() => burst({ type: "triangle", freq: 210, endFreq: 330, duration: 0.09, volume: 0.22, x, y, filter: 1600 }), 180); }
  else if (kind === "reloadDone") burst({ type: "triangle", freq: 280, endFreq: 520, duration: 0.06, volume: 0.2, x, y, filter: 1800 });
  else if (kind === "step") { burst({ type: "noise", duration: 0.045, volume: data.walking ? 0.08 : 0.14, x, y, range: 760, filter: data.walking ? 280 : 360, channel: "steps" }); burst({ type: "sine", freq: data.walking ? 72 : 92, endFreq: 42, duration: 0.055, volume: data.walking ? 0.05 : 0.09, x, y, range: 720, channel: "steps" }); }
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
      playSound(event.kind, { x: event.x, y: event.y, weapon: event.weapon ? { name: event.weapon } : null, type: event.type });
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
  emitAudioEvent("step", { x: actor.x, y: actor.y, walking }, actor === player);
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
  return {
    version: 1,
    type: "potato-strike-player-profile",
    configId: settings.configId,
    nick: settings.nick,
    playerId: settings.playerId,
    settings,
    bindings,
    userMaps: userMaps(),
    storyMissions: savedStoryMissions(),
    customTextures,
    mods: loadedMods,
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
  hud.configNick.value = settings.nick;
  hud.configId.value = settings.configId;
  hud.configPlayerId.value = settings.playerId;
  hud.profileNick.value = settings.nick;
  hud.playerName.value = settings.nick;
  hud.languageSelect.value = settings.language;
  hud.resolution.value = settings.resolution;
  hud.hzLimit.value = String(settings.hzLimit);
  hud.crosshairStyle.value = settings.crosshairStyle;
  hud.crosshairColor.value = settings.crosshairColor;
  hud.soundEnabled.checked = settings.soundEnabled;
  hud.masterVolume.value = String(settings.masterVolume);
  hud.footstepVolume.value = String(settings.footstepVolume);
  hud.serverAudio.checked = settings.serverAudio;
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
    settings.graphicsMode = normalizeGraphicsMode(settings.graphicsMode);
    Object.assign(bindings, config.bindings || {});
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
  Object.assign(bindings, profile.bindings || {});
  settings.configId = profile.configId || settings.configId || `cfg-${Date.now().toString(36)}`;
  settings.nick = profile.nick || settings.nick || "Potato";
  if (preserveIncomingId) settings.playerId = profile.playerId || settings.playerId;
  ensurePlayerId();
  restoreUserContent(profile);
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
  if (!meta.defaultWeapon || meta.defaultWeapon === "side-default") return;
  const weapon = weapons.find((item) => item.name === meta.defaultWeapon);
  if (!weapon) return;
  weapon.owned = true;
  weapon.ammo = weapon.magSize;
  weapon.currentReserve = weapon.reserve;
  player.weaponId = weapon.id;
  showMessage(`Studio weapon: ${weapon.name}`);
}

function restoreUserContent(config) {
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
  loadedMods.splice(0, loadedMods.length, ...(config.mods || []));
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
    item.innerHTML = `<div class="mission-title"><span>${mission.name}</span><span class="tag">${mission.goal.type} ${mission.goal.target}</span></div><div>${mission.map.name} / ${mission.map.obstacles.length} obiektow</div>`;
    item.addEventListener("click", () => {
      editor.selectedMission = mission.id;
      showMessage(`Wybrano misje: ${mission.name}`);
    });
    hud.savedMissions.appendChild(item);
  }
}

function saveEditorMission() {
  const list = savedStoryMissions();
  const mission = {
    id: `mission-${Date.now().toString(36)}`,
    name: hud.editorName.value || "Moja misja",
    goal: { type: hud.editorGoal.value, target: Number(hud.editorTarget.value || 1) },
    map: JSON.parse(JSON.stringify(state.map)),
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

function runOwnerCommand() {
  if (!isLobbyCommander()) {
    logCommand("Brak uprawnien: tylko dowodca lobby");
    showMessage("Tylko dowodca lobby moze uzywac komend");
    return;
  }
  const parts = hud.commandInput.value.trim().split(/\s+/);
  const cmd = parts[0] || "";
  const arg = parts[1];
  if (!cmd) return;
  if (cmd === "bot_kick") {
    bots.length = 0;
    allies.length = 0;
    logCommand("Usunieto boty");
  } else if (cmd === "bot_add_t" || cmd === "bot_add_ct") {
    settings.matchSize += 1;
    spawnBots();
    logCommand(`Dodano boty przez ${cmd}`);
  } else if (cmd === "mp_restartgame") {
    newMatch();
    logCommand("Restart meczu");
  } else if (cmd === "mp_freezetime") {
    state.freezeTime = Number(arg || 0);
    logCommand(`Freeze time: ${state.freezeTime}`);
  } else if (cmd === "mp_roundtime" || cmd === "mp_roundtime_defuse") {
    state.roundTime = Number(arg || 115);
    logCommand(`Round time: ${state.roundTime}`);
  } else if (cmd === "mp_startmoney" || cmd === "give_money") {
    player.money = Number(arg || player.money);
    logCommand(`Money: ${player.money}`);
  } else if (cmd === "map_generate") {
    generateMapFromMenu();
    logCommand("Mapa wygenerowana");
  } else if (cmd === "pause") {
    setPaused(true);
    logCommand("Pauza");
  } else if (cmd === "resume") {
    setPaused(false);
    logCommand("Resume");
  } else {
    logCommand(`Nieznana komenda: ${cmd}`);
  }
  hud.commandInput.value = "";
}

function setPaused(value) {
  state.paused = value;
  hud.pausePanel.classList.toggle("hidden", !value);
  document.exitPointerLock?.();
}

function sideAllows(item, team = state.team) {
  return item.side === "BOTH" || item.side === team;
}

function activeWeapon() {
  return weapons[player.weaponId] || weapons[0];
}

function defaultWeaponId(team) {
  const name = team === "T" ? "Glock-18" : "USP-S";
  return weapons.find((weapon) => weapon.name === name)?.id || 0;
}

function difficultyScale() {
  if (settings.difficulty === "easy") return 0.75;
  if (settings.difficulty === "hard") return 1.3;
  return 1;
}

function pointInRect(x, y, o) {
  return x > o.x && x < o.x + o.w && y > o.y && y < o.y + o.h;
}

function pointInObstacle(x, y) {
  return state.map.obstacles.some((o) => pointInRect(x, y, o));
}

function rectCircleHit(rect, cx, cy, r) {
  const x = clamp(cx, rect.x, rect.x + rect.w);
  const y = clamp(cy, rect.y, rect.y + rect.h);
  return dist(cx, cy, x, y) < r;
}

function inSite(siteKey, x = player.x, y = player.y) {
  const site = state.map.sites[siteKey];
  return site && dist(x, y, site.x, site.y) <= site.r;
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
      rot: Number(obj.rot) || 0,
      color: obj.color || "",
      texture: obj.texture || obj.material || defaultTextureForType(obj.type),
      material: obj.material || obj.texture || defaultTextureForType(obj.type),
      textureColor: obj.textureColor || "",
    }))
    .filter((obj) => obj.w > 0 && obj.h > 0);
  map.name = source.name || fallback.name || "Custom Mission";
  return map;
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
  } else if (tool === "ctSpawn") {
    state.map.ctSpawn = { x: p.x, y: p.y };
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

function sortedMods() {
  return [...loadedMods].sort((a, b) => Number(a.priority ?? 100) - Number(b.priority ?? 100));
}

function renderModManager() {
  if (!hud.modManagerList) return;
  hud.modManagerList.innerHTML = "";
  const mods = sortedMods();
  if (!mods.length) {
    const empty = document.createElement("div");
    empty.className = "mission-item";
    empty.textContent = "Brak modow w profilu. Wgraj mod w edytorze lub przez import modpacka.";
    hud.modManagerList.appendChild(empty);
    return;
  }
  for (const mod of mods) {
    const item = document.createElement("div");
    item.className = "mission-item";
    item.innerHTML = `
      <div class="mission-title"><span>${mod.name || mod.id || "unnamed"}</span><span class="tag">${mod.enabled === false ? "OFF" : "ON"}</span></div>
      <div class="settings-grid">
        <label class="check"><input data-mod-enabled="${mod.id}" type="checkbox" ${mod.enabled === false ? "" : "checked"}> Wlaczony</label>
        <label>Priorytet <input data-mod-priority="${mod.id}" type="number" value="${mod.priority ?? 100}"></label>
      </div>
      <div class="menu-actions left"><button data-mod-remove="${mod.id}" class="secondary">Usun</button></div>
    `;
    hud.modManagerList.appendChild(item);
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
      if (index >= 0) loadedMods.splice(index, 1);
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
  loadedMods.push({ id: mod.id || `mod-${Date.now().toString(36)}`, enabled: mod.enabled !== false, priority: Number(mod.priority ?? 100), ...mod });
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
  const id = defaultWeaponId(state.team);
  weapons[id].owned = true;
  player.weaponId = id;
  state.bomb.status = state.team === "T" ? "carried" : "none";
  state.bomb.carrier = state.team === "T" ? "player" : "";
}

function resetRoundPositions() {
  const spawn = findSafePoint(state.team === "T" ? state.map.tSpawn : state.map.ctSpawn);
  player.x = spawn.x;
  player.y = spawn.y;
  player.hp = 100;
  player.armor = Math.min(player.armor, 100);
  player.alive = true;
  player.roundKills = 0;
  player.invuln = 0;
  bullets.length = 0;
  grenades.length = 0;
  effects.length = 0;
  leaveSpectator();
  state.roundTime = 115;
  state.freezeTime = 5;
  state.phase = "freeze";
  state.winner = "";
  state.bomb.timer = 40;
  state.bomb.defuse = 0;
  if (state.team === "T") {
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
  const count = Math.max(1, Number(settings.matchSize));
  const enemySpawn = findSafePoint(state.enemyTeam === "T" ? state.map.tSpawn : state.map.ctSpawn);
  for (let i = 0; i < count; i += 1) {
    const spawn = findSafePoint({ x: enemySpawn.x + (Math.random() - 0.5) * 180, y: enemySpawn.y + (Math.random() - 0.5) * 180 });
    bots.push({
      x: spawn.x,
      y: spawn.y,
      r: 15,
      hp: 78 + state.round * 2 * difficultyScale(),
      team: state.enemyTeam,
      angle: 0,
      speed: (92 + Math.random() * 22) * difficultyScale(),
      fire: 450 + Math.random() * 700,
      weapon: state.enemyTeam === "T" ? "AK-47" : "M4A4",
      name: `ENEMY ${i + 1}`,
      source: "BOT",
      flashed: 0,
    });
  }
  const allySpawn = findSafePoint(state.team === "T" ? state.map.tSpawn : state.map.ctSpawn);
  for (let i = 1; i < count; i += 1) {
    const spawn = findSafePoint({ x: allySpawn.x + (Math.random() - 0.5) * 170, y: allySpawn.y + (Math.random() - 0.5) * 170 });
    allies.push({
      x: spawn.x,
      y: spawn.y,
      r: 15,
      hp: 82,
      team: state.team,
      angle: 0,
      speed: 92 + Math.random() * 18,
      fire: 520 + Math.random() * 760,
      name: `BOT ${i}`,
      source: "BOT",
      flashed: 0,
    });
  }
  renderTeams();
}

function makeTeamBot(team, index = 1, source = "BOT") {
  const spawn = findSafePoint(team === "T" ? state.map.tSpawn : state.map.ctSpawn);
  return {
    x: spawn.x + (Math.random() - 0.5) * 170,
    y: spawn.y + (Math.random() - 0.5) * 170,
    r: 15,
    hp: source === "LAN" ? 100 : 82,
    team,
    angle: 0,
    speed: source === "LAN" ? 0 : 92 + Math.random() * 18,
    fire: 520 + Math.random() * 760,
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

function newMatch() {
  state.gameMode = hud.menuMode.value;
  ensurePlayerId();
  state.lobbyOwnerId = settings.playerId;
  if (hud.launchTarget.value === "exe") showMessage("EXE: uzyj Pobierz lokalnie albo npm run build:win");
  settings.matchSize = Number(hud.matchSize.value);
  settings.fillMode = hud.fillMode.value;
  settings.botCount = settings.matchSize * 2;
  state.team = hud.menuTeam.value === "random" ? (Math.random() < 0.5 ? "T" : "CT") : hud.menuTeam.value;
  state.enemyTeam = enemyOf(state.team);
  state.mapKey = hud.menuMap.value;
  if (state.gameMode === "story" && !maps.story) {
    const first = savedStoryMissions()[0];
    if (first) {
      maps.story = JSON.parse(JSON.stringify(first.map));
      state.mapKey = "story";
    } else {
      showMessage("Brak zapisanej misji, uzywam Custom Mission");
      state.mapKey = "custom";
    }
  }
  state.map = normalizeMap(maps[state.mapKey] || maps.custom);
  state.round = 1;
  state.half = 1;
  state.score = { T: 0, CT: 0 };
  camera.pitch = 0;
  setGraphicsMode(hud.menuGraphics.value);
  player.money = 800;
  player.armor = 0;
  player.helmet = false;
  player.defuseKit = false;
  player.kills = 0;
  player.hits = 0;
  player.plants = 0;
  player.defuses = 0;
  makeWeapons();
  resetLoadout();
  resetRoundPositions();
  spawnBots();
  renderShop();
  renderMissions();
  showMessage(`${state.gameMode.toUpperCase()} / ${teamName(state.team)} / ${state.map.name} / dowodca ${settings.nick}`);
}

function swapSidesIfNeeded() {
  if (state.round === 17) {
    state.team = enemyOf(state.team);
    state.enemyTeam = enemyOf(state.team);
    state.half = 2;
    player.money = 800;
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
  if (reason.includes("bomba wybuchla")) emitAudioEvent("bombExplode", { x: state.bomb.x, y: state.bomb.y });
  else emitAudioEvent(winner === state.team ? "buy" : "death", { x: player.x, y: player.y });
  showMessage(`${winner} wygrywa: ${reason}`);
  setTimeout(() => {
    state.round += 1;
    if (state.round > 32) {
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
  if (state.team !== "T" || state.bomb.status !== "carried") return;
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
  player.plants += 1;
  advanceMission("plants", 1);
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
    endRound("CT", "bomba rozbrojona");
  }
}

function useKey(dt) {
  if (!actionDown("use")) {
    state.bomb.defuse = 0;
    return;
  }
  if (state.team === "T") plantBomb();
  if (state.team === "CT") defuseBomb(dt);
}

function updateRoundRules(dt) {
  if (state.phase === "freeze") {
    state.freezeTime -= dt;
    if (state.freezeTime <= 0) state.phase = "live";
    return;
  }
  if (state.phase !== "live") return;
  state.roundTime -= dt;
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
  if (state.phase !== "freeze") {
    showMessage("Kupowanie tylko na freeze time");
    return;
  }
  if (type === "weapon") {
    const weapon = weapons[id];
    if (!weapon || !sideAllows(weapon)) return;
    if (!weapon.owned) {
      if (player.money < weapon.price) return showMessage("Za malo kasy");
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
    if (count >= 2) return showMessage("Limit granatow");
    if (player.money < grenade.price) return showMessage("Za malo kasy");
    player.money -= grenade.price;
    player.grenades[grenade.name] = count + 1;
    emitAudioEvent("buy", { x: player.x, y: player.y });
    showMessage(`Kupiono: ${grenade.name}`);
  }
  if (type === "equipment") {
    const item = equipmentCatalog[id];
    if (!item || !sideAllows(item)) return;
    if (player.money < item.price) return showMessage("Za malo kasy");
    player.money -= item.price;
    if (item.key === "armor") player.armor = Math.max(player.armor, item.value);
    if (item.key === "helmet") {
      player.armor = Math.max(player.armor, item.value);
      player.helmet = true;
    }
    if (item.key === "defuseKit") player.defuseKit = true;
    emitAudioEvent("buy", { x: player.x, y: player.y });
    showMessage(`Kupiono: ${item.name}`);
  }
  renderShop();
  updateHud();
}

function throwGrenade() {
  const entry = Object.entries(player.grenades).find(([, count]) => count > 0);
  if (!entry) return showMessage("Brak granatow");
  const [name] = entry;
  const catalog = grenadeCatalog.find((g) => g.name === name);
  player.grenades[name] -= 1;
  grenades.push({
    x: player.x,
    y: player.y,
    vx: Math.cos(player.angle) * 520,
    vy: Math.sin(player.angle) * 520,
    timer: catalog.key === "flash" ? 0.7 : 1.2,
    type: catalog.key,
    color: catalog.color,
  });
  emitAudioEvent("grenadeThrow", { x: player.x, y: player.y, type: catalog.key });
  renderShop();
}

function explodeGrenade(grenade) {
  emitAudioEvent("grenadeExplode", { x: grenade.x, y: grenade.y, type: grenade.type });
  effects.push({ x: grenade.x, y: grenade.y, r: grenade.type === "smoke" ? 130 : 86, life: grenade.type === "smoke" ? 7 : 0.45, type: grenade.type, color: grenade.color });
  if (grenade.type === "he" || grenade.type === "fire") {
    for (const bot of bots) {
      if (bot.hp > 0 && dist(grenade.x, grenade.y, bot.x, bot.y) < 120) {
        bot.hp -= grenade.type === "he" ? 60 : 35;
      }
    }
  }
  if (grenade.type === "flash") {
    for (const bot of bots) {
      if (bot.hp > 0 && dist(grenade.x, grenade.y, bot.x, bot.y) < 260 && hasLineOfSight(grenade.x, grenade.y, bot.x, bot.y)) bot.flashed = 2.4;
    }
  }
}

function shoot(owner, angle, weapon, hostile = false) {
  if (!hostile && owner === player) {
    if (state.phase !== "live" || state.overlayOpen) return;
    if (weapon.reloading > 0 || weapon.cooldown > 0) return;
    if (weapon.ammo <= 0) {
      emitAudioEvent("dryfire", { x: owner.x, y: owner.y }, false);
      if (settings.autoReload) reload();
      return;
    }
    weapon.ammo -= 1;
    weapon.cooldown = weapon.fireDelay / 1000;
    camera.shake = Math.min(10, camera.shake + weapon.recoil * 90 * settings.screenShake);
  }
  emitAudioEvent("gun", { x: owner.x, y: owner.y, weapon, hostile }, !hostile && owner === player);
  const pelletCount = weapon.pellets || 1;
  for (let i = 0; i < pelletCount; i += 1) {
    const spread = hostile ? 0.11 * difficultyScale() : weapon.spread + weapon.recoil * Math.min(1.5, owner.speedFactor || 0);
    const a = angle + (Math.random() - 0.5) * spread;
    bullets.push({
      x: owner.x + Math.cos(a) * (owner.r + 18),
      y: owner.y + Math.sin(a) * (owner.r + 18),
      vx: Math.cos(a) * (hostile ? 760 * difficultyScale() : weapon.bulletSpeed),
      vy: Math.sin(a) * (hostile ? 760 * difficultyScale() : weapon.bulletSpeed),
      damage: hostile ? 10 * difficultyScale() : weapon.damage,
      hostile,
      life: 0.95,
      color: hostile ? "#f06d58" : "#f5df88",
    });
  }
}

function reload() {
  const weapon = activeWeapon();
  if (weapon.reloading > 0 || weapon.ammo === weapon.magSize || weapon.currentReserve <= 0) return;
  weapon.reloading = weapon.reloadTime;
  emitAudioEvent("reload", { x: player.x, y: player.y, weapon });
  showMessage(`Przeladowanie: ${weapon.name}`);
}

function updatePlayer(dt) {
  if (!player.alive || state.overlayOpen || state.phase === "ended") return;
  useKey(dt);
  const forward = (actionDown("forward") ? 1 : 0) - (actionDown("back") ? 1 : 0);
  const strafe = (actionDown("right") ? 1 : 0) - (actionDown("left") ? 1 : 0);
  const len = Math.hypot(forward, strafe) || 1;
  const walking = keys.has("ShiftLeft") || keys.has("ShiftRight") || state.phase === "freeze";
  let speed = player.speed * (walking ? 0.58 : 1);
  if (actionDown("dash") && player.dash <= 0 && state.phase === "live" && (forward || strafe)) player.dash = 0.18;
  if (player.dash > 0) {
    speed *= 2.2;
    player.dash -= dt;
  }
  player.speedFactor = Math.hypot(forward, strafe) * (walking ? 0.25 : 1);
  if (isPerspectiveMode()) {
    const vx = Math.cos(player.angle) * forward * speed + Math.cos(player.angle + Math.PI / 2) * strafe * speed;
    const vy = Math.sin(player.angle) * forward * speed + Math.sin(player.angle + Math.PI / 2) * strafe * speed;
    moveEntity(player, vx / len, vy / len, dt);
  } else {
    moveEntity(player, (strafe / len) * speed, (-forward / len) * speed, dt);
    player.angle = angleTo(player.x, player.y, mouse.x + camera.x, mouse.y + camera.y);
  }
  maybeStep(player, Boolean(forward || strafe), walking);
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
  if (mouse.down && (weapon.automatic || mouse.clicked)) shoot(player, player.angle, weapon);
  mouse.clicked = false;
  player.invuln = Math.max(0, player.invuln - dt);
}

function updateBots(dt) {
  if (state.phase !== "live") return;
  for (const bot of bots) {
    if (bot.hp <= 0) continue;
    bot.flashed = Math.max(0, bot.flashed - dt);
    const a = angleTo(bot.x, bot.y, player.x, player.y);
    bot.angle = a;
    const d = dist(bot.x, bot.y, player.x, player.y);
    const los = hasLineOfSight(bot.x, bot.y, player.x, player.y);
    const targetSite = state.enemyTeam === "T" ? state.map.sites[state.bomb.site || (Math.random() < 0.5 ? "A" : "B")] : null;
    if (bot.flashed <= 0 && (!los || d > 260)) {
      const tx = targetSite ? targetSite.x : player.x;
      const ty = targetSite ? targetSite.y : player.y;
      const moveA = angleTo(bot.x, bot.y, tx, ty) + Math.sin(performance.now() / 420 + bot.x) * 0.45;
      moveEntity(bot, Math.cos(moveA) * bot.speed, Math.sin(moveA) * bot.speed, dt);
      maybeStep(bot, true, false);
    }
    bot.fire -= dt * 1000;
    if (bot.fire <= 0 && los && d < 740 && player.alive && bot.flashed <= 0) {
      shoot(bot, a, { damage: 10, spread: 0.1, recoil: 0, bulletSpeed: 780, pellets: 1 }, true);
      bot.fire = 520 / difficultyScale() + Math.random() * 440;
    }
    if (d < bot.r + player.r) damagePlayer(16 * dt * difficultyScale());
  }
}

function updateAllies(dt) {
  if (state.phase !== "live") return;
  const aliveEnemies = bots.filter((bot) => bot.hp > 0);
  for (const ally of allies) {
    if (ally.hp <= 0) continue;
    const target = aliveEnemies.sort((a, b) => dist(ally.x, ally.y, a.x, a.y) - dist(ally.x, ally.y, b.x, b.y))[0];
    if (!target) continue;
    const a = angleTo(ally.x, ally.y, target.x, target.y);
    ally.angle = a;
    const d = dist(ally.x, ally.y, target.x, target.y);
    const los = hasLineOfSight(ally.x, ally.y, target.x, target.y);
    if (!los || d > 360) {
      moveEntity(ally, Math.cos(a) * ally.speed, Math.sin(a) * ally.speed, dt);
      maybeStep(ally, true, false);
    }
    ally.fire -= dt * 1000;
    if (ally.fire <= 0 && los && d < 680) {
      shoot(ally, a, { damage: 11, spread: 0.12, recoil: 0, bulletSpeed: 760, pellets: 1, automatic: true }, false);
      ally.fire = 620 + Math.random() * 460;
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
  const target = currentSpectatorTarget();
  if (!target) {
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
  allies.splice(index, 1);
  leaveSpectator();
  renderTeams();
  showMessage(`Przejales ${bot.name}. Grasz dalej.`);
}

function updateSpectator() {
  if (player.alive || !state.spectator.active || state.overlayOpen || state.phase === "ended") return;
  const target = currentSpectatorTarget();
  if (!target) {
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
  if (player.invuln > 0 || !player.alive) return;
  const armorBlock = Math.min(player.armor, amount * 0.5);
  player.armor -= armorBlock;
  player.hp -= amount - armorBlock;
  player.invuln = 0.12;
  emitAudioEvent("hit", { x: player.x, y: player.y }, false);
  if (player.hp <= 0) {
    player.hp = 0;
    player.alive = false;
    emitAudioEvent("death", { x: player.x, y: player.y });
    enterSpectator();
  }
}

function updateBullets(dt) {
  for (let i = bullets.length - 1; i >= 0; i -= 1) {
    const b = bullets[i];
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.life -= dt;
    let remove = b.life <= 0 || b.x < 0 || b.y < 0 || b.x > state.map.w || b.y > state.map.h || pointInObstacle(b.x, b.y);
  if (!remove && b.hostile && dist(b.x, b.y, player.x, player.y) < player.r) {
      damagePlayer(b.damage);
      remove = true;
    }
    if (!remove && b.hostile) {
      for (const ally of allies) {
        if (ally.hp > 0 && dist(b.x, b.y, ally.x, ally.y) < ally.r) {
          ally.hp -= b.damage;
          emitAudioEvent(ally.hp <= 0 ? "death" : "hit", { x: ally.x, y: ally.y }, false);
          remove = true;
          break;
        }
      }
    }
    if (!remove && !b.hostile) {
      for (const bot of bots) {
        if (bot.hp > 0 && dist(b.x, b.y, bot.x, bot.y) < bot.r) {
          bot.hp -= b.damage;
          player.hits += 1;
          advanceMission("hits", 1);
          if (bot.hp <= 0) {
            player.kills += 1;
            player.roundKills += 1;
            player.money += 300;
            advanceMission("kills", 1);
            advanceMission("category", 1, activeWeapon().category);
            emitAudioEvent("death", { x: bot.x, y: bot.y }, false);
          } else {
            emitAudioEvent("hit", { x: bot.x, y: bot.y }, false);
          }
          remove = true;
          break;
        }
      }
    }
    if (remove) {
      if (settings.quality !== "low") effects.push({ x: b.x, y: b.y, r: 10, life: 0.18, type: "hit", color: b.color });
      bullets.splice(i, 1);
    }
  }
}

function updateGrenades(dt) {
  for (let i = grenades.length - 1; i >= 0; i -= 1) {
    const g = grenades[i];
    g.x += g.vx * dt;
    g.y += g.vy * dt;
    g.vx *= 0.965;
    g.vy *= 0.965;
    if (pointInObstacle(g.x, g.y)) {
      g.vx *= -0.35;
      g.vy *= -0.35;
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
        if (bot.hp > 0 && dist(effects[i].x, effects[i].y, bot.x, bot.y) < effects[i].r) bot.hp -= 16 * dt;
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
  const localSlots = [{ name: tr("you"), team: state.team, hp: player.hp, source: "player" }, ...allies.map((bot) => ({ name: bot.name, team: state.team, hp: bot.hp, source: settings.fillMode === "lan" ? "LAN/BOT" : "BOT" }))];
  const enemySlots = bots.map((bot, index) => ({ name: bot.name || `ENEMY ${index + 1}`, team: state.enemyTeam, hp: bot.hp, source: bot.source || (settings.fillMode === "lan" ? "LAN/BOT" : "BOT") }));
  for (const slot of [...localSlots, ...enemySlots]) {
    const item = document.createElement("div");
    item.className = "team-item";
    item.innerHTML = `<span>${slot.name} / ${slot.team}</span><span class="tag">${slot.source} ${Math.max(0, Math.ceil(slot.hp))}HP</span>`;
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
  const sectionOrder = ["Pistol", "SMG", "Rifle", "Sniper", "Heavy"];
  for (const category of sectionOrder) {
    const section = document.createElement("div");
    section.className = "shop-section";
    section.innerHTML = `<div class="shop-section-title">${category}</div>`;
    for (const weapon of weapons.filter((item) => item.category === category && sideAllows(item))) {
      const item = document.createElement("div");
      item.className = `shop-item${weapon.owned ? " owned" : ""}`;
      item.innerHTML = `<div class="shop-title"><span>${weapon.name}</span><span class="tag">${weapon.owned ? tr("owned") : `$${weapon.price}`}</span></div><div class="muted">${weapon.side} / ${weapon.category}</div><div class="shop-stats"><span>DMG ${weapon.damage}</span><span>MAG ${weapon.magSize}</span><span>ROF ${Math.round(1000 / weapon.fireDelay * 60)}</span><span>SPREAD ${Math.round(weapon.spread * 100)}</span></div>`;
      const button = document.createElement("button");
      button.textContent = weapon.owned ? tr("equip") : tr("buy");
      button.disabled = !weapon.owned && player.money < weapon.price;
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
    button.disabled = player.money < grenade.price;
    button.addEventListener("click", () => buyItem("grenade", id));
    item.appendChild(button);
    utility.appendChild(item);
  }
  for (const gear of equipmentCatalog.filter((item) => sideAllows(item))) {
    const id = equipmentCatalog.indexOf(gear);
    const owned = (gear.key === "armor" && player.armor >= 100) || (gear.key === "helmet" && player.helmet) || (gear.key === "defuseKit" && player.defuseKit);
    const item = document.createElement("div");
    item.className = `shop-item${owned ? " owned" : ""}`;
    item.innerHTML = `<div class="shop-title"><span>${gear.name}</span><span class="tag">${owned ? tr("owned") : `$${gear.price}`}</span></div><div class="muted">${gear.side} / Equipment</div><div class="shop-stats"><span>${gear.key === "defuseKit" ? "DEFUSE 2.5s" : "ARMOR 100"}</span><span>${gear.key === "helmet" ? "HELMET" : "GEAR"}</span></div>`;
    const button = document.createElement("button");
    button.textContent = owned ? tr("owned") : tr("buy");
    button.disabled = owned || player.money < gear.price;
    button.addEventListener("click", () => buyItem("equipment", id));
    item.appendChild(button);
    utility.appendChild(item);
  }
  hud.shopList.appendChild(utility);
}

function drawMap2d() {
  ctx.fillStyle = "#20291f";
  ctx.fillRect(-camera.x, -camera.y, state.map.w, state.map.h);
  if (settings.quality !== "low") {
    ctx.strokeStyle = "#2e3a2d";
    for (let x = 0; x < state.map.w; x += 80) {
      ctx.beginPath(); ctx.moveTo(x - camera.x, -camera.y); ctx.lineTo(x - camera.x, state.map.h - camera.y); ctx.stroke();
    }
    for (let y = 0; y < state.map.h; y += 80) {
      ctx.beginPath(); ctx.moveTo(-camera.x, y - camera.y); ctx.lineTo(state.map.w - camera.x, y - camera.y); ctx.stroke();
    }
  }
  for (const [key, site] of Object.entries(state.map.sites)) {
    ctx.fillStyle = key === "A" ? "rgba(215,189,98,0.18)" : "rgba(119,181,111,0.18)";
    ctx.beginPath(); ctx.arc(site.x - camera.x, site.y - camera.y, site.r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#f2f0df"; ctx.font = "22px Arial"; ctx.textAlign = "center"; ctx.fillText(key, site.x - camera.x, site.y - camera.y + 8);
  }
  ctx.strokeStyle = "#848b72"; ctx.lineWidth = 3;
  for (const o of state.map.obstacles) {
    ctx.fillStyle = wallBaseColor(o);
    ctx.fillRect(o.x - camera.x, o.y - camera.y, o.w, o.h);
    if (settings.quality !== "low") {
      ctx.strokeStyle = "rgba(255,255,255,0.13)";
      const step = o.type === "crate" ? 18 : 28;
      for (let tx = o.x; tx < o.x + o.w; tx += step) {
        ctx.beginPath();
        ctx.moveTo(tx - camera.x, o.y - camera.y);
        ctx.lineTo(tx - camera.x, o.y + o.h - camera.y);
        ctx.stroke();
      }
      if (o.type === "light") {
        ctx.fillStyle = "rgba(255,238,143,0.24)";
        ctx.beginPath();
        ctx.arc(o.x + o.w / 2 - camera.x, o.y + o.h / 2 - camera.y, Math.max(o.w, o.h), 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.strokeRect(o.x - camera.x, o.y - camera.y, o.w, o.h);
    if (o.type) {
      ctx.fillStyle = "#f2f0df";
      ctx.font = "10px Arial";
      ctx.fillText(o.type, o.x - camera.x + o.w / 2, o.y - camera.y + o.h / 2);
    }
  }
  ctx.strokeStyle = "#786544"; ctx.lineWidth = 12; ctx.strokeRect(-camera.x, -camera.y, state.map.w, state.map.h);
}

function drawActor(actor, color, label) {
  const x = actor.x - camera.x;
  const y = actor.y - camera.y;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(actor.angle || 0);
  ctx.fillStyle = color;
  ctx.beginPath(); ctx.arc(0, 0, actor.r, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#1a1d18"; ctx.fillRect(4, -5, actor.r + 16, 10);
  ctx.fillStyle = "#ede2b7"; ctx.fillRect(actor.r + 12, -2, 14, 4);
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
  for (const e of effects) {
    ctx.globalAlpha = clamp(e.life / 1.5, 0.18, 0.75);
    ctx.fillStyle = e.type === "smoke" ? "#a8aaa1" : e.color;
    ctx.beginPath(); ctx.arc(e.x - camera.x, e.y - camera.y, e.r, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
  }
  if (state.bomb.status === "planted" || state.bomb.status === "hidden") {
    ctx.fillStyle = "#d75f4f"; ctx.fillRect(state.bomb.x - camera.x - 8, state.bomb.y - camera.y - 8, 16, 16);
  }
}

function drawMinimap() {
  if (!settings.showMinimap) return;
  const w = 170, h = 112, x = window.innerWidth - w - 16, y = 16;
  ctx.fillStyle = "rgba(12,14,12,.72)"; ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = "rgba(242,240,223,.18)"; ctx.strokeRect(x, y, w, h);
  const sx = w / state.map.w, sy = h / state.map.h;
  ctx.fillStyle = "#7a8169";
  for (const o of state.map.obstacles) ctx.fillRect(x + o.x * sx, y + o.y * sy, o.w * sx, o.h * sy);
  ctx.fillStyle = "#d7bd62";
  for (const site of Object.values(state.map.sites)) ctx.fillRect(x + site.x * sx - 3, y + site.y * sy - 3, 6, 6);
  ctx.fillStyle = "#77b56f"; ctx.fillRect(x + player.x * sx - 2, y + player.y * sy - 2, 4, 4);
  ctx.fillStyle = "#d95f4e";
  for (const bot of bots) if (bot.hp > 0) ctx.fillRect(x + bot.x * sx - 2, y + bot.y * sy - 2, 4, 4);
}

function drawCrosshair() {
  const weapon = activeWeapon();
  const cx = isPerspectiveMode() ? window.innerWidth / 2 : mouse.x;
  const cy = isPerspectiveMode() ? window.innerHeight / 2 + camera.pitch * 0.28 : mouse.y;
  const gap = 10 + weapon.spread * 120 + player.speedFactor * 10 + camera.shake;
  ctx.strokeStyle = settings.crosshairColor;
  ctx.fillStyle = settings.crosshairColor;
  ctx.lineWidth = 2;
  if (settings.crosshairStyle === "dot") {
    ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
    return;
  }
  const length = settings.crosshairStyle === "wide" ? 13 : 7;
  ctx.beginPath();
  ctx.moveTo(cx - gap - length, cy); ctx.lineTo(cx - gap, cy);
  ctx.moveTo(cx + gap, cy); ctx.lineTo(cx + gap + length, cy);
  ctx.moveTo(cx, cy - gap - length); ctx.lineTo(cx, cy - gap);
  ctx.moveTo(cx, cy + gap); ctx.lineTo(cx, cy + gap + length);
  ctx.stroke();
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
  drawMinimap();
  drawCrosshair();
}

function castRay(angle) {
  let x = player.x, y = player.y, d = 0;
  const step = settings.quality === "low" ? 24 : 14;
  while (d < 1200) {
    x += Math.cos(angle) * step; y += Math.sin(angle) * step; d += step;
    if (x < 0 || y < 0 || x > state.map.w || y > state.map.h || pointInObstacle(x, y)) return d;
  }
  return 1200;
}

function castRayHit(angle) {
  let x = player.x, y = player.y, d = 0;
  const step = settings.quality === "low" ? 24 : 14;
  while (d < 1200) {
    x += Math.cos(angle) * step;
    y += Math.sin(angle) * step;
    d += step;
    if (x < 0 || y < 0 || x > state.map.w || y > state.map.h) return { d, hit: null, edge: true };
    const hit = state.map.obstacles.find((obj) => x >= obj.x && y >= obj.y && x <= obj.x + obj.w && y <= obj.y + obj.h);
    if (hit) return { d, hit, edge: false, x, y, side: wallHitSide(hit, x, y) };
  }
  return { d: 1200, hit: null, edge: false };
}

function wallHitSide(hit, x, y) {
  const left = Math.abs(x - hit.x);
  const right = Math.abs(hit.x + hit.w - x);
  const top = Math.abs(y - hit.y);
  const bottom = Math.abs(hit.y + hit.h - y);
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
  return "white";
}

function textureForHit(hit) {
  if (!hit) return simple3dTextures.white;
  const key = hit.texture || hit.material || defaultTextureForType(hit.type);
  return simple3dTextures[key] || simple3dTextures.white;
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

function drawPotatoWallColumn(x, y, colW, wallH, hit, shade, distance, column, side = "", texCoord = 0) {
  const texture = textureForHit(hit);
  const baseColor = hit?.color && hit.texture === "custom-color" ? hit.color : wallBaseColor(hit);
  const sideShade = side === "north" || side === "south" ? -18 : 0;
  const base = shadeHex(baseColor, shade - 150 + sideShade);
  ctx.fillStyle = base;
  const drawX = Math.floor(x);
  const drawW = Math.ceil(colW) + 1;
  ctx.fillRect(drawX, y, drawW, wallH);
  const stripe = texture.mode === "crate" ? 96 : texture.mode === "brick" ? 72 : texture.mode === "metal" ? 112 : 128;
  if (settings.quality === "high" && Math.floor(texCoord) % stripe < Math.max(5, stripe * 0.08)) {
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
  if (settings.quality === "high" && (column % 24 === 0 || side === "edge")) {
    ctx.strokeStyle = `rgba(0,0,0,${clamp(0.12 + distance / 6200, 0.1, 0.26)})`;
    ctx.lineWidth = 1;
    ctx.strokeRect(drawX + 0.5, y + 0.5, drawW, wallH);
  }
  ctx.fillStyle = `rgba(255,255,255,${clamp(0.11 - distance / 7600, 0.02, 0.09)})`;
  ctx.fillRect(drawX, y, drawW, Math.max(1, wallH * 0.025));
  ctx.fillStyle = `rgba(0,0,0,${clamp(0.2 + distance / 5200, 0.18, 0.46)})`;
  ctx.fillRect(drawX, y + wallH - Math.max(2, wallH * 0.04), drawW, Math.max(2, wallH * 0.04));
  ctx.fillStyle = `rgba(255,255,255,${clamp(0.16 - distance / 8500, 0.025, 0.12)})`;
  ctx.fillRect(drawX, y, Math.max(1, drawW * 0.22), wallH);
  ctx.fillStyle = `rgba(0,0,0,${clamp(distance / 2200, 0.04, 0.4)})`;
  ctx.fillRect(drawX, y + wallH * 0.72, drawW, Math.max(1, wallH * 0.12));
}

function render3d() {
  camera.shake *= 0.88;
  const w = window.innerWidth, h = window.innerHeight;
  ctx.imageSmoothingEnabled = true;
  const horizon = clamp(h * 0.52 + camera.pitch * 0.3, h * 0.26, h * 0.74);
  const sky = ctx.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, "#536a72");
  sky.addColorStop(0.72, "#314247");
  sky.addColorStop(1, "#202a2d");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, horizon);
  draw3dTerrain(w, h, horizon);
  const fov = Math.PI / 2.9;
  const cols = settings.quality === "low" ? 160 : settings.quality === "high" ? 520 : 360;
  const colW = w / cols;
  const depth = [];
  for (let i = 0; i < cols; i += 1) {
    const ray = player.angle - fov / 2 + (i / cols) * fov;
    const hitInfo = castRayHit(ray);
    const d = hitInfo.d * Math.cos(ray - player.angle);
    depth[i] = d;
    const wallH = clamp((h * 760) / d, 12, h * 1.85);
    const shade = clamp(252 - d * 0.095, 84, 232);
    const x = i * colW;
    const y = horizon - wallH / 2 + camera.shake;
    const texCoord = hitInfo.hit ? (hitInfo.side === "north" || hitInfo.side === "south" ? hitInfo.x - hitInfo.hit.x : hitInfo.y - hitInfo.hit.y) : i;
    drawPotatoWallColumn(x, y, colW, wallH, hitInfo.hit, shade, d, i, hitInfo.side, texCoord);
    if (settings.quality === "high" && i % 8 === 0) {
      ctx.fillStyle = `rgba(255,255,255,${clamp(0.14 - d / 8200, 0.025, 0.1)})`;
      ctx.fillRect(x, y + wallH * 0.18, colW + 1, Math.max(1, wallH * 0.06));
    }
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
    const size = clamp((h * 94) / s.d, 14, 180);
    draw3dCharacter(sx, horizon, size, s.color);
  }
  draw3dProjectilesAndObjectives(w, h, fov, depth, colW, horizon);
  draw3dSiteMarkers(w, h, fov, depth, colW, horizon);
  draw3dWeapon(w, h);
  drawFpsStatusStrip(w, h);
  drawMinimap();
  drawCrosshair();
}

function draw3dTerrain(w, h, horizon = h / 2) {
  const floor = ctx.createLinearGradient(0, horizon, 0, h);
  floor.addColorStop(0, "#59664f");
  floor.addColorStop(0.5, simple3dTextures.terrain.base);
  floor.addColorStop(1, "#1b231b");
  ctx.fillStyle = floor;
  ctx.fillRect(0, horizon, w, h - horizon);
  draw3dFloorPerspectiveGrid(w, h, horizon);
}

function draw3dFloorPerspectiveGrid(w, h, horizon = h / 2) {
  if (settings.quality === "low") return;
  ctx.save();
  ctx.lineWidth = 1;
  const floorHeight = h - horizon;
  for (let i = 1; i <= 12; i += 1) {
    const y = horizon + Math.pow(i / 12, 1.72) * floorHeight;
    ctx.strokeStyle = `rgba(242,240,223,${0.16 - i * 0.008})`;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(242,240,223,0.11)";
  const yawOffset = Math.sin(player.angle) * w * 0.08;
  for (let i = -6; i <= 6; i += 1) {
    const foot = w / 2 + yawOffset + i * w * 0.11;
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
    y: horizon + clamp((window.innerHeight * (190 + verticalOffset)) / Math.max(1, d), -160, 160),
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
    const p = projectWorldToFps(g.x, g.y, fov, depth, colW, horizon, -12, 55);
    if (!p) continue;
    const size = clamp((h * 14) / Math.max(1, p.d), 5, 18);
    ctx.fillStyle = g.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(17,18,12,0.55)";
    ctx.stroke();
  }
  if (state.bomb.status === "planted" || state.bomb.status === "hidden") {
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

function draw3dCharacter(x, y, size, color) {
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.38)";
  ctx.beginPath();
  ctx.ellipse(x, y + size * 0.62, size * 0.34, size * 0.09, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(242,240,223,0.3)";
  ctx.lineWidth = Math.max(1, size * 0.02);
  ctx.fillStyle = color;
  ctx.fillRect(x - size * 0.22, y - size * 0.45, size * 0.44, size * 0.62);
  ctx.strokeRect(x - size * 0.22, y - size * 0.45, size * 0.44, size * 0.62);
  ctx.fillStyle = "rgba(255,255,255,0.16)";
  ctx.fillRect(x - size * 0.18, y - size * 0.39, size * 0.36, size * 0.05);
  ctx.fillStyle = "#d8c19a";
  ctx.fillRect(x - size * 0.16, y - size * 0.72, size * 0.32, size * 0.25);
  ctx.fillStyle = "#1a1d18";
  ctx.fillRect(x + size * 0.08, y - size * 0.25, size * 0.55, size * 0.08);
  ctx.fillStyle = "#f2f0df";
  ctx.fillRect(x - size * 0.08, y - size * 0.64, size * 0.05, size * 0.04);
  ctx.fillRect(x + size * 0.04, y - size * 0.64, size * 0.05, size * 0.04);
  ctx.fillStyle = "#2b2d28";
  ctx.fillRect(x - size * 0.2, y + size * 0.18, size * 0.16, size * 0.42);
  ctx.fillRect(x + size * 0.04, y + size * 0.18, size * 0.16, size * 0.42);
  ctx.restore();
}

function weaponViewModel(weapon) {
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
  const weapon = activeWeapon();
  const model = weaponViewModel(weapon);
  const scale = clamp(w / 1280, 0.78, 1.15);
  const sway = Math.sin(performance.now() / 140) * player.speedFactor * 10;
  const recoilDrop = camera.shake * 1.8;
  const x = w / 2 + (weapon.category === "Pistol" ? 84 : 44) * scale + sway;
  const y = h - (weapon.category === "Pistol" ? 132 : 150) * scale + recoilDrop;
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
  const spectated = state.spectator.active ? currentSpectatorTarget() : null;
  const living = state.spectator.active ? livingTeamBots() : [];
  hud.mode.textContent = state.gameMode.toUpperCase();
  hud.team.textContent = spectated ? `SPECTATE ${spectated.name} ${living.length ? state.spectator.index + 1 : 0}/${living.length}${spectated.source === "LAN" ? "" : " / E TAKEOVER"}` : `TEAM ${state.team}${isLobbyCommander() ? " / CMD" : ""}`;
  hud.health.textContent = spectated ? `OBS HP ${Math.ceil(spectated.hp)}` : `HP ${Math.ceil(player.hp)}`;
  hud.armor.textContent = `${tr("armor")} ${Math.ceil(player.armor)}${player.helmet ? " +H" : ""}${player.defuseKit ? " KIT" : ""}`;
  hud.money.textContent = `$${player.money}`;
  hud.round.textContent = `R ${state.round}/32`;
  hud.score.textContent = `T ${state.score.T} : ${state.score.CT} CT`;
  const time = state.phase === "freeze" ? state.freezeTime : state.roundTime;
  hud.timer.textContent = `${Math.floor(time / 60)}:${String(Math.max(0, Math.ceil(time % 60))).padStart(2, "0")}`;
  hud.bomb.textContent = state.bomb.status === "planted" ? `${tr("bomb")} ${state.bomb.site} ${Math.ceil(state.bomb.timer)}s` : state.bomb.status === "carried" ? `${tr("bomb")} ${tr("you")}` : `${tr("bomb")} --`;
  hud.weaponName.textContent = weapon.name;
  hud.ammo.textContent = weapon.reloading > 0 ? "reloading..." : `${weapon.ammo} / ${weapon.currentReserve}`;
}

function tick(now) {
  const target = settings.hzLimit ? 1000 / settings.hzLimit : settings.perfLimit === "eco" ? 1000 / 30 : settings.perfLimit === "balanced" ? 1000 / 60 : 0;
  if (target && now - last < target) {
    requestAnimationFrame(tick);
    return;
  }
  const dt = Math.min(0.033, (now - last) / 1000 || 0);
  last = now;
  if (state.running && !state.paused) {
    updateRoundRules(dt);
    updatePlayer(dt);
    updateAllies(dt);
    updateBots(dt);
    updateBullets(dt);
    updateGrenades(dt);
    updateSpectator();
    pollServerAudioEvents();
    try {
      renderGameView();
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
  }
}

function closePanels() {
  state.overlayOpen = false;
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
  hud.modsPanel.classList.add("hidden");
}

function equipHotkey(n) {
  const owned = weapons.filter((weapon) => weapon.owned && sideAllows(weapon));
  const weapon = owned[n - 1];
  if (weapon) {
    player.weaponId = weapon.id;
    showMessage(weapon.name);
  }
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
  if (waitingForBind) {
    event.preventDefault();
    bindings[waitingForBind] = event.code;
    showMessage(`Bind ustawiony: ${actionLabels[waitingForBind]} = ${codeName(event.code)}`);
    waitingForBind = "";
    renderBinds();
    return;
  }
  if ([bindings.forward, bindings.left, bindings.back, bindings.right, bindings.dash, bindings.spectatorNext, bindings.spectatorPrev].includes(event.code)) event.preventDefault();
  keys.add(event.code);
  if (event.code === "Escape") closePanels();
  if (event.code === bindings.shop) togglePanel(hud.shopPanel);
  if (event.code === bindings.settings) togglePanel(hud.settingsPanel);
  if (event.code === bindings.missions) togglePanel(hud.missionsPanel);
  if (event.code === bindings.binds) togglePanel(hud.bindsPanel);
  if (event.code === bindings.teams) togglePanel(hud.teamsPanel);
  if (event.code === bindings.network) togglePanel(hud.networkPanel);
  if (event.code === bindings.console) openOwnerConsole();
  if (event.code === bindings.pause) setPaused(!state.paused);
  if (state.overlayOpen) return;
  if (state.spectator.active && !player.alive) {
    if (event.code === bindings.spectatorNext) cycleSpectatorTarget(1);
    if (event.code === bindings.spectatorPrev) cycleSpectatorTarget(-1);
    return;
  }
  if (event.code === bindings.reload) reload();
  if (event.code === bindings.grenade) { throwGrenade(); advanceMission("grenade", 1); }
  if (event.code.startsWith("Digit")) equipHotkey(Number(event.code.slice(5)));
});
window.addEventListener("keyup", (event) => keys.delete(event.code));
canvas.addEventListener("mousemove", (event) => {
  if (document.pointerLockElement === canvas) {
    if (isPerspectiveMode()) {
      player.angle += event.movementX * 0.0032 * settings.sensitivity;
      camera.pitch = clamp(camera.pitch + event.movementY * 0.72 * settings.sensitivity, -window.innerHeight * 0.32, window.innerHeight * 0.32);
      mouse.x = window.innerWidth / 2;
      mouse.y = window.innerHeight / 2 + camera.pitch * 0.28;
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
canvas.addEventListener("mousedown", async (event) => {
  if (editMapAt(event)) return;
  if (state.overlayOpen) return;
  if (state.spectator.active && !player.alive) {
    cycleSpectatorTarget(event.button === 2 ? -1 : 1);
    event.preventDefault();
    return;
  }
  ensureAudio();
  mouse.down = true;
  mouse.clicked = true;
  try { await canvas.requestPointerLock(); } catch { /* optional */ }
});
canvas.addEventListener("contextmenu", (event) => {
  if (state.spectator.active && !player.alive) event.preventDefault();
});
window.addEventListener("mouseup", () => { mouse.down = false; });

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

hud.quickEditor.addEventListener("click", openStandaloneEditor);
hud.openEditor.addEventListener("click", openStandaloneEditor);
hud.openConsole.addEventListener("click", openOwnerConsole);
hud.openNetwork.addEventListener("click", () => togglePanel(hud.networkPanel));
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
  settings.difficulty = hud.teamDifficulty.value;
  hud.difficulty.value = settings.difficulty;
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
    ensureAudio();
    closePanels();
    state.running = true;
    mouse.x = window.innerWidth / 2;
    mouse.y = window.innerHeight / 2 + camera.pitch * 0.28;
    newMatch();
    renderGameView();
    hud.menu.classList.add("hidden");
    if (state.gameMode !== "offline") {
      hud.networkStatus.textContent = `${state.gameMode.toUpperCase()} jest przygotowany w menu. Aktualny build gra lokalnie z botami, dopoki nie zostanie podpiety serwer.`;
      showMessage(`${state.gameMode.toUpperCase()}: fallback do botow`);
    }
    try { await canvas.requestPointerLock(); } catch { /* optional */ }
  } catch (error) {
    showFatalError(error, "startu gry");
  }
});

hud.graphicsMode.addEventListener("change", () => { setGraphicsMode(hud.graphicsMode.value); saveConfig(); });
hud.menuGraphics.addEventListener("change", () => { setGraphicsMode(hud.menuGraphics.value); saveConfig(); });
hud.quality.addEventListener("change", () => { settings.quality = hud.quality.value; });
hud.languageSelect.addEventListener("change", () => {
  settings.language = hud.languageSelect.value;
  applyLanguage();
  showMessage(tr("languageChanged"));
  saveConfig();
});
hud.difficulty.addEventListener("change", () => { settings.difficulty = hud.difficulty.value; });
hud.resolution.addEventListener("change", () => { settings.resolution = hud.resolution.value; resize(); saveConfig(); });
hud.hzLimit.addEventListener("change", () => { settings.hzLimit = Number(hud.hzLimit.value); saveConfig(); });
hud.crosshairStyle.addEventListener("change", () => { settings.crosshairStyle = hud.crosshairStyle.value; saveConfig(); });
hud.crosshairColor.addEventListener("input", () => { settings.crosshairColor = hud.crosshairColor.value; saveConfig(); });
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
hud.sensitivity.addEventListener("input", () => { settings.sensitivity = Number(hud.sensitivity.value); });
hud.screenShake.addEventListener("input", () => { settings.screenShake = Number(hud.screenShake.value); });
hud.soundEnabled.addEventListener("change", () => { settings.soundEnabled = hud.soundEnabled.checked; if (settings.soundEnabled) ensureAudio(); saveConfig(); });
hud.masterVolume.addEventListener("input", () => { settings.masterVolume = Number(hud.masterVolume.value); saveConfig(); });
hud.footstepVolume.addEventListener("input", () => { settings.footstepVolume = Number(hud.footstepVolume.value); saveConfig(); });
hud.serverAudio.addEventListener("change", () => { settings.serverAudio = hud.serverAudio.checked; saveConfig(); });
hud.perfLimit.addEventListener("change", () => { settings.perfLimit = hud.perfLimit.value; });
hud.botCount.addEventListener("input", () => { settings.botCount = Number(hud.botCount.value); });
hud.controlMode.addEventListener("change", () => {
  settings.controlMode = hud.controlMode.value;
  hud.mobileControls.classList.toggle("hidden", settings.controlMode !== "mobile");
  showMessage(settings.controlMode === "mobile" ? "Sterowanie telefonem wlaczone" : "Sterowanie klawiatura");
});
hud.matchSize.addEventListener("change", () => {
  settings.matchSize = Number(hud.matchSize.value);
  hud.botCount.value = String(settings.matchSize * 2);
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
      mouse.down = true;
      mouse.clicked = true;
    } else if (action === "reload") {
      reload();
    } else if (action === "grenade") {
      throwGrenade();
      advanceMission("grenade", 1);
    } else {
      touchActions.add(action);
    }
  };
  const up = (event) => {
    event.preventDefault();
    if (action === "fire") mouse.down = false;
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

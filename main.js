const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");

const windows = {
  game: null,
  editor: null,
};

function configDir() {
  const dir = path.join(__dirname, "configs");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function playersDir() {
  const dir = path.join(configDir(), "players");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function modsDir() {
  const dir = path.join(__dirname, "mods");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function safeConfigName(name) {
  return String(name || "potato-strike-config")
    .replace(/[^a-z0-9_.-]/gi, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function createWindow(options = {}) {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    backgroundColor: "#141816",
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  windows.game = win;
  win.on("closed", () => {
    if (windows.game === win) windows.game = null;
  });
  win.loadFile(path.join(__dirname, "index.html"), options.query ? { query: options.query } : undefined);
  return win;
}

function createEditorWindow() {
  if (windows.editor && !windows.editor.isDestroyed()) {
    windows.editor.focus();
    return windows.editor;
  }
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 980,
    minHeight: 650,
    backgroundColor: "#111511",
    autoHideMenuBar: true,
    title: "Potato Strike Studio",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  windows.editor = win;
  win.on("closed", () => {
    if (windows.editor === win) windows.editor = null;
  });
  win.loadFile(path.join(__dirname, "editor.html"));
  return win;
}

function openGameTest() {
  const win = createWindow({ query: { studioTest: "1" } });
  win.focus();
  return { ok: true };
}

app.whenReady().then(() => {
  const modeArg = process.argv.find((arg) => arg === "--editor" || arg === "--studio");
  if (modeArg) createEditorWindow();
  else createWindow();
});

ipcMain.handle("window:openEditor", () => {
  createEditorWindow();
  return { ok: true };
});

ipcMain.handle("window:testMap", () => openGameTest());

ipcMain.handle("config:save", (_event, payload) => {
  const profile = payload?.config || {};
  const playerId = safeConfigName(profile.playerId || payload?.name || "local-player");
  const playerDir = path.join(playersDir(), playerId);
  fs.mkdirSync(playerDir, { recursive: true });
  const profilePath = path.join(playerDir, "profile.json");
  fs.writeFileSync(profilePath, JSON.stringify(profile, null, 2));
  fs.writeFileSync(path.join(playerDir, "maps.json"), JSON.stringify(profile.userMaps || [], null, 2));
  fs.writeFileSync(path.join(playerDir, "missions.json"), JSON.stringify(profile.storyMissions || [], null, 2));
  fs.writeFileSync(path.join(playerDir, "assets.json"), JSON.stringify({ textures: profile.customTextures || [], mods: profile.mods || [] }, null, 2));
  return { ok: true, path: profilePath, playerDir };
});

ipcMain.handle("config:load", (_event, fileName) => {
  const safe = safeConfigName(fileName);
  const file = safe.endsWith(".json")
    ? path.join(configDir(), safe)
    : path.join(playersDir(), safe, "profile.json");
  return JSON.parse(fs.readFileSync(file, "utf8"));
});

ipcMain.handle("config:list", () => {
  return fs.readdirSync(playersDir(), { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(playersDir(), entry.name, "profile.json")))
    .map((entry) => entry.name);
});

ipcMain.handle("mod:save", (_event, payload) => {
  const file = `${safeConfigName(payload?.name || "mod")}.json`;
  const target = path.join(modsDir(), file);
  fs.writeFileSync(target, JSON.stringify(payload?.mod || {}, null, 2));
  return { ok: true, path: target };
});

ipcMain.handle("mod:list", () => {
  return fs.readdirSync(modsDir()).filter((file) => file.endsWith(".json") || file.endsWith(".js"));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

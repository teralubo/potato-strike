const { app, BrowserWindow, ipcMain, crashReporter } = require("electron");
const fs = require("fs");
const path = require("path");
const { startPotatoServer } = require("./server");

const windows = {
  game: null,
  editor: null,
  recovery: null,
};

function logsDir() {
  const dir = path.join(__dirname, "logs");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function logFilePath() {
  return path.join(logsDir(), "potato-strike.log");
}

function writeLog(scope, message, details = "") {
  const stamp = new Date().toISOString();
  const text = typeof message === "string" ? message : JSON.stringify(message);
  const extra = details ? ` ${typeof details === "string" ? details : JSON.stringify(details)}` : "";
  const line = `[${stamp}] [${scope}] ${text}${extra}\n`;
  try {
    fs.appendFileSync(logFilePath(), line);
  } catch (error) {
    console.error("Could not write Potato Strike log", error);
  }
  console.log(line.trimEnd());
}

writeLog("main", `Potato Strike boot pid=${process.pid} platform=${process.platform} electron=${process.versions.electron} node=${process.versions.node}`);

const crashDir = path.join(logsDir(), "crashes");
fs.mkdirSync(crashDir, { recursive: true });
crashReporter.start({
  uploadToServer: false,
  compress: false,
  crashesDirectory: crashDir,
});
writeLog("main", `Crash reporter active ${crashDir}`);

const useHardwareRender = process.env.POTATO_HARDWARE_RENDER === "1";
if (!useHardwareRender) {
  app.disableHardwareAcceleration();
  writeLog("main", "Hardware acceleration disabled for stable offline potato rendering. Set POTATO_HARDWARE_RENDER=1 to test GPU mode.");
} else if (process.env.POTATO_SOFTWARE_RENDER === "1") {
  app.disableHardwareAcceleration();
  writeLog("main", "Software rendering requested by POTATO_SOFTWARE_RENDER=1");
}

if (!useHardwareRender) {
  app.commandLine.appendSwitch("disable-gpu");
  app.commandLine.appendSwitch("disable-gpu-compositing");
}
app.commandLine.appendSwitch("disable-renderer-backgrounding");
app.commandLine.appendSwitch("disable-background-timer-throttling");
if (process.platform === "linux") {
  app.commandLine.appendSwitch("enable-wayland-ime");
}

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

function listModManifests() {
  const root = modsDir();
  const manifests = [];
  const visit = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const target = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        visit(target);
        continue;
      }
      if (!entry.isFile() || entry.name.toLowerCase() !== "mod.json") continue;
      try {
        const relative = path.relative(root, target);
        const segments = relative.split(path.sep);
        const mod = JSON.parse(fs.readFileSync(target, "utf8"));
        manifests.push({
          ...mod,
          category: segments.length > 2 ? segments[0] : mod.category || "custom",
          sourcePath: relative.replace(/\\/g, "/"),
        });
      } catch (error) {
        writeLog("mods", `Cannot load ${target}`, error?.stack || error?.message || String(error));
      }
    }
  };
  visit(root);
  return manifests;
}

function safeConfigName(name) {
  return String(name || "potato-strike-config")
    .replace(/[^a-z0-9_.-]/gi, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function createWindow(options = {}) {
  const safeMode = options.safeMode || process.env.POTATO_SAFE_OFFLINE === "1" || process.argv.includes("--safe") || process.argv.includes("--safe-offline");
  writeLog("main", `Creating game window ${JSON.stringify(options.query || {})} safeMode=${safeMode}`);
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    backgroundColor: "#141816",
    autoHideMenuBar: true,
    webPreferences: {
      backgroundThrottling: false,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: safeMode,
      ...(safeMode ? {} : { preload: path.join(__dirname, "preload.js") }),
    },
  });

  windows.game = win;
  attachWindowDiagnostics(win, "game", { safeMode });
  win.on("closed", () => {
    if (windows.game === win) windows.game = null;
    writeLog("main", "Game window closed");
  });
  const file = safeMode ? path.join(__dirname, "PotatoStrike.html") : path.join(__dirname, "game", "index.html");
  writeLog("main", `Loading game file ${file}`);
  win.loadFile(file, options.query ? { query: options.query } : undefined);
  return win;
}

function createEditorWindow() {
  if (windows.editor && !windows.editor.isDestroyed()) {
    windows.editor.focus();
    writeLog("main", "Focused existing editor window");
    return windows.editor;
  }
  writeLog("main", "Creating editor window");
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 980,
    minHeight: 650,
    backgroundColor: "#111511",
    autoHideMenuBar: true,
    title: "Potato Strike Studio",
    webPreferences: {
      backgroundThrottling: false,
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  windows.editor = win;
  attachWindowDiagnostics(win, "editor");
  win.on("closed", () => {
    if (windows.editor === win) windows.editor = null;
    writeLog("main", "Editor window closed");
  });
  const file = path.join(__dirname, "game", "editor.html");
  writeLog("main", `Loading editor file ${file}`);
  win.loadFile(file);
  return win;
}

function attachWindowDiagnostics(win, name, options = {}) {
  win.webContents.on("did-finish-load", () => {
    writeLog(name, `did-finish-load ${win.webContents.getURL()}`);
  });
  win.webContents.on("dom-ready", () => {
    writeLog(name, "dom-ready");
  });
  win.webContents.on("console-message", (_event, level, message, line, sourceId) => {
    writeLog(`${name}:console:${level}`, message, `${sourceId}:${line}`);
  });
  win.webContents.on("did-fail-load", (_event, code, description, url) => {
    writeLog(`${name}:load`, `${code} ${description}`, url);
  });
  win.webContents.on("render-process-gone", (_event, details) => {
    writeLog(`${name}:gone`, details);
    writeCrashSnapshot(name, details);
    if (name === "game" && !options.safeMode) {
      writeLog("main", "Normal game renderer crashed; retrying safe offline single-file mode");
      try {
        if (!win.isDestroyed()) win.destroy();
      } catch {
        // The renderer is already gone; this is only cleanup.
      }
      createWindow({ safeMode: true });
      return;
    }
    showCrashRecoveryWindow(name, details);
  });
  win.webContents.on("preload-error", (_event, preloadPath, error) => {
    writeLog(`${name}:preload`, preloadPath, error?.stack || error?.message || String(error));
  });
}

function writeCrashSnapshot(name, details) {
  const file = path.join(logsDir(), `${name}-renderer-crash.json`);
  const payload = {
    at: new Date().toISOString(),
    window: name,
    details,
    platform: process.platform,
    versions: process.versions,
    argv: process.argv,
    hardwareRender: process.env.POTATO_HARDWARE_RENDER === "1",
    softwareRender: process.env.POTATO_SOFTWARE_RENDER === "1",
  };
  try {
    fs.writeFileSync(file, JSON.stringify(payload, null, 2));
    writeLog("main", `Crash snapshot saved ${file}`);
  } catch (error) {
    writeLog("main", "Could not save crash snapshot", error?.stack || error?.message || String(error));
  }
}

function showCrashRecoveryWindow(name, details) {
  if (windows.recovery && !windows.recovery.isDestroyed()) return;
  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Potato Strike crash log</title>
  <style>
    body { margin: 0; background: #141816; color: #f2f0df; font-family: Arial, sans-serif; display: grid; place-content: center; min-height: 100vh; }
    main { width: min(720px, calc(100vw - 32px)); border: 1px solid #56614d; background: #1c211d; padding: 22px; border-radius: 8px; }
    code { display: block; white-space: pre-wrap; color: #d7bd62; }
  </style>
</head>
<body>
  <main>
    <h1>Potato Strike offline crash</h1>
    <p>Renderer offline zamknal sie przed zaladowaniem menu. Logi sa zapisane tutaj:</p>
    <code>${escapeHtml(logFilePath())}</code>
    <p>Wklej zawartosc <strong>logs/potato-strike.log</strong> oraz <strong>logs/${name}-renderer-crash.json</strong>.</p>
    <code>${escapeHtml(JSON.stringify(details, null, 2))}</code>
  </main>
</body>
</html>`;
  const recovery = new BrowserWindow({
    width: 860,
    height: 560,
    backgroundColor: "#141816",
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });
  windows.recovery = recovery;
  recovery.on("closed", () => {
    if (windows.recovery === recovery) windows.recovery = null;
  });
  recovery.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function openGameTest() {
  const win = createWindow({ query: { studioTest: "1" } });
  win.focus();
  return { ok: true };
}

app.whenReady().then(() => {
  writeLog("main", `App ready argv=${JSON.stringify(process.argv)}`);
  startPotatoServer(8787, {
    onListening: (port) => writeLog("lan", `Embedded LAN server ready on http://localhost:${port}`),
    onInUse: (port) => writeLog("lan", `Port ${port} already in use; using the existing LAN server`),
    onError: (error) => writeLog("lan", "Embedded LAN server failed", error?.stack || error?.message || String(error)),
  });
  const modeArg = process.argv.find((arg) => arg === "--editor" || arg === "--studio");
  if (modeArg) createEditorWindow();
  else createWindow();
});

ipcMain.handle("window:openEditor", () => {
  createEditorWindow();
  return { ok: true };
});

ipcMain.handle("window:testMap", () => openGameTest());

ipcMain.on("log:renderer", (_event, payload) => {
  writeLog(payload?.scope || "renderer", payload?.message || "", payload?.details || "");
});

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
  const mod = payload?.mod || {};
  const category = safeConfigName(mod.category || "custom");
  const modId = safeConfigName(mod.id || payload?.name || "mod");
  const targetDir = path.join(modsDir(), category, modId);
  fs.mkdirSync(targetDir, { recursive: true });
  const target = path.join(targetDir, "mod.json");
  fs.writeFileSync(target, JSON.stringify(payload?.mod || {}, null, 2));
  return { ok: true, path: target };
});

ipcMain.handle("mod:list", () => {
  return listModManifests();
});

app.on("window-all-closed", () => {
  writeLog("main", "window-all-closed");
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  writeLog("main", "activate");
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

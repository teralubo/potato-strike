const { contextBridge, ipcRenderer } = require("electron");

function sendRendererLog(scope, message, details = "") {
  try {
    ipcRenderer.send("log:renderer", { scope, message, details });
  } catch {
    // Logging must never break the game boot.
  }
}

window.addEventListener("DOMContentLoaded", () => {
  sendRendererLog("renderer", `DOMContentLoaded ${window.location.href}`);
});

window.addEventListener("error", (event) => {
  sendRendererLog("renderer:error", event.message, `${event.filename}:${event.lineno}:${event.colno}\n${event.error?.stack || ""}`);
});

window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason;
  sendRendererLog("renderer:rejection", reason?.message || String(reason), reason?.stack || "");
});

contextBridge.exposeInMainWorld("potatoNative", {
  log: (scope, message, details) => sendRendererLog(scope, message, details),
  saveConfig: (name, config) => ipcRenderer.invoke("config:save", { name, config }),
  loadConfig: (fileName) => ipcRenderer.invoke("config:load", fileName),
  listConfigs: () => ipcRenderer.invoke("config:list"),
  saveMod: (name, mod) => ipcRenderer.invoke("mod:save", { name, mod }),
  listMods: () => ipcRenderer.invoke("mod:list"),
  openEditor: () => ipcRenderer.invoke("window:openEditor"),
  testMap: () => ipcRenderer.invoke("window:testMap"),
});

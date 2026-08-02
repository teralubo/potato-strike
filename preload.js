const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("potatoNative", {
  saveConfig: (name, config) => ipcRenderer.invoke("config:save", { name, config }),
  loadConfig: (fileName) => ipcRenderer.invoke("config:load", fileName),
  listConfigs: () => ipcRenderer.invoke("config:list"),
  saveMod: (name, mod) => ipcRenderer.invoke("mod:save", { name, mod }),
  listMods: () => ipcRenderer.invoke("mod:list"),
  openEditor: () => ipcRenderer.invoke("window:openEditor"),
  testMap: () => ipcRenderer.invoke("window:testMap"),
});

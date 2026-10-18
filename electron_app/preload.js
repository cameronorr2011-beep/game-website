const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  prepare: () => ipcRenderer.invoke("prepare"),
  pair: (addr, code) => ipcRenderer.invoke("adb-pair", addr, code),
  connect: (dev) => ipcRenderer.invoke("adb-connect", dev),
  launch: () => ipcRenderer.invoke("launch"),
  stop: () => ipcRenderer.invoke("stop"),
  onProgress: (fn) => ipcRenderer.on("progress", (_e, p) => fn(p)),
  openExternal: (u) => ipcRenderer.invoke("open-external", u),
});

"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  storeGet: (key) => electron.ipcRenderer.invoke("store-get", key),
  storeSet: (key, value) => electron.ipcRenderer.invoke("store-set", key, value),
  getWarfaceStats: (nickname) => electron.ipcRenderer.invoke("warface-get-stats", nickname)
});
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on: (...args) => electron.ipcRenderer.on(...args),
  off: (...args) => electron.ipcRenderer.off(...args),
  send: (...args) => electron.ipcRenderer.send(...args),
  invoke: (...args) => electron.ipcRenderer.invoke(...args)
});

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    'api', {
        translate: (key) => ipcRenderer.invoke('translate', key),
        on: (channel, func) => ipcRenderer.on(channel, func)
    }
);

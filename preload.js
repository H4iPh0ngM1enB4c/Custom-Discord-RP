const { contextBridge, ipcRenderer } = require('electron');

// Expose các hàm để renderer process có thể giao tiếp với main process
contextBridge.exposeInMainWorld('electronAPI', {
    updatePresence: (presenceData) => ipcRenderer.send('update-presence', presenceData)
});
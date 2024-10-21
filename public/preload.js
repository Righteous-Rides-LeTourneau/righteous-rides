const { contextBridge, ipcRenderer } = require("electron");

// API Definition
const electronAPI = {
    greet: (message) => ipcRenderer.send('api:greet', message),
    getPrivateData: () => ipcRenderer.invoke('api:get-private-data'),
};
  
  // Register the API with the contextBridge
contextBridge.exposeInMainWorld('api', electronAPI);
console.log('preload.js loaded');
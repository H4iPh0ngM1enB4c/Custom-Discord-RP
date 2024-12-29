const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { Client } = require('discord-rpc');

let rpc;
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on('set-activity', (event, data) => {
    const { clientId, activity } = data;
    if (!rpc || rpc.clientId !== clientId) {
        rpc = new Client({ transport: 'ipc' });
        rpc.login({ clientId }).catch(console.error);
    }

    // Đảm bảo rằng RPC đã sẵn sàng trước khi đặt hoạt động
    rpc.once('ready', () => {
        rpc.setActivity(activity).catch(console.error);
    });
    rpc.on('disconnected', () => {
        console.log('RPC disconnected, attempting to reconnect...');
        rpc.login({ clientId }).catch(console.error);
    });
});
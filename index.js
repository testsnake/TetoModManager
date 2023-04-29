

// Built in modules
const fs = require('fs');
const path = require('path');

// Electron modules
const {app, BrowserWindow, ipcMain, shell} = require('electron');

// External modules
const Store = require('electron-store'); // Storing user data
const i18n = require('./src/i18n'); // i18n - Internationalization

const store = new Store({name: 'TMM-User-Data'});


// Global variables
let win;
let devMode = true;


app.on('window-all-closed', function () {
    app.quit();
});

const createWindow = () => {

    win = new BrowserWindow({
        width: 1200,
        height: 800,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: '#FFFFFF',
            height: 20
        },
        backgroundColor: '#191825',
        minWidth: 900,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, 'src/preload.js')
        }

    });
    if (devMode) {
        win.webContents.openDevTools();
    }
    win.loadFile('src/index.html')
        .then(() => {
            console.log('Loaded index.html');
            win.webContents.send('i18n-ready');  // Send custom event
        });
    win.on('closed', () => {
        win = null;
    });
    startupProcess();

}

const setupWindow = () => {
    sWin = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: '#FFFFFF',
            height: 20
        },
        backgroundColor: '#191825',
        minWidth: 900,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    if (devMode) {
        sWin.webContents.openDevTools();
    }
    sWin.loadFile('src/setup.html').then(r => console.log('Loaded settings.html'));
}

async function startupProcess() {

}


app.whenReady().then(() => {
    i18n.init().then(() => createWindow());

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

ipcMain.handle('translate', async (event, arg) => {
    const result = i18n.t(arg);
    return result;
});

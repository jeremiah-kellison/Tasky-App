const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, 
    }
  });

  const startUrl = isDev
    ? `file://${path.join(__dirname, '/html/home.html')}`
    : `file://${path.join(app.getAppPath(), '/html/home.html')}`;
    console.log('startUrl:', startUrl); 

  win.loadURL(startUrl);
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

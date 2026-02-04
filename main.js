// main.js electron entry point to create the application window

import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import keytar from "keytar";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SERVICE_NAME = 'CRM';
const ACCOUNT_NAME = 'auth-token';

// Check if running in development mode
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

// create the window
function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.cjs'),
      webSecurity: true
    }
  });

  // Load app based on environment
  if (isDev) {
    win.loadURL('http://localhost:5173'); // Development: React dev server
    win.webContents.openDevTools(); // Open DevTools in development
  } else {
    win.loadFile(path.join(__dirname, "dist/index.html")) // Production: built React app
  }
}

// IPC Handlers for secure token storage
ipcMain.handle('store-token', async (event, token) => {
  try {
    await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, token);
    return { success: true };
  } catch (error) {
    console.error('Error storing token:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-token', async () => {
  try {
    const token = await keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME);
    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
});

ipcMain.handle('delete-token', async () => {
  try {
    await keytar.deletePassword(SERVICE_NAME, ACCOUNT_NAME);
    return { success: true };
  } catch (error) {
    console.error('Error deleting token:', error);
    return { success: false, error: error.message };
  }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// electron only accepts .js files as entry points, so we use main.js to start the app
// also make sure to change package.json "main" field to "main.js" and add -> "electron": "electron .", to scripts
// after these build the React app using "npm run build", then start electron using "npm run electron"

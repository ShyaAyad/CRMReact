// main.js electron entry point to create the application window

import { app, BrowserWindow } from "electron"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url) // get current file path
const __dirname = path.dirname(__filename) // get current directory path

// create window for the app 
function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800
  })

  win.loadFile(path.join(__dirname, "dist/index.html")) // load the React app to the window (already built)
}

app.whenReady().then(createWindow)

// electron only accepts .js files as entry points, so we use main.js to start the app
// also make sure to change package.json "main" field to "main.js" and add -> "electron": "electron .", to scripts
// after these build the React app using "npm run build", then start electron using "npm run electron"
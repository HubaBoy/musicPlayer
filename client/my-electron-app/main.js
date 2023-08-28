// main.js
const { app, BrowserWindow, globalShortcut, Menu } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // This allows you to use Node.js modules in your renderer process.
      autoHideMenuBar: true,
    },
  });

  // Load your React app (assuming it's built into a build folder)
  win.loadURL('http://localhost:5173');
  win.setMenuBarVisibility(false)
}


app.whenReady().then(createWindow);

// Quit the app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
  globalShortcut.register('Control+Shift+I', ()=> {
        return false;
  })
});

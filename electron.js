const { app, BrowserWindow, ipcMain } = require("electron");
const { OAuth2Provider } = require("electron-oauth-helper");

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/favicon.ico`
  });

  win.loadURL(`file://${__dirname}/dist/index.html`);

  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()
  // Event when the window is closed.
  win.on('closed', function () {
    win = null;
  });
}

// Create window on electron intialization
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // macOS specific close process
  if (win === null) {
    createWindow();
  }
});

// Handle OAuth
//TODO: Apparently, in the example, this is sometimes handled
// on the renderer (client / website)? It seems to make a confusing
// distinction between GoogleClientWebApp and Firebase.
// I'm just too tired to handle all of this right now. I'll deal
// with it later.
ipcMain.on("get-access-token", (event, type) => {
  //TODO:Make this more easily expandable with other OAuth providers
  if (type !== "google") {
    throw new Error("Non-google OAuth is not supported in electron currently.");
  }

  // Manually copying firebase config
  // Because electron.js isn't built, and doesn't see the environment.
  const provider = new OAuth2Provider({
    client_id: "639842630367-pmbdhsq5r9nvv183s7dkk646svbh64fn.apps.googleusercontent.com",
    client_secret: "9te9qq9PMtAKZpZqnS2TzgvT",
    redirect_uri: "https://esca-d7edb.firebaseapp.com/__/auth/handler",
    authorize_url: "https://accounts.google.com/o/oauth2/v2/auth",
    access_token_url: "https://www.googleapis.com/oauth2/v4/token",
    access_type: "online",
    response_type: "code",
    scope: "https://www.googleapis.com/auth/userinfo.profile"
  });

  // Has to be immutable for garbage collection?
  //TODO:Figure out what impact the scope has on
  // the need for `let` in these situations.
  let window = new BrowserWindow({
    show: false,
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  window.once("ready-to-show", () => {
    window.show();
  });
  window.once("closed", () => {
    window = null;
  });

  provider.perform(window)
    .then(resp => {
      const accessToken = resp.access_token;
      event.sender.send("got-access-token", type, accessToken);
    })
    .catch(console.error);
});

// ./public/electron.js
const path = require('path')
const fs = require('fs')

const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');

const DIR_DATA_BANS = path.join(__dirname, '../data/myData.txt')

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 780,
    height: 470,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '../public/preload.js'),
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  win.setMenuBarVisibility(false)

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
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

async function getFileDataFromMachine(){
  return new Promise((resolve, reject) => {
    fs.readFile(DIR_DATA_BANS, 'utf8', (err, data) => {
      let fileData = ''
      if(!err) fileData = data
      resolve(data) 
    })
  })
}

async function saveFileData(updatedData = ''){
  const pathFile = DIR_DATA_BANS
  return new Promise((resolve, reject) => {
    fs.writeFile(pathFile, updatedData, err => {
      if(err){
        reject(err)
      }else{
        resolve('file created sucessfully!')
      }
    })
  })
}

const parseArrayToString = (array) => JSON.stringify(array)

ipcMain.on('save-file', async(_, message) => {
  const userToSave = {...message, date: Date.now()}

  try {
    const resDataFile = await getFileDataFromMachine()

    if(!resDataFile) {
      const dataToSave = parseArrayToString([userToSave])      
      saveFileData(dataToSave)
      return
    }

    const data = JSON.parse(resDataFile)
    const userIsAlreadyBan = data.some(ban => ban.nick === userToSave.nick)

    if(!userIsAlreadyBan){
      const updatedData = parseArrayToString([...data, userToSave])
      saveFileData(updatedData)
    }
        
  } catch (error) {
    console.log(error)
  }
})

ipcMain.on('get-file-data', (event, arg) => {
  getFileDataFromMachine()
    .then(res => event.reply('res-file-data', { data: JSON.parse(res) }))
})
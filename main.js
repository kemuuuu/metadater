const electron = require('electron')
const path = require('path')
const url = require('url')
const jsforce = require('jsforce')
const fs = require('fs')

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain
let conn = new jsforce.Connection()

let mainWindow
app.on('ready', createWindow)
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', function() {
  if (mainWindow === null) createWindow()
})

function createWindow() {
  mainWindow = new BrowserWindow({width: 800, height: 700})
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', function() {
    mainWindow = null
  })
}

ipc.on('auth-org', (event, arg) => {
  console.log(arg.user + arg.pass)
  conn.login(arg.user, arg.pass, (err,res) => {
    if (err) {
      console.log(err)
      event.returnValue = 'Error!!'
    }
  })
  event.returnValue = 'Success!!'
})

ipc.on('fetch-obj', (event, arg) => {
  const fullName = arg.obj
  conn.metadata.read('CustomObject', fullName, (err, metadata) => {
    if (err) {
      console.log(err)
      event.returnValue = 'Error...'
    }
    writeFile(arg.path, JSON.stringify(metadata))
    event.returnValue = 'SUCCESS'
  });
})


const writeFile = (path, data) => {
  fs.writeFile(path, data, err => {
    if (err) throw err;
  })
}
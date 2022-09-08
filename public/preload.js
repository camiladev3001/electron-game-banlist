const { ipcRenderer, contextBridge } = require('electron')

const CHANNELS = {
  FILE_RESPONSE_DATA: 'res-file-data'
}

const { FILE_RESPONSE_DATA } = CHANNELS

contextBridge.exposeInMainWorld('electron', {
  notificationApi: {
    sendNotification(message){
      ipcRenderer.send('save-file', message)
    },

    getFileData(callback){
      ipcRenderer.send('get-file-data', 'ping')
      ipcRenderer.on(FILE_RESPONSE_DATA, (event, data) => {
        callback(data)
        ipcRenderer.removeAllListeners(FILE_RESPONSE_DATA)
      })      
    },

  },
})

const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
'comunicacion',
    {
        inicioCorrecto: (callback) => ipcRenderer.on('inicioCorrecto', callback)
        ,
        nuevoRegistro: (datos) => ipcRenderer.send('nuevoRegistro',datos)
        ,
        redireccionar: (datos) => ipcRenderer.send('redireccionar',datos)
        ,
        buscarRegistros: (datos) => ipcRenderer.send('buscarRegistros',datos)
        ,
        retornarRegistros: (callback) => ipcRenderer.on('retornarRegistros', callback)
        ,
        renderer: (datos) => ipcRenderer.send('renderer',datos)
        ,
        notification: (datos) => ipcRenderer.send('notification', datos)
    }
)
const { app, BrowserWindow } = require('electron')
const path = require('path')
const { ipcMain, Notification } = require('electron')
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'entrar123',
    database: 'pa_actividad5'
})




var ventana
function createWindow() {
    ventana = new BrowserWindow({
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    })
    ventana.maximize();
    ventana.loadFile('renderer.html')
}

app.whenReady().then(createWindow)


ipcMain.on('cargarPrincipal', (e, a) => {
    ventana.loadFile('otro.html')
})


ipcMain.on('nuevoRegistro', (event, args) => {
    connection.query(
        'INSERT INTO busqueda(filtro, alto, ancho, imagen) VALUES (?,?,?,?) ',
        args,
    )
})

ipcMain.on('redireccionar', (event, args) => {
    ventana.loadFile('busquedas.html')
})

ipcMain.on('buscarRegistros', (event, args) => {
  
    connection.promise().execute('SELECT * FROM busqueda')
    .then(([results, fields]) => {
        ventana.webContents.send('retornarRegistros', results);        
    })

})

ipcMain.on('renderer', (event, args) => {
    ventana.loadFile('renderer.html')
})

ipcMain.on('notification', () => {
    const n = new Notification({
      title: "Exito",
      body: "Busqueda guardada con exito!"
    });
    n.show()
  })
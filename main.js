const { app, BrowserWindow } = require('electron')
const path = require('path')
const { ipcMain } = require('electron')
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
        width: 650,
        height: 650,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    })
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
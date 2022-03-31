document.addEventListener('DOMContentLoaded', function (event) {

    window.comunicacion.buscarRegistros()
    window.comunicacion.retornarRegistros(function (event, args) {

        var tbl = ''
        args.forEach(function (fila) {
            tbl += '<tr>'
            tbl += '<td>'
            tbl += fila.idBusqueda
            tbl += '</td>'
            tbl += '<td>'
            tbl += fila.alto
            tbl += '</td>'
            tbl += '<td>'
            tbl += fila.ancho
            tbl += '</td>'
            tbl += '<td>'
            tbl += (fila.filtro == '' ? 'N/A' : fila.filtro)
            tbl += '</td>'
            tbl += '<td>'
            tbl += fila.fecha
            tbl += '</td>'
            tbl += '<td>'
            tbl += "<img width='150' high='150' src='" + fila.imagen + "' />"
            tbl += '</td>'
            tbl += '</tr>'
        })

        document.querySelector('#tbl-registros > tbody').innerHTML = tbl
    })
})


let renderer = document.getElementById('renderer')

renderer.addEventListener('click', function () {

    window.comunicacion.renderer();

})
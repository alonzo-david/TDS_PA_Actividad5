//window.comunicacion.registroValido('OK')

window.comunicacion.inicioCorrecto(function (event, args) {
    console.log(args)
})

let boton_solicitud = document.getElementById('consultar')
let nuevo = document.getElementById('guardar')

let input_filtro = document.getElementById('filtro')
let input_alto = document.getElementById('alto')
let input_ancho = document.getElementById('ancho')


let imagen_respuesta = document.getElementById('respuesta')


boton_solicitud.addEventListener('click', realizarSolicitud)

function realizarSolicitud() {
    let filtro_vacio = input_filtro.value
    let alto_vacio = input_alto.value
    let ancho_vacio = input_ancho.value

    var endPoint = ""

    if (alto_vacio == '' && ancho_vacio == '' && filtro_vacio == '') {
        endPoint = `https://cataas.com/cat?json=true`;

    } else if (alto_vacio != '' && ancho_vacio == '' && filtro_vacio == '') {
        endPoint = `https://cataas.com/cat?height=${alto_vacio}&json=true`;
    } else if (alto_vacio == '' && ancho_vacio != '' && filtro_vacio == '') {
        endPoint = `https://cataas.com/cat?width=${ancho_vacio}&json=true`;
    } else if (alto_vacio == '' && ancho_vacio == '' && filtro_vacio != '') {
        endPoint = `https://cataas.com/cat?filter=${filtro_vacio}&json=true`;
    } else if (alto_vacio != '' && ancho_vacio != '' && filtro_vacio == '') {
        endPoint = `https://cataas.com/cat?height=${alto_vacio}&width=${ancho_vacio}&json=true`;
    } else if (alto_vacio != '' && ancho_vacio == '' && filtro_vacio != '') {
        endPoint = `https://cataas.com/cat?height=${alto_vacio}&filter=${filtro_vacio}&json=true`;
    } else if (alto_vacio == '' && ancho_vacio != '' && filtro_vacio != '') {
        endPoint = `https://cataas.com/cat?width=${ancho_vacio}&filter=${filtro_vacio}&json=true`;
    } else {
        endPoint = `https://cataas.com/cat?height=${alto_vacio}&width=${ancho_vacio}&filter=${filtro_vacio}&json=true`;
    }


    fetch(endPoint)
        .then(response => response.json())
        .then(gato => {
            console.log(gato)
            imagen_respuesta.setAttribute('src', `https://cataas.com/${gato.url}`)
            nuevo.disabled = false;
            //boton_editar.innerHTML = gato.id
        })
}

nuevo.addEventListener('click', function () {
    console.log('imagen', imagen_respuesta.src);

    window.comunicacion.nuevoRegistro([input_filtro.value, input_alto.value, input_ancho.value, imagen_respuesta.src]);
    window.comunicacion.notification();
})

let boton_registros = document.getElementById('registros')

boton_registros.addEventListener('click', function () {
    window.comunicacion.redireccionar();
})
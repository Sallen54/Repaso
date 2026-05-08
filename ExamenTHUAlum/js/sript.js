document.addEventListener("DOMContentLoaded", main);
let datos = [];



async function main() {



    await cargarDatos();
    pintarDatos();
    console.log(datos);
}

async function cargarDatos() {
    let datosAlmacenados = JSON.parse(localStorage.getItem('datos'));
    if (datosAlmacenados && datosAlmacenados.length > 0) {
        datos = datosAlmacenados;
        return;
    }
    let informacio = await fetch('bbdd.json');
    datos = await informacio.json();
    console.log(datos);
    guardarDatosStorage(datos);
}

function guardarDatosStorage(datos) {
    localStorage.setItem('datos', JSON.stringify(datos.cars));
}

function pintarDatos() {
    let datosStorage = JSON.parse(localStorage.getItem('datos')) || [];

    let listado = document.getElementById('listado');

    while (listado.firstChild) {
        listado.removeChild(listado.firstChild);
    }

    datosStorage.forEach((element, index) => {

        // Card principal
        let cardPrincipal = document.createElement('div');
        cardPrincipal.classList.add("card", "mb-4");

        // Enlace
        let enlaceImg = document.createElement('a');
        enlaceImg.href = "#!";

        // Imagen
        let imgCard = document.createElement('img');
        imgCard.classList.add("card-img-top");
        imgCard.src = "img/" + element.img;
        imgCard.alt = element.marca + " " + element.modelo;

        // img dentro del enlace
        enlaceImg.appendChild(imgCard);

        // enlace dentro card
        cardPrincipal.appendChild(enlaceImg);

        // Card body
        let cardBody = document.createElement('div');
        cardBody.classList.add("card-body");

        // Titulo
        let titulo = document.createElement('h2');
        titulo.classList.add("card-title");

        let tituloTexto = document.createTextNode(element.marca + " " + element.modelo);
        titulo.appendChild(tituloTexto);

        // titulo dentro body
        cardBody.appendChild(titulo);

        // body dentro card
        cardPrincipal.appendChild(cardBody);

        // card dentro listado
        listado.appendChild(cardPrincipal);



        });
    }


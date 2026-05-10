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
        cardBody.appendChild(titulo);

        //Precio
        let rowCentral = document.createElement('div');
        rowCentral.classList.add("row", "justify-content-end");
        let dentroRowCentral = document.createElement('div');
        dentroRowCentral.classList.add("p-2", "mb-1", "col-md-3", "offset-md-3" ,"bg-warning", "rounded", "text-center");
        let precioCoche = document.createElement('h2');
        precioCoche.classList.add("font-weight-bold");
        let precioCocheNode = document.createTextNode(element.precio + " €");
        precioCoche.appendChild(precioCocheNode);
        dentroRowCentral.appendChild(precioCoche);
        rowCentral.appendChild(dentroRowCentral);
        cardBody.appendChild(rowCentral);

        // Detalles
        let rowDetalles = document.createElement('div');
        rowDetalles.classList.add("row");

        // Año titulo
        let divAnyoTitulo = document.createElement('div');
        divAnyoTitulo.classList.add("col", "p-3", "text-center","border-bottom", "border-dark");
        let divAnyoTituloNode =  document.createTextNode("Año");
        divAnyoTitulo.appendChild(divAnyoTituloNode);
        rowDetalles.appendChild(divAnyoTitulo);

        // Kilometros titulo
        let divKilometroTitulo = document.createElement('div');
        divKilometroTitulo.classList.add("col", "p-3", "text-center","border-bottom", "border-dark");
        let divKilometroTituloNode = document.createTextNode("Kilometros");
        divKilometroTitulo.appendChild(divKilometroTituloNode);
        rowDetalles.appendChild(divKilometroTitulo);

        //Cambio titulo
        let divCambioTitulo = document.createElement('div');
        divCambioTitulo.classList.add("col", "p-3", "text-center","border-bottom", "border-dark");
        let divCambioTituloNode =  document.createTextNode("Cambio");
        divCambioTitulo.appendChild(divCambioTituloNode);
        rowDetalles.appendChild(divCambioTitulo);

        //Combustible titulo
        let divCombustibleTitulo = document.createElement('div');
        divCombustibleTitulo.classList.add("col", "p-3", "text-center","border-bottom", "border-dark");
        let divCombustibleTituloNode =  document.createTextNode("Combustible");
        divCombustibleTitulo.appendChild(divCombustibleTituloNode);
        rowDetalles.appendChild(divCombustibleTitulo);

        //Espacio titulo
        let espacio = document.createElement('div');
        espacio.classList.add("w-100");
        rowDetalles.appendChild(espacio);

        //Año
        let divAnyo = document.createElement('div');
        divAnyo.classList.add("col", "p-3", "text-center", "fw-bold");
        let divAnyoNode =  document.createTextNode(element.anyo);
        divAnyo.appendChild(divAnyoNode);
        rowDetalles.appendChild(divAnyo);
        //Kilometros
        let divKilometro     = document.createElement('div');
        divKilometro.classList.add("col", "p-3", "text-center","fw-bold");
        let divKilometroNode =  document.createTextNode(element.km + "km.");
        divKilometro.appendChild(divKilometroNode);
        rowDetalles.appendChild(divKilometro);
        //Cambio 
        let divCambio     = document.createElement('div');
        divCambio.classList.add("col", "p-3", "text-center","fw-bold");
        let divCambioNode =  document.createTextNode(element.cambio);
        divCambio.appendChild(divCambioNode);
        rowDetalles.appendChild(divCambio);
        //Combustible
        let divCombustible     = document.createElement('div');
        divCombustible.classList.add("col", "p-3", "text-center","fw-bold");
        let divCombustibleNode =  document.createTextNode(element.combustible);
        divCombustible.appendChild(divCombustibleNode);
        rowDetalles.appendChild(divCombustible);

        cardBody.appendChild(rowDetalles);

        let btnReservar     = document.createElement('a');
        let btnReservarNode = document.createTextNode("Reservar");
        btnReservar.href    = "reserva.html?index=" + index;

        btnReservar.classList.add("btn", "btn-primary", "m-3");

        btnReservar.appendChild(btnReservarNode);
        cardBody.appendChild(btnReservar);

        // body dentro card
        cardPrincipal.appendChild(cardBody);

        // card dentro listado
        listado.appendChild(cardPrincipal);

        });
    }


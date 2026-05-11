document.addEventListener("DOMContentLoaded", main);
let datos = [];
let busqueda = [];

async function main() {
    await cargarDatos();
    cargarAnyos();
    pintarDatos();
    document.getElementById("filtrar").addEventListener("click", validar, false);
    //filtros recorrer datos
    datos.forEach(coche => {
        busqueda.push(coche.marca);
        busqueda.push(coche.modelo);
    });

    $("#marcaModelo").autocomplete({
        source: busqueda
    });

    $("#ir").click(function () {
        let texto = $("#marcaModelo").val().toLowerCase();
        let filtrados = datos.filter(coche =>

            coche.marca.toLowerCase().includes(texto) ||
            coche.modelo.toLowerCase().includes(texto) ||
            (coche.marca + " " + coche.modelo)
                .toLowerCase()
                .includes(texto)
        );
        pintarDatos(filtrados);
    });

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

function cargarAnyos() {

    let anyoDesde = document.getElementById("anyoDesde");
    let anyoHasta = document.getElementById("anyoHasta");

    // Opción Desde
    let opcionDesde = document.createElement("option");
    opcionDesde.value = "0";
    opcionDesde.appendChild(
        document.createTextNode("Desde")
    );

    anyoDesde.appendChild(opcionDesde);

    // Opción Hasta
    let opcionHasta = document.createElement("option");
    opcionHasta.value = "9999";
    opcionHasta.appendChild(
        document.createTextNode("Hasta")
    );

    anyoHasta.appendChild(opcionHasta);

    // Obtener años sin repetir
    let anyos = [];

    datos.forEach(coche => {

        if (!anyos.includes(coche.anyo)) {
            anyos.push(coche.anyo);
        }

    });

    // Ordenar años
    anyos.sort((a, b) => a - b);

    // Crear options
    anyos.forEach(anyo => {

        // Desde
        let option1 = document.createElement("option");

        option1.value = anyo;

        option1.appendChild(
            document.createTextNode(anyo)
        );

        anyoDesde.appendChild(option1);

        // Hasta
        let option2 = document.createElement("option");

        option2.value = anyo;

        option2.appendChild(
            document.createTextNode(anyo)
        );

        anyoHasta.appendChild(option2);

    });
}

function pintarDatos(array = datos) {
    let listado = document.getElementById('listado');

    while (listado.firstChild) {
        listado.removeChild(listado.firstChild);
    }

    array.forEach((element, index) => {

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
        dentroRowCentral.classList.add("p-2", "mb-1", "col-md-3", "offset-md-3", "bg-warning", "rounded", "text-center");
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
        divAnyoTitulo.classList.add("col", "p-3", "text-center", "border-bottom", "border-dark");
        let divAnyoTituloNode = document.createTextNode("Año");
        divAnyoTitulo.appendChild(divAnyoTituloNode);
        rowDetalles.appendChild(divAnyoTitulo);

        // Kilometros titulo
        let divKilometroTitulo = document.createElement('div');
        divKilometroTitulo.classList.add("col", "p-3", "text-center", "border-bottom", "border-dark");
        let divKilometroTituloNode = document.createTextNode("Kilometros");
        divKilometroTitulo.appendChild(divKilometroTituloNode);
        rowDetalles.appendChild(divKilometroTitulo);

        //Cambio titulo
        let divCambioTitulo = document.createElement('div');
        divCambioTitulo.classList.add("col", "p-3", "text-center", "border-bottom", "border-dark");
        let divCambioTituloNode = document.createTextNode("Cambio");
        divCambioTitulo.appendChild(divCambioTituloNode);
        rowDetalles.appendChild(divCambioTitulo);

        //Combustible titulo
        let divCombustibleTitulo = document.createElement('div');
        divCombustibleTitulo.classList.add("col", "p-3", "text-center", "border-bottom", "border-dark");
        let divCombustibleTituloNode = document.createTextNode("Combustible");
        divCombustibleTitulo.appendChild(divCombustibleTituloNode);
        rowDetalles.appendChild(divCombustibleTitulo);

        //Espacio titulo
        let espacio = document.createElement('div');
        espacio.classList.add("w-100");
        rowDetalles.appendChild(espacio);

        //Año
        let divAnyo = document.createElement('div');
        divAnyo.classList.add("col", "p-3", "text-center", "fw-bold");
        let divAnyoNode = document.createTextNode(element.anyo);
        divAnyo.appendChild(divAnyoNode);
        rowDetalles.appendChild(divAnyo);
        //Kilometros
        let divKilometro = document.createElement('div');
        divKilometro.classList.add("col", "p-3", "text-center", "fw-bold");
        let divKilometroNode = document.createTextNode(element.km + "km.");
        divKilometro.appendChild(divKilometroNode);
        rowDetalles.appendChild(divKilometro);
        //Cambio 
        let divCambio = document.createElement('div');
        divCambio.classList.add("col", "p-3", "text-center", "fw-bold");
        let divCambioNode = document.createTextNode(element.cambio);
        divCambio.appendChild(divCambioNode);
        rowDetalles.appendChild(divCambio);
        //Combustible
        let divCombustible = document.createElement('div');
        divCombustible.classList.add("col", "p-3", "text-center", "fw-bold");
        let divCombustibleNode = document.createTextNode(element.combustible);
        divCombustible.appendChild(divCombustibleNode);
        rowDetalles.appendChild(divCombustible);

        cardBody.appendChild(rowDetalles);

        let btnReservar = document.createElement('a');
        let btnReservarNode = document.createTextNode("Reservar");
        btnReservar.href = "reserva.html?index=" + index;

        btnReservar.classList.add("btn", "btn-primary", "m-3");

        btnReservar.appendChild(btnReservarNode);
        cardBody.appendChild(btnReservar);

        // body dentro card
        cardPrincipal.appendChild(cardBody);

        // card dentro listado
        listado.appendChild(cardPrincipal);

    });
}

function validarRangos() {
    let anyoDesde = parseInt(document.getElementById("anyoDesde").value);
    let anyoHasta = parseInt(document.getElementById("anyoHasta").value);

    let kmDesde = parseInt(document.getElementById("kmDesde").value);
    let kmHasta = parseInt(document.getElementById("kmHasta").value);

    // Validar años
    if (anyoDesde > anyoHasta) {
        error(document.getElementById("anyoDesde"),
            "L'any inicial no pot ser major que el final."
        );
        return false;
    }
    // Validar kilómetros
    if (kmDesde > kmHasta) {
        error(document.getElementById("kmDesde"),
            "Els km inicials no poden ser majors que els finals."
        );
        return false;
    }
    return true;
}



function validar(e) {
    esborrarError();
    e.preventDefault();
    if (validarRangos() && confirm("Confirma si vols filtrar")) {
        document.getElementById("form-filtro").requestSubmit();
        return true;
    } else {
        return false;
    }
}

function error(element, missatge) {
    let miss = document.createTextNode(missatge);
    document.getElementById("errorMensaje").appendChild(miss);
    element.classList.add("text-danger");
    element.focus();
}

function esborrarError() {
    document.getElementById("errorMensaje").textContent = "";
    let formulari = document.forms[0];
    for (let i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].classList.remove("text-danger");
    }
}




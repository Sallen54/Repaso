document.addEventListener("DOMContentLoaded", main);

function main(){

    cargarReserva()
}

function cargarReserva() {
    // Obtener index desde la URL
    let parametros = new URLSearchParams(window.location.search);
    let index = parametros.get("index");

    // Obtener coches del localStorage
    let datos = JSON.parse(localStorage.getItem("datos"));

    // Obtener coche seleccionado
    let coche = datos[index];

    // Titulo
    document.querySelector(".card-title").textContent = coche.marca + " " + coche.modelo;

    // Precio
    document.querySelector(".font-weight-bold").textContent = coche.precio + " €";

    // Imagen
    document.querySelector(".card-img-top").src = "img/" + coche.img;

    // Todos los strong
    let strongs = document.querySelectorAll("strong");
    strongs[0].textContent = coche.anyo;
    strongs[1].textContent = coche.km + " km";
    strongs[2].textContent = coche.cambio;
    strongs[3].textContent = coche.combustible;
}
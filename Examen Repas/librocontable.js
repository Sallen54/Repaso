document.addEventListener("DOMContentLoaded", main);
let datos = [];
let datosFormulario = [];

async function main() {
    let formulario = document.getElementById("form-libro-contable");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        let fecha = document.getElementById("fecha").value;
        let concepto = document.getElementById("concepto").value;
        let tipo = document.getElementById("tipo").value;
        let importe = document.getElementById("importe").value;
        let saldo = calcularSaldo(tipo, importe);
        agregarRegistro(fecha, concepto, tipo, importe, saldo);

        formulario.reset();
    });

    await cargarDatos();
    pintarDatos();
    addValidationListeners();
}

async function cargarDatos() {
    let datosAlmacenados = JSON.parse(localStorage.getItem('datos'));
    if (datosAlmacenados && datosAlmacenados.length > 0) {
        datos = datosAlmacenados;
        return;
    }

    let informacio = await fetch('data.json');
    datos = await informacio.json();
    console.log(datos);
    guardarDatosStorage(datos);
}

function guardarDatosStorage(datos) {
    localStorage.setItem('datos', JSON.stringify(datos));
}

function pintarDatos() {
    let datosStorage = JSON.parse(localStorage.getItem('datos')) || [];

    let tabla = document.getElementById('tabla-libro-contable');

    datosStorage.forEach(element => {
        let fila = document.createElement('tr');

        let borrar = document.createElement('td');
        let btnBorrar = document.createElement('button');
        let btnBorrarText = document.createTextNode('Borrar');
        btnBorrar.appendChild(btnBorrarText);
        borrar.appendChild(btnBorrar);
        fila.appendChild(borrar);

        let fecha = document.createElement('td');
        let fechaNode = document.createTextNode(element.fecha);
        fecha.appendChild(fechaNode);
        fila.appendChild(fecha);

        let concepto = document.createElement('td');
        let conceptoNode = document.createTextNode(element.concepto);
        concepto.appendChild(conceptoNode);
        fila.appendChild(concepto);

        let dh = document.createElement('td');
        let dhNode = document.createTextNode(element.tipo);
        dh.appendChild(dhNode);
        fila.appendChild(dh);

        let importe = document.createElement('td');
        let importeNode = document.createTextNode(element.importe);
        importe.appendChild(importeNode);
        fila.appendChild(importe);

        let saldo = document.createElement('td');
        let saldoNode = document.createTextNode(element.saldo);
        saldo.appendChild(saldoNode);
        fila.appendChild(saldo);

        tabla.appendChild(fila);

    });

}

function calcularSaldo(tipo, importe) {
    let saldoActual = document.getElementById("saldo-actual")?.innerText || "0";
    if (tipo === "D") {
        return parseFloat(saldoActual) + parseFloat(importe);
    } else {
        return parseFloat(saldoActual) - parseFloat(importe);
    }
}

function addValidationListeners() {
    const campos = [
        { id: "fecha", event: "input" },
        { id: "concepto", event: "input" },
        { id: "tipo", event: "change" },
        { id: "importe", event: "input" }
    ];

    campos.forEach(({ id, event }) => {
        const elemento = document.getElementById(id);
        if (!elemento) return;

        elemento.addEventListener(event, function () {
            if (this.checkValidity()) {
                this.classList.remove("is-invalid");
                this.classList.add("is-valid");
            } else {
                this.classList.remove("is-valid");
                this.classList.add("is-invalid");
            }
        });
    });
}

function borrarRegistro(index) {
    datos.splice(index, 1);
    guardarDatosStorage(datos);
    pintarDatos();
}

function agregarRegistro(fecha, concepto, tipo, importe, saldo) {
  let nuevoRegistro = { fecha, concepto, tipo, importe, saldo };
  datosFormulario.push(nuevoRegistro);
  datos.push(nuevoRegistro);
  guardarDatosStorage(datos);
  pintarDatos();
}




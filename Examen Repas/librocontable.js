document.addEventListener("DOMContentLoaded", main);
let datos = [];
function main() {
    // Agregar evento al formulario para manejar el envío de datos
    let formulario = document.getElementById("form-libro-contable");

    // Evento para manejar el envío del formulario
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        let fecha    = document.getElementById("fecha").value;
        let concepto = document.getElementById("concepto").value;
        let tipo     = document.getElementById("tipo").value;
        let importe  = document.getElementById("importe").value;
        let saldo    = calcularSaldo(tipo, importe);
        agregarRegistro(fecha, concepto, tipo, importe, saldo);
        // Limpiar el formulario después de agregar el registro
        formulario.reset();

    });
    cargarDatos();
    pintarDatos()
}

async function cargarDatos() {
    let informacio = await fetch('data.json');
    datos          = await informacio.json()
    console.log(datos);
    guardarDatosStoragee(datos);
}

function guardarDatosStorage(datos) {
    let oldData = JSON.parse(localStorage.getItem('datos')) || []; 
    oldData.push(...datos);
    localStorage.setItem('datos',JSON.stringify(oldData));
}

function pintarDatos() {
    let datosStorage = JSON.parse(localStorage.getItem('datos'))

    let tabla = document.getElementById('tabla-libro-contable');

    datosStorage.forEach(element => {
        let fila      = document.createElement('tr');
        
        let borrar    = document.createElement('td');
        let btnBorrar = document.createElement('button');
        let btnBorrarText = document.createTextNode('Borrar');
        btnBorrar.appendChild(btnBorrarText);
        borrar.appendChild(btnBorrar);
        fila.appendChild(borrar);

        let fecha     = document.createElement('td');
        let fechaNode = document.createTextNode(element.fecha);
        fecha.appendChild(fechaNode);
        fila.appendChild(fecha);

        let concepto     = document.createElement('td');
        let conceptoNode = document.createTextNode(element.concepto);
        concepto.appendChild(conceptoNode);
        fila.appendChild(concepto);

        let dh        = document.createElement('td');
        let dhNode    = document.createTextNode(element.tipo);
        dh.appendChild(dhNode);
        fila.appendChild(dh);

        let importe     = document.createElement('td');
        let importeNode = document.createTextNode(element.importe);
        importe.appendChild(importeNode);
        fila.appendChild(importe);

        let saldo     = document.createElement('td');
        let saldoNode = document.createTextNode(element.saldo);
        saldo.appendChild(saldoNode);
        fila.appendChild(saldo);

        tabla.appendChild(fila);
        
    });
    
}











function calcularSaldo(tipo, importe) {
    let saldoActual = document.getElementById("saldo-actual").innerText;
    if (tipo === "Ingreso") {
        return parseFloat(saldoActual) + parseFloat(importe);
    } else {
        return parseFloat(saldoActual) - parseFloat(importe);
    }

}


//CheackValidity para la fecha
document.getElementById("fecha").addEventListener("change", function () {
    if (this.checkValidity()) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
    } else {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
    }
});
// CheckValidity para el concepto
document.getElementById("concepto").addEventListener("input", function () {
    if (this.checkValidity()) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
    } else {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
    }
});
// CheckValidity para el tipo
document.getElementById("tipo").addEventListener("change", function () {
    if (this.checkValidity()) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
    } else {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
    }
});
// CheckValidity para el importe
document.getElementById("importe").addEventListener("input", function () {
    if (this.checkValidity()) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
    } else {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
    }
});


document.addEventListener("DOMContentLoaded", main);

function main() {
// Agregar evento al formulario para manejar el envío de datos
let formulario = document.getElementById("form-libro-contable");

// Evento para manejar el envío del formulario
formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    
    let fecha = document.getElementById("fecha").value;
    let concepto = document.getElementById("concepto").value;
    let tipo = document.getElementById("tipo").value;
    let importe = document.getElementById("importe").value;
    let saldo = calcularSaldo(tipo, importe);
    agregarRegistro(fecha, concepto, tipo, importe, saldo);
    
    
});

}
// Función para agregar un nuevo registro a la tabla
function agregarRegistro(fecha, concepto, tipo, importe, saldo) {

    let tabla = document.getElementById("tabla-libro-contable").getElementsByTagName('tbody')[0];
    let nuevaFila = tabla.insertRow();

    let celdaFecha = nuevaFila.insertCell(0);
    let celdaConcepto = nuevaFila.insertCell(1);
    let celdaTipo = nuevaFila.insertCell(2);
    let celdaImporte = nuevaFila.insertCell(3);
    let celdaSaldo = nuevaFila.insertCell(4);
    // Agregar datos a las celdas
    celdaFecha.innerText = fecha;
    celdaConcepto.innerText = concepto;
    celdaTipo.innerText = tipo;
    celdaImporte.innerText = importe;
    celdaSaldo.innerText = saldo;

    // Actualizar el saldo actual
    document.getElementById("saldo-actual").innerText = saldo;
    


    

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
document.getElementById("fecha").addEventListener("change", function() {
    if (this.checkValidity()) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
    } else {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
    }
});
// CheckValidity para el concepto
document.getElementById("concepto").addEventListener("input", function() {
    if (this.checkValidity()) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
    } else {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
    }
});
// CheckValidity para el tipo
document.getElementById("tipo").addEventListener("change", function() {
    if (this.checkValidity()) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
    } else {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
    }
});
// CheckValidity para el importe
document.getElementById("importe").addEventListener("input", function() {
    if (this.checkValidity()) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
    } else {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
    }
});


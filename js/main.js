let nombre = prompt("Ingresá tu nombre:");
let apellido = prompt("Ingresá tu apellido:");
let edad = parseInt(prompt("Ingresá tu edad:"));

function crearMensaje(nombreUsuario, apellidoUsuario, edadUsuario) {
    let edadProximoAnio = edadUsuario + 1;

    return "Hola " + nombreUsuario + " " + apellidoUsuario +
        ". Tenés " + edadUsuario +
        " años. El próximo año vas a tener " +
        edadProximoAnio + " años.";
}

let mensajeUsuario = crearMensaje(nombre, apellido, edad);

console.log(mensajeUsuario);
alert(mensajeUsuario);

const PIN = "1234";

let intentos = 0;
let acceso = false;
let saldo = 100000;

class Usuario {
    constructor(nombre, apellido, saldo, tipoCuenta) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.saldo = saldo;
        this.tipoCuenta = tipoCuenta;
    }

    consultarSaldo() {
        return "El saldo de " + this.nombre + " es de $" + this.saldo;
    }

    retirarDinero(cantidad) {
        if (cantidad > 0 && cantidad <= this.saldo) {
            this.saldo = this.saldo - cantidad;
            return "Retiro realizado. Nuevo saldo: $" + this.saldo;
        } else {
            return "El monto no es válido.";
        }
    }
}

const usuario1 = new Usuario("Luciano", "Laricchia", 100000, "Cuenta corriente");
const usuario2 = new Usuario("Juan", "Perez", 50000, "Caja de ahorro");
const usuario3 = new Usuario("Maria", "Gomez", 200000, "Cuenta corriente");

console.log(usuario1.consultarSaldo());
console.log(usuario2.consultarSaldo());
console.log(usuario3.consultarSaldo());

console.log(usuario1.retirarDinero(10000));

let operaciones = [
    "Consulta de saldo",
    "Retiro de dinero",
    "Depósito de dinero",
    "Transferencia",
    "Consulta de saldo"
];

operaciones.push("Pago de servicio");
operaciones.unshift("Inicio de sesión");

let operacionEliminada = operaciones.pop();

console.log("Se ha eliminado el elemento: " + operacionEliminada);

console.log("Primera operación: " + operaciones[0]);

operaciones[1] = "Retiro de dinero realizado";

operaciones.splice(3, 1, "Depósito realizado");

function mostrarOperaciones(lista) {
    console.log("===== HISTORIAL DE OPERACIONES =====");

    for (let operacion of lista) {
        console.log("Operación: " + operacion);
    }
}

function validarPin(ingreso, pinCorrecto) {
    return ingreso === pinCorrecto;
}

function consultarSaldo(saldoActual) {
    return "Su saldo actual es de $" + saldoActual;
}

const calcularSaldo = (saldoActual, retiro) => {
    return saldoActual - retiro;
};

while (intentos < 3 && !acceso) {
    let ingreso = prompt("Ingrese su PIN:");

    if (validarPin(ingreso, PIN)) {
        acceso = true;
        alert("Acceso correcto.");
        console.log("Acceso correcto.");
    } else {
        intentos++;

        alert("PIN incorrecto. Intentos restantes: " + (3 - intentos));

        console.log("PIN incorrecto. Intentos restantes: " + (3 - intentos));
    }
}

if (acceso) {

    let opcion = prompt(
        "Bienvenido " + nombre + ".\n\n" +
        "Seleccione una opción:\n" +
        "1 - Consultar saldo\n" +
        "2 - Retirar dinero\n" +
        "3 - Ver historial de operaciones"
    );

    if (opcion === "1") {

        let resultadoSaldo = consultarSaldo(saldo);

        alert(resultadoSaldo);
        console.log(resultadoSaldo);

        operaciones.push("Consulta de saldo");
        
    } else if (opcion === "2") {

        let retiro = Number(prompt("¿Cuánto dinero desea retirar?"));

        if (retiro > 0 && retiro <= saldo) {

            saldo = calcularSaldo(saldo, retiro);

            alert(
                "Retiro realizado correctamente.\n" +
                "Dinero retirado: $" + retiro + "\n" +
                "Saldo restante: $" + saldo
            );

            console.log("Retiro realizado correctamente.");
            console.log("Dinero retirado: $" + retiro);
            console.log("Nuevo saldo: $" + saldo);

            operaciones.push("Retiro de $" + retiro);

        } else {

            alert("El monto ingresado no es válido o supera el saldo disponible.");
            console.log("Retiro rechazado.");

        }

    } else if (opcion === "3") {

        mostrarOperaciones(operaciones);

        alert("El historial de operaciones fue mostrado en la consola.");

    } else {

        alert("Opción inválida.");
        console.log("El usuario ingresó una opción inválida.");

    }

} else {

    alert("Cuenta bloqueada por demasiados intentos.");
    console.log("Cuenta bloqueada por demasiados intentos.");

}

mostrarOperaciones(operaciones);
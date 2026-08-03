// Asignación de un valor
let nombre = "luciano"; // dato string
nombre = "matias";
nombre = "pepito";

const PI = 3.14; // dato number

console.log(2 + 2);

let esVerdadero = false; 

nombre = prompt("Ingresá tu nombre");
let apellido = prompt("Ingresá tu apellido");
let edad = parseInt(prompt("Ingresá tu edad"));

alert("Hola " + nombre);

console.log("Hola " + nombre);

// Suma
let edadProximoAnio = edad + 1;

let mensaje = "Hola " + nombre + " " + apellido + ". Tenés " + edad + " años. El próximo año vas a tener " + edadProximoAnio + " años.";

console.log(mensaje);
alert(mensaje);

const PIN = "1234";

let intentos = 0;
let acceso = false;
let saldo = 100000;

while (intentos < 3 && !acceso) {
    let ingreso = prompt("Ingrese su PIN");

    if (ingreso === PIN) {
        acceso = true;
        alert("Acceso correcto");
    } else {
        intentos++;
        alert("PIN incorrecto. Intentos restantes: " + (3 - intentos));
    }
}

if (acceso) {

    let opcion = prompt(
        "Bienvenido.\n" +
        "1 - Consultar saldo\n" +
        "2 - Retirar dinero"
    );

    if (opcion === "1") {

        alert("Su saldo es de $" + saldo);

    } else if (opcion === "2") {

        let retiro = Number(prompt("¿Cuánto desea retirar?"));

        if (retiro <= saldo) {
            saldo = saldo - retiro;
            alert("Retiro realizado.\nSaldo restante: $" + saldo);
        } else {
            alert("Saldo insuficiente.");
        }

    } else {

        alert("Opción inválida.");

    }

} else {

    alert("Cuenta bloqueada.");

}


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

        alert(
            "PIN incorrecto. Intentos restantes: " +
            (3 - intentos)
        );

        console.log(
            "PIN incorrecto. Intentos restantes: " +
            (3 - intentos)
        );
    }
}

if (acceso) {

    let opcion = prompt(
        "Bienvenido " + nombre + ".\n\n" +
        "Seleccione una opción:\n" +
        "1 - Consultar saldo\n" +
        "2 - Retirar dinero"
    );

    if (opcion === "1") {

        let resultadoSaldo = consultarSaldo(saldo);

        alert(resultadoSaldo);
        console.log(resultadoSaldo);

    } else if (opcion === "2") {

        let retiro = Number(
            prompt("¿Cuánto dinero desea retirar?")
        );

        if (retiro > 0 && retiro <= saldo) {

            saldo = calcularSaldo(saldo, retiro);

            alert(
                "Retiro realizado correctamente.\n" +
                "Dinero retirado: $" + retiro + "\n" +
                "Saldo restante: $" + saldo
            );

            console.log(
                "Retiro realizado correctamente."
            );

            console.log(
                "Dinero retirado: $" + retiro
            );

            console.log(
                "Nuevo saldo: $" + saldo
            );


        } else {

            alert(
                "El monto ingresado no es válido " +
                "o supera el saldo disponible."
            );

            console.log(
                "Retiro rechazado."
            );
        }

    } else {

        alert("Opción inválida.");

        console.log(
            "El usuario ingresó una opción inválida."
        );
    }


} else {


    alert(
        "Cuenta bloqueada por demasiados intentos."
    );

    console.log(
        "Cuenta bloqueada por demasiados intentos."
    );
}
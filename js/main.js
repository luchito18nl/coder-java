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

const usuarios = [usuario1, usuario2, usuario3];

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

operaciones[1] = "Retiro de dinero realizado";

operaciones.splice(3, 1, "Depósito realizado");

function crearMensaje(nombreUsuario, apellidoUsuario) {
    return "Hola " + nombreUsuario + " " + apellidoUsuario;
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

function mostrarOperaciones(lista) {
    let historial = "";

    for (let operacion of lista) {
        historial += `<p>Operación: ${operacion}</p>`;
    }

    return historial;
}

const contenedorUsuarios = document.querySelector("#contenedorUsuarios");
const btnAgregar = document.querySelector("#btnAgregar");
const mensaje = document.querySelector("#mensaje");
const buscar = document.querySelector("#buscar");

const inputNombre = document.querySelector("#nombre");
const inputApellido = document.querySelector("#apellido");
const inputSaldo = document.querySelector("#saldo");
const inputTipoCuenta = document.querySelector("#tipoCuenta");

function mostrarUsuarios(lista) {
    contenedorUsuarios.innerHTML = "";

    lista.forEach((usuario) => {
        contenedorUsuarios.innerHTML += `
            <div class="usuario">
                <h3>${usuario.nombre} ${usuario.apellido}</h3>
                <p>Saldo: $${usuario.saldo}</p>
                <p>Tipo de cuenta: ${usuario.tipoCuenta}</p>
                <button class="btnSaldo" data-nombre="${usuario.nombre}">
                    Consultar saldo
                </button>
                <button class="btnRetirar" data-nombre="${usuario.nombre}">
                    Retirar dinero
                </button>
                <button class="btnEliminar" data-nombre="${usuario.nombre}">
                    Eliminar
                </button>
            </div>
        `;
    });

    const botonesSaldo = document.querySelectorAll(".btnSaldo");

    botonesSaldo.forEach((boton) => {
        boton.addEventListener("click", () => {
            const nombreUsuario = boton.dataset.nombre;

            const usuario = usuarios.find(
                (usuario) => usuario.nombre === nombreUsuario
            );

            mensaje.textContent = usuario.consultarSaldo();
        });
    });

    const botonesRetirar = document.querySelectorAll(".btnRetirar");

    botonesRetirar.forEach((boton) => {
        boton.addEventListener("click", () => {
            const nombreUsuario = boton.dataset.nombre;

            const usuario = usuarios.find(
                (usuario) => usuario.nombre === nombreUsuario
            );

            let cantidad = prompt("¿Cuánto dinero desea retirar?");

            if (cantidad !== null) {
                cantidad = Number(cantidad);

                if (cantidad > 0 && cantidad <= usuario.saldo) {
                    usuario.retirarDinero(cantidad);

                    operaciones.push("Retiro de $" + cantidad);

                    mensaje.textContent =
                        "Retiro realizado correctamente. Nuevo saldo: $" +
                        usuario.saldo;

                    mostrarUsuarios(usuarios);
                } else {
                    mensaje.textContent =
                        "El monto ingresado no es válido o supera el saldo disponible.";
                }
            }
        });
    });

    const botonesEliminar = document.querySelectorAll(".btnEliminar");

    botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", () => {
            const nombreUsuario = boton.dataset.nombre;

            const indice = usuarios.findIndex(
                (usuario) => usuario.nombre === nombreUsuario
            );

            usuarios.splice(indice, 1);

            mostrarUsuarios(usuarios);

            mensaje.textContent = "Usuario eliminado correctamente.";
        });
    });
}

btnAgregar.addEventListener("click", () => {
    const nombre = inputNombre.value;
    const apellido = inputApellido.value;
    const saldo = Number(inputSaldo.value);
    const tipoCuenta = inputTipoCuenta.value;

    if (
        nombre === "" ||
        apellido === "" ||
        saldo <= 0 ||
        tipoCuenta === ""
    ) {
        mensaje.textContent = "Completá todos los campos correctamente.";
        return;
    }

    const nuevoUsuario = new Usuario(
        nombre,
        apellido,
        saldo,
        tipoCuenta
    );

    usuarios.push(nuevoUsuario);

    mostrarUsuarios(usuarios);

    mensaje.textContent = "Usuario agregado correctamente.";

    inputNombre.value = "";
    inputApellido.value = "";
    inputSaldo.value = "";
    inputTipoCuenta.value = "";
});

buscar.addEventListener("keyup", () => {
    const texto = buscar.value.toLowerCase();

    const usuariosFiltrados = usuarios.filter((usuario) => {
        return (
            usuario.nombre.toLowerCase().includes(texto) ||
            usuario.apellido.toLowerCase().includes(texto)
        );
    });

    mostrarUsuarios(usuariosFiltrados);
});

mostrarUsuarios(usuarios);
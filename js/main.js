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
            return "Retiro realizado correctamente.";
        }

        return "El monto ingresado no es válido.";
    }
}


const usuario1 = new Usuario(
    "Luciano",
    "Laricchia",
    100000,
    "Cuenta corriente"
);

const usuario2 = new Usuario(
    "Juan",
    "Perez",
    50000,
    "Caja de ahorro"
);

const usuario3 = new Usuario(
    "Maria",
    "Gomez",
    200000,
    "Cuenta corriente"
);


const usuarios = [usuario1, usuario2, usuario3];


const formularioUsuario = document.querySelector("#formularioUsuario");
const contenedorUsuarios = document.querySelector("#contenedorUsuarios");
const mensaje = document.querySelector("#mensaje");
const buscar = document.querySelector("#buscar");


function mostrarUsuarios(lista) {

    contenedorUsuarios.innerHTML = "";

    lista.forEach((usuario) => {

        contenedorUsuarios.innerHTML += `
            <div class="usuario">

                <h3>${usuario.nombre} ${usuario.apellido}</h3>

                <p>Saldo: $${usuario.saldo}</p>

                <p>Tipo de cuenta: ${usuario.tipoCuenta}</p>

                <input
                    type="number"
                    class="inputRetiro"
                    data-nombre="${usuario.nombre}"
                    placeholder="Monto a retirar"
                >

                <button
                    class="btnSaldo"
                    data-nombre="${usuario.nombre}">
                    Consultar saldo
                </button>

                <button
                    class="btnRetirar"
                    data-nombre="${usuario.nombre}">
                    Retirar dinero
                </button>

                <button
                    class="btnEliminar"
                    data-nombre="${usuario.nombre}">
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

            const inputRetiro = document.querySelector(
                `.inputRetiro[data-nombre="${nombreUsuario}"]`
            );

            const cantidad = Number(inputRetiro.value);

            if (cantidad > 0 && cantidad <= usuario.saldo) {

                usuario.retirarDinero(cantidad);

                mensaje.textContent =
                    "Retiro realizado correctamente. Nuevo saldo: $" +
                    usuario.saldo;

                mostrarUsuarios(usuarios);

            } else {

                mensaje.textContent =
                    "El monto ingresado no es válido o supera el saldo disponible.";
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

            mensaje.textContent =
                "Usuario eliminado correctamente.";
        });
    });
}


formularioUsuario.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const nombre = document.querySelector("#nombre").value;
    const apellido = document.querySelector("#apellido").value;
    const saldo = Number(document.querySelector("#saldo").value);
    const tipoCuenta = document.querySelector("#tipoCuenta").value;


    if (
        nombre === "" ||
        apellido === "" ||
        saldo <= 0 ||
        tipoCuenta === ""
    ) {

        mensaje.textContent =
            "Completá todos los campos correctamente.";

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

    mensaje.textContent =
        "Usuario agregado correctamente.";

    formularioUsuario.reset();
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
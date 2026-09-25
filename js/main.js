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
            return true;
        }

        return false;
    }
}


const datosGuardados = localStorage.getItem("usuarios");

let usuarios;

if (datosGuardados) {

    usuarios = JSON.parse(datosGuardados).map((usuario) => {

        return new Usuario(
            usuario.nombre,
            usuario.apellido,
            usuario.saldo,
            usuario.tipoCuenta
        );

    });

} else {

    usuarios = [
        new Usuario(
            "Luciano",
            "Laricchia",
            100000,
            "Cuenta corriente"
        ),

        new Usuario(
            "Juan",
            "Perez",
            50000,
            "Caja de ahorro"
        ),

        new Usuario(
            "Maria",
            "Gomez",
            200000,
            "Cuenta corriente"
        )
    ];

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

const formularioUsuario = document.querySelector("#formularioUsuario");
const contenedorUsuarios = document.querySelector("#contenedorUsuarios");
const mensaje = document.querySelector("#mensaje");
const buscar = document.querySelector("#buscar");


// Guardar usuarios en LocalStorage

function guardarUsuarios() {

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );
}


function mostrarUsuarios(lista) {

    contenedorUsuarios.innerHTML = "";

    lista.forEach((usuario) => {

        const nombre = usuario.nombre;
        const apellido = usuario.apellido;
        const saldo = usuario.saldo;
        const tipoCuenta = usuario.tipoCuenta;

        const estadoSaldo =
            saldo >= 100000
                ? "Saldo disponible"
                : "Saldo menor a $100000";


        contenedorUsuarios.innerHTML += `

            <div class="usuario">

                <h3>
                    ${nombre} ${apellido}
                </h3>

                <p>
                    Saldo: $${saldo}
                </p>

                <p>
                    Tipo de cuenta: ${tipoCuenta}
                </p>

                <p>
                    ${estadoSaldo}
                </p>

                <input
                    type="number"
                    class="inputRetiro"
                    data-nombre="${nombre}"
                    placeholder="Monto a retirar"
                >

                <button
                    class="btnSaldo"
                    data-nombre="${nombre}">
                    Consultar saldo
                </button>

                <button
                    class="btnRetirar"
                    data-nombre="${nombre}">
                    Retirar dinero
                </button>

                <button
                    class="btnEliminar"
                    data-nombre="${nombre}">
                    Eliminar
                </button>

            </div>

        `;
    });

    const botonesSaldo =
        document.querySelectorAll(".btnSaldo");

    botonesSaldo.forEach((boton) => {

        boton.addEventListener("click", () => {

            const nombreUsuario =
                boton.dataset.nombre;

            const usuario = usuarios.find(
                (usuario) =>
                    usuario.nombre === nombreUsuario
            );

            mensaje.textContent =
                usuario?.consultarSaldo() ??
                "Usuario no encontrado.";
        });
    });

    const botonesRetirar =
        document.querySelectorAll(".btnRetirar");

    botonesRetirar.forEach((boton) => {

        boton.addEventListener("click", () => {

            const nombreUsuario =
                boton.dataset.nombre;

            const usuario = usuarios.find(
                (usuario) =>
                    usuario.nombre === nombreUsuario
            );

            const inputRetiro =
                document.querySelector(
                    `.inputRetiro[data-nombre="${nombreUsuario}"]`
                );

            const cantidad =
                Number(inputRetiro?.value ?? 0);


            if (usuario?.retirarDinero(cantidad)) {

                guardarUsuarios();

                mostrarUsuarios(usuarios);

                mensaje.textContent =
                    "Retiro realizado correctamente. Nuevo saldo: $" +
                    usuario.saldo;

            } else {

                mensaje.textContent =
                    "El monto ingresado no es válido o supera el saldo disponible.";
            }
        });
    });

    const botonesEliminar =
        document.querySelectorAll(".btnEliminar");

    botonesEliminar.forEach((boton) => {

        boton.addEventListener("click", () => {

            const nombreUsuario =
                boton.dataset.nombre;

            const indice =
                usuarios.findIndex(
                    (usuario) =>
                        usuario.nombre === nombreUsuario
                );


            if (indice !== -1) {

                usuarios.splice(indice, 1);

                guardarUsuarios();

                mostrarUsuarios(usuarios);

                mensaje.textContent =
                    "Usuario eliminado correctamente.";
            }
        });
    });
}

formularioUsuario.addEventListener(
    "submit",
    (evento) => {

        evento.preventDefault();


        const nombre =
            document.querySelector("#nombre").value.trim();

        const apellido =
            document.querySelector("#apellido").value.trim();

        const saldo =
            Number(
                document.querySelector("#saldo").value
            );

        const tipoCuenta =
            document.querySelector("#tipoCuenta").value.trim();


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


        const nuevoUsuario =
            new Usuario(
                nombre,
                apellido,
                saldo,
                tipoCuenta
            );


        usuarios.push(nuevoUsuario);

        guardarUsuarios();

        mostrarUsuarios(usuarios);

        mensaje.textContent =
            "Usuario agregado correctamente.";

        formularioUsuario.reset();
    }
);


// Buscar usuario

buscar.addEventListener("keyup", () => {

    const texto =
        buscar.value.trim().toLowerCase();


    const usuariosFiltrados =
        usuarios.filter((usuario) => {

            const nombre =
                usuario.nombre.toLowerCase();

            const apellido =
                usuario.apellido.toLowerCase();


            return (
                nombre.includes(texto) ||
                apellido.includes(texto)
            );
        });


    mostrarUsuarios(usuariosFiltrados);
});

mostrarUsuarios(usuarios);
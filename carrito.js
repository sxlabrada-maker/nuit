document.addEventListener("DOMContentLoaded", function () {
    const botonesComprar = document.querySelectorAll(".btn-comprar");
    const productosCesta = document.getElementById("productos-cesta");
    const totalCesta = document.getElementById("total-cesta");
    const contador = document.querySelector(".contador");

    // Cargar carrito guardado o iniciar vacío
    let carrito = JSON.parse(localStorage.getItem("carritoNUIT")) || [];

    // Mostrar el carrito al cargar la página
    actualizarCesta();

    // Agregar producto
    botonesComprar.forEach(boton => {
        boton.addEventListener("click", function () {

            // *** CORRECCIÓN CLAVE: Obtener datos directamente de los atributos 'data-' del botón ***
            const nombre = boton.getAttribute("data-nombre");
            const precio = parseFloat(boton.getAttribute("data-precio"));
            const imagen = boton.getAttribute("data-img");

            carrito.push({ nombre, precio, imagen });
            guardarCarrito();
            actualizarCesta();
            mostrarAlerta();
        });
    });

    // Eliminar producto
    window.eliminarProducto = function (index) {
        carrito.splice(index, 1);
        guardarCarrito();
        actualizarCesta();
    };

    // Guardar carrito en localStorage
    function guardarCarrito() {
        localStorage.setItem("carritoNUIT", JSON.stringify(carrito));
    }

    // Actualizar contenido visual del carrito
    function actualizarCesta() {
        if (!productosCesta || !totalCesta || !contador) return;
        productosCesta.innerHTML = "";

        if (carrito.length === 0) {
            productosCesta.innerHTML = `<p id="cesta-vacia">Tu cesta está vacía.</p>`; // [cite: 50]
            totalCesta.textContent = "$0.00 MXN"; // [cite: 50]
            contador.textContent = "0"; // [cite: 50]
            return;
        }

        let suma = 0;
        let cantidad = carrito.length; // [cite: 51]
        carrito.forEach((item, index) => {
            suma += item.precio;
            const div = document.createElement("div");
            div.className = "d-flex justify-content-between align-items-center mb-2";
            div.innerHTML = `
                <div class="d-flex align-items-center gap-2">
                    <img src="${item.imagen}" alt="${item.nombre}" 
                         style="width:40px; height:40px; border-radius:6px; object-fit:cover;"> // [cite: 52]
                    <span>${item.nombre}</span>
                </div>
                <div>
                    <span>$${item.precio.toFixed(2)} MXN</span> // [cite: 53]
                    <button class="btn btn-sm btn-outline-danger ms-2" onclick="eliminarProducto(${index})"> X </button>
                </div>
            `;
            productosCesta.appendChild(div);
        });
        totalCesta.textContent = `$${suma.toFixed(2)} MXN`; // [cite: 54]
        contador.textContent = carrito.length; // [cite: 54]
    }

    // Mostrar alerta de producto agregado
    function mostrarAlerta() {
        const alerta = document.getElementById("alerta-producto"); // [cite: 55]
        if (!alerta) return;

        alerta.classList.remove("d-none");

        setTimeout(() => {
            alerta.classList.add("d-none");
        }, 2000); // [cite: 56]
    }
});


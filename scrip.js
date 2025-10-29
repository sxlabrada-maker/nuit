
const carrito = document.querySelector('.carrito');
const contador = document.querySelector('.contador');
let cantidad = 0;

carrito.addEventListener('click', () => {
  cantidad++;
  contador.textContent = cantidad;
});

const nombreTienda = "NUIT";
let coleccionActiva = "Colección de Otoño";
let totalProductos = 48;
let ventasMensuales = 325;
let precioPromedio = 799.99;
let tiendaActiva = true;
let hayDescuentos = false;
let cestaConProductos = false;

console.log("Nombre de la tienda:", nombreTienda);
console.log("Colección actual:", coleccionActiva);
console.log("Total de productos:", totalProductos);
console.log("Ventas mensuales:", ventasMensuales);
console.log("Precio promedio:", precioPromedio);
console.log("¿La tienda está activa?:", tiendaActiva);
console.log("¿Hay descuentos disponibles?:", hayDescuentos);
console.log("¿La cesta tiene productos?:", cestaConProductos);

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); 
  const welcomePopup = document.getElementById('welcomeMessage');
  welcomePopup.style.display = 'block'; 
  
  // Opcional: Limpia los campos del formulario
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
});

<script>
    // Inicializar variables para la cesta
    const listaCesta = document.getElementById('lista-cesta');
    const totalElement = document.getElementById('total');
    const contador = document.querySelector('.contador');
    const botonesComprar = document.querySelectorAll('.btn-comprar');
    
    let suma = 0;
    let cantidad = 0;

    // Función para manejar el clic en el botón "Comprar"
    botonesComprar.forEach(boton => { // Se corrige el error de sintaxis 'boton =>' en lugar de 'boton =>'
        boton.addEventListener('click', (e) => {
            const producto = e.target.closest('.producto');
            const nombre = producto.querySelector('.nombre-producto').textContent;
            const precioTexto = producto.querySelector('.precio').textContent;
            // Extraer solo el valor numérico del precio (quitando '$', 'MXN', comas, etc.)
            const precio = parseFloat(precioTexto.replace(/[^0-9.]/g, '')); 

            // 1. Quitar el mensaje "Tu cesta está vacía" si existe
            const vacio = listaCesta.querySelector('.text-muted');
            if (vacio) {
                vacio.remove();
            }

            // 2. Crear un nuevo ítem en la lista del carrito (offcanvas)
            const item = document.createElement('li');
            item.className = 'list-group-item d-flex justify-content-between align-items-center';
            item.innerHTML = `
                ${nombre}
                <span>$${precio.toFixed(2)}</span>
            `;
            listaCesta.appendChild(item);

            // 3. Actualizar el total y el contador de la cesta
            suma += precio;
            cantidad++;
            totalElement.textContent = `$${suma.toFixed(2)}`;
            contador.textContent = cantidad;
        });
    });
</script>
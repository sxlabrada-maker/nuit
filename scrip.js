const botonesComprar = document.querySelectorAll('.btn-comprar');
const listaCesta = document.getElementById('lista-cesta');
const totalElement = document.getElementById('total');
const contador = document.querySelector('.contador');
const vaciarBtn = document.getElementById('vaciar-cesta-btn');
let productosEnCesta = JSON.parse(localStorage.getItem('cesta')) || [];
let suma = parseFloat(localStorage.getItem('totalCesta')) || 0;

// =========================================================
// 2. FUNCIONES PRINCIPALES
// =========================================================

// Mostrar un pequeño popup visual al agregar producto
function mostrarPopup(boton) {
  const popup = document.createElement('span');
  popup.textContent = 'Agregado ✅';
  popup.classList.add('popup-agregado');
  boton.appendChild(popup);
  setTimeout(() => popup.remove(), 800);
}

// Actualizar la lista visual del carrito
function actualizarCesta() {
  listaCesta.innerHTML = '';

  if (productosEnCesta.length === 0) {
    listaCesta.innerHTML = '<li class="text-muted">Tu cesta está vacía.</li>';
    suma = 0;
  } else {
    productosEnCesta.forEach((p, index) => {
      const item = document.createElement('li');
      item.className = 'list-group-item d-flex justify-content-between align-items-center';
      item.innerHTML = `
        ${p.nombre}
        <span>$${p.precio.toFixed(2)}</span>
        <button class="btn btn-sm btn-danger eliminar-item" data-index="${index}">&times;</button>
      `;
      listaCesta.appendChild(item);
    });
  }

  totalElement.textContent = $${suma.toFixed(2)};
  contador.textContent = productosEnCesta.length;

  // Guardar en localStorage
  localStorage.setItem('cesta', JSON.stringify(productosEnCesta));
  localStorage.setItem('totalCesta', suma.toString());
}

// Agregar un producto al carrito
function agregarProducto(nombre, precio, boton) {
  productosEnCesta.push({ nombre, precio });
  suma = productosEnCesta.reduce((sum, p) => sum + p.precio, 0);
  mostrarPopup(boton);
  actualizarCesta();
}

// Eliminar producto individual
function eliminarProducto(index) {
  productosEnCesta.splice(index, 1);
  suma = productosEnCesta.reduce((sum, p) => sum + p.precio, 0);
  actualizarCesta();
}

// Vaciar toda la cesta
function vaciarCesta() {
  if (confirm("¿Vaciar la cesta completa?")) {
    productosEnCesta = [];
    suma = 0;
    actualizarCesta();
  }
}

// =========================================================
// 3. EVENTOS
// =========================================================

// Botones “Comprar”
botonesComprar.forEach(boton => {
  boton.addEventListener('click', e => {
    const producto = e.target.closest('.producto');
    const nombre = producto.querySelector('.nombre-producto').textContent;
    const precioTexto = producto.querySelector('.precio').textContent;
    const precio = parseFloat(precioTexto.replace(/[^0-9.]/g, ''));

    agregarProducto(nombre, precio, boton);
  });
});

// Eliminar individual
listaCesta.addEventListener('click', e => {
  if (e.target.classList.contains('eliminar-item')) {
    const index = parseInt(e.target.dataset.index);
    eliminarProducto(index);
  }
});

// Vaciar carrito
if (vaciarBtn) {
  vaciarBtn.addEventListener('click', vaciarCesta);
}

// =========================================================
// 4. CARGA INICIAL
// =========================================================
actualizarCesta();

// =========================================================
// 5. CSS opcional para popup
// =========================================================
const style = document.createElement('style');
style.textContent = `
.popup-agregado {
  position: absolute;
  top: -10px;
  right: 0;
  background: #222;
  color: #fff;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.75rem;
  animation: aparecer 0.8s ease;
}
@keyframes aparecer {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(style);

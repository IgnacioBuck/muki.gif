document.addEventListener('DOMContentLoaded', () => {
  const inputQty = document.getElementById('input-custom-qty');
  const btnMinus = document.getElementById('btn-custom-minus');
  const btnPlus = document.getElementById('btn-custom-plus');

  // Control del contador de cantidad
  if (btnMinus && inputQty) {
    btnMinus.addEventListener('click', () => {
      let val = parseInt(inputQty.value) || 1;
      if (val > 1) inputQty.value = val - 1;
    });
  }

  if (btnPlus && inputQty) {
    btnPlus.addEventListener('click', () => {
      let val = parseInt(inputQty.value) || 1;
      inputQty.value = val + 1;
    });
  }

  // Precios base estimados
  const preciosBase = {
    "Sticker Personalizado": 900,
    "Llavero Personalizado": 2800,
    "Cuaderno Personalizado": 5000
  };

  // Funciones del menú desplegable móvil para personalizados.html
function toggleMenuMovil() {
  const navMenu = document.getElementById('nav-menu');
  if (navMenu) {
    navMenu.classList.toggle('active');
  }
}

function cerrarMenuMovil() {
  const navMenu = document.getElementById('nav-menu');
  if (navMenu) {
    navMenu.classList.remove('active');
  }
}

  const btnAdd = document.getElementById('btn-add-custom');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      const tipoSeleccionado = document.querySelector('input[name="tipoProducto"]:checked')?.value || "Sticker Personalizado";
      const cantidad = parseInt(inputQty.value) || 1;
      const linkArchivo = document.getElementById('input-custom-link')?.value.trim() || '';

      // Crear objeto del producto personalizado
      const productoCustom = {
        id: Date.now(),
        nombre: `${tipoSeleccionado} ${linkArchivo ? '(Con Link)' : '(Adjunta por WA)'}`,
        precio: preciosBase[tipoSeleccionado] || 1000,
        imagen: "../img/LlaveroRedDeadDelante.webp",
        cantidad: cantidad
      };

      // Verificar si existe la función global del carrito
      if (typeof agregarAlCarrito === 'function') {
        agregarAlCarrito(productoCustom, cantidad);
      } else {
        console.error("No se encontró la función agregarAlCarrito. Verificar que cart.js esté cargado.");
      }
    });
  }
});
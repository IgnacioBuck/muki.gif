document.addEventListener('DOMContentLoaded', () => {
  const inputQty = document.getElementById('input-custom-qty');
  const btnMinus = document.getElementById('btn-custom-minus');
  const btnPlus = document.getElementById('btn-custom-plus');

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

  // Precios base estimados para los personalizados
  const preciosBase = {
    "Sticker Personalizado": 900,
    "Llavero Personalizado": 2800,
    "Cuaderno Personalizado": 5000
  };

  const btnAdd = document.getElementById('btn-add-custom');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      const tipoSeleccionado = document.querySelector('input[name="tipoProducto"]:checked')?.value || "Sticker Personalizado";
      const cantidad = parseInt(inputQty.value) || 1;
      const linkArchivo = document.getElementById('input-custom-link')?.value.trim() || '';

      const productoCustom = {
        id: Date.now(), // ID único temporal
        nombre: `${tipoSeleccionado} ${linkArchivo ? '(Con Link)' : '(Adjunta por WA)'}`,
        precio: preciosBase[tipoSeleccionado] || 1000,
        imagen: "../img/LlaveroRedDeadDelante.webp", // O una imagen genérica de personalizado
        cantidad: cantidad
      };

      if (typeof agregarAlCarrito === 'function') {
        agregarAlCarrito(productoCustom, cantidad);
      }
    });
  }
});
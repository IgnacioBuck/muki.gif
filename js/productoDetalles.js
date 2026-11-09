document.addEventListener('DOMContentLoaded', () => {
  // 1. Capturar el ID desde la URL (?id=X)
  const params = new URLSearchParams(window.location.search);
  let idURL = params.get('id');

  // 2. Si abres producto.html directo desde VS Code (sin ID en la URL), asigna el ID 1 por defecto
  if (!idURL) {
    idURL = "1";
  }

  // 3. Buscar el producto en el array (convertimos a String para evitar fallas)
  const producto = productos.find(p => String(p.id) === String(idURL));

  // 4. Si el ID no existe en la lista de productos
  if (!producto) {
    console.error("El producto con ID " + idURL + " no existe.");
    return;
  }

  // 5. Inyectar datos en la pantalla
  const titleEl = document.getElementById('detail-title');
  const priceEl = document.getElementById('detail-price');
  const descEl = document.getElementById('detail-description');
  const imgMain = document.getElementById('detail-img-main');

  if (titleEl) titleEl.innerText = producto.nombre;
  if (priceEl) priceEl.innerText = `$${producto.precio}`;
  if (descEl) descEl.innerText = producto.descripcion;
  if (imgMain) imgMain.src = producto.imagen;

  // Selector de cantidad (+ / -)
  const inputQty = document.getElementById('input-qty');
  
  document.getElementById('btn-minus')?.addEventListener('click', () => {
    if (inputQty && parseInt(inputQty.value) > 1) {
      inputQty.value = parseInt(inputQty.value) - 1;
    }
  });

  document.getElementById('btn-plus')?.addEventListener('click', () => {
    if (inputQty) {
      inputQty.value = parseInt(inputQty.value) + 1;
    }
  });

  // Botón Agregar al carrito
  document.getElementById('btn-add-to-cart-detail')?.addEventListener('click', () => {
    const cantidad = parseInt(inputQty?.value) || 1;
    agregarAlCarrito(producto, cantidad);
  });
});
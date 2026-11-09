// Cargar carrito guardado en localStorage o inicializar vacío
let carrito = JSON.parse(localStorage.getItem('cart_stickershop')) || [];

// Guardar en localStorage y actualizar la interfaz
function actualizarEstadoCarrito() {
  localStorage.setItem('cart_stickershop', JSON.stringify(carrito));
  renderizarCarritoUI();
}

// Agregar producto al carrito
function agregarAlCarrito(producto, cantidad = 1) {
  const itemExistente = carrito.find(item => item.id === producto.id);
  
  if (itemExistente) {
    itemExistente.cantidad += cantidad;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: cantidad
    });
  }
  
  actualizarEstadoCarrito();
  abrirCarritoDrawer();
}

// Cambiar cantidad (+1 / -1) o eliminar si llega a 0
function cambiarCantidad(id, cambio) {
  const item = carrito.find(item => item.id === id);
  if (item) {
    item.cantidad += cambio;
    if (item.cantidad <= 0) {
      carrito = carrito.filter(i => i.id !== id);
    }
    actualizarEstadoCarrito();
  }
}

// Renderizar la lista de productos dentro del menú lateral
function renderizarCarritoUI() {
  const container = document.getElementById('cart-items-container');
  const countBadge = document.getElementById('cart-count');
  const totalPrice = document.getElementById('cart-total-price');

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalMonto = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  if (countBadge) countBadge.innerText = totalItems;
  if (totalPrice) totalPrice.innerText = `$${totalMonto}`;

  if (!container) return;

  if (carrito.length === 0) {
    container.innerHTML = `<p class="empty-cart-msg">El carrito está vacío por ahora.</p>`;
    return;
  }

  container.innerHTML = carrito.map(item => `
    <div class="cart-item">
      <img src="${item.imagen}" class="cart-item-img" alt="${item.nombre}">
      <div class="cart-item-details">
        <span class="cart-item-title">${item.nombre}</span>
        <div class="cart-item-price">$${item.precio}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="cambiarCantidad(${item.id}, -1)">-</button>
          <span>${item.cantidad}</span>
          <button class="qty-btn" onclick="cambiarCantidad(${item.id}, 1)">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Controladores para abrir y cerrar el modal lateral
function abrirCarritoDrawer() {
  document.getElementById('cart-drawer')?.classList.add('active');
  document.getElementById('cart-overlay')?.classList.add('active');
}

function cerrarCarritoDrawer() {
  document.getElementById('cart-drawer')?.classList.remove('active');
  document.getElementById('cart-overlay')?.classList.remove('active');
}

// Eventos del DOM al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  renderizarCarritoUI();

  document.getElementById('open-cart-btn')?.addEventListener('click', abrirCarritoDrawer);
  document.getElementById('close-cart-btn')?.addEventListener('click', cerrarCarritoDrawer);
  document.getElementById('cart-overlay')?.addEventListener('click', cerrarCarritoDrawer);

  // Generar y enviar mensaje formateado a WhatsApp
  document.getElementById('btn-checkout-wa')?.addEventListener('click', () => {
    if (carrito.length === 0) return alert("Tu carrito está vacío.");
    
    // NÚMERO CONFIGURADO CON CÓDIGO DE PAÍS (ARGENTINA +54 9 11 6335-3057)
    const NUMERO_WHATSAPP = "5491163353057";
    
    let mensaje = "¡Hola! Quisiera realizar el siguiente pedido desde Muki.gif:\n\n";
    let total = 0;
    
    carrito.forEach(item => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;
      mensaje += `• ${item.cantidad}x ${item.nombre} ($${subtotal})\n`;
    });
    
    mensaje += `\n*Total a pagar: $${total}*\n\n`;
    mensaje += "¿Cómo podemos coordinar la entrega y el pago?";
    
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`, '_blank');
  });
});
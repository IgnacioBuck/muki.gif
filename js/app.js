document.addEventListener('DOMContentLoaded', () => {
  // Renderizar las grillas dinámicas
  renderizarSeccion('destacados', 'grid-top-sellers');
  renderizarSeccion('stickers', 'grid-stickers');
  renderizarSeccion('llaveros', 'grid-llaveros');
  renderizarSeccion('cuadernos', 'grid-cuadernos'); // <-- SECCIÓN CUADERNOS AGREGADA
});

// Capturador global de clics para garantizar que el Hero responda
document.addEventListener('click', (e) => {
  // 1. Botón "Comprar" del Hero Banner
  const btnBuy = e.target.closest('#btn-buy-featured');
  if (btnBuy) {
    e.preventDefault();
    window.location.href = 'producto.html?id=1';
    return;
  }

  // 2. Botón "Agregar al carrito" del Hero Banner
  const btnAdd = e.target.closest('#btn-add-featured');
  if (btnAdd) {
    e.preventDefault();
    const listaBase = typeof productos !== 'undefined' ? productos : (typeof producto !== 'undefined' ? producto : []);
    const productoDestacado = listaBase.find(p => p.id === 1) || listaBase[0];

    if (productoDestacado && typeof agregarAlCarrito === 'function') {
      agregarAlCarrito(productoDestacado, 1);
    } else {
      console.error("No se encontró el producto o falta cart.js");
    }
  }
});

function renderizarSeccion(categoria, idContenedor) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  const listaBase = typeof productos !== 'undefined' ? productos : (typeof producto !== 'undefined' ? producto : []);

  let listaFiltro = [];
  if (categoria === 'destacados') {
    listaFiltro = listaBase.filter(p => p.destacado);
  } else {
    listaFiltro = listaBase.filter(p => p.categoria === categoria);
  }

  if (listaFiltro.length === 0) return;

  contenedor.innerHTML = listaFiltro.map(prod => `
    <article class="product-card">
      <div class="card-img-wrapper" onclick="irAlDetalle(${prod.id})">
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <button type="button" class="btn-quick-add" onclick="event.stopPropagation(); agregarAlCarritoPorId(${prod.id})" title="Agregar al carrito">
          <span class="material-symbols-outlined">add</span>
        </button>
      </div>
      <div class="card-content">
        <h4 class="card-title">${prod.nombre}</h4>
        <p class="card-description">${prod.descripcion}</p>
        <div class="card-price">$${prod.precio}</div>
        <a href="producto.html?id=${prod.id}" class="btn-buy-now">Comprar</a>
      </div>
    </article>
  `).join('');
}

function irAlDetalle(id) {
  window.location.href = `producto.html?id=${id}`;
}

// Abrir y cerrar el menú desplegable en celulares
function toggleMenuMovil() {
  const navMenu = document.getElementById('nav-menu');
  if (navMenu) {
    navMenu.classList.toggle('active');
  }
}

// Cerrar el menú automáticamente al hacer clic en una sección
function cerrarMenuMovil() {
  const navMenu = document.getElementById('nav-menu');
  if (navMenu) {
    navMenu.classList.remove('active');
  }
}

window.agregarAlCarritoPorId = function(id) {
  const listaBase = typeof productos !== 'undefined' ? productos : (typeof producto !== 'undefined' ? producto : []);
  const prod = listaBase.find(p => p.id === id);
  if (prod && typeof agregarAlCarrito === 'function') {
    agregarAlCarrito(prod, 1);
  }
};
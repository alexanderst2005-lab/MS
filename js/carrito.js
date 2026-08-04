/**
 * Módulo de Gestión del Carrito de Compras MS Boutique (LocalStorage)
 * Maneja el estado del carrito con desglose profesional y eliminaciones seguras.
 */

// SVG Placeholder elegante global para productos e imágenes en bolsa
const PLACEHOLDER_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23F4ECE1"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="Playfair Display, serif" font-size="38" font-weight="bold" fill="%23C5A880">MS</text><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-family="Poppins, sans-serif" font-size="13" font-weight="500" fill="%23737373" letter-spacing="2">ESPACIO FOTO</text></svg>`;

// Formateador de moneda en pesos colombianos (COP)
const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(valor);
};

// Obtener carrito desde LocalStorage
const obtenerCarrito = () => {
    return JSON.parse(localStorage.getItem('carrito_ms')) || [];
};

// Guardar carrito en LocalStorage
const guardarCarrito = (carrito) => {
    localStorage.setItem('carrito_ms', JSON.stringify(carrito));
    actualizarContadoresUI();
    renderizarOffcanvasCarrito();
    if (typeof renderizarPaginaCarrito === 'function') {
        renderizarPaginaCarrito();
    }
};

// Actualizar badges e indicadores del carrito en la UI
const actualizarContadoresUI = () => {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    
    const badges = document.querySelectorAll('.cart-counter');
    badges.forEach(badge => {
        badge.innerText = totalItems;
        badge.classList.remove('pop-in');
        void badge.offsetWidth;
        badge.classList.add('pop-in');
    });
};

// Agregar producto al carrito
const agregarAlCarrito = (productoId, tallaSeleccionada = null, cantidad = 1) => {
    const producto = productos.find(p => p.id === productoId);
    if (!producto) return;

    const tieneTallas = producto.tallas && producto.tallas.length > 0;
    const talla = tieneTallas ? (tallaSeleccionada || producto.tallas[0] || 'M') : '';
    let carrito = obtenerCarrito();

    const index = carrito.findIndex(item => item.id === productoId && item.talla === talla);

    if (index !== -1) {
        carrito[index].cantidad += cantidad;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: (producto.imagenes && producto.imagenes[0]) ? producto.imagenes[0] : '',
            categoria: producto.categoria,
            talla: talla,
            cantidad: cantidad
        });
    }

    guardarCarrito(carrito);
    const mensajeTalla = talla ? ` (Talla ${talla})` : '';
    mostrarToastNotificacion(`¡${producto.nombre}${mensajeTalla} agregado a tu bolsa!`);
};

// Modificar cantidad de un ítem (+ / -)
const cambiarCantidadItem = (productoId, talla, cambio) => {
    let carrito = obtenerCarrito();
    const index = carrito.findIndex(item => item.id === productoId && item.talla === talla);

    if (index !== -1) {
        carrito[index].cantidad += cambio;
        if (carrito[index].cantidad <= 0) {
            carrito.splice(index, 1);
        }
        guardarCarrito(carrito);
    }
};

// Eliminar ítem individualmente de forma inmediata
const eliminarDelCarrito = (productoId, talla) => {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => !(item.id === productoId && item.talla === (talla || '')));
    guardarCarrito(carrito);
    mostrarToastNotificacion('Producto eliminado de tu bolsa');
};

// Vaciar carrito completamente
const vaciarCarrito = () => {
    localStorage.removeItem('carrito_ms');
    actualizarContadoresUI();
    renderizarOffcanvasCarrito();
    if (typeof renderizarPaginaCarrito === 'function') {
        renderizarPaginaCarrito();
    }
};

// Renderizar el contenido del Offcanvas (Drawer Lateral) con diseño estricto y compacto
const renderizarOffcanvasCarrito = () => {
    const contenedorItems = document.getElementById('offcanvas-cart-items');
    const totalElemento = document.getElementById('offcanvas-cart-total');
    if (!contenedorItems) return;

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        contenedorItems.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-bag-heart text-muted display-1"></i>
                <p class="mt-3 text-muted fw-medium font-heading fs-5">Tu bolsa de compras está vacía.</p>
                <a href="catalogo.html" class="btn btn-boutique-outline btn-sm mt-2">Explorar Catálogo MS</a>
            </div>
        `;
        if (totalElemento) totalElemento.innerText = formatearMoneda(0);
        return;
    }

    let html = '';
    let totalGeneral = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        totalGeneral += subtotal;

        const htmlTalla = item.talla ? `<span class="badge bg-dark text-warning me-1" style="font-size:0.7rem;">Talla: ${item.talla}</span>` : '<span class="badge bg-secondary me-1" style="font-size:0.7rem;">Sin Talla</span>';
        const imgItem = (item.imagen && item.imagen.trim() !== '') ? item.imagen : PLACEHOLDER_SVG;

        html += `
            <div class="cart-item-card p-2 border rounded-3 mb-3 bg-white shadow-sm">
                <div class="d-flex align-items-center gap-3">
                    <!-- Contenedor estricto de imagen 70x70px -->
                    <div class="cart-item-img-box">
                        <img src="${imgItem}" 
                             alt="${item.nombre}" 
                             onerror="this.onerror=null; this.src='${PLACEHOLDER_SVG}';" 
                             class="cart-item-img">
                    </div>
                    
                    <!-- Información detallada del producto -->
                    <div class="flex-grow-1 overflow-hidden">
                        <div class="text-uppercase text-warning fw-bold small" style="font-size: 0.65rem; letter-spacing: 1px;">${item.categoria}</div>
                        <h6 class="mb-1 text-truncate font-heading fw-bold" style="font-size: 0.95rem;">${item.nombre}</h6>
                        <div class="d-flex align-items-center gap-1 mb-1">
                            ${htmlTalla}
                            <span class="text-muted small">${formatearMoneda(item.precio)} u.</span>
                        </div>
                        <div class="fw-bold text-dark small">
                            Subtotal: <span class="text-primary-dark">${formatearMoneda(subtotal)}</span>
                        </div>
                    </div>

                    <!-- Botón Eliminar y Selector + / - -->
                    <div class="d-flex flex-column align-items-end justify-content-between gap-2">
                        <button class="btn btn-sm btn-outline-danger border-0 px-2 py-1" 
                                onclick="eliminarDelCarrito(${item.id}, '${item.talla}')" 
                                title="Eliminar este producto">
                            <i class="bi bi-trash fs-5"></i>
                        </button>
                        
                        <div class="btn-group btn-group-sm border rounded-pill bg-light">
                            <button class="btn btn-sm btn-light px-2 py-0" onclick="cambiarCantidadItem(${item.id}, '${item.talla}', -1)">-</button>
                            <span class="px-2 align-self-center font-monospace fw-bold small">${item.cantidad}</span>
                            <button class="btn btn-sm btn-light px-2 py-0" onclick="cambiarCantidadItem(${item.id}, '${item.talla}', 1)">+</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    contenedorItems.innerHTML = html;
    if (totalElemento) totalElemento.innerText = formatearMoneda(totalGeneral);
};

// Toast Notificación
const mostrarToastNotificacion = (mensaje) => {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="bi bi-check-circle-fill text-warning me-2"></i> <span>${mensaje}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
};

document.addEventListener('DOMContentLoaded', () => {
    actualizarContadoresUI();
    renderizarOffcanvasCarrito();
});

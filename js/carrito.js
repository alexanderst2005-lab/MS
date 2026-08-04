/**
 * Módulo de Gestión del Carrito de Compras MS Boutique (LocalStorage)
 * Maneja el estado del carrito con desglose profesional y eliminaciones seguras.
 */

// SVG Placeholder elegante global para productos e imágenes en bolsa
if (typeof window.PLACEHOLDER_SVG === 'undefined') {
    window.PLACEHOLDER_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23F4ECE1"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="Playfair Display, serif" font-size="38" font-weight="bold" fill="%23C5A880">MS</text><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-family="Poppins, sans-serif" font-size="13" font-weight="500" fill="%23737373" letter-spacing="2">ESPACIO FOTO</text></svg>`;
}

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
    mostrarToastNotificacion(producto.nombre, talla);
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

// Renderizar el contenido del Offcanvas (Drawer Lateral) con el diseño exacto de la imagen
const renderizarOffcanvasCarrito = () => {
    const contenedorItems = document.getElementById('offcanvas-cart-items');
    const totalElemento = document.getElementById('offcanvas-cart-total');
    const counterHeader = document.getElementById('offcanvas-header-counter');
    if (!contenedorItems) return;

    const carrito = obtenerCarrito();
    const totalCantidadItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    if (counterHeader) counterHeader.innerText = totalCantidadItems;

    if (carrito.length === 0) {
        contenedorItems.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-bag-heart text-muted display-3"></i>
                <p class="mt-3 text-muted fw-medium font-heading fs-6">Tu carrito está vacío.</p>
                <a href="catalogo.html" class="btn btn-boutique-outline btn-sm mt-2">Explorar Catálogo</a>
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

        const textoTalla = item.talla ? `Talla: ${item.talla}` : 'Talla por defecto';
        const imgItem = (item.imagen && item.imagen.trim() !== '') ? item.imagen : window.PLACEHOLDER_SVG;

        html += `
            <div class="cart-item-row p-3 mb-3">
                <div class="d-flex gap-3 align-items-center">
                    <!-- Imagen Cuadrada 75x75px -->
                    <div class="cart-item-img-container">
                        <img src="${imgItem}" 
                             alt="${item.nombre}" 
                             onerror="this.onerror=null; this.src=window.PLACEHOLDER_SVG;">
                    </div>
                    
                    <!-- Contenido principal -->
                    <div class="flex-grow-1 overflow-hidden">
                        <!-- Título y Basura -->
                        <div class="d-flex justify-content-between align-items-start gap-2 mb-1">
                            <h6 class="cart-item-title mb-0 text-truncate">${item.nombre}</h6>
                            <button class="btn btn-sm btn-link cart-delete-btn p-0 border-0 ms-1" 
                                    onclick="eliminarDelCarrito(${item.id}, '${item.talla}')" 
                                    title="Eliminar este producto">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                        
                        <!-- Talla -->
                        <div class="cart-item-subtitle mb-2">${textoTalla}</div>
                        
                        <!-- Precio y Controles (+ / -) -->
                        <div class="d-flex justify-content-between align-items-center mt-1">
                            <span class="cart-item-price">${formatearMoneda(subtotal)}</span>
                            
                            <div class="cart-qty-pill">
                                <button onclick="cambiarCantidadItem(${item.id}, '${item.talla}', -1)">-</button>
                                <span>${item.cantidad}</span>
                                <button onclick="cambiarCantidadItem(${item.id}, '${item.talla}', 1)">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    contenedorItems.innerHTML = html;
    if (totalElemento) totalElemento.innerText = formatearMoneda(totalGeneral);
};

// Toast Notificación Compacto & Elegante
const mostrarToastNotificacion = (nombreProducto, talla = '') => {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }

    const badgeTalla = talla ? `<span class="badge bg-gold text-dark ms-1" style="font-size: 0.62rem; padding: 2px 5px;">${talla}</span>` : '';

    toast.innerHTML = `
        <div class="toast-icon-box">
            <i class="bi bi-bag-check-fill"></i>
        </div>
        <div class="toast-content-text">
            <div class="toast-title">${nombreProducto} ${badgeTalla}</div>
            <div class="toast-sub">¡Agregado a tu bolsa!</div>
        </div>
    `;

    toast.classList.remove('show');
    void toast.offsetWidth; // Reflow para reiniciar animación spring
    toast.classList.add('show');

    if (window.toastTimeout) clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
};

document.addEventListener('DOMContentLoaded', () => {
    actualizarContadoresUI();
    renderizarOffcanvasCarrito();
});

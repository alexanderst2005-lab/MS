/**
 * Lógica Principal de MS Boutique
 * Grilla de tarjetas compactas y elegantes (4 por fila en escritorio).
 */

if (typeof window.PLACEHOLDER_SVG === 'undefined') {
    window.PLACEHOLDER_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23F4ECE1"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="Playfair Display, serif" font-size="38" font-weight="bold" fill="%23C5A880">MS</text><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-family="Poppins, sans-serif" font-size="13" font-weight="500" fill="%23737373" letter-spacing="2">ESPACIO PARA FOTOGRAFÍA</text></svg>`;
}

const crearTarjetaProductoHTML = (producto) => {
    const tieneTallas = producto.tallas && producto.tallas.length > 0;

    let controlesTallaHTML = '';
    if (tieneTallas) {
        const opcionesTallasHTML = producto.tallas.map(talla => `<option value="${talla}">${talla}</option>`).join('');
        controlesTallaHTML = `
            <select class="form-select size-select-box py-1 px-2" id="talla-select-${producto.id}">
                ${opcionesTallasHTML}
            </select>
        `;
    } else {
        controlesTallaHTML = `
            <select class="form-select size-select-box text-muted py-1 px-2" id="talla-select-${producto.id}" disabled style="opacity: 0.7;">
                <option value="">Única</option>
            </select>
        `;
    }

    const controlesHTML = `
        <div class="row g-1 mb-2 product-controls-row">
            <div class="col-7">
                ${controlesTallaHTML}
            </div>
            <div class="col-5">
                <input type="number" class="form-control size-select-box text-center py-1 px-1" id="cantidad-input-${producto.id}" value="1" min="1" max="10">
            </div>
        </div>
    `;

    const rutaImagen = (producto.imagenes && producto.imagenes[0]) ? producto.imagenes[0] : window.PLACEHOLDER_SVG;

    return `
        <div class="col-6 col-md-4 col-xl-3 mb-3 fade-in-up">
            <div class="product-card-premium">
                <div class="product-img-box">
                    <img src="${rutaImagen}" 
                         alt="${producto.nombre}" 
                         onerror="this.onerror=null; this.src=window.PLACEHOLDER_SVG;" 
                         loading="lazy">
                </div>
                <div class="product-body-content">
                    <div class="product-category-tag">${producto.categoria}</div>
                    <h5 class="product-title-text" title="${producto.nombre}">${producto.nombre}</h5>
                    <div class="product-price-tag">${formatearMoneda(producto.precio)}</div>
                    
                    <div class="mt-auto">
                        ${controlesHTML}
                        
                        <button class="btn btn-boutique-primary w-100 py-1.5 btn-sm text-uppercase fw-bold btn-agregar-card" onclick="eventoAgregarAlCarrito(${producto.id})">
                            <i class="bi bi-bag-plus me-1"></i> Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

const eventoAgregarAlCarrito = (productoId) => {
    const producto = productos.find(p => p.id === productoId);
    if (!producto) return;

    const tieneTallas = producto.tallas && producto.tallas.length > 0;
    const selectTalla = document.getElementById(`talla-select-${productoId}`);
    const inputCantidad = document.getElementById(`cantidad-input-${productoId}`);

    const talla = tieneTallas ? (selectTalla ? selectTalla.value : 'M') : null;
    const cantidad = inputCantidad ? parseInt(inputCantidad.value) || 1 : 1;

    agregarAlCarrito(productoId, talla, cantidad);
};

const renderizarGrillaProductos = (contenedorId, opcionesFiltro = {}) => {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    let lista = [...productos];

    if (opcionesFiltro.categoria && opcionesFiltro.categoria.toLowerCase() !== 'todos') {
        const catClean = opcionesFiltro.categoria.toLowerCase().trim();
        lista = lista.filter(p => p.categoria.toLowerCase().trim() === catClean);
    }

    if (opcionesFiltro.destacado) {
        lista = lista.filter(p => p.destacado);
    }
    if (opcionesFiltro.nuevo) {
        lista = lista.filter(p => p.nuevo);
    }

    if (opcionesFiltro.orden) {
        if (opcionesFiltro.orden === 'precio-asc') {
            lista.sort((a, b) => a.precio - b.precio);
        } else if (opcionesFiltro.orden === 'precio-desc') {
            lista.sort((a, b) => b.precio - a.precio);
        }
    }

    if (lista.length === 0) {
        contenedor.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-bag-x text-muted display-4"></i>
                <h5 class="mt-3 font-heading">No se encontraron productos en esta categoría</h5>
                <p class="text-muted">Explora nuestras otras colecciones o restablece los filtros.</p>
            </div>
        `;
        return;
    }

    contenedor.innerHTML = lista.map(p => crearTarjetaProductoHTML(p)).join('');
};

document.addEventListener('DOMContentLoaded', () => {
    renderizarGrillaProductos('productos-destacados-container', { destacado: true });
    renderizarGrillaProductos('productos-nuevos-container', { nuevo: true });

    const searchNavbar = document.getElementById('search-navbar-input');
    if (searchNavbar) {
        searchNavbar.addEventListener('input', (e) => {
            const query = e.target.value;
            const catalogoContainer = document.getElementById('catalogo-grid-container');
            if (catalogoContainer) {
                renderizarGrillaProductos('catalogo-grid-container', { busqueda: query });
            }
        });
    }
});

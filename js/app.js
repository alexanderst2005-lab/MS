/**
 * Lógica Principal de MS Boutique
 * Grilla de tarjetas compactas y elegantes (4 por fila en escritorio).
 */

if (typeof window.PLACEHOLDER_SVG === 'undefined') {
    window.PLACEHOLDER_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23F4ECE1"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="Playfair Display, serif" font-size="38" font-weight="bold" fill="%23C5A880">MS</text><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-family="Poppins, sans-serif" font-size="13" font-weight="500" fill="%23737373" letter-spacing="2">ESPACIO PARA FOTOGRAFÍA</text></svg>`;
}

const crearTarjetaProductoHTML = (producto) => {
    let badgeHTML = '';
    if (producto.nuevo) {
        badgeHTML = `<span class="badge-boutique badge-nuevo">Novedad</span>`;
    } else if (producto.masVendido) {
        badgeHTML = `<span class="badge-boutique badge-mas-vendido">Exclusive</span>`;
    }

    const tieneTallas = producto.tallas && producto.tallas.length > 0;
    
    let controlesHTML = '';
    if (tieneTallas) {
        const opcionesTallasHTML = producto.tallas.map(talla => `<option value="${talla}">${talla}</option>`).join('');
        controlesHTML = `
            <div class="row g-2 mb-2">
                <div class="col-7">
                    <select class="form-select size-select-box" id="talla-select-${producto.id}">
                        ${opcionesTallasHTML}
                    </select>
                </div>
                <div class="col-5">
                    <input type="number" class="form-control size-select-box text-center" id="cantidad-input-${producto.id}" value="1" min="1" max="10">
                </div>
            </div>
        `;
    } else {
        controlesHTML = `
            <div class="mb-2">
                <input type="number" class="form-control size-select-box text-center" id="cantidad-input-${producto.id}" value="1" min="1" max="10" placeholder="Cant.">
            </div>
        `;
    }

    const rutaImagen = (producto.imagenes && producto.imagenes[0]) ? producto.imagenes[0] : window.PLACEHOLDER_SVG;

    return `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 fade-in-up">
            <div class="product-card-premium">
                <div class="product-img-box">
                    ${badgeHTML}
                    <img src="${rutaImagen}" 
                         alt="${producto.nombre}" 
                         onerror="this.onerror=null; this.src=window.PLACEHOLDER_SVG;" 
                         loading="lazy">
                </div>
                <div class="product-body-content">
                    <div class="product-category-tag">${producto.categoria}</div>
                    <h5 class="product-title-text text-truncate">${producto.nombre}</h5>
                    <div class="product-price-tag">${formatearMoneda(producto.precio)}</div>
                    
                    <div class="mt-auto">
                        ${controlesHTML}
                        
                        <button class="btn btn-boutique-primary w-100 py-2 btn-sm" onclick="eventoAgregarAlCarrito(${producto.id})">
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

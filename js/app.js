/**
 * Lógica Principal de MS Boutique
 * Grilla de tarjetas compactas y elegantes (4 por fila en escritorio).
 */

if (typeof window.PLACEHOLDER_SVG === 'undefined') {
    window.PLACEHOLDER_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23F4ECE1"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="Playfair Display, serif" font-size="38" font-weight="bold" fill="%23C5A880">MS</text><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-family="Poppins, sans-serif" font-size="13" font-weight="500" fill="%23737373" letter-spacing="2">ESPACIO PARA FOTOGRAFÍA</text></svg>`;
}

// ==========================================
// VISOR DE IMÁGENES / LIGHTBOX HIGH-FASHION
// ==========================================
const abrirVisorImagen = (src, titulo = '') => {
    let visorModal = document.getElementById('modal-visor-imagen');
    if (!visorModal) {
        visorModal = document.createElement('div');
        visorModal.id = 'modal-visor-imagen';
        visorModal.className = 'visor-imagen-backdrop';
        visorModal.innerHTML = `
            <div class="visor-imagen-container">
                <button type="button" class="visor-btn-cerrar" onclick="cerrarVisorImagen()" aria-label="Cerrar">&times;</button>
                <div class="visor-img-wrapper">
                    <img id="visor-img-element" src="" alt="Vista ampliada del producto">
                </div>
                <div class="visor-caption-text" id="visor-caption-element"></div>
            </div>
        `;
        document.body.appendChild(visorModal);

        visorModal.addEventListener('click', (e) => {
            if (e.target === visorModal || e.target.classList.contains('visor-imagen-container')) {
                cerrarVisorImagen();
            }
        });
    }

    const imgEl = document.getElementById('visor-img-element');
    const captionEl = document.getElementById('visor-caption-element');
    if (imgEl) imgEl.src = src;
    if (captionEl) captionEl.innerText = titulo;

    visorModal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

const cerrarVisorImagen = () => {
    const visorModal = document.getElementById('modal-visor-imagen');
    if (visorModal) {
        visorModal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

const crearTarjetaProductoHTML = (producto) => {
    const tieneTallas = producto.tallas && producto.tallas.length > 0;
const crearTarjetaProductoHTML = (producto, index = 0) => {
    if (!producto) return '';

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
                <option value="Única">Única</option>
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
    const nombreLimpio = producto.nombre.replace(/'/g, "\\'");

    let categoriaEtiqueta = producto.categoria || '';
    if (categoriaEtiqueta.toLowerCase() === 'splash') {
        categoriaEtiqueta = 'Productos Purpure';
    } else if (categoriaEtiqueta.toLowerCase() === 'pijamas') {
        categoriaEtiqueta = 'Pijamas';
    } else if (categoriaEtiqueta.toLowerCase() === 'accesorios') {
        categoriaEtiqueta = 'Accesorios';
    } else if (categoriaEtiqueta.toLowerCase() === 'bodys') {
        categoriaEtiqueta = 'Bodys';
    }

    const loadingAttr = index < 8 ? 'eager' : 'lazy';

    return `
        <div class="col-6 col-md-4 col-xl-3 mb-3 fade-in-up">
            <div class="product-card-premium">
                <div class="product-img-box" onclick="abrirVisorImagen('${rutaImagen}', '${nombreLimpio}')" title="Toca para ampliar la imagen de ${producto.nombre}">
                    <img src="${rutaImagen}" 
                         alt="${producto.nombre}" 
                         onerror="this.onerror=null; this.src=window.PLACEHOLDER_SVG;" 
                         loading="${loadingAttr}">
                    <div class="img-zoom-badge">
                        <i class="bi bi-arrows-angle-expand"></i>
                    </div>
                </div>
                <div class="product-body-content">
                    <div class="product-category-tag">${categoriaEtiqueta}</div>
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
        if (catClean === 'bodys') {
            contenedor.innerHTML = `
                <div class="col-12 text-center py-5 fade-in-up">
                    <div class="card border-0 shadow-sm rounded-4 p-5 mx-auto max-w-600" style="border: 1px solid rgba(197, 168, 128, 0.3) !important; background: var(--color-surface);">
                        <i class="bi bi-stars text-gold display-3 mb-3"></i>
                        <h3 class="font-heading fw-bold text-uppercase letter-spacing-2">Próximamente</h3>
                        <p class="text-muted font-body fs-6 mt-2 mb-0">Muy pronto tendremos nuevos modelos disponibles.</p>
                    </div>
                </div>
            `;
            return;
        }
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

    contenedor.innerHTML = lista.map((p, i) => crearTarjetaProductoHTML(p, i)).join('');
};

document.addEventListener('DOMContentLoaded', () => {
    // Preload all product images in background to make them instant when scrolling
    window.addEventListener('load', () => {
        setTimeout(() => {
            productos.forEach(p => {
                if (p.imagenes && p.imagenes[0]) {
                    const img = new Image();
                    img.src = p.imagenes[0];
                }
            });
        }, 1000); // Delay preloading slightly to not interfere with initial render
    });

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

    // Tecla ESC para cerrar el visor de imagen
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') cerrarVisorImagen();
    });
});

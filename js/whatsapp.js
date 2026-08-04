/**
 * Módulo de Integración con WhatsApp para Checkout MS Boutique.
 * Muestra un modal de vista previa antes de abrir la API de WhatsApp,
 * permitiendo al cliente revisar exactamente su compra y datos de entrega.
 */

const TELEFONO_WHATSAPP_BOUTIQUE = "573000000000";

const procesarPedidoWhatsApp = (event) => {
    if (event) event.preventDefault();

    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
        mostrarToastNotificacion("⚠️ Tu bolsa está vacía. Agrega productos antes de finalizar tu orden.");
        return;
    }

    const nombre = document.getElementById('cliente-nombre')?.value.trim() || '';
    const telefono = document.getElementById('cliente-telefono')?.value.trim() || '';
    const direccion = document.getElementById('cliente-direccion')?.value.trim() || '';
    const ciudad = document.getElementById('cliente-ciudad')?.value.trim() || '';
    const notas = document.getElementById('cliente-notas')?.value.trim() || '';

    if (!nombre || !telefono || !direccion || !ciudad) {
        alert("Por favor completa los campos de Nombre, Teléfono, Dirección y Ciudad para enviar tu pedido.");
        return;
    }

    let totalPedido = 0;
    let totalCantidadArticulos = 0;
    let resumenProductosTexto = "";
    let htmlPrevisualizacionProductos = "";

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        totalPedido += subtotal;
        totalCantidadArticulos += item.cantidad;

        const lineaTallaTexto = item.talla ? `   - Talla: ${item.talla}\n` : '';
        const badgeTallaHTML = item.talla ? `<span class="badge bg-dark text-warning">Talla: ${item.talla}</span>` : '<span class="badge bg-secondary">Sin Talla</span>';

        resumenProductosTexto += `${index + 1}. *${item.nombre}*\n   - Categoría: ${item.categoria}\n${lineaTallaTexto}   - Precio Unitario: ${formatearMoneda(item.precio)}\n   - Cantidad: ${item.cantidad}\n   - Subtotal: ${formatearMoneda(subtotal)}\n\n`;

        htmlPrevisualizacionProductos += `
            <div class="d-flex justify-content-between align-items-center py-2 border-bottom">
                <div>
                    <h6 class="font-heading fw-bold mb-1" style="font-size: 0.95rem;">${item.nombre}</h6>
                    <div class="small text-muted">
                        ${badgeTallaHTML} | ${item.cantidad} u. x ${formatearMoneda(item.precio)}
                    </div>
                </div>
                <div class="fw-bold font-body text-dark">${formatearMoneda(subtotal)}</div>
            </div>
        `;
    });

    const mensajeWhatsApp = 
`✨ *ORDEN EXCLUSIVA - MS BOUTIQUE* ✨

🛍️ *RESUMEN DE LA COMPRA (${totalCantidadArticulos} ${totalCantidadArticulos === 1 ? 'artículo' : 'artículos'}):*

${resumenProductosTexto}----------------------------------
📦 *CANTIDAD TOTAL:* ${totalCantidadArticulos} artículos
💰 *VALOR TOTAL A PAGAR:* ${formatearMoneda(totalPedido)} COP

📍 *DATOS DE ENVÍO Y CONTACTO:*
👤 *Nombre:* ${nombre}
📞 *Teléfono:* ${telefono}
🏠 *Dirección:* ${direccion}
🏙️ *Ciudad:* ${ciudad}
${notas ? `📝 *Observaciones:* ${notas}\n` : ''}----------------------------------
¡Hola MS Boutique! Deseo confirmar la disponibilidad de mi pedido y recibir las instrucciones de pago. 💎`;

    // Renderizar modal de previsualización antes de abrir WhatsApp
    const modalResumenBody = document.getElementById('modal-confirmacion-productos');
    const modalDatosEnvio = document.getElementById('modal-confirmacion-datos');
    const modalTotalText = document.getElementById('modal-confirmacion-total');
    const btnConfirmarEnviar = document.getElementById('btn-confirmar-whatsapp-final');

    if (modalResumenBody) modalResumenBody.innerHTML = htmlPrevisualizacionProductos;
    if (modalTotalText) modalTotalText.innerText = `${formatearMoneda(totalPedido)} (${totalCantidadArticulos} items)`;
    if (modalDatosEnvio) {
        modalDatosEnvio.innerHTML = `
            <strong>${nombre}</strong><br>
            📞 ${telefono} | 🏙️ ${ciudad}<br>
            🏠 ${direccion}<br>
            ${notas ? `<em class="text-muted">Notas: ${notas}</em>` : ''}
        `;
    }

    if (btnConfirmarEnviar) {
        btnConfirmarEnviar.onclick = () => {
            const urlWhatsApp = `https://api.whatsapp.com/send?phone=${TELEFONO_WHATSAPP_BOUTIQUE}&text=${encodeURIComponent(mensajeWhatsApp)}`;
            window.open(urlWhatsApp, '_blank');
        };
    }

    // Mostrar modal Bootstrap
    const modalElement = document.getElementById('modalConfirmacionPedido');
    if (modalElement && typeof bootstrap !== 'undefined') {
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
    } else {
        // Fallback directo si no hay modal
        const urlWhatsApp = `https://api.whatsapp.com/send?phone=${TELEFONO_WHATSAPP_BOUTIQUE}&text=${encodeURIComponent(mensajeWhatsApp)}`;
        window.open(urlWhatsApp, '_blank');
    }
};

/**
 * Módulo de Integración con WhatsApp para Checkout MS Boutique.
 * Muestra un modal de vista previa antes de abrir la API de WhatsApp,
 * permitiendo al cliente revisar exactamente su compra y datos de entrega.
 */

const TELEFONO_WHATSAPP_BOUTIQUE = "573136714812";

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

    // Abrir WhatsApp directamente con la orden completa
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${TELEFONO_WHATSAPP_BOUTIQUE}&text=${encodeURIComponent(mensajeWhatsApp)}`;
    window.open(urlWhatsApp, '_blank');
};

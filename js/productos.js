/**
 * Base de datos centralizada de productos MS Boutique.
 * 
 * CATÁLOGO COMPLETO:
 * - 6 Bodys (Tallas: S, M, L)
 * - 10 Pijamas (Tallas: S, M, L)
 * - 6 Accesorios (Sin talla, solo cantidad)
 */

const productos = [
    // ==========================================
    // --- CATEGORÍA: BODYS (6 Productos - Tallas: S, M, L) ---
    // ==========================================
    {
        id: 1,
        nombre: "Body Encaje Elegance Nuit",
        precio: 85000,
        categoria: "bodys",
        tallas: ["S", "M", "L"],
        color: "Negro Azabache",
        material: "Encaje Francés & Seda Elástica",
        descripcion: "Diseño sofisticado con escote pronunciado en V y detalles de encaje de alta costura.",
        imagenes: ["img/productos/body-1.jpg"],
        destacado: true,
        nuevo: true,
        masVendido: true
    },
    {
        id: 2,
        nombre: "Body Minimalist Silk Nude",
        precio: 78000,
        categoria: "bodys",
        tallas: ["S", "M", "L"],
        color: "Nude Marfil",
        material: "Microfibra de Alta Densidad & Satén",
        descripcion: "Corte limpio efecto segunda piel, perfecto para combinar con blazers o pantalones de tiro alto.",
        imagenes: ["img/productos/body-2.jpg"],
        destacado: true,
        nuevo: false,
        masVendido: true
    },
    {
        id: 3,
        nombre: "Body Manga Larga Velvet Touch",
        precio: 92000,
        categoria: "bodys",
        tallas: ["S", "M", "L"],
        color: "Vino Tinto / Burdeos",
        material: "Terciopelo Elástico Premium",
        descripcion: "Elegante body de terciopelo con espalda descubierta y broches invisibles de alta durabilidad.",
        imagenes: ["img/productos/body-3.jpg"],
        destacado: false,
        nuevo: true,
        masVendido: false
    },
    {
        id: 4,
        nombre: "Body Asimétrico Golden Hour",
        precio: 89000,
        categoria: "bodys",
        tallas: ["S", "M", "L"],
        color: "Dorado Champagne",
        material: "Seda Satén y Licra de Ajuste Perfecto",
        descripcion: "Diseño vanguardista de un solo hombro con pliegues estructurados y acabado satinado.",
        imagenes: ["img/productos/body-4.jpg"],
        destacado: true,
        nuevo: false,
        masVendido: true
    },
    {
        id: 5,
        nombre: "Body Corsetería Royal Mesh",
        precio: 95000,
        categoria: "bodys",
        tallas: ["S", "M", "L"],
        color: "Negro & Beige",
        material: "Tul Transparente & Varillas Flexibles",
        descripcion: "Estructura corset refinada con copas amoldadas y transparencias estratégicas.",
        imagenes: ["img/productos/body-5.jpg"],
        destacado: false,
        nuevo: true,
        masVendido: false
    },
    {
        id: 6,
        nombre: "Body Halter Satin Glam",
        precio: 82000,
        categoria: "bodys",
        tallas: ["S", "M", "L"],
        color: "Blanco Perla",
        material: "Satén Soft de Seda Sintética",
        descripcion: "Cuello halter cruzado con caída fluida en el pecho y espalda totalmente libre.",
        imagenes: ["img/productos/body-6.jpg"],
        destacado: false,
        nuevo: false,
        masVendido: true
    },

    // ==========================================
    // --- CATEGORÍA: PIJAMAS (10 Productos - Tallas: S, M, L) ---
    // ==========================================
    {
        id: 7,
        nombre: "Pijama Satén Luxe 2 Piezas",
        precio: 135000,
        categoria: "pijamas",
        tallas: ["S", "M", "L"],
        color: "Rosa Champagne",
        material: "Satén de Seda de Alta Gama",
        descripcion: "Conjunto exclusivo de camisa abotonada y pantalón fluido con ribetes en contraste.",
        imagenes: ["img/productos/pijama-1.jpg"],
        destacado: true,
        nuevo: true,
        masVendido: true
    },
    {
        id: 8,
        nombre: "Kimono Satén & Encaje Royale",
        precio: 145000,
        categoria: "pijamas",
        tallas: ["S", "M", "L"],
        color: "Negro Satinado",
        material: "Seda Satén & Encaje en Mangas",
        descripcion: "Bata estilo kimono con cinturón de satén y remates de encaje refinado en las empuñaduras.",
        imagenes: ["img/productos/pijama-2.jpg"],
        destacado: true,
        nuevo: false,
        masVendido: false
    },
    {
        id: 9,
        nombre: "Pijama Shorts & Top Cami Velvet",
        precio: 110000,
        categoria: "pijamas",
        tallas: ["S", "M", "L"],
        color: "Verde Esmeralda",
        material: "Terciopelo Soft & Tirantes Ajustables",
        descripcion: "Conjunto corto ultra suave con delicados detalles de blonda en escote y dobladillo.",
        imagenes: ["img/productos/pijama-3.jpg"],
        destacado: false,
        nuevo: true,
        masVendido: false
    },
    {
        id: 10,
        nombre: "Pijama Palazzo Silk Dreams",
        precio: 128000,
        categoria: "pijamas",
        tallas: ["S", "M", "L"],
        color: "Gris Perla",
        material: "Satén Soft Transpirable",
        descripcion: "Pantalón holgado estilo palazzo y blusa de tirantes con escote fluido para un descanso idílico.",
        imagenes: ["img/productos/pijama-4.jpg"],
        destacado: false,
        nuevo: false,
        masVendido: true
    },
    {
        id: 11,
        nombre: "Pijama Camisón Night Goddess",
        precio: 98000,
        categoria: "pijamas",
        tallas: ["S", "M", "L"],
        color: "Azul Noche Satinado",
        material: "Satén Sedoso & Escote en Espalda",
        descripcion: "Camisón largo de caída sensual, tirantes cruzados y hendidura lateral elegante.",
        imagenes: ["img/productos/pijama-5.jpg"],
        destacado: true,
        nuevo: true,
        masVendido: false
    },
    {
        id: 12,
        nombre: "Pijama Shorty Silk Touch Gold",
        precio: 105000,
        categoria: "pijamas",
        tallas: ["S", "M", "L"],
        color: "Champagne / Dorado",
        material: "Satén Ultra Suave",
        descripcion: "Dúo fresco de short elástico y top estilo brassier en fina seda satinada.",
        imagenes: ["img/productos/pijama-6.jpg"],
        destacado: false,
        nuevo: false,
        masVendido: true
    },
    {
        id: 13,
        nombre: "Pijama Pantalón & Manga Larga Silk Satin",
        precio: 140000,
        categoria: "pijamas",
        tallas: ["S", "M", "L"],
        color: "Blanco Marfil",
        material: "100% Satén Pima Premium",
        descripcion: "Set completo de manga larga y pantalón recto. Estilo clásico de máxima distinción.",
        imagenes: ["img/productos/pijama-7.jpg"],
        destacado: true,
        nuevo: false,
        masVendido: true
    },
    {
        id: 14,
        nombre: "Bata Kimono Corto Rose Gold",
        precio: 120000,
        categoria: "pijamas",
        tallas: ["S", "M", "L"],
        color: "Rosa Nude Satinado",
        material: "Seda Satén de Alta Densidad",
        descripcion: "Kimono corto con mangas acampanadas y lazo de ajuste al tono.",
        imagenes: ["img/productos/pijama-8.jpg"],
        destacado: false,
        nuevo: true,
        masVendido: false
    },
    {
        id: 15,
        nombre: "Pijama Bralette & Short Lace Trim",
        precio: 115000,
        categoria: "pijamas",
        tallas: ["S", "M", "L"],
        color: "Vino Borgoña",
        material: "Satén & Encaje de Pestaña",
        descripcion: "Diseño romántico de bralette sin varilla con shorts de pretina elástica en encaje.",
        imagenes: ["img/productos/pijama-9.jpg"],
        destacado: false,
        nuevo: false,
        masVendido: false
    },
    {
        id: 16,
        nombre: "Pijama Lounge Satin Set 3 Piezas",
        precio: 165000,
        categoria: "pijamas",
        tallas: ["S", "M", "L"],
        color: "Negro Cobre",
        material: "Satén Premium & Kimono Incluido",
        descripcion: "Trío de lujo: Incluye top de tirantes, pantalón fluido y bata kimono haciendo juego.",
        imagenes: ["img/productos/pijama-10.jpg"],
        destacado: true,
        nuevo: true,
        masVendido: true
    },

    // ==========================================
    // --- CATEGORÍA: ACCESORIOS (6 Productos - Sin Talla) ---
    // ==========================================
    {
        id: 17,
        nombre: "Cinturón Cadena Gold Link",
        precio: 65000,
        categoria: "accesorios",
        tallas: [],
        color: "Dorado Baño de Oro 18k",
        material: "Aleación Fina Antialérgica",
        descripcion: "Cinturón de eslabones dorados ideal para estilizar la figura con bodys y vestidos.",
        imagenes: ["img/productos/accesorio-1.jpg"],
        destacado: true,
        nuevo: true,
        masVendido: true
    },
    {
        id: 18,
        nombre: "Antifaz para Dormir Seda 100% Pura",
        precio: 45000,
        categoria: "accesorios",
        tallas: [],
        color: "Champagne / Perla",
        material: "Seda Mulberry Hipoalergénica",
        descripcion: "Protege el contorno de ojos y cabello mientras duermes con nuestra seda ultrasuave.",
        imagenes: ["img/productos/accesorio-2.jpg"],
        destacado: true,
        nuevo: false,
        masVendido: true
    },
    {
        id: 19,
        nombre: "Scrunchie Set x3 Seda Mulberry",
        precio: 38000,
        categoria: "accesorios",
        tallas: [],
        color: "Nude, Dorado & Negro",
        material: "100% Seda Natural",
        descripcion: "Coleteros de seda que evitan el quiebre y el frizz del cabello durante el descanso o uso diario.",
        imagenes: ["img/productos/accesorio-3.jpg"],
        destacado: false,
        nuevo: true,
        masVendido: false
    },
    {
        id: 20,
        nombre: "Bata Relajante Plush Couture",
        precio: 155000,
        categoria: "accesorios",
        tallas: [],
        color: "Marfil / Nude",
        material: "Microfibra Ultra Fluffy",
        descripcion: "Bata envolvente de textura afelpada para momentos de relax y spa en casa.",
        imagenes: ["img/productos/accesorio-4.jpg"],
        destacado: false,
        nuevo: false,
        masVendido: false
    },
    {
        id: 21,
        nombre: "Cinturón Corset de Cuero Eco Gold",
        precio: 72000,
        categoria: "accesorios",
        tallas: [],
        color: "Negro & Hebilla Dorada",
        material: "Cuero Ecológico de Alta Resistencia",
        descripcion: "Cinturón de talle ancho tipo corset para acentuar la cintura con elegancia.",
        imagenes: ["img/productos/accesorio-5.jpg"],
        destacado: true,
        nuevo: false,
        masVendido: true
    },
    {
        id: 22,
        nombre: "Set Joyero Viajero de Terciopelo MS",
        precio: 55000,
        categoria: "accesorios",
        tallas: [],
        color: "Rosa Nude & Dorado",
        material: "Terciopelo Suave & Cierre Metálico",
        descripcion: "Estuche compacto acolchado para organizar y proteger tus joyas y accesorios en viajes.",
        imagenes: ["img/productos/accesorio-6.jpg"],
        destacado: false,
        nuevo: true,
        masVendido: false
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = productos;
}

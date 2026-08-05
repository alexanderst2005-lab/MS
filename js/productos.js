/**
 * Base de datos centralizada de productos MS Boutique / MS by Marcela Segura.
 */

const productos = [
    // ==========================================
    // --- CATEGORÍA: PIJAMAS (10 Productos - $35.000 COP) ---
    // ==========================================
    {
        id: 1,
        nombre: "Pijama Piel Durazno 1",
        precio: 35000,
        categoria: "pijamas",
        tallas: ["S", "M", "L"],
        descripcion: "Suave, cómoda y perfecta para un descanso con estilo.",
        imagenes: ["img/productos/pijama-1.jpg"],
        destacado: true
    },
    {
        id: 2,
        nombre: "Pijama Piel Durazno 2",
        precio: 35000,
        categoria: "pijamas",
        tallas: ["S", "M", "L"],
        descripcion: "Suave, cómoda y perfecta para un descanso con estilo.",
        imagenes: ["img/productos/pijama-2.jpg"],
        destacado: true
    },
    {
        id: 3,
        nombre: "Pijama Piel Durazno 3",
        precio: 35000,
        categoria: "pijamas",
        tallas: ["S", "M", "L"],
        descripcion: "Suave, cómoda y perfecta para un descanso con estilo.",
        imagenes: ["img/productos/pijama-3.jpg"],
        destacado: false
    },
    {
        id: 4,
        nombre: "Pijama Piel Durazno 4",
        precio: 35000,
        categoria: "pijamas",
        tallas: ["S", "M", "L"],
        descripcion: "Suave, cómoda y perfecta para un descanso con estilo.",
        imagenes: ["img/productos/pijama-4.jpg"],
        destacado: true
    },
    {
        id: 5,
        nombre: "Pijama Piel Durazno 5",
        precio: 35000,
        categoria: "pijamas",
        tallas: ["S", "M", "L"],
        descripcion: "Suave, cómoda y perfecta para un descanso con estilo.",
        imagenes: ["img/productos/pijama-5.jpg"],
        destacado: false
    },
    {
        id: 6,
        nombre: "Pijama Piel Durazno 6",
        precio: 35000,
        categoria: "pijamas",
        tallas: ["S", "M", "L"],
        descripcion: "Suave, cómoda y perfecta para un descanso con estilo.",
        imagenes: ["img/productos/pijama-6.jpg"],
        destacado: false
    },
    {
        id: 7,
        nombre: "Pijama Piel Durazno 7",
        precio: 35000,
        categoria: "pijamas",
        tallas: ["S", "M", "L"],
        descripcion: "Suave, cómoda y perfecta para un descanso con estilo.",
        imagenes: ["img/productos/pijama-7.jpg"],
        destacado: false
    },
    {
        id: 8,
        nombre: "Pijama Piel Durazno 8",
        precio: 35000,
        categoria: "pijamas",
        tallas: ["S", "M", "L"],
        descripcion: "Suave, cómoda y perfecta para un descanso con estilo.",
        imagenes: ["img/productos/pijama-8.jpg"],
        destacado: false
    },
    {
        id: 9,
        nombre: "Pijama Piel Durazno 9",
        precio: 35000,
        categoria: "pijamas",
        tallas: ["S", "M", "L"],
        descripcion: "Suave, cómoda y perfecta para un descanso con estilo.",
        imagenes: ["img/productos/pijama-9.jpg"],
        destacado: false
    },

    // ==========================================
    // --- CATEGORÍA: ACCESORIOS (16 Productos) ---
    // ==========================================
    {
        id: 11,
        nombre: "Collar Cruz Verde en Rodio",
        precio: 35000,
        categoria: "accesorios",
        tallas: [],
        descripcion: "Elegante collar en rodio con cruz de circones verdes. Ideal para cualquier ocasión.",
        imagenes: ["img/productos/collar-cruz-verde.jpg"],
        destacado: true
    },
    {
        id: 12,
        nombre: "Collar Virgen de Guadalupe en Rodio",
        precio: 35000,
        categoria: "accesorios",
        tallas: [],
        descripcion: "Collar en rodio con dije de la Virgen de Guadalupe, símbolo de fe y protección.",
        imagenes: ["img/productos/collar-virgen-guadalupe.jpg"],
        destacado: true
    },
    {
        id: 13,
        nombre: "Collar Cruz Negra en Rodio",
        precio: 35000,
        categoria: "accesorios",
        tallas: [],
        descripcion: "Collar en rodio con un diseño moderno y sofisticado.",
        imagenes: ["img/productos/collar-cruz-negra.jpg"],
        destacado: false
    },
    {
        id: 14,
        nombre: "Collar Cruz Clásica en Rodio",
        precio: 35000,
        categoria: "accesorios",
        tallas: [],
        descripcion: "Diseño clásico y elegante para complementar cualquier look.",
        imagenes: ["img/productos/collar-cruz-clasica.jpg"],
        destacado: false
    },
    {
        id: 15,
        nombre: "Collar Lazo San Francisco",
        precio: 30000,
        categoria: "accesorios",
        tallas: [],
        descripcion: "Diseño delicado y femenino con acabado elegante en rodio.",
        imagenes: ["img/productos/collar-lazo-1.jpg"],
        destacado: true
    },
    {
        id: 17,
        nombre: "Set Van Cleef Brillante Negro",
        precio: 28000,
        categoria: "accesorios",
        tallas: [],
        descripcion: "Juego de collar y aretes con un diseño elegante y brillante.",
        imagenes: ["img/productos/van-cleef-brillante-negro.jpg"],
        destacado: true
    },
    {
        id: 18,
        nombre: "Set Van Cleef Circones Blanco",
        precio: 28000,
        categoria: "accesorios",
        tallas: [],
        descripcion: "Juego de collar y aretes con delicados circones que resaltan su brillo.",
        imagenes: ["img/productos/van-cleef-circones-blanco.jpg"],
        destacado: false
    },
    {
        id: 19,
        nombre: "Set Van Cleef Circones Plateado",
        precio: 28000,
        categoria: "accesorios",
        tallas: [],
        descripcion: "Collar y aretes en tono plateado con un acabado elegante.",
        imagenes: ["img/productos/van-cleef-circones-plateado.jpg"],
        destacado: false
    },
    {
        id: 20,
        nombre: "Camándula en Rodio",
        precio: 30000,
        categoria: "accesorios",
        tallas: [],
        descripcion: "Camándula de excelente calidad con acabado en rodio.",
        imagenes: ["img/productos/camandula-rodio.jpg"],
        destacado: false
    },
    {
        id: 21,
        nombre: "Camándula Especial en Rodio",
        precio: 35000,
        categoria: "accesorios",
        tallas: [],
        descripcion: "Diseño exclusivo con acabado premium.",
        imagenes: ["img/productos/camandula-especial.jpg"],
        destacado: true
    },
    {
        id: 22,
        nombre: "Set Elegance 1",
        precio: 16000,
        categoria: "accesorios",
        tallas: [],
        descripcion: "Juego de collar y aretes con diseño delicado y moderno.",
        imagenes: ["img/productos/set-elegance-1.jpg"],
        destacado: false
    },
    {
        id: 23,
        nombre: "Set Elegance 2",
        precio: 16000,
        categoria: "accesorios",
        tallas: [],
        descripcion: "Elegancia y estilo para cualquier ocasión.",
        imagenes: ["img/productos/set-elegance-2.jpg"],
        destacado: false
    },
    {
        id: 24,
        nombre: "Set Elegance 3",
        precio: 16000,
        categoria: "accesorios",
        tallas: [],
        descripcion: "Juego de collar y aretes con acabado sofisticado.",
        imagenes: ["img/productos/set-elegance-3.jpg"],
        destacado: false
    },
    {
        id: 25,
        nombre: "Pulsera Tejida San Benito",
        precio: 15000,
        categoria: "accesorios",
        tallas: [],
        descripcion: "Pulsera tejida con dije de San Benito, símbolo de protección.",
        imagenes: ["img/productos/pulsera-san-benito.jpg"],
        destacado: false
    },
    {
        id: 26,
        nombre: "Pulsera Tejida Van Cleef",
        precio: 15000,
        categoria: "accesorios",
        tallas: [],
        descripcion: "Pulsera tejida con un diseño elegante y moderno.",
        imagenes: ["img/productos/pulsera-van-cleef.jpg"],
        destacado: true
    },

    // ==========================================
    // --- CATEGORÍA: PRODUCTOS PURPURE (5 Productos) ---
    // ==========================================
    {
        id: 27,
        nombre: "Splash Corporal 100 ml",
        precio: 18000,
        categoria: "splash",
        tallas: [],
        descripcion: "Fragancia fresca y duradera para uso diario.",
        imagenes: ["img/productos/splash-100ml.jpg"],
        destacado: true
    },
    {
        id: 28,
        nombre: "Splash Corporal 200 ml",
        precio: 25000,
        categoria: "splash",
        tallas: [],
        descripcion: "Aroma delicioso con excelente duración.",
        imagenes: ["img/productos/splash-200ml.jpg"],
        destacado: true
    },
    {
        id: 29,
        nombre: "Splash Corporal 250 ml",
        precio: 28000,
        categoria: "splash",
        tallas: [],
        descripcion: "Fragancia intensa y sofisticada.",
        imagenes: ["img/productos/splash-250ml.jpg"],
        destacado: false
    },
    {
        id: 30,
        nombre: "Brilli Brilli 160 ml",
        precio: 18000,
        categoria: "splash",
        tallas: [],
        descripcion: "Brillo corporal con efecto luminoso y un delicioso aroma.",
        imagenes: ["img/productos/brilli-brilli-160ml.jpg"],
        destacado: true
    },
    {
        id: 31,
        nombre: "Mantequilla Corporal",
        precio: 25000,
        categoria: "splash",
        tallas: [],
        descripcion: "Hidrata profundamente la piel y la deja suave y perfumada.",
        imagenes: ["img/productos/mantequilla-corporal.jpg"],
        destacado: true
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = productos;
}

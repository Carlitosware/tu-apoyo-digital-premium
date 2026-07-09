/* ==========================================================================
   BOUTIQUE NORMA - INTERACTIVE JAVASCRIPT
   ========================================================================== */

// 1. BASE DE DATOS DE SIMULACIÓN (JSON MOCK DATA)
// Teléfono del negocio (en formato internacional sin el signo '+'). 
// Reemplázalo con tu número real de 10 dígitos antecedido por '521' para México (ej: 5215512345678)
const TELEFONO_WHATSAPP = "5215500000000"; 

const videos = [
  {
    id: "video-1",
    titulo: "¡Modelos Nuevos! Bolsas de Temporada y Mochilas Casuales",
    fecha: "08 Jul 2026",
    youtubeId: "dQw4w9WgXcQ", // Simulador
    productosRelacionados: [1, 2, 5]
  },
  {
    id: "video-2",
    titulo: "Especial Regreso a Clases: Mochilas Escolares Reforzadas",
    fecha: "05 Jul 2026",
    youtubeId: "dQw4w9WgXcQ",
    productosRelacionados: [3, 4]
  },
  {
    id: "video-3",
    titulo: "Monederos de Piel y Accesorios para Dama",
    fecha: "01 Jul 2026",
    youtubeId: "dQw4w9WgXcQ",
    productosRelacionados: [6, 7, 8]
  }
];

const productos = [
  {
    id: 1,
    nombre: "Bolsa Sofía Elegante",
    precio: 450.00,
    categoria: "bolsas",
    descripcion: "Bolsa de hombro de piel sintética con herrajes dorados. Amplia e ideal para el diario.",
    colores: ["#2d2a26", "#b08956", "#c0392b"],
    colorNombres: ["Negro", "Marrón", "Rojo"],
    imagen: "", // Vacio para usar placeholder visual CSS/SVG
    badge: "Más Vendido"
  },
  {
    id: 2,
    nombre: "Bolsa Cruzada Casual",
    precio: 290.00,
    categoria: "bolsas",
    descripcion: "Práctica bolsa cruzada ajustable. Compacta con cierre de seguridad.",
    colores: ["#b08956", "#4a69bd", "#78e08f"],
    colorNombres: ["Marrón", "Azul", "Verde"],
    imagen: ""
  },
  {
    id: 3,
    nombre: "Mochila Escolar Juvenil",
    precio: 380.00,
    categoria: "escolares",
    descripcion: "Mochila de lona impermeable con compartimiento para laptop de hasta 15 pulgadas.",
    colores: ["#4a69bd", "#2d2a26", "#e55039"],
    colorNombres: ["Azul", "Negro", "Naranja"],
    imagen: "",
    badge: "Nueva"
  },
  {
    id: 4,
    nombre: "Mochila Reforzada con Ruedas",
    precio: 520.00,
    categoria: "escolares",
    descripcion: "Mochila escolar de alta resistencia con ruedas de gel y bastón de aluminio.",
    colores: ["#2d2a26", "#3c6382"],
    colorNombres: ["Negro", "Azul Oscuro"],
    imagen: ""
  },
  {
    id: 5,
    nombre: "Mochila Pañalera Moderna",
    precio: 480.00,
    categoria: "mochilas",
    descripcion: "Mochila pañalera impermeable con bolsillos térmicos para biberones y conector USB.",
    colores: ["#82ccdd", "#fad390", "#2d2a26"],
    colorNombres: ["Celeste", "Beige", "Negro"],
    imagen: "",
    badge: "Recomendado"
  },
  {
    id: 6,
    nombre: "Monedero Compacto de Piel",
    precio: 120.00,
    categoria: "monederos",
    descripcion: "Monedero compacto de piel genuina con doble cierre y llavero integrado.",
    colores: ["#2d2a26", "#b08956", "#f6b93b"],
    colorNombres: ["Negro", "Marrón", "Amarillo Oro"],
    imagen: ""
  },
  {
    id: 7,
    nombre: "Monedero Elegante de Fiesta",
    precio: 150.00,
    categoria: "monederos",
    descripcion: "Monedero largo con tarjetero y correa para la muñeca. Diseño capitonado.",
    colores: ["#fad390", "#e55039", "#2d2a26"],
    colorNombres: ["Rosa Pastel", "Rojo Coral", "Negro"],
    imagen: ""
  },
  {
    id: 8,
    nombre: "Cartera Monedero Floral",
    precio: 130.00,
    categoria: "monederos",
    descripcion: "Monedero estampado con diseño floral. Práctico y ligero.",
    colores: ["#e55039", "#82ccdd"],
    colorNombres: ["Flores Rojas", "Flores Azules"],
    imagen: ""
  }
];

// 2. ESTADO DE LA APLICACIÓN (APPLICATION STATE)
let carrito = [];
let filtroCategoria = "all";
let videoSeleccionado = null;
let busquedaQuery = "";

// Elementos seleccionados por defecto para cada producto en el catálogo (colores por default)
const coloresSeleccionados = {}; 
productos.forEach(p => {
  coloresSeleccionados[p.id] = 0; // Índice del primer color por defecto
});

// 3. ELEMENTOS DEL DOM
const productGrid = document.getElementById("productGrid");
const categoryFilters = document.getElementById("categoryFilters");
const searchInput = document.getElementById("searchInput");
const videoGrid = document.getElementById("videoGrid");
const videoProductsBox = document.getElementById("videoProductsBox");
const videoProductsGrid = document.getElementById("videoProductsGrid");
const selectedVideoTitle = document.getElementById("selectedVideoTitle");
const clearVideoFilter = document.getElementById("clearVideoFilter");

// Carrito DOM
const cartToggle = document.getElementById("cartToggle");
const cartClose = document.getElementById("cartClose");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartTotalPrice = document.getElementById("cartTotalPrice");
const cartFooter = document.getElementById("cartFooter");
const cartCount = document.getElementById("cartCount");
const closeCartAndShop = document.getElementById("closeCartAndShop");
const sendOrderWa = document.getElementById("sendOrderWa");

// Asistente Capturas DOM
const screenshotInput = document.getElementById("screenshotInput");
const fileUploadWrapper = document.getElementById("fileUploadWrapper");
const previewContainer = document.getElementById("previewContainer");
const screenshotPreview = document.getElementById("screenshotPreview");
const removeScreenshotBtn = document.getElementById("removeScreenshotBtn");
const screenshotForm = document.getElementById("screenshotForm");
const uploadStatusText = document.getElementById("uploadStatusText");
const helperCategory = document.getElementById("helperCategory");
const helperNotes = document.getElementById("helperNotes");
const helperResult = document.getElementById("helperResult");
const generatedText = document.getElementById("generatedText");
const copyTextBtn = document.getElementById("copyTextBtn");
const openWaBtn = document.getElementById("openWaBtn");

// 4. FUNCIONES DE RENDERIZADO

// Renderizar lista de videos de YouTube
function renderVideos() {
  videoGrid.innerHTML = videos.map(video => `
    <div class="video-card" data-id="${video.id}">
      <div class="video-thumbnail">
        <!-- Reemplazamos la imagen real por un SVG simulador bonito de video de YouTube -->
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="60" height="60" style="color:var(--color-primary); opacity:0.6;"><rect x="2" y="2" width="20" height="20" rx="2" ry="2"/><path d="M12 18h.01"/><path d="M8 6h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/></svg>
        <div class="play-btn">
          <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
      </div>
      <div class="video-info">
        <div class="video-date">${video.fecha}</div>
        <h3>${video.titulo}</h3>
      </div>
    </div>
  `).join('');

  // Agregar listeners a las tarjetas de video
  const videoCards = videoGrid.querySelectorAll(".video-card");
  videoCards.forEach(card => {
    card.addEventListener("click", () => {
      const videoId = card.getAttribute("data-id");
      seleccionarVideo(videoId);
    });
  });
}

// Acción al seleccionar un video
function seleccionarVideo(videoId) {
  const video = videos.find(v => v.id === videoId);
  if (!video) return;

  videoSeleccionado = videoId;
  selectedVideoTitle.textContent = video.titulo;
  videoProductsBox.classList.remove("hidden");

  // Renderizar productos asociados a ese video
  renderProductosVideo(video.productosRelacionados);

  // Desplazar suavemente a la sección de productos filtrados del video
  videoProductsBox.scrollIntoView({ behavior: "smooth", block: "center" });
}

// Renderizar los productos específicos de un video seleccionado
function renderProductosVideo(productoIds) {
  const productosFiltrados = productos.filter(p => productoIds.includes(p.id));
  
  videoProductsGrid.innerHTML = productosFiltrados.map(p => {
    return renderProductCardHtml(p, `vid-${p.id}`);
  }).join('');

  // Agregar eventos para los selectores de colores y añadir al carrito en el grid del video
  asociarEventosTarjetas(productosFiltrados, "vid-");
}

// Genera el código HTML de una tarjeta de producto
function renderProductCardHtml(p, prefixId) {
  const badgeHtml = p.badge ? `<span class="product-badge">${p.badge}</span>` : '';
  const selectedIdx = coloresSeleccionados[p.id] || 0;

  // Dibujar los circulitos de colores
  const dotsHtml = p.colores.map((color, idx) => `
    <div class="color-dot ${idx === selectedIdx ? 'selected' : ''}" 
         style="background-color: ${color};" 
         data-index="${idx}"
         title="${p.colorNombres[idx]}">
    </div>
  `).join('');

  // Icono SVG representativo según la categoría
  let svgIcon = '';
  if (p.categoria === 'bolsas') {
    svgIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`;
  } else if (p.categoria === 'escolares' || p.categoria === 'mochilas') {
    svgIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 20V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M9 4V2h6v2"/><path d="M8 22V10a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12"/></svg>`;
  } else { // Monederos
    svgIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="12" y1="4" x2="12" y2="20"/><circle cx="12" cy="12" r="2"/></svg>`;
  }

  return `
    <article class="product-card" id="card-${prefixId}">
      <div class="product-img">
        ${badgeHtml}
        <div class="placeholder-bag-img">
          ${svgIcon}
        </div>
      </div>
      <div class="product-body">
        <span class="product-cat">${p.categoria}</span>
        <h3>${p.nombre}</h3>
        <div class="product-price">$${p.precio.toFixed(2)} MXN</div>
        
        <div class="product-options">
          <div class="options-label">Color: <span class="selected-color-name" id="colorName-${prefixId}">${p.colorNombres[selectedIdx]}</span></div>
          <div class="color-dots" id="dots-${prefixId}">
            ${dotsHtml}
          </div>
        </div>

        <div class="product-actions">
          <button class="btn btn--primary btn--block btn--add-cart" data-id="${p.id}">
            Añadir al Carrito
          </button>
        </div>
      </div>
    </article>
  `;
}

// Asocia los eventos de clic a los puntitos de colores y al botón "Añadir"
function asociarEventosTarjetas(listaProductos, prefix) {
  listaProductos.forEach(p => {
    const card = document.getElementById(`card-${prefix}${p.id}`);
    if (!card) return;

    // Listener para los puntitos de color
    const dotsContainer = card.querySelector(`#dots-${prefix}${p.id}`);
    const dots = dotsContainer.querySelectorAll(".color-dot");
    const nameSpan = card.querySelector(`#colorName-${prefix}${p.id}`);

    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        // Quitar clase seleccionada a los demás
        dots.forEach(d => d.classList.remove("selected"));
        dot.classList.add("selected");

        const colorIdx = parseInt(dot.getAttribute("data-index"));
        
        // Actualizar estado global del color seleccionado para este producto
        coloresSeleccionados[p.id] = colorIdx;
        nameSpan.textContent = p.colorNombres[colorIdx];

        // Sincronizar con el otro grid por si está visible
        sincronizarColorSelector(p.id, colorIdx);
      });
    });

    // Listener para Añadir al Carrito
    const addBtn = card.querySelector(".btn--add-cart");
    addBtn.addEventListener("click", () => {
      const selectedColorIdx = coloresSeleccionados[p.id];
      agregarAlCarrito(p.id, selectedColorIdx);
    });
  });
}

// Si cambias el color en el catálogo principal, se cambia también en el bloque de "Visto en YouTube" y viceversa
function sincronizarColorSelector(productId, colorIdx) {
  const p = productos.find(x => x.id === productId);
  if (!p) return;

  // Actualizar texto y dots del catálogo principal
  const catCard = document.getElementById(`card-cat-${productId}`);
  if (catCard) {
    const nameSpan = catCard.querySelector(`#colorName-cat-${productId}`);
    nameSpan.textContent = p.colorNombres[colorIdx];
    const dots = catCard.querySelectorAll(`.color-dot`);
    dots.forEach((d, idx) => {
      if (idx === colorIdx) d.classList.add("selected");
      else d.classList.remove("selected");
    });
  }

  // Actualizar bloque de video
  const vidCard = document.getElementById(`card-vid-${productId}`);
  if (vidCard) {
    const nameSpan = vidCard.querySelector(`#colorName-vid-${productId}`);
    nameSpan.textContent = p.colorNombres[colorIdx];
    const dots = vidCard.querySelectorAll(`.color-dot`);
    dots.forEach((d, idx) => {
      if (idx === colorIdx) d.classList.add("selected");
      else d.classList.remove("selected");
    });
  }
}

// Renderizar el catálogo principal aplicando búsquedas y filtros
function renderCatalog() {
  // Filtrar productos
  const productosFiltrados = productos.filter(p => {
    // 1. Filtro por categoría
    const cumpleCategoria = (filtroCategoria === "all" || p.categoria === filtroCategoria);
    
    // 2. Filtro por buscador (nombre o descripción)
    const cumpleBuscador = p.nombre.toLowerCase().includes(busquedaQuery.toLowerCase()) || 
                           p.descripcion.toLowerCase().includes(busquedaQuery.toLowerCase());

    return cumpleCategoria && cumpleBuscador;
  });

  if (productosFiltrados.length === 0) {
    productGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--color-text-muted);">
        <p>No se encontraron productos que coincidan con tu búsqueda.</p>
        <button class="btn btn--secondary btn--sm" style="margin-top: 1rem;" id="resetCatalogFilters">Ver todo el catálogo</button>
      </div>
    `;
    const resetBtn = document.getElementById("resetCatalogFilters");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        searchInput.value = "";
        busquedaQuery = "";
        filtroCategoria = "all";
        // Resetear botones activos
        const tags = categoryFilters.querySelectorAll(".filter-tag");
        tags.forEach(t => t.classList.remove("active"));
        categoryFilters.querySelector('[data-category="all"]').classList.add("active");
        renderCatalog();
      });
    }
    return;
  }

  productGrid.innerHTML = productosFiltrados.map(p => {
    return renderProductCardHtml(p, `cat-${p.id}`);
  }).join('');

  asociarEventosTarjetas(productosFiltrados, "cat-");
}

// 5. LÓGICA DEL CARRITO DE COMPRAS

function abrirCarrito() {
  cartDrawer.classList.add("open");
  document.body.style.overflow = "hidden"; // Desactivar scroll de fondo
}

function cerrarCarrito() {
  cartDrawer.classList.remove("open");
  document.body.style.overflow = ""; // Reactivar scroll
}

function agregarAlCarrito(productId, colorIdx) {
  const p = productos.find(x => x.id === productId);
  if (!p) return;

  const colorNombre = p.colorNombres[colorIdx];
  const colorCodigo = p.colores[colorIdx];

  // Comprobar si ya existe un elemento idéntico en el carrito (mismo producto y mismo color)
  const itemExistente = carrito.find(item => item.id === productId && item.color === colorNombre);

  if (itemExistente) {
    itemExistente.cantidad += 1;
  } else {
    carrito.push({
      id: productId,
      nombre: p.nombre,
      precio: p.precio,
      color: colorNombre,
      colorCodigo: colorCodigo,
      cantidad: 1
    });
  }

  // Notificación visual de agregar al carrito (animación del botón)
  renderCarrito();
  abrirCarrito();
}

function cambiarCantidad(idx, delta) {
  carrito[idx].cantidad += delta;
  
  if (carrito[idx].cantidad <= 0) {
    carrito.splice(idx, 1); // Quitar del carrito si llega a 0
  }
  
  renderCarrito();
}

function eliminarDelCarrito(idx) {
  carrito.splice(idx, 1);
  renderCarrito();
}

// Dibuja los artículos en la barra lateral del carrito
function renderCarrito() {
  // Actualizar badge del navbar
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  cartCount.textContent = totalItems;
  if (totalItems > 0) {
    cartCount.classList.remove("hidden");
  } else {
    // Esconder el contador si está vacío
  }

  if (carrito.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty-message">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48" style="opacity:0.4"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <p>Tu carrito está vacío</p>
        <button class="btn btn--secondary btn--sm" id="shopFromEmptyCart">Explorar Catálogo</button>
      </div>
    `;
    cartFooter.classList.add("hidden");

    const shopBtn = document.getElementById("shopFromEmptyCart");
    if (shopBtn) {
      shopBtn.addEventListener("click", () => {
        cerrarCarrito();
        document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
      });
    }
    return;
  }

  // Si hay elementos, renderizarlos
  cartItemsContainer.innerHTML = carrito.map((item, idx) => `
    <div class="cart-item">
      <div class="cart-item-img">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      </div>
      <div class="cart-item-details">
        <h4>${item.nombre}</h4>
        <div class="cart-item-meta">
          Color: <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background-color:${item.colorCodigo}; margin-right:4px;"></span> ${item.color}
        </div>
        <div class="cart-item-actions">
          <div class="quantity-controller">
            <button class="qty-btn" onclick="cambiarCantidad(${idx}, -1)">-</button>
            <span class="qty-val">${item.cantidad}</span>
            <button class="qty-btn" onclick="cambiarCantidad(${idx}, 1)">+</button>
          </div>
          <span class="cart-item-price">$${(item.precio * item.cantidad).toFixed(2)}</span>
          <button class="remove-item-btn" onclick="eliminarDelCarrito(${idx})" aria-label="Eliminar producto">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Calcular precio total
  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  cartTotalPrice.textContent = `$${total.toFixed(2)} MXN`;
  cartFooter.classList.remove("hidden");
}

// Redirigir a WhatsApp con el texto formateado
function enviarPedidoWhatsApp() {
  if (carrito.length === 0) return;

  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  // Construcción del texto del mensaje
  let mensaje = `¡Hola Boutique Norma! ✨\nMe interesa realizar un pedido de los siguientes artículos de su catálogo web:\n\n`;
  
  carrito.forEach(item => {
    mensaje += `*• ${item.cantidad}x ${item.nombre}*\n  _Color: ${item.color}_ (Precio c/u: $${item.precio.toFixed(2)} MXN)\n  Subtotal: $${(item.precio * item.cantidad).toFixed(2)} MXN\n\n`;
  });

  mensaje += `--------------------------\n`;
  mensaje += `*Total de artículos:* ${totalItems}\n`;
  mensaje += `*Monto total estimado:* $${total.toFixed(2)} MXN\n\n`;
  mensaje += `¿Tienen disponibilidad de estos artículos para coordinar mi entrega/envío? Muchas gracias.`;

  // Codificar el texto de forma segura para URL
  const mensajeCodificado = encodeURIComponent(mensaje);
  const urlWhatsapp = `https://wa.me/${TELEFONO_WHATSAPP}?text=${mensajeCodificado}`;

  // Abrir en una pestaña nueva
  window.open(urlWhatsapp, "_blank");
}

// Hacer que las funciones cambiarCantidad y eliminarDelCarrito sean globales 
// para que puedan ser invocadas desde el HTML construido dinámicamente en el carrito
window.cambiarCantidad = cambiarCantidad;
window.eliminarDelCarrito = eliminarDelCarrito;


// 6. ASISTENTE DE CAPTURAS DE PANTALLA

// Simular carga de archivo
screenshotInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    // Mostrar preview de imagen
    const reader = new FileReader();
    reader.onload = function(evt) {
      screenshotPreview.src = evt.target.result;
      previewContainer.classList.remove("hidden");
      fileUploadWrapper.classList.add("hidden");
      uploadStatusText.textContent = `Imagen cargada: ${file.name}`;
    }
    reader.readAsDataURL(file);
  }
});

removeScreenshotBtn.addEventListener("click", () => {
  screenshotInput.value = "";
  screenshotPreview.src = "#";
  previewContainer.classList.add("hidden");
  fileUploadWrapper.classList.remove("hidden");
  uploadStatusText.textContent = "Haz clic para subir o arrastra tu captura";
  helperResult.classList.add("hidden");
});

// Procesar asistente de capturas
screenshotForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const file = screenshotInput.files[0];
  const categoria = helperCategory.value;
  const notas = helperNotes.value;

  if (!file) {
    alert("Por favor, sube una captura de pantalla primero.");
    return;
  }

  if (!categoria) {
    alert("Por favor, selecciona qué tipo de producto es (Paso 2).");
    return;
  }

  // Crear el borrador de pedido
  let mensaje = `¡Hola Boutique Norma! 📸\nAdjunto una captura de pantalla de un producto que vi en sus videos/redes sociales para apartar o cotizar:\n\n`;
  mensaje += `*• Tipo de artículo:* ${categoria}\n`;
  
  if (notas.trim() !== "") {
    mensaje += `*• Detalles indicados:* ${notas.trim()}\n`;
  }
  
  mensaje += `\n*(Ya tengo la foto de la captura seleccionada en mi galería para enviársela en el siguiente mensaje)*`;

  // Mostrar el resultado en pantalla
  generatedText.textContent = mensaje;
  helperResult.classList.remove("hidden");

  // Configurar enlace de WhatsApp
  const mensajeCodificado = encodeURIComponent(mensaje);
  openWaBtn.href = `https://wa.me/${TELEFONO_WHATSAPP}?text=${mensajeCodificado}`;

  // Copiar automáticamente al portapapeles
  navigator.clipboard.writeText(mensaje).then(() => {
    // Éxito de copiado (el usuario no tiene que copiar a mano)
  }).catch(err => {
    console.error("No se pudo copiar automáticamente: ", err);
  });
});

// Botón de copiar a mano en caso de que falle navigator.clipboard
copyTextBtn.addEventListener("click", () => {
  const texto = generatedText.textContent;
  navigator.clipboard.writeText(texto).then(() => {
    alert("¡Mensaje copiado al portapapeles! Listo para pegar en WhatsApp.");
  });
});


// 7. EVENTOS GENERALES E INICIALIZACIÓN

// Manejar filtros de categorías del catálogo
const tags = categoryFilters.querySelectorAll(".filter-tag");
tags.forEach(tag => {
  tag.addEventListener("click", () => {
    tags.forEach(t => t.classList.remove("active"));
    tag.classList.add("active");
    
    filtroCategoria = tag.getAttribute("data-category");
    renderCatalog();
  });
});

// Manejar barra de búsqueda
searchInput.addEventListener("input", (e) => {
  busquedaQuery = e.target.value;
  renderCatalog();
});

// Limpiar filtro del video
clearVideoFilter.addEventListener("click", () => {
  videoSeleccionado = null;
  videoProductsBox.classList.add("hidden");
  document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
});

// Eventos de apertura/cierre de carrito lateral
cartToggle.addEventListener("click", abrirCarrito);
cartClose.addEventListener("click", cerrarCarrito);
cartOverlay.addEventListener("click", cerrarCarrito);
closeCartAndShop.addEventListener("click", cerrarCarrito);
sendOrderWa.addEventListener("click", enviarPedidoWhatsApp);

// Menú Móvil Burger (Simulado)
const burgerToggle = document.getElementById("burgerToggle");
const navbarLinks = document.getElementById("navbarLinks");

burgerToggle.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
  // Animación del burger
  burgerToggle.classList.toggle("open");
});

// Inicialización de la página
document.addEventListener("DOMContentLoaded", () => {
  renderVideos();
  renderCatalog();
  renderCarrito();
});

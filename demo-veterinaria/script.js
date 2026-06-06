/* ============================================================
   script.js — Lógica Interactiva (Página Demo Veterinaria)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  
  // ============================================================
  // A. CONTROL DE NAVEGACIÓN Y MENÚ MÓVIL
  // ============================================================
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  // 1. Sombrear la cabecera al hacer scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 15) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // 2. Menú Hamburguesa para móviles
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // 3. Cerrar el menú móvil al hacer clic en cualquier enlace
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      burger.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });


  // ============================================================
  // B. COTIZADOR INTERACTIVO DE ESTÉTICA CANINA
  // ============================================================
  
  // Definimos las tarifas en un objeto estructurado.
  // Esto facilita cambiar los precios en el futuro si es necesario.
  const PRICES = {
    // Tarifas base por tamaño
    size: {
      chico: 250,    // Perros pequeños (hasta 10kg)
      mediano: 350,  // Perros medianos (10-22kg)
      grande: 480    // Perros grandes (22-40kg)
    },
    // Cargos extra por tipo de pelo
    hair: {
      corto: 0,
      medio: 50,
      largo: 100
    }
  };

  const calculatorForm = document.getElementById('calculatorForm');
  const calcSummary = document.getElementById('calcSummary');
  const calcPrice = document.getElementById('calcPrice');
  const btnBookFromCalc = document.getElementById('btnBookFromCalc');
  const servicioDeseado = document.getElementById('servicioDeseado');

  // Función principal para calcular el costo total
  function calculateTotal() {
    // 1. Obtener el tamaño seleccionado (del input radio)
    const selectedSizeInput = calculatorForm.querySelector('input[name="dogSize"]:checked');
    const size = selectedSizeInput ? selectedSizeInput.value : 'chico';
    const sizePrice = PRICES.size[size];

    // 2. Obtener el tipo de pelo seleccionado (del menú desplegable)
    const hairSelect = document.getElementById('hairType');
    const hair = hairSelect ? hairSelect.value : 'corto';
    const hairPrice = PRICES.hair[hair];

    // 3. Sumar servicios adicionales (inputs checkbox seleccionados)
    let extraPrice = 0;
    const extrasList = [];

    const dentalCheckbox = document.getElementById('dental');
    if (dentalCheckbox && dentalCheckbox.checked) {
      extraPrice += parseInt(dentalCheckbox.value, 10);
      extrasList.push('limpieza dental');
    }

    const medicatedCheckbox = document.getElementById('medicated');
    if (medicatedCheckbox && medicatedCheckbox.checked) {
      extraPrice += parseInt(medicatedCheckbox.value, 10);
      extrasList.push('baño medicado');
    }

    const fleaCheckbox = document.getElementById('flea');
    if (fleaCheckbox && fleaCheckbox.checked) {
      extraPrice += parseInt(fleaCheckbox.value, 10);
      extrasList.push('antipulgas');
    }

    // 4. Calcular el gran total
    const grandTotal = sizePrice + hairPrice + extraPrice;

    // 5. Actualizar los elementos visuales
    calcPrice.textContent = `$${grandTotal} MXN`;
    
    // Generar un resumen en texto del servicio seleccionado
    const sizeText = size.charAt(0).toUpperCase() + size.slice(1);
    let summaryText = `Estética básica para perro ${sizeText} (Pelo ${hair})`;
    if (extrasList.length > 0) {
      summaryText += ` + Adicionales: ${extrasList.join(', ')}.`;
    } else {
      summaryText += `.`;
    }
    calcSummary.textContent = summaryText;
  }

  // Escuchar cambios en el formulario del cotizador
  if (calculatorForm) {
    calculatorForm.addEventListener('change', calculateTotal);
    // Ejecutar el cálculo inicial al cargar la página
    calculateTotal();
  }

  // Conectar el cotizador con el formulario de citas
  // Cuando el usuario haga clic en "Reservar con este precio", 
  // se pre-selecciona "Estética y Peluquería Canina" en el formulario de abajo y se escribe en el mensaje.
  if (btnBookFromCalc && servicioDeseado) {
    btnBookFromCalc.addEventListener('click', (e) => {
      servicioDeseado.value = 'estetica';
      
      const mensajeTextarea = document.getElementById('mensaje');
      if (mensajeTextarea) {
        mensajeTextarea.value = `Hola, coticé en la web: ${calcSummary.textContent} (Precio estimado: ${calcPrice.textContent}).`;
      }
    });
  }


  // ============================================================
  // C. VALIDACIÓN Y ENVÍO DEL FORMULARIO DE CITAS
  // ============================================================
  const appointmentForm = document.getElementById('vetAppointmentForm');
  const appointmentSuccess = document.getElementById('appointmentSuccess');

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Evitamos el envío real y la recarga de página
      
      let isFormValid = true;

      // Función auxiliar para validar campos individuales
      function validateField(groupId, isValidCondition) {
        const groupElement = document.getElementById(groupId);
        if (!groupElement) return;

        if (!isValidCondition) {
          groupElement.classList.add('has-err'); // Agrega clase CSS de borde rojo
          isFormValid = false;
        } else {
          groupElement.classList.remove('has-err'); // Quita la clase de error si está bien
        }
      }

      // Validaciones detalladas de los campos requeridos
      const propietarioInput = document.getElementById('nombrePropietario');
      validateField('g-nombre-propietario', propietarioInput.value.trim().length >= 3);

      const mascotaInput = document.getElementById('nombreMascota');
      validateField('g-nombre-mascota', mascotaInput.value.trim().length >= 2);

      const telefonoInput = document.getElementById('telefono');
      // Validación básica de número telefónico (mínimo 10 dígitos numéricos)
      const isPhoneValid = /^[0-9]{10,12}$/.test(telefonoInput.value.trim().replace(/[\s-]/g, ''));
      validateField('g-telefono', isPhoneValid);

      validateField('g-servicio-deseado', servicioDeseado.value !== '');

      // Si todo es válido, mostramos el mensaje de éxito
      if (isFormValid) {
        // En un proyecto real, aquí enviarías los datos al servidor mediante fetch()
        
        // Ocultar formulario
        appointmentForm.style.opacity = '0.5';
        appointmentForm.querySelectorAll('input, select, textarea, button').forEach(el => {
          el.disabled = true; // Desactivar campos para evitar doble clic
        });
        
        // Mostrar mensaje de éxito
        appointmentSuccess.style.display = 'block';
        
        // Resetear formulario (opcional tras unos segundos)
        setTimeout(() => {
          appointmentForm.reset();
          appointmentForm.style.opacity = '1';
          appointmentForm.querySelectorAll('input, select, textarea, button').forEach(el => {
            el.disabled = false;
          });
          appointmentSuccess.style.display = 'none';
          if (calculatorForm) calculateTotal(); // Reiniciar cotizador
        }, 5000);
      }
    });

    // Limpiar el mensaje de error cuando el usuario vuelva a escribir en un campo
    appointmentForm.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
          formGroup.classList.remove('has-err');
        }
      });
    });
  }


  // ============================================================
  // D. EFECTO DE REVELACIÓN (SCROLL REVEAL)
  // ============================================================
  const revealElements = document.querySelectorAll('.reveal');
  
  // Creamos un observador de intersección que detecta cuándo el elemento entra en pantalla
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Añadimos un pequeño retraso (delay) entre elementos continuos para efecto cascada
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        
        // Dejamos de observar el elemento una vez revelado
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Se activa cuando al menos el 10% del elemento es visible
    rootMargin: '0px 0px -30px 0px' // Se activa ligeramente antes de llegar al borde inferior de pantalla
  });

  // Iniciamos la observación en cada elemento con la clase .reveal
  revealElements.forEach(el => revealObserver.observe(el));

});

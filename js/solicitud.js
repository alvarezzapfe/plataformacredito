// Función para mostrar las secciones de contenido
function showSection(sectionId) {
  // Ocultar todas las secciones
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  // Mostrar la sección correspondiente
  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.classList.add("active");
  }
}

// Función para alternar la visibilidad del menú (hamburger menu)
function toggleMenu() {
  const menu = document.getElementById("menuOptions");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Función para filtrar las solicitudes en el apartado de Riesgo
function filtrarSolicitudes() {
  const input = document.getElementById("buscarSolicitud");
  const filter = input.value.toLowerCase();
  const listItems = document.querySelectorAll("#listaSolicitudes li");

  listItems.forEach((item) => {
    const text = item.textContent || item.innerText;
    if (text.toLowerCase().indexOf(filter) > -1) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

// Función para mostrar los detalles del riesgo de una solicitud
function verDetalleRiesgo(id) {
  // Aquí puedes hacer una petición a tu backend o trabajar con datos mock.
  // Por ejemplo, simular que cambiamos la información mostrada en la sección de Riesgo.

  const solicitudNumero = document.getElementById("solicitudNumero");
  const empresaNombre = document.getElementById("empresaNombre");
  const monto = document.getElementById("monto");
  const estatus = document.getElementById("estatus");

  // Simulamos la actualización de los detalles
  solicitudNumero.textContent = `#${id}`;
  empresaNombre.textContent = `Empresa ${id}`;
  monto.textContent = `$${(Math.random() * 100000).toFixed(2)}`;
  estatus.textContent = id % 2 === 0 ? "Aprobado" : "Rechazado";

  // Hacer visible la sección de Riesgo
  showSection("Riesgo");
}

// Función para ver detalles de una empresa
function verDetalleEmpresa(id) {
  // Aquí puedes hacer algo similar, como cargar detalles dinámicos de la empresa
  alert(`Ver detalles de la empresa ${id}`);
}

// Función para enviar pregunta al Copiloto AI
function enviarPregunta() {
  const question = document.getElementById("aiQuestion").value;
  if (question.trim()) {
    alert(`Pregunta enviada: ${question}`);
    document.getElementById("aiQuestion").value = ""; // Limpiar el campo
  } else {
    alert("Por favor, ingresa una pregunta.");
  }
}

// Llamada inicial para mostrar la primera sección
document.addEventListener("DOMContentLoaded", () => {
  showSection("ingresoGeneral"); // Por ejemplo, inicia en la sección de Datos Generales
});

// chat AI
// Función para enviar una pregunta al Copiloto AI
function enviarPregunta() {
  const question = document.getElementById("aiQuestion").value;
  const respuestaText = document.getElementById("respuestaText");

  if (question.trim()) {
    // Muestra la pregunta en el cuadro de respuesta
    respuestaText.textContent = `Tu pregunta: ${question}`;

    // Simula la respuesta del Copiloto AI
    setTimeout(() => {
      respuestaText.textContent = `Respuesta del mago: Estoy procesando tu solicitud...`;
    }, 1000);

    // Limpiar el input de la pregunta
    document.getElementById("aiQuestion").value = "";
  } else {
    alert("Por favor, ingresa una pregunta.");
  }
}

// ingreso general

function nextStep() {
  let step1Completed = checkStep1();
  let step2Completed = checkStep2();
  let step3Completed = checkStep3();

  if (step1Completed) {
    document.getElementById("form-step-1").style.display = "none";
    document.getElementById("form-step-2").style.display = "block";
    document.getElementById("circle-1").style.backgroundColor = "green";
  }

  if (step2Completed) {
    document.getElementById("form-step-2").style.display = "none";
    document.getElementById("form-step-3").style.display = "block";
    document.getElementById("circle-2").style.backgroundColor = "green";
  }

  if (step3Completed) {
    document.getElementById("circle-3").style.backgroundColor = "green";
    // Aquí puedes agregar una acción de envío del formulario final
    alert("Solicitud Enviada");
  }
}

function checkStep1() {
  // Verifica si los campos del paso 1 están completos
  return (
    document.getElementById("nombre-representante").value &&
    document.getElementById("razon-social").value &&
    document.getElementById("marca-comercial").value &&
    document.getElementById("tipo-persona").value &&
    document.getElementById("fecha-constitucion").value &&
    document.getElementById("correo-representante").value
  );
}

function checkStep2() {
  // Verifica si los campos del paso 2 están completos
  return (
    document.getElementById("rfc-empresa").value &&
    document.getElementById("facturacion-ano-actual").value &&
    document.getElementById("facturacion-ano-1").value &&
    document.getElementById("facturacion-ano-2").value &&
    document.getElementById("facturacion-ano-3").value &&
    document.getElementById("pagina-web").value
  );
}

function checkStep3() {
  // Verifica si los campos del paso 3 están completos
  return (
    document.getElementById("monto-solicitado").value &&
    document.getElementById("pago-intereses").value &&
    document.getElementById("garantias").value
  );
}

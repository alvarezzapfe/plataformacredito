// Cambiar de sección al hacer clic en el menú lateral
document.addEventListener("DOMContentLoaded", () => {
  showSection("dashboard"); // Asegura que el Dashboard sea la sección activa al cargar
});

function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => section.classList.remove("active"));

  const activeSection = document.getElementById(sectionId);
  activeSection.classList.add("active");
}

// Generar filas dinámicas para la tabla (ejemplo)

const creditos = [
  {
    numero: "001",
    razon_social: "Empresa ABC",
    monto: "$500,000",
    tasa: "12%",
    plazo: "24 meses",
    inicio: "01/01/2024",
    fin: "01/01/2026",
    amortizacion: "$20,833",
    calificacion: "10",
    estatus: "Fondeado", // Nuevo campo estatus
  },
  {
    numero: "002",
    razon_social: "Comercial XYZ",
    monto: "$300,000",
    tasa: "14%",
    plazo: "18 meses",
    inicio: "01/06/2024",
    fin: "01/12/2025",
    amortizacion: "$16,666",
    calificacion: "7",
    estatus: "Aprobado", // Nuevo campo estatus
  },
];

const tableBody = document.getElementById("creditosTable");

creditos.forEach((credito) => {
  const estatusClass = getEstatusClass(credito.estatus); // Obtener clase CSS según el estatus
  const row = `
    <tr>
      <td>${credito.numero}</td>
      <td>${credito.razon_social}</td>
      <td>${credito.monto}</td>
      <td>${credito.tasa}</td>
      <td>${credito.plazo}</td>
      <td>${credito.inicio}</td>
      <td>${credito.fin}</td>
      <td>${credito.amortizacion}</td>
      <td>${credito.calificacion}</td>
      <td><span class="estatus ${estatusClass}">${credito.estatus}</span></td> <!-- Columna Estatus -->
      <td><button onclick="detalleCredito('${credito.numero}')">Detalle</button></td>
    </tr>
  `;
  tableBody.innerHTML += row;
});

// Función para obtener la clase correspondiente al estatus
function getEstatusClass(estatus) {
  switch (estatus) {
    case "Fondeado":
      return "fondeado"; // Verde
    case "Aprobado":
      return "aprobado"; // Naranja
    case "Desinvertido":
      return "desinvertido"; // Azul Claro
    case "Default":
      return "default"; // Rojo Claro Fosforescente
    default:
      return "";
  }
}

// Función para mostrar detalle del crédito
function detalleCredito(numero) {
  alert(`Mostrando detalle del crédito #${numero}`);
}

// Función para abrir/cerrar las opciones del menú superior
function toggleMenu() {
  const menuOptions = document.getElementById("menuOptions");
  menuOptions.style.display =
    menuOptions.style.display === "block" ? "none" : "block";
}

// Funcion para mostrar solicitudes
function enviarPregunta() {
  const pregunta = document.getElementById("aiQuestion").value;
  if (pregunta.trim() === "") {
    alert("Por favor, escribe una pregunta.");
    return;
  }
  console.log("Pregunta enviada:", pregunta);
  // Aquí puedes integrar la lógica para consumir la API de ChatGPT.
}

// funcion para RIESGO

// Función para filtrar las solicitudes
function filtrarSolicitudes() {
  const input = document.getElementById("buscarSolicitud");
  const filter = input.value.toUpperCase();
  const listItems = document.querySelectorAll("#listaSolicitudes li");

  listItems.forEach((item) => {
    const text = item.textContent || item.innerText;
    if (text.toUpperCase().indexOf(filter) > -1) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

// Función para mostrar el detalle de la solicitud de crédito
function verDetalleRiesgo(id) {
  // Simula los datos de la solicitud (esto debe ser reemplazado por datos reales)
  const datosSolicitud = {
    1: {
      solicitud: "#001",
      empresa: "Empresa XYZ",
      monto: "$500,000",
      estatus: "Aprobada",
    },
    2: {
      solicitud: "#002",
      empresa: "Empresa ABC",
      monto: "$300,000",
      estatus: "Pendiente",
    },
  };

  // Accede a los datos de la solicitud seleccionada
  const solicitud = datosSolicitud[id];

  // Actualiza la información en las cajas
  document.getElementById("solicitudNumero").textContent = solicitud.solicitud;
  document.getElementById("empresaNombre").textContent = solicitud.empresa;
  document.getElementById("monto").textContent = solicitud.monto;
  document.getElementById("estatus").textContent = solicitud.estatus;

  // Muestra la sección de Riesgo
  showSection("riesgo");
}

// Función para calcular la tasa de crédito (simulada)
function calcularTasaCredito() {
  const ingresosAnio1 = parseFloat(
    document.getElementById("ingresosAnio1").value
  );
  const ebitdaAnio1 = parseFloat(document.getElementById("ebitdaAnio1").value);
  const scoreBuró = parseFloat(document.getElementById("scoreBuró").value);

  // Simula el cálculo de la tasa basado en los ingresos, EBITDA y score
  let tasaCredito = 10; // Tasa base

  if (ingresosAnio1 > 1000000) {
    tasaCredito -= 2; // Descuento por ingresos
  }

  if (scoreBuró > 700) {
    tasaCredito -= 1; // Descuento por buen score
  }

  document.getElementById(
    "resultadoTasaCredito"
  ).textContent = `${tasaCredito}%`;
}

// Llamar la función para calcular la tasa cuando se cambian los valores
document.querySelectorAll(".input-riesgo input").forEach((input) => {
  input.addEventListener("input", calcularTasaCredito);
});

// detalle de crédito en ventana cobranza

function verDetalleCredito(creditoId) {
  // Aquí puedes implementar la lógica para redirigir a otra vista o cargar datos dinámicos
  // Por ahora, redirige a creditos.html
  window.location.href = `credito.html?id=${creditoId}`;
}

document.addEventListener("DOMContentLoaded", () => {
  // Seleccionamos todas las celdas de la columna de días de atraso
  const diasAtrasoCells = document.querySelectorAll(".dias-atraso");

  diasAtrasoCells.forEach((cell) => {
    const dias = parseInt(cell.textContent.trim(), 10); // Convertimos el contenido a número

    // Aplicamos clases según el valor de los días de atraso
    if (dias > 180) {
      cell.classList.add("dias-atraso-grave");
    } else if (dias > 90) {
      cell.classList.add("dias-atraso-180");
    } else if (dias > 60) {
      cell.classList.add("dias-atraso-90");
    } else if (dias > 30) {
      cell.classList.add("dias-atraso-60");
    } else {
      cell.classList.add("dias-atraso-30");
    }
  });
});

// para la parte de Información General

// Función para cambiar entre pestañas
function showInfoTab(tabId) {
  const tabs = document.querySelectorAll(".info-tab");
  tabs.forEach((tab) => tab.classList.remove("active"));

  const activeTab = document.getElementById(tabId);
  activeTab.classList.add("active");
}

// Inicializar Chart.js
document.addEventListener("DOMContentLoaded", function () {
  // Perfil de Inversiones
  const perfilCtx = document
    .getElementById("perfilInversiones")
    .getContext("2d");
  new Chart(perfilCtx, {
    type: "pie",
    data: {
      labels: ["Inversión 1", "Inversión 2", "Inversión 3"],
      datasets: [
        {
          label: "Perfil de Inversiones",
          data: [40, 30, 30],
          backgroundColor: ["#007bff", "#28a745", "#ffc107"],
        },
      ],
    },
  });

  // Tasa de Créditos
  const tasaCtx = document.getElementById("tasaCreditos").getContext("2d");
  new Chart(tasaCtx, {
    type: "bar",
    data: {
      labels: ["Crédito A", "Crédito B", "Crédito C"],
      datasets: [
        {
          label: "Tasa de Créditos (%)",
          data: [8, 7, 6],
          backgroundColor: "#17a2b8",
        },
      ],
    },
    options: {
      scales: { y: { beginAtZero: true } },
    },
  });

  // Plazo de Créditos
  const plazoCtx = document.getElementById("plazoCreditos").getContext("2d");
  new Chart(plazoCtx, {
    type: "doughnut",
    data: {
      labels: ["12 meses", "24 meses", "36 meses"],
      datasets: [
        {
          label: "Plazo de Créditos",
          data: [20, 50, 30],
          backgroundColor: ["#fd7e14", "#20c997", "#6c757d"],
        },
      ],
    },
  });
});

// tabla riesgo

// Datos de la tabla
const ingresos = [1000000, 1500000, 2000000, 2500000];
const ebitda = [500000, 700000, 900000, 1100000];
const pasivos = [300000, 350000, 400000, 450000];
const utilidad = [200000, 250000, 300000, 350000];

// Llenar la tabla con datos
document.getElementById("ingresosAnio1Val").textContent = ingresos[0];
document.getElementById("ingresosAnio2Val").textContent = ingresos[1];
document.getElementById("ingresosAnio3Val").textContent = ingresos[2];
document.getElementById("ingresosAnio4Val").textContent = ingresos[3];

document.getElementById("ebitdaAnio1Val").textContent = ebitda[0];
document.getElementById("ebitdaAnio2Val").textContent = ebitda[1];
document.getElementById("ebitdaAnio3Val").textContent = ebitda[2];
document.getElementById("ebitdaAnio4Val").textContent = ebitda[3];

document.getElementById("pasivosAnio1Val").textContent = pasivos[0];
document.getElementById("pasivosAnio2Val").textContent = pasivos[1];
document.getElementById("pasivosAnio3Val").textContent = pasivos[2];
document.getElementById("pasivosAnio4Val").textContent = pasivos[3];

document.getElementById("utilidadAnio1Val").textContent = utilidad[0];
document.getElementById("utilidadAnio2Val").textContent = utilidad[1];
document.getElementById("utilidadAnio3Val").textContent = utilidad[2];
document.getElementById("utilidadAnio4Val").textContent = utilidad[3];

// Configuración de la gráfica 3D
const ctx = document.getElementById("graficaRiesgo").getContext("2d");
const graficaRiesgo = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Año 1", "Año 2", "Año 3", "Año 4"],
    datasets: [
      {
        label: "Ingresos",
        data: ingresos,
        backgroundColor: "#007bff",
        borderColor: "#0056b3",
        borderWidth: 1,
      },
      {
        label: "EBITDA",
        data: ebitda,
        backgroundColor: "#28a745",
        borderColor: "#218838",
        borderWidth: 1,
      },
      {
        label: "Pasivos",
        data: pasivos,
        backgroundColor: "#ffc107",
        borderColor: "#e0a800",
        borderWidth: 1,
      },
      {
        label: "Utilidad Neta/Pérdida",
        data: utilidad,
        backgroundColor: "#dc3545",
        borderColor: "#c82333",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.dataset.label + ": " + tooltipItem.raw;
          },
        },
      },
    },
  },
});

// Cartera de Créditos

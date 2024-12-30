// Objeto para almacenar los datos de la solicitud
const solicitudData = {
  informacionGeneral: {},
  datosFiscales: {},
  montoSolicitud: {},
  informacionFinanciera: {},
  costoCredito: {},
};

// Función para cambiar el paso activo
function changeStep(step) {
  // Desactivar todos los pasos
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`step-${i}`).classList.remove("active"); // Desactivar cada paso
    document.getElementById(`form-step-${i}`).classList.remove("active"); // Ocultar cada formulario
  }

  // Activar el paso actual
  document.getElementById(`step-${step}`).classList.add("active");
  document.getElementById(`form-step-${step}`).classList.add("active");
}

// Función para recopilar datos del paso actual
// Función para recopilar datos del paso actual
function collectData(step) {
  switch (step) {
    case 1:
      solicitudData.informacionGeneral = {
        nombreRepresentante: document.getElementById("representante-nombre")
          .value,
        razonSocial: document.getElementById("razon-social").value,
        tipoPersona: document.getElementById("persona-tipo").value,
        fechaConstitucion: document.getElementById("fecha-constitucion").value,
      };
      break;
    case 2:
      solicitudData.datosFiscales = {
        rfc: document.getElementById("rfc").value,
        regimenFiscal: document.getElementById("regimen-fiscal").value,
        domicilioFiscal: document.getElementById("domicilio-fiscal").value,
        actividadEconomica: document.getElementById("actividad-economica")
          .value,
      };
      break;
    case 3:
      solicitudData.montoSolicitud = {
        montoSolicitado: document.getElementById("monto-solicitado").value,
        fechaSolicitud: document.getElementById("fecha-solicitud").value,
        plazo: document.getElementById("plazo").value,
        frecuenciaPago: document.getElementById("frecuencia-pago").value,
      };
      break;
    case 4:
      solicitudData.informacionFinanciera = {
        ingresosAnuales: document.getElementById("ingresos").value,
        ebitdaAnual: document.getElementById("egresos").value,
        utilidad: document.getElementById("utilidad").value,
        coberturaEbitdaIntereses: document.getElementById("cobertura").value,
      };
      break;
  }
}

// Función para enviar los datos al backend
function enviarSolicitud() {
  console.log("Datos recopilados:", solicitudData); // Debugging
  
  fetch("http://localhost:8080/solicitudes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(solicitudData),
  })
    .then((response) => {
      if (!response.ok) {
        // Manejar errores HTTP
        return response.json().then((errorData) => {
          console.error("Error del servidor:", errorData);
          throw new Error("Error al enviar la solicitud: " + response.status);
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Respuesta del servidor:", data);
      alert("Solicitud enviada correctamente");
      window.location.href = "dashboard.html"; // Redirigir al dashboard
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Hubo un problema al enviar la solicitud. Por favor, inténtalo de nuevo.");
    });
}


// Función para ir al siguiente paso
function nextStep() {
  // Obtener el paso activo
  const activeStep = document.querySelector(".step.active");
  const activeIndex = parseInt(
    activeStep.querySelector(".step-circle").textContent
  );
  collectData(activeIndex);

  const nextStep = activeStep.nextElementSibling;

  // Si hay un siguiente paso, cambiar a él
  if (nextStep) {
    const nextIndex = parseInt(
      nextStep.querySelector(".step-circle").textContent
    );
    changeStep(nextIndex);
  } else {
    // Si no hay más pasos, enviar los datos al backend
    enviarSolicitud();
  }
}

//

// Para asegurarnos de que el primer paso se muestre al inicio
window.onload = () => {
  changeStep(1);
};

// Función para finalizar y enviar la solicitud
function finalizarSolicitud() {
  collectData(4); // Recopilar datos del último paso
  enviarSolicitud(); // Llamar a la función para enviar datos
}

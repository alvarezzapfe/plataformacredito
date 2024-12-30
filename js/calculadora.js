function calcularPago() {
  // Inputs
  const monto = parseFloat(document.getElementById("montoInput").value);
  const plazo = parseInt(document.getElementById("plazoInput").value);
  const spread = parseFloat(document.getElementById("spreadInput").value);
  const amortizable = document.getElementById("amortizableInput").value;

  // Verificar inputs
  if (isNaN(monto) || isNaN(plazo) || isNaN(spread)) {
    alert("Por favor ingrese todos los valores correctamente.");
    return;
  }

  // TIIE de referencia (sustituir con un valor real o API)
  // Tasa ejemplo en porcentaje
  const tasaInteresAnual = spread;

  // Cálculo mensual o trimestral
  const tasaMensual = tasaInteresAnual / 12 / 100;
  const pago =
    amortizable === "Amortizable"
      ? (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo))
      : monto * tasaMensual;

  // Formatear resultado como moneda
  const pagoFormateado = pago.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Mostrar resultado
  document.getElementById("resultadoPago").innerText = pagoFormateado;
}

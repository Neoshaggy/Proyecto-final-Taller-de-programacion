// 🚩 Procesar reserva con Variables, Arreglo y mostrar resultado

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("form-reserva");
  const mensaje = document.getElementById("mensaje-reserva");

  form.addEventListener("submit", function(e) {
    e.preventDefault(); // Evita recargar

    // Variables
    let nombre = document.getElementById("nombre").value;
    let pelicula = document.getElementById("pelicula").value;
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    const tipo = document.getElementById("tipo").value;

    // Arreglo con todos los datos (opcional, para mostrar que sabes usar arreglo)
    let datosReserva = [nombre, pelicula, fecha, hora, tipo];

    // Generar mensaje
    let msj = `Hola ${datosReserva[0]}, tu película "${datosReserva[1]}" ha sido reservada para ${datosReserva[2]} a la hora ${datosReserva[3]}, tipo de entrada "${datosReserva[4]}".`;

    // Mostrar en HTML
    mensaje.innerHTML = `<p>${msj}</p>`;
  });
});

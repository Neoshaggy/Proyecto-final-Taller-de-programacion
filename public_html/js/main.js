document.addEventListener("DOMContentLoaded", function() {
  const btnMenu = document.getElementById("btn-menu");
  const navMenu = document.getElementById("menu");
  if (btnMenu && navMenu) {
    btnMenu.onclick = function() {
      if (navMenu.style.display === "block") {
        navMenu.style.display = "none";
      } else {
        navMenu.style.display = "block";
      }
    };
  }

  const abrir = document.getElementById("abrir-modal");
  const cerrar = document.getElementById("cerrar-modal");
  const modal = document.getElementById("miModal");
  if (abrir && cerrar && modal) {
    abrir.onclick = function() {
      modal.style.display = "block";
    };
    cerrar.onclick = function() {
      modal.style.display = "none";
    };
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const titulo = document.getElementById("titulo-principal");
  if (titulo) {
    titulo.style.fontFamily = "Arial, sans-serif";
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const contenedor = document.getElementById("contenedor-logo");
  if (contenedor) {
    const img = document.createElement("img");
    img.src = "Imagenes/NeoShaggy.png";
    img.alt = "Logo";
    img.width = 100;
    contenedor.appendChild(img);
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const icono = document.getElementById("icono");
  if (icono) {
    icono.innerHTML = `<svg width="50" height="50">
      <circle cx="25" cy="25" r="20" fill="blue" />
    </svg>`;
  }
});


document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("form-reserva");
  const mensaje = document.getElementById("mensaje-reserva");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let pelicula = document.getElementById("pelicula").value;
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    const tipo = document.getElementById("tipo").value;

    let datosReserva = [nombre, pelicula, fecha, hora, tipo];

    let msj = `Hola ${datosReserva[0]}, tu película "${datosReserva[1]}" ha sido reservada para ${datosReserva[2]} a la hora ${datosReserva[3]}, tipo de entrada "${datosReserva[4]}".`;


    mensaje.innerHTML = `<p>${msj}</p>`;
      function cerrarSesion() {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "login.html"; // redirige al login
  }
   function iniciarSesion(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombreUsuario").value;
    
    if (nombre) {
      localStorage.setItem("usuarioLogueado", nombre);
      window.location.href = "index.html"; // ← Asegúrate que este archivo exista
    } else {
      alert("Ingresa tu nombre, porfa");
    }
  }
  });
});

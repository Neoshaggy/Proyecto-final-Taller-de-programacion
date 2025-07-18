// 🚩 eventos.js: Arreglos + forEach + Manipulación DOM

let eventos = ["Concierto Rock", "Festival Jazz", "Teatro Comedia"];
let contenedor = document.getElementById("lista-eventos");

eventos.forEach(function(e) {
  contenedor.innerHTML += "<p>" + e + "</p>";
});

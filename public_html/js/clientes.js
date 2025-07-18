document.addEventListener("DOMContentLoaded", function() {
  const boton = document.getElementById("btn-clientes");
  const contenedor = document.getElementById("lista-clientes");

  boton.addEventListener("click", function() {
    contenedor.innerHTML = ""; // Limpia contenido previo

    const clientes = ["Juan Pérez", "Ana Torres", "Carlos Díaz"];
    const ul = document.createElement("ul");

    clientes.forEach(function(cliente) {
      const li = document.createElement("li");
      li.textContent = cliente;
      li.style.color = "blue";
      ul.appendChild(li);
    });

    contenedor.appendChild(ul);
  });
});

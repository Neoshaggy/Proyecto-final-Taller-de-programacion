const lista = document.querySelector(".lista");
const agregar = document.querySelector("#agregar");
const contenido_carrito = document.querySelector(".contenido-carrito");
const carrito = document.querySelector(".fa-cart-shopping");
let listaRutinas = [];


main();
function main(){
    agregar.addEventListener("click", agregarRutina) 
    carrito.addEventListener("click", mostrarCarrito)
    contenido_carrito.addEventListener("click", eliminarItem);
}

function eliminarItem(e){
    if(!e.target.classList.contains("ba-x")) return;
    const nombre = e.target.parentElement.parentElement.firstElementChild.nextElementSibling.textContent;
    listaRutinas = listaRutinas.filter(rutina => rutina.nombre !== nombre)
    mostrarHTML();
}

function mostrarCarrito(e){
    e.preventDefault();
    e.target.parentElement.classList.toggle("vercarrito");
}

function agregarRutina(){
    const contenidoRutina = agregar.parentElement;
    leerDatosRutina(contenidoRutina);
}

function leerDatosRutina(rutina){
    const infoRutina = {
        nombre: rutina.querySelector(".title").textContent,
        precio: rutina.querySelector(".precio").textContent,
        cantidad: 1
    }

    if(existeLaRutina(infoRutina.nombre)){
        for(let i=0; i<listaRutinas.length; i++){
            console.log(listaRutinas)
            if(listaRutinas[i].nombre == infoRutina.nombre){
                listaRutinas[i].cantidad+=1;
            }
        }
    }else{
        listaRutinas.push(infoRutina);
    }
    mostrarHTML();
    alert("Se agrego un producto al carrito")
}


function existeLaRutina(nombreRutina){
    for(let rutina of listaRutinas){
        if(rutina.nombre == nombreRutina){
            return true;
        }
    }
    return false;
}

function mostrarHTML(){
    limpiarCarrito();
    let i = 0;
    while(listaRutinas[i]){
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${i}</td>
            <td>${listaRutinas[i].nombre}</td>
            <td>${listaRutinas[i].cantidad}</td>
            <td>${listaRutinas[i].precio}</td>
            <td><p class="ba-x">X</p></td>
        `;
        i++;
        contenido_carrito.appendChild(fila)
    }
}

function limpiarCarrito(){
    while(contenido_carrito.firstChild) {
        contenido_carrito.removeChild(contenido_carrito.firstChild);
    }
}

const galeria = document.querySelector(".box-galeria");
const modal = document.getElementById("modal_container");
const close = document.getElementById("close");

main()
function main() {
    galeria.addEventListener("click", abrirModal)
    close.addEventListener("click", cerrarModal)
}

function cerrarModal(e){
    modal.classList.remove("show");
}

const infoObj = {
    img: "",
    titulo: "",
    descripcion: "",
}

function abrirModal(e){
    const btnItem = e.target;
    if(!btnItem.classList.contains("open_modal")) return;
    infoObj.descripcion = btnItem.parentElement.firstElementChild.nextElementSibling.textContent;
    infoObj.titulo = btnItem.parentElement.firstElementChild.textContent;
    infoObj.img = btnItem.parentElement.previousElementSibling.firstElementChild.src;
    infoObj.precio = btnItem.parentElement.querySelector(".precio").textContent;
    modal.classList.add("show")
    modal.querySelector(".show-img").src = infoObj.img;
    modal.querySelector(".title").textContent = infoObj.titulo;
    modal.querySelector(".description").textContent = infoObj.descripcion;
    modal.querySelector(".precio").textContent = infoObj.precio;
}
 function mostrarInfo(imagen, nombre, rol) {
    document.querySelectorAll('.info-box').forEach(box => {
      box.classList.remove('visible');
      box.innerHTML = '';
    });

    const td = imagen.parentNode;
    const tr = td.parentNode; 
    const infoCell = tr.querySelector('.info-box');

    infoCell.innerHTML = `
      <strong>Nombre:</strong> ${nombre}<br>
      <strong>Rol:</strong> ${rol}<br>
      <em>¡Gracias por tu interés!</em>
    `;
    infoCell.classList.add('visible');
  }
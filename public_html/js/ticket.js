// Funcionalidad para el sistema de tickets
class TicketManager {
    constructor() {
        this.carrito = [];
        this.ticketCounter = this.getTicketCounter();
        this.initEventListeners();
    }

    // Inicializar event listeners
    initEventListeners() {
        // Escuchar el botón "Comprar Ahora"
        document.addEventListener('click', (e) => {
            if (e.target.id === 'comprar-ahora') {
                this.procesarCompraDirecta();
            }
        });

        // Escuchar clics en el carrito para comprar todo
        const carritoIcon = document.querySelector('.carrito');
        if (carritoIcon) {
            const comprarTodoBtn = this.createComprarTodoButton();
            carritoIcon.appendChild(comprarTodoBtn);
        }
    }

    // Crear botón "Comprar Todo" en el carrito
    createComprarTodoButton() {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-credit-card"></i> Comprar Todo';
        button.className = 'btn btn-success btn-sm mt-2';
        button.onclick = () => this.procesarCompraCarrito();
        return button;
    }

    // Procesar compra directa (un solo producto)
    procesarCompraDirecta() {
        const modal = document.getElementById('modal_container');
        const titulo = modal.querySelector('.title').textContent.trim();
        const descripcion = modal.querySelector('.description').textContent.trim();
        const precio = parseFloat(modal.querySelector('.precio').textContent.trim());
        const imagen = modal.querySelector('.show-img').src;

        const producto = {
            nombre: titulo,
            descripcion: descripcion,
            precio: precio,
            cantidad: 1,
            imagen: imagen
        };

        this.generarTicket([producto]);
        
        // Cerrar el modal actual
        document.getElementById('close').click();
    }

    // Procesar compra del carrito completo
    procesarCompraCarrito() {
        const carritoItems = document.querySelectorAll('.contenido-carrito tr');
        const productos = [];

        carritoItems.forEach(item => {
            const nombre = item.cells[1]?.textContent || '';
            const cantidad = parseInt(item.cells[2]?.textContent || '0');
            const precio = parseFloat(item.cells[3]?.textContent.replace('$', '') || '0');

            if (nombre && cantidad > 0) {
                productos.push({
                    nombre: nombre,
                    descripcion: 'Contenido digital premium',
                    precio: precio,
                    cantidad: cantidad
                });
            }
        });

        if (productos.length > 0) {
            this.generarTicket(productos);
            this.limpiarCarrito();
        } else {
            alert('El carrito está vacío. Agrega productos antes de comprar.');
        }
    }

    // Generar y mostrar el ticket
    generarTicket(productos) {
        const ticketNumber = this.generateTicketNumber();
        const fecha = new Date().toLocaleString('es-ES');
        
        // Llenar datos del ticket
        document.getElementById('ticket-numero').textContent = ticketNumber;
        document.getElementById('ticket-fecha').textContent = fecha;

        // Llenar productos
        const tbody = document.getElementById('ticket-productos');
        tbody.innerHTML = '';
        
        let subtotal = 0;
        
        productos.forEach(producto => {
            const total = producto.precio * producto.cantidad;
            subtotal += total;
            
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${producto.nombre}</td>
                <td class="text-center">${producto.cantidad}</td>
                <td class="text-end">$${producto.precio.toFixed(2)}</td>
                <td class="text-end">$${total.toFixed(2)}</td>
            `;
        });

        // Calcular totales
        const igv = subtotal * 0.18;
        const total = subtotal + igv;

        document.getElementById('ticket-subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('ticket-igv').textContent = `$${igv.toFixed(2)}`;
        document.getElementById('ticket-total').textContent = `$${total.toFixed(2)}`;

        // Mostrar modal del ticket
        const ticketModal = new bootstrap.Modal(document.getElementById('ticketModal'));
        ticketModal.show();

        // Guardar ticket en localStorage para referencia
        this.saveTicket({
            numero: ticketNumber,
            fecha: fecha,
            productos: productos,
            subtotal: subtotal,
            igv: igv,
            total: total
        });
    }

    // Generar número de ticket único
    generateTicketNumber() {
        this.ticketCounter++;
        localStorage.setItem('ticketCounter', this.ticketCounter);
        return `TKT-${String(this.ticketCounter).padStart(6, '0')}`;
    }

    // Obtener contador de tickets
    getTicketCounter() {
        return parseInt(localStorage.getItem('ticketCounter') || '0');
    }

    // Guardar ticket en localStorage
    saveTicket(ticket) {
        const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
        tickets.push(ticket);
        localStorage.setItem('tickets', JSON.stringify(tickets));
    }

    // Limpiar carrito después de la compra
    limpiarCarrito() {
        const tbody = document.querySelector('.contenido-carrito');
        if (tbody) {
            tbody.innerHTML = '';
        }
    }
}

// Función para imprimir ticket
function imprimirTicket() {
    const ticketContent = document.querySelector('#ticketModal .ticket-container').innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Ticket de Compra</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body { padding: 20px; font-family: monospace; }
                .ticket-container { max-width: 400px; margin: 0 auto; }
                @media print {
                    body { margin: 0; padding: 10px; }
                }
            </style>
        </head>
        <body>
            <div class="ticket-container">
                ${ticketContent}
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Función para descargar ticket como PDF (requiere jsPDF)
function descargarTicket() {
    // Implementación básica - en producción se usaría jsPDF
    alert('Función de descarga PDF próximamente disponible.\nPor ahora puedes usar la opción de imprimir y guardar como PDF.');
}

// Inicializar el sistema de tickets cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    window.ticketManager = new TicketManager();
    
    // Agregar estilos CSS adicionales para el ticket
    const style = document.createElement('style');
    style.textContent = `
        .ticket-container {
            font-family: 'Courier New', monospace;
            line-height: 1.4;
        }
        
        .ticket-container hr {
            border-style: dashed !important;
        }
        
        .table-borderless td,
        .table-borderless th {
            border: none !important;
            padding: 0.25rem 0.5rem;
        }
        
        @media print {
            .modal-header,
            .modal-footer,
            .btn-close {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);
});

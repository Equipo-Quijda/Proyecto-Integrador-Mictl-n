const API_URL = "http://localhost:3000/productos";
let productoSeleccionado = null;  // Variable global para el producto seleccionado

//Inician validaciones
// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Configurar validación para ambos inputs
    configurarValidacionLetras('nombre');
    configurarValidacionLetras('presentacion');
    
    // Función reutilizable para configurar la validación
    function configurarValidacionLetras(idInput) {
        const input = document.getElementById(idInput);
        let errorMostrado = false; // Bandera para controlar si el error ya se mostró
        
        // Validar mientras se escribe
        input.addEventListener('input', function(event) {
            const valor = event.target.value;
            const esValido = /^[A-Za-záéíóúÁÉÍÓÚñÑ ]*$/.test(valor);
            
            if (!esValido) {
                if (!errorMostrado) {
                    mostrarError(event.target);
                    errorMostrado = true;
                }
                // Limpiar caracteres no permitidos
                event.target.value = valor.replace(/[^A-Za-záéíóúÁÉÍÓÚñÑ ]/g, '');
            } else {
                if (errorMostrado) {
                    ocultarError(event.target);
                    errorMostrado = false;
                }
                event.target.classList.add('is-valid');
            }
        });
        
        // Prevenir pegado de contenido no válido
        input.addEventListener('paste', function(event) {
            event.preventDefault();
            const textoPegado = (event.clipboardData || window.clipboardData).getData('text');
            const textoLimpio = textoPegado.replace(/[^A-Za-záéíóúÁÉÍÓÚñÑ ]/g, '');
            document.execCommand('insertText', false, textoLimpio);
        });
    }
});

function mostrarError(input) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
}

function ocultarError(input) {
    input.classList.remove('is-invalid');
}
//Terminan validaciones


// Cargar productos desde JSON Server
function cargarProductos() {
    fetch(API_URL)
        .then(response => response.json())
        .then(productos => {
            const lista = document.getElementById("lista-productos");
            lista.innerHTML = ""; // Limpiar lista antes de agregar productos

            productos.forEach(producto => {
                const div = document.createElement("div");
                div.classList.add("product-item");
                div.textContent = `${producto.nombre} (${producto.presentacion}) - ${producto.cantidad}`;
                div.style.cursor = 'pointer';
                div.onclick = () => seleccionarProducto(div, producto);
                lista.appendChild(div);
            });
        })
        .catch(error => console.error("Error al cargar productos:", error));
}

// Seleccionar producto para editar
function seleccionarProducto(elemento, producto) {
    productoSeleccionado = producto;
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("cantidad").value = producto.cantidad;
    document.getElementById("presentacion").value = producto.presentacion;
    document.getElementById("descripcion").value = producto.descripcion;
    document.getElementById("imagen").value = producto.imagen
}

// Editar producto en JSON Server
function editarProducto() {
    if (!productoSeleccionado) {
        alert("Selecciona un producto para editar");
        return;
    }

    const productoEditado = {
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        cantidad: document.getElementById("cantidad").value,
        presentacion: document.getElementById("presentacion").value,
        descripcion: document.getElementById("descripcion").value,
        imagen: document.getElementById("imagen").value
    };

    fetch(`${API_URL}/${productoSeleccionado.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoEditado)
    })
        .then(response => response.json())
        .then(() => {
            alert("Producto actualizado correctamente");
            limpiarCampos();
            cargarProductos();
        })
        .catch(error => console.error("Error al editar:", error));
}

// Guardar producto en JSON Server
function guardarProducto() {
    const producto = {
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        cantidad: document.getElementById("cantidad").value,
        presentacion: document.getElementById("presentacion").value,
        descripcion: document.getElementById("descripcion").value,
        imagen: document.getElementById("imagen").value
    };

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
    })
    .then(response => response.json())
    .then(() => {
        alert("Producto guardado correctamente");
        limpiarCampos();
        cargarProductos(); // Recargar lista de productos
    })
    .catch(error => console.error("Error al guardar:", error));
}

// Limpiar campos del formulario
function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("presentacion").value = "";
    document.getElementById("descripcion").value = "";
}

// Cargar productos al iniciar
document.addEventListener('DOMContentLoaded', function () {
    cargarProductos(); // Se llama a la función sin parámetros
});

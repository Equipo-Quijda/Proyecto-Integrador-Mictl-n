const API_URL = "http://localhost:8080/productos";
let productoSeleccionado = null;  // Variable global para el producto seleccionado

//Inician validaciones
// Esperar a que el DOM esté completamente cargado


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
                div.innerHTML = `
                    <div class="card" style="display: flex; flex-direction: row; align-items: center; text-align: center; padding: 15px; background-color: #000; color: white; transition: background-color 0.3s, color 0.3s;">
                        <div class="card-image" style="flex: 1;">
                            <img src="${producto.imagen_url}" class="card-img" alt="${producto.nombre}" style="max-width: 100px; max-height: 150px; object-fit: cover;">
                        </div>
                        <div class="card-details" style="flex: 2; padding-left: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                            <h5 class="card-title" style="margin: 0;">${producto.nombre}</h5>
                            <p class="card-title" style="margin: 0; text-align: center;">${producto.inventario} unidades</p>
                        </div>
                    </div>
                `;
                div.querySelector('.card').addEventListener('mouseover', function() {
                    this.style.backgroundColor = '#333';
                    this.style.color = '#fff';
                });
                div.querySelector('.card').addEventListener('mouseout', function() {
                    this.style.backgroundColor = '#000';
                    this.style.color = 'white';
                });
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
    document.getElementById("id_producto").value = producto.id_producto;
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("cantidad").value = producto.inventario;
    document.getElementById("descripcion").value = producto.descripcion;
    document.getElementById("imagen").value = producto.imagen_url;
}

// Editar producto en JSON Server
function editarProducto() {
    if (!document.getElementById("id_producto")) {
        alert("Selecciona un producto para editar");
        return;
    }

    const productoEditado = {
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        inventario: document.getElementById("cantidad").value,
        descripcion: document.getElementById("descripcion").value,
        imagen_url: document.getElementById("imagen").value,
        id_categoria: 1,
    };

    

    fetch(`${API_URL}/id/${document.getElementById("id_producto").value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoEditado)
    })
    .then(response => {
        if (!response.ok) { 
            alert("Producto actualizado correctamente");
        }
            cargarProductos();
            limpiarCampos();
        })
        .catch(error => console.error("Error al editar:", error));
}

// Guardar producto en JSON Server
function guardarProducto() {
    const producto = {
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        inventario: document.getElementById("cantidad").value,
        descripcion: document.getElementById("descripcion").value,
        imagen_url: document.getElementById("imagen").value,
        id_categoria: 1,
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
    document.getElementById("imagen").value = "";
    document.getElementById("descripcion").value = "";
}

// Cargar productos al iniciar
document.addEventListener('DOMContentLoaded', function () {
    cargarProductos(); // Se llama a la función sin parámetros
});


//http://localhost:8080/productos/id/1
// Eliminar producto en JSON Server
function eliminarProducto() {
    if (!document.getElementById("id_producto").value) {
        alert("Selecciona un producto para eliminar");
        return;
    }

    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar el producto "${productoSeleccionado.nombre}"?`);
    if (!confirmacion) return;

    fetch(`${API_URL}/id/${document.getElementById("id_producto").value}`, {
        method: "DELETE"
    })
    .then(response => {
        if (response.ok) {
            alert("Producto eliminado correctamente");
            cargarProductos();
            limpiarCampos();
            productoSeleccionado = null; // Resetear producto seleccionado
        } else {
            alert("Error al eliminar el producto");
        }
    })
    .catch(error => console.error("Error al eliminar:", error));
}

const API_URL = "http://localhost:8080/productos"; 
const containerSelector = '.container-productos';
let productoSeleccionado = null;  // Variable global para el producto seleccionado

// Cargar productos desde el backend API
async function cargarProductos(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.error(`No se encontró el contenedor con el selector: ${containerSelector}`);
        return;
    }

    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        
        const productos = await response.json();
        console.log("Productos cargados:", productos);

        container.innerHTML = '';  // Limpiar el contenedor
        productos.forEach(prod => {
            const tarjeta = crearTarjetaProducto(prod);
            container.appendChild(tarjeta);
        });
    } catch (error) {
        console.error('Error al cargar productos desde la API:', error);
    }
}

// Crear tarjeta de producto
function crearTarjetaProducto(producto) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card-product');
    cardDiv.id = `producto-${producto.id_producto}`;  // Usar id_producto del objeto
    
    // Obtener los componentes del precio
    const precio = producto.precio.toString();
    const [precioEntero, precioDecimal = '00'] = precio.includes('.') ? 
                                               precio.split('.') : 
                                               [precio, '00'];
    
    // Usar imagen_url del producto o una imagen por defecto
    const imagenSrc = producto.imagen_url || 'https://via.placeholder.com/150';

    cardDiv.innerHTML = `
        <div class="imgBox">
            <img width="85%" src="${imagenSrc}" alt="${producto.nombre}" border="0">
        </div>
        <div class="contentBox">
            <h3 style="color:black; font-weight: bold;">${producto.nombre}</h3>
            <div id="hiddens">
                <h2 class="price">${precioEntero}.<small>${precioDecimal}</small>$</h2>
                <span >${producto.descripcion}</span>
                <span class="inventario">Disponibles: ${producto.inventario}</span>
                <div class="cart-controls">
                    <a href="#" class="buy" onclick="agregarAlCarrito(${producto.id_producto})">Añadir al carrito</a>
                </div>
            </div>
        </div>
    `;
    return cardDiv;
}

// Función para agregar productos al carrito
function agregarAlCarrito(idProducto) {
    console.log(`Agregando producto ID: ${idProducto}, Cantidad: 1`);

    // Obtener el carrito desde sessionStorage o inicializar uno nuevo
    let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.idProducto === idProducto);

    if (productoExistente) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        productoExistente.cantidad += cantidad;
    } else {
        cantidad = 1;
        // Si no está, agregarlo al carrito
        carrito.push({ idProducto, cantidad });
    }

    // Guardar el carrito actualizado en sessionStorage
    sessionStorage.setItem('carrito', JSON.stringify(carrito));

    console.log('Carrito actualizado:', carrito);

}

// Cargar productos al iniciar
document.addEventListener('DOMContentLoaded', async function () {
    await cargarProductos(containerSelector);
});
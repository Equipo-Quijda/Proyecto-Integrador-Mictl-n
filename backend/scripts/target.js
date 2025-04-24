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
            <img width="60%" src="${imagenSrc}" alt="${producto.nombre}" border="0">
        </div>
        <div class="contentBox">
            <h3>${producto.nombre}</h3>
            <div id="hiddens">
                <h2 class="price">${precioEntero}.<small>${precioDecimal}</small>$</h2>
                <p class="descripcion">${producto.descripcion}</p>
                <p class="inventario">Disponibles: ${producto.inventario}</p>
                <div class="cart-controls">
                    <div class="selector-cantidad">
                        <button class="boton-selector" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">-</button>
                        <input type="number" min="1" max="${producto.inventario}" value="1">
                        <button class="boton-selector" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">+</button>
                    </div>
                    <a href="#" class="buy" onclick="agregarAlCarrito(${producto.id_producto})">Añadir al carrito</a>
                </div>
            </div>
        </div>
    `;
    return cardDiv;
}

// Función para agregar productos al carrito
function agregarAlCarrito(idProducto) {
    const cantidad = document.querySelector(`#producto-${idProducto} input[type=number]`).value;
    console.log(`Agregando producto ID: ${idProducto}, Cantidad: ${cantidad}`);
    // Aquí puedes implementar la lógica para agregar al carrito
}

// Cargar productos al iniciar
document.addEventListener('DOMContentLoaded', async function () {
    await cargarProductos(containerSelector);
});
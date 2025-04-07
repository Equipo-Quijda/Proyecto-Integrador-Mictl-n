let rutaJson = '../backend/product.json';
let container = '.container-productos';
let $ = element => document.querySelector(element);

async function cargarProductos(rutaJson, containerSelector) {
    // En donde se insertarán las tarjetas
    const container = document.querySelector(containerSelector);

    if (!container) {
        console.error(`No se encontró el contenedor con el selector: ${containerSelector}`);
        return;
    }

    // Cargar el archivo JSON
    await fetch(rutaJson)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo JSON');
            }
            return response.json();
        })
        .then(productos => {
            // Limpiar el contenedor
            container.innerHTML = '';
            // Recorrer la lista de productos y crear una tarjeta para cada uno
            productos.forEach(prod => {
                
                // Crear la tarjeta usando el template
                const tarjeta = crearTarjetaProducto(prod);

                // Agregar la tarjeta al contenedor
                container.appendChild(tarjeta);

            });

        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
}

function crearTarjetaProducto(producto) {

    // Crear el elemento div principal de la tarjeta
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card-product');
    cardDiv.id = producto.id;


    let nombreProducto = producto.nombre;  // Reemplaza con el nombre del producto dinámico
    let precioEntero = producto.precio.split('.')[0];                 // Parte entera del precio
    let precioDecimal = producto.precio.split('.')[1];                // Parte decimal del precio
    let imagenSrc = producto.imagen;      // Reemplaza con la URL o ruta de la imagen
    
    // Inserta el template en el innerHTML del contenedor
    cardDiv.innerHTML = `
    <div class="imgBox">
      <img src="${imagenSrc}" alt="${nombreProducto}" border="0">
    </div>
    <div class="contentBox">
      <h3>${nombreProducto}</h3>
      <div id="hiddens">
        <h2 class="price">${precioEntero}.<small>${precioDecimal}</small>$</h2>
        <div class="cart-controls">
          <div class="selector-cantidad">
            <button class="boton-selector" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">-</button>
            <input type="number" min="1" max="10" value="1">
            <button class="boton-selector" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">+</button>
          </div>
          <a href="#" class="buy">Añadir al carrito</a>
        </div>
      </div>
    </div>
`;

    return cardDiv;
}



document.addEventListener('DOMContentLoaded', async function() {
    await cargarProductos(rutaJson, container);
    // ========== [Código para el producto] ==========
    const botonCarrito = document.querySelector('.buy');
    const inputCantidad = document.querySelector('.selector-cantidad input[type=number]');
    const priceElement = document.querySelector('.price');
    const originalPrice = 66.50; // Precio unitario fijo

    // Función para actualizar el precio al cambiar la cantidad
    function actualizarPrecio() {
        const cantidad = parseInt(inputCantidad.value) || 1;
        const nuevoPrecio = (originalPrice * cantidad).toFixed(2);
        priceElement.innerHTML = `${nuevoPrecio.split('.')[0]}<small>.${nuevoPrecio.split('.')[1]}</small>$`;
    }

    // Función para añadir al carrito
    function añadirAlCarrito() {
        const producto = {
            nombre: 'Cerveza Quijada',
            precio: originalPrice,
            cantidad: parseInt(inputCantidad.value) || 1
        };

        // Manejo del localStorage
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Feedback visual
        botonCarrito.textContent = '¡Añadido!';
        botonCarrito.style.backgroundColor = '#00d6ac';
        setTimeout(() => {
            botonCarrito.textContent = 'Añadir al carrito';
            botonCarrito.style.backgroundColor = '#ffce00';
        }, 2000);
    }

    // Event listeners
    if (inputCantidad) {
        inputCantidad.addEventListener('change', () => {
            if (inputCantidad.value < 1) inputCantidad.value = 1;
            if (inputCantidad.value > 10) inputCantidad.value = 10;
            actualizarPrecio();
        });

        // Para los botones + y -
        document.querySelectorAll('.boton-selector').forEach(boton => {
            boton.addEventListener('click', () => setTimeout(actualizarPrecio, 10));
        });
    }

    if (botonCarrito) {
        botonCarrito.addEventListener('click', añadirAlCarrito);
    }

    // Inicializar precio
    actualizarPrecio();

});

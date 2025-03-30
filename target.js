const API_URL = "http://localhost:3000/productos";
        let rutaJson = './db.json';
        let containerSelector = '.container-productos';
        let productoSeleccionado = null;  // Variable global para el producto seleccionado

        // Cargar productos desde JSON Server o desde un archivo JSON local
        async function cargarProductos(rutaJson, containerSelector) {
            const container = document.querySelector(containerSelector);
            if (!container) {
                console.error(`No se encontró el contenedor con el selector: ${containerSelector}`);
                return;
            }

            // Intentamos cargar productos desde el backend API (JSON Server)
            try {
                let response = await fetch(API_URL);
                if (response.ok) {
                    let productos = await response.json();
                    container.innerHTML = '';  // Limpiar el contenedor antes de agregar los productos
                    productos.forEach(prod => {
                        const tarjeta = crearTarjetaProducto(prod);
                        container.appendChild(tarjeta);
                    });
                } else {
                    throw new Error('No se pudo cargar desde el backend. Intentando con archivo JSON local.');
                }
            } catch (error) {
                console.error('Error al cargar desde el backend, intentando archivo local:', error);
                // Si falla el backend, cargamos desde el archivo JSON local
                await cargarProductosDesdeJsonLocal(rutaJson, container);
            }
        }

        // Cargar productos desde el archivo JSON local
        async function cargarProductosDesdeJsonLocal(rutaJson, container) {
            try {
                const response = await fetch(rutaJson);
                const productos = await response.json();
                container.innerHTML = '';  // Limpiar el contenedor antes de agregar los productos
                productos.forEach(prod => {
                    const tarjeta = crearTarjetaProducto(prod);
                    container.appendChild(tarjeta);
                });
            } catch (error) {
                console.error('Error al cargar el archivo JSON local:', error);
            }
        }

        // Crear tarjeta de producto
        function crearTarjetaProducto(producto) {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card-product');
            cardDiv.id = producto.id;
            const nombreProducto = producto.nombre;
            const precioEntero = producto.precio.split('.')[0];
            const precioDecimal = producto.precio.split('.')[1];
            const imagenSrc = producto.imagen; 
        
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
           // Cargar productos al iniciar
           document.addEventListener('DOMContentLoaded', async function () {
            await cargarProductos(rutaJson, containerSelector);
        });
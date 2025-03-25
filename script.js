let rutaJson = './backend/equipo.json';
let container = '.carousel-inner';
let botonesCarusel = '.carousel-indicators';
let $ = element => document.querySelector(element);
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos necesarios
    const cardProduct = document.querySelector('.card-product');
    const botonCarrito = document.querySelector('.buy');
    const selectorCantidad = document.querySelector('.selector-cantidad');
    const inputCantidad = selectorCantidad.querySelector('input[type=number]');

    // Función para añadir al carrito
    function añadirAlCarrito() {
        const producto = {
            nombre: 'Cerveza Quijada',
            precio: 66.50,
            cantidad: parseInt(inputCantidad.value) || 1
        };

        // Ejemplo simple de almacenamiento en localStorage
        let carrito = [];
        
        // Intenta obtener el carrito existente
        try {
            const carritoGuardado = localStorage.getItem('carrito');
            if (carritoGuardado) {
                carrito = JSON.parse(carritoGuardado);
            }
        } catch(error) {
            carrito = [];
        }

        // Agregar el nuevo producto al carrito con push
        if (Array.isArray(carrito)) {
            carrito.push(producto);
        } else {
            carrito = [producto];
        }
        
        // Guardar en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Animación de añadido
        botonCarrito.textContent = '¡Añadido!';
        botonCarrito.style.backgroundColor = '#00d6ac';
        
        // Volver al texto original después de 2 segundos
        setTimeout(() => {
            botonCarrito.textContent = 'Añadir al carrito';
            botonCarrito.style.backgroundColor = '#ffce00';
        }, 2000);

        console.log('Producto añadido:', producto);
    }

    // Evento para añadir al carrito
    if (botonCarrito) {
        botonCarrito.addEventListener('click', añadirAlCarrito);
    }

    // Validar entrada de cantidad
    if (inputCantidad) {
        inputCantidad.addEventListener('change', () => {
            const valor = parseInt(inputCantidad.value);
            if (isNaN(valor) || valor < 1) inputCantidad.value = 1;
            if (valor > 10) inputCantidad.value = 10;
        });
    }
});

cargarTarjetasDesarrolladores(rutaJson, container);

async function cargarTarjetasDesarrolladores(rutaJson, containerSelector) {
    // En donde se insertarán las tarjetas
    const container = document.querySelector(containerSelector);
    const containerCarusel = document.querySelector('.carousel-indicators');

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
        .then(desarrolladores => {
            // Limpiar el contenedor
            container.innerHTML = '';
            containerCarusel.innerHTML = '';
            // Recorrer la lista de desarrolladores y crear una tarjeta para cada uno
            desarrolladores.forEach(dev => {
                
                // Crear la tarjeta usando el template
                const tarjeta = crearTarjetaDesarrollador(dev, desarrolladores.indexOf(dev));

                // Agregar la tarjeta al contenedor
                container.appendChild(tarjeta);
            });
        })
        .catch(error => {
            console.error('Error al cargar los desarrolladores:', error);
        });
}

function crearTarjetaDesarrollador(desarrollador, position) {
    // Crear el elemento div principal de la tarjeta
    const cardDiv = document.createElement('div');
    const caruselButton = document.createElement('button');
    const containerCarusel = document.querySelector('.carousel-indicators');
    caruselButton.setAttribute('type', 'button');
    caruselButton.setAttribute('data-bs-target', '#carouselExampleIndicators');
    caruselButton.setAttribute('data-bs-slide-to', position);
    caruselButton.setAttribute('aria-label', 'Slide ' + position);
    
    if (position === 0) {
        caruselButton.className = 'active';
        cardDiv.classList.add("carousel-item");
        cardDiv.classList.add("active");
        console.log(cardDiv.classList);
    } else {
        cardDiv.classList.add("carousel-item");
    }


    containerCarusel.appendChild(caruselButton);


    // Crear el HTML de la tarjeta usando el template proporcionado
    cardDiv.innerHTML = `
      <div class="centrao">
      <div class="card_quijada">
        <div class="profilePhoto">
            <img src="${desarrollador.foto}" width="50%">
            <h2 id="nombre_dev">${desarrollador.nombre}</h2>
        </div>
        <div class="quijada_card_description">
            <hr id="under_dev">
            <h3>${desarrollador.puesto}</h3>
            <p>${desarrollador.descripcion}</p>
        </div>
        <div class="iconos">
            <a href="${desarrollador.linkedin}" target="_blank" ><img id="icon" src="${desarrollador.iconos.linkedin}"></a>
            <a href="${desarrollador.github}" target="_blank" ><img id="icon" src="${desarrollador.iconos.github}"></a>
            <a href="${desarrollador.gmail}" target="_blank" ><img id="icon" src="${desarrollador.iconos.gmail}"></a>
        </div>
        </div>
    </div>
    `;

    return cardDiv;
}

function validarTarjeta(input) {
    // Eliminar caracteres no numéricos
    input.value = input.value.replace(/\D/g, '');

    // Formatear en grupos de 4 dígitos
    input.value = input.value.replace(/(\d{4})(?=\d)/g, '$1-');

    // Validar el inicio de la tarjeta
    const tarjeta = input.value.replace(/-/g, '');
    if (tarjeta.startsWith('4') || tarjeta.startsWith('5')) {
        input.setCustomValidity('');
    } else {
        input.setCustomValidity('El número de tarjeta debe comenzar con 4 (Visa) o 5 (MasterCard).');
    }
}

function validarFechaExpiracion(input) {
    // Eliminar caracteres no numéricos excepto "/"
    input.value = input.value.replace(/[^0-9/]/g, '');

    // Formatear como "MM/AA"
    if (input.value.length === 2 && !input.value.includes('/')) {
        input.value = input.value + '/';
    }

    // Validar formato y rango
    const partes = input.value.split('/');
    if (partes.length === 2) {
        const mes = parseInt(partes[0], 10);
        const anio = parseInt(partes[1], 10);
        if (mes >= 1 && mes <= 12 && anio >= 0 && anio <= 99) {
            input.setCustomValidity('');
        } else {
            input.setCustomValidity('Fecha inválida. Use el formato MM/AA.');
        }
    } else {
        input.setCustomValidity('Fecha inválida. Use el formato MM/AA.');
    }
}

function validarCVV(input) {
    // Eliminar caracteres no numéricos
    input.value = input.value.replace(/\D/g, '');

    // Validar longitud
    if (input.value.length === 3) {
        input.setCustomValidity('');
    } else {
        input.setCustomValidity('El CVV debe tener 3 dígitos.');
    }
}
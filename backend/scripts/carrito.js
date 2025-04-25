function calcularPrecioFinal() {
    let total = 0;
    document.querySelectorAll('#carrito-body tr').forEach(row => {
        const precio = parseFloat(row.cells[5].textContent.replace('$', ''));
        total += precio;
    });
    document.getElementById('precio-final').textContent = `$${total.toFixed(2)}`;
}

function continuarCompra() {
    alert('Continuando con la compra...');
    window.location.href = '/paginas/pasarela.html';
    // Aquí puedes redirigir a otra página o realizar alguna acción
}

function cancelarCompra() {
    alert('Compra cancelada.');
    // Aquí puedes limpiar el carrito o realizar alguna acción
}

// Calcular el precio final al cargar la página
calcularPrecioFinal();
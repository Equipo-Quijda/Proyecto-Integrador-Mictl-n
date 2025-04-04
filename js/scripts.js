document.addEventListener('DOMContentLoaded', function() {
    // Verificar sesión y actualizar navbar
    const user = JSON.parse(localStorage.getItem('mictlanUser'));
    updateNavbar(user);
    
    // Crear partículas en todas las páginas
    createParticles();
});

function updateNavbar(user) {
    const loginLink = document.getElementById('login-link');
    const productsLink = document.querySelector('a[href="productos.html"]')?.parentElement;
    const adminLink = document.getElementById('admin-link');
    
    if (user) {
        // Mostrar nombre abreviado
        loginLink.innerHTML = `<i class="fas fa-user-circle"></i> ${user.nombre.split(' ')[0]}`;
        loginLink.href = "perfil.html";
        
        // Mostrar productos siempre que haya sesión
        if (productsLink) productsLink.style.display = 'block';
        
        // Mostrar admin solo si es administrador
        if (user.rol === 'admin' && adminLink) {
            adminLink.style.display = 'block';
        } else if (adminLink) {
            adminLink.style.display = 'none';
        }
    } else {
        // Sin sesión
        loginLink.innerHTML = '<i class="fas fa-user-circle"></i> INGRESAR';
        loginLink.href = "login.html";
        
        // Ocultar productos y admin
        if (productsLink) productsLink.style.display = 'none';
        if (adminLink) adminLink.style.display = 'none';
    }
}

function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = `-${size}px`;
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        
        container.appendChild(particle);
    }
}
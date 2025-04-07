document.addEventListener('DOMContentLoaded', function() {
    // Verificar sesión y actualizar navbar
    if(localStorage.getItem('mictlanUser')){
        const user = JSON.parse(localStorage.getItem('mictlanUser'));
        updateNavbar(user);
    }

    // Crear partículas en todas las páginas
    createParticles();
});

function updateNavbar(user) {
    const navbarNav = document.getElementById('navbarNav');
    const navList = navbarNav?.querySelector('.navbar-nav');
    
    if (!navList) return;

    // Remover elementos existentes de usuario si los hay
    const existingUserItems = navList.querySelectorAll('.user-nav-item');
    existingUserItems.forEach(item => item.remove());
    
    if (user) {
        // Agregar elementos para usuario logueado
        const userItem = document.createElement('li');
        userItem.className = 'nav-item user-nav-item';
        userItem.innerHTML = `
            <a class="nav-link" href="./paginas/perfil.html">
                <i class="fas fa-user-circle"></i> ${user.nombre.split(' ')[0]}
            </a>
        `;
        
        // Agregar link de admin si corresponde
        if (user.rol === 'admin') {
            const adminItem = document.createElement('li');
            adminItem.className = 'nav-item user-nav-item';
            adminItem.innerHTML = `
                <a class="nav-link" href="./paginas/usuarios.html">
                    <i class="fas fa-users-cog"></i> Admin
                </a>
            `;
            navList.appendChild(adminItem);
        }
        
        navList.appendChild(userItem);
        
    } else {
        // Agregar link de login para usuario no logueado
        const loginItem = document.createElement('li');
        loginItem.className = 'nav-item user-nav-item';
        loginItem.innerHTML = `
            <a class="nav-link" href="./paginas/login.html">
                <i class="fas fa-user-circle"></i> INGRESAR
            </a>
        `;
        navList.appendChild(loginItem);
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
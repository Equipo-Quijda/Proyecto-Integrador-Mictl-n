document.addEventListener('DOMContentLoaded', function() {
    const navprod = document.getElementById('nav-productos');
    const navusers = document.getElementById('nav-usuarios');
    const navlogin = document.getElementById('login-in');
    const navlogout = document.getElementById('login-out');

    navlogout.addEventListener('click', () => logout());

    // Verificar sesión y actualizar navbar
    if(localStorage.getItem('mictlanUser')){
        const user = JSON.parse(localStorage.getItem('mictlanUser'));
        updateNavbar(user);
    }else{
        navprod.hidden = true;
        navusers.hidden = true;
        navlogin.hidden = false;
        navlogout.hidden = true;
    }

    // Crear partículas en todas las páginas
    createParticles();
});

function updateNavbar(user) {
    const navprod = document.getElementById('nav-productos');
    const navusers = document.getElementById('nav-usuarios');
    const navlogin = document.getElementById('login-in');
    const navlogout = document.getElementById('login-out');
    
    if (user) {
        
        navlogin.hidden = true;

        // Agregar link de admin si corresponde
        if (user.rol === 'admin') {
            navprod.hidden = false;
            navusers.hidden = false;
        }
        
        navlogout.innerHTML = `<a class="nav-link" href="#">
              <i class="fas fa-user"></i> ${user.nombre}
          </a>`;

        navlogout.hidden = false;

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

function logout(){
    if(localStorage.getItem('mictlanUser')){
        localStorage.removeItem('mictlanUser');
        console.log("Documento eliminado con exito......");
        location.reload();
    }

    window.location.href = '../index.html';
}
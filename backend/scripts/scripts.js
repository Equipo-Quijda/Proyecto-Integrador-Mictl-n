document.addEventListener('DOMContentLoaded', function() {
    const navprod = document.getElementById('nav-productos');
    const navusers = document.getElementById('nav-usuarios');
    const navlogin = document.getElementById('login-in');
    const navlogout = document.getElementById('login-out');

    if (document.getElementById('logoutButton')){
        const logoutButton = document.getElementById('logoutButton');
        logoutButton.addEventListener('click', () => logout());
    }


    // Verificar sesión y actualizar navbar
    if(sessionStorage.getItem('mictlanUser')){
        const user = JSON.parse(sessionStorage.getItem('mictlanUser'));
        updateNavbar(user);
    }else{
        navprod.hidden = true;
        navusers.hidden = true;
        navlogin.hidden = false;
        navlogout.hidden = true;
    }

    // Verificar si el usuario ya confirmó su edad
    checkAgeVerification();

    // Crear partículas en todas las páginas
    createParticles();

    // Configurar eventos para los botones de verificación de edad
    const confirmAgeBtn = document.getElementById('confirmAge');
    const cancelAgeBtn = document.getElementById('cancelAge');
    
    if (confirmAgeBtn && cancelAgeBtn) {
        confirmAgeBtn.addEventListener('click', () => {
            // Guardar en localStorage que el usuario confirmó su edad
            sessionStorage.setItem('ageVerified', 'true');
            hideAgeVerificationModal();
        });
        
        cancelAgeBtn.addEventListener('click', () => {
            // Redirigir a una página apropiada para menores de edad
            window.location.href = 'https://www.google.com';
        });
    }
});

function updateNavbar(user) {
    const navprod = document.getElementById('nav-productos');
    const navusers = document.getElementById('nav-usuarios');
    const navlogin = document.getElementById('login-in');
    const navlogout = document.getElementById('login-out');
    const navperfil = document.getElementById('navperfil');
    
    if (user) {
        
        navlogin.hidden = true;

        // Agregar link de admin si corresponde
        if (user.rolId === 1) {
            navprod.hidden = false;
            navusers.hidden = false;
        }
        
        navperfil.innerHTML = `
              <i class="fas fa-user"></i> ${user.nombre}
          `;

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
    if(sessionStorage.getItem('mictlanUser')){
        sessionStorage.removeItem('mictlanUser');
        console.log("Documento eliminado con exito......");
        location.reload();
    }

    window.location.href = '../index.html';
}

// Funciones para el modal de verificación de edad
function checkAgeVerification() {
    const ageVerificationModal = document.getElementById('ageVerificationModal');
    
    // Si no existe el modal en esta página, salir de la función
    if (!ageVerificationModal) return;
    
    // Verificar si el usuario ya confirmó su edad anteriormente
    if (sessionStorage.getItem('ageVerified') === 'true') {
        hideAgeVerificationModal();
    } else {
        showAgeVerificationModal();
    }
}

function hideAgeVerificationModal() {
    const modal = document.getElementById('ageVerificationModal');
    if (modal) {
        // Aplicar animación de desvanecimiento
        modal.style.animation = 'fadeOut 0.8s ease forwards';
        
        // Esperar a que termine la animación antes de ocultar completamente
        setTimeout(() => {
            modal.style.display = 'none';
        }, 800); // Tiempo igual a la duración de la animación
    }
}

function showAgeVerificationModal() {
    const modal = document.getElementById('ageVerificationModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

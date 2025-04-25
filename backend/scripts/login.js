document.addEventListener('DOMContentLoaded', function() {

    sessionStorage.removeItem('mictlanUser');
    const loginForm = document.getElementById('loginForm');
    const loading = document.getElementById('loading');
    
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const correo = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Validación básica
        if (!correo || !password) {
            showError('¡Ambos campos son requeridos!');
            return;
        }
        // Mostrar animación de carga
        loading.style.display = 'flex';
        loginForm.style.opacity = '0.5';
        
        var data = fetch('http://localhost:8080/usuarios/login', {
            method: 'POST', // GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                // Otros headers como Authorization
            },
            body: JSON.stringify({ correo, password }) // Enviar datos como JSON
        })
        .then(response => {
            // Verificar si la respuesta es correcta
            if (!response.ok) {
                return false;
            }
            return response.json();
         }).then(user => {
            if (!user) {
                loading.style.display = 'none';
                loginForm.style.opacity = '1';
                showError('¡Credenciales incorrectas! Intenta nuevamente.');
                return;
            }
            console.log(user);
            const userToStore = {
                ...user,
            };
            sessionStorage.setItem('mictlanUser', JSON.stringify(userToStore));
            
            // Redirigir según rol
            window.location.href = user.rol === 'admin' ? 'users.html' : '../index.html';
         })
    });
    
    function showError(message) {
        // Eliminar error previo si existe
        const existingError = document.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i> ${message}
        `;
        errorDiv.style.color = '#ff6b6b';
        errorDiv.style.marginTop = '15px';
        errorDiv.style.textAlign = 'center';
        errorDiv.style.animation = 'fadeIn 0.5s';
        
        loginForm.appendChild(errorDiv);
        
        // Efecto de vibración en el formulario
        loginForm.style.animation = 'shake 0.5s';
        setTimeout(() => {
            loginForm.style.animation = '';
        }, 500);
    }
    
    // Agregar estilos dinámicos para la animación
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});
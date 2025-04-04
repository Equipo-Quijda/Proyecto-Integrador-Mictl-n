document.addEventListener('DOMContentLoaded', function() {
    // Verificar si ya hay sesión activa
    if (localStorage.getItem('mictlanUser')) {
        const user = JSON.parse(localStorage.getItem('mictlanUser'));
        window.location.href = user.rol === 'admin' ? 'usuarios.html' : 'perfil.html';
    }

    const loginForm = document.getElementById('loginForm');
    const loading = document.getElementById('loading');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Validación básica
        if (!email || !password) {
            showError('¡Ambos campos son requeridos!');
            return;
        }
        
        // Mostrar animación de carga
        loading.style.display = 'flex';
        loginForm.style.opacity = '0.5';
        
        // Simular tiempo de carga (en producción sería una petición AJAX)
        setTimeout(() => {
            // Simulación de usuarios
            const users = [
                {
                    email: 'tezcatlipoca@mictlan.com',
                    password: 'xibalba2023',
                    nombre: 'Tezcatlipoca',
                    avatar: 'tezcatlipoca.png',
                    rol: 'user',
                    rango: 'Explorador del Inframundo',
                    ingresos: '2023-01-01',
                    favoritos: ['Pulque Divino', 'Mezcal de Obsidiana', 'Tepache de Xibalba']
                },
                {
                    email: 'mictlantecuhtli@mictlan.com',
                    password: 'admin123',
                    nombre: 'Mictlantecuhtli',
                    avatar: 'quetzalcoatl.png',
                    rol: 'admin',
                    rango: 'Señor del Inframundo',
                    ingresos: '2023-03-15',
                    favoritos: ['Aguamiel Sagrada', 'Colonche de Tuna']
                }
            ];
            
            const user = users.find(u => u.email === email && u.password === password);
            
            if (!user) {
                loading.style.display = 'none';
                loginForm.style.opacity = '1';
                showError('¡Credenciales incorrectas! Intenta nuevamente.');
                return;
            }
            
            // Guardar en LocalStorage (sin password por seguridad)
            const userToStore = {
                ...user,
                password: undefined
            };
            localStorage.setItem('mictlanUser', JSON.stringify(userToStore));
            
            // Redirigir según rol
            window.location.href = user.rol === 'admin' ? 'usuarios.html' : 'perfil.html';
        }, 1500);
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
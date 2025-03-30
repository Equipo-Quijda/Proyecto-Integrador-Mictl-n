document.addEventListener('DOMContentLoaded', function() {
    // Obtener el formulario y sus elementos
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const phoneInput = document.getElementById('phone');
    
    // Función para validar email con expresión regular básica
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // Función para mostrar alerta
    function showAlert(message, type) {
        alert(message);
    }

    // Validar el numero de telefono
    phoneInput.addEventListener('input', function() {
        phoneInput.value = phoneInput.value.replace(/[^0-9]/g, '');
    }
    );
    
    // Validar el formulario al enviar
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;
        let errorMessage = "";
        
        // Validar nombre
        if (nameInput.value.trim() === '') {
            isValid = false;
            errorMessage = "Por favor, introduce tu nombre.";
            nameInput.classList.add('is-invalid');
        } else {
            nameInput.classList.remove('is-invalid');
        }
        
        // Validar email
        if (emailInput.value.trim() === '') {
            isValid = false;
            errorMessage = "Por favor, introduce tu correo electrónico.";
            emailInput.classList.add('is-invalid');
        } else if (!isValidEmail(emailInput.value.trim())) {
            isValid = false;
            errorMessage = "Por favor, introduce un correo electrónico válido.";
            emailInput.classList.add('is-invalid');
        } else {
            emailInput.classList.remove('is-invalid');
        }

        //Validar numero de telefono
        if (phoneInput.value.trim() === '') {
            isValid = false;
            errorMessage = "Por favor, introduce tu número de teléfono.";
            phoneInput.classList.add('is-invalid');
        } else {
            phoneInput.classList.remove('is-invalid');
        }
        
        // Validar asunto
        if (subjectInput.value.trim() === '') {
            isValid = false;
            errorMessage = "Por favor, introduce el asunto.";
            subjectInput.classList.add('is-invalid');
        } else {
            subjectInput.classList.remove('is-invalid');
        }
        
        // Validar mensaje
        if (messageInput.value.trim() === '') {
            isValid = false;
            errorMessage = "Por favor, introduce tu mensaje.";
            messageInput.classList.add('is-invalid');
        } else {
            messageInput.classList.remove('is-invalid');
        }
        
        // Mostrar alerta de error o enviar formulario
        if (!isValid) {
            showAlert(errorMessage, 'error');
        } else {
            showAlert('¡Mensaje enviado con éxito!', 'success');
            contactForm.reset();
            // Aquí se podría enviar el formulario realmente
            // contactForm.submit();
        }
    });
    
    // Eliminar la clase de error al escribir en los campos
    const formInputs = [nameInput, emailInput, subjectInput, messageInput];
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            input.classList.remove('is-invalid');
        });
    });
});
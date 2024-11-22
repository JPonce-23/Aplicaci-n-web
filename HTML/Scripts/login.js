document.addEventListener("DOMContentLoaded", () => 
    {
    const form = document.querySelector("form");
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');

    form.addEventListener("submit", (event) => {
        // Evitar el envío del formulario si hay errores
        event.preventDefault();

        let errors = [];

        // Validar el correo electrónico
        if (emailInput.value.trim() === "") {
            errors.push("El correo electrónico no puede estar vacío.");
        } else if (!validateEmail(emailInput.value)) {
            errors.push("Ingresa un correo electrónico válido.");
        }

        // Validar la contraseña
        if (passwordInput.value.trim() === "") {
            errors.push("La contraseña no puede estar vacía.");
        }

        // Mostrar errores o enviar el formulario
        if (errors.length > 0) {
            alert(errors.join("\n"));
        } else {
            // Aquí puedes manejar el envío, como redirigir o realizar una petición a un servidor
            alert("Inicio de sesión exitoso");
            form.submit(); // Opcional: solo si decides no manejar el envío con JS
        }
    });

    // Función para validar el formato de un correo electrónico
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});

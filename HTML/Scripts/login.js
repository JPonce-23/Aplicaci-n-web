document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevenir el envío del formulario por defecto

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

        // Mostrar errores si existen
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        // Enviar los datos al backend
        const loginData = {
            email: emailInput.value,
            password: passwordInput.value,
        };

        try {
            const response = await fetch("http://localhost:3000/login", { // Cambia la URL según tu configuración
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Inicio de sesión exitoso.");
                window.location.href = "Dashboard.html"; // Redirigir a otra página después del login
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Ocurrió un problema al conectar con el servidor.");
        }
    });

    // Función para validar el formato de un correo electrónico
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});

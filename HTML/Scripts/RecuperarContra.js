document.addEventListener("DOMContentLoaded", function () {
    const recuperarBoton = document.querySelector(".boton");
    const emailInput = document.querySelector("input[type='email']");

    // Validar el formato de correo electrónico
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    recuperarBoton.addEventListener("click", async function (event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
        const email = emailInput.value.trim(); // Obtener y limpiar el valor del campo de correo

        if (!email) {
            alert("Por favor, ingrese su correo electrónico.");
            return;
        }

        if (!validarEmail(email)) {
            alert("Por favor, ingrese un correo electrónico válido.");
            return;
        }

        // Mostrar indicador de carga
        recuperarBoton.disabled = true;
        recuperarBoton.textContent = "Procesando...";

        try {
            // Enviar solicitud al backend para verificar el correo
            const response = await fetch("http://localhost:3000/api/verificar-correo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }), // Enviar el correo como JSON
            });

            const data = await response.json(); // Leer la respuesta del backend

            if (response.ok) {
                if (data.registrado) {
                    alert("Se ha enviado un enlace de recuperación a su correo electrónico.");
                } else {
                    alert("El correo electrónico no está registrado.");
                }
            } else {
                throw new Error(data.error || "Error al procesar la solicitud.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrió un error. Por favor, inténtelo nuevamente más tarde.");
        } finally {
            // Restablecer el estado del botón
            recuperarBoton.disabled = false;
            recuperarBoton.textContent = "Recuperar";
        }
    });
});

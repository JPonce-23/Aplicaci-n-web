document.addEventListener("DOMContentLoaded", function () {
    const recuperarBoton = document.querySelector(".boton");
    const nuevaContraseñaInput = document.querySelectorAll("input[type='text']")[0];
    const confirmarContraseñaInput = document.querySelectorAll("input[type='text']")[1];

    recuperarBoton.addEventListener("click", async function (event) {
        event.preventDefault();
        const nuevaContraseña = nuevaContraseñaInput.value.trim();
        const confirmarContraseña = confirmarContraseñaInput.value.trim();
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token"); // Obtener el token del enlace

        if (!token) {
            alert("Enlace inválido o expirado.");
            return;
        }

        if (nuevaContraseña === "" || confirmarContraseña === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }

        if (nuevaContraseña.length < 6 || nuevaContraseña.length > 15) {
            alert("La contraseña debe tener entre 6 y 15 caracteres.");
            return;
        }

        if (nuevaContraseña !== confirmarContraseña) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        try {
            // Enviar solicitud al backend para actualizar la contraseña
            const response = await fetch("http://localhost:3000/api/actualizar-contraseña", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nuevaContraseña, token }), // Enviar contraseña y token
            });

            const data = await response.json();

            if (response.ok) {
                alert("¡Su contraseña ha sido actualizada exitosamente!");
                // Redirección a la página de inicio de sesión
                window.location.href = "inicio-sesion.html";
            } else {
                throw new Error(data.message || "Error al actualizar la contraseña.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrió un error. Por favor, inténtelo nuevamente más tarde.");
        }
    });
});

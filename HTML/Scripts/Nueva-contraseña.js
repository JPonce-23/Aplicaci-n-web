document.addEventListener("DOMContentLoaded", function () {
    const recuperarBoton = document.querySelector(".boton");
    const nuevaContraseñaInput = document.querySelectorAll("input[type='text']")[0];
    const confirmarContraseñaInput = document.querySelectorAll("input[type='text']")[1];

    recuperarBoton.addEventListener("click", function (event) {
        event.preventDefault();
        const nuevaContraseña = nuevaContraseñaInput.value.trim();
        const confirmarContraseña = confirmarContraseñaInput.value.trim();

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

        // Simulación de actualización de contraseña
        alert("¡Su contraseña ha sido actualizada exitosamente!");
        // Redirección a la página de inicio de sesión
        window.location.href = "inicio-sesion.html";
    });
});

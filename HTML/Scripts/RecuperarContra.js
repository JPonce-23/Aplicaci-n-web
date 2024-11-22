document.addEventListener("DOMContentLoaded", function () {
    const recuperarBoton = document.querySelector(".boton");
    const emailInput = document.querySelector("input[type='email']");

    recuperarBoton.addEventListener("click", function (event) {
        event.preventDefault();
        const email = emailInput.value.trim();

        if (email === "") {
            alert("Por favor, ingrese su correo electrónico.");
            return;
        }

        // Simulación de verificación de correo registrado
        const correosRegistrados = ["correo1@example.com", "correo2@example.com"];
        if (correosRegistrados.includes(email)) {
            alert("Se ha enviado un enlace de recuperación a su correo electrónico.");
            // Simula la redirección al enlace de recuperación (segunda página)
            window.location.href = "nueva-contraseña.html";
        } else {
            alert("El correo electrónico no está registrado.");
        }
    });
});

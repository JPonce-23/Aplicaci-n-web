document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const fotoInput = document.querySelector(".file-input");
    const fotoPreview = document.querySelector(".foto-perfil span");
    const passwordInput = document.getElementById("contra");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const togglePassword = document.getElementById("mostrar-contraseña");
    const toggleConfirmPassword = document.getElementById("mostrar-conf-contraseña");

    // Validar el formulario al enviarlo
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita el envío por defecto

        let errors = [];
        const inputs = form.querySelectorAll("input[required]");

        // Verificar cada campo obligatorio
        inputs.forEach((input) => {
            if (input.value.trim() === "") {
                errors.push(`${input.placeholder} es obligatorio.`);
            }
        });

        // Validar formato del correo
        const emailInput = form.querySelector('input[type="email"]');
        if (!validateEmail(emailInput.value)) {
            errors.push("El correo electrónico no es válido.");
        }

        // Verificar contraseñas
        if (passwordInput.value !== confirmPasswordInput.value) {
            errors.push("Las contraseñas no coinciden.");
        }

        if (errors.length > 0) {
            alert(errors.join("\n"));
        } else {
            alert("Registro exitoso");
            form.submit(); // Enviar formulario si todo es válido
        }
    });

    // Validar formato de correo electrónico
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Mostrar vista previa de la foto de perfil
    fotoInput.addEventListener("change", () => {
        const file = fotoInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                fotoPreview.textContent = ""; // Limpiar texto
                const img = document.createElement("img");
                img.src = e.target.result;
                img.style.width = "100%";
                img.style.borderRadius = "4px";
                fotoPreview.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });

    // Alternar visibilidad de contraseña
    togglePassword.addEventListener("click", () => {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    });

    toggleConfirmPassword.addEventListener("click", () => {
        confirmPasswordInput.type = confirmPasswordInput.type === "password" ? "text" : "password";
    });
});

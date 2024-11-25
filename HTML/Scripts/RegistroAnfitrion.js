document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const fotoInput = document.querySelector(".file-input");
    const fotoPreview = document.querySelector(".foto-perfil span");
    const passwordInput = document.getElementById("contra");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const togglePassword = document.getElementById("mostrar-contraseña");
    const toggleConfirmPassword = document.getElementById("mostrar-conf-contraseña");

    // Validar el formulario al enviarlo
    form.addEventListener("submit", async (event) => {
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
            return;
        }

        // Crear objeto de datos del anfitrión
        const formData = new FormData(form); // Captura todos los datos del formulario
        const datosAnfitrion = {
            nombre: formData.get("Nombre(s)"),
            apellidoPaterno: formData.get("Apellido paterno"),
            apellidoMaterno: formData.get("Apellido materno"),
            fechaNacimiento: formData.get("Fecha de nacimiento"),
            telefono: formData.get("Teléfono"),
            correo: emailInput.value,
            contraseña: passwordInput.value,
            sexo: formData.get("sexo"),
        };

        // Adjuntar la foto de perfil si existe
        const file = fotoInput.files[0];
        if (file) {
            datosAnfitrion.foto = await convertirImagenABase64(file);
        } else {
            datosAnfitrion.foto = null; // O un valor predeterminado
        }

        try {
            // Enviar datos al backend
            const response = await fetch("http://localhost:3000/api/registrar-anfitrion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosAnfitrion),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registro exitoso. Ahora puede iniciar sesión.");
                window.location.href = "inicio-sesion.html"; // Redirigir al inicio de sesión
            } else {
                alert(data.message || "Error al registrar al anfitrión.");
            }
        } catch (error) {
            console.error("Error al registrar:", error);
            alert("Ocurrió un error. Por favor, inténtelo más tarde.");
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

    // Convertir imagen a Base64
    async function convertirImagenABase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const fotoInput = document.querySelector(".file-input");
    const fotoPreview = document.querySelector(".foto-perfil span");
    const passwordInput = document.getElementById("contra");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const togglePassword = document.getElementById("mostrar-contraseña");
    const toggleConfirmPassword = document.getElementById("mostrar-conf-contraseña");

    // Elementos del modal
    const modal = document.getElementById("codigoModal");
    const closeModal = document.querySelector(".close");
    const timerDisplay = document.getElementById("timer");
    const generarNuevoCodigoLink = document.getElementById("generarNuevoCodigo");
    const enviarCodigoButton = document.getElementById("enviarCodigo");
    const codigoInputs = document.querySelectorAll(".codigo-box");

    let tiempoRestante = 300; // 5 minutos en segundos
    let codigoGenerado = null; // Código de verificación
    let temporizador;

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
        const emailInput = form.querySelector('input[name="correo"]');
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

        // Preparar datos para el registro
        const formData = new FormData(form); // Obtiene todos los datos del formulario

        // Recoger los datos del formulario en un objeto
        const registroData = {
            nombre: formData.get("nombre"),
            apellidoPaterno: formData.get("apellidoPaterno"),
            apellidoMaterno: formData.get("apellidoMaterno"),
            fechaNacimiento: formData.get("fechaNacimiento"),
            telefono: formData.get("telefono"),
            correo: formData.get("correo"),
            contraseña: passwordInput.value,
            sexo: formData.get("sexo"),
        };

        // Si se ha seleccionado una foto de perfil, agregarla al objeto
        if (fotoInput.files[0]) {
            registroData.fotoPerfil = fotoInput.files[0];
        }

        try {
            // Enviar solicitud al backend
            const response = await fetch("http://localhost:3000/api/registrar-estudiante", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registroData), // Enviar el objeto con los datos del formulario
            });

            const data = await response.json();

            if (response.ok) {
                // Almacenar el código generado y abrir el modal
                codigoGenerado = data.codigoVerificacion;
                abrirModal();
            } else {
                throw new Error(data.message || "Error al registrar al estudiante.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrió un error. Por favor, inténtelo nuevamente más tarde.");
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

    // Modal - Abrir y cerrar
    function abrirModal() {
        modal.style.display = "block";
        iniciarTemporizador();
    }

    closeModal.onclick = function () {
        modal.style.display = "none";
        clearInterval(temporizador); // Detener temporizador
    };

    // Generar un nuevo código
    generarNuevoCodigoLink.addEventListener("click", async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/generar-nuevo-codigo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo: form.querySelector('input[name="correo"]').value }),
            });

            const data = await response.json();
            if (response.ok) {
                codigoGenerado = data.codigoVerificacion;
                alert("Nuevo código generado. Revisa tu correo.");
                iniciarTemporizador();
            } else {
                throw new Error(data.message || "Error al generar el código.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrió un error al generar un nuevo código.");
        }
    });

    // Iniciar el temporizador
    function iniciarTemporizador() {
        generarNuevoCodigoLink.style.display = "none"; // Ocultar enlace de nuevo código
        tiempoRestante = 300; // Reiniciar a 5 minutos
        temporizador = setInterval(() => {
            const minutos = Math.floor(tiempoRestante / 60);
            const segundos = tiempoRestante % 60;
            timerDisplay.textContent = `${minutos.toString().padStart(2, "0")}:${segundos
                .toString()
                .padStart(2, "0")}`;
            tiempoRestante--;

            if (tiempoRestante < 0) {
                clearInterval(temporizador);
                timerDisplay.textContent = "00:00";
                generarNuevoCodigoLink.style.display = "block"; // Mostrar enlace
            }
        }, 1000);
    }

    // Validar el código ingresado
    enviarCodigoButton.addEventListener("click", () => {
        const codigoIngresado = Array.from(codigoInputs)
            .map((input) => input.value)
            .join("");
        if (codigoIngresado === codigoGenerado) {
            alert("¡Código correcto! Registro completado.");
            modal.style.display = "none"; // Cerrar modal
            window.location.href = "inicio-sesion.html";
        } else {
            alert("El código ingresado es incorrecto.");
        }
    });
});

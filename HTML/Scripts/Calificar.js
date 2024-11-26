document.addEventListener("DOMContentLoaded", () => {
    const inmuebleRadios = document.querySelectorAll('input[name="calificacion"]');
    const anfitrionRadios = document.querySelectorAll('input[name="calificacion-a"]');
    const comentarioInput = document.getElementById("descripcion");
    const submitButton = document.querySelector(".boton");
    const tokenInput = document.getElementById("token");

    // EXTRAE TOKEN DEL URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
        alert("El enlace de calificación no es válido.");
        return;
    }

    // AGREGA EL TOKEN AL CAMPO OCULTO DEL FORMULARIO
    tokenInput.value = token;

    submitButton.addEventListener("click", async (e) => {
        e.preventDefault();

        const selectedInmuebleRating = getSelectedRadioValue(inmuebleRadios);
        const selectedAnfitrionRating = getSelectedRadioValue(anfitrionRadios);
        const comentario = comentarioInput.value;

        if (!selectedInmuebleRating || !selectedAnfitrionRating) {
            alert("Por favor, selecciona una calificación para el inmueble y el anfitrión.");
            return;
        }

        // ENVÍA DATOS
        const calificacionData = {
            token, // TOKEN DEL ENLACE
            calificacionInmueble: parseInt(selectedInmuebleRating),
            calificacionAnfitrion: parseInt(selectedAnfitrionRating),
            comentario: comentario || "Sin comentario",
        };

        try {
            const response = await fetch("https://api.miapp.com/calificaciones", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(calificacionData),
            });

            if (!response.ok) {
                throw new Error("Error al enviar la calificación");
            }

            const result = await response.json();
            console.log("Respuesta del servidor:", result);

            alert("¡Gracias por tu calificación!");
            resetForm(inmuebleRadios, anfitrionRadios, comentarioInput);
        } catch (error) {
            console.error("Error al enviar la calificación:", error);
            alert("Hubo un problema al enviar tu calificación. Por favor, inténtalo nuevamente.");
        }
    });

    function getSelectedRadioValue(radioButtons) {
        for (const radio of radioButtons) {
            if (radio.checked) {
                return radio.value;
            }
        }
        return null;
    }

    function resetForm(inmuebleRadios, anfitrionRadios, comentarioInput) {
        inmuebleRadios.forEach(radio => (radio.checked = false));
        anfitrionRadios.forEach(radio => (radio.checked = false));
        comentarioInput.value = "";
    }
});

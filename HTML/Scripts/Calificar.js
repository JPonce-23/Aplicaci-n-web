// Código para la funcionalidad de calificación
document.addEventListener("DOMContentLoaded", () => {
    const inmuebleRadios = document.querySelectorAll('input[name="calificacion"]');
    const anfitrionRadios = document.querySelectorAll('input[name="calificacion-a"]');
    const comentarioInput = document.getElementById("descripcion");
    const submitButton = document.querySelector(".boton");

    submitButton.addEventListener("click", (e) => {
        e.preventDefault(); // Evitar el envío del formulario por defecto

        const selectedInmuebleRating = getSelectedRadioValue(inmuebleRadios);
        const selectedAnfitrionRating = getSelectedRadioValue(anfitrionRadios);
        const comentario = comentarioInput.value;

        if (!selectedInmuebleRating || !selectedAnfitrionRating) {
            alert("Por favor, selecciona una calificación para el inmueble y el anfitrión.");
            return;
        }

        // Aquí puedes enviar los datos al servidor o procesarlos como desees
        const calificacionData = {
            calificacionInmueble: selectedInmuebleRating,
            calificacionAnfitrion: selectedAnfitrionRating,
            comentario: comentario || "Sin comentario"
        };

        console.log("Datos enviados:", calificacionData);

        // Simular envío exitoso y reiniciar formulario
        alert("¡Gracias por tu calificación!");
        resetForm(inmuebleRadios, anfitrionRadios, comentarioInput);
    });

    // Obtener el valor seleccionado de un grupo de radios
    function getSelectedRadioValue(radioButtons) {
        for (const radio of radioButtons) {
            if (radio.checked) {
                return radio.value;
            }
        }
        return null;
    }

    // Reiniciar formulario
    function resetForm(inmuebleRadios, anfitrionRadios, comentarioInput) {
        inmuebleRadios.forEach(radio => (radio.checked = false));
        anfitrionRadios.forEach(radio => (radio.checked = false));
        comentarioInput.value = "";
    }
});

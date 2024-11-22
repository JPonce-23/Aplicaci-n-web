document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector(".formulario");
    const fotosInput = document.getElementById("fotos");
    const nombreInput = document.getElementById("nombre");
    const descripcionTextarea = document.getElementById("descripcion");
    const reglasTextarea = document.getElementById("reglas");
    const informacionTextarea = document.getElementById("informacion");
    const ubicacionInput = document.getElementById("ubicacion");
    const costoInput = document.getElementById("costo");
    
    formulario.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevenir el envío por defecto

        // Validación de imágenes
        const archivos = fotosInput.files;
        if (archivos.length < 5 || archivos.length > 15) {
            alert("Debes subir entre 5 y 15 imágenes.");
            return;
        }

        // Validación de campos vacíos
        if (!nombreInput.value.trim() || !descripcionTextarea.value.trim() ||
            !ubicacionInput.value.trim() || !costoInput.value.trim()) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        // Validación del costo
        if (isNaN(costoInput.value) || parseFloat(costoInput.value) <= 0) {
            alert("Por favor, ingresa un costo válido.");
            return;
        }

        // Mostrar los datos para fines de depuración o prepararlos para el servidor
        const datos = {
            nombre: nombreInput.value,
            descripcion: descripcionTextarea.value,
            reglas: reglasTextarea.value,
            informacion: informacionTextarea.value,
            ubicacion: ubicacionInput.value,
            costo: parseFloat(costoInput.value),
            restricciones: [...document.querySelectorAll("input[name='restricciones']:checked")].map(el => el.value),
            servicios: [...document.querySelectorAll("input[name='servicios']:checked")].map(el => el.value),
            fotos: Array.from(archivos).map(file => file.name) // Solo nombres de archivos por simplicidad
        };

        console.log("Datos a enviar:", datos);

        // Simulación de envío exitoso
        alert("Publicación creada exitosamente.");
        formulario.reset();
    });

    // Validación en tiempo real del límite de caracteres
    [descripcionTextarea, reglasTextarea, informacionTextarea].forEach((textarea) => {
        textarea.addEventListener("input", () => {
            if (textarea.value.length > 500) {
                alert("Has superado el límite de 500 caracteres.");
                textarea.value = textarea.value.slice(0, 500);
            }
        });
    });
});

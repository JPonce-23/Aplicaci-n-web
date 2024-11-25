document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector(".formulario");
    const fotosInput = document.getElementById("fotos");
    const nombreInput = document.getElementById("nombre");
    const descripcionTextarea = document.getElementById("descripcion");
    const reglasTextarea = document.getElementById("reglas");
    const informacionTextarea = document.getElementById("informacion");
    const ubicacionInput = document.getElementById("ubicacion");
    const costoInput = document.getElementById("costo");

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault(); 

        // VALIDA IMÁGENES
        const archivos = fotosInput.files;
        if (archivos.length < 5 || archivos.length > 15) {
            alert("Debes subir entre 5 y 15 imágenes.");
            return;
        }

        // VALIDA CAMPOS VACÍOS
        if (!nombreInput.value.trim() || !descripcionTextarea.value.trim() ||
            !ubicacionInput.value.trim() || !costoInput.value.trim()) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        // COSTO
        if (isNaN(costoInput.value) || parseFloat(costoInput.value) <= 0) {
            alert("Por favor, ingresa un costo válido.");
            return;
        }

        // PREPARA DATOS A ENVIAR
        const formData = new FormData();
        Array.from(archivos).forEach((file) => {
            formData.append("fotos", file); // AGREGA IMÁGENES
        });

        const datos = {
            nombre: nombreInput.value,
            descripcion: descripcionTextarea.value,
            reglas: reglasTextarea.value,
            informacion: informacionTextarea.value,
            ubicacion: ubicacionInput.value,
            costo: parseFloat(costoInput.value),
            restricciones: [...document.querySelectorAll("input[name='restricciones']:checked")].map(el => el.value),
            servicios: [...document.querySelectorAll("input[name='servicios']:checked")].map(el => el.value),
        };

        
        formData.append("datos", JSON.stringify(datos));

        try {
            const response = await fetch("https://tu-servidor.com/api/publicaciones", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Error al enviar los datos.");
            }

            const resultado = await response.json();
            console.log("Respuesta del servidor:", resultado);
            alert("Publicación creada exitosamente.");
            formulario.reset();
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            alert("Ocurrió un error al crear la publicación. Por favor, inténtalo más tarde.");
        }
    });

    
    [descripcionTextarea, reglasTextarea, informacionTextarea].forEach((textarea) => {
        textarea.addEventListener("input", () => {
            if (textarea.value.length > 500) {
                alert("Has superado el límite de 500 caracteres.");
                textarea.value = textarea.value.slice(0, 500);
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const editarBtn = document.querySelector(".editar-btn");
    const nombreElemento = document.querySelector(".nombre");
    const informacionParrafos = document.querySelectorAll(".informacion p");
    const fotoPerfil = document.querySelector(".foto-perfil");

    let editando = false; // Estado del botón "Editar"

    editarBtn.addEventListener("click", async () => {
        if (!editando) {
            // Cambiar a modo edición
            editarBtn.textContent = "Guardar";

            informacionParrafos.forEach((parrafo) => {
                const textoActual = parrafo.textContent.split(": ")[1];
                const input = document.createElement("input");
                input.type = "text";
                input.value = textoActual;
                input.style.width = "100%";
                input.style.marginTop = "5px";
                parrafo.innerHTML = `${parrafo.querySelector("strong").outerHTML}`; // Reemplazar texto por input
                parrafo.appendChild(input);
            });

            // Hacer que el nombre sea editable
            const nombreInput = document.createElement("input");
            nombreInput.type = "text";
            nombreInput.value = nombreElemento.textContent;
            nombreElemento.innerHTML = "";
            nombreElemento.appendChild(nombreInput);

            // Cambiar foto de perfil
            const fotoInput = document.createElement("input");
            fotoInput.type = "file";
            fotoInput.accept = "image/*";
            fotoInput.style.display = "block";
            fotoInput.style.marginTop = "10px";
            fotoPerfil.insertAdjacentElement("afterend", fotoInput);

            // Previsualizar la nueva foto
            fotoInput.addEventListener("change", (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        fotoPerfil.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });

            editando = true;
        } else {
            // Guardar los cambios
            editarBtn.textContent = "Editar";

            const updatedData = {};

            // Guardar la información modificada
            informacionParrafos.forEach((parrafo) => {
                const input = parrafo.querySelector("input");
                const nuevoTexto = input.value;
                const campo = parrafo.querySelector("strong").textContent.replace(":", "").trim();
                updatedData[campo] = nuevoTexto;
                parrafo.innerHTML = `${parrafo.querySelector("strong").outerHTML} ${nuevoTexto}`;
            });

            // Guardar el nuevo nombre
            const nombreInput = nombreElemento.querySelector("input");
            if (nombreInput) {
                updatedData["Nombre"] = nombreInput.value;
                nombreElemento.textContent = nombreInput.value;
            }

            // Verificar si la foto fue cambiada
            const fotoInput = document.querySelector("input[type='file']");
            if (fotoInput && fotoInput.files[0]) {
                const file = fotoInput.files[0];
                updatedData["Foto"] = await convertirImagenABase64(file); // Convertir a base64
                fotoInput.remove();
            }

            // Enviar datos actualizados al backend
            try {
                const response = await fetch("http://localhost:3000/api/actualizar-perfil-anfitrion", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedData),
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Perfil actualizado con éxito.");
                } else {
                    alert(data.message || "Error al actualizar el perfil.");
                }
            } catch (error) {
                console.error("Error al actualizar el perfil:", error);
                alert("Ocurrió un error al guardar los cambios. Inténtelo de nuevo más tarde.");
            }

            editando = false;
        }
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

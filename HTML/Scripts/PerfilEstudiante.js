document.addEventListener("DOMContentLoaded", async () => {
    const editarBtn = document.querySelector(".editar-btn");
    const nombreElemento = document.querySelector(".nombre");
    const informacionParrafos = document.querySelectorAll(".informacion p");
    const fotoPerfil = document.querySelector(".foto-perfil");

    let editando = false; // Estado del botón "Editar"

    // Recuperar datos del perfil al cargar la página
    async function cargarPerfil() {
        try {
            const response = await fetch("http://localhost:3000/api/perfil-estudiante", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();

            if (response.ok) {
                // Mostrar los datos recuperados en la página
                nombreElemento.textContent = data.nombre;
                informacionParrafos[0].innerHTML = `<strong>Correo electrónico:</strong> ${data.correo}`;
                informacionParrafos[1].innerHTML = `<strong>Número telefónico:</strong> ${data.telefono}`;
                informacionParrafos[2].innerHTML = `<strong>Sexo:</strong> ${data.sexo}`;
                fotoPerfil.src = data.foto || "IMG/placeholder.jpg"; // Si no hay foto, usar un placeholder
            } else {
                alert("Error al cargar el perfil.");
            }
        } catch (error) {
            console.error("Error al cargar el perfil:", error);
            alert("Ocurrió un error al cargar los datos.");
        }
    }

    cargarPerfil(); // Llamar a la función al inicio

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
                parrafo.innerHTML = `${parrafo.querySelector("strong").outerHTML}`;
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
            const nuevoNombre = nombreElemento.querySelector("input").value;
            const nuevoCorreo = informacionParrafos[0].querySelector("input").value;
            const nuevoTelefono = informacionParrafos[1].querySelector("input").value;
            const nuevoSexo = informacionParrafos[2].querySelector("input").value;

            // Crear un objeto con los datos actualizados
            const perfilActualizado = {
                nombre: nuevoNombre,
                correo: nuevoCorreo,
                telefono: nuevoTelefono,
                sexo: nuevoSexo,
                foto: fotoPerfil.src, // La foto ya previsualizada
            };

            try {
                const response = await fetch("http://localhost:3000/api/actualizar-perfil", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(perfilActualizado),
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Perfil actualizado correctamente.");
                    cargarPerfil(); // Recargar los datos actualizados
                } else {
                    alert("Error al guardar los cambios.");
                }
            } catch (error) {
                console.error("Error al guardar los cambios:", error);
                alert("Ocurrió un error al guardar los cambios.");
            }

            // Restaurar la vista sin inputs
            informacionParrafos.forEach((parrafo, index) => {
                const nuevoTexto = perfilActualizado[Object.keys(perfilActualizado)[index]];
                parrafo.innerHTML = `${parrafo.querySelector("strong").outerHTML} ${nuevoTexto}`;
            });

            // Guardar el nuevo nombre
            nombreElemento.textContent = nuevoNombre;

            // Remover input de foto de perfil
            const fotoInput = document.querySelector("input[type='file']");
            if (fotoInput) {
                fotoInput.remove();
            }

            editando = false;
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const editarBtn = document.querySelector(".editar-btn");
    const nombreElemento = document.querySelector(".nombre");
    const informacionParrafos = document.querySelectorAll(".informacion p");
    const fotoPerfil = document.querySelector(".foto-perfil");

    let editando = false; // Estado del botón "Editar"

    editarBtn.addEventListener("click", () => {
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
            informacionParrafos.forEach((parrafo) => {
                const input = parrafo.querySelector("input");
                const nuevoTexto = input.value;
                parrafo.innerHTML = `${parrafo.querySelector("strong").outerHTML} ${nuevoTexto}`;
            });

            // Guardar el nuevo nombre
            const nombreInput = nombreElemento.querySelector("input");
            if (nombreInput) {
                nombreElemento.textContent = nombreInput.value;
            }

            // Remover input de foto de perfil
            const fotoInput = document.querySelector("input[type='file']");
            if (fotoInput) {
                fotoInput.remove();
            }

            editando = false;
        }
    });
});

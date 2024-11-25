document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.querySelector(".contenido");

    // CARGA PUBLICACIONES DESDE EL SERVIDOR
    async function cargarPublicacionesGuardadas() {
        try {
            const response = await fetch("http://localhost:3000/api/guardados");
            if (!response.ok) throw new Error("Error al cargar las publicaciones guardadas.");
            const publicacionesGuardadas = await response.json();

            // MUESTRA LAS PUBLICACIONES
            renderizarPublicaciones(publicacionesGuardadas);
        } catch (error) {
            console.error("Error al cargar publicaciones:", error);
            alert("Hubo un problema al cargar tus publicaciones guardadas.");
        }
    }

    function renderizarPublicaciones(publicaciones) {
        contenedor.innerHTML = ""; // LIMPIA EL CONTENEDOR

        publicaciones.forEach((publicacion) => {
            const publicacionDiv = document.createElement("div");
            publicacionDiv.classList.add("publicacion");

            let indiceActual = 0;

            publicacionDiv.innerHTML = `
                <button class="flecha izquierda">&lt;</button>
                <img src="${publicacion.imagenes[indiceActual]}" alt="${publicacion.nombre}" class="imagen-casa">
                <button class="flecha derecha">&gt;</button>
                <div class="info-casa">
                    <span class="nombre-casa">${publicacion.nombre}</span>
                    <span class="precio-casa">${publicacion.precio}</span>
                    <span class="calificacion-casa">${publicacion.calificacion}</span>
                    <button class="boton-ver"><a href="Publicaciones.html?id=${publicacion.id}">Ver</a></button>
                    <button class="eliminar-guardado">Eliminar</button>
                </div>
            `;

            contenedor.appendChild(publicacionDiv);

            // NAVEGAR EN IMAGENES
            const flechaIzquierda = publicacionDiv.querySelector(".flecha.izquierda");
            const flechaDerecha = publicacionDiv.querySelector(".flecha.derecha");
            const imagenCasa = publicacionDiv.querySelector(".imagen-casa");

            flechaIzquierda.addEventListener("click", () => {
                indiceActual = (indiceActual - 1 + publicacion.imagenes.length) % publicacion.imagenes.length;
                imagenCasa.src = publicacion.imagenes[indiceActual];
            });

            flechaDerecha.addEventListener("click", () => {
                indiceActual = (indiceActual + 1) % publicacion.imagenes.length;
                imagenCasa.src = publicacion.imagenes[indiceActual];
            });

            // ELIMINAR DE GUARDADOS
            const eliminarBtn = publicacionDiv.querySelector(".eliminar-guardado");
            eliminarBtn.addEventListener("click", () => eliminarGuardado(publicacion.id));
        });
    }

    // ELIMINA UN GUARDADO
    async function eliminarGuardado(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/guardados/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Error al eliminar la publicación guardada.");
            alert("Publicación eliminada exitosamente.");
            cargarPublicacionesGuardadas(); // ACTUALIZA LA LISTA
        } catch (error) {
            console.error("Error al eliminar publicación:", error);
            alert("Hubo un problema al eliminar la publicación.");
        }
    }

    // CIERRE DE SESIÓN
    const cerrarSesionBtn = document.querySelector(".cierre-sesion");
    cerrarSesionBtn.addEventListener("click", () => {
        if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
            window.location.href = "index.html"; // VUELVE AL INICIO 
        }
    });

    // MUESTRA PUBLICACIONES AL CARGAR LA PÁGINA
    cargarPublicacionesGuardadas();
});

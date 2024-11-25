document.addEventListener("DOMContentLoaded", async () => {
    const menuUsuarioCheckbox = document.getElementById("menu-usuario");
    const menuNotificacionesCheckbox = document.getElementById("menu-notificaciones");
    const contenedorPublicaciones = document.querySelector(".contenido");

    
    document.getElementById("despliegue-menu-usuario").addEventListener("click", (event) => {
        if (event.target.tagName === "A") {
            menuUsuarioCheckbox.checked = false; // CIERRA EL MENU
        }
    });

    // MMOSTRAR NOSTIFICACIONES AL HACER CLIC EN EL ÍCONO
    document.getElementById("despliegue-menu-notificaciones").addEventListener("click", async (event) => {
        if (event.target.tagName === "P") {
            const nombreInteresado = event.target.textContent;
            alert(`Has seleccionado: ${nombreInteresado}`);
            menuNotificacionesCheckbox.checked = false; // CIERRA EL MENU
            window.location.href = `PerfilEstudiante.html?nombre=${nombreInteresado}`;
        }
    });

    // CIERRE DE SESION
    window.logout = () => {
        if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
            window.location.href = "index.html"; // REDIRECCIÓN AL INDEX
        }
    };

    // OBTIENE PUBLICACIONES DEL BACKEND
    const obtenerPublicaciones = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/publicaciones", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) throw new Error("Error al obtener publicaciones");
            return await response.json();
        } catch (error) {
            console.error("Error al cargar publicaciones:", error);
            alert("No se pudieron cargar las publicaciones. Inténtalo más tarde.");
            return [];
        }
    };

    // MUESTRA PUBLICACIONES
    const renderizarPublicaciones = (publicaciones) => {
        publicaciones.forEach((publicacion) => {
            const publicacionDiv = document.createElement("div");
            publicacionDiv.classList.add("publicacion");

            let indiceActual = 0;

            publicacionDiv.innerHTML = `
                <h2>${publicacion.titulo}</h2>
                <button class="flecha izquierda">&lt;</button>
                <img src="${publicacion.imagenes[indiceActual]}" alt="${publicacion.titulo}" class="imagen-casa">
                <button class="flecha derecha">&gt;</button>
                <div class="info-casa">
                    <span class="nombre-casa">${publicacion.titulo}</span>
                    <span class="precio-casa">${publicacion.precio}</span>
                    <span class="calificacion-casa">⭐ ${publicacion.calificacion}</span>
                    <button class="boton-ver"><a href="Editar-publicacion.html?id=${publicacion.id}">Editar</a></button>
                </div>
            `;

            contenedorPublicaciones.appendChild(publicacionDiv);

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
        });
    };

    // CARGA LA NOTIFICACIÓN
    const cargarNotificaciones = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/notificaciones", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) throw new Error("Error al cargar notificaciones");

            const notificaciones = await response.json();
            const despliegueNotificaciones = document.getElementById("despliegue-menu-notificaciones");
            despliegueNotificaciones.innerHTML = "";

            notificaciones.forEach((notificacion) => {
                const notificacionElemento = document.createElement("p");
                notificacionElemento.textContent = notificacion.nombreEstudiante;
                despliegueNotificaciones.appendChild(notificacionElemento);
            });
        } catch (error) {
            console.error("Error al cargar notificaciones:", error);
        }
    };

    // CARGA PUBLICACIONES Y NOTIFICACIONES AL INICIO
    const publicaciones = await obtenerPublicaciones();
    renderizarPublicaciones(publicaciones);
    cargarNotificaciones();
});

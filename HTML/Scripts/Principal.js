document.addEventListener("DOMContentLoaded", () => {
    const publicacionesContainer = document.querySelector(".contenido");
    const barraBusqueda = document.querySelector(".barra-busqueda");
    const filtros = document.querySelectorAll(".menu-filtros li");
    const categorias = document.querySelectorAll(".categoria");

    // URL API
    const API_URL = "http://localhost:3000/api";

    // PUBLICACIONES
    const obtenerPublicaciones = async (query = {}) => {
        try {
            const url = new URL(`${API_URL}/publicaciones`);
            Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));

            const response = await fetch(url);
            if (!response.ok) throw new Error("Error al obtener publicaciones");
            const publicaciones = await response.json();

            mostrarPublicaciones(publicaciones);
        } catch (error) {
            console.error("Error al obtener publicaciones:", error);
        }
    };

    // Mostrar publicaciones dinámicamente
    const mostrarPublicaciones = (publicaciones) => {
        publicacionesContainer.innerHTML = ""; // Limpiar publicaciones anteriores

        publicaciones.forEach((publicacion) => {
            const publicacionElement = document.createElement("div");
            publicacionElement.classList.add("publicacion");

            publicacionElement.innerHTML = `
                <button class="flecha izquierda">&lt;</button>
                <img src="${publicacion.imagenes[0]}" alt="Imagen de ${publicacion.nombre}" class="imagen-casa">
                <button class="flecha derecha">&gt;</button>
                <div class="info-casa">
                    <span class="nombre-casa">${publicacion.nombre}</span>
                    <span class="precio-casa">$${publicacion.precio} MXN</span>
                    <span class="calificacion-casa">⭐ ${publicacion.calificacion}</span>
                    <button class="boton-ver"><a href="publicacion.html?id=${publicacion.id}">Ver</a></button>
                </div>
            `;

            // CARRUSEL DE IMAGENES
            let indiceActual = 0;
            const flechaIzquierda = publicacionElement.querySelector(".flecha.izquierda");
            const flechaDerecha = publicacionElement.querySelector(".flecha.derecha");
            const imagenCasa = publicacionElement.querySelector(".imagen-casa");

            flechaIzquierda.addEventListener("click", () => {
                indiceActual = (indiceActual - 1 + publicacion.imagenes.length) % publicacion.imagenes.length;
                imagenCasa.src = publicacion.imagenes[indiceActual];
            });

            flechaDerecha.addEventListener("click", () => {
                indiceActual = (indiceActual + 1) % publicacion.imagenes.length;
                imagenCasa.src = publicacion.imagenes[indiceActual];
            });

            publicacionesContainer.appendChild(publicacionElement);
        });
    };

    // FILTRAR PUBLICACIONES
    filtros.forEach((filtro) => {
        filtro.addEventListener("click", () => {
            const filtroTexto = filtro.textContent;

            let query = {};
            if (filtroTexto.includes("Precio")) {
                query.ordenarPor = filtroTexto.includes("Menor") ? "precioAsc" : "precioDesc";
            } else if (filtroTexto.includes("Fecha")) {
                query.ordenarPor = filtroTexto.includes("antiguas") ? "fechaAsc" : "fechaDesc";
            } else if (filtroTexto.includes("Calificación")) {
                query.ordenarPor = filtroTexto.includes("Mejor") ? "calificacionDesc" : "calificacionAsc";
            }

            obtenerPublicaciones(query);
        });
    });

    // BUSCAR PUBLICACIONES
    barraBusqueda.addEventListener("input", () => {
        const terminoBusqueda = barraBusqueda.value.trim();
        obtenerPublicaciones({ buscar: terminoBusqueda });
    });

    // FILTRO DE CATEGORÍA
    categorias.forEach((categoria) => {
        categoria.addEventListener("click", () => {
            const categoriaTexto = categoria.textContent.toLowerCase();
            obtenerPublicaciones({ categoria: categoriaTexto });
        });
    });

    // CERRAR SESIÓN
    window.logout = () => {
        if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
            // Eliminar token de sesión o cookies aquí si es necesario
            window.location.href = "index.html";
        }
    };

    // Cargar publicaciones al iniciar
    obtenerPublicaciones();
});

document.addEventListener("DOMContentLoaded", () => {
    const publicacionesGuardadas = [
        {
            nombre: "Casa 1",
            precio: "$10,000 MXN (por mes)",
            calificacion: "⭐ 4.5",
            imagenes: ["IMG/casa1.jpg", "IMG/casa2.jpg"],
            link: "Publicaciones.html"
        },
        {
            nombre: "Casa 2",
            precio: "$8,500 MXN (por mes)",
            calificacion: "⭐ 4.8",
            imagenes: ["IMG/casa3.jpg", "IMG/casa4.jpg"],
            link: "Publicaciones.html"
        },
        {
            nombre: "Casa 3",
            precio: "$12,000 MXN (por mes)",
            calificacion: "⭐ 4.2",
            imagenes: ["IMG/casa5.jpg", "IMG/casa6.jpg"],
            link: "Publicaciones.html"
        }
    ];

    const contenedor = document.querySelector(".contenido");

    // Renderizar las publicaciones guardadas
    publicacionesGuardadas.forEach((publicacion) => {
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
                <button class="boton-ver"><a href="${publicacion.link}">Ver</a></button>
            </div>
        `;

        contenedor.appendChild(publicacionDiv);

        // Manejar navegación de imágenes
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

    // Cerrar sesión
    const cerrarSesionBtn = document.querySelector(".cierre-sesion");
    cerrarSesionBtn.addEventListener("click", () => {
        if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
            window.location.href = "index.html"; // Redirige al inicio
        }
    });
});

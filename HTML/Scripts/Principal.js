document.addEventListener("DOMContentLoaded", () => {
    // Manejar el menú de usuario desplegable
    const menuCheckbox = document.getElementById("menu");
    const despliegueMenu = document.getElementById("despliegue-menu");

    despliegueMenu.addEventListener("click", (event) => {
        if (event.target.tagName === "A") {
            menuCheckbox.checked = false; // Cierra el menú después de seleccionar
        }
    });

    // Cerrar sesión
    window.logout = () => {
        if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
            window.location.href = "index.html"; // Redirige al index (página inicial)
        }
    };

    // Manejar filtros de búsqueda
    const filtros = document.querySelectorAll(".menu-filtros li");
    filtros.forEach((filtro) => {
        filtro.addEventListener("click", () => {
            alert(`Filtrando por: ${filtro.textContent}`); // Simula acción del filtro
        });
    });

    // Cambiar imágenes de publicaciones
    const publicaciones = document.querySelectorAll(".publicacion");

    publicaciones.forEach((publicacion) => {
        const flechaIzquierda = publicacion.querySelector(".flecha.izquierda");
        const flechaDerecha = publicacion.querySelector(".flecha.derecha");
        const imagenCasa = publicacion.querySelector(".imagen-casa");

        // Lista de imágenes (puedes cambiar estas URLs según tu proyecto)
        const imagenes = ["IMG/casa1.jpg", "IMG/casa2.jpg", "IMG/casa3.jpg"];
        let indiceActual = 0;

        // Cambiar a la imagen anterior
        flechaIzquierda.addEventListener("click", () => {
            indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
            imagenCasa.src = imagenes[indiceActual];
        });

        // Cambiar a la siguiente imagen
        flechaDerecha.addEventListener("click", () => {
            indiceActual = (indiceActual + 1) % imagenes.length;
            imagenCasa.src = imagenes[indiceActual];
        });
    });
});

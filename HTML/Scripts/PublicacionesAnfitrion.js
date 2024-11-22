document.addEventListener("DOMContentLoaded", () => {
    // Manejar el menú de usuario desplegable
    const menuUsuarioCheckbox = document.getElementById("menu-usuario");
    const menuNotificacionesCheckbox = document.getElementById("menu-notificaciones");

    // Cerrar el menú desplegable automáticamente al seleccionar una opción
    document.getElementById("despliegue-menu-usuario").addEventListener("click", (event) => {
        if (event.target.tagName === "A") {
            menuUsuarioCheckbox.checked = false; // Cierra el menú
        }
    });

    // Mostrar notificaciones al hacer clic en el ícono de mensajes
    document.getElementById("despliegue-menu-notificaciones").addEventListener("click", (event) => {
        if (event.target.tagName === "P") {
            alert(`Has seleccionado: ${event.target.textContent}`);
            menuNotificacionesCheckbox.checked = false; // Cierra el menú
        }
    });

    // Cerrar sesión
    window.logout = () => {
        if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
            window.location.href = "index.html"; // Redirige al index (página inicial)
        }
    };

    // Manejar las publicaciones (cambiar imágenes con las flechas)
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

    // Redirigir al formulario de nueva publicación
    const crearPublicacionBtn = document.querySelector(".crear-publicacion");
    crearPublicacionBtn.addEventListener("click", () => {
        window.location.href = "Crear-publicacion.html"; // Redirige al formulario
    });
});

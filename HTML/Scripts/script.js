// Menú de usuario
const menuCheckbox = document.getElementById("menu");
const despliegueMenu = document.getElementById("despliegue-menu");

// Cerrar el menú automáticamente al hacer clic en una opción
despliegueMenu.addEventListener("click", (event) => 
{
    if (event.target.tagName === "A") 
        {
        menuCheckbox.checked = false; // Cierra el menú
    }
});

// Cambiar imágenes de las casas
const publicaciones = document.querySelectorAll(".publicacion");

publicaciones.forEach((publicacion) => 
{
    const flechaIzquierda = publicacion.querySelector(".flecha.izquierda");
    const flechaDerecha = publicacion.querySelector(".flecha.derecha");
    const imagenCasa = publicacion.querySelector(".imagen-casa");

    // Lista de imágenes para las casas (puedes cambiar las URLs según tus imágenes)
    const imagenes = [
        "IMG/casa1.jpg",
        "IMG/casa2.jpg",
        "IMG/casa3.jpg"
    ];
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

// Redirección al hacer clic en "Ver"
// (Ya lo tienes configurado en el HTML, así que no es necesario añadir más aquí)

// URL del backend
const API_URL = "http://localhost:3000/publicaciones"; // Ajusta la URL según tu configuración

// Función para obtener publicaciones desde el backend
async function obtenerPublicaciones() {
    try {
        const response = await fetch(API_URL); // Realiza la solicitud GET al backend
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        const publicaciones = await response.json(); // Convierte la respuesta a JSON
        renderizarPublicaciones(publicaciones); // Llama a la función para renderizar
    } catch (error) {
        console.error("Error al obtener publicaciones:", error);
        alert("Hubo un problema al cargar las publicaciones.");
    }
}

// Función para renderizar publicaciones en el DOM
function renderizarPublicaciones(publicaciones) {
    const contenido = document.querySelector(".contenido"); // Contenedor donde se mostrarán las publicaciones

    // Limpiar contenido existente
    contenido.innerHTML = "";

    // Iterar sobre las publicaciones y agregarlas al DOM
    publicaciones.forEach((publicacion) => {
        const publicacionHTML = `
            <section class="propiedad">
                <div class="publicacion">
                    <h2>${publicacion.titulo}</h2>
                    <button class="flecha izquierda">&lt;</button>
                    <img src="${publicacion.imagen}" alt="Imagen de ${publicacion.titulo}" class="imagen-casa">
                    <button class="flecha derecha">&gt;</button>
                    <div class="info-casa">
                        <span class="nombre-casa">${publicacion.nombre}</span>
                        <span class="precio-casa">$${publicacion.precio} MXN (por mes)</span>
                        <span class="calificacion-casa">⭐${publicacion.calificacion}</span>
                        <button class="boton-ver" onclick="verDetalles(${publicacion.id})">Ver</button>
                    </div>
                </div>
            </section>
        `;
        contenido.innerHTML += publicacionHTML;
    });

    // Llamar la funcionalidad de cambio de imágenes después de renderizar
    agregarCambioDeImagenes();
}

// Función para manejar el cambio de imágenes en cada publicación
function agregarCambioDeImagenes() {
    const publicaciones = document.querySelectorAll(".publicacion");

    publicaciones.forEach((publicacion) => {
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
}

// Función para redirigir a la página de detalles de una publicación
function verDetalles(id) {
    window.location.href = `InicioSesion.html?id=${id}`; // Redirige al inicio de sesión o detalles con un parámetro
}

// Manejo del menú desplegable de usuario
const menuCheckbox = document.getElementById("menu");
const despliegueMenu = document.getElementById("despliegue-menu");

// Cerrar el menú automáticamente al hacer clic en una opción
despliegueMenu.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
        menuCheckbox.checked = false; // Cierra el menú
    }
});

// Inicializar la carga de publicaciones al cargar la página
document.addEventListener("DOMContentLoaded", obtenerPublicaciones);

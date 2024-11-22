document.addEventListener("DOMContentLoaded", () => {
    // Manejar botón "Guardar"
    const guardarBtn = document.querySelector(".guardar");
    guardarBtn.addEventListener("click", () => {
        // Guardar la publicación
        const inmuebleNombre = document.querySelector(".nombre-inmueble").textContent;
        alert(`Has guardado: ${inmuebleNombre}`);
    });

    // Manejar botón "Me interesa"
    const meInteresaBtn = document.querySelector(".me-interesa");
    meInteresaBtn.addEventListener("click", () => {
        // Simular notificación al anfitrión
        alert("El anfitrión ha sido notificado de tu interés.");
    });

    // Galería de imágenes
    const imagenesGaleria = document.querySelectorAll(".imagen-galeria");
    const galeriaPrincipal = document.createElement("div");
    galeriaPrincipal.classList.add("galeria-principal");
    galeriaPrincipal.style.display = "none";

    document.body.appendChild(galeriaPrincipal);

    imagenesGaleria.forEach((imagen, index) => {
        imagen.addEventListener("click", () => {
            galeriaPrincipal.innerHTML = `
                <div class="overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); display: flex; justify-content: center; align-items: center;">
                    <img src="${imagen.src}" alt="Imagen ${index + 1}" style="max-width: 90%; max-height: 90%; border-radius: 10px;">
                    <button class="cerrar-galeria" style="position: absolute; top: 20px; right: 20px; background: #fff; border: none; font-size: 20px; padding: 5px 10px; cursor: pointer;">&times;</button>
                </div>
            `;
            galeriaPrincipal.style.display = "block";

            const cerrarBtn = document.querySelector(".cerrar-galeria");
            cerrarBtn.addEventListener("click", () => {
                galeriaPrincipal.style.display = "none";
            });
        });
    });

    // Ver perfil del anfitrión
    const verPerfilAnfitrion = document.querySelector(".ver-perfil");
    verPerfilAnfitrion.addEventListener("click", () => {
        window.location.href = "Ver-perfil-anfitrion.html"; // Redirige al perfil del anfitrión
    });
});

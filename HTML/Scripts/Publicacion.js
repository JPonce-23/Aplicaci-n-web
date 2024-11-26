document.addEventListener("DOMContentLoaded", () => {
  const guardarBtn = document.querySelector(".guardar");
  const meInteresaBtn = document.querySelector(".me-interesa");
  const comentariosLista = document.querySelector("#comentarios-lista");
  const imagenesGaleria = document.querySelector(".galeria");

  // Obtener el ID del inmueble desde el atributo `data-inmueble-id` del contenedor principal
  const inmuebleId = document.querySelector(".detalle-inmueble").dataset.inmuebleId;

  // Cargar los detalles del inmueble
  async function cargarDetallesInmueble() {
      try {
          // Realizar la petición al servidor para obtener los detalles del inmueble
          const response = await fetch(`http://localhost:3000/api/inmuebles/${inmuebleId}`);
          if (!response.ok) throw new Error("No se pudo cargar los detalles del inmueble.");
          
          const inmueble = await response.json();

          // Cargar el nombre del inmueble
          document.querySelector(".nombre-inmueble").textContent = inmueble.nombre;

          // Cargar la calificación promedio
          document.querySelector(".calificacion-promedio").textContent = inmueble.calificacionPromedio;

          // Cargar el estado del inmueble
          const estadoElement = document.querySelector("#estado-publicacion");
          const fechaDisponibilidadElement = document.querySelector("#fecha-disponibilidad");
          const fechaDisponibilidadFecha = document.querySelector("#fecha-disponibilidad-fecha");

          if (inmueble.estado === "no_disponible") {
              estadoElement.textContent = "Estado: No disponible";
              fechaDisponibilidadElement.style.display = "block";
              fechaDisponibilidadFecha.textContent = inmueble.fechaDisponibilidad;
          } else {
              estadoElement.textContent = "Estado: Disponible";
              fechaDisponibilidadElement.style.display = "none";
          }

          // Cargar la descripción del inmueble
          document.querySelector("#descripcion").textContent = inmueble.descripcion;

          // Cargar los comentarios
          comentariosLista.innerHTML = "";
          inmueble.comentarios.forEach((comentario) => {
              const comentarioElement = document.createElement("p");
              comentarioElement.textContent = `${comentario.usuario}: ${comentario.texto} (${comentario.calificacion}/5)`;
              comentariosLista.appendChild(comentarioElement);
          });

          // Cargar las imágenes del inmueble en la galería
          imagenesGaleria.innerHTML = ""; // Limpiar la galería actual
          inmueble.imagenes.forEach((imagen) => {
              const imgElement = document.createElement("img");
              imgElement.src = imagen;
              imgElement.classList.add("imagen-galeria");
              imagenesGaleria.appendChild(imgElement);
          });

      } catch (error) {
          console.error("Error al cargar los detalles:", error);
          alert("No se pudo cargar la información del inmueble.");
      }
  }

  // Llamar a la función para cargar los detalles del inmueble cuando se carga la página
  cargarDetallesInmueble();

  // BOTÓN "GUARDAR"
  guardarBtn.addEventListener("click", async () => {
      try {
          const response = await fetch("http://localhost:3000/api/guardar-publicacion", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ inmuebleId }),
          });

          if (response.ok) {
              alert("El inmueble ha sido guardado exitosamente.");
          } else {
              const errorData = await response.json();
              alert(`Error al guardar: ${errorData.message}`);
          }
      } catch (error) {
          console.error("Error al guardar inmueble:", error);
          alert("Ocurrió un error al intentar guardar el inmueble.");
      }
  });

  // BOTÓN "ME INTERESA"
  meInteresaBtn.addEventListener("click", async () => {
      try {
          const response = await fetch("http://localhost:3000/api/notificar-interes", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ inmuebleId }),
          });

          if (response.ok) {
              alert("El anfitrión ha sido notificado de tu interés.");
          } else {
              const errorData = await response.json();
              alert(`Error al notificar interés: ${errorData.message}`);
          }
      } catch (error) {
          console.error("Error al notificar interés:", error);
          alert("Ocurrió un error al intentar notificar tu interés.");
      }
  });

  // GALERÍA DE IMÁGENES: Permitir ver las imágenes a tamaño completo
  imagenesGaleria.addEventListener("click", (e) => {
      if (e.target.classList.contains("imagen-galeria")) {
          const src = e.target.src;
          const overlay = document.createElement("div");
          overlay.classList.add("overlay");
          overlay.innerHTML = `
              <div class="modal-imagen">
                  <img src="${src}" alt="Imagen Ampliada" class="imagen-ampliada">
                  <button class="cerrar-galeria">&times;</button>
              </div>
          `;
          document.body.appendChild(overlay);

          // Cerrar la galería al hacer clic en el botón de cerrar
          overlay.querySelector(".cerrar-galeria").addEventListener("click", () => {
              document.body.removeChild(overlay);
          });
      }
  });
});

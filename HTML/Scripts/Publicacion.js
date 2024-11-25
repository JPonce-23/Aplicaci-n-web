document.addEventListener("DOMContentLoaded", () => {
    const guardarBtn = document.querySelector(".guardar");
    const meInteresaBtn = document.querySelector(".me-interesa");
    const imagenesGaleria = document.querySelectorAll(".imagen-galeria");
    const galeriaPrincipal = document.createElement("div");
    const verPerfilAnfitrion = document.querySelector(".ver-perfil");

    galeriaPrincipal.classList.add("galeria-principal");
    galeriaPrincipal.style.display = "none";
    document.body.appendChild(galeriaPrincipal);

    // BOTÓN GUARDAR
    guardarBtn.addEventListener("click", async () => {
        const inmuebleId = document.querySelector(".detalle-inmueble").dataset.inmuebleId;

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
            console.error("Error al guardar la publicación:", error);
            alert("Ocurrió un error al intentar guardar la publicación.");
        }
    });

    // BOTÓN ME INTERESA
    meInteresaBtn.addEventListener("click", async () => {
        const inmuebleId = document.querySelector(".detalle-inmueble").dataset.inmuebleId;

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
                alert(`Error al notificar: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error al notificar interés:", error);
            alert("Ocurrió un error al intentar notificar tu interés.");
        }
    });

    // GALERÍA DE IMAGENES
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

    // VER EL PERFIL DEL ANFITRIÓN
    verPerfilAnfitrion.addEventListener("click", () => {
        window.location.href = "VerPerfilAnfitrion.html";
    });

    // VER LOS DETALLES
    async function cargarDetallesInmueble() {
        const inmuebleId = document.querySelector(".detalle-inmueble").dataset.inmuebleId;

        try {document.addEventListener("DOMContentLoaded", () => {
            const formulario = document.querySelector(".formulario");
            const publicacionID = "12345"; // Cambia esto por el ID dinámico de la publicación
            const estadoSelect = document.getElementById("estado");
            const fechaDisponibilidadCampo = document.getElementById("fecha-disponibilidad-campo");
            const fechaDisponibilidadInput = document.getElementById("fecha-disponibilidad");
          
            // Mostrar u ocultar el campo de fecha según el estado
            estadoSelect.addEventListener("change", () => {
              if (estadoSelect.value === "no_disponible") {
                fechaDisponibilidadCampo.style.display = "block";
              } else {
                fechaDisponibilidadCampo.style.display = "none";
                fechaDisponibilidadInput.value = ""; // Limpia el campo de fecha
              }
            });
          
            async function cargarDatosPublicacion() {
              try {
                const response = await fetch(`http://localhost:3000/api/publicaciones/${publicacionID}`);
                if (!response.ok) throw new Error("Error al cargar datos de la publicación.");
                const datosPublicacion = await response.json();
          
                // Cargar datos al formulario
                document.getElementById("nombre").value = datosPublicacion.nombre;
                document.getElementById("descripcion").value = datosPublicacion.descripcion;
                document.getElementById("reglas").value = datosPublicacion.reglas;
                document.getElementById("informacion").value = datosPublicacion.informacion;
                document.getElementById("ubicacion").value = datosPublicacion.ubicacion;
                document.getElementById("costo").value = datosPublicacion.costo;
                estadoSelect.value = datosPublicacion.estado || "disponible";
                fechaDisponibilidadInput.value = datosPublicacion.fecha_disponibilidad || "";
          
                if (estadoSelect.value === "no_disponible") {
                  fechaDisponibilidadCampo.style.display = "block";
                }
          
                datosPublicacion.restricciones.forEach((restriccion) => {
                  const checkbox = document.querySelector(`input[name="restricciones"][value="${restriccion}"]`);
                  if (checkbox) checkbox.checked = true;
                });
                datosPublicacion.servicios.forEach((servicio) => {
                  const checkbox = document.querySelector(`input[name="servicios"][value="${servicio}"]`);
                  if (checkbox) checkbox.checked = true;
                });
              } catch (error) {
                console.error("Error al cargar los datos de la publicación:", error);
                alert("No se pudieron cargar los datos de la publicación.");
              }
            }
          
            cargarDatosPublicacion();
          
            formulario.addEventListener("submit", async (e) => {
              e.preventDefault();
          
              const datosEditados = {
                nombre: document.getElementById("nombre").value,
                descripcion: document.getElementById("descripcion").value,
                reglas: document.getElementById("reglas").value,
                informacion: document.getElementById("informacion").value,
                ubicacion: document.getElementById("ubicacion").value,
                costo: parseFloat(document.getElementById("costo").value),
                estado: estadoSelect.value,
                fecha_disponibilidad: estadoSelect.value === "no_disponible" ? fechaDisponibilidadInput.value : null,
                restricciones: [...document.querySelectorAll("input[name='restricciones']:checked")].map((el) => el.value),
                servicios: [...document.querySelectorAll("input[name='servicios']:checked")].map((el) => el.value),
              };
          
              try {
                const response = await fetch(`http://localhost:3000/api/publicaciones/${publicacionID}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(datosEditados),
                });
          
                if (!response.ok) throw new Error("Error al guardar los cambios.");
          
                alert("Los cambios han sido guardados exitosamente.");
                console.log("Datos enviados:", datosEditados);
              } catch (error) {
                console.error("Error al guardar los cambios:", error);
                alert("Hubo un problema al guardar los cambios. Intente de nuevo más tarde.");
              }
            });
          });
          
            const response = await fetch(`http://localhost:3000/api/inmuebles/${inmuebleId}`);
            if (response.ok) {
                const data = await response.json();

                document.querySelector(".nombre-inmueble").textContent = data.nombre;
                document.querySelector(".calificacion span:last-child").textContent = data.calificacionPromedio;
                document.querySelector(".disponibilidad").textContent = data.disponibilidad
                    ? `Disponible hasta: ${data.fechaDisponibilidad}`
                    : "No disponible";
                document.querySelector(".precio span").textContent = `$${data.precio} MXN por mes`;
                document.querySelector(".ver-perfil").href = `VerPerfilAnfitrion.html?id=${data.anfitrionId}`;
            } else {
                console.error("Error al cargar detalles del inmueble");
            }
        } catch (error) {
            console.error("Error al cargar detalles del inmueble:", error);
        }
    }

    cargarDetallesInmueble();
});

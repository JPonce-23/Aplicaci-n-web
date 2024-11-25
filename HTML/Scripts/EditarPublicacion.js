document.addEventListener("DOMContentLoaded", () => {
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
  